---
title: Peptide Scale-Up
description: Scaling peptide synthesis from mg to kg — reactor design, process optimization, cost analysis, and GMP manufacturing considerations.
---

# Peptide Scale-Up: From Milligrams to Kilograms

Comprehensive guide to scaling solid-phase peptide synthesis (SPPS) from laboratory scale (mg) to pilot scale (g) and manufacturing scale (kg). Covers reactor design, process optimization, quality considerations, and cost analysis.

## Scale Overview

| Scale | Amount | Reactor Type | Typical Use |
|-------|--------|-------------|-------------|
| Analytical | 1–10 mg | Manual or automated synthesizer | Method development, research |
| Laboratory | 10–100 mg | Automated synthesizer | Preclinical studies, optimization |
| Pilot | 0.1–10 g | Medium-scale reactor | Proof of concept, early clinical |
| Clinical | 10–100 g | Large-scale reactor | Clinical trial material |
| Manufacturing | 0.1–10 kg | Production reactor | Commercial supply |

## Reactor Design

### Laboratory Scale (10–100 mg)

| Parameter | Typical Specification |
|-----------|----------------------|
| Reactor volume | 10–100 mL |
| Resin loading | 0.1–1.0 g |
| Solvent volume | 5–50 mL per cycle |
| Mixing | Magnetic stir bar or vortex |
| Temperature | Ambient (20–25°C) |
| Automation | Fully automated synthesizer |

### Pilot Scale (0.1–10 g)

| Parameter | Typical Specification |
|-----------|----------------------|
| Reactor volume | 100 mL–1 L |
| Resin loading | 1–100 g |
| Solvent volume | 50–500 mL per cycle |
| Mixing | Overhead stirrer or mechanical agitation |
| Temperature | Controlled (10–40°C) |
| Automation | Automated or semi-automated |

### Manufacturing Scale (0.1–10 kg)

| Parameter | Typical Specification |
|-----------|----------------------|
| Reactor volume | 1–100 L |
| Resin loading | 0.1–10 kg |
| Solvent volume | 0.5–50 L per cycle |
| Mixing | Mechanical impeller, controlled RPM |
| Temperature | Jacketed, controlled (10–40°C) |
| Automation | Fully automated with SCADA |
| Containment | Closed system, solvent recovery |

## Process Optimization for Scale-Up

### Coupling Optimization

| Parameter | Lab Scale | Scale-Up Consideration | Manufacturing Scale |
|-----------|-----------|----------------------|---------------------|
| Activation time | 2–5 min | May need longer (heat transfer) | 5–10 min |
| Coupling time | 15–30 min | Standard | 30–60 min |
| Excess (eq) | 2–3× | Reduce to 1.5–2× for cost | 1.5–2× |
| Activation | HOBt/DIC | HATU for difficult sequences | HOBt/DIC preferred (cost) |
| Temperature | Ambient | 20–25°C controlled | Jacket temperature control |

### Deprotection Optimization

| Parameter | Lab Scale | Manufacturing Scale |
|-----------|-----------|---------------------|
| Piperidine concentration | 20% | 20% (standard) |
| Deprotection time | 3 + 10 min | 3 + 15 min |
| Solvent volume | 5× resin volume | 3–5× resin volume |
| UV monitoring | Optional | Required (quality control) |

### Solvent Management

| Solvent | Lab Use (per cycle) | Manufacturing (per cycle) | Recovery |
|---------|--------------------|--------------------------|---------|
| DMF | 5–20 mL | 0.5–5 L | Distillation |
| Piperidine (20%) | 5–10 mL | 0.5–1 L | Distillation |
| TFA cleavage | 10–20 mL | 1–5 L | Recovery (distillation) |
| DCM | 10–20 mL | 0.5–5 L | Distillation |

**Solvent recovery**: 80–90% of DMF and DCM can be recovered by distillation, significantly reducing costs at manufacturing scale.

## Scale-Up Challenges

### Heat Transfer

| Issue | Lab Scale | Manufacturing Scale | Solution |
|-------|-----------|---------------------|----------|
| Exothermic coupling | Negligible | Significant (100 g scale) | Controlled addition, cooling |
| Temperature uniformity | Good (small volume) | Poor (large volume) | Jacket cooling, slow addition |
| Cleavage exotherm | Manageable | Dangerous (kg scale) | Slow TFA addition, cooling |

### Mixing and Mass Transfer

| Parameter | Lab Scale | Manufacturing Scale | Solution |
|-----------|-----------|---------------------|----------|
| Resin settling | Minimal | Significant | Optimized RPM, baffle design |
| Solvent penetration | Good | May be limited | Increased solvent:resin ratio |
| Coupling uniformity | Good | May be heterogeneous | Longer coupling, monitoring |

### Impurity Profile

| Impurity | Lab Scale | Manufacturing Scale | Mitigation |
|----------|-----------|---------------------|------------|
| Deletion sequences | 2–5% | 2–10% | Optimized coupling |
| Truncated sequences | 1–3% | 2–8% | Double coupling for difficult AAs |
| Residual solvent | 0.1–0.5% | 0.5–2% | Extended drying, vacuum |
| Metal contamination | ppm level | ppm level | Chelation, clean equipment |

## Quality Considerations

### In-Process Controls

| Test | Frequency | Acceptance | Method |
|------|-----------|------------|--------|
| Fmoc removal | Each cycle | >99% removal | UV (404 nm) |
| Coupling completion | Each cycle | >99% coupling | Kaiser test or UV |
| Resin loading | Before/after synthesis | ±10% of target | UV (Fmoc release) |
| Solvent quality | Each batch | Meets USP specs | GC analysis |

### Final Product Specifications

| Test | Research Grade | Clinical Grade | GMP Grade |
|------|---------------|---------------|-----------|
| Purity (HPLC) | ≥90% | ≥95% | ≥98% |
| Identity (MS) | MW ±2 Da | MW ±0.5 Da | MW ±0.01 Da |
| Sequence confirmation | — | MS/MS | MS/MS + Edman |
| Residual TFA | <5% | <2% | <0.5 eq |
| Residual DMF | <5000 ppm | <1000 ppm | <500 ppm |
| Endotoxin | — | <5 EU/mg | <0.5 EU/mg |
| Heavy metals | — | <100 ppm | <10 ppm |
| Water content | <10% | <5% | <3% |

## Cost Analysis

### Cost Drivers by Scale

| Cost Component | Lab Scale ($/g) | Pilot Scale ($/g) | Manufacturing ($/g) |
|---------------|-----------------|-------------------|---------------------|
| Amino acids | $200–500 | $150–300 | $100–200 |
| Reagents | $100–300 | $80–200 | $50–150 |
| Solvents | $50–150 | $30–100 | $10–50 |
| Resin | $30–80 | $20–50 | $10–30 |
| Labor | $200–500 | $100–200 | $20–50 |
| Equipment | $100–300 | $50–100 | $10–30 |
| QC testing | $200–500 | $100–200 | $50–100 |
| **Total** | **$880–2,030** | **$530–1,150** | **$250–610** |

### Cost Reduction Strategies

| Strategy | Savings | Implementation |
|----------|---------|----------------|
| Solvent recovery | 30–50% | Distillation systems |
| Reduced AA excess | 20–30% | 1.5× instead of 3× |
| Continuous flow SPPS | 20–40% | Automated flow reactors |
| Parallel synthesis | 40–60% | Multiple sequences in parallel |
| Bulk AA purchasing | 20–40% | Volume discounts |

## GMP Manufacturing Considerations

### Facility Requirements

| Area | Requirement | Purpose |
|------|------------|---------|
| Clean room | ISO 8 or better | Contamination control |
| Solvent handling | Closed system, recovery | Safety, environmental |
| HVAC | Temperature/humidity control | Process consistency |
| Water system | WFI or PW | Formulation |
| Waste treatment | Solvent recovery, disposal | Environmental compliance |

### Documentation Requirements

| Document | Content | Purpose |
|----------|---------|---------|
| Batch record | Every step documented | Traceability |
| Deviation report | Any out-of-specification event | Investigation |
| Change control | Process modifications | Quality assurance |
| Stability data | Accelerated and long-term | Shelf-life determination |
| Certificate of Analysis | Final product specifications | Release |

### Equipment Qualification

| Qualification | Purpose |
|--------------|---------|
| IQ (Installation) | Equipment installed correctly |
| OQ (Operational) | Equipment operates within specs |
| PQ (Performance) | Equipment produces product to spec |

## Timeline by Scale

| Scale | Typical Timeline | Key Activities |
|-------|-----------------|----------------|
| Lab optimization | 1–3 months | Sequence optimization, analytical method development |
| Pilot scale | 3–6 months | Process optimization, impurity profiling, stability |
| Clinical material | 6–12 months | GMP production, validation, regulatory filing |
| Manufacturing | 12–24 months | Tech transfer, validation, commercial launch |

## When to Scale Up

| Milestone | Scale | Decision Point |
|-----------|-------|---------------|
| Hit validation | mg | Sequence confirms activity |
| Lead optimization | 10–100 mg | SAR, selectivity, stability confirmed |
| Candidate selection | 0.1–1 g | Preclinical data support advancement |
| IND-enabling | 10–100 g | GLP toxicology, formulation development |
| Phase 1 | 100–500 g | First-in-human, safety, PK |
| Phase 2 | 0.5–5 kg | Efficacy, dose-finding |
| Phase 3 | 5–50 kg | Pivotal trials |
| Commercial | 50–500 kg | Market supply |

## References

1. Merrifield RB. "Solid phase peptide synthesis." *Adv Enzymol* 1969;32:221-296.
2. Rink H. "SPPS scale-up considerations." *Methods Enzymol* 1997;267:3-16.
3. Flanegan JB, et al. "Scale-up of SPPS." *BioProcess Int* 2023;21:34-42.
4. CDER/FDA. "Guidance for Industry: Chemistry, Manufacturing, and Controls Information."
5. ICH Q7. "Good Manufacturing Practice Guide for Active Pharmaceutical Ingredients."
