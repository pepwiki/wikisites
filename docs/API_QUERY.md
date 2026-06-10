# @wikisites/query API Documentation

## Overview

The `@wikisites/query` package provides the search engine, FSRS spaced repetition algorithm, and review store.

## Exports

### Search

#### `searchPeptides(query: SearchQuery): SearchResult[]`

Search peptides by name, alias, or sequence.

```typescript
import { searchPeptides } from "@wikisites/query";
const results = searchPeptides({ query: "glutathione", limit: 10 });
```

#### `SearchQuerySchema`

Zod schema for search queries.

```typescript
import { SearchQuerySchema } from "@wikisites/query";
SearchQuerySchema.parse({ query: "oxytocin", limit: 10 });
```

### FSRS (Free Spaced Repetition Scheduler)

#### `createCard(id: string): CardState`

Create a new flashcard with default state.

#### `repeat(card: CardState, rating: Rating): CardState`

Process a review and get the next card state.

```typescript
import { repeat, Rating, createCard } from "@wikisites/query";
const card = createCard("glycine");
const reviewed = repeat(card, Rating.Good);
console.log(reviewed.scheduledDays); // Next review interval
```

#### `isDue(card: CardState): boolean`

Check if a card is due for review.

#### `getDueCards(cards: CardState[]): CardState[]`

Filter cards that are due for review.

### Review Store

#### `saveCards(site: SiteKey, deckId: DeckId, cards: CardState[]): void`

Save cards to localStorage.

#### `loadCards(site: SiteKey, deckId: DeckId): CardState[]`

Load cards from localStorage.

#### `initializeDeck(site: SiteKey, deckId: DeckId, cardIds: string[]): CardState[]`

Initialize a deck with new cards (preserving existing).

#### `recordReview(site: SiteKey, deckId: DeckId, cardId: string, rating: Rating): CardState | null`

Record a review and save updated state.

### Session Stats

#### `calculateStreak(lastReviewDate: string | null): number`

Calculate the current streak in days.

#### `mergeSession(allTime: SessionData, session: SessionSnapshot, now: Date): SessionData`

Merge session data into all-time stats.

#### `emptySessionData(): SessionData`

Get zeroed-out session data.

### Card Status

#### `getStatusLabel(card: CardState | null): string`

Get human-readable status label (New, Learning, Review).

#### `getStatusColor(card: CardState | null): string`

Get Tailwind color class for card status.
