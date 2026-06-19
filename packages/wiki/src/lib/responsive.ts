import { createSignal, onCleanup, onMount } from "solid-js";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointName = keyof typeof breakpoints;

const breakpointOrder: readonly BreakpointName[] = ["sm", "md", "lg", "xl", "2xl"];

function resolveBreakpoint(width: number): BreakpointName {
  let current: BreakpointName = "sm";
  for (const name of breakpointOrder) {
    if (width >= breakpoints[name]) {
      current = name;
    }
  }
  return current;
}

function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

export function useBreakpoint(): () => BreakpointName {
  const [current, setCurrent] = createSignal<BreakpointName>(isServer() ? "lg" : resolveBreakpoint(window.innerWidth));

  onMount(() => {
    if (isServer()) return;

    function update(): void {
      setCurrent(resolveBreakpoint(window.innerWidth));
    }

    const mql = window.matchMedia(`(min-width: ${breakpoints.xl}px)`);
    mql.addEventListener("change", update);
    window.addEventListener("resize", update);

    onCleanup(() => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    });
  });

  return current;
}

export function useMediaQuery(query: string): () => boolean {
  const [matches, setMatches] = createSignal<boolean>(isServer() ? false : window.matchMedia(query).matches);

  onMount(() => {
    if (isServer()) return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function handleChange(e: MediaQueryListEvent): void {
      setMatches(e.matches);
    }

    mql.addEventListener("change", handleChange);

    onCleanup(() => {
      mql.removeEventListener("change", handleChange);
    });
  });

  return matches;
}
