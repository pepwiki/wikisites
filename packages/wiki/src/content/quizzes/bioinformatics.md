---
id: quiz-bioinformatics-001
question: "Which scoring matrix is most commonly used for comparing closely related protein sequences?"
options:
  - "BLOSUM45"
  - "BLOSUM62"
  - "BLOSUM80"
  - "PAM250"
correctIndex: 2
explanation: "BLOSUM80 is designed for closely related sequences (≥80% identity). BLOSUM62 is the general-purpose default, BLOSUM45 suits distant homologs, and PAM250 is an older matrix for very divergent sequences."
difficulty: "intermediate"
tags: ["sequence-alignment", "scoring-matrices", "BLOSUM"]
---

---

id: quiz-bioinformatics-002
question: "In BLAST, what does the E-value represent?"
options:

- "The percentage of identical residues in the alignment"
- "The expected number of hits with a score ≥ S in a database of that size by chance"
- "The energy of binding between query and subject sequences"
- "The error rate of the alignment algorithm"
  correctIndex: 1
  explanation: "The E-value estimates the number of alignments with a score ≥ S expected by chance in a database search. Lower E-values indicate more significant matches. An E-value of 1 means one such hit is expected by chance."
  difficulty: "beginner"
  tags: ["BLAST", "E-value", "database-search"]

---

---

id: quiz-bioinformatics-003
question: "Which BLAST variant is designed specifically for comparing a nucleotide query against a nucleotide database?"
options:

- "BLASTP"
- "BLASTX"
- "BLASTN"
- "TBLASTN"
  correctIndex: 2
  explanation: "BLASTN compares nucleotide queries against nucleotide databases. BLASTP is protein-vs-protein, BLASTX translates nucleotide query and searches protein database, TBLASTN searches translated nucleotide database with protein query."
  difficulty: "beginner"
  tags: ["BLAST", "BLASTN", "sequence-search"]

---

---

id: quiz-bioinformatics-004
question: "Which algorithm is used by MUSCLE for multiple sequence alignment?"
options:

- "Progressive alignment with iterative refinement"
- "Dynamic programming with affine gap penalties"
- "Hidden Markov model-based alignment"
- "Hash-based seed-and-extend alignment"
  correctIndex: 0
  explanation: "MUSCLE uses progressive alignment followed by iterative refinement to improve accuracy. It builds a guide tree, performs progressive alignment, then iterates between tree rebuilding and realignment to converge on a better solution."
  difficulty: "intermediate"
  tags: ["multiple-sequence-alignment", "MUSCLE", "progressive-alignment"]

---

---

id: quiz-bioinformatics-005
question: "In phylogenetic analysis, which method assumes a model of molecular evolution and finds the tree that maximizes the probability of observing the data?"
options:

- "Maximum Parsimony"
- "Neighbor-Joining"
- "Maximum Likelihood"
- "UPGMA"
  correctIndex: 2
  explanation: "Maximum Likelihood (ML) evaluates trees under an explicit model of evolution, selecting the tree that maximizes the likelihood of the observed data. It is statistically rigorous but computationally intensive compared to distance-based methods."
  difficulty: "advanced"
  tags: ["phylogenetics", "maximum-likelihood", "evolutionary-models"]

---

---

id: quiz-bioinformatics-006
question: "What is the primary limitation of homology modeling for protein structure prediction?"
options:

- "It requires GPU hardware for computation"
- "It can only predict structures for proteins with ≥30% sequence identity to a known structure"
- "It cannot predict loop regions accurately"
- "It is limited to proteins shorter than 100 residues"
  correctIndex: 1
  explanation: "Homology modeling requires a template structure with sufficient sequence identity (typically ≥30%). Below this threshold, alignment errors propagate into the model. Loop modeling is challenging but not the primary limitation."
  difficulty: "intermediate"
  tags: ["homology-modeling", "structure-prediction", "sequence-identity"]

---

---

id: quiz-bioinformatics-007
question: "In ab initio protein structure prediction, what is the primary challenge known as the Levinthal paradox?"
options:

- "The energy function is too inaccurate to distinguish native folds"
- "The conformational space is astronomically large, making exhaustive search impossible"
- "Quantum effects cannot be modeled computationally"
- "Solvent interactions are too complex to simulate"
  correctIndex: 1
  explanation: "Levinthal's paradox notes that a 100-residue protein has ~3^198 possible conformations, making random search impossible. Proteins fold in milliseconds, suggesting they follow directed pathways rather than exhaustive sampling."
  difficulty: "advanced"
  tags: ["ab-initio", "protein-folding", "Levinthal-paradox"]

---

---

id: quiz-bioinformatics-008
question: "In molecular dynamics simulations, what does the term 'equilibration phase' refer to?"
options:

- "The initial energy minimization step before simulation"
- "The period during which the system reaches thermodynamic equilibrium before data collection"
- "The final analysis of trajectory data"
- "The process of solvating the protein in a water box"
  correctIndex: 1
  explanation: "Equilibration is the phase where the simulated system reaches stable temperature, pressure, and energy before production MD begins. Data collected during equilibration is typically discarded as it does not represent equilibrium behavior."
  difficulty: "intermediate"
  tags: ["molecular-dynamics", "equilibration", "simulation"]

---

---

id: quiz-bioinformatics-009
question: "In molecular docking, what is the difference between rigid and flexible docking?"
options:

- "Rigid docking uses crystal structures; flexible docking uses NMR structures"
- "Rigid docking keeps receptor fixed; flexible docking allows conformational changes in receptor and/or ligand"
- "Rigid docking is for small molecules; flexible docking is for peptides"
- "Rigid docking uses force fields; flexible docking uses quantum mechanics"
  correctIndex: 1
  explanation: "Rigid docking treats the receptor as a fixed structure and samples ligand orientations. Flexible docking (induced-fit) allows side-chain or backbone movements in the receptor, which is critical for peptides that often induce conformational changes."
  difficulty: "intermediate"
  tags: ["docking", "flexible-docking", "induced-fit"]

---

---

id: quiz-bioinformatics-010
question: "In QSAR analysis, what does the descriptor 'logP' represent?"
options:

- "The logarithm of the protein binding constant"
- "The logarithm of the partition coefficient between octanol and water"
- "The logarithm of the peptide's isoelectric point"
- "The logarithm of the peptide's molecular weight"
  correctIndex: 1
  explanation: "LogP (partition coefficient) measures lipophilicity by quantifying how a compound distributes between octanol (lipophilic) and water (hydrophilic) phases. It is a fundamental descriptor in QSAR for predicting membrane permeability and bioavailability."
  difficulty: "beginner"
  tags: ["QSAR", "logP", "descriptors", "lipophilicity"]

---

---

id: quiz-bioinformatics-011
question: "Which database is specifically designed for storing antimicrobial peptide sequences and their activities?"
options:

- "UniProt"
- "APD (Antimicrobial Peptide Database)"
- "PDB (Protein Data Bank)"
- "GenBank"
  correctIndex: 1
  explanation: "The APD (Antimicrobial Peptide Database) is a specialized resource containing experimentally validated antimicrobial peptides with sequence, structure, and activity data. UniProt and GenBank are general sequence databases; PDB stores 3D structures."
  difficulty: "beginner"
  tags: ["peptide-databases", "APD", "antimicrobial-peptides"]

---

---

id: quiz-bioinformatics-012
question: "Which machine learning algorithm is most commonly used as a baseline for peptide classification tasks?"
options:

- "K-means clustering"
- "Random Forest"
- "Principal Component Analysis"
- "Apriori algorithm"
  correctIndex: 1
  explanation: "Random Forest is widely used for peptide classification due to its robustness, ability to handle high-dimensional feature spaces, resistance to overfitting, and built-in feature importance ranking. It often serves as a strong baseline before deep learning approaches."
  difficulty: "intermediate"
  tags: ["machine-learning", "random-forest", "classification"]

---

---

id: quiz-bioinformatics-013
question: "What architecture does AlphaFold2 primarily use for protein structure prediction?"
options:

- "Convolutional Neural Network (CNN)"
- "Recurrent Neural Network (RNN)"
- "Transformer with attention mechanisms"
- "Generative Adversarial Network (GAN)"
  correctIndex: 2
  explanation: "AlphaFold2 uses a novel architecture based on Transformers with attention mechanisms, processing multiple sequence alignments and structural templates through an 'Evoformer' module that iteratively refines residue pair representations."
  difficulty: "advanced"
  tags: ["deep-learning", "AlphaFold", "transformer", "structure-prediction"]

---

---

id: quiz-bioinformatics-014
question: "What is the primary metric used to evaluate the accuracy of predicted protein structures by AlphaFold?"
options:

- "RMSD (Root Mean Square Deviation)"
- "TM-score"
- "GDT (Global Distance Test)"
- "pLDDT (predicted Local Distance Difference Test)"
  correctIndex: 3
  explanation: "pLDDT is AlphaFold's per-residue confidence score (0-100) estimating local structure accuracy. While RMSD, TM-score, and GDT are used for comparing predicted vs. experimental structures, pLDDT is the primary output metric for confidence assessment."
  difficulty: "intermediate"
  tags: ["AlphaFold", "pLDDT", "structure-evaluation"]

---

---

id: quiz-bioinformatics-015
question: "Which molecular visualization tool is most commonly used for publication-quality protein structure images and is open-source?"
options:

- "PyMOL"
- "ChimeraX"
- "VMD"
- "Jmol"
  correctIndex: 0
  explanation: "PyMOL is the most widely used tool for publication-quality molecular graphics, offering extensive rendering options and scripting capabilities. While ChimeraX, VMD, and Jmol are also capable, PyMOL remains the standard in structural biology publications."
  difficulty: "beginner"
  tags: ["visualization", "PyMOL", "structural-biology"]

---

---

id: quiz-bioinformatics-016
question: "Which tool or method is commonly used to predict peptide solubility in aqueous solutions?"
options:

- "Molecular dynamics simulation"
- "Peptide property calculators based on amino acid hydrophobicity scales"
- "X-ray crystallography"
- "NMR spectroscopy"
  correctIndex: 1
  explanation: "Peptide solubility is typically predicted using computational tools that sum hydrophobic contributions of individual residues based on established scales (e.g., Kyte-Doolittle). MD can also assess solubility but is computationally expensive for routine prediction."
  difficulty: "beginner"
  tags: ["peptide-properties", "solubility", "hydrophobicity"]

---

---

id: quiz-bioinformatics-017
question: "In ADMET prediction, what does the 'M' stand for?"
options:

- "Metabolism"
- "Membrane permeability"
- "Molecular weight"
- "Mutagenicity"
  correctIndex: 0
  explanation: "ADMET stands for Absorption, Distribution, Metabolism, Excretion, and Toxicity. Metabolism refers to the enzymatic modification of compounds in the body, primarily by cytochrome P450 enzymes in the liver, which affects drug half-life and efficacy."
  difficulty: "beginner"
  tags: ["ADMET", "drug-metabolism", "pharmacokinetics"]

---

---

id: quiz-bioinformatics-018
question: "Which scoring function type uses physics-based energy terms (van der Waals, electrostatics) to predict binding affinity?"
options:

- "Empirical scoring functions"
- "Knowledge-based scoring functions"
- "Force field-based scoring functions"
- "Machine learning scoring functions"
  correctIndex: 2
  explanation: "Force field-based scoring functions (e.g., CHARMM, AMBER) use physics-based energy terms including van der Waals, electrostatics, and bond energies. Empirical functions use weighted terms fitted to experimental data; knowledge-based functions derive potentials from known structures."
  difficulty: "advanced"
  tags: ["binding-affinity", "scoring-functions", "force-fields"]

---

---

id: quiz-bioinformatics-019
question: "Which method is commonly used for B-cell epitope prediction in peptide vaccine design?"
options:

- "Hydrophobicity analysis and surface accessibility prediction"
- "Codon optimization algorithms"
- "Phylogenetic tree construction"
- "Multiple sequence alignment"
  correctIndex: 0
  explanation: "B-cell epitopes are predicted by analyzing physicochemical properties including hydrophilicity, surface accessibility, flexibility, and beta-turn propensity. These properties identify regions likely to be exposed on the protein surface and recognized by antibodies."
  difficulty: "intermediate"
  tags: ["epitope-prediction", "B-cell", "vaccine-design"]

---

---

id: quiz-bioinformatics-020
question: "In computational peptide design, what is the primary advantage of using genetic algorithms?"
options:

- "They guarantee finding the global optimum"
- "They can efficiently search large sequence spaces by mimicking evolutionary selection"
- "They require no scoring function"
- "They only work for linear peptides"
  correctIndex: 1
  explanation: "Genetic algorithms explore sequence space by maintaining a population of candidate peptides, applying mutations and crossovers, and selecting for desired properties. They efficiently sample diverse solutions without exhaustive enumeration, though they don't guarantee global optima."
  difficulty: "advanced"
  tags: ["peptide-design", "genetic-algorithms", "optimization"]
