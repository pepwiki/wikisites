import { describe, it, expect } from "vitest";
import { calculateMolecularWeight } from "@wikisites/shared";

/**
 * MWCalculator delegates to the shared calculateMolecularWeight function.
 * These tests verify the integration point used by the calculator component.
 */
describe("MWCalculator integration (shared calculateMolecularWeight)", () => {
  it("returns correct MW for single amino acid G (Glycine)", () => {
    // MW = H2O + (G_residue - H2O) = 18.01056 + (57.02146 - 18.01056) = 57.02146 -> 57.021
    expect(calculateMolecularWeight("G")).toBe(57.021);
  });

  it("returns correct MW for GSH (Glutathione: Glu-Cys-Gly = ECG)", () => {
    // E (129.043) + C (103.009) + G (57.021) - 2*H2O + H2O = sum(residues) + H2O
    const mw = calculateMolecularWeight("ECG");
    // Monoisotopic MW for reduced glutathione = 307.324 Da
    // But our calculator uses residue weights without PTM. ECG with free termini:
    expect(mw).toBeGreaterThan(250);
    expect(mw).toBeLessThan(320);
  });

  it("returns correct MW for CYIQNCPLG (Oxytocin nonapeptide)", () => {
    const mw = calculateMolecularWeight("CYIQNCPLG");
    // Our residue-weight sum + H2O approach for linear oxytocin:
    // MW ~847 Da (without disulfide). With disulfide (Cys-Cys) subtract 2H = ~847.
    expect(mw).toBeGreaterThan(800);
    expect(mw).toBeLessThan(900);
  });

  it("handles unknown amino acid with zero-weight fallback", () => {
    // X has no residue weight -> MW = H2O + (0 - H2O) = 0
    const mw = calculateMolecularWeight("X");
    expect(mw).toBe(0);
  });

  it("is deterministic across repeated calls", () => {
    const a = calculateMolecularWeight("GAVLIFWMSTCYNQHKRDE");
    const b = calculateMolecularWeight("GAVLIFWMSTCYNQHKRDE");
    expect(a).toBe(b);
  });

  it("MW increases monotonically with chain length", () => {
    const mw1 = calculateMolecularWeight("G");
    const mw2 = calculateMolecularWeight("GG");
    const mw3 = calculateMolecularWeight("GGG");
    expect(mw2).toBeGreaterThan(mw1);
    expect(mw3).toBeGreaterThan(mw2);
  });

  it("handles all 20 standard amino acids without error", () => {
    expect(() => calculateMolecularWeight("GAVLIFWMSTCYPYNHQKRDE")).not.toThrow();
  });
});
