import { createSignal, For, Show } from "solid-js";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function Quiz(props: QuizProps) {
  const [selected, setSelected] = createSignal<number | null>(null);
  const [revealed, setRevealed] = createSignal(false);

  const submit = () => {
    if (selected() !== null) {
      setRevealed(true);
    }
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = () => selected() === props.correctIndex;

  return (
    <div
      class="bg-white border border-slate-200 rounded-2xl p-6 my-6 shadow-sm"
      role="group"
      aria-label="Quiz question"
    >
      <h4 class="font-bold text-slate-900 mb-4">{props.question}</h4>
      <fieldset>
        <legend class="sr-only">Select your answer</legend>
        <div class="space-y-2" role="radiogroup">
          <For each={props.options}>
            {(option, index) => (
              <button
                type="button"
                role="radio"
                aria-checked={selected() === index()}
                aria-label={`${String.fromCharCode(65 + index())}. ${option}`}
                class={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  selected() === index()
                    ? revealed()
                      ? index() === props.correctIndex
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-[#0D9488] bg-[#0D9488]/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => !revealed() && setSelected(index())}
                disabled={revealed()}
              >
                <span class="font-medium mr-2" aria-hidden="true">
                  {String.fromCharCode(65 + index())}.
                </span>
                {option}
              </button>
            )}
          </For>
        </div>
      </fieldset>
      <Show when={!revealed()}>
        <button
          type="button"
          class="mt-4 px-6 py-2 bg-[#0D9488] text-white rounded-full font-medium disabled:opacity-50 hover:bg-[#0D9488]/90 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 transition-colors"
          onClick={submit}
          disabled={selected() === null}
          aria-label="Check answer"
        >
          Check Answer
        </button>
      </Show>
      <Show when={revealed()}>
        <div
          class={`mt-4 p-4 rounded-xl ${isCorrect() ? "bg-green-50" : "bg-red-50"}`}
          role="alert"
          aria-live="polite"
        >
          <p class={`font-bold ${isCorrect() ? "text-green-700" : "text-red-700"}`}>
            {isCorrect() ? "Correct!" : "Incorrect"}
          </p>
          <p class="text-slate-600 text-sm mt-1">{props.explanation}</p>
          <button
            type="button"
            class="mt-2 text-sm text-[#0D9488] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 rounded"
            onClick={reset}
            aria-label="Reset question and try again"
          >
            Try Again
          </button>
        </div>
      </Show>
    </div>
  );
}
