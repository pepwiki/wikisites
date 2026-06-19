import { createSignal, onMount, onCleanup } from "solid-js";

export default function ReadingProgress() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    onCleanup(() => {
      window.removeEventListener("scroll", update);
    });
  });

  return (
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-[60]"
      role="progressbar"
      aria-valuenow={Math.round(progress())}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        class="h-full bg-[#0f766e] transition-all duration-150"
        style={{ width: `${progress()}%` }}
      />
    </div>
  );
}
