import { describe, it, expect } from "vitest";
import {
  calculateProperties,
  calculateMW,
  calculatePI,
  calculateCharge,
  calculateHydrophobicity,
  calculateExtinctionCoefficient,
  calculateComposition,
  calculateFormula,
} from "../lib/peptide-calculator";

describe("peptide-calculator", () => {
  describe("calculateMW", () => {
    it("returns 0 for empty sequence", () => {
      expect(calculateMW("")).toBe(0);
    });

    it("returns correct MW for single glycine", () => {
      expect(calculateMW("G")).toBeCloseTo(75.03, 1);
    });

    it("returns correct MW for dipeptide GA", () => {
      expect(calculateMW("GA")).toBeCloseTo(164.12, 0);
    });

    it("returns correct MW for glutathione (ECG)", () => {
      const mw = calculateMW("ECG");
      expect(mw).toBeGreaterThan(300);
      expect(mw).toBeLessThan(350);
    });

    it("is case-insensitive", () => {
      expect(calculateMW("ga")).toEqual(calculateMW("GA"));
    });

    it("ignores invalid characters", () => {
      expect(calculateMW("G-A")).toEqual(calculateMW("GA"));
    });
  });

  describe("calculatePI", () => {
    it("returns near-neutral pI for neutral peptides", () => {
      const pI = calculatePI("GAG");
      expect(pI).toBeGreaterThan(5);
      expect(pI).toBeLessThan(7);
    });

    it("returns high pI for basic peptides", () => {
      const pI = calculatePI("KKK");
      expect(pI).toBeGreaterThan(9);
    });

    it("returns low pI for acidic peptides", () => {
      const pI = calculatePI("DDD");
      expect(pI).toBeLessThan(4);
    });
  });

  describe("calculateCharge", () => {
    it("returns positive charge at low pH", () => {
      const charge = calculateCharge("G", 2.0);
      expect(charge).toBeGreaterThan(0);
    });

    it("returns negative charge at high pH", () => {
      const charge = calculateCharge("G", 12.0);
      expect(charge).toBeLessThan(0);
    });

    it("returns near-zero charge at pI", () => {
      const pI = calculatePI("GAG");
      const charge = calculateCharge("GAG", pI);
      expect(Math.abs(charge)).toBeLessThan(0.1);
    });
  });

  describe("calculateHydrophobicity", () => {
    it("returns positive for hydrophobic peptides", () => {
      const h = calculateHydrophobicity("VVV");
      expect(h).toBeGreaterThan(0);
    });

    it("returns negative for hydrophilic peptides", () => {
      const h = calculateHydrophobicity("DDD");
      expect(h).toBeLessThan(0);
    });
  });

  describe("calculateExtinctionCoefficient", () => {
    it("returns 0 for peptides without W, Y, or C", () => {
      expect(calculateExtinctionCoefficient("GAG")).toBe(0);
    });

    it("returns 5500 for single tryptophan", () => {
      expect(calculateExtinctionCoefficient("W")).toBe(5500);
    });

    it("returns 1490 for single tyrosine", () => {
      expect(calculateExtinctionCoefficient("Y")).toBe(1490);
    });
  });

  describe("calculateComposition", () => {
    it("counts amino acids correctly", () => {
      const comp = calculateComposition("GAG");
      expect(comp.G).toBe(2);
      expect(comp.A).toBe(1);
      expect(comp.V).toBe(0);
    });

    it("returns zero for all amino acids in empty sequence", () => {
      const comp = calculateComposition("");
      for (const count of Object.values(comp)) {
        expect(count).toBe(0);
      }
    });
  });

  describe("calculateFormula", () => {
    it("returns empty string for empty sequence", () => {
      expect(calculateFormula("")).toBe("");
    });

    it("returns correct formula for glycine", () => {
      // Residue formula: C2H3NO (amino acid - H2O + H2O termini = C2H5NO2)
      expect(calculateFormula("G")).toBe("C2H5NO2");
    });
  });

  describe("calculateProperties", () => {
    it("returns all properties for a valid sequence", () => {
      const props = calculateProperties("GCDEF");
      expect(props.sequence).toBe("GCDEF");
      expect(props.length).toBe(5);
      expect(props.molecularWeight).toBeGreaterThan(0);
      expect(props.isoelectricPoint).toBeGreaterThan(0);
      expect(props.formula).toBeTruthy();
      expect(Object.keys(props.aminoAcidComposition)).toHaveLength(20);
    });

    it("handles lowercase input", () => {
      const props = calculateProperties("gcdef");
      expect(props.sequence).toBe("GCDEF");
    });

    it("strips invalid characters", () => {
      const props = calculateProperties("G-C-D-E-F");
      expect(props.sequence).toBe("GCDEF");
    });
  });
});
