import { createSignal, Show, For } from "solid-js";
import { setLocale, getLocale, getSupportedLocales, type Locale } from "@wikisites/shared/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ar: "العربية",
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentLocale, setCurrentLocale] = createSignal<Locale>(getLocale());
  const locales = getSupportedLocales();

  function handleSelect(locale: Locale) {
    setLocale(locale);
    setCurrentLocale(locale);
    setIsOpen(false);
  }

  function handleKeyDown(e: KeyboardEvent, locale: Locale) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(locale);
    }
  }

  return (
    <div class="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200 hover:border-teal-400 transition-colors dark:bg-slate-800/80 dark:border-slate-700 dark:hover:border-teal-500"
        aria-label="Select language"
        aria-expanded={isOpen()}
        aria-haspopup="listbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span class="text-sm font-medium">{LOCALE_LABELS[currentLocale()]}</span>
      </button>

      <Show when={isOpen()}>
        <ul
          class="absolute right-0 mt-1 w-36 rounded-lg bg-white border border-slate-200 shadow-lg z-50 dark:bg-slate-800 dark:border-slate-700"
          role="listbox"
          aria-label="Available languages"
        >
          <For each={locales}>
            {(locale) => (
              <li
                role="option"
                aria-selected={locale === currentLocale()}
                tabIndex={0}
                onClick={() => handleSelect(locale)}
                onKeyDown={(e) => handleKeyDown(e, locale)}
                class={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  locale === currentLocale()
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                    : "hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {LOCALE_LABELS[locale]}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
