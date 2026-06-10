/**
 * Admin dashboard for wikisites content management.
 * Provides tools for managing quizzes, flashcards, and community content.
 *
 * Usage:
 *   import { getAdminDashboard, exportContent } from "../lib/admin-dashboard";
 *   const dashboard = getAdminDashboard();
 */

import { getAllAnnotations } from "./annotations";
import { getAllDiscussions } from "./discussions";
import { getAllProfiles } from "./user-profile";
import { getRUMSummary } from "./rum";
import { getThemeStats } from "./theme-analytics";
import { getFeedbackSummary } from "./theme-feedback";

type AdminDashboard = {
  content: {
    quizzes: number;
    flashcards: number;
    articles: number;
    learnLessons: number;
  };
  community: {
    totalUsers: number;
    totalAnnotations: number;
    totalDiscussions: number;
    totalComments: number;
    activeUsers: number;
  };
  performance: {
    rum: ReturnType<typeof getRUMSummary>;
    themes: ReturnType<typeof getThemeStats>;
    feedback: ReturnType<typeof getFeedbackSummary>;
  };
  generatedAt: string;
};

/**
 * Generate admin dashboard data.
 */
export function getAdminDashboard(): AdminDashboard {
  const annotations = getAllAnnotations();
  const discussions = getAllDiscussions();
  const profiles = getAllProfiles();

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const activeUsers = profiles.filter((p) => now - p.lastActive < 7 * dayMs).length;

  return {
    content: {
      quizzes: 680,
      flashcards: 502,
      articles: 158,
      learnLessons: 12,
    },
    community: {
      totalUsers: profiles.length,
      totalAnnotations: annotations.length,
      totalDiscussions: discussions.length,
      totalComments: discussions.reduce((sum, d) => sum + d.comments.length, 0),
      activeUsers,
    },
    performance: {
      rum: getRUMSummary(),
      themes: getThemeStats(),
      feedback: getFeedbackSummary(),
    },
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Export content as JSON.
 */
export function exportContent(): string {
  const dashboard = getAdminDashboard();
  return JSON.stringify(dashboard, null, 2);
}

/**
 * Get content health status.
 */
export function getContentHealth(): {
  status: "healthy" | "warning" | "critical";
  issues: string[];
  recommendations: string[];
} {
  const dashboard = getAdminDashboard();
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check quiz count
  if (dashboard.content.quizzes < 1000) {
    issues.push(`Quiz count (${dashboard.content.quizzes}) below target (1000)`);
    recommendations.push("Add more quiz questions to reach 1000 target");
  }

  // Check flashcard count
  if (dashboard.content.flashcards < 750) {
    issues.push(`Flashcard count (${dashboard.content.flashcards}) below target (750)`);
    recommendations.push("Add more flashcards to reach 750 target");
  }

  // Check community engagement
  if (dashboard.community.totalAnnotations < 10) {
    issues.push("Low annotation activity");
    recommendations.push("Encourage users to add annotations to articles");
  }

  if (dashboard.community.totalDiscussions < 5) {
    issues.push("Low discussion activity");
    recommendations.push("Seed initial discussions to encourage participation");
  }

  // Check performance
  const rum = dashboard.performance.rum;
  for (const [metric, data] of Object.entries(rum.byMetric)) {
    const total = data.good + data.needsImprovement + data.poor;
    if (total > 0 && data.poor / total > 0.1) {
      issues.push(`${metric}: ${Math.round((data.poor / total) * 100)}% poor ratings`);
      recommendations.push(`Optimize ${metric} performance`);
    }
  }

  const status = issues.length === 0 ? "healthy" : issues.length < 3 ? "warning" : "critical";

  return { status, issues, recommendations };
}

/**
 * Format dashboard as HTML report.
 */
export function formatDashboardHTML(dashboard: AdminDashboard): string {
  return `
    <html>
    <head><title>Wikisites Admin Dashboard</title></head>
    <body style="font-family: Inter, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1>Wikisites Admin Dashboard</h1>
      <p>Generated: ${dashboard.generatedAt}</p>

      <h2>Content</h2>
      <ul>
        <li>Quizzes: ${dashboard.content.quizzes}</li>
        <li>Flashcards: ${dashboard.content.flashcards}</li>
        <li>Articles: ${dashboard.content.articles}</li>
        <li>Learn Lessons: ${dashboard.content.learnLessons}</li>
      </ul>

      <h2>Community</h2>
      <ul>
        <li>Total Users: ${dashboard.community.totalUsers}</li>
        <li>Active Users (7 days): ${dashboard.community.activeUsers}</li>
        <li>Annotations: ${dashboard.community.totalAnnotations}</li>
        <li>Discussions: ${dashboard.community.totalDiscussions}</li>
        <li>Comments: ${dashboard.community.totalComments}</li>
      </ul>

      <h2>Performance</h2>
      <h3>Core Web Vitals</h3>
      <ul>
        ${Object.entries(dashboard.performance.rum.byMetric)
          .map(
            ([name, data]) =>
              `<li>${name}: avg=${data.avg}ms (good=${data.good}, poor=${data.poor})</li>`,
          )
          .join("")}
      </ul>

      <h3>Theme Preferences</h3>
      <ul>
        <li>Dark: ${dashboard.performance.themes.darkPercentage}%</li>
        <li>Light: ${dashboard.performance.themes.lightPercentage}%</li>
        <li>System: ${dashboard.performance.themes.systemPercentage}%</li>
      </ul>

      <h3>User Feedback</h3>
      <ul>
        <li>Total: ${dashboard.performance.feedback.total}</li>
        <li>Average Rating: ${dashboard.performance.feedback.avgRating}/5.0</li>
      </ul>
    </body>
    </html>
  `;
}
