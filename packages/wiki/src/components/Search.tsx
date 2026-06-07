import { createSignal, For, Show } from "solid-js";

interface SearchProps {
  placeholder?: string;
}

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function Search(props: SearchProps) {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<SearchResult[]>([]);
  const [loading, setLoading] = createSignal(false);

  const search = async () => {
    if (query().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    // Placeholder: would integrate with Pagefind or FlexSearch
    setResults([
      {
        title: "Glutathione",
        description: "Master antioxidant tripeptide",
        url: "/peptides/glutathione",
        category: "Tripeptides",
      },
      {
        title: "Oxytocin",
        description: "Neuropeptide hormone",
        url: "/peptides/oxytocin",
        category: "Nonapeptides",
      },
    ]);
    setLoading(false);
  };

  return (
    <div class="relative w-full max-w-2xl">
      <label for="peptide-search" class="sr-only">
        Search oligopeptides
      </label>
      <input
        id="peptide-search"
        type="search"
        role="combobox"
        aria-expanded={results().length > 0}
        aria-controls="search-results"
        aria-autocomplete="list"
        aria-activedescendant=""
        class="w-full px-5 py-3 pr-12 border-2 border-slate-200 rounded-full text-sm focus:border-[#0D9488] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 transition-colors"
        placeholder={props.placeholder ?? "Search oligopeptides..."}
        value={query()}
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          search();
        }}
      />
      <Show when={loading()}>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
          ...
        </div>
      </Show>
      <Show when={results().length > 0}>
        <ul
          id="search-results"
          role="listbox"
          class="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50"
        >
          <For each={results()}>
            {(result) => (
              <li role="option">
                <a
                  href={result.url}
                  class="block px-5 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors border-b border-slate-100 last:border-0"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                      {result.category}
                    </span>
                    <span class="font-medium text-slate-900">{result.title}</span>
                  </div>
                  <p class="text-sm text-slate-500 mt-0.5">{result.description}</p>
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
