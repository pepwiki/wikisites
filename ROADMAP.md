# Roadmap

Technical path from current state to production, scaling, and feature integration.

## Current State (v1.1.0)

| Component          | Status           | Notes                                                                   |
| ------------------ | ---------------- | ----------------------------------------------------------------------- |
| @wikisites/shared  | Production-ready | Zod schemas, molecular weight calculation, 58 tests                     |
| @wikisites/query   | Production-ready | FSRS v4 algorithm, search engine, review store, 76 tests                |
| @wikisites/workers | Production-ready | Cloudflare Worker API (health, search, static assets), 10 tests         |
| @wikisites/encp    | Deployed         | 7 static pages, Spatial Materialism + Amoebic UI design system          |
| @wikisites/wiki    | Deployed         | 7 static pages, 4 SolidJS components, 29 flashcards, 23 quiz questions  |
| CI/CD              | Active           | Forgejo Actions: lint, test, typecheck, build, deploy (5 parallel jobs) |
| Testing            | 151 tests        | All packages, 80% coverage thresholds, V8 coverage installed            |
| Pre-commit         | Active           | Husky + lint-staged (Prettier enforced, ESLint run manually)            |
| Design System      | Applied          | Spatial Materialism + Amoebic UI CSS framework                          |
| Deployment         | Cloudflare Pages | encyclopeptide.com, wikipept.com                                        |

## Audit Completed (2026-06-08)

| Category         | Finding                                             | Resolution                                                      |
| ---------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| TypeScript       | 10 errors in query package                          | Fixed (null safety, unused imports, PARAMS.w[12] out-of-bounds) |
| FSRS Algorithm   | PARAMS.w had 12 elements but code accessed index 12 | Added 13th parameter                                            |
| Code Duplication | getStatusLabel/getStatusColor in 2 components       | Extracted to card-status module                                 |
| Test Coverage    | No tests for FSRS stability correctness             | Added 18 new tests                                              |
| CI Pipeline      | Monolithic job, curl-bash install, no caching       | Split into 5 parallel jobs, official Bun action                 |
| Dockerfile       | Incorrect health check path                         | Fixed to /encp/                                                 |
| Design           | No design system applied                            | Spatial Materialism + Amoebic UI CSS framework added            |
| Formatting       | 4 files with Prettier violations                    | Fixed                                                           |

## Phase 1: Content Scale (Weeks 1-4)

### 1.1 Content Pipeline

- [ ] Create 20 oligopeptide MDX articles per site (40 total)
- [ ] Build quiz bank: 100 questions across 10 difficulty tiers
- [ ] Build flashcard bank: 500 cards across 25 topics
- [ ] Implement content versioning with MDX frontmatter
- [ ] Add citation validation (DOI, PMID resolution)

### 1.2 Search Index

- [ ] Integrate Pagefind for static search indexing
- [ ] Add client-side search to both sites
- [ ] Index MDX content, quizzes, flashcards, glossary terms
- [ ] Implement search analytics (query logging, click tracking)

### 1.3 Content Authoring

- [ ] MDX component library: Callout, Table, CodeBlock, MathBlock
- [ ] Syntax highlighting for peptide sequences
- [ ] Molecular structure rendering (3Dmol.js or NGL Viewer)
- [ ] Inline quiz/flashcard embedding in articles

## Phase 2: Interactive Features (Weeks 5-8)

### 2.1 Spaced Repetition (FSRS)

- [x] Implement FSRS v4 algorithm in @wikisites/query
- [x] LocalStorage-based progress persistence
- [x] Review scheduling with adaptive intervals
- [ ] Session statistics (accuracy, retention rate, time spent)

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

- [ ] Cloudflare D1 for user data, progress, annotations
- [ ] Schema: users, sessions, reviews, annotations, contributions
- [ ] Migration scripts and seed data
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

- [ ] PWA manifest and service worker
- [ ] Offline flashcard/review capability
- [ ] Push notifications for review reminders
- [ ] Responsive breakpoint optimization

## Phase 6: Production Hardening (Weeks 21-24)

### 6.1 Security

- [ ] Content Security Policy headers
- [ ] CSRF protection on write endpoints
- [ ] Input sanitization audit (DOMPurify for MDX)
- [ ] Dependency vulnerability scanning (automated)

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
| Articles         | 0       | 40      | 200      |
| Quiz Questions   | 23      | 100     | 500      |
| Flashcards       | 29      | 500     | 2000     |
| Monthly Users    | 0       | 1,000   | 10,000   |
| API Requests/day | 0       | 10,000  | 100,000  |
| Build Time       | ~10s    | 30s     | 60s      |
| Lighthouse Score | N/A     | 90+     | 95+      |

## Technical Debt

| Item                                                         | Priority | Effort | Impact               |
| ------------------------------------------------------------ | -------- | ------ | -------------------- |
| ESLint hangs in pre-commit (flat config + typescript-eslint) | High     | 4h     | Dev workflow         |
| TypeScript tsc hangs on Node v26                             | Medium   | 2h     | CI reliability       |
| No Playwright E2E tests in CI                                | Medium   | 8h     | GUI regression       |
| No content pages for /articles/\* routes                     | High     | 16h    | 404 errors           |
| Dockerfile needs production testing                          | Medium   | 4h     | Container deployment |

## Decision Log

| Date       | Decision                             | Rationale                                                |
| ---------- | ------------------------------------ | -------------------------------------------------------- |
| 2026-06-08 | Extract card-status to query package | DRY: eliminates duplicated getStatusLabel/getStatusColor |
| 2026-06-08 | Split CI into 5 parallel jobs        | Faster feedback, independent failure modes               |
| 2026-06-08 | Use oven-sh/setup-bun in CI          | Security: eliminates curl-bash pipe                      |
| 2026-06-08 | Apply Spatial Materialism design     | Visual depth and organic forms for both sites            |
| 2026-06-07 | Astro + SolidJS over Next.js         | Static-first, smaller bundle, Cloudflare-native          |
| 2026-06-07 | Zod over io-ts / Yup                 | Runtime validation + type inference, ecosystem           |
| 2026-06-07 | Cloudflare Pages over Vercel         | Forgejo repo, cost, edge performance                     |
| 2026-06-07 | Bun over pnpm                        | Single tool for install + run, faster cold starts        |
| 2026-06-07 | Vitest over Jest                     | ESM-native, Vite integration, speed                      |
