import { createSignal, onMount, Show } from "solid-js";

const CONSENT_KEY = "wikisites:cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = createSignal(false);

  onMount(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShow(true);
    }
  });

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  const dismiss = () => {
    localStorage.setItem(CONSENT_KEY, "dismissed");
    setShow(false);
  };

  return (
    <Show when={show()}>
      <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg z-50 p-4 md:p-6">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Wikipept uses localStorage to save your learning progress locally on this device. No
              data is sent to any server. By continuing to use this site, you acknowledge this.
            </p>
            <a href="/privacy" class="text-xs text-[#0f766e] dark:text-[#2dd4bf] hover:underline mt-1 inline-block">
              Read our Privacy Policy
            </a>
          </div>
          <div class="flex gap-2 shrink-0">
            <button
              type="button"
              class="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={dismiss}
            >
              Dismiss
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm text-white bg-[#0f766e] rounded-lg hover:bg-[#0f766e]/90 transition-colors"
              onClick={accept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
