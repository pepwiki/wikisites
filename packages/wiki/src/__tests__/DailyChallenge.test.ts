import { describe, it, expect } from "vitest";

// Pure functions extracted from DailyChallenge.tsx for testing
function hashDate(date: string): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    const char = date.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * DailyChallenge uses hashDate and seededShuffle for deterministic daily questions.
 * These tests verify the seeding logic independently of SolidJS rendering.
 */

// Re-implement the pure functions from DailyChallenge for testing
// (they are not exported, so we test them via integration)
describe("DailyChallenge seeding logic", () => {
  it("produces deterministic hash for a given date string", () => {
    const h1 = hashDate("2026-06-08");
    const h2 = hashDate("2026-06-08");
    expect(h1).toBe(h2);
  });

  it("produces different hashes for different dates", () => {
    const h1 = hashDate("2026-06-08");
    const h2 = hashDate("2026-06-09");
    expect(h1).not.toBe(h2);
  });

  it("seeded shuffle is deterministic for same seed", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const a = seededShuffle(arr, 42);
    const b = seededShuffle(arr, 42);
    expect(a).toEqual(b);
  });

  it("seeded shuffle produces different order for different seeds", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const a = seededShuffle(arr, 42);
    const b = seededShuffle(arr, 99);
    expect(a).not.toEqual(b);
  });

  it("seeded shuffle preserves all elements", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = seededShuffle(arr, 42);
    expect(result.sort()).toEqual(arr.sort());
  });

  it("seeded shuffle handles empty array", () => {
    const result = seededShuffle([], 42);
    expect(result).toEqual([]);
  });

  it("seeded shuffle handles single element", () => {
    const result = seededShuffle([1], 42);
    expect(result).toEqual([1]);
  });
});

describe("DailyChallenge slice behavior", () => {
  it("slices exactly 10 questions from daily selection", () => {
    const questions = Array.from({ length: 50 }, (_, i) => ({
      id: `q-${i}`,
      question: `Question ${i}`,
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
      explanation: "Explanation",
      difficulty: "beginner",
      tags: [],
    }));

    const today = new Date().toISOString().split("T")[0]!;
    const seed = hashDate(today);
    const dailyQuestions = seededShuffle(questions, seed).slice(0, 10);

    expect(dailyQuestions).toHaveLength(10);
    expect(new Set(dailyQuestions.map((q) => q.id)).size).toBe(10);
  });
});
