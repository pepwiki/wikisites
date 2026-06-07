import { z } from "zod";
import type { Oligopeptide } from "@wikisites/shared";

export const SearchQuerySchema = z.object({
  q: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
  filters: z
    .object({
      minLength: z.number().int().nonnegative().optional(),
      maxLength: z.number().int().positive().optional(),
      sequence: z
        .string()
        .regex(/^[GAVLIFWMSTCYNQHKRDE]+$/)
        .optional(),
      category: z.string().optional(),
    })
    .default({}),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export interface SearchResult {
  readonly peptide: Oligopeptide;
  readonly score: number;
  readonly highlights: ReadonlyArray<string>;
}

export interface SearchResponse {
  readonly query: SearchQuery;
  readonly results: ReadonlyArray<SearchResult>;
  readonly total: number;
  readonly offset: number;
  readonly limit: number;
}

/**
 * Search peptides by query string and optional filters.
 *
 * Current implementation is a stub returning empty results.
 * Will integrate with Pagefind or FlexSearch when index is built.
 *
 * @param query - Search parameters
 * @param peptides - Optional peptide dataset to search against
 * @returns SearchResponse with matched results
 */
export function searchPeptides(
  query: z.input<typeof SearchQuerySchema>,
  peptides: ReadonlyArray<Oligopeptide> = [],
): SearchResponse {
  const validated = SearchQuerySchema.parse(query);
  const { limit, offset, filters } = validated;

  let filtered = peptides;

  // Apply length filters
  if (filters.minLength !== undefined) {
    filtered = filtered.filter((p) => p.length >= filters.minLength!);
  }
  if (filters.maxLength !== undefined) {
    filtered = filtered.filter((p) => p.length <= filters.maxLength!);
  }

  // Apply sequence filter (prefix match)
  if (filters.sequence !== undefined) {
    const seq = filters.sequence!;
    filtered = filtered.filter((p) => p.sequence.startsWith(seq));
  }

  // Apply category filter
  if (filters.category !== undefined) {
    const cat = filters.category!.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.therapeuticArea.some((a) => a.toLowerCase().includes(cat)) ||
        p.biologicalActivity.toLowerCase().includes(cat),
    );
  }

  // Simple substring search on name and aliases
  const term = validated.q.toLowerCase();
  const matched = filtered.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.aliases.some((a) => a.toLowerCase().includes(term)) ||
      p.sequence.toLowerCase().includes(term),
  );

  // Score: exact name match > alias match > sequence match
  const results: Array<SearchResult> = matched.map((peptide) => {
    let score = 0;
    if (peptide.name.toLowerCase() === term) {
      score = 1.0;
    } else if (peptide.name.toLowerCase().includes(term)) {
      score = 0.8;
    } else if (peptide.aliases.some((a) => a.toLowerCase().includes(term))) {
      score = 0.6;
    } else if (peptide.sequence.toLowerCase().includes(term)) {
      score = 0.4;
    }
    return { peptide, score, highlights: [] };
  });

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Paginate
  const paginated = results.slice(offset, offset + limit);

  return {
    query: validated,
    results: paginated,
    total: results.length,
    offset,
    limit,
  };
}
