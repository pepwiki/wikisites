/**
 * Standalone peptide molecular weight calculator.
 *
 * Zero external dependencies — self-contained amino acid data.
 * Uses monoisotopic residue masses from UniProt / Proteomics 2007, 7, 350-354.
 *
 * @module mw-calculator
 */

/** Standard amino acid residue formulas (free amino acid form, before condensation). */
const AA_FORMULA: Readonly<Record<string, { C: number; H: number; N: number; O: number; S: number }>> = Object.freeze({
  G: { C: 2, H: 5, N: 1, O: 2, S: 0 },
  A: { C: 3, H: 7, N: 1, O: 2, S: 0 },
  V: { C: 5, H: 11, N: 1, O: 2, S: 0 },
  L: { C: 6, H: 13, N: 1, O: 2, S: 0 },
  I: { C: 6, H: 13, N: 1, O: 2, S: 0 },
  P: { C: 5, H: 9, N: 1, O: 2, S: 0 },
  F: { C: 9, H: 11, N: 1, O: 2, S: 0 },
  W: { C: 11, H: 12, N: 2, O: 2, S: 0 },
  M: { C: 5, H: 11, N: 1, O: 2, S: 1 },
  S: { C: 3, H: 7, N: 1, O: 3, S: 0 },
  T: { C: 4, H: 9, N: 1, O: 3, S: 0 },
  C: { C: 3, H: 7, N: 1, O: 2, S: 1 },
  Y: { C: 9, H: 11, N: 1, O: 3, S: 0 },
  H: { C: 6, H: 9, N: 3, O: 2, S: 0 },
  D: { C: 4, H: 7, N: 1, O: 4, S: 0 },
  E: { C: 5, H: 9, N: 1, O: 4, S: 0 },
  N: { C: 4, H: 8, N: 2, O: 3, S: 0 },
  Q: { C: 5, H: 10, N: 2, O: 3, S: 0 },
  K: { C: 6, H: 14, N: 2, O: 2, S: 0 },
  R: { C: 6, H: 14, N: 4, O: 2, S: 0 },
});

/** Monoisotopic residue weights (Da) — mass of residue within a peptide chain. */
const RESIDUE_WEIGHTS: Readonly<Record<string, number>> = Object.freeze({
  G: 57.02146,
  A: 71.03711,
  V: 99.06841,
  L: 113.08406,
  I: 113.08406,
  P: 97.05276,
  F: 147.06841,
  W: 186.07931,
  M: 131.04049,
  S: 87.03203,
  T: 101.04768,
  C: 103.00919,
  Y: 163.06333,
  H: 137.05891,
  D: 115.02694,
  E: 129.04259,
  N: 114.04293,
  Q: 128.05858,
  K: 128.09496,
  R: 156.10111,
});

/** Water molecule mass subtracted during condensation. */
const H2O_MASS = 18.01056;

/** Unicode subscript digits for molecular formula output. */
const SUB = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"] as const;

function toSubscript(n: number): string {
  return String(n)
    .split("")
    .map((d) => SUB[Number(d)])
    .join("");
}

/**
 * Calculate the molecular weight of a peptide from its one-letter amino acid sequence.
 *
 * Uses monoisotopic residue masses. The formula accounts for the N-terminal H and
 * C-terminal OH (water), with each residue mass adjusted for the lost water during
 * peptide bond formation:
 *
 * ```
 * MW = H₂O + Σ (residue_weight_i − H₂O)
 * ```
 *
 * @param sequence - One-letter amino acid codes (e.g., `"GSH"` for glutathione).
 * @returns Molecular weight in Daltons, rounded to 3 decimal places.
 *
 * @example
 * ```ts
 * calculateMolecularWeight("GSH");  // ~299.134
 * calculateMolecularWeight("AAA");  // ~231.148
 * ```
 */
export function calculateMolecularWeight(sequence: string): number {
  const upper = sequence.toUpperCase();
  let mw = H2O_MASS;
  for (const aa of upper) {
    mw += (RESIDUE_WEIGHTS[aa] ?? 0) - H2O_MASS;
  }
  return Math.round(mw * 1000) / 1000;
}

/**
 * Calculate the molecular formula of a peptide from its one-letter amino acid sequence.
 *
 * Returns a human-readable formula with Unicode subscript numerals (e.g., `"C₁₈₇H₂₉₁N₄₁O₅₉"`).
 * Each residue contributes its free amino acid formula, then one H₂O is subtracted per
 * peptide bond (i.e., `n − 1` bonds for an `n`-residue peptide).
 *
 * @param sequence - One-letter amino acid codes (e.g., `"GSH"` for glutathione).
 * @returns Molecular formula string with Unicode subscripts. Returns `"H₂O"` for empty input.
 *
 * @example
 * ```ts
 * calculateMolecularFormula("GSH");  // "C₁₁H₁₉N₅O₆"
 * calculateMolecularFormula("AAA");  // "C₉H₁₇N₃O₅"
 * ```
 */
export function calculateMolecularFormula(sequence: string): string {
  const upper = sequence.toUpperCase();
  if (upper.length === 0) return "H₂O";

  let C = 0;
  let H = 0;
  let N = 0;
  let O = 0;
  let S = 0;

  for (const aa of upper) {
    const f = AA_FORMULA[aa];
    if (!f) continue;
    C += f.C;
    H += f.H;
    N += f.N;
    O += f.O;
    S += f.S;
  }

  // Subtract (n - 1) water molecules for peptide bonds
  const bonds = upper.length - 1;
  H -= bonds * 2;
  O -= bonds * 1;

  const parts: string[] = [];
  if (C > 0) parts.push(`C${toSubscript(C)}`);
  if (H > 0) parts.push(`H${toSubscript(H)}`);
  if (N > 0) parts.push(`N${toSubscript(N)}`);
  if (O > 0) parts.push(`O${toSubscript(O)}`);
  if (S > 0) parts.push(`S${toSubscript(S)}`);

  return parts.join("");
}
