import type { TranslationMessages } from "../index";

const ar: TranslationMessages = {
  nav: {
    home: "الرئيسية",
    articles: "المقالات",
    glossary: "المصطلحات",
    quiz: "اختبار",
    flashcards: "بطاقات تعليمية",
  },
  language: {
    switcher: "اللغة",
    en: "English",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
  },
  common: {
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    retry: "إعادة المحاولة",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    search: "بحث",
  },
  article: {
    readTime: "وقت القراءة {minutes} دقائق",
    difficulty: "الصعوبة",
    startQuiz: "ابدأ الاختبار",
    studyFlashcards: "ادرس البطاقات التعليمية",
  },
  quiz: {
    question: "السؤال {current} من {total}",
    correct: "صحيح!",
    incorrect: "خطأ",
    score: "نتيجتك: {score}%",
    tryAgain: "حاول مرة أخرى",
  },
  flashcard: {
    flip: "انقر للقلب",
    next: "التالي",
    previous: "السابق",
    progress: "{current} من {total}",
  },
};

export default ar;
