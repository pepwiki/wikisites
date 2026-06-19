# Test Automation Strategy

## Purpose

Define a comprehensive testing strategy for wikisites covering all P0-P4 features, ensuring quality through automated unit, integration, E2E, security, performance, accessibility, and visual regression tests.

---

## 1. Test Pyramid

```
                    ┌───────────┐
                    │   E2E     │  ~15 tests (Playwright)
                    │  (slow)   │  Full user journeys
                   ┌┴───────────┴┐
                   │ Integration  │  ~40 tests (Vitest + jsdom)
                   │  (medium)    │  Component + API interactions
                  ┌┴──────────────┴┐
                  │   Unit Tests    │  ~160 tests (Vitest)
                  │    (fast)       │  Pure functions, utilities, stores
                  └─────────────────┘
```

**Target:** ~215+ total tests, 80% coverage on all packages.

---

## 2. Unit Tests (Vitest)

### 2.1 Framework and Configuration

- **Runner:** Vitest 3.x with `vite-plugin-solid` for SolidJS JSX transform
- **Environment:** Node (default), jsdom (for DOM-dependent tests via `@vitest-environment jsdom`)
- **Pool:** `forks` with `singleFork: true` (matches current `vitest.config.ts`)
- **Coverage:** V8 provider, thresholds: lines/branches/functions/statements >= 80%

### 2.2 Existing Unit Tests (24 files, 218+ tests)

| Package | Test Files | Coverage Area |
|---------|-----------|---------------|
| `@wikisites/shared` | 4 | i18n, citations, oligopeptide utils, content validation |
| `@wikisites/query` | 5 | FSRS v4, search engine, review store, session stats, card status |
| `@wikisites/workers` | 3 | Worker handler, security headers, rate limiting |
| `@wikisites/encp` | 1 | MW calculator |
| `@wikisites/wiki` | 10 | Adaptive difficulty, score tracker, flip card, daily challenge, toast, formatTime, LanguageSwitcher, RatingButtons, responsive |

### 2.3 New Unit Tests for P0-P4 Features

| Feature | Package | Test File | What to Test |
|---------|---------|-----------|-------------|
| **P0: Command Palette** | wiki | `CommandPalette.test.tsx` | Search filtering, keyboard navigation, command execution, empty state, loading state |
| **P0: Keyboard Shortcuts** | wiki | `KeyboardShortcuts.test.ts` | Shortcut registration, conflict detection, modifier keys, prevent default, cleanup on unmount |
| **P0: Outline Panel** | wiki | `OutlinePanel.test.tsx` | Heading extraction, scroll sync, active section highlight, collapse/expand, empty state |
| **P0: Breadcrumbs** | wiki | `Breadcrumbs.test.tsx` | Path generation, truncation for deep paths, current page highlight, aria-label |
| **P1: KaTeX** | wiki | `KaTeXRenderer.test.tsx` | LaTeX parsing, display mode, inline mode, error handling, accessibility (aria-label) |
| **P1: Force Graph** | wiki | `ForceGraph.test.tsx` | Graph data normalization, node/edge rendering, zoom controls, WebGL fallback |
| **P1: Split Pane** | wiki | `SplitPane.test.tsx` | Drag resize, min/max constraints, keyboard resize, localStorage persistence, responsive collapse |
| **P1: Regex Search** | query | `RegexSearch.test.ts` | Pattern compilation, match highlighting, case sensitivity, Unicode support, invalid pattern handling |
| **P2: Giscus** | wiki | `Giscus.test.tsx` | Config validation, theme sync, loading state, error fallback, category mapping |
| **P2: Annotations** | query | `AnnotationStore.test.ts` | CRUD operations, range selection, highlight persistence, conflict resolution |
| **P2: User Accounts** | workers | `AuthHandler.test.ts` | JWT validation, role checking, session refresh, logout cleanup |
| **P3: TipTap Editor** | wiki | `TipTapEditor.test.tsx` | Document loading, save, undo/redo, toolbar state, markdown export |
| **P3: Version History** | query | `VersionHistory.test.ts` | Diff generation, version list, restore, conflict detection |
| **P4: Plugin API** | sdk | `PluginAPI.test.ts` | Plugin registration, lifecycle hooks, hook execution order, error isolation |
| **P4: Themes** | shared | `ThemeManager.test.ts` | Theme switching, CSS variable generation, system preference detection, persistence |
| **P4: Settings** | wiki | `SettingsStore.test.ts` | Settings load/save, defaults, schema validation, migration |

### 2.4 Unit Test Conventions

```typescript
// Pattern: Arrange → Act → Assert
import { describe, it, expect } from "vitest";
import { CommandPalette } from "../components/CommandPalette";

describe("CommandPalette", () => {
  it("filters commands by query", () => {
    // Arrange
    const commands = [
      { id: "dark-mode", label: "Toggle Dark Mode", category: "Appearance" },
      { id: "search", label: "Open Search", category: "Navigation" },
    ];
    // Act
    const filtered = filterCommands(commands, "dark");
    // Assert
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("dark-mode");
  });
});
```

**Naming convention:** `<ComponentOrModule>.test.{ts,tsx}` in `packages/*/src/__tests__/`.

---

## 3. Integration Tests (Vitest + jsdom)

### 3.1 Scope

Integration tests verify that multiple components/modules work together correctly, focusing on:

- Astro page rendering with SolidJS islands
- Component composition (e.g., CommandPalette + KeyboardShortcuts + OutlinePanel)
- Store reactivity across components
- API endpoint + Worker handler integration

### 3.2 New Integration Tests

| Test | Components Involved | What to Verify |
|------|-------------------|---------------|
| **Command Palette + Shortcuts** | CommandPalette, KeyboardShortcuts | Cmd+K opens palette, Escape closes, arrow keys navigate |
| **Outline Panel + Scroll Sync** | OutlinePanel, page content | Heading extraction from rendered MDX, scroll position tracking |
| **Breadcrumbs + Routing** | Breadcrumbs, Astro routing | Correct path generation for nested pages, language prefix |
| **KaTeX + MDX** | KaTeX renderer, MDX pipeline | LaTeX blocks render correctly in articles, inline math works |
| **Split Pane + Search** | SplitPane, RegexSearch | Split view with search results in right pane |
| **Annotations + Editor** | AnnotationStore, TipTapEditor | Annotation created from editor selection, persisted correctly |
| **Version History + Editor** | VersionHistory, TipTapEditor | Edit creates version, diff shows changes, restore works |
| **Plugin API + Theme** | PluginAPI, ThemeManager | Plugin can register themes, theme switching works |
| **User Accounts + Annotations** | AuthHandler, AnnotationStore | Annotation tied to user, permissions enforced |

### 3.3 Integration Test Setup

```typescript
// vitest.integration.config.ts
import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ dev: true })],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["packages/*/src/__tests__/**/*.integration.test.{ts,tsx}"],
    testTimeout: 15_000,
  },
});
```

---

## 4. E2E Tests (Playwright)

### 4.1 Framework and Configuration

- **Runner:** Playwright 1.50+
- **Browsers:** Chromium (primary), Firefox, Mobile Chrome (Pixel 5)
- **Config:** `playwright.config.ts` — 30s timeout per test, 5s expect timeout, retries=2 on CI
- **Artifacts:** Screenshots (on failure), traces (on first retry), video (retain on failure)

### 4.2 Existing E2E Tests (5 files)

| Spec File | Tests | Coverage |
|-----------|-------|----------|
| `dark-mode.spec.ts` | Theme toggle, dark mode per route | All wiki routes in dark mode |
| `accessibility.spec.ts` | axe-core WCAG 2.1 AA | All wiki + encp routes, light + dark |
| `visual-regression.spec.ts` | Screenshot comparison | All routes, light + dark, both sites |
| `gui-traversal.spec.ts` | Full navigation traversal | All routes, dark mode verification |
| `benchmark.spec.ts` | Web Vitals measurement | Key routes on both sites |

### 4.3 New E2E Tests for P0-P4 Features

| Feature | Spec File | Test Scenarios |
|---------|-----------|---------------|
| **P0: Command Palette** | `command-palette.spec.ts` | Open via Cmd+K, search commands, execute command, keyboard navigation, close with Escape, works on all pages |
| **P0: Keyboard Shortcuts** | `keyboard-shortcuts.spec.ts` | Global shortcuts work, no conflicts with browser shortcuts, shortcuts list accessible, work in all focus states |
| **P0: Outline Panel** | `outline-panel.spec.ts` | Panel renders headings, click scrolls to section, active heading highlights on scroll, collapse/expand, responsive behavior |
| **P0: Breadcrumbs** | `breadcrumbs.spec.ts` | Breadcrumbs show correct path, click navigates, deep nesting truncates, works with i18n prefixes |
| **P1: KaTeX** | `katex.spec.ts` | Inline math renders, display math renders, error state for invalid LaTeX, print-friendly, accessible |
| **P1: Force Graph** | `force-graph.spec.ts` | Graph renders nodes/edges, click navigates, zoom/pan works, WebGL fallback on mobile, responsive sizing |
| **P1: Split Pane** | `split-pane.spec.ts` | Drag to resize, double-click resets, min/max enforced, responsive collapse, persistence across navigation |
| **P1: Regex Search** | `regex-search.spec.ts` | Regex input works, matches highlighted, case toggle, invalid pattern error, combined with normal search |
| **P2: Giscus** | `giscus.spec.ts` | Comments load, theme sync, login flow, new comment, error fallback |
| **P2: Annotations** | `annotations.spec.ts` | Select text to annotate, highlight persists, edit/delete annotation, permissions |
| **P2: User Accounts** | `user-accounts.spec.ts` | Login/logout, profile page, session persistence, role-based UI |
| **P3: TipTap Editor** | `tiptap-editor.spec.ts` | Create new page, edit content, save, undo/redo, markdown import/export, toolbar functions |
| **P3: Version History** | `version-history.spec.ts` | View version list, compare versions, restore version, visual diff |
| **P4: Plugin API** | `plugin-api.spec.ts` | Load plugin, register component, lifecycle hooks, disable/unload plugin |
| **P4: Themes** | `themes.spec.ts` | Theme gallery, apply theme, custom CSS variables, system preference fallback |
| **P4: Settings** | `settings.spec.ts` | Settings panel opens, toggle options, persist to localStorage, reset to defaults |

### 4.4 E2E Test Patterns

```typescript
// Pattern: Page Object Model for complex features
import { test, expect } from "@playwright/test";

test.describe("Command Palette", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("main", { timeout: 15_000 });
  });

  test("opens with Cmd+K", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    const palette = page.locator("[role='dialog'][aria-label='Command Palette']");
    await expect(palette).toBeVisible({ timeout: 3_000 });
  });

  test("filters commands by typing", async ({ page }) => {
    await page.keyboard.press("Meta+k");
    await page.keyboard.type("dark");
    const items = page.locator("[role='option']");
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText("Dark Mode");
  });
});
```

### 4.5 CI E2E Execution

- **PR:** Chromium only, skip benchmark tests
- **Main push:** Chromium + Firefox, include benchmarks
- **Nightly:** Full matrix (Chromium, Firefox, Mobile Chrome) + visual regression update

---

## 5. Security Tests

### 5.1 Dependency Scanning

| Tool | Scope | Frequency | Gate |
|------|-------|-----------|------|
| `audit-ci` | npm/bun dependencies | Every CI run | Moderate+ severity blocks deploy |
| `snyk test` | Known vulnerabilities | Every CI run | High+ severity blocks deploy |
| `gitleaks` | Secret detection in source | Every CI run | Any detection blocks deploy |

### 5.2 Static Application Security Testing (SAST)

| Check | Tool | What It Catches |
|-------|------|----------------|
| XSS prevention | ESLint `no-dangerously-set-inner-html` | Raw HTML injection |
| Input validation | Zod schema tests | Missing validation on API inputs |
| CSP compliance | Custom `check-csp.js` script | Missing or weak Content-Security-Policy headers |
| Cookie security | Custom tests | Missing HttpOnly/Secure/SameSite flags |

### 5.3 Runtime Security Tests

| Test | Target | What to Verify |
|------|--------|---------------|
| Rate limiting | Workers API | 429 after exceeding limit |
| CORS | Workers API | Cross-origin requests blocked/allowed correctly |
| JWT validation | Auth endpoints | Expired/invalid tokens rejected |
| SQL injection | D1 queries | Parameterized queries used, no string concatenation |
| Path traversal | File serving | No access to parent directories |

### 5.4 Security Test Schedule

- **Every commit:** `audit-ci`, `gitleaks`
- **Every PR:** Full security scan stage
- **Weekly:** Snyk full scan (catches newly disclosed CVEs)
- **Quarterly:** Manual penetration test checklist

---

## 6. Performance Tests

### 6.1 Lighthouse CI Budgets

| Metric | Target | Critical Threshold | Pages |
|--------|--------|-------------------|-------|
| Performance | >= 90 | < 70 blocks deploy | All |
| Accessibility | >= 95 | < 80 blocks deploy | All |
| Best Practices | >= 92 | < 80 blocks deploy | All |
| SEO | >= 95 | < 85 blocks deploy | All |
| TTFB | < 200ms | > 500ms blocks deploy | All |
| FCP | < 1.5s | > 3s blocks deploy | All |
| LCP | < 2.5s | > 4s blocks deploy | All |
| CLS | < 0.1 | > 0.25 blocks deploy | All |
| TTI | < 3.5s | > 5s blocks deploy | All |
| TBT | < 200ms | > 600ms blocks deploy | All |

### 6.2 Bundle Size Budgets

| Asset Type | Budget | Critical |
|-----------|--------|----------|
| Total JS (per page) | < 250 KB | > 400 KB |
| Total CSS (per page) | < 80 KB | > 150 KB |
| Total page weight | < 500 KB | > 1 MB |
| Individual chunk | < 100 KB | > 200 KB |

### 6.3 E2E Performance Benchmarks

| Metric | Target | Measured By |
|--------|--------|-------------|
| TTFB | < 200ms | `performance.navigation` API |
| DOM Content Loaded | < 1.5s | `performance.navigation` API |
| Full Load | < 3s | `performance.navigation` API |
| Transfer Size | < 500 KB | `performance.navigation` API |

### 6.4 Performance Test Execution

- **PR:** Bundle size check only (fast, blocks oversized PRs)
- **Main push:** Full Lighthouse CI audit
- **Nightly:** Benchmark tests on production URLs
- **Weekly:** Trend analysis of Lighthouse scores over time

---

## 7. Accessibility Tests

### 7.1 Automated (axe-core)

- **Tool:** `@axe-core/playwright` integrated into Playwright
- **Scope:** All routes on both sites, light + dark mode
- **Tags:** `wcag2a`, `wcag2aa`, `wcag21aa`
- **Gate:** Zero violations (strict)

### 7.2 Accessibility Test Matrix

| Route | Light | Dark | Mobile |
|-------|-------|------|--------|
| Wiki home | axe-core | axe-core | axe-core |
| Wiki learn/* | axe-core | axe-core | axe-core |
| Wiki quizzes | axe-core | axe-core | axe-core |
| Wiki flashcards | axe-core | axe-core | axe-core |
| ENCP home | axe-core | axe-core | axe-core |
| ENCP articles | axe-core | axe-core | axe-core |
| Command Palette (P0) | axe-core | axe-core | axe-core |
| Outline Panel (P0) | axe-core | axe-core | axe-core |
| Editor (P3) | axe-core | axe-core | axe-core |
| Settings (P4) | axe-core | axe-core | axe-core |

### 7.3 Manual Accessibility Checks (checklist)

- [ ] Keyboard-only navigation works for all interactive elements
- [ ] Screen reader announces dynamic content changes (aria-live)
- [ ] Focus order is logical in Command Palette
- [ ] Color contrast meets 4.5:1 for text, 3:1 for large text
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Reduced motion preference is respected (no animations when `prefers-reduced-motion: reduce`)

---

## 8. Visual Regression Tests

### 8.1 Framework

- **Tool:** Playwright `toHaveScreenshot()` with pixel comparison
- **Threshold:** `maxDiffPixelRatio: 0.01` (1% pixel difference tolerance)
- **Animations:** Disabled during screenshots
- **Full page:** Always full-page screenshots

### 8.2 Baseline Management

- **Generation:** `PLAYWRIGHT_BENCHMARK=true bunx playwright test --update-snapshots`
- **Storage:** `tests/e2e/visual-regression.spec.ts-snapshots/`
- **Update cadence:** After intentional visual changes, or weekly to absorb minor rendering differences

### 8.3 Visual Regression Coverage

| Feature | Light | Dark | Mobile |
|---------|-------|------|--------|
| All existing wiki routes | snapshot | snapshot | - |
| All existing encp routes | snapshot | snapshot | - |
| P0: Command Palette open state | snapshot | snapshot | snapshot |
| P0: Outline Panel expanded | snapshot | snapshot | - |
| P1: KaTeX rendered equations | snapshot | snapshot | - |
| P1: Force Graph rendered | snapshot | snapshot | - |
| P2: Giscus loaded | snapshot | snapshot | - |
| P3: TipTap Editor with content | snapshot | snapshot | - |
| P4: Theme gallery | snapshot | snapshot | - |
| P4: Settings panel | snapshot | snapshot | - |

---

## 9. Test Data Management

### 9.1 Fixtures

- **Unit tests:** Inline mock data, factory functions
- **Integration tests:** Mock API responses, fake stores
- **E2E tests:** Production-like content on preview deployments

### 9.2 Mocking Strategy

| Layer | Mocking Approach |
|-------|-----------------|
| API (Workers) | Vitest `vi.fn()` for handler functions |
| D1/KV | In-memory stores or `miniflare` for integration |
| External APIs (Giscus) | MSW or Playwright route interception |
| Browser APIs (localStorage) | `jsdom` in Vitest, real in Playwright |
| WebGL (Force Graph) | Canvas mock or skip rendering in unit tests |

---

## 10. Test Reporting

### 10.1 CI Artifacts

| Artifact | Retention | Content |
|----------|-----------|---------|
| Coverage HTML | 7 days | `coverage/` directory |
| Playwright HTML | 7 days | `playwright-report/` |
| Playwright traces | 7 days | `test-results/**/*.zip` |
| Screenshots | 14 days | `test-results/**/*.png` |
| Lighthouse reports | 30 days | `.lighthouseci/` |
| JUnit XML | 7 days | `test-results/junit.xml` |

### 10.2 Quality Gate Summary

| Gate | Threshold | Action on Failure |
|------|-----------|-------------------|
| ESLint errors | 0 | Block all |
| ESLint warnings | 0 | Block all |
| TypeScript errors | 0 | Block all |
| Unit test failures | 0 | Block all |
| Coverage (all metrics) | >= 80% | Block all |
| Integration test failures | 0 | Block all |
| Security vulnerabilities (high+) | 0 | Block all |
| E2E test failures | 0 | Block all |
| Lighthouse performance | >= 85 | Warn (block if < 70) |
| Lighthouse accessibility | >= 90 | Warn (block if < 80) |
| Bundle size | < 250 KB JS/page | Block all |
| Visual regression | 0 unexpected diffs | Block all |

---

## 11. Test Execution Commands

```bash
# Unit tests
bun run test              # Run all unit tests
bun run test:watch        # Watch mode
bun run test:coverage     # With coverage report

# E2E tests
bun run test:e2e          # All E2E tests
bunx playwright test tests/e2e/command-palette.spec.ts  # Specific feature
PLAYWRIGHT_BENCHMARK=true bunx playwright test tests/e2e/benchmark.spec.ts

# Security
bunx audit-ci --moderate  # Dependency audit
bunx gitleaks detect      # Secret scanning

# Performance
bunx @lhci/cli autorun    # Lighthouse CI

# Combined (used in CI)
bun run test:ci           # vitest coverage + playwright test
bun run check             # typecheck + lint + format:check + test
```

---

## 12. Test Maintenance

| Task | Frequency | Owner |
|------|-----------|-------|
| Update visual regression baselines | After visual changes | Developer |
| Review coverage reports | Weekly | Team |
| Update Playwright browsers | Monthly | CI automation |
| Review and triage flaky tests | Weekly | Team |
| Update Lighthouse budgets | Quarterly | Team |
| Security scan review | Weekly | Maintainer |
