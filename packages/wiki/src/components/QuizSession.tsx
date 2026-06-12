import { createSignal, createMemo, Show, batch } from "solid-js";
import Quiz from "./Quiz";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
  tags: string[];
}

interface QuizSessionProps {
  questions: QuizQuestion[];
  title: string;
}

function formatCategory(id: string): string {
  const parts = id.split("-");
  parts.pop();
  return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function groupByCategory(questions: QuizQuestion[]) {
  const groups: { category: string; questions: QuizQuestion[] }[] = [];
  const map = new Map<string, QuizQuestion[]>();
  for (const q of questions) {
    const cat = formatCategory(q.id);
    if (!map.has(cat)) {
      map.set(cat, []);
      groups.push({ category: cat, questions: map.get(cat)! });
    }
    map.get(cat)!.push(q);
  }
  return groups;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i]!;
    a[i] = a[j]!;
    a[j] = temp;
  }
  return a;
}

export default function QuizSession(props: QuizSessionProps) {
  const categories = groupByCategory(props.questions);
  const allQuestions = categories.flatMap((c) => c.questions);

  const [phase, setPhase] = createSignal<"selecting" | "quiz" | "done">("selecting");
  const [selectedCategory, setSelectedCategory] = createSignal<string | null>(null);
  const [order, setOrder] = createSignal<QuizQuestion[]>([]);
  const [current, setCurrent] = createSignal(0);
  const [correctCount, setCorrectCount] = createSignal(0);
  const [incorrectCount, setIncorrectCount] = createSignal(0);
  const [revealed, setRevealed] = createSignal(false);
  const [elapsed, setElapsed] = createSignal(0);
  const [accuracyMap, setAccuracyMap] = createSignal<Map<string, number>>(new Map());
  const [roundNumber, setRoundNumber] = createSignal(1);
  let startTime = 0;

  const total = () => order().length;
  const currentQuestion = () => order()[current()];
  const progressPercent = createMemo(() => (current() / total()) * 100);

  const filteredQuestions = (category: string | null) =>
    category ? allQuestions.filter((q) => formatCategory(q.id) === category) : allQuestions;

  const categoryAccuracy = (category: string) => {
    const map = accuracyMap();
    const qs = categories.find((c) => c.category === category)?.questions ?? [];
    if (qs.length === 0) return null;
    let correct = 0;
    let total = 0;
    for (const q of qs) {
      if (map.has(q.id)) {
        total++;
        if (map.get(q.id)! > 0) correct++;
      }
    }
    return total > 0 ? Math.round((correct / total) * 100) : null;
  };

  const startQuiz = (category: string | null) => {
    const qs = filteredQuestions(category);
    const map = accuracyMap();
    const round = roundNumber();

    let sorted: QuizQuestion[];
    if (round > 1) {
      sorted = [...qs].sort((a, b) => {
        const accA = map.get(a.id) ?? 0;
        const accB = map.get(b.id) ?? 0;
        return accA - accB;
      });
    } else {
      sorted = shuffle(qs);
    }

    batch(() => {
      setSelectedCategory(category);
      setOrder(sorted);
      setCurrent(0);
      setCorrectCount(0);
      setIncorrectCount(0);
      setRevealed(false);
      setElapsed(0);
      setPhase("quiz");
    });
    startTime = Date.now();
  };

  const handleReveal = (correct: boolean) => {
    setRevealed(true);
    const q = currentQuestion();
    if (!q) return;
    if (correct) {
      setCorrectCount(correctCount() + 1);
    } else {
      setIncorrectCount(incorrectCount() + 1);
    }
    setAccuracyMap((prev) => {
      const next = new Map(prev);
      const prevVal = next.get(q.id);
      next.set(q.id, correct ? (prevVal ?? 0) + 1 : (prevVal ?? 0));
      return next;
    });

    // Update topic progress
    const STORAGE_KEY_PROGRESS = "wikisites:topic-progress";
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
      const data = raw ? JSON.parse(raw) : {};
      const cat = formatCategory(q.id);
      if (!data[cat]) data[cat] = { reviews: 0, correct: 0, lastReviewed: null };
      data[cat].reviews++;
      if (correct) data[cat].correct++;
      data[cat].lastReviewed = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(data));
    } catch {
      // localStorage may be unavailable
    }
  };

  const handleNext = () => {
    if (current() + 1 >= total()) {
      setElapsed(Math.round((Date.now() - startTime) / 1000));
      setDone(true);
    } else {
      batch(() => {
        setCurrent(current() + 1);
        setRevealed(false);
      });
    }
  };

  const setDone = (v: boolean) => {
    if (v) {
      setPhase("done");
      setRoundNumber((r) => r + 1);
    }
  };

  const handleStartOver = () => {
    batch(() => {
      setPhase("selecting");
      setSelectedCategory(null);
      setOrder([]);
      setCurrent(0);
      setCorrectCount(0);
      setIncorrectCount(0);
      setRevealed(false);
      setElapsed(0);
    });
  };

  const handleTryAnother = () => {
    batch(() => {
      setPhase("selecting");
      setOrder([]);
      setCurrent(0);
      setCorrectCount(0);
      setIncorrectCount(0);
      setRevealed(false);
      setElapsed(0);
    });
  };

  const handleRetryWeak = () => {
    const qs = filteredQuestions(selectedCategory());
    const map = accuracyMap();
    const weak = qs.filter((q) => {
      const acc = map.get(q.id);
      return acc === undefined || acc === 0;
    });
    batch(() => {
      setOrder(shuffle(weak.length > 0 ? weak : qs));
      setCurrent(0);
      setCorrectCount(0);
      setIncorrectCount(0);
      setRevealed(false);
      setElapsed(0);
      setPhase("quiz");
    });
    startTime = Date.now();
  };

  return (
    <div>
      <Show when={phase() === "selecting"}>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{props.title}</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">Choose a category to quiz on</p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              type="button"
              class="px-4 py-3 rounded-xl border-2 border-[#0D9488] bg-[#0f766e]/5 text-[#0f766e] dark:text-[#2dd4bf] font-medium hover:bg-[#0f766e]/10 transition-colors text-left"
              onClick={() => startQuiz(null)}
            >
              <span class="block text-sm font-semibold">All</span>
              <span class="text-xs text-slate-500 dark:text-slate-400">
                {allQuestions.length} questions
              </span>
            </button>

            {categories.map((cat) => {
              const acc = categoryAccuracy(cat.category);
              return (
                <button
                  type="button"
                  class="px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#0D9488] hover:bg-[#0f766e]/5 transition-colors text-left"
                  onClick={() => startQuiz(cat.category)}
                >
                  <span class="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {cat.category}
                  </span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">
                    {cat.questions.length} questions
                    {acc !== null && <span class="ml-1 text-[#0f766e] dark:text-[#2dd4bf]"> · {acc}%</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Show>

      <Show when={phase() === "quiz"}>
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
              Question {current() + 1} of {total()}
            </span>
            <span class="text-sm text-slate-500 dark:text-slate-400">
              {correctCount()} correct &middot; {incorrectCount()} incorrect
            </span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div
              class="bg-[#0f766e] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent()}%` }}
            />
          </div>
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
          <button
            type="button"
            class="mt-4 px-6 py-2 bg-[#0f766e] text-white rounded-full font-medium hover:bg-[#0f766e]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
            onClick={handleNext}
          >
            {current() + 1 >= total() ? "See Results" : "Next Question"}
          </button>
        </Show>
      </Show>

      <Show when={phase() === "done"}>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm text-center">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quiz Complete!</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">{props.title}</p>

          <div class="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            <div class="text-center">
              <p class="text-3xl font-bold text-[#0f766e] dark:text-[#2dd4bf]">{correctCount()}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Correct</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {total() > 0 ? Math.round((correctCount() / total()) * 100) : 0}%
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Accuracy</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-slate-900 dark:text-slate-100">{elapsed()}s</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Time</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              class="px-6 py-2 bg-[#0f766e] text-white rounded-full font-medium hover:bg-[#0f766e]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
              onClick={handleRetryWeak}
            >
              Retry Weakest
            </button>
            <button
              type="button"
              class="px-6 py-2 border-2 border-[#0D9488] text-[#0f766e] dark:text-[#2dd4bf] rounded-full font-medium hover:bg-[#0f766e]/5 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
              onClick={handleTryAnother}
            >
              Try Another Category
            </button>
            <button
              type="button"
              class="px-6 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
              onClick={handleStartOver}
            >
              Start Over
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}
