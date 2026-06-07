import { describe, it, expect } from "vitest";
import {
  ContentStatusSchema,
  DifficultyLevelSchema,
  ArticleSchema,
  GlossaryTermSchema,
  QuizQuestionSchema,
  FlashcardSchema,
} from "../schemas/content";

// ---------------------------------------------------------------------------
// ContentStatusSchema
// ---------------------------------------------------------------------------
describe("ContentStatusSchema", () => {
  it("accepts all valid statuses", () => {
    for (const status of ["draft", "review", "published", "deprecated"]) {
      expect(ContentStatusSchema.parse(status)).toBe(status);
    }
  });

  it("rejects invalid statuses", () => {
    expect(() => ContentStatusSchema.parse("active")).toThrow();
    expect(() => ContentStatusSchema.parse("")).toThrow();
    expect(() => ContentStatusSchema.parse("DRAFT")).toThrow();
  });
});

// ---------------------------------------------------------------------------
// DifficultyLevelSchema
// ---------------------------------------------------------------------------
describe("DifficultyLevelSchema", () => {
  it("accepts all valid difficulty levels", () => {
    for (const level of ["beginner", "intermediate", "advanced", "expert"]) {
      expect(DifficultyLevelSchema.parse(level)).toBe(level);
    }
  });

  it("rejects invalid difficulty levels", () => {
    expect(() => DifficultyLevelSchema.parse("easy")).toThrow();
    expect(() => DifficultyLevelSchema.parse("hard")).toThrow();
  });
});

// ---------------------------------------------------------------------------
// ArticleSchema
// ---------------------------------------------------------------------------
describe("ArticleSchema", () => {
  const validArticle = {
    title: "Glutathione",
    description: "Master antioxidant tripeptide",
    author: "Test Author",
    pubDate: "2026-01-15",
    category: "Tripeptides",
  };

  it("accepts a valid minimal article", () => {
    const result = ArticleSchema.parse(validArticle);
    expect(result.title).toBe("Glutathione");
    expect(result.status).toBe("draft"); // default
    expect(result.difficulty).toBe("intermediate"); // default
    expect(result.tags).toEqual([]);
    expect(result.relatedArticles).toEqual([]);
  });

  it("accepts a fully populated article", () => {
    const full = {
      ...validArticle,
      status: "published",
      updatedDate: "2026-06-01",
      tags: ["antioxidant", "tripeptide"],
      difficulty: "expert",
      relatedArticles: ["cysteine", "glycine"],
      citation: {
        doi: "10.1016/j.redox.2024.103101",
        authors: ["Meister A", "Anderson ME"],
        journal: "Advances in Enzymology",
        year: 2024,
      },
    };
    const result = ArticleSchema.parse(full);
    expect(result.status).toBe("published");
    expect(result.tags).toHaveLength(2);
    expect(result.citation?.doi).toBe("10.1016/j.redox.2024.103101");
    expect(result.citation?.year).toBe(2024);
  });

  it("rejects empty title", () => {
    expect(() => ArticleSchema.parse({ ...validArticle, title: "" })).toThrow();
  });

  it("rejects empty description", () => {
    expect(() => ArticleSchema.parse({ ...validArticle, description: "" })).toThrow();
  });

  it("rejects description exceeding 320 characters", () => {
    expect(() =>
      ArticleSchema.parse({
        ...validArticle,
        description: "x".repeat(321),
      }),
    ).toThrow();
  });

  it("accepts description at exactly 320 characters", () => {
    const result = ArticleSchema.parse({
      ...validArticle,
      description: "x".repeat(320),
    });
    expect(result.description).toHaveLength(320);
  });

  it("rejects empty author", () => {
    expect(() => ArticleSchema.parse({ ...validArticle, author: "" })).toThrow();
  });

  it("rejects empty category", () => {
    expect(() => ArticleSchema.parse({ ...validArticle, category: "" })).toThrow();
  });

  it("coerces string dates to Date objects", () => {
    const result = ArticleSchema.parse(validArticle);
    expect(result.pubDate).toBeInstanceOf(Date);
  });

  it("accepts citation with only DOI", () => {
    const result = ArticleSchema.parse({
      ...validArticle,
      citation: { doi: "10.1234/test" },
    });
    expect(result.citation?.doi).toBe("10.1234/test");
    expect(result.citation?.authors).toEqual([]);
    expect(result.citation?.pmid).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// GlossaryTermSchema
// ---------------------------------------------------------------------------
describe("GlossaryTermSchema", () => {
  const validTerm = {
    term: "Amino Acid",
    definition: "Organic molecule with amino and carboxyl groups",
    category: "Biochemistry",
  };

  it("accepts a valid glossary term", () => {
    const result = GlossaryTermSchema.parse(validTerm);
    expect(result.term).toBe("Amino Acid");
    expect(result.aliases).toEqual([]);
    expect(result.relatedTerms).toEqual([]);
    expect(result.source).toBeUndefined();
  });

  it("accepts with all optional fields", () => {
    const result = GlossaryTermSchema.parse({
      ...validTerm,
      aliases: ["AA", "alpha-amino acid"],
      relatedTerms: ["peptide", "protein"],
      source: "IUPAC",
    });
    expect(result.aliases).toHaveLength(2);
    expect(result.relatedTerms).toHaveLength(2);
    expect(result.source).toBe("IUPAC");
  });

  it("rejects empty term", () => {
    expect(() => GlossaryTermSchema.parse({ ...validTerm, term: "" })).toThrow();
  });

  it("rejects empty definition", () => {
    expect(() => GlossaryTermSchema.parse({ ...validTerm, definition: "" })).toThrow();
  });

  it("rejects empty category", () => {
    expect(() => GlossaryTermSchema.parse({ ...validTerm, category: "" })).toThrow();
  });
});

// ---------------------------------------------------------------------------
// QuizQuestionSchema
// ---------------------------------------------------------------------------
describe("QuizQuestionSchema", () => {
  const validQuestion = {
    question: "How many amino acids in a tripeptide?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
    explanation: "A tripeptide has exactly 3 amino acids.",
  };

  it("accepts a valid quiz question", () => {
    const result = QuizQuestionSchema.parse(validQuestion);
    expect(result.question).toBe("How many amino acids in a tripeptide?");
    expect(result.options).toHaveLength(4);
    expect(result.correctIndex).toBe(1);
    expect(result.difficulty).toBe("intermediate"); // default
    expect(result.tags).toEqual([]);
  });

  it("accepts with custom difficulty and tags", () => {
    const result = QuizQuestionSchema.parse({
      ...validQuestion,
      difficulty: "expert",
      tags: ["classification", "tripeptide"],
    });
    expect(result.difficulty).toBe("expert");
    expect(result.tags).toHaveLength(2);
  });

  it("rejects with fewer than 2 options", () => {
    expect(() =>
      QuizQuestionSchema.parse({
        ...validQuestion,
        options: ["only-one"],
      }),
    ).toThrow();
  });

  it("rejects negative correctIndex", () => {
    expect(() =>
      QuizQuestionSchema.parse({
        ...validQuestion,
        correctIndex: -1,
      }),
    ).toThrow();
  });

  it("rejects empty question", () => {
    expect(() =>
      QuizQuestionSchema.parse({
        ...validQuestion,
        question: "",
      }),
    ).toThrow();
  });

  it("rejects empty explanation", () => {
    expect(() =>
      QuizQuestionSchema.parse({
        ...validQuestion,
        explanation: "",
      }),
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// FlashcardSchema
// ---------------------------------------------------------------------------
describe("FlashcardSchema", () => {
  const validFlashcard = {
    front: "What is glycine?",
    back: "The smallest amino acid with only H as side chain",
  };

  it("accepts a valid flashcard", () => {
    const result = FlashcardSchema.parse(validFlashcard);
    expect(result.front).toBe("What is glycine?");
    expect(result.back).toBe("The smallest amino acid with only H as side chain");
    expect(result.tags).toEqual([]);
    expect(result.difficulty).toBe("intermediate"); // default
  });

  it("accepts with all optional fields", () => {
    const result = FlashcardSchema.parse({
      ...validFlashcard,
      tags: ["amino-acids", "beginner"],
      difficulty: "beginner",
    });
    expect(result.tags).toHaveLength(2);
    expect(result.difficulty).toBe("beginner");
  });

  it("rejects empty front", () => {
    expect(() => FlashcardSchema.parse({ ...validFlashcard, front: "" })).toThrow();
  });

  it("rejects empty back", () => {
    expect(() => FlashcardSchema.parse({ ...validFlashcard, back: "" })).toThrow();
  });
});
