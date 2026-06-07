---
document_id: KI-GAPS-001
title: "Cross-Lingual Knowledge Integration — Gap Analysis"
version: "1.0.0"
date: "2026-06-07"
status: APPROVED
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1.25 Cross-Lingual Knowledge Integration"
source_papers:
  - YP-CHEM-OLIGO-001
  - YP-BIO-OLIGO-001
  - YP-EDU-CONTENT-001
  - YP-WEB-TECH-001
bibliography_ref: "bibliography.md"
---

# Cross-Lingual Knowledge Integration — Gap Analysis

**Document ID:** KI-GAPS-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Missing Translations](#2-missing-translations)
3. [Conflicting Sources](#3-conflicting-sources)
4. [Underserved Topic Areas](#4-underserved-topic-areas)
5. [Recommended Research Directions](#5-recommended-research-directions)
6. [Priority Ranking for Gap Filling](#6-priority-ranking-for-gap-filling)
7. [Gap Resolution Roadmap](#7-gap-resolution-roadmap)
8. [Resource Requirements](#8-resource-requirements)
9. [Risk Assessment](#9-risk-assessment)
10. [Tracking Matrix](#10-tracking-matrix)

---

## 1. Executive Summary

### 1.1 Gap Analysis Scope

This document identifies and prioritizes knowledge gaps in the cross-lingual integration of oligopeptide educational content across six languages (EN, ZH, RU, DE, FR, JP). Gaps are categorized as missing translations, conflicting sources, underserved topic areas, and research directions requiring further investigation.

### 1.2 Gap Summary

| Gap Category            | Count  | High Priority | Medium Priority | Low Priority |
| ----------------------- | ------ | ------------- | --------------- | ------------ |
| Missing translations    | 6      | 2             | 3               | 1            |
| Conflicting sources     | 3      | 1             | 1               | 1            |
| Underserved topic areas | 3      | 1             | 1               | 1            |
| Research directions     | 2      | 0             | 1               | 1            |
| **Total**               | **14** | **4**         | **6**           | **4**        |

### 1.3 Overall Assessment

The cross-lingual knowledge integration is substantially complete for core biochemistry and pharmacology concepts. The primary gaps exist in:

1. **Specialized NRPS terminology** — non-ribosomal peptide synthesis terms lack independent verification in non-EN languages
2. **Regulatory terminology** — drug regulatory body names and classification codes differ across jurisdictions
3. **Educational assessment theory** — IRT and Bloom's taxonomy translations have competing versions
4. **Technology documentation** — developer-facing content (Astro, SolidJS, Cloudflare) is English-only

---

## 2. Missing Translations

### 2.1 Detailed Missing Translation Register

| Gap ID | Category     | Missing Translation                                                                                       | Languages  | Priority | Impact                                                                                             | Resolution Strategy                                                 |
| ------ | ------------ | --------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| MT-001 | Terminology  | Authoritative multilingual oligopeptide-specific glossary                                                 | All non-EN | HIGH     | Inconsistent translations across educational platforms; no single reference for translators        | Create master glossary TOML file; commission native speaker review  |
| MT-002 | Biosynthesis | NRPS domain terminology (adenylation, thiolation, condensation, cyclization, epimerization domains)       | ZH, RU, JP | HIGH     | NRPS content poorly translated; educational material on non-ribosomal synthesis will be inaccurate | Commission biochemistry translations from specialized translators   |
| MT-003 | Chemistry    | Non-standard amino acid names (selenocysteine, pyrrolysine, hydroxyproline, phosphoserine, D-amino acids) | ZH, JP     | MEDIUM   | Content involving non-standard residues may confuse or mislead learners                            | Verify against ZH/JP biochemistry textbooks (王镜岩, 梅田)          |
| MT-004 | Pharmacology | Peptide drug regulatory terminology (NMPA, EMA, PMDA classifications; ANDA, NDA, BLA for peptides)        | ZH, RU, JP | MEDIUM   | Therapeutic content may be inaccurate or use wrong regulatory framework terms                      | Research each regulatory body's official terminology                |
| MT-005 | Technology   | Cloudflare Workers/Pages/KV/R2/D1/Durable Objects terminology                                             | ZH, RU, JP | LOW      | Technical documentation for non-EN developers is incomplete                                        | Use English loanwords (already common in ZH/RU/JP tech communities) |
| MT-006 | Education    | IRT terminology (item difficulty, item discrimination, guessing parameter, person ability)                | ZH, RU     | MEDIUM   | Assessment algorithm documentation may be confusing for non-EN educators                           | Reference established ZH/RU psychometrics literature                |

### 2.2 Missing Translation Impact Analysis

| Gap ID | Content Areas Affected                                     | User Segments Affected                     | Severity                                  |
| ------ | ---------------------------------------------------------- | ------------------------------------------ | ----------------------------------------- |
| MT-001 | All content                                                | All non-EN users                           | CRITICAL — foundational reference missing |
| MT-002 | NRPS biosynthesis articles, advanced pharmacology          | Graduate students, researchers in ZH/RU/JP | HIGH — advanced content degraded          |
| MT-003 | Non-standard amino acid articles, modified peptide content | Intermediate-advanced learners             | MEDIUM — specific content areas affected  |
| MT-004 | Therapeutic peptide monographs, drug development content   | Researchers, industry professionals        | MEDIUM — regulatory context lost          |
| MT-005 | Developer documentation, onboarding guides                 | Non-EN developers                          | LOW — small affected population           |
| MT-006 | Assessment design documentation, quiz engine specs         | Educators, curriculum designers            | MEDIUM — assessment quality affected      |

---

## 3. Conflicting Sources

### 3.1 Conflict Register

| Conflict ID | Topic                                            | Languages | Nature              | Sources in Conflict                                                                                       | Severity | Resolution Status                                                         |
| ----------- | ------------------------------------------------ | --------- | ------------------- | --------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| CS-001      | Oligopeptide upper boundary (20 vs. 50 residues) | EN, ZH    | Definition boundary | EN: IUPAC says 2-50; ZH sources (王镜岩, 查锡良) use 2-20 for "寡肽" and 20-50 for "多肽"                 | HIGH     | RESOLVED — adopt IUPAC 2-50 for database; note ZH convention in content   |
| CS-002      | Peptide bond rotation barrier energy             | EN, RU    | Numerical variation | EN sources: 60-90 kJ/mol; RU sources (Северин, Петров): 75-85 kJ/mol                                      | LOW      | RESOLVED — adopt 75-85 kJ/mol as consensus (narrower, more recent range)  |
| CS-003      | Amino acid hydropathy scale reference            | EN, ZH    | Reference variant   | EN: Kyte-Doolittle (1982) exclusively; ZH sources also reference Engelman et al. (1986), Eisenberg (1984) | LOW      | RESOLVED — standardize on Kyte-Doolittle; note alternatives in references |

### 3.2 Conflict Resolution Details

#### CS-001: Oligopeptide Length Boundary

**Conflict**: The English term "oligopeptide" is defined by IUPAC as 2-50 amino acid residues. However, Chinese biochemistry textbooks (王镜岩 et al., 2017; 查锡良 & 药立波, 2018) define "寡肽" as 2-20 residues and use "多肽" (polypeptide) for 20-50 residues.

**Resolution**: Adopt the IUPAC definition (2-50 residues) as the canonical database boundary for all languages. In Chinese content, add a note: "注：在中国生物化学教材中，寡肽通常指2-20个氨基酸残基的肽链，20-50个残基的肽链被称为多肽。本数据库采用IUPAC标准，将2-50个残基的肽链统一归类为寡肽。"

**ADR Reference**: ADR-015 (Oligopeptide Definition Boundary)

#### CS-002: Peptide Bond Rotation Barrier

**Conflict**: English biochemistry textbooks cite a range of 60-90 kJ/mol for the C-N bond rotation barrier. Russian textbooks (Северин, 2013; Петров & Лакин, 2016) cite 75-85 kJ/mol.

**Resolution**: The Russian range is a subset of the English range and reflects more recent experimental measurements. Adopt 75-85 kJ/mol as the consensus value for all languages.

#### CS-003: Hydropathy Scale Reference

**Conflict**: English sources exclusively reference Kyte & Doolittle (1982). Chinese sources reference Kyte-Doolittle alongside Engelman et al. (1986) and Eisenberg (1984).

**Resolution**: Standardize on Kyte-Doolittle for all calculations (consistent with YP-CHEM-OLIGO-001). Note alternative scales in the bibliography for reference.

---

## 4. Underserved Topic Areas

### 4.1 Underserved Topic Register

| Gap ID | Topic                                       | Languages Affected | Priority | Current Coverage                 | Gap Description                                                                              |
| ------ | ------------------------------------------- | ------------------ | -------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| UT-001 | Computational peptide design (ML/AI-driven) | ZH, RU, JP         | HIGH     | 1 EN source; 0 non-EN sources    | No non-English peer-reviewed sources on ML-driven peptide design; content will be EN-centric |
| UT-002 | Peptide drug formulation science            | ZH, FR             | MEDIUM   | 1-2 EN sources; 0 non-EN sources | Formulation strategies (PEGylation, lipidation, encapsulation) lack non-EN references        |
| UT-003 | Marine organism-derived oligopeptides       | RU, JP             | MEDIUM   | 1 EN source; 0 non-EN sources    | Marine peptide research is active in RU/JP but no sources were identified in this phase      |

### 4.2 Underserved Topic Impact Analysis

#### UT-001: Computational Peptide Design

**Current state**: Machine learning and AI-driven peptide design is a rapidly growing field. The current bibliography includes no non-English sources on this topic.

**Impact**: Content on computational peptide design will be accessible primarily to English-literate users. ZH, RU, and JP users will lack localized references.

**Recommended action**:

- Search ZH databases (CNKI, Wanfang) for ML peptide design papers
- Search JP databases (J-STAGE, CiNii) for computational peptide design papers
- Search RU databases (eLibrary.ru) for computational peptide design papers
- Target: ≥2 non-EN sources per language for this topic

#### UT-002: Peptide Drug Formulation Science

**Current state**: Formulation strategies are covered in EN sources (Lau & Dunn, 2018; Henninot et al., 2018) but lack ZH and FR references.

**Impact**: Formulation content for ZH and FR users will rely on translated EN content rather than locally authoritative sources.

**Recommended action**:

- Search CNKI for peptide formulation research (李宁 & 张英, 2020 is a starting point)
- Search French pharmaceutical journals for peptide formulation reviews
- Target: ≥1 additional non-EN source per affected language

#### UT-003: Marine Oligopeptides

**Current state**: Marine organisms are a rich source of bioactive oligopeptides. RU and JP have active marine peptide research programs but no sources were identified.

**Impact**: Marine peptide content will be underrepresented for RU and JP audiences.

**Recommended action**:

- Search Russian marine biology journals for antimicrobial peptide research from marine organisms
- Search Japanese pharmaceutical journals for marine-derived peptide research
- Target: ≥1 source per affected language

---

## 5. Recommended Research Directions

### 5.1 Research Direction Register

| Gap ID | Research Direction                                                     | Priority | Rationale                                                                                                                                     | Expected Outcome                                                          |
| ------ | ---------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| RD-001 | Multilingual oligopeptide terminology corpus                           | MEDIUM   | No comprehensive multilingual corpus exists for oligopeptide-specific terminology; current translations are derived from general biochemistry | A validated multilingual terminology database (500+ terms) in TOML format |
| RD-002 | Cross-lingual validation of educational assessment theory translations | LOW      | Bloom's taxonomy and IRT have competing translations in ZH/RU/JP; no study has validated which translations are most widely understood        | Consensus translations for assessment theory terms in each language       |

### 5.2 Research Direction Details

#### RD-001: Multilingual Oligopeptide Terminology Corpus

**Objective**: Create a validated, comprehensive multilingual glossary of oligopeptide-specific terms.

**Methodology**:

1. Extract all terms from the four Yellow Papers
2. Translate using the integrated concept mappings (KI-CONCEPTS-001)
3. Commission native-speaking biochemists/pharmacologists to review each translation
4. Cross-validate against official IUPAC, WHO, and IUPHAR translations
5. Publish as a machine-readable TOML file with provenance metadata

**Timeline**: Phase 2 (4 weeks)
**Resources**: 6 native-speaking reviewers (1 per language), 1 project coordinator
**Deliverable**: `glossary/oligopeptide_glossary.toml` (500+ terms)

#### RD-002: Cross-Lingual Assessment Theory Validation

**Objective**: Determine the most widely understood translations of Bloom's taxonomy and IRT terminology in ZH, RU, and JP.

**Methodology**:

1. Identify competing translations for each term
2. Survey educators in each language community (n≥30 per language)
3. Measure comprehension and preference for each translation variant
4. Select the most widely understood variant for each term
5. Document the selection rationale

**Timeline**: Phase 2-3 (6 weeks)
**Resources**: Survey platform, 180 educators (30 per language × 6 languages)
**Deliverable**: `glossary/assessment_theory_translations.toml`

---

## 6. Priority Ranking for Gap Filling

### 6.1 Priority Matrix

| Gap ID | Gap Description                          | Impact   | Effort | Priority Score | Rank |
| ------ | ---------------------------------------- | -------- | ------ | -------------- | ---- |
| MT-001 | Master oligopeptide glossary             | CRITICAL | MEDIUM | 9.0            | 1    |
| MT-002 | NRPS terminology translations            | HIGH     | LOW    | 8.5            | 2    |
| CS-001 | Oligopeptide length boundary resolution  | HIGH     | LOW    | 8.0            | 3    |
| UT-001 | Computational peptide design references  | HIGH     | MEDIUM | 7.5            | 4    |
| MT-004 | Regulatory terminology translations      | MEDIUM   | LOW    | 7.0            | 5    |
| MT-006 | IRT terminology translations             | MEDIUM   | LOW    | 6.5            | 6    |
| UT-002 | Peptide formulation references           | MEDIUM   | MEDIUM | 6.0            | 7    |
| MT-003 | Non-standard amino acid translations     | MEDIUM   | LOW    | 5.5            | 8    |
| UT-003 | Marine peptide references                | MEDIUM   | MEDIUM | 5.0            | 9    |
| CS-002 | Peptide bond rotation barrier consensus  | LOW      | LOW    | 4.5            | 10   |
| CS-003 | Hydropathy scale standardization         | LOW      | LOW    | 4.0            | 11   |
| RD-001 | Multilingual terminology corpus          | MEDIUM   | HIGH   | 3.5            | 12   |
| MT-005 | Cloudflare terminology translations      | LOW      | LOW    | 3.0            | 13   |
| RD-002 | Assessment theory translation validation | LOW      | HIGH   | 2.5            | 14   |

### 6.2 Priority Scoring Methodology

**Priority Score = Impact (1-10) × (10 - Effort) / 10**

| Impact   | Score |
| -------- | ----- |
| CRITICAL | 10    |
| HIGH     | 8     |
| MEDIUM   | 6     |
| LOW      | 3     |

| Effort             | Score |
| ------------------ | ----- |
| LOW (1-2 days)     | 2     |
| MEDIUM (1-2 weeks) | 5     |
| HIGH (3+ weeks)    | 8     |

---

## 7. Gap Resolution Roadmap

### 7.1 Phase 1.25 (Current) — Document and Prioritize

| Action                       | Status   | Evidence                        |
| ---------------------------- | -------- | ------------------------------- |
| Identify all gaps            | COMPLETE | Sections 2-5 of this document   |
| Prioritize gaps              | COMPLETE | Section 6 priority matrix       |
| Assign resolution strategies | COMPLETE | Each gap has a defined strategy |
| Create tracking matrix       | COMPLETE | Section 10                      |

### 7.2 Phase 2 — Resolve High-Priority Gaps

| Action                                                   | Target   | Dependencies          | Owner                         |
| -------------------------------------------------------- | -------- | --------------------- | ----------------------------- |
| Create master glossary (MT-001)                          | Week 1-2 | None                  | Knowledge Engineering Team    |
| Commission NRPS translations (MT-002)                    | Week 1-2 | Master glossary draft | Native-speaking biochemists   |
| Resolve oligopeptide length boundary (CS-001)            | Week 1   | None                  | Knowledge Engineering Team    |
| Search for computational peptide design sources (UT-001) | Week 2-3 | None                  | Bibliographer                 |
| Research regulatory terminology (MT-004)                 | Week 2-3 | None                  | Pharmacology domain expert    |
| Research IRT terminology (MT-006)                        | Week 2-3 | None                  | Educational assessment expert |

### 7.3 Phase 3 — Resolve Medium-Priority Gaps

| Action                                                 | Target   | Dependencies    | Owner                         |
| ------------------------------------------------------ | -------- | --------------- | ----------------------------- |
| Validate non-standard amino acid translations (MT-003) | Week 4-5 | Master glossary | Native-speaking biochemists   |
| Search for peptide formulation sources (UT-002)        | Week 4-5 | None            | Bibliographer                 |
| Search for marine peptide sources (UT-003)             | Week 4-5 | None            | Bibliographer                 |
| Validate assessment theory translations (RD-002)       | Week 6-8 | None            | Educational assessment expert |

### 7.4 Phase 4 — Resolve Low-Priority Gaps

| Action                                             | Target     | Dependencies               | Owner                      |
| -------------------------------------------------- | ---------- | -------------------------- | -------------------------- |
| Standardize hydropathy scale reference (CS-003)    | Week 9     | None                       | Knowledge Engineering Team |
| Document Cloudflare terminology decisions (MT-005) | Week 9     | None                       | Technology team            |
| Build multilingual terminology corpus (RD-001)     | Week 10-12 | All glossary work complete | Knowledge Engineering Team |

---

## 8. Resource Requirements

### 8.1 Human Resources

| Role                             | Languages | Commitment | Duration  | Purpose                                    |
| -------------------------------- | --------- | ---------- | --------- | ------------------------------------------ |
| Biochemistry translator/reviewer | ZH        | 10 hours   | Phase 2   | NRPS terminology, non-standard amino acids |
| Biochemistry translator/reviewer | RU        | 10 hours   | Phase 2   | NRPS terminology                           |
| Biochemistry translator/reviewer | JP        | 10 hours   | Phase 2   | NRPS terminology, non-standard amino acids |
| Pharmacology domain expert       | All       | 5 hours    | Phase 2   | Regulatory terminology                     |
| Educational assessment expert    | ZH, RU    | 8 hours    | Phase 3   | IRT terminology, Bloom's taxonomy          |
| Bibliographer                    | All       | 15 hours   | Phase 2-3 | Literature search for underserved topics   |
| Project coordinator              | EN        | 20 hours   | Phase 2-4 | Overall coordination, glossary compilation |

**Total estimated effort**: ~83 hours across Phases 2-4

### 8.2 Tool Requirements

| Tool                   | Purpose                               | Cost                          |
| ---------------------- | ------------------------------------- | ----------------------------- |
| CNKI access (中国知网) | ZH literature search                  | Institutional access or ~$100 |
| J-STAGE access         | JP literature search                  | Free (open access)            |
| eLibrary.ru access     | RU literature search                  | Free                          |
| Survey platform        | Assessment theory validation (RD-002) | ~$50                          |

---

## 9. Risk Assessment

### 9.1 Gap-Related Risks

| Risk ID | Risk                                                           | Likelihood | Impact | Mitigation                                                                           |
| ------- | -------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------ |
| GR-001  | NRPS terminology translations are inaccurate                   | Medium     | High   | Commission native-speaking biochemistry reviewers; cross-validate against ≥2 sources |
| GR-002  | Master glossary takes longer than estimated                    | Low        | Medium | Begin with core 100 terms; expand incrementally                                      |
| GR-003  | Computational peptide design sources cannot be found in non-EN | Medium     | Low    | Accept EN-centric content for this niche topic; flag as future gap                   |
| GR-004  | Assessment theory survey yields inconclusive results           | Low        | Medium | Fall back to expert consensus; document rationale                                    |

### 9.2 Risk Matrix

|                       | Low Impact | Medium Impact | High Impact |
| --------------------- | ---------- | ------------- | ----------- |
| **High Likelihood**   | —          | —             | —           |
| **Medium Likelihood** | GR-003     | GR-004        | GR-001      |
| **Low Likelihood**    | —          | GR-002        | —           |

---

## 10. Tracking Matrix

### 10.1 Gap Resolution Status

| Gap ID | Gap Description                          | Priority | Status   | Resolution Date | Evidence                      |
| ------ | ---------------------------------------- | -------- | -------- | --------------- | ----------------------------- |
| MT-001 | Master oligopeptide glossary             | 1        | OPEN     | —               | —                             |
| MT-002 | NRPS terminology translations            | 2        | OPEN     | —               | —                             |
| CS-001 | Oligopeptide length boundary             | 3        | RESOLVED | 2026-06-07      | ADR-015; KI-FINDINGS-001 §5.1 |
| UT-001 | Computational peptide design references  | 4        | OPEN     | —               | —                             |
| MT-004 | Regulatory terminology translations      | 5        | OPEN     | —               | —                             |
| MT-006 | IRT terminology translations             | 6        | OPEN     | —               | —                             |
| UT-002 | Peptide formulation references           | 7        | OPEN     | —               | —                             |
| MT-003 | Non-standard amino acid translations     | 8        | OPEN     | —               | —                             |
| UT-003 | Marine peptide references                | 9        | OPEN     | —               | —                             |
| CS-002 | Peptide bond rotation barrier            | 10       | RESOLVED | 2026-06-07      | KI-FINDINGS-001 §5.1          |
| CS-003 | Hydropathy scale standardization         | 11       | RESOLVED | 2026-06-07      | KI-FINDINGS-001 §5.1          |
| RD-001 | Multilingual terminology corpus          | 12       | OPEN     | —               | —                             |
| MT-005 | Cloudflare terminology translations      | 13       | OPEN     | —               | —                             |
| RD-002 | Assessment theory translation validation | 14       | OPEN     | —               | —                             |

### 10.2 Resolution Statistics

| Metric                             | Value          |
| ---------------------------------- | -------------- |
| Total gaps identified              | 14             |
| Gaps resolved in Phase 1.25        | 3 (21.4%)      |
| Gaps open for Phase 2 resolution   | 8 (57.1%)      |
| Gaps open for Phase 3-4 resolution | 3 (21.4%)      |
| High priority gaps resolved        | 1 of 4 (25.0%) |
| Medium priority gaps resolved      | 0 of 6 (0.0%)  |
| Low priority gaps resolved         | 2 of 4 (50.0%) |

### 10.3 Update Schedule

| Review Point       | Date | Action                                             |
| ------------------ | ---- | -------------------------------------------------- |
| Phase 2 midpoint   | TBD  | Review glossary progress; update status            |
| Phase 2 completion | TBD  | Verify MT-001, MT-002, MT-004 resolved             |
| Phase 3 completion | TBD  | Verify all medium-priority gaps resolved           |
| Phase 4 completion | TBD  | Verify all gaps resolved or documented as accepted |
| Annual review      | TBD  | Reassess gaps with new sources                     |
