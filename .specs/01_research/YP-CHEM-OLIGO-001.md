---
document_id: YP-CHEM-OLIGO-001
title: "Oligopeptide Chemistry Fundamentals"
version: "1.0.0"
date: "2026-06-07"
status: APPROVED
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Comprehensive specification of oligopeptide chemistry including nomenclature,
  peptide bond formation thermodynamics, secondary structure hydrogen bonding,
  hydrophobic effects, molecular weight calculation algorithms, charge prediction
  models, and classification taxonomies. Defines the chemical knowledge base for
  both encyclopeptide.com and wikipept.com.
test_vector_ref: "test_vectors/test_vectors_chem.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_chem.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Oligopeptide Chemistry Fundamentals

**Document ID:** YP-CHEM-OLIGO-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Document Header](#1-document-header)
2. [Executive Summary](#2-executive-summary)
3. [Nomenclature and Notation](#3-nomenclature-and-notation)
4. [Theoretical Foundation](#4-theoretical-foundation)
5. [Algorithm Specification](#5-algorithm-specification)
6. [Test Vector Specification](#6-test-vector-specification)
7. [Domain Constraints](#7-domain-constraints)
8. [Bibliography](#8-bibliography)
9. [Knowledge Graph Concepts](#9-knowledge-graph-concepts)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Document Header

### 1.1 Purpose

This Yellow Paper specifies the complete chemical knowledge base required for oligopeptide educational content on encyclopeptide.com and wikipept.com. It establishes authoritative definitions, mathematical models, and computational algorithms for all chemistry-related features.

### 1.2 Scope

Covers the twenty standard amino acids, peptide bond formation, oligopeptide nomenclature (2–50 residues), molecular weight calculations, charge state prediction, isoelectric point computation, extinction coefficient estimation, and structural classification. Does not cover proteins (>50 residues), non-standard amino acids, or post-translational modifications (reserved for future Yellow Papers).

### 1.3 Audience

Content authors writing oligopeptide reference articles, developers implementing chemistry calculation engines, QA engineers validating chemical data integrity, and educators designing curriculum content.

### 1.4 Normative References

- IUPAC-IUBMB Joint Commission on Biochemical Nomenclature (1991)
- Lehninger Principles of Biochemistry, 8th Edition (Nelson & Cox, 2021)
- Biochemistry (Berg, Tymoczko, Gatto, Stryer, 8th Edition, 2015)
- UniProt/Swiss-Prot amino acid database
- Protein Data Bank (PDB) file format specification

### 1.5 Definitions and Acronyms

| Term | Definition                                 |
| ---- | ------------------------------------------ |
| MW   | Molecular Weight                           |
| pI   | Isoelectric Point                          |
| Da   | Dalton (atomic mass unit)                  |
| pKa  | Negative log of acid dissociation constant |
| OD   | Optical Density (absorbance)               |
| ε    | Molar extinction coefficient               |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a precise, authoritative chemistry knowledge base that serves both encyclopedic reference (encyclopeptide.com) and collaborative learning (wikipept.com). The knowledge base must support accurate molecular weight calculations, charge predictions, structural classifications, and biochemical property computations. Errors in chemical data directly undermine educational credibility and may propagate misinformation to students, researchers, and healthcare professionals.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Nomenclature**: Standardized naming conventions for oligopeptides following IUPAC rules
2. **Structural Chemistry**: Peptide bond formation, thermodynamics, and secondary structure principles
3. **Computational Algorithms**: Molecular weight, charge state, pI, and extinction coefficient calculations
4. **Classification Taxonomies**: Peptide categorization by length, chemical properties, and biological activity
5. **Data Integrity**: Validation rules ensuring chemical data accuracy

### 2.3 Key Assumptions

- All calculations assume standard conditions (25°C, 1 atm, aqueous solution) unless otherwise stated
- Standard 20 amino acids only; non-standard residues handled in future extensions
- Monoisotopic masses used for mass spectrometry contexts; average masses for general chemistry
- pKa values from Bjellqvist et al. (1994) unless local environment corrections are specified

### 2.4 Success Criteria

- Molecular weight calculations match reference values within ±0.001 Da
- Charge state predictions agree with Henderson-Hasselbalch calculations to integer precision
- All 20 standard amino acid properties verified against UniProt/Swiss-Prot reference data
- Test vectors pass with 100% accuracy for known oligopeptides

---

## 3. Nomenclature and Notation

### 3.1 Amino Acid Symbols

#### 3.1.1 One-Letter Codes (IUPAC Standard)

| Code | Amino Acid    | Full Name     | Molecular Formula |
| ---- | ------------- | ------------- | ----------------- |
| G    | Glycine       | Glycine       | C₂H₅NO₂           |
| A    | Alanine       | Alanine       | C₃H₇NO₂           |
| V    | Valine        | Valine        | C₅H₁₁NO₂          |
| L    | Leucine       | Leucine       | C₆H₁₃NO₂          |
| I    | Isoleucine    | Isoleucine    | C₆H₁₃NO₂          |
| P    | Proline       | Proline       | C₅H₉NO₂           |
| F    | Phenylalanine | Phenylalanine | C₉H₁₁NO₂          |
| W    | Tryptophan    | Tryptophan    | C₁₁H₁₂N₂O₂        |
| M    | Methionine    | Methionine    | C₅H₁₁NO₂S         |
| S    | Serine        | Serine        | C₃H₇NO₃           |
| T    | Threonine     | Threonine     | C₄H₉NO₃           |
| C    | Cysteine      | Cysteine      | C₃H₇NO₂S          |
| Y    | Tyrosine      | Tyrosine      | C₉H₁₁NO₃          |
| H    | Histidine     | Histidine     | C₆H₉N₃O₂          |
| D    | Aspartic Acid | Aspartate     | C₄H₇NO₄           |
| E    | Glutamic Acid | Glutamate     | C₅H₉NO₄           |
| N    | Asparagine    | Asparagine    | C₄H₈N₂O₃          |
| Q    | Glutamine     | Glutamine     | C₅H₁₀N₂O₃         |
| K    | Lysine        | Lysine        | C₆H₁₄N₂O₂         |
| R    | Arginine      | Arginine      | C₆H₁₄N₄O₂         |

#### 3.1.2 Three-Letter Codes

Three-letter codes are derived by capitalizing the first letter and lowercasing the remaining two: Gly, Ala, Val, Leu, Ile, Pro, Phe, Trp, Met, Ser, Thr, Cys, Tyr, His, Asp, Glu, Asn, Gln, Lys, Arg.

#### 3.1.3 Non-Standard Residue Handling

Non-standard amino acids (e.g., selenocysteine [U], pyrrolysine [O]) are flagged with a `[NON-STANDARD]` tag in content and excluded from default calculation algorithms. Their properties are stored in an extension table with explicit documentation of their origin and metabolic pathway.

### 3.2 Peptide Bond Notation

#### 3.2.1 Sequence Direction

Peptide sequences are written N-terminus → C-terminus (left to right) by convention. Example: `AGSV` denotes Alanine-Glycine-Serine-Valine with a free amino group at the N-terminus and a free carboxyl group at the C-terminus.

#### 3.2.2 Backbone Structure

The repeating backbone unit is:

```
N—Cα—C(=O)—N—Cα—C(=O)—...
```

Each residue contributes:

- Amide nitrogen (N)
- Alpha carbon (Cα) with side chain (R)
- Carbonyl carbon (C=O)

#### 3.2.3 Bond Notation in Formulas

Peptide bond formation is represented as:

```
AA₁ + AA₂ → AA₁-AA₂ + H₂O
```

The peptide bond is a condensation reaction: the carboxyl group of one amino acid reacts with the amino group of the next, releasing one water molecule per bond.

#### 3.2.4 Cyclic Peptides

Cyclic peptides are denoted with a prefix indicating the ring type:

- **Disulfide-bridged**: `[Cys-X-Cys]` or explicit `S-S` notation
- **Head-to-tail**: `cyclo-AA₁-AA₂-...-AAₙ`
- **Side chain-to-backbone**: Explicit bond notation

### 3.3 IUPAC Naming Rules

#### 3.3.1 Systematic Names

Systematic names follow the pattern: `[peptide prefix]-amino acid suffix`

Examples:

- Glycylglycine (Gly-Gly): systematic name for dipeptide
- Alanylvaline (Ala-Val): systematic name for dipeptide
- Glycylglycylglycine (Gly-Gly-Gly): tripeptide

#### 3.3.2 Trivial Names

Many oligopeptides have established trivial names that supersede systematic nomenclature:

- Glutathione: γ-Glu-Cys-Gly (tripeptide)
- Oxytocin: Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH₂ (nonapeptide)
- Vasopressin: Cys-Tyr-Phe-Gln-Asn-Cys-Pro-Arg-Gly-NH₂ (nonapeptide)

#### 3.3.3 Modified Residues

Modified residues are indicated with prefixes:

- N-acetyl: `Ac-` (e.g., Ac-AGSV)
- C-amide: `-NH₂` suffix (e.g., AGSV-NH₂)
- Phospho: `pS`, `pT`, `pY` (e.g., pYGGFL)
- Methyl: `meK`, `meR`

---

## 4. Theoretical Foundation

### 4.1 Peptide Bond Formation Thermodynamics

#### 4.1.1 Reaction Energetics

Peptide bond formation is thermodynamically unfavorable under standard conditions:

```
ΔG°' = +8.0 kJ/mol (approximate)
```

The positive free energy indicates that peptide bond formation is not spontaneous in aqueous solution. In biological systems, this reaction is driven by:

1. **ATP coupling**: Aminoacyl-tRNA synthetases activate amino acids with ATP
2. **Ribosomal catalysis**: The peptidyl transferase center of the ribosome catalyzes bond formation
3. **Substrate channeling**: Proximity effects in the ribosomal exit tunnel

#### 4.1.2 Activation Energy

The activation energy for uncatalyzed peptide bond formation is approximately 80–100 kJ/mol. The ribosome reduces this to approximately 40–50 kJ/mol through transition state stabilization.

#### 4.1.3 Resonance Stabilization

The peptide bond exhibits partial double-bond character due to resonance between the carbonyl oxygen and the amide nitrogen:

```
O=C-NH ↔ O⁻-C=N⁺H
```

This resonance restricts rotation about the C-N bond, creating a planar peptide group. The energy barrier for cis-trans isomerization is approximately 75–85 kJ/mol.

#### 4.1.4 Hydrogen Bonding in Secondary Structure

##### Alpha-Helix

The α-helix is stabilized by hydrogen bonds between the C=O of residue i and the N-H of residue i+4. Key parameters:

- Hydrogen bond energy: approximately -8.0 kJ/mol per bond
- Pitch: 0.54 nm (5.4 residues per turn)
- Rise per residue: 0.15 nm
- Diameter: approximately 0.5 nm
- N→C direction: C-terminus points downward when N-terminus points up

##### Beta-Sheet

β-sheets are stabilized by hydrogen bonds between parallel or antiparallel strands:

- Inter-strand hydrogen bond energy: approximately -8.0 kJ/mol
- Residue rise: approximately 0.35 nm per residue (parallel), 0.34 nm (antiparallel)
- Twist: right-handed twist of approximately 0–30° per strand
- Side chains alternate above and below the sheet plane

##### Beta-Turn

β-turns reverse the chain direction in 4 residues, stabilized by a hydrogen bond between residue i and residue i+3:

- Hydrogen bond energy: approximately -5.0 kJ/mol
- Types: I, II, I', II', VIII (defined by φ, ψ angles)
- Often contain Pro and Gly residues

#### 4.1.5 Hydrophobic Effects

The hydrophobic effect is the dominant driving force for peptide folding in aqueous solution:

- **Transfer free energy**: Approximately -3.5 kJ/mol per residue transferred from water to hydrophobic environment
- **Entropy-driven**: Water molecules form ordered cages around hydrophobic solutes, reducing system entropy
- **Surface area**: Burial of hydrophobic surface area correlates with folding stability
- **Kyte-Doolittle scale**: Quantifies hydrophobicity per amino acid (see domain constraints)

### 4.2 Structural Stability Factors

#### 4.2.1 Van der Waals Interactions

- Energy: approximately -2.0 to -4.0 kJ/mol per contact
- Distance-dependent: optimal at sum of van der Waals radii (approximately 3.5–4.0 Å)
- Numerous but individually weak; collectively significant

#### 4.2.2 Electrostatic Interactions

- Salt bridges (ion pairs): approximately -5.0 to -10.0 kJ/mol
- Distance-dependent: inversely proportional to dielectric constant
- pH-dependent: ionization state affects charge complementarity

#### 4.2.3 Disulfide Bonds

- Covalent bonds between Cys residues: approximately -250 kJ/mol
- Stabilize folded structure in oxidizing environments
- Common in secreted peptides (insulin, oxytocin)

### 4.3 Classification of Oligopeptides

#### 4.3.1 Length-Based Classification

| Category     | Residue Count | Examples                      |
| ------------ | ------------- | ----------------------------- |
| Dipeptide    | 2             | Gly-Ala                       |
| Tripeptide   | 3             | Glutathione                   |
| Tetrapeptide | 4             | Thyrotropin-releasing hormone |
| Pentapeptide | 5             | Leu-enkephalin                |
| Hexapeptide  | 6             | Arg-Gly-Asp-Ser-Val-Arg       |
| Heptapeptide | 7             | Substance P fragment          |
| Octapeptide  | 8             | Angiotensin II                |
| Nonapeptide  | 9             | Oxytocin                      |
| Decapeptide  | 10            | Bombesin fragment             |
| Oligopeptide | 11–50         | Various regulatory peptides   |

#### 4.3.2 Chemical Property Classification

- **Hydrophobic**: Predominantly nonpolar residues (Ala, Val, Leu, Ile, Phe, Trp, Met)
- **Hydrophilic**: Predominantly polar residues (Ser, Thr, Asn, Gln, Cys, Tyr)
- **Charged**: Net charge ≠ 0 at physiological pH (contains Asp, Glu, Lys, Arg, His)
- **Amphipathic**: Mixed hydrophobic and hydrophilic regions
- **Cyclic**: Ring structure (disulfide-bridged or head-to-tail)
- **Linear**: No ring structure

#### 4.3.3 Functional Classification

- **Neurotransmitter**: Enkephalins, Substance P, Neuropeptide Y
- **Hormone**: Oxytocin, Vasopressin, Insulin A/B chains
- **Antimicrobial**: Defensins, Magainins, Cecropins
- **Cell-adhesion**: RGD-containing peptides
- **Signaling**: Bradykinin, Angiotensin fragments

---

## 5. Algorithm Specification

### 5.1 Peptide Classification Algorithm

#### 5.1.1 Input

```typescript
interface ClassificationInput {
  sequence: string; // One-letter amino acid codes
  residueCount: number; // Number of residues
  bonds?: number; // Number of peptide bonds (default: residueCount - 1)
  cyclic?: boolean; // Whether peptide is cyclic
  disulfideBonds?: number; // Number of disulfide bridges
}
```

#### 5.1.2 Classification Logic

```
FUNCTION classifyPeptide(input):
  VALIDATE input.sequence contains only valid amino acid characters
  VALIDATE input.residueCount matches length of input.sequence

  // Length-based classification
  IF input.residueCount == 2 THEN
    lengthCategory = "dipeptide"
  ELSE IF input.residueCount == 3 THEN
    lengthCategory = "tripeptide"
  ELSE IF input.residueCount == 4 THEN
    lengthCategory = "tetrapeptide"
  ELSE IF input.residueCount == 5 THEN
    lengthCategory = "pentapeptide"
  ELSE IF input.residueCount == 6 THEN
    lengthCategory = "hexapeptide"
  ELSE IF input.residueCount == 7 THEN
    lengthCategory = "heptapeptide"
  ELSE IF input.residueCount == 8 THEN
    lengthCategory = "octapeptide"
  ELSE IF input.residueCount == 9 THEN
    lengthCategory = "nonapeptide"
  ELSE IF input.residueCount == 10 THEN
    lengthCategory = "decapeptide"
  ELSE IF input.residueCount >= 11 AND input.residueCount <= 50 THEN
    lengthCategory = "oligopeptide"
  ELSE
    lengthCategory = "peptide" (generic)

  // Chemical property classification
  hydrophobicCount = COUNT hydrophobic residues (A,V,L,I,P,F,W,M)
  hydrophilicCount = COUNT polar residues (S,T,C,Y,N,Q)
  chargedCount = COUNT charged residues (D,E,K,R,H)
  aromaticCount = COUNT aromatic residues (F,W,Y)

  IF hydrophobicCount / input.residueCount > 0.6 THEN
    chemicalClass = "hydrophobic"
  ELSE IF chargedCount / input.residueCount > 0.6 THEN
    chemicalClass = "charged"
  ELSE IF hydrophilicCount / input.residueCount > 0.6 THEN
    chemicalClass = "hydrophilic"
  ELSE
    chemicalClass = "amphipathic"

  RETURN { lengthCategory, chemicalClass }
END FUNCTION
```

#### 5.1.3 Output

```typescript
interface ClassificationOutput {
  lengthCategory: string; // dipeptide, tripeptide, ..., oligopeptide
  chemicalClass: string; // hydrophobic, hydrophilic, charged, amphipathic
  residueRange: [number, number]; // Min/max residues for this category
}
```

### 5.2 Molecular Weight Calculation Algorithm

#### 5.2.1 Input

```typescript
interface MolecularWeightInput {
  sequence: string; // One-letter amino acid codes
  cyclic?: boolean; // Whether peptide is cyclic
  disulfideBonds?: number; // Number of disulfide bridges
  modifications?: Modification[]; // Optional residue modifications
}
```

#### 5.2.2 Residue Mass Table

Monoisotopic residue masses (Da), representing the mass of each amino acid as it exists in a peptide chain (after loss of water):

| Residue | Mass (Da) | Residue | Mass (Da) |
| ------- | --------- | ------- | --------- |
| G       | 57.02146  | S       | 87.03203  |
| A       | 71.03711  | T       | 101.04768 |
| V       | 99.06841  | C       | 103.00919 |
| L       | 113.08406 | Y       | 163.06333 |
| I       | 113.08406 | H       | 137.05891 |
| P       | 97.05276  | D       | 115.02694 |
| F       | 147.06841 | E       | 129.04259 |
| W       | 186.07931 | N       | 114.04293 |
| M       | 131.04049 | Q       | 128.05858 |
| K       | 128.09496 | R       | 156.10111 |

#### 5.2.3 Calculation Logic

```
FUNCTION calculateMolecularWeight(input):
  // Step 1: Sum residue masses
  totalMass = 0
  FOR EACH character char IN input.sequence:
    IF char NOT IN residueMassTable THEN
      THROW Error("Invalid residue: " + char)
    totalMass = totalMass + residueMassTable[char]

  // Step 2: Add termini masses (H and OH for linear peptides)
  IF NOT input.cyclic THEN
    totalMass = totalMass + 1.00794    // H at N-terminus
    totalMass = totalMass + 15.99491   // OH at C-terminus

  // Step 3: Adjust for disulfide bonds
  // Each disulfide bond removes 2 hydrogen atoms (2 × 1.00794 Da)
  IF input.disulfideBonds IS NOT NULL THEN
    totalMass = totalMass - (input.disulfideBonds * 2.01588)

  // Step 4: Apply modifications
  IF input.modifications IS NOT NULL THEN
    FOR EACH modification IN input.modifications:
      totalMass = totalMass + modification.massShift

  RETURN { molecularWeight: ROUND(totalMass, 4), unit: "Da" }
END FUNCTION
```

#### 5.2.4 Average Mass Variant

For average molecular weight calculations, use weighted isotopic abundances:

```
averageMass = SUM(residueAverageMass[i]) + terminiAverageMass - bondWaterLoss
```

Where `residueAverageMass` uses the IUPAC average atomic weights rather than monoisotopic masses.

### 5.3 Charge Prediction Algorithm

#### 5.3.1 Input

```typescript
interface ChargeInput {
  sequence: string; // One-letter amino acid codes
  pH: number; // Solution pH (0.0–14.0)
  temperature?: number; // Temperature in °C (default: 25)
  ionicStrength?: number; // Ionic strength in M (default: 0.1)
}
```

#### 5.3.2 pKa Values

Standard pKa values at 25°C, ionic strength 0.1 M:

| Ionizable Group         | pKa Value |
| ----------------------- | --------- |
| N-terminus (α-NH₃⁺)     | 9.69      |
| C-terminus (α-COOH)     | 2.34      |
| Aspartate (β-COOH)      | 3.65      |
| Glutamate (γ-COOH)      | 4.25      |
| Cysteine (thiol)        | 8.18      |
| Tyrosine (phenol)       | 10.07     |
| Lysine (ε-NH₃⁺)         | 10.53     |
| Arginine (guanidinium)  | 12.48     |
| Histidine (imidazolium) | 6.00      |

#### 5.3.3 Calculation Logic

```
FUNCTION calculateCharge(input):
  netCharge = 0.0

  // N-terminus contribution
  pKa = 9.69
  fractionProtonated = 1.0 / (1.0 + POWER(10, input.pH - pKa))
  netCharge = netCharge + fractionProtonated  // +1 when protonated

  // C-terminus contribution
  pKa = 2.34
  fractionDeprotonated = POWER(10, input.pH - pKa) / (1.0 + POWER(10, input.pH - pKa))
  netCharge = netCharge - fractionDeprotonated  // -1 when deprotonated

  // Side chain contributions
  sideChainPkaMap = {
    "D": 3.65, "E": 4.25, "C": 8.18, "Y": 10.07,
    "K": 10.53, "R": 12.48, "H": 6.00
  }

  FOR EACH residue IN input.sequence:
    IF residue IN sideChainPkaMap THEN
      pKa = sideChainPkaMap[residue]
      fractionDeprotonated = POWER(10, input.pH - pKa) / (1.0 + POWER(10, input.pH - pKa))

      IF residue IN ["D", "E", "C", "Y"] THEN
        // Acidic residues: negative when deprotonated
        netCharge = netCharge - fractionDeprotonated
      ELSE IF residue IN ["K", "R", "H"] THEN
        // Basic residues: positive when protonated
        fractionProtonated = 1.0 - fractionDeprotonated
        netCharge = netCharge + fractionProtonated

  RETURN {
    netCharge: ROUND(netCharge, 2),
    chargeStates: generateChargeStates(netCharge),
    majorChargeState: ROUND(netCharge)
  }
END FUNCTION
```

#### 5.3.4 Charge State Distribution

For mass spectrometry applications, the algorithm generates charge state distributions:

```
FUNCTION generateChargeStates(netCharge):
  majorState = ROUND(netCharge)
  states = [majorState - 1, majorState, majorState + 1]
  RETURN FILTER states WHERE state >= 0
END FUNCTION
```

### 5.4 Isoelectric Point Calculation

#### 5.4.1 Algorithm

The isoelectric point (pI) is the pH at which the peptide carries no net charge.

```
FUNCTION calculatePI(input):
  // Collect all ionizable pKa values
  pKaValues = []
  pKaValues.APPEND(input.sequence.N_TERMINUS_PKA)  // 9.69
  pKaValues.APPEND(input.sequence.C_TERMINUS_PKA)  // 2.34

  FOR EACH residue IN input.sequence:
    IF residue IN sideChainPkaMap THEN
      pKaValues.APPEND(sideChainPkaMap[residue])

  SORT pKaValues ASCENDING

  // Calculate charge at each pKa midpoint
  FOR i FROM 0 TO LENGTH(pKaValues) - 2:
    testPH = (pKaValues[i] + pKaValues[i+1]) / 2.0
    chargeAtTestPH = calculateCharge({ sequence: input.sequence, pH: testPH })

    IF ABS(chargeAtTestPH.netCharge) < 0.01 THEN
      RETURN { pI: ROUND(testPH, 2) }

  // Fallback: binary search for pH where charge = 0
  lowPH = 0.0
  highPH = 14.0
  FOR iteration FROM 1 TO 50:
    midPH = (lowPH + highPH) / 2.0
    charge = calculateCharge({ sequence: input.sequence, pH: midPH })
    IF charge.netCharge > 0 THEN
      lowPH = midPH
    ELSE
      highPH = midPH
  RETURN { pI: ROUND(midPH, 2) }
END FUNCTION
```

### 5.5 Extinction Coefficient Calculation

#### 5.5.1 Pace Method (1995)

The molar extinction coefficient at 280 nm is estimated from the number of aromatic residues:

```
ε₂₈₀ = (nTrp × 5500) + (nTyr × 1280) + (nCystine × 125)
```

Where:

- nTrp = number of Tryptophan residues
- nTyr = number of Tyrosine residues
- nCystine = number of disulfide bonds (cystine residues)

#### 5.5.2 Input

```typescript
interface ExtinctionInput {
  sequence: string;
  disulfideBonds?: number; // Default: 0
}
```

#### 5.5.3 Calculation Logic

```
FUNCTION calculateExtinction(input):
  nTrp = COUNT(input.sequence, "W")
  nTyr = COUNT(input.sequence, "Y")
  nCystine = input.disulfideBonds OR 0

  epsilon = (nTrp × 5500) + (nTyr × 1280) + (nCystine × 125)

  RETURN {
    extinction280: epsilon,
    unit: "M^-1 cm^-1",
    method: "Pace et al., 1995"
  }
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

All test vectors are defined in `test_vectors/test_vectors_chem.toml`. The test vector set includes:

| Category               | Vector Count | Description                                   |
| ---------------------- | ------------ | --------------------------------------------- |
| Molecular Weight       | 10           | Known oligopeptides with verified MW values   |
| Charge State           | 8            | pH-dependent charge calculations              |
| Classification         | 8            | Length and chemical property classification   |
| Isoelectric Point      | 5            | pI calculations for known peptides            |
| Extinction Coefficient | 5            | ε₂₈₀ calculations for peptides with aromatics |
| **Total**              | **42**       |                                               |

### 6.2 Validation Criteria

1. Molecular weight vectors must match within tolerance of ±0.001 Da
2. Charge state vectors must agree with Henderson-Hasselbalch to 2 decimal places
3. Classification vectors must correctly identify all categories
4. pI vectors must match within ±0.1 pH units
5. Extinction coefficient vectors must match within ±100 M⁻¹cm⁻¹

---

## 7. Domain Constraints

### 7.1 Precision Requirements

All domain constraints are defined in `domain_constraints/domain_constraints_chem.toml`. Key constraints:

| Parameter              | Precision     | Tolerance    |
| ---------------------- | ------------- | ------------ |
| Monoisotopic MW        | ±0.001 Da     | ±0.001 Da    |
| Average MW             | ±0.01 Da      | ±0.01 Da     |
| Structural coordinates | ±0.001 Å      | ±0.001 Å     |
| Bond angles            | ±0.1°         | ±0.5°        |
| Charge calculation     | Exact integer | 0.01         |
| pI calculation         | ±0.1 pH       | ±0.1 pH      |
| Extinction coefficient | ±100 M⁻¹cm⁻¹  | ±100 M⁻¹cm⁻¹ |

### 7.2 Validation Rules

1. **Formula validation**: Molecular formula must have integer atom counts
2. **MW vs. formula**: Molecular weight must agree with formula within tolerance
3. **Charge at pI**: Net charge at computed pI must be zero within tolerance
4. **Sequence validation**: All residues must be valid standard amino acids

### 7.3 Unit Conventions

| Property | Unit                  | Alternative       |
| -------- | --------------------- | ----------------- |
| Mass     | Daltons (Da)          | —                 |
| Length   | Angstroms (Å)         | nm (×0.1)         |
| Angle    | Degrees (°)           | radians           |
| pH       | Dimensionless         | —                 |
| Charge   | Elementary charge (e) | —                 |
| Energy   | kJ/mol                | kcal/mol (÷4.184) |

---

## 8. Bibliography

### 8.1 Core Chemistry References

1. Nelson, D. L., & Cox, M. M. (2021). _Lehninger Principles of Biochemistry_ (8th ed.). W.H. Freeman. ISBN: 978-1319228002.

2. Berg, J. M., Tymoczko, J. L., Gatto, G. J., & Stryer, L. (2015). _Biochemistry_ (8th ed.). W.H. Freeman. ISBN: 978-1319228002.

3. Voet, D., & Voet, J. G. (2016). _Biochemistry_ (4th ed.). Wiley. ISBN: 978-1118914433.

4. Kyte, J., & Doolittle, R. F. (1982). A simple method for displaying the hydropathic character of a protein. _Journal of Molecular Biology_, 157(1), 105–132. doi:10.1016/0022-2836(82)90515-0

5. Pace, C. N., Vajdos, F., Fee, L., Grimsley, G., & Gray, T. (1995). How to measure and predict the molar absorption coefficient of a protein. _Protein Science_, 4(11), 2411–2423. doi:10.1002/pro.5560041120

6. Chou, P. Y., & Fasman, G. D. (1974). Conformational parameters for amino acid residues in proteins. _Biochemistry_, 13(2), 211–222. doi:10.1021/bi00699a001

7. Pauling, L., & Corey, R. B. (1951). Atomic coordinates and structure factors for two helical configurations of polypeptide chains. _Proceedings of the National Academy of Sciences_, 37(5), 251–256.

8. Ramachandran, G. N., Ramakrishnan, C., & Sasisekharan, V. (1963). Stereochemistry of polypeptide chain configurations. _Journal of Molecular Biology_, 7(1), 95–99.

### 8.2 Nomenclature References

9. IUPAC-IUBMB Joint Commission on Biochemical Nomenclature. (1991). Nomenclature and symbolism for amino acids and peptides. _Pure and Applied Chemistry_, 63(5), 799–819.

10. Biochemical Nomenclature and Nomenclature Commission of IUPAC and IUBMB. (1983). Symbols for amino acid derivatives and peptides. _Journal of Biological Chemistry_, 258, 8935–8938.

11. Lehmann, M. S., & Palm, W. (1986). The nomenclature of the peptide bond. _International Journal of Peptide and Protein Research_, 27(5), 475–480.

### 8.3 Computational Chemistry References

12. Bjellqvist, B., Basse, B., Olsen, E., & Marcel, J. C. (1994). Reference values for immobilized pH gradient isoelectric focusing. _Electrophoresis_, 15(8-9), 529–538.

13. Gasteiger, E., Hoogland, C.,Gattiker, A., Duvaud, S., Wilkins, M. R., Appel, R. D., & Bairoch, A. (2005). Protein identification and analysis tools on the ExPASy server. In _The Proteomics Protocols Handbook_ (pp. 571–607). Humana Press.

14. Wilkins, M. R., Gasteiger, E., Bairoch, A., Sanchez, J. C., Tyson, K. L., Moller, H., & Hochstrasser, D. F. (1995). Protein characterization and electrophoresis on the World Wide Web. _Electrophoresis_, 16(1), 1090–1093.

15. Crockford, D. J., Holmes, E., Lindon, J. C., & Nicholson, J. K. (2006). Statistical heterospectroscopy (SHY): An approach to the integrated analysis of analytical NMR and HPLC-MS data sets. _Analytical Chemistry_, 78(12), 4204–4211.

### 8.4 Structural Biology References

16. Lovell, S. C., Davis, I. W., Arendall, W. B., de Bakker, P. I. W., Word, J. M., Prisant, M. G., Richardson, J. S., & Richardson, D. C. (2003). Structure validation by Cα geometry: φ,ψ and Cβ deviation. _Proteins: Structure, Function, and Bioinformatics_, 50(3), 437–450.

17. Engh, R. A., & Huber, R. (1991). Accurate bond and angle parameters for X-ray protein structure refinement. _Acta Crystallographica Section A_, 47(4), 392–400.

18. Stewart, J. M., Young, J. D., & Diamond, S. E. (1990). _Solid Phase Peptide Synthesis_. Pierce Chemical Company.

19. Tanford, C. (1980). _The Hydrophobic Effect: Formation of Micelles and Biological Membranes_. Wiley-Interscience.

20. Fersht, A. R. (1977). _Enzyme Structure and Mechanism_. W.H. Freeman.

### 8.5 Peptide Chemistry References

21. Merrifield, R. B. (1963). Solid phase peptide synthesis. I. The synthesis of a tetrapeptide. _Journal of the American Chemical Society_, 85(14), 2149–2154.

22. Bodanszky, M., & Bodanszky, A. (1984). _The Practice of Peptide Synthesis_. Springer-Verlag.

23. Goodman, M., Ro, S., & Shioiri, T. (1995). Peptide chemistry. _Chemical Reviews_, 95(5), 1525–1594.

24. Kiso, Y. (1993). Peptide chemistry and drug design. _Biopolymers_, 33(9), 1337–1343.

25. Vetter, D., & Sauer, D. (1995). Peptide chemistry: A practical approach. In R. H. Pain (Ed.), _Mechanisms of Protein Folding_ (pp. 48–82). Oxford University Press.

### 8.6 Mass Spectrometry References

26. Mann, M., Hendrickson, R. C., & Pandey, A. (2001). Analysis of proteins and proteomes by mass spectrometry. _Annual Review of Biochemistry_, 70(1), 437–465.

27. Roepstorff, P., & Fohlman, J. (1984). Proposal for a common nomenclature for sequence ions in mass spectra of peptides. _Biomedical Mass Spectrometry_, 11(11), 601.

28. Biemann, K. (1988). Contributions of mass spectrometry to peptide and protein structure. _Analytical Chemistry_, 60(5), 295A–302A.

29. Aebersold, R., & Mann, M. (2003). Mass spectrometry-based proteomics. _Nature_, 422(6928), 198–207.

30. Fenn, J. B., Mann, M., Meng, C. K., Wong, S. F., & Whitehouse, C. M. (1989). Electrospray ionization for mass spectrometry of large biomolecules. _Science_, 246(4926), 64–71.

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English             | Chinese (ZH) | Russian (RU)           | German (DE)             | French (FR)          | Japanese (JP)              |
| ------------------- | ------------ | ---------------------- | ----------------------- | -------------------- | -------------------------- |
| Peptide             | 肽           | пептид                 | Peptid                  | Peptide              | ペプチド                   |
| Amino acid          | 氨基酸       | аминокислота           | Aminosäure              | Acide aminé          | アミノ酸                   |
| Peptide bond        | 肽键         | пептидная связь        | Peptidbindung           | Liaison peptidique   | ペプチド結合               |
| Oligopeptide        | 寡肽         | олигопептид            | Oligopeptid             | Oligopeptide         | オリゴペプチド             |
| Molecular weight    | 分子量       | молекулярная масса     | Molekulargewicht        | Poids moléculaire    | 分子量                     |
| Isoelectric point   | 等电点       | изоэлектрическая точка | Isoelektrischer Punkt   | Point isoélectrique  | 等電点                     |
| Secondary structure | 二级结构     | вторичная структура    | Sekundärstruktur        | Structure secondaire | セカンダリーストラクチャー |
| Hydrogen bond       | 氢键         | водородная связь       | Wasserstoffbrückbindung | Liaison hydrogène    | 水素結合                   |
| Hydrophobic effect  | 疏水效应     | гидрофобный эффект     | Hydrophobischer Effekt  | Effet hydrophobe     | 疏水効果                   |

### 9.2 Knowledge Graph Nodes

| Node Type              | Description                    | Relationships                                            |
| ---------------------- | ------------------------------ | -------------------------------------------------------- |
| `AminoAcid`            | Individual amino acid entity   | `hasProperty`, `participatesIn`, `classifiedAs`          |
| `Peptide`              | Oligopeptide entity            | `containsResidue`, `hasProperty`, `biologicallyActiveAs` |
| `PeptideBond`          | Chemical bond between residues | `connects`, `hasEnergy`, `exhibitsResonance`             |
| `SecondaryStructure`   | Alpha-helix, beta-sheet, turn  | `stabilizedBy`, `containsResidue`, `hasEnergy`           |
| `ChemicalProperty`     | Hydrophobicity, charge, pI     | `computedFrom`, `dependsOn`, `measuredAs`                |
| `CalculationAlgorithm` | MW, charge, pI algorithms      | `computes`, `requiresInput`, `producesOutput`            |

### 9.3 Cross-References

- Algorithm outputs feed into `YP-BIO-OLIGO-001` for pharmacological property prediction
- Structural data connects to `YP-WEB-TECH-001` for 3D visualization components
- Classification taxonomy informs `YP-EDU-CONTENT-001` for content organization

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] All 20 standard amino acids documented with one-letter codes, three-letter codes, molecular formulae, and residue masses
- [ ] Peptide bond formation thermodynamics fully specified
- [ ] Secondary structure hydrogen bonding parameters documented
- [ ] Hydrophobic effect theory covered
- [ ] All calculation algorithms (MW, charge, pI, ε) specified with pseudocode

### 10.2 Accuracy

- [ ] Residue masses verified against UniProt/Swiss-Prot reference values
- [ ] pKa values match Bjellqvist et al. (1994) and EMBOSS tables
- [ ] Test vectors pass with 100% accuracy
- [ ] Molecular weight calculations match known values within ±0.001 Da
- [ ] Charge predictions agree with Henderson-Hasselbalch to integer precision

### 10.3 Consistency

- [ ] Units consistent throughout (Da, Å, °, pH, e, kJ/mol)
- [ ] Naming conventions follow IUPAC-IUBMB standards
- [ ] Classification taxonomies are mutually exclusive and collectively exhaustive
- [ ] Algorithm inputs/outputs match domain constraint specifications

### 10.4 Traceability

- [ ] All algorithms traceable to peer-reviewed sources
- [ ] Test vectors traceable to Yellow Paper sections
- [ ] Domain constraints traceable to IUPAC standards
- [ ] Bibliography includes DOIs where available

### 10.5 Usability

- [ ] Nomenclature section provides clear examples
- [ ] Algorithm pseudocode is implementation-ready
- [ ] Knowledge graph concepts enable content linking
- [ ] Cross-lingual terms support i18n requirements
