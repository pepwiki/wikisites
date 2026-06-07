---
title: "NMR Spectroscopy for Peptides"
description: "Nuclear magnetic resonance spectroscopy using 1H NMR, COSY, and NOESY experiments provides atomic-resolution structure determination of peptides in solution under near-physiological conditions."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["NMR", "spectroscopy", "COSY", "NOESY", "structure determination", "solution state"]
category: "Chemistry"
difficulty: "advanced"
relatedArticles: ["peptide-fragmentation", "peptide-dipole", "peptide-aggregation"]
---

## Why NMR for Peptides?

Nuclear magnetic resonance (NMR) spectroscopy determines the three-dimensional structure of peptides in solution. Unlike X-ray crystallography, NMR does not require crystals, so structures can be determined under near-physiological conditions including varying pH, temperature, and solvent composition. This makes NMR particularly valuable for studying flexible peptides and intrinsically disordered regions.

## 1H NMR Fundamentals

Proton NMR detects the magnetic environment of hydrogen nuclei. Each proton resonance reflects its chemical environment, with chemical shifts indicating local structure. Amide protons appear between 6 and 10 ppm, while alpha protons resonate between 3 and 5 ppm. Side chain protons occupy the 0 to 3 ppm region.

The coupling pattern (multiplet structure) reveals neighboring proton relationships. A doublet indicates one adjacent proton, a triplet indicates two, and a doublet of doublets indicates two non-equivalent neighbors. These patterns help assign each resonance to a specific proton in the peptide.

## COSY: Correlation Spectroscopy

COSY (Correlation Spectroscopy) identifies protons that are connected through two or three bonds. Each off-diagonal cross-peak indicates a coupling relationship between two protons. For peptides, COSY helps map the connectivity within each amino acid residue by connecting alpha protons to beta protons and amide protons.

The COSY experiment is the starting point for resonance assignment. By tracing coupling pathways, you can identify entire spin systems corresponding to individual amino acids.

## NOESY: Nuclear Overhauser Effect Spectroscopy

NOESY (Nuclear Overhauser Effect Spectroscopy) detects protons that are close in space (less than 5 angstroms), regardless of bonding connectivity. This is the key experiment for structure determination. NOE cross-peaks between alpha protons of adjacent residues confirm the amino acid sequence. NOEs between amide protons reveal secondary structure, and long-range NOEs between distant residues provide tertiary structure restraints.

## Structure Determination Workflow

The typical workflow proceeds as follows:

1. **Acquire spectra**: 1H NMR, COSY, TOCSY, and NOESY at one or more temperatures.
2. **Assign resonances**: Use COSY and TOCSY to identify spin systems, then NOESY to connect them sequentially.
3. **Collect restraints**: Measure NOE intensities and convert to distance restraints. Measure coupling constants for dihedral angle restraints.
4. **Calculate structures**: Use simulated annealing software (CYANA, XPLOR-NIH) with the restraints to generate an ensemble of structures.
5. **Validate**: Check Ramachandran plots, NOE violation statistics, and energetic consistency.

## Mnemonic: "COSY Connects Bonds, NOESY Connects Space"

**"COSY sees bonds, NOESY sees space."** COSY reveals through-bond connectivity. NOESY reveals through-space proximity. Together, they provide the connectivity and distance information needed for structure determination.

## Practical Tip

Collecting NMR data at 25 degrees Celsius and pH 4.5 minimizes exchange broadening of amide protons. For larger peptides (over 20 residues), consider 15N and 13C labeling to simplify assignment and improve resolution.
