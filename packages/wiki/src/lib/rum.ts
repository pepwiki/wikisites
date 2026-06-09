/**
 * Real User Monitoring (RUM) for Core Web Vitals.
 * Tracks LCP, FID, CLS, and TTFB in production.
 *
 * Usage:
 *   import { initRUM } from "../lib/rum";
 *   initRUM("wiki");
 */

type Metric = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  site: string;
  timestamp: number;
  url: string;
};

const RUM_KEY = "wikisites:rum-metrics";
const MAX_METRICS = 200;

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const t = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!t) return "good";
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
}

function storeMetric(metric: Metric): void {
  try {
    const metrics = JSON.parse(localStorage.getItem(RUM_KEY) || "[]");
    metrics.push(metric);
    if (metrics.length > MAX_METRICS) metrics.splice(0, metrics.length - MAX_METRICS);
    localStorage.setItem(RUM_KEY, JSON.stringify(metrics));
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Initialize RUM for a site.
 */
export function initRUM(site: string): void {
  if (typeof window === "undefined") return;

  // LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        storeMetric({
          name: "LCP",
          value: Math.round(last.startTime),
          rating: getRating("LCP", last.startTime),
          site,
          timestamp: Date.now(),
          url: window.location.href,
        });
      }
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // PerformanceObserver not supported
  }

  // FID (First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        const fid = entry as PerformanceEventTiming;
        storeMetric({
          name: "FID",
          value: Math.round(fid.processingStart - fid.startTime),
          rating: getRating("FID", fid.processingStart - fid.startTime),
          site,
          timestamp: Date.now(),
          url: window.location.href,
        });
      }
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {
    // PerformanceObserver not supported
  }

  // CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        if (!(entry as LayoutShift).hadRecentInput) {
          clsValue += (entry as LayoutShift).value;
        }
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // Store CLS on page hide
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        storeMetric({
          name: "CLS",
          value: Math.round(clsValue * 1000) / 1000,
          rating: getRating("CLS", clsValue),
          site,
          timestamp: Date.now(),
          url: window.location.href,
        });
      }
    });
  } catch {
    // PerformanceObserver not supported
  }

  // TTFB (Time to First Byte)
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (nav) {
      const ttfb = Math.round(nav.responseStart - nav.requestStart);
      storeMetric({
        name: "TTFB",
        value: ttfb,
        rating: getRating("TTFB", ttfb),
        site,
        timestamp: Date.now(),
        url: window.location.href,
      });
    }
  } catch {
    // Navigation timing not supported
  }
}

/**
 * Get all stored RUM metrics.
 */
export function getRUMMetrics(): Metric[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RUM_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Get RUM metrics summary.
 */
export function getRUMSummary(): {
  total: number;
  byMetric: Record<string, { good: number; needsImprovement: number; poor: number; avg: number }>;
} {
  const metrics = getRUMMetrics();
  const byMetric: Record<
    string,
    { good: number; needsImprovement: number; poor: number; avg: number }
  > = {};

  for (const m of metrics) {
    if (!byMetric[m.name]) {
      byMetric[m.name] = { good: 0, needsImprovement: 0, poor: 0, avg: 0 };
    }
    byMetric[m.name][m.rating === "needs-improvement" ? "needsImprovement" : m.rating]++;
    byMetric[m.name].avg += m.value;
  }

  for (const name of Object.keys(byMetric)) {
    const count = byMetric[name].good + byMetric[name].needsImprovement + byMetric[name].poor;
    byMetric[name].avg = Math.round(byMetric[name].avg / count);
  }

  return { total: metrics.length, byMetric };
}

/**
 * Clear all RUM metrics.
 */
export function clearRUMMetrics(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(RUM_KEY);
}
