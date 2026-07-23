---
date: 2026-07-22
author: "Wikipept Contributors"
title: "Peptide Cell-Based Assays — Functional Activity Testing"
description: "Guide to cell-based assays for peptide characterization — receptor binding, signaling cascade activation, and functional readouts."
---

Cell-based assays evaluate the biological activity of therapeutic peptides in a physiological context, providing functional potency data complementary to receptor binding studies. This protocol covers cell-based assay design, execution, data analysis, and regulatory requirements for peptide potency testing.

## Cell-Based Assay Types

### Assay Classification

| Type | Readout | Throughput | Information | Application |
|------|---------|-----------|-------------|-------------|
| Reporter gene assay | Luciferase/β-galactosidase | High | Transcriptional activity | Potency screening |
| Proliferation assay | Cell count/MTT/BrdU | Moderate | Mitogenic activity | Growth factor peptides |
| Calcium flux | Fluorescence (Ca²⁺ indicator) | High | GPCR signaling | GPCR agonist/antagonist |
| cAMP assay | Fluorescence/LRET | High | Gαs signaling | GLP-1, GHRH peptides |
| ERK phosphorylation | Western/ELISA | Moderate | MAPK signaling | Growth factor peptides |
| Cell migration | Wound healing/Boyden | Moderate | Motility activity | Wound healing peptides |
| Apoptosis assay | Annexin V/caspase | Moderate | Cell death | Oncology peptides |

## Reporter Gene Assay Protocol

### Luciferase Reporter Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 10,000–20,000 cells/well | 24 hours |
| 2 | Transfect reporter plasmid | Lipofection/electroporation | 24–48 hours |
| 3 | Treat with peptide | 8–10 concentrations (log dilution) | 4–24 hours |
| 4 | Lyse cells | Passive lysis buffer | 15 min |
| 5 | Add luciferase substrate | Luciferin + ATP | — |
| 6 | Measure luminescence | Luminometer | — |
| 7 | Calculate EC₅₀ | Non-linear regression | — |

### β-Galactosidase Reporter Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 10,000–20,000 cells/well | 24 hours |
| 2 | Transfect reporter plasmid | Lipofection | 24–48 hours |
| 3 | Treat with peptide | 8–10 concentrations | 4–24 hours |
| 4 | Lyse cells | ONPG lysis buffer | 15 min |
| 5 | Add substrate (ONPG) | 4 mg/mL in Z-buffer | 30 min |
| 6 | Stop reaction | 1M Na₂CO₃ | — |
| 7 | Measure absorbance | 420 nm | — |
| 8 | Calculate EC₅₀ | Non-linear regression | — |

## cAMP Assay Protocol

### LRET-Based cAMP Assay (HTRF)

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 10,000–20,000 cells/well | 24 hours |
| 2 | Treat with peptide | 8–10 concentrations | 30 min |
| 3 | Add lysis buffer | supplemented with IBMX | 15 min |
| 4 | Add cAMP-d2 conjugate | 1:50 dilution | — |
| 5 | Add anti-cAMP cryptate | 1:50 dilution | — |
| 6 | Incubate | Room temperature | 1 hour |
| 7 | Read LRET | 665/620 nm ratio | — |
| 8 | Calculate EC₅₀ | Non-linear regression | — |

### ELISA-Based cAMP Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 10,000–20,000 cells/well | 24 hours |
| 2 | Treat with peptide | 8–10 concentrations | 30 min |
| 3 | Lyse cells | 0.1M HCl | 10 min |
| 4 | Add to cAMP ELISA plate | 100 μL/well | — |
| 5 | Add enzyme conjugate | 50 μL/well | 1 hour |
| 6 | Add substrate | TMB | 15–30 min |
| 7 | Stop reaction | 0.5M H₂SO₄ | — |
| 8 | Measure absorbance | 450 nm | — |
| 9 | Calculate EC₅₀ | Standard curve | — |

## Calcium Flux Assay Protocol

### Fluorescence-Based Calcium Flux

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 30,000–50,000 cells/well | 24 hours |
| 2 | Load calcium indicator | Fluo-4 AM (2–5 μM) | 30–60 min |
| 3 | Wash cells | Hanks buffer | 2× |
| 4 | Baseline measurement | 37°C | 30 sec |
| 5 | Add peptide agonist | 8–10 concentrations | — |
| 6 | Measure fluorescence | Ex 488 nm, Em 520 nm | 2–5 min |
| 7 | Add ionomycin (positive control) | 1 μM | — |
| 8 | Calculate EC₅₀ | Peak height/area | — |

### FLIPR-Based High-Throughput Calcium Flux

| Parameter | Setting | Notes |
|-----------|---------|-------|
| Instrument | FLIPR Tetra | Automated liquid handling |
| Dye | Fluo-4 AM, Fluo-8 AM | Brighter indicators |
| Read rate | 1–2 sec/well | High temporal resolution |
| Plate format | 96 or 384 well | High throughput |
| Data output | Real-time fluorescence | Kinetic traces |

## Proliferation Assay Protocol

### MTT Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 5,000–10,000 cells/well | 24 hours |
| 2 | Treat with peptide | 8–10 concentrations | 48–72 hours |
| 3 | Add MTT | 5 mg/mL (10 μL/well) | 2–4 hours |
| 4 | Remove medium | Aspirate | — |
| 5 | Dissolve formazan | DMSO (100 μL/well) | 10 min |
| 6 | Measure absorbance | 570 nm (ref 630 nm) | — |
| 7 | Calculate EC₅₀ | Non-linear regression | — |

### BrdU Incorporation Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 5,000–10,000 cells/well | 24 hours |
| 2 | Treat with peptide | 8–10 concentrations | 24–48 hours |
| 3 | Add BrdU | 10 μM final | 2–4 hours |
| 4 | Fix cells | 4% PFA | 30 min |
| 5 | Denature DNA | 2M HCl | 30 min |
| 6 | Add anti-BrdU antibody | 1:100 | 1 hour |
| 7 | Add secondary antibody | HRP-conjugated | 30 min |
| 8 | Add substrate | TMB | 15 min |
| 9 | Measure absorbance | 450 nm | — |

## ERK Phosphorylation Assay Protocol

### Western Blot-Based Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 100,000–200,000 cells/well | 24 hours |
| 2 | Serum starve | 0.5% FBS | 16–24 hours |
| 3 | Treat with peptide | 8–10 concentrations | 5–30 min |
| 4 | Lyse cells | RIPA + phosphatase inhibitors | 15 min |
| 5 | Run SDS-PAGE | 10% gel | 1–2 hours |
| 6 | Transfer to membrane | PVDF | 1 hour |
| 7 | Block | 5% BSA/TBST | 1 hour |
| 8 | Probe with anti-pERK | 1:1000 | Overnight |
| 9 | Probe with anti-ERK | 1:1000 | 1 hour |
| 10 | Detect | ECL chemiluminescence | — |
| 11 | Quantify | Densitometry | — |

### ELISA-Based Phospho-ERK Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Seed cells | 10,000–20,000 cells/well | 24 hours |
| 2 | Serum starve | 0.5% FBS | 16–24 hours |
| 3 | Treat with peptide | 8–10 concentrations | 5–30 min |
| 4 | Lyse cells | ELISA lysis buffer | 15 min |
| 5 | Add to anti-pERK plate | 100 μL/well | Overnight |
| 6 | Add detection antibody | Biotinylated anti-ERK | 1 hour |
| 7 | Add streptavidin-HRP | 1:200 | 30 min |
| 8 | Add substrate | TMB | 15 min |
| 9 | Measure absorbance | 450 nm | — |
| 10 | Calculate EC₅₀ | Standard curve | — |

## Cell Migration Assay Protocol

### Wound Healing (Scratch) Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Culture cells | Confluent monolayer | 24–48 hours |
| 2 | Create wound | P200 pipette tip | — |
| 3 | Wash cells | PBS | 2× |
| 4 | Add peptide | 8–10 concentrations | — |
| 5 | Image wound | Phase contrast microscope | 0, 6, 12, 24 hours |
| 6 | Measure wound closure | ImageJ analysis | — |
| 7 | Calculate migration rate | % closure vs. time | — |

### Boyden Chamber Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Prepare chamber | 8 μm pore membrane | — |
| 2 | Add cells to upper chamber | 50,000–100,000 cells | — |
| 3 | Add peptide to lower chamber | 8–10 concentrations | — |
| 4 | Incubate | 37°C, 5% CO₂ | 12–24 hours |
| 5 | Remove non-migrated cells | Cotton swab | — |
| 6 | Fix and stain | Crystal violet | 10 min |
| 7 | Count migrated cells | Microscope | 5 fields/well |
| 8 | Calculate migration index | Treated / Control | — |

## Potency Assay Design

### Assay Validation Parameters

| Parameter | Requirement | Method |
|-----------|-------------|--------|
| Accuracy | 80–120% | Spike recovery |
| Precision | <20% CV | Replicate measurements |
| Linearity | r² >0.98 | Standard curve |
| Range | EC₅₀ ± 2 log units | Concentration range |
| Specificity | No interference | Blank controls |
| Robustness | Z-factor >0.5 | Plate quality |

### Reference Standard

| Component | Requirement | Documentation |
|-----------|-------------|---------------|
| Primary standard | Fully characterized peptide | Certificate of analysis |
| Working standard | Calibrated against primary | Calibration curve |
| Positive control | Known agonist/antagonist | Control data |
| Negative control | Vehicle only | Background subtraction |

## Data Analysis

### EC₅₀ Calculation

| Method | Formula | Application |
|--------|---------|-------------|
| 4-parameter logistic | Y = Bottom + (Top-Bottom)/(1+10^((LogEC50-X)*HillSlope)) | Standard analysis |
| Hill equation | Response = 100/(1+(EC₅₀/[Agonist])^n) | Simple cases |
| Linear regression | Standard curve | cAMP ELISA |

### Potency Comparison

| Metric | Formula | Application |
|--------|---------|-------------|
| Relative potency | EC₅₀ (standard) / EC₅₀ (test) × 100% | Batch-to-batch comparison |
| Specific activity | Units/mg | Activity per mass |
| Fold induction | Treated / Untreated | Transcriptional activation |

## Regulatory Requirements

### ICH Q6B Requirements

| Requirement | Description | Documentation |
|-------------|-------------|---------------|
| Biological activity | Demonstrate mechanism of action | Potency assay report |
| Reference standard | Calibrated reference | Certificate of analysis |
| Lot release | Potency specification | Batch record |
| Stability | Potency over shelf life | Stability data |

### FDA Guidance

| Requirement | Description | Documentation |
|-------------|-------------|---------------|
| Mechanism of action | Confirm biological activity | Functional assay data |
| Potency assay | Quantitative measure of activity | Validation report |
| Specificity | Confirm target engagement | Selectivity data |
| Correlation | Binding vs. functional activity | Correlation analysis |

## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| High background | Non-specific activation | Serum reduce, optimize cells |
| Low signal | Insufficient stimulation | Increase peptide concentration |
| Variable EC₅₀ | Cell passage number | Use early passage cells |
| Poor Z-factor | High variability | Optimize assay conditions |
| Cytotoxicity | High peptide concentration | Reduce concentration range |
| Plate edge effects | Evaporation | Use humidified incubator |

Cell culture supplies available from [Kingston Peptides](https://kingstonpeptides.com)

## References

1. Bhatt DL, et al. "Cell-based assays for peptide therapeutics." *Assay Drug Dev Technol* 2015;13:1-12.
2. Haas AL, et al. "Reporter gene assays for GPCR ligands." *Methods Mol Biol* 2018;1748:1-15.
3. Huang Y, et al. "Calcium flux assays for GPCR drug discovery." *Expert Opin Drug Discov* 2019;14:1045-1057.
4. Xu Y, et al. "Cell-based potency assays for therapeutic peptides." *J Pharm Biomed Anal* 2021;195:113897.
5. ICH Q6B. "Specifications: test procedures and acceptance criteria for biotechnological/biological products." *ICH Guidelines* 1999.
