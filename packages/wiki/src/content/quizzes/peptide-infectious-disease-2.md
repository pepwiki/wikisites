---
title: Peptides in Infectious Disease Part 2
description: Test your knowledge of peptide-based diagnostics, anti-biofilm strategies, quorum sensing, peptide vaccines, immunotherapy, and therapeutic peptides against bacteria, viruses, fungi, and parasites.
category: infectious-disease
author: WikiSites
tags:
  - peptides
  - infectious-disease
  - peptide-diagnostics
  - peptide-vaccines
  - anti-biofilm
  - quorum-sensing
  - peptide-antibiotics
  - immunotherapy
difficulty: advanced
questions: 20
---

export const questions = [
  {
    question: "Which modification strategy is most commonly used to generate antibiotic-resistant peptides that evade bacterial protease degradation?",
    options: [
      "PEGylation of the N-terminus",
      "Incorporation of D-amino acid substitutions",
      "Addition of polyhistidine tags",
      "Cyclization via disulfide bonds only"
    ],
    correctIndex: 1,
    explanation: "D-amino acid substitutions confer resistance to bacterial proteases that stereospecifically cleave L-amino acid peptide bonds. This strategy extends peptide half-life in vivo while often maintaining antimicrobial activity.",
    difficulty: "intermediate",
    tags: ["antibiotic-resistance-peptides", "d-amino-acids", "protease-resistance"]
  },
  {
    question: "Which peptide adjuvant is derived from the bacterial protein flagellin and enhances immune responses by activating TLR5?",
    options: [
      "KLH (keyhole limpet hemocyanin)",
      "Flagellin-derived peptide adjuvants",
      "Monophosphoryl lipid A",
      "Aluminum hydroxide"
    ],
    correctIndex: 1,
    explanation: "Flagellin-derived peptides activate Toll-like receptor 5 (TLR5), triggering innate immune responses. These peptide adjuvants enhance antigen presentation and cytokine production, improving vaccine immunogenicity when conjugated to or co-administered with antigens.",
    difficulty: "advanced",
    tags: ["peptide-adjuvants", "flagellin", "tlr5"]
  },
  {
    question: "What is the primary purpose of peptide epitope mapping in infectious disease research?",
    options: [
      "To determine the three-dimensional structure of pathogen proteins",
      "To identify minimal immunogenic sequences that elicit specific immune responses",
      "To quantify pathogen load in clinical specimens",
      "To synthesize recombinant pathogen proteins"
    ],
    correctIndex: 1,
    explanation: "Peptide epitope mapping identifies the minimal peptide sequences (epitopes) recognized by B cells or T cells. This information guides vaccine design, diagnostic assay development, and understanding of protective immunity against pathogens.",
    difficulty: "beginner",
    tags: ["peptide-epitope-mapping", "immunogenic-sequences", "vaccine-design"]
  },
  {
    question: "Which class of MHC molecules presents viral peptide antigens to CD8+ cytotoxic T lymphocytes?",
    options: [
      "MHC class I",
      "MHC class II",
      "MHC class III",
      "Non-classical MHC"
    ],
    correctIndex: 0,
    explanation: "MHC class I molecules present endogenously synthesized viral peptides (8-10 amino acids) to CD8+ T cells. Proteasomal degradation generates peptide fragments that are transported via TAP into the ER for MHC I loading.",
    difficulty: "beginner",
    tags: ["viral-peptide-antigens", "mhc-class-i", "cd8-t-cells"]
  },
  {
    question: "Which bacterial peptide antigen is commonly used in the QuantiFERON-TB Gold test for latent tuberculosis detection?",
    options: [
      "Mycobacterial lipoarabinomannan peptides",
      "ESAT-6, CFP-10, and TB7.7 peptides",
      "Bacillus Calmette-Guerin surface peptides",
      "Mycobacterial heat shock protein peptides"
    ],
    correctIndex: 1,
    explanation: "The QuantiFERON-TB Gold test uses synthetic peptides from ESAT-6, CFP-10, and TB7.7 proteins that are present in Mycobacterium tuberculosis but absent from BCG vaccine strains. IFN-gamma release indicates M. tuberculosis exposure.",
    difficulty: "intermediate",
    tags: ["bacterial-peptide-antigens", "tuberculosis", "quantiferon"]
  },
  {
    question: "Which Plasmodium peptide antigen has been most extensively studied for inclusion in malaria subunit vaccines?",
    options: [
      "Circumsporozoite protein (CSP) repeat peptides",
      "Merozoite surface protein 8 peptides",
      "PfEMP1 VAR2CSA peptides",
      "Apical membrane antigen 3 peptides"
    ],
    correctIndex: 0,
    explanation: "The circumsporozoite protein (CSP) contains immunodominant NANP repeat sequences that are the primary target of the RTS,S/AS01 (Mosquirix) vaccine. CSP peptides elicit antibodies that block sporozoite invasion of hepatocytes.",
    difficulty: "intermediate",
    tags: ["parasitic-peptide-antigens", "malaria", "csp", "rts-s-vaccine"]
  },
  {
    question: "Which fungal cell wall peptide antigen is targeted by the diagnostic assay for invasive aspergillosis?",
    options: [
      "Galactomannan",
      "Beta-D-glucan",
      "Mannan",
      "Neither of these are peptides"
    ],
    correctIndex: 3,
    explanation: "Galactomannan and beta-D-glucan are polysaccharides, not peptides. Fungal diagnostics primarily target carbohydrate antigens rather than peptide antigens, though peptide-based approaches targeting Candida mannoproteins are under development.",
    difficulty: "advanced",
    tags: ["fungal-peptide-antigens", "diagnostics", "asppergillus"]
  },
  {
    question: "What advantage do synthetic peptide antigens offer over whole-organism lysates in serological diagnostic assays?",
    options: [
      "Lower manufacturing cost only",
      "Improved specificity by targeting defined epitopes with reduced cross-reactivity",
      "Longer shelf life at room temperature only",
      "Ability to detect all pathogen strains equally"
    ],
    correctIndex: 1,
    explanation: "Synthetic peptides representing defined epitopes reduce cross-reactivity with related pathogens or host proteins. They offer batch-to-batch consistency, enhanced safety (no live organisms), and the ability to multiplex different epitopes on a single platform.",
    difficulty: "intermediate",
    tags: ["peptide-diagnostics-for-infection", "synthetic-peptides", "specificity"]
  },
  {
    question: "Which rapid peptide-based lateral flow assay format is used for point-of-care detection of dengue NS1 antigen?",
    options: [
      "Sandwich immunoassay using anti-NS1 antibody pairs",
      "Competitive assay using NS1-derived peptide conjugated to gold nanoparticles",
      "Direct peptide probe detection without antibodies",
      "PCR-coupled peptide amplification"
    ],
    correctIndex: 0,
    explanation: "Commercial dengue NS1 rapid tests use sandwich immunoassays with monoclonal antibodies, not peptide-based detection. However, peptide-based lateral flow formats are being developed where synthetic peptides replace antibodies as capture reagents for improved stability.",
    difficulty: "advanced",
    tags: ["rapid-peptide-tests", "lateral-flow", "dengue"]
  },
  {
    question: "What is a key advantage of peptide-based biosensors over antibody-based biosensors for pathogen detection at point-of-care?",
    options: [
      "Higher molecular weight improves sensitivity",
      "Greater stability, lower cost, and ease of chemical modification",
      "Inability to detect low-abundance targets",
      "Requirement for cold chain storage"
    ],
    correctIndex: 1,
    explanation: "Peptide biosensors offer advantages including thermal stability, chemical synthesis scalability, small size enabling dense surface packing, and amenability to modifications like cyclization or stapling. These properties make them ideal for resource-limited settings.",
    difficulty: "intermediate",
    tags: ["peptide-biosensors-for-pathogens", "point-of-care", "stability"]
  },
  {
    question: "Which anti-biofilm peptide, derived from human platelets, disrupts Staphylococcus aureus biofilms by binding to the extracellular matrix?",
    options: [
      "LL-37",
      "Thrombocidin-1",
      "RP-1",
      "Nisin"
    ],
    correctIndex: 1,
    explanation: "Thrombocidin-1 is a C-terminal derivative of human platelet chemokine NAP-2 that demonstrates anti-biofilm activity against S. aureus. It disrupts established biofilms and prevents biofilm formation at sub-inhibitory concentrations.",
    difficulty: "advanced",
    tags: ["anti-biofilm-peptides", "thrombocidin", "staphylococcus"]
  },
  {
    question: "What role do autoinducer peptides (AIPs) play in bacterial quorum sensing systems?",
    options: [
      "They serve as energy sources during nutrient limitation",
      "They accumulate extracellularly and coordinate gene expression when a threshold concentration is reached",
      "They directly lyse competing bacterial species",
      "They integrate into host cell membranes to facilitate invasion"
    ],
    correctIndex: 1,
    explanation: "Autoinducer peptides are secreted signaling molecules that accumulate in the environment as bacterial density increases. When a threshold concentration is reached, they activate two-component signaling systems that regulate virulence factor production, biofilm formation, and other density-dependent behaviors.",
    difficulty: "intermediate",
    tags: ["quorum-sensing-peptides", "autoinducer-peptides", "gene-regulation"]
  },
  {
    question: "Which Staphylococcus aureus quorum sensing system uses autoinducing peptides (AIPs) to regulate toxin production?",
    options: [
      "LuxI/LuxR system",
      "Agr (accessory gene regulator) system",
      "LasI/LasR system",
      "Rpf signaling system"
    ],
    correctIndex: 1,
    explanation: "The agr system in S. aureus uses cyclic AIPs that are detected by the histidine kinase AgrC. This activates RNAIII production, which upregulates secreted toxins and proteases while downregulating surface adhesins, coordinating the shift from colonization to invasion.",
    difficulty: "intermediate",
    tags: ["quorum-sensing-peptides", "agr-system", "staphylococcus-aureus"]
  },
  {
    question: "What is a major advantage of peptide vaccines over whole-protein or inactivated pathogen vaccines?",
    options: [
      "They always induce stronger immune responses than live attenuated vaccines",
      "They can focus immune responses on conserved protective epitopes while avoiding immunodominant variable regions",
      "They do not require adjuvants under any circumstances",
      "They generate responses only through CD4+ T cells"
    ],
    correctIndex: 1,
    explanation: "Peptide vaccines can direct immune responses toward conserved epitopes that may be subdominant in natural infection, potentially providing broader cross-protection. They avoid irrelevant or immunodominant variable epitopes that might divert the immune response.",
    difficulty: "intermediate",
    tags: ["peptide-vaccines-for-infection", "conserved-epitopes", "vaccine-design"]
  },
  {
    question: "Which delivery platform has shown the most promise for peptide immunotherapy against chronic hepatitis B infection?",
    options: [
      "Oral peptide tablets",
      "Dendritic cell vaccines loaded with HBV-derived peptides",
      "Intranasal peptide sprays",
      "Topical peptide patches"
    ],
    correctIndex: 1,
    explanation: "Dendritic cell vaccines pulsed with HBV-derived peptides (particularly from HBcAg and HBsAg) can activate virus-specific T cells. Clinical trials have shown this approach can partially restore antiviral immunity in chronic HBV patients when combined with antiviral therapy.",
    difficulty: "advanced",
    tags: ["peptide-immunotherapy", "hepatitis-b", "dendritic-cell-vaccines"]
  },
  {
    question: "What is the primary mechanism of action of palivizumab, a monoclonal antibody used for passive immunization against respiratory syncytial virus (RSV)?",
    options: [
      "It is a synthetic peptide that neutralizes RSV F protein",
      "It is a humanized monoclonal antibody targeting the RSV F protein, not a peptide",
      "It is a cyclic peptide that blocks viral entry",
      "It is a defensin analog with antiviral activity"
    ],
    correctIndex: 1,
    explanation: "Palivizumab is a humanized monoclonal antibody (not a peptide) targeting the RSV fusion (F) protein. While true peptide-based passive immunization approaches are under development, current clinical passive immunization against RSV relies on antibody preparations.",
    difficulty: "intermediate",
    tags: ["passive-immunization-with-peptides", "rsv", "palivizumab"]
  },
  {
    question: "Which peptide antibiotic class, produced by Bacillus species, inhibits bacterial cell wall synthesis by binding to lipid II?",
    options: [
      "Polymyxins",
      "Gramicidins",
      "Bacitracin",
      "Daptomycin"
    ],
    correctIndex: 2,
    explanation: "Bacitracin is a cyclic peptide antibiotic produced by Bacillus subtilis that binds to undecaprenyl pyrophosphate (C55-isoprenyl pyrophosphate), preventing the recycling of the lipid carrier needed for peptidoglycan precursor transport.",
    difficulty: "intermediate",
    tags: ["peptide-antibiotics", "bacitracin", "cell-wall-synthesis"]
  },
  {
    question: "Which antifungal peptide targets the fungal cell membrane by binding directly to ergosterol?",
    options: [
      "Caspofungin (echinocandin)",
      "Amphotericin B (polyene macrolide)",
      "Plectasin (defensin)",
      "Histatin 5"
    ],
    correctIndex: 1,
    explanation: "Amphotericin B is a polyene antifungal (not a peptide) that binds ergosterol. Among true antifungal peptides, plectasin targets lipid II in fungal cell walls, while histatin 5 is taken up by fungal cells and targets intracellular processes. The question tests the distinction between peptide and non-peptide antifungals.",
    difficulty: "advanced",
    tags: ["peptide-antifungals", "ergosterol", "antifungal-mechanisms"]
  },
  {
    question: "Which peptide antiviral strategy involves using synthetic peptides that mimic the heptad repeat regions of class I fusion proteins to block viral entry?",
    options: [
      "Nucleotide decoy therapy",
      "Peptide fusion inhibitors",
      "Protease active site blockers",
      "Capsid assembly modulators"
    ],
    correctIndex: 1,
    explanation: "Peptide fusion inhibitors mimic HR1 or HR2 regions of viral class I fusion proteins (e.g., HIV gp41, RSV F, SARS-CoV-2 S). They bind to the complementary heptad repeat, preventing formation of the six-helix bundle required for membrane fusion.",
    difficulty: "intermediate",
    tags: ["peptide-antivirals", "fusion-inhibitors", "heptad-repeats"]
  },
  {
    question: "Which antiparasitic peptide has been derived from the amphibian host defense peptide family and shows activity against Trypanosoma cruzi?",
    options: [
      "Brevinin-1",
      "Magainin 2",
      "Temporin A",
      "Caerin 1"
    ],
    correctIndex: 0,
    explanation: "Brevinin-1 family peptides from Rana frogs demonstrate antiparasitic activity against Trypanosoma cruzi, the causative agent of Chagas disease. These peptides disrupt parasite membranes and have shown efficacy in both in vitro and animal models of infection.",
    difficulty: "advanced",
    tags: ["peptide-antiparasitics", "brevinin", "trypanosoma-cruz"]
  }
];
