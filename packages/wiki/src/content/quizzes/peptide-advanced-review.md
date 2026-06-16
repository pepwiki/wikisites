---
id: quiz-peptide-advanced-review-001
question: "Which computational approach is used to design peptides that adopt a specific secondary structure upon binding to a target protein?"
options:
  - "Molecular dynamics simulation with enhanced sampling"
  - "De novo protein design using Rosetta or AlphaFold-based pipelines"
  - "Simple BLAST sequence alignment"
  - "SDS-PAGE molecular weight estimation"
correctIndex: 1
explanation: "De novo design tools like Rosetta and AlphaFold-based pipelines can model peptide backbone conformations and side-chain packing to generate peptides that fold into desired structures upon target engagement. MD simulations refine existing designs but do not generate novel sequences."
difficulty: "advanced"
tags: ["drug-design", "computational-design", "de-novo", "AlphaFold"]
---

---

id: quiz-peptide-advanced-review-002
question: "Stapled peptides achieve improved cell permeability primarily through what mechanism?"
options:
  - "Covalent binding to serum albumin"
  - "Stabilized alpha-helical amphipathicity that promotes membrane interaction and endosomal escape"
  - "Formation of ion pairs with phospholipid head groups"
  - "Cholesterol conjugation for lipid raft targeting"
correctIndex: 1
explanation: "Hydrocarbon stapling locks peptides into an alpha-helical conformation, presenting hydrophobic residues on one face and hydrophilic residues on the other. This amphipathic character enables membrane interaction, endocytic uptake, and endosomal escape, improving intracellular bioavailability."
difficulty: "advanced"
tags: ["drug-design", "stapled-peptides", "cell-permeability", "amphipathicity"]
---

---

id: quiz-peptide-advanced-review-003
question: "What is the primary rationale for using bicyclic or tricyclic peptide scaffolds in drug design?"
options:
  - "To increase solubility in organic solvents for synthesis"
  - "To constrain multiple loops simultaneously, achieving high affinity and selectivity for challenging targets"
  - "To reduce molecular weight below 500 Da"
  - "To enable oral absorption via passive transcellular transport"
correctIndex: 1
explanation: "Multicyclic peptides constrain multiple loop regions simultaneously, pre-organizing the pharmacophore for tight binding. Platforms like Bicycle Therapeutics use chemical scaffolds to generate rigid, protease-resistant structures with antibody-like affinity in a small molecule-sized package."
difficulty: "advanced"
tags: ["drug-design", "bicyclic-peptides", "conformational-constraint", "scaffolds"]
---

---

id: quiz-peptide-advanced-review-004
question: "In peptide-toxin conjugate (PTC) design, the linker chemistry is critical because it must:"
options:
  - "Be completely stable in both plasma and intracellular compartments"
  - "Be stable in circulation but release the payload selectively inside target cells via enzymatic cleavage or pH-triggered hydrolysis"
  - "Prevent any interaction with the target receptor"
  - "Ensure renal clearance within 5 minutes of injection"
correctIndex: 1
explanation: "Linkers must resist degradation in plasma (half-life of hours) while releasing the cytotoxic payload after internalization into target cells. Cleavable linkers exploit intracellular conditions such as low pH (endosomes), reducing glutathione (cytosol), or lysosomal proteases (cathepsins)."
difficulty: "advanced"
tags: ["drug-design", "peptide-drug-conjugates", "linker-chemistry", "targeted-delivery"]
---

---

id: quiz-peptide-advanced-review-005
question: "Alanine scanning is used in peptide drug design to:"
options:
  - "Determine the peptide's molecular weight"
  - "Identify residues critical for target binding by systematically mutating each position to alanine"
  - "Increase peptide solubility"
  - "Convert L-amino acids to D-amino acids"
correctIndex: 1
explanation: "Alanine scanning replaces each residue with alanine one at a time. Positions where binding affinity drops significantly identify side chains essential for the pharmacophore. This guides truncation, substitution, and focused optimization of the peptide lead."
difficulty: "advanced"
tags: ["drug-design", "alanine-scanning", "SAR", "pharmacophore-mapping"]
---

---

id: quiz-peptide-advanced-review-006
question: "Which oral peptide delivery strategy uses permeation enhancers that transiently open tight junctions in the intestinal epithelium?"
options:
  - "Enteric coating with Eudragit L100"
  - "Co-administration with sodium caprate (C10) or salcaprozate sodium (SNAC)"
  - "Encapsulation in pH-sensitive hydrogels"
  - "PEGylation to increase hydrodynamic radius"
correctIndex: 1
explanation: "Permeation enhancers like sodium caprate and SNAC transiently open paracellular tight junctions or alter membrane fluidity, increasing peptide absorption. SNAC is used in oral semaglutide (Rybelsus) to enhance bioavailability in the stomach."
difficulty: "advanced"
tags: ["delivery", "oral-delivery", "permeation-enhancers", "SNAC"]
---

---

id: quiz-peptide-advanced-review-007
question: "For long-acting parenteral peptide delivery, what is the primary advantage of in situ forming implants (ISFIs) over pre-formed PLGA implants?"
options:
  - "ISFIs provide immediate bolus release"
  - "ISFIs are injected as a liquid that solidifies in situ, avoiding surgical implantation while providing sustained release over weeks to months"
  - "ISFIs eliminate all burst release"
  - "ISFIs are biodegraded within 24 hours"
correctIndex: 1
explanation: "ISFIs use a biodegradable polymer dissolved in a biocompatible solvent. Upon injection, the solvent diffuses into surrounding tissue and the polymer precipitates, forming a solid depot. This provides sustained release without surgical insertion."
difficulty: "advanced"
tags: ["delivery", "in-situ-forming-implant", "sustained-release", "parenteral"]
---

---

id: quiz-peptide-advanced-review-008
question: "Exosome-based peptide delivery offers a unique advantage over synthetic nanoparticles because exosomes:"
options:
  - "Can only deliver hydrophobic peptides"
  - "Naturally cross biological barriers including the blood-brain barrier and carry endogenous targeting ligands"
  - "Are always larger than 1 micrometer"
  - "Require UV activation for cargo release"
correctIndex: 1
explanation: "Exosomes are endogenous extracellular vesicles (30-150 nm) that naturally transport cargo between cells. They display surface proteins that facilitate receptor-mediated transcytosis across biological barriers. Engineered exosomes can carry peptide cargo with enhanced targeting and reduced immunogenicity compared to synthetic carriers."
difficulty: "advanced"
tags: ["delivery", "exosomes", "extracellular-vesicles", "blood-brain-barrier"]
---

---

id: quiz-peptide-advanced-review-009
question: "Achiral amino acids like glycine and sarcosine are incorporated into peptide delivery systems primarily to:"
options:
  - "Increase alpha-helical content"
  - "Reduce proteolytic susceptibility and modulate conformational flexibility for self-assembling peptide systems"
  - "Enhance receptor binding affinity"
  - "Add fluorescent properties to the peptide"
correctIndex: 1
explanation: "Glycine and sarcosine lack a chiral center and increase backbone flexibility. In self-assembling peptide systems, they modulate the balance between order and disorder. N-methylation (sarcosine) blocks protease recognition at backbone amides, improving stability."
difficulty: "advanced"
tags: ["delivery", "self-assembly", "achiral-amino-acids", "sarcosine"]
---

---

id: quiz-peptide-advanced-review-010
question: "Which delivery approach uses iontophoresis to enhance transdermal peptide flux?"
options:
  - "Passive diffusion through micropores"
  - "Application of a small electrical current to drive charged peptide molecules through the skin"
  - "Chemical permeation enhancement with dimethyl sulfoxide"
  - "Laser ablation of the stratum corneum"
correctIndex: 1
explanation: "Iontophoresis applies a low-level electrical current (typically <0.5 mA/cm2) that drives charged molecules through the skin via electrorepulsion and electroosmosis. It is particularly effective for peptides at physiological pH, where they carry a net charge."
difficulty: "advanced"
tags: ["delivery", "iontophoresis", "transdermal", "electrotransport"]
---

---

id: quiz-peptide-advanced-review-011
question: "Racemization of amino acid residues during peptide synthesis and storage is most problematic at which residue?"
options:
  - "Glycine, because it has no chiral center"
  - "Cysteine and histidine, due to activation of the alpha-proton by adjacent electron-withdrawing groups"
  - "Alanine, because of steric shielding"
  - "Proline, because of ring rigidity"
correctIndex: 1
explanation: "Cysteine and histidine have side chains that stabilize the carbanion intermediate formed during racemization. Cysteine thiol and histidine imidazole activate the alpha-proton, making these residues prone to epimerization during Fmoc-SPPS coupling and activation steps."
difficulty: "advanced"
tags: ["stability", "racemization", "cysteine", "histidine", "SPPS"]
---

---

id: quiz-peptide-advanced-review-012
question: "The Mannich reaction can cause unexpected modifications in peptides containing which residues?"
options:
  - "Leucine and valine"
  - "Tryptophan and histidine, which react with formaldehyde and amine nucleophiles"
  - "Serine and threonine"
  - "Aspartic acid and glutamic acid"
correctIndex: 1
explanation: "The Mannich reaction involves electrophilic addition of an iminium ion (from formaldehyde and an amine) to electron-rich aromatic systems. Trp and His side chains are susceptible, forming unexpected methylene bridges during storage in formaldehyde-containing environments or when trace formaldehyde is present."
difficulty: "advanced"
tags: ["stability", "Mannich-reaction", "tryptophan", "formaldehyde"]
---

---

id: quiz-peptide-advanced-review-013
question: "What is the primary purpose of forced degradation (stress testing) studies for peptide drug substances?"
options:
  - "To determine the maximum tolerated dose in patients"
  - "To identify degradation pathways and develop stability-indicating analytical methods"
  - "To establish the commercial shelf life directly"
  - "To validate the manufacturing process"
correctIndex: 1
explanation: "Forced degradation exposes peptides to exaggerated conditions (heat, light, acid, base, oxidation) to characterize degradation products and pathways. This knowledge is essential for developing stability-indicating analytical methods and understanding the molecule's inherent vulnerabilities."
difficulty: "advanced"
tags: ["stability", "forced-degradation", "stress-testing", "analytical-methods"]
---

---

id: quiz-peptide-advanced-review-014
question: "For peptide formulations stored at -20°C, freeze-thaw cycling can cause aggregation primarily through:"
options:
  - "Covalent disulfide bond rearrangement only"
  - "Ice-liquid interface formation, cryoconcentration, and pH shifts during freezing"
  - "Oxidation by dissolved oxygen"
  - "Photolytic degradation from freezer lighting"
correctIndex: 1
explanation: "Freezing creates ice-liquid interfaces that denature peptides, concentrates solutes (cryoconcentration) raising local peptide concentration to aggregation-prone levels, and can shift pH as buffer components crystallize differentially. These mechanical and chemical stresses synergize to promote aggregation."
difficulty: "advanced"
tags: ["stability", "freeze-thaw", "cryoconcentration", "aggregation"]
---

---

id: quiz-peptide-advanced-review-015
question: "Which excipient class is used to chelate trace metal ions and prevent metal-catalyzed oxidation in peptide formulations?"
options:
  - "Surfactants like polysorbate 20"
  - "Chelating agents like EDTA or DTPA"
  - "Bulking agents like mannitol"
  - "Tonicity agents like sodium chloride"
correctIndex: 1
explanation: "EDTA (ethylenediaminetetraacetic acid) and DTPA (diethylenetriaminepentaacetic acid) bind transition metal ions (Fe2+, Cu2+) that catalyze Fenton-type oxidation reactions. By sequestering these metals, chelators prevent generation of reactive oxygen species that attack Met, Trp, Cys, and His residues."
difficulty: "advanced"
tags: ["stability", "EDTA", "chelation", "metal-catalyzed-oxidation"]
---

---

id: quiz-peptide-advanced-review-016
question: "High-resolution mass spectrometry (HRMS) using Orbitrap or TOF analyzers offers what advantage over triple-quadrupole MS for peptide characterization?"
options:
  - "Lower instrument cost"
  - "Exact mass measurement (<5 ppm) enabling elemental composition determination and detection of unexpected modifications"
  - "Faster scan speed for routine bioanalysis"
  - "Better sensitivity for all analytes"
correctIndex: 1
explanation: "HRMS provides exact mass with sub-5 ppm accuracy, allowing determination of elemental composition and confident identification of post-translational modifications, degradants, and impurities. Triple-quad MRM offers superior sensitivity for targeted quantitation but lacks full-scan high-resolution capability."
difficulty: "advanced"
tags: ["analysis", "HRMS", "Orbitrap", "exact-mass"]
---

---

id: quiz-peptide-advanced-review-017
question: "Hydrogen-deuterium exchange mass spectrometry (HDX-MS) is used to study peptide:"
options:
  - "Molecular weight distribution"
  - "Higher-order structure and dynamics by measuring backbone amide exchange rates with solvent"
  - "Amino acid sequence by Edman degradation"
  - "Counterion composition"
correctIndex: 1
explanation: "HDX-MS measures the rate at which backbone amide hydrogens exchange with deuterium from solvent. Protected or structured regions exchange slowly, while exposed or flexible regions exchange rapidly. This provides residue-level information about protein folding, binding interfaces, and conformational changes."
difficulty: "advanced"
tags: ["analysis", "HDX-MS", "higher-order-structure", "conformation"]
---

---

id: quiz-peptide-advanced-review-018
question: "Capillary electrophoresis (CE) is advantageous for peptide analysis over HPLC when:"
options:
  - "Large sample volumes (>1 mL) must be injected"
  - "High-resolution separation of closely related charge variants or aggregates is required with minimal sample consumption"
  - "UV detection is the only available detector"
  - "The peptide is completely insoluble in aqueous buffers"
correctIndex: 1
explanation: "CE separates molecules based on charge-to-size ratio in a capillary under high voltage. It achieves exceptional resolution for charge variants (deamidation products, C-terminal variants) with nanoliter injection volumes. CE-SDS and CZE are compendial methods for peptide and protein characterization."
difficulty: "advanced"
tags: ["analysis", "capillary-electrophoresis", "charge-variants", "separation"]
---

---

id: quiz-peptide-advanced-review-019
question: "When validating an LC-MS/MS method for peptide bioanalysis in regulated studies, which parameter demonstrates that matrix components do not affect quantitation?"
options:
  - "Linearity"
  - "Matrix effect assessment using post-column infusion or matrix factor evaluation"
  - "Carryover assessment"
  - "Autosampler temperature stability"
correctIndex: 1
explanation: "Matrix effect evaluation determines whether endogenous matrix components (phospholipids, salts, proteins) cause ion suppression or enhancement in the MS source. Matrix factor (peak area in matrix / peak area in neat) should be consistent across lots, with IS-normalized matrix factor CV <15%."
difficulty: "advanced"
tags: ["analysis", "bioanalytical-validation", "matrix-effect", "LC-MS/MS"]
---

---

id: quiz-peptide-advanced-review-020
question: "Circular dichroism (CD) spectroscopy in the far-UV region (190-250 nm) is used to assess peptide:"
options:
  - "Primary sequence"
  - "Secondary structure content (alpha-helix, beta-sheet, random coil)"
  - "Molecular weight"
  - "Disulfide bond connectivity"
correctIndex: 1
explanation: "Far-UV CD measures the differential absorption of left and right circularly polarized light by the peptide backbone. Alpha-helices show characteristic double minima at 208 and 222 nm, beta-sheets show a single minimum near 218 nm, and random coil shows a minimum near 200 nm."
difficulty: "advanced"
tags: ["analysis", "circular-dichroism", "secondary-structure", "spectroscopy"]
---

---

id: quiz-peptide-advanced-review-021
question: "Under ICH Q6B, peptide drug substances require characterization of which quality attribute that is not typically required for small molecules?"
options:
  - "Residual solvents"
  - "Higher-order structure (quaternary structure, aggregation state)"
  - "Heavy metals"
  - "Particle size distribution"
correctIndex: 1
explanation: "ICH Q6B covers specifications for biotechnological/biological products, requiring characterization of higher-order structure including secondary, tertiary, and quaternary structure as well as aggregation profiles. While synthetic peptides are typically regulated as small molecules, recombinant peptides follow biologic guidelines."
difficulty: "advanced"
tags: ["regulation", "ICH-Q6B", "higher-order-structure", "biologics"]
---

---

id: quiz-peptide-advanced-review-022
question: "The FDA's Guidance for Industry on ANDAs for Certain Highly Purified Synthetic Peptide Drug Products refers to which reference listed drug?"
options:
  - "Liraglutide (Victoza)"
  - "Calcitonin salmon, with specific requirements for amino acid sequence identity and impurity profiling"
  - "Exenatide (Byetta)"
  - "Desmopressin (DDAVP)"
correctIndex: 1
explanation: "The FDA issued a specific guidance for ANDAs of highly purified synthetic peptides, using calcitonin salmon as the primary example. It establishes criteria for demonstrating sameness of amino acid sequence, disulfide bonding, and impurity profiles relative to the reference listed drug."
difficulty: "advanced"
tags: ["regulation", "FDA-guidance", "ANDA", "calcitonin", "generics"]
---

---

id: quiz-peptide-advanced-review-023
question: "ICH M7 guidelines for mutagenic impurities apply to peptide drug substances primarily for which type of impurity?"
options:
  - "Truncated peptide sequences"
  - "Genotoxic reagents used in synthesis such as alkylating agents, azides, or certain coupling reagents"
  - "Endotoxin contamination"
  - "Residual host cell proteins"
correctIndex: 1
explanation: "ICH M7 addresses mutagenic impurities that may be present as synthetic reagents, intermediates, or by-products. In peptide SPPS, this includes reagents like HBTU/HATU (potential mutagenic guanidinium by-products), azide reagents, and alkylating agents used for stapling or modification."
difficulty: "advanced"
tags: ["regulation", "ICH-M7", "mutagenic-impurities", "genotoxicity"]
---

---

id: quiz-peptide-advanced-review-024
question: "For peptide drug products, container closure integrity testing (CCIT) under USP <1207> is critical because:"
options:
  - "Peptides are always stored at room temperature"
  - "Parenteral peptide products are often sterile and moisture-sensitive; microbial ingress or moisture uptake can cause rapid degradation"
  - "Glass vials are always hermetically sealed"
  - "CCIT is only required for biologics"
correctIndex: 1
explanation: "USP <1207> provides guidance on container closure integrity testing to ensure sterile products remain free from microbial contamination. For moisture-sensitive lyophilized peptides, CCIT also verifies that the closure prevents moisture ingress that would accelerate degradation and compromise shelf life."
difficulty: "advanced"
tags: ["regulation", "CCIT", "USP-1207", "container-closure", "sterility"]
---

---

id: quiz-peptide-advanced-review-025
question: "The Hatch-Waxman Act's Paragraph IV certification for peptide ANDAs requires the generic applicant to:"
options:
  - "Prove superior efficacy over the innovator product"
  - "Demonstrate that the innovator's listed patents are invalid, not infringed, or unenforceable"
  - "Conduct a full Phase III clinical trial"
  - "Obtain a license from the reference product sponsor"
correctIndex: 1
explanation: "Paragraph IV certification asserts that the innovator's Orange Book patents are either invalid or will not be infringed by the generic product. This triggers a 30-month stay on FDA approval and may result in patent litigation. It is the standard pathway for challenging peptide drug patents."
difficulty: "advanced"
tags: ["regulation", "Hatch-Waxman", "Paragraph-IV", "patent-certification"]
---

---

id: quiz-peptide-advanced-review-026
question: "In adaptive clinical trial designs for peptide drugs, Bayesian dose-finding is preferred over traditional 3+3 designs because it:"
options:
  - "Requires fewer total patients in all cases"
  - "Uses accumulating data to update dose-toxicity and dose-efficacy estimates, identifying the optimal biological dose more efficiently"
  - "Eliminates the need for a data safety monitoring board"
  - "Guarantees statistical significance at the planned sample size"
correctIndex: 1
explanation: "Bayesian adaptive designs use prior distributions updated with incoming toxicity and efficacy data to make real-time dose assignment decisions. Compared to the rule-based 3+3 design, Bayesian methods allocate more patients to promising doses, estimate the maximum tolerated dose with greater precision, and can simultaneously characterize efficacy."
difficulty: "advanced"
tags: ["clinical-development", "adaptive-design", "Bayesian", "dose-finding"]
---

---

id: quiz-peptide-advanced-review-027
question: "Immunogenicity assessment of therapeutic peptides in clinical trials requires detection of anti-drug antibodies (ADAs) using a tiered approach consisting of:"
options:
  - "Single ELISA measurement at end of study"
  - "Screening assay (sensitivity), confirmatory assay (specificity), and neutralizing antibody assay (functional impact)"
  - "Western blot only"
  - "PCR-based detection of B-cell receptor rearrangements"
correctIndex: 1
explanation: "The tiered ADA testing approach per FDA/EMA guidance includes: (1) a screening assay to detect binding antibodies, (2) a confirmatory assay to demonstrate specificity through competitive inhibition, and (3) a neutralizing antibody assay to determine if ADAs block drug activity. This three-tier approach minimizes false positives and characterizes clinical impact."
difficulty: "advanced"
tags: ["clinical-development", "immunogenicity", "ADA", "anti-drug-antibodies"]
---

---

id: quiz-peptide-advanced-review-028
question: "For peptide drugs with narrow therapeutic indices, therapeutic drug monitoring (TDM) in clinical practice is implemented to:"
options:
  - "Reduce manufacturing costs"
  - "Maintain plasma concentrations within the efficacy-safety window by adjusting doses based on measured drug levels"
  - "Eliminate the need for pharmacokinetic studies"
  - "Replace the need for clinical trials"
correctIndex: 1
explanation: "TDM measures circulating drug concentrations to guide individual dose adjustments. For peptides with narrow therapeutic windows (e.g., certain peptide hormones, immunosuppressive peptides), TDM ensures concentrations remain above the minimum effective concentration and below the toxicity threshold."
difficulty: "advanced"
tags: ["clinical-development", "TDM", "therapeutic-drug-monitoring", "PK-guided-dosing"]
---

---

id: quiz-peptide-advanced-review-029
question: "Bridging studies are required during peptide clinical development when:"
options:
  - "The manufacturing site is changed between Phase II and Phase III"
  - "A new formulation, dosing regimen, or patient population is introduced that differs from prior studies, requiring PK or PD comparability data"
  - "The drug transitions from IV to oral administration"
  - "The sponsor changes the clinical research organization"
correctIndex: 1
explanation: "Bridging studies demonstrate PK/PD comparability when changes occur in formulation, patient population (e.g., pediatric vs. adult), or route of administration. They ensure that data from prior studies remain relevant and that the new condition does not alter safety or efficacy profiles."
difficulty: "advanced"
tags: ["clinical-development", "bridging-study", "PK-comparability", "formulation-change"]
---

---

id: quiz-peptide-advanced-review-030
question: "Real-world evidence (RWE) from post-marketing registries can support label expansions for peptide drugs by providing:"
options:
  - "Randomized controlled trial data from new Phase III studies"
  - "Observational data on effectiveness, safety, and dosing in broader patient populations not represented in pivotal trials"
  - "In vitro potency data from new cell-based assays"
  - "Manufacturing process validation data"
correctIndex: 1
explanation: "RWE collected from electronic health records, claims databases, and patient registries provides data on drug performance in real-world clinical practice. For peptide drugs, RWE can support supplemental NDAs (sNDAs) for new indications, expanded populations, or modified dosing regimens when randomized trials are impractical."
difficulty: "advanced"
tags: ["clinical-development", "real-world-evidence", "post-marketing", "label-expansion"]
---
