---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Purification by HPLC — Method Development"
description: "HPLC method development for peptide purification: column selection, gradient optimization, and fraction collection."
---

High-performance liquid chromatography (HPLC) is the gold standard for peptide purification. This guide covers method development from column selection through gradient optimization to fraction collection strategies.

## 1. Fundamental Principles

### Reversed-Phase HPLC (RP-HPLC)

RP-HPLC separates peptides based on hydrophobicity. The stationary phase is nonpolar (C18, C8), and the mobile phase is polar (water/acetonitrile with ion-pairing agents).

**Retention mechanism**: Hydrophobic interactions between peptide side chains and alkyl chains on silica surface. Retention increases with:
- Peptide length (more hydrophobic residues)
- Amino acid composition (Leu, Ile, Phe > Ala > Gly)
- Lower organic solvent concentration
- Higher ion-pairing agent concentration

### Ion-Exchange HPLC (IEX)

Separates based on charge. Useful for:
- Removing truncated sequences (different net charge)
- Separating diastereomers
- Purifying very hydrophobic peptides

## 2. Column Selection

### Stationary Phase Comparison

| Phase | Particle Size | Pore Size | Best For |
|-------|--------------|-----------|----------|
| C18 | 3.5–5 µm | 100 Å | Small peptides (<30 aa) |
| C18 | 5 µm | 300 Å | Large peptides (>30 aa) |
| C8 | 3.5–5 µm | 100 Å | Moderate hydrophobicity |
| C4 | 5 µm | 300 Å | Membrane proteins, hydrophobic |
| Phenyl-hexyl | 5 µm | 100 Å | Aromatic separation |
| BEH Amide (HILIC) | 1.7 µm | 130 Å | Polar peptides, glycopeptides |

### Column Dimensions

| Scale | Length | ID | Flow Rate | Loading |
|-------|--------|-----|-----------|---------|
| Analytical | 150 mm | 4.6 mm | 1 mL/min | 0.1–1 mg |
| Semi-prep | 250 mm | 10 mm | 4–5 mL/min | 5–20 mg |
| Preparative | 250 mm | 21.2 mm | 10–20 mL/min | 50–200 mg |
| Production | 250 mm | 50 mm | 50–100 mL/min | 0.5–5 g |

### Recommended Columns

- **Analytics**: Waters BEH C18, 1.7 µm, 2.1 × 150 mm
- **Prep**: Agilent Zorbax SB-C18, 5 µm, 21.2 × 250 mm
- **Budget**: Phenomenex Gemini C18, 5 µm, 21.1 × 250 mm

## 3. Mobile Phase Composition

### Common Mobile Phases

| System | Solvent A | Solvent B | Application |
|--------|-----------|-----------|-------------|
| TFA/MeCN | 0.1% TFA/H₂O | 0.1% TFA/MeCN | Standard peptides |
| FA/MeCN | 0.1% FA/H₂O | 0.1% FA/MeCN | LC-MS compatible |
| NH₄OAc/MeCN | 10 mM NH₄OAc/H₂O | 10 mM NH₄OAc/MeCN | IC separation |
| Phosphate/MeCN | 20 mM NaH₂PO₄/H₂O | MeCN | Ion-exchange |

### Ion-Pairing Agent Comparison

| Agent | Concentration | Effect on Separation |
|-------|--------------|---------------------|
| TFA | 0.05–0.1% | Strong ion-pairing, sharp peaks |
| FA | 0.1% | Weak ion-pairing, MS-compatible |
| Heptafluorobutyric acid | 0.05–0.1% | Very strong, for very polar peptides |
| NH₄OAc | 10–20 mM | Volatile, good MS compatibility |

## 4. Gradient Optimization

### Initial Screening Gradient

Start with a broad gradient to identify the elution window:

| Time (min) | %B |
|------------|-----|
| 0 | 10 |
| 5 | 10 |
| 45 | 90 |
| 50 | 90 |
| 51 | 10 |
| 60 | 10 |

### Gradient Steepness Optimization

The gradient slope (Δ%B per column volume) affects resolution:

- **Shallow gradient** (0.5–1% B/CV): Best resolution, longer run time
- **Standard gradient** (2–3% B/CV): Good balance
- **Steep gradient** (5–10% B/CV): Fast, lower resolution

**Rule of thumb**: For baseline resolution of two peaks differing by 1% B, use a gradient of <2% B per column volume.

### Column Volume Calculation

$$CV = \pi \times r^2 \times L \times \epsilon$$

Where r = column radius (cm), L = column length (cm), ε = column void fraction (~0.65 for fully porous silica).

For a 250 × 21.2 mm column: CV ≈ 57 mL

### Optimization Example

**Problem**: Two peaks co-elute at ~55% B in 40 min gradient.

**Solution**:
1. Narrow the gradient around 50–60% B
2. Extend gradient over 60 min in this region
3. Reduce flow rate from 20 to 15 mL/min
4. Increase temperature from 25 to 40°C

## 5. Method Development Workflow

### Step 1: Solubility Assessment

Before HPLC, ensure peptide is soluble in starting conditions:
1. Dissolve 1 mg peptide in 100 µL Solvent A
2. If insoluble, try: 50% MeOH, 1% FA, 10 mM NH₄HCO₃, or 6 M GuHCl
3. Filter through 0.45 µm syringe filter

### Step 2: Analytical Run

Run analytical HPLC to:
- Determine elution window (%B at which peptide elutes)
- Identify major impurities (deletion sequences, truncated)
- Assess overall purity of crude material

### Step 3: Preparative Method Development

Based on analytical results:

| Crude Purity | Gradient | Loading |
|--------------|----------|---------|
| >80% | 30–70% B over 40 min | 100 mg/column |
| 60–80% | 20–60% B over 60 min | 50 mg/column |
| <60% | 10–50% B over 80 min | 25 mg/column |

### Step 4: Fraction Collection

**Strategy A — Peak-based**: Collect fractions at each UV maximum
**Strategy B — Time-based**: Collect every 30–60 seconds across the peak
**Strategy C — Threshold-based**: Collect when UV > 50% of peak maximum

**Recommended**: Combine strategies A and C. Collect across the entire peak but pool only fractions >90% pure by analytical check.

## 6. Purification Strategies for Difficult Peptides

### Hydrophobic Peptides (>40% hydrophobic residues)

- Use TFA/MeCN with 5% DMSO in Solvent A
- Add 0.1% TFA to both phases (sharpen peaks)
- Consider HILIC for very hydrophobic sequences

### Hydrophilic Peptides (<20% hydrophobic residues)

- Use FA/MeCN system
- Consider HILIC mode (amide column)
- Add 10% MeOH to Solvent A to increase retention

### Very Long Peptides (>50 residues)

- Use C18, 300 Å pore, 5 µm particles
- Low loading (10–20 mg/column)
- Shallow gradient (1% B/CV)
- Consider orthogonal purification (IEX then RP-HPLC)

### Cysteine-Containing Peptides

- Add 1 mM EDT to mobile phases
- Keep temperature <25°C
- Consider TCEP in Solvent A (0.5 mM) to prevent oxidation

## 7. Fraction Analysis and Pooling

### Analytical QC

1. Take 10 µL from each fraction
2. Dilute to 1 mL with 50% MeOH/0.1% FA
3. Inject 5 µL on analytical column
4. Run 5 min isocratic at 50% B, then gradient to 90% B

### Pooling Criteria

| Parameter | Acceptance | Action if Failed |
|-----------|------------|------------------|
| Purity (UV220) | ≥95% | Re-purify or pool selectively |
| Purity (UV280) | ≥90% | Check Trp/Tyr content |
| Mass (MS) | Within 2 Da | Check for modification |
| Visual | Clear/colorless | Re-purify if colored |

### Second-Dimension Purification

If first-dimension purity is 80–95%, consider:
1. **Ion-exchange**: Separate by charge (removes deletion sequences)
2. **HILIC**: Separate by polarity (orthogonal to RP)
3. **Size-exclusion**: Remove aggregates

## 8. System Maintenance

### Column Care

- **Storage**: 80% MeCN/H₂O (no TFA for C18 columns)
- **Wash**: After each use, flush with 95% MeCN for 10 CV
- **Temperature**: Never exceed 60°C
- **Backpressure**: Monitor; replace column if >80% of new-column pressure

### Solvent Preparation

- Filter all mobile phases through 0.22 µm PVDF
- Degas by vacuum or helium sparging
- Prepare fresh daily for optimal reproducibility

## References

1. Aguilar, M.-I. (Ed.). *HPLC of Peptides and Proteins*. Methods in Molecular Biology, Vol. 251. Humana Press, 2004.
2. Simpson, R.J. *Purifying Proteins for Proteomics: A Laboratory Manual*. Cold Spring Harbor Laboratory Press, 2004.
3. Stahl, G.L., et al. "Practical HPLC purification of synthetic peptides." *Journal of Peptide Science* 14 (2008): 1–14.

## Further Reading

- [Purification Methods](/learn/purification/) — Overview of all purification techniques
- [Mass Spectrometry](/learn/mass-spectrometry-peptides/) — Post-purification analysis
- [Quality Control](/learn/peptide-quality-control/) — Full QC panel
