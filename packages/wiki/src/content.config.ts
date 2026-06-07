import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  ArticleSchema,
  QuizQuestionSchema,
  FlashcardSchema,
} from "@wikisites/shared/schemas/content";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/articles" }),
  schema: ArticleSchema,
});

const quizzes = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/quizzes" }),
  schema: QuizQuestionSchema,
});

const flashcards = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/flashcards" }),
  schema: FlashcardSchema,
});

export const collections = { articles, quizzes, flashcards };
