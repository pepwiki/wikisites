# Comparative Analysis: Wikisites vs Starlight-Sites

## Overview

| Attribute | Wikisites | Starlight-Sites |
|-----------|-----------|-----------------|
| **Repository** | `forgejo.wyattau.com/KP/wikisites` | `github.com/WyattAu/starlight-sites` |
| **Brand** | Encyclopeptide + Wikipept | Wyatt's Notes |
| **Purpose** | Oligopeptide research encyclopedia + learning platform | 40+ academic/programming/infrastructure wikis |
| **License** | See LICENSE | AGPL v3 |
| **Sites** | 2 | 40+ sub-sites + 1 landing page + search API |
| **Content Scope** | Peptide science (narrow, deep) | Exam boards, languages, STEM, infra (broad, variable depth) |

---

## Tech Stack Comparison

| Layer | Wikisites | Starlight-Sites |
|-------|-----------|-----------------|
| **Framework** | Astro 5.x | Astro 6.4.x |
| **Documentation** | Starlight 0.37.x | Starlight 0.40.x |
| **UI Components** | SolidJS 1.9.x | SolidJS 1.9.x |
| **Styling** | Tailwind CSS 4.x | Tailwind CSS 4.3.x + 1762-line custom.css |
| **TypeScript** | 5.9.x (strict) | 5.9.x |
| **Package Manager** | Bun | Bun |
| **Linter** | ESLint 9 + Biome | Biome 2.5.x (replaced ESLint) |
| **Formatter** | Prettier 3.x | Biome 2.5.x |
| **Math Rendering** | KaTeX (custom remark/rehype) | KaTeX (remark-math + rehype-katex) |
| **Diagrams** | None | Mermaid (astro-mermaid) |
| **WASM** | None | Rust/WASM Fourier visualizer |
| **Spaced Repetition** | FSRS v4 (custom) | SM-2 (custom) |
| **Search** | Pagefind (static, per-site) | Cloudflare Worker API (cross-site, KV-backed) |
| **Validation** | Zod 3.x | Zod 4.x + Felte forms |
| **UI Primitives** | None (custom components) | Kobalte (WAI-ARIA accessible) |
| **Rich Text** | TipTap (installed, not wired) | None |

---

## Feature Matrix

### Reading & Navigation

| Feature | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| Dark mode | Yes | Yes (10 themes) |
| Theme switching | 8 themes, picker UI | 10 themes, reader settings panel |
| Reading progress | Yes | Yes |
| Breadcrumbs | Yes (Schema.org) | Yes (Starlight default) |
| Outline / TOC | Yes (custom panel) | Yes (Starlight default) |
| Print styles | Limited | Yes |
| Focus / reading mode | No | Yes (reader.js) |
| Font customization | No | 4 self-hosted fonts, user-selectable |
| Content width control | No | Yes (reader.js) |
| Scroll restoration | No | Yes (position memory) |

### Interactive Learning

| Feature | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| Quizzes | 1060 questions, adaptive difficulty | Practice problems, diagnostic tests |
| Flashcards | 1022 cards, FSRS v4 | SM-2 spaced repetition |
| Daily challenges | Yes (seeded shuffle) | No |
| Review dashboard | Yes (session stats, streak) | Yes (review queue) |
| Spaced repetition algorithm | FSRS v4 | SM-2 |
| Import/export flashcards | No | Yes |

### Power User Tools

| Feature | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| Command palette | Yes (Ctrl+K) | No |
| Keyboard shortcuts | 14 remappable | Flashcard shortcuts only |
| Regex search | Yes (4-layer ReDoS defense) | No |
| Split pane view | Yes | No |
| Knowledge graph | Yes (force-graph, 1000+ nodes) | No |
| LaTeX rendering | Yes (KaTeX) | Yes (KaTeX) |
| Code highlighting | Shiki (github-dark) | Expressive Code (dracula + github-light) |
| Mermaid diagrams | No | Yes |
| WASM widgets | No | Fourier series visualizer |
| Interactive simulations | No | PhET + Desmos embeds |
| Molecule viewer | Yes (3Dmol.js) | No |

### Internationalization

| Feature | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| Locales | 4 (en, zh, ja, ar) | 3 active (en, zh, ja) + 5 planned |
| RTL support | Yes (Arabic) | Yes (Arabic planned) |
| Translation system | Custom i18n in shared | @solid-primitives/i18n |

### Infrastructure

| Feature | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| Deployment | Cloudflare Pages (2 projects) | Cloudflare Pages (36 projects) |
| Search backend | Pagefind (static) | Cloudflare Worker + KV |
| Cross-site search | No | Yes (unified API) |
| API | Workers (health, search) | Worker (search, analytics, A/B testing) |
| CI/CD | GitHub Actions | GitHub Actions (5 workflows) |
| Pre-commit | Husky + lint-staged | Husky + lint-staged |
| Content linters | None | 12 custom linters |
| Uptime monitoring | No | Yes (6-hour probes) |
| Analytics | Cloudflare Web Analytics | Cloudflare Web Analytics + Web Vitals |
| PWA | Yes | Yes |

---

## Content Scale

| Metric | Wikisites | Starlight-Sites |
|--------|-----------|-----------------|
| **Total pages** | ~109 wiki + 6524 encp | 40+ sites (estimated 500+ pages) |
| **Encyclopedia articles** | 6,519 (encyclopeptide) | 0 |
| **Quiz questions** | 1,060 | Variable per site |
| **Flashcards** | 1,022 | Variable per site |
| **Learn lessons** | 18 + 5 practical guides | Site-dependent |
| **Content format** | Markdown + JSON (quizzes/flashcards) | Markdown + MDX |
| **Content validation** | Zod schemas | 12 custom linters |

---

## Architecture Patterns

| Pattern | Wikisites | Starlight-Sites |
|---------|-----------|-----------------|
| **Monorepo structure** | 6 packages (shared, query, workers, sdk, encp, wiki) | shared/ + 40 sites/ + search-api/ + packages/ |
| **Shared code model** | npm workspace packages (import between packages) | Copy-based sync (scripts/sync-shared.mjs) |
| **Component architecture** | SolidJS islands in Astro | SolidJS islands + Kobalte primitives |
| **State management** | SolidJS signals + localStorage | SolidJS signals + localStorage |
| **Schema validation** | Zod 3.x | Zod 4.x |
| **Build output** | Static HTML + Pagefind index | Static HTML + KV search index |
| **Starlight overrides** | None (uses default layout) | 5 slot overrides (Head, PageTitle, SiteTitle, MarkdownContent, Search) |

---

## Testing

| Metric | Wikisites | Starlight-Sites |
|--------|-----------|-----------------|
| **Unit tests** | 33 test files | 465+ tests |
| **E2E tests** | 6 Playwright specs | Playwright specs |
| **Component tests** | Yes (solidjs/testing-library) | Yes (solidjs/testing-library) |
| **Coverage threshold** | 80% | Not specified |
| **Accessibility tests** | axe-core | axe-core |
| **Performance audits** | Lighthouse CI | Lighthouse CI |
| **Content validation** | None | 12 custom linters |

---

## Strengths

### Wikisites Strengths
1. **Deep domain expertise** — 6,519 peer-reviewed peptide articles
2. **Power user shell** — command palette, keyboard shortcuts, regex search, split pane, graph view (unique)
3. **FSRS v4** — more advanced than SM-2 for spaced repetition
4. **Molecular viewer** — 3Dmol.js integration (domain-specific)
5. **Dual-site architecture** — encyclopedia + learning platform in one monorepo
6. **LaTeX pipeline** — custom remark/rehype with SSR fallback

### Starlight-Sites Strengths
1. **Scale** — 40+ sites, unified search, cross-site navigation
2. **Theme system** — 10 themes with full design token coverage (vs 8)
3. **Reader experience** — focus mode, font selection, content width, scroll restoration
4. **Search architecture** — Cloudflare Worker with A/B testing, analytics, rate limiting
5. **Content quality tooling** — 12 custom linters (hand-wave detection, depth validation, etc.)
6. **WASM integration** — Rust-compiled Fourier visualizer
7. **Mermaid diagrams** — first-class support
8. **Accessibility** — Kobalte primitives, High Contrast theme, Atkinson Hyperlegible font
9. **CI/CD maturity** — 5 workflows, uptime monitoring, matrix builds, preview deployments
10. **Copy-based sync** — shared components propagated to all 40 sites atomically

---

## Weaknesses

### Wikisites Weaknesses
1. **No cross-site search** — Pagefind is per-site, no unified search
2. **No content linters** — no automated quality checks
3. **Limited themes** — 8 vs 10, no reader customization
4. **No uptime monitoring** — no automated health checks
5. **TipTap installed but not wired** — dead dependency
6. **Single linting tool** — ESLint + Prettier vs Biome (faster)
7. **No Mermaid support** — can't render diagrams in content
8. **No WASM** — no interactive widgets
9. **No focus/reading mode** — reader can't customize experience
10. **Fewer E2E tests** — 6 specs vs more comprehensive coverage

### Starlight-Sites Weaknesses
1. **No command palette** — no power-user navigation
2. **No keyboard shortcuts** — no remappable bindings
3. **No split pane** — no side-by-side comparison
4. **No knowledge graph** — no content relationship visualization
5. **No regex search** — basic search only
6. **No molecule viewer** — no domain-specific tools
7. **No daily challenges** — no engagement mechanics
8. **Copy-based sync drift** — shared/ copies can diverge from sites/
9. **SM-2 algorithm** — less optimal than FSRS v4 for retention
10. **Broad but shallow** — 40+ sites but variable content depth

---

## Shared DNA

Both projects share:
- **Same author** (Wyatt Au)
- **Same design language** — "Spatial Materialism" + "Amoebic UI"
- **Same tech stack** — Astro + SolidJS + Tailwind + Starlight + Bun
- **Same deployment** — Cloudflare Pages
- **Same i18n locales** — en, zh, ja, ar
- **Same flashcard/quiz patterns** — but different algorithms (FSRS vs SM-2)
- **Same typography** — Inter + Plus Jakarta Sans (Wikisites) / Inter + JetBrains Mono + Atkinson (Starlight)

---

## Recommendations

### For Wikisites (adopt from Starlight-Sites)
1. Add **cross-site search** via Cloudflare Worker (if encp + wiki need unified search)
2. Implement **content linters** — especially hand-wave detection and depth validation
3. Add **uptime monitoring** (6-hour probes)
4. Wire **TipTap** or remove the dependency
5. Add **Mermaid diagram** support
6. Add **reader customization** (font size, content width)
7. Consider **Biome** over ESLint + Prettier (faster, single tool)

### For Starlight-Sites (adopt from Wikisites)
1. Add **command palette** (Ctrl+K) for power-user navigation
2. Add **keyboard shortcut system** with remapping
3. Add **knowledge graph** visualization
4. Add **regex search** for power users
5. Upgrade from **SM-2 to FSRS v4** for better retention
6. Add **split pane** for comparing content across sites
