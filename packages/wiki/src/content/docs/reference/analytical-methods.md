---
date: 2026-07-22
author: "Wikipept Contributors"
title: "Analytical Methods for Peptides"
description: Comparison of HPLC, mass spectrometry, circular dichroism, and NMR methods for peptide characterization — principles, applications, and sample requirements.
---

# Analytical Methods for Peptides

Comparative reference for the four primary analytical techniques used in peptide characterization: HPLC (purity and identity), mass spectrometry (mass confirmation), circular dichroism (secondary structure), and NMR (3D structure and dynamics).

## Method Comparison Overview

| Method | Primary Use | Information Obtained | Sample Amount | Time per Analysis |
|--------|-------------|---------------------|---------------|-------------------|
| RP-HPLC | Purity, identity | Hydrophobicity, purity % | 1–100 μg | 30–60 min |
| LC-MS | Mass confirmation | Exact MW, modifications | 0.1–10 μg | 15–30 min |
| CD | Secondary structure | α-helix, β-sheet content | 0.1–1 mg | 15–30 min |
| NMR | 3D structure, dynamics | Atomic-resolution structure | 1–10 mg | Hours–days |

## HPLC (High-Performance Liquid Chromatography)

### Reversed-Phase HPLC (RP-HPLC)

The primary method for peptide purity assessment and analytical separation.

| Parameter | Typical Conditions |
|-----------|-------------------|
| Column | C18 or C8 silica (5 μm, 100–300 Å) |
| Mobile phase A | 0.1% TFA in water |
| Mobile phase B | 0.1% TFA in 90% acetonitrile |
| Gradient | 5–95% B over 30–60 min |
| Flow rate | 1.0 mL/min (analytical) |
| Detection | UV at 214 nm (amide bond), 280 nm (aromatic) |
| Temperature | 30–40°C |
| Injection volume | 10–100 μg in 10–100 μL |

### RP-HPLC Applications

| Application | Detection | Resolution | Sensitivity |
|-------------|-----------|------------|-------------|
| Purity analysis | 214 nm | Single peak | 0.1% impurity |
| Identity confirmation | 214/280 nm ratio | Retention time match | Qualitative |
| Impurity profiling | 214 nm + MS | Individual peaks | 0.05–0.1% |
| Preparative purification | 214 nm | Baseline separation | mg–g scale |

### Ion-Exchange HPLC (IEX-HPLC)

| Parameter | Typical Conditions |
|-----------|-------------------|
| Column | Strong cation exchange (SCX) or anion exchange (SAX) |
| Mobile phase A | Low salt buffer (pH 3–7) |
| Mobile phase B | High salt (1 M NaCl) or pH gradient |
| Application | Charge variant analysis, peptide mapping |

### Size-Exclusion HPLC (SEC-HPLC)

| Parameter | Typical Conditions |
|-----------|-------------------|
| Column | Silica or polymer (300 Å pore) |
| Mobile phase | Aqueous buffer with 0.1 M salt |
| Application | Aggregation, oligomerization, MW estimation |

## Mass Spectrometry (MS)

### ESI-MS (Electrospray Ionization)

| Parameter | Typical Conditions |
|-----------|-------------------|
| Ionization | Positive or negative mode |
| Charge state distribution | [M+nH]ⁿ⁺ (n = 2–10+) |
| Mass range | 100–100,000 Da |
| Accuracy | <5 ppm (high resolution) |
| Sample preparation | Dilute in 50:50 water:acetonitrile + 0.1% formic acid |

### MALDI-TOF MS

| Parameter | Typical Conditions |
|-----------|-------------------|
| Matrix | α-cyano-4-hydroxycinnamic acid (CHCA) |
| Ionization | Mostly [M+H]⁺ (singly charged) |
| Mass range | 500–500,000 Da |
| Accuracy | 0.01–0.1% |
| Sample amount | 1 pmol on target |

### MS Applications for Peptides

| Application | Method | Information |
|-------------|--------|-------------|
| MW confirmation | ESI or MALDI | Exact mass (±0.01 Da) |
| Sequence verification | MS/MS | Fragment ion series |
| Modification mapping | MS/MS | PTM localization |
| Purity assessment | LC-MS | Mass-based purity |
| Impurity identification | LC-MS/MS | Structure elucidation |

### Common Peptide MS Fragments

| Ion Type | Terminus | Formula | Use |
|----------|---------|---------|-----|
| b-ion | N-terminal | Fragment + H | Sequence from N-terminus |
| y-ion | C-terminal | Fragment + H + OH | Sequence from C-terminus |
| a-ion | N-terminal | b-ion − CO | Backbone cleavage |
| Internal | Middle | Various | Internal fragments |

## Circular Dichroism (CD)

### Principles

CD measures the differential absorption of left- and right-circularly polarized light by chiral chromophores (peptide bonds). The resulting spectrum reveals secondary structure content.

### Far-UV CD (190–250 nm)

| Structure | Signature | Wavelength | Ellipticity |
|-----------|-----------|------------|-------------|
| α-helix | Two minima | 208, 222 nm | Strong negative |
| β-sheet | One minimum | 218 nm | Moderate negative |
| Random coil | One minimum | 198 nm | Strong negative |
| β-turn | Variable | 200–220 nm | Variable |

### Near-UV CD (250–320 nm)

| Chromophore | Wavelength | Information |
|------------|------------|-------------|
| Phe | 255–270 nm | Tertiary structure, environment |
| Tyr | 275–285 nm | Aromatic packing |
| Trp | 280–295 nm | Indole environment |
| Disulfide | 260 nm | S-S conformation |

### CD Experimental Parameters

| Parameter | Typical Conditions |
|-----------|-------------------|
| Path length | 0.1–1.0 mm (far-UV), 10 mm (near-UV) |
| Peptide concentration | 0.1–0.5 mg/mL (far-UV), 0.5–2 mg/mL (near-UV) |
| Buffer | Low UV-absorbing (phosphate, borate) |
| Scan speed | 50–100 nm/min |
| Wavelength range | 190–260 nm (far-UV) |
| Temperature | 25°C (or variable for thermal denaturation) |

### Secondary Structure Estimation

| Software | Method | Input |
|----------|--------|-------|
| CDSSTR | Variable selection | CD spectrum |
| CONTIN | Contin method | CD spectrum |
| SELCON3 | Self-consistent | CD spectrum |
| K2D | Neural network | CD spectrum |

## NMR (Nuclear Magnetic Resonance)

### Principles

NMR measures the magnetic properties of atomic nuclei (¹H, ¹³C, ¹⁵N) in a magnetic field. Chemical shifts, coupling constants, and nuclear Overhauser effects (NOEs) provide atomic-resolution structural and dynamic information.

### Key NMR Experiments for Peptides

| Experiment | Information | Time | Sample |
|-----------|-------------|------|--------|
| ¹H 1D | Proton spectrum, quality | 5 min | 1 mM in 500 μL |
| COSY | Proton-proton connectivity | 30 min | 1 mM |
| TOCSY | Spin system identification | 1 hr | 1 mM |
| NOESY | Through-space distances | 4–12 hr | 1 mM |
| HSQC | ¹H-¹⁵N correlation | 1 hr | 1 mM (¹⁵N-labeled) |
| HMBC | Long-range connectivity | 2–4 hr | 1 mM |

### NMR Structural Restraints

| Restraint Type | Source | Distance Range | Structural Role |
|---------------|--------|----------------|-----------------|
| NOE | NOESY | 1.8–5.0 Å | 3D fold |
| Dihedral angle | J-coupling, chemical shift | φ, ψ angles | Secondary structure |
| Hydrogen bond | H/D exchange, temperature coeff | 1.8–2.2 Å | H-bond network |
| Residual dipolar | Alignment media | Variable | Long-range restraints |

### NMR Experimental Parameters

| Parameter | Typical Conditions |
|-----------|-------------------|
| Spectrometer | 600–900 MHz (¹H) |
| Temperature | 25°C (or variable) |
| Concentration | 0.1–2 mM |
| Solvent | D₂O or H₂O/D₂O (90:10) |
| Sample volume | 300–600 μL |
| Acquisition time | 4–24 hr per experiment |

## Method Selection Guide

| Question | Recommended Method | Why |
|----------|-------------------|-----|
| Is my peptide pure? | RP-HPLC | Sensitive, quantitative |
| What is the exact mass? | ESI-MS or MALDI-TOF | Mass accuracy <0.01 Da |
| Does it form α-helix? | CD | Rapid, requires minimal sample |
| What is the 3D structure? | NMR (or X-ray) | Atomic resolution |
| Are there modifications? | LC-MS/MS | Localization of PTMs |
| Is it aggregated? | SEC-HPLC | Size-based separation |
| What are the charge variants? | IEX-HPLC | Charge-based separation |

## Quality Control Specifications

| Test | Method | Acceptance Criteria |
|------|--------|---------------------|
| Purity | RP-HPLC (214 nm) | ≥95% (research), ≥98% (GMP) |
| Identity | ESI-MS or MALDI | MW ±2 Da |
| Sequence | MS/MS | Complete coverage |
| Content | Amino acid analysis | 90–110% of label |
| Water content | Karl Fischer | ≤10% (lyophilized) |
| Acetate/TFA | ¹H-NMR or ion chromatography | ≤0.5 equivalents |
| Endotoxin | LAL assay | <0.5 EU/mg |

## References

1. Holzgrabe U, et al. "NMR spectroscopy in pharmaceutical analysis." *J Pharm Biomed Anal* 2023;212:114600.
2. Fekete S, et al. "HPLC for peptide analysis: a practical guide." *J Chromatogr A* 2022;1667:462861.
3. Kelly SM, et al. "How to study proteins by circular dichroism." *Biochim Biophys Acta* 2005;1751:119-139.
4. Wüthrich K. "NMR of proteins and nucleic acids." *Wiley* 1986.
5. Cech NB, Enke CG. "Practical implications of matrix effects in MALDI." *Mass Spectrom Rev* 2023;42:1034-1066.
