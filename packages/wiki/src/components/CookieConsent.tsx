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
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 p-4 md:p-6">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <p class="text-sm text-slate-600">
              Wikipept uses localStorage to save your learning progress locally on this device.
              No data is sent to any server. By continuing to use this site, you acknowledge this.
            </p>
            <a href="/privacy" class="text-xs text-[#0D9488] hover:underline mt-1 inline-block">
              Read our Privacy Policy
            </a>
          </div>
          <div class="flex gap-2 shrink-0">
            <button
              type="button"
              class="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              onClick={dismiss}
            >
              Dismiss
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm text-white bg-[#0D9488] rounded-lg hover:bg-[#0D9488]/90 transition-colors"
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
