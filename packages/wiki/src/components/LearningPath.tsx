import { createSignal, onMount, Show, For } from "solid-js";

interface TopicProgress {
  topic: string;
  quizAccuracy: number;
  flashcardAccuracy: number;
  totalReviews: number;
  lastReviewed: string | null;
  status: "not-started" | "learning" | "reviewing" | "mastered";
}

interface LearningPathProps {
  topics: string[];
}

const STORAGE_KEY_PROGRESS = "wikisites:topic-progress";

function loadTopicProgress(): Record<string, { reviews: number; correct: number; lastReviewed: string | null }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function getStatus(p: TopicProgress): "not-started" | "learning" | "reviewing" | "mastered" {
  if (p.totalReviews === 0) return "not-started";
  if (p.quizAccuracy >= 80 && p.flashcardAccuracy >= 80) return "mastered";
  if (p.quizAccuracy >= 50 || p.flashcardAccuracy >= 50) return "reviewing";
  return "learning";
}

const STATUS_COLORS: Record<string, string> = {
  "not-started": "bg-slate-100 text-slate-500",
  "learning": "bg-blue-100 text-blue-700",
  "reviewing": "bg-orange-100 text-orange-700",
  "mastered": "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  "not-started": "Not Started",
  "learning": "Learning",
  "reviewing": "Reviewing",
  "mastered": "Mastered",
};

export default function LearningPath(props: LearningPathProps) {
  const [progress, setProgress] = createSignal<Record<string, TopicProgress>>({});
  const [recommended, setRecommended] = createSignal<string | null>(null);

  onMount(() => {
    const topicData = loadTopicProgress();

    const progressMap: Record<string, TopicProgress> = {};
    for (const topic of props.topics) {
      const data = topicData[topic] || { reviews: 0, correct: 0, lastReviewed: null };
      const quizAccuracy = data.reviews > 0 ? Math.round((data.correct / data.reviews) * 100) : 0;
      const tp: TopicProgress = {
        topic,
        quizAccuracy,
        flashcardAccuracy: 0,
        totalReviews: data.reviews,
        lastReviewed: data.lastReviewed,
        status: "not-started",
      };
      tp.status = getStatus(tp);
      progressMap[topic] = tp;
    }
    setProgress(progressMap);

    // Recommend: lowest accuracy first, then not-started
    const sorted = Object.values(progressMap).sort((a, b) => {
      if (a.status === "not-started" && b.status !== "not-started") return 1;
      if (b.status === "not-started" && a.status !== "not-started") return -1;
      return a.quizAccuracy - b.quizAccuracy;
    });
    setRecommended(sorted[0]?.topic || null);
  });

  return (
    <div class="spatial-card p-6">
      <h3 class="text-lg font-bold text-slate-900 mb-4">Learning Progress</h3>
      
      <Show when={recommended()}>
        <div class="mb-4 p-3 bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl">
          <p class="text-sm font-medium text-[#0D9488]">
            Recommended next: <strong>{recommended()}</strong>
          </p>
        </div>
      </Show>

      <div class="space-y-3">
        <For each={Object.values(progress())}>
          {(p) => (
            <div class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span class="text-sm font-medium text-slate-700">{p.topic}</span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500">{p.quizAccuracy}%</span>
                <span class={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status]}`}>
                  {STATUS_LABELS[p.status]}
                </span>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
