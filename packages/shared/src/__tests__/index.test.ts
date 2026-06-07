import { describe, it, expect } from "vitest";
import {
  AminoAcidSchema,
  OligopeptideSchema,
  calculateMolecularWeight,
  ArticleSchema,
  GlossaryTermSchema,
  QuizQuestionSchema,
  FlashcardSchema,
} from "../index";

describe("shared package barrel exports", () => {
  it("exports AminoAcidSchema", () => {
    expect(AminoAcidSchema).toBeDefined();
    expect(AminoAcidSchema.parse("G")).toBe("G");
  });

  it("exports OligopeptideSchema", () => {
    expect(OligopeptideSchema).toBeDefined();
  });

  it("exports calculateMolecularWeight", () => {
    expect(typeof calculateMolecularWeight).toBe("function");
    expect(calculateMolecularWeight("G")).toBeGreaterThan(0);
  });

  it("exports ArticleSchema", () => {
    expect(ArticleSchema).toBeDefined();
  });

  it("exports GlossaryTermSchema", () => {
    expect(GlossaryTermSchema).toBeDefined();
  });

  it("exports QuizQuestionSchema", () => {
    expect(QuizQuestionSchema).toBeDefined();
  });

  it("exports FlashcardSchema", () => {
    expect(FlashcardSchema).toBeDefined();
  });
});
