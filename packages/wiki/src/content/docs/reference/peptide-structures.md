---
title: "Peptide Structures — Molecular Architecture Reference"
description: Three-dimensional structural data for therapeutic peptides — PDB IDs, AlphaFold models, NMR structures, and X-ray crystallography data.
---

Peptide three-dimensional structure is critical for understanding receptor binding, pharmacokinetics, and rational drug design. This reference provides structural data sources for major therapeutic peptides.

## Structural Databases

### Primary Sources

| Database | URL | Coverage |
|----------|-----|----------|
| RCSB PDB | rcsb.org | X-ray, cryo-EM, NMR structures |
| AlphaFold DB | alphafold.ebu.org | AI-predicted structures |
| PDBe | ebi.ac.uk/pdbe | European PDB mirror |
| BMRB | bmrb.io | NMR chemical shifts |
| PEP-FOLD | bioserv.rpbs.univ-paris-dart.fr | Peptide structure prediction |

## Structural Data by Peptide Class

### Insulin Analogs

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| Insulin (native) | 4INS | X-ray | 1.5 Å | R6 hexamer, zinc-coordinated |
| Insulin Lispro | 1LPH | X-ray | 2.0 Å | Disrupted B28-Pro contacts |
| Insulin Aspart | 1TRZ | X-ray | 2.0 Å | Asp28 destabilizes hexamer |
| Insulin Glargine | 1EFS | X-ray | 2.0 Å | Extended C-terminus B-chain |
| Insulin Detemir | 1MOZ | NMR | — | Fatty acid flexible, albumin-binding |
| Insulin Degludec | 6DV7 | Cryo-EM | 3.5 Å | Multi-hexamer chain structure |
| Insulin Glulisine | 1AI0 | X-ray | 1.5 Å | Charge-repulsion interface |

### GLP-1 Receptor Agonists

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| GLP-1 (native) | 1EJU | NMR | — | α-helix, receptor-binding conformation |
| Exendin-4 | 1JRJ | NMR | — | α-helix, DPP-4 resistant |
| Liraglutide | 5VEX | Cryo-EM | 2.9 Å | GLP-1R complex, fatty acid visible |
| Semaglutide | 7UJQ | Cryo-EM | 3.0 Å | GLP-1R complex, Aib8 visible |
| Dulaglutide | 7PFC | Cryo-EM | 3.1 Å | Fc-fusion, GLP-1R complex |

### Growth Hormone Secretagogues

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| Ghrelin (native) | 2J0Y | NMR | — | Flexible, octanoyl-Ser3 modification |
| GHS-R1a (receptor) | 5ZWP | Cryo-EM | 2.9 Å | Active-state conformation |
| GHRP-6 | No structure | — | — | Predicted: extended conformation |
| Ipamorelin | No structure | — | — | Predicted: compact cyclic |
| CJC-1295 | No structure | — | — | Predicted: α-helical, similar to GHRH |
| GHRH (native) | 1HGD | NMR | — | α-helical conformation |

### Thymic Peptides

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| Thymosin Alpha-1 | 2B57 | NMR | — | Extended, no regular secondary structure |
| Thymulin | 1THU | NMR | — | Zinc-binding nonapeptide |
| Thymulin-Zn complex | 2THU | X-ray | 1.0 Å | Zinc coordination geometry |
| TB-4 (Thymosin Beta-4) | 1HJV | NMR | — | Extended, sequesters G-actin |

### Neuropeptides

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| Oxytocin | 1NPO | NMR | — | Cyclic, disulfide bridge 1-6 |
| Vasopressin | 1JK4 | NMR | — | Cyclic, Arg8 variant |
| VIP | 2RFN | NMR | — | α-helical, C-terminal amidated |
| PACAP | 2RPZ | NMR | — | α-helical, VIP-homologous |

### Tissue Repair Peptides

| Peptide | PDB ID | Method | Resolution | Key Features |
|---------|--------|--------|------------|--------------|
| BPC-157 | No structure | — | — | Predicted: extended, no disulfides |
| GHK-Cu | 1JRJ (partial) | NMR | — | Copper coordination geometry |
| GHK | No structure | — | — | Tripeptide, flexible |

## AlphaFold Predictions

AlphaFold provides AI-predicted structures for peptides without experimental data:

| Peptide | AlphaFold ID | Confidence | Predicted Features |
|---------|-------------|------------|-------------------|
| BPC-157 | AF-P0DP23-F1 | Low-Medium | Extended, no regular secondary |
| GHRP-2 | — | — | Too short for prediction |
| GHRP-6 | — | — | Too short for prediction |
| Ipamorelin | — | — | Too short for prediction |
| Thymosin Alpha-1 | AF-P01374-F1 | Medium | Extended conformation |
| Thymulin | — | — | Too short for prediction |

**Note**: AlphaFold is optimized for proteins >50 residues. Most peptides are too short for reliable prediction, and NMR/crystallography remain the gold standard.

## Structure-Function Relationships

### Secondary Structure and Activity

| Structure | Example Peptide | Function |
|-----------|----------------|----------|
| α-Helix | GLP-1, VIP, GHRH | Receptor binding, membrane interaction |
| β-Sheet | Amylin (partially) | Aggregation, fibril formation |
| Extended | Thymosin Alpha-1 | Protein sequestration (G-actin) |
| Cyclic | Oxytocin, Melanotan | Receptor selectivity, stability |
| Random coil | BPC-157 | Flexible binding, multiple targets |

### Conformational Requirements

| Receptor | Peptide Ligand | Required Conformation |
|----------|---------------|----------------------|
| GLP-1R | GLP-1, Semaglutide | α-Helix (C-terminal) |
| GHS-R1a | Ghrelin, GHRP-6 | Flexible (octanoyl-Ser3 critical) |
| Insulin receptor | Insulin | Distinct A/B chain fold |
| MC1R | α-MSH, Afamelanotide | α-Helix (His-Phe-Arg-Trp pharmacophore) |
| GHRH-R | GHRH, CJC-1295 | α-Helix |

## Computational Structure Resources

### Molecular Dynamics Simulations

| Peptide | Simulation Type | Duration | Key Finding |
|---------|----------------|----------|-------------|
| Insulin hexamer | All-atom MD | 1 μs | Hexamer stability dynamics |
| GLP-1 | Coarse-grained | 10 μs | Helix propensity in membrane |
| Ghrelin | Enhanced sampling | 500 ns | Octanoyl group flexibility |

### Docking Studies

| Peptide-Receptor | Method | Binding Mode |
|------------------|--------|--------------|
| GLP-1:GLP-1R | Molecular docking | N-terminal helix buried in binding pocket |
| Ghrelin:GHS-R1a | Molecular dynamics | Octanoyl group in transmembrane pocket |
| Insulin:IR | Cryo-EM guided | Cross-linking two receptor subunits |

## Key Structural Principles

1. **Cyclic peptides** (oxytocin, melanotan) gain stability and receptor selectivity from disulfide or lactam bridges
2. **Fatty acid acylation** (semaglutide, detemir) introduces flexible hydrophobic domains that bind albumin
3. **D-amino acid substitution** (GHRP-2, ipamorelin) blocks protease recognition while maintaining receptor binding
4. **α-Helical structure** (GLP-1, VIP) is required for GPCR activation in the secretin receptor family
5. **Conformational flexibility** (ghrelin, BPC-157) enables multiple receptor interactions but reduces selectivity
