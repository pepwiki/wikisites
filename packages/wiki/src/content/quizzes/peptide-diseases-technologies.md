---
date: 2026-06-13
author: "Wikipept Contributors"
id: quiz-peptide-disease-prion-001
question: "Prion diseases (transmissible spongiform encephalopathies) involve misfolding of which host protein?"
options:
  - "Amyloid-beta"
  - "Alpha-synuclein"
  - "Prion protein (PrP)"
  - "Tau"
correctIndex: 2
explanation: "Prion diseases such as Creutzfeldt-Jakob disease, bovine spongiform encephalopathy, and scrapie involve conformational conversion of normal cellular prion protein (PrPC) into a pathogenic beta-sheet-rich isoform (PrPSc). PrPSc acts as a template to propagate misfolding, leading to neurodegeneration."
difficulty: "intermediate"
tags: ["prion", "misfolding", "neurodegeneration", "amyloid"]
---

---

id: quiz-peptide-disease-huntington-001
question: "Huntington's disease is caused by expansion of a polyglutamine (polyQ) tract in the huntingtin protein. What threshold of CAG repeats generally causes disease?"
options:
  - "10-19 repeats"
  - "20-35 repeats"
  - "36 or more repeats"
  - "100 or more repeats"
correctIndex: 2
explanation: "Huntington's disease is an autosomal dominant neurodegenerative disorder caused by CAG trinucleotide repeat expansion in the HTT gene. Individuals with 36 or more repeats develop disease, with higher repeat numbers correlating with earlier onset (genetic anticipation). The expanded polyQ tract causes huntingtin aggregation and neuronal toxicity."
difficulty: "intermediate"
tags: ["huntington", "polyglutamine", "neurodegeneration", "protein-aggregation"]
---

---

id: quiz-peptide-tech-spps-001
question: "In solid-phase peptide synthesis (SPPS), which amino acid protecting group is removed first during the final cleavage step?"
options:
  - "Boc (tert-butyloxycarbonyl)"
  - "Fmoc (fluorenylmethyloxycarbonyl)"
  - "Side-chain protecting groups and resin linker"
  - "No groups are removed during cleavage"
correctIndex: 2
explanation: "In Fmoc-SPPS, the final cleavage step using TFA simultaneously removes side-chain protecting groups and cleaves the peptide from the resin. The Fmoc group is removed iteratively during chain elongation using piperidine. In Boc-SPPS, final cleavage with HF removes side chains and cleaves from resin simultaneously."
difficulty: "intermediate"
tags: ["SPPS", "Fmoc", "Boc", "protecting-groups", "peptide-synthesis"]
---

---

id: quiz-peptide-tech-native-chemical-ligation-001
question: "Native chemical ligation (NCL) enables synthesis of long peptides by joining two unprotected fragments. What chemical group is required at the C-terminus of the N-terminal fragment?"
options:
  - "Thioester"
  - "Azide"
  - "Alkyne"
  - "Aldehyde"
correctIndex: 0
explanation: "Native chemical ligation requires a C-terminal thioester on the N-terminal fragment and an N-terminal cysteine on the C-terminal fragment. The thioester undergoes transthioesterification with the cysteine thiol, followed by an S-to-N acyl shift to form a native peptide bond at the ligation site."
difficulty: "advanced"
tags: ["NCL", "native-chemical-ligation", "thioester", "peptide-ligation"]
---

---

id: quiz-peptide-computational-molecular-dynamics-001
question: "Molecular dynamics (MD) simulations of peptides calculate the time evolution of atomic positions using which fundamental equation?"
options:
  - "Schrodinger equation"
  - "Newton's equations of motion (F = ma)"
  - "Boltzmann distribution equation"
  - "Henderson-Hasselbalch equation"
correctIndex: 1
explanation: "MD simulations numerically integrate Newton's second law (F = ma) for each atom in the system. Forces are calculated from empirical force fields (e.g., AMBER, CHARMM, OPLS) that model bonded and non-bonded interactions. Timestep integration algorithms like Verlet or leapfrog propagate positions and velocities."
difficulty: "intermediate"
tags: ["molecular-dynamics", "simulation", "force-field", "computational"]
---

---

id: quiz-peptide-computational-force-field-001
question: "Which of the following is NOT a commonly used force field for peptide and protein molecular dynamics simulations?"
options:
  - "AMBER"
  - "CHARMM"
  - "OPLS-AA"
  - "GROMACS"
correctIndex: 3
explanation: "GROMACS is a molecular dynamics simulation software package, not a force field. AMBER, CHARMM, and OPLS-AA are all widely used force fields that define potential energy functions and parameter sets for simulating peptides and proteins. GROMACS can use multiple force fields including OPLS-AA, AMBER, and CHARMM."
difficulty: "beginner"
tags: ["force-field", "molecular-dynamics", "AMBER", "CHARMM", "computational"]
---

---

id: quiz-peptide-structure-prediction-alphafold-001
question: "AlphaFold2 predicts protein structure using which deep learning architecture?"
options:
  - "Convolutional neural network (CNN)"
  - "Recurrent neural network (RNN)"
  - "Transformer with attention mechanism"
  - "Generative adversarial network (GAN)"
correctIndex: 2
explanation: "AlphaFold2 uses a novel neural network architecture based on the Transformer with attention mechanisms. It processes multiple sequence alignments (MSAs) and residue pair representations through Evoformer modules that reason about spatial and evolutionary relationships, followed by a structure module that outputs 3D coordinates."
difficulty: "intermediate"
tags: ["AlphaFold", "structure-prediction", "deep-learning", "Transformer"]
---

---

id: quiz-peptide-structure-prediction-rosettafold-001
question: "RoseTTAFold differs from AlphaFold2 in its approach to structure prediction by using what architectural innovation?"
options:
  - "A three-track neural network that simultaneously processes 1D sequence, 2D distance, and 3D coordinate information"
  - "A purely physics-based energy minimization approach"
  - "A Monte Carlo sampling method without deep learning"
  - "A homology-only approach using template structures"
correctIndex: 0
explanation: "RoseTTAFold uses a three-track architecture where 1D (sequence), 2D (pairwise distances), and 3D (coordinates) representations are processed in parallel with information flowing between tracks. This enables faster structure prediction while maintaining high accuracy, though generally slightly below AlphaFold2 on benchmarks."
difficulty: "advanced"
tags: ["RoseTTAFold", "structure-prediction", "deep-learning", "neural-network"]
---

---

id: quiz-peptide-drug-design-peptidomimetic-001
question: "Peptidomimetics are designed to overcome which major limitation of natural peptides as drugs?"
options:
  - "High selectivity"
  - "Rapid proteolytic degradation and poor oral bioavailability"
  - "Excessive water solubility"
  - "Inability to cross cell membranes in any form"
correctIndex: 1
explanation: "Natural peptides are rapidly degraded by proteases and have poor oral bioavailability due to their size, flexibility, and susceptibility to enzymatic cleavage. Peptidomimetics mimic peptide pharmacophores while incorporating non-natural amino acids, backbone modifications, or scaffold replacements to improve metabolic stability, membrane permeability, and oral bioavailability."
difficulty: "beginner"
tags: ["peptidomimetic", "drug-design", "bioavailability", "stability"]
---

---

id: quiz-peptide-drug-design-stapled-peptide-001
question: "Hydrocarbon-stapled peptides improve therapeutic potential by introducing what structural feature?"
options:
  - "Disulfide bonds between cysteine residues"
  - "An all-hydrocarbon crosslink that stabilizes alpha-helical conformation"
  - "PEGylation for extended half-life"
  - "Cyclization via head-to-tail amide bond"
correctIndex: 1
explanation: "Stapled peptides contain an all-hydrocarbon crosslink formed by ring-closing metathesis of two alpha-methylated, alpha-alkenyl amino acids. This 'staple' constrains the peptide into an alpha-helical conformation, improving binding affinity, protease resistance, and cell permeability. Stapled peptides have been developed to target protein-protein interactions including p53-MDM2."
difficulty: "intermediate"
tags: ["stapled-peptides", "drug-design", "alpha-helix", "protein-protein-interaction"]
---

---

id: quiz-peptide-disease-amyloidosis-001
question: "In systemic amyloidosis, which peptide precursor forms amyloid fibrils in AL (light chain) amyloidosis?"
options:
  - "Serum amyloid A (SAA)"
  - "Transthyretin (TTR)"
  - "Immunoglobulin light chain"
  - "Beta-2 microglobulin"
correctIndex: 2
explanation: "AL amyloidosis is caused by misfolded monoclonal immunoglobulin light chains (kappa or lambda) produced by clonal plasma cells. These light chains or their fragments deposit as amyloid fibrils in organs including heart, kidney, liver, and nerves. It is the most common systemic amyloidosis in developed countries."
difficulty: "intermediate"
tags: ["amyloidosis", "light-chain", "misfolding", "plasma-cell-disorder"]
---

---

id: quiz-peptide-tech-microwave-synthesis-001
question: "Microwave-assisted peptide synthesis accelerates SPPS reactions primarily through what mechanism?"
options:
  - "Selective cleavage of Fmoc groups"
  - "Rapid, uniform dielectric heating that overcomes activation energy barriers"
  - "UV-mediated photolysis of protecting groups"
  - "Electrochemical reduction of disulfide bonds"
correctIndex: 1
explanation: "Microwave irradiation provides rapid, uniform dielectric heating of polar molecules in the reaction mixture. This thermal energy accelerates coupling reactions and deprotection steps, reducing reaction times from hours to minutes and improving crude purity by minimizing side reactions such as racemization and aggregation."
difficulty: "intermediate"
tags: ["microwave-synthesis", "SPPS", "peptide-synthesis", "technology"]
---

---

id: quiz-peptide-computational-docking-001
question: "In computational peptide-protein docking, what does 'scoring function' primarily evaluate?"
options:
  - "The synthetic accessibility of the peptide"
  - "The predicted binding affinity and complementarity of the peptide-protein complex"
  - "The sequence homology between peptide and protein"
  - "The pharmacokinetic properties of the peptide"
correctIndex: 1
explanation: "Scoring functions in molecular docking estimate the binding free energy of a ligand-receptor complex by evaluating electrostatic interactions, van der Waals forces, desolvation penalties, hydrogen bonding, and entropy contributions. For peptide docking, scoring must account for peptide flexibility, induced fit effects, and water-mediated interactions."
difficulty: "intermediate"
tags: ["docking", "scoring-function", "computational", "binding-affinity"]
---

---

id: quiz-peptide-structure-secondary-001
question: "What dihedral angle values define an ideal alpha-helix in Ramachandran plot space?"
options:
  - "phi = -57 degrees, psi = -47 degrees"
  - "phi = -139 degrees, psi = +135 degrees"
  - "phi = -60 degrees, psi = +60 degrees"
  - "phi = 0 degrees, psi = 0 degrees"
correctIndex: 0
explanation: "The ideal alpha-helix has backbone dihedral angles of approximately phi = -57 degrees and psi = -47 degrees. This places consecutive residues in a right-handed helical arrangement with 3.6 residues per turn, stabilized by i to i+4 hydrogen bonds. These values fall in the upper-left quadrant of the Ramachandran plot."
difficulty: "intermediate"
tags: ["alpha-helix", "Ramachandran-plot", "secondary-structure", "structure"]
---

---

id: quiz-peptide-drug-design-cyclic-peptide-001
question: "Cyclic peptides generally show improved membrane permeability compared to linear peptides of similar size because of what property?"
options:
  - "Increased molecular weight"
  - "More polar surface area"
  - "Reduced conformational flexibility enabling intramolecular hydrogen bonding"
  - "Presence of D-amino acids in all cyclic peptides"
correctIndex: 2
explanation: "Cyclic peptides can adopt conformations that bury polar groups through intramolecular hydrogen bonds, reducing the desolvation penalty for membrane crossing. This 'chameleonic' behavior allows cyclic peptides to present a less polar surface in lipid bilayer environments while remaining soluble in aqueous solution. Examples include cyclosporin A."
difficulty: "advanced"
tags: ["cyclic-peptides", "drug-design", "membrane-permeability", "conformation"]
---

---

id: quiz-peptide-disease-diabetes-glp1-001
question: "GLP-1 receptor agonists like semaglutide resist DPP-4 degradation through which chemical modification?"
options:
  - "PEGylation of the peptide backbone"
  - "Fatty acid acylation enabling albumin binding and amino acid substitutions at DPP-4 cleavage sites"
  - "Complete replacement with small molecule agonists"
  - "Encapsulation in liposomal formulations"
correctIndex: 1
explanation: "Semaglutide incorporates two key modifications: amino acid substitutions (Aib at position 8) to block DPP-4 cleavage and a C-18 fatty diacid chain conjugated to lysine-26 via a linker, enabling strong non-covalent binding to serum albumin. These modifications extend the half-life to approximately one week, enabling once-weekly dosing."
difficulty: "advanced"
tags: ["GLP-1", "semaglutide", "peptide-drug", "DPP-4", "albumin-binding"]
---

---

id: quiz-peptide-tech-click-chemistry-001
question: "Copper-catalyzed azide-alkyne cycloaddition (CuAAC), a 'click chemistry' reaction, has been widely used in peptide chemistry for what purpose?"
options:
  - "Cleaving peptide bonds selectively"
  - "Forming stable triazole linkages as peptide bond bioisosteres or conjugation handles"
  - "Deprotecting Fmoc groups"
  - "Generating disulfide bonds"
correctIndex: 1
explanation: "CuAAC forms 1,4-disubstituted 1,2,3-triazoles from azides and terminal alkynes. In peptide chemistry, triazole rings serve as metabolically stable bioisosteres of amide bonds, as macrocyclization linkers, and as conjugation handles for attaching fluorophores, PEG chains, or targeting moieties to peptide scaffolds."
difficulty: "intermediate"
tags: ["click-chemistry", "CuAAC", "triazole", "peptide-modification"]
---

---

id: quiz-peptide-computational-ml-peptide-design-001
question: "Generative machine learning models for de novo peptide design typically use which approach?"
options:
  - "Random sequence generation without training data"
  - "Variational autoencoders (VAEs) or generative adversarial networks (GANs) trained on peptide sequence-activity data"
  - "Manual sequence inspection by experts"
  - "Simple BLAST sequence alignment"
correctIndex: 1
explanation: "Generative models such as VAEs, GANs, and more recently large language models are trained on known peptide sequences and their properties to learn the distribution of bioactive peptide space. These models can then generate novel sequences predicted to have desired properties such as target binding, antimicrobial activity, or cell permeability."
difficulty: "advanced"
tags: ["machine-learning", "generative-models", "de-novo-design", "computational"]
---

---

id: quiz-peptide-structure-beta-sheet-001
question: "In beta-sheets, hydrogen bonds form between which atoms of adjacent peptide strands?"
options:
  - "C=O of residue i in one strand and N-H of residue j in the adjacent strand"
  - "Side chain atoms of hydrophobic residues"
  - "Backbone C-alpha atoms of adjacent strands"
  - "Disulfide bonds between cysteine residues"
correctIndex: 0
explanation: "Beta-sheet secondary structure is stabilized by inter-strand hydrogen bonds between the carbonyl oxygen (C=O) of one residue and the amide hydrogen (N-H) of a residue in the adjacent strand. In parallel sheets these bonds are slightly angled; in antiparallel sheets they are nearly linear and typically stronger."
difficulty: "beginner"
tags: ["beta-sheet", "hydrogen-bond", "secondary-structure", "structure"]
---

---

id: quiz-peptide-drug-design-prodrug-001
question: "Peptide prodrug strategies often employ which approach to improve oral absorption?"
options:
  - "Increasing the number of charged amino acids"
  - "N-terminal acylation with lipophilic groups to increase membrane permeability"
  - "Adding more disulfide bonds"
  - "Increasing molecular weight above 1000 Da"
correctIndex: 1
explanation: "Lipophilic prodrug strategies involve conjugating fatty acids or other lipophilic moieties to peptides to enhance passive membrane permeability. The prodrug is designed to be cleaved by endogenous esterases or peptidases after absorption to release the active peptide. Other prodrug approaches include reversible cyclization and self-immolative linkers."
difficulty: "intermediate"
tags: ["prodrug", "drug-design", "oral-bioavailability", "lipophilic"]
---

---

id: quiz-peptide-disease-alzheimer-tau-001
question: "In Alzheimer's disease, neurofibrillary tangles are composed primarily of hyperphosphorylated forms of which protein?"
options:
  - "Amyloid-beta"
  - "Alpha-synuclein"
  - "Tau protein"
  - "Prion protein"
correctIndex: 2
explanation: "Tau is a microtubule-associated protein that becomes abnormally hyperphosphorylated in Alzheimer's disease. Hyperphosphorylated tau detaches from microtubules and aggregates into paired helical filaments that form intracellular neurofibrillary tangles. Tau pathology correlates more closely with cognitive decline than amyloid plaque burden."
difficulty: "intermediate"
tags: ["Alzheimers", "tau", "neurofibrillary-tangles", "phosphorylation"]
---

---

id: quiz-peptide-tech-lipidation-001
question: "Lipidation of peptide drugs (e.g., attachment of fatty acid chains) primarily improves which pharmacokinetic property?"
options:
  - "Renal clearance rate"
  - "Plasma half-life through albumin binding"
  - "Oral absorption through the stomach"
  - "Blood-brain barrier penetration"
correctIndex: 1
explanation: "Lipidated peptides such as liraglutide and semaglutide bind reversibly to serum albumin after subcutaneous injection, creating a circulating depot that shields the peptide from proteolytic degradation and renal filtration. This dramatically extends plasma half-life from minutes to hours or days."
difficulty: "intermediate"
tags: ["lipidation", "albumin-binding", "pharmacokinetics", "peptide-drug"]
---

---

id: quiz-peptide-computational-free-energy-001
question: "Free energy perturbation (FEP) calculations are used in peptide drug design to predict what property?"
options:
  - "The synthetic yield of the peptide"
  - "The relative binding affinity changes upon peptide sequence modifications"
  - "The color of the peptide solution"
  - "The molecular weight of the peptide"
correctIndex: 1
explanation: "FEP is a rigorous statistical mechanics method that computes relative free energy differences between two chemical states (e.g., wild-type vs. mutant peptide, or two different modifications) by gradually transforming one into the other through alchemical intermediates. This enables accurate prediction of how sequence changes affect binding affinity to a target protein."
difficulty: "advanced"
tags: ["FEP", "free-energy", "computational", "binding-affinity", "drug-design"]
---

---

id: quiz-peptide-structure-disulfide-001
question: "Disulfide bonds in peptides and proteins form between the thiol groups of which amino acid?"
options:
  - "Methionine"
  - "Cysteine"
  - "Serine"
  - "Threonine"
correctIndex: 1
explanation: "Disulfide bonds form through oxidation of the thiol (-SH) groups of two cysteine residues to create a covalent -S-S- bridge. These bonds stabilize tertiary and quaternary structure. In synthetic peptides, directed disulfide formation is achieved using orthogonal protecting groups or controlled oxidation protocols."
difficulty: "beginner"
tags: ["disulfide-bond", "cysteine", "structure", "stabilization"]
---

---

id: quiz-peptide-disease-microbial-resistance-001
question: "Antimicrobial peptide (AMP) resistance in bacteria can develop through which mechanism?"
options:
  - "Efflux pumps that export AMPs from the cell"
  - "Modification of lipopolysaccharide (LPS) or teichoic acid to reduce negative surface charge"
  - "Production of AMP-degrading proteases"
  - "All of the above"
correctIndex: 3
explanation: "Bacteria develop AMP resistance through multiple mechanisms: proteolytic degradation of AMPs (e.g., staphylokinase for defensins), modification of cell surface charge (adding aminoarabinose to LPS or D-alanine to teichoic acids to reduce electrostatic attraction), efflux pumps, and biofilm formation that sequesters AMPs."
difficulty: "advanced"
tags: ["antimicrobial-peptides", "resistance", "bacteria", "infectious-disease"]
