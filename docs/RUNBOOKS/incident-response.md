# Incident Response Runbook

**Version:** 1.0
**Last Updated:** 2026-06-19

## Severity Levels

| Level | Name | Description | Response Time | Example |
|-------|------|-------------|---------------|---------|
| P0 | Critical | Site down or data loss | Immediate (< 15 min) | Total outage, DB corruption, security breach |
| P1 | High | Major feature broken | < 1 hour | Authentication failure, quiz system down, payment broken |
| P2 | Medium | Degraded experience | < 4 hours | Slow loads, broken search, intermittent errors |
| P3 | Low | Minor issue | < 24 hours | Cosmetic bug, typo, non-critical feature issue |

## Response Team Contacts

| Role | Responsibility | Escalation Path |
|------|---------------|-----------------|
| On-call Engineer | First responder, triage, immediate fixes | — |
| Project Lead | Decision authority, external comms | Escalated by on-call |
| Database Owner | D1/KV issues, data recovery | Escalated by on-call |
| Infrastructure | Cloudflare, DNS, SSL, CDN | Escalated by project lead |

## Initial Response Checklist

1. **Acknowledge** — React to the alert/incident report within SLA
2. **Assess** — Determine severity level using the table above
3. **Communicate** — Post in #incidents channel with status
4. **Mitigate** — Apply immediate fix or rollback
5. **Monitor** — Watch metrics for 15 minutes post-fix
6. **Resolve** — Close the incident when stable

## Communication Templates

### Incident Opened

```
🔴 INCIDENT [P{X}] — {title}
Status: Investigating
Impact: {description of user impact}
Started: {timestamp}
On-call: {name}
Updates: Every {interval} minutes
```

### Status Update

```
🟡 UPDATE [P{X}] — {title}
Status: {Investigating / Identified / Monitoring}
What we know: {findings}
What we're doing: {current action}
Next update: {timestamp}
```

### Incident Resolved

```
🟢 RESOLVED [P{X}] — {title}
Duration: {total time}
Root cause: {brief description}
Resolution: {what was done}
Follow-up: Post-incident review scheduled for {date}
```

## Escalation Procedures

### P0 — Critical

1. **T+0 min:** On-call engineer acknowledges
2. **T+5 min:** If no response, escalate to project lead
3. **T+15 min:** If unresolved, project lead engages infrastructure
4. **T+30 min:** If still unresolved, consider full rollback
5. **T+60 min:** External communication if user-facing impact continues

### P1 — High

1. **T+0 min:** On-call engineer acknowledges
2. **T+15 min:** If no response, escalate to project lead
3. **T+1 hour:** If unresolved, project lead joins troubleshooting
4. **T+4 hours:** Escalate to infrastructure if needed

### P2/P3 — Medium/Low

Follow standard assignment and resolution workflow.

## Common Incident Playbooks

### Site Down (P0)

1. Check Cloudflare status: https://www.cloudflarestatus.com/
2. Check worker logs: `bunx wrangler tail`
3. Verify D1 database health
4. If worker issue, rollback to last working deployment
5. If DNS/SSL issue, check Cloudflare dashboard

### Authentication Broken (P1)

1. Check D1 for user table integrity
2. Verify JWT signing keys are valid
3. Check session token table for corruption
4. If key issue, rotate keys and force re-auth

### Performance Degradation (P2)

1. Check RUM metrics in localStorage for anomalies
2. Review Lighthouse CI results
3. Check Cloudflare analytics for traffic spikes
4. Review KV cache hit rates

### Data Loss Concern (P0)

1. Stop all writes immediately (feature flag or rollback)
2. Assess scope of data loss
3. Restore from latest D1 backup
4. Verify data integrity post-restore
5. Communicate with affected users

## Post-Incident Review Template

### Incident Summary

- **Date:** {date}
- **Severity:** P{X}
- **Duration:** {time}
- **Impact:** {user impact description}

### Timeline

| Time | Event |
|------|-------|
| {T+0} | {What happened} |
| {T+X} | {Detection} |
| {T+X} | {Response} |
| {T+X} | {Resolution} |

### Root Cause

{Detailed root cause analysis}

### Contributing Factors

- {Factor 1}
- {Factor 2}

### What Went Well

- {Positive aspect 1}
- {Positive aspect 2}

### What Needs Improvement

- {Improvement 1}
- {Improvement 2}

### Action Items

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| {Action 1} | {Person} | {Date} | Open |
| {Action 2} | {Person} | {Date} | Open |

### Lessons Learned

{Key takeaways for the team}
