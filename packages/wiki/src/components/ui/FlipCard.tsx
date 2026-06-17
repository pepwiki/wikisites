import { type JSX } from "solid-js";

interface FlipCardProps {
  /** Whether the card is flipped to show the back */
  flipped: boolean;
  /** Height of the card */
  height?: string;
  /** Front face content */
  front: JSX.Element;
  /** Back face content */
  back: JSX.Element;
  /** Click handler for flipping */
  onFlip?: () => void;
  /** Keyboard handler */
  onKeyDown?: (e: KeyboardEvent) => void;
  /** Accessible label for the card */
  ariaLabel?: string;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
}

export default function FlipCard(props: FlipCardProps) {
  const heightClass = () => props.height ?? "h-48";

  return (
    <div
      class={`relative w-full ${heightClass()} ${props.interactive !== false ? "cursor-pointer" : ""} perspective-1000`}
      role={props.interactive !== false ? "button" : undefined}
      tabindex={props.interactive !== false ? 0 : undefined}
      aria-label={props.ariaLabel}
      aria-pressed={props.interactive !== false ? props.flipped : undefined}
      onClick={() => props.onFlip?.()}
      onKeyDown={(e) => props.onKeyDown?.(e)}
    >
      <div
        class={`absolute inset-0 transition-transform duration-500 preserve-3d ${
          props.flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div class="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 border-2 border-[#0D9488] rounded-2xl p-6 flex flex-col items-center justify-center">
          {props.front}
        </div>
        {/* Back */}
        <div class="absolute inset-0 backface-hidden rotate-y-180 bg-[#0f766e] text-white rounded-2xl p-6 flex flex-col items-center justify-center">
          {props.back}
        </div>
      </div>
    </div>
  );
}
