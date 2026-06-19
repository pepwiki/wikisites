import { createSignal, type JSX, Show } from "solid-js";

interface ErrorBoundaryProps {
  children: JSX.Element;
  fallback?: JSX.Element;
  componentName?: string;
}

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const [error, setError] = createSignal<Error | null>(null);

  const handleError = (err: Error) => {
    console.error(`[ErrorBoundary${props.componentName ? `:${props.componentName}` : ""}]`, err);
    setError(err);
  };

  return (
    <Show
      when={!error()}
      fallback={
        props.fallback ?? (
          <div
            class="my-4 p-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/30"
            role="alert"
          >
            <p class="text-sm font-bold text-red-700 dark:text-red-400">
              Something went wrong{props.componentName ? ` in ${props.componentName}` : ""}.
            </p>
            <p class="text-xs text-red-600 dark:text-red-500 mt-1">
              {error()?.message ?? "Unknown error"}
            </p>
            <button
              type="button"
              class="mt-2 text-xs font-medium text-red-700 dark:text-red-400 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </div>
        )
      }
    >
      <ErrorCatcher onError={handleError}>
        {props.children}
      </ErrorCatcher>
    </Show>
  );
}

function ErrorCatcher(props: { onError: (err: Error) => void; children: JSX.Element }) {
  try {
    const children = props.children;
    return children;
  } catch (err) {
    props.onError(err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}
