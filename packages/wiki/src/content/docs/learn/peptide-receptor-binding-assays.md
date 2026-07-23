---
date: 2026-07-22
author: "Wikipept Contributors"
title: Peptide Receptor Binding Assays
description: Receptor binding assay methods for therapeutic peptides — radioligand binding, competition assays, SPR, and selectivity profiling.
---

Receptor binding assays characterize the interaction between peptides and their target receptors, providing essential data for drug discovery and development. This protocol covers binding assay methodologies, data analysis, and regulatory requirements for therapeutic peptide characterization.

## Binding Assay Types

### Assay Classification

| Type | Method | Throughput | Information | Application |
|------|--------|-----------|-------------|-------------|
| Radioligand binding | [³H] or [¹²⁵I] displacement | Moderate | Kd, Ki, Bmax | Primary characterization |
| Competition binding | Cold ligand displacement | High | IC₅₀, Ki | Screening |
| Kinetic binding (SPR) | Surface plasmon resonance | Moderate | kon, koff, KD | Mechanistic studies |
| Fluorescence polarization | FP competition | High | IC₅₀, Ki | High-throughput screening |
| Cell-based binding | Intact cell binding | Low-moderate | Functional affinity | Physiological relevance |
| Scatchard analysis | Linear transformation | Low | Kd, Bmax | Historical method |

## Radioligand Binding Protocol

### Materials Required

| Material | Specification | Purpose |
|----------|--------------|---------|
| Radioligand | [¹²⁵I]-labeled peptide | Tracer |
| Receptor preparation | Membrane homogenate or intact cells | Target |
| Binding buffer | PBS + 0.1% BSA, pH 7.4 | Incubation medium |
| Non-specific binding control | Excess cold ligand (100× Kd) | Define NSB |
| Separation method | Filtration or centrifugation | Bound/free separation |
| Scintillation fluid | For [³H] or Gamma counter for [¹²⁵I] | Detection |

### Saturation Binding Protocol

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Prepare receptor suspension | 10–50 μg protein/mL | On ice |
| 2 | Prepare radioligand concentrations | 0.1–10× Kd (8–12 concentrations) | — |
| 3 | Add radioligand to receptor | 100 μL each | — |
| 4 | Incubate | 25°C or 37°C | 1–2 hours |
| 5 | Separate bound/free | Filtration (GF/C filters) | — |
| 6 | Wash filters | 3× 3 mL cold buffer | — |
| 7 | Count radioactivity | Scintillation/gamma counter | — |
| 8 | Calculate parameters | Non-linear regression | — |

### Competition Binding Protocol

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Prepare receptor suspension | 10–50 μg protein/mL | On ice |
| 2 | Add radioligand | Fixed concentration (Kd) | — |
| 3 | Add cold ligand | 10–12 concentrations (log dilution) | — |
| 4 | Incubate | 25°C or 37°C | 1–2 hours |
| 5 | Separate bound/free | Filtration or centrifugation | — |
| 6 | Count radioactivity | Scintillation/gamma counter | — |
| 7 | Calculate IC₅₀, Ki | Non-linear regression | — |

### Data Analysis

#### Saturation Binding Analysis

| Parameter | Formula | Description |
|-----------|---------|-------------|
| Kd | Concentration at 50% Bmax | Equilibrium dissociation constant |
| Bmax | Maximum specific binding | Receptor density |
| NSB | Non-specific binding (at high cold ligand) | Background binding |
| Specific binding | Total binding - NSB | Receptor-mediated binding |

#### Scatchard Transformation

```
Bound/Free = (Bmax - Bound) / Kd
```

Plot: Bound/Free vs. Bound → Linear slope = -1/Kd, y-intercept = Bmax/Kd

#### Competition Binding Analysis

| Parameter | Formula | Description |
|-----------|---------|-------------|
| IC₅₀ | Concentration at 50% inhibition | Inhibitory concentration |
| Ki | IC₅₀ / (1 + [Radioligand]/Kd) | Cheng-Prusoff equation |
| Hill coefficient | Hill slope | Cooperativity indicator |

## Surface Plasmon Resonance (SPR) Protocol

### SPR Setup

| Parameter | Setting | Notes |
|-----------|---------|-------|
| Instrument | Biacore T200, Octet, etc. | Label-free detection |
| Chip | CM5, SA, or NTA | Based on immobilization strategy |
| Immobilization | Amine coupling, His-tag, Biotin | Target receptor |
| Flow rate | 10–30 μL/min | Minimize mass transport |
| Temperature | 25°C or 37°C | Physiological conditions |

### SPR Kinetic Binding Protocol

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Condition chip | 3× 10 mM glycine pH 2.0 | — |
| 2 | Immobilize receptor | Amine coupling (10–50 RU) | 10–20 min |
| 3 | Block excess | 1 M ethanolamine | 7 min |
| 4 | Establish baseline | Running buffer | 5 min |
| 5 | Inject analyte (peptide) | 5–6 concentrations (2-fold dilution) | 3 min association |
| 6 | Dissociation phase | Running buffer | 10–30 min |
| 7 | Regenerate | 10 mM glycine pH 2.0 | 30 sec |
| 8 | Repeat for each concentration | — | — |

### SPR Data Analysis

| Parameter | Description | Calculation |
|-----------|-------------|-------------|
| kon | Association rate constant | kobs vs. concentration plot |
| koff | Dissociation rate constant | Mono-exponential fit |
| KD | Equilibrium dissociation constant | koff/kon |
| Response (RU) | Binding level | Sensorgram height |

## Fluorescence Polarization (FP) Protocol

### FP Assay Setup

| Parameter | Setting | Notes |
|-----------|---------|-------|
| Instrument | Plate reader with FP | 485 nm excitation, 528 nm emission |
| Fluorophore | Fluorescein, BODIPY | On peptide ligand |
| Peptide concentration | 0.5–5 nM (tracer) | Below Kd |
| Receptor concentration | 0.1–10× Kd | Optimize for Z-factor |
| Buffer | PBS + 0.01% Tween-20 | Reduce non-specific binding |

### FP Competition Protocol

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Prepare tracer | Fluorescein-peptide (0.5–5 nM) | — |
| 2 | Prepare receptor | Membrane suspension (1–10 μg/mL) | — |
| 3 | Prepare competitor | 10–12 concentrations (log dilution) | — |
| 4 | Mix tracer + receptor + competitor | 50 μL total volume | — |
| 5 | Incubate | 25°C or 37°C | 1–2 hours |
| 6 | Read FP | 485/528 nm | — |
| 7 | Calculate IC₅₀ | Non-linear regression | — |

### FP Data Analysis

| Parameter | Formula | Description |
|-----------|---------|-------------|
| mP | Millipolarization units | (S - G×P)/(S + G×P) × 1000 |
| Z-factor | Assay quality | 1 - 3(σp + σf)/(μp - μf) |
| IC₅₀ | Inhibition midpoint | Non-linear fit |

## Cell-Based Binding Assay Protocol

### Intact Cell Binding Protocol

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Culture cells expressing receptor | Confluent monolayer | 24–48 hours |
| 2 | Wash cells | PBS + 0.1% BSA | 3× |
| 3 | Add radioligand | [¹²⁵I]-peptide (Kd) | — |
| 4 | Add competitor (cold ligand) | 10–12 concentrations | — |
| 5 | Incubate | 4°C (prevent internalization) | 2–4 hours |
| 6 | Wash cells | Cold PBS | 3× |
| 7 | Lyse cells | 0.1M NaOH | 10 min |
| 8 | Count radioactivity | Gamma counter | — |

### Internalization Assay

| Step | Action | Conditions | Duration |
|------|--------|------------|----------|
| 1 | Culture cells | Confluent monolayer | 24–48 hours |
| 2 | Add radioligand | [¹²⁵I]-peptide (Kd) | — |
| 3 | Incubate at 37°C | Allow internalization | 0–60 min |
| 4 | Wash with acid (pH 2.0) | Remove surface-bound ligand | 5 min |
| 5 | Lyse cells | 0.1M NaOH | 10 min |
| 6 | Count radioactivity | Gamma counter | — |
| 7 | Calculate internalized fraction | Acid-resistant / total binding | — |

## Selectivity Profiling

### Selectivity Panel

| Receptor | Purpose | Concentration Range |
|----------|---------|-------------------|
| Target receptor | Primary characterization | 0.1–1000 nM |
| Closely related receptors | Selectivity assessment | 0.1–1000 nM |
| Off-target receptors | Safety screening | 1–1000 nM |
| Kinase panel | Specificity screening | 1–1000 nM |

### Selectivity Ratio Calculation

```
Selectivity ratio = Ki (off-target) / Ki (target)
```

| Ratio | Interpretation | Example |
|-------|---------------|---------|
| >100 | Highly selective | Excellent |
| 10–100 | Selective | Good |
| 1–10 | Moderately selective | Acceptable |
| <1 | Non-selective | Poor |

## Data Analysis Software

| Software | Application | Platform |
|----------|-------------|----------|
| Prism | Binding curve fitting | Desktop |
| Scrubber | SPR data analysis | Desktop |
| Biacore T200 Evaluation | SPR kinetics | Instrument |
| ActivityBase | High-throughput screening | Enterprise |
| GraphPad | Statistical analysis | Desktop |

## Regulatory Requirements

### FDA Guidance

| Requirement | Description | Documentation |
|-------------|-------------|---------------|
| Binding characterization | Kd, Ki, selectivity | Binding report |
| Functional correlation | Binding vs. activity | Correlation data |
| Reference standard | Comparator binding | Comparative data |
| Validation | Method validation | Validation report |

### ICH Guidelines

| Guideline | Application | Requirements |
|-----------|-------------|-------------|
| ICH Q6B | Specifications | Binding characterization |
| ICH Q2(R1) | Validation | Method validation |
| ICH S6(R1) | Biotechnology | Safety pharmacology |

## Troubleshooting

| Problem | Possible Cause | Solution |
|---------|---------------|----------|
| High NSB | Non-specific binding | Increase BSA, use correct filter |
| Low signal | Insufficient receptor | Increase receptor concentration |
| Variable results | Receptor degradation | Use fresh membranes |
| Poor curve fit | Narrow concentration range | Extend concentration range |
| High background | Incomplete washing | Increase wash steps |
| Low Z-factor | High variability | Optimize assay conditions |

Binding assay kits available from [Kingston Peptides](https://kingstonpeptides.com)

## References

1. Bylund DB, Yamamura HI. "Methods for receptor binding." In *Methods in Neurosciences*, Vol. 2, 1990.
2. Hulme EC, Birdsall NJM. "Strategy and tactics in receptor-binding studies." In *Receptor-Ligand Interactions*, 1992.
3. Rich RL, Myszka DG. "Advances in surface plasmon resonance biosensor analysis." *Curr Opin Biotechnol* 2000;11:54-61.
4. Fang Y, et al. "Label-free receptor binding assays." *Anal Biochem* 2015;485:1-12.
5. Rojo N, et al. "Receptor binding assays for therapeutic peptides: methods and applications." *J Pharm Biomed Anal* 2022;210:114567.
