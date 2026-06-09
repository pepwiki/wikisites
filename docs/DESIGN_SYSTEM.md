# Wikisites Design System

## Overview

Both Wikipept and Encyclopeptide share a consistent design language built on Tailwind CSS 4.x with full dark mode support.

## Color Tokens

### Shared Palette

| Token                      | Light     | Dark      | Usage                  |
| -------------------------- | --------- | --------- | ---------------------- |
| `--color-bg`               | `#f8fafc` | `#020617` | Page background        |
| `--color-surface`          | `#ffffff` | `#1e293b` | Card/container surface |
| `--color-surface-elevated` | `#ffffff` | `#0f172a` | Sidebar, navbar        |
| `--color-text`             | `#1e293b` | `#e2e8f0` | Primary text           |
| `--color-text-muted`       | `#64748b` | `#94a3b8` | Secondary text         |
| `--color-border`           | `#e2e8f0` | `#334155` | Borders                |
| `--color-accent`           | `#0d9488` | `#0d9488` | Links, primary actions |

### Site-Specific Colors

**Wikipept:**

- Accent: `#0d9488` (teal)
- Secondary: `#f97316` (coral/orange)

**Encyclopeptide:**

- Accent: `#c9a84c` (gold)
- Background: `#0a1628` (navy)

## Dark Mode Implementation

### How It Works

1. Both sites use `data-theme="dark"` attribute on `<html>` to indicate dark mode
2. Tailwind's `@custom-variant dark` matches this attribute for `dark:` classes
3. Theme preference is stored in localStorage (`starlight-theme` for wiki, `encp-theme` for ENCP)
4. A shared cookie (`wikisites-theme`) persists preference across subdomains
5. Render-blocking scripts in `<head>` apply the theme before paint (prevents FOUC)

### Adding Dark Mode to New Components

```astro
---
// Component code
---

<div class="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
  <h2 class="text-slate-900 dark:text-slate-100">Title</h2>
  <p class="text-slate-600 dark:text-slate-400">Description</p>
  <div class="border-slate-200 dark:border-slate-700">Bordered content</div>
</div>
```

### Using the Component Library

```typescript
import { darkMode } from "../lib/dark-mode";

// Use predefined patterns
<div class={darkMode.card}>Card content</div>
<p class={darkMode.textMuted}>Muted text</p>
<div class={darkMode.success}>Success message</div>
```

### Common Patterns

| Element    | Classes                                                               |
| ---------- | --------------------------------------------------------------------- |
| Card       | `bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800`   |
| Text       | `text-slate-900 dark:text-slate-100`                                  |
| Muted text | `text-slate-600 dark:text-slate-400`                                  |
| Border     | `border-slate-200 dark:border-slate-700`                              |
| Input      | `bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`   |
| Hover      | `hover:bg-slate-50 dark:hover:bg-slate-800`                           |
| Success    | `bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400` |
| Error      | `bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400`         |

## Accessibility

### Contrast Ratios (WCAG 2.1 AA)

All dark mode color combinations pass WCAG 2.1 AA (minimum 4.5:1 for normal text):

| Combination              | Ratio   | Status |
| ------------------------ | ------- | ------ |
| Body text on body bg     | 16.36:1 | PASS   |
| Muted text on body bg    | 7.87:1  | PASS   |
| Card text on card bg     | 11.87:1 | PASS   |
| Link text on body bg     | 10.84:1 | PASS   |
| Header text on header bg | 17.85:1 | PASS   |

### Focus Indicators

All interactive elements have visible focus indicators in both themes:

- Focus ring: `focus:ring-2 focus:ring-[accent-color]`
- Focus offset: `focus:ring-offset-2 dark:focus:ring-offset-slate-900`

### Reduced Motion

Theme transitions respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  body,
  header,
  footer,
  .spatial-card {
    transition: none;
  }
}
```

## Testing

### Unit Tests

```bash
bun run test              # Run all unit tests
bun run test:coverage     # Run with coverage
```

### E2E Tests

```bash
bunx playwright test                                    # Run all E2E tests
bunx playwright test tests/e2e/dark-mode.spec.ts        # Run dark mode tests only
bunx playwright test --update-snapshots                 # Update visual regression baselines
```

### Visual Regression

Screenshots are captured for all routes in both light and dark mode. To update baselines:

```bash
bunx playwright test --update-snapshots
```

Baselines are stored in `tests/e2e/__screenshots__/`.

## Contributing

1. Always add `dark:` variants when using color classes
2. Use the component library (`darkMode.*`) for common patterns
3. Test in both light and dark mode before submitting
4. Run `bunx playwright test` to verify no visual regressions
5. Ensure all contrast ratios pass WCAG 2.1 AA
