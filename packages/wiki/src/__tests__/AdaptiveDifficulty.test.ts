// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { getRecommendedDifficulty } from "../components/AdaptiveDifficulty";

const STORAGE_KEY = "wikisites:quiz-history";

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

function seedHistory(entries: Array<{ quizId: string; score: number; total: number }>): void {
  const history = entries.map((e) => ({
    quizId: e.quizId,
    score: e.score,
    total: e.total,
    date: new Date().toISOString(),
    timeMs: 10_000,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

describe("AdaptiveDifficulty", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = mockLocalStorage();
    Object.defineProperty(globalThis, "localStorage", { value: storage, writable: true });
    storage.clear();
  });

  it("returns intermediate when no history", () => {
    expect(getRecommendedDifficulty("amino-acids-1")).toBe("intermediate");
  });

  it("returns advanced when avg score > 80%", () => {
    seedHistory([
      { quizId: "amino-acids-1", score: 9, total: 10 },
      { quizId: "amino-acids-2", score: 10, total: 10 },
      { quizId: "amino-acids-3", score: 8, total: 10 },
    ]);
    expect(getRecommendedDifficulty("amino-acids-4")).toBe("advanced");
  });

  it("returns beginner when avg score < 50%", () => {
    seedHistory([
      { quizId: "amino-acids-1", score: 3, total: 10 },
      { quizId: "amino-acids-2", score: 2, total: 10 },
      { quizId: "amino-acids-3", score: 4, total: 10 },
    ]);
    expect(getRecommendedDifficulty("amino-acids-4")).toBe("beginner");
  });

  it("returns intermediate when avg score is 50-80%", () => {
    seedHistory([
      { quizId: "amino-acids-1", score: 6, total: 10 },
      { quizId: "amino-acids-2", score: 7, total: 10 },
    ]);
    expect(getRecommendedDifficulty("amino-acids-3")).toBe("intermediate");
  });

  it("only considers last 10 results for a category", () => {
    const entries: Array<{ quizId: string; score: number; total: number }> = [];
    for (let i = 0; i < 10; i++) {
      entries.push({ quizId: `amino-acids-${i + 1}`, score: 2, total: 10 });
    }
    for (let i = 0; i < 10; i++) {
      entries.push({ quizId: `amino-acids-${i + 11}`, score: 10, total: 10 });
    }
    seedHistory(entries);
    // Last 10 are all 10/10 (100%) → advanced
    expect(getRecommendedDifficulty("amino-acids-20")).toBe("advanced");
  });

  it("isolates categories", () => {
    seedHistory([
      { quizId: "amino-acids-1", score: 2, total: 10 },
      { quizId: "pharmacology-1", score: 10, total: 10 },
    ]);
    expect(getRecommendedDifficulty("amino-acids-2")).toBe("beginner");
    expect(getRecommendedDifficulty("pharmacology-2")).toBe("advanced");
  });

  it("handles single result", () => {
    seedHistory([{ quizId: "quiz-1", score: 9, total: 10 }]);
    expect(getRecommendedDifficulty("quiz-2")).toBe("advanced");
  });
});
