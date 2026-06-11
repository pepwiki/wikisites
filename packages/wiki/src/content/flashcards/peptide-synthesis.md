---
id: fc-spps-overview
front: "What is Solid-Phase Peptide Synthesis (SPPS)?"
back: "A method developed by Merrifield (1963) where amino acids are sequentially assembled on an insoluble polymeric resin. The growing peptide remains anchored to the resin throughout synthesis, allowing excess reagents to be removed by simple filtration and washing."
tags: ["synthesis", "SPPS", "overview"]
difficulty: "beginner"
---

---

id: fc-fmoc-strategy
front: "What is the Fmoc strategy in SPPS?"
back: "Uses 9-fluorenylmethyloxycarbonyl (Fmoc) as a temporary Nα-protecting group, removed by mild base (20% piperidine in DMF). Side chains are protected with acid-labile groups (e.g., Boc, tBu). Final cleavage uses TFA. Preferred for its milder conditions compared to Boc chemistry."
tags: ["synthesis", "Fmoc", "protecting-groups", "strategy"]
difficulty: "intermediate"

---

---

id: fc-boc-strategy
front: "What is the Boc strategy in SPPS?"
back: "Uses tert-butyloxycarbonyl (Boc) as a temporary Nα-protecting group, removed by dilute TFA (25-50% in DCM). Side chains are protected with benzyl-based groups. Requires repetitive acid treatment for deprotection and final HF or TFMSA cleavage. More aggressive conditions than Fmoc."
tags: ["synthesis", "Boc", "protecting-groups", "strategy"]
difficulty: "intermediate"

---

---

id: fc-wang-resin
front: "What is Wang resin and when is it used?"
back: "A p-benzyloxybenzyl alcohol resin used for synthesizing peptide C-terminal acids. The first amino acid is attached via an ester linkage using DIC/DMAP activation. Cleaved by TFA to yield a peptide with a free C-terminal carboxylic acid."
tags: ["synthesis", "resin", "Wang", "carboxylic-acid"]
difficulty: "intermediate"

---

---

id: fc-rink-amide-resin
front: "What is Rink amide resin used for?"
back: "An acid-labile resin for generating C-terminal peptide amides upon TFA cleavage. Contains a 4-(2',4'-dimethoxyphenyl-Fmoc-aminomethyl)phenoxy linker. First amino acid is coupled directly to the secondary amine after Fmoc removal."
tags: ["synthesis", "resin", "Rink-amide", "C-terminal-amide"]
difficulty: "intermediate"

---

---

id: fc-merrifield-resin
front: "What is Merrifield resin?"
back: "Chloromethylated polystyrene cross-linked with divinylbenzene (1-2%). The original SPPS resin developed by Merrifield. First amino acid is attached via SN2 displacement of chloride. Used primarily in Boc chemistry; requires stronger cleavage conditions (HF)."
tags: ["synthesis", "resin", "Merrifield", "polystyrene"]
difficulty: "intermediate"

---

---

id: fc-hatu-coupling
front: "What is HATU and why is it preferred for peptide coupling?"
back: "Hexafluorophosphate Azabenzotriazole Tetramethyl Uronium — a uronium-based coupling reagent. Forms highly reactive OAt active esters with minimal racemization. Faster coupling than HBTU, especially for sterically hindered residues. Often used with DIPEA as base."
tags: ["synthesis", "coupling-reagent", "HATU", "activation"]
difficulty: "advanced"

---

---

id: fc-hbtu-coupling
front: "What is HBTU and how does it compare to HATU?"
back: "Hexafluorophosphate Benzotriazole Tetramethyl Uronium — forms OBt active esters. Slightly less reactive than HATU (OAt ester) but more cost-effective. Widely used for routine couplings. Both require a tertiary amine base (DIPEA or collidine)."
tags: ["synthesis", "coupling-reagent", "HBTU", "activation"]
difficulty: "advanced"

---

---

id: fc-dic-coupling
front: "What is DIC and how is it used in peptide synthesis?"
back: "N,N'-Diisopropylcarbodiimide — a carbodiimide coupling reagent used with additives like Oxyma or HOBt. Forms active esters in situ. Cheaper than uronium reagents. Byproduct (diisopropylurea) is soluble in DMF, unlike DCC's insoluble DCU."
tags: ["synthesis", "coupling-reagent", "DIC", "carbodiimide"]
difficulty: "intermediate"

---

---

id: fc-tfa-cleavage
front: "What role does TFA play in peptide synthesis?"
back: "Trifluoroacetic acid serves dual roles: (1) removes acid-labile side-chain protecting groups (Boc, tBu, Trt, Pbf) and (2) cleaves the peptide from acid-labile resins (Wang, Rink amide). Standard cleavage uses 95% TFA with scavengers (TIS, water, EDT)."
tags: ["synthesis", "cleavage", "TFA", "deprotection"]
difficulty: "intermediate"

---

---

id: fc-side-chain-protecting-groups
front: "What are common side-chain protecting groups in Fmoc SPPS?"
back: "Asp/Glu: OtBu (tert-butyl ester). Lys: Boc. Ser/Thr: tBu (tert-butyl ether). Cys: Trt (trityl) or Acm. His: Trt. Arg: Pbf (2,2,4,6,7-pentamethyldihydrobenzofuran-5-sulfonyl). All removed by TFA during final cleavage."
tags: ["synthesis", "protecting-groups", "side-chains", "Fmoc"]
difficulty: "advanced"

---

---

id: fc-kaiser-test
front: "What is the Kaiser test and what does it detect?"
back: "A colorimetric test using ninhydrin that detects free primary amines. A negative result (no blue/purple color) indicates complete coupling. A positive result shows unreacted amino groups remain. Uses three reagents: ninhydrin, phenol, and KCN in ethanol."
tags: ["synthesis", "monitoring", "Kaiser-test", "ninhydrin"]
difficulty: "intermediate"

---

---

id: fc-microwave-spps
front: "How does microwave-assisted SPPS improve peptide synthesis?"
back: "Microwave irradiation (typically 50-75°C) accelerates coupling and deprotection steps, reducing reaction times from hours to minutes. Improves synthesis of difficult sequences (aggregation-prone) by disrupting inter-chain hydrogen bonding. Requires microwave-compatible resin and equipment."
tags: ["synthesis", "microwave", "acceleration", "difficult-sequences"]
difficulty: "advanced"

---

---

id: fc-native-chemical-ligation
front: "What is Native Chemical Ligation (NCL)?"
back: "A chemoselective reaction between a C-terminal thioester peptide and an N-terminal cysteine peptide. Forms a native peptide bond at the ligation site. Enables synthesis of proteins >100 residues by assembling shorter synthetic fragments. Developed by Kent and Dawson (1994)."
tags: ["synthesis", "NCL", "ligation", "protein-synthesis"]
difficulty: "advanced"

---

---

id: fc-click-chemistry-peptides
front: "How is click chemistry used in peptide synthesis?"
back: "Cu(I)-catalyzed azide-alkyne cycloaddition (CuAAC) forms 1,4-disubstituted 1,2,3-triazole linkages. Used for cyclization, conjugation (peptide-drug, PEGylation), and stapling. Bioorthogonal — reacts selectively in complex biological environments."
tags: ["synthesis", "click-chemistry", "CuAAC", "conjugation"]
difficulty: "advanced"

---

---

id: fc-cyclization-strategies
front: "What are the main peptide cyclization strategies?"
back: "1) Head-to-tail (backbone cyclization via side-chain-to-resin or solution-phase). 2) Side-chain-to-side-chain (lactam: Lys-Asp/Glu; thioether; triazole). 3) Disulfide (Cys-Cys). 4) Stapling (hydrocarbon stapling via ring-closing metathesis). Cyclization improves stability and receptor selectivity."
tags: ["synthesis", "cyclization", "stapling", "peptide-drugs"]
difficulty: "advanced"

---

---

id: fc-disulfide-bond-formation
front: "How are disulfide bonds formed in synthetic peptides?"
back: "Methods: (1) Air oxidation in dilute aqueous buffer at pH 7-8. (2) DMSO-mediated oxidation. (3) Thiol/disulfide exchange with glutathione redox buffer. (4) Directed disulfide formation using orthogonal Cys protecting groups (Acm, Trt, StBu) sequentially deprotected."
tags: ["synthesis", "disulfide", "oxidation", "cysteine"]
difficulty: "advanced"

---

---

id: fc-hplc-purification-peptides
front: "How are synthetic peptides purified by HPLC?"
back: "Reverse-phase HPLC (RP-HPLC) using C18 or C8 columns with acetonitrile/water gradients containing 0.1% TFA. Peptides elute based on hydrophobicity. Preparative or semi-preparative scale. Typical purity targets: >95% for research, >98% for therapeutic use."
tags: ["purification", "HPLC", "RP-HPLC", "quality"]
difficulty: "intermediate"

---

---

id: fc-mass-spectrometry-peptides
front: "How is mass spectrometry used to characterize synthetic peptides?"
back: "ESI-MS or MALDI-TOF MS confirms molecular weight. MS/MS sequencing verifies amino acid sequence. LC-MS combines separation with detection. Expected mass calculated from sequence; observed mass should match within instrument accuracy (typically ±0.1 Da)."
tags: ["characterization", "mass-spectrometry", "ESI-MS", "MALDI"]
difficulty: "intermediate"

---

---

id: fc-edman-degradation
front: "What is Edman degradation and its use in peptide chemistry?"
back: "Sequential N-terminal amino acid identification using phenylisothiocyanate (PITC). Each cycle removes one residue as a phenylthiohydantoin (PTH) derivative, identified by HPLC. Limited to ~50-60 cycles. Used to verify sequences of synthetic and natural peptides."
tags: ["characterization", "Edman-degradation", "sequencing", "PITC"]
difficulty: "advanced"

---

---

id: fc-amino-acid-analysis
front: "What is amino acid analysis (AAA) for peptides?"
back: "Hydrolyzes peptide (6M HCl, 110°C, 24h) then quantifies each amino acid by HPLC after derivatization (e.g., OPA, AccQ-Tag). Confirms composition and determines peptide content/concentration. Cannot distinguish Leu/Ile without special conditions."
tags: ["characterization", "AAA", "composition", "quantification"]
difficulty: "intermediate"

---

---

id: fc-peptide-mapping
front: "What is peptide mapping?"
back: "Enzymatic digestion (trypsin, chymotrypsin) or chemical cleavage (CNBr) of a peptide followed by LC-MS analysis of the resulting fragments. Confirms primary structure, identifies modifications, and detects impurities. Each peptide produces a unique 'fingerprint' map."
tags: ["characterization", "peptide-mapping", "LC-MS", "quality-control"]
difficulty: "advanced"

---

---

id: fc-lyophilization
front: "What is lyophilization and why is it used for peptides?"
back: "Freeze-drying: peptide solution is frozen then subjected to vacuum to sublime water. Produces a stable dry powder for long-term storage. Protects against hydrolytic degradation. Peptide is dissolved in a volatile buffer (e.g., ammonium acetate) or dilute acetic acid before lyophilization."
tags: ["formulation", "lyophilization", "stability", "storage"]
difficulty: "intermediate"

---

---

id: fc-peptide-stability
front: "What are the main factors affecting peptide stability?"
back: "1) Proteolytic degradation (peptidases). 2) Oxidation (Met, Cys, Trp). 3) Deamidation (Asn, Gln). 4) Aggregation/precipitation. 5) Racemization. 6) Hydrolysis (Asp-Pro bonds). Mitigation: D-amino acids, cyclization, PEGylation, formulation at optimal pH."
tags: ["stability", "degradation", "formulation", "peptide-drugs"]
difficulty: "intermediate"

---

---

id: fc-racemization-prevention
front: "How is racemization prevented during peptide coupling?"
back: "1) Use less racemization-prone coupling reagents (HATU > HBTU > EDC). 2) Add racemization suppressants (Oxyma, HOBt). 3) Keep temperature low (0-25°C). 4) Minimize activation time before adding nucleophile. 5) Use collidine or DIPEA (not stronger bases). 6) Avoid prolonged coupling of Cys, His, Phe."
tags: ["synthesis", "racemization", "coupling", "stereochemistry"]
difficulty: "advanced"

---

---

id: fc-double-coupling
front: "What is double coupling in SPPS?"
back: "Performing the same amino acid coupling reaction twice sequentially to improve completeness. Especially important for difficult residues (sterically hindered: Aib, N-methyl amino acids) or at known difficult regions. Second coupling uses fresh activated amino acid."
tags: ["synthesis", "double-coupling", "difficult-sequences", "optimization"]
difficulty: "intermediate"

---

---

id: fc-capping-spps
front: "What is capping in SPPS and why is it used?"
back: "Acetylation of unreacted free amines after each coupling step using acetic anhydride. Prevents deletion sequences from growing further, simplifying purification. Capped deletion peptides are more hydrophilic and elute earlier on RP-HPLC, separating from the target peptide."
tags: ["synthesis", "capping", "Ac2O", "purification"]
difficulty: "intermediate"

---

---

id: fc-resin-loading
front: "What is resin loading and how is it determined?"
back: "The mmol of amino acid per gram of resin (mmol/g). Determined by Fmoc quantification (UV absorbance at 301 nm after piperidine treatment) or by amino acid analysis. Typical loading: 0.1-0.8 mmol/g. Lower loading often gives better synthesis quality due to reduced steric crowding."
tags: ["synthesis", "resin-loading", "quantification", "Fmoc-UV"]
difficulty: "intermediate"

---

---

id: fc-cleavage-cocktail
front: "What is a standard TFA cleavage cocktail composition?"
back: "Typical recipe: 95% TFA, 2.5% triisopropylsilane (TIS), 2.5% water. TFA cleaves and deprotects. TIS and water act as carbocation scavengers, trapping reactive cations from protecting groups (tBu+, Trt+) to prevent side reactions on sensitive residues (Trp, Met, Tyr)."
tags: ["synthesis", "cleavage", "TFA", "scavengers", "cocktail"]
difficulty: "advanced"

---

---

id: fc-post-cleavage-workup
front: "What does post-cleavage workup involve?"
back: "1) Filter resin from cleavage solution. 2) Precipitate crude peptide in cold diethyl ether (typically -20°C). 3) Centrifuge and wash pellet with ether (3x). 4) Dry crude peptide under nitrogen/vacuum. 5) Dissolve in water/acetonitrile for lyophilization or direct HPLC purification."
tags: ["synthesis", "cleavage", "workup", "purification", "ether-precipitation"]
difficulty: "intermediate"

---
