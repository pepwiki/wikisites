---
date: 2026-07-22
author: "Wikipept Contributors"
title: "Peptide Sequence Motifs — Structure-Function Patterns"
description: Reference table of common peptide sequence motifs, their biological functions, structural implications, and significance in drug design.
---

# Peptide Sequence Motifs

Reference catalog of conserved sequence motifs in peptides and proteins, with their biological functions, structural roles, and significance for peptide drug design.

## Protease Recognition Motifs

### DPP-4 Cleavage Motifs

Dipeptidyl peptidase-4 (DPP-4/CD26) cleaves dipeptides from the N-terminus after Pro or Ala at position 2:

| Motif | Sequence Context | Cleavage Rate | Drug Design Implication |
|-------|-----------------|---------------|------------------------|
| Xaa-Pro↓ | Ala-His-Pro↓ | Fast | GLP-1 native site — Aib substitution blocks |
| Xaa-Ala↓ | Glu-Gly-Ala↓ | Moderate | GIP native site — modification required |
| Xaa-Ser↓ | — | Very slow | Natural DPP-4 resistance |
| Xaa-Gly↓ | — | Negligible | No cleavage — resistant motif |

**Blocking strategies**: Aib at position 2, β-amino acids, D-amino acids, N-methylation.

### Trypsin Cleavage Motifs

Trypsin cleaves C-terminal to Lys and Arg:

| Motif | Sequence Context | Cleavage Rate | Protection Strategy |
|-------|-----------------|---------------|---------------------|
| Xaa-Lys↓ | — | Fast | Lys → ornithine, N-methylation |
| Xaa-Arg↓ | — | Fast | Arg → citrulline, N-methylation |
| Xaa-Lys-Pro↓ | — | Slow | Pro shields Lys from cleavage |

### Metalloprotease Motifs

Matrix metalloproteinases (MMPs) recognize specific sequences:

| Motif | MMP | Cleavage Site | Functional Role |
|-------|-----|---------------|-----------------|
| Pro-Leu↓Gly-Leu | MMP-1 | Collagen | Fibrillar collagen cleavage |
| Pro-Gln↓Gly-Ile | MMP-2 | Gelatin | Type IV collagen cleavage |
| Pro-Arg↓Gly-Leu | MMP-9 | Gelatin | Basement membrane degradation |

## Signaling Motifs

### Phosphorylation Sites

| Motif | Kinase | Function | Consensus |
|-------|--------|----------|-----------|
| Ser/Thr-Pro | CDK | Cell cycle | [S/T]PX[K/R] |
| Tyr-[Asp/Glu] | Receptor Tyr kinases | Signal transduction | pYXX[D/E] |
| Arg-Arg-X-Ser/Thr | PKA | cAMP signaling | R-R-X-[S/T] |
| [Ser/Thr]-X-Arg | PKC | Calcium signaling | [S/T]X[K/R] |

### SH2 Binding Motifs

Src Homology 2 domains recognize phosphorylated tyrosine motifs:

| Motif | SH2 Domain | Affinity | Biological Role |
|-------|-----------|----------|-----------------|
| pY-E-E-I | Grb2 | High | Growth factor signaling |
| pY-D-E-P | PLCγ | High | Calcium signaling |
| pY-A-P-E | Src | High | Kinase regulation |
| pY-V-N-V | SHP-2 | Moderate | Phosphatase recruitment |

### PDZ Binding Motifs

PDZ domains recognize C-terminal motifs:

| Motif | PDZ Domain | Function |
|-------|-----------|----------|
| X-Ser/Thr-X-Val-COOH | PSD-95 | Synaptic organization |
| X-Hydrophobic-X-Val-COOH | NHERF | Membrane trafficking |

## Structural Motifs

### Disulfide Bond Patterns

| Motif | Bond Pattern | Peptide Example | Structural Role |
|-------|-------------|-----------------|-----------------|
| Cys-X-Cys | Cys₂-Cys₇ | Oxytocin, vasopressin | N-terminal ring constriction |
| Cys-X-X-X-X-Cys | Cys₃-Cys₈ | Insulin A chain | Inter/intra-chain crosslink |
| Cys-X-X-Cys | — | Defensins | β-hairpin stabilization |
| Cys-Gly-X-Cys | — | Conotoxins | Knottin fold |

### Helix-Capping Motifs

| Motif | Position | Function | Example |
|-------|----------|----------|---------|
| Asn-cap | N-cap | Nucleates α-helix | T4 lysozyme |
| Gly-cap | N-cap | Flexible initiation | Cytochrome c |
| Pro-kink | Internal | Helix disruption | GPCR transmembrane |
| Schellman | C-cap | Terminate α-helix | Various |

### β-Turn Sequences

| Motif | Turn Type | Structural Role |
|-------|-----------|-----------------|
| Pro-Gly | Type I/II | β-hairpin reversal |
| Asn-Gly | Type I | β-sheet edge |
| Asp-Gly | Type II' | Reversed turn |
| Pro-X-X-Gly | Type I | β-hairpin stabilization |

## Receptor Binding Motifs

### GLP-1 Receptor Binding

| Position | Motif | Function | Modification for Stability |
|----------|-------|----------|---------------------------|
| 7-13 | His-Ala-Glu-Gly-Thr-Phe-Thr | Core binding | Retained in analogs |
| 8 | Ala-Glu | DPP-4 site | Aib blocks cleavage |
| 15-21 | Ser-Asp-Val-S-Ser-Tyr | Receptor contact | Modified for selectivity |
| 22-26 | Leu-Glu-Gln-Ala-Ala | Helix formation | Maintained |

### Insulin Receptor Binding

| Region | Motif | Function |
|--------|-------|----------|
| A1-A21 | Intra-chain disulfides | Structural scaffold |
| B20-B30 | Hydrophobic C-terminus | Receptor binding |
| B23-B26 | Phe-Val-Asn-Gln | Core binding epitope |

### Melanocortin Receptor Binding

| Motif | Receptor | Function |
|-------|----------|----------|
| His-Phe-Arg-Trp | MC4R | Core agonist motif |
| Phe-Arg-Trp | MC3R/MC4R | Minimum active sequence |
| Asp-Phe-Arg-Trp | MC4R | Full agonist |

## Degradation-Prone Motifs

### Deamidation Hotspots

| Motif | Deamidation Rate | Half-Life (pH 7.4, 37°C) |
|-------|-----------------|--------------------------|
| Asn-Gly | Very fast | 1-2 days |
| Asn-Ser | Fast | 3-5 days |
| Asn-Ala | Moderate | 7-10 days |
| Gln-Gly | Slow | 14-21 days |

### Oxidation Hotspots

| Motif | Oxidation Rate | Protection Strategy |
|-------|---------------|---------------------|
| Met-X-X-Met | Fast | Replace Met with Nle or Met(O) |
| Trp-Pro | Moderate | Replace Trp with 5-FTrp |
| Cys-Cys | Fast (disulfide) | Block with alkylation |

### Isomerization Hotspots

| Motif | Isomerization Rate | Structural Impact |
|-------|-------------------|-------------------|
| Asp-Gly | Very fast | IsoAsp formation |
| Asp-Ser | Fast | Charge alteration |
| Asp-Pro | Moderate | Backbone disruption |

## Motif Database References

| Database | URL | Content |
|----------|-----|---------|
| PROSITE | prosite.expasy.org | Protein domains, families, sites |
| InterPro | ebi.ac.uk/interpro | Protein classification |
| Pfam | ebi.ac.uk/pfam | Protein families |
| SCOP | scop.mrc-lmb.cam.ac.uk | Structural classification |
| CATH | cathwww.biochem.ucl.ac.uk | Protein domain hierarchy |

## References

1. Rawlings ND, et al. "MEROPS: the peptidase database." *Nucleic Acids Res* 2023;51:D633-D641.
2. Sigrist CJ, et al. "PROSITE: a protein domain database." *Nucleic Acids Res* 2013;41:D344-D348.
3. Hulo N, et al. "The PROSITE database." *Nucleic Acids Res* 2006;34:D227-D230.
4. Puntervoll P, et al. "EMBOSS patterns: motif detection." *Bioinformatics* 2003;19:1978-1980.
5. Attwood TK, et al. "PRINTS: a protein motif fingerprint database." *Nucleic Acids Res* 2003;31:400-402.
