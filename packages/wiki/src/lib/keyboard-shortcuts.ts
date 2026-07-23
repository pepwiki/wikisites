/**
 * KeyboardShortcutManager — Global keyboard shortcut registry
 * with conflict detection, platform-aware modifiers, remappable
 * bindings, localStorage persistence, and SolidJS reactive wrapper.
 *
 * @module keyboard-shortcuts
 * @see BP-POWER-USER-SHELL-001 §5.2, §7.3
 */

import { z } from "zod";
import {
  createSignal,
  createMemo,
  createEffect,
  onMount,
  onCleanup,
  untrack,
} from "solid-js";

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

// ─── Types ───────────────────────────────────────────────────────────────────

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

export function isMac(): boolean {
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
  if (str.trim().length === 0) {
    throw new KeybindingParseError(str);
  }
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

    if (newKey === existingKey) {
      conflicts.push(existingBinding);
      continue;
    }

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

// ─── localStorage Helpers ────────────────────────────────────────────────────

const STORAGE_KEY = "wikisites-keybindings";
const REGISTRY_VERSION = 1;

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

function saveToStorage(bindings: Keybinding[]): void {
  try {
    if (typeof localStorage === "undefined") return;
    const data: KeybindingRegistry = {
      version: REGISTRY_VERSION,
      bindings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage quota exceeded — silent fallback
  }
}

function removeFromStorage(): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silent
  }
}

// ─── Registry ────────────────────────────────────────────────────────────────

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
    saveToStorage(getAll());
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
    removeFromStorage();
  }

  function handleKeydown(
    event: KeyboardEvent,
    activeScope: BindingScope = "global"
  ): string | null {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return null;
    }

    for (const binding of registry.values()) {
      const scopeMatch =
        binding.scope === "global" || binding.scope === activeScope;
      if (!scopeMatch) continue;

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

// ─── SolidJS Reactive Manager ────────────────────────────────────────────────

export interface KeyboardShortcutManagerApi extends KeyboardShortcutRegistryApi {
  activeScope: () => BindingScope;
  setActiveScope: (scope: BindingScope) => void;
  activeBindings: () => Keybinding[];
}

/**
 * SSR-safe check — returns true when running on the server.
 */
function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Create a SolidJS-reactive keyboard shortcut manager.
 *
 * Wraps the pure registry with signals for scope and bindings,
 * auto-saves to localStorage via createEffect, and wires a global
 * keydown listener via onMount/onCleanup. No-ops on the server.
 */
export function createKeyboardShortcutManager(
  defaults: Keybinding[] = []
): KeyboardShortcutManagerApi {
  if (isServer()) {
    const noop = () => {};
    return {
      activeScope: () => "global",
      setActiveScope: noop,
      activeBindings: () => [],
      register: noop,
      unregister: noop,
      getAll: () => [],
      getById: () => undefined,
      detectConflict: () => [],
      updateBinding: noop,
      save: noop,
      load: noop,
      reset: noop,
      handleKeydown: () => null,
    };
  }

  const [activeScope, setActiveScope] = createSignal<BindingScope>("global");
  const [bindings, setBindings] = createSignal<Keybinding[]>([]);

  const registry = createKeyboardShortcutRegistry(defaults);

  // Initialize from storage or defaults
  const saved = loadFromStorage();
  const initial = saved?.bindings ?? defaults;
  setBindings(initial);

  // Sync internal registry state when bindings change.
  // Reads are wrapped in untrack to prevent tracking the signals inside
  // this helper, avoiding a race between two separate signal reads.
  function syncRegistry() {
    untrack(() => {
      const current = bindings();
      registry.load();
      const stored = registry.getAll();
      if (stored.length !== current.length) {
        for (const b of current) {
          try {
            registry.register(b);
          } catch {
            // duplicate — already present
          }
        }
      }
    });
  }

  syncRegistry();

  const activeBindings = createMemo(() => {
    const scope = activeScope();
    return bindings().filter(
      (b) => b.scope === "global" || b.scope === scope
    );
  });

  // Auto-save to localStorage whenever bindings change
  createEffect(() => {
    const current = bindings();
    void current;
    untrack(() => {
      saveToStorage(current);
    });
  });

  function register(binding: Keybinding): void {
    registry.register(binding);
    setBindings((prev) => [...prev, binding]);
  }

  function unregister(id: string): void {
    registry.unregister(id);
    setBindings((prev) => prev.filter((b) => b.id !== id));
  }

  function getAll(): Keybinding[] {
    return bindings();
  }

  function getById(id: string): Keybinding | undefined {
    return bindings().find((b) => b.id === id);
  }

  function detectConflict(binding: Keybinding): Keybinding[] {
    return detectConflicts(binding, bindings());
  }

  function updateBinding(
    id: string,
    updates: Partial<Omit<Keybinding, "id">>
  ): void {
    registry.updateBinding(id, updates);
    setBindings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }

  function save(): void {
    saveToStorage(bindings());
  }

  function load(): void {
    untrack(() => {
      registry.load();
      setBindings(registry.getAll());
    });
  }

  function reset(): void {
    untrack(() => {
      registry.reset();
      setBindings([...defaults]);
      removeFromStorage();
    });
  }

  function handleKeydown(
    event: KeyboardEvent,
    scope?: BindingScope
  ): string | null {
    return untrack(() =>
      registry.handleKeydown(event, scope ?? activeScope()),
    );
  }

  // Wire global keydown listener
  onMount(() => {
    function handler(e: KeyboardEvent) {
      handleKeydown(e);
    }
    document.addEventListener("keydown", handler);
    onCleanup(() => {
      document.removeEventListener("keydown", handler);
    });
  });

  return {
    activeScope,
    setActiveScope,
    activeBindings,
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
