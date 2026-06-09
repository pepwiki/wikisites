import { test, expect } from "@playwright/test";

/**
 * GUI traversal + dark mode verification.
 * Navigates to all wiki routes in both light and dark mode,
 * captures screenshots, and verifies dark mode correctness.
 */

const SNAPSHOT_DIR = "/tmp/wikisites-snapshots";

const WIKI_ROUTES = [
  { path: "/", name: "wiki-home" },
  { path: "/learn", name: "wiki-learn-overview" },
  { path: "/learn/amino-acids", name: "wiki-amino-acids" },
  { path: "/learn/peptide-bonds", name: "wiki-peptide-bonds" },
  { path: "/learn/structure", name: "wiki-structure" },
  { path: "/learn/signaling", name: "wiki-signaling" },
  { path: "/learn/receptors", name: "wiki-receptors" },
  { path: "/learn/pharmacology", name: "wiki-pharmacology" },
  { path: "/learn/spps", name: "wiki-spps" },
  { path: "/learn/purification", name: "wiki-purification" },
  { path: "/learn/computational", name: "wiki-computational" },
  { path: "/learn/drug-delivery", name: "wiki-drug-delivery" },
  { path: "/learn/clinical-trials", name: "wiki-clinical-trials" },
  { path: "/learn/regulatory", name: "wiki-regulatory" },
  { path: "/reference/peptides", name: "wiki-reference-peptides" },
  { path: "/reference/glossary", name: "wiki-reference-glossary" },
  { path: "/community", name: "wiki-community" },
  { path: "/quizzes", name: "wiki-quizzes" },
  { path: "/flashcards", name: "wiki-flashcards" },
  { path: "/review", name: "wiki-review" },
  { path: "/daily", name: "wiki-daily" },
];

// ENCP routes require a separate server on port 4322
const ENCP_ROUTES = [
  { path: "/", name: "encp-home" },
  { path: "/peptides", name: "encp-peptides" },
  { path: "/classification", name: "encp-classification" },
  { path: "/synthesis", name: "encp-synthesis" },
  { path: "/pharmacology", name: "encp-pharmacology" },
  { path: "/glossary", name: "encp-glossary" },
  { path: "/articles/glutathione", name: "encp-article-glutathione" },
  { path: "/articles/oxytocin", name: "encp-article-oxytocin" },
];

test.describe("Wiki light mode traversal", () => {
  for (const route of WIKI_ROUTES) {
    test(`light: ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      await page
        .waitForSelector("[data-pagefind-body] main, main", { timeout: 15_000 })
        .catch(() => {});

      const title = await page.title();
      expect(title).toBeTruthy();

      await page.screenshot({
        path: `${SNAPSHOT_DIR}/light/${route.name}.png`,
        fullPage: true,
      });
    });
  }
});

test.describe("Wiki dark mode verification", () => {
  test("theme toggle sets data-theme=dark", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 15_000 });

    const themeSelect = page.locator("select").filter({ hasText: "Dark" }).first();
    await expect(themeSelect).toBeVisible({ timeout: 5_000 });

    await themeSelect.selectOption({ label: "Dark" });

    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-theme") === "dark",
      { timeout: 5_000 },
    );

    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "dark");

    const body = page.locator("body");
    const bodyBg = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
    console.log("body background:", bodyBg);
    const isLight = bodyBg.includes("255, 255, 255") || bodyBg.includes("248, 250, 252");
    expect(isLight).toBe(false);

    await page.screenshot({ path: `${SNAPSHOT_DIR}/dark/toggle-dark.png`, fullPage: true });
  });

  for (const route of WIKI_ROUTES) {
    test(`dark: ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });

      await page.evaluate(() => {
        localStorage.setItem("starlight-theme", "dark");
      });
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });

      const html = page.locator("html");
      await expect(html).toHaveAttribute("data-theme", "dark", { timeout: 5_000 });

      const body = page.locator("body");
      const bodyBg = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
      console.log(`[${route.name}] body bg:`, bodyBg);
      const isLight =
        bodyBg.includes("255, 255, 255") ||
        bodyBg.includes("248, 250, 252") ||
        bodyBg.includes("241, 245, 249");
      expect(isLight).toBe(false);

      const nav = page.locator("header").first();
      if ((await nav.count()) > 0) {
        const navBg = await nav.evaluate((el) => getComputedStyle(el).backgroundColor);
        console.log(`[${route.name}] header bg:`, navBg);
      }

      await page.screenshot({
        path: `${SNAPSHOT_DIR}/dark/${route.name}.png`,
        fullPage: true,
      });
    });
  }
});

test.describe("ENCP GUI traversal", () => {
  test.describe.configure({ timeout: 60_000 });

  for (const route of ENCP_ROUTES) {
    test(`encp: ${route.name}`, async ({ page }) => {
      try {
        await page.goto(`http://localhost:4322${route.path}`, {
          waitUntil: "networkidle",
          timeout: 10_000,
        });
      } catch {
        test.skip(true, "ENCP dev server not running on port 4322");
        return;
      }

      await page.screenshot({
        path: `${SNAPSHOT_DIR}/encp/${route.name}.png`,
        fullPage: true,
      });

      const title = await page.title();
      expect(title).toBeTruthy();
    });
  }
});
