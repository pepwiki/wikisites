import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadCards,
  saveCards,
  initializeDeck,
  getDueCardsForDeck,
  recordReview,
  getDeckStats,
  clearDeck,
} from "../review-store";
import { Rating } from "../fsrs";

// ---------------------------------------------------------------------------
// Mock localStorage
// ---------------------------------------------------------------------------
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  vi.stubGlobal("window", { localStorage: localStorageMock });
  vi.stubGlobal("localStorage", localStorageMock);
});

// ---------------------------------------------------------------------------
// saveCards / loadCards
// ---------------------------------------------------------------------------
describe("saveCards / loadCards", () => {
  it("saves and loads cards round-trip", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    const cards = [
      { id: "c1", difficulty: 5, stability: 10, elapsedDays: 0, scheduledDays: 5, repetitions: 3, lapses: 0, lastReview: now.toISOString(), createdAt: now.toISOString() },
    ];
    const saved = saveCards("wiki", "deck-a", cards);
    expect(saved).toBe(true);

    const loaded = loadCards("wiki", "deck-a");
    expect(loaded).toHaveLength(1);
    expect(loaded[0]!.id).toBe("c1");
    expect(loaded[0]!.stability).toBe(10);
  });

  it("returns empty array for non-existent deck", () => {
    expect(loadCards("encp", "nonexistent")).toEqual([]);
  });

  it("isolates decks by site", () => {
    const cards = [{ id: "c1", difficulty: 1, stability: 1, elapsedDays: 0, scheduledDays: 0, repetitions: 0, lapses: 0, lastReview: new Date().toISOString(), createdAt: new Date().toISOString() }];
    saveCards("wiki", "deck", cards);
    expect(loadCards("encp", "deck")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// initializeDeck
// ---------------------------------------------------------------------------
describe("initializeDeck", () => {
  it("creates new cards for unknown IDs", () => {
    const result = initializeDeck("wiki", "deck-b", ["c1", "c2", "c3"]);
    expect(result).toHaveLength(3);
    expect(result.map((c) => c.id)).toEqual(["c1", "c2", "c3"]);
  });

  it("preserves existing cards", () => {
    const existing = [{ id: "c1", difficulty: 5, stability: 10, elapsedDays: 0, scheduledDays: 5, repetitions: 3, lapses: 0, lastReview: new Date().toISOString(), createdAt: new Date().toISOString() }];
    saveCards("wiki", "deck-c", existing);

    const result = initializeDeck("wiki", "deck-c", ["c1", "c2"]);
    expect(result).toHaveLength(2);
    expect(result.find((c) => c.id === "c1")?.stability).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// getDueCardsForDeck
// ---------------------------------------------------------------------------
describe("getDueCardsForDeck", () => {
  it("returns new cards as due", () => {
    initializeDeck("wiki", "deck-d", ["c1", "c2"]);
    const due = getDueCardsForDeck("wiki", "deck-d");
    expect(due).toHaveLength(2);
  });

  it("returns empty when no cards due", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    const card = { id: "c1", difficulty: 5, stability: 100, elapsedDays: 5, scheduledDays: 30, repetitions: 5, lapses: 0, lastReview: now.toISOString(), createdAt: now.toISOString() };
    saveCards("wiki", "deck-e", [card]);
    const due = getDueCardsForDeck("wiki", "deck-e", now);
    expect(due).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// recordReview
// ---------------------------------------------------------------------------
describe("recordReview", () => {
  it("updates card state after review", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    initializeDeck("wiki", "deck-f", ["c1"]);
    const result = recordReview("wiki", "deck-f", "c1", Rating.Good, now);

    expect(result).not.toBeNull();
    expect(result!.card.repetitions).toBe(1);
    expect(result!.interval).toBeGreaterThan(0);
    expect(result!.lapsed).toBe(false);
  });

  it("returns null for unknown card", () => {
    const result = recordReview("wiki", "deck-g", "nonexistent", Rating.Good);
    expect(result).toBeNull();
  });

  it("persists updated state to localStorage", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    initializeDeck("wiki", "deck-h", ["c1"]);
    recordReview("wiki", "deck-h", "c1", Rating.Good, now);

    const loaded = loadCards("wiki", "deck-h");
    expect(loaded[0]!.repetitions).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// getDeckStats
// ---------------------------------------------------------------------------
describe("getDeckStats", () => {
  it("returns zero stats for empty deck", () => {
    const stats = getDeckStats("wiki", "empty-deck");
    expect(stats.total).toBe(0);
    expect(stats.accuracy).toBe(0);
  });

  it("computes stats for non-empty deck", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    const card = { id: "c1", difficulty: 5, stability: 10, elapsedDays: 0, scheduledDays: 5, repetitions: 3, lapses: 1, lastReview: now.toISOString(), createdAt: now.toISOString() };
    saveCards("wiki", "stats-deck", [card]);

    const stats = getDeckStats("wiki", "stats-deck");
    expect(stats.total).toBe(1);
    expect(stats.reviewed).toBe(1);
    expect(stats.accuracy).toBeCloseTo(2 / 3, 2);
  });
});

// ---------------------------------------------------------------------------
// clearDeck
// ---------------------------------------------------------------------------
describe("clearDeck", () => {
  it("removes deck data", () => {
    initializeDeck("wiki", "clear-deck", ["c1"]);
    expect(loadCards("wiki", "clear-deck")).toHaveLength(1);
    clearDeck("wiki", "clear-deck");
    expect(loadCards("wiki", "clear-deck")).toEqual([]);
  });
});
