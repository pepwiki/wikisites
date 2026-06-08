# Encyclopeptide Content Quality Standard

Every article published on encyclopeptide.com MUST conform to this standard. Non-compliant articles will be rejected.

## Mandatory Frontmatter Fields

Every article MUST include ALL of the following in its YAML frontmatter:

```yaml
---
title: "Full Chemical Name or Common Name"
description: "One-sentence summary (50-160 characters). Must state what the peptide IS, not what it DOES."
status: "published"  # draft | review | published | deprecated
author: "Author Name"  # Must be real person or recognized editorial board
pubDate: YYYY-MM-DD    # Publication date
updatedDate: YYYY-MM-DD  # Optional, last modification date
tags: ["tag1", "tag2"]  # Minimum 2, maximum 8 tags from approved list
category: "Category"    # Must be from approved category list
difficulty: "intermediate"  # beginner | intermediate | advanced | expert
citation:
  doi: "10.xxxx/xxxxx"  # Required. DOI must resolve.
  authors: ["Author1", "Author2"]  # Minimum 1, maximum 10
  journal: "Journal Name"  # Required if available
  year: YYYY              # Required. Publication year.
  pmid: "12345678"       # Optional. PubMed ID.
relatedArticles: ["slug1", "slug2"]  # Minimum 1, maximum 5. Must reference existing articles.
---
```

## Approved Categories

| Category | Description |
|----------|-------------|
| Tripeptides | 3-residue peptides |
| Pentapeptides | 5-residue peptides |
| Nonapeptides | 9-residue peptides |
| Octapeptides | 8-residue peptides |
| Opioid Peptides | Pain modulation peptides |
| Neuropeptides | Nervous system signaling peptides |
| Hormones | Endocrine signaling peptides |
| GI Peptides | Gastrointestinal peptides |
| Cardiac Peptides | Heart-related peptides |
| Vasoactive Peptides | Blood vessel tone peptides |
| Hypothalamic Peptides | Brain regulatory peptides |
| Tachykinins | NK receptor family peptides |
| Incretins | Metabolic regulatory peptides |
| Peptide Hormones | Systemic hormone peptides |
| Antimicrobial Peptides | Immune defense peptides |
| Drug Design | Peptide drug design principles |
| Pharmacology | Drug mechanism and PK/PD |
| Pharmaceutical Science | Formulation and stability |
| Materials Science | Peptide-based materials |
| Neuroscience | Brain and nerve peptides |
| Immunology | Immune system peptides |
| Oncology | Cancer-related peptides |
| Structural Biology | 3D structure and dynamics |
| Cell Biology | Cellular mechanisms |
| Diagnostics | Diagnostic applications |
| Regenerative Medicine | Tissue repair applications |
| Microbiology | Microbial interactions |

## Approved Tags

amino-acids, peptide-bond, protein-structure, pharmacology, drug-design, synthesis, purification, receptors, signaling, metabolism, half-life, bioavailability, clinical-trials, regulatory, gpcr, kinase, phosphatase, enzyme, inhibitor, agonist, antagonist, agonism, antagonism, binding, affinity, selectivity, potency, efficacy, pk-pd, admet, formulation, stability, aggregation, immunogenicity, pegylation, cyclization, stapling, conjugation, nanoparticle, hydrogel, self-assembly, vaccine, biosensor, imaging, radiotherapy

## Mandatory Content Sections

Every article MUST contain ALL of the following sections in this order:

### 1. Chemical Identity Table

A table with EXACTLY these columns:

| Property | Value |
|----------|-------|
| Chemical Formula | [Exact molecular formula with subscripts] |
| Molecular Weight | [Exact value in Da, from peer-reviewed source] |
| CAS Number | [Valid CAS RN, verified] |
| IUPAC Name | [Systematic name or sequence] |
| Peptide Class | [From approved categories] |
| Sequence Homology | [Comparison to known peptides] |

### 2. Structure

- Amino acid sequence in one-letter or three-letter code
- Structural features (cyclic, linear, disulfide bonds, modifications)
- Secondary structure elements if known

### 3. Biological Functions

- Primary biological role(s)
- Mechanism of action
- Receptor targets (with binding affinity if available)
- Physiological context

### 4. Pharmacological Properties

If the peptide has clinical relevance:
- Half-life (t1/2)
- Bioavailability (F)
- Route of administration
- Therapeutic applications
- Clinical trial status

### 5. Synthesis and Production

- Primary synthesis method (SPPS, recombinant, etc.)
- Key challenges in production
- Purification method

### 6. Clinical Significance

- FDA/EMA approval status (if applicable)
- Current therapeutic use
- Ongoing research areas

## Content Constraints

### Writing Style

- Academic tone, third person
- No promotional language ("revolutionary", "breakthrough", "cutting-edge")
- No emojis
- No first-person ("I", "we", "our")
- Use passive voice for methods, active voice for findings
- Sentences should average 15-25 words

### Data Requirements

- All molecular weights MUST be from peer-reviewed sources (PubMed, UniProt, PDB)
- All CAS numbers MUST be verified via https://www.cas.org/
- All DOIs MUST resolve to actual papers
- All binding affinities MUST include units (Ki, Kd, IC50 in nM or pM)
- All half-lives MUST specify species and tissue if known
- No estimated or rounded values without explicit notation

### Length Requirements

| Difficulty | Minimum Words | Maximum Words |
|------------|---------------|---------------|
| Beginner | 400 | 800 |
| Intermediate | 600 | 1200 |
| Advanced | 800 | 1500 |
| Expert | 1000 | 2000 |

### Citation Requirements

- Minimum 1 citation per article
- Citations MUST include DOI
- Citations MUST be from peer-reviewed journals
- Citations MUST be from the last 20 years (unless seminal paper)
- Maximum 10 citations per article

### Quality Checklist

Before publishing, verify:

- [ ] All mandatory frontmatter fields present
- [ ] Chemical Identity table complete with all 6 rows
- [ ] Molecular weight matches peer-reviewed source
- [ ] CAS number verified
- [ ] DOI resolves
- [ ] Related articles exist and are relevant
- [ ] No promotional language
- [ ] No emojis
- [ ] Word count within limits
- [ ] At least 1 citation with valid DOI
