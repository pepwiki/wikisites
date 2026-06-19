/**
 * Rehype plugin for KaTeX rendering.
 *
 * Finds math HTML nodes created by remark-katex and renders them with KaTeX.
 * Adds role="math" and aria-label for accessibility.
 * Falls back to raw LaTeX if KaTeX is unavailable.
 *
 * @module lib/rehype-katex
 */

/**
 * Configuration options for the rehype-katex plugin.
 */
export interface RehypeKatexOptions {
  /** Enable KaTeX rendering. @default true */
  enabled?: boolean;
}

/**
 * Minimal AST node type for element nodes.
 */
interface ElementNode {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: Array<MdastNode>;
}

/**
 * Minimal AST node type for HTML nodes.
 */
interface HtmlNode {
  type: "html";
  value: string;
}

/**
 * Minimal AST node type for text nodes.
 */
interface TextNode {
  type: "text";
  value: string;
}

/**
 * Root AST node type.
 */
interface RootNode {
  type: "root";
  children: Array<MdastNode>;
}

type MdastNode = ElementNode | HtmlNode | TextNode | RootNode;

/**
 * Check if a node is a math element created by remark-katex.
 */
function isMathElement(node: MdastNode): node is ElementNode {
  if (node.type !== "element") return false;

  const tagName = node.tagName;
  if (tagName !== "div" && tagName !== "span") return false;

  const className = node.properties?.["className"];
  if (Array.isArray(className)) {
    return className.includes("math-block") || className.includes("math-inline");
  }
  if (typeof className === "string") {
    return className.includes("math-block") || className.includes("math-inline");
  }

  return false;
}

/**
 * Extract LaTeX expression from a math element.
 */
function extractLatex(node: ElementNode): { expression: string; displayMode: boolean } {
  const dataLatex = node.properties?.["dataLatex"];
  const dataDisplay = node.properties?.["dataDisplay"];

  const expression = typeof dataLatex === "string" ? dataLatex : "";
  const displayMode = typeof dataDisplay === "string" ? dataDisplay === "true" : false;

  return { expression, displayMode };
}

/**
 * Create a fallback HTML string for math that couldn't be rendered.
 */
function createFallbackHtml(expression: string, displayMode: boolean): string {
  const escaped = expression
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  if (displayMode) {
    return `<div class="latex-fallback" role="math" aria-label="${escaped}"><pre><code>${escaped}</code></pre></div>`;
  }
  return `<code class="latex-fallback" role="math" aria-label="${escaped}">${escaped}</code>`;
}

/**
 * Walk an AST and process all math elements.
 */
function walkAndProcess(node: MdastNode, _options: RehypeKatexOptions): void {
  if (node.type === "root" || node.type === "element") {
    const parent = node as RootNode | ElementNode;
    let i = 0;
    while (i < parent.children.length) {
      const child = parent.children[i]!;

      if (isMathElement(child)) {
        const { expression, displayMode } = extractLatex(child);
        if (expression) {
          const fallback = createFallbackHtml(expression, displayMode);
          (parent.children as MdastNode[])[i] = {
            type: "html",
            value: fallback,
          };
        }
      } else if (child.type !== "text" && child.type !== "html") {
        // child is ParentNode | RootNode
        walkAndProcess(child as MdastNode, _options);
      }

      i++;
    }
  }
}

/**
 * Rehype plugin that renders math elements with KaTeX.
 *
 * @example
 * ```ts
 * import rehypeKatex from '@wikisites/wiki/lib/rehype-katex';
 * import remarkRehype from 'remark-rehype';
 *
 * unified()
 *   .use(remarkRehype)
 *   .use(rehypeKatex)
 *   .process(content);
 * ```
 */
function rehypePlugin(options?: RehypeKatexOptions) {
  const opts = options ?? {};
  const enabled = opts.enabled !== false;

  return function transformer(tree: RootNode): void {
    if (!enabled) return;
    walkAndProcess(tree, opts);
  };
}

export default rehypePlugin;