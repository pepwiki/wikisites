import { z } from "zod";

export const AminoAcidSchema = z.enum([
  "G",
  "A",
  "V",
  "L",
  "I",
  "P",
  "F",
  "W",
  "M",
  "S",
  "T",
  "C",
  "Y",
  "H",
  "D",
  "E",
  "N",
  "Q",
  "K",
  "R",
]);

export const PeptideBondSchema = z.object({
  residue1: AminoAcidSchema,
  residue2: AminoAcidSchema,
  bondType: z.enum(["peptide", "isopeptide", "disulfide"]),
  angle: z.number().optional(),
});

export const SecondaryStructureSchema = z.enum([
  "alpha-helix",
  "beta-sheet",
  "beta-turn",
  "random-coil",
  "3-10-helix",
  "pi-helix",
]);

export const OligopeptideSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  sequence: z
    .string()
    .min(1)
    .regex(/^[GAVLIFWMSTCYNQHKRDE]+$/),
  length: z.number().int().positive(),
  molecularWeight: z.number().positive(),
  molecularFormula: z.string(),
  charge: z.number().int(),
  isoelectricPoint: z.number().min(0).max(14),
  secondaryStructure: z.array(SecondaryStructureSchema).default([]),
  biologicalActivity: z.string(),
  sourceOrganism: z.array(z.string()).default([]),
  receptors: z.array(z.string()).default([]),
  pharmacokinetics: z
    .object({
      halfLife: z.number().positive().optional(),
      bioavailability: z.number().min(0).max(1).optional(),
      plasmaProteinBinding: z.number().min(0).max(1).optional(),
      metabolism: z.string().optional(),
      elimination: z.string().optional(),
    })
    .default({}),
  therapeuticArea: z.array(z.string()).default([]),
  synthesisMethod: z.string().optional(),
  casNumber: z.string().optional(),
  pubchemCid: z.number().int().optional(),
  uniprotId: z.string().optional(),
});

export type AminoAcid = z.infer<typeof AminoAcidSchema>;
export type PeptideBond = z.infer<typeof PeptideBondSchema>;
export type SecondaryStructure = z.infer<typeof SecondaryStructureSchema>;
export type Oligopeptide = z.infer<typeof OligopeptideSchema>;

/**
 * Standard amino acid residue weights (monoisotopic, Da).
 * Source: PubMed, Proteomics, 2007, 7, 350-354; UniProt amino acid table.
 * Each weight is (M + H2O) - H2O = mass of residue in chain.
 */
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

/**
 * Calculate molecular weight of a peptide from its one-letter sequence.
 *
 * Uses the formula: MW = H2O + sum(residue_weight_i - H2O)
 * This accounts for the N-terminal H and C-terminal OH (water),
 * with each residue mass adjusted for the lost water during peptide bond formation.
 *
 * Result is rounded to 3 decimal places for consistency with mass spectrometry reporting.
 *
 * Time complexity: O(n) where n = sequence length.
 * Space complexity: O(1).
 *
 * @param sequence - One-letter amino acid code string. Must contain only valid characters.
 * @returns Molecular weight in Daltons, rounded to 3 decimal places.
 * @throws Never throws -- unknown residues are treated as zero-weight (resulting in lower MW).
 */
export function calculateMolecularWeight(sequence: string): number {
  let mw = H2O_MASS;
  for (const aa of sequence) {
    mw += (RESIDUE_WEIGHTS[aa] ?? 0) - H2O_MASS;
  }
  return Math.round(mw * 1000) / 1000;
}
