---
title: "SPPS Protocol — Solid-Phase Peptide Synthesis Guide"
description: "Advanced guide to solid-phase peptide synthesis (SPPS), including Fmoc strategy, coupling reagents, resin selection, and purification for difficult sequences."
---

Solid-phase peptide synthesis (SPPS) is the standard method for laboratory-scale peptide production. Developed by Bruce Merrifield in the 1960s (Nobel Prize, 1984), SPPS enables efficient assembly of peptide chains on an insoluble polymer support through iterative coupling and deprotection cycles.

## Overview

SPPS proceeds from C-terminus to N-terminus. The growing peptide chain is anchored to a resin bead via its C-terminal amino acid. Each cycle involves:

1. Fmoc deprotection (removes N-terminal protecting group)
2. Washing (removes excess reagents)
3. Coupling (activates and adds next amino acid)
4. Washing (removes unreacted amino acid)
5. Repetition until sequence is complete
6. Cleavage from resin and global deprotection

## Materials

### Resins

| Resin | C-Terminal | Application |
|-------|------------|-------------|
| Wang Resin | Free acid | Standard SPPS |
| Rink Amide MBHA Resin | Amide | C-terminal amide peptides |
| 2-Chlorotrityl Chloride Resin | Free acid/ester | Fragments, sensitive sequences |
| HMPB-ChemMatrix | Free acid | Long peptides, high loading |

### Fmoc-Amino Acids

Standard Fmoc-amino acids with side chain protecting groups:

| Amino Acid | Side Chain Protecting Group |
|------------|----------------------------|
| Asp, Glu | OtBu (tert-butyl ester) |
| Lys | Boc (tert-butyloxycarbonyl) |
| Arg | Pbf (2,2,4,6,7-pentamethyldihydrobenzofuran-5-sulfonyl) |
| Cys | Trt (trityl) |
| His | Trt |
| Asn, Gln | Trt |
| Ser, Thr | tBu (tert-butyl ether) |
| Trp | Boc |

### Coupling Reagents

| Reagent | Type | Use Case |
|---------|------|----------|
| HBTU | Uronium | Standard coupling |
| HATU | Uronium | Difficult couplings, sterically hindered AA |
| DIC | Carbodiimide | Green chemistry, easy workup |
| PyBOP | Phosphonium | Sterically hindered sequences |
| Oxyma Pure | Additive | Non-explosive HOBt alternative |

### Solvents and Reagents

- **DMF** (N,N-dimethylformamide): Primary coupling solvent
- **DCM** (dichloromethane): Swelling, deprotection
- **Piperidine** (20% in DMF): Fmoc deprotection
- **DIPEA** (N,N-diisopropylethylamine): Base for coupling
- **TFA** (trifluoroacetic acid): Cleavage and deprotection
- **TIS** (triisopropylsilane): Carbocation scavenger
- **H₂O**: Carbocation scavenger

## Step-by-Step Protocol

### Step 1: Resin Preparation

1. Weigh resin (0.1–1.0 mmol scale)
2. Swell in DMF for 30 minutes (10 mL/g resin)
3. Wash with DMF (3 × 30 seconds)
4. Optional: Calculate loading capacity (typically 0.3–1.0 mmol/g)

### Step 2: Fmoc Deprotection

1. Remove DMF from reaction vessel
2. Add 20% piperidine in DMF (10 mL/g resin)
3. Stir or agitate for 5 minutes (first deprotection)
4. Remove piperidine solution
5. Add fresh 20% piperidine in DMF
6. Stir or agitate for 15 minutes (second deprotection)
7. **Monitor**: UV absorbance at 301 nm (dibenzofulvene-piperidine adduct, ε = 7,800 M⁻¹cm⁻¹)
8. Wash with DMF (5 × 30 seconds)

### Step 3: Coupling

1. Dissolve Fmoc-amino acid (5 equiv) in DMF
2. Add HBTU (4.5 equiv) and DIPEA (10 equiv)
3. Pre-activate for 2–5 minutes (solution turns pale yellow)
4. Add activated solution to resin
5. Stir or agitate for 15–60 minutes
6. **Monitor**: Kaiser test (ninhydrin) — blue color = incomplete coupling
7. Wash with DMF (5 × 30 seconds)

### Step 4: Repetition

Repeat Steps 2–3 for each amino acid in the sequence (C→N direction).

### Step 5: Final Fmoc Removal

1. Perform final Fmoc deprotection (Step 2)
2. Wash extensively with DMF (5 × 30 seconds)
3. Wash with DCM (3 × 30 seconds)
4. Dry under vacuum or nitrogen

### Step 6: Cleavage and Deprotection

#### Standard Cleavage Cocktail

| Component | Amount | Purpose |
|-----------|--------|---------|
| TFA | 95% (v/v) | Cleavage agent |
| TIS | 2.5% (v/v) | Carbocation scavenger |
| H₂O | 2.5% (v/v) | Carbocation scavenger |

#### Procedure

1. Add cleavage cocktail to resin (10 mL/g resin)
2. Stir at room temperature for 1–3 hours
3. Filter resin, wash with TFA (2 × 5 mL/g)
4. Combine filtrates
5. Precipitate peptide by adding cold diethyl ether (10× volume)
6. Centrifuge (5,000 × g, 5 minutes)
7. Discard ether, dissolve pellet in water/ACN
8. Lyophilize

#### Special Scavengers

| Amino Acid | Required Scavenger | Amount |
|------------|-------------------|--------|
| Trp | EDT (ethanedithiol) | 2.5% |
| Met | EDT + thioanisole | 2.5% each |
| Cys | Thioanisole + EDT | 2.5% each |
| Arg (Pbf) | TIS (excess) | 5% |

### Step 7: Purification

See [HPLC Purification Protocol](/learn/hplc-purification).

## Quality Control

### Analytical HPLC

- **Column**: C18, 4.6 × 150 mm, 5 µm
- **Mobile phase**: A = 0.1% TFA/H₂O; B = 0.1% TFA/ACN
- **Gradient**: 5–65% B over 30 minutes
- **Flow rate**: 1 mL/min
- **Detection**: UV at 220 nm (amide bond) and 280 nm (aromatic)
- **Target purity**: >95% for research; >98% for clinical

### Mass Spectrometry (MALDI-TOF)

- Confirm molecular weight matches theoretical value
- Check for incomplete deprotection (mass + 18 Da per Trt group)
- Check for deletion sequences (mass ± 1 residue)

### Amino Acid Analysis

- Hydrolyze peptide (6M HCl, 110°C, 24 hours)
- Quantify individual amino acids by HPLC or CE
- Compare to expected composition

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Incomplete coupling | Steric hindrance | Use HATU, increase coupling time, double coupling |
| Incomplete deprotection | Old piperidine | Use fresh piperidine, extend time |
| Truncated sequences | Deletion at difficult step | Use pseudoproline dipeptides |
| Low yield | Over-cleavage | Reduce TFA time, check scavengers |
| Aggregation | Hydrophobic sequence | Use DMSO as co-solvent, microwave heating |
| Oxidation | Cys/Met exposed | Add EDT, thioanisole to cleavage cocktail |

## Safety Considerations

- **TFA**: Corrosive, volatile — use fume hood, PPE
- **DMF**: Reproductive toxin — avoid skin contact
- **Piperidine**: Flammable, corrosive — use fume hood
- **HATU**: Explosive when dry — store cold, handle carefully
- **DCM**: Suspected carcinogen — use fume hood

## Scale-Up Considerations

| Scale | Resin Amount | Coupling Volume | Cleavage Volume |
|-------|-------------|-----------------|-----------------|
| Lab (0.1 mmol) | 0.1–0.3 g | 5–10 mL | 10–20 mL |
| Pilot (1 mmol) | 1–3 g | 50–100 mL | 100–200 mL |
| Production (10 mmol) | 10–30 g | 500–1000 mL | 1–2 L |

High-purity Fmoc-amino acids and coupling reagents for SPPS are available from [Kingston Peptides](https://kingstonpeptides.com).

## References

1. Merrifield RB. "Solid phase peptide synthesis." *Science* 1986;232:341-347.
2. Fields GB, Noble RL. "Solid phase peptide synthesis utilizing 9-fluorenylmethoxycarbonyl amino acids." *Int J Pept Protein Res* 1990;35:161-214.
3. Wellings DA, Atherton E. "Standard Fmoc strategies." *Methods Enzymol* 1997;289:44-67.
4. El-Faham A, Albericio F. "Peptide coupling reagents: more than a lemon in the kitchen." *Chem Rev* 2011;111:6557-6602.
5. Marder O, Albericio F. "Practical aspects of modern SPPS." *J Pept Sci* 2003;9:1-10.
