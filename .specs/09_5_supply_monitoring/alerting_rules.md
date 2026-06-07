# Supply Chain Alerting Rules

**Project:** wikisites
**Phase:** 9.5 Supply Chain Monitoring
**Date:** 2026-06-07
**Status:** APPROVED
**Scope:** Alert definitions, escalation paths, SLA targets, notification routing

---

## 1. Alert Classification

### 1.1 Severity Levels

| Level | Name | Description | Response SLA | Example |
|-------|------|-------------|-------------|---------|
| P0 | Critical | Active security threat in production dependency | 1 hour | Zero-day CVE with public exploit |
| P1 | High | Known vulnerability with high CVSS score | 24 hours | CVE 7.0-8.9 in production dependency |
| P2 | Medium | Moderate vulnerability or policy violation | 7 days | CVE 4.0-6.9, license change |
| P3 | Low | Minor vulnerability or maintenance alert | 30 days | CVE 0.1-3.9, deprecated package |
| P4 | Informational | Observation requiring no immediate action | Next cycle | Outdated but functional dependency |

---

## 2. Alert Rules

### 2.1 Critical CVE — Immediate Alert + Auto-PR

**Rule ID:** ALERT-001
**Severity:** P0
**Trigger:** Any dependency (direct or transitive) has a CVE with CVSS >= 9.0
**Detection:** pnpm audit, Snyk scan, GitHub Security Advisories

**Actions:**
1. Create auto-PR with patch version bump (Renovate security update)
2. Send immediate Slack webhook alert to `#security-critical`
3. Send immediate email to maintainer
4. If production deployment is affected:
   - Trigger automatic rollback to previous stable deployment
   - Create incident issue with `P0` and `security` labels
5. Post-deployment verification required within 1 hour

**Notification Payload:**
```json
{
  "severity": "P0",
  "type": "CRITICAL_CVE",
  "package": "<package-name>",
  "version": "<current-version>",
  "cve": "CVE-YYYY-XXXXX",
  "cvss": 9.5,
  "affected_version": "<vulnerable-range>",
  "fix_version": "<patched-version>",
  "auto_pr": "https://github.com/OWNER/REPO/pull/XXXXX",
  "response_sla": "1 hour",
  "timestamp": "ISO-8601"
}
```

**Escalation:**
- 0-15 minutes: Auto-PR created, maintainer notified
- 15-60 minutes: If not acknowledged, escalate to security contact
- 1-4 hours: If not remediated, consider manual intervention
- 4+ hours: Full incident response, potential site takedown consideration

### 2.2 High CVE — 24-Hour SLA

**Rule ID:** ALERT-002
**Severity:** P1
**Trigger:** Any dependency has a CVE with CVSS 7.0-8.9
**Detection:** pnpm audit, Snyk scan, GitHub Security Advisories

**Actions:**
1. Create auto-PR with patch/minor version bump
2. Send Slack webhook alert to `#security-high`
3. Create issue with `high-severity` and `security` labels
4. Assign to maintainer for review within 24 hours
5. Block any new deployments until remediated

**Notification Payload:**
```json
{
  "severity": "P1",
  "type": "HIGH_CVE",
  "package": "<package-name>",
  "version": "<current-version>",
  "cve": "CVE-YYYY-XXXXX",
  "cvss": 7.5,
  "affected_version": "<vulnerable-range>",
  "fix_version": "<patched-version>",
  "auto_pr": "https://github.com/OWNER/REPO/pull/XXXXX",
  "response_sla": "24 hours",
  "timestamp": "ISO-8601"
}
```

**Escalation:**
- 0-2 hours: Auto-PR created, maintainer notified
- 2-24 hours: If not acknowledged, send reminder email
- 24-72 hours: If not remediated, escalate to P0 severity
- 72+ hours: Consider temporary dependency removal or restriction

### 2.3 Deprecated Dependency — Weekly Digest

**Rule ID:** ALERT-003
**Severity:** P3
**Trigger:** Any direct dependency is marked as deprecated by npm
**Detection:** Renovate deprecation detection, npm deprecation notice

**Actions:**
1. Create issue with `deprecated-dependency` label
2. Add to weekly supply chain digest
3. Schedule replacement evaluation within 30 days
4. Create Renovate PR with alternative recommendation (if available)

**Notification Payload:**
```json
{
  "severity": "P3",
  "type": "DEPRECATED_DEPENDENCY",
  "package": "<package-name>",
  "version": "<current-version>",
  "deprecation_message": "<npm-deprecation-notice>",
  "recommended_alternative": "<alternative-package>",
  "response_sla": "30 days",
  "timestamp": "ISO-8601"
}
```

**Escalation:**
- Week 1: Issue created, added to digest
- Week 2-3: Evaluate alternatives, create migration plan
- Week 4: Execute migration or document exception
- Month 2+: Escalate to P2 if no migration plan

### 2.4 License Change — Immediate Review

**Rule ID:** ALERT-004
**Severity:** P2 (or P0 if to copyleft)
**Trigger:** Any dependency changes its license in a new version
**Detection:** license-checker diff, Renovate license detection

**Actions:**
1. Block any auto-merge for the affected dependency
2. Send immediate Slack webhook alert if change is to copyleft
3. Send email to maintainer for any license change
4. Create issue with `license-change` label
5. Require legal/maintainer review before accepting update

**Notification Payload:**
```json
{
  "severity": "P2",
  "type": "LICENSE_CHANGE",
  "package": "<package-name>",
  "old_license": "<previous-license>",
  "new_license": "<new-license>",
  "is_copyleft": false,
  "response_sla": "7 days",
  "timestamp": "ISO-8601"
}
```

**Escalation:**
- Immediate: Block auto-merge, notify maintainer
- 24 hours: If change is to copyleft, escalate to P0
- 7 days: If no decision, escalate to P1
- 30 days: If no resolution, consider dependency removal

### 2.5 Medium CVE — Scheduled Remediation

**Rule ID:** ALERT-005
**Severity:** P2
**Trigger:** Any dependency has a CVE with CVSS 4.0-6.9
**Detection:** pnpm audit, Snyk scan

**Actions:**
1. Create auto-PR with version bump
2. Add to weekly supply chain digest
3. Schedule remediation within 7 days
4. Track in monthly compliance report

**Notification Payload:**
```json
{
  "severity": "P2",
  "type": "MEDIUM_CVE",
  "package": "<package-name>",
  "cve": "CVE-YYYY-XXXXX",
  "cvss": 5.5,
  "fix_version": "<patched-version>",
  "auto_pr": "https://github.com/OWNER/REPO/pull/XXXXX",
  "response_sla": "7 days",
  "timestamp": "ISO-8601"
}
```

### 2.6 Low CVE — Monthly Tracking

**Rule ID:** ALERT-006
**Severity:** P3
**Trigger:** Any dependency has a CVE with CVSS 0.1-3.9
**Detection:** pnpm audit, Snyk scan

**Actions:**
1. Log in monthly compliance report
2. Create auto-PR if patch available
3. No immediate action required

### 2.7 Lockfile Integrity Failure — Immediate Alert

**Rule ID:** ALERT-007
**Severity:** P1
**Trigger:** Lockfile hash mismatch or lockfile regeneration required
**Detection:** `pnpm install --frozen-lockfile --offline` failure

**Actions:**
1. Block all CI builds
2. Send immediate Slack webhook alert
3. Create issue with `lockfile-integrity` label
4. Require manual investigation before any deployment

**Escalation:**
- Immediate: Block builds, notify maintainer
- 1 hour: If not investigated, escalate
- 4 hours: Full incident response

### 2.8 Dependency Freshness Degradation — Weekly Alert

**Rule ID:** ALERT-008
**Severity:** P3
**Trigger:** More than 30% of dependencies are outdated
**Detection:** `pnpm outdated` analysis

**Actions:**
1. Add to weekly supply chain digest
2. Create batch Renovate PR for available updates
3. Track in monthly compliance report

---

## 3. Escalation Paths

### 3.1 Escalation Matrix

| Severity | First Responder | 1-Hour Escalation | 4-Hour Escalation | 24-Hour Escalation |
|----------|----------------|-------------------|-------------------|-------------------|
| P0 | Maintainer | Security contact | External security | Full team + stakeholders |
| P1 | Maintainer | Maintainer | Maintainer | Escalate to P0 if unresolved |
| P2 | Maintainer | N/A | N/A | Remind if unresolved |
| P3 | Maintainer | N/A | N/A | N/A |
| P4 | Maintainer | N/A | N/A | N/A |

### 3.2 Notification Channels by Severity

| Severity | Slack | Email | GitHub Issue | CI Block | Rollback |
|----------|-------|-------|--------------|----------|----------|
| P0 | #security-critical | Immediate | Yes (P0 label) | Yes | Yes (auto) |
| P1 | #security-high | Within 1 hour | Yes (P1 label) | Yes | Consider |
| P2 | #security-medium | Weekly digest | Yes (P2 label) | No | No |
| P3 | #security-low | Monthly report | Yes (P3 label) | No | No |
| P4 | None | Monthly report | No | No | No |

### 3.3 Contact Rotation

| Role | Primary | Backup | Contact Method |
|------|---------|--------|----------------|
| Maintainer | KP | N/A | GitHub, Email, Slack |
| Security Reviewer | KP | N/A | GitHub, Email |
| External Security | TBD | N/A | Email, Phone |

---

## 4. Auto-PR Rules

### 4.1 Auto-PR Creation Conditions

| Condition | Auto-PR Created | Auto-merge | Review Required |
|-----------|----------------|------------|-----------------|
| Patch security update | Yes | After CI passes | No |
| Minor security update | Yes | No | 1 approval |
| Major security update | Yes | No | 2 approvals + changelog |
| Regular patch update | Yes (Renovate) | After CI passes | No |
| Regular minor update | Yes (Renovate) | No | 1 approval |
| Regular major update | Yes (Renovate) | No | 2 approvals |

### 4.2 Auto-PR Naming Convention

```
fix(deps): update <package> to <new-version> [security]

- Fixes: CVE-YYYY-XXXXX (CVSS: X.X)
- Affected versions: <range>
- Patched version: <version>
- Auto-generated by supply chain monitoring
```

### 4.3 Auto-PR Label Rules

| Label | Applied When |
|-------|-------------|
| `dependencies` | All dependency updates |
| `security` | Security-related updates |
| `critical` | P0/P1 severity |
| `high-severity` | P1 severity |
| `needs-review` | Updates requiring manual review |
| `auto-merge` | Updates eligible for auto-merge |

---

## 5. SLA Targets

### 5.1 Vulnerability Remediation SLAs

| Severity | Detection to Acknowledgment | Acknowledgment to Fix | Fix to Deployment | Total SLA |
|----------|---------------------------|----------------------|-------------------|-----------|
| P0 (Critical) | < 15 minutes | < 1 hour | < 1 hour | 2 hours |
| P1 (High) | < 1 hour | < 12 hours | < 12 hours | 24 hours |
| P2 (Medium) | < 24 hours | < 3 days | < 4 days | 7 days |
| P3 (Low) | < 24 hours | < 14 days | < 16 days | 30 days |
| P4 (Info) | < 1 week | < 30 days | < 31 days | 60 days |

### 5.2 Compliance SLAs

| Metric | Target | Measurement |
|--------|--------|-------------|
| License compliance rate | 100% | license-checker CI gate |
| Dependency freshness | > 90% | pnpm outdated analysis |
| CVE remediation (critical) | 100% within 24 hours | Time from detection to fix |
| CVE remediation (high) | 95% within 72 hours | Time from detection to fix |
| Auto-PR merge rate | > 80% | PR statistics |
| Lockfile integrity | 100% | CI gate |

---

## 6. Alert Routing Configuration

### 6.1 Slack Webhook Configuration

```json
{
  "slack": {
    "webhook_url": "SLACK_WEBHOOK_URL (environment variable)",
    "channels": {
      "critical": "#security-critical",
      "high": "#security-high",
      "medium": "#security-medium",
      "low": "#security-low",
      "digest": "#supply-chain-digest"
    },
    "mentions": {
      "critical": "@channel @maintainer",
      "high": "@maintainer",
      "medium": "",
      "low": "",
      "digest": ""
    }
  }
}
```

### 6.2 Email Configuration

```json
{
  "email": {
    "smtp_host": "SMTP_HOST (environment variable)",
    "smtp_port": 587,
    "from": "security-alerts@wikisites.dev",
    "recipients": {
      "critical": ["maintainer@wikisites.dev"],
      "high": ["maintainer@wikisites.dev"],
      "digest": ["maintainer@wikisites.dev"]
    },
    "templates": {
      "critical": "critical-alert.html",
      "high": "high-alert.html",
      "digest": "weekly-digest.html"
    }
  }
}
```

### 6.3 GitHub Issue Configuration

```json
{
  "github_issues": {
    "labels": {
      "critical": ["P0", "security", "critical"],
      "high": ["P1", "security", "high-severity"],
      "medium": ["P2", "security"],
      "low": ["P3", "security"],
      "deprecated": ["deprecated-dependency"],
      "license": ["license-change"],
      "lockfile": ["lockfile-integrity"]
    },
    "assignees": {
      "default": ["maintainer"]
    },
    "milestone": "Supply Chain Security"
  }
}
```

---

## 7. Alert Testing and Validation

### 7.1 Alert Test Schedule

| Test | Frequency | Method |
|------|-----------|--------|
| P0 alert delivery | Monthly | Simulate critical CVE, verify Slack + email |
| Auto-PR creation | Weekly | Update test dependency, verify PR creation |
| Lockfile integrity | Monthly | Corrupt lockfile, verify CI block |
| License detection | Monthly | Add copyleft dependency, verify CI block |
| Escalation path | Quarterly | Walk through full escalation matrix |

### 7.2 Alert Validation Checklist

| Check | Pass/Fail | Notes |
|-------|-----------|-------|
| Slack webhook delivers message | | |
| Email sends within 5 minutes | | |
| GitHub issue created with correct labels | | |
| Auto-PR created with correct fix | | |
| CI blocks on critical CVE | | |
| CI blocks on license violation | | |
| Lockfile integrity check works | | |
| Escalation triggers at correct time | | |

---

## 8. Alert History and Metrics

### 8.1 Alert Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Mean time to acknowledge (P0) | < 15 min | Track |
| Mean time to remediate (P0) | < 2 hours | Track |
| Mean time to acknowledge (P1) | < 1 hour | Track |
| Mean time to remediate (P1) | < 24 hours | Track |
| Alert false positive rate | < 5% | Track |
| Auto-PR success rate | > 95% | Track |
| Alert fatigue score | < 3/week | Track |

### 8.2 Alert History Retention

| Alert Type | Retention | Storage |
|------------|-----------|---------|
| P0 incidents | 5 years | GitHub Issues + archive |
| P1 incidents | 3 years | GitHub Issues + archive |
| P2 incidents | 1 year | GitHub Issues |
| P3/P4 incidents | 90 days | Logs only |
| Digest reports | 2 years | Email archive |

---

## 9. Exception Process

### 9.1 When Exceptions Are Allowed

| Scenario | Exception Granted | Review |
|----------|-------------------|--------|
| No patch available for CVE | Risk acceptance with documented justification | Monthly review |
| Dependency is critical with no alternative | Temporary exception with monitoring | Quarterly review |
| License change is compatible | Document and continue | Annual review |
| CVE in non-production code | Lower priority, document | Monthly review |

### 9.2 Exception Documentation

```markdown
## Exception Request

- **Request ID:** EXC-YYYY-XXX
- **Date:** ISO-8601
- **Requester:** Name
- **Dependency:** package@version
- **Issue:** CVE-YYYY-XXXXX (CVSS X.X)
- **Justification:** [Why exception is needed]
- **Risk Assessment:** [Impact if exploited]
- **Mitigation:** [Steps taken to reduce risk]
- **Expiration:** [Date when exception expires]
- **Review Date:** [Next review date]
```

---

*Document generated: 2026-06-07T00:00:00Z*
*Review frequency: Quarterly*
*Next review: 2026-09-07*
*Classification: Internal*
