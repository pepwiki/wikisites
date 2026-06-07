# Regression Detection Strategy

## Purpose

Establish automated detection thresholds and processes to identify performance, build, quality, and security regressions before they reach production. This strategy defines what constitutes a regression, how it is detected, and the response protocol.

---

## 1. Performance Regression Detection

### Thresholds

| Metric | Baseline (P75) | Alert Threshold | Critical Threshold |
|--------|----------------|-----------------|---------------------|
| LCP | 2200 ms | 10% degradation (2420 ms) | 25% degradation (2750 ms) |
| CLS | 0.05 | 10% degradation (0.055) | 25% degradation (0.0625) |
| INP | 150 ms | 10% degradation (165 ms) | 25% degradation (187.5 ms) |
| TTFB | 180 ms | 10% degradation (198 ms) | 25% degradation (225 ms) |
| Total Page Weight | 450 KB | 15% increase (517.5 KB) | 30% increase (585 KB) |

### Detection Methods

**Automated Lighthouse CI**
- Run Lighthouse CI on every pull request against representative pages (index, article, category, search).
- Compare scores and Core Web Vitals against baseline values stored in `baseline_metrics.toml`.
- Any metric exceeding the alert threshold fails the CI check.
- Any metric exceeding the critical threshold blocks merge and requires explicit override.

**Real User Monitoring (RUM)**
- Cloudflare Web Analytics provides production P75 values for LCP, CLS, INP, and TTFB.
- Dashboard compares current 7-day rolling average against baseline.
- Alert fires when rolling average exceeds alert threshold for 3 consecutive measurement windows (3 hours).
- Critical threshold breach triggers immediate page notification to on-call.

**Synthetic Monitoring**
- Weekly automated Lighthouse run against production from 3 geographic regions.
- Results logged to regression tracking database.
- Trend analysis identifies gradual degradation that per-PR checks might miss.

### Page Selection for Testing

| Page Type | URL Pattern | Rationale |
|-----------|-------------|-----------|
| Homepage | `/` | Entry point, highest traffic |
| Article | `/articles/[popular-article]` | Core content, representative load |
| Category | `/categories/[category]` | Dynamic content, potential N+1 |
| Search | `/search?q=test` | Client-side rendering, JS-heavy |

---

## 2. Build Time Regression Detection

### Thresholds

| Metric | Baseline | Alert Threshold (20% increase) | Critical Threshold (40% increase) |
|--------|----------|-------------------------------|-----------------------------------|
| Total Build Time | 240 s | 288 s | 336 s |
| Cold Start | 180 s | 216 s | 252 s |

### Detection Methods

**CI Build Timing**
- Every CI run records total build time and cold start time.
- These values are compared against the baseline in `baseline_metrics.toml`.
- Alert threshold breach warns on PR; critical threshold breach fails the pipeline.

**Build Time Trend Tracking**
- Build times are logged to a time-series store (CI artifacts or external).
- Weekly report summarizes build time trends.
- Gradual increase (10% over 4 weeks) triggers investigation even if no single build exceeds threshold.

**Dependency Impact Analysis**
- When `package.json` or lockfile changes, run a before/after build time comparison.
- Flag dependency additions that increase build time by more than 10 seconds.

---

## 3. Bundle Size Regression Detection

### Thresholds

| Metric | Baseline | Alert Threshold (15% increase) | Critical Threshold (30% increase) |
|--------|----------|-------------------------------|-----------------------------------|
| JS Bundle (encp) | ~200 KB | 230 KB | 260 KB |
| JS Bundle (wiki) | ~180 KB | 207 KB | 234 KB |
| CSS Bundle | ~50 KB | 57.5 KB | 65 KB |
| Total Page Weight | 450 KB | 517.5 KB | 585 KB |

### Detection Methods

**Bundle Analyzer in CI**
- Run `astro build` with bundle analysis enabled.
- Extract total JS, CSS, and asset sizes from build output.
- Compare against thresholds; fail PR if exceeded.

**Per-PR Size Check**
- Use `bundlesize` or equivalent tool to check individual chunk sizes.
- Any chunk exceeding 100 KB individually triggers warning.
- Any chunk exceeding 150 KB individually blocks merge.

**Dependency Size Audit**
- On `package.json` changes, run `npx depcheck` and bundle size diff.
- Flag new dependencies adding more than 25 KB to bundle.
- Monthly dependency audit removes unused or replaceable heavy dependencies.

---

## 4. Test Coverage Regression Detection

### Thresholds

| Metric | Baseline | Alert Threshold (5% decrease) | Critical Threshold (10% decrease) |
|--------|----------|-------------------------------|-----------------------------------|
| Critical Code Coverage | 95.0% | 90.25% | 85.5% |
| Overall Code Coverage | 80.0% | 76.0% | 72.0% |
| Test Pass Rate | 100.0% | 99.0% | 97.0% |

### Detection Methods

**Per-PR Coverage Check**
- CI runs test suite and generates coverage report.
- Coverage delta is computed against the committed baseline.
- If coverage decreases by more than 5 percentage points on any critical module, the PR fails.
- If overall coverage decreases by more than 5 percentage points, the PR fails.

**Critical Module Identification**
- Modules tagged as `critical` in test configuration:
  - Authentication and session management
  - Data validation and sanitization
  - API route handlers
  - Content processing pipeline
  - Security middleware

**Coverage Trend Monitoring**
- Weekly coverage snapshots are committed to a tracking branch.
- Dashboard shows coverage trends over time.
- Gradual decline (2% over 4 weeks) triggers investigation.

---

## 5. Lighthouse Score Regression Detection

### Thresholds

| Metric | Baseline | Alert Threshold (5 point decrease) | Critical Threshold (10 point decrease) |
|--------|----------|-----------------------------------|----------------------------------------|
| Performance Score | 90 | 85 | 80 |
| Accessibility Score | 95 | 90 | 85 |
| Best Practices Score | 95 | 90 | 85 |
| SEO Score | 90 | 85 | 80 |

### Detection Methods

**CI Lighthouse Audit**
- Every PR runs Lighthouse CI against preview deployment.
- Scores are compared against thresholds.
- Alert threshold breach adds a warning label to the PR.
- Critical threshold breach requires explicit approval from a maintainer.

**Production Lighthouse Monitoring**
- Weekly automated Lighthouse run against production.
- Results logged and compared against baseline.
- Score drops trigger investigation and potential rollback if correlated with user-impacting issues.

---

## 6. Detection Response Protocol

### Alert Severity Levels

| Level | Condition | Response Time | Action |
|-------|-----------|---------------|--------|
| Warning | Any metric exceeds alert threshold | Within 24 hours | Investigate, document, plan fix |
| Critical | Any metric exceeds critical threshold | Within 4 hours | Immediate investigation, fix or revert |
| Emergency | Security vulnerability or production outage | Immediate | Drop all other work, fix immediately |

### Escalation Path

1. **Automated Detection**: CI fails or monitoring alert fires.
2. **Developer Notification**: PR author or on-call notified via configured channel.
3. **Investigation**: Developer assesses root cause within response time.
4. **Resolution**: Fix deployed or rollback executed.
5. **Post-Mortem**: For critical/emergency regressions, brief post-mortem documenting root cause and prevention measures.

### Documentation Requirements

Every regression detection must be documented:
- Metric that triggered the alert
- Commit or change that caused the regression
- Root cause analysis
- Fix applied or rollback executed
- Prevention measures added (new test, new threshold, etc.)

---

## 7. Baseline Maintenance

### When to Update Baselines

Baselines in `baseline_metrics.toml` should be updated when:
- A legitimate performance improvement is shipped and verified in production for 2 weeks.
- Infrastructure changes (e.g., Cloudflare plan upgrade) alter performance characteristics.
- Content or feature changes fundamentally alter page weight or complexity.

### How to Update

1. Verify the improvement is stable in production for 2+ weeks.
2. Run full Lighthouse audit suite against production.
3. Update `baseline_metrics.toml` with new values.
4. Commit with message: `chore: update regression baseline to version X.X.X`.
5. Notify team of baseline change in weekly digest.

### Versioning

- Baseline version follows semantic versioning: `MAJOR.MINOR.PATCH`.
- MAJOR: Fundamental change in detection strategy or thresholds.
- MINOR: Baseline values updated due to legitimate improvements.
- PATCH: Threshold adjustments, documentation updates.

---

## 8. Tooling Summary

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Lighthouse CI | Performance and quality scoring | Every PR, weekly production |
| Vitest | Test execution and coverage | Every PR |
| esbuild/rollup bundle analyzer | Bundle size tracking | Every PR |
| Cloudflare Web Analytics | RUM performance data | Continuous |
| `depcheck` | Unused dependency detection | Monthly |
| `npm audit` / Snyk | Security vulnerability scanning | Every PR, weekly |
