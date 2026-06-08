import { createSignal, createEffect, For, Show } from "solid-js";
import Flashcard from "./Flashcard";
import type { SiteKey, DeckId } from "@wikisites/query/review-store";
import { loadCards } from "@wikisites/query/review-store";
import { isDue } from "@wikisites/query/fsrs";
import type { CardState } from "@wikisites/query/fsrs";
import KeyboardShortcuts from "./KeyboardShortcuts";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
  tags: string[];
  difficulty: string;
}

interface FlashcardDeckProps {
  cards: FlashcardData[];
  site: SiteKey;
  deckId: DeckId;
}

export default function FlashcardDeck(props: FlashcardDeckProps) {
  const [activeTag, setActiveTag] = createSignal<string | null>(null);
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [sortedCards, setSortedCards] = createSignal<FlashcardData[]>([]);
  const [dueCount, setDueCount] = createSignal(0);

  createEffect(() => {
    const cards = props.cards;
    const now = new Date();

    let fsrsStates: CardState[] = [];
    try {
      fsrsStates = loadCards(props.site, props.deckId);
    } catch {
      // SSR or localStorage unavailable
    }

    const stateMap = new Map<string, CardState>();
    for (const state of fsrsStates) {
      stateMap.set(state.id, state);
    }

    const withDue = cards.map((card) => ({
      card,
      state: stateMap.get(card.id) ?? null,
    }));

    const due = withDue
      .filter(({ state }) => state && isDue(state, now))
      .sort((a, b) => {
        const aTime = a.state ? new Date(a.state.lastReview).getTime() : 0;
        const bTime = b.state ? new Date(b.state.lastReview).getTime() : 0;
        return aTime - bTime;
      })
      .map(({ card }) => card);

    const nonDue = withDue
      .filter(({ state }) => !state || !isDue(state, now))
      .map(({ card }) => card);

    setDueCount(due.length);
    setSortedCards([...due, ...nonDue]);
  });

  const allTags = () => {
    const tags = new Set<string>();
    for (const card of props.cards) {
      for (const tag of card.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags).sort();
  };

  const filteredCards = () => {
    const cards = sortedCards();
    if (!activeTag()) return cards;
    return cards.filter((c) => c.tags.includes(activeTag()!));
  };

  const currentCard = () => filteredCards()[currentIndex()];

  const handleRate = () => {
    const next = currentIndex() + 1;
    if (next >= filteredCards().length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(next);
    }
  };

  const selectTag = (tag: string | null) => {
    setActiveTag(tag);
    setCurrentIndex(0);
  };

  const handleNextShortcut = () => {
    handleRate();
  };

  return (
    <div>
      <KeyboardShortcuts client:load onNext={handleNextShortcut} />
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          class={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeTag() === null
              ? "bg-[#0D9488] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
          onClick={() => selectTag(null)}
        >
          All ({props.cards.length})
        </button>
        <For each={allTags()}>
          {(tag) => (
            <button
              type="button"
              class={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTag() === tag
                  ? "bg-[#0D9488] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              onClick={() => selectTag(tag)}
            >
              {tag} ({props.cards.filter((c) => c.tags.includes(tag)).length})
            </button>
          )}
        </For>
      </div>

      <Show when={dueCount() > 0}>
        <div class="mb-3 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg">
          {dueCount()} card{dueCount() !== 1 ? "s" : ""} due
        </div>
      </Show>

      <div class="flex items-center gap-3 mb-4 text-sm text-slate-500">
        <span>Card {currentIndex() + 1} of {filteredCards().length}</span>
        <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#0D9488] rounded-full transition-all"
            style={{ width: `${((currentIndex() + 1) / filteredCards().length) * 100}%` }}
          />
        </div>
      </div>

      <Show when={currentCard()}>
        <Flashcard
          front={currentCard()!.front}
          back={currentCard()!.back}
          tags={currentCard()!.tags}
          cardId={currentCard()!.id}
          site={props.site}
          deckId={props.deckId}
        />
        <button
          type="button"
          class="mt-4 w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
          onClick={handleRate}
        >
          Next Card
        </button>
      </Show>
    </div>
  );
}