---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Hydrophobicity — Kyte-Doolittle and Eisenberg Scales"
description: "Peptide hydrophobicity scales: Kyte-Doolittle, Eisenberg, and Hopp-Woods for predicting solubility and structure."
---

## Introduction

Hydrophobicity is one of the most fundamental physicochemical properties of peptides. It governs solubility, membrane permeability, protein folding, and receptor binding. Quantifying hydrophobicity through established scales enables prediction of peptide behavior and guides rational design of peptide therapeutics.

## The Hydrophobic Effect

The hydrophobic effect—the tendency of non-polar molecules to aggregate in aqueous solution—is the primary driving force for protein folding, membrane assembly, and micelle formation. It arises not from attraction between hydrophobic molecules but from the thermodynamically unfavorable ordering of water molecules around exposed non-polar surfaces.

When a peptide folds, hydrophobic residues are buried in the protein interior, releasing ordered water molecules and increasing entropy. This entropy gain is the dominant thermodynamic contribution to folding stability.

## Hydrophobicity Scales

### Kyte-Doolittle Scale

The Kyte-Doolittle scale (1982) is the most widely used hydrophobicity scale. It assigns each amino acid a hydrophobicity value based on the free energy of transfer from water to vapor:

| Amino Acid | Kyte-Doolittle Value | Character |
|------------|---------------------|-----------|
| Ile | 4.5 | Most hydrophobic |
| Val | 4.2 | |
| Leu | 3.8 | |
| Phe | 2.8 | |
| Cys | 2.5 | |
| Met | 1.9 | |
| Ala | 1.8 | |
| Gly | -0.4 | |
| Thr | -0.7 | |
| Ser | -0.8 | |
| Trp | -0.9 | |
| Tyr | -1.3 | |
| Pro | -1.6 | |
| His | -3.2 | |
| Glu | -3.5 | |
| Gln | -3.5 | |
| Asp | -3.5 | |
| Asn | -3.5 | |
| Lys | -3.9 | |
| Arg | -4.5 | Most hydrophilic |

Positive values indicate hydrophobicity; negative values indicate hydrophilicity. The scale is particularly useful for predicting transmembrane domains and membrane-spanning helices using a sliding window average.

### Eisenberg Scale

The Eisenberg consensus scale (1984) derives hydrophobicity from the free energy of transfer of amino acid side chains from water to octanol. It provides a more thermodynamically rigorous measure of hydrophobicity:

| Amino Acid | Eisenberg Value |
|------------|----------------|
| Ile | 0.73 |
| Val | 0.54 |
| Leu | 0.53 |
| Phe | 0.61 |
| Cys | 0.04 |
| Met | 0.26 |
| Ala | 0.25 |
| Gly | 0.16 |
| Thr | -0.05 |
| Ser | -0.12 |
| Trp | 0.37 |
| Tyr | 0.02 |
| Pro | -0.07 |
| His | -0.40 |
| Glu | -0.62 |
| Gln | -0.69 |
| Asp | -0.76 |
| Asn | -0.64 |
| Lys | -1.10 |
| Arg | -1.76 |

The Eisenberg scale is commonly used for calculating the hydrophobic moment of amphipathic helices and for predicting protein secondary structure.

### Hopp-Woods Scale

The Hopp-Woods scale (1981) was developed specifically for predicting protein antigenic determinants (epitopes). Unlike the Kyte-Doolittle and Eisenberg scales, the Hopp-Woods scale assigns positive values to hydrophilic residues, as surface-exposed hydrophilic regions are most likely to be recognized by antibodies:

| Amino Acid | Hopp-Woods Value |
|------------|-----------------|
| Pro | 3.0 |
| Asp | 3.0 |
| Glu | 3.0 |
| Lys | 3.0 |
| Arg | 3.0 |
| His | -0.5 |
| Tyr | -1.3 |
| Trp | -3.4 |
| Phe | -2.5 |
| Ile | -1.8 |
| Leu | -1.8 |
| Val | -1.5 |
| Met | -1.3 |
| Ala | -0.5 |
| Gly | 0.3 |
| Thr | -0.4 |
| Ser | 0.3 |
| Cys | -1.0 |
| Asn | 0.2 |
| Gln | 0.2 |

The Hopp-Woods scale is most useful for predicting surface-exposed, hydrophilic regions of peptides that are likely to be immunogenic or solvent-accessible.

### Additional Scales

Several other hydrophobicity scales have been developed for specific applications:

- **Wimley-White scale:** Transfer from water to octanol for whole residues; useful for predicting membrane insertion
- **Engelman scale:** Based on the free energy of transfer for amino acids from water to lipid bilayers; specifically designed for predicting transmembrane helices
- **Roseman scale:** Based on the contact area buried upon protein folding; useful for predicting core packing
- **Black-Mould scale:** Based on the transfer free energy from water to cyclohexane; emphasizes van der Waals interactions

## Calculating Peptide Hydrophobicity

### Mean Hydrophobicity

The simplest measure is the arithmetic mean of residue hydrophobicity values:

```
<H> = (1/N) Σ hi
```

where hi is the hydrophobicity of residue i and N is the peptide length. This provides a global measure of peptide hydrophobicity useful for predicting solubility.

### Hydrophobic Moment

The hydrophobic moment (μH) measures the asymmetry of hydrophobicity distribution around a peptide. For an α-helix, it is calculated as:

```
μH = |Σ hi × exp(i × δ × n)| / N
```

where δ is the angle between successive residues (100° for α-helix), n is the residue index, and i is the imaginary unit.

High hydrophobic moment values indicate amphipathic structures with segregated hydrophobic and hydrophilic faces. Amphipathic helices are common in:
- Membrane-active peptides (antimicrobial peptides, lytic peptides)
- Lipid-binding peptides
- Protein-protein interaction interfaces

### Hydrophobicity Plot

A hydrophobicity plot displays hydrophobicity as a function of residue position using a sliding window average. The window size (typically 7–21 residues) determines the sensitivity to local versus global hydrophobicity patterns.

Peaks in the hydrophobicity plot indicate hydrophobic regions likely to be:
- Membrane-spanning segments (for transmembrane proteins)
- Buried core residues (for soluble proteins)
- Hydrophobic binding pockets (for ligand-binding sites)

## Predicting Solubility

Peptide solubility correlates with mean hydrophobicity:

- **Highly hydrophilic peptides (mean hydrophobicity < -1.0):** Generally soluble in aqueous buffers at high concentrations
- **Moderately hydrophilic peptides (mean hydrophobicity -1.0 to 0):** Soluble at moderate concentrations; may require pH optimization
- **Moderately hydrophobic peptides (mean hydrophobicity 0 to 1):** May require organic co-solvents, surfactants, or lipid-based formulations
- **Highly hydrophobic peptides (mean hydrophobicity > 1):** Typically require organic solvents, detergents, or lipid nanoparticles for formulation

## Predicting Secondary Structure

Hydrophobicity patterns can predict secondary structure propensity:
- Runs of hydrophobic residues with 3-4 residue periodicity suggest amphipathic helices
- Alternating hydrophobic/hydrophilic patterns suggest β-sheet propensity
- Clusters of proline and glycine suggest turn or loop regions

## Applications in Drug Design

Understanding peptide hydrophobicity enables:
- **Formulation design:** Selecting appropriate solvent systems and excipients
- **Membrane permeation:** Designing cell-penetrating peptides with optimized hydrophobicity
- **Receptor binding:** Balancing hydrophobic contacts for affinity while maintaining solubility
- **Oral bioavailability:** Optimizing lipophilicity for intestinal absorption
- **Half-life extension:** Designing lipidated peptides with optimal hydrophobicity for albumin binding

Hydrophobicity is a central parameter in every stage of peptide drug development, from initial design through formulation and delivery.
