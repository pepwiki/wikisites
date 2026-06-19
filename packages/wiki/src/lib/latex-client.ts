/**
 * Client-side KaTeX renderer. Only imported on the client.
 *
 * @module lib/latex-client
 */

interface KaTeXStatic {
  renderToString(expression: string, options: {
    displayMode: boolean;
    throwOnError: boolean;
    output: string;
  }): string;
}

let katexCache: KaTeXStatic | null = null;

/**
 * Load KaTeX and render a LaTeX expression to HTML.
 * Caches the KaTeX module after first load.
 *
 * @param expression - Raw LaTeX string
 * @param displayMode - Whether to render in display mode
 * @returns HTML string
 */
export async function renderWithKaTeX(
  expression: string,
  displayMode: boolean,
): Promise<string> {
  if (!katexCache) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const loader = new Function("m", "return import(m)") as (id: string) => Promise<{ default: KaTeXStatic }>;
    katexCache = (await loader("katex")).default;
  }
  return katexCache.renderToString(expression, {
    displayMode,
    throwOnError: false,
    output: "html",
  });
}
