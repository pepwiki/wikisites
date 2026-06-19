import { getQuizHistory } from "./ScoreTracker";

type Difficulty = "beginner" | "intermediate" | "advanced";

const HISTORY_WINDOW = 10;

function scorePercentage(score: number, total: number): number {
  return total > 0 ? (score / total) * 100 : 0;
}

function extractCategory(quizId: string): string {
  const parts = quizId.split("-");
  if (parts.length <= 1) return quizId;
  parts.pop();
  return parts.join("-");
}

export function getRecommendedDifficulty(quizId: string): Difficulty {
  const history = getQuizHistory();
  const category = extractCategory(quizId);

  const relevant = history
    .filter((r) => extractCategory(r.quizId) === category)
    .slice(-HISTORY_WINDOW);

  if (relevant.length === 0) return "intermediate";

  let totalPct = 0;
  for (const result of relevant) {
    totalPct += scorePercentage(result.score, result.total);
  }
  const avgPct = totalPct / relevant.length;

  if (avgPct > 80) return "advanced";
  if (avgPct < 50) return "beginner";
  return "intermediate";
}
