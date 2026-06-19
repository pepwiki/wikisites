/**
 * Settings persistence store for user preferences.
 *
 * Manages typed settings with Zod validation, localStorage persistence,
 * createSignal-based change notifications, and import/export functionality.
 *
 * @module settings-store
 */

import { z } from "zod";
import { createSignal, createEffect, untrack } from "solid-js";

// ─── Zod Schema ──────────────────────────────────────────────────────────────

/** Schema for validating settings stored in localStorage. */
export const SettingsSchema = z.object({
  /** Active theme name. */
  theme: z.string().default("default-light"),
  /** Font size in pixels. */
  fontSize: z.number().min(12).max(24).default(16),
  /** Custom keybinding remaps (action ID → new key combo). */
  keybindingRemaps: z.record(z.string(), z.string()).default({}),
  /** Whether the outline panel is visible by default. */
  outlineDefaultVisible: z.boolean().default(false),
  /** UI language code. */
  language: z.string().default("en"),
});

/** Inferred settings type. */
export type Settings = z.infer<typeof SettingsSchema>;

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "wikisites:settings";

// ─── localStorage Helpers ────────────────────────────────────────────────────

function loadFromStorage(): Settings | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    const result = SettingsSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

function saveToStorage(settings: Settings): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Quota exceeded — silent fallback
  }
}

function clearStorage(): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silent
  }
}

// ─── Store ───────────────────────────────────────────────────────────────────

/** Default settings value. */
const DEFAULT_SETTINGS: Settings = SettingsSchema.parse({});

/**
 * Create a reactive settings store with localStorage persistence.
 *
 * Returns a signal-based API where reads are reactive and writes
 * auto-persist to localStorage.
 */
export function createSettingsStore() {
  const stored = loadFromStorage();
  const initial = stored ?? DEFAULT_SETTINGS;

  const [settings, setSettings] = createSignal<Settings>(initial);

  // Auto-persist on changes
  createEffect(() => {
    const current = settings();
    // Read the signal to subscribe
    void current.theme;
    void current.fontSize;
    void current.keybindingRemaps;
    void current.outlineDefaultVisible;
    void current.language;
    untrack(() => {
      saveToStorage(current);
    });
  });

  function updateSettings(partial: Partial<Settings>): void {
    setSettings((prev) => ({ ...prev, ...partial }));
  }

  function resetSettings(): void {
    setSettings({ ...DEFAULT_SETTINGS });
    clearStorage();
  }

  function exportSettings(): string {
    return JSON.stringify(settings(), null, 2);
  }

  function importSettings(json: string): { ok: boolean; error?: string } {
    try {
      const parsed = JSON.parse(json) as unknown;
      const result = SettingsSchema.safeParse(parsed);
      if (!result.success) {
        const issues = result.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ");
        return { ok: false, error: `Invalid settings: ${issues}` };
      }
      setSettings(result.data);
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: `Failed to parse JSON: ${e instanceof Error ? e.message : "unknown error"}`,
      };
    }
  }

  function getTheme(): string {
    return settings().theme;
  }

  function setTheme(theme: string): void {
    updateSettings({ theme });
  }

  function getFontSize(): number {
    return settings().fontSize;
  }

  function setFontSize(fontSize: number): void {
    updateSettings({ fontSize });
  }

  function getKeybindingRemaps(): Record<string, string> {
    return settings().keybindingRemaps;
  }

  function setKeybindingRemap(action: string, key: string): void {
    const remaps = { ...settings().keybindingRemaps, [action]: key };
    updateSettings({ keybindingRemaps: remaps });
  }

  function removeKeybindingRemap(action: string): void {
    const remaps = { ...settings().keybindingRemaps };
    delete remaps[action];
    updateSettings({ keybindingRemaps: remaps });
  }

  function getOutlineDefaultVisible(): boolean {
    return settings().outlineDefaultVisible;
  }

  function setOutlineDefaultVisible(visible: boolean): void {
    updateSettings({ outlineDefaultVisible: visible });
  }

  function getLanguage(): string {
    return settings().language;
  }

  function setLanguage(language: string): void {
    updateSettings({ language });
  }

  return {
    /** Read-only accessor for the current settings. */
    settings,
    /** Update one or more settings. */
    updateSettings,
    /** Reset all settings to defaults. */
    resetSettings,
    /** Export settings as JSON string. */
    exportSettings,
    /** Import settings from a JSON string. */
    importSettings,
    /** Get the active theme name. */
    getTheme,
    /** Set the active theme name. */
    setTheme,
    /** Get the font size. */
    getFontSize,
    /** Set the font size. */
    setFontSize,
    /** Get keybinding remaps. */
    getKeybindingRemaps,
    /** Set a keybinding remap. */
    setKeybindingRemap,
    /** Remove a keybinding remap. */
    removeKeybindingRemap,
    /** Get outline default visibility. */
    getOutlineDefaultVisible,
    /** Set outline default visibility. */
    setOutlineDefaultVisible,
    /** Get the UI language. */
    getLanguage,
    /** Set the UI language. */
    setLanguage,
  };
}
