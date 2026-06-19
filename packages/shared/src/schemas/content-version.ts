import { z } from "zod";

export const ContentVersionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must follow semver (e.g., 1.0.0)"),
  lastModified: z.coerce.date(),
  author: z.string().min(1),
  changelog: z.string().default(""),
});

export type ContentVersion = z.infer<typeof ContentVersionSchema>;
