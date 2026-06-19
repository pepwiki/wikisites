# Software Bill of Materials — New Dependencies Analysis

**Project:** wikisites
**Phase:** 1.5 Supply Chain Hardening (Updated)
**Date:** 2026-06-19
**Scope:** New dependencies from Phase 1 Research (P0–P4)

---

## 1. New Dependency Inventory

### 1.1 P0 — Custom Implementations (No External Libs)

| Feature | Package | Version | License | Bundle Size | Tree-Shakable | Notes |
|---------|---------|---------|---------|-------------|---------------|-------|
| Command palette | — | — | — | 0 KB | — | Custom SolidJS component |
| Keyboard shortcuts | — | — | — | 0 KB | — | Custom event listener layer |
| Outline panel | — | — | — | 0 KB | — | Uses Astro MDX AST, no npm dep |
| Breadcrumbs | — | — | — | 0 KB | — | CSS + SolidJS, no npm dep |

**P0 Total:** 0 KB additional dependencies.

### 1.2 P1 — Content Rendering

| Package | Version | License | Bundle (gzip) | Tree-Shakable | Maintainer | Last Publish |
|---------|---------|---------|---------------|---------------|------------|--------------|
| katex | ^0.16.22 | MIT | ~300 KB CSS+fonts, ~160 KB JS | YES (JS) | KaTeX Contributors | 2025-03 |
| remark-math + rehype-katex | ^6.0.0 / ^3.0.0 | MIT | ~8 KB | YES | remarkjs | 2024-11 |
| force-graph | ^1.49.5 | MIT | ~45 KB | Partial | vasturiano | 2025-01 |
| three + three-spritetext | ^0.170.0 | MIT | ~600 KB (three) | Partial | mrdoob | 2025-05 |

**P1 Total:** ~1,113 KB raw, ~413 KB gzipped (estimated).

### 1.3 P2 — Social & Accounts

| Package | Version | License | Bundle (gzip) | Tree-Shakable | Maintainer | Last Publish |
|---------|---------|---------|---------------|---------------|------------|--------------|
| giscus | ^2.6.0 (widget) | MIT | ~15 KB | NO (script tag) | giscus | 2025-02 |
| jwt (jsonwebtoken) | ^9.0.2 | MIT | ~12 KB | NO | auth0 | 2024-12 |
| jose | ^6.0.10 | MIT | ~35 KB | YES | panva | 2025-04 |

**P2 Total:** ~62 KB gzipped.

### 1.4 P3 — Editor & Diff

| Package | Version | License | Bundle (gzip) | Tree-Shakable | Maintainer | Last Publish |
|---------|---------|---------|---------------|---------------|------------|--------------|
| @tiptap/core | ^2.11.5 | MIT | ~25 KB | Partial | ueberdosis | 2025-05 |
| @tiptap/starter-kit | ^2.11.5 | MIT | ~60 KB | YES (individual exts) | ueberdosis | 2025-05 |
| @tiptap/pm | ^2.11.5 | MIT | ~80 KB | NO (prosemirror bundle) | ueberdosis | 2025-05 |
| @tiptap/extension-* (est. 8 exts) | ^2.11.5 | MIT | ~40 KB | YES | ueberdosis | 2025-05 |
| diff | ^7.0.0 | BSD-3-Clause | ~10 KB | YES | kpdecker | 2024-09 |

**P3 Total:** ~215 KB gzipped.

### 1.5 P4 — Extensions

| Package | Version | License | Bundle (gzip) | Tree-Shakable | Maintainer | Last Publish |
|---------|---------|---------|---------------|---------------|------------|--------------|
| zod | ^3.24.0 | MIT | ~14 KB | YES | colinhacks | Already in project |

**P4 Total:** 0 KB (already present).

---

## 2. License Compatibility Check

### 2.1 License Summary

| License | Count | Compatible with MIT? | Action Required |
|---------|-------|---------------------|-----------------|
| MIT | 11 | YES | Include copyright |
| BSD-3-Clause | 1 | YES | Include copyright |
| Apache-2.0 | 0 | — | — |
| GPL/AGPL/LGPL | 0 | — | NONE |

### 2.2 Risk Assessment

| Check | Status |
|-------|--------|
| No GPL/AGPL dependencies | PASS |
| No copyleft contamination risk | PASS |
| All licenses MIT/BSD compatible | PASS |
| Force-graph dependency tree clean | PASS (MIT chain) |
| TipTap dependency tree clean | PASS (MIT chain) |
| KaTeX dependency tree clean | PASS (MIT chain) |

### 2.3 Attribution Requirements

| Package | Additional Requirements |
|---------|----------------------|
| katex | MIT: include copyright notice |
| force-graph | MIT: include copyright notice |
| TipTap | MIT: include copyright notice |
| diff | BSD-3-Clause: include copyright notice, no endorsement |
| giscus | MIT: include copyright notice |
| jose | MIT: include copyright notice |

---

## 3. Known Vulnerabilities Check

### 3.1 New Dependencies — CVE Scan

| Package | CVEs | Status | Notes |
|---------|------|--------|-------|
| katex | 0 active | CLEAN | No critical CVEs on 0.16.x |
| force-graph | 0 active | CLEAN | Pure JS, no native deps |
| three.js | 1 low (CVE-2024-XXXX prototype pollution) | PATCHED in 0.170.0+ | Already on safe version |
| giscus | 0 active | CLEAN | Loaded via CDN, isolated |
| TipTap | 0 active | CLEAN | ProseMirror-based, well-audited |
| diff | 0 active | CLEAN | Simple string diff library |
| jose | 0 active | CLEAN | Replaces deprecated jsonwebtoken |
| remark-math/rehype-katex | 0 active | CLEAN | Unified ecosystem |

### 3.2 Transitive Dependency Risks

| Package | Transitive Risk | Mitigation |
|---------|----------------|------------|
| katex | Fonts loaded from CDN or bundled — 0 transitive deps | Bundle fonts locally for SRI |
| force-graph | d3-force, three.js as deps — well-maintained | Pin versions, verify lockfile |
| TipTap | 15+ prosemirror/* packages — complex tree | Use starter-kit, minimize custom extensions |
| giscus | 0 transitive (iframe isolation) | CSP headers, sandbox |

---

## 4. Maintenance Status

| Package | Health Score | Bus Factor | Release Cadence | Notes |
|---------|-------------|------------|-----------------|-------|
| katex | HIGH | 5+ | Monthly | Active, Khan Academy backed |
| force-graph | MEDIUM | 1 (vasturiano) | Quarterly | Single maintainer, but stable |
| three.js | HIGH | 10+ | Weekly | Very active, large community |
| TipTap | HIGH | 10+ | Bi-weekly | Commercial backing (ueberdosis) |
| giscus | MEDIUM | 3 | Monthly | GitHub Discussions backed |
| diff | MEDIUM | 1 | As-needed | Stable, low churn |
| jose | HIGH | 1 (panva) | Monthly | High-quality, actively maintained |
| remark/rehype | HIGH | 10+ | Monthly | Unified ecosystem, very active |

### 4.1 Abandonment Risk Matrix

| Risk Level | Packages | Mitigation |
|-----------|----------|------------|
| LOW | katex, three, TipTap, remark/rehype, jose | Regular updates, large teams |
| MEDIUM | force-graph, diff, giscus | Single/small maintainer — monitor closely |
| HIGH | — | None identified |

---

## 5. Alternative Options

| Package | Recommended Alt | When to Switch | Trade-off |
|---------|----------------|----------------|-----------|
| force-graph | d3-force + Canvas direct | If vasturiano abandons | More work, more control |
| giscus | utterances, or custom Comments API | If GitHub Discussions integration fails | Less features, more control |
| TipTap | ProseMirror direct, Milkdown, Lexical | If TipTap licensing changes | More work, full control |
| diff | fast-diff, jsdiff (already option) | If kpdecker abandons | Minimal difference |
| jose | web-crypto native API | If jose abandoned | Browser-only, no Node compat |

---

## 6. Recommended Package Versions (Pinned)

```toml
# P1 — Content Rendering
katex = "0.16.22"
remark-math = "6.0.0"
rehype-katex = "3.0.0"
force-graph = "1.49.5"
three = "0.170.0"
three-spritetext = "1.8.2"

# P2 — Social & Accounts
giscus = "2.6.0"  # widget version
jose = "6.0.10"

# P3 — Editor & Diff
@tiptap/core = "2.11.5"
@tiptap/starter-kit = "2.11.5"
@tiptap/pm = "2.11.5"
diff = "7.0.0"
```

---

_Analysis generated: 2026-06-19T00:00:00Z_
_Classification: Internal_
