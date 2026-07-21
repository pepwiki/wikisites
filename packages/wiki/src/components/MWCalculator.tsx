import { createSignal, Show } from "solid-js";
import { calculateMolecularWeight } from "@wikisites/shared";

const VALID_AA = new Set("GAVLIFWMSTCYPYNHQKRDE");

const AA_WEIGHTS: Record<string, { name: string; mw: number; formula: string }> = {
  G: { name: "Glycine", mw: 75.03, formula: "C₂H₅NO₂" },
  A: { name: "Alanine", mw: 89.09, formula: "C₃H₇NO₂" },
  V: { name: "Valine", mw: 117.15, formula: "C₅H₁₁NO₂" },
  L: { name: "Leucine", mw: 131.17, formula: "C₆H₁₃NO₂" },
  I: { name: "Isoleucine", mw: 131.17, formula: "C₆H₁₃NO₂" },
  P: { name: "Proline", mw: 115.13, formula: "C₅H₉NO₂" },
  F: { name: "Phenylalanine", mw: 165.19, formula: "C₉H₁₁NO₂" },
  W: { name: "Tryptophan", mw: 204.23, formula: "C₁₁H₁₂N₂O₂" },
  M: { name: "Methionine", mw: 149.21, formula: "C₅H₁₁NO₂S" },
  S: { name: "Serine", mw: 105.09, formula: "C₃H₇NO₃" },
  T: { name: "Threonine", mw: 119.12, formula: "C₄H₉NO₃" },
  C: { name: "Cysteine", mw: 121.16, formula: "C₃H₇NO₂S" },
  Y: { name: "Tyrosine", mw: 181.19, formula: "C₉H₁₁NO₃" },
  H: { name: "Histidine", mw: 155.16, formula: "C₆H₉N₃O₂" },
  D: { name: "Aspartic Acid", mw: 133.10, formula: "C₄H₇NO₄" },
  E: { name: "Glutamic Acid", mw: 147.13, formula: "C₅H₉NO₄" },
  N: { name: "Asparagine", mw: 132.12, formula: "C₄H₈N₂O₃" },
  Q: { name: "Glutamine", mw: 146.15, formula: "C₅H₁₀N₂O₃" },
  K: { name: "Lysine", mw: 146.19, formula: "C₆H₁₄N₂O₂" },
  R: { name: "Arginine", mw: 174.20, formula: "C₆H₁₄N₄O₂" },
};

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
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
        Molecular Weight Calculator
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Enter a peptide sequence using one-letter amino acid codes (G, A, V, L, I, P, F, W, M, S, T,
        C, Y, H, D, E, N, Q, K, R)
      </p>
      <div class="flex gap-2">
        <input
          type="text"
          class="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#0D9488] focus:outline-none transition-colors"
          placeholder="e.g., GSH, CYIQNCPLG"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          aria-label="Peptide sequence input"
        />
        <button
          type="button"
          class="px-4 py-2 bg-[#0D9488] text-white rounded-lg text-sm font-medium hover:bg-[#0D9488]/90 transition-colors"
          onClick={calculate}
        >
          Calculate
        </button>
      </div>
      <Show when={result()}>
        <div class="mt-4 grid grid-cols-3 gap-4 text-center">
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-xl font-bold text-slate-900 dark:text-slate-100">{result()!.mw.toFixed(2)}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Da (g/mol)</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-xl font-bold text-slate-900 dark:text-slate-100">{result()!.residueCount}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Residues</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono text-sm">
              {result()!.composition}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Composition</div>
          </div>
        </div>
      </Show>
    </div>
  );
}
