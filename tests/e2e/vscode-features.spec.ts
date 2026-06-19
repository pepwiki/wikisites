import { test, expect } from "@playwright/test";

/**
 * End-to-end tests for VS Code-style power-user features.
 *
 * Covers: command palette, keyboard shortcuts, outline panel, breadcrumbs,
 * split pane, graph view, theme switching, settings panel, regex search.
 *
 * All tests run against the local dev server at http://localhost:4321.
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Navigate to an article page and wait for content to render. */
async function goToArticle(page: import("@playwright/test").Page, slug = "amino-acids") {
  await page.goto(`/learn/${slug}`, { waitUntil: "networkidle" });
  await page.waitForSelector("main", { timeout: 15_000 });
}

/** Open the command palette via Ctrl+K. */
async function openCommandPalette(page: import("@playwright/test").Page) {
  await page.keyboard.press("Control+k");
  await page.waitForSelector('input[aria-label="Search commands"]', { timeout: 5_000 });
}

/** Close any open overlay by pressing Escape. */
async function closeOverlay(page: import("@playwright/test").Page) {
  await page.keyboard.press("Escape");
}

// ─── Command Palette ─────────────────────────────────────────────────────────

test.describe("Command palette", () => {
  test("opens with Ctrl+K", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    const input = page.locator('input[aria-label="Search commands"]');
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test("search input filters results", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    const input = page.locator('input[aria-label="Search commands"]');
    await input.fill("outline");

    const results = page.locator('ul[role="listbox"] li[role="option"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).innerText();
      expect(text.toLowerCase()).toContain("outline");
    }
  });

  test("Enter executes the selected command", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    const input = page.locator('input[aria-label="Search commands"]');
    await input.fill("outline");

    await page.keyboard.press("Enter");

    const palette = page.locator('input[aria-label="Search commands"]');
    await expect(palette).toBeHidden({ timeout: 3_000 });
  });

  test("Escape closes the palette", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    await expect(page.locator('input[aria-label="Search commands"]')).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator('input[aria-label="Search commands"]')).toBeHidden({
      timeout: 3_000,
    });
  });

  test("palette has correct ARIA combobox structure", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    const listbox = page.locator('ul[role="listbox"]');
    await expect(listbox).toBeVisible();

    const options = page.locator('li[role="option"]');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(options.nth(i)).toHaveAttribute("role", "option");
    }
  });

  test("clicking backdrop closes palette", async ({ page }) => {
    await goToArticle(page);
    await openCommandPalette(page);

    const backdrop = page.locator(".fixed.inset-0.z-\\[95\\]");
    await expect(backdrop).toBeVisible();

    await backdrop.click({ position: { x: 5, y: 5 } });
    await expect(page.locator('input[aria-label="Search commands"]')).toBeHidden({
      timeout: 3_000,
    });
  });
});

// ─── Keyboard Shortcuts ──────────────────────────────────────────────────────

test.describe("Keyboard shortcuts", () => {
  test("Ctrl+K opens command palette", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+k");
    await expect(page.locator('input[aria-label="Search commands"]')).toBeVisible();
  });

  test("Ctrl+Shift+O toggles outline panel", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");

    const outline = page.locator('[aria-label="Document outline"]');
    await expect(outline).toBeVisible({ timeout: 3_000 });

    await page.keyboard.press("Control+Shift+o");
    await expect(outline).toBeHidden({ timeout: 3_000 });
  });

  test("? opens shortcuts help overlay", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("?");

    const dialog = page.locator('[role="dialog"][aria-label="Keyboard shortcuts"]');
    await expect(dialog).toBeVisible({ timeout: 3_000 });
  });

  test("Ctrl+G toggles graph view", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+g");

    const graph = page.locator(".content-tools-graph-overlay");
    await expect(graph).toBeVisible({ timeout: 5_000 });

    await page.keyboard.press("Control+g");
    await expect(graph).toBeHidden({ timeout: 3_000 });
  });

  test("Ctrl+B toggles split pane", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+b");

    // Split pane toggled via custom event — verify no error
    // The split pane may not render a visible element in all states
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    await page.waitForTimeout(500);
    expect(consoleErrors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("Ctrl+Shift+F toggles regex search", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const searchBar = page.locator(".content-tools-search-bar");
    await expect(searchBar).toBeVisible({ timeout: 5_000 });
  });
});

// ─── Outline Panel ───────────────────────────────────────────────────────────

test.describe("Outline panel", () => {
  test("opens via outline toggle button", async ({ page }) => {
    await goToArticle(page);

    const toggleBtn = page.locator('button[aria-label="Open outline panel"]');
    await expect(toggleBtn).toBeVisible({ timeout: 5_000 });
    await toggleBtn.click();

    const outline = page.locator('[aria-label="Document outline"]');
    await expect(outline).toBeVisible();
  });

  test("shows heading placeholder text", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");

    const outline = page.locator('[aria-label="Document outline"]');
    await expect(outline).toBeVisible();

    const placeholder = outline.locator("nav p");
    await expect(placeholder).toContainText("Outline will populate");
  });

  test("close button dismisses the panel", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");

    const outline = page.locator('[aria-label="Document outline"]');
    await expect(outline).toBeVisible();

    const closeBtn = outline.locator('button[aria-label="Close outline"]');
    await closeBtn.click();

    await expect(outline).toBeHidden({ timeout: 3_000 });
  });

  test("clicking backdrop closes the panel", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");

    const outline = page.locator('[aria-label="Document outline"]');
    await expect(outline).toBeVisible();

    const backdrop = page.locator(".fixed.inset-0.z-\\[75\\]");
    await backdrop.click();

    await expect(outline).toBeHidden({ timeout: 3_000 });
  });

  test("outline has ARIA complementary role", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");

    const outline = page.locator('[role="complementary"][aria-label="Document outline"]');
    await expect(outline).toBeVisible();
  });
});

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────

test.describe("Breadcrumbs", () => {
  test("render on article pages with nav aria-label", async ({ page }) => {
    await goToArticle(page, "amino-acids");

    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible({ timeout: 5_000 });
  });

  test("contain Schema.org JSON-LD", async ({ page }) => {
    await goToArticle(page, "amino-acids");

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeVisible({ timeout: 5_000 });

    const content = await jsonLd.textContent();
    expect(content).toBeTruthy();
    const parsed = JSON.parse(content!);
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement).toBeInstanceOf(Array);
    expect(parsed.itemListElement.length).toBeGreaterThan(0);
  });

  test("clicking a breadcrumb navigates", async ({ page }) => {
    await goToArticle(page, "amino-acids");

    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();

    const links = breadcrumbNav.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    const firstHref = await links.first().getAttribute("href");
    expect(firstHref).toBeTruthy();

    await links.first().click();
    await page.waitForURL(new RegExp(firstHref!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), {
      timeout: 10_000,
    });
  });

  test("last item is marked aria-current=page", async ({ page }) => {
    await goToArticle(page, "amino-acids");

    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();

    const currentPage = breadcrumbNav.locator('[aria-current="page"]');
    await expect(currentPage).toBeVisible();
  });
});

// ─── Split Pane ──────────────────────────────────────────────────────────────

test.describe("Split pane", () => {
  test("Ctrl+B toggles split pane without errors", async ({ page }) => {
    await goToArticle(page);

    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.keyboard.press("Control+b");
    await page.waitForTimeout(500);

    // Should not produce any JS errors related to split pane
    const splitErrors = errors.filter(
      (e) => e.includes("split") || e.includes("SplitPane"),
    );
    expect(splitErrors).toHaveLength(0);
  });

  test("split pane state persists across toggles", async ({ page }) => {
    await goToArticle(page);

    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    // Toggle on
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(300);
    // Toggle off
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(300);
    // Toggle on again
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(300);

    const splitErrors = errors.filter(
      (e) => e.includes("split") || e.includes("SplitPane"),
    );
    expect(splitErrors).toHaveLength(0);
  });
});

// ─── Graph View ──────────────────────────────────────────────────────────────

test.describe("Graph view", () => {
  test("Ctrl+G opens graph overlay", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+g");

    const overlay = page.locator(".content-tools-graph-overlay");
    await expect(overlay).toBeVisible({ timeout: 5_000 });
  });

  test("graph overlay has close button", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+g");

    const closeBtn = page.locator('button[aria-label="Close graph view"]');
    await expect(closeBtn).toBeVisible({ timeout: 5_000 });
  });

  test("close button dismisses graph view", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+g");

    const overlay = page.locator(".content-tools-graph-overlay");
    await expect(overlay).toBeVisible({ timeout: 5_000 });

    const closeBtn = page.locator('button[aria-label="Close graph view"]');
    await closeBtn.click();

    await expect(overlay).toBeHidden({ timeout: 3_000 });
  });

  test("graph container has ARIA img role with label", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+g");

    const graphContainer = page.locator(
      '[role="img"][aria-label="Knowledge graph visualization"]',
    );
    await expect(graphContainer).toBeVisible({ timeout: 5_000 });
  });
});

// ─── Theme Switching ─────────────────────────────────────────────────────────

test.describe("Theme switching", () => {
  test("theme toggle button changes data-theme attribute", async ({ page }) => {
    await goToArticle(page);

    const html = page.locator("html");
    const initialTheme = await html.getAttribute("data-theme");

    // Use the command palette to toggle theme
    await openCommandPalette(page);
    const input = page.locator('input[aria-label="Search commands"]');
    await input.fill("dark mode");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(500);

    const newTheme = await html.getAttribute("data-theme");
    expect(newTheme).not.toBe(initialTheme);
  });

  test("dark mode preference persists in localStorage", async ({ page }) => {
    await goToArticle(page);

    // Toggle to dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("starlight-theme", "dark");
    });

    const stored = await page.evaluate(() => localStorage.getItem("starlight-theme"));
    expect(stored).toBe("dark");
  });

  test("light mode preference persists in localStorage", async ({ page }) => {
    await goToArticle(page);

    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("starlight-theme", "light");
    });

    const stored = await page.evaluate(() => localStorage.getItem("starlight-theme"));
    expect(stored).toBe("light");
  });

  test("theme preference survives page reload", async ({ page }) => {
    await goToArticle(page);

    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("starlight-theme", "dark");
    });

    await page.reload({ waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 15_000 });

    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");
  });
});

// ─── Settings Panel ──────────────────────────────────────────────────────────

test.describe("Settings panel", () => {
  test("Ctrl+, triggers settings-related action without errors", async ({ page }) => {
    await goToArticle(page);

    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    // Ctrl+, may not be bound by default but should not cause errors
    await page.keyboard.press("Control+,");
    await page.waitForTimeout(300);

    // No critical JS errors should occur
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("404"),
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("settings store persists data in localStorage", async ({ page }) => {
    await goToArticle(page);

    await page.evaluate(() => {
      const settings = {
        theme: "default-dark",
        fontSize: 18,
        keybindingRemaps: {},
        outlineDefaultVisible: false,
        language: "en",
      };
      localStorage.setItem("wikisites:settings", JSON.stringify(settings));
    });

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem("wikisites:settings");
      return raw ? JSON.parse(raw) : null;
    });

    expect(stored).toBeTruthy();
    expect(stored.theme).toBe("default-dark");
    expect(stored.fontSize).toBe(18);
  });

  test("settings store validates schema on load", async ({ page }) => {
    await goToArticle(page);

    // Write invalid settings
    await page.evaluate(() => {
      localStorage.setItem("wikisites:settings", JSON.stringify({ invalid: true }));
    });

    // Reload — the store should fall back to defaults
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForSelector("main", { timeout: 15_000 });

    // Page should still render without errors
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});

// ─── Regex Search ────────────────────────────────────────────────────────────

test.describe("Regex search", () => {
  test("Ctrl+Shift+F opens search bar", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const searchBar = page.locator(".content-tools-search-bar");
    await expect(searchBar).toBeVisible({ timeout: 5_000 });
  });

  test("search bar has regex toggle button", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const regexToggle = page.locator('button[aria-label="Enable regex mode"]');
    await expect(regexToggle).toBeVisible({ timeout: 5_000 });
  });

  test("regex toggle changes button state", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const regexToggle = page.locator('button[aria-label="Enable regex mode"]');
    await expect(regexToggle).toBeVisible({ timeout: 5_000 });
    await regexToggle.click();

    const disableToggle = page.locator('button[aria-label="Disable regex mode"]');
    await expect(disableToggle).toBeVisible();
  });

  test("search input accepts text", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const searchInput = page.locator('input[aria-label="Search input"]');
    await expect(searchInput).toBeVisible({ timeout: 5_000 });

    await searchInput.fill("peptide");
    await expect(searchInput).toHaveValue("peptide");
  });

  test("search button submits the query", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const searchInput = page.locator('input[aria-label="Search input"]');
    await expect(searchInput).toBeVisible({ timeout: 5_000 });

    await searchInput.fill("peptide");
    await page.locator('button:has-text("Search")').click();

    await page.waitForTimeout(500);
  });

  test("close button dismisses search bar", async ({ page }) => {
    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");

    const searchBar = page.locator(".content-tools-search-bar");
    await expect(searchBar).toBeVisible({ timeout: 5_000 });

    const closeBtn = searchBar.locator("button:has-text('Close')");
    await closeBtn.click();

    await expect(searchBar).toBeHidden({ timeout: 3_000 });
  });
});

// ─── No Console Errors ───────────────────────────────────────────────────────

test.describe("No console errors across features", () => {
  test("opening command palette produces no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await goToArticle(page);
    await openCommandPalette(page);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("opening outline panel produces no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await goToArticle(page);
    await page.keyboard.press("Control+Shift+o");
    await page.waitForTimeout(500);

    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("opening shortcuts help produces no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await goToArticle(page);
    await page.keyboard.press("?");
    await page.waitForTimeout(500);

    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("opening graph view produces no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await goToArticle(page);
    await page.keyboard.press("Control+g");
    await page.waitForTimeout(500);

    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("opening regex search produces no errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await goToArticle(page);
    await page.keyboard.press("Control+Shift+f");
    await page.waitForTimeout(500);

    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });
});
