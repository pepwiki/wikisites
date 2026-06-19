/**
 * RegexSearch — Pure TypeScript regex search engine with 4-layer ReDoS defense.
 *
 * Layers:
 * 1. Pattern length cap
 * 2. Complexity scoring (nested quantifiers, alternation depth)
 * 3. Compile validation (try/catch)
 * 4. Timeout execution (chunked with performance.now)
 *
 * @module lib/regex-search
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum allowed pattern length. */
const MAX_PATTERN_LENGTH = 200;

/** Maximum RegExp execution time per document field. */
const MAX_EXECUTION_MS = 100;

/** Maximum total results before truncation. */
const MAX_RESULTS = 1000;

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

/** Safety score for a regex pattern. */
export const ReDoSSafetyScoreSchema = z.object({
  rating: z.enum(["safe", "warn", "blocked"]),
  complexity: z.number().min(0).max(100),
  lengthOk: z.boolean(),
  hasVulnerability: z.boolean(),
  message: z.string(),
});

export type ReDoSSafetyScore = z.infer<typeof ReDoSSafetyScoreSchema>;

/** Search query model (input — defaults applied by schema). */
export const SearchQuerySchema = z.object({
  pattern: z.string().min(1).max(200),
  flags: z.string().optional().default(""),
  fields: z
    .array(z.enum(["title", "body", "tags"]))
    .optional()
    .default(["title", "body"]),
  caseSensitive: z.boolean().optional().default(false),
});

/** Input type — fields with defaults are optional. */
export type SearchQuery = z.input<typeof SearchQuerySchema>;

/** Resolved type — all defaults applied. */
export type SearchQueryResolved = z.infer<typeof SearchQuerySchema>;

/** A single highlighted match fragment. */
export const HighlightSchema = z.object({
  text: z.string(),
  start: z.number().int().min(0),
  end: z.number().int().min(0),
  isActive: z.boolean(),
});

export type Highlight = z.infer<typeof HighlightSchema>;

/** Match metadata. */
export const MatchMetaSchema = z.object({
  totalMatches: z.number().int().min(0),
  matchIndex: z.number().int().min(0),
  field: z.string(),
});

export type MatchMeta = z.infer<typeof MatchMetaSchema>;

/** One search result. */
export const SearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  snippet: z.string(),
  highlights: z.array(HighlightSchema),
  matchMeta: MatchMetaSchema,
});

export type SearchResult = z.infer<typeof SearchResultSchema>;

/** Document to search against. */
export const SearchableDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
});

export type SearchableDocument = z.infer<typeof SearchableDocumentSchema>;

/** Paginated result set. */
export const ResultSetSchema = z.object({
  results: z.array(SearchResultSchema),
  totalMatches: z.number().int().min(0),
  executionTimeMs: z.number().min(0),
  truncated: z.boolean(),
});

export type ResultSet = z.infer<typeof ResultSetSchema>;

// ---------------------------------------------------------------------------
// ReDoS Layer 1 + 2: Complexity analysis
// ---------------------------------------------------------------------------

/**
 * Analyze a regex pattern for ReDoS vulnerability.
 * Scores 0–100 based on nested quantifiers, alternation depth, and backrefs.
 */
export function analyzeComplexity(pattern: string): ReDoSSafetyScore {
  let complexity = 0;
  let hasVulnerability = false;
  const lengthOk = pattern.length <= MAX_PATTERN_LENGTH;

  // Nested quantifier detection: (…+…+…) or (…*…*) inside a group with outer quantifier
  const nestedQuantifiers = /(\([^)]*[+*][^)]*\))[+*]/g;
  const nestedAltQuant = /\([^)]*\|[^)]*\)[+*]/g;

  while (nestedQuantifiers.exec(pattern) !== null) {
    complexity += 30;
    hasVulnerability = true;
  }
  while (nestedAltQuant.exec(pattern) !== null) {
    complexity += 25;
    hasVulnerability = true;
  }

  // Quantifier nesting depth
  let depth = 0;
  let maxDepth = 0;
  for (const ch of pattern) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if ((ch === "+" || ch === "*" || ch === "?") && depth > 1) {
      maxDepth = Math.max(maxDepth, depth);
    }
  }
  if (maxDepth > 2) {
    complexity += maxDepth * 10;
    hasVulnerability = true;
  }

  // Alternation count
  const pipeCount = (pattern.match(/\|/g) ?? []).length;
  complexity += Math.min(pipeCount * 2, 10);

  // Backreference penalty
  if (/\\[1-9]/.test(pattern)) {
    complexity += 15;
  }

  complexity = Math.min(100, complexity);

  const rating: ReDoSSafetyScore["rating"] =
    complexity > 50 ? "blocked" : complexity > 25 ? "warn" : "safe";

  let message = "";
  if (!lengthOk) {
    message = `Pattern exceeds ${MAX_PATTERN_LENGTH} character limit.`;
  } else if (hasVulnerability && rating === "blocked") {
    message = "Pattern contains potential ReDoS vectors (nested quantifiers). Blocked.";
  } else if (hasVulnerability) {
    message = "Pattern has moderate complexity. Proceed with caution.";
  } else {
    message = "Pattern appears safe.";
  }

  return { rating, complexity, lengthOk, hasVulnerability, message };
}

// ---------------------------------------------------------------------------
// ReDoS Layer 3: Compile validation
// ---------------------------------------------------------------------------

/**
 * Safely compile a regex pattern with safety analysis.
 *
 * @returns Compiled RegExp or error message.
 */
export function compileRegex(
  pattern: string,
  flags: string,
): { regex: RegExp | null; error: string | null } {
  if (pattern.length > MAX_PATTERN_LENGTH) {
    return { regex: null, error: `Pattern exceeds ${MAX_PATTERN_LENGTH} character limit.` };
  }

  const safety = analyzeComplexity(pattern);
  if (safety.rating === "blocked") {
    return { regex: null, error: safety.message };
  }

  try {
    const flagSet = new Set(flags);
    flagSet.add("g"); // global for highlighting
    const regex = new RegExp(pattern, [...flagSet].join(""));
    return { regex, error: null };
  } catch (err) {
    return {
      regex: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ---------------------------------------------------------------------------
// ReDoS Layer 4: Timeout execution
// ---------------------------------------------------------------------------

/**
 * Execute a RegExp with a hard timeout via chunked iteration.
 * Returns all matches found before the deadline.
 */
function executeWithTimeout(
  regex: RegExp,
  text: string,
  timeoutMs: number,
  maxResults: number,
): { matches: RegExpExecArray[]; timedOut: boolean } {
  const matches: RegExpExecArray[] = [];
  const deadline = performance.now() + timeoutMs;
  let match: RegExpExecArray | null;

  regex.lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match);
    if (matches.length >= maxResults) break;
    if (performance.now() > deadline) {
      return { matches, timedOut: true };
    }
    // Prevent infinite loop on zero-length matches
    if (match.index === match[0].length) {
      regex.lastIndex++;
    }
  }

  return { matches, timedOut: false };
}

// ---------------------------------------------------------------------------
// Field extraction
// ---------------------------------------------------------------------------

function getFieldText(doc: SearchableDocument, field: string): string {
  switch (field) {
    case "title":
      return doc.title;
    case "body":
      return doc.body;
    case "tags":
      return doc.tags.join(" ");
    default:
      return "";
  }
}

// ---------------------------------------------------------------------------
// Highlight generation
// ---------------------------------------------------------------------------

function buildHighlights(
  text: string,
  matches: RegExpExecArray[],
  activeIndex: number,
): Highlight[] {
  const highlights: Highlight[] = [];
  let lastEnd = 0;

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]!;
    if (m.index > lastEnd) {
      highlights.push({
        text: text.slice(lastEnd, m.index),
        start: lastEnd,
        end: m.index,
        isActive: false,
      });
    }
    highlights.push({
      text: m[0],
      start: m.index,
      end: m.index + m[0].length,
      isActive: i === activeIndex,
    });
    lastEnd = m.index + m[0].length;
  }

  if (lastEnd < text.length) {
    highlights.push({
      text: text.slice(lastEnd),
      start: lastEnd,
      end: text.length,
      isActive: false,
    });
  }

  return highlights;
}

// ---------------------------------------------------------------------------
// Public API: compileRegex, searchContent, highlightMatches
// ---------------------------------------------------------------------------

/**
 * Search across a content index using a compiled regex.
 *
 * @param query - Validated search query
 * @param documents - Documents to search
 * @returns Paginated result set
 */
export function searchContent(
  rawQuery: SearchQuery,
  documents: SearchableDocument[],
): ResultSet {
  const startTime = performance.now();
  const query = SearchQuerySchema.parse(rawQuery);

  // Default to case-insensitive unless explicitly requested
  const searchFlags = query.caseSensitive
    ? query.flags
    : query.flags.includes("i")
      ? query.flags
      : query.flags + "i";

  const compiled = compileRegex(query.pattern, searchFlags);
  if (!compiled.regex) {
    return {
      results: [],
      totalMatches: 0,
      executionTimeMs: performance.now() - startTime,
      truncated: false,
    };
  }

  return searchWithRegex(compiled.regex, query, documents, startTime);
}

function searchWithRegex(
  regex: RegExp,
  query: SearchQueryResolved,
  documents: SearchableDocument[],
  startTime: number,
): ResultSet {
  const allResults: SearchResult[] = [];

  for (const doc of documents) {
    if (allResults.length >= MAX_RESULTS) break;

    const combinedMatches: RegExpExecArray[] = [];

    for (const field of query.fields) {
      const text = getFieldText(doc, field);
      if (!text) continue;

      const { matches, timedOut } = executeWithTimeout(
        regex,
        text,
        MAX_EXECUTION_MS,
        MAX_RESULTS - allResults.length,
      );

      if (timedOut) {
        return {
          results: allResults,
          totalMatches: allResults.length,
          executionTimeMs: performance.now() - startTime,
          truncated: true,
        };
      }

      for (const m of matches) {
        combinedMatches.push(m);
      }
    }

    if (combinedMatches.length > 0) {
      const firstMatch = combinedMatches[0]!;
      const snippetStart = Math.max(0, firstMatch.index - 40);
      const snippetEnd = Math.min(
        doc.body.length,
        firstMatch.index + firstMatch[0].length + 80,
      );
      const snippet =
        (snippetStart > 0 ? "…" : "") +
        doc.body.slice(snippetStart, snippetEnd) +
        (snippetEnd < doc.body.length ? "…" : "");

      allResults.push({
        id: doc.id,
        title: doc.title,
        snippet,
        highlights: buildHighlights(doc.body, combinedMatches, 0),
        matchMeta: {
          totalMatches: combinedMatches.length,
          matchIndex: 0,
          field: query.fields[0] ?? "body",
        },
      });
    }
  }

  return {
    results: allResults,
    totalMatches: allResults.length,
    executionTimeMs: performance.now() - startTime,
    truncated: allResults.length >= MAX_RESULTS,
  };
}

/**
 * Wrap regex matches in HTML `<mark>` tags.
 * Text is escaped to prevent XSS.
 *
 * @param text - Original text
 * @param matches - Regex exec results (must be non-overlapping)
 * @returns HTML string with `<mark>` wrappers
 */
export function highlightMatches(text: string, matches: RegExpExecArray[]): string {
  if (matches.length === 0) return escapeHtml(text);

  const parts: string[] = [];
  let lastEnd = 0;

  for (const m of matches) {
    if (m.index > lastEnd) {
      parts.push(escapeHtml(text.slice(lastEnd, m.index)));
    }
    parts.push(`<mark class="bg-teal-200 dark:bg-teal-800 rounded-sm px-0.5">${escapeHtml(m[0])}</mark>`);
    lastEnd = m.index + m[0].length;
  }

  if (lastEnd < text.length) {
    parts.push(escapeHtml(text.slice(lastEnd)));
  }

  return parts.join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Analyze a pattern for safety without executing it.
 * Useful for UI feedback before search execution.
 */
export function analyzePattern(pattern: string): ReDoSSafetyScore {
  return analyzeComplexity(pattern);
}
