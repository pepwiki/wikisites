import { createSignal, createMemo, Show } from "solid-js";

interface Preset {
  name: string;
  mass: number;
  concentrations: { label: string; concentration: number }[];
}

const PRESETS: Preset[] = [
  {
    name: "1 mg vial",
    mass: 1,
    concentrations: [
      { label: "1 mg/mL", concentration: 1 },
      { label: "2 mg/mL", concentration: 2 },
      { label: "5 mg/mL", concentration: 5 },
    ],
  },
  {
    name: "2 mg vial",
    mass: 2,
    concentrations: [
      { label: "1 mg/mL", concentration: 1 },
      { label: "2 mg/mL", concentration: 2 },
      { label: "4 mg/mL", concentration: 4 },
    ],
  },
  {
    name: "5 mg vial",
    mass: 5,
    concentrations: [
      { label: "2 mg/mL", concentration: 2 },
      { label: "5 mg/mL", concentration: 5 },
      { label: "10 mg/mL", concentration: 10 },
    ],
  },
];

function mLToUnits(mL: number): string {
  const units = mL * 100;
  if (units % 1 === 0) return `${units} units`;
  return `~${Math.round(units)} units`;
}

function formatVolume(mL: number): string {
  if (mL < 0.01) return mL.toFixed(4);
  if (mL < 0.1) return mL.toFixed(3);
  if (mL < 1) return mL.toFixed(2);
  return mL.toFixed(2);
}

export default function ReconstitutionCalculator() {
  const [mass, setMass] = createSignal<string>("1");
  const [concentration, setConcentration] = createSignal<string>("2");

  const volume = createMemo(() => {
    const m = parseFloat(mass());
    const c = parseFloat(concentration());
    if (isNaN(m) || isNaN(c) || m <= 0 || c <= 0) return null;
    return m / c;
  });

  const volumeValue = () => volume();

  const applyPreset = (preset: Preset, conc: number) => {
    setMass(String(preset.mass));
    setConcentration(String(conc));
  };

  return (
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
      <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
        Reconstitution Calculator
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Calculate the volume of BAC water needed to reconstitute your peptide.
      </p>

      <div class="flex flex-wrap gap-3 mb-6">
        {PRESETS.map((preset) => (
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
              {preset.name}
            </span>
            <div class="flex gap-1">
              {preset.concentrations.map((c) => (
                <button
                  type="button"
                  class="px-2 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0D9488]/10 hover:border-[#0D9488]/30 transition-colors"
                  onClick={() => applyPreset(preset, c.concentration)}
                  aria-label={`Apply preset: ${preset.mass} mg at ${c.label}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            for="mass-input"
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Peptide Mass (mg)
          </label>
          <input
            id="mass-input"
            type="number"
            step="0.1"
            min="0"
            class="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#0D9488] focus:outline-none transition-colors"
            placeholder="e.g., 1"
            value={mass()}
            onInput={(e) => setMass(e.currentTarget.value)}
            aria-label="Peptide mass in milligrams"
          />
        </div>
        <div>
          <label
            for="conc-input"
            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Desired Concentration (mg/mL)
          </label>
          <input
            id="conc-input"
            type="number"
            step="0.1"
            min="0"
            class="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#0D9488] focus:outline-none transition-colors"
            placeholder="e.g., 2"
            value={concentration()}
            onInput={(e) => setConcentration(e.currentTarget.value)}
            aria-label="Desired concentration in mg per mL"
          />
        </div>
      </div>

      <Show when={volumeValue() !== null}>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div class="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
              {formatVolume(volumeValue()!)} mL
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Volume of BAC water
            </div>
          </div>
          <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div class="text-2xl font-bold text-[#0D9488] font-mono">
              {mLToUnits(volumeValue()!)}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              On an insulin syringe
            </div>
          </div>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 text-center">
          Formula: Volume (mL) = Mass (mg) ÷ Concentration (mg/mL)
        </p>
      </Show>

      <Show when={volumeValue() === null && (mass() !== "" || concentration() !== "")}>
        <p class="text-sm text-amber-600 dark:text-amber-400 text-center">
          Enter valid positive values for mass and concentration.
        </p>
      </Show>
    </div>
  );
}
