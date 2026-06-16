import { getStatusColor, getStatusLabel } from "@wikisites/query/card-status";
import type { CardState } from "@wikisites/query/fsrs";
import { Rating } from "@wikisites/query/fsrs";
import {
  type DeckId,
  initializeDeck,
  loadCards,
  recordReview,
  type SiteKey,
} from "@wikisites/query/review-store";
import { createSignal, onMount, Show } from "solid-js";
import { toastSuccess } from "../lib/toast";
import FlipCard from "./ui/FlipCard";
import RatingButtons from "./ui/RatingButtons";

interface FlashcardProps {
  front: string;
  back: string;
  tags?: string[];
  /** FSRS card ID (if provided, enables spaced repetition tracking). */
  cardId?: string;
  /** Site key for FSRS persistence. */
  site?: SiteKey;
  /** Deck ID for FSRS persistence. */
  deckId?: DeckId;
}

export default function Flashcard(props: FlashcardProps) {
  const [flipped, setFlipped] = createSignal(false);
  const [cardState, setCardState] = createSignal<CardState | null>(null);
  const [rated, setRated] = createSignal(false);

  const isFSRS = () => Boolean(props.cardId && props.site && props.deckId);

  onMount(() => {
    if (!isFSRS()) return;
    initializeDeck(props.site!, props.deckId!, [props.cardId!]);
    const cards = loadCards(props.site!, props.deckId!);
    const card = cards.find((c) => c.id === props.cardId);
    if (card) setCardState(card);
  });

  const toggle = () => {
    if (!rated()) setFlipped(!flipped());
  };

  const handleRate = (rating: Rating) => {
    if (!isFSRS()) return;
    const result = recordReview(props.site!, props.deckId!, props.cardId!, rating);
    if (result) setCardState(result.card);
    setRated(true);
    setFlipped(false);
    const label = Rating[rating];
    toastSuccess(`Card rated: ${label}`);
  };

  const resetCard = () => {
    setFlipped(false);
    setRated(false);
  };

  const frontContent = (
    <>
      <div class="flex items-center gap-2 mb-2">
        <Show when={isFSRS() && cardState()}>
          <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(cardState())}`}>
            {getStatusLabel(cardState())}
          </span>
        </Show>
      </div>
      <p class="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center">
        {props.front}
      </p>
      <Show when={!rated()}>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-4" aria-hidden="true">
          Click to flip
        </p>
      </Show>
      <Show when={props.tags && props.tags.length > 0}>
        <div class="flex gap-1 mt-2" aria-label={`Tags: ${props.tags!.join(", ")}`}>
          {props.tags!.map((tag) => (
            <span class="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </Show>
    </>
  );

  const backContent = (
    <>
      <p class="text-lg text-center">{props.back}</p>
      <p class="text-xs text-white/60 mt-4" aria-hidden="true">
        Rate your recall below
      </p>
    </>
  );

  return (
    <div class="w-full">
      <FlipCard
        flipped={flipped()}
        onFlip={toggle}
        ariaLabel={flipped() ? `Back: ${props.back}` : `Front: ${props.front}. Click to flip.`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        front={frontContent}
        back={backContent}
      />

      <Show when={isFSRS() && flipped() && !rated()}>
        <div class="mt-3">
          <RatingButtons onSelect={handleRate} size="sm" />
        </div>
      </Show>

      <Show when={isFSRS() && rated()}>
        <div class="mt-3 text-center">
          <span class="text-xs text-[#0f766e] dark:text-[#2dd4bf] font-medium">Rated</span>
          <button
            type="button"
            class="ml-2 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline"
            onClick={resetCard}
          >
            Flip again
          </button>
        </div>
      </Show>
    </div>
  );
}
