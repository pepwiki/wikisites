const STORAGE_KEY = "wikisites:quiz-history";

interface QuizResult {
  readonly quizId: string;
  readonly score: number;
  readonly total: number;
  readonly date: string;
  readonly timeMs: number;
}

interface QuizStats {
  readonly totalQuizzes: number;
  readonly averageScore: number;
  readonly bestScore: number;
  readonly totalTimeMs: number;
}

function getHistory(): QuizResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as QuizResult[];
  } catch {
    return [];
  }
}

function saveHistory(history: QuizResult[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function trackQuizResult(
  quizId: string,
  score: number,
  total: number,
  timeMs: number,
): void {
  const result: QuizResult = {
    quizId,
    score,
    total,
    date: new Date().toISOString(),
    timeMs,
  };
  const history = getHistory();
  history.push(result);
  saveHistory(history);
}

export function getQuizHistory(): readonly QuizResult[] {
  return getHistory();
}

export function getQuizStats(): QuizStats {
  const history = getHistory();

  if (history.length === 0) {
    return { totalQuizzes: 0, averageScore: 0, bestScore: 0, totalTimeMs: 0 };
  }

  let totalScore = 0;
  let totalPossible = 0;
  let bestScore = 0;
  let totalTimeMs = 0;

  for (const result of history) {
    const pct = result.total > 0 ? (result.score / result.total) * 100 : 0;
    totalScore += result.score;
    totalPossible += result.total;
    if (pct > bestScore) bestScore = pct;
    totalTimeMs += result.timeMs;
  }

  return {
    totalQuizzes: history.length,
    averageScore: totalPossible > 0 ? Math.round((totalScore / totalPossible) * 10000) / 100 : 0,
    bestScore: Math.round(bestScore * 100) / 100,
    totalTimeMs,
  };
}
