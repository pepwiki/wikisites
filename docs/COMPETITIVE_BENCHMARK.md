# Competitive Benchmark & Gap Analysis

## Sites Benchmarked

| Site | Focus | Strengths |
|------|-------|-----------|
| **Pepedia** | Peptide database | Comprehensive peptide data, search, filtering |
| **Peptide2.com** | Synthesis services | Tools (MW calculator, property calculator, amino acid converter), ordering |
| **RCSB PDB** | Protein structures | 255K+ structures, 3D visualization (Mol*), advanced search, APIs |
| **UniProt** | Protein sequences | Comprehensive protein data, annotations, cross-references |
| **ProteomicsDB** | Proteomics data | Expression data, tissue distribution, drug targets |
| **PRIDE** | Mass spec data | Raw data repository, peptide identification |

## Feature Gap Analysis

### What Competitors Have That We Don't

| Feature | Competitor | Priority | Effort |
|---------|-----------|----------|--------|
| **3D Molecular Visualization** | RCSB PDB | High | High |
| **Peptide Property Calculator** | Peptide2.com | High | Low |
| **Molecular Weight Calculator** | Peptide2.com | High | Done |
| **Amino Acid Converter** | Peptide2.com | Medium | Low |
| **Peptide Sequence Search** | UniProt | High | Medium |
| **Advanced Filtering** | Pepedia | High | Medium |
| **API Access** | RCSB PDB | Medium | Medium |
| **Protein Structure Viewer** | RCSB PDB | High | High |
| **Peptide Synthesis Ordering** | Peptide2.com | Low | N/A (not a service) |
| **Expression Data** | ProteomicsDB | Medium | High |
| **Cross-references** | UniProt | Medium | Medium |
| **Literature Citations** | All | Medium | Medium |
| **User Contributions** | All | Low | Medium |

### What We Have That Competitors Don't

| Feature | Wikipept | Competitors |
|---------|----------|-------------|
| **Dark mode** | Yes | No (most are light-only) |
| **Spaced repetition (FSRS)** | Yes | No |
| **Interactive quizzes** | 1011 | Limited |
| **Flashcards** | 1004 | No |
| **Learn lessons** | 30 | No |
| **Community annotations** | Yes | No |
| **Community discussions** | Yes | No |
| **User reputation** | Yes | No |
| **Theme customization** | Yes | No |
| **i18n (16 languages)** | Yes | Limited |
| **Offline support (PWA)** | Yes | No |
| **Accessibility (WCAG 2.1 AA)** | Yes | Varies |
| **Performance (TTFB 21-121ms)** | Excellent | Varies |

## Content Gap Analysis

### What Competitors Cover That We Don't

| Topic | Competitor Coverage | Our Coverage | Gap |
|-------|-------------------|--------------|-----|
| **3D Structures** | RCSB PDB: 255K+ | None | Critical |
| **Protein Sequences** | UniProt: 200M+ | None | Critical |
| **Mass Spec Data** | PRIDE: 1000s datasets | None | Medium |
| **Expression Data** | ProteomicsDB: tissues | None | Medium |
| **Synthesis Ordering** | Peptide2.com | None | Low (not our focus) |
| **Peptide Libraries** | Peptide2.com | None | Low |
| **Clinical Trial Data** | ClinicalTrials.gov | 20 quizzes | Medium |
| **Patent Data** | Various | None | Low |

### What We Cover That Competitors Don't

| Topic | Our Coverage | Competitor Coverage |
|-------|-------------|-------------------|
| **Oligopeptide Education** | 1011 quizzes, 1004 flashcards | Limited |
| **Spaced Repetition** | FSRS algorithm | None |
| **Community Learning** | Annotations, discussions | None |
| **Accessibility** | WCAG 2.1 AA | Varies |
| **Dark Mode** | Full support | None |
| **Offline Support** | PWA | None |

## Recommendations

### High Priority (Next Sprint)

1. **3D Molecular Visualization**
   - Integrate Mol* viewer for peptide structures
   - Link to RCSB PDB entries
   - Embed in article pages
   - Effort: 2-3 weeks

2. **Peptide Property Calculator**
   - Molecular weight (done)
   - Isoelectric point
   - Charge at pH
   - Hydrophobicity
   - Extinction coefficient
   - Effort: 1 week

3. **Advanced Search & Filtering**
   - Filter by length, charge, hydrophobicity
   - Filter by amino acid composition
   - Filter by modification
   - Effort: 1-2 weeks

### Medium Priority (Next Month)

4. **API Access**
   - REST API for peptide data
   - Search API
   - Quiz/flashcard API
   - Effort: 2 weeks

5. **Cross-references**
   - Link to UniProt entries
   - Link to RCSB PDB structures
   - Link to PubMed articles
   - Effort: 1 week

6. **Expression Data Integration**
   - Tissue expression from ProteomicsDB
   - Disease associations
   - Effort: 2 weeks

### Low Priority (Next Quarter)

7. **Literature Citations**
   - DOI linking
   - PubMed integration
   - Citation formatting
   - Effort: 1 week

8. **User Contributions**
   - Community-sourced content
   - Peer review system
   - Effort: 2 weeks

9. **Offline Enhancement**
   - Full offline quiz/flashcard support
   - Sync when online
   - Effort: 1 week

## Competitive Advantages to Maintain

1. **Dark mode** - No competitor has this
2. **Spaced repetition** - Unique to Wikipept
3. **Community learning** - Annotations, discussions, reputation
4. **Accessibility** - WCAG 2.1 AA compliance
5. **Performance** - TTFB 21-121ms
6. **i18n** - 16 languages
7. **Offline support** - PWA with service worker

## Action Items

| Item | Owner | Priority | Target |
|------|-------|----------|--------|
| 3D viewer integration | Engineering | High | Next sprint |
| Property calculator | Engineering | High | Next sprint |
| Advanced search | Engineering | High | Next sprint |
| API development | Engineering | Medium | Next month |
| Cross-references | Content | Medium | Next month |
| Expression data | Data | Medium | Next month |
