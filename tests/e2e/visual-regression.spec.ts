import { test, expect } from "@playwright/test";

/**
 * Visual regression baseline generation.
 * Run with: PLAYWRIGHT_BENCHMARK=true bunx playwright test tests/e2e/visual-regression.spec.ts --update-snapshots
 */

const WIKI_URL = "https://wikisites-wiki.pages.dev";
const ENCP_URL = "https://wikisites-encp.pages.dev";

const WIKI_ROUTES = [
  { path: "/", name: "wiki-home" },
  { path: "/learn", name: "wiki-learn" },
  { path: "/learn/amino-acids", name: "wiki-amino-acids" },
  { path: "/quizzes", name: "wiki-quizzes" },
  { path: "/flashcards", name: "wiki-flashcards" },
  { path: "/review", name: "wiki-review" },
  { path: "/daily", name: "wiki-daily" },
  { path: "/community", name: "wiki-community" },
  { path: "/reference/glossary", name: "wiki-glossary" },
];

const ENCP_ROUTES = [
  { path: "/", name: "encp-home" },
  { path: "/peptides", name: "encp-peptides" },
  { path: "/classification", name: "encp-classification" },
  { path: "/synthesis", name: "encp-synthesis" },
  { path: "/pharmacology", name: "encp-pharmacology" },
  { path: "/glossary", name: "encp-glossary" },
];

const SCREENSHOT_OPTS = {
  fullPage: true,
  maxDiffPixelRatio: 0.01,
  animations: "disabled" as const,
  timeout: 15_000,
};

test.describe("Wiki visual regression - light", () => {
  for (const route of WIKI_ROUTES) {
    test(`light: ${route.name}`, async ({ page }) => {
      await page.goto(`${WIKI_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await expect(page).toHaveScreenshot(`${route.name}-light.png`, SCREENSHOT_OPTS);
    });
  }
});

test.describe("Wiki visual regression - dark", () => {
  for (const route of WIKI_ROUTES) {
    test(`dark: ${route.name}`, async ({ page }) => {
      await page.goto(`${WIKI_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await page.evaluate(() => localStorage.setItem("starlight-theme", "dark"));
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await expect(page).toHaveScreenshot(`${route.name}-dark.png`, SCREENSHOT_OPTS);
    });
  }
});

test.describe("ENCP visual regression - light", () => {
  for (const route of ENCP_ROUTES) {
    test(`light: ${route.name}`, async ({ page }) => {
      await page.goto(`${ENCP_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await expect(page).toHaveScreenshot(`encp-${route.name}-light.png`, SCREENSHOT_OPTS);
    });
  }
});

test.describe("ENCP visual regression - dark", () => {
  for (const route of ENCP_ROUTES) {
    test(`dark: ${route.name}`, async ({ page }) => {
      await page.goto(`${ENCP_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await page.evaluate(() => localStorage.setItem("encp-theme", "dark"));
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await expect(page).toHaveScreenshot(`encp-${route.name}-dark.png`, SCREENSHOT_OPTS);
    });
  }
});
