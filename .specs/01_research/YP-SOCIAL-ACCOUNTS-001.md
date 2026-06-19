---
document_id: YP-SOCIAL-ACCOUNTS-001
title: "User Accounts for Educational Platforms"
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
  Specification of user accounts including authentication (OAuth, magic links,
  passkeys), session management (JWT, Durable Objects), role-based access control
  (reader, contributor, moderator, admin), profile data model, and privacy/GDPR
  compliance (data export, deletion). Defines the user identity framework for both
  sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: User Accounts for Educational Platforms

**Document ID:** YP-SOCIAL-ACCOUNTS-001
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

This Yellow Paper specifies the user accounts system for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for authentication, session management, role-based access control, profile management, and privacy compliance.

### 1.2 Scope

Covers authentication methods (OAuth, magic links, passkeys), session management (JWT, Durable Objects), role-based access control (reader, contributor, moderator, admin), profile data model, privacy/GDPR compliance (data export, deletion), and user preferences. Does not cover comments authentication (reserved for YP-SOCIAL-COMMENTS-001), editor authentication (reserved for YP-EDITOR-MDX-001), or plugin authentication (reserved for YP-EXT-PLUGIN-API-001).

### 1.3 Audience

Backend engineers implementing authentication flows, frontend developers integrating user interfaces, security engineers reviewing authentication and authorization, and privacy officers auditing GDPR compliance.

### 1.4 Normative References

- OAuth 2.0 Specification (https://oauth.net/2/)
- JWT Specification (https://jwt.io)
- FIDO2/WebAuthn (https://fidoalliance.org/fido2/)
- GDPR (Regulation (EU) 2016/679)
- Cloudflare D1 Documentation (https://developers.cloudflare.com/d1/)
- Cloudflare Durable Objects (https://developers.cloudflare.com/durable-objects/)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| OAuth | Open Authorization Protocol                        |
| JWT  | JSON Web Token                                     |
| RBAC | Role-Based Access Control                          |
| MFA  | Multi-Factor Authentication                        |
| TOTP | Time-based One-Time Password                       |
| GDPR | General Data Protection Regulation                 |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a user accounts system that enables learner identity management, tracks contribution history, supports role-based permissions, and complies with privacy regulations. The system must integrate with the Astro islands architecture, provide secure session management, and support multiple authentication methods.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Authentication Methods**: OAuth (GitHub, Google), magic links, passkeys
2. **Session Management**: JWT tokens, Durable Objects for sessions
3. **Role-Based Access Control**: Reader, contributor, moderator, admin roles
4. **Profile Data Model**: User profiles, preferences, contribution history
5. **Privacy/GDPR Compliance**: Data export, deletion, consent management
6. **User Preferences**: Notification settings, display preferences

### 2.3 Key Assumptions

- Primary deployment target: Cloudflare Pages + Workers
- D1 database available for user storage
- Durable Objects available for session management
- Email service available for magic links
- TypeScript strict mode enabled throughout

### 2.4 Success Criteria

- Authentication latency < 500ms
- Session management supports 10,000 concurrent users
- RBAC enforcement at API level
- GDPR compliance verified by privacy audit
- Support for multiple authentication methods simultaneously

---

## 3. Nomenclature and Notation

### 3.1 Authentication Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| OAuth              | Open Authorization protocol for third-party login                 |
| Magic Link         | Email-based passwordless authentication                           |
| Passkey            | FIDO2/WebAuthn credential for passwordless login                  |
| JWT                | JSON Web Token for session management                             |
| Refresh Token      | Long-lived token for obtaining new access tokens                  |
| Access Token       | Short-lived token for API access                                  |

### 3.2 Authorization Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| RBAC               | Role-Based Access Control                                         |
| Role               | Named set of permissions                                          |
| Permission         | Allowed action on resource                                        |
| Scope              | Access level for OAuth tokens                                     |

### 3.3 Session Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Session            | Authenticated user state                                         |
| Durable Object     | Strongly-consistent edge compute with persistence                 |
| Session Store      | Persistent session storage                                        |
| Cookie             | HTTP state management mechanism                                   |

---

## 4. Theoretical Foundation

### 4.1 Authentication Methods

#### 4.1.1 OAuth (GitHub, Google)

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
                                      │
                                      ▼
                                ┌──────────┐
                                │  Create/ │
                                │  Login   │
                                │  User    │
                                └──────────┘
```

**Implementation:**

```typescript
// Cloudflare Worker OAuth handler
async function handleOAuthCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  // Verify state parameter
  const storedState = await KV.get(`oauth-state:${state}`);
  if (!storedState || storedState !== 'valid') {
    return new Response('Invalid state parameter', { status: 403 });
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
  
  const githubUser = await userResponse.json();
  
  // Find or create user in D1
  let user = await env.DB.prepare(
    'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
  ).bind('github', githubUser.id.toString()).first();
  
  if (!user) {
    // Create new user
    const userId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO users (id, provider, provider_id, email, name, avatar, username)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      userId,
      'github',
      githubUser.id.toString(),
      githubUser.email,
      githubUser.name,
      githubUser.avatar_url,
      githubUser.login
    ).run();
    
    user = { id: userId, ...githubUser };
  }
  
  // Create JWT
  const jwt = await createJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role || 'reader',
  });
  
  // Set session cookie
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  response.headers.set('Set-Cookie', 
    `session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
  );
  
  return response;
}
```

#### 4.1.2 Magic Links (Email)

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
                                │  Verify  │
                                │  Token   │
                                └──────────┘
```

**Implementation:**

```typescript
// Magic link generation
async function sendMagicLink(email: string, env: Env): Promise<Response> {
  // Validate email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }
  
  const token = crypto.randomUUID();
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  
  // Store token in D1
  await env.DB.prepare(
    'INSERT INTO magic_links (token, email, expires_at) VALUES (?, ?, ?)'
  ).bind(token, email, new Date(expires).toISOString()).run();
  
  // Send email via Cloudflare Email Workers or Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'auth@wikipept.com',
      to: email,
      subject: 'Sign in to Wikisites',
      html: `
        <h1>Sign in to Wikisites</h1>
        <p>Click the link below to sign in:</p>
        <a href="https://wikipept.com/auth/magic?token=${token}">
          Sign in to Wikisites
        </a>
        <p>This link expires in 15 minutes.</p>
        <p>If you didn't request this email, you can safely ignore it.</p>
      `,
    }),
  });
  
  return new Response(JSON.stringify({ success: true }));
}

// Magic link verification
async function verifyMagicLink(token: string, env: Env): Promise<Response> {
  // Find and validate token
  const magicLink = await env.DB.prepare(
    'SELECT * FROM magic_links WHERE token = ? AND expires_at > ?'
  ).bind(token, new Date().toISOString()).first();
  
  if (!magicLink) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
  }
  
  // Find or create user
  let user = await env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(magicLink.email).first();
  
  if (!user) {
    const userId = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO users (id, email, name) VALUES (?, ?, ?)'
    ).bind(userId, magicLink.email, magicLink.email.split('@')[0]).run();
    
    user = { id: userId, email: magicLink.email };
  }
  
  // Delete used token
  await env.DB.prepare('DELETE FROM magic_links WHERE token = ?').bind(token).run();
  
  // Create JWT
  const jwt = await createJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'reader',
  });
  
  // Set session cookie
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  response.headers.set('Set-Cookie', 
    `session=${jwt}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
  );
  
  return response;
}
```

#### 4.1.3 Passkeys (WebAuthn)

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

### 4.2 Session Management

#### 4.2.1 JWT Structure

```typescript
interface JWTPayload {
  sub: string;        // User ID
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  iat: number;        // Issued at
  exp: number;        // Expiration
  iss: string;        // Issuer
  aud: string;        // Audience
}

type UserRole = 'reader' | 'contributor' | 'moderator' | 'admin';

async function createJWT(payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss' | 'aud'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + 24 * 60 * 60, // 24 hours
    iss: 'wikisites',
    aud: 'wikisites',
  };
  
  // Sign with Cloudflare Workers API
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(fullPayload));
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${body}`));
  
  return `${header}.${body}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;
}
```

#### 4.2.2 Durable Objects for Sessions

```typescript
// Durable Object for session management
export class SessionDO {
  private state: DurableObjectState;
  private sessions: Map<string, SessionData>;
  
  constructor(state: DurableObjectState) {
    this.state = state;
    this.sessions = new Map();
  }
  
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/session/create':
        return this.createSession(request);
      case '/session/validate':
        return this.validateSession(request);
      case '/session/destroy':
        return this.destroySession(request);
      default:
        return new Response('Not found', { status: 404 });
    }
  }
  
  private async createSession(request: Request): Promise<Response> {
    const { userId, jwt } = await request.json();
    
    const session: SessionData = {
      id: crypto.randomUUID(),
      userId,
      jwt,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date().toISOString(),
    };
    
    this.sessions.set(session.id, session);
    await this.state.storage.put(`session:${session.id}`, session);
    
    return new Response(JSON.stringify(session));
  }
  
  private async validateSession(request: Request): Promise<Response> {
    const { sessionId } = await request.json();
    
    const session = await this.state.storage.get<SessionData>(`session:${sessionId}`);
    
    if (!session || new Date(session.expiresAt) < new Date()) {
      return new Response(JSON.stringify({ valid: false }), { status: 401 });
    }
    
    // Update last activity
    session.lastActivity = new Date().toISOString();
    await this.state.storage.put(`session:${session.id}`, session);
    
    return new Response(JSON.stringify({ valid: true, session }));
  }
  
  private async destroySession(request: Request): Promise<Response> {
    const { sessionId } = await request.json();
    
    await this.state.storage.delete(`session:${sessionId}`);
    this.sessions.delete(sessionId);
    
    return new Response(JSON.stringify({ success: true }));
  }
}
```

### 4.3 Role-Based Access Control

#### 4.3.1 Role Hierarchy

```
┌─────────────────────────────────────────────────┐
│           Role Hierarchy                         │
│                                                 │
│  Admin (Full Access)                            │
│  ├─ Manage users                               │
│  ├─ Moderate content                           │
│  ├─ Edit any content                           │
│  └─ System configuration                       │
│                                                 │
│  Moderator (Content Moderation)                 │
│  ├─ Moderate comments                          │
│  ├─ Flag content                               │
│  └─ View user reports                          │
│                                                 │
│  Contributor (Content Creation)                 │
│  ├─ Create articles                            │
│  ├─ Edit own content                           │
│  ├─ Add annotations                            │
│  └─ Comment on articles                        │
│                                                 │
│  Reader (Default)                               │
│  ├─ View articles                              │
│  ├─ Search content                             │
│  └─ Take quizzes                               │
└─────────────────────────────────────────────────┘
```

#### 4.3.2 Permission Matrix

| Permission | Reader | Contributor | Moderator | Admin |
|------------|--------|-------------|-----------|-------|
| view_articles | ✓ | ✓ | ✓ | ✓ |
| take_quizzes | ✓ | ✓ | ✓ | ✓ |
| add_annotations | ✗ | ✓ | ✓ | ✓ |
| comment | ✗ | ✓ | ✓ | ✓ |
| edit_own_content | ✗ | ✓ | ✓ | ✓ |
| edit_any_content | ✗ | ✗ | ✓ | ✓ |
| moderate_content | ✗ | ✗ | ✓ | ✓ |
| manage_users | ✗ | ✗ | ✗ | ✓ |
| system_config | ✗ | ✗ | ✗ | ✓ |

#### 4.3.3 RBAC Middleware

```typescript
// RBAC middleware for Cloudflare Workers
function requireRole(...roles: UserRole[]) {
  return async (request: Request, env: Env): Promise<Response | null> => {
    const jwt = getCookieValue(request, 'session');
    
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), { status: 401 });
    }
    
    const payload = await verifyJWT(jwt, env.JWT_SECRET);
    
    if (!payload) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
    
    if (!roles.includes(payload.role)) {
      return new Response(JSON.stringify({ error: 'Insufficient permissions' }), { status: 403 });
    }
    
    // Add user to request context
    request.user = payload;
    
    return null; // Continue to next handler
  };
}

// Usage
app.get('/api/admin/users', requireRole('admin'), listUsers);
app.post('/api/content/publish', requireRole('contributor', 'moderator', 'admin'), publishContent);
app.post('/api/moderation/flag', requireRole('moderator', 'admin'), flagContent);
```

### 4.4 Profile Data Model

#### 4.4.1 D1 Schema

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  username TEXT UNIQUE,
  avatar TEXT,
  bio TEXT,
  role TEXT DEFAULT 'reader' CHECK (role IN ('reader', 'contributor', 'moderator', 'admin')),
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME,
  email_verified INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  theme TEXT DEFAULT 'system',
  language TEXT DEFAULT 'en',
  email_notifications INTEGER DEFAULT 1,
  push_notifications INTEGER DEFAULT 1,
  show_profile INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_contributions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('article', 'annotation', 'comment', 'quiz_question')),
  content_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_contributions_user ON user_contributions(user_id);
```

### 4.5 Privacy/GDPR Compliance

#### 4.5.1 Data Export

```typescript
// GDPR data export
async function exportUserData(userId: string, env: Env): Promise<Response> {
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  const preferences = await env.DB.prepare('SELECT * FROM user_preferences WHERE user_id = ?').bind(userId).first();
  const contributions = await env.DB.prepare('SELECT * FROM user_contributions WHERE user_id = ?').bind(userId).all();
  const annotations = await env.DB.prepare('SELECT * FROM annotations WHERE author_id = ?').bind(userId).all();
  const comments = await env.DB.prepare('SELECT * FROM comments WHERE user_id = ?').bind(userId).all();
  
  const exportData = {
    user,
    preferences,
    contributions: contributions.results,
    annotations: annotations.results,
    comments: comments.results,
    exportedAt: new Date().toISOString(),
  };
  
  return new Response(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="wikisites-export-${userId}.json"`,
    },
  });
}
```

#### 4.5.2 Data Deletion

```typescript
// GDPR data deletion (right to be forgotten)
async function deleteUserData(userId: string, env: Env): Promise<Response> {
  // Anonymize user data instead of deleting (for referential integrity)
  await env.DB.prepare(
    `UPDATE users SET 
      email = 'deleted-' || id || '@deleted.com',
      name = 'Deleted User',
      avatar = NULL,
      bio = NULL,
      is_active = 0,
      updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).bind(userId).run();
  
  // Delete preferences
  await env.DB.prepare('DELETE FROM user_preferences WHERE user_id = ?').bind(userId).run();
  
  // Anonymize contributions
  await env.DB.prepare(
    `UPDATE user_contributions SET user_id = 'anonymous' WHERE user_id = ?`
  ).bind(userId).run();
  
  // Anonymize annotations
  await env.DB.prepare(
    `UPDATE annotations SET 
      author_id = 'anonymous',
      author_name = 'Deleted User',
      author_avatar = NULL
     WHERE author_id = ?`
  ).bind(userId).run();
  
  // Anonymize comments
  await env.DB.prepare(
    `UPDATE comments SET 
      user_id = 'anonymous',
      author_name = 'Deleted User'
     WHERE user_id = ?`
  ).bind(userId).run();
  
  return new Response(JSON.stringify({ success: true }));
}
```

#### 4.5.3 Consent Management

```typescript
// Consent tracking
interface ConsentRecord {
  userId: string;
  consentType: string;
  granted: boolean;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

async function recordConsent(consent: ConsentRecord, env: Env): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO consent_records (user_id, consent_type, granted, timestamp, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    consent.userId,
    consent.consentType,
    consent.granted ? 1 : 0,
    consent.timestamp.toISOString(),
    consent.ipAddress,
    consent.userAgent
  ).run();
}
```

---

## 5. Algorithm Specification

### 5.1 JWT Validation Algorithm

#### 5.1.1 Purpose

Validates JWT tokens for authentication.

#### 5.1.2 Algorithm

```
FUNCTION verifyJWT(token, secret):
  parts = token.split('.')
  IF parts.length != 3 THEN
    RETURN NULL
  
  header = JSON.parse(base64urlDecode(parts[0]))
  payload = JSON.parse(base64urlDecode(parts[1]))
  signature = base64urlDecode(parts[2])
  
  // Verify algorithm
  IF header.alg != 'HS256' THEN
    RETURN NULL
  
  // Verify signature
  expectedSignature = HMAC-SHA256(secret, `${parts[0]}.${parts[1]}`)
  IF signature != expectedSignature THEN
    RETURN NULL
  
  // Verify expiration
  IF payload.exp < Date.now() / 1000 THEN
    RETURN NULL
  
  // Verify issuer
  IF payload.iss != 'wikisites' THEN
    RETURN NULL
  
  // Verify audience
  IF payload.aud != 'wikisites' THEN
    RETURN NULL
  
  RETURN payload
END FUNCTION
```

### 5.2 Role Permission Check Algorithm

#### 5.2.1 Purpose

Checks if a user has permission for an action.

#### 5.2.2 Algorithm

```
FUNCTION checkPermission(user, permission, resource):
  // Get role permissions
  permissions = ROLE_PERMISSIONS[user.role]
  
  // Check if permission exists
  IF permission NOT IN permissions THEN
    RETURN FALSE
  
  // Check resource-specific permissions
  IF permission == 'edit_own_content' THEN
    RETURN resource.authorId == user.id
  
  IF permission == 'moderate_content' THEN
    RETURN user.role IN ['moderator', 'admin']
  
  IF permission == 'manage_users' THEN
    RETURN user.role == 'admin'
  
  RETURN TRUE
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for user accounts algorithms are defined in `test_vectors/test_vectors_social_editor_ext.toml`. Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| JWT Validation      | 8            | Token creation and verification   |
| RBAC Enforcement    | 10           | Role-based permission checks      |
| OAuth Flows         | 6            | GitHub, Google authentication     |
| Data Export         | 6            | GDPR data export                  |
| **Total**           | **30**       |                                   |

### 6.2 Validation Criteria

1. JWT tokens are created and verified correctly
2. RBAC permissions enforced at API level
3. OAuth flows complete successfully
4. GDPR data export includes all user data
5. Data deletion anonymizes rather than deletes (referential integrity)

---

## 7. Domain Constraints

### 7.1 Authentication Constraints

All constraints defined in `domain_constraints/domain_constraints_social.toml`.

| Parameter | Limit | Notes |
|-----------|-------|-------|
| JWT expiration | 24 hours | Access token lifetime |
| Magic link expiration | 15 minutes | One-time use |
| Session timeout | 24 hours | Inactivity timeout |
| Password complexity | N/A | Passwordless only |

### 7.2 Role Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max admins | 3 | Security limit |
| Max moderators | 10 | Content moderation |
| Role change cooldown | 24 hours | Prevent abuse |

### 7.3 Privacy Constraints

| Parameter | Requirement |
|-----------|-------------|
| Consent tracking | Required for all data collection |
| Data export format | JSON with metadata |
| Deletion method | Anonymization (not hard delete) |
| Retention period | 30 days for inactive accounts |

---

## 8. Bibliography

### 8.1 Authentication References

1. OAuth Community Site. (2024). _OAuth 2.0_. https://oauth.net/2/ **[TQA-5]**

2. Auth0. (2024). _JSON Web Tokens_. https://jwt.io **[TQA-5]**

3. FIDO Alliance. (2024). _WebAuthn_. https://fidoalliance.org/fido2/ **[TQA-5]**

4. Cloudflare. (2024). _Durable Objects_. https://developers.cloudflare.com/durable-objects/ **[TQA-5]**

### 8.2 Authorization References

5. Sandhu, R., et al. (1996). Role-based access control models. _IEEE Computer_, 29(2), 38–47. **[TQA-1]**

6. NIST. (2020). _Role-Based Access Control_. https://csrc.nist.gov/projects/rbac **[TQA-5]**

### 8.3 Privacy References

7. European Union. (2016). _General Data Protection Regulation (GDPR)_. https://gdpr.eu **[TQA-5]**

8. ICO. (2024). _Guide to the GDPR_. https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/ **[TQA-5]**

### 8.4 Storage References

9. Cloudflare D1 Documentation. (2024). _D1 Database_. https://developers.cloudflare.com/d1/ **[TQA-5]**

10. Cloudflare KV Documentation. (2024). _Key Value Storage_. https://developers.cloudflare.com/kv/ **[TQA-5]**

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| User account         | 用户账户     | учётная запись       | Benutzerkonto         | Compte utilisateur         | ユーザーアカウント        |
| Authentication       | 身份验证     | аутентификация       | Authentifizierung    | Authentification           | 認証                    |
| Authorization        | 授权         | авторизация          | Autorisierung         | Autorisation               | 認可                    |
| Role-based access    | 基于角色访问 | доступ на основе ролей| Rollenbasiert        | Basé sur les rôles         | ロールベースアクセス      |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `User`                | Authenticated user               | `hasRole`, `createsContent`, `managesProfile`   |
| `Role`                | Permission set                   | `grantsAccess`, `inheritsFrom`                  |
| `Session`             | Active authentication            | `authenticates`, `expiresAt`                    |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Authentication methods fully specified
- [ ] Session management defined
- [ ] RBAC implementation documented
- [ ] Profile data model specified
- [ ] Privacy/GDPR compliance documented

### 10.2 Accuracy

- [ ] OAuth flows follow RFC 6749
- [ ] JWT implementation follows RFC 7519
- [ ] RBAC follows NIST standards
- [ ] GDPR compliance meets EU requirements

### 10.3 Consistency

- [ ] Nomenclature consistent with industry standards
- [ ] Algorithm inputs/outputs match domain constraints
- [ ] Security requirements aligned with OWASP guidelines

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] Standards compliance documented
- [ ] Bibliography includes official sources

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Algorithm specifications are implementation-ready
- [ ] Cross-lingual terms support i18n