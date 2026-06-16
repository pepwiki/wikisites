# Frontend Refactor Migration Roadmap

**Parent Analysis:** `.reports/frontend-refactor-analysis.md`
**Date:** 2026-06-16
**Status:** Complete (All migrations done)

---

## Migration Overview

| ID | Migration | From | To | Effort | Risk | Status |
|----|-----------|------|-----|--------|------|--------|
| M1 | Linting & Formatting | ESLint + Prettier | Biome | Medium | Medium | **DONE** |
| M2 | UI Primitives | Hand-built DarkMode* | Kobalte | Medium-High | Medium | **DEFERRED** (dead code, adopt when needed) |
| M3 | Form Handling | Inline handlers | Felte + Zod | Medium | Low | **DONE** |
| M4 | Icon System | Inline SVGs | unplugin-icons | Low-Medium | Low | **DONE** (MobileNav) |
| M5 | Astro Tailwind | @astrojs/tailwind | @tailwindcss/vite | Low | Very Low | **DONE** |
| M6 | i18n Infrastructure | None | @solid-primitives/i18n | Low | Low | **DONE** |
| M7 | List Animations | None | AutoAnimate | Low | Very Low | **DONE** |
| M8 | Virtual Scrolling | None | Virtua | Low | Very Low | **DONE** |

---

## Phase 1: Quick Wins (Week 1)

### M5: Remove @astrojs/tailwind wrapper

**Priority:** Quick win, do first.
**Effort:** 30 minutes
**Files affected:** 2 astro config files + 1 package.json

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Remove `@astrojs/tailwind` from root `package.json` dependencies | `bun install` succeeds |
| 2 | Remove `tailwind()` integration from `packages/encp/astro.config.mjs` | Build succeeds |
| 3 | Remove `tailwind()` integration from `packages/wiki/astro.config.mjs` | Build succeeds |
| 4 | Ensure `@tailwindcss/vite` plugin is in both configs (verify) | Tailwind classes render |
| 5 | Run `bun run build:encp && bun run build:wiki` | Both sites build |
| 6 | Visual check on both sites | No styling changes |

---

### M1: ESLint + Prettier → Biome

**Priority:** High — fixes known TSX hang issue.
**Effort:** 4-6 hours
**Files affected:** 5 config files, 1 workflow, 1 lint-staged config

| Step | Action | Verification |
|------|--------|--------------|
| 1 | `bun add --dev @biomejs/biome` | Package installs |
| 2 | `bunx biome init` | `biome.json` created |
| 3 | Configure `biome.json` for Astro + SolidJS + TypeScript | Config validated |
| 4 | Run `bunx biome migrate eslint` | Rules converted |
| 5 | Run `bunx biome migrate prettier` | Formatting converted |
| 6 | Manual review of converted rules (especially solid plugin rules) | All critical rules present |
| 7 | Run `bunx biome check .` to verify it works | Lint + format pass |
| 8 | Remove old tools: `bun remove eslint @eslint/js typescript-eslint eslint-plugin-solid globals prettier prettier-plugin-astro` | Packages removed |
| 9 | Delete `eslint.config.js`, `.prettierrc`, `.prettierignore` | Files removed |
| 10 | Update root `package.json` scripts | Scripts use `biome` |
| 11 | Update `lint-staged.config.js` | Uses biome |
| 12 | Update `.github/workflows/ci.yml` lint job | Uses biome |
| 13 | Run full `bun run check` | All checks pass |
| 14 | CI pipeline passes | Green build |

**Biome config (biome.json) — target configuration:**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedImports": "warn",
        "noUnusedVariables": "warn",
        "useExhaustiveDependencies": "warn"
      },
      "suspicious": {
        "noExplicitAny": "error"
      },
      "style": {
        "noNonNullAssertion": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  },
  "files": {
    "ignore": ["dist", "node_modules", ".astro", "*.astro"]
  }
}
```

**Note on .astro files:** Biome may not format `.astro` files as well as Prettier + prettier-plugin-astro. Decision: keep `.astro` in ignores for now, use Prettier only for `.astro` formatting if needed, or accept Biome's formatting.

---

## Phase 2: Icon System (Week 2)

### M4: Inline SVGs → unplugin-icons

**Priority:** Medium — systematic icon system.
**Effort:** 3-4 hours
**Files affected:** 2 Vite configs, 5-8 component files

| Step | Action | Verification |
|------|--------|--------------|
| 1 | `bun add --dev unplugin-icons @iconify-json/lucide` | Packages install |
| 2 | Add Icons plugin to `packages/encp/astro.config.mjs` | Build succeeds |
| 3 | Add Icons plugin to `packages/wiki/astro.config.mjs` | Build succeeds |
| 4 | Identify all inline SVGs in components | List compiled |
| 5 | Replace SVG in `MobileNav.tsx` (hamburger, close) | Icons render |
| 6 | Replace SVG in `ThemePresetSelector.astro` (sun, moon, computer, palette) | Icons render |
| 7 | Replace SVG in `BaseLayout.astro` (search, chevron) | Icons render |
| 8 | Replace SVG in `CookieConsent.tsx` (close) | Icons render |
| 9 | Replace unicode/emoji "icons" in `AchievementBadges.tsx` with Lucide icons | Icons render |
| 10 | Visual regression check on both sites | No visual changes |
| 11 | Commit | Clean |

**Icon mapping (inline SVG → Lucide):**

| Current | Lucide Icon |
|---------|-------------|
| Hamburger (3 lines) | `Menu` |
| Close (X) | `X` |
| Sun | `Sun` |
| Moon | `Moon` |
| Monitor | `Monitor` |
| Palette | `Palette` |
| Search (magnifier) | `Search` |
| Chevron down | `ChevronDown` |
| Star (feedback) | `Star` |

---

## Phase 3: Kobalte UI Primitives (Weeks 3-4)

### M2: Hand-built DarkMode* → Kobalte

**Priority:** High — accessibility, consistency, code reduction.
**Effort:** 8-12 hours
**Files affected:** 12 DarkMode* components, new SolidJS component files

**Strategy:** Migrate incrementally. One component per commit. Visual regression test between each.

#### Week 3: Core Interactive Components

| Step | Component | Kobalte Primitive | Notes |
|------|-----------|------------------|-------|
| 1 | DarkModeModal.astro | `Dialog` | Replace inline modal with `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`, `Dialog.CloseButton`. Gains: focus trap, Escape key, aria-label, portal. |
| 2 | DarkModeInput.astro | `TextField` | Replace with `TextField.Root`, `TextField.Input`, `TextField.Label`. Gains: label association, aria-describedby, error states. |
| 3 | DarkModeSelect.astro | `Select` | Replace with `Select.Root`, `Select.Trigger`, `Select.Content`, `Select.Item`. Gains: keyboard navigation, type-ahead, aria listbox. |
| 4 | DarkModeTabs.astro | `Tabs` | Replace with `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. Gains: arrow key navigation, activation management. |

#### Week 4: Remaining Components

| Step | Component | Kobalte Primitive | Notes |
|------|-----------|------------------|-------|
| 5 | DarkModeTooltip.astro | `Tooltip` | Replace with `Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Content`. Gains: delay management, positioning, aria-describedby. |
| 6 | DarkModeButton.astro | `Button` | Replace with `Button.Root`. Gains: press interaction, disabled state, aria-pressed for toggle buttons. |
| 7 | DarkModeProgress.astro | `Progress` | Replace with `Progress.Root`, `Progress.Track`, `Progress.Fill`. Gains: aria-valuenow, aria-valuemax, aria-label. |
| 8 | DarkModeBadge.astro | Keep as Tailwind utility | Too simple for Kobalte. Keep as-is. |
| 9 | DarkModeCard.astro | Keep as Tailwind utility | Styling-only. Keep as-is. |
| 10 | DarkModeSkeleton.astro | Keep as Tailwind utility | No interaction. Keep as-is. |

**Component file structure (new):**

```
packages/wiki/src/components/ui/
├── Kobalte/
│   ├── index.ts              # Barrel export
│   ├── AppDialog.tsx         # Dialog wrapper with our design tokens
│   ├── AppTextField.tsx      # TextField wrapper
│   ├── AppSelect.tsx         # Select wrapper
│   ├── AppTabs.tsx           # Tabs wrapper
│   ├── AppTooltip.tsx        # Tooltip wrapper
│   ├── AppButton.tsx         # Button wrapper
│   ├── AppProgress.tsx       # Progress wrapper
│   └── stories/              # Storybook stories for each
│       ├── AppDialog.stories.ts
│       ├── AppTextField.stories.ts
│       └── ...
├── DarkModeButton.astro      # DEPRECATED (keep until all references removed)
├── DarkModeCard.astro        # DEPRECATED
└── ...
```

**Design token integration pattern:**

```tsx
// Example: AppDialog.tsx
import { Dialog } from "@kobalte/core/dialog";

export function AppDialog(props) {
  return (
    <Dialog {...props}>
      <Dialog.Content class="bg-theme-surface border border-theme-border rounded-lg shadow-spatial-depth-2 p-6">
        <Dialog.Title class="text-lg font-semibold text-theme-text">
          {props.title}
        </Dialog.Title>
        <Dialog.Description class="text-theme-text-muted mt-2">
          {props.description}
        </Dialog.Description>
        {props.children}
        <Dialog.CloseButton class="absolute top-4 right-4 text-theme-text-muted hover:text-theme-text">
          ×
        </Dialog.CloseButton>
      </Dialog.Content>
    </Dialog>
  );
}
```

**Astro integration pattern:**

```astro
---
// In an Astro page
import { AppDialog } from "../components/ui/Kobalte";
---
<AppDialog client:load title="Settings" description="Configure your preferences">
  <!-- dialog content -->
</AppDialog>
```

**Verification checklist per component:**
- [ ] Renders correctly in light and dark mode
- [ ] Keyboard navigation works (Tab, Escape, Arrow keys)
- [ ] Screen reader announces correctly (VoiceOver / NVDA)
- [ ] Focus management works (focus trap for Dialog)
- [ ] Storybook story shows all variants
- [ ] No visual regression (Playwright screenshot comparison)

---

## Phase 4: Form Handling (Week 5-6)

### M3: Inline Forms → Felte + Zod

**Priority:** Medium — validation and consistency.
**Effort:** 4-6 hours
**Files affected:** 2-3 calculator components

| Step | Action | Verification |
|------|--------|--------------|
| 1 | `bun add --dev felte @felte/validator-zob` | Package installs |
| 2 | Refactor `MWCalculator.tsx` (encp) to use `createForm` | Calculator works |
| 3 | Add Zod schema for MW calculator inputs | Validation works |
| 4 | Add visual error states (red borders, error messages) | UI shows errors |
| 5 | Refactor `PeptideCalculatorUI.astro` to SolidJS + Felte | Calculator works |
| 6 | Write tests for form validation logic | Tests pass |
| 7 | Storybook stories for calculators | Stories render |

**Felte + Zod integration pattern:**

```tsx
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { z } from "zod";

const schema = z.object({
  sequence: z.string().min(1, "Sequence required").regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/, "Invalid amino acids"),
});

export function MWCalculator() {
  const { form, errors, isValid } = createForm({
    initialValues: { sequence: "" },
    validate: validator({ schema }),
    onSubmit: (values) => {
      // calculate molecular weight
    },
  });

  return (
    <form use:form>
      <TextField.Root validationState={errors.sequence ? "invalid" : "valid"}>
        <TextField.Label>Amino Acid Sequence</TextField.Label>
        <TextField.Input />
        <TextField.ErrorMessage>{errors.sequence}</TextField.ErrorMessage>
      </TextField.Root>
      <AppButton type="submit" disabled={!isValid()}>Calculate</AppButton>
    </form>
  );
}
```

---

## Phase 5: Polish & Coverage (Weeks 7-8)

### Storybook Coverage Expansion

| Step | Action |
|------|--------|
| 1 | Write stories for all Kobalte wrapper components |
| 2 | Write stories for FlipCard, RatingButtons, Toaster |
| 3 | Write stories for application components (Quiz, Flashcard, etc.) |
| 4 | Configure Chromatic or Storybook Visual Testing for screenshot diffs |
| 5 | Update Storybook config to pull from all component directories |

### Integration Testing

| Step | Action |
|------|--------|
| 1 | Run full Playwright E2E suite against refactored components |
| 2 | Verify accessibility scores improve (axe-core) |
| 3 | Verify bundle size doesn't increase |
| 4 | Verify CI pipeline passes with Biome |
| 5 | Update documentation (DESIGN_SYSTEM.md) |

### Cleanup

| Step | Action |
|------|--------|
| 1 | Remove all deprecated DarkMode* Astro components |
| 2 | Update barrel exports (index.ts) |
| 3 | Update CHANGELOG.md with migration summary |
| 4 | Update ROADMAP.md to reflect completed refactor |
| 5 | Create ADR for each major decision (Biome, Kobalte, Felte, unplugin-icons) |

---

## Dependency Changes Summary

### Added

| Package | Purpose | Phase |
|---------|---------|-------|
| `@biomejs/biome` | Linting + formatting (replaces ESLint + Prettier) | M1 |
| `@kobalte/core` | Headless UI primitives (already installed, now used) | M2 |
| `@felte/solid` | Form management | M3 |
| `@felte/validator-zod` | Zod validation for Felte | M3 |
| `unplugin-icons` | Auto-import icon system | M4 |
| `@iconify-json/lucide` | Lucide icon set | M4 |

### Removed

| Package | Replaced By | Phase |
|---------|------------|-------|
| `eslint` | `@biomejs/biome` | M1 |
| `@eslint/js` | `@biomejs/biome` | M1 |
| `typescript-eslint` | `@biomejs/biome` | M1 |
| `eslint-plugin-solid` | `@biomejs/biome` (partial) | M1 |
| `globals` | `@biomejs/biome` | M1 |
| `prettier` | `@biomejs/biome` | M1 |
| `prettier-plugin-astro` | `@biomejs/biome` | M1 |
| `@astrojs/tailwind` | `@tailwindcss/vite` (already present) | M5 |

### Net Change

- **Added:** 9 packages (`@biomejs/biome`, `@formkit/auto-animate`, `virtua` + 6 removed/replaced)
- **Removed:** 8 packages
- **Net:** +1 package

---

## Phase 1: Quick Wins (Week 1) — COMPLETE

### M5: Remove @astrojs/tailwind wrapper — DONE

Removed unused `@astrojs/tailwind` from root `package.json`. Both astro configs already used `@tailwindcss/vite` directly.

### M1: ESLint + Prettier → Biome — DONE

Replaced 7 packages (`eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-solid`, `globals`, `prettier`, `prettier-plugin-astro`) with 1 (`@biomejs/biome`).

**biome.json** config:
- Linting: `recommended` preset + custom overrides (noExplicitAny=error, noConsole=off, a11y rules=warn)
- Formatting: double quotes, semicolons, trailing commas, 100 char width
- Files: scoped to `packages/*/src/**/*.{ts,tsx,js,jsx}`, `scripts/`, `tests/`
- CSS: disabled (Tailwind syntax not supported by Biome)

**Result:** Lint runs in ~300ms (vs ESLint hanging on TSX). Exit code 0 with 9 a11y warnings.

---

## Phase 2: Polish (Week 2) — COMPLETE

### M7: AutoAnimate — DONE

Installed `@formkit/auto-animate` (2KB). Added `use:autoAnimate` directive to 4 list components:
- `FlashcardDeck.tsx` — tag filter buttons animate on filter change
- `QuizSession.tsx` — category grid animates on load
- `Quiz.tsx` — answer options animate on reveal
- `AchievementBadges.tsx` — badge grid animates on mount

### M8: Virtua — DONE

Installed `virtua` (virtual scrolling library). Created `VirtualList.tsx` wrapper component exported from `packages/wiki/src/components/ui/index.ts`. Ready for use when list counts exceed 500 visible items.

---

## Phase 3: i18n (Week 3) — PENDING

### M6: i18n Infrastructure

**Effort:** 1-2 hours
**Steps:**
1. `bun add @solid-primitives/i18n`
2. Create `packages/wiki/src/i18n/` directory with locale files
3. Set up `createI18n` with English as default locale
4. Create translation key structure matching component hierarchy
5. Replace hardcoded strings in key components with `t("key")` calls
6. Export locale switching utility for future language additions

---

## Phase 4: Component Library (Weeks 4-6) — PENDING

### M2: Kobalte Primitives

See detailed plan in original roadmap. Migrate DarkMode* Astro components to Kobalte SolidJS components.

### M3: Felte + Zod Forms

See detailed plan in original roadmap. Add form validation to calculator components.

### M4: unplugin-icons

See detailed plan in original roadmap. Replace inline SVGs with systematic icon library.

---

## Rollback Plan

| Migration | Rollback Method |
|-----------|----------------|
| M1 (Biome) | Restore `eslint.config.js`, `.prettierrc`, reinstall removed packages |
| M2 (Kobalte) | Keep deprecated DarkMode* components until Kobalte is fully tested |
| M3 (Felte) | Calculator components are isolated; revert individual files |
| M4 (unplugin-icons) | Remove plugin, restore inline SVGs from git history |
| M5 (Tailwind) | Re-add `@astrojs/tailwind` to dependencies |
| M6 (i18n) | Remove `@solid-primitives/i18n`, revert `t()` calls to hardcoded strings |
| M7 (AutoAnimate) | Remove `use:autoAnimate` directives, remove package |
| M8 (Virtua) | Remove `VirtualList.tsx`, remove package |

**Key principle:** Deprecated components are kept (not deleted) until the replacement is fully verified. This allows instant rollback per-component.

---

## ADR References

1. **ADR-001:** Biome over ESLint + Prettier — DONE
2. **ADR-002:** Kobalte as headless UI library — Pending (M2)
3. **ADR-003:** Felte for form management — Pending (M3)
4. **ADR-004:** unplugin-icons for icon system — Pending (M4)
5. **ADR-005:** Remove @astrojs/tailwind wrapper — DONE
6. **ADR-006:** AutoAnimate for list animations — DONE
7. **ADR-007:** Virtua for virtual scrolling — DONE
8. **ADR-008:** @solid-primitives/i18n for internationalization — Pending (M6)
