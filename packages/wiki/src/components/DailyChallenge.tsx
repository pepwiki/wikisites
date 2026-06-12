import { createSignal, Show } from "solid-js";
import Quiz from "./Quiz";

interface DailyQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
  tags: string[];
}

interface DailyChallengeProps {
  questions: DailyQuestion[];
}

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

export default function DailyChallenge(props: DailyChallengeProps) {
  const today = new Date().toISOString().split("T")[0]!;
  const seed = hashDate(today);
  const dailyQuestions = seededShuffle(props.questions, seed).slice(0, 10);

  const [current, setCurrent] = createSignal(0);
  const [correctCount, setCorrectCount] = createSignal(0);
  const [revealed, setRevealed] = createSignal(false);
  const [done, setDone] = createSignal(false);

  const currentQuestion = () => dailyQuestions[current()];

  const handleReveal = (correct: boolean) => {
    setRevealed(true);
    if (correct) setCorrectCount(correctCount() + 1);
  };

  const handleNext = () => {
    if (current() + 1 >= dailyQuestions.length) {
      setDone(true);
    } else {
      setCurrent(current() + 1);
      setRevealed(false);
    }
  };

  return (
    <div class="spatial-card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Daily Challenge</h3>
        <span class="text-xs font-medium text-[#F97316] bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-full">
          {today}
        </span>
      </div>

      <Show when={!done()}>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
          10 questions, same for everyone today. Question {current() + 1} of 10
        </p>

        <Quiz
          client:load
          question={currentQuestion()!.question}
          options={currentQuestion()!.options}
          correctIndex={currentQuestion()!.correctIndex}
          explanation={currentQuestion()!.explanation}
          onReveal={handleReveal}
        />

        <Show when={revealed()}>
          <button
            type="button"
            class="mt-4 px-6 py-2 bg-[#F97316] text-white rounded-full font-medium hover:bg-[#F97316]/90 transition-colors"
            onClick={handleNext}
          >
            {current() + 1 >= dailyQuestions.length ? "See Results" : "Next Question"}
          </button>
        </Show>
      </Show>

      <Show when={done()}>
        <div class="text-center py-8">
          <p class="text-3xl font-bold text-[#0f766e] dark:text-[#2dd4bf] mb-2">{correctCount()}/10</p>
          <p class="text-slate-600 dark:text-slate-400 mb-4">Correct answers today</p>
          <p class="text-sm text-slate-400 dark:text-slate-500">
            {correctCount() >= 8
              ? "Excellent work!"
              : correctCount() >= 5
                ? "Good effort!"
                : "Keep practicing!"}
          </p>
        </div>
      </Show>
    </div>
  );
}
