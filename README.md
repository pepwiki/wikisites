# wikisites

Monorepo for two oligopeptide educational websites: 98 articles, 29 flashcards, 23 quiz questions

- **Encyclopeptide** (encyclopeptide.com) -- Academic reference for oligopeptide research
- **Wikipept** (wikipept.com) -- Community-driven learning platform with quizzes, flashcards, and annotations

## Architecture

```
wikisites/
  packages/
    shared/     @wikisites/shared     Zod schemas, types, molecular weight calculation
    query/      @wikisites/query      Peptide search engine with Zod-validated input
    workers/    @wikisites/workers    Cloudflare Workers API (health, search, static asset routing)
    encp/       @wikisites/encp       Astro static site for encyclopeptide.com
    wiki/       @wikisites/wiki       Astro + SolidJS static site for wikipept.com
```

**Dependency graph:**

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
| Linting        | ESLint 9.x + Prettier 3.x          |
| Commit Linting | commitlint (Conventional Commits)  |
| Package Mgr    | Bun 1.3                            |
| Hosting        | Cloudflare Pages + Workers         |
| CI/CD          | GitHub Actions                     |

## Dark Mode

Both sites support dark mode via Tailwind's `dark:` variant system:

- **Wikipept**: Starlight theme toggle (Auto/Dark/Light) stored in `localStorage` as `starlight-theme`, applied via `data-theme="dark"` attribute on `<html>`
- **Encyclopeptide**: Custom theme toggle in header, stored as `encp-theme`, applied via `data-theme="dark"` attribute

### Adding dark mode to new components

```astro
<!-- Use dark: variants for all color classes -->
<div class="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
  <p class="text-slate-600 dark:text-slate-400">Content</p>
</div>
```

### Color palette (dark mode)

| Element     | Light     | Dark      |
| ----------- | --------- | --------- |
| Body bg     | `#f8fafc` | `#020617` |
| Card bg     | `#ffffff` | `#1e293b` |
| Sidebar/Nav | `#ffffff` | `#0f172a` |
| Text        | `#1e293b` | `#e2e8f0` |
| Muted text  | `#64748b` | `#94a3b8` |
| Border      | `#e2e8f0` | `#334155` |
| Accent      | `#0d9488` | `#0d9488` |

### Testing dark mode

```bash
bunx playwright test tests/e2e/dark-mode.spec.ts --reporter=list
```

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
| `bun run test`          | Run Vitest test suite                   |
| `bun run test:coverage` | Run tests with V8 coverage report       |
| `bun run lint`          | ESLint                                  |
| `bun run format`        | Prettier format all files               |
| `bun run typecheck`     | TypeScript type checking (all packages) |
| `bun run check`         | typecheck + lint + format + test        |
| `bun run clean`         | Remove all dist/ and node_modules/      |

## Testing

```bash
bun run test              # Run all unit tests
bun run test:coverage     # Run with coverage (80% threshold)
bunx playwright test      # Run E2E tests
```

Coverage thresholds (enforced in `vitest.config.ts`):

- Lines: 80%
- Branches: 80%
- Functions: 80%
- Statements: 80%

E2E tests (`tests/e2e/`) verify:

- All 22 wiki routes render in light and dark mode
- Theme toggle correctly sets `data-theme` attribute
- Body/header backgrounds are dark in dark mode
- No SSR errors on custom pages (quizzes, flashcards, review, daily)

## CI/CD

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on push/PR to `main`:

1. **Lint** -- ESLint + Prettier format check
2. **Type Check** -- TypeScript strict mode validation
3. **Test** -- Vitest with coverage reporting
4. **Build** -- Astro static site generation for both sites
5. **E2E** -- Playwright dark mode verification
6. **Lighthouse** -- Performance audit (push only)
7. **Deploy** -- Cloudflare Pages deployment (main branch only)

## Deployment

Production deployments target Cloudflare Pages:

- `encyclopeptide.com` via project `wikisites-encp`
- `wikipept.com` via project `wikisites-wiki`

API routes (`/api/health`, `/api/search`) are served by Cloudflare Workers via `wrangler.toml`.

## Pre-commit Hooks

Husky + lint-staged enforce on every commit:

- ESLint auto-fix on `.ts`, `.tsx`, `.js`, `.jsx`
- Prettier formatting on all staged files
- TypeScript type checking on `.ts`, `.tsx`
- Full test suite execution

Commit messages must follow Conventional Commits (enforced by commitlint).

## License

See [LICENSE](./LICENSE).
