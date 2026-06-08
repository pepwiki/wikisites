/**
 * FSRS v4 - Free Spaced Repetition Scheduler
 *
 * Based on: https://github.com/open-spaced-repetition/fsrs4anki/wiki
 * Reference: Ye, H. (2023). A Stochastic Shortest Path Algorithm For Optimizing Spaced Repetition Scheduling.
 * ACM KDD 2023.
 *
 * This implementation uses the default parameters from FSRS v4.
 * State is serialized to/from JSON for LocalStorage persistence.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Rating: how well the user recalled the card. */
export enum Rating {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

/** FSRS state for a single review card. */
export interface CardState {
  /** Unique card identifier. */
  readonly id: string;
  /** Current difficulty (1.0 - 10.0). */
  difficulty: number;
  /** Stability in days (time for recall probability to drop to 90%). */
  stability: number;
  /** Days since the card was last reviewed. */
  elapsedDays: number;
  /** Number of scheduled days until next review. */
  scheduledDays: number;
  /** Total number of reviews. */
  repetitions: number;
  /** Number of times the user forgot (lapsed). */
  lapses: number;
  /** ISO timestamp of last review. */
  lastReview: string;
  /** ISO timestamp of creation. */
  createdAt: string;
}

/** Result of an FSRS scheduling decision. */
export interface ScheduleResult {
  /** Updated card state after the review. */
  card: CardState;
  /** When the card is next due (ISO timestamp). */
  nextDue: string;
  /** Interval in days until next review. */
  interval: number;
  /** Whether the card lapsed (forgotten). */
  lapsed: boolean;
}

// ---------------------------------------------------------------------------
// FSRS v4 Parameters (default, optimized for general use)
// ---------------------------------------------------------------------------

const PARAMS = {
  requestRetention: 0.9, // Target recall probability
  maximumInterval: 36500, // Maximum interval in days (~100 years)
  w: [
    0.4072,
    1.1829,
    3.1262,
    15.4722, // w[0]-w[3]: Initial stability weights
    7.2114,
    0.4537,
    0.9691,
    0.023, // w[4]-w[7]: Difficulty weights
    1.4372,
    0.3616,
    0.2276,
    3.4295, // w[8]-w[11]: Stability after review weights
    1.0, // w[12]: Lapse difficulty exponent
  ],
} as const;

// ---------------------------------------------------------------------------
// Core FSRS Functions
// ---------------------------------------------------------------------------

/**
 * Calculate initial stability after first review.
 * S0 = w + rating offset.
 */
function initialStability(rating: Rating): number {
  const r = rating - 1; // 0-indexed
  return PARAMS.w[r] ?? PARAMS.w[0];
}

/**
 * Calculate difficulty after review.
 * D' = D - w6 * (R - 3)
 */
function nextDifficulty(difficulty: number, rating: Rating): number {
  const r = rating - 3; // -2 to +1
  const newD = difficulty - PARAMS.w[6] * r;
  return Math.min(10, Math.max(1, newD));
}

/**
 * Calculate stability after a successful review (no lapse).
 * S' = S * (1 + e^(w11) * (11 - D) * S^(-w12) * (e^(w10 * (1-r)) - 1))
 */
function nextStabilityAfterSuccess(stability: number, difficulty: number, rating: Rating): number {
  const r = rating - 3; // -2 to +1
  const delta =
    Math.exp(PARAMS.w[11]) *
    (11 - difficulty) *
    Math.pow(stability, -PARAMS.w[12]) *
    (Math.exp(PARAMS.w[10] * (1 - r)) - 1);
  return stability * (1 + delta);
}

/**
 * Calculate stability after a lapse (forgot).
 * S' = w11 * D^(-w12) * (e^(w10) - 1) * S^(w9)
 */
function nextStabilityAfterLapse(stability: number, difficulty: number): number {
  const newS =
    PARAMS.w[11] *
    Math.pow(difficulty, -PARAMS.w[12]) *
    (Math.exp(PARAMS.w[10]) - 1) *
    Math.pow(stability, PARAMS.w[9]);
  return Math.max(0.1, newS);
}

/**
 * Calculate the next interval from stability.
 * Interval = S * (e^(w8 * (11-D)) * S^(-w9)) * ln(retention) * w10
 *
 * Simplified: I = S * (1/w8 - 1) * (retention^(1/(w9*S)) - 1)
 */
function nextInterval(stability: number): number {
  if (!Number.isFinite(stability) || stability <= 0) return 1;
  const interval = stability * (1 / PARAMS.requestRetention - 1);
  if (!Number.isFinite(interval)) return PARAMS.maximumInterval;
  return Math.min(Math.max(1, Math.round(interval)), PARAMS.maximumInterval);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create a new card state.
 */
export function createCard(id: string): CardState {
  return {
    id,
    difficulty: 1,
    stability: 1,
    elapsedDays: 0,
    scheduledDays: 0,
    repetitions: 0,
    lapses: 0,
    lastReview: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Process a review and return the updated card state with scheduling info.
 *
 * @param card - Current card state
 * @param rating - User's recall rating
 * @param now - Current timestamp (for deterministic testing)
 * @returns ScheduleResult with updated card and next due date
 */
export function repeat(card: CardState, rating: Rating, now: Date = new Date()): ScheduleResult {
  const isNew = card.repetitions === 0;
  const isLapse = rating === Rating.Again;

  let newDifficulty: number;
  let newStability: number;

  if (isNew) {
    // First review
    newDifficulty = Math.max(1, 11 - rating);
    newStability = initialStability(rating);
  } else if (isLapse) {
    // Lapse
    newDifficulty = nextDifficulty(card.difficulty, rating);
    newStability = nextStabilityAfterLapse(card.stability, card.difficulty);
  } else {
    // Successful review
    newDifficulty = nextDifficulty(card.difficulty, rating);
    newStability = nextStabilityAfterSuccess(card.stability, card.difficulty, rating);
  }

  const interval = nextInterval(newStability);
  const dueMs = now.getTime() + interval * 86400000;
  const nextDue = Number.isFinite(dueMs) ? new Date(dueMs) : new Date(now.getTime() + 86400000);

  const updatedCard: CardState = {
    ...card,
    difficulty: newDifficulty,
    stability: newStability,
    elapsedDays: isNew
      ? 0
      : Math.max(0, Math.round((now.getTime() - new Date(card.lastReview).getTime()) / 86400000)),
    scheduledDays: interval,
    repetitions: isLapse ? 0 : card.repetitions + 1,
    lapses: isLapse ? card.lapses + 1 : card.lapses,
    lastReview: now.toISOString(),
  };

  return {
    card: updatedCard,
    nextDue: nextDue.toISOString(),
    interval,
    lapsed: isLapse,
  };
}

/**
 * Check if a card is due for review.
 */
export function isDue(card: CardState, now: Date = new Date()): boolean {
  if (card.repetitions === 0) return true; // New cards are always due
  const lastReviewTime = new Date(card.lastReview).getTime();
  const nextDueTime = lastReviewTime + card.scheduledDays * 86400000;
  return now.getTime() >= nextDueTime;
}

/**
 * Get all cards from a list that are due for review.
 */
export function getDueCards(
  cards: ReadonlyArray<CardState>,
  now: Date = new Date(),
): Array<CardState> {
  return cards
    .filter((card) => isDue(card, now))
    .sort((a, b) => {
      // Prioritize: new cards first, then by last review (oldest first)
      if (a.repetitions === 0 && b.repetitions > 0) return -1;
      if (a.repetitions > 0 && b.repetitions === 0) return 1;
      return new Date(a.lastReview).getTime() - new Date(b.lastReview).getTime();
    });
}
