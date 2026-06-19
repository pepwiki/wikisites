import { createMemo, createSignal, Show } from "solid-js";
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

const STORAGE_KEY = "wikisites:daily-challenge";

interface DailyState {
  date: string;
  current: number;
  correctCount: number;
  revealed: boolean;
  done: boolean;
}

function loadState(date: string): DailyState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.date !== date) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: DailyState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable
  }
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
  const dailyQuestions = createMemo(() =>
    seededShuffle(props.questions, seed).slice(0, 10),
  );
  const total = () => dailyQuestions().length;

  const saved = loadState(today);
  const [current, setCurrent] = createSignal(saved?.current ?? 0);
  const [correctCount, setCorrectCount] = createSignal(
    saved?.correctCount ?? 0,
  );
  const [revealed, setRevealed] = createSignal(saved?.revealed ?? false);
  const [done, setDone] = createSignal(saved?.done ?? false);

  // Save state on every change
  const persist = () => {
    saveState({
      date: today,
      current: current(),
      correctCount: correctCount(),
      revealed: revealed(),
      done: done(),
    });
  };

  const currentQuestion = () => dailyQuestions()[current()];

  const handleReveal = (correct: boolean) => {
    setRevealed(true);
    if (correct) setCorrectCount(correctCount() + 1);
    persist();
  };

  const handleNext = () => {
    if (current() + 1 >= total()) {
      setDone(true);
    } else {
      setCurrent(current() + 1);
      setRevealed(false);
    }
    persist();
  };

  const progressPercent = () =>
    total() > 0 ? ((current() + (revealed() ? 1 : 0)) / total()) * 100 : 0;

  return (
    <div class="spatial-card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
          Daily Challenge
        </h3>
        <span class="text-xs font-medium text-[#F97316] bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-full">
          {today}
        </span>
      </div>

      <Show when={!done()}>
        <p
          class="text-sm text-slate-500 dark:text-slate-400 mb-2"
          aria-live="polite"
        >
          {total()} questions, same for everyone today. Question {current() + 1}{" "}
          of {total()}
        </p>

        {/* Progress bar */}
        <div
          class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4"
          role="progressbar"
          aria-valuenow={Math.round(progressPercent())}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Daily challenge progress"
        >
          <div
            class="bg-[#F97316] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent()}%` }}
          />
        </div>

        <Show when={currentQuestion()}>
          <Quiz
            client:load
            question={currentQuestion()!.question}
            options={currentQuestion()!.options}
            correctIndex={currentQuestion()!.correctIndex}
            explanation={currentQuestion()!.explanation}
            onReveal={handleReveal}
          />
        </Show>

        <Show when={revealed()}>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
              {correctCount()}/{current() + 1} correct
            </span>
            <button
              type="button"
              class="px-6 py-2 bg-[#F97316] text-white rounded-full font-medium hover:bg-[#F97316]/90 transition-colors"
              onClick={handleNext}
            >
              {current() + 1 >= total() ? "See Results" : "Next Question"}
            </button>
          </div>
        </Show>
      </Show>

      <Show when={done()}>
        <div class="text-center py-8">
          <p class="text-3xl font-bold text-[#0f766e] dark:text-[#2dd4bf] mb-2">
            {correctCount()}/{total()}
          </p>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            Correct answers today
          </p>

          {/* Score breakdown */}
          <div class="flex justify-center gap-4 mb-4 text-sm">
            <span class="text-green-600 dark:text-green-400">
              {correctCount()} correct
            </span>
            <span class="text-red-500 dark:text-red-400">
              {total() - correctCount()} incorrect
            </span>
          </div>

          <p class="text-sm text-slate-400 dark:text-slate-500">
            {total() > 0 && correctCount() / total() >= 0.8
              ? "Excellent work!"
              : total() > 0 && correctCount() / total() >= 0.5
                ? "Good effort!"
                : "Keep practicing!"}
          </p>
        </div>
      </Show>
    </div>
  );
}
