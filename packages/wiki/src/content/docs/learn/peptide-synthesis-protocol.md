---
date: 2026-07-26
author: "Wikipept Contributors"
title: "Peptide Synthesis Protocol — Fmoc SPPS Step-by-Step"
description: "Complete Fmoc SPPS protocol: coupling, deprotection, cleavage, and purification with reagent concentrations and reaction times."
---

This protocol details the complete solid-phase peptide synthesis (SPPS) workflow using Fmoc (9-fluorenylmethyloxycarbonyl) chemistry, the most widely adopted strategy for laboratory and pilot-scale peptide production.

## 1. Pre-Synthesis Planning

### Sequence Analysis

Before synthesis begins, the target sequence must be evaluated for:

- **Coupling difficulty**: Aggregation-prone sequences (poly-Ala, poly-Val, poly-Ile) require microwave assistance or pseudoproline dipeptides
- **Oxidation-sensitive residues**: Met and Cys may require temporary protection
- **Aspartimide formation**: Asp-Gly sequences are prone to aspartimide rearrangement at elevated temperatures
- **Racemization risk**: C-terminal Fmoc-Gly is racemization-free; C-terminal Fmoc-Ser/Thr/His require caution

### Resin Selection

| Resin Type | Loading (mmol/g) | C-Terminal | Best For |
|------------|-----------------|------------|----------|
| Wang | 0.3–1.0 | Free acid | Standard peptides |
| Rink Amide MBHA | 0.3–0.7 | Amide | C-terminal amide |
| 2-Chlorotrityl Cl | 0.8–1.4 | Free acid | Fragments, sensitive sequences |
| HMPB-ChemMatrix | 0.2–0.4 | Free acid | Long peptides (>30 residues) |
| Sieber Amide | 0.2–0.6 | Amide | Acid-labile protecting groups |

**Resin swelling**: Wash resin with DMF (3 × 1 min) before first coupling. Allow 15–20 min swelling time for polystyrene resins; ChemMatrix resins swell in aqueous solutions.

### Coupling Strategy

For standard sequences, double-coupling with HATU/DIPEA is recommended. For difficult sequences:

1. **Standard**: HATU (2 eq), DIPEA (4 eq), 20 min
2. **Difficult**: HATU (3 eq), DIPEA (6 eq), 2 × 30 min
3. **Very difficult**: DIC/Oxyma Pure (3 eq each), 60 min, 70°C
4. **Microwave-assisted**: DIC/HATU, 75°C, 5 min per coupling

## 2. Fmoc Deprotection

### Reagent Preparation

| Reagent | Concentration | Volume per wash |
|---------|--------------|-----------------|
| Piperidine | 20% (v/v) in DMF | 10 mL/g resin |
| DMF (wash) | 100% | 10 mL/g resin |

### Deprotection Protocol

1. Drain树脂 (resin) completely from storage solvent
2. Add 20% piperidine/DMF (10 mL/g resin)
3. Stir gently or shake for **2 min** (first deprotection)
4. Drain and discard filtrate
5. Add fresh 20% piperidine/DMF
6. Stir for **8 min** (second deprotection, ensures complete Fmoc removal)
7. Drain and save filtrate for Fmoc monitoring

### Fmoc Monitoring (UV Absorbance)

The dibenzofulvene-piperidine adduct absorbs at **301 nm** (ε = 7,800 M⁻¹cm⁻¹):

1. Dilute 100 µL deprotection filtrate to 3 mL with DMF
2. Measure absorbance at 301 nm
3. Calculate coupling yield: Expected = 1 – (A_measured / A_theoretical × loading)
4. Acceptable: >95% per coupling; <90% indicates problem

### Washing After Deprotection

1. DMF wash: 3 × 1 min (10 mL/g resin)
2. Verify complete deprotection: no yellow color in final wash

## 3. Amino Acid Coupling

### Pre-Activation Protocol (HATU)

1. Dissolve Fmoc-amino acid (2.0 eq relative to resin loading) in DMF
2. Add HATU (1.9 eq)
3. Add DIPEA (4.0 eq) — solution should become faintly yellow
4. Allow pre-activation for **1–2 min** at room temperature
5. Add to drained resin immediately

### Coupling Conditions

| Parameter | Standard | Difficult | Microwave |
|-----------|----------|-----------|-----------|
| Fmoc-AA eq | 2.0 | 3.0 | 3.0 |
| HATU eq | 1.9 | 2.9 | 2.9 |
| DIPEA eq | 4.0 | 6.0 | 6.0 |
| Time | 20 min | 2 × 30 min | 5 min |
| Temperature | 25°C | 25°C | 70°C |
| Solvent | DMF | DMF/NMP | DMF |

### Coupling Completion Test (Ninhydrin/Kaiser Test)

1. Take 3–5 resin beads from reaction
2. Add 100 µL each: 5% ninhydrin in EtOH, 80% phenol in EtOH, 0.1 M KCN in pyridine
3. Heat at 100°C for 5 min
4. **Blue/green** = free amine (incomplete coupling)
5. **Yellow/colorless** = coupling complete
6. For secondary amines (Pro, N-methyl): use chloranil test (blue = incomplete)

## 4. Iterative Coupling-Deprotection Cycles

### Complete Cycle (1 residue)

| Step | Reagent | Time | Wash |
|------|---------|------|------|
| 1. Deprotection | 20% piperidine/DMF | 2 + 8 min | DMF (3×) |
| 2. Coupling | Fmoc-AA/HATU/DIPEA | 20 min | DMF (3×) |
| 3. Capping (optional) | Ac₂O/DIPEA | 5 min | DMF (3×) |
| 4. Repeat from Step 1 | — | — | — |

### Capping (Optional)

Capping with acetic anhydride (5% v/v) and DIPEA (10% v/v) in DMF for 5 min terminates truncated sequences. This simplifies purification but reduces overall yield by 5–15%.

## 5. Cleavage and Global Deprotection

### Cleavage Cocktail (Reagent K)

| Component | Amount | Purpose |
|-----------|--------|---------|
| TFA | 82.5 mL | Solvent/cleavage agent |
| Thioanisole | 5.0 mL | Scavenger (cation scavenger) |
| EDT | 2.5 mL | Scavenger (for Cys protection) |
| m-Cresol | 5.0 mL | Scavenger |
| H₂O | 5.0 mL | Scavenger (for tBu-based groups) |

**Alternative cocktails:**

- **TFA/TIS/H₂O** (95:2.5:2.5): Standard cleavage for most sequences
- **TFA/TIS/EDT/H₂O** (92.5:2.5:2.5:2.5): For sequences with Cys, Met, Trp
- **Low-TFA** (70% TFA): For acid-sensitive sequences

### Cleavage Protocol

1. Wash resin with DCM (3 × 1 min) then MeOH (1 × 1 min)
2. Dry resin under vacuum for 5 min
3. Add cleavage cocktail (10–15 mL/g resin)
4. Stir at room temperature for **2–3 hours** (standard) or **4–6 hours** (long peptides)
5. For very long peptides (>50 residues): extend to 6–8 hours
6. Filter resin; collect filtrate
7. Wash resin with TFA (2 × 2 mL/g resin), combine washes

### Precipitation

1. Add cold diethyl ether (10 volumes) to cleavage filtrate
2. Vortex and cool at **-20°C for 30 min**
3. Centrifuge at 4,000 × g for 10 min
4. Discard supernatant
5. Repeat ether wash 2×
6. Dissolve pellet in 50% MeOH/H₂O or 0.1% TFA/H₂O for purification

## 6. Quality Control During Synthesis

### In-Process Controls

| Test | When | Acceptance |
|------|------|------------|
| Fmoc UV monitoring | Every deprotection | >95% deprotection |
| Kaiser test | After each coupling | Complete coupling |
| LC-MS (aliquot) | After 10 residues | Correct mass, no deletion |
| Full LC-MS | Post-cleavage | Single major product |

### Common Failures

- **Deletion sequences**: Incomplete coupling (check Kaiser test, increase coupling time)
- **Truncated sequences**: Difficult couplings (use microwave, pseudoproline dipeptides)
- **Oxidized products**: Met/Cys oxidation (add EDT, work under N₂)
- **Aspartimide**: Asp-Gly sequences (reduce temperature, use dipeptide building blocks)

## 7. Purification Overview

After cleavage, crude peptide is purified by preparative RP-HPLC:

1. **Column**: C18, 250 × 21.2 mm, 5 µm, 100 Å
2. **Mobile phase A**: 0.1% TFA in H₂O
3. **Mobile phase B**: 0.1% TFA in MeCN
4. **Gradient**: 10–90% B over 40–60 min
5. **Flow rate**: 10–20 mL/min
6. **Detection**: UV at 220 nm

**Fraction collection**: Collect fractions corresponding to the major peak; analyze by analytical LC-MS. Pool fractions >95% purity. Repeat purification if needed.

## 8. Lyophilization

1. Combine purified fractions
2. Flash-freeze in liquid nitrogen
3. Lyophilize for 24–48 hours
4. Store dried peptide at **-20°C** (short-term) or **-80°C** (long-term)

## References

1. Chan, W.C., White, P.D. (Eds.). *Fmoc Solid Phase Peptide Synthesis: A Practical Approach*. Oxford University Press, 2000.
2. Bodanszky, M., Bodanszky, A. *The Practice of Peptide Synthesis*. Springer-Verlag, 1994.
3. Fields, G.B., et al. "Synthesis of peptides and proteins." *Methods in Enzymology* 289 (1997): 1–87.
4. Cemillán, J.A., et al. "Microwave-assisted peptide synthesis." *Nature Protocols* 1 (2006): 1953–1958.

## Further Reading

- [SPPS Troubleshooting](/learn/peptide-synthesis-troubleshooting/) — Common problems and solutions
- [Solid-Phase Synthesis Overview](/learn/spps/) — Theory and principles
- [Purification Methods](/learn/purification/) — Detailed HPLC protocols
- [Mass Spectrometry](/learn/mass-spectrometry-peptides/) — Analytical characterization
