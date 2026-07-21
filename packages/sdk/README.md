# peptide-mw-calculator

Zero-dependency peptide molecular weight calculator. Calculate monoisotopic molecular weight and molecular formula from amino acid sequences.

## Install

```bash
npm install peptide-mw-calculator
```

## Usage

```typescript
import { calculateMolecularWeight, calculateMolecularFormula } from 'peptide-mw-calculator';

// Calculate molecular weight
const mw = calculateMolecularWeight('YGGFL');
console.log(mw); // 555.62 (Leu-enkephalin)

// Calculate molecular formula
const formula = calculateMolecularFormula('YGGFL');
console.log(formula); // "C₂₈H₃₇N₅O₇"
```

## Supported Amino Acids

All 20 standard amino acids (1-letter codes: A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) plus common non-standard amino acids used in peptide synthesis.

## API

### `calculateMolecularWeight(sequence: string): number`

Calculates the monoisotopic molecular weight of a peptide sequence.

- **sequence**: Amino acid sequence in 1-letter code (case-insensitive)
- **Returns**: Molecular weight in Daltons (Da)
- **Throws**: Error if sequence contains invalid characters

### `calculateMolecularFormula(sequence: string): string`

Calculates the molecular formula with Unicode subscripts.

- **sequence**: Amino acid sequence in 1-letter code (case-insensitive)
- **Returns**: Molecular formula string (e.g., "C₁₈₇H₂₉₁N₄₁O₅₉")

## Examples

```typescript
// Oxytocin (CYS-TYR-ILE-GLN-ASN-CYS-PRO-LEU-GLY-NH2)
calculateMolecularWeight('CYIQNCPLG'); // 1007.19

// Insulin B chain
calculateMolecularWeight('FVNQHLCGSHLVEALYLVCGERGFFYTPKT'); // 3431.94

// Semaglutide (partial sequence)
calculateMolecularWeight('HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR'); // 3211.48
```

## Accuracy

Uses monoisotopic residue masses (not average masses) for mass spectrometry-grade accuracy. Water loss per peptide bond is accounted for.

## License

MIT

## Part of

[Wikipept](https://wikipept.com) — Interactive platform for learning peptide biology.

[Encyclopeptide](https://encyclopeptide.com) — Academic reference for oligopeptide research.
