import { createSignal, onMount, Show } from "solid-js";
import { renderWithKaTeX } from "../lib/latex-client";
import { renderLatexSync } from "../lib/latex-renderer";

interface LaTeXBlockProps {
  expression: string;
  displayMode?: boolean;
}

export default function LaTeXBlock(props: LaTeXBlockProps) {
  const [html, setHtml] = createSignal<string>("");
  const [loaded, setLoaded] = createSignal(false);

  const fallback = () => renderLatexSync(props.expression, props.displayMode ?? false);

  onMount(async () => {
    try {
      const result = await renderWithKaTeX(props.expression, props.displayMode ?? false);
      setHtml(result);
    } catch {
      setHtml(fallback());
    } finally {
      setLoaded(true);
    }
  });

  const ariaLabel = () => props.expression;

  return (
    <Show
      when={loaded()}
      fallback={
        <span
          role="math"
          aria-label={ariaLabel()}
          class="latex-fallback"
        >
          {fallback()}
        </span>
      }
    >
      <Show when={props.displayMode}>
        <div
          role="math"
          aria-label={ariaLabel()}
          innerHTML={html()}
        />
      </Show>
      <Show when={!props.displayMode}>
        <span
          role="math"
          aria-label={ariaLabel()}
          innerHTML={html()}
        />
      </Show>
    </Show>
  );
}
