import { onMount, onCleanup } from "solid-js";

interface KeyboardShortcutsProps {
  onFlip?: () => void;
  onRate?: (rating: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function KeyboardShortcuts(props: KeyboardShortcutsProps) {
  onMount(() => {
    if (typeof document === "undefined") return;

    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          props.onFlip?.();
          break;
        case "1":
          props.onRate?.(1);
          break;
        case "2":
          props.onRate?.(2);
          break;
        case "3":
          props.onRate?.(3);
          break;
        case "4":
          props.onRate?.(4);
          break;
        case "ArrowRight":
          props.onNext?.();
          break;
        case "ArrowLeft":
          props.onPrevious?.();
          break;
      }
    };

    document.addEventListener("keydown", handler);

    onCleanup(() => {
      document.removeEventListener("keydown", handler);
    });
  });

  return null;
}
