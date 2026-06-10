/**
 * Production metrics dashboard for wikisites.
 * Aggregates RUM, theme analytics, and feedback data.
 *
 * Usage:
 *   import { getDashboard } from "../lib/dashboard";
 *   const dashboard = getDashboard();
 */

import { getRUMSummary } from "./rum";
import { getThemeStats } from "./theme-analytics";
import { getFeedbackSummary } from "./theme-feedback";
import { getErrorSummary } from "./theme-errors";

type Dashboard = {
  rum: {
    total: number;
    byMetric: Record<string, { good: number; needsImprovement: number; poor: number; avg: number }>;
  };
  themes: {
    totalEvents: number;
    darkPercentage: number;
    lightPercentage: number;
    systemPercentage: number;
    bySite: Record<string, { dark: number; light: number; system: number }>;
  };
  feedback: {
    total: number;
    avgRating: number;
    byTheme: Record<string, { count: number; avgRating: number }>;
  };
  errors: Record<string, number>;
  generatedAt: string;
};

/**
 * Generate a complete dashboard of all metrics.
 */
export function getDashboard(): Dashboard {
  return {
    rum: getRUMSummary(),
    themes: getThemeStats(),
    feedback: getFeedbackSummary(),
    errors: getErrorSummary(),
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Format dashboard as human-readable text.
 */
export function formatDashboard(dashboard: Dashboard): string {
  const lines: string[] = [
    "=== Wikisites Production Dashboard ===",
    `Generated: ${dashboard.generatedAt}`,
    "",
    "--- Core Web Vitals ---",
  ];

  for (const [name, data] of Object.entries(dashboard.rum.byMetric)) {
    const total = data.good + data.needsImprovement + data.poor;
    lines.push(
      `  ${name}: avg=${data.avg}ms | good=${data.good} (${Math.round((data.good / total) * 100)}%) | needs-improvement=${data.needsImprovement} | poor=${data.poor}`,
    );
  }

  lines.push("", "--- Theme Preferences ---");
  lines.push(`  Total events: ${dashboard.themes.totalEvents}`);
  lines.push(
    `  Dark: ${dashboard.themes.darkPercentage}% | Light: ${dashboard.themes.lightPercentage}% | System: ${dashboard.themes.systemPercentage}%`,
  );

  for (const [site, data] of Object.entries(dashboard.themes.bySite)) {
    const total = data.dark + data.light + data.system;
    lines.push(
      `  ${site}: dark=${data.dark} light=${data.light} system=${data.system} (total=${total})`,
    );
  }

  lines.push("", "--- User Feedback ---");
  lines.push(
    `  Total: ${dashboard.feedback.total} | Avg rating: ${dashboard.feedback.avgRating}/5.0`,
  );
  for (const [theme, data] of Object.entries(dashboard.feedback.byTheme)) {
    lines.push(`  ${theme}: ${data.count} responses, avg=${data.avgRating}/5.0`);
  }

  if (Object.keys(dashboard.errors).length > 0) {
    lines.push("", "--- Errors ---");
    for (const [source, count] of Object.entries(dashboard.errors)) {
      lines.push(`  ${source}: ${count} errors`);
    }
  }

  return lines.join("\n");
}

/**
 * Export dashboard data as JSON for external analysis.
 */
export function exportDashboard(): string {
  return JSON.stringify(getDashboard(), null, 2);
}
