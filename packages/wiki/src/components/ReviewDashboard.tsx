import { createSignal, For, Show, onMount } from "solid-js";
import { Rating } from "@wikisites/query/fsrs";
import {
  initializeDeck,
  getDueCardsForDeck,
  recordReview,
  getDeckStats,
  type SiteKey,
  type DeckId,
} from "@wikisites/query/review-store";
import type { CardState } from "@wikisites/query/fsrs";

interface ReviewDashboardProps {
  site: SiteKey;
  deckId: DeckId;
  /** Card IDs to initialize the deck with if empty. */
  cardIds: string[];
  /** Map from card ID to display front text. */
  fronts: Record<string, string>;
  /** Map from card ID to display back text. */
  backs: Record<string, string>;
}

export default function ReviewDashboard(props: ReviewDashboardProps) {
  const [dueCards, setDueCards] = createSignal<Array<CardState>>([]);
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [flipped, setFlipped] = createSignal(false);
  const [sessionCorrect, setSessionCorrect] = createSignal(0);
  const [sessionTotal, setSessionTotal] = createSignal(0);
  const [sessionComplete, setSessionComplete] = createSignal(false);
  const [initialized, setInitialized] = createSignal(false);

  const currentCard = () => dueCards()[currentIndex()];
  const currentFront = () => currentCard() ? props.fronts[currentCard()!.id] ?? currentCard()!.id : "";
  const currentBack = () => currentCard() ? props.backs[currentCard()!.id] ?? "" : "";
  const stats = () => getDeckStats(props.site, props.deckId);

  const loadDue = () => {
    initializeDeck(props.site, props.deckId, props.cardIds);
    const due = getDueCardsForDeck(props.site, props.deckId);
    setDueCards(due);
    setCurrentIndex(0);
    setFlipped(false);
    setSessionComplete(due.length === 0);
    setInitialized(true);
  };

  onMount(() => {
    loadDue();
  });

  const handleRate = (rating: Rating) => {
    const card = currentCard();
    if (!card) return;

    recordReview(props.site, props.deckId, card.id, rating);

    setSessionTotal((prev) => prev + 1);
    if (rating >= Rating.Good) {
      setSessionCorrect((prev) => prev + 1);
    }

    // Move to next card
    const nextIdx = currentIndex() + 1;
    if (nextIdx >= dueCards().length) {
      setSessionComplete(true);
    } else {
      setCurrentIndex(nextIdx);
      setFlipped(false);
    }
  };

  const resetSession = () => {
    loadDue();
    setSessionCorrect(0);
    setSessionTotal(0);
  };

  return (
    <div class="max-w-2xl mx-auto">
      {/* Stats bar */}
      <div class="flex items-center justify-between mb-6 p-4 bg-white rounded-2xl border border-slate-100">
        <div class="text-center px-4">
          <div class="text-2xl font-bold text-[#0D9488]">{stats().total}</div>
          <div class="text-xs text-slate-500">Total Cards</div>
        </div>
        <div class="text-center px-4 border-x border-slate-200">
          <div class="text-2xl font-bold text-[#F97316]">{dueCards().length - currentIndex()}</div>
          <div class="text-xs text-slate-500">Remaining</div>
        </div>
        <div class="text-center px-4">
          <div class="text-2xl font-bold text-[#0D9488]">
            {sessionTotal() > 0 ? Math.round((sessionCorrect() / sessionTotal()) * 100) : 0}%
          </div>
          <div class="text-xs text-slate-500">Session Accuracy</div>
        </div>
      </div>

      <Show when={!sessionComplete() && currentCard()}>
        {/* Card display */}
        <div
          class="relative w-full h-64 cursor-pointer mb-6 perspective-1000"
          role="button"
          tabindex="0"
          aria-label={flipped() ? `Back: ${currentBack()}` : `Front: ${currentFront()}. Click to flip.`}
          onClick={() => setFlipped(!flipped())}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped(!flipped());
            }
          }}
        >
          <div class={`absolute inset-0 transition-transform duration-500 preserve-3d ${flipped() ? "rotate-y-180" : ""}`}>
            {/* Front */}
            <div class="absolute inset-0 backface-hidden bg-white border-2 border-[#0D9488] rounded-2xl p-8 flex flex-col items-center justify-center">
              <p class="text-xl font-semibold text-slate-900 text-center">{currentFront()}</p>
              <p class="text-xs text-slate-400 mt-4">Click to reveal answer</p>
            </div>
            {/* Back */}
            <div class="absolute inset-0 backface-hidden rotate-y-180 bg-[#0D9488] text-white rounded-2xl p-8 flex flex-col items-center justify-center">
              <p class="text-lg text-center">{currentBack()}</p>
              <p class="text-xs text-white/60 mt-4">Rate your recall below</p>
            </div>
          </div>
        </div>

        {/* Rating buttons */}
        <Show when={flipped()}>
          <div class="grid grid-cols-4 gap-3">
            <button
              type="button"
              class="px-4 py-3 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => handleRate(Rating.Again)}
            >
              Again
            </button>
            <button
              type="button"
              class="px-4 py-3 bg-orange-50 border-2 border-orange-200 text-orange-700 rounded-xl font-medium hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => handleRate(Rating.Hard)}
            >
              Hard
            </button>
            <button
              type="button"
              class="px-4 py-3 bg-teal-50 border-2 border-teal-200 text-teal-700 rounded-xl font-medium hover:bg-teal-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
              onClick={() => handleRate(Rating.Good)}
            >
              Good
            </button>
            <button
              type="button"
              class="px-4 py-3 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => handleRate(Rating.Easy)}
            >
              Easy
            </button>
          </div>
        </Show>

        <Show when={!flipped()}>
          <p class="text-center text-sm text-slate-400">Click the card to reveal the answer</p>
        </Show>
      </Show>

      {/* Session complete */}
      <Show when={sessionComplete()}>
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Session Complete</h3>
          <p class="text-slate-600 mb-6">
            You reviewed {sessionTotal()} cards with{" "}
            {sessionTotal() > 0 ? Math.round((sessionCorrect() / sessionTotal()) * 100) : 0}%
            accuracy.
          </p>
          <button
            type="button"
            class="px-6 py-3 bg-[#0D9488] text-white rounded-full font-medium hover:bg-[#0D9488]/90 transition-colors"
            onClick={resetSession}
          >
            Review Again
          </button>
        </div>
      </Show>

      {/* No cards due */}
      <Show when={initialized() && dueCards().length === 0 && !sessionComplete()}>
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <h3 class="text-2xl font-bold text-slate-900 mb-2">All Caught Up</h3>
          <p class="text-slate-600 mb-6">
            No cards are due for review right now. Come back later for your next session.
          </p>
          <button
            type="button"
            class="px-6 py-3 bg-[#0D9488] text-white rounded-full font-medium hover:bg-[#0D9488]/90 transition-colors"
            onClick={resetSession}
          >
            Refresh
          </button>
        </div>
      </Show>
    </div>
  );
}
