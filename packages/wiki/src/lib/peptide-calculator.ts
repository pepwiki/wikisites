/**
 * Peptide property calculator.
 * Calculates molecular weight, isoelectric point, charge, hydrophobicity, and more.
 *
 * Usage:
 *   import { calculateProperties } from "../lib/peptide-calculator";
 *   const props = calculateProperties("GCDEF");
 */

export type PeptideProperties = {
  sequence: string;
  length: number;
  molecularWeight: number;
  isoelectricPoint: number;
  chargeAtPH7: number;
  hydrophobicity: number;
  extinctionCoefficient: number;
  aminoAcidComposition: Record<string, number>;
  formula: string;
};

const AMINO_ACID_MW: Record<string, number> = {
  G: 75.03,
  A: 89.09,
  V: 117.15,
  L: 131.17,
  I: 131.17,
  P: 115.13,
  F: 165.19,
  W: 204.23,
  Y: 181.19,
  S: 105.09,
  T: 119.12,
  C: 121.16,
  M: 149.21,
  N: 132.12,
  Q: 146.15,
  D: 133.1,
  E: 147.13,
  K: 146.19,
  R: 174.2,
  H: 155.16,
};

const AMINO_ACID_HYDROPATHY: Record<string, number> = {
  G: -0.4,
  A: 1.8,
  V: 4.2,
  L: 3.8,
  I: 4.5,
  P: -1.6,
  F: 2.8,
  W: -0.9,
  Y: -1.3,
  S: -0.8,
  T: -0.7,
  C: 2.5,
  M: 1.9,
  N: -3.5,
  Q: -3.5,
  D: -3.5,
  E: -3.5,
  K: -3.9,
  R: -4.5,
  H: -3.2,
};

const AMINO_ACID_FORMULA: Record<
  string,
  { C: number; H: number; N: number; O: number; S: number }
> = {
  G: { C: 2, H: 5, N: 1, O: 2, S: 0 },
  A: { C: 3, H: 7, N: 1, O: 2, S: 0 },
  V: { C: 5, H: 11, N: 1, O: 2, S: 0 },
  L: { C: 6, H: 13, N: 1, O: 2, S: 0 },
  I: { C: 6, H: 13, N: 1, O: 2, S: 0 },
  P: { C: 5, H: 9, N: 1, O: 2, S: 0 },
  F: { C: 9, H: 11, N: 1, O: 2, S: 0 },
  W: { C: 11, H: 12, N: 2, O: 2, S: 0 },
  Y: { C: 9, H: 11, N: 1, O: 3, S: 0 },
  S: { C: 3, H: 7, N: 1, O: 3, S: 0 },
  T: { C: 4, H: 9, N: 1, O: 3, S: 0 },
  C: { C: 3, H: 7, N: 1, O: 2, S: 1 },
  M: { C: 5, H: 11, N: 1, O: 2, S: 1 },
  N: { C: 4, H: 8, N: 2, O: 3, S: 0 },
  Q: { C: 5, H: 10, N: 2, O: 3, S: 0 },
  D: { C: 4, H: 7, N: 1, O: 4, S: 0 },
  E: { C: 5, H: 9, N: 1, O: 4, S: 0 },
  K: { C: 6, H: 14, N: 2, O: 2, S: 0 },
  R: { C: 6, H: 14, N: 4, O: 2, S: 0 },
  H: { C: 6, H: 9, N: 3, O: 2, S: 0 },
};

/**
 * Calculate all properties of a peptide sequence.
 */
export function calculateProperties(sequence: string): PeptideProperties {
  const seq = sequence.toUpperCase().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, "");
  const length = seq.length;

  const molecularWeight = calculateMW(seq);
  const isoelectricPoint = calculatePI(seq);
  const chargeAtPH7 = calculateCharge(seq, 7.0);
  const hydrophobicity = calculateHydrophobicity(seq);
  const extinctionCoefficient = calculateExtinctionCoefficient(seq);
  const aminoAcidComposition = calculateComposition(seq);
  const formula = calculateFormula(seq);

  return {
    sequence: seq,
    length,
    molecularWeight,
    isoelectricPoint,
    chargeAtPH7,
    hydrophobicity,
    extinctionCoefficient,
    aminoAcidComposition,
    formula,
  };
}

/**
 * Calculate molecular weight (residue masses, consistent with @wikisites/shared).
 */
export function calculateMW(sequence: string): number {
  const seq = sequence.toUpperCase();
  let mw = 0;
  for (const aa of seq) {
    mw += AMINO_ACID_MW[aa] || 0;
  }
  return Math.round(mw * 1000) / 1000;
}

/**
 * Calculate isoelectric point (simplified).
 */
export function calculatePI(sequence: string): number {
  const seq = sequence.toUpperCase();
  const pks: number[] = [];

  // N-terminal pKa
  pks.push(9.69);

  // C-terminal pKa
  pks.push(2.34);

  // Side chain pKa values
  for (const aa of seq) {
    switch (aa) {
      case "D":
        pks.push(3.65);
        break;
      case "E":
        pks.push(4.25);
        break;
      case "C":
        pks.push(8.18);
        break;
      case "Y":
        pks.push(10.07);
        break;
      case "H":
        pks.push(6.0);
        break;
      case "K":
        pks.push(10.53);
        break;
      case "R":
        pks.push(12.48);
        break;
    }
  }

  // Sort pKa values
  pks.sort((a, b) => a - b);

  // Find pH where net charge is zero (simplified bisection)
  let low = 0;
  let high = 14;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const charge = calculateChargeAtPH(seq, mid, pks);
    if (charge > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.round(((low + high) / 2) * 100) / 100;
}

/**
 * Calculate net charge at a given pH.
 */
export function calculateCharge(sequence: string, pH: number): number {
  const seq = sequence.toUpperCase();
  return Math.round(calculateChargeAtPH(seq, pH) * 100) / 100;
}

function calculateChargeAtPH(seq: string, pH: number, _pks?: number[]): number {
  let charge = 0;

  // N-terminal amino group (+1 at low pH)
  charge += 1 / (1 + Math.pow(10, pH - 9.69));

  // C-terminal carboxyl group (-1 at high pH)
  charge -= 1 / (1 + Math.pow(10, 2.34 - pH));

  // Side chains
  for (const aa of seq) {
    switch (aa) {
      case "D":
        charge -= 1 / (1 + Math.pow(10, 3.65 - pH));
        break;
      case "E":
        charge -= 1 / (1 + Math.pow(10, 4.25 - pH));
        break;
      case "C":
        charge -= 1 / (1 + Math.pow(10, 8.18 - pH));
        break;
      case "Y":
        charge -= 1 / (1 + Math.pow(10, 10.07 - pH));
        break;
      case "H":
        charge += 1 / (1 + Math.pow(10, pH - 6.0));
        break;
      case "K":
        charge += 1 / (1 + Math.pow(10, pH - 10.53));
        break;
      case "R":
        charge += 1 / (1 + Math.pow(10, pH - 12.48));
        break;
    }
  }

  return charge;
}

/**
 * Calculate average hydrophobicity (Kyte-Doolittle scale).
 */
export function calculateHydrophobicity(sequence: string): number {
  const seq = sequence.toUpperCase();
  let total = 0;
  for (const aa of seq) {
    total += AMINO_ACID_HYDROPATHY[aa] || 0;
  }
  return Math.round((total / seq.length) * 100) / 100;
}

/**
 * Calculate extinction coefficient (M-1 cm-1 at 280 nm).
 */
export function calculateExtinctionCoefficient(sequence: string): number {
  const seq = sequence.toUpperCase();
  const w = (seq.match(/W/g) || []).length;
  const y = (seq.match(/Y/g) || []).length;
  const c = (seq.match(/C/g) || []).length;
  // Gill & von Hippel formula
  return w * 5500 + y * 1490 + c * 125;
}

/**
 * Calculate amino acid composition.
 */
export function calculateComposition(sequence: string): Record<string, number> {
  const seq = sequence.toUpperCase();
  const composition: Record<string, number> = {};
  for (const aa of "ACDEFGHIKLMNPQRSTVWY") {
    composition[aa] = 0;
  }
  for (const aa of seq) {
    if (composition[aa] !== undefined) {
      composition[aa]++;
    }
  }
  return composition;
}

/**
 * Calculate molecular formula (residue formula, consistent with MW).
 */
export function calculateFormula(sequence: string): string {
  const seq = sequence.toUpperCase();
  if (seq.length === 0) return "";

  const formula = { C: 0, H: 0, N: 0, O: 0, S: 0 };

  // Sum residue formulas (amino acid - H2O per residue)
  for (const aa of seq) {
    const aaFormula = AMINO_ACID_FORMULA[aa];
    if (aaFormula) {
      formula.C += aaFormula.C;
      formula.H += aaFormula.H - 2; // -H2O per residue
      formula.N += aaFormula.N;
      formula.O += aaFormula.O - 1;
      formula.S += aaFormula.S;
    }
  }

  // Add one water for the peptide termini
  formula.H += 2;
  formula.O += 1;

  let result = "";
  if (formula.C > 0) result += `C${formula.C > 1 ? formula.C : ""}`;
  if (formula.H > 0) result += `H${formula.H > 1 ? formula.H : ""}`;
  if (formula.N > 0) result += `N${formula.N > 1 ? formula.N : ""}`;
  if (formula.O > 0) result += `O${formula.O > 1 ? formula.O : ""}`;
  if (formula.S > 0) result += `S${formula.S > 1 ? formula.S : ""}`;
  return result;
}
