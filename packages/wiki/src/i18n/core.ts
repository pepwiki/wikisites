import en from "./en";

type Locale = "en";
type TranslationKeys = keyof typeof en;

const translations: Record<Locale, typeof en> = { en };

let currentLocale: Locale = "en";

function interpolate(template: string, args: (string | number)[]): string {
  return template.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : `{${i}}`;
  });
}

/** Translate a key with optional interpolation args. Works outside SolidJS (Astro components, scripts). */
export function t(key: TranslationKeys, ...args: (string | number)[]): string {
  const dict = translations[currentLocale] ?? translations.en;
  const template = dict[key] ?? key;
  return args.length > 0 ? interpolate(template, args) : template;
}

/** Get the current locale. */
export function getLocale(): Locale {
  return currentLocale;
}

/** Set the current locale. */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
}
