---
date: 2026-07-22
author: "Wikipept Contributors"
title: "Peptide Databases — Sequence and Structure Resources"
description: Overview of public peptide databases — UniProt, PDB, PeptideAtlas, Antimicrobial Peptide Database, and specialized resources for sequence, structure, and f.
---

# Peptide Databases

Comprehensive guide to public databases containing peptide sequences, structures, binding data, and functional annotations for research and drug development.

## Database Comparison Overview

| Database | Content | Entries | Update Frequency | URL |
|----------|---------|---------|-----------------|-----|
| UniProt | Protein sequences + function | 250M+ | Weekly | uniprot.org |
| PDB | 3D structures | 215K+ | Weekly | rcsb.org |
| PeptideAtlas | MS-validated peptides | 4M+ | Quarterly | peptideatlas.org |
| APD | Antimicrobial peptides | 3,500+ | Annual |aps.unmc.edu/db |
| PRIDE | Proteomics data | 50K+ | Monthly | ebi.ac.uk/pride |
| BMRB | NMR data | 13K+ | Monthly | bmrb.io |
| NCBI Protein | Sequences + annotations | 300M+ | Daily | ncbi.nlm.nih.gov |
| Ensembl | Genome + transcriptome | 500K+ | Quarterly | ensembl.org |

## Major Sequence Databases

### UniProt

The most comprehensive protein sequence database, combining manually curated (Swiss-Prot) and automatically annotated (TrEMBL) entries.

| Feature | Details |
|---------|---------|
| Total entries | 250 million+ (TrEMBL) + 570K (Swiss-Prot) |
| Peptide-specific | Peptide entries, bioactive peptide annotations |
| Cross-references | PDB, Ensembl, PubMed, InterPro |
| Search tools | UniProtKB, BLAST, ID Mapping |
| Data formats | FASTA, XML, Text |
| API | RESTful API available |

**Key features for peptide researchers:**
- Bioactive peptide annotations (peptide hormone, antimicrobial)
- Post-translational modification data
- Signal peptide predictions
- Cross-references to structures and activities

### NCBI Protein

Aggregates sequences from GenBank, RefSeq, PDB, and literature.

| Feature | Details |
|---------|---------|
| Total entries | 300 million+ |
| Sources | GenBank, RefSeq, PDB, Swiss-Prot |
| Search | Entrez, BLAST, Entrez Programming Utilities |
| Links | PubMed, GenBank, OMIM |
| API | E-utilities |

### Ensembl

Genome-centered database with transcript and protein predictions.

| Feature | Details |
|---------|---------|
| Species | 10,000+ vertebrate and model organisms |
| Content | Genes, transcripts, proteins, variations |
| Tools | BioMart, REST API, genome browser |
| Cross-references | UniProt, PDB, HGNC |

## Structure Databases

### RCSB Protein Data Bank (PDB)

The primary repository for 3D structural data determined by X-ray crystallography, NMR, and cryo-EM.

| Feature | Details |
|---------|---------|
| Total structures | 215,000+ |
| Peptide structures | 15,000+ |
| Resolution | Reported for all X-ray structures |
| Methods | X-ray, NMR, cryo-EM |
| Download | Individual files or bulk |
| API | RESTful API |

**Peptide-specific searches:**
- Search by sequence similarity
- Filter by peptide length (2–50 residues)
- Ligand/peptide-protein complex structures
- NMR ensemble structures of peptides

### PDBe (Protein Data Bank in Europe)

European mirror with additional analysis tools.

| Feature | Details |
|---------|---------|
| Content | Subset of PDB with enhanced annotations |
| Tools | PDBeFold, PDBeMotif |
| Validation | Structure quality scores |
| Integration | UniProt cross-references |

## Peptide-Specific Databases

### PeptideAtlas

Mass spectrometry-validated peptide identifications from published experiments.

| Feature | Details |
|---------|---------|
| Total peptides | 4 million+ (human) |
| Validation | MS/MS spectral matching |
| Sources | Published proteomics experiments |
| Species | Human, mouse, rat, yeast, Arabidopsis |
| Tools | Peptide/Spectrum Match (PSM) search |
| Download | Peptide lists, spectral libraries |

**Key features:**
- Experimentally validated peptide sequences
- Tissue-specific expression data
- Spectral library for targeted proteomics
- Cross-references to UniProt proteins

### Antimicrobial Peptide Database (APD)

Curated database of antimicrobial peptides with activity data.

| Feature | Details |
|---------|---------|
| Total peptides | 3,500+ |
| Organisms | Bacteria, fungi, insects, amphibians, mammals |
| Activities | Antimicrobial, antifungal, antiviral, anticancer |
| Properties | Length, charge, hydrophobicity, structure |
| Predictions | MIC values, mechanism of action |

**Key features for peptide drug design:**
- Activity data (MIC, MBC, MFC)
- Structure-activity relationships
- Taxonomic classification
- Physicochemical property calculations

### Database of Antimicrobial Activity and Structure of Peptides (DASPeptide)

| Feature | Details |
|---------|---------|
| Content | Antimicrobial peptides with structural data |
| Cross-references | APD, PDB, UniProt |
| Analysis | Sequence motifs, structure-activity |

## Proteomics Databases

### PRIDE (Proteomics Identification Database)

Raw and processed proteomics data from published studies.

| Feature | Details |
|---------|---------|
| Studies | 50,000+ |
| Spectra | 5 billion+ |
| Search | Peptide identifications, PSMs |
| API | RESTful API |

### Global Proteome Machine (GPM)

| Feature | Details |
|---------|---------|
| Content | Protein identifications from MS/MS |
| Search | Peptide-to-spectra matches |
| Validation | Statistical scoring (FDR) |

## NMR and Dynamics Databases

### Biological Magnetic Resonance Bank (BMRB)

NMR chemical shifts, relaxation data, and structural restraints.

| Feature | Details |
|---------|---------|
| Entries | 13,000+ |
| Data types | Chemical shifts, NOEs, J-couplings, relaxation |
| Peptide entries | 500+ |
| Validation | Deposition and validation tools |

## Functional and Pharmacological Databases

### BindingDB

Binding affinity data for protein-ligand interactions.

| Feature | Details |
|---------|---------|
| Interactions | 2.5 million+ |
| Peptide entries | 50,000+ |
| Data types | Kd, IC50, Ki, EC50 |
| Sources | Literature, patents |

### IUPHAR/BPS Guide to Pharmacology

Pharmacological target and ligand data.

| Feature | Details |
|---------|---------|
| Targets | 5,000+ |
| Ligands | 10,000+ |
| Peptide entries | 500+ |
| Cross-references | UniProt, PDB, PubChem |

### ChEMBL

Bioactivity data from drug discovery literature.

| Feature | Details |
|---------|---------|
| Compounds | 2 million+ |
| Assays | 20 million+ |
| Peptide entries | 100,000+ |
| Activity types | IC50, EC50, MIC, Ki |

## Specialty Databases

### Peptide Receptor Database

| Feature | Details |
|---------|---------|
| Content | Peptide-receptor interactions |
| Data types | Binding affinity, selectivity |
| Receptors | GPCRs, ion channels, enzymes |

### Thymosin Database

| Feature | Details |
|---------|---------|
| Content | Thymosin family peptides |
| Activities | Wound healing, immune modulation |
| Sequences | Human, animal, synthetic |

### Conotoxin Database (ConoServer)

| Feature | Details |
|---------|---------|
| Total peptides | 8,000+ |
| Organisms | Cone snails |
| Activities | Neurotoxic |
| Structures | 500+ in PDB |

## Data Integration Strategy

### Recommended Workflow

1. **Sequence identification**: NCBI Protein or UniProt → obtain reference sequence
2. **Structure retrieval**: PDB → 3D structure for modeling
3. **Activity data**: APD (antimicrobial) or BindingDB (pharmacological)
4. **Proteomics validation**: PeptideAtlas → experimental evidence
5. **Structural data**: BMRB → NMR chemical shifts for dynamics

### Cross-Reference Mapping

| From | To | Method |
|------|-----|--------|
| UniProt ID | PDB | Cross-reference field |
| PDB ID | UniProt | RCSB API |
| Peptide sequence | UniProt | BLAST search |
| Peptide sequence | PDB | Sequence similarity |
| Activity data | Sequence | APD/BindingDB search |

## Access and Download

| Database | Bulk Download | API | License |
|----------|--------------|-----|---------|
| UniProt | FTP | REST | CC BY 4.0 |
| PDB | FTP | REST | CC0 |
| PeptideAtlas | FTP | Limited | CC BY 3.0 |
| APD | Web only | No | Academic use |
| PRIDE | FTP | REST | CC BY 4.0 |
| BMRB | FTP | REST | Public domain |
| ChEMBL | FTP | REST | CC BY-SA 3.0 |

## References

1. UniProt Consortium. "UniProt: the Universal Protein Knowledgebase." *Nucleic Acids Res* 2023;51:D523-D531.
2. Berman HM, et al. "The Protein Data Bank." *Nucleic Acids Res* 2000;28:235-242.
3. Desiere F, et al. "The PeptideAtlas project." *Nucleic Acids Res* 2006;34:D655-D658.
4. Wang G, et al. "The Antimicrobial Peptide Database." *Nucleic Acids Res* 2016;44:D1098-D1105.
5. Perez-Riverol Y, et al. "PRIDE and related databases." *Nucleic Acids Res* 2019;47:D447-D455.
