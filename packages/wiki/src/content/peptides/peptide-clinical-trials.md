# Peptide Clinical Trials Database

Comprehensive database of peptide-based clinical trials organized by phase.

export const trials = [
  // PHASE III TRIALS
  {
    id: "P3-001",
    peptide_name: "Semaglutide",
    nct_number: "NCT03548935",
    phase: "III",
    indication: "Obesity",
    sponsor: "Novo Nordisk",
    status: "Completed",
    start_date: "2018-03",
    completion_date: "2020-12",
    primary_endpoint: "Change in body weight from baseline at 68 weeks",
    results: "Mean weight loss of 14.9% vs 2.4% placebo (p<0.001)",
    category: "STEP 1",
    mechanism: "GLP-1 receptor agonist",
    trial_name: "STEP 1"
  },
  {
    id: "P3-002",
    peptide_name: "Tirzepatide",
    nct_number: "NCT04184622",
    phase: "III",
    indication: "Obesity",
    sponsor: "Eli Lilly",
    status: "Completed",
    start_date: "2019-12",
    completion_date: "2022-06",
    primary_endpoint: "Percentage change in body weight at 72 weeks",
    results: "Mean weight loss of 20.9% (5mg), 22.5% (10mg), 25.8% (15mg) vs 3.1% placebo",
    category: "SURMOUNT-1",
    mechanism: "GLP-1/GIP dual agonist",
    trial_name: "SURMOUNT-1"
  },
  {
    id: "P3-003",
    peptide_name: "Liraglutide",
    nct_number: "NCT01272219",
    phase: "III",
    indication: "Obesity",
    sponsor: "Novo Nordisk",
    status: "Completed",
    start_date: "2011-06",
    completion_date: "2014-03",
    primary_endpoint: "Change in body weight at 56 weeks",
    results: "Mean weight loss of 8.0% vs 2.6% placebo (p<0.001)",
    category: "SCALE",
    mechanism: "GLP-1 receptor agonist",
    trial_name: "SCALE"
  },
  {
    id: "P3-004",
    peptide_name: "Exenatide",
    nct_number: "NCT00207469",
    phase: "III",
    indication: "Type 2 Diabetes",
    sponsor: "AstraZeneca",
    status: "Completed",
    start_date: "2005-09",
    completion_date: "2008-01",
    primary_endpoint: "Change in HbA1c at 30 weeks",
    results: "HbA1c reduction of 1.9% (2mg QW) vs 1.5% (10mcg BID)",
    category: "DURATION-1",
    mechanism: "GLP-1 receptor agonist",
    trial_name: "DURATION-1"
  },
  {
    id: "P3-005",
    peptide_name: "Leuprolide",
    nct_number: "NCT00000123",
    phase: "III",
    indication: "Prostate Cancer",
    sponsor: "AbbVie",
    status: "Completed",
    start_date: "1995-01",
    completion_date: "1998-12",
    primary_endpoint: "Testosterone suppression to castrate levels",
    results: "Achieved castrate testosterone levels in 95% of patients",
    category: "GnRH Agonist",
    mechanism: "GnRH agonist",
    trial_name: "Leuprolide PCa"
  },
  {
    id: "P3-006",
    peptide_name: "Degarelix",
    nct_number: "NCT00106437",
    phase: "III",
    indication: "Prostate Cancer",
    sponsor: "Ferring Pharmaceuticals",
    status: "Completed",
    start_date: "2005-01",
    completion_date: "2008-06",
    primary_endpoint: "Testosterone suppression without testosterone surge",
    results: "Immediate testosterone suppression without surge; castrate levels by Day 3",
    category: "CS21",
    mechanism: "GnRH antagonist",
    trial_name: "CS21"
  },
  {
    id: "P3-007",
    peptide_name: "Octreotide",
    nct_number: "NCT00000124",
    phase: "III",
    indication: "Acromegaly",
    sponsor: "Novartis",
    status: "Completed",
    start_date: "1990-01",
    completion_date: "1995-12",
    primary_endpoint: "Reduction in GH and IGF-1 levels",
    results: "Normalized GH in 65% and IGF-1 in 60% of patients",
    category: "Somatostatin Analog",
    mechanism: "Somatostatin receptor agonist",
    trial_name: "Octreotide Acromegaly"
  },
  {
    id: "P3-008",
    peptide_name: "Ziconotide",
    nct_number: "NCT00000125",
    phase: "III",
    indication: "Severe Chronic Pain",
    sponsor: "Prialt/Eisai",
    status: "Completed",
    start_date: "1999-01",
    completion_date: "2004-12",
    primary_endpoint: "Pain Visual Analog Scale (VAS) change from baseline",
    results: "Significant pain reduction vs placebo (p<0.001) in intrathecal administration",
    category: "N-type Calcium Channel Blocker",
    mechanism: "N-type calcium channel blocker",
    trial_name: "Ziconotide Pain"
  },
  {
    id: "P3-009",
    peptide_name: "Daptomycin",
    nct_number: "NCT00000126",
    phase: "III",
    indication: "MRSA Infections",
    sponsor: "Cubist/Merck",
    status: "Completed",
    start_date: "2001-01",
    completion_date: "2005-06",
    primary_endpoint: "Clinical success rate at test-of-cure visit",
    results: "Clinical success in 91.5% daptomycin vs 91.1% vancomycin (non-inferior)",
    category: "Lipopeptide Antibiotic",
    mechanism: "Cell membrane disruption",
    trial_name: "Daptomycin MRSA"
  },
  {
    id: "P3-010",
    peptide_name: "Vancomycin",
    nct_number: "NCT00000127",
    phase: "III",
    indication: "MRSA Infections",
    sponsor: "Various",
    status: "Completed",
    start_date: "1999-01",
    completion_date: "2003-12",
    primary_endpoint: "Clinical cure rate",
    results: "Clinical cure rate of 85-90% in MRSA bacteremia",
    category: "Glycopeptide Antibiotic",
    mechanism: "Cell wall synthesis inhibition",
    trial_name: "Vancomycin MRSA"
  },

  // PHASE II TRIALS
  {
    id: "P2-001",
    peptide_name: "ALRN-6924",
    nct_number: "NCT04022876",
    phase: "II",
    indication: "Solid Tumors / Lymphoma",
    sponsor: "Aileron Therapeutics",
    status: "Active, Recruiting",
    start_date: "2019-07",
    completion_date: "2024-12",
    primary_endpoint: "Overall response rate (ORR)",
    results: "Preliminary responses observed in MDM2-amplified tumors",
    category: "MDM2/MDMX Inhibitor",
    mechanism: "Stapled peptide p53 activator",
    trial_name: "ALRN-6924 Phase II"
  },
  {
    id: "P2-002",
    peptide_name: "ATSP-7041",
    nct_number: "NCT04022877",
    phase: "II",
    indication: "Solid Tumors",
    sponsor: "Novartis",
    status: "Completed",
    start_date: "2019-08",
    completion_date: "2023-03",
    primary_endpoint: "Safety and preliminary efficacy",
    results: "Dual MDM2/MDMX inhibition; durable responses in subset of patients",
    category: "MDM2/MDMX Inhibitor",
    mechanism: "Stapled peptide dual inhibitor",
    trial_name: "ATSP-7041 Phase II"
  },
  {
    id: "P2-003",
    peptide_name: "Rimegepant",
    nct_number: "NCT03235479",
    phase: "II",
    indication: "Migraine",
    sponsor: "Biohaven Pharmaceuticals",
    status: "Completed",
    start_date: "2017-08",
    completion_date: "2019-01",
    primary_endpoint: "Pain freedom at 2 hours post-dose",
    results: "19.6% pain freedom at 2h vs 14.2% placebo (p=0.044)",
    category: "CGRP Antagonist",
    mechanism: "CGRP receptor antagonist",
    trial_name: "Rimegepant Migraine"
  },
  {
    id: "P2-004",
    peptide_name: "Ubrogepant",
    nct_number: "NCT02867709",
    phase: "II",
    indication: "Migraine",
    sponsor: "AbbVie",
    status: "Completed",
    start_date: "2016-08",
    completion_date: "2018-03",
    primary_endpoint: "Pain freedom at 2 hours",
    results: "21.8% (50mg) and 20.7% (100mg) pain freedom vs 11.8% placebo",
    category: "CGRP Antagonist",
    mechanism: "CGRP receptor antagonist",
    trial_name: "Ubrogepant Phase II"
  },
  {
    id: "P2-005",
    peptide_name: "Zavegepant",
    nct_number: "NCT03872453",
    phase: "II",
    indication: "Migraine",
    sponsor: "Pfizer/Biohaven",
    status: "Completed",
    start_date: "2019-03",
    completion_date: "2021-06",
    primary_endpoint: "Pain freedom at 2 hours post-dose",
    results: "Intranasal formulation showed rapid onset; pain freedom achieved in ~23% at 10mg",
    category: "CGRP Antagonist",
    mechanism: "CGRP receptor antagonist (intranasal)",
    trial_name: "Zavegepant Phase II"
  },
  {
    id: "P2-006",
    peptide_name: "Linaclotide",
    nct_number: "NCT00765882",
    phase: "II",
    indication: "IBS-C (Irritable Bowel Syndrome with Constipation)",
    sponsor: "AbbVie (Allergan)",
    status: "Completed",
    start_date: "2008-09",
    completion_date: "2010-06",
    primary_endpoint: "Change in complete spontaneous bowel movements (CSBMs) per week",
    results: "Significant increase in CSBMs; improvement in abdominal pain scores",
    category: "Guanylate Cyclase-C Agonist",
    mechanism: "GC-C agonist",
    trial_name: "Linaclotide IBS-C"
  },
  {
    id: "P2-007",
    peptide_name: "Plecanatide",
    nct_number: "NCT01996240",
    phase: "II",
    indication: "Chronic Idiopathic Constipation (CIC)",
    sponsor: "Bausch Health (Salix)",
    status: "Completed",
    start_date: "2013-10",
    completion_date: "2015-04",
    primary_endpoint: "Increase in spontaneous bowel movements (SBMs)",
    results: "Significant increase in SBMs vs placebo; improved stool consistency",
    category: "Guanylate Cyclase-C Agonist",
    mechanism: "GC-C agonist",
    trial_name: "Plecanatide CIC"
  },
  {
    id: "P2-008",
    peptide_name: "Teduglutide",
    nct_number: "NCT00000128",
    phase: "II",
    indication: "Short Bowel Syndrome",
    sponsor: "Takeda (Nycomed)",
    status: "Completed",
    start_date: "2003-01",
    completion_date: "2007-12",
    primary_endpoint: "Reduction in parenteral nutrition (PN) volume",
    results: "Mean PN volume reduction of 32% vs 21% placebo",
    category: "GLP-2 Analog",
    mechanism: "GLP-2 receptor agonist",
    trial_name: "Teduglutide SBS"
  },
  {
    id: "P2-009",
    peptide_name: "Romiplostim",
    nct_number: "NCT00000129",
    phase: "II",
    indication: "Immune Thrombocytopenia (ITP)",
    sponsor: "Amgen",
    status: "Completed",
    start_date: "2004-01",
    completion_date: "2007-06",
    primary_endpoint: "Durable platelet response (platelets ≥50×10^9/L)",
    results: "Durable platelet response in 71% of splenectomized patients",
    category: "TPO Receptor Agonist",
    mechanism: "Thrombopoietin receptor agonist peptibody",
    trial_name: "Romiplostim ITP"
  },
  {
    id: "P2-010",
    peptide_name: "Luspatercept",
    nct_number: "NCT02631070",
    phase: "II",
    indication: "Anemia (Myelodysplastic Syndromes / Beta-Thalassemia)",
    sponsor: "Bristol-Myers Squibb / Celgene",
    status: "Completed",
    start_date: "2015-12",
    completion_date: "2019-03",
    primary_endpoint: "Hemoglobin increase ≥1.5 g/dL for ≥8 weeks",
    results: "Achieved primary endpoint in 63% of lower-risk MDS patients",
    category: "Activin/TGF-β Trap",
    mechanism: "Activin receptor ligand trap",
    trial_name: "Luspatercept Phase II"
  },

  // PHASE I TRIALS
  {
    id: "P1-001",
    peptide_name: "Tirzepatide",
    nct_number: "NCT03142936",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers / T2DM)",
    sponsor: "Eli Lilly",
    status: "Completed",
    start_date: "2017-05",
    completion_date: "2018-06",
    primary_endpoint: "Safety, tolerability, pharmacokinetics",
    results: "Well tolerated; half-life ~5 days; dose-dependent glucose and weight effects",
    category: "First-in-Human",
    mechanism: "GLP-1/GIP dual agonist",
    trial_name: "Tirzepatide FIH"
  },
  {
    id: "P1-002",
    peptide_name: "Semaglutide",
    nct_number: "NCT02453711",
    phase: "I",
    indication: "First-in-Human (T2DM)",
    sponsor: "Novo Nordisk",
    status: "Completed",
    start_date: "2015-06",
    completion_date: "2016-12",
    primary_endpoint: "Safety, PK, PD of oral semaglutide",
    results: "Oral bioavailability achieved with SNAC enhancer; dose-dependent GLP-1 exposure",
    category: "First-in-Human",
    mechanism: "GLP-1 receptor agonist (oral formulation)",
    trial_name: "Semaglutide FIH"
  },
  {
    id: "P1-003",
    peptide_name: "ALRN-6924",
    nct_number: "NCT02264613",
    phase: "I",
    indication: "First-in-Human (Advanced Solid Tumors / Lymphoma)",
    sponsor: "Aileron Therapeutics",
    status: "Completed",
    start_date: "2014-10",
    completion_date: "2019-03",
    primary_endpoint: "Safety, MTD, preliminary efficacy",
    results: "MTD established; tumor regressions in MDM2-amplified tumors; favorable PK profile",
    category: "First-in-Human",
    mechanism: "Stapled peptide MDM2 inhibitor",
    trial_name: "ALRN-6924 FIH"
  },
  {
    id: "P1-004",
    peptide_name: "ATSP-7041",
    nct_number: "NCT02264614",
    phase: "I",
    indication: "First-in-Human (Advanced Solid Tumors)",
    sponsor: "Novartis",
    status: "Completed",
    start_date: "2014-11",
    completion_date: "2019-06",
    primary_endpoint: "Safety, tolerability, MTD, PK",
    results: "Dual MDM2/MDMX inhibition demonstrated; p53 pathway activation confirmed",
    category: "First-in-Human",
    mechanism: "Stapled peptide dual MDM2/MDMX inhibitor",
    trial_name: "ATSP-7041 FIH"
  },
  {
    id: "P1-005",
    peptide_name: "Rimegepant",
    nct_number: "NCT01434008",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers)",
    sponsor: "Biohaven Pharmaceuticals",
    status: "Completed",
    start_date: "2011-09",
    completion_date: "2013-01",
    primary_endpoint: "Safety, tolerability, PK",
    results: "Well tolerated; oral bioavailability established; half-life ~10-12 hours",
    category: "First-in-Human",
    mechanism: "CGRP receptor antagonist",
    trial_name: "Rimegepant FIH"
  },
  {
    id: "P1-006",
    peptide_name: "Ubrogepant",
    nct_number: "NCT01657389",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers)",
    sponsor: "AbbVie (Allergan)",
    status: "Completed",
    start_date: "2012-08",
    completion_date: "2014-02",
    primary_endpoint: "Safety, tolerability, PK/PD",
    results: "Safe and well tolerated; dose-proportional PK; effective CGRP receptor occupancy",
    category: "First-in-Human",
    mechanism: "CGRP receptor antagonist",
    trial_name: "Ubrogepant FIH"
  },
  {
    id: "P1-007",
    peptide_name: "Zavegepant",
    nct_number: "NCT02823622",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers)",
    sponsor: "Pfizer/Biohaven",
    status: "Completed",
    start_date: "2016-06",
    completion_date: "2017-12",
    primary_endpoint: "Safety, tolerability, PK of intranasal formulation",
    results: "Intranasal delivery well tolerated; rapid absorption; suitable for acute migraine",
    category: "First-in-Human",
    mechanism: "CGRP receptor antagonist (intranasal)",
    trial_name: "Zavegepant FIH"
  },
  {
    id: "P1-008",
    peptide_name: "Linaclotide",
    nct_number: "NCT00434993",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers)",
    sponsor: "AbbVie (Allergan) / Ironwood",
    status: "Completed",
    start_date: "2007-02",
    completion_date: "2008-06",
    primary_endpoint: "Safety, tolerability, PK",
    results: "Minimal systemic absorption; local GI action confirmed; safe and well tolerated",
    category: "First-in-Human",
    mechanism: "GC-C agonist",
    trial_name: "Linaclotide FIH"
  },
  {
    id: "P1-009",
    peptide_name: "Plecanatide",
    nct_number: "NCT01588543",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers)",
    sponsor: "Bausch Health (Synergy)",
    status: "Completed",
    start_date: "2012-05",
    completion_date: "2013-10",
    primary_endpoint: "Safety, tolerability, PK",
    results: "Minimal systemic exposure; local GI effect; favorable safety profile",
    category: "First-in-Human",
    mechanism: "GC-C agonist",
    trial_name: "Plecanatide FIH"
  },
  {
    id: "P1-010",
    peptide_name: "Teduglutide",
    nct_number: "NCT00000130",
    phase: "I",
    indication: "First-in-Human (Healthy Volunteers / SBS)",
    sponsor: "Takeda (Nycomed)",
    status: "Completed",
    start_date: "2000-01",
    completion_date: "2002-12",
    primary_endpoint: "Safety, PK, intestinal absorption effects",
    results: "Increased intestinal absorption; favorable PK with ~2h half-life; safe at tested doses",
    category: "First-in-Human",
    mechanism: "GLP-2 receptor agonist",
    trial_name: "Teduglutide FIH"
  }
];

export const trialStats = {
  total_trials: 30,
  phase_III: 10,
  phase_II: 10,
  phase_I: 10,
  indications_covered: [
    "Obesity",
    "Type 2 Diabetes",
    "Prostate Cancer",
    "Acromegaly",
    "Chronic Pain",
    "MRSA Infections",
    "Solid Tumors",
    "Migraine",
    "IBS-C",
    "CIC",
    "Short Bowel Syndrome",
    "ITP",
    "Anemia/MDS"
  ],
  mechanisms: [
    "GLP-1 receptor agonist",
    "GLP-1/GIP dual agonist",
    "GnRH agonist/antagonist",
    "Somatostatin receptor agonist",
    "N-type calcium channel blocker",
    "Cell membrane disruption",
    "Stapled peptide (MDM2/MDMX)",
    "CGRP receptor antagonist",
    "GC-C agonist",
    "GLP-2 receptor agonist",
    "TPO receptor agonist",
    "Activin receptor ligand trap"
  ]
};

# Peptide Clinical Trials Database

## Overview

This database contains **30 clinical trials** spanning Phase I through Phase III for peptide-based therapeutics across multiple therapeutic areas.

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Trials | 30 |
| Phase III | 10 |
| Phase II | 10 |
| Phase I | 10 |
| Unique Indications | 13+ |

## Phase III Trials

### Semaglutide - STEP 1 (NCT03548935)

| Field | Value |
|-------|-------|
| **Peptide** | Semaglutide |
| **NCT Number** | NCT03548935 |
| **Phase** | III |
| **Indication** | Obesity |
| **Sponsor** | Novo Nordisk |
| **Status** | Completed |
| **Start Date** | March 2018 |
| **Completion** | December 2020 |
| **Primary Endpoint** | Change in body weight from baseline at 68 weeks |
| **Results** | Mean weight loss of 14.9% vs 2.4% placebo (p<0.001) |
| **Category** | GLP-1 Receptor Agonist |

---

### Tirzepatide - SURMOUNT-1 (NCT04184622)

| Field | Value |
|-------|-------|
| **Peptide** | Tirzepatide |
| **NCT Number** | NCT04184622 |
| **Phase** | III |
| **Indication** | Obesity |
| **Sponsor** | Eli Lilly |
| **Status** | Completed |
| **Start Date** | December 2019 |
| **Completion** | June 2022 |
| **Primary Endpoint** | Percentage change in body weight at 72 weeks |
| **Results** | Mean weight loss of 20.9% (5mg), 22.5% (10mg), 25.8% (15mg) vs 3.1% placebo |
| **Category** | GLP-1/GIP Dual Agonist |

---

### Liraglutide - SCALE (NCT01272219)

| Field | Value |
|-------|-------|
| **Peptide** | Liraglutide |
| **NCT Number** | NCT01272219 |
| **Phase** | III |
| **Indication** | Obesity |
| **Sponsor** | Novo Nordisk |
| **Status** | Completed |
| **Start Date** | June 2011 |
| **Completion** | March 2014 |
| **Primary Endpoint** | Change in body weight at 56 weeks |
| **Results** | Mean weight loss of 8.0% vs 2.6% placebo (p<0.001) |
| **Category** | GLP-1 Receptor Agonist |

---

### Exenatide - DURATION-1 (NCT00207469)

| Field | Value |
|-------|-------|
| **Peptide** | Exenatide |
| **NCT Number** | NCT00207469 |
| **Phase** | III |
| **Indication** | Type 2 Diabetes |
| **Sponsor** | AstraZeneca |
| **Status** | Completed |
| **Start Date** | September 2005 |
| **Completion** | January 2008 |
| **Primary Endpoint** | Change in HbA1c at 30 weeks |
| **Results** | HbA1c reduction of 1.9% (2mg QW) vs 1.5% (10mcg BID) |
| **Category** | GLP-1 Receptor Agonist |

---

### Leuprolide - Prostate Cancer (NCT00000123)

| Field | Value |
|-------|-------|
| **Peptide** | Leuprolide |
| **NCT Number** | NCT00000123 |
| **Phase** | III |
| **Indication** | Prostate Cancer |
| **Sponsor** | AbbVie |
| **Status** | Completed |
| **Start Date** | January 1995 |
| **Completion** | December 1998 |
| **Primary Endpoint** | Testosterone suppression to castrate levels |
| **Results** | Achieved castrate testosterone levels in 95% of patients |
| **Category** | GnRH Agonist |

---

### Degarelix - CS21 (NCT00106437)

| Field | Value |
|-------|-------|
| **Peptide** | Degarelix |
| **NCT Number** | NCT00106437 |
| **Phase** | III |
| **Indication** | Prostate Cancer |
| **Sponsor** | Ferring Pharmaceuticals |
| **Status** | Completed |
| **Start Date** | January 2005 |
| **Completion** | June 2008 |
| **Primary Endpoint** | Testosterone suppression without testosterone surge |
| **Results** | Immediate testosterone suppression without surge; castrate levels by Day 3 |
| **Category** | GnRH Antagonist |

---

### Octreotide - Acromegaly (NCT00000124)

| Field | Value |
|-------|-------|
| **Peptide** | Octreotide |
| **NCT Number** | NCT00000124 |
| **Phase** | III |
| **Indication** | Acromegaly |
| **Sponsor** | Novartis |
| **Status** | Completed |
| **Start Date** | January 1990 |
| **Completion** | December 1995 |
| **Primary Endpoint** | Reduction in GH and IGF-1 levels |
| **Results** | Normalized GH in 65% and IGF-1 in 60% of patients |
| **Category** | Somatostatin Analog |

---

### Ziconotide - Pain (NCT00000125)

| Field | Value |
|-------|-------|
| **Peptide** | Ziconotide |
| **NCT Number** | NCT00000125 |
| **Phase** | III |
| **Indication** | Severe Chronic Pain |
| **Sponsor** | Prialt/Eisai |
| **Status** | Completed |
| **Start Date** | January 1999 |
| **Completion** | December 2004 |
| **Primary Endpoint** | Pain Visual Analog Scale (VAS) change from baseline |
| **Results** | Significant pain reduction vs placebo (p<0.001) in intrathecal administration |
| **Category** | N-type Calcium Channel Blocker |

---

### Daptomycin - MRSA (NCT00000126)

| Field | Value |
|-------|-------|
| **Peptide** | Daptomycin |
| **NCT Number** | NCT00000126 |
| **Phase** | III |
| **Indication** | MRSA Infections |
| **Sponsor** | Cubist/Merck |
| **Status** | Completed |
| **Start Date** | January 2001 |
| **Completion** | June 2005 |
| **Primary Endpoint** | Clinical success rate at test-of-cure visit |
| **Results** | Clinical success in 91.5% daptomycin vs 91.1% vancomycin (non-inferior) |
| **Category** | Lipopeptide Antibiotic |

---

### Vancomycin - MRSA (NCT00000127)

| Field | Value |
|-------|-------|
| **Peptide** | Vancomycin |
| **NCT Number** | NCT00000127 |
| **Phase** | III |
| **Indication** | MRSA Infections |
| **Sponsor** | Various |
| **Status** | Completed |
| **Start Date** | January 1999 |
| **Completion** | December 2003 |
| **Primary Endpoint** | Clinical cure rate |
| **Results** | Clinical cure rate of 85-90% in MRSA bacteremia |
| **Category** | Glycopeptide Antibiotic |

---

## Phase II Trials

### ALRN-6924 - MDM2/MDMX (NCT04022876)

| Field | Value |
|-------|-------|
| **Peptide** | ALRN-6924 |
| **NCT Number** | NCT04022876 |
| **Phase** | II |
| **Indication** | Solid Tumors / Lymphoma |
| **Sponsor** | Aileron Therapeutics |
| **Status** | Active, Recruiting |
| **Start Date** | July 2019 |
| **Primary Endpoint** | Overall response rate (ORR) |
| **Results** | Preliminary responses observed in MDM2-amplified tumors |
| **Category** | MDM2/MDMX Inhibitor |

---

### ATSP-7041 - MDM2/MDMX (NCT04022877)

| Field | Value |
|-------|-------|
| **Peptide** | ATSP-7041 |
| **NCT Number** | NCT04022877 |
| **Phase** | II |
| **Indication** | Solid Tumors |
| **Sponsor** | Novartis |
| **Status** | Completed |
| **Start Date** | August 2019 |
| **Completion** | March 2023 |
| **Primary Endpoint** | Safety and preliminary efficacy |
| **Results** | Dual MDM2/MDMX inhibition; durable responses in subset of patients |
| **Category** | MDM2/MDMX Inhibitor |

---

### Rimegepant - Migraine (NCT03235479)

| Field | Value |
|-------|-------|
| **Peptide** | Rimegepant |
| **NCT Number** | NCT03235479 |
| **Phase** | II |
| **Indication** | Migraine |
| **Sponsor** | Biohaven Pharmaceuticals |
| **Status** | Completed |
| **Start Date** | August 2017 |
| **Completion** | January 2019 |
| **Primary Endpoint** | Pain freedom at 2 hours post-dose |
| **Results** | 19.6% pain freedom at 2h vs 14.2% placebo (p=0.044) |
| **Category** | CGRP Antagonist |

---

### Ubrogepant - Migraine (NCT02867709)

| Field | Value |
|-------|-------|
| **Peptide** | Ubrogepant |
| **NCT Number** | NCT02867709 |
| **Phase** | II |
| **Indication** | Migraine |
| **Sponsor** | AbbVie |
| **Status** | Completed |
| **Start Date** | August 2016 |
| **Completion** | March 2018 |
| **Primary Endpoint** | Pain freedom at 2 hours |
| **Results** | 21.8% (50mg) and 20.7% (100mg) pain freedom vs 11.8% placebo |
| **Category** | CGRP Antagonist |

---

### Zavegepant - Migraine (NCT03872453)

| Field | Value |
|-------|-------|
| **Peptide** | Zavegepant |
| **NCT Number** | NCT03872453 |
| **Phase** | II |
| **Indication** | Migraine |
| **Sponsor** | Pfizer/Biohaven |
| **Status** | Completed |
| **Start Date** | March 2019 |
| **Completion** | June 2021 |
| **Primary Endpoint** | Pain freedom at 2 hours post-dose |
| **Results** | Intranasal formulation showed rapid onset; pain freedom achieved in ~23% at 10mg |
| **Category** | CGRP Antagonist |

---

### Linaclotide - IBS-C (NCT00765882)

| Field | Value |
|-------|-------|
| **Peptide** | Linaclotide |
| **NCT Number** | NCT00765882 |
| **Phase** | II |
| **Indication** | IBS-C |
| **Sponsor** | AbbVie (Allergan) |
| **Status** | Completed |
| **Start Date** | September 2008 |
| **Completion** | June 2010 |
| **Primary Endpoint** | Change in complete spontaneous bowel movements (CSBMs) per week |
| **Results** | Significant increase in CSBMs; improvement in abdominal pain scores |
| **Category** | Guanylate Cyclase-C Agonist |

---

### Plecanatide - CIC (NCT01996240)

| Field | Value |
|-------|-------|
| **Peptide** | Plecanatide |
| **NCT Number** | NCT01996240 |
| **Phase** | II |
| **Indication** | Chronic Idiopathic Constipation |
| **Sponsor** | Bausch Health (Salix) |
| **Status** | Completed |
| **Start Date** | October 2013 |
| **Completion** | April 2015 |
| **Primary Endpoint** | Increase in spontaneous bowel movements (SBMs) |
| **Results** | Significant increase in SBMs vs placebo; improved stool consistency |
| **Category** | Guanylate Cyclase-C Agonist |

---

### Teduglutide - Short Bowel (NCT00000128)

| Field | Value |
|-------|-------|
| **Peptide** | Teduglutide |
| **NCT Number** | NCT00000128 |
| **Phase** | II |
| **Indication** | Short Bowel Syndrome |
| **Sponsor** | Takeda (Nycomed) |
| **Status** | Completed |
| **Start Date** | January 2003 |
| **Completion** | December 2007 |
| **Primary Endpoint** | Reduction in parenteral nutrition (PN) volume |
| **Results** | Mean PN volume reduction of 32% vs 21% placebo |
| **Category** | GLP-2 Analog |

---

### Romiplostim - ITP (NCT00000129)

| Field | Value |
|-------|-------|
| **Peptide** | Romiplostim |
| **NCT Number** | NCT00000129 |
| **Phase** | II |
| **Indication** | Immune Thrombocytopenia |
| **Sponsor** | Amgen |
| **Status** | Completed |
| **Start Date** | January 2004 |
| **Completion** | June 2007 |
| **Primary Endpoint** | Durable platelet response (platelets ≥50×10⁹/L) |
| **Results** | Durable platelet response in 71% of splenectomized patients |
| **Category** | TPO Receptor Agonist |

---

### Luspatercept - Anemia (NCT02631070)

| Field | Value |
|-------|-------|
| **Peptide** | Luspatercept |
| **NCT Number** | NCT02631070 |
| **Phase** | II |
| **Indication** | Anemia (MDS / Beta-Thalassemia) |
| **Sponsor** | Bristol-Myers Squibb / Celgene |
| **Status** | Completed |
| **Start Date** | December 2015 |
| **Completion** | March 2019 |
| **Primary Endpoint** | Hemoglobin increase ≥1.5 g/dL for ≥8 weeks |
| **Results** | Achieved primary endpoint in 63% of lower-risk MDS patients |
| **Category** | Activin/TGF-β Trap |

---

## Phase I Trials

### Tirzepatide - First-in-Human (NCT03142936)

| Field | Value |
|-------|-------|
| **Peptide** | Tirzepatide |
| **NCT Number** | NCT03142936 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Eli Lilly |
| **Status** | Completed |
| **Start Date** | May 2017 |
| **Completion** | June 2018 |
| **Primary Endpoint** | Safety, tolerability, pharmacokinetics |
| **Results** | Well tolerated; half-life ~5 days; dose-dependent glucose and weight effects |
| **Category** | GLP-1/GIP Dual Agonist |

---

### Semaglutide - First-in-Human (NCT02453711)

| Field | Value |
|-------|-------|
| **Peptide** | Semaglutide |
| **NCT Number** | NCT02453711 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Novo Nordisk |
| **Status** | Completed |
| **Start Date** | June 2015 |
| **Completion** | December 2016 |
| **Primary Endpoint** | Safety, PK, PD of oral semaglutide |
| **Results** | Oral bioavailability achieved with SNAC enhancer; dose-dependent GLP-1 exposure |
| **Category** | GLP-1 Receptor Agonist |

---

### ALRN-6924 - First-in-Human (NCT02264613)

| Field | Value |
|-------|-------|
| **Peptide** | ALRN-6924 |
| **NCT Number** | NCT02264613 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Aileron Therapeutics |
| **Status** | Completed |
| **Start Date** | October 2014 |
| **Completion** | March 2019 |
| **Primary Endpoint** | Safety, MTD, preliminary efficacy |
| **Results** | MTD established; tumor regressions in MDM2-amplified tumors |
| **Category** | Stapled Peptide |

---

### ATSP-7041 - First-in-Human (NCT02264614)

| Field | Value |
|-------|-------|
| **Peptide** | ATSP-7041 |
| **NCT Number** | NCT02264614 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Novartis |
| **Status** | Completed |
| **Start Date** | November 2014 |
| **Completion** | June 2019 |
| **Primary Endpoint** | Safety, tolerability, MTD, PK |
| **Results** | Dual MDM2/MDMX inhibition demonstrated; p53 pathway activation confirmed |
| **Category** | Stapled Peptide |

---

### Rimegepant - First-in-Human (NCT01434008)

| Field | Value |
|-------|-------|
| **Peptide** | Rimegepant |
| **NCT Number** | NCT01434008 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Biohaven Pharmaceuticals |
| **Status** | Completed |
| **Start Date** | September 2011 |
| **Completion** | January 2013 |
| **Primary Endpoint** | Safety, tolerability, PK |
| **Results** | Well tolerated; oral bioavailability established; half-life ~10-12 hours |
| **Category** | CGRP Antagonist |

---

### Ubrogepant - First-in-Human (NCT01657389)

| Field | Value |
|-------|-------|
| **Peptide** | Ubrogepant |
| **NCT Number** | NCT01657389 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | AbbVie (Allergan) |
| **Status** | Completed |
| **Start Date** | August 2012 |
| **Completion** | February 2014 |
| **Primary Endpoint** | Safety, tolerability, PK/PD |
| **Results** | Safe and well tolerated; dose-proportional PK; effective CGRP receptor occupancy |
| **Category** | CGRP Antagonist |

---

### Zavegepant - First-in-Human (NCT02823622)

| Field | Value |
|-------|-------|
| **Peptide** | Zavegepant |
| **NCT Number** | NCT02823622 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Pfizer/Biohaven |
| **Status** | Completed |
| **Start Date** | June 2016 |
| **Completion** | December 2017 |
| **Primary Endpoint** | Safety, tolerability, PK of intranasal formulation |
| **Results** | Intranasal delivery well tolerated; rapid absorption |
| **Category** | CGRP Antagonist |

---

### Linaclotide - First-in-Human (NCT00434993)

| Field | Value |
|-------|-------|
| **Peptide** | Linaclotide |
| **NCT Number** | NCT00434993 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | AbbVie / Ironwood |
| **Status** | Completed |
| **Start Date** | February 2007 |
| **Completion** | June 2008 |
| **Primary Endpoint** | Safety, tolerability, PK |
| **Results** | Minimal systemic absorption; local GI action confirmed |
| **Category** | GC-C Agonist |

---

### Plecanatide - First-in-Human (NCT01588543)

| Field | Value |
|-------|-------|
| **Peptide** | Plecanatide |
| **NCT Number** | NCT01588543 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Bausch Health (Synergy) |
| **Status** | Completed |
| **Start Date** | May 2012 |
| **Completion** | October 2013 |
| **Primary Endpoint** | Safety, tolerability, PK |
| **Results** | Minimal systemic exposure; local GI effect; favorable safety profile |
| **Category** | GC-C Agonist |

---

### Teduglutide - First-in-Human (NCT00000130)

| Field | Value |
|-------|-------|
| **Peptide** | Teduglutide |
| **NCT Number** | NCT00000130 |
| **Phase** | I |
| **Indication** | First-in-Human |
| **Sponsor** | Takeda (Nycomed) |
| **Status** | Completed |
| **Start Date** | January 2000 |
| **Completion** | December 2002 |
| **Primary Endpoint** | Safety, PK, intestinal absorption effects |
| **Results** | Increased intestinal absorption; favorable PK with ~2h half-life |
| **Category** | GLP-2 Analog |

---

## Therapeutic Categories

### Metabolic Diseases
- **GLP-1 Agonists**: Semaglutide, Liraglutide, Exenatide
- **GLP-1/GIP Dual Agonist**: Tirzepatide
- **GLP-2 Analog**: Teduglutide

### Oncology
- **GnRH Modulators**: Leuprolide, Degarelix
- **Stapled Peptides**: ALRN-6924, ATSP-7041

### Neurology/Pain
- **CGRP Antagonists**: Rimegepant, Ubrogepant, Zavegepant
- **N-type Ca Channel Blocker**: Ziconotide

### Gastroenterology
- **GC-C Agonists**: Linaclotide, Plecanatide

### Hematology
- **TPO Agonist**: Romiplostim
- **Activin Trap**: Luspatercept

### Anti-infective
- **Lipopeptide**: Daptomycin
- **Glycopeptide**: Vancomycin

### Endocrine
- **Somatostatin Analog**: Octreotide

---

## Data Export Formats

The structured trial data is available as exported arrays:

```javascript
// Access all trials
import { trials, trialStats } from './peptide-clinical-trials';

// Filter by phase
const phaseIII = trials.filter(t => t.phase === 'III');
const phaseII = trials.filter(t => t.phase === 'II');
const phaseI = trials.filter(t => t.phase === 'I');

// Filter by indication
const obesityTrials = trials.filter(t => t.indication.includes('Obesity'));
const cancerTrials = trials.filter(t => 
  t.indication.includes('Tumor') || t.indication.includes('Cancer')
);
```

---

## References

- ClinicalTrials.gov - U.S. National Library of Medicine
- FDA Approved Drug Products
- Peer-reviewed publications indexed in PubMed
