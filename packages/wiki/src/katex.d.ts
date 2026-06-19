declare module "katex" {
  interface KatexOptions {
    displayMode?: boolean;
    throwOnError?: boolean;
    output?: "html" | "mathml" | "htmlAndMathml";
  }

  function renderToString(expression: string, options?: KatexOptions): string;
}
