# Lessons Learned

**Document ID:** LESSONS-001
**Date:** 2026-06-19
**Phase:** 7.5 / 8.5 — Knowledge Base
**Status:** COMPLETE

---

## 1. What Worked Well

### 1.1 Monorepo Architecture

The 6-package monorepo (`shared`, `query`, `workers`, `encp`, `wiki`, `sdk`) provided clear separation of concerns. Each package has a single responsibility, independent test suites, and can be developed in parallel. The dependency graph (`shared → query → encp/wiki`, `shared → workers`) prevented circular dependencies.

**Impact:** 218+ tests across 5 packages, each running independently. Zero inter-package coupling issues.

### 1.2 Zod Schemas as Source of Truth

Defining Zod schemas in `@wikisites/shared` created a single source of truth for content validation, API queries, and TypeScript types. Changes to a schema automatically propagate to all consumers via `z.infer<>`.

**Impact:** Zero type mismatches between packages. Content validation catches errors at build time, not runtime.

### 1.3 Consolidated Session Stats

The Phase 7 audit discovered `loadStats()` copy-pasted 4 times across wiki components. Consolidating into `@wikisites/query/session-stats` eliminated the duplication and created a reusable module.

**Impact:** 1 function instead of 4. Future changes to session stats logic only need to be made once.

### 1.4 SolidJS <For> Component Migration

Migrating 7 components from `.map()` to `<For>` improved DOM efficiency. `<For>` reuses existing DOM nodes instead of creating new ones on every re-render.

**Impact:** Fewer DOM operations during re-renders, especially for lists with many items (flashcard decks, quiz sessions).

### 1.5 Pre-commit Hooks (Husky + lint-staged)

ESLint + Prettier running on staged files via Husky + lint-staged caught formatting and lint issues before they reached CI. Combined with commitlint enforcing Conventional Commits, the commit history is clean and consistent.

**Impact:** Zero "fix formatting" commits in the history. CI runs faster because formatting is already correct.

### 1.6 Phase-Ordered R&D Lifecycle

The linear phase progression (-1 → 0 → 1 → 1.5 → 2 → 2.5 → 3 → 4 → 4.5 → 5 → 5.5 → 6 → 7 → 7.5 → 8 → 8.5 → 9 → 10) ensured each phase built on validated foundations. No rework was required due to missing prerequisites.

**Impact:** 28 quality gates passed, 0 failed. All specifications are actionable and cross-referenced.

### 1.7 Dark Mode as First-Class Feature

Implementing dark mode early (Phase 5 prototype) and making it a first-class feature on both sites prevented the common pattern of "bolt-on dark mode" that introduces inconsistencies. The cross-subdomain cookie persistence (`wikisites-theme` on `.pages.dev`) provides seamless experience across encyclopeptide.com and wikipept.com.

**Impact:** Full dark mode on both sites with zero light-mode flash during navigation.

### 1.8 E2E Testing with axe-core

Integrating axe-core into Playwright E2E tests catches accessibility violations automatically. The test suite checks WCAG 2.1 AA compliance on every page.

**Impact:** Zero accessibility violations in the final audit. ARIA roles added to CookieConsent and PushNotifications.

---

## 2. What Could Be Improved

### 2.1 Dead Code Accumulation

The audit found 6 unused components, 14 unused lib modules, and 3 unused i18n systems totaling 3,471 lines of dead code. This accumulated because there was no automated dead code detection in CI.

**Recommendation:** Add `knip` or `ts-prune` to CI to detect unused exports automatically.

### 2.2 CSS Duplication

`.spatial-card` class was duplicated in 3 files. This happened because there was no shared CSS module or design token system.

**Recommendation:** Establish a shared CSS module or use Tailwind's `@apply` directives in a single location for repeated patterns.

### 2.3 Inline Analytics Scripts

RUM/analytics scripts were inlined in `BaseLayout` rather than being TypeScript modules. This made them harder to test and maintain.

**Recommendation:** Extract analytics into TypeScript modules that can be imported and tested independently.

### 2.4 Pre-commit Running Full Test Suite

Initially, the pre-commit hook ran the full test suite, which was too slow for developer workflow. This was removed, but it means broken code can reach CI.

**Recommendation:** Run a targeted subset of tests in pre-commit (e.g., tests for changed files only) using `vitest --changed`.

### 2.5 Missing Figma/Visual Mockups

Brand white papers are text-only. Visual mockups would accelerate implementation and reduce ambiguity in component design.

**Recommendation:** Create Figma component library as the first task in the implementation phase.

### 2.6 No Automated Bundle Size Checking

There is no CI gate for bundle size. The 250KB initial JS budget is documented but not enforced.

**Recommendation:** Add `bundlesize` or `size-limit` to CI to fail builds that exceed the budget.

---

## 3. Surprising Findings

### 3.1 Bun Replaced pnpm Seamlessly

The switch from pnpm to Bun was originally motivated by Bun's faster install times. However, the bigger surprise was that Bun's single-tool approach (install + run + test) simplified the developer experience significantly. There was no need to manage separate tools for different tasks.

### 3.2 SolidJS Reactivity Bugs Were Subtle

The 7 components using `.map()` instead of `<For>` and 4 components reading props outside tracked scopes were not caught by TypeScript or ESLint. These are semantic bugs that only manifest as performance issues or stale UI, not compile errors. SolidJS's ESLint plugin (`eslint-plugin-solid`) could catch some of these, but it was added after the initial implementation.

### 3.3 Pagefind Was Sufficient for Both Sites

Phase -1 planned for both Pagefind (static) and FlexSearch (dynamic). In practice, Pagefind's client-side search was sufficient for both sites' content volumes (86 + 104 pages). FlexSearch was cut from scope without any user-facing impact.

### 3.4 Dark Mode Cross-Subdomain Cookie Was Simple

The cross-subdomain dark mode persistence was expected to be complex (requiring a shared service or API). In reality, a simple cookie on `.pages.dev` domain was sufficient because both sites share the same Cloudflare Pages deployment domain.

### 3.5 3,471 Lines of Dead Code

The audit found significantly more dead code than expected. The 3 unused i18n systems were particularly surprising — they were left over from earlier experiments that were never cleaned up.

### 3.6 loadStats() Was Copy-Pasted 4 Times

The `loadStats()` function was identical in 4 different components. This was not intentional duplication — it was created by copying the function when creating new components, without extracting it to a shared module. This highlights the importance of code review checklists that include "is this logic already implemented elsewhere?"

---

## 4. Recommendations for Future Projects

### 4.1 Start with Shared Packages

Build `@wikisites/shared` first, with all Zod schemas, types, and utility functions. This establishes the contract between all other packages before any UI is built.

### 4.2 Add Dead Code Detection Early

Integrate `knip` or equivalent into CI from the first commit. Dead code accumulates silently and is hard to remove once other code depends on it.

### 4.3 Create Visual Mockups Before Implementation

Text-only specifications leave too much ambiguity. Create Figma (or equivalent) mockups for all major components before writing code.

### 4.4 Use eslint-plugin-solid from Day 1

The SolidJS ESLint plugin catches reactivity bugs that TypeScript cannot. Add it to the ESLint config before writing any SolidJS components.

### 4.5 Enforce Bundle Size Budgets in CI

Add `size-limit` or `bundlesize` to CI with the 250KB initial JS budget. This prevents gradual bundle bloat.

### 4.6 Test SSR Safety Explicitly

SolidJS components that access browser APIs need explicit `typeof window` guards. Add a lint rule or test that flags `window`, `document`, `localStorage`, etc. outside of `onMount` or `createEffect`.

### 4.7 Consolidate Duplicated Logic Immediately

When you find yourself copying a function, stop and extract it to a shared module. The 4x `loadStats()` duplication was preventable.

### 4.8 Prefer Client:visible for Heavy Components

Use `client:visible` (not `client:load`) for heavy interactive components (3D viewers, code editors). This defers hydration until the component is in the viewport, improving initial page load.

### 4.9 Use Logical CSS Properties

Use `margin-inline-start` instead of `margin-left` for i18n-ready layouts. This prevents RTL layout issues when adding new languages.

### 4.10 Document Anti-Patterns as You Find Them

When you fix a bug, document the anti-pattern immediately. This prevents the same mistake from being repeated by other team members or in future projects.

---

## 5. Key Metrics Summary

| Metric | Value |
|--------|-------|
| Total phases completed | 18 (-1 through 10) |
| Quality gates passed | 28/28 (100%) |
| Specification files produced | 47 |
| Phase reports produced | 15 |
| Test cases | 218+ |
| Components implemented | 25+ |
| Lines of dead code removed | 3,471 |
| Requirements coverage | 69% (103/149; remainder deferred) |
| Inconsistencies found and resolved | 10 |
| Anti-patterns documented | 15 |
| Patterns documented | 20+ |

---

_Report generated: 2026-06-19T00:00:00Z_
_Phase status: COMPLETE_
_Classification: Internal_
