---
date: 2026-07-22
author: "Wikipept Contributors"
title: Peptide Quality Control
description: "Quality control reference for synthetic peptides covering identity, purity, potency, and stability testing."
---

This reference table outlines quality control (QC) testing requirements for peptide drugs, organized by test category, acceptance criteria, and regulatory expectations. Applicable to research-grade, clinical-grade, and commercial peptide products.

## How to Use This Table

- **Test Category**: Major QC test group
- **Test**: Specific analytical method
- **Acceptance Criteria**: Typical specifications
- **Regulatory Reference**: ICH guideline or pharmacopeial method
- **Applicability**: Research / Clinical / Commercial

## Identity Testing

| Test | Method | Acceptance Criteria | Regulatory Reference | Applicability |
|------|--------|--------------------|--------------------|---------------|
| Mass spectrometry (MS) | ESI-MS or MALDI-TOF | Measured MW within ±2 Da of calculated | USP <197>, ICH Q6A | All |
| Amino acid analysis (AAA) | Acid hydrolysis + HPLC | Each AA within ±10% of theoretical | USP <1052> | All |
| Peptide mapping | LC-MS/MS after enzymatic digestion | Fingerprint matches reference | ICH Q6A | Clinical/Commercial |
| N-terminal sequencing | Edman degradation | Correct sequence (first 10+ residues) | ICH Q6A | Clinical/Commercial |
| C-terminal sequencing | Carboxypeptidase digestion + MS | Correct C-terminal residue | ICH Q6A | Clinical/Commercial |
| Capillary electrophoresis (CE) | CZE or CGE | Single peak matching reference | USP <1053> | Clinical/Commercial |
| UV spectrum | UV spectrophotometry | Characteristic absorption pattern | USP <857> | All |

## Purity Testing

| Test | Method | Acceptance Criteria | Regulatory Reference | Applicability |
|------|--------|--------------------|--------------------|---------------|
| HPLC purity | RP-HPLC (C18/C8) | ≥95% (research), ≥97% (clinical), ≥98% (commercial) | USP <621> | All |
| Size-exclusion chromatography (SEC) | SEC-HPLC | Aggregate <2% (monomer >98%) | ICH Q6A | Clinical/Commercial |
| Chiral purity | Chiral HPLC or CE | D-amino acid content <1% | ICH Q6A | Clinical/Commercial |
| Residual protecting groups | HPLC or MS | <0.1% (Fmoc, tBu, etc.) | ICH Q3D | Clinical/Commercial |
| Truncated sequences | LC-MS/MS or RP-HPLC | Individual impurity <0.5%, total <2% | ICH Q6A | Clinical/Commercial |
| Deletion peptides | RP-HPLC or CE | <1% individual | ICH Q6A | Clinical/Commercial |
| Residual TFA | Ion chromatography or 19F-NMR | <0.1% (1000 ppm) | ICH Q3D | Clinical/Commercial |
| Residual DMF | GC-headspace | <880 ppm (ICH limit) | ICH Q3D | Clinical/Commercial |
| Residual solvents | GC-headspace | Per ICH Q3C limits | ICH Q3C | Clinical/Commercial |
| Residual metal ions | ICP-MS or ICP-OES | Per ICH Q3D limits | ICH Q3D | Clinical/Commercial |

## Potency Testing

| Test | Method | Acceptance Criteria | Regulatory Reference | Applicability |
|------|--------|--------------------|--------------------|---------------|
| Biological activity | Cell-based bioassay | 80–125% of reference standard | ICH Q6A, USP <111> | Clinical/Commercial |
| Receptor binding | Radioligand binding assay | Ki or Kd within 2-fold of reference | ICH Q6A | Clinical/Commercial |
| Functional potency | Second messenger assay (cAMP, Ca²⁺) | EC₅₀ within 2-fold of reference | ICH Q6A | Clinical/Commercial |
| In vivo potency | Animal model (if applicable) | Response within 80–125% of reference | USP <111> | Commercial |

## Safety Testing

| Test | Method | Acceptance Criteria | Regulatory Reference | Applicability |
|------|--------|--------------------|--------------------|---------------|
| Endotoxin | LAL (Limulus amebocyte lysate) | <5 EU/kg dose (or per product spec) | USP <85> | Clinical/Commercial |
| Sterility | Membrane filtration or direct inoculation | No growth at 14 days | USP <71> | Clinical/Commercial |
| Particulate matter | Light obscuration, microscopic | Per USP <788> | USP <788> | Clinical/Commercial |
| Bioburden | Total aerobic microbial count | <100 CFU/g (non-sterile) | USP <61> | All |
| Mycoplasma | PCR or culture | Negative | USP <63> | Clinical/Commercial |
| Host cell protein (HCP) | ELISA | <100 ppm (recombinant) | ICH Q5E | Recombinant products |
| Host cell DNA | qPCR | <10 ng/dose (recombinant) | ICH Q5D | Recombinant products |
| Viral clearance | In vitro/in vivo viral clearance | Log reduction >4–12 per virus | ICH Q5A | Recombinant products |
| Abnormal toxicity | Mouse and guinea pig test | No abnormal weight loss or death | Pharmacopeial | Commercial |
| Immunogenicity | Anti-drug antibody assay | Product-specific | ICH Q6A | Clinical/Commercial |

## Physical Characterization

| Test | Method | Acceptance Criteria | Regulatory Reference | Applicability |
|------|--------|--------------------|--------------------|---------------|
|外观 (Appearance) | Visual inspection | White to off-white powder, no discoloration | Pharmacopeial | All |
| Solubility | Visual or turbidimetric | Soluble in specified solvent | USP <1191> | All |
| Water content | Karl Fischer titration | ≤5% (or product-specific) | USP <921> | All |
| Counter-ion content | Ion chromatography, titration | Within specification (acetate, TFA, HCl) | USP <621> | All |
| Residual moisture | Thermogravimetric analysis (TGA) | ≤3% | ICH Q1A | All |
| Particle size | Laser diffraction | D90 <25 µm (for injectables) | USP <429> | Clinical/Commercial |
| Polymorphism | X-ray powder diffraction (XRPD) | Amorphous or specified form | ICH Q6A | Commercial |

## Stability Testing

| Test | Condition | Duration | Frequency | Regulatory Reference |
|------|-----------|----------|-----------|---------------------|
| Long-term | 25°C ± 2°C / 60% RH ± 5% | 12–36 months | 0, 3, 6, 9, 12, 18, 24, 36 months | ICH Q1A |
| Accelerated | 40°C ± 2°C / 75% RH ± 5% | 6 months | 0, 1, 2, 3, 6 months | ICH Q1A |
| Intermediate | 30°C ± 2°C / 65% RH ± 5% | 12 months | 0, 3, 6, 9, 12 months | ICH Q1A |
| Photostability | ICH Q1B (Option 2) | Per guideline | 0 and exposed | ICH Q1B |
| In-use stability | Room temperature (25°C) | 24–48 hours (reconstituted) | 0, 6, 12, 24, 48 hours | ICH Q1A |
| Freeze-thaw | -20°C to 25°C cycles | 3 cycles | After each cycle | ICH Q1A |

## Stability Indicating Methods

| Parameter | Method | Significance |
|-----------|--------|-------------|
| Purity | RP-HPLC | Detects degradation products |
| Potency | Bioassay | Confirms biological activity |
| Aggregation | SEC | Detects oligomers/aggregates |
| Deamidation | LC-MS | Detects Asn → Asp conversion |
| Oxidation | LC-MS | Detects Met, Trp, Cys oxidation |
| Hydrolysis | LC-MS | Detects peptide bond cleavage |
| Racemization | Chiral HPLC | Detects L → D conversion |
| Disulfide bonds | Non-reducing SDS-PAGE, LC-MS | Detects incorrect S-S pairing |
| Fragmentation | SDS-PAGE, SEC | Detects peptide chain cleavage |

## Batch Release Specifications

| Test | Research Grade | Clinical Grade | Commercial Grade |
|------|---------------|----------------|------------------|
| HPLC purity | ≥90% | ≥95% | ≥98% |
| MS identity | Confirmed | Confirmed | Confirmed |
| AAA composition | ±15% | ±10% | ±5% |
| Residual TFA | <0.5% | <0.2% | <0.1% |
| Residual solvents | Informal | Per ICH Q3C | Per ICH Q3C |
| Endotoxin | Not required | <5 EU/kg | <5 EU/kg |
| Sterility | Not required | Required | Required |
| Water content | <10% | <5% | <3% |
| Potency | Informal | 80–125% | 80–125% |
| Certificate of Analysis | Basic | Full | Full + batch records |

## Regulatory Guidelines

| Guideline | Scope | Key Requirements |
|-----------|-------|-----------------|
| ICH Q1A | Stability testing | Long-term, accelerated, intermediate conditions |
| ICH Q1B | Photostability | Light exposure testing |
| ICH Q2 | Validation of analytical methods | Specificity, linearity, accuracy, precision |
| ICH Q3A/B | Impurities | Reporting, identification, qualification thresholds |
| ICH Q5A | Viral safety | Viral clearance evaluation |
| ICH Q5D | Derivation of cell lines | Cell substrate characterization |
| ICH Q5E | Comparability | Manufacturing change comparability |
| ICH Q6A | Specifications | Decision tree for peptide specifications |
| USP <1052> | Peptide amino acid analysis | AAA method |
| USP <1053> | Capillary electrophoresis | CE method |
| Ph. Eur. 2.2.29 | Peptide HPLC | RP-HPLC method |

## Out-of-Specification (OOS) Investigation

| Phase | Action | Timeline |
|-------|--------|----------|
| Phase 1 | Laboratory investigation (recalibrate, re-test) | 5–10 business days |
| Phase 2 | Extended investigation (root cause analysis) | 30 business days |
| Phase 3 | Corrective and preventive action (CAPA) | 60 business days |
| Reporting | Notify QA, regulatory (if product released) | Immediately for safety issues |
| Batch disposition | Hold pending investigation | Until Phase 1 complete |

## Conclusion

Peptide quality control requires a comprehensive testing program spanning identity, purity, potency, safety, and stability. Requirements scale with product intended use: research-grade peptides require basic characterization, while commercial peptide drugs demand full ICH compliance including stability-indicating methods, viral clearance (recombinant), and comprehensive impurity profiling. The selection of QC tests should be based on the peptide's manufacturing method, route of administration, and regulatory classification.
