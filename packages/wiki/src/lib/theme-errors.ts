/**
 * Theme error tracking for wikisites monorepo.
 * Captures and reports theme-related errors for debugging.
 */

type ThemeError = {
  message: string;
  source: string;
  timestamp: number;
  theme: string;
  url: string;
  userAgent: string;
};

const ERROR_KEY = "wikisites:theme-errors";
const MAX_ERRORS = 50;

/**
 * Track a theme-related error.
 */
export function trackThemeError(error: Omit<ThemeError, "timestamp" | "url" | "userAgent">): void {
  if (typeof window === "undefined") return;

  try {
    const errors = getErrors();
    errors.push({
      ...error,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    if (errors.length > MAX_ERRORS) {
      errors.splice(0, errors.length - MAX_ERRORS);
    }

    localStorage.setItem(ERROR_KEY, JSON.stringify(errors));
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Get all tracked theme errors.
 */
export function getThemeErrors(): ThemeError[] {
  return getErrors();
}

/**
 * Clear all tracked theme errors.
 */
export function clearThemeErrors(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ERROR_KEY);
}

/**
 * Get error count by source.
 */
export function getErrorSummary(): Record<string, number> {
  const errors = getErrors();
  const summary: Record<string, number> = {};

  for (const error of errors) {
    summary[error.source] = (summary[error.source] || 0) + 1;
  }

  return summary;
}

function getErrors(): ThemeError[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ERROR_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
