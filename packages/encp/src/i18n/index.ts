import en from "./locales/en.json";
import zh from "./locales/zh.json";

export type Locale = "en" | "zh";
export type TranslationKey = keyof typeof en;

const translations: Record<Locale, Record<TranslationKey, string>> = { en, zh };

export function t(locale: Locale, key: TranslationKey, params?: Record<string, string>): string {
  const template = translations[locale]?.[key] ?? translations.en[key] ?? key;
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [k, v]) => result.replace(new RegExp(`\\{${k}\\}`, "g"), v),
    template,
  );
}

export function getLocaleFromURL(url: URL): Locale {
  const path = url.pathname;
  if (path.startsWith("/zh/") || path.startsWith("/zh")) return "zh";
  return "en";
}
