---
document_id: SEC-IR-001
title: "Incident Response Plan"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Security Team"
    role: "Primary Authors"
classification: "Internal — Phase 3 Security Engineering"
applicable_sites:
  - SHARED
  - ENCP
  - WIKI
abstract: >-
  Incident response plan for both encyclopeptide.com and wikipept.com.
  Covers detection procedures, containment strategies, eradication steps,
  recovery procedures, post-incident activities, and communication templates
  for security incidents of varying severity.
applicable_standards:
  - "NIST SP 800-53 Rev. 5 (IR-4, IR-5, IR-6)"
  - "ISO/IEC 27001:2022 (A.5.24-5.28)"
  - "GDPR Article 33-34 (Breach Notification)"
---

# Incident Response Plan

**Document ID:** SEC-IR-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**Applicable Sites:** encyclopeptide.com, wikipept.com

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Incident Response Team](#2-incident-response-team)
3. [Incident Classification](#3-incident-classification)
4. [Detection Procedures](#4-detection-procedures)
5. [Containment Strategies](#5-containment-strategies)
6. [Eradication Steps](#6-eradication-steps)
7. [Recovery Procedures](#7-recovery-procedures)
8. [Post-Incident Activities](#8-post-incident-activities)
9. [Communication Templates](#9-communication-templates)
10. [Playbooks](#10-playbooks)

---

## 1. Executive Summary

### 1.1 Purpose

This document establishes the incident response plan (IRP) for the wikisites project. It defines the procedures for detecting, containing, eradicating, and recovering from security incidents affecting encyclopeptide.com or wikipept.com. The plan ensures consistent, effective response to security events while minimizing damage, recovery time, and data loss.

### 1.2 Scope

| In Scope | Out of Scope |
|----------|--------------|
| Security incidents affecting either site | Physical security incidents |
| Data breaches involving user PII | Natural disasters |
| Service degradation due to attacks | Business continuity (separate plan) |
| Supply chain compromises | Legal proceedings (separate process) |
| Insider threats | HR disciplinary actions |
| Cloudflare infrastructure incidents | Third-party vendor incidents (unless affecting wikisites) |

### 1.3 Incident Severity Levels

| Level | Name | Description | Response Time | Examples |
|-------|------|-------------|---------------|----------|
| SEV-1 | Critical | Active data breach, complete service outage, active exploitation | 15 minutes | SQL injection exploit, admin account compromise, ransomware |
| SEV-2 | High | Confirmed vulnerability being exploited, partial service impact | 1 hour | XSS in production, privilege escalation, DDoS ongoing |
| SEV-3 | Medium | Vulnerability discovered but not exploited, suspicious activity | 4 hours | Failed exploitation attempt, suspicious login patterns, vulnerability scan detected |
| SEV-4 | Low | Security misconfiguration, minor policy violation | 24 hours | Missing security header, deprecated dependency, minor information disclosure |

---

## 2. Incident Response Team

### 2.1 Team Structure

```
Incident Commander (IC)
├── Technical Lead
│   ├── Developer 1 (Frontend)
│   ├── Developer 2 (Backend)
│   └── DevOps/Infrastructure
├── Communications Lead
│   ├── Internal Communications
│   └── External Communications
└── Legal/Compliance Lead
    ├── Privacy Officer
    └── External Counsel (if needed)
```

### 2.2 Roles and Responsibilities

| Role | Responsibilities | Primary | Backup |
|------|-----------------|---------|--------|
| Incident Commander | Overall incident management; decision authority; resource allocation | Security Lead | Senior Developer |
| Technical Lead | Technical investigation; containment execution; eradication; recovery | Senior Developer | DevOps |
| Communications Lead | Internal status updates; external notifications; user communications | Security Lead | Project Manager |
| Legal/Compliance Lead | Regulatory notification; legal advice; compliance assessment | Legal Counsel | Security Lead |
| Developer 1 | Frontend investigation; client-side containment; code fixes | Frontend Lead | Developer 2 |
| Developer 2 | Backend investigation; server-side containment; database recovery | Backend Lead | Developer 1 |
| DevOps/Infrastructure | Cloudflare configuration; infrastructure containment; monitoring | DevOps Lead | Security Lead |

### 2.3 Contact Information

| Role | Name | Email | Phone | Available |
|------|------|-------|-------|-----------|
| Incident Commander | [TBD] | [TBD] | [TBD] | 24/7 for SEV-1/2 |
| Technical Lead | [TBD] | [TBD] | [TBD] | 24/7 for SEV-1/2 |
| Communications Lead | [TBD] | [TBD] | [TBD] | Business hours + on-call |
| Legal/Compliance | [TBD] | [TBD] | [TBD] | On-call for SEV-1/2 |
| Cloudflare Support | Cloudflare Enterprise | support@cloudflare.com | [TBD] | 24/7 |

### 2.4 Escalation Matrix

| Severity | Escalation Path | Notification |
|----------|----------------|--------------|
| SEV-1 | IC → Technical Lead → DevOps → Communications → Legal | All team members, management, legal |
| SEV-2 | Technical Lead → IC → Communications | IC, Communications, affected team |
| SEV-3 | Technical Lead → IC (if needed) | Technical team |
| SEV-4 | Developer → Technical Lead | Technical team |

---

## 3. Incident Classification

### 3.1 Incident Categories

| Category | Description | Examples | Severity Range |
|----------|-------------|----------|----------------|
| CAT-1: Data Breach | Unauthorized access to or disclosure of user data | PII exposure, database exfiltration | SEV-1/2 |
| CAT-2: Service Disruption | Denial of service or degradation affecting users | DDoS, resource exhaustion, configuration error | SEV-1/2/3 |
| CAT-3: Code Injection | Injection of malicious code into the platform | XSS, SQL injection, command injection | SEV-1/2 |
| CAT-4: Authentication Compromise | Unauthorized access via authentication bypass | Token forgery, session hijack, credential stuffing | SEV-1/2 |
| CAT-5: Privilege Escalation | Unauthorized elevation of access rights | RBAC bypass, admin compromise | SEV-1/2 |
| CAT-6: Supply Chain | Compromise of dependencies or build pipeline | Malicious dependency, build injection | SEV-1/2 |
| CAT-7: Configuration | Security misconfiguration enabling attack | Open endpoints, missing headers, weak defaults | SEV-3/4 |
| CAT-8: Policy Violation | Violation of security policies or procedures | Unauthorized access, policy circumvention | SEV-3/4 |

### 3.2 Impact Assessment Criteria

| Criterion | Low | Medium | High | Critical |
|-----------|-----|--------|------|----------|
| Data Exposure | No PII | Anonymized data | PII of <100 users | PII of >100 users |
| Service Availability | <10% users affected | 10-50% users affected | 50-90% users affected | >90% users affected |
| Data Integrity | No data modified | Non-critical data modified | Critical data modified | Data destroyed/unrecoverable |
| Financial Impact | <$100 | $100-$1,000 | $1,000-$10,000 | >$10,000 |
| Reputation Impact | No public awareness | Limited social media | News coverage potential | Major press coverage |
| Regulatory Impact | No notification required | Internal documentation | Supervisory authority notification | Public notification required |

---

## 4. Detection Procedures

### 4.1 Detection Sources

| Source | Type | Monitoring | Alert Threshold |
|--------|------|-----------|-----------------|
| Cloudflare WAF | Automated | Real-time | Any triggered rule |
| Cloudflare DDoS | Automated | Real-time | Any mitigation event |
| npm audit / Snyk | Automated | Every build | High/critical vulnerability |
| CSP Violation Reports | Automated | Real-time | >10 violations/hour |
| Error Tracking | Automated | Real-time | >5x baseline error rate |
| Uptime Monitoring | Automated | Every 60 seconds | Any downtime event |
| Log Anomaly Detection | Automated | Hourly | Unusual patterns |
| User Reports | Manual | As received | Any security report |
| Security Researcher | Manual | As received | Any vulnerability report |
| Penetration Test | Manual | Quarterly | Any critical finding |
| Code Review | Manual | Per PR | Security issue identified |

### 4.2 Detection Procedures by Source

#### 4.2.1 WAF Alert Response

```
1. Acknowledge alert within 5 minutes
2. Review WAF dashboard for alert details
3. Identify: source IP, targeted endpoint, attack type, payload
4. Determine if attack was blocked or successful
5. If blocked: log incident, monitor for escalation
6. If successful: escalate to SEV-1/2, activate IR team
7. Document attack details in incident log
```

#### 4.2.2 CSP Violation Response

```
1. Review CSP violation report endpoint (/csp-report)
2. Aggregate violations by source, directive, blocked URI
3. Determine if violations indicate active attack
4. If attack pattern: escalate to SEV-2, investigate source
5. If false positive: adjust CSP directive if needed
6. If new attack vector: update CSP, document finding
```

#### 4.2.3 Error Rate Spike Response

```
1. Monitor error tracking dashboard
2. Compare current rate to baseline (rolling 24h average)
3. If >5x baseline: investigate root cause
4. Check: Worker logs, D1 query errors, KV failures
5. If security-related: escalate to appropriate SEV level
6. If infrastructure: engage Cloudflare support
7. Document finding and resolution
```

#### 4.2.4 User Security Report Response

```
1. Acknowledge report within 1 hour
2. Classify report type (phishing, vulnerability, abuse)
3. If vulnerability report: initiate responsible disclosure
4. If abuse report: investigate user behavior
5. If phishing: notify user, check for compromised accounts
6. Document report and resolution
```

### 4.3 Detection Monitoring Configuration

```yaml
# monitoring.yml
alerts:
  waf:
    enabled: true
    severity_threshold: medium
    notify: [security-team]

  ddos:
    enabled: true
    notify: [incident-commander, devops]

  csp_violations:
    enabled: true
    threshold: 10  # per hour
    notify: [security-team]

  error_rate:
    enabled: true
    baseline: rolling_24h
    threshold_multiplier: 5
    notify: [technical-lead]

  uptime:
    enabled: true
    interval: 60s
    notify: [devops, incident-commander]

  dependency_vulnerabilities:
    enabled: true
    fail_on: high
    notify: [security-team]

  suspicious_login:
    enabled: true
    threshold: 5  # failed attempts per 15 minutes
    notify: [security-team]
```

---

## 5. Containment Strategies

### 5.1 Containment Decision Tree

```
Incident Detected
       │
       ▼
┌──────────────────┐
│ Is active attack │──Yes──> Immediate containment
│ in progress?     │         (see 5.2)
└──────────────────┘
       │ No
       ▼
┌──────────────────┐
│ Is data exposed? │──Yes──> Data containment
│                  │         (see 5.3)
└──────────────────┘
       │ No
       ▼
┌──────────────────┐
│ Is service       │──Yes──> Service containment
│ affected?        │         (see 5.4)
└──────────────────┘
       │ No
       ▼
  Investigation phase
  (monitor and analyze)
```

### 5.2 Active Attack Containment

| Attack Type | Immediate Action | Tool/Method | Reversible |
|-------------|-----------------|-------------|------------|
| SQL Injection | Block source IP; disable affected endpoint | Cloudflare WAF rule | Yes |
| XSS (Stored) | Remove malicious content; sanitize storage | DOMPurify + D1 update | Yes |
| DDoS | Enable Cloudflare Under Attack Mode | Cloudflare dashboard | Yes |
| Account Compromise | Revoke session; force password reset | KV session deletion | Yes |
| Privilege Escalation | Revoke elevated permissions; audit actions | D1 role update | Yes |
| Malicious File Upload | Quarantine file; scan R2 bucket | R2 prefix isolation | Yes |
| Supply Chain Attack | Block affected dependency; rollback to last safe build | npm + CI/CD | Yes |

### 5.3 Data Containment

| Data Type | Containment Action | Timeline |
|-----------|-------------------|----------|
| User PII (email, username) | Assess scope of exposure; prepare breach notification | Within 24 hours |
| Session tokens | Invalidate all active sessions; force re-authentication | Within 1 hour |
| JWT signing key | Rotate signing key; invalidate all tokens signed with old key | Within 1 hour |
| Database contents | Create backup snapshot; assess data integrity | Within 4 hours |
| User uploads (R2) | Quarantine affected files; scan for malicious content | Within 4 hours |

### 5.4 Service Containment

| Service | Containment Action | Impact |
|---------|-------------------|--------|
| wikipept.com | Enable maintenance mode if needed | Users see maintenance page |
| API endpoints | Disable affected endpoint; return 503 | Affected feature unavailable |
| Search | Disable search if index compromised | Search unavailable |
| Wiki editing | Disable edit endpoint if under attack | Editing unavailable |
| File uploads | Disable upload endpoint if under attack | Uploads unavailable |

### 5.5 Containment Decision Log

| Incident ID | Date/Time | Decision | Rationale | Authorized By | Reversible |
|-------------|-----------|----------|-----------|---------------|------------|
| [Auto-filled] | [Auto-filled] | [Action taken] | [Reason] | [IC name] | [Yes/No] |

---

## 6. Eradication Steps

### 6.1 Eradication Checklist

| Step | Action | Owner | Verification |
|------|--------|-------|-------------|
| 1 | Identify root cause of incident | Technical Lead | Root cause documented |
| 2 | Remove malicious code/content | Developer | Code/content clean |
| 3 | Patch vulnerable code | Developer | Patch tested and deployed |
| 4 | Rotate compromised credentials | DevOps | New credentials verified |
| 5 | Update WAF/CSP rules | DevOps | Rules active and tested |
| 6 | Scan for persistence mechanisms | Technical Lead | No persistence found |
| 7 | Verify data integrity | Developer | Data consistent |
| 8 | Verify system integrity | DevOps | System clean |

### 6.2 Eradication by Incident Type

#### 6.2.1 XSS Eradication

```
1. Identify all instances of malicious content
   - Search D1 for affected content (pages, annotations)
   - Search R2 for affected uploaded files
2. Remove or sanitize all malicious content
   - Use DOMPurify to sanitize stored HTML
   - Remove script tags and event handlers
3. Patch the injection point
   - Identify how XSS bypassed sanitization
   - Update DOMPurify configuration
   - Add missing input validation
4. Verify CSP enforcement
   - Test CSP blocks similar payloads
   - Update CSP directives if needed
5. Scan for similar vulnerabilities
   - Review all user-input rendering paths
   - Test all content types (pages, annotations, search)
```

#### 6.2.2 SQL Injection Eradication

```
1. Identify all affected queries
   - Review D1 query logs for suspicious patterns
   - Identify queries using string concatenation
2. Replace all string concatenation with parameterized queries
   - Use D1 prepared statements with .bind()
   - Never concatenate user input into SQL
3. Audit database for unauthorized changes
   - Compare current data with backup
   - Check for new tables, columns, or data
4. Verify data integrity
   - Run integrity checks on all tables
   - Verify user data not modified
5. Implement additional safeguards
   - Add SQL injection detection in WAF
   - Enable query logging for audit
```

#### 6.2.3 Authentication Compromise Eradication

```
1. Identify compromised accounts
   - Review login logs for suspicious activity
   - Check for unauthorized session tokens
2. Force session invalidation
   - Delete all sessions from KV
   - Force all users to re-authenticate
3. Rotate JWT signing key
   - Generate new signing key
   - Update Workers environment variable
   - All old tokens become invalid
4. Review OAuth configuration
   - Verify OAuth provider settings
   - Check for unauthorized OAuth apps
5. Notify affected users
   - Send security notification
   - Recommend password change (if applicable)
```

#### 6.2.4 DDoS Eradication

```
1. Identify attack vectors
   - Analyze WAF logs for attack patterns
   - Identify targeted endpoints
   - Determine attack type (volumetric, application, protocol)
2. Update WAF rules
   - Add rules to block attack patterns
   - Enable rate limiting on targeted endpoints
   - Enable Cloudflare Under Attack Mode if needed
3. Optimize application
   - Add caching for targeted endpoints
   - Reduce response size for targeted routes
   - Implement request throttling
4. Monitor for attack resumption
   - Increase monitoring frequency
   - Set up real-time alerting
   - Prepare additional containment if needed
```

#### 6.2.5 Supply Chain Compromise Eradication

```
1. Identify compromised dependency
   - Review build logs for suspicious activity
   - Compare package.json with known-good version
   - Scan dependency tree for affected packages
2. Remove compromised dependency
   - Remove from package.json
   - Regenerate lockfile
   - Audit all transitive dependencies
3. Verify build integrity
   - Rebuild from clean state
   - Verify build output matches expected
   - Scan build output for malicious code
4. Update dependency monitoring
   - Add additional scan rules
   - Update dependency allowlist
   - Enable Socket.dev monitoring
5. Review build pipeline
   - Audit CI/CD configuration
   - Verify no persistent backdoor
   - Rotate build credentials
```

---

## 7. Recovery Procedures

### 7.1 Recovery Priorities

| Priority | System | Recovery Time Objective (RTO) | Recovery Point Objective (RPO) |
|----------|--------|------------------------------|-------------------------------|
| P1 | Authentication system | 1 hour | 0 (no data loss) |
| P2 | Wiki content and editing | 4 hours | 1 hour (last backup) |
| P3 | Quiz and flashcard system | 8 hours | 4 hours |
| P4 | Search functionality | 12 hours | 24 hours (index rebuild) |
| P5 | Analytics and reporting | 24 hours | 24 hours |

### 7.2 Recovery Steps

#### 7.2.1 Service Recovery

```
1. Verify eradication complete
   - All malicious content removed
   - All vulnerabilities patched
   - All credentials rotated
2. Restore from backup (if needed)
   - Restore D1 database from backup
   - Restore R2 objects from versioning
   - Verify data integrity
3. Deploy patched code
   - Run full CI/CD pipeline
   - Deploy to preview environment first
   - Verify preview environment clean
   - Deploy to production
4. Verify service health
   - Run health checks on all endpoints
   - Verify authentication flow
   - Verify API responses
   - Verify search functionality
5. Enable monitoring
   - Increase monitoring frequency
   - Set up real-time alerting
   - Monitor for attack resumption
6. Lift containment measures
   - Remove maintenance mode
   - Re-enable disabled endpoints
   - Remove temporary WAF rules (if no longer needed)
```

#### 7.2.2 Data Recovery

```
1. Assess data loss
   - Compare current data with backup
   - Identify missing or corrupted records
   - Quantify data loss scope
2. Restore data from backup
   - Restore D1 from latest clean backup
   - Restore R2 objects from versioning
   - Verify data integrity post-restore
3. Reconstruct lost data (if possible)
   - Use edit history to reconstruct wiki content
   - Use quiz session logs to reconstruct scores
   - Use audit logs to reconstruct actions
4. Verify data integrity
   - Run consistency checks
   - Verify user data not corrupted
   - Verify no unauthorized modifications
```

#### 7.2.3 User Recovery

```
1. Notify users of incident
   - Send security notification email
   - Post status page update
   - Update social media if needed
2. Force re-authentication (if needed)
   - Invalidate all sessions
   - Require password reset (if credentials compromised)
   - Require MFA re-enrollment (if applicable)
3. Verify user data integrity
   - Allow users to review their data
   - Provide data export for verification
   - Accept user reports of data issues
4. Monitor for follow-up attacks
   - Watch for credential stuffing
   - Monitor for phishing attempts
   - Watch for social engineering
```

### 7.3 Recovery Verification Checklist

| Check | Method | Expected Result | Status |
|-------|--------|-----------------|--------|
| Authentication working | Login test | Successful login | |
| Wiki editing working | Edit page test | Edit saved successfully | |
| Quiz system working | Complete quiz | Score calculated correctly | |
| Flashcard system working | Review cards | FSRS scheduling correct | |
| Search working | Search query | Results returned correctly | |
| File uploads working | Upload test file | File stored in R2 | |
| API endpoints responding | API health check | All endpoints return 200 | |
| CSP header present | Header check | CSP header correct | |
| Rate limiting active | Rate test | 429 on exceeding limit | |
| Audit logging active | Trigger audit event | Log entry created | |
| No malicious content | Content scan | All content clean | |
| Data integrity verified | Consistency check | All data consistent | |

---

## 8. Post-Incident Activities

### 8.1 Post-Incident Review (PIR)

**Timeline:** Within 5 business days of incident resolution

**Attendees:** Incident Commander, Technical Lead, Communications Lead, all involved team members

**Agenda:**
1. Incident timeline reconstruction
2. Root cause analysis
3. Detection effectiveness assessment
4. Response effectiveness assessment
5. Communication effectiveness assessment
6. Lessons learned
7. Action items and improvements

### 8.2 Root Cause Analysis

| Analysis Method | When to Use | Output |
|----------------|-------------|--------|
| 5 Whys | Simple incidents with clear causation | Root cause chain |
| Fishbone Diagram | Complex incidents with multiple factors | Contributing factors |
| Fault Tree Analysis | System-level failures | Failure modes |
| Timeline Analysis | All incidents | Chronological event list |

### 8.3 Post-Incident Report Template

```markdown
# Post-Incident Report

## Incident Summary
- **Incident ID:** [ID]
- **Date/Time Detected:** [Timestamp]
- **Date/Time Resolved:** [Timestamp]
- **Duration:** [Hours/Minutes]
- **Severity:** [SEV-1/2/3/4]
- **Impact:** [Description of impact]
- **Affected Systems:** [List]

## Timeline
| Time | Event | Actor |
|------|-------|-------|
| [T] | [Event] | [Who/What] |

## Root Cause
[Description of root cause]

## Detection
- **How Detected:** [Source]
- **Detection Time:** [Time from start]
- **Detection Effectiveness:** [Rating]

## Response
- **Response Time:** [Time from detection]
- **Containment Time:** [Time from detection to containment]
- **Eradication Time:** [Time from containment to eradication]
- **Recovery Time:** [Time from eradication to recovery]
- **Response Effectiveness:** [Rating]

## Impact Assessment
- **Users Affected:** [Number]
- **Data Exposure:** [Description]
- **Service Downtime:** [Duration]
- **Financial Impact:** [Amount]

## Lessons Learned
- **What went well:** [List]
- **What went poorly:** [List]
- **Improvements needed:** [List]

## Action Items
| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | [Action] | [Name] | [Date] | [Status] |

## Approval
- **Incident Commander:** [Name, Date]
- **Technical Lead:** [Name, Date]
```

### 8.4 Continuous Improvement

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| PIR Review | After every SEV-1/2 incident | IC | Action items |
| Security Metrics Review | Monthly | Security Team | Metrics report |
| Threat Model Update | Quarterly | Security Team | Updated threat model |
| IR Plan Review | Semi-annually | IC | Updated IR plan |
| Tabletop Exercise | Semi-annually | IC | Exercise report |
| Full Penetration Test | Quarterly | External | Pen test report |

### 8.5 Security Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Mean Time to Detect (MTTD) | <1 hour | Time from incident start to detection |
| Mean Time to Contain (MTTC) | <4 hours | Time from detection to containment |
| Mean Time to Recover (MTTR) | <24 hours | Time from containment to full recovery |
| Incidents per Quarter | Decreasing trend | Count of SEV-1/2/3/4 incidents |
| False Positive Rate | <20% | Alerts that are not real incidents |
| PIR Completion Rate | 100% | SEV-1/2 incidents with completed PIR |
| Action Item Completion Rate | >90% | Completed within due date |

---

## 9. Communication Templates

### 9.1 Internal Status Update (SEV-1/2)

```
Subject: [SEV-{level}] Security Incident Update — {incident_id}

Status: {ACTIVE/CONTAINED/RESOLVED}
Severity: SEV-{level}
Incident ID: {incident_id}
Detected: {timestamp}
Duration: {duration}

Current Status:
{Brief description of current state}

Actions Taken:
1. {Action 1}
2. {Action 2}

Next Steps:
1. {Next step 1}
2. {Next step 2}

Next Update: {timestamp}

Incident Commander: {name}
```

### 9.2 User Notification (Security Incident)

```
Subject: Security Update — Important Information About Your Account

Dear {user_name},

We are writing to inform you of a security incident that may have 
affected your account on {wikipept.com/encyclopeptide.com}.

What Happened:
{Brief description of the incident}

What Information Was Involved:
{Types of data potentially affected}

What We Are Doing:
{Actions taken to address the incident}

What You Can Do:
- Change your password if you use the same password on other sites
- Review your account activity for any unauthorized changes
- Enable two-factor authentication if available
- Contact us if you notice any suspicious activity

We sincerely apologize for any inconvenience this may cause. The security 
of our users' data is our top priority, and we are taking steps to prevent 
similar incidents in the future.

If you have questions, please contact us at security@wikipept.com.

Sincerely,
The Wikisites Security Team
```

### 9.3 Regulatory Notification (GDPR Art. 33)

```
Subject: Personal Data Breach Notification — Supervisory Authority

To: {Supervisory Authority}
From: {Data Controller}
Date: {Date}
Re: Personal Data Breach Notification under Article 33 GDPR

1. Nature of the Breach
   {Description of the breach}

2. Categories and Approximate Number of Data Subjects
   {Types and number of affected users}

3. Categories and Approximate Number of Records
   {Types and number of affected records}

4. Name and Contact Details of DPO
   {DPO contact information}

5. Likely Consequences
   {Assessment of potential impact on data subjects}

6. Measures Taken or Proposed
   {Description of containment, eradication, and prevention measures}

7. Cross-Border Communication (if applicable)
   {Description of cross-border impact}

We remain at your disposal for any further information you may require.
```

### 9.4 Status Page Update

```json
{
  "incident_id": "INC-{YYYYMMDD}-{NNN}",
  "title": "Security Incident — {brief_description}",
  "severity": "{SEV-1/2/3/4}",
  "status": "{investigating/identified/monitoring/resolved}",
  "affected_components": ["{component_1}", "{component_2}"],
  "impact": "{none/minimal/major/critical}",
  "investigating": {
    "start": "{timestamp}",
    "message": "We are investigating reports of {issue}. Updates will be provided as we learn more."
  },
  "identified": {
    "start": "{timestamp}",
    "message": "We have identified the cause and are working on a fix."
  },
  "monitoring": {
    "start": "{timestamp}",
    "message": "A fix has been deployed and we are monitoring for stability."
  },
  "resolved": {
    "start": "{timestamp}",
    "message": "The incident has been resolved. We apologize for any inconvenience."
  }
}
```

### 9.5 Email Notification to All Users (Data Breach)

```
Subject: Important Security Notice — Action Required

Dear Wikisites User,

We are writing to inform you of a security incident that we take very 
seriously. On {date}, we discovered that {brief description}. We 
immediately took action to secure our systems and investigate the scope 
of the incident.

What Happened:
{Detailed description}

What Information Was Affected:
{Specific data types affected}

What We Have Done:
1. {Action 1 — e.g., "Secured the vulnerability that allowed the incident"}
2. {Action 2 — e.g., "Reset all active sessions"}
3. {Action 3 — e.g., "Engaged external security experts"}

What You Should Do:
1. Change your password on wikipept.com
2. Change your password on any other sites where you use the same password
3. Enable two-factor authentication where available
4. Review your account for any unauthorized activity
5. Be cautious of phishing emails that may reference this incident

We have reported this incident to the relevant data protection authorities 
as required by law. We are committed to protecting your data and are taking 
steps to prevent similar incidents in the future.

If you have any questions or concerns, please contact our security team at 
security@wikipept.com.

We sincerely apologize for this incident and any concern it may cause.

Sincerely,
The Wikisites Team
```

---

## 10. Playbooks

### 10.1 Playbook: XSS Attack

```
PLAYBOOK: XSS Attack
Severity: SEV-1/2
Trigger: CSP violation spike, user report, or WAF alert

1. DETECTION
   [ ] Confirm XSS is present (not false positive)
   [ ] Identify injection point (page content, annotation, search)
   [ ] Identify payload type (reflected, stored, DOM-based)
   [ ] Assess scope (how many users affected)

2. CONTAINMENT
   [ ] Disable affected content/endpoint if necessary
   [ ] Sanitize stored malicious content via DOMPurify
   [ ] Update CSP directives if needed
   [ ] Block source IP via WAF if active attack

3. ERADICATION
   [ ] Remove all instances of malicious content
   [ ] Patch the injection vulnerability
   [ ] Update DOMPurify configuration
   [ ] Add missing input validation
   [ ] Verify CSP blocks similar payloads

4. RECOVERY
   [ ] Re-enable affected endpoints
   [ ] Verify content renders correctly
   [ ] Monitor CSP reports for recurrence
   [ ] Test all user-input rendering paths

5. POST-INCIDENT
   [ ] Complete PIR within 5 business days
   [ ] Update XSS prevention checklist
   [ ] Add test cases for attack vector
   [ ] Update threat model
```

### 10.2 Playbook: Data Breach

```
PLAYBOOK: Data Breach
Severity: SEV-1
Trigger: Confirmed unauthorized data access or exposure

1. DETECTION
   [ ] Confirm data breach (not false positive)
   [ ] Identify affected data types (PII, credentials, etc.)
   [ ] Identify affected users (count and scope)
   [ ] Identify attack vector

2. CONTAINMENT
   [ ] Isolate affected systems
   [ ] Revoke compromised credentials
   [ ] Invalidate all active sessions (if auth compromised)
   [ ] Block attacker access
   [ ] Preserve evidence (logs, snapshots)

3. ERADICATION
   [ ] Remove attacker persistence mechanisms
   [ ] Patch vulnerability used for breach
   [ ] Rotate all potentially compromised secrets
   [ ] Verify system integrity

4. RECOVERY
   [ ] Restore data from backup (if corrupted)
   [ ] Verify data integrity
   [ ] Re-enable services
   [ ] Force password reset for affected users
   [ ] Monitor for further unauthorized access

5. NOTIFICATION
   [ ] Notify Incident Commander and team
   [ ] Notify legal counsel
   [ ] Assess GDPR Art. 33 notification requirement (72 hours)
   [ ] Assess CCPA notification requirement
   [ ] Prepare user notification email
   [ ] Notify affected users
   [ ] Post status page update

6. POST-INCIDENT
   [ ] Complete PIR within 5 business days
   [ ] File regulatory notifications (if required)
   [ ] Update security controls
   [ ] Update threat model
   [ ] Brief team on lessons learned
```

### 10.3 Playbook: DDoS Attack

```
PLAYBOOK: DDoS Attack
Severity: SEV-1/2
Trigger: Traffic spike, service degradation, WAF mitigation alert

1. DETECTION
   [ ] Confirm DDoS (not legitimate traffic spike)
   [ ] Identify attack type (volumetric, application, protocol)
   [ ] Identify targeted endpoints
   [ ] Assess service impact

2. CONTAINMENT
   [ ] Enable Cloudflare Under Attack Mode
   [ ] Enable rate limiting on targeted endpoints
   [ ] Add WAF rules to block attack patterns
   [ ] Activate challenge page for suspicious traffic
   [ ] Contact Cloudflare support for assistance

3. ERADICATION
   [ ] Analyze attack patterns
   [ ] Update WAF rules with specific blocking patterns
   [ ] Optimize targeted endpoints for performance
   [ ] Add caching for targeted routes

4. RECOVERY
   [ ] Monitor for attack subsidence
   [ ] Gradually relax containment measures
   [ ] Verify service performance
   [ ] Verify no data loss

5. POST-INCIDENT
   [ ] Complete PIR within 5 business days
   [ ] Update DDoS response playbook
   [ ] Optimize infrastructure for resilience
   [ ] Review Cloudflare plan limits
```

### 10.4 Playbook: Account Compromise

```
PLAYBOOK: Account Compromise
Severity: SEV-1/2
Trigger: Suspicious login activity, user report, or unauthorized action

1. DETECTION
   [ ] Confirm account compromise (not false positive)
   [ ] Identify compromised account(s)
   [ ] Identify attack method (credential stuffing, token theft, etc.)
   [ ] Assess actions taken by attacker

2. CONTAINMENT
   [ ] Revoke compromised session(s)
   [ ] Force password reset for affected account(s)
   [ ] Revoke all API keys for affected account(s)
   [ ] Block attacker IP if identified

3. ERADICATION
   [ ] Review account activity for unauthorized actions
   [ ] Reverse any unauthorized changes
   [ ] Verify account settings not modified
   [ ] Check for persistence mechanisms (API keys, linked accounts)

4. RECOVERY
   [ ] Restore account to legitimate owner
   [ ] Verify account data integrity
   [ ] Monitor account for further suspicious activity
   [ ] Guide user through security best practices

5. POST-INCIDENT
   [ ] Notify affected user
   [ ] Review authentication controls
   [ ] Update brute-force protection if needed
   [ ] Document incident for PIR
```

### 10.5 Playbook: Supply Chain Compromise

```
PLAYBOOK: Supply Chain Compromise
Severity: SEV-1/2
Trigger: Suspicious dependency alert, build anomaly, or security researcher report

1. DETECTION
   [ ] Confirm supply chain compromise (not false positive)
   [ ] Identify affected dependency/package
   [ ] Identify compromised version
   [ ] Assess impact on wikisites

2. CONTAINMENT
   [ ] Stop all builds using compromised dependency
   [ ] Block affected package in CI/CD
   [ ] Revert to last known-good build
   [ ] Preserve build logs for investigation

3. ERADICATION
   [ ] Remove compromised dependency
   [ ] Identify alternative or patched version
   [ ] Regenerate lockfile
   [ ] Audit all transitive dependencies
   [ ] Scan build output for malicious code

4. RECOVERY
   [ ] Rebuild from clean state
   [ ] Verify build output integrity
   [ ] Deploy clean build to production
   [ ] Monitor for further issues

5. POST-INCIDENT
   [ ] Notify dependency maintainer
   [ ] Report to npm/GitHub security
   [ ] Update dependency allowlist
   [ ] Enhance supply chain monitoring
   [ ] Document incident for PIR
```

---

**End of Document**
**Document Status:** DRAFT — Pending security review
**Owner:** Wikisites Security Team
