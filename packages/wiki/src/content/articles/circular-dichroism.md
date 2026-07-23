---
title: "Circular Dichroism Spectroscopy"
description: "Circular dichroism is a powerful technique for determining peptide and protein secondary structure by measuring differential absorption of left and right circularly polarized light."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["circular-dichroism", "secondary-structure", "spectroscopy", "alpha-helix", "beta-sheet"]
category: "Chemistry"
difficulty: "advanced"
relatedArticles: ["circular-dichroism", "protein-folding-thermodynamics", "circular-dichroism"]
---

# Circular Dichroism Spectroscopy

Circular dichroism (CD) spectroscopy measures the differential absorption of left and right circularly polarized light by chiral molecules. For peptides and proteins, CD provides rapid, reliable assessment of secondary structure composition without requiring crystallization.

## Fundamental Principles

Chiral molecules absorb left and right circularly polarized light differently. In proteins, the chiral arrangement of peptide bonds in regular secondary structures produces characteristic CD spectra. The molar ellipticity, reported in degrees centimeter squared per decimole, reflects the population of different structural elements.

## Far-UV CD (190-250 nm)

This region reports on backbone secondary structure because peptide bond pi-to-pi and n-to-pi transitions occur here. Each secondary structure produces a distinct spectral signature:

### Alpha-Helix Signature

Alpha-helices display three characteristic features:

- Strong negative bands at 222 nm (n-to-pi transition) and 208 nm (pi-to-pi exciton coupling)
- A strong positive band near 193 nm
- The 222/208 nm ratio helps distinguish isolated helices (ratio near 1.0) from coiled-coils (ratio approaching 1.0)

### Beta-Sheet Signature

Beta-sheets show:

- A negative band near 218 nm
- A positive band near 195 nm
- Generally lower ellipticity magnitude compared to helices

### Random Coil Signature

Unstructured peptides display:

- A strong negative band near 200 nm
- Weak ellipticity above 210 nm
- Often confused with low helical content

## Near-UV CD (250-320 nm)

This region reports on the asymmetric environment of aromatic side chains and disulfide bonds:

- **Phenylalanine:** Sharp bands between 255-270 nm
- **Tyrosine:** Bands around 275-285 nm
- **Tryptophan:** Bands near 280-290 nm

Near-UV CD reveals tertiary structure and can detect ligand-induced conformational changes or unfolding events before global structure loss becomes apparent.

## Sample Requirements

Successful CD measurements require:

- Peptide concentration of 0.1-1 mg per milliliter for far-UV
- Path length of 0.1-1 mm for far-UV, 1-10 mm for near-UV
- Buffer free of UV-absorbing compounds (avoid chloride at low pH, high concentrations of DTT)
- Cuvettes made of quartz for measurements below 200 nm

## Quantitative Analysis

Deconvolution algorithms estimate secondary structure percentages. Common methods include:

- **CDSSTR:** Uses a reference set of standard proteins
- **CONTIN:** Applies regularization to select from a basis set
- **K2D:** Employs neural networks trained on reference spectra

Multiple algorithms should be compared for robust estimation.

## Mnemonic: HAT

Remember far-UV CD signatures with **HAT**:

- **H**elix: double negative minima at 222 and 208 nm
- **A**lternating: beta-sheet shows negative at 218, positive at 195 nm
- **T**rough: random coil shows deep minimum near 200 nm

## Applications in Peptide Research

CD is indispensable for assessing peptide folding, measuring thermal stability through melting curves, evaluating ligand-induced conformational changes, and quality control during peptide drug development. Its speed and minimal sample requirements make it an essential first-pass structural characterization tool.
