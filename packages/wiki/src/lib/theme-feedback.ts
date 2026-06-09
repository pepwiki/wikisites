/**
 * Dark mode feedback collection.
 * Collects user feedback on dark mode quality and preferences.
 *
 * Usage:
 *   import { initFeedback, submitFeedback } from "../lib/theme-feedback";
 *   initFeedback("wiki");
 */

type Feedback = {
  site: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  theme: string;
  timestamp: number;
  url: string;
};

const FEEDBACK_KEY = "wikisites:theme-feedback";
const SHOWN_KEY = "wikisites:feedback-shown";

/**
 * Initialize feedback collection.
 * Shows feedback prompt after 3 page views if not already submitted.
 */
export function initFeedback(site: string): void {
  if (typeof window === "undefined") return;

  // Track page views
  const views = parseInt(localStorage.getItem(`${site}:page-views`) || "0", 10);
  localStorage.setItem(`${site}:page-views`, String(views + 1));

  // Show feedback prompt after 3 views if not already shown/submitted
  const shown = localStorage.getItem(SHOWN_KEY);
  if (!shown && views >= 2) {
    showFeedbackPrompt(site);
  }
}

/**
 * Submit user feedback.
 */
export function submitFeedback(site: string, rating: 1 | 2 | 3 | 4 | 5, comment: string): void {
  if (typeof window === "undefined") return;

  const feedback: Feedback = {
    site,
    rating,
    comment,
    theme: document.documentElement.getAttribute("data-theme") || "light",
    timestamp: Date.now(),
    url: window.location.href,
  };

  try {
    const feedbacks = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
    feedbacks.push(feedback);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbacks));
    localStorage.setItem(SHOWN_KEY, "true");
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Get all feedback.
 */
export function getFeedback(): Feedback[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Get feedback summary.
 */
export function getFeedbackSummary(): {
  total: number;
  avgRating: number;
  byTheme: Record<string, { count: number; avgRating: number }>;
} {
  const feedbacks = getFeedback();
  if (feedbacks.length === 0) {
    return { total: 0, avgRating: 0, byTheme: {} };
  }

  const totalRating = feedbacks.reduce((sum, f) => sum + f.rating, 0);
  const byTheme: Record<string, { count: number; avgRating: number }> = {};

  for (const f of feedbacks) {
    if (!byTheme[f.theme]) {
      byTheme[f.theme] = { count: 0, avgRating: 0 };
    }
    byTheme[f.theme].count++;
    byTheme[f.theme].avgRating += f.rating;
  }

  for (const theme of Object.keys(byTheme)) {
    byTheme[theme].avgRating =
      Math.round((byTheme[theme].avgRating / byTheme[theme].count) * 10) / 10;
  }

  return {
    total: feedbacks.length,
    avgRating: Math.round((totalRating / feedbacks.length) * 10) / 10,
    byTheme,
  };
}

function showFeedbackPrompt(site: string): void {
  // Create feedback modal
  const modal = document.createElement("div");
  modal.id = "theme-feedback-modal";
  modal.className = "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50";
  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-sm mx-4 shadow-xl">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">How's the dark mode?</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Help us improve your experience.</p>
      <div class="flex gap-2 mb-4" id="feedback-stars">
        ${[1, 2, 3, 4, 5].map((i) => `<button class="star-btn text-2xl text-slate-300 hover:text-yellow-400 transition-colors" data-rating="${i}">★</button>`).join("")}
      </div>
      <textarea id="feedback-comment" class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 mb-4" rows="2" placeholder="Optional feedback..."></textarea>
      <div class="flex gap-2 justify-end">
        <button id="feedback-skip" class="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">Skip</button>
        <button id="feedback-submit" class="px-4 py-2 text-sm bg-[#0D9488] text-white rounded-lg hover:bg-[#0D9488]/90" disabled>Submit</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  let selectedRating = 0;

  // Star click handlers
  modal.querySelectorAll(".star-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRating = parseInt(btn.getAttribute("data-rating") || "0", 10);
      modal.querySelectorAll(".star-btn").forEach((s, i) => {
        s.classList.toggle("text-yellow-400", i < selectedRating);
        s.classList.toggle("text-slate-300", i >= selectedRating);
      });
      const submitBtn = modal.querySelector("#feedback-submit") as HTMLButtonElement;
      if (submitBtn) submitBtn.disabled = false;
    });
  });

  // Submit handler
  modal.querySelector("#feedback-submit")?.addEventListener("click", () => {
    const comment = (modal.querySelector("#feedback-comment") as HTMLTextAreaElement)?.value || "";
    submitFeedback(site, selectedRating as 1 | 2 | 3 | 4 | 5, comment);
    modal.remove();
  });

  // Skip handler
  modal.querySelector("#feedback-skip")?.addEventListener("click", () => {
    localStorage.setItem(SHOWN_KEY, "true");
    modal.remove();
  });

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      localStorage.setItem(SHOWN_KEY, "true");
      modal.remove();
    }
  });
}
