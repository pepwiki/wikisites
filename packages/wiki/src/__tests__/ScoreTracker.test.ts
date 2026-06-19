// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackQuizResult, getQuizHistory, getQuizStats } from "../components/ScoreTracker";

function mockLocalStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => store.clear()),
    get length() {
      return store.size;
    },
    key: vi.fn((index: number) => [...store.keys()][index] ?? null),
  };
}

describe("ScoreTracker", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = mockLocalStorage();
    Object.defineProperty(globalThis, "localStorage", { value: storage, writable: true });
    storage.clear();
  });

  it("tracks a quiz result", () => {
    trackQuizResult("amino-acids-1", 8, 10, 30_000);
    const history = getQuizHistory();
    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({
      quizId: "amino-acids-1",
      score: 8,
      total: 10,
      timeMs: 30_000,
    });
    expect(history[0]?.date).toBeDefined();
  });

  it("accumulates multiple results", () => {
    trackQuizResult("quiz-1", 5, 10, 10_000);
    trackQuizResult("quiz-2", 9, 10, 5_000);
    trackQuizResult("quiz-1", 7, 10, 8_000);
    expect(getQuizHistory()).toHaveLength(3);
  });

  it("returns empty array when no history", () => {
    expect(getQuizHistory()).toEqual([]);
  });

  it("computes stats with multiple results", () => {
    trackQuizResult("quiz-1", 8, 10, 10_000);
    trackQuizResult("quiz-2", 4, 10, 20_000);

    const stats = getQuizStats();
    expect(stats.totalQuizzes).toBe(2);
    expect(stats.averageScore).toBe(60); // (8+4)/(10+10) * 100
    expect(stats.bestScore).toBe(80); // 8/10 * 100
    expect(stats.totalTimeMs).toBe(30_000);
  });

  it("returns zero stats when no history", () => {
    const stats = getQuizStats();
    expect(stats.totalQuizzes).toBe(0);
    expect(stats.averageScore).toBe(0);
    expect(stats.bestScore).toBe(0);
    expect(stats.totalTimeMs).toBe(0);
  });

  it("handles perfect score", () => {
    trackQuizResult("quiz-1", 10, 10, 5_000);
    const stats = getQuizStats();
    expect(stats.averageScore).toBe(100);
    expect(stats.bestScore).toBe(100);
  });

  it("handles zero total gracefully", () => {
    trackQuizResult("quiz-1", 0, 0, 1_000);
    const stats = getQuizStats();
    expect(stats.averageScore).toBe(0);
  });
});
