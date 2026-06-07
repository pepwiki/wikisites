import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { ArticleSchema } from "@wikisites/shared/schemas/content";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/articles" }),
  schema: ArticleSchema,
});

export const collections = { articles };
