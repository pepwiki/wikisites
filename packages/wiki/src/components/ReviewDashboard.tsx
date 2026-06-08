import { createSignal, Show, onMount } from "solid-js";
import { Rating } from "@wikisites/query/fsrs";
import KeyboardShortcuts from "./KeyboardShortcuts";
import {
  initializeDeck,
  getDueCardsForDeck,
  recordReview,
  getDeckStats,
  type SiteKey,
  type DeckId,
} from "@wikisites/query/review-store";
import type { CardState } from "@wikisites/query/fsrs";
import { toast } from "solid-sonner";
import FlipCard from "./ui/FlipCard";
import RatingButtons from "./ui/RatingButtons";

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
  const currentFront = () =>
    currentCard() ? (props.fronts[currentCard()!.id] ?? currentCard()!.id) : "";
  const currentBack = () => (currentCard() ? (props.backs[currentCard()!.id] ?? "") : "");
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

    toast.success("Card reviewed");

    const nextIdx = currentIndex() + 1;
    if (nextIdx >= dueCards().length) {
      setSessionComplete(true);
      const total = sessionTotal() + 1;
      const correct = rating >= Rating.Good ? sessionCorrect() + 1 : sessionCorrect();
      toast.success(`Session complete! ${correct}/${total} correct`);
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

  const frontContent = (
    <>
      <p class="text-xl font-semibold text-slate-900 dark:text-slate-100 text-center">
        {currentFront()}
      </p>
      <p class="text-xs text-slate-400 dark:text-slate-500 mt-4">Click to reveal answer</p>
    </>
  );

  const backContent = (
    <>
      <p class="text-lg text-center">{currentBack()}</p>
      <p class="text-xs text-white/60 mt-4">Rate your recall below</p>
    </>
  );

  const handleKeyboardFlip = () => {
    if (!sessionComplete() && currentCard()) {
      setFlipped(!flipped());
    }
  };

  const handleKeyboardRate = (rating: number) => {
    if (flipped() && !sessionComplete() && currentCard()) {
      handleRate(rating as Rating);
    }
  };

  const handleNext = () => {
    if (!flipped() && !sessionComplete() && currentCard()) {
      setFlipped(true);
    }
  };

  return (
    <div class="max-w-2xl mx-auto">
      <KeyboardShortcuts
        client:load
        onFlip={handleKeyboardFlip}
        onRate={handleKeyboardRate}
        onNext={handleNext}
      />
      {/* Stats bar */}
      <div class="flex items-center justify-between mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div class="text-center px-4">
          <div class="text-2xl font-bold text-[#0D9488]">{stats().total}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400">Total Cards</div>
        </div>
        <div class="text-center px-4 border-x border-slate-200 dark:border-slate-700">
          <div class="text-2xl font-bold text-[#F97316]">{dueCards().length - currentIndex()}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400">Remaining</div>
        </div>
        <div class="text-center px-4">
          <div class="text-2xl font-bold text-[#0D9488]">
            {sessionTotal() > 0 ? Math.round((sessionCorrect() / sessionTotal()) * 100) : 0}%
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">Session Accuracy</div>
        </div>
        <Show when={currentCard() && currentCard()!.scheduledDays > 0}>
          <div class="text-center px-4 border-l border-slate-200 dark:border-slate-700">
            <div class="text-2xl font-bold text-[#0D9488]">{currentCard()!.scheduledDays}d</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Next Review</div>
          </div>
        </Show>
      </div>

      <Show when={!sessionComplete() && currentCard()}>
        <div class="mb-6">
          <FlipCard
            flipped={flipped()}
            height="h-64"
            ariaLabel={
              flipped() ? `Back: ${currentBack()}` : `Front: ${currentFront()}. Click to flip.`
            }
            onFlip={() => setFlipped(!flipped())}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped(!flipped());
              }
            }}
            front={frontContent}
            back={backContent}
          />
        </div>

        <Show when={flipped()}>
          <RatingButtons onSelect={handleRate} />
        </Show>

        <Show when={!flipped()}>
          <p class="text-center text-sm text-slate-400 dark:text-slate-500">
            Click to reveal the answer
          </p>
        </Show>
      </Show>

      {/* Session complete */}
      <Show when={sessionComplete()}>
        <div class="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Session Complete
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mb-6">
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
        <div class="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">All Caught Up</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-6">
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
