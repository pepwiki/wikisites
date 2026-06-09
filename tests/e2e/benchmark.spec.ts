import { test } from "@playwright/test";

/**
 * Performance benchmark for wikisites.
 * Measures key web vitals on both live sites.
 */

const SITES = [
  { name: "wiki", url: "https://wikisites-wiki.pages.dev" },
  { name: "encp", url: "https://wikisites-encp.pages.dev" },
];

const ROUTES = ["/", "/learn", "/peptides", "/quizzes", "/glossary"];

test.describe("Performance benchmarks", () => {
  for (const site of SITES) {
    for (const route of ROUTES) {
      test(`${site.name}: ${route}`, async ({ page }) => {
        const url = `${site.url}${route}`;

        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle");

        const metrics = await page.evaluate(() => {
          const perf = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
          return {
            ttfb: Math.round(perf.responseStart - perf.requestStart),
            domContentLoaded: Math.round(perf.domContentLoadedEventEnd - perf.fetchStart),
            fullLoad: Math.round(perf.loadEventEnd - perf.fetchStart),
            transferSize: perf.transferSize,
            encodedBodySize: perf.encodedBodySize,
            decodedBodySize: perf.decodedBodySize,
          };
        });

        // Log metrics for CI reporting
        // eslint-disable-next-line no-console
        console.log(
          `BENCHMARK ${site.name}${route}: ttfb=${metrics.ttfb} dcl=${metrics.domContentLoaded} load=${metrics.fullLoad} size=${metrics.transferSize} ratio=${(metrics.decodedBodySize / metrics.encodedBodySize).toFixed(1)}x`,
        );

        // Soft assertions -- log warnings instead of failing
        if (metrics.ttfb > 1000) {
          console.warn(`TTFB ${metrics.ttfb}ms exceeds 1s threshold`);
        }
        if (metrics.fullLoad > 5000) {
          console.warn(`Full load ${metrics.fullLoad}ms exceeds 5s threshold`);
        }
      });
    }
  }
});
