import { createSignal, Show, onMount } from "solid-js";
import { Rating } from "@wikisites/query/fsrs";
import {
  initializeDeck,
  recordReview,
  loadCards,
  type SiteKey,
  type DeckId,
} from "@wikisites/query/review-store";
import type { CardState } from "@wikisites/query/fsrs";

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

function getStatusLabel(card: CardState | null): string {
  if (!card || card.repetitions === 0) return "New";
  if (card.lapses > 0 && card.repetitions <= 1) return "Learning";
  if (card.scheduledDays <= 1) return "Learning";
  return "Review";
}

function getStatusColor(card: CardState | null): string {
  if (!card || card.repetitions === 0) return "bg-blue-100 text-blue-700";
  if (card.lapses > 0 && card.repetitions <= 1) return "bg-orange-100 text-orange-700";
  if (card.scheduledDays <= 1) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}

export default function Flashcard(props: FlashcardProps) {
  const [flipped, setFlipped] = createSignal(false);
  const [cardState, setCardState] = createSignal<CardState | null>(null);
  const [rated, setRated] = createSignal(false);

  const isFSRS = () => Boolean(props.cardId && props.site && props.deckId);

  onMount(() => {
    if (!isFSRS()) return;
    // Initialize deck if needed, then load card state
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
  };

  const resetCard = () => {
    setFlipped(false);
    setRated(false);
  };

  return (
    <div class="w-full">
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
            <div class="flex items-center gap-2 mb-2">
              <Show when={isFSRS() && cardState()}>
                <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(cardState())}`}>
                  {getStatusLabel(cardState())}
                </span>
              </Show>
            </div>
            <p class="text-lg font-semibold text-slate-900 text-center">{props.front}</p>
            <p class="text-xs text-slate-400 mt-4" aria-hidden="true">
              {rated() ? "Rated" : "Click to flip"}
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
              Rate your recall below
            </p>
          </div>
        </div>
      </div>

      {/* FSRS Rating Buttons */}
      <Show when={isFSRS() && flipped() && !rated()}>
        <div class="grid grid-cols-4 gap-2 mt-3">
          <button
            type="button"
            class="px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            onClick={() => handleRate(Rating.Again)}
          >
            Again
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors"
            onClick={() => handleRate(Rating.Hard)}
          >
            Hard
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
            onClick={() => handleRate(Rating.Good)}
          >
            Good
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
            onClick={() => handleRate(Rating.Easy)}
          >
            Easy
          </button>
        </div>
      </Show>

      {/* Rated indicator */}
      <Show when={isFSRS() && rated()}>
        <div class="mt-3 text-center">
          <span class="text-xs text-[#0D9488] font-medium">Rated</span>
          <button
            type="button"
            class="ml-2 text-xs text-slate-400 hover:text-slate-600 underline"
            onClick={resetCard}
          >
            Flip again
          </button>
        </div>
      </Show>
    </div>
  );
}
