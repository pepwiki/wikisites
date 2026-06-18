# wikisites

Monorepo for two oligopeptide educational websites.

- **Encyclopeptide** (encyclopeptide.com) -- Academic reference for oligopeptide research
- **Wikipept** (wikipept.com) -- Community-driven learning platform with quizzes, flashcards, and annotations

## Architecture

```
wikisites/
  packages/
    shared/     @wikisites/shared     Zod schemas, types, molecular weight calculation
    query/      @wikisites/query      FSRS v4 spaced repetition, search engine, review store
    workers/    @wikisites/workers    Cloudflare Workers API (health, search, static asset routing)
    encp/       @wikisites/encp       Astro static site for encyclopeptide.com
    wiki/       @wikisites/wiki       Astro + SolidJS static site for wikipept.com
```

Dependency graph:

```
shared  <--  query     <--  encp
shared  <--  query     <--  wiki
shared  <--  workers
```

## Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| Framework      | Astro 5.x (static site generation) |
| UI Components  | SolidJS 1.9                        |
| Styling        | Tailwind CSS 4.x                   |
| Type Safety    | TypeScript 5.9 (strict mode)       |
| Validation     | Zod 3.x                            |
| Testing        | Vitest 3.x + Playwright            |
| Linting        | ESLint 9.x (flat config) + Biome   |
| Formatting     | Prettier 3.x                       |
| Commit Linting | commitlint (Conventional Commits)  |
| Package Mgr    | Bun 1.3                            |
| Hosting        | Cloudflare Pages + Workers         |
| CI/CD          | GitHub Actions (Forgejo-compatible)|

## Prerequisites

- Bun >= 1.1.0
- Node.js 20+ (for TypeScript tooling)

## Quick Start

```bash
bun install
bun run dev        # Starts both encp and wiki dev servers
```

## Commands

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `bun run dev`           | Start both dev servers                  |
| `bun run dev:encp`      | Start encyclopeptide dev server         |
| `bun run dev:wiki`      | Start wikipept dev server               |
| `bun run build`         | Build both sites                        |
| `bun run test`          | Run Vitest test suite (242 tests)       |
| `bun run test:coverage` | Run tests with V8 coverage report       |
| `bun run lint`          | ESLint (flat config)                    |
| `bun run format`        | Prettier format all files               |
| `bun run format:check`  | Prettier check (no write)               |
| `bun run typecheck`     | TypeScript type checking (all packages) |
| `bun run check`         | typecheck + lint + format + test        |
| `bun run clean`         | Remove all dist/ and node_modules/      |

## Testing

Unit tests: 242 tests across 19 test files in 5 packages.

```bash
bun run test              # Run all unit tests
bun run test:coverage     # Run with coverage (80% threshold)
bunx playwright test      # Run E2E tests
```

Coverage thresholds (enforced in `vitest.config.ts`):

| Metric    | Threshold |
| --------- | --------- |
| Lines     | 80%       |
| Branches  | 80%       |
| Functions | 80%       |
| Statements| 80%       |

E2E tests (`tests/e2e/`) cover:

- Dark mode verification across all routes
- Accessibility audit (axe-core WCAG 2.1 AA)
- Visual regression baselines
- Full GUI traversal with DOM/screenshot capture

## CI/CD

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on push/PR to `main`:

1. **Lint, Typecheck, Test** -- ESLint + Prettier + TypeScript + Vitest with coverage
2. **Build** -- Astro static site generation + Pagefind search indexing
3. **E2E** -- Playwright dark mode, accessibility, visual regression
4. **Lighthouse** -- Performance audit (push only)
5. **Deploy** -- Cloudflare Pages (main branch only)

## Deployment

Production deployments target Cloudflare Pages:

- `encyclopeptide.com` via project `wikisites-encp`
- `wikipept.com` via project `wikisites-wiki`

API routes (`/api/health`, `/api/search`) are served by Cloudflare Workers via `wrangler.toml`.

## Pre-commit Hooks

Husky + lint-staged enforce on every commit:

- ESLint auto-fix on `.ts`, `.tsx`, `.js`, `.jsx`
- Prettier formatting on all staged files

Commit messages must follow Conventional Commits (enforced by commitlint).

## Dark Mode

Both sites support dark mode via `data-theme` attribute on `<html>`:

- **Wikipept**: Starlight theme toggle (Auto/Dark/Light), stored in `localStorage` as `starlight-theme`
- **Encyclopeptide**: Custom theme toggle, stored as `encp-theme`
- **Cross-subdomain**: Shared cookie `wikisites-theme` on `.pages.dev` domain

### Adding dark mode to new components

```astro
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <p class="text-slate-600 dark:text-slate-400">Content</p>
</div>
```

### Color palette

| Element     | Light     | Dark      |
| ----------- | --------- | --------- |
| Body bg     | `#f8fafc` | `#020617` |
| Card bg     | `#ffffff` | `#1e293b` |
| Sidebar/Nav | `#ffffff` | `#0f172a` |
| Text        | `#1e293b` | `#e2e8f0` |
| Muted text  | `#64748b` | `#94a3b8` |
| Border      | `#e2e8f0` | `#334155` |
| Accent      | `#0d9488` | `#0d9488` |

## License

See [LICENSE](./LICENSE).
