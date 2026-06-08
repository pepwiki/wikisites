import { createSignal, Show } from "solid-js";

// Monoisotopic residue weights (Da)
const RESIDUE_WEIGHTS: Record<string, number> = {
  G: 57.02146, A: 71.03711, V: 99.06841, L: 113.08406, I: 113.08406,
  P: 97.05276, F: 147.06841, W: 186.07931, M: 131.04049, S: 87.03203,
  T: 101.04768, C: 103.00919, Y: 163.06333, H: 137.05891, D: 115.02694,
  E: 129.04259, N: 114.04293, Q: 128.05858, K: 128.09496, R: 156.10111,
};

const THREE_LETTER_MAP: Record<string, string> = {
  GLY: "G", ALA: "A", VAL: "V", LEU: "L", ILE: "I",
  PRO: "P", PHE: "F", TRP: "W", MET: "M", SER: "S",
  THR: "T", CYS: "C", TYR: "Y", HIS: "H", ASP: "D",
  GLU: "E", ASN: "N", GLN: "Q", LYS: "K", ARG: "R",
};

const H2O = 18.01056;

function calculateMW(sequence: string): { mw: number; formula: string; residueCount: number } {
  let mw = H2O;
  const counts: Record<string, number> = {};
  for (const aa of sequence.toUpperCase()) {
    const weight = RESIDUE_WEIGHTS[aa];
    if (weight) {
      mw += weight - H2O;
      counts[aa] = (counts[aa] || 0) + 1;
    }
  }
  const formula = Object.entries(counts)
    .map(([aa, count]) => `${aa}${count > 1 ? count : ""}`)
    .join("");
  return { mw: Math.round(mw * 1000) / 1000, formula, residueCount: sequence.length };
}

export default function MWCalculator() {
  const [input, setInput] = createSignal("");
  const [result, setResult] = createSignal<{ mw: number; formula: string; residueCount: number } | null>(null);

  const calculate = () => {
    const seq = input().toUpperCase().replace(/[^GAVLIFWMSTCYNQHKRDE]/g, "");
    if (seq.length === 0) return;
    setResult(calculateMW(seq));
  };

  return (
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 class="text-lg font-bold text-[#0A1628] mb-4">Molecular Weight Calculator</h3>
      <p class="text-sm text-slate-500 mb-4">
        Enter a peptide sequence using one-letter amino acid codes (G, A, V, L, I, P, F, W, M, S, T, C, Y, H, D, E, N, Q, K, R)
      </p>
      <div class="flex gap-2">
        <input
          type="text"
          class="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:border-[#C9A84C] focus:outline-none transition-colors"
          placeholder="e.g., GSH, CYIQNCPLG"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
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
            <div class="text-xl font-bold text-[#0A1628] font-mono text-sm">{result()!.formula}</div>
            <div class="text-xs text-slate-500">Residue composition</div>
          </div>
        </div>
      </Show>
    </div>
  );
}
