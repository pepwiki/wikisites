---
date: 2026-06-12
title: Peptide Allergy and Immunology
description: "Quiz covering peptide roles in allergy and immunology, including IgE signaling and mast cell degranulation mechanisms."
category: immunology
author: WikiSites
tags:
  - peptides
  - allergy
  - immunology
  - allergen-peptides
  - immunotherapy
  - tolerance
  - autoimmune-disease
  - cytokines
  - chemokines
  - complement
  - transplant
  - gvhd
difficulty: advanced
questions: 20
---

export const questions = [
  {
    question: "Which structural feature of allergen-derived peptides makes them suitable for hypoallergenic immunotherapy?",
    options: [
      "They contain intact IgE epitopes that crosslink mast cell receptors",
      "They retain T cell epitopes but lack conformational IgE epitopes, reducing IgE-mediated side effects",
      "They are fully glycosylated to enhance mast cell binding",
      "They are longer than 50 amino acids to preserve all B cell epitopes"
    ],
    correctIndex: 1,
    explanation: "Hypoallergenic peptides are designed to contain T cell epitopes for tolerance induction while disrupting conformational IgE epitopes. This allows T cell reprogramming without triggering IgE-mediated mast cell degranulation, which requires intact conformational epitopes for IgE crosslinking on FcεRI.",
    difficulty: "advanced",
    tags: ["allergen-peptides", "hypoallergenic", "ige-epitopes", "t-cell-epitopes"]
  },
  {
    question: "What is the primary mechanism by which epitope-based allergy vaccines induce immune tolerance?",
    options: [
      "They stimulate massive IgE production to block allergen binding",
      "They activate allergen-specific Th1 and regulatory T cell responses while promoting IgG4 blocking antibodies",
      "They eliminate all B cells recognizing the allergen",
      "They permanently delete MHC class II molecules from APCs"
    ],
    correctIndex: 1,
    explanation: "Epitope-based allergy vaccines redirect the immune response from a pathogenic Th2 phenotype (IgE, IL-4, IL-13) toward Th1 (IFN-γ, IgG1/IgG4) and Treg (IL-10, TGF-β) responses. IgG4 antibodies act as blocking antibodies that compete with IgE for allergen binding, reducing allergic symptoms.",
    difficulty: "advanced",
    tags: ["epitope-vaccines", "allergy-vaccines", "th1-th2", "igG4", "immune-tolerance"]
  },
  {
    question: "How do T cell tolerance peptides suppress allergic inflammation?",
    options: [
      "By activating complement-mediated lysis of Th2 cells",
      "By inducing anergy, deletion, or regulatory T cell differentiation in allergen-specific T cells",
      "By promoting IgE class switching in B cells",
      "By enhancing mast cell degranulation to exhaust mediator stores"
    ],
    correctIndex: 1,
    explanation: "T cell tolerance peptides engage TCRs on allergen-specific T cells under conditions that favor tolerance: co-stimulation blockade leads to anergy, high-dose exposure causes deletion, and presentation by tolerogenic dendritic cells promotes Treg differentiation. These Tregs then suppress Th2 responses via IL-10 and TGF-β.",
    difficulty: "advanced",
    tags: ["t-cell-tolerance", "anergy", "treg", "tolerogenic-dendritic-cells"]
  },
  {
    question: "What advantage does sublingual immunotherapy (SLIT) have over subcutaneous immunotherapy for peptide delivery?",
    options: [
      "SLIT peptides are absorbed into the systemic circulation without immune processing",
      "The sublingual mucosa contains tolerogenic Langerhans-like dendritic cells that favor Treg induction with a favorable safety profile",
      "SLIT bypasses all immune activation entirely",
      "SLIT requires general anesthesia for administration"
    ],
    correctIndex: 1,
    explanation: "The sublingual mucosa contains a dense network of immature dendritic cells (Langerhans-like DCs) that are inherently tolerogenic. These DCs capture allergen peptides and migrate to draining lymph nodes where they induce Foxp3+ Tregs and IL-10 production, promoting mucosal tolerance with fewer systemic side effects than subcutaneous routes.",
    difficulty: "intermediate",
    tags: ["sublingual-immunotherapy", "slit", "mucosal-tolerance", "langerhans-cells"]
  },
  {
    question: "What is a key design principle of peptide immunotherapy for allergic diseases?",
    options: [
      "Using whole allergen proteins to maximize IgE crosslinking",
      "Selecting short synthetic peptides containing dominant T cell epitopes while minimizing IgE-binding capacity",
      "Conjugating peptides to IgE to target mast cells directly",
      "Using only B cell epitopes without T cell epitopes"
    ],
    correctIndex: 1,
    explanation: "Peptide immunotherapy uses short synthetic peptides (typically 13-25 amino acids) containing immunodominant T cell epitopes. Their short length disrupts the tertiary structure required for IgE recognition while preserving MHC class II binding and T cell activation, enabling tolerance induction with minimal risk of anaphylaxis.",
    difficulty: "intermediate",
    tags: ["peptide-immunotherapy", "t-cell-epitopes", "synthetic-peptides", "design-principles"]
  },
  {
    question: "Which cytokine-derived peptide fragment has been shown to have anti-inflammatory properties distinct from the parent cytokine?",
    options: [
      "IL-1β(1-15) which activates the inflammasome",
      "TNF-α(1-20) which enhances NF-κB signaling",
      "The C-terminal peptide of IL-10 which can suppress pro-inflammatory cytokine production independently of the IL-10 receptor",
      "IFN-γ(1-10) which activates macrophages"
    ],
    correctIndex: 2,
    explanation: "Fragments and peptides derived from anti-inflammatory cytokines like IL-10 can retain or acquire immunomodulatory properties. The C-terminal region of IL-10 has been shown to suppress TNF-α and IL-6 production through mechanisms partially independent of the classical IL-10/IL-10R pathway, offering potential therapeutic applications in inflammatory conditions.",
    difficulty: "advanced",
    tags: ["cytokine-peptides", "il-10", "anti-inflammatory", "peptide-fragments"]
  },
  {
    question: "What role do chemokine-derived peptides play in modulating allergic inflammation?",
    options: [
      "They exclusively enhance eosinophil recruitment to amplify allergic responses",
      "They can act as receptor antagonists that block chemokine-driven leukocyte migration to sites of allergic inflammation",
      "They have no effect on immune cell trafficking",
      "They only function as chemoattractants for neutrophils"
    ],
    correctIndex: 1,
    explanation: "Synthetic peptides derived from chemokine receptor-binding domains or N-terminal regions can function as competitive antagonists. For example, peptides mimicking the N-terminus of CCL2 or CXCL8 can block receptor activation, reducing recruitment of eosinophils, basophils, and Th2 cells to allergic inflammation sites without triggering downstream signaling.",
    difficulty: "advanced",
    tags: ["chemokine-peptides", "receptor-antagonists", "leukocyte-migration", "eosinophils"]
  },
  {
    question: "Which complement-derived peptide is a potent anaphylatoxin that promotes mast cell degranulation and smooth muscle contraction?",
    options: [
      "C1q collagen domain peptide",
      "C3a and C5a peptides generated during complement activation",
      "Factor B activation peptide",
      "C4b binding protein fragment"
    ],
    correctIndex: 1,
    explanation: "C3a and C5a are small peptide fragments (anaphylatoxins) generated during complement activation. C3a (77 amino acids) and C5a (74 amino acids) bind their respective GPCRs (C3aR, C5aR1) on mast cells and basophils, triggering degranulation, histamine release, and smooth muscle contraction. They also enhance vascular permeability and leukocyte chemotaxis.",
    difficulty: "intermediate",
    tags: ["complement-peptides", "anaphylatoxins", "c3a", "c5a", "mast-cell"]
  },
  {
    question: "Which peptide-based biomarker is used to monitor type I hypersensitivity responses in clinical practice?",
    options: [
      "Serum tryptase peptide fragments as markers of mast cell activation",
      "Collagen propeptides as markers of bone turnover",
      "Fibrinopeptide A as a marker of coagulation",
      "Amyloid beta peptides as markers of neuroinflammation"
    ],
    correctIndex: 0,
    explanation: "Tryptase is a serine protease stored in mast cell granules. During IgE-mediated mast cell activation, mature tryptase and its peptide fragments are released into serum. Elevated tryptase levels (measured by immunoassay) serve as a biomarker for systemic mast cell activation, anaphylaxis, and mastocytosis, making it clinically valuable for monitoring allergic responses.",
    difficulty: "intermediate",
    tags: ["autoimmune-biomarkers", "tryptase", "mast-cell-activation", "anaphylaxis"]
  },
  {
    question: "What is the mechanism of action of peptide-based therapeutics targeting autoimmune diseases?",
    options: [
      "They non-specifically suppress all immune responses like corticosteroids",
      "They selectively restore tolerance to specific self-antigens by inducing regulatory T cells or deleting/nergizing autoreactive T cells",
      "They permanently eliminate all T cells from the body",
      "They block all MHC molecule expression on every cell"
    ],
    correctIndex: 1,
    explanation: "Peptide autoimmune therapeutics aim to restore antigen-specific tolerance without broad immunosuppression. Approaches include altered peptide ligands (APLs) that induce T cell anergy, tolerogenic nanoparticles delivering self-antigen peptides to tolerogenic DCs, and peptide-MHC complexes that expand antigen-specific Tregs. This targeted approach avoids the side effects of global immunosuppression.",
    difficulty: "advanced",
    tags: ["autoimmune-therapeutics", "altered-peptide-ligands", "antigen-specific-tolerance", "treg"]
  },
  {
    question: "Which approach is used to induce peripheral tolerance using peptide-MHC multimers?",
    options: [
      "Injecting peptide-MHC tetramers to activate all CD8+ T cells non-specifically",
      "Delivering soluble peptide-MHC complexes or multimers that engage TCRs without co-stimulation, inducing anergy or Treg differentiation in antigen-specific T cells",
      "Using peptide-MHC complexes to permanently delete MHC molecules",
      "Conjugating peptide-MHC multimers to toxins to kill all T cells"
    ],
    correctIndex: 1,
    explanation: "Soluble peptide-MHC multimers (tetramers, dimers) can be engineered to engage antigen-specific TCRs in the absence of co-stimulatory signals. This incomplete activation induces T cell anergy, promotes apoptosis of autoreactive T cells, or drives differentiation into antigen-specific Foxp3+ Tregs, establishing peripheral tolerance to the targeted self-antigen.",
    difficulty: "advanced",
    tags: ["tolerance-induction", "peptide-mhc-multimers", "anergy", "peripheral-tolerance"]
  },
  {
    question: "What peptide epitope strategy is used to expand regulatory T cells (Tregs) for autoimmune therapy?",
    options: [
      "Using superagonist anti-CD28 antibodies alone without antigen specificity",
      "Administering low-dose self-antigen peptides that preferentially engage high-affinity TCRs on Tregs, promoting their expansion and suppressive function",
      "Deleting all CD4+ T cells and hoping Tregs regenerate first",
      "Using only foreign antigen peptides to activate bystander suppression"
    ],
    correctIndex: 1,
    explanation: "Low-dose antigen therapy exploits the fact that Tregs often express higher-affinity TCRs for self-antigens than conventional T cells. Administration of low doses of self-antigen peptides preferentially stimulates Treg expansion and IL-10/TGF-β production, which then suppresses autoreactive effector T cells through bystander suppression and linked suppression mechanisms.",
    difficulty: "advanced",
    tags: ["regulatory-t-cell", "treg-expansion", "low-dose-antigen", "bystander-suppression"]
  },
  {
    question: "How do cyclosporine-derived peptides contribute to immunosuppression in transplant settings?",
    options: [
      "They directly kill all lymphocytes through membrane disruption",
      "Cyclosporine binds cyclophilin, and the complex inhibits calcineurin, blocking NFAT nuclear translocation and IL-2 transcription in T cells",
      "They enhance T cell activation to promote graft acceptance",
      "They block only complement activation pathways"
    ],
    correctIndex: 1,
    explanation: "Cyclosporine is a cyclic undecapeptide that binds the intracellular immunophilin cyclophilin. The cyclosporine-cyclophilin complex inhibits calcineurin phosphatase activity, preventing dephosphorylation and nuclear translocation of NFAT. This blocks IL-2 transcription and T cell activation, making it a cornerstone immunosuppressant for preventing transplant rejection.",
    difficulty: "intermediate",
    tags: ["peptide-immunosuppressants", "cyclosporine", "calcineurin", "nfat", "il-2"]
  },
  {
    question: "Which peptide biomarkers are associated with acute cellular transplant rejection?",
    options: [
      "Donor-derived cell-free DNA peptide fragments and perforin/granzyme B mRNA-derived peptides indicating cytotoxic T cell-mediated graft damage",
      "Elevated hemoglobin peptides indicating good graft function",
      "Normal albumin peptides indicating stable liver function",
      "Decreased creatinine peptides indicating improved kidney function"
    ],
    correctIndex: 0,
    explanation: "During acute cellular rejection, cytotoxic T lymphocytes attack graft tissue, releasing donor-derived cell-free DNA (dd-cfDNA) fragments into the circulation. Additionally, increased expression of perforin and granzyme B by graft-infiltrating lymphocytes generates characteristic peptide signatures. These molecular markers can be detected earlier than clinical symptoms, enabling preemptive treatment adjustment.",
    difficulty: "advanced",
    tags: ["transplant-rejection", "biomarkers", "dd-cfDNA", "perforin", "granzyme-b"]
  },
  {
    question: "What role do minor histocompatibility antigen (mHA) peptides play in graft-vs-host disease (GVHD)?",
    options: [
      "They have no role in transplant immunology",
      "Donor T cells recognize recipient mHA peptides (polymorphic peptides from normal proteins) presented on recipient MHC molecules, triggering GVHD",
      "mHA peptides only activate B cells to produce protective antibodies",
      "They exclusively suppress donor immune responses against the recipient"
    ],
    correctIndex: 1,
    explanation: "Minor histocompatibility antigens are peptides derived from polymorphic proteins (e.g., HA-1, HA-2, HY antigens) that differ between donor and recipient due to genetic polymorphisms. After allogeneic hematopoietic stem cell transplantation, donor T cells recognize these recipient-derived mHA peptides on recipient APCs, triggering alloreactive T cell responses that cause GVHD targeting skin, liver, and gut.",
    difficulty: "advanced",
    tags: ["gvhd", "minor-histocompatibility-antigens", "mha", "allogeneic-hsct"]
  },
  {
    question: "Which thyroid-derived peptides are key autoantigens in Hashimoto's thyroiditis?",
    options: [
      "Thyroglobulin and thyroid peroxidase peptide epitopes recognized by autoreactive CD4+ T cells and targeted by autoantibodies",
      "Insulin and glucagon peptides from the pancreatic islets",
      "Myelin basic protein peptides from the central nervous system",
      "Collagen type II peptides from articular cartilage"
    ],
    correctIndex: 0,
    explanation: "Hashimoto's thyroiditis is driven by autoreactive T cells and autoantibodies targeting thyroid-specific antigens, primarily thyroglobulin (Tg) and thyroid peroxidase (TPO). Specific immunodominant peptide epitopes from these proteins are presented on HLA class II molecules to CD4+ T cells, which provide help to B cells for autoantibody production and activate CD8+ cytotoxic T cells that destroy thyroid follicular cells.",
    difficulty: "intermediate",
    tags: ["autoimmune-thyroid", "hashimotos", "thyroglobulin", "thyroid-peroxidase", "autoantigens"]
  },
  {
    question: "Which pancreatic beta cell-derived peptides serve as autoantigens in type 1 diabetes?",
    options: [
      "Proinsulin, GAD65, IA-2, and ZnT8 peptide epitopes presented by HLA class I and class II molecules",
      "Only insulin B-chain peptides regardless of HLA type",
      "Glucagon peptides that stimulate alpha cell destruction",
      "Amylin peptides that form toxic aggregates in islets"
    ],
    correctIndex: 0,
    explanation: "Type 1 diabetes involves autoimmune destruction of pancreatic beta cells by autoreactive T cells recognizing multiple beta cell-derived autoantigens. Key peptide epitopes include proinsulin/insulin peptides (especially insulin B-chain 9-23), GAD65 (glutamic acid decarboxylase), IA-2 (insulinoma-associated protein 2), and ZnT8 (zinc transporter 8). These peptides are presented by HLA-DR3/DR4 and HLA-A2 molecules to CD4+ and CD8+ T cells respectively.",
    difficulty: "advanced",
    tags: ["type-1-diabetes", "autoantigens", "proinsulin", "gad65", "ia-2", "znt8"]
  },
  {
    question: "How are citrullinated peptides involved in rheumatoid arthritis (RA) pathogenesis?",
    options: [
      "Citrullination has no relevance to autoimmune disease",
      "Post-translational citrullination of arginine residues in proteins like fibrinogen and vimentin creates neoepitopes recognized by anti-citrullinated protein antibodies (ACPA) and autoreactive T cells",
      "Citrullinated peptides suppress all inflammatory responses in joints",
      "Citrullination only affects carbohydrate moieties on joint proteins"
    ],
    correctIndex: 1,
    explanation: "In RA, peptidylarginine deiminase (PAD) enzymes convert arginine to citrulline in synovial proteins (fibrinogen, vimentin, α-enolase, collagen type II). These citrullinated peptides are presented by HLA-DR4 (shared epitope alleles) to CD4+ T cells, breaking tolerance and driving ACPA production. ACPA immune complexes further amplify synovial inflammation and joint destruction.",
    difficulty: "advanced",
    tags: ["rheumatoid-arthritis", "citrullinated-peptides", "acpa", "shared-epitope", "pad-enzymes"]
  },
  {
    question: "What is the significance of myelin-derived peptides in multiple sclerosis (MS) immunopathogenesis?",
    options: [
      "Myelin peptides have no role in CNS autoimmune disease",
      "Autoreactive CD4+ T cells recognize myelin peptides (MBP, MOG, PLP) presented on HLA-DR15, initiating CNS inflammation, demyelination, and neurodegeneration",
      "Myelin peptides exclusively activate regulatory T cells to prevent MS",
      "Myelin peptides only stimulate B cell antibody production without T cell involvement"
    ],
    correctIndex: 1,
    explanation: "In MS, autoreactive Th1 and Th17 cells specific for myelin peptides (myelin basic protein, myelin oligodendrocyte glycoprotein, proteolipid protein) cross the blood-brain barrier. These T cells recognize myelin peptides presented by HLA-DR15 (DRB1*15:01) on local APCs in the CNS, initiating inflammatory cascades that recruit additional immune cells, leading to oligodendrocyte damage, demyelination, and axonal injury.",
    difficulty: "advanced",
    tags: ["multiple-sclerosis", "myelin-peptides", "mbp", "mog", "plp", "hla-dr15"]
  },
  {
    question: "Which gut-derived microbial peptides are implicated in inflammatory bowel disease (IBD) pathogenesis?",
    options: [
      "Only sterile dietary peptides with no microbial component",
      "Microbial flagellin peptides and outer membrane protein fragments that breach the intestinal barrier, activating innate and adaptive immune responses in genetically susceptible individuals",
      "Synthetic drug peptides used to treat IBD",
      "Commensal-derived peptides that exclusively suppress all intestinal inflammation"
    ],
    correctIndex: 1,
    explanation: "In IBD (Crohn's disease and ulcerative colitis), loss of intestinal barrier integrity allows microbial peptides (flagellin epitopes, porins, and other commensal-derived antigens) to access the lamina propria. In genetically susceptible individuals with NOD2/CARD15 mutations or IL-23R variants, these microbial peptides activate innate immune cells (macrophages, DCs) and drive pathogenic Th1/Th17 responses, causing chronic intestinal inflammation.",
    difficulty: "advanced",
    tags: ["inflammatory-bowel-disease", "ibd", "microbial-peptides", "flagellin", "intestinal-barrier"]
  }
];
