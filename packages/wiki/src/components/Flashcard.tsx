import { createSignal, Show } from "solid-js";

interface FlashcardProps {
  front: string;
  back: string;
  tags?: string[];
}

export default function Flashcard(props: FlashcardProps) {
  const [flipped, setFlipped] = createSignal(false);

  const toggle = () => setFlipped(!flipped());

  return (
    <div
      class="relative w-full h-48 cursor-pointer perspective-1000"
      role="button"
      tabindex="0"
      aria-label={flipped() ? `Back: ${props.back}` : `Front: ${props.front}. Click to flip.`}
      aria-pressed={flipped()}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div
        class={`absolute inset-0 transition-transform duration-500 preserve-3d ${
          flipped() ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div class="absolute inset-0 backface-hidden bg-white border-2 border-[#0D9488] rounded-2xl p-6 flex flex-col items-center justify-center">
          <p class="text-lg font-semibold text-slate-900 text-center">{props.front}</p>
          <p class="text-xs text-slate-400 mt-4" aria-hidden="true">
            Click to flip
          </p>
          <Show when={props.tags && props.tags.length > 0}>
            <div class="flex gap-1 mt-2" aria-label={`Tags: ${props.tags!.join(", ")}`}>
              {props.tags!.map((tag) => (
                <span class="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Show>
        </div>
        {/* Back */}
        <div class="absolute inset-0 backface-hidden rotate-y-180 bg-[#0D9488] text-white rounded-2xl p-6 flex flex-col items-center justify-center">
          <p class="text-lg text-center">{props.back}</p>
          <p class="text-xs text-white/60 mt-4" aria-hidden="true">
            Click to flip back
          </p>
        </div>
      </div>
    </div>
  );
}
