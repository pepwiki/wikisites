# Supply Chain Monitoring Strategy

**Project:** wikisites
**Phase:** 9.5 Supply Chain Monitoring
**Date:** 2026-06-07
**Status:** APPROVED
**Scope:** Continuous dependency, vulnerability, and license monitoring

---

## 1. Executive Summary

This document defines the continuous supply chain monitoring strategy for wikisites. The strategy operates across three layers: automated dependency management, scheduled CVE scanning, and ongoing license compliance verification. All monitoring integrates with the CI/CD pipeline defined in Phase 6 and the alerting rules defined in the companion alerting_rules.md document.

**Monitoring Objectives:**
- Detect and remediate known vulnerabilities within SLA (24 hours for critical)
- Ensure license compliance across all 43 direct dependencies and ~150-200 transitive packages
- Automate dependency updates while maintaining stability
- Maintain audit trail for compliance and incident response

---

## 2. Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   SUPPLY CHAIN MONITORING                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  RENOVATE    │  │  CVE SCAN    │  │  LICENSE CHECK   │  │
│  │  (Dep Mgmt)  │  │  (Security)  │  │  (Compliance)    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────────┘  │
│         │                 │                 │               │
│         v                 v                 v               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              CI/CD PIPELINE GATES                    │   │
│  │  pnpm audit --audit-level=high                      │   │
│  │  license-checker --production --failOn GPL;AGPL     │   │
│  │  lockfile integrity verification                    │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                   │
│                         v                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              ALERTING & REPORTING                    │   │
│  │  GitHub Security Advisories                         │   │
│  │  Renovate PR notifications                          │   │
│  │  Weekly digest email                                │   │
│  │  Slack/Discord webhook                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Dependabot / Renovate Configuration

### 3.1 Renovate (Primary)

Renovate is the primary dependency management tool, configured for automated detection and PR creation.

**Core Configuration (renovate.json):**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:recommended",
    "security:openssf-scorecard"
  ],
  "labels": ["dependencies"],
  "schedule": ["before 6am on Monday"],
  "timezone": "UTC",
  "prConcurrentLimit": 5,
  "prHourlyLimit": 2
}
```

**Package Rules:**

| Rule | Match | Automerge | Reviewers | Minimum Age | SLA |
|------|-------|-----------|-----------|-------------|-----|
| Patch updates | `updateTypes: ["patch"]` | Yes (squash) | CI only | None | 7 days |
| Minor updates | `updateTypes: ["minor"]` | No | 1 approval | 3 days | 30 days |
| Major updates | `updateTypes: ["major"]` | No | 2 approvals | 7 days | 90 days |
| Security patches | `updateTypes: ["pin"]` + security | Yes | CI only | None | 24 hours |
| Deprecated packages | `isDeprecated: true` | No | Maintainer | None | Immediate |
| License changes | `hasLicenseChanged: true` | No | Legal review | None | Immediate |

**Branch Strategy:**
- Renovate creates `renovate/*` branches with descriptive names
- Patch PRs: auto-merge after CI passes
- Minor PRs: require 1 maintainer approval
- Major PRs: require 2 maintainer approvals and changelog review
- All PRs receive `dependencies` label

### 3.2 Dependabot (Fallback)

If Renovate is unavailable or for GitHub-native security alerts:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "06:00"
      timezone: "UTC"
    open-pull-requests-limit: 5
    reviewers:
      - "maintainer"
    labels:
      - "dependencies"
    groups:
      eslint:
        patterns: ["eslint*", "@typescript-eslint/*"]
      astro:
        patterns: ["astro", "@astrojs/*"]
      solid:
        patterns: ["solid-js", "@solidjs/*"]
      cloudflare:
        patterns: ["wrangler", "@cloudflare/*"]
      testing:
        patterns: ["vitest", "@playwright/*", "cypress"]
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-patch"]
```

### 3.3 Update Policy Matrix

| Dependency Category | Update Type | Review | Auto-merge | Notification |
|--------------------|-------------|--------|------------|--------------|
| Core Framework (astro, vite, typescript) | Patch | 2 approvals | No | PR + Slack |
| Core Framework | Minor | 2 approvals + changelog | No | PR + Slack |
| Core Framework | Major | 2 approvals + migration plan | No | PR + Slack + email |
| SolidJS ecosystem | Patch | 1 approval | After CI | PR |
| SolidJS ecosystem | Minor | 1 approval | No | PR |
| Dev tooling (eslint, prettier, vitest) | Patch | 1 approval | After CI | PR |
| Dev tooling | Minor | 1 approval | No | PR |
| Cloudflare (wrangler, workers-types) | Any | 2 approvals | No | PR + Slack |
| Security (xss, dompurify) | Patch | Maintainer only | No | PR + Slack |
| Utilities (UnJS, etc.) | Patch | 1 approval | After CI | PR |

---

## 4. CVE Scanning Schedule

### 4.1 Scanning Cadence

| Scan Type | Tool | Frequency | Scope | Gate |
|-----------|------|-----------|-------|------|
| Build-time audit | `pnpm audit --audit-level=high` | Every CI build | All dependencies | CI pipeline |
| Deep vulnerability scan | `pnpm audit --audit-level=critical` | Every CI build | Direct + transitive | CI pipeline |
| Security advisory check | GitHub Security Advisories | Real-time | GitHub ecosystem | Alert |
| Snyk vulnerability scan | `snyk test --severity-threshold=high` | Weekly (scheduled) | All dependencies | Report |
| Supply chain behavior analysis | Socket.dev | Every PR | New dependencies | PR review |
| Lockfile integrity | `pnpm install --frozen-lockfile --offline` | Every CI build | Lockfile | CI pipeline |
| SBOM drift detection | SPDX comparison | Monthly | Full SBOM | Report |

### 4.2 Severity-Based Response

| Severity | CVSS | Response Time | Auto-PR | Auto-merge | Escalation |
|----------|------|---------------|---------|------------|------------|
| Critical | 9.0-10.0 | 24 hours | Yes | No (manual review) | Immediate Slack + email |
| High | 7.0-8.9 | 72 hours | Yes | No | PR review required |
| Medium | 4.0-6.9 | 7 days | Yes | Yes (after CI) | Weekly digest |
| Low | 0.1-3.9 | 30 days | Yes | Yes (after CI) | Monthly report |
| Informational | 0.0 | Next cycle | No | N/A | Quarterly review |

### 4.3 Scan Configuration

```bash
# CI Pipeline: Build-time audit (every build)
pnpm audit --audit-level=high --audit-level=critical 2>&1 | tee audit-results.json

# CI Pipeline: Lockfile integrity (every build)
pnpm install --frozen-lockfile --offline 2>&1 | tee lockfile-verify.txt

# CI Pipeline: License compliance (every build)
npx license-checker --production --failOn "GPL;AGPL;LGPL;SSPL" --json > license-report.json

# Scheduled: Deep scan (weekly)
snyk test --severity-threshold=high --json > snyk-report.json

# Scheduled: Supply chain behavior analysis
npx socket scan 2>&1 | tee socket-report.json
```

---

## 5. License Compliance Monitoring

### 5.1 License Policy

| License Category | Allowed | Action on Violation |
|-----------------|---------|---------------------|
| MIT | YES | No action |
| Apache-2.0 | YES | Include NOTICE file |
| ISC | YES | No action |
| BSD-2-Clause | YES | Include copyright notice |
| BSD-3-Clause | YES | Include copyright notice |
| 0BSD | YES | No action |
| MPL-2.0 | REVIEW | Legal assessment required |
| LGPL-2.1 | BLOCK | Remove dependency, find alternative |
| LGPL-3.0 | BLOCK | Remove dependency, find alternative |
| GPL-2.0 | BLOCK | Remove dependency, find alternative |
| GPL-3.0 | BLOCK | Remove dependency, find alternative |
| AGPL-3.0 | BLOCK | Remove dependency, find alternative |
| SSPL | BLOCK | Remove dependency, find alternative |
| CC-BY-4.0 | REVIEW | Legal assessment for content licenses |
| Unknown | BLOCK | Verify license before approval |

### 5.2 License Monitoring Configuration

```bash
# CI Pipeline: License check
npx license-checker --production --json > licenses.json
npx license-checker --production --failOn "GPL;AGPL;LGPL;SSPL"

# CI Pipeline: New dependency license verification
npx license-checker --production --csv > licenses.csv
# Diff against previous CSV to detect license changes
diff <(git show HEAD~1:licenses.csv) licenses.csv > license-changes.txt

# Scheduled: Full license audit
npx license-checker --production --summary
```

### 5.3 License Change Detection

| Event | Detection Method | Response |
|-------|-----------------|----------|
| New dependency added | Renovate PR review | Verify license in PR |
| Dependency changes license | Weekly diff check | Immediate review if to copyleft |
| License text updated | Monthly SBOM review | Verify compliance |
| Package deprecated | Renovate detection | Find alternative within 30 days |

### 5.4 Attribution Management

```bash
# Generate NOTICE file
npx license-checker --production --customPath '{"licenseText": ""}' > NOTICE

# Update SBOM with license changes
npx license-checker --production --json > sbom-licenses.json
```

---

## 6. Dependency Update Policy

### 6.1 Update Categories

| Category | Update Type | Policy | Testing Required |
|----------|-------------|--------|------------------|
| Security patch | Patch | Immediate (within 24 hours) | CI passes |
| Bug fix | Patch | Weekly batch | CI passes |
| Feature | Minor | Monthly review | CI + manual review |
| Breaking change | Major | Quarterly evaluation | Full test suite + E2E |
| Deprecation | Any | Immediate replacement | CI + manual verification |

### 6.2 Testing Requirements by Update Type

| Update Type | Unit Tests | Integration Tests | E2E Tests | Lighthouse | Manual Review |
|-------------|-----------|-------------------|-----------|------------|---------------|
| Patch (auto) | Required | Required | Not required | Not required | No |
| Minor | Required | Required | Not required | Recommended | Yes (1 reviewer) |
| Major | Required | Required | Required | Required | Yes (2 reviewers) |
| Security patch | Required | Required | Not required | Not required | No (auto-merge) |

### 6.3 Rollback Policy for Dependency Updates

| Scenario | Action | SLA |
|----------|--------|-----|
| CI fails after dependency update | Revert to previous version | Immediately |
| Performance regression detected | Revert to previous version | Within 24 hours |
| License change to copyleft | Block PR, find alternative | Within 7 days |
| Deprecated dependency detected | Create issue, schedule replacement | Within 30 days |

---

## 7. Alert Thresholds

### 7.1 Vulnerability Alert Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| Critical CVE count | > 0 | Immediate alert + auto-PR |
| High CVE count | > 0 | Alert within 24 hours |
| Medium CVE count | > 5 | Alert in weekly digest |
| Low CVE count | > 10 | Alert in monthly report |
| Deprecated packages | > 0 | Alert in weekly digest |
| License violations | > 0 | Immediate alert + block CI |

### 7.2 Supply Chain Health Metrics

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Dependency freshness (% up to date) | > 90% | 70-90% | < 70% |
| CVE remediation time (critical) | < 24 hours | 24-72 hours | > 72 hours |
| CVE remediation time (high) | < 72 hours | 72 hours - 7 days | > 7 days |
| License compliance rate | 100% | 95-100% | < 95% |
| Lockfile integrity | PASS | WARN | FAIL |
| Renovate PR merge rate | > 80% | 60-80% | < 60% |

### 7.3 Notification Channels

| Severity | Channel | Recipients | Frequency |
|----------|---------|------------|-----------|
| Critical | Slack webhook + email | Maintainer, Security | Immediate |
| High | Slack webhook | Maintainer | Within 1 hour |
| Medium | GitHub PR notification | Maintainer | On PR creation |
| Low | Weekly digest email | Maintainer | Weekly (Monday) |
| Informational | Monthly report | Maintainer | Monthly |

---

## 8. CI/CD Integration

### 8.1 Pipeline Gate Configuration

```yaml
# Supply chain security gate in CI pipeline
supply-chain-security:
  needs: lint
  steps:
    - name: Lockfile integrity check
      run: pnpm install --frozen-lockfile --offline
    - name: Vulnerability audit
      run: pnpm audit --audit-level=high
    - name: License compliance check
      run: npx license-checker --production --failOn "GPL;AGPL;LGPL;SSPL"
    - name: Deprecated package check
      run: npx license-checker --production --json | node scripts/check-deprecated.js
    - name: Lockfile hash verification
      run: node scripts/verify-lockfile-hashes.js
```

### 8.2 PR Check Configuration

```yaml
# Supply chain checks on every PR
supply-chain-pr-check:
  steps:
    - name: Verify no new high/critical CVEs
      run: pnpm audit --audit-level=high
    - name: Verify license compatibility
      run: npx license-checker --production --failOn "GPL;AGPL;LGPL;SSPL"
    - name: Check for deprecated dependencies
      run: node scripts/check-deprecated.js
    - name: Verify lockfile is up to date
      run: pnpm install --frozen-lockfile
```

### 8.3 Scheduled Scan Workflow

```yaml
# .github/workflows/supply-chain-monitor.yml
name: Supply Chain Monitor
on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly on Monday at 06:00 UTC
  workflow_dispatch:

jobs:
  deep-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - name: Deep vulnerability scan
        run: pnpm audit --audit-level=critical
      - name: Full license audit
        run: npx license-checker --production --summary
      - name: Supply chain behavior analysis
        run: npx socket scan
      - name: Generate SBOM
        run: npx @cyclonedx/cyclonedx-npm --output-file sbom.json
      - name: Upload scan results
        uses: actions/upload-artifact@v4
        with:
          name: supply-chain-scan-${{ github.run_id }}
          path: |
            sbom.json
            licenses.json
            audit-results.json
```

---

## 9. Audit Trail and Compliance

### 9.1 Audit Events

| Event | Logged Data | Retention |
|-------|-------------|-----------|
| Dependency updated | Package, old version, new version, author, timestamp | 2 years |
| CVE detected | Package, CVE ID, severity, CVSS, detection time | 5 years |
| CVE remediated | Package, CVE ID, fix version, remediation time | 5 years |
| License change | Package, old license, new license, detection time | 5 years |
| PR created (Renovate) | Package, update type, PR number, creation time | 1 year |
| PR merged | Package, update type, PR number, merge time, approvals | 2 years |
| Scan executed | Scan type, tool version, results summary, duration | 1 year |

### 9.2 Compliance Reports

| Report | Frequency | Contents | Distribution |
|--------|-----------|----------|--------------|
| Weekly supply chain digest | Weekly (Monday) | New CVEs, pending PRs, deprecated packages | Maintainer email |
| Monthly compliance report | Monthly (1st) | License status, dependency freshness, SLA metrics | Maintainer + archive |
| Quarterly security review | Quarterly | Full vulnerability assessment, risk rating, recommendations | Maintainer + security |
| Annual supply chain audit | Annually | Complete dependency audit, license audit, process review | External + archive |

### 9.3 Metrics Collection

```bash
# Dependency freshness report
pnpm outdated --format json > metrics/outdated.json

# License summary
npx license-checker --production --summary > metrics/licenses.json

# Vulnerability count by severity
pnpm audit --json > metrics/audit.json

# Renovate PR statistics
curl -s "https://api.github.com/repos/OWNER/REPO/pulls?labels=dependencies&state=all&per_page=100" > metrics/prs.json
```

---

## 10. Incident Response Integration

### 10.1 Supply Chain Incident Severity

| Severity | Definition | Examples | Response |
|----------|-----------|----------|----------|
| P0 | Active exploit in production dependency | Zero-day CVE being exploited | Immediate patch + post-mortem |
| P1 | Critical CVE with public exploit | CVE published, PoC available | 24-hour remediation |
| P2 | High CVE, no known exploit | CVE published, no PoC | 72-hour remediation |
| P3 | Medium/Low CVE | Low-impact vulnerability | Scheduled remediation |
| P4 | Deprecated dependency | Package deprecated | 30-day replacement window |

### 10.2 Escalation Matrix

| Severity | First Responder | Escalation (1 hour) | Escalation (4 hours) |
|----------|----------------|---------------------|----------------------|
| P0 | Maintainer | External security | Full team |
| P1 | Maintainer | Maintainer | External security |
| P2 | Maintainer | Maintainer | Maintainer |
| P3 | Maintainer | N/A | N/A |
| P4 | Maintainer | N/A | N/A |

---

## 11. Tools and Integrations

### 11.1 Tool Stack

| Tool | Purpose | Integration | License |
|------|---------|-------------|---------|
| Renovate | Automated dependency updates | GitHub/Gitea | Free for open-source |
| pnpm audit | Vulnerability scanning | CI/CD pipeline | Built-in |
| Snyk | Deep vulnerability scanning | Weekly scheduled | Free tier |
| license-checker | License compliance | CI/CD pipeline | MIT |
| Socket.dev | Supply chain behavior analysis | PR review | Free tier |
| CycloneDX | SBOM generation | Monthly scheduled | Apache-2.0 |
| GitHub Security Advisories | CVE notification | Real-time | Free |
| OWASP Dependency-Check | Java/transitive scanning | Optional | Apache-2.0 |

### 11.2 Integration Points

| System | Integration | Purpose |
|--------|-------------|---------|
| CI/CD pipeline | pnpm audit gate | Block builds on high/critical CVEs |
| GitHub/Gitea | Security advisories | Real-time CVE notification |
| Renovate | PR automation | Dependency update management |
| Slack/Discord | Webhook notifications | Alert delivery |
| Email | Digest reports | Weekly/monthly reporting |
| Cloudflare | Worker logging | Runtime supply chain events |

---

## 12. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Supply chain attack via dependency | Medium | High | Lockfile integrity, audit, Renovate monitoring |
| License violation in production | Low | High | CI gate, license-checker, automated detection |
| Critical CVE with no patch | Low | High | Monitoring, risk acceptance process, alternative evaluation |
| Renovate misconfiguration | Low | Medium | Test in staging, manual review for major updates |
| Scan tool failure | Low | Low | Multiple tools, manual fallback procedures |
| Dependency abandonment | Medium | Medium | Monitor maintenance status, plan alternatives |

---

## 13. Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| CVE remediation time (critical) | < 24 hours | Time from detection to fix |
| CVE remediation time (high) | < 72 hours | Time from detection to fix |
| License compliance rate | 100% | License-checker CI gate |
| Dependency freshness | > 90% | pnpm outdated analysis |
| Renovate PR merge rate | > 80% | PR statistics |
| False positive rate | < 5% | Manual review of alerts |

---

*Document generated: 2026-06-07T00:00:00Z*
*Review frequency: Quarterly*
*Next review: 2026-09-07*
*Classification: Internal*
