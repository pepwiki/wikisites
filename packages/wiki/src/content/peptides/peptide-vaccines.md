# Peptide Vaccines Database

A comprehensive database of peptide-based vaccines across cancer, infectious disease, autoimmune, and allergy indications.

---

## Cancer Vaccines

### 1. NeuVax (Nelipepimut-S)

| Field | Value |
|-------|-------|
| **ID** | `neuvax-nelipepimut-s` |
| **Name** | NeuVax (Nelipepimut-S / E75) |
| **Target Antigen** | HER2 (Human Epidermal Growth Factor Receptor 2) |
| **Peptide Sequences** | E75: KIFGSLAFL (HER2/neu 369-377) |
| **Adjuvant** | GM-CSF (Granulocyte-Macrophage Colony-Stimulating Factor) |
| **Delivery Method** | Intradermal injection |
| **Indication** | HER2-positive breast cancer (adjuvant setting) |
| **Clinical Stage** | Phase III (completed) |
| **Mechanism** | E75 peptide presented by HLA-A2/A3 stimulates CD8+ CTLs to recognize and kill HER2-overexpressing tumor cells |
| **Immunogenicity Data** | 50% reduction in recurrence rate in HLA-A2+ patients with high HER2 expression; dose-dependent delayed-type hypersensitivity responses |
| **Category** | Cancer / Breast Cancer |

---

### 2. Suruvatide

| Field | Value |
|-------|-------|
| **ID** | `suruvatide` |
| **Name** | Suruvatide (Personalized Neoantigen Vaccine) |
| **Target Antigen** | Patient-specific tumor neoantigens |
| **Peptide Sequences** | Individualized neoantigen peptides (20+ peptides per patient) derived from tumor somatic mutations |
| **Adjuvant** | Poly-ICLC (Hiltonol) |
| **Delivery Method** | Subcutaneous injection |
| **Indication** | Solid tumors (melanoma, NSCLC, colorectal) |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | Multi-peptide personalized vaccine targeting neoantigens from tumor exome sequencing; stimulates CD4+ and CD8+ T-cell responses against patient-specific mutations |
| **Immunogenicity Data** | Neoantigen-specific T-cell responses detected in majority of patients; objective responses in combination with checkpoint inhibitors |
| **Category** | Cancer / Personalized Neoantigen |

---

### 3. GRANITE

| Field | Value |
|-------|-------|
| **ID** | `granite` |
| **Name** | GRANITE (Gritstone bio) |
| **Target Antigen** | Personalized tumor neoantigens |
| **Peptide Sequences** | Individualized neoantigen long peptides selected via EDGE AI platform from tumor exome/transcriptome |
| **Adjuvant** | Self-amplifying RNA (samRNA) boost |
| **Delivery Method** | Priming with adenovirus (ChAd68); boost with samRNA; intramuscular |
| **Indication** | Colorectal cancer, NSCLC, solid tumors |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | Heterologous prime-boost regimen; adenoviral prime induces broad T-cell immunity, samRNA boost amplifies neoantigen-specific CD8+ T cells |
| **Immunogenicity Data** | Robust neoantigen-specific CD8+ T-cell responses; T-cell infiltration in tumors; clinical benefit in MSS-CRC patients |
| **Category** | Cancer / Personalized Neoantigen |

---

### 4. Gliovac

| Field | Value |
|-------|-------|
| **ID** | `gliovac` |
| **Name** | Gliovac (ERC1671) |
| **Target Antigen** | Glioblastoma multi-antigen (autologous/allogeneic tumor lysate) |
| **Peptide Sequences** | Mixture of tumor-associated peptides from GBM lysate including EGFRvIII, IDH1-R132H, survivin, and other GBM antigens |
| **Adjuvant** | GM-CSF; combined with cyclophosphamide |
| **Delivery Method** | Intradermal injection |
| **Indication** | Recurrent glioblastoma multiforme |
| **Clinical Stage** | Phase II |
| **Mechanism** | Multi-antigen vaccine from autologous and allogeneic GBM lysates stimulates polyclonal T-cell responses against diverse tumor antigens; cyclophosphamide depletes Tregs |
| **Immunogenicity Data** | Improved overall survival vs bevacizumab alone in recurrent GBM; immune responses against multiple GBM antigens detected |
| **Category** | Cancer / Glioblastoma |

---

### 5. DPX-Survivac

| Field | Value |
|-------|-------|
| **ID** | `dpx-survivac` |
| **Name** | DPX-Survivac |
| **Target Antigen** | Survivin (BIRC5) |
| **Peptide Sequences** | Survivin-derived peptides: ELTLGEFLKL (survivin 96-104), LMLGEFLKL variants |
| **Adjuvant** | DepoVax platform (lipid-in-oil depot) |
| **Delivery Method** | Intramuscular/subcutaneous injection (depot formulation) |
| **Indication** | Ovarian cancer, diffuse large B-cell lymphoma, AML |
| **Clinical Stage** | Phase II |
| **Mechanism** | DepoVax depot creates sustained antigen release; survivin peptides presented by HLA-A2 generate CD8+ CTLs targeting survivin-expressing tumor cells |
| **Immunogenicity Data** | Strong survivin-specific T-cell responses; tumor regressions observed in combination with pembrolizumab; durable immune memory |
| **Category** | Cancer / Survivin-Targeting |

---

### 6. IO102/IO103

| Field | Value |
|-------|-------|
| **ID** | `io102-io103` |
| **Name** | IO102/IO103 (IO Biotech) |
| **Target Antigen** | TGF-β (Immunomodulatory) |
| **Peptide Sequences** | IO102: IDO1-derived peptides; IO103: PD-L1-derived peptides |
| **Adjuvant** | Montanide ISA-51 |
| **Delivery Method** | Intradermal injection |
| **Indication** | Melanoma, NSCLC, head and neck cancer |
| **Clinical Stage** | Phase III (melanoma) |
| **Mechanism** | Therapeutic immune-modulating vaccines targeting immunosuppressive pathways (IDO1 and PD-L1); break tolerance to restore anti-tumor T-cell function |
| **Immunogenicity Data** | 70% ORR in combination with pembrolizumab in first-line melanoma; strong T-cell responses against IDO1 and PD-L1 epitopes |
| **Category** | Cancer / Immune Modulatory |

---

### 7. UV1

| Field | Value |
|-------|-------|
| **ID** | `uv1` |
| **Name** | UV1 (Ultimovacs) |
| **Target Antigen** | Human Telomerase (hTERT) |
| **Peptide Sequences** | hTERT peptides: VYGFVRACL (611-626), ILAKFLHWL, and other telomerase epitopes |
| **Adjuvant** | GM-CSF |
| **Delivery Method** | Intradermal injection |
| **Indication** | Melanoma, NSCLC, ovarian cancer, malignant pleural mesothelioma |
| **Clinical Stage** | Phase II |
| **Mechanism** | Targets telomerase overexpressed in ~85% of cancers; generates CD4+ and CD8+ T-cell responses against hTERT-expressing tumor cells |
| **Immunogenicity Data** | Telomerase-specific T-cell responses in >80% of patients; improved PFS in combination with checkpoint inhibitors in melanoma |
| **Category** | Cancer / Telomerase-Targeting |

---

### 8. OSE-2101

| Field | Value |
|-------|-------|
| **ID** | `ose-2101` |
| **Name** | OSE-2101 (Tedopi) |
| **Target Antigen** | CEA, HER2/neu, MAGE-2, MAGE-3 |
| **Peptide Sequences** | 10 neo-epitopes: 5 HLA-A2-restricted peptides from CEA, HER2/neu, MAGE-2, MAGE-3; 3 CD4+ epitopes; 2 PADRE universal epitopes |
| **Adjuvant** | Montanide ISA-51 |
| **Delivery Method** | Intradermal injection |
| **Indication** | NSCLC (HLA-A2+ patients), advanced solid tumors |
| **Clinical Stage** | Phase III (NSCLC) |
| **Mechanism** | Multi-epitope vaccine combining CTL and helper epitopes from tumor-associated antigens; stimulates broad anti-tumor immunity |
| **Immunogenicity Data** | Improved survival vs docetaxel in HLA-A2+ NSCLC patients after checkpoint inhibitor failure; immune responses against multiple antigens |
| **Category** | Cancer / Multi-Antigen |

---

### 9. DPX-E7

| Field | Value |
|-------|-------|
| **ID** | `dpx-e7` |
| **Name** | DPX-E7 (IMV Inc.) |
| **Target Antigen** | HPV16 E7 oncoprotein |
| **Peptide Sequences** | HPV16 E7 peptide: YMLDLQPETT (E7 11-20) |
| **Adjuvant** | DepoVax platform (lipid-in-oil depot) |
| **Delivery Method** | Intramuscular/subcutaneous injection |
| **Indication** | HPV16-positive cervical cancer, head and neck cancer |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | DepoVax depot provides sustained E7 peptide release; generates HLA-A2-restricted CD8+ CTLs targeting HPV16 E7-expressing tumor cells |
| **Immunogenicity Data** | E7-specific T-cell responses detected; tumor regressions in combination with checkpoint inhibitors |
| **Category** | Cancer / HPV-Associated |

---

### 10. ISA101

| Field | Value |
|-------|-------|
| **ID** | `isa101` |
| **Name** | ISA101 (ISA Pharmaceuticals) |
| **Target Antigen** | HPV16 E6 and E7 oncoproteins |
| **Peptide Sequences** | 12 synthetic long peptides covering HPV16 E6 and E7 sequences (overlapping 25-35 aa peptides) |
| **Adjuvant** | Montanide ISA-51 |
| **Delivery Method** | Subcutaneous injection |
| **Indication** | HPV16-positive cervical cancer, oropharyngeal cancer, vulvar intraepithelial neoplasia |
| **Clinical Stage** | Phase II |
| **Mechanism** | Synthetic long peptides encompass full E6/E7 sequences; processed by APCs to generate both CD4+ and CD8+ T-cell responses against HPV16 oncoproteins |
| **Immunogenicity Data** | Strong HPV16-specific T-cell responses; 43% ORR in combination with pembrolizumab in HPV16+ head and neck cancer |
| **Category** | Cancer / HPV-Associated |

---

## Infectious Disease Vaccines

### 11. RTS,S/AS01 (Mosquirix)

| Field | Value |
|-------|-------|
| **ID** | `rtss-as01-mosquirix` |
| **Name** | RTS,S/AS01 (Mosquirix) |
| **Target Antigen** | Plasmodium falciparum Circumsporozoite Protein (CSP) |
| **Peptide Sequences** | CSP repeat region (NANP)n fused to HBsAg; T-cell epitopes from CSP C-terminus |
| **Adjuvant** | AS01 (MPL + QS21 in liposomes) |
| **Delivery Method** | Intramuscular injection |
| **Indication** | Malaria (Plasmodium falciparum) |
| **Clinical Stage** | Approved (WHO 2021) |
| **Mechanism** | Recombinant CSP-HBsAg VLP with AS01 adjuvant; anti-CSP antibodies block sporozoite invasion of hepatocytes; CSP-specific CD4+ T cells provide cellular immunity |
| **Immunogenicity Data** | 36% reduction in clinical malaria episodes over 4 years in children; anti-CSP antibody titers correlate with protection |
| **Category** | Infectious Disease / Malaria |

---

### 12. R21/Matrix-M

| Field | Value |
|-------|-------|
| **ID** | `r21-matrix-m` |
| **Name** | R21/Matrix-M |
| **Target Antigen** | Plasmodium falciparum Circumsporozoite Protein (CSP) |
| **Peptide Sequences** | CSP repeat region (NANP)5 with T-cell epitopes fused to HBsAg; higher CSP:HBsAg ratio than RTS,S |
| **Adjuvant** | Matrix-M (saponin-based) |
| **Delivery Method** | Intramuscular injection |
| **Indication** | Malaria (Plasmodium falciparum) |
| **Clinical Stage** | Approved (WHO 2023) |
| **Mechanism** | CSP-HBsAg nanoparticle with Matrix-M adjuvant; higher CSP density enhances anti-CSP antibody responses; saponin adjuvant promotes strong Th1/Th2 balance |
| **Immunogenicity Data** | 75% efficacy at 12 months in seasonal malaria; superior to RTS,S in head-to-head trials; sustained antibody responses with seasonal boosting |
| **Category** | Infectious Disease / Malaria |

---

### 13. PfSPZ

| Field | Value |
|-------|-------|
| **ID** | `pfspz` |
| **Name** | PfSPZ Vaccine (Sanaria) |
| **Target Antigen** | Whole Plasmodium falciparum sporozoite (multiple antigens) |
| **Peptide Sequences** | Not peptide-based; whole attenuated P. falciparum sporozoites (PfSPZ) |
| **Adjuvant** | None (live attenuated organism) |
| **Delivery Method** | Intravenous injection |
| **Indication** | Malaria (Plasmodium falciparum) |
| **Clinical Stage** | Phase III |
| **Mechanism** | Radiation-attuced sporozoites invade hepatocytes but cannot complete development; induces comprehensive immune response including anti-CSP antibodies, CD8+ liver-resident T cells, and CD4+ T cells |
| **Immunogenicity Data** | 100% protection against controlled human malaria infection in some trials; sterile protection in endemic settings |
| **Category** | Infectious Disease / Malaria (Whole Organism) |

---

### 14. NVX-CoV2373

| Field | Value |
|-------|-------|
| **ID** | `nvx-cov2373` |
| **Name** | NVX-CoV2373 (Novavax) |
| **Target Antigen** | SARS-CoV-2 Spike protein (prefusion-stabilized) |
| **Peptide Sequences** | Not peptide-based; recombinant full-length spike protein nanoparticle (2P mutations for prefusion stabilization) |
| **Adjuvant** | Matrix-M (saponin-based) |
| **Delivery Method** | Intramuscular injection |
| **Indication** | COVID-19 (SARS-CoV-2 infection) |
| **Clinical Stage** | Approved (multiple countries) |
| **Mechanism** | Recombinant spike protein displayed on Matrix-M nanoparticles; induces neutralizing antibodies against RBD and S2 domains; spike-specific CD4+ T-cell responses |
| **Immunogenicity Data** | 90% efficacy against ancestral strain; cross-reactive antibodies against variants; strong CD4+ Th1-biased responses |
| **Category** | Infectious Disease / COVID-19 (Protein Subunit) |

---

### 15. Peptide-Based COVID Vaccines

| Field | Value |
|-------|-------|
| **ID** | `covid-peptide-vaccines` |
| **Name** | Various Peptide-Based COVID-19 Vaccines |
| **Target Antigen** | SARS-CoV-2 Spike, Nucleocapsid, Membrane proteins |
| **Peptide Sequences** | Multi-peptide cocktails targeting conserved epitopes: S-protein RBD peptides (436-508, 484-499), N-protein peptides (221-240, 295-314), M-protein peptides; Sotrovimab-mimetic peptides |
| **Adjuvant** | Various: Poly-ICLC, Montanide ISA-51, CpG, alum |
| **Delivery Method** | Intradermal/subcutaneous injection |
| **Indication** | COVID-19 (Pan-coronavirus and variant-specific) |
| **Clinical Stage** | Phase I/II (multiple candidates) |
| **Mechanism** | Multi-peptide vaccines targeting conserved T-cell epitopes across SARS-CoV-2 variants and related coronaviruses; designed for broad cellular immunity independent of antibody escape |
| **Immunogenicity Data** | T-cell responses against conserved epitopes cross-reactive with SARS-CoV-1, MERS-CoV, and common cold coronaviruses; peptide-specific IFN-gamma responses |
| **Category** | Infectious Disease / COVID-19 |

---

### 16. OVX836

| Field | Value |
|-------|-------|
| **ID** | `ovx836` |
| **Name** | OVX836 (Osivax) |
| **Target Antigen** | Influenza A Nucleoprotein (NP) |
| **Peptide Sequences** | Recombinant oligomerized NP (full-length NP self-assembling into nanoparticles); key NP epitopes: NP 380-388 (ELRSRYWAI), NP 174-184 |
| **Adjuvant** | None (self-adjuvanting nanoparticle) |
| **Delivery Method** | Intramuscular injection |
| **Indication** | Influenza A (universal influenza vaccine) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Oligomerized NP forms 8-mer nanoparticles that mimic viral structure; NP is highly conserved across influenza A strains; induces broad CD8+ T-cell responses against conserved internal proteins |
| **Immunogenicity Data** | Broad cross-reactive T-cell responses against multiple influenza A subtypes; NP-specific CD4+ and CD8+ T cells; reduced viral shedding in challenge studies |
| **Category** | Infectious Disease / Influenza |

---

### 17. FLU-v

| Field | Value |
|-------|-------|
| **ID** | `flu-v` |
| **Name** | FLU-v (PepTcell/SEEK) |
| **Target Antigen** | Influenza A and B conserved internal proteins |
| **Peptide Sequences** | 5 synthetic peptides from M1, M2, and NP: M1 128-145 (LLQSLRSLY), M1 17-31, M2 1-24, NP 312-330, NP 206-229 |
| **Adjuvant** | Montanide ISA-51 |
| **Delivery Method** | Intradermal injection |
| **Indication** | Universal influenza vaccine (all influenza A and B strains) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Synthetic peptides from highly conserved regions of M1, M2, and NP; stimulates cross-reactive CD4+ and CD8+ T cells targeting internal proteins conserved across all influenza strains |
| **Immunogenicity Data** | Reduced influenza infection rate by 65% in human challenge study; T-cell responses cross-reactive against multiple influenza subtypes |
| **Category** | Infectious Disease / Influenza |

---

### 18. EPV-01

| Field | Value |
|-------|-------|
| **ID** | `epv-01` |
| **Name** | EPV-01 (Elicera Therapeutics) |
| **Target Antigen** | Epstein-Barr Virus (EBV) latent and lytic antigens |
| **Peptide Sequences** | EBV peptides from EBNA1, LMP1, LMP2, BZLF1: LMP2 419-427 (CLGGLLTMV), LMP1 125-133, EBNA1 407-426 |
| **Adjuvant** | Poly-ICLC / GM-CSF |
| **Delivery Method** | Intradermal injection |
| **Indication** | EBV-associated malignancies (nasopharyngeal carcinoma, post-transplant lymphoproliferative disease, Hodgkin lymphoma) |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | Multi-epitope peptide vaccine targeting both latent and lytic EBV antigens; generates EBV-specific CD8+ CTLs to eliminate EBV-infected tumor cells |
| **Immunogenicity Data** | EBV-specific T-cell responses detected in patients with EBV+ malignancies; clinical responses in combination with adoptive T-cell therapy |
| **Category** | Infectious Disease / EBV-Associated Cancer |

---

### 19. HBV Peptide Vaccine

| Field | Value |
|-------|-------|
| **ID** | `hbv-peptide-vaccine` |
| **Name** | HBV Peptide Vaccine (Therapeutic) |
| **Target Antigen** | Hepatitis B Virus (HBV) Core and Surface antigens |
| **Peptide Sequences** | HBV core peptides: c18-27 (FLPSDFFPSV), c141-151; HBV surface peptides: S 183-191, S 208-215; PreS1 peptides |
| **Adjuvant** | Montanide ISA-51, HBsAg-HBIG complexes |
| **Delivery Method** | Intradermal/subcutaneous injection |
| **Indication** | Chronic Hepatitis B (therapeutic vaccine) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Therapeutic peptide vaccine targeting HBV core and surface epitopes; restores HBV-specific CD8+ CTL responses to clear infected hepatocytes; complements antiviral therapy |
| **Immunogenicity Data** | HBV-specific CTL responses in chronic HBV patients; some patients achieve HBsAg loss; enhanced responses when combined with nucleos(t)ide analogs |
| **Category** | Infectious Disease / Hepatitis B |

---

### 20. HCV Peptide Vaccine

| Field | Value |
|-------|-------|
| **ID** | `hcv-peptide-vaccine` |
| **Name** | HCV Peptide Vaccine (Therapeutic) |
| **Target Antigen** | Hepatitis C Virus (HCV) Core, NS3, NS4, NS5B proteins |
| **Peptide Sequences** | HCV core 132-142 (GYKVLVLNPSVA), NS3 1073-1081 (CINGVCWTV), NS3 1406-1415, NS5B 2594-2603; multiple genotype-conserved epitopes |
| **Adjuvant** | Montanide ISA-51, Poly-ICLC |
| **Delivery Method** | Intradermal injection |
| **Indication** | Chronic Hepatitis C (therapeutic vaccine, adjunct to DAAs) |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | Multi-peptide vaccine targeting conserved HCV epitopes across genotypes; induces HCV-specific CD4+ Th1 and CD8+ CTL responses to support viral clearance |
| **Immunogenicity Data** | HCV-specific T-cell responses detected; improved SVR rates in combination with direct-acting antivirals in some studies |
| **Category** | Infectious Disease / Hepatitis C |

---

## Autoimmune Disease Vaccines

### 21. ATX-MS-1467

| Field | Value |
|-------|-------|
| **ID** | `atx-ms-1467` |
| **Name** | ATX-MS-1467 (Apitope) |
| **Target Antigen** | Myelin Basic Protein (MBP) |
| **Peptide Sequences** | Four MBP peptides: MBP 13-32, MBP 111-129, MBP 146-170, MBP 232-252 (immunodominant epitopes) |
| **Adjuvant** | None (intradermal delivery is self-adjuvanting) |
| **Delivery Method** | Intradermal injection |
| **Indication** | Multiple Sclerosis (MS) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Apitope (antigen-processing-independent epitope) peptides presented on MHC-II without processing; induce antigen-specific tolerance by anergizing or deleting myelin-reactive T cells; shift from Th1/Th17 to Th2/Treg |
| **Immunogenicity Data** | Reduced new Gd-enhancing MRI lesions; decreased MBP-specific T-cell proliferation; shift toward Th2 cytokine profile; well-tolerated |
| **Category** | Autoimmune / Multiple Sclerosis |

---

### 22. RTL1000

| Field | Value |
|-------|-------|
| **ID** | `rtl1000` |
| **Name** | RTL1000 (Artielle ImmunoTherapeutics) |
| **Target Antigen** | Myelin Oligodendrocyte Glycoprotein (MOG) |
| **Peptide Sequences** | MOG 35-55 peptide domain linked to HLA-DR2 (DRB1*1501) beta1 domain (recombinant T-cell receptor ligand) |
| **Adjuvant** | None (recombinant protein, no adjuvant needed) |
| **Delivery Method** | Intravenous injection |
| **Indication** | Multiple Sclerosis (MS) |
| **Clinical Stage** | Phase I |
| **Mechanism** | Recombinant T-cell receptor ligand (RTL) consisting of MOG peptide tethered to MHC-II; selectively targets MOG-reactive T cells without broad immunosuppression; induces T-cell tolerance and Treg expansion |
| **Immunogenicity Data** | Reduced clinical relapses in EAE models; MOG-specific T-cell tolerance; no generalized immunosuppression observed |
| **Category** | Autoimmune / Multiple Sclerosis |

---

### 23. NeuroVax

| Field | Value |
|-------|-------|
| **ID** | `neurovax` |
| **Name** | NeuroVax (Immune Response BioPharma) |
| **Target Antigen** | T-Cell Receptor (TCR) Vβ5.2, Vβ6.1, Vβ13.1 |
| **Peptide Sequences** | Three TCR peptides: TCR Vβ5.2 39-59, TCR Vβ6.1 39-59, TCR Vβ13.1 39-59 (framework region peptides) |
| **Adjuvant** | Montanide ISA-51 |
| **Delivery Method** | Intradermal injection |
| **Indication** | Multiple Sclerosis (MS) |
| **Clinical Stage** | Phase II |
| **Mechanism** | TCR peptide vaccination targets pathogenic T-cell clones bearing specific Vβ TCRs expanded in MS; induces anti-idiotype regulatory T cells that suppress myelin-reactive T cells |
| **Immunogenicity Data** | Increased TCR-reactive CD4+ CD25+ FoxP3+ Tregs; reduced myelin-reactive T-cell responses; stabilization of disability in progressive MS |
| **Category** | Autoimmune / Multiple Sclerosis |

---

### 24. IMCY-0098

| Field | Value |
|-------|-------|
| **ID** | `imcy-0098` |
| **Name** | IMCY-0098 (Imcyse) |
| **Target Antigen** | Insulin |
| **Peptide Sequences** | Modified insulin B-chain peptides (9-23) conjugated to thioredox motif; cytolytic disease-specific peptide (CYSP) |
| **Adjuvant** | None (self-adjuvanting via cytolytic mechanism) |
| **Delivery Method** | Subcutaneous injection |
| **Indication** | Type 1 Diabetes (T1D) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Cytolytic disease-specific peptides (CYSP) generate cytolytic CD4+ T cells that specifically kill insulin-presenting antigen-presenting cells; eliminates autoreactive immune responses without broad immunosuppression |
| **Immunogenicity Data** | Preservation of C-peptide in recent-onset T1D; generation of cytolytic CD4+ T cells targeting insulin-presenting APCs; favorable safety profile |
| **Category** | Autoimmune / Type 1 Diabetes |

---

### 25. Diamyd

| Field | Value |
|-------|-------|
| **ID** | `diamyd` |
| **Name** | Diamyd (GAD-alum / Diamyd Medical) |
| **Target Antigen** | Glutamic Acid Decarboxylase 65 (GAD65) |
| **Peptide Sequences** | Recombinant human GAD65 (full protein, 585 aa); key epitopes include GAD65 247-279, GAD65 509-528 |
| **Adjuvant** | Alum (aluminum hydroxide) |
| **Delivery Method** | Intralymphatic injection (primary route); subcutaneous |
| **Indication** | Type 1 Diabetes (T1D) |
| **Clinical Stage** | Phase II/III |
| **Mechanism** | GAD65-alum induces immune tolerance to GAD65 autoantigen; promotes Th2 shift and GAD-specific Treg expansion; intralymphatic delivery enhances antigen presentation to tolerogenic dendritic cells |
| **Immunogenicity Data** | Preserved C-peptide levels in recent-onset T1D; GAD65-specific antibody and T-cell responses; subgroup benefit in HLA-DR3-DQ2 carriers |
| **Category** | Autoimmune / Type 1 Diabetes |

---

## Allergy Vaccines

### 26. Pollinex Quattro

| Field | Value |
|-------|-------|
| **ID** | `pollinex-quattro` |
| **Name** | Pollinex Quattro (Bencard/Allergy Therapeutics) |
| **Target Antigen** | Grass pollen allergens (Phl p 1, Phl p 5, Phl p 2, Phl p 6) |
| **Peptide Sequences** | Modified grass pollen allergoids (chemically modified allergen extracts); T-cell epitope peptides from major timothy grass allergens |
| **Adjuvant** | Monophosphoryl Lipid A (MPL) adsorbed on L-tyrosine |
| **Delivery Method** | Subcutaneous injection (pre-seasonal) |
| **Indication** | Grass pollen-induced allergic rhinoconjunctivitis |
| **Clinical Stage** | Phase III (registered in several countries) |
| **Mechanism** | Allergoid-MPL conjugate on L-tyrosine depot; shifts immune response from Th2 (IgE) to Th1/Treg (IgG4, IL-10); MPL activates innate immunity; L-tyrosine provides sustained release |
| **Immunogenicity Data** | Significant reduction in symptom scores and medication use; increased allergen-specific IgG4; reduced late-phase skin responses |
| **Category** | Allergy / Grass Pollen |

---

### 27. Amb a 1 Immunostimulatory

| Field | Value |
|-------|-------|
| **ID** | `amb-a-1-immunostimulatory` |
| **Name** | Amb a 1 Immunostimulatory Conjugate (AIC) |
| **Target Antigen** | Ambrosia artemisiifolia (Short Ragweed) Amb a 1 |
| **Peptide Sequences** | Amb a 1 protein fragments conjugated to phosphorothioate oligonucleotide (CpG motif) |
| **Adjuvant** | CpG 1018 (integrated as conjugate) |
| **Delivery Method** | Subcutaneous injection |
| **Indication** | Ragweed-induced allergic rhinoconjunctivitis |
| **Clinical Stage** | Phase II |
| **Mechanism** | Amb a 1-CpG conjugate directly targets allergen to TLR9-expressing dendritic cells; CpG drives Th1 response; reduces ragweed-specific IgE and increases IgG4; suppresses Th2 cytokines |
| **Immunogenicity Data** | Reduced seasonal IgE rise; increased Amb a 1-specific IgG; decreased late-phase nasal responses; Th2 to Th1 shift demonstrated |
| **Category** | Allergy / Ragweed Pollen |

---

### 28. Cat-PAD

| Field | Value |
|-------|-------|
| **ID** | `cat-pad` |
| **Name** | Cat-PAD (Circassia) |
| **Target Antigen** | Fel d 1 (major cat allergen) |
| **Peptide Sequences** | 7 synthetic T-cell epitope peptides from Fel d 1 chain 1 and chain 2 (12-17 aa peptides); modified to reduce IgE binding while retaining T-cell epitopes |
| **Adjuvant** | None (peptides too short for IgE cross-linking) |
| **Delivery Method** | Intradermal injection |
| **Indication** | Cat allergy (allergic rhinitis) |
| **Clinical Stage** | Phase II |
| **Mechanism** | Short Fel d 1 peptides (below threshold for mast cell degranulation) presented by APCs to generate allergen-specific Tregs; Tregs produce IL-10 and suppress Th2-mediated IgE responses |
| **Immunogenicity Data** | Reduced symptom scores during cat allergen exposure; Fel d 1-specific Treg induction; no systemic allergic reactions due to short peptide design |
| **Category** | Allergy / Cat Dander |

---

### 29. BM32

| Field | Value |
|-------|-------|
| **ID** | `bm32` |
| **Name** | BM32 (Biomay AG) |
| **Target Antigen** | Grass pollen allergens (Phl p 5, Phl p 1, Phl p 2, Phl p 6) |
| **Peptide Sequences** | Recombinant allergen-derived virus-like particles (VLPs): grass pollen peptides fused to PreS (hepatitis B surface antigen); 4-component VLP vaccine |
| **Adjuvant** | Alum (aluminum hydroxide) |
| **Delivery Method** | Intramuscular injection |
| **Indication** | Grass pollen-induced allergic rhinoconjunctivitis |
| **Clinical Stage** | Phase IIb |
| **Mechanism** | Allergen peptides displayed on HBV-derived VLPs; VLPs are highly immunogenic and activate B cells via repetitive epitope display; induces IgG4-blocking antibodies without IgE cross-linking; promotes Treg responses |
| **Immunogenicity Data** | Strong allergen-specific IgG4 responses; reduced symptom medication scores; IgG4 blocked IgE-facilitated allergen binding; safety demonstrated across multiple trials |
| **Category** | Allergy / Grass Pollen |

---

### 30. MAG1-Pokeweed

| Field | Value |
|-------|-------|
| **ID** | `mag1-pokeweed` |
| **Name** | MAG1-Pokeweed (Allergen-Adjuvant Fusion) |
| **Target Antigen** | Bet v 1 (major birch pollen allergen) and related PR-10 allergens |
| **Peptide Sequences** | MAG1: fusion of Bet v 1 T-cell epitopes with pokeweed antiviral protein (PAP) fragments; Bet v 1 142-156, Bet v 1 45-60 |
| **Adjuvant** | Pokeweed-derived adjuvant (built-in immunomodulatory plant protein) |
| **Delivery Method** | Intradermal/subcutaneous injection |
| **Indication** | Birch pollen allergy (with cross-reactivity to apple, hazelnut PR-10) |
| **Clinical Stage** | Phase I/II |
| **Mechanism** | Allergen-peptide fusion with pokeweed protein activates innate immunity via plant PAMPs; Bet v 1 T-cell epitopes without IgE-reactive conformational epitopes; generates Treg and Th1 responses; pokeweed component serves as molecular adjuvant |
| **Immunogenicity Data** | Reduced birch pollen-specific IgE; increased Bet v 1-specific IgG4; T-cell hyporesponsiveness to Bet v 1; cross-protection against PR-10 food allergens |
| **Category** | Allergy / Birch Pollen |

---

## Summary Statistics

| Category | Count | Key Targets |
|----------|-------|-------------|
| Cancer Vaccines | 10 | HER2, survivin, telomerase, HPV E6/E7, TGF-β, neoantigens |
| Infectious Disease | 10 | CSP, spike protein, NP, EBV, HBV, HCV, influenza |
| Autoimmune | 5 | MBP, MOG, TCR, insulin, GAD65 |
| Allergy | 5 | Grass pollen, ragweed, cat dander, birch pollen |
| **Total** | **30** | |
