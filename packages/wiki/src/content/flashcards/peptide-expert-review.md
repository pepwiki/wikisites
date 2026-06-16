---
id: fc-synth-adv-hatu-hbtu
front: "What are the key differences between HATU and HBTU as coupling reagents in SPPS?"
back: "HATU (1-[Bis(dimethylamino)methylene]-1H-1,2,3-triazolo[4,5-b]pyridinium 3-oxide hexafluorophosphate) forms more reactive uronium species vs HBTU's guanidinium. HATU: faster coupling, less racemization, preferred for sterically hindered residues (Aib, N-methyl amino acids). HBTU: cheaper, adequate for standard couplings. Both generate HOBt esters in situ. HATU coupling efficiency >99.5% per cycle vs ~99% for HBTU."
tags: ["synthesis", "coupling-reagents", "SPPS"]
difficulty: "expert"
---

---

id: fc-synth-adv-deprotection-protocols
front: "Compare Fmoc vs Boc deprotection strategies and their impact on side reactions."
back: "Fmoc: 20% piperidine/DMF, base-mediated elimination of dibenzofulvene. Monitored at 301 nm. Side reactions: aspartimide formation (Asp-Gly sequences), diketopiperazine (Pro-X), premature deprotection of acid-labile groups. Boc: TFA/DCM (25-50%), generates tert-butyl cation scavenged by thioanisole. Side reactions: tryptophan alkylation, Met oxidation. Fmoc preferred for acid-sensitive modifications; Boc for aggregation-prone sequences."
tags: ["synthesis", "deprotection", "SPPS", "side-reactions"]
difficulty: "expert"
---

---

id: fc-synth-adv-cleavage-cocktails
front: "What are the standard cleavage cocktails for Fmoc-SPPS and when should each be used?"
back: "Standard: TFA/TIPS/H2O (95:2.5:2.5) for most peptides. TIPS and H2O act as carbocation scavengers. For Cys/Met/Trp: TFA/EDT/TIPS/H2O (92.5:2.5:2.5:2.5) - EDT scavenges Pbf and Trt cations that modify thiol/indole groups. For very acid-sensitive peptides: TFA/DCM mixtures or low-TFA protocols. Repeated cleavage (3x 10 min) improves yield for aggregation-prone sequences."
tags: ["synthesis", "cleavage", "TFA", "scavengers"]
difficulty: "expert"
---

---

id: fc-synth-adv-racemization
front: "What mechanisms cause racemization during peptide coupling and how is it prevented?"
back: "Racemization proceeds via oxazolone intermediate (from activated C-terminus) or direct alpha-proton abstraction. Favored by: strong base (DIPEA), elevated temperature, electron-withdrawing N-protecting groups, prolonged activation. Prevention: 1) Use HOBt/HOAt additives (stabilize active ester, reduce oxazolone formation), 2) minimize base equivalents, 3) couple at 0°C for sensitive residues (His, Cys, Phe), 4) use phosphonium reagents (PyBOP) over uronium for His."
tags: ["synthesis", "racemization", "oxazolone", "stereochemistry"]
difficulty: "expert"
---

---

id: fc-synth-adv-resin-selection
front: "How do you select the appropriate resin for SPPS based on peptide properties?"
back: "Rink amide MBHA: C-terminal amide peptides (most common). Wang resin: C-terminal acid. Sieber amide: acid-labile, for fragment condensation. Tentagel: PEG-grafted for hydrophobic/aggregating sequences. ChemMatrix: 100% PEG, excellent swelling in all solvents. Choice depends on: 1) C-terminal functionality, 2) peptide hydrophobicity, 3) required loading (0.1-0.8 mmol/g), 4) planned cleavage conditions."
tags: ["synthesis", "resins", "SPPS", "solid-support"]
difficulty: "expert"
---

---

id: fc-synth-adv-long-peptides
front: "What strategies are used for synthesizing peptides >50 amino acids?"
back: "Native chemical ligation (NCL): thioester + N-terminal Cys fragment coupling in aqueous conditions. Extended ligation: removable auxiliaries for non-Cys junctions. Alpha-ketoacid-hydroxylamine (KAHA) ligation. Microwave-assisted SPPS reduces aggregation. Pseudoprolines and Hmb backbones disrupt secondary structure during synthesis. Fragment condigation on resin. Combined strategies can produce proteins up to 150+ residues."
tags: ["synthesis", "native-chemical-ligation", "long-peptides", "fragment-condensation"]
difficulty: "expert"
---

---

id: fc-synth-adv-purification-rp-hplc
front: "What are the critical parameters for RP-HPLC purification of synthetic peptides?"
back: "Stationary phase: C18 (most peptides), C4 (hydrophobic/long peptides), C8 (intermediate). Mobile phase: water/acetonitrile + 0.1% TFA (ion-pairing). Gradient: typically 10-60% B over 30-60 min, optimized for target elution. Loading: 5-20 mg per run on analytical scale, up to 1g on preparative. Key parameters: column temperature (25-60°C affects selectivity), flow rate, particle size (5μm analytical, 10-15μm prep). Collect fractions by MS identification."
tags: ["synthesis", "purification", "RP-HPLC", "chromatography"]
difficulty: "expert"
---

---

id: fc-synth-adv-characterization-methods
front: "What analytical methods confirm identity and purity of synthetic peptides?"
back: "Identity: 1) ESI-MS or MALDI-TOF MS (exact mass ±0.1 Da), 2) amino acid analysis (composition), 3) Edman degradation or MS/MS sequencing (sequence), 4) NMR (structure). Purity: 1) RP-HPLC with UV detection (214/220 nm), 2) CE (capillary electrophoresis), 3) SDS-PAGE (large peptides). Quantitation: AAA, UV (Trp/Tyr extinction), BCA assay. For GMP: all methods validated per ICH Q2."
tags: ["synthesis", "characterization", "mass-spectrometry", "analytical"]
difficulty: "expert"
---

---

id: fc-synth-adv-disulfide-bond-formation
front: "What strategies are used for regioselective disulfide bond formation in peptides?"
back: "Single disulfide: air oxidation (dilute, pH 8, 0.1M NH4HCO3) or DMSO oxidation. Multiple disulfides: 1) Sequential: use orthogonal protecting groups (Acm for one pair, Trt for another), 2) Directed: use selenocysteine for diselenide-directed formation, 3) Fold-assisted: in vitro folding with redox buffer (GSH/GSSG). For complex cystine knots: stepwise deprotection/oxidation or use of removable thiol auxiliaries."
tags: ["synthesis", "disulfide-bonds", "cysteine", "oxidation"]
difficulty: "expert"
---

---

id: fc-synth-adv-pegylated-peptides
front: "How are PEGylated peptides synthesized and what challenges arise?"
back: "Site-specific PEGylation: 1) N-terminal conjugation (selective at acidic pH), 2) Cys-specific maleimide/thiol chemistry, 3) Lys-specific NHS esters. Challenges: 1) heterogeneous product from multiple Lys, 2) PEG steric hindrance reduces coupling efficiency, 3) PEG-peptide conjugates have altered chromatographic behavior (broad peaks), 4) characterization difficulty (broad MW distribution of PEG). Solutions: use monodispersed PEG (discrete MW) and site-directed mutagenesis to introduce unique Cys."
tags: ["synthesis", "PEGylation", "conjugation", "modification"]
difficulty: "expert"
---

---

id: fc-analysis-adv-ms-fragmentation
front: "What fragmentation patterns are observed in peptide CID-MS/MS and how are they interpreted?"
back: "Peptide backbone cleavage produces b-ions (N-terminal, acylium) and y-ions (C-terminal, protonated amine). a-ions = b-ions - CO (28 Da). Immonium ions identify specific amino acids. Neutral losses: H2O (18 Da, Ser/Thr/Asp/Glu), NH3 (17 Da, Arg/Lys/Asn/Gln). Proline directs cleavage N-terminal to Pro. CID favors y-ions in charge-directed fragmentation. ETD/ECD produces c/z-ions via radical mechanisms, better for phosphopeptides and large peptides."
tags: ["analysis", "mass-spectrometry", "fragmentation", "CID"]
difficulty: "expert"
---

---

id: fc-analysis-adv-nmr-techniques
front: "What NMR experiments are essential for peptide structure determination?"
back: "1D: 1H for purity/conformation assessment. 2D: 1) TOCSY (through-bond correlations within spin systems - identify amino acid types), 2) NOESY (through-space correlations <5Å - distance constraints for 3D structure), 3) HSQC (1H-15N correlations for labeled peptides, monitor binding), 4) HNCA/HNCO (backbone assignment for 3D structure). For dynamics: T1/T2 relaxation, relaxation dispersion (ps-μs timescale motions). Require ~0.5-1 mM peptide in H2O/D2O."
tags: ["analysis", "NMR", "structure", "2D-NMR"]
difficulty: "expert"
---

---

id: fc-analysis-adv-cd-interpretation
front: "How do you interpret CD spectra to determine peptide secondary structure?"
back: "Alpha-helix: negative bands at 208nm and 222nm, positive at 193nm. Beta-sheet: negative at 218nm, positive at 195nm. Random coil: negative at ~200nm, flat above 215nm. Quantitation: CONTIN, SELCON, CDSSTR algorithms deconvolute spectra using reference databases. Temperature melts: monitor [θ]222 vs temperature for helix-coil transition (Tm). Solvent effects: TFE promotes helix formation. pH/concentration dependence reveals aggregation. Lipid-bound peptides show enhanced helicity."
tags: ["analysis", "CD-spectroscopy", "secondary-structure", "circular-dichroism"]
difficulty: "expert"
---

---

id: fc-analysis-adv-crystallography
front: "What are the key steps in peptide crystallography and common challenges?"
back: "Steps: 1) Purify peptide to >95%, 2) crystallization screening (sparse-matrix, hanging/sitting drop), 3) optimize crystals (pH, precipitant, temperature, seeding), 4) cryoprotection (glycerol, ethylene glycol), 5) data collection (synchrotron preferred), 6) molecular replacement or SAD/MAD phasing, 7) refinement. Challenges: peptides often form poor crystals, disordered termini, twinning, radiation damage. Peptide-protein co-crystals can be obtained by soaking or co-crystallization."
tags: ["analysis", "crystallography", "X-ray", "structure"]
difficulty: "expert"
---

---

id: fc-analysis-adv-cryo-em
front: "How is cryo-EM applied to peptide structure analysis?"
back: "Cryo-EM images vitrified samples in near-native state. For peptides: 1) peptide-protein complexes (single particle analysis, resolution to 2-3Å), 2) amyloid fibrils (helical reconstruction), 3) membrane peptide interactions (tomography). Advantages: no crystallization needed, works with heterogeneous samples, can capture multiple conformational states. Limitations: peptides alone (<50 kDa) too small; need to be part of larger complex. Recent advances: microED for microcrystals of peptides."
tags: ["analysis", "cryo-EM", "structure", "electron-microscopy"]
difficulty: "expert"
---

---

id: fc-analysis-adv-hdx-ms
front: "What information does hydrogen-deuterium exchange mass spectrometry (HDX-MS) provide about peptides?"
back: "HDX-MS measures deuterium incorporation into backbone amides over time. Reveals: 1) solvent accessibility (fast exchange = exposed), 2) hydrogen bonding (slow exchange = structured), 3) protein-peptide binding interfaces (protection from exchange), 4) conformational dynamics. Workflow: label quench (pH 2.5, 0°C), pepsin digestion, LC-MS. Back-exchange correction needed. Time scales: seconds (local unfolding) to hours (global stability). Peptide mapping resolution typically 3-5 residues."
tags: ["analysis", "HDX-MS", "dynamics", "mass-spectrometry"]
difficulty: "expert"
---

---

id: fc-analysis-adv-itc-binding
front: "How does isothermal titration calorimetry (ITC) characterize peptide binding?"
back: "ITC directly measures heat released/absorbed during binding. Provides: Ka (association constant), ΔH (enthalpy), ΔS (entropy), n (stoichiometry) in single experiment. No labeling required. For peptides: typically inject peptide into protein solution. Detects binding from nM to mM Kd. Limitations: requires ~0.1-1 mM protein, heat signal must be significant. Reveals whether binding is enthalpy-driven (H-bonds, electrostatics) or entropy-driven (hydrophobic effect, conformational release)."
tags: ["analysis", "ITC", "binding", "thermodynamics"]
difficulty: "expert"
---

---

id: fc-analysis-adv-spr-kinetics
front: "What kinetics and affinity data does surface plasmon resonance (SPR) provide for peptides?"
back: "SPR measures real-time binding on sensor chips. Peptide immobilized (amine coupling, biotin-streptavidin) or injected over immobilized target. Returns: ka (on-rate), kd (off-rate), KD = kd/ka. Advantages: no label, real-time kinetics, low sample consumption. For peptides: KD from μM to pM. Challenges: mass transport limitations (fast kon), nonspecific binding, peptide immobilization may affect binding site. Reference subtraction and multi-cycle kinetics improve data quality."
tags: ["analysis", "SPR", "kinetics", "biosensor"]
difficulty: "expert"
---

---

id: fc-pharm-adv-pk-modeling
front: "What compartmental models are used for peptide pharmacokinetic modeling?"
back: "One-compartment: rapid distribution, single elimination phase (rare for peptides). Two-compartment: central (plasma) + peripheral (tissues), most common for IV peptides. Three-compartment: adds deep tissue compartment (depot formulations). Parameters: Vd, CL, t1/2, k12/k21 (distribution). Non-linear PK: target-mediated drug disposition (TMDD) model for peptides with high-affinity targets. Population PK (NONMEM) accounts for inter-individual variability. Allometric scaling predicts human PK from animal data."
tags: ["pharmacology", "PK-modeling", "compartmental", "pharmacokinetics"]
difficulty: "expert"
---

---

id: fc-pharm-adv-pd-modeling
front: "How are pharmacodynamic models applied to peptide therapeutics?"
back: "Emax model: E = Emax × C/(EC50 + C) for receptor occupancy. Indirect response models: peptide modulates production (kin) or dissipation (kout) of physiological response. Transit compartment models: delay between PK and PD (e.g., peptide hormone effects). PK/PD link models: effect compartment connects PK to delayed PD response. For peptides: receptor binding often saturable, leading to non-linear dose-response. Target-mediated models integrate receptor binding kinetics with downstream signaling."
tags: ["pharmacology", "PD-modeling", "PK-PD", "dose-response"]
difficulty: "expert"
---

---

id: fc-pharm-adv-dose-optimization
front: "What strategies optimize dosing regimens for peptide drugs?"
back: "Therapeutic window: balance efficacy (EC50-EC90) vs toxicity. For peptides: 1) flat PK profile preferred (constant infusion or depot), 2) loading dose for rapid target engagement, 3) maintenance dose based on CL and target trough. Bayesian dose adjustment using TDM. Population PK identifies covariates (weight, renal function, CYP status). Model-informed precision dosing (MIPD) for narrow TI peptides. Exposure-response analysis per FDA guidance. Consider circadian rhythm for hormone peptides."
tags: ["pharmacology", "dose-optimization", "precision-dosing", "therapeutic-index"]
difficulty: "expert"
---

---

id: fc-pharm-adv-drug-interactions
front: "What drug interactions are relevant for peptide therapeutics?"
back: "CYP-mediated: most peptides not CYP substrates, but some (e.g., cyclosporine) are CYP3A4 substrates/inhibitors. Protease-mediated: co-administered protease inhibitors may protect endogenous peptides. Receptor-level: peptides targeting same pathway (GLP-1 + insulin = hypoglycemia risk). Immunogenicity: anti-drug antibodies (ADA) can neutralize endogenous proteins (EPO antibodies → pure red cell aplasma). Transporter interactions: peptide transporters (PEPT1/2) competitive inhibition. Formulation excipients may inhibit CYP (e.g., Cremophor EL)."
tags: ["pharmacology", "drug-interactions", "CYP", "immunogenicity"]
difficulty: "expert"
---

---

id: fc-pharm-adv-monitoring-tdm
front: "When and how should therapeutic drug monitoring (TDM) be applied to peptide drugs?"
back: "TDM indicated for: 1) narrow therapeutic index peptides (cyclosporine, tacrolimus), 2) variable PK (high inter-individual variability), 3) immunosuppressants, 4) patients with organ dysfunction. Methods: LC-MS/MS (gold standard), immunoassays (faster but cross-reactivity with metabolites). Target concentrations: trough levels typically measured. Challenges: peptide instability in samples, matrix effects, need for validated assays. Bayesian approaches integrate prior PK model with TDM for individualized dosing."
tags: ["pharmacology", "TDM", "monitoring", "LC-MS"]
difficulty: "expert"
---

---

id: fc-pharm-adv-antibody-drug-conjugates
front: "How are peptide-drug conjugates (PDCs) designed and what are their advantages over ADCs?"
back: "PDCs: peptide targeting moiety + linker + cytotoxic payload. Advantages over ADCs: 1) better tumor penetration (smaller size, ~1-5 kDa vs ~150 kDa), 2) faster clearance reduces toxicity, 3) lower immunogenicity, 4) easier synthesis (chemical vs biological). Linkers: cleavable (cathepsin B-sensitive, pH-sensitive) or non-cleavable. Targets: GRPR (bombesin), integrin (RGD), PSMA. Challenges: rapid renal clearance (PEGylation helps), lower affinity than antibodies (multimerization helps)."
tags: ["pharmacology", "PDC", "conjugates", "targeted-therapy"]
difficulty: "expert"
---

---

id: fc-pharm-adv-tissue-distribution
front: "How is tissue distribution of peptides characterized and what factors influence it?"
back: "Methods: quantitative whole-body autoradiography (QWBA), MALDI imaging mass spectrometry, LC-MS/MS of tissue homogenates, PET imaging (radiolabeled peptides). Factors: 1) molecular weight (<500 Da passive diffusion, larger peptides receptor-mediated), 2) lipophilicity (LogP), 3) charge at physiological pH, 4) plasma protein binding, 5) receptor density in tissues. BBB penetration: most peptides excluded unless receptor-mediated transcytosis (transferrin receptor). Tumor EPR effect: passive accumulation in leaky vasculature."
tags: ["pharmacology", "tissue-distribution", "imaging", "biodistribution"]
difficulty: "expert"
---

---

id: fc-pharm-adv-clearance-mechanisms
front: "What are the major clearance mechanisms for peptide drugs?"
back: "1) Renal: glomerular filtration (MW cutoff ~60 kDa), tubular reabsorption and metabolism (peptides <5 kDa cleared rapidly). 2) Hepatic: Kupffer cell uptake, sinusoidal metabolism. 3) Proteolytic degradation: ubiquitous peptidases in plasma (NEP, ACE, DPP-IV) and tissues. 4) Receptor-mediated endocytosis: target-mediated clearance (saturable). 5) Reticuloendothelial system: uptake by macrophages (liposomal peptides). PEGylation, lipidation, and amino acid substitutions (D-amino acids, N-methylation) extend half-life."
tags: ["pharmacology", "clearance", "metabolism", "renal"]
difficulty: "expert"
---

---

id: fc-formul-adv-stability-testing
front: "What stability testing protocols are required for peptide pharmaceuticals per ICH guidelines?"
back: "ICH Q1A/Q1B: 1) Long-term: 25°C/60% RH (12 months minimum), 2) Accelerated: 40°C/75% RH (6 months), 3) Stress testing: thermal, photolytic, oxidative, pH extremes. For peptides: specific degradation pathways - deamidation (Asn), oxidation (Met, Trp, Cys), hydrolysis (Asp-Pro), aggregation, racemization. Forced degradation identifies degradation products, validates stability-indicating methods. In-use stability: reconstituted product at recommended storage. Photostability per ICH Q1B."
tags: ["formulation", "stability", "ICH", "degradation"]
difficulty: "expert"
---

---

id: fc-formul-adv-excipients
front: "What excipients are commonly used in peptide formulations and what are their functions?"
back: "Buffers: histidine (pH 5.5-6.5), acetate (pH 4-5), phosphate (pH 6-8) - maintain pH, prevent deamidation. Surfactants: polysorbate 80 (0.01-0.05%) prevents aggregation at interfaces. Tonicity: sucrose, trehalose, mannitol (lyoprotectants also). Stabilizers: methionine (antioxidant), EDTA (metal chelator preventing oxidation). Bulking agents: mannitol, glycine (lyophilization). Preservatives: m-cresol, phenol (multi-dose). Avoid: reducing sugars (Maillard reaction with Lys), high phosphate (phosphate-catalyzed deamidation)."
tags: ["formulation", "excipients", "stabilizers", "buffers"]
difficulty: "expert"
---

---

id: fc-formul-adv-lyophilization
front: "What are the critical process parameters for lyophilizing peptide formulations?"
back: "Freezing: controlled rate (0.5-1°C/min) to -40°C, annealing step improves crystal structure. Primary drying: shelf temperature -25 to -35°C, chamber pressure 50-100 mTorr, sublimation of ice. Secondary drying: shelf temperature +20 to +40°C, desorption of bound water. Critical parameters: collapse temperature (Tc), product temperature must stay below Tc during primary drying. Formulation: 5-10% sucrose/trehalose (1:1 to 1:4 peptide:sugar w/w). Cake appearance, reconstitution time, and moisture content (<3%) as quality attributes."
tags: ["formulation", "lyophilization", "freeze-drying", "stability"]
difficulty: "expert"
---

---

id: fc-formul-adv-reconstitution
front: "What factors affect reconstitution of lyophilized peptide products?"
back: "Key factors: 1) porosity of lyophilized cake (open channels facilitate wetting), 2) hydrophobicity of peptide (poorly soluble peptides need co-solvents), 3) excipient type (mannitol crystalline cakes reconstitute faster than amorphous sucrose), 4) pH of diluent (affects ionization and solubility), 5) volume of diluent. Agitation: gentle swirling, avoid vigorous shaking (foaming, aggregation). Reconstitution time target: <2 minutes for injectable products. Post-reconstitution stability: 2-24 hours at 2-8°C depending on formulation."
tags: ["formulation", "reconstitution", "lyophilization", "injectable"]
difficulty: "expert"
---

---

id: fc-formul-adv-storage-conditions
front: "What storage conditions are recommended for different peptide dosage forms?"
back: "Lyophilized: 2-8°C (preferred) or -20°C for long-term. Room temperature stability possible with optimized formulations. Liquid: 2-8°C mandatory for most peptides (proteolytic degradation at RT). Frozen solutions: -20°C to -80°C for concentrated stocks. Light-sensitive peptides: amber vials, protect from light. Humidity: desiccant for lyophilized, tight seal for liquid. Specific: insulin 2-8°C until punctured, then 28 days at RT. GLP-1 agonists vary: semaglutide 2-8°C, liraglutide 2-8°C or 30 days RT."
tags: ["formulation", "storage", "temperature", "stability"]
difficulty: "expert"
---

---

id: fc-formul-adv-self-injection-devices
front: "What design considerations are critical for peptide self-injection devices?"
back: "Prefilled syringes: siliconization (Baked-on vs sprayed), tungsten residues (can cause aggregation), needle gauge (29-31G for comfort). Autoinjectors: spring-loaded or electromechanical, dose accuracy ±5%, needle shield activation, viewing window. Pens: multi-dose cartridges, dose dialing, memory function. Key factors: injection force (<15N preferred), injection volume (<1mL SC), needle length (4-8mm for SC), break-loose and gliding force. Container closure integrity, extractables/leachables from elastomers."
tags: ["formulation", "devices", "autoinjector", "drug-delivery"]
difficulty: "expert"
---

---

id: fc-formul-adv-aggregation-control
front: "How is peptide aggregation controlled during formulation development?"
back: "Types: reversible (association) vs irreversible (fibrillation, amyloid). Mechanisms: nucleation-dependent, interface-mediated, concentration-dependent. Control strategies: 1) Surfactants (PS80, P188) compete at interfaces, 2) co-solutes (arginine, sucrose) preferentially excluded, 3) pH away from pI (reduce electrostatic attraction), 4) low concentration, 5) minimize agitation, 6) chelate metals (catalyze oxidation/aggregation). Characterization: SEC, DLS, MFI (micro-flow imaging), ThT assay (amyloid). Shelf life must remain monomeric per specifications."
tags: ["formulation", "aggregation", "surfactants", "stability"]
difficulty: "expert"
---

---

id: fc-formul-adv-container-closure
front: "What container closure systems are used for peptide injectables and what are key qualification tests?"
back: "Glass vials: Type I borosilicate (low extractables), delamination risk with high pH. Plastic: COP (cyclic olefin polymer) for prefillable syringes. Stoppers: bromobutyl or chlorobutyl elastomer, laminated with fluoropolymer to reduce interactions. Tests: 1) extractables/leachables (E&L), 2) container closure integrity (CCI) by high-voltage leak detection, 3) adsorption (peptide loss to surfaces), 4) particulate contamination, 5) silication level. Delamination: accelerated testing at 40°C/pH 8 detects glass flaking."
tags: ["formulation", "container-closure", "packaging", "extractables"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-ind-process
front: "What is the regulatory pathway for filing an IND for a peptide therapeutic?"
back: "Pre-IND meeting with FDA (Type B) recommended. IND sections: 1) Cover Sheet (Form 1571), 2) Introductory Statement and General Investigational Plan, 3) Investigator's Brochure, 4) CMC (Chemistry, Manufacturing, and Controls) - drug substance and product specs, 5) Pharmacology/Toxicology (in vitro, animal PK/PD, GLP tox studies), 6) Previous Human Experience (if any). 30-day safety review: FDA can place clinical hold. Annual reports required. IND becomes active if no clinical hold after 30 days."
tags: ["regulatory", "IND", "FDA", "clinical-trials"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-nda-bla
front: "What are the key differences between NDA and BLA submissions for peptide drugs?"
back: "NDA (New Drug Application): for small molecules and some peptides (<40 amino acids, chemically synthesized). BLA (Biologics License Application): for peptides >40 amino acids or produced by recombinant DNA. BLA under PHS Act Section 351, reviewed by CBER or CDER. Key differences: 1) BLA requires lot-by-lot potency testing, 2) BLA has 12-year exclusivity (vs 5 yr NDA), 3) BLA facility inspection requirements stricter, 4) BLA requires reference product for biosimilars. 505(b)(2) NDA pathway possible for peptides with known active moiety."
tags: ["regulatory", "NDA", "BLA", "biologics"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-gmp-manufacturing
front: "What are the GMP requirements specific to peptide drug substance manufacturing?"
back: "ICH Q7 (API GMP): validated processes, qualified equipment, in-process controls. Peptide-specific: 1) solvent recovery and recycling documentation, 2) amino acid and reagent qualification, 3) cleavage and purification critical process parameters, 4) residual solvent testing (ICH Q3C), 5) genotoxic impurity control (TFA, scavengers). Facility: dedicated HVAC, pressure cascades, environmental monitoring. Batch records: complete reconciliation. Change control: process changes require regulatory notification (prior approval supplement for CMC changes)."
tags: ["regulatory", "GMP", "manufacturing", "ICH"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-quality-specs
front: "What quality specifications are established for peptide drug substance?"
back: "Identity: peptide mapping (LC-MS/MS), amino acid analysis, MS (exact mass). Purity: RP-HPLC (related substances), SEC (aggregates), CE (charge variants). Impurities: specified (identified, qualified via tox studies), unspecified (reporting threshold 0.1-0.5%). Residual solvents (ICH Q3C), heavy metals, water content (Karl Fischer). Counterion content (acetate, TFA). Residual reagents: scavengers, coupling reagents. Potency: bioassay or physicochemical assay. Microbial: bioburden, endotoxins (LAL test). Specs justified by process capability, tox studies, clinical experience."
tags: ["regulatory", "quality-specs", "impurities", "drug-substance"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-batch-release
front: "What testing is required for batch release of peptide drug products?"
back: "Release testing per approved specifications: 1) Identity: peptide map or spectroscopic comparison, 2) Assay: potency (bioassay) and content (HPLC), 3) Purity: related substances, aggregates, 4) Sterility (terminal sterilization or aseptic process), 5) Endotoxins (<5 EU/kg for parenteral), 6) Particulate matter (USP <788>), 7) pH, 8) Osmolality, 9) Container closure integrity, 10) Reconstitution time (lyophilized). Certificate of Analysis accompanies each batch. Retention samples maintained per ICH Q7."
tags: ["regulatory", "batch-release", "quality-control", "testing"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-stability-guidelines
front: "What ICH stability guidelines apply to peptide drug products and what are key study designs?"
back: "ICH Q1A(R2): core stability guideline. Q1B: photostability. Q1C: bracketing and matrixing designs. For peptides: 1) long-term (25°C/60%RH, 12-36 months), 2) accelerated (40°C/75%RH, 6 months), 3) intermediate (30°C/65%RH, 12 months). In-use stability: reconstituted product. Stress studies: oxidative (H2O2), thermal (50-60°C), photolytic (ICH Q1B). Primary, secondary, tertiary packaging stability. Post-approval: continued stability (annual lots). Shelf life: based on regression analysis with 95% CI."
tags: ["regulatory", "stability", "ICH-Q1A", "shelf-life"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-post-market
front: "What post-market surveillance and commitments are required for peptide drugs?"
back: "Pharmacovigilance: 1) Periodic Safety Update Reports (PSURs/PBRERs), 2) post-marketing safety studies (Phase IV), 3) Risk Evaluation and Mitigation Strategies (REMS) if required. CMC commitments: annual product reviews, stability studies on marketed batches, process validation (3 consecutive lots). Manufacturing changes: post-approval changes require prior approval supplement (PAS) or changes-being-effected (CBE-30). Adverse event reporting: 15-day alert reports for serious/unexpected AEs. Annual reports to FDA."
tags: ["regulatory", "post-market", "pharmacovigilance", "safety"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-biosimilar-pathway
front: "What are the requirements for developing a biosimilar peptide?"
back: "BPCIA pathway: demonstrate biosimilarity to reference product. Step 1: structural/functional characterization (analytical similarity assessment). Step 2: animal studies (toxicology, PK). Step 3: clinical study (PK/PD equivalence, immunogenicity, efficacy in most sensitive indication). Quality attributes: side-by-side comparison using orthogonal methods (RP-HPLC, SEC, CE-MS, bioassay). Statistical analysis: equivalence margins, quality range approach. Interchangeability requires additional switching studies. Naming: distinguishable suffix (nonproprietary name)."
tags: ["regulatory", "biosimilar", "BPCIA", "biologics"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-ich-q6b
front: "What does ICH Q6B require for specifications of biotechnological/biological products including peptides?"
back: "ICH Q6B: establishes acceptance criteria for biotech products including recombinant peptides. Key elements: 1) characterization of physicochemical properties (amino acid sequence, higher-order structure, composition), 2) biological activity (bioassay preferred), 3) immunochemical properties (if applicable), 4) purity/impurities (process-related and product-related), 5) quantity (protein content). Tests: peptide mapping, mass spectrometry, SEC-HPLC, IEF, bioassay. Specifications set based on lots used in clinical studies. Comparability assessment when process changes."
tags: ["regulatory", "ICH-Q6B", "biotech", "specifications"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-process-validation
front: "What are the FDA requirements for process validation of peptide manufacturing?"
back: "FDA Process Validation Guidance (2011): Stage 1 (Process Design), Stage 2 (Process Qualification - PPQ), Stage 3 (Continued Process Verification). For peptides: 1) identify critical quality attributes (CQAs) and critical process parameters (CPPs) from development data, 2) PPQ: minimum 3 consecutive successful batches, 3) in-process controls monitor CPPs, 4) demonstrate process capability (Cpk >1.33), 5) continued verification: statistical monitoring of commercial batches. Cleaning validation: peptide-specific acceptance criteria (10 ppm or 1/1000 of minimum therapeutic dose)."
tags: ["regulatory", "process-validation", "FDA", "GMP"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-combination-products
front: "What regulatory considerations apply to peptide combination products (drug-device)?"
back: "Combination product: peptide + device (e.g., prefilled pen injector, implant, drug-eluting stent). Primary mode of action (PMOA) determines lead review center: CDER (drug), CBER (biologic), CDRH (device). 21 CFR Part 4: current good manufacturing practice for combination products. Cross-labeling requirements: single package vs co-packaged vs single entity. Device constituent part: must meet device requirements (510(k) or PMA). Drug constituent: NDA/BLA requirements. Human factors studies for device component. Post-market: single adverse event reporting system."
tags: ["regulatory", "combination-products", "drug-device", "FDA"]
difficulty: "expert"
---

---

id: fc-synth-adv-segment-condensation
front: "What is segment condensation and when is it preferred over linear SPPS?"
back: "Segment condensation: synthesize peptide fragments separately, then ligate. Methods: 1) fragment condensation on solid phase (Fmoc fragments with activated C-terminus), 2) native chemical ligation (thioester + Cys), 3) thioester-based methods (crypto-thioesters, NCL-compatible). Preferred for: aggregation-prone sequences (disrupts secondary structure), peptides >50 residues, sequences with difficult couplings, multiple modifications at different sites. Challenges: fragment purification, epimerization at ligation site, solubility of fragments."
tags: ["synthesis", "segment-condensation", "fragment-ligation", "SPPS"]
difficulty: "expert"
---

---

id: fc-analysis-adv-amino-acid-analysis
front: "How is amino acid analysis (AAA) performed on peptides and what does it confirm?"
back: "Acid hydrolysis: 6N HCl, 110°C, 24h under vacuum (destroys Trp, converts Asn/Gln to Asp/Glu). Alkaline hydrolysis: 4N NaOH for Trp determination. Derivatization: pre-column (OPA for primary amines, FMOC for secondary) or post-column (ninhydrin). Detection: UV/fluorescence. Confirms: amino acid composition (identity), peptide content (quantitation against standard), confirms sequence indirectly. Limitations: cannot distinguish Asp/Asn or Glu/Gln directly. Cysteine requires special treatment (oxidation to cysteic acid or performic acid)."
tags: ["analysis", "amino-acid-analysis", "quantitation", "composition"]
difficulty: "expert"
---

---

id: fc-pharm-adv-bioavailability-enhancement
front: "What strategies enhance oral bioavailability of peptide drugs?"
back: "Oral bioavailability of peptides typically <1-2%. Enhancement strategies: 1) Permeation enhancers: SNAC (sodium N-[8-(2-hydroxybenzoyl) amino] caprylate, Rybelsus), salcaprozate sodium, 2) enzyme inhibitors: aprotinin (trypsin), amastatin (aminopeptidases), 3) mucoadhesive systems, 4) enteric coatings (protect from gastric pH), 5) site-specific delivery (colon, ileum), 6) self-emulsifying drug delivery systems (SEDDS), 7) lipid nanoparticles. Semaglutide (oral) uses SNAC + absorption in stomach. Permeation enhancers must balance efficacy vs GI toxicity."
tags: ["pharmacology", "bioavailability", "oral-peptides", "absorption"]
difficulty: "expert"
---

---

id: fc-formul-adv-concentrated-formulations
front: "What challenges are unique to highly concentrated peptide formulations (>50 mg/mL)?"
back: "Challenges: 1) high viscosity (>20 cP makes injection difficult), 2) aggregation kinetics accelerated, 3) opalescence/phase separation, 4) injection site reactions from volume/protein load. Solutions: 1) co-solvents (arginine 150-200 mM reduces viscosity), 2) pH optimization away from pI, 3) surfactant optimization, 4) excipient screening (sucrose preferred over trehalose at high concentration), 5) alternative delivery (SC infusion pumps). Characterization: viscosity (cone-plate rheometer), DLS, AC-SINS (self-interaction nanoparticle spectroscopy)."
tags: ["formulation", "concentrated", "viscosity", "subcutaneous"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-impurity-classification
front: "How are impurities classified and controlled in peptide drug substance?"
back: "Process-related: 1) starting materials (amino acids, resins), 2) reagents (coupling reagents, scavengers), 3) solvents (ICH Q3C limits), 4) catalysts. Product-related: 1) deletion sequences (truncated), 2) insertion sequences, 3) modified peptides (deamidated, oxidized, racemized), 4) aggregates. Classification: specified identified (qualified in tox), specified unidentified (qualified by comparison to tox batches), unspecified (reporting threshold 0.1%). Genotoxic impurities: ICH M7 assessment for mutagenic potential of reagents (e.g., alkylating agents used in synthesis)."
tags: ["regulatory", "impurities", "ICH-M7", "quality"]
difficulty: "expert"
---

---

id: fc-synth-adv-green-chemistry
front: "What green chemistry approaches are being adopted in peptide synthesis?"
back: "Traditional SPPS: high solvent consumption (DMF, NMP, DCM - problematic). Green alternatives: 1) DMF replacement: 2-MeTHF, propylene carbonate, Cyrene (bio-based), 2) flow SPPS: reduced solvent volume (50-70% reduction), 3) water-based coupling: micellar conditions, 4) solvent recovery and recycling, 5) biocatalytic approaches (subtilisin-mediated ligation), 6) electrochemical deprotection. PMI (process mass intensity) metric for sustainability. Industry target: reduce E-factor (kg waste/kg product) from 100+ to <50."
tags: ["synthesis", "green-chemistry", "sustainability", "solvents"]
difficulty: "expert"
---

---

id: fc-analysis-adv-imaging-mass-spec
front: "How is MALDI imaging mass spectrometry (MALDI-IMS) applied to peptide analysis?"
back: "MALDI-IMS maps peptide distribution in tissue sections. Workflow: 1) cryosection tissue (10-20 μm), 2) apply matrix (CHCA, SA, DHB), 3) laser raster across surface, 4) record m/z at each position, 5) generate ion images. Spatial resolution: 10-200 μm. Applications: 1) drug distribution in tumors, 2) endogenous peptide mapping (neuropeptides in brain), 3) biomarker discovery, 4) PK tissue distribution. Advantages: label-free, multiplexed (many peptides simultaneously), molecular specificity. Limitations: semi-quantitative, ion suppression, matrix crystallization heterogeneity."
tags: ["analysis", "MALDI-IMS", "imaging", "tissue-distribution"]
difficulty: "expert"
---

---

id: fc-pharm-adv-pk-allometry
front: "How is allometric scaling used to predict human PK of peptides from animal data?"
back: "Simple allometry: CL ∝ BW^0.75, Vd ∝ BW^1.0, t1/2 ∝ BW^0.25. Rule of exponents: use 0.55, 0.7, 0.8, 1.0 exponent for CL based on fraction unbound-corrected intercept method. For peptides: correction for protein binding differences across species. Multiple species (≥3: mouse, rat, monkey or dog) improve prediction. Limitations: species differences in metabolism (protease profile), receptor-mediated clearance (TMDD), immunogenicity. Monkey PK often best predictor for human (similar plasma protein binding, protease profile)."
tags: ["pharmacology", "allometry", "scaling", "prediction"]
difficulty: "expert"
---

---

id: fc-regulatory-adv-analytical-validation
front: "What parameters must be validated for analytical methods used in peptide quality control?"
back: "ICH Q2(R1): Specificity, linearity, range, accuracy, precision (repeatability, intermediate precision), detection limit (LOD), quantitation limit (LOQ), robustness. For peptides specifically: 1) stability-indicating methods must resolve all degradation products, 2) forced degradation validates specificity, 3) MS-based methods need selectivity confirmation, 4) bioassay validation per ICH Q2 includes reference standard qualification. Method transfer: inter-laboratory reproducibility. System suitability: resolution, tailing factor, plate count criteria."
tags: ["regulatory", "analytical-validation", "ICH-Q2", "method-validation"]
difficulty: "expert"
---
