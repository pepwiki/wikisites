import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility audit using axe-core.
 * Tests all routes in both light and dark mode for WCAG 2.1 AA compliance.
 */

const WIKI_URL = "https://wikisites-wiki.pages.dev";
const ENCP_URL = "https://wikisites-encp.pages.dev";

const WIKI_ROUTES = [
  { path: "/", name: "wiki-home" },
  { path: "/learn", name: "wiki-learn" },
  { path: "/quizzes", name: "wiki-quizzes" },
  { path: "/flashcards", name: "wiki-flashcards" },
  { path: "/review", name: "wiki-review" },
  { path: "/community", name: "wiki-community" },
  { path: "/reference/glossary", name: "wiki-glossary" },
];

const ENCP_ROUTES = [
  { path: "/", name: "encp-home" },
  { path: "/peptides", name: "encp-peptides" },
  { path: "/classification", name: "encp-classification" },
  { path: "/glossary", name: "encp-glossary" },
];

test.describe("Wiki accessibility - light mode", () => {
  for (const route of WIKI_ROUTES) {
    test(`a11y: ${route.name}`, async ({ page }) => {
      await page.goto(`${WIKI_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      // Log violations for debugging
      if (results.violations.length > 0) {
        console.log(`\n[${route.name}] ${results.violations.length} violations:`);
        for (const v of results.violations) {
          console.log(`  - ${v.id}: ${v.description} (${v.impact})`);
          for (const node of v.nodes.slice(0, 3)) {
            console.log(`    ${node.html.substring(0, 100)}`);
          }
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("Wiki accessibility - dark mode", () => {
  for (const route of WIKI_ROUTES) {
    test(`a11y dark: ${route.name}`, async ({ page }) => {
      await page.goto(`${WIKI_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await page.evaluate(() => localStorage.setItem("starlight-theme", "dark"));
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`\n[${route.name} dark] ${results.violations.length} violations:`);
        for (const v of results.violations) {
          console.log(`  - ${v.id}: ${v.description} (${v.impact})`);
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("ENCP accessibility - light mode", () => {
  for (const route of ENCP_ROUTES) {
    test(`a11y: ${route.name}`, async ({ page }) => {
      await page.goto(`${ENCP_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`\n[encp-${route.name}] ${results.violations.length} violations:`);
        for (const v of results.violations) {
          console.log(`  - ${v.id}: ${v.description} (${v.impact})`);
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("ENCP accessibility - dark mode", () => {
  for (const route of ENCP_ROUTES) {
    test(`a11y dark: ${route.name}`, async ({ page }) => {
      await page.goto(`${ENCP_URL}${route.path}`, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});
      await page.evaluate(() => localStorage.setItem("encp-theme", "dark"));
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 }).catch(() => {});

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`\n[encp-${route.name} dark] ${results.violations.length} violations:`);
        for (const v of results.violations) {
          console.log(`  - ${v.id}: ${v.description} (${v.impact})`);
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});
