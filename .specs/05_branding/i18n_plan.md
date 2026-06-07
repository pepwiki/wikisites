# Internationalization Plan

## Supported Languages

| Language | Locale | Status | Priority |
|----------|--------|--------|----------|
| English | en | Complete | -- |
| Chinese (Simplified) | zh | Planned | P1 |
| Japanese | ja | Future | P2 |
| Korean | ko | Future | P2 |

## Architecture

### URL Structure

English (default): `https://site.com/page`
Chinese: `https://site.com/zh/page`

### Implementation Approach

1. **Phase 1** (current): English-only with locale infrastructure in place
2. **Phase 2**: Add Chinese translations for UI strings and nav
3. **Phase 3**: Translate article content to Chinese
4. **Phase 4**: Add Japanese and Korean support

### File Structure

```
src/i18n/
  index.ts          -- Translation function and locale detection
  locales/
    en.json          -- English strings
    zh.json          -- Chinese strings
    ja.json          -- Japanese strings (future)
    ko.json          -- Korean strings (future)
```

### Translation Workflow

1. Extract UI strings to locale JSON files
2. Machine translate to target language (TQA Level 2)
3. Technical review by domain expert (TQA Level 3)
4. Peer validation (TQA Level 4)
5. Content articles translated separately with full TQA pipeline

## Content Translation Priority

| Content Type | Source Language | Target | TQA Level |
|-------------|---------------|--------|-----------|
| Navigation | EN | ZH | 4 |
| UI Labels | EN | ZH | 4 |
| Articles | EN | ZH | 3 |
| Flashcards | EN | ZH | 3 |
| Quizzes | EN | ZH | 3 |
