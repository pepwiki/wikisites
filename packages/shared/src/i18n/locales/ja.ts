import type { TranslationMessages } from "../index";

const ja: TranslationMessages = {
  nav: {
    home: "ホーム",
    articles: "記事",
    glossary: "用語集",
    quiz: "クイズ",
    flashcards: "フラッシュカード",
  },
  language: {
    switcher: "言語",
    en: "English",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
  },
  common: {
    loading: "読み込み中...",
    error: "エラーが発生しました",
    retry: "再試行",
    save: "保存",
    cancel: "キャンセル",
    confirm: "確認",
    search: "検索",
  },
  article: {
    readTime: "約{minutes}分で読めます",
    difficulty: "難易度",
    startQuiz: "クイズを始める",
    studyFlashcards: "フラッシュカードで学ぶ",
  },
  quiz: {
    question: "{total}問中{current}問目",
    correct: "正解！",
    incorrect: "不正解",
    score: "スコア: {score}%",
    tryAgain: "もう一度",
  },
  flashcard: {
    flip: "クリックして裏返す",
    next: "次へ",
    previous: "前へ",
    progress: "{total}枚中{current}枚",
  },
};

export default ja;
