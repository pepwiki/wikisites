# Feature Parity Matrix: Wikisites vs Starlight-Sites

## Quick Reference

| Category | Feature | Wikisites | Starlight-Sites | Winner |
|----------|---------|-----------|-----------------|--------|
| **Scale** | Sites | 2 | 40+ | Starlight |
| **Scale** | Total pages | 6,633 | ~500+ | Wikisites |
| **Content** | Encyclopedia articles | 6,519 | 0 | Wikisites |
| **Content** | Quiz questions | 1,060 | Variable | Wikisites |
| **Content** | Flashcards | 1,022 | Variable | Wikisites |
| **Content** | Content linters | 0 | 12 | Starlight |
| **Framework** | Astro version | 5.x | 6.4.x | Starlight |
| **Framework** | Starlight version | 0.37.x | 0.40.x | Starlight |
| **UI** | Component count | 39 | 15+ shared | Comparable |
| **UI** | Design tokens | Partial | 1762-line CSS | Starlight |
| **UI** | Themes | 8 | 10 | Starlight |
| **UI** | Reader customization | No | Yes | Starlight |
| **UI** | Focus mode | No | Yes | Starlight |
| **UI** | Font selection | No | 4 fonts | Starlight |
| **Power** | Command palette | Yes | No | Wikisites |
| **Power** | Keyboard shortcuts | 14 remappable | Flashcard only | Wikisites |
| **Power** | Regex search | Yes | No | Wikisites |
| **Power** | Split pane | Yes | No | Wikisites |
| **Power** | Knowledge graph | Yes | No | Wikisites |
| **Learning** | SRS algorithm | FSRS v4 | SM-2 | Wikisites |
| **Learning** | Daily challenges | Yes | No | Wikisites |
| **Learning** | Adaptive difficulty | Yes | No | Wikisites |
| **Learning** | Review dashboard | Yes | Yes | Tie |
| **Learning** | Import/export | No | Yes | Starlight |
| **Math** | KaTeX | Yes | Yes | Tie |
| **Diagrams** | Mermaid | No | Yes | Starlight |
| **Diagrams** | WASM widgets | No | Yes | Starlight |
| **Science** | Molecule viewer | Yes | No | Wikisites |
| **Search** | Static (Pagefind) | Yes | No (replaced) | Wikisites |
| **Search** | Cross-site API | No | Yes | Starlight |
| **Search** | A/B testing | No | Yes | Starlight |
| **Search** | Analytics | Basic | Full | Starlight |
| **i18n** | Active locales | 4 | 3 | Wikisites |
| **i18n** | RTL | Yes | Planned | Wikisites |
| **Deploy** | CF Pages projects | 2 | 36 | Starlight |
| **Deploy** | Uptime monitoring | No | Yes | Starlight |
| **Deploy** | Preview deployments | No | Yes | Starlight |
| **Deploy** | Matrix builds | No | Yes | Starlight |
| **Testing** | Unit test files | 33 | 465+ tests | Starlight |
| **Testing** | E2E specs | 6 | Multiple | Comparable |
| **Testing** | Accessibility | axe-core | axe-core | Tie |
| **Security** | Rate limiting | Yes | Yes | Tie |
| **Security** | CSP headers | Yes | Yes | Tie |
| **Quality** | Linting | ESLint + Prettier | Biome | Starlight |
| **Quality** | Pre-commit | Husky + lint-staged | Husky + lint-staged | Tie |
| **Quality** | Content validation | Zod schemas | 12 linters | Starlight |
