---
document_id: BP-COMP-QUERY-001
title: "Query Engine Component"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - SHARED
abstract: >-
  IEEE 1016 compliant architectural specification for the oligopeptide database
  query engine. Covers query interface design, search indexing pipeline, faceted
  search implementation, autocomplete subsystem, cross-reference lookup, and
  sequence-based search algorithms.
yellow_paper_refs:
  - "YP-CHEM-OLIGO-001"
  - "YP-WEB-TECH-001"
---

# Blue Paper: Query Engine Component

**Document ID:** BP-COMP-QUERY-001
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

The Query Engine Component provides the search, lookup, and data retrieval capabilities for both encyclopeptide.com and wikipept.com. It handles full-text search, sequence-based search, faceted filtering, autocomplete suggestions, and cross-reference lookup across the oligopeptide knowledge base. The engine is split into two modes: build-time indexing (Pagefind) for static content and runtime indexing (FlexSearch) for dynamic wiki content.

### 1.2 System Scope

1. **Full-Text Search**: Token-based search across all content with BM25 ranking
2. **Sequence Search**: Amino acid sequence matching (exact, partial, subsequence)
3. **Faceted Search**: Multi-axis filtering (chain length, classification, function, source, therapeutic area)
4. **Autocomplete**: Prefix-based suggestions with debounced execution
5. **Cross-Reference Lookup**: Resolve identifiers (UniProt, PDB, ChEMBL, CAS) to peptide entries
6. **Structure Search**: SMILES substructure matching (encyclopeptide.com only)

### 1.3 Context Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    QUERY ENGINE COMPONENT                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Query       │    │  Index       │    │  Ranking     │  │
│  │  Parser      │    │  Builder     │    │  Engine      │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Core Search Index                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │ Pagefind   │  │ FlexSearch │  │ Sequence   │     │  │
│  │  │ (static)   │  │ (dynamic)  │  │ Index      │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Faceted     │    │ Autocomplete │    │ Cross-Ref    │  │
│  │  Filter      │    │ Engine       │    │ Resolver     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
@wikisites/query-engine
├── QueryParser/
│   ├── textParser.ts         (Full-text query tokenization)
│   ├── sequenceParser.ts     (Amino acid sequence validation)
│   ├── filterParser.ts       (Facet filter parsing)
│   └── identifierParser.ts   (UniProt/PDB/ChEMBL/CAS parsing)
├── IndexBuilder/
│   ├── pagefindBuilder.ts    (Build-time Pagefind index)
│   ├── flexsearchBuilder.ts  (Runtime FlexSearch index)
│   ├── sequenceIndexer.ts    (K-mer based sequence index)
│   └── facetIndexer.ts       (Facet count precomputation)
├── SearchEngine/
│   ├── fullTextSearch.ts     (BM25 text search)
│   ├── sequenceSearch.ts     (Sequence matching algorithms)
│   ├── combinedSearch.ts     (Hybrid text + sequence search)
│   └── searchAggregator.ts   (Merge and deduplicate results)
├── RankingEngine/
│   ├── bm25Scorer.ts         (BM25 relevance scoring)
│   ├── domainBoosts.ts       (Oligopeptide-specific boosts)
│   ├── freshnessScorer.ts    (Content freshness scoring)
│   └── compositeRanker.ts    (Weighted composite scoring)
├── FacetedFilter/
│   ├── filterExecutor.ts     (Apply facet filters)
│   ├── filterCombiner.ts     (AND/OR filter logic)
│   └── facetCounter.ts       (Count results per facet value)
├── AutocompleteEngine/
│   ├── prefixIndex.ts        (Prefix-based suggestion index)
│   ├── suggestionRanker.ts   (Rank suggestions by relevance)
│   └── debouncedExecutor.ts  (Debounce autocomplete queries)
├── CrossReferenceResolver/
│   ├── uniprotResolver.ts    (UniProt ID → peptide)
│   ├── pdbResolver.ts        (PDB ID → peptide)
│   ├── chemblResolver.ts     (ChEMBL ID → peptide)
│   ├── casResolver.ts        (CAS number → peptide)
│   └── aliasResolver.ts      (Common name → peptide)
└── SequenceSearch/
    ├── exactMatch.ts         (Exact sequence match)
    ├── subsequenceMatch.ts   (Substring search)
    ├── kmerIndex.ts          (K-mer based index for fast lookup)
    └── smartsMatch.ts        (SMILES/SMARTS substructure)
```

### 2.2 Component Descriptions

| Component | Module | Responsibility | Dependencies |
|-----------|--------|----------------|--------------|
| QueryParser | QueryParser/ | Parse user input into structured query objects | None (pure parsing) |
| IndexBuilder | IndexBuilder/ | Generate search indexes at build/runtime | Pagefind, FlexSearch |
| SearchEngine | SearchEngine/ | Execute queries against indexes | IndexBuilder |
| RankingEngine | RankingEngine/ | Score and rank search results | BM25 algorithm |
| FacetedFilter | FacetedFilter/ | Apply multi-axis filters to results | Facet index |
| AutocompleteEngine | AutocompleteEngine/ | Generate prefix-based suggestions | Prefix index |
| CrossReferenceResolver | CrossReferenceResolver/ | Resolve external identifiers to peptides | Peptide database |
| SequenceSearch | SequenceSearch/ | Execute sequence-based searches | K-mer index |

---

## BP-3: Design Rationale

### 3.1 Dual Index Strategy

| Criterion | Pagefind Only | FlexSearch Only | Hybrid (Both) | Decision |
|-----------|--------------|-----------------|---------------|----------|
| Static content | Excellent | Excellent | Both | — |
| Dynamic wiki content | Impossible | Excellent | FlexSearch | — |
| Build time | Fast | N/A (runtime) | Acceptable | — |
| Bundle size | 30KB WASM | 15KB JS | 45KB total | Acceptable |
| Query latency | <50ms | <20ms | <50ms both | — |

**Decision**: Pagefind for static content (encyclopeptide.com + wiki guides), FlexSearch for dynamic content (wikipept.com wiki edits).

### 3.2 K-mer Sequence Index

| Criterion | Brute Force | K-mer Index | Decision |
|-----------|-------------|-------------|----------|
| Index size | O(1) | O(n × L) | Brute force — but slow query |
| Query time | O(N × L) | O(1) lookup | K-mer — faster query |
| N = 10,000 peptides | ~100ms | <5ms | K-mer — 20x faster |
| Index build | None | O(n × L) | K-mer — built at build time |

**Decision**: K-mer index for sequence search — build-time cost amortized over query-time savings.

### 3.3 BM25 Over TF-IDF

| Criterion | TF-IDF | BM25 | Decision |
|-----------|--------|------|----------|
| Term saturation | Linear | Bounded (k1 parameter) | BM25 — better normalization |
| Length normalization | Basic | IDF-weighted | BM25 — handles doc length variation |
| Industry standard | Legacy | Current standard | BM25 — proven effectiveness |
| Pagefind default | — | BM25 | BM25 — already integrated |

**Decision**: BM25 for text ranking — industry standard, Pagefind default.

---

## BP-4: Traceability

| Requirement ID | Component | Verification |
|----------------|-----------|--------------|
| FR-001 | SearchEngine.fullTextSearch | <200ms response test |
| FR-002 | FacetedFilter.filterExecutor | Verify each facet returns correct subset |
| FR-003 | SequenceSearch.exactMatch | Submit known sequences, verify matches |
| FR-004 | SequenceSearch.smartsMatch | Submit SMILES, verify structural matches |
| FR-005 | SearchEngine.searchAggregator | Highlighting and pagination test |
| FR-020 | CrossReferenceResolver.aliasResolver | Name/alias → correct monograph |
| FR-030 | SearchEngine (API) | OpenAPI schema validation |
| NFR-006 | SearchEngine | <200ms simple, <500ms complex |
| NFR-014 | QueryParser (rate limiting) | Rate limit test |

---

## BP-5: Interface Design

### 5.1 Query Parser Interface

```typescript
interface ParsedQuery {
  type: "text" | "sequence" | "identifier" | "combined";
  textQuery?: TextQuery;
  sequenceQuery?: SequenceQuery;
  identifierQuery?: IdentifierQuery;
  filters: ParsedFilters;
  limit: number;
  offset: number;
}

interface TextQuery {
  terms: string[];
  exact: boolean;                 // Exact phrase match
  fields: string[];               // Which fields to search
}

interface SequenceQuery {
  sequence: string;               // One-letter amino acid codes
  matchType: "exact" | "substring" | "kmer";
  minSimilarity?: number;         // For fuzzy matching (0–1)
}

interface IdentifierQuery {
  identifier: string;
  source: "uniprot" | "pdb" | "chembl" | "cas" | "name";
}

interface ParsedFilters {
  chainLength?: [number, number];
  classification?: string[];
  functionalCategory?: string[];
  sourceOrganism?: string[];
  therapeuticArea?: string[];
  tags?: string[];
  dateRange?: [Date, Date];
}
```

### 5.2 Search Engine Interface

```typescript
interface SearchRequest {
  query: string;                  // Raw user input
  locale?: string;                // Result language
  filters?: SearchFilters;
  limit?: number;                 // Default: 20, max: 100
  offset?: number;                // Default: 0
  sort?: "relevance" | "freshness" | "name";
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  facets: FacetResult[];
  queryTimeMs: number;
  parsedQuery: ParsedQuery;
  suggestions?: string[];         // "Did you mean..."
}

interface SearchResult {
  id: string;
  type: "peptide" | "concept" | "study_guide" | "glossary";
  title: string;
  snippet: string;                // Highlighted excerpt
  url: string;
  score: number;
  highlights: TextHighlight[];
  metadata: SearchResultMetadata;
}

interface TextHighlight {
  field: string;
  snippet: string;                // With <mark> tags
  offsets: [number, number][];
}

interface FacetResult {
  name: string;                   // e.g., "chainLength"
  values: FacetValue[];
}

interface FacetValue {
  value: string;
  count: number;
  selected: boolean;
}
```

### 5.3 Sequence Search Interface

```typescript
interface SequenceSearchRequest {
  sequence: string;               // One-letter amino acid codes
  matchType: "exact" | "substring" | "kmer" | "smiles";
  minSimilarity?: number;         // For fuzzy matching
  limit?: number;
  offset?: number;
}

interface SequenceSearchResponse {
  results: SequenceMatch[];
  total: number;
  queryTimeMs: number;
}

interface SequenceMatch {
  peptideId: string;
  name: string;
  sequence: string;
  matchPosition?: [number, number]; // For substring matches
  similarity?: number;              // For fuzzy matches (0–1)
  alignment?: string;               // Visual alignment
}
```

### 5.4 Autocomplete Interface

```typescript
interface AutocompleteRequest {
  prefix: string;                 // User input prefix
  limit?: number;                 // Default: 10
  locale?: string;
  types?: ("peptide" | "concept" | "glossary")[];
}

interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
  queryTimeMs: number;
}

interface AutocompleteSuggestion {
  text: string;                   // Suggestion text
  type: "peptide" | "concept" | "glossary";
  url: string;
  score: number;
  highlight?: string;             // Matched portion highlighted
}
```

### 5.5 Cross-Reference Interface

```typescript
interface CrossRefLookupRequest {
  identifier: string;
  source: "uniprot" | "pdb" | "chembl" | "cas" | "name";
}

interface CrossRefLookupResponse {
  found: boolean;
  peptideId?: string;
  name?: string;
  url?: string;
  alternateIds?: AlternateId[];
}

interface AlternateId {
  source: string;
  id: string;
}
```

---

## BP-6: Data Design

### 6.1 Search Index Schema

```typescript
interface SearchIndexDocument {
  id: string;
  type: "peptide" | "concept" | "study_guide" | "glossary";
  title: string;
  body: string;                   // Full text content
  tags: string[];
  classification: string;
  language: string;
  url: string;
  lastModified: Date;
  viewCount: number;
  editCount: number;
  qualityScore: number;
  metadata: {
    sequence?: string;            // For peptide entries
    chainLength?: number;
    chemicalClass?: string;
    functionalCategory?: string;
    sourceOrganisms?: string[];
    pdbEntries?: string[];
    uniprotId?: string;
  };
}
```

### 6.2 K-mer Sequence Index Schema

```typescript
interface KmerIndex {
  k: number;                      // K-mer size (default: 3)
  entries: Map<string, KmerEntry>;
}

interface KmerEntry {
  kmer: string;                   // e.g., "ACD"
  peptideIds: string[];           // Peptides containing this kmer
  positions: Map<string, number[]>; // Peptide → positions of this kmer
}

// K-mer size selection rationale:
// k=2: too common (400 possible kmers), poor discrimination
// k=3: 8000 possible kmers, good balance of specificity and coverage
// k=4: 160000 possible kmers, too sparse for small datasets
```

### 6.3 Facet Index Schema

```typescript
interface FacetIndex {
  chainLength: Map<number, string[]>;    // Length → peptide IDs
  classification: Map<string, string[]>; // Class → peptide IDs
  functionalCategory: Map<string, string[]>;
  sourceOrganism: Map<string, string[]>;
  therapeuticArea: Map<string, string[]>;
  tags: Map<string, string[]>;
}
```

---

## BP-7: Component Design

### 7.1 Search Flow Sequence Diagram

```
User          SearchInterface    QueryParser    SearchEngine    RankingEngine
  │                │                │               │               │
  │ type "angio"  │                │               │               │
  │───────────────>│                │               │               │
  │                │ debounce(300ms)│               │               │
  │                │──────────>     │               │               │
  │                │                │ parseQuery()  │               │
  │                │                │──────────>    │               │
  │                │                │ {textQuery:   │               │
  │                │                │  terms:["angio"]│             │
  │                │                │ <──────────   │               │
  │                │                │               │               │
  │                │                │ search(parsed)│               │
  │                │                │──────────────>│               │
  │                │                │               │ rankResults() │
  │                │                │               │──────────────>│
  │                │                │               │ {ranked}      │
  │                │                │               │<──────────────│
  │                │                │ {results}     │               │
  │                │                │<──────────────│               │
  │                │ {results}      │               │               │
  │                │<───────────────│               │               │
  │ display results│                │               │               │
  │<───────────────│                │               │               │
```

### 7.2 Sequence Search Flow

```
User inputs "ACDEF"    SequenceSearch     KmerIndex      PeptideDB
        │                    │                │              │
        │ search("ACDEF")    │                │              │
        │───────────────────>│                │              │
        │                    │ validateSeq()  │              │
        │                    │──────────>     │              │
        │                    │ valid          │              │
        │                    │<──────────     │              │
        │                    │                │              │
        │                    │ exact match    │              │
        │                    │───────────────>│              │
        │                    │ lookup("ACDEF")│              │
        │                    │<───────────────│              │
        │                    │ [peptideIds]   │              │
        │                    │                │              │
        │                    │ fetchPeptides()│              │
        │                    │──────────────────────────────>│
        │                    │ peptideData[]  │              │
        │                    │<──────────────────────────────│
        │                    │                │              │
        │ {results}          │                │              │
        │<───────────────────│                │              │
```

### 7.3 Autocomplete Flow

```
User types "ang"    Autocomplete    PrefixIndex    RankingEngine
      │                  │              │              │
      │ input("ang")     │              │              │
      │─────────────────>│              │              │
      │                  │ debounce(150)│              │
      │                  │────────>     │              │
      │                  │              │ prefixLookup │
      │                  │              │ ("ang")      │
      │                  │              │─────────────>│
      │                  │              │ [candidates] │
      │                  │              │<─────────────│
      │                  │              │              │
      │                  │ rankSuggestions()            │
      │                  │─────────────────────────────>│
      │                  │ {ranked}     │              │
      │                  │<─────────────────────────────│
      │ suggestions[]    │              │              │
      │<─────────────────│              │              │
```

---

## BP-8: Deployment Design

### 8.1 Index Generation Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                BUILD-TIME INDEX GENERATION                 │
│                                                           │
│  1. astro build → dist/ (static HTML)                    │
│                                                           │
│  2. pagefind --site dist                                 │
│     ├── Scan HTML files                                  │
│     ├── Extract text content                             │
│     ├── Tokenize and build inverted index                │
│     ├── Generate compressed WASM index                   │
│     └── Output: dist/_pagefind/                          │
│                                                           │
│  3. Generate sequence index                              │
│     ├── Extract sequences from content                   │
│     ├── Build k-mer index (k=3)                          │
│     ├── Build exact match hash table                     │
│     └── Output: dist/_sequence_index.json                │
│                                                           │
│  4. Generate facet index                                 │
│     ├── Extract facet values from content                │
│     ├── Count occurrences per facet value                │
│     └── Output: dist/_facet_index.json                   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Runtime Index (wikipept.com)

```
┌─────────────────────────────────────────────────────────┐
│                RUNTIME INDEX (FLEXSEARCH)                  │
│                                                           │
│  1. Wiki page created/updated                            │
│     ├── Durable Object broadcasts edit                   │
│     ├── Worker receives edit event                       │
│     └── FlexSearch index updated in KV                   │
│                                                           │
│  2. Search query received                                │
│     ├── Worker loads FlexSearch from KV                  │
│     ├── Execute query against in-memory index            │
│     ├── Apply facet filters                              │
│     ├── Rank results                                     │
│     └── Return JSON response                             │
│                                                           │
│  3. Index refresh                                        │
│     ├── Cron trigger: every 15 minutes                   │
│     ├── Rebuild FlexSearch from D1 content               │
│     └── Update KV cache                                  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.3 Resource Requirements

| Resource | Static Index (Pagefind) | Dynamic Index (FlexSearch) |
|----------|------------------------|---------------------------|
| Index size | ~2MB for 1000 pages | ~1MB in KV |
| Build time | ~5 seconds | N/A (runtime) |
| Query latency | <50ms | <20ms |
| Memory usage | ~10MB (WASM) | ~15MB (Worker) |
| KV reads | 0 (built into static) | ~1000/day |
| KV writes | 0 | ~100/day (index updates) |

---

## BP-9: Formal Verification

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-QUERY-001 | Exact sequence search returns only matching peptides | Property test: ∀ result, result.sequence = query | Pending |
| FV-QUERY-002 | K-mer index is consistent with exact match index | Cross-validation: kmerResults ⊆ exactResults | Pending |
| FV-QUERY-003 | Faceted filter results are subset of unfiltered results | Property test: filtered ⊆ unfiltered | Pending |
| FV-QUERY-004 | Autocomplete suggestions match prefix | Property test: ∀ suggestion, startsWith(suggestion, prefix) | Pending |
| FV-QUERY-005 | Search ranking is deterministic | Property test: same input → same output order | Pending |
| FV-QUERY-006 | Cross-reference lookup returns unique result | Property test: onePeptide per identifier | Pending |
| FV-QUERY-007 | Pagination bounds are respected | Property test: results.length ≤ limit | Pending |

---

## BP-10: HAL Specification

```typescript
interface QueryEngineHAL {
  // Index storage
  index: {
    load(name: string): Promise<SearchIndex>;
    save(name: string, index: SearchIndex): Promise<void>;
    exists(name: string): Promise<boolean>;
  };

  // Sequence storage
  sequenceIndex: {
    load(): Promise<KmerIndex>;
    save(index: KmerIndex): Promise<void>;
  };

  // Facet storage
  facetIndex: {
    load(): Promise<FacetIndex>;
    save(index: FacetIndex): Promise<void>;
  };

  // External resolver
  resolver: {
    resolveUniProt(id: string): Promise<CrossRefLookupResponse>;
    resolvePDB(id: string): Promise<CrossRefLookupResponse>;
    resolveChEMBL(id: string): Promise<CrossRefLookupResponse>;
    resolveCAS(id: string): Promise<CrossRefLookupResponse>;
  };
}
```

---

## BP-11: Compliance Matrix

| Standard | Requirement | Component | Status |
|----------|------------|-----------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| BM25 ranking | Text relevance | RankingEngine | Target |
| IUPAC sequence notation | Sequence search | SequenceSearch | Target |
| Core Web Vitals | Search latency <200ms | SearchEngine | Target |
| FAIR Data Principles | Findable, accessible | CrossReferenceResolver | Target |

---

## BP-12: Quality Checklist

### 12.1 Engine Completeness

- [ ] All 7 module groups documented with interfaces
- [ ] Query parser handles text, sequence, identifier, and combined queries
- [ ] Index builder supports both Pagefind and FlexSearch
- [ ] Sequence search supports exact, substring, and k-mer matching
- [ ] Faceted filter supports all required facets
- [ ] Autocomplete provides debounced prefix suggestions
- [ ] Cross-reference resolver handles all identifier types

### 12.2 Performance

- [ ] Simple text search < 200ms (p95)
- [ ] Complex filtered search < 500ms (p95)
- [ ] Sequence exact match < 50ms (p95)
- [ ] Autocomplete response < 100ms (p95)
- [ ] Index build < 10 seconds for 1000 documents

### 12.3 Accuracy

- [ ] Search results are subset of indexed documents
- [ ] Sequence search returns only valid matches
- [ ] Faceted counts are accurate
- [ ] Cross-reference resolution is correct
- [ ] Ranking is deterministic and reproducible

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Owner:** Wikisites Architecture Team
