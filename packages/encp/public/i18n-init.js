/**
 * Client-side i18n initialization for ENCP.
 * Replaces hardcoded strings with translated versions on page load.
 *
 * Usage: Add <script src="/i18n-init.js" defer></script> to layout.
 */

(function () {
  var STORAGE_KEY = "wikisites:locale";

  var translations = {
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
    },
    "nav.peptides": {
      en: "Peptides",
      zh: "肽",
      ru: "Пептиды",
      de: "Peptide",
      fr: "Peptides",
      jp: "ペプチド",
      ko: "펩타이드",
      es: "Péptidos",
      it: "Peptidi",
      pt: "Peptídeos",
    },
    "nav.classification": {
      en: "Classification",
      zh: "分类",
      ru: "Классификация",
      de: "Klassifikation",
      fr: "Classification",
      jp: "分類",
      ko: "분류",
      es: "Clasificación",
      it: "Classificazione",
      pt: "Classificação",
    },
    "nav.synthesis": {
      en: "Synthesis",
      zh: "合成",
      ru: "Синтез",
      de: "Synthese",
      fr: "Synthèse",
      jp: "合成",
      ko: "합성",
      es: "Síntesis",
      it: "Sintesi",
      pt: "Síntese",
    },
    "nav.pharmacology": {
      en: "Pharmacology",
      zh: "药理学",
      ru: "Фармакология",
      de: "Pharmakologie",
      fr: "Pharmacologie",
      jp: "薬理学",
      ko: "약리학",
      es: "Farmacología",
      it: "Farmacologia",
      pt: "Farmacologia",
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
    },
    "footer.copyright": {
      en: "Encyclopeptide. Academic reference for oligopeptide research.",
      zh: "Encyclopeptide。寡肽研究的学术参考。",
      ru: "Encyclopeptide. Академический справочник по исследованию олигопептидов.",
      de: "Encyclopeptide. Akademische Referenz für Oligopeptid-Forschung.",
      fr: "Encyclopeptide. Référence académique pour la recherche sur les oligopeptides.",
    },
    "theme.toggle": {
      en: "Toggle dark mode",
      zh: "切换深色模式",
      ru: "Переключить тёмную тему",
      de: "Dunkelmodus umschalten",
      fr: "Basculer le mode sombre",
    },
  };

  function getLocale() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && translations["nav.home"][stored]) return stored;
    var lang = navigator.language.split("-")[0];
    if (translations["nav.home"][lang]) return lang;
    return "en";
  }

  function t(key) {
    var locale = getLocale();
    var translation = translations[key];
    if (!translation) return key;
    return translation[locale] || translation.en || key;
  }

  function translatePage() {
    // Translate nav links
    var navLinks = document.querySelectorAll("nav a[href]");
    var navMap = {
      "/": "nav.home",
      "/peptides": "nav.peptides",
      "/classification": "nav.classification",
      "/synthesis": "nav.synthesis",
      "/pharmacology": "nav.pharmacology",
      "/glossary": "nav.glossary",
    };

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (navMap[href]) {
        link.textContent = t(navMap[href]);
      }
    });

    // Translate footer
    var footer = document.querySelector("footer p");
    if (footer) {
      footer.textContent = "\u00a9 2026 " + t("footer.copyright");
    }

    // Translate skip link
    var skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
      skipLink.textContent = t("a11y.skipToContent");
    }

    // Translate theme toggle
    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", t("theme.toggle"));
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", translatePage);
  } else {
    translatePage();
  }
})();
