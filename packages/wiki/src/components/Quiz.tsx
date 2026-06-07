import { createSignal, For, Show, onMount } from "solid-js";
import { Rating } from "@wikisites/query/fsrs";
import {
  initializeDeck,
  recordReview,
  loadCards,
  type SiteKey,
  type DeckId,
} from "@wikisites/query/review-store";
import type { CardState } from "@wikisites/query/fsrs";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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

export default function Quiz(props: QuizProps) {
  const [selected, setSelected] = createSignal<number | null>(null);
  const [revealed, setRevealed] = createSignal(false);
  const [rated, setRated] = createSignal(false);
  const [cardState, setCardState] = createSignal<CardState | null>(null);

  const isFSRS = () => Boolean(props.cardId && props.site && props.deckId);

  onMount(() => {
    if (!isFSRS()) return;
    initializeDeck(props.site!, props.deckId!, [props.cardId!]);
    const cards = loadCards(props.site!, props.deckId!);
    const card = cards.find((c) => c.id === props.cardId);
    if (card) setCardState(card);
  });

  const submit = () => {
    if (selected() !== null) {
      setRevealed(true);
      // Auto-rate via FSRS on answer reveal
      if (isFSRS() && !rated()) {
        const correct = selected() === props.correctIndex;
        const rating = correct ? Rating.Good : Rating.Again;
        const result = recordReview(props.site!, props.deckId!, props.cardId!, rating);
        if (result) setCardState(result.card);
        setRated(true);
      }
    }
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
    setRated(false);
  };

  const isCorrect = () => selected() === props.correctIndex;

  return (
    <div
      class="bg-white border border-slate-200 rounded-2xl p-6 my-6 shadow-sm"
      role="group"
      aria-label="Quiz question"
    >
      <div class="flex items-center gap-2 mb-2">
        <Show when={isFSRS() && cardState()}>
          <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(cardState())}`}>
            {getStatusLabel(cardState())}
          </span>
        </Show>
      </div>
      <h4 class="font-bold text-slate-900 mb-4">{props.question}</h4>
      <fieldset>
        <legend class="sr-only">Select your answer</legend>
        <div class="space-y-2" role="radiogroup">
          <For each={props.options}>
            {(option, index) => (
              <button
                type="button"
                role="radio"
                aria-checked={selected() === index()}
                aria-label={`${String.fromCharCode(65 + index())}. ${option}`}
                class={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  selected() === index()
                    ? revealed()
                      ? index() === props.correctIndex
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-[#0D9488] bg-[#0D9488]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => !revealed() && setSelected(index())}
                disabled={revealed()}
              >
                <span class="font-medium mr-2" aria-hidden="true">
                  {String.fromCharCode(65 + index())}.
                </span>
                {option}
              </button>
            )}
          </For>
        </div>
      </fieldset>
      <Show when={!revealed()}>
        <button
          type="button"
          class="mt-4 px-6 py-2 bg-[#0D9488] text-white rounded-full font-medium disabled:opacity-50 hover:bg-[#0D9488]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 transition-colors"
          onClick={submit}
          disabled={selected() === null}
          aria-label="Check answer"
        >
          Check Answer
        </button>
      </Show>
      <Show when={revealed()}>
        <div
          class={`mt-4 p-4 rounded-xl ${isCorrect() ? "bg-green-50" : "bg-red-50"}`}
          role="alert"
          aria-live="polite"
        >
          <p class={`font-bold ${isCorrect() ? "text-green-700" : "text-red-700"}`}>
            {isCorrect() ? "Correct!" : "Incorrect"}
          </p>
          <p class="text-slate-600 text-sm mt-1">{props.explanation}</p>
          <button
            type="button"
            class="mt-2 text-sm text-[#0D9488] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 rounded"
            onClick={reset}
            aria-label="Reset question and try again"
          >
            Try Again
          </button>
        </div>
      </Show>
    </div>
  );
}
