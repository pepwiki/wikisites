---
date: 2026-06-11
title: Peptide Oncology
description: "Quiz on peptide applications in oncology, including tumor-targeting peptides and cancer immunotherapy."
category: oncology
author: WikiSites
tags:
  - peptides
  - oncology
  - cancer-immunology
  - tumor-antigens
  - peptide-vaccines
  - checkpoint-inhibitors
  - radiolabeled-peptides
  - drug-conjugates
  - biomarkers
  - personalized-medicine
difficulty: advanced
questions: 20
---

export const questions = [
  {
    question: "What distinguishes tumor-associated antigens (TAAs) from tumor-specific antigens (TSAs)?",
    options: [
      "TAAs are only found on viral-induced tumors",
      "TAAs are overexpressed or abnormally expressed self-proteins also present on normal tissues, while TSAs are unique to tumor cells",
      "TAAs cannot be recognized by T cells",
      "TAAs are exclusively carbohydrate moieties"
    ],
    correctIndex: 1,
    explanation: "TAAs such as HER2, MAGE, and NY-ESO-1 are self-proteins overexpressed or aberrantly expressed on tumor cells but also present at low levels on normal tissues. TSAs (neoantigens) arise from somatic mutations unique to the tumor and are truly foreign to the immune system.",
    difficulty: "intermediate",
    tags: ["tumor-associated-antigens", "tumor-specific-antigens", "cancer-immunology"]
  },
  {
    question: "Why are neoantigens considered ideal targets for personalized cancer vaccines?",
    options: [
      "They are always presented on MHC class II molecules",
      "They arise from tumor-specific somatic mutations and are truly foreign, avoiding central immune tolerance",
      "They are expressed on all normal tissues at high levels",
      "They cannot be processed by the immunoproteasome"
    ],
    correctIndex: 1,
    explanation: "Neoantigens are novel peptides generated from tumor-specific somatic mutations (missense, frameshift, insertions/deletions). Because the immune system has no prior exposure to these sequences, there is no central tolerance, making neoantigen-specific T cells highly reactive against tumor cells.",
    difficulty: "advanced",
    tags: ["neoantigens", "personalized-vaccines", "somatic-mutations", "immune-tolerance"]
  },
  {
    question: "What is a key challenge in developing peptide-based cancer vaccines?",
    options: [
      "Peptides are too large to be presented by MHC molecules",
      "Low immunogenicity requiring adjuvants and delivery systems, and HLA restriction limiting patient applicability",
      "Peptide vaccines always cause severe autoimmunity",
      "They can only target B cell epitopes"
    ],
    correctIndex: 1,
    explanation: "Synthetic peptides alone are often poorly immunogenic and require adjuvants (e.g., CpG, poly-ICLC), delivery systems (nanoparticles, liposomes), or dendritic cell loading. Additionally, peptide-MHC binding is HLA-restricted, meaning different peptide epitopes are needed for patients with different HLA alleles.",
    difficulty: "intermediate",
    tags: ["peptide-vaccines", "immunogenicity", "adjuvants", "hla-restriction"]
  },
  {
    question: "Which immune checkpoint receptor-ligand interaction do therapeutic peptides targeting PD-1 aim to block?",
    options: [
      "PD-1 binding to CD80/B7-1",
      "PD-1 binding to PD-L1 (B7-H1) and PD-L2 (B7-DC)",
      "CTLA-4 binding to CD86/B7-2",
      "LAG-3 binding to MHC class II"
    ],
    correctIndex: 1,
    explanation: "PD-1 is an inhibitory receptor on activated T cells that binds PD-L1 (expressed on tumor cells and APCs) and PD-L2. This interaction delivers suppressive signals causing T cell exhaustion. Therapeutic peptides and antibodies blocking this axis restore anti-tumor T cell function.",
    difficulty: "intermediate",
    tags: ["pd-1", "pd-l1", "checkpoint-inhibitors", "t-cell-exhaustion"]
  },
  {
    question: "How do PD-L1 binding peptides differ mechanistically from anti-PD-L1 monoclonal antibodies?",
    options: [
      "They have identical mechanisms and pharmacokinetics",
      "Peptides have shorter half-lives, lower molecular weight, and potentially better tumor penetration but may require more frequent dosing",
      "Peptides cannot bind PD-L1 at all",
      "Peptides activate PD-L1 signaling rather than blocking it"
    ],
    correctIndex: 1,
    explanation: "PD-L1 targeting peptides (e.g., CLP001 derivatives) are smaller molecules (~1-2 kDa vs ~150 kDa for antibodies), enabling better tumor penetration and faster clearance. They block PD-1/PD-L1 interaction similarly to antibodies but often require structural optimization (cyclization, stapling) for stability and potency.",
    difficulty: "advanced",
    tags: ["pd-l1-peptides", "checkpoint-peptides", "pharmacokinetics", "tumor-penetration"]
  },
  {
    question: "What is the mechanism of CTLA-4 inhibitory peptide therapeutics in cancer immunotherapy?",
    options: [
      "They enhance CTLA-4 signaling to suppress autoimmunity",
      "They block CTLA-4 interaction with B7 ligands, preventing competition with CD28 and restoring costimulation",
      "They directly activate CD8+ T cells",
      "They inhibit regulatory T cell development exclusively"
    ],
    correctIndex: 1,
    explanation: "CTLA-4 competes with CD28 for binding to B7-1/B7-2 on APCs. CTLA-4 blocking peptides prevent this competition, allowing CD28-mediated costimulation to proceed during T cell priming in lymph nodes. This enhances anti-tumor T cell activation and proliferation.",
    difficulty: "advanced",
    tags: ["ctla-4", "checkpoint-inhibitors", "costimulation", "t-cell-priming"]
  },
  {
    question: "In CAR-T cell therapy, what role do tumor-associated peptides play in improving CAR design?",
    options: [
      "Peptides replace the scFv antigen-binding domain entirely",
      "Peptide-MHC complexes can serve as targets for TCR-like CARs, enabling recognition of intracellular tumor antigens presented on MHC",
      "Peptides are used only as CAR-T cell culture supplements",
      "Peptides have no role in CAR-T design"
    ],
    correctIndex: 1,
    explanation: "TCR-like (or TCR-mimic) CARs use antibody fragments that recognize specific peptide-MHC complexes on tumor cell surfaces. This extends CAR-T targeting to intracellular antigens (e.g., oncogenic proteins, differentiation antigens) that are processed and presented as peptides on MHC class I.",
    difficulty: "advanced",
    tags: ["car-t", "tcr-like-car", "peptide-mhc", "intracellular-antigens"]
  },
  {
    question: "What radionuclide is commonly conjugated to somatostatin analog peptides for targeted radionuclide therapy of neuroendocrine tumors?",
    options: [
      "Technetium-99m",
      "Lutetium-177 (Lu-177) or Yttrium-90 (Y-90)",
      "Fluorine-18",
      "Iodine-123"
    ],
    correctIndex: 1,
    explanation: "Lu-177-DOTATATE (Lutathera) is an FDA-approved radiolabeled somatostatin analog peptide for gastroenteropancreatic neuroendocrine tumors. Lu-177 emits beta particles for therapeutic effect and gamma rays for imaging. Y-90-DOTATOC is another radiolabeled somatostatin peptide used in clinical practice.",
    difficulty: "intermediate",
    tags: ["radiolabeled-peptides", "lutetium-177", "somatostatin", "neuroendocrine-tumors"]
  },
  {
    question: "What is the general structure of a peptide-drug conjugate (PDC) used in oncology?",
    options: [
      "A cytotoxic drug attached directly to an antibody",
      "A targeting peptide linked to a cytotoxic payload via a cleavable or non-cleavable linker",
      "A peptide hormone fused to a growth factor receptor",
      "An adjuvant molecule encapsulated in a liposome"
    ],
    correctIndex: 1,
    explanation: "PDCs consist of three components: a tumor-targeting peptide (e.g., RGD, bombesin, or PSMA-targeting peptide), a linker (cleavable by proteases, pH, or reduction), and a cytotoxic payload (e.g., doxoramycin, MMAE). The peptide directs selective delivery to tumor cells, reducing systemic toxicity.",
    difficulty: "intermediate",
    tags: ["peptide-drug-conjugates", "targeted-therapy", "cytotoxic-payload", "linker-chemistry"]
  },
  {
    question: "How do anti-angiogenic peptides inhibit tumor growth?",
    options: [
      "By directly killing tumor cells through apoptosis induction",
      "By blocking VEGF signaling or integrin-mediated endothelial cell adhesion to prevent new blood vessel formation",
      "By enhancing angiogenesis to improve drug delivery",
      "By activating oncogenes in endothelial cells"
    ],
    correctIndex: 1,
    explanation: "Anti-angiogenic peptides disrupt tumor vasculature by blocking VEGF/VEGFR signaling (e.g., peptide mimetics of thrombospondin-1), inhibiting integrin αvβ3-mediated endothelial cell survival, or mimicking endogenous angiogenesis inhibitors. This starves tumors of nutrients and oxygen.",
    difficulty: "intermediate",
    tags: ["anti-angiogenic", "vegf", "integrins", "tumor-vasculature"]
  },
  {
    question: "What is the mechanism of apoptosis-inducing peptides such as Smac mimetics in cancer therapy?",
    options: [
      "They activate Bcl-2 to prevent mitochondrial outer membrane permeabilization",
      "They mimic Smac/DIABLO to antagonize IAPs, releasing caspases from inhibition and promoting apoptosis",
      "They inhibit caspase-3 directly",
      "They stabilize the mitochondrial membrane"
    ],
    correctIndex: 1,
    explanation: "Smac mimetic peptides bind to inhibitor of apoptosis proteins (IAPs) such as XIAP, cIAP1, and cIAP2, preventing them from inhibiting caspases. This releases caspase-3, -7, and -9 from IAP-mediated suppression, restoring apoptotic signaling in cancer cells.",
    difficulty: "advanced",
    tags: ["apoptosis-inducing", "smac-mimetics", "iap-antagonists", "caspases"]
  },
  {
    question: "How do cell-penetrating peptides (CPPs) facilitate cancer drug delivery?",
    options: [
      "CPPs only cross membranes through receptor-mediated endocytosis",
      "CPPs carry cargo (drugs, siRNA, proteins) across cell membranes via direct translocation or endocytic pathways",
      "CPPs destroy cell membranes to allow drug entry",
      "CPPs can only transport hydrophobic molecules"
    ],
    correctIndex: 1,
    explanation: "CPPs such as TAT peptide, penetratin, and polyarginine are short cationic peptides that can traverse biological membranes. They deliver conjugated or complexed cargo (chemotherapeutics, nucleic acids, proteins) into cells through direct translocation, macropinocytosis, or endocytosis followed by endosomal escape.",
    difficulty: "intermediate",
    tags: ["cell-penetrating-peptides", "drug-delivery", "tat-peptide", "endocytosis"]
  },
  {
    question: "What is the basis of tumor-homing peptide selectivity for tumor tissue?",
    options: [
      "Tumor-homing peptides bind to normal tissue vasculature exclusively",
      "They recognize tumor-specific receptors or markers on tumor vasculature such as integrin αvβ3, NRP-1, or aminopeptidase N",
      "They rely solely on the EPR effect for tumor accumulation",
      "They are activated only in acidic pH outside cells"
    ],
    correctIndex: 1,
    explanation: "Tumor-homing peptides contain motifs (e.g., RGD, NGR, CGKRK) that bind to receptors overexpressed on tumor endothelial cells and cancer cells. The prototypical example is the RGD motif binding integrin αvβ3. Phage display has identified numerous tumor-homing peptides with specific tissue tropism.",
    difficulty: "intermediate",
    tags: ["tumor-homing", "integrin-alphavbeta3", "rgd-motif", "phage-display"]
  },
  {
    question: "How do RGD peptides function in oncology beyond tumor targeting?",
    options: [
      "They only serve as inert targeting vehicles",
      "RGD peptides can inhibit integrin-mediated cell adhesion, migration, and survival signaling while also delivering therapeutic cargo to tumors",
      "They activate integrin signaling to promote tumor growth",
      "They exclusively target the tumor extracellular matrix"
    ],
    correctIndex: 1,
    explanation: "RGD peptides bind integrins (especially αvβ3, αvβ5, α5β1) overexpressed on tumor vasculature and cancer cells. Beyond targeting, they competitively inhibit integrin-mediated signaling pathways involved in cell survival, migration, invasion, and angiogenesis. Cilengitide is an RGD peptide tested in glioblastoma clinical trials.",
    difficulty: "advanced",
    tags: ["rgd-peptides", "integrins", "cilengitide", "anti-angiogenic", "tumor-targeting"]
  },
  {
    question: "Which peptide biomarker is most commonly used for monitoring prostate cancer progression?",
    options: [
      "Chromogranin A",
      "Prostate-specific antigen (PSA), a kallikrein serine protease",
      "Carbohydrate antigen 19-9 (CA 19-9)",
      "Alpha-fetoprotein (AFP)"
    ],
    correctIndex: 1,
    explanation: "PSA (KLK3) is a serine protease produced by prostate epithelial cells. Serum PSA levels are used for prostate cancer screening, diagnosis, and monitoring treatment response. Elevated PSA can indicate prostate cancer, benign prostatic hyperplasia, or prostatitis, necessitating careful clinical interpretation.",
    difficulty: "beginner",
    tags: ["peptide-biomarkers", "psa", "prostate-cancer", "kallikrein"]
  },
  {
    question: "What are circulating tumor peptides and how are they detected?",
    options: [
      "They are antibodies secreted by tumors detected by ELISA",
      "They are peptides shed by tumor cells into blood, detectable by mass spectrometry-based proteomics or immunoassays",
      "They are only found in tumor tissue biopsies",
      "They are synthetic peptides injected for imaging"
    ],
    correctIndex: 1,
    explanation: "Circulating tumor peptides include shed tumor antigens, secreted proteolytic fragments, and exosome-associated peptides. They are detected using sensitive mass spectrometry (LC-MS/MS), proximity extension assays, or immunocapture approaches. They represent a non-invasive liquid biopsy source for cancer biomarker discovery.",
    difficulty: "advanced",
    tags: ["circulating-tumor-peptides", "liquid-biopsy", "mass-spectrometry", "biomarkers"]
  },
  {
    question: "What is the clinical significance of exosomal peptides in cancer?",
    options: [
      "Exosomal peptides have no diagnostic or prognostic value",
      "Exosomes carry tumor-derived peptides that reflect the cell of origin, can serve as biomarkers, and may modulate immune responses in the tumor microenvironment",
      "Exosomes only contain lipids and no peptides",
      "Exosomal peptides only function in healthy tissue homeostasis"
    ],
    correctIndex: 1,
    explanation: "Tumor-derived exosomes carry MHC-peptide complexes, oncoproteins, and signaling peptides that can be analyzed as liquid biopsy biomarkers. Exosomal peptide cargo can be profiled by mass spectrometry to identify neoantigens, monitor treatment response, and assess tumor heterogeneity non-invasively.",
    difficulty: "advanced",
    tags: ["exosomal-peptides", "exosomes", "liquid-biopsy", "tumor-microenvironment"]
  },
  {
    question: "Which radiolabeled peptide is most widely used for PET/CT imaging of somatostatin receptor-positive neuroendocrine tumors?",
    options: [
      "Ga-68-DOTATATE or Ga-68-DOTATOC",
      "F-18-FDG",
      "Tc-99m-sestamibi",
      "I-131-iodide"
    ],
    correctIndex: 0,
    explanation: "Ga-68-DOTATATE (Netspot) is an FDA-approved somatostatin analog peptide labeled with gallium-68 for PET imaging of neuroendocrine tumors. It binds somatostatin receptor subtype 2 (SSTR2) with high affinity, enabling precise localization of SSTR-positive tumors for diagnosis and treatment planning.",
    difficulty: "intermediate",
    tags: ["peptide-imaging", "ga-68-dotatate", "pet-ct", "neuroendocrine-tumors", "somatostatin"]
  },
  {
    question: "What is the defining characteristic of a theranostic peptide in oncology?",
    options: [
      "It can only be used for diagnosis",
      "It combines diagnostic imaging and therapeutic functions using the same or closely related peptide scaffold labeled with different radionuclides",
      "It is a peptide that treats infections in cancer patients",
      "It only works in combination with chemotherapy"
    ],
    correctIndex: 1,
    explanation: "Theranostic peptides use the same targeting peptide labeled with diagnostic radionuclides (e.g., Ga-68 for PET imaging) for patient selection and therapeutic radionuclides (e.g., Lu-177 for beta therapy) for treatment. The Lu-177-DOTATATE/Ga-68-DOTATATE pair for NETs is the prototypical example.",
    difficulty: "advanced",
    tags: ["theranostic-peptides", "theranostics", "radionuclide-therapy", "patient-selection"]
  },
  {
    question: "What is the workflow for personalized peptide therapy in cancer?",
    options: [
      "Administer the same peptides to all patients regardless of HLA type",
      "Screen patient HLA type, identify tumor neoantigens or overexpressed antigens, select peptides matching patient HLA, and administer as personalized vaccine",
      "Use only pre-manufactured peptide libraries without patient testing",
      "Rely exclusively on chemotherapy combinations"
    ],
    correctIndex: 1,
    explanation: "Personalized peptide therapy involves: (1) HLA typing of the patient, (2) tumor sequencing to identify neoantigens or overexpressed TAAs, (3) in silico prediction and validation of peptide-HLA binding, (4) manufacturing patient-specific peptide vaccines, and (5) administering with adjuvants while monitoring immune responses.",
    difficulty: "advanced",
    tags: ["personalized-peptide-therapy", "neoantigen-vaccines", "hla-typing", "precision-oncology"]
  }
];

# Peptide Oncology Quiz

Test your understanding of peptides in oncology, from tumor antigens and cancer vaccines to radiolabeled therapeutics and personalized medicine.

<QuizCard questions={questions} />
