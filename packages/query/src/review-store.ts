/**
 * LocalStorage-backed review state manager for FSRS cards.
 *
 * Provides deterministic read/write of CardState arrays keyed by site and deck.
 * All operations are synchronous (localStorage is sync).
 * Handles JSON parse errors, quota exceeded, and SSR (no window).
 */

import type { CardState } from "./fsrs";
import type { Rating } from "./fsrs";
import { createCard, repeat, getDueCards } from "./fsrs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Deck identifier: maps to a content collection slug. */
export type DeckId = string;

/** Storage key prefix per site. */
export type SiteKey = "encp" | "wiki";

/** Serialized deck state in localStorage. */
interface StoredDeck {
  readonly site: SiteKey;
  readonly deckId: DeckId;
  readonly cards: Array<CardState>;
  readonly updatedAt: string;
}

/** Review session stats. */
export interface ReviewStats {
  readonly total: number;
  readonly reviewed: number;
  readonly correct: number;
  readonly incorrect: number;
  readonly accuracy: number;
  readonly avgInterval: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = "wikisites:review:";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function storageKey(site: SiteKey, deckId: DeckId): string {
  return `${STORAGE_PREFIX}${site}:${deckId}`;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadRaw(site: SiteKey, deckId: DeckId): StoredDeck | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(storageKey(site, deckId));
    if (!raw) return null;
    return JSON.parse(raw) as StoredDeck;
  } catch {
    return null;
  }
}

function saveRaw(site: SiteKey, deckId: DeckId, data: StoredDeck): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(storageKey(site, deckId), JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Load all cards for a deck. Returns empty array if no state exists.
 */
export function loadCards(site: SiteKey, deckId: DeckId): Array<CardState> {
  const stored = loadRaw(site, deckId);
  return stored?.cards ?? [];
}

/**
 * Save all cards for a deck.
 */
export function saveCards(
  site: SiteKey,
  deckId: DeckId,
  cards: ReadonlyArray<CardState>,
): boolean {
  const data: StoredDeck = {
    site,
    deckId,
    cards: [...cards],
    updatedAt: new Date().toISOString(),
  };
  return saveRaw(site, deckId, data);
}

/**
 * Initialize cards for a deck from a list of card IDs.
 * Only creates cards that don't already exist in storage.
 * Returns the full card list (existing + new).
 */
export function initializeDeck(
  site: SiteKey,
  deckId: DeckId,
  cardIds: ReadonlyArray<string>,
): Array<CardState> {
  const existing = loadCards(site, deckId);
  const existingIds = new Set(existing.map((c) => c.id));

  const newCards = cardIds
    .filter((id) => !existingIds.has(id))
    .map((id) => createCard(id));

  const all = [...existing, ...newCards];
  saveCards(site, deckId, all);
  return all;
}

/**
 * Get all due cards for a deck.
 */
export function getDueCardsForDeck(
  site: SiteKey,
  deckId: DeckId,
  now: Date = new Date(),
): Array<CardState> {
  const cards = loadCards(site, deckId);
  return getDueCards(cards, now);
}

/**
 * Record a review for a single card.
 * Updates the card state in localStorage and returns the updated card.
 */
export function recordReview(
  site: SiteKey,
  deckId: DeckId,
  cardId: string,
  rating: Rating,
  now: Date = new Date(),
): { card: CardState; interval: number; lapsed: boolean } | null {
  const cards = loadCards(site, deckId);
  const idx = cards.findIndex((c) => c.id === cardId);
  if (idx === -1) return null;

  const card = cards[idx]!;
  const result = repeat(card, rating, now);
  cards[idx] = result.card;
  saveCards(site, deckId, cards);

  return {
    card: result.card,
    interval: result.interval,
    lapsed: result.lapsed,
  };
}

/**
 * Get review statistics for a deck.
 */
export function getDeckStats(
  site: SiteKey,
  deckId: DeckId,
  _now: Date = new Date(),
): ReviewStats {
  const cards = loadCards(site, deckId);
  const reviewed = cards.filter((c) => c.repetitions > 0);
  const totalReviews = reviewed.reduce((sum, c) => sum + c.repetitions, 0);
  const totalLapses = reviewed.reduce((sum, c) => sum + c.lapses, 0);
  const avgInterval =
    reviewed.length > 0
      ? reviewed.reduce((sum, c) => sum + c.scheduledDays, 0) / reviewed.length
      : 0;

  return {
    total: cards.length,
    reviewed: reviewed.length,
    correct: totalReviews - totalLapses,
    incorrect: totalLapses,
    accuracy:
      totalReviews > 0 ? (totalReviews - totalLapses) / totalReviews : 0,
    avgInterval: Math.round(avgInterval),
  };
}

/**
 * Clear all review data for a deck.
 */
export function clearDeck(site: SiteKey, deckId: DeckId): void {
  if (!isBrowser()) return;
  localStorage.removeItem(storageKey(site, deckId));
}

/**
 * Clear all review data for a site.
 */
export function clearSite(site: SiteKey): void {
  if (!isBrowser()) return;
  const prefix = `${STORAGE_PREFIX}${site}:`;
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) keys.push(key);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}
