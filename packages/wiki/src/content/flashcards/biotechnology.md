---
id: fc-recombinant-expression
front: "What is recombininant peptide expression?"
back: "A biotechnology approach where a gene encoding a peptide of interest is inserted into a host organism using recombinant DNA technology. The host cell then produces the peptide using its own transcription and translation machinery. Common hosts include E. coli, yeast, insect cells, and mammalian cells."
tags: ["biotechnology", "recombinant", "expression", "overview"]
difficulty: "beginner"
---

---

id: fc-e-coli-expression
front: "What are the advantages and limitations of E. coli for peptide expression?"
back: "Advantages: fast growth (20 min doubling), high yields (g/L), inexpensive media, well-characterized genetics, extensive molecular tools available. Limitations: no post-translational modifications (glycosylation, phosphorylation), inclusion body formation, endotoxin contamination, difficulty expressing disulfide-rich peptides, codon bias issues for eukaryotic genes."
tags: ["biotechnology", "expression", "E-coli", "prokaryotic"]
difficulty: "intermediate"

---

---

id: fc-yeast-expression
front: "Why is yeast used as an expression host for peptides?"
back: "Combines prokaryotic simplicity with eukaryotic features: performs glycosylation, disulfide bond formation, and protein secretion. Saccharomyces cerevisiae and Pichia pastoris are commonly used. Pichia offers high-density fermentation and methanol-inducible AOX1 promoter. GRAS (Generally Recognized As Safe) status enables pharmaceutical production."
tags: ["biotechnology", "expression", "yeast", "Pichia", "eukaryotic"]
difficulty: "intermediate"

---

---

id: fc-baculovirus-system
front: "What is the baculovirus expression vector system (BEVS)?"
back: "Uses baculoviruses (typically Autographa californica multiple nucleopolyhedrovirus, AcMNPV) to infect insect cells (Sf9, Sf21, Hi5). The polyhedrin promoter drives extremely high expression. Supports complex post-translational modifications. Used for vaccine production (e.g., Cervarix HPV vaccine) and protein complexes."
tags: ["biotechnology", "expression", "baculovirus", "insect-cells"]
difficulty: "advanced"

---

---

id: fc-cell-free-synthesis
front: "What is cell-free peptide synthesis?"
back: "In vitro transcription-translation systems using cellular extracts (E. coli, wheat germ, rabbit reticulocyte) without living cells. Advantages: rapid (hours), toxic protein production, incorporation of non-natural amino acids, open reaction environment for optimization. Limitations: lower yields than cell-based, expensive reagents, limited scalability."
tags: ["biotechnology", "expression", "cell-free", "in-vitro"]
difficulty: "advanced"

---

---

id: fc-phage-display
front: "What is phage display for peptide discovery?"
back: "A technique where peptide libraries are fused to bacteriophage coat proteins (pIII or pVIII). Each phage displays a unique peptide on its surface while encoding the corresponding DNA inside. Biopanning selects binders through cycles of binding, washing, elution, and amplification. Libraries can contain 10^9-10^10 variants."
tags: ["biotechnology", "phage-display", "screening", "library"]
difficulty: "intermediate"

---

---

id: fc-mrna-display
front: "How does mRNA display work for peptide selection?"
back: "Peptides are covalently linked to their encoding mRNA via puromycin (attached to 3' end of mRNA). After translation, the ribosome stalls at puromycin, forming an mRNA-peptide fusion. Selection is performed on immobilized targets. Advantages: larger libraries than phage display (10^13), no cell transformation step, fully in vitro."
tags: ["biotechnology", "mRNA-display", "screening", "library"]
difficulty: "advanced"

---

---

id: fc-ribosome-display
front: "What is ribosome display?"
back: "An entirely in vitro selection method where mRNA-ribosome-peptide ternary complexes are stabilized by removing stop codons and using magnesium. The nascent peptide remains associated with the mRNA through the ribosome. Complexes are selected on immobilized targets, then RT-PCR amplified. Libraries up to 10^14 variants."
tags: ["biotechnology", "ribosome-display", "screening", "library"]
difficulty: "advanced"

---

---

id: fc-yeast-two-hybrid
front: "What is the yeast two-hybrid (Y2H) system?"
back: "Detects protein-protein interactions by reconstituting a transcription factor from two fusion proteins: bait (protein X fused to DNA-binding domain) and prey (protein Y fused to activation domain). Interaction brings domains together, activating reporter genes (HIS3, LacZ). Used for screening peptide-protein interactions and mapping binding interfaces."
tags: ["biotechnology", "yeast-two-hybrid", "protein-interactions", "screening"]
difficulty: "intermediate"

---

---

id: fc-crispr-libraries
front: "How are CRISPR libraries used in peptide research?"
back: "Genome-wide CRISPR knockout/activation libraries enable systematic screening of genes affecting peptide target pathways. sgRNA libraries target all genes (~20,000). Used to identify resistance mechanisms, synthetic lethal interactions, and drug targets. Combined with peptide therapeutics to find sensitivity determinants and combination strategies."
tags: ["biotechnology", "CRISPR", "libraries", "functional-genomics"]
difficulty: "advanced"

---

---

id: fc-directed-evolution
front: "What is directed evolution of peptides?"
back: "Iterative cycles of diversification (random mutagenesis, recombination, saturation mutagenesis) and selection/screening to improve peptide properties. Mimics natural evolution in accelerated timeframe. Key methods: error-prone PCR, DNA shuffling, site-saturation mutagenesis. Used to optimize affinity, stability, specificity, and expression level."
tags: ["biotechnology", "directed-evolution", "optimization", "mutagenesis"]
difficulty: "intermediate"

---

---

id: fc-rational-design
front: "What is rational design in peptide engineering?"
back: "Structure-guided modification of peptides using known structural and functional data. Requires understanding of structure-activity relationships (SAR). Approaches: computational modeling, alanine scanning, conservative substitutions, grafting epitopes onto scaffolds. More predictable than directed evolution but requires structural knowledge."
tags: ["biotechnology", "rational-design", "engineering", "SAR"]
difficulty: "intermediate"

---

---

id: fc-machine-learning
front: "How is machine learning applied to peptide design?"
back: "ML models predict peptide properties (binding affinity, stability, toxicity, aggregation) from sequence data. Deep learning architectures (CNNs, RNNs, transformers) trained on experimental datasets. Generative models (VAEs, GANs) design novel peptides. Tools include AlphaFold for structure prediction and RFdiffusion for de novo design."
tags: ["biotechnology", "machine-learning", "AI", "design", "prediction"]
difficulty: "advanced"

---

---

id: fc-high-throughput-screening
front: "What is high-throughput screening (HTS) for peptides?"
back: "Automated screening of large compound/synthetic libraries (10^3-10^6) against biological targets. Uses microplate formats (96-1536 wells), liquid handling robots, and plate readers. FRET, fluorescence polarization, AlphaScreen, and luminescence assays common. Miniaturization reduces reagent costs and increases throughput."
tags: ["biotechnology", "HTS", "screening", "automation"]
difficulty: "intermediate"

---

---

id: fc-combinatorial-chemistry
front: "What is combinatorial chemistry for peptide libraries?"
back: "Systematic synthesis of all possible combinations of building blocks to create large libraries. Split-and-mix synthesis generates millions of beads each displaying a unique sequence. Positional scanning identifies optimal residues at each position. Enables rapid SAR exploration without individual synthesis of each peptide."
tags: ["biotechnology", "combinatorial-chemistry", "libraries", "split-and-mix"]
difficulty: "intermediate"

---

---

id: fc-peptide-arrays
front: "What are peptide arrays and how are they used?"
back: "Spatially addressable libraries of peptides immobilized on solid supports (glass slides, membranes, chips). SPOT synthesis or photolithographic methods generate arrays. Used for epitope mapping, enzyme substrate profiling, receptor-ligand interactions, and antibody characterization. Can screen thousands of peptides simultaneously."
tags: ["biotechnology", "peptide-arrays", "SPOT", "screening"]
difficulty: "intermediate"

---

---

id: fc-microarrays
front: "How do peptide microarrays differ from protein microarrays?"
back: "Peptide microarrays display short synthetic peptides (typically 5-20 residues) while protein microarrays contain full-length proteins. Peptide arrays enable fine epitope mapping, substitution analysis, and modification scanning. Higher density possible (100,000+ spots/slide). Peptides are chemically synthesized, ensuring consistency and enabling non-natural modifications."
tags: ["biotechnology", "microarrays", "epitope-mapping", "diagnostics"]
difficulty: "intermediate"

---

---

id: fc-lab-on-a-chip
front: "What is lab-on-a-chip technology for peptide analysis?"
back: "Miniaturized devices integrating multiple laboratory functions (sample preparation, separation, detection) on a single chip (typically PDMS or glass). Microfluidic channels enable precise fluid control. Applications: peptide synthesis, enzymatic assays, cell-based screening, and point-of-care diagnostics. Reduces sample/reagent consumption 100-1000x."
tags: ["biotechnology", "lab-on-chip", "microfluidics", "miniaturization"]
difficulty: "advanced"

---

---

id: fc-biosensors
front: "What are peptide-based biosensors?"
back: "Analytical devices combining a peptide recognition element with a signal transducer. Peptides serve as biorecognition layers (receptors, substrates, aptamers). Transduction methods: optical, electrochemical, piezoelectric, thermal. Applications: disease biomarkers, environmental monitoring, food safety. Advantages: stability, ease of synthesis, tunable specificity."
tags: ["biotechnology", "biosensors", "detection", "diagnostics"]
difficulty: "intermediate"

---

---

id: fc-point-of-care
front: "What is point-of-care (POC) testing with peptide sensors?"
back: "Diagnostic testing performed at or near the patient site rather than in a central laboratory. Peptide-based POC devices provide rapid results (minutes). Examples: lateral flow assays, paper-based sensors, handheld electrochemical devices. Critical for infectious disease diagnosis, therapeutic monitoring, and resource-limited settings."
tags: ["biotechnology", "point-of-care", "diagnostics", "rapid-testing"]
difficulty: "intermediate"

---

---

id: fc-immunoassays
front: "How are peptides used in immunoassays?"
back: "Peptides serve as antigens, competitors, or capture molecules. Synthetic peptide antigens replace whole proteins for antibody detection (epitope-specific). Competitive immunoassays use labeled peptide competitors. Peptide-based immunoassays offer defined specificity, batch consistency, and lower cost than recombinant protein antigens."
tags: ["biotechnology", "immunoassays", "antigens", "detection"]
difficulty: "intermediate"

---

---

id: fc-lateral-flow-assays
front: "What role do peptides play in lateral flow assays?"
back: "Lateral flow assays (LFAs) use peptide antigens on test lines to capture target analytes from flowing samples. Peptides replace protein antigens for improved stability and specificity. Gold nanoparticle conjugates provide visual readout. Applications: COVID-19 rapid tests, pregnancy tests, drug screening. Results in 5-15 minutes."
tags: ["biotechnology", "lateral-flow", "rapid-tests", "diagnostics"]
difficulty: "beginner"

---

---

id: fc-elisa
front: "How are peptides used in ELISA?"
back: "Enzyme-Linked Immunosorbent Assay uses peptides as coating antigens (direct ELISA), competitors (competitive ELISA), or detection reagents. Peptide-coated plates capture specific antibodies from patient sera. HRP or AP conjugates generate colorimetric signal. More specific than whole-protein ELISA for distinguishing cross-reactive antibodies."
tags: ["biotechnology", "ELISA", "immunoassay", "quantification"]
difficulty: "intermediate"

---

---

id: fc-spr-biosensors
front: "What is SPR and how are peptide interactions measured?"
back: "Surface Plasmon Resonance (SPR) detects real-time binding events on a gold sensor surface. Peptides are immobilized; analytes flow over the surface. Binding causes refractive index changes detected as resonance angle shifts. Provides kon, koff, and KD values without labels. Biacore is the most common SPR platform."
tags: ["biotechnology", "SPR", "biosensors", "kinetics", "binding"]
difficulty: "advanced"

---

---

id: fc-electrochemical-sensors
front: "How do peptide-based electrochemical sensors work?"
back: "Peptides immobilized on electrode surfaces (gold, carbon, ITO) undergo conformational changes or binding events that alter electrical properties. Detection via amperometry, voltammetry, impedance spectroscopy, or potentiometry. Advantages: high sensitivity, miniaturization, low cost, real-time monitoring. Applications: heavy metal detection, cancer biomarkers."
tags: ["biotechnology", "electrochemical", "sensors", "detection"]
difficulty: "advanced"

---

---

id: fc-fluorescent-sensors
front: "What are peptide-based fluorescent sensors?"
back: "Peptides labeled with fluorophores or containing intrinsic fluorescent residues (Trp) that change emission upon target binding. FRET-based sensors use donor-acceptor pairs to detect conformational changes. Turn-on/turn-off sensors modulate fluorescence intensity. Applications: ion detection (Ca2+, Zn2+), enzyme activity, membrane penetration studies."
tags: ["biotechnology", "fluorescent", "sensors", "FRET", "imaging"]
difficulty: "intermediate"

---

---

id: fc-quantum-dot-sensors
front: "How are quantum dots used with peptide sensors?"
back: "Semiconductor nanocrystals (CdSe/ZnS, InP/ZnS) conjugated to peptides for multiplexed detection. Advantages: size-tunable emission, narrow bandwidth, high photostability, large Stokes shift. Peptide-QD conjugates enable simultaneous detection of multiple biomarkers. Used in imaging, flow cytometry, and diagnostic assays. Limitations: potential toxicity of heavy metals."
tags: ["biotechnology", "quantum-dots", "nanotechnology", "multiplexing"]
difficulty: "advanced"

---

---

id: fc-nanoparticle-sensors
front: "What nanoparticle types are used in peptide sensors?"
back: "Gold nanoparticles (colorimetric, SERS), magnetic nanoparticles (separation, MRI contrast), silica nanoparticles (fluorescence, drug delivery), polymeric nanoparticles (controlled release). Peptide-functionalized nanoparticles enable targeted detection, enhanced signal amplification, and multimodal sensing. Gold NPs change color (red to blue) upon aggregation with target."
tags: ["biotechnology", "nanoparticles", "gold-NPs", "SERS", "sensing"]
difficulty: "advanced"

---

---

id: fc-wearable-sensors
front: "What are peptide-based wearable sensors?"
back: "Flexible devices incorporating peptide recognition elements for continuous monitoring of biomarkers in sweat, saliva, or interstitial fluid. Integrated with wireless communication for real-time data transmission. Applications: glucose monitoring (enzyme-based), cortisol detection, drug levels. Challenges: biofouling, stability, sample matrix variability."
tags: ["biotechnology", "wearable", "continuous-monitoring", "sweat"]
difficulty: "advanced"

---

---

id: fc-implantable-sensors
front: "What are peptide-based implantable sensors?"
back: "Devices placed within the body for continuous biomarker monitoring. Peptide biorecognition layers detect analytes in blood or tissue fluid. Applications: glucose monitoring for diabetes, neurotransmitter detection, cancer biomarker tracking. Major challenges: biocompatibility, biofouling, foreign body response, long-term stability, calibration drift, and power supply."
tags: ["biotechnology", "implantable", "in-vivo", "continuous-monitoring"]
difficulty: "advanced"

---
