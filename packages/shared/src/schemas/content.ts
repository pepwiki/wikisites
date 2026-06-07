import { z } from "zod";

export const ContentStatusSchema = z.enum(["draft", "review", "published", "deprecated"]);

export const DifficultyLevelSchema = z.enum(["beginner", "intermediate", "advanced", "expert"]);

export const ArticleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(320),
  status: ContentStatusSchema.default("draft"),
  author: z.string().min(1),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().min(1),
  difficulty: DifficultyLevelSchema.default("intermediate"),
  relatedArticles: z.array(z.string()).default([]),
  citation: z
    .object({
      doi: z.string().optional(),
      pmid: z.string().optional(),
      authors: z.array(z.string()).default([]),
      journal: z.string().optional(),
      year: z.number().int().optional(),
    })
    .optional(),
});

export const GlossaryTermSchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  category: z.string().min(1),
  relatedTerms: z.array(z.string()).default([]),
  source: z.string().optional(),
});

export const QuizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).min(2),
  correctIndex: z.number().int().min(0),
  explanation: z.string().min(1),
  difficulty: DifficultyLevelSchema.default("intermediate"),
  tags: z.array(z.string()).default([]),
});

export const FlashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  tags: z.array(z.string()).default([]),
  difficulty: DifficultyLevelSchema.default("intermediate"),
});

export type ContentStatus = z.infer<typeof ContentStatusSchema>;
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type GlossaryTerm = z.infer<typeof GlossaryTermSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Flashcard = z.infer<typeof FlashcardSchema>;
