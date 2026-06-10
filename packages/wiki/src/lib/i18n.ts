/**
 * Internationalization (i18n) system for wikisites.
 * Supports EN, ZH, RU, DE, FR, JP, KO, ES, IT, PT, NL, PL, CS, AR, FA, TR.
 *
 * Usage:
 *   import { t, setLocale, getLocale } from "../lib/i18n";
 *   t("welcome"); // "Welcome" (EN) or "欢迎" (ZH)
 */

export type Locale =
  | "en"
  | "zh"
  | "ru"
  | "de"
  | "fr"
  | "jp"
  | "ko"
  | "es"
  | "it"
  | "pt"
  | "nl"
  | "pl"
  | "cs"
  | "ar"
  | "fa"
  | "tr";

type Translations = Record<string, Record<Locale, string>>;

const STORAGE_KEY = "wikisites:locale";

/**
 * Default translations for common UI elements.
 */
const translations: Translations = {
  "nav.home": {
    en: "Home",
    zh: "首页",
    ru: "Главная",
    de: "Startseite",
    fr: "Accueil",
    jp: "ホーム",
    ko: "홈",
    es: "Inicio",
    it: "Home",
    pt: "Início",
    nl: "Home",
    pl: "Strona główna",
    cs: "Domů",
    ar: "الرئيسية",
    fa: "خانه",
    tr: "Ana Sayfa",
  },
  "nav.learn": {
    en: "Learn",
    zh: "学习",
    ru: "Учить",
    de: "Lernen",
    fr: "Apprendre",
    jp: "学ぶ",
    ko: "학습",
    es: "Aprender",
    it: "Impara",
    pt: "Aprender",
    nl: "Leren",
    pl: "Ucz się",
    cs: "Učit se",
    ar: "تعلم",
    fa: "یادگیری",
    tr: "Öğren",
  },
  "nav.quizzes": {
    en: "Quizzes",
    zh: "测验",
    ru: "Тесты",
    de: "Quizze",
    fr: "Quiz",
    jp: "クイズ",
    ko: "퀴즈",
    es: "Cuestionarios",
    it: "Quiz",
    pt: "Quizzes",
    nl: "Quizzen",
    pl: "Quizy",
    cs: "Kvízy",
    ar: "اختبارات",
    fa: "آزمون‌ها",
    tr: "Sınavlar",
  },
  "nav.flashcards": {
    en: "Flashcards",
    zh: "闪卡",
    ru: "Карточки",
    de: "Karteikarten",
    fr: "Flashcards",
    jp: "フラッシュカード",
    ko: "플래시카드",
    es: "Tarjetas",
    it: "Flashcard",
    pt: "Flashcards",
    nl: "Flashcards",
    pl: "Fiszki",
    cs: "Kartičky",
    ar: "بطاقات تعليمية",
    fa: "فلش‌کارت",
    tr: "Kartlar",
  },
  "nav.review": {
    en: "Review",
    zh: "复习",
    ru: "Повторение",
    de: "Wiederholung",
    fr: "Révision",
    jp: "復習",
    ko: "복습",
    es: "Repaso",
    it: "Ripasso",
    pt: "Revisão",
    nl: "Herhaling",
    pl: "Powtórka",
    cs: "Opakování",
    ar: "مراجعة",
    fa: "مرور",
    tr: "Tekrar",
  },
  "nav.community": {
    en: "Community",
    zh: "社区",
    ru: "Сообщество",
    de: "Gemeinschaft",
    fr: "Communauté",
    jp: "コミュニティ",
    ko: "커뮤니티",
    es: "Comunidad",
    it: "Comunità",
    pt: "Comunidade",
    nl: "Gemeenschap",
    pl: "Społeczność",
    cs: "Komunita",
    ar: "المجتمع",
    fa: "انجمن",
    tr: "Topluluk",
  },
  "nav.glossary": {
    en: "Glossary",
    zh: "术语表",
    ru: "Глоссарий",
    de: "Glossar",
    fr: "Glossaire",
    jp: "用語集",
    ko: "용어집",
    es: "Glosario",
    it: "Glossario",
    pt: "Glossário",
    nl: "Woordenlijst",
    pl: "Słownik",
    cs: "Slovník",
    ar: "مسرد",
    fa: "واژه‌نامه",
    tr: "Sözlük",
  },
  "theme.toggle": {
    en: "Toggle theme",
    zh: "切换主题",
    ru: "Переключить тему",
    de: "Thema wechseln",
    fr: "Changer le thème",
    jp: "テーマ切替",
    ko: "테마 전환",
    es: "Cambiar tema",
    it: "Cambia tema",
    pt: "Alternar tema",
    nl: "Thema wisselen",
    pl: "Zmień motyw",
    cs: "Přepnout motiv",
    ar: "تبديل السمة",
    fa: "تغییر تم",
    tr: "Temayı değiştir",
  },
  "theme.light": {
    en: "Light",
    zh: "浅色",
    ru: "Светлая",
    de: "Hell",
    fr: "Clair",
    jp: "ライト",
    ko: "라이트",
    es: "Claro",
    it: "Chiaro",
    pt: "Claro",
    nl: "Licht",
    pl: "Jasny",
    cs: "Světlý",
    ar: "فاتح",
    fa: "روشن",
    tr: "Açık",
  },
  "theme.dark": {
    en: "Dark",
    zh: "深色",
    ru: "Тёмная",
    de: "Dunkel",
    fr: "Sombre",
    jp: "ダーク",
    ko: "다크",
    es: "Oscuro",
    it: "Scuro",
    pt: "Escuro",
    nl: "Donker",
    pl: "Ciemny",
    cs: "Tmavý",
    ar: "داكن",
    fa: "تاریک",
    tr: "Koyu",
  },
  "theme.system": {
    en: "System",
    zh: "系统",
    ru: "Системная",
    de: "System",
    fr: "Système",
    jp: "システム",
    ko: "시스템",
    es: "Sistema",
    it: "Sistema",
    pt: "Sistema",
    nl: "Systeem",
    pl: "System",
    cs: "Systém",
    ar: "النظام",
    fa: "سیستم",
    tr: "Sistem",
  },
  "quiz.correct": {
    en: "Correct!",
    zh: "正确！",
    ru: "Правильно!",
    de: "Richtig!",
    fr: "Correct !",
    jp: "正解！",
    ko: "정답!",
    es: "¡Correcto!",
    it: "Corretto!",
    pt: "Correto!",
    nl: "Correct!",
    pl: "Poprawnie!",
    cs: "Správně!",
    ar: "صحيح!",
    fa: "درست!",
    tr: "Doğru!",
  },
  "quiz.incorrect": {
    en: "Incorrect",
    zh: "错误",
    ru: "Неправильно",
    de: "Falsch",
    fr: "Incorrect",
    jp: "不正解",
    ko: "오답",
    es: "Incorrecto",
    it: "Sbagliato",
    pt: "Incorreto",
    nl: "Onjuist",
    pl: "Błędnie",
    cs: "Špatně",
    ar: "خطأ",
    fa: "نادرست",
    tr: "Yanlış",
  },
  "a11y.skipToContent": {
    en: "Skip to content",
    zh: "跳转到内容",
    ru: "Перейти к содержанию",
    de: "Zum Inhalt springen",
    fr: "Aller au contenu",
    jp: "コンテンツへスキップ",
    ko: "콘텐츠로 건너뛰기",
    es: "Saltar al contenido",
    it: "Vai al contenuto",
    pt: "Pular para o conteúdo",
    nl: "Ga naar inhoud",
    pl: "Przejdź do treści",
    cs: "Přeskočit na obsah",
    ar: "تخطي إلى المحتوى",
    fa: "پرش به محتوا",
    tr: "İçeriğe atla",
  },
};

let currentLocale: Locale = "en";

/**
 * Get the current locale.
 */
export function getLocale(): Locale {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  }
  if (typeof navigator !== "undefined") {
    const lang = navigator.language.split("-")[0];
    if (isLocale(lang)) return lang;
  }
  return "en";
}

/**
 * Set the current locale.
 */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", locale);
  }
}

/**
 * Translate a key to the current locale.
 */
export function t(key: string): string {
  const translation = translations[key];
  if (!translation) return key;
  return translation[currentLocale] || translation.en || key;
}

/**
 * Translate a key to a specific locale.
 */
export function tLocale(key: string, locale: Locale): string {
  const translation = translations[key];
  if (!translation) return key;
  return translation[locale] || translation.en || key;
}

/**
 * Get all available locales.
 */
export function getAvailableLocales(): Locale[] {
  return [
    "en",
    "zh",
    "ru",
    "de",
    "fr",
    "jp",
    "ko",
    "es",
    "it",
    "pt",
    "nl",
    "pl",
    "cs",
    "ar",
    "fa",
    "tr",
  ];
}

/**
 * Get locale display name.
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: "English",
    zh: "中文",
    ru: "Русский",
    de: "Deutsch",
    fr: "Français",
    jp: "日本語",
    ko: "한국어",
    es: "Español",
    it: "Italiano",
    pt: "Português",
    nl: "Nederlands",
    pl: "Polski",
    cs: "Čeština",
    ar: "العربية",
    fa: "فارسی",
    tr: "Türkçe",
  };
  return names[locale] || locale;
}

/**
 * Check if a string is a valid locale.
 */
function isLocale(str: string): str is Locale {
  return [
    "en",
    "zh",
    "ru",
    "de",
    "fr",
    "jp",
    "ko",
    "es",
    "it",
    "pt",
    "nl",
    "pl",
    "cs",
    "ar",
    "fa",
    "tr",
  ].includes(str);
}

/**
 * Add custom translations.
 */
export function addTranslations(newTranslations: Translations): void {
  Object.assign(translations, newTranslations);
}
