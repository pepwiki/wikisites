# White Paper: wikipept.com Brand Identity & Design System

**Document ID:** WP-WIKI-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Final
**Project:** Wikisites — Dual-Site Oligopeptide Educational Platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Brand Identity](#2-brand-identity)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Voice & Tone](#5-voice--tone)
6. [Visual Language](#6-visual-language)
7. [Tagline & Positioning](#7-tagline--positioning)
8. [Target Audience Personas](#8-target-audience-personas)
9. [Content Strategy](#9-content-strategy)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Executive Summary

wikipept.com is the collaborative, wiki-style educational arm of the Wikisites oligopeptide educational platform. It serves as an accessible, community-driven learning platform where students, science enthusiasts, and educators can learn about oligopeptides through progressive disclosure, interactive assessment tools, and collaborative knowledge building. This white paper defines the complete brand identity, design system, and content strategy for wikipept.com.

**Design Philosophy:** Approachable. Empowering. Progressive. Every element on wikipept.com communicates that learning about oligopeptides is achievable and rewarding. The site functions as a knowledgeable study partner — supportive without being condescending, rigorous without being intimidating.

---

## 2. Brand Identity

### 2.1 Brand Essence

wikipept.com is the place where anyone can go from "What is a peptide?" to understanding structure-activity relationships through self-directed, community-supported learning. The brand promises accessibility, accuracy, and a sense of progression.

| Attribute | Expression |
|-----------|------------|
| **Approachable** | Jargon-free explanations; progressive complexity; "you can do this" tone |
| **Collaborative** | Community-edited content; contribution recognition; discussion threads |
| **Educational** | Learning-first design; quizzes, flashcards, spaced repetition; progress tracking |
| **Accurate** | Expert-reviewed community content; citation requirements; version history |
| **Encouraging** | Celebrates milestones; streaks and badges; "you've mastered X" moments |

### 2.2 Brand Personality

| Archetype | Expression |
|-----------|------------|
| **The Teacher** | Explains complex concepts simply; celebrates student progress; patient and clear |
| **The Companion** | Learns alongside the user; acknowledges difficulty; never condescending |
| **The Guide** | Charts learning pathways; recommends next steps; connects related concepts |

### 2.3 Brand Promise

> "Anyone can learn oligopeptide science — one concept at a time."

### 2.4 Brand Differentiation

| Competitor Category | Their Approach | wikipept.com Differentiation |
|--------------------|----------------|-------------------------------|
| Khan Academy-style platforms | Generic science education; no peptide-specific depth | Deep oligopeptide focus with community-driven specialized content |
| Quizlet/Anki flashcards | Generic flashcard tools; no structured learning path | Structured curriculum with spaced repetition, progress tracking, and community annotations |
| Wikipedia | Comprehensive but intimidating; no learning scaffolding | Progressive disclosure; start simple, grow complexity; guided learning paths |
| University MOOCs | Fixed curriculum; passive video consumption; no interactivity | Active learning; self-paced; community support; interactive exercises |

---

## 3. Color System

### 3.1 Primary Palette

The wikipept.com color system draws from modern educational technology — warm, inviting tones that communicate friendliness and clarity without sacrificing readability.

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| **White** | Primary BG | `#FFFFFF` | 255, 255, 255 | Primary backgrounds, content surfaces |
| **Teal** | Primary Accent | `#0D9488` | 13, 148, 136 | Primary CTAs, active states, links, progress indicators |
| **Coral** | Secondary Accent | `#F97316` | 249, 115, 22 | Secondary CTAs, badges, achievement highlights, notifications |
| **Light Gray** | Surface | `#F8FAFC` | 248, 250, 252 | Card backgrounds, subtle surfaces, code blocks |

### 3.2 Extended Palette

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| Teal Dark | Hover | `#0F766E` | 15, 118, 110 | Hover state for teal elements |
| Teal Light | Highlight | `#CCFBF1` | 204, 251, 241 | Teal tint backgrounds, highlight boxes |
| Coral Dark | Pressed | `#EA580C` | 234, 88, 12 | Active/pressed state for coral elements |
| Coral Light | Badge BG | `#FFF7ED` | 255, 247, 237 | Coral tint backgrounds, badge containers |
| Gray 900 | Primary Text | `#0F172A` | 15, 23, 42 | Primary body text |
| Gray 600 | Secondary Text | `#475569` | 71, 85, 105 | Secondary labels, metadata |
| Gray 400 | Muted | `#94A3B8` | 148, 163, 184 | Placeholder text, disabled states |
| Gray 200 | Border | `#E2E8F0` | 226, 232, 240 | Subtle borders, dividers |
| Blue 500 | Info | `#3B82F6` | 59, 130, 246 | Informational callouts, links in light contexts |
| Blue 50 | Info BG | `#EFF6FF` | 239, 246, 255 | Info callout backgrounds |
| Green 500 | Success | `#22C55E` | 34, 197, 94 | Correct answers, completed milestones |
| Green 50 | Success BG | `#F0FDF4` | 240, 253, 244 | Success callout backgrounds |
| Red 500 | Error | `#EF4444` | 239, 68, 68 | Incorrect answers, error states |
| Red 50 | Error BG | `#FEF2F2` | 254, 242, 242 | Error callout backgrounds |

### 3.3 Color Usage Rules

| Rule | Specification |
|------|---------------|
| Background ratio | White/Light Gray backgrounds must constitute ≥ 70% of viewport area |
| Teal accent usage | Teal reserved for primary actions and active states; not for decorative elements |
| Coral accent usage | Coral reserved for achievements, badges, and secondary emphasis; not for primary navigation |
| Contrast ratio (text) | Gray 900 on White: 16.3:1 (AAA); Teal on White: 5.2:1 (AA); Coral on White: 3.8:1 (AA large text only) |
| Link color | Teal (#0D9488) on White; White on Teal backgrounds |
| Focus indicator | Teal outline, 3px, offset 2px — meets WCAG 2.1 2.4.7 |
| Color-blind safety | Teal/Coral pair tested for deuteranopia, protanopia, and tritanopia; supplemented with icons/patterns for critical state indicators |

### 3.4 Color Tokens (CSS Custom Properties)

```css
:root {
  /* Primary */
  --wiki-color-white: #FFFFFF;
  --wiki-color-surface: #F8FAFC;

  /* Accent */
  --wiki-color-primary: #0D9488;
  --wiki-color-primary-dark: #0F766E;
  --wiki-color-primary-light: #CCFBF1;
  --wiki-color-secondary: #F97316;
  --wiki-color-secondary-dark: #EA580C;
  --wiki-color-secondary-light: #FFF7ED;

  /* Neutrals */
  --wiki-color-text-primary: #0F172A;
  --wiki-color-text-secondary: #475569;
  --wiki-color-text-muted: #94A3B8;
  --wiki-color-border: #E2E8F0;

  /* Semantic */
  --wiki-color-info: #3B82F6;
  --wiki-color-info-bg: #EFF6FF;
  --wiki-color-success: #22C55E;
  --wiki-color-success-bg: #F0FDF4;
  --wiki-color-error: #EF4444;
  --wiki-color-error-bg: #FEF2F2;
  --wiki-color-warning: #F59E0B;
  --wiki-color-warning-bg: #FFFBEB;
}
```

---

## 4. Typography

### 4.1 Type Scale

| Role | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|------|------|--------|------|-------------|----------------|-------|
| Display | Plus Jakarta Sans | 800 | 44px / 2.75rem | 1.1 | -0.02em | Hero section titles |
| H1 | Plus Jakarta Sans | 700 | 32px / 2rem | 1.2 | -0.01em | Page titles |
| H2 | Plus Jakarta Sans | 700 | 26px / 1.625rem | 1.3 | 0 | Section headings |
| H3 | Plus Jakarta Sans | 600 | 20px / 1.25rem | 1.4 | 0 | Subsection headings |
| H4 | Plus Jakarta Sans | 600 | 17px / 1.0625rem | 1.5 | 0.01em | Card titles, labels |
| Body Large | Inter | 400 | 18px / 1.125rem | 1.7 | 0 | Introductory paragraphs |
| Body | Inter | 400 | 16px / 1rem | 1.7 | 0 | Standard body text |
| Body Small | Inter | 400 | 14px / 0.875rem | 1.6 | 0.01em | Metadata, captions, footnotes |
| Code | JetBrains Mono | 400 | 14px / 0.875rem | 1.5 | 0 | Code blocks, sequences, formulas |
| Label | Inter | 500 | 12px / 0.75rem | 1.5 | 0.05em | Form labels, badges, tags |
| Caption | Inter | 400 | 12px / 0.75rem | 1.5 | 0.02em | Figure captions, table notes |
| Button | Plus Jakarta Sans | 600 | 15px / 0.9375rem | 1 | 0.02em | All button labels |

### 4.2 Font Loading Strategy

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap">
```

**Font-display:** `swap` for all web fonts — text remains visible during font loading using system font fallbacks (system-ui for Plus Jakarta Sans, system-ui for Inter, monospace for JetBrains Mono).

### 4.3 Typographic Conventions

| Convention | Rule |
|------------|------|
| Maximum line length | 68 characters for body text (optimized for reading speed) |
| Paragraph spacing | 1.25em between paragraphs |
| Heading hierarchy | Never skip levels; every page has exactly one H1 |
| Monospace usage | Peptide sequences, molecular formulas, chemical notation, code snippets |
| Emphasis | **Bold** for key terms on first definition; *italic* for Latin/scientific names |
| Lists | Bullet lists for unordered items; numbered lists for sequential steps |
| Progressive disclosure markers | "▶ Basic" / "▶▶ Intermediate" / "▶▶▶ Advanced" / "▶▶▶▶ Expert" |

---

## 5. Voice & Tone

### 5.1 Voice Characteristics

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Friendly** | Conversational but not casual; warm but not sloppy | "Let's explore how peptides fold into their 3D shapes" (not "Peptide tertiary structure will now be examined") |
| **Encouraging** | Celebrates progress; normalizes struggle; positive framing | "Great job completing that quiz! You've now mastered the basics of amino acid chemistry." |
| **Clear** | Jargon-free on first pass; defines terms on use; avoids unnecessary complexity | "A peptide bond is the chemical link between two amino acids (think of it as a molecular 'snap fastener')" |
| **Progressive** | Layers complexity gradually; never dumps everything at once | Foundation → Structure → Function → Application, each building on the last |
| **Honest** | Acknowledges difficulty; doesn't oversimplify to the point of inaccuracy | "This concept is challenging — even researchers debate some aspects. Here's what we know for certain..." |

### 5.2 Tone Variations by Context

| Context | Tone | Example |
|---------|------|---------|
| Study guide introduction | Welcoming; sets expectations; outlines learning path | "Welcome to the amino acids module! Over the next 10 lessons, you'll learn to identify all 20 standard amino acids and understand why they matter." |
| Quiz feedback (correct) | Celebrating; reinforces learning; explains why the answer is correct | "Correct! Leucine is hydrophobic because its side chain contains only carbon and hydrogen atoms. This property makes it common in protein cores." |
| Quiz feedback (incorrect) | Supportive; reframes as learning; provides correct answer with explanation | "Not quite — but that's a common mix-up! Histidine (not lysine) has the imidazole ring that acts as a pH buffer. Think: 'His' for 'histidine holds the charge.'" |
| Error messages | Friendly but clear; suggests what to do next | "Oops! That page seems to have wandered off. Try searching for the topic above, or head back to the study guide." |
| Achievement unlocked | Enthusiastic but measured; connects to learning progress | "Milestone reached! You've completed the peptide bonds module. You now understand the foundation of all protein chemistry." |
| Community contribution | Appreciative; acknowledges value; sets expectations | "Thanks for suggesting an edit! Our reviewers will check it within 48 hours. Your contribution makes wikipept better for everyone." |

### 5.3 Writing Rules

1. **Contractions are welcome.** "Don't" is friendlier than "do not". Use them liberally.
2. **Second person preferred.** "You will learn..." not "The student will learn..."
3. **Active voice preferred.** "The enzyme breaks down..." not "The peptide bond is broken by..."
4. **Define jargon on first use.** Every technical term gets a plain-English explanation.
5. **Use analogies.** Connect abstract concepts to everyday experience.
6. **Short paragraphs.** Maximum 3-4 sentences per paragraph for screen readability.
7. **Lists for clarity.** Use bullet/numbered lists whenever presenting multiple items.
8. **Questions engage.** "What happens when a peptide bond forms?" — rhetorical questions guide attention.

---

## 6. Visual Language

### 6.1 Cards

Cards are the primary content container, communicating approachability and modularity.

| Property | Value |
|----------|-------|
| Border radius | 12px |
| Shadow | `0 1px 3px rgba(0,0,0,0.1)` (rest), `0 4px 12px rgba(0,0,0,0.15)` (hover) |
| Padding | 24px |
| Background | White (#FFFFFF) on White (#FFFFFF) page; Light Gray (#F8FAFC) on White page |
| Border | 1px solid Gray 200 (#E2E8F0) |
| Hover state | Shadow elevation increase; slight translate-y (-2px); 200ms ease |
| Active state | Translate-y (0); shadow returns to rest |

### 6.2 Icons

| Category | Style |
|----------|-------|
| Icon set | Phosphor Icons (rounded friendly style, consistent weight) |
| System icons | Check, X, Arrow, Chevron — rounded, not sharp |
| Molecular icons | Custom SVG with rounded strokes; friendly interpretation of molecular structures |
| Status indicators | Colored circles with icons: ✓ Green (correct), ✗ Red (incorrect), ★ Coral (achievement) |
| Icon sizes | 16px (inline), 20px (buttons), 24px (navigation), 32px (feature), 48px (empty states) |

### 6.3 Progress Bars

Progress visualization is central to the learning experience.

| Property | Value |
|----------|-------|
| Height | 8px (standard), 12px (prominent), 4px (compact) |
| Border radius | 4px (half of height for pill shape) |
| Track color | Gray 200 (#E2E8F0) |
| Fill color | Teal (#0D9488) for course progress; Coral (#F97316) for streak/achievements |
| Animation | Width transition, 500ms ease-out |
| Labels | Percentage complete and "X of Y" count displayed adjacent |
| Milestones | Coral dots at 25%, 50%, 75%, 100% marks |

### 6.4 Interactive Elements

| Element | Behavior |
|---------|----------|
| Flashcards | Click/tap to flip; swipe left (incorrect) / right (correct); 3D flip animation (400ms) |
| Quiz options | Hover: Teal border highlight; Click: Teal background fill; Selected: persistent Teal border |
| Check answers | Teal button; transition to result display; correct = Green + explanation; incorrect = Red + explanation |
| Progress save | Auto-save on every interaction; brief "Saved" indicator (Teal checkmark, 1s fade) |
| Expand/collapse | Chevron rotation animation (200ms); content height transition (300ms ease) |
| Search | Typeahead with highlighted matches; results appear as cards below input |

### 6.5 Layout & Spacing

| Property | Value |
|----------|-------|
| Base unit | 8px |
| Grid | 12-column, 1200px max-width, 24px gutter |
| Content max-width | 800px for study guides (optimal reading + interaction width) |
| Card grid | Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop) |
| Section spacing | 48px (3rem) between major sections |
| Component spacing | 24px (1.5rem) between related components |
| Element spacing | 16px (1rem) between related elements |
| Tight spacing | 8px (0.5rem) within grouped elements |

---

## 7. Tagline & Positioning

### 7.1 Primary Tagline

> **"Learn Peptide Science, One Concept at a Time"**

### 7.2 Positioning Statement

For students, science enthusiasts, and lifelong learners who want to understand oligopeptide science without the intimidation of dense textbooks or the unreliability of unstructured web searches, **wikipept.com** is the collaborative learning platform that breaks complex peptide science into achievable, progressively layered learning modules — unlike Khan Academy, Quizlet, or Wikipedia, wikipept.com combines structured curriculum, community-driven content, and interactive assessment tools specifically designed for oligopeptide education.

### 7.3 Supporting Messages

| Audience | Key Message |
|----------|-------------|
| Students (UG/Grad) | "Ace your biochemistry exam with interactive quizzes and spaced repetition" |
| Science enthusiasts | "Curious about peptides? Start with the basics and grow as far as you want" |
| Educators | "Assign learning modules with built-in assessment and progress tracking" |
| Contributors | "Share what you know — edit, annotate, and help others learn" |

### 7.4 Brand Taglines (Contextual)

| Context | Tagline |
|---------|---------|
| Homepage hero | "Learn Peptide Science, One Concept at a Time" |
| Module introduction | "Ready to learn something new? This module takes about X minutes" |
| Quiz start | "Test what you know — no pressure, just learning" |
| Achievement | "You're making real progress!" |
| Empty state | "Your learning journey starts here" |

---

## 8. Target Audience Personas

### 8.1 Persona 1: Maya Chen — Undergraduate Student

| Attribute | Detail |
|-----------|--------|
| **Age** | 20 |
| **Role** | Junior, B.Sc. Biochemistry, University of Toronto |
| **Education** | Completed general chemistry and cell biology; currently enrolled in biochemistry |
| **Technical proficiency** | Moderate — uses web tools daily, comfortable with apps, not a programmer |
| **Goals** | Understand peptide chemistry for upcoming exam; build foundational knowledge for research internship; earn good grades without memorizing without understanding |
| **Pain points** | Textbook is dense and dry; lectures move too fast; flashcard apps lack context; no interactive way to visualize peptide structures |
| **Content needs** | Clear explanations with analogies; visual diagrams; quizzes to self-test; flashcards for amino acid properties; progress tracking for motivation |
| **Behavior** | Studies in 25-45 minute sessions; uses phone and laptop; shares study resources with classmates; motivated by streaks and achievements |
| **Device mix** | 50% mobile (between classes), 35% laptop (dorm study), 15% tablet (library) |
| **Success metric** | "I understand peptide bonds well enough to explain them to my roommate" |

### 8.2 Persona 2: Tomasz Kowalski — Science Enthusiast

| Attribute | Detail |
|-----------|--------|
| **Age** | 42 |
| **Role** | Software engineer by day; science hobbyist by night |
| **Education** | M.Sc. Computer Science (2006); no formal biochemistry training |
| **Technical proficiency** | Very high in tech; moderate in biology — can handle technical depth but needs conceptual scaffolding |
| **Goals** | Satisfy curiosity about peptide-based therapeutics; understand how peptide drugs work; potentially transition into computational biology |
| **Pain points** | Academic papers assume too much prior knowledge; MOOCs are too shallow; no resource bridges the gap between "popular science" and "textbook" |
| **Content needs** | Progressive depth (start accessible, go deep); interactive elements; connections to computational approaches; no prerequisites assumed |
| **Behavior** | Learns in focused evening sessions (60-90 min); prefers self-paced; enjoys community discussions; shares interesting finds on social media |
| **Device mix** | 75% desktop (home office), 20% tablet (couch), 5% mobile (commute) |
| **Success metric** | "I can read a peptide drug paper and understand 80% of it without looking up every other word" |

### 8.3 Persona 3: Amara Okafor — Educator

| Attribute | Detail |
|-----------|--------|
| **Age** | 35 |
| **Role** | Lecturer in Biochemistry, University of Lagos |
| **Education** | Ph.D. Biochemistry (2018); teaching-focused role |
| **Technical proficiency** | High — uses LMS platforms, creates teaching materials, comfortable with web tools |
| **Goals** | Find supplementary resources for students; assign self-study modules with built-in assessment; track student progress; reduce repetitive explanations of fundamentals |
| **Pain points** | Creating custom study materials is time-consuming; existing resources are either too basic or too advanced; limited budget for licensed educational tools |
| **Content needs** | Comprehensive modules she can assign; built-in quizzes she can use for formative assessment; progress dashboards; content that's accurate enough to recommend confidently |
| **Behavior** | Evaluates resources thoroughly before recommending; values accuracy over flashiness; wants to customize modules for her course; shares resources with colleagues |
| **Device mix** | 60% desktop (office), 25% laptop (home), 15% mobile |
| **Success metric** | "I can assign Module 3 and know my students will actually learn the material" |

---

## 9. Content Strategy

### 9.1 Content Types

#### 9.1.1 Study Guides

The primary content type. Each study guide is a structured learning module with progressive depth disclosure.

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| Title | Yes | String | Clear, descriptive module title |
| Difficulty level | Yes | Enum | Foundational / Intermediate / Advanced / Expert |
| Prerequisites | No | Array | Links to prerequisite modules |
| Learning objectives | Yes | Array | 3-5 specific, measurable objectives |
| Estimated time | Yes | Number + unit | Minutes to complete at normal pace |
| Content sections | Yes | Array | Ordered sections with progressive depth |
| Key terms | Yes | Array | Vocabulary with inline definitions |
| Visual aids | Yes | Array | Diagrams, animations, interactive elements |
| Summary | Yes | Text | Concise wrap-up of key concepts |
| Quiz | Yes | Array | 5-10 questions testing learning objectives |
| Flashcard deck | Yes | Array | Key term flashcards (front/back) |
| References | Yes | Array | Links to encyclopeptide.com monographs and primary literature |

#### 9.1.2 Quizzes

| Property | Value |
|----------|-------|
| Question types | Multiple choice, True/False, Fill-in-the-blank (sequence), Matching, Ordering |
| Feedback | Immediate per-question with explanation; end-of-quiz summary |
| Scoring | Percentage correct; comparison to community average |
| Spaced repetition | Incorrect questions resurface per FSRS algorithm |
| Attempt tracking | All attempts recorded; progress shown as trend |
| Time limit | Optional; configurable per quiz; default: untimed |

#### 9.1.3 Flashcards

| Property | Value |
|----------|-------|
| Card front | Term, image, or sequence |
| Card back | Definition, explanation, or structure |
| Review modes | Standard (manual flip), Spaced repetition (FSRS), Cram mode |
| Progress | Cards categorized as: New, Learning, Review, Mature |
| Sharing | Community decks can be shared, forked, and rated |
| Import/Export | Anki-compatible format (APKG), CSV |

#### 9.1.4 Community Features

| Feature | Description |
|---------|-------------|
| Annotations | Users can add notes, clarifications, and examples to any study guide section |
| Discussion threads | Per-module discussion boards with upvoting |
| Contribution leaderboard | Recognition for helpful edits, annotations, and corrections |
| Edit history | Full version history with diff view; rollback capability |
| Reputation system | Points for contributions; badges for milestones; expert reviewer status earned |
| Peer review | New contributions go through community review before publication |

### 9.2 Content Quality Standards

| Standard | Requirement |
|----------|-------------|
| Accuracy | All scientific content verified against peer-reviewed sources |
| Accessibility | Reading level: Grade 10-12 for foundational; Grade 14-16 for expert |
| Citations | Minimum 1 citation per study guide; inline links to encyclopeptide.com where applicable |
| Review cycle | Foundational modules: quarterly; Intermediate+: semi-annually |
| Community edits | All edits require minimum 2 community approvals or 1 expert review |
| Quiz validation | All quiz questions reviewed by domain expert; distractors must be plausible |
| Accessibility | WCAG 2.1 Level AA; alt text on all images; transcripts for any audio/video |

### 9.3 Learning Pathways

Structured sequences that guide learners from novice to expert:

| Pathway | Modules | Duration | Outcome |
|---------|---------|----------|---------|
| **Peptide Foundations** | 8 modules | ~6 hours | Understand what peptides are, how they're built, and why they matter |
| **Amino Acid Mastery** | 20 modules (1 per amino acid) | ~15 hours | Identify and characterize all 20 standard amino acids |
| **Peptide Structure & Folding** | 6 modules | ~5 hours | Understand primary through quaternary structure of peptides |
| **Peptide Function** | 8 modules | ~6 hours | Connect peptide structure to biological function |
| **Therapeutic Peptides** | 10 modules | ~8 hours | Explore peptide-based drug design and clinical applications |
| **Computational Peptide Science** | 6 modules | ~5 hours | Introduction to bioinformatics approaches for peptide analysis |

### 9.4 Content Calendar

| Activity | Frequency | Owner |
|----------|-----------|-------|
| New study guide publication | Bi-weekly | Content team |
| Quiz/question bank expansion | Weekly | Content team + community |
| Flashcard deck update | Weekly | Community + expert review |
| Module review and refresh | Quarterly | Content team |
| Learning pathway assessment | Semi-annually | Education specialist |
| Community feature update | Monthly | Engineering |

---

## 10. Implementation Guidelines

### 10.1 Design Token Integration

All design tokens (colors, typography, spacing) are defined as CSS custom properties and must be consumed through the token system. Direct values in component code are prohibited to ensure consistent theming and future dark mode support.

### 10.2 Component Specifications

| Component | Variants | Priority |
|-----------|----------|----------|
| StudyGuideCard | Default, Compact, Featured, In-Progress | P0 |
| QuizCard | MultipleChoice, TrueFalse, FillBlank, Matching | P0 |
| Flashcard | Front, Back, Flip-Animation | P0 |
| ProgressBar | Linear, Circular, Stepped | P0 |
| AchievementBadge | Bronze, Silver, Gold, Platinum | P1 |
| NavigationBar | Desktop, Mobile, Breadcrumb | P0 |
| SearchBar | Simple, Filtered | P0 |
| DiscussionThread | Default, Expanded, Pinned | P1 |
| ContributionCard | Edit, Annotation, Correction | P1 |
| LearningPathway | Overview, ModuleList, Progress | P1 |

### 10.3 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column; bottom navigation; full-width cards; stacked quiz options |
| Tablet | 640-1024px | Two-column where appropriate; side navigation collapses to icons |
| Desktop | 1024-1440px | Full layout; sidebar navigation + content area |
| Wide | > 1440px | Max-width containers; centered content |

### 10.4 Accessibility Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color contrast | WCAG 2.1 AA (4.5:1 text, 3:1 UI) | All color combinations verified; token system enforces ratios |
| Keyboard navigation | WCAG 2.1 2.1.1 | Full tab order; visible focus indicators (Teal outline); flashcard flip accessible via Enter/Space |
| Screen reader support | WCAG 2.1 4.1.2 | ARIA labels on all interactive elements; live regions for quiz feedback; progress announced on change |
| Flashcards | WCAG 2.1 1.3.1 | Front/back content accessible to screen readers; flip action has text equivalent |
| Quizzes | WCAG 2.1 1.3.1 | Radio groups properly labeled; feedback associated with questions via aria-describedby |
| Motion | WCAG 2.1 2.3.3 | Reduced motion media query; flashcard flip becomes instant swap; progress bar becomes number-only |
| Cognitive accessibility | WCAG 2.1 3.3.2 | Clear labels; instructions before complex interactions; error prevention for quiz submissions |

### 10.5 Performance Budgets

| Metric | Budget |
|--------|--------|
| Initial JS bundle | < 120 KB (gzipped) |
| Initial CSS | < 40 KB (gzipped) |
| Study guide page weight | < 250 KB (excluding images) |
| Quiz page weight | < 200 KB |
| Flashcard page weight | < 150 KB |
| Time to Interactive | < 2s on 4G |
| Largest Contentful Paint | < 2s |
| Cumulative Layout Shift | < 0.1 |
| First Input Delay | < 100ms |

---

*Document generated: 2026-06-07T00:00:00Z*
*Phase status: APPROVED*
*Classification: Internal*
