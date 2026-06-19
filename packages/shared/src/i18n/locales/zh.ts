import type { TranslationMessages } from "../index";

const zh: TranslationMessages = {
  nav: {
    home: "首页",
    articles: "文章",
    glossary: "词汇表",
    quiz: "测验",
    flashcards: "闪卡",
  },
  language: {
    switcher: "语言",
    en: "English",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
  },
  common: {
    loading: "加载中...",
    error: "发生错误",
    retry: "重试",
    save: "保存",
    cancel: "取消",
    confirm: "确认",
    search: "搜索",
  },
  article: {
    readTime: "{minutes} 分钟阅读",
    difficulty: "难度",
    startQuiz: "开始测验",
    studyFlashcards: "学习闪卡",
  },
  quiz: {
    question: "第 {current} 题，共 {total} 题",
    correct: "正确！",
    incorrect: "错误",
    score: "你的得分：{score}%",
    tryAgain: "再试一次",
  },
  flashcard: {
    flip: "点击翻转",
    next: "下一张",
    previous: "上一张",
    progress: "第 {current} 张，共 {total} 张",
  },
};

export default zh;
