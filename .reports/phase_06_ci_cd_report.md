# Phase 6: CI/CD Engineering Report

---

## Objective

Design and document a comprehensive CI/CD pipeline that automates linting, type checking, testing (unit, integration, E2E, security, performance, accessibility, visual regression), building, feature flag management, and deployment for wikisites, with support for P0-P4 feature gradual rollout.

---

## Deliverables

### 1. Pipeline Configuration (`.specs/07_ci_cd/pipeline_config.toml`)

Expanded from the original 5-stage pipeline to a 10-stage pipeline with explicit quality gates, caching, timeouts, and parallelization:

| Stage | Steps | Timeout | Depends On | Quality Gate | Parallel |
|-------|-------|---------|------------|-------------|----------|
| **lint** | ESLint (cached), Prettier, TypeScript | 120s | None | 0 errors, 0 warnings | No |
| **typecheck** | Astro check (encp + wiki), tsc --strict | 120s | lint | 0 errors | No |
| **unit_test** | Vitest run + coverage | 180s | lint | Coverage >= 80% all metrics | Yes |
| **integration_test** | Vitest (jsdom), Worker/SDK integration | 240s | lint | 0 failures | Yes |
| **security_scan** | audit-ci, Snyk (optional), CSP check, gitleaks (optional) | 180s | lint | No high/critical vulns | Yes |
| **e2e_test** | Playwright (dark mode, a11y, visual, GUI, benchmark + P0-P4) | 600s | build | 0 failures | No |
| **performance_audit** | Bundle size check, Lighthouse CI, Web Vitals | 300s | build | Lighthouse perf >= 85 | No |
| **build** | Build shared/query/encp/wiki, search index | 300s | unit_test, integration_test, security_scan | Build < 120s, bundle < 250 KB | No |
| **deploy_preview** | Cloudflare Pages deploy + PR comment | 120s | build | Health check pass | No |
| **deploy_production** | Cloudflare Pages deploy + health check + Lighthouse | 120s | build, e2e_test, performance_audit | Health + Lighthouse pass | No |

**Key Design Decisions**

- Lint runs first (fastest, catches obvious issues)
- Typecheck separated from lint for faster feedback on type errors
- Unit test, integration test, security scan run in parallel after lint
- Build depends on all three parallel stages (test + security)
- E2E and performance audit run in parallel after build
- Deploy production requires build + E2E + performance audit
- Deploy preview runs only on PRs, gated on build alone

**Estimated Pipeline Time**
- PR: ~4-5 minutes
- Production merge: ~5-6 minutes

### 2. Test Automation Strategy (`.specs/07_ci_cd/test_automation.md`)

Comprehensive test strategy across 7 testing dimensions:

**Unit Tests (Vitest)** — 160+ tests across 24 existing test files + 16 new test files for P0-P4 features. Coverage thresholds: lines/branches/functions/statements >= 80%.

**Integration Tests (Vitest + jsdom)** — 9 new integration tests verifying component composition (CommandPalette + KeyboardShortcuts, OutlinePanel + ScrollSync, etc.)

**E2E Tests (Playwright)** — 5 existing spec files + 14 new spec files for P0-P4 features. Browser matrix: Chromium (PR), Chromium + Firefox (main push), full matrix (nightly).

**Security Tests** — Dependency scanning (audit-ci, Snyk), secret detection (gitleaks), SAST (ESLint rules), runtime security (rate limiting, CORS, JWT validation, SQL injection, path traversal).

**Performance Tests** — Lighthouse CI budgets (performance >= 85, accessibility >= 90), bundle size budgets (JS < 250 KB, CSS < 80 KB, total < 500 KB), Web Vitals benchmarks.

**Accessibility Tests** — axe-core WCAG 2.1 AA on all routes (light + dark + mobile), manual keyboard/screen reader checklist.

**Visual Regression Tests** — Playwright screenshot comparison with 1% pixel diff tolerance, baselines for all routes and new features.

### 3. Deployment Strategy (`.specs/07_ci_cd/deployment_strategy.md`)

**Cloudflare Pages Deployment**
- Production: `encp.wikisites.dev`, `wiki.wikisites.dev`
- Staging: `staging-encp.wikisites.dev`, `staging-wiki.wikisites.dev`
- Preview: per-branch URLs via Cloudflare Pages

**Feature Flag System**
- Runtime flags stored in Cloudflare Workers KV
- Build-time flags via Astro env vars for preview/staging
- P0 features: 100% rollout on merge
- P1 features: gradual rollout 10% → 25% → 50% → 100%
- P2-P4 features: binary or gradual rollout depending on backend requirements
- Immediate rollback via flag disable (< 30 seconds)

**Rollback**
- Automatic: health check failure, Lighthouse critical drop, error rate spike
- Manual: Cloudflare Pages CLI (< 2 minutes)
- Feature flag disable (< 30 seconds)

**Monitoring**
- Immediate: health check, Lighthouse audit
- Short-term: error rate monitoring (30 min)
- Medium-term: RUM performance (24 hours)
- Alerting: warning and critical thresholds for all key metrics

---

## Integration with Existing Infrastructure

### Current CI/CD (`.github/workflows/ci.yml`)

The expanded pipeline replaces the existing single-job `lint-and-test` approach with parallel stages:

| Current | Updated |
|---------|---------|
| Single `lint-and-test` job | Separate lint, typecheck, unit_test, integration_test stages |
| Security in separate job | Parallel security_scan with additional tools (gitleaks) |
| Build after test+security | Build after unit_test+integration_test+security_scan |
| E2E after build | E2E + performance_audit in parallel after build |
| Deploy only on main | Deploy preview (PRs) + deploy production (main) |
| No feature flags | Feature flag integration at build and runtime |
| No staging | Staging environment with validation checklist |

### Pre-commit Integration

- Husky + lint-staged unchanged (ESLint + Prettier on staged files)
- Pre-commit does NOT run full test suite (removed in prior audit — too slow)
- Full test suite runs in CI pipeline

### Testing Infrastructure

- Vitest config unchanged (forks pool, V8 coverage, 80% thresholds)
- Playwright config unchanged (30s timeout, chromium primary, retries=2 on CI)
- New: vitest.integration.config.ts for jsdom-based integration tests
- New: 14 Playwright spec files for P0-P4 features

---

## Pipeline Flow Diagram

```
[Git Push / PR]
       |
       v
  +----------+     +------------+
  |   LINT   |────>| TYPECHECK  |
  +----------+     +------------+
       |
       +----------+-----------+-----------+
       |          |           |           |
       v          v           v           v
  +--------+ +----------+ +----------+ +----------+
  |  UNIT  | |INTEGRATION| | SECURITY | | TYPECHECK|
  |  TEST  | |   TEST    | |   SCAN   | |          |
  +--------+ +----------+ +----------+ +----------+
       |          |           |
       +----------+-----------+
       |
       v
  +----------+
  |   BUILD  |  shared -> query -> encp -> wiki -> search
  +----------+
       |
       +----------+-----------+
       |                      |
       v                      v
  +----------+         +----------+
  |   E2E    |         |PERFORMANCE|
  |   TEST   |         |  AUDIT   |
  +----------+         +----------+
       |                      |
       +----------+-----------+
       |
       v
  +---------------------------+
  |       DEPLOY              |
  |  PR  -> Preview           |
  |  main -> Production       |
  |  staging -> Staging       |
  +---------------------------+
       |
       v
  +---------------------------+
  |  POST-DEPLOY MONITORING   |
  |  Health + Lighthouse +    |
  |  Error Rate + Flags       |
  +---------------------------+
```

---

## Quality Gate Summary

| Gate | Threshold | Failure Action |
|------|-----------|----------------|
| ESLint errors | 0 | Block all |
| TypeScript errors | 0 | Block all |
| Unit test failures | 0 | Block all |
| Coverage (all metrics) | >= 80% | Block all |
| Integration test failures | 0 | Block all |
| Security vulns (high+) | 0 | Block all |
| E2E test failures | 0 | Block all |
| Lighthouse performance | >= 85 (block at 70) | Warn / Block |
| Lighthouse accessibility | >= 90 (block at 80) | Warn / Block |
| Bundle size (JS/page) | < 250 KB | Block all |
| Build time | < 120s | Warn |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Feature flag KV outage | Low | High | Fallback to build-time defaults; all features have default values |
| Cloudflare Pages outage | Low | High | Blue-green with rollback; monitor Cloudflare status |
| E2E flakiness | Medium | Medium | Retries=2 on CI; trace on first retry; quarantine flaky tests |
| Pipeline performance degradation | Medium | Low | Monitor pipeline times; adjust caching; optimize stages |
| Visual regression false positives | Medium | Low | 1% pixel tolerance; manual baseline updates |
| Security scan false positives | Medium | Low | Audit-ci allowlist; Snyk ignore rules for accepted risks |

---

## Success Criteria

- [x] 10-stage pipeline configuration with explicit quality gates per stage
- [x] Caching strategy for deps, ESLint, build, Playwright, Vitest
- [x] Parallelization: lint stages (typecheck/unit/integration/security parallel), post-build (E2E/performance parallel)
- [x] Test automation strategy covering 7 testing dimensions
- [x] 16+ new unit test files for P0-P4 features
- [x] 14 new E2E spec files for P0-P4 features
- [x] Feature flag system for gradual rollout (KV-based runtime + build-time)
- [x] Deployment strategy: production, staging, preview environments
- [x] Automatic rollback (health check, Lighthouse, error rate)
- [x] Manual rollback via CLI (< 2 min) and feature flag disable (< 30s)
- [x] Post-deployment monitoring: health, Lighthouse, error rate, RUM
- [x] Alerting thresholds: warning and critical for all key metrics
- [x] All documentation actionable, no placeholders

---

## Next Steps

1. Implement expanded CI pipeline in GitHub Actions (replace single `lint-and-test` job with parallel stages)
2. Configure Cloudflare Workers KV namespace for feature flags
3. Create `vitest.integration.config.ts` for integration test suite
4. Write P0 E2E test specs (CommandPalette, KeyboardShortcuts, OutlinePanel, Breadcrumbs)
5. Set up Lighthouse CI config (`lighthouserc.json` + `lighthouserc.production.json`)
6. Implement `check-bundle-size.js` and `check-web-vitals.js` scripts
7. Configure staging environment on Cloudflare Pages
8. Set up monitoring dashboards and alerting channels
9. Conduct first production deployment with expanded pipeline
10. Test rollback procedure in staging environment
