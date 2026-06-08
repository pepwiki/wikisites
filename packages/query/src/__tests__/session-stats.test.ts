import { describe, it, expect } from "vitest";
import {
  calculateStreak,
  mergeSession,
  emptySessionData,
  emptySessionSnapshot,
  type SessionData,
} from "../session-stats";

describe("calculateStreak", () => {
  const today = new Date("2026-06-08T12:00:00Z");

  it("returns 1 when lastReviewDate is null", () => {
    expect(calculateStreak(null, 0, today)).toBe(1);
  });

  it("returns current streak when lastReviewDate is today", () => {
    expect(calculateStreak("2026-06-08", 5, today)).toBe(5);
  });

  it("increments streak when lastReviewDate is yesterday", () => {
    expect(calculateStreak("2026-06-07", 3, today)).toBe(4);
  });

  it("resets streak to 1 when lastReviewDate is older than yesterday", () => {
    expect(calculateStreak("2026-06-05", 10, today)).toBe(1);
  });

  it("resets streak to 1 when lastReviewDate is two days ago", () => {
    expect(calculateStreak("2026-06-06", 7, today)).toBe(1);
  });

  it("resets from any streak value", () => {
    expect(calculateStreak("2026-06-01", 100, today)).toBe(1);
  });

  it("starts at 1 with a previous streak of 0", () => {
    expect(calculateStreak(null, 0, today)).toBe(1);
  });
});

describe("mergeSession", () => {
  const now = new Date("2026-06-08T12:00:00Z");

  it("merges reviews into empty session data", () => {
    const data = emptySessionData();
    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 10,
      correct: 8,
      startTimeMs: now.getTime() - 60000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.totalReviews).toBe(10);
    expect(result.totalCorrect).toBe(8);
    expect(result.currentStreak).toBe(1);
    expect(result.bestStreak).toBe(1);
    expect(result.lastReviewDate).toBe("2026-06-08");
  });

  it("accumulates reviews across sessions", () => {
    const data: SessionData = {
      totalReviews: 20,
      totalQuizzes: 5,
      totalCorrect: 15,
      lastReviewDate: "2026-06-07",
      currentStreak: 2,
      bestStreak: 2,
      totalReviewTimeMs: 300000,
    };

    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 5,
      correct: 4,
      startTimeMs: now.getTime() - 30000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.totalReviews).toBe(25);
    expect(result.totalCorrect).toBe(19);
    expect(result.currentStreak).toBe(3);
    expect(result.bestStreak).toBe(3);
  });

  it("resets streak when lastReviewDate is older than yesterday", () => {
    const data: SessionData = {
      totalReviews: 20,
      totalQuizzes: 0,
      totalCorrect: 15,
      lastReviewDate: "2026-06-01",
      currentStreak: 5,
      bestStreak: 5,
      totalReviewTimeMs: 300000,
    };

    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 3,
      correct: 3,
      startTimeMs: now.getTime() - 10000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.currentStreak).toBe(1);
    expect(result.bestStreak).toBe(5);
  });

  it("preserves best streak", () => {
    const data: SessionData = {
      totalReviews: 10,
      totalQuizzes: 0,
      totalCorrect: 8,
      lastReviewDate: "2026-06-08",
      currentStreak: 10,
      bestStreak: 10,
      totalReviewTimeMs: 0,
    };

    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 2,
      correct: 2,
      startTimeMs: now.getTime() - 5000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.bestStreak).toBe(10);
  });

  it("updates best streak when current exceeds it", () => {
    const data: SessionData = {
      totalReviews: 10,
      totalQuizzes: 0,
      totalCorrect: 8,
      lastReviewDate: "2026-06-07",
      currentStreak: 3,
      bestStreak: 3,
      totalReviewTimeMs: 0,
    };

    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 2,
      correct: 2,
      startTimeMs: now.getTime() - 5000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.bestStreak).toBe(4);
  });

  it("does not update lastReviewDate when no activity", () => {
    const data: SessionData = {
      totalReviews: 5,
      totalQuizzes: 0,
      totalCorrect: 4,
      lastReviewDate: "2026-06-07",
      currentStreak: 1,
      bestStreak: 1,
      totalReviewTimeMs: 0,
    };

    const snapshot = {
      ...emptySessionSnapshot(),
      reviews: 0,
      quizzes: 0,
      startTimeMs: now.getTime(),
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.lastReviewDate).toBe("2026-06-07");
  });

  it("updates lastReviewDate when quizzes are present", () => {
    const data = emptySessionData();
    const snapshot = {
      ...emptySessionSnapshot(),
      quizzes: 3,
      correct: 2,
      startTimeMs: now.getTime() - 1000,
    };

    const result = mergeSession(data, snapshot, now);

    expect(result.lastReviewDate).toBe("2026-06-08");
    expect(result.totalQuizzes).toBe(3);
  });
});

describe("emptySessionData", () => {
  it("returns zeroed-out data", () => {
    const data = emptySessionData();
    expect(data.totalReviews).toBe(0);
    expect(data.totalQuizzes).toBe(0);
    expect(data.totalCorrect).toBe(0);
    expect(data.lastReviewDate).toBeNull();
    expect(data.currentStreak).toBe(0);
    expect(data.bestStreak).toBe(0);
    expect(data.totalReviewTimeMs).toBe(0);
  });
});

describe("emptySessionSnapshot", () => {
  it("returns zeroed counters with a valid startTimeMs", () => {
    const snap = emptySessionSnapshot();
    expect(snap.reviews).toBe(0);
    expect(snap.quizzes).toBe(0);
    expect(snap.correct).toBe(0);
    expect(snap.startTimeMs).toBeGreaterThan(0);
  });
});
