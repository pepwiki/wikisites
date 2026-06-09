# ENCP Dark Mode Audit

## Status: DEFERRED

## Findings

The Encyclopeptide site has **zero dark mode support**. All colors are hardcoded light-only.

### Current Design System
- Header: `bg-[#0A1628]` (navy, always dark)
- Body: `bg-white`
- Footer: `bg-slate-50`
- Text: `text-slate-900`
- Accent: `#C9A84C` (gold)
- No theme toggle
- No `dark:` Tailwind variants
- No CSS variable-based theming

### Files Requiring Changes
- `packages/encp/src/styles/global.css` (2 lines -- no dark mode)
- `packages/encp/src/layouts/BaseLayout.astro` (142 lines -- all hardcoded)
- `packages/encp/src/pages/index.astro`
- `packages/encp/src/pages/peptides.astro`
- `packages/encp/src/pages/classification.astro`
- `packages/encp/src/pages/synthesis.astro`
- `packages/encp/src/pages/pharmacology.astro`
- `packages/encp/src/pages/glossary.astro`
- `packages/encp/src/pages/articles/[...slug].astro`

### Recommended Dark Mode Palette
- Header: `bg-[#0A1628]` (keep -- already dark)
- Body: `bg-slate-950`
- Footer: `bg-slate-900`
- Text: `text-slate-100`
- Cards: `bg-slate-800`
- Accent: `#C9A84C` (keep -- gold works on dark)

### Effort Estimate
- 8 pages + 1 layout + 1 CSS file
- ~150 `dark:` variant additions
- No SSR issues (ENCP has no SolidJS components)
- 2-3 hours estimated

### Recommendation
Defer until wiki dark mode is verified in production. ENCP is a separate site with a different design language and user base.
