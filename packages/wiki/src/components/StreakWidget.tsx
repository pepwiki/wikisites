import { createSignal, onMount, Show } from "solid-js";
import { STORAGE_KEY, emptySessionData, type SessionData } from "@wikisites/query/session-stats";

function loadStats(): SessionData {
  if (typeof window === "undefined") return emptySessionData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySessionData();
    return JSON.parse(raw) as SessionData;
  } catch {
    return emptySessionData();
  }
}

export default function StreakWidget() {
  const [stats, setStats] = createSignal<SessionData | null>(null);

  onMount(() => {
    setStats(loadStats());
  });

  const streak = () => stats()?.currentStreak ?? 0;
  const bestStreak = () => stats()?.bestStreak ?? 0;
  const totalReviews = () => stats()?.totalReviews ?? 0;
  const totalQuizzes = () => stats()?.totalQuizzes ?? 0;

  return (
    <Show when={stats()}>
      <div class="spatial-card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Your Streak</h3>
          <Show when={streak() > 0}>
            <div class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/30 rounded-full border border-orange-200">
              <span class="text-[#F97316] text-lg font-bold">{streak()}</span>
              <span class="text-xs text-orange-600 font-medium">day streak</span>
            </div>
          </Show>
        </div>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div class="text-2xl font-bold text-[#0f766e] dark:text-[#2dd4bf]">{totalReviews()}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Cards Reviewed</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div class="text-2xl font-bold text-[#F97316]">{totalQuizzes()}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Quizzes Taken</div>
          </div>
        </div>
        <Show when={bestStreak() > 0}>
          <p class="text-xs text-slate-400 dark:text-slate-500 text-center mt-3">
            Best streak: {bestStreak()} days
          </p>
        </Show>
      </div>
    </Show>
  );
}
