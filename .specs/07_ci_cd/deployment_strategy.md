# Deployment Strategy

## Purpose

Define the deployment workflow, environment management, rollback procedures, and infrastructure configuration for wikisites. The strategy leverages Cloudflare Pages for hosting with a blue-green deployment model to ensure zero-downtime releases and safe rollbacks.

---

## 1. Deployment Architecture

### Infrastructure Overview

```
Git Repository (Forgejo)
    |
    v
CI Pipeline (Phase 6)
    |
    +-- Lint Stage
    +-- Test Stage
    +-- Security Stage
    +-- Build Stage
    |       |
    |       +-- Astro Build (encp)
    |       +-- Astro Build (wiki)
    |
    +-- Deploy Stage
            |
            +-- Cloudflare Pages (encp)
            +-- Cloudflare Pages (wiki)
```

### Cloudflare Pages Configuration

**Project: wikisites-encp**
- Production URL: `encp.wikisites.dev`
- Preview URL: `encp--{branch-name}.wikisites.dev.pages.dev`
- Build command: `npm run build:encp`
- Build output directory: `dist/encp`
- Node.js version: 20

**Project: wikisites-wiki**
- Production URL: `wiki.wikisites.dev`
- Preview URL: `wiki--{branch-name}.wikisites.dev.pages.dev`
- Build command: `npm run build:wiki`
- Build output directory: `dist/wiki`
- Node.js version: 20

### Environment Variables

| Variable | Environment | Source |
|----------|-------------|--------|
| `NODE_ENV` | All | Set by pipeline |
| `ASTRO_OUTPUT` | Build | Set by pipeline |
| `CF_API_TOKEN` | Deploy | Secret in CI |
| `CF_ACCOUNT_ID` | Deploy | Secret in CI |
| `SNYK_TOKEN` | Security | Secret in CI |

---

## 2. Deployment Flow

### Automatic Deployment from Git

**Production Deployment**
- Triggered by pushes to the `main` branch.
- CI pipeline runs all stages sequentially: lint -> test -> security -> build -> deploy.
- Build artifacts are uploaded to Cloudflare Pages.
- Cloudflare handles propagation globally (typically < 30 seconds).
- Post-deployment Lighthouse audit runs against production URLs.

**Preview Deployment**
- Triggered by pull requests targeting `main`.
- CI pipeline runs all stages, but deploy stage uploads to preview URL.
- Preview URL is posted as a comment on the pull request for review.
- Preview environment uses the same Cloudflare Workers and KV bindings as production (via environment-specific configuration).

### Branch Strategy

| Branch | Purpose | Deployment Target |
|--------|---------|-------------------|
| `main` | Production | Production URLs |
| `staging` | Pre-production validation | Staging URLs |
| `feature/*` | Feature development | Preview URLs |
| `hotfix/*` | Emergency fixes | Preview, then production after approval |

---

## 3. Environment Management

### Production Environment

- **URL**: `encp.wikisites.dev` and `wiki.wikisites.dev`
- **Cloudflare Zone**: Full CDN, caching, and DDoS protection enabled.
- **Workers**: Production-bound Workers for edge logic.
- **KV Namespaces**: Production KV for content and caching.
- **Analytics**: Cloudflare Web Analytics enabled.

**Access Control**
- Deployment to production requires: all CI stages passing + manual approval (for initial rollout).
- After initial validation, automatic deployment from `main` is enabled.
- Manual approval gate can be re-enabled for high-risk changes.

### Staging Environment

- **URL**: `staging-encp.wikisites.dev` and `staging-wiki.wikisites.dev`
- **Purpose**: Validate changes in a production-like environment before merging to `main`.
- **Trigger**: Push to `staging` branch.
- **Configuration**: Mirrors production infrastructure (Workers, KV) but with separate namespaces.

**Staging Validation Checklist**
- [ ] All CI stages pass.
- [ ] Lighthouse scores meet or exceed baseline.
- [ ] Visual regression test shows no unexpected changes.
- [ ] Manual smoke test of critical user flows.
- [ ] No security vulnerabilities detected.

### Preview Environment

- **URL**: Generated per pull request by Cloudflare Pages.
- **Purpose**: Review changes before merge.
- **Lifecycle**: Automatically created on PR open, destroyed on PR close.
- **Limitations**: No custom domain, no Workers (unless configured), reduced rate limits.

---

## 4. Manual Approval Process

### When Approval is Required

| Change Type | Approval Required | Approver |
|-------------|-------------------|----------|
| Feature merge to `main` | No (CI passes) | N/A |
| Hotfix merge to `main` | Yes | Maintainer |
| Infrastructure change | Yes | Maintainer |
| Dependency major version bump | Yes | Maintainer |
| Security patch | No (auto-deploy) | N/A |
| Rollback | Yes | Maintainer |

### Approval Workflow

1. Developer opens PR targeting `main`.
2. CI pipeline runs all stages.
3. Preview deployment URL posted to PR.
4. Reviewer validates preview and approves PR.
5. PR is merged to `main`.
6. CI pipeline runs again on `main`.
7. If all stages pass, deployment proceeds automatically (or via manual approval gate for high-risk changes).

### Approval Gate Implementation

```yaml
# In CI pipeline configuration
deploy-production:
  needs: [lint, test, security, build]
  if: github.ref == 'refs/heads/main'
  environment:
    name: production
    url: https://encp.wikisites.dev
  # Manual approval configured in Cloudflare Pages or CI platform
```

---

## 5. Rollback Procedures

### Automatic Rollback

**Trigger Conditions**
- Post-deployment Lighthouse audit fails critical threshold.
- Error rate increases by more than 50% within 10 minutes of deployment.
- Cloudflare Health Check reports degraded status.

**Process**
1. Cloudflare Pages automatically reverts to the previous deployment.
2. Rollback notification sent to `#wikisites-alerts`.
3. Developer is notified and must investigate root cause.
4. Post-incident review required within 48 hours.

### Manual Rollback

**When to Use**
- Performance degradation detected in monitoring (below automatic rollback threshold).
- Content or functionality issue identified by users.
- Security concern requiring immediate revert.

**Process**

```bash
# List recent deployments
npx wrangler pages deployment list --project-name=wikisites-encp

# Rollback to specific deployment
npx wrangler pages deployment rollback --project-name=wikisites-encp {deployment-id}

# Verify rollback
curl -I https://encp.wikisites.dev
```

**Post-Rollback Actions**
1. Notify team in `#wikisites-ci` with rollback reason.
2. Create issue documenting the regression.
3. Fix the issue in a new branch.
4. Go through full deployment process again.

### Rollback Time Objectives

| Metric | Target |
|--------|--------|
| Detection to acknowledgment | < 5 minutes |
| Acknowledgment to rollback decision | < 15 minutes |
| Rollback execution | < 2 minutes |
| Full rollback (including verification) | < 30 minutes |

---

## 6. Blue-Green Deployment via Cloudflare

### Concept

Cloudflare Pages implements blue-green deployment inherently:
- **Blue**: Current production deployment serving traffic.
- **Green**: New deployment uploaded but not yet routed to production.
- **Switch**: Cloudflare propagates the new deployment globally; old deployment remains as fallback.

### Implementation

**Step 1: Deploy Green**
```bash
npx wrangler pages deploy dist/encp --project-name=wikisites-encp --branch=main
```

**Step 2: Verify Green**
- Run smoke tests against the new deployment.
- Check Cloudflare Pages dashboard for deployment status.
- Verify DNS propagation is complete.

**Step 3: Route Traffic**
- Cloudflare Pages automatically routes traffic to the latest production deployment.
- No manual DNS changes required.
- Previous deployment remains accessible for rollback.

**Step 4: Monitor**
- Watch error rates, performance metrics, and user reports for 30 minutes.
- If issues detected, trigger rollback (see Section 5).

### Rollback via Blue-Green

Since Cloudflare Pages retains previous deployments:
1. Identify the stable previous deployment in Cloudflare Pages dashboard.
2. Click "Rollback to this deployment" or use CLI.
3. Cloudflare routes traffic back to the previous deployment.
4. Total rollback time: < 2 minutes.

---

## 7. Deployment Monitoring

### Pre-Deployment Checks

| Check | Tool | Gate |
|-------|------|------|
| Lint passes | ESLint, Prettier, TypeScript | Required |
| Unit tests pass | Vitest | Required |
| Integration tests pass | Vitest | Required |
| Security scan clean | npm audit, Snyk | Required |
| Build succeeds | Astro build | Required |
| Bundle size within threshold | Bundle analyzer | Required |

### Post-Deployment Checks

| Check | Tool | Timing |
|-------|------|--------|
| Health check | curl / health endpoint | Immediate |
| Lighthouse audit | Lighthouse CI | Within 5 minutes |
| Error rate monitoring | Cloudflare Analytics | 30-minute observation |
| RUM performance | Cloudflare Web Analytics | 24-hour observation |
| User reports | Manual / support channels | Ongoing |

### Deployment Health Dashboard

Track the following in the deployment dashboard:

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Error rate | < 1% | 1-5% | > 5% |
| Response time (P95) | < 3s | 3-5s | > 5s |
| Lighthouse Performance | > 85 | 70-85 | < 70 |
| Lighthouse Accessibility | > 90 | 80-90 | < 80 |
| TTFB | < 200ms | 200-400ms | > 400ms |

---

## 8. CI Pipeline Stage Details

### Lint Stage

```yaml
lint:
  steps:
    - name: ESLint
      run: npx eslint . --max-warnings=0
    - name: Prettier Check
      run: npx prettier --check .
    - name: TypeScript Check
      run: npx tsc --noEmit
```

**Failure Behavior**: Block all subsequent stages. No deployment.

### Test Stage

```yaml
test:
  needs: lint
  steps:
    - name: Vitest Unit
      run: npx vitest run --reporter=verbose
    - name: Vitest Integration
      run: npx vitest run --config vitest.integration.config.ts
    - name: Coverage Report
      run: npx vitest run --coverage
```

**Failure Behavior**: Block all subsequent stages. Coverage regression checked against `baseline_metrics.toml`.

### Security Stage

```yaml
security:
  needs: lint
  steps:
    - name: npm audit
      run: npm audit --audit-level=high
    - name: Snyk Test
      run: npx snyk test --severity-threshold=high
    - name: CSP Check
      run: node scripts/check-csp.js
```

**Failure Behavior**: High/critical vulnerabilities block deployment. Low/moderate logged as warnings.

### Build Stage

```yaml
build:
  needs: [test, security]
  steps:
    - name: Build ENCP
      run: npm run build:encp
    - name: Build Wiki
      run: npm run build:wiki
    - name: Bundle Size Check
      run: node scripts/check-bundle-size.js
    - name: Build Time Report
      run: node scripts/report-build-time.js
```

**Failure Behavior**: Build failure blocks deployment. Bundle size exceeding threshold blocks deployment. Build time exceeding threshold logs warning.

### Deploy Stage

```yaml
deploy:
  needs: build
  if: github.ref == 'refs/heads/main' || github.event_name == 'pull_request'
  steps:
    - name: Deploy ENCP
      run: npx wrangler pages deploy dist/encp --project-name=wikisites-encp
    - name: Deploy Wiki
      run: npx wrangler pages deploy dist/wiki --project-name=wikisites-wiki
    - name: Post Deploy Lighthouse
      run: npx lhci autorun
    - name: Notify Deployment
      run: node scripts/notify-deploy.js
```

**Failure Behavior**: Deployment failure triggers automatic rollback to previous stable deployment.

---

## 9. Security Considerations

### Secrets Management

- All secrets stored in CI platform's secret store (not in repository).
- Secrets rotated quarterly or on personnel change.
- Minimum privilege principle: each stage only has access to required secrets.

### Supply Chain Security

- Lockfile committed and validated in CI.
- Dependencies pinned to specific versions in `package.json`.
- `npm ci` used in CI (not `npm install`) to ensure reproducible builds.
- Snyk monitors for newly discovered vulnerabilities in dependencies.

### Deployment Security

- Cloudflare API tokens scoped to Pages projects only.
- No direct SSH access to production infrastructure.
- All deployments logged with commit SHA, author, and timestamp.
- Deployment audit trail available in Cloudflare dashboard.

---

## 10. Maintenance and Operations

### Regular Operations

| Task | Frequency | Owner |
|------|-----------|-------|
| Dependency updates | Weekly (automated via Renovate) | Automated |
| Security scan review | Weekly | Maintainer |
| Deployment log review | Monthly | Maintainer |
| Cloudflare configuration audit | Quarterly | Maintainer |
| Rollback procedure test | Quarterly | Team |

### Incident Response

1. **Detection**: Automated monitoring or user report.
2. **Triage**: Assess severity using alerting rules from Phase 5.5.
3. **Mitigation**: Rollback if user-impacting; fix forward if non-critical.
4. **Resolution**: Deploy fix through full CI pipeline.
5. **Post-Mortem**: Document root cause, impact, and prevention measures.

### Capacity Planning

- Monitor Cloudflare Pages bandwidth and request limits.
- Current plan supports wikisites traffic with significant headroom.
- Review plan limits quarterly as traffic grows.
- Alert when approaching 80% of plan limits.
