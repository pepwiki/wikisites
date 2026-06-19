/**
 * SettingsPanel — Tabbed settings dialog with appearance, keyboard,
 * reading, and advanced sections.
 *
 * Accessible modal dialog triggered by Ctrl+,. Contains four tabs:
 * 1. Appearance — Theme picker, font size slider
 * 2. Keyboard — Shortcut remapping
 * 3. Reading — Outline default visibility, compact mode
 * 4. Advanced — Settings import/export, reset
 *
 * @module components/SettingsPanel
 */

import {
  createSignal,
  For,
  Show,
  onMount,
} from "solid-js";
import ThemePicker from "./ThemePicker";
import ShortcutRemapper from "./ShortcutRemapper";
import {
  createSettingsStore,
} from "../lib/settings-store";
import {
  DEFAULT_KEYBINDINGS,
} from "../lib/keybindings";
import {
  createKeyboardShortcutRegistry,
  type KeyboardShortcutRegistryApi,
  type Keybinding,
} from "../lib/keyboard-shortcuts";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SettingsPanelProps {
  /** Whether the panel is open. */
  isOpen: boolean;
  /** Callback to close the panel. */
  onClose: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

type TabId = "appearance" | "keyboard" | "reading" | "advanced";

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: "appearance", label: "Appearance" },
  { id: "keyboard", label: "Keyboard" },
  { id: "reading", label: "Reading" },
  { id: "advanced", label: "Advanced" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SettingsPanel(props: SettingsPanelProps) {
  let dialogRef: HTMLDivElement | undefined;
  let previouslyFocused: HTMLElement | undefined;

  const store = createSettingsStore();
  const [activeTab, setActiveTab] = createSignal<TabId>("appearance");
  const [exportText, setExportText] = createSignal("");
  const [importText, setImportText] = createSignal("");
  const [importError, setImportError] = createSignal<string | null>(null);
  const [importSuccess, setImportSuccess] = createSignal(false);

  // Shell shortcut remapping state
  let shellRegistry: KeyboardShortcutRegistryApi | null = null;
  const [shellBindings, setShellBindings] = createSignal<Keybinding[]>([...DEFAULT_KEYBINDINGS]);

  const handleThemeChange = (_themeName: string) => {
    // Theme is already applied by ThemePicker
  };

  const handleShellBindingUpdate = (id: string, key: string, modifiers: string[]) => {
    if (shellRegistry) {
      shellRegistry.updateBinding(id, {
        key,
        modifiers: modifiers as Keybinding["modifiers"],
      });
      shellRegistry.save();
    }
    setShellBindings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, key, modifiers: modifiers as Keybinding["modifiers"] } : b
      )
    );
  };

  const handleReset = () => {
    // Reset shell bindings
    if (shellRegistry) {
      shellRegistry.reset();
    }
    setShellBindings([...DEFAULT_KEYBINDINGS]);

    store.resetSettings();
  };

  const handleExport = () => {
    setExportText(store.exportSettings());
  };

  const handleImport = () => {
    setImportError(null);
    setImportSuccess(false);
    const result = store.importSettings(importText());
    if (result.ok) {
      setImportSuccess(true);
      setImportText("");
    } else {
      setImportError(result.error ?? "Unknown error");
    }
  };

  const handleImportFile = () => {
    if (typeof document === "undefined") return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        setImportText(text);
      } catch (e) {
        setImportError(e instanceof Error ? e.message : "Failed to read file");
      }
    };
    input.click();
  };

  const handleCopyExport = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(exportText()).catch(() => {
        // Silent fallback
      });
    }
  };

  // Focus trap and initial focus
  let wasOpen = props.isOpen;

  onMount(() => {
    if (typeof document === "undefined") return;

    // Initialize shell registry
    shellRegistry = createKeyboardShortcutRegistry(DEFAULT_KEYBINDINGS);
    setShellBindings(shellRegistry.getAll());
  });

  const checkOpen = () => {
    if (props.isOpen && !wasOpen) {
      previouslyFocused = document.activeElement as HTMLElement | undefined;
      requestAnimationFrame(() => {
        const firstTab = dialogRef?.querySelector<HTMLElement>("[role='tab']");
        firstTab?.focus();
      });
    } else if (!props.isOpen && wasOpen) {
      previouslyFocused?.focus();
    }
    wasOpen = props.isOpen;
  };

  // Run on each render
  checkOpen();

  const handleTabKeyDown = (e: KeyboardEvent) => {
    const tabs = TABS.map((t) => t.id);
    const currentIndex = tabs.indexOf(activeTab());

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        const nextTab = tabs[nextIndex];
        if (nextTab) {
          setActiveTab(nextTab);
          const tabEl = dialogRef?.querySelector<HTMLElement>(
            `[data-tab="${nextTab}"]`
          );
          tabEl?.focus();
        }
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        const prevTab = tabs[prevIndex];
        if (prevTab) {
          setActiveTab(prevTab);
          const tabEl = dialogRef?.querySelector<HTMLElement>(
            `[data-tab="${prevTab}"]`
          );
          tabEl?.focus();
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        props.onClose();
        break;
      }
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={handleBackdropClick}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Escape") {
            e.preventDefault();
            props.onClose();
          }
        }}
      >
        <div
          ref={dialogRef}
          class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[85vh] flex flex-col mx-4"
        >
          {/* Header */}
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              Settings
            </h2>
            <button
              type="button"
              onClick={props.onClose}
              class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close settings"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div
            class="flex border-b border-slate-200 dark:border-slate-700 px-6"
            role="tablist"
            aria-label="Settings tabs"
            onKeyDown={handleTabKeyDown}
          >
            <For each={TABS}>
              {(tab) => (
                <button
                  type="button"
                  role="tab"
                  data-tab={tab.id}
                  aria-selected={activeTab() === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  class={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab() === tab.id
                      ? "border-[#0D9488] text-[#0D9488]"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              )}
            </For>
          </div>

          {/* Tab content */}
          <div class="flex-1 overflow-y-auto px-6 py-5">
            {/* Appearance tab */}
            <Show when={activeTab() === "appearance"}>
              <div
                role="tabpanel"
                id="tabpanel-appearance"
                aria-labelledby="tab-appearance"
                class="space-y-6"
              >
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Theme
                  </h3>
                  <ThemePicker onThemeChange={handleThemeChange} />
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Font Size
                  </h3>
                  <div class="flex items-center gap-4">
                    <input
                      type="range"
                      min={12}
                      max={24}
                      step={1}
                      value={store.getFontSize()}
                      onInput={(e) =>
                        store.setFontSize(Number((e.target as HTMLInputElement).value))
                      }
                      class="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
                      aria-label="Font size slider"
                    />
                    <span class="text-sm text-slate-600 dark:text-slate-400 w-12 text-right tabular-nums">
                      {store.getFontSize()}px
                    </span>
                  </div>
                </div>
              </div>
            </Show>

            {/* Keyboard tab */}
            <Show when={activeTab() === "keyboard"}>
              <div
                role="tabpanel"
                id="tabpanel-keyboard"
                aria-labelledby="tab-keyboard"
              >
                <ShortcutRemapper
                  shellBindings={shellBindings()}
                  onShellBindingUpdate={handleShellBindingUpdate}
                  onReset={handleReset}
                />
              </div>
            </Show>

            {/* Reading tab */}
            <Show when={activeTab() === "reading"}>
              <div
                role="tabpanel"
                id="tabpanel-reading"
                aria-labelledby="tab-reading"
                class="space-y-6"
              >
                <div>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Show outline by default
                    </span>
                    <input
                      type="checkbox"
                      checked={store.getOutlineDefaultVisible()}
                      onChange={(e) =>
                        store.setOutlineDefaultVisible(
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      class="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                    />
                  </label>
                  <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    When enabled, the document outline panel will be visible on page load.
                  </p>
                </div>
              </div>
            </Show>

            {/* Advanced tab */}
            <Show when={activeTab() === "advanced"}>
              <div
                role="tabpanel"
                id="tabpanel-advanced"
                aria-labelledby="tab-advanced"
                class="space-y-6"
              >
                {/* Export */}
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Export Settings
                  </h3>
                  <Show when={exportText() === ""}>
                    <button
                      type="button"
                      class="px-3 py-2 text-sm font-medium text-[#0D9488] border border-[#0D9488] rounded-lg hover:bg-[#0D9488]/10 transition-colors"
                      onClick={handleExport}
                    >
                      Generate Export
                    </button>
                  </Show>
                  <Show when={exportText() !== ""}>
                    <div class="space-y-2">
                      <textarea
                        readonly
                        value={exportText()}
                        class="w-full h-32 p-3 text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 resize-none"
                        aria-label="Exported settings JSON"
                      />
                      <button
                        type="button"
                        class="px-3 py-1.5 text-xs font-medium text-[#0D9488] hover:bg-[#0D9488]/10 rounded transition-colors"
                        onClick={handleCopyExport}
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  </Show>
                </div>

                {/* Import */}
                <div>
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Import Settings
                  </h3>
                  <div class="space-y-2">
                    <textarea
                      value={importText()}
                      onInput={(e) =>
                        setImportText((e.target as HTMLTextAreaElement).value)
                      }
                      placeholder="Paste settings JSON here..."
                      class="w-full h-24 p-3 text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                      aria-label="Import settings JSON"
                    />
                    <div class="flex gap-2">
                      <button
                        type="button"
                        class="px-3 py-2 text-sm font-medium text-white bg-[#0D9488] rounded-lg hover:bg-[#0D9488]/90 transition-colors disabled:opacity-50"
                        onClick={handleImport}
                        disabled={importText().trim().length === 0}
                      >
                        Import
                      </button>
                      <button
                        type="button"
                        class="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={handleImportFile}
                      >
                        Import from File
                      </button>
                    </div>
                    <Show when={importError() !== null}>
                      <p class="text-xs text-red-500" role="alert">
                        {importError()}
                      </p>
                    </Show>
                    <Show when={importSuccess()}>
                      <p class="text-xs text-[#0D9488]" role="status">
                        Settings imported successfully.
                      </p>
                    </Show>
                  </div>
                </div>

                {/* Reset */}
                <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Reset All Settings
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    This will reset all settings including theme, font size, keyboard shortcuts, and reading preferences to their defaults.
                  </p>
                  <button
                    type="button"
                    class="px-3 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    onClick={handleReset}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </Show>
          </div>

          {/* Footer hint */}
          <div class="px-6 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500">
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">
              Ctrl
            </kbd>
            {" + "}
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">
              ,
            </kbd>
            {" to toggle this panel"}
          </div>
        </div>
      </div>
    </Show>
  );
}
