import { createSignal, onCleanup, onMount, Show } from "solid-js";

const PUSH_KEY = "wikisites:push-subscribed";

export default function PushNotifications() {
  const [supported, setSupported] = createSignal(false);
  const [subscribed, setSubscribed] = createSignal(false);
  const [showPrompt, setShowPrompt] = createSignal(false);

  let promptTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    if (typeof window === "undefined") return;
    if ("Notification" in window && "serviceWorker" in navigator) {
      setSupported(true);
      const existing = localStorage.getItem(PUSH_KEY);
      if (existing) {
        setSubscribed(true);
      } else {
        promptTimer = setTimeout(() => setShowPrompt(true), 5000);
      }
    }
  });

  onCleanup(() => {
    if (promptTimer !== undefined) clearTimeout(promptTimer);
  });

  const subscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem(PUSH_KEY, "granted");
        setSubscribed(true);
        setShowPrompt(false);
      } else {
        setShowPrompt(false);
      }
    } catch {
      setShowPrompt(false);
    }
  };

  const dismiss = () => {
    localStorage.setItem(PUSH_KEY, "dismissed");
    setShowPrompt(false);
  };

  return (
    <Show when={supported() && showPrompt() && !subscribed()}>
      <div
        class="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 p-4"
        role="alertdialog"
        aria-label="Enable push notifications"
      >
        <p class="text-sm text-slate-700 dark:text-slate-300 mb-3">
          Get reminded when your flashcards are due. Enable notifications?
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
            onClick={dismiss}
            aria-label="Dismiss notification prompt"
          >
            Not now
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-xs text-white bg-[#0f766e] rounded-lg hover:bg-[#0f766e]/90"
            onClick={subscribe}
            aria-label="Enable push notifications"
          >
            Enable
          </button>
        </div>
      </div>
    </Show>
  );
}
