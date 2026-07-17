# Roadmap: Closing the Gap with Starlight-Sites

## Context

Wikisites and Starlight-Sites share the same tech stack (Astro + SolidJS + Tailwind + Starlight + Bun + Cloudflare Pages) but diverge in maturity. Starlight-Sites has 40+ sites, cross-site search, 12 content linters, uptime monitoring, and a polished reader experience. Wikisites has deeper content (6,519 articles), power-user tools (command palette, graph view, regex search), and a better learning system (FSRS v4).

This roadmap closes the gap by adopting Starlight-Sites patterns where they add value, without losing Wikisites' unique strengths.

---

## Phase 1: Foundation (Week 1-2) — Toolchain & Quality

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **1.1** | Replace ESLint + Prettier with Biome | Single tool, faster, matches Starlight-Sites | 2h | High |
| **1.2** | Add content linters (5 core) | Hand-wave detection, depth validation, description checks, link integrity, no-emoji | 8h | High |
| **1.3** | Wire TipTap or remove it | Dead dependency currently | 1h | High |
| **1.4** | Add Mermaid diagram support | Starlight-Sites has it, useful for learning content | 2h | Medium |
| **1.5** | Add uptime monitoring (6-hour probes) | Starlight-Sites has this, catches outages | 2h | Medium |
| **1.6** | Add preview deployments on PRs | Starlight-Sites previews every PR | 2h | Medium |

**Exit criteria:** Biome runs, 5 linters pass, no dead deps, Mermaid renders, uptime monitoring active.

---

## Phase 2: Reader Experience (Week 3-4) — Match Starlight-Sites Polish

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **2.1** | Reader settings panel (font size, line height, content width, font family) | Starlight-Sites has this via reader.js | 6h | High |
| **2.2** | Focus / reading mode (auto-hide nav, dim distractions) | Starlight-Sites reader.js feature | 4h | High |
| **2.3** | Scroll restoration (remember position per page) | Starlight-Sites has this | 2h | Medium |
| **2.4** | Print-friendly styles | Starlight-Sites has this | 2h | Low |
| **2.5** | Add Atkinson Hyperlegible font option | Accessibility-optimized, Starlight-Sites uses it | 1h | Low |

**Exit criteria:** Reader can customize experience, focus mode works, scroll position persists.

---

## Phase 3: Search Upgrade (Week 5-6) — Cross-Site Search

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **3.1** | Create Cloudflare Worker search API | Replace Pagefind with runtime search | 8h | High |
| **3.2** | Build search index at build time | Pre-compute index for Worker | 4h | High |
| **3.3** | Add search analytics (query logging, click tracking) | Starlight-Sites has full analytics | 4h | Medium |
| **3.4** | Add trending/suggestions endpoint | Zero-result recovery | 3h | Medium |
| **3.5** | Add A/B testing for search ranking | Starlight-Sites has this | 4h | Low |
| **3.6** | Replace Pagefind client with custom search UI | Unified experience | 4h | High |

**Note:** Wikisites has 2 sites (encp + wiki). Cross-site search matters less than for Starlight-Sites' 40. But the Worker architecture enables future scaling.

**Exit criteria:** Search works via Worker, analytics capture queries, suggestions on zero results.

---

## Phase 4: Content Quality (Week 7-8) — Linter Expansion

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **4.1** | Add cspell (spell checking) | Starlight-Sites has this | 2h | Medium |
| **4.2** | Add markdownlint | Structure validation | 1h | Medium |
| **4.3** | Add lychee (external link checker) | Broken link detection | 1h | Low |
| **4.4** | Add forward-reference detection | Ensure all internal links resolve | 3h | Medium |
| **4.5** | Add secrets detection | Prevent credential leaks | 1h | Medium |
| **4.6** | Wire linters into CI (fail on error) | Automated quality gate | 2h | High |

**Exit criteria:** All 12 linters run in CI, content quality enforced.

---

## Phase 5: CI/CD Maturity (Week 9-10) — Match Starlight-Sites

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **5.1** | Matrix build for both sites | Parallel builds, faster feedback | 3h | Medium |
| **5.2** | Preview deployment workflow | Auto-preview on PRs | 2h | Medium |
| **5.3** | Uptime probe workflow (6-hour) | Auto-create issues on failure | 2h | Medium |
| **5.4** | Dependabot / Renovate config | Automated dependency updates | 2h | Medium |
| **5.5** | Weekly security audit workflow | Automated vulnerability scanning | 1h | Low |

**Exit criteria:** CI matches Starlight-Sites' 5-workflow setup.

---

## Phase 6: Power-Up Wikisites Unique Strengths (Week 11-12) — Don't Lose What Makes Us Different

| Task | What | Why | Effort | Priority |
|------|------|-----|--------|----------|
| **6.1** | Upgrade flashcard import/export | Starlight-Sites has this, we don't | 3h | Medium |
| **6.2** | Add Mermaid to command palette | Render diagrams from palette | 2h | Low |
| **6.3** | Knowledge graph: add search/filter | Power tool enhancement | 3h | Medium |
| **6.4** | Graph view: persistence (last viewed) | User experience | 1h | Low |
| **6.5** | FSRS v4: add analytics dashboard | Show retention curves | 4h | Medium |
| **6.6** | Quiz: add timed mode | Engagement feature | 3h | Low |

**Exit criteria:** Wikisites' unique features are polished, not just maintained.

---

## Priority Summary

| Phase | Weeks | Focus | Impact |
|-------|-------|-------|--------|
| **1** | 1-2 | Foundation | Toolchain parity, dead code cleanup |
| **2** | 3-4 | Reader UX | Match Starlight-Sites polish |
| **3** | 5-6 | Search | Modernize from static to runtime |
| **4** | 7-8 | Content quality | Automated quality enforcement |
| **5** | 9-10 | CI/CD | Deployment maturity |
| **6** | 11-12 | Unique strengths | Don't lose what makes us different |

**Total: 12 weeks, ~80 hours**

---

## What NOT to Change

| Feature | Keep | Reason |
|---------|------|--------|
| FSRS v4 (not SM-2) | ✅ | Better algorithm |
| Command palette | ✅ | Unique power-user tool |
| Knowledge graph | ✅ | Unique content visualization |
| Regex search | ✅ | Unique power-user tool |
| Split pane | ✅ | Unique comparison tool |
| 6,519 encp articles | ✅ | Deep domain content |
| 3D molecule viewer | ✅ | Domain-specific |
| Pagefind (until Worker ready) | ✅ | Works, don't break |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Search Worker adds complexity | Medium | Keep Pagefind as fallback |
| Biome migration breaks CI | Low | Run in parallel first |
| Reader settings conflict with Starlight | Medium | Override Starlight components carefully |
| Content linters too strict | Low | Start with warnings, not errors |
| TipTap removal loses future editor | Low | Keep type stubs, remove runtime |

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Lighthouse score | 90+ | 95+ |
| Content lint pass rate | 0% | 100% |
| Search latency | N/A (Pagefind) | <200ms |
| Zero-result rate | Unknown | <5% |
| Reader customization options | 0 | 5+ |
| CI workflows | 1 | 5 |
| Uptime monitoring | No | Yes |
| Preview deployments | No | Yes |
