---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Charge — Net Charge at Physiological pH"
description: "Peptide net charge calculation: Henderson-Hasselbalch equation, pKa values, and charge at pH 7.4."
---

## Introduction

The net charge of a peptide at a given pH determines its solubility, electrophoretic mobility, interaction with charged surfaces, and behavior in chromatographic separations. Understanding how to calculate peptide charge from sequence and pH is essential for formulation design, purification strategy, and predicting biological behavior.

## Ionizable Groups in Peptides

Peptides contain several types of ionizable groups, each with a characteristic pKa:

### Side Chain pKa Values

| Ionizable Group | Typical pKa Range | Charge at Low pH | Charge at High pH |
|----------------|-------------------|------------------|-------------------|
| Asp (β-COOH) | 3.6–4.0 | 0 (protonated) | -1 (deprotonated) |
| Glu (γ-COOH) | 4.1–4.5 | 0 (protonated) | -1 (deprotonated) |
| His (imidazole) | 6.0–6.5 | +1 (protonated) | 0 (deprotonated) |
| Cys (thiol) | 8.0–8.5 | 0 (protonated) | -1 (deprotonated) |
| Tyr (phenol) | 10.0–10.5 | 0 (protonated) | -1 (deprotonated) |
| Lys (ε-NH₃⁺) | 10.5–11.0 | +1 (protonated) | 0 (deprotonated) |
| Arg (guanidinium) | 12.0–12.5 | +1 (protonated) | 0 (deprotonated) |

### Terminal Groups

- **N-terminal amino group (α-NH₃⁺):** pKa ~8.0–9.0
- **C-terminal carboxyl group (α-COOH):** pKa ~3.0–3.5

The terminal groups contribute to charge regardless of which amino acids occupy those positions. Even peptides composed entirely of non-ionizable residues (e.g., Ala-Gly-Val) have charged termini.

## The Henderson-Hasselbalch Equation

The charge state of each ionizable group is determined by the Henderson-Hasselbalch equation:

For acids (deprotonate to give negative charge):
```
charge = -1 / (1 + 10^(pKa - pH))
```

For bases (protonate to give positive charge):
```
charge = +1 / (1 + 10^(pH - pKa))
```

The net charge of the peptide is the sum of charges from all ionizable groups, including side chains and termini.

## Calculating Net Charge at pH 7.4

### Worked Example

Consider the peptide Ala-Glu-His-Lys-Cys (5 residues):

| Group | pKa | pH 7.4 | Charge |
|-------|-----|--------|--------|
| N-terminal NH₃⁺ | 8.5 | 7.4 | +0.93 |
| Glu side chain | 4.3 | 7.4 | -0.95 |
| His side chain | 6.2 | 7.4 | -0.06 |
| Lys side chain | 10.7 | 7.4 | +0.98 |
| Cys side chain | 8.3 | 7.4 | -0.09 |
| C-terminal COOH | 3.5 | 7.4 | -1.00 |
| **Net charge** | | | **-0.19** |

At pH 7.4, this peptide has a net charge of approximately -0.2, making it slightly anionic.

### Quick Estimation Rules

For rapid estimation without detailed calculations:
- Every Asp and Glu contributes approximately -1
- Every Lys and Arg contributes approximately +1
- Every His contributes approximately 0 (since pKa ~6.2, His is mostly deprotonated at pH 7.4)
- Every Cys contributes approximately 0 (since pKa ~8.3, Cys is mostly protonated at pH 7.4)
- N-terminal contributes approximately +1
- C-terminal contributes approximately -1

Using these rules for the example above: (-1 Glu) + (+1 Lys) + (+1 N-term) + (-1 C-term) = 0, which is close to the calculated value of -0.19.

## Isoelectric Point (pI)

The isoelectric point is the pH at which the peptide has zero net charge. It is calculated as the average of the pKa values flanking the neutral species:

```
pI = (pKa₁ + pKa₂) / 2
```

where pKa₁ and pKa₂ are the pKa values immediately above and below the zwitterionic form.

Peptides at pH = pI have:
- Minimum solubility (due to lack of electrostatic repulsion)
- Minimum electrophoretic mobility
- Maximum tendency to aggregate

For the example peptide, pI is approximately 7.1, calculated from the pKa values of the Cys (8.3) and His (6.2) groups that bracket the neutral charge state.

## Charge Distribution

Beyond net charge, the spatial distribution of charge along the peptide chain is critically important:

### Charge Patches

Clusters of like charges create local charge patches that can:
- Promote solubility by maintaining hydration
- Drive electrostatic interactions with charged surfaces
- Influence peptide conformation through charge-charge repulsion

### Amphipathic Charge

Peptides with segregated positive and negative charge patches can adopt amphipathic structures and interact with charged biological surfaces (e.g., cell membranes, DNA).

## Charge and Solubility

Peptide solubility is strongly influenced by charge:

- **High net charge (|z| > 2):** Generally highly soluble due to strong electrostatic repulsion between peptide molecules
- **Moderate net charge (|z| = 1–2):** Soluble under appropriate pH conditions
- **Near-zero net charge (|z| < 1):** Reduced solubility; may aggregate near pI
- **Zero net charge (at pI):** Minimum solubility; precipitation likely

## Charge and Membrane Interaction

Cationic peptides (net positive charge at physiological pH) can interact with anionic cell membranes through electrostatic attraction. This is the basis for:
- Cell-penetrating peptides (CPPs)
- Antimicrobial peptides
- Nuclear localization sequences

The strength of membrane interaction scales with net positive charge, but excessive charge can lead to non-specific toxicity.

## Charge and Chromatography

### Ion-Exchange Chromatography (IEX)

Peptide charge determines binding to ion-exchange resins:
- **Cation exchange (CEX):** Binds positively charged peptides; eluted with increasing salt or pH
- **Anion exchange (AEX):** Binds negatively charged peptides; eluted with increasing salt or decreasing pH

IEX is the primary method for purifying synthetic peptides and is guided by the calculated charge at the purification pH.

### Electrophoresis

Peptide charge-to-mass ratio determines electrophoretic mobility. Gel electrophoresis and capillary electrophoresis separate peptides based on this property.

## Factors Affecting Effective Charge

### Ionic Strength

High ionic strength screens electrostatic interactions, reducing the effective charge experienced by nearby molecules. This affects:
- Solubility (screening reduces repulsion)
- Membrane binding (screening weakens electrostatic attraction)
- Chromatographic behavior (screening weakens resin binding)

### Temperature

Temperature affects pKa values, which in turn affect charge state. The pKa of ionizable groups typically decreases by 0.01–0.03 units per degree Celsius increase.

### Co-solvents

Organic co-solvents alter the dielectric constant, affecting pKa values and charge states. Lower dielectric constants generally shift pKa values of acids downward and bases upward.

## Practical Applications

Understanding peptide charge enables:
- **Formulation pH selection:** Choosing pH to maximize charge and solubility
- **Buffer selection:** Matching buffer pKa to formulation pH for maximum buffering capacity
- **Purification design:** Predicting ion-exchange chromatography behavior
- **Stability prediction:** Assessing charge-related degradation pathways
- **Dosing calculations:** Accounting for charge in concentration determinations

Charge is a fundamental property that influences every aspect of peptide handling, from synthesis through clinical administration.
