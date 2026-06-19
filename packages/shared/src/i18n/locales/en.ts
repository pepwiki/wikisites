import type { TranslationMessages } from "../index";

const en: TranslationMessages = {
  nav: {
    home: "Home",
    articles: "Articles",
    glossary: "Glossary",
    quiz: "Quiz",
    flashcards: "Flashcards",
  },
  language: {
    switcher: "Language",
    en: "English",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
  },
  common: {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    search: "Search",
  },
  article: {
    readTime: "{minutes} min read",
    difficulty: "Difficulty",
    startQuiz: "Start Quiz",
    studyFlashcards: "Study Flashcards",
  },
  quiz: {
    question: "Question {current} of {total}",
    correct: "Correct!",
    incorrect: "Incorrect",
    score: "Your score: {score}%",
    tryAgain: "Try Again",
  },
  flashcard: {
    flip: "Click to flip",
    next: "Next",
    previous: "Previous",
    progress: "{current} of {total}",
  },
};

export default en;
