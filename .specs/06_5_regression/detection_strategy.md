# Regression Detection Strategy

## Purpose

Automated detection of performance, build, quality, and security regressions before they reach production. Defines what constitutes a regression, how it is detected, and the response protocol.

---

## 1. CI/CD Integration

### Pipeline Stages

```
PR Opened / Updated
  │
  ├─ Lint Stage ──── Prettier, Biome, TypeScript check
  │                   └─ Fail = block merge
  │
  ├─ Test Stage ──── Vitest + coverage report
  │                   ├─ Coverage delta against baseline_metrics.toml
  │                   └─ Fail if critical coverage drops >5%
  │
  ├─ Security Stage ── npm audit + Snyk scan
  │                     └─ Critical CVE = block merge
  │
  ├─ Build Stage ──── astro build + bundle analysis
  │                    ├─ Compare JS/CSS sizes against budgets
  │                    └─ Fail if >15% over baseline
  │
  ├─ Lighthouse Stage ── Lighthouse CI on preview URL
  │                      ├─ Compare scores against thresholds
  │                      └─ 10% CWV regression = block merge
  │
  └─ Deploy Stage ── Post-deploy validation
                     └─ Re-run Lighthouse against production
```

### Lighthouse CI Configuration

```yaml
# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/articles/',
        'http://localhost:4321/quizzes',
        'http://localhost:4321/flashcards',
        'http://localhost:4321/search?q=peptide',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.90 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interactive': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
};
```

---

## 2. Automated Comparison Against Baseline

### Baseline Source

All baselines live in `.specs/06_5_regression/baseline_metrics.toml`. CI reads this file at pipeline start and uses values as comparison targets.

### Comparison Logic

```typescript
type RegressionResult = 'pass' | 'warn' | 'fail';

function compareAgainstBaseline(
  current: number,
  baseline: number,
  direction: 'lower-is-better' | 'higher-is-better'
): RegressionResult {
  const change = direction === 'lower-is-better'
    ? (current - baseline) / baseline
    : (baseline - current) / baseline;

  if (change > 0.20) return 'fail';   // 20% regression = failure
  if (change > 0.10) return 'warn';   // 10% regression = warning
  return 'pass';
}
```

### Metrics Checked Per Run

| Metric | Baseline Source | Direction | Warning | Failure |
|--------|----------------|-----------|---------|---------|
| LCP P50 | `core_web_vitals.lcp.p50` | lower-is-better | 10% | 20% |
| LCP P95 | `core_web_vitals.lcp.p95` | lower-is-better | 10% | 20% |
| CLS P50 | `core_web_vitals.cls.p50` | lower-is-better | 10% | 20% |
| CLS P95 | `core_web_vitals.cls.p95` | lower-is-better | 10% | 20% |
| INP P50 | `core_web_vitals.inp.p50` | lower-is-better | 10% | 20% |
| INP P95 | `core_web_vitals.inp.p95` | lower-is-better | 10% | 20% |
| TTFB P50 | `page_load.ttfb.p50` | lower-is-better | 10% | 20% |
| TTFB P95 | `page_load.ttfb.p95` | lower-is-better | 10% | 20% |
| Initial JS | `bundle_size.initial_js.value` | lower-is-better | 15% | 30% |
| Initial CSS | `bundle_size.initial_css.value` | lower-is-better | 15% | 30% |
| Total Bundle | `bundle_size.total.value` | lower-is-better | 15% | 30% |
| Build Time | `build.build_time_s.value` | lower-is-better | 20% | 40% |
| Test Coverage (critical) | `quality.code_coverage_critical.value` | higher-is-better | 5% drop | 10% drop |
| Test Coverage (overall) | `quality.code_coverage_overall.value` | higher-is-better | 5% drop | 10% drop |

---

## 3. Alert Thresholds

### 10% Regression = Warning

- Adds a warning label to the PR.
- Posts notification to `#wikisites-ci`.
- PR can still be merged with maintainer approval.
- Author must document the regression cause.

### 20% Regression = Failure

- CI check fails — merge is blocked.
- Posts `@here` alert to `#wikisites-alerts`.
- Requires explicit maintainer override to merge.
- Author must provide mitigation plan.

### Threshold Override Process

1. Author documents why the regression is acceptable.
2. Posts justification in PR description.
3. Maintainer reviews and approves override.
4. Baseline is updated if regression is permanent and intentional.

---

## 4. Manual Review Triggers

Certain changes always require manual performance review regardless of CI results:

| Trigger | Review Required |
|---------|----------------|
| New dependency added to `package.json` | Bundle size impact review |
| `astro.config.*` modified | Build config impact review |
| New SolidJS island component added | Loading strategy review |
| `public/` assets changed | Asset size and caching review |
| `wrangler.toml` modified | Edge behavior review |
| Any P1-tier component added | Lazy loading verification |
| Cloudflare Worker code changed | TTFB impact review |

### Review Checklist

- [ ] Bundle size delta measured and within budget
- [ ] Lazy loading preserved (no eager imports of P1+ components)
- [ ] No layout shift introduced (CLS impact assessed)
- [ ] Font loading strategy unchanged or improved
- [ ] Cache headers correct for new assets
- [ ] Lighthouse score maintained or improved

---

## 5. Per-Page-Type Detection

Each page type in `baseline_metrics.toml` has its own thresholds. CI tests representative URLs for each type:

| Page Type | Test URL | Primary Risk |
|-----------|----------|-------------|
| Homepage | `/` | TTFB, LCP from hero image |
| Article | `/articles/[slug]` | KaTeX/force-graph lazy load, CLS |
| Quiz | `/quizzes` | SolidJS hydration, INP |
| Flashcard | `/flashcards` | Animation performance, INP |
| Search | `/search?q=peptide` | Pagefind index load, TTI |

---

## 6. Trend Detection

Beyond per-PR checks, gradual regressions are detected via:

- **Weekly synthetic Lighthouse runs** from 3 geographic regions.
- **7-day rolling average** of RUM data from Cloudflare Analytics.
- **Monthly bundle size snapshots** committed to tracking branch.
- **Coverage trend analysis** over 4-week windows.

Any metric degrading >5% over a 4-week window triggers investigation even if no single PR breached the threshold.

---

## 7. Tooling Summary

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Lighthouse CI | CWV and Lighthouse scoring | Every PR |
| Vitest | Test execution + coverage | Every PR |
| Astro build + rollup stats | Bundle size analysis | Every PR |
| `bundlesize` | Per-chunk size checks | Every PR |
| Cloudflare Web Analytics | RUM data collection | Continuous |
| `npm audit` / Snyk | Security scanning | Every PR |
| Pagefind build | Search index size | Every PR |
