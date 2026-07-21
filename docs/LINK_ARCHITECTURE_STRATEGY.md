# Link Architecture Strategy: Wikisites → Kingston Peptides

## Business Model

```
Tier 2 backlinks ──→ wikipept.com ──→ kingstonpeptides.com
                   ──→ encyclopeptide.com ──→ kingstonpeptides.com
```

**Goal:** Build authority on wiki sites via Tier 2 links, funnel that authority to kingstonpeptides.com via contextual outbound links.

---

## Site Roles

| Site | Role | Domain Authority Target | Content Purpose |
|------|------|------------------------|-----------------|
| **kingstonpeptides.com** | Money site (commercial) | N/A — receives authority | Product pages, checkout |
| **wikipept.com** | Tier 1 buffer (educational) | DA 30-40 in 12 months | Learn, quizzes, flashcards, tools |
| **encyclopeptide.com** | Tier 1 buffer (reference) | DA 35-45 in 12 months | 6,519 peptide monographs |

---

## Tier 2 Backlink Strategy

### What to Buy

| Type | Quality | Cost | Volume | Priority |
|------|---------|------|--------|----------|
| **Niche guest posts** | High | $50-150/article | 5-10/month | High |
| **Niche edits (link insertions)** | High | $30-100/link | 10-20/month | High |
| **HARO/Connectively responses** | Free-High | $0 | 5-10/month | High |
| **Academic citations** | Highest | $0 (organic) | Ongoing | Highest |
| **Niche directory listings** | Medium | $10-50/listing | 5-10 one-time | Medium |
| **Podcast mentions** | High | $0-200 | 1-2/month | Medium |
| **Niche forum profiles** | Low-Medium | $0-20 | 10-20 one-time | Low |

### What NOT to Buy

| Type | Risk | Why |
|------|------|-----|
| PBN links | CRITICAL | Google devalues PBNs aggressively |
| Web 2.0 spam | HIGH | No authority, obvious pattern |
| SAPE links | CRITICAL | Russian link network, manual penalty bait |
| Fiverr backlinks | HIGH | Usually PBN or spam |
| Mass directory submissions | MEDIUM | Low quality, no topical relevance |
| Comment spam | HIGH | No value, spam signals |

### Anchor Text Distribution

| Anchor Type | % of Total | Example |
|-------------|-----------|---------|
| **Branded** | 40-50% | "Kingston Peptides", "KingstonPeptides.com" |
| **Naked URL** | 20-25% | "https://kingstonpeptides.com" |
| **Generic** | 15-20% | "here", "this supplier", "research supplies" |
| **Topical** | 5-10% | "peptide research supplies", "amino acid supplier" |
| **Exact match** | 0-2% | "buy peptides online" (AVOID — over-optimized) |

### Anchor Text Rules
- NEVER use "buy peptides", "peptide supplier", "research peptides for sale"
- NEVER use exact-match commercial anchors
- ALWAYS use branded or natural language
- Vary anchor text across pages — no two pages should have identical anchor

---

## Outbound Link Placement Strategy

### Phase 1: Foundation (Month 1) — Site-Wide Footer Links

Add 2 site-wide links (low effort, low risk):

**Wiki site footer** in `BaseLayout.astro`:
```html
<footer>
  <p>Research supplies provided by <a href="https://kingstonpeptides.com" 
     rel="noopener">Kingston Peptides</a></p>
</footer>
```

**Encp site footer** — same pattern.

**Risk:** LOW. Footer links are common and expected.

### Phase 2: Tool Pages (Month 2) — High-Value Contextual

Add contextual links to 3-5 tool/calculator pages:

| Page | Link Context | Anchor |
|------|-------------|--------|
| `/tools/molecular-weight-calculator` | "Need research-grade peptides for your calculations?" | "Kingston Peptides" |
| `/learn/reconstitution` | "For research supplies and BAC water" | "Kingston Peptides" |
| `/learn/peptide-calculations` | "Calibrated equipment available from" | "Kingston Peptides" |
| `/learn/peptide-storage` | "Storage supplies and desiccants" | "here" |
| `/learn/peptide-safety` | "PPE and safety equipment" | "research supplies" |

**Risk:** LOW-MEDIUM. Contextually relevant, non-promotional.

### Phase 3: Encyclopedia Articles (Month 3-4) — Deep Contextual

Add 1-2 links to high-traffic encyclopeptide articles:

| Article | Link Context | Anchor |
|---------|-------------|--------|
| Semaglutide | "Synthesized using Fmoc-amino acids from" | "Kingston Peptides" |
| Oxytocin | "Research-grade available from" | "Kingston Peptides" |
| BPC-157 | "Laboratory supplies from" | "here" |
| PT-141 | "Research compounds available via" | "Kingston Peptides" |

**Rules:**
- Maximum 1 kingstonpeptides.com link per article
- Place in a "Supplies" or "Resources" section, not inline
- Use `rel="noopener"` on all outbound links
- Never link from article titles or H1/H2 headings

### Phase 4: Content Expansion (Month 5+) — Link Magnets

Create content that naturally attracts backlinks AND links to kingstonpeptides.com:

| Content Type | Linkability | Link to KP |
|-------------|-------------|------------|
| Peptide comparison tables | HIGH | Supplier section |
| Amino acid reference charts | HIGH | "Available from" |
| HPLC analysis guides | MEDIUM | Equipment mention |
| SPPS protocol guides | MEDIUM | Reagent supplier |
| Peptide stability data | HIGH | Research context |

---

## Page-Level Link Budget

| Page Type | Max KP Links | Placement |
|-----------|-------------|-----------|
| Homepage | 0 | Never link from homepage |
| Learn pages (18) | 1 per page | "Resources" section |
| Practical guides (5) | 1 per page | "Supplies" section |
| Tool pages (1) | 1 per page | CTA section |
| Topic hubs (6) | 0 | Hubs don't link to commercial |
| Encyclopedia articles (6,519) | 1 per page max | "Materials" section |
| Quiz/flashcard tag pages | 0 | Don't pollute learning pages |
| Quiz/flashcard index pages | 0 | Don't pollute learning pages |

**Total outbound KP links:** ~50-100 across all pages (thin distribution is safe)

---

## Tier 2 Backlink Targets

### Priority 1: High-Authority, High-Relevance

| Source | DA | Type | Content to Pitch |
|--------|-----|------|-----------------|
| peptide-synthesis.org | 40+ | Guest post | "Modern SPPS techniques" |
| americanpeptidesociety.org | 35+ | Citation | Reference our articles |
| rcsb.org (PDB) | 50+ | Citation | Link our tools as reference |
| pubmed.ncbi.nlm.nih.gov | 80+ | Citation | Cite our articles in reviews |
| coursera/edx courses | 60+ | Resource link | "Additional resources" section |
| university course pages | 50+ | Resource link | Syllabus recommended reading |

### Priority 2: Niche Relevant Sites

| Source | DA | Type | Approach |
|--------|-----|------|----------|
| Lab supply blogs | 25-40 | Guest post | "Peptide handling best practices" |
| Biotech news sites | 30-50 | Press release | Company milestones |
| Research institution blogs | 40-60 | Resource link | "Helpful tools for researchers" |
| Chemistry forums | 20-35 | Profile + posts | Authority building |
| Reddit r/peptides | 90+ | Organic | Community engagement (no spam) |
| Quora questions | 90+ | Answers | "What is the MW of semaglutide?" → link calculator |

### Priority 3: General Authority

| Source | DA | Type | Cost |
|--------|-----|------|------|
| Medium.com | 90+ | Article | Free |
| LinkedIn articles | 95+ | Article | Free |
| GitHub repos | 95+ | README link | Free |
| YouTube descriptions | 99+ | Link in description | Free |
| Podcast interviews | 40-70 | Show notes link | $0-200 |

---

## Link Velocity Guidelines

| Month | Tier 2 Links/Month | KP Outbound Links | Total New Links |
|-------|-------------------|-------------------|-----------------|
| 1 | 5-10 | 2 (footer) | 7-12 |
| 2 | 10-15 | 5 (tool pages) | 15-20 |
| 3 | 15-20 | 10 (learn pages) | 25-30 |
| 4 | 15-20 | 15 (articles) | 30-35 |
| 5+ | 10-15 (maintenance) | 5-10 (new content) | 15-25 |

**Key:** Natural link velocity for educational sites is 10-30 new links/month. Don't spike.

---

## Risk Mitigation

### Detection Avoidance

| Risk | Mitigation |
|------|------------|
| Same owner detection | Use different registrars, different hosting IPs, different analytics IDs |
| Same content patterns | Ensure wiki content is genuinely different from KP product pages |
| Overt optimization | Keep KP links <2% of total outbound links per page |
| Anchor text over-optimization | Never exceed 5% exact-match anchors |
| Link velocity spike | Maintain consistent 10-30 links/month |
| Same GA/Adsense | Use separate Google accounts for each site |
| WHOIS correlation | Use privacy protection on all domains |

### Recovery Plan

If a wiki site gets penalized:
1. Remove ALL KP outbound links immediately
2. Disavow all Tier 2 links
3. Submit reconsideration request
4. Rebuild with higher-quality content
5. Resume link building at 50% reduced velocity

---

## Success Metrics

| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| DA (wikipept) | 15 | 25 | 35 |
| DA (encyclopeptide) | 20 | 30 | 40 |
| Referring domains (KP) | 5 | 15 | 30 |
| Organic traffic (KP) | +10% | +30% | +100% |
| Keyword rankings (KP) | 5 keywords | 15 keywords | 50 keywords |
| KP outbound links | 5 | 30 | 80 |

---

## Content Strategy for Link Attraction

Create these "linkable assets" that naturally attract Tier 2 backlinks:

| Asset | Why People Link | Target Audience |
|-------|----------------|-----------------|
| **MW Calculator** | Free tool, useful | Researchers, students |
| **Peptide database** | Comprehensive reference | Scientists |
| **Reconstitution guide** | Practical, detailed | Lab technicians |
| **Amino acid chart** | Reference material | Students |
| **SPPS protocol** | Method documentation | Chemists |
| **Peptide stability data** | Original research data | Drug developers |
| **Quiz platform** | Learning tool | Students |
| **Flashcard decks** | Study resource | Students |

**These assets are what make the Tier 2 links look natural.** Google sees other sites linking to genuinely useful tools, which validates the authority.
