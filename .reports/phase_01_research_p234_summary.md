# Phase 1 Research Summary — P2-P4 Features

**Report ID:** RPT-PHASE01-P234-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** COMPLETE

---

## Executive Summary

Phase 1 Epistemological Discovery for P2-P4 features is complete. Eight Yellow Papers, one test vector set, and one domain constraint set have been produced covering the Social Layer (P2), Editor (P3), and Extensibility (P4) feature sets for the Wikisites monorepo.

**Key Decisions:**

| Area | Recommendation | Rationale |
|------|---------------|-----------|
| Comments | Giscus (Phase 1), Custom D1/KV (Phase 2) | Zero-backend first, upgrade path |
| Annotations | Custom D1/W3C Web Annotation | Standards-compliant, Astro-compatible |
| User Accounts | OAuth (GitHub/Google) + JWT | Leverages existing Cloudflare stack |
| MDX Editor | TipTap + CodeMirror 6 fallback | WYSIWYG with SolidJS, lightweight fallback |
| Version History | Yjs CRDT + Forgejo git backend | Offline-first, git-backed persistence |
| Plugin API | Web Worker sandbox + capability security | Isolated execution, granular permissions |
| Themes | CSS custom properties + existing theme.ts | Extends existing dark/light implementation |
| Settings | JSON Schema + Zod + localStorage/D1 sync | Validates on export, cross-device sync |

---

## Files Produced

### Yellow Papers (8)

| File | ID | Feature |
|------|-----|---------|
| `.specs/01_research/YP-SOCIAL-COMMENTS-001.md` | YP-SOCIAL-COMMENTS-001 | Comments System |
| `.specs/01_research/YP-SOCIAL-ANNOTATIONS-001.md` | YP-SOCIAL-ANNOTATIONS-001 | Annotation Layer |
| `.specs/01_research/YP-SOCIAL-ACCOUNTS-001.md` | YP-SOCIAL-ACCOUNTS-001 | User Accounts |
| `.specs/01_research/YP-EDITOR-MDX-001.md` | YP-EDITOR-MDX-001 | MDX Editor |
| `.specs/01_research/YP-EDITOR-VERSION-HISTORY-001.md` | YP-EDITOR-VERSION-HISTORY-001 | Version History |
| `.specs/01_research/YP-EXT-PLUGIN-API-001.md` | YP-EXT-PLUGIN-API-001 | Plugin API |
| `.specs/01_research/YP-EXT-THEMES-001.md` | YP-EXT-THEMES-001 | Custom Themes |
| `.specs/01_research/YP-EXT-SETTINGS-001.md` | YP-EXT-SETTINGS-001 | Settings Export/Import |

### Registry & Configuration (3)

| File | Description |
|------|-------------|
| `.specs/01_research/yellow_paper_registry_p234.toml` | TOML registry of P2-P4 Yellow Papers |
| `.specs/01_research/test_vectors/test_vectors_social_editor_ext.toml` | Test vectors for all P2-P4 features |
| `.specs/01_research/domain_constraints/domain_constraints_social.toml` | Domain constraints for all P2-P4 features |

---

## Research Sources Consulted

| Source | URL | Topic |
|--------|-----|-------|
| Giscus | https://giscus.app | Comments system |
| CodeMirror 6 | https://codemirror.net | Editor engine |
| Monaco Editor | https://microsoft.github.io/monaco-editor | Editor engine |
| ProseMirror | https://prosemirror.net | Editor engine |
| TipTap | https://tiptap.dev | Editor framework |
| MDN CSS Custom Properties | https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties | Theme system |
| OAuth.net | https://oauth.net | Authentication |
| JWT.io | https://jwt.io | Session management |
| Cloudflare D1 | https://developers.cloudflare.com/d1/ | Database |
| Cloudflare KV | https://developers.cloudflare.com/kv/ | Key-value store |
| Cloudflare Durable Objects | https://developers.cloudflare.com/durable-objects/ | Session management |
| SolidJS | https://www.solidjs.com | UI framework |
| Astro | https://docs.astro.build | Site framework |
| WCAG 2.1 | https://www.w3.org/TR/WCAG21/ | Accessibility |
| W3C Web Annotation | https://www.w3.org/TR/annotation-model/ | Annotation standard |

---

## Key Architecture Decisions

### P2: Social Layer

1. **Giscus First, Custom Later**: Start with Giscus for zero-backend comments. Migrate to custom D1/KV system when moderation needs exceed GitHub Discussions capabilities.

2. **W3C Web Annotation Standard**: Annotation layer follows W3C Web Annotation Data Model for interoperability. Text anchoring uses quote-based selectors with XPath/text-position fallback.

3. **OAuth + JWT + Durable Objects**: Authentication via GitHub/Google OAuth. Sessions managed with JWT tokens stored in Durable Objects for strongly-consistent edge compute.

4. **RBAC with 4 Roles**: Reader (default), Contributor, Moderator, Admin. Permission matrix defined with granular capabilities.

### P3: Editor

5. **TipTap as Primary Editor**: Best WYSIWYG experience with SolidJS compatibility. ProseMirror-based, extensible via plugins. CodeMirror 6 as lightweight fallback for quick edits.

6. **Yjs CRDT for Collaboration**: Conflict-free collaborative editing via Yjs + Hocuspocus. Durable Objects as coordination server. Offline-first with automatic sync.

7. **Hybrid Preview Rendering**: Client-side preview (300ms debounce) for instant feedback, server-side preview (5s timeout) for accuracy. User can force server preview on demand.

### P4: Extensibility

8. **Web Worker Sandboxing**: Plugins execute in isolated Web Workers. No direct DOM access. All interaction via message-passing API. Capability-based permissions.

9. **CSS Custom Properties Theme System**: Extends existing `theme.ts` with design token architecture. Four-level inheritance: base > site > user > plugin. Dark/light mode already implemented.

10. **JSON Schema Settings with Zod**: Settings validated via Zod on export/import. Schema versioning with migration support. localStorage primary, D1 sync secondary.

---

## Dependency Graph

```
Phase 1 (Complete)
├── YP-WEB-TECH-001 (Web Technology Stack)
│
Phase 2 (Social Layer)
├── YP-SOCIAL-COMMENTS-001 ──────┐
├── YP-SOCIAL-ANNOTATIONS-001 ───┤── All depend on
├── YP-SOCIAL-ACCOUNTS-001 ──────┘   YP-WEB-TECH-001
│
Phase 3 (Editor)
├── YP-EDITOR-MDX-001 ──────────┐── Depends on
├── YP-EDITOR-VERSION-HISTORY-001┘   YP-WEB-TECH-001
│
Phase 4 (Extensibility)
├── YP-EXT-PLUGIN-API-001 ──────┐
├── YP-EXT-THEMES-001 ──────────┤── All depend on
├── YP-EXT-SETTINGS-001 ────────┘   YP-WEB-TECH-001
```

---

## Test Vectors Summary

| Category | Vectors | Coverage |
|----------|---------|----------|
| Comment Threading | 2 | Thread building, sorting |
| Spam Detection | 1 | URL-based spam scoring |
| Annotation Anchoring | 2 | Text position, fuzzy quote |
| JWT Validation | 1 | Token verification |
| RBAC Permissions | 1 | Role enforcement |
| MDX Compilation | 2 | Frontmatter validation |
| Diff Algorithms | 1 | Myers single-line diff |
| Plugin Lifecycle | 2 | Install, permission denial |
| Theme Tokens | 1 | Inheritance resolution |
| Settings Schema | 2 | Validation, merge conflicts |
| **Total** | **15** | |

---

## Domain Constraints Summary

| Category | Constraints | Key Limits |
|----------|-------------|------------|
| Comments | 5 sections | 10K chars, 3 nesting, 10/hr user |
| Annotations | 5 sections | 5K chars, 100/page, 300ms load |
| Accounts | 5 sections | 24h JWT, 3 admins, GDPR compliant |
| Editor | 5 sections | 100KB docs, 2s load, 300ms preview |
| Version History | 3 sections | 500 versions, 500ms diff |
| Plugins | 4 sections | 20 plugins, 500KB, 100ms load |
| Themes | 3 sections | 2KB critical, 50ms switch |
| Settings | 3 sections | 10KB max, 30s sync |
| **Total** | **33 sections** | |

---

## Open Questions for Phase 2

1. **Giscus vs Custom Timeline**: When to migrate from Giscus to custom comments system?
2. **Editor Bundle Budget**: Can TipTap fit within 100KB gzipped budget?
3. **Real-time Collaboration Cost**: Durable Objects pricing for collaborative editing?
4. **Plugin Review Process**: How to vet community plugins for security?
5. **Theme Preview**: How to preview themes before installation?
6. **Settings Sync Conflict**: Last-write-wins vs manual conflict resolution?

---

## Next Steps

1. **Phase 2 Implementation**: Begin with comments system (Giscus integration)
2. **Editor Prototype**: Build TipTap prototype with MDX support
3. **Theme System Extension**: Extend existing `theme.ts` with design tokens
4. **Settings Foundation**: Implement JSON schema and Zod validation
5. **Plugin SDK**: Design and implement plugin development kit
6. **Version History**: Set up Yjs + Hocuspocus infrastructure

---

*Report generated by DeepThought (Researcher) for Wikisites Project*
