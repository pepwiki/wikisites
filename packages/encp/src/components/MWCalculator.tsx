import { createSignal, Show } from "solid-js";
import { calculateMolecularWeight } from "@wikisites/shared";

/** One-letter amino acid codes accepted by the calculator. */
const VALID_AA = new Set("GAVLIFWMSTCYPYNHQKRDE");

export default function MWCalculator() {
  const [input, setInput] = createSignal("");
  const [result, setResult] = createSignal<{
    mw: number;
    residueCount: number;
    composition: string;
  } | null>(null);

  const calculate = () => {
    const seq = input()
      .toUpperCase()
      .split("")
      .filter((c) => VALID_AA.has(c))
      .join("");
    if (seq.length === 0) return;

    const mw = calculateMolecularWeight(seq);
    const counts: Record<string, number> = {};
    for (const aa of seq) {
      counts[aa] = (counts[aa] ?? 0) + 1;
    }
    const composition = Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([aa, count]) => `${aa}${count > 1 ? count : ""}`)
      .join(" ");

    setResult({ mw, residueCount: seq.length, composition });
  };

  return (
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 class="text-lg font-bold text-[#0A1628] mb-4">Molecular Weight Calculator</h3>
      <p class="text-sm text-slate-500 mb-4">
        Enter a peptide sequence using one-letter amino acid codes (G, A, V, L, I, P, F, W, M, S, T,
        C, Y, H, D, E, N, Q, K, R)
      </p>
      <div class="flex gap-2">
        <input
          type="text"
          class="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:border-[#C9A84C] focus:outline-none transition-colors"
          placeholder="e.g., GSH, CYIQNCPLG"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          aria-label="Peptide sequence input"
        />
        <button
          type="button"
          class="px-4 py-2 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[#0A1628]/90 transition-colors"
          onClick={calculate}
        >
          Calculate
        </button>
      </div>
      <Show when={result()}>
        <div class="mt-4 grid grid-cols-3 gap-4 text-center">
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="text-xl font-bold text-[#0A1628]">{result()!.mw}</div>
            <div class="text-xs text-slate-500">Da</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="text-xl font-bold text-[#0A1628]">{result()!.residueCount}</div>
            <div class="text-xs text-slate-500">Residues</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="text-xl font-bold text-[#0A1628] font-mono text-sm">
              {result()!.composition}
            </div>
            <div class="text-xs text-slate-500">Composition</div>
          </div>
        </div>
      </Show>
    </div>
  );
}
