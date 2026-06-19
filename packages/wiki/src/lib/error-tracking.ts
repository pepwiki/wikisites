interface ErrorEntry {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: number;
  context?: Record<string, unknown>;
}

interface ErrorStats {
  recentErrors: ErrorEntry[];
  totalCount: number;
}

const STORAGE_KEY = "wikisites:errors";
const MAX_ERRORS = 100;

function getErrors(): ErrorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ErrorEntry[];
  } catch (_e) {
    return [];
  }
}

function saveErrors(errors: ErrorEntry[]): void {
  if (typeof window === "undefined") return;
  const trimmed = errors.length > MAX_ERRORS ? errors.slice(errors.length - MAX_ERRORS) : errors;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (_e) {
    // Storage full — drop oldest
    const reduced = trimmed.slice(Math.floor(trimmed.length / 2));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reduced));
    } catch (_e2) {
      // Give up silently
    }
  }
}

export function captureError(
  error: Error,
  context?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  const entry: ErrorEntry = {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    context,
  };

  const errors = getErrors();
  errors.push(entry);
  saveErrors(errors);

  console.error("[ErrorTracking]", error.message, context ?? "");
}

export function getRecentErrors(): ErrorStats {
  const errors = getErrors();
  return {
    recentErrors: errors,
    totalCount: errors.length,
  };
}

export function initErrorTracking(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event: ErrorEvent) => {
    captureError(new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    if (reason instanceof Error) {
      captureError(reason, { type: "unhandledrejection" });
    } else {
      captureError(new Error(String(reason)), { type: "unhandledrejection" });
    }
  });
}
