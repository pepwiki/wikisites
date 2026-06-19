/**
 * ShortcutRemapper — Table-based keyboard shortcut remapping UI.
 *
 * Displays all registered shortcuts in a table with action name,
 * current binding, and an edit button. Clicking Edit enters
 * "press new key combination" mode. Detects conflicts and warns
 * on duplicates. Includes a reset-to-defaults button.
 *
 * @module components/ShortcutRemapper
 */

import { createSignal, For, Show } from "solid-js";
import {
  displayBinding,
  detectConflicts,
  type Keybinding,
} from "../lib/keyboard-shortcuts";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShortcutRemapperProps {
  /** All registered shell keybindings. */
  shellBindings: Keybinding[];
  /** Callback when a shell binding is updated. */
  onShellBindingUpdate: (id: string, key: string, modifiers: string[]) => void;
  /** Callback to reset all bindings to defaults. */
  onReset: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse a keyboard event into a key combo string and modifier array.
 * Returns null if only a modifier key is pressed alone.
 */
function parseKeyEvent(e: KeyboardEvent): { key: string; modifiers: string[] } | null {
  const modifiers: string[] = [];
  if (e.ctrlKey) modifiers.push("Ctrl");
  if (e.altKey) modifiers.push("Alt");
  if (e.shiftKey) modifiers.push("Shift");
  if (e.metaKey) modifiers.push("Meta");

  // Ignore lone modifier presses
  const loneModifier = ["Control", "Alt", "Shift", "Meta"].includes(e.key);
  if (loneModifier && modifiers.length <= 1) return null;

  const key = e.key === " " ? "Space" : e.key;
  return { key, modifiers };
}

function formatKeyCombo(key: string, modifiers: string[]): string {
  return [...modifiers, key].join("+");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShortcutRemapper(props: ShortcutRemapperProps) {
  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [conflictWarning, setConflictWarning] = createSignal<string | null>(null);

  const startEditing = (id: string) => {
    setEditingId(id);
    setConflictWarning(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setConflictWarning(null);
  };

  const handleCaptureKey = (e: KeyboardEvent) => {
    if (editingId() === null || editingType() === null) return;

    // Allow Escape to cancel
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
      return;
    }

    const parsed = parseKeyEvent(e);
    if (!parsed) return;

    e.preventDefault();

    const id = editingId();
    if (!id) return;

    // Create a temporary binding to detect conflicts
    const existing = props.shellBindings.find((b) => b.id === id);
    if (!existing) return;

    const tempBinding: Keybinding = {
      ...existing,
      key: parsed.key,
      modifiers: parsed.modifiers as Keybinding["modifiers"],
    };

    const conflicts = detectConflicts(tempBinding, props.shellBindings);
    if (conflicts.length > 0) {
      const names = conflicts.map((c) => c.description).join(", ");
      setConflictWarning(`Conflict with: ${names}`);
      return;
    }

    props.onShellBindingUpdate(id, parsed.key, parsed.modifiers);

    cancelEditing();
  };

  return (
    <div
      class="space-y-4"
      onKeyDown={editingId() !== null ? handleCaptureKey : undefined}
    >
      {/* Shell shortcuts section */}
      <div>
        <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Application Shortcuts
        </h4>
        <div class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-800">
                <th class="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Action
                </th>
                <th class="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Current Binding
                </th>
                <th class="px-4 py-2 text-right font-medium text-slate-600 dark:text-slate-400">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={props.shellBindings}>
                {(binding) => (
                  <tr class="border-t border-slate-100 dark:border-slate-700/50">
                    <td class="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                      {binding.description}
                    </td>
                    <td class="px-4 py-2.5">
                        <Show
                          when={editingId() === binding.id}
                          fallback={
                          <kbd class="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                            {displayBinding(binding)}
                          </kbd>
                        }
                      >
                        <span class="text-[#0D9488] font-mono text-xs animate-pulse">
                          Press keys...
                        </span>
                      </Show>
                    </td>
                    <td class="px-4 py-2.5 text-right">
                      <Show when={editingId() !== binding.id}>
                        <button
                          type="button"
                          class="px-2 py-1 text-xs font-medium text-[#0D9488] hover:bg-[#0D9488]/10 rounded transition-colors"
                          onClick={() => startEditing(binding.id)}
                        >
                          Edit
                        </button>
                      </Show>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conflict warning */}
      <Show when={conflictWarning() !== null}>
        <div
          role="alert"
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F97316]/10 text-[#F97316] text-sm"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {conflictWarning()}
        </div>
      </Show>

      {/* Reset button */}
      <div class="flex justify-end">
        <button
          type="button"
          class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          onClick={props.onReset}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
