---
date: 2026-07-22
author: "Wikipept Contributors"
title: "Peptide Sterile Filtration — Aseptic Manufacturing"
description: "Guide to sterile filtration for peptide manufacturing — membrane selection and validation strategies."
---

Sterile filtration is the most common method for achieving sterility in injectable peptide formulations. This protocol covers filter selection, compatibility testing, integrity verification, and regulatory compliance for peptide sterile filtration.

## Filtration Principles

### Filter Classification

| Pore Size | Rating | Application | Example |
|-----------|--------|-------------|---------|
| 0.22 μm | Sterilizing grade | Final filtration | Most injectables |
| 0.1 μm | Mycoplasma removal | Sensitive products | Cell culture media |
| 0.45 μm | Pre-filtration | Bioburden reduction | Pre-filtration step |
| 1.0 μm | Clarification | Particulate removal | Pre-filtration |
| 5.0 μm | Coarse filtration | Large particulates | Initial clarification |

### Filter Mechanisms

| Mechanism | Process | Application |
|-----------|---------|-------------|
| Size exclusion | Particles > pore size retained | Sterilizing filtration |
| Adsorption | Electrostatic/hydrophobic binding | Some pre-filters |
| Depth filtration | Tortuous path captures particles | Clarification |

## Filter Selection

### Membrane Materials

| Material | Compatibility | Protein Binding | Chemical Resistance | Application |
|----------|--------------|----------------|-------------------|-------------|
| PVDF (polyvinylidene fluoride) | Excellent | Low | Good | Most peptides |
| PES (polyethersulfone) | Excellent | Very low | Excellent | Protein formulations |
| Nylon | Good | Moderate | Good | Aqueous solutions |
| Cellulose acetate | Good | Low | Moderate | Aqueous solutions |
| PTFE (Teflon) | Excellent | Very low | Excellent | Aggressive solvents |
| Polycarbonate | Good | Moderate | Good | Specialty applications |

### PES vs PVDF Comparison

| Property | PES | PVDF | Recommendation |
|----------|-----|------|----------------|
| Protein binding | Very low | Low | PES for sensitive peptides |
| Flow rate | High | High | Both acceptable |
| Chemical resistance | Excellent | Good | PES for wider range |
| Sterilization | Autoclave, gamma | Gamma only | PES more versatile |
| Cost | Moderate | Moderate | Similar |
| Compatibility | Excellent | Excellent | Both suitable |

### Filter Selection Criteria

| Factor | Consideration | Recommendation |
|--------|--------------|----------------|
| Peptide size | <10 kDa | 0.22 μm filter (peptide passes) |
| Aggregation propensity | High | Low-protein-binding filter (PES) |
| Charge | Cationic | Positively charged filter may adsorb |
| Hydrophobicity | High | Hydrophilic membrane preferred |
| Formulation pH | <4 or >9 | Chemical compatibility check |
| Surfactant content | PS-80 present | Compatibility check |

## Filtration Protocol

### Pre-Filtration Steps

| Step | Action | Purpose | Time |
|------|--------|---------|------|
| 1 | Visually inspect solution | Detect particulates | 1 min |
| 2 | Check pH and osmolality | Confirm formulation | 5 min |
| 3 | Pre-filter (0.45 μm) | Reduce bioburden | Variable |
| 4 | Rinse filter with WFI | Remove extractables | 5 min |
| 5 | Assemble filtration train | Prepare for filtration | 5 min |

### Sterilizing Filtration (0.22 μm)

| Parameter | Standard | Acceptable Range | Notes |
|-----------|----------|------------------|-------|
| Filter type | 0.22 μm sterilizing | 0.2 μm nominal | PVDF or PES |
| Filter area | 0.5–1.0 cm²/cm² | Per specification | Match to volume |
| Pressure | <30 psi (2 bar) | <45 psi (3 bar) | Prevent filter damage |
| Flow rate | 1–10 mL/cm²/min | Variable | Based on filter area |
| Volume | Per batch size | — | Calculate filter area |
| Temperature | 2–25°C | 4–8°C preferred | Protect peptide |

### Filtration Procedure

| Step | Action | Duration | Monitoring |
|------|--------|----------|-----------|
| 1 | Equilibrate filter with WFI | 5 min | Visual |
| 2 | Begin filtration at low pressure | — | Pressure gauge |
| 3 | Gradually increase pressure | 5 min | Pressure <30 psi |
| 4 | Monitor flow rate | Continuous | Timer + volume |
| 5 | Complete filtration | Variable | Volume collected |
| 6 | Rinse filter with WFI | 5 min | 2–3 filter volumes |
| 7 | Record filtration parameters | — | Documentation |
| 8 | Perform integrity test | 5 min | Bubble point/diffusion |

## Integrity Testing

### Bubble Point Test

| Parameter | Value | Acceptance | Notes |
|-----------|-------|------------|-------|
| Test pressure | 45–60 psi (PVDF 0.22 μm) | ≥ specified BP | Manufacturer specification |
| Acceptance | Continuous flow at <specified BP | Pass | No bubbling below BP |
| Duration | 5–10 minutes | — | Visual inspection |
| Sensitivity | Detects >0.2 μm holes | — | Regulatory requirement |

### Diffusion Test

| Parameter | Value | Acceptance | Notes |
|-----------|-------|------------|-------|
| Test pressure | 80% of bubble point | <diffusion limit | More sensitive than BP |
| Acceptance | Diffusion rate < specified | Pass | Quantitative |
| Duration | 5–10 minutes | — | Automated instruments |
| Sensitivity | Detects >0.1 μm holes | — | Preferred for large filters |

### Forward Flow Test

| Parameter | Value | Acceptance | Notes |
|-----------|-------|------------|-------|
| Test pressure | 80% of bubble point | <flow limit | For large area filters |
| Acceptance | Flow rate < specified | Pass | Automated |
| Duration | 5–10 minutes | — | Automated instruments |
| Application | Filters >10 cm² area | — | Large-scale filtration |

## Compatibility Assessment

### Chemical Compatibility

| Factor | Test | Acceptance | Notes |
|--------|------|------------|-------|
| pH compatibility | Incubate filter in solution | pH change <0.1 | 24 hours at 25°C |
| Extractables | LC-MS analysis | Below limits | Per filter manufacturer |
| Leachables | ICP-MS (metals) | Below limits | Per filter specification |
| Adsorption | Measure peptide before/after | Recovery >95% | Critical for low-dose peptides |

### Protein Adsorption Testing

| Method | Procedure | Acceptance |
|--------|-----------|------------|
| Pre/post concentration | Measure peptide concentration | Recovery >95% |
| Mass balance | Calculate total peptide | Recovery 95–105% |
| Filter extraction | Extract retained peptide | <5% retained |
| Multiple filters | Test 3 filter lots | Consistent recovery |

### Adsorption by Filter Material

| Material | Low Peptide (<1 mg/mL) | High Peptide (>10 mg/mL) | Recommendation |
|----------|----------------------|-------------------------|----------------|
| PES | <2% adsorption | <1% adsorption | Preferred |
| PVDF | <3% adsorption | <1% adsorption | Acceptable |
| Nylon | 5–10% adsorption | 2–5% adsorption | Avoid for low-dose |
| Cellulose | 3–5% adsorption | 1–3% adsorption | Acceptable |

## Regulatory Compliance

### FDA Requirements (21 CFR 211)

| Requirement | Description | Documentation |
|-------------|-------------|---------------|
| Filter validation | Demonstrate sterilizing capability | Filter validation report |
| Integrity testing | Pre- and post-use testing | Test records |
| Extractables/leachables | Characterize filter-derived substances | E&L report |
| Filter sizing | Adequate filter area for batch | Filter sizing calculation |
| Redundant filtration | Second 0.22 μm filter | Justification document |

### EU GMP Requirements

| Requirement | Description | Documentation |
|-------------|-------------|---------------|
| Sterilizing grade | 0.22 μm or 0.1 μm | Filter specification |
| Integrity test | Pre- and post-filtration | Test records |
| Validation | Demonstrate sterility assurance | Validation report |
| Batch records | Complete filtration documentation | Batch record |

### Validation Protocol

| Step | Action | Acceptance | Documentation |
|------|--------|------------|---------------|
| 1 | Filter compatibility testing | No interaction | Compatibility report |
| 2 | Filter sizing | Adequate area | Sizing calculation |
| 3 | Extractables/leachables | Below limits | E&L report |
| 4 | Filter sterilization | Sterile filter | Sterilization record |
| 5 | Filtration process | Successful filtration | Batch record |
| 6 | Integrity testing | Pass post-use test | Integrity test record |
| 7 | Sterility testing | No growth at 14 days | Sterility test report |

## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| Slow filtration | Filter clogging, high viscosity | Pre-filter, increase filter area |
| High pressure | Clogged filter, high flow rate | Replace filter, reduce pressure |
| Low recovery | Peptide adsorption | Use low-binding filter, increase concentration |
| Integrity test failure | Damaged filter | Replace filter, investigate |
| Particulates in filtrate | Filter bypass, pre-filter failure | Check filter integrity, add pre-filter |
| Peptide aggregation | Incompatible filter, shear stress | Change filter material, reduce pressure |

Filtration supplies available from [Kingston Peptides](https://kingstonpeptides.com)

## Filter Sizing Calculator

| Parameter | Formula | Example |
|-----------|---------|---------|
| Required area | Volume / Flow rate | 1000 mL / 5 mL/cm²/min = 200 cm² |
| Safety factor | Area × 1.5–2.0 | 200 × 1.5 = 300 cm² |
| Filter selection | Select area ≥ calculated | 350 cm² filter |

## References

1. Meltzer TH, Jornitz MW. *Filtration in the Pharmaceutical Industry*. Springer, 2018.
2. Avis K, et al. "Sterilizing filtration of peptide solutions." *PDA J Pharm Sci Technol* 2006;60:313-322.
3. Gervais D, et al. "Filter compatibility and validation for therapeutic proteins." *BioProcess Int* 2016;14:44-52.
4. FDA. "Sterile drug products produced by aseptic processing." *Guidance for Industry* 2004.
5. EMA. "Annex 1: Manufacture of sterile medicinal products." *EU GMP Guidelines* 2022.
