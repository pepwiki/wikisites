import { createSignal, createMemo, Show, batch } from "solid-js";
import { useSessionOptional } from "../context";
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
  return parts
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizSession(props: QuizSessionProps) {
  const categories = groupByCategory(props.questions);
  const allQuestions = categories.flatMap((c) => c.questions);

  const [order, setOrder] = createSignal(shuffle(allQuestions));
  const [current, setCurrent] = createSignal(0);
  const [correctCount, setCorrectCount] = createSignal(0);
  const [incorrectCount, setIncorrectCount] = createSignal(0);
  const [revealed, setRevealed] = createSignal(false);
  const [done, setDone] = createSignal(false);
  const [elapsed, setElapsed] = createSignal(0);
  const startTime = Date.now();

  const total = order().length;
  const currentQuestion = () => order()[current()];
  const progressPercent = createMemo(() => (current() / total) * 100);

  const handleReveal = (correct: boolean) => {
    setRevealed(true);
    if (correct) {
      setCorrectCount(correctCount() + 1);
    } else {
      setIncorrectCount(incorrectCount() + 1);
    }
  };

  const handleNext = () => {
    if (current() + 1 >= total) {
      setElapsed(Math.round((Date.now() - startTime) / 1000));
      setDone(true);
    } else {
      batch(() => {
        setCurrent(current() + 1);
        setRevealed(false);
      });
    }
  };

  const handleStartOver = () => {
    batch(() => {
      setOrder(shuffle(allQuestions));
      setCurrent(0);
      setCorrectCount(0);
      setIncorrectCount(0);
      setRevealed(false);
      setDone(false);
    });
  };

  return (
    <div>
      <Show when={!done()}>
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-600">
              Question {current() + 1} of {total}
            </span>
            <span class="text-sm text-slate-500">
              {correctCount()} correct &middot; {incorrectCount()} incorrect
            </span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div
              class="bg-[#0D9488] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent()}%` }}
            />
          </div>
        </div>

        <Quiz
          client:load
          question={currentQuestion().question}
          options={currentQuestion().options}
          correctIndex={currentQuestion().correctIndex}
          explanation={currentQuestion().explanation}
          onReveal={handleReveal}
        />

        <Show when={revealed()}>
          <button
            type="button"
            class="mt-4 px-6 py-2 bg-[#0D9488] text-white rounded-full font-medium hover:bg-[#0D9488]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 transition-colors"
            onClick={handleNext}
          >
            {current() + 1 >= total ? "See Results" : "Next Question"}
          </button>
        </Show>
      </Show>

      <Show when={done()}>
        <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
          <p class="text-slate-600 mb-6">{props.title}</p>

          <div class="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            <div class="text-center">
              <p class="text-3xl font-bold text-[#0D9488]">{correctCount()}</p>
              <p class="text-sm text-slate-500">Correct</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-slate-900">
                {total > 0 ? Math.round((correctCount() / total) * 100) : 0}%
              </p>
              <p class="text-sm text-slate-500">Accuracy</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-slate-900">{elapsed()}s</p>
              <p class="text-sm text-slate-500">Time</p>
            </div>
          </div>

          <button
            type="button"
            class="px-6 py-2 bg-[#0D9488] text-white rounded-full font-medium hover:bg-[#0D9488]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 transition-colors"
            onClick={handleStartOver}
          >
            Start Over
          </button>
        </div>
      </Show>
    </div>
  );
}
