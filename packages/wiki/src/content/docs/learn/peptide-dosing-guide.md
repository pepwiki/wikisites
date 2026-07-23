---
title: Peptide Dosing Guide
description: Guide to peptide dosing — dose calculation principles, body weight-based dosing, fixed dosing protocols, dose escalation strategies, and therapeutic window c.
---

This guide provides graduate-level coverage of peptide dosing principles, from fundamental pharmacokinetic concepts to practical clinical dosing tables for 20+ peptides.

## Dose Calculation Principles

### Fundamental Pharmacokinetic Relationships

Peptide dosing is governed by the relationship between dose, concentration, and volume of distribution:

$$C_p = \frac{D \times F}{V_d}$$

Where:
- $C_p$ = plasma concentration (ng/mL)
- $D$ = dose (mg or mcg)
- $F$ = bioavailability (fraction)
- $V_d$ = volume of distribution (L)

For peptides, bioavailability varies dramatically by route:
- Intravenous: $F = 1.0$ (100%)
- Subcutaneous: $F = 0.5–1.0$ (50–100%)
- Intramuscular: $F = 0.7–1.0$ (70–100%)
- Intranasal: $F = 0.01–0.15$ (1–15%)
- Oral: $F = 0.001–0.10$ (0.1–10%)

### Clearance and Half-Life

The dosing interval is determined by the elimination half-life ($t_{1/2}$):

$$t_{1/2} = \frac{0.693 \times V_d}{CL}$$

Where:
- $CL$ = clearance (L/hr)
- $V_d$ = volume of distribution (L)

At steady state, the accumulation factor ($R$) for repeated dosing is:

$$R = \frac{1}{1 - e^{-k_e \times \tau}}$$

Where $k_e$ = elimination rate constant and $\tau$ = dosing interval.

### Target Concentration Approach

For peptides with well-defined therapeutic windows, dosing targets a specific plasma concentration range:

$$Dose = \frac{C_{target} \times V_d \times \tau}{F \times t_{1/2} \times 0.693}$$

This equation enables calculation of the dose required to achieve and maintain a target concentration, accounting for the peptide's pharmacokinetic properties and desired dosing interval.

## Body Weight-Based Dosing

Many peptides are dosed on a microgram-per-kilogram (mcg/kg) basis, particularly those with narrow therapeutic windows or when initiated in diverse patient populations.

### Standard Weight-Based Dosing Formula

$$Dose (mcg) = Weight (kg) \times Dose\ per\ kg (mcg/kg)$$

### Example Calculations

**Example 1: CJC-1295 DAC**
- Target dose: 30 mcg/kg SC daily
- Patient weight: 80 kg
- Dose = 80 × 30 = 2,400 mcg = 2.4 mg

**Example 2: Ipamorelin**
- Target dose: 200 mcg SC 2× daily
- Patient weight: 70 kg
- Dose = 200 mcg per injection (fixed dose, not weight-adjusted)

### When to Use Weight-Based vs Fixed Dosing

| Factor | Weight-Based | Fixed Dose |
|--------|-------------|------------|
| Narrow therapeutic index | Preferred | Less appropriate |
| Extreme body weights | Preferred | May be inaccurate |
| Pediatric patients | Required | Not appropriate |
| Elderly patients | Preferred (adjusted) | May be acceptable |
| Wide therapeutic window | Either | Often preferred |
| Convenience | Less convenient | More convenient |

## Fixed Dosing Protocols

Fixed dosing simplifies administration and improves adherence by eliminating dose calculations. Fixed dosing is appropriate when:

1. The therapeutic window is wide
2. Efficacy is not strongly weight-dependent
3. Pharmacokinetic variability exceeds body weight effects
4. Patient convenience is a priority

### Examples of Fixed-Dose Peptides

| Peptide | Fixed Dose | Rationale |
|---------|-----------|-----------|
| Semaglutide | 0.25–2.4 mg weekly | Wide therapeutic window |
| Liraglutide | 0.6–3.0 mg daily | Weight-independent efficacy ceiling |
| BPC-157 | 250–500 mcg 2× daily | Wide safety margin |
| TB-500 | 2.5–5 mg 2× weekly | Dose-response plateau |

## Dose Escalation Strategies

Dose escalation serves two purposes:
1. **Mitigating side effects** (start low, go slow)
2. **Reaching therapeutic targets** (titrate to effect)

### Escalation Schedules

#### Standard Escalation (GLP-1 Receptor Agonists)

| Week | Semaglutide SC | Liraglutide | Tirzepatide |
|------|---------------|-------------|-------------|
| 1–4 | 0.25 mg weekly | 0.6 mg daily | 2.5 mg weekly |
| 5–8 | 0.5 mg weekly | 1.2 mg daily | 5 mg weekly |
| 9–12 | 1.0 mg weekly | 1.8 mg daily | 10 mg weekly |
| 13–16 | 1.7 mg weekly | 2.4 mg daily | 15 mg weekly |
| 17+ | 2.4 mg weekly | 3.0 mg daily | 15 mg weekly |

#### Conservative Escalation (GH Secretagogues)

| Week | CJC-1295 DAC | Ipamorelin |
|------|-------------|------------|
| 1–2 | 15 mcg/kg daily | 100 mcg 1× daily |
| 3–4 | 30 mcg/kg daily | 200 mcg 1× daily |
| 5–6 | 30 mcg/kg daily | 200 mcg 2× daily |
| 7+ | 30–60 mcg/kg daily | 200–300 mcg 2× daily |

#### Aggressive Escalation (When Rapid Titration Needed)

| Week | Peptide | Dose |
|------|---------|------|
| 1 | Starting dose | 50% of target |
| 2 | Target dose | 100% |

### Escalation Decision Points

| Factor | Escalate If | Hold/Reduce If |
|--------|------------|----------------|
| Efficacy | Suboptimal response at current dose | Target achieved |
| Tolerability | Side effects resolved | Intolerable side effects |
| Biomarkers | Target not met (e.g., IGF-1, HbA1c) | Target exceeded |
| Time at dose | ≥4 weeks at current dose | <2 weeks at current dose |

## Therapeutic Window Concepts

### Therapeutic Index

The therapeutic index (TI) determines dosing flexibility:

$$TI = \frac{TD_{50}}{ED_{50}}$$

Where:
- $TD_{50}$ = dose producing toxicity in 50% of patients
- $ED_{50}$ = dose producing efficacy in 50% of patients

| Peptide Class | Typical TI | Dosing Implications |
|---------------|-----------|---------------------|
| Insulins | Narrow (2–5×) | Precise dosing required |
| GLP-1 agonists | Wide (10–20×) | Flexible dosing, escalation tolerated |
| GH secretagogues | Moderate (5–10×) | Monitor IGF-1 |
| Thymic peptides | Wide (>20×) | Dose flexibility acceptable |
| BPC-157 | Very wide (>50×) | Wide dosing range acceptable |

### Therapeutic Drug Monitoring

For peptides with narrow therapeutic windows, therapeutic drug monitoring (TDM) guides dosing:

| Peptide | Therapeutic Range | Monitoring Frequency |
|---------|------------------|---------------------|
| Insulin | Glucose-guided | Daily (self-monitoring) |
| Semaglutide | Weight/HbA1c-guided | Every 4–12 weeks |
| CJC-1295 + Ipamorelin | IGF-1: 150–300 ng/mL | Every 4–8 weeks |
| Thymosin Alpha-1 | CD4/CD8 ratio | Every 4–12 weeks |

## Dose-Response Relationships

### Linear Dose-Response

Some peptides exhibit linear dose-response curves where increasing dose proportionally increases effect:

$$E = E_{max} \times \frac{D}{D + ED_{50}}$$

**Example**: Insulin glucose lowering (within physiological range)

### Emax Dose-Response (Saturation)

Most peptides exhibit saturable dose-response curves:

$$E = E_{max} \times \frac{D^n}{D^n + ED_{50}^n}$$

Where $n$ = Hill coefficient (steepness of curve)

**Example**: Semaglutide weight loss (plateaus at higher doses)

### Practical Implications

| Dose-Response Type | Clinical Implication |
|-------------------|---------------------|
| Linear | Dose increases produce proportional benefit |
| Emax (flat curve) | Dose increases beyond ED50 produce diminishing returns |
| Emax (steep curve) | Small dose changes produce large effect changes |

## Clinical Dosing Tables

### Insulin Analogs

| Insulin | Route | Onset | Peak | Duration | Typical Dose |
|---------|-------|-------|------|----------|-------------|
| Lispro | SC | 5–15 min | 1–2 hrs | 3–5 hrs | Per carb ratio |
| Aspart | SC | 10–20 min | 1–2 hrs | 3–5 hrs | Per carb ratio |
| Glulisine | SC | 10–20 min | 1–2 hrs | 3–5 hrs | Per carb ratio |
| Glargine U-100 | SC | 1–2 hrs | 8–12 hrs | 24 hrs | 10–80 U daily |
| Glargine U-300 | SC | 2–6 hrs | 12–18 hrs | 30–36 hrs | 10–80 U daily |
| Degludec | SC | 1–2 hrs | Flat | >42 hrs | 10–80 U daily |
| Detemir | SC | 1–2 hrs | 3–8 hrs | 16–24 hrs | 10–80 U 1–2× daily |

### GLP-1 Receptor Agonists

| Peptide | Route | Frequency | Starting Dose | Target Dose | Max Dose |
|---------|-------|-----------|---------------|-------------|----------|
| Semaglutide (SC) | SC | Weekly | 0.25 mg | 1.0–2.4 mg | 2.4 mg |
| Semaglutide (oral) | Oral | Daily | 3 mg | 7–14 mg | 14 mg |
| Liraglutide | SC | Daily | 0.6 mg | 1.8–3.0 mg | 3.0 mg |
| Dulaglutide | SC | Weekly | 0.75 mg | 1.5 mg | 4.5 mg |
| Tirzepatide | SC | Weekly | 2.5 mg | 10–15 mg | 15 mg |
| Exenatide ER | SC | Weekly | 2 mg | 2 mg | 2 mg |
| Exenatide IR | SC | Twice daily | 5 mcg | 10 mcg | 10 mcg |

### GH Secretagogues

| Peptide | Route | Frequency | Starting Dose | Target Dose | Max Dose |
|---------|-------|-----------|---------------|-------------|----------|
| CJC-1295 DAC | SC | Daily | 15 mcg/kg | 30 mcg/kg | 60 mcg/kg |
| Ipamorelin | SC | 1–3× daily | 100 mcg | 200 mcg | 300 mcg |
| GHRP-2 | SC | 1–3× daily | 100 mcg | 200 mcg | 300 mcg |
| GHRP-6 | SC | 1–3× daily | 100 mcg | 200 mcg | 300 mcg |
| Sermorelin | SC | Daily (bedtime) | 100 mcg | 300 mcg | 500 mcg |
| Tesamorelin | SC | Daily | 0.5 mg | 2 mg | 2 mg |
| MK-677 | Oral | Daily | 10 mg | 25 mg | 50 mg |

### Tissue Repair Peptides

| Peptide | Route | Frequency | Typical Dose | Duration |
|---------|-------|-----------|--------------|----------|
| BPC-157 | SC/IM/Oral | 1–2× daily | 250–500 mcg | 2–12 weeks |
| TB-500 | SC/IM | 2× weekly | 2.5–5 mg | 4–8 weeks |
| GHK-Cu | SC/Topical | 1–2× daily | 1–5 mg | 4–12 weeks |
| Thymosin Beta-4 | SC/IM | Daily | 2.5–5 mg | 4–8 weeks |

### Thymic Peptides

| Peptide | Route | Frequency | Typical Dose | Duration |
|---------|-------|-----------|--------------|----------|
| Thymosin Alpha-1 | SC/IM | 1–2× daily | 1.6 mg | 1–6 months |
| Thymulin | SC/IM | 1–2× daily | 50–100 mcg | 1–3 months |

### Metabolic Peptides

| Peptide | Route | Frequency | Starting Dose | Target Dose |
|---------|-------|-----------|---------------|-------------|
| Tesamorelin | SC | Daily | 0.5 mg | 2 mg |
| AOD-9604 | SC | Daily | 250 mcg | 500 mcg |
| 5-Amino-1MQ | Oral | Twice daily | 50 mg | 100 mg |

### Sexual Health Peptides

| Peptide | Route | Frequency | Typical Dose | Timing |
|---------|-------|-----------|--------------|--------|
| PT-141 (Bremelanotide) | SC/IN | As needed | 1.75 mg SC / 7.5 mg IN | 45 min before |
| Oxytocin | IN | As needed | 24–40 IU | 15–30 min before |

### Melanocortin Peptides

| Peptide | Route | Frequency | Loading Dose | Maintenance |
|---------|-------|-----------|-------------|-------------|
| Melanotan I | SC | Daily → 2–3×/wk | 0.5–1 mg daily × 10–14 days | 0.5–1 mg 2–3× weekly |
| Melanotan II | SC | Daily → 2–3×/wk | 0.5–1 mg daily × 10–14 days | 0.5–1 mg 2–3× weekly |
| Afamelanotide | Implant | Every 2 months | 16 mg | 16 mg q2 months |

## Conversion Between Mass, Volume, and Units

### Mass-to-Volume Conversion

For reconstitution, the relationship between mass, concentration, and volume is:

$$Volume (mL) = \frac{Mass (mg)}{Concentration (mg/mL)}$$

### Common Reconstitution Examples

| Vial Size | BAC Volume | Concentration | 100 mcg | 250 mcg | 500 mcg |
|-----------|-----------|---------------|---------|---------|---------|
| 1 mg | 1 mL | 1 mg/mL | 0.1 mL | 0.25 mL | 0.5 mL |
| 2 mg | 1 mL | 2 mg/mL | 0.05 mL | 0.125 mL | 0.25 mL |
| 5 mg | 2 mL | 2.5 mg/mL | 0.04 mL | 0.1 mL | 0.2 mL |
| 10 mg | 2 mL | 5 mg/mL | 0.02 mL | 0.05 mL | 0.1 mL |
| 50 mg | 2 mL | 25 mg/mL | — | — | 0.02 mL |

### Unit Conversion Reference

| Conversion | Formula | Example |
|------------|---------|---------|
| mg to mcg | × 1,000 | 0.5 mg = 500 mcg |
| mcg to mg | ÷ 1,000 | 250 mcg = 0.25 mg |
| mL to uL | × 1,000 | 0.5 mL = 500 uL |
| IU to mg | Peptide-specific | 100 IU insulin = 3.47 mg |

### Insulin Unit Conversion

Insulin units are defined by biological activity, not mass. Conversion factors:

| Insulin | Units per mg |
|---------|-------------|
| Regular (human) | 26 U/mg |
| Lispro | 26 U/mg |
| Aspart | 26 U/mg |
| Glargine | 26 U/mg |
| Degludec | 26 U/mg |
| Detemir | 26 U/mg |

Therefore: 100 units ≈ 3.47 mg for all standard insulin formulations.

## Special Populations

### Renal Impairment

| GFR (mL/min) | Dose Adjustment |
|--------------|----------------|
| >50 | No adjustment |
| 30–50 | Reduce dose by 25–50% |
| <30 | Reduce dose by 50–75% |
| Dialysis | Avoid or use with caution |

### Hepatic Impairment

| Severity | Dose Adjustment |
|----------|----------------|
| Mild | No adjustment |
| Moderate | Reduce dose by 25% |
| Severe | Reduce dose by 50% or avoid |

### Elderly (≥65 years)

| Factor | Adjustment |
|--------|-----------|
| Renal function | Check CrCl, adjust accordingly |
| Body composition | May need lower doses (less lean mass) |
| Sensitivity | Often increased sensitivity |
| Starting dose | Reduce by 25–50% |

### Pediatric

| Age | Considerations |
|-----|---------------|
| Neonates | Weight-based dosing required |
| Children | Weight-based; adjust for development |
| Adolescents | Adult dosing may be appropriate |

## Key Principles Summary

1. **Start low, go slow** — Begin at 50% of target dose and escalate over 2–4 weeks
2. **Monitor biomarkers** — IGF-1 for GH secretagogues, glucose for insulins, HbA1c for GLP-1 agonists
3. **Account for bioavailability** — Route-dependent F values dramatically affect effective dose
4. **Consider accumulation** — Long half-life peptides require 4–5 half-lives to reach steady state
5. **Adjust for organ function** — Renal and hepatic impairment require dose reduction
6. **Individualize** — Population averages are starting points; individual response varies

Dosing supplies available from [Kingston Peptides](https://kingstonpeptides.com)
