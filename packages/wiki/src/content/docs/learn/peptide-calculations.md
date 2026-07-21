---
title: Peptide Calculations
description: Quantitative methods for peptide mass, concentration, dose, and volume calculations
---

## Molecular Weight Determination

The molecular weight (MW) of a peptide is calculated from its primary sequence. During solid-phase peptide synthesis (SPPS), each amino acid coupling releases one water molecule (H₂O, MW 18.015 Da) as the peptide bond forms between the α-carboxyl of the incoming residue and the α-amino of the growing chain:

$$\text{MW} = \sum_{i=1}^{n} \text{MW}_{\text{residue},i} - (n-1) \times 18.015$$

where $n$ is the number of amino acid residues and each residue MW is the molecular weight of the amino acid minus water (i.e., the residue mass as incorporated into the chain).

**Quick estimation:** Average amino acid residue weight is ~110 Da. For a 20-mer peptide, MW ≈ 20 × 110 = 2,200 Da. This ignores the N-terminal H (+1.008 Da) and C-terminal OH (+17.007 Da), which contribute a net +18.015 Da (one water molecule) to the free peptide.

**Common modifications to account for:**
- N-terminal acetyl: +42.011 Da (blocks N-terminus)
- C-terminal amide: -0.984 Da (replaces OH with NH₂)
- Disulfide bond (Cys-Cys): -2.016 Da (loss of 2H)
- Phosphorylation (Ser/Thr): +79.966 Da
- TFA counterion: +114.01 Da per TFA (if lyophilized from TFA)

## Molar Concentration

Molarity (M) relates mass to concentration through molecular weight:

$$C (\text{M}) = \frac{m (\text{g})}{\text{MW} (\text{g/mol}) \times V (\text{L})}$$

Rearranged for practical use:

$$C (\text{mg/mL}) = \frac{m (\text{mg})}{V (\text{mL})}$$

For molar concentrations:

$$C (\text{mM}) = \frac{m (\text{mg}) \times 1000}{\text{MW} (\text{Da}) \times V (\text{mL})}$$

**Example:** 5 mg of a 2,000 Da peptide dissolved in 2.5 mL:

$$C = \frac{5 \times 1000}{2000 \times 2.5} = 1.0 \text{ mM}$$

### Unit Conversions

| Unit | Equivalent |
|------|-----------|
| 1 M | 1 mol/L |
| 1 mM | 1 mmol/L = 1 μmol/mL |
| 1 μM | 1 μmol/L = 1 nmol/mL |
| 1 mg/mL | 1 g/L |

For a 1,000 Da peptide: 1 mM = 1 mg/mL. This equivalence scales linearly—for a 2,000 Da peptide, 1 mM = 2 mg/mL.

## Dose Calculation

The fundamental dosing equation:

$$\text{Dose (mg)} = C (\text{mg/mL}) \times V (\text{mL})$$

Rearranged for volume:

$$V (\text{mL}) = \frac{\text{Dose (mg)}}{C (\text{mg/mL})}$$

**Example:** A 2 mg/mL solution, target dose 0.5 mg:

$$V = \frac{0.5}{2} = 0.25 \text{ mL} = 250 \text{ μL}$$

### From Molar Dose

If the dose is specified in moles or μmol:

$$\text{Dose (mg)} = \text{Dose (μmol)} \times \frac{\text{MW (Da)}}{1000}$$

**Example:** 50 μmol dose of a 2,000 Da peptide:

$$\text{Dose} = 50 \times \frac{2000}{1000} = 100 \text{ mg}$$

## Reconstitution Volume

To reconstitute a lyophilized peptide to a target concentration:

$$V_{\text{add}} (\text{mL}) = \frac{m_{\text{peptide}} (\text{mg})}{C_{\text{target}} (\text{mg/mL})}$$

**Worked examples:**

**Example 1 — Direct reconstitution:**
5 mg vial, target 2 mg/mL:

$$V = \frac{5}{2} = 2.5 \text{ mL}$$

**Example 2 — Targeting a specific dose and volume:**
10 mg vial, target dose 200 μg in 0.25 mL injection volume:

First, find required concentration:

$$C = \frac{0.2 \text{ mg}}{0.25 \text{ mL}} = 0.8 \text{ mg/mL}$$

Then reconstitution volume:

$$V = \frac{10}{0.8} = 12.5 \text{ mL}$$

**Example 3 — Multi-dose vial:**
5 mg vial, target 200 μg/dose in 100 μL injection, for 25 doses:

Required concentration:

$$C = \frac{0.2 \text{ mg}}{0.1 \text{ mL}} = 2 \text{ mg/mL}$$

Total volume for 25 doses: 25 × 0.1 = 2.5 mL. Reconstitution volume for the full vial:

$$V = \frac{5}{2} = 2.5 \text{ mL}$$

## Insulin Syringe Conversions

Standard insulin syringes provide the most practical measurement for microgram-scale peptide doses.

**Key relationship:** 1 insulin unit = 0.01 mL = 10 μL, regardless of total syringe capacity.

| Syringe Capacity | Graduation | Maximum Units |
|-----------------|------------|---------------|
| 0.3 mL | 1 unit (0.01 mL) | 30 units |
| 0.5 mL | 1 unit (0.01 mL) | 50 units |
| 1.0 mL | 1 unit (0.01 mL) | 100 units |

### Volume-to-Units Table

| Desired Volume | Units on Syringe |
|---------------|-----------------|
| 50 μL | 5 units |
| 100 μL | 10 units |
| 150 μL | 15 units |
| 200 μL | 20 units |
| 250 μL | 25 units |
| 300 μL | 30 units |
| 500 μL | 50 units |

### Dose from Concentration and Units

$$\text{Dose (μg)} = C (\text{mg/mL}) \times \text{Units} \times 0.01 \times 1000$$

**Example:** 2 mg/mL solution, drawing 15 units:

$$\text{Dose} = 2 \times 15 \times 0.01 \times 1000 = 300 \text{ μg}$$

## Precision and Error Propagation

### Measurement Uncertainty

Every measurement introduces uncertainty. The cumulative error in a multi-step procedure propagates multiplicatively:

$$\sigma_C / C = \sqrt{(\sigma_m / m)^2 + (\sigma_V / V)^2}$$

where $\sigma_C$ is the concentration uncertainty, $\sigma_m$ is the mass uncertainty, and $\sigma_V$ is the volume uncertainty.

**Practical limits:**
- Analytical balance: ±0.1 mg (typical)
- 1 mL insulin syringe: ±2% (±2 μL at 100 μL)
- 5 mL syringe: ±2% (±10 μL at 500 μL)
- P1000 pipette: ±1% (±10 μL at 1000 μL)

For precision laboratory equipment and peptide research supplies, see [here](https://kingstonpeptides.com).

### Dead Volume

Needles retain 5–10 μL of solution due to surface tension and capillary action. For volumes >200 μL, this is negligible (<5%). For volumes <50 μL, account for dead volume by drawing an additional 5–10 μL.

### Significant Figures

Report concentrations to 2–3 significant figures. A 2.5 mg/mL solution measured with a 0.1 mg balance and a 5 mL syringe has a practical precision of ±3–5%. Claiming "2.500 mg/mL" implies 0.02% precision, which exceeds the measurement capability.

## Common Errors

| Error | Magnitude | Prevention |
|-------|-----------|------------|
| Unit confusion (reading mL as units) | 100× | Verify syringe markings; 1 unit = 0.01 mL |
| Incorrect reconstitution volume | Variable | Calculate twice, verify once |
| Meniscus misreading (glass syringes) | 5–10% | Read at bottom of meniscus |
| Dead volume neglect | 5–10 μL | Account for needle retention |
| Temperature-dependent volume | ~0.1%/°C | Measure at 20–25°C |

## Quick Reference

| Goal | Formula | Example |
|------|---------|---------|
| Dose | $D = C \times V$ | 2 mg/mL × 0.3 mL = 0.6 mg |
| Volume | $V = D / C$ | 0.4 mg / 2 mg/mL = 0.2 mL |
| Reconstitution volume | $V = m / C$ | 5 mg / 2.5 mg/mL = 2 mL |
| Concentration | $C = m / V$ | 10 mg / 5 mL = 2 mg/mL |
| Molar concentration | $C = m / (\text{MW} \times V)$ | 5 mg / (2000 × 2.5) = 1 mM |

---

*For research use only. Verify all calculations before preparing solutions.*
