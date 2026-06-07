---
title: "Amino Acid Hydrophobicity Scales"
description: "An overview of major hydrophobicity scales including Kyte-Doolittle, Eisenberg, and Wimley-White, and their applications in membrane protein prediction."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["amino-acids", "hydrophobicity", "membrane-proteins", "kyte-doolittle", "bioinformatics"]
category: "Chemistry"
difficulty: "intermediate"
relatedArticles: ["peptide-folding-pathways", "peptide-thermal-stability"]
---

# Amino Acid Hydrophobicity Scales

Hydrophobicity scales quantify the preference of amino acids for aqueous versus nonpolar environments. These numerical assignments are essential for predicting protein structure, identifying membrane-spanning regions, and designing peptides with specific solubility properties.

## Major Hydrophobicity Scales

### Kyte-Doolittle Scale

The Kyte-Doolittle scale (1982) assigns values from -4.5 (most hydrophilic, arginine) to +4.5 (most hydrophobic, isoleucine). Values are derived from experimental free energy of transfer from water to vapor. This scale remains widely used for hydropathy plots that predict transmembrane domains.

**Mnemonic:** "I am Very hydrophobic" (Ile, Val at the top); "R is Really water-loving" (Arg at the bottom).

### Eisenberg Scale

The Eisenberg consensus scale normalizes values from multiple experimental measurements, including octanol-water partitioning and crystal structure analysis. Values range from -1.6 (glutamate) to +0.9 (isoleucine). This scale is particularly useful for calculating hydrophobic moments that predict amphipathic helices.

### Wimley-White Scale

The Wimley-White scale (1996) measures whole-residue free energies of transfer from water to n-octanol or interface environments. This scale better reflects membrane protein behavior because it accounts for the interfacial environment rather than bulk hydrocarbon phases.

## Applications in Membrane Protein Prediction

Hydropathy analysis uses a sliding window (typically 19-21 residues for alpha-helices) to identify stretches of high hydrophobicity. Three consecutive hydrophobic residues with Kyte-Doolittle values above +1.6 typically indicate a transmembrane segment.

## Choosing the Right Scale

- **Kyte-Doolittle:** Quick hydropathy plots, general solubility predictions
- **Eisenberg:** Amphipathic helix detection, hydrophobic moment analysis
- **Wimley-White:** Membrane protein energetics, lipid interface behavior

## Learning Tip

No single scale is universally superior. Cross-validate predictions using at least two scales. When a region scores high on multiple scales, confidence in the prediction increases substantially.
