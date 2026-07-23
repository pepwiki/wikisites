---
date: 2026-06-11
author: "Wikipept Contributors"
id: quiz-recombinant-peptide-001
question: "What is the primary advantage of recombinant peptide production over chemical synthesis?"
options:
  - "Lower cost for all peptide lengths"
  - "Ability to produce peptides with post-translational modifications and complex folding"
  - "Faster production times"
  - "No need for purification"
correctIndex: 1
explanation: "Recombinant production allows cells to perform post-translational modifications (phosphorylation, glycosylation) and proper disulfide bond formation, which are difficult to achieve in chemical synthesis. This is particularly important for peptides requiring specific folding or modifications."
difficulty: "intermediate"
tags: ["recombinant-production", "post-translational-modifications", "expression-systems"]
---

---

id: quiz-ecoli-expression-001
question: "What is a major limitation of using E. coli for recombinant peptide production?"
options:

- "Slow growth rate"
- "Inability to perform eukaryotic post-translational modifications"
- "High cost of media"
- "Limited transformation efficiency"
  correctIndex: 1
  explanation: "E. coli lacks the machinery for eukaryotic post-translational modifications such as glycosylation, phosphorylation, and proper disulfide bond formation in the cytoplasm. This limits its use for peptides requiring these modifications for biological activity."
  difficulty: "beginner"
  tags: ["E-coli", "expression-systems", "limitations", "post-translational-modifications"]

---

---

id: quiz-yeast-expression-001
question: "Which yeast species is most commonly used as an expression system for recombinant peptides?"
options:

- "Saccharomyces cerevisiae"
- "Candida albicans"
- "Pichia pastoris"
- "Schizosaccharomyces pombe"
  correctIndex: 2
  explanation: "Pichia pastoris (now classified as Komagataella phaffii) is widely used for recombinant protein production due to its high-density fermentation capability, strong methanol-inducible promoter (AOX1), and ability to perform eukaryotic post-translational modifications."
  difficulty: "intermediate"
  tags: ["yeast", "Pichia-pastoris", "expression-systems", "eukaryotic"]

---

---

id: quiz-baculovirus-expression-001
question: "What type of cells are used in the baculovirus expression vector system (BEVS)?"
options:

- "Bacterial cells"
- "Insect cells"
- "Mammalian cells"
- "Plant cells"
  correctIndex: 1
  explanation: "The baculovirus expression system uses insect cells (commonly Sf9, Sf21, or High Five) infected with recombinant baculovirus (typically Autographa californica multiple nucleopolyhedrovirus). This system supports proper protein folding and some post-translational modifications."
  difficulty: "intermediate"
  tags: ["baculovirus", "insect-cells", "expression-systems", "BEVS"]

---

---

id: quiz-cell-free-synthesis-001
question: "What is the main advantage of cell-free peptide synthesis systems?"
options:

- "Lower cost than cell-based systems"
- "Ability to incorporate non-natural amino acids and produce toxic peptides"
- "Higher yields than all other methods"
- "No requirement for DNA template"
  correctIndex: 1
  explanation: "Cell-free synthesis systems can incorporate non-natural amino acids, produce toxic peptides that would kill host cells, and rapidly express proteins without the constraints of cell viability. They use cell extracts containing ribosomes and translation machinery."
  difficulty: "advanced"
  tags: ["cell-free-synthesis", "non-natural-amino-acids", "toxic-peptides", "in-vitro"]

---

---

id: quiz-phage-display-001
question: "In phage display technology, where is the peptide library displayed?"
options:

- "On the surface of bacteriophage particles"
- "Inside the bacterial host cell"
- "In the phage DNA only"
- "On the surface of mammalian cells"
  correctIndex: 0
  explanation: "Phage display involves fusing peptide sequences to coat proteins (typically pIII or pVIII) of bacteriophages, displaying them on the phage surface. This links genotype (DNA inside) to phenotype (peptide outside), enabling selection of binding peptides through biopanning."
  difficulty: "beginner"
  tags: ["phage-display", "bacteriophage", "library-screening", "biopanning"]

---

---

id: quiz-mrna-display-001
question: "What unique feature distinguishes mRNA display from other display technologies?"
options:

- "Uses DNA-protein fusions"
- "Creates mRNA-protein fusions through a puromycin linker"
- "Requires cell transformation"
- "Only works with short peptides"
  correctIndex: 1
  explanation: "mRNA display creates covalent mRNA-protein fusions using puromycin, which mimics aminoacyl-tRNA and gets incorporated into the ribosome during translation. This directly links the mRNA genotype to the translated peptide phenotype without requiring cells."
  difficulty: "advanced"
  tags: ["mRNA-display", "puromycin", "cell-free", "library-screening"]

---

---

id: quiz-ribosome-display-001
question: "In ribosome display, what stabilizes the mRNA-ribosome-peptide complex?"
options:

- "Chemical crosslinking"
- "Prevention of stop codon translation and low temperature"
- "Fusion to phage coat proteins"
- "Covalent bond between mRNA and peptide"
  correctIndex: 1
  explanation: "Ribosome display stabilizes the ternary complex by using mRNA lacking a stop codon, preventing ribosome release. Low temperature and magnesium ions maintain complex stability. This allows selection of peptides from libraries without cell transformation."
  difficulty: "advanced"
  tags: ["ribosome-display", "cell-free", "translation-stalling", "library-screening"]

---

---

id: quiz-yeast-two-hybrid-001
question: "What does the yeast two-hybrid system detect?"
options:

- "Protein-DNA interactions"
- "Protein-protein interactions"
- "Protein-lipid interactions"
- "Protein-carbohydrate interactions"
  correctIndex: 1
  explanation: "The yeast two-hybrid system detects protein-protein interactions by reconstituting a transcription factor when two proteins (bait and prey) interact. This brings together the DNA-binding domain and activation domain, activating reporter gene expression."
  difficulty: "intermediate"
  tags: ["yeast-two-hybrid", "protein-interactions", "transcription-activation", "screening"]

---

---

id: quiz-crispr-library-001
question: "How is CRISPR-Cas9 used in peptide library construction?"
options:

- "To synthesize peptides directly"
- "To introduce targeted mutations or edits creating variant libraries"
- "To purify peptides from cell lysates"
- "To sequence peptide libraries"
  correctIndex: 1
  explanation: "CRISPR-Cas9 enables construction of peptide variant libraries by introducing targeted mutations, insertions, or deletions at specific genomic locations. This allows creation of diverse peptide variants in cells for functional screening and selection."
  difficulty: "advanced"
  tags: ["CRISPR", "Cas9", "library-construction", "genome-editing", "mutagenesis"]

---

---

id: quiz-directed-evolution-001
question: "What is the key principle behind directed evolution of peptides?"
options:

- "Rational design based on known structures"
- "Iterative cycles of diversification, selection, and amplification"
- "Computer-aided molecular modeling"
- "Chemical modification of existing peptides"
  correctIndex: 1
  explanation: "Directed evolution mimics natural selection by iteratively generating diverse variants (through mutagenesis or recombination), selecting variants with desired properties, and amplifying winners. This enables optimization of peptide function without requiring detailed structural knowledge."
  difficulty: "intermediate"
  tags: ["directed-evolution", "selection", "diversification", "optimization"]

---

---

id: quiz-rational-design-001
question: "What is a prerequisite for rational design of peptides?"
options:

- "Large random peptide libraries"
- "Knowledge of structure-function relationships"
- "Cell-free expression systems"
- "Phage display technology"
  correctIndex: 1
  explanation: "Rational design requires understanding of structure-function relationships, including knowledge of the target structure, binding interfaces, and how sequence changes affect properties. This contrasts with directed evolution, which does not require such prior knowledge."
  difficulty: "beginner"
  tags: ["rational-design", "structure-function", "computational", "knowledge-based"]

---

---

id: quiz-ml-peptide-design-001
question: "What role does machine learning play in modern peptide design?"
options:

- "It replaces all experimental work"
- "It predicts peptide properties and generates novel sequences for experimental testing"
- "It only analyzes existing data without predictions"
- "It is limited to peptide purification optimization"
  correctIndex: 1
  explanation: "Machine learning models predict peptide properties (binding affinity, stability, toxicity) and generate novel sequences with desired characteristics. This accelerates the design cycle by reducing the experimental search space and identifying promising candidates."
  difficulty: "intermediate"
  tags: ["machine-learning", "AI", "peptide-design", "prediction", "generative-models"]

---

---

id: quiz-hts-001
question: "What is the primary goal of high-throughput screening in peptide discovery?"
options:

- "To produce large quantities of a single peptide"
- "To rapidly test thousands to millions of peptide variants for desired activity"
- "To purify peptides from complex mixtures"
- "To determine peptide structures"
  correctIndex: 1
  explanation: "High-throughput screening (HTS) enables rapid testing of vast numbers of peptide variants using automated platforms, miniaturized assays, and robotics. This accelerates identification of active peptides from large libraries by orders of magnitude compared to manual screening."
  difficulty: "beginner"
  tags: ["high-throughput-screening", "automation", "library-screening", "drug-discovery"]

---

---

id: quiz-combinatorial-chemistry-001
question: "What does combinatorial chemistry enable in peptide research?"
options:

- "Synthesis of single peptides with high purity"
- "Generation of diverse peptide libraries through systematic combination of building blocks"
- "Purification of natural peptides"
- "Analysis of peptide-protein interactions"
  correctIndex: 1
  explanation: "Combinatorial chemistry generates diverse peptide libraries by systematically combining amino acids or other building blocks. Methods include split-and-mix synthesis, parallel synthesis, and positional scanning, enabling rapid exploration of sequence space."
  difficulty: "intermediate"
  tags: ["combinatorial-chemistry", "library-synthesis", "split-and-mix", "diversity"]

---

---

id: quiz-peptide-arrays-001
question: "What information can peptide arrays (peptide chips) provide?"
options:

- "Only peptide mass information"
- "Mapping of protein-protein interactions, antibody epitopes, and enzyme substrates"
- "Complete protein structures"
- "Gene expression levels"
  correctIndex: 1
  explanation: "Peptide arrays consist of spatially addressable peptides immobilized on a solid surface, enabling parallel analysis of binding interactions, enzyme activity, and epitope mapping. They provide high-throughput data on peptide interactions with proteins, antibodies, or other molecules."
  difficulty: "intermediate"
  tags: ["peptide-arrays", "epitope-mapping", "high-throughput", "binding-assays"]

---

---

id: quiz-peptide-microarrays-001
question: "How do peptide microarrays differ from traditional ELISA-based screening?"
options:

- "They cannot detect binding events"
- "They enable massively parallel analysis of thousands of peptides simultaneously"
- "They require larger sample volumes"
- "They only work with fluorescent labels"
  correctIndex: 1
  explanation: "Peptide microarrays enable massively parallel analysis, testing thousands of peptide interactions simultaneously on a single chip. This contrasts with ELISA, which typically tests one analyte at a time. Microarrays require smaller samples and provide higher throughput."
  difficulty: "intermediate"
  tags: ["peptide-microarrays", "parallel-analysis", "high-throughput", "diagnostics"]

---

---

id: quiz-lab-on-chip-001
question: "What is the key advantage of lab-on-a-chip technology for peptide analysis?"
options:

- "Higher cost than conventional methods"
- "Integration of multiple analytical steps on a miniaturized platform with minimal sample"
- "Requirement for large sample volumes"
- "Slower analysis times"
  correctIndex: 1
  explanation: "Lab-on-a-chip integrates sample preparation, separation, and detection on a miniaturized platform, requiring minimal sample volumes (nanoliters to picoliters). This enables rapid, portable, and cost-effective peptide analysis with reduced reagent consumption."
  difficulty: "intermediate"
  tags: ["lab-on-a-chip", "microfluidics", "miniaturization", "point-of-care"]

---

---

id: quiz-biosensors-001
question: "How are peptides used in biosensor applications?"
options:

- "As the instrument hardware"
- "As recognition elements that selectively bind targets and generate measurable signals"
- "As the power source"
- "As data storage media"
  correctIndex: 1
  explanation: "Peptides serve as biorecognition elements in biosensors, selectively binding targets (proteins, metal ions, pathogens) and triggering signal transduction. Their specificity, stability, and ease of synthesis make them ideal for developing sensitive and selective biosensors."
  difficulty: "beginner"
  tags: ["biosensors", "biorecognition", "signal-transduction", "diagnostics"]

---

---

id: quiz-poc-diagnostics-001
question: "Why are peptides valuable for point-of-care diagnostic devices?"
options:

- "They are the cheapest molecules available"
- "They offer specificity, stability, and can be integrated into portable detection formats"
- "They only work in laboratory settings"
- "They require complex instrumentation"
  correctIndex: 1
  explanation: "Peptides provide high specificity for targets, can be synthesized reproducibly, and are more stable than antibodies. These properties enable integration into lateral flow assays, electrochemical sensors, and other portable formats suitable for point-of-care diagnostics."
  difficulty: "intermediate"
  tags: ["point-of-care", "diagnostics", "lateral-flow", "biosensors", "portable"]

---
