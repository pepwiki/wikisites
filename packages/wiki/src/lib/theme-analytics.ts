/**
 * Theme analytics tracker for wikisites monorepo.
 * Tracks dark mode usage percentage and theme switching patterns.
 *
 * Usage:
 *   import { trackThemeUsage } from "../lib/theme-analytics";
 *   trackThemeUsage("wiki");
 */

type ThemeEvent = {
  theme: "light" | "dark" | "system";
  site: "wiki" | "encp";
  timestamp: number;
  method: "toggle" | "system" | "cookie";
};

const ANALYTICS_KEY = "wikisites:theme-analytics";

/**
 * Track a theme change event.
 */
export function trackThemeChange(
  site: "wiki" | "encp",
  theme: "light" | "dark" | "system",
  method: "toggle" | "system" | "cookie",
): void {
  if (typeof window === "undefined") return;

  try {
    const events = getEvents();
    events.push({
      theme,
      site,
      timestamp: Date.now(),
      method,
    });

    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Get theme usage statistics.
 */
export function getThemeStats(): {
  totalEvents: number;
  darkPercentage: number;
  lightPercentage: number;
  systemPercentage: number;
  bySite: Record<string, { dark: number; light: number; system: number }>;
} {
  const events = getEvents();
  const total = events.length;

  if (total === 0) {
    return {
      totalEvents: 0,
      darkPercentage: 0,
      lightPercentage: 0,
      systemPercentage: 0,
      bySite: {},
    };
  }

  const dark = events.filter((e) => e.theme === "dark").length;
  const light = events.filter((e) => e.theme === "light").length;
  const system = events.filter((e) => e.theme === "system").length;

  const bySite: Record<string, { dark: number; light: number; system: number }> = {};
  for (const event of events) {
    if (!bySite[event.site]) {
      bySite[event.site] = { dark: 0, light: 0, system: 0 };
    }
    bySite[event.site][event.theme]++;
  }

  return {
    totalEvents: total,
    darkPercentage: Math.round((dark / total) * 100),
    lightPercentage: Math.round((light / total) * 100),
    systemPercentage: Math.round((system / total) * 100),
    bySite,
  };
}

/**
 * Clear analytics data.
 */
export function clearThemeStats(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANALYTICS_KEY);
}

function getEvents(): ThemeEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
