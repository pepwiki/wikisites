---
title: "Peptide Analytical Methods — HPLC, MS, CE, NMR"
description: "Peptide analytical methods: HPLC, mass spectrometry, capillary electrophoresis, and NMR for purity and identity."
status: "published"
author: "Wikipept Community"
pubDate: 2026-07-27
tags: ["peptide-analytical", "HPLC", "mass-spectrometry", "capillary-electrophoresis", "NMR", "advanced"]
category: "Analytical"
difficulty: "advanced"
relatedArticles: ["peptide-characterization", "peptide-quality-control", "peptide-purification-hplc"]
---

## Introduction

Peptide analytical methods are essential for characterizing peptide identity, purity, quantity, and conformation. These methods span chromatography, mass spectrometry, electrophoresis, and spectroscopy, each providing complementary information. This article covers the major analytical techniques, their principles, applications, and practical considerations for peptide characterization.

## High-Performance Liquid Chromatography (HPLC)

### Reversed-Phase HPLC (RP-HPLC)

**Principle:**
Separation based on hydrophobicity. Non-polar stationary phase (C18, C8) and polar mobile phase (water/acetonitrile gradient).

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Column | C18, 5 μm, 150 × 4.6 mm |
| Mobile phase A | 0.1% TFA in water |
| Mobile phase B | 0.1% TFA in 90% acetonitrile |
| Gradient | 5–95% B over 30 min |
| Flow rate | 1 mL/min |
| Detection | UV at 214 nm (amide bond) or 280 nm (aromatic) |

**Applications:**
- Purity assessment
- Hydrophobicity measurement
- Impurity profiling

**Resolution considerations:**
- Resolution (Rs) > 1.5 for baseline separation
- Affecting factors: gradient slope, temperature, flow rate

### Ion-Exchange HPLC (IEX-HPLC)

**Principle:**
Separation based on charge. Cation exchange (positively charged peptides) or anion exchange (negatively charged peptides).

**Typical conditions:**
| Parameter | Cation Exchange | Anion Exchange |
|-----------|-----------------|----------------|
| Resin | Sulfonyl (SO₃⁻) | Quaternary amine (N⁺) |
| Buffer A | 10 mM NaH₂PO₄, pH 7 | 20 mM Tris, pH 8 |
| Buffer B | 1M NaCl | 1M NaCl |
| Gradient | 0–100% B | 0–100% B |

**Applications:**
- Charge variant analysis
- Deamidation monitoring
- C-terminal lysine variants

### Size-Exclusion HPLC (SEC-HPLC)

**Principle:**
Separation based on molecular size. Larger molecules elute first (excluded from pores), smaller molecules elute later (included in pores).

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Column | Silica or polymer-based |
| Pore size | 100–300 Å (for peptides) |
| Mobile phase | Aqueous buffer, isocratic |
| Detection | UV at 214 nm or 280 nm |

**Applications:**
- Aggregate detection
- Monomer/dimer ratio
- High molecular weight species

### Hydrophilic Interaction LC (HILIC)

**Principle:**
Separation based on hydrophilicity. Polar stationary phase and organic-rich mobile phase.

**Applications:**
- Polar peptide analysis
- Glycopeptide separation
- Orthogonal method to RP-HPLC

## Mass Spectrometry (MS)

### Matrix-Assisted Laser Desorption/Ionization (MALDI-TOF)

**Principle:**
Peptide co-crystallized with matrix, ionized by laser, time-of-flight separation.

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Matrix | α-cyano-4-hydroxycinnamic acid (CHCA) |
| Laser | 337 nm (N₂) or 355 nm (Nd:YAG) |
| Mode | Positive reflectron |
| Mass range | 1–50 kDa |

**Applications:**
- Molecular weight determination
- Quick purity check
- Intact mass measurement

**Advantages:**
- Fast (< 5 minutes per sample)
- Minimal sample preparation
- High tolerance to contaminants

### Electrospray Ionization (ESI-MS)

**Principle:**
Peptide dissolved in solvent, sprayed into electric field, droplets evaporate, ions released.

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Solvent | 50% acetonitrile, 0.1% formic acid |
| Flow rate | 0.2–1.0 μL/min (nanospray) |
| Polarity | Positive or negative |
| Instrument | Triple quadrupole, Q-TOF, Orbitrap |

**Applications:**
- High-resolution mass measurement
- Tandem MS (MS/MS) for sequencing
- Quantitative analysis (LC-MS/MS)

**Advantages:**
- High sensitivity (fmol–pmol)
- Compatible with HPLC
- Soft ionization (minimal fragmentation)

### Tandem MS (MS/MS) for Peptide Sequencing

**Principle:**
Precursor ion selected, fragmented, product ions analyzed.

**Fragmentation methods:**
| Method | Mechanism | Application |
|--------|-----------|-------------|
| CID | Collision-induced dissociation | Backbone fragmentation |
| ETD | Electron transfer dissociation | Labile modifications |
| HCD | Higher-energy collisional dissociation | Backbone fragmentation |

**Peptide fragmentation nomenclature:**
```
Peptide: H₂N-AA₁-AA₂-AA₃-AA₄-COOH

b-ions: AA₁⁺, (AA₁-AA₂)⁺, (AA₁-AA₂-AA₃)⁺
y-ions: AA₄⁺, (AA₃-AA₄)⁺, (AA₂-AA₃-AA₄)⁺
```

### LC-MS/MS for Quantification

**Principle:**
HPLC separation + MS/MS detection (selected reaction monitoring).

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Column | C18, 2.1 × 50 mm, 1.7 μm |
| Gradient | 5–95% B over 10 min |
| MS mode | SRM (selected reaction monitoring) |
| Internal standard | Stable isotope-labeled peptide |

**Applications:**
- Bioanalysis (pharmacokinetics)
- Biomarker quantification
- Impurity quantification

## Capillary Electrophoresis (CE)

### Capillary Zone Electrophoresis (CZE)

**Principle:**
Separation based on charge-to-size ratio in free solution.

**Typical conditions:**
| Parameter | Value |
|-----------|-------|
| Capillary | 50 μm i.d., 50 cm length |
| Buffer | 100 mM sodium phosphate, pH 2.5 |
| Voltage | 20–30 kV |
| Detection | UV at 214 nm |

**Applications:**
- Peptide purity
- Charge variant analysis
- Complementary to HPLC

### Capillary Gel Electrophoresis (CGE)

**Principle:**
Separation based on size in a sieving matrix.

**Applications:**
- Molecular weight determination
- Aggregate analysis
- Comparison to SDS-PAGE

### Capillary Isoelectric Focusing (cIEF)

**Principle:**
Separation based on isoelectric point (pI) in a pH gradient.

**Applications:**
- pI determination
- Charge heterogeneity
- Deamidation monitoring

## Nuclear Magnetic Resonance (NMR) Spectroscopy

### One-Dimensional NMR

**¹H NMR:**
| Region (ppm) | Assignment |
|--------------|------------|
| 0.8–1.0 | Methyl (Val, Leu, Ile) |
| 1.2–1.4 | Methylene (Pro, Lys) |
| 2.0–2.5 | β-CH₂ (Asp, Glu) |
| 3.0–3.2 | ε-CH₂ (Lys) |
| 4.0–4.5 | α-CH (all residues) |
| 6.5–8.5 | Amide NH |
| 7.0–7.5 | Aromatic (Phe) |
| 7.5–8.0 | Aromatic (Trp, Tyr) |

**¹³C NMR:**
| Region (ppm) | Assignment |
|--------------|------------|
| 10–40 | Aliphatic carbons |
| 50–60 | α-Carbon |
| 170–180 | Carbonyl (amide) |
| 175–180 | Carbonyl (acid) |

### Two-Dimensional NMR

**COSY (Correlation Spectroscopy):**
- Identifies coupled protons (3J coupling)
- Maps spin systems within residues

**TOCSY (Total Correlation Spectroscopy):**
- Identifies all protons within a spin system
- Useful for amino acid identification

**NOESY (Nuclear Overhauser Effect Spectroscopy):**
- Identifies protons close in space (< 5 Å)
- Determines 3D structure

**HSQC (Heteronuclear Single Quantum Coherence):**
- Correlates ¹H with ¹³C or ¹⁵N
- Fingerprint of peptide structure

### Structure Determination

**NOE-derived constraints:**
- Strong NOE: 1.8–3.0 Å
- Medium NOE: 3.0–4.0 Å
- Weak NOE: 4.0–5.0 Å

**Structure calculation:**
- Simulated annealing
- Molecular dynamics
- Software: CYANA, XPLOR-NIH, ARIA

## Circular Dichroism (CD)

### Far-UV CD (190–250 nm)

**Secondary structure determination:**

| Structure | CD Signal |
|-----------|-----------|
| α-Helix | Double minima at 208 and 222 nm |
| β-Sheet | Minimum at 215–217 nm, maximum at 195 nm |
| Random coil | Minimum near 198 nm |
| β-Turn | Minimum near 200 nm |

### Near-UV CD (250–320 nm)

**Tertiary structure:**
- Aromatic residues contribute to signal
- Disulfide bonds contribute
- Sensitive to conformational changes

## Practical Workflow

### Identity Confirmation

1. **Mass spectrometry**: Confirm molecular weight
2. **Amino acid analysis**: Confirm composition
3. **Peptide mapping**: Confirm sequence

### Purity Assessment

1. **RP-HPLC**: Primary purity method
2. **SEC-HPLC**: Aggregate assessment
3. **IEX-HPLC**: Charge variant analysis
4. **CE**: Orthogonal purity method

### Structural Characterization

1. **CD**: Secondary structure
2. **NMR**: 3D structure (if needed)
3. **X-ray crystallography**: High-resolution structure

## Method Validation

### ICH Guidelines

**1. Specificity:**
- Method distinguishes analyte from impurities
- Forced degradation studies

**2. Linearity:**
- R² > 0.999
- Range: 80–120% of target concentration

**3. Accuracy:**
- Recovery: 98–102%
- Triplicate analysis

**4. Precision:**
- Repeatability: RSD < 1%
- Intermediate precision: RSD < 2%

**5. Robustness:**
- Deliberate variations in method parameters
- Impact on resolution, retention time

## Summary

Peptide analytical methods provide comprehensive characterization of identity, purity, structure, and quantity. RP-HPLC is the workhorse for purity assessment, while mass spectrometry provides definitive molecular weight confirmation. NMR and CD offer structural insights, and capillary electrophoresis provides orthogonal separation mechanisms. Method selection depends on the specific analytical question and the stage of development. Validation according to ICH guidelines ensures reliable and reproducible results.

> **Deep dive:** Explore [Peptide Characterization Methods](/learn/peptide-characterization-methods/) for detailed protocols, or read about [Peptide Quality Control](/learn/peptide-quality-control/) for comprehensive QC strategies.

> **Test yourself:** Take the [Peptide Analytical Methods Quiz](/quizzes/peptide-analytical/) or study with [Analytical Methods Flashcards](/flashcards/peptide-analytical/).
