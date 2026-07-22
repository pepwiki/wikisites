---
title: Peptide Characterization
description: Comprehensive guide to characterizing synthetic peptides — purity analysis, mass confirmation, structural assessment, and quality control protocols.
---

# Peptide Characterization Guide

Systematic approach to characterizing synthetic peptides after synthesis and purification. Covers the essential analytical methods, acceptance criteria, and quality control procedures for research and pharmaceutical-grade peptides.

## Characterization Workflow

```
Crude Peptide → Preliminary QC → Purification → Final QC → Release
     │                │                │            │           │
  LC-MS/MS      LC-MS, SDS-PAGE    Prep HPLC    Full panel   Certificate
```

## Step 1: Crude Peptide Assessment

### Mass Confirmation (First Priority)

| Method | Sample Amount | Time | Information |
|--------|--------------|------|-------------|
| MALDI-TOF | 1 pmol | 5 min | MW (±0.01 Da) |
| ESI-MS | 1–10 μg | 10 min | MW (±0.01 Da), charge states |
| LC-MS | 1–5 μg | 20 min | MW + purity estimate |

**Acceptance criterion**: Observed MW within ±2 Da of calculated MW.

### Crude Purity

| Method | Conditions | Detection |
|--------|-----------|-----------|
| RP-HPLC | C18, 5–95% B gradient, 30 min | 214 nm, 280 nm |
| LC-MS | Same as above + ESI detection | UV + total ion current |

**Acceptance criterion**: Crude purity >60% for standard peptides, >40% for difficult sequences.

## Step 2: Detailed Analytical Characterization

### Purity by RP-HPLC

**Standard Conditions:**

| Parameter | Specification |
|-----------|--------------|
| Column | C18, 150 × 4.6 mm, 5 μm, 100 Å |
| Mobile phase A | 0.1% TFA in H₂O |
| Mobile phase B | 0.1% TFA in 90% MeCN |
| Gradient | 5–65% B over 30 min |
| Flow rate | 1.0 mL/min |
| Detection | 214 nm (amide), 280 nm (aromatic) |
| Temperature | 30°C |
| Injection | 50 μg in 100 μL mobile phase A |

**Reporting:**

| Report Element | Detail |
|---------------|--------|
| Retention time | Main peak tR (min) |
| Purity (%) | Area % of main peak |
| Impurity profile | Individual impurity % (>0.1%) |
| Resolution | Rs between major peaks |

### Identity by Mass Spectrometry

**ESI-MS Conditions:**

| Parameter | Specification |
|-----------|--------------|
| Source | Electrospray, positive mode |
| Capillary voltage | 3.0 kV |
| Cone voltage | 30 V |
| Mass range | [M+2H]²⁺ to [M+5H]⁵⁺ |
| Deconvolution | Maximum entropy algorithm |

**Acceptance criterion**: Deconvoluted MW within ±0.01 Da of calculated MW.

### Mass Fragmentation (MS/MS)

For sequence confirmation, perform MS/MS on the [M+2H]²⁺ or [M+3H]³⁺ ion:

| Ion Type | Information |
|----------|-------------|
| b-ions | N-terminal sequence |
| y-ions | C-terminal sequence |
| Internal fragments | Middle sequence |

**Acceptance criterion**: >80% sequence coverage from b/y ion series.

## Step 3: Structural Characterization

### Secondary Structure by CD

| Parameter | Specification |
|-----------|--------------|
| Instrument | Circular dichroism spectropolarimeter |
| Wavelength range | 190–260 nm |
| Path length | 0.1 mm |
| Peptide concentration | 0.2 mg/mL in 10 mM phosphate pH 7.0 |
| Scan speed | 100 nm/min |
| Accumulation | 3 scans |

**Data Analysis:**

| Structure | Signature | Quantification |
|-----------|-----------|----------------|
| α-helix | Minima at 208, 222 nm | % helix from CDSSTR |
| β-sheet | Minimum at 218 nm | % sheet from CDSSTR |
| Random coil | Minimum at 198 nm | % coil from CDSSTR |

### NMR (For Detailed Structure)

| Experiment | Purpose | Sample Requirements |
|-----------|---------|---------------------|
| ¹H 1D | Spectrum quality | 0.5 mM in 500 μL D₂O |
| TOCSY | Spin system assignment | 1 mM, 100 ms mixing |
| NOESY | Through-space distances | 1 mM, 200 ms mixing |
| HSQC | ¹H-¹⁵N fingerprint | 1 mM, ¹⁵N-labeled |

**For peptides <15 residues**: NMR is typically unnecessary; CD + MS sufficient.

## Step 4: Physicochemical Properties

### Amino Acid Analysis (AAA)

| Parameter | Specification |
|-----------|--------------|
| Method | Acid hydrolysis + HPLC or CE |
| Hydrolysis | 6M HCl, 110°C, 24 hr |
| Detection | Pre-column derivatization (OPA/FMOC) or ninhydrin |
| Injection | 1–10 nmol |

**Acceptance criterion**: Each amino acid within 90–110% of theoretical ratio.

### Solubility Testing

| Test | Method | Acceptance |
|------|--------|------------|
| Aqueous solubility | Serial dilution in PBS pH 7.4 | ≥10 mg/mL (soluble) |
| Organic solubility | DMF, DMSO, MeCN | Document solubility |
| Precipitation | Visual inspection at 10 mg/mL | No precipitate |

### Isoelectric Point (pI)

| Method | Conditions |
|--------|-----------|
| IEF | pH 3–10 gradient gel |
| CE | pH gradient capillary electrophoresis |
| Calculation | From sequence (pKa values) |

## Step 5: Stability Assessment

### Forced Degradation Studies

| Condition | Protocol | Information |
|-----------|----------|-------------|
| Acid hydrolysis | 0.1M HCl, 80°C, 24 hr | Acid-labile bonds |
| Base hydrolysis | 0.1M NaOH, 25°C, 24 hr | Base-labile bonds |
| Oxidation | 3% H₂O₂, 25°C, 24 hr | Met, Cys oxidation |
| Thermal | 60°C, 48 hr | Thermal stability |
| Photolytic | UV 254 nm, 24 hr | Photosensitivity |
| Humidity | 75% RH, 40°C, 24 hr | Moisture sensitivity |

### Solution Stability

| Parameter | Conditions | Time Points |
|-----------|-----------|-------------|
| pH stability | pH 2–10, 25°C | 0, 1, 4, 24 hr |
| Concentration | 0.1, 1, 10 mg/mL in PBS | 0, 1, 7, 30 days |
| Temperature | 4°C, 25°C, 37°C | 0, 1, 7, 30 days |

## Quality Control Certificate

### Required Tests

| Test | Method | Research Grade | GMP Grade |
|------|--------|---------------|-----------|
| Appearance | Visual | White powder | White powder |
| Identity | ESI-MS | MW ±2 Da | MW ±0.01 Da |
| Purity | RP-HPLC | ≥95% | ≥98% |
| Sequence confirmation | MS/MS | — | Required |
| Amino acid analysis | AAA | — | 90–110% |
| Residual TFA | ¹H-NMR or IC | <1% | <0.5 eq |
| Water content | Karl Fischer | <10% | <5% |
| Endotoxin | LAL | — | <0.5 EU/mg |
| Heavy metals | ICP-MS | — | <10 ppm |

### Certificate of Analysis Template

```
Certificate of Analysis
Product: [Peptide Name]
Sequence: [Sequence]
CAS: [Number]
Batch: [Number]

Analytical Results:
├── Appearance: [Description]
├── Identity: ESI-MS, MW = [Observed] (calc. [Calculated])
├── Purity (HPLC): [%] (tR = [min])
├── Amino Acid Analysis: [Results]
├── Residual TFA: [%]
├── Water Content: [%]
└── Endotoxin: [EU/mg]
```

## Common Issues and Solutions

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| MW off by +16 | Met oxidation | Use antioxidants; store under N₂ |
| MW off by +18 | Deamidation | Check Asn/Gln content; store cold |
| MW off by −18 | Dehydration | Check Thr/Ser content |
| Extra peak at +42 | Acetylation | Check for lysine acetylation |
| Multiple peaks | Deletion sequences | Optimize SPPS coupling |
| Broad HPLC peak | Conformational heterogeneity | Check CD; add denaturant |

## References

1. USP <1052> "Peptide Mapping."
2. ICH Q6B "Specifications: Test Procedures and Acceptance Criteria for Biotechnological Products."
3. European Pharmacopoeia 2.2.29 "Liquid Chromatography."
4. Alpert AJ. "HPLC of peptides and proteins." *J Chromatogr A* 2022;1667:462861.
5. Bhagwat SS, et al. "Peptide characterization: a practical guide." *Anal Biochem* 2023;665:114531.
