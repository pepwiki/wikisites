---
date: 2026-06-12
author: "Wikipept Contributors"
id: quiz-peptide-med-chem-lipinski-001
question: "A linear hexapeptide (MW 680 Da, cLogP 1.2, HBD 8, HBA 12) is being evaluated for oral absorption. According to Lipinski's Rule of Five, which violation is most concerning for oral bioavailability?"
options:
  - "Molecular weight exceeds 500 Da"
  - "cLogP exceeds 5"
  - "Hydrogen bond donors exceed 5"
  - "Hydrogen bond acceptors exceed 10"
correctIndex: 0
explanation: "Lipinski's Rule of Five states that poor absorption is more likely when MW > 500, cLogP > 5, HBD > 5, or HBA > 10. This peptide violates MW (680 > 500) and HBD (8 > 5) and HBA (12 > 10). The MW violation is most concerning as it correlates most strongly with poor permeability for peptides, though multiple violations compound the effect. Peptides inherently exceed HBD/HBA due to backbone amides."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "lipinski", "oral-absorption", "drug-likeness"]
---

---

id: quiz-peptide-med-chem-veber-001
question: "A cyclic pentapeptide has a polar surface area (PSA) of 180 Å² and 14 rotatable bonds. According to Veber's rules, what is the predicted oral bioavailability outcome?"
options:
  - "Good oral bioavailability (PSA ≤ 140 Å² and rotatable bonds ≤ 10)"
  - "Poor oral bioavailability due to high PSA exceeding 140 Å² threshold"
  - "Poor oral bioavailability due to excessive rotatable bonds exceeding 10"
  - "Poor oral bioavailability due to violation of both PSA and rotatable bond criteria"
correctIndex: 3
explanation: "Veber's rules indicate good oral bioavailability when PSA ≤ 140 Å² and rotatable bonds ≤ 10. This peptide violates both criteria (PSA 180 > 140 Å², rotatable bonds 14 > 10), predicting poor oral absorption. PSA reflects hydrogen bonding capacity and correlates with intestinal permeability, while rotatable bonds reflect molecular flexibility affecting membrane partitioning."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "veber", "PSA", "rotatable-bonds", "bioavailability"]
---

---

id: quiz-peptide-med-chem-permeability-001
question: "In a Caco-2 permeability study, a modified peptide shows Papp of 12 × 10⁻⁶ cm/s. How should this be classified for intestinal absorption potential?"
options:
  - "Low permeability (Papp < 1 × 10⁻⁶ cm/s), predicting < 20% absorption"
  - "Moderate permeability (Papp 1-10 × 10⁻⁶ cm/s), predicting 20-70% absorption"
  - "High permeability (Papp > 10 × 10⁻⁶ cm/s), predicting > 70% absorption"
  - "Very high permeability (Papp > 50 × 10⁻⁶ cm/s), predicting complete absorption"
correctIndex: 2
explanation: "Caco-2 permeability classification: Papp < 1 × 10⁻⁶ cm/s = low (< 20% absorbed), Papp 1-10 × 10⁻⁶ cm/s = moderate (20-70%), Papp > 10 × 10⁻⁶ cm/s = high (> 70%). A Papp of 12 × 10⁻⁶ cm/s indicates high permeability. FDA uses Caco-2 as a surrogate for BCS classification, with Papp > 10 × 10⁻⁶ cm/s correlating with complete intestinal absorption."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "permeability", "caco-2", "absorption", "Papp"]
---

---

id: quiz-peptide-med-chem-caco2-001
question: "In the Caco-2 cell monolayer model for predicting peptide absorption, what transepithelial electrical resistance (TEER) value confirms proper tight junction formation?"
options:
  - "TEER > 100 Ω·cm²"
  - "TEER > 250 Ω·cm²"
  - "TEER > 400 Ω·cm²"
  - "TEER > 1000 Ω·cm²"
correctIndex: 2
explanation: "Caco-2 monolayers require TEER > 400 Ω·cm² to confirm intact tight junctions before permeability studies. TEER < 400 Ω·cm² indicates compromised barrier integrity, invalidating Papp measurements. Caco-2 cells differentiate over 21 days, forming columnar enterocytes with brush border microvilli and functional tight junctions, mimicking intestinal epithelium."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "caco-2", "TEER", "tight-junctions", "absorption"]
---

---

id: quiz-peptide-med-chem-protein-binding-001
question: "A therapeutic peptide shows 95% plasma protein binding, primarily to albumin. If the total plasma concentration is 10 µM, what is the free (unbound) concentration available for pharmacological activity?"
options:
  - "0.05 µM"
  - "0.5 µM"
  - "5.0 µM"
  - "9.5 µM"
correctIndex: 1
explanation: "Free fraction (fu) = 1 - fraction bound = 1 - 0.95 = 0.05. Free concentration = fu × total = 0.05 × 10 µM = 0.5 µM. Only unbound drug is pharmacologically active and available for distribution, metabolism, and elimination. Albumin binds acidic and neutral peptides; alpha1-acid glycoprotein (AAG) binds basic peptides. Protein binding affects Vd, CL, and half-life."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "protein-binding", "albumin", "free-fraction", "pharmacokinetics"]
---

---

id: quiz-peptide-med-chem-cyp450-001
question: "Why do most peptides show minimal CYP450-mediated metabolism, and which exception is clinically significant?"
options:
  - "Peptides are too large for CYP450 active sites; no exceptions exist"
  - "Peptides are metabolized by proteases, not CYP450; cyclosporine is an exception metabolized by CYP3A4"
  - "Peptides lack aromatic rings needed for CYP450 binding; all peptides avoid CYP450 metabolism"
  - "Peptides are too polar to enter the endoplasmic reticulum where CYP450s reside"
correctIndex: 1
explanation: "Most peptides undergo proteolytic metabolism by peptidases rather than CYP450 oxidation. However, cyclosporine A (cyclic undecapeptide) is a notable exception, extensively metabolized by CYP3A4 via N-demethylation and hydroxylation. This is clinically significant for drug-drug interactions with CYP3A4 inhibitors (ketoconazole, erythromycin) that increase cyclosporine exposure 2-5 fold."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "CYP450", "metabolism", "cyclosporine", "drug-interactions"]
---

---

id: quiz-peptide-med-chem-renal-clearance-001
question: "A peptide with MW 5000 Da and moderate protein binding undergoes renal elimination. Which mechanism predominates, and what is the expected clearance relative to GFR?"
options:
  - "Glomerular filtration only; CLrenal ≈ fu × GFR (approximately 120 mL/min × fu)"
  - "Active tubular secretion; CLrenal significantly exceeds GFR"
  - "Tubular reabsorption; CLrenal is much less than fu × GFR"
  - "Peritubular capillary uptake; CLrenal equals renal plasma flow"
correctIndex: 0
explanation: "Peptides > 5000 Da are filtered but not secreted. Renal clearance = fu × GFR × (1 - reabsorption fraction). For a moderately bound peptide with minimal reabsorption, CLrenal ≈ fu × GFR. GFR ≈ 120 mL/min. With 50% protein binding (fu = 0.5), CLrenal ≈ 60 mL/min. Peptides < 5000 Da may undergo tubular reabsorption via megalin/cubilin-mediated endocytosis in proximal tubules, reducing CLrenal."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "renal-clearance", "GFR", "protein-binding", "pharmacokinetics"]
---

---

id: quiz-peptide-med-chem-vd-001
question: "A peptide drug has CLtotal = 3 L/h and t½ = 2 hours. What is the volume of distribution (Vd), and what does this indicate about tissue distribution?"
options:
  - "Vd = 6 L; restricted to plasma compartment (Vd ≈ plasma volume)"
  - "Vd = 1.5 L; concentrated in plasma with some tissue binding"
  - "Vd = 60 L; extensive tissue distribution throughout body water"
  - "Vd = 300 L; extreme tissue sequestration in peripheral compartments"
correctIndex: 0
explanation: "Using t½ = 0.693 × Vd/CL, rearranging: Vd = t½ × CL / 0.693 = 2 h × 3 L/h / 0.693 ≈ 8.66 L. This approximates plasma volume (~3 L) plus some interstitial space, indicating limited tissue distribution. Large hydrophilic peptides typically have Vd 6-15 L, restricted to extracellular fluid. Lipophilic peptides or those with tissue receptors may show Vd > 100 L."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "volume-of-distribution", "pharmacokinetics", "tissue-distribution"]
---

---

id: quiz-peptide-med-chem-half-life-001
question: "A peptide has CLtotal = 5.5 L/h and Vd = 20 L. What is the predicted terminal half-life, and how does this compare to typical therapeutic peptides?"
options:
  - "t½ = 2.5 hours; shorter than most therapeutic peptides"
  - "t½ = 2.5 hours; typical for linear therapeutic peptides"
  - "t½ = 36 hours; typical for PEGylated peptides"
  - "t½ = 100 hours; typical for albumin-fused peptides"
correctIndex: 1
explanation: "t½ = 0.693 × Vd / CL = 0.693 × 20 / 5.5 ≈ 2.52 hours. This is typical for unmodified linear peptides (e.g., native GLP-1 t½ = 2-3 minutes, but stabilized analogs like liraglutide reach 13 hours). Short half-lives result from proteolytic degradation and rapid renal clearance. PEGylation extends t½ to 24-72 hours; albumin fusion to 5-7 days."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "half-life", "pharmacokinetics", "clearance", "volume-of-distribution"]
---

---

id: quiz-peptide-med-chem-bioavailability-001
question: "In a bioavailability study, a peptide shows AUCoral = 240 ng·h/mL (dose = 10 mg PO) and AUCiv = 800 ng·h/mL (dose = 2 mg IV). What is the absolute oral bioavailability (F)?"
options:
  - "F = 30%"
  - "F = 6%"
  - "F = 60%"
  - "F = 3.75%"
correctIndex: 2
explanation: "F = (AUCoral / Doseoral) / (AUCiv / Doseiv) × 100% = (240/10) / (800/2) × 100% = 24/400 × 100% = 6%. However, corrected for dose: F = (AUCoral × Doseiv) / (AUCiv × Doseoral) = (240 × 2) / (800 × 10) = 480/8000 = 6%. The 6% bioavailability reflects significant first-pass metabolism and poor intestinal permeability typical of peptides."
difficulty: "intermediate"
tags: ["peptide-medicinal-chemistry", "bioavailability", "AUC", "pharmacokinetics", "first-pass"]
---

---

id: quiz-peptide-med-chem-metabolism-sar-001
question: "In structure-metabolism relationships for peptides, which amino acid substitution at a protease cleavage site most effectively stabilizes against trypsin-like proteases?"
options:
  - "Replacing Lys with D-Lys at P1 position"
  - "Replacing Phe with D-Phe at P3 position"
  - "Replacing Gly with Ala at P2 position"
  - "Replacing Arg with citrulline at P1 position"
correctIndex: 0
explanation: "Trypsin cleaves after basic residues (Lys, Arg) at P1 position. D-amino acid substitution at P1 prevents protease recognition due to inverted stereochemistry. D-Lys retains the positive charge for receptor binding but resists trypsin cleavage. Citrulline (uncharged) at P1 also blocks trypsin but may alter target affinity. Substitutions at P3 or P2 have less direct impact on trypsin specificity."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "structure-metabolism", "protease-stability", "trypsin", "D-amino-acids"]
---

---

id: quiz-peptide-med-chem-prodrug-001
question: "A prodrug strategy converts a peptide carboxylic acid to a pivaloyloxymethyl (POM) ester. What is the primary benefit and the activation mechanism?"
options:
  - "Increased lipophilicity for oral absorption; activated by plasma esterases to release parent peptide"
  - "Increased water solubility for IV formulation; activated by pH change in blood"
  - "Protection from proteases; activated by specific peptidases at target site"
  - "Extended half-life; activated by liver CYP450 enzymes"
correctIndex: 0
explanation: "POM esters mask polar carboxylic acids, increasing cLogP and membrane permeability. POM is cleaved by ubiquitous carboxylesterases (CES1/CES2) in plasma and tissues, releasing formaldehyde, pivalic acid, and the active peptide. This improves oral absorption by 5-20 fold for some peptides. Limitation: formaldehyde release may cause toxicity with chronic dosing."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "prodrug", "POM-ester", "oral-bioavailability", "esterase"]
---

---

id: quiz-peptide-med-chem-backbone-mod-001
question: "N-methylation of backbone amides in a cyclic peptide increases oral bioavailability from < 1% to 28%. What is the primary physicochemical mechanism?"
options:
  - "N-methylation eliminates hydrogen bond donors, reducing PSA and improving passive permeability"
  - "N-methylation increases molecular weight, enhancing lymphatic absorption"
  - "N-methylation introduces chirality, improving receptor selectivity"
  - "N-methylation increases charge at physiological pH, enhancing paracellular transport"
correctIndex: 0
explanation: "Each N-methyl group removes one HBD and reduces PSA by ~20 Å². This decreases desolvation energy for membrane partitioning. Cyclosporine A (7 N-methyl groups) demonstrates this principle with oral bioavailability ~30%. N-methylation also blocks protease cleavage at modified positions and can stabilize bioactive conformations. Beta-amino acids similarly resist proteolysis but alter backbone geometry."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "N-methylation", "backbone-modification", "permeability", "PSA"]
---

---

id: quiz-peptide-med-chem-side-chain-001
question: "A peptide antagonist contains Phe-Trp-Lys-Thr sequence at the pharmacophore. Substituting D-Trp for L-Trp increases metabolic stability 15-fold but reduces affinity 8-fold. What strategy optimizes both properties?"
options:
  - "Use alpha-methyl-tryptophan to block protease access while preserving side chain orientation"
  - "Use beta-homotryptophan to maintain backbone geometry with protease resistance"
  - "Use N-methyl-tryptophan to reduce PSA and block backbone cleavage"
  - "Use 5-fluoro-tryptophan to increase binding affinity through halogen bonding"
correctIndex: 1
explanation: "Beta-homotryptophan (one extra CH₂ in backbone) maintains side chain spatial orientation for receptor binding while introducing protease resistance through altered backbone geometry. Alpha-methyl amino acids cause significant conformational changes. N-methyl-Trp removes the backbone NH needed for secondary structure. 5-F-Trp may affect binding but does not address metabolism at the backbone."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "side-chain-modification", "beta-amino-acids", "SAR", "metabolic-stability"]
---

---

id: quiz-peptide-med-chem-cyclization-001
question: "A head-to-tail cyclic peptide shows 50-fold higher receptor affinity than its linear counterpart. What conformational property explains this enhancement?"
options:
  - "Cyclization increases entropy of the unbound state, improving binding free energy"
  - "Cyclization pre-organizes the bioactive conformation, reducing the entropic penalty of binding"
  - "Cyclization increases the number of hydrogen bond donors at the binding interface"
  - "Cyclization prevents proteolytic degradation, increasing apparent potency"
correctIndex: 1
explanation: "Linear peptides sample many conformations in solution (high conformational entropy). Upon binding, they must adopt a single bioactive conformation, incurring a large entropic penalty (ΔS < 0). Cyclization pre-constrains the peptide near the bound geometry, reducing the entropic cost of binding (less negative ΔS upon binding). This can improve affinity by ΔΔG = -TΔΔS ≈ -2 to -4 kcal/mol, corresponding to 30-1000-fold improvement."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "cyclization", "conformational-entropy", "binding-affinity", "thermodynamics"]
---

---

id: quiz-peptide-med-chem-stapled-001
question: "An i,i+7 hydrocarbon stapled peptide using ring-closing metathesis with Grubbs catalyst introduces an (E)-olefin crosslink. What is the primary pharmacological advantage over unstapled peptide?"
options:
  - "Stapling increases aqueous solubility by exposing hydrophobic residues to solvent"
  - "Stapling stabilizes alpha-helical conformation, improving target affinity and cell permeability"
  - "Stapling reduces molecular weight below Lipinski's threshold for oral absorption"
  - "Stapling introduces a protease recognition site for controlled release"
correctIndex: 1
explanation: "Hydrocarbon staples at i,i+4 or i,i+7 positions stabilize alpha-helical secondary structure. The staple increases helicity from ~10% to > 80% in solution, improving target binding 10-100 fold. Unexpectedly, stapled peptides also show improved cell permeability (despite increased MW) due to helix-dependent membrane interaction. The all-hydrocarbon staple avoids introducing polar groups that would disrupt membrane partitioning."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "stapled-peptides", "hydrocarbon-staple", "alpha-helix", "cell-permeability"]
---

---

id: quiz-peptide-med-chem-pdc-001
question: "A peptide-drug conjugate (PDC) uses a Val-Cit-PABC self-immolative linker to attach MMAE to a targeting peptide. What is the mechanism of drug release in target cells?"
options:
  - "Acidic pH in lysosomes cleaves the Val-Cit dipeptide bond directly"
  - "Cathepsin B cleaves Val-Cit, triggering 1,6-elimination of PABC to release MMAE"
  - "Reductive environment in cytoplasm disulfide bond reduction releases MMAE"
  - "Esterases in plasma hydrolyze the linker before reaching target cells"
correctIndex: 1
explanation: "Val-Cit dipeptide is a substrate for lysosomal cathepsin B (not other cathepsins). After cleavage, para-aminobenzyloxycarbonyl (PABC) undergoes spontaneous 1,6-elimination, releasing CO₂ and the free MMAE drug. This cascade ensures drug release only in cathepsin B-expressing cells (upregulated in tumors). The selectivity of Val-Cit for cathepsin B over plasma proteases minimizes systemic toxicity."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "peptide-drug-conjugate", "self-immolative-linker", "cathepsin-B", "MMAE"]
---

---

id: quiz-peptide-med-chem-pegylation-001
question: "Site-specific PEGylation of a protein therapeutic at Lys17 (surface-exposed, pKa 9.5) versus Lys42 (partially buried, pKa 7.8) using mPEG-NHS ester at pH 7.0 preferentially modifies which residue, and why?"
options:
  - "Lys17 preferentially, because higher pKa means more protonated (reactive) form at pH 7.0"
  - "Lys42 preferentially, because lower pKa means more deprotonated (nucleophilic) form at pH 7.0"
  - "Both equally, because NHS esters react non-selectively with all primary amines"
  - "Neither, because NHS esters only react with N-terminal amines at pH 7.0"
correctIndex: 1
explanation: "NHS esters react with the unprotonated (free base) form of lysine ε-amino groups. At pH 7.0, Lys42 (pKa 7.8) has a higher fraction in the reactive unprotonated form than Lys17 (pKa 9.5). Using Henderson-Hasselbalch: fraction deprotonated = 1/(1+10^(pKa-pH)). For Lys42: 1/(1+10^0.8) = 13.7%; for Lys17: 1/(1+10^2.5) = 0.3%. Site-specific PEGylation exploits pKa differences from local microenvironment."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "PEGylation", "site-specific", "NHS-ester", "pKa"]
---

---

id: quiz-peptide-med-chem-formulation-ph-001
question: "A peptide degrades by two pathways: deamidation of Asn (base-catalyzed, optimal pH 4-5) and acid-catalyzed hydrolysis of Asp-Pro bond (optimal pH < 3). What is the optimal formulation pH to minimize total degradation?"
options:
  - "pH 2.0 to minimize deamidation"
  - "pH 5.5 to balance both degradation pathways"
  - "pH 7.4 to minimize both pathways"
  - "pH 3.5 to minimize acid hydrolysis"
correctIndex: 1
explanation: "Deamidation rate increases with pH (minimum at pH 3-5); Asp-Pro hydrolysis rate increases as pH decreases (minimum at pH 5-7). The optimal pH lies at the intersection of both rate-pH curves, typically pH 5-6 for peptides with both liabilities. Formulation buffers (acetate pH 5, histidine pH 5.5-6) are selected to minimize sum of degradation rates. This pH also maximizes peptide solubility for most sequences."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "formulation", "pH-stability", "deamidation", "hydrolysis"]
---

---

id: quiz-peptide-med-chem-lyophilization-001
question: "During lyophilization cycle design for a peptide formulation, the collapse temperature (Tc) is measured at -32°C. What is the maximum shelf temperature during primary drying, and what happens if exceeded?"
options:
  - "Maximum shelf temperature = -32°C; exceeding causes cake collapse, reduced reconstitution time, and accelerated degradation"
  - "Maximum shelf temperature = -40°C; exceeding causes crystallization of excipients"
  - "Maximum shelf temperature = -20°C; exceeding causes sublimation front collapse"
  - "Maximum shelf temperature = -32°C; exceeding causes no significant issues if chamber pressure is low"
correctIndex: 0
explanation: "During primary drying, product temperature must remain below Tc to maintain the amorphous matrix structure. Maximum shelf temperature is set so product temperature stays at or below Tc (-32°C). Exceeding Tc causes viscous flow of the freeze concentrate, resulting in cake collapse. This increases surface area heterogeneity, slows reconstitution, causes moisture redistribution, and can increase chemical degradation rates due to molecular mobility in the collapsed structure."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "lyophilization", "collapse-temperature", "formulation", "stability"]
---

---

id: quiz-peptide-med-chem-tg-prime-001
question: "A peptide lyophilized formulation has a glass transition temperature of the maximally freeze-concentrated solute (Tg') of -35°C. The formulation is dried at a product temperature of -38°C. What is the residual moisture target, and why is Tg' critical?"
options:
  - "Target moisture < 1%; Tg' defines the temperature below which the freeze concentrate is glassy and immobile"
  - "Target moisture < 5%; Tg' defines the eutectic melting point of excipients"
  - "Target moisture < 0.1%; Tg' defines the temperature at which ice crystals form"
  - "Target moisture < 3%; Tg' is unrelated to moisture content"
correctIndex: 0
explanation: "Tg' is the glass transition of the maximally freeze-concentrated phase. Below Tg', molecular mobility is negligible and degradation is minimized. Drying below Tg' (at -38°C, which is below Tg' of -35°C) maintains the glassy state during primary drying. Target residual moisture is typically < 1% for peptide lyophilizates, as moisture plasticizes the matrix, lowering Tg' and increasing degradation during storage. Moisture content is measured by Karl Fischer titration."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "Tg-prime", "lyophilization", "glass-transition", "moisture"]
---

---

id: quiz-peptide-med-chem-analytical-hplc-001
question: "A peptide shows multiple peaks on RP-HPLC (C18 column, 0.1% TFA in water/acetonitrile gradient). The main peak has retention time 18.2 min, with late-eluting shoulder at 19.1 min and early-eluting peak at 15.8 min. What do these impurities likely represent?"
options:
  - "Early peak = deamidated variant (more polar); late shoulder = oxidized Met variant (more hydrophobic)"
  - "Early peak = D-amino acid epimer; late shoulder = deletion sequence"
  - "Early peak = aggregated peptide; late shoulder = truncated sequence"
  - "Early peak = TFA adduct; late shoulder = acetonitrile complex"
correctIndex: 0
explanation: "RP-HPLC separates by hydrophobicity. Deamidation (Asn→Asp/isoAsp) introduces a negative charge, increasing polarity and reducing retention time. Oxidation of Met to Met sulfoxide increases polarity slightly, but oxidation of other residues can increase hydrophobicity. Late-eluting peaks often represent more hydrophobic variants (Met oxidation can go either way depending on context). ICH Q3 guidelines require identification and quantitation of impurities > 0.1% for peptide pharmaceuticals."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "RP-HPLC", "analytical", "deamidation", "oxidation", "impurities"]
---

---

id: quiz-peptide-med-chem-analytical-ms-001
question: "LC-MS analysis of a synthetic peptide (expected MW 1256.6 Da) shows [M+2H]²⁺ at m/z 629.3 and [M+3H]³⁺ at m/z 420.1. An additional peak at m/z 637.3 ([M+2H]²⁺) is observed. What modification does this indicate?"
options:
  - "Sodium adduct replacing one proton (+22 Da total mass shift)"
  - "Methionine oxidation to sulfoxide (+16 Da total mass shift)"
  - "Asparagine deamidation to aspartate (+1 Da total mass shift)"
  - "Disulfide-linked dimer formation"
correctIndex: 1
explanation: "The [M+2H]²⁺ peak at m/z 637.3 gives an intact mass of (637.3 × 2) - 2.016 = 1272.6 Da. ΔMW = 1272.6 - 1256.6 = 16.0 Da, consistent with a single oxidation (+15.995 Da), most commonly Met→Met sulfoxide or Trp→hydroxy-Trp. Deamidation would show [M+2H]²⁺ at 629.8 (ΔMW = +1 Da). Sodium adduct [M+H+Na]²⁺ would appear at m/z 640.3 (ΔMW = +22 Da). Confirmation requires MS/MS fragmentation to locate the modification site."
difficulty: "advanced"
tags: ["peptide-medicinal-chemistry", "mass-spectrometry", "LC-MS", "analytical", "oxidation", "impurity"]
---
