# Roadmap

Technical path from current state to production, scaling, and feature integration.

## Current State (v1.6.0)

| Component          | Status           | Notes                                                                                   |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------- |
| @wikisites/shared  | Production-ready | Zod schemas, molecular weight calculation, 58 tests                                     |
| @wikisites/query   | Production-ready | FSRS v4 algorithm, search engine, review store, session-stats, 92 tests                 |
| @wikisites/workers | Production-ready | Cloudflare Worker API, D1 schema, security headers, rate limiter, 10 tests              |
| @wikisites/encp    | Deployed         | 86 pages, 79 MDX articles, Pagefind search, Spatial Materialism + Amoebic UI            |
| @wikisites/wiki    | Deployed         | 104 pages, Starlight framework, 12 learn lessons, 502 flashcards, 680 quizzes, PWA      |
| CI/CD              | Active           | Forgejo Actions: lint, test, typecheck, build, deploy, Lighthouse CI (5 parallel jobs)  |
| Testing            | 208 tests        | 15 test files across 5 packages, 80% coverage thresholds, V8 coverage                   |
| Pre-commit         | Active           | Husky + lint-staged (ESLint + Prettier + Vitest enforced)                               |
| Framework          | Starlight        | Sidebar nav, dark mode, search, TOC, sitemap                                            |
| Design System      | Applied          | Spatial Materialism + Amoebic UI CSS framework                                          |
| Search             | Pagefind         | Client-side full-text search on both sites                                              |
| Interactive        | SolidJS          | Quiz session, flashcard deck, review dashboard, daily challenge                         |
| PWA                | Wikipept         | Service worker, manifest, offline fallback                                              |
| Security           | Hardened         | CSP headers, HSTS, rate limiting, input sanitization, privacy policy, cookie consent    |
| Database           | Schema Ready     | D1 schema (users, reviews, annotations, quiz_results, session_stats) + migration runner |
| Deployment         | Cloudflare Pages | encyclopeptide.com, wikipept.com                                                        |

## Audit Completed (2026-06-08)

| Category            | Finding                                                           | Resolution                                                      |
| ------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| TypeScript          | 10 errors in query package                                        | Fixed (null safety, unused imports, PARAMS.w[12] out-of-bounds) |
| FSRS Algorithm      | PARAMS.w had 12 elements but code accessed index 12               | Added 13th parameter                                            |
| Code Duplication    | getStatusLabel/getStatusColor in 2 components                     | Extracted to card-status module                                 |
| Code Duplication    | MWCalculator duplicated residue weights from shared module        | Refactored to import from @wikisites/shared                     |
| Test Coverage       | No tests for encp, wiki DailyChallenge, worker security           | Added 30 new tests across 4 new test files                      |
| Worker Rate Limiter | setInterval at module scope (invalid in CF Workers runtime)       | Replaced with lazy eviction on each checkRateLimit call         |
| Window Pollution    | SessionStats exposed API via window.\_\_sessionStats              | Refactored to use SolidJS context (SessionContext)              |
| CSS                 | Invalid variable name --sl-color-bg navbar in starlight.css       | Fixed to --sl-color-bg-navbar                                   |
| Dead Files          | content.config.ts.bak left in wiki package                        | Deleted                                                         |
| Non-null Assertions | search.ts used `!` on already-validated Zod output                | Removed redundant assertions                                    |
| CI Pipeline         | Monolithic single job, no caching, no concurrency control         | Split into lint+test / build / lighthouse / deploy jobs         |
| Accessibility       | ENCP pages missing aria-labelledby, article elements, focus rings | Added semantic HTML, aria attributes, focus ring styling        |
| Playwright          | No E2E test config or traversal tests                             | Created playwright.config.ts + GUI snapshot traversal spec      |

## Phase 1: Content Scale (Weeks 1-4)

### 1.1 Content Pipeline

- [x] Create 79 MDX articles per site (158 total)
- [ ] Build quiz bank: 23 questions (expand to 100 across 10 difficulty tiers)
- [ ] Build flashcard bank: 29 cards (expand to 500 across 25 topics)
- [ ] Implement content versioning with MDX frontmatter
- [ ] Add citation validation (DOI, PMID resolution)

### 1.2 Search Index

- [x] Integrate Pagefind for static search indexing
- [x] Add client-side search to both sites (via #search mount in BaseLayout)
- [ ] Index MDX content, quizzes, flashcards, glossary terms
- [ ] Implement search analytics (query logging, click tracking)

### 1.3 Content Authoring

- [ ] MDX component library: Callout, Table, CodeBlock, MathBlock
- [ ] Syntax highlighting for peptide sequences
- [ ] Molecular structure rendering (3Dmol.js or NGL Viewer)
- [ ] Inline quiz/flashcard embedding in articles
- [x] Learn content: 12 educational lessons (beginner to expert)

## Phase 2: Interactive Features (Weeks 5-8)

### 2.1 Spaced Repetition (FSRS)

- [x] Implement FSRS v4 algorithm in @wikisites/query
- [x] LocalStorage-based progress persistence
- [x] Review scheduling with adaptive intervals
- [x] Session statistics (accuracy, retention rate, time spent)

### 2.2 Quiz Engine

- [x] Convert static quiz pages to dynamic SolidJS quiz runner
- [x] Implement Quiz component with state machine (idle, answering, reviewing)
- [ ] Score tracking and performance analytics
- [ ] Adaptive difficulty based on historical performance

### 2.3 Community Features

- [ ] Comment system (Giscus or custom)
- [ ] Annotation layer on articles
- [ ] Contribution guidelines with MDX templates
- [ ] User profiles with contribution history

## Phase 3: Backend Infrastructure (Weeks 9-12)

### 3.1 Database Layer

- [x] Cloudflare D1 schema for user data, progress, annotations
- [x] Schema: users, review_progress, annotations, quiz_results, session_stats
- [x] Migration runner with version tracking
- [ ] Connection pooling and query optimization

### 3.2 Authentication

- [ ] Cloudflare Access or third-party OAuth (GitHub, Google)
- [ ] Session management with JWT
- [ ] Role-based access: reader, contributor, moderator, admin
- [ ] Rate limiting on write operations

### 3.3 API Expansion

- [ ] CRUD endpoints for annotations and comments
- [ ] User progress endpoints (FSRS state, quiz history)
- [ ] Content management endpoints (admin)
- [ ] Search API with full-text indexing (D1 FTS5)

## Phase 4: Performance & Scale (Weeks 13-16)

### 4.1 Static Optimization

- [ ] Image optimization pipeline (Astro image service)
- [ ] Critical CSS inlining
- [ ] Service worker for offline flashcard/review sessions
- [ ] Resource hints (preload, prefetch, preconnect)

### 4.2 Edge Performance

- [ ] Cloudflare Workers KV for session cache
- [ ] Edge-side rendering for personalized content
- [ ] Response compression and cache headers

### 4.3 Monitoring

- [ ] Cloudflare Web Analytics integration
- [ ] Error tracking (Sentry or equivalent)
- [ ] Performance budgets with Lighthouse CI
- [ ] Uptime monitoring and alerting

## Phase 5: Content Delivery (Weeks 17-20)

### 5.1 Internationalization

- [ ] i18n framework (astro-i18next or custom)
- [ ] Chinese (Simplified) content translation pipeline
- [ ] Japanese content translation pipeline
- [ ] RTL support for Arabic content
- [ ] Language switcher component

### 5.2 API Documentation

- [ ] OpenAPI 3.1 specification
- [ ] Interactive API explorer (Swagger UI or Scalar)
- [ ] SDK generation for JavaScript/TypeScript
- [ ] Rate limit documentation and usage guides

### 5.3 Mobile

- [x] PWA manifest and service worker
- [x] Offline flashcard/review capability (service worker with CacheFirst strategy)
- [ ] Push notifications for review reminders
- [ ] Responsive breakpoint optimization

## Phase 6: Production Hardening (Weeks 21-24)

### 6.1 Security

- [x] Content Security Policy headers
- [x] CSRF protection on write endpoints
- [x] Input sanitization audit (DOMPurify for MDX)
- [x] Rate limiting on API endpoints

### 6.2 Compliance

- [ ] GDPR-compliant cookie consent
- [ ] Privacy policy and terms of service
- [ ] Data retention and deletion policies
- [ ] Accessibility audit (WCAG 2.1 AA)

### 6.3 Disaster Recovery

- [ ] Automated backup of D1 database
- [ ] Cloudflare R2 for asset versioning
- [ ] Rollback procedures for content and code
- [ ] Incident response runbook

## Scaling Targets

| Metric           | Current | 6-Month | 12-Month |
| ---------------- | ------- | ------- | -------- |
| Articles         | 158     | 200     | 500      |
| Quiz Questions   | 23      | 100     | 500      |
| Flashcards       | 29      | 500     | 2000     |
| Learn Lessons    | 12      | 25      | 50       |
| Monthly Users    | 0       | 1,000   | 10,000   |
| API Requests/day | 0       | 10,000  | 100,000  |
| Build Time       | ~10s    | 30s     | 60s      |
| Lighthouse Score | N/A     | 90+     | 95+      |

## Technical Debt

| Item                                                   | Priority | Effort | Impact               |
| ------------------------------------------------------ | -------- | ------ | -------------------- |
| ESLint hangs on TSX (typescript-eslint overhead)       | Medium   | 2h     | Pre-commit speed     |
| No Playwright E2E tests in CI                          | Medium   | 8h     | GUI regression       |
| Playwright config and traversal script created         | Done     | -      | Phase 3 complete     |
| Dockerfile needs production testing                    | Medium   | 4h     | Container deployment |
| Wiki articles need prose styling (Tailwind Typography) | Low      | 2h     | Article readability  |

## Decision Log

| Date       | Decision                                      | Rationale                                                         |
| ---------- | --------------------------------------------- | ----------------------------------------------------------------- |
| 2026-06-08 | Inline D1 schema in migrate.ts                | Vite Rollup cannot parse .sql imports without ?raw                |
| 2026-06-08 | Add D1 schema, security headers, rate limiter | Production-ready backend infrastructure for future auth           |
| 2026-06-08 | Create 12 learn content lessons               | Fill placeholder /learn/\* routes with actual educational content |
| 2026-06-08 | Add PWA manifest + service worker             | Offline flashcard/review capability for mobile learners           |
| 2026-06-08 | Add SessionStats component                    | Client-side analytics for learning progress tracking              |
| 2026-06-08 | Wire Pagefind search into BaseLayout          | Search accessible from every page via nav bar                     |
| 2026-06-08 | Extract card-status to query package          | DRY: eliminates duplicated getStatusLabel/getStatusColor          |
| 2026-06-08 | Split CI into 5 parallel jobs                 | Faster feedback, independent failure modes                        |
| 2026-06-08 | Use oven-sh/setup-bun in CI                   | Security: eliminates curl-bash pipe                               |
| 2026-06-08 | Apply Spatial Materialism design              | Visual depth and organic forms for both sites                     |
| 2026-06-07 | Astro + SolidJS over Next.js                  | Static-first, smaller bundle, Cloudflare-native                   |
| 2026-06-07 | Zod over io-ts / Yup                          | Runtime validation + type inference, ecosystem                    |
| 2026-06-07 | Cloudflare Pages over Vercel                  | Forgejo repo, cost, edge performance                              |
| 2026-06-07 | Bun over pnpm                                 | Single tool for install + run, faster cold starts                 |
| 2026-06-07 | Vitest over Jest                              | ESM-native, Vite integration, speed                               |
