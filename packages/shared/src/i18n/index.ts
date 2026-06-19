export type Locale = "en" | "zh" | "ja" | "ar";

export interface I18nConfig {
  defaultLocale: Locale;
  supportedLocales: Locale[];
}

export interface TranslationMessages {
  [key: string]: string | TranslationMessages;
}

const DEFAULT_CONFIG: I18nConfig = {
  defaultLocale: "en",
  supportedLocales: ["en", "zh", "ja", "ar"],
};

let currentLocale: Locale = DEFAULT_CONFIG.defaultLocale;
const loadedLocales = new Map<Locale, TranslationMessages>();

function getNestedValue(obj: TranslationMessages, path: string): string | undefined {
  const keys = path.split(".");
  let current: TranslationMessages | string = obj;
  for (const key of keys) {
    if (typeof current === "string") return undefined;
    current = current[key];
    if (current === undefined) return undefined;
  }
  return typeof current === "string" ? current : undefined;
}

export function setLocale(locale: Locale): void {
  if (DEFAULT_CONFIG.supportedLocales.includes(locale)) {
    currentLocale = locale;
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }
}

export function getLocale(): Locale {
  return currentLocale;
}

export function loadTranslations(locale: Locale, messages: TranslationMessages): void {
  loadedLocales.set(locale, messages);
}

export function t(key: string, params?: Record<string, string | number>): string {
  const translations = loadedLocales.get(currentLocale);
  if (!translations) return key;

  const value = getNestedValue(translations, key);
  if (!value) return key;

  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) =>
      result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue)),
    value,
  );
}

export function getSupportedLocales(): readonly Locale[] {
  return DEFAULT_CONFIG.supportedLocales;
}

export function isRTL(locale?: Locale): boolean {
  return (locale ?? currentLocale) === "ar";
}

export function formatNumber(value: number, locale?: Locale): string {
  return new Intl.NumberFormat(locale ?? currentLocale).format(value);
}

export function formatDate(date: Date, locale?: Locale): string {
  return new Intl.DateTimeFormat(locale ?? currentLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
