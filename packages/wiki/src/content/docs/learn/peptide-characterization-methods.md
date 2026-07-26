---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Characterization Methods — MS, HPLC, CD, NMR"
description: "Peptide characterization methods: mass spectrometry, HPLC purity, circular dichroism, and NMR structure determination."
---

Complete characterization of synthetic peptides requires orthogonal analytical methods that confirm identity, purity, and secondary/tertiary structure. This guide covers the four primary techniques used in modern peptide characterization.

## 1. Mass Spectrometry (MS)

### Techniques for Peptide Analysis

| Method | Mass Range | Resolution | Sensitivity | Application |
|--------|-----------|------------|-------------|-------------|
| ESI-MS | <10 kDa | 0.1 Da | pmol | Identity confirmation |
| MALDI-TOF | <50 kDa | 0.1 Da | fmol | Quick mass check |
| LC-MS/MS | <5 kDa | 0.01 Da | fmol | Sequencing, PTM |
| MALDI-TOF/TOF | <10 kDa | 0.01 Da | fmol | De novo sequencing |

### ESI-MS (Electrospray Ionization)

**Principle**: Peptides are ionized from solution, producing multiply charged ions [M+nH]^(n+). Deconvolution yields the neutral mass.

**Sample preparation**:
1. Dissolve peptide in 50% MeCN/0.1% FA (0.1 mg/mL)
2. Infuse at 5–10 µL/min into ESI source
3. Acquire m/z 300–2000

**Deconvolution**: Multiple charge states (typically z = 2–5 for peptides <3 kDa) are deconvoluted using MaxEnt or similar algorithms.

### MALDI-TOF MS

**Principle**: Peptide co-crystallized with matrix (CHCA, sinapinic acid) is desorbed/ionized by laser pulse.

**Sample preparation**:
1. Dissolve peptide in 0.1% TFA/H₂O (1 pmol/µL)
2. Mix 1:1 with CHCA matrix (10 mg/mL in 50% MeCN/0.1% TFA)
3. Spot 1 µL on target plate
4. Air-dry, analyze in reflectron mode

**Advantages**: Fast, tolerant of contaminants, minimal sample consumption.

### LC-MS/MS for Peptide Sequencing

**Data-dependent acquisition**:
1. Full MS scan (m/z 200–2000)
2. Select top 5 most intense ions
3. Fragment by CID (collision energy 20–40 eV)
4. Acquire MS/MS spectrum
5. Database search or de novo sequencing

**Common fragment ions**:
- **b-ions**: N-terminal fragments
- **y-ions**: C-terminal fragments
- **a-ions**: Loss of CO from b-ions

## 2. HPLC Purity Analysis

### Analytical HPLC Methods

**Standard method** (C18 column):

| Parameter | Value |
|-----------|-------|
| Column | C18, 2.1 × 150 mm, 1.7 µm |
| Solvent A | 0.1% TFA/H₂O |
| Solvent B | 0.1% TFA/MeCN |
| Gradient | 5–65% B over 20 min |
| Flow | 0.3 mL/min |
| Detection | UV 220 nm |
| Injection | 5 µg |

### Purity Assessment

**Area normalization**: Purity = (Area of main peak / Total area) × 100%

**Requirements by application**:

| Application | Purity | Method |
|-------------|--------|--------|
| Research | >95% | RP-HPLC |
| Preclinical | >98% | RP-HPLC + IEX |
| Clinical | >98.5% | RP-HPLC + IEX + CE |
| Commercial | >99% | Multiple orthogonal |

### Common Impurity Profile

| Impurity | Source | % of Crude |
|----------|--------|------------|
| Deletion sequences | Incomplete coupling | 5–20% |
| Truncated sequences | Early termination | 2–10% |
| Oxidized products | Met/Cys oxidation | 1–5% |
| Diketopiperazine | C-terminal proline | 1–3% |
| Racemized epimers | Base-catalyzed | 0.5–2% |

## 3. Circular Dichroism (CD) Spectroscopy

### Principles

CD measures the differential absorption of left and right circularly polarized light by chiral chromophores. For peptides, the peptide bond (amide π→π* and n→π* transitions) generates CD signals in the far-UV (190–250 nm).

### Secondary Structure Assignment

| Structure | Characteristic Spectrum | Wavelengths |
|-----------|------------------------|-------------|
| α-Helix | Strong negative at 222, 208 nm; positive at 193 nm | Two minima |
| β-Sheet | Negative at 218 nm; positive at 195 nm | One minimum |
| Random coil | Negative at ~198 nm | One minimum |
| β-turn | Positive at 220–230 nm | Variable |

### Sample Requirements

- **Concentration**: 0.1–0.5 mg/mL
- **Buffer**: Phosphate, Tris, or CD (avoid high-salt buffers)
- **Path length**: 0.1 cm (far-UV)
- **Volume**: 300 µL minimum

### Temperature-Dependent CD

Monitor structural changes vs. temperature:
1. Record CD at 222 nm (α-helix) or 218 nm (β-sheet)
2. Heat from 20 to 95°C at 1°C/min
3. Calculate T_m (melting temperature) from sigmoidal fit
4. T_m > 60°C indicates stable structure

## 4. NMR Spectroscopy

### NMR Techniques for Peptides

| Technique | Information | Time | Sample |
|-----------|------------|------|--------|
| ¹H 1D | Amino acid composition | 5 min | 1 mg |
| ¹H-¹H TOCSY | Spin system identification | 1 hr | 1 mg |
| ¹H-¹H NOESY | Through-space contacts | 4–8 hr | 1 mg |
| ¹H-¹³C HSQC | Carbon assignments | 2–4 hr | 5 mg |
| ¹H-¹⁵N HSQC | Amide backbone | 1–2 hr | 5 mg |

### Sample Preparation

- **Concentration**: 0.5–2 mM (5–20 mg/mL for 600 MHz)
- **Solvent**: 90% H₂O/10% D₂O (for amide protons) or D₂O
- **pH**: 4.0–5.0 (minimizes exchange broadening)
- **Temperature**: 25°C standard; variable temperature for dynamics

### Structure Determination Workflow

1. **Sequential assignment**: TOCSY → NOESY → walk through spin systems
2. **NOE assignments**: Identify short-range (i, i+1) and long-range NOEs
3. **Distance restraints**: Convert NOE intensities to distance bounds
4. **Structure calculation**: Simulated annealing with distance restraints (CNS, XPLOR-NIH, CYANA)
5. **Refinement**: Energy minimization in explicit water (OPN, AMBER)

### Quality Metrics

| Parameter | Acceptable | Excellent |
|-----------|-----------|-----------|
| NOE violations | <5% >0.5 Å | <1% >0.5 Å |
| RMSD backbone | <2.0 Å | <1.0 Å |
| RMSD heavy atoms | <3.0 Å | <1.5 Å |
| Ramachandran favored | >80% | >90% |
| Ramachandran outliers | <5% | <1% |

## 5. Additional Characterization Methods

### Amino Acid Analysis (AAA)

- Hydrolysis in 6 M HCl, 110°C, 24 hr
- Derivatization and HPLC or CE analysis
- Confirms composition and stoichiometry
- Accuracy: ±5% per residue

### Edman Sequencing

- N-terminal degradation cycle-by-cycle
- PTH-amino acids identified by HPLC
- Limitations: N-terminal blockage, <50 residues
- Largely replaced by MS/MS

### Isoelectric Focusing (IEF)

- Separates peptides by pI
- Useful for charged peptides (Lys, Arg-rich)
- Can separate diastereomers

### Analytical Ultracentrifugation

- Sedimentation equilibrium for oligomeric state
- Sedimentation velocity for shape
- No column interactions, true solution state

## 6. Characterization Panel by Application

| Application | Required Methods |
|-------------|-----------------|
| Academic research | MS + RP-HPLC (>95%) |
| Drug discovery | MS + HPLC + CD + AAA |
| Preclinical | MS + HPLC + CD + AAA + Stability |
| Clinical candidate | MS + HPLC + CD + NMR + AAA + ICH stability |
| Commercial product | All above + CE + pI + Potency |

## References

1. Papayannis, I., et al. "Peptide characterization by mass spectrometry." *Methods in Molecular Biology* 126 (2020): 1–32.
2. Greenfield, N.J. "Using circular dichroism spectra to estimate protein secondary structure." *Nature Protocols* 1 (2006): 2876–2890.
3. Wüthrich, K. *NMR of Proteins and Nucleic Acids*. Wiley, 1986.

## Further Reading

- [Mass Spectrometry for Peptides](/learn/mass-spectrometry-peptides/) — Detailed MS methods
- [Circular Dichroism](/learn/circular-dichroism/) — CD spectroscopy for peptides
- [NMR Structure](/learn/nmr-peptide-structure/) — NMR structure determination
- [Quality Control](/learn/peptide-quality-control/) — Full QC panel
