---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Quality Control — Testing and Acceptance Criteria"
description: "Peptide quality control: identity, purity, potency, safety, and stability testing per ICH guidelines."
---

Peptide quality control (QC) encompasses a systematic testing regimen to ensure identity, purity, potency, safety, and stability of the final product. This guide details the complete QC panel for research, preclinical, and clinical-grade peptides.

## 1. QC Framework Overview

### Testing by Application Grade

| Test | Research | Preclinical | Clinical | Commercial |
|------|----------|-------------|----------|------------|
| Identity (MS) | ✓ | ✓ | ✓ | ✓ |
| Purity (HPLC) | >95% | >98% | >98.5% | >99% |
| Amino acid analysis | Optional | ✓ | ✓ | ✓ |
| Sequence confirmation | Optional | ✓ | ✓ | ✓ |
| Residual solvents | — | ✓ | ✓ | ✓ |
| Water content | — | ✓ | ✓ | ✓ |
| Endotoxin | — | ✓ | ✓ | ✓ |
| Microbial limits | — | ✓ | ✓ | ✓ |
| Heavy metals | — | — | ✓ | ✓ |
| Stability (ICH) | — | — | ✓ | ✓ |
| Potency | — | ✓ | ✓ | ✓ |

## 2. Identity Testing

### Mass Spectrometry

**Method**: ESI-MS or MALDI-TOF

**Acceptance**:
- Measured mass within ±2 Da of theoretical mass (monoisotopic)
- For peptides >3 kDa, ±5 Da acceptable

**Calculation**: Theoretical monoisotopic mass = Σ(amino acid masses) – (n-1) × 18.015 + terminal groups

### Amino Acid Analysis (AAA)

**Method**: Acid hydrolysis → derivatization → HPLC/CE

**Procedure**:
1. Dissolve 0.1–1 mg peptide in 6 M HCl
2. Hydrolyze at 110°C for 24 hr (standard) or 16 hr (partial)
3. Derivatize with OPA/FMOC or AQC
4. Separate by RP-HPLC
5. Quantify each amino acid vs. norleucine internal standard

**Acceptance**:
- Each amino acid within ±10% of theoretical (±15% for Trp, Cys, Met)
- No unexpected amino acids

### Sequence Confirmation

**Methods**:
- Edman degradation (N-terminal, up to 50 residues)
- LC-MS/MS (full sequence coverage)

**Acceptance**:
- Complete sequence match
- No deletion or insertion sequences

## 3. Purity Testing

### RP-HPLC

**Method**:
- Column: C18, 2.1 × 150 mm, 1.7 µm
- Mobile phase: 0.1% TFA/H₂O (A), 0.1% TFA/MeCN (B)
- Gradient: 5–65% B over 20 min
- Detection: UV 220 nm (amide bond), 280 nm (aromatic)

**Acceptance**:
- Research grade: ≥95% (area normalization)
- Preclinical: ≥98%
- Clinical: ≥98.5%
- Commercial: ≥99%

### Impurity Identification

**Procedure**:
1. Collect HPLC fractions containing impurities >0.5%
2. Analyze by LC-MS/MS
3. Assign impurity identity (deletion, truncated, oxidized, etc.)

**Reporting**: List all impurities >0.5% and any impurities >0.2% for clinical-grade material.

### ICH Q3A/Q3B Compliance

Per ICH guidelines:
- Report threshold for identification: 0.10% (clinical)
- Report threshold for qualification: 0.15% (clinical)
- Threshold for acceptance: 0.15% (clinical)

## 4. Residual Solvent Testing

### Method: GC-HS (Headspace Gas Chromatography)

| Solvent | ICH Class | Limit (ppm) | Method |
|---------|-----------|-------------|--------|
| DMF | 2 | 880 | USP <467> |
| NMP | 2 | 530 | USP <467> |
| DCM | 2 | 600 | USP <467> |
| TFA | 3 | — | ICP-MS (fluoride) |
| MeOH | 2 | 3000 | USP <467> |
| Et₂O | 3 | 5000 | USP <467> |
| Acetonitrile | 2 | 410 | USP <467> |
| Piperidine | 2 | — | LC-MS |

### TFA Quantification

TFA (trifluoroacetic acid) is a common cleavage agent that is difficult to remove:
1. Dissolve peptide in 50% MeOH/H₂O
2. Analyze by ion chromatography or ¹⁹F NMR
3. Acceptance: <0.1% w/w for clinical grade

## 5. Water Content

### Method: Karl Fischer Titration

**Procedure**:
1. Dissolve 10–50 mg peptide in anhydrous methanol
2. Titrate with Karl Fischer reagent
3. Report as % w/w water

**Acceptance**:
- Lyophilized peptides: <5% w/w
- Amorphous powders: <3% w/w
- Oils/solutions: per specification

## 6. Endotoxin Testing

### Method: LAL (Limulus Amebocyte Lysate) Assay

**Sensitivity**: 0.005–0.5 EU/mL

**Acceptance**:
- Research grade: <10 EU/mg
- Preclinical: <1 EU/mg
- Clinical: <0.25 EU/mg (FDA requirement for parenteral)

**Mitigation**: Endotoxin removal by:
- Filtration through 0.22 µm with endotoxin-retentive membrane
- Anion-exchange chromatography
- Triton X-114 phase separation

## 7. Microbial Testing

### Tests Required

| Test | Method | Acceptance |
|------|--------|------------|
| Bioburden | USP <61> | <100 CFU/g |
| Sterility | USP <71> | Sterile (for injectable) |
| Bacterial endotoxins | USP <85> | <0.25 EU/mL |
| Particulate matter | USP <788> | Meets limits |

### Sterility Assurance

For injectable peptides:
- Terminal sterilization (gamma irradiation, 25 kGy) if possible
- Aseptic processing if terminal sterilization not feasible
- Sterility testing per USP <71>

## 8. Heavy Metal Testing

### ICP-MS Analysis

| Metal | Limit (ppm) | Source |
|-------|-------------|--------|
| As | <1.5 | Reagent contamination |
| Cd | <0.25 | Reagent contamination |
| Hg | <0.5 | Reagent contamination |
| Pb | <0.5 | Reagent contamination |
| Co | <0.5 | Catalyst residue |
| Ni | <0.5 | Metal vessel corrosion |
| Cr | <0.5 | Metal vessel corrosion |

## 9. Potency Testing

### Bioassay

- Cell-based assay measuring biological activity
- Express as % relative potency vs. reference standard
- Acceptance: 80–120% relative potency

### Binding Assay

- SPR (surface plasmon resonance) for receptor binding
- ELISA for ligand-receptor interactions
- Report K_d and EC₅₀ values

### Specific Activity

- U/mg or U/µmol
- Compare to literature or in-house reference

## 10. Stability Testing

### ICH Q1A Guidelines

| Condition | Temperature | Humidity | Duration |
|-----------|-------------|----------|----------|
| Long-term | 25°C ± 2°C | 60% ± 5% RH | 12–24 months |
| Accelerated | 40°C ± 2°C | 75% ± 5% RH | 6 months |
| Stress | 50°C ± 2°C | Ambient | 2 weeks |
| Freeze-thaw | -20°C ↔ 25°C | — | 3 cycles |
| Photostability | ICH Q1B | — | As required |

### Stability Parameters

| Parameter | Method | Acceptance |
|-----------|--------|------------|
| Purity | HPLC | Within 2% of initial |
| Identity | MS | Mass unchanged |
| Appearance | Visual | No color change |
| Water content | Karl Fischer | Within 1% of initial |
| Potency | Bioassay | >80% of initial |

## References

1. ICH Q1A(R2). Stability Testing of New Drug Substances and Products.
2. ICH Q3A(R2). Impurities in New Drug Substances.
3. ICH Q3B(R2). Impurities in New Drug Products.
4. USP General Chapters <61>, <71>, <85>, <467>.
5. European Pharmacopoeia 2.2.29 (Liquid Chromatography).

## Further Reading

- [Peptide Stability Testing](/learn/peptide-stability-testing/) — Detailed stability protocols
- [GMP Manufacturing](/learn/peptide-gmp-manufacturing/) — Production under GMP
- [Analytical Methods](/learn/analytical-methods/) — All analytical techniques
