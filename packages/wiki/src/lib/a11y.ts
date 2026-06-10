/**
 * Accessibility utilities for wikisites.
 * Provides keyboard navigation, focus management, and ARIA helpers.
 *
 * Usage:
 *   import { initA11y } from "../lib/a11y";
 *   initA11y();
 */

/**
 * Initialize accessibility enhancements.
 */
export function initA11y(): void {
  if (typeof window === "undefined") return;

  // Add skip-to-content link handler
  initSkipLink();

  // Add keyboard navigation for custom components
  initKeyboardNav();

  // Add focus trap for modals
  initFocusTrap();

  // Add reduced motion detection
  initReducedMotion();

  // Add high contrast detection
  initHighContrast();
}

/**
 * Initialize skip-to-content link.
 */
function initSkipLink(): void {
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (!skipLink) return;

  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const main = document.getElementById("main-content");
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/**
 * Initialize keyboard navigation for custom components.
 */
function initKeyboardNav(): void {
  // Add keyboard support for clickable divs
  document.querySelectorAll('[role="button"]').forEach((el) => {
    if (el instanceof HTMLElement && !el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }

    el.addEventListener("keydown", (e) => {
      if (e instanceof KeyboardEvent && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        (el as HTMLElement).click();
      }
    });
  });

  // Add arrow key navigation for lists
  document.querySelectorAll('[role="listbox"]').forEach((listbox) => {
    const items = listbox.querySelectorAll('[role="option"]');
    let currentIndex = 0;

    listbox.addEventListener("keydown", (e) => {
      if (!(e instanceof KeyboardEvent)) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, items.length - 1);
          (items[currentIndex] as HTMLElement).focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          (items[currentIndex] as HTMLElement).focus();
          break;
        case "Home":
          e.preventDefault();
          currentIndex = 0;
          (items[currentIndex] as HTMLElement).focus();
          break;
        case "End":
          e.preventDefault();
          currentIndex = items.length - 1;
          (items[currentIndex] as HTMLElement).focus();
          break;
      }
    });
  });
}

/**
 * Initialize focus trap for modals.
 */
function initFocusTrap(): void {
  // Watch for modal open/close
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const target = mutation.target as HTMLElement;
        if (target.getAttribute("role") === "dialog") {
          if (!target.classList.contains("hidden")) {
            trapFocus(target);
          }
        }
      }
    }
  });

  observer.observe(document.body, { attributes: true, subtree: true });
}

/**
 * Trap focus within an element.
 */
function trapFocus(element: HTMLElement): void {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusable.length === 0) return;

  const first = focusable[0] as HTMLElement;
  const last = focusable[focusable.length - 1] as HTMLElement;

  element.addEventListener("keydown", (e) => {
    if (!(e instanceof KeyboardEvent) || e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  first.focus();
}

/**
 * Initialize reduced motion detection.
 */
function initReducedMotion(): void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function handleChange(mq: MediaQueryList | MediaQueryListEvent): void {
    document.documentElement.classList.toggle("reduce-motion", mq.matches);
  }

  handleChange(mediaQuery);
  mediaQuery.addEventListener("change", handleChange);
}

/**
 * Initialize high contrast detection.
 */
function initHighContrast(): void {
  const mediaQuery = window.matchMedia("(prefers-contrast: high)");

  function handleChange(mq: MediaQueryList | MediaQueryListEvent): void {
    document.documentElement.classList.toggle("high-contrast", mq.matches);
  }

  handleChange(mediaQuery);
  mediaQuery.addEventListener("change", handleChange);
}

/**
 * Announce a message to screen readers.
 */
export function announce(message: string, priority: "polite" | "assertive" = "polite"): void {
  if (typeof document === "undefined") return;

  let announcer = document.getElementById("a11y-announcer");
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.id = "a11y-announcer";
    announcer.setAttribute("aria-live", priority);
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    document.body.appendChild(announcer);
  }

  announcer.setAttribute("aria-live", priority);
  announcer.textContent = "";
  setTimeout(() => {
    announcer!.textContent = message;
  }, 100);
}

/**
 * Get all focusable elements within a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ) as HTMLElement[];
}
