# Alerting Rules

## Purpose

Define notification channels, escalation rules, and delivery schedules for all regression detections, CI failures, security events, and operational anomalies. Every alert must reach the right person through the right channel within the required response time.

---

## 1. Alert Channels

### Slack / Discord (Real-Time Team Notifications)

**Webhook Configuration**
- Channel: `#wikisites-ci` for all CI/CD notifications.
- Channel: `#wikisites-alerts` for production monitoring alerts.
- Channel: `#wikisites-security` for security-specific notifications.

**Message Format**
```
[{severity}] {source}
{metric}: {current_value} (baseline: {baseline_value})
Threshold: {threshold_type} ({threshold_value})
Commit: {commit_sha} by {author}
PR: {pr_url} (if applicable)
Action required: {response_time}
```

**Notification Rules**
- All CI pipeline failures (lint, test, security, build) post to `#wikisites-ci`.
- Performance threshold breaches post to `#wikisites-alerts`.
- Security vulnerabilities post to `#wikisites-security`.
- Warnings include `@channel` mention; critical alerts include `@here` mention.
- Emergency alerts include `@here` with explicit call to action.

### Email (Formal Notifications)

**Recipients**
- Primary: Project maintainer (`wyatt@wikisites.dev`).
- Secondary: Security team distribution list.

**Email Rules**
- Security vulnerabilities of any severity: immediate email to maintainer.
- Critical performance regressions: email within 1 hour of detection.
- Weekly digest: every Monday at 09:00 UTC, sent to maintainer.
- Monthly security report: first Monday of each month.

**Email Template**
```
Subject: [{severity}] Wikisites Alert - {alert_type}

Alert Details:
- Type: {alert_type}
- Severity: {severity}
- Detected: {timestamp}
- Metric: {metric_name}
- Current: {current_value}
- Baseline: {baseline_value}
- Threshold: {threshold_value}
- Commit: {commit_sha}
- Author: {author}

Impact Assessment:
{impact_description}

Required Action:
{action_items}

Dashboard: {dashboard_url}
```

### Dashboard (Visual Monitoring)

**Dashboard Stack**
- Cloudflare Web Analytics for RUM data.
- Custom dashboard aggregating CI build times, test coverage, bundle sizes.
- Grafana or equivalent for time-series visualization of all metrics.

**Dashboard Panels**

| Panel | Data Source | Refresh Rate |
|-------|------------|--------------|
| Core Web Vitals (LCP, CLS, INP, TTFB) | Cloudflare Analytics API | 5 minutes |
| Build Time Trend | CI artifact logs | Per build |
| Bundle Size Trend | CI build output | Per build |
| Test Coverage Trend | Coverage reports | Per PR |
| Lighthouse Scores | Lighthouse CI results | Weekly |
| Security Vulnerabilities | npm audit / Snyk | Per PR |

**Drill-Down Views**
- Click any alert to see the specific commit, diff, and author.
- Click any metric to see 7-day, 30-day, and 90-day trends.
- Click any regression to see the suggested fix from detection strategy.

### Weekly Digest Reports

**Delivery**: Every Monday at 09:00 UTC via email and posted to `#wikisites-ci`.

**Report Contents**
```
Wikisites Weekly Digest - {week_ending_date}

## Performance Summary
- LCP P75: {value} ms ({trend} vs last week)
- CLS P75: {value} ({trend})
- INP P75: {value} ms ({trend})
- TTFB P75: {value} ms ({trend})
- Total Page Weight: {value} KB ({trend})

## Build Health
- Average build time: {value} s
- Build success rate: {value}%
- Failed builds: {count} (list with links)

## Test Coverage
- Critical coverage: {value}% ({delta})
- Overall coverage: {value}% ({delta})
- Tests added: {count}
- Tests removed: {count}

## Security
- New vulnerabilities: {count}
- Resolved vulnerabilities: {count}
- Open vulnerabilities: {count}

## Bundle Size
- JS bundle (encp): {value} KB ({delta})
- JS bundle (wiki): {value} KB ({delta})
- CSS bundle: {value} KB ({delta})

## Lighthouse Scores
- Performance: {score}
- Accessibility: {score}
- Best Practices: {score}
- SEO: {score}

## Notable Changes
{list_of_significant_commits_and_prs}

## Action Items
{open_issues_and_regressions_requiring_attention}
```

---

## 2. Alert Severity Definitions

### Warning (Yellow)

**Trigger Conditions**
- Any metric exceeds the alert threshold (10% performance degradation, 20% build time increase, 15% bundle size increase, 5% coverage decrease, 5-point Lighthouse decrease).
- Build takes more than 288 seconds.
- Test pass rate drops below 99%.

**Response Requirements**
- Acknowledgment within 24 hours.
- Root cause identified within 48 hours.
- Fix or documented mitigation within 1 week.

**Notifications**
- Slack/Discord: message only, no `@channel`.
- Dashboard: yellow indicator on affected panel.

### Critical (Orange)

**Trigger Conditions**
- Any metric exceeds the critical threshold (25% performance degradation, 40% build time increase, 30% bundle size increase, 10% coverage decrease, 10-point Lighthouse decrease).
- Build fails completely.
- Test pass rate drops below 97%.
- Security vulnerability with CVSS score >= 7.0.

**Response Requirements**
- Acknowledgment within 4 hours.
- Active investigation started immediately.
- Fix or rollback within 24 hours.

**Notifications**
- Slack/Discord: `@here` mention, message in `#wikisites-alerts`.
- Email: immediate notification to maintainer.
- Dashboard: orange indicator with blinking alert.

### Emergency (Red)

**Trigger Conditions**
- Production site is down or returning errors.
- Security vulnerability with CVSS score >= 9.0.
- Data loss or corruption detected.
- Complete CI pipeline failure blocking all deployments.

**Response Requirements**
- Immediate response (drop all other work).
- Fix or rollback within 1 hour.
- Post-mortem within 48 hours.

**Notifications**
- Slack/Discord: `@here` with explicit "EMERGENCY" prefix in `#wikisites-alerts`.
- Email: immediate with "URGENT" subject prefix.
- Dashboard: red indicator, full-screen alert mode.

---

## 3. Notification Routing Rules

### By Alert Source

| Source | Channel | Severity Mapping |
|--------|---------|-----------------|
| Lighthouse CI | Slack `#wikisites-ci` | Warning: yellow, Critical: orange, Emergency: red |
| Vitest | Slack `#wikisites-ci` | Warning: yellow, Critical: orange, Emergency: red |
| npm audit / Snyk | Slack `#wikisites-security` + Email | Always at least Warning; CVSS >= 7 is Critical |
| Build pipeline | Slack `#wikisites-ci` | Failure: Critical, Timeout: Warning |
| Cloudflare Analytics | Slack `#wikisites-alerts` | Threshold breach as defined in detection strategy |
| CSP violations | Slack `#wikisites-security` | Warning: yellow, repeated: Critical |

### By Time of Day

| Time Window | Routing |
|-------------|---------|
| Business hours (09:00-17:00 UTC) | All channels active |
| Off-hours (17:00-09:00 UTC) | Critical and Emergency only; Warning queued for morning |
| Weekends | Emergency only; all others queued for Monday |

### By Author

| Condition | Action |
|-----------|--------|
| PR author is available | Notify author directly via Slack DM. |
| PR author is unavailable | Notify project maintainer. |
| No author identified (automated) | Notify channel, maintainer responds. |

---

## 4. Alert Suppression Rules

### Known Issues

- If a regression is documented in an open issue, suppress Warning-level alerts for that metric.
- Critical and Emergency alerts are never suppressed, even for known issues.
- Suppression must be explicitly requested and approved by a maintainer.

### Maintenance Windows

- During scheduled maintenance, suppress all alerts except Emergency.
- Maintenance windows must be announced 24 hours in advance in `#wikisites-ci`.
- Post-maintenance, run full regression check and compare against baseline.

### Flaky Tests

- Tests identified as flaky are excluded from coverage regression checks.
- Flaky test list is maintained in `vitest.config.ts` and reviewed monthly.
- If a flaky test fails, it posts a Warning to `#wikisites-ci` but does not block merge.

---

## 5. Escalation Matrix

| Level | Initial Responder | Escalation Target | Escalation Timeout |
|-------|-------------------|-------------------|-------------------|
| Warning | PR author | Project maintainer | 48 hours |
| Critical | PR author or on-call | Project maintainer | 4 hours |
| Emergency | First responder | Project maintainer + team lead | 30 minutes |

**Escalation Actions**
1. On timeout, send escalation notification to the next level.
2. If no response within escalation timeout, auto-revert the offending commit.
3. After revert, notify team and schedule post-mortem.

---

## 6. Alert Acknowledgment and Resolution

### Acknowledgment

- All Critical and Emergency alerts require explicit acknowledgment in Slack/Discord.
- Acknowledgment format: "Acknowledged by {name} at {time}. Investigating."
- Failure to acknowledge within response time triggers escalation.

### Resolution

- Resolution must be documented in the alert thread or linked issue.
- Resolution format: "Resolved by {name}. Root cause: {cause}. Fix: {description}."
- For Emergency alerts, resolution triggers automatic post-mortem creation.

### False Positive Handling

- If an alert is determined to be a false positive, document the cause.
- Adjust thresholds or detection rules to prevent recurrence.
- Tag the false positive in monitoring system for trend analysis.

---

## 7. Alerting System Maintenance

### Monthly Review

- Review all alerts from the past month.
- Identify patterns: recurring warnings, frequent false positives, missed detections.
- Adjust thresholds, channels, or rules based on findings.
- Update this document with any changes.

### Quarterly Audit

- Full audit of all alerting rules against current codebase and infrastructure.
- Verify all webhooks and email addresses are current.
- Test emergency escalation path with a simulated alert.
- Update contact information and channel names as needed.

---

## 8. Integration Points

### CI/CD Pipeline

```yaml
# Example GitHub Actions / Forgejo Actions integration
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

### Cloudflare Workers (Cron-Based Monitoring)

```javascript
// Scheduled handler for weekly digest
export default {
  async scheduled(event, env, ctx) {
    const metrics = await gatherWeeklyMetrics(env);
    const report = generateDigestReport(metrics);
    await sendEmail(env.ALERT_EMAIL, report);
    await postToSlack(env.SLACK_WEBHOOK, '#wikisites-ci', report);
  }
};
```
