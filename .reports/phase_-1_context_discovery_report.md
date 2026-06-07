# Phase -1: Context Discovery Report

**Document ID:** RPT-PHASE--1-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Final
**Project:** Wikisites — Dual-Site Oligopeptide Educational Platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Domain Analysis Summary](#2-domain-analysis-summary)
3. [Key Findings](#3-key-findings)
4. [Standards Mapping Summary](#4-standards-mapping-summary)
5. [Capability Assessment](#5-capability-assessment)
6. [Multi-lingual Strategy](#6-multi-lingual-strategy)
7. [Risk Register Summary](#7-risk-register-summary)
8. [Recommended Next Steps for Phase 0](#8-recommended-next-steps-for-phase-0)
9. [Quality Gate Status](#9-quality-gate-status)

---

## 1. Executive Summary

The Wikisites project establishes two complementary oligopeptide educational websites built on a shared Astro + SolidJS + Cloudflare stack: **encyclopeptide.com** (a formal, encyclopedic reference) and **wikipept.com** (a collaborative, wiki-style learning platform). The project targets the intersection of biochemistry education, pharmacological reference, and computational biology resource provision.

The oligopeptide domain — molecules composed of 2–20 amino acid residues — represents a critical intermediate class between individual amino acids and larger polypeptide/protein structures. Oligopeptides serve essential roles in cell signaling, antimicrobial defense, neurotransmission, hormonal regulation, and represent a rapidly expanding class of therapeutic agents with projected global market value exceeding $12.8 billion by 2030.

The dual-site strategy addresses two fundamentally distinct user intent patterns:

- **Encyclopedic intent**: Users seeking authoritative, citable, peer-reviewed-grade data on specific oligopeptide structures, synthesis routes, and pharmacokinetic parameters. This population demands precision, traceability, and formal scientific notation.
- **Educational intent**: Users seeking to learn about oligopeptides from foundational concepts through expert-level material, leveraging community knowledge, interactive assessment tools, and progressive disclosure of complexity.

Phase -1 has completed a comprehensive context discovery encompassing domain scope definition, audience analysis, content strategy differentiation, technical constraint identification, multi-lingual requirements elicitation, and risk assessment. This report synthesizes all findings and establishes the baseline for Phase 0 (Requirements Engineering).

**Project Scope Summary:**

| Dimension            | encyclopeptide.com                                              | wikipept.com                                              |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| Primary content type | Monographs, data tables, molecular visualizations               | Study guides, tutorials, community annotations            |
| Citation model       | DOI-linked, peer-reviewed references                            | Community-sourced, editable footnotes                     |
| Interactivity level  | 3D molecular viewer, structure search                           | Quizzes, flashcards, spaced repetition, progress tracking |
| Editing model        | Editorial board review                                          | Wiki-style collaborative editing                          |
| Visual identity      | Clinical, journal-like (Dark Navy + Gold)                       | Warm, card-based, modern wiki (Teal + Coral)              |
| Target audience      | Academic researchers, bioinformaticians, industry professionals | Students, science enthusiasts, general public             |
| Languages            | EN primary, ZH/RU/DE/FR/JP secondary                            | EN primary, ZH/RU/DE/FR/JP secondary                      |

---

## 2. Domain Analysis Summary

### 2.1 Domain Scope

The oligopeptide knowledge domain spans five major axes:

1. **Chemical classification** — by chain length (dipeptides through icosapeptides), chemical class (linear, cyclic, branched), structural features (D-amino acid-containing, modified, peptidomimetics)
2. **Functional classification** — neurotransmitter modulators, hormonal regulators, antimicrobial peptides, immunomodulatory peptides, antioxidant peptides, ACE-inhibitory peptides, bioactive food peptides, neuropeptides
3. **Source organism** — mammalian, microbial, marine, plant-derived, synthetic/combinatorial
4. **Therapeutic application** — oncology, infectious disease, endocrinology, neurology, dermatology, metabolic disorders, cardiovascular
5. **Educational taxonomy** — four levels from foundational (high school) through expert (established researcher)

### 2.2 encyclopeptide.com — Formal Reference Site

**Role:** Authoritative, citable reference for oligopeptide data.

**Content model:** Monographs structured as formal scientific entries with classification metadata, structural information (primary sequence, molecular formula, 3D structure via Mol\*/NGL), biological activity data (receptor binding affinities, signaling pathways), pharmacological properties (PK parameters, therapeutic applications, safety profiles), synthesis routes (SPPS, biosynthetic, recombinant), analytical characterization (MS, HPLC, NMR), and DOI-linked references.

**Editorial model:** Expert editorial board with peer review process. All quantitative values require primary literature citations with DOI. Structural data cross-referenced against PDB, UniProt, and ChEMBL. Content updated quarterly/annually with formal errata process.

**Search model:** Structure-based search (substructure, similarity), database-style filtered queries, API access for programmatic data retrieval.

### 2.3 wikipept.com — Collaborative Wiki Site

**Role:** Accessible, community-driven learning platform for oligopeptide education.

**Content model:** Study guides with progressive depth disclosure (foundational → intermediate → advanced → expert), interactive quiz engine (SM-2/FSRS spaced repetition), flashcard decks, community annotation system, comparison table builder, contribution leaderboard, and version history with edit diff visualization.

**Editorial model:** Wiki-style collaborative editing with reputation-weighted trust system. Expert review queue for high-traffic pages. Community moderation tools (flag, vote, revert). "Pending changes" review for new contributors. Clear community guidelines and code of conduct.

**Learning model:** Bottom-up learning progression with interleaved review, active recall emphasis, community scaffolding, and mastery-based advancement (unlock advanced topics after demonstrating foundational competency).

### 2.4 Shared Data Layer

Both sites share underlying peptide data but present it differently. The canonical data model includes:

- Peptide identity (name, synonyms, CAS, UniProt ID, PDB entries)
- Structural data (sequence, molecular formula, weight, charge, modifications)
- Biological activity (targets, affinities, pathways)
- Pharmacological parameters (PK, PD, safety)
- Synthesis information (chemical, biosynthetic, recombinant)
- Literature references (DOI-linked)

The shared data layer prevents double maintenance while allowing independent content evolution and presentation.

---

## 3. Key Findings

### 3.1 Oligopeptide Domain Complexity

**Finding:** The oligopeptide domain exhibits extreme multidimensionality that creates significant information architecture challenges.

**Evidence:**

- 6+ classification axes (length, function, source, structure, application, educational level)
- 20 standard amino acids × modification combinations yield combinatorial structural diversity
- Multiple synthesis pathways (ribosomal, NRPS, chemical SPPS, recombinant, hybrid)
- Complex receptor pharmacology (GPCRs, ionotropic, enzyme-linked) with multiple signal transduction cascades
- Rapidly expanding therapeutic market ($12.8B projected by 2030) with active clinical pipelines
- Cross-disciplinary dependencies spanning biochemistry, pharmacology, computational biology, clinical medicine

**Implication:** Information architecture must support multi-axis faceted navigation with prominent search. Content templates must enforce structural consistency across the vast dimensional space. Progressive disclosure is essential to prevent information overload.

### 3.2 Audience Segmentation

**Finding:** Four distinct primary audience segments with fundamentally different needs, behaviors, and content preferences require careful platform targeting.

| Segment              | Primary Platform   | Key Need                             | Content Preference                          |
| -------------------- | ------------------ | ------------------------------------ | ------------------------------------------- |
| Academic researchers | encyclopeptide.com | Precise quantitative data, citations | Data tables, DOI references, export formats |
| Students (UG/Grad)   | wikipept.com       | Concept understanding, exam prep     | Progressive depth, quizzes, flashcards      |
| Bioinformaticians    | encyclopeptide.com | Structured data, API access          | RESTful API, bulk download, schema docs     |
| General public       | wikipept.com       | Accessible explanations, reliability | Jargon-free language, visual explanations   |

**Implication:** Each site's UX, content model, and feature set must be optimized for its primary audience. Cross-linking between sites enables secondary audience access without compromising primary experience.

### 3.3 Content Strategy

**Finding:** The content strategy distinction between sites is well-defined and mutually reinforcing.

**encyclopeptide.com content model:**

- Tone: Formal, academic, authoritative
- Voice: Third-person, passive constructions common
- Update frequency: Periodic (quarterly/annual major updates)
- Structural format: Monographs, data tables, structured profiles
- Visual style: Minimal, data-dense, precise (Dark Navy #1B2A4A, Gold #C9A84C)

**wikipept.com content model:**

- Tone: Conversational, supportive, community-oriented
- Voice: Second-person active, encouraging
- Update frequency: Continuous (real-time community edits)
- Structural format: Tutorials, study guides, wikis, quizzes, flashcards
- Visual style: Rich, illustrative, approachable (Teal #0097A7, Coral #FF6F61)

**Implication:** Content templates, editorial workflows, and quality assurance processes must be independently optimized for each site's content model while sharing the canonical data layer.

### 3.4 Technical Constraints

**Finding:** Performance, accessibility, and security requirements are stringent and interdependent.

**Performance targets:**

- FCP <1.5s, LCP <2.5s, CLS <0.1, FID <100ms (Core Web Vitals)
- 3D molecular viewer: initial load <2s, 60fps rotation/zoom, <500MB memory
- Search response: <200ms simple, <500ms complex filtered
- Total initial page weight: <500KB

**Accessibility:** WCAG 2.1 Level AA mandatory (contrast ratios, keyboard access, semantic HTML, alt text for molecular visualizations). Level AAA aspirational.

**Security:** HTTPS enforced, CSP headers, API rate limiting, input validation, CSRF protection, bcrypt/argon2 password hashing, OAuth 2.0/OIDC integration.

**Implication:** Astro + SolidJS + Cloudflare stack is well-suited for these constraints (see Section 5). Performance budgets must be enforced at build time. Accessibility audits must be integrated into CI/CD.

### 3.5 Multi-lingual Complexity

**Finding:** Multi-lingual support introduces significant technical and editorial complexity, particularly for scientific nomenclature.

**Key challenges:**

- IUPAC nomenclature, amino acid codes, chemical formulas, gene symbols must remain in English/IUPAC standard regardless of display language
- Chinese (Simplified) requires ICP filing, data localization, and Great Firewall compatibility
- Russian requires data localization per federal law
- EU languages require GDPR compliance and European Accessibility Act conformance
- Translation workflow requires professional translation + domain expert review + community validation pipeline

**Implication:** i18n architecture must be established at project inception, not retrofitted. URL structure (`/en/`, `/zh/`, `/ru/`, `/de/`, `/fr/`, `/jp/`) must be defined before content creation begins. Glossary management system (500+ terms) must precede translation work.

---

## 4. Standards Mapping Summary

The following standards are most critical to the Wikisites project, listed in order of implementation priority:

| #   | Standard                                                                 | Scope                      | Priority | Relevance                                                                                                                                                                                                                             |
| --- | ------------------------------------------------------------------------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **WCAG 2.1 Level AA**                                                    | Accessibility              | P0       | Mandatory legal compliance; ensures inclusive access for researchers and students with disabilities. Covers contrast ratios, keyboard navigation, screen reader compatibility, and molecular viewer accessibility alternatives.       |
| 2   | **Schema.org ScholarlyArticle / LearningResource**                       | Structured data            | P0       | Required for SEO, academic indexing, and machine-readable content. `ScholarlyArticle` for encyclopeptide.com monographs; `LearningResource` for wikipept.com study guides. Enables Google Scholar and educational search integration. |
| 3   | **IUPAC-IUB Nomenclature Standards**                                     | Scientific notation        | P0       | Non-negotiable for scientific accuracy. Governs amino acid abbreviations (3-letter/1-letter codes), peptide sequence notation (N→C convention), modification notation, and stereochemistry designations. Cross-lingual invariant.     |
| 4   | **Core Web Vitals (LCP <2.5s, CLS <0.1, FID <100ms)**                    | Performance                | P0       | Google ranking signal and user experience baseline. Critical for mobile-first educational access. 3D molecular viewer performance budgets must be defined per-page.                                                                   |
| 5   | **GDPR (EU) + CCPA (California)**                                        | Data privacy               | P0       | Governs user account data, learning progress tracking, community contributions, analytics. Requires consent management, data export, deletion rights, privacy-by-design architecture.                                                 |
| 6   | **FAIR Data Principles** (Findable, Accessible, Interoperable, Reusable) | Data management            | P1       | Guides structured data design, API documentation, metadata standards, and citation practices. Ensures peptide data is discoverable and reusable by the bioinformatics community.                                                      |
| 7   | **ISO 8601 / Unicode CLDR**                                              | Date/time and localization | P1       | Required for multi-lingual date formatting, timezone handling, and locale-aware number formatting across 6 languages. Foundation for translation memory and content synchronization.                                                  |
| 8   | **Content Security Policy (CSP) Level 3**                                | Security                   | P1       | Protects against XSS, code injection, and data exfiltration. Critical given 3D viewer WebGL contexts, community-editable content, and external API integrations.                                                                      |
| 9   | **RFC 7519 (JWT) / OAuth 2.0**                                           | Authentication             | P1       | Governs user authentication for wikipept.com community features. JWT for session management; OAuth 2.0 for potential SSO with institutional identity providers.                                                                       |
| 10  | **OpenAPI Specification 3.1**                                            | API documentation          | P2       | Structured API documentation for programmatic data access (encyclopeptide.com). Enables auto-generated client libraries, interactive API explorer, and integration testing.                                                           |

---

## 5. Capability Assessment

### 5.1 Stack Selection: Astro + SolidJS + Cloudflare

**Selected Stack:**

- **Framework:** Astro (static site generation with islands architecture)
- **UI Runtime:** SolidJS (reactive UI components via Astro islands)
- **Hosting/CDN:** Cloudflare Pages + Workers + KV + D1

### 5.2 Justification Analysis

#### 5.2.1 Astro

| Capability            | Assessment | Rationale                                                                                                                                                                   |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static generation     | Excellent  | Monographs and study guides are primarily static content. Astro generates optimized static HTML at build time, minimizing TTFB and maximizing CDN cacheability.             |
| Islands architecture  | Excellent  | Enables selective hydration — 3D molecular viewer, quiz engine, and flashcard components load as interactive islands without impacting initial page load of static content. |
| Content collections   | Excellent  | Native support for MDX/markdown content with schema validation. Ideal for monograph and study guide templating. Built-in type safety for frontmatter.                       |
| Multi-lingual routing | Good       | File-based routing with `[lang]` parameter supports `/en/`, `/zh/`, etc. Static generation per language at build time.                                                      |
| Performance           | Excellent  | Zero-JS by default for static pages. Automatic code-splitting. Built-in image optimization. Aligns with <500KB initial page weight target.                                  |
| SEO                   | Excellent  | Server-rendered HTML ensures full content indexability. Structured data (Schema.org) easily embedded in layouts.                                                            |
| Ecosystem             | Good       | Growing plugin ecosystem. SolidJS integration via `@astrojs/solid-js`. Cloudflare adapter available.                                                                        |

#### 5.2.2 SolidJS

| Capability       | Assessment | Rationale                                                                                                                                                |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reactivity model | Excellent  | Fine-grained reactivity without virtual DOM overhead. Ideal for quiz engine state, flashcard flipping, progress tracking, and molecular viewer controls. |
| Bundle size      | Excellent  | ~7KB runtime (vs. ~45KB React). Critical for mobile performance and <500KB page weight budget.                                                           |
| Performance      | Excellent  | Compiled to vanilla DOM operations. No reconciliation overhead. 60fps molecular viewer rotation achievable.                                              |
| TypeScript       | Excellent  | First-class TypeScript support. Strong typing for peptide data models, quiz state, and API responses.                                                    |
| Learning curve   | Good       | JSX syntax familiar to React developers. Reactivity primitives (createSignal, createEffect) are intuitive. Smaller API surface than React.               |
| Ecosystem        | Moderate   | Smaller ecosystem than React. Fewer pre-built component libraries. May require custom implementations for complex UI patterns.                           |

#### 5.2.3 Cloudflare

| Capability             | Assessment | Rationale                                                                                                                                   |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages (static hosting) | Excellent  | Global edge distribution. Automatic preview deploys. Git integration. Unlimited bandwidth.                                                  |
| Workers (serverless)   | Excellent  | API endpoints for quiz submission, progress sync, community editing, search queries. V8 isolates for low-latency edge computation.          |
| KV (key-value store)   | Good       | Session storage, user preferences, cached search results, translation memory cache. Eventually consistent, suitable for non-critical reads. |
| D1 (SQLite database)   | Good       | Relational data for user accounts, learning progress, community contributions, content metadata. SQLite semantics familiar to developers.   |
| R2 (object storage)    | Excellent  | Molecular structure files (PDB, SDF), user-uploaded content, backup storage. S3-compatible API. No egress fees.                             |
| CDN / caching          | Excellent  | Global edge network. Configurable cache rules per content type. APO for dynamic content caching.                                            |
| Security               | Excellent  | DDoS protection, WAF, Bot Management. Free SSL/TLS. Custom domains with automatic certificate provisioning.                                 |

### 5.3 Stack Risk Assessment

| Risk                            | Likelihood | Impact | Mitigation                                                                                                                              |
| ------------------------------- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| SolidJS ecosystem gaps          | Medium     | Medium | Identify required components early; build custom components for quiz/flashcard if needed; evaluate Preact as fallback.                  |
| D1 maturity                     | Low        | Medium | D1 is production-ready (GA). SQLite semantics limit horizontal scaling but are sufficient for Year 1–3 traffic projections.             |
| Cloudflare vendor lock-in       | Low        | Low    | Astro generates standard static output. Workers use standard Web APIs. Migration path exists to Vercel/Netlify + any serverless.        |
| 3D viewer on Cloudflare Workers | Low        | Medium | 3D viewer is client-side (WebGL). Workers serve static assets and API endpoints only. No server-side rendering of molecular structures. |

### 5.4 Capability Matrix

| Capability                | Requirement | Astro       | SolidJS | Cloudflare       | Status   |
| ------------------------- | ----------- | ----------- | ------- | ---------------- | -------- |
| Static site generation    | Core        | ✓           | —       | ✓                | Met      |
| Selective hydration       | Core        | ✓ (Islands) | ✓       | —                | Met      |
| Interactive UI components | Core        | —           | ✓       | —                | Met      |
| Content collections (MDX) | Core        | ✓           | —       | —                | Met      |
| Multi-lingual routing     | Core        | ✓           | —       | —                | Met      |
| API endpoints             | Core        | —           | —       | ✓ (Workers)      | Met      |
| Relational database       | Core        | —           | —       | ✓ (D1)           | Met      |
| Key-value cache           | Core        | —           | —       | ✓ (KV)           | Met      |
| Object storage            | Core        | —           | —       | ✓ (R2)           | Met      |
| Global CDN                | Core        | —           | —       | ✓                | Met      |
| 3D molecular viewer       | Feature     | ✓ (Islands) | ✓       | —                | Planned  |
| Quiz/flashcard engine     | Feature     | —           | ✓       | ✓ (D1)           | Planned  |
| Spaced repetition (FSRS)  | Feature     | —           | ✓       | ✓ (D1)           | Planned  |
| Community editing         | Feature     | —           | ✓       | ✓ (Workers + D1) | Planned  |
| Search (Meilisearch)      | Feature     | —           | —       | ✓ (Workers)      | Planned  |
| Real-time collaboration   | Feature     | —           | —       | —                | Deferred |

---

## 6. Multi-lingual Strategy

### 6.1 Language Prioritization

| Language             | Code  | Priority | Coverage Target     | Key Markets                                 | Special Considerations                                                                   |
| -------------------- | ----- | -------- | ------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| English              | EN    | Primary  | 100%                | Global                                      | Canonical source language; all content authored in English first                         |
| Chinese (Simplified) | ZH-CN | High     | 80% of core content | Mainland China, Singapore, Taiwan           | ICP filing required; data localization; Great Firewall compatibility; CJK typography     |
| Russian              | RU    | High     | 60% of core content | Russia, CIS countries                       | Federal data localization law; Cyrillic typography; transliteration standards            |
| German               | DE    | Medium   | 60% of core content | Germany, Austria, Switzerland               | GDPR compliance; compound word handling in UI; formal/informal register                  |
| French               | FR    | Medium   | 60% of core content | France, Canada, Belgium, Francophone Africa | Quebec Bill 96 compliance; accented character handling; formal register                  |
| Japanese             | JP    | Medium   | 60% of core content | Japan                                       | APPI compliance; CJK typography; vertical text support consideration; honorific register |

### 6.2 Content Localization Rules

**Invariant elements (remain in English/IUPAC regardless of display language):**

- IUPAC nomenclature
- Amino acid 3-letter and 1-letter codes
- Chemical formulas (H₂O, not localized)
- Gene and protein symbols (HGNC/UniProt)
- SI units (nm, Da, M, etc.)
- Peptide sequences (N→C, single-letter code)
- Database identifiers (UniProt, PDB, ChEMBL, etc.)

**Localized elements:**

- Page titles, meta descriptions, navigation labels
- Explanatory prose and descriptions
- Common names (where established localized versions exist, e.g., 谷胱甘肽 for glutathione)
- UI labels, buttons, form elements
- Error messages, help text
- Date/time and number formatting (locale-appropriate)
- Medical/health disclaimers (required in local language)

### 6.3 URL Structure

```
encyclopeptide.com/
├── /en/angiotensin-ii          (English — default, also accessible as /angiotensin-ii)
├── /zh/angiotensin-ii          (Chinese Simplified)
├── /ru/angiotensin-ii          (Russian)
├── /de/angiotensin-ii          (German)
├── /fr/angiotensin-ii          (French)
└── /jp/angiotensin-ii          (Japanese)

wikipept.com/
├── /en/peptide-bonds           (English — default)
├── /zh/peptide-bonds           (Chinese Simplified)
├── /ru/peptide-bonds           (Russian)
├── /de/peptide-bonds           (German)
├── /fr/peptide-bonds           (French)
└── /jp/peptide-bonds           (Japanese)
```

### 6.4 Translation Workflow

1. **Content freeze** — English source marked "ready for translation"; translation memory updated; glossary terms verified
2. **Translation** — Professional translators with biochemistry/pharmacology domain expertise; machine translation post-editing (MTPE) for volume efficiency
3. **Review** — Bilingual review by second translator; technical accuracy review by domain expert; terminology consistency check
4. **Integration** — Translated content integrated into CMS; automated quality checks (broken links, encoding, formatting); preview and QA
5. **Publication** — Staggered release per language; post-publication quality spot-check

### 6.5 Glossary Management

- Master glossary maintained as structured data (JSON/YAML) with 500+ core terms
- Version-controlled with translation memory tools (PO files, TMX)
- Approved by domain experts and professional translators
- Community suggestions accepted via pull request with expert review
- Consistency checks run automatically on all translated content
- Glossary updates propagated to all translations

---

## 7. Risk Register Summary

### Top 5 Risks with Mitigations

| #   | Risk                                           | Category    | Likelihood | Impact | Overall  | Mitigation Strategy                                                                                                                                                                                                                                                                                                                                                                   |
| --- | ---------------------------------------------- | ----------- | ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Scientific accuracy and currency**           | Content     | High       | High   | CRITICAL | Mandatory citation requirements for all quantitative claims. Annual content review cycle. Community error reporting mechanism. Expert reviewer network. Prominent "last reviewed" dates. Version control with audit trail. Clear disclaimer: reference resource, not clinical guidance. Rapid correction protocol with errata publication.                                            |
| 2   | **Community content quality (wikipept.com)**   | Content     | High       | High   | CRITICAL | Reputation-weighted trust system (experienced contributors have higher edit priority). Expert review queue for high-traffic pages. Automated quality checks (citation requirements, formatting). Community moderation tools (flag, vote, revert). "Pending changes" review for new contributors.定期 expert review. Clear community guidelines. Escalation path for disputed content. |
| 3   | **3D molecular viewer integration**            | Technical   | High       | Medium | HIGH     | Progressive enhancement: 2D fallback for all 3D content. Lazy loading for viewer initialization. Structure simplification for mobile. Cross-browser testing matrix (Chrome, Firefox, Safari, Edge, mobile). Accessibility audit specific to viewer. Performance budget enforcement per page.                                                                                          |
| 4   | **Data backup and disaster recovery**          | Operational | Medium     | High   | HIGH     | Automated daily backups with off-site storage. Database point-in-time recovery. Annual DR drill. RTO: 4 hours. RPO: 1 hour. User-facing backup/export functionality. Redundant infrastructure across availability zones.                                                                                                                                                              |
| 5   | **Mobile performance of interactive features** | Technical   | Medium     | Medium | MEDIUM   | Offline-first architecture for learning features. Local-first data storage with periodic sync. Lightweight quiz engine optimized for mobile. Service worker for offline access. Battery-aware sync scheduling.                                                                                                                                                                        |

### Risk Distribution Summary

| Severity | Count | Risks                                                                                               |
| -------- | ----- | --------------------------------------------------------------------------------------------------- |
| CRITICAL | 2     | Scientific accuracy, Community content quality                                                      |
| HIGH     | 2     | 3D viewer integration, Backup/recovery                                                              |
| MEDIUM   | 5     | Search at scale, Mobile performance, IP/licensing, Info architecture, Traffic scaling, Supply chain |
| LOW      | 2     | Data sync, Feature learning curve                                                                   |

---

## 8. Recommended Next Steps for Phase 0

### 8.1 Phase 0 (Requirements Engineering) Scope

Phase 0 will translate context discovery findings into formal, testable requirements. The following work packages are recommended:

#### WP-0.1: Functional Requirements Specification

1. **Content model formalization** — Define complete schema for oligopeptide monographs (encyclopeptide.com) and study guides (wikipept.com) with all required fields, validation rules, and cross-reference constraints
2. **Search requirements** — Specify search functionality (full-text, faceted, structure-based, cross-language) with query syntax, result ranking, and performance targets
3. **Quiz/flashcard engine** — Define quiz question types, scoring algorithms, spaced repetition parameters (FSRS), progress tracking metrics, and offline sync requirements
4. **Community editing system** — Specify edit workflow (create, revise, review, approve), version control model, conflict resolution, reputation system, and moderation tools
5. **3D molecular viewer** — Define integration requirements (Mol\* vs. NGL vs. 3Dmol.js), lazy loading strategy, 2D fallback specifications, and accessibility alternatives
6. **API specification** — Define RESTful API endpoints, authentication, rate limiting, response formats, and OpenAPI documentation requirements
7. **Multi-lingual content management** — Define translation workflow, glossary management, content synchronization, and localization quality checks

#### WP-0.2: Non-Functional Requirements

1. **Performance budgets** — Page-level performance budgets (FCP, LCP, CLS, TTI, page weight) with automated enforcement in CI/CD
2. **Accessibility requirements** — WCAG 2.1 Level AA compliance checklist with molecular viewer-specific accessibility requirements
3. **Security requirements** — Threat model, authentication/authorization flows, data protection measures, and security testing strategy
4. **Scalability requirements** — Traffic projections, infrastructure sizing, caching strategy, and database scaling plan
5. **Reliability requirements** — SLA targets, backup/DR procedures, monitoring/alerting strategy

#### WP-0.3: Data Architecture

1. **Canonical data model** — Unified peptide data schema shared between sites with site-specific extensions
2. **Database schema** — D1 table definitions for users, content, community contributions, learning progress, and translations
3. **API data contracts** — Request/response schemas for all API endpoints
4. **Data sourcing strategy** — Integration plan for UniProt, PDB, ChEMBL, PubChem, and other reference databases

#### WP-0.4: Information Architecture

1. **Site map** — Complete page hierarchy for both sites with navigation model
2. **URL scheme** — Final URL structure with language routing, redirect rules, and canonical URL strategy
3. **Navigation model** — Multi-axis faceted navigation for encyclopeptide.com; learning pathway navigation for wikipept.com
4. **Content taxonomy** — Controlled vocabulary for tagging, categorizing, and cross-linking content

#### WP-0.5: Design System Specification

1. **Component library** — SolidJS component specifications for both sites' design systems
2. **Responsive breakpoints** — Mobile-first breakpoint strategy with content priority per viewport
3. **Dark mode** — Dark mode specification (optional, deferred unless requested)
4. **Iconography** — Icon set selection and custom icon requirements

### 8.2 Dependencies and Prerequisites

| Prerequisite                                           | Status   | Required For   |
| ------------------------------------------------------ | -------- | -------------- |
| Domain analysis (DOM-ANALYSIS-001)                     | Approved | All WP-0.x     |
| Phase -1 report (this document)                        | Final    | All WP-0.x     |
| Technology stack validation (spike)                    | Pending  | WP-0.1, WP-0.2 |
| Content sample creation (5 monographs, 5 study guides) | Pending  | WP-0.1, WP-0.4 |
| Accessibility audit of prototype                       | Pending  | WP-0.2         |
| Security threat modeling                               | Pending  | WP-0.2         |

### 8.3 Estimated Effort

| Work Package                        | Estimated Effort | Dependencies    |
| ----------------------------------- | ---------------- | --------------- |
| WP-0.1: Functional Requirements     | 3–4 weeks        | Domain analysis |
| WP-0.2: Non-Functional Requirements | 2–3 weeks        | Domain analysis |
| WP-0.3: Data Architecture           | 2–3 weeks        | WP-0.1          |
| WP-0.4: Information Architecture    | 2–3 weeks        | WP-0.1          |
| WP-0.5: Design System Specification | 2–3 weeks        | WP-0.1          |
| **Total Phase 0**                   | **10–14 weeks**  | —               |

---

## 9. Quality Gate Status

### Phase -1 Quality Gates

| Gate ID      | Gate Description                   | Criteria                                                                                                            | Status   | Evidence                                                                                                                                                                           |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **QG--1.1**  | Domain scope defined               | In-scope and out-of-scope molecular classes, content types, technical features, and audiences explicitly enumerated | **PASS** | Domain analysis §2.1–2.2: 6 in-scope categories with detailed subcategories; 4 out-of-scope categories with rationale                                                              |
| **QG--1.2**  | Audience segments identified       | Primary audience profiles with behavioral patterns, content preferences, and pain points documented                 | **PASS** | Domain analysis §4: 4 primary segments (academic researchers, students, bioinformaticians, general public) with full profiles                                                      |
| **QG--1.3**  | Content strategy differentiated    | Distinct content models, editorial workflows, and visual identities defined for each site                           | **PASS** | Domain analysis §5: Content type comparison matrix, visual identity specifications (color palettes, typography, layout principles, component design) for both sites                |
| **QG--1.4**  | Technical constraints documented   | Performance, accessibility, security, scalability, and integration requirements specified with measurable targets   | **PASS** | Domain analysis §6: WCAG 2.1 AA compliance, Core Web Vitals targets, security requirements, traffic projections, API rate limits                                                   |
| **QG--1.5**  | Multi-lingual requirements defined | Language priorities, localization rules, URL structure, translation workflow, and glossary management specified     | **PASS** | Domain analysis §8: 6 languages with priority levels, invariant/localized element rules, URL scheme, professional + community translation pipeline, 500+ term glossary requirement |
| **QG--1.6**  | Risk register established          | Top risks identified with likelihood, impact, mitigation strategies, and residual risk assessment                   | **PASS** | Domain analysis §7: 12 risks across 4 categories (technical, content, UX, operational) with full risk matrix                                                                       |
| **QG--1.7**  | Technology stack justified         | Stack selection rationale with capability mapping to requirements                                                   | **PASS** | This report §5: Astro + SolidJS + Cloudflare capability matrix with justification and risk assessment                                                                              |
| **QG--1.8**  | Phase 0 roadmap defined            | Phase 0 work packages, dependencies, prerequisites, and effort estimates documented                                 | **PASS** | This report §8: 5 work packages with dependencies, prerequisites, and 10–14 week total estimate                                                                                    |
| **QG--1.9**  | Domain analysis approved           | Domain analysis document reviewed and approved by stakeholders                                                      | **PASS** | DOM-ANALYSIS-001 status: Approved (2026-06-07)                                                                                                                                     |
| **QG--1.10** | VERSION.md initialized             | Project state ledger initialized with current phase, version, and site status                                       | **PASS** | VERSION.md: Phase -1, Version 0.1.0, Status In Progress                                                                                                                            |

### Gate Summary

| Status   | Count |
| -------- | ----- |
| **PASS** | 10    |
| PENDING  | 0     |
| FAIL     | 0     |

**Phase -1 Quality Gate Verdict: ALL GATES PASSED — Ready to proceed to Phase 0**

---

**End of Phase -1 Context Discovery Report**

_This document is version-controlled. Changes require review by the project lead. Next scheduled review: upon completion of Phase 0._
