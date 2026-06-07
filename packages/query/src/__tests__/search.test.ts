import { describe, it, expect } from "vitest";
import { SearchQuerySchema, searchPeptides } from "../index";
import type { Oligopeptide } from "@wikisites/shared";

// ---------------------------------------------------------------------------
// Test Data
// ---------------------------------------------------------------------------
const mockPeptides: ReadonlyArray<Oligopeptide> = [
  {
    id: "glutathione",
    name: "Glutathione",
    aliases: ["GSH"],
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
    pharmacokinetics: {},
    therapeuticArea: ["Antioxidant"],
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    aliases: ["Love hormone"],
    sequence: "CYIQNCPLG",
    length: 9,
    molecularWeight: 1007.19,
    molecularFormula: "C43H66N12O12S2",
    charge: 1,
    isoelectricPoint: 7.7,
    secondaryStructure: ["beta-turn"],
    biologicalActivity: "Neuropeptide hormone",
    sourceOrganism: ["Homo sapiens"],
    receptors: ["OXTR"],
    pharmacokinetics: {},
    therapeuticArea: ["Hormone", "Neuropeptide"],
  },
  {
    id: "bradykinin",
    name: "Bradykinin",
    aliases: ["BK"],
    sequence: "RPPGFSPFR",
    length: 9,
    molecularWeight: 1060.2,
    molecularFormula: "C50H73N15O11",
    charge: 2,
    isoelectricPoint: 12.0,
    secondaryStructure: ["random-coil"],
    biologicalActivity: "Vasodilator",
    sourceOrganism: ["Homo sapiens"],
    receptors: ["BDKR1", "BDKR2"],
    pharmacokinetics: {},
    therapeuticArea: ["Vasodilator", "Inflammation"],
  },
  {
    id: "enkephalin",
    name: "Leucine-Enkephalin",
    aliases: ["Leu-ENK"],
    sequence: "YGGFL",
    length: 5,
    molecularWeight: 555.62,
    molecularFormula: "C28H37N5O7",
    charge: 0,
    isoelectricPoint: 5.6,
    secondaryStructure: ["random-coil"],
    biologicalActivity: "Endogenous opioid peptide",
    sourceOrganism: ["Homo sapiens"],
    receptors: ["OPRM1", "OPRD1"],
    pharmacokinetics: {},
    therapeuticArea: ["Analgesic", "Opioid"],
  },
];

// ---------------------------------------------------------------------------
// SearchQuerySchema
// ---------------------------------------------------------------------------
describe("SearchQuerySchema", () => {
  it("applies defaults for limit and offset", () => {
    const result = SearchQuerySchema.parse({ q: "test" });
    expect(result.q).toBe("test");
    expect(result.limit).toBe(20);
    expect(result.offset).toBe(0);
  });

  it("rejects empty query", () => {
    expect(() => SearchQuerySchema.parse({ q: "" })).toThrow();
  });

  it("rejects negative limit", () => {
    expect(() => SearchQuerySchema.parse({ q: "test", limit: -1 })).toThrow();
  });

  it("rejects limit exceeding 100", () => {
    expect(() => SearchQuerySchema.parse({ q: "test", limit: 101 })).toThrow();
  });

  it("accepts limit at exactly 100", () => {
    const result = SearchQuerySchema.parse({ q: "test", limit: 100 });
    expect(result.limit).toBe(100);
  });

  it("accepts valid filters", () => {
    const result = SearchQuerySchema.parse({
      q: "test",
      filters: { minLength: 3, maxLength: 10 },
    });
    expect(result.filters.minLength).toBe(3);
    expect(result.filters.maxLength).toBe(10);
  });

  it("rejects invalid sequence filter (non-amino acid characters)", () => {
    expect(() =>
      SearchQuerySchema.parse({
        q: "test",
        filters: { sequence: "123XYZ" },
      }),
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// searchPeptides function
// ---------------------------------------------------------------------------
describe("searchPeptides", () => {
  it("returns empty results for non-matching query", () => {
    const response = searchPeptides({ q: "zzzzz" }, mockPeptides);
    expect(response.results).toHaveLength(0);
    expect(response.total).toBe(0);
  });

  it("finds peptides by exact name match", () => {
    const response = searchPeptides({ q: "Glutathione" }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("glutathione");
    expect(response.results[0]!.score).toBe(1.0);
  });

  it("finds peptides by partial name match", () => {
    const response = searchPeptides({ q: "glut" }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("glutathione");
  });

  it("finds peptides by alias", () => {
    const response = searchPeptides({ q: "Love hormone" }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("oxytocin");
  });

  it("finds peptides by sequence substring", () => {
    const response = searchPeptides({ q: "YGGFL" }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("enkephalin");
  });

  it("is case-insensitive", () => {
    const upper = searchPeptides({ q: "GLUTATHIONE" }, mockPeptides);
    const lower = searchPeptides({ q: "glutathione" }, mockPeptides);
    expect(upper.results.length).toBe(lower.results.length);
  });

  it("sorts results by score descending", () => {
    const response = searchPeptides({ q: "in" }, mockPeptides);
    if (response.results.length >= 2) {
      for (let i = 1; i < response.results.length; i++) {
        expect(response.results[i]!.score).toBeLessThanOrEqual(response.results[i - 1]!.score);
      }
    }
  });

  it("respects limit parameter", () => {
    const response = searchPeptides({ q: "in", limit: 1 }, mockPeptides);
    expect(response.results.length).toBeLessThanOrEqual(1);
    expect(response.limit).toBe(1);
  });

  it("respects offset parameter", () => {
    const all = searchPeptides({ q: "in" }, mockPeptides);
    const offset = searchPeptides({ q: "in", offset: 1 }, mockPeptides);
    if (all.results.length >= 2) {
      expect(offset.results.length).toBe(all.results.length - 1);
    }
  });

  it("filters by minimum length", () => {
    const response = searchPeptides({ q: "e", filters: { minLength: 9 } }, mockPeptides);
    for (const result of response.results) {
      expect(result.peptide.length).toBeGreaterThanOrEqual(9);
    }
  });

  it("filters by maximum length", () => {
    const response = searchPeptides({ q: "e", filters: { maxLength: 5 } }, mockPeptides);
    for (const result of response.results) {
      expect(result.peptide.length).toBeLessThanOrEqual(5);
    }
  });

  it("filters by sequence prefix", () => {
    const response = searchPeptides({ q: "enkephalin", filters: { sequence: "YG" } }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("enkephalin");
  });

  it("filters by category (therapeutic area)", () => {
    const response = searchPeptides(
      { q: "glutathione", filters: { category: "antioxidant" } },
      mockPeptides,
    );
    expect(response.results.length).toBeGreaterThanOrEqual(1);
    expect(response.results[0]!.peptide.id).toBe("glutathione");
  });

  it("returns empty results with empty peptide dataset", () => {
    const response = searchPeptides({ q: "test" }, []);
    expect(response.results).toHaveLength(0);
    expect(response.total).toBe(0);
  });

  it("returns correct pagination metadata", () => {
    const response = searchPeptides({ q: "e", limit: 2, offset: 0 }, mockPeptides);
    expect(response.limit).toBe(2);
    expect(response.offset).toBe(0);
    expect(response.results.length).toBeLessThanOrEqual(2);
  });

  it("handles combined filters", () => {
    const response = searchPeptides(
      {
        q: "enkephalin",
        filters: { minLength: 3, maxLength: 5, category: "analgesic" },
      },
      mockPeptides,
    );
    for (const result of response.results) {
      expect(result.peptide.length).toBeGreaterThanOrEqual(3);
      expect(result.peptide.length).toBeLessThanOrEqual(5);
    }
  });

  it("score is 0.8 for partial name match", () => {
    const response = searchPeptides({ q: "glut" }, mockPeptides);
    expect(response.results[0]!.score).toBe(0.8);
  });

  it("score is 0.6 for alias match", () => {
    const response = searchPeptides({ q: "BK" }, mockPeptides);
    expect(response.results[0]!.score).toBe(0.6);
  });

  it("score is 0.4 for sequence-only match", () => {
    const response = searchPeptides({ q: "RPP" }, mockPeptides);
    expect(response.results[0]!.score).toBe(0.4);
  });

  it("returns all peptides when query matches all", () => {
    const response = searchPeptides({ q: "e" }, mockPeptides);
    expect(response.results.length).toBeGreaterThanOrEqual(2);
  });

  it("returns stable results across calls (determinism)", () => {
    const r1 = searchPeptides({ q: "in" }, mockPeptides);
    const r2 = searchPeptides({ q: "in" }, mockPeptides);
    expect(r1.results.map((r) => r.peptide.id)).toEqual(r2.results.map((r) => r.peptide.id));
  });
});
