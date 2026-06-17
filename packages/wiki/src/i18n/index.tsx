import { createContext, type JSX, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import en from "./en";

type Locale = "en";
type TranslationKeys = keyof typeof en;

const translations: Record<Locale, typeof en> = { en };

interface I18nContextValue {
  locale: () => Locale;
  t: (key: TranslationKeys, ...args: (string | number)[]) => string;
  setLocale: (locale: Locale) => void;
}

function interpolate(template: string, args: (string | number)[]): string {
  return template.replace(/\{(\d+)\}/g, (_, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : `{${i}}`;
  });
}

/** SSR-safe fallback: translates directly from the en dictionary. */
function fallbackT(key: TranslationKeys, ...args: (string | number)[]): string {
  const template = en[key] ?? key;
  return args.length > 0 ? interpolate(template, args) : template;
}

const I18nContext = createContext<I18nContextValue>();

export function I18nProvider(props: {
  children: JSX.Element;
  locale?: Locale;
}) {
  const [state, setState] = createStore({
    locale: (props.locale ?? "en") as Locale, // eslint-disable-line solid/reactivity -- initialization only
  });

  const t = (key: TranslationKeys, ...args: (string | number)[]): string => {
    const dict = translations[state.locale] ?? translations.en;
    const template = dict[key] ?? key;
    return args.length > 0 ? interpolate(template, args) : template;
  };

  const setLocale = (locale: Locale) => {
    setState("locale", locale);
  };

  return (
    <I18nContext.Provider value={{ locale: () => state.locale, t, setLocale }}>
      {props.children}
    </I18nContext.Provider>
  );
}

/** Returns i18n context, or a SSR-safe fallback if no provider is present. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx) return ctx;
  // SSR fallback — components render without I18nProvider during Astro SSR
  return { locale: () => "en" as Locale, t: fallbackT, setLocale: () => {} };
}

export function useI18nOptional(): I18nContextValue | undefined {
  return useContext(I18nContext);
}
