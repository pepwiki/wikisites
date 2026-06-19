# Data Retention and Deletion Policy

**Version:** 1.0
**Last Updated:** 2026-06-19

## Data Stored

| Data Type | Storage Location | Description |
|-----------|-----------------|-------------|
| Theme preference | localStorage | Starlight theme toggle state (`starlight-theme`) |
| Learning progress | localStorage | Quiz scores, flashcard review history, topic progress (`wikisites:topic-progress`) |
| FSRS card states | localStorage | Spaced repetition scheduling data per deck |
| Daily challenge state | localStorage | Current daily challenge progress (`wikisites:daily-challenge`) |
| RUM metrics | localStorage | Core Web Vitals measurements (`wikisites:rum-metrics`) |
| Theme analytics | localStorage | Theme change events (`wikisites:theme-analytics`) |
| Feedback data | localStorage | Dark mode feedback ratings (`wikisites:theme-feedback`) |
| Page view count | localStorage | Counter for feedback prompt (`wiki:page-views`) |
| User accounts | D1 | Authentication data, email, display name |
| Session tokens | D1 | JWT session records with expiration |
| API keys | D1 | API key hashes and metadata |
| Content revisions | D1 | Wiki page edit history |
| KV cache | KV (CACHE) | Server-side cached data with TTL |

## Retention Periods

| Data Type | Retention | Rationale |
|-----------|-----------|-----------|
| Theme preference | Indefinite | User preference, no PII |
| Learning progress | 365 days | Useful for long-term learning tracking |
| FSRS card states | 365 days | Spaced repetition requires history |
| Daily challenge state | 24 hours | Resets daily by design |
| RUM metrics | 30 days | Performance monitoring |
| Theme analytics | 30 days | UX improvement analysis |
| Feedback data | 90 days | Product improvement cycle |
| Page view counter | Indefinite | Simple counter, no PII |
| User accounts | Until deletion requested | Active account retention |
| Session tokens | 30 days | Security best practice |
| API keys | 365 days or until revoked | Long-lived integration keys |
| Content revisions | Indefinite | Audit trail for wiki content |
| KV cache entries | Per-entry TTL | Typically 5-60 minutes |

## User Deletion Procedures

### Automatic (Data Expiry)

- Session tokens expire after 30 days of inactivity
- KV cache entries are automatically purged by Cloudflare KV
- RUM metrics older than 30 days should be pruned on collection

### Manual Deletion (API Endpoint)

Users can request data deletion via:

```
DELETE /api/user/data
```

This endpoint:
1. Requires authentication (valid session token)
2. Deletes the user's D1 account record
3. Deletes all session tokens for the user
4. Returns confirmation of deleted data types

### Client-Side Data Clearing

Users can clear local data via browser settings or by visiting:
`/settings/data` (Privacy Settings page)

This clears:
- All localStorage entries prefixed with `wikisites:` or `wiki:`
- FSRS card state data
- Service worker cache

## GDPR Compliance

- **Right to Access:** Users can export their data via `GET /api/user/data`
- **Right to Erasure:** The `DELETE /api/user/data` endpoint satisfies this
- **Data Minimization:** Only essential data is collected (no analytics PII)
- **Consent:** Cookie consent banner is shown on first visit (CookieConsent component)
- **No Third-Party Tracking:** Cloudflare Web Analytics is privacy-first (no cookies, IP obfuscation)
- **Storage Limitation:** All data has defined retention periods as above

## Contact

For data protection inquiries, contact the project maintainers via the repository issue tracker.
