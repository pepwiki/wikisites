---
title: "Peptide Solubility — Dissolution and Buffer Selection"
description: Solubility data and prediction rules for therapeutic peptides — GRAVY indices, pI values, formulation strategies, and experimental methods.
---

Peptide solubility is a critical formulation parameter that determines bioavailability, stability, and therapeutic efficacy. This reference compiles solubility data for therapeutic peptides and provides evidence-based rules for predicting and optimizing solubility.

## Solubility Classification

| Category | Solubility (mg/mL) | GRAVY Range | Examples |
|----------|-------------------|-------------|----------|
| Highly soluble | >50 | <-1.0 | Insulin (acidic), oxytocin |
| Soluble | 10–50 | -1.0 to -0.5 | GLP-1 analogs, semaglutide |
| Moderately soluble | 1–10 | -0.5 to 0 | BPC-157, thymosin β4 |
| Poorly soluble | 0.1–1 | 0 to 0.5 | Hydrophobic peptides |
| Insoluble | <0.1 | >0.5 | Aggregation-prone peptides |

## GRAVY Index Reference

The GRAVY (Grand Average of Hydropathy) index predicts solubility from sequence:

| GRAVY Value | Solubility | Prediction Accuracy | Example |
|-------------|------------|-------------------|---------|
| <-1.5 | Very high | 95% | Insulin (acidic pH) |
| -1.5 to -1.0 | High | 90% | GLP-1(7-36) |
| -1.0 to -0.5 | Moderate-high | 85% | Semaglutide |
| -0.5 to 0 | Moderate | 75% | BPC-157 |
| 0 to 0.5 | Low-moderate | 60% | Hydrophobic peptides |
| 0.5 to 1.0 | Low | 50% | Aggregation-prone |
| >1.0 | Very low | 40% | Highly hydrophobic |

## Charge and Solubility

Net charge at physiological pH (7.4) strongly influences solubility:

| Net Charge | Solubility Effect | Example |
|------------|------------------|---------|
| >+5 | Very high | Poly-lysine, poly-arginine |
| +3 to +5 | High | Antimicrobial peptides |
| +1 to +3 | Moderate-high | Most therapeutic peptides |
| 0 (near pI) | Minimum | Proteins at isoelectric point |
| -1 to -3 | Moderate-high | Acidic peptides |
| -3 to -5 | High | Poly-aspartate, poly-glutamate |
| <-5 | Very high | Highly acidic peptides |

### Isoelectric Point (pI) and Minimum Solubility

Peptides are least soluble at their isoelectric point (pI), where net charge = 0:

| Peptide Class | Typical pI | Minimum Solubility pH |
|---------------|------------|----------------------|
| Basic peptides (Lys, Arg-rich) | 10–12 | 10–12 |
| Neutral peptides | 5–8 | 5–8 |
| Acidic peptides (Asp, Glu-rich) | 3–5 | 3–5 |

**Practical implication**: Adjust pH away from pI to improve solubility. Most therapeutic peptides have pI values between 5–9.

## Amino Acid Contributions to Solubility

### Hydrophilic Residues (Increase Solubility)

| Residue | Hydropathy Index | Charge at pH 7.4 | Solubility Contribution |
|---------|-----------------|------------------|------------------------|
| Arg (R) | -4.5 | +1 | Very high |
| Lys (K) | -3.9 | +1 | Very high |
| Asp (D) | -3.5 | -1 | High |
| Glu (E) | -3.5 | -1 | High |
| Asn (N) | -3.5 | 0 | Moderate-high |
| Gln (Q) | -3.5 | 0 | Moderate-high |
| His (H) | -3.2 | +0.5 | Moderate |
| Ser (S) | -0.8 | 0 | Moderate |
| Thr (T) | -0.7 | 0 | Moderate |

### Hydrophobic Residues (Decrease Solubility)

| Residue | Hydropathy Index | Solubility Contribution |
|---------|-----------------|------------------------|
| Ile (I) | 4.5 | Very low |
| Val (V) | 4.2 | Very low |
| Leu (L) | 3.8 | Very low |
| Phe (F) | 2.8 | Low |
| Cys (C) | 2.5 | Low (disulfide bonds) |
| Met (M) | 1.9 | Low |
| Ala (A) | 1.8 | Low-moderate |
| Gly (G) | -0.4 | Moderate |
| Pro (P) | -1.6 | Moderate |
| Trp (W) | -0.9 | Moderate (aromatic) |
| Tyr (Y) | -1.3 | Moderate (polar) |

## Solubility Prediction Rules

### Rule 1: GRAVY Threshold

```
If GRAVY < -0.4 → Soluble (no formulation optimization needed)
If GRAVY = -0.4 to 0 → Moderately soluble (formulation optimization beneficial)
If GRAVY > 0 → Poorly soluble (formulation optimization required)
```

### Rule 2: Charge Density

```
If |net charge| > 3 at pH 7.4 → Generally soluble
If |net charge| = 1–3 → Moderately soluble
If net charge ≈ 0 (near pI) → Poorly soluble at that pH
```

### Rule 3: Sequence Length

```
If length < 10 aa → Generally soluble (small peptides)
If length = 10–30 aa → Depends on sequence composition
If length > 30 aa → Depends on folding and aggregation propensity
```

### Rule 4: Hydrophobic Residue Content

```
If hydrophobic residues > 50% → Low solubility expected
If hydrophobic residues = 30–50% → Moderate solubility
If hydrophobic residues < 30% → High solubility expected
```

## Experimental Solubility Methods

### Direct Solubility Measurement

| Method | Detection | Sensitivity | Application |
|--------|-----------|-------------|-------------|
| UV-Vis spectrophotometry | 280 nm (Tyr, Trp) | 0.1–100 mg/mL | Routine measurement |
| HPLC-UV | 214/280 nm | 0.01–100 mg/mL | High accuracy |
| Nephelometry | Light scattering | 0.01–10 mg/mL | Low solubility |
| Turbidimetry | Light transmission | 0.1–50 mg/mL | Rapid screening |

### High-Throughput Solubility Screening

| Method | Throughput | Sample Volume | Application |
|--------|-----------|---------------|-------------|
| 96-well plate assay | 96 peptides/day | 100 μL | Primary screening |
| Microfluidics | 1000+ peptides/day | 1 μL | Ultra-high throughput |
| Solubility prediction (in silico) | Unlimited | None | Virtual screening |

## Formulation Strategies for Poor Solubility

### pH Adjustment

| Strategy | Mechanism | Example | Success Rate |
|----------|-----------|---------|-------------|
| pH away from pI | Charge repulsion | Insulin at pH 3.0 | 90% |
| pH 2–4 | Protonation of basic residues | Acidic formulation | 85% |
| pH 8–10 | Deprotonation of acidic residues | Basic formulation | 80% |

### Excipient Strategies

| Excipient | Mechanism | Concentration | Example |
|-----------|-----------|---------------|---------|
| Surfactant (PS-80) | Micelle formation | 0.01–0.1% | Insulin formulations |
| Cyclodextrin | Inclusion complex | 5–20% | Octreotide |
| Polyol (sorbitol) | Co-solvent | 10–30% | Lyophilized peptides |
| Buffer (acetate, phosphate) | pH control | 10–50 mM | Most formulations |

### Peptide Modification Strategies

| Modification | Solubility Effect | Mechanism | Example |
|-------------|------------------|-----------|---------|
| PEGylation | 2–10× increase | Hydrophilic shell | PEG-IFN |
| His-tag | 5–20× increase | Charge addition | Recombinant peptides |
| Glu/Asp tag | 5–20× increase | Charge addition | Acidic peptide tags |
| Cyclization | Variable | Reduces aggregation | Octreotide |

## Solubility Data for Common Peptides

| Peptide | Sequence Length | Solubility (mg/mL) | pH | GRAVY | Notes |
|---------|----------------|-------------------|-----|-------|-------|
| Insulin | 51 | 28 (pH 3.0) | 3.0 | -0.12 | Acidic pH soluble |
| Semaglutide | 31 | >50 | 7.4 | -1.2 | Highly soluble |
| Liraglutide | 31 | >50 | 7.4 | -1.1 | Highly soluble |
| GLP-1(7-36) | 30 | >100 | 7.4 | -1.8 | Very soluble |
| BPC-157 | 15 | >50 | 7.4 | -0.8 | Soluble |
| Thymosin β4 | 43 | >50 | 7.4 | -1.4 | Highly soluble |
| Oxytocin | 9 | >100 | 7.4 | -0.3 | Soluble (small) |
| Octreotide | 8 | 10–20 | 7.4 | -0.5 | Moderately soluble |
| Leuprolide | 9 | >50 | 7.4 | -0.2 | Soluble |
| Desmopressin | 9 | >50 | 7.4 | -0.4 | Soluble |
| Melanotan II | 7 | >50 | 7.4 | 0.1 | Moderately soluble |
| BPC-157 (acidic pH) | 15 | >100 | 3.0 | -0.8 | Highly soluble |
| LL-37 | 37 | 5–10 | 7.4 | 0.3 | Moderate |
| Magainin-2 | 23 | 10–20 | 7.4 | 0.2 | Moderate |
| Defensin α | 30 | 5–15 | 7.4 | 0.4 | Moderate |

## Solubility Optimization Workflow

1. **Predict solubility** using GRAVY index and charge calculation
2. **Screen pH** (pH 3, 5, 7, 9) for optimal solubility
3. **Test excipients** (surfactants, cyclodextrins, co-solvents)
4. **Evaluate modifications** (PEGylation, His-tag, cyclization)
5. **Characterize aggregates** (SEC, DLS) to ensure soluble monomers
6. **Confirm activity** after formulation optimization

Solubility testing supplies available from [Kingston Peptides](https://kingstonpeptides.com)

## References

1. Kyte J, Doolittle RF. "A simple method for displaying the hydropathic character of a protein." *J Mol Biol* 1982;157:105-132.
2. Papageorgiou NP, et al. "Peptide solubility and aggregation: mechanism and prediction." *J Pharm Sci* 2016;105:2457-2468.
3. Lai PK, et al. "Predicting peptide solubility from sequence." *Bioorg Med Chem Lett* 2018;28:3496-3501.
4. Shpirer M, et al. "Solubility of peptides: experimental and computational approaches." *Amino Acids* 2019;51:1205-1215.
5. Brange J, et al. "Peptide solubility and aggregation in insulin formulations." *Adv Drug Deliv Rev* 2020;165:24-35.
