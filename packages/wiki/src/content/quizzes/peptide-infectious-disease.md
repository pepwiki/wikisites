---
title: Peptides in Infectious Disease
description: Test your knowledge of antimicrobial peptides, antiviral therapeutics, peptide-based diagnostics, and resistance mechanisms in infectious disease applications.
category: infectious-disease
author: WikiSites
tags:
  - peptides
  - antimicrobial-peptides
  - infectious-disease
  - antiviral
  - antifungal
  - defensins
  - cathelicidins
  - biofilms
difficulty: advanced
questions: 20
---

export const questions = [
  {
    question: "What is the primary mechanism by which most antimicrobial peptides (AMPs) kill bacteria?",
    options: [
      "Inhibition of cell wall synthesis",
      "Disruption of bacterial cell membranes",
      "Inhibition of protein synthesis",
      "DNA intercalation"
    ],
    correctIndex: 1,
    explanation: "Most AMPs are cationic and amphipathic, allowing them to interact with negatively charged bacterial membranes. They insert into the lipid bilayer, forming pores or causing membrane disruption that leads to cell lysis.",
    difficulty: "beginner",
    tags: ["antimicrobial-peptides", "mechanism", "membrane-disruption"]
  },
  {
    question: "Which family of human antimicrobial peptides is characterized by six conserved cysteine residues forming three intramolecular disulfide bonds?",
    options: [
      "Cathelicidins",
      "Defensins",
      "Histatins",
      "Magainins"
    ],
    correctIndex: 1,
    explanation: "Defensins are small cationic peptides with six conserved cysteine residues that form three disulfide bonds. They are classified into alpha, beta, and theta defensins based on the pattern of disulfide connectivity.",
    difficulty: "intermediate",
    tags: ["defensins", "antimicrobial-peptides", "disulfide-bonds"]
  },
  {
    question: "What is the only known human cathelicidin antimicrobial peptide?",
    options: [
      "HNP-1",
      "Beta-defensin 2",
      "LL-37",
      "Lactoferricin"
    ],
    correctIndex: 2,
    explanation: "LL-37 is the only known human cathelicidin, derived from the C-terminal proteolytic processing of the precursor protein hCAP18. It has broad-spectrum antimicrobial activity and immunomodulatory properties.",
    difficulty: "beginner",
    tags: ["cathelicidins", "ll-37", "antimicrobial-peptides"]
  },
  {
    question: "From which organism were magainins, the first antimicrobial peptides discovered in vertebrates, originally isolated?",
    options: [
      "Honeybee",
      "African clawed frog",
      "Horseshoe crab",
      "Silkworm"
    ],
    correctIndex: 1,
    explanation: "Magainins were isolated from the skin of the African clawed frog (Xenopus laevis) by Michael Zasloff in 1987. Their discovery opened the field of host defense peptides in vertebrates.",
    difficulty: "beginner",
    tags: ["magainins", "antimicrobial-peptides", "xenopus"]
  },
  {
    question: "Which peptide antibiotic, derived from soil bacteria, is used as a last-resort treatment for multidrug-resistant Gram-negative infections?",
    options: [
      "Vancomycin",
      "Daptomycin",
      "Colistin (polymyxin E)",
      "Bacitracin"
    ],
    correctIndex: 2,
    explanation: "Colistin is a polymyxin peptide antibiotic that disrupts Gram-negative outer membranes by interacting with lipopolysaccharide. It is reserved for infections resistant to all other antibiotics due to its nephrotoxicity.",
    difficulty: "intermediate",
    tags: ["peptide-antibiotics", "colistin", "gram-negative"]
  },
  {
    question: "Which class of anti-viral peptides inhibits HIV entry by binding to the gp41 heptad repeat region and preventing membrane fusion?",
    options: [
      "Nucleoside analogs",
      "Fusion inhibitor peptides",
      "Integrase inhibitors",
      "Protease inhibitors"
    ],
    correctIndex: 1,
    explanation: "Fusion inhibitor peptides such as enfuvirtide (T-20) are derived from the HR2 region of HIV gp41. They bind to the HR1 trimeric coiled-coil, preventing the formation of the six-helix bundle required for membrane fusion.",
    difficulty: "intermediate",
    tags: ["anti-viral-peptides", "hiv", "fusion-inhibitors"]
  },
  {
    question: "Enfuvirtide (T-20), the first FDA-approved HIV fusion inhibitor, is a synthetic peptide of what length?",
    options: [
      "14 amino acids",
      "27 amino acids",
      "36 amino acids",
      "51 amino acids"
    ],
    correctIndex: 2,
    explanation: "Enfuvirtide is a 36-amino acid synthetic peptide corresponding to a sequence in the HR2 domain of HIV-1 gp41. It was approved in 2003 as the first fusion inhibitor for treatment-experienced patients.",
    difficulty: "advanced",
    tags: ["hiv-entry-inhibitors", "enfuvirtide", "anti-viral-peptides"]
  },
  {
    question: "Which peptide-based approach has been explored for COVID-19 therapeutics by targeting the interaction between the SARS-CoV-2 spike protein and ACE2?",
    options: [
      "mRNA vaccines encoding spike peptides",
      "Stapled peptides blocking spike-ACE2 binding",
      "Cyclic peptides inhibiting viral protease",
      "Both B and C"
    ],
    correctIndex: 3,
    explanation: "Multiple peptide strategies have been investigated for COVID-19, including stapled peptides that block spike-ACE2 interaction and cyclic peptides targeting the main protease (Mpro). These approaches complement vaccination strategies.",
    difficulty: "advanced",
    tags: ["covid-19-peptide-therapeutics", "sars-cov-2", "spike-protein"]
  },
  {
    question: "What is the primary target of hemagglutinin-based peptide influenza vaccines?",
    options: [
      "Viral RNA polymerase",
      "Neuraminidase active site",
      "Hemagglutinin stalk region epitopes",
      "M2 ion channel protein"
    ],
    correctIndex: 2,
    explanation: "Peptide vaccines targeting the hemagglutinin stalk region aim to elicit broadly neutralizing antibodies. The stalk is more conserved than the head domain, offering potential for universal influenza vaccine development.",
    difficulty: "advanced",
    tags: ["influenza-peptide-vaccines", "hemagglutinin", "universal-vaccine"]
  },
  {
    question: "Which hepatitis B virus peptide antigen is the primary target for T cell-based immunotherapy approaches?",
    options: [
      "HBsAg-derived peptides",
      "HBcAg-derived peptides",
      "HBx protein peptides",
      "Polymerase-derived peptides"
    ],
    correctIndex: 1,
    explanation: "HBcAg (hepatitis B core antigen) contains multiple immunodominant T cell epitopes. HBcAg-derived peptides are widely used in therapeutic vaccine strategies to restore antiviral T cell responses in chronic HBV carriers.",
    difficulty: "advanced",
    tags: ["hepatitis-peptide-antigens", "hbv", "t-cell-epitopes"]
  },
  {
    question: "Which antifungal peptide class, found in human neutrophils, works by binding to ergosterol in fungal membranes?",
    options: [
      "Histatins",
      "Defensins",
      "Lactoferricin",
      "Plectasin"
    ],
    correctIndex: 0,
    explanation: "Histatins, particularly histatin 5, are salivary peptides with potent antifungal activity against Candida species. While they target fungal cells, their mechanism involves intracellular targets after uptake rather than direct ergosterol binding. Defensins and lactoferricin have more direct membrane interactions.",
    difficulty: "advanced",
    tags: ["anti-fungal-peptides", "histatins", "candida"]
  },
  {
    question: "Which anti-parasitic peptide, derived from the amphibian skin, has shown activity against Plasmodium falciparum liver stages?",
    options: [
      "Magainin 2",
      "Cecropin",
      "Dermaseptin",
      "Melittin"
    ],
    correctIndex: 2,
    explanation: "Dermaseptins from Phyllomedusa frogs show anti-plasmodial activity against both liver and blood stages of Plasmodium. Their mechanism involves disruption of the parasite membrane and interference with intracellular development.",
    difficulty: "advanced",
    tags: ["anti-parasitic-peptides", "dermaseptin", "malaria"]
  },
  {
    question: "What is the most common mechanism by which bacteria develop resistance to antimicrobial peptides?",
    options: [
      "Efflux pump overexpression",
      "Modification of lipopolysaccharide with cationic groups",
      "Target site mutation",
      "Enzymatic degradation"
    ],
    correctIndex: 1,
    explanation: "Bacteria commonly resist AMPs by modifying their membrane charge. Gram-negative bacteria add aminoarabinose or phosphoethanolamine to LPS, reducing the negative surface charge and decreasing AMP binding.",
    difficulty: "intermediate",
    tags: ["peptide-resistance-mechanisms", "lps-modification", "bacteria"]
  },
  {
    question: "What synergistic effect is observed when combining antimicrobial peptides with conventional antibiotics?",
    options: [
      "Increased renal toxicity",
      "Reduced minimum inhibitory concentration of both agents",
      "Antagonistic interference with binding",
      "No measurable interaction"
    ],
    correctIndex: 1,
    explanation: "AMPs and antibiotics often show synergy, where the combination reduces the MIC of both agents. AMPs permeabilize bacterial membranes, enhancing antibiotic uptake, while antibiotics target intracellular processes the AMP cannot reach.",
    difficulty: "intermediate",
    tags: ["peptide-combinations", "synergy", "mic-reduction"]
  },
  {
    question: "Which peptide is FDA-approved for use in silver-containing wound dressings to prevent biofilm formation in chronic wounds?",
    options: [
      "LL-37",
      "Nisin",
      "No FDA-approved peptide exists for this indication",
      "Gramicidin"
    ],
    correctIndex: 2,
    explanation: "While many peptides show promise in wound infection models, no antimicrobial peptide has received FDA approval specifically for wound dressings. Silver-based and other antimicrobial agents currently dominate the wound care market.",
    difficulty: "advanced",
    tags: ["wound-infection-peptides", "biofilms", "fda-approval"]
  },
  {
    question: "What property of antimicrobial peptides makes them particularly effective at disrupting bacterial biofilms?",
    options: [
      "High lipophilicity",
      "Ability to penetrate the extracellular polymeric matrix",
      "Covalent binding to DNA",
      "Inhibition of quorum sensing exclusively"
    ],
    correctIndex: 1,
    explanation: "AMPs can penetrate the extracellular polymeric substance (EPS) matrix of biofilms due to their small size and charge properties. Some AMPs also inhibit biofilm formation by disrupting quorum signaling and killing metabolically dormant persister cells.",
    difficulty: "intermediate",
    tags: ["biofilm-disrupting-peptides", "eps-matrix", "persister-cells"]
  },
  {
    question: "How are synthetic peptides used in peptide-based diagnostics for infectious diseases?",
    options: [
      "As PCR primers for pathogen detection",
      "As antigens in serological assays to detect pathogen-specific antibodies",
      "As chromatography stationary phases",
      "As preservatives in blood collection tubes"
    ],
    correctIndex: 1,
    explanation: "Synthetic peptides representing immunodominant epitopes are used as capture antigens in ELISA and lateral flow assays. They detect antibodies against specific pathogens without requiring whole organisms, improving safety and standardization.",
    difficulty: "beginner",
    tags: ["peptide-based-diagnostics", "elisa", "immunoassays"]
  },
  {
    question: "Which design strategy improves the selectivity of antimicrobial peptides toward bacterial cells over mammalian cells?",
    options: [
      "Increasing peptide length beyond 50 residues",
      "Incorporating D-amino acids to resist proteases",
      "Optimizing amphipathicity and cationic charge distribution",
      "Adding glycosylation sites"
    ],
    correctIndex: 2,
    explanation: "Selectivity is achieved by optimizing the balance of cationic charge (targeting negative bacterial membranes) and amphipathicity (enabling membrane insertion). Mammalian membranes have cholesterol and are less negatively charged, providing a therapeutic window.",
    difficulty: "intermediate",
    tags: ["antimicrobial-peptide-design", "selectivity", "amphipathicity"]
  },
  {
    question: "What does the selectivity index (SI) represent in antimicrobial peptide research?",
    options: [
      "The ratio of MIC to minimum bactericidal concentration",
      "The ratio of hemolytic concentration (HC50) to minimum inhibitory concentration (MIC)",
      "The peptide's binding affinity to DNA",
      "The rate of peptide degradation in serum"
    ],
    correctIndex: 1,
    explanation: "The selectivity index is calculated as HC50/MIC. A higher SI indicates greater selectivity for microbial cells over host cells. Peptides with SI > 10 are generally considered to have acceptable therapeutic potential.",
    difficulty: "intermediate",
    tags: ["selectivity-index", "hc50", "mic"]
  },
  {
    question: "What is the standard definition of minimum inhibitory concentration (MIC) in antimicrobial susceptibility testing?",
    options: [
      "The lowest concentration that kills 99.9% of bacteria",
      "The lowest concentration that visibly inhibits bacterial growth after overnight incubation",
      "The concentration that reduces biofilm mass by 50%",
      "The maximum tolerated dose in animal models"
    ],
    correctIndex: 1,
    explanation: "MIC is defined as the lowest concentration of an antimicrobial agent that prevents visible growth of a microorganism after 16-20 hours of incubation under standardized conditions, as determined by broth microdilution methods.",
    difficulty: "beginner",
    tags: ["minimum-inhibitory-concentration", "mic", "susceptibility-testing"]
  }
];
