/**
 * Pure functions for session statistics and streak calculation.
 * Extracted from the UI component for testability.
 */

export const STORAGE_KEY = "wikisites:stats";

export interface SessionData {
  totalReviews: number;
  totalQuizzes: number;
  totalCorrect: number;
  lastReviewDate: string | null;
  currentStreak: number;
  bestStreak: number;
  totalReviewTimeMs: number;
}

export interface SessionSnapshot {
  reviews: number;
  quizzes: number;
  correct: number;
  startTimeMs: number;
}

export function emptySessionData(): SessionData {
  return {
    totalReviews: 0,
    totalQuizzes: 0,
    totalCorrect: 0,
    lastReviewDate: null,
    currentStreak: 0,
    bestStreak: 0,
    totalReviewTimeMs: 0,
  };
}

export function emptySessionSnapshot(): SessionSnapshot {
  return {
    reviews: 0,
    quizzes: 0,
    correct: 0,
    startTimeMs: Date.now(),
  };
}

/**
 * Parse a "YYYY-MM-DD" string into a Date at midnight UTC.
 */
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!));
}

/**
 * Format a Date as "YYYY-MM-DD".
 */
function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Get today's date as "YYYY-MM-DD".
 */
function todayStr(now: Date): string {
  return formatISODate(now);
}

/**
 * Calculate streak given the last review date and current streak.
 *
 * - If lastReviewDate is null, streak starts at 1.
 * - If lastReviewDate is today, streak is unchanged.
 * - If lastReviewDate is yesterday, streak increments by 1.
 * - Otherwise streak resets to 1.
 */
export function calculateStreak(
  lastReviewDate: string | null,
  currentStreak: number,
  now: Date,
): number {
  const today = todayStr(now);
  if (lastReviewDate === today) {
    return currentStreak;
  }

  if (lastReviewDate === null) {
    return 1;
  }

  const lastDate = parseDate(lastReviewDate);
  const todayDate = parseDate(today);
  const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000);

  if (diffDays === 1) {
    return currentStreak + 1;
  }

  return 1;
}

/**
 * Merge a session snapshot into persistent SessionData, returning the updated data.
 */
export function mergeSession(data: SessionData, snapshot: SessionSnapshot, now: Date): SessionData {
  const today = todayStr(now);
  const newTotalReviews = data.totalReviews + snapshot.reviews;
  const newTotalQuizzes = data.totalQuizzes + snapshot.quizzes;
  const newTotalCorrect = data.totalCorrect + snapshot.correct;

  const newStreak = calculateStreak(data.lastReviewDate, data.currentStreak, now);
  const newBest = Math.max(data.bestStreak, newStreak);
  const elapsedMs = snapshot.startTimeMs > 0 ? Date.now() - snapshot.startTimeMs : 0;

  return {
    totalReviews: newTotalReviews,
    totalQuizzes: newTotalQuizzes,
    totalCorrect: newTotalCorrect,
    lastReviewDate: snapshot.reviews > 0 || snapshot.quizzes > 0 ? today : data.lastReviewDate,
    currentStreak: newStreak,
    bestStreak: newBest,
    totalReviewTimeMs: data.totalReviewTimeMs + elapsedMs,
  };
}
