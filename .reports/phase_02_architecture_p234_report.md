# Phase 2 Architecture Report: P2-P4 Components

**Document ID:** RPT-PHASE-02-P234
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**Phase:** 2 — Architectural Specification
**Scope:** P2 (Social Layer), P3 (Editor), P4 (Extensibility)

---

## Executive Summary

This report documents the completion of Phase 2 Architectural Specification for the P2-P4 components of the Wikisites project. Three Blue Papers following IEEE 1016-2024 structure have been produced, along with three interface contract TOML files and updates to the Blue Paper registry.

## Deliverables

### Blue Papers Produced

| Document ID | Title | Sections | Interfaces | Yellow Paper Refs |
|-------------|-------|----------|------------|-------------------|
| BP-SOCIAL-LAYER-001 | Social Layer | BP-1 through BP-12 | IF-COMMENT-001, IF-ANNOT-001, IF-USER-001 | YP-SOCIAL-COMMENTS-001, YP-SOCIAL-ANNOTATIONS-001, YP-SOCIAL-ACCOUNTS-001 |
| BP-EDITOR-001 | Editor Component | BP-1 through BP-12 | IF-EDITOR-001, IF-DIFF-001 | YP-EDITOR-MDX-001, YP-EDITOR-VERSION-HISTORY-001 |
| BP-EXTENSIBILITY-001 | Extensibility Layer | BP-1 through BP-12 | IF-PLUGIN-001, IF-THEME-001, IF-SETTINGS-001 | YP-EXT-PLUGIN-API-001, YP-EXT-THEMES-001, YP-EXT-SETTINGS-001 |

### Interface Contract Files

| File | Source Paper | Interfaces Defined |
|------|-------------|-------------------|
| `interface_contracts/interface_contracts_social.toml` | BP-SOCIAL-LAYER-001 | 28 (comments, annotations, accounts, RBAC, errors) |
| `interface_contracts/interface_contracts_editor.toml` | BP-EDITOR-001 | 30 (editor, diff, version history, errors) |
| `interface_contracts/interface_contracts_extensibility.toml` | BP-EXTENSIBILITY-001 | 33 (plugins, themes, settings, errors) |

### Registry Update

`blue_paper_registry.toml` updated from 2 to 5 Blue Papers, with 48 requirements, 15 components, 14 interfaces, 11 Yellow Paper references, and 11 ADRs across all P0–P4.

## Architecture Decisions Summary

### P2: Social Layer

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-SL-001 | Giscus for encp, custom D1 for wiki | Formal reference → Giscus (minimal setup); collaborative wiki → custom (wiki-native auth, inline editing) |
| ADR-SL-002 | W3C Web Annotation Data Model | Standard interoperability, tooling ecosystem (Hypothesis), future-proof |
| ADR-SL-003 | JWT sessions via Durable Objects | Strong consistency required for auth, natural session affinity |

### P3: Editor

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-ED-001 | TipTap over CodeMirror/Monaco | WYSIWYG native, excellent extension ecosystem, solid SolidJS integration via vanilla adapter |
| ADR-ED-002 | Yjs CRDT over Operational Transforms | Offline-capable, edge-friendly (no central server), natural branching |
| ADR-ED-003 | Git via Forgejo for version storage | Native diff/branch/merge, full audit trail, D1 cache for fast reads |

### P4: Extensibility

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-EX-001 | Web Worker sandbox over iframe | No DOM access (prevents UI attacks), lighter weight, cleaner postMessage protocol |
| ADR-EX-002 | CSS custom properties over CSS-in-JS | Zero runtime overhead, SSR-native, aligns with Tailwind CSS 4.x |
| ADR-EX-003 | JSON Schema portable + Zod runtime | Dual validation: JSON Schema for import/export portability, Zod for TS types + runtime |

## D1 Schema Summary

### Social Layer
- `comments` — Page-level threaded discussions (Giscus or custom D1)
- `comment_reactions` — Emoji reactions per comment
- `annotations` — W3C Web Annotation data model with XPath selectors
- `annotation_shared_with` — Shared annotation access control
- `annotation_replies` — Reply threads on annotations
- `users` — User profiles, roles, preferences, GDPR consent

### Editor
- `version_cache` — Git version metadata cache for fast reads
- `diff_cache` — Computed diff cache to avoid recomputation

### Extensibility
- `installed_plugins` — Per-user installed plugins with settings
- `user_settings` — User preferences with sync token
- `settings_history` — Settings version history for rollback

## Resource Projections

| Resource | Social Layer | Editor | Extensibility |
|----------|-------------|--------|---------------|
| D1 rows (10k users) | ~70,000 | ~5,000 | ~15,000 |
| D1 reads/day | ~15,000 | ~5,000 | ~3,000 |
| D1 writes/day | ~1,500 | ~500 | ~1,000 |
| KV reads/day | ~7,000 | N/A | N/A |
| DO instances | ~100 (sessions) | ~50 (collaboration) | N/A |
| R2 objects | N/A | N/A | ~200 (plugin/theme bundles) |
| Latency (p95) | <100ms | <50ms (CRDT) | <100ms |

## Formal Verification Properties

| Property | Paper | Count | Status |
|----------|-------|-------|--------|
| FV-SOCIAL-* | BP-SOCIAL-LAYER-001 | 8 | Pending |
| FV-EDITOR-* | BP-EDITOR-001 | 8 | Pending |
| FV-EXT-* | BP-EXTENSIBILITY-001 | 8 | Pending |
| **Total** | | **24** | **All Pending** |

## GDPR Compliance

- **Data Export**: `gdpr/export` endpoint returns all user data (comments, annotations, profile, installed plugins)
- **Right to Deletion**: `gdpr/delete` soft-deletes account, removes PII, preserves anonymized content
- **Consent Management**: Granular consent fields (analytics, marketing) with timestamp tracking
- **Private Annotations**: Enforced at API level — private annotations never returned in public responses

## Quality Checklist Status

### BP-SOCIAL-LAYER-001
- [x] All 3 sub-components documented (CommentsSystem, AnnotationLayer, UserAccounts)
- [x] Giscus + custom D1 hybrid architecture specified
- [x] W3C Web Annotation data model conformance
- [x] OAuth + passkey + JWT session lifecycle
- [x] RBAC hierarchy with 4 roles and 16 permissions
- [x] D1 schema for annotations, comments, users
- [x] GDPR compliance (export, deletion, consent)
- [x] Interface contracts for IF-COMMENT-001, IF-ANNOT-001, IF-USER-001

### BP-EDITOR-001
- [x] TipTap + SolidJS integration architecture
- [x] Yjs CRDT for conflict-free collaborative editing
- [x] MDX-specific extensions (JSX, math, mermaid, callout, frontmatter)
- [x] Diff rendering (side-by-side, inline) with Myers/patience algorithms
- [x] Git-backed version storage via Forgejo
- [x] Branch/merge workflow with conflict detection
- [x] Per-line attribution tracking across merges
- [x] Interface contracts for IF-EDITOR-001, IF-DIFF-001

### BP-EXTENSIBILITY-001
- [x] Web Worker sandbox for plugin execution
- [x] Capability-based permissions (16 capabilities, 9 hooks)
- [x] CSS custom properties theme system (34 tokens)
- [x] Theme inheritance cascade (base → user → plugin)
- [x] Dark/light mode with system preference detection
- [x] Theme marketplace data model
- [x] JSON Schema + Zod dual validation
- [x] Import/export with conflict resolution (merge, overwrite, prompt)
- [x] Version migration system
- [x] Interface contracts for IF-PLUGIN-001, IF-THEME-001, IF-SETTINGS-001

## File Inventory

```
.specs/02_architecture/
├── BP-SOCIAL-LAYER-001.md          (NEW — 470 lines)
├── BP-EDITOR-001.md                (NEW — 440 lines)
├── BP-EXTENSIBILITY-001.md         (NEW — 460 lines)
├── blue_paper_registry.toml        (UPDATED — 5 papers, 48 requirements)
└── interface_contracts/
    ├── interface_contracts_social.toml          (NEW — 28 interfaces)
    ├── interface_contracts_editor.toml          (NEW — 30 interfaces)
    └── interface_contracts_extensibility.toml   (NEW — 33 interfaces)

.reports/
└── phase_02_architecture_p234_report.md  (THIS FILE)
```

## Next Steps

1. **Phase 3 (Security)**: Threat modeling for plugin sandbox, OAuth flow security audit, GDPR implementation review
2. **Phase 4 (Performance)**: Benchmark D1 query latency, CRDT merge performance, theme switching overhead
3. **Implementation**: Begin with `packages/shared/src/social/` (types and schemas), then `packages/workers/src/routes/social/` (API endpoints)
4. **Testing**: Execute 236 test vectors from `test_vectors/test_vectors_social_editor_ext.toml`

---

**End of Report**
**Document Status:** DRAFT — Pending review
**Owner:** Wikisites Architecture Team
