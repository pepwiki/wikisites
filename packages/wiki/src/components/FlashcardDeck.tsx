import { createSignal, For, Show } from "solid-js";
import Flashcard from "./Flashcard";
import type { SiteKey, DeckId } from "@wikisites/query/review-store";

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
    if (!activeTag()) return props.cards;
    return props.cards.filter((c) => c.tags.includes(activeTag()!));
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

  return (
    <div>
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