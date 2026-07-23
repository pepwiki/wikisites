---
date: 2026-06-12
title: Peptide Hematology
description: "Quiz on peptide involvement in hematological processes, coagulation cascades, and blood cell signaling."
category: hematology
author: WikiSites
tags:
  - peptides
  - hematology
  - erythropoietin
  - thrombopoietin
  - hematopoiesis
  - coagulation
  - blood-disorders
  - anticoagulant-peptides
  - fibrinolysis
  - peptide-biomarkers
difficulty: advanced
questions: 20
---

export const questions = [
  {
    question: "What is the primary physiological stimulus for erythropoietin (EPO) production?",
    options: [
      "Elevated blood glucose levels",
      "Hypoxia detected by oxygen-sensing prolyl hydroxylase domain (PHD) enzymes in renal interstitial fibroblasts",
      "Direct stimulation by platelet-derived growth factor",
      "Increased serum iron concentrations"
    ],
    correctIndex: 1,
    explanation: "Under normoxic conditions, HIF-α is hydroxylated by PHD enzymes and targeted for proteasomal degradation. In hypoxia, PHD activity decreases, allowing HIF-α to accumulate, dimerize with HIF-β, and transactivate the EPO gene in renal interstitial fibroblasts, dramatically increasing EPO secretion.",
    difficulty: "intermediate",
    tags: ["erythropoietin", "hypoxia", "hif-pathway", "phd-enzymes"]
  },
  {
    question: "Which receptor does erythropoietin bind to on erythroid progenitor cells?",
    options: [
      "c-Mpl receptor",
      "Erythropoietin receptor (EpoR), a member of the type I cytokine receptor family",
      "Granulocyte colony-stimulating factor receptor (G-CSFR)",
      "Toll-like receptor 4 (TLR4)"
    ],
    correctIndex: 1,
    explanation: "EpoR is a type I cytokine receptor that forms a homodimer upon EPO binding. This triggers JAK2 activation, which phosphorylates tyrosine residues on the receptor cytoplasmic domain, recruiting STAT5, PI3K/AKT, and RAS/MAPK pathways that drive erythroid survival, proliferation, and differentiation.",
    difficulty: "intermediate",
    tags: ["erythropoietin-receptor", "jak2-stat5", "erythropoiesis", "cytokine-receptors"]
  },
  {
    question: "What is the primary function of thrombopoietin (TPO) in hematopoiesis?",
    options: [
      "Stimulating red blood cell production exclusively",
      "Regulating megakaryocyte development, platelet production, and maintaining hematopoietic stem cell quiescence",
      "Promoting neutrophil differentiation only",
      "Inhibiting all hematopoietic lineages"
    ],
    correctIndex: 1,
    explanation: "TPO binds to the c-Mpl receptor on megakaryocytes and hematopoietic stem cells. It drives megakaryocyte maturation, polyploidization, and proplatelet formation for platelet release. Critically, TPO also maintains HSC quiescence and survival through the MPL-JAK2-STAT3/5 axis, serving as a key stem cell niche factor.",
    difficulty: "intermediate",
    tags: ["thrombopoietin", "megakaryopoiesis", "platelet-production", "hematopoietic-stem-cells"]
  },
  {
    question: "Which colony-stimulating factor is the primary regulator of granulopoiesis and is used therapeutically to treat neutropenia?",
    options: [
      "Granulocyte-macrophage colony-stimulating factor (GM-CSF)",
      "Macrophage colony-stimulating factor (M-CSF)",
      "Granulocyte colony-stimulating factor (G-CSF), which stimulates neutrophil lineage commitment and maturation",
      "Stem cell factor (SCF)"
    ],
    correctIndex: 2,
    explanation: "G-CSF (filgrastim, pegfilgrastim) binds the G-CSF receptor on myeloid progenitors, activating JAK1/STAT3 signaling to drive neutrophil lineage commitment, proliferation, maturation, and survival. It also mobilizes HSCs from bone marrow by disrupting CXCR4/SDF-1 interactions, making it essential for neutropenia treatment and stem cell harvesting.",
    difficulty: "intermediate",
    tags: ["g-csf", "granulopoiesis", "neutropenia", "stem-cell-mobilization"]
  },
  {
    question: "Which interleukin is critical for lymphoid lineage development and T cell homeostasis, and is now used as an immunotherapeutic agent?",
    options: [
      "IL-1β, primarily a pro-inflammatory cytokine",
      "IL-2 (T cell growth factor), which promotes T cell proliferation and is used in cancer immunotherapy",
      "IL-6, primarily driving acute phase responses",
      "IL-10, primarily an anti-inflammatory cytokine"
    ],
    correctIndex: 1,
    explanation: "IL-2 signals through the IL-2 receptor (IL-2Rαβγ) on T cells, activating JAK1/JAK3 and STAT5 pathways. It drives T cell proliferation, differentiation, and survival. Therapeutically, IL-2 (aldesleukin) is used in melanoma and renal cell carcinoma, while low-dose IL-2 preferentially expands regulatory T cells for autoimmune diseases.",
    difficulty: "intermediate",
    tags: ["interleukin-2", "t-cell-homeostasis", "immunotherapy", "jak-stat-signaling"]
  },
  {
    question: "What role does IL-3 play in hematopoiesis that distinguishes it from other interleukins?",
    options: [
      "It only affects erythroid progenitors",
      "IL-3 is a multi-lineage colony-stimulating factor that stimulates myeloid, erythroid, megakaryocytic, and basophil progenitors",
      "It exclusively drives lymphoid development",
      "It acts only on mature neutrophils"
    ],
    correctIndex: 1,
    explanation: "IL-3 (multi-CSF) is produced primarily by activated T cells and binds the IL-3 receptor (IL-3Rα/CD123 + βc) on hematopoietic progenitors. It activates JAK2/STAT5, promoting survival, proliferation, and differentiation of multiple lineages including granulocytes, monocytes, eosinophils, basophils, megakaryocytes, and erythroid cells.",
    difficulty: "advanced",
    tags: ["interleukin-3", "multi-lineage-csf", "hematopoietic-progenitors", "cd123"]
  },
  {
    question: "Which peptide biomarker is elevated in disseminated intravascular coagulation (DIC) and indicates active fibrin formation and breakdown?",
    options: [
      "Procalcitonin",
      "D-dimer, a fibrin degradation product containing crosslinked D domains",
      "B-type natriuretic peptide (BNP)",
      "C-reactive protein (CRP)"
    ],
    correctIndex: 1,
    explanation: "D-dimer is a specific fibrin degradation product generated when crosslinked fibrin is cleaved by plasmin. Elevated D-dimer indicates simultaneous coagulation activation and fibrinolysis, making it a sensitive marker for DIC, venous thromboembolism, and other thrombotic conditions. It is measured by immunoassays targeting the crosslinked D domain epitope.",
    difficulty: "intermediate",
    tags: ["d-dimer", "fibrin-degradation", "dic-biomarker", "thrombosis"]
  },
  {
    question: "What is the mechanism of action of the anticoagulant peptide bivalirudin?",
    options: [
      "It activates antithrombin III irreversibly",
      "Bivalirudin is a synthetic hirudin analog that directly and reversibly inhibits thrombin by binding both the active site and exosite 1",
      "It blocks factor Xa exclusively",
      "It degrades fibrinogen directly"
    ],
    correctIndex: 1,
    explanation: "Bivalirudin is a 20-amino acid synthetic analog of hirudin that directly inhibits thrombin. Its N-terminal domain binds the thrombin active site while its C-terminal domain binds exosite 1 (fibrinogen-binding site). Thrombin slowly cleaves bivalirudin's active site binding region, allowing partial recovery of thrombin activity, giving it a favorable safety profile.",
    difficulty: "advanced",
    tags: ["bivalirudin", "thrombin-inhibitor", "hirudin-analog", "direct-anticoagulant"]
  },
  {
    question: "How does the antiplatelet peptide eptifibatide (Integrilin) inhibit platelet aggregation?",
    options: [
      "By blocking cyclooxygenase-1 (COX-1) activity",
      "Eptifibatide is a cyclic heptapeptide derived from rattlesnake venom that competitively blocks the glycoprotein IIb/IIIa receptor",
      "By inhibiting ADP binding to P2Y12 receptors",
      "By degrading von Willebrand factor"
    ],
    correctIndex: 1,
    explanation: "Eptifibatide is a synthetic cyclic heptapeptide based on the KGD (Lys-Gly-Asp) sequence of barbourin from Sistrurus miliarius barbouri venom. It reversibly binds the integrin αIIbβ3 (GPIIb/IIIa) on platelets, blocking fibrinogen and vWF binding, which prevents the final common pathway of platelet aggregation regardless of the activation stimulus.",
    difficulty: "advanced",
    tags: ["eptifibatide", "gpiib-iiia-inhibitor", "antiplatelet", "snake-venom-peptides"]
  },
  {
    question: "What is the primary target of the fibrinolytic peptide tenecteplase (TNKase) and how does it differ from alteplase?",
    options: [
      "Tenecteplase targets factor XIII exclusively",
      "Tenecteplase is a modified tissue plasminogen activator (tPA) with three amino acid substitutions providing longer half-life, higher fibrin specificity, and greater resistance to PAI-1",
      "Tenecteplase directly degrades fibrin without activating plasminogen",
      "Tenecteplase and alteplase are identical molecules"
    ],
    correctIndex: 1,
    explanation: "Tenecteplase is engineered from human tPA with three modifications: T103N (glycosylation site), N117Q (removing a glycosylation site), and KHRR 296-299 AAAA (substituting four amino acids in the kringle 2 domain). These changes extend its plasma half-life (~20 min vs ~4 min), increase fibrin specificity, and reduce PAI-1 sensitivity, allowing single bolus dosing for acute MI.",
    difficulty: "advanced",
    tags: ["tenecteplase", "tpa-modification", "fibrinolysis", "thrombolytic-therapy"]
  },
  {
    question: "What hemostatic peptide is derived from desmopressin (DDAVP) and how does it promote coagulation?",
    options: [
      "DDAVP is a direct thrombin activator",
      "Desmopressin is a synthetic vasopressin analog that stimulates endothelial V2 receptors, releasing stored von Willebrand factor and factor VIII from Weibel-Palade bodies",
      "DDAVP activates platelets directly by binding GPIb",
      "Desmopressin degrades fibrinolytic inhibitors"
    ],
    correctIndex: 1,
    explanation: "Desmopressin (1-deamino-8-D-arginine vasopressin) is a synthetic peptide analog of vasopressin with modified amino acids to reduce vasopressor activity and extend half-life. It binds V2 receptors on vascular endothelium, stimulating exocytosis of Weibel-Palade bodies, releasing ultra-large vWF multimers and factor VIII into circulation, useful in mild hemophilia A and type 1 von Willebrand disease.",
    difficulty: "intermediate",
    tags: ["desmopressin", "von-willebrand-factor", "factor-viii", "hemostasis"]
  },
  {
    question: "What is the molecular basis of the sickling phenomenon in sickle cell disease at the peptide level?",
    options: [
      "A mutation in the α-globin gene causes abnormal α-globin polymerization",
      "A single amino acid substitution (Glu6Val) in the β-globin chain creates a hydrophobic patch on deoxy-HbS, enabling polymerization into rigid fibers",
      "The mutation disrupts heme binding to globin chains",
      "Sickle hemoglobin cannot bind 2,3-BPG"
    ],
    correctIndex: 1,
    explanation: "The HbS mutation (GAG→GTG) replaces glutamic acid with valine at position 6 of the β-globin chain. This creates a hydrophobic valine residue that fits into a complementary hydrophobic pocket (Phe85, Leu88) on an adjacent deoxy-HbS tetramer. This intermolecular contact drives polymerization into 14-stranded helical fibers that deform erythrocytes into the characteristic sickle shape.",
    difficulty: "advanced",
    tags: ["sickle-cell-disease", "beta-globin", "hemoglobin-polymerization", "glu6val-mutation"]
  },
  {
    question: "How do β-thalassemia mutations affect globin chain balance, and what peptide therapeutic approach is used to restore balance?",
    options: [
      "β-thalassemia causes overproduction of α-globin; treatment uses α-globin inhibitors",
      "Reduced or absent β-globin synthesis causes excess α-globin chains that precipitate and damage erythroid precursors; luspatercept (an activin receptor ligand trap) reduces ineffective erythropoiesis",
      "β-thalassemia only affects hemoglobin oxygen affinity",
      "The primary defect is in heme synthesis, not globin chains"
    ],
    correctIndex: 1,
    explanation: "In β-thalassemia, reduced β-globin mRNA (β+) or its absence (β⁰) leads to excess unpaired α-globin chains that precipitate as inclusion bodies, causing ineffective erythropoiesis and erythroid apoptosis. Luspatercept is a modified activin receptor type IIB-Fc fusion protein that traps TGF-β superfamily ligands (GDF11, GDF8, activins), reducing aberrant Smad2/3 signaling and promoting terminal erythroid differentiation.",
    difficulty: "advanced",
    tags: ["beta-thalassemia", "alpha-globin-imbalance", "luspatercept", "ineffective-erythropoiesis"]
  },
  {
    question: "What is the mechanism of emicizumab, a bispecific antibody mimicking cofactor function in hemophilia A?",
    options: [
      "It directly replaces factor VIII as a cofactor by bridging factor IXa and factor X, mimicking the function of activated factor VIIIa",
      "It stimulates endogenous factor VIII production",
      "It inhibits factor VIII clearance from circulation",
      "It activates protein C to prevent thrombosis"
    ],
    correctIndex: 0,
    explanation: "Emicizumab is a bispecific monoclonal antibody with one arm binding factor IXa and the other binding factor X. By bringing these two enzymes into proximity, it mimics the cofactor function of factor VIIIa in the intrinsic tenase complex, restoring thrombin generation in hemophilia A patients regardless of inhibitor status. It is administered subcutaneously with a long half-life (~4 weeks).",
    difficulty: "advanced",
    tags: ["emicizumab", "hemophilia-a", "bispecific-antibody", "factor-viii-mimetic"]
  },
  {
    question: "Which peptide biomarker is most useful for monitoring minimal residual disease (MRD) in acute lymphoblastic leukemia (ALL)?",
    options: [
      "Serum ferritin levels",
      "Flow cytometric detection of leukemia-associated immunophenotype (LAIP) peptides and PCR-based detection of clonal immunoglobulin/T-cell receptor gene rearrangements",
      "C-reactive protein",
      "Serum albumin"
    ],
    correctIndex: 1,
    explanation: "MRD detection in ALL uses two complementary approaches: (1) multiparameter flow cytometry identifying aberrant surface marker combinations (LAIPs) on leukemic blasts, and (2) PCR amplification of clonally rearranged IgH/TCR genes with patient-specific junctional region sequences as molecular markers. These peptide/nucleic acid-based approaches detect 1 leukemic cell per 10,000-100,000 normal cells, guiding treatment intensity.",
    difficulty: "advanced",
    tags: ["minimal-residual-disease", "all-biomarkers", "flow-cytometry", "ig-tcr-rearrangements"]
  },
  {
    question: "What role do MHC class I-presented peptides play in lymphoma immunotherapy?",
    options: [
      "They have no role in lymphoma treatment",
      "Tumor-specific peptides presented on MHC I serve as targets for CAR-T cells and bispecific T-cell engagers, and can be used for peptide vaccine development",
      "They only function as autoantigens causing lymphoma",
      "MHC I peptides are exclusively recognized by B cells"
    ],
    correctIndex: 1,
    explanation: "Lymphoma cells present tumor-specific peptides on MHC class I molecules that can be targeted by cytotoxic T lymphocytes. This principle underlies CD19-directed CAR-T therapy (tisagenlecleucel, axicabtagene ciloleucel) and bispecific antibodies (blinatumomab). Additionally, idiotypic peptides from the B cell receptor unique to each lymphoma clone can serve as personalized vaccine targets.",
    difficulty: "advanced",
    tags: ["lymphoma", "mhc-class-i", "car-t-therapy", "tumor-peptides"]
  },
  {
    question: "What is the significance of monoclonal immunoglobulin (M-protein) peptides in multiple myeloma diagnosis and monitoring?",
    options: [
      "M-proteins are normal immunoglobulins found in all patients",
      "The clonal immunoglobulin light chain (Bence Jones) and heavy chain peptides are unique tumor markers used for diagnosis, monitoring treatment response, and detecting relapse via serum protein electrophoresis and mass spectrometry",
      "M-proteins are only found in lymphoma, not myeloma",
      "They are degraded too rapidly to be clinically useful"
    ],
    correctIndex: 1,
    explanation: "In multiple myeloma, clonal plasma cells produce a monoclonal immunoglobulin (M-protein) consisting of identical heavy and light chain peptides. This appears as an M-spike on serum/urine protein electrophoresis. Mass spectrometry-based methods (MALDI-TOF, LC-MS/MS) can now sequence the variable region peptides with higher sensitivity and specificity than traditional immunoassays for monitoring MRD.",
    difficulty: "advanced",
    tags: ["multiple-myeloma", "m-protein", "bence-jones-protein", "mass-spectrometry"]
  },
  {
    question: "How does luspatercept improve anemia in myelodysplastic syndromes (MDS) and what pathway does it modulate?",
    options: [
      "It directly stimulates EPO production in the kidneys",
      "Luspatercept traps GDF11 and other TGF-β superfamily ligands, reducing aberrant Smad2/3 signaling in late-stage erythroid precursors to promote terminal differentiation",
      "It provides iron supplementation to erythroid cells",
      "It inhibits hepcidin production"
    ],
    correctIndex: 1,
    explanation: "Luspatercept (ACE-536) is an activin receptor type IIB-Fc fusion protein that acts as a ligand trap for GDF11, GDF8, and certain activins. In MDS, excessive GDF11 signaling through Smad2/3 impairs terminal erythroid differentiation. By neutralizing these ligands, luspatercept allows erythroblasts to complete maturation, reducing transfusion dependence in lower-risk MDS patients with ring sideroblasts.",
    difficulty: "advanced",
    tags: ["luspatercept", "myelodysplastic-syndromes", "tgf-beta-pathway", "erythroid-differentiation"]
  },
  {
    question: "What are hemoglobin-based oxygen carriers (HBOCs) and what peptide engineering challenges limit their clinical use?",
    options: [
      "HBOCs are identical to natural hemoglobin and have no challenges",
      "HBOCs are modified hemoglobin tetramers engineered to prevent dissociation into dimers, reduce vasoconstriction from nitric oxide scavenging, and minimize oxidative toxicity",
      "HBOCs only carry carbon dioxide, not oxygen",
      "They are synthetic peptides unrelated to hemoglobin"
    ],
    correctIndex: 1,
    explanation: "HBOCs are hemoglobin molecules modified by crosslinking (α-α or β-β), polymerization, or encapsulation to prevent renal clearance and maintain oxygen delivery. Key challenges include: (1) NO scavenging causing vasoconstriction and hypertension, (2) auto-oxidation generating reactive oxygen species and methemoglobin, (3) heme-mediated renal toxicity, and (4) interference with clinical laboratory tests. No HBOC is currently FDA-approved.",
    difficulty: "advanced",
    tags: ["hbocs", "blood-substitutes", "hemoglobin-engineering", "nitric-oxide-scavenging"]
  },
  {
    question: "How does hepcidin regulate iron metabolism and what is its relevance to anemia of chronic disease?",
    options: [
      "Hepcidin increases iron absorption from the gut",
      "Hepcidin is a 25-amino acid peptide hormone that binds and degrades ferroportin, reducing intestinal iron absorption and macrophage iron release; elevated hepcidin in inflammation causes anemia of chronic disease",
      "Hepcidin stimulates erythropoietin production",
      "Hepcidin has no effect on iron homeostasis"
    ],
    correctIndex: 1,
    explanation: "Hepcidin is an 8 kDa peptide produced by hepatocytes that is the master regulator of iron homeostasis. It binds ferroportin (the only iron exporter) on enterocytes and macrophages, causing its internalization and lysosomal degradation. In chronic inflammation, IL-6 upregulates hepcidin via JAK2/STAT3, trapping iron in macrophages and reducing intestinal absorption, causing the iron-restricted erythropoiesis characteristic of anemia of chronic disease.",
    difficulty: "advanced",
    tags: ["hepcidin", "ferroportin", "iron-metabolism", "anemia-of-chronic-disease"]
  },
  {
    question: "What peptide-based strategies are used in transfusion medicine to extend red blood cell storage life and reduce alloimmunization?",
    options: [
      "Adding glucose alone to storage solutions",
      "Using antioxidant peptides to reduce oxidative damage, PEGylation peptides to mask antigens and reduce immunogenicity, and synthetic oxygen carriers as bridge solutions",
      "Freezing all red blood cells without cryoprotectants",
      "Irradiating units with UV light only"
    ],
    correctIndex: 1,
    explanation: "Peptide-based approaches in transfusion medicine include: (1) antioxidant peptides (e.g., N-acetylcysteine derivatives) that scavenge ROS during storage to reduce hemolysis and maintain 2,3-DPG levels, (2) PEGylation of RBC surface antigens using NHS-PEG reagents to mask Kell, Duffy, and Kidd antigens reducing alloimmunization risk, and (3) synthetic peptide-based oxygen carriers for emergency oxygen delivery when blood is unavailable.",
    difficulty: "advanced",
    tags: ["transfusion-medicine", "rbcc-storage", "pegylation", "alloimmunization"]
  }
];

# Peptide Hematology Quiz

Test your understanding of peptides in hematology, from erythropoietin and thrombopoietin signaling to anticoagulant therapeutics, hemoglobin disorders, and clinical applications in blood diseases.

<QuizCard questions={questions} />
