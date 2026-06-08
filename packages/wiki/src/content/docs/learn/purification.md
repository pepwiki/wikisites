---
title: Purification Methods
description: Advanced techniques for peptide purification and characterization, including HPLC, mass spectrometry, and analytical methods.
---

## Introduction

Peptide purification is critical for obtaining high-purity peptides for research and therapeutic applications. Synthetic peptides typically require purification to remove truncated sequences, deletion products, and other impurities.

## High-Performance Liquid Chromatography (HPLC)

HPLC is the primary method for peptide purification and analysis. **Reversed-Phase HPLC** is the most common mode, separating peptides based on hydrophobicity using a C18 or C8 bonded silica stationary phase with a water/acetonitrile gradient containing 0.1% TFA.

| HPLC Mode | Separation Basis | Applications |
|-----------|------------------|--------------|
| Reversed-Phase (RP) | Hydrophobicity | Most peptide purification |
| Ion-Exchange | Charge | Peptides with significant charge differences |
| Size-Exclusion (SEC) | Molecular size | Aggregation analysis, MW determination |
| HILIC | Hydrophilicity | Very hydrophilic peptides, glycopeptides |

RP-HPLC operating conditions: column 250 x 4.6 mm (analytical), flow rate 1 mL/min, gradient 5-95% acetonitrile over 30-60 minutes, detection at 214 nm (peptide bond) and 280 nm (aromatic residues).

## Mass Spectrometry

Mass spectrometry provides molecular weight confirmation and structural information.

- **ESI-MS (Electrospray Ionization):** Soft ionization, compatible with HPLC (LC-MS), produces multiply charged ions [M+nH]ⁿ⁺, high mass accuracy
- **MALDI-TOF:** Pulsed laser desorption from crystalline matrix, simple sample preparation, high sensitivity, tolerant of impurities
- **Tandem MS/MS:** Fragmentation of selected ions for sequence information using CID, ETD, or HCD

## Amino Acid Analysis

Amino acid analysis determines peptide composition. **Acid hydrolysis** (6M HCl, 110°C, 24 hours) is the standard method but destroys Trp and converts Asn to Asp. **Alkaline hydrolysis** is specific for Trp. Detection methods include pre-column derivatization (OPA, FMOC, AccQ-Tag) and post-column derivatization (ninhydrin).

## Edman Degradation

**Edman degradation** sequentially removes and identifies N-terminal amino acids using phenyl isothiocyanate (PITC) as the reagent, producing phenylthiohydantoin (PTH)-amino acids identified by HPLC. Limitations include a maximum of ~50 cycles, requirement for a free N-terminus, and slow speed (hours per cycle).

## Purification Strategies

Multiple orthogonal techniques provide maximum purity: primary purification by RP-HPLC, secondary purification by IEX or HILIC, and final polishing by SEC or RP-HPLC with a different column. Common impurities include truncated sequences, deletion sequences, oxidized products (Met, Trp, Cys), incomplete deprotection products, and racemized products.

## Quality Control

HPLC purity is assessed by area normalization at 214 nm and 280 nm, with minimum 95% purity for most applications and 98-99% for therapeutic peptides. Mass confirmation requires molecular weight within ±0.01% of theoretical. Stability testing includes accelerated conditions (40°C/75% RH), photostability, freeze-thaw, and solution stability.