/**
 * KeyboardShortcutManager — P0 Prototype
 *
 * Global keyboard shortcut registry with conflict detection,
 * platform-aware modifiers, remappable bindings, and localStorage persistence.
 *
 * @module KeyboardShortcutManager
 * @see BP-POWER-USER-SHELL-001 §5.2, §7.3
 */

import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const ModifierSchema = z.enum(["Ctrl", "Alt", "Shift", "Meta"]);
export const BindingScopeSchema = z.enum(["global", "modal", "article"]);

export const KeybindingSchema = z.object({
  id: z.string().min(1).max(64),
  key: z.string().min(1).max(32),
  modifiers: z.array(ModifierSchema).default([]),
  action: z.string().min(1),
  scope: BindingScopeSchema,
  description: z.string().min(1).max(128),
});

export const KeybindingRegistrySchema = z.object({
  version: z.number().int().positive(),
  bindings: z.array(KeybindingSchema),
});

export type Modifier = z.infer<typeof ModifierSchema>;
export type BindingScope = z.infer<typeof BindingScopeSchema>;
export type Keybinding = z.infer<typeof KeybindingSchema>;
export type KeybindingRegistry = z.infer<typeof KeybindingRegistrySchema>;

// ─── Custom Errors ───────────────────────────────────────────────────────────

export class KeybindingParseError extends Error {
  constructor(keyString: string) {
    super(`Invalid keybinding format: "${keyString}"`);
    this.name = "KeybindingParseError";
  }
}

export class DuplicateBindingError extends Error {
  constructor(id: string) {
    super(`Duplicate binding ID: "${id}"`);
    this.name = "DuplicateBindingError";
  }
}

// ─── Platform Detection ──────────────────────────────────────────────────────

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

/**
 * Normalize modifier keys for the current platform.
 * Maps "Ctrl" → "Meta" on Mac, keeps "Ctrl" elsewhere.
 */
export function normalizeModifier(mod: Modifier): Modifier {
  if (isMac() && mod === "Ctrl") return "Meta";
  return mod;
}

/**
 * Platform-aware display string for a keybinding.
 * Shows ⌘ on Mac, Ctrl elsewhere.
 */
export function displayBinding(binding: Keybinding): string {
  const parts: string[] = [];
  for (const mod of binding.modifiers) {
    const normalized = normalizeModifier(mod);
    switch (normalized) {
      case "Meta":
        parts.push(isMac() ? "⌘" : "Ctrl");
        break;
      case "Ctrl":
        parts.push(isMac() ? "⌃" : "Ctrl");
        break;
      case "Alt":
        parts.push(isMac() ? "⌥" : "Alt");
        break;
      case "Shift":
        parts.push(isMac() ? "⇧" : "Shift");
        break;
    }
  }
  parts.push(binding.key);
  return parts.join("+");
}

// ─── Key String Parser ───────────────────────────────────────────────────────

export interface ParsedKeybinding {
  key: string;
  modifiers: Modifier[];
}

/**
 * Parse a keybinding string like "Ctrl+K" or "Shift+ArrowDown".
 * Format: [Modifier+...]Key
 *
 * @throws KeybindingParseError
 */
export function parseKeybindingString(str: string): ParsedKeybinding {
  const parts = str.split("+").map((p) => p.trim());
  if (parts.length === 0) {
    throw new KeybindingParseError(str);
  }

  const modifiers: Modifier[] = [];
  const keyParts: string[] = [];

  for (const part of parts) {
    switch (part) {
      case "Ctrl":
      case "Alt":
      case "Shift":
      case "Meta":
        modifiers.push(part);
        break;
      default:
        keyParts.push(part);
        break;
    }
  }

  if (keyParts.length === 0) {
    throw new KeybindingParseError(str);
  }

  // Join remaining parts as the key (e.g., "ArrowDown")
  return {
    key: keyParts.join("+"),
    modifiers,
  };
}

// ─── Conflict Detection ──────────────────────────────────────────────────────

function bindingKey(binding: Keybinding): string {
  const mods = [...binding.modifiers].sort().join("+");
  return `${mods}+${binding.key}+${binding.scope}`;
}

/**
 * Detect conflicts between a new binding and existing bindings.
 * A conflict occurs when two bindings share the same key+modifiers+scope
 * (or one is "global" scope, which conflicts with everything).
 */
export function detectConflicts(
  newBinding: Keybinding,
  existing: Keybinding[]
): Keybinding[] {
  const conflicts: Keybinding[] = [];
  const newKey = bindingKey(newBinding);

  for (const existingBinding of existing) {
    if (existingBinding.id === newBinding.id) continue;

    const existingKey = bindingKey(existingBinding);

    // Exact same key combo in same scope
    if (newKey === existingKey) {
      conflicts.push(existingBinding);
      continue;
    }

    // Global scope conflicts with any same key combo
    if (
      (newBinding.scope === "global" || existingBinding.scope === "global") &&
      newBinding.key === existingBinding.key &&
      arraysEqual(newBinding.modifiers, existingBinding.modifiers)
    ) {
      conflicts.push(existingBinding);
    }
  }

  return conflicts;
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

// ─── Registry ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "wikisites-keybindings";
const REGISTRY_VERSION = 1;

export interface KeyboardShortcutRegistryApi {
  register(binding: Keybinding): void;
  unregister(id: string): void;
  getAll(): Keybinding[];
  getById(id: string): Keybinding | undefined;
  detectConflict(binding: Keybinding): Keybinding[];
  updateBinding(id: string, updates: Partial<Omit<Keybinding, "id">>): void;
  save(): void;
  load(): void;
  reset(): void;
  handleKeydown(event: KeyboardEvent, activeScope?: BindingScope): string | null;
}

/**
 * Create a keyboard shortcut registry with conflict detection,
 * localStorage persistence, and keydown dispatch.
 */
export function createKeyboardShortcutRegistry(
  defaults: Keybinding[] = []
): KeyboardShortcutRegistryApi {
  const registry = new Map<string, Keybinding>();

  // Load saved bindings or use defaults
  const saved = loadFromStorage();
  const initialBindings = saved?.bindings ?? defaults;
  for (const b of initialBindings) {
    registry.set(b.id, b);
  }

  function register(binding: Keybinding): void {
    const parsed = KeybindingSchema.safeParse(binding);
    if (!parsed.success) {
      console.warn(`Invalid keybinding: ${parsed.error.message}`);
      return;
    }
    if (registry.has(parsed.data.id)) {
      throw new DuplicateBindingError(parsed.data.id);
    }
    registry.set(parsed.data.id, parsed.data);
  }

  function unregister(id: string): void {
    registry.delete(id);
  }

  function getAll(): Keybinding[] {
    return Array.from(registry.values());
  }

  function getById(id: string): Keybinding | undefined {
    return registry.get(id);
  }

  function detectConflict(binding: Keybinding): Keybinding[] {
    return detectConflicts(binding, getAll());
  }

  function updateBinding(
    id: string,
    updates: Partial<Omit<Keybinding, "id">>
  ): void {
    const existing = registry.get(id);
    if (!existing) return;
    const updated = { ...existing, ...updates };
    const parsed = KeybindingSchema.safeParse(updated);
    if (!parsed.success) {
      console.warn(`Invalid keybinding update: ${parsed.error.message}`);
      return;
    }
    registry.set(id, parsed.data);
  }

  function save(): void {
    try {
      if (typeof localStorage === "undefined") return;
      const data: KeybindingRegistry = {
        version: REGISTRY_VERSION,
        bindings: getAll(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage quota exceeded — silent fallback
    }
  }

  function load(): void {
    const data = loadFromStorage();
    if (!data) return;
    registry.clear();
    for (const b of data.bindings) {
      registry.set(b.id, b);
    }
  }

  function reset(): void {
    registry.clear();
    for (const b of defaults) {
      registry.set(b.id, b);
    }
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Handle a keydown event against the registry.
   * Returns the action string of the matched binding, or null.
   */
  function handleKeydown(
    event: KeyboardEvent,
    activeScope: BindingScope = "global"
  ): string | null {
    // Skip if user is typing in an input
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return null;
    }

    for (const binding of registry.values()) {
      // Scope check: global bindings always match, others only in matching scope
      const scopeMatch =
        binding.scope === "global" || binding.scope === activeScope;
      if (!scopeMatch) continue;

      // Normalize platform modifier
      const effectiveModifiers = binding.modifiers.map(normalizeModifier);
      const eventModifiers: Modifier[] = [];
      if (event.ctrlKey) eventModifiers.push("Ctrl");
      if (event.altKey) eventModifiers.push("Alt");
      if (event.shiftKey) eventModifiers.push("Shift");
      if (event.metaKey) eventModifiers.push("Meta");

      const keyMatch = binding.key === event.key;
      const modsMatch = arraysEqual(effectiveModifiers, eventModifiers);

      if (keyMatch && modsMatch) {
        return binding.action;
      }
    }

    return null;
  }

  return {
    register,
    unregister,
    getAll,
    getById,
    detectConflict,
    updateBinding,
    save,
    load,
    reset,
    handleKeydown,
  };
}

// ─── localStorage Helpers ────────────────────────────────────────────────────

function loadFromStorage(): KeybindingRegistry | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    const result = KeybindingRegistrySchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
