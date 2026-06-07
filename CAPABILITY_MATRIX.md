# CAPABILITY_MATRIX.md — Wikisites Project Capability Assessment

**Document ID:** CAP-MAT-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Phase -0.5 Environment Materialization
**Scope:** encyclopeptide.com and wikipept.com
**Phase:** -0.5 (Environment Materialization)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Capability Inventory](#2-capability-inventory)
3. [Tool Version Matrix](#3-tool-version-matrix)
4. [Capability Gap Analysis](#4-capability-gap-analysis)
5. [Remediation Plan](#5-remediation-plan)
6. [Environment Validation Checklist](#6-environment-validation-checklist)
7. [Appendix: Criticality Definitions](#7-appendix-criticality-definitions)

---

## 1. Executive Summary

This document provides a comprehensive capability matrix for the Wikisites project, mapping every required capability against currently available tools and identifying gaps that must be resolved before Phase 0 (Scaffold) can begin. The matrix covers the full technology stack: frontend frameworks, styling, content management, deployment infrastructure, build tools, testing, analytics, search, internationalization, code quality, and development tooling.

**Current Phase:** -0.5 (Environment Materialization)
**Overall Readiness:** ~40% — Core runtime available; framework dependencies not yet installed

### Key Findings

| Category                  | Available | Required | Gaps | Readiness |
| ------------------------- | --------- | -------- | ---- | --------- |
| Runtime & Package Mgmt    | 3         | 3        | 0    | 100%      |
| Frontend Framework        | 0         | 3        | 3    | 0%        |
| Styling                   | 0         | 1        | 1    | 0%        |
| Content Management        | 0         | 2        | 2    | 0%        |
| Deployment Infrastructure | 1         | 5        | 4    | 20%       |
| Testing                   | 0         | 5        | 5    | 0%        |
| Search                    | 0         | 2        | 2    | 0%        |
| Analytics                 | 0         | 1        | 1    | 0%        |
| Internationalization      | 0         | 1        | 1    | 0%        |
| Code Quality              | 0         | 3        | 3    | 0%        |
| Build Tools               | 0         | 2        | 2    | 0%        |
| Dev Tooling               | 4         | 4        | 0    | 100%      |

**Critical Insight:** The environment has Node.js, pnpm, and Git available at the system level. All framework dependencies (Astro, SolidJS, Tailwind CSS, TypeScript), testing tools (Vitest, Playwright, LHCI), code quality tools (ESLint, Prettier), and Cloudflare tooling (Wrangler, Workers Types) must be installed via `pnpm install` after `package.json` is created in Phase 0.

---

## 2. Capability Inventory

### 2.1 Available Capabilities (System Level)

These capabilities are present on the development machine and do not require project-level installation.

| Capability         | Tool    | Version  | Status                 | Source       |
| ------------------ | ------- | -------- | ---------------------- | ------------ |
| JavaScript Runtime | Node.js | 20.x LTS | Installed              | System / nvm |
| Package Manager    | pnpm    | 9.x      | Available via corepack | corepack     |
| Version Control    | Git     | 2.x      | Installed              | System       |
| HTTP Client        | curl    | 8.x      | Installed              | System       |
| JSON Processing    | jq      | 1.6+     | Installed              | System       |
| Text Search        | ripgrep | 14.x     | Installed              | System       |
| File Finding       | fd      | 8.x      | Installed              | System       |
| Nix                | Nix     | 2.x      | Available              | nix develop  |
| Docker             | Docker  | 24.x     | Available              | System       |

### 2.2 Required Capabilities (Project Level)

These capabilities must be installed as project dependencies via `pnpm add` after `package.json` creation.

| Capability                    | Tool                             | Required Version | Status              | Criticality | Install Command                                                          |
| ----------------------------- | -------------------------------- | ---------------- | ------------------- | ----------- | ------------------------------------------------------------------------ |
| **Frontend Framework**        |                                  |                  |                     |             |                                                                          |
| Static Site Generator         | Astro                            | ≥5.0.0, <6.0.0   | Pending             | Critical    | `pnpm add astro`                                                         |
| Reactive UI                   | SolidJS                          | ≥1.8.0, <2.0.0   | Pending             | Critical    | `pnpm add solid-js @astrojs/solid-js`                                    |
| Astro SolidJS Integration     | @astrojs/solid-js                | ≥4.0.0           | Pending             | Critical    | `pnpm add @astrojs/solid-js`                                             |
| **Styling**                   |                                  |                  |                     |             |                                                                          |
| CSS Framework                 | Tailwind CSS                     | ≥4.0.0, <5.0.0   | Pending             | Critical    | `pnpm add tailwindcss @tailwindcss/vite`                                 |
| Typography Plugin             | @tailwindcss/typography          | ≥0.5.0           | Pending             | High        | `pnpm add @tailwindcss/typography`                                       |
| **Content Management**        |                                  |                  |                     |             |                                                                          |
| Markdown + JSX                | MDX                              | ≥3.0.0, <4.0.0   | Pending             | Critical    | `pnpm add mdx @astrojs/mdx`                                              |
| Astro MDX Integration         | @astrojs/mdx                     | ≥4.0.0           | Pending             | Critical    | `pnpm add @astrojs/mdx`                                                  |
| Schema Validation             | Zod                              | ≥3.22.0, <4.0.0  | Pending             | Critical    | `pnpm add zod`                                                           |
| **Build Tools**               |                                  |                  |                     |             |                                                                          |
| Type Checking                 | TypeScript                       | ≥5.3.0, <6.0.0   | Pending             | Critical    | `pnpm add -D typescript`                                                 |
| Image Processing              | sharp                            | ≥0.33.0, <1.0.0  | Pending             | Medium      | `pnpm add sharp`                                                         |
| **Testing**                   |                                  |                  |                     |             |                                                                          |
| Unit/Integration Testing      | Vitest                           | ≥2.0.0, <3.0.0   | Pending             | Critical    | `pnpm add -D vitest`                                                     |
| Code Coverage                 | @vitest/coverage-v8              | ≥2.0.0           | Pending             | High        | `pnpm add -D @vitest/coverage-v8`                                        |
| E2E Testing                   | @playwright/test                 | ≥1.40.0, <2.0.0  | Pending             | Critical    | `pnpm add -D @playwright/test`                                           |
| SolidJS Testing               | @solidjs/testing-library         | ≥1.0.0           | Pending             | High        | `pnpm add -D @solidjs/testing-library`                                   |
| Accessibility Testing         | @axe-core/playwright             | ≥4.0.0           | Pending             | High        | `pnpm add -D @axe-core/playwright`                                       |
| Performance Auditing          | @lhci/cli                        | ≥0.14.0          | Pending             | Critical    | `pnpm add -D @lhci/cli`                                                  |
| **Search**                    |                                  |                  |                     |             |                                                                          |
| Static Search Index           | Pagefind                         | ≥1.0.0           | Pending             | High        | `pnpm add -D pagefind`                                                   |
| Dynamic Search                | FlexSearch                       | ≥0.7.0           | Pending             | Medium      | `pnpm add flexsearch`                                                    |
| **Deployment Infrastructure** |                                  |                  |                     |             |                                                                          |
| Cloudflare Workers CLI        | Wrangler                         | ≥3.0.0, <4.0.0   | Pending             | Critical    | `pnpm add -D wrangler`                                                   |
| Workers TypeScript Types      | @cloudflare/workers-types        | ≥4.0.0           | Pending             | High        | `pnpm add -D @cloudflare/workers-types`                                  |
| Cloudflare Pages              | Cloudflare Pages                 | Current          | Account Required    | Critical    | Cloudflare Dashboard                                                     |
| Cloudflare Workers            | Cloudflare Workers               | v2               | Account Required    | Critical    | Cloudflare Dashboard                                                     |
| Cloudflare R2                 | Cloudflare R2                    | Current          | Account Required    | High        | Cloudflare Dashboard                                                     |
| Cloudflare KV                 | Cloudflare KV                    | Current          | Account Required    | High        | Cloudflare Dashboard                                                     |
| Cloudflare D1                 | Cloudflare D1                    | Current          | Account Required    | High        | Cloudflare Dashboard                                                     |
| Cloudflare Durable Objects    | Cloudflare Durable Objects       | Current          | Account Required    | High        | Cloudflare Dashboard                                                     |
| **Analytics**                 |                                  |                  |                     |             |                                                                          |
| Web Analytics                 | Cloudflare Web Analytics         | Current          | Account Required    | High        | Cloudflare Dashboard                                                     |
| Fallback Analytics            | Plausible Analytics              | ≥2.0.0           | Optional            | Low         | Script Tag                                                               |
| **Internationalization**      |                                  |                  |                     |             |                                                                          |
| i18n Integration              | astro-i18next                    | ≥2.0.0           | Pending             | High        | `pnpm add astro-i18next`                                                 |
| **Code Quality**              |                                  |                  |                     |             |                                                                          |
| Linting                       | ESLint                           | ≥9.0.0, <10.0.0  | Pending             | High        | `pnpm add -D eslint @eslint/js`                                          |
| TypeScript ESLint             | @typescript-eslint/eslint-plugin | ≥8.0.0           | Pending             | High        | `pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
| Formatting                    | Prettier                         | ≥3.0.0, <4.0.0   | Pending             | High        | `pnpm add -D prettier`                                                   |
| **Math Rendering**            |                                  |                  |                     |             |                                                                          |
| LaTeX Rendering               | KaTeX                            | ≥0.16.0          | Pending             | Medium      | `pnpm add katex`                                                         |
| **Syntax Highlighting**       |                                  |                  |                     |             |                                                                          |
| Code Highlighting             | Shiki                            | ≥1.0.0           | Built-in with Astro | High        | (included with astro)                                                    |

---

## 3. Tool Version Matrix

### 3.1 Version Constraints and Compatibility

| Tool          | Min Version | Recommended | Max Version | Breaking Risk | Notes                                          |
| ------------- | ----------- | ----------- | ----------- | ------------- | ---------------------------------------------- |
| Astro         | 5.0.0       | 5.x latest  | <6.0.0      | High          | Core SSG. Major version bump = config rewrite. |
| SolidJS       | 1.8.0       | 1.x latest  | <2.0.0      | High          | Reactive UI. v2 = potential API changes.       |
| Tailwind CSS  | 4.0.0       | 4.x latest  | <5.0.0      | High          | CSS framework. v4 = new `@theme` directive.    |
| TypeScript    | 5.3.0       | 5.x latest  | <6.0.0      | Medium        | Type system. Strict mode required.             |
| Node.js       | 20.11.0     | 20.x LTS    | <21.0.0     | High          | Runtime. LTS = stability guarantee.            |
| pnpm          | 9.0.0       | 9.x latest  | <10.0.0     | Medium        | Package manager. Lockfile must be committed.   |
| Vitest        | 2.0.0       | 2.x latest  | <3.0.0      | Medium        | Test runner. Jest API compatible.              |
| Playwright    | 1.40.0      | 1.x latest  | <2.0.0      | Low           | E2E testing. Browser binaries required.        |
| LHCI          | 0.14.0      | 0.14.x      | <1.0.0      | Low           | Performance auditing. Stable API.              |
| Pagefind      | 1.0.0       | 1.x latest  | <2.0.0      | Low           | Static search. Post-build index generation.    |
| Wrangler      | 3.0.0       | 3.x latest  | <4.0.0      | Medium        | Cloudflare CLI. Local dev + deployment.        |
| ESLint        | 9.0.0       | 9.x latest  | <10.0.0     | Medium        | Linter. Flat config format (v9).               |
| Prettier      | 3.0.0       | 3.x latest  | <4.0.0      | Low           | Formatter. Stable API.                         |
| Zod           | 3.22.0      | 3.x latest  | <4.0.0      | Low           | Schema validation. TypeScript inference.       |
| MDX           | 3.0.0       | 3.x latest  | <4.0.0      | High          | Markdown + JSX. Frontmatter validation.        |
| astro-i18next | 2.0.0       | 2.x latest  | <3.0.0      | Medium        | i18n routing. Locale-prefixed URLs.            |
| FlexSearch    | 0.7.0       | 0.7.x       | <0.8.0      | Low           | Dynamic search. Custom tokenizer needed.       |
| KaTeX         | 0.16.0      | 0.16.x      | <1.0.0      | Low           | Math rendering. Stable API.                    |
| sharp         | 0.33.0      | 0.33.x      | <1.0.0      | Low           | Image processing. Native module.               |

### 3.2 Integration Compatibility Matrix

| Tool A             | Tool B           | Compatible | Notes                                                    |
| ------------------ | ---------------- | ---------- | -------------------------------------------------------- |
| Astro 5.x          | SolidJS 1.x      | Yes        | `@astrojs/solid-js` integration handles bridging         |
| Astro 5.x          | Tailwind CSS 4.x | Yes        | `@tailwindcss/vite` plugin or Astro integration          |
| Astro 5.x          | MDX 3.x          | Yes        | `@astrojs/mdx` integration                               |
| Astro 5.x          | TypeScript 5.x   | Yes        | Built-in TypeScript support in Astro                     |
| Vitest 2.x         | SolidJS 1.x      | Yes        | `@solidjs/testing-library` for component tests           |
| Vitest 2.x         | Playwright 1.x   | Yes        | Separate test runners, no conflict                       |
| ESLint 9.x         | TypeScript 5.x   | Yes        | `@typescript-eslint/parser` v8.x compatible              |
| Wrangler 3.x       | Astro 5.x        | Yes        | `@astrojs/cloudflare` adapter or direct Pages deployment |
| Pagefind 1.x       | Astro 5.x        | Yes        | Post-build: `pagefind --site dist`                       |
| Cloudflare Workers | Durable Objects  | Yes        | Native integration via Workers runtime                   |

---

## 4. Capability Gap Analysis

### 4.1 Critical Gaps (Block Phase 0)

| Gap ID  | Missing Capability        | Impact                                       | Required For                                                 | Resolution                                                           |
| ------- | ------------------------- | -------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| GAP-001 | No `package.json`         | Cannot install any dependencies              | Everything                                                   | Create `package.json` with correct engines and packageManager fields |
| GAP-002 | No Astro installed        | Cannot build or serve the site               | All pages, content, routing                                  | `pnpm add astro` after package.json creation                         |
| GAP-003 | No SolidJS installed      | Cannot create interactive components         | Quiz engine, flashcard system, molecular viewer, wiki editor | `pnpm add solid-js @astrojs/solid-js`                                |
| GAP-004 | No TypeScript configured  | No type checking, no strict mode enforcement | All source files                                             | `pnpm add -D typescript` + `tsconfig.json`                           |
| GAP-005 | No Tailwind CSS installed | No styling system                            | All visual design                                            | `pnpm add tailwindcss @tailwindcss/vite`                             |
| GAP-006 | No Zod installed          | No content collection schema validation      | Content collections, API validation                          | `pnpm add zod`                                                       |
| GAP-007 | No Vitest installed       | No unit/integration testing                  | Test suite, CI/CD pipeline                                   | `pnpm add -D vitest`                                                 |
| GAP-008 | No Wrangler installed     | Cannot develop or deploy to Cloudflare       | Workers, Pages, KV, R2, D1                                   | `pnpm add -D wrangler`                                               |
| GAP-009 | No ESLint/Prettier        | No code quality enforcement                  | Code review, CI/CD pipeline                                  | `pnpm add -D eslint @eslint/js prettier`                             |
| GAP-010 | No astro.config.mjs       | No site configuration                        | Astro build, integrations, output mode                       | Create config file with integrations                                 |

### 4.2 High-Priority Gaps (Required for Full Functionality)

| Gap ID  | Missing Capability               | Impact                                         | Required For                               | Resolution                                                |
| ------- | -------------------------------- | ---------------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| GAP-011 | No MDX installed                 | Cannot author content with embedded components | Content pages, monographs, study guides    | `pnpm add mdx @astrojs/mdx`                               |
| GAP-012 | No Playwright installed          | No E2E testing                                 | User journey testing, accessibility        | `pnpm add -D @playwright/test`                            |
| GAP-013 | No LHCI installed                | No performance auditing                        | Core Web Vitals enforcement                | `pnpm add -D @lhci/cli`                                   |
| GAP-014 | No Pagefind installed            | No static search index                         | Full-text search on both sites             | `pnpm add -D pagefind`                                    |
| GAP-015 | No astro-i18next installed       | No i18n routing                                | Multi-language support                     | `pnpm add astro-i18next`                                  |
| GAP-016 | No @cloudflare/workers-types     | No TypeScript types for Workers API            | Cloudflare Functions, KV, R2, D1           | `pnpm add -D @cloudflare/workers-types`                   |
| GAP-017 | No @solidjs/testing-library      | No SolidJS component testing                   | Component test suite                       | `pnpm add -D @solidjs/testing-library`                    |
| GAP-018 | No @axe-core/playwright          | No automated accessibility testing             | WCAG 2.1 AA compliance                     | `pnpm add -D @axe-core/playwright`                        |
| GAP-019 | No @vitest/coverage-v8           | No code coverage reporting                     | 80% coverage threshold enforcement         | `pnpm add -D @vitest/coverage-v8`                         |
| GAP-020 | No Cloudflare account configured | Cannot deploy to Cloudflare                    | Production deployment, preview deployments | Configure Cloudflare account and set CLOUDFLARE_API_TOKEN |

### 4.3 Medium-Priority Gaps (Deferred Features)

| Gap ID  | Missing Capability      | Impact                           | Required For                                | Resolution                              |
| ------- | ----------------------- | -------------------------------- | ------------------------------------------- | --------------------------------------- |
| GAP-021 | No FlexSearch installed | No dynamic search for wiki pages | wikipept.com dynamic content search         | `pnpm add flexsearch`                   |
| GAP-022 | No KaTeX installed      | No LaTeX math rendering          | Pharmacokinetic equations, binding formulas | `pnpm add katex`                        |
| GAP-023 | No sharp installed      | No image optimization            | Molecular diagrams, social cards            | `pnpm add sharp`                        |
| GAP-024 | No .nvmrc file          | Node.js version not pinned       | Reproducible builds across environments     | Create `.nvmrc` with `20.x.x`           |
| GAP-025 | No .prettierrc file     | Code formatting rules undefined  | Consistent code style                       | Create `.prettierrc` with project rules |
| GAP-026 | No eslint.config.js     | Linting rules undefined          | Code quality enforcement                    | Create `eslint.config.js` (flat config) |

### 4.4 Low-Priority Gaps (Optional)

| Gap ID  | Missing Capability      | Impact                                  | Required For                    | Resolution                            |
| ------- | ----------------------- | --------------------------------------- | ------------------------------- | ------------------------------------- |
| GAP-027 | No Plausible Analytics  | No fallback analytics                   | Custom event tracking           | Add script tag post-launch            |
| GAP-028 | No .dockerignore        | Docker build includes unnecessary files | Optimized Docker builds         | Create `.dockerignore`                |
| GAP-029 | No docker-compose.yml   | No local orchestration                  | Multi-service local development | Create `docker-compose.yml` if needed |
| GAP-030 | No CI/CD workflow files | No automated pipeline                   | GitHub Actions CI/CD            | Create `.github/workflows/`           |

---

## 5. Remediation Plan

### 5.1 Phase 0 Prerequisites (Must Complete Before Phase 0)

| Step  | Action                 | Commands                            | Estimated Time | Dependencies |
| ----- | ---------------------- | ----------------------------------- | -------------- | ------------ |
| R-001 | Create `package.json`  | Manual creation with correct fields | 5 min          | None         |
| R-002 | Create `.nvmrc`        | `echo "20" > .nvmrc`                | 1 min          | None         |
| R-003 | Run `pnpm install`     | `pnpm install`                      | 2 min          | R-001        |
| R-004 | Verify Node.js version | `node --version`                    | 1 min          | None         |
| R-005 | Verify pnpm version    | `pnpm --version`                    | 1 min          | None         |

### 5.2 Phase 0 Actions (During Phase 0: Scaffold)

| Step  | Action                        | Commands                                                                                                          | Estimated Time | Dependencies        |
| ----- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- | ------------------- |
| R-006 | Install Astro                 | `pnpm add astro`                                                                                                  | 2 min          | R-003               |
| R-007 | Install SolidJS               | `pnpm add solid-js @astrojs/solid-js`                                                                             | 2 min          | R-003               |
| R-008 | Install Tailwind CSS          | `pnpm add tailwindcss @tailwindcss/vite`                                                                          | 2 min          | R-003               |
| R-009 | Install TypeScript            | `pnpm add -D typescript`                                                                                          | 1 min          | R-003               |
| R-010 | Install Zod                   | `pnpm add zod`                                                                                                    | 1 min          | R-003               |
| R-011 | Install MDX                   | `pnpm add mdx @astrojs/mdx`                                                                                       | 2 min          | R-003               |
| R-012 | Install testing tools         | `pnpm add -D vitest @vitest/coverage-v8 @playwright/test @solidjs/testing-library @axe-core/playwright @lhci/cli` | 5 min          | R-003               |
| R-013 | Install code quality          | `pnpm add -D eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier`               | 3 min          | R-003               |
| R-014 | Install Cloudflare tools      | `pnpm add -D wrangler @cloudflare/workers-types`                                                                  | 2 min          | R-003               |
| R-015 | Install search tools          | `pnpm add -D pagefind flexsearch`                                                                                 | 2 min          | R-003               |
| R-016 | Install i18n                  | `pnpm add astro-i18next`                                                                                          | 1 min          | R-003               |
| R-017 | Install math/rendering        | `pnpm add katex sharp`                                                                                            | 2 min          | R-003               |
| R-018 | Create `tsconfig.json`        | Manual creation with strict mode                                                                                  | 5 min          | R-009               |
| R-019 | Create `astro.config.mjs`     | Manual creation with all integrations                                                                             | 10 min         | R-006 through R-011 |
| R-020 | Create `.prettierrc`          | Manual creation with project rules                                                                                | 5 min          | R-013               |
| R-021 | Create `eslint.config.js`     | Manual creation (flat config)                                                                                     | 10 min         | R-013               |
| R-022 | Create `vitest.config.ts`     | Manual creation with coverage thresholds                                                                          | 5 min          | R-012               |
| R-023 | Create `playwright.config.ts` | Manual creation with browser matrix                                                                               | 5 min          | R-012               |
| R-024 | Create `lighthouserc.js`      | Manual creation with performance budgets                                                                          | 5 min          | R-012               |

### 5.3 Phase 0 Validation (After All Installations)

| Step  | Action                | Command                     | Expected Result                  |
| ----- | --------------------- | --------------------------- | -------------------------------- |
| V-001 | Type check passes     | `npx tsc --noEmit`          | Zero errors                      |
| V-002 | Lint passes           | `npx eslint src/`           | Zero errors                      |
| V-003 | Format check passes   | `npx prettier --check src/` | All files formatted              |
| V-004 | Unit tests pass       | `npx vitest run`            | All tests pass                   |
| V-005 | Build succeeds        | `pnpm build`                | `dist/` directory created        |
| V-006 | Build output valid    | `ls dist/`                  | HTML files present               |
| V-007 | Wrangler available    | `npx wrangler --version`    | Version 3.x displayed            |
| V-008 | Pagefind works        | `npx pagefind --site dist`  | Search index generated           |
| V-009 | Dev server starts     | `pnpm dev`                  | Server running on localhost:4321 |
| V-010 | Preview server starts | `pnpm preview`              | Server running on localhost:4321 |

### 5.4 Timeline Estimate

| Phase                               | Steps        | Duration    | Prerequisites                     |
| ----------------------------------- | ------------ | ----------- | --------------------------------- |
| Pre-Phase 0 (R-001 to R-005)        | 5 steps      | 10 min      | Nix environment or system Node.js |
| Phase 0 Core (R-006 to R-017)       | 12 steps     | 25 min      | Pre-Phase 0 complete              |
| Phase 0 Config (R-018 to R-024)     | 7 steps      | 45 min      | Phase 0 Core complete             |
| Phase 0 Validation (V-001 to V-010) | 10 steps     | 15 min      | Phase 0 Config complete           |
| **Total**                           | **34 steps** | **~95 min** | —                                 |

---

## 6. Environment Validation Checklist

### 6.1 System-Level Validation

- [ ] Node.js 20.x LTS installed and available in PATH
- [ ] pnpm 9.x available via corepack
- [ ] Git 2.x installed with signed commits support
- [ ] curl available for HTTP requests and health checks
- [ ] jq available for JSON processing
- [ ] ripgrep available for content search
- [ ] fd available for file finding
- [ ] Nix available for reproducible environments (`nix develop`)
- [ ] Docker available for containerized builds

### 6.2 Project-Level Validation (Post Phase 0)

- [ ] `package.json` created with correct `engines` and `packageManager` fields
- [ ] `.nvmrc` created with Node.js 20 pinned
- [ ] `pnpm-lock.yaml` generated and committed
- [ ] `node_modules/` populated (gitignored)
- [ ] `tsconfig.json` created with strict mode enabled
- [ ] `astro.config.mjs` created with all integrations
- [ ] `.prettierrc` created with project formatting rules
- [ ] `eslint.config.js` created with flat config format
- [ ] `vitest.config.ts` created with coverage thresholds
- [ ] `playwright.config.ts` created with browser matrix
- [ ] `lighthouserc.js` created with performance budgets

### 6.3 Cloudflare Validation (Post Account Setup)

- [ ] Cloudflare account created
- [ ] `CLOUDFLARE_API_TOKEN` environment variable set
- [ ] Cloudflare Pages project created for encyclopeptide.com
- [ ] Cloudflare Pages project created for wikipept.com
- [ ] Custom domains configured (encyclopeptide.com, wikipept.com)
- [ ] KV namespaces created (production, preview)
- [ ] R2 buckets created (per site)
- [ ] D1 databases created (wikipept.com)
- [ ] Durable Objects configured (wiki collaboration)
- [ ] Cloudflare Web Analytics enabled

---

## 7. Appendix: Criticality Definitions

| Level        | Definition                                                                         | Examples                                                                                                                                                                                                                                         | Requirements                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Critical** | Failure prevents site from functioning. No workaround.                             | Astro, SolidJS, Tailwind, TypeScript, Node.js, pnpm, Vitest, Playwright, LHCI, Cloudflare Pages, Cloudflare Workers, Zod, Wrangler                                                                                                               | Must be present and correctly configured for any build or deployment. Version constraints must be satisfied. |
| **High**     | Failure degrades significant functionality. Workaround exists but is inconvenient. | Pagefind, astro-i18next, Cloudflare R2, Cloudflare KV, Cloudflare D1, Cloudflare Web Analytics, ESLint, Prettier, @typescript-eslint, @vitest/coverage-v8, @solidjs/testing-library, @axe-core/playwright, Shiki, @cloudflare/workers-types, MDX | Must be present for full functionality. Can be temporarily disabled with degraded experience.                |
| **Medium**   | Failure affects non-critical feature. User can accomplish goals without it.        | FlexSearch, KaTeX, sharp, Custom i18n routing                                                                                                                                                                                                    | Can be deferred to post-launch without blocking core functionality.                                          |
| **Low**      | Failure is cosmetic or organizational. No user impact.                             | Plausible Analytics                                                                                                                                                                                                                              | Optional. Can be added or removed without affecting core functionality.                                      |

---

## Appendix: Build Pipeline Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                    WIKISITES BUILD PIPELINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐                                                │
│  │ pnpm install │  ← Lockfile integrity enforced                 │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ tsc --noEmit │  ← Zero TypeScript errors                      │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ eslint src/  │  ← Zero lint errors                            │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ vitest run   │  ← All unit/integration tests pass             │
│  │ (coverage ≥80%)│  ← Coverage thresholds enforced              │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ astro build  │  ← Static HTML generated in dist/              │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ pagefind     │  ← Search index generated in dist/_pagefind/   │
│  │ --site dist  │                                                │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ playwright   │  ← E2E tests pass on Chromium, Firefox, WebKit │
│  │ test         │                                                │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ lhci autorun │  ← Performance ≥90, A11y ≥95, SEO ≥95          │
│  └──────┬───────┘                                                │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────────────┐                                        │
│  │ wrangler pages deploy│  ← Deployed to Cloudflare Pages        │
│  └──────────────────────┘                                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

**Document Status:** Complete
**Next Action:** Proceed to Phase 0 (Scaffold) with `pnpm init` and dependency installation
**Owner:** Wikisites Development Team
**Review Cycle:** Update after each phase completion
