# Migration Scripts Archive

All one-time migration scripts have been executed and are archived here for reference.

| Script | Status | Description |
|--------|--------|-------------|
| `generate-encp-articles.mjs` | ✅ Complete | Generates initial ENCP article content from peptide database |
| `fill-encp-articles.mjs` | ✅ Complete | Fills missing fields in ENCP articles |
| `fill-generic-articles.mjs` | ✅ Complete | Populates generic/filler articles for coverage |
| `fix-encp-titles.mjs` | ✅ Complete | Normalizes and corrects ENCP article titles |
| `fix-encp-dark-mode.mjs` | ✅ Complete | Fixes dark mode styling issues in ENCP pages |
| `fix-generic-descriptions.mjs` | ✅ Complete | Corrects generic article descriptions |
| `fix-corrupt-descriptions.mjs` | ✅ Complete | Repairs corrupted description fields in database |
| `normalize-categories.mjs` | ✅ Complete | Standardizes category names and slugs |
| `audit-encp-peptides.mjs` | ✅ Complete | Audits ENCP peptide entries for completeness |

These scripts are no longer needed for normal operation. Do not re-run unless performing a full database rebuild.
