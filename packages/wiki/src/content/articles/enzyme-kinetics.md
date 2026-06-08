---
title: "Enzyme Kinetics Basics"
description: "Michaelis-Menten kinetics, Km, Vmax, enzyme inhibition types, and their relevance to peptide drug design."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["enzyme-kinetics", "michaelis-menten", "inhibition", "drug-design"]
category: "Pharmacology"
difficulty: "intermediate"
relatedArticles: ["drug-design", "peptide-bonds"]
---

## Why Enzyme Kinetics Matters for Peptides

Many peptide drugs target enzymes -- either as inhibitors, substrates, or activators. Understanding enzyme kinetics is essential for designing peptides that interact with enzymes in predictable, therapeutically useful ways.

## The Michaelis-Menten Equation

The foundation of enzyme kinetics is the **Michaelis-Menten equation**:

**v = (Vmax \* [S]) / (Km + [S])**

Where:

- **v** = reaction velocity (rate of product formation)
- **Vmax** = maximum reaction velocity when the enzyme is fully saturated
- **[S]** = substrate concentration
- **Km** = Michaelis constant (substrate concentration at half Vmax)

At low substrate concentrations (when [S] << Km), the reaction rate increases almost linearly with [S]. At high concentrations (when [S] >> Km), the rate plateaus at Vmax because all enzyme active sites are occupied.

## Km and Vmax: What They Tell You

**Km (Michaelis constant)** reflects the enzyme's **affinity** for its substrate:

- **Low Km** = high affinity (the enzyme binds the substrate tightly and reaches half-maximal velocity at low concentration)
- **High Km** = low affinity (more substrate is needed to achieve the same rate)

**Vmax** depends on two factors:

- The **total enzyme concentration** ([E]T)
- The **turnover number** (kcat): how many substrate molecules each enzyme molecule converts per second

The ratio **kcat / Km** is called the **catalytic efficiency** and is used to compare how well different enzymes catalyze their reactions.

## Enzyme Inhibition

Understanding how inhibitors work is critical for drug design.

### Competitive Inhibition

A **competitive inhibitor** binds to the enzyme's active site, competing directly with the substrate. Key effects:

- **Km increases** (apparent affinity decreases -- more substrate is needed)
- **Vmax stays the same** (enough substrate can outcompete the inhibitor)
- Example: Methotrexate competes with folate for the active site of dihydrofolate reductase

### Non-Competitive Inhibition

A **non-competitive inhibitor** binds to a site other than the active site (an **allosteric site**). It changes the enzyme's conformation so it can no longer catalyze the reaction efficiently. Key effects:

- **Km stays the same** (substrate binding is unaffected)
- **Vmax decreases** (some enzyme molecules are rendered inactive)
- Example: Heavy metal ions (lead, mercury) binding to cysteine residues away from the active site

### Mixed Inhibition

In **mixed inhibition**, the inhibitor can bind to both the free enzyme and the enzyme-substrate complex, but with different affinities. Both Km and Vmax are affected.

## The Lineweaver-Burk Plot

The **Lineweaver-Burk plot** (double reciprocal plot) linearizes the Michaelis-Menten equation by plotting **1/v** against **1/[S]**:

**1/v = (Km/Vmax)(1/[S]) + 1/Vmax**

This transformation makes it easier to visually distinguish inhibition types:

| Inhibition Type | Km Effect | Vmax Effect | Lineweaver-Burk Pattern     |
| --------------- | --------- | ----------- | --------------------------- |
| Competitive     | Increases | Unchanged   | Lines intersect on y-axis   |
| Non-competitive | Unchanged | Decreases   | Lines intersect on x-axis   |
| Mixed           | Changes   | Decreases   | Lines intersect in quadrant |

## Connection to Peptide Drug Design

Enzyme kinetics directly informs peptide drug development:

- **Km** tells you how potent a peptide substrate analog might be
- **Ki** (inhibitor constant) measures how tightly a peptide inhibitor binds
- **kcat/Km** identifies the best substrates for designing competitive inhibitors
- **IC50** values from inhibition assays guide lead optimization

When designing peptide-based enzyme inhibitors, medicinal chemists aim for **low Ki values** (tight binding) and high selectivity for the target enzyme over related family members to minimize side effects.

## Summary

| Concept                        | Meaning                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| **Km**                         | Substrate concentration at half Vmax; reflects affinity     |
| **Vmax**                       | Maximum velocity at enzyme saturation                       |
| **kcat**                       | Turnover number (substrate molecules per enzyme per second) |
| **kcat/Km**                    | Catalytic efficiency                                        |
| **Competitive inhibition**     | Inhibitor binds active site; Km up, Vmax same               |
| **Non-competitive inhibition** | Inhibitor binds allosteric site; Km same, Vmax down         |
| **Lineweaver-Burk**            | Double-reciprocal plot for visualizing kinetics             |
