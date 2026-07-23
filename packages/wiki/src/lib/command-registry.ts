/**
 * Command Registry — Fuzzy-searchable command palette data store.
 *
 * Stores commands with labels, descriptions, categories, and optional
 * keyboard shortcuts. Provides fuzzy matching for quick navigation.
 *
 * @module command-registry
 * @see BP-POWER-USER-SHELL-001 §5.3
 */

import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const CommandSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().min(1).max(128),
  description: z.string().min(1).max(256),
  category: z.string().min(1).max(32),
  shortcut: z.string().optional(),
  icon: z.string().optional(),
  enabled: z.boolean().default(true),
});

export type Command = z.infer<typeof CommandSchema>;

export type CommandCategory = Command["category"];

export type CommandRegistry = CommandRegistryApi;

// ─── Fuzzy Match ─────────────────────────────────────────────────────────────

/**
 * Score a fuzzy match. Lower is better. Returns Infinity on no match.
 */
function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  let score = 0;
  let lastMatch = -1;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      // Bonus for consecutive matches
      if (lastMatch === ti - 1) score -= 2;
      // Bonus for word boundary matches
      if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "-") score -= 3;
      lastMatch = ti;
      qi++;
    } else {
      score += 1;
    }
  }

  return qi === q.length ? score : Infinity;
}

// ─── Registry ────────────────────────────────────────────────────────────────

export interface CommandRegistryApi {
  add(command: Command): void;
  remove(id: string): void;
  get(id: string): Command | undefined;
  getAll(): Command[];
  search(query: string): Command[];
  getByCategory(category: string): Command[];
  getCategories(): string[];
}

/**
 * Create a command registry with fuzzy search.
 */
export function createCommandRegistry(): CommandRegistryApi {
  const commands = new Map<string, Command>();

  function add(command: Command): void {
    const parsed = CommandSchema.safeParse(command);
    if (!parsed.success) {
      console.warn(`Invalid command: ${parsed.error.message}`);
      return;
    }
    commands.set(parsed.data.id, parsed.data);
  }

  function remove(id: string): void {
    commands.delete(id);
  }

  function get(id: string): Command | undefined {
    return commands.get(id);
  }

  function getAll(): Command[] {
    return Array.from(commands.values()).filter((c) => c.enabled);
  }

  function search(query: string): Command[] {
    if (!query.trim()) return getAll();

    const scored = getAll()
      .map((cmd) => ({
        command: cmd,
        score: Math.min(
          fuzzyScore(query, cmd.label),
          fuzzyScore(query, cmd.description) + 1,
          fuzzyScore(query, cmd.id) + 2
        ),
      }))
      .filter((item) => item.score < Infinity);

    scored.sort((a, b) => a.score - b.score);
    return scored.map((item) => item.command);
  }

  function getByCategory(category: string): Command[] {
    return getAll().filter((c) => c.category === category);
  }

  function getCategories(): string[] {
    const cats = new Set<string>();
    for (const cmd of commands.values()) {
      if (cmd.enabled) cats.add(cmd.category);
    }
    return Array.from(cats).sort();
  }

  return { add, remove, get, getAll, search, getByCategory, getCategories };
}
