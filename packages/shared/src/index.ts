export {
  AminoAcidSchema,
  OligopeptideSchema,
  calculateMolecularWeight,
} from "./schemas/oligopeptide";
export type { AminoAcid, Oligopeptide, SecondaryStructure } from "./schemas/oligopeptide";

export {
  ArticleSchema,
  GlossaryTermSchema,
  QuizQuestionSchema,
  FlashcardSchema,
} from "./schemas/content";
export type {
  Article,
  GlossaryTerm,
  QuizQuestion,
  Flashcard,
  DifficultyLevel,
} from "./schemas/content";

export {
  validateDOI,
  validatePMID,
  validateCitation,
  isCitationResolvable,
} from "./validation/citation";
export type { Citation, CitationValidationResult, ResolvabilityResult } from "./validation/citation";

export {
  ContentVersionSchema,
  type ContentVersion,
} from "./schemas/content-version";

export { getTheme, setTheme, applyTheme, initTheme, watchSystemTheme } from "./theme";
export type { Theme } from "./theme";

export { presets, applyPreset, getCurrentPreset, getAvailablePresets } from "./theme-presets";
export type { ThemePreset } from "./theme-presets";

export {
  setLocale,
  getLocale,
  loadTranslations,
  t,
  isRTL,
  getSupportedLocales,
  formatNumber,
  formatDate,
} from "./i18n";
export type { Locale, I18nConfig, TranslationMessages } from "./i18n";
