---
document_id: BP-SITE-WIKI-001
title: "Wikipept.com Site Architecture"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - WIKI
abstract: >-
  IEEE 1016 compliant architectural specification for wikipept.com — the
  collaborative wiki-style oligopeptide educational platform. Covers wiki
  editing system architecture, quiz and flashcard engine design, user
  contribution workflow, community moderation system, spaced repetition
  scheduler integration, progress tracking subsystem, and hybrid
  static/dynamic deployment model on Cloudflare.
yellow_paper_refs:
  - "YP-CHEM-OLIGO-001"
  - "YP-BIO-OLIGO-001"
  - "YP-EDU-CONTENT-001"
  - "YP-WEB-TECH-001"
---

# Blue Paper: Wikipept.com Site Architecture

**Document ID:** BP-SITE-WIKI-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [BP-1: Design Overview](#bp-1-design-overview)
2. [BP-2: Design Decomposition](#bp-2-design-decomposition)
3. [BP-3: Design Rationale](#bp-3-design-rationale)
4. [BP-4: Traceability](#bp-4-traceability)
5. [BP-5: Interface Design](#bp-5-interface-design)
6. [BP-6: Data Design](#bp-6-data-design)
7. [BP-7: Component Design](#bp-7-component-design)
8. [BP-8: Deployment Design](#bp-8-deployment-design)
9. [BP-9: Formal Verification](#bp-9-formal-verification)
10. [BP-10: HAL Specification](#bp-10-hal-specification)
11. [BP-11: Compliance Matrix](#bp-11-compliance-matrix)
12. [BP-12: Quality Checklist](#bp-12-quality-checklist)

---

## BP-1: Design Overview

### 1.1 System Purpose

Wikipept.com serves as the collaborative, community-driven educational platform for oligopeptide learning. Unlike the static encyclopedic reference of encyclopeptide.com, wikipept.com enables wiki-style collaborative content editing, interactive assessment (quizzes, flashcards), spaced repetition learning (FSRS), progress tracking, and community moderation. The system is designed to transform passive reading into active learning through evidence-based pedagogical tools.

### 1.2 System Scope

The system encompasses:

1. **Wiki Editing System**: Block-based or Markdown editor with version history, visual diff, conflict resolution, and moderation queue
2. **Quiz Engine**: Multiple choice, fill-in-the-blank, matching, and true/false question types with immediate feedback and mastery tracking
3. **Flashcard System**: FSRS v4.5 spaced repetition scheduler with daily review queues, deck import/export (Anki, Quizlet)
4. **Progress Tracking**: Per-user learning metrics, knowledge map visualization, mastery-based content gating
5. **Community Features**: Annotations, contribution leaderboard, reputation system, moderation workflow
6. **Content Rendering**: MDX with interactive SolidJS components, KaTeX math, Shiki syntax highlighting

### 1.3 Stakeholders

| Stakeholder | Role | Primary Concern |
|-------------|------|-----------------|
| Students | Learners | Effective study tools, progress visibility, accessible content |
| Wiki Editors | Content contributors | Easy editing, attribution, reputation |
| Expert Reviewers | Quality validators | Moderation tools, content accuracy, editorial workflow |
| Community Moderators | Trust & safety | Vandalism prevention, dispute resolution |
| Content Authors | Curriculum designers | Assessment design, learning path management |
| Developers | Platform maintainability | Clean architecture, testability, scalability |

### 1.4 Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      WIKIPEPT.COM SYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Static Pages  │    │  Dynamic     │    │  Cloudflare  │      │
│  │ (Astro SSG)  │    │  Islands     │    │  Workers+DO  │      │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Shared Components Library              │   │
│  │  (Data Models, Search, i18n, Analytics)                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Wiki Editor  │    │ Quiz/Flash   │    │  FSRS        │      │
│  │ System       │    │ Card Engine  │    │  Scheduler   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Durable     │    │  D1          │    │  KV          │      │
│  │  Objects     │    │  (SQLite)    │    │  (Cache)     │      │
│  │  (Collab)    │    │              │    │              │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Content    │    │   Learners   │    │   Wiki       │
│   Authors    │    │   (Browser)  │    │   Editors    │
│   (Git)      │    │              │    │   (Browser)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
wikipept.com
├── Presentation Layer
│   ├── Layout Components
│   │   ├── Header (logo, navigation, user menu, progress sidebar toggle)
│   │   ├── Top Navigation (dropdown menus)
│   │   ├── Progress Sidebar (right, collapsible)
│   │   ├── Breadcrumbs
│   │   ├── Table of Contents (auto-generated)
│   │   └── Footer
│   ├── Page Components
│   │   ├── HomePage (featured content, learning streak, daily review queue)
│   │   ├── StudyGuidePage (wiki-style content with annotations)
│   │   ├── QuizPage (quiz interface with timer and scoring)
│   │   ├── FlashcardPage (spaced repetition review session)
│   │   ├── ProgressPage (learning metrics, knowledge map)
│   │   ├── SearchResultsPage (faceted search)
│   │   ├── ContributionPage (leaderboard, reputation)
│   │   ├── UserDashboardPage (personal progress, decks, settings)
│   │   └── ModerationPage (edit queue, flagging, disputes)
│   └── Interactive Islands (SolidJS)
│       ├── WikiEditor (block-based or Markdown)
│       ├── VisualDiffViewer (added/removed/modified highlights)
│       ├── QuizEngine (MCQ, fill-blank, matching, true/false)
│       ├── FlashcardReviewer (FSRS-rated, flip animation)
│       ├── KnowledgeMapVisualizer (D3 force-directed graph)
│       ├── AnnotationSystem (inline collapsible notes)
│       ├── ProgressDashboard (charts, streaks, mastery levels)
│       ├── SearchInterface (autocomplete, faceted)
│       ├── DarkModeToggle
│       ├── ReputationBadge (user contribution levels)
│       └── ModerationTools (approve/reject/edit queue)
├── Content Layer
│   ├── Content Collections
│   │   ├── study-guides/ (MDX wiki pages)
│   │   ├── quiz-questions/ (structured quiz data)
│   │   ├── flashcard-decks/ (structured flashcard data)
│   │   ├── concepts/ (knowledge graph nodes)
│   │   ├── annotations/ (community annotations)
│   │   └── templates/ (page templates)
│   ├── Zod Schemas
│   │   ├── studyGuideSchema
│   │   ├── quizQuestionSchema
│   │   ├── flashcardDeckSchema
│   │   └── conceptSchema
│   └── i18n Translations
│       ├── en/, es/, fr/, de/, zh/, ja/
├── Service Layer
│   ├── WikiService (CRUD, version history, conflict resolution)
│   ├── QuizService (scoring, mastery tracking, IRT calibration)
│   ├── FlashcardService (FSRS scheduling, deck management)
│   ├── ProgressService (metrics, knowledge map, streaks)
│   ├── ModerationService (queue, reputation, flagging)
│   ├── SearchService (Pagefind + FlexSearch)
│   ├── AnnotationService (CRUD, attribution)
│   ├── ReputationService (scoring, decay, badges)
│   ├── AuthService (OAuth, sessions, RBAC)
│   └── AnalyticsService (learning analytics, engagement)
├── Data Layer
│   ├── Cloudflare D1 (user accounts, wiki content, quiz data, progress)
│   ├── Cloudflare KV (session cache, search index, feature flags)
│   ├── Cloudflare R2 (uploaded images, imported decks)
│   ├── Cloudflare Durable Objects (wiki collaboration, real-time editing)
│   └── Git Repository (source of truth for static content)
└── Infrastructure Layer
    ├── Cloudflare Pages (static hosting)
    ├── Cloudflare Workers (dynamic routes, API)
    ├── Cloudflare Durable Objects (collaborative editing)
    └── Cloudflare CDN (global edge)
```

### 2.2 Component Descriptions

| Component | Type | Responsibility | Dependencies |
|-----------|------|----------------|--------------|
| WikiEditor | SolidJS Island | Block-based or Markdown content editing with live preview | Durable Objects (collaboration) |
| VisualDiffViewer | SolidJS Island | Highlight added/removed/modified content between revisions | WikiService |
| QuizEngine | SolidJS Island | Present questions, collect answers, score, provide feedback | QuizService, ProgressService |
| FlashcardReviewer | SolidJS Island | Display cards, collect ratings, schedule next review via FSRS | FlashcardService, FSRS |
| KnowledgeMapVisualizer | SolidJS Island | Render D3 force-directed graph of concept mastery | ProgressService, D3.js |
| AnnotationSystem | SolidJS Island | Add/collapse inline annotations on study guide paragraphs | AnnotationService |
| ProgressDashboard | SolidJS Island | Display learning metrics, charts, streaks, mastery | ProgressService |
| ModerationTools | SolidJS Island | Review pending edits, approve/reject/flag content | ModerationService, WikiService |
| WikiService | Service | CRUD operations, version history, conflict resolution | D1, Durable Objects |
| QuizService | Service | Scoring, mastery tracking, IRT calibration | D1, ProgressService |
| FlashcardService | Service | FSRS scheduling, deck import/export | D1, FSRS |
| ProgressService | Service | Metrics aggregation, knowledge map generation | D1 |
| ModerationService | Service | Queue management, reputation-weighted trust | D1, ReputationService |
| ReputationService | Service | Scoring, inactivity decay, badge assignment | D1 |

---

## BP-3: Design Rationale

### 3.1 Hybrid Static/Dynamic Architecture

| Criterion | Static-Only | Hybrid (SSG+SSR) | Decision |
|-----------|-------------|-------------------|----------|
| Wiki editing | Impossible (read-only) | Durable Objects handle writes | Hybrid — required for wiki |
| User progress | No server-side state | D1 stores progress | Hybrid — required for tracking |
| Build performance | Fastest | Slightly slower (dynamic routes) | Hybrid — feature requirement |
| SEO | Excellent | Excellent (static pages + meta) | Tie |
| Scalability | Excellent | Good (edge compute) | Acceptable trade-off |

**Decision**: Hybrid architecture — static pages for content, dynamic routes for user-specific features (progress, editing, quizzes).

### 3.2 Durable Objects Over WebSockets

| Criterion | Durable Objects | WebSockets | Decision |
|-----------|----------------|------------|----------|
| Consistency | Strongly consistent | Eventual consistency | DO — wiki needs consistency |
| State management | Built-in persistence | Manual persistence | DO — less code |
| Collaboration | Natural leader election | Complex coordination | DO — simpler architecture |
| Scalability | Per-room isolation | Connection limits | DO — better isolation |

**Decision**: Durable Objects for wiki collaboration — provides strongly consistent, stateful collaboration without external infrastructure.

### 3.3 FSRS Over SM-2

| Criterion | FSRS v4.5 | SM-2 (Anki default) | Decision |
|-----------|-----------|---------------------|----------|
| Personalization | 25 user-specific parameters | Fixed parameters | FSRS — better retention |
| Retention prediction | Power-law model | Empirical intervals | FSRS — scientific basis |
| Optimization | Gradient descent on review logs | None | FSRS — continuously improving |
| Performance | >85% at 30 days | ~70% at 30 days | FSRS — superior outcomes |
| Compatibility | Anki 23.10+ compatible | Universal | FSRS — growing adoption |

**Decision**: FSRS v4.5 chosen for superior retention prediction and personalized scheduling per YP-EDU-CONTENT-001.

### 3.4 Community Moderation Over Pre-Publication Review

| Criterion | Moderation Queue | Pre-Publication Review | Decision |
|-----------|-----------------|----------------------|----------|
| Contributor experience | Immediate (for established) | Delayed for all | Moderation Queue — less friction |
| Quality control | Reputation-weighted trust | Expert review only | Moderation Queue — scales better |
| Scalability | Scales with community | Expert bottleneck | Moderation Queue — community-driven |
| Vandalism resistance | Good (reputation gates) | Excellent | Pre-Publication — but overkill |

**Decision**: Reputation-weighted moderation queue — new contributors (reputation <10) enter queue, established contributors (≥10) publish immediately per FR-035.

---

## BP-4: Traceability

### 4.1 Requirements Traceability Matrix

| Requirement ID | Requirement Description | Architecture Component | Verification Method |
|----------------|------------------------|----------------------|-------------------|
| FR-031 | Wiki-style editing interface | WikiEditor, WikiService | Create/edit page test |
| FR-032 | Complete version history | WikiService (D1) | Multi-edit + version history test |
| FR-033 | Visual diff viewer | VisualDiffViewer | Select two revisions, verify highlights |
| FR-034 | Edit conflict resolution | Durable Objects | Sim concurrent edits, verify resolution |
| FR-035 | Content moderation queue | ModerationService, ModerationTools | New user edit → queue; established → immediate |
| FR-036 | Quiz engine (4 question types) | QuizEngine, QuizService | Complete quiz with each type |
| FR-037 | Quiz scoring and results | QuizService, ProgressService | Complete quiz, verify score + summary |
| FR-038 | Mastery tracking per objective | QuizService, ProgressService | Complete quiz, verify mastery indicators |
| FR-039 | Flashcard system | FlashcardReviewer, FlashcardService | Display card, flip, rate |
| FR-040 | FSRS spaced repetition | FlashcardService (FSRS) | Rate 20 cards, verify intervals |
| FR-041 | Daily review queue | FlashcardService | Verify due counts per deck |
| FR-042 | Anki/Quizlet import/export | FlashcardService | Import Anki deck, verify; export, re-import |
| FR-043 | Inline annotations | AnnotationSystem, AnnotationService | Add annotation, verify display |
| FR-044 | Contribution leaderboard | ReputationService | Verify rankings and time filters |
| FR-045 | Reputation scoring with decay | ReputationService | Simulate contributions + inactivity |
| FR-046 | Learning metrics tracking | ProgressService, ProgressDashboard | Complete activities, verify dashboard |
| FR-047 | Knowledge map visualization | KnowledgeMapVisualizer | Partial progress, verify graph |
| FR-048 | Mastery-based content gating | ProgressService, StudyGuidePage | Access advanced without prerequisites → denied |
| NFR-001 | LCP < 2.5s | Astro static generation | Lighthouse CI |
| NFR-007 | WCAG 2.1 AA | Semantic HTML + ARIA + axe-core | Automated a11y testing |
| NFR-013 | Content Security Policy | Cloudflare Workers headers | CSP header audit |

### 4.2 Theory-to-Implementation Mapping

| Yellow Paper | Theory Section | Implementation Component | Mapping |
|--------------|---------------|------------------------|---------|
| YP-EDU-CONTENT-001 | §5.1 FSRS Scheduler | FlashcardService.fsrs() | Direct implementation of FSRS v4.5 |
| YP-EDU-CONTENT-001 | §5.2 Difficulty Estimation | QuizService.estimateDifficulty() | Direct implementation |
| YP-EDU-CONTENT-001 | §5.3 Retention Prediction | FlashcardService.predictRetention() | Direct implementation |
| YP-EDU-CONTENT-001 | §5.4 Content Sequencing | ProgressService.sequenceContent() | DAG topological sort |
| YP-EDU-CONTENT-001 | §5.5 Assessment Item Generation | QuizService.generateItem() | IRT-based item generation |
| YP-CHEM-OLIGO-001 | §5.1 Classification | CalculationService.classifyPeptide() | Shared component |
| YP-CHEM-OLIGO-001 | §5.2 Molecular Weight | CalculationService.calculateMW() | Shared component |
| YP-BIO-OLIGO-001 | §4.2 Receptor Binding | Content display (study guides) | Educational content, not prediction |
| YP-WEB-TECH-001 | §4.1 Astro Islands | All Interactive Islands | Architecture pattern |
| YP-WEB-TECH-001 | §4.3 Cloudflare Edge | Durable Objects, D1, KV, R2 | Infrastructure |

---

## BP-5: Interface Design

### 5.1 External Interfaces

#### 5.1.1 Wiki Editing API Contract

```yaml
openapi: "3.1.0"
info:
  title: "Wikipept Wiki API"
  version: "1.0.0"
paths:
  /api/v1/pages:
    get:
      summary: "List wiki pages"
      parameters:
        - name: category
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: offset
          in: query
          schema:
            type: integer
      responses:
        "200":
          description: "Page list"

  /api/v1/pages/{slug}:
    get:
      summary: "Get page content and metadata"
      responses:
        "200":
          description: "Page content"
        "404":
          description: "Page not found"

  /api/v1/pages/{slug}/revisions:
    get:
      summary: "List page revisions"
      responses:
        "200":
          description: "Revision history"

  /api/v1/pages/{slug}/revisions/{revId}:
    get:
      summary: "Get specific revision"
      responses:
        "200":
          description: "Revision content and diff"

  /api/v1/pages/{slug}/edit:
    post:
      summary: "Submit page edit"
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [content, editSummary]
              properties:
                content:
                  type: string
                editSummary:
                  type: string
                baseRevision:
                  type: string
                  description: "For conflict detection"
      responses:
        "201":
          description: "Edit accepted"
        "409":
          description: "Edit conflict — base revision mismatch"
        "422":
          description: "Validation error"

  /api/v1/pages/{slug}/revert:
    post:
      summary: "Revert to previous revision"
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [targetRevision]
              properties:
                targetRevision:
                  type: string
      responses:
        "200":
          description: "Revert successful"

  /api/v1/pages/{slug}/annotations:
    get:
      summary: "List annotations for page"
    post:
      summary: "Add annotation to page"
      security:
        - bearerAuth: []

  /api/v1/pages/{slug}/flag:
    post:
      summary: "Flag page for review"
      security:
        - bearerAuth: []

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

#### 5.1.2 Quiz API Contract

```yaml
paths:
  /api/v1/quizzes:
    get:
      summary: "List available quizzes"
    post:
      summary: "Create quiz session"
      security:
        - bearerAuth: []

  /api/v1/quizzes/{sessionId}:
    get:
      summary: "Get current question"
      security:
        - bearerAuth: []

  /api/v1/quizzes/{sessionId}/answer:
    post:
      summary: "Submit answer"
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [questionId, answer, responseTime]
              properties:
                questionId:
                  type: string
                answer:
                  oneOf:
                    - type: string
                    - type: integer
                responseTime:
                  type: number
                  description: "Response time in seconds"
      responses:
        "200":
          description: "Answer result with feedback"

  /api/v1/quizzes/{sessionId}/complete:
    post:
      summary: "Complete quiz and get results"
      security:
        - bearerAuth: []
      responses:
        "200":
          description: "Quiz results with mastery indicators"
```

#### 5.1.3 Flashcard API Contract

```yaml
paths:
  /api/v1/flashcards/review:
    get:
      summary: "Get due cards for review"
      security:
        - bearerAuth: []
      parameters:
        - name: deckId
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        "200":
          description: "Due cards with FSRS scheduling data"

  /api/v1/flashcards/rate:
    post:
      summary: "Rate card and schedule next review"
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [cardId, rating]
              properties:
                cardId:
                  type: string
                rating:
                  type: string
                  enum: [again, hard, good, easy]
                responseTime:
                  type: number
      responses:
        "200":
          description: "Updated card with next review date"

  /api/v1/flashcards/decks/import:
    post:
      summary: "Import flashcard deck (Anki/Quizlet)"
      security:
        - bearerAuth: []
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                format:
                  type: string
                  enum: [anki, quizlet]
      responses:
        "201":
          description: "Deck imported"
```

### 5.2 Internal Interfaces

| Interface | Provider | Consumer | Protocol | Description |
|-----------|----------|----------|----------|-------------|
| WikiService.create | WikiService | WikiEditor | Function call | Create new page |
| WikiService.update | WikiService | WikiEditor | Function call | Update existing page |
| WikiService.getRevision | WikiService | VisualDiffViewer | Function call | Get revision for diff |
| WikiService.getDiff | WikiService | VisualDiffViewer | Function call | Compute visual diff |
| QuizService.score | QuizService | QuizEngine | Function call | Score answer, provide feedback |
| QuizService.getMastery | QuizService | ProgressDashboard | Function call | Get mastery per objective |
| FlashcardService.schedule | FlashcardService | FlashcardReviewer | Function call | Schedule next review (FSRS) |
| FlashcardService.getDue | FlashcardService | FlashcardReviewer | Function call | Get cards due for review |
| ProgressService.getMetrics | ProgressService | ProgressDashboard | Function call | Get learning metrics |
| ProgressService.checkPrerequisite | ProgressService | StudyGuidePage | Function call | Check mastery gate |
| ModerationService.queue | ModerationService | ModerationTools | Function call | Queue edit for review |
| ModerationService.approve | ModerationService | ModerationTools | Function call | Approve queued edit |
| ReputationService.score | ReputationService | ModerationService | Function call | Get user reputation |
| AuthService.getUser | AuthService | All authenticated islands | Function call | Get current user session |

---

## BP-6: Data Design

### 6.1 Wiki Content Data Model

```typescript
interface WikiPage {
  id: string;                          // UUID
  slug: string;                        // URL-friendly identifier
  title: string;                       // Page title
  content: string;                     // MDX content body
  html: string;                        // Rendered HTML (cached)
  category: string;                    // Content category
  tags: string[];                      // Taxonomy tags
  authorId: string;                    // Creator user ID
  lastEditorId: string;               // Last editor user ID
  currentRevision: number;            // Current revision number
  createdAt: Date;
  updatedAt: Date;
  lastReviewedAt?: Date;              // Last expert review
  reviewStatus: "pending" | "approved" | "flagged" | "disputed";
  qualityScore: number;               // Community quality score (1–5)
  viewCount: number;
  editCount: number;
}

interface WikiRevision {
  id: string;                          // UUID
  pageId: string;                      // Parent page ID
  revisionNumber: number;
  content: string;                     // MDX content at this revision
  authorId: string;
  editSummary: string;
  createdAt: Date;
  diff?: string;                       // Unified diff from previous
  isRevert: boolean;
  revertOfRevision?: number;
}

interface WikiEdit {
  id: string;                          // UUID
  pageId: string;
  authorId: string;
  status: "pending" | "approved" | "rejected" | "superseded";
  content: string;                     // Proposed content
  editSummary: string;
  baseRevision: number;               // For conflict detection
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerId?: string;
  reviewNotes?: string;
}

interface Annotation {
  id: string;
  pageId: string;
  authorId: string;
  paragraphIndex: number;              // Paragraph to annotate
  content: string;                     // Annotation text
  type: "comment" | "clarification" | "tip" | "correction";
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
}
```

### 6.2 Quiz Data Model

```typescript
interface QuizSession {
  id: string;
  userId: string;
  quizId: string;
  status: "in_progress" | "completed" | "abandoned";
  currentQuestionIndex: number;
  questions: QuizQuestionInstance[];
  answers: QuizAnswer[];
  score?: number;                      // Percentage
  timeStarted: Date;
  timeCompleted?: Date;
  totalTimeSeconds: number;
}

interface QuizQuestionInstance {
  id: string;
  questionId: string;                  // Reference to question bank
  type: "multiple_choice" | "fill_blank" | "matching" | "true_false";
  stem: string;                        // Question text
  options?: string[];                  // For MCQ and matching
  correctAnswer: string | number;
  explanation: string;                 // Post-answer feedback
  concepts: string[];                  // Knowledge graph concept IDs
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  difficulty: number;                  // IRT difficulty parameter
  discrimination: number;              // IRT discrimination parameter
}

interface QuizAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  responseTimeSeconds: number;
  conceptsMastered: string[];
}

interface QuizResult {
  sessionId: string;
  score: number;                       // 0–100 percentage
  totalQuestions: number;
  correctAnswers: number;
  timeTakenSeconds: number;
  masteryIndicators: MasteryIndicator[];
  reviewLinks: ReviewLink[];
}

interface MasteryIndicator {
  conceptId: string;
  conceptName: string;
  masteryLevel: "not_started" | "learning" | "familiar" | "mastered";
  score: number;                       // 0–100
  needsReview: boolean;
}

interface ReviewLink {
  conceptId: string;
  conceptName: string;
  studyGuideUrl: string;
  reason: string;                      // Why this needs review
}
```

### 6.3 Flashcard Data Model

```typescript
interface FlashcardDeck {
  id: string;
  userId: string;
  name: string;
  description: string;
  cardCount: number;
  tags: string[];
  source?: "created" | "imported_anki" | "imported_quizlet";
  createdAt: Date;
  updatedAt: Date;
}

interface Flashcard {
  id: string;
  deckId: string;
  front: string;                       // Term or question
  back: string;                        // Definition or answer
  frontMedia?: MediaReference;
  backMedia?: MediaReference;
  tags: string[];
  createdAt: Date;
}

interface FlashcardReview {
  cardId: string;
  userId: string;
  // FSRS state
  state: "new" | "learning" | "review" | "relearning";
  stability: number;                   // Memory stability in days
  difficulty: number;                  // 1.0–10.0
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: Date;
  nextReview: Date;
  // User rating history
  ratingHistory: Array<{
    rating: "again" | "hard" | "good" | "easy";
    date: Date;
    responseTimeMs: number;
  }>;
}

interface MediaReference {
  type: "image" | "audio";
  url: string;
  alt?: string;
}
```

### 6.4 User Data Model

```typescript
interface User {
  id: string;                          // UUID
  username: string;
  email: string;                       // Hashed
  displayName: string;
  avatarUrl?: string;
  role: "contributor" | "reviewer" | "moderator" | "admin";
  reputation: number;
  joinedAt: Date;
  lastActiveAt: Date;
  settings: UserSettings;
}

interface UserSettings {
  theme: "light" | "dark" | "system";
  locale: string;
  emailNotifications: boolean;
  dailyReviewGoal: number;             // Target cards per day
  showMasteryOnDashboard: boolean;
}

interface UserProgress {
  userId: string;
  topicsStudied: string[];
  quizScores: QuizScoreRecord[];
  flashcardMastery: FlashcardMasterySummary;
  learningStreak: LearningStreak;
  overallMastery: number;              // 0–100 percentage
  totalTimeMinutes: number;
}

interface LearningStreak {
  currentDays: number;
  longestDays: number;
  lastActivityDate: Date;
}

interface QuizScoreRecord {
  quizId: string;
  score: number;
  date: Date;
  conceptsMastered: string[];
}

interface FlashcardMasterySummary {
  totalCards: number;
  newCards: number;
  learningCards: number;
  matureCards: number;                 // Interval > 21 days
  averageStability: number;
}

interface ReputationRecord {
  userId: string;
  score: number;
  history: Array<{
    action: "page_edit" | "suggestion_accepted" | "quiz_created" | "expert_review";
    points: number;
    date: Date;
    decayApplied: boolean;
  }>;
  lastDecayDate: Date;
}
```

---

## BP-7: Component Design

### 7.1 WikiEditor State Machine

```
┌─────────────┐
│   Viewing    │ ← Default state (read-only page view)
└──────┬──────┘
       │ User clicks "Edit"
       ▼
┌─────────────┐
│  Editing     │ ← Block-based or Markdown editor active
└──────┬──────┘
       │ User clicks "Save"
       ▼
┌─────────────┐
│  Confirming  │ ← Edit summary dialog
└──────┬──────┘
       │ Submit
       ▼
┌─────────────┐     ┌─────────────┐
│  Saving      │────>│ Conflict    │ ← baseRevision mismatch
└──────┬──────┘     │ Detected    │
       │             └──────┬──────┘
       │ Success            │
       ▼                    ▼
┌─────────────┐     ┌─────────────┐
│  Published   │     │  Resolving  │ ← Show both versions
└──────┬──────┘     └──────┬──────┘
       │                    │ User resolves
       │                    ▼
       │             ┌─────────────┐
       │             │  Re-editing  │ ← User adjusts content
       │             └──────┬──────┘
       │                    │ Re-submit
       │                    ▼
       │             ┌─────────────┐
       │             │  Saving      │
       │             └──────┬──────┘
       │                    │ Success
       │                    ▼
       │             ┌─────────────┐
       └────────────>│  Published   │
                     └─────────────┘
```

### 7.2 QuizEngine Sequence Diagram

```
User          QuizEngine      QuizService     ProgressService    FSRS
 │                │                │                │               │
 │ start quiz     │                │                │               │
 │───────────────>│                │                │               │
 │                │ createSession()│                │               │
 │                │───────────────>│                │               │
 │                │ session        │                │               │
 │                │<───────────────│                │               │
 │ display q1     │                │                │               │
 │<───────────────│                │                │               │
 │ submit answer  │                │                │               │
 │───────────────>│                │                │               │
 │                │ scoreAnswer()  │                │               │
 │                │───────────────>│                │               │
 │                │ {correct, feedback, concepts}   │               │
 │                │<───────────────│                │               │
 │                │ updateMastery()│                │               │
 │                │───────────────>│───────────────>│               │
 │ show feedback  │                │                │               │
 │<───────────────│                │                │               │
 │ ... next question ...           │                │               │
 │                │                │                │               │
 │ complete quiz  │                │                │               │
 │───────────────>│                │                │               │
 │                │ getResults()   │                │               │
 │                │───────────────>│                │               │
 │                │ {mastery, reviewLinks}          │               │
 │                │<───────────────│                │               │
 │ show results   │                │                │               │
 │<───────────────│                │                │               │
```

### 7.3 FlashcardReviewer Sequence Diagram

```
User          FlashcardReviewer   FlashcardService    FSRS
 │                │                     │                │
 │ load review    │                     │                │
 │───────────────>│                     │                │
 │                │ getDueCards()        │                │
 │                │────────────────────>│                │
 │                │ cards[]              │                │
 │                │<────────────────────│                │
 │ display card   │                     │                │
 │<───────────────│                     │                │
 │ flip card      │                     │                │
 │───────────────>│                     │                │
 │ show answer    │                     │                │
 │<───────────────│                     │                │
 │ rate: "good"   │                     │                │
 │───────────────>│                     │                │
 │                │ scheduleReview()    │                │
 │                │────────────────────>│ calculateInterval()│
 │                │                     │───────────────>│
 │                │                     │ {interval, stability}│
 │                │                     │<───────────────│
 │                │ {nextReview}        │                │
 │                │<────────────────────│                │
 │ show next card │                     │                │
 │<───────────────│                     │                │
```

### 7.4 KnowledgeMapVisualizer Component Design

```typescript
interface KnowledgeMapNode {
  id: string;
  label: string;
  mastery: number;                     // 0–100
  difficulty: number;                  // 1–10
  x: number;                          // D3 force position
  y: number;
  color: string;                       // Based on mastery level
}

interface KnowledgeMapEdge {
  source: string;                      // Prerequisite concept ID
  target: string;                      // Dependent concept ID
  type: "prerequisite" | "related";
}

// Mastery color mapping:
// 0-25:   Red (#EF5350) — Not started / struggling
// 26-50:  Orange (#FFC107) — Learning
// 51-75:  Teal (#26A69A) — Familiar
// 76-100: Green (#66BB6A) — Mastered
```

---

## BP-8: Deployment Design

### 8.1 Cloudflare Pages + Workers + Durable Objects Topology

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Static Pages (SSG)                       │    │
│  │  /en/*, /es/*, /fr/*, /de/*, /zh/*, /ja/*           │    │
│  │  Study guides, concept pages, static content         │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Dynamic Routes (Workers)                 │    │
│  │  /api/v1/*           → wiki-api Worker               │    │
│  │  /api/v1/quizzes/*   → quiz-api Worker               │    │
│  │  /api/v1/flashcards/*→ flashcard-api Worker          │    │
│  │  /api/v1/users/*     → user-api Worker               │    │
│  └──────────────────────┬──────────────────────────────┘    │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Durable Objects                          │    │
│  │  WikiRoom-{pageId} → collaborative editing sessions  │    │
│  │  QuizSession-{id}  → quiz state management           │    │
│  │  ReviewSession-{id}→ flashcard review state          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              D1 Databases                             │    │
│  │  wikipept-users     → user accounts, auth            │    │
│  │  wikipept-content   → wiki pages, revisions          │    │
│  │  wikipept-quiz      → quiz sessions, questions       │    │
│  │  wikipept-flashcards→ card reviews, FSRS state       │    │
│  │  wikipept-progress  → learning metrics, mastery      │    │
│  │  wikipept-reputation→ reputation scores, history     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              KV Namespaces                            │    │
│  │  wikipept-sessions  → user session cache             │    │
│  │  wikipept-search    → search index cache             │    │
│  │  wikipept-features  → feature flags                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              R2 Buckets                               │    │
│  │  wikipept-uploads   → user-uploaded images           │    │
│  │  wikipept-imports   → imported Anki/Quizlet decks    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Custom Domain                            │    │
│  │  wikipept.com → Pages deployment                     │    │
│  │  SSL/TLS: Full (strict)                              │    │
│  │  HSTS: includeSubDomains, preload                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Resource Requirements

| Resource | Free Tier | Required (Year 1) | Paid Tier Projection (Year 5) |
|----------|-----------|-------------------|-------------------------------|
| Build minutes | 500/month | ~200/month | 5,000/month |
| Bandwidth | Unlimited | 200GB/month | 2TB/month |
| Workers CPU | 10ms/request | API routes | 50ms/request |
| D1 rows read | 5M/day | ~2M/day | 50M/day |
| D1 writes | 100K/day | ~50K/day | 5M/day |
| KV reads | 100K/day | ~50K/day | 10M/day |
| KV writes | 1K/day | ~500/day | 100K/day |
| R2 storage | 10GB | ~5GB | 100GB |
| Durable Objects | 1M requests/day | ~200K/day | 10M/day |
| Durable Object duration | 400K sec/day | ~100K sec/day | 10M sec/day |

### 8.3 CDN Cache Strategy

| Content Type | Cache-Control | CDN-Cache-Control | Rationale |
|-------------|---------------|-------------------|-----------|
| Static assets (hashed) | `public, max-age=31536000, immutable` | `max-age=31536000` | Immutable |
| Study guide HTML | `public, s-maxage=3600, stale-while-revalidate=86400` | `max-age=3600` | Stale-while-revalidate for wiki freshness |
| User-specific pages | `private, no-cache` | — | Never cached (progress, dashboard) |
| API responses | `public, s-maxage=60, stale-while-revalidate=300` | `max-age=60` | Short cache |
| Search index | `public, s-maxage=3600` | `max-age=3600` | Hourly refresh |

---

## BP-9: Formal Verification

### 9.1 Properties to Prove

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-WIKI-001 | Wiki revision chain is monotonically increasing | Unit test: revisions never decrease | Pending |
| FV-WIKI-002 | Conflict detection catches concurrent edits | Integration test: sim two edits to same page | Pending |
| FV-WIKI-003 | Reputation scoring matches specification (FR-045) | Unit test: sim contribution actions | Pending |
| FV-WIKI-004 | Reputation inactivity decay = 10%/month after 90 days | Unit test: sim inactivity, verify decay | Pending |
| FV-WIKI-005 | Moderation queue triggers for reputation < 10 | Unit test: sim edits from low-rep user | Pending |
| FV-WIKI-006 | FSRS scheduling produces retention > 85% | Integration test: rate 100 cards, verify | Pending |
| FV-WIKI-007 | Mastery gate blocks at < 80% prerequisite score | Unit test: access advanced topic without mastery | Pending |
| FV-WIKI-008 | Quiz scoring matches expected percentage | Unit test: known correct/total → expected % | Pending |

### 9.2 Invariant Properties

```
// Invariant 1: Wiki revision numbers are monotonically increasing
∀ page: ∀ rev₁, rev₂ ∈ page.revisions:
  rev₁.number < rev₂.number → rev₁.createdAt < rev₂.createdAt

// Invariant 2: Reputation score is non-negative
∀ user: user.reputation ≥ 0

// Invariant 3: FSRS intervals are positive integers
∀ card: card.nextReview > card.lastReview
∀ card: card.stability > 0

// Invariant 4: Quiz score is between 0 and 100
∀ session: 0 ≤ session.score ≤ 100

// Invariant 5: Mastery gate respects threshold
∀ topic: topic.prerequisites.all(p => p.mastery ≥ 80) → topic.unlocked = true

// Invariant 6: Edit moderation queue respects reputation threshold
∀ edit: edit.author.reputation < 10 → edit.status = "pending"

// Invariant 7: Flashcard difficulty is bounded
∀ card: 1.0 ≤ card.difficulty ≤ 10.0
```

---

## BP-10: HAL Specification

### 10.1 Hardware Abstraction Layer

The HAL for wikipept.com extends the encyclopeptide.com HAL with wiki collaboration, user authentication, and learning state management.

```typescript
interface WikipeptCloudflareHAL extends CloudflareHAL {
  // Wiki collaboration
  durableObjects: {
    WikiRoom: DurableObjectNamespace;
    QuizSession: DurableObjectNamespace;
    ReviewSession: DurableObjectNamespace;
  };

  // D1 databases
  d1: {
    users: D1Database;
    content: D1Database;
    quiz: D1Database;
    flashcards: D1Database;
    progress: D1Database;
    reputation: D1Database;
  };

  // User authentication
  auth: {
    verify(token: string): Promise<User | null>;
    createSession(user: User): Promise<string>;
    destroySession(token: string): Promise<void>;
  };

  // Real-time collaboration
  collaboration: {
    joinRoom(pageId: string, userId: string): Promise<WebSocket>;
    broadcast(roomId: string, message: EditMessage): void;
  };
}
```

### 10.2 HAL Deployment Mapping

| HAL Interface | Cloudflare Service | Purpose |
|---------------|-------------------|---------|
| durableObjects.WikiRoom | Durable Objects | Wiki page collaboration rooms |
| durableObjects.QuizSession | Durable Objects | Quiz state management |
| durableObjects.ReviewSession | Durable Objects | Flashcard review sessions |
| d1.users | Cloudflare D1 | User accounts, authentication |
| d1.content | Cloudflare D1 | Wiki pages, revisions, annotations |
| d1.quiz | Cloudflare D1 | Quiz sessions, question bank |
| d1.flashcards | Cloudflare D1 | Flashcard decks, FSRS state |
| d1.progress | Cloudflare D1 | Learning metrics, mastery |
| d1.reputation | Cloudflare D1 | Reputation scores, history |
| auth | Cloudflare Access / Workers | JWT verification, session management |
| collaboration | Durable Objects WebSocket | Real-time edit broadcasting |

---

## BP-11: Compliance Matrix

### 11.1 Standards Compliance

| Standard | Requirement | Component | Status | Evidence |
|----------|------------|-----------|--------|----------|
| IEEE 1016-2024 | Software design description | This document | Compliant | All 12 sections present |
| WCAG 2.1 AA | Accessibility | All pages | Target | axe-core testing in CI |
| Section 508 | Accessibility | All pages | Target | WCAG 2.1 AA compliance |
| Schema.org LearningResource | Structured data | Study guides | Target | JSON-LD validation |
| FSRS Specification | Spaced repetition | FlashcardService | Target | Algorithm correctness tests |
| IRT (Rasch) | Assessment science | QuizService | Target | Item calibration tests |
| ISO 639-1 | Language codes | i18n routing | Target | Locale prefix validation |
| Core Web Vitals | Performance | All pages | Target | Lighthouse CI assertions |
| OWASP Top 10 | Security | All routes | Target | CSP, HSTS, rate limiting |
| GDPR | User data protection | User accounts | Target | Data minimization, right to erasure |

### 11.2 Regulatory Compliance

| Regulation | Requirement | Implementation | Status |
|------------|------------|----------------|--------|
| GDPR | User consent, data portability, right to erasure | Export user data, delete account | Required |
| CCPA | User data rights | No PII sold, export on request | Required |
| European Accessibility Act | Accessibility by 2025 | WCAG 2.1 AA target | On track |
| Copyright Directive | Content licensing | CC BY-SA for community content | Defined |
| COPPA | Age verification | Not targeting children (13+) | Compliant |

---

## BP-12: Quality Checklist

### 12.1 Architecture Completeness

- [ ] All 12 Blue Paper sections present and populated
- [ ] Component hierarchy documented with responsibilities
- [ ] Interface contracts defined (API, wiki, quiz, flashcard, internal)
- [ ] Data models specified with TypeScript interfaces
- [ ] State machines defined for WikiEditor and QuizEngine
- [ ] Sequence diagrams for key user journeys
- [ ] Deployment topology documented with resource requirements
- [ ] Formal verification properties enumerated
- [ ] HAL specification complete
- [ ] Compliance matrix populated
- [ ] Quality checklist self-assessment complete

### 12.2 Traceability Completeness

- [ ] Every FR-031 through FR-048 requirement mapped to architecture component
- [ ] Every NFR requirement mapped to architecture component
- [ ] YP-EDU-CONTENT-001 theory sections mapped to FSRS/Quiz/Progress components
- [ ] YP-CHEM-OLIGO-001 theory sections mapped to shared CalculationService
- [ ] Every interface has preconditions, postconditions, error handling

### 12.3 Performance Validation

- [ ] LCP < 2.5s (p75) verified via Lighthouse CI
- [ ] CLS < 0.1 (p75) verified via Lighthouse CI
- [ ] INP < 200ms (p75) verified via Lighthouse CI
- [ ] Page weight < 500KB (gzipped) verified via Lighthouse CI
- [ ] Quiz response < 200ms (p95) verified via automated test
- [ ] Flashcard flip < 100ms verified via Playwright
- [ ] Wiki save < 500ms verified via integration test

### 12.4 Accessibility Validation

- [ ] axe-core zero critical violations
- [ ] Keyboard navigation complete (no traps)
- [ ] Screen reader landmark navigation verified
- [ ] Quiz engine fully keyboard accessible
- [ ] Flashcard flip accessible via keyboard
- [ ] Wiki editor keyboard accessible
- [ ] All images have alt text
- [ ] Contrast ratios meet WCAG 2.1 AA

### 12.5 Security Validation

- [ ] HTTPS enforced (HSTS with preload)
- [ ] CSP header present with correct directives
- [ ] Rate limiting active (100 req/min unauthenticated, 300 req/min authenticated)
- [ ] Input validation on all API endpoints
- [ ] XSS prevention on user-generated content (wiki edits)
- [ ] SQL injection prevention (parameterized D1 queries)
- [ ] CSRF protection on mutation endpoints
- [ ] No secrets in client-side code
- [ ] Dependency audit passes (npm audit)

### 12.6 Learning System Validation

- [ ] FSRS scheduling produces retention > 85% at 30 days (simulated)
- [ ] Quiz scoring matches expected percentages
- [ ] Mastery gate correctly blocks/unlocks content
- [ ] Reputation scoring matches FR-045 specification
- [ ] Reputation inactivity decay matches specification (10%/month after 90 days)
- [ ] Moderation queue correctly routes by reputation threshold
- [ ] Knowledge map renders correctly with prerequisite edges

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Next Action:** Review by Wikisites Architecture Team, iterate on feedback
**Owner:** Wikisites Architecture Team
