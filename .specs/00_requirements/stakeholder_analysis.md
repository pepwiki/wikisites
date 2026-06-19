# Stakeholder Analysis

**Version:** 1.0.0
**Date:** 2026-06-19

---

## Stakeholder Map

```
                    High Influence
                         |
         Administrators  |  Power Users
         (Site Owners)   |  (Researchers, Devs)
                         |
    Low Interest --------+-------- High Interest
                         |
         General Public  |  Students
         (Casual Readers)|  (Learners)
                         |
                    Low Influence

         Contributors (Content Authors) — High Interest, Medium Influence
```

---

## Stakeholder Profiles

### 1. Power Users (Researchers, Developers)

**Description:** Peptide researchers, bioinformaticians, and software developers who use Wikisites as a daily reference tool. They are keyboard-first, efficiency-oriented, and expect IDE-like workflows.

**Role:** Primary beneficiary of all power-user features (P0-P1)

**Concerns:**
- Keyboard-driven workflow (no mouse dependency)
- Fast search with advanced query capabilities (regex, filters)
- Knowledge graph for discovering related content
- Split-pane for comparing articles
- Command palette for instant action access
- Offline capability for field/lab work
- Data export and portability

**Priority:** Highest — this is the target persona for the "VS Code for content" transformation

**Success Metrics:**
- 80% of power users can complete a full article navigation workflow using only keyboard within 2 weeks of feature launch
- Command palette adoption rate > 50% of sessions (tracked via analytics)
- Search satisfaction score > 4/5 (feedback widget)
- Average session duration increases by 20% (deeper engagement)
- Return visit rate > 60% weekly

**Feature Mapping:**

| Feature | Stakeholder Need | Requirement |
|---------|-----------------|-------------|
| Command palette | Instant action access without menu diving | REQ-P0-001 through REQ-P0-004 |
| Keyboard shortcuts | Mouse-free navigation | REQ-P0-005, REQ-P0-006 |
| Outline panel | Quick document scanning | REQ-P0-007 |
| Regex search | Pattern-based content discovery | REQ-P1-004 |
| Knowledge graph | Related content discovery | REQ-P1-002 |
| Split panes | Side-by-side comparison | REQ-P1-003 |
| Settings export | Multi-device portability | REQ-P4-003 |

---

### 2. Students (Learners)

**Description:** Undergraduate and graduate students studying peptide science, biochemistry, and related fields. They use Wikipept for learning, quizzes, flashcards, and spaced repetition.

**Role:** Primary user of learning features (quizzes, flashcards, FSRS, daily challenges)

**Concerns:**
- Effective learning tools (quizzes, flashcards, spaced repetition)
- Clear, readable content with good typography
- Mobile-friendly experience (study on the go)
- Progress tracking and learning analytics
- Offline study capability
- Accessible content (screen readers, keyboard navigation)
- Breadcrumb navigation for orientation in content hierarchy

**Priority:** High — largest user segment by volume

**Success Metrics:**
- Quiz completion rate > 80%
- Flashcard review retention rate > 70% (FSRS scheduling)
- Daily active learners > 30% of registered users
- Mobile session share > 50%
- Accessibility audit pass rate = 100%

**Feature Mapping:**

| Feature | Stakeholder Need | Requirement |
|---------|-----------------|-------------|
| Breadcrumbs | Orientation in content hierarchy | REQ-P0-008 |
| Reading time | Time management for study sessions | REQ-P1-007 |
| Scroll spy |知道自己在长文章中的位置 | REQ-P1-006 |
| LaTeX rendering | Mathematical notation in academic content | REQ-P1-001 |
| Offline study | Study without internet | REQ-OFFL-001 |
| Keyboard shortcuts | Efficient navigation during study | REQ-P0-005 |

---

### 3. Contributors (Content Authors)

**Description:** Subject matter experts, educators, and community members who create and edit articles, quizzes, and flashcards. They range from technical (MDX-savvy) to non-technical (WYSIWYG preference).

**Role:** Content creation and maintenance; primary users of editor features (P3)

**Concerns:**
- Easy content authoring (web-based editor vs. local toolchain)
- Content quality validation before publishing
- Version history for collaboration and rollback
- Annotation layer for community feedback on content
- Clear contribution guidelines and feedback loops
- Recognition for contributions (profiles, reputation)

**Priority:** Medium — critical for content scaling but smaller population than consumers

**Success Metrics:**
- Content contribution rate increases by 50% after editor launch
- Average time from draft to publish < 24 hours
- Content validation error rate < 5% (caught before publish)
- Version revert requests < 2% of edits
- Active contributors > 10 within 6 months of launch

**Feature Mapping:**

| Feature | Stakeholder Need | Requirement |
|---------|-----------------|-------------|
| Web MDX editor | Low-barrier content creation | REQ-P3-001 |
| Version history | Collaboration and rollback safety | REQ-P3-002 |
| Content validation | Quality assurance before publish | REQ-P3-003 |
| Comments | Community feedback on articles | REQ-P2-001 |
| Annotations | In-context content improvement suggestions | REQ-P2-002 |
| User profiles | Contribution recognition | REQ-P2-004 |

---

### 4. Administrators (Site Owners)

**Description:** The project owner(s) responsible for site performance, security, content quality, and operational health. They manage infrastructure, deploy updates, and monitor metrics.

**Role:** Site operations, security, performance, and strategic direction

**Concerns:**
- Site performance (Lighthouse scores, TTFB)
- Security (CSP, XSS prevention, rate limiting)
- Content quality and accuracy
- Operational reliability (uptime, error rates)
- Cost management (Cloudflare usage, D1 queries)
- Compliance (GDPR, accessibility standards)
- Scalability without proportional cost increase

**Priority:** High — determines project sustainability

**Success Metrics:**
- Lighthouse score > 95 on all pages
- Security audit pass rate = 100%
- Zero critical vulnerabilities in production
- Uptime > 99.9%
- Cloudflare bill < $50/month at 10K MAU
- Build time < 60s at 500 articles
- Zero data loss incidents

**Feature Mapping:**

| Feature | Stakeholder Need | Requirement |
|---------|-----------------|-------------|
| CSP headers | XSS prevention | REQ-SEC-001 |
| Input sanitization | User-generated content safety | REQ-SEC-002 |
| Rate limiting | Abuse prevention | REQ-SEC-003 |
| CSRF protection | Session security | REQ-SEC-004 |
| Performance budgets | Sustainable scaling | REQ-PERF-001, REQ-PERF-004 |
| Plugin API | Controlled extensibility | REQ-P4-001 |
| Settings validation | Configuration integrity | REQ-P4-004 |

---

### 5. General Public (Casual Readers)

**Description:** Occasional visitors who land on Wikisites via search engines, links from other sites, or social media. They read one or two articles and may not return.

**Role:** Content consumers; entry point for user acquisition

**Concerns:**
- Fast page load (won't wait for slow sites)
- Readable content without clutter
- Mobile-friendly experience
- No forced registration wall
- Clear navigation to related content
- Dark mode support

**Priority:** Low for power features, High for baseline quality

**Success Metrics:**
- Bounce rate < 40%
- Average pages per session > 2
- Mobile usability score = 100 (Lighthouse)
- Search engine ranking for target keywords improves by 5 positions

**Feature Mapping:**

| Feature | Stakeholder Need | Requirement |
|---------|-----------------|-------------|
| Breadcrumbs | Orientation | REQ-P0-008 |
| Skip links | Accessibility | REQ-P0-010 |
| Performance | Fast load | REQ-PERF-001 |
| Offline support | Works on slow/unreliable connections | REQ-OFFL-001 |
| i18n | Content in their language | REQ-I18N-001 |

---

## Stakeholder Priority Matrix

| Stakeholder | Influence | Interest | Engagement Strategy |
|-------------|-----------|----------|-------------------|
| Power Users | High | High | Co-design; beta testing; feedback loops |
| Students | Low | High | User testing; analytics; feedback widgets |
| Contributors | Medium | High | Documentation; onboarding; recognition |
| Administrators | High | Low | Regular reporting; dashboards; alerts |
| General Public | Low | Low | SEO; performance; analytics |

---

## Conflict Resolution

| Conflict | Stakeholders | Resolution |
|----------|-------------|------------|
| Feature complexity vs. simplicity | Power Users want power; Students want simplicity | Progressive disclosure: basic UI by default, power features behind shortcuts/command palette |
| Performance vs. features | Admins want speed; all stakeholders want features | Bundle size budgets per tier; lazy loading; code splitting |
| Security vs. usability | Admins want strict security; Contributors want easy editing | Whitelist-based sanitization; Markdown-only in user content; server-side enforcement |
| Offline vs. freshness | Students want offline; Admins want current content | Service worker with stale-while-revalidate; manual refresh option |
| i18n completeness vs. speed | General Public wants all locales; Admins want fast launch | Prioritize en, zh, ja; ar as stretch goal; community translation pipeline |
