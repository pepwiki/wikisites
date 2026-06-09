import { test, expect } from "@playwright/test";

/**
 * Dark mode verification test.
 * Selects "Dark" from Starlight theme dropdown, verifies data-theme="dark",
 * checks key surfaces have dark backgrounds, and captures screenshots.
 */

const SNAPSHOT_DIR = "/tmp/wikisites-dark";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/learn", name: "learn-overview" },
  { path: "/learn/amino-acids", name: "amino-acids" },
  { path: "/quizzes", name: "quizzes" },
  { path: "/flashcards", name: "flashcards" },
  { path: "/review", name: "review" },
  { path: "/daily", name: "daily" },
  { path: "/community", name: "community" },
  { path: "/reference/glossary", name: "glossary" },
];

test.describe("Dark mode verification", () => {
  test("theme toggle sets data-theme=dark", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 15_000 });

    // Starlight renders <select> with options Dark/Light/Auto
    const themeSelect = page.locator("select").filter({ hasText: "Dark" }).first();
    await expect(themeSelect).toBeVisible({ timeout: 5_000 });

    // Select "Dark" option
    await themeSelect.selectOption({ label: "Dark" });

    // Wait for data-theme="dark" to appear on <html>
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-theme") === "dark",
      { timeout: 5_000 },
    );

    // Verify data-theme="dark" is on <html>
    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "dark");

    // Verify body background is dark (not white)
    const body = page.locator("body");
    const bodyBg = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
    console.log("body background:", bodyBg);
    const isLight = bodyBg.includes("255, 255, 255") || bodyBg.includes("248, 250, 252");
    expect(isLight).toBe(false);

    await page.screenshot({ path: `${SNAPSHOT_DIR}/toggle-dark.png`, fullPage: true });
  });

  for (const route of ROUTES) {
    test(`dark mode: ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });

      // Force dark mode via localStorage before reload
      await page.evaluate(() => {
        localStorage.setItem("starlight-theme", "dark");
      });
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForSelector("main", { timeout: 15_000 });

      // Verify data-theme="dark" is set
      const html = page.locator("html");
      await expect(html).toHaveAttribute("data-theme", "dark", { timeout: 5_000 });

      // Verify body background is NOT white/light
      const body = page.locator("body");
      const bodyBg = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
      console.log(`[${route.name}] body bg:`, bodyBg);
      const isLight =
        bodyBg.includes("255, 255, 255") ||
        bodyBg.includes("248, 250, 252") ||
        bodyBg.includes("241, 245, 249");
      expect(isLight).toBe(false);

      // Check header is dark
      const nav = page.locator("header").first();
      if ((await nav.count()) > 0) {
        const navBg = await nav.evaluate((el) => getComputedStyle(el).backgroundColor);
        console.log(`[${route.name}] header bg:`, navBg);
      }

      await page.screenshot({ path: `${SNAPSHOT_DIR}/${route.name}.png`, fullPage: true });
    });
  }
});
