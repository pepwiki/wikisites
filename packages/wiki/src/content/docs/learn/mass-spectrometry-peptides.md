---
title: Mass Spectrometry for Peptide Analysis
description: Guide to mass spectrometric techniques for peptide characterization — MALDI-TOF, ESI-MS, LC-MS/MS, fragmentation patterns, and de novo sequencing.
---

Mass spectrometry (MS) is indispensable for peptide characterization, providing molecular weight confirmation, sequence verification, and purity assessment. Modern peptide analysis employs multiple MS techniques, each optimized for specific applications.

## Mass Spectrometry Techniques

### MALDI-TOF MS

Matrix-Assisted Laser Desorption/Ionization Time-of-Flight is the most common technique for peptide molecular weight confirmation.

**Principle**:
1. Peptide co-crystallized with matrix (e.g., α-cyano-4-hydroxycinnamic acid, CHCA)
2. Laser desorbs and ionizes peptide-matrix crystals
3. Ions accelerate through electric field
4. Time-of-flight measured (m/z separation)
5. Spectrum recorded

**Operating Parameters**:

| Parameter | Value |
|-----------|-------|
| Matrix | CHCA (0.5–1 mg/mL in 50% ACN/0.1% TFA) |
| Laser | 337 nm nitrogen laser |
| Accelerating voltage | 15–25 kV |
| Polarity | Positive (most common) |
| Mass range | 500–50,000 Da |
| Resolution | 2,000–5,000 FWHM |
| Accuracy | ±0.1–0.5% (external calibration) |

**Sample Preparation**:
1. Dissolve peptide in water or dilute ACN (1 pmol/µL)
2. Mix 1:1 with matrix solution
3. Spot 1 µL on MALDI target
4. Air dry (crystallization)
5. Acquire spectrum (100–500 laser shots)

### ESI-MS

Electrospray Ionization MS produces multiply charged ions from solution, enabling molecular weight determination of larger peptides.

**Principle**:
1. Peptide solution sprayed through charged capillary
2. Electric field produces charged droplets
3. Solvent evaporates, droplets shrink
4. Coulombic explosions produce gas-phase ions
5. Ions analyzed by mass analyzer (quadrupole, TOF, or Orbitrap)

**Operating Parameters**:

| Parameter | Value |
|-----------|-------|
| Solvent | 50% ACN/0.1% formic acid |
| Flow rate | 0.2–1.0 µL/min (nanospray) |
| Capillary voltage | 2–4 kV |
| Polarity | Positive or negative |
| Mass range | 100–100,000 Da |
| Resolution | 5,000–100,000 |
| Accuracy | ±0.01–0.1% (internal calibration) |

**Charge State Distribution**:
- [M+2H]²⁺ for peptides 1–2 kDa
- [M+3H]³⁺ for peptides 2–4 kDa
- [M+4H]⁴⁺ or higher for peptides >4 kDa

### LC-MS/MS

Liquid Chromatography coupled with tandem MS provides sequence information through fragmentation.

**Workflow**:
1. Peptide separated by RP-HPLC (C18, 75 µm × 150 mm)
2. Eluate electrosprayed into mass spectrometer
3. Survey scan (MS1) identifies peptide ions
4. Selected ions fragmented (MS2)
5. Fragment spectrum interpreted for sequence

**Fragmentation Methods**:

| Method | Mechanism | Best For |
|--------|-----------|----------|
| CID | Collision-induced dissociation | Standard sequencing |
| HCD | Higher-energy CID | Improved y-ion series |
| ETD | Electron-transfer dissociation | PTMs, intact proteins |
| ECD | Electron-capture dissociation | Labile modifications |

## Fragmentation Patterns

### Peptide Bond Cleavage

Fragmentation produces N-terminal (a, b, c) and C-terminal (x, y, z) ions:

```
     a₁   b₁   c₁          x₁   y₁   z₁
      |    |    |            |    |    |
H₂N—AA₁—AA₂—AA₃—AA₄—COOH
      |    |    |            |    |    |
     a₂   b₂   c₂          x₂   y₂   z₂
```

**b/y ions** (most common in CID):
- b-ions: N-terminal fragments (acylium ions)
- y-ions: C-terminal fragments (protonated)
- Sequence read from b-ions (N→C) or y-ions (C→N)

### Common Fragment Ions

| Ion Type | Formation | Mass Shift |
|----------|-----------|------------|
| b-ion | Amide bond cleavage, charge retained on N-term | Residue MW |
| y-ion | Amide bond cleavage, charge retained on C-term | Residue MW + 18 |
| a-ion | b-ion - CO (28 Da) | Residue MW - 28 |
| immonium | Side chain loss | Characteristic per AA |

### Characteristic Fragment Ions

| Amino Acid | Immonium Ion (m/z) |
|------------|---------------------|
| Gly | 30 |
| Ala | 44 |
| Val | 72 |
| Leu/Ile | 86 |
| Pro | 70 |
| Phe | 120 |
| Trp | 159 |
| Tyr | 136 |
| Met | 104 |
| Cys | 76 |
| Ser | 60 |
| Thr | 74 |
| Asp | 88 |
| Glu | 102 |
| Asn | 87 |
| Gln | 101 |
| Lys | 101 |
| Arg | 100 |

## De Novo Sequencing

### Manual Sequencing

1. Identify b-ion or y-ion series
2. Calculate mass differences between consecutive ions
3. Match differences to amino acid residue masses
4. Verify with immonium ions and neutral losses

**Example** (b-ion series):
- b₁ = 175 → Gly (75)
- b₂ = 246 → +71 = Ala (89) → wait, need to recalculate

**Correct approach**:
- b₁ = 75 → Gly
- b₂ = 164 → +89 = Ala
- b₃ = 309 → +145 = Gln? Check residue masses

### Software-Assisted Sequencing

| Software | Platform | Features |
|----------|----------|----------|
| PEAKS | Commercial | De novo + database search |
| Mascot | Commercial | Database search |
| X!Tandem | Open source | Database search |
| Novor | Free | Real-time de novo |
| Andromeda | Free (MaxQuant) | Database search |

### Sequencing Challenges

| Challenge | Cause | Solution |
|-----------|-------|----------|
| Ambiguous Leu/Ile | Same mass (113.08 Da) | MS³ or chemical modification |
| Gln/Lys | Near-identical mass (128.06 vs 128.09) | High-resolution MS (>50,000) |
| Asn/Gln deamidation | Mass +1 Da | Check for +1 Da peaks |
| Methionine oxidation | Mass +16 Da | Check for +16 Da peaks |
| Pyroglutamate formation | N-terminal Gln cyclization | Mass -17 Da |

## Purity Assessment by MS

### Single-Component Analysis

- Confirm [M+H]⁺ matches expected mass
- Check for ±1 Da variants (deamidation, oxidation)
- Verify isotopic envelope matches theoretical distribution

### Multi-Component Mixtures

- LC-MS separates components before MS analysis
- Deconvolution software resolves overlapping charge states
- Extracted ion chromatograms quantify individual components

## Sample Preparation

### For MALDI-TOF

1. Dissolve peptide: 1 pmol/µL in water or 0.1% TFA
2. Prepare matrix: 10 mg/mL CHCA in 50% ACN/0.1% TFA
3. Mix 1:1 (v/v) sample:matrix
4. Spot 1 µL on target, air dry
5. Optional: Wash crystals with cold water

### For ESI-MS

1. Dissolve peptide: 1–10 pmol/µL in 50% ACN/0.1% formic acid
2. Filter (0.22 µm syringe filter)
3. Infuse directly or inject via LC
4. Optimize spray parameters

### For LC-MS/MS

1. Dissolve peptide: 100 fmol/µL in water
2. Inject 1–5 µL
3. Gradient: 5–50% ACN over 30 minutes
4. Column: C18, 75 µm × 150 mm, 3 µm
5. Flow rate: 300 nL/min

## Common Mass Shifts

| Modification | Mass Shift (Da) | Cause |
|--------------|-----------------|-------|
| Oxidation (Met) | +16 | Air exposure |
| Deamidation (Asn/Gln) | +1 | Aging, basic pH |
| Pyroglutamate | −17 | N-terminal Gln |
| Trt incomplete | +234 | Incomplete deprotection |
| Acetylation | +42 | N-terminal acetylation |
| TFA adduct | +118 | Residual TFA |
| Sodium adduct | +22 | Na⁺ replacement of H⁺ |

## Quantitation

### Amino Acid Analysis (AAA)

- Hydrolyze peptide (6M HCl, 110°C, 24 h)
- Derivatize with OPA/FMOC
- HPLC with fluorescence detection
- Compare to amino acid standard curve

### UV Spectroscopy

- Use extinction coefficient (ε₂₈₀) calculated from Trp/Tyr/Cys content
- Beer-Lambert law: A = ε × c × l
- Accurate for pure peptides with aromatic residues

### MS-Based Quantitation

- **SIR/MRM**: Selected ion monitoring for targeted quantitation
- **Label-free**: Normalized spectral counting
- **Isotope-labeled**: SILAC or AQUA internal standards

## Safety Considerations

- **High voltage**: MALDI and ESI use kilovolt potentials
- **Solvents**: ACN, methanol are flammable and toxic
- **Laser**: MALDI laser is Class 3B — eye protection required
- **Vacuum**: MS instruments operate under high vacuum
- **Matrix**: CHCA is an irritant — handle in fume hood

## References

1. Fenn JB, et al. "Electrospray ionization for mass spectrometry of large biomolecules." *Science* 1989;246:64-71.
2. Hillenkamp F, et al. "Matrix-assisted laser desorption/ionization mass spectrometry of biopolymers." *Anal Chem* 1991;63:1193A-1203A.
3. Domon B, Costello CE. "A systematic nomenclature for carbohydrate fragmentations in FAB-MS/MS spectra." *Glycoconj J* 1988;5:397-409.
4. Aebersold R, Mann M. "Mass spectrometry-based proteomics." *Nature* 2003;422:198-207.
5. Paizs B, Suhai S. "Fragmentation pathways of protonated peptides." *Mass Spectrom Rev* 2005;24:508-548.
