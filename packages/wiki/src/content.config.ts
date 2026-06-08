import { defineCollection } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

const i18n = defineCollection({
  loader: i18nLoader(),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/articles" }),
});

const quizzes = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/quizzes" }),
});

const flashcards = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/flashcards" }),
});

export const collections = { docs, i18n, articles, quizzes, flashcards };
