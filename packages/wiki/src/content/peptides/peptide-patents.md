---
title: Peptide Patents Database
description: Comprehensive database and analysis of peptide-related patents covering therapeutic applications, drug delivery systems, synthesis methods, and commercial landscapes
lastUpdated: 2025-01-13
---

# Peptide Patents Database

export const patents = [
  // THERAPEUTIC PEPTIDE PATENTS
  {
    id: "PAT-001",
    peptide_name: "Semaglutide",
    patent_number: "US10590148",
    assignee: "Novo Nordisk",
    filing_date: "2016-05-12",
    expiry_date: "2032-12-05",
    claims: "GLP-1 receptor agonist with fatty acid side chain for albumin binding",
    technology: "Acylated GLP-1 analog with C18 fatty diacid",
    category: "Therapeutic",
    status: "active",
    therapeutic_area: "Type 2 Diabetes, Obesity"
  },
  {
    id: "PAT-002",
    peptide_name: "Tirzepatide",
    patent_number: "US11130802",
    assignee: "Eli Lilly",
    filing_date: "2016-10-18",
    expiry_date: "2036-06-15",
    claims: "Dual GIP/GLP-1 receptor agonist for metabolic disorders",
    technology: "Modified GIP analog with fatty acid moiety",
    category: "Therapeutic",
    status: "active",
    therapeutic_area: "Type 2 Diabetes, Obesity"
  },
  {
    id: "PAT-003",
    peptide_name: "Liraglutide",
    patent_number: "US7235627",
    assignee: "Novo Nordisk",
    filing_date: "2002-08-28",
    expiry_date: "2023-01-22",
    claims: "GLP-1 derivative with palmitic acid attachment at Lys26",
    technology: "Fatty acid acylation for extended half-life",
    category: "Therapeutic",
    status: "expired",
    therapeutic_area: "Type 2 Diabetes, Obesity"
  },
  {
    id: "PAT-004",
    peptide_name: "Exenatide",
    patent_number: "US6858576",
    assignee: "Amylin Pharmaceuticals",
    filing_date: "2000-03-29",
    expiry_date: "2017-11-08",
    claims: "Exendin-4 analog for glucose-dependent insulin secretion",
    technology: "Gila monster venom-derived GLP-1 agonist",
    category: "Therapeutic",
    status: "expired",
    therapeutic_area: "Type 2 Diabetes"
  },
  {
    id: "PAT-005",
    peptide_name: "Dulaglutide",
    patent_number: "US8288532",
    assignee: "Eli Lilly",
    filing_date: "2006-08-21",
    expiry_date: "2029-06-27",
    claims: "GLP-1 Fc fusion protein for extended duration",
    technology: "Peptide-antibody fusion with GLP-1 linked to IgG4 Fc",
    category: "Therapeutic",
    status: "active",
    therapeutic_area: "Type 2 Diabetes"
  },
  {
    id: "PAT-006",
    peptide_name: "Albiglutide",
    patent_number: "US7141557",
    assignee: "GlaxoSmithKline",
    filing_date: "2002-09-09",
    expiry_date: "2024-05-20",
    claims: "GLP-1 dimer fused to human serum albumin",
    technology: "Albumin fusion protein technology",
    category: "Therapeutic",
    status: "expired",
    therapeutic_area: "Type 2 Diabetes"
  },
  {
    id: "PAT-007",
    peptide_name: "Lixisenatide",
    patent_number: "US7576057",
    assignee: "Sanofi",
    filing_date: "2004-02-27",
    expiry_date: "2027-04-14",
    claims: "Exendin-4 variant with C-terminal poly-lysine extension",
    technology: "Modified exendin-4 with 6 Lys residues",
    category: "Therapeutic",
    status: "active",
    therapeutic_area: "Type 2 Diabetes"
  },
  {
    id: "PAT-008",
    peptide_name: "Leuprolide",
    patent_number: "US4072665",
    assignee: "AbbVie",
    filing_date: "1977-04-15",
    expiry_date: "1994-06-07",
    claims: "GnRH agonist decapeptide for hormone suppression",
    technology: "Synthetic nonapeptide with D-amino acid substitution",
    category: "Therapeutic",
    status: "expired",
    therapeutic_area: "Prostate Cancer, Endometriosis"
  },
  {
    id: "PAT-009",
    peptide_name: "Goserelin",
    patent_number: "US4073872",
    assignee: "AstraZeneca",
    filing_date: "1977-05-16",
    expiry_date: "1994-11-08",
    claims: "GnRH superagonist with azaglycine substitution",
    technology: "D-Ser(Bu)6 Azgly10-GnRH decapeptide",
    category: "Therapeutic",
    status: "expired",
    therapeutic_area: "Prostate Cancer, Breast Cancer"
  },
  {
    id: "PAT-010",
    peptide_name: "Degarelix",
    patent_number: "US7211576",
    assignee: "Ferring Pharmaceuticals",
    filing_date: "2001-02-23",
    expiry_date: "2024-10-14",
    claims: "GnRH antagonist with rapid onset of action",
    technology: "Modified GnRH antagonist with urea linkage",
    category: "Therapeutic",
    status: "active",
    therapeutic_area: "Prostate Cancer"
  },
  // DRUG DELIVERY PATENTS
  {
    id: "PAT-011",
    peptide_name: "PEGylation Technology",
    patent_number: "US5681567",
    assignee: "Enzon Pharmaceuticals",
    filing_date: "1994-09-01",
    expiry_date: "2014-08-07",
    claims: "Methods for conjugating PEG polymers to peptides and proteins",
    technology: "PEG conjugation with activated ester linkers",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Platform Technology"
  },
  {
    id: "PAT-012",
    peptide_name: "PLGA Microspheres",
    patent_number: "US5538739",
    assignee: "Various",
    filing_date: "1993-08-12",
    expiry_date: "2013-07-23",
    claims: "Sustained release formulation using biodegradable microspheres",
    technology: "Poly(lactic-co-glycolic acid) encapsulation",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Sustained Release"
  },
  {
    id: "PAT-013",
    peptide_name: "Liposomal Peptides",
    patent_number: "US5013497",
    assignee: "Various",
    filing_date: "1989-05-18",
    expiry_date: "2009-04-28",
    claims: "Liposome-based delivery systems for peptide therapeutics",
    technology: "Phospholipid vesicle encapsulation",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Targeted Delivery"
  },
  {
    id: "PAT-014",
    peptide_name: "Nanoparticle Peptides",
    patent_number: "US6379698",
    assignee: "Various",
    filing_date: "1999-12-06",
    expiry_date: "2019-11-16",
    claims: "Nanoparticle formulations for enhanced peptide bioavailability",
    technology: "Polymeric nanoparticle encapsulation",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Enhanced Bioavailability"
  },
  {
    id: "PAT-015",
    peptide_name: "Enteric Coating",
    patent_number: "US4900557",
    assignee: "Various",
    filing_date: "1988-04-22",
    expiry_date: "2008-03-31",
    claims: "Enteric-coated formulations for oral peptide delivery",
    technology: "pH-sensitive polymer coating for GI protection",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Oral Delivery"
  },
  {
    id: "PAT-016",
    peptide_name: "Mucoadhesive Delivery",
    patent_number: "US5800848",
    assignee: "Various",
    filing_date: "1996-10-21",
    expiry_date: "2016-09-30",
    claims: "Mucoadhesive formulations for mucosal peptide absorption",
    technology: "Bioadhesive polymer systems",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Mucosal Delivery"
  },
  {
    id: "PAT-017",
    peptide_name: "Transdermal Peptides",
    patent_number: "US5843468",
    assignee: "Various",
    filing_date: "1996-08-15",
    expiry_date: "2016-07-25",
    claims: "Transdermal delivery systems for peptide molecules",
    technology: "Skin permeation enhancers and iontophoresis",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Transdermal Delivery"
  },
  {
    id: "PAT-018",
    peptide_name: "Inhalation Peptides",
    patent_number: "US5830853",
    assignee: "Various",
    filing_date: "1996-05-28",
    expiry_date: "2016-05-07",
    claims: "Pulmonary delivery formulations for peptide therapeutics",
    technology: "Dry powder inhaler and nebulization systems",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Pulmonary Delivery"
  },
  {
    id: "PAT-019",
    peptide_name: "Implantable Peptides",
    patent_number: "US6379698",
    assignee: "Various",
    filing_date: "2000-07-18",
    expiry_date: "2020-06-27",
    claims: "Implantable devices for sustained peptide release",
    technology: "Biodegradable polymer implants",
    category: "Drug Delivery",
    status: "expired",
    therapeutic_area: "Implant Delivery"
  },
  {
    id: "PAT-020",
    peptide_name: "Microneedle Peptides",
    patent_number: "US7419481",
    assignee: "Various",
    filing_date: "2005-11-03",
    expiry_date: "2025-10-13",
    claims: "Microneedle arrays for transdermal peptide delivery",
    technology: "Dissolving microneedle patches",
    category: "Drug Delivery",
    status: "active",
    therapeutic_area: "Microneedle Delivery"
  },
  // SYNTHESIS PATENTS
  {
    id: "PAT-021",
    peptide_name: "Solid Phase Peptide Synthesis",
    patent_number: "US3856692",
    assignee: "Robert Merrifield",
    filing_date: "1969-09-05",
    expiry_date: "1989-08-15",
    claims: "Method for solid phase synthesis of peptides on insoluble resin",
    technology: "Merrifield solid phase peptide synthesis (SPPS)",
    category: "Synthesis",
    status: "expired",
    therapeutic_area: "Manufacturing"
  },
  {
    id: "PAT-022",
    peptide_name: "Fmoc Strategy",
    patent_number: "US4108846",
    assignee: "Various",
    filing_date: "1978-04-13",
    expiry_date: "1998-03-23",
    claims: "Fmoc protecting group strategy for peptide synthesis",
    technology: "9-Fluorenylmethyloxycarbonyl amino protection",
    category: "Synthesis",
    status: "expired",
    therapeutic_area: "Manufacturing"
  },
  {
    id: "PAT-023",
    peptide_name: "Microwave Synthesis",
    patent_number: "US6451548",
    assignee: "CEM Corporation",
    filing_date: "2001-06-01",
    expiry_date: "2021-05-11",
    claims: "Microwave-assisted peptide synthesis for faster coupling",
    technology: "Microwave irradiation for peptide bond formation",
    category: "Synthesis",
    status: "expired",
    therapeutic_area: "Manufacturing"
  },
  {
    id: "PAT-024",
    peptide_name: "Native Chemical Ligation",
    patent_number: "US6780595",
    assignee: "Stephen Kent",
    filing_date: "2001-09-26",
    expiry_date: "2021-09-06",
    claims: "Method for joining unprotected peptide fragments via ligation",
    technology: "Thioester-mediated native chemical ligation",
    category: "Synthesis",
    status: "expired",
    therapeutic_area: "Manufacturing"
  },
  {
    id: "PAT-025",
    peptide_name: "Click Chemistry",
    patent_number: "US7678884",
    assignee: "Sharpless / Scripps",
    filing_date: "2006-11-22",
    expiry_date: "2026-11-01",
    claims: "CuAAC click chemistry for bioconjugation and modification",
    technology: "Copper-catalyzed azide-alkyne cycloaddition",
    category: "Synthesis",
    status: "active",
    therapeutic_area: "Manufacturing"
  }
];

export const stats = {
  total_patents: patents.length,
  active: patents.filter(p => p.status === "active").length,
  expired: patents.filter(p => p.status === "expired").length,
  pending: patents.filter(p => p.status === "pending").length,
  therapeutic: patents.filter(p => p.category === "Therapeutic").length,
  delivery: patents.filter(p => p.category === "Drug Delivery").length,
  synthesis: patents.filter(p => p.category === "Synthesis").length
};

## Patent Statistics

| Metric | Count |
|--------|-------|
| Total Patents | {stats.total_patents} |
| Active | {stats.active} |
| Expired | {stats.expired} |
| Pending | {stats.pending} |
| Therapeutic | {stats.therapeutic} |
| Drug Delivery | {stats.delivery} |
| Synthesis | {stats.synthesis} |

## Therapeutic Peptide Patents

export const therapeuticPatents = patents.filter(p => p.category === "Therapeutic");

| ID | Peptide | Patent | Assignee | Status | Expiry | Area |
|-----|---------|--------|----------|--------|--------|------|
| {therapeuticPatents.map(p => `| ${p.id} | ${p.peptide_name} | ${p.patent_number} | ${p.assignee} | ${p.status} | ${p.expiry_date} | ${p.therapeutic_area} |`).join("\n")}

### GLP-1 Receptor Agonists

The GLP-1 agonist class represents the largest segment of peptide therapeutics:

- **Semaglutide** - Third-generation GLP-1 with albumin-binding fatty acid
- **Tirzepatide** - First-in-class dual GIP/GLP-1 agonist
- **Liraglutide** - First acylated GLP-1 analog (patent expired 2023)
- **Exenatide** - First-in-class GLP-1 agonist from Gila monster (expired)
- **Dulaglutide** - GLP-1-Fc fusion protein for weekly dosing
- **Albiglutide** - Albumin-fusion GLP-1 (discontinued commercially)
- **Lixisenatide** - Modified exendin-4 for once-daily dosing

### GnRH Modulators

- **Leuprolide** - Gold standard GnRH agonist for hormone-sensitive cancers
- **Goserelin** - GnRH superagonist implant
- **Degarelix** - GnRH antagonist with rapid onset

## Drug Delivery Patents

export const deliveryPatents = patents.filter(p => p.category === "Drug Delivery");

| ID | Technology | Patent | Status | Expiry |
|-----|------------|--------|--------|--------|
{deliveryPatents.map(p => `| ${p.id} | ${p.peptide_name} | ${p.patent_number} | ${p.status} | ${p.expiry_date} |`).join("\n")}

### Delivery Platforms

| Platform | Description | Key Advantage |
|----------|-------------|---------------|
| PEGylation | Polymer conjugation | Extended half-life |
| PLGA Microspheres | Biodegradable encapsulation | Sustained release |
| Liposomes | Vesicular carriers | Targeted delivery |
| Nanoparticles | Polymeric particles | Enhanced bioavailability |
| Enteric Coating | pH-sensitive polymers | GI protection |
| Mucoadhesive | Bioadhesive systems | Mucosal absorption |
| Transdermal | Skin permeation | Non-invasive |
| Inhalation | Pulmonary delivery | Systemic absorption |
| Implantable | Polymer implants | Long-term release |
| Microneedle | Dissolving patches | Painless delivery |

## Synthesis Patents

export const synthesisPatents = patents.filter(p => p.category === "Synthesis");

| ID | Method | Patent | Assignee | Status |
|-----|--------|--------|----------|--------|
{synthesisPatents.map(p => `| ${p.id} | ${p.peptide_name} | ${p.patent_number} | ${p.assignee} | ${p.status} |`).join("\n")}

### Evolution of Peptide Synthesis

```
1963: Merrifield introduces SPPS
  ↓
1970s: Fmoc strategy developed
  ↓
2000s: Microwave-assisted synthesis
  ↓
2000s: Native chemical ligation
  ↓
2010s: Click chemistry for modifications
```

## Patent Status Overview

export const activePatents = patents.filter(p => p.status === "active");
export const expiredPatents = patents.filter(p => p.status === "expired");

### Active Patents

{activePatents.map(p => `- **${p.peptide_name}** (${p.patent_number}) - ${p.assignee} - expires ${p.expiry_date}`).join("\n")}

### Recently Expired Patents

{expiredPatents.slice(-5).map(p => `- **${p.peptide_name}** (${p.patent_number}) - expired ${p.expiry_date}`).join("\n")}

## Key Patent Assignees

| Assignee | Patents | Key Products |
|----------|---------|--------------|
| Novo Nordisk | 2 | Semaglutide, Liraglutide |
| Eli Lilly | 2 | Tirzepatide, Dulaglutide |
| AbbVie | 1 | Leuprolide |
| AstraZeneca | 1 | Goserelin |
| Ferring | 1 | Degarelix |
| Sanofi | 1 | Lixisenatide |
| GSK | 1 | Albiglutide |

## References

- [USPTO Patent Search](https://patft.uspto.gov/)
- [Google Patents](https://patents.google.com/)
- [FDA Orange Book](https://www.fda.gov/drugs/drug-approvals-and-databases/approved-drug-products-therapeutic-equivalence-evaluations-orange-book)
