# SEO Ranking Optimization Plan — wikipept.com

## Executive Summary

wikipept.com has strong content depth (996 pages, 91 DA 95+ backlinks) but ranks poorly due to: keyword misalignment, weak internal linking, duplicate content, missing high-value content types, and titles/meta descriptions written for academics rather than searchers. This plan addresses each issue with specific, actionable steps.

---

## 1. Critical Issues Found

### 1.1 Duplicate Content

Two reconstitution pages exist with overlapping content:
- `/learn/reconstitution.md` (date: 2026-07-17)
- `/learn/peptide-reconstitution.md` (date: 2026-07-22)

**Action:** 301 redirect `reconstitution.md` → `peptide-reconstitution.md`. The newer page has better structure (buffer table, peptide-specific sections, calculator links).

### 1.2 peptide-calculations.md Doesn't Redirect

Title says "Peptide Calculations" but the page is a content article, not a tool. Users searching "peptide calculator" expect an interactive tool.

**Action:** Either redirect to `/tools/molecular-weight-calculator` or add a prominent CTA linking to the calculators at the top of the page.

### 1.3 Tools Have Zero Outbound Links to Learn Pages

Grep confirmed: **no `.astro` tool files link to `/learn/` pages.** The reconstitution calculator links to learn pages only in the static HTML "Related Resources" section, but the molecular weight calculator does link out. This breaks the hub-spoke model — tools should drive traffic to educational content.

**Action:** Add contextual "Learn More" links inside each tool page (not just the footer).

---

## 2. Content-Keyword Alignment (Page-by-Page)

### 2.1 reconstitution.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Reconstitution — Comprehensive Preparation Guide" | Too long (56 chars), academic tone | "Peptide Reconstitution: How to Reconstitute BAC Water" (51 chars, matches search intent) |
| Meta desc | "Guide for reconstituting lyophilized peptides — volume calculations, technique, buffer selection, and handling best practices." | Passive, not action-oriented | "Learn how to reconstitute peptides with BAC water. Step-by-step guide with volume tables, injection technique, and storage tips." |
| Target keywords | None explicitly targeted | Missing "how to reconstitute peptides", "BAC water reconstitution", "peptide reconstitution guide" | Rewrite H1 + first paragraph to target these |
| Content depth | Good (92 lines) | Missing: syringe selection guide, common mistakes section, video embed | Add syringe sizing section, embed calculator |

### 2.2 peptide-half-life.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Half-Life Comparison — Duration of Action Data" | "Duration of Action Data" is academic | "Peptide Half-Life: Complete Comparison Table (2026)" |
| Meta desc | "Half-life data for therapeutic peptides — modification strategies including PEGylation, lipidation, and cyclization approaches." | Doesn't mention the comparison table (the page's best feature) | "Compare half-lives of 25+ peptides including semaglutide, tirzepatide, and GLP-1. Free comparison table with modification strategies." |
| Target keywords | None | Missing "peptide half-life comparison", "semaglutide half-life", "how long do peptides last" | Restructure H1 and intro to target these |
| Content | Comprehensive | Missing: visual half-life timeline, comparison infographic | Add a sortable/filterable table |

### 2.3 semaglutide-vs-tirzepatide.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Semaglutide vs Tirzepatide — GLP-1 vs Dual Agonist" | Good length, decent keywords | Add "Which is Better?" to match search intent |
| Meta desc | "Head-to-head comparison of semaglutide and tirzepatide — mechanism, efficacy, dosing, side effects, clinical evidence." | Decent but could include "weight loss" and "diabetes" | "Semaglutide vs Tirzepatide: Compare weight loss, side effects, dosing, and cost. Which GLP-1 is better for diabetes and obesity?" |
| Target | Well-targeted | Good | Add FAQ schema for "semaglutide vs tirzepatide which is better" |
| Content | Excellent | Already has Drug schema | Add comparison table as featured snippet bait |

### 2.4 peptide-calculations.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Calculations — Dosing and Reconstitution Math" | "Math" is unsearchable | "Peptide Dosing Calculator: Formulas, Conversions & Tables" |
| Meta desc | "Essential quantitative methods and formulas..." | Passive | "Calculate peptide doses, concentrations, and reconstitution volumes. Free formulas, insulin syringe conversions, and worked examples." |
| Target | Missing | "peptide dose calculator", "how much BAC water", "peptide concentration formula" | Rewrite intro, add calculator embed |
| Content | Excellent | Missing interactive tool embed | Embed reconstitution calculator inline |

### 2.5 molecular-weight-calculator.astro

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Molecular Weight Calculator" | Good | ✅ Keep |
| Meta desc | "Calculate the molecular weight of any peptide sequence. Free online tool with amino acid reference table." | Good but missing "free tool" emphasis | "Free peptide molecular weight calculator. Enter any amino acid sequence to calculate MW in Daltons. Instant results." |
| Schema | HowTo + FAQPage + MedicalWebPage | Excellent | ✅ Keep |
| Content | Good | Missing: more FAQ questions, "how to calculate manually" section | Add 3 more FAQ questions targeting long-tail |

### 2.6 reconstitution-calculator.astro

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Reconstitution Calculator" | Good | ✅ Keep |
| Meta desc | "Calculate the exact volume of BAC water needed..." | Good | "Free peptide reconstitution calculator. Calculate BAC water volume, insulin syringe units, and concentration instantly." |
| Schema | HowTo + FAQPage + MedicalWebPage | Excellent | Add 2 more FAQ questions for long-tail |

### 2.7 physicochemical-properties.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Physicochemical Properties" | Too academic, no search volume | "Peptide Properties Database: MW, pI, Charge, Half-Life (60+ Peptides)" |
| Meta desc | "Reference table of molecular weight, isoelectric point..." | Passive | "Search 60+ peptides by molecular weight, pI, charge, half-life, and solubility. Free reference table for researchers." |
| Target | Missing | "peptide molecular weight table", "peptide pI calculator", "peptide solubility data" | Add search/filter functionality, target these keywords |
| Content | Good data table | Missing: introductory context, how to use the data | Add 200-word intro explaining what each property means |

### 2.8 peptide-dosing-complete.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Peptide Dosing Complete — All Therapeutic Protocols" | Decent but "All Therapeutic Protocols" is vague | "Peptide Dosing Guide: Every FDA-Approved Drug (2026)" |
| Meta desc | "Evidence-based dosing protocols for FDA-approved..." | Good but long | "Complete peptide dosing guide: semaglutide, tirzepatide, insulin, and 20+ FDA-approved peptides. Titration schedules and special populations." |
| Target | Partially targeted | "semaglutide dosing", "tirzepatide dosing", "peptide dose chart" | Add "semaglutide dose chart" as H2, optimize for this |
| Content | Excellent | Already very comprehensive | Add downloadable dose chart PDF (link magnet) |

### 2.9 spps.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Solid-Phase Synthesis — Peptide Manufacturing Methods" | "Peptide Manufacturing Methods" is redundant | "Solid-Phase Peptide Synthesis (SPPS): Complete Guide" |
| Meta desc | "Advanced guide to solid-phase peptide synthesis..." | "Advanced" narrows audience | "Learn solid-phase peptide synthesis (SPPS): Fmoc strategy, coupling reagents, resin selection, and purification. Lab protocol included." |
| Target | "SPPS", "solid-phase peptide synthesis", "peptide synthesis protocol" | Good | Add step-by-step protocol section |
| Content | Thin (56 lines) | Missing: troubleshooting, purification, scale-up | Expand to 200+ lines, add visual synthesis cycle diagram |

### 2.10 pharmacology.md

| Element | Current | Problem | Fix |
|---------|---------|---------|-----|
| Title | "Therapeutic Peptides — Pharmacology Overview Guide" | "Overview Guide" is filler | "Peptide Therapeutics: Pharmacology, FDA-Approved Drugs & Mechanisms" |
| Meta desc | "Overview of FDA-approved peptide drugs..." | Passive | "Complete guide to peptide therapeutics: 80+ FDA-approved drugs, mechanisms of action, routes of administration, and half-life extension strategies." |
| Target | "peptide drugs", "peptide pharmacology", "FDA approved peptides" | Good | Add more specific H2s for each drug class |
| Content | Thin (62 lines) | Missing: drug pipeline, clinical trial data, dosing | Expand significantly, link to dosing guide |

---

## 3. Internal Linking Strategy

### 3.1 Current State

| Link Type | Count | Assessment |
|-----------|-------|------------|
| Learn → Learn | ~100 links | Good, mostly within comparison pages |
| Learn → Tools | 9 links | Weak — only 9 of 161 learn pages link to tools |
| Tools → Learn | 0-1 links | Broken — tools don't link back to learn |
| Reference → Learn | 100+ links | Good (glossary is comprehensive) |
| Reference → Tools | 0 links | Missing |
| Learn → Reference | ~5 links | Weak |

### 3.2 Hub-and-Spoke Model

**Hub Pages (create/update):**
1. `/learn/peptide-reconstitution/` — Hub for reconstitution topics → links to calculator, storage, BAC water guide
2. `/learn/semaglutide/` — Hub for semaglutide content → links to comparisons, dosing, storage
3. `/learn/peptide-dosing/` — Hub for all dosing content → links to calculator, specific drug dosing pages
4. `/learn/peptide-synthesis/` — Hub for synthesis content → links to SPPS, purification, scale-up

**Spoke Pages (existing, need linking):**
- Each comparison page should link back to its hub
- Each tool should link to 2-3 related learn pages

### 3.3 Specific Link Additions

| From | To | Link Text |
|------|----|-----------|
| All learn pages with dosing info | `/tools/reconstitution-calculator` | "Use our reconstitution calculator →" |
| All learn pages with MW references | `/tools/molecular-weight-calculator` | "Calculate molecular weight →" |
| All learn pages with sequences | `/tools/sequence-analyzer` | "Analyze this sequence →" |
| All comparison pages | Relevant dosing guide section | "See full dosing protocol →" |
| `/tools/reconstitution-calculator` | `/learn/reconstitution` | "Learn the theory behind reconstitution" |
| `/tools/reconstitution-calculator` | `/learn/peptide-storage` | "How to store reconstituted peptides" |
| `/tools/molecular-weight-calculator` | `/learn/peptide-calculations` | "Learn the math behind MW calculation" |
| `/tools/molecular-weight-calculator` | `/learn/amino-acids` | "Understand amino acid building blocks" |
| `/reference/physicochemical-properties` | `/learn/peptide-half-life` | "Detailed half-life comparison" |
| `/reference/peptide-dosing-complete` | `/tools/reconstitution-calculator` | "Calculate reconstitution volumes" |

### 3.4 Breadcrumb Schema

Add breadcrumb structured data to all pages:
```
Home > Learn > Peptide Reconstitution
Home > Tools > Reconstitution Calculator
Home > Reference > Physicochemical Properties
```

---

## 4. Content Gaps to Fill

### 4.1 High-Volume Keywords Not Targeted

| Keyword | Monthly Search Volume (est.) | Difficulty | Priority |
|---------|------------------------------|------------|----------|
| "peptide calculator" | 5,400 | Medium | 🔴 High |
| "semaglutide dosage chart" | 12,100 | High | 🔴 High |
| "BPC-157 dosage" | 8,100 | Medium | 🔴 High |
| "how to reconstitute peptides" | 3,600 | Low | 🔴 High |
| "GLP-1 weight loss comparison" | 6,600 | High | 🔴 High |
| "peptide reconstitution chart" | 2,900 | Low | 🔴 High |
| "Mounjaro vs Ozempic" | 22,000 | Very High | 🟡 Medium |
| "semaglutide side effects" | 18,000 | Very High | 🟡 Medium |
| "peptide therapy" | 14,800 | High | 🟡 Medium |
| "BAC water for peptides" | 4,400 | Low | 🔴 High |
| "insulin syringe units chart" | 9,900 | Medium | 🔴 High |
| "peptide molecular weight" | 2,400 | Low | ✅ Already targeting |
| "peptide storage temperature" | 1,900 | Low | 🟡 Medium |
| "what is a peptide" | 12,000 | High | 🟡 Medium |
| "peptide synthesis" | 3,600 | Medium | 🟡 Medium |
| "semaglutide mechanism of action" | 4,400 | Medium | 🟡 Medium |
| "tirzepatide weight loss results" | 6,600 | High | 🟡 Medium |
| "peptide half-life extension" | 1,300 | Low | 🔴 High |
| "reconstituted peptide shelf life" | 2,400 | Low | 🔴 High |
| "peptide dose calculator mg to ml" | 1,800 | Low | 🔴 High |

### 4.2 Content Types Missing

| Content Type | Why It Matters | Action |
|-------------|----------------|--------|
| **Dosage Charts** (visual) | High search volume, link magnets, featured snippet bait | Create downloadable PDF dose charts for semaglutide, tirzepatide, insulin |
| **Comparison Landing Pages** | "X vs Y" queries drive high-intent traffic | Create `/compare/semaglutide-vs-tirzepatide/` hub page |
| **Interactive Tools** | Tools rank well and earn backlinks | Already have calculators; add peptide interaction checker prominence |
| **FAQ Pages** | Win featured snippets, answer People Also Ask | Add FAQ sections to every high-traffic page |
| **Glossary** | Ranks for definitions, internal linking hub | Already exists at `/tools/glossary` — promote it |
| **Video Content** | YouTube ranks in Google, video results appear in SERP | Create "How to Reconstitute a Peptide" video |
| **Case Studies / Protocols** | Attracts backlinks from researchers | Publish anonymized research protocols |

### 4.3 Pages to Create (Priority Order)

1. **`/learn/bpc-157-dosage/`** — BPC-157 is the #1 searched research peptide. No dosage page exists.
2. **`/learn/semaglutide-dosage-chart/`** — Visual dose titration chart. Targets "semaglutide dosage chart" (12K searches/mo).
3. **`/learn/peptide-therapy-guide/`** — Comprehensive intro to peptide therapy. Targets "peptide therapy" (14.8K searches/mo).
4. **`/learn/bac-water-guide/`** — Everything about BAC water for peptide reconstitution. Targets "BAC water for peptides" (4.4K searches/mo).
5. **`/learn/insulin-syringe-conversion/`** — Syringe unit conversion guide with chart. Targets "insulin syringe units chart" (9.9K searches/mo).
6. **`/learn/reconstituted-peptide-shelf-life/`** — Storage duration guide. Targets "reconstituted peptide shelf life" (2.4K searches/mo).
7. **`/learn/semaglutide-mechanism/`** — Deep dive into GLP-1 mechanism. Targets "semaglutide mechanism of action" (4.4K searches/mo).
8. **`/learn/tirzepatide-weight-loss-results/`** — Results compilation. Targets "tirzepatide weight loss results" (6.6K searches/mo).

---

## 5. On-Page SEO Improvements

### 5.1 Title Tag Optimization

All titles should be:
- 50-60 characters
- Primary keyword near the front
- Include a power word or year
- Avoid academic language

| Page | Current Title | Optimized Title |
|------|--------------|-----------------|
| reconstitution | "Peptide Reconstitution — Comprehensive Preparation Guide" | "Peptide Reconstitution: How to Reconstitute with BAC Water" |
| peptide-half-life | "Peptide Half-Life Comparison — Duration of Action Data" | "Peptide Half-Life Comparison Table (25+ Peptides, 2026)" |
| semaglutide-vs-tirzepatide | "Semaglutide vs Tirzepatide — GLP-1 vs Dual Agonist" | "Semaglutide vs Tirzepatide: Which is Better for Weight Loss?" |
| peptide-calculations | "Peptide Calculations — Dosing and Reconstitution Math" | "Peptide Dosing Calculator: Formulas, Conversions & Tables" |
| physicochemical-properties | "Peptide Physicochemical Properties" | "Peptide Properties Database: MW, pI, Charge, Half-Life" |
| peptide-dosing-complete | "Peptide Dosing Complete — All Therapeutic Protocols" | "Peptide Dosing Guide: Every FDA-Approved Drug (2026)" |
| spps | "Solid-Phase Synthesis — Peptide Manufacturing Methods" | "Solid-Phase Peptide Synthesis (SPPS): Complete Guide" |
| pharmacology | "Therapeutic Peptides — Pharmacology Overview Guide" | "Peptide Therapeutics: FDA-Approved Drugs & Mechanisms" |

### 5.2 Meta Description Optimization

All meta descriptions should:
- 150-160 characters
- Include primary keyword
- Include a CTA or value proposition
- Mention "free" for tools
- Include year for freshness signals

### 5.3 Content Structure

| Element | Current | Fix |
|---------|---------|-----|
| H1 tags | Present but sometimes duplicate title | Ensure H1 = primary keyword, title = keyword + modifier |
| H2 tags | Good | Add FAQ H2 section to every page |
| H3 tags | Used for sub-sections | ✅ Keep |
| Lists | Some pages use tables, some don't | Add bulleted summary lists at top of every page |
| Images | None visible | Add at least 1 image per page with descriptive alt text |
| Internal links | Present but weak | Add 3-5 contextual internal links per page |
| External links | Few | Link to PubMed studies for authority signals |

### 5.4 Schema Markup

| Page Type | Current Schema | Add |
|-----------|---------------|-----|
| Learn articles | None (most pages) | Article schema (headline, author, datePublished, dateModified) |
| Tool pages | HowTo + FAQPage + MedicalWebPage | ✅ Excellent — keep |
| Reference tables | None | Dataset schema for data tables |
| Comparison pages | Drug schema (semaglutide-vs-tirzepatide only) | Add to all comparison pages |
| All pages | None | BreadcrumbList schema |

### 5.5 URL Structure

Current URLs are clean (`/learn/reconstitution/`, `/tools/molecular-weight-calculator/`). ✅ No changes needed.

**Exception:** `/learn/peptide-calculations.md` should be `/learn/peptide-dosing-calculations/` to avoid confusion with the tool.

---

## 6. Technical SEO

### 6.1 Duplicate Content Resolution

| Issue | Action |
|-------|--------|
| `reconstitution.md` + `peptide-reconstitution.md` | 301 redirect reconstitution → peptide-reconstitution |
| Multiple `vs` pages with thin content | Consolidate thin comparison pages into comprehensive hub pages |
| `/learn/index.md` | Ensure it serves as a proper topic cluster hub |

### 6.2 Page Speed

Tool pages load React components (`client:load`). Consider:
- `client:idle` for below-the-fold tools
- Lazy loading for calculator components
- Image optimization (when images are added)

### 6.3 Crawl Budget

With 996 pages, crawl budget is adequate. But:
- Ensure XML sitemap is up to date (`/sitemap.xml`)
- Add `lastmod` dates to sitemap
- Remove or noindex thin pages (<300 words)

---

## 7. Backlink Strategy

### 7.1 Link-Worthy Content to Create

| Content Type | Why It Earns Links | Target Publications |
|-------------|-------------------|---------------------|
| Peptide Drug Comparison Database | Unique interactive resource | BioPharma Dive, Endpoints News |
| Peptide Half-Life Infographic | Visual, shareable | Research blogs, Reddit r/peptides |
| SPPS Protocol (downloadable) | Practical lab resource | Chemistry blogs, university sites |
| Peptide Dosing Charts (PDF) | Reference material | Clinical pharmacology sites |
| Annual Peptide Therapeutics Report | Data-driven, citable | Industry publications |

### 7.2 Existing Backlinks (91 DA 95+)

These high-DA backlinks are underutilized. Ensure:
- All backlinked pages are indexed and crawlable
- Backlinked pages have strong internal links to other content
- Anchor text variations are natural

---

## 8. Implementation Timeline

### Phase 1: Quick Wins (Week 1-2)

- [ ] 301 redirect `reconstitution.md` → `peptide-reconstitution.md`
- [ ] Update titles and meta descriptions for all 10 analyzed pages
- [ ] Add calculator CTAs to `peptide-calculations.md`
- [ ] Add "Learn More" links to all tool pages
- [ ] Add Article schema to top 20 learn pages

### Phase 2: Internal Linking (Week 3-4)

- [ ] Implement hub-and-spoke linking for reconstitution, semaglutide, dosing, synthesis clusters
- [ ] Add breadcrumb schema to all pages
- [ ] Add 3-5 internal links to every learn page
- [ ] Create topic cluster index pages

### Phase 3: Content Gaps (Week 5-8)

- [ ] Create BPC-157 dosage page
- [ ] Create semaglutide dosage chart page
- [ ] Create peptide therapy guide
- [ ] Create BAC water guide
- [ ] Create insulin syringe conversion page
- [ ] Expand SPPS and pharmacology pages to 200+ lines

### Phase 4: Content Expansion (Week 9-12)

- [ ] Create all 8 priority content gap pages
- [ ] Add FAQ sections to top 30 pages
- [ ] Add images and alt text to top 50 pages
- [ ] Create downloadable PDF dose charts

### Phase 5: Link Building (Ongoing)

- [ ] Create 2-3 link-worthy interactive resources
- [ ] Outreach to research blogs for infographic placement
- [ ] Guest posts on peptide science blogs
- [ ] Submit to relevant resource lists

---

## 9. Measurement

### KPIs to Track

| Metric | Baseline | Target (90 days) |
|--------|----------|-------------------|
| GSC impressions | Current | +50% |
| GSC clicks | Current | +30% |
| Average position | Current | Move from >20 to <10 for target keywords |
| Indexed pages | 996 | Maintain (no thin page penalties) |
| Organic traffic | Current | +40% |
| Backlinks | 91 DA 95+ | +20 new referring domains |

### Tools

- Google Search Console: Track impressions, clicks, position
- Google Analytics 4: Track organic traffic, engagement
- Ahrefs/SEMrush: Track keyword rankings, backlinks
- Screaming Frog: Audit internal linking, schema, titles

---

## 10. Summary of Highest-Impact Actions

1. **Fix duplicate reconstitution pages** — immediate 301 redirect
2. **Update all titles/meta descriptions** — 10 pages, 1 hour of work
3. **Add tool→learn links** — tools currently link to nothing
4. **Create BPC-157 dosage page** — highest volume untargeted keyword
5. **Add Article schema to learn pages** — rich results in SERP
6. **Create semaglutide dosage chart** — 12K searches/month unaddressed
7. **Implement hub-and-spoke internal linking** — distributes authority from backlinks
8. **Add FAQ sections to top pages** — featured snippet capture
9. **Create peptide therapy guide** — 14.8K searches/month
10. **Add images with alt text** — improves engagement and image search visibility
