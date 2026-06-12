import { createSignal, For, Show, onMount } from "solid-js";
import { Rating } from "@wikisites/query/fsrs";
import {
  initializeDeck,
  recordReview,
  loadCards,
  type SiteKey,
  type DeckId,
} from "@wikisites/query/review-store";
import { getStatusLabel, getStatusColor } from "@wikisites/query/card-status";
import type { CardState } from "@wikisites/query/fsrs";
import { toastSuccess, toastError } from "../lib/toast";
import { useSessionOptional } from "../context";
import RatingButtons from "./ui/RatingButtons";

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
  /** Called when the answer is revealed. */
  onReveal?: (correct: boolean) => void;
}

export default function Quiz(props: QuizProps) {
  const sessionCtx = useSessionOptional();
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
      if (isFSRS() && !rated()) {
        const correct = selected() === props.correctIndex;
        const rating = correct ? Rating.Good : Rating.Again;
        const result = recordReview(props.site!, props.deckId!, props.cardId!, rating);
        if (result) setCardState(result.card);
        setRated(true);
        if (correct) {
          toastSuccess("Correct!");
        } else {
          toastError("Incorrect");
        }
      }
      sessionCtx?.recordQuiz(isCorrect());
      props.onReveal?.(isCorrect());
    }
  };

  const handleManualRate = (rating: Rating) => {
    if (!isFSRS()) return;
    const result = recordReview(props.site!, props.deckId!, props.cardId!, rating);
    if (result) setCardState(result.card);
    const label = Rating[rating];
    toastSuccess(`Rated: ${label}`);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
    setRated(false);
  };

  const isCorrect = () => selected() === props.correctIndex;

  return (
    <div
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 my-6 shadow-sm"
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
      <h4 class="font-bold text-slate-900 dark:text-slate-100 mb-4">{props.question}</h4>
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
                        ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-400"
                        : "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400"
                      : "border-[#0D9488] bg-[#0f766e]/5"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500"
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
          class="mt-4 px-6 py-2 bg-[#0f766e] text-white rounded-full font-medium disabled:opacity-50 hover:bg-[#0f766e]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
          onClick={submit}
          disabled={selected() === null}
          aria-label="Check answer"
        >
          Check Answer
        </button>
      </Show>
      <Show when={revealed()}>
        <div
          class={`mt-4 p-4 rounded-xl ${isCorrect() ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"}`}
          role="alert"
          aria-live="polite"
        >
          <p
            class={`font-bold ${isCorrect() ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
          >
            {isCorrect() ? "Correct!" : "Incorrect"}
          </p>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">{props.explanation}</p>
          <Show when={isFSRS()}>
            <div class="mt-3">
              <RatingButtons onSelect={handleManualRate} size="sm" />
            </div>
          </Show>
          <button
            type="button"
            class="mt-2 text-sm text-[#0f766e] dark:text-[#2dd4bf] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded"
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
