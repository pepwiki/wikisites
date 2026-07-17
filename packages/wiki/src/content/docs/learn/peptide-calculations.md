---
title: Peptide Calculations
description: How to calculate doses, concentrations, and volumes for peptide solutions
---

## Introduction

Accurate calculations are essential for peptide research. Incorrect dosing or concentration can invalidate experiments, waste expensive materials, or compromise animal welfare. This guide covers the fundamental calculations every researcher needs to master.

## Molecular Weight and Molarity

### Molecular Weight (MW)

The molecular weight of a peptide is the sum of the molecular weights of its constituent amino acid residues minus water molecules lost during peptide bond formation:

```
MW = Σ(residue MWs) - (n-1) × 18.015
```

Where n is the number of amino acid residues. Each peptide bond releases one water molecule (MW = 18.015 Da).

**Average amino acid residue weight:** ~110 Da (used for quick estimation)

### Molarity

Molarity (M) expresses concentration as moles per liter:

```
Molarity (M) = Mass (g) / [MW (g/mol) × Volume (L)]
```

For practical peptide work, millimolar (mM) and micromolar (μM) are more common:
- 1 mM = 1 mmol/L = 1 μmol/mL
- 1 μM = 1 μmol/L = 1 nmol/mL

## Converting Between Units

### Mass Conversions

| From | To | Multiply by |
|------|----|-------------|
| mg | μg | 1000 |
| g | mg | 1000 |
| mg | mol | ÷ MW |
| mol | mg | × MW |

### Volume Conversions

| From | To | Multiply by |
|------|----|-------------|
| mL | L | 0.001 |
| L | mL | 1000 |
| μL | mL | 0.001 |
| mL | μL | 1000 |

### Common Peptide Concentrations

| Concentration | Equivalent |
|---------------|------------|
| 1 mg/mL | 1 g/L |
| 1 mM (for 1000 Da peptide) | 1 mg/mL |
| 100 μM | 0.1 mM |

## Dose Calculation Formula

The fundamental dosing equation:

```
Dose (mg) = Concentration (mg/mL) × Volume (mL)
```

Or rearranged:

```
Volume (mL) = Dose (mg) / Concentration (mg/mL)
```

**Example:** If your peptide solution is 2 mg/mL and you need a 0.5 mg dose:
```
Volume = 0.5 mg / 2 mg/mL = 0.25 mL = 250 μL
```

## Reconstitution Calculator

When reconstituting lyophilized peptides, calculate the volume of solvent to add:

### Formula

```
Volume to add (mL) = Desired concentration (mg/mL) / Peptide mass (mg)
```

Or equivalently:

```
Volume to add (mL) = Desired dose (mg) / Vial content (mg) × Vial volume
```

### Practical Examples

**Example 1: Simple Reconstitution**

You have a 5 mg vial and want a 2 mg/mL solution:
```
Volume = 5 mg / 2 mg/mL = 2.5 mL
```
Add 2.5 mL of bacteriostatic water to the vial.

**Example 2: Targeting a Specific Dose**

You have a 10 mg vial, need 200 μg per dose, and want to inject 0.25 mL per dose:

First, find the required concentration:
```
Concentration = 200 μg / 250 μL = 0.8 μg/μL = 0.8 mg/mL
```

Then calculate reconstitution volume:
```
Volume = 10 mg / 0.8 mg/mL = 12.5 mL
```

**Example 3: Partial Vial Use**

You have a 2 mg vial but only need 1 mg. You want 0.5 mL per injection:
```
Concentration needed = 1 mg / 0.5 mL = 2 mg/mL
Volume to add = 1 mg / 2 mg/mL = 0.5 mL
```

Add only 0.5 mL to dissolve the 1 mg you need (though the entire vial contents will dissolve).

## Unit Conversions

### Milligrams to Micrograms

```
1 mg = 1000 μg
```

**Common conversions:**
- 0.5 mg = 500 μg
- 0.1 mg = 100 μg
- 0.05 mg = 50 μg
- 0.01 mg = 10 μg

### Milliliters to Insulin Syringe Units

Insulin syringes are commonly used for peptide measurements:

| Syringe Size | Markings | 1 Unit = | 10 Units = |
|--------------|----------|----------|------------|
| 0.3 mL | 30 units | 0.01 mL | 0.1 mL |
| 0.5 mL | 50 units | 0.01 mL | 0.1 mL |
| 1.0 mL | 100 units | 0.01 mL | 0.1 mL |

**Key insight:** On standard insulin syringes, **1 unit = 0.01 mL = 10 μL** regardless of syringe size.

## Insulin Syringe Markings

Understanding insulin syringe markings is crucial for accurate dosing:

### Reading the Scale

- Large numbers (10, 20, 30...) represent **units**
- Small tick marks between numbers represent **single units** (0.01 mL each)
- On a 0.5 mL syringe: the "50" mark = 0.5 mL

### Conversion Table

| Units on Syringe | Volume (mL) | Volume (μL) |
|------------------|-------------|-------------|
| 5 | 0.05 | 50 |
| 10 | 0.10 | 100 |
| 15 | 0.15 | 150 |
| 20 | 0.20 | 200 |
| 25 | 0.25 | 250 |
| 30 | 0.30 | 300 |
| 50 | 0.50 | 500 |

## Precision Considerations

### Measurement Accuracy

- **Use calibrated equipment** — verify syringe and pipette accuracy regularly
- **Account for dead volume** — needles retain approximately 5-10 μL of solution
- **Read meniscus correctly** — for glass syringes, read at the bottom of the meniscus
- **Temperature effects** — volumes can vary slightly with temperature; measure at room temperature

### Significant Figures

- Report concentrations to **2-3 significant figures** for most research applications
- For precise work, use **3-4 significant figures**
- Never claim precision beyond your measurement capability

### Common Errors

| Error Type | Example | Prevention |
|------------|---------|------------|
| Unit confusion | Reading mL as units | Double-check syringe markings |
| Dilution errors | Incorrect reconstitution volume | Calculate twice, add once |
| Meniscus error | Reading top of liquid curve | Read at bottom of meniscus |
| Dead volume neglect | Assuming all drug is delivered | Account for needle retention |

## Quick Reference: Common Calculations

| Goal | Formula | Example |
|------|---------|---------|
| Dose from concentration | Dose = Conc × Vol | 2 mg/mL × 0.3 mL = 0.6 mg |
| Volume from dose | Vol = Dose / Conc | 0.4 mg / 2 mg/mL = 0.2 mL |
| Reconstitution volume | Vol = Mass / Conc | 5 mg / 2.5 mg/mL = 2 mL |
| Concentration | Conc = Mass / Vol | 10 mg / 5 mL = 2 mg/mL |

---

*For research use only. Always verify calculations before preparing solutions. When in doubt, consult a senior researcher or pharmacist.*