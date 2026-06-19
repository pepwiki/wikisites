/**
 * @vitest-environment jsdom
 *
 * Tests for DEFAULT_KEYBINDINGS — Zod validation and conflict detection.
 *
 * Run with: vitest run keybindings
 */

import { describe, it, expect } from "vitest";
import { DEFAULT_KEYBINDINGS } from "../keybindings.js";
import { KeybindingSchema, detectConflicts } from "../keyboard-shortcuts.js";

// ---------------------------------------------------------------------------
// Zod validation
// ---------------------------------------------------------------------------

describe("DEFAULT_KEYBINDINGS Zod validation", () => {
  it("every binding passes KeybindingSchema", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      const result = KeybindingSchema.safeParse(binding);
      expect(result.success).toBe(true);
    }
  });

  it("contains the expected number of bindings", () => {
    expect(DEFAULT_KEYBINDINGS.length).toBe(14);
  });

  it("all IDs are unique", () => {
    const ids = DEFAULT_KEYBINDINGS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all IDs follow namespace.action pattern", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      expect(binding.id).toMatch(/^[a-z-]+\.[a-z-]+$/);
    }
  });

  it("all actions follow namespace.action pattern", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      expect(binding.action).toMatch(/^[a-z-]+\.[a-z-]+$/);
    }
  });

  it("scope values are valid", () => {
    const validScopes = ["global", "modal", "article"];
    for (const binding of DEFAULT_KEYBINDINGS) {
      expect(validScopes).toContain(binding.scope);
    }
  });

  it("non-modal bindings have modifiers", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      if (binding.scope !== "modal") {
        expect(binding.modifiers.length).toBeGreaterThan(0);
      }
    }
  });

  it("modal bindings have no modifiers", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      if (binding.scope === "modal") {
        expect(binding.modifiers).toEqual([]);
      }
    }
  });

  it("each binding has a non-empty description", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      expect(binding.description.length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Conflict detection
// ---------------------------------------------------------------------------

describe("DEFAULT_KEYBINDINGS conflict detection", () => {
  it("has no internal conflicts", () => {
    for (const binding of DEFAULT_KEYBINDINGS) {
      const others = DEFAULT_KEYBINDINGS.filter((b) => b.id !== binding.id);
      const conflicts = detectConflicts(binding, others);
      expect(conflicts).toEqual([]);
    }
  });

  it("detects a conflict when same key+scope is duplicated", () => {
    const duplicate = {
      ...DEFAULT_KEYBINDINGS[0]!,
      id: "global.duplicate",
    };
    const conflicts = detectConflicts(duplicate, DEFAULT_KEYBINDINGS);
    expect(conflicts.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Specific binding checks
// ---------------------------------------------------------------------------

describe("DEFAULT_KEYBINDINGS specific bindings", () => {
  function findById(id: string) {
    return DEFAULT_KEYBINDINGS.find((b) => b.id === id);
  }

  it("global.command-palette is Ctrl+K", () => {
    const b = findById("global.command-palette");
    expect(b).toBeDefined();
    expect(b!.key).toBe("k");
    expect(b!.modifiers).toContain("Ctrl");
    expect(b!.action).toBe("command-palette.open");
  });

  it("global.shortcut-help is Ctrl+/", () => {
    const b = findById("global.shortcut-help");
    expect(b).toBeDefined();
    expect(b!.key).toBe("/");
    expect(b!.modifiers).toContain("Ctrl");
    expect(b!.action).toBe("shortcut-help.toggle");
  });

  it("global.toggle-theme is Ctrl+Shift+D", () => {
    const b = findById("global.toggle-theme");
    expect(b).toBeDefined();
    expect(b!.key).toBe("D");
    expect(b!.modifiers).toContain("Ctrl");
    expect(b!.modifiers).toContain("Shift");
    expect(b!.action).toBe("theme.toggle");
  });

  it("flashcard.flip is Space in modal scope", () => {
    const b = findById("flashcard.flip");
    expect(b).toBeDefined();
    expect(b!.key).toBe(" ");
    expect(b!.scope).toBe("modal");
    expect(b!.action).toBe("flashcard.flip");
  });

  it("flashcard.rate bindings use 1-4 keys", () => {
    const rateIds = [
      "flashcard.rate-again",
      "flashcard.rate-hard",
      "flashcard.rate-good",
      "flashcard.rate-easy",
    ];
    for (const id of rateIds) {
      const b = findById(id);
      expect(b).toBeDefined();
      expect(b!.scope).toBe("modal");
    }
    expect(findById("flashcard.rate-again")!.key).toBe("1");
    expect(findById("flashcard.rate-hard")!.key).toBe("2");
    expect(findById("flashcard.rate-good")!.key).toBe("3");
    expect(findById("flashcard.rate-easy")!.key).toBe("4");
  });
});
