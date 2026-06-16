# Frontend & GUI Refactor Analysis

**Date:** 2026-06-16
**Scope:** Full-stack GUI refactor for wikisites monorepo (encp + wiki packages)
**Current Stack:** Astro 5.x + SolidJS 1.9.x + Tailwind CSS v4.3 + Bun + Vite

---

## 1. Current State Assessment

### What Works Well (Keep)
- **Astro + SolidJS island architecture** — correct choice for content-heavy static sites with selective interactivity
- **Tailwind CSS v4** — modern, fast, CSS-first config. No migration needed.
- **Vite via Astro** — optimal build tool. No migration needed.
- **Bun** — fast package manager. No migration needed.
- **Vitest + Playwright** — solid testing foundation. No migration needed.
- **Starlight** — excellent for wiki documentation. No migration needed.
- **Pagefind** — client-side search works well. No migration needed.
- **Accessibility infrastructure** — a11y.ts, focus management, skip links, ARIA. Strong foundation.

### What Needs Migration

| Problem | Severity | Root Cause |
|---------|----------|------------|
| **ESLint hangs on TSX files** | High | typescript-eslint overhead on large Astro/Solid projects |
| **Kobalte installed but unused** | Medium | Dependency exists but no components built with it |
| **23 hand-built DarkMode* Astro components** | Medium | No headless UI library in use; custom components for every primitive |
| **No form validation library** | Medium | All forms are inline handlers; Zod schemas in shared/ unused in UI |
| **No icon library** | Low | All inline SVGs, no systematic icon system |
| **No animation library** | Low | CSS-only animations; limited interactivity |
| **No shared component library** | Medium | wiki has 19 UI components, encp has 2; no cross-package sharing |
| **Minimal Storybook coverage** | Low | 4/19 components have stories |
| **No data fetching layer** | N/A | Static site — not needed yet; will be needed for Phase 3 backend |

---

## 2. Evaluation: JavaScript & TypeScript Ecosystem

### 2.1 Build Tools

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Vite** (current) | **KEEP** | Already in use via Astro. No reason to switch. |
| **Rolldown** | **WATCH** | Vite's future production bundler. Will arrive automatically when Astro/Vite adopts it. No action needed. |
| **Rspack/Rsbuild** | **SKIP** | Webpack replacement. We don't use Webpack. |
| **Turbopack** | **SKIP** | Next.js-specific. Not applicable. |
| **Esbuild** | **KEEP** | Already used by Vite internally. No direct usage needed. |
| **tsdown** | **SKIP** | Library bundler. We ship apps, not libraries. |

**Decision: No build tool migration. Vite via Astro is optimal.**

### 2.2 Linting & Formatting

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **ESLint + Prettier** (current) | **REPLACE** | Known hang issues on TSX. ESLint + Prettier = 2 tools doing 1 job. |
| **Biome** | **ADOPT** | Single Rust-powered tool replacing both ESLint and Prettier. 10-35x faster. Native Astro/Solid support via config. Solves the TSX hang problem directly. |

**Decision: Migrate ESLint + Prettier → Biome.**

**Migration Path:**
1. Install `@biomejs/biome`
2. Run `biome migrate eslint` and `biome migrate prettier` to auto-convert rules
3. Remove `eslint`, `prettier`, `prettier-plugin-astro`, `eslint-plugin-solid`, `typescript-eslint`, `@eslint/js`
4. Update `lint-staged.config.js` and `commitlint.config.js`
5. Update CI pipeline `lint` and `format:check` scripts
6. Remove `.prettierrc`, `eslint.config.js`, `.prettierignore`

**Risk:** Biome's Astro support is newer than Prettier's. Verify `.astro` file formatting matches expectations before full migration.

### 2.3 Package Manager

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Bun** (current) | **KEEP** | Already in use, fast, works well. |

**Decision: No package manager migration.**

### 2.4 Schema Validation

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Zod** (current in @wikisites/shared) | **KEEP** | Mature, widely used, excellent TypeScript inference. Already embedded in schemas. |
| **Valibot** | **WATCH** | Smaller bundle, but Zod is already deeply integrated. Migration cost > benefit. |

**Decision: No validation library migration. Zod is the right choice for this project.**

### 2.5 Testing

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Vitest** (current) | **KEEP** | Fast, Vite-native, matches Jest API. |
| **Playwright** (current) | **KEEP** | Industry standard for E2E. |
| **Biome** (as formatter) | See above | Replaces ESLint + Prettier for formatting/linting. |

**Decision: No testing migration.**

---

## 3. Evaluation: SolidJS Ecosystem

### 3.1 Component Libraries (Headless UI)

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Kobalte** (installed, unused) | **ADOPT** | Community standard headless UI for SolidJS. Already a dependency. Provides accessible, unstyled primitives for every component we hand-built: Dialog, Dropdown, Select, Tabs, Toggle, etc. Replaces all 12 DarkMode* Astro components with proper SolidJS components. |
| **corvu** | **SKIP** | Also good, but Kobalte is already installed and more mature. |
| **Ark UI** | **SKIP** | Built on Zag.js; more opinionated. Kobalte is more flexible for custom design systems. |
| **Suid** (MUI port) | **SKIP** | Styled library. We have a custom design system. |
| **Hope UI** | **SKIP** | Styled library. Same reason. |
| **shadcn-solid** | **SKIP** | Tailwind-based component copy-paste. Our components are custom; Kobalte primitives are more appropriate. |

**Decision: Adopt Kobalte as the headless UI primitive layer. Replace hand-built DarkMode* Astro components.**

### 3.2 Forms & Validation

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Felte** (Solid) | **ADOPT** | Community-preferred form library for SolidJS. Works with Kobalte. Provides form state, validation, submission handling. Integrates with Zod for schema validation (we already have Zod schemas in shared/). |
| **Modular Forms** | **SKIP** | Also good, but Felte has broader community adoption and better Zod integration. |
| **Solid Forms** | **SKIP** | Legacy/basic. Felte is superior. |

**Decision: Adopt Felte for form management with Zod validation integration.**

### 3.3 Icons

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **unplugin-icons** | **ADOPT** | Auto-imports any icon set on demand. Supports 100k+ icons from Iconify. Zero bundle size impact (only imports what's used). Works with Vite/Astro. |
| **solid-icons** | **SKIP** | Manual imports. unplugin-icons is more ergonomic. |
| **Solid Lucide** | **SKIP** | Manual imports. unplugin-icons covers Lucide and much more. |

**Decision: Adopt unplugin-icons with Lucide icon set (or similar).**

### 3.4 State Management

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **SolidJS signals** (current) | **KEEP** | Primary state primitive. Works well. |
| **Solid Primitives** | **ADOPT** | Community-maintained reactive utilities. Provides `destructure`, `createIntersectionObserver`, `createMediaQuery`, and many others we can use instead of hand-rolling. Also includes `@solid-primitives/i18n` for future i18n needs. |
| **Zustand/Jotai/Valtio** | **SKIP** | Overkill. Solid signals + context are sufficient for this project's complexity. |
| **TanStack Query** | **DEFER** | Not needed yet — no client-side data fetching. Will be needed in Phase 3 (backend API). Add when backend is live. |

**Decision: Adopt Solid Primitives for reactive utilities. Defer TanStack Query until backend phase.**

### 3.5 Animations

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **AutoAnimate** | **ADOPT** | Zero-config animations for lists and layouts. Tiny bundle. Drop-in for any list/layout. |
| **Solid Motion** | **SKIP** | Heavier. AutoAnimate covers 80% of use cases. CSS animations handle the rest. |
| **Solid Transition Group** | **KEEP** | Official. Already available. For enter/exit transitions when needed. |

**Decision: Adopt AutoAnimate for list/layout animations. Keep CSS animations for existing effects.**

### 3.6 Data Fetching

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **TanStack Query** | **DEFER** | Not needed until Phase 3 introduces client-side API calls. |
| **tRPC** | **DEFER** | Consider when building the full API layer in Phase 3. |
| **Solid Query** | **DEFER** | Same as TanStack Query. |

**Decision: Defer all data fetching decisions to Phase 3 backend work.**

### 3.7 Tables & Virtual Lists

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **TanStack Solid Table** | **DEFER** | Will be needed for admin dashboards or large data tables in Phase 3. |
| **Virtua** | **DEFER** | Only needed if quiz/flashcard lists exceed ~500 items. |

**Decision: Defer. Current data volumes don't require virtualization.**

### 3.8 Toasts

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **solid-sonner** (current) | **KEEP** | Modern, clean, already integrated. |

**Decision: No toast migration.**

### 3.9 Markdown

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **solid-markdown** | **SKIP** | We render markdown at build time via Astro/MDX. No client-side markdown rendering needed. |

**Decision: No markdown rendering migration.**

### 3.10 Internationalization

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **@solid-primitives/i18n** | **DEFER** | Will be needed in Phase 5 (i18n). Adopt when that phase begins. |
| **Astro i18n** | **DEFER** | Same. Phase 5. |

**Decision: Defer i18n to Phase 5.**

---

## 4. Evaluation: Astro Integrations

### 4.1 Core

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Astro** (current v5.x) | **KEEP** | Already in use. |
| **@astrojs/solid-js** (current v5.x) | **KEEP** | Already in use. |
| **@astrojs/mdx** (current v6.x) | **KEEP** | Already in use for 79 MDX articles. |
| **@astrojs/starlight** (current v0.37.7) | **KEEP** | Powers wiki site. Excellent documentation framework. |
| **@astrojs/tailwind** (current v6.x) | **MIGRATE** | Deprecated in Astro 5+. Replace with `@tailwindcss/vite` directly (already installed). Remove the wrapper integration. |

**Decision: Remove @astrojs/tailwind wrapper. Use @tailwindcss/vite directly (already in place).**

### 4.2 SSR Adapters

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **@astrojs/cloudflare** | **DEFER** | Currently output: "static". If we move to SSR/edge rendering in Phase 4, adopt this. |

**Decision: Defer. Sites are currently static.**

### 4.3 Content Layer

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Content Layer API** | **ADOPT** | Astro v5/v6 content layer is superior to older markdown glob loaders. Already in use for Starlight. Ensure all content uses `astro:content` collections consistently. |

**Decision: Already using Content Layer via Starlight. Ensure consistency across packages.**

### 4.4 SEO & Utilities

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **astro-seo** | **EVALUATE** | We have custom SEO in BaseLayout.astro. Consider adopting for cleaner meta tag management. Low priority. |
| **astro-icon** | **SKIP** | We're adopting unplugin-icons instead (framework-agnostic). |
| **astro-breadcrumbs** | **DEFER** | Will be useful when navigation complexity grows. |
| **astro-compress** | **WATCH** | Cloudflare Pages already compresses. May be redundant. |
| **astro-embed** | **DEFER** | Not needed until we embed external media. |
| **astro-check** | **KEEP** | Already in use via `astro check`. |

**Decision: Low-priority integrations. Evaluate individually when needs arise.**

### 4.5 Documentation Framework

| Tool | Recommendation | Rationale |
|------|---------------|-----------|
| **Starlight** (current) | **KEEP** | Already powering wiki site. Excellent. |

**Decision: No documentation framework migration.**

---

## 5. Migration Decisions Summary

### MIGRATE (Immediate)

| # | Migration | From → To | Effort | Impact |
|---|-----------|-----------|--------|--------|
| M1 | Linting/Formatting | ESLint + Prettier → Biome | Medium | High (solves TSX hang, faster CI) |
| M2 | UI Primitives | Hand-built DarkMode* → Kobalte | Medium-High | High (accessible, consistent, less code) |
| M3 | Forms | Inline handlers → Felte + Zod | Medium | Medium (validation, consistency) |
| M4 | Icons | Inline SVGs → unplugin-icons | Low-Medium | Medium (systematic icon system) |
| M5 | Astro Tailwind | @astrojs/tailwind → @tailwindcss/vite | Low | Low (remove deprecated wrapper) |

### DEFER (Future Phases)

| # | Migration | When | Rationale |
|---|-----------|------|-----------|
| D1 | TanStack Query | Phase 3 (Backend) | No client-side data fetching yet |
| D2 | tRPC | Phase 3 (Backend) | Consider for full API integration |
| D3 | @solid-primitives/i18n | Phase 5 (i18n) | Not needed until internationalization |
| D4 | TanStack Solid Table | Phase 3+ (Admin) | Only if large data tables needed |
| D5 | Virtua (virtual scroll) | Phase 2+ (Scale) | Only if lists exceed 500 items |
| D6 | AutoAnimate | Phase 1.3 (Content) | When adding more interactive lists |

### SKIP (Not Applicable)

| # | Tool | Rationale |
|---|------|-----------|
| S1 | Rolldown/Rspack/Turbopack | Not needed. Vite is optimal. |
| S2 | Next.js/Nuxt/SvelteKit/SolidStart | Wrong architecture. Astro + Solid islands is correct. |
| S3 | Redux/Zustand/Jotai | Solid signals + context are sufficient. |
| S4 | Valibot/ArkType | Zod is deeply integrated. Migration cost > benefit. |
| S5 | Cypress | Playwright is superior and already in use. |
| S6 | styled-components/Panda CSS/Vanilla Extract | Tailwind CSS v4 is the styling solution. |
| S7 | corvu/Ark UI/Suid/Hope UI | Kobalte is the chosen headless library. |
| S8 | Moment.js/date-fns/Day.js | Not needed. Static content has no date logic. |
| S9 | Axios | Not needed. No client-side HTTP calls. |

---

## 6. Detailed Migration Plans

### M1: ESLint + Prettier → Biome

**Why:** ESLint hangs on TSX files (known issue in ROADMAP.md). Biome is 10-35x faster, handles both linting and formatting, and has native Astro support.

**Steps:**
1. `bun add --dev @biomejs/biome`
2. `bunx biome init` — generate config
3. `bunx biome migrate eslint` — auto-convert ESLint rules
4. `bunx biome migrate prettier` — auto-convert Prettier config
5. Manual review of converted rules (especially `eslint-plugin-solid` rules — check Biome equivalents)
6. Remove: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-solid`, `globals`, `prettier`, `prettier-plugin-astro`
7. Remove: `eslint.config.js`, `.prettierrc`, `.prettierignore`
8. Update scripts in root `package.json`:
   - `"lint": "biome check ."`
   - `"lint:fix": "biome check --write ."`
   - `"format": "biome format --write ."`
   - `"format:check": "biome format --check ."`
9. Update `lint-staged.config.js` to use biome
10. Update CI pipeline `.github/workflows/ci.yml`
11. Update Storybook config if it references prettier/eslint plugins

**Verification:** Run full `bun run check` and ensure CI passes. Compare `.astro` formatting between Prettier and Biome.

### M2: Hand-built Components → Kobalte

**Why:** Kobalte is already installed but unused. All 12 DarkMode* Astro components are hand-built with duplicated patterns. Kobalte provides accessible, headless primitives that work natively with SolidJS and our Tailwind design system.

**Components to Replace:**

| Current Astro Component | Kobalte Replacement | Notes |
|------------------------|-------------------|-------|
| DarkModeModal.astro | `Dialog` from @kobalte/core | Keyboard trap, focus management, aria attributes built-in |
| DarkModeSelect.astro | `Select` from @kobalte/core | Keyboard navigation, type-ahead, aria listbox |
| DarkModeTabs.astro | `Tabs` from @kobalte/core | Arrow key navigation, activation management |
| DarkModeTooltip.astro | `Tooltip` from @kobalte/core | Delay, positioning, aria descriptions |
| DarkModeInput.astro | `TextField` from @kobalte/core | Label association, error messages, aria describedby |
| DarkModeButton.astro | `Button` from @kobalte/core | Press interaction, disabled state, aria pressed |
| DarkModeBadge.astro | Keep as Tailwind utility | Too simple for a library primitive |
| DarkModeCard.astro | Keep as Tailwind utility | Styling-only, no interaction |
| DarkModeSkeleton.astro | Keep as Tailwind utility | Styling-only, no interaction |
| DarkModeProgress.astro | `Progress` from @kobalte/core | aria-valuenow, aria-valuemax,aria-label |

**Steps:**
1. Create SolidJS components in a new `packages/shared/src/components/` or `packages/wiki/src/components/kobalte/` directory
2. Each Kobalte component wraps the primitive with our Tailwind design tokens (dark mode classes, spatial depth, etc.)
3. Add `client:load` directive in Astro pages/layouts where these components are used
4. Write Storybook stories for each new Kobalte component
5. Deprecate DarkMode* Astro components (keep until all references migrated)
6. Export from a shared barrel file

**Verification:** Visual regression tests (Playwright screenshots) should pass. Accessibility audit should show improvement.

### M3: Inline Forms → Felte + Zod

**Why:** No form validation exists. Zod schemas in `@wikisites/shared` are unused in the UI. Felte provides form state management with native Zod integration.

**Scope:**
- MWCalculator.tsx (encp) — input validation
- PeptideCalculatorUI.astro (wiki) — input validation
- ThemeBuilder.astro (wiki) — theme export form
- Future: login forms, annotation forms, comment forms (Phase 3)

**Steps:**
1. `bun add --dev felte @felte/validator-zod`
2. Refactor MWCalculator.tsx to use `createForm` with Zod schema
3. Add validation feedback (error messages, field states)
4. Refactor PeptideCalculatorUI.astro to use SolidJS + Felte (currently vanilla JS)
5. Write component tests with solid-testing-library

**Verification:** Form validation works. Error messages display. No regression in calculator functionality.

### M4: Inline SVGs → unplugin-icons

**Why:** 10+ hand-written inline SVGs across components. No systematic icon system. unplugin-icons auto-imports icons on demand with zero bundle overhead.

**Steps:**
1. `bun add --dev unplugin-icons @iconify-json/lucide` (or another icon set)
2. Add Vite plugin config to both Astro configs
3. Replace inline SVGs with `<IconLucideSun />`, `<IconLucideMoon />`, etc.
4. Remove hand-written SVG code from MobileNav.tsx, ThemePresetSelector.astro, BaseLayout.astro, etc.

**Verification:** All icons render correctly. No visual regression. Bundle size should decrease (SVGs inlined → optimized icons).

### M5: @astrojs/tailwind → @tailwindcss/vite

**Why:** `@astrojs/tailwind` is deprecated in Astro 5+. We already have `@tailwindcss/vite` installed.

**Steps:**
1. Remove `@astrojs/tailwind` from dependencies
2. Remove `tailwind()` integration from `astro.config.mjs` in both packages
3. Ensure `@tailwindcss/vite` plugin is configured in both configs (likely already is)
4. Verify global CSS imports still work

**Verification:** Build succeeds. Tailwind classes render. No visual changes.

---

## 7. Risk Assessment

| Migration | Risk | Mitigation |
|-----------|------|------------|
| M1: Biome | Medium — Biome's Astro support is newer | Run `biome format` on a test branch. Compare output with Prettier. Fix any differences before full migration. |
| M2: Kobalte | Medium — Large surface area (12 components) | Migrate incrementally. One component at a time. Visual regression tests between each. |
| M3: Felte | Low — Limited scope (calculators) | Small, isolated refactor. Easy to verify. |
| M4: unplugin-icons | Low — Simple SVG replacement | One component at a time. Visual verification. |
| M5: Tailwind integration | Very Low — Config-only change | Single config edit. Build verification. |

---

## 8. Timeline Estimate

| Week | Task | Effort |
|------|------|--------|
| 1 | M5: Remove @astrojs/tailwind | 0.5h |
| 1 | M1: Biome migration (init, convert rules, remove old tools) | 4-6h |
| 2 | M4: unplugin-icons setup + replace inline SVGs | 3-4h |
| 3-4 | M2: Kobalte adoption (first 4 components: Dialog, Select, Tabs, TextField) | 8-12h |
| 5-6 | M2: Kobalte adoption (remaining components: Tooltip, Button, Progress) | 6-8h |
| 6 | M3: Felte integration for calculators | 4-6h |
| 7 | Storybook coverage expansion + visual regression tests | 4-6h |
| 8 | Integration testing, CI updates, documentation | 4-6h |

**Total estimated effort: 34-49 hours across 8 weeks**

This can be interleaved with ongoing Phase 1 content work.

---

## 9. Decisions NOT to Migrate

### Astro → SolidStart
**Why not:** SolidStart is a full meta-framework with SSR/edge focus. Our sites are **static-first** with selective hydration via Astro islands. Astro's content-first architecture is the correct choice for educational websites with 158+ MDX articles. SolidStart would require rewriting all content pages and losing Starlight.

### Tailwind CSS → Panda CSS / Vanilla Extract
**Why not:** Tailwind CSS v4 is already in use and working well. Panda CSS and Vanilla Extract offer type safety at build time, but Tailwind's utility-first approach with our custom design system (Spatial Materialism + Amoebic UI) is mature and documented. Migration would require rewriting every component's classes.

### Zod → Valibot
**Why not:** Zod is deeply embedded in `@wikisites/shared` schemas. Valibot offers smaller bundle size, but the schemas are used at build time and in the worker — not client-side critical path. Migration cost far exceeds bundle savings.

### React/Vue → SolidJS
**Why not:** Already on SolidJS. No reason to switch. SolidJS is the correct choice for fine-grained reactivity without virtual DOM overhead.

---

## 10. Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| CI lint step duration | ~30s+ (hangs) | <5s (Biome) |
| UI component count | 19 (hand-built) | 12-15 (Kobalte-based, less code) |
| Form validation coverage | 0% | 100% on calculators |
| Icon consistency | Inline SVGs | Systematic icon library |
| Storybook coverage | 4/19 (21%) | 15/15+ (100%) |
| ESLint/Prettier deps | 7 packages | 1 package (Biome) |
| Accessibility score | Good | Excellent (Kobalte aria) |
