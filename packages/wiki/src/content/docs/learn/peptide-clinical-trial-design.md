---
title: Peptide Clinical Trial Design
description: Comprehensive guide to clinical trial design for peptide drugs — study phases, endpoints, statistical considerations, and regulatory strategy.
---

Clinical trial design for peptide drugs requires consideration of pharmacokinetic properties (short half-life, rapid absorption), route of administration (SC, IV, IM, nasal), immunogenicity risk, and patient populations. Peptides occupy a unique position between small molecules and biologics, with specific trial design requirements.

## Trial Design Framework

### ICH E6(R2) Good Clinical Practice

| Principle | Application to Peptides |
|-----------|------------------------|
| Scientific soundness | PK/PD-guided design |
| Ethical conduct | Informed consent, risk minimization |
| Data integrity | Electronic data capture, audit trails |
| Patient safety | DSMB, stopping rules |

### Phases

| Phase | Objective | Typical n | Duration |
|-------|-----------|-----------|----------|
| Phase I | Safety, tolerability, PK | 20–100 | 6–12 months |
| Phase II | Dose-finding, efficacy signals | 100–500 | 6–18 months |
| Phase III | Pivotal efficacy, safety | 500–5000 | 1–3 years |
| Phase IV | Post-marketing, real-world | 1000+ | Ongoing |

## Phase I Design

### Single Ascending Dose (SAD)

| Element | Design |
|---------|--------|
| Population | Healthy volunteers or patients |
| Design | Open-label, dose-escalation |
| Dose levels | 3–6 (3 patients/level minimum) |
| Escalation | 3+3 or Bayesian optimal interval |
| Primary endpoint | Safety, tolerability |
| Secondary endpoint | PK parameters |

### Multiple Ascending Dose (MAD)

| Element | Design |
|---------|--------|
| Population | Healthy volunteers or patients |
| Design | Open-label or randomized, dose-escalation |
| Dose levels | 3–5 |
| Duration | 2–4 weeks per dose level |
| Primary endpoint | Safety, tolerability, PK steady-state |
| Secondary endpoint | PD biomarkers |

### Food Effect Study

| Element | Design |
|---------|--------|
| Population | Healthy volunteers |
| Design | Randomized, crossover |
| Arms | Fasted vs fed (high-fat meal) |
| Primary endpoint | AUC, Cmax comparison |
| Statistical | Bioequivalence (80–125% CI) |

### Drug-Drug Interaction Study

| Element | Design |
|---------|--------|
| Population | Healthy volunteers |
| Design | Crossover or parallel |
| Arms | Peptide alone, peptide + interacting drug, interacting drug alone |
| Primary endpoint | AUC, Cmax comparison |
| Statistical | Bioequivalence (80–125% CI) |

## Phase II Design

### Dose-Ranging Study

| Element | Design |
|---------|--------|
| Population | Target patient population |
| Design | Randomized, double-blind, placebo-controlled |
| Dose levels | 3–4 doses + placebo |
| Primary endpoint | Efficacy (dose-response) |
| Secondary endpoint | Safety, PK/PD |
| Statistical | Emax modeling, MCP-Mod |
| Duration | 12–26 weeks |

### Biomarker-Guided Design

| Biomarker | Application | Measurement |
|-----------|------------|-------------|
| HbA1c | Glycemic control | Blood draw |
| Body weight | Obesity | Scale |
| IGF-1 | GH action | Blood draw |
| Glucose (CGM) | Glycemic variability | Continuous |
| LDL cholesterol | Lipid response | Blood draw |
| UACR | Nephropathy | Urine |

## Phase III Design

### Pivotal Trial Design

| Element | Design |
|---------|--------|
| Population | Target patient population (well-defined) |
| Design | Randomized, double-blind, active-controlled or placebo-controlled |
| Arms | Treatment, comparator, placebo (if ethical) |
| Primary endpoint | Clinically meaningful endpoint |
| Secondary endpoints | Multiple (pre-specified) |
| Statistical | Superiority or non-inferiority |
| Power | ≥90% (typically) |
| Alpha | 0.05 (two-sided) |
| Duration | 26–52 weeks (minimum) |

### Non-Inferiority Design

| Parameter | Specification |
|-----------|--------------|
| Non-inferiority margin | Pre-specified (clinically justified) |
| Per-protocol population | Primary analysis population |
| ITT population | Supportive analysis |
| Assay sensitivity | Must be demonstrated |
| Preservation of benefit | Must be shown |

### Superiority Design

| Parameter | Specification |
|-----------|--------------|
| Effect size | Clinically meaningful difference |
| Power | ≥90% |
| Alpha | 0.05 (two-sided) |
| Multiplicity | Pre-specified adjustment (if multiple endpoints) |

## Endpoint Selection

### Efficacy Endpoints

| Indication | Primary Endpoint | Secondary Endpoints |
|-----------|-----------------|-------------------|
| Type 2 diabetes | HbA1c change | FPG, PPG, time in range |
| Obesity | % body weight change | Waist circumference, metabolic parameters |
| Acromegaly | IGF-1 normalization | GH levels, tumor size |
| EPP | Time to first pain after light exposure | Pain severity, quality of life |
| Heart failure | MACE, hospitalization | Quality of life, biomarkers |
| FSD | SFI change | Desire, arousal, satisfaction |

### Safety Endpoints

| Category | Endpoint |
|----------|---------|
| Adverse events | Frequency, severity, causality |
| Laboratory safety | Chemistry, hematology, urinalysis |
| Vital signs | BP, HR, temperature |
| ECG | QTc prolongation, arrhythmia |
| Injection site | Reactions, nodules |
| Immunogenicity | ADA, NAb |
| Hypoglycemia | Documented episodes |

## Statistical Considerations

### Sample Size Calculation

| Factor | Consideration |
|--------|-------------|
| Effect size | Clinically meaningful difference |
| Variability | Intra-subject CV (10–30% for peptides) |
| Power | ≥90% (typically) |
| Alpha | 0.05 (two-sided) |
| Dropout rate | 15–25% (obesity trials higher) |
| Multiplicity | Adjustment for multiple comparisons |

### Analysis Populations

| Population | Definition | Primary Use |
|-----------|-----------|------------|
| ITT | All randomized patients | Primary analysis |
| mITT | All randomized, ≥1 dose, ≥1 post-baseline | Supportive |
| Per-protocol | ITT without major protocol violations | Sensitivity |
| Safety | All who received ≥1 dose | Safety |

### Missing Data Handling

| Method | Application |
|--------|------------|
| LOCF | Not recommended (bias) |
| MMRM | Recommended for longitudinal data |
| Multiple imputation | Sensitivity analysis |
| Pattern-mixture models | Sensitivity analysis |
| Tipping point analysis | Sensitivity analysis |

## Patient Population

### Inclusion Criteria (Typical)

| Criterion | Type 2 Diabetes | Obesity | Acromegaly |
|-----------|----------------|---------|------------|
| Age | 18–75 years | 18–75 years | 18–75 years |
| HbA1c | 7.0–10.5% | N/A | N/A |
| BMI | N/A | ≥30 or ≥27 + comorbidity | N/A |
| IGF-1 | N/A | N/A | >ULN |
| Prior therapy | Metformin (≥3 months) | Lifestyle intervention | Surgery/radiation failed |

### Exclusion Criteria (Typical)

| Criterion | Rationale |
|-----------|-----------|
| Type 1 diabetes | Wrong population |
| eGFR <30 | Safety |
| Pancreatitis history | Safety |
| MTC/MEN 2 (GLP-1 RAs) | Contraindication |
| Pregnancy/lactation | Safety |
| Active malignancy | Safety |
| Severe GI disease | PK/absorption concerns |
| Smoking (inhaled peptides) | Contraindication |

## Immunogenicity Assessment

### Assay Strategy

| Assay | Purpose | Sensitivity |
|-------|---------|-------------|
| Screening ELISA | Detect ADA | ≥5 ng/mL |
| Confirmatory ELISA | Confirm specificity | ≥10 ng/mL |
| Titer assay | Quantify ADA | Dilution series |
| Neutralizing antibody | Functional impact | Cell-based assay |

### Immunogenicity Risk Factors

| Factor | Risk Level | Mitigation |
|--------|-----------|-----------|
| Peptide size | Larger = higher | Sequence optimization |
| Non-human sequence | Higher | Humanization |
| Aggregation | Higher | Formulation optimization |
| Route (SC > IV) | SC higher | Consider IV if needed |
| Dosing frequency | More frequent = higher | Long-acting formulation |
| Impurities | Higher | Purity optimization |

## Special Populations

### Renal Impairment

| eGFR | Study Design |
|------|-------------|
| 60–89 | No adjustment needed |
| 30–59 | Dedicated renal impairment study |
| <30 | Dedicated severe renal impairment study |
| Dialysis | Dedicated end-stage study |

### Hepatic Impairment

| Child-Pugh | Study Design |
|-----------|-------------|
| A (5–6) | No adjustment needed |
| B (7–9) | Dedicated hepatic impairment study |
| C (10–15) | Dedicated severe hepatic impairment study |

### Pediatric

| Age Group | Study Design |
|-----------|-------------|
| Neonates | Only if justified by disease |
| Infants (1–23 months) | PK, safety |
| Children (2–11 years) | PK, efficacy (if applicable) |
| Adolescents (12–17 years) | Full efficacy trial |

### Geriatric

| Consideration | Recommendation |
|--------------|----------------|
| Age range | ≥65 years subgroup |
| Dose adjustment | Based on PK analysis |
| Safety monitoring | Enhanced monitoring |
| Polypharmacy | Drug interaction assessment |

## Regulatory Strategy

### Pre-IND Meeting

| Topic | Discussion |
|-------|-----------|
| Nonclinical package | Completeness, adequacy |
| Clinical development plan | Design, endpoints |
| CMC requirements | Specifications |
| Special populations | Pediatric, renal |

### End-of-Phase II Meeting

| Topic | Discussion |
|-------|-----------|
| Phase III design | Pivotal trial strategy |
| Endpoints | Primary, secondary |
| Statistical analysis plan | Analysis details |
| Regulatory pathway | NDA vs BLA |

### Pre-NDA/BLA Meeting

| Topic | Discussion |
|-------|-----------|
| Clinical data package | Adequacy |
| CMC completeness | Gap assessment |
| Labeling | Draft labeling |
| Post-marketing requirements | Commitments |

## Data Management

### EDC System Requirements

| Requirement | Standard |
|------------|---------|
| 21 CFR Part 11 compliance | Audit trails, electronic signatures |
| CDISC standards | SDTM, ADaM |
| Database lock | Pre-specified criteria |
| Data quality | Edit checks, queries |

### CDISC Standards

| Standard | Application |
|----------|------------|
| SDTM | Study data tabulation |
| ADaM | Analysis data |
| SEND | Nonclinical data (if applicable) |
| Define-XML | Variable definitions |

## References

- [Clinical Trials](/learn/clinical-trials/)
- [Peptide Clinical Dosing](/reference/peptide-clinical-dosing/)
- [Peptide Pharmacokinetics](/learn/peptide-pharmacokinetics/)
- [Peptide Toxicology](/learn/peptide-toxicology/)
- [Peptide Bioanalysis](/learn/peptide-bioanalysis/)
