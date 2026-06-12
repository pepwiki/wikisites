import { Show } from "solid-js";
import { useSessionOptional } from "../context";

interface StatRowProps {
  label: string;
  value: number | string;
  color?: string;
}

function StatRow(props: StatRowProps) {
  return (
    <div class="flex items-center justify-between py-1.5">
      <span class="text-sm text-slate-500 dark:text-slate-400">{props.label}</span>
      <span class={`text-sm font-semibold ${props.color ?? "text-slate-900 dark:text-slate-100"}`}>
        {props.value}
      </span>
    </div>
  );
}

function formatTime(ms: number): string {
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`;
  const mins = Math.floor(ms / 60_000);
  const secs = Math.round((ms % 60_000) / 1000);
  if (mins < 60) return `${mins}m ${secs}s`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}m`;
}

export { formatTime };

export default function SessionStats() {
  const sessionCtx = useSessionOptional();

  const lifetimeAccuracy = () => {
    if (!sessionCtx) return 0;
    const d = sessionCtx.allTime();
    const total = d.totalReviews + d.totalQuizzes;
    return total > 0 ? Math.round((d.totalCorrect / total) * 100) : 0;
  };

  const sessionAccuracy = () => {
    if (!sessionCtx) return 0;
    const s = sessionCtx.session();
    const total = s.reviews + s.quizzes;
    return total > 0 ? Math.round((s.correct / total) * 100) : 0;
  };

  const streakActive = () => (sessionCtx ? sessionCtx.allTime().currentStreak > 0 : false);

  const allTime = () => sessionCtx?.allTime();
  const session = () => sessionCtx?.session();

  return (
    <div class="spatial-card p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Session Stats</h3>
        <Show when={streakActive()}>
          <div class="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 dark:bg-orange-950/30 rounded-full border border-orange-200">
            <span class="text-[#F97316] text-sm font-bold">{allTime()?.currentStreak}</span>
            <span class="text-xs text-orange-600">day streak</span>
          </div>
        </Show>
      </div>

      {/* Current Session */}
      <div class="mb-4">
        <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          This Session
        </div>
        <StatRow label="Reviews" value={session()?.reviews ?? 0} />
        <StatRow label="Quizzes" value={session()?.quizzes ?? 0} />
        <StatRow
          label="Accuracy"
          value={`${sessionAccuracy()}%`}
          color={sessionAccuracy() >= 80 ? "text-[#0f766e]" : "text-[#F97316]"}
        />
      </div>

      <div class="border-t border-slate-100 dark:border-slate-800 my-3" />

      {/* All-time */}
      <div>
        <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          All Time
        </div>
        <StatRow
          label="Total Reviews"
          value={allTime()?.totalReviews ?? 0}
          color="text-[#0f766e]"
        />
        <StatRow
          label="Total Quizzes"
          value={allTime()?.totalQuizzes ?? 0}
          color="text-[#0f766e]"
        />
        <StatRow
          label="Accuracy"
          value={`${lifetimeAccuracy()}%`}
          color={lifetimeAccuracy() >= 80 ? "text-[#0f766e]" : "text-[#F97316]"}
        />
        <StatRow
          label="Best Streak"
          value={`${allTime()?.bestStreak ?? 0} days`}
          color="text-[#F97316]"
        />
        <StatRow label="Review Time" value={formatTime(allTime()?.totalReviewTimeMs ?? 0)} />
      </div>
    </div>
  );
}
