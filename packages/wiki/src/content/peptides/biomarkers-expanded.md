---
id: peptide-biomarkers-expanded
title: Expanded Peptide Biomarkers Database
description: Comprehensive database of peptide biomarkers used in clinical diagnostics across cardiology, oncology, neurology, metabolism, and inflammation
version: "2.0"
lastUpdated: 2026-06-12
categories:
  - cardiac
  - cancer
  - neurological
  - metabolic
  - inflammatory
totalBiomarkers: 50
---

# Expanded Peptide Biomarkers Database

Comprehensive clinical peptide biomarker reference with diagnostic parameters, cutoff values, and assay specifications.

## Database Schema

Each biomarker entry includes:

- `id` — Unique identifier
- `name` — Common name
- `peptide_sequence` — Amino acid sequence (if known/applicable)
- `length` — Number of amino acids
- `molecular_weight` — Molecular weight in Daltons
- `disease` — Associated disease or condition
- `clinical_use` — Primary clinical application
- `cutoff_values` — Diagnostic thresholds
- `sensitivity` — Test sensitivity percentage
- `specificity` — Test specificity percentage
- `assay_method` — Recommended detection method
- `category` — Biomarker category

---

## Cardiac Biomarkers

### BNP (B-type Natriuretic Peptide)

```yaml
id: cardiac-001
name: "BNP (B-type Natriuretic Peptide)"
peptide_sequence: "SPKMVQGSGCFGRKMDRISSSSGLGCKVLRRH"
length: 32
molecular_weight: 3464
disease: "Heart failure"
clinical_use: "Diagnosis and prognosis of heart failure; volume status assessment"
cutoff_values:
  rule_out: "<100 pg/mL"
  heart_failure_likely: ">400 pg/mL"
  gray_zone: "100-400 pg/mL"
sensitivity: 90
specificity: 75
assay_method: "Chemiluminescent immunoassay (CLIA)"
category: cardiac
```

### NT-proBNP

```yaml
id: cardiac-002
name: "NT-proBNP"
peptide_sequence: "HPLGSPGSASDLETSGLQEQRNHLQGKLSELQVEQTSLEPLQESPRPTGVWKSREVATEGIRGHRKMVLYTLRAPR"
length: 76
molecular_weight: 8400
disease: "Heart failure"
clinical_use: "Diagnosis and prognosis of heart failure; risk stratification"
cutoff_values:
  rule_out: "<300 pg/mL"
  age_dependent:
    under_50: ">450 pg/mL"
    age_50_75: ">900 pg/mL"
    over_75: ">1800 pg/mL"
sensitivity: 99
specificity: 60
assay_method: "Electrochemiluminescence immunoassay (ECLIA)"
category: cardiac
```

### Troponin I

```yaml
id: cardiac-003
name: "Troponin I"
peptide_sequence: null
length: 210
molecular_weight: 24000
disease: "Myocardial infarction"
clinical_use: "Diagnosis of acute myocardial infarction; myocardial injury detection"
cutoff_values:
  standard: ">0.04 ng/mL"
  high_sensitivity: ">0.01 ng/mL"
  99th_percentile_url: "0.028 ng/mL"
sensitivity: 95
specificity: 90
assay_method: "High-sensitivity immunoassay (hs-cTnI)"
category: cardiac
```

### Troponin T

```yaml
id: cardiac-004
name: "Troponin T"
peptide_sequence: null
length: 288
molecular_weight: 37000
disease: "Myocardial infarction"
clinical_use: "Diagnosis of acute myocardial infarction; myocardial injury detection"
cutoff_values:
  high_sensitivity: ">0.014 ng/mL"
  99th_percentile_url: "0.014 ng/mL"
  acute_mi: ">0.05 ng/mL"
sensitivity: 95
specificity: 85
assay_method: "High-sensitivity immunoassay (hs-cTnT, Elecsys)"
category: cardiac
```

### High-Sensitivity Troponin I

```yaml
id: cardiac-005
name: "High-sensitivity Troponin I"
peptide_sequence: null
length: 210
molecular_weight: 24000
disease: "Myocardial infarction early detection"
clinical_use: "Early detection of acute MI; 0/1h and 0/2h rapid rule-out protocols"
cutoff_values:
  rule_out_0h: "<6 ng/L (sex-specific)"
  rule_in_0h: ">64 ng/L"
  delta_1h: ">6 ng/L change"
  female_99th_percentile: "16 ng/L"
  male_99th_percentile: "34 ng/L"
sensitivity: 99
specificity: 80
assay_method: "High-sensitivity chemiluminescent immunoassay (Architect)"
category: cardiac
```

### High-Sensitivity Troponin T

```yaml
id: cardiac-006
name: "High-sensitivity Troponin T"
peptide_sequence: null
length: 288
molecular_weight: 37000
disease: "Myocardial infarction early detection"
clinical_use: "Early detection of acute MI; 0/1h and 0/3h rule-out protocols"
cutoff_values:
  rule_out_0h: "<5 ng/L"
  rule_in_0h: ">52 ng/L"
  delta_1h: ">5 ng/L change"
  99th_percentile: "14 ng/L"
sensitivity: 99
specificity: 75
assay_method: "High-sensitivity electrochemiluminescence (Elecsys)"
category: cardiac
```

### CK-MB (Creatine Kinase-MB)

```yaml
id: cardiac-007
name: "CK-MB"
peptide_sequence: null
length: 381
molecular_weight: 86000
disease: "Myocardial infarction"
clinical_use: "Diagnosis of MI; reinfarction detection; MI sizing"
cutoff_values:
  absolute: ">5 ng/mL"
  relative_index: ">2.5% of total CK"
  reinfarction: ">2x previous value"
sensitivity: 90
specificity: 85
assay_method: "Chemiluminescent immunoassay, mass assay"
category: cardiac
```

### Myoglobin

```yaml
id: cardiac-008
name: "Myoglobin"
peptide_sequence: null
length: 154
molecular_weight: 17000
disease: "Myocardial infarction (early marker)"
clinical_use: "Early detection of MI (rises 1-3 hours post-event); rule-out marker"
cutoff_values:
  rule_out: "<110 ng/mL"
  elevated: ">110 ng/mL"
sensitivity: 95
specificity: 60
assay_method: "Immunoturbidimetric assay, ELISA"
category: cardiac
```

### D-dimer

```yaml
id: cardiac-009
name: "D-dimer"
peptide_sequence: null
length: null
molecular_weight: 185000
disease: "Deep vein thrombosis / Pulmonary embolism"
clinical_use: "Rule-out DVT/PE in low-risk patients; DIC diagnosis"
cutoff_values:
  standard: "<500 ng/mL FEU"
  age_adjusted: "Age × 10 ng/mL FEU (for patients >50 years)"
  dic_threshold: ">4000 ng/mL FEU"
sensitivity: 95
specificity: 50
assay_method: "Latex-enhanced immunoturbidimetric assay, ELISA"
category: cardiac
```

### Fibrinogen

```yaml
id: cardiac-010
name: "Fibrinogen"
peptide_sequence: null
length: 610
molecular_weight: 340000
disease: "Coagulation disorders"
clinical_use: "Coagulation assessment; DIC monitoring; cardiovascular risk"
cutoff_values:
  normal: "200-400 mg/dL"
  low: "<150 mg/dL (bleeding risk)"
  high: ">400 mg/dL (thrombotic risk)"
  dic: "<100 mg/dL"
sensitivity: null
specificity: null
assay_method: "Clauss method, immunoturbidimetric assay"
category: cardiac
```

---

## Cancer Biomarkers

### PSA (Prostate-Specific Antigen)

```yaml
id: cancer-001
name: "PSA (Prostate-Specific Antigen)"
peptide_sequence: null
length: 237
molecular_weight: 33000
disease: "Prostate cancer"
clinical_use: "Prostate cancer screening; post-treatment monitoring; recurrence detection"
cutoff_values:
  normal: "<4.0 ng/mL"
  gray_zone: "4.0-10.0 ng/mL"
  high_risk: ">10.0 ng/mL"
  age_specific:
    age_40_49: "<2.5 ng/mL"
    age_50_59: "<3.5 ng/mL"
    age_60_69: "<4.5 ng/mL"
    age_70_79: "<6.5 ng/mL"
sensitivity: 85
specificity: 30
assay_method: "Chemiluminescent immunoassay (CLIA)"
category: cancer
```

### Free PSA

```yaml
id: cancer-002
name: "Free PSA"
peptide_sequence: null
length: 237
molecular_weight: 33000
disease: "Prostate cancer"
clinical_use: "Differentiating prostate cancer from BPH in gray zone PSA (4-10 ng/mL)"
cutoff_values:
  free_total_ratio:
    high_cancer_risk: "<0.10 (10% free PSA)"
    intermediate_risk: "0.10-0.18"
    low_cancer_risk: ">0.18 (18% free PSA)"
sensitivity: 95
specificity: 20
assay_method: "Two-site immunoradiometric assay, CLIA"
category: cancer
```

### CA-125

```yaml
id: cancer-003
name: "CA-125"
peptide_sequence: null
length: 22155
molecular_weight: 250000
disease: "Ovarian cancer"
clinical_use: "Ovarian cancer monitoring; treatment response assessment; recurrence detection"
cutoff_values:
  normal: "<35 U/mL"
  postmenopausal: "<25 U/mL"
  elevated: ">35 U/mL"
  highly_elevated: ">200 U/mL (postmenopausal, suspicious)"
sensitivity: 80
specificity: 95
assay_method: "Chemiluminescent microparticle immunoassay (CMIA)"
category: cancer
```

### CA 19-9

```yaml
id: cancer-004
name: "CA 19-9"
peptide_sequence: null
length: null
molecular_weight: 36000
disease: "Pancreatic cancer"
clinical_use: "Pancreatic cancer monitoring; treatment response; recurrence detection"
cutoff_values:
  normal: "<37 U/mL"
  elevated: ">37 U/mL"
  highly_elevated: ">1000 U/mL (metastatic disease likely)"
sensitivity: 75
specificity: 85
assay_method: "Chemiluminescent immunoassay"
category: cancer
```

### CA 15-3

```yaml
id: cancer-005
name: "CA 15-3"
peptide_sequence: null
length: null
molecular_weight: 400000
disease: "Breast cancer"
clinical_use: "Metastatic breast cancer monitoring; treatment response assessment"
cutoff_values:
  normal: "<30 U/mL"
  elevated: ">30 U/mL"
  highly_elevated: ">100 U/mL (metastatic disease)"
sensitivity: 60
specificity: 95
assay_method: "Chemiluminescent immunoassay"
category: cancer
```

### CEA (Carcinoembryonic Antigen)

```yaml
id: cancer-006
name: "CEA (Carcinoembryonic Antigen)"
peptide_sequence: null
length: 702
molecular_weight: 180000
disease: "Colorectal cancer"
clinical_use: "Colorectal cancer monitoring; recurrence detection; treatment response"
cutoff_values:
  non_smoker: "<3.0 ng/mL"
  smoker: "<5.0 ng/mL"
  elevated: ">5.0 ng/mL"
  highly_elevated: ">100 ng/mL (metastatic)"
sensitivity: 70
specificity: 85
assay_method: "Chemiluminescent immunoassay"
category: cancer
```

### AFP (Alpha-Fetoprotein)

```yaml
id: cancer-007
name: "AFP (Alpha-Fetoprotein)"
peptide_sequence: null
length: 609
molecular_weight: 72000
disease: "Hepatocellular carcinoma"
clinical_use: "HCC screening in high-risk patients; testicular cancer monitoring"
cutoff_values:
  normal: "<10 ng/mL"
  screening_hcc: ">20 ng/mL"
  diagnostic_hcc: ">200 ng/mL (with imaging)"
  testicular_cancer: ">25 ng/mL"
sensitivity: 60
specificity: 90
assay_method: "Chemiluminescent immunoassay"
category: cancer
```

### Beta-hCG

```yaml
id: cancer-008
name: "Beta-hCG"
peptide_sequence: null
length: 145
molecular_weight: 23000
disease: "Testicular cancer / Ovarian cancer"
clinical_use: "Gestational trophoblastic disease; testicular germ cell tumors; choriocarcinoma"
cutoff_values:
  non_pregnant_normal: "<5 mIU/mL"
  testicular_cancer: ">5 mIU/mL"
  gestational_trophoblastic: ">100000 mIU/mL"
sensitivity: 90
specificity: 95
assay_method: "Sandwich immunoassay (beta-subunit specific)"
category: cancer
```

### Chromogranin A

```yaml
id: cancer-009
name: "Chromogranin A"
peptide_sequence: null
length: 439
molecular_weight: 49000
disease: "Neuroendocrine tumors"
clinical_use: "NET diagnosis; monitoring treatment response; recurrence detection"
cutoff_values:
  normal: "<100 ng/mL"
  borderline: "100-200 ng/mL"
  elevated: ">200 ng/mL"
  highly_elevated: ">1000 ng/mL"
sensitivity: 80
specificity: 80
assay_method: "ELISA, radioimmunoassay (RIA)"
category: cancer
```

### Calcitonin

```yaml
id: cancer-010
name: "Calcitonin"
peptide_sequence: "CGNLSTCMLGTYTQDFNKFHTFPQTAIGVGAP"
length: 32
molecular_weight: 3400
disease: "Medullary thyroid cancer"
clinical_use: "MTC screening; post-thyroidectomy monitoring; C-cell hyperplasia detection"
cutoff_values:
  male_normal: "<10 pg/mL"
  female_normal: "<5 pg/mL"
  suspicious: ">100 pg/mL"
  pentagastrin_stimulated: ">100 pg/mL"
sensitivity: 95
specificity: 90
assay_method: "Immunoradiometric assay (IRMA), highly sensitive CLIA"
category: cancer
```

---

## Neurological Biomarkers

### Amyloid-beta 42

```yaml
id: neuro-001
name: "Amyloid-beta 42"
peptide_sequence: "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIA"
length: 42
molecular_weight: 4514
disease: "Alzheimer's disease"
clinical_use: "AD diagnosis; amyloid pathology confirmation; clinical trial enrollment"
cutoff_values:
  csf_normal: ">1000 pg/mL"
  csf_decreased: "<600-700 pg/mL (amyloid positive)"
  plasma: "Platform-dependent"
  centiloid: ">20 (amyloid positive on PET)"
sensitivity: 88
specificity: 83
assay_method: "ELISA (INNOTEST), Lumipulse, Simoa, mass spectrometry"
category: neurological
```

### Amyloid-beta 40

```yaml
id: neuro-002
name: "Amyloid-beta 40"
peptide_sequence: "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVV"
length: 40
molecular_weight: 4329
disease: "Alzheimer's disease"
clinical_use: "Used primarily in Abeta42/40 ratio calculation; amyloid pathology assessment"
cutoff_values:
  csf_normal: "~50000-80000 pg/mL (platform dependent)"
  plasma: "~100-200 pg/mL"
sensitivity: 70
specificity: 75
assay_method: "ELISA, Simoa, mass spectrometry"
category: neurological
```

### Amyloid-beta 42/40 Ratio

```yaml
id: neuro-003
name: "Amyloid-beta 42/40 Ratio"
peptide_sequence: null
length: null
molecular_weight: null
disease: "Alzheimer's disease"
clinical_use: "Amyloid pathology detection; improves specificity of Abeta42 alone; plasma screening"
cutoff_values:
  csf_positive: "<0.06-0.08 (platform dependent)"
  plasma_positive: "<0.10 (platform dependent)"
  percentiles:
    at_risk: "<10th percentile"
sensitivity: 90
specificity: 85
assay_method: "Calculated from individual Abeta42 and Abeta40 assays"
category: neurological
```

### Phospho-tau 181 (p-tau181)

```yaml
id: neuro-004
name: "Phospho-tau 181"
peptide_sequence: null
length: 441
molecular_weight: 45000
disease: "Alzheimer's disease"
clinical_use: "AD diagnosis; tau pathology assessment; differential diagnosis from FTD"
cutoff_values:
  csf_elevated: ">60-80 pg/mL"
  plasma_elevated: ">1.5-2.0 pg/mL (Simoa)"
  plasma_high: ">3.5 pg/mL"
sensitivity: 90
specificity: 85
assay_method: "ELISA (INNOTEST), Lumipulse, Simoa, mass spectrometry"
category: neurological
```

### Phospho-tau 217 (p-tau217)

```yaml
id: neuro-005
name: "Phospho-tau 217"
peptide_sequence: null
length: 441
molecular_weight: 45000
disease: "Alzheimer's disease"
clinical_use: "Early AD detection; highest performing plasma biomarker; clinical trial screening"
cutoff_values:
  plasma_positive: ">0.2-0.5 pg/mL (platform dependent)"
  percentiles:
    high_risk: ">90th percentile"
  csf: "Platform dependent"
sensitivity: 95
specificity: 90
assay_method: "Mass spectrometry (IP-MS), Simoa (ALZpath), Lumipulse"
category: neurological
```

### Phospho-tau 231 (p-tau231)

```yaml
id: neuro-006
name: "Phospho-tau 231"
peptide_sequence: null
length: 441
molecular_weight: 45000
disease: "Alzheimer's disease"
clinical_use: "Early tau pathology detection; earliest tau phosphorylation site; research use"
cutoff_values:
  csf_elevated: ">40-60 pg/mL"
  plasma: "Research-stage cutoffs"
sensitivity: 85
specificity: 85
assay_method: "ELISA, mass spectrometry, Simoa"
category: neurological
```

### Total tau (t-tau)

```yaml
id: neuro-007
name: "Total tau (t-tau)"
peptide_sequence: null
length: 441
molecular_weight: 45000
disease: "Alzheimer's disease"
clinical_use: "Neuronal injury/damage marker; AD diagnosis; differential from other dementias"
cutoff_values:
  csf_normal: "<300 pg/mL"
  csf_elevated: ">400 pg/mL"
  csf_highly_elevated: ">1000 pg/mL (rapid progression)"
  plasma: "~2-5 pg/mL (age-dependent)"
sensitivity: 80
specificity: 70
assay_method: "ELISA (INNOTEST), Simoa, Lumipulse"
category: neurological
```

### Neurofilament Light Chain (NfL)

```yaml
id: neuro-008
name: "Neurofilament Light Chain (NfL)"
peptide_sequence: null
length: 543
molecular_weight: 68000
disease: "Neurodegeneration (multiple)"
clinical_use: "General neurodegeneration marker; MS activity; ALS prognosis; FTD diagnosis"
cutoff_values:
  csf_elevated: ">1000 pg/mL"
  plasma_age_depended:
    age_40: "<10 pg/mL"
    age_60: "<20 pg/mL"
    age_80: "<40 pg/mL"
  ms_active: ">15 pg/mL (plasma)"
sensitivity: 85
specificity: 80
assay_method: "Simooa (most common), ELISA, UmanDiagnostics assay"
category: neurological
```

### Alpha-synuclein

```yaml
id: neuro-009
name: "Alpha-synuclein"
peptide_sequence: "MDVFMKGLSKAKEGVVAAAEKTKQGVAEAAGKTKEGVLYVGSKTKEGVVHGVATVAEKTKEQVTNVGGAVVTGVTAVAQKTVEGAGSIAAATGFVKKDQLGKNEEGAPQEGILEDMPVDPDNEAYEMPSEEGYQDYEPEA"
length: 140
molecular_weight: 14460
disease: "Parkinson's disease"
clinical_use: "PD diagnosis; synucleinopathy detection; SAA for prodromal PD detection"
cutoff_values:
  csf_decreased: "<0.5-1.0 ng/mL (decreased in PD)"
  saa_positive: "Positive seed amplification"
  rtf_quic: "Positive kinetic threshold"
sensitivity: 90
specificity: 95
assay_method: "Seed amplification assay (SAA), RT-QuIC, ELISA, mass spectrometry"
category: neurological
```

### Prion Protein (PrPSc)

```yaml
id: neuro-010
name: "Prion Protein (PrPSc)"
peptide_sequence: null
length: 253
molecular_weight: 28000
disease: "Creutzfeldt-Jakob disease (CJD)"
clinical_use: "CJD diagnosis; prion disease confirmation; CSF RT-QuIC confirmation"
cutoff_values:
  rt_quic_positive: "Positive seeding activity"
  csf_14_3_3: ">1000 AU/mL (supportive)"
  csf_tau: ">1250 pg/mL (supportive)"
sensitivity: 92
specificity: 99
assay_method: "RT-QuIC (real-time quaking-induced conversion), Western blot, immunohistochemistry"
category: neurological
```

---

## Metabolic Biomarkers

### Insulin

```yaml
id: metabolic-001
name: "Insulin"
peptide_sequence: "FVNQHLCGSHLVEALYLVCGERGFFYTPKT"
length: 51
molecular_weight: 5808
disease: "Diabetes mellitus"
clinical_use: "Insulin resistance assessment; hypoglycemia evaluation; insulinoma diagnosis"
cutoff_values:
  fasting_normal: "2-25 µIU/mL"
  insulin_resistance: ">25 µIU/mL"
  insulinoma: ">30 µIU/mL with hypoglycemia"
  fasting_c_peptide_ratio: ">0.2 nmol/L"
sensitivity: null
specificity: null
assay_method: "Chemiluminescent immunoassay, ELISA"
category: metabolic
```

### C-peptide

```yaml
id: metabolic-002
name: "C-peptide"
peptide_sequence: "EAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN"
length: 31
molecular_weight: 3020
disease: "Diabetes mellitus"
clinical_use: "Endogenous insulin production assessment; insulinoma diagnosis; diabetes type differentiation"
cutoff_values:
  fasting_normal: "0.5-2.0 ng/mL"
  stimulated: ">3.0 ng/mL (normal response)"
  low: "<0.6 ng/mL (type 1 DM likely)"
  insulinoma: ">3.5 ng/mL"
sensitivity: 90
specificity: 85
assay_method: "Chemiluminescent immunoassay, ELISA"
category: metabolic
```

### HbA1c

```yaml
id: metabolic-003
name: "HbA1c (Glycated Hemoglobin)"
peptide_sequence: null
length: null
molecular_weight: 64500
disease: "Diabetes mellitus"
clinical_use: "Long-term glycemic control monitoring (2-3 months); diabetes diagnosis"
cutoff_values:
  normal: "<5.7%"
  prediabetes: "5.7-6.4%"
  diabetes: "≥6.5%"
  glycemic_goal: "<7.0% (most adults)"
  intensive_goal: "<6.5% (selected patients)"
sensitivity: 90
specificity: 90
assay_method: "HPLC (gold standard), immunoturbidimetric, boronate affinity chromatography"
category: metabolic
```

### GLP-1 (Glucagon-Like Peptide-1)

```yaml
id: metabolic-004
name: "GLP-1 (Glucagon-Like Peptide-1)"
peptide_sequence: "HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR"
length: 31
molecular_weight: 3298
disease: "Diabetes mellitus"
clinical_use: "Incretin function assessment; GLP-1 agonist therapy monitoring; research"
cutoff_values:
  fasting_active: "5-20 pmol/L"
  postprandial_peak: "30-60 pmol/L"
  supraphysiologic_therapy: ">100 pmol/L"
sensitivity: null
specificity: null
assay_method: "ELISA (with DPP-IV inhibitor), radioimmunoassay"
category: metabolic
```

### Ghrelin

```yaml
id: metabolic-005
name: "Ghrelin"
peptide_sequence: "GSSFLSPEHQRVQQRKESKKPPAKLQPR"
length: 28
molecular_weight: 3370
disease: "Obesity"
clinical_use: "Appetite regulation research; obesity pathophysiology; bariatric surgery outcomes"
cutoff_values:
  fasting_normal: "500-1200 pg/mL"
  acylated: "50-150 pg/mL"
  postprandial: "Decreased 30-60%"
sensitivity: null
specificity: null
assay_method: "ELISA (acylated and des-acyl), radioimmunoassay"
category: metabolic
```

### Leptin

```yaml
id: metabolic-006
name: "Leptin"
peptide_sequence: null
length: 167
molecular_weight: 16000
disease: "Obesity"
clinical_use: "Adiposity assessment; leptin deficiency diagnosis; obesity evaluation"
cutoff_values:
  male_normal: "2-8 ng/mL"
  female_normal: "4-20 ng/mL"
  obesity: ">30 ng/mL"
  leptin_deficiency: "<1.0 ng/mL"
sensitivity: 80
specificity: 70
assay_method: "ELISA, radioimmunoassay"
category: metabolic
```

### Adiponectin

```yaml
id: metabolic-007
name: "Adiponectin"
peptide_sequence: null
length: 244
molecular_weight: 26000
disease: "Metabolic syndrome"
clinical_use: "Cardiovascular risk assessment; insulin resistance evaluation; adipose tissue function"
cutoff_values:
  total_normal: "5-30 µg/mL"
  low_risk: "<4 µg/mL (increased CV risk)"
  hmw: ">4.5 µg/mL (protective)"
  hypoadiponectinemia: "<4 µg/mL"
sensitivity: 70
specificity: 70
assay_method: "ELISA (total and HMW), radioimmunoassay"
category: metabolic
```

### Resistin

```yaml
id: metabolic-008
name: "Resistin"
peptide_sequence: null
length: 108
molecular_weight: 12500
disease: "Insulin resistance"
clinical_use: "Insulin resistance assessment; inflammatory marker in metabolic disease"
cutoff_values:
  normal: "5-15 ng/mL"
  elevated: ">20 ng/mL"
sensitivity: 60
specificity: 60
assay_method: "ELISA, radioimmunoassay"
category: metabolic
```

### PTH (Parathyroid Hormone)

```yaml
id: metabolic-009
name: "PTH (Parathyroid Hormone)"
peptide_sequence: "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNFVALGAPLAPRDAGSQRPRKKEDNVLVESHEKSLGEADKADVNVLTKAKSQ"
length: 84
molecular_weight: 9400
disease: "Calcium metabolism disorders"
clinical_use: "Hyperparathyroidism diagnosis; CKD-MBD monitoring; calcium homeostasis"
cutoff_values:
  normal: "10-65 pg/mL"
  primary_hyperparathyroidism: ">65 pg/mL"
  hypoparathyroidism: "<10 pg/mL"
  ckd_target: "150-600 pg/mL (CKD stage 5)"
sensitivity: 90
specificity: 90
assay_method: "Two-site immunoradiometric assay (intact PTH), CLIA"
category: metabolic
```

### Vitamin D (25-OH)

```yaml
id: metabolic-010
name: "Vitamin D (25-Hydroxyvitamin D)"
peptide_sequence: null
length: null
molecular_weight: 400
disease: "Bone metabolism disorders"
clinical_use: "Vitamin D status assessment; osteoporosis risk; CKD-MBD management"
cutoff_values:
  deficient: "<20 ng/mL (<50 nmol/L)"
  insufficient: "20-30 ng/mL (50-75 nmol/L)"
  sufficient: "30-100 ng/mL (75-250 nmol/L)"
  toxic: ">100 ng/mL (>250 nmol/L)"
sensitivity: null
specificity: null
assay_method: "LC-MS/MS (gold standard), immunoassay, chemiluminescent assay"
category: metabolic
```

---

## Inflammatory Biomarkers

### CRP (C-Reactive Protein)

```yaml
id: inflam-001
name: "CRP (C-Reactive Protein)"
peptide_sequence: null
length: 206
molecular_weight: 115000
disease: "Inflammation"
clinical_use: "Acute inflammation detection; CV risk stratification; infection monitoring"
cutoff_values:
  normal: "<3.0 mg/L"
  low_cv_risk: "<1.0 mg/L"
  moderate_cv_risk: "1.0-3.0 mg/L"
  high_cv_risk: ">3.0 mg/L"
  acute_infection: ">10 mg/L"
  severe_sepsis: ">100 mg/L"
sensitivity: 85
specificity: 70
assay_method: "Immunoturbidimetric assay, nephelometric assay, high-sensitivity ELISA"
category: inflammatory
```

### Procalcitonin (PCT)

```yaml
id: inflam-002
name: "Procalcitonin (PCT)"
peptide_sequence: null
length: 116
molecular_weight: 13000
disease: "Sepsis"
clinical_use: "Bacterial infection detection; sepsis diagnosis; antibiotic stewardship"
cutoff_values:
  normal: "<0.05 ng/mL"
  low_risk: "0.05-0.5 ng/mL"
  moderate_risk: "0.5-2.0 ng/mL"
  high_risk_sepsis: ">2.0 ng/mL"
  septic_shock: ">10 ng/mL"
sensitivity: 85
specificity: 80
assay_method: "BRAHMS PCT (immunoluminometric), ELISA, CLIA"
category: inflammatory
```

### IL-6 (Interleukin-6)

```yaml
id: inflam-003
name: "IL-6 (Interleukin-6)"
peptide_sequence: null
length: 184
molecular_weight: 21000
disease: "Inflammation"
clinical_use: "Inflammation severity assessment; sepsis prognosis; cytokine storm monitoring"
cutoff_values:
  normal: "<7 pg/mL"
  elevated: ">15 pg/mL"
  sepsis_likely: ">100 pg/mL"
  cytokine_storm: ">1000 pg/mL"
sensitivity: 80
specificity: 75
assay_method: "ELISA, chemiluminescent assay, point-of-care testing"
category: inflammatory
```

### TNF-alpha (Tumor Necrosis Factor Alpha)

```yaml
id: inflam-004
name: "TNF-alpha (Tumor Necrosis Factor Alpha)"
peptide_sequence: null
length: 157
molecular_weight: 51000
disease: "Inflammation"
clinical_use: "Chronic inflammation assessment; autoimmune disease monitoring; research"
cutoff_values:
  normal: "<8.1 pg/mL"
  elevated: ">8.1 pg/mL"
  highly_elevated: ">50 pg/mL"
sensitivity: 70
specificity: 70
assay_method: "ELISA, multiplex immunoassay"
category: inflammatory
```

### IL-1beta (Interleukin-1 Beta)

```yaml
id: inflam-005
name: "IL-1beta (Interleukin-1 Beta)"
peptide_sequence: null
length: 153
molecular_weight: 17000
disease: "Inflammation"
clinical_use: "Autoinflammatory disease assessment; NLRP3 inflammasome activation"
cutoff_values:
  normal: "<5 pg/mL"
  elevated: ">5 pg/mL"
  autoinflammatory: ">100 pg/mL"
sensitivity: 65
specificity: 70
assay_method: "ELISA, multiplex immunoassay (MSD)"
category: inflammatory
```

### IL-8 (Interleukin-8 / CXCL8)

```yaml
id: inflam-006
name: "IL-8 (Interleukin-8)"
peptide_sequence: null
length: 72
molecular_weight: 8000
disease: "Inflammation"
clinical_use: "Neutrophilic inflammation marker; ARDS predictor; infection severity"
cutoff_values:
  normal: "<62 pg/mL"
  elevated: ">62 pg/mL"
  ards_risk: ">200 pg/mL"
  sepsis: ">100 pg/mL"
sensitivity: 70
specificity: 65
assay_method: "ELISA, multiplex immunoassay"
category: inflammatory
```

### Ferritin

```yaml
id: inflam-007
name: "Ferritin"
peptide_sequence: null
length: 183
molecular_weight: 450000
disease: "Iron disorders / Inflammation"
clinical_use: "Iron deficiency evaluation; inflammation marker; HLH diagnosis"
cutoff_values:
  male_normal: "20-250 ng/mL"
  female_normal: "20-200 ng/mL"
  iron_deficiency: "<30 ng/mL"
  iron_overload: ">500 ng/mL"
  hlh: ">10000 ng/mL"
  macrophage_activation: ">2000 ng/mL"
sensitivity: 90
specificity: 70
assay_method: "Immunoturbidimetric assay, chemiluminescent immunoassay"
category: inflammatory
```

### Calprotectin (S100A8/A9)

```yaml
id: inflam-008
name: "Calprotectin (S100A8/A9)"
peptide_sequence: null
length: 204
molecular_weight: 36000
disease: "Inflammatory bowel disease"
clinical_use: "IBD diagnosis and monitoring; differentiation of IBS vs IBD; mucosal healing"
cutoff_values:
  normal: "<50 µg/g feces"
  borderline: "50-200 µg/g"
  elevated: ">200 µg/g"
  ibd_likely: ">300 µg/g"
  monitoring_target: "<150 µg/g (remission)"
sensitivity: 90
specificity: 80
assay_method: "ELISA, immunochromatographic rapid test"
category: inflammatory
```

### Lactoferrin

```yaml
id: inflam-009
name: "Lactoferrin"
peptide_sequence: null
length: 703
molecular_weight: 78000
disease: "Inflammatory bowel disease"
clinical_use: "IBD screening; intestinal inflammation detection; infectious diarrhea differentiation"
cutoff_values:
  normal: "<7.25 µg/g feces"
  elevated: ">7.25 µg/g"
  ibd_likely: ">15 µg/g"
sensitivity: 85
specificity: 80
assay_method: "ELISA, immunochromatographic rapid test"
category: inflammatory
```

### S100B

```yaml
id: inflam-010
name: "S100B"
peptide_sequence: null
length: 91
molecular_weight: 21000
disease: "Traumatic brain injury"
clinical_use: "TBI severity assessment; CT scan decision support; brain injury prognosis"
cutoff_values:
  normal: "<0.10 µg/L (serum)"
  mild_tbi: "0.10-0.50 µg/L"
  moderate_tbi: "0.50-1.0 µg/L"
  severe_tbi: ">1.0 µg/L"
  ct_indicated: ">0.10 µg/L (within 6h of injury)"
sensitivity: 95
specificity: 55
assay_method: "ELISA, immunoluminometric assay (LIA)"
category: inflammatory
```

---

## Cross-Category Summary

| Category | Count | Key Applications |
|----------|-------|-----------------|
| Cardiac | 10 | MI diagnosis, HF assessment, coagulation |
| Cancer | 10 | Screening, monitoring, recurrence detection |
| Neurological | 10 | AD diagnosis, neurodegeneration, prion disease |
| Metabolic | 10 | Diabetes management, bone metabolism |
| Inflammatory | 10 | Infection, sepsis, autoimmune disease |

## Assay Method Reference

| Method | Abbreviation | Common Use |
|--------|-------------|------------|
| Enzyme-linked immunosorbent assay | ELISA | Research, clinical |
| Chemiluminescent immunoassay | CLIA | High-throughput clinical |
| Electrochemiluminescence | ECLIA | Roche platforms |
| Single molecule array | Simoa | Ultra-sensitive (neuro) |
| High-performance liquid chromatography | HPLC | HbA1c, small molecules |
| Liquid chromatography-mass spectrometry | LC-MS/MS | Vitamin D, drug monitoring |
| Seed amplification assay | SAA | Alpha-synuclein (PD) |
| Real-time quaking-induced conversion | RT-QuIC | Prion disease |

---

## Usage Notes

### Cutoff Value Interpretation

- Cutoffs vary by assay platform and manufacturer
- Age, sex, and renal function affect many biomarkers
- Serial measurements often more valuable than single values
- Always interpret in clinical context

### Quality Specifications

- **Sensitivity** reflects the ability to correctly identify positive cases
- **Specificity** reflects the ability to correctly identify negative cases
- High-sensitivity assays detect lower concentrations with greater precision
- 99th percentile upper reference limit (URL) used for cardiac troponins

### Sample Requirements

- **CSF**: Collected by lumbar puncture; process within 2 hours
- **Plasma**: EDTA or heparin tubes; centrifuge within 30 minutes
- **Serum**: Clot activator tubes; centrifuge after clotting (30-60 min)
- **Fecal**: Collected in dedicated containers; no dietary restrictions
- **Storage**: -70°C for biobanking; -20°C for short-term storage
