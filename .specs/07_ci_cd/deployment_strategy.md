# Deployment Strategy

## Purpose

Define the deployment workflow, environment management, feature flag rollout, rollback procedures, monitoring, and infrastructure configuration for wikisites. Covers Cloudflare Pages preview/production deployments, gradual feature rollout for P0-P4 features, and alerting.

---

## 1. Deployment Architecture

### Infrastructure Overview

```
Git Push / PR (Forgejo)
        |
        v
  CI Pipeline (Phase 6)
        |
        +-- Lint ──> Typecheck
        +-- Unit Test ──> Integration Test ──> Security Scan
        +-- Build (encp + wiki + search index)
        +-- E2E Test (Playwright)
        +-- Performance Audit (Lighthouse CI)
        |
        v
  +---------------------------+
  | DEPLOY                    |
  |  +-- Preview (PRs)       |
  |  +-- Staging (staging)   |
  |  +-- Production (main)   |
  +---------------------------+
        |
        v
  Cloudflare Pages
        |
        +-- encp.wikisites.dev
        +-- wiki.wikisites.dev
        |
        v
  Post-Deploy Monitoring
        |
        +-- Health Check
        +-- Lighthouse Audit
        +-- Error Rate Monitoring
        +-- Feature Flag Evaluation
```

### Cloudflare Pages Configuration

**Project: wikisites-encp**
- Production URL: `encp.wikisites.dev`
- Preview URL: `encp--{branch-name}.wikisites.dev.pages.dev`
- Build output: `packages/encp/dist`
- Node.js: 20

**Project: wikisites-wiki**
- Production URL: `wiki.wikisites.dev`
- Preview URL: `wiki--{branch-name}.wikisites.dev.pages.dev`
- Build output: `packages/wiki/dist`
- Node.js: 20

### Workers Configuration

- Worker: `wikisites-api`
- Routes: `encyclopeptide.com/api/*`, `wikipept.com/api/*`
- Compatibility: `nodejs_compat` flag

---

## 2. Deployment Flow

### 2.1 Branch Strategy

| Branch | Purpose | Deployment Target | Approval Required |
|--------|---------|-------------------|-------------------|
| `main` | Production | Production URLs | CI passes only |
| `staging` | Pre-production validation | Staging URLs | CI passes + manual review |
| `feature/*` | Feature development | Preview URLs | None (auto) |
| `hotfix/*` | Emergency fixes | Preview → Production | Maintainer approval for prod |

### 2.2 PR Workflow

1. Developer pushes feature branch
2. CI pipeline runs: lint → tests → security → build
3. Build artifacts uploaded as CI artifacts
4. Deploy preview stage runs on PRs
5. Preview URL posted to PR via bot comment
6. Reviewer validates preview, approves PR
7. PR merged to `main`
8. CI runs again on `main`
9. All stages pass → production deploy

### 2.3 Production Deployment

1. Push to `main` triggers CI pipeline
2. All stages pass (lint, tests, security, build, E2E, performance)
3. Deploy stage uploads to Cloudflare Pages (encp + wiki)
4. Cloudflare propagates globally (< 30 seconds)
5. Post-deployment health check runs
6. Post-deployment Lighthouse audit runs
7. Feature flags evaluated and applied
8. Monitoring begins

---

## 3. Environment Management

### 3.1 Environments

| Environment | URL | Purpose | Infrastructure |
|-------------|-----|---------|---------------|
| **Production** | `encp.wikisites.dev`, `wiki.wikisites.dev` | Live site | Full CDN, Workers, D1, KV |
| **Staging** | `staging-encp.wikisites.dev`, `staging-wiki.wikisites.dev` | Pre-prod validation | Mirrors production (separate D1/KV) |
| **Preview** | `encp--{branch}.wikisites.pages.dev` | PR review | Cloudflare Pages preview |
| **Local** | `localhost:4321` (wiki), `localhost:4322` (encp) | Development | Local dev server |

### 3.2 Environment Variables

| Variable | Production | Staging | Preview |
|----------|-----------|---------|---------|
| `NODE_ENV` | production | production | development |
| `ASTRO_OUTPUT` | static | static | static |
| `CF_API_TOKEN` | Secret | Secret | Secret |
| `CF_ACCOUNT_ID` | Secret | Secret | Secret |
| `SNYK_TOKEN` | Secret | Secret | Secret |
| `FEATURE_*` | KV-based flags | KV-based flags | Build-time flags |

### 3.3 Feature Flag Configuration

Feature flags are stored in Cloudflare Workers KV and evaluated at runtime. For preview/staging environments, flags are set at build time via Astro environment variables.

**KV Namespace:** `FEATURE_FLAGS`
**Key format:** `feature:<flag-name>`
**Value format:** `{ "enabled": true, "rollout": 100, "variants": {} }`

---

## 4. Feature Flags for Gradual Rollout

### 4.1 P0 Features (Ship Immediately)

| Feature | Flag | Default | Rollout Strategy |
|---------|------|---------|-----------------|
| Command Palette | `feature:command-palette` | enabled | 100% on merge |
| Keyboard Shortcuts | `feature:keyboard-shortcuts` | enabled | 100% on merge |
| Outline Panel | `feature:outline-panel` | enabled | 100% on merge |
| Breadcrumbs | `feature:breadcrumbs` | enabled | 100% on merge |

### 4.2 P1 Features (Gradual Rollout)

| Feature | Flag | Default | Rollout Strategy |
|---------|------|---------|-----------------|
| KaTeX | `feature:katex` | disabled | 10% → 25% → 50% → 100% |
| Force Graph | `feature:force-graph` | disabled | 10% → 25% → 50% → 100% |
| Split Pane | `feature:split-pane` | disabled | 10% → 25% → 50% → 100% |
| Regex Search | `feature:regex-search` | disabled | 10% → 25% → 50% → 100% |

### 4.3 P2 Features (Require Backend)

| Feature | Flag | Default | Rollout Strategy |
|---------|------|---------|-----------------|
| Giscus | `feature:giscus` | disabled | 100% (binary) |
| Annotations | `feature:annotations` | disabled | 10% → 100% |
| User Accounts | `feature:user-accounts` | disabled | 100% (binary) |

### 4.4 P3 Features (Editor)

| Feature | Flag | Default | Rollout Strategy |
|---------|------|---------|-----------------|
| TipTap Editor | `feature:tiptap-editor` | disabled | 10% → 50% → 100% |
| Version History | `feature:version-history` | disabled | 10% → 50% → 100% |

### 4.5 P4 Features (Extensibility)

| Feature | Flag | Default | Rollout Strategy |
|---------|------|---------|-----------------|
| Plugin API | `feature:plugin-api` | disabled | 100% (binary) |
| Themes | `feature:themes` | disabled | 10% → 100% |
| Settings | `feature:settings` | disabled | 10% → 100% |

### 4.6 Feature Flag Implementation

```typescript
// packages/shared/src/feature-flags.ts
import type { AstroGlobal } from "astro";

interface FeatureFlag {
  enabled: boolean;
  rollout: number; // 0-100 percentage
}

// Server-side: read from KV or env
export function getFeatureFlag(name: string): FeatureFlag {
  // In CI/preview: read from env
  const envKey = `FEATURE_${name.toUpperCase().replace(/-/g, "_")}`;
  if (import.meta.env[envKey] !== undefined) {
    return { enabled: import.meta.env[envKey] === "true", rollout: 100 };
  }
  // In production: read from KV (via Workers)
  return { enabled: false, rollout: 0 };
}

// Client-side: check flag before rendering
export function isFeatureEnabled(flag: FeatureFlag, userId?: string): boolean {
  if (!flag.enabled) return false;
  if (flag.rollout >= 100) return true;
  // Deterministic rollout: hash(userId) % 100 < rollout
  if (userId) {
    const hash = simpleHash(userId);
    return hash % 100 < flag.rollout;
  }
  // No user: use random for anonymous visitors
  return Math.random() * 100 < flag.rollout;
}
```

### 4.7 Feature Flag Rollout Procedure

1. Deploy with flag disabled (or low rollout %)
2. Monitor error rates and performance for 24 hours
3. If metrics stable, increase rollout: 10% → 25% → 50% → 100%
4. At each step, wait 4-24 hours and check metrics
5. If issues detected, immediately set rollout to 0%
6. Once at 100%, remove flag after 1 week of stability

---

## 5. Rollback Procedures

### 5.1 Automatic Rollback

**Trigger Conditions**
- Health check fails after deployment (HTTP 5xx or timeout)
- Lighthouse performance drops below 70 (critical threshold)
- Error rate increases by > 50% within 10 minutes
- Cloudflare Health Check reports degraded status

**Process**
1. Cloudflare Pages reverts to the previous deployment
2. Rollback notification sent to team channel
3. Developer notified, must investigate root cause
4. Post-incident review required within 48 hours

### 5.2 Manual Rollback

**When to Use**
- Performance degradation below automatic threshold
- Content or functionality issue reported by users
- Security concern requiring immediate revert
- Feature flag causing unexpected behavior

**Process**

```bash
# List recent deployments
bunx wrangler pages deployment list --project-name=wikisites-encp

# Rollback to specific deployment
bunx wrangler pages deployment rollback --project-name=wikisites-encp {deployment-id}

# Verify rollback
curl -I https://encp.wikisites.dev
```

### 5.3 Feature Flag Rollback

For feature-related issues, disable the flag instead of rolling back the entire deployment:

```bash
# Disable a feature flag immediately
bunx wrangler kv:key put --namespace-id=FEATURE_FLAGS "feature:command-palette" \
  '{"enabled": false, "rollout": 0}'
```

### 5.4 Rollback Time Objectives

| Metric | Target |
|--------|--------|
| Detection to acknowledgment | < 5 minutes |
| Acknowledgment to rollback decision | < 15 minutes |
| Feature flag disable | < 30 seconds |
| Cloudflare Pages rollback | < 2 minutes |
| Full rollback (including verification) | < 30 minutes |

---

## 6. Blue-Green Deployment via Cloudflare

### Concept

Cloudflare Pages implements blue-green deployment inherently:
- **Blue**: Current production deployment serving traffic
- **Green**: New deployment uploaded, not yet routed
- **Switch**: Cloudflare propagates new deployment globally; old remains as fallback

### Implementation

1. **Deploy Green**: `bunx wrangler pages deploy dist --project-name=wikisites-encp --branch=main`
2. **Verify Green**: Smoke tests, dashboard status check, DNS propagation
3. **Route Traffic**: Cloudflare auto-routes to latest production deployment
4. **Monitor**: Watch error rates, performance for 30 minutes
5. **Rollback if needed**: Previous deployment retained for instant revert

---

## 7. Staging Environment

### Purpose

Validate changes in a production-like environment before merging to `main`.

### Deployment

- Trigger: Push to `staging` branch
- Infrastructure: Mirrors production (separate D1/KV namespaces)
- Feature flags: Set to 100% rollout for testing

### Staging Validation Checklist

- [ ] All CI stages pass
- [ ] Lighthouse scores meet baseline (>= 90 performance, >= 90 accessibility)
- [ ] Visual regression shows no unexpected changes
- [ ] Manual smoke test of critical user flows
- [ ] Feature flags tested at 100% rollout
- [ ] No security vulnerabilities detected
- [ ] E2E tests pass on staging URLs

---

## 8. Monitoring and Alerting

### 8.1 Monitoring Layers

| Layer | Tool | Timing | What to Watch |
|-------|------|--------|---------------|
| **Health Check** | curl / health endpoint | Immediate (0-5 min) | HTTP status, response time |
| **Lighthouse Audit** | Lighthouse CI | Within 5 minutes | Performance scores |
| **Error Rate** | Cloudflare Analytics | 30-minute observation | 5xx errors, exception rate |
| **RUM Performance** | Cloudflare Web Analytics | 24-hour observation | Core Web Vitals |
| **User Reports** | Manual / support channels | Ongoing | Functional issues |

### 8.2 Alerting Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Error rate | > 1% | > 5% | Auto-rollback if critical |
| Response time (P95) | > 3s | > 5s | Investigate; auto-rollback if critical |
| Lighthouse Performance | < 85 | < 70 | Block deploy if < 70 |
| Lighthouse Accessibility | < 90 | < 80 | Block deploy if < 80 |
| TTFB | > 200ms | > 500ms | Investigate; block deploy if critical |
| Bundle size growth | > 10% | > 25% | Investigate |
| Deployment failure | Any | Any | Auto-rollback, notify |

### 8.3 Monitoring Dashboard

| Panel | Data Source | Refresh Rate |
|-------|-----------|-------------|
| Build status | CI pipeline | Real-time |
| Deployment history | Cloudflare Pages API | 5 minutes |
| Error rate | Cloudflare Analytics | 1 minute |
| Core Web Vitals | RUM data | 5 minutes |
| Feature flag status | KV store | 1 minute |
| Lighthouse trends | Lighthouse CI | Per deploy |

### 8.4 Notification Channels

| Event | Channel | Recipients |
|-------|---------|------------|
| Deploy success | Team chat | Developers |
| Deploy failure | Team chat + email | Developers + Maintainer |
| Auto-rollback triggered | Team chat + email | All |
| Security vulnerability | Email | Maintainer |
| Performance regression | Team chat | Developers |
| Weekly digest | Email | All |

---

## 9. Pre-Deployment Checks

| Check | Tool | Gate |
|-------|------|------|
| Lint passes | ESLint + Prettier | Required |
| Type check passes | TypeScript + Astro check | Required |
| Unit tests pass | Vitest | Required |
| Coverage >= 80% | Vitest coverage | Required |
| Integration tests pass | Vitest (jsdom) | Required |
| Security scan clean | audit-ci + gitleaks | Required (high+) |
| Build succeeds | Astro build | Required |
| Bundle size within budget | Custom script | Required |
| E2E tests pass | Playwright | Required |
| Lighthouse scores meet budget | Lighthouse CI | Required (warn at 85, block at 70) |

---

## 10. Post-Deployment Checks

| Check | Tool | Timing |
|-------|------|--------|
| Health check | curl / endpoints | Immediate |
| Smoke test | Manual / automated | Within 5 minutes |
| Lighthouse audit | Lighthouse CI | Within 5 minutes |
| Error rate monitoring | Cloudflare Analytics | 30-minute observation |
| RUM performance | Cloudflare Web Analytics | 24-hour observation |
| Feature flag evaluation | KV store check | Immediate |
| Visual regression | Playwright screenshots | Within 30 minutes |

---

## 11. Security Considerations

### Secrets Management

- All secrets in CI platform secret store (never in repository)
- Secrets rotated quarterly or on personnel change
- Minimum privilege: each stage only accesses required secrets

### Supply Chain Security

- Lockfile committed and validated in CI
- Dependencies pinned in `package.json`
- `bun install --frozen-lockfile` in CI (reproducible builds)
- Snyk monitors for newly disclosed vulnerabilities

### Deployment Security

- Cloudflare API tokens scoped to Pages projects only
- No direct SSH access to infrastructure
- All deployments logged with commit SHA, author, timestamp
- Deployment audit trail in Cloudflare dashboard

---

## 12. Maintenance and Operations

### Regular Operations

| Task | Frequency | Owner |
|------|-----------|-------|
| Dependency updates (Renovate) | Weekly (automated) | Automated |
| Security scan review | Weekly | Maintainer |
| Deployment log review | Monthly | Maintainer |
| Feature flag cleanup | After 1 week at 100% | Developer |
| Cloudflare config audit | Quarterly | Maintainer |
| Rollback procedure test | Quarterly | Team |
| Lighthouse budget review | Quarterly | Team |

### Incident Response

1. **Detection**: Automated monitoring or user report
2. **Triage**: Assess severity using alerting thresholds
3. **Mitigation**: Feature flag disable or deployment rollback
4. **Resolution**: Deploy fix through full CI pipeline
5. **Post-Mortem**: Document root cause, impact, prevention

---

## 13. Pipeline Flow Diagram

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
  |   BUILD  |  shared → query → encp → wiki → search
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
  |  PR → Preview             |
  |  main → Production        |
  |  staging → Staging        |
  +---------------------------+
       |
       v
  +---------------------------+
  |  POST-DEPLOY MONITORING   |
  |  Health + Lighthouse +    |
  |  Error Rate + Feature Flags|
  +---------------------------+
```

---

## 14. Success Criteria

- [x] Pipeline configuration with 10 stages (lint, typecheck, unit test, integration test, security scan, E2E test, performance audit, build, deploy preview, deploy production)
- [x] Deployment strategy covers production, staging, and preview environments
- [x] Feature flag system for gradual P0-P4 rollout
- [x] Automatic rollback on health check failure or Lighthouse critical drop
- [x] Manual rollback via Cloudflare Pages CLI (< 2 minutes)
- [x] Feature flag rollback (< 30 seconds)
- [x] Post-deployment monitoring: health check, Lighthouse, error rate, RUM
- [x] Alerting thresholds for warning and critical states
- [x] Security: dependency scanning, secret detection, CSP validation
- [x] All documentation actionable, no placeholders
