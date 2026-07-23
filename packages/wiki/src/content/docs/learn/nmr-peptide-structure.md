---
date: 2026-07-22
author: "Wikipept Contributors"
title: NMR for Peptide Structure Determination
description: "Guide to NMR spectroscopy for peptide structure determination — 1D/2D NMR techniques, NOESY, TOCSY experiments, and structure calculation methods for analysis."
---

Nuclear magnetic resonance (NMR) spectroscopy provides atomic-resolution structural information for peptides in solution. Unlike X-ray crystallography, NMR determines structure under near-physiological conditions, revealing dynamic properties and solvent interactions.

## Principles of Peptide NMR

### Nuclear Spin and Resonance

NMR measures the magnetic properties of nuclei with non-zero spin quantum numbers:

| Nucleus | Spin | Natural Abundance | Sensitivity | Application |
|---------|------|-------------------|-------------|-------------|
| ¹H | 1/2 | 99.98% | 1.00 | Primary detection |
| ¹³C | 1/2 | 1.11% | 0.016 | Backbone/side chain |
| ¹⁵N | 1/2 | 0.37% | 0.001 | Backbone assignment |
| ²H | 1 | 0.015% | 0.010 | Solvent suppression |

### Chemical Shift

The resonance frequency of a nucleus depends on its electronic environment:

- **Shielded**: Higher electron density → lower frequency (upfield)
- **Deshielded**: Lower electron density → higher frequency (downfield)
- **Chemical shift (δ)**: Referenced to TMS (0 ppm) or DSS (0 ppm)

## 1D NMR

### ¹H NMR Spectrum

A typical peptide ¹H NMR spectrum shows:

| Region (ppm) | Assignment |
|--------------|------------|
| 10–12 | Trp indole NH, Arg guanidinium |
| 8.0–8.5 | Amide NH (α-helix: ~8.0; β-sheet: ~8.5) |
| 7.0–7.5 | His C2-H, C4-H |
| 6.5–7.5 | Tyr aromatic, Phe aromatic |
| 5.5–6.0 | Trp aromatic |
| 4.5–5.0 | α-H (α-helix: ~4.0; β-sheet: ~4.5) |
| 3.5–4.5 | β-H, side chain CH₂ |
| 2.0–3.0 | Lys ε-CH₂, Arg δ-CH₂, Met CH₃ |
| 0.8–1.5 | Val, Leu, Ile methyl groups |

### Amide Region Analysis

The amide region (8.0–8.5 ppm) provides secondary structure information:

- **α-Helix**: Narrow dispersion, NH at ~8.0 ppm
- **β-Sheet**: Wide dispersion, NH at ~8.5 ppm
- **Random coil**: Narrow dispersion, NH at ~8.3 ppm

## 2D NMR

### TOCSY (Total Correlation Spectroscopy)

TOCSY identifies amino acid spin systems through scalar (J) coupling:

**Cross-peaks**: Connect protons within the same amino acid residue

| Amino Acid | Characteristic TOCSY Pattern |
|------------|------------------------------|
| Gly | Single cross-peak (α-H₂) |
| Ala | Doublet at 1.4 ppm (β-CH₃) |
| Val | Two doublets at 0.9–1.0 ppm |
| Leu/Ile | Two doublets at 0.8–0.9 ppm |
| Lys | Three cross-peaks (β, γ, δ, ε) |
| Arg | Three cross-peaks (β, γ, δ) |
| Pro | Characteristic α-H at 4.5 ppm |

**Experiment Parameters**:
- Mixing time: 60–80 ms (spin lock)
- Sweep width: 12–14 ppm (¹H)
- Data points: 2048 × 512
- Solvent: D₂O or 90% H₂O/10% D₂O

### NOESY (Nuclear Overhauser Effect Spectroscopy)

NOESY identifies spatially close protons (<5 Å) through dipolar coupling:

**Cross-peaks**: Connect protons close in space (not necessarily bonded)

**Sequential Assignment Strategy**:
1. Identify dαN(i, i+1) connectivities: α-H(i) → NH(i+1)
2. Identify dNN(i, i+1) connectivities: NH(i) → NH(i+1)
3. Build chain from N-terminus to C-terminus

**Characteristic NOE Patterns**:

| Structure | NOE Pattern |
|-----------|-------------|
| α-helix | Strong dNN(i, i+1), weak dαN(i, i+1) |
| β-sheet | Strong dαN(i, i+1), weak dNN(i, i+1) |
| Turn | dNN(i, i+1), dαN(i+2, i+3) |

### COSY (Correlation Spectroscopy)

COSY identifies scalar-coupled protons (2–3 bonds):

- **α-H → β-H**: Within each residue
- **β-H → γ-H**: Side chain assignment
- Less useful than TOCSY for peptides (limited to J-coupled networks)

### HSQC (Heteronuclear Single Quantum Coherence)

HSQC correlates ¹H with directly bonded ¹³C or ¹⁵N:

**¹H-¹⁵N HSQC**:
- Each amide N-H shows one cross-peak
- Fingerprint of the peptide
- Used for backbone assignment and monitoring folding

**¹H-¹³C HSQC**:
- Correlates ¹H with directly bonded ¹³C
- Side chain assignment
- Methyl groups appear in aliphatic region

## Chemical Shift Assignment

### Strategy Overview

1. **Identify amino acid types**: TOCSY
2. **Sequential assignment**: NOESY (dαN, dNN connectivities)
3. **Side chain assignment**: TOCSY + COSY + HSQC
4. **Stereospecific assignment**: NOE patterns, J-coupling

### Step-by-Step Assignment

#### Step 1: Amino Acid Identification (TOCSY)

| Residue | TOCSY Signature |
|---------|-----------------|
| Gly | α-H₂ at ~3.9 ppm |
| Ala | β-CH₃ doublet at 1.4 ppm |
| Val | β-H doublet at 2.1 ppm; γ-CH₃ doublets |
| Leu/Ile | β-H multiplet; δ-CH₃ doublets |
| Pro | α-H at 4.5 ppm; no amide NH |
| Lys | ε-CH₂ at 3.0 ppm |
| Arg | δ-CH₂ at 3.2 ppm |

#### Step 2: Sequential Assignment (NOESY)

1. Start at N-terminus (dαN(1,2))
2. Walk through sequence using dαN(i, i+1)
3. Verify with dNN(i, i+1) and dβN(i, i+1)
4. Use prolines as break points (no amide NH)

#### Step 3: Side Chain Assignment

1. From α-H assignment, use TOCSY to find side chain protons
2. Use COSY to connect within spin systems
3. Use ¹³C HSQC for carbon chemical shifts

### Chemical Shift Index (CSI)

Compare observed α-H shifts to random coil values:

| Deviation | Interpretation |
|-----------|----------------|
| Δδ > 0.1 ppm upfield | α-helix |
| Δδ < −0.1 ppm downfield | β-sheet |
| |Δδ| < 0.1 ppm | Random coil |

## Structure Calculation

### Distance Restraints

From NOESY cross-peak intensities:

| NOE Intensity | Distance Range (Å) |
|---------------|---------------------|
| Strong | 1.8–2.5 |
| Medium | 1.8–3.5 |
| Weak | 1.8–5.0 |

### Calculation Methods

**Distance Geometry**:
- Convert NOE distances to 3D coordinates
- Algorithms: DGSA, DGS, AMBER

**Simulated Annealing**:
- Minimize energy with NOE restraints
- Programs: X-PLOR, CNS, CYANA, ARIA

**Molecular Dynamics**:
- Refine structures with explicit solvent
- Programs: GROMACS, NAMD, AMBER

### Structure Quality Metrics

| Metric | Good | Acceptable |
|--------|------|------------|
| RMSD (backbone) | <0.5 Å | <1.0 Å |
| RMSD (all heavy) | <1.0 Å | <1.5 Å |
| NOE violations | <0.1 Å | <0.3 Å |
| Ramachandran favored | >90% | >80% |
| Ramachandran allowed | >98% | >95% |
| PROCHECK score | >−0.5 | >−1.0 |

## Practical Considerations

### Sample Requirements

| Parameter | Requirement |
|-----------|-------------|
| Concentration | 0.5–2 mM (optimal) |
| Volume | 300–600 µL |
| Solvent | D₂O or 90% H₂O/10% D₂O |
| pH | 4–7 (exchange-dependent) |
| Temperature | 25°C (standard) |
| Salt | 50–100 mM NaCl |
| Isotopic labeling | ¹⁵N, ¹³C for large peptides (>15 aa) |

### Exchange Considerations

- **Amide exchange**: Broadens NH peaks at high pH
- **Optimal pH**: 4–5 for most peptides
- **D₂O exchange**: Progressive loss of NH signals
- **H₂O/D₂O**: Use 90% H₂O/10% D₂O to preserve NH signals

### Temperature Effects

| Temperature | Effect |
|-------------|--------|
| 5°C | Slower exchange, sharper peaks |
| 25°C | Standard |
| 37°C | Physiological, faster exchange |
| 50°C | Reduced viscosity, broader lines |

## Applications

### Secondary Structure Determination

- **Chemical shift analysis**: CSI method
- **J-coupling**: ³J_{HNα} values (helix: ~4 Hz; sheet: ~9 Hz)
- **NOE patterns**: dαN vs dNN connectivity patterns
- **Hydrogen bonding**: H/D exchange experiments

### Dynamics Studies

- **Relaxation (T₁, T₂)**: Backbone dynamics
- **Exchange rates**: Conformational flexibility
- **μs-ms dynamics**: Conformational exchange (CPMG, R₁ρ)
- **ps-ns dynamics**: Internal motions (Model-free analysis)

### Binding Studies

- **Chemical shift perturbation**: Map binding interface
- **Saturation transfer difference (STD)**: Ligand binding
- **WaterLOGSY**: Ligand screening
- **Relaxation dispersion**: Binding kinetics

## Limitations

- **Size limit**: >50 aa requires isotopic labeling and TROSY
- **Conformational exchange**: Broadens lines, obscures peaks
- **Overlap**: Sequence-specific assignment challenging
- **Time**: Full structure determination requires weeks
- **Cost**: NMR spectrometer time is expensive

## References

1. Wüthrich K. "NMR of proteins and nucleic acids." *Wiley* 1986.
2. Cavanagh J, et al. "Protein NMR Spectroscopy." *Academic Press* 2007.
3. Williamson MP. "Using chemical shift perturbation to characterise ligand binding." *Prog Nucl Magn Reson Spectrosc* 2013;73:1-16.
4. Marion D. "Introduction to biological NMR spectroscopy." *J Biomol NMR* 2013;55:303-310.
5. Pervushin K, et al. "TROSY: a new approach for high-resolution protein NMR." *J Biomol NMR* 1998;12:345-353.
