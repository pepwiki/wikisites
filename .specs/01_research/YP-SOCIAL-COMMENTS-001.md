---
document_id: YP-SOCIAL-COMMENTS-001
title: "Comments System for Educational Platforms"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of the comments system including Giscus (GitHub Discussions) vs custom
  (D1/KV) architecture, authentication options, spam prevention strategies, SSR
  compatibility with Astro, privacy considerations (GDPR), and performance impact
  (lazy loading). Defines the social commenting framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Comments System for Educational Platforms

**Document ID:** YP-SOCIAL-COMMENTS-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

---

## Table of Contents

1. [Document Header](#1-document-header)
2. [Executive Summary](#2-executive-summary)
3. [Nomenclature and Notation](#3-nomenclature-and-notation)
4. [Theoretical Foundation](#4-theoretical-foundation)
5. [Algorithm Specification](#5-algorithm-specification)
6. [Test Vector Specification](#6-test-vector-specification)
7. [Domain Constraints](#7-domain-constraints)
8. [Bibliography](#8-bibliography)
9. [Knowledge Graph Concepts](#9-knowledge-graph-concepts)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Document Header

### 1.1 Purpose

This Yellow Paper specifies the comments system for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for social commenting, including external (Giscus) vs custom (D1/KV) implementations, authentication flows, spam prevention, SSR compatibility, privacy compliance, and performance optimization.

### 1.2 Scope

Covers Giscus integration (GitHub Discussions-backed), custom comments system (Cloudflare D1/KV), authentication options (OAuth, magic links, passkeys), spam prevention (rate limiting, CAPTCHA, content moderation), Astro SSR compatibility, GDPR compliance, lazy loading strategies, and notification systems. Does not cover inline annotation layer (reserved for YP-SOCIAL-ANNOTATIONS-001), user account management (reserved for YP-SOCIAL-ACCOUNTS-001), or editor-based commenting (reserved for YP-EDITOR-MDX-001).

### 1.3 Audience

Frontend developers implementing the comments system, backend engineers configuring D1/KV storage, security engineers reviewing authentication and spam prevention, and privacy officers auditing GDPR compliance.

### 1.4 Normative References

- Giscus Documentation (https://giscus.app)
- GitHub Discussions API (https://docs.github.com/en/discussions)
- Cloudflare D1 Documentation (https://developers.cloudflare.com/d1/)
- Cloudflare KV Documentation (https://developers.cloudflare.com/kv/)
- Astro Documentation (https://docs.astro.build)
- SolidJS Documentation (https://www.solidjs.com)
- GDPR (Regulation (EU) 2016/679)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| SSR  | Server-Side Rendering                              |
| CSR  | Client-Side Rendering                              |
| KV   | Key-Value Store (Cloudflare)                       |
| D1   | SQLite Database (Cloudflare)                       |
| OAuth| Open Authorization Protocol                        |
| JWT  | JSON Web Token                                     |
| GDPR | General Data Protection Regulation                 |
| CSP  | Content Security Policy                            |
| COSC | Cross-Origin Server Communication                  |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a commenting system that enables learner discussions, peer review of content, and community engagement. The system must handle high-volume commenting on educational articles, support markdown formatting for scientific notation, prevent spam and abuse, comply with GDPR privacy regulations, and integrate seamlessly with the Astro islands architecture without degrading performance.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Giscus Integration**: GitHub Discussions-backed comments with zero backend
2. **Custom Comments System**: D1/KV-based comments with full control
3. **Authentication Options**: OAuth (GitHub, Google), magic links, passkeys
4. **Spam Prevention**: Multi-layered approach (rate limiting, CAPTCHA, moderation)
5. **SSR Compatibility**: Astro islands architecture integration
6. **Privacy Compliance**: GDPR-compliant data handling
7. **Performance Optimization**: Lazy loading, caching, bundle splitting

### 2.3 Key Assumptions

- Primary deployment target: Cloudflare Pages + Workers
- GitHub repository is public for Giscus Discussions
- D1 database available for custom comments storage
- Content authored in MDX with frontmatter
- SolidJS used for interactive comment components
- TypeScript strict mode enabled throughout

### 2.4 Success Criteria

- Comments load asynchronously without blocking page render
- LCP < 2.5s maintained with comments enabled
- Spam detection rate > 95% for automated attacks
- GDPR compliance verified by privacy audit
- Comment submission latency < 500ms
- Support for markdown formatting in comments

---

## 3. Nomenclature and Notation

### 3.1 Comments System Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Giscus             | Comments system powered by GitHub Discussions                     |
| Discussion         | GitHub Discussions thread linked to a page                        |
| Reaction           | Emoji response to a comment or discussion                         |
| Thread             | Nested comment chain                                             |
| Moderation         | Review and approval of comments                                   |
| Spam               | Unsolicited or malicious content                                  |
| CAPTCHA            | Completely Automated Public Turing test to tell Computers and Humans Apart |

### 3.2 Authentication Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| OAuth              | Open Authorization protocol for third-party login                 |
| Magic Link         | Email-based passwordless authentication                           |
| Passkey            | FIDO2/WebAuthn credential for passwordless login                  |
| JWT                | JSON Web Token for session management                             |
| Session            | Authenticated user state                                         |

### 3.3 Storage Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| D1                 | Edge-native SQLite database (Cloudflare)                          |
| KV                 | Eventually-consistent key-value store (Cloudflare)                |
| Snapshot           | Point-in-time copy of comment data                                |
| Thread             | Hierarchical comment structure                                    |

---

## 4. Theoretical Foundation

### 4.1 Giscus Integration Architecture

#### 4.1.1 How Giscus Works

Giscus uses the GitHub Discussions API to map pages to discussions:

```
┌─────────────────────────────────────────────────┐
│              Giscus Architecture                │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │  Website     │────▶│  Giscus App         │   │
│  │  (Astro)     │     │  (GitHub OAuth)     │   │
│  └─────────────┘     └──────────┬──────────┘   │
│                                 │               │
│                                 ▼               │
│                    ┌─────────────────────┐      │
│                    │  GitHub Discussions  │      │
│                    │  (Public Repository) │      │
│                    └─────────────────────┘      │
└─────────────────────────────────────────────────┘
```

**Mapping strategies:**

| Strategy | Description | Use Case |
|----------|-------------|----------|
| `pathname` | Discussion title contains page pathname | Default, most reliable |
| `url` | Discussion title contains full URL | Multi-domain setups |
| `title` | Discussion title contains page `<title>` | SEO-friendly |
| `og:title` | Discussion title contains `og:title` meta | Social media optimized |
| `term` | Discussion title contains specific term | Custom categorization |
| `number` | Load specific discussion by number | Fixed discussions |

#### 4.1.2 Giscus Configuration

```html
<script src="https://giscus.app/client.js"
        data-repo="KP/wikisites"
        data-repo-id="R_kgDOJ_____"
        data-category="Announcements"
        data-category-id="DICgDOJ_____"
        data-mapping="pathname"
        data-strict="1"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
```

#### 4.1.3 Giscus Benefits

- **Zero backend**: No database or API to maintain
- **Free hosting**: GitHub Discussions storage
- **Moderation**: Native GitHub moderation tools
- **Spam prevention**: GitHub's built-in spam detection
- **Authentication**: GitHub OAuth for commenters
- **Custom themes**: CSS theme support

#### 4.1.4 Giscus Limitations

- **GitHub dependency**: Relies on GitHub's availability and API limits
- **Public repository**: Discussions must be publicly accessible
- **No custom authentication**: Only GitHub accounts supported
- **Limited customization**: UI constrained by Giscus iframe
- **No inline comments**: Page-level comments only

### 4.2 Custom Comments System Architecture

#### 4.2.1 D1/KV-Based System

```
┌─────────────────────────────────────────────────┐
│           Custom Comments Architecture          │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │  Website     │────▶│  Cloudflare Worker  │   │
│  │  (Astro)     │     │  (API Gateway)      │   │
│  └─────────────┘     └──────────┬──────────┘   │
│                                 │               │
│                    ┌────────────┼────────────┐  │
│                    ▼            ▼            ▼  │
│           ┌─────────────┐ ┌─────────┐ ┌────────┐
│           │     D1      │ │   KV    │ │   R2   │
│           │  (Comments) │ │ (Cache) │ │(Media) │
│           └─────────────┘ └─────────┘ └────────┘
└─────────────────────────────────────────────────┘
```

#### 4.2.2 D1 Schema for Comments

```sql
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  parent_id TEXT,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  content_html TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES comments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_comments_page ON comments(page_slug);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_user ON comments(user_id);
```

#### 4.2.3 API Endpoints

```
GET    /api/comments/:page_slug     - List comments for a page
POST   /api/comments                 - Create a comment
PUT    /api/comments/:id             - Update a comment
DELETE /api/comments/:id             - Delete a comment
POST   /api/comments/:id/approve     - Approve a comment (moderator)
POST   /api/comments/:id/reject      - Reject a comment (moderator)
POST   /api/comments/:id/spam        - Mark as spam (moderator)
```

### 4.3 Authentication Options

#### 4.3.1 OAuth (GitHub, Google)

**GitHub OAuth Flow:**

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│  Astro   │────▶│  GitHub  │
│  Click   │     │  Redirect│     │  OAuth   │
└──────────┘     └──────────┘     └──────────┘
                                      │
                                      ▼
                                ┌──────────┐
                                │  Token   │
                                │  Exchange│
                                └──────────┘
```

**Implementation:**

```typescript
// Cloudflare Worker OAuth handler
async function handleOAuth(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirect to GitHub OAuth
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=read:user`;
    return Response.redirect(authUrl);
  }
  
  // Exchange code for token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  
  const { access_token } = await tokenResponse.json();
  
  // Get user info
  const userResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  
  const user = await userResponse.json();
  
  // Create JWT session
  const jwt = await createJWT({
    sub: user.id.toString(),
    login: user.login,
    name: user.name,
    avatar: user.avatar_url,
  });
  
  return new Response(JSON.stringify({ token: jwt }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

#### 4.3.2 Magic Links (Email)

**Flow:**

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│  Enter   │────▶│  Send    │
│  Email   │     │  Email   │     │  Magic   │
└──────────┘     └──────────┘     │  Link    │
                                  └──────────┘
                                      │
                                      ▼
                                ┌──────────┐
                                │  Click   │
                                │  Link    │
                                └──────────┘
                                      │
                                      ▼
                                ┌──────────┐
                                │  Auth    │
                                │  Session │
                                └──────────┘
```

**Implementation:**

```typescript
// Magic link generation
async function sendMagicLink(email: string, env: Env): Promise<Response> {
  const token = crypto.randomUUID();
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  
  // Store token in D1
  await env.DB.prepare(
    'INSERT INTO magic_links (token, email, expires_at) VALUES (?, ?, ?)'
  ).bind(token, email, new Date(expires).toISOString()).run();
  
  // Send email via Cloudflare Email Workers or Resend
  await sendEmail({
    to: email,
    subject: 'Sign in to Wikisites',
    html: `
      <h1>Sign in to Wikisites</h1>
      <p>Click the link below to sign in:</p>
      <a href="https://wikipept.com/auth/magic?token=${token}">
        Sign in to Wikisites
      </a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
  
  return new Response(JSON.stringify({ success: true }));
}
```

#### 4.3.3 Passkeys (WebAuthn)

**Flow:**

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│  Create  │────▶│  Store   │
│  Passkey │     │  Credential│   │  in DB   │
└──────────┘     └──────────┘     └──────────┘
                                      │
                                      ▼
                                ┌──────────┐
                                │  Login   │
                                │  with    │
                                │  Passkey │
                                └──────────┘
```

### 4.4 Spam Prevention Strategies

#### 4.4.1 Multi-Layered Approach

```
┌─────────────────────────────────────────────────┐
│           Spam Prevention Layers                │
│                                                 │
│  Layer 1: Rate Limiting                         │
│  ├─ IP-based (30 requests/minute)              │
│  ├─ User-based (10 comments/minute)            │
│  └─ Page-based (20 comments/page/hour)         │
│                                                 │
│  Layer 2: CAPTCHA                               │
│  ├─ Cloudflare Turnstile (invisible)           │
│  └─ reCAPTCHA v3 (score-based)                 │
│                                                 │
│  Layer 3: Content Analysis                      │
│  ├─ Keyword filtering                          │
│  ├─ Link detection                             │
│  └─ Sentiment analysis                         │
│                                                 │
│  Layer 4: User Reputation                       │
│  ├─ Account age                                │
│  ├─ Comment history                            │
│  └─ Moderation flags                           │
│                                                 │
│  Layer 5: Human Moderation                      │
│  ├─ Queue for review                           │
│  └─ Community reporting                        │
└─────────────────────────────────────────────────┘
```

#### 4.4.2 Rate Limiting Implementation

```typescript
// Rate limiting middleware
async function checkRateLimit(identifier: string, limits: RateLimits): Promise<boolean> {
  const key = `rate:${identifier}`;
  const now = Date.now();
  const window = limits.windowMs;
  
  // Get current count from KV
  const current = await KV.get(key, 'json') as { count: number; resetAt: number } || { count: 0, resetAt: now + window };
  
  if (now > current.resetAt) {
    // Window expired, reset
    await KV.put(key, JSON.stringify({ count: 1, resetAt: now + window }), { expirationTtl: Math.ceil(window / 1000) });
    return true;
  }
  
  if (current.count >= limits.maxRequests) {
    return false;
  }
  
  // Increment count
  await KV.put(key, JSON.stringify({ count: current.count + 1, resetAt: current.resetAt }), { expirationTtl: Math.ceil((current.resetAt - now) / 1000) });
  return true;
}
```

### 4.5 SSR Compatibility with Astro

#### 4.5.1 Islands Architecture Integration

```astro
---
// src/pages/article/[slug].astro
import CommentsIsland from '../../components/comments/CommentsIsland.tsx';

const { slug } = Astro.params;
---

<article>
  <h1>{title}</h1>
  <div set:html={content} />
</article>

<!-- Comments loaded via SolidJS island -->
<CommentsIsland 
  client:visible 
  pageSlug={slug} 
  theme={Astro.props.theme}
/>

<style>
  /* Comments container styles */
  .comments-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
  }
</style>
```

#### 4.5.2 Client Directives

| Directive | Behavior | Use Case |
|-----------|----------|----------|
| `client:load` | Hydrate immediately | Critical for SEO |
| `client:visible` | Hydrate when visible | Below-fold comments |
| `client:idle` | Hydrate when idle | Non-urgent features |
| `client:only` | Client-only rendering | Browser API required |

### 4.6 Privacy Considerations (GDPR)

#### 4.6.1 Data Processing Requirements

| Data Type | Purpose | Legal Basis | Retention |
|-----------|---------|-------------|-----------|
| Email | Authentication | Consent | Account lifetime |
| Username | Display | Consent | Account lifetime |
| IP Address | Rate limiting | Legitimate interest | 30 days |
| User Agent | Analytics | Legitimate interest | 30 days |
| Comment Content | Display | Consent | Until deleted |
| Usage Analytics | Improvement | Legitimate interest | 1 year |

#### 4.6.2 GDPR Compliance Checklist

- [ ] Consent mechanism for data collection
- [ ] Right to access (data export)
- [ ] Right to erasure (account deletion)
- [ ] Data portability (JSON export)
- [ ] Privacy policy update
- [ ] Cookie consent integration
- [ ] Data processing agreement with Cloudflare
- [ ] Cross-border data transfer safeguards

### 4.7 Performance Impact (Lazy Loading)

#### 4.7.1 Loading Strategy

```
┌─────────────────────────────────────────────────┐
│           Loading Priority                      │
│                                                 │
│  Priority 1: Critical Content                   │
│  ├─ Article HTML                               │
│  ├─ Navigation                                 │
│  └─ Core CSS/JS                                │
│                                                 │
│  Priority 2: Interactive Features               │
│  ├─ Quiz components                            │
│  ├─ Flashcard components                       │
│  └─ Search functionality                       │
│                                                 │
│  Priority 3: Social Features                    │
│  ├─ Comments (lazy loaded)                     │
│  ├─ Annotations (on demand)                    │
│  └─ User profiles                              │
└─────────────────────────────────────────────────┘
```

#### 4.7.2 Lazy Loading Implementation

```typescript
// Comments lazy loading component
function CommentsLazy({ pageSlug }: { pageSlug: string }) {
  const [loaded, setLoaded] = createSignal(false);
  const [ref, setRef] = createSignal<HTMLDivElement>();
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    if (ref()) {
      observer.observe(ref());
    }
    
    onCleanup(() => observer.disconnect());
  });
  
  return (
    <div ref={setRef} class="comments-section">
      <Show when={loaded()} fallback={<div class="comments-placeholder">Loading comments...</div>}>
        <Comments pageSlug={pageSlug} />
      </Show>
    </div>
  );
}
```

---

## 5. Algorithm Specification

### 5.1 Comment Threading Algorithm

#### 5.1.1 Purpose

Organizes flat comment list into hierarchical thread structure.

#### 5.1.2 Algorithm

```
FUNCTION buildCommentThread(comments):
  // Create lookup map
  commentMap = {}
  roots = []
  
  FOR EACH comment IN comments:
    commentMap[comment.id] = {
      ...comment,
      children: []
    }
  
  // Build tree
  FOR EACH comment IN comments:
    IF comment.parent_id IS NULL THEN
      roots.APPEND(commentMap[comment.id])
    ELSE IF comment.parent_id IN commentMap THEN
      commentMap[comment.parent_id].children.APPEND(commentMap[comment.id])
  
  // Sort by creation date
  FUNCTION sortByDate(items):
    RETURN items.SORT(by: created_at ASCENDING)
  
  roots = sortByDate(roots)
  
  FOR EACH root IN roots:
    root.children = sortByDate(root.children)
    FOR EACH child IN root.children:
      child.children = sortByDate(child.children)
  
  RETURN roots
END FUNCTION
```

### 5.2 Spam Detection Algorithm

#### 5.2.1 Purpose

Scores comments for spam likelihood using multiple signals.

#### 5.2.2 Algorithm

```
FUNCTION calculateSpamScore(comment, user):
  score = 0.0
  
  // Content analysis
  IF comment.content CONTAINS urls THEN
    score += 0.3
    IF urls COUNT > 3 THEN
      score += 0.2
  
  IF comment.content MATCHES spam_keywords THEN
    score += 0.4
  
  IF comment.content.LENGTH < 10 THEN
    score += 0.1
  
  // User reputation
  IF user.account_age_days < 7 THEN
    score += 0.2
  
  IF user.comment_count < 3 THEN
    score += 0.1
  
  IF user.spam_flags > 0 THEN
    score += 0.3 * user.spam_flags
  
  // Rate limiting signals
  IF user.comments_last_hour > 5 THEN
    score += 0.2
  
  // IP reputation
  IF ip IN known_spam_ips THEN
    score += 0.5
  
  // Machine learning score (optional)
  ml_score = predictSpam(comment.content)
  score = (score * 0.7) + (ml_score * 0.3)
  
  RETURN MIN(score, 1.0)
END FUNCTION
```

### 5.3 Notification Algorithm

#### 5.3.1 Purpose

Notifies users of new comments on subscribed pages.

#### 5.3.2 Algorithm

```
FUNCTION notifySubscribers(comment):
  // Get page subscribers
  subscribers = DB.SELECT(
    'SELECT user_id FROM subscriptions WHERE page_slug = ?',
    comment.page_slug
  )
  
  // Get parent comment author (if reply)
  IF comment.parent_id IS NOT NULL THEN
    parent = DB.SELECT('SELECT user_id FROM comments WHERE id = ?', comment.parent_id)
    IF parent.user_id NOT IN subscribers THEN
      subscribers.APPEND(parent.user_id)
    END IF
  END IF
  
  // Exclude comment author
  subscribers = subscribers.FILTER(s => s != comment.user_id)
  
  // Send notifications
  FOR EACH subscriber IN subscribers:
    // Check notification preferences
    preferences = KV.get(`prefs:${subscriber.user_id}`, 'json')
    
    IF preferences.email_notifications THEN
      sendEmailNotification(subscriber, comment)
    END IF
    
    IF preferences.push_notifications THEN
      sendPushNotification(subscriber, comment)
    END IF
    
    // Store in-app notification
    DB.INSERT('notifications', {
      user_id: subscriber.user_id,
      type: 'comment',
      comment_id: comment.id,
      read: false,
      created_at: new Date().toISOString()
    })
  END FOR
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for comments system algorithms are defined in `test_vectors/test_vectors_social_editor_ext.toml`. Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Comment Threading   | 8            | Thread building and sorting       |
| Spam Detection      | 10           | Spam scoring and classification   |
| Authentication      | 6            | OAuth, magic link, passkey flows  |
| Rate Limiting       | 6            | Rate limit enforcement            |
| **Total**           | **30**       |                                   |

### 6.2 Validation Criteria

1. Comment threading produces correct hierarchical structure
2. Spam detection accurately identifies malicious content
3. Authentication flows complete successfully
4. Rate limiting prevents abuse without blocking legitimate users
5. GDPR compliance requirements are met

---

## 7. Domain Constraints

### 7.1 Comment Constraints

All constraints defined in `domain_constraints/domain_constraints_social.toml`.

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max comment length | 10,000 characters | Prevents abuse |
| Max nesting depth | 3 levels | Prevents deep threads |
| Max comments per page | 1,000 | Performance limit |
| Max comments per user per hour | 10 | Rate limiting |

### 7.2 Performance Constraints

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Comment load time | < 500ms | > 2s |
| Comment submission | < 500ms | > 2s |
| Page LCP with comments | < 2.5s | > 4s |
| Bundle size (comments) | < 15KB | > 30KB |

### 7.3 Security Constraints

| Parameter | Requirement |
|-----------|-------------|
| Authentication | Required for commenting |
| Rate limiting | 30 requests/minute per IP |
| Content sanitization | HTML tags stripped |
| CSP compliance | No inline scripts |
| CORS policy | Same-origin only |

---

## 8. Bibliography

### 8.1 Comments System References

1. Giscus Contributors. (2024). _Giscus: A comments system powered by GitHub Discussions_. https://giscus.app **[TQA-5]**

2. GitHub Documentation. (2024). _GitHub Discussions API_. https://docs.github.com/en/discussions **[TQA-5]**

3. Cloudflare D1 Documentation. (2024). _D1 Database_. https://developers.cloudflare.com/d1/ **[TQA-5]**

4. Cloudflare KV Documentation. (2024). _Key Value Storage_. https://developers.cloudflare.com/kv/ **[TQA-5]**

### 8.2 Authentication References

5. OAuth Community Site. (2024). _OAuth 2.0_. https://oauth.net **[TQA-5]**

6. Auth0. (2024). _JSON Web Tokens_. https://jwt.io **[TQA-5]**

7. FIDO Alliance. (2024). _WebAuthn_. https://fidoalliance.org/fido2/ **[TQA-5]**

### 8.3 Privacy References

8. European Union. (2016). _General Data Protection Regulation (GDPR)_. https://gdpr.eu **[TQA-5]**

9. Cloudflare. (2024). _Data Processing Agreement_. https://www.cloudflare.com/dpa/ **[TQA-5]**

### 8.4 Performance References

10. Addy Osmani. (2020). _Learning Core Web Vitals_. https://web.dev/vitals/ **[TQA-5]**

11. Astro Contributors. (2024). _Astro Documentation_. https://docs.astro.build **[TQA-5]**

12. SolidJS Contributors. (2024). _SolidJS Documentation_. https://www.solidjs.com **[TQA-5]**

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Comments system      | 评论系统     | система комментариев | Kommentarsystem       | Système de commentaires    | コメントシステム         |
| Spam prevention      | 垃圾邮件防护 | предотвращение спама | Spam-Prevention       | Prévention du spam         | スパム対策               |
| Authentication       | 身份验证     | аутентификация       | Authentifizierung    | Authentification           | 認証                    |
| GDPR                 | 通用数据保护条例 | GDPR               | DSGVO                 | RGPD                       | 個人情報保護法           |
| Lazy loading         | 延迟加载     | отложенная загрузка  | Lazy Loading          | Chargement différé         | 遅延読み込み            |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `CommentsSystem`      | Comment management platform      | `storesIn`, `authenticatesVia`, `moderatesBy`   |
| `User`                | Comment author                   | `writes`, `subscribesTo`, `moderates`           |
| `Comment`             | Individual comment               | `repliesTo`, `authoredBy`, `storedIn`           |
| `SpamPrevention`      | Anti-spam mechanism              | `detects`, `blocks`, `flags`                    |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Giscus integration fully specified
- [ ] Custom comments system architecture defined
- [ ] Authentication options documented with implementation details
- [ ] Spam prevention strategies specified
- [ ] SSR compatibility with Astro documented
- [ ] GDPR compliance requirements specified
- [ ] Performance impact analysis complete

### 10.2 Accuracy

- [ ] Giscus configuration matches official documentation
- [ ] D1 schema includes all required fields
- [ ] Authentication flows follow OAuth 2.0 specification
- [ ] Rate limiting parameters are reasonable
- [ ] All technical claims traceable to official documentation

### 10.3 Consistency

- [ ] Nomenclature consistent with framework documentation
- [ ] Algorithm inputs/outputs match domain constraint specifications
- [ ] Performance targets consistent across all sections
- [ ] Security requirements aligned with OWASP guidelines

### 10.4 Traceability

- [ ] All architecture decisions traceable to requirements
- [ ] Performance constraints traceable to Core Web Vitals
- [ ] Technology choices traceable to project goals
- [ ] Bibliography includes official documentation links

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Algorithm specifications are implementation-ready
- [ ] Knowledge graph concepts enable documentation linking
- [ ] Cross-lingual terms support i18n implementation