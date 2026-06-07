import { defineCollection } from "astro:content";
import {
  ArticleSchema,
  QuizQuestionSchema,
  FlashcardSchema,
} from "@wikisites/shared/schemas/content";

const articles = defineCollection({
  type: "content",
  schema: ArticleSchema,
});

const quizzes = defineCollection({
  type: "data",
  schema: QuizQuestionSchema,
});

const flashcards = defineCollection({
  type: "data",
  schema: FlashcardSchema,
});

export const collections = { articles, quizzes, flashcards };
