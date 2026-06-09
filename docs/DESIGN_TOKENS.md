# Design Token Specification

## Overview

Design tokens are the visual design atoms of the design system -- colors, typography, spacing, and other design decisions stored as platform-agnostic variables.

## Color Tokens

### Background

| Token                      | Light     | Dark      | Usage                   |
| -------------------------- | --------- | --------- | ----------------------- |
| `--theme-bg`               | `#f8fafc` | `#020617` | Page background         |
| `--theme-surface`          | `#ffffff` | `#1e293b` | Card/container surface  |
| `--theme-surface-elevated` | `#ffffff` | `#0f172a` | Sidebar, navbar, modals |

### Text

| Token                 | Light     | Dark      | Usage          |
| --------------------- | --------- | --------- | -------------- |
| `--theme-text`        | `#1e293b` | `#e2e8f0` | Primary text   |
| `--theme-text-muted`  | `#64748b` | `#94a3b8` | Secondary text |
| `--theme-text-subtle` | `#94a3b8` | `#64748b` | Tertiary text  |

### Border

| Token                  | Light     | Dark      | Usage            |
| ---------------------- | --------- | --------- | ---------------- |
| `--theme-border`       | `#e2e8f0` | `#334155` | Standard borders |
| `--theme-border-light` | `#f1f5f9` | `#1e293b` | Subtle borders   |

### Accent

| Token                  | Light     | Dark      | Usage              |
| ---------------------- | --------- | --------- | ------------------ |
| `--theme-accent`       | `#0d9488` | `#0d9488` | Primary accent     |
| `--theme-accent-hover` | `#0f766e` | `#14b8a6` | Accent hover state |

### State

| Token             | Light     | Dark      | Usage         |
| ----------------- | --------- | --------- | ------------- |
| `--theme-success` | `#059669` | `#34d399` | Success state |
| `--theme-error`   | `#dc2626` | `#f87171` | Error state   |
| `--theme-warning` | `#d97706` | `#fbbf24` | Warning state |
| `--theme-info`    | `#2563eb` | `#60a5fa` | Info state    |

## Typography Tokens

### Font Families

| Token            | Value                                      | Usage           |
| ---------------- | ------------------------------------------ | --------------- |
| `--font-sans`    | `Inter, system-ui, sans-serif`             | Body text       |
| `--font-serif`   | `Playfair Display, Georgia, serif`         | Headings (ENCP) |
| `--font-heading` | `Plus Jakarta Sans, system-ui, sans-serif` | Headings (wiki) |
| `--font-mono`    | `JetBrains Mono, monospace`                | Code blocks     |

### Font Sizes

| Token         | Value      | Usage            |
| ------------- | ---------- | ---------------- |
| `--text-xs`   | `0.75rem`  | Small text       |
| `--text-sm`   | `0.875rem` | Body small       |
| `--text-base` | `1rem`     | Body default     |
| `--text-lg`   | `1.125rem` | Subheadings      |
| `--text-xl`   | `1.25rem`  | Section headings |
| `--text-2xl`  | `1.5rem`   | Page headings    |

## Spacing Tokens

| Token        | Value     | Usage           |
| ------------ | --------- | --------------- |
| `--space-1`  | `0.25rem` | Tight spacing   |
| `--space-2`  | `0.5rem`  | Small spacing   |
| `--space-4`  | `1rem`    | Default spacing |
| `--space-6`  | `1.5rem`  | Medium spacing  |
| `--space-8`  | `2rem`    | Large spacing   |
| `--space-16` | `4rem`    | Section spacing |

## Border Radius Tokens

| Token           | Value      | Usage          |
| --------------- | ---------- | -------------- |
| `--radius-sm`   | `0.375rem` | Small elements |
| `--radius-md`   | `0.5rem`   | Default radius |
| `--radius-lg`   | `0.75rem`  | Cards          |
| `--radius-xl`   | `1rem`     | Large cards    |
| `--radius-full` | `9999px`   | Pills, circles |

## Shadow Tokens

| Token         | Value                         | Usage           |
| ------------- | ----------------------------- | --------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`  | Subtle shadow   |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`   | Default shadow  |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Elevated shadow |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Modal shadow    |

## Transition Tokens

| Token                 | Value        | Usage           |
| --------------------- | ------------ | --------------- |
| `--transition-fast`   | `150ms ease` | Hover states    |
| `--transition-normal` | `200ms ease` | Theme switching |
| `--transition-slow`   | `300ms ease` | Animations      |

## Usage in CSS

```css
.element {
  background: var(--theme-surface);
  color: var(--theme-text);
  border: 1px solid var(--theme-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: background-color var(--transition-normal);
}
```

## Usage in Tailwind

```html
<div
  class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 rounded-xl p-4 transition-colors duration-200"
>
  Content
</div>
```
