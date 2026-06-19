import { createSignal, onMount, Show } from "solid-js";

interface MoleculeViewerProps {
  pdbId?: string;
  smiles?: string;
  name: string;
}

export default function MoleculeViewer(props: MoleculeViewerProps) {
  const [loaded, setLoaded] = createSignal(false);
  const [error, setError] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    if (!containerRef) return;

    const script = document.createElement("script");
    script.src = "https://3Dmol.org/build/3Dmol-min.js";
    script.async = true;

    script.onload = () => {
      try {
        const $3Dmol = (window as Record<string, unknown>)["$3Dmol"] as {
          createViewer: (el: HTMLElement, opts?: Record<string, unknown>) => {
            addModel: (data: string, format: string) => void;
            zoomTo: () => void;
            render: () => void;
          };
        } | undefined;

        if (!$3Dmol || !containerRef) {
          setError(true);
          return;
        }

        const viewer = $3Dmol.createViewer(containerRef, {
          backgroundColor: "rgba(0,0,0,0)",
        });

        if (props.pdbId) {
          fetch(`https://files.rcsb.org/download/${props.pdbId}.pdb`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch PDB");
              return res.text();
            })
            .then((data) => {
              viewer.addModel(data, "pdb");
              viewer.zoomTo();
              viewer.render();
              setLoaded(true);
            })
            .catch(() => setError(true));
        }
      } catch {
        setError(true);
      }
    };

    script.onerror = () => setError(true);
    document.head.appendChild(script);
  });

  return (
    <div
      class="my-6 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
      role="img"
      aria-label={`3D molecular structure: ${props.name}`}
    >
      <div class="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{props.name}</p>
        {props.pdbId && (
          <p class="text-xs text-slate-500 dark:text-slate-400">PDB: {props.pdbId}</p>
        )}
      </div>

      <Show
        when={loaded() && !error()}
        fallback={
          <div class="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
            <Show
              when={!error()}
              fallback={
                <div class="text-center p-4">
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    3D viewer unavailable
                  </p>
                  {props.pdbId && (
                    <a
                      href={`https://www.rcsb.org/structure/${props.pdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs text-[#0f766e] dark:text-[#2dd4bf] hover:underline mt-1 inline-block"
                    >
                      View on RCSB PDB →
                    </a>
                  )}
                </div>
              }
            >
              <div class="text-center p-4">
                <div class="inline-block w-6 h-6 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-2" />
                <p class="text-xs text-slate-500 dark:text-slate-400">Loading 3D viewer...</p>
              </div>
            </Show>
          </div>
        }
      >
        <div ref={containerRef} class="w-full h-64 relative" />
      </Show>
    </div>
  );
}
