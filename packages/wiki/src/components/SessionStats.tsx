import { createSignal, onMount, Show } from "solid-js";
import {
  STORAGE_KEY,
  emptySessionData,
  emptySessionSnapshot,
  mergeSession,
  type SessionData,
  type SessionSnapshot,
} from "@wikisites/query/session-stats";

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

function saveStats(data: SessionData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded or SSR — silently ignore
  }
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) return `${minutes}m ${seconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMin = minutes % 60;
  return `${hours}h ${remainingMin}m`;
}

interface StatRowProps {
  label: string;
  value: number | string;
  color?: string;
}

function StatRow(props: StatRowProps) {
  return (
    <div class="flex items-center justify-between py-1.5">
      <span class="text-sm text-slate-500">{props.label}</span>
      <span class={`text-sm font-semibold ${props.color ?? "text-slate-900"}`}>{props.value}</span>
    </div>
  );
}

export default function SessionStats() {
  const [allTime, setAllTime] = createSignal<SessionData>(emptySessionData());
  const [session, setSession] = createSignal<SessionSnapshot>(emptySessionSnapshot());

  onMount(() => {
    setAllTime(loadStats());
    setSession(emptySessionSnapshot());
  });

  // Merge and persist on every snapshot or allTime change
  const persist = () => {
    const merged = mergeSession(allTime(), session(), new Date());
    setAllTime(merged);
    saveStats(merged);
  };

  // Public API exposed via ref-like pattern: parent can import and call these
  // But for simplicity we expose them on the window for the ReviewDashboard to call.
  // Alternatively the component can be wired with events.
  // For now, we auto-track via a mutation observer pattern on the snapshot.

  const recordReview = (correct: boolean) => {
    setSession((prev) => ({
      ...prev,
      reviews: prev.reviews + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));
    persist();
  };

  const recordQuiz = (correct: boolean) => {
    setSession((prev) => ({
      ...prev,
      quizzes: prev.quizzes + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));
    persist();
  };

  const resetSession = () => {
    setSession(emptySessionSnapshot());
  };

  // Expose API globally so ReviewDashboard can call it
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as Record<string, unknown>).__sessionStats = { recordReview, recordQuiz, resetSession };
  }

  const lifetimeAccuracy = () => {
    const d = allTime();
    const total = d.totalReviews + d.totalQuizzes;
    return total > 0 ? Math.round((d.totalCorrect / total) * 100) : 0;
  };

  const sessionAccuracy = () => {
    const s = session();
    const total = s.reviews + s.quizzes;
    return total > 0 ? Math.round((s.correct / total) * 100) : 0;
  };

  const streakActive = () => allTime().currentStreak > 0;

  return (
    <div class="spatial-card p-6 bg-white rounded-2xl border border-slate-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900">Session Stats</h3>
        <Show when={streakActive()}>
          <div class="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full border border-orange-200">
            <span class="text-[#F97316] text-sm font-bold">{allTime().currentStreak}</span>
            <span class="text-xs text-orange-600">day streak</span>
          </div>
        </Show>
      </div>

      {/* Current Session */}
      <div class="mb-4">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          This Session
        </div>
        <StatRow label="Reviews" value={session().reviews} />
        <StatRow label="Quizzes" value={session().quizzes} />
        <StatRow
          label="Accuracy"
          value={`${sessionAccuracy()}%`}
          color={sessionAccuracy() >= 80 ? "text-[#0D9488]" : "text-[#F97316]"}
        />
      </div>

      <div class="border-t border-slate-100 my-3" />

      {/* All-time */}
      <div>
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          All Time
        </div>
        <StatRow label="Total Reviews" value={allTime().totalReviews} color="text-[#0D9488]" />
        <StatRow label="Total Quizzes" value={allTime().totalQuizzes} color="text-[#0D9488]" />
        <StatRow
          label="Accuracy"
          value={`${lifetimeAccuracy()}%`}
          color={lifetimeAccuracy() >= 80 ? "text-[#0D9488]" : "text-[#F97316]"}
        />
        <StatRow
          label="Best Streak"
          value={`${allTime().bestStreak} days`}
          color="text-[#F97316]"
        />
        <StatRow label="Review Time" value={formatTime(allTime().totalReviewTimeMs)} />
      </div>
    </div>
  );
}
