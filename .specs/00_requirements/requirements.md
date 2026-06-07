# EARS Requirements Specification

**Document ID:** REQ-EARS-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Approved
**Scope:** encyclopeptide.com and wikipept.com

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Notation Convention](#2-notation-convention)
3. [Functional Requirements (FR-001 through FR-050)](#3-functional-requirements)
4. [Non-Functional Requirements (NFR-001 through NFR-030)](#4-non-functional-requirements)
5. [Data Requirements (DR-001 through DR-015)](#5-data-requirements)
6. [Integration Requirements (IR-001 through IR-010)](#6-integration-requirements)
7. [Design Requirements (DesR-001 through DesR-020)](#7-design-requirements)
8. [Security Requirements (SR-001 through SR-015)](#8-security-requirements)
9. [Compliance Requirements (CR-001 through CR-010)](#9-compliance-requirements)
10. [Traceability Matrix](#10-traceability-matrix)

---

## 1. Introduction

### 1.1 Purpose

This document specifies all requirements for the Wikisites project: two complementary oligopeptide educational websites — **encyclopeptide.com** (formal encyclopedic reference) and **wikipept.com** (collaborative wiki-style educational platform). Requirements are written in EARS (Easy Approach to Requirements Syntax) format to ensure precision, testability, and unambiguous interpretation.

### 1.2 Scope

The requirements cover functional behavior, non-functional quality attributes, data architecture, integration points, visual design, security controls, and regulatory compliance for both sites. Requirements are classified by affected site(s):

- **SHARED** — applies to both encyclopeptide.com and wikipept.com
- **ENCP** — applies exclusively to encyclopeptide.com
- **WIKI** — applies exclusively to wikipept.com

### 1.3 Priority Classification

Each requirement carries a MoSCoW priority:

| Priority   | Definition                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| **Must**   | Non-negotiable; the system cannot ship without it. Failure blocks launch.                                          |
| **Should** | Important; the system is significantly degraded without it. Target for launch, may defer to immediate post-launch. |
| **Could**  | Desirable; enhances value but not critical. May be deferred or implemented incrementally.                          |
| **Won't**  | Explicitly out of scope for current release. Documented for future consideration.                                  |

### 1.4 Verification Methods

| Method            | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| **Test**          | Automated or manual test execution with pass/fail criteria       |
| **Inspection**    | Code review, design review, or documentation review              |
| **Demonstration** | Live execution of the feature in a representative environment    |
| **Analysis**      | Examination of models, static analysis, or performance profiling |
| **Audit**         | Formal review against a checklist or standard                    |

---

## 2. Notation Convention

All requirements follow EARS syntax:

```
The [system/component] SHALL/SHOULD/MAY [action] [condition] [rationale]
```

- **SHALL** = mandatory obligation (equivalent to "must implement and verify")
- **SHOULD** = recommended obligation (implement unless documented rationale for deviation)
- **MAY** = optional (discretionary implementation)
- **condition** = triggering condition, prefaced by "when", "if", "after", or "while"

Each requirement entry includes:

| Field                      | Description                      |
| -------------------------- | -------------------------------- |
| **ID**                     | Unique identifier (e.g., FR-001) |
| **Statement**              | EARS-formatted requirement text  |
| **Priority**               | MoSCoW classification            |
| **Rationale**              | Why this requirement exists      |
| **Verification Method**    | How compliance is verified       |
| **Applicable Standard(s)** | Relevant standards or norms      |
| **Affected Site(s)**       | SHARED, ENCP, or WIKI            |

---

## 3. Functional Requirements

### 3.1 Search and Discovery

---

**FR-001**

| Field                      | Value                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide a full-text search interface that returns results within 200ms for simple queries on both sites. |
| **Priority**               | Must                                                                                                                      |
| **Rationale**              | Users must locate peptide data and study guides rapidly. Slow search degrades trust and completion rates.                 |
| **Verification Method**    | Test — automated performance test asserting <200ms response for 95th percentile of test queries                           |
| **Applicable Standard(s)** | Core Web Vitals                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                    |

---

**FR-002**

| Field                      | Value                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL support faceted search with filters for chain length, functional category, source organism, therapeutic application, and educational level on both sites. |
| **Priority**               | Must                                                                                                                                                                       |
| **Rationale**              | Multi-axis filtering is required to navigate the combinatorial oligopeptide domain space efficiently.                                                                      |
| **Verification Method**    | Test — verify each facet filter returns correct subset of results                                                                                                          |
| **Applicable Standard(s)** | None                                                                                                                                                                       |
| **Affected Site(s)**       | SHARED                                                                                                                                                                     |

---

**FR-003**

| Field                      | Value                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | encyclopeptide.com SHALL provide structure-based search accepting amino acid sequence input (single-letter codes, e.g., "CDE") and returning all matching oligopeptides. |
| **Priority**               | Must                                                                                                                                                                     |
| **Rationale**              | Researchers frequently search by partial or exact sequence. Sequence search is the primary lookup method in structural biology.                                          |
| **Verification Method**    | Test — submit known sequences and verify correct matches returned                                                                                                        |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature                                                                                                                                                   |
| **Affected Site(s)**       | ENCP                                                                                                                                                                     |

---

**FR-004**

| Field                      | Value                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL provide substructure search accepting SMILES notation and returning oligopeptides containing the specified structural motif. |
| **Priority**               | Should                                                                                                                                                |
| **Rationale**              | Medicinal chemists use SMILES to find peptides containing pharmacophoric elements. Substructure search enables drug design workflows.                 |
| **Verification Method**    | Test — submit known SMILES patterns and verify correct structural matches                                                                             |
| **Applicable Standard(s)** | IUPAC SMILES notation                                                                                                                                 |
| **Affected Site(s)**       | ENCP                                                                                                                                                  |

---

**FR-005**

| Field                      | Value                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL display search results with highlighted matching terms, result count, and pagination (20 results per page) on both sites. |
| **Priority**               | Must                                                                                                                                       |
| **Rationale**              | Users need to scan results quickly and navigate large result sets without overwhelming the page.                                           |
| **Verification Method**    | Test — verify term highlighting, count accuracy, and pagination correctness                                                                |
| **Applicable Standard(s)** | None                                                                                                                                       |
| **Affected Site(s)**       | SHARED                                                                                                                                     |

---

### 3.2 Navigation and Information Architecture

---

**FR-006**

| Field                      | Value                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL provide a fixed left sidebar navigation with collapsible sections organized by peptide classification (chain length, function, source, therapeutic area). |
| **Priority**               | Must                                                                                                                                                                               |
| **Rationale**              | Academic researchers expect persistent, hierarchical navigation for systematic data lookup. A left sidebar mirrors journal database interfaces.                                    |
| **Verification Method**    | Demonstration — verify sidebar visibility, collapsibility, and correct link targets across viewport sizes                                                                          |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.1 Bypass Blocks)                                                                                                                                                  |
| **Affected Site(s)**       | ENCP                                                                                                                                                                               |

---

**FR-007**

| Field                      | Value                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL provide a top header navigation with dropdown menus and an optional right sidebar showing the user's learning progress.                |
| **Priority**               | Must                                                                                                                                                      |
| **Rationale**              | Students need context-aware navigation that surfaces their progress and next recommended topic. Top navigation is conventional for educational platforms. |
| **Verification Method**    | Demonstration — verify header renders correctly, dropdowns function, and progress sidebar displays when logged in                                         |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.5 Multiple Ways)                                                                                                                         |
| **Affected Site(s)**       | WIKI                                                                                                                                                      |

---

**FR-008**

| Field                      | Value                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide breadcrumb navigation on every page, reflecting the full hierarchical path from the homepage to the current page on both sites. |
| **Priority**               | Must                                                                                                                                                     |
| **Rationale**              | Breadcrumbs orient users within deep content hierarchies and provide one-click return to parent sections. Required for WCAG 2.4.8.                       |
| **Verification Method**    | Test — verify breadcrumbs display correct hierarchy and each crumb links to the correct parent page                                                      |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.8 Location)                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                   |

---

**FR-009**

| Field                      | Value                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL generate a table of contents automatically from the heading structure (H1–H4) of every content page on both sites. |
| **Priority**               | Should                                                                                                                              |
| **Rationale**              | Auto-generated TOCs ensure consistency and reduce maintenance burden. Users rely on TOCs to scan long monographs and study guides.  |
| **Verification Method**    | Test — verify TOC entries match heading text and anchor links scroll to correct positions                                           |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.5 Multiple Ways)                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                              |

---

### 3.3 Responsive Design and Dark Mode

---

**FR-010**

| Field                      | Value                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL render all pages correctly across viewports from 320px to 2560px width using a mobile-first responsive layout on both sites. |
| **Priority**               | Must                                                                                                                                          |
| **Rationale**              | Over 60% of educational traffic originates from mobile devices. Responsive design ensures equitable access across device classes.             |
| **Verification Method**    | Test — Playwright tests at 320px, 375px, 768px, 1024px, 1280px, 1536px, 2560px breakpoints                                                    |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.4.10 Reflow)                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                        |

---

**FR-011**

| Field                      | Value                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide a dark mode toggle that switches between light and dark color schemes, persisting the user's preference via localStorage on both sites. |
| **Priority**               | Should                                                                                                                                                           |
| **Rationale**              | Dark mode reduces eye strain during extended study sessions and is an expected feature for modern educational platforms.                                         |
| **Verification Method**    | Test — toggle mode, verify color changes, reload page, verify persistence                                                                                        |
| **Applicable Standard(s)** | None                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                           |

---

**FR-012**

| Field                      | Value                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL respect the `prefers-color-scheme` media query as the default dark mode setting when no user preference is stored on both sites. |
| **Priority**               | Should                                                                                                                                            |
| **Rationale**              | Respecting the OS-level preference provides immediate comfort without requiring user action.                                                      |
| **Verification Method**    | Test — set OS dark mode preference, verify site defaults correctly                                                                                |
| **Applicable Standard(s)** | None                                                                                                                                              |
| **Affected Site(s)**       | SHARED                                                                                                                                            |

---

### 3.4 Internationalization (i18n)

---

**FR-013**

| Field                      | Value                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL serve localized content in English (en), Spanish (es), French (fr), German (de), Chinese Simplified (zh), and Japanese (ja) using locale-prefixed URL paths (e.g., `/en/angiotensin-ii`, `/zh/angiotensin-ii`) on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                           |
| **Rationale**              | Multi-lingual access expands the user base to non-English-speaking students and researchers globally. URL prefix routing enables SEO-independent locale resolution.                                                                            |
| **Verification Method**    | Test — verify each locale URL resolves to the correct translated page                                                                                                                                                                          |
| **Applicable Standard(s)** | ISO 639-1, Unicode CLDR                                                                                                                                                                                                                        |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                         |

---

**FR-014**

| Field                      | Value                                                                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL display a locale switcher in the site header showing the current locale name in its native script (English, Español, Français, Deutsch, 中文, 日本語) with links to all available locale variants on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                              |
| **Rationale**              | Users must be able to discover and switch between available languages without modifying the URL manually.                                                                                                                         |
| **Verification Method**    | Test — verify locale switcher renders correct native names and links for all supported locales                                                                                                                                    |
| **Applicable Standard(s)** | WCAG 2.1 AA (3.1.2 Language of Parts)                                                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                            |

---

**FR-015**

| Field                      | Value                                                                                                                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL keep IUPAC nomenclature, amino acid codes (3-letter and 1-letter), chemical formulas, gene symbols, SI units, peptide sequences, and database identifiers (UniProt, PDB, ChEMBL) in their original English/IUPAC form regardless of the selected display locale on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                            |
| **Rationale**              | Scientific nomenclature is globally standardized. Translating these elements would introduce ambiguity and errors in scientific communication.                                                                                                                                                  |
| **Verification Method**    | Inspection — review translated pages for all locales and verify invariant elements remain in English/IUPAC                                                                                                                                                                                      |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature, ISO 80000                                                                                                                                                                                                                                                               |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                          |

---

### 3.5 encyclopeptide.com — Molecular Structure Rendering

---

**FR-016**

| Field                      | Value                                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | encyclopeptide.com SHALL render an interactive 3D molecular viewer on oligopeptide monograph pages using Mol\*, NGL Viewer, or 3Dmol.js, allowing rotation, zoom, and atom selection via mouse and touch gestures. |
| **Priority**               | Must                                                                                                                                                                                                               |
| **Rationale**              | 3D structural visualization is essential for understanding peptide conformation, receptor binding, and structure-activity relationships. Researchers expect interactive molecular graphics.                        |
| **Verification Method**    | Demonstration — load monograph page, verify viewer renders, rotate/zoom with mouse, select atoms, verify data panel updates                                                                                        |
| **Applicable Standard(s)** | None                                                                                                                                                                                                               |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                               |

---

**FR-017**

| Field                      | Value                                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL provide a 2D structural diagram as an alternative representation for every oligopeptide that has a 3D structure entry, rendered below or adjacent to the 3D viewer. |
| **Priority**               | Must                                                                                                                                                                                         |
| **Rationale**              | 2D diagrams provide a quick structural overview, serve as a fallback for browsers without WebGL support, and are essential for accessibility.                                                |
| **Verification Method**    | Test — verify 2D diagram renders for each monograph with PDB data; verify 2D fallback renders when WebGL is disabled                                                                         |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.1.1 Non-text Content)                                                                                                                                                         |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                         |

---

**FR-018**

| Field                      | Value                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL lazy-load the 3D molecular viewer using `client:visible` hydration so that it only initializes when scrolled into the viewport on both mobile and desktop. |
| **Priority**               | Must                                                                                                                                                                                |
| **Rationale**              | 3D viewers are JavaScript-heavy. Lazy loading prevents them from blocking initial page render and degrading LCP.                                                                    |
| **Verification Method**    | Test — verify viewer script does not load until element enters viewport via IntersectionObserver                                                                                    |
| **Applicable Standard(s)** | Core Web Vitals (LCP)                                                                                                                                                               |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                |

---

**FR-019**

| Field                      | Value                                                                                                                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL render IUPAC peptide sequences in a monospace font (JetBrains Mono) with N-terminus on the left and C-terminus on the right, with each residue individually selectable to display its properties (name, pKa, hydropathy, molecular weight). |
| **Priority**               | Should                                                                                                                                                                                                                                                               |
| **Rationale**              | Individual residue selection enables researchers to quickly inspect properties of specific positions without navigating away from the monograph.                                                                                                                     |
| **Verification Method**    | Test — click each residue in a sequence, verify property panel displays correct data                                                                                                                                                                                 |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature                                                                                                                                                                                                                                               |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                                                 |

---

### 3.6 encyclopeptide.com — IUPAC Name Lookup

---

**FR-020**

| Field                      | Value                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL provide an IUPAC name lookup field that accepts a full IUPAC systematic name or any known alias and returns the matching oligopeptide monograph. |
| **Priority**               | Must                                                                                                                                                                      |
| **Rationale**              | Researchers use IUPAC names in formal writing and need direct lookup. Aliases accommodate common usage (e.g., "Ang II" for "angiotensin II").                             |
| **Verification Method**    | Test — submit known IUPAC names and aliases, verify correct monograph returned                                                                                            |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature                                                                                                                                                    |
| **Affected Site(s)**       | ENCP                                                                                                                                                                      |

---

**FR-021**

| Field                      | Value                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL display the full IUPAC systematic name, all registered aliases, and the CAS Registry Number (if available) prominently at the top of each oligopeptide monograph page. |
| **Priority**               | Must                                                                                                                                                                                            |
| **Rationale**              | Unambiguous identification is critical for scientific reference. Multiple identifiers accommodate different naming conventions.                                                                 |
| **Verification Method**    | Inspection — review monograph pages for presence of IUPAC name, aliases, and CAS number                                                                                                         |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature, CAS Registry                                                                                                                                                            |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                            |

---

### 3.7 encyclopeptide.com — Synthesis Pathway Visualization

---

**FR-022**

| Field                      | Value                                                                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | encyclopeptide.com SHALL render synthesis pathway diagrams for each oligopeptide that supports chemical synthesis, showing the step-by-step SPPS route with coupling reagents, resin type, deprotection strategy, and cleavage conditions. |
| **Priority**               | Should                                                                                                                                                                                                                                     |
| **Rationale**              | Synthesis routes are essential for medicinal chemists and process chemists evaluating peptide production feasibility.                                                                                                                      |
| **Verification Method**    | Demonstration — load monograph for a synthesized peptide, verify pathway diagram renders with correct reagents and conditions                                                                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                       |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                       |

---

**FR-023**

| Field                      | Value                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL display biosynthetic pathway diagrams for each oligopeptide with known ribosomal or non-ribosomal synthesis, showing precursors, enzymes, and post-translational modifications. |
| **Priority**               | Should                                                                                                                                                                                                   |
| **Rationale**              | Biosynthetic pathways are fundamental to understanding peptide origin and are required for biotechnology researchers working on recombinant production.                                                  |
| **Verification Method**    | Demonstration — load monograph for a biosynthetically characterized peptide, verify pathway diagram renders correctly                                                                                    |
| **Applicable Standard(s)** | None                                                                                                                                                                                                     |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                     |

---

### 3.8 encyclopeptide.com — Pharmacokinetic Data Tables

---

**FR-024**

| Field                      | Value                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL render pharmacokinetic parameter tables with sortable columns (parameter, value, species, route, reference DOI) and filterable rows for each therapeutic oligopeptide. |
| **Priority**               | Must                                                                                                                                                                                            |
| **Rationale**              | Researchers compare PK parameters across species and routes. Sortable/filterable tables enable rapid data extraction for drug development decisions.                                            |
| **Verification Method**    | Test — verify table renders, sort by each column, filter by species and route, verify data integrity                                                                                            |
| **Applicable Standard(s)** | None                                                                                                                                                                                            |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                            |

---

**FR-025**

| Field                      | Value                                                                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL display receptor binding affinity data (Kd, Ki, IC50, EC50) in structured tables with method column (assay type) and DOI-linked reference for each oligopeptide that has published binding data. |
| **Priority**               | Must                                                                                                                                                                                                                      |
| **Rationale**              | Binding affinity data is the primary metric for pharmacological characterization. DOI links enable researchers to verify primary sources.                                                                                 |
| **Verification Method**    | Test — verify binding table renders with correct values, methods, and working DOI links                                                                                                                                   |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                      |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                      |

---

### 3.9 encyclopeptide.com — Citation Management

---

**FR-026**

| Field                      | Value                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL display references on each monograph as numbered, DOI-linked citations with full bibliographic metadata (authors, title, journal, year, volume, pages). |
| **Priority**               | Must                                                                                                                                                                             |
| **Rationale**              | Formal citation is essential for academic use. DOI links enable one-click access to primary literature.                                                                          |
| **Verification Method**    | Test — verify all references display correct metadata and DOI links resolve to valid articles                                                                                    |
| **Applicable Standard(s)** | DOI (ISO 26324)                                                                                                                                                                  |
| **Affected Site(s)**       | ENCP                                                                                                                                                                             |

---

**FR-027**

| Field                      | Value                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | encyclopeptide.com SHALL provide citation export in BibTeX, RIS, and APA format for each monograph via a one-click export button.                |
| **Priority**               | Should                                                                                                                                           |
| **Rationale**              | Researchers import citations directly into reference managers (Zotero, Mendeley, EndNote). Multiple format support accommodates different tools. |
| **Verification Method**    | Test — click export button, verify generated BibTeX/RIS/APA output matches expected format and contains correct data                             |
| **Applicable Standard(s**) | BibTeX format, RIS format, APA 7th edition                                                                                                       |
| **Affected Site(s)**       | ENCP                                                                                                                                             |

---

**FR-028**

| Field                      | Value                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL validate all DOI links automatically during the build process and report broken DOIs as build warnings. |
| **Priority**               | Should                                                                                                                           |
| **Rationale**              | Broken DOI links undermine credibility. Build-time validation catches link rot before content is published.                      |
| **Verification Method**    | Test — introduce a deliberately invalid DOI, run build, verify warning is generated                                              |
| **Applicable Standard(s)** | DOI (ISO 26324)                                                                                                                  |
| **Affected Site(s)**       | ENCP                                                                                                                             |

---

### 3.10 encyclopeptide.com — Data Export

---

**FR-029**

| Field                      | Value                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL provide bulk data download of oligopeptide records in CSV and JSON formats via a dedicated download endpoint.                    |
| **Priority**               | Should                                                                                                                                                    |
| **Rationale**              | Bioinformaticians and computational biologists require programmatic access to structured data for analysis pipelines and integration with external tools. |
| **Verification Method**    | Test — request CSV and JSON exports, verify data completeness and schema conformance                                                                      |
| **Applicable Standard(s)** | FAIR Data Principles                                                                                                                                      |
| **Affected Site(s)**       | ENCP                                                                                                                                                      |

---

**FR-030**

| Field                      | Value                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | encyclopeptide.com SHALL provide a RESTful API with documented endpoints for peptide lookup by ID, sequence, name, and classification, returning JSON responses conforming to the OpenAPI 3.1 specification. |
| **Priority**               | Should                                                                                                                                                                                                       |
| **Rationale**              | Programmatic API access enables integration with bioinformatics pipelines, literature databases, and computational tools. OpenAPI documentation ensures developer adoption.                                  |
| **Verification Method**    | Test — call each API endpoint, verify correct JSON response and conformance to OpenAPI schema                                                                                                                |
| **Applicable Standard(s)** | OpenAPI 3.1, REST architecture                                                                                                                                                                               |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                         |

---

### 3.11 wikipept.com — Wiki Editing Interface

---

**FR-031**

| Field                      | Value                                                                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL provide a wiki-style editing interface that allows authenticated users to create, edit, and format study guide content using either a block-based editor or Markdown input with live preview. |
| **Priority**               | Must                                                                                                                                                                                                             |
| **Rationale**              | Community contribution is the core value proposition of wikipept.com. An accessible editing interface lowers the barrier to contribution.                                                                        |
| **Verification Method**    | Demonstration — log in, create a new page, edit existing content, verify changes persist and render correctly                                                                                                    |
| **Applicable Standard(s)** | None                                                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                             |

---

**FR-032**

| Field                      | Value                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL maintain a complete version history for every page, with each revision storing the full content diff, author attribution, timestamp, and edit summary. |
| **Priority**               | Must                                                                                                                                                                      |
| **Rationale**              | Version history enables rollback of vandalism, attribution of contributions, and audit trails for content quality. Required for wiki trustworthiness.                     |
| **Verification Method**    | Test — make multiple edits to a page, verify version history displays correct diffs, authors, and timestamps                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                      |
| **Affected Site(s)**       | WIKI                                                                                                                                                                      |

---

**FR-033**

| Field                      | Value                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL provide a visual diff viewer that highlights added, removed, and modified content between any two selected revisions of a page. |
| **Priority**               | Should                                                                                                                                             |
| **Rationale**              | Visual diffs enable reviewers and editors to quickly assess changes without reading raw markup. Critical for content moderation workflows.         |
| **Verification Method**    | Demonstration — select two revisions, verify diff highlights additions (green), deletions (red), and modifications (yellow)                        |
| **Applicable Standard(s)** | None                                                                                                                                               |
| **Affected Site(s)**       | WIKI                                                                                                                                               |

---

**FR-034**

| Field                      | Value                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | wikipept.com SHALL support edit conflict resolution by detecting simultaneous edits and presenting both versions to the user with a merge interface or last-write-wins notification. |
| **Priority**               | Should                                                                                                                                                                               |
| **Rationale**              | Concurrent editing is inherent to wiki platforms. Unhandled conflicts result in data loss.                                                                                           |
| **Verification Method**    | Test — simulate concurrent edits from two sessions, verify conflict detection and resolution UI                                                                                      |
| **Applicable Standard(s)** | None                                                                                                                                                                                 |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                 |

---

**FR-035**

| Field                      | Value                                                                                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL implement a content moderation queue where edits from new contributors (reputation score < 10) are held for review before publication, while edits from established contributors (reputation score >= 10) publish immediately. |
| **Priority**               | Must                                                                                                                                                                                                                                              |
| **Rationale**              | New contributors may introduce errors or vandalism. A moderation queue balances openness with quality control.                                                                                                                                    |
| **Verification Method**    | Test — submit edit as new user, verify it enters moderation queue; submit edit as established user, verify it publishes immediately                                                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                              |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                              |

---

### 3.12 wikipept.com — Quiz Engine

---

**FR-036**

| Field                      | Value                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL provide a quiz engine supporting multiple choice, fill-in-the-blank, matching, and true/false question types with immediate feedback (correct/incorrect with brief explanation) after each answer submission. |
| **Priority**               | Must                                                                                                                                                                                                                             |
| **Rationale**              | Active recall through quizzing is the most effective evidence-based learning technique. Multiple question types assess different cognitive levels.                                                                               |
| **Verification Method**    | Test — complete a quiz with each question type, verify correct scoring and feedback display                                                                                                                                      |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                             |

---

**FR-037**

| Field                      | Value                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL calculate quiz scores as a percentage of correct answers and display a results summary showing score, time taken, questions answered correctly/incorrectly, and links to review missed concepts. |
| **Priority**               | Must                                                                                                                                                                                                                |
| **Rationale**              | Learners need performance feedback to identify knowledge gaps. Linking missed questions to study content creates a closed learning loop.                                                                            |
| **Verification Method**    | Test — complete a quiz, verify score calculation, results summary, and review links                                                                                                                                 |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                |

---

**FR-038**

| Field                      | Value                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL associate each quiz question with one or more learning objectives and display which objectives the learner has mastered (>= 80% correct) and which require further study (< 80% correct) after quiz completion. |
| **Priority**               | Should                                                                                                                                                                                                                             |
| **Rationale**              | Objective-level mastery tracking enables targeted study recommendations and prevents learners from re-studying already-mastered material.                                                                                          |
| **Verification Method**    | Test — complete quiz, verify mastery indicators align with question-level performance                                                                                                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                               |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                               |

---

### 3.13 wikipept.com — Flashcard System

---

**FR-039**

| Field                      | Value                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL provide a flashcard system that displays a term or concept on the front and its definition or explanation on the back, with flip animation on click/tap. |
| **Priority**               | Must                                                                                                                                                                        |
| **Rationale**              | Flashcards are a fundamental study tool for memorization-heavy domains like biochemistry. Flip interaction enables active recall.                                           |
| **Verification Method**    | Demonstration — navigate to flashcard deck, verify card displays, flip animation works, front/back content is correct                                                       |
| **Applicable Standard(s)** | None                                                                                                                                                                        |
| **Affected Site(s)**       | WIKI                                                                                                                                                                        |

---

**FR-040**

| Field                      | Value                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL implement the FSRS (Free Spaced Repetition Scheduler) algorithm to schedule flashcard review intervals based on the learner's rating of each card (Again, Hard, Good, Easy). |
| **Priority**               | Must                                                                                                                                                                                            |
| **Rationale**              | Spaced repetition optimizes long-term retention by scheduling reviews at increasing intervals. FSRS is the current state-of-the-art algorithm, outperforming SM-2.                              |
| **Verification Method**    | Test — rate 20 cards across all four difficulty levels, verify scheduling intervals follow FSRS predictions                                                                                     |
| **Applicable Standard(s)** | FSRS algorithm specification                                                                                                                                                                    |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                            |

---

**FR-041**

| Field                      | Value                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL display a daily review queue showing the number of flashcards due for review today, organized by deck and priority. |
| **Priority**               | Should                                                                                                                                 |
| **Rationale**              | A review queue motivates daily study habit formation and prevents review backlog accumulation.                                         |
| **Verification Method**    | Test — create flashcard decks with spaced repetition schedule, verify daily queue displays correct due counts                          |
| **Applicable Standard(s)** | None                                                                                                                                   |
| **Affected Site(s)**       | WIKI                                                                                                                                   |

---

**FR-042**

| Field                      | Value                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL allow users to import flashcard decks in Anki (.apkg) and Quizlet (.csv) formats and export their decks in Anki-compatible format. |
| **Priority**               | Could                                                                                                                                                 |
| **Rationale**              | Import/export interoperability reduces lock-in and enables learners to bring existing study materials into the platform.                              |
| **Verification Method**    | Test — import an Anki deck, verify cards render correctly; export deck, verify it imports into Anki                                                   |
| **Applicable Standard(s)** | Anki .apkg format                                                                                                                                     |
| **Affected Site(s)**       | WIKI                                                                                                                                                  |

---

### 3.14 wikipept.com — Community Features

---

**FR-043**

| Field                      | Value                                                                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL allow authenticated users to add inline annotations (comments, clarifications, tips) to any paragraph of a study guide, displayed as collapsible notes below the annotated text. |
| **Priority**               | Should                                                                                                                                                                                              |
| **Rationale**              | Community annotations enrich content with diverse perspectives, practical tips, and clarifications that benefit future learners.                                                                    |
| **Verification Method**    | Demonstration — add annotation to a study guide paragraph, verify it appears as a collapsible note below the text                                                                                   |
| **Applicable Standard(s)** | None                                                                                                                                                                                                |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                |

---

**FR-044**

| Field                      | Value                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL display a contribution leaderboard showing top contributors ranked by edit count, quiz creation count, and annotation count, with time period filters (all-time, monthly, weekly). |
| **Priority**               | Could                                                                                                                                                                                                 |
| **Rationale**              | Leaderboards motivate contribution through social recognition and gamification.                                                                                                                       |
| **Verification Method**    | Test — verify leaderboard displays correct rankings and time period filters function                                                                                                                  |
| **Applicable Standard(s)** | None                                                                                                                                                                                                  |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                  |

---

**FR-045**

| Field                      | Value                                                                                                                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL assign reputation scores to users based on weighted contributions: page edits (1 point), accepted suggestions (5 points), quiz question creation (10 points), expert review (20 points), with decay for inactivity (>90 days without contribution reduces score by 10% per month). |
| **Priority**               | Should                                                                                                                                                                                                                                                                                                |
| **Rationale**              | Reputation scores enable trust-based content moderation. Weighting quality over quantity prevents gaming. Inactivity decay ensures current activity reflects expertise.                                                                                                                               |
| **Verification Method**    | Test — simulate contribution actions, verify reputation score changes; simulate inactivity, verify decay                                                                                                                                                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                                                  |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                  |

---

### 3.15 wikipept.com — Progress Tracking

---

**FR-046**

| Field                      | Value                                                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL track and display per-user learning metrics including: topics studied, quiz scores over time, flashcard mastery levels, learning streaks (consecutive days with activity), and overall mastery percentage. |
| **Priority**               | Must                                                                                                                                                                                                                          |
| **Rationale**              | Progress visibility motivates continued study and helps learners identify areas requiring attention. Learning streaks leverage habit formation psychology.                                                                    |
| **Verification Method**    | Test — complete study activities, verify progress dashboard updates with correct metrics                                                                                                                                      |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                          |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                          |

---

**FR-047**

| Field                      | Value                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL display a knowledge map visualization showing the learner's mastery level per topic (foundational, intermediate, advanced, expert) as a color-coded node graph with connecting prerequisite edges. |
| **Priority**               | Could                                                                                                                                                                                                                 |
| **Rationale**              | A visual knowledge map provides spatial context for learning progress and reveals prerequisite gaps that block advancement.                                                                                           |
| **Verification Method**    | Demonstration — complete partial progress, verify knowledge map renders with correct color-coding and prerequisite links                                                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                  |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                  |

---

**FR-048**

| Field                      | Value                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL gate access to advanced-topic study guides behind mastery verification, requiring the learner to score >= 80% on prerequisite-topic quizzes before unlocking the advanced content. |
| **Priority**               | Should                                                                                                                                                                                                |
| **Rationale**              | Mastery-based progression prevents learners from encountering material they are unprepared for, reducing frustration and improving learning outcomes.                                                 |
| **Verification Method**    | Test — attempt to access advanced guide without prerequisite mastery, verify access denied; complete prerequisite quizzes at >= 80%, verify access granted                                            |
| **Applicable Standard(s)** | None                                                                                                                                                                                                  |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                  |

---

### 3.16 Shared — Content Rendering

---

**FR-049**

| Field                      | Value                                                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL render MDX content with syntax-highlighted code blocks (via Shiki), LaTeX math expressions (via KaTeX), responsive tables, and embedded Astro/SolidJS components on both sites. |
| **Priority**               | Must                                                                                                                                                                                             |
| **Rationale**              | Scientific content requires code blocks for SMILES/sequence notation, LaTeX for pharmacokinetic equations, and embedded interactive components for molecular viewers and quizzes.                |
| **Verification Method**    | Test — render a test page with all content types, verify correct syntax highlighting, math rendering, table responsiveness, and component hydration                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                           |

---

**FR-050**

| Field                      | Value                                                                                                                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL generate structured data (JSON-LD) for every content page conforming to Schema.org `ScholarlyArticle` type on encyclopeptide.com and `LearningResource` type on wikipept.com, including all required properties per the applicable Schema.org type. |
| **Priority**               | Must                                                                                                                                                                                                                                                                 |
| **Rationale**              | Structured data enables search engine rich results, Google Scholar indexing (encyclopeptide.com), and educational search integration (wikipept.com). Required for SEO and discoverability.                                                                           |
| **Verification Method**    | Test — validate JSON-LD output against Schema.org validator for each page type                                                                                                                                                                                       |
| **Applicable Standard(s)** | Schema.org, Google Structured Data Guidelines                                                                                                                                                                                                                        |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                               |

---

## 4. Non-Functional Requirements

### 4.1 Performance

---

**NFR-001**

| Field                      | Value                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds at the 75th percentile across all pages on both sites, measured via Lighthouse CI in the CI/CD pipeline. |
| **Priority**               | Must                                                                                                                                                                                        |
| **Rationale**              | LCP is a Core Web Vitals metric and Google ranking signal. Slow loading degrades user experience and search visibility.                                                                     |
| **Verification Method**    | Test — Lighthouse CI assertion: LCP <= 2500ms on homepage, monograph page, study guide page, quiz page                                                                                      |
| **Applicable Standard(s)** | Core Web Vitals, Google PageSpeed Insights                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                      |

---

**NFR-002**

| Field                      | Value                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL achieve a Cumulative Layout Shift (CLS) of less than 0.1 at the 75th percentile across all pages on both sites, measured via Lighthouse CI. |
| **Priority**               | Must                                                                                                                                                         |
| **Rationale**              | CLS measures visual stability. High CLS causes accidental clicks and reading disruption, particularly harmful during quiz-taking and flashcard review.       |
| **Verification Method**    | Test — Lighthouse CI assertion: CLS <= 0.1 on all key pages                                                                                                  |
| **Applicable Standard(s)** | Core Web Vitals                                                                                                                                              |
| **Affected Site(s)**       | SHARED                                                                                                                                                       |

---

**NFR-003**

| Field                      | Value                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL achieve an Interaction to Next Paint (INP) of less than 200ms at the 75th percentile across all pages on both sites, measured via Lighthouse CI. |
| **Priority**               | Must                                                                                                                                                              |
| **Rationale**              | INP measures responsiveness. Slow INP on quiz buttons, flashcard flips, and molecular viewer controls degrades interactive experience.                            |
| **Verification Method**    | Test — Lighthouse CI assertion: INP <= 200ms on interactive pages                                                                                                 |
| **Applicable Standard(s)** | Core Web Vitals                                                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                                            |

---

**NFR-004**

| Field                      | Value                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL maintain a total initial page weight of less than 500KB (gzipped) for all content pages on both sites, excluding dynamically loaded 3D viewer data. |
| **Priority**               | Must                                                                                                                                                                 |
| **Rationale**              | Page weight directly impacts load time on mobile networks. The 500KB budget ensures fast loading on 3G and 4G connections.                                           |
| **Verification Method**    | Test — Lighthouse CI assertion: total page weight <= 512000 bytes on all key pages                                                                                   |
| **Applicable Standard(s)** | Core Web Vitals                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                               |

---

**NFR-005**

| Field                      | Value                                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL load and initialize the 3D molecular viewer within 2 seconds of the viewer element entering the viewport on encyclopeptide.com, maintaining 60fps rotation and zoom on devices with dedicated GPU. |
| **Priority**               | Must                                                                                                                                                                                                                |
| **Rationale**              | The 3D viewer is the flagship interactive feature. Slow initialization frustrates researchers who expect immediate structural exploration.                                                                          |
| **Verification Method**    | Test — Playwright performance test: measure time from viewer element visible to first rendered frame; measure frame rate during rotation                                                                            |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                |

---

**NFR-006**

| Field                      | Value                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL serve search results within 200ms for simple queries and within 500ms for complex filtered queries on both sites, measured at the 95th percentile. |
| **Priority**               | Must                                                                                                                                                                |
| **Rationale**              | Search is the primary navigation method. Slow search results cause user abandonment.                                                                                |
| **Verification Method**    | Test — automated performance test with 1000 synthetic queries measuring response time at p95                                                                        |
| **Applicable Standard(s)** | None                                                                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                              |

---

### 4.2 Accessibility

---

**NFR-007**

| Field                      | Value                                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL conform to WCAG 2.1 Level AA success criteria on all pages of both sites, including 4.5:1 contrast ratio for normal text and 3:1 for large text.                            |
| **Priority**               | Must                                                                                                                                                                                         |
| **Rationale**              | WCAG 2.1 AA is a legal requirement in many jurisdictions (Section 508, EN 301 508, European Accessibility Act). Non-compliance creates legal liability and excludes users with disabilities. |
| **Verification Method**    | Test — axe-core automated testing on all pages; manual keyboard navigation testing; screen reader testing (NVDA, VoiceOver); contrast ratio analysis                                         |
| **Applicable Standard(s)** | WCAG 2.1 Level AA, Section 508, EN 301 549                                                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                       |

---

**NFR-008**

| Field                      | Value                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide keyboard-only access to all interactive elements including the 3D molecular viewer controls (rotation, zoom, reset), quiz answer selection, flashcard flipping, and wiki edit functions on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                            |
| **Rationale**              | Keyboard accessibility is required for users with motor disabilities and power users who prefer keyboard navigation. The 3D viewer and quiz engine are high-risk components for keyboard traps.                                 |
| **Verification Method**    | Test — navigate entire quiz flow, flashcard review, and molecular viewer interaction using only keyboard; verify no keyboard traps                                                                                              |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.1.1 Keyboard, 2.1.2 No Keyboard Trap)                                                                                                                                                                            |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                          |

---

**NFR-009**

| Field                      | Value                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide alternative text descriptions for all molecular visualizations, structural diagrams, and educational illustrations on both sites, with longer descriptions for complex figures. |
| **Priority**               | Must                                                                                                                                                                                                     |
| **Rationale**              | Screen reader users cannot perceive visual molecular structures. Alternative text provides equivalent access to structural information.                                                                  |
| **Verification Method**    | Test — audit all images and visualizations for alt text presence and quality; screen reader testing to verify descriptions are meaningful                                                                |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.1.1 Non-text Content)                                                                                                                                                                     |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                   |

---

**NFR-010**

| Field                      | Value                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL use semantic HTML elements (header, nav, main, article, section, aside, footer) and ARIA landmarks on all pages of both sites to enable screen reader navigation. |
| **Priority**               | Must                                                                                                                                                                               |
| **Rationale**              | Semantic HTML provides structural semantics that screen readers use for landmark navigation, enabling users to jump directly to content regions.                                   |
| **Verification Method**    | Test — axe-core landmark validation; screen reader landmark navigation testing                                                                                                     |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.3.1 Info and Relationships, 4.1.2 Name, Role, Value)                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                                             |

---

**NFR-011**

| Field                      | Value                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide a "Skip to Main Content" link as the first focusable element on every page of both sites.                          |
| **Priority**               | Must                                                                                                                                        |
| **Rationale**              | Skip links enable keyboard and screen reader users to bypass repeated navigation blocks and reach content directly. Required by WCAG 2.4.1. |
| **Verification Method**    | Test — tab to first element on page, verify skip link appears and activates correctly                                                       |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.1 Bypass Blocks)                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                      |

---

### 4.3 Security

---

**NFR-012**

| Field                      | Value                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL enforce HTTPS for all pages and API endpoints with HSTS (HTTP Strict Transport Security) header including `includeSubDomains` and `preload` directives on both sites. |
| **Priority**               | Must                                                                                                                                                                                   |
| **Rationale**              | HTTPS prevents man-in-the-middle attacks and data interception. HSTS prevents protocol downgrade attacks and cookie hijacking.                                                         |
| **Verification Method**    | Test — verify all HTTP requests redirect to HTTPS; verify HSTS header present with correct directives                                                                                  |
| **Applicable Standard(s)** | OWASP Top 10 (A02:2021 Cryptographic Failures)                                                                                                                                         |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                 |

---

**NFR-013**

| Field                      | Value                                                                                                                                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement a Content Security Policy (CSP) header that restricts script sources to self and approved domains, blocks inline scripts (except nonce-based), and reports violations to a designated endpoint on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                     |
| **Rationale**              | CSP is the primary defense against XSS attacks. Restricting script sources prevents injection of malicious code, particularly critical for wikipept.com's user-generated content.                                                        |
| **Verification Method**    | Test — verify CSP header is present with correct directives; attempt XSS payload injection, verify it is blocked                                                                                                                         |
| **Applicable Standard(s)** | OWASP Top 10 (A03:2021 Injection), CSP Level 3                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                   |

---

**NFR-014**

| Field                      | Value                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL rate-limit API requests to 100 requests per minute per IP address for unauthenticated requests and 300 requests per minute per authenticated user for authenticated requests on both sites. |
| **Priority**               | Must                                                                                                                                                                                                         |
| **Rationale**              | Rate limiting prevents abuse, protects against DDoS amplification, and ensures fair resource allocation across users.                                                                                        |
| **Verification Method**    | Test — send 101 requests from a single IP within 1 minute, verify 429 status code returned on the 101st request                                                                                              |
| **Applicable Standard(s)** | OWASP Top 10 (A05:2021 Security Misconfiguration)                                                                                                                                                            |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                       |

---

### 4.4 Scalability

---

**NFR-015**

| Field                      | Value                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL support 500 concurrent users during peak hours in Year 1, scaling to 5,000 concurrent users by Year 5, without degradation of response time beyond the defined performance thresholds. |
| **Priority**               | Must                                                                                                                                                                                                    |
| **Rationale**              | Traffic projections indicate significant growth. Infrastructure must scale horizontally to meet demand without performance regression.                                                                  |
| **Verification Method**    | Analysis — load testing with k6 or Artillery simulating projected concurrent user loads; verify response times remain within thresholds                                                                 |
| **Applicable Standard(s)** | None                                                                                                                                                                                                    |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                  |

---

**NFR-016**

| Field                      | Value                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL maintain 99.9% uptime availability for both sites, excluding scheduled maintenance windows, as measured by Cloudflare uptime monitoring. |
| **Priority**               | Must                                                                                                                                                      |
| **Rationale**              | Downtime degrades user trust and search engine rankings. 99.9% availability allows ~8.76 hours of downtime per year.                                      |
| **Verification Method**    | Test — Cloudflare uptime monitoring reports; monthly availability calculation                                                                             |
| **Applicable Standard(s)** | Cloudflare Pages SLA                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                    |

---

### 4.5 Maintainability

---

**NFR-017**

| Field                      | Value                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL maintain a minimum of 80% code coverage (line, branch, and function coverage) across all source files, enforced as a CI/CD pipeline gate that fails the build below threshold on both sites. |
| **Priority**               | Must                                                                                                                                                                                                          |
| **Rationale**              | High code coverage reduces regression risk and enables confident refactoring. The 80% threshold balances thoroughness with development velocity.                                                              |
| **Verification Method**    | Test — run Vitest with coverage, verify coverage report meets 80% thresholds; deliberately reduce coverage and verify CI gate fails                                                                           |
| **Applicable Standard(s)** | None                                                                                                                                                                                                          |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                        |

---

**NFR-018**

| Field                      | Value                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL pass TypeScript strict mode compilation (`tsc --noEmit`) with zero errors and ESLint with zero errors on all source files in both sites' codebases. |
| **Priority**               | Must                                                                                                                                                                 |
| **Rationale**              | Type safety and linting catch bugs at build time. Strict mode prevents common JavaScript pitfalls. Zero-error enforcement ensures consistent code quality.           |
| **Verification Method**    | Test — CI/CD pipeline runs `tsc --noEmit` and `eslint src/`; any error fails the build                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                 |
| **Affected Site(s)**       | SHARED                                                                                                                                                               |

---

**NFR-019**

| Field                      | Value                                                                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL achieve a Lighthouse performance score of 90 or above, accessibility score of 95 or above, best practices score of 90 or above, and SEO score of 95 or above on all key pages of both sites, enforced via Lighthouse CI in the pipeline. |
| **Priority**               | Must                                                                                                                                                                                                                                                      |
| **Rationale**              | Lighthouse scores provide a holistic quality metric. Enforcing thresholds in CI prevents gradual quality degradation.                                                                                                                                     |
| **Verification Method**    | Test — Lighthouse CI assertions on homepage, monograph page, study guide page, quiz page                                                                                                                                                                  |
| **Applicable Standard(s)** | Core Web Vitals                                                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                    |

---

### 4.6 Internationalization

---

**NFR-020**

| Field                      | Value                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL detect the user's preferred locale from the Accept-Language header, URL path prefix, localStorage preference, and Cloudflare `cf-locale` header, in that priority order, on both sites. |
| **Priority**               | Must                                                                                                                                                                                                     |
| **Rationale**              | Multi-source locale detection ensures the correct language is served based on user context without requiring manual selection.                                                                           |
| **Verification Method**    | Test — set each detection source in isolation and in combination, verify correct locale resolution                                                                                                       |
| **Applicable Standard(s)** | ISO 639-1                                                                                                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                   |

---

**NFR-021**

| Field                      | Value                                                                                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL include `<link rel="alternate" hreflang="...">` tags for all locale variants of every page on both sites, with an `x-default` hreflang pointing to the English version. |
| **Priority**               | Should                                                                                                                                                                                   |
| **Rationale**              | Hreflang tags inform search engines of locale relationships, preventing duplicate content penalties and ensuring correct locale in search results.                                       |
| **Verification Method**    | Test — verify hreflang tags present on all pages for all locale variants; verify x-default points to English                                                                             |
| **Applicable Standard(s)** | Google International Targeting, ISO 639-1                                                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                   |

---

**NFR-022**

| Field                      | Value                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL format dates, times, numbers, and currencies according to the user's selected locale using the Intl API and ICU MessageFormat on both sites. |
| **Priority**               | Should                                                                                                                                                        |
| **Rationale**              | Locale-aware formatting prevents confusion (e.g., 1.000 vs 1,000 for "one thousand") and provides a native experience for international users.                |
| **Verification Method**    | Test — switch locale, verify date/number formatting changes accordingly                                                                                       |
| **Applicable Standard(s)** | Unicode CLDR, ICU MessageFormat                                                                                                                               |
| **Affected Site(s)**       | SHARED                                                                                                                                                        |

---

### 4.7 Reliability

---

**NFR-023**

| Field                      | Value                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL implement automated daily backups of all D1 database data with 30-day retention and off-site storage on both sites.                                     |
| **Priority**               | Must                                                                                                                                                                     |
| **Rationale**              | Data loss from database corruption, accidental deletion, or security incidents requires restoration capability. 30-day retention covers most incident discovery windows. |
| **Verification Method**    | Test — verify backup jobs run daily; perform test restore from backup; verify data integrity                                                                             |
| **Applicable Standard(s)** | None                                                                                                                                                                     |
| **Affected Site(s)**       | SHARED                                                                                                                                                                   |

---

**NFR-024**

| Field                      | Value                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL achieve a Recovery Time Objective (RTO) of 4 hours and a Recovery Point Objective (RPO) of 1 hour for both sites in the event of a catastrophic failure. |
| **Priority**               | Should                                                                                                                                                                    |
| **Rationale**              | Defined RTO/RPO targets guide disaster recovery planning and infrastructure investment. The targets balance business needs with cost.                                     |
| **Verification Method**    | Analysis — disaster recovery drill; measure time to restore from backup and verify data loss window                                                                       |
| **Applicable Standard(s)** | None                                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                                    |

---

### 4.8 SEO

---

**NFR-025**

| Field                      | Value                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL generate XML sitemaps for both sites listing all public pages with lastmod dates, submitted to Google Search Console and Bing Webmaster Tools. |
| **Priority**               | Must                                                                                                                                                            |
| **Rationale**              | XML sitemaps accelerate search engine indexing and ensure all pages are discovered, particularly important for new content publication.                         |
| **Verification Method**    | Test — verify sitemap.xml exists, lists all public pages, has valid lastmod dates; verify submission to search consoles                                         |
| **Applicable Standard(s)** | Sitemaps.org protocol, Google Search Console                                                                                                                    |
| **Affected Site(s)**       | SHARED                                                                                                                                                          |

---

**NFR-026**

| Field                      | Value                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL generate unique, descriptive `<title>` tags and `<meta name="description">` tags for every page on both sites, with locale-specific translations. |
| **Priority**               | Must                                                                                                                                                               |
| **Rationale**              | Title and description tags are the primary elements displayed in search engine results pages. Unique, descriptive tags improve click-through rates.                |
| **Verification Method**    | Test — verify every page has a unique title and description; verify translations exist for all locales                                                             |
| **Applicable Standard(s)** | Google SEO Starter Guide                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                             |

---

**NFR-027**

| Field                      | Value                                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL implement Open Graph meta tags (og:title, og:type, og:image, og:url, og:description) on all pages of both sites, with dynamically generated social card images (1200x630px) per page. |
| **Priority**               | Should                                                                                                                                                                                                 |
| **Rationale**              | Open Graph tags control how pages appear when shared on social media. Custom social cards increase click-through from social platforms.                                                                |
| **Verification Method**    | Test — verify OG tags present on all pages; verify social card images generate at 1200x630px; validate via Facebook Sharing Debugger                                                                   |
| **Applicable Standard(s)** | Open Graph Protocol                                                                                                                                                                                    |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                 |

---

### 4.9 Observability

---

**NFR-028**

| Field                      | Value                                                                                                                                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL log all server-side errors (HTTP 5xx responses, unhandled exceptions, Worker crashes) to Cloudflare Logpush with structured JSON format including timestamp, severity, request URL, user agent, and stack trace (if available) on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                                           |
| **Rationale**              | Structured error logging enables rapid diagnosis and resolution of production issues. Logpush ensures logs are persisted beyond Workers' ephemeral storage.                                                                                                    |
| **Verification Method**    | Test — trigger a server error; verify log entry appears in Logpush with all required fields                                                                                                                                                                    |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                         |

---

**NFR-029**

| Field                      | Value                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement uptime monitoring via an external service (e.g., Cloudflare Uptime Monitoring, Better Stack) that checks both sites every 60 seconds and sends alert notifications via email and webhook when downtime is detected. |
| **Priority**               | Must                                                                                                                                                                                                                                           |
| **Rationale**              | External uptime monitoring detects outages that internal monitoring may miss. Multi-channel alerts ensure rapid response regardless of team availability.                                                                                      |
| **Verification Method**    | Test — verify monitoring checks run at 60-second intervals; simulate downtime, verify alert is received                                                                                                                                        |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                         |

---

**NFR-030**

| Field                      | Value                                                                                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement real-user monitoring (RUM) via Cloudflare Web Analytics that collects Core Web Vitals (LCP, CLS, INP, FCP, TTFB) per page, per device type, and per country, without setting cookies or collecting personal data. |
| **Priority**               | Should                                                                                                                                                                                                                                       |
| **Rationale**              | RUM data reveals real-world performance that lab tests cannot capture. Privacy-first collection avoids GDPR consent requirements.                                                                                                            |
| **Verification Method**    | Test — verify Cloudflare Web Analytics script loads; verify Core Web Vitals data appears in dashboard; verify no cookies are set                                                                                                             |
| **Applicable Standard(s)** | GDPR, CCPA, Core Web Vitals                                                                                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                       |

---

## 5. Data Requirements

---

**DR-001**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store oligopeptide data in a canonical schema shared between both sites, with fields for: peptide ID, name, IUPAC name, aliases, chain length (2–20), chemical class (linear/cyclic/branched), functional category, source organisms, CAS number, UniProt ID, PDB IDs, molecular formula, molecular weight, net charge, amino acid sequence (single-letter), three-letter sequence, discovery year, therapeutic area, SMILES, InChI, and references (DOI-linked). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Rationale**              | A unified canonical schema prevents data duplication between sites and ensures consistency. The schema must capture the full multidimensional classification space of oligopeptides.                                                                                                                                                                                                                                                                                               |
| **Verification Method**    | Test — insert a record with all fields, query from both sites, verify all fields are accessible and correctly typed                                                                                                                                                                                                                                                                                                                                                                |
| **Applicable Standard(s)** | IUPAC-IUB nomenclature, FAIR Data Principles                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

---

**DR-002**

| Field                      | Value                                                                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL validate all content collection frontmatter against Zod schemas defined in `src/content/config.ts` at build time, rejecting any content file that fails validation with a descriptive error message on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                |
| **Rationale**              | Build-time validation prevents malformed content from reaching production. Zod schemas provide type safety and clear error messages for content authors.                                                                            |
| **Verification Method**    | Test — introduce a schema violation in a content file, run build, verify build fails with descriptive error                                                                                                                         |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                              |

---

**DR-003**

| Field                      | Value                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store user account data for wikipept.com in Cloudflare D1 with fields for: user ID, email, username, display name, password hash (argon2id), role (reader/editor/moderator/admin), reputation score, creation date, last login, email verified status, and locale preference. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                           |
| **Rationale**              | User data requires relational storage for authentication, authorization, and progress tracking. D1 provides edge-native SQLite with low-latency reads.                                                                                                                                         |
| **Verification Method**    | Test — create user account, verify all fields persist correctly; query by user ID, email, and username                                                                                                                                                                                         |
| **Applicable Standard(s)** | GDPR Article 5, OWASP Top 10 (A07:2021)                                                                                                                                                                                                                                                        |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                           |

---

**DR-004**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store learning progress data for wikipept.com users in Cloudflare D1 with fields for: user ID, topic ID, mastery level (foundational/intermediate/advanced/expert), quiz scores (array of {date, score, total}), flashcard states (array of {cardId, easeFactor, interval, dueDate, lastReview}), learning streak (current streak days, longest streak days, last activity date), and total study time (seconds). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Rationale**              | Progress tracking is a core wikipept.com feature. Structured storage enables progress dashboard rendering, spaced repetition scheduling, and mastery-gated content access.                                                                                                                                                                                                                                                         |
| **Verification Method**    | Test — simulate study activities, verify progress data updates correctly; query progress for a user, verify all fields are populated                                                                                                                                                                                                                                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

**DR-005**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store community contribution data for wikipept.com in Cloudflare D1 with fields for: contribution ID, user ID, contribution type (page-edit/annotation/quiz-question/flashcard), target page ID, content (Markdown), diff from previous version, timestamp, status (pending/approved/rejected), and reviewer user ID (if reviewed). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                 |
| **Rationale**              | Contribution tracking enables reputation calculation, moderation workflows, and content quality auditing.                                                                                                                                                                                                                                            |
| **Verification Method**    | Test — create contributions of each type, verify all fields persist; query contributions by user, type, and status                                                                                                                                                                                                                                   |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                                                                                                 |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                                                                 |

---

**DR-006**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store quiz question data for wikipept.com in content collections with fields for: question ID, question type (multiple-choice/fill-in-blank/matching/true-false), question text (Markdown), answer options (array for MC/matching), correct answer(s), explanation (Markdown), associated learning objectives (array), difficulty level (1–5), and source reference (DOI or page reference). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Rationale**              | Structured quiz data enables engine rendering, scoring, spaced repetition, and objective-level mastery tracking.                                                                                                                                                                                                                                                                                              |
| **Verification Method**    | Test — create quiz questions of each type, verify rendering and scoring correctness                                                                                                                                                                                                                                                                                                                           |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                                                                                                                          |

---

**DR-007**

| Field                      | Value                                                                                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store flashcard data for wikipept.com in content collections with fields for: card ID, deck ID, front content (Markdown), back content (Markdown), tags (array), difficulty (1–5), and source reference (DOI or page reference). |
| **Priority**               | Must                                                                                                                                                                                                                                              |
| **Rationale**              | Flashcard data requires both content (for rendering) and metadata (for FSRS scheduling, deck organization, and source tracking).                                                                                                                  |
| **Verification Method**    | Test — create flashcard decks, verify cards render correctly with front/back content and tags                                                                                                                                                     |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                              |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                              |

---

**DR-008**

| Field                      | Value                                                                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL cache external API responses (UniProt, PDB, ChEMBL, PubMed) in Cloudflare KV with a configurable TTL (default: 1 hour for search results, 24 hours for static reference data) and serve stale data when the upstream API is unavailable. |
| **Priority**               | Must                                                                                                                                                                                                                                                      |
| **Rationale**              | Caching reduces latency, prevents rate limit exhaustion, and provides resilience against upstream API outages. Stale-while-referenced serves cached data during outages.                                                                                  |
| **Verification Method**    | Test — make API request, verify KV cache entry created; make second request, verify cached response served; wait for TTL expiry, verify fresh data fetched                                                                                                |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                    |

---

**DR-009**

| Field                      | Value                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store molecular structure files (PDB, SDF, MOL2 formats) in Cloudflare R2 with a maximum individual file size of 100MB and serve them via public URLs or signed URLs for private assets. |
| **Priority**               | Must                                                                                                                                                                                                      |
| **Rationale**              | Molecular structure files can be large (especially for high-resolution NMR ensembles). R2 provides S3-compatible storage with zero egress fees.                                                           |
| **Verification Method**    | Test — upload structure files of varying sizes, verify retrieval via public/signed URLs                                                                                                                   |
| **Applicable Standard(s)** | PDB format, SDF format                                                                                                                                                                                    |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                      |

---

**DR-010**

| Field                      | Value                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store all user passwords using argon2id hashing with a minimum memory cost of 64MB, time cost of 3 iterations, and parallelism of 4 threads on wikipept.com. |
| **Priority**               | Must                                                                                                                                                                          |
| **Rationale**              | Argon2id is the OWASP-recommended password hashing algorithm, resistant to GPU and side-channel attacks. Minimum parameters prevent weak hashing.                             |
| **Verification Method**    | Test — create user account, verify password is stored as argon2id hash; verify raw password is never stored or logged                                                         |
| **Applicable Standard(s)** | OWASP Top 10 (A02:2021 Cryptographic Failures), NIST SP 800-63B                                                                                                               |
| **Affected Site(s)**       | WIKI                                                                                                                                                                          |

---

**DR-011**

| Field                      | Value                                                                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store translation strings for both sites as JSON files organized by locale in `src/i18n/locales/{locale}.json`, with namespace separation for UI strings, scientific glossary terms, and content metadata. |
| **Priority**               | Must                                                                                                                                                                                                                        |
| **Rationale**              | Namespace separation prevents translation conflicts between UI strings (which change with feature development) and scientific glossary (which requires domain expert review).                                               |
| **Verification Method**    | Test — verify all required namespaces exist for each locale; verify missing translations fall back to English                                                                                                               |
| **Applicable Standard(s)** | ICU MessageFormat                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                      |

---

**DR-012**

| Field                      | Value                                                                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement a master glossary of 500+ oligopeptide domain terms stored as structured JSON with fields for: term ID, English term, definition, part of speech, related terms (array of term IDs), and locale translations (map of locale code to translated term). |
| **Priority**               | Should                                                                                                                                                                                                                                                                           |
| **Rationale**              | A glossary ensures consistent translation of domain-specific terminology across all locales. Version control enables tracking terminology evolution.                                                                                                                             |
| **Verification Method**    | Test — verify glossary contains 500+ terms; verify all terms have English definition and at least 2 locale translations                                                                                                                                                          |
| **Applicable Standard(s)** | Unicode CLDR                                                                                                                                                                                                                                                                     |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                           |

---

**DR-013**

| Field                      | Value                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL implement search indexing using Pagefind (static content) and FlexSearch (dynamic content) with indices rebuilt on every production build and incremental updates for wiki edits within 1 hour on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                           |
| **Rationale**              | Search freshness ensures new and edited content is discoverable promptly. Static indexing at build time covers published content; incremental updates cover wiki edits.                                                        |
| **Verification Method**    | Test — publish new content, verify it appears in search within build cycle; edit wiki page, verify it appears in search within 1 hour                                                                                          |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                         |

---

**DR-014**

| Field                      | Value                                                                                                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store Open Graph social card images as static assets generated at build time in PNG format at 1200x630px resolution, stored in R2 and served via Cloudflare Images for optimization (WebP/AVIF conversion, responsive resizing) on both sites. |
| **Priority**               | Should                                                                                                                                                                                                                                                          |
| **Rationale**              | Pre-generated social cards ensure consistent, high-quality previews on social media. Cloudflare Images optimization reduces file size without manual image processing.                                                                                          |
| **Verification Method**    | Test — verify social card images exist for all key pages; verify Cloudflare Images serves optimized variants                                                                                                                                                    |
| **Applicable Standard(s)** | Open Graph Protocol                                                                                                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                          |

---

**DR-015**

| Field                      | Value                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement data retention policies: user account data retained for 3 years after last login, learning progress data retained for 5 years, community contributions retained indefinitely (attributed), analytics data retained for 2 years, and backups retained for 30 days, on wikipept.com. |
| **Priority**               | Should                                                                                                                                                                                                                                                                                                        |
| **Rationale**              | Data retention policies comply with GDPR data minimization principles and prevent indefinite accumulation of stale data. Learning progress has longer retention due to educational value.                                                                                                                     |
| **Verification Method**    | Test — verify automated data purge jobs run on schedule; verify retained data matches policy                                                                                                                                                                                                                  |
| **Applicable Standard(s)** | GDPR Article 5(1)(e) (Storage Limitation)                                                                                                                                                                                                                                                                     |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                          |

---

## 6. Integration Requirements

---

**IR-001**

| Field                      | Value                                                                                                                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL deploy both sites to Cloudflare Pages with automatic builds triggered on push to the main branch, preview deployments for pull requests, and custom domain configuration (encyclopeptide.com, wikipept.com) with auto-provisioned SSL/TLS certificates. |
| **Priority**               | Must                                                                                                                                                                                                                                                                     |
| **Rationale**              | Cloudflare Pages provides global edge hosting with zero-configuration deployment. Preview deployments enable safe testing of changes before production.                                                                                                                  |
| **Verification Method**    | Test — push to main, verify production build completes; create PR, verify preview URL is generated; verify custom domains resolve with valid certificates                                                                                                                |
| **Applicable Standard(s)** | Cloudflare Pages SLA                                                                                                                                                                                                                                                     |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                   |

---

**IR-002**

| Field                      | Value                                                                                                                                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement Cloudflare Pages Functions (Workers) for all server-side logic on wikipept.com including: user authentication endpoints, community edit submission, progress tracking sync, search API, and quiz submission processing, with each function adhering to the 50ms CPU time limit. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                       |
| **Rationale**              | Pages Functions provide serverless compute at the edge with sub-millisecond cold starts. CPU time limits require careful function design but ensure predictable performance.                                                                                                                               |
| **Verification Method**    | Test — invoke each function endpoint, verify correct response; monitor CPU time via wrangler logs, verify <50ms per request                                                                                                                                                                                |
| **Applicable Standard(s)** | Cloudflare Workers Runtime API                                                                                                                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                       |

---

**IR-003**

| Field                      | Value                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL integrate with the UniProt REST API to fetch protein/peptide data, caching responses in Cloudflare KV with a 24-hour TTL, and falling back to cached stale data when the UniProt API is unavailable or rate-limited. |
| **Priority**               | Must                                                                                                                                                                                                                                  |
| **Rationale**              | UniProt provides authoritative protein sequence and annotation data. Caching prevents rate limit exhaustion (100 req/sec) and provides resilience against upstream outages.                                                           |
| **Verification Method**    | Test — request peptide data from UniProt-integrated endpoint, verify response; block UniProt API, verify cached response served                                                                                                       |
| **Applicable Standard(s)** | UniProt API documentation                                                                                                                                                                                                             |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                  |

---

**IR-004**

| Field                      | Value                                                                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL integrate with the RCSB PDB API to fetch 3D structural data (PDB files, structural annotations), caching responses in Cloudflare KV with a 24-hour TTL, and limiting subrequests to a maximum of 50 per incoming request. |
| **Priority**               | Must                                                                                                                                                                                                                                       |
| **Rationale**              | PDB provides experimentally determined 3D structures essential for the molecular viewer. Subrequest limits prevent Workers from exceeding runtime constraints.                                                                             |
| **Verification Method**    | Test — request PDB data for a known structure, verify PDB file content; count subrequests, verify limit enforced                                                                                                                           |
| **Applicable Standard(s)** | PDB API documentation, Cloudflare Workers subrequest limits                                                                                                                                                                                |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                       |

---

**IR-005**

| Field                      | Value                                                                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL integrate with the ChEMBL API to fetch bioactivity data (binding affinities, assay results), caching responses in Cloudflare KV with a 1-hour TTL due to higher update frequency. |
| **Priority**               | Should                                                                                                                                                                                             |
| **Rationale**              | ChEMBL provides pharmacological activity data essential for receptor binding tables. Shorter TTL reflects the database's active curation cycle.                                                    |
| **Verification Method**    | Test — request ChEMBL data for a known compound, verify activity data returned; verify cache TTL enforcement                                                                                       |
| **Applicable Standard(s)** | ChEMBL API documentation                                                                                                                                                                           |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                               |

---

**IR-006**

| Field                      | Value                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL integrate with the NCBI E-utilities (PubMed) API for literature search and citation retrieval, using an API key for authenticated access (3 requests/second limit), caching search results in KV with a 1-hour TTL. |
| **Priority**               | Should                                                                                                                                                                                                                               |
| **Rationale**              | PubMed is the primary literature source for scientific citations. API key access provides higher rate limits and reliable service.                                                                                                   |
| **Verification Method**    | Test — search PubMed via integrated endpoint, verify citation results; verify API key is used; verify rate limit compliance                                                                                                          |
| **Applicable Standard(s)** | NCBI E-utilities documentation                                                                                                                                                                                                       |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                 |

---

**IR-007**

| Field                      | Value                                                                                                                                                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement a `_headers` file for both sites specifying: Content-Security-Policy, Strict-Transport-Security (max-age=31536000; includeSubDomains; preload), X-Content-Type-Options (nosniff), X-Frame-Options (DENY), Referrer-Policy (strict-origin-when-cross-origin), and Permissions-Policy. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                            |
| **Rationale**              | Security headers protect against clickjacking, MIME sniffing, protocol downgrade attacks, and unauthorized feature usage. Cloudflare Pages serves these headers at the edge.                                                                                                                                    |
| **Verification Method**    | Test — fetch any page, verify all required security headers are present with correct values                                                                                                                                                                                                                     |
| **Applicable Standard(s**) | OWASP Secure Headers Project, NIST SP 800-53 SC-8                                                                                                                                                                                                                                                               |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                          |

---

**IR-008**

| Field                      | Value                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement Cloudflare Durable Objects for the wiki editing system on wikipept.com to provide strong consistency for edit conflict detection and real-time collaboration features (live cursors, presence indicators). |
| **Priority**               | Should                                                                                                                                                                                                                                |
| **Rationale**              | Durable Objects provide strong consistency (unlike KV's eventual consistency), which is required for detecting simultaneous edits to the same page. WebSocket support enables real-time collaboration.                                |
| **Verification Method**    | Test — simulate concurrent edits to the same page, verify conflict detection; test WebSocket connection for live presence                                                                                                             |
| **Applicable Standard(s)** | Cloudflare Durable Objects documentation                                                                                                                                                                                              |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                  |

---

**IR-009**

| Field                      | Value                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement OAuth 2.0 / OpenID Connect authentication for wikipept.com user accounts, supporting email/password authentication as the primary method and Google/GitHub OAuth as optional social login providers. |
| **Priority**               | Must                                                                                                                                                                                                                            |
| **Rationale**              | OAuth 2.0/OIDC is the industry standard for web authentication. Social login reduces registration friction. Email/password remains necessary for users without social accounts.                                                 |
| **Verification Method**    | Test — register with email/password, log in, verify session; register with Google OAuth, verify session; verify token refresh and logout                                                                                        |
| **Applicable Standard(s)** | RFC 6749 (OAuth 2.0), OpenID Connect Core 1.0                                                                                                                                                                                   |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                            |

---

**IR-010**

| Field                      | Value                                                                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL implement Cloudflare Web Analytics (cookie-free, privacy-first) on both sites, with the analytics script loaded via Cloudflare Rules (not as a third-party script) to ensure compliance with GDPR without requiring cookie consent banners. |
| **Priority**               | Must                                                                                                                                                                                                                                                         |
| **Rationale**              | Analytics are essential for understanding user behavior and improving content. Cookie-free analytics avoid GDPR consent requirements while providing actionable insights.                                                                                    |
| **Verification Method**    | Test — verify analytics script loads; verify no cookies are set; verify data appears in Cloudflare Web Analytics dashboard                                                                                                                                   |
| **Applicable Standard(s)** | GDPR, CCPA                                                                                                                                                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                       |

---

## 7. Design Requirements

---

**DesR-001**

| Field                      | Value                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL use a visual identity based on Dark Navy (#1B2A4A) as the primary color, White (#FFFFFF) as the secondary color, and Gold (#C9A84C) as the accent color, with no rounded corners on any UI components. |
| **Priority**               | Must                                                                                                                                                                                                                            |
| **Rationale**              | The clinical, journal-like visual identity communicates authority and scientific rigor, aligning with the target audience's expectations for a formal reference resource.                                                       |
| **Verification Method**    | Inspection — review all component designs against color palette and border-radius specifications                                                                                                                                |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                            |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                            |

---

**DesR-002**

| Field                      | Value                                                                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | wikipept.com SHALL use a visual identity based on Teal (#0097A7) as the primary color, White (#FFFFFF) as the secondary color, and Coral (#FF6F61) as the accent color, with 16px border-radius on cards and 8px border-radius on buttons. |
| **Priority**               | Must                                                                                                                                                                                                                                       |
| **Rationale**              | The warm, card-based visual identity communicates approachability and engagement, aligning with the target audience's expectations for an educational platform.                                                                            |
| **Verification Method**    | Inspection — review all component designs against color palette and border-radius specifications                                                                                                                                           |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                       |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                       |

---

**DesR-003**

| Field                      | Value                                                                                                                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL use Playfair Display (serif) for headings (H1: 36px/700, H2: 28px/600, H3: 22px/600), Inter (sans-serif) for body text (16px/400, line-height 1.7), and JetBrains Mono for sequences, code, and SMILES notation (14px/400). |
| **Priority**               | Must                                                                                                                                                                                                                                                 |
| **Rationale**              | Playfair Display conveys scholarly tradition. Inter ensures readability. JetBrains Mono provides clear distinction for scientific notation.                                                                                                          |
| **Verification Method**    | Inspection — verify font families, sizes, weights, and line-heights match specifications across all page types                                                                                                                                       |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.4.4 Resize Text)                                                                                                                                                                                                                      |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                                 |

---

**DesR-004**

| Field                      | Value                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL use Inter (sans-serif) for both headings (H1: 32px/700, H2: 26px/600, H3: 20px/600) and body text (16px/400, line-height 1.75), and JetBrains Mono for sequences, code, and chemical notation (14px/400). |
| **Priority**               | Must                                                                                                                                                                                                                         |
| **Rationale**              | Using Inter throughout creates a modern, friendly appearance. Consistent typography reduces cognitive load for students.                                                                                                     |
| **Verification Method**    | Inspection — verify font families, sizes, weights, and line-heights match specifications                                                                                                                                     |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.4.4 Resize Text)                                                                                                                                                                                              |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                         |

---

**DesR-005**

| Field                      | Value                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL use a maximum content width of 960px with a 12-column grid and 16px gutter, with 24px minimum spacing between sections.  |
| **Priority**               | Must                                                                                                                                              |
| **Rationale**              | 960px provides optimal line length for academic reading (60–80 characters per line). The grid system enables consistent layout across page types. |
| **Verification Method**    | Inspection — verify content width at largest breakpoint; verify grid column count and gutter width                                                |
| **Applicable Standard(s)** | None                                                                                                                                              |
| **Affected Site(s)**       | ENCP                                                                                                                                              |

---

**DesR-006**

| Field                      | Value                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | wikipept.com SHALL use a maximum content width of 720px with a responsive flexbox/grid layout, card-based components with 16px padding, 8px shadow (0 2px 8px rgba(0,0,0,0.08)), and 16px border-radius. |
| **Priority**               | Must                                                                                                                                                                                                     |
| **Rationale**              | 720px creates a focused reading experience suitable for study guides. Card-based layout enables modular content organization.                                                                            |
| **Verification Method**    | Inspection — verify content width; verify card component specifications (padding, shadow, radius)                                                                                                        |
| **Applicable Standard(s)** | None                                                                                                                                                                                                     |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                     |

---

**DesR-007**

| Field                      | Value                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide a shared SolidJS component library for both sites including: Button, Card, Input, Select, Modal, Tooltip, Tabs, Tag, Alert, Breadcrumb, Pagination, and Table components, with site-specific style variants driven by CSS custom properties. |
| **Priority**               | Must                                                                                                                                                                                                                                                                  |
| **Rationale**              | A shared component library reduces development duplication while enabling site-specific visual identity through theming. CSS custom properties enable runtime theme switching.                                                                                        |
| **Verification Method**    | Inspection — verify all listed components exist in the shared library; verify site-specific variants render correctly with theme tokens                                                                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                |

---

**DesR-008**

| Field                      | Value                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement site-specific theme tokens as CSS custom properties in `:root` blocks, with dark mode variants defined under `@media (prefers-color-scheme: dark)` or `[data-theme="dark"]` selectors on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                            |
| **Rationale**              | CSS custom properties enable runtime theme switching without JavaScript. Dark mode variants must be defined per-site due to different color palettes.                                                                           |
| **Verification Method**    | Test — verify all theme tokens are defined in `:root` and dark mode variants exist; toggle dark mode, verify visual changes                                                                                                     |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                            |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                          |

---

**DesR-009**

| Field                      | Value                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL render data tables with full-width layout, sortable column headers, filter controls, alternating row backgrounds (#FFFFFF / #F5F5F5), and 1px solid borders (#E0E0E0). |
| **Priority**               | Must                                                                                                                                                                                            |
| **Rationale**              | Data-dense tables are the primary content format for pharmacokinetic and binding data. Sortable/filterable tables enable rapid data extraction.                                                 |
| **Verification Method**    | Test — verify table renders with correct styling, sort by each column, apply filters                                                                                                            |
| **Applicable Standard(s)** | None                                                                                                                                                                                            |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                            |

---

**DesR-010**

| Field                      | Value                                                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | wikipept.com SHALL render quiz and flashcard components with prominent call-to-action buttons (Coral accent), smooth flip animations (300ms ease-in-out for flashcards), immediate visual feedback (green for correct, red for incorrect), and progress indicators (percentage bar). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                 |
| **Rationale**              | Interactive learning components need clear visual hierarchy, satisfying feedback, and progress visibility to maintain engagement.                                                                                                                                                    |
| **Verification Method**    | Demonstration — complete quiz and flashcard flow, verify visual feedback and animations                                                                                                                                                                                              |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                                                 |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                 |

---

**DesR-011**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL render all color combinations used for text and interactive elements to meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components), with the following minimum verified combinations: Dark Navy on White, Charcoal on White, Gold on Dark Navy, Teal on White, Coral on White, Coral on Teal. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                               |
| **Rationale**              | Contrast compliance is legally required and ensures readability for users with low vision. Specific combinations must be verified because the teal-on-white combination (3.0:1) requires adjustment to meet AA.                                                                                                                                    |
| **Verification Method**    | Test — automated contrast ratio testing on all color combinations used in components; manual verification of critical paths                                                                                                                                                                                                                        |
| **Applicable Standard(s)** | WCAG 2.1 AA (1.4.3 Contrast Minimum)                                                                                                                                                                                                                                                                                                               |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                             |

---

**DesR-012**

| Field                      | Value                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL provide a focus indicator (2px solid outline with 2px offset) on all interactive elements (links, buttons, inputs, tabs) that is visible in both light and dark modes on both sites. |
| **Priority**               | Must                                                                                                                                                                                                  |
| **Rationale**              | Visible focus indicators are required by WCAG 2.4.7 and essential for keyboard-only users to track their position on the page.                                                                        |
| **Verification Method**    | Test — tab through all interactive elements, verify focus indicator is visible and meets 3:1 contrast against background                                                                              |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.4.7 Focus Visible)                                                                                                                                                                     |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                |

---

**DesR-013**

| Field                      | Value                                                                                                                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement Astro View Transitions with `fade` transitions for same-layout navigations and `slide` transitions for cross-layout navigations on both sites, with reduced-motion support that disables animations when the user's OS prefers reduced motion. |
| **Priority**               | Should                                                                                                                                                                                                                                                                    |
| **Rationale**              | View transitions provide smooth navigation experience. Reduced-motion support is required for users with vestibular disorders.                                                                                                                                            |
| **Verification Method**    | Test — navigate between pages, verify transitions fire; enable reduced-motion preference, verify animations are disabled                                                                                                                                                  |
| **Applicable Standard(s)** | WCAG 2.1 AA (2.3.3 Animation from Interactions)                                                                                                                                                                                                                           |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                    |

---

**DesR-014**

| Field                      | Value                                                                                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | encyclopeptide.com SHALL render the molecular viewer component as a full-width element on monograph pages with a minimum height of 400px on desktop and 280px on mobile, with a toolbar for rotation, zoom, reset, and screenshot functions. |
| **Priority**               | Must                                                                                                                                                                                                                                         |
| **Rationale**              | The molecular viewer is the primary interactive feature on monographs. Adequate sizing ensures structural detail is visible. The toolbar provides essential controls.                                                                        |
| **Verification Method**    | Test — verify viewer renders at specified dimensions on desktop and mobile; verify toolbar functions work                                                                                                                                    |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                         |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                         |

---

**DesR-015**

| Field                      | Value                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | wikipept.com SHALL render the progress dashboard as a right sidebar (280px width) on desktop and as a collapsible bottom sheet on mobile, displaying: current streak, mastery overview, recent activity, and recommended next topic. |
| **Priority**               | Should                                                                                                                                                                                                                               |
| **Rationale**              | Persistent progress visibility motivates continued learning. Desktop sidebar provides at-a-glance awareness; mobile bottom sheet preserves screen space.                                                                             |
| **Verification Method**    | Test — verify sidebar renders on desktop at 280px; verify bottom sheet on mobile; verify all metrics display correctly                                                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                 |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                 |

---

**DesR-016**

| Field                      | Value                                                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL render error pages (404 Not Found, 500 Internal Server Error) with site-specific branding, helpful navigation links, a search bar, and a link to the homepage on both sites. |
| **Priority**               | Should                                                                                                                                                                                        |
| **Rationale**              | Branded error pages maintain user trust and provide recovery paths. Generic error pages frustrate users and increase bounce rates.                                                            |
| **Verification Method**    | Test — navigate to a non-existent URL, verify 404 page renders with correct branding and navigation; trigger server error, verify 500 page renders                                            |
| **Applicable Standard(s)** | None                                                                                                                                                                                          |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                        |

---

**DesR-017**

| Field                      | Value                                                                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL render all icons using a consistent icon set (Lucide or Heroicons) with 24x24px default size, 1.5px stroke width, and site-specific color theming (Gold accent for encyclopeptide.com, Coral accent for wikipept.com) on both sites. |
| **Priority**               | Could                                                                                                                                                                                                                                                 |
| **Rationale**              | Consistent iconography creates visual coherence. A single icon set reduces design debt and ensures style consistency across components.                                                                                                               |
| **Verification Method**    | Inspection — verify all icons use the selected set; verify size, stroke width, and color specifications                                                                                                                                               |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                |

---

**DesR-018**

| Field                      | Value                                                                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL render all images using responsive `srcset` attributes with WebP/AVIF format via Cloudflare Images, providing at least 3 resolution variants (1x, 2x, 3x) for all content images on both sites. |
| **Priority**               | Should                                                                                                                                                                                                           |
| **Rationale**              | Responsive images prevent serving oversized images to small screens. Modern formats (WebP/AVIF) reduce file size by 30-50% compared to PNG/JPEG.                                                                 |
| **Verification Method**    | Test — inspect image elements for srcset attributes; verify Cloudflare Images serves WebP/AVIF variants                                                                                                          |
| **Applicable Standard(s)** | None                                                                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                           |

---

**DesR-019**

| Field                      | Value                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL render a consistent loading skeleton (pulsing gray placeholder) for all async content areas (molecular viewer, search results, quiz questions, progress dashboard) while data is being fetched on both sites. |
| **Priority**               | Could                                                                                                                                                                                                                          |
| **Rationale**              | Loading skeletons provide perceived performance improvement and reduce layout shift compared to blank spaces or spinners.                                                                                                      |
| **Verification Method**    | Demonstration — slow network simulation, verify skeleton displays during loading states                                                                                                                                        |
| **Applicable Standard(s)** | Core Web Vitals (CLS)                                                                                                                                                                                                          |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                         |

---

**DesR-020**

| Field                      | Value                                                                                                                                                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement responsive typography using CSS `clamp()` functions for heading sizes, ensuring H1 scales from 24px (mobile) to 36px (desktop) on encyclopeptide.com and from 24px (mobile) to 32px (desktop) on wikipept.com. |
| **Priority**               | Should                                                                                                                                                                                                                                    |
| **Rationale**              | Fluid typography prevents abrupt size jumps at breakpoint thresholds and ensures headings are appropriately sized on all viewports.                                                                                                       |
| **Verification Method**    | Test — resize browser from 320px to 2560px, verify heading sizes scale smoothly                                                                                                                                                           |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                    |

---

## 8. Security Requirements

---

**SR-001**

| Field                      | Value                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL enforce multi-factor authentication (MFA) for all admin accounts on wikipept.com, requiring a second factor (TOTP or WebAuthn) in addition to the primary credential. |
| **Priority**               | Must                                                                                                                                                                                   |
| **Rationale**              | Admin accounts have elevated privileges (content moderation, user management, site configuration). MFA prevents credential compromise from granting full access.                       |
| **Verification Method**    | Test — attempt admin login without MFA, verify access denied; login with MFA, verify access granted                                                                                    |
| **Applicable Standard(s)** | NIST SP 800-63B, OWASP Top 10 (A07:2021)                                                                                                                                               |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                   |

---

**SR-002**

| Field                      | Value                                                                                                                                                                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement role-based access control (RBAC) for wikipept.com with four roles: reader (read-only), editor (create/edit own content), moderator (review/edit all content, manage flags), and admin (full system access), with each role inheriting permissions from the previous tier. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                 |
| **Rationale**              | RBAC enforces least-privilege access. Tiered permissions enable gradual trust elevation as contributors demonstrate reliability.                                                                                                                                                                     |
| **Verification Method**    | Test — log in as each role, verify permitted and denied actions match role specification                                                                                                                                                                                                             |
| **Applicable Standard(s)** | NIST SP 800-53 AC-3, OWASP Top 10 (A01:2021)                                                                                                                                                                                                                                                         |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                 |

---

**SR-003**

| Field                      | Value                                                                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement account lockout after 5 consecutive failed login attempts on wikipept.com, with a 15-minute lockout duration and exponential backoff for repeated lockouts (15min, 30min, 60min, 120min). |
| **Priority**               | Must                                                                                                                                                                                                                 |
| **Rationale**              | Account lockout prevents brute-force password attacks. Exponential backoff slows automated attacks while limiting inconvenience for legitimate users who mistype passwords.                                          |
| **Verification Method**    | Test — enter wrong password 5 times, verify account locked for 15 minutes; repeat, verify exponential backoff                                                                                                        |
| **Applicable Standard(s)** | NIST SP 800-53 AC-7, OWASP Top 10 (A07:2021)                                                                                                                                                                         |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                 |

---

**SR-004**

| Field                      | Value                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL sanitize all user-generated content (wiki edits, annotations, quiz questions, profile fields) on wikipept.com to strip HTML tags except a whitelist of safe elements (p, br, strong, em, a, ul, ol, li, code, pre, blockquote, h1-h6, table, thead, tbody, tr, th, td, img), preventing stored XSS attacks. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                         |
| **Rationale**              | Stored XSS is the most critical vulnerability in wiki systems. A whitelist approach prevents injection of script tags, event handlers, and other dangerous HTML.                                                                                                                                                             |
| **Verification Method**    | Test — submit content containing `<script>`, `<img onerror=...>`, `<a href="javascript:...">`, verify they are stripped/sanitized                                                                                                                                                                                            |
| **Applicable Standard(s)** | OWASP Top 10 (A03:2021 Injection), OWASP XSS Prevention Cheat Sheet                                                                                                                                                                                                                                                          |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                                                         |

---

**SR-005**

| Field                      | Value                                                                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement CSRF protection on all state-changing requests (POST, PUT, DELETE) on wikipept.com using double-submit cookie pattern with a cryptographically random token (128-bit minimum) that expires after 1 hour. |
| **Priority**               | Must                                                                                                                                                                                                                                |
| **Rationale**              | CSRF attacks trick authenticated users into performing unintended actions. Double-submit cookie pattern is suitable for Cloudflare Workers where server-side session state is limited.                                              |
| **Verification Method**    | Test — submit state-changing request without CSRF token, verify 403 response; submit with valid token, verify success; submit with expired token, verify 403                                                                        |
| **Applicable Standard(s)** | OWASP CSRF Prevention Cheat Sheet                                                                                                                                                                                                   |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                |

---

**SR-006**

| Field                      | Value                                                                                                                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement input validation on all user inputs (search queries, form fields, API parameters) using Zod schemas, rejecting inputs that fail validation with descriptive error messages (without revealing internal schema details) on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                                             |
| **Rationale**              | Input validation prevents injection attacks, data corruption, and unexpected behavior. Zod schemas provide type-safe validation with clear error messages.                                                                                                       |
| **Verification Method**    | Test — submit inputs with invalid characters, excessive length, wrong types; verify rejection with safe error messages                                                                                                                                           |
| **Applicable Standard(s)** | OWASP Input Validation Cheat Sheet                                                                                                                                                                                                                               |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                           |

---

**SR-007**

| Field                      | Value                                                                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement session management for wikipept.com using cryptographically random session IDs (256-bit minimum) stored in HttpOnly, Secure, SameSite=Lax cookies with a 24-hour expiration and absolute timeout of 7 days. |
| **Priority**               | Must                                                                                                                                                                                                                                   |
| **Rationale**              | Secure session management prevents session hijacking, fixation, and replay attacks. HttpOnly prevents XSS from stealing session cookies. SameSite prevents CSRF.                                                                       |
| **Verification Method**    | Test — verify session cookie has HttpOnly, Secure, SameSite=Lax attributes; verify session expires after 24 hours of inactivity and 7 days absolutely                                                                                  |
| **Applicable Standard(s)** | OWASP Session Management Cheat Sheet, NIST SP 800-53 AC-12                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                   |

---

**SR-008**

| Field                      | Value                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL store all API keys (UniProt, PubMed, ChEMBL, OAuth secrets) as encrypted secrets in Cloudflare Workers secrets, never in source code, environment variables committed to Git, or client-side JavaScript on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                    |
| **Rationale**              | Exposed API keys enable unauthorized access to external services, data breaches, and financial liability. Cloudflare Workers secrets are encrypted at rest and only accessible to the Worker.                                           |
| **Verification Method**    | Audit — grep source code and Git history for API key patterns; verify all secrets are configured via Cloudflare dashboard or `wrangler secret put`                                                                                      |
| **Applicable Standard(s)** | OWASP Top 10 (A02:2021 Cryptographic Failures)                                                                                                                                                                                          |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                  |

---

**SR-009**

| Field                      | Value                                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement Subresource Integrity (SRI) hashes on all externally loaded scripts and stylesheets on both sites, with integrity attributes matching the exact content of the loaded resource. |
| **Priority**               | Should                                                                                                                                                                                                     |
| **Rationale**              | SRI prevents tampering with third-party resources (CDN-hosted libraries) by verifying content integrity. Critical when loading molecular viewer libraries from external CDNs.                              |
| **Verification Method**    | Test — verify SRI hashes present on all external script/stylesheet tags; tamper with hash, verify resource fails to load                                                                                   |
| **Applicable Standard(s)** | W3C SRI specification                                                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                     |

---

**SR-010**

| Field                      | Value                                                                                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement a dependency vulnerability scanning pipeline using `npm audit` and Snyk that runs on every CI/CD build, failing the build for critical vulnerabilities and generating warnings for high-severity vulnerabilities on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                                       |
| **Rationale**              | Vulnerable dependencies are the most common attack vector. Automated scanning prevents known vulnerabilities from reaching production.                                                                                                                     |
| **Verification Method**    | Test — introduce a dependency with a known critical vulnerability, verify build fails; introduce high-severity vulnerability, verify warning generated                                                                                                     |
| **Applicable Standard(s)** | OWASP Top 10 (A06:2021 Vulnerable and Outdated Components)                                                                                                                                                                                                 |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                     |

---

**SR-011**

| Field                      | Value                                                                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement SQL injection prevention on all D1 database queries using parameterized queries (prepared statements), never constructing SQL strings from user input on wikipept.com. |
| **Priority**               | Must                                                                                                                                                                                              |
| **Rationale**              | SQL injection is OWASP's most critical web application vulnerability. Parameterized queries completely prevent SQL injection by separating code from data.                                        |
| **Verification Method**    | Audit — review all D1 query code for string concatenation; test with SQL injection payloads (`' OR 1=1 --`), verify no data leakage                                                               |
| **Applicable Standard(s)** | OWASP Top 10 (A03:2021 Injection)                                                                                                                                                                 |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                              |

---

**SR-012**

| Field                      | Value                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement email verification for all new user registrations on wikipept.com, requiring the user to click a verification link within 24 hours before their account is activated and they can contribute content. |
| **Priority**               | Must                                                                                                                                                                                                                             |
| **Rationale**              | Email verification prevents fake account creation, ensures a communication channel for security notifications, and reduces spam contributions.                                                                                   |
| **Verification Method**    | Test — register with valid email, verify verification email sent; click link, verify account activated; register with invalid email, verify account remains inactive                                                             |
| **Applicable Standard(s)** | None                                                                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                             |

---

**SR-013**

| Field                      | Value                                                                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement password complexity requirements on wikipept.com: minimum 12 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, with the password checked against the Have I Been Pwned (HIBP) breached password database. |
| **Priority**               | Should                                                                                                                                                                                                                                                                             |
| **Rationale**              | Strong passwords resist brute-force and credential stuffing attacks. HIBP integration prevents use of known-breached passwords. NIST SP 800-63B recommends 12+ character minimums.                                                                                                 |
| **Verification Method**    | Test — attempt registration with weak passwords, verify rejection; attempt with breached password, verify rejection; attempt with compliant password, verify acceptance                                                                                                            |
| **Applicable Standard(s)** | NIST SP 800-63B                                                                                                                                                                                                                                                                    |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                               |

---

**SR-014**

| Field                      | Value                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement security audit logging for all administrative actions (user role changes, content deletions, site configuration changes) and authentication events (login, logout, password reset, MFA setup) on wikipept.com, retaining logs for 90 days. |
| **Priority**               | Must                                                                                                                                                                                                                                                                  |
| **Rationale**              | Audit logs enable forensic investigation of security incidents, detect unauthorized access, and satisfy compliance requirements. 90-day retention covers most incident discovery windows.                                                                             |
| **Verification Method**    | Test — perform admin actions and authentication events, verify log entries are created with timestamp, actor, action, and target                                                                                                                                      |
| **Applicable Standard(s)** | NIST SP 800-53 AU-2, AU-3                                                                                                                                                                                                                                             |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                  |

---

**SR-015**

| Field                      | Value                                                                                                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement a "Do Not Sell My Personal Information" page and mechanism on both sites, allowing California residents to opt out of any personal information sharing with third parties, as required by CCPA. |
| **Priority**               | Must                                                                                                                                                                                                                       |
| **Rationale**              | CCPA requires a clear and conspicuous "Do Not Sell" link on the homepage and a mechanism for consumers to opt out. Non-compliance risks fines up to $7,500 per violation.                                                  |
| **Verification Method**    | Test — verify "Do Not Sell" link is present in the site footer; verify opt-out mechanism records the user's preference                                                                                                     |
| **Applicable Standard(s)** | CCPA § 1798.120, § 1798.135                                                                                                                                                                                                |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                     |

---

## 9. Compliance Requirements

---

**CR-001**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL comply with GDPR (EU) 2016/679 for all processing of personal data of EU/EEA residents, including: lawful basis for processing (legitimate interest for encyclopeptide.com, consent for wikipept.com accounts), privacy notices (Articles 13/14), data subject rights (access, rectification, erasure, portability, objection — Articles 15-22), data protection by design (Article 25), and data breach notification (Article 33). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Rationale**              | GDPR is legally binding for any service processing EU/EEA residents' personal data. Non-compliance risks fines up to 4% of annual global turnover or €20 million.                                                                                                                                                                                                                                                                                    |
| **Verification Method**    | Audit — review privacy notices against GDPR Article 13/14 requirements; test data subject rights mechanisms (access, deletion, export); verify DPIA is conducted for wikipept.com                                                                                                                                                                                                                                                                    |
| **Applicable Standard(s)** | GDPR (EU) 2016/679                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

**CR-002**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL comply with CCPA (California) Civil Code §§ 1798.100–1798.199 for California residents, including: disclosure of categories of personal information collected (§ 1798.110), right to know (§ 1798.100), right to delete (§ 1798.105), right to correct (§ 1798.106), right to opt-out of sale/sharing (§ 1798.120), and non-discrimination for exercising rights (§ 1798.125). |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                            |
| **Rationale**              | CCPA applies if annual revenue exceeds $25M or if personal information of 100,000+ California residents is processed. Given projected traffic, applicability is likely.                                                                                                                                                                                                                         |
| **Verification Method**    | Audit — review privacy policy against CCPA requirements; verify "Do Not Sell" link and mechanism; test deletion and correction request processes                                                                                                                                                                                                                                                |
| **Applicable Standard(s)** | CCPA §§ 1798.100–1798.199, CPRA amendments                                                                                                                                                                                                                                                                                                                                                      |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                                                                          |

---

**CR-003**

| Field                      | Value                                                                                                                                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL comply with WCAG 2.1 Level AA on all pages of both sites, including all success criteria listed in NFR-007 through NFR-011, with an Accessibility Conformance Report (ACR/VPAT) generated and published on both sites. |
| **Priority**               | Must                                                                                                                                                                                                                                    |
| **Rationale**              | WCAG 2.1 AA compliance is a legal requirement under Section 508, EN 301 549, and the European Accessibility Act. An ACR documents conformance level for each criterion.                                                                 |
| **Verification Method**    | Audit — automated testing (axe-core, Lighthouse); manual testing (keyboard, screen reader); expert audit by certified accessibility specialist; ACR generation                                                                          |
| **Applicable Standard(s)** | WCAG 2.1 Level AA, Section 508, EN 301 549, European Accessibility Act                                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                  |

---

**CR-004**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL implement Schema.org structured data on all pages conforming to the following types: `ScholarlyArticle` for encyclopeptide.com monographs (with properties: name, author, datePublished, dateModified, citation, about, identifier), `LearningResource` for wikipept.com study guides (with properties: name, educationalLevel, teaches, assesses, prerequisite, timeRequired, learningResourceType), `WebSite` for both homepages (with potentialAction: SearchAction), and `Organization` for both site identities. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Rationale**              | Schema.org structured data enables Google rich results, Google Scholar indexing, and educational search integration. Required for SEO and discoverability.                                                                                                                                                                                                                                                                                                                                                                             |
| **Verification Method**    | Test — validate all JSON-LD blocks against Schema.org validator; verify Google Rich Results Test passes for all page types                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Applicable Standard(s)** | Schema.org, Google Structured Data Guidelines                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

---

**CR-005**

| Field                      | Value                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL comply with IUPAC-IUB nomenclature standards for all scientific content on both sites, including: 3-letter and 1-letter amino acid codes per IUPAC 1983 recommendations, N-terminus to C-terminus sequence convention, standard modification abbreviations, and L/D stereochemistry designations. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                               |
| **Rationale**              | Scientific nomenclature standardization is non-negotiable for accuracy. Non-standard notation would undermine the sites' credibility as reference resources.                                                                                                                                                       |
| **Verification Method**    | Inspection — expert review of scientific content for nomenclature compliance; automated validation of sequence notation against regex patterns                                                                                                                                                                     |
| **Applicable Standard(s)** | IUPAC-IUB Joint Commission on Biochemical Nomenclature                                                                                                                                                                                                                                                             |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                             |

---

**CR-006**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL comply with the FAIR Data Principles (Findable, Accessible, Interoperable, Reusable) for all structured peptide data on encyclopeptide.com, including: globally unique and persistent identifiers (Findable), standardized protocols for data access (Accessible), common, openly documented data formats (Interoperable), and clear usage licenses and provenance metadata (Reusable). |
| **Priority**               | Should                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Rationale**              | FAIR principles guide best practices for scientific data management. Compliance enables integration with the broader bioinformatics ecosystem.                                                                                                                                                                                                                                                           |
| **Verification Method**    | Audit — evaluate each FAIR principle against data architecture; verify persistent identifiers, access protocols, data formats, and metadata                                                                                                                                                                                                                                                              |
| **Applicable Standard(s)** | FAIR Data Principles (Wilkinson et al., 2016)                                                                                                                                                                                                                                                                                                                                                            |
| **Affected Site(s)**       | ENCP                                                                                                                                                                                                                                                                                                                                                                                                     |

---

**CR-007**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL provide privacy policies on both sites that disclose: identity of the data controller, categories of personal data collected, purposes and legal basis for processing, data retention periods, third-party data sharing recipients, data subject rights and how to exercise them, right to lodge a complaint with a supervisory authority, and contact information for data protection inquiries. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Rationale**              | Privacy policies are legally required under GDPR Article 13/14 and CCPA § 1798.100. Incomplete or inaccurate policies risk regulatory action and user distrust.                                                                                                                                                                                                                                                    |
| **Verification Method**    | Audit — review privacy policy against GDPR Article 13 checklist and CCPA disclosure requirements; verify policy is accessible from every page footer                                                                                                                                                                                                                                                               |
| **Applicable Standard(s)** | GDPR Articles 12-14, CCPA § 1798.100, § 1798.130                                                                                                                                                                                                                                                                                                                                                                   |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                                                                                                             |

---

**CR-008**

| Field                      | Value                                                                                                                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL implement a Data Protection Impact Assessment (DPIA) for wikipept.com prior to launch, covering: systematic description of processing operations, necessity and proportionality assessment, risk assessment for data subjects, and measures to mitigate identified risks. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                       |
| **Rationale**              | GDPR Article 35 requires DPIA for processing that is likely to result in high risk to data subjects. Wikipept.com's processing of learning progress data and behavioral profiling qualifies.                                                                                               |
| **Verification Method**    | Audit — verify DPIA document exists, covers all required elements, and has been reviewed by a qualified data protection professional                                                                                                                                                       |
| **Applicable Standard(s)** | GDPR Article 35, Article 36                                                                                                                                                                                                                                                                |
| **Affected Site(s)**       | WIKI                                                                                                                                                                                                                                                                                       |

---

**CR-009**

| Field                      | Value                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Statement**              | The system SHALL display a cookie consent banner on both sites only if cookies are actually set; since Cloudflare Web Analytics is cookie-free and no other tracking cookies are used, no consent banner shall be displayed by default, with the consent mechanism ready to activate if third-party cookies are added in the future. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                                                 |
| **Rationale**              | GDPR and ePrivacy Directive require consent for non-essential cookies. Cookie-free analytics avoid the need for consent banners, improving user experience. The mechanism must be ready if the analytics strategy changes.                                                                                                           |
| **Verification Method**    | Test — verify no cookie consent banner is displayed on initial page load; verify no cookies are set (document.cookie === ''); verify consent component exists in codebase for future activation                                                                                                                                      |
| **Applicable Standard(s)** | GDPR, ePrivacy Directive 2002/58/EC                                                                                                                                                                                                                                                                                                  |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                                               |

---

**CR-010**

| Field                      | Value                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statement**              | The system SHALL display a clear medical/scientific disclaimer on both sites stating that the content is for educational and reference purposes only and does not constitute medical advice, diagnosis, or treatment recommendations, prominently displayed on every page footer and on the About page. |
| **Priority**               | Must                                                                                                                                                                                                                                                                                                    |
| **Rationale**              | Oligopeptide content intersects with therapeutic and medical applications. A disclaimer mitigates legal liability if users misinterpret content as medical advice. Required for regulatory compliance in multiple jurisdictions.                                                                        |
| **Verification Method**    | Test — verify disclaimer text appears in page footer of every page; verify About page contains expanded disclaimer                                                                                                                                                                                      |
| **Applicable Standard(s)** | None (legal risk mitigation)                                                                                                                                                                                                                                                                            |
| **Affected Site(s)**       | SHARED                                                                                                                                                                                                                                                                                                  |

---

## 10. Traceability Matrix

The following matrix maps requirements to project artifacts for full traceability:

| Requirement Category     | Count | Source Documents                               | Design Documents         | Implementation                  | Verification                      |
| ------------------------ | ----- | ---------------------------------------------- | ------------------------ | ------------------------------- | --------------------------------- |
| **Functional (FR)**      | 50    | domain_analysis.md, capability_requirements.md | Architecture Blue Papers | Source code (src/)              | Vitest, Playwright, Lighthouse CI |
| **Non-Functional (NFR)** | 30    | domain_analysis.md §6, applicable_standards.md | Architecture Blue Papers | Configuration, CI/CD            | Lighthouse CI, axe-core, k6       |
| **Data (DR)**            | 15    | domain_analysis.md §3                          | Data model specs         | D1 schema, KV config, R2 config | Vitest, integration tests         |
| **Integration (IR)**     | 10    | capability_requirements.md §5                  | Architecture Blue Papers | Workers, API handlers           | Playwright, wrangler test         |
| **Design (DesR)**        | 20    | domain_analysis.md §5.2                        | Design system specs      | Component library               | Visual regression, inspection     |
| **Security (SR)**        | 15    | applicable_standards.md §6                     | Security Blue Paper      | Auth, WAF, CSP config           | OWASP ASVS, penetration test      |
| **Compliance (CR)**      | 10    | applicable_standards.md §7-8                   | Compliance specs         | Privacy policy, ACR, DPIA       | Audit, expert review              |

**Total Requirements:** 150

---

**End of Requirements Specification**

_This document is version-controlled. Changes require review by the project lead. Next scheduled review: upon completion of architecture design phase._
