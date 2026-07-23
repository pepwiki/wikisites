---
date: 2026-06-12
author: "Wikipept Contributors"
id: fc-rp-hplc-c18
front: "Describe the stationary phase composition and retention mechanism of RP-HPLC on a C18 column."
back: "C18 columns contain octadecylsilane chains (n-C18H37) covalently bonded to silica particles (typically 3–5 μm). Retention is governed by hydrophobic interaction: analytes partition between the aqueous/organic mobile phase and the non-polar stationary phase. Longer alkyl chains and higher hydrophobicity increase retention. The column dead volume (t₀) is measured with an unretained solute (e.g., uracil)."
tags: ["RP-HPLC", "C18", "chromatography", "hydrophobicity", "separation"]
difficulty: "intermediate"
---

---
id: fc-rp-hplc-tfa
front: "What is the role of 0.1% trifluoroacetic acid (TFA) in RP-HPLC mobile phases for peptide analysis?"
back: "TFA serves as an ion-pairing agent: the trifluoroacetate anion (CF₃COO⁻) pairs with protonated basic residues (Arg, Lys, His), increasing their hydrophobicity and improving peak shape. TFA also acts as a buffer (pKa ~0.3), maintaining low pH (~2) to suppress silanol ionization on silica-based columns. It is volatile and MS-compatible, though at 0.1% it suppresses ESI signal due to ion-pairing; 0.05% TFA or formic acid alternatives are used when sensitivity is critical."
tags: ["RP-HPLC", "TFA", "ion-pairing", "mobile-phase", "peptide-analysis"]
difficulty: "advanced"
---

---
id: fc-scx-sax
front: "Compare strong cation exchange (SCX) and strong anion exchange (SAX) chromatography: functional groups, pH dependence, and typical applications."
back: "SCX uses sulfonate (–SO₃⁻) groups, permanently charged across all pH values; retains cations (net positive charge). SAX uses quaternary ammonium (–N⁺R₃) groups, permanently charged; retains anions (net negative charge). Weak cation exchangers (carboxymethyl, CM) and weak anion exchangers (diethylaminoethyl, DEAE) have pH-dependent charge. SCX is commonly used in shotgun proteomics for peptide fractionation; SAX is used for nucleotide and acidic protein separation."
tags: ["ion-exchange", "SCX", "SAX", "chromatography", "charge"]
difficulty: "intermediate"
---

---
id: fc-sec-mw-calibration
front: "How is molecular weight calibration performed in size-exclusion chromatography (SEC)?"
back: "SEC calibration uses globular protein standards of known MW (e.g., thyroglobulin 669 kDa, ferritin 440 kDa, aldolase 158 kDa, BSA 66 kDa, ovalbumin 45 kDa, chymotrypsinogen 25 kDa, ribonuclease 13.7 kDa). A calibration curve plots log(MW) vs. elution volume (Ve). The partition coefficient Kav = (Ve – V₀)/(Vt – V₀), where V₀ is void volume (dextran blue) and Vt is total bed volume. Kav ranges from 0 (totally excluded) to 1 (fully permeated). Mark–Houwink corrections apply for non-globular proteins."
tags: ["SEC", "size-exclusion", "molecular-weight", "calibration", "chromatography"]
difficulty: "intermediate"
---

---
id: fc-imac
front: "Describe the principle of immobilized metal affinity chromatography (IMAC) for His-tagged protein purification."
back: "IMAC uses chelating resins (IDA or NTA) charged with divalent metal ions (Ni²⁺, Co²⁺, Zn²⁺). The hexahistidine tag (His₆) coordinates with the metal ion via imidazole nitrogen lone pairs, typically involving 2–3 of the 6 His residues. Binding occurs at physiological pH (7.4–8.0); elution is achieved with 150–300 mM imidazole (competitive displacement) or low pH (~4.5). Ni-NTA has higher capacity; Co-NTA (TALON) has lower capacity but higher specificity."
tags: ["IMAC", "affinity", "His-tag", "purification", "nickel"]
difficulty: "intermediate"
---

---
id: fc-protein-a-g
front: "Explain the mechanism and applications of Protein A/G affinity chromatography for antibody purification."
back: "Protein A (from Staphylococcus aureus) and Protein G (from Streptococcus) bind the Fc region of immunoglobulins. Protein A binds human IgG1, IgG2, IgG4 and mouse IgG2a, IgG2b, IgG3; Protein G has broader species specificity (binds human, mouse, rat, goat IgG). Recombinant Protein A/G is a chimeric protein combining both binding profiles. Binding occurs at pH 7–8; elution at pH 2.5–3.0 (glycine-HCl). Capacity: ~30–50 mg human IgG/mL resin. Used for monoclonal antibody purification in biopharmaceutical manufacturing."
tags: ["Protein-A", "Protein-G", "affinity", "antibody", "purification"]
difficulty: "intermediate"
---

---
id: fc-esi-ms
front: "Describe the electrospray ionization (ESI) mechanism and its key parameters for peptide mass spectrometry."
back: "ESI produces multiply charged ions from solution. The analyte solution is sprayed from a capillary (2–4 kV) through a needle into a heated drying gas (N₂). The Taylor cone generates charged droplets; solvent evaporation increases charge density until the Rayleigh limit is reached, causing Coulombic fission (ion evaporation model or charge residue model). Key parameters: capillary voltage, nebulizer pressure, drying gas flow/temperature, fragmentor voltage. ESI produces multiple charge states [M+nH]ⁿ⁺ for peptides, enabling analysis of large molecules on instruments with limited m/z range (typically 50–2000 Th)."
tags: ["ESI-MS", "mass-spectrometry", "ionization", "peptide", "electrospray"]
difficulty: "advanced"
---

---
id: fc-maldi-tof
front: "Explain the MALDI-TOF ionization mechanism and the function of the matrix."
back: "Matrix-Assisted Laser Desorption/Ionization uses a UV-absorbing organic matrix (e.g., α-cyano-4-hydroxycinnamic acid for peptides, sinapinic acid for proteins) co-crystallized with the analyte. A pulsed nitrogen laser (337 nm) or solid-state laser (355 nm) ablates the matrix-analyte crystal, producing predominantly singly charged ions [M+H]⁺. The ions are accelerated by an electric field (typically 20–25 kV) in the time-of-flight tube; m/z is determined by flight time: t = L√(m/2zE). Reflectron mode improves resolution by compensating for kinetic energy spread. Resolution: 10,000–20,000 FWHM; mass accuracy: 5–50 ppm with internal calibration."
tags: ["MALDI-TOF", "mass-spectrometry", "ionization", "matrix", "time-of-flight"]
difficulty: "advanced"
---

---
id: fc-cid-hcd-etd
front: "Compare CID, HCD, and ETD fragmentation mechanisms in tandem mass spectrometry for peptide sequencing."
back: "CID (Collision-Induced Dissociation): low-energy collisions with inert gas (He, N₂) cause vibrational excitation; backbone cleavage at amide bonds produces b/y ions; preferential cleavage at Asp-Pro and N-terminal to Pro; labile PTMs (phosphorylation) often lost. HCD (Higher-energy Collisional Dissociation): similar to CID but in a dedicated octopole/collision cell; higher energy; produces b/y ions with more uniform fragmentation; compatible with Orbitrap detection; preferred for TMT/iTRAQ quantification. ETD (Electron Transfer Dissociation): radical anions (fluoranthene) transfer electrons to multiply charged peptides; N-Cα bond cleavage produces c/z• ions; preserves labile PTMs and non-covalent interactions; best for large peptides and intact proteins. Complementary fragmentation strategies improve sequence coverage."
tags: ["tandem-MS", "CID", "HCD", "ETD", "fragmentation", "proteomics"]
difficulty: "advanced"
---

---
id: fc-nmr-chemical-shifts
front: "Describe typical ¹H, ¹³C, and ¹⁵N chemical shift ranges for amino acid residues in proteins."
back: "¹H: amide protons (backbone NH) 6.5–10.0 ppm; Hα 3.5–5.5 ppm; aromatic (Phe, Tyr, His, Trp) 6.5–8.5 ppm; methyl (Ala, Val, Leu, Ile) 0.5–1.5 ppm. ¹³C: Cα 40–70 ppm; carbonyl C=O 170–180 ppm; aromatic 110–140 ppm; methyl 10–30 ppm. ¹⁵N: backbone amide 100–135 ppm; Trp indole ~130 ppm; His, Arg sidechains 150–290 ppm; Asn/Gln sidechain NH₂ 105–115 ppm. Reference standards: DSS (4,4-dimethyl-4-silapentane-1-sulfonic acid) for ¹H/¹³C; liquid NH₃ for ¹⁵N. Secondary chemical shifts (observed – random coil) indicate secondary structure: Hα upfield shift → α-helix; downfield shift → β-sheet."
tags: ["NMR", "chemical-shift", "protein-structure", "spectroscopy"]
difficulty: "advanced"
---

---
id: fc-2d-nmr
front: "Explain the information provided by COSY, TOCSY, and NOESY experiments in protein NMR."
back: "COSY (Correlation Spectroscopy): detects J-coupled (typically 3-bond) protons; identifies scalar connectivity through bonds; cross-peaks between Hα-HN, Hα-Hβ. TOCSY (Total Correlation Spectroscopy): transfers magnetization through the entire spin system via isotropic mixing; identifies all protons within an amino acid residue (e.g., Lys: Hα, Hβ, Hγ, Hδ, Hε). NOESY (Nuclear Overhauser Effect Spectroscopy): detects through-space dipolar coupling (<5 Å); cross-peak intensity ∝ r⁻⁶; provides distance restraints for structure determination; sequential (i, i+1) and medium-range (i, i+2 to i+4) NOEs define secondary structure; long-range NOEs define tertiary structure."
tags: ["2D-NMR", "COSY", "TOCSY", "NOESY", "protein-structure"]
difficulty: "advanced"
---

---
id: fc-circular-dichroism
front: "Describe the characteristic CD spectral signatures of α-helix, β-sheet, and random coil in the far-UV region (190–250 nm)."
back: "α-helix: strong negative band at 222 nm (n→π*), negative band at 208 nm, strong positive band at 193 nm; the 222/208 nm ratio indicates coiled-coil character (~1.0 for coiled-coil). β-sheet: negative band at ~218 nm, positive band at ~195 nm. Random coil (unfolded): strong negative band near 200 nm, weak positive/no signal above 215 nm. Polyproline II helix: strong negative band at ~195 nm, weak positive band at ~220 nm. Mean residue ellipticity [θ] (deg·cm²·dmol⁻¹) is calculated from observed ellipticity. Protein secondary structure content is estimated by deconvolution algorithms (CDSSTR, CONTIN/LL, SELCON3) using reference datasets."
tags: ["circular-dichroism", "secondary-structure", "alpha-helix", "beta-sheet", "spectroscopy"]
difficulty: "intermediate"
---

---
id: fc-xray-resolution-rfactor
front: "Define crystallographic resolution and R-factor, and explain what values indicate a high-quality protein structure."
back: "Resolution (dmin) is the minimum interplanar spacing (Å) for which diffraction data are measurable; determined by the resolution ring on the detector. Higher resolution (lower Å) reveals more atomic detail: 3.0 Å shows secondary structure elements; 2.0 Å resolves individual sidechains; 1.5 Å resolves hydrogen atoms; 1.0 Å shows individual electron density. R-factor (Rwork) = Σ||Fo| – |Fc|| / Σ|Fo|, measuring agreement between observed (Fo) and calculated (Fc) structure factors. Typical values: Rwork < 0.20 for good structures; Rfree (calculated on 5% test set excluded from refinement) should be within 5% of Rwork. B-factors (temperature factors) indicate atomic displacement: low B = ordered; high B = flexible."
tags: ["X-ray-crystallography", "resolution", "R-factor", "protein-structure"]
difficulty: "advanced"
---

---
id: fc-cryo-em-fsc
front: "Explain the Fourier Shell Correlation (FSC) 0.143 criterion in cryo-EM and its role in resolution assessment."
back: "FSC measures the correlation between two independent half-maps in Fourier (reciprocal) space as a function of spatial frequency (1/resolution). The two half-maps are generated by splitting particles into two random subsets and reconstructing independently. The FSC curve decays from 1.0 (perfect correlation at low frequency) toward 0 (no correlation at high frequency). The 0.143 threshold (analogous to the σ criterion in X-ray crystallography) defines the resolution cutoff where signal equals noise. Resolution is reported at FSC = 0.143 intersection. Gold-standard FSC (using truly independent half-maps from the beginning of refinement) prevents overfitting. Local resolution varies across the map and can be visualized with tools like ResMap or Blocres."
tags: ["cryo-EM", "FSC", "resolution", "single-particle", "structural-biology"]
difficulty: "advanced"
---

---
id: fc-amino-acid-analysis
front: "Describe pre-column derivatization methods for amino acid analysis and their detection principles."
back: "Pre-column derivatization reagents react with amino groups before chromatographic separation. Common reagents: OPA (o-phthaldialdehyde) + thiol (2-mercaptoethanol or 3-mercaptopropionic acid) reacts with primary amines → highly fluorescent isoindole derivatives (λex 340 nm, λem 450 nm); does not detect Pro (secondary amine). FMOC-Cl (9-fluorenylmethyl chloroformate) reacts with both primary and secondary amines → fluorescent derivatives (λex 260 nm, λem 313 nm); excess reagent must be removed. AQC (6-aminoquinolyl-N-hydroxysuccinimidyl carbamate) reacts with all amino acids including Pro → stable fluorescent adducts (λex 250 nm, λem 395 nm). Detection limit: low picomole range. Separation by RP-HPLC with gradient elution."
tags: ["amino-acid-analysis", "derivatization", "OPA", "FMOC", "fluorescence"]
difficulty: "advanced"
---

---
id: fc-edman-degradation
front: "Describe the chemistry of Edman degradation for N-terminal protein sequencing."
back: "Edman degradation is a stepwise procedure: (1) Coupling: phenylisothiocyanate (PITC) reacts with the N-terminal α-amine at alkaline pH (pH 9.0–9.5) in 50% pyridine to form a phenylthiocarbamyl (PTC) derivative. (2) Cleavage: anhydrous trifluoroacetic acid (TFA) selectively cleaves the PTC-peptide at the first peptide bond, releasing the PTC-amino acid as a thiazolinone derivative. (3) Conversion: the thiazolinone is converted to the more stable phenylthiohydantoin (PTH) amino acid in aqueous acid (e.g., 25% TFA). Identification by RP-HPLC (C18, UV detection at 254/269 nm). Efficiency: ~98–99% per cycle; practical limit ~30–60 residues. Blocked N-termini (acetylation, pyroglutamate) prevent Edman degradation. Sensitivity: low picomole range."
tags: ["Edman-degradation", "sequencing", "PITC", "N-terminal", "protein-chemistry"]
difficulty: "advanced"
---

---
id: fc-peptide-mapping
front: "Describe the peptide mapping workflow using tryptic digestion for protein characterization."
back: "Tryptic digestion cleaves at the C-terminal side of Lys and Arg (except when followed by Pro). Typical protocol: (1) Denature with 8 M urea or 6 M GdnHCl + 10 mM DTT at 56°C, 30 min. (2) Alkylate with 25–55 mM iodoacetamide (IAA) in the dark, 30 min → carbamidomethylated Cys (+57.0215 Da). (3) Dilute urea to <2 M or desalt. (4) Add trypsin at 1:20–1:50 enzyme:substrate ratio, 37°C, 4–18 h. (5) Quench with formic acid (0.1–1% final). (6) Analyze by LC-MS/MS (RP-HPLC C18, 300 μm × 15 cm, 60–120 min gradient). Coverage should be >95% for complete characterization. Missed cleavages (especially at Arg-Pro) are common. Data analysis: compare observed peptide masses to theoretical masses (±10–20 ppm tolerance)."
tags: ["peptide-mapping", "trypsin", "proteomics", "LC-MS", "protein-characterization"]
difficulty: "advanced"
---

---
id: fc-capillary-electrophoresis
front: "Explain the principle of capillary zone electrophoresis (CZE) and its advantages for peptide/protein analysis."
back: "CZE separates ions based on their electrophoretic mobility (μep) in a buffer-filled capillary (25–100 μm ID, 30–100 cm length) under high voltage (10–30 kV). Mobility depends on charge-to-size ratio: μep = q/(6πηr), where q is charge, η is viscosity, r is hydrodynamic radius. Electroosmotic flow (EOF), generated by the electric field acting on the electric double layer at the capillary wall (silanol groups), drives bulk flow toward the cathode. EOF is typically stronger than electrophoretic mobility, so all species (cations, neutrals, anions) reach the detector, but at different times. Detection: UV (200–214 nm for peptides), LIF (for fluorescently labeled species), or ESI-MS coupling. Advantages: high efficiency (10⁵–10⁶ theoretical plates), minimal sample consumption (nL), rapid analysis. Disadvantages: limited loading capacity, sensitivity challenges with UV detection."
tags: ["capillary-electrophoresis", "CZE", "EOF", "separation", "peptide-analysis"]
difficulty: "intermediate"
---

---
id: fc-sds-page
front: "Describe the Laemmli SDS-PAGE system and the basis of molecular weight separation."
back: "The Laemmli system uses discontinuous buffers: stacking gel (4–5% acrylamide, pH 6.8 Tris-HCl) and resolving gel (7.5–15% acrylamide, pH 8.8 Tris-HCl). SDS (sodium dodecyl sulfate) binds proteins at ~1.4 g SDS/g protein, conferring uniform negative charge density proportional to mass. β-mercaptoethanol or DTT reduces disulfide bonds. The stacking gel concentrates samples into thin bands via isotachophoresis (glycinate leading ion, Cl⁻ trailing ion). In the resolving gel, separation occurs by molecular sieving: log(MW) is approximately linear with relative mobility (Rf) for proteins 10–200 kDa. Coomassie Brilliant Blue R-250 detects ~0.1–0.5 μg protein/band; silver stain detects ~1–10 ng. Molecular weight standards (prestained or unstained) are run alongside samples."
tags: ["SDS-PAGE", "Laemmli", "electrophoresis", "molecular-weight", "protein-analysis"]
difficulty: "intermediate"
---

---
id: fc-western-blot
front: "Describe the Western blotting workflow from gel to detection, including transfer and antibody probing."
back: "Western blotting detects specific proteins after SDS-PAGE: (1) Transfer: proteins are electroblotted from the gel to a membrane (PVDF or nitrocellulose) at 100 V for 1–2 h (wet transfer) or 25 V for 7 min (semi-dry). Transfer buffer contains 25 mM Tris, 192 mM glycine, 20% methanol (for PVDF). (2) Blocking: 5% non-fat dry milk or 3–5% BSA in TBST (Tris-buffered saline + 0.1% Tween-20) for 1 h at RT to prevent non-specific binding. (3) Primary antibody: typically 1:500–1:10,000 dilution, 4°C overnight or 1 h at RT. (4) Wash: 3 × 5 min in TBST. (5) Secondary antibody: HRP-conjugated or fluorescent (1:5,000–1:50,000), 1 h at RT. (6) Detection: chemiluminescence (ECL, luminol + H₂O₂), fluorescence (LI-COR), or colorimetric (DAB). Molecular weight markers confirm protein size."
tags: ["Western-blot", "immunoblotting", "antibody", "protein-detection", "electrophoresis"]
difficulty: "intermediate"
---

---
id: fc-elisa
front: "Compare sandwich ELISA and competitive ELISA: principles, sensitivity, and applications."
back: "Sandwich ELISA: (1) Capture antibody adsorbed to plate. (2) Sample antigen binds capture antibody. (3) Detection antibody (different epitope) binds antigen. (4) Enzyme-conjugated secondary antibody (or direct conjugate) adds substrate (TMB → 450 nm). Requires antigen with ≥2 epitopes. Sensitivity: 1–100 pg/mL. Dynamic range: 2–3 logs. Competitive ELISA: (1) Antigen pre-coated on plate OR antibody pre-coated. (2) Sample antigen competes with labeled antigen for antibody binding sites. (3) Signal is inversely proportional to analyte concentration. Used for small molecules (haptens) with single epitopes (steroids, drugs, metabolites). Sensitivity: typically 10–1000 pg/mL. Sandwich ELISA is preferred for proteins >10 kDa; competitive ELISA is required for molecules <5 kDa."
tags: ["ELISA", "sandwich-ELISA", "competitive-ELISA", "immunoassay", "detection"]
difficulty: "intermediate"
---

---
id: fc-spr
front: "Describe the principle of surface plasmon resonance (SPR) for measuring biomolecular interactions."
back: "SPR measures real-time binding events at a metal surface (typically gold film, ~50 nm) using the evanescent wave phenomenon. Polarized light undergoes total internal reflection at a glass/metal interface; at a specific angle (SPR angle), photons couple with surface plasmons, causing a dip in reflected light intensity. Changes in refractive index near the surface (due to binding) shift the SPR angle. One binding partner (ligand) is immobilized on the sensor chip (via amine coupling, His-tag capture, biotin-streptavidin, etc.); the other (analyte) flows over the surface. Key parameters: ka (association rate constant, M⁻¹s⁻¹), kd (dissociation rate constant, s⁻¹), KD = kd/ka (equilibrium dissociation constant). Detection limit: ~1–10 Da mass change (small molecule binding to protein). No labels required. Applications: antibody-antigen kinetics, drug-target affinity, protein-protein interactions."
tags: ["SPR", "biosensor", "kinetics", "affinity", "biomolecular-interaction"]
difficulty: "advanced"
---

---
id: fc-itc
front: "Explain the principles and parameters measured by isothermal titration calorimetry (ITC)."
back: "ITC measures heat evolved or absorbed during binding events in solution. A reference cell and sample cell are maintained at constant temperature (~25°C). Aliquots of titrant (ligand) are injected into the sample cell containing the macromolecule. Heat of binding (exothermic or endothermic) is measured by a power compensation or heat flow system. Parameters obtained in a single experiment: Ka (binding constant, 10²–10⁹ M⁻¹), ΔH (enthalpy change, kcal/mol), ΔS (entropy change, calculated from ΔG = ΔH – TΔS), n (stoichiometry), and Cp (heat capacity change, from temperature dependence). ITC is label-free, requires no immobilization, and provides thermodynamic characterization. Limitations: requires ~1 mL at ~10–100 μM concentrations; sensitivity ~0.1 μcal/s."
tags: ["ITC", "calorimetry", "thermodynamics", "binding", "affinity"]
difficulty: "advanced"
---

---
id: fc-dls
front: "Describe dynamic light scattering (DLS) and its application for measuring particle size and polydispersity."
back: "DLS measures Brownian motion of particles in solution by analyzing time-dependent fluctuations in scattered light intensity (typically at 90° or 173° angle). The autocorrelation function g²(τ) decays exponentially; the decay rate Γ = q²D, where q = (4πn/λ)sin(θ/2) is the scattering vector and D is the translational diffusion coefficient. The Stokes-Einstein equation relates D to hydrodynamic radius: Rh = kT/(6πηD). DLS reports intensity-weighted size distribution (Z-average diameter, dH) and polydispersity index (PDI = μ₂/Γ²). PDI < 0.1 indicates monodisperse; PDI 0.1–0.5 indicates moderate polydispersity; PDI > 0.5 indicates high polydispersity/aggregation. Applications: protein aggregation assessment, nanoparticle sizing, formulation stability. Limitations: intensity weighting biases toward larger particles; assumes spherical particles."
tags: ["DLS", "dynamic-light-scattering", "particle-size", "polydispersity", "aggregation"]
difficulty: "intermediate"
---

---
id: fc-auc
front: "Explain the principles of analytical ultracentrifugation (AUC) and the information obtained from sedimentation velocity and sedimentation equilibrium experiments."
back: "AUC measures sedimentation of macromolecules in an analytical ultracentrifuge (up to 60,000 rpm) with real-time optical detection (UV/absorbance, Rayleigh interference). Sedimentation velocity (SV): performed at high speed; provides sedimentation coefficient (s, in Svedberg units, 1 S = 10⁻¹³ s), diffusion coefficient (D), and molecular weight (M = sRT/[D(1-ῡρ)]). S₂₀,w values are corrected to standard conditions (water, 20°C). SV analyzes boundary movement and shape; c(s) distribution reveals oligomeric states and stoichiometry. Sedimentation equilibrium (SE): performed at lower speed; at equilibrium, sedimentation equals diffusion; provides molecular weight without calibration (Mw from concentration vs. radius profile). SE is the gold standard for measuring weak interactions (KD 10⁻⁴–10⁻⁸ M) and stoichiometry in solution."
tags: ["AUC", "ultracentrifugation", "sedimentation", "molecular-weight", "oligomeric-state"]
difficulty: "advanced"
---

---
id: fc-fluorescence-tryptophan
front: "Describe the use of intrinsic tryptophan fluorescence for studying protein structure and dynamics."
back: "Tryptophan (Trp) is the dominant intrinsic fluorophore in proteins (ε₂₈₀ ≈ 5,600 M⁻¹cm⁻¹). Trp emission: λmax 308–355 nm depending on solvent exposure. Buried Trp in hydrophobic core: λmax 308–330 nm (blue-shifted); exposed Trp at protein surface: λmax 340–355 nm (red-shifted). The emission wavelength is sensitive to local polarity, hydrogen bonding, and quenching. Quantum yield (Φ) varies from ~0.01 to 0.35. Tyr fluorescence (λmax 303 nm) is typically quened in proteins. Applications: (1) Protein folding/unfolding: monitor λmax shift and intensity changes with denaturant (GdnHCl, urea). (2) Ligand binding: quenching or λmax shift upon binding. (3) FRET: Trp as donor (λex 280 nm) to dansyl acceptor (λem 510 nm), R₀ ≈ 2–3 nm. (4) ANS binding: hydrophobic surface exposure."
tags: ["fluorescence", "tryptophan", "protein-structure", "spectroscopy", "protein-folding"]
difficulty: "intermediate"
---

---
id: fc-uv-vis-280-214
front: "Explain the basis of UV absorption at 280 nm and 214 nm for protein/peptide quantitation."
back: "280 nm absorption: dominated by Trp (ε₂₈₀ ≈ 5,600 M⁻¹cm⁻¹), Tyr (ε₂₈₀ ≈ 1,280 M⁻¹cm⁻¹), and disulfide bonds (Cys-Cys, ε₂₈₀ ≈ 120 M⁻¹cm⁻¹). The extinction coefficient is calculated: ε₂₈₀ = (nTrp × 5,600) + (nTyr × 1,280) + (nCys × 120). Alternatively, Gill & von Hippel method uses denatured protein (6 M GdnHCl) values. 280 nm is used for protein quantitation via Beer-Lambert law: A = εcl; or the Bradford/BCA assays for lower sensitivity. 214 nm absorption: peptide bonds (C=O π→π* transition) absorb strongly at 205–215 nm; ε₂₁₄ ≈ 1,000–1,200 M⁻¹cm⁻¹ per peptide bond. Used for peptide detection in RP-HPLC where UV 280 nm sensitivity is insufficient (e.g., peptides lacking Trp/Tyr). Also used in SEC to monitor protein concentration."
tags: ["UV-Vis", "absorbance", "tryptophan", "tyrosine", "peptide-bond", "quantitation"]
difficulty: "intermediate"
---

---
id: fc-ftir-amide-bands
front: "Describe the amide I, II, and III bands in FTIR spectroscopy and their use in protein secondary structure analysis."
back: "Amide I band (1,600–1,700 cm⁻¹): 80% C=O stretching vibration; most informative for secondary structure. α-helix: 1,650–1,658 cm⁻¹; β-sheet: 1,620–1,640 cm⁻¹ (strong) and 1,670–1,695 cm⁻¹ (weak, antiparallel); random coil: 1,640–1,650 cm⁻¹; β-turn: 1,660–1,680 cm⁻¹. Amide II band (1,500–1,600 cm⁻¹): 60% N-H bending + 40% C-N stretching; sensitive to H-bonding and secondary structure. Amide III band (1,200–1,350 cm⁻¹): 40% C-N stretching + 30% N-H bending + 30% C-C stretching; complex and difficult to assign. FTIR uses ATR (attenuated total reflectance) for aqueous samples; D₂O substitution shifts water band away from amide I region. Deconvolution (Fourier self-deconvolution, second derivative) resolves overlapping peaks. Applications: aggregation monitoring, comparability studies, biosimilarity assessment."
tags: ["FTIR", "infrared", "amide-bands", "secondary-structure", "protein-analysis"]
difficulty: "advanced"
---

---
id: fc-raman-spectroscopy
front: "Explain the principles of Raman spectroscopy and its applications in protein characterization."
back: "Raman spectroscopy measures inelastic scattering of monochromatic light (typically 532, 633, or 785 nm laser). When a photon interacts with a molecule, most scatter elastically (Rayleigh); a small fraction (~10⁻⁶) undergoes Raman scattering with a frequency shift corresponding to vibrational modes. Selection rule: change in polarizability during vibration (complementary to IR: change in dipole moment). Key protein bands: amide I (1,650–1,680 cm⁻¹, C=O stretch), amide III (1,230–1,310 cm⁻¹), Trp (760, 880, 1,010, 1,340, 1,360 cm⁻¹), Phe (1,003 cm⁻¹), S-S stretch (500–550 cm⁻¹), SH stretch (2,550–2,580 cm⁻¹). Resonance Raman (excitation near chromophore absorption) enhances signal 10³–10⁶ fold. SERS (surface-enhanced Raman spectroscopy) on gold/silver nanoparticles provides 10⁶–10¹⁴ enhancement. Applications: intact protein structure, lyophilization monitoring, aggregation detection."
tags: ["Raman", "spectroscopy", "vibrational", "protein-characterization", "amide-bands"]
difficulty: "advanced"
---

---
id: fc-saxs
front: "Describe small-angle X-ray scattering (SAXS) and the structural information it provides for proteins in solution."
back: "SAXS measures X-ray scattering at small angles (0.1°–10°, corresponding to d-spacings 1–100 nm) from proteins in solution. The scattering intensity I(q) is recorded vs. q = 4πsinθ/λ. Key parameters from the Guinier plot (ln I vs. q²): radius of gyration Rg (slope = –Rg²/3); forward scattering I(0) (related to molecular weight). Pair distance distribution function P(r) provides maximum dimension Dmax and shape information. Molecular weight estimation from I(0) using protein standards or comparison with BSA. Kratky plot (I(q)·q² vs. q): bell-shaped = folded; plateau = unfolded. Ab initio shape reconstruction (DAMMIN, GASBOR) generates low-resolution envelope models (~10–20 Å resolution). SAXS can detect oligomeric states, conformational changes, flexibility (Rg vs. MW), and validate crystal structures against solution conformations."
tags: ["SAXS", "small-angle-scattering", "solution-structure", "Rg", "shape-determination"]
difficulty: "advanced"
---

---
id: fc-afm
front: "Explain the principle of atomic force microscopy (AFM) and its applications in protein and biomaterial characterization."
back: "AFM uses a sharp tip (radius ~2–20 nm) on a cantilever spring (k ~0.01–100 N/m) to raster-scan a surface. Tip-sample interaction forces (van der Waals, electrostatic, mechanical) cause cantilever deflection, measured by a laser reflected from the cantilever onto a photodiode. Operating modes: contact mode (continuous tip-surface contact; high resolution but lateral forces), tapping/intermittent contact mode (oscillating tip; reduced lateral damage; phase imaging for material contrast), non-contact mode (oscillating tip above surface; minimal perturbation). Force-distance curves measure adhesion, elasticity (Young's modulus via Hertz model), and unfolding forces. AFM operates in air or liquid (essential for biological samples). Applications: protein imaging (single molecules, ~1 nm resolution), nanomechanical properties of biomaterials, force spectroscopy for receptor-ligand interactions, amyloid fibril morphology."
tags: ["AFM", "atomic-force-microscopy", "imaging", "nanomechanics", "protein-characterization"]
difficulty: "advanced"
---

---
id: fc-method-validation
front: "Define the key validation parameters (specificity, linearity, precision, accuracy) required for analytical method validation per ICH Q2 guidelines."
back: "Specificity: ability to measure the analyte without interference from matrix components, degradation products, or excipients; demonstrated by placebo/blank analysis and stress testing. Linearity: ability to obtain test results proportional to analyte concentration within a defined range; R² ≥ 0.999; typically 5–8 concentration levels. Precision: closeness of agreement between independent measurements. Repeatability: same analyst, same day, same equipment (RSD ≤ 2%). Intermediate precision: different day/analyst/equipment. Reproducibility: different laboratories. Accuracy: closeness of agreement between true value and measured value; expressed as % recovery (98–102% for assay) or bias; determined by spiking known amounts into matrix. Other parameters: range, detection limit (LOD, S/N ≥ 3), quantitation limit (LOQ, S/N ≥ 10), robustness."
tags: ["method-validation", "ICH-Q2", "specificity", "linearity", "precision", "accuracy"]
difficulty: "intermediate"
---
