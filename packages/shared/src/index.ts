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

export { getTheme, setTheme, applyTheme, initTheme, watchSystemTheme } from "./theme";
export type { Theme } from "./theme";

export { presets, applyPreset, getCurrentPreset, getAvailablePresets } from "./theme-presets";
export type { ThemePreset } from "./theme-presets";
