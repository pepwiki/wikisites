# White Paper: encyclopeptide.com Brand Identity & Design System

**Document ID:** WP-ENCP-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Final
**Project:** Wikisites — Dual-Site Oligopeptide Educational Platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Brand Identity](#2-brand-identity)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Voice & Tone](#5-voice--tone)
6. [Visual Language](#6-visual-language)
7. [Tagline & Positioning](#7-tagline--positioning)
8. [Target Audience Personas](#8-target-audience-personas)
9. [Content Strategy](#9-content-strategy)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Executive Summary

encyclopeptide.com is the formal, encyclopedic arm of the Wikisites oligopeptide educational platform. It serves as the authoritative, citable reference for oligopeptide data — a digital monograph library designed to meet the standards of academic researchers, bioinformaticians, and pharmaceutical professionals. This white paper defines the complete brand identity, design system, and content strategy for encyclopeptide.com.

**Design Philosophy:** Precision. Authority. Permanence. Every element on encyclopeptide.com communicates scholarly rigor. The site functions as a peer-reviewed journal translated into a digital medium — every pixel serves a data purpose, every interaction reduces friction between the researcher and the information they need.

---

## 2. Brand Identity

### 2.1 Brand Essence

encyclopeptide.com is the digital equivalent of a definitive reference library — the place a researcher goes when they need data they can cite in a manuscript. The brand promises accuracy, traceability, and permanence.

| Attribute | Expression |
|-----------|------------|
| **Authority** | Every claim supported by DOI-linked citations; editorial board oversight; version-controlled content with audit trails |
| **Precision** | Quantitative data dominates; error bars and confidence intervals always visible; uncertainty explicitly communicated |
| **Permanence** | Content versioned with immutable snapshots; historical revisions preserved; stable URLs for citation linking |
| **Traceability** | Every data point traces to a primary source; provenance metadata embedded in all structured data |
| **Formality** | Third-person voice; passive constructions; IUPAC nomenclature; no colloquialisms |

### 2.2 Brand Personality

The encyclopeptide.com brand personality maps to the following archetypes:

| Archetype | Expression |
|-----------|------------|
| **The Sage** | Wisdom through comprehensive, verified knowledge; pursuit of truth through data |
| **The Guardian** | Protecting scientific integrity; maintaining standards; preserving accuracy over time |
| **The Architect** | Structured, systematic organization; logical information hierarchy; precise categorization |

### 2.3 Brand Promise

> "Every oligopeptide, exhaustively documented, rigorously cited, permanently accessible."

### 2.4 Brand Differentiation

| Competitor Category | Their Approach | encyclopeptide.com Differentiation |
|--------------------|----------------|------------------------------------|
| Wikipedia | Community-edited, variable quality, no citation enforcement | Mandatory DOI citations for all quantitative claims; expert editorial review |
| PubChem/ChEMBL | Raw database, minimal narrative, poor discoverability | Narrative monographs with structured data; human-readable context for every entry |
| Textbook references | Static, infrequent updates, expensive access | Continuously updated; open access; machine-readable data exports |
| Review articles | Narrow scope, publication delay, limited interactivity | Comprehensive scope; real-time updates; interactive data visualization |

---

## 3. Color System

### 3.1 Primary Palette

The encyclopeptide.com color system draws from the visual language of academic publishing — deep, authoritative tones that communicate gravitas and precision.

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| **Dark Navy** | Primary | `#0A1628` | 10, 22, 40 | Backgrounds, headers, primary text containers |
| **White** | Neutral | `#FFFFFF` | 255, 255, 255 | Content backgrounds, body text on dark backgrounds |
| **Gold** | Accent | `#C9A84C` | 201, 168, 76 | CTAs, highlights, active states, citation markers, navigation accents |
| **Slate** | Secondary | `#64748B` | 100, 116, 139 | Body text, secondary labels, metadata, timestamps |

### 3.2 Extended Palette

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| Navy Light | Surface | `#131F36` | 19, 31, 54 | Card backgrounds, elevated surfaces on dark |
| Navy Mid | Border | `#1E2D4A` | 30, 45, 74 | Subtle borders, dividers |
| Gold Light | Highlight | `#D4B85E` | 212, 184, 94 | Hover states on gold elements |
| Gold Dark | Pressed | `#B8943A` | 184, 148, 58 | Active/pressed states |
| Slate Light | Muted | `#94A3B8` | 148, 163, 184 | Disabled states, placeholder text |
| Slate Dark | Strong | `#475569` | 71, 85, 105 | Emphasized secondary text |
| Error Red | Error | `#DC2626` | 220, 38, 38 | Error states, critical alerts |
| Success Green | Success | `#16A34A` | 22, 163, 74 | Success states, validation passes |
| Warning Amber | Warning | `#D97706` | 217, 119, 6 | Warning states, caution indicators |

### 3.3 Color Usage Rules

| Rule | Specification |
|------|---------------|
| Background ratio | Dark Navy backgrounds must constitute ≥ 60% of viewport area |
| Gold accent cap | Gold must not exceed 10% of any single view; reserve for emphasis |
| Contrast ratio (text) | White on Dark Navy: 16.8:1 (AAA); Gold on Dark Navy: 7.2:1 (AAA); Slate on White: 5.1:1 (AA) |
| Link color | Gold (#C9A84C) on Dark Navy; Dark Navy (#0A1628) on White |
| Focus indicator | Gold outline, 3px, offset 2px — meets WCAG 2.1 2.4.7 |
| Data visualization | Use extended palette for chart series; never use more than 6 colors per chart |

### 3.4 Color Tokens (CSS Custom Properties)

```css
:root {
  /* Primary */
  --encp-color-primary: #0A1628;
  --encp-color-primary-light: #131F36;
  --encp-color-primary-mid: #1E2D4A;

  /* Neutral */
  --encp-color-white: #FFFFFF;

  /* Accent */
  --encp-color-accent: #C9A84C;
  --encp-color-accent-light: #D4B85E;
  --encp-color-accent-dark: #B8943A;

  /* Secondary */
  --encp-color-secondary: #64748B;
  --encp-color-secondary-light: #94A3B8;
  --encp-color-secondary-dark: #475569;

  /* Semantic */
  --encp-color-error: #DC2626;
  --encp-color-success: #16A34A;
  --encp-color-warning: #D97706;

  /* Typography */
  --encp-color-text-primary: #FFFFFF;
  --encp-color-text-secondary: #94A3B8;
  --encp-color-text-body: #E2E8F0;
  --encp-color-text-muted: #64748B;
}
```

---

## 4. Typography

### 4.1 Type Scale

| Role | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|------|------|--------|------|-------------|----------------|-------|
| Display | Playfair Display | 700 | 48px / 3rem | 1.1 | -0.02em | Hero section titles |
| H1 | Playfair Display | 700 | 36px / 2.25rem | 1.2 | -0.01em | Page titles |
| H2 | Playfair Display | 600 | 28px / 1.75rem | 1.3 | 0 | Section headings |
| H3 | Playfair Display | 600 | 22px / 1.375rem | 1.4 | 0 | Subsection headings |
| H4 | Inter | 600 | 18px / 1.125rem | 1.5 | 0.01em | Card titles, labels |
| Body Large | Inter | 400 | 18px / 1.125rem | 1.7 | 0 | Introductory paragraphs |
| Body | Inter | 400 | 16px / 1rem | 1.7 | 0 | Standard body text |
| Body Small | Inter | 400 | 14px / 0.875rem | 1.6 | 0.01em | Metadata, captions, footnotes |
| Code | JetBrains Mono | 400 | 14px / 0.875rem | 1.5 | 0 | Code blocks, sequences, formulas |
| Code Bold | JetBrains Mono | 700 | 14px / 0.875rem | 1.5 | 0 | Emphasized code elements |
| Label | Inter | 500 | 12px / 0.75rem | 1.5 | 0.05em | Form labels, badges, tags |
| Caption | Inter | 400 | 12px / 0.75rem | 1.5 | 0.02em | Figure captions, table notes |

### 4.2 Font Loading Strategy

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap">
```

**Font-display:** `swap` for all web fonts — text remains visible during font loading using system font fallbacks (Georgia for Playfair, system-ui for Inter, monospace for JetBrains Mono).

### 4.3 Typographic Conventions

| Convention | Rule |
|------------|------|
| Maximum line length | 72 characters for body text (optimal reading width) |
| Paragraph spacing | 1.5em between paragraphs |
| Heading hierarchy | Never skip levels (H1 → H3 is forbidden) |
| Monospace usage | Peptide sequences, molecular formulas, chemical notation, code snippets, database identifiers |
| Small caps | Used for abbreviation expansions in definition lists |
| Numeric alignment | Tabular numerals for data tables; use `font-variant-numeric: tabular-nums` |

---

## 5. Voice & Tone

### 5.1 Voice Characteristics

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Academic** | Formal register; no contractions; no colloquialisms | "The peptide exhibits potent antimicrobial activity" (not "This peptide kicks butt against bacteria") |
| **Precise** | Quantitative where possible; hedge uncertainty explicitly | "IC₅₀ = 2.3 ± 0.4 μM (n=5)" (not "very effective") |
| **Citation-driven** | Every factual claim traces to a DOI-linked source | "ACE-inhibitory activity (IC₅₀ = 12 μM) [DOI:10.1021/jm900462q]" |
| **Neutral** | Third-person voice; passive constructions common; avoid marketing language | "The structure was determined by X-ray crystallography" (not "We solved this amazing structure") |
| **Comprehensive** | Exhaustive coverage; leave no ambiguity; define all terms | Include synonyms, cross-references, and related entries for every monograph |

### 5.2 Tone Variations by Context

| Context | Tone | Example |
|---------|------|---------|
| Monograph body | Most formal; passive voice; dense data | "The octapeptide angiotensin II (Asp-Arg-Val-Tyr-Ile-His-Pro-Phe) was first isolated from equine blood plasma by Skeggs et al. (1956) [DOI:10.1172/JCI103345]." |
| Navigation/labels | Terse; noun-heavy; no verbs | "Pharmacokinetics" not "View Pharmacokinetic Data" |
| Error messages | Formal but direct; explain impact; suggest resolution | "The requested peptide record could not be located. Verify the identifier against UniProt or ChEMBL." |
| Citation formatting | Strict; structured; machine-readable | "[DOI:10.1038/s41586-021-03767-x] Wang, L. et al. (2021). Nature 595, 284–289." |
| Data export labels | Technical; concise; match file format conventions | "Download PDB" not "Get 3D Structure File" |

### 5.3 Writing Rules

1. **No contractions.** Use "do not" not "don't". Use "cannot" not "can't".
2. **No marketing language.** Never use "revolutionary", "cutting-edge", "game-changing", or similar superlatives.
3. **Quantify where possible.** Replace "high affinity" with "Kd = 3.2 nM".
4. **Cite everything.** Every quantitative claim must have a DOI-linked reference.
5. **Define on first use.** Acronyms expanded at first mention; abbreviation table maintained.
6. **Active voice for actions, passive for observations.** "The enzyme cleaves the peptide bond" (action) vs. "The structure was resolved to 1.8 Å resolution" (observation).
7. **Latin abbreviations permitted.** e.g., i.e., et al., vs., etc. — standard academic usage.
8. **Units in SI.** All measurements in SI units with proper formatting (μM not uM; kDa not kdalton).

---

## 6. Visual Language

### 6.1 Molecular Diagrams

| Element | Specification |
|---------|---------------|
| 2D structure renderer | RDKit.js or Ketcher for 2D molecular drawings |
| 3D viewer | Mol* (molstar.org) as primary; NGL Viewer as fallback |
| Sequence display | Monospace font (JetBrains Mono), N→C orientation, colored by residue type |
| Structural annotations | Bond highlighting, pharmacophore mapping, active site indicators |
| Fallback | Static SVG export for environments where WebGL is unavailable |

### 6.2 Data Tables

| Property | Value |
|----------|-------|
| Style | Minimal borders; header row Dark Navy with White text; alternating row shading (Navy Light / White) |
| Sorting | Client-side sort on all columns; visual sort indicator (Gold arrow) |
| Filtering | Per-column filter inputs; "Clear All" button |
| Export | CSV, JSON, TSV download buttons per table |
| Pagination | 25/50/100 rows per page; server-side for datasets > 10,000 rows |
| Responsive | Horizontal scroll with sticky first column on mobile |

### 6.3 Journal-Style Layouts

| Component | Design |
|-----------|--------|
| Article header | Title (Playfair Display), author list, DOI badge, publication date, "Last reviewed" date |
| Abstract block | Bordered left (Gold), indented, slightly smaller body text |
| Figure placement | Centered, with numbered caption below; click to expand; 3D viewer embedded inline |
| Table placement | Full-width, numbered caption above; notes below; horizontal scroll on mobile |
| Reference list | Numbered, hanging indent; DOI link in Gold; hover shows full citation |
| Sidebar | Table of contents (auto-generated from headings); metadata panel; related entries |

### 6.4 Iconography

| Category | Style |
|----------|-------|
| Icon set | Lucide Icons (consistent stroke weight, monoline) |
| Molecular icons | Custom SVG for amino acid types, peptide bonds, modification groups |
| Navigation icons | Minimal; text labels preferred over icons for primary navigation |
| Status indicators | Colored dots (Gold = active, Slate = inactive, Green = verified, Red = flagged) |
| Icon size | 16px (inline), 20px (buttons), 24px (navigation), 32px (feature highlights) |

### 6.5 Spacing & Grid

| Property | Value |
|----------|-------|
| Base unit | 8px |
| Grid | 12-column, 1200px max-width, 24px gutter |
| Content max-width | 720px for monographs (optimal reading width) |
| Data max-width | 1200px for tables and data views |
| Section spacing | 64px (4rem) between major sections |
| Component spacing | 32px (2rem) between related components |
| Element spacing | 16px (1rem) between related elements |
| Tight spacing | 8px (0.5rem) within grouped elements |

---

## 7. Tagline & Positioning

### 7.1 Primary Tagline

> **"The Definitive Reference for Oligopeptide Science"**

### 7.2 Positioning Statement

For academic researchers, bioinformaticians, and pharmaceutical professionals who need authoritative, citable data on oligopeptide structures, functions, and pharmacological properties, **encyclopeptide.com** is the definitive digital monograph library that provides exhaustively documented, DOI-linked, peer-reviewed-grade reference entries — unlike Wikipedia, PubChem, or static textbooks, encyclopeptide.com combines the rigor of academic publishing with the discoverability and interactivity of modern web platforms.

### 7.3 Supporting Messages

| Audience | Key Message |
|----------|-------------|
| Researchers | "Every data point, cited. Every structure, verified. Every entry, permanent." |
| Bioinformaticians | "Structured data, RESTful API, bulk exports — oligopeptide data at machine speed." |
| Pharmaceutical professionals | "Pharmacokinetic parameters, safety profiles, synthesis routes — all in one place." |
| Educators | "Assign readings with confidence. Every claim is DOI-linked and version-controlled." |

### 7.4 Brand Taglines (Contextual)

| Context | Tagline |
|---------|---------|
| Homepage hero | "The Definitive Reference for Oligopeptide Science" |
| Search results | "X results across Y monographs — every data point cited" |
| Monograph header | "Peer-reviewed quality. Continuously updated." |
| API landing | "Oligopeptide data, programmatically accessible" |
| About page | "Built by scientists, for scientists" |

---

## 8. Target Audience Personas

### 8.1 Persona 1: Dr. Elena Vasquez — Academic Researcher

| Attribute | Detail |
|-----------|--------|
| **Age** | 38 |
| **Role** | Associate Professor of Biochemistry, University of Barcelona |
| **Education** | Ph.D. Biochemistry (2014), postdoctoral fellowship at Max Planck Institute |
| **Research focus** | Antimicrobial peptides from marine organisms; structure-activity relationships |
| **Technical proficiency** | High — daily user of PubMed, UniProt, ChEMBL, PyMOL |
| **Goals** | Find authoritative data on specific oligopeptide sequences; compare pharmacokinetic parameters across peptide candidates; cite sources in grant proposals and manuscripts |
| **Pain points** | Scattered data across multiple databases; inconsistent nomenclature; difficulty finding comprehensive monographs; time-consuming literature synthesis |
| **Content needs** | Detailed monographs with DOI citations; structural data (2D/3D); receptor binding affinities; synthesis routes; cross-references to primary literature |
| **Behavior** | Searches by peptide name, sequence, or UniProt ID; reads monographs thoroughly; exports data tables; shares links with lab members |
| **Device mix** | 70% desktop (office), 25% tablet (lab), 5% mobile (commute) |
| **Success metric** | "I found the comprehensive data I needed with proper citations in under 10 minutes" |

### 8.2 Persona 2: Dr. Kenji Tanaka — Bioinformatician

| Attribute | Detail |
|-----------|--------|
| **Age** | 32 |
| **Role** | Senior Bioinformatician, Pharmaceutical R&D Company (Tokyo) |
| **Education** | M.Sc. Computational Biology (2016), certifications in bioinformatics |
| **Research focus** | Peptidomics data analysis; machine learning models for peptide activity prediction |
| **Technical proficiency** | Very high — Python, R, command-line tools, API integration, database queries |
| **Goals** | Integrate oligopeptide data into computational pipelines; access structured data via API; bulk download datasets for model training; cross-reference peptide structures with bioactivity databases |
| **Pain points** | No unified API for oligopeptide data; manual data extraction from PDFs; inconsistent data formats; lack of machine-readable citations |
| **Content needs** | RESTful API with OpenAPI documentation; bulk data exports (JSON, CSV, SDF); structured metadata; programmatic access to citation graphs |
| **Behavior** | Uses API endpoints; downloads datasets; queries by molecular properties; cross-references with ChEMBL and PubChem; scripts data transformations |
| **Device mix** | 80% desktop (development workstation), 15% laptop (meetings), 5% mobile |
| **Success metric** | "I can pull a complete dataset via API without writing more than 20 lines of code" |

### 8.3 Persona 3: Dr. Sarah Mitchell — Pharmaceutical Professional

| Attribute | Detail |
|-----------|--------|
| **Age** | 45 |
| **Role** | Director of Peptide Therapeutics, Mid-size Biotech (Boston) |
| **Education** | Ph.D. Medicinal Chemistry (2005), MBA (2012) |
| **Research focus** | Therapeutic peptide development; clinical candidate selection; IND-enabling studies |
| **Technical proficiency** | Moderate-high — uses databases daily but relies on team for computational work |
| **Goals** | Evaluate therapeutic potential of candidate peptides; review safety and PK profiles; compare synthesis routes for cost optimization; find regulatory-relevant data |
| **Pain points** | Fragmented data across publications; difficulty comparing PK parameters across studies; no single source for safety profiles; time pressure in decision-making |
| **Content needs** | Concise summaries with linked detailed data; PK/PD tables; safety profiles; synthesis route comparisons; regulatory status tracking; market landscape data |
| **Behavior** | Searches by therapeutic area or mechanism; reads summaries first, drills into data as needed; shares findings with cross-functional team; exports data for internal reports |
| **Device mix** | 60% desktop (office), 30% tablet (meetings), 10% mobile (travel) |
| **Success metric** | "I can evaluate a candidate peptide's profile in a single monograph view without opening 15 papers" |

---

## 9. Content Strategy

### 9.1 Content Types

#### 9.1.1 Monographs

The core content type. Each monograph is a comprehensive, structured entry for a single oligopeptide.

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| Peptide name | Yes | String | Common name (e.g., "Angiotensin II") |
| Synonyms | Yes | Array | Alternative names, abbreviations |
| CAS number | Yes | String | Chemical Abstracts Service identifier |
| UniProt ID | Conditional | String | If protein-derived |
| PDB entries | No | Array | Linked PDB structure IDs |
| Sequence | Yes | String | Full amino acid sequence (single-letter code) |
| Molecular formula | Yes | String | Standard molecular formula |
| Molecular weight | Yes | Number + unit | In Da (Daltons) |
| Charge (physiological) | Yes | Number | Net charge at pH 7.4 |
| Classification | Yes | Array | By length, function, source, structure |
| Biological activity | Yes | Structured | Targets, affinities, pathways |
| Pharmacological properties | Yes | Structured | PK parameters, therapeutic applications |
| Synthesis routes | Yes | Array | Chemical (SPPS), biosynthetic, recombinant |
| Analytical characterization | Yes | Structured | MS, HPLC, NMR data |
| References | Yes | Array | DOI-linked primary literature |
| Last reviewed | Yes | Date | Most recent expert review date |
| Reviewer(s) | Yes | Array | Editorial board members who verified |
| Version | Yes | String | Semantic version of entry |

#### 9.1.2 Reference Tables

Cross-referenced data tables for comparative analysis:

- **Amino Acid Properties Table** — 20 standard amino acids with physicochemical properties
- **Peptide Bond Parameters** — Bond lengths, angles, rotational constraints
- **Common Modifications Table** — Phosphorylation, glycosylation, acetylation, etc.
- **Receptor Binding Affinity Database** — Aggregated Ki/IC₅₀ values by peptide-receptor pair
- **Synthesis Reagent Table** — Coupling reagents, resins, protecting groups
- **PK Parameter Comparison Table** — Half-life, bioavailability, clearance across peptide therapeutics

#### 9.1.3 Data Exports

| Format | Content | Use Case |
|--------|---------|----------|
| JSON | Full monograph data with metadata | API consumers, data integration |
| CSV | Tabular data from reference tables | Spreadsheet analysis, statistical tools |
| SDF | Molecular structure data | Cheminformatics, molecular modeling |
| BibTeX | Citation data | Academic reference management |
| PDF | Formatted monograph | Offline reading, archival |

### 9.2 Content Quality Standards

| Standard | Requirement |
|----------|-------------|
| Citation density | Minimum 1 DOI per 200 words in monograph body |
| Data currency | All PK/PD data within 5 years of publication or explicitly flagged as historical |
| Structural accuracy | Molecular structures verified against PDB/UniProt/ChEMBL at time of publication |
| Nomenclature compliance | IUPAC-IUB standards enforced; automated validation in CI/CD |
| Peer review | Every monograph reviewed by minimum 2 editorial board members |
| Version control | All changes tracked with diff view; major changes require new version number |
| Errata process | Published corrections linked to original entry; version incremented |

### 9.3 Content Calendar

| Activity | Frequency | Owner |
|----------|-----------|-------|
| New monograph publication | Monthly (batch of 5-10) | Editorial board |
| Existing monograph review | Quarterly | Rotating reviewer |
| Reference table update | Semi-annually | Data curator |
| Full content audit | Annually | Editorial board + external reviewer |
| API documentation update | With each API change | Engineering |
| Glossary update | Quarterly | Translation team |

### 9.4 Content Governance

| Role | Responsibility | Count |
|------|----------------|-------|
| Editor-in-Chief | Final approval authority; sets editorial standards; resolves disputes | 1 |
| Associate Editors | Domain-specific review (pharmacology, synthesis, bioinformatics) | 4-6 |
| Data Curators | Structured data validation; cross-reference verification; database sync | 2-3 |
| Translation Coordinators | Manage translation pipeline; glossary maintenance; quality assurance per language | 1 per language |
| Community Moderators | Monitor community feedback; process errata requests; escalate disputed content | 2-3 |

---

## 10. Implementation Guidelines

### 10.1 Design Token Integration

All design tokens (colors, typography, spacing) are defined as CSS custom properties and must be consumed through the token system. Direct color/size values in component code are prohibited.

### 10.2 Component Specifications

| Component | Variants | Priority |
|-----------|----------|----------|
| MonographCard | Default, Compact, Featured | P0 |
| DataTable | Sortable, Filterable, Paginated | P0 |
| MoleculeViewer | 2D, 3D, Fallback (SVG) | P0 |
| CitationBlock | Inline, Expanded, DOI-Link | P0 |
| SearchBar | Simple, Advanced, Structural | P0 |
| NavigationBar | Desktop, Mobile, Breadcrumb | P0 |
| DataExportButton | JSON, CSV, SDF, BibTeX | P1 |
| RelatedEntries | Grid, List, Sidebar | P1 |
| RevisionHistory | Timeline, Diff-View | P1 |

### 10.3 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column; stacked navigation; condensed tables |
| Tablet | 640-1024px | Two column where appropriate; collapsible sidebar |
| Desktop | 1024-1440px | Full layout; sidebar + content |
| Wide | > 1440px | Max-width containers; centered content |

### 10.4 Accessibility Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | WCAG 2.1 AA (4.5:1 text, 3:1 UI) | All color combinations verified; token system enforces ratios |
| Keyboard navigation | WCAG 2.1 2.1.1 | Full tab order; visible focus indicators (Gold outline) |
| Screen reader support | WCAG 2.1 4.1.2 | ARIA labels on all interactive elements; live regions for dynamic content |
| Molecular viewer | WCAG 2.1 1.1.1 | Alt-text descriptions of 3D structures; 2D fallback always available |
| Data tables | WCAG 2.1 1.3.1 | Proper th/scope associations; caption elements; summary attributes |
| Motion | WCAG 2.1 2.3.3 | Reduced motion media query support; no auto-playing animations |

### 10.5 Performance Budgets

| Metric | Budget |
|--------|--------|
| Initial JS bundle | < 150 KB (gzipped) |
| Initial CSS | < 50 KB (gzipped) |
| Monograph page weight | < 300 KB (excluding molecular viewer assets) |
| 3D viewer initial load | < 500 KB (lazy-loaded) |
| Time to Interactive | < 3s on 4G |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

---

*Document generated: 2026-06-07T00:00:00Z*
*Phase status: APPROVED*
*Classification: Internal*
