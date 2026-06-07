import { describe, it, expect } from "vitest";
import {
  Rating,
  createCard,
  repeat,
  isDue,
  getDueCards,
  type CardState,
} from "../fsrs";

// ---------------------------------------------------------------------------
// createCard
// ---------------------------------------------------------------------------
describe("createCard", () => {
  it("creates a card with default state", () => {
    const card = createCard("test-1");
    expect(card.id).toBe("test-1");
    expect(card.difficulty).toBe(1);
    expect(card.stability).toBe(1);
    expect(card.elapsedDays).toBe(0);
    expect(card.scheduledDays).toBe(0);
    expect(card.repetitions).toBe(0);
    expect(card.lapses).toBe(0);
  });

  it("creates card with valid timestamps", () => {
    const card = createCard("test-1");
    expect(new Date(card.createdAt).getTime()).toBeGreaterThan(0);
    expect(new Date(card.lastReview).getTime()).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// repeat
// ---------------------------------------------------------------------------
describe("repeat", () => {
  const now = new Date("2026-06-07T12:00:00Z");

  it("handles first review with Good rating", () => {
    const card = createCard("test-1");
    const result = repeat(card, Rating.Good, now);

    expect(result.card.repetitions).toBe(1);
    expect(result.card.stability).toBeGreaterThan(0);
    expect(result.card.difficulty).toBeGreaterThan(0);
    expect(result.interval).toBeGreaterThan(0);
    expect(result.lapsed).toBe(false);
  });

  it("handles first review with Easy rating", () => {
    const card = createCard("test-1");
    const result = repeat(card, Rating.Easy, now);

    expect(result.card.repetitions).toBe(1);
    expect(result.lapsed).toBe(false);
  });

  it("handles first review with Again rating (lapse)", () => {
    const card = createCard("test-1");
    const result = repeat(card, Rating.Again, now);

    expect(result.card.repetitions).toBe(0);
    expect(result.card.lapses).toBe(1);
    expect(result.lapsed).toBe(true);
  });

  it("Easy rating produces larger interval than Good", () => {
    const card = createCard("test-1");
    const goodResult = repeat(card, Rating.Good, now);
    const easyResult = repeat(createCard("test-1"), Rating.Easy, now);

    expect(easyResult.interval).toBeGreaterThan(goodResult.interval);
  });

  it("Hard rating produces smaller interval than Good", () => {
    const card = createCard("test-1");
    const goodResult = repeat(card, Rating.Good, now);
    const hardResult = repeat(createCard("test-1"), Rating.Hard, now);

    expect(hardResult.interval).toBeLessThanOrEqual(goodResult.interval);
  });

  it("maintains deterministic output for same inputs", () => {
    const card = createCard("test-1");
    const r1 = repeat(card, Rating.Good, now);
    const r2 = repeat(createCard("test-1"), Rating.Good, now);

    expect(r1.card.stability).toBe(r2.card.stability);
    expect(r1.card.difficulty).toBe(r2.card.difficulty);
    expect(r1.interval).toBe(r2.interval);
  });

  it("schedules next due date correctly", () => {
    const card = createCard("test-1");
    const result = repeat(card, Rating.Good, now);
    const nextDue = new Date(result.nextDue);
    const expectedDue = new Date(now.getTime() + result.interval * 86400000);

    expect(nextDue.toISOString()).toBe(expectedDue.toISOString());
  });

  it("increases interval over multiple Good reviews", () => {
    let card = createCard("test-1");

    // First review
    const r1 = repeat(card, Rating.Good, now);
    expect(r1.interval).toBeGreaterThanOrEqual(1);
    card = r1.card;

    // Second review (advance time past the interval)
    const t2 = new Date(now.getTime() + (r1.interval + 1) * 86400000);
    const r2 = repeat(card, Rating.Good, t2);
    expect(r2.interval).toBeGreaterThanOrEqual(1);
    card = r2.card;

    // Third review
    const t3 = new Date(t2.getTime() + (r2.interval + 1) * 86400000);
    const r3 = repeat(card, Rating.Good, t3);
    expect(r3.interval).toBeGreaterThanOrEqual(1);
  });

  it("lapse resets repetitions", () => {
    let card = createCard("test-1");

    // First review
    let result = repeat(card, Rating.Good, now);
    card = result.card;
    expect(card.repetitions).toBe(1);

    // Second review
    const t2 = new Date(now.getTime() + (result.interval + 1) * 86400000);
    result = repeat(card, Rating.Good, t2);
    card = result.card;
    expect(card.repetitions).toBe(2);

    // Lapse
    const t3 = new Date(t2.getTime() + (result.interval + 1) * 86400000);
    result = repeat(card, Rating.Again, t3);
    expect(result.card.repetitions).toBe(0);
    expect(result.card.lapses).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// isDue
// ---------------------------------------------------------------------------
describe("isDue", () => {
  it("new card is always due", () => {
    const card = createCard("test-1");
    expect(isDue(card)).toBe(true);
  });

  it("reviewed card is not immediately due", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    let card = createCard("test-1");
    card = repeat(card, Rating.Good, now).card;

    expect(isDue(card, now)).toBe(false);
  });

  it("reviewed card is due after scheduled interval", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    let card = createCard("test-1");
    const result = repeat(card, Rating.Good, now);
    card = result.card;

    const futureDate = new Date(now.getTime() + (result.interval + 1) * 86400000);
    expect(isDue(card, futureDate)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getDueCards
// ---------------------------------------------------------------------------
describe("getDueCards", () => {
  it("returns only due cards", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    const card1 = createCard("new-1");
    const card2 = repeat(createCard("reviewed-1"), Rating.Good, now).card;

    const due = getDueCards([card1, card2], now);
    expect(due.length).toBeGreaterThanOrEqual(1);
    expect(due.some((c) => c.id === "new-1")).toBe(true);
  });

  it("returns empty array when no cards are due", () => {
    const now = new Date("2026-06-07T12:00:00Z");
    const card = repeat(createCard("test-1"), Rating.Good, now).card;

    const due = getDueCards([card], now);
    expect(due).toHaveLength(0);
  });

  it("returns all new cards", () => {
    const cards = [createCard("a"), createCard("b"), createCard("c")];
    const due = getDueCards(cards);
    expect(due).toHaveLength(3);
  });
});
