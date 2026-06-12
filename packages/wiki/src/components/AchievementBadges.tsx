import { createSignal, onMount, For } from "solid-js";
import { STORAGE_KEY, emptySessionData, type SessionData } from "@wikisites/query/session-stats";

const STORAGE_KEY_BADGES = "wikisites:achievements";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
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

function loadBadges(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BADGES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveBadges(badges: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_BADGES, JSON.stringify(badges));
  } catch {
    // localStorage may be unavailable
  }
}

function checkAchievements(stats: SessionData, badges: Record<string, string>): Achievement[] {
  const now = new Date().toISOString();
  const newBadges = { ...badges };

  const achievements: Achievement[] = [
    {
      id: "first-review",
      name: "First Steps",
      description: "Review your first flashcard",
      icon: "1",
      unlocked: stats.totalReviews >= 1,
      unlockedAt: newBadges["first-review"] || null,
    },
    {
      id: "10-reviews",
      name: "Getting Started",
      description: "Review 10 flashcards",
      icon: "10",
      unlocked: stats.totalReviews >= 10,
      unlockedAt: newBadges["10-reviews"] || null,
    },
    {
      id: "50-reviews",
      name: "Dedicated Learner",
      description: "Review 50 flashcards",
      icon: "50",
      unlocked: stats.totalReviews >= 50,
      unlockedAt: newBadges["50-reviews"] || null,
    },
    {
      id: "100-reviews",
      name: "Study Champion",
      description: "Review 100 flashcards",
      icon: "100",
      unlocked: stats.totalReviews >= 100,
      unlockedAt: newBadges["100-reviews"] || null,
    },
    {
      id: "first-quiz",
      name: "Quiz Rookie",
      description: "Complete your first quiz",
      icon: "Q",
      unlocked: stats.totalQuizzes >= 1,
      unlockedAt: newBadges["first-quiz"] || null,
    },
    {
      id: "10-quizzes",
      name: "Quiz Enthusiast",
      description: "Complete 10 quizzes",
      icon: "Q10",
      unlocked: stats.totalQuizzes >= 10,
      unlockedAt: newBadges["10-quizzes"] || null,
    },
    {
      id: "3-day-streak",
      name: "Consistent",
      description: "Maintain a 3-day streak",
      icon: "3",
      unlocked: stats.currentStreak >= 3 || stats.bestStreak >= 3,
      unlockedAt: newBadges["3-day-streak"] || null,
    },
    {
      id: "7-day-streak",
      name: "Weekly Warrior",
      description: "Maintain a 7-day streak",
      icon: "7",
      unlocked: stats.currentStreak >= 7 || stats.bestStreak >= 7,
      unlockedAt: newBadges["7-day-streak"] || null,
    },
    {
      id: "30-day-streak",
      name: "Monthly Master",
      description: "Maintain a 30-day streak",
      icon: "30",
      unlocked: stats.currentStreak >= 30 || stats.bestStreak >= 30,
      unlockedAt: newBadges["30-day-streak"] || null,
    },
    {
      id: "high-accuracy",
      name: "Sharp Mind",
      description: "Achieve 90% accuracy in a quiz session",
      icon: "A",
      unlocked: false, // Will be set by quiz completion
      unlockedAt: newBadges["high-accuracy"] || null,
    },
  ];

  // Check for new unlocks
  for (const a of achievements) {
    if (a.unlocked && !newBadges[a.id]) {
      newBadges[a.id] = now;
      a.unlockedAt = now;
    }
  }

  saveBadges(newBadges);
  return achievements;
}

export default function AchievementBadges() {
  const [achievements, setAchievements] = createSignal<Achievement[]>([]);

  onMount(() => {
    const stats = loadStats();
    const badges = loadBadges();
    setAchievements(checkAchievements(stats, badges));
  });

  const unlockedCount = () => achievements().filter((a) => a.unlocked).length;
  const totalCount = () => achievements().length;

  return (
    <div class="spatial-card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Achievements</h3>
        <span class="text-sm text-slate-500 dark:text-slate-400">
          {unlockedCount()}/{totalCount()}
        </span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <For each={achievements()}>
          {(a) => (
            <div
              class={`p-3 rounded-xl text-center ${a.unlocked ? "bg-[#0f766e]/5 border border-[#0D9488]/20" : "bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-50"}`}
            >
              <div
                class={`text-2xl font-bold mb-1 ${a.unlocked ? "text-[#0f766e] dark:text-[#2dd4bf]" : "text-slate-300"}`}
              >
                {a.icon}
              </div>
              <div class="text-xs font-medium text-slate-700">{a.name}</div>
              <div class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{a.description}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
