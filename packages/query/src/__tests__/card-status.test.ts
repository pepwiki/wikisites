import { describe, it, expect } from "vitest";
import { getStatusLabel, getStatusColor } from "../card-status";
import type { CardState } from "../fsrs";

function makeCard(overrides: Partial<CardState>): CardState {
  return {
    id: "test",
    difficulty: 5,
    stability: 10,
    elapsedDays: 0,
    scheduledDays: 0,
    repetitions: 0,
    lapses: 0,
    lastReview: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("getStatusLabel", () => {
  it("returns New for null card", () => {
    expect(getStatusLabel(null)).toBe("New");
  });

  it("returns New for card with zero repetitions", () => {
    expect(getStatusLabel(makeCard({ repetitions: 0 }))).toBe("New");
  });

  it("returns Learning for card with lapses and <=1 repetition", () => {
    expect(getStatusLabel(makeCard({ repetitions: 1, lapses: 1 }))).toBe("Learning");
  });

  it("returns Learning for card with scheduledDays <=1", () => {
    expect(getStatusLabel(makeCard({ repetitions: 2, lapses: 0, scheduledDays: 1 }))).toBe("Learning");
  });

  it("returns Learning for card with scheduledDays 0", () => {
    expect(getStatusLabel(makeCard({ repetitions: 2, lapses: 0, scheduledDays: 0 }))).toBe("Learning");
  });

  it("returns Review for mature card", () => {
    expect(getStatusLabel(makeCard({ repetitions: 5, lapses: 0, scheduledDays: 10 }))).toBe("Review");
  });
});

describe("getStatusColor", () => {
  it("returns blue for null card", () => {
    expect(getStatusColor(null)).toContain("bg-blue");
  });

  it("returns blue for new card", () => {
    expect(getStatusColor(makeCard({ repetitions: 0 }))).toContain("bg-blue");
  });

  it("returns orange for learning card (lapses)", () => {
    expect(getStatusColor(makeCard({ repetitions: 1, lapses: 1 }))).toContain("bg-orange");
  });

  it("returns orange for learning card (scheduledDays <=1)", () => {
    expect(getStatusColor(makeCard({ repetitions: 2, lapses: 0, scheduledDays: 1 }))).toContain("bg-orange");
  });

  it("returns green for review card", () => {
    expect(getStatusColor(makeCard({ repetitions: 5, lapses: 0, scheduledDays: 10 }))).toContain("bg-green");
  });
});
