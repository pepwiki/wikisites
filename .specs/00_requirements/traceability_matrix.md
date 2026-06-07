# Traceability Matrix

**Document ID:** TM-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Approved
**Scope:** encyclopeptide.com and wikipept.com

---

## Table of Contents

1. [Requirements → Standards](#1-requirements--standards)
2. [Requirements → Components](#2-requirements--components)
3. [Requirements → Test Cases](#3-requirements--test-cases)
4. [Standards → Requirements](#4-standards--requirements)
5. [Cross-Site Requirements Mapping](#5-cross-site-requirements-mapping)
6. [Coverage Analysis](#6-coverage-analysis)

---

## 1. Requirements → Standards

### 1.1 Functional Requirements to Standards

| Requirement ID | Requirement Name             | Standard(s)                                      | Component   | Test Case   | Status      | Notes                                                           |
| -------------- | ---------------------------- | ------------------------------------------------ | ----------- | ----------- | ----------- | --------------------------------------------------------------- |
| FR-001         | Astro Static Site Generation | ISO/IEC 12207:2017 §9.3, Core Web Vitals         | TBD Phase 2 | TBD Phase 5 | In Progress | Core architecture decision; affects all downstream requirements |
| FR-002         | SolidJS Interactive Islands  | IEEE 1016-2009 §5.3, ISO/IEC 12207:2017 §9.3     | TBD Phase 2 | TBD Phase 5 | In Progress | Island architecture pattern; selective hydration                |
| FR-003         | Content Collections (Zod)    | ISO/IEC 12207:2017 §9.2, IEEE 829-2008 §7        | TBD Phase 2 | TBD Phase 5 | In Progress | Schema validation at build time                                 |
| FR-004         | View Transitions             | Core Web Vitals (CLS), WCAG 2.1 SC 2.4.1         | TBD Phase 2 | TBD Phase 5 | In Progress | Must not cause CLS >0.1                                         |
| FR-005         | 3D Molecular Viewer          | WCAG 2.1 SC 1.1.1, SC 1.3.1, SC 2.1.1            | TBD Phase 2 | TBD Phase 5 | In Progress | Accessibility critical; 2D fallback required                    |
| FR-006         | Quiz Engine                  | ISO/IEC 12207:2017 §9.5, IEEE 829-2008 §7        | TBD Phase 2 | TBD Phase 5 | In Progress | Scoring algorithm validation                                    |
| FR-007         | Flashcard System (FSRS)      | ISO/IEC 12207:2017 §9.5                          | TBD Phase 2 | TBD Phase 5 | In Progress | FSRS algorithm correctness                                      |
| FR-008         | Search (Pagefind)            | Core Web Vitals (LCP), ISO/IEC 12207:2017 §9.6   | TBD Phase 2 | TBD Phase 5 | In Progress | Static index at build time                                      |
| FR-009         | Community Editing            | NIST SP 800-53 AC-3, OWASP A01:2021              | TBD Phase 2 | TBD Phase 5 | In Progress | RBAC critical; edit conflict resolution                         |
| FR-010         | Progress Tracking            | GDPR Art. 5, CCPA §1798.100                      | TBD Phase 2 | TBD Phase 5 | In Progress | Personal data processing; consent required                      |
| FR-011         | Internationalization         | ICU MessageFormat, CLDR, ISO/IEC 15288:2015 §9.8 | TBD Phase 2 | TBD Phase 5 | In Progress | 6-language support; URL routing                                 |
| FR-012         | Dark Mode                    | WCAG 2.1 SC 1.4.1, SC 1.4.11                     | TBD Phase 2 | TBD Phase 5 | In Progress | Contrast ratios in both modes                                   |
| FR-013         | Navigation System            | WCAG 2.1 SC 2.4.1, SC 2.4.5, SC 2.4.7            | TBD Phase 2 | TBD Phase 5 | In Progress | Keyboard navigation; focus management                           |
| FR-014         | Breadcrumbs                  | WCAG 2.1 SC 2.4.5, Schema.org BreadcrumbList     | TBD Phase 2 | TBD Phase 5 | In Progress | Structured data + accessible navigation                         |
| FR-015         | Citation Export              | Dublin Core, Open Graph Protocol                 | TBD Phase 2 | TBD Phase 5 | In Progress | BibTeX, RIS, APA formats                                        |
| FR-016         | Data Export                  | FAIR Data Principles, OpenAPI 3.1                | TBD Phase 2 | TBD Phase 5 | In Progress | CSV, JSON, FASTA formats                                        |
| FR-017         | Structured Data (JSON-LD)    | Schema.org, W3C                                  | TBD Phase 2 | TBD Phase 5 | In Progress | ScholarlyArticle + LearningResource                             |
| FR-018         | Open Graph Meta Tags         | Open Graph Protocol (ogp.me)                     | TBD Phase 2 | TBD Phase 5 | In Progress | Social media preview optimization                               |
| FR-019         | Responsive Design            | WCAG 2.1 SC 1.4.10, SC 1.4.4                     | TBD Phase 2 | TBD Phase 5 | In Progress | Mobile-first; 5 breakpoints                                     |
| FR-020         | Error Handling               | ISO/IEC 12207:2017 §9.5, OWASP A05:2021          | TBD Phase 2 | TBD Phase 5 | In Progress | Custom 404; structured API errors                               |

### 1.2 Non-Functional Requirements to Standards

| Requirement ID | Requirement Name  | Standard(s)                                | Component   | Test Case   | Status      | Notes                                            |
| -------------- | ----------------- | ------------------------------------------ | ----------- | ----------- | ----------- | ------------------------------------------------ |
| NFR-001        | Performance (CWV) | Core Web Vitals, W3C Performance Timing    | TBD Phase 2 | TBD Phase 5 | In Progress | LCP, CLS, INP, FCP, TTI, page weight             |
| NFR-002        | Lighthouse Scores | Core Web Vitals, Google Web Vitals         | TBD Phase 2 | TBD Phase 5 | In Progress | Performance ≥90, A11y ≥95, BP ≥90, SEO ≥95       |
| NFR-003        | Accessibility     | WCAG 2.1 AA, Section 508, EN 301 549       | TBD Phase 2 | TBD Phase 5 | In Progress | Contrast, keyboard, screen reader, semantic HTML |
| NFR-004        | Security Headers  | NIST SP 800-53 SC-7, SC-8, OWASP A05:2021  | TBD Phase 2 | TBD Phase 5 | In Progress | HTTPS, HSTS, CSP, security headers               |
| NFR-005        | Reliability       | ISO/IEC 27001:2022 §A.8.12, Cloudflare SLA | TBD Phase 2 | TBD Phase 5 | In Progress | 99.9% uptime; RTO ≤4h; RPO ≤1h                   |
| NFR-006        | Scalability       | ISO/IEC 15288:2015 §9.6                    | TBD Phase 2 | TBD Phase 5 | In Progress | 5,000 concurrent users                           |
| NFR-007        | Offline Support   | PWA Best Practices                         | TBD Phase 2 | TBD Phase 5 | In Progress | Service worker; cached search index              |

### 1.3 Data Requirements to Standards

| Requirement ID | Requirement Name            | Standard(s)                                     | Component   | Test Case   | Status      | Notes                                 |
| -------------- | --------------------------- | ----------------------------------------------- | ----------- | ----------- | ----------- | ------------------------------------- |
| DR-001         | Content Schema Validation   | IEEE 829-2008 §7, ISO/IEC 12207:2017 §9.2       | TBD Phase 2 | TBD Phase 5 | In Progress | Zod schema enforcement                |
| DR-002         | Peptide Sequence Validation | IUPAC-IUB Nomenclature, ISO/IEC 12207:2017 §9.5 | TBD Phase 2 | TBD Phase 5 | In Progress | Regex pattern validation              |
| DR-003         | Reference Integrity         | Dublin Core, FAIR Data Principles               | TBD Phase 2 | TBD Phase 5 | In Progress | DOI validation                        |
| DR-004         | Data Consistency            | IUPAC-IUB Nomenclature, ISO/IEC 12207:2017 §9.5 | TBD Phase 2 | TBD Phase 5 | In Progress | Molecular weight calculation          |
| DR-005         | Content Completeness        | IEEE 829-2008 §5, ISO/IEC 12207:2017 §9.2       | TBD Phase 2 | TBD Phase 5 | In Progress | Required section enforcement          |
| DR-006         | Search Index Freshness      | ISO/IEC 12207:2017 §9.6, Core Web Vitals        | TBD Phase 2 | TBD Phase 5 | In Progress | ≤1 hour freshness                     |
| DR-007         | Data Backup                 | ISO/IEC 27001:2022 §A.8.12, NIST SP 800-53 CP-9 | TBD Phase 2 | TBD Phase 5 | In Progress | Daily backups; point-in-time recovery |
| DR-008         | Data Migration              | ISO/IEC 12207:2017 §9.7                         | TBD Phase 2 | TBD Phase 5 | In Progress | MDX to D1 migration                   |
| DR-009         | Content Versioning          | ISO/IEC 12207:2017 §10.2, Git-based VCS         | TBD Phase 2 | TBD Phase 5 | In Progress | Version history + diff                |
| DR-010         | Cross-Site Data Sharing     | ISO/IEC 15288:2015 §9.8, FAIR Data Principles   | TBD Phase 2 | TBD Phase 5 | In Progress | Canonical shared data model           |

### 1.4 Integration Requirements to Standards

| Requirement ID | Requirement Name            | Standard(s)                                           | Component   | Test Case   | Status      | Notes                               |
| -------------- | --------------------------- | ----------------------------------------------------- | ----------- | ----------- | ----------- | ----------------------------------- |
| IR-001         | Cloudflare Pages Deployment | Cloudflare Pages SLA, ISO/IEC 12207:2017 §9.7         | TBD Phase 2 | TBD Phase 5 | In Progress | Auto-deploy; preview deployments    |
| IR-002         | Cloudflare Workers          | Cloudflare Workers Runtime, ISO/IEC 12207:2017 §9.5   | TBD Phase 2 | TBD Phase 5 | In Progress | CPU/memory limits; edge compute     |
| IR-003         | Cloudflare KV               | Cloudflare KV API, ISO/IEC 12207:2017 §9.5            | TBD Phase 2 | TBD Phase 5 | In Progress | Eventual consistency; TTL           |
| IR-004         | Cloudflare R2               | Cloudflare R2 API, S3-compatible                      | TBD Phase 2 | TBD Phase 5 | In Progress | Object storage; no egress fees      |
| IR-005         | Cloudflare D1               | Cloudflare D1 API, SQLite                             | TBD Phase 2 | TBD Phase 5 | In Progress | Edge SQLite; relational data        |
| IR-006         | External API Integration    | OWASP A10:2021 (SSRF), ISO/IEC 12207:2017 §9.5        | TBD Phase 2 | TBD Phase 5 | In Progress | UniProt, PDB rate limiting; caching |
| IR-007         | CI/CD Pipeline              | ISO/IEC 12207:2017 §10.2, §10.4                       | TBD Phase 2 | TBD Phase 5 | In Progress | 8-stage pipeline; quality gates     |
| IR-008         | Analytics Integration       | GDPR Art. 5, CCPA §1798.100, Cloudflare Web Analytics | TBD Phase 2 | TBD Phase 5 | In Progress | Privacy-first; no cookies           |

### 1.5 Design Requirements to Standards

| Requirement ID | Requirement Name           | Standard(s)                                | Component   | Test Case   | Status      | Notes                                         |
| -------------- | -------------------------- | ------------------------------------------ | ----------- | ----------- | ----------- | --------------------------------------------- |
| DesR-001       | Design Tokens              | IEEE 1016-2009 §5.1, §5.4                  | TBD Phase 2 | TBD Phase 5 | In Progress | CSS custom properties; site-specific palettes |
| DesR-002       | Typography                 | IEEE 1016-2009 §5.3, WCAG 2.1 SC 1.4.4     | TBD Phase 2 | TBD Phase 5 | In Progress | Font loading; size/line-height                |
| DesR-003       | Layout                     | IEEE 1016-2009 §5.3, WCAG 2.1 SC 1.4.10    | TBD Phase 2 | TBD Phase 5 | In Progress | Max-width; border-radius; responsive          |
| DesR-004       | Component Design (Buttons) | IEEE 1016-2009 §5.4                        | TBD Phase 2 | TBD Phase 5 | In Progress | Site-specific button styles                   |
| DesR-005       | Component Design (Cards)   | IEEE 1016-2009 §5.4                        | TBD Phase 2 | TBD Phase 5 | In Progress | Site-specific card styles                     |
| DesR-006       | Responsive Breakpoints     | WCAG 2.1 SC 1.4.10, Core Web Vitals        | TBD Phase 2 | TBD Phase 5 | In Progress | Tailwind breakpoint system                    |
| DesR-007       | Spacing                    | IEEE 1016-2009 §5.3                        | TBD Phase 2 | TBD Phase 5 | In Progress | 24px minimum section gap                      |
| DesR-008       | Loading States             | WCAG 2.1 SC 4.1.3, ISO/IEC 12207:2017 §9.5 | TBD Phase 2 | TBD Phase 5 | In Progress | ARIA live regions for loading                 |

### 1.6 Security Requirements to Standards

| Requirement ID | Requirement Name     | Standard(s)                                      | Component   | Test Case   | Status      | Notes                               |
| -------------- | -------------------- | ------------------------------------------------ | ----------- | ----------- | ----------- | ----------------------------------- |
| SR-001         | Input Validation     | OWASP A03:2021, NIST SP 800-53 SI-10             | TBD Phase 2 | TBD Phase 5 | In Progress | XSS/SQLi prevention; sanitization   |
| SR-002         | Authentication       | OWASP A07:2021, NIST SP 800-53 IA-2, RFC 7519    | TBD Phase 2 | TBD Phase 5 | In Progress | OAuth 2.0/OIDC; MFA; rate limiting  |
| SR-003         | Password Security    | OWASP A02:2021, NIST SP 800-53 IA-5              | TBD Phase 2 | TBD Phase 5 | In Progress | bcrypt/argon2; no plaintext storage |
| SR-004         | Authorization (RBAC) | OWASP A01:2021, NIST SP 800-53 AC-3              | TBD Phase 2 | TBD Phase 5 | In Progress | 4-tier role system                  |
| SR-005         | CSRF Protection      | OWASP A08:2021, NIST SP 800-53 SC-23             | TBD Phase 2 | TBD Phase 5 | In Progress | Token-based CSRF prevention         |
| SR-006         | API Rate Limiting    | NIST SP 800-53 SC-7, ISO/IEC 27001 §A.8.20       | TBD Phase 2 | TBD Phase 5 | In Progress | Auth/unauth rate limits             |
| SR-007         | Dependency Scanning  | OWASP A06:2021, NIST SP 800-53 SI-2              | TBD Phase 2 | TBD Phase 5 | In Progress | pnpm audit; critical/high block     |
| SR-008         | Session Security     | OWASP A07:2021, NIST SP 800-53 AC-12             | TBD Phase 2 | TBD Phase 5 | In Progress | Secure cookie attributes            |
| SR-009         | Content Sanitization | OWASP A03:2021, OWASP A07:2021                   | TBD Phase 2 | TBD Phase 5 | In Progress | Wiki content XSS prevention         |
| SR-010         | Audit Logging        | NIST SP 800-53 AU-2, AU-3, ISO/IEC 27001 §A.8.15 | TBD Phase 2 | TBD Phase 5 | In Progress | Administrative + user events        |

### 1.7 Compliance Requirements to Standards

| Requirement ID | Requirement Name       | Standard(s)                                  | Component   | Test Case   | Status      | Notes                                        |
| -------------- | ---------------------- | -------------------------------------------- | ----------- | ----------- | ----------- | -------------------------------------------- |
| CR-001         | GDPR Compliance        | GDPR Art. 5, 6, 7, 12-22, 25, 30, 32, 33, 35 | TBD Phase 2 | TBD Phase 5 | In Progress | Privacy notice; consent; data subject rights |
| CR-002         | CCPA Compliance        | CCPA §1798.100-1798.199                      | TBD Phase 2 | TBD Phase 5 | In Progress | Do Not Sell; data access; deletion           |
| CR-003         | WCAG 2.1 AA Compliance | WCAG 2.1 AA, Section 508, EN 301 549         | TBD Phase 2 | TBD Phase 5 | In Progress | Full AA conformance; VPAT/ACR                |
| CR-004         | Schema.org Compliance  | Schema.org (W3C/WHATWG/Google)               | TBD Phase 2 | TBD Phase 5 | In Progress | Rich results eligibility                     |
| CR-005         | IUPAC Nomenclature     | IUPAC-IUB Joint Commission Standards         | TBD Phase 2 | TBD Phase 5 | In Progress | Amino acid codes; sequence notation          |

---

## 2. Requirements → Components

> **Note:** Component assignments to be completed in Phase 2 (Architecture). This section will map each requirement to specific Astro components, SolidJS components, Cloudflare Workers, D1 tables, and other implementation artifacts.

| Requirement ID | Component (Phase 2) | Implementation Notes                      |
| -------------- | ------------------- | ----------------------------------------- |
| FR-001         | TBD                 | Astro config, output mode, build pipeline |
| FR-002         | TBD                 | SolidJS integration, client directives    |
| FR-003         | TBD                 | Content collection schemas, Zod config    |
| FR-004         | TBD                 | Astro View Transitions API config         |
| FR-005         | TBD                 | Molecular viewer island component         |
| FR-006         | TBD                 | Quiz engine SolidJS component             |
| FR-007         | TBD                 | Flashcard SolidJS component + FSRS        |
| FR-008         | TBD                 | Pagefind integration + search UI          |
| FR-009         | TBD                 | Wiki editor + D1 versioning               |
| FR-010         | TBD                 | Progress tracker + D1 storage             |
| FR-011         | TBD                 | i18n config, locale routing               |
| FR-012         | TBD                 | Theme toggle component                    |
| FR-013         | TBD                 | Header, sidebar, nav components           |
| FR-014         | TBD                 | Breadcrumb component                      |
| FR-015         | TBD                 | Citation export utility                   |
| FR-016         | TBD                 | Data export utility                       |
| FR-017         | TBD                 | JSON-LD layout components                 |
| FR-018         | TBD                 | Meta tag layout components                |
| FR-019         | TBD                 | Responsive layout system                  |
| FR-020         | TBD                 | Error page components, API error handler  |
| NFR-001–007    | TBD                 | Performance, a11y, security, reliability  |
| DR-001–010     | TBD                 | Schema validators, backup, migration      |
| IR-001–008     | TBD                 | Cloudflare bindings, CI/CD, analytics     |
| DesR-001–008   | TBD                 | Design system components                  |
| SR-001–010     | TBD                 | Auth, security middleware, sanitization   |
| CR-001–005     | TBD                 | Privacy, a11y, structured data            |

---

## 3. Requirements → Test Cases

> **Note:** Test case specifications to be completed in Phase 5 (Testing). This section will map each requirement to specific Vitest unit tests, Playwright E2E tests, Lighthouse CI audits, and axe-core accessibility tests.

| Requirement ID | Test Type           | Test Case (Phase 5)                       |
| -------------- | ------------------- | ----------------------------------------- |
| FR-001         | Build validation    | TBD: verify static HTML output, zero JS   |
| FR-002         | Integration         | TBD: verify island hydration              |
| FR-003         | Unit                | TBD: schema validation pass/fail          |
| FR-004         | E2E (Playwright)    | TBD: view transition, CLS measurement     |
| FR-005         | E2E + Performance   | TBD: viewer load, 60fps, 2D fallback      |
| FR-006         | Unit + E2E          | TBD: quiz scoring, feedback, persistence  |
| FR-007         | Unit + E2E          | TBD: FSRS algorithm, flip animation       |
| FR-008         | Unit + E2E          | TBD: search index, response time, facets  |
| FR-009         | E2E + Integration   | TBD: edit flow, conflict resolution, RBAC |
| FR-010         | Integration         | TBD: progress tracking, dashboard display |
| FR-011         | E2E                 | TBD: locale routing, fallback behavior    |
| FR-012         | E2E                 | TBD: dark mode toggle, persistence        |
| FR-013         | E2E (Playwright)    | TBD: nav keyboard, sidebar collapse       |
| FR-014         | E2E                 | TBD: breadcrumb links, hierarchy          |
| FR-015         | Unit                | TBD: citation format generation           |
| FR-016         | Unit                | TBD: data export formats                  |
| FR-017         | Validation          | TBD: JSON-LD Schema.org validation        |
| FR-018         | Validation          | TBD: OG meta tag presence                 |
| FR-019         | E2E (Playwright)    | TBD: responsive screenshots               |
| FR-020         | E2E                 | TBD: 404 page, API error format           |
| NFR-001        | Lighthouse CI       | TBD: CWV measurement                      |
| NFR-002        | Lighthouse CI       | TBD: score thresholds                     |
| NFR-003        | axe-core + Manual   | TBD: WCAG 2.1 AA audit                    |
| NFR-004        | Security scan       | TBD: header verification                  |
| NFR-005        | Monitoring          | TBD: uptime tracking                      |
| NFR-006        | Load test           | TBD: k6/Artillery load test               |
| NFR-007        | E2E (Playwright)    | TBD: offline search                       |
| DR-001         | Unit                | TBD: schema validation                    |
| DR-002         | Unit                | TBD: sequence regex                       |
| DR-003         | Integration         | TBD: DOI validation                       |
| DR-004         | Unit                | TBD: MW calculation                       |
| DR-005         | Build validation    | TBD: section presence                     |
| DR-006         | Integration         | TBD: index freshness                      |
| DR-007         | Operational         | TBD: backup/restore drill                 |
| DR-008         | Integration         | TBD: migration integrity                  |
| DR-009         | Integration         | TBD: version diff accuracy                |
| DR-010         | Integration         | TBD: shared data query                    |
| IR-001         | CI/CD               | TBD: deploy pipeline                      |
| IR-002         | Load test           | TBD: worker limits                        |
| IR-003         | Integration         | TBD: KV read/write latency                |
| IR-004         | Integration         | TBD: R2 TTFB                              |
| IR-005         | Benchmark           | TBD: D1 query performance                 |
| IR-006         | Integration         | TBD: API rate limiting + fallback         |
| IR-007         | CI/CD               | TBD: pipeline completeness                |
| IR-008         | Integration         | TBD: analytics script presence            |
| DesR-001       | Visual audit        | TBD: CSS custom properties                |
| DesR-002       | Visual audit        | TBD: font loading                         |
| DesR-003       | Visual audit        | TBD: max-width, border-radius             |
| DesR-004       | Visual audit        | TBD: button styles                        |
| DesR-005       | Visual audit        | TBD: card styles                          |
| DesR-006       | E2E                 | TBD: breakpoint layout                    |
| DesR-007       | Visual audit        | TBD: spacing values                       |
| DesR-008       | E2E                 | TBD: loading indicator timing             |
| SR-001         | Security scan       | TBD: XSS/SQLi payloads                    |
| SR-002         | Security test       | TBD: auth flow, MFA, lockout              |
| SR-003         | Security audit      | TBD: password hashing                     |
| SR-004         | Integration         | TBD: RBAC enforcement                     |
| SR-005         | Security test       | TBD: CSRF token validation                |
| SR-006         | Load test           | TBD: rate limiting                        |
| SR-007         | CI/CD               | TBD: dependency audit                     |
| SR-008         | Security audit      | TBD: cookie attributes                    |
| SR-009         | Security test       | TBD: content sanitization                 |
| SR-010         | Integration         | TBD: audit log entries                    |
| CR-001         | Compliance audit    | TBD: GDPR requirements                    |
| CR-002         | Compliance audit    | TBD: CCPA requirements                    |
| CR-003         | Accessibility audit | TBD: WCAG 2.1 AA                          |
| CR-004         | Validation          | TBD: Schema.org                           |
| CR-005         | Content audit       | TBD: IUPAC nomenclature                   |

---

## 4. Standards → Requirements

### 4.1 ISO/IEC 12207:2017 → Requirements

| Standard Clause                | Requirement IDs                                                | Coverage | Notes                         |
| ------------------------------ | -------------------------------------------------------------- | -------- | ----------------------------- |
| §9.2 Requirements Analysis     | FR-003, DR-001, DR-005                                         | Partial  | Content schema and validation |
| §9.3 Architectural Design      | FR-001, FR-002, NFR-001                                        | Partial  | Architecture decisions        |
| §9.4 Detailed Design           | DesR-001–008                                                   | Full     | Design system specification   |
| §9.5 Construction              | FR-006, FR-007, FR-009, FR-020, IR-002, IR-003, IR-005, IR-006 | Partial  | Implementation requirements   |
| §9.6 Integration Testing       | FR-008, NFR-001, NFR-006, DR-006, IR-007                       | Partial  | Integration and testing       |
| §9.7 Installation              | IR-001, IR-002                                                 | Partial  | Deployment                    |
| §9.8 Acceptance                | All AC-\* criteria                                             | Full     | Acceptance criteria document  |
| §10.2 Configuration Management | DR-009, IR-007, SR-007                                         | Partial  | Version control, CI/CD        |
| §10.4 Quality Assurance        | NFR-002, CR-003                                                | Partial  | Quality gates                 |

### 4.2 ISO/IEC 15288:2015 → Requirements

| Standard Clause              | Requirement IDs            | Coverage | Notes                                 |
| ---------------------------- | -------------------------- | -------- | ------------------------------------- |
| §9.2 Stakeholder Needs       | FR-013, FR-019, NFR-003    | Partial  | Navigation, responsive, accessibility |
| §9.3 System Requirements     | FR-001–020, NFR-001–007    | Full     | All functional and non-functional     |
| §9.4 Architecture Definition | FR-001, FR-002, IR-001–008 | Partial  | Architecture and infrastructure       |
| §9.5 Design Definition       | DesR-001–008, FR-006–008   | Partial  | Component and design                  |
| §9.6 System Analysis         | NFR-001, NFR-006, DR-004   | Partial  | Performance, scalability, consistency |
| §9.7 Implementation          | FR-001–020                 | Full     | All functional requirements           |
| §9.8 Integration             | IR-001–008, DR-010         | Full     | All integration requirements          |
| §9.9 Verification            | NFR-002, CR-003, CR-004    | Partial  | Lighthouse, a11y, schema validation   |
| §9.10 Transition             | IR-001, IR-007             | Partial  | Deployment pipeline                   |
| §9.11 Validation             | All AC-\* criteria         | Full     | Acceptance criteria                   |

### 4.3 WCAG 2.1 AA → Requirements

| WCAG SC                          | Requirement IDs               | Coverage | Notes                            |
| -------------------------------- | ----------------------------- | -------- | -------------------------------- |
| SC 1.1.1 Non-text Content        | FR-005-3, NFR-003-5, CR-003-2 | Full     | Molecular viewer alt text        |
| SC 1.3.1 Info and Relationships  | FR-003, NFR-003-4, CR-003-2   | Full     | Semantic HTML, schema validation |
| SC 1.3.2 Meaningful Sequence     | NFR-003-4                     | Partial  | DOM order                        |
| SC 1.4.1 Use of Color            | NFR-003-1, DesR-012           | Partial  | Color not sole indicator         |
| SC 1.4.3 Contrast (Minimum)      | NFR-003-1, DesR-001, CR-003   | Full     | 4.5:1 / 3:1 ratios               |
| SC 1.4.4 Resize Text             | FR-019, NFR-003               | Partial  | Responsive design                |
| SC 1.4.5 Images of Text          | DesR-002                      | Partial  | Real text preferred              |
| SC 1.4.10 Reflow                 | FR-019-1, NFR-003             | Partial  | Responsive at 320px              |
| SC 1.4.11 Non-text Contrast      | NFR-003-1, DesR-001           | Partial  | UI component contrast            |
| SC 1.4.13 Content on Hover/Focus | FR-012, DesR-008              | Partial  | Tooltip behavior                 |
| SC 2.1.1 Keyboard                | FR-005, NFR-003-2             | Full     | All interactive elements         |
| SC 2.1.2 No Keyboard Trap        | NFR-003-2                     | Full     | Zero keyboard traps              |
| SC 2.4.1 Bypass Blocks           | FR-013, NFR-003-4             | Partial  | Skip navigation                  |
| SC 2.4.2 Page Titled             | FR-001-2                      | Partial  | Valid HTML with titles           |
| SC 2.4.3 Focus Order             | NFR-003-7                     | Full     | Focus management                 |
| SC 2.4.4 Link Purpose            | FR-014, NFR-003-4             | Partial  | Breadcrumbs, link text           |
| SC 2.4.5 Multiple Ways           | FR-008, FR-013, FR-014        | Full     | Search, nav, breadcrumbs         |
| SC 2.4.6 Headings and Labels     | NFR-003-4, NFR-003-6          | Full     | Heading hierarchy, form labels   |
| SC 2.4.7 Focus Visible           | NFR-003-2                     | Full     | Visible focus indicators         |
| SC 3.1.1 Language of Page        | FR-011                        | Partial  | html lang attribute              |
| SC 3.1.2 Language of Parts       | FR-011-3                      | Partial  | IUPAC invariant                  |
| SC 3.2.1 On Focus                | NFR-003-7                     | Partial  | No unexpected changes            |
| SC 3.2.2 On Input                | FR-006-3, FR-007-3            | Partial  | Expected behavior                |
| SC 3.3.1 Error Identification    | FR-020-2, NFR-003-6           | Partial  | Error messages                   |
| SC 3.3.3 Error Suggestion        | FR-006-3                      | Partial  | Quiz feedback                    |
| SC 4.1.1 Parsing                 | FR-001-2                      | Partial  | Valid HTML                       |
| SC 4.1.2 Name, Role, Value       | NFR-003-3, NFR-003-6          | Full     | ARIA roles and labels            |
| SC 4.1.3 Status Messages         | DesR-008, FR-010-2            | Partial  | Loading states, progress         |

### 4.4 OWASP Top 10 2021 → Requirements

| OWASP Category                | Requirement IDs              | Coverage | Notes                                         |
| ----------------------------- | ---------------------------- | -------- | --------------------------------------------- |
| A01 Broken Access Control     | SR-004, FR-009               | Full     | RBAC; edit permissions                        |
| A02 Cryptographic Failures    | SR-003, SR-008, NFR-004-1    | Full     | Password hashing; HTTPS; HSTS                 |
| A03 Injection                 | SR-001, SR-009               | Full     | Input sanitization; XSS prevention            |
| A04 Insecure Design           | FR-001, FR-002, NFR-004      | Partial  | Static architecture reduces attack surface    |
| A05 Security Misconfiguration | NFR-004-2, NFR-004-3, IR-002 | Full     | CSP headers; security headers; Workers config |
| A06 Vulnerable Components     | SR-007                       | Full     | Dependency scanning                           |
| A07 Authentication Failures   | SR-002, SR-003, SR-008       | Full     | OAuth 2.0; MFA; session security              |
| A08 Data Integrity Failures   | DR-009, IR-007               | Partial  | Version control; signed builds                |
| A09 Logging Failures          | SR-010                       | Full     | Audit logging                                 |
| A10 SSRF                      | IR-006                       | Full     | External API rate limiting                    |

### 4.5 GDPR → Requirements

| GDPR Article                   | Requirement IDs          | Coverage | Notes                                       |
| ------------------------------ | ------------------------ | -------- | ------------------------------------------- |
| Art. 5 Principles              | CR-001-1, FR-010, IR-008 | Full     | Data minimization; purpose limitation       |
| Art. 6 Lawfulness              | CR-001-3                 | Full     | Consent management                          |
| Art. 7 Conditions for Consent  | CR-001-3                 | Full     | Consent collection and withdrawal           |
| Art. 12-14 Transparency        | CR-001-1                 | Full     | Privacy notice                              |
| Art. 15-22 Data Subject Rights | CR-001-2                 | Full     | Access, rectification, erasure, portability |
| Art. 25 Privacy by Design      | FR-001, FR-002, NFR-004  | Full     | Static architecture; data minimization      |
| Art. 30 Records                | SR-010                   | Full     | Audit logging                               |
| Art. 32 Security               | SR-001–010               | Full     | All security requirements                   |
| Art. 33 Breach Notification    | SR-010, IR-008           | Partial  | Breach detection and logging                |
| Art. 35 DPIA                   | CR-001                   | Full     | DPIA for wikipept.com                       |

---

## 5. Cross-Site Requirements Mapping

### 5.1 Shared Requirements (Both Sites)

| Requirement ID | Requirement Name       | encyclopeptide.com          | wikipept.com                      | Differences                   |
| -------------- | ---------------------- | --------------------------- | --------------------------------- | ----------------------------- |
| FR-001         | Astro SSG              | `output: 'static'`          | `output: 'hybrid'`                | Static-only vs. static+server |
| FR-002         | SolidJS Islands        | All interactive components  | All interactive components        | Same architecture             |
| FR-003         | Content Collections    | Monographs, structural data | Study guides, quizzes, flashcards | Different schemas             |
| FR-004         | View Transitions       | Full support                | Full support                      | Same implementation           |
| FR-008         | Search                 | Pagefind (static index)     | Pagefind + FlexSearch (dynamic)   | Additional FlexSearch         |
| FR-011         | Internationalization   | Full 6-language support     | Full 6-language support           | Same URL routing              |
| FR-012         | Dark Mode              | Full support                | Full support                      | Same token system             |
| FR-013         | Navigation             | Fixed left sidebar          | Top header + dropdowns            | Different layout              |
| FR-014         | Breadcrumbs            | Hierarchical                | Hierarchical                      | Same component                |
| FR-018         | Open Graph             | `ScholarlyArticle`          | `LearningResource`                | Different schema types        |
| FR-019         | Responsive Design      | Full responsive             | Full responsive                   | Same breakpoints              |
| FR-020         | Error Handling         | Custom 404                  | Custom 404                        | Same error pages              |
| NFR-001        | Performance            | CWV targets                 | CWV targets                       | Same thresholds               |
| NFR-002        | Lighthouse Scores      | Same thresholds             | Same thresholds                   | Same budgets                  |
| NFR-003        | Accessibility          | WCAG 2.1 AA                 | WCAG 2.1 AA                       | Same compliance               |
| NFR-004        | Security               | Same headers                | Same headers                      | Same CSP                      |
| DesR-001       | Design Tokens          | Navy/Gold palette           | Teal/Coral palette                | Different colors              |
| DesR-002       | Typography             | Playfair Display + Inter    | Inter only                        | Different heading font        |
| DesR-003       | Layout                 | 960px max, 0px radius       | 720px max, 16px radius            | Different layout              |
| DesR-006       | Responsive Breakpoints | Tailwind defaults           | Tailwind defaults                 | Same breakpoints              |
| SR-001–010     | Security               | Full security stack         | Full security stack               | Same implementation           |
| CR-001–002     | Privacy                | GDPR + CCPA                 | GDPR + CCPA                       | Same compliance               |
| CR-003         | WCAG 2.1 AA            | Full AA                     | Full AA                           | Same compliance               |

### 5.2 encyclopeptide.com-Specific Requirements

| Requirement ID | Requirement Name    | Description                            |
| -------------- | ------------------- | -------------------------------------- |
| FR-005         | 3D Molecular Viewer | Mol\*/NGL integration with 2D fallback |
| FR-015         | Citation Export     | BibTeX, RIS, APA formats               |
| FR-016         | Data Export         | CSV, JSON, FASTA formats               |
| FR-017         | Structured Data     | `ScholarlyArticle` JSON-LD             |
| DesR-004-1     | Button Design       | Rectangular, no border-radius          |
| DesR-005-2     | Card Design         | No border-radius, 1px border           |
| DesR-007       | Spacing             | 24px minimum section gap               |
| CR-005         | IUPAC Nomenclature  | Strict IUPAC compliance                |

### 5.3 wikipept.com-Specific Requirements

| Requirement ID | Requirement Name     | Description                         |
| -------------- | -------------------- | ----------------------------------- |
| FR-006         | Quiz Engine          | Multiple question types, scoring    |
| FR-007         | Flashcard System     | FSRS spaced repetition              |
| FR-009         | Community Editing    | Wiki-style editing, version history |
| FR-010         | Progress Tracking    | Learning progress, streaks, badges  |
| FR-017         | Structured Data      | `LearningResource` JSON-LD          |
| DesR-004-2     | Button Design        | 8px radius, solid fill              |
| DesR-005-1     | Card Design          | 16px radius, shadow                 |
| SR-002         | Authentication       | OAuth 2.0/OIDC, MFA                 |
| SR-004         | Authorization (RBAC) | 4-tier role system                  |
| IR-005         | D1 Integration       | User data, progress, edits          |

---

## 6. Coverage Analysis

### 6.1 Requirement Coverage by Standards

| Requirement Category | Total Requirements | Covered by Standards | Coverage % |
| -------------------- | ------------------ | -------------------- | ---------- |
| Functional (FR)      | 20                 | 20                   | 100%       |
| Non-Functional (NFR) | 7                  | 7                    | 100%       |
| Data (DR)            | 10                 | 10                   | 100%       |
| Integration (IR)     | 8                  | 8                    | 100%       |
| Design (DesR)        | 8                  | 8                    | 100%       |
| Security (SR)        | 10                 | 10                   | 100%       |
| Compliance (CR)      | 5                  | 5                    | 100%       |
| **Total**            | **68**             | **68**               | **100%**   |

### 6.2 Standard Coverage by Requirements

| Standard           | Applicable Clauses | Covered by Requirements | Coverage % |
| ------------------ | ------------------ | ----------------------- | ---------- |
| ISO/IEC 12207:2017 | 9 clauses          | 9 clauses               | 100%       |
| ISO/IEC 15288:2015 | 10 clauses         | 10 clauses              | 100%       |
| WCAG 2.1 AA        | 28 SCs             | 28 SCs                  | 100%       |
| OWASP Top 10 2021  | 10 categories      | 10 categories           | 100%       |
| GDPR               | 10 articles        | 10 articles             | 100%       |
| CCPA               | 5 sections         | 5 sections              | 100%       |
| Schema.org         | 3 types            | 3 types                 | 100%       |
| Core Web Vitals    | 6 metrics          | 6 metrics               | 100%       |

### 6.3 Traceability Completeness

| Traceability Link         | Status   | Notes                                            |
| ------------------------- | -------- | ------------------------------------------------ |
| Requirements → Standards  | Complete | All 68 requirements mapped to standards          |
| Requirements → Components | Pending  | Phase 2 deliverable                              |
| Requirements → Test Cases | Pending  | Phase 5 deliverable                              |
| Standards → Requirements  | Complete | All major standards traced back                  |
| Cross-Site Mapping        | Complete | Shared and site-specific requirements identified |

---

**End of Traceability Matrix**

_This document is version-controlled. Component and test case columns to be populated in Phase 2 and Phase 5 respectively. Changes require review by the project lead._
