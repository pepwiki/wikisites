/**
 * LaTeX rendering utility for wiki content.
 *
 * Provides math segment detection, SSR-safe rendering fallback,
 * and expression extraction. Client-side KaTeX rendering is in
 * latex-client.ts.
 *
 * @module lib/latex-renderer
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

/** A single LaTeX expression extracted from text. */
export const LaTeXExpressionSchema = z.object({
  raw: z.string(),
  displayMode: z.boolean(),
  start: z.number().int().min(0),
  end: z.number().int().min(0),
});

export type LaTeXExpression = z.infer<typeof LaTeXExpressionSchema>;

/** A detected math segment with surrounding text context. */
export const MathSegmentSchema = z.object({
  type: z.enum(["text", "math"]),
  content: z.string(),
  expression: LaTeXExpressionSchema.optional(),
  start: z.number().int().min(0),
  end: z.number().int().min(0),
});

export type MathSegment = z.infer<typeof MathSegmentSchema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Regex for detecting $$...$$ (display) and $...$ (inline) math.
 * - Display mode: $$...$$ (greedy, non-nested)
 * - Inline mode: $...$ (non-greedy, no $ inside)
 * - Avoids matching escaped dollar signs (\$) or empty content.
 */
const MATH_REGEX = /(?<!\\)\$\$(.+?)(?<!\\)\$\$|(?<!\\)\$([^\$\n]+?)(?<!\\)\$/gs;

// ---------------------------------------------------------------------------
// HTML escaping
// ---------------------------------------------------------------------------

/**
 * Escape special HTML characters to prevent XSS.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Math segment detection
// ---------------------------------------------------------------------------

/**
 * Parse text and extract all math segments ($...$ and $$...$$).
 *
 * Returns an array of MathSegment objects that partition the input text
 * into alternating text and math regions.
 *
 * @param text - Input text containing potential LaTeX expressions
 * @returns Array of MathSegment objects
 */
export function detectMathSegments(text: string): MathSegment[] {
  const segments: MathSegment[] = [];
  let lastIndex = 0;

  // Reset regex state
  MATH_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = MATH_REGEX.exec(text)) !== null) {
    const fullMatch = match[0]!;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;
    const isDisplay = match[1] !== undefined;
    const expression = (match[1] ?? match[2] ?? "").trim();

    // Add preceding text segment
    if (matchStart > lastIndex) {
      segments.push({
        type: "text",
        content: text.slice(lastIndex, matchStart),
        start: lastIndex,
        end: matchStart,
      });
    }

    // Add math segment
    segments.push({
      type: "math",
      content: fullMatch,
      expression: {
        raw: expression,
        displayMode: isDisplay,
        start: matchStart + (isDisplay ? 2 : 1),
        end: matchEnd - (isDisplay ? 2 : 1),
      },
      start: matchStart,
      end: matchEnd,
    });

    lastIndex = matchEnd;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.slice(lastIndex),
      start: lastIndex,
      end: text.length,
    });
  }

  return segments;
}

/**
 * Extract all LaTeX expressions from text.
 *
 * @param text - Input text
 * @returns Array of LaTeXExpression objects
 */
export function extractExpressions(text: string): LaTeXExpression[] {
  const segments = detectMathSegments(text);
  return segments
    .filter((s): s is MathSegment & { expression: LaTeXExpression } =>
      s.type === "math" && s.expression !== undefined,
    )
    .map((s) => s.expression);
}

// ---------------------------------------------------------------------------
// SSR-safe fallback rendering
// ---------------------------------------------------------------------------

/**
 * Render a LaTeX expression as escaped HTML fallback.
 * Use this for SSR or when KaTeX is unavailable.
 * For client-side rendering, use latex-client.ts renderWithKaTeX.
 *
 * @param expression - Raw LaTeX string
 * @param displayMode - Whether this is a display-mode expression
 * @returns HTML string with escaped LaTeX
 */
export function renderLatexSync(expression: string, displayMode: boolean): string {
  return renderLatexFallback(expression, displayMode);
}

function renderLatexFallback(expression: string, displayMode: boolean): string {
  const escaped = escapeHtml(expression);
  if (displayMode) {
    return `<div class="latex-fallback" role="math" aria-label="${escapeHtml(expression)}"><pre><code>${escaped}</code></pre></div>`;
  }
  return `<code class="latex-fallback" role="math" aria-label="${escapeHtml(expression)}">${escaped}</code>`;
}

/**
 * Render a full document by splitting text into text and math segments.
 * All math segments use the sync fallback renderer (SSR-safe).
 *
 * @param text - Input text with LaTeX expressions
 * @returns HTML string
 */
export function renderDocumentSync(text: string): string {
  const segments = detectMathSegments(text);
  const parts: string[] = [];

  for (const segment of segments) {
    if (segment.type === "text") {
      parts.push(escapeHtml(segment.content));
    } else if (segment.expression) {
      parts.push(renderLatexSync(segment.expression.raw, segment.expression.displayMode));
    }
  }

  return parts.join("");
}
