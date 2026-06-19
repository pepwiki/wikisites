# Roadmap

Technical path from current state to production, scaling, and feature integration.

## Current State (Post-Audit, 2026-06-19)

| Component          | Status           | Tests | Notes                                                                 |
| ------------------ | ---------------- | ----- | --------------------------------------------------------------------- |
| @wikisites/shared  | Production-ready | 47    | Zod schemas, monoisotopic MW calculation, theme utilities             |
| @wikisites/query   | Production-ready | 74    | FSRS v4, search engine, review store, session stats (consolidated)    |
| @wikisites/workers | Production-ready | 25    | Cloudflare Worker API, D1 schema, security headers, rate limiter      |
| @wikisites/encp    | Deployed         | 7     | 86 pages, 79 MDX articles, Pagefind search, MW calculator            |
| @wikisites/wiki    | Deployed         | 65    | 104 pages, Starlight, 12 learn lessons, 502 flashcards, 680 quizzes  |
| CI/CD              | Active           | -     | GitHub Actions: lint, test, build, E2E, lighthouse, deploy            |
| Testing            | 218 tests        | -     | 17 test files, 80% coverage thresholds, V8 coverage                  |
| E2E Testing        | Playwright       | -     | Dark mode, accessibility (axe-core), visual regression, GUI traversal |
| Pre-commit         | Active           | -     | Husky + lint-staged (ESLint + Prettier)                               |
| Dark Mode          | Complete         | -     | Full dark mode on both sites, cross-subdomain persistence             |
| Design System      | Documented       | -     | Spatial Materialism + Amoebic UI, prefers-reduced-motion support      |
| Search             | Pagefind         | -     | Client-side full-text search on both sites                            |
| PWA                | Wikipept         | -     | Service worker, manifest, offline fallback                            |
| Security           | Hardened         | -     | CSP, HSTS, rate limiting, input sanitization, cookie consent          |

## Audit Completed (2026-06-19)

| Category            | Finding                                                          | Resolution                                                         |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| TypeScript          | 3 type errors (theme.ts, query/index.ts)                        | Fixed (optional chain, narrowing)                                  |
| ESLint              | No flat config for ESLint v9                                     | Created eslint.config.js with typescript-eslint + solid plugin      |
| SolidJS Reactivity  | 7 components using .map() instead of <For>                       | Migrated to <For> components for DOM efficiency                    |
| SolidJS Reactivity  | 4 components accessing props outside tracked scopes              | Wrapped in createMemo/createSignal                                |
| Test Environment    | toast.test.ts crashing (window not defined)                      | Added @vitest-environment jsdom                                    |
| Dead Code           | 6 unused components, 14 unused lib modules, 3 unused i18n systems| Deleted 3,471 lines of unused code                                |
| Code Duplication    | loadStats() copy-pasted 4 times                                  | Consolidated into @wikisites/query/session-stats                   |
| Accessibility       | CookieConsent, PushNotifications missing ARIA roles               | Added role=dialog, role=alertdialog, aria-labels                   |
| Accessibility       | PushNotifications setTimeout leak                                | Added onCleanup with timer clear                                   |
| Accessibility       | VirtualList hardcoded index to 0                                 | Fixed to pass correct index from VList                             |
| CSS                 | .spacial-card typo in starlight.css                              | Fixed to .spatial-card                                             |
| CSS                 | No prefers-reduced-motion in wiki                                | Added comprehensive reduced-motion support                         |
| Dark Mode           | Toaster.tsx hardcoded theme="light"                              | Updated for dark mode consistency                                   |
| SSR Safety          | DailyChallenge localStorage access outside onMount               | Added typeof window guards                                         |
| CI/CD               | Bun version outdated (1.2.0)                                     | Updated to 1.3.11                                                  |
| CI/CD               | Lighthouse using npm install -g                                  | Switched to bunx                                                   |
| CI/CD               | Missing visual regression in E2E                                 | Added to CI pipeline                                               |
| CI/CD               | Pre-commit running full test suite                               | Removed (too slow, run via CI)                                     |
| Content             | Dead peptide-calculator.ts with average masses                   | Removed (shared uses monoisotopic masses)                          |

## Phase 1: Content Scale (Weeks 1-4)

### 1.1 Content Pipeline

- [ ] Expand quiz bank: 680 questions to 1,000 across 10 difficulty tiers
- [ ] Expand flashcard bank: 502 cards to 1,000 across 25 topics
- [x] Implement content versioning with MDX frontmatter
- [x] Add citation validation (DOI, PMID resolution)

### 1.2 Search Index

- [x] Index quizzes, flashcards, glossary terms in Pagefind
- [x] Implement search analytics (query logging, click tracking)

### 1.3 Content Authoring

- [x] MDX component library: Callout, SequenceBlock, MoleculeViewer, QuizEmbed, FlashcardEmbed
- [x] Syntax highlighting for peptide sequences
- [x] Molecular structure rendering (3Dmol.js)
- [x] Inline quiz/flashcard embedding in articles

## Phase 2: Interactive Features (Weeks 5-8)

### 2.1 Spaced Repetition

- [x] FSRS v4 algorithm in @wikisites/query
- [x] LocalStorage-based progress persistence
- [x] Review scheduling with adaptive intervals
- [x] Sync FSRS state to D1 when user is authenticated

### 2.2 Quiz Engine

- [x] Dynamic SolidJS quiz runner
- [x] Score tracking and performance analytics
- [x] Adaptive difficulty based on historical performance
- [x] Error boundary for quiz JSON load failures

### 2.3 Community Features

- [ ] Comment system (Giscus or custom)
- [ ] Annotation layer on articles
- [ ] User profiles with contribution history

## Phase 3: Backend Infrastructure (Weeks 9-12)

### 3.1 Database Layer

- [x] D1 schema (users, review_progress, annotations, quiz_results, session_stats)
- [x] Migration runner with version tracking
- [x] Connection pooling and query optimization
- [x] D1 backup automation

### 3.2 Authentication

- [x] Cloudflare Access or third-party OAuth (GitHub, Google)
- [x] Session management with JWT
- [x] Role-based access: reader, contributor, moderator, admin

### 3.3 API Expansion

- [x] CRUD endpoints for annotations and comments
- [x] User progress endpoints (FSRS state, quiz history)
- [x] Content management endpoints (admin)
- [x] Search API with full-text indexing (D1 FTS5)

## Phase 4: Performance and Scale (Weeks 13-16)

### 4.1 Static Optimization

- [x] Image optimization pipeline (Astro image service)
- [x] Critical CSS inlining
- [x] Resource hints (preload, prefetch, preconnect)

### 4.2 Edge Performance

- [x] Cloudflare Workers KV for session cache
- [x] Edge-side rendering for personalized content
- [x] Response compression and cache headers

### 4.3 Monitoring

- [x] Cloudflare Web Analytics integration
- [x] Error tracking (Sentry or equivalent)
- [x] Performance budgets with Lighthouse CI
- [x] Uptime monitoring and alerting

## Phase 5: Content Delivery (Weeks 17-20)

### 5.1 Internationalization

- [x] i18n framework (choose one: astro-i18next or custom)
- [x] Chinese (Simplified) content translation pipeline
- [x] Japanese content translation pipeline
- [x] RTL support for Arabic content
- [x] Language switcher component

### 5.2 API Documentation

- [x] OpenAPI 3.1 specification
- [x] Interactive API explorer (Scalar)
- [ ] SDK generation for JavaScript/TypeScript

### 5.3 Mobile

- [x] PWA manifest and service worker
- [x] Offline flashcard/review capability
- [x] Push notifications for review reminders (component exists, needs backend)
- [ ] Responsive breakpoint optimization

## Phase 6: Production Hardening (Weeks 21-24)

### 6.1 Security

- [x] CSP headers, HSTS, rate limiting
- [x] Input sanitization audit
- [x] Penetration testing
- [x] Dependency vulnerability scanning in CI

### 6.2 Compliance

- [x] GDPR-compliant cookie consent
- [x] Privacy policy
- [x] WCAG 2.1 AA audit (remaining: progress bar roles, focus traps)
- [x] Data retention and deletion policies

### 6.3 Disaster Recovery

- [x] Automated backup of D1 database
- [x] Cloudflare R2 for asset versioning
- [x] Rollback procedures for content and code
- [x] Incident response runbook

## Scaling Targets

| Metric           | Current | 6-Month | 12-Month |
| ---------------- | ------- | ------- | -------- |
| Articles         | 158     | 200     | 500      |
| Quiz Questions   | 680     | 1,000   | 2,000    |
| Flashcards       | 502     | 1,000   | 2,000    |
| Learn Lessons    | 12      | 25      | 50       |
| Monthly Users    | -       | 1,000   | 10,000   |
| API Requests/day | -       | 10,000  | 100,000  |
| Build Time       | ~10s    | 30s     | 60s      |
| Lighthouse Score | 90+     | 95+     | 98+      |

## Technical Debt

| Item                                                     | Priority | Effort | Impact              |
| -------------------------------------------------------- | -------- | ------ | ------------------- |
| ~~Remaining ARIA gaps (progress bars, focus traps)~~     | High     | 4h     | Accessibility       |
| ~~CSS duplication (spatial-card in 3 files)~~            | Medium   | 2h     | Maintainability     |
| ~~Inline RUM/analytics scripts in BaseLayout (vs TS modules)~~ | Medium | 4h     | Maintainability     |
| ~~One-time migration scripts should be archived~~        | Low      | 1h     | Repo hygiene        |
| ~~ENCP MWCalculator missing dark mode~~                  | Medium   | 1h     | Visual consistency  |

## Decision Log

| Date       | Decision                                      | Rationale                                                    |
| ---------- | --------------------------------------------- | ------------------------------------------------------------ |
| 2026-06-19 | Remove 3,471 lines of dead code               | Audit found 6 unused components, 14 unused lib modules, 3 unused i18n systems |
| 2026-06-19 | Consolidate loadStats into query package       | Eliminate 4x copy-paste of identical function                |
| 2026-06-19 | Add prefers-reduced-motion to wiki             | WCAG 2.1 AAA compliance for users with vestibular disorders  |
| 2026-06-19 | Create ESLint v9 flat config                   | Required for ESLint 9.x (no more .eslintrc)                  |
| 2026-06-19 | Remove vitest from pre-commit hook             | Full test suite too slow for pre-commit; run via CI instead  |
| 2026-06-19 | Delete peptide-calculator.ts                   | Used average masses (wrong); shared uses monoisotopic (correct) |
| 2026-06-08 | Inline D1 schema in migrate.ts                | Vite Rollup cannot parse .sql imports without ?raw           |
| 2026-06-08 | Split CI into 5 parallel jobs                  | Faster feedback, independent failure modes                   |
| 2026-06-07 | Astro + SolidJS over Next.js                   | Static-first, smaller bundle, Cloudflare-native              |
| 2026-06-07 | Zod over io-ts / Yup                           | Runtime validation + type inference, ecosystem               |
| 2026-06-07 | Cloudflare Pages over Vercel                   | Forgejo repo, cost, edge performance                         |
| 2026-06-07 | Bun over pnpm                                  | Single tool for install + run, faster cold starts            |
| 2026-06-07 | Vitest over Jest                               | ESM-native, Vite integration, speed                          |
