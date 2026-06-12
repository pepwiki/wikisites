# Peptide Immunology: Scientifically Rigorous Quiz

## Advanced MHC, T Cell Biology & Vaccine Design

### Question 1
**Topic:** MHC Class I Peptide Binding Motif

The HLA-A*02:01 allele preferentially binds 9-mer peptides with specific anchor residues at P2 and P9. What are the canonical primary anchor residues for HLA-A*02:01-restricted epitopes?

- A) P2: Leu/Met; P9: Val/Leu
- B) P2: Lys/Arg; P9: Phe/Tyr
- C) P2: Pro/Gly; P9: Asp/Glu
- D) P2: Ile/Val; P9: Lys/Arg

**Correct Answer:** A) P2: Leu/Met; P9: Val/Leu

**Explanation:** HLA-A*02:01 (A2 supertype) has a hydrophobic B pocket accommodating aliphatic residues at P2 (Leu, Met, Ile, Val) and an F pocket favoring hydrophobic C-terminal anchors (Val, Leu, Ile). The binding groove dimensions are ~25 Å × 10 Å × 11 Å. Secondary anchors include P1 (Asp, Glu), P3 (Pro), and P7 (Ser, Thr). The binding affinity (KD) for optimal epitopes ranges from 5–500 nM, measured by competitive fluorescence polarization assays. NetMHCpan 4.0 predicts binding with Pearson r = 0.82 for HLA-A*02:01. The crystal structure (PDB: 1HHK) shows P2 Leu buried in the B pocket with van der Waals contacts to Tyr7, Tyr99, and Met156.

---

### Question 2
**Topic:** MHC Class II Peptide Binding (P1-P9 Core)

MHC class II molecules bind peptides of 13–25 residues through an open-ended groove. For HLA-DRB1*15:01, which residues constitute the P1, P4, and P9 anchor positions within the 9-mer core?

- A) P1: large hydrophobic (Phe, Trp, Tyr); P4: small aliphatic (Ala, Val); P9: acidic (Asp, Glu)
- B) P1: large hydrophobic (Phe, Trp, Ile); P4: aliphatic (Val, Leu, Ile); P9: aliphatic (Leu, Val, Ile)
- C) P1: basic (Lys, Arg); P4: Pro; P9: Gly
- D) P1: acidic (Asp, Glu); P4: aromatic (Phe, Tyr); P9: basic (Lys, Arg)

**Correct Answer:** B) P1: large hydrophobic (Phe, Trp, Ile); P4: aliphatic (Val, Leu, Ile); P9: aliphatic (Leu, Val, Ile)

**Explanation:** HLA-DRB1*15:01 (DR2 serotype) has a P1 pocket formed by β-chain residues β81 (His), β82, β85 (Val), and α-chain α31 (Phe) that accommodates large hydrophobic side chains. The P4 pocket (β13, β70, β71, β74) is shallow and favors aliphatic residues. The P6 pocket favors small residues (Ser, Thr, Ala, Pro). The P9 pocket is hydrophobic. Crystal structure (PDB: 1BX2) shows the CLIP peptide (PVSKMRMATPLLMQA) binding with P1-Met, P4-Met, P6-Thr, P9-Leu anchors. The binding groove is ~24 Å wide, open at both ends, allowing peptide overhangs of 3–9 residues beyond the core.

---

### Question 3
**Topic:** TAP Transporter Specificity

The transporter associated with antigen processing (TAP, TAP1/TAP2 heterodimer) translocates proteasomal products into the ER lumen. What is the optimal peptide length and C-terminal residue preference for human TAP?

- A) 8–12 residues; C-terminal preference for hydrophobic residues (Leu, Ile, Val, Phe)
- B) 15–20 residues; C-terminal preference for basic residues (Lys, Arg)
- C) 8–12 residues; C-terminal preference for acidic residues (Asp, Glu)
- D) 4–6 residues; no C-terminal preference

**Correct Answer:** A) 8–12 residues; C-terminal preference for hydrophobic residues (Leu, Ile, Val, Phe)

**Explanation:** Human TAP preferentially transports peptides of 8–12 residues (optimal 9–11) with hydrophobic C-termini, matching MHC class I binding requirements. TAP is an ABC transporter (TAP1: ABCB2; TAP2: ABCB3) with two nucleotide-binding domains (NBDs) and two transmembrane domains (TMDs). ATP hydrolysis (KM ≈ 150 μM for ATP) drives conformational changes. The translocation rate is ~20 peptides/sec. TAP polymorphisms (e.g., TAP2*0101 vs. TAP2*0201) alter substrate specificity. The ERAP1/ERAP2 aminopeptidases then trim N-terminal extensions to 8–10 residues for MHC I loading in the peptide-loading complex (PLC) containing tapasin, ERp57, and calreticulin.

---

### Question 4
**Topic:** Immunoproteasome Subunit Composition

The immunoproteasome replaces constitutive catalytic subunits with interferon-γ-inducible variants. Which three catalytic subunits define the immunoproteasome, and what are their constitutive counterparts?

- A) LMP2 (β1i) replaces β1; LMP7 (β5i) replaces β5; MECL-1 (β2i) replaces β2
- B) LMP2 (β1i) replaces β5; LMP7 (β5i) replaces β1; MECL-1 (β2i) replaces β2
- C) LMP2 (β2i) replaces β2; LMP7 (β1i) replaces β1; MECL-1 (β5i) replaces β5
- D) LMP2 (β1i) replaces β1; LMP7 (β2i) replaces β2; MECL-1 (β5i) replaces β5

**Correct Answer:** A) LMP2 (β1i) replaces β1; LMP7 (β5i) replaces β5; MECL-1 (β2i) replaces β2

**Explanation:** IFN-γ induces expression of LMP2 (PSMB9, β1i), LMP7 (PSMB8, β5i), and MECL-1 (PSMB10, β2i) via JAK-STAT signaling (IRF1 transcription factor). The immunoproteasome has altered cleavage preferences: β1i (caspase-like → cleaves after hydrophobic), β2i (trypsin-like enhanced), β5i (chymotrypsin-like → cleaves after hydrophobic/basic). This generates peptides with hydrophobic C-termini optimized for TAP transport and MHC I binding. The 20S immunoproteasome has MW ~700 kDa (α7β7β7α7). Thymoproteasome (β5t, PSMB11) is expressed in cortical thymic epithelial cells for positive selection of CD8+ T cells.

---

### Question 5
**Topic:** Proteasome Cleavage Site Preferences

The constitutive 20S proteasome has three catalytic activities with distinct cleavage preferences. Which combination correctly matches the catalytic subunit to its primary cleavage specificity?

- A) β1 (Y): post-glutamyl (caspase-like); β2 (T): trypsin-like; β5 (ChT-L): chymotrypsin-like
- B) β1 (ChT-L): chymotrypsin-like; β2 (Y): post-glutamyl; β5 (T): trypsin-like
- C) β1 (T): trypsin-like; β2 (ChT-L): chymotrypsin-like; β5 (Y): post-glutamyl
- D) β1 (Y): post-glutamyl; β2 (ChT-L): chymotrypsin-like; β5 (T): trypsin-like

**Correct Answer:** A) β1 (Y): post-glutamyl (caspase-like); β2 (T): trypsin-like; β5 (ChT-L): chymotrypsin-like

**Explanation:** The catalytic mechanism uses an N-terminal threonine (Thr1) as the nucleophile. β1 (PSMB6, Y subunit) cleaves after acidic residues (Asp, Glu) — caspase-like activity. β2 (PSMB7, Z subunit) cleaves after basic residues (Arg, Lys) — trypsin-like activity. β5 (PSMB5, X subunit) cleaves after hydrophobic residues (Leu, Tyr, Phe) — chymotrypsin-like activity. Cleavage products are typically 3–22 residues (median 8–10). The proteasome generates products with hydrophobic C-termini ~60% of the time, matching MHC I binding requirements. PA28 (11S regulator) enhances peptide production without altering specificity. The tricorn protease and tripeptidyl peptidase II (TPPII) further degrade proteasomal products.

---

### Question 6
**Topic:** TCR-pMHC Binding Kinetics

The T cell receptor (TCR) binds peptide-MHC complexes with characteristic weak affinity. What is the typical equilibrium dissociation constant (KD) range for productive TCR-pMHC interactions, and which kinetic parameter primarily determines T cell activation potency?

- A) KD = 1–100 μM; determined by koff (off-rate)
- B) KD = 1–100 nM; determined by kon (on-rate)
- C) KD = 1–100 μM; determined by kon (on-rate)
- D) KD = 100 pM–1 nM; determined by koff (off-rate)

**Correct Answer:** A) KD = 1–100 μM; determined by koff (off-rate)

**Explanation:** TCR-pMHC interactions have weak affinity (KD = 1–100 μM), with typical values: kon = 10³–10⁵ M⁻¹s⁻¹, koff = 0.01–1 s⁻¹, t1/2 = 1–100 s. The koff (dissociation rate) is the primary determinant of T cell activation — longer half-life correlates with agonist potency. This was demonstrated by Kalergis et al. (2001) showing that altered peptide ligands (APLs) with slower koff activate T cells more effectively. The TCR αβ heterodimer contacts pMHC diagonally: CDR1α/CDR2α contact MHC α2 helix, CDR3α contacts peptide center, CDR1β/CDR2β contact MHC α1 helix, CDR3β contacts peptide C-terminus and MHC α2 helix. Buried surface area is ~1,800–2,100 Å². The proofreading mechanism requires ~10 TCR-pMHC interactions for activation.

---

### Question 7
**Topic:** CD8+ T Cell Activation (Three-Signal Model)

Naïve CD8+ T cell activation requires three distinct signals from antigen-presenting cells. Which combination correctly identifies Signal 1, Signal 2, and Signal 3?

- A) Signal 1: TCR-pMHC I; Signal 2: CD28-B7 (CD80/CD86); Signal 3: IL-12/IFN-γ/type I IFN
- B) Signal 1: TCR-pMHC II; Signal 2: CD40-CD40L; Signal 3: IL-4
- C) Signal 1: TCR-pMHC I; Signal 2: CTLA-4-B7; Signal 3: TGF-β
- D) Signal 1: TCR-pMHC I; Signal 2: LFA-1-ICAM-1; Signal 3: IL-2

**Correct Answer:** A) Signal 1: TCR-pMHC I; Signal 2: CD28-B7 (CD80/CD86); Signal 3: IL-12/IFN-γ/type I IFN

**Explanation:** Signal 1 (specificity): TCR recognizes peptide-MHC I complex on DCs, with CD8 co-receptor binding MHC I α3 domain (residue 227). Signal 2 (co-stimulation): CD28 binds CD80 (B7-1, KD ≈ 4 μM) and CD86 (B7-2, KD ≈ 20 μM), activating PI3K-Akt and PLCγ1-NF-κB pathways. Without Signal 2, T cell anergy results (via E3 ubiquitin ligases GRAIL/Cbl-b). Signal 3 (polarization): IL-12 (from DCs, via TLR4/MyD88 signaling) activates STAT4, promoting CTL differentiation. IFN-α/β signals through IFNAR1/IFNAR2 → STAT1/STAT2 → ISGF3, enhancing granzyme B and perforin expression. Full activation requires 6–24 hours of APC contact and produces 10⁴–10⁵ effector cells from a single naïve precursor.

---

### Question 8
**Topic:** CD4+ T Helper Cell Differentiation

Naïve CD4+ T cells differentiate into distinct effector subsets driven by specific cytokine milieus and master transcription factors. Which combination correctly matches the cytokine signal to the master transcription factor and signature cytokine for Th17 differentiation?

- A) IL-6 + TGF-β → RORγt → IL-17A/IL-17F/IL-22
- B) IL-12 → T-bet → IFN-γ
- C) IL-4 → GATA3 → IL-4/IL-5/IL-13
- D) TGF-β + IL-2 → Foxp3 → IL-10/TGF-β

**Correct Answer:** A) IL-6 + TGF-β → RORγt → IL-17A/IL-17F/IL-22

**Explanation:** Th17 differentiation requires IL-6 (activating STAT3) and TGF-β (inducing RORγt expression via Smad2/3). IL-23 (IL-23R/IL-12Rβ1) maintains Th17 phenotype via STAT3 phosphorylation. RORγt (RORC gene, chr 12q21) drives IL-17A/IL-17F expression from the IL-17A-IL-17F locus. Th17 cells express CCR6 (homing to mucosal surfaces) and IL-23R. Pathogenic Th17 cells co-express T-bet and produce IFN-γ. For comparison: Th1 (IL-12/IFN-γ → T-bet → IFN-γ, CXCR3+), Th2 (IL-4 → GATA3 → IL-4/5/13, CCR4+), Treg (TGF-β/IL-2 → Foxp3 → IL-10, CTLA-4hi). iTreg vs. Th17 fate decision depends on IL-6: absent → Foxp3+ iTreg; present → RORγt+ Th17.

---

### Question 9
**Topic:** B Cell Epitope Prediction Algorithms

Linear B cell epitopes are predicted using amino acid propensity scales. Which algorithm combines hidden Markov models with Parker hydrophilicity, Emini surface accessibility, and Chou-Fasman secondary structure predictions?

- A) BepiPred-2.0
- B) ABCpred
- C) LBtope
- D) COBEpro

**Correct Answer:** A) BepiPred-2.0

**Explanation:** BepiPred-2.0 (Jespersen et al., 2017) uses a random forest classifier trained on epitope data from the IEDB, incorporating sequential (amino acid composition, hydrophilicity, accessibility) and structural features. For conformational epitopes, Discotope-2.0 uses surface accessibility (half-sphere exposure), spatial neighborhood clustering, and residue contact numbers (threshold: -3.7). The original BepiPred combined Parker hydrophilicity (threshold >1.0), Emini surface accessibility (threshold >1.0), and Chou-Fasman β-turn propensity. IEDB B cell epitope prediction tools include: BepiPred-2.0 (AUC ~0.61), ABCpred (ANN-based, AUC ~0.66), and Ellipro (structure-based, AUC ~0.69). The prediction accuracy limitation reflects the fact that ~90% of B cell epitopes are conformational, requiring 3D structural information.

---

### Question 10
**Topic:** T Cell Epitope Prediction Methods

NetMHCpan 4.0 predicts peptide-MHC binding using artificial neural networks trained on binding affinity and mass spectrometry eluted ligand data. What is the output threshold (in nM) used to classify peptides as "strong binders" for most HLA alleles?

- A) < 50 nM for strong binders; < 500 nM for weak binders
- B) < 500 nM for strong binders; < 5000 nM for weak binders
- C) < 5 nM for strong binders; < 50 nM for weak binders
- D) < 5000 nM for strong binders; < 50000 nM for weak binders

**Correct Answer:** A) < 50 nM for strong binders; < 500 nM for weak binders

**Explanation:** NetMHCpan 4.0 (Jurtz et al., 2017) uses a pan-allele approach with 200,000+ binding affinity measurements and 900,000+ MS-eluted ligands across 145+ HLA alleles. Output: %rank = percentile rank against a set of random natural peptides. Thresholds: Strong binder (SB) = %rank ≤ 0.5 or IC50 < 50 nM; Weak binder (WB) = %rank ≤ 2.0 or IC50 < 500 nM. The IEDB Analysis Suite provides complementary tools: NetMHC (consensus), PickPocket (pocket similarity), SMM (stabilized matrix method), Comblib (combinatorial library). For CD4+ T cell epitopes, NetMHCIIpan 3.2 predicts binding to HLA-DR, -DP, -DQ molecules. Combined prediction (IEDB Recommended) uses consensus of multiple methods with AUC ~0.9 for well-characterized alleles like HLA-A*02:01.

---

### Question 11
**Topic:** HLA Supertypes and Degenerate Binding

HLA supertypes group alleles with shared peptide-binding motifs due to similar pocket architecture. The A2 supertype includes which of the following alleles beyond HLA-A*02:01?

- A) A*02:02, A*02:03, A*02:06, A*68:02, A*69:01
- B) A*01:01, A*03:01, A*11:01, A*30:01
- C) A*24:02, A*23:01, A*31:01
- D) B*07:02, B*35:01, B*51:01

**Correct Answer:** A) A*02:02, A*02:03, A*02:06, A*68:02, A*69:01

**Explanation:** The A2 supertype (Sidney et al., 1996) is defined by: P2 anchor (Leu, Met, Ile, Val, Thr), PΩ anchor (Val, Leu). Members include A*02:01–A*02:07, A*02:10, A*02:11, A*02:12, A*02:14, A*02:17, A*68:02, A*69:01. The A2 supertype covers ~50% of global population (highest in Caucasians ~50%, lowest in Aborigines ~14%). Other supertypes: A3 (A*03, A*11, A*31, A*33, A*68; ~40% global), A24 (A*23, A*24, A*30; ~60% Asian), B7 (B*07, B*35, B*51, B*53; ~43% global), B44 (B*18, B*40, B*41, B*44, B*45; ~57% global). Supertype coverage calculation (Sette & Sidney, 1999) enables "pan-allele" vaccine design covering >99% global population with 8–12 supertypes.

---

### Question 12
**Topic:** Peptide Vaccine Adjuvant Mechanisms

CpG oligodeoxynucleotides (ODN 1826, CpG 7909) enhance peptide vaccine immunogenicity through TLR9 activation. What is the intracellular TLR9 signaling pathway downstream of CpG-ODN stimulation?

- A) TLR9 → MyD88 → IRAK1/4 → TRAF6 → TAK1 → NF-κB/AP-1 → pro-inflammatory cytokines
- B) TLR9 → TRIF → TBK1 → IRF3 → type I IFN
- C) TLR9 → MyD88 → RIP1 → NF-κB → anti-inflammatory cytokines
- D) TLR9 → DAI → STING → TBK1 → IRF3

**Correct Answer:** A) TLR9 → MyD88 → IRAK1/4 → TRAF6 → TAK1 → NF-κB/AP-1 → pro-inflammatory cytokines

**Explanation:** TLR9 (expressed in B cells, pDCs, macrophages) recognizes unmethylated CpG motifs (5'-purine-purine-CG-pyrimidine-pyrimidine-3'). CpG-ODN classes: Class A (2216, pDC activation, IFN-α via IRF7); Class B (1826/7909, B cell/macrophage activation, IL-6/TNF-α via NF-κB); Class C (2395, combined). Poly I:C (TLR3 agonist) signals via TRIF → TBK1 → IRF3 (type I IFN induction). Alum (aluminum hydroxide) activates NLRP3 inflammasome → caspase-1 → IL-1β/IL-18, and induces uric acid/DAMP release. For peptide vaccines, CpG conjugation (covalent link to peptide) enhances germinal center responses 10–100-fold. MF59 (squalene emulsion) recruits and activates DCs at injection site. AS01 (MPL + QS-21) combines TLR4 agonism with saponin-based immune stimulation.

---

### Question 13
**Topic:** Neoantigen Identification by Whole Exome Sequencing

Personalized neoantigen vaccines require identification of tumor-specific mutations by whole exome sequencing (WES). What is the typical pipeline for neoantigen prediction from WES data?

- A) WES tumor/normal → variant calling (MuTect2/Strelka) → HLA typing (OptiType/Polysolver) → epitope prediction (NetMHCpan) → ranking by binding affinity + expression
- B) WES tumor only → gene expression → pathway analysis → generic peptide selection
- C) WGS tumor → GWAS → SNP annotation → shared epitope database lookup
- D) RNA-seq tumor → fusion gene detection → peptide synthesis → no MHC prediction

**Correct Answer:** A) WES tumor/normal → variant calling (MuTect2/Strelka) → HLA typing (OptiType/Polysolver) → epitope prediction (NetMHCpan) → ranking by binding affinity + expression

**Explanation:** The neoantigen pipeline (Ott et al., 2017; Sahin et al., 2017) steps: (1) WES (≥100× tumor, ≥50× normal) identifies somatic variants (SNVs, indels). MuTect2 (GATK) calls SNVs with LOD ≥ 6.3; Strelka2 for indels. (2) HLA typing from WES reads using OptiType (Illumina reads → HLA-I, AUC > 0.98) or Polysolver (HLA-I/II). (3) Variant annotation (VEP/SnpEff) identifies coding consequences. (4) Epitope prediction: NetMHCpan 4.0 (IC50 < 500 nM, %rank < 2%). (5) Ranking by: MHC binding affinity, gene expression (TPM from RNA-seq), variant allele frequency (VAF), clonality. Validation: MHC multimer staining, ELISpot, intracellular cytokine staining. Neoepitope vaccines (e.g., NEO-PV-01, PGV-001) target 10–20 neoantigens per patient. Shared neoantigens (KRAS G12D, TP53 R175H) enable off-the-shelf approaches.

---

### Question 14
**Topic:** Immune Checkpoint Blockade Mechanism

Anti-PD-1 antibodies (nivolumab, pembrolizumab) block PD-1/PD-L1 interaction to restore T cell function. What is the downstream signaling pathway inhibited by PD-1 engagement, and why does PD-1 blockade cause immune-related adverse events (irAEs)?

- A) PD-1 recruits SHP-2 phosphatase → dephosphorylates TCR signaling (ZAP70, CD3ζ) and CD28 signaling (PI3K, Akt) → T cell exhaustion; irAEs from breaking peripheral tolerance
- B) PD-1 activates JAK-STAT signaling → promotes T cell proliferation; irAEs from excessive cytokine production
- C) PD-1 directly activates caspase-3 → T cell apoptosis; irAEs from lymphopenia
- D) PD-1 blocks TCR-peptide binding directly; irAEs from cross-reactivity

**Correct Answer:** A) PD-1 recruits SHP-2 phosphatase → dephosphorylates TCR signaling (ZAP70, CD3ζ) and CD28 signaling (PI3K, Akt) → T cell exhaustion; irAEs from breaking peripheral tolerance

**Explanation:** PD-1 (PDCD1, CD279) cytoplasm tail contains ITSM (immunoreceptor tyrosine-based switch motif) and ITIM. Upon PD-L1 (B7-H1, CD274) binding, ITSM is phosphorylated (Lck, Fyn), recruiting SHP-2 (PTPN11) phosphatase. SHP-2 dephosphorylates: ZAP70 (TCR proximal), CD3ζ, PLCγ1, PI3K (CD28 proximal), Akt. This inhibits: Ras-MEK-ERK (proliferation), NF-κB (survival), mTOR (metabolism). CTLA-4 (anti-CTLA-4: ipilimumab) operates earlier: outcompetes CD28 for B7 binding (higher affinity), recruits PP2A phosphatase, and mediates trans-endocytosis of CD80/CD86. irAEs (colitis, hepatitis, pneumonitis, endocrinopathies) result from loss of peripheral tolerance by tissue-resident Tregs (which express high PD-1). Anti-CTLA-4 has higher irAE rates (~60% any grade) than anti-PD-1 (~20%) due to broader Treg suppression.

---

### Question 15
**Topic:** CAR-T Cell Design Architecture

Chimeric antigen receptor (CAR) T cells are engineered with a synthetic receptor comprising multiple domains. Which domain arrangement correctly describes a third-generation anti-CD19 CAR (e.g., tisagenlecleucel)?

- A) scFv (anti-CD19, VH-linker-VL) → CD8α hinge/TM → 4-1BB (CD137) costimulatory → CD3ζ signaling domain
- B) Fab (anti-CD19) → CD28 hinge/TM → CD3ζ only
- C) TCR αβ (anti-CD19) → CD4 hinge → OX40 costimulatory → FcεRIγ
- D) VHH (nanobody, anti-CD19) → CD28 hinge/TM → CD3ζ only

**Correct Answer:** A) scFv (anti-CD19, VH-linker-VL) → CD8α hinge/TM → 4-1BB (CD137) costimulatory → CD3ζ signaling domain

**Explanation:** Tisagenlecleucel (Kymriah) is a second-generation CAR: scFv (FMC63, VH-G4S×4-VL) → CD8α hinge (exon 1-3, 45 aa) + TM domain → 4-1BB (CD137, TNFRSF9) costimulatory domain → CD3ζ (3 ITAMs). CD28 costimulatory (e.g., axicabtagene ciloleucel/Yescarta) provides rapid expansion (IL-2, IL-4 production) but shorter persistence. 4-1BB promotes persistence via NF-κB activation, mitochondrial biogenesis, and T central memory (Tcm) differentiation. Third-generation CARs combine CD28 + 4-1BB. Fourth-generation (armored/TRUCK) CARs secrete cytokines (IL-12, IL-15) or express dominant-negative TGF-β. ScFv stability requires: VH/VL orientation, linker length (G4S)3-4, and humanization to reduce immunogenicity. CD3ζ ITAM phosphorylation (Lck → ZAP70 → LAT/SLP-76) drives CAR-T activation.

---

### Question 16
**Topic:** Bispecific Antibody Design

Bispecific T cell engagers (BiTEs) redirect T cells to tumor cells. Which structural features correctly describe blinatumomab (Blincyto), a CD19×CD3 bispecific?

- A) Two scFvs (anti-CD19 + anti-CD3) connected by a non-immunogenic (G4S)3 linker; MW ~55 kDa; no Fc domain
- B) Full IgG with two different Fabs; Fc silenced; MW ~150 kDa
- C) Diabody with two VH-VL pairs; hinge-stabilized; MW ~100 kDa
- D) Single VH domain (nanobody) targeting CD19; CD3 binding from TCR mimic

**Correct Answer:** A) Two scFvs (anti-CD19 + anti-CD3) connected by a non-immunogenic (G4S)3 linker; MW ~55 kDa; no Fc domain

**Explanation:** Blinatumomab is a BiTE (bispecific T cell engager): anti-CD19 scFv (HD37) — (G₄S)₃ linker — anti-CD3 scFv (L2K), MW ~54.1 kDa. BiTEs bridge CD3ε on T cells to tumor antigen, forming immunological synapse and activating T cells (Signal 1 only, no costimulation). Tumor lysis occurs via perforin/granzyme pathway regardless of TCR specificity. Half-life is ~2 hours (no FcRn recycling), requiring continuous IV infusion (28-day cycles). DART (dual-affinity retargeting) format: diabody with disulfide stabilization, improved stability. Half-life extended formats: Fc-containing (e.g., glofitamab, mosunetuzumab), albumin-binding, PEGylation. Cytokine release syndrome (CRS) severity correlates with tumor burden and T cell activation kinetics. Step-wise dosing (9 → 28 → 116 μg/day) mitigates CRS.

---

### Question 17
**Topic:** Cytokine Storm Management

CAR-T cell therapy-associated cytokine release syndrome (CRS) involves massive release of inflammatory mediators. Which cytokine is the primary therapeutic target, and what is the first-line biologic intervention?

- A) IL-6 is the primary driver; tocilizumab (anti-IL-6R) is first-line
- B) TNF-α is the primary driver; infliximab (anti-TNF-α) is first-line
- C) IL-1β is the primary driver; anakinra (IL-1Ra) is first-line
- D) IFN-γ is the primary driver; emapalumab (anti-IFN-γ) is first-line

**Correct Answer:** A) IL-6 is the primary driver; tocilizumab (anti-IL-6R) is first-line

**Explanation:** CRS pathophysiology: CAR-T activation → IFN-γ, TNF-α, IL-2 → macrophage activation → IL-6 (primary mediator), IL-1β, IL-10, IL-8, MCP-1. IL-6 signals via classic (membrane IL-6Rα, ubiquitous) and trans-signaling (soluble IL-6Rα/sIL-6R, endothelial/epithelial cells via gp130). Tocilizumab (anti-IL-6Rα, 8 mg/kg IV) blocks both pathways. Siltuximab (anti-IL-6) is alternative. ASTCT grading: Grade 1 (≥38°C, no hypotension/hypoxia); Grade 2 (vasopressor ≤1, low-flow O₂); Grade 3 (high-flow O₂, multiple vasopressors); Grade 4 (mechanical ventilation, high-dose vasopressors). Corticoids (dexamethasone 10 mg) are second-line but may impair CAR-T efficacy. Anakinra (IL-1Ra) is used for macrophage activation syndrome (MAS)/HLH-like syndrome. Refractory CRS: emapalumab (anti-IFN-γ, approved for HLH).

---

### Question 18
**Topic:** Tolerance Induction via Peptide-MHC Complexes

Soluble peptide-MHC (pMHC) complexes can induce antigen-specific tolerance by engaging T cells without co-stimulation. What is the primary tolerogenic mechanism of multimeric pMHC complexes (e.g., pMHC-Ig dimers)?

- A) Induction of anergy (via E3 ubiquitin ligases GRAIL, Cbl-b), clonal deletion (apoptosis), and conversion of naïve T cells to antigen-specific regulatory T cells (iTregs)
- B) Activation of immune memory through cross-presentation
- C) Complement-mediated lysis of antigen-specific T cells
- D) Antibody-dependent cellular cytotoxicity (ADCC) of T cells

**Correct Answer:** A) Induction of anergy (via E3 ubiquitin ligases GRAIL, Cbl-b), clonal deletion (apoptosis), and conversion of naïve T cells to antigen-specific regulatory T cells (iTregs)

**Explanation:** pMHC-mediated tolerance operates through: (1) Anergy induction: TCR engagement without CD28 costimulation → NFAT without AP-1 → upregulation of E3 ubiquitin ligases GRAIL (gene related to anergy in lymphocytes, RNF128) and Cbl-b → ubiquitination and degradation of TCR signaling components (PLCγ1, PKCθ, c-Cbl). (2) Clonal deletion: AICD (activation-induced cell death) via Fas-FasL interaction and Bim-mediated mitochondrial apoptosis. (3) iTreg conversion: suboptimal TCR stimulation + TGF-β → Foxp3 induction via NFAT-Smad3 cooperation. Nanoparticle-displayed pMHC-Ig (e.g., 500–1000 pMHC per particle) induce tolerance more effectively than monomeric pMHC. Clinical applications: type 1 diabetes (MHC-peptide nanoparticles targeting autoreactive CD8+ T cells), multiple sclerosis (altered peptide ligands, e.g., glatiramer acetate mechanism), transplantation (donor pMHC-Ig to induce graft tolerance).

---

### Question 19
**Topic:** Mucosal Immunity and Secretory IgA

Secretory IgA (sIgA) is the dominant immunoglobulin at mucosal surfaces. What is the complete molecular assembly pathway for dimeric sIgA secretion across the intestinal epithelium?

- A) Plasma cell produces dimeric IgA (J chain-containing) → binds pIgR on basolateral epithelial membrane → transcytosis → proteolytic cleavage of pIgR → release of sIgA (IgA2 + J chain + secretory component)
- B) Plasma cell produces monomeric IgA → passive diffusion through epithelium → release as free IgA
- C) Plasma cell produces IgG → binds FcRn on epithelium → transcytosis → release as IgG
- D) Plasma cell produces dimeric IgA → exocytosis → binds free secretory component in lumen

**Correct Answer:** A) Plasma cell produces dimeric IgA (J chain-containing) → binds pIgR on basolateral epithelial membrane → transcytosis → proteolytic cleavage of pIgR → release of sIgA (IgA2 + J chain + secretory component)

**Explanation:** IgA exists as two subclasses: IgA1 (hinge region with 6 O-linked glycans, predominant in serum) and IgA2 (short hinge, more resistant to bacterial proteases, predominant in gut). Dimeric IgA (dIgA) is produced by mucosal plasma cells (lamina propria) with J chain (MW 15 kDa, IJ gene). pIgR (polymeric immunoglobulin receptor, 100 kDa, 6 extracellular domains + transmembrane + cytoplasmic tail) binds dIgA at domain 1 (Cα2/Cα3 interface). Transcytosis: basolateral → endosome → apical membrane. Cleavage between domains 5 and 6 releases sIgA (secretory component, SC, ~80 kDa, remains covalently bound via disulfide bonds). SC provides protease resistance (IgA-degrading enzymes: IgA1 protease from Neisseria, Streptococcus). sIgA neutralizes pathogens, prevents epithelial adhesion (immune exclusion), and can neutralize intracellular pathogens during transcytosis. Daily sIgA production: ~3–5 g/day. Retinoic acid (from dietary vitamin A via RALDH in CD103+ DCs) induces IgA class switching (TGF-β/Smad → AID → Cα germline transcription).

---

### Question 20
**Topic:** Tumor Immune Escape Mechanisms

Tumors evade immune surveillance through multiple mechanisms. Which combination correctly describes MHC class I loss and PD-L1 upregulation as immune escape strategies?

- A) MHC I loss: β2-microglobulin (B2M) mutations → no MHC I surface expression → evasion from CD8+ T cells; PD-L1 upregulation: oncogenic signaling (PTEN loss, EGFR activation) or adaptive (IFN-γ from TILs) → PD-1 engagement on T cells → T cell exhaustion/anergy
- B) MHC I loss: TAP1/TAP2 overexpression → enhanced antigen presentation; PD-L1 downregulation: promotes T cell activation
- C) MHC I loss: HLA-A mutations → increased NK cell killing; PD-L1 upregulation: blocks complement activation
- D) MHC I loss: proteasome inhibition → enhanced peptide supply; PD-L1 upregulation: promotes antibody production

**Correct Answer:** A) MHC I loss: β2-microglobulin (B2M) mutations → no MHC I surface expression → evasion from CD8+ T cells; PD-L1 upregulation: oncogenic signaling (PTEN loss, EGFR activation) or adaptive (IFN-γ from TILs) → PD-1 engagement on T cells → T cell exhaustion/anergy

**Explanation:** MHC I downregulation mechanisms: (1) B2M mutations (frameshift, LOH) — found in ~30% of melanoma resistant to anti-PD-1 (Zaretsky et al., 2016). B2M is required for MHC I folding and surface expression. (2) TAP1/TAP2 loss (epigenetic silencing, ~15% of cancers). (3) HLA-A/B/C mutations or LOH (loss of heterozygosity, HLA-LOH in ~40% of NSCLC). NK cell "missing self" recognition (inhibitory KIRs: KIR2DL1-3, KIR3DL1) partially compensates but can be evaded by shedding NKG2D ligands (MICA/MICB). PD-L1 upregulation: constitutive (PTEN loss → PI3K-Akt; EGFR → MAPK; MYC amplification; CDK4/6 → NF-κB) or adaptive (IFN-γ → JAK1/2 → STAT1 → IRF1 → CD274 promoter). JAK1/2 loss-of-function mutations confer resistance to anti-PD-1 by preventing IFN-γ-mediated MHC upregulation and T cell recruitment. Other escape: IDO upregulation (tryptophan depletion), TGF-β secretion (Treg induction), VEGF (anti-angiogenic → poor T cell infiltration), loss of antigen (immunoediting), APOBEC mutator phenotype.
