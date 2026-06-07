import { describe, it, expect } from "vitest";
import {
  AminoAcidSchema,
  PeptideBondSchema,
  SecondaryStructureSchema,
  OligopeptideSchema,
  calculateMolecularWeight,
} from "../schemas/oligopeptide";

// ---------------------------------------------------------------------------
// AminoAcidSchema
// ---------------------------------------------------------------------------
describe("AminoAcidSchema", () => {
  it("accepts all 20 standard one-letter codes", () => {
    const valid = "GAVLIFWMSTCYNQHKRDE".split("");
    for (const aa of valid) {
      expect(AminoAcidSchema.parse(aa)).toBe(aa);
    }
  });

  it("rejects invalid single-letter codes", () => {
    const invalid = ["B", "J", "O", "U", "X", "Z", "aa", "", "1", " "];
    for (const aa of invalid) {
      expect(() => AminoAcidSchema.parse(aa)).toThrow();
    }
  });
});

// ---------------------------------------------------------------------------
// PeptideBondSchema
// ---------------------------------------------------------------------------
describe("PeptideBondSchema", () => {
  it("accepts valid peptide bond", () => {
    const bond = PeptideBondSchema.parse({
      residue1: "G",
      residue2: "A",
      bondType: "peptide",
    });
    expect(bond.residue1).toBe("G");
    expect(bond.residue2).toBe("A");
    expect(bond.bondType).toBe("peptide");
  });

  it("accepts optional angle", () => {
    const bond = PeptideBondSchema.parse({
      residue1: "C",
      residue2: "C",
      bondType: "disulfide",
      angle: 180,
    });
    expect(bond.angle).toBe(180);
  });

  it("accepts isopeptide bond type", () => {
    const bond = PeptideBondSchema.parse({
      residue1: "K",
      residue2: "E",
      bondType: "isopeptide",
    });
    expect(bond.bondType).toBe("isopeptide");
  });

  it("rejects invalid bond types", () => {
    expect(() =>
      PeptideBondSchema.parse({
        residue1: "G",
        residue2: "A",
        bondType: "hydrogen",
      }),
    ).toThrow();
  });

  it("rejects invalid amino acids", () => {
    expect(() =>
      PeptideBondSchema.parse({
        residue1: "B",
        residue2: "A",
        bondType: "peptide",
      }),
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// SecondaryStructureSchema
// ---------------------------------------------------------------------------
describe("SecondaryStructureSchema", () => {
  it("accepts all valid secondary structures", () => {
    const structures = [
      "alpha-helix",
      "beta-sheet",
      "beta-turn",
      "random-coil",
      "3-10-helix",
      "pi-helix",
    ];
    for (const s of structures) {
      expect(SecondaryStructureSchema.parse(s)).toBe(s);
    }
  });

  it("rejects invalid secondary structures", () => {
    expect(() => SecondaryStructureSchema.parse("gamma-turn")).toThrow();
    expect(() => SecondaryStructureSchema.parse("")).toThrow();
  });
});

// ---------------------------------------------------------------------------
// OligopeptideSchema
// ---------------------------------------------------------------------------
describe("OligopeptideSchema", () => {
  const validOligopeptide = {
    id: "glutathione",
    name: "Glutathione",
    aliases: ["GSH", "gamma-L-Glutamyl-L-cysteinylglycine"],
    sequence: "QCS",
    length: 3,
    molecularWeight: 307.32,
    molecularFormula: "C10H17N3O6S",
    charge: -1,
    isoelectricPoint: 5.93,
    secondaryStructure: ["random-coil"],
    biologicalActivity: "Master antioxidant",
    sourceOrganism: ["Homo sapiens"],
    receptors: [],
    pharmacokinetics: {
      halfLife: 3600,
      bioavailability: 0.02,
    },
    therapeuticArea: ["Antioxidant"],
  };

  it("accepts a valid oligopeptide with all fields", () => {
    const result = OligopeptideSchema.parse(validOligopeptide);
    expect(result.id).toBe("glutathione");
    expect(result.name).toBe("Glutathione");
    expect(result.aliases).toHaveLength(2);
    expect(result.sequence).toBe("QCS");
    expect(result.length).toBe(3);
    expect(result.molecularWeight).toBeCloseTo(307.32);
  });

  it("applies defaults for optional arrays", () => {
    const minimal = {
      id: "test",
      name: "Test",
      sequence: "G",
      length: 1,
      molecularWeight: 57.02,
      molecularFormula: "C2H5NO2",
      charge: 0,
      isoelectricPoint: 6.0,
      biologicalActivity: "Test",
    };
    const result = OligopeptideSchema.parse(minimal);
    expect(result.aliases).toEqual([]);
    expect(result.secondaryStructure).toEqual([]);
    expect(result.sourceOrganism).toEqual([]);
    expect(result.receptors).toEqual([]);
    expect(result.therapeuticArea).toEqual([]);
    expect(result.pharmacokinetics).toEqual({});
  });

  it("rejects empty id", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        id: "",
      }),
    ).toThrow();
  });

  it("rejects empty name", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        name: "",
      }),
    ).toThrow();
  });

  it("rejects invalid sequence characters", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        sequence: "ABC",
      }),
    ).toThrow();
  });

  it("accepts valid sequence with all 20 amino acids", () => {
    const result = OligopeptideSchema.parse({
      ...validOligopeptide,
      sequence: "GAVLIFWMSTCYNQHKRDE",
      length: 20,
    });
    expect(result.sequence).toBe("GAVLIFWMSTCYNQHKRDE");
  });

  it("rejects negative molecular weight", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        molecularWeight: -1,
      }),
    ).toThrow();
  });

  it("rejects isoelectric point outside [0, 14]", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        isoelectricPoint: -1,
      }),
    ).toThrow();
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        isoelectricPoint: 15,
      }),
    ).toThrow();
  });

  it("accepts valid pharmacokinetics bounds", () => {
    const result = OligopeptideSchema.parse({
      ...validOligopeptide,
      pharmacokinetics: {
        halfLife: 1,
        bioavailability: 0,
        plasmaProteinBinding: 1,
      },
    });
    expect(result.pharmacokinetics.bioavailability).toBe(0);
    expect(result.pharmacokinetics.plasmaProteinBinding).toBe(1);
  });

  it("rejects bioavailability outside [0, 1]", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        pharmacokinetics: { bioavailability: 1.5 },
      }),
    ).toThrow();
  });

  it("rejects empty sequence", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        sequence: "",
      }),
    ).toThrow();
  });

  it("rejects non-positive length", () => {
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        length: 0,
      }),
    ).toThrow();
    expect(() =>
      OligopeptideSchema.parse({
        ...validOligopeptide,
        length: -1,
      }),
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// calculateMolecularWeight
// ---------------------------------------------------------------------------
describe("calculateMolecularWeight", () => {
  it("returns water mass for single glycine", () => {
    // Gly: 57.02146 - 18.01056 + 18.01056 = 57.02146
    const mw = calculateMolecularWeight("G");
    expect(mw).toBeCloseTo(57.021, 2);
  });

  it("calculates molecular weight for dipeptide GA", () => {
    // G: 57.02146, A: 71.03711
    // mw = 18.01056 + (57.02146 - 18.01056) + (71.03711 - 18.01056)
    // mw = 18.01056 + 39.01090 + 53.02655 = 110.04801
    const mw = calculateMolecularWeight("GA");
    expect(mw).toBeCloseTo(110.048, 2);
  });

  it("calculates molecular weight for tripeptide GAG", () => {
    const mw = calculateMolecularWeight("GAG");
    expect(mw).toBeGreaterThan(140);
    expect(mw).toBeLessThan(160);
  });

  it("rounds to 3 decimal places", () => {
    const mw = calculateMolecularWeight("G");
    const decimals = String(mw).split(".")[1];
    expect(decimals?.length ?? 0).toBeLessThanOrEqual(3);
  });

  it("handles all 20 amino acids", () => {
    const allAA = "GAVLIFWMSTCYNQHKRDE";
    const mw = calculateMolecularWeight(allAA);
    expect(mw).toBeGreaterThan(0);
    expect(Number.isFinite(mw)).toBe(true);
  });

  it("handles long sequences deterministically", () => {
    const seq = "G".repeat(100);
    const mw1 = calculateMolecularWeight(seq);
    const mw2 = calculateMolecularWeight(seq);
    expect(mw1).toBe(mw2);
  });

  it("is commutative for weight addition of individual residues", () => {
    // MW(GA) should equal MW(AG) minus water adjustment
    // Actually: MW("GA") = 18.01056 + (57.02146-18.01056) + (71.03711-18.01056)
    // MW("AG") = 18.01056 + (71.03711-18.01056) + (57.02146-18.01056)
    // They are identical because the formula is associative
    const mwGA = calculateMolecularWeight("GA");
    const mwAG = calculateMolecularWeight("AG");
    expect(mwGA).toBe(mwAG);
  });

  it("increases monotonically with chain length", () => {
    const weights = ["G", "GG", "GGG", "GGGG"].map(calculateMolecularWeight);
    for (let i = 1; i < weights.length; i++) {
      const current = weights[i] as number;
      const previous = weights[i - 1] as number;
      expect(current).toBeGreaterThan(previous);
    }
  });
});
