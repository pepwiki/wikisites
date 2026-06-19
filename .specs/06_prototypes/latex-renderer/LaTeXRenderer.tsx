/**
 * LaTeXRenderer — SolidJS KaTeX wrapper for Wikisites P1.
 *
 * Features:
 *  - Inline ($…$) and display ($$…$$) math detection
 *  - SSR-first with CSR hydration for interactive expressions
 *  - MathML fallback for accessibility
 *  - Lazy-loaded KaTeX (code-split)
 *  - Error fallback: raw LaTeX source on failure
 *
 * @module latex-renderer
 * @see BP-CONTENT-TOOLS-001 §5.1 IF-LATEX-001
 */

import {
  createEffect,
  createResource,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

/** KaTeX render options — mirrors KaTeX.Options subset. */
export const KaTeXOptionsSchema = z.object({
  displayMode: z.boolean().optional(),
  throwOnError: z.boolean().optional(),
  errorColor: z.string().optional(),
  macros: z.record(z.string()).optional(),
  trust: z
    .union([
      z.boolean(),
      z.function().args(z.record(z.unknown())).returns(z.boolean()),
    ])
    .optional(),
  strict: z
    .union([
      z.boolean(),
      z.enum(["ignore", "warn", "error"]),
      z.function(),
    ])
    .optional(),
  output: z.enum(["html", "mathml", "htmlAndMathml"]).optional(),
});

export type KaTeXOptions = z.infer<typeof KaTeXOptionsSchema>;

export const LatexExpressionSchema = z.object({
  source: z.string().min(1),
  type: z.enum(["inline", "display", "chemistry"]),
  isChemical: z.boolean(),
  hash: z.string(),
});

export type LatexExpression = z.infer<typeof LatexExpressionSchema>;

export const LatexSSRResultSchema = z.object({
  html: z.string(),
  mathml: z.string(),
  success: z.boolean(),
  error: z.string().optional(),
});

export type LatexSSRResult = z.infer<typeof LatexSSRResultSchema>;

export const LatexRendererPropsSchema = z.object({
  expression: z.string().min(1),
  mode: z.enum(["inline", "display", "mathml"]).optional().default("inline"),
  forceClient: z.boolean().optional().default(false),
  options: KaTeXOptionsSchema.optional(),
  className: z.string().optional(),
  /** Pre-rendered SSR HTML from build-time pipeline. */
  ssrHtml: z.string().optional(),
  /** Pre-rendered MathML from build-time pipeline. */
  ssrMathml: z.string().optional(),
});

export type LatexRendererProps = z.infer<typeof LatexRendererPropsSchema>;

// ---------------------------------------------------------------------------
// Lazy KaTeX loader
// ---------------------------------------------------------------------------

type KaTeXModule = typeof import("katex");

let _katexPromise: Promise<KaTeXModule> | null = null;

/**
 * Lazy-load KaTeX. Returns the same promise on repeated calls.
 * In Astro this triggers a dynamic import → separate chunk.
 */
function loadKaTeX(): Promise<KaTeXModule> {
  if (!_katexPromise) {
    _katexPromise = import("katex") as unknown as Promise<KaTeXModule>;
  }
  return _katexPromise;
}

// ---------------------------------------------------------------------------
// Hash helper (djb2) — used as cache key for SSR entries
// ---------------------------------------------------------------------------

function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

// ---------------------------------------------------------------------------
// SSR render helper (Node-side, exported for remark/rehype plugin use)
// ---------------------------------------------------------------------------

/**
 * Render a LaTeX expression to HTML + MathML at build time.
 * Only usable in Node context (imported by remark/rehype pipeline).
 */
export async function renderLatexSSR(
  expression: string,
  options: KaTeXOptions = {},
): Promise<LatexSSRResult> {
  try {
    const katex = await loadKaTeX();
    const html = katex.renderToString(expression, {
      ...options,
      throwOnError: true,
      output: "htmlAndMathml",
    });
    // KaTeX htmlAndMathml wraps both in a single string.
    return { html, mathml: "", success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { html: expression, mathml: "", success: false, error: msg };
  }
}

// ---------------------------------------------------------------------------
// Inline/block math detection
// ---------------------------------------------------------------------------

/** Detect and extract math delimiters from raw content text. */
export function detectMathSegments(
  content: string,
): Array<{ text: string; type: "inline" | "display"; raw: string }> {
  const segments: Array<{
    text: string;
    type: "inline" | "display";
    raw: string;
  }> = [];
  // Display math: $$…$$
  const displayRe = /\$\$([\s\S]+?)\$\$/g;
  let match: RegExpExecArray | null;
  while ((match = displayRe.exec(content)) !== null) {
    segments.push({
      text: match[1].trim(),
      type: "display",
      raw: match[0],
    });
  }
  // Inline math: $…$ (skip $$)
  const inlineRe = /(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g;
  while ((match = inlineRe.exec(content)) !== null) {
    segments.push({
      text: match[1].trim(),
      type: "inline",
      raw: match[0],
    });
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * SolidJS component that renders a single LaTeX expression.
 *
 * SSR mode: use `ssrHtml` / `ssrMathml` props from build pipeline.
 * CSR mode: dynamically imports KaTeX and renders on mount / expression change.
 */
const LaTeXRenderer: Component<LatexRendererProps> = (props) => {
  const resolved = () => LatexRendererPropsSchema.parse(props);

  const [html, setHtml] = createSignal(resolved().ssrHtml ?? "");
  const [error, setError] = createSignal<string | null>(null);

  // CSR rendering — only when no SSR pre-render or forceClient
  const [katexMod] = createResource(
    () => !resolved().forceClient && !resolved().ssrHtml,
    () => loadKaTeX(),
  );

  const renderClient = async () => {
    const katex = katexMod();
    if (!katex) return;
    const opts = resolved().options ?? {};
    const isDisplay = resolved().mode === "display" || resolved().mode === "mathml";
    try {
      const result = katex.renderToString(resolved().expression, {
        ...opts,
        displayMode: isDisplay,
        throwOnError: true,
        output: resolved().mode === "mathml" ? "mathml" : "htmlAndMathml",
      });
      setHtml(result);
      setError(null);
    } catch (err) {
      setHtml(resolved().expression);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  createEffect(() => {
    // Re-render when expression or mode changes
    void resolved().expression;
    void resolved().mode;
    if (katexMod()) renderClient();
  });

  onMount(() => {
    if (!resolved().ssrHtml && katexMod()) renderClient();
  });

  const ariaLabel = () => `LaTeX: ${resolved().expression}`;

  return (
    <span
      class={`wikisites-latex ${resolved().className ?? ""}`}
      role="math"
      aria-label={ariaLabel()}
    >
      <Switch>
        <Match when={error()}>
          <span
            class="katex-error"
            style={{ color: "var(--katex-error-color, #cc0000)" }}
            title={error()!}
          >
            {resolved().expression}
          </span>
        </Match>
        <Match when={html()}>
          <span innerHTML={html()} />
        </Match>
        <Match when={katexMod.loading}>
          <span class="katex-loading" aria-busy="true">
            …
          </span>
        </Match>
      </Switch>
    </span>
  );
};

export default LaTeXRenderer;
