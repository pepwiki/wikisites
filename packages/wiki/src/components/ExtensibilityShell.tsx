/**
 * ExtensibilityShell — Master component for P4 extensibility features.
 *
 * Responsibilities:
 * - Theme picker integration
 * - Settings panel integration
 * - Settings panel toggle (Ctrl+,)
 * - SSR-safe initialization
 *
 * Usage: `<ExtensibilityShell client:load />`
 *
 * @module components/ExtensibilityShell
 */

import {
  createSignal,
  onMount,
  onCleanup,
  Show,
  lazy,
  Suspense,
  type Component,
} from "solid-js";

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

// ─── Lazy Component Imports ──────────────────────────────────────────────────

const SettingsPanel = lazy(() => import("./SettingsPanel"));
const ThemePicker = lazy(() => import("./ThemePicker"));

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExtensibilityShellProps {}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Master extensibility shell. Wires theme picker, settings panel,
 * and P4 commands.
 */
const ExtensibilityShell: Component<ExtensibilityShellProps> = (_props) => {
  // ── State ───────────────────────────────────────────────────────────────
  const [settingsOpen, setSettingsOpen] = createSignal(false);
  const [themePickerOpen, setThemePickerOpen] = createSignal(false);

  // ── Settings panel toggle (Ctrl+,) ────────────────────────────────────
  onMount(() => {
    if (isServer()) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const modPressed = e.ctrlKey || e.metaKey;
      if (modPressed && e.key === ",") {
        e.preventDefault();
        setSettingsOpen((p) => !p);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => document.removeEventListener("keydown", handleKeyDown));
  });

  // ── Custom event listeners ─────────────────────────────────────────────
  onMount(() => {
    if (isServer()) return;

    const onSettingsToggle = () => setSettingsOpen((p) => !p);
    const onThemeToggle = () => setThemePickerOpen((p) => !p);

    document.addEventListener("extensibility:settings-toggle", onSettingsToggle);
    document.addEventListener("extensibility:theme-toggle", onThemeToggle);

    onCleanup(() => {
      document.removeEventListener("extensibility:settings-toggle", onSettingsToggle);
      document.removeEventListener("extensibility:theme-toggle", onThemeToggle);
    });
  });

  // ── Settings panel close handler ───────────────────────────────────────
  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  // ── Theme change handler ───────────────────────────────────────────────
  const handleThemeChange = (_themeName: string) => {
    // Theme is already applied by ThemePicker via theme-engine
    setThemePickerOpen(false);
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Settings button (bottom-right) */}
      <button
        onClick={() => setSettingsOpen(true)}
        class="fixed bottom-6 right-20 z-[70] p-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="Open settings (Ctrl+,)"
        title="Settings (Ctrl+,)"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Settings panel (lazy loaded) */}
      <Show when={settingsOpen()}>
        <Suspense fallback={null}>
          <SettingsPanel
            isOpen={settingsOpen()}
            onClose={handleSettingsClose}
          />
        </Suspense>
      </Show>

      {/* Theme picker overlay (triggered from settings) */}
      <Show when={themePickerOpen()}>
        <div
          class="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Theme picker"
          onClick={(e) => {
            if (e.target === e.currentTarget) setThemePickerOpen(false);
          }}
        >
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-sm mx-4 p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">
                Choose Theme
              </h3>
              <button
                type="button"
                onClick={() => setThemePickerOpen(false)}
                class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close theme picker"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Suspense
              fallback={
                <div class="h-32 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-700" />
              }
            >
              <ThemePicker onThemeChange={handleThemeChange} />
            </Suspense>
          </div>
        </div>
      </Show>
    </>
  );
};

export default ExtensibilityShell;
