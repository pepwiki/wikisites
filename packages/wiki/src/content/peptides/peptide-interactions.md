# Peptide Interactions Database

A comprehensive database of peptide interactions including peptide-receptor, peptide-enzyme, peptide-peptide, peptide-protein, and peptide-ligand interactions.

---

## Peptide-Receptor Interactions

### 1. GLP-1 → GLP-1R

| Field | Value |
|-------|-------|
| **ID** | `glp1-glp1r` |
| **Peptide 1** | GLP-1 (Glucagon-Like Peptide-1, 7-36 amide) |
| **Peptide 2** | GLP-1R (GLP-1 Receptor) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~100 pM |
| **Mechanism** | GLP-1 binds to the extracellular domain and transmembrane core of GLP-1R, a class B GPCR. Binding induces conformational changes activating Gαs-cAMP-PKA signaling cascade, stimulating glucose-dependent insulin secretion from pancreatic β-cells. |
| **Biological Significance** | Key incretin hormone regulating postprandial glucose homeostasis. Therapeutic target for Type 2 diabetes (GLP-1 receptor agonists: semaglutide, liraglutide, tirzepatide). |
| **Structural Basis** | N-terminal His-Ala-Glu residues critical for receptor activation. C-terminal region (residues 25-36) contributes to binding affinity. α-helical conformation upon receptor binding. |
| **Category** | Metabolic Signaling |

---

### 2. Insulin → Insulin Receptor

| Field | Value |
|-------|-------|
| **ID** | `insulin-ir` |
| **Peptide 1** | Insulin |
| **Peptide 2** | Insulin Receptor (IR, INSR) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~100 pM |
| **Mechanism** | Insulin binds to the α-subunits of the insulin receptor tyrosine kinase, inducing autophosphorylation of β-subunits. Activates IRS-1/2 → PI3K → Akt pathway promoting GLUT4 translocation and glucose uptake. Also activates Ras-MAPK mitogenic pathway. |
| **Biological Significance** | Central regulator of glucose, lipid, and protein metabolism. Defects cause diabetes mellitus. Therapeutic insulin analogs are mainstay of Type 1 diabetes treatment. |
| **Structural Basis** | B-chain C-terminal residues (PheB24, PheB25, TyrB26) critical for receptor binding. A-chain α-helix and B-chain α-helix form receptor-binding surface. Classic cross-α structure. |
| **Category** | Metabolic Signaling |

---

### 3. Oxytocin → OXTR

| Field | Value |
|-------|-------|
| **ID** | `oxytocin-oxtr` |
| **Peptide 1** | Oxytocin (Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2) |
| **Peptide 2** | OXTR (Oxytocin Receptor) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~1 nM |
| **Mechanism** | Oxytocin binds OXTR, a class A GPCR, activating Gαq/11 → PLC → IP3/DAG pathway. Increases intracellular calcium, triggering uterine smooth muscle contraction and milk ejection. Also signals via Gαi in some tissues. |
| **Biological Significance** | Stimulates uterine contractions during labor, milk ejection during lactation, and modulates social bonding, trust, and stress responses. Used therapeutically for labor induction. |
| **Structural Basis** | Disulfide bridge between Cys1-Cys6 forms 20-membered ring essential for activity. C-terminal glycinamide required. Tyr2, Ile3, Gln4 residues contact receptor. |
| **Category** | Neuroendocrine Signaling |

---

### 4. Vasopressin → V1aR

| Field | Value |
|-------|-------|
| **ID** | `vasopressin-v1ar` |
| **Peptide 1** | Vasopressin (AVP, Arginine Vasopressin, Cys-Tyr-Phe-Gln-Asn-Cys-Pro-Arg-Gly-NH2) |
| **Peptide 2** | V1aR (Vasopressin V1a Receptor) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~1 nM |
| **Mechanism** | AVP binds V1aR (class A GPCR), activating Gαq → PLCβ → IP3/DAG → PKC pathway. Increases intracellular calcium causing vasoconstriction and vascular smooth muscle contraction. |
| **Biological Significance** | Regulates vascular tone, blood pressure, platelet aggregation, liver glycogenolysis, and social behavior. V1aR antagonists studied for anxiety and social disorders. |
| **Structural Basis** | Phe3 (vs Tyr3 in oxytocin) and Arg8 (vs Leu8) distinguish vasopressin selectivity. Disulfide ring conformation critical for V1a vs V2 selectivity. |
| **Category** | Cardiovascular / Neuroendocrine |

---

### 5. Vasopressin → V2R

| Field | Value |
|-------|-------|
| **ID** | `vasopressin-v2r` |
| **Peptide 1** | Vasopressin (AVP) |
| **Peptide 2** | V2R (Vasopressin V2 Receptor) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~1 nM |
| **Mechanism** | AVP binds V2R (class A GPCR) on renal collecting duct cells, activating Gαs → adenylyl cyclase → cAMP → PKA pathway. Triggers AQP2 water channel insertion into apical membrane, increasing water reabsorption. |
| **Biological Significance** | Essential for water balance and urine concentration. Loss-of-function causes nephrogenic diabetes insipidus. V2R antagonists (vaptans) treat hyponatremia and polycystic kidney disease. |
| **Structural Basis** | V2R selectivity determined by distinct extracellular loop residues. Arg8 of AVP forms salt bridge with V2R-specific acidic residues. Similar disulfide ring as V1a binding but different receptor contacts. |
| **Category** | Renal / Fluid Balance |

---

### 6. GnRH → GnRHR

| Field | Value |
|-------|-------|
| **ID** | `gnrh-gnrhr` |
| **Peptide 1** | GnRH (Gonadotropin-Releasing Hormone, pGlu-His-Trp-Ser-Tyr-Gly-Leu-Arg-Pro-Gly-NH2) |
| **Peptide 2** | GnRHR (GnRH Receptor) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~1 nM |
| **Mechanism** | GnRH binds GnRHR (class A GPCR) on anterior pituitary gonadotrophs, activating Gαq/11 → PLC → IP3/DAG → PKC pathway. Stimulates release of LH and FSH, controlling reproductive function. Pulsatile vs continuous stimulation differentially regulates LH/FSH. |
| **Biological Significance** | Master regulator of reproductive axis. Pulsatile GnRH required for normal fertility. GnRH agonists (leuprolide) used for prostate cancer, endometriosis, precocious puberty. GnRH antagonists (cetrorelix) for IVF. |
| **Structural Basis** | N-terminal pGlu1-His2-Trp3 essential for activation. C-terminal Pro9-Gly10-NH2 required for receptor binding. Gly6 allows bent conformation critical for receptor recognition. |
| **Category** | Reproductive Endocrinology |

---

### 7. Somatostatin → SSTR2

| Field | Value |
|-------|-------|
| **ID** | `somatostatin-sstr2` |
| **Peptide 1** | Somatostatin (SST-14: Ala-Gly-Cys-Lys-Asn-Phe-Phe-Trp-Lys-Thr-Phe-Thr-Ser-Cys) |
| **Peptide 2** | SSTR2 (Somatostatin Receptor Type 2) |
| **Interaction Type** | Binding / Inhibition |
| **Affinity** | KD ~1 nM |
| **Mechanism** | Somatostatin binds SSTR2 (class A GPCR), activating Gαi/o → inhibits adenylyl cyclase → reduces cAMP. Also activates protein phosphatases, K+ channels, and inhibits Ca2+ channels. Suppresses hormone secretion and cell proliferation. |
| **Biological Significance** | Inhibits growth hormone, TSH, insulin, glucagon, and gastrin secretion. SSTR2 is target for neuroendocrine tumor therapy (octreotide, lanreotide). SSTR2 radioligand therapy (177Lu-DOTATATE) for NETs. |
| **Structural Basis** | Disulfide bridge (Cys3-Cys14) essential for bioactivity. Phe6-Phe7-Trp8-Lys9 pharmacophore critical for SSTR2 binding. β-turn structure at Trp8-Lys9 important for receptor recognition. |
| **Category** | Endocrine / Oncology |

---

### 8. CGRP → CGRP Receptor

| Field | Value |
|-------|-------|
| **ID** | `cgrp-cgrp-r` |
| **Peptide 1** | CGRP (Calcitonin Gene-Related Peptide, α-CGRP) |
| **Peptide 2** | CGRP Receptor (CLR/RAMP1 complex) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~10 nM |
| **Mechanism** | CGRP binds to the CGRP receptor complex (calcitonin receptor-like receptor CLR + RAMP1), activating Gαs → adenylyl cyclase → cAMP → PKA pathway. Causes vasodilation, nociception, and neurogenic inflammation. |
| **Biological Significance** | Potent vasodilator implicated in migraine pathophysiology. CGRP receptor antagonists (gepants) and anti-CGRP antibodies (erenumab, fremanezumab, galcanezumab) are breakthrough migraine therapies. |
| **Structural Basis** | N-terminal disulfide bridge (Cys2-Cys7) forms ring. C-terminal residues (especially Phe37 and the amide) critical for receptor binding. α-helical conformation in residues 8-37. RAMP1 determines CLR specificity for CGRP. |
| **Category** | Neurovascular / Pain |

---

### 9. NPY → Y1R

| Field | Value |
|-------|-------|
| **ID** | `npy-y1r` |
| **Peptide 1** | NPY (Neuropeptide Y, Tyr-Pro-Ser-Lys-Pro-Asp-Asn-Pro-Gly-Glu-Asp-Ala-Pro-Ala-Glu-Asp-Met-Ala-Arg-Tyr-Tyr-Ser-Ala-Leu-Arg-His-Tyr-Ile-Asn-Leu-Ile-Thr-Arg-Gln-Arg-Tyr-NH2) |
| **Peptide 2** | Y1R (Neuropeptide Y Receptor Type 1) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~1 nM |
| **Mechanism** | NPY binds Y1R (class A GPCR), activating Gαi/o → inhibits adenylyl cyclase → reduces cAMP. Also modulates Ca2+ channels and K+ channels. Stimulates appetite (orexigenic effect), vasoconstriction, and anxiolysis. |
| **Biological Significance** | Most abundant neuropeptide in brain. Potent orexigenic signal stimulating food intake. Involved in stress response, anxiety, circadian rhythms, and cardiovascular regulation. Y1R antagonists investigated for obesity. |
| **Structural Basis** | C-terminal hexapeptide (31-36) essential for Y1R binding and activation. N-terminal region contributes to affinity and selectivity. Polyproline helix in central region. Phe36 and Arg35 critical contacts. |
| **Category** | Neuroendocrine / Metabolic |

---

### 10. Orexin → OX1R

| Field | Value |
|-------|-------|
| **ID** | `orexin-ox1r` |
| **Peptide 1** | Orexin A (Hypocretin-1, Hypocretin/Orexin) |
| **Peptide 2** | OX1R (Orexin Receptor Type 1) |
| **Interaction Type** | Binding / Activation |
| **Affinity** | KD ~10 nM |
| **Mechanism** | Orexin A binds OX1R (class A GPCR), activating Gαq/11 → PLC → IP3/DAG → PKC pathway. Increases intracellular calcium, promoting wakefulness, feeding behavior, and sympathetic activation. |
| **Biological Significance** | Regulates wake-sleep transitions, appetite, energy homeostasis, and reward. Loss of orexin neurons causes narcolepsy type 1. Dual orexin receptor antagonists (suvorexant, lemborexant) approved for insomnia. |
| **Structural Basis** | N-terminal pyroglutamate. Two intramolecular disulfide bonds (Cys6-Cys12, Cys7-Cys14) form compact ring structure. C-terminal extension important for OX1R vs OX2R selectivity. Trp6, Arg7, Leu11 critical residues. |
| **Category** | Sleep / Neurological |

---

## Peptide-Enzyme Interactions

### 11. Insulin → Insulin Receptor (RTK Activation)

| Field | Value |
|-------|-------|
| **ID** | `insulin-ir-rtk` |
| **Peptide 1** | Insulin |
| **Peptide 2** | Insulin Receptor (Receptor Tyrosine Kinase) |
| **Interaction Type** | Activation |
| **Affinity** | KD ~100 pM |
| **Mechanism** | Insulin binding to IR α-subunits induces conformational change in the (αβ)2 homodimer, activating intrinsic tyrosine kinase activity of β-subunits. Trans-autophosphorylation of Y1158, Y1162, Y1163 in activation loop creates docking sites for IRS proteins and SH2-domain proteins. |
| **Biological Significance** | Prototypical RTK signaling paradigm. Initiates metabolic (PI3K/Akt → GLUT4, glycogen synthesis) and mitogenic (Ras/MAPK → gene expression, cell growth) cascades. Dysregulation in insulin resistance and Type 2 diabetes. |
| **Structural Basis** | L-shaped insulin molecule binds two distinct sites on IR (Site 1: L1/αCT, Site 2: FnIII-1/FnIII-2). Cross-linking of receptor domains required for activation. B-chain helix and A-chain helix form binding surfaces. |
| **Category** | Receptor Tyrosine Kinase Signaling |

---

### 12. GLP-1 → DPP-4 (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `glp1-dpp4` |
| **Peptide 1** | GLP-1 (7-36 amide) |
| **Peptide 2** | DPP-4 (Dipeptidyl Peptidase-4, CD26) |
| **Interaction Type** | Cleavage |
| **Affinity** | t½ ~2 minutes (circulating GLP-1) |
| **Mechanism** | DPP-4 cleaves the N-terminal dipeptide His7-Ala8 of GLP-1, producing GLP-1 (9-36) amide which is biologically inactive at GLP-1R. Cleavage occurs rapidly in circulation, limiting endogenous GLP-1 half-life. |
| **Biological Significance** | Major inactivation pathway for incretin hormones. DPP-4 inhibitors (sitagliptip, saxagliptin, linagliptin) extend GLP-1 and GIP half-life, used therapeutically for Type 2 diabetes. Basis for incretin-based therapy. |
| **Structural Basis** | DPP-4 active site accommodates N-terminal dipeptides with Pro or Ala at P1 position. GLP-1 His7-Ala8 fits S1-S2 subsites. α/β hydrolase fold with catalytic Ser630, Asp708, His740 triad. |
| **Category** | Metabolic / Drug Target |

---

### 13. Angiotensin I → ACE (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `angiotensin1-ace` |
| **Peptide 1** | Angiotensin I (Asp-Arg-Val-Tyr-Ile-His-Pro-Phe-His-Leu) |
| **Peptide 2** | ACE (Angiotensin-Converting Enzyme, ACE1) |
| **Interaction Type** | Cleavage |
| **Affinity** | KM ~10-50 μM |
| **Mechanism** | ACE (Zn2+ metalloprotease) cleaves C-terminal dipeptide His9-Leu10 from angiotensin I to produce angiotensin II (Asp-Arg-Val-Tyr-Ile-His-Pro-Phe), the potent vasoconstrictor octapeptide. ACE is a dicarboxypeptidase with two catalytic domains. |
| **Biological Significance** | Key enzyme in renin-angiotensin-aldosterone system (RAAS). Angiotensin II raises blood pressure via AT1R (vasoconstriction, aldosterone release, sympathetic activation). ACE inhibitors (captopril, enalapril, ramipril) first-line antihypertensives. |
| **Structural Basis** | Somatic ACE has two homologous domains (N-domain, C-domain) each with Zn2+-binding HEXXH motif. C-domain primarily responsible for angiotensin II generation. Substrate C-terminal Leu binds S1' pocket; Phe at S1. |
| **Category** | Cardiovascular / Drug Target |

---

### 14. Bradykinin → ACE (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `bradykinin-ace` |
| **Peptide 1** | Bradykinin (Arg-Pro-Pro-Gly-Phe-Ser-Pro-Phe-Arg) |
| **Peptide 2** | ACE (Angiotensin-Converting Enzyme) |
| **Interaction Type** | Cleavage |
| **Affinity** | KM ~1-10 μM |
| **Mechanism** | ACE cleaves C-terminal Phe-Arg dipeptide from bradykinin, producing inactive fragments (1-7). Bradykinin is a vasodilator acting via B2R, so ACE-mediated degradation limits its vasodilatory and pro-inflammatory effects. |
| **Biological Significance** | Dual role of ACE: generates vasoconstrictor angiotensin II while degrading vasodilator bradykinin. ACE inhibitor-induced bradykinin accumulation causes cough (common side effect) and angioedema (rare). Therapeutic benefit partly via bradykinin potentiation. |
| **Structural Basis** | Bradykinin C-terminal Phe8-Arg9 cleaved by C-domain active site. Proline residues at P2, P3 positions influence substrate binding. Similar S1-S1' recognition as angiotensin I but different P-side contacts. |
| **Category** | Cardiovascular / Kinin System |

---

### 15. Amyloid-beta → Neprilysin (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `amyloid-beta-neprilysin` |
| **Peptide 1** | Amyloid-beta (Aβ, primarily Aβ40 and Aβ42) |
| **Peptide 2** | Neprilysin (NEP, CD10, Neutral Endopeptidase) |
| **Interaction Type** | Cleavage |
| **Affinity** | KM ~10-100 μM for Aβ40 |
| **Mechanism** | Neprilysin (Zn2+ metalloprotease) cleaves Aβ at multiple sites including His14-Gln15, Phe19-Phe20, and other hydrophobic residues, generating non-amyloidogenic fragments. NEP is the dominant Aβ-degrading enzyme in brain. |
| **Biological Significance** | Critical for Aβ clearance and prevention of amyloid plaque formation. NEP expression decreases with age and in Alzheimer's disease. NEP upregulation or gene delivery is therapeutic strategy for AD. Neprilysin also degrades BNP/ANP (relevant in heart failure). |
| **Structural Basis** | Type II transmembrane metalloprotease with zinc-binding HEXXH motif. Active site cleft accommodates Aβ hydrophobic core region (residues 17-21). Multiple cleavage sites reflect broad endopeptidase specificity. |
| **Category** | Neurodegeneration / Drug Target |

---

### 16. Substance P → ACE (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `substance-p-ace` |
| **Peptide 1** | Substance P (Arg-Pro-Lys-Pro-Gln-Gln-Phe-Phe-Gly-Leu-Met-NH2) |
| **Peptide 2** | ACE (Angiotensin-Converting Enzyme) |
| **Interaction Type** | Cleavage |
| **Affinity** | KM ~50-200 μM |
| **Mechanism** | ACE cleaves C-terminal dipeptide Leu10-Met11-NH2 from substance P, inactivating this tachykinin neuropeptide. Substance P acts via NK1 receptor to mediate pain transmission, neurogenic inflammation, and emesis. |
| **Biological Significance** | ACE has broad substrate specificity beyond angiotensin I. Substance P degradation by ACE may modulate pain and inflammation. NK1 receptor antagonists (aprepitant) used as antiemetics. ACE inhibitor effects on substance P metabolism contribute to side effects. |
| **Structural Basis** | Substance P C-terminal Phe-Phe-Gly-Leu-Met-NH2 contacts ACE active site. Met11 amide at P1' position. Pro residues in N-terminal region limit N-terminal processing by other peptidases, making C-terminal ACE cleavage primary inactivation route. |
| **Category** | Neuroinflammation / Pain |

---

### 17. BNP → Neprilysin (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `bnp-neprilysin` |
| **Peptide 1** | BNP (B-type Natriuretic Peptide, 32 amino acids) |
| **Peptide 2** | Neprilysin (NEP, CD10) |
| **Interaction Type** | Cleavage |
| **Affinity** | KM ~1-10 μM |
| **Mechanism** | Neprilysin cleaves BNP at Cys10-Phe11, Met12-Val13, and other sites within the 17-membered disulfide ring, producing inactive fragments. BNP normally acts via NPR-A receptor (GC-A) to generate cGMP, promoting natriuresis and vasodilation. |
| **Biological Significance** | NEP degradation limits BNP's cardioprotective effects. Neprilysin inhibitors (sacubitril) combined with ARB (valsartan) as Entresto for heart failure - increases natriuretic peptide levels while blocking RAAS. PARADIGM-HF trial showed mortality benefit. |
| **Structural Basis** | BNP disulfide ring (Cys10-Cys26) contains NEP cleavage sites. Ring conformation must be disrupted for optimal cleavage. NEP active site accesses peptide backbone at exposed loop regions. Similar mechanism for ANP and CNP degradation. |
| **Category** | Cardiovascular / Heart Failure |

---

### 18. GLP-1 → DPP-4 (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `glp1-dpp4-degradation` |
| **Peptide 1** | GLP-1 (7-36 amide) |
| **Peptide 2** | DPP-4 (Dipeptidyl Peptidase-4) |
| **Interaction Type** | Cleavage |
| **Affinity** | t½ ~2 minutes |
| **Mechanism** | DPP-4 rapidly cleaves the N-terminal His7-Ala8 dipeptide bond of active GLP-1 (7-36 amide), converting it to inactive GLP-1 (9-36 amide). This is the primary metabolic clearance pathway for circulating GLP-1, accounting for ~50% of total GLP-1 degradation. |
| **Biological Significance** | Pharmacological DPP-4 inhibition (gliptins) is validated therapeutic approach for T2D. Protects both GLP-1 and GIP from degradation. Native GLP-1 half-life of 2 min extended to 5-7 min with DPP-4i. Basis for combination therapy with GLP-1 RAs. |
| **Structural Basis** | DPP-4 is a serine protease with α/β-hydrolase fold and catalytic triad (Ser630, Asp708, His740). Exopeptidase cleaving Xaa-Pro or Xaa-Ala dipeptides from N-terminus. GLP-1 His7-Ala8 fits S2-S1 subsites. S1 pocket prefers Ala, Pro residues. |
| **Category** | Metabolic / Enzyme Inhibition |

---

### 19. GIP → DPP-4 (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `gip-dpp4` |
| **Peptide 1** | GIP (Glucose-dependent Insulinotropic Polypeptide, 42 amino acids) |
| **Peptide 2** | DPP-4 (Dipeptidyl Peptidase-4) |
| **Interaction Type** | Cleavage |
| **Affinity** | t½ ~5-7 minutes (endogenous) |
| **Mechanism** | DPP-4 cleaves N-terminal Tyr1-Ala2 dipeptide from GIP, producing GIP (3-42) which has greatly reduced receptor binding affinity. GIP normally acts via GIPR (class B GPCR) to stimulate insulin secretion in a glucose-dependent manner. |
| **Biological Significance** | GIP is co-degraded with GLP-1 by DPP-4, making DPP-4 inhibitors effective for both incretins. GIP is the dominant incretin in healthy subjects. Dual GIP/GLP-1 agonists (tirzepatide) show superior glycemic and weight loss efficacy. |
| **Structural Basis** | GIP N-terminal Tyr1-Ala2 is optimal DPP-4 substrate (Tyr at P2 acceptable). GIPR binding requires intact N-terminus for receptor activation. GIP α-helical structure (residues 6-42) preserved after cleavage but N-terminal contact lost. |
| **Category** | Metabolic / Incretin Biology |

---

### 20. PYY → DPP-4 (Substrate)

| Field | Value |
|-------|-------|
| **ID** | `pyy-dpp4` |
| **Peptide 1** | PYY (Peptide YY, 36 amino acids) |
| **Peptide 2** | DPP-4 (Dipeptidyl Peptidase-4) |
| **Interaction Type** | Cleavage |
| **Affinity** | t½ ~8 minutes (PYY1-36 → PYY3-36) |
| **Mechanism** | DPP-4 cleaves N-terminal Tyr1-Pro2 dipeptide from PYY (1-36), producing PYY (3-36) which is the active anorexigenic form preferentially binding Y2R and Y5R. PYY (3-36) reduces appetite and gastric emptying via hypothalamic Y2R. |
| **Biological Significance** | Unlike GLP-1, DPP-4 cleavage of PYY produces the active metabolite. PYY (3-36) is the major circulating form. This complicates DPP-4i effects on appetite regulation. PYY-based therapeutics investigated for obesity. |
| **Structural Basis** | PYY Tyr1-Pro2 is classic DPP-4 substrate (Xaa-Pro). PYY (3-36) C-terminal α-amidation preserved. NPY family PP-fold structure maintained after cleavage. Y2R selectivity of PYY (3-36) determined by loss of N-terminal contacts with Y1R. |
| **Category** | Metabolic / Appetite Regulation |

---

## Peptide-Peptide Interactions

### 21. Insulin A-chain ↔ B-chain (Disulfide Bonds)

| Field | Value |
|-------|-------|
| **ID** | `insulin-ab-chains` |
| **Peptide 1** | Insulin A-chain (21 amino acids) |
| **Peptide 2** | Insulin B-chain (30 amino acids) |
| **Interaction Type** | Modification (Disulfide Bonding) |
| **Affinity** | Inter-chain disulfide bond energy |
| **Mechanism** | Two inter-chain disulfide bonds (A7-B7, A20-B19) covalently link the A and B chains. One intra-chain disulfide (A6-A11) stabilizes A-chain. Proinsulin folding in ER requires correct disulfide pairing; C-peptide excision yields mature two-chain insulin. |
| **Biological Significance** | Disulfide bonds are essential for insulin structural integrity and bioactivity. Incorrect disulfide pairing leads to misfolding and ER stress (MIDY syndrome). Basis for recombinant insulin production requiring proper folding conditions. |
| **Structural Basis** | A-chain: two α-helices (A1-A8, A12-A18) with A6-A11 disulfide. B-chain: extended N-terminus, α-helix (B9-B19), β-turn, C-terminal β-strand. Classic T-state R-state conformational equilibrium. Zinc hexamer storage form. |
| **Category** | Protein Folding / Hormone Structure |

---

### 22. Oxytocin Intramolecular (Disulfide Bond)

| Field | Value |
|-------|-------|
| **ID** | `oxytocin-disulfide` |
| **Peptide 1** | Oxytocin (Cys1-Tyr2-Ile3-Gln4-Asn5-Cys6-Pro7-Leu8-Gly9-NH2) |
| **Peptide 2** | Oxytocin (self - intramolecular) |
| **Interaction Type** | Modification (Intramolecular Disulfide) |
| **Affinity** | Disulfide bond stability |
| **Mechanism** | Cys1-Cys6 disulfide bond forms a 20-membered ring (toconring) that constrains the peptide into a bioactive conformation. Ring formation is essential for receptor binding selectivity and metabolic stability. |
| **Biological Significance** | Disulfide ring is pharmacophore required for oxytocin activity. Ring size and conformation determine selectivity for OXTR vs V1aR/V2R. Non-reducible thioether analogs (carbetocin) have improved stability. Template for peptidomimetic drug design. |
| **Structural Basis** | 20-membered ring with β-turn at Gln4-Asn5. Tyr2 and Ile3 project from ring surface for receptor contact. C-terminal tail (Pro7-Leu8-Gly9-NH2) extends from ring, contributing to binding. Type I β-turn stabilized by Asn5 side chain. |
| **Category** | Neuropeptide Structure |

---

### 23. Vasopressin Intramolecular (Disulfide Bond)

| Field | Value |
|-------|-------|
| **ID** | `vasopressin-disulfide` |
| **Peptide 1** | Vasopressin (Cys1-Tyr2-Phe3-Gln4-Asn5-Cys6-Pro7-Arg8-Gly9-NH2) |
| **Peptide 2** | Vasopressin (self - intramolecular) |
| **Interaction Type** | Modification (Intramolecular Disulfide) |
| **Affinity** | Disulfide bond stability |
| **Mechanism** | Cys1-Cys6 disulfide forms identical 20-membered ring as oxytocin. Phe3 (vs Ile3 in OT) and Arg8 (vs Leu8) alter receptor selectivity toward V1aR/V2R over OXTR. Ring constrains bioactive conformation. |
| **Biological Significance** | Two amino acid substitutions from oxytocin completely shift biological activity from uterine contraction/milk ejection to antidiuresis/vasoconstriction. Demonstrates how minor sequence changes in constrained peptides alter receptor selectivity. |
| **Structural Basis** | Same toconring as oxytocin but Phe3 side chain creates hydrophobic contact surface for vasopressin receptors. Arg8 guanidinium forms salt bridge with V2R acidic residues. Different β-turn propensity due to Phe3 vs Ile3. |
| **Category** | Neuropeptide Structure / SAR |

---

### 24. Glutathione (γ-Glu-Cys-Gly Tripeptide)

| Field | Value |
|-------|-------|
| **ID** | `glutathione-tripeptide` |
| **Peptide 1** | γ-Glutamyl moiety |
| **Peptide 2** | Cysteinyl-Gly dipeptide |
| **Interaction Type** | Modification (Unusual Peptide Bond) |
| **Affinity** | Amide bond stability |
| **Mechanism** | Glutathione (GSH: γ-Glu-Cys-Gly) contains an unusual γ-glutamyl bond (γ-carboxyl of Glu to amino of Cys) instead of standard α-peptide bond. Synthesized by γ-glutamylcysteine synthetase and glutathione synthetase in two ATP-dependent steps. |
| **Biological Significance** | Most abundant intracellular thiol (1-10 mM). Major antioxidant maintaining redox homeostasis. Substrate for glutathione peroxidase (H2O2 detoxification) and glutathione S-transferase (xenobiotic conjugation). GSH/GSSG ratio is cellular redox indicator. |
| **Structural Basis** | γ-Glu bond resistant to most peptidases (only γ-glutamyl transpeptidase cleaves it). Free thiol of Cys2 enables disulfide chemistry. Tripeptide size allows membrane transport via specific carriers. Gly3 carboxylate contributes to solubility. |
| **Category** | Antioxidant / Cellular Defense |

---

### 25. Collagen Triple Helix (Gly-X-Y Repeats)

| Field | Value |
|-------|-------|
| **ID** | `collagen-triple-helix` |
| **Peptide 1** | Collagen α1 chain |
| **Peptide 2** | Collagen α2 chain (and/or α1 chain) |
| **Interaction Type** | Binding (Triple Helix Assembly) |
| **Affinity** | Cooperative stability, melting temperature 37-41°C |
| **Mechanism** | Three collagen polypeptide chains (α chains) wind into right-handed polyproline II helices, then supercoil into left-handed triple helix. Glycine at every third position (Gly-X-Y) required for close packing in helix interior. X position often Pro (28%), Y position often 4-Hyp (38%). |
| **Biological Significance** | Most abundant protein in mammals (25-35% of total protein). Provides structural framework for skin, bone, tendon, cartilage, and vasculature. Defects cause osteogenesis imperfecta, Ehlers-Danlos syndrome. Therapeutic target for fibrosis. |
| **Structural Basis** | Gly at every 3rd residue essential (Gly→Arg substitution causes OI). Pro and 4-Hyp stabilize PPII helix via pyrrolidine ring puckering. Interchain H-bonds between Gly NH and X-position C=O. Hydroxyproline stabilizes via water-mediated H-bond network. |
| **Category** | Structural Protein / Extracellular Matrix |

---

### 26. Amyloid-beta Aggregation (Self-association)

| Field | Value |
|-------|-------|
| **ID** | `amyloid-beta-aggregation` |
| **Peptide 1** | Aβ monomer (Aβ40 or Aβ42) |
| **Peptide 2** | Aβ monomer (self-association) |
| **Interaction Type** | Binding (Aggregation / Fibril Formation) |
| **Affinity** | Kd for monomer-monomer ~10-100 μM; cooperative nucleation-dependent polymerization |
| **Mechanism** | Aβ monomers undergo conformational change exposing hydrophobic core (residues 17-21: LVFFA), forming β-sheet-rich oligomers. Nucleation-dependent polymerization: monomers → oligomers → protofibrils → mature fibrils. Oligomers are most neurotoxic species. |
| **Biological Significance** | Hallmark of Alzheimer's disease pathogenesis. Amyloid cascade hypothesis: Aβ accumulation triggers tau pathology, neuroinflammation, and neurodegeneration. Therapeutic antibodies (lecanemab, donanemab) target Aβ aggregates. Aβ42 more aggregation-prone and toxic than Aβ40. |
| **Structural Basis** | Aβ42 C-terminal residues Ile41, Ala42 create additional hydrophobic contact accelerating aggregation. Cross-β structure in fibrils with intermolecular backbone H-bonds parallel to fibril axis. Salt bridge between Asp23-Lys28 stabilizes fibril. Turn at Gly25-Ser26. |
| **Category** | Neurodegeneration / Protein Misfolding |

---

### 27. Alpha-synuclein Aggregation (Self-association)

| Field | Value |
|-------|-------|
| **ID** | `alpha-synuclein-aggregation` |
| **Peptide 1** | α-Synuclein monomer |
| **Peptide 2** | α-Synuclein monomer (self-association) |
| **Interaction Type** | Binding (Aggregation / Fibril Formation) |
| **Affinity** | NACore region drives aggregation, nucleation barrier |
| **Mechanism** | Intrinsically disordered α-synuclein (140 aa) undergoes conformational change to β-sheet structure, forming oligomers and amyloid fibrils. NAC (non-amyloid-β component) region (residues 61-95) is aggregation core. Prion-like seeding and cell-to-cell transmission occur. |
| **Biological Significance** | Lewy body pathology in Parkinson's disease, dementia with Lewy bodies, and multiple system atrophy. A53T, A30P, E46K mutations cause familial PD by accelerating aggregation. Immunotherapies targeting α-syn aggregates in clinical trials. |
| **Structural Basis** | NACore (residues 68-78: VTGVTAVAQKT) forms cross-β fibril spine. Residues 71-82 critical for aggregation. Greek-key topology in fibril with β-arc and β-arch motifs. N-terminal amphipathic helix (1-60) and acidic C-terminal tail (96-140) modulate aggregation. |
| **Category** | Neurodegeneration / Protein Misfolding |

---

### 28. Tau Aggregation (Self-association)

| Field | Value |
|-------|-------|
| **ID** | `tau-aggregation` |
| **Peptide 1** | Tau monomer (microtubule-associated protein tau) |
| **Peptide 2** | Tau monomer (self-association) |
| **Interaction Type** | Binding (Aggregation / Paired Helical Filaments) |
| **Affinity** | Hexapeptide motifs VQIINK and VQIVYK drive nucleation |
| **Mechanism** | Hyperphosphorylated tau detaches from microtubules and aggregates into paired helical filaments (PHFs) and neurofibrillary tangles (NFTs). Two hexapeptide motifs (275VQIINK280 and 306VQIVYK311) in R2 and R3 repeats form cross-β structure. Prion-like spreading between neurons. |
| **Biological Significance** | Tau pathology correlates with cognitive decline in Alzheimer's disease. Also in frontotemporal dementia (FTDP-17), progressive supranuclear palsy, corticobasal degeneration, CTE. Tau-targeting therapies: antisense oligonucleotides (BIIB080), immunotherapies, aggregation inhibitors. |
| **Structural Basis** | VQIVYK (PHF6) and VQIINK (PHF6*) hexapeptides form steric zippers with interdigitating side chains. Cross-β spine with paired β-sheets. 4R tau (with R2) more aggregation-prone than 3R tau. Mutations (P301L, P301S) enhance β-sheet propensity. |
| **Category** | Neurodegeneration / Protein Misfolding |

---

### 29. Prion Protein Misfolding (Conformational Change)

| Field | Value |
|-------|-------|
| **ID** | `prion-misfolding` |
| **Peptide 1** | PrPC (Normal Cellular Prion Protein) |
| **Peptide 2** | PrPSc (Scrapie/Pathological Prion Protein) |
| **Interaction Type** | Modification (Conformational Conversion) |
| **Affinity** | Template-directed, stoichiometric conversion |
| **Mechanism** | PrPC (predominantly α-helical) converts to PrPSc (β-sheet-rich) through template-directed misfolding. PrPSc acts as seed recruiting PrPC, causing exponential propagation. PrPSc is protease-resistant, forms amyloid plaques. Infectious protein (prion) transmits disease without nucleic acid. |
| **Biological Significance** | Causes transmissible spongiform encephalopathies: CJD, kuru, fatal familial insomnia, BSE (mad cow disease), scrapie. Only known infectious protein agent. Universal prion hypothesis applies to other amyloids (yeast prions, α-synuclein). |
| **Structural Basis** | PrPC: globular domain (128-231) with 3 α-helices and short β-sheet. PrPSc: increased β-sheet content (43%), protease-resistant core (residues 90-231). Conversion involves helix-to-sheet transition. β-solenoid or parallel in-register β-sheet models proposed for PrPSc structure. |
| **Category** | Prion Disease / Infectious Amyloid |

---

### 30. Fibrinogen → Fibrin (Thrombin Cleavage)

| Field | Value |
|-------|-------|
| **ID** | `fibrinogen-fibrin` |
| **Peptide 1** | Fibrinogen (Aα, Bβ, γ chains) |
| **Peptide 2** | Fibrin (polymerized) |
| **Interaction Type** | Cleavage / Binding (Polymerization) |
| **Affinity** | Thrombin cleavage: KM ~5-50 μM; fibrin monomer polymerization: cooperative |
| **Mechanism** | Thrombin cleaves fibrinopeptides A (16 aa) and B (14 aa) from Aα and Bβ chains respectively, exposing polymerization sites (knobs 'A' and 'B'). Knobs 'A' insert into holes 'a' in γ-nodules and knobs 'B' into holes 'b' in β-nodules of adjacent molecules. Factor XIIIa cross-links γ-γ and α-α chains covalently. |
| **Biological Significance** | Terminal step of coagulation cascade. Fibrin clot provides hemostatic plug and wound healing scaffold. Abnormal fibrin(ogen) causes bleeding disorders or thrombotic tendency. Fibrin sealants used surgically. Target for thrombolytics (tPA activates plasminogen → plasmin degrades fibrin). |
| **Structural Basis** | Fibrinogen: 340 kDa trinodular elongated molecule (D-E-D domains). Fibrinopeptide A release exposes GPRV sequence (knob 'A'). Fibrinopeptide B exposes GHRP sequence (knob 'B'). Half-staggered protofibrils → lateral aggregation → fibers → branching network. |
| **Category** | Hemostasis / Coagulation |

---

## Peptide-Protein Interactions

### 31. Ubiquitin → Proteasome (Degradation Signal)

| Field | Value |
|-------|-------|
| **ID** | `ubiquitin-proteasome` |
| **Peptide 1** | Ubiquitin (76 amino acids, 8.5 kDa) |
| **Peptide 2** | 26S Proteasome |
| **Interaction Type** | Modification (Ubiquitination) / Binding (Recognition) |
| **Affinity** | K48-linked poly-Ub chain: Kd ~100 nM-1 μM for proteasome receptors |
| **Mechanism** | Ubiquitin conjugated to substrate lysines via E1-E2-E3 enzymatic cascade (isopeptide bond). K48-linked poly-ubiquitin chain (≥4 Ub) is canonical degradation signal. 26S proteasome recognizes poly-Ub via Rpn10/Rpn13 receptors, deubiquitinases recycle Ub, and 20S core particle degrades substrate to peptides. |
| **Biological Significance** | Ubiquitin-proteasome system (UPS) degrades 80-90% of intracellular proteins. Controls cell cycle, transcription, DNA repair, immune response. UPS dysfunction in neurodegeneration, cancer, inflammation. Proteasome inhibitors (bortezomib) for multiple myeloma. PROTACs exploit UPS for targeted protein degradation. |
| **Structural Basis** | Ubiquitin: β-grasp fold with C-terminal Gly76 essential for conjugation. K48 linkage creates compact signal recognized by proteasome. 26S proteasome: 19S regulatory particle (lid + base) + 20S barrel (α7β7β7α7). Six ATPases in base unfold substrates. Threonine protease active sites in β subunits. |
| **Category** | Protein Quality Control / Degradation |

---

### 32. Peptide → MHC Class I (Antigen Presentation)

| Field | Value |
|-------|-------|
| **ID** | `peptide-mhc1` |
| **Peptide 1** | Antigenic peptide (8-10 residues) |
| **Peptide 2** | MHC Class I molecule (HLA-A, -B, -C) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~1 nM - 10 μM (peptide-dependent); high-affinity peptides Kd < 100 nM |
| **Mechanism** | Cytoplasmic proteins degraded by proteasome → peptides transported to ER via TAP → loaded onto MHC-I with help of tapasin/ERp57/calreticulin → peptide-MHC-I complex displayed on cell surface → recognized by CD8+ cytotoxic T lymphocytes. Presents intracellular antigens. |
| **Biological Significance** | Essential for CD8+ T cell-mediated immunity against viruses and tumors. MHC-I polymorphism determines peptide repertoire (HLA restriction). Basis for vaccine design, adoptive T cell therapy, and neoantigen-based immunotherapy. Loss of MHC-I is immune evasion mechanism in cancer. |
| **Structural Basis** | MHC-I: α1/α2 domains form peptide-binding groove with two walls (α1/α2 helices) and floor (β-sheet). Groove closed at both ends, accommodating 8-10 mer peptides. Anchor residues at P2 (B pocket) and PΩ (F pocket) determine peptide binding. Polymorphic residues line groove. |
| **Category** | Immunology / Antigen Presentation |

---

### 33. Peptide → MHC Class II (Antigen Presentation)

| Field | Value |
|-------|-------|
| **ID** | `peptide-mhc2` |
| **Peptide 1** | Antigenic peptide (13-25 residues) |
| **Peptide 2** | MHC Class II molecule (HLA-DR, -DP, -DQ) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~100 nM - 10 μM; peptide exchange half-life hours |
| **Mechanism** | Extracellular antigens endocytosed and processed in endosomes/lysosomes → peptides loaded onto MHC-II in MIIC compartment with help of HLA-DM (peptide editor) → peptide-MHC-II displayed on APC surface → recognized by CD4+ T helper cells. CLIP peptide blocks groove until exchange. |
| **Biological Significance** | Critical for CD4+ T cell activation driving humoral and cellular immunity. MHC-II polymorphism associated with autoimmune diseases (HLA-DR4 with rheumatoid arthritis, HLA-DQ2/DQ8 with celiac disease). Target for tolerogenic vaccines in autoimmunity. |
| **Structural Basis** | MHC-II: α1/β1 domains form open-ended peptide-binding groove accommodating longer peptides (13-25 aa). Peptide extends beyond groove at both ends. P1, P4, P6, P9 anchor residues in pockets. HLA-DM catalyzes CLIP/peptide exchange by destabilizing low-affinity peptides. |
| **Category** | Immunology / Antigen Presentation |

---

### 34. Peptide → TCR (Immune Recognition)

| Field | Value |
|-------|-------|
| **ID** | `peptide-tcr` |
| **Peptide 1** | Antigenic peptide (8-10 aa for TCRαβ) |
| **Peptide 2** | TCR (T Cell Receptor, αβ or γδ) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~1-100 μM (relatively weak); fast kinetics (kon ~10³-10⁵ M⁻¹s⁻¹, koff ~0.01-1 s⁻¹) |
| **Mechanism** | TCR recognizes peptide-MHC complex (pMHC) through complementarity-determining regions (CDRs). CDR1/CDR2 contact MHC helices; CDR3 (most variable) contacts peptide and MHC floor. Binding triggers conformational change in TCR, initiating ITAM phosphorylation via CD3 complex → ZAP-70 → downstream signaling. |
| **Biological Significance** | Basis of adaptive immune recognition. ~10⁷-10⁸ distinct TCRs generated by V(D)J recombination. TCR-pMHC interaction determines immune response specificity. TCR-T cell therapy (engineered TCRs) for cancer. TCR cross-reactivity enables recognition of variant peptides. |
| **Structural Basis** | TCRαβ: Vα-Cα and Vβ-Cβ immunoglobulin-like domains. CDR3 loops (especially CDR3β) form central contacts with peptide. Footprint diagonal across pMHC surface (~2200 Å² buried surface area). CDR3 hypervariability from V(D)J junctional diversity. |
| **Category** | Immunology / T Cell Biology |

---

### 35. Peptide → BCR (Immune Recognition)

| Field | Value |
|-------|-------|
| **ID** | `peptide-bcr` |
| **Peptide 1** | Antigenic peptide / protein epitope |
| **Peptide 2** | BCR (B Cell Receptor, membrane-bound immunoglobulin) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~10 nM - 10 μM (naive); Kd ~0.1-10 nM (affinity-matured) |
| **Mechanism** | BCR binds native (unprocessed) antigens through surface-exposed epitopes (conformational or linear). Binding triggers BCR cross-linking → ITAM phosphorylation by Lyn → Syk activation → B cell activation, proliferation, and differentiation to antibody-secreting plasma cells. Affinity maturation in germinal centers improves binding. |
| **Biological Significance** | BCR/antibody recognition of diverse antigens (proteins, carbohydrates, lipids, small molecules). Humoral immunity provides neutralization, opsonization, and complement activation. Monoclonal antibody therapeutics exploit high-affinity peptide/protein recognition. Phage display selects peptide-binding antibodies. |
| **Structural Basis** | IgH and IgL variable domains form antigen-binding surface with 6 CDR loops (H1, H2, H3, L1, L2, L3). CDR-H3 most diverse and often dominant in antigen contact. Parity surface area ~700-900 Å² for peptide epitopes. Somatic hypermutation introduces point mutations improving affinity. |
| **Category** | Immunology / B Cell Biology |

---

## Peptide-Ligand Interactions

### 36. Biotin-Streptavidin

| Field | Value |
|-------|-------|
| **ID** | `biotin-streptavidin` |
| **Peptide 1** | Biotin (vitamin B7, non-peptide ligand) |
| **Peptide 2** | Streptavidin (53 kDa tetrameric protein) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~10⁻¹⁵ M (femtomolar, one of strongest non-covalent interactions known) |
| **Mechanism** | Biotin binds in streptavidin β-barrel central cavity through extensive hydrogen bonding network (8 H-bonds) and hydrophobic contacts. Binding involves conformational closure of flexible loop (L3/4) creating tight fit. Extremely slow dissociation rate (t₁/₂ ~200 days). |
| **Biological Significance** | Gold standard for bioconjugation and detection systems. Avidin-biotin technology used in ELISA, immunohistochemistry, flow cytometry, pull-down assays, and drug delivery. Biotinylated peptides/proteins detected with streptavidin conjugates. Basis for proximity ligation assays. |
| **Structural Basis** | Streptavidin: 4 identical 159-residue subunits forming β-barrel tetramer. Each subunit binds one biotin. Ureido ring of biotin forms H-bonds with Ser45, Tyr43, Asn23. Biotin carboxylate H-bonds with Ser27, Lys121. Hydrophobic contacts with Trp79, Trp92, Leu25. |
| **Category** | Affinity Technology / Bioconjugation |

---

### 37. His-tag → Ni-NTA (Affinity Purification)

| Field | Value |
|-------|-------|
| **ID** | `histag-ninta` |
| **Peptide 1** | Polyhistidine tag (His₆, 6xHis tag) |
| **Peptide 2** | Ni-NTA (Nickel-Nitrilotriacetic acid) resin |
| **Interaction Type** | Binding (Coordination Chemistry) |
| **Affinity** | Kd ~10⁻⁶ M (micromolar) for His₆; ~10⁻⁷-10⁻⁸ M for His₈-₁₀ |
| **Mechanism** | Imidazole nitrogen atoms of histidine residues coordinate with Ni²⁺ ions chelated by NTA (nitrilotriacetic acid) on agarose/agarose beads. Typically 2-3 His residues coordinate each Ni²⁺ in octahedral geometry. Multiple His residues increase avidity. Elution with imidazole (250-500 mM) competes for Ni²⁺ coordination. |
| **Biological Significance** | Most widely used protein purification tag. Added to N- or C-terminus via cloning. Enables one-step IMAC (Immobilized Metal Affinity Chromatography) purification from crude lysate. Small tag (0.84 kDa) minimally affects protein function. Used for structural biology, protein-protein interaction studies, and therapeutic protein production. |
| **Structural Basis** | NTA provides 4 coordination sites for Ni²⁺ (3 carboxylates + 1 amine). Ni²⁺ has 6 coordination sites; remaining 2-3 occupied by His imidazole Nε/Nδ atoms. His-tag spacer (typically Ser-Ser linker) improves accessibility. His₆ wraps around Ni-NTA surface. |
| **Category** | Protein Purification / Biochemistry |

---

### 38. GST-tag → Glutathione (Affinity Purification)

| Field | Value |
|-------|-------|
| **ID** | `gst-tag-glutathione` |
| **Peptide 1** | GST-tag (Glutathione S-Transferase, 26 kDa) |
| **Peptide 2** | Glutathione (reduced, GSH) immobilized on agarose |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~10⁻⁶ M (μM); improved with engineered GST variants |
| **Mechanism** | GST enzyme binds its substrate glutathione (γ-Glu-Cys-Gly) at the G-site in the N-terminal domain. Immobilized GSH on Sepharose captures GST-fusion proteins. Elution with 10-20 mM reduced glutathione competes for binding. GST dimerization increases avidity. |
| **Biological Significance** | Second most common affinity tag after His-tag. Larger tag (26 kDa) increases protein solubility. Enables one-step purification and protein-protein interaction studies (GST pull-down assays). Cleavable by TEV, PreScission, or thrombin proteases for tag removal. Also used for antibody-based detection. |
| **Structural Basis** | GST: α/β/α sandwich fold. GSH binds in shallow cleft via H-bonds to Trp38, Lys44, Gln49, Ser65, Asp103, Arg134. γ-Glu carboxylate contacts basic residues. Cys thiol faces solvent. Dimer interface buries hydrophobic surface. Linker (Ser-Ser) between GST and target protein. |
| **Category** | Protein Purification / Biochemistry |

---

### 39. FLAG-tag → Anti-FLAG (Affinity Purification)

| Field | Value |
|-------|-------|
| **ID** | `flagtag-antiflag` |
| **Peptide 1** | FLAG-tag (DYKDDDDK, 8 amino acids) |
| **Peptide 2** | Anti-FLAG M1/M2/M5 monoclonal antibody |
| **Interaction Type** | Binding |
| **Affinity** | M2 antibody: Kd ~1-10 nM; M1 antibody: Ca²⁺-dependent, Kd ~10 nM |
| **Mechanism** | FLAG peptide (Asp-Tyr-Lys-Asp-Asp-Asp-Asp-Lys) recognized by anti-FLAG monoclonal antibodies through complementary determining regions. M1 antibody requires Ca²⁺ for binding (binds N-terminal Asp-Tyr). M2 antibody recognizes internal epitope (Ca²⁺-independent). Elution with FLAG peptide (100-200 μg/mL) or EDTA (M1). |
| **Biological Significance** | Hydrophilic, enterokinase-cleavable tag for protein purification and detection. Negatively charged (4 Asp residues) minimizes non-specific binding. Ca²⁺-dependent M1 binding enables gentle elution. Used for co-immunoprecipitation, Western blot, immunofluorescence. Preferred for secreted proteins. |
| **Structural Basis** | FLAG peptide: extended conformation in antibody binding site. DYKDDDDK sequence creates amphipathic epitope. M1 antibody: Ca²⁺ coordinates N-terminal Asp1 carboxylate and Tyr2 hydroxyl. M2 antibody: recognizes DYKDDDD internal motif. Anti-FLAG resin: M2 conjugated to agarose. |
| **Category** | Protein Purification / Immunochemistry |

---

### 40. HA-tag → Anti-HA (Affinity Purification)

| Field | Value |
|-------|-------|
| **ID** | `hatag-antiha` |
| **Peptide 1** | HA-tag (YPYDVPDYA, 9 amino acids) |
| **Peptide 2** | Anti-HA monoclonal antibody (HA.11 or 12CA5) |
| **Interaction Type** | Binding |
| **Affinity** | Kd ~1-10 nM |
| **Mechanism** | HA peptide (hemagglutinin epitope, derived from human influenza hemagglutinin protein residues 98-106) binds anti-HA monoclonal antibodies through specific CDR interactions. Used for immunoprecipitation, Western blot detection, and affinity purification. Elution with HA peptide (100-500 μg/mL) or low pH. |
| **Biological Significance** | One of the first epitope tags developed. Well-characterized antibody clones (12CA5, HA.11) with high specificity. Used extensively for protein localization, interaction studies, and expression monitoring. Often used in combination with other tags (dual-tagging strategies). Compatible with most protein expression systems. |
| **Structural Basis** | HA peptide: YPYDVPDYA adopts extended conformation with central Pro introducing kink. Tyr1, Asp4, Pro5 critical for antibody recognition. Tyr6 and Asp7 also contribute to binding. Peptide derived from influenza virus HA1 subunit surface loop. Small size (1.1 kDa) minimizes protein perturbation. |
| **Category** | Protein Purification / Immunochemistry |

---

## Summary Statistics

| Category | Count | Key Examples |
|----------|-------|--------------|
| Peptide-Receptor | 10 | GLP-1R, IR, OXTR, V1aR, V2R, GnRHR, SSTR2, CGRP-R, Y1R, OX1R |
| Peptide-Enzyme | 10 | DPP-4, ACE, Neprilysin, Insulin RTK |
| Peptide-Peptide | 10 | Disulfide bonds, amyloid aggregation, collagen, fibrin |
| Peptide-Protein | 5 | Ubiquitin-proteasome, MHC, TCR, BCR |
| Peptide-Ligand | 5 | Biotin-streptavidin, His-NiNTA, GST-GSH, FLAG, HA |
| **Total** | **40** | |

---

## Interaction Type Distribution

| Type | Count | Description |
|------|-------|-------------|
| Binding | 17 | Non-covalent molecular recognition |
| Activation | 7 | Receptor/enzyme stimulation |
| Cleavage | 8 | Proteolytic processing |
| Modification | 5 | Covalent modification (disulfide, conformational) |
| Inhibition | 1 | Suppression of target activity |
| Mixed | 2 | Binding + cleavage or modification + binding |

---

## Notes

- Affinity values (KD, IC50, KM) are approximate and vary with experimental conditions (temperature, pH, buffer, measurement technique)
- Half-life values reflect native peptide metabolism, not therapeutic analogs
- Structural information derived from X-ray crystallography, cryo-EM, and NMR studies
- Some interactions (e.g., amyloid aggregation) involve multiple transient species with different affinities
- Therapeutic applications mentioned are for context; consult clinical references for current indications
