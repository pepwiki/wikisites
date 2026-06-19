# Alerting Rules

## Purpose

Define notification channels, severity levels, escalation paths, and suppression rules for all regression detections. Every alert reaches the right person through the right channel within the required response time.

---

## 1. Alert Categories

### Performance Budget Violations

| Condition | Severity | Channel | Response |
|-----------|----------|---------|----------|
| CWV metric 10% over baseline | Warning | Slack `#wikisites-ci` | 24h acknowledgment, 1-week fix |
| CWV metric 20% over baseline | Critical | Slack `#wikisites-alerts` + Email | 4h acknowledgment, 24h fix/rollback |
| Lighthouse score drops 5 points | Warning | Slack `#wikisites-ci` | 24h acknowledgment, 1-week fix |
| Lighthouse score drops 10 points | Critical | Slack `#wikisites-alerts` + Email | 4h acknowledgment, 24h fix/rollback |
| TTFB exceeds 200ms P95 | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| TTFB exceeds 300ms P95 | Critical | Slack `#wikisites-alerts` | 4h acknowledgment |
| CLS exceeds 0.1 P95 | Warning | Slack `#wikisites-ci` | 24h acknowledgment |

### Bundle Size Increases

| Condition | Severity | Channel | Response |
|-----------|----------|---------|----------|
| JS bundle >15% over baseline | Warning | Slack `#wikisites-ci` | 24h acknowledgment, 1-week fix |
| JS bundle >30% over baseline | Critical | Slack `#wikisites-alerts` + Email | 4h acknowledgment, 24h fix |
| Single chunk exceeds 100 KB | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| Single chunk exceeds 150 KB | Critical | Slack `#wikisites-alerts` | 4h acknowledgment, block merge |
| CSS bundle >15% over baseline | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| New dependency adds >25 KB | Warning | Slack `#wikisites-ci` | Requires manual review |

### Test Coverage Drops

| Condition | Severity | Channel | Response |
|-----------|----------|---------|----------|
| Critical module coverage drops >5% | Warning | Slack `#wikisites-ci` | 24h acknowledgment, 1-week fix |
| Critical module coverage drops >10% | Critical | Slack `#wikisites-alerts` + Email | 4h acknowledgment, block merge |
| Overall coverage drops >5% | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| Overall coverage drops >10% | Critical | Slack `#wikisites-alerts` + Email | 4h acknowledgment, block merge |
| Test pass rate drops below 99% | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| Test pass rate drops below 97% | Critical | Slack `#wikisites-alerts` | Immediate investigation |

### Security Scan Failures

| Condition | Severity | Channel | Response |
|-----------|----------|---------|----------|
| Low-severity CVE detected | Warning | Slack `#wikisites-security` | 24h acknowledgment, 1-week fix |
| Medium-severity CVE (CVSS 4.0-6.9) | Critical | Slack `#wikisites-security` + Email | 4h acknowledgment, 24h fix |
| High-severity CVE (CVSS 7.0-8.9) | Critical | Slack `#wikisites-security` + Email | 1h acknowledgment, 24h fix/rollback |
| Critical CVE (CVSS 9.0+) | Emergency | Slack `#wikisites-security` + Email + PagerDuty | Immediate response, 1h fix/rollback |
| CSP violation detected | Warning | Slack `#wikisites-security` | 24h acknowledgment |
| Repeated CSP violations | Critical | Slack `#wikisites-security` + Email | 4h acknowledgment |

### Build Health

| Condition | Severity | Channel | Response |
|-----------|----------|---------|----------|
| Build time >20% over baseline | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| Build time >40% over baseline | Critical | Slack `#wikisites-alerts` | 4h acknowledgment |
| Build fails completely | Critical | Slack `#wikisites-alerts` + Email | Immediate investigation |
| Cold start >20% over baseline | Warning | Slack `#wikisites-ci` | 24h acknowledgment |
| CI pipeline timeout | Critical | Slack `#wikisites-alerts` | Immediate investigation |

---

## 2. Notification Channels

### Slack / Discord (Real-Time)

```
#wikisites-ci          ── All CI/CD notifications (lint, test, build, deploy)
#wikisites-alerts      ── Production monitoring and critical regressions
#wikisites-security    ── Security vulnerability notifications
```

**Message Format:**

```
[{severity}] {source}
Metric: {current_value} (baseline: {baseline_value})
Threshold: {threshold_type} ({threshold_value})
Commit: {commit_sha} by {author}
PR: {pr_url}
Action required: {response_time}
```

### Email (Formal)

- **To**: Project maintainer (`wyatt@wikisites.dev`)
- **Triggers**: Critical/Emergency severity, security CVEs of any severity
- **Weekly digest**: Every Monday 09:00 UTC
- **Monthly security report**: First Monday of each month

### Dashboard (Visual)

- Cloudflare Web Analytics for RUM data (LCP, CLS, INP, TTFB)
- CI artifact logs for build times and bundle sizes
- Coverage reports for test trends
- Lighthouse CI results for scoring trends
- 5-minute refresh for real-time panels, per-build for CI metrics

---

## 3. Severity Levels

### Warning (Yellow)

- **Acknowledgment**: Within 24 hours
- **Root cause**: Within 48 hours
- **Fix**: Within 1 week
- **Notifications**: Slack message only, no `@channel`
- **Dashboard**: Yellow indicator on affected panel

### Critical (Orange)

- **Acknowledgment**: Within 4 hours
- **Investigation**: Starts immediately
- **Fix/rollback**: Within 24 hours
- **Notifications**: Slack `@here` + Email to maintainer
- **Dashboard**: Orange indicator, blinking alert

### Emergency (Red)

- **Response**: Immediate (drop all other work)
- **Fix/rollback**: Within 1 hour
- **Post-mortem**: Within 48 hours
- **Notifications**: Slack `@here` EMERGENCY prefix + Email URGENT prefix
- **Dashboard**: Red indicator, full-screen alert mode

---

## 4. Notification Routing

### By Time of Day

| Window | Routing |
|--------|---------|
| Business hours (09:00-17:00 UTC) | All channels active |
| Off-hours (17:00-09:00 UTC) | Critical + Emergency only; Warning queued |
| Weekends | Emergency only; all others queued for Monday |

### By Author

| Condition | Action |
|-----------|--------|
| PR author available | Notify author via Slack DM |
| PR author unavailable | Notify project maintainer |
| No author identified | Notify channel; maintainer responds |

---

## 5. Suppression Rules

### Known Issues

- Regression documented in open issue → suppress Warning-level alerts only
- Critical and Emergency are **never** suppressed
- Suppression requires explicit maintainer approval

### Maintenance Windows

- Announce 24 hours in advance in `#wikisites-ci`
- Suppress all alerts except Emergency during window
- Post-maintenance: run full regression check against baseline

### Flaky Tests

- Flaky tests excluded from coverage regression checks
- Flaky test list maintained in `vitest.config.ts`, reviewed monthly
- Flaky test failure posts Warning but does not block merge

---

## 6. Escalation Matrix

| Level | Initial Responder | Escalation Target | Timeout |
|-------|-------------------|-------------------|---------|
| Warning | PR author | Project maintainer | 48 hours |
| Critical | PR author / on-call | Project maintainer | 4 hours |
| Emergency | First responder | Maintainer + team lead | 30 minutes |

### Escalation Actions

1. On timeout → send escalation notification to next level
2. No response within escalation timeout → auto-revert offending commit
3. After revert → notify team, schedule post-mortem

---

## 7. Acknowledgment and Resolution

### Acknowledgment

- Critical and Emergency alerts require explicit Slack acknowledgment
- Format: `"Acknowledged by {name} at {time}. Investigating."`
- Failure to acknowledge within response time triggers escalation

### Resolution

- Documented in alert thread or linked issue
- Format: `"Resolved by {name}. Root cause: {cause}. Fix: {description}."`
- Emergency alerts trigger automatic post-mortem creation

### False Positives

- Document the cause in monitoring system
- Adjust thresholds or detection rules to prevent recurrence
- Tag for trend analysis in monthly review

---

## 8. CI/CD Integration

```yaml
# GitHub/Forgejo Actions alert integration
alert-on-failure:
  if: failure()
  steps:
    - name: Send Slack notification
      uses: slackapi/slack-github-action@v1
      with:
        payload: |
          {
            "channel": "#wikisites-ci",
            "text": "[CRITICAL] Pipeline failed for ${{ github.sha }}",
            "blocks": [...]
          }
    - name: Send email
      uses: dawidd6/action-send-mail@v3
      with:
        server_address: ${{ secrets.SMTP_SERVER }}
        username: ${{ secrets.SMTP_USER }}
        password: ${{ secrets.SMTP_PASSWORD }}
        subject: "[CRITICAL] Wikisites CI Failure"
        to: wyatt@wikisites.dev
        from: alerts@wikisites.dev
        body: "Pipeline failed. See: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

---

## 9. Maintenance

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Alert threshold review | Monthly | Maintainer |
| Contact information update | Quarterly | Maintainer |
| Escalation path test (simulated) | Quarterly | Team |
| False positive review | Monthly | Team |
| Suppression list cleanup | Monthly | Maintainer |
| Full alerting audit | Quarterly | Team |
