# Contingency Plans — High-Risk Tasks

**Version:** 2.0.0 | **Date:** 2026-06-19

---

## 1. KaTeX Bundle Too Large

**Task:** T-009 (KaTeX + LaTeXBlock), T-010 (remark/rehype KaTeX)

**Trigger Condition:**
- KaTeX JS bundle > 200KB gzipped
- Initial load time impact > 500ms on 3G
- Lighthouse Performance score drops below 85

**Primary Plan:** KaTeX with lazy loading
- Lazy-load KaTeX JS via dynamic `import()`
- Bundle KaTeX CSS inline (30KB gzipped)
- SSR: render math to HTML string at build time

**Fallback:** MathJax 3
- MathJax is slightly larger (~250KB gzipped) but more complete
- Same lazy-load strategy applies
- Better coverage of obscure LaTeX commands

**Impact:**
- Feature: Math rendering still works
- Performance: MathJax is ~50KB larger
- UX: No visible difference to users
- Timeline: 0 days delay (swap at T-009)

**Recovery Time:** 2 hours (swap import, update remark plugin, test)

---

## 2. force-graph Performance Insufficient

**Task:** T-011 (GraphView), T-012 (Graph Data Builder)

**Trigger Condition:**
- Canvas frame rate < 30fps with 500+ nodes
- Memory usage > 500MB with 1000+ nodes
- Mobile devices freeze or crash

**Primary Plan:** force-graph (canvas-based)
- Lazy-load via dynamic `import()`
- Truncate to maxNodes (1000) keeping highest-degree nodes
- Group filtering to reduce visible nodes

**Fallback:** vis-network
- vis-network uses canvas but has better performance tuning
- Built-in physics engine options for large graphs
- Smaller bundle (~150KB vs force-graph ~100KB)
- More configuration for stabilization

**Fallback 2:** Static SVG graph
- Pre-render graph at build time as SVG
- No interactive physics, but zoom/pan via CSS transforms
- Zero runtime cost
- Use when graph > 2000 nodes

**Impact:**
- Feature: Graph view still works with vis-network
- Performance: vis-network handles larger graphs better
- UX: Slightly different visual style, still interactive
- Timeline: 1 day delay (swap library, re-test)

**Recovery Time:** 4 hours (swap library, update component, test)

---

## 3. TipTap Integration Fails

**Task:** T-024 (TipTap Editor), T-025 (MDXLiveEditor)

**Trigger Condition:**
- TipTap SSR incompatible with Astro
- TipTap bundle > 300KB gzipped
- SolidJS wrapper unmaintained or broken
- Core features (tables, code blocks) require paid extensions

**Primary Plan:** TipTap with StarterKit
- @tiptap/core + @tiptap/starter-kit + custom extensions
- Markdown input/output via turndown + marked
- SSR: render to HTML at build time, hydrate on client

**Fallback:** CodeMirror 6
- CodeMirror is framework-agnostic (no SolidJS wrapper needed)
- Excellent markdown support via @codemirror/lang-markdown
- Smaller bundle (~120KB gzipped)
- Better keyboard handling for power users
- Built-in regex search
- More VS Code-like editing experience

**Impact:**
- Feature: Rich editing still works (different API)
- Performance: CodeMirror is smaller and faster
- UX: More "code editor" feel, less "WYSIWYG"
- Timeline: 2-3 days delay (redesign editor component)

**Recovery Time:** 8 hours (redesign MDXLiveEditor with CodeMirror 6)

---

## 4. Giscus Doesn't Meet Collaboration Needs

**Task:** T-017 (CommentStore), T-018 (AnnotationStore)

**Trigger Condition:**
- Giscus lacks inline comment support (only page-level discussions)
- No annotation/highlight API
- GitHub Discussions backend doesn't support D1 integration
- Rate limits too restrictive for active wiki

**Primary Plan:** Custom D1/KV implementation
- D1 for comments and annotations (structured data)
- KV for caching frequently-accessed comment threads
- Worker API for CRUD operations
- Already planned in T-017, T-018

**Fallback:** Giscus for page-level discussions only
- Use Giscus for page comments (simplest path)
- Skip inline comments (paragraph-level)
- Annotations still custom D1
- Reduces scope of T-019 (InlineComment)

**Impact:**
- Feature: Loses inline paragraph-level comments
- Performance: Giscus is external dependency (GitHub API)
- UX: Page-level comments only, no inline discussion
- Timeline: 0 days (scope reduction, not rework)

**Recovery Time:** 2 hours (remove InlineComment, keep AnnotationStore)

---

## 5. Cloudflare Access Integration Complexity

**Task:** T-021 (User Accounts)

**Trigger Condition:**
- Cloudflare Access JWT validation too complex for worker
- Session management requires Durable Objects (not in current infra)
- SSO setup requires enterprise plan

**Primary Plan:** Cloudflare Access + D1 user profiles
- Use CF Access for authentication (JWT in cookie)
- D1 for user profiles and preferences
- Worker validates JWT on each API request

**Fallback:** Simple cookie-based auth
- Implement basic session management with signed cookies
- D1 for user credentials (hashed passwords)
- No SSO, but functional user accounts
- Simpler than CF Access but less secure

**Fallback 2:** Read-only (no user accounts)
- All features work without authentication
- Comments/annotations are anonymous (stored in D1 with device fingerprint)
- No user profiles or preferences
- Fastest path to launch

**Impact:**
- Feature: Loses user identity, preferences, SSO
- Performance: Slightly faster (no auth checks)
- UX: Anonymous contributions, no personalization
- Timeline: 1 day delay for simple auth, 0 days for read-only

**Recovery Time:** 4 hours (simple auth), 1 hour (read-only)

---

## 6. Plugin API Security Sandbox Breach

**Task:** T-030 (Plugin API Surface), T-031 (Plugin Loader)

**Trigger Condition:**
- Dynamic import() allows access to global scope
- Plugin can modify DOM outside its container
- Plugin can access localStorage/cookies of host

**Primary Plan:** Sandboxed execution
- Plugin code loaded via dynamic import()
- Plugin receives limited API surface (no DOM access)
- Extension points controlled by host (toolbar, command, sidebar)

**Fallback:** Restricted plugin API
- Plugins only register commands and toolbar buttons
- No custom UI components (only predefined extension points)
- No access to article content (read-only data)
- Simpler but less powerful

**Fallback 2:** No plugin system
- Skip T-030, T-031 entirely
- Focus on built-in features only
- Theme customization still works (T-032)
- Settings panel still works (T-034)
- Loses extensibility for third-party additions

**Impact:**
- Feature: Loses third-party extensibility
- Performance: Faster (no plugin loading overhead)
- UX: All features are first-party, no customization API
- Timeline: Saves 12 hours (T-030 + T-031)

**Recovery Time:** 0 days (skip tasks)

---

## 7. Version History Diff Performance

**Task:** T-027 (VersionHistory Store)

**Trigger Condition:**
- Diff calculation > 1s for large articles (>10KB)
- D1 query for version list > 500ms
- Storing full content per version exceeds D1 limits

**Primary Plan:** Line-level diff with fast-diff
- fast-diff library for line-level comparison
- Store full content per version in D1
- D1 index on (pageSlug, createdAt) for fast listing

**Fallback:** Character-level diff with caching
- Use diff library for character-level comparison
- Cache computed diffs in KV
- Store diffs instead of full content (delta encoding)

**Fallback 2:** Snapshot-only (no diff)
- Store full content per version
- No diff view (just version list + restore)
- User compares versions manually (open in split pane)
- Simplest implementation

**Impact:**
- Feature: Loses visual diff view
- Performance: Much faster (no diff computation)
- UX: Manual comparison required
- Timeline: Saves 4 hours (T-028)

**Recovery Time:** 2 hours (remove VersionDiff, keep VersionHistoryPanel)

---

## Summary Table

| Risk | Primary | Fallback | Timeline Impact | Recovery |
|------|---------|----------|----------------|----------|
| KaTeX bundle | Lazy KaTeX | MathJax 3 | 0 days | 2 hours |
| force-graph perf | force-graph | vis-network | 1 day | 4 hours |
| TipTap fails | TipTap | CodeMirror 6 | 2-3 days | 8 hours |
| Giscus limits | Custom D1 | Giscus page-level | 0 days | 2 hours |
| CF Access complexity | CF Access | Simple auth | 1 day | 4 hours |
| Plugin security | Sandbox | Restricted API | 0 days | 2 hours |
| Diff performance | fast-diff | Snapshot-only | 0 days | 2 hours |

**Maximum Delay (all fallbacks triggered):** 6-7 days
**Likely Delay (1-2 fallbacks):** 1-2 days
**Recommended Buffer:** 2 weeks added to 16-week schedule
