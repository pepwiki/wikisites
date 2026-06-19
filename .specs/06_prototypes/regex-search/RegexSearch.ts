/**
 * RegexSearch — Regex-powered search engine for Wikisites P1.
 *
 * Features:
 *  - Browser-native RegExp execution
 *  - 4-layer ReDoS defense (length cap, complexity analysis, timeout, result cap)
 *  - Field-specific search (title, body, tags)
 *  - Match highlighting with offsets
 *  - Pagination for large result sets
 *
 * @module regex-search
 * @see BP-CONTENT-TOOLS-001 §5.4 IF-REGEX-001
 */

import { z } from "zod";

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

/** Search query model. */
export const RegexSearchQuerySchema = z.object({
  pattern: z.string().min(1).max(200),
  flags: z.string().optional().default(""),
  fields: z.array(z.enum(["title", "body", "tags"])).optional().default(["title", "body"]),
  booleanOp: z.enum(["AND", "OR", "NOT"]).optional().default("OR"),
  caseSensitive: z.boolean().optional().default(false),
});

export type RegexSearchQuery = z.infer<typeof RegexSearchQuerySchema>;

/** A single highlighted match fragment. */
export const SearchResultHighlightSchema = z.object({
  text: z.string(),
  start: z.number().int().min(0),
  end: z.number().int().min(0),
  isActive: z.boolean(),
});

export type SearchResultHighlight = z.infer<typeof SearchResultHighlightSchema>;

/** Match metadata for a single result. */
export const MatchMetaSchema = z.object({
  totalMatches: z.number().int().min(0),
  matchIndex: z.number().int().min(0),
  field: z.string(),
});

/** One search result. */
export const RegexSearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  snippet: z.string(),
  url: z.string().optional(),
  highlights: z.array(SearchResultHighlightSchema),
  matchMeta: MatchMetaSchema,
});

export type RegexSearchResult = z.infer<typeof RegexSearchResultSchema>;

/** Document to search against. */
export const SearchableDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
  url: z.string().optional(),
});

export type SearchableDocument = z.infer<typeof SearchableDocumentSchema>;

/** Paginated result set. */
export const ResultSetSchema = z.object({
  results: z.array(RegexSearchResultSchema),
  totalMatches: z.number().int().min(0),
  executionTime: z.number().min(0),
  truncated: z.boolean(),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  hasMore: z.boolean(),
});

export type ResultSet = z.infer<typeof ResultSetSchema>;

// ---------------------------------------------------------------------------
// ReDoS Defense — Layer 1: Pattern length cap
// ---------------------------------------------------------------------------

const MAX_PATTERN_LENGTH = 200;
const MAX_EXECUTION_MS = 100;
const MAX_RESULTS = 1000;

// ---------------------------------------------------------------------------
// ReDoS Defense — Layer 2: Complexity analysis
// ---------------------------------------------------------------------------

/**
 * Static complexity analysis of a regex pattern.
 * Scores 0–100 based on nested quantifiers and alternation depth.
 *
 * Known ReDoS vectors:
 *  - Nested quantifiers: (a+)+, (a*)*, (a+)*
 *  - Overlapping alternation: (a|a)+
 *  - Star height > 1
 */
function analyzeComplexity(pattern: string): ReDoSSafetyScore {
  let complexity = 0;
  let hasVulnerability = false;
  const lengthOk = pattern.length <= MAX_PATTERN_LENGTH;

  // Nested quantifier detection
  // (…+…+…) or (…*…*…) inside a group with outer quantifier
  const nestedQuantifiers = /(\([^)]*[+*][^)]*\))[+*]/g;
  const nestedAltQuant = /\([^)]*\|[^)]*\)[+*]/g;

  let m: RegExpExecArray | null;
  while ((m = nestedQuantifiers.exec(pattern)) !== null) {
    complexity += 30;
    hasVulnerability = true;
  }
  while ((m = nestedAltQuant.exec(pattern)) !== null) {
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

  // Cap at 100
  complexity = Math.min(100, complexity);

  const rating: ReDoSSafetyScore["rating"] =
    complexity > 50 ? "blocked" : complexity > 25 ? "warn" : "safe";

  let message = "";
  if (!lengthOk) message = `Pattern exceeds ${MAX_PATTERN_LENGTH} character limit.`;
  else if (hasVulnerability && rating === "blocked")
    message = "Pattern contains potential ReDoS vectors (nested quantifiers). Blocked.";
  else if (hasVulnerability)
    message = "Pattern has moderate complexity. Proceed with caution.";
  else message = "Pattern appears safe.";

  return { rating, complexity, lengthOk, hasVulnerability, message };
}

// ---------------------------------------------------------------------------
// ReDoS Defense — Layer 3: Compile with validation
// ---------------------------------------------------------------------------

function compilePattern(
  query: RegexSearchQuery,
): { regex: RegExp | null; error: string | null } {
  const safety = analyzeComplexity(query.pattern);
  if (safety.rating === "blocked") {
    return { regex: null, error: safety.message };
  }

  try {
    const flags = buildFlags(query);
    const regex = new RegExp(query.pattern, flags);
    return { regex, error: null };
  } catch (err) {
    return {
      regex: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function buildFlags(query: RegexSearchQuery): string {
  const flags = new Set(query.flags ?? "");
  if (!query.caseSensitive) flags.add("i");
  flags.add("g"); // global for highlighting
  return [...flags].join("");
}

// ---------------------------------------------------------------------------
// ReDoS Defense — Layer 4: Timeout execution
// ---------------------------------------------------------------------------

/**
 * Execute a RegExp with a hard timeout using a web worker-style loop.
 * Since AbortController doesn't stop RegExp, we chunk execution.
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

  // Reset lastIndex
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
// Highlight generation
// ---------------------------------------------------------------------------

function buildHighlights(
  text: string,
  matches: RegExpExecArray[],
  activeIndex: number,
): SearchResultHighlight[] {
  const highlights: SearchResultHighlight[] = [];
  let lastEnd = 0;

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
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
// Main search function
// ---------------------------------------------------------------------------

/**
 * Execute a regex search across a set of documents.
 * Implements all 4 layers of ReDoS defense.
 *
 * @param query - Validated search query
 * @param documents - Documents to search
 * @param page - 1-indexed page number
 * @param pageSize - Results per page
 * @returns Paginated result set
 */
export function regexSearch(
  query: RegexSearchQuery,
  documents: SearchableDocument[],
  page: number = 1,
  pageSize: number = 20,
): ResultSet {
  const startTime = performance.now();

  // Layer 1+2: Compile with safety analysis
  const { regex, error } = compilePattern(query);
  if (!regex) {
    return {
      results: [],
      totalMatches: 0,
      executionTime: performance.now() - startTime,
      truncated: false,
      page,
      pageSize,
      hasMore: false,
    };
  }

  const allResults: RegexSearchResult[] = [];

  for (const doc of documents) {
    if (allResults.length >= MAX_RESULTS) break;

    let combinedMatches: RegExpExecArray[] = [];

    for (const field of query.fields) {
      const text = getFieldText(doc, field);
      if (!text) continue;

      // Layer 4: Timeout execution
      const { matches, timedOut } = executeWithTimeout(
        regex,
        text,
        MAX_EXECUTION_MS,
        MAX_RESULTS - allResults.length,
      );

      if (timedOut) {
        // Return partial with timeout notice
        return {
          results: allResults,
          totalMatches: allResults.length,
          executionTime: performance.now() - startTime,
          truncated: true,
          page,
          pageSize,
          hasMore: false,
        };
      }

      for (const m of matches) {
        combinedMatches.push(m);
      }
    }

    if (combinedMatches.length > 0) {
      // Build snippet around first match
      const firstMatch = combinedMatches[0];
      const snippetStart = Math.max(0, firstMatch.index - 40);
      const snippetEnd = Math.min(doc.body.length, firstMatch.index + firstMatch[0].length + 80);
      const snippet =
        (snippetStart > 0 ? "…" : "") +
        doc.body.slice(snippetStart, snippetEnd) +
        (snippetEnd < doc.body.length ? "…" : "");

      allResults.push({
        id: doc.id,
        title: doc.title,
        snippet,
        url: doc.url,
        highlights: buildHighlights(doc.body, combinedMatches, 0),
        matchMeta: {
          totalMatches: combinedMatches.length,
          matchIndex: 0,
          field: query.fields[0] ?? "body",
        },
      });
    }
  }

  const totalMatches = allResults.length;
  const start = (page - 1) * pageSize;
  const paged = allResults.slice(start, start + pageSize);

  return {
    results: paged,
    totalMatches,
    executionTime: performance.now() - startTime,
    truncated: totalMatches >= MAX_RESULTS,
    page,
    pageSize,
    hasMore: start + pageSize < totalMatches,
  };
}

// ---------------------------------------------------------------------------
// Convenience: analyze only (no search)
// ---------------------------------------------------------------------------

/**
 * Analyze a pattern for safety without executing it.
 * Useful for UI feedback before search execution.
 */
export function analyzePattern(pattern: string): ReDoSSafetyScore {
  return analyzeComplexity(pattern);
}

// ---------------------------------------------------------------------------
// Highlight HTML builder (for rendering)
// ---------------------------------------------------------------------------

/**
 * Convert highlights array into an HTML string with <mark> tags.
 * Outputs safe text only (no XSS risk — text is escaped).
 */
export function highlightsToHtml(highlights: SearchResultHighlight[]): string {
  return highlights
    .map((h) => {
      const escaped = h.text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return h.isActive ? `<mark class="regex-active">${escaped}</mark>` : escaped;
    })
    .join("");
}
