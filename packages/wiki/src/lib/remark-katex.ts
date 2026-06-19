/**
 * Remark plugin for KaTeX math delimiters.
 *
 * Parses `$...$` (inline) and `$$...$$` (block) math in markdown
 * and transforms them to HTML nodes that KaTeX can render.
 *
 * @module lib/remark-katex
 */

/**
 * Configuration options for the remark-katex plugin.
 */
export interface RemarkKatexOptions {
  /** Enable inline math with single dollar signs. @default true */
  inline?: boolean;
  /** Enable block math with double dollar signs. @default true */
  block?: boolean;
}

/**
 * Minimal AST node type for text nodes.
 */
interface TextNode {
  type: "text";
  value: string;
}

/**
 * Minimal AST node type for HTML nodes.
 */
interface HtmlNode {
  type: "html";
  value: string;
}

/**
 * Minimal AST node type for parent nodes.
 */
interface ParentNode {
  type: string;
  children: Array<TextNode | HtmlNode | ParentNode>;
}

/**
 * Root AST node type.
 */
type Root = ParentNode;

type MdastNode = TextNode | HtmlNode | ParentNode;

/**
 * Regex for detecting math delimiters in text nodes.
 * - Display mode: $$...$$ (greedy, non-nested)
 * - Inline mode: $...$ (non-greedy, no $ inside)
 * - Avoids matching escaped dollar signs (\$) or empty content.
 */
const MATH_REGEX = /(?<!\\)\$\$(.+?)(?<!\\)\$\$|(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g;

/**
 * Escape a string for use in an HTML attribute.
 */
function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Transform text nodes containing math delimiters into
 * a sequence of text and math HTML nodes.
 */
function processTextNode(
  node: TextNode,
  enableInline: boolean,
  enableBlock: boolean,
): MdastNode[] | null {
  const text = node.value;
  if (!text) return null;
  if (!text.includes("$")) return null;

  const nodes: MdastNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MATH_REGEX.lastIndex = 0;

  while ((match = MATH_REGEX.exec(text)) !== null) {
    const fullMatch = match[0]!;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;
    const isDisplay = match[1] !== undefined;
    const expression = (match[1] ?? match[2] ?? "").trim();

    if (!expression) continue;
    if (isDisplay && !enableBlock) continue;
    if (!isDisplay && !enableInline) continue;

    if (matchStart > lastIndex) {
      nodes.push({
        type: "text",
        value: text.slice(lastIndex, matchStart),
      });
    }

    const tag = isDisplay ? "div" : "span";
    const className = isDisplay ? "math-block" : "math-inline";
    const htmlContent = `<${tag} class="${className}" data-latex="${escapeAttr(expression)}" data-display="${String(isDisplay)}"></${tag}>`;

    nodes.push({
      type: "html",
      value: htmlContent,
    });

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    nodes.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  if (nodes.length === 0) return null;
  return nodes;
}

/**
 * Walk an AST and process all text nodes.
 */
function walkAndProcess(
  node: MdastNode,
  enableInline: boolean,
  enableBlock: boolean,
): void {
  if (node.type === "text") {
    // Text nodes don't have children, nothing to walk
    return;
  }

  if ("children" in node) {
    const parent = node as ParentNode;
    let i = 0;
    while (i < parent.children.length) {
      const child = parent.children[i]!;

      if (child.type === "text") {
        const textNode = child as TextNode;
        const replacement = processTextNode(textNode, enableInline, enableBlock);
        if (replacement) {
          parent.children.splice(i, 1, ...replacement);
          i += replacement.length;
          continue;
        }
      } else {
        walkAndProcess(child, enableInline, enableBlock);
      }

      i++;
    }
  }
}

/**
 * Remark plugin that transforms math delimiters to HTML nodes.
 *
 * @example
 * ```ts
 * import remarkKatex from '@wikisites/wiki/lib/remark-katex';
 * import remarkRehype from 'remark-rehype';
 *
 * unified()
 *   .use(remarkKatex)
 *   .use(remarkRehype)
 *   .process(content);
 * ```
 */
function remarkPlugin(options?: RemarkKatexOptions) {
  const opts = options ?? {};
  const enableInline = opts.inline !== false;
  const enableBlock = opts.block !== false;

  return function transformer(tree: Root): void {
    walkAndProcess(tree, enableInline, enableBlock);
  };
}

export default remarkPlugin;