---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Pharmacokinetics Modeling — PopPK and TMDD"
description: "Peptide PK modeling: population pharmacokinetics, target-mediated drug disposition, and simulation approaches."
---

Peptide pharmacokinetics (PK) exhibit unique characteristics: target-mediated drug disposition (TMDD), nonlinear clearance, and immunogenicity effects. This guide covers modeling approaches from empirical PK to physiologically-based models.

## 1. Peptide PK Characteristics

### Fundamental Properties

| Parameter | Typical Range | Factors |
|-----------|---------------|---------|
| Half-life | 2–30 min (native), 4–24 hr (modified) | Enzymatic degradation, renal clearance |
| Bioavailability | 50–90% (SC), 100% (IV) | Injection site, formulation |
| Volume of distribution | 3–15 L | Tissue binding, hydrophilicity |
| Clearance | 5–20 mL/min/kg | Renal, hepatic, enzymatic |

### Nonlinear PK Mechanisms

1. **TMDD**: Receptor binding saturates at high doses
2. **Enzymatic degradation**: Saturation of proteases
3. **Renal reabsorption**: Carrier-mediated transport
4. **Immunogenicity**: ADA formation alters PK

## 2. Compartmental Models

### One-Compartment Model

$$\frac{dA}{dt} = -CL \cdot \frac{A}{V}$$

- A = amount in body
- CL = clearance
- V = volume of distribution
- Solution: $C(t) = \frac{Dose}{V} \cdot e^{-k \cdot t}$, where $k = CL/V$

### Two-Compartment Model

$$\frac{dA_1}{dt} = -k_{12} \cdot A_1 + k_{21} \cdot A_2 - k_{10} \cdot A_1$$

$$\frac{dA_2}{dt} = k_{12} \cdot A_1 - k_{21} \cdot A_2$$

- A₁ = central compartment (blood, rapidly equilibrating tissues)
- A₂ = peripheral compartment (slowly equilibrating tissues)

### Three-Compartment Model

For peptides with significant tissue distribution:
- Central compartment
- Rapidly equilibrating peripheral (muscle, organs)
- Slowly equilibrating peripheral (fat, bone)

## 3. Noncompartmental Analysis (NCA)

### Key Parameters

| Parameter | Formula | Units |
|-----------|---------|-------|
| AUC₀₋∞ | Trapezoidal + extrapolation | ng·h/mL |
| C_max | Observed maximum | ng/mL |
| T_max | Time of C_max | h |
| t₁/₂ | ln(2)/λ_z | h |
| CL/F | Dose/AUC | mL/min/kg |
| Vd_ss | Dose·AUMC/AUC² | mL/kg |
| MRT | AUMC/AUC | h |

### NCA Software

- **WinNonlin** (Certara): Industry standard
- **Phoenix**: WinNonlin successor
- **PKNCA** (R): Open-source alternative

## 4. Population PK (PopPK)

### PopPK Framework

**Advantages**:
- Handles sparse sampling
- Quantifies inter-individual variability (IIV)
- Identifies covariates
- Supports dose optimization

### Structural Models

**Base model**: Two-compartment with first-order absorption

$$\frac{dA_{SC}}{dt} = -k_a \cdot A_{SC}$$

$$\frac{dA_C}{dt} = k_a \cdot A_{SC} - \frac{CL}{V_C} \cdot A_C - \frac{CL_d}{V_C} \cdot A_C + \frac{CL_d}{V_P} \cdot A_P$$

$$\frac{dA_P}{dt} = \frac{CL_d}{V_C} \cdot A_C - \frac{CL_d}{V_P} \cdot A_P$$

### Covariate Model

$$CL_i = \theta_{CL} \cdot \left(\frac{WT_i}{70}\right)^{\theta_{WT}} \cdot e^{\eta_{CL,i}}$$

Where:
- θ = fixed effect parameter
- WT = body weight
- η = random effect (IIV)

### Covariate Selection

| Covariate | Effect on PK | Clinical Relevance |
|-----------|--------------|-------------------|
| Body weight | ↑ CL, ↑ Vd | Dose adjustment |
| Renal function (eGFR) | ↑ CL if renal elimination | Dose adjustment |
| Age | Variable | Pediatric/geriatric |
| Sex | Minimal for most peptides | Usually no adjustment |
| ADA status | ↑ CL, ↓ efficacy | Monitoring |

### Software

- **NONMEM**: Gold standard for PopPK
- **Monolix**: Alternative, SAEM algorithm
- **nlmixr2**: R-based, free
- **PsN**: Perl-speaks-NONMEM

## 5. Target-Mediated Drug Disposition (TMDD)

### TMDD Concept

For peptides with high-affinity receptor binding:
- At low doses, most drug is bound to target → TMDD kinetics
- At high doses, target is saturated → linear PK

### Full TMDD Model

$$\frac{dC}{dt} = -k_{el} \cdot C - k_{on} \cdot C \cdot R + k_{off} \cdot RC$$

$$\frac{dR}{dt} = k_{syn} - k_{deg} \cdot R - k_{on} \cdot C \cdot R + k_{off} \cdot RC$$

$$\frac{dRC}{dt} = k_{on} \cdot C \cdot R - k_{off} \cdot RC - k_{int} \cdot RC$$

- C = free drug concentration
- R = free receptor concentration
- RC = drug-receptor complex
- k_on, k_off = binding kinetics
- k_int = internalization rate

### Quasi-Steady State (QSS) Approximation

When k_off >> k_on·C + k_int:

$$RC = \frac{R_{tot} \cdot C}{K_D + C}$$

Where $K_D = k_{off}/k_{on}$

### Michaelis-Menten Approximation

When receptor recycling is fast:

$$v = \frac{V_{max} \cdot C}{K_m + C}$$

Where $V_{max} = k_{syn} \cdot k_{int}/k_{deg}$ and $K_m = K_D$

## 6. Physiologically-Based PK (PBPK)

### PBPK Framework

**Advantages**:
- Predicts tissue concentrations
- Supports allometric scaling
- Handles drug interactions
- Supports special populations

### Compartment Structure

| Compartment | Volume | Blood Flow | Peptide Considerations |
|-------------|--------|------------|----------------------|
| Gut lumen | Variable | — | Oral absorption |
| Liver | 1.5 L | 1.5 L/min | Metabolism, extraction |
| Kidney | 0.3 L | 1.2 L/min | Filtration, reabsorption |
| Muscle | 30 L | 0.7 L/min | Peripheral distribution |
| Fat | 15 L | 0.3 L/min | Lipophilic peptides |
| Brain | 1.4 L | 0.55 L/min | BBB transport |

### PBPK Software

- **Simcyp**: Industry standard
- **PK-Sim**: Open-source
- **GastroPlus**: Oral absorption focus

## 7. Immunogenicity Effects on PK

### ADA Impact

| ADA Effect | Mechanism | PK Consequence |
|------------|-----------|----------------|
| Neutralization | Blocks target binding | ↓ efficacy, ↓ PD effect |
| Clearance enhancement | ADA-drug complex formation | ↑ CL, ↓ t₁/₂ |
| Altered distribution | Tissue deposition | ↑ Vd |
| Anaphylaxis | Immune complex formation | Safety concern |

### Modeling Approach

**Time-varying ADA model**:
- ADA formation follows immune response kinetics
- ADA binds drug, forming immune complexes
- Complexes cleared faster than free drug
- Effect on PK increases with ADA titer

## 8. Simulation Approaches

### Clinical Trial Simulation (CTS)

**Steps**:
1. Define trial design (population, doses, sampling)
2. Simulate PK using PopPK model
3. Apply PD model for efficacy
4. Add variability and error
5. Analyze simulated data as planned
6. Evaluate operating characteristics

### Sample Size Re-Estimation

- Use interim data to refine variance estimates
- Re-estimate sample size for target power
- Control Type I error

## 9. Model Validation

### Internal Validation

| Method | Purpose |
|--------|---------|
| Bootstrap | Parameter uncertainty |
| Visual predictive check (VPC) | Model fit |
| Simulation-based calibration | Model performance |

### External Validation

| Method | Purpose |
|--------|---------|
| External dataset | Model transportability |
| Prospective validation | Prediction accuracy |
| Cross-validation | Model robustness |

### Goodness-of-Fit Criteria

| Criterion | Acceptable |
|-----------|-----------|
| Objective function value (OFV) | Lower is better |
| AIC, BIC | Lower is better |
| Parameter precision (RSE) | <30% |
| Correlation of random effects | <0.7 |

## 10. Case Study: Semaglutide PopPK

### Model Structure

- Two-compartment base model
- TMDD via QSS approximation
- SC absorption with lag time
- Allometric scaling on CL, V

### Key Parameters

| Parameter | Value | Units |
|-----------|-------|-------|
| CL | 0.05 | L/h |
| Vd | 12 | L |
| k_a | 0.1 | h⁻¹ |
| t₁/₂ | 165 | h |
| K_D | 0.1 | nM |

### Covariates

- Body weight: CL ↑, V ↑
- eGFR: No significant effect
- ADA: ↑ CL by 30–50%

## References

1. Gibaldi, M., Perrier, D. *Pharmacokinetics*. 2nd ed. Marcel Dekker, 1982.
2. Mould, D.R., Upton, R.N. "Basic concepts in population modeling, simulation, and model-based drug development." *CPT: Pharmacometrics & Systems Pharmacology* 1 (2012): 1–13.
3. Dua, P., et al. "Target-mediated drug disposition model for peptides." *Journal of Pharmacokinetics and Pharmacodynamics* 42 (2015): 447–462.
4. Rowland, M., Tozer, T.N. *Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications*. 4th ed. Lippincott Williams & Wilkins, 2011.

## Further Reading

- [Peptide Pharmacokinetics](/learn/peptide-pharmacokinetics/) — PK overview
- [Peptide Bioanalysis](/learn/peptide-bioanalysis/) — Bioanalytical methods
- [Clinical Trial Design](/learn/peptide-clinical-trial-design/) — Trial design
- [Pharmacology](/learn/pharmacology/) — PK/PD concepts
