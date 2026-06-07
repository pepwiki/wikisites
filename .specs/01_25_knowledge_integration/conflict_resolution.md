---
document_id: KI-CONFLICTS-001
title: "Cross-Lingual Knowledge Integration — Conflict Resolution"
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
adr_ref: "../.adrs/"
---

# Cross-Lingual Knowledge Integration — Conflict Resolution

**Document ID:** KI-CONFLICTS-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Conflict Resolution Methodology](#2-conflict-resolution-methodology)
3. [Terminology Conflicts](#3-terminology-conflicts)
4. [Methodology Disagreements](#4-methodology-disagreements)
5. [Data Inconsistencies](#5-data-inconsistencies)
6. [Resolution Strategies Applied](#6-resolution-strategies-applied)
7. [ADR References](#7-adr-references)
8. [Conflict Resolution Effectiveness](#8-conflict-resolution-effectiveness)
9. [Lessons Learned](#9-lessons-learned)
10. [Conflict Register Summary](#10-conflict-register-summary)

---

## 1. Executive Summary

### 1.1 Conflict Overview

This document records all conflicts identified during cross-lingual knowledge integration across six languages (EN, ZH, RU, DE, FR, JP) and documents the resolution strategies applied. Conflicts fall into three categories:

| Category                  | Count | Resolved | Open  |
| ------------------------- | ----- | -------- | ----- |
| Terminology conflicts     | 5     | 5        | 0     |
| Methodology disagreements | 2     | 2        | 0     |
| Data inconsistencies      | 1     | 1        | 0     |
| **Total**                 | **8** | **8**    | **0** |

### 1.2 Key Findings

All eight identified conflicts have been resolved. The most significant conflict (DEF-001: oligopeptide length boundary) required an architectural decision record (ADR-015) because it affects database schema design and content classification across all languages. The remaining conflicts were resolved through standard terminology harmonization and reference standardization.

---

## 2. Conflict Resolution Methodology

### 2.1 Conflict Detection Process

Conflicts were identified through the following process:

1. **Cross-language terminology comparison**: Each concept in the concept mappings (KI-CONCEPTS-001) was compared across all six language sources.
2. **Numerical value verification**: Quantitative values (energies, constants, thresholds) were compared across sources.
3. **Algorithm consistency checking**: Computational algorithms were verified against multilingual references.
4. **Definition boundary analysis**: Category boundaries (e.g., what qualifies as an "oligopeptide") were checked for consistency.

### 2.2 Resolution Hierarchy

When conflicts were detected, the following resolution hierarchy was applied:

| Priority    | Authority                                                   | Application                                           |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| 1 (Highest) | International standard body (IUPAC, WHO, IUPHAR)            | Chemical nomenclature, pharmacological classification |
| 2           | Established reference textbook (translated editions)        | Concept definitions, theoretical frameworks           |
| 3           | Peer-reviewed literature majority (≥4 of 6 languages agree) | Numerical values, algorithm parameters                |
| 4           | Most recent authoritative source                            | When older and newer sources disagree                 |
| 5 (Lowest)  | Engineering judgment (documented as ADR)                    | Implementation-specific decisions                     |

### 2.3 Conflict Classification

| Severity | Definition                                                                      | Resolution Requirement                            |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| HIGH     | Conflict affects database schema, content classification, or algorithm behavior | ADR required; knowledge engineering team approval |
| MEDIUM   | Conflict affects translations or content accuracy in ≥2 languages               | Documented resolution with source justification   |
| LOW      | Conflict is cosmetic, notational, or affects ≤1 language                        | Documented resolution; no ADR required            |

---

## 3. Terminology Conflicts

### 3.1 DEF-001: Oligopeptide Length Boundary

| Field           | Value                     |
| --------------- | ------------------------- |
| **Conflict ID** | DEF-001                   |
| **Category**    | Terminology               |
| **Severity**    | HIGH                      |
| **Languages**   | EN vs. ZH                 |
| **Concept**     | Oligopeptide length range |
| **Status**      | RESOLVED                  |

**Conflicting Definitions**:

- **EN (IUPAC)**: Oligopeptide = 2-50 amino acid residues
- **ZH (王镜岩 et al., 2017; 查锡良 & 药立波, 2018)**: 寡肽 = 2-20 residues; 多肽 = 20-50 residues

**Analysis**:
The IUPAC definition (2-50 residues) is the international standard. The Chinese convention splits this range into two subcategories (寡肽 for 2-20, 多肽 for 20-50), which reflects a finer-grained classification used in Chinese biochemistry education. Both conventions are internally consistent and widely used in their respective linguistic communities.

**Resolution**:
Adopt the IUPAC definition (2-50 residues) as the canonical database boundary for all languages. In Chinese content, include an explanatory note acknowledging the Chinese convention.

**Implementation**:

```
Database classification: 2-50 residues = oligopeptide (all languages)
Chinese content note: "注：在中国生物化学教材中，2-20个残基的肽链通常被称为寡肽，
20-50个残基的肽链通常被称为多肽。本数据库采用IUPAC国际标准，将2-50个残基
的肽链统一归类为 oligopeptide（寡肽/多肽）。"
```

**ADR Reference**: ADR-015

**Verification**: All 20 standard amino acid translations verified consistent; only the boundary definition differed.

---

### 3.2 DEF-002: "Bioavailability" Terminology in Japanese

| Field           | Value                   |
| --------------- | ----------------------- |
| **Conflict ID** | DEF-002                 |
| **Category**    | Terminology             |
| **Severity**    | LOW                     |
| **Languages**   | JP (internal variation) |
| **Concept**     | Bioavailability         |
| **Status**      | RESOLVED                |

**Conflicting Forms**:

- **JP Form A**: 生物利用能 (seibutsu riyo nō) — "biological utilization ability"
- **JP Form B**: 生物利用度 (seibutsu riyo do) — "biological utilization degree"

**Analysis**:
Both forms are used in Japanese pharmaceutical literature. 生物利用能 is more common in pharmacokinetics contexts (Rowland & Tozer translation). 生物利用度 is more common in regulatory and manufacturing contexts (PMDA documentation). Neither form is incorrect.

**Resolution**:
Adopt 生物利用能 as the primary translation for pharmacokinetics content. Accept 生物利用度 as an alternative form in regulatory contexts. Note both forms in the glossary.

---

### 3.3 DEF-003: "Spaced Repetition" Translation in Japanese

| Field           | Value                   |
| --------------- | ----------------------- |
| **Conflict ID** | DEF-003                 |
| **Category**    | Terminology             |
| **Severity**    | LOW                     |
| **Languages**   | JP (internal variation) |
| **Concept**     | Spaced repetition       |
| **Status**      | RESOLVED                |

**Conflicting Forms**:

- **JP Form A**: スパーストリピティション (supēsu ripitishon) — phonetic transliteration of English
- **JP Form B**: 間隔反復 (kankaku hanpuku) — semantic translation: "interval repetition"

**Analysis**:
スパーストリピティション is used in the Anki community and technical implementations. 間隔反復 is used in educational psychology literature (伊藤 & 山田, 2021). The semantic translation is more accessible to Japanese readers unfamiliar with English loanwords.

**Resolution**:
Adopt 間隔反復 as the primary translation for educational content. Accept スパーストリピティション as an alternative in technical/implementation contexts. Note both forms in the glossary.

---

### 3.4 DEF-004: Hill Coefficient Symbol in German

| Field           | Value                     |
| --------------- | ------------------------- |
| **Conflict ID** | DEF-004                   |
| **Category**    | Terminology               |
| **Severity**    | LOW                       |
| **Languages**   | EN vs. DE                 |
| **Concept**     | Hill coefficient notation |
| **Status**      | RESOLVED                  |

**Conflicting Forms**:

- **EN**: nH (subscript H)
- **DE**: nH or νH (some sources use Greek nu instead of n)

**Analysis**:
The Hill coefficient is universally understood as the same mathematical parameter. The notation variation (n vs. ν) is cosmetic and does not affect calculations. EN nH is more widely used in international literature.

**Resolution**:
Standardize on nH across all languages. German content will use nH consistently.

---

### 3.5 DEF-005: "Active Recall" Translation in Chinese

| Field           | Value                   |
| --------------- | ----------------------- |
| **Conflict ID** | DEF-005                 |
| **Category**    | Terminology             |
| **Severity**    | LOW                     |
| **Languages**   | ZH (internal variation) |
| **Concept**     | Active recall           |
| **Status**      | RESOLVED                |

**Conflicting Forms**:

- **ZH Form A**: 主动回忆 (zhǔdòng huíyì) — "active recall/recollection"
- **ZH Form B**: 主动检索 (zhǔdòng jiǎnsuǒ) — "active retrieval/search"

**Analysis**:
主动回忆 is used in general psychology literature. 主动检索 is used in cognitive science and educational psychology literature (closer to the English "retrieval" semantics). Both are understood by Chinese educators.

**Resolution**:
Adopt 主动回忆 as the primary translation (more accessible). Accept 主动检索 as an alternative in technical contexts.

---

## 4. Methodology Disagreements

### 4.1 MTD-001: Binding Affinity Prediction Model Complexity

| Field           | Value                                |
| --------------- | ------------------------------------ |
| **Conflict ID** | MTD-001                              |
| **Category**    | Methodology                          |
| **Severity**    | MEDIUM                               |
| **Languages**   | EN vs. RU                            |
| **Concept**     | Binding affinity prediction approach |
| **Status**      | RESOLVED                             |

**Conflicting Approaches**:

- **EN sources**: Simplified empirical model for educational use:
  ```
  log(Kd) = α × (charge_complementarity) + β × (hydrophobic_contact_area) + γ × (h_bond_count) + δ × (size_penalty) + ε
  ```
- **RU sources (Пинегин & Демидов, 2018)**: Emphasize computational molecular dynamics (MD) simulations and free energy perturbation (FEP) methods as the primary approach for binding prediction.

**Analysis**:
The EN approach prioritizes educational accessibility — a simplified model that students can understand and apply manually. The RU approach prioritizes computational accuracy — MD/FEP methods that are more accurate but require specialized software. Both approaches are valid for their intended contexts.

**Resolution**:
The Yellow Paper (YP-BIO-OLIGO-001) correctly specifies both models:

1. **Simplified model** (§5.1.3): For educational contexts — students learn the principles
2. **Full thermodynamic model** (§5.1.2): For reference/research contexts — accuracy matters

The RU emphasis on computational methods is acknowledged as the gold standard for research but does not conflict with the educational simplified model. Both are documented.

**Justification**: Educational platforms must balance accuracy with accessibility. The simplified model captures the key physical principles (charge, hydrophobicity, hydrogen bonding, size) without requiring computational resources.

---

### 4.2 MTD-002: Bloom's Taxonomy Translation Selection

| Field           | Value                                     |
| --------------- | ----------------------------------------- |
| **Conflict ID** | MTD-002                                   |
| **Category**    | Methodology                               |
| **Severity**    | MEDIUM                                    |
| **Languages**   | ZH, RU, JP                                |
| **Concept**     | Bloom's taxonomy cognitive process levels |
| **Status**      | RESOLVED                                  |

**Conflicting Translations**:

| EN Level   | ZH Variant A | ZH Variant B | RU Variant A | RU Variant B | JP Variant A | JP Variant B |
| ---------- | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| Remember   | 记忆         | 识记         | Запоминание  | Знание       | 記憶         | 知識         |
| Understand | 理解         | 理解         | Понимание    | Понимание    | 理解         | 理解         |
| Apply      | 应用         | 应用         | Применение   | Применение   | 適用         | 応用         |
| Analyze    | 分析         | 分析         | Анализ       | Анализ       | 分析         | 分析         |
| Evaluate   | 评价         | 评判         | Оценка       | Оценивание   | 評価         | 評価         |
| Create     | 创造         | 创作         | Создание     | Творчество   | 創造         | 創造         |

**Analysis**:
The Anderson & Krathwohl (2001) revision of Bloom's taxonomy has been translated into each target language by multiple publishers and academic groups. The variant A forms are from the most widely cited translations in each language. Variant B forms are from alternative translations that are also in circulation.

For ZH: 记忆/理解/应用/分析/评价/创造 (Variant A) is the most widely used in Chinese education literature.
For RU: Запоминание/Понимание/Применение/Анализ/Оценка/Создание (Variant A) is the most widely used in Russian pedagogy.
For JP: 記憶/理解/適用/分析/評価/創造 (Variant A) is the most widely used in Japanese education literature.

**Resolution**:
Adopt Variant A for all languages. The selected translations are the most widely cited and understood in their respective educational communities.

**Implementation**:

```json
{
  "bloom_remember": {
    "en": "Remember",
    "zh": "记忆",
    "ru": "Запоминание",
    "de": "Erinnern",
    "fr": "Se souvenir",
    "ja": "記憶"
  },
  "bloom_understand": {
    "en": "Understand",
    "zh": "理解",
    "ru": "Понимание",
    "de": "Verstehen",
    "fr": "Comprendre",
    "ja": "理解"
  },
  "bloom_apply": {
    "en": "Apply",
    "zh": "应用",
    "ru": "Применение",
    "de": "Anwenden",
    "fr": "Appliquer",
    "ja": "適用"
  },
  "bloom_analyze": {
    "en": "Analyze",
    "zh": "分析",
    "ru": "Анализ",
    "de": "Analysieren",
    "fr": "Analyser",
    "ja": "分析"
  },
  "bloom_evaluate": {
    "en": "Evaluate",
    "zh": "评价",
    "ru": "Оценка",
    "de": "Bewerten",
    "fr": "Évaluer",
    "ja": "評価"
  },
  "bloom_create": {
    "en": "Create",
    "zh": "创造",
    "ru": "Создание",
    "de": "Erschaffen",
    "fr": "Créer",
    "ja": "創造"
  }
}
```

---

## 5. Data Inconsistencies

### 5.1 DAT-001: Peptide Bond Rotation Barrier Energy

| Field           | Value                                     |
| --------------- | ----------------------------------------- |
| **Conflict ID** | DAT-001                                   |
| **Category**    | Data inconsistency                        |
| **Severity**    | LOW                                       |
| **Languages**   | EN vs. RU                                 |
| **Concept**     | C-N bond rotation barrier in peptide bond |
| **Status**      | RESOLVED                                  |

**Conflicting Values**:

- **EN sources**: 60-90 kJ/mol (range)
- **RU sources (Северин, 2013; Петров & Лакин, 2016)**: 75-85 kJ/mol (narrower range)

**Analysis**:
The EN range (60-90 kJ/mol) reflects a broader compilation of experimental and computational estimates from multiple decades. The RU range (75-85 kJ/mol) reflects more recent experimental measurements using NMR and computational methods. The RU range is a subset of the EN range and represents a more precise consensus.

**Resolution**:
Adopt 75-85 kJ/mol as the consensus value for all languages. This reflects the best current experimental evidence while acknowledging that older estimates varied more widely.

**Implementation**:
In YP-CHEM-OLIGO-001 §4.1.3, the value is stated as "approximately 75-85 kJ/mol" which is consistent with this resolution.

---

## 6. Resolution Strategies Applied

### 6.1 Strategy Summary

| Strategy                            | Conflicts Applied To      | Description                                                              |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------------------ |
| **International standard adoption** | DEF-001                   | Adopt IUPAC standard as canonical; document local variations             |
| **Primary form selection**          | DEF-002, DEF-003, DEF-005 | Select most widely used form; accept alternatives in specific contexts   |
| **Notation standardization**        | DEF-004                   | Adopt internationally dominant notation across all languages             |
| **Dual-model documentation**        | MTD-001                   | Document both approaches (simplified + advanced) for different use cases |
| **Majority consensus**              | MTD-002                   | Select the most widely cited translation in each language community      |
| **Value range narrowing**           | DAT-001                   | Adopt the narrower, more recent experimental range                       |
| **ADR documentation**               | DEF-001                   | Create formal architectural decision record for high-severity conflicts  |

### 6.2 Strategy Effectiveness

| Strategy                        | Conflicts Resolved | Resolution Quality | Documentation Completeness |
| ------------------------------- | ------------------ | ------------------ | -------------------------- |
| International standard adoption | 1                  | HIGH               | ADR-015 created            |
| Primary form selection          | 3                  | HIGH               | Glossary updated           |
| Notation standardization        | 1                  | HIGH               | All YPs updated            |
| Dual-model documentation        | 1                  | HIGH               | YP-BIO-OLIGO-001 §5.1      |
| Majority consensus              | 1                  | HIGH               | i18n files updated         |
| Value range narrowing           | 1                  | HIGH               | YP-CHEM-OLIGO-001 §4.1.3   |

---

## 7. ADR References

### 7.1 ADR-015: Oligopeptide Definition Boundary

| Field                  | Value                            |
| ---------------------- | -------------------------------- |
| **ADR ID**             | ADR-015                          |
| **Title**              | Oligopeptide Definition Boundary |
| **Status**             | ACCEPTED                         |
| **Date**               | 2026-06-07                       |
| **Conflict Reference** | DEF-001                          |

**Context**:
The project requires a consistent definition of "oligopeptide" across all six supported languages. IUPAC defines oligopeptides as peptides with 2-50 amino acid residues. Chinese biochemistry textbooks use a finer-grained classification: 寡肽 (2-20 residues) and 多肽 (20-50 residues).

**Decision**:
Adopt the IUPAC definition (2-50 residues) as the canonical database boundary for all languages.

**Consequences**:

- **Positive**: Consistent database schema across all languages; alignment with international standards
- **Negative**: Chinese content must include an explanatory note about the local convention
- **Neutral**: No impact on EN, RU, DE, FR, JP content (IUPAC definition is standard in these languages)

**Implementation**:

- Database schema uses 2-50 as the oligopeptide range
- Chinese content includes the explanatory note defined in §3.1
- Search and classification algorithms use the IUPAC range

---

## 8. Conflict Resolution Effectiveness

### 8.1 Metrics

| Metric                                    | Value       |
| ----------------------------------------- | ----------- |
| Total conflicts identified                | 8           |
| Conflicts resolved                        | 8 (100%)    |
| Conflicts requiring ADR                   | 1 (DEF-001) |
| Average resolution time                   | <1 day      |
| Conflicts with residual risk              | 0           |
| Conflicts escalated to external reviewers | 0           |

### 8.2 Resolution Distribution by Severity

| Severity | Count | Resolved | ADR Required |
| -------- | ----- | -------- | ------------ |
| HIGH     | 1     | 1 (100%) | 1            |
| MEDIUM   | 3     | 3 (100%) | 0            |
| LOW      | 4     | 4 (100%) | 0            |

### 8.3 Resolution Distribution by Category

| Category    | Count | Resolved |
| ----------- | ----- | -------- |
| Terminology | 5     | 5 (100%) |
| Methodology | 2     | 2 (100%) |
| Data        | 1     | 1 (100%) |

---

## 9. Lessons Learned

### 9.1 What Worked Well

1. **Systematic cross-language comparison**: Comparing terms across all six languages simultaneously revealed conflicts that would be missed by bilingual comparison alone.
2. **Resolution hierarchy**: The pre-defined authority hierarchy (IUPAC > textbooks > literature > recency > judgment) enabled fast, consistent resolution decisions.
3. **Severity classification**: Classifying conflicts by severity ensured that HIGH-severity conflicts (like DEF-001) received appropriate ADR treatment while LOW-severity conflicts were resolved quickly.

### 9.2 Challenges

1. **ZH length boundary**: The Chinese convention for oligopeptide vs. polypeptide boundaries is deeply embedded in educational materials. The resolution (IUPAC standard with explanatory note) adds content complexity.
2. **JP loanword vs. semantic translation**: Japanese has two competing traditions for translating Western scientific terms (phonetic loanwords vs. semantic translations). This requires ongoing monitoring as usage evolves.
3. **RU computational emphasis**: Russian pharmacology literature emphasizes computational methods more than Western sources. This is not a conflict per se but requires careful framing to avoid implying that one approach is "correct."

### 9.3 Recommendations for Future Phases

1. **Monitor JP terminology evolution**: As Japanese scientific publishing evolves, loanword vs. semantic translation preferences may shift. Re-evaluate DEF-002 and DEF-003 in Phase 3.
2. **Commission ZH/RU expert review**: For any new terminology introduced in Phase 2-3, commission native-speaking expert review before publication.
3. **Maintain conflict register**: Add any new conflicts discovered during content creation to this document.

---

## 10. Conflict Register Summary

### 10.1 Complete Conflict Register

| Conflict ID | Category    | Severity | Languages   | Concept                       | Resolution            | ADR     | Status   |
| ----------- | ----------- | -------- | ----------- | ----------------------------- | --------------------- | ------- | -------- |
| DEF-001     | Terminology | HIGH     | EN vs. ZH   | Oligopeptide length boundary  | IUPAC standard (2-50) | ADR-015 | RESOLVED |
| DEF-002     | Terminology | LOW      | JP internal | Bioavailability translation   | 生物利用能 primary    | —       | RESOLVED |
| DEF-003     | Terminology | LOW      | JP internal | Spaced repetition translation | 間隔反復 primary      | —       | RESOLVED |
| DEF-004     | Terminology | LOW      | EN vs. DE   | Hill coefficient symbol       | Standardize nH        | —       | RESOLVED |
| DEF-005     | Terminology | LOW      | ZH internal | Active recall translation     | 主动回忆 primary      | —       | RESOLVED |
| MTD-001     | Methodology | MEDIUM   | EN vs. RU   | Binding affinity model        | Dual-model documented | —       | RESOLVED |
| MTD-002     | Methodology | MEDIUM   | ZH/RU/JP    | Bloom's taxonomy translation  | Variant A selected    | —       | RESOLVED |
| DAT-001     | Data        | LOW      | EN vs. RU   | Peptide bond rotation barrier | 75-85 kJ/mol          | —       | RESOLVED |

### 10.2 Conflict Resolution Traceability

Each resolved conflict is traceable to:

1. **Source documents**: The Yellow Papers and multilingual bibliography sources where the conflict was detected
2. **Resolution rationale**: The justification for the chosen resolution, documented in the conflict details
3. **Implementation evidence**: The specific files/values updated to implement the resolution
4. **ADR reference**: Where applicable, the architectural decision record documenting the decision

### 10.3 Next Review Date

The conflict register will be reviewed at:

- **Phase 2 completion**: Verify no new conflicts from content creation
- **Phase 3 completion**: Verify no new conflicts from testing and validation
- **Annual review**: Reassess all resolutions with updated sources
