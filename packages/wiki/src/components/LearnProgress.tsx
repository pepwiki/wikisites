import { createSignal, onMount, Show } from "solid-js";
import { STORAGE_KEY, emptySessionData, type SessionData } from "@wikisites/query/session-stats";

interface LearnProgressProps {
  /** Lesson IDs that belong to this path */
  lessonIds: string[];
}

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

export default function LearnProgress(props: LearnProgressProps) {
  const [stats, setStats] = createSignal<SessionData | null>(null);

  onMount(() => {
    setStats(loadStats());
  });

  const completed = () => {
    if (!stats()) return 0;
    return Math.min(stats()!.totalReviews, props.lessonIds.length);
  };

  const percentage = () => {
    if (props.lessonIds.length === 0) return 0;
    return Math.round((completed() / props.lessonIds.length) * 100);
  };

  return (
    <Show when={stats()}>
      <div class="mt-3">
        <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Progress</span>
          <span>{percentage()}%</span>
        </div>
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#0D9488] rounded-full transition-all"
            style={{ width: `${percentage()}%` }}
          />
        </div>
      </div>
    </Show>
  );
}