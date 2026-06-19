import { describe, it, expect, beforeEach } from "vitest";
import {
  setLocale,
  getLocale,
  loadTranslations,
  t,
  isRTL,
  getSupportedLocales,
} from "../i18n";
import en from "../i18n/locales/en";
import zh from "../i18n/locales/zh";
import ja from "../i18n/locales/ja";
import ar from "../i18n/locales/ar";

describe("i18n", () => {
  beforeEach(() => {
    loadTranslations("en", en);
    loadTranslations("zh", zh);
    loadTranslations("ja", ja);
    loadTranslations("ar", ar);
    setLocale("en");
  });

  it("returns key when no translations loaded", () => {
    setLocale("en");
    expect(typeof t("missing.key")).toBe("string");
  });

  it("translates nested keys", () => {
    expect(t("nav.home")).toBe("Home");
  });

  it("handles parameter interpolation", () => {
    expect(t("article.readTime", { minutes: 5 })).toBe("5 min read");
  });

  it("switches locale", () => {
    setLocale("zh");
    expect(getLocale()).toBe("zh");
    expect(t("nav.home")).toBe("首页");
  });

  it("returns key for missing translation", () => {
    expect(t("nonexistent.key")).toBe("nonexistent.key");
  });

  it("detects RTL locales", () => {
    expect(isRTL("ar")).toBe(true);
    expect(isRTL("en")).toBe(false);
  });

  it("returns supported locales", () => {
    const locales = getSupportedLocales();
    expect(locales).toContain("en");
    expect(locales).toContain("zh");
    expect(locales).toContain("ja");
    expect(locales).toContain("ar");
  });

  it("Japanese translations work", () => {
    setLocale("ja");
    expect(t("nav.quiz")).toBe("クイズ");
    expect(t("quiz.correct")).toBe("正解！");
  });

  it("Arabic translations work", () => {
    setLocale("ar");
    expect(t("nav.articles")).toBe("المقالات");
    expect(t("common.search")).toBe("بحث");
  });
});
