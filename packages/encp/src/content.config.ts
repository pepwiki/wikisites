import { defineCollection } from "astro:content";
import { ArticleSchema } from "@wikisites/shared/schemas/content";

const articles = defineCollection({
  type: "content",
  schema: ArticleSchema,
});

export const collections = { articles };
