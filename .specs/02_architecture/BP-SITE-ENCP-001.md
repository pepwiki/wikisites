---
document_id: BP-SITE-ENCP-001
title: "Encyclopeptide.com Site Architecture"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - ENCP
abstract: >-
  IEEE 1016 compliant architectural specification for encyclopeptide.com —
  the formal encyclopedic oligopeptide reference site. Covers system purpose
  and scope, design decomposition, design rationale for Astro/SolidJS/Cloudflare
  stack decisions, requirements traceability, interface contracts, oligopeptide
  data model, component design with state machines and sequence diagrams,
  Cloudflare Pages deployment, formal verification properties, HAL specification,
  compliance matrix, and quality checklist.
yellow_paper_refs:
  - "YP-CHEM-OLIGO-001"
  - "YP-BIO-OLIGO-001"
  - "YP-WEB-TECH-001"
---

# Blue Paper: Encyclopeptide.com Site Architecture

**Document ID:** BP-SITE-ENCP-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [BP-1: Design Overview](#bp-1-design-overview)
2. [BP-2: Design Decomposition](#bp-2-design-decomposition)
3. [BP-3: Design Rationale](#bp-3-design-rationale)
4. [BP-4: Traceability](#bp-4-traceability)
5. [BP-5: Interface Design](#bp-5-interface-design)
6. [BP-6: Data Design](#bp-6-data-design)
7. [BP-7: Component Design](#bp-7-component-design)
8. [BP-8: Deployment Design](#bp-8-deployment-design)
9. [BP-9: Formal Verification](#bp-9-formal-verification)
10. [BP-10: HAL Specification](#bp-10-hal-specification)
11. [BP-11: Compliance Matrix](#bp-11-compliance-matrix)
12. [BP-12: Quality Checklist](#bp-12-quality-checklist)

---

## BP-1: Design Overview

### 1.1 System Purpose

Encyclopeptide.com serves as the authoritative, peer-reviewed-grade encyclopedic reference for oligopeptide data. The system delivers precise molecular property calculations, 3D structural visualizations, pharmacokinetic parameter tables, receptor binding affinity data, synthesis pathway diagrams, and citation-linked literature references. The primary design goal is scientific accuracy with zero tolerance for calculation errors that could propagate misinformation to researchers, students, and healthcare professionals.

### 1.2 System Scope

The system encompasses:

1. **Content Management**: Git-based MDX content collections with Zod schema validation for oligopeptide monographs, reference articles, and data tables
2. **Molecular Visualization**: Interactive 3D molecular viewer (Mol* or NGL Viewer) with 2D fallback, lazy-loaded via IntersectionObserver
3. **Search and Discovery**: Full-text search via Pagefind with faceted filtering by chain length, functional category, source organism, therapeutic application, and educational level
4. **Data Calculations**: Client-side oligopeptide property calculators (molecular weight, charge state, isoelectric point, extinction coefficient) per YP-CHEM-OLIGO-001
5. **Citation Management**: DOI-linked references with BibTeX/RIS/APA export and build-time DOI validation
6. **Internationalization**: Six-language support (en, es, fr, de, zh, ja) with locale-prefixed URL routing

### 1.3 Stakeholders

| Stakeholder | Role | Primary Concern |
|-------------|------|-----------------|
| Academic Researchers | End users | Accurate data, citation quality, search precision |
| Bioinformaticians | End users | API access, structured data export, programmatic queries |
| Content Authors | Content creators | Editorial workflow, version control, peer review |
| Students | End users | Accessible explanations, progressive disclosure |
| QA Engineers | Quality assurance | Testability, reproducibility, data integrity |
| DevOps Engineers | Operations | Deployment reliability, monitoring, scaling |

### 1.4 Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENCYCLOPEPTIDE.COM SYSTEM                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Static HTML  │    │  SolidJS     │    │  Cloudflare  │      │
│  │ (Astro SSG)  │    │  Islands     │    │  Workers     │      │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Shared Components Library              │   │
│  │  (Data Models, Search, i18n, Analytics)                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Content     │    │  Molecular   │    │  Cloudflare  │      │
│  │  Collections │    │  Viewer      │    │  KV/R2/D1    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Content    │    │   External   │    │   Users      │
│   Authors    │    │   Databases  │    │              │
│   (Git)      │    │  (UniProt,   │    │  (Browser)   │
│              │    │   PDB, etc.) │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
encyclopeptide.com
├── Presentation Layer
│   ├── Layout Components
│   │   ├── Header (locale switcher, search bar)
│   │   ├── Sidebar Navigation (collapsible, hierarchical)
│   │   ├── Breadcrumbs
│   │   ├── Table of Contents (auto-generated)
│   │   └── Footer
│   ├── Page Components
│   │   ├── HomePage (featured peptides, recent updates)
│   │   ├── MonographPage (full peptide profile)
│   │   ├── SearchResultsPage (faceted search results)
│   │   ├── ClassificationPage (browse by category)
│   │   ├── GlossaryPage (alphabetical term listing)
│   │   └── APIReferencePage (API documentation)
│   └── Interactive Islands (SolidJS)
│       ├── MolecularViewer3D (Mol* / NGL)
│       ├── MolecularViewer2D (SVG fallback)
│       ├── SequenceRenderer (selectable residues)
│       ├── SearchInterface (autocomplete, faceted)
│       ├── DataTableSorter (sortable columns)
│       ├── CitationManager (BibTeX/RIS export)
│       └── DarkModeToggle
├── Content Layer
│   ├── Content Collections
│   │   ├── oligopeptides/ (MDX monographs)
│   │   ├── concepts/ (reference articles)
│   │   ├── glossary/ (term definitions)
│   │   └── api-docs/ (API documentation)
│   ├── Zod Schemas
│   │   ├── oligopeptideSchema
│   │   ├── conceptSchema
│   │   └── glossarySchema
│   └── i18n Translations
│       ├── en/ (English — source)
│       ├── es/ (Spanish)
│       ├── fr/ (French)
│       ├── de/ (German)
│       ├── zh/ (Chinese Simplified)
│       └── ja/ (Japanese)
├── Service Layer
│   ├── SearchService (Pagefind index)
│   ├── CalculationService (MW, pI, charge, ε)
│   ├── CitationService (DOI validation, export)
│   ├── MolecularDataService (PDB fetch, parse)
│   └── AnalyticsService (Cloudflare Web Analytics)
├── Data Layer
│   ├── Cloudflare KV (caching, session)
│   ├── Cloudflare R2 (molecular structure files)
│   ├── Cloudflare D1 (content metadata, analytics)
│   └── Git Repository (source of truth for content)
└── Infrastructure Layer
    ├── Cloudflare Pages (static hosting)
    ├── Cloudflare Workers (API routes)
    ├── Cloudflare CDN (global edge)
    └── DNS/SSL (Cloudflare-managed)
```

### 2.2 Component Descriptions

| Component | Type | Responsibility | Dependencies |
|-----------|------|----------------|--------------|
| MolecularViewer3D | SolidJS Island | Render interactive 3D molecular structures from PDB data | Mol*, WebGL, client:visible |
| MolecularViewer2D | SolidJS Island | Render 2D structural diagrams as SVG fallback | SVG generation |
| SequenceRenderer | SolidJS Island | Display selectable amino acid residues with property tooltips | Amino acid data table |
| SearchInterface | SolidJS Island | Provide full-text search with faceted filtering | Pagefind index |
| DataTableSorter | SolidJS Island | Sort/filter tabular data (PK parameters, binding data) | Client-side sorting |
| CitationManager | SolidJS Island | Generate BibTeX/RIS/APA citations from DOI references | DOI resolver |
| CalculationService | Service | Compute MW, pI, charge, ε from sequence | Amino acid residue table |
| SearchService | Service | Manage search index generation and query execution | Pagefind |

### 2.3 Coupling Metrics

| Component A | Component B | Coupling Type | Coupling Strength |
|-------------|-------------|---------------|-------------------|
| Presentation Layer | Content Layer | Data coupling | Low — reads MDX at build time |
| Interactive Islands | Service Layer | Stamp coupling | Low — islands call services |
| Service Layer | Data Layer | Content coupling | Medium — services read/write storage |
| Infrastructure Layer | All Layers | Platform coupling | High — all layers depend on Cloudflare runtime |

### 2.4 Cohesion Analysis

| Component | Cohesion Type | Rationale |
|-----------|---------------|-----------|
| CalculationService | Functional cohesion | Single responsibility: oligopeptide property calculation |
| SearchService | Sequential cohesion | Pipeline: index → store → query → rank |
| MolecularViewer3D | Informational cohesion | Operates on molecular structure data exclusively |
| Content Collections | Logical cohesion | All content managed as type-safe collections |

---

## BP-3: Design Rationale

### 3.1 Astro Over Next.js

| Criterion | Astro | Next.js | Decision |
|-----------|-------|---------|----------|
| Static-first architecture | Native SSG, zero JS by default | SSR-first, opt into static | Astro — fits encyclopedic content model |
| Island architecture | Built-in selective hydration | Requires manual code splitting | Astro — reduces bundle size |
| Framework flexibility | Any UI framework via integrations | React-only | Astro — enables SolidJS islands |
| Build performance | Fast (no React hydration overhead) | Slower (full React SSR) | Astro — faster CI/CD |
| Content collections | Built-in with Zod validation | Requires custom solution | Astro — reduces boilerplate |
| Learning curve | Lower for content-heavy sites | Higher (app router complexity) | Astro — faster onboarding |

**Decision**: Astro chosen for static-first architecture with zero JS by default, enabling interactive SolidJS islands only where needed.

### 3.2 SolidJS Over React

| Criterion | SolidJS | React | Decision |
|-----------|---------|-------|----------|
| Bundle size | ~7KB gzipped | ~42KB gzipped | SolidJS — 6x smaller |
| Hydration overhead | Fine-grained (no VDOM diff) | Full component tree | SolidJS — better INP |
| Reactivity model | Signals (pull-based) | useState + re-render | SolidJS — more predictable |
| Learning curve | Similar to React | Lower (more resources) | Tie — SolidJS API familiar |
| Ecosystem | Growing | Massive | React — but SolidJS sufficient |

**Decision**: SolidJS chosen for minimal bundle size and fine-grained reactivity, critical for Core Web Vitals targets.

### 3.3 Cloudflare Over Vercel/Netlify

| Criterion | Cloudflare | Vercel | Netlify | Decision |
|-----------|------------|--------|---------|----------|
| Edge compute | Workers (300+ PoPs) | Edge Functions (limited) | Edge Functions (limited) | Cloudflare — global reach |
| Storage | KV + R2 + D1 | Blob + KV | — | Cloudflare — integrated storage |
| Pricing model | Generous free tier | Usage-based | Usage-based | Cloudflare — cost predictability |
| D1 (SQLite at edge) | Native | — | — | Cloudflare — unique capability |
| Durable Objects | Native | — | — | Cloudflare — wiki collaboration |
| Egress fees | Zero (R2) | Per-GB | Per-GB | Cloudflare — zero egress |

**Decision**: Cloudflare chosen for integrated edge compute, storage, and zero-egress object storage.

### 3.4 Content Collections Over Headless CMS

| Criterion | Astro Content Collections | Headless CMS (Strapi, etc.) |
|-----------|---------------------------|---------------------------|
| Type safety | Zod schemas, TypeScript inference | Requires code generation |
| Version control | Git-native | External service |
| Build-time validation | Automatic | Manual |
| Offline development | Full support | Requires API connection |
| Vendor lock-in | None | Medium-high |
| Performance | Build-time (no runtime fetch) | Runtime API calls |

**Decision**: Git-based content collections chosen for type safety, version control, and zero vendor lock-in.

---

## BP-4: Traceability

### 4.1 Requirements Traceability Matrix

| Requirement ID | Requirement Description | Architecture Component | Verification Method |
|----------------|------------------------|----------------------|-------------------|
| FR-001 | Full-text search <200ms | SearchInterface, SearchService (Pagefind) | Automated performance test |
| FR-003 | Sequence-based search | SearchInterface, CalculationService | Sequence input → correct matches |
| FR-004 | Substructure search (SMILES) | SearchInterface, MolecularDataService | SMILES input → structural matches |
| FR-005 | Search results with highlighting | SearchInterface | Verify highlighting and pagination |
| FR-006 | Fixed left sidebar navigation | SidebarNavigation | Verify across viewports |
| FR-008 | Breadcrumb navigation | Breadcrumbs component | Verify hierarchy accuracy |
| FR-009 | Auto-generated TOC | TableOfContents | Verify heading extraction |
| FR-010 | Responsive layout 320–2560px | Layout components | Playwright breakpoint tests |
| FR-011 | Dark mode toggle | DarkModeToggle | Toggle + persistence test |
| FR-013 | Six-language i18n support | i18n routing, locale detection | Verify locale URLs resolve |
| FR-016 | Interactive 3D molecular viewer | MolecularViewer3D | Rotation/zoom/selection test |
| FR-017 | 2D structural diagram fallback | MolecularViewer2D | WebGL disabled test |
| FR-018 | Lazy-load 3D viewer | MolecularViewer3D (client:visible) | IntersectionObserver verification |
| FR-019 | Selectable residues | SequenceRenderer | Click residue → property panel |
| FR-020 | IUPAC name lookup | SearchInterface | Name/alias → correct monograph |
| FR-024 | Sortable PK parameter tables | DataTableSorter | Sort/filter verification |
| FR-025 | Binding affinity tables | DataTableSorter, MolecularDataService | Verify DOI-linked data |
| FR-026 | DOI-linked citations | CitationManager | Verify DOI resolution |
| FR-027 | Citation export (BibTeX/RIS/APA) | CitationManager | Export format verification |
| FR-030 | RESTful API with OpenAPI 3.1 | Cloudflare Workers routes | API endpoint testing |
| NFR-001 | LCP < 2.5s | Astro static generation | Lighthouse CI assertion |
| NFR-002 | CLS < 0.1 | Layout stability | Lighthouse CI assertion |
| NFR-003 | INP < 200ms | SolidJS fine-grained reactivity | Lighthouse CI assertion |
| NFR-004 | Page weight < 500KB | Astro zero-JS + selective hydration | Lighthouse CI assertion |
| NFR-007 | WCAG 2.1 AA | Semantic HTML + ARIA + axe-core | Automated a11y testing |
| NFR-012 | HTTPS + HSTS | Cloudflare SSL | Header verification |
| NFR-013 | Content Security Policy | Cloudflare Workers headers | CSP header audit |

### 4.2 Theory-to-Implementation Mapping

| Yellow Paper | Theory Section | Implementation Component | Mapping |
|--------------|---------------|------------------------|---------|
| YP-CHEM-OLIGO-001 | §5.1 Classification Algorithm | CalculationService.classifyPeptide() | Direct implementation |
| YP-CHEM-OLIGO-001 | §5.2 Molecular Weight Algorithm | CalculationService.calculateMW() | Direct implementation |
| YP-CHEM-OLIGO-001 | §5.3 Charge Prediction | CalculationService.calculateCharge() | Direct implementation |
| YP-CHEM-OLIGO-001 | §5.4 Isoelectric Point | CalculationService.calculatePI() | Direct implementation |
| YP-CHEM-OLIGO-001 | §5.5 Extinction Coefficient | CalculationService.calculateExtinction() | Direct implementation |
| YP-BIO-OLIGO-001 | §5.1 Binding Affinity Prediction | MolecularDataService (display only) | Data presentation, not prediction |
| YP-BIO-OLIGO-001 | §5.2 ADMET Properties | MolecularDataService (display only) | Data presentation, not prediction |
| YP-WEB-TECH-001 | §4.1 Astro Islands | All Interactive Islands | Architecture pattern |
| YP-WEB-TECH-001 | §5.1 Content Indexing | SearchService.buildIndex() | Pagefind integration |
| YP-WEB-TECH-001 | §5.2 Search Ranking | SearchService.rankResults() | BM25 + domain boosts |

---

## BP-5: Interface Design

### 5.1 External Interfaces

#### 5.1.1 RESTful API Contract

```yaml
openapi: "3.1.0"
info:
  title: "Encyclopeptide API"
  version: "1.0.0"
paths:
  /api/v1/peptides:
    get:
      summary: "List peptides with filtering"
      parameters:
        - name: sequence
          in: query
          schema:
            type: string
            pattern: "^[ACDEFGHIKLMNPQRSTVWY]+$"
        - name: chainLength
          in: query
          schema:
            type: integer
            minimum: 2
            maximum: 50
        - name: classification
          in: query
          schema:
            type: string
            enum: [hydrophobic, hydrophilic, charged, amphipathic]
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
        - name: offset
          in: query
          schema:
            type: integer
            default: 0
      responses:
        "200":
          description: "Successful response"
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: "#/components/schemas/PeptideSummary"
                  total:
                    type: integer
                  limit:
                    type: integer
                  offset:
                    type: integer
        "429":
          description: "Rate limit exceeded"
          headers:
            Retry-After:
              schema:
                type: integer

  /api/v1/peptides/{id}:
    get:
      summary: "Get full peptide monograph"
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: "Full monograph data"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PeptideMonograph"
        "404":
          description: "Peptide not found"

  /api/v1/peptides/{id}/structure:
    get:
      summary: "Get molecular structure data"
      parameters:
        - name: id
          in: path
          required: true
      responses:
        "200":
          description: "PDB format structure data"
          content:
            chemical/x-pdb: {}

components:
  schemas:
    PeptideSummary:
      type: object
      required: [id, name, sequence, molecularWeight]
      properties:
        id:
          type: string
        name:
          type: string
        sequence:
          type: string
        molecularWeight:
          type: number
        classification:
          type: string
        chainLength:
          type: integer

    PeptideMonograph:
      type: object
      required: [id, name, sequence, molecularWeight, charge, pI]
      properties:
        id:
          type: string
        name:
          type: string
        iupacName:
          type: string
        aliases:
          type: array
          items:
            type: string
        casNumber:
          type: string
        sequence:
          type: string
        molecularWeight:
          type: number
        charge:
          type: number
        pI:
          type: number
        classification:
          type: string
        therapeuticCategory:
          type: string
        sourceOrganisms:
          type: array
          items:
            type: string
        receptorBinding:
          type: array
          items:
            type: object
            properties:
              receptor:
                type: string
              affinity:
                type: string
              method:
                type: string
              reference:
                type: string
        pharmacokinetics:
          type: array
          items:
            type: object
            properties:
              parameter:
                type: string
              value:
                type: string
              species:
                type: string
              route:
                type: string
              reference:
                type: string
        references:
          type: array
          items:
            type: object
            properties:
              doi:
                type: string
              title:
                type: string
              authors:
                type: array
                items:
                  type: string
              journal:
                type: string
              year:
                type: integer
```

**Preconditions**: API key required for rate limit > 100 req/min.
**Postconditions**: JSON responses conform to OpenAPI 3.1 schema. All DOIs validated at build time.
**Error Handling**: 400 (invalid params), 404 (not found), 429 (rate limited), 500 (server error).

#### 5.1.2 Search Interface Contract

| Parameter | Type | Constraint | Description |
|-----------|------|------------|-------------|
| query | string | 1–200 chars | Full-text search query |
| sequence | string | regex `^[ACDEFGHIKLMNPQRSTVWY]+$` | Amino acid sequence filter |
| chainLength | integer | 2–50 | Residue count filter |
| classification | enum | hydrophobic/hydrophilic/charged/amphipathic | Chemical class filter |
| therapeuticArea | string | free text | Therapeutic category filter |
| language | enum | en/es/fr/de/zh/ja | Result language filter |
| limit | integer | 1–100, default 20 | Maximum results |
| offset | integer | ≥0, default 0 | Pagination offset |

**Response**: `{ results: SearchResult[], total: number, facets: FacetCounts }`
**Latency Target**: <200ms (p95) for simple queries, <500ms (p95) for filtered queries.

### 5.2 Internal Interfaces

| Interface | Provider | Consumer | Protocol | Description |
|-----------|----------|----------|----------|-------------|
| CalculationService.calculateMW | CalculationService | SequenceRenderer, MonographPage | Function call | Compute molecular weight from sequence |
| CalculationService.calculateCharge | CalculationService | SequenceRenderer, MonographPage | Function call | Compute net charge at pH |
| SearchService.query | SearchService | SearchInterface | Async function | Execute full-text search |
| MolecularDataService.fetch | MolecularDataService | MolecularViewer3D | Async function | Fetch PDB structure data |
| CitationService.export | CitationService | CitationManager | Function call | Generate citation in format |

---

## BP-6: Data Design

### 6.1 Oligopeptide Data Model

```typescript
interface Oligopeptide {
  id: string;                          // Unique identifier (e.g., "ENCP-00001")
  name: string;                        // Common name (e.g., "Angiotensin II")
  iupacName: string;                   // Full IUPAC systematic name
  aliases: string[];                   // Registered aliases
  casNumber?: string;                  // CAS Registry Number
  sequence: string;                    // One-letter amino acid codes (N→C)
  chainLength: number;                 // Number of residues
  molecularWeight: number;             // Monoisotopic MW in Da
  averageWeight: number;               // Average MW in Da
  molecularFormula: string;            // Molecular formula
  netCharge: number;                   // Net charge at pH 7.4
  isoelectricPoint: number;            // pI value
  extinctionCoefficient: number;       // ε₂₈₀ in M⁻¹cm⁻¹
  classification: PeptideClassification;
  structuralFeatures: StructuralFeatures;
  biologicalActivity: BiologicalActivity;
  pharmacology: PharmacologicalProfile[];
  synthesis: SynthesisRoute[];
  references: Reference[];
  pdbEntries: string[];               // PDB structure IDs
  uniprotId?: string;                 // UniProt accession
  chemblId?: string;                  // ChEMBL identifier
  lastReviewed: Date;                 // Last expert review date
  nextReview: Date;                   // Scheduled next review
}

interface PeptideClassification {
  lengthCategory: string;             // dipeptide, tripeptide, ..., oligopeptide
  chemicalClass: string;              // hydrophobic, hydrophilic, charged, amphipathic
  functionalCategory: string;         // neurotransmitter, hormone, antimicrobial, etc.
  structuralType: string;             // linear, cyclic, branched
  sourceOrganisms: string[];          // Source organism(s)
  therapeuticAreas: string[];         // Therapeutic application(s)
}

interface StructuralFeatures {
  cyclicType?: string;                // head-to-tail, disulfide-bridged, etc.
  disulfideBonds?: number;            // Number of S-S bonds
  modifications: ResidueModification[];
  secondaryStructure?: string;        // Dominant secondary structure
  conformationalNotes?: string;
}

interface ResidueModification {
  position: number;                   // 1-indexed residue position
  type: string;                       // phosphorylation, glycosylation, etc.
  description: string;
}

interface BiologicalActivity {
  primaryFunction: string;
  targetReceptors: ReceptorBinding[];
  biosyntheticPathway?: string;
  physiologicalRoles: string[];
}

interface ReceptorBinding {
  receptor: string;
  receptorType: string;               // GPCR, RTK, etc.
  affinity: string;                   // Kd, Ki, IC50, EC50 value
  affinityValue: number;              // Numerical value in nM
  selectivityProfile?: Record<string, number>;
  method: string;                     // Assay type
  reference: string;                  // DOI
}

interface PharmacologicalProfile {
  parameter: string;                  // t½, F, Vd, CL, Cmax, Tmax, AUC
  value: string;                      // Formatted value with units
  numericalValue: number;             // Raw numerical value
  unit: string;
  species: string;
  route: string;
  reference: string;                  // DOI
}

interface SynthesisRoute {
  type: string;                       // SPPS, recombinant, solution-phase
  details: string;                    // Route description
  resinType?: string;                 // For SPPS
  couplingReagents?: string[];
  cleavageConditions?: string;
  yield?: string;
  purity?: string;
}

interface Reference {
  doi: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  pmid?: string;
}
```

### 6.2 Content Schema (Zod)

```typescript
import { z } from 'zod';

const oligopeptideSchema = z.object({
  title: z.string().min(1).max(200),
  iupacName: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  casNumber: z.string().regex(/^\d{2,7}-\d{2}-\d$/).optional(),
  sequence: z.string().regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/),
  chainLength: z.number().int().min(2).max(50),
  classification: z.enum([
    "dipeptide", "tripeptide", "tetrapeptide", "pentapeptide",
    "hexapeptide", "heptapeptide", "octapeptide", "nonapeptide",
    "decapeptide", "oligopeptide"
  ]),
  chemicalClass: z.enum([
    "hydrophobic", "hydrophilic", "charged", "amphipathic"
  ]),
  functionalCategory: z.string(),
  structuralType: z.enum(["linear", "cyclic", "branched"]),
  sourceOrganisms: z.array(z.string()).min(1),
  therapeuticAreas: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  lang: z.enum(["en", "es", "fr", "de", "zh", "ja"]),
  pdbEntries: z.array(z.string()).default([]),
  uniprotId: z.string().optional(),
  chemblId: z.string().optional(),
});
```

### 6.3 User Data Model

```typescript
interface UserPreferences {
  theme: "light" | "dark" | "system";
  locale: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
}

// Stored in localStorage — no server-side user accounts for encyclopeptide.com
```

---

## BP-7: Component Design

### 7.1 MolecularViewer3D State Machine

```
┌─────────────┐
│   Loading    │ ← Initial state (element enters viewport)
└──────┬──────┘
       │ PDB data fetched
       ▼
┌─────────────┐
│  Initializing│ ← WebGL context created
└──────┬──────┘
       │ First frame rendered
       ▼
┌─────────────┐
│   Ready      │ ← Interactive (rotate, zoom, select)
└──────┬──────┘
       │ User action
       ▼
┌─────────────┐
│  Interacting │ ← User manipulating view
└──────┬──────┘
       │ Idle timeout (30s)
       ▼
┌─────────────┐
│   Idle       │ ← Optimization: pause rendering
└──────┬──────┘
       │ User interaction
       ▼
┌─────────────┐
│  Ready       │ ← Resume rendering
└──────┬──────┘
       │ WebGL error
       ▼
┌─────────────┐
│  Fallback    │ ← Switch to 2D SVG viewer
└─────────────┘
```

### 7.2 SearchInterface Sequence Diagram

```
User              SearchInterface      SearchService      Pagefind
 │                    │                    │                 │
 │  type query        │                    │                 │
 │───────────────────>│                    │                 │
 │                    │  debounce(300ms)   │                 │
 │                    │──────────────>     │                 │
 │                    │                    │  query(index)   │
 │                    │                    │────────────────>│
 │                    │                    │  results        │
 │                    │                    │<────────────────│
 │                    │  rankResults()     │                 │
 │                    │──────────────>     │                 │
 │                    │  applyDomainBoosts │                 │
 │                    │──────────────>     │                 │
 │                    │  renderResults()   │                 │
 │<───────────────────│                    │                 │
 │  display results   │                    │                 │
```

### 7.3 CalculationService Sequence Diagram

```
SequenceRenderer     CalculationService      AminoAcidTable
       │                    │                      │
       │  calculateMW(seq)  │                      │
       │───────────────────>│                      │
       │                    │  getResidueMass(aa)  │
       │                    │─────────────────────>│
       │                    │  mass                │
       │                    │<─────────────────────│
       │                    │  sum + termini        │
       │                    │  adjust(disulfides)  │
       │  { mw, unit }      │                      │
       │<───────────────────│                      │
```

### 7.4 DarkModeToggle Component Design

```typescript
function DarkModeToggle() {
  const [mode, setMode] = createSignal<"light" | "dark" | "system">(
    () => localStorage.getItem("theme") ?? "system"
  );

  // Apply theme to document
  createEffect(() => {
    const resolved = mode() === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : mode();
    document.documentElement.setAttribute("data-theme", resolved);
  });

  // Persist preference
  createEffect(() => {
    localStorage.setItem("theme", mode());
  });

  return (
    <button onClick={() => setMode(m => m === "light" ? "dark" : "light")}>
      {mode() === "light" ? "☀️" : "🌙"}
    </button>
  );
}
```

---

## BP-8: Deployment Design

### 8.1 Cloudflare Pages Topology

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Git Integration                      │    │
│  │  GitHub/Gitea Repository → Build Trigger             │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Build Pipeline                       │    │
│  │  1. pnpm install                                     │    │
│  │  2. tsc --noEmit                                     │    │
│  │  3. eslint src/                                      │    │
│  │  4. vitest run (coverage ≥80%)                       │    │
│  │  5. astro build                                      │    │
│  │  6. pagefind --site dist                             │    │
│  │  7. playwright test                                  │    │
│  │  8. lhci autorun                                     │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Static Asset Deployment                  │    │
│  │  dist/ → Cloudflare CDN (300+ PoPs)                  │    │
│  │  Cache-Control: immutable for hashed assets          │    │
│  │  Cache-Control: s-maxage=3600 for HTML               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Workers Routes                           │    │
│  │  /api/* → encyclopeptide-api Worker                  │    │
│  │  /_worker.js → Cloudflare Worker (edge compute)      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Custom Domain                            │    │
│  │  encyclopeptide.com → Pages deployment                │    │
│  │  SSL/TLS: Full (strict)                               │    │
│  │  HSTS: includeSubDomains, preload                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Resource Requirements

| Resource | Free Tier | Required | Paid Tier Projection |
|----------|-----------|----------|---------------------|
| Build minutes | 500/month | ~100/month (2 builds/day) | 5,000/month |
| Bandwidth | Unlimited | 100GB/month (Year 1) | 1TB/month (Year 5) |
| Pages functions | 100,000/day | ~50,000/day | 10M/day |
| Workers CPU | 10ms/request | API routes | 50ms/request |
| KV reads | 100,000/day | ~20,000/day | 10M/day |
| R2 storage | 10GB | ~5GB | 100GB |
| D1 rows read | 5M/day | ~1M/day | 50M/day |

### 8.3 CDN Cache Strategy

| Content Type | Cache-Control | CDN-Cache-Control | Rationale |
|-------------|---------------|-------------------|-----------|
| Static assets (hashed) | `public, max-age=31536000, immutable` | `max-age=31536000` | Immutable — content hash changes on update |
| HTML pages | `public, s-maxage=3600, stale-while-revalidate=86400` | `max-age=3600` | Fresh for 1hr, stale-while-revalidate 24hr |
| Search index | `public, s-maxage=3600` | `max-age=3600` | Refresh hourly |
| API responses | `public, s-maxage=60, stale-while-revalidate=300` | `max-age=60` | Short cache for dynamic data |
| Images (optimized) | `public, max-age=31536000, immutable` | `max-age=31536000` | Immutable after optimization |

---

## BP-9: Formal Verification

### 9.1 Properties to Prove

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-ENCP-001 | MW calculation matches reference within ±0.001 Da | Unit test with known peptides | Pending |
| FV-ENCP-002 | Charge calculation matches Henderson-Hasselbalch | Unit test with known pH/charge pairs | Pending |
| FV-ENCP-003 | pI calculation produces zero net charge | Unit test: charge(pI) ≈ 0 | Pending |
| FV-ENCP-004 | Sequence validation rejects invalid characters | Property test: ∀seq, invalid(seq) → error | Pending |
| FV-ENCP-005 | Classification algorithm covers all residue counts 2–50 | Exhaustive test: ∀n∈[2,50], classify(n) ≠ null | Pending |
| FV-ENCP-006 | Search results are subset of indexed documents | Property test: results ⊆ documents | Pending |
| FV-ENCP-007 | API responses conform to OpenAPI schema | Schema validation on every response | Pending |
| FV-ENCP-008 | Rate limiter blocks at exactly N+1 requests | Stress test: send N+1 requests, verify 429 | Pending |

### 9.2 Invariant Properties

```
// Invariant 1: MW is always positive
∀ seq ∈ validSequences: calculateMW(seq).molecularWeight > 0

// Invariant 2: Residue count matches sequence length
∀ peptide: peptide.chainLength = length(peptide.sequence)

// Invariant 3: pI is within [0, 14]
∀ seq ∈ validSequences: 0 ≤ calculatePI(seq).pI ≤ 14

// Invariant 4: Charge is bounded
∀ seq, pH: |calculateCharge(seq, pH).netCharge| < 100

// Invariant 5: Search results bounded by limit
∀ query: queryResults.length ≤ query.limit
```

---

## BP-10: HAL Specification

### 10.1 Hardware Abstraction Layer

The HAL for encyclopeptide.com abstracts the Cloudflare edge runtime environment, providing a uniform interface for content rendering, data access, and edge computation.

```typescript
// Cloudflare HAL Interface
interface CloudflareHAL {
  // Content rendering
  renderStaticHTML(content: MDXContent, locale: string): HTMLDocument;

  // Storage abstraction
  kv: {
    get<T>(key: string): Promise<T | null>;
    put<T>(key: string, value: T, options?: KVOptions): Promise<void>;
    delete(key: string): Promise<void>;
  };

  r2: {
    get(key: string): Promise<R2ObjectBody | null>;
    put(key: string, body: ReadableStream, options?: R2PutOptions): Promise<R2Object>;
    list(options?: R2ListOptions): Promise<R2Objects>;
  };

  d1: {
    prepare(sql: string, bindings?: unknown[]): D1PreparedStatement;
    exec(sql: string): Promise<D1ExecResult>;
  };

  // Edge compute
  worker: {
    fetch(request: Request): Promise<Response>;
    schedule(cron: string, handler: Function): void;
  };

  // Environment bindings
  env: {
    ASSETS: KVNamespace;
    CACHE: KVNamespace;
    R2_BUCKET: R2Bucket;
    DB: D1Database;
    API_KEY: string;
  };
}
```

### 10.2 HAL Deployment Mapping

| HAL Interface | Cloudflare Service | Purpose |
|---------------|-------------------|---------|
| kv | Cloudflare KV | Session cache, feature flags, search index cache |
| r2 | Cloudflare R2 | Molecular structure PDB files, images, downloads |
| d1 | Cloudflare D1 | Content metadata, analytics, build logs |
| worker.fetch | Cloudflare Workers | API routes, SSR pages |
| worker.schedule | Cron Triggers | Scheduled builds, index refresh |

---

## BP-11: Compliance Matrix

### 11.1 Standards Compliance

| Standard | Requirement | Component | Status | Evidence |
|----------|------------|-----------|--------|----------|
| IEEE 1016-2024 | Software design description | This document | Compliant | All 12 sections present |
| WCAG 2.1 AA | Accessibility | All pages | Target | axe-core testing in CI |
| Section 508 | Accessibility | All pages | Target | WCAG 2.1 AA compliance |
| EN 301 549 | European accessibility | All pages | Target | WCAG 2.1 AA compliance |
| Schema.org | Structured data | All content pages | Target | JSON-LD validation |
| IUPAC-IUBMB | Nomenclature | All peptide data | Target | Automated validation |
| ISO 639-1 | Language codes | i18n routing | Target | Locale prefix validation |
| OpenAPI 3.1 | API specification | REST API | Target | OpenAPI schema validation |
| Core Web Vitals | Performance | All pages | Target | Lighthouse CI assertions |
| OWASP Top 10 | Security | All routes | Target | CSP, HSTS, rate limiting |

### 11.2 Regulatory Compliance

| Regulation | Requirement | Implementation | Status |
|------------|------------|----------------|--------|
| GDPR | User data protection | localStorage only (no PII collection) | Compliant |
| CCPA | User data rights | No PII collected, localStorage only | Compliant |
| European Accessibility Act | Accessibility by 2025 | WCAG 2.1 AA target | On track |
| Copyright Directive | Content licensing | Creative Commons for educational content | Defined |

---

## BP-12: Quality Checklist

### 12.1 Architecture Completeness

- [ ] All 12 Blue Paper sections present and populated
- [ ] Component hierarchy documented with responsibilities
- [ ] Interface contracts defined (API, search, internal)
- [ ] Data models specified with TypeScript interfaces
- [ ] State machines defined for interactive components
- [ ] Sequence diagrams for key user journeys
- [ ] Deployment topology documented with resource requirements
- [ ] Formal verification properties enumerated
- [ ] HAL specification complete
- [ ] Compliance matrix populated
- [ ] Quality checklist self-assessment complete

### 12.2 Traceability Completeness

- [ ] Every FR requirement mapped to architecture component
- [ ] Every NFR requirement mapped to architecture component
- [ ] Every Yellow Paper theory section mapped to implementation
- [ ] Every component has coupling/cohesion analysis
- [ ] Every interface has preconditions, postconditions, error handling

### 12.3 Performance Validation

- [ ] LCP < 2.5s (p75) verified via Lighthouse CI
- [ ] CLS < 0.1 (p75) verified via Lighthouse CI
- [ ] INP < 200ms (p75) verified via Lighthouse CI
- [ ] Page weight < 500KB (gzipped) verified via Lighthouse CI
- [ ] Search latency < 200ms (p95) verified via automated test
- [ ] 3D viewer initialization < 2s verified via Playwright

### 12.4 Accessibility Validation

- [ ] axe-core zero critical violations
- [ ] Keyboard navigation complete (no traps)
- [ ] Screen reader landmark navigation verified
- [ ] Skip link present and functional
- [ ] Contrast ratios meet WCAG 2.1 AA (4.5:1 normal, 3:1 large)
- [ ] 3D viewer has 2D fallback
- [ ] All images have alt text

### 12.5 Security Validation

- [ ] HTTPS enforced (HSTS with preload)
- [ ] CSP header present with correct directives
- [ ] Rate limiting active (100 req/min unauthenticated)
- [ ] Input validation on all API endpoints
- [ ] No secrets in client-side code
- [ ] Dependency audit passes (npm audit)

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Next Action:** Review by Wikisites Architecture Team, iterate on feedback
**Owner:** Wikisites Architecture Team
