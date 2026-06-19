# Wikisites API Reference

> **Version:** 2.0.0 | **Last Updated:** 2026-06-19

REST API reference for the Wikisites backend (Cloudflare Workers + D1).

**Base URL:** `https://api.wikisites.com` (production) or `http://localhost:8787` (local development)

**Content-Type:** `application/json`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Health Check](#2-health-check)
3. [Search](#3-search)
4. [Annotations](#4-annotations)
5. [Comments](#5-comments)
6. [Settings Sync](#6-settings-sync)
7. [Plugin Registry](#7-plugin-registry)
8. [Error Responses](#8-error-responses)
9. [Rate Limiting](#9-rate-limiting)

---

## 1. Authentication

Wikisites uses OAuth 2.0 for authentication. Supported providers: GitHub, Google.

### OAuth Flow

#### Step 1: Initiate Login

```
GET /api/auth/login?provider={provider}&redirect={redirect_uri}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider` | string | Yes | `github` or `google` |
| `redirect` | string | No | URI to redirect after auth (default: `/`) |

**Response (302):** Redirects to the OAuth provider's authorization page.

#### Step 2: Callback

```
GET /api/auth/callback?code={code}&state={state}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | Authorization code from provider |
| `state` | string | Yes | CSRF protection state token |

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_abc123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "avatar": "https://avatars.githubusercontent.com/u/123",
    "role": "reader",
    "provider": "github",
    "createdAt": "2026-06-19T00:00:00Z"
  }
}
```

#### Step 3: Use Token

Include the JWT in the `Authorization` header for authenticated requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Token Refresh

```
POST /api/auth/refresh
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
```

### Get Current User

```
GET /api/auth/me
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "id": "usr_abc123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "contributor",
  "provider": "github",
  "createdAt": "2026-06-19T00:00:00Z",
  "lastLoginAt": "2026-06-19T12:00:00Z"
}
```

### User Roles

| Role | Permissions |
|------|-------------|
| `reader` | Read articles, take quizzes, review flashcards |
| `contributor` | All reader permissions + create annotations, comments |
| `moderator` | All contributor permissions + moderate annotations, comments |
| `admin` | All permissions including content management |

---

## 2. Health Check

```
GET /api/health
```

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": 1750339200000
}
```

---

## 3. Search

```
GET /api/search?q={query}&type={type}&limit={limit}
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | Yes | — | Search query |
| `type` | string | No | `all` | `all`, `article`, `quiz`, `flashcard`, `glossary` |
| `limit` | integer | No | `20` | Max results (1–50) |

**Response (200):**

```json
{
  "results": [
    {
      "id": "peptide-bonds",
      "type": "article",
      "title": "Peptide Bond Chemistry",
      "snippet": "A peptide bond forms between the carboxyl group of one amino acid...",
      "url": "/learn/peptide-bonds",
      "score": 0.95
    }
  ],
  "total": 42,
  "query": "peptide bond"
}
```

**Note:** Search is primarily handled client-side via Pagefind. This API endpoint exists for programmatic access and rate limiting.

---

## 4. Annotations

Annotations are user-created notes attached to specific article sections.

### List Annotations

```
GET /api/annotations?article={slug}&page={page}&limit={limit}
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `article` | string | Yes | — | Article slug |
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `20` | Results per page (1–50) |

**Response (200):**

```json
{
  "annotations": [
    {
      "id": "ann_001",
      "article": "peptide-bonds",
      "section": "formation",
      "content": "This is also called a condensation reaction because water is released.",
      "author": {
        "id": "usr_abc123",
        "name": "Jane Doe",
        "avatar": "https://avatars.githubusercontent.com/u/123"
      },
      "createdAt": "2026-06-19T10:30:00Z",
      "updatedAt": "2026-06-19T10:30:00Z",
      "likes": 5,
      "status": "approved"
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 20
}
```

### Create Annotation

```
POST /api/annotations
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "article": "peptide-bonds",
  "section": "formation",
  "content": "This is also called a condensation reaction because water is released."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `article` | string | Yes | Article slug |
| `section` | string | Yes | Heading ID within the article |
| `content` | string | Yes | Annotation text (1–2000 characters) |

**Response (201):**

```json
{
  "id": "ann_002",
  "article": "peptide-bonds",
  "section": "formation",
  "content": "This is also called a condensation reaction because water is released.",
  "author": {
    "id": "usr_abc123",
    "name": "Jane Doe",
    "avatar": "https://avatars.githubusercontent.com/u/123"
  },
  "createdAt": "2026-06-19T11:00:00Z",
  "status": "pending"
}
```

### Update Annotation

```
PUT /api/annotations/{id}
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "content": "Updated annotation text."
}
```

**Response (200):** Updated annotation object.

### Delete Annotation

```
DELETE /api/annotations/{id}
Authorization: Bearer {token}
```

**Response (204):** No content.

### Like Annotation

```
POST /api/annotations/{id}/like
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "likes": 6,
  "liked": true
}
```

---

## 5. Comments

Comments are discussion threads on articles (top-level or replies).

### List Comments

```
GET /api/comments?article={slug}&page={page}&limit={limit}
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `article` | string | Yes | — | Article slug |
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `20` | Results per page (1–50) |

**Response (200):**

```json
{
  "comments": [
    {
      "id": "cmt_001",
      "article": "peptide-bonds",
      "parentId": null,
      "content": "Great explanation of the formation mechanism!",
      "author": {
        "id": "usr_abc123",
        "name": "Jane Doe",
        "avatar": "https://avatars.githubusercontent.com/u/123"
      },
      "createdAt": "2026-06-19T10:30:00Z",
      "likes": 3,
      "replies": 2
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 20
}
```

### Create Comment

```
POST /api/comments
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "article": "peptide-bonds",
  "parentId": null,
  "content": "Great explanation of the formation mechanism!"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `article` | string | Yes | Article slug |
| `parentId` | string | No | Parent comment ID for replies (null for top-level) |
| `content` | string | Yes | Comment text (1–5000 characters) |

**Response (201):** Created comment object.

### Update Comment

```
PUT /api/comments/{id}
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "content": "Updated comment text."
}
```

**Response (200):** Updated comment object.

### Delete Comment

```
DELETE /api/comments/{id}
Authorization: Bearer {token}
```

**Response (204):** No content.

### Like Comment

```
POST /api/comments/{id}/like
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "likes": 4,
  "liked": true
}
```

---

## 6. Settings Sync

Sync user settings, flashcard state, and quiz history to D1.

### Get Synced Settings

```
GET /api/settings
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "theme": "dark",
  "language": "en",
  "fontSize": "medium",
  "quizHistory": {
    "totalQuizzes": 42,
    "averageScore": 78,
    "byTopic": {
      "amino-acids": { "attempted": 12, "correct": 10 },
      "peptide-bonds": { "attempted": 8, "correct": 6 }
    }
  },
  "flashcardState": [
    {
      "id": "glycine",
      "due": "2026-06-20T00:00:00Z",
      "interval": 4,
      "easeFactor": 2.5,
      "reviews": 5
    }
  ],
  "updatedAt": "2026-06-19T12:00:00Z"
}
```

### Update Settings

```
PUT /api/settings
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "theme": "dark",
  "language": "en",
  "fontSize": "large"
}
```

**Response (200):**

```json
{
  "updated": true,
  "updatedAt": "2026-06-19T12:30:00Z"
}
```

### Sync Flashcard State

```
POST /api/settings/flashcards
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "cards": [
    {
      "id": "glycine",
      "due": "2026-06-20T00:00:00Z",
      "interval": 4,
      "easeFactor": 2.5,
      "reviews": 5,
      "lastRating": 3
    }
  ]
}
```

**Response (200):**

```json
{
  "synced": 1,
  "updatedAt": "2026-06-19T12:30:00Z"
}
```

---

## 7. Plugin Registry

Browse, install, and manage plugins.

### List Plugins

```
GET /api/plugins?page={page}&limit={limit}&category={category}
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `20` | Results per page (1–50) |
| `category` | string | No | — | Filter: `content`, `analysis`, `study`, `export` |

**Response (200):**

```json
{
  "plugins": [
    {
      "id": "plg_3dmol",
      "name": "3D Molecular Viewer",
      "description": "Render 3D molecular structures inline in articles.",
      "version": "1.2.0",
      "category": "content",
      "author": "wikisites",
      "downloads": 1520,
      "rating": 4.8,
      "permissions": ["content:read", "ui:inject"]
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 20
}
```

### Get Plugin Details

```
GET /api/plugins/{id}
```

**Response (200):**

```json
{
  "id": "plg_3dmol",
  "name": "3D Molecular Viewer",
  "description": "Render 3D molecular structures inline in articles.",
  "version": "1.2.0",
  "category": "content",
  "author": "wikisites",
  "entry": "https://cdn.wikisites.com/plugins/3dmol@1.2.0/plugin.js",
  "permissions": ["content:read", "ui:inject"],
  "changelog": "Added support for PDB file rendering.",
  "homepage": "https://github.com/wikisites/plugin-3dmol"
}
```

### Install Plugin

```
POST /api/plugins/{id}/install
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "installed": true,
  "pluginId": "plg_3dmol",
  "version": "1.2.0"
}
```

### Uninstall Plugin

```
DELETE /api/plugins/{id}/install
Authorization: Bearer {token}
```

**Response (204):** No content.

### List Installed Plugins

```
GET /api/plugins/installed
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "installed": [
    {
      "pluginId": "plg_3dmol",
      "version": "1.2.0",
      "installedAt": "2026-06-19T10:00:00Z",
      "enabled": true
    }
  ]
}
```

### Update Plugin

```
POST /api/plugins/{id}/update
Authorization: Bearer {token}
```

**Response (200):**

```json
{
  "updated": true,
  "pluginId": "plg_3dmol",
  "previousVersion": "1.1.0",
  "newVersion": "1.2.0"
}
```

---

## 8. Error Responses

All error responses follow a consistent format:

```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE",
  "details": {}
}
```

### HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (success, no body) |
| 400 | Bad Request — invalid parameters |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found — resource does not exist |
| 409 | Conflict — resource already exists |
| 429 | Rate Limit Exceeded — too many requests |
| 500 | Internal Server Error |

### Error Codes

| Code | Meaning |
|------|---------|
| `VALIDATION_ERROR` | Request body failed validation |
| `UNAUTHORIZED` | Authentication required or token expired |
| `FORBIDDEN` | Insufficient role permissions |
| `NOT_FOUND` | Resource does not exist |
| `ALREADY_EXISTS` | Duplicate resource |
| `RATE_LIMITED` | Too many requests |
| `INTERNAL_ERROR` | Unexpected server error |

---

## 9. Rate Limiting

Rate limits are enforced per IP address.

### Default Limits

| Endpoint | Window | Max Requests |
|----------|--------|--------------|
| `/api/search` | 60 seconds | 30 |
| `/api/auth/*` | 60 seconds | 10 |
| `/api/annotations` | 60 seconds | 20 |
| `/api/comments` | 60 seconds | 20 |
| `/api/settings` | 60 seconds | 30 |
| `/api/plugins` | 60 seconds | 60 |

### Rate Limit Headers

All responses include rate limit headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests in window |
| `X-RateLimit-Remaining` | Requests remaining in window |
| `X-RateLimit-Reset` | Unix timestamp when window resets |

### Rate Limit Exceeded

When rate limited, the response is `429 Too Many Requests`:

```json
{
  "error": "Rate limit exceeded. Try again later.",
  "code": "RATE_LIMITED",
  "retryAfter": 30
}
```

---

*Wikisites API Reference — Encyclopeptide & Wikipept*
