# Rollback Procedures

**Version:** 1.0
**Last Updated:** 2026-06-19

## Content Rollback (Git Revert)

Use when content changes (wiki pages, markdown) need to be undone.

### Step-by-Step

1. Identify the commit to revert:
   ```bash
   git log --oneline -20
   ```

2. Revert the specific commit:
   ```bash
   git revert <commit-sha>
   ```

3. Push the revert commit:
   ```bash
   git push origin main
   ```

4. The CI/CD pipeline will automatically build and deploy the reverted content.

### Verification

- Check the wiki site to confirm the content change is undone
- Verify no related code was bundled with the content commit

## Code Rollback (Cloudflare Pages)

Use when deployed code (JS bundles, CSS, Astro build output) has a breaking issue.

### Step-by-Step

1. List recent deployments:
   ```bash
   bunx wrangler pages deployment list --project-name=wikisites-wiki
   ```

2. Roll back to the last known-good deployment:
   ```bash
   bunx wrangler pages deployment rollback <deployment-id> --project-name=wikisites-wiki
   ```

3. Repeat for the encp site if needed:
   ```bash
   bunx wrangler pages deployment rollback <deployment-id> --project-name=wikisites-encp
   ```

4. Verify both sites load correctly.

### Quick Rollback via Dashboard

1. Go to Cloudflare Dashboard > Pages > wikisites-wiki
2. Navigate to Deployments tab
3. Find the last working deployment
4. Click "..." > "Rollback to this deployment"

## Database Rollback (D1 Point-in-Time Recovery)

Use when database schema migrations or data writes have caused issues.

### Step-by-Step

1. List available backups:
   ```bash
   bunx wrangler d1 backups list wikisites-db
   ```

2. Create a new database from a backup (point-in-time):
   ```bash
   bunx wrangler d1 restore wikisites-db --backup=<backup-id>
   ```

3. Update the worker binding to point to the restored database if needed.

4. Redeploy the worker:
   ```bash
   bunx wrangler deploy
   ```

### Caution

- D1 point-in-time recovery creates a **new** database
- You must update `wrangler.toml` bindings to point to the restored DB
- Coordinate with any environment variable updates
- Take a fresh backup before restoring to preserve current state

## Rollback Decision Tree

| Issue | Type | Action |
|-------|------|--------|
| Broken page content | Content | `git revert` |
| Broken JS/CSS bundle | Code | Cloudflare Pages rollback |
| Bad DB migration | Database | D1 backup restore |
| Bad worker deploy | Code | `wrangler rollback` |
| Mixed (code + data) | Both | Code rollback first, then DB if needed |

## Post-Rollback Checklist

- [ ] Confirm the site is functional
- [ ] Check error monitoring for new issues
- [ ] Notify the team of the rollback
- [ ] Document the root cause
- [ ] Fix forward before re-deploying
