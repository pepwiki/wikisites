// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  ModifierSchema,
  BindingScopeSchema,
  KeybindingSchema,
  KeybindingRegistrySchema,
  type Keybinding,
  KeybindingParseError,
  DuplicateBindingError,
  isMac,
  normalizeModifier,
  displayBinding,
  parseKeybindingString,
  detectConflicts,
  createKeyboardShortcutRegistry,
} from "../lib/keyboard-shortcuts";

// ─── localStorage Polyfill for jsdom ─────────────────────────────────────────

const localStorageStore: Record<string, string> = {};

beforeEach(() => {
  Object.keys(localStorageStore).forEach((k) => delete localStorageStore[k]);
});

Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key: string) => localStorageStore[key] ?? null,
    setItem: (key: string, value: string) => {
      localStorageStore[key] = String(value);
    },
    removeItem: (key: string) => {
      delete localStorageStore[key];
    },
    clear: () => {
      Object.keys(localStorageStore).forEach((k) => delete localStorageStore[k]);
    },
    get length() {
      return Object.keys(localStorageStore).length;
    },
    key: (index: number) => Object.keys(localStorageStore)[index] ?? null,
  },
  writable: true,
  configurable: true,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeBinding(overrides: Partial<Keybinding> = {}): Keybinding {
  return {
    id: "test-binding",
    key: "k",
    modifiers: ["Ctrl"],
    action: "testAction",
    scope: "global",
    description: "Test binding",
    ...overrides,
  };
}

// ─── Zod Schema Validation ───────────────────────────────────────────────────

describe("Zod schemas", () => {
  describe("ModifierSchema", () => {
    it("accepts valid modifiers", () => {
      expect(ModifierSchema.parse("Ctrl")).toBe("Ctrl");
      expect(ModifierSchema.parse("Alt")).toBe("Alt");
      expect(ModifierSchema.parse("Shift")).toBe("Shift");
      expect(ModifierSchema.parse("Meta")).toBe("Meta");
    });

    it("rejects invalid modifiers", () => {
      expect(() => ModifierSchema.parse("Control")).toThrow();
      expect(() => ModifierSchema.parse("")).toThrow();
      expect(() => ModifierSchema.parse("Fn")).toThrow();
    });
  });

  describe("BindingScopeSchema", () => {
    it("accepts valid scopes", () => {
      expect(BindingScopeSchema.parse("global")).toBe("global");
      expect(BindingScopeSchema.parse("modal")).toBe("modal");
      expect(BindingScopeSchema.parse("article")).toBe("article");
    });

    it("rejects invalid scopes", () => {
      expect(() => BindingScopeSchema.parse("page")).toThrow();
      expect(() => BindingScopeSchema.parse("")).toThrow();
    });
  });

  describe("KeybindingSchema", () => {
    it("accepts a valid keybinding", () => {
      const input = {
        id: "save",
        key: "s",
        modifiers: ["Ctrl"],
        action: "saveDocument",
        scope: "global",
        description: "Save document",
      };
      const result = KeybindingSchema.parse(input);
      expect(result.id).toBe("save");
      expect(result.key).toBe("s");
      expect(result.modifiers).toEqual(["Ctrl"]);
    });

    it("defaults modifiers to empty array", () => {
      const input = {
        id: "enter",
        key: "Enter",
        action: "submit",
        scope: "global",
        description: "Submit form",
      };
      const result = KeybindingSchema.parse(input);
      expect(result.modifiers).toEqual([]);
    });

    it("rejects empty id", () => {
      expect(() =>
        KeybindingSchema.parse({
          id: "",
          key: "a",
          action: "test",
          scope: "global",
          description: "Test",
        })
      ).toThrow();
    });

    it("rejects empty key", () => {
      expect(() =>
        KeybindingSchema.parse({
          id: "test",
          key: "",
          action: "test",
          scope: "global",
          description: "Test",
        })
      ).toThrow();
    });

    it("rejects id longer than 64 chars", () => {
      expect(() =>
        KeybindingSchema.parse({
          id: "a".repeat(65),
          key: "a",
          action: "test",
          scope: "global",
          description: "Test",
        })
      ).toThrow();
    });
  });

  describe("KeybindingRegistrySchema", () => {
    it("accepts a valid registry", () => {
      const result = KeybindingRegistrySchema.parse({
        version: 1,
        bindings: [
          {
            id: "save",
            key: "s",
            modifiers: ["Ctrl"],
            action: "saveDocument",
            scope: "global",
            description: "Save",
          },
        ],
      });
      expect(result.version).toBe(1);
      expect(result.bindings).toHaveLength(1);
    });

    it("rejects negative version", () => {
      expect(() =>
        KeybindingRegistrySchema.parse({ version: -1, bindings: [] })
      ).toThrow();
    });
  });
});

// ─── Platform Detection & Modifier Normalization ──────────────────────────────

describe("isMac", () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it("returns false when navigator is undefined (SSR)", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    expect(isMac()).toBe(false);
  });

  it("returns true on Mac platform", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "MacIntel" },
      writable: true,
      configurable: true,
    });
    expect(isMac()).toBe(true);
  });

  it("returns true on iPhone platform", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "iPhone" },
      writable: true,
      configurable: true,
    });
    expect(isMac()).toBe(true);
  });

  it("returns false on Windows platform", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "Win32" },
      writable: true,
      configurable: true,
    });
    expect(isMac()).toBe(false);
  });

  it("returns false on Linux platform", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "Linux x86_64" },
      writable: true,
      configurable: true,
    });
    expect(isMac()).toBe(false);
  });
});

describe("normalizeModifier", () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it("maps Ctrl to Meta on Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "MacIntel" },
      writable: true,
      configurable: true,
    });
    expect(normalizeModifier("Ctrl")).toBe("Meta");
  });

  it("keeps Ctrl on non-Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "Win32" },
      writable: true,
      configurable: true,
    });
    expect(normalizeModifier("Ctrl")).toBe("Ctrl");
  });

  it("passes through other modifiers unchanged", () => {
    expect(normalizeModifier("Alt")).toBe("Alt");
    expect(normalizeModifier("Shift")).toBe("Shift");
    expect(normalizeModifier("Meta")).toBe("Meta");
  });
});

// ─── displayBinding ──────────────────────────────────────────────────────────

describe("displayBinding", () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it("shows Mac symbols on Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "MacIntel" },
      writable: true,
      configurable: true,
    });
    // On Mac, Ctrl normalizes to Meta (⌘), Shift stays ⇧
    const binding = makeBinding({ modifiers: ["Ctrl", "Shift"], key: "K" });
    expect(displayBinding(binding)).toBe("⌘+⇧+K");
  });

  it("shows text labels on non-Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "Win32" },
      writable: true,
      configurable: true,
    });
    const binding = makeBinding({ modifiers: ["Ctrl", "Shift"], key: "K" });
    expect(displayBinding(binding)).toBe("Ctrl+Shift+K");
  });

  it("shows ⌘ for Meta on Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "MacIntel" },
      writable: true,
      configurable: true,
    });
    const binding = makeBinding({ modifiers: ["Meta"], key: "s" });
    expect(displayBinding(binding)).toBe("⌘+s");
  });

  it("shows Ctrl for Meta on non-Mac", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "Win32" },
      writable: true,
      configurable: true,
    });
    const binding = makeBinding({ modifiers: ["Meta"], key: "s" });
    expect(displayBinding(binding)).toBe("Ctrl+s");
  });

  it("normalizes Ctrl to Meta on Mac for display", () => {
    Object.defineProperty(globalThis, "navigator", {
      value: { platform: "MacIntel" },
      writable: true,
      configurable: true,
    });
    const binding = makeBinding({ modifiers: ["Ctrl"], key: "k" });
    expect(displayBinding(binding)).toBe("⌘+k");
  });

  it("handles binding with no modifiers", () => {
    const binding = makeBinding({ modifiers: [], key: "Enter" });
    expect(displayBinding(binding)).toBe("Enter");
  });
});

// ─── parseKeybindingString ───────────────────────────────────────────────────

describe("parseKeybindingString", () => {
  it("parses single modifier + key", () => {
    const result = parseKeybindingString("Ctrl+K");
    expect(result).toEqual({ key: "K", modifiers: ["Ctrl"] });
  });

  it("parses multiple modifiers", () => {
    const result = parseKeybindingString("Ctrl+Shift+Alt+K");
    expect(result).toEqual({
      key: "K",
      modifiers: ["Ctrl", "Shift", "Alt"],
    });
  });

  it("parses key only (no modifiers)", () => {
    const result = parseKeybindingString("Enter");
    expect(result).toEqual({ key: "Enter", modifiers: [] });
  });

  it("handles whitespace around parts", () => {
    const result = parseKeybindingString("Ctrl + Shift + K");
    expect(result).toEqual({ key: "K", modifiers: ["Ctrl", "Shift"] });
  });

  it("parses compound key names like ArrowDown", () => {
    const result = parseKeybindingString("Shift+ArrowDown");
    expect(result).toEqual({ key: "ArrowDown", modifiers: ["Shift"] });
  });

  it("throws KeybindingParseError for empty string", () => {
    expect(() => parseKeybindingString("")).toThrow(KeybindingParseError);
  });

  it("throws KeybindingParseError for modifier-only string", () => {
    expect(() => parseKeybindingString("Ctrl+Shift")).toThrow(
      KeybindingParseError
    );
  });
});

// ─── Conflict Detection ──────────────────────────────────────────────────────

describe("detectConflicts", () => {
  it("detects exact same key combo in same scope", () => {
    const existing = makeBinding({ id: "a", scope: "global" });
    const newBinding = makeBinding({ id: "b", scope: "global" });
    const conflicts = detectConflicts(newBinding, [existing]);
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].id).toBe("a");
  });

  it("does not conflict when key combos differ", () => {
    const existing = makeBinding({ id: "a", key: "k" });
    const newBinding = makeBinding({ id: "b", key: "j" });
    const conflicts = detectConflicts(newBinding, [existing]);
    expect(conflicts).toHaveLength(0);
  });

  it("does not conflict when scopes differ (non-global)", () => {
    const existing = makeBinding({ id: "a", scope: "article" });
    const newBinding = makeBinding({ id: "b", scope: "modal" });
    const conflicts = detectConflicts(newBinding, [existing]);
    expect(conflicts).toHaveLength(0);
  });

  it("global scope conflicts with any same key combo", () => {
    const existing = makeBinding({ id: "a", scope: "article" });
    const newBinding = makeBinding({ id: "b", scope: "global" });
    const conflicts = detectConflicts(newBinding, [existing]);
    expect(conflicts).toHaveLength(1);
  });

  it("existing global conflicts with new binding in any scope", () => {
    const existing = makeBinding({ id: "a", scope: "global" });
    const newBinding = makeBinding({ id: "b", scope: "modal" });
    const conflicts = detectConflicts(newBinding, [existing]);
    expect(conflicts).toHaveLength(1);
  });

  it("ignores same-id bindings (self)", () => {
    const existing = makeBinding({ id: "a" });
    const conflicts = detectConflicts(existing, [existing]);
    expect(conflicts).toHaveLength(0);
  });

  it("returns multiple conflicts", () => {
    const a = makeBinding({ id: "a", scope: "global" });
    const b = makeBinding({ id: "b", scope: "article" });
    const newBinding = makeBinding({ id: "c", scope: "global" });
    const conflicts = detectConflicts(newBinding, [a, b]);
    expect(conflicts.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Registry CRUD ───────────────────────────────────────────────────────────

describe("createKeyboardShortcutRegistry", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("registers a valid binding", () => {
    const reg = createKeyboardShortcutRegistry();
    const binding = makeBinding();
    reg.register(binding);
    expect(reg.getAll()).toHaveLength(1);
    expect(reg.getById("test-binding")).toBeDefined();
  });

  it("throws DuplicateBindingError for duplicate id", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(makeBinding({ id: "dup" }));
    expect(() => reg.register(makeBinding({ id: "dup" }))).toThrow(
      DuplicateBindingError
    );
  });

  it("unregisters a binding", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(makeBinding({ id: "x" }));
    reg.unregister("x");
    expect(reg.getById("x")).toBeUndefined();
    expect(reg.getAll()).toHaveLength(0);
  });

  it("updates a binding", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(makeBinding({ id: "u", key: "k" }));
    reg.updateBinding("u", { key: "j" });
    expect(reg.getById("u")?.key).toBe("j");
  });

  it("detects conflicts via registry method", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(makeBinding({ id: "a" }));
    const conflicts = reg.detectConflict(
      makeBinding({ id: "b" }) // same key+scope
    );
    expect(conflicts.length).toBeGreaterThanOrEqual(1);
  });

  it("loads defaults when no localStorage data", () => {
    const defaults = [makeBinding({ id: "default-1" })];
    const reg = createKeyboardShortcutRegistry(defaults);
    expect(reg.getAll()).toHaveLength(1);
    expect(reg.getById("default-1")).toBeDefined();
  });
});

// ─── localStorage Save/Load/Reset ────────────────────────────────────────────

describe("localStorage persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves to localStorage", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(makeBinding({ id: "save-test" }));
    reg.save();
    const raw = localStorage.getItem("wikisites-keybindings");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.version).toBe(1);
    expect(parsed.bindings).toHaveLength(1);
    // Verify structure
    expect(Array.isArray(parsed.bindings)).toBe(true);
  });

  it("loads from localStorage", () => {
    const data = {
      version: 1,
      bindings: [makeBinding({ id: "loaded" })],
    };
    localStorage.setItem("wikisites-keybindings", JSON.stringify(data));
    const reg = createKeyboardShortcutRegistry();
    expect(reg.getById("loaded")).toBeDefined();
  });

  it("resets to defaults and clears localStorage", () => {
    const defaults = [makeBinding({ id: "default" })];
    const reg = createKeyboardShortcutRegistry(defaults);
    reg.register(makeBinding({ id: "custom" }));
    reg.save();
    expect(reg.getAll()).toHaveLength(2);

    reg.reset();
    expect(reg.getAll()).toHaveLength(1);
    expect(reg.getById("default")).toBeDefined();
    expect(reg.getById("custom")).toBeUndefined();
    expect(localStorage.getItem("wikisites-keybindings")).toBeNull();
  });

  it("ignores invalid localStorage data", () => {
    localStorage.setItem(
      "wikisites-keybindings",
      JSON.stringify({ version: -1, bindings: "not-array" })
    );
    const reg = createKeyboardShortcutRegistry([makeBinding({ id: "fallback" })]);
    expect(reg.getById("fallback")).toBeDefined();
  });
});

// ─── handleKeydown Dispatch ──────────────────────────────────────────────────

describe("handleKeydown", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns action for matching keybinding", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "search",
        key: "k",
        modifiers: ["Ctrl"],
        action: "openSearch",
        scope: "global",
      })
    );
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
    });
    expect(reg.handleKeydown(event)).toBe("openSearch");
  });

  it("returns null for non-matching key", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "search",
        key: "k",
        modifiers: ["Ctrl"],
        action: "openSearch",
      })
    );
    const event = new KeyboardEvent("keydown", { key: "j", ctrlKey: true });
    expect(reg.handleKeydown(event)).toBeNull();
  });

  it("returns null for non-matching modifiers", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "search",
        key: "k",
        modifiers: ["Ctrl"],
        action: "openSearch",
      })
    );
    const event = new KeyboardEvent("keydown", { key: "k", shiftKey: true });
    expect(reg.handleKeydown(event)).toBeNull();
  });

  it("skips when target is an input element", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "save",
        key: "s",
        modifiers: ["Ctrl"],
        action: "save",
      })
    );
    const input = document.createElement("input");
    document.body.appendChild(input);
    const event = new KeyboardEvent("keydown", {
      key: "s",
      ctrlKey: true,
      bubbles: true,
    });
    Object.defineProperty(event, "target", { value: input });
    expect(reg.handleKeydown(event)).toBeNull();
    document.body.removeChild(input);
  });

  it("skips when target is a textarea", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "save",
        key: "s",
        modifiers: ["Ctrl"],
        action: "save",
      })
    );
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const event = new KeyboardEvent("keydown", {
      key: "s",
      ctrlKey: true,
      bubbles: true,
    });
    Object.defineProperty(event, "target", { value: textarea });
    expect(reg.handleKeydown(event)).toBeNull();
    document.body.removeChild(textarea);
  });

  it("matches scope-specific bindings", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "modal-action",
        key: "Enter",
        modifiers: [],
        action: "confirmModal",
        scope: "modal",
      })
    );
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    // Does not match when activeScope is "global"
    expect(reg.handleKeydown(event, "global")).toBeNull();
    // Matches when activeScope is "modal"
    expect(reg.handleKeydown(event, "modal")).toBe("confirmModal");
  });

  it("global bindings match regardless of active scope", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "global-action",
        key: "Escape",
        modifiers: [],
        action: "closeAll",
        scope: "global",
      })
    );
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    expect(reg.handleKeydown(event, "modal")).toBe("closeAll");
    expect(reg.handleKeydown(event, "article")).toBe("closeAll");
  });

  it("returns first matching binding", () => {
    const reg = createKeyboardShortcutRegistry();
    reg.register(
      makeBinding({
        id: "first",
        key: "k",
        modifiers: ["Ctrl"],
        action: "firstAction",
      })
    );
    reg.register(
      makeBinding({
        id: "second",
        key: "k",
        modifiers: ["Ctrl"],
        action: "secondAction",
      })
    );
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
    const result = reg.handleKeydown(event);
    expect(result).toBe("firstAction");
  });
});
