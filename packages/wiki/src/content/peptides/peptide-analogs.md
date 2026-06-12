# Peptide Analogs Database

A comprehensive database of modified peptide analogs organized by therapeutic category, including insulin analogs, GLP-1 analogs, somatostatin analogs, GnRH analogs, calcitonin analogs, vasopressin analogs, and opioid analogs.

---

## Insulin Analogs

### 1. Insulin Lispro

| Field | Value |
|-------|-------|
| **ID** | `insulin-lispro` |
| **Name** | Insulin Lispro (Humalog) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Lys(B28), Pro(B29) - reversed proline-lysine at B28-B29 |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCN / B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTPK |
| **Molecular Weight** | 5808 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Rapid-acting insulin analog; faster absorption due to reduced self-association |
| **Advantage Over Parent** | Faster onset (15 min vs 30 min), more predictable absorption, can be dosed immediately before meals |
| **Approval Status** | Approved |
| **Approval Year** | 1996 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Rapid-Acting Insulin |

---

### 2. Insulin Aspart

| Field | Value |
|-------|-------|
| **ID** | `insulin-aspart` |
| **Name** | Insulin Aspart (NovoRapid/NovoLog) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Asp(B28) - aspartic acid replaces proline at B28 |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCN / B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTDKT |
| **Molecular Weight** | 5825 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Rapid-acting insulin analog; reduced hexamer formation enables faster absorption |
| **Advantage Over Parent** | Faster onset (10-20 min), lower postprandial glucose excursions |
| **Approval Status** | Approved |
| **Approval Year** | 2000 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Rapid-Acting Insulin |

---

### 3. Insulin Glulisine

| Field | Value |
|-------|-------|
| **ID** | `insulin-glulisine` |
| **Name** | Insulin Glulisine (Apidra) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Lys(B3), Glu(B29) - lysine replaces asparagine at B3, glutamic acid replaces lysine at B29 |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCN / B-chain: FVKQHLCGSHLVEALYLVCGERGFFYTDKT |
| **Molecular Weight** | 5823 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Rapid-acting insulin analog; reduced aggregation enables faster absorption |
| **Advantage Over Parent** | Faster onset (10-15 min), does not contain zinc, faster dissociation |
| **Approval Status** | Approved |
| **Approval Year** | 2004 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Rapid-Acting Insulin |

---

### 4. Insulin Glargine

| Field | Value |
|-------|-------|
| **ID** | `insulin-glargine` |
| **Name** | Insulin Glargine (Lantus/Basaglar/Toujeo) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Gly(A21), Arg(B31), Arg(B32) - glycine at A21, two additional arginines at C-terminus of B-chain |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCG / B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTPKTRR |
| **Molecular Weight** | 6063 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Long-acting basal insulin; forms microprecipitates at injection site for slow release |
| **Advantage Over Parent** | 24-hour duration, peakless profile, once-daily dosing, lower nocturnal hypoglycemia risk |
| **Approval Status** | Approved |
| **Approval Year** | 2000 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Long-Acting Insulin |

---

### 5. Insulin Detemir

| Field | Value |
|-------|-------|
| **ID** | `insulin-detemir` |
| **Name** | Insulin Detemir (Levemir) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Lys(B29) myristoylated, des-B30 - C14 fatty acid attached to Lys(B29), threonine B30 deleted |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCN / B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTPK(myristoyl) |
| **Molecular Weight** | 5916 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Long-acting basal insulin; fatty acid acylation enables albumin binding and slow release |
| **Advantage Over Parent** | 18-24 hour duration, more predictable pharmacokinetics, less weight gain than NPH |
| **Approval Status** | Approved |
| **Approval Year** | 2005 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Long-Acting Insulin |

---

### 6. Insulin Degludec

| Field | Value |
|-------|-------|
| **ID** | `insulin-degludec` |
| **Name** | Insulin Degludec (Tresiba) |
| **Parent Peptide** | Human Insulin |
| **Modification** | Lys(B29) hexadecanedioyl, des-B30 - C16 fatty diacid attached to Lys(B29) |
| **Sequence** | A-chain: GIVEQCCTSICSLYQLENYCN / B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTPK(hexadecanedioyl) |
| **Molecular Weight** | 6104 Da |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Ultra-long-acting basal insulin; forms multihexamer chains after injection for slow release |
| **Advantage Over Parent** | >42 hour duration, ultra-flat profile, once-daily dosing flexibility, lower hypoglycemia risk |
| **Approval Status** | Approved |
| **Approval Year** | 2013 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Ultra-Long-Acting Insulin |

---

### 7. Insulin Degludec/Aspart

| Field | Value |
|-------|-------|
| **ID** | `insulin-degludec-aspart` |
| **Name** | Insulin Degludec/Aspart (Ryzodeg) |
| **Parent Peptide** | Insulin Degludec + Insulin Aspart |
| **Modification** | 70/30 mixture of insulin degludec and insulin aspart |
| **Sequence** | Combination product |
| **Molecular Weight** | ~5965 Da (weighted average) |
| **Target** | Insulin receptor (INSR) |
| **Mechanism** | Dual action: ultra-long basal (degludec) + rapid prandial (aspart) coverage |
| **Advantage Over Parent** | Single injection provides both basal and bolus coverage, improved adherence |
| **Approval Status** | Approved |
| **Approval Year** | 2013 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Combination Insulin |

---

### 8. Insulin Glargine/Lixisenatide

| Field | Value |
|-------|-------|
| **ID** | `insulin-glargine-lixisenatide` |
| **Name** | Insulin Glargine/Lixisenatide (Soliqua) |
| **Parent Peptide** | Insulin Glargine + Lixisenatide |
| **Modification** | Fixed-ratio combination of insulin glargine 100 U/mL and lixisenatide |
| **Sequence** | Combination product |
| **Molecular Weight** | ~5100 Da (lixisenatide component) |
| **Target** | Insulin receptor (INSR) + GLP-1 receptor (GLP-1R) |
| **Mechanism** | Dual mechanism: basal insulin + GLP-1 agonism for glucose-dependent insulin secretion |
| **Advantage Over Parent** | Addresses both basal insulin deficiency and incretin defect, weight neutral/reducing |
| **Approval Status** | Approved |
| **Approval Year** | 2016 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Insulin-GLP-1 Combination |

---

## GLP-1 Analogs

### 9. Exenatide (Exendin-4)

| Field | Value |
|-------|-------|
| **ID** | `exenatide` |
| **Name** | Exenatide (Byetta/Bydureon) |
| **Parent Peptide** | Exendin-4 (from Heloderma suspectum - Gila monster) |
| **Modification** | Native 39 amino acid peptide from Gila monster venom |
| **Sequence** | HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS |
| **Molecular Weight** | 4187 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | GLP-1 receptor agonist; resistant to DPP-4 degradation due to Ala at position 2 |
| **Advantage Over Parent** | 53% sequence homology to GLP-1 but resistant to DPP-4, longer half-life than native GLP-1 |
| **Approval Status** | Approved |
| **Approval Year** | 2005 (Byetta), 2012 (Bydureon) |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / GLP-1 Agonist |

---

### 10. Liraglutide

| Field | Value |
|-------|-------|
| **ID** | `liraglutide` |
| **Name** | Liraglutide (Victoza/Saxenda) |
| **Parent Peptide** | GLP-1 (7-37) |
| **Modification** | C14 fatty acid (palmitic acid) acylation at Lys26 via glutamic acid spacer, Arg34 substitution |
| **Sequence** | HAEGTFTSDVSSYLEGQAAK(E-palmitoyl)EFIAWLVKGR |
| **Molecular Weight** | 3751 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | GLP-1 receptor agonist; fatty acid acylation enables albumin binding and DPP-4 protection |
| **Advantage Over Parent** | 97% homology to GLP-1, 13-14 hour half-life, once-daily dosing |
| **Approval Status** | Approved |
| **Approval Year** | 2010 (Victoza), 2014 (Saxenda) |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / GLP-1 Agonist |

---

### 11. Semaglutide

| Field | Value |
|-------|-------|
| **ID** | `semaglutide` |
| **Name** | Semaglutide (Ozempic/Wegovy/Rybelsus) |
| **Parent Peptide** | GLP-1 (7-37) |
| **Modification** | C18 diacid fatty chain at Lys26, Aib (aminoisobutyric acid) at position 8, Arg34 |
| **Sequence** | HAEGTFTSDVSSYLEGQAAK(AEEA-AEEA-C18 diacid)EFIAWLVKGR |
| **Molecular Weight** | 4114 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | Long-acting GLP-1 receptor agonist; C18 diacid enables strong albumin binding, Aib8 resists DPP-4 |
| **Advantage Over Parent** | ~7 day half-life, once-weekly dosing, superior HbA1c and weight reduction vs other GLP-1 RAs |
| **Approval Status** | Approved |
| **Approval Year** | 2017 (Ozempic), 2021 (Wegovy), 2019 (Rybelsus) |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / GLP-1 Agonist |

---

### 12. Dulaglutide

| Field | Value |
|-------|-------|
| **ID** | `dulaglutide` |
| **Name** | Dulaglutide (Trulicity) |
| **Parent Peptide** | GLP-1 (7-37) |
| **Modification** | Two GLP-1 analog chains fused to IgG4 Fc constant domain via 16 amino acid linker |
| **Sequence** | GLP-1 analog-[GGGGSGGGGSGGGGS]-IgG4 Fc (homodimer) |
| **Molecular Weight** | ~63,000 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | GLP-1 receptor agonist; Fc fusion protects from DPP-4 and reduces renal clearance |
| **Advantage Over Parent** | ~5 day half-life, once-weekly dosing, large size reduces immunogenicity |
| **Approval Status** | Approved |
| **Approval Year** | 2014 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / GLP-1 Agonist (Fc Fusion) |

---

### 13. Albiglutide

| Field | Value |
|-------|-------|
| **ID** | `albiglutide` |
| **Name** | Albiglutide (Tanzeum/Eperzan) |
| **Parent Peptide** | GLP-1 (7-36) |
| **Modification** | Two GLP-1(7-36) analogs fused in tandem to human serum albumin |
| **Sequence** | [GLP-1(7-36) analog]-[GLP-1(7-36) analog]-HSA |
| **Molecular Weight** | ~73,000 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | GLP-1 receptor agonist; albumin fusion extends half-life and protects from degradation |
| **Advantage Over Parent** | ~5 day half-life, once-weekly dosing, reduced immunogenicity risk |
| **Approval Status** | Approved (discontinued 2017) |
| **Approval Year** | 2014 |
| **Clinical Stage** | Discontinued |
| **Category** | Metabolic / GLP-1 Agonist (Albumin Fusion) |

---

### 14. Lixisenatide

| Field | Value |
|-------|-------|
| **ID** | `lixisenatide` |
| **Name** | Lixisenatide (Adlyxin/Lyxumia) |
| **Parent Peptide** | Exendin-4 |
| **Modification** | C-terminal hexalysine (6 lysine residues) added, Pro38 deleted |
| **Sequence** | HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPSK(KKKKKK) |
| **Molecular Weight** | 4858 Da |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | GLP-1 receptor agonist; hexalysine extension increases half-life |
| **Advantage Over Parent** | Longer half-life (~3 hours) than exenatide, once-daily dosing, pronounced postprandial effect |
| **Approval Status** | Approved |
| **Approval Year** | 2013 (EU), 2016 (US) |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / GLP-1 Agonist |

---

### 15. Tirzepatide

| Field | Value |
|-------|-------|
| **ID** | `tirzepatide` |
| **Name** | Tirzepatide (Mounjaro/Zepbound) |
| **Parent Peptide** | GIP (glucose-dependent insulinotropic polypeptide) |
| **Modification** | C20 fatty diacid at Lys20, Aib at position 2, multiple amino acid substitutions for dual receptor binding |
| **Sequence** | YAibGTFTSDYSIYLEGQAAK(AEEA-AEEA-C20 diacid)EFIAWLVRGR |
| **Molecular Weight** | 4813 Da |
| **Target** | GIP receptor (GIPR) and GLP-1 receptor (GLP-1R) |
| **Mechanism** | Dual GIP/GLP-1 receptor agonist; activates both incretin pathways simultaneously |
| **Advantage Over Parent** | ~5 day half-life, superior glycemic control and weight loss vs pure GLP-1 agonists |
| **Approval Status** | Approved |
| **Approval Year** | 2022 (Mounjaro), 2023 (Zepbound) |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Dual Incretin Agonist |

---

### 16. Semaglutide (Oral)

| Field | Value |
|-------|-------|
| **ID** | `semaglutide-oral` |
| **Name** | Semaglutide Oral (Rybelsus) |
| **Parent Peptide** | Semaglutide |
| **Modification** | Co-formulated with SNAC (sodium N-[8-(2-hydroxybenzoyl)amino] caprylate) absorption enhancer |
| **Sequence** | HAEGTFTSDVSSYLEGQAAK(AEEA-AEEA-C18 diacid)EFIAWLVKGR + SNAC |
| **Molecular Weight** | 4114 Da (peptide component) |
| **Target** | GLP-1 receptor (GLP-1R) |
| **Mechanism** | Oral GLP-1 RA; SNAC creates local pH elevation and protects peptide in stomach |
| **Advantage Over Parent** | First oral GLP-1 RA, eliminates injection burden, ~1% of subcutaneous bioavailability |
| **Approval Status** | Approved |
| **Approval Year** | 2019 |
| **Clinical Stage** | Marketed |
| **Category** | Metabolic / Oral GLP-1 Agonist |

---

## Somatostatin Analogs

### 17. Octreotide

| Field | Value |
|-------|-------|
| **ID** | `octreotide` |
| **Name** | Octreotide (Sandostatin/Sandostatin LAR) |
| **Parent Peptide** | Somatostatin-14 |
| **Modification** | Cyclic octapeptide with D-Phe, Cys-Thr(ol) modification, disulfide bridge |
| **Sequence** | D-Phe-Cys-Phe-D-Trp-Lys-Thr-Cys-Thr(ol) (cyclic) |
| **Molecular Weight** | 1019 Da |
| **Target** | Somatostatin receptors (SSTR2, SSTR5 > SSTR3) |
| **Mechanism** | Somatostatin receptor agonist; inhibits GH, glucagon, and GI peptide secretion |
| **Advantage Over Parent** | 30x longer half-life (1.5-2 hours vs 1-3 min), more potent GH inhibition, selective receptor profile |
| **Approval Status** | Approved |
| **Approval Year** | 1988 |
| **Clinical Stage** | Marketed |
| **Category** | Endocrine / Somatostatin Analog |

---

### 18. Lanreotide

| Field | Value |
|-------|-------|
| **ID** | `lanreotide` |
| **Name** | Lanreotide (Somatuline) |
| **Parent Peptide** | Somatostatin-14 |
| **Modification** | Cyclic octapeptide with D-Bal, Cys-Trp-Lys modification |
| **Sequence** | D-Bal-Cys-Tyr-D-Trp-Lys-Val-Cys-Thr-NH2 (cyclic) |
| **Molecular Weight** | 1096 Da |
| **Target** | Somatostatin receptors (SSTR2 > SSTR5 > SSTR3) |
| **Mechanism** | Somatostatin receptor agonist; inhibits GH and other hormone secretion |
| **Advantage Over Parent** | Longer duration of action, SSTR2 selectivity, available as deep subcutaneous injection (Autogel) |
| **Approval Status** | Approved |
| **Approval Year** | 2007 (US), 2001 (EU) |
| **Clinical Stage** | Marketed |
| **Category** | Endocrine / Somatostatin Analog |

---

### 19. Pasireotide

| Field | Value |
|-------|-------|
| **ID** | `pasireotide` |
| **Name** | Pasireotide (Signifor) |
| **Parent Peptide** | Somatostatin-14 |
| **Modification** | Cyclic hexapeptide with novel amino acids (cyclo-[Tyr-D-Trp-Lys-Val-Phe-beta-hydroxy-Pro]) |
| **Sequence** | Cyclo[-Tyr-D-Trp-Lys-Val-Phe-βHyp-] |
| **Molecular Weight** | 1041 Da |
| **Target** | Somatostatin receptors (SSTR1, SSTR2, SSTR3, SSTR5) |
| **Mechanism** | Pan-somatostatin receptor agonist; broad receptor binding profile including SSTR5 |
| **Advantage Over Parent** | Multi-receptor binding (SSTR1,2,3,5), superior for Cushing's disease due to SSTR5 affinity |
| **Approval Status** | Approved |
| **Approval Year** | 2012 |
| **Clinical Stage** | Marketed |
| **Category** | Endocrine / Somatostatin Analog |

---

### 20. Vapreotide

| Field | Value |
|-------|-------|
| **ID** | `vapreotide` |
| **Name** | Vapreotide (Sanvar) |
| **Parent Peptide** | Somatostatin-14 |
| **Modification** | Cyclic octapeptide with D-Trp modification |
| **Sequence** | D-Phe-Cys-Tyr-D-Trp-Lys-Val-Cys-Trp-NH2 (cyclic) |
| **Molecular Weight** | 1131 Da |
| **Target** | Somatostatin receptors (SSTR2, SSTR5) |
| **Mechanism** | Somatostatin receptor agonist; reduces splanchnic blood flow and inhibits GI secretion |
| **Advantage Over Parent** | Selective SSTR2/5 binding, effective for variceal bleeding and GI fistulas |
| **Approval Status** | Approved (limited markets) |
| **Approval Year** | 2004 |
| **Clinical Stage** | Marketed (limited) |
| **Category** | Endocrine / Somatostatin Analog |

---

## GnRH Analogs

### 21. Leuprolide

| Field | Value |
|-------|-------|
| **ID** | `leuprolide` |
| **Name** | Leuprolide (Lupron/Eligard) |
| **Parent Peptide** | GnRH (gonadotropin-releasing hormone) |
| **Modification** | D-Leucine at position 6, ethylamide at position 10 |
| **Sequence** | pGlu-His-Trp-Ser-D-Leu-Leu-Arg-Pro-NHEt |
| **Molecular Weight** | 1209 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; initial stimulation then downregulation of pituitary gonadotropins |
| **Advantage Over Parent** | 50x more potent than native GnRH, sustained LH/FSH suppression with chronic use |
| **Approval Status** | Approved |
| **Approval Year** | 1985 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 22. Goserelin

| Field | Value |
|-------|-------|
| **ID** | `goserelin` |
| **Name** | Goserelin (Zoladex) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Ser(Bu') at position 6, Aza-Gly at position 10 |
| **Sequence** | pGlu-His-Trp-Ser-D-Ser(tBu)-Leu-Arg-Pro-AzaGly-NH2 |
| **Molecular Weight** | 1269 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; medical castration via pituitary desensitization |
| **Advantage Over Parent** | 80x more potent, available as subcutaneous depot implant |
| **Approval Status** | Approved |
| **Approval Year** | 1989 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 23. Triptorelin

| Field | Value |
|-------|-------|
| **ID** | `triptorelin` |
| **Name** | Triptorelin (Trelstar/Decapeptyl) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Tryptophan at position 6 |
| **Sequence** | pGlu-His-Trp-Ser-D-Trp-Leu-Arg-Pro-Gly-NH2 |
| **Molecular Weight** | 1311 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; downregulates GnRH receptors with chronic administration |
| **Advantage Over Parent** | 100x more potent than native GnRH, sustained-release formulations available |
| **Approval Status** | Approved |
| **Approval Year** | 1986 (EU), 2000 (US) |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 24. Buserelin

| Field | Value |
|-------|-------|
| **ID** | `buserelin` |
| **Name** | Buserelin (Suprefact) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Ser(tBu) at position 6, ethylamide at position 10 |
| **Sequence** | pGlu-His-Trp-Ser-D-Ser(tBu)-Leu-Arg-Pro-NHEt |
| **Molecular Weight** | 1239 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; initial flare then suppression of gonadotropins |
| **Advantage Over Parent** | 100x more potent, available as nasal spray and subcutaneous injection |
| **Approval Status** | Approved |
| **Approval Year** | 1985 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 25. Nafarelin

| Field | Value |
|-------|-------|
| **ID** | `nafarelin` |
| **Name** | Nafarelin (Synarel) |
| **Parent Peptide** | GnRH |
| **Modification** | D-3-(2-naphthyl)-alanine at position 6 |
| **Sequence** | pGlu-His-Trp-Ser-D-Nal(2)-Leu-Arg-Pro-Gly-NH2 |
| **Molecular Weight** | 1322 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; desensitizes pituitary with chronic use |
| **Advantage Over Parent** | 200x more potent than native GnRH, nasal spray formulation |
| **Approval Status** | Approved |
| **Approval Year** | 1990 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 26. Histrelin

| Field | Value |
|-------|-------|
| **ID** | `histrelin` |
| **Name** | Histrelin (Vantas/Supprelin LA) |
| **Parent Peptide** | GnRH |
| **Modification** | D-His(Bzl) at position 6, ethylamide at position 10 |
| **Sequence** | pGlu-His-Trp-Ser-D-His(Bzl)-Leu-Arg-Pro-NHEt |
| **Molecular Weight** | 1323 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH agonist; sustained gonadotropin suppression via subcutaneous implant |
| **Advantage Over Parent** | 100x more potent, 12-month subcutaneous implant available |
| **Approval Status** | Approved |
| **Approval Year** | 2004 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology/Endocrine / GnRH Agonist |

---

### 27. Cetrorelix

| Field | Value |
|-------|-------|
| **ID** | `cetrorelix` |
| **Name** | Cetrorelix (Cetrotide) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Nal(2) at 1, D-Cpa at 2, D-Pal(3) at 3, D-Cit at 6, NHEt at 10 |
| **Sequence** | Ac-D-Nal(2)-D-Cpa-D-Pal(3)-Ser-Tyr-D-Cit-Leu-Arg-Pro-D-Ala-NH2 |
| **Molecular Weight** | 1431 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH antagonist; immediate competitive blockade without initial flare |
| **Advantage Over Parent** | No initial LH surge, immediate suppression, used in IVF protocols |
| **Approval Status** | Approved |
| **Approval Year** | 2000 |
| **Clinical Stage** | Marketed |
| **Category** | Reproductive/Endocrine / GnRH Antagonist |

---

### 28. Ganirelix

| Field | Value |
|-------|-------|
| **ID** | `ganirelix` |
| **Name** | Ganirelix (Orgalutran/Antagon) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Nal(2) at 1, D-Cpa at 2, D-Pal(3) at 3, D-hArg(Et2) at 6, NHEt at 10 |
| **Sequence** | Ac-D-Nal(2)-D-Cpa-D-Pal(3)-Ser-Tyr-D-hArg(Et2)-Leu-Arg-Pro-D-Ala-NH2 |
| **Molecular Weight** | 1570 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH antagonist; immediate competitive GnRH receptor blockade |
| **Advantage Over Parent** | No initial LH flare, rapid onset, used to prevent premature LH surge in IVF |
| **Approval Status** | Approved |
| **Approval Year** | 1999 |
| **Clinical Stage** | Marketed |
| **Category** | Reproductive/Endocrine / GnRH Antagonist |

---

### 29. Degarelix

| Field | Value |
|-------|-------|
| **ID** | `degarelix` |
| **Name** | Degarelix (Firmagon) |
| **Parent Peptide** | GnRH |
| **Modification** | D-Ala at 1, D-Cpa at 2, D-Pal(3) at 3, Apc at 5, D-Asp/NHEt modifications |
| **Sequence** | Ac-D-Ala-D-Cpa-D-Pal-Ser-Aph(Hor)-D-Aph(Cbm)-Leu-Lys(iPr)-Pro-D-Ala-NH2 |
| **Molecular Weight** | 1570 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | GnRH antagonist; immediate testosterone suppression without flare |
| **Advantage Over Parent** | No initial testosterone flare, immediate castration levels, reduced cardiovascular risk vs agonists |
| **Approval Status** | Approved |
| **Approval Year** | 2008 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology / GnRH Antagonist |

---

### 30. Relugolix

| Field | Value |
|-------|-------|
| **ID** | `relugolix` |
| **Name** | Relugolix (Orgovyx/Relumina) |
| **Parent Peptide** | GnRH (non-peptide antagonist) |
| **Modification** | Small molecule GnRH antagonist (thienopyrimidine derivative) |
| **Sequence** | Non-peptide (small molecule) |
| **Molecular Weight** | 624 Da |
| **Target** | GnRH receptor (GnRHR) |
| **Mechanism** | Oral GnRH antagonist; competitive receptor blockade with immediate effect |
| **Advantage Over Parent** | First oral GnRH antagonist, no injection required, rapid testosterone suppression |
| **Approval Status** | Approved |
| **Approval Year** | 2020 |
| **Clinical Stage** | Marketed |
| **Category** | Oncology / Oral GnRH Antagonist |

---

## Calcitonin Analogs

### 31. Salmon Calcitonin

| Field | Value |
|-------|-------|
| **ID** | `salmon-calcitonin` |
| **Name** | Salmon Calcitonin (Miacalcin/Fortical) |
| **Parent Peptide** | Human Calcitonin |
| **Modification** | Fish-derived calcitonin with 16 amino acid differences from human sequence |
| **Sequence** | CSNLSTCVLGKLSQELHKLQTYPRTNTGSGTP-NH2 |
| **Molecular Weight** | 3432 Da |
| **Target** | Calcitonin receptor (CTR) |
| **Mechanism** | Calcitonin receptor agonist; inhibits osteoclast activity and bone resorption |
| **Advantage Over Parent** | 40-50x more potent than human calcitonin, longer duration of action |
| **Approval Status** | Approved |
| **Approval Year** | 1975 (injectable), 2005 (nasal spray) |
| **Clinical Stage** | Marketed |
| **Category** | Musculoskeletal / Bone Resorption Inhibitor |

---

### 32. Elcatonin

| Field | Value |
|-------|-------|
| **ID** | `elcatonin` |
| **Name** | Elcatonin (Carbocalcitonin) |
| **Parent Peptide** | Eel Calcitonin (from Anguilla japonica) |
| **Modification** | Eel calcitonin analog with ABA (alpha-aminobutyric acid) substitution at positions 1 and 7 |
| **Sequence** | ABA-SNLSTCV-X-ALKELHKLQTYPRTDVGAGTP-NH2 (ABA=aminobutyric acid) |
| **Molecular Weight** | 3360 Da |
| **Target** | Calcitonin receptor (CTR) |
| **Mechanism** | Calcitonin receptor agonist; inhibits osteoclast-mediated bone resorption |
| **Advantage Over Parent** | More stable than salmon calcitonin, reduced antigenicity |
| **Approval Status** | Approved (Japan and Asia) |
| **Approval Year** | 1981 (Japan) |
| **Clinical Stage** | Marketed (Japan) |
| **Category** | Musculoskeletal / Bone Resorption Inhibitor |

---

### 33. Teriparatide

| Field | Value |
|-------|-------|
| **ID** | `teriparatide` |
| **Name** | Teriparatide (Forteo) |
| **Parent Peptide** | Parathyroid Hormone (PTH) |
| **Modification** | PTH(1-34) - N-terminal 34 amino acid fragment |
| **Sequence** | SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF |
| **Molecular Weight** | 4118 Da |
| **Target** | PTH/PTHrP receptor (PTHR1) |
| **Mechanism** | PTH receptor agonist; intermittent dosing stimulates osteoblast-mediated bone formation |
| **Advantage Over Parent** | Anabolic bone agent (vs anti-resorptives), increases bone formation markers |
| **Approval Status** | Approved |
| **Approval Year** | 2002 |
| **Clinical Stage** | Marketed |
| **Category** | Musculoskeletal / Anabolic Bone Agent |

---

### 34. Abaloparatide

| Field | Value |
|-------|-------|
| **ID** | `abaloparatide` |
| **Name** | Abaloparatide (Tymlos) |
| **Parent Peptide** | Parathyroid Hormone-Related Protein (PTHrP) |
| **Modification** | PTHrP(1-34) analog with 7 amino acid substitutions for stability |
| **Sequence** | AVSEHQLLHDKGKSIQDLRRRFFEHLKNIITHT-NH2 |
| **Molecular Weight** | 3961 Da |
| **Target** | PTH/PTHrP receptor (PTHR1) - preferential RG conformation |
| **Mechanism** | PTHR1 agonist; preferentially activates anabolic (RG) signaling pathway |
| **Advantage Over Parent** | Faster onset of bone density increase, lower risk of hypercalcemia than teriparatide |
| **Approval Status** | Approved |
| **Approval Year** | 2017 |
| **Clinical Stage** | Marketed |
| **Category** | Musculoskeletal / Anabolic Bone Agent |

---

## Vasopressin Analogs

### 35. Desmopressin

| Field | Value |
|-------|-------|
| **ID** | `desmopressin` |
| **Name** | Desmopressin (DDAVP/Minirin/Stimate) |
| **Parent Peptide** | Arginine Vasopressin (AVP) |
| **Modification** | D-Arg8, des-Gly9-NH2 - deamination of Cys1, D-Arg at position 8 |
| **Sequence** | MPDTNCPFGG-D-Arg-G-NH2 (disulfide bridge 1-6) |
| **Molecular Weight** | 1069 Da |
| **Target** | V2 vasopressin receptor (V2R), V1a receptor (low affinity) |
| **Mechanism** | V2 receptor agonist; increases water reabsorption in collecting duct, releases factor VIII/vWF |
| **Advantage Over Parent** | 3000x more antidiuretic activity, minimal vasopressor effect, longer duration |
| **Approval Status** | Approved |
| **Approval Year** | 1978 |
| **Clinical Stage** | Marketed |
| **Category** | Hematology/Renal / Vasopressin Analog |

---

### 36. Terlipressin

| Field | Value |
|-------|-------|
| **ID** | `terlipressin` |
| **Name** | Terlipressin (Glypressin) |
| **Parent Peptide** | Lysine Vasopressin (LVP) |
| **Modification** | Triglycyl-lysine vasopressin - glycyl-glycyl-glycyl prodrug at N-terminus |
| **Sequence** | GGG-Lys-Asn-Cys-Phe-Ile-Gln-Asn-Cys-Pro-Lys-Gly-NH2 (cyclic 1-6) |
| **Molecular Weight** | 1336 Da |
| **Target** | V1a vasopressin receptor (V1aR) |
| **Mechanism** | V1a receptor agonist (via active metabolite LVP); causes splanchnic vasoconstriction |
| **Advantage Over Parent** | Prodrug with slower release, selective splanchnic vasoconstriction for variceal bleeding |
| **Approval Status** | Approved |
| **Approval Year** | 2001 (EU) |
| **Clinical Stage** | Marketed |
| **Category** | Gastroenterology / Vasopressin Analog |

---

### 37. Lypressin

| Field | Value |
|-------|-------|
| **ID** | `lypressin` |
| **Name** | Lypressin (Diapid) |
| **Parent Peptide** | Vasopressin |
| **Modification** | Lysine at position 8 (instead of arginine) - naturally occurring form in pigs |
| **Sequence** | CYFQNCPRG-NH2 (Lys8 vasopressin) |
| **Molecular Weight** | 1056 Da |
| **Target** | V2 vasopressin receptor (V2R) |
| **Mechanism** | V2 receptor agonist; promotes water reabsorption in renal collecting ducts |
| **Advantage Over Parent** | Species-specific variant with nasal spray availability |
| **Approval Status** | Approved (limited markets) |
| **Approval Year** | 1970s |
| **Clinical Stage** | Marketed (limited) |
| **Category** | Renal / Vasopressin Analog |

---

### 38. Argipressin

| Field | Value |
|-------|-------|
| **ID** | `argipressin` |
| **Name** | Argipressin (Pitressin) |
| **Parent Peptide** | Native Arginine Vasopressin (AVP) |
| **Modification** | Native human vasopressin - no modification |
| **Sequence** | CYFQNCPRG-NH2 (disulfide bridge 1-6) |
| **Molecular Weight** | 1084 Da |
| **Target** | V1a, V2 vasopressin receptors (V1aR, V2R) |
| **Mechanism** | Non-selective vasopressin receptor agonist; vasoconstriction and antidiuresis |
| **Advantage Over Parent** | Native hormone; used when endogenous production is insufficient |
| **Approval Status** | Approved |
| **Approval Year** | 1940s |
| **Clinical Stage** | Marketed |
| **Category** | Endocrine / Vasopressin |

---

## Opioid Analogs

### 39. Fentanyl

| Field | Value |
|-------|-------|
| **ID** | `fentanyl` |
| **Name** | Fentanyl (Sublimaze/Duragesic) |
| **Parent Peptide** | Morphine (peptide-mimetic) |
| **Modification** | Synthetic 4-anilidopiperidine opioid; phenylethylamine backbone |
| **Sequence** | Non-peptide (small molecule: C22H28N2O) |
| **Molecular Weight** | 336 Da |
| **Target** | μ-opioid receptor (MOR) |
| **Mechanism** | μ-opioid receptor full agonist; potent analgesic with rapid CNS penetration |
| **Advantage Over Parent** | 50-100x more potent than morphine, rapid onset, fewer histamine effects |
| **Approval Status** | Approved |
| **Approval Year** | 1968 |
| **Clinical Stage** | Marketed |
| **Category** | Analgesic / Opioid Agonist |

---

### 40. Sufentanil

| Field | Value |
|-------|-------|
| **ID** | `sufentanil` |
| **Name** | Sufentanil (Sufenta) |
| **Parent Peptide** | Fentanyl |
| **Modification** | 4-methoxymethyl modification, thienyl ring replacement |
| **Sequence** | Non-peptide (small molecule: C22H30N2O2S) |
| **Molecular Weight** | 386 Da |
| **Target** | μ-opioid receptor (MOR) |
| **Mechanism** | μ-opioid receptor full agonist; highly lipophilic for rapid CNS penetration |
| **Advantage Over Parent** | 5-10x more potent than fentanyl, greater therapeutic index |
| **Approval Status** | Approved |
| **Approval Year** | 1984 |
| **Clinical Stage** | Marketed |
| **Category** | Analgesic / Opioid Agonist |

---

### 41. Alfentanil

| Field | Value |
|-------|-------|
| **ID** | `alfentanil` |
| **Name** | Alfentanil (Alfenta) |
| **Parent Peptide** | Fentanyl |
| **Modification** | Tetrazole ring modification, N-alkyl substitution |
| **Sequence** | Non-peptide (small molecule: C21H32N6O3) |
| **Molecular Weight** | 416 Da |
| **Target** | μ-opioid receptor (MOR) |
| **Mechanism** | μ-opioid receptor full agonist; rapid onset due to low pKa and high unionized fraction |
| **Advantage Over Parent** | Faster onset (1-2 min) than fentanyl, shorter duration, less accumulation |
| **Approval Status** | Approved |
| **Approval Year** | 1986 |
| **Clinical Stage** | Marketed |
| **Category** | Analgesic / Opioid Agonist |

---

### 42. Remifentanil

| Field | Value |
|-------|-------|
| **ID** | `remifentanil` |
| **Name** | Remifentanil (Ultiva) |
| **Parent Peptide** | Fentanyl |
| **Modification** | Methyl ester prodrug; ester linkage for rapid hydrolysis by non-specific esterases |
| **Sequence** | Non-peptide (small molecule: C20H28N2O5) |
| **Molecular Weight** | 376 Da |
| **Target** | μ-opioid receptor (MOR) |
| **Mechanism** | μ-opioid receptor full agonist; metabolized by blood/tissue esterases |
| **Advantage Over Parent** | Ultra-short acting (3-5 min context-sensitive half-time), organ-independent metabolism |
| **Approval Status** | Approved |
| **Approval Year** | 1996 |
| **Clinical Stage** | Marketed |
| **Category** | Analgesic / Opioid Agonist |

---

### 43. Buprenorphine

| Field | Value |
|-------|-------|
| **ID** | `buprenorphine` |
| **Name** | Buprenorphine (Subutex/Suboxone/Belbuca) |
| **Parent Peptide** | Thebaine (oripavine derivative) |
| **Modification** | 6,14-endo-ethanotetrahydrooripavine; cyclopropylmethyl at N |
| **Sequence** | Non-peptide (small molecule: C29H41NO4) |
| **Molecular Weight** | 468 Da |
| **Target** | μ-opioid receptor (MOR) partial agonist, κ-opioid receptor (KOR) antagonist |
| **Mechanism** | Partial μ-opioid agonist with κ antagonism; ceiling effect on respiratory depression |
| **Advantage Over Parent** | Ceiling effect improves safety, long duration (24-60 h), lower abuse potential |
| **Approval Status** | Approved |
| **Approval Year** | 1981 (analgesic), 2002 (opioid dependence) |
| **Clinical Stage** | Marketed |
| **Category** | Analgesic / Opioid Partial Agonist |

---

## Summary Statistics

| Category | Count | Examples |
|----------|-------|----------|
| Insulin Analogs | 8 | Lispro, Aspart, Glargine, Degludec |
| GLP-1 Analogs | 8 | Semaglutide, Tirzepatide, Dulaglutide |
| Somatostatin Analogs | 4 | Octreotide, Lanreotide, Pasireotide |
| GnRH Analogs | 10 | Leuprolide, Degarelix, Relugolix |
| Calcitonin Analogs | 4 | Salmon Calcitonin, Teriparatide |
| Vasopressin Analogs | 4 | Desmopressin, Terlipressin |
| Opioid Analogs | 5 | Fentanyl, Remifentanil, Buprenorphine |
| **Total** | **43** | |

---

## Modification Strategies

| Strategy | Examples | Advantage |
|----------|----------|-----------|
| **Amino acid substitution** | D-amino acids (octreotide), Aib (semaglutide) | DPP-4 resistance, stability |
| **Fatty acid acylation** | Liraglutide, insulin detemir | Albumin binding, half-life extension |
| **PEGylation/Fc fusion** | Dulaglutide | Renal clearance reduction |
| **Albumin fusion** | Albiglutide | Extended half-life |
| **B-chain modifications** | Insulin glargine, degludec | Altered pharmacokinetics |
| **Cyclic peptides** | Octreotide, lanreotide | Stability, selectivity |
| **Non-natural amino acids** | Pasireotide, nafarelin | Receptor selectivity, potency |
| **Prodrug strategies** | Terlipressin, remifentanil | Controlled activation |
