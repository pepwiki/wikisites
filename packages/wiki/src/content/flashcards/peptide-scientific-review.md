---
date: 2026-06-16
author: "Wikipept Contributors"
title: Peptide Scientific Review Flashcards
description: "Flashcards for reviewing peptide scientific literature concepts, experimental methods, and research findings."
---

# Peptide Scientific Review

## MEDICINAL CHEMISTRY

### Structure-Activity Relationships (SAR)

---
id: fc-mc-sar-1
front: "What is structure-activity relationship (SAR) analysis in peptide drug design?"
back: "SAR systematically evaluates how structural modifications affect biological activity. Key parameters: binding affinity (Kd/Ki), selectivity, metabolic stability, pharmacokinetics. Identifies pharmacophoric elements essential for activity vs those amenable to modification."
tags: ["medicinal-chemistry","SAR","drug-design"]
difficulty: "intermediate"
---

id: fc-mc-sar-2
front: "What are pharmacophoric elements in a peptide ligand?"
back: "Minimal structural features required for activity: 1) H-bond donors/acceptors at specific positions, 2) aromatic or cation-pi interactions, 3) hydrophobic bulk at defined locations, 4) charge complementarity, 5) correct spatial orientation. Disruption typically reduces potency >10-fold."
tags: ["medicinal-chemistry","pharmacophore","SAR"]
difficulty: "advanced"
---

id: fc-mc-sar-3
front: "How do alanine scanning and glycine scanning differ in SAR studies?"
back: "Alanine scanning replaces each residue with Ala to probe side chain contributions (removes functional groups, maintains backbone). Glycine scanning replaces with Gly, removing even the beta-carbon to assess backbone flexibility. Ala identifies side-chain-dependent interactions; Gly reveals backbone conformational contributions."
tags: ["medicinal-chemistry","alanine-scanning","mutagenesis"]
difficulty: "advanced"
---

id: fc-mc-sar-4
front: "What is the role of lipophilicity (LogP) in peptide drug design?"
back: "Lipophilicity affects membrane permeability, oral bioavailability, plasma protein binding, and CNS penetration. Peptides typically have negative LogP (hydrophilic). Increasing via N-methylation, D-amino acids, or fatty acid acylation improves transport and albumin binding. Excessive increases aggregation and off-target toxicity."
tags: ["medicinal-chemistry","lipophilicity","LogP","ADMET"]
difficulty: "intermediate"
---

id: fc-mc-sar-5
front: "How does peptide ring size affect receptor selectivity?"
back: "Cyclic peptide selectivity depends on ring conformation: 5-6 membered rings favor beta-turn conformations, 13-14 membered rings stabilize alpha-helical mimetics, 17-21 membered rings create rigid scaffolds. Somatostatin: 14-membered octreotide preferentially binds sst2. Ring strain and torsional angles dictate selectivity."
tags: ["medicinal-chemistry","cyclic-peptides","selectivity"]
difficulty: "expert"
---

id: fc-mc-sar-6
front: "What is match molecular pair (MMP) analysis in peptide SAR?"
back: "Compares pairs of peptides differing by a single modification, correlating structural change with activity differences. Reveals: additive vs cooperative effects, position-dependent sensitivity, non-linear SAR cliffs. MMP databases enable predictive modeling combined with computational descriptors."
tags: ["medicinal-chemistry","MMP","SAR","data-analysis"]
difficulty: "expert"
---

id: fc-mc-sar-7
front: "How do you determine the minimum effective sequence for a bioactive peptide?"
back: "Truncation studies: systematically remove residues from N- and C-termini while monitoring activity. Approach: start with full-length, truncate both ends independently, identify shortest sequence retaining >50% activity, optimize truncated analogs. Examples: oxytocin (9 to 8 residues), TRH (10 to 3)."
tags: ["medicinal-chemistry","truncation","minimum-sequence"]
difficulty: "intermediate"
---

id: fc-mc-sar-8
front: "What are activity cliffs in peptide SAR?"
back: "Structurally similar peptide pairs with dramatically different potencies (>100-fold). Indicate: critical pharmacophoric switches, non-additive SAR (cooperative interactions), potential for potency optimization. Cliffs often involve charge reversal, stereochemical inversion, or loss of key hydrogen bonds."
tags: ["medicinal-chemistry","activity-cliffs","potency"]
difficulty: "advanced"
---

id: fc-mc-sar-9
front: "How does chiral inversion (D to L amino acid substitution) affect peptide activity?"
back: "D-amino acid substitution: preserves side chain chemistry but inverts backbone stereochemistry, disrupts secondary structures, enhances protease resistance, alters receptor binding geometry. D-Phe at position 2 of enkephalins increases mu-selectivity. Trade-off: reduced activity at some receptors, enhanced metabolic stability."
tags: ["medicinal-chemistry","D-amino-acids","stereochemistry"]
difficulty: "advanced"
---

id: fc-mc-sar-10
front: "What QSAR models are most applicable to peptide drug design?"
back: "Methods: descriptor-based (WHIM, E-state), 3D-QSAR (CoMFA, CoMSIA), machine learning (Random Forest, deep neural networks). Challenges: large chemical space, conformational flexibility, limited datasets. Best practice: combine with free-energy perturbation (FEP) for lead optimization."
tags: ["medicinal-chemistry","QSAR","machine-learning"]
difficulty: "expert"
---

id: fc-mc-bioiso-11
front: "What is bioisosteric replacement and why is it important for peptide drugs?"
back: "Substitutes functional groups with structurally different but pharmacologically equivalent groups to: improve metabolic stability, enhance binding affinity, reduce toxicity, modify physicochemical properties. Classical: -COOH to tetrazole, -NH- to -O-. Non-classical: amide to ester, guanidinium to amidine."
tags: ["medicinal-chemistry","bioisosteres","drug-design"]
difficulty: "intermediate"
---

id: fc-mc-bioiso-12
front: "How does the amide-to-ester bioisosteric replacement affect peptide properties?"
back: "Ester (depsipeptide) modification: removes N-H H-bond donor, increases ester bond hydrolysis, enhances membrane permeability, may maintain binding if H-bond donor not critical. Challenge: esterases cleave rapidly in vivo. Solution: beta-hydroxy acid replacements or electron-withdrawing groups."
tags: ["medicinal-chemistry","depsipeptides","ester"]
difficulty: "advanced"
---

id: fc-mc-bioiso-13
front: "What are peptoid oligomers and how do they differ from peptides?"
back: "N-substituted glycine oligomers with side chains on nitrogen instead of alpha-carbon. Properties: protease-resistant (no NH for recognition), cell-permeable, achiral, flexible backbone. Adopt polyproline II helices. Applications: antimicrobial peptoids, GPCR ligands. Trade-off: reduced target affinity due to flexibility."
tags: ["medicinal-chemistry","peptoids","peptidomimetics"]
difficulty: "advanced"
---

id: fc-mc-bioiso-14
front: "How does N-methylation serve as a bioisosteric strategy in peptides?"
back: "Removes amide N-H (eliminates H-bond donor), increases lipophilicity, enhances protease resistance, restricts backbone conformation. Cyclosporine A uses 7 N-methylations. Position-specific effects on binding, altered secondary structure, impact on solubility. Over-methylation (>3) often reduces activity."
tags: ["medicinal-chemistry","N-methylation","protease-resistance"]
difficulty: "advanced"
---

id: fc-mc-bioiso-15
front: "What are examples of successful bioisosteric replacements in approved peptide drugs?"
back: "Exenatide: D-Phe at position 25 (protease-resistant). Octreotide: D-Trp replacing L-Trp (sst2 selectivity + stability). Desmopressin: 1-deamino-D-Arg8 (8x longer half-life). Semaglutide: Aib at position 8 (DPP-4 resistance) + fatty diacid acylation. Liraglutide: Arg34 + fatty acid (albumin binding)."
tags: ["medicinal-chemistry","approved-drugs","case-studies"]
difficulty: "intermediate"
---

id: fc-mc-bioiso-16
front: "How do you design bioisosteric replacements for tyrosine in peptides?"
back: "Replacements: Phenylalanine (remove OH), 4-fluorophenylalanine (altered pKa), 4-methylphenylalanine (hydrophobic), pyridylalanine (heterocyclic), DOPA (catecholamine), biphenylalanine (extended aromatic). Select based on receptor H-bond network and metabolic liability at phenolic OH."
tags: ["medicinal-chemistry","tyrosine","bioisosteres"]
difficulty: "advanced"
---

id: fc-mc-bioiso-17
front: "What is the concept of privileged scaffolds in peptide bioisosteric design?"
back: "Molecular frameworks that reliably bind multiple biological targets. In peptides: beta-turn mimetics (RGD), diketopiperazines (constrained dipeptides), benzodiazepinediones (CCK ligands), cyclic ureas (aspartyl protease inhibitors). Maintain pharmacophoric geometry with drug-like properties."
tags: ["medicinal-chemistry","privileged-scaffolds","scaffold-hopping"]
difficulty: "expert"
---

id: fc-mc-bioiso-18
front: "How do retro-inverso peptides function as bioisosteres?"
back: "Reverse sequence direction (C to N) and invert stereochemistry (D-amino acids). Properties: side chain topology preserved, protease-resistant, reduced immunogenicity. Challenge: difficult synthesis, non-standard topology. Successful examples: melanocortin agonists, RGD mimetics."
tags: ["medicinal-chemistry","retro-inverso","D-amino-acids"]
difficulty: "advanced"
---

id: fc-mc-bioiso-19
front: "What strategies exist for bioisosteric replacement of disulfide bonds?"
back: "Disulfide mimetics: lactam bridges (Asp/Lys, Glu/Lys), triazole linkers (click chemistry), hydrocarbon staples, thioether bridges (Cys alkylation), olefin metathesis, all-hydrocarbon crosslinks. Applications: stabilize alpha-helices, maintain cyclic topology. Redox-independent stability."
tags: ["medicinal-chemistry","disulfide","crosslinks"]
difficulty: "advanced"
---

id: fc-mc-bioiso-20
front: "How do you evaluate the success of a bioisosteric replacement?"
back: "Criteria: activity retention (within 10-fold), selectivity maintained, improved metabolic stability, enhanced physicochemical properties, reduced off-target liabilities. Use matched molecular pair analysis. Acceptable: 10x potency loss if >5x stability gain. Red flag: loss of selectivity."
tags: ["medicinal-chemistry","bioisosteres","evaluation"]
difficulty: "intermediate"
---

id: fc-mc-conform-21
front: "What is conformational restriction and why is it important for peptide drugs?"
back: "Limits conformational freedom to favor the bioactive conformation. Benefits: increased potency (reduced entropic penalty), enhanced selectivity, improved metabolic stability, better oral bioavailability. Strategies: cyclization, N-methylation, D-amino acids, side-chain crosslinks."
tags: ["medicinal-chemistry","conformational-restriction","rigidity"]
difficulty: "intermediate"
---

id: fc-mc-conform-22
front: "How does macrocyclization restrict peptide conformation?"
back: "Constrains peptides via covalent bonds connecting non-adjacent residues. Types: lactam bonds, lactone bonds, disulfide bridges, triazole click chemistry, olefin metathesis. Ring size: 14-membered favor beta-turns, 21-membered constrain alpha-helices. Examples: octreotide, lanreotide."
tags: ["medicinal-chemistry","macrocyclization","ring-conformation"]
difficulty: "advanced"
---

id: fc-mc-conform-23
front: "What is the relationship between peptide ring conformation and receptor binding?"
back: "Ring conformation determines pharmacophoric group presentation: beta-turn (positions i and i+2 project same face - somatostatin receptors), gamma-turn (positions i and i+1 - RGD integrins), 3(10)-helix (three residues per turn - neurotensin binding). Receptor-specific conformations identified via NMR and MD simulations."
tags: ["medicinal-chemistry","ring-conformation","receptor-binding"]
difficulty: "expert"
---

id: fc-mc-conform-24
front: "How do lactam bridges constrain peptide conformation?"
back: "Connect side-chain carboxyl (Asp/Glu) with amine (Lys/Orn). Effects: restrict phi/psi angles to turn-like geometry, eliminate H-bond donor/acceptor, increase rigidity 5-10 fold. Position-dependent: i to i+3 favors helical, i to i+4 favors 3(10)-helices. Example: oxytocin analogs with lactam bridges."
tags: ["medicinal-chemistry","lactam-bridge","helix"]
difficulty: "advanced"
---

id: fc-mc-conform-25
front: "What is helix stabilization and how is it achieved in peptide design?"
back: "Increases alpha-helical content through: side-chain staples (hydrocarbon links i to i+4), salt bridges (Glu-Lys pairs), N-cap and C-cap motifs, N-methylation at solvent-exposed positions. Stapled peptides (Verdine): i,i+7 or i,i+4 hydrocarbon links. Benefits: cell permeability, protease resistance."
tags: ["medicinal-chemistry","helix-stapling","alpha-helix"]
difficulty: "advanced"
---

id: fc-mc-conform-26
front: "How does proline constrain peptide backbone conformation?"
back: "Cyclic pyrrolidine ring restricts phi angle (~-60 degrees), absent amide N-H, cis/trans isomerization at X-Pro bonds (slow). Position 2 of beta-turns enforces turn geometry. N-methylated proline (sarcosine) adds constraint. Drawback: kinks helices, disrupts beta-sheets."
tags: ["medicinal-chemistry","proline","turn","conformation"]
difficulty: "intermediate"
---

id: fc-mc-conform-27
front: "What computational methods predict peptide bioactive conformations?"
back: "Molecular dynamics (MD) with explicit solvent, replica exchange MD (REMD), metadynamics for free energy landscapes, Rosetta FlexPepDock, restrained ensemble methods using NMR data. Challenge: large conformational space, force field accuracy. Best practice: combine with experimental NMR validation."
tags: ["medicinal-chemistry","molecular-dynamics","conformation-prediction"]
difficulty: "expert"
---

id: fc-mc-conform-28
front: "How do beta-turn mimetics restrict peptide conformation?"
back: "D-Pro-L-Pro template (enforces type II' turn), dipeptide surrogates (Aib), aromatic scaffolds (indane, benzodiazepine), lactam-bridged dipeptides, triazole-containing turn mimics. RGD sequence in type II' turn binds integrins. Mimetics reduce conformational entropy (~5 kcal/mol advantage)."
tags: ["medicinal-chemistry","beta-turn","mimetics","RGD"]
difficulty: "advanced"
---

id: fc-mc-conform-29
front: "What is the impact of peptide backbone flexibility on oral bioavailability?"
back: "Flexible peptides: higher desolvation penalty, lower passive permeability, more susceptible to enzymatic degradation. Rigid peptides: pre-organized for membrane crossing, fewer desolvation events, resist proteases. Lipinski adapted: macrocyclic peptides >10 Da but <1000 Da with 5-10 HBD can cross membranes."
tags: ["medicinal-chemistry","flexibility","oral-bioavailability"]
difficulty: "expert"
---

id: fc-mc-conform-30
front: "How does NMR spectroscopy determine peptide bioactive conformations?"
back: "NOE provides distance constraints (<5 A), J-coupling constants determine dihedral angles, chemical shift perturbations map binding interfaces, residual dipolar couplings provide long-range orientation. Structure: simulated annealing with NOE constraints. Validation: compare with X-ray or cryo-EM."
tags: ["medicinal-chemistry","NMR","NOE","structure-determination"]
difficulty: "expert"
---

id: fc-mc-backbone-31
front: "What are the main types of peptide backbone modifications?"
back: "N-methylation, thioamide substitution, retro-inverso, peptoid (N-alkylation), beta-peptide (extra CH2), oligourea (urea linkage), hydrazide (N-N bond). Each alters H-bonding, protease susceptibility, conformational preferences, and pharmacokinetics."
tags: ["medicinal-chemistry","backbone-modification","peptidomimetics"]
difficulty: "intermediate"
---

id: fc-mc-backbone-32
front: "How do thioamide substitutions affect peptide properties?"
back: "Thioamide (C=S for C=O): weaker H-bond acceptor, longer bond length (1.7 A vs 1.2 A), increased polarizability, enhanced membrane permeability. Destabilizes helices, stabilizes turns. Reduced protease cleavage. Applications: protease-resistant analogs, fluorescent probes."
tags: ["medicinal-chemistry","thioamide","isostere"]
difficulty: "advanced"
---

id: fc-mc-backbone-33
front: "What are oligourea peptidomimetics and how do they compare to peptides?"
back: "Have -NH-C(=NH)-NH- replacing -NH-C(=O)-. Properties: helical propensity (11-helix), cell-permeable, protease-resistant, increased rigidity. Advantages: higher bioavailability, reduced immunogenicity. Disadvantages: harder synthesis, different receptor recognition."
tags: ["medicinal-chemistry","oligoureas","peptidomimetics"]
difficulty: "expert"
---

id: fc-mc-backbone-34
front: "How does backbone elongation (beta- and gamma-amino acids) affect peptide structure?"
back: "Beta-amino acids: 14-helix propensity. Gamma-amino acids: 12-helix. Mixed beta/gamma: tunable helix. Benefits: protease-resistant, cell-permeable, pre-organized helices. Applications: antimicrobial beta-peptides, somatostatin analogs."
tags: ["medicinal-chemistry","beta-amino-acids","gamma-amino-acids"]
difficulty: "advanced"
---

id: fc-mc-backbone-35
front: "What is the effect of removing peptide bond planarity on drug properties?"
back: "Peptide bond has partial double-bond character (8-20 kcal/mol rotation barrier). Modifications: N-alkylation (reduces resonance), thioamide (weaker resonance), proline (rigid ring). Effects: increased rotation, altered cis/trans isomerization. Advantage: faster receptor binding."
tags: ["medicinal-chemistry","peptide-bond","planarity"]
difficulty: "advanced"
---

id: fc-mc-backbone-36
front: "How do you introduce backbone modifications during solid-phase synthesis?"
back: "SPPS-compatible: Fmoc-amino acid analogs (commercially available), on-resin modification (thionation with Lawesson's reagent), segment condensation, native chemical ligation. Challenges: lower coupling efficiency for hindered monomers. Solution: custom Fmoc-amino acid synthesis."
tags: ["medicinal-chemistry","SPPS","backbone-modification"]
difficulty: "advanced"
---

id: fc-mc-backbone-37
front: "What are peptidomimetic foldamers and their therapeutic applications?"
back: "Synthetic oligomers adopting stable secondary structures. Classes: beta-peptides (14-helix), peptoids (polyproline II), oligoureas (11-helix), aromatic oligoamides. Applications: antimicrobial agents, protein-protein interaction inhibitors, enzyme inhibitors. Predictable folding enables rational design."
tags: ["medicinal-chemistry","foldamers","secondary-structure"]
difficulty: "expert"
---

id: fc-mc-backbone-38
front: "How does retro-inverso backbone modification affect protease resistance?"
back: "Reverse sequence (C to N) with D-amino acids. Protease resistance: D-amino acids not recognized (L-specificity), reversed amide bond polarity, reduced planarity. Result: >100x slower degradation. Challenge: conformational differences despite preserved side-chain presentation."
tags: ["medicinal-chemistry","retro-inverso","protease-resistance"]
difficulty: "intermediate"
---

id: fc-mc-backbone-39
front: "What is the role of backbone hydrogen bonding in peptide conformation stability?"
back: "Alpha-helix (i to i+4), beta-sheet (inter-strand), 3(10)-helix (i to i+3), beta-turn (i to i+3 in 10-membered ring). Disruption for permeability: replace C=O with thioamide, remove N-H via N-methylation. Balance: maintain for target affinity, remove for permeability."
tags: ["medicinal-chemistry","hydrogen-bonding","secondary-structure"]
difficulty: "advanced"
---

id: fc-mc-backbone-40
front: "How do you balance backbone rigidity with synthetic accessibility?"
back: "Rigid macrocycles potent but hard to synthesize; simple modifications (N-methylation) accessible but less constraining. Strategy: computational pre-screening, click chemistry for macrocyclization, combine strategies (N-methyl + lactam). Invest in complex macrocycles for validated targets."
tags: ["medicinal-chemistry","rigidity","synthesis","strategy"]
difficulty: "intermediate"
---

id: fc-mc-sidechain-41
front: "What are common side chain modifications in peptide medicinal chemistry?"
back: "Halogenation (F, Cl), methylation, hydroxylation, phosphorylation, acetylation, prenylation, fatty acid acylation, PEGylation, non-natural amino acid incorporation, bioconjugation. Each alters lipophilicity, H-bonding, steric bulk, stability, and target engagement."
tags: ["medicinal-chemistry","side-chain","modification"]
difficulty: "intermediate"
---

id: fc-mc-sidechain-42
front: "How does fluorination of aromatic side chains affect peptide properties?"
back: "Increases lipophilicity (LogP +0.14 per F), reduces electron density (alters pi-stacking), blocks oxidative metabolism (C-F bond stronger), enhances permeability. Weakens H-bond to fluorine, strengthens C-F...H-N, alters ring electronics. Applications: Phe to 3-F-Phe at metabolic hotspots."
tags: ["medicinal-chemistry","fluorination","aromatic"]
difficulty: "advanced"
---

id: fc-mc-sidechain-43
front: "What are the effects of side chain hydroxylation on peptide function?"
back: "Introduces H-bond donor/acceptor, increases polarity (reduces LogP ~-0.5), creates new binding interactions, serves as metabolic handle. Natural: 4-Hyp in collagen (stabilizes triple helix). Synthetic: Ser to Thr. Challenge: hydroxyl groups are metabolic liabilities (glucuronidation, sulfation)."
tags: ["medicinal-chemistry","hydroxylation","collagen"]
difficulty: "advanced"
---

id: fc-mc-sidechain-44
front: "How does PEGylation modify peptide pharmacokinetics?"
back: "Attach PEG chains to amino groups (Lys, N-terminus) or thiol (Cys). Effects: increases hydrodynamic radius (reduces renal clearance), shields from proteases, reduces immunogenicity, decreases receptor binding (steric shield). Sizes: 5-40 kDa. Trade-off: longer PEG = longer half-life but reduced potency."
tags: ["medicinal-chemistry","PEGylation","pharmacokinetics"]
difficulty: "intermediate"
---

id: fc-mc-sidechain-45
front: "What is the effect of acylation (fatty acid attachment) on peptide drugs?"
back: "Increases albumin binding (extends half-life), enhances membrane permeability, promotes receptor binding via lipid raft localization. Examples: semaglutide (C-18 fatty diacid), liraglutide (C-16 fatty acid). Site: Lys side chain. Albumin binding extends half-life from hours to days."
tags: ["medicinal-chemistry","acylation","albumin"]
difficulty: "intermediate"
---

id: fc-mc-sidechain-46
front: "How do non-natural amino acids expand the medicinal chemistry toolkit?"
back: "Aib (conformationally rigid), Nal (bulky aromatic), Cit (Arg isostere), hArg (extended Arg), Tle (tert-Leu, steric bulk), Cha (cyclohexyl-Ala), Bip (biphenyl-Ala). Applications: conformational restriction, hydrophobic binding, charge modulation, metabolic stability."
tags: ["medicinal-chemistry","non-natural-amino-acids","Aib"]
difficulty: "advanced"
---

id: fc-mc-sidechain-47
front: "How does side chain branching affect peptide receptor selectivity?"
back: "Affects steric complementarity with receptor pocket, hydrophobic contact surface, rotamer population. Leu vs Ile show different selectivity at opioid receptors. Val vs Ala: branching introduces steric clashes with off-targets but improves selectivity. Tle: extreme branching for specific pockets."
tags: ["medicinal-chemistry","branching","selectivity"]
difficulty: "advanced"
---

id: fc-mc-sidechain-48
front: "What is bioconjugation and how is it used in peptide drug design?"
back: "Covalent attachment of functional molecules. Methods: maleimide-thiol (Cys), NHS-ester (Lys), click chemistry (azide-alkyne), photoreactive crosslinkers. Applications: PEGylation, antibody conjugation (targeting), fluorophore labeling, radiolabeling (PET/SPECT), toxin conjugation (ADCs)."
tags: ["medicinal-chemistry","bioconjugation","ADC"]
difficulty: "advanced"
---

id: fc-mc-sidechain-49
front: "How do you optimize side chain lipophilicity for membrane permeability?"
back: "Balance LogP between -1 and +3 for oral peptides, add lipophilic groups at solvent-exposed positions, use fatty acid acylation, consider prodrug approaches. Modifications: Phe for polar residues, Aib for steric protection, N-methyl at backbone. Lipinski adapted: HBD <=5, HBA <=10, MW <1000 Da."
tags: ["medicinal-chemistry","lipophilicity","permeability"]
difficulty: "advanced"
---

id: fc-mc-sidechain-50
front: "What are the trade-offs of side chain modification in peptide drug design?"
back: "Hydrophobic modifications increase permeability but reduce solubility; bulky groups enhance selectivity but may reduce potency; charged groups improve solubility but limit membrane crossing; PEGylation extends half-life but reduces target binding. Prioritize based on therapeutic need."
tags: ["medicinal-chemistry","trade-offs","drug-design"]
difficulty: "intermediate"
---

id: fc-bio-gpcr-51
front: "What are G protein-coupled receptors (GPCRs) and their relevance to peptide drugs?"
back: "7-transmembrane domain receptors signaling through heterotrimeric G proteins. ~800 members, ~35% of approved drugs target GPCRs. Peptide ligands: neuropeptides (NPY, orexin), hormone peptides (GLP-1, secretin), chemokines. Signaling: ligand binding to conformational change to G protein activation."
tags: ["biology","GPCR","receptor","signaling"]
difficulty: "intermediate"
---

id: fc-bio-gpcr-52
front: "Describe the G protein activation cycle for peptide hormone receptors."
back: "Peptide binds to GPCR conformational change (TM6 outward), G-alpha GDP/GTP exchange, G-alpha-GTP dissociates from G-beta-gamma, G-alpha-GTP activates effectors (AC, PLC), G-beta-gamma activates ion channels, GTP hydrolysis (GTPase + RGS), G-alpha-GDP reassociates, receptor returns to inactive state."
tags: ["biology","G-protein","activation-cycle"]
difficulty: "advanced"
---

id: fc-bio-gpcr-53
front: "What is biased agonism and how does it apply to peptide drugs?"
back: "Ligands preferentially activate specific pathways (G protein vs beta-arrestin) at the same receptor. Examples: biased mu-opioid agonists (G protein-biased for analgesia, less beta-arrestin for respiratory depression). Different receptor conformations stabilize different pathways. Advantage: separate efficacy from side effects."
tags: ["biology","biased-agonism","GPCR"]
difficulty: "expert"
---

id: fc-bio-gpcr-54
front: "How does receptor desensitization affect peptide drug efficacy?"
back: "Mechanisms: GRK-mediated phosphorylation, beta-arrestin recruitment (internalization), receptor downregulation (degradation), uncoupling from G proteins. Time course: acute (minutes), chronic (hours-days). Impact: tachyphylaxis (tolerance). Solutions: pulsatile dosing, biased agonists, allosteric modulators."
tags: ["biology","desensitization","tolerance"]
difficulty: "advanced"
---

id: fc-bio-gpcr-55
front: "What is the role of beta-arrestin in GPCR signaling?"
back: "Functions: desensitization (blocks G protein coupling), internalization (clathrin-mediated endocytosis), signaling scaffold (activates MAPK, ERK), ubiquitination (receptor trafficking). Arrestin-biased ligands promote internalization without G protein signaling. Example: angiotensin II type 1 receptor biased ligands."
tags: ["biology","beta-arrestin","GPCR","internalization"]
difficulty: "expert"
---

id: fc-bio-gpcr-56
front: "How do peptide agonists and antagonists differ in their GPCR pharmacology?"
back: "Agonists: stabilize active conformation, activate G proteins, intrinsic activity (alpha = 1.0 full). Antagonists: stabilize inactive conformation, block G protein activation, no signaling (alpha = 0). Partial agonists: intermediate efficacy (0 < alpha < 1). Inverse agonists: reduce constitutive activity (alpha < 0)."
tags: ["biology","agonist","antagonist","pharmacology"]
difficulty: "intermediate"
---

id: fc-bio-gpcr-57
front: "What is allosteric modulation of GPCRs by peptide ligands?"
back: "Bind distinct from orthosteric site. PAMs (enhance agonist response), NAMs (reduce response), SAMs (no effect alone but block modulators). Advantages: preserve spatial/temporal signaling, increased selectivity, ceiling effect (safety). Examples: cinacalcet (CaSR PAM), maraviroc (CCR5 NAM)."
tags: ["biology","allosteric-modulation","GPCR","PAM"]
difficulty: "expert"
---

id: fc-bio-gpcr-58
front: "How does receptor dimerization affect peptide drug pharmacology?"
back: "Homodimers (same receptor) and heterodimers (different receptors). Effects: altered ligand binding, modified signaling (new pathways), changed trafficking. Examples: GLP-1R/GIPR heterodimers (dual agonists), mu/delta opioid heterodimers. Some peptide drugs may target dimer-specific conformations."
tags: ["biology","dimerization","heterodimer","GPCR"]
difficulty: "expert"
---

id: fc-bio-gpcr-59
front: "What are the key GPCR signaling cascades relevant to metabolic peptide drugs?"
back: "GLP-1R to Gs to AC to cAMP to PKA to insulin secretion. GIPR to Gs to cAMP to lipogenesis. Glucagon receptor to Gs to cAMP to hepatic glucose output. FFAR1/4 to Gq to PLC to Ca2+ to insulin secretion. Therapeutic: GLP-1 agonists activate cAMP/PKA; tirzepatide engages multiple pathways."
tags: ["biology","metabolic","GLP-1","signaling-cascade"]
difficulty: "advanced"
---

id: fc-bio-gpcr-60
front: "How do you measure GPCR activation by peptide ligands?"
back: "cAMP accumulation (HTRF, ELISA), calcium flux (Fluo-4, aequorin), beta-arrestin recruitment (BRET/FRET), GTP-gamma-S binding, reporter gene assays (CRE-luciferase). Functional: ERK phosphorylation, receptor internalization. Multiplexed assays capture pathway bias."
tags: ["biology","GPCR","assay","cAMP"]
difficulty: "advanced"
---

id: fc-bio-enzyme-61
front: "What is competitive enzyme inhibition and how do peptide inhibitors work?"
back: "Inhibitor binds active site, competes with substrate. Kinetics: Vmax unchanged, Km increases. Peptide examples: ACE inhibitors (captopril), proteasome inhibitors (bortezomib), HCV NS3 protease inhibitors. Design: transition-state analogs (higher affinity)."
tags: ["biology","competitive-inhibition","enzyme"]
difficulty: "intermediate"
---

id: fc-bio-enzyme-62
front: "How does uncompetitive inhibition differ from competitive inhibition?"
back: "Binds only ES complex, not free enzyme. Kinetics: both Vmax and Km decrease. Examples: some aspartyl protease inhibitors. Inhibitor binds allosteric site created by substrate binding. Advantage: inhibition increases with substrate concentration."
tags: ["biology","uncompetitive-inhibition","kinetics"]
difficulty: "advanced"
---

id: fc-bio-enzyme-63
front: "What is non-competitive inhibition and how is it achieved with peptides?"
back: "Binds both free enzyme and ES complex with equal affinity. Kinetics: Vmax decreases, Km unchanged. Examples: chelating peptides (metalloenzyme inhibitors), allosteric kinase inhibitors. Mixed inhibition: binds E and ES with different affinities (Km may change)."
tags: ["biology","non-competitive-inhibition","allosteric"]
difficulty: "advanced"
---

id: fc-bio-enzyme-64
front: "What are transition-state analog inhibitors and why are they potent?"
back: "Mimic high-energy reaction intermediates. Enzymes bind transition states 10^6-10^12 times tighter than substrates. Examples: HIV protease inhibitors (hydroxyethylamine), renin inhibitors. Design: replace scissile bond with non-hydrolyzable tetrahedral mimic."
tags: ["biology","transition-state","enzyme-inhibition"]
difficulty: "expert"
---

id: fc-bio-enzyme-65
front: "How do aspartyl protease inhibitors function?"
back: "Two catalytic aspartates activate water. Inhibitor design: hydroxyethylene isostere, statine, hydroxyethylamine. Key: inhibitor hydroxyl coordinates with catalytic aspartates. Examples: saquinavir, ritonavir (HIV), aliskiren (renin)."
tags: ["biology","aspartyl-protease","inhibitor"]
difficulty: "advanced"
---

id: fc-bio-enzyme-66
front: "What are matrix metalloproteinase (MMP) inhibitors and their clinical status?"
back: "Zinc-dependent endopeptidases. Inhibitors: peptidomimetic zinc binders (hydroxamic acid), collagen mimetic peptides. Clinical failure: broad-spectrum inhibitors (marimastat) lacked selectivity. Current: selective MMP-2/MMP-9 for cancer, MMP-13 for osteoarthritis."
tags: ["biology","MMP","inhibitor","zinc-protease"]
difficulty: "advanced"
---

id: fc-bio-enzyme-67
front: "How do serine protease inhibitors work and what are peptide examples?"
back: "Catalytic triad (Ser-His-Asp). Inhibitors: serpins (suicide substrates - alpha1-antitrypsin), Kunitz-type (aprotinin), peptide chloromethyl ketones (irreversible). Therapeutic: bivalirudin (thrombin), nafamostat (broad-spectrum)."
tags: ["biology","serine-protease","inhibitor"]
difficulty: "advanced"
---

id: fc-bio-enzyme-68
front: "What is the mechanism of proteasome inhibition by peptide drugs?"
back: "26S complex degrades ubiquitinated proteins. Subunits: beta1 (caspase-like), beta2 (trypsin-like), beta5 (chymotrypsin-like). Bortezomib (reversible boronic acid), carfilzomib (irreversible epoxyketone), ixazomib (oral). Peptide backbone coordinates with catalytic threonine. Therapeutic: multiple myeloma."
tags: ["biology","proteasome","inhibitor","bortezomib"]
difficulty: "expert"
---

id: fc-bio-enzyme-69
front: "How do dipeptidyl peptidase-4 (DPP-4) inhibitors function?"
back: "Cleaves N-terminal dipeptide from GLP-1 and GIP. Gliptins: sitagliptin, saxagliptin, vildagliptin. Reversible covalent bond to active site Ser630. Increase active GLP-1 by 2-3x, enhance glucose-dependent insulin secretion. Clinical: type 2 diabetes (oral, once daily)."
tags: ["biology","DPP-4","gliptins","GLP-1"]
difficulty: "intermediate"
---

id: fc-bio-enzyme-70
front: "What are the kinetic parameters that define enzyme inhibition potency?"
back: "Ki (inhibition constant - lower = more potent), IC50 (50% inhibition at fixed [S]), kcat/Km (catalytic efficiency), residence time (1/koff). Ki = IC50/(1 + [S]/Km) for competitive. Metrics: Ki < 1 nM = potent, < 100 nM = good lead."
tags: ["biology","kinetics","Ki","IC50"]
difficulty: "intermediate"
---

id: fc-bio-signal-71
front: "What are the main signal transduction pathways activated by peptide hormones?"
back: "cAMP/PKA (Gs-coupled: glucagon, secretin), PLC/IP3/DAG/PKC (Gq-coupled: oxytocin, CCK), MAPK/ERK (beta-arrestin-mediated), PI3K/Akt (metabolic: insulin, IGF-1), JAK/STAT (cytokine-like: leptin), Wnt/beta-catenin. Pathway selection determines proliferation vs differentiation."
tags: ["biology","signal-transduction","pathway","cAMP"]
difficulty: "intermediate"
---

id: fc-bio-signal-72
front: "How does the cAMP/PKA pathway mediate peptide hormone action?"
back: "GPCR activates Gs, Gs stimulates adenylyl cyclase, AC converts ATP to cAMP, cAMP activates PKA, PKA phosphorylates CREB (gene expression), ion channels, metabolic enzymes. Downstream: glucose metabolism, calcium handling, insulin secretion. Termination: phosphodiesterases."
tags: ["biology","cAMP","PKA","CREB"]
difficulty: "advanced"
---

id: fc-bio-signal-73
front: "What is the role of calcium signaling in peptide hormone secretion?"
back: "Gq-coupled receptors activate PLC to IP3 to ER calcium release, store-operated calcium entry, voltage-gated calcium channels. Calcium triggers SNARE complex to vesicle fusion to exocytosis. Examples: insulin secretion (GLP-1 enhances influx), oxytocin (calcium-dependent milk ejection)."
tags: ["biology","calcium","secretion","exocytosis"]
difficulty: "advanced"
---

id: fc-bio-signal-74
front: "How do MAPK/ERK pathways transmit peptide receptor signals?"
back: "Receptor activates Ras (GTP loading), Ras recruits Raf (MAPKKK), Raf phosphorylates MEK (MAPKK), MEK phosphorylates ERK (MAPK), ERK translocates to nucleus, phosphorylates transcription factors. Examples: EGF to proliferation, angiotensin II to hypertrophy."
tags: ["biology","MAPK","ERK","Ras"]
difficulty: "advanced"
---

id: fc-bio-signal-75
front: "What is the PI3K/Akt pathway and its role in metabolic peptide signaling?"
back: "RTK (insulin, IGF-1R) activates PI3K, PI3K converts PIP2 to PIP3, PIP3 recruits Akt, Akt phosphorylates GSK3 (glycogen), FOXO (gene expression), AS160 (GLUT4 translocation). Metabolic effects: glucose uptake, lipogenesis, protein synthesis. Negative regulation: PTEN."
tags: ["biology","PI3K","Akt","insulin"]
difficulty: "advanced"
---

id: fc-bio-signal-76
front: "How do peptide hormones activate the JAK/STAT pathway?"
back: "Peptide binds cytokine receptor, receptor dimerizes, JAKs transphosphorylate, JAKs phosphorylate receptor tyrosines, STATs bind via SH2 domains, JAKs phosphorylate STATs, STATs dimerize, translocate to nucleus, activate transcription. Examples: leptin (JAK2/STAT3), growth hormone (JAK2/STAT5)."
tags: ["biology","JAK","STAT","leptin"]
difficulty: "expert"
---

id: fc-bio-signal-77
front: "What are second messengers and their roles in peptide signaling?"
back: "cAMP (PKA activation), cGMP (PKG, smooth muscle relaxation), IP3 (calcium release), DAG (PKC activation), Ca2+ (calmodulin, exocytosis), PIP3 (Akt recruitment), arachidonic acid (eicosanoids). Spatial: lipid raft localization. Duration: ms (Ca2+) to minutes (cAMP)."
tags: ["biology","second-messenger","cAMP","calcium"]
difficulty: "intermediate"
---

id: fc-bio-signal-78
front: "How does receptor internalization affect peptide drug pharmacodynamics?"
back: "Beta-arrestin-mediated clathrin endocytosis, caveolae-mediated, pinocytosis. Impact: signal termination (downregulation), signalosome formation (sustained endosomal signaling), recycling (resensitization), degradation (long-term downregulation). Tachyphylaxis from chronic agonist exposure."
tags: ["biology","internalization","endocytosis"]
difficulty: "expert"
---

id: fc-bio-signal-79
front: "What is cross-talk between GPCR and RTK signaling pathways?"
back: "Transactivation (GPCR activates RTK via metalloproteinase), shared downstream effectors (cAMP, MAPK), scaffold protein interactions, beta-arrestin-mediated RTK signaling. Examples: EGF receptor transactivation by angiotensin II. Implications: peptide drugs may have indirect effects through unrelated pathways."
tags: ["biology","cross-talk","GPCR","RTK"]
difficulty: "expert"
---

id: fc-bio-signal-80
front: "How do scaffold proteins organize peptide receptor signaling?"
back: "AKAP localize PKA near substrates, beta-arrestin scaffolds MAPK, KSR scaffolds MAPK cascade. Functions: increase specificity (prevent cross-talk), enhance speed (reduce diffusion), enable amplification. Peptide drugs may target scaffold interactions (PPI disruptors)."
tags: ["biology","scaffold","signaling"]
difficulty: "expert"
---

id: fc-bio-metab-81
front: "What are the main pathways of peptide drug metabolism?"
back: "Proteolysis (primary - exo/endopeptidases), chemical degradation (oxidation, deamidation), hepatic extraction, renal filtration/reabsorption. Key enzymes: DPP-4, NEP, ACE, cathepsins, CYP450 (minimal). Rate-limiting: proteolysis at specific 'metabolic hotspots'."
tags: ["biology","metabolism","proteolysis","DPP-4"]
difficulty: "intermediate"
---

id: fc-bio-metab-82
front: "How do endopeptidases degrade peptide drugs?"
back: "Metalloendopeptidases (NEP/CD10 - hydrophobic), serine proteases (trypsin, chymotrypsin), cysteine proteases (cathepsins), aspartyl proteases (pepsin). Specificity: trypsin (Arg/Lys), chymotrypsin (Phe/Trp/Leu). Protection: D-amino acids, N-methylation, cyclization."
tags: ["biology","endopeptidase","proteolysis"]
difficulty: "advanced"
---

id: fc-bio-metab-83
front: "What is the role of DPP-4 in peptide drug metabolism?"
back: "Cleaves X-Pro/X-Ala dipeptide from N-terminus. Substrates: GLP-1, GIP, VIP. Impact: GLP-1 half-life ~2 min. Strategies to resist: Aib at position 8 (semaglutide), D-Ala at position 2 (exenatide). DPP-4 inhibitors (gliptins) extend endogenous GLP-1."
tags: ["biology","DPP-4","GLP-1","metabolism"]
difficulty: "intermediate"
---

id: fc-bio-metab-84
front: "How do you predict metabolic hotspots in peptide sequences?"
back: "Sequence analysis (Pro/Ala at position 2 for DPP-4), structure-based (exposed loops > buried), in vitro incubation (plasma, microsomes), in silico tools. Common: N-terminal dipeptide (DPP-4), hydrophobic residues (NEP), Asn/Gln (deamidation), Met/Cys (oxidation), Asp-Pro (acid cleavage)."
tags: ["biology","metabolic-hotspot","prediction"]
difficulty: "advanced"
---

id: fc-bio-metab-85
front: "What strategies extend peptide drug half-life through metabolic stabilization?"
back: "D-amino acid substitution, N-methylation, cyclization, PEGylation, fatty acid acylation (albumin binding), Fc fusion (FcRn recycling), albumin binding (non-covalent). Result: half-life from minutes to days. Trade-off: each may reduce potency or increase cost."
tags: ["biology","half-life","metabolic-stability"]
difficulty: "intermediate"
---

id: fc-bio-metab-86
front: "How does deamidation affect peptide drug stability?"
back: "Asn/Gln to Asp/Glu via succinimide intermediate. Base-catalyzed, rates: Asn-Gly > Asn-Ser > Asn-Ala. Products: Asp (alpha and beta linkages) and isoAsp. Impact: charge alteration, conformational change, loss of activity, immunogenicity."
tags: ["biology","deamidation","Asn","stability"]
difficulty: "advanced"
---

id: fc-bio-metab-87
front: "What is the role of renal clearance in peptide drug disposition?"
back: "Glomerular filtration (cutoff ~60 kDa), tubular secretion, reabsorption (megalin/cubilin). Peptides <60 kDa rapidly filtered, reabsorbed and degraded. Strategies: increase size (PEGylation), modify charge (reduce megalin binding), prodrugs. Example: insulin (30 min) vs GLP-1 agonists (hours-days)."
tags: ["biology","renal-clearance","filtration"]
difficulty: "advanced"
---

id: fc-bio-metab-88
front: "How do liver enzymes metabolize peptide drugs?"
back: "CYP450 (minimal for most peptides), hepatic proteases, conjugation (glucuronidation). First-pass extraction: insulin (60-80%), glucagon (minimal), octreotide (30%). Factors: size, lipophilicity, sequence. Liver-targeting: design peptides with hepatic uptake motifs."
tags: ["biology","hepatic-metabolism","CYP450"]
difficulty: "advanced"
---

id: fc-bio-metab-89
front: "What are prodrug strategies for peptide drugs?"
back: "Lipidic (fatty acid esters - esterases), phosphate (solubility - phosphatases), peptide prodrugs (activated by specific proteases), site-specific conjugation (cleavable linkers). Examples: liraglutide (fatty acid prodrug), insulin detemir (acylated, fatty acid cleaved)."
tags: ["biology","prodrug","activation"]
difficulty: "advanced"
---

id: fc-bio-metab-90
front: "How do you measure peptide drug metabolism in vitro?"
back: "Plasma stability (LC-MS), liver microsomes (CYP), S9 fractions, hepatocytes (metabolism + uptake), Caco-2 (intestinal), DPP-4/NEP incubation. LC-MS/MS quantification, metabolic ID. Correlation: in vitro half-life predicts in vivo stability."
tags: ["biology","metabolism","in-vitro","LC-MS"]
difficulty: "intermediate"
---

id: fc-bio-transport-91
front: "What are the main routes of peptide drug absorption?"
back: "Parenteral (IV, SC, IM - most common), oral (1-2% bioavailability), nasal (3-10%), pulmonary (inhaled), transdermal (microneedles), buccal/sublingual, rectal. Barriers: enzymatic degradation (GI), poor permeability, efflux transporters, hepatic first-pass."
tags: ["biology","absorption","bioavailability","route"]
difficulty: "intermediate"
---

id: fc-bio-transport-92
front: "How do peptide drugs cross cell membranes?"
back: "Passive diffusion (lipophilicity, MW <500), paracellular (small peptides, tight junctions), transcytosis (receptor-mediated endocytosis), carrier-mediated (PEPT1/PEPT2), CPPs (cell-penetrating peptides). Lipinski applies poorly. Best: CPPs or receptor-mediated transport."
tags: ["biology","membrane-transport","permeability","CPP"]
difficulty: "advanced"
---

id: fc-bio-transport-93
front: "What is the role of peptide transporters PEPT1 and PEPT2?"
back: "PEPT1 (SLC15A1): H+-coupled, intestine (apical), transports di/tripeptides and peptidomimetics. PEPT2 (SLC15A2): kidney, brain, lung. Exploitation: prodrug design, amino acid conjugation. Limitation: <500 Da peptides. Selectivity: D-amino acids transported less efficiently."
tags: ["biology","PEPT1","PEPT2","transporter"]
difficulty: "expert"
---

id: fc-bio-transport-94
front: "How does P-glycoprotein affect peptide drug distribution?"
back: "Efflux at BBB, intestine, kidney. Substrates: hydrophobic, cationic peptides. Effects: limits CNS penetration, reduces oral bioavailability, increases excretion. Examples: cyclosporine A. Strategy: modify lipophilicity, reduce cationic charge."
tags: ["biology","P-glycoprotein","efflux","BBB"]
difficulty: "advanced"
---

id: fc-bio-transport-95
front: "What is the blood-brain barrier and how do peptides cross it?"
back: "Tight junctions, efflux transporters, enzymatic barrier. CNS strategies: intranasal, CPPs (TAT, penetratin), receptor-mediated transcytosis (transferrin, LRP1), nanoparticles, focused ultrasound. Challenge: <0.1% bioavailability. Solution: CNS-optimized peptides."
tags: ["biology","BBB","CNS","delivery"]
difficulty: "advanced"
---

id: fc-bio-transport-96
front: "How do cell-penetrating peptides (CPPs) facilitate drug delivery?"
back: "Short cationic/aromatic (8-30 residues). Types: arginine-rich (TAT, R8), hydrophobic (penetratin), amphipathic (MAP). Mechanism: endocytosis + direct translocation. Limitations: endosomal entrapment, lack of selectivity. Solutions: pH-sensitive CPPs, targeting peptides."
tags: ["biology","CPP","delivery","TAT"]
difficulty: "advanced"
---

id: fc-bio-transport-97
front: "What factors determine peptide drug tissue distribution?"
back: "Molecular size, charge (cationic = tissue binding), lipophilicity, plasma protein binding (albumin, AGP), blood flow, tissue binding (ECM, receptors). Vd: hydrophilic (~0.2 L/kg), lipophilic (>1 L/kg). Examples: insulin (0.15 L/kg), octreotide (0.3 L/kg)."
tags: ["biology","distribution","Vd","pharmacokinetics"]
difficulty: "intermediate"
---

id: fc-bio-transport-98
front: "How do you design peptides for oral bioavailability?"
back: "MW <1000 Da, HBD <=5, cLogP >0, flexible macrocycle (10-20%), protect from GI proteases (D-amino acids, cyclization), exploit PEPT1. Examples: cyclosporine A (oral). Emerging: permeation enhancers (SNAC - semaglutide oral formulation)."
tags: ["biology","oral-bioavailability","SNAC"]
difficulty: "advanced"
---

id: fc-bio-transport-99
front: "What is the role of albumin binding in peptide pharmacokinetics?"
back: "Extends half-life (reduced renal filtration), acts as reservoir, reduces tissue distribution. Strategies: fatty acid acylation (semaglutide), C-terminal extensions, non-covalent binders. Optimal: Kd ~10-100 nM (strong enough for half-life, weak enough for release)."
tags: ["biology","albumin","pharmacokinetics"]
difficulty: "intermediate"
---

id: fc-bio-transport-100
front: "How do you measure peptide drug pharmacokinetics in vivo?"
back: "Single dose (IV, SC, oral), multiple sampling, LC-MS/MS. Parameters: Cmax, Tmax, AUC, t1/2, CL, Vd, F. Animals: mouse, rat, dog, NHP. Scaling: allometric to predict human. Bioavailability: F = (AUC_oral x Dose_IV) / (AUC_IV x Dose_oral) x 100."
tags: ["biology","pharmacokinetics","PK","Cmax","AUC"]
difficulty: "intermediate"
---

id: fc-clin-trial-101
front: "What are the phases of clinical trials for peptide drugs?"
back: "Phase 0 (microdosing, PK), Phase I (safety, dose-finding, 20-80), Phase II (efficacy, 100-300), Phase III (confirmatory, 1000-3000), Phase IV (post-marketing). Peptide-specific: immunogenicity monitoring, injection site reactions, anti-drug antibody assessment."
tags: ["clinical","trial-phase","drug-development"]
difficulty: "intermediate"
---

id: fc-clin-trial-102
front: "What is a randomized controlled trial (RCT) and why is it the gold standard?"
back: "Random allocation to treatment/control. Features: randomization (eliminates selection bias), control group, blinding, prospective. Advantages: establishes causality, controls confounding, enables statistical inference. Limitations: expensive, time-consuming, may not reflect real-world."
tags: ["clinical","RCT","randomization"]
difficulty: "intermediate"
---

id: fc-clin-trial-103
front: "How does a crossover trial design work for peptide drugs?"
back: "Each participant receives all treatments in sequence (washout periods). Advantages: within-subject comparison (reduces variability), smaller sample size. Limitations: carryover effects, period effects, not for curative treatments. Applications: bioequivalence, PK/PD."
tags: ["clinical","crossover","trial-design"]
difficulty: "advanced"
---

id: fc-clin-trial-104
front: "What is a factorial trial design and when is it appropriate?"
back: "Tests multiple interventions simultaneously (2x2). Assumptions: no interaction. Advantages: tests multiple hypotheses efficiently, assesses interactions. Disadvantages: large sample size (4x parallel), compliance challenges. Applications: combination peptide therapies."
tags: ["clinical","factorial","trial-design"]
difficulty: "advanced"
---

id: fc-clin-trial-105
front: "What are adaptive trial designs and their advantages?"
back: "Pre-planned modifications based on interim data. Features: sample size re-estimation, dose selection, arm dropping. Advantages: efficiency (fewer patients), ethical (less exposure to ineffective doses). Bayesian designs use prior data. Applications: dose-finding in Phase II."
tags: ["clinical","adaptive","Bayesian"]
difficulty: "expert"
---

id: fc-clin-trial-106
front: "How do you design a non-inferiority trial for peptide biosimilars?"
back: "Demonstrate test not worse than reference by more than delta. Choose margin (clinical + statistical), pre-specify superiority. Delta: historical effect size, clinical judgment. Biosimilar: PK/PD similarity, immunogenicity, clinical equivalence."
tags: ["clinical","non-inferiority","biosimilar"]
difficulty: "expert"
---

id: fc-clin-trial-107
front: "What is a sentinel trial design?"
back: "Enroll 3-6 patients, observe safety before enrolling more. Rules: escalation (safe), de-escalation (toxicity), stopping. Advantages: fewer exposed to toxic doses, faster escalation. Applications: first-in-human with immunogenicity or injection site concerns."
tags: ["clinical","sentinel","dose-escalation"]
difficulty: "advanced"
---

id: fc-clin-trial-108
front: "How do you handle missing data in clinical trials?"
back: "LOCF (simple but biased), MMRM (gold standard), multiple imputation (handles MNAR), sensitivity analyses, per-protocol vs ITT. Mechanisms: MCAR (random), MAR (covariates explain), MNAR (depends on unobserved)."
tags: ["clinical","missing-data","MMRM"]
difficulty: "expert"
---

id: fc-clin-trial-109
front: "What are the key endpoints for peptide drug clinical trials?"
back: "Primary efficacy (HbA1c, tumor response), secondary (quality of life, biomarkers), safety (AEs, immunogenicity). Surrogate vs clinical: HbA1c (surrogate) vs CV events (clinical). Peptide-specific: injection site reactions, anti-drug antibody titers."
tags: ["clinical","endpoints","efficacy"]
difficulty: "intermediate"
---

id: fc-clin-trial-110
front: "What are the ethical considerations in peptide drug clinical trials?"
back: "Principles: beneficence, non-maleficence, autonomy (informed consent), justice. Peptide-specific: immunogenicity risks, off-label pressure, vulnerable populations, placebo controls. IRB/Ethics committee review. DSMB for interim safety."
tags: ["clinical","ethics","DSMB"]
difficulty: "intermediate"
---

id: fc-clin-biostat-111
front: "What is a p-value and how is it interpreted?"
back: "Probability of observing effect as extreme or more extreme, assuming null true. p<0.05 = significant (conventional). Does NOT mean 95% probability treatment works. Does NOT indicate clinical significance. Alternatives: effect sizes, CIs, Bayesian posteriors."
tags: ["clinical","p-value","significance"]
difficulty: "intermediate"
---

id: fc-clin-biostat-112
front: "How do you calculate and interpret confidence intervals?"
back: "Range containing true parameter with specified probability. Narrower CI = more precision. CI crossing null value = not significant. Provides magnitude + uncertainty. Example: 95% CI [2.1, 5.3] for HbA1c reduction."
tags: ["clinical","confidence-interval","precision"]
difficulty: "intermediate"
---

id: fc-clin-biostat-113
front: "What is statistical power and how do you calculate sample size?"
back: "Power: probability of detecting true effect (1-beta, usually 0.80). Factors: alpha (0.05), power (0.80), effect size, variance. Larger samples: smaller effects, higher variability, lower alpha. Peptide: account for PK variability (CV 20-40%)."
tags: ["clinical","power","sample-size"]
difficulty: "intermediate"
---

id: fc-clin-biostat-114
front: "How do you handle multiplicity in clinical trials?"
back: "Bonferroni (simple but conservative), Holm (step-down), Hochberg (step-up), FDR (Benjamini-Hochberg), hierarchical testing, composite endpoints. FWER vs FDR control. Peptide trials: primary + secondary tested hierarchically."
tags: ["clinical","multiplicity","Bonferroni"]
difficulty: "advanced"
---

id: fc-clin-biostat-115
front: "What is a meta-analysis and how is it used?"
back: "Statistical synthesis of multiple studies. Fixed-effects, random-effects, network. Heterogeneity: I^2 (low <25%, high >75%). Applications: combine Phase II/III, dose-response, subgroup analysis. Bias: funnel plots, Egger's test."
tags: ["clinical","meta-analysis","heterogeneity"]
difficulty: "advanced"
---

id: fc-clin-biostat-116
front: "How do you design a dose-response study?"
back: "3-5 doses + placebo, parallel or crossover. Analysis: Emax model (Emax, EC50, gamma), sigmoid, linear, quadratic. Peptide: PK variability, non-linear PK, immunogenicity. Adaptive: Bayesian dose-response modeling."
tags: ["clinical","dose-response","Emax"]
difficulty: "advanced"
---

id: fc-clin-biostat-117
front: "What are the assumptions of survival analysis?"
back: "Kaplan-Meier, log-rank, Cox proportional hazards. Assumptions: proportional hazards, independent censoring, non-informative censoring. Applications: time to CV event, progression-free survival, time to antibody formation."
tags: ["clinical","survival","Kaplan-Meier"]
difficulty: "advanced"
---

id: fc-clin-biostat-118
front: "How do you analyze repeated measures data?"
back: "MMRM (gold standard), GEE, ANOVA repeated measures, random coefficient models. MMRM: handles missing (MAR), models correlation, includes baseline. Applications: PK/PD modeling, HbA1c changes over time."
tags: ["clinical","MMRM","repeated-measures"]
difficulty: "expert"
---

id: fc-clin-biostat-119
front: "What is propensity score matching?"
back: "Probability of treatment given covariates. Methods: matching, stratification, IPTW, covariate adjustment. Applications: observational studies, confounding control, supplement RCTs. Limitation: cannot control unmeasured confounders."
tags: ["clinical","propensity-score","observational"]
difficulty: "expert"
---

id: fc-clin-biostat-120
front: "How do Bayesian methods differ from frequentist approaches?"
back: "Bayesian: prior + data to posterior. Frequentist: data only to p-value. Differences: probability interpretation, prior information, stopping rules. Advantages: adaptive designs, decision-making, small samples. Applications: early phase dose-finding."
tags: ["clinical","Bayesian","frequentist"]
difficulty: "expert"
---

id: fc-clin-reg-121
front: "What are the key FDA regulatory pathways for peptide drugs?"
back: "NDA 505(b)(1) (full), 505(b)(2) (changed dosage form), BLA (biologics - large peptides). Small peptides (<40 aa) to NDA, large to BLA. Designations: orphan drug, fast track, breakthrough, accelerated approval."
tags: ["clinical","FDA","regulatory","NDA"]
difficulty: "intermediate"
---

id: fc-clin-reg-122
front: "What is the ICH guideline framework for peptide drugs?"
back: "Q1-Q12 (quality), S1-S11 (safety), E1-E20 (efficacy), M1-M10 (multidisciplinary). Key: Q5C (biotech stability), Q6B (biologics specs), E6(R2) (GCP), S6(R1) (biologics safety). Regional: FDA, EMA, PMDA accept ICH."
tags: ["clinical","ICH","guidelines"]
difficulty: "advanced"
---

id: fc-clin-reg-123
front: "What are EMA requirements for peptide drug marketing authorization?"
back: "Centralised (mandatory for biologics), decentralised, mutual recognition. Requirements: quality (CMC), non-clinical (GLP), clinical (Phase I-III). Peptide: comparability studies, immunogenicity, biosimilarity. Scientific advice with CHMP. PIP required."
tags: ["clinical","EMA","CHMP"]
difficulty: "advanced"
---

id: fc-clin-reg-124
front: "What is the biosimilar regulatory pathway?"
back: "351(k) FDA: demonstrate similarity (quality, non-clinical, clinical). Stepwise: analytical > functional > clinical. Interchangeability: switching studies. Market: patent expiration enables entry."
tags: ["clinical","biosimilar","351k"]
difficulty: "advanced"
---

id: fc-clin-reg-125
front: "What are CMC dossier requirements for peptide drugs?"
back: "Drug substance (sequence, synthesis, purification), drug product (formulation, stability), container closure. Peptide: amino acid analysis, peptide mapping, MS, purity (HPLC >95%), impurity profile, stability (ICH Q5C). GMP, validated SPPS."
tags: ["clinical","CMC","manufacturing","GMP"]
difficulty: "advanced"
---

id: fc-clin-reg-126
front: "How does the FDA review process work for peptide drugs?"
back: "Filing (60-day completeness), standard (10-12 months), priority (6-8 months). Divisions: CDER (small molecules, peptides <40 aa), CBER (biologics). Advisory committee (non-binding). CRL: deficiencies. Post-market: REMS may be required."
tags: ["clinical","FDA","review"]
difficulty: "intermediate"
---

id: fc-clin-reg-127
front: "What are IND/CTA requirements for peptide drug trials?"
back: "Pre-clinical data (toxicology, PK), CMC, clinical protocol, investigator info. Pre-IND meeting: FDA feedback. Peptide: immunogenicity plan, bioanalytical validation, dose justification. Annual reports update safety."
tags: ["clinical","IND","CTA"]
difficulty: "intermediate"
---

id: fc-clin-reg-128
front: "What is the role of orphan drug designation?"
back: "Diseases affecting <200,000 (US) or <5/10,000 (EU). Benefits: 7-year exclusivity, 50% R&D tax credits, filing fee waiver, protocol assistance. Examples: calcitonin, octreotide. Application: FDA or EMA (COMP)."
tags: ["clinical","orphan-drug","rare-disease"]
difficulty: "intermediate"
---

id: fc-clin-reg-129
front: "How do you navigate global regulatory requirements?"
back: "ICH harmonization, regional differences (FDA vs EMA vs PMDA), simultaneous submissions. Considerations: bridge studies, local CMC, pricing/reimbursement. CTD format enables common dossier with regional modules."
tags: ["clinical","global","ICH"]
difficulty: "advanced"
---

id: fc-clin-reg-130
front: "What post-marketing requirements exist for peptide drugs?"
back: "Phase IV, REMS, adverse event reporting (MedWatch, EudraVigilance), PSURs. Peptide: long-term immunogenicity surveillance, injection site monitoring, anti-drug antibody tracking. CMC changes require supplements."
tags: ["clinical","post-marketing","REMS"]
difficulty: "intermediate"
---

id: fc-clin-pharma-131
front: "What is pharmacovigilance and why is it critical for peptide drugs?"
back: "Detection, assessment, prevention of ADRs. Critical for peptides: immunogenicity (antibodies causing anaphylaxis, loss of efficacy), injection site reactions, long-term safety. Systems: spontaneous reporting (FAERS), active surveillance, signal detection."
tags: ["clinical","pharmacovigilance","immunogenicity"]
difficulty: "intermediate"
---

id: fc-clin-pharma-132
front: "How do you assess immunogenicity of peptide drugs?"
back: "ADA testing (bridging ELISA), NAb assays (cell-based), T-cell assays (ELISpot). Factors: sequence (non-human more immunogenic), formulation (aggregates), route (SC > IV), HLA. Impact: reduced efficacy, increased clearance, adverse events."
tags: ["clinical","immunogenicity","ADA"]
difficulty: "advanced"
---

id: fc-clin-pharma-133
front: "What are the main types of adverse drug reactions for peptide drugs?"
back: "Type A (dose-dependent - injection reactions), Type B (idiosyncratic - anaphylaxis), Type C (cumulative - lipodystrophy), Type D (delayed - carcinogenicity). Peptide: injection site, GI (GLP-1), hypoglycemia (insulin), immunogenicity, thyroid tumors (GLP-1)."
tags: ["clinical","ADR","injection-site"]
difficulty: "intermediate"
---

id: fc-clin-pharma-134
front: "How do you design a long-term safety study for peptide drugs?"
back: "Open-label extensions, CVOTs, cancer surveillance. Duration: 1-5+ years. Endpoints: MACE, cancer incidence, immunogenicity, organ function. Example: LEADER (liraglutide, 3.8 years). Adaptive: interim analyses for futility/safety."
tags: ["clinical","long-term-safety","CVOT"]
difficulty: "advanced"
---

id: fc-clin-pharma-135
front: "What is signal detection in pharmacovigilance?"
back: "Disproportionality (PRR, ROR, IC), Bayesian (MGPS), data mining. Sources: spontaneous (FAERS), EHRs, claims. Threshold: PRR >2, chi-squared >4, IC >2. Validation: clinical review, biological plausibility, temporal association."
tags: ["clinical","signal-detection","FAERS"]
difficulty: "advanced"
---

id: fc-clin-pharma-136
front: "How do you manage drug-drug interactions with peptide drugs?"
back: "PK (metabolism, transport), PD (additive/synergistic). Peptide-specific: DPP-4 inhibitors with GLP-1 agonists, insulin with sulfonylureas (hypoglycemia), warfarin with albumin-bound peptides. Assessment: clinical PK studies, population PK."
tags: ["clinical","drug-interaction","PK"]
difficulty: "advanced"
---

id: fc-clin-pharma-137
front: "What is the role of risk management plans?"
back: "Safety specification, pharmacovigilance plan, risk minimization (routine + additional). Components: Medication Guide, Communication Plan, ETASU (restricted distribution). Examples: GLP-1 agonists (thyroid monitoring), insulin (hypoglycemia)."
tags: ["clinical","RMP","REMS"]
difficulty: "advanced"
---

id: fc-clin-pharma-138
front: "How do you design a post-marketing surveillance study?"
back: "Observational (cohort, case-control), registry-based, pragmatic. Objectives: rare ADR detection, long-term safety, real-world effectiveness. Sample: >10,000. Data: EHRs, claims, registries. Analysis: propensity score, survival analysis."
tags: ["clinical","post-marketing","surveillance"]
difficulty: "advanced"
---

id: fc-clin-pharma-139
front: "What are safety monitoring requirements during trials?"
back: "DSMB (independent), AE grading (CTCAE), stopping rules (efficacy, futility, safety), interim analyses. SAE reporting: 24h sponsor, 7d FDA (unexpected), expedited IND. Peptide: immunogenicity, injection site."
tags: ["clinical","DSMB","safety-monitoring"]
difficulty: "advanced"
---

id: fc-clin-pharma-140
front: "How do you handle safety data in regulatory submissions?"
back: "Integrated summary of safety (ISS), case narratives, tabulations, benefit-risk. Analysis: descriptive stats, time-to-event, exposure-adjusted incidence. Benefit-risk: therapeutic context, unmet need, alternatives."
tags: ["clinical","safety-data","benefit-risk"]
difficulty: "advanced"
---

id: fc-clin-heor-141
front: "What is health economics and outcomes research (HEOR)?"
back: "Evaluates value of medical interventions. Components: health economics (cost-effectiveness, budget impact), outcomes research (PROs, real-world evidence). Metrics: ICER, QALY, NNT. Peptide: high acquisition cost, administration costs, long-term outcomes."
tags: ["clinical","HEOR","ICER","QALY"]
difficulty: "intermediate"
---

id: fc-clin-heor-142
front: "How do you calculate cost-effectiveness for peptide drugs?"
back: "CEA: compare costs and outcomes. ICER = dCost/dOutcome. Perspective: healthcare payer. Horizon: lifetime (discount 3%). Uncertainty: PSA, willingness-to-pay ($50,000-150,000/QALY). Example: GLP-1 vs insulin (higher drug cost, lower complications)."
tags: ["clinical","cost-effectiveness","ICER"]
difficulty: "advanced"
---

id: fc-clin-heor-143
front: "What are patient-reported outcomes (PROs)?"
back: "Patient-reported without clinician interpretation. Types: disease-specific (DTSQ), generic (SF-36, EQ-5D), symptom scales. Validation: content validity, reliability, validity, responsiveness. FDA PRO Guidance (2009). Applications: endpoints, labeling claims."
tags: ["clinical","PRO","EQ-5D"]
difficulty: "advanced"
---

id: fc-clin-heor-144
front: "What is a budget impact analysis?"
back: "Financial consequences of adopting new technology. Inputs: prevalence, treatment costs, market share, time horizon (1-5 years). Current cost vs new cost, net impact. Consideration: offsetting savings (reduced complications)."
tags: ["clinical","budget-impact","BIA"]
difficulty: "intermediate"
---

id: fc-clin-heor-145
front: "How do you conduct a systematic review for HEOR?"
back: "Protocol (PROSPERO), search (PubMed, EMBASE, Cochrane), study selection (PRISMA), quality assessment (NOS), data extraction, synthesis (meta-analysis). Fixed/random effects, heterogeneity (I^2), publication bias."
tags: ["clinical","systematic-review","PRISMA"]
difficulty: "advanced"
---

id: fc-clin-heor-146
front: "What are real-world evidence (RWE) studies?"
back: "Evidence from real-world data. Sources: EHRs, claims, registries, PROs. Designs: retrospective cohort, case-control. Applications: comparative effectiveness, safety surveillance, burden. Limitations: confounding, missing data, measurement error."
tags: ["clinical","RWE","real-world"]
difficulty: "advanced"
---

id: fc-clin-heor-147
front: "How do you assess value in health technology assessment (HTA)?"
back: "HTA bodies: NICE (UK), ICER (US), CADTH (Canada), G-BA (Germany). Assessment: effectiveness, cost-effectiveness, budget impact, innovation, unmet need. Decision: ICER vs threshold, evidence quality, severity."
tags: ["clinical","HTA","NICE"]
difficulty: "advanced"
---

id: fc-clin-heor-148
front: "What are key considerations for peptide drug pricing?"
back: "Development costs, manufacturing (SPPS, QC), market exclusivity, competition, value-based pricing. Strategies: cost-plus, value-based, tiered pricing, outcomes-based contracts. Challenges: high acquisition cost, long-term use."
tags: ["clinical","pricing","value-based"]
difficulty: "intermediate"
---

id: fc-clin-heor-149
front: "How do you model long-term outcomes for chronic peptide drug use?"
back: "Markov (health states), microsimulation (individual-level), discrete event simulation. Inputs: trial efficacy, real-world effectiveness, costs, utilities. Validation: internal (sensitivity), external (registry). Example: GLP-1 (HbA1c to CV events)."
tags: ["clinical","modeling","Markov"]
difficulty: "expert"
---

id: fc-clin-heor-150
front: "What are outcomes-based contracts for peptide drugs?"
back: "Payment linked to real-world outcomes. Types: rebate if target not met, money-back, indication-based. Requirements: clear outcomes, data collection, contracts. Examples: insulin (HbA1c), GLP-1 (CV outcomes). Challenges: attribution, data infrastructure."
tags: ["clinical","OBC","outcomes-based"]
difficulty: "advanced"
---

id: fc-anal-prot-151
front: "What are the main UV-Vis spectroscopy techniques for protein/peptide characterization?"
back: "280 nm (Trp, Tyr, disulfide - concentration), 214 nm (peptide bond - sensitive), 205 nm (secondary structure). Beer-Lambert: A = elc. Purity: HPLC with UV (214/280 nm)."
tags: ["analytical","UV-Vis","spectroscopy"]
difficulty: "intermediate"
---

id: fc-anal-prot-152
front: "How does fluorescence spectroscopy characterize peptide structure?"
back: "Intrinsic (Trp, Tyr), extrinsic (ANS, ThT), FRET (distance). Applications: folding (Trp shift: blue=buried, red=exposed), aggregation (ThT for amyloid), conformational changes, binding (polarization). Sensitivity: picomolar."
tags: ["analytical","fluorescence","FRET"]
difficulty: "advanced"
---

id: fc-anal-prot-153
front: "What is dynamic light scattering (DLS)?"
back: "Measures hydrodynamic radius (Rh) from scattering fluctuations. Brownian motion to autocorrelation to diffusion to Rh. Applications: aggregation, size distribution (PDI), stability, formulation. Limitations: insensitive to <1 nm, biased by large aggregates."
tags: ["analytical","DLS","hydrodynamic-radius"]
difficulty: "advanced"
---

id: fc-anal-prot-154
front: "How do you determine peptide molecular weight by mass spectrometry?"
back: "MALDI-TOF (intact mass), ESI-MS (charge states), LC-MS/MS (sequence). Analysis: monoisotopic mass (M+H)+, isotopic distribution, b/y ions. Accuracy: <5 ppm (Orbitrap, QTOF). Applications: identity, purity, PTMs."
tags: ["analytical","mass-spec","MALDI","ESI"]
difficulty: "intermediate"
---

id: fc-anal-prot-155
front: "What is circular dichroism (CD) and how does it characterize peptides?"
back: "Differential absorption of circularly polarized light. Far-UV (190-250 nm - secondary), near-UV (250-300 nm - tertiary). Signatures: alpha-helix (208, 222 nm), beta-sheet (218 nm), random coil (200 nm). Quantification: CDSSTR, CONTIN."
tags: ["analytical","CD","secondary-structure"]
difficulty: "advanced"
---

id: fc-anal-prot-156
front: "How do you assess peptide thermal stability using DSC?"
back: "Heat absorption during denaturation. Output: thermogram (Cp vs T). Parameters: Tm (midpoint), dH, dCp. Applications: conformational stability (Tm >60 C), aggregation onset, formulation optimization. Limitations: high concentration, irreversibility."
tags: ["analytical","DSC","thermal-stability"]
difficulty: "advanced"
---

id: fc-anal-prot-157
front: "What is size-exclusion chromatography (SEC)?"
back: "Separates by hydrodynamic size (largest first). Detection: UV, MALS (absolute MW). Applications: aggregate quantification, MW determination, conformational changes. Challenges: non-specific binding, concentration effects."
tags: ["analytical","SEC","aggregation","MALS"]
difficulty: "advanced"
---

id: fc-anal-prot-158
front: "How does SDS-PAGE work for peptides?"
back: "Separates by MW (denaturing). SDS binds (1.4 g/g), uniform charge. Staining: Coomassie (ng), silver (pg). Limitations: small peptides (<5 kDa) may not resolve. Alternatives: Tris-Tricine, Western blot."
tags: ["analytical","SDS-PAGE","electrophoresis"]
difficulty: "intermediate"
---

id: fc-anal-prot-159
front: "What methods assess peptide purity and impurity profiles?"
back: "RP-HPLC (most common), IEX-HPLC (charge variants), CE (charge-to-size), UPLC. Impurities: truncated sequences, deletion peptides, D-amino acid isomers, oxidized, deamidated, residual solvents, counterions. Spec: >95%."
tags: ["analytical","purity","HPLC","impurities"]
difficulty: "intermediate"
---

id: fc-anal-prot-160
front: "How do you characterize peptide higher-order structure?"
back: "Secondary (CD, FTIR), tertiary (near-UV CD, fluorescence, NMR), quaternary (SEC-MALS, AUC). Techniques: X-ray, cryo-EM, NMR, HDX-MS. Biosimilarity: HOS comparison by orthogonal methods (FDA)."
tags: ["analytical","HOS","NMR","HDX-MS"]
difficulty: "expert"
---

id: fc-anal-immuno-161
front: "What are the principles of ELISA for peptide quantification?"
back: "Types: direct, sandwich (capture + detection), competitive. Sandwich: coat capture antibody, add sample, wash, add enzyme-labeled detection, substrate to color. Sensitivity: pg/mL. Ensure antibodies recognize linear vs conformational epitopes."
tags: ["analytical","ELISA","immunoassay"]
difficulty: "intermediate"
---

id: fc-anal-immuno-162
front: "How does RIA differ from ELISA?"
back: "RIA: radiolabeled antigen (125I) competes with unlabeled. Advantages: extremely sensitive (pg/mL), well-established. Disadvantages: radioactive waste, short shelf life, safety. ELISA advantages: non-radioactive, higher throughput, longer stability."
tags: ["analytical","RIA","ELISA"]
difficulty: "intermediate"
---

id: fc-anal-immuno-163
front: "What is immunohistochemistry (IHC)?"
back: "Detects antigens in tissue sections. Steps: fixation, sectioning, antigen retrieval, primary antibody, secondary-enzyme, chromogen. Applications: receptor localization, biomarkers, tumor classification. Fixative choice, antibody validation, H-score quantification."
tags: ["analytical","IHC","immunohistochemistry"]
difficulty: "advanced"
---

id: fc-anal-immuno-164
front: "What are multiplex immunoassays?"
back: "Multiple analytes simultaneously. Technologies: Luminex (bead-based), MSD (electrochemiluminescence), arrays. Advantages: small sample, throughput, reduced variability, cost-effective. Applications: cytokine profiling, biomarker panels, PK/PD."
tags: ["analytical","multiplex","Luminex","MSD"]
difficulty: "advanced"
---

id: fc-anal-immuno-165
front: "How do you validate an immunoassay for peptide quantification?"
back: "FDA guidance: selectivity, accuracy (85-115%), precision (CV <15%), sensitivity (LLOQ), linearity, stability, cross-reactivity. Calibration: matrix-matched, min 6 non-zero. QC: low/mid/high. ISR for reproducibility."
tags: ["analytical","validation","bioanalytical"]
difficulty: "advanced"
---

id: fc-anal-immuno-166
front: "What are sources of variability in immunoassays?"
back: "Matrix effects (lipemia, hemolysis), hook effect (prozone), heterophilic antibodies, RF, lot-to-lot, operator. Mitigation: dilution, hook test, blocking reagents, RF absorption, qualified reagents, SOPs."
tags: ["analytical","variability","matrix-effect"]
difficulty: "advanced"
---

id: fc-anal-immuno-167
front: "How do you develop antibodies for peptide immunoassays?"
back: "Immunogen design (conjugate to KLH/BSA), immunization (rabbit, goat), hybridoma (monoclonal) or serum (polyclonal), screening (titer, cross-reactivity), purification (Protein A/G). Monoclonal: hybridoma, phage display, recombinant."
tags: ["analytical","antibody-development","hybridoma"]
difficulty: "expert"
---

id: fc-anal-immuno-168
front: "What is proximity ligation assay (PLA)?"
back: "Detects proteins in situ. Two antibodies bind target, secondary antibodies with DNA ligate, rolling circle amplification, fluorescent detection. Advantages: endogenous detection, single-molecule sensitivity, co-localization. Applications: receptor dimerization, PPIs."
tags: ["analytical","PLA","in-situ"]
difficulty: "expert"
---

id: fc-anal-immuno-169
front: "How do flow cytometry assays measure peptide-receptor interactions?"
back: "Fluorescence of individual cells. Applications: receptor binding (fluorescent peptides), internalization (FACS), calcium flux (FLIPR), intracellular signaling (phospho-flow). Throughput: 10^6 cells/second, multiparameter."
tags: ["analytical","flow-cytometry","receptor-binding"]
difficulty: "advanced"
---

id: fc-anal-immuno-170
front: "What are biosensor methods for measuring peptide binding kinetics?"
back: "SPR (Biacore - label-free, real-time), BLI (Octet). Parameters: kon, koff, KD = koff/kon. Advantages: real-time kinetics, low sample, high throughput. Applications: affinity ranking, epitope mapping, competitive binding."
tags: ["analytical","SPR","BLI","kinetics"]
difficulty: "advanced"
---

id: fc-anal-cell-171
front: "What are the main cell viability assays?"
back: "MTT/MTS/WST (metabolic), ATP luminescence (CellTiter-Glo), resazurin (AlamarBlue), membrane integrity (LDH, trypan blue), caspase (apoptosis). Applications: cytotoxicity, IC50, selectivity."
tags: ["analytical","cell-viability","MTT"]
difficulty: "intermediate"
---

id: fc-anal-cell-172
front: "How do you measure cell proliferation?"
back: "BrdU incorporation, Ki-67 staining, CFSE dilution, 3H-thymidine, real-time impedance (xCELLigence). Applications: growth factor activity, mitogenic peptides, anti-proliferative screening. Considerations: synchronization, serum starvation."
tags: ["analytical","proliferation","BrdU"]
difficulty: "advanced"
---

id: fc-anal-cell-173
front: "What assays detect peptide-induced apoptosis?"
back: "Annexin V/PI (flow), caspase-3/7 (Caspase-Glo), TUNEL (DNA fragmentation), cytochrome c release, PARP cleavage (Western). Pathways: intrinsic (mitochondrial), extrinsic (death receptor). Applications: oncolytic peptide screening."
tags: ["analytical","apoptosis","Annexin-V"]
difficulty: "advanced"
---

id: fc-anal-cell-174
front: "How do you perform dose-response curves in cell-based assays?"
back: "Serial dilutions (8-10 concentrations), log-spaced, triplicates, vehicle control. Normalize to controls, fit 4-parameter logistic, extract EC50/IC50, Hill coefficient. Quality: R^2 >0.95, Hill slope 0.8-1.2."
tags: ["analytical","dose-response","EC50"]
difficulty: "intermediate"
---

id: fc-anal-cell-175
front: "What are reporter gene assays for peptide signaling?"
back: "Transcription factor activation drives reporter expression. Types: luciferase, GFP, beta-gal. Applications: pathway activation (CRE-luciferase for cAMP), receptor activation, HTS. Considerations: transfection efficiency, temporal delay."
tags: ["analytical","reporter-gene","luciferase"]
difficulty: "advanced"
---

id: fc-anal-cell-176
front: "How do you measure receptor internalization by peptide ligands?"
back: "Surface biotinylation, fluorescent peptide (confocal), flow cytometry (surface vs total), radioligand (125I-peptide). Kinetics: time-course (0-60 min), temperature dependence (4 C vs 37 C). Quantification: internalization index."
tags: ["analytical","internalization","confocal"]
difficulty: "advanced"
---

id: fc-anal-cell-177
front: "What are calcium flux assays for GPCR-activating peptides?"
back: "FLIPR (imaging plate reader), FLIPR Calcium 6, aequorin. Protocol: load with dye, stimulate with peptide, measure fluorescence. Applications: Gq-coupled receptor activation, HTS. Kinetic: rapid (seconds)."
tags: ["analytical","calcium-flux","FLIPR","GPCR"]
difficulty: "advanced"
---

id: fc-anal-cell-178
front: "How do you perform transwell permeability assays?"
back: "Cells on porous membrane (0.4 um), peptide added apical, measured basolateral. Papp = (dQ/dt) / (A x C0). Classification: high (>10 x 10^-6 cm/s), moderate (1-10), low (<1). Applications: oral bioavailability prediction."
tags: ["analytical","transwell","permeability"]
difficulty: "advanced"
---

id: fc-anal-cell-179
front: "What are organoid-based assays for peptide drug testing?"
back: "3D self-organizing cultures from stem cells. Applications: patient-specific testing, disease modeling, toxicology screening. Better predicts in vivo response than 2D. Peptide testing: proliferation, apoptosis, signaling in physiologically relevant context."
tags: ["analytical","organoids","3D-culture"]
difficulty: "expert"
---

id: fc-anal-cell-180
front: "How do you assess peptide cytotoxicity in immune cells?"
back: "MTT/MTS for T cells, B cells, NK cells; LDH release (membrane damage); Annexin V/PI (apoptosis); CFSE proliferation; cytokine release (multiplex). Considerations: activation state, stimulation conditions, viability vs function."
tags: ["analytical","cytotoxicity","immune-cells"]
difficulty: "advanced"
---

id: fc-anal-animal-181
front: "What are the main animal models for in vivo peptide pharmacology?"
back: "Mice (genetic, DIO), rats (STZ diabetes, hypertension), dogs (canine diabetes), NHP (closest to human). Selection: disease relevance, translational value, cost, ethics. Peptide: species sensitivity differences (GLP-1R biology)."
tags: ["analytical","animal-model","pharmacology"]
difficulty: "intermediate"
---

id: fc-anal-animal-182
front: "How do you design a dose-response study in animal models?"
back: "3-5 dose groups + vehicle, randomized, blinded. Endpoints: PD (glucose, tumor size), PK (exposure), safety. Analysis: Emax modeling, AUC comparison, ANOVA. Considerations: species PK, route, dosing frequency."
tags: ["analytical","dose-response","animal-study"]
difficulty: "advanced"
---

id: fc-anal-animal-183
front: "What are the ethical considerations in animal peptide drug testing?"
back: "3Rs (Replace, Reduce, Refine). IACUC approval required. Humane endpoints defined. Anesthesia/analgesia for procedures. Housing: species-specific. Peptide: minimize injection stress, use appropriate controls."
tags: ["analytical","ethics","3Rs","IACUC"]
difficulty: "intermediate"
---

id: fc-anal-animal-184
front: "How do you measure peptide PK in animal studies?"
back: "Sampling: serial blood (small volume mice), terminal (large). Assays: LC-MS/MS (gold standard), ELISA. Parameters: Cmax, AUC, t1/2, CL, Vd. Bioavailability: IV vs SC/PO. Scaling: allometric (CL vs body weight)."
tags: ["analytical","PK","animal-study","LC-MS"]
difficulty: "advanced"
---

id: fc-anal-animal-185
front: "What are xenograft models for testing anticancer peptides?"
back: "Human tumor cells in immunodeficient mice (nude, SCID). Types: subcutaneous, orthotopic, PDX. Endpoints: tumor volume, survival, biomarkers. Peptide: direct injection, pump delivery, targeting imaging. Limitations: no immune component."
tags: ["analytical","xenograft","cancer","PDX"]
difficulty: "advanced"
---

id: fc-anal-animal-186
front: "How do you assess peptide toxicity in animal models?"
back: "Single-dose (acute, LD50), repeat-dose (subacute, 14-28d), chronic (90d+). Endpoints: clinical chemistry, hematology, histopathology, immunogenicity (ADA). GLP studies for IND. Peptide: injection site, anti-drug antibodies."
tags: ["analytical","toxicology","GLP"]
difficulty: "advanced"
---

id: fc-anal-animal-187
front: "What are transgenic animal models for peptide drug development?"
back: "Knockout (target validation), knockin (human gene - species sensitivity), reporter (imaging). Applications: target validation (GLP-1R KO), humanized models, disease models (obesity, diabetes)."
tags: ["analytical","transgenic","knockout"]
difficulty: "expert"
---

id: fc-anal-animal-188
front: "How do you perform PK/PD modeling in animals?"
back: "Compartmental PK model, effect compartment (hysteresis), direct response, indirect response (inhibition/stimulation). Software: NONMEM, WinNonlin, Monolix. Applications: dose prediction, species scaling, time-course of effect."
tags: ["analytical","PK/PD","modeling","NONMEM"]
difficulty: "expert"
---

id: fc-anal-animal-189
front: "What are the main rodent models for metabolic peptide drug testing?"
back: "DIO mice, ob/ob mice (leptin-deficient), db/db mice (leptin receptor), Zucker fatty rats, STZ diabetic rats. Endpoints: body weight, OGTT, ITT, HbA1c, lipid profile."
tags: ["analytical","metabolic","DIO","ob/ob"]
difficulty: "advanced"
---

id: fc-anal-animal-190
front: "How do you assess immunogenicity in animal studies?"
back: "ADA testing (bridging ELISA), NAb assays, T-cell assays (ELISpot). Time points: pre-dose, during, recovery. Impact: altered PK/PD, reduced efficacy, adverse reactions. Challenge: species-specific immune responses."
tags: ["analytical","immunogenicity","ADA","animal-study"]
difficulty: "advanced"
---

id: fc-anal-comp-191
front: "What is molecular docking and how is it applied to peptide drug design?"
back: "Predicts binding pose and affinity. Methods: rigid (shape complementarity), flexible ligand, flexible protein (induced fit). Software: AutoDock, Glide, GOLD. Peptide challenges: large flexible ligand, scoring accuracy."
tags: ["analytical","docking","molecular-modeling"]
difficulty: "advanced"
---

id: fc-anal-comp-192
front: "What is molecular dynamics (MD) simulation for peptides?"
back: "Simulates atomic motion using Newton's equations. Force fields: CHARMM, AMBER, OPLS. Applications: conformational sampling, binding free energy (FEP/TI), protein-peptide interactions, membrane permeation. Software: GROMACS, NAMD, AMBER."
tags: ["analytical","molecular-dynamics","GROMACS"]
difficulty: "expert"
---

id: fc-anal-comp-193
front: "What is QSAR and how is it used for peptide design?"
back: "Relationship between structure and activity. Methods: descriptor-based, 3D-QSAR (CoMFA, CoMSIA), ML (RF, SVM, DNN). Applications: predict potency, selectivity, stability. Challenges: chemical space, flexibility, limited data."
tags: ["analytical","QSAR","machine-learning"]
difficulty: "advanced"
---

id: fc-anal-comp-194
front: "How do you predict peptide membrane permeability computationally?"
back: "Molecular descriptors (MW, LogP, HBD/HBA), MD (membrane simulation), ML (trained on data), ADMET predictors. Rules: MW <1000, cLogP >0, HBD <=5, flexible macrocycle. Software: SwissADME, pkCSM."
tags: ["analytical","permeability","ADMET","prediction"]
difficulty: "advanced"
---

id: fc-anal-comp-195
front: "What is homology modeling for peptide receptor targets?"
back: "Builds 3D structure from related templates. Steps: template selection (>30% identity), alignment, building (MODELLER, SWISS-MODEL), refinement, validation (Ramachandran). Applications: GPCR structures, ion channels."
tags: ["analytical","homology-modeling","MODELLER"]
difficulty: "expert"
---

id: fc-anal-comp-196
front: "How do you use free energy perturbation (FEP) for peptide optimization?"
back: "Calculates relative binding free energy between related compounds. Alchemical transformation. Accuracy: ~1 kcal/mol for congeneric series. Applications: potency prediction, SAR, lead optimization. Software: FEP+ (Schrodinger), AMBER."
tags: ["analytical","FEP","free-energy","optimization"]
difficulty: "expert"
---

id: fc-anal-comp-197
front: "What are pharmacophore models and how are they built?"
back: "3D arrangement of binding features. Features: H-bond, hydrophobic, aromatic, charged. Building: from active conformations, protein-ligand complex, multiple actives (HipHop). Applications: virtual screening, SAR, scaffold hopping."
tags: ["analytical","pharmacophore","virtual-screening"]
difficulty: "advanced"
---

id: fc-anal-comp-198
front: "How do you predict peptide immunogenicity computationally?"
back: "MHC binding (NetMHCpan - T cell epitopes), T cell activation, antibody epitope mapping (discotope), sequence-based (human vs non-human). Software: IEDB, NetMHC, DiscoTope. Applications: deimmunization, less immunogenic design."
tags: ["analytical","immunogenicity","MHC","epitope"]
difficulty: "expert"
---

id: fc-anal-comp-199
front: "What is virtual screening for peptide drug discovery?"
back: "Computationally screen libraries. Methods: structure-based (docking), ligand-based (similarity, pharmacophore), ML. Peptide libraries: cyclic peptides, peptidomimetics. Applications: hit identification, fragment-based design."
tags: ["analytical","virtual-screening","hit-identification"]
difficulty: "advanced"
---

id: fc-anal-comp-200
front: "How do you use machine learning for peptide drug design?"
back: "Generative models (design new sequences - VAE, GAN), property prediction (activity, stability, permeability), sequence optimization (reinforcement learning), structure prediction (AlphaFold). Data: UniProt, PDB, proprietary HTS."
tags: ["analytical","machine-learning","generative-model","AlphaFold"]
difficulty: "expert"
---


## BIOLOGY OF PEPTIDE DRUGS

### Receptor Pharmacology (GPCR Signaling Cascades)

---
id: fc-synth-201
front: "What are the fundamental principles of solid-phase peptide synthesis (SPPS)?"
back: "Iterative coupling of Fmoc/Boc-protected amino acids to resin. Steps: deprotection (piperidine for Fmoc), coupling (activated amino acid), capping, cleavage. Advantages: excess reagents drive to completion, purification by washing, automation possible."
tags: ["synthesis","SPPS","Fmoc","Boc"]
difficulty: "intermediate"
---

id: fc-synth-202
front: "What are the differences between Fmoc and Boc SPPS strategies?"
back: "Fmoc: base-labile (piperidine), acid-labile side chain protection. Boc: acid-labile (TFA), HF cleavage. Fmoc advantages: milder, no HF, compatible with acid-sensitive modifications. Boc: better for aggregation-prone sequences. Fmoc dominates current practice."
tags: ["synthesis","Fmoc","Boc","SPPS"]
difficulty: "intermediate"
---

id: fc-synth-203
front: "What are the key coupling reagents used in SPPS?"
back: "Carbodiimides (DIC, EDC), uronium (HATU, HBTU), phosphonium (PyBOP, PyAOP), oxyma. Additives: HOBt, HOAt (reduce racemization). HATU: fastest, least racemization; DIC/Oxyma: cost-effective, safe."
tags: ["synthesis","coupling-reagents","HATU","HBTU"]
difficulty: "advanced"
---

id: fc-synth-204
front: "How do you prevent racemization during peptide coupling?"
back: "HOBt/HOAt additives, minimize base (0.5-1 eq DIPEA), couple at 0 C for sensitive residues (His, Cys, Phe), phosphonium reagents for His, avoid prolonged activation. Monitoring: Kaiser test (ninhydrin)."
tags: ["synthesis","racemization","HOBt"]
difficulty: "advanced"
---

id: fc-synth-205
front: "What resins are used in SPPS and how do you select them?"
back: "Rink amide MBHA (C-terminal amide), Wang (C-terminal acid), Sieber amide (acid-labile), Tentagel (PEG-grafted), ChemMatrix (100% PEG). Selection: C-terminal functionality, hydrophobicity, loading (0.1-0.8 mmol/g), cleavage. PEG resins for hydrophobic peptides."
tags: ["synthesis","resin","Rink-amide","Wang"]
difficulty: "advanced"
---

id: fc-synth-206
front: "What is the role of capping in SPPS?"
back: "Acetylation of unreacted amines after coupling. Purpose: reduces deletion sequences, prevents deletion peptide elongation, improves purity. Reagent: Ac2O. Timing: after each coupling or every 2-3 cycles. May reduce yield slightly."
tags: ["synthesis","capping","deletion-sequences"]
difficulty: "intermediate"
---

id: fc-synth-207
front: "How do you handle difficult sequences in SPPS?"
back: "Strategies: pseudoproline dipeptides, DiPEA, microwave-assisted SPPS, segment condensation, NCL. Monitoring: real-time UV (301 nm), LC-MS of crude. Aggregation-prone sequences benefit from pseudoproline incorporation."
tags: ["synthesis","difficult-sequences","pseudoproline","microwave"]
difficulty: "advanced"
---

id: fc-synth-208
front: "What are cleavage cocktails for Fmoc-SPPS?"
back: "Standard: TFA/TIPS/H2O (95:2.5:2.5). For Cys/Met/Trp: TFA/EDT/TIPS/H2O (92.5:2.5:2.5). Very acid-sensitive: TFA/DCM mixtures. Repeated cleavage (3x 10 min). Scavengers prevent Trp alkylation, Met oxidation, Cys alkylation."
tags: ["synthesis","cleavage","TFA","scavengers"]
difficulty: "advanced"
---

id: fc-synth-209
front: "What is microwave-assisted SPPS and its advantages?"
back: "Heats during coupling/deprotection. Advantages: faster coupling (minutes), higher purity, better yields for difficult sequences, reduced racemization. Parameters: 50-80 C, 10-30 min coupling. Instruments: CEM Liberty, Biotage."
tags: ["synthesis","microwave","SPPS","automation"]
difficulty: "advanced"
---

id: fc-synth-210
front: "How do you perform quality control during SPPS?"
back: "Kaiser test (free amines), UV monitoring (301 nm - Fmoc removal), LC-MS of aliquots (every 5-10 residues), MALDI-TOF. Post-synthesis: analytical HPLC (purity), MS (identity), amino acid analysis, residual solvents (ICH Q3C)."
tags: ["synthesis","quality-control","Kaiser-test"]
difficulty: "intermediate"
---

id: fc-synth-211
front: "What are the main chromatographic methods for peptide purification?"
back: "RP-HPLC (C18/C8 - most common), IEX-HPLC (charge-based), SEC (size-based), HILIC (hydrophilic), affinity (immunoaffinity). RP-HPLC: water/acetonitrile with 0.1% TFA. C18 for hydrophobic, C8 for moderate."
tags: ["synthesis","purification","HPLC"]
difficulty: "intermediate"
---

id: fc-synth-212
front: "How do you optimize HPLC gradient conditions for peptide purification?"
back: "Initial gradient (5-65% B over 30 min), adjust slope (shallower = better resolution), modify TFA (0.1%), change temperature (40-60 C), try different columns (C18 vs C8 vs phenyl). Preparative: larger column, lower flow, higher loading."
tags: ["synthesis","purification","gradient"]
difficulty: "advanced"
---

id: fc-synth-213
front: "What is the role of counterions in peptide purification?"
back: "TFA (most common, volatile), HCl, acetate. TFA: improves resolution, enhances solubility, can be exchanged. Removal: lyophilization, ion exchange. Specification: residual TFA <0.1%."
tags: ["synthesis","counterion","TFA"]
difficulty: "advanced"
---

id: fc-synth-214
front: "How do you scale up peptide purification?"
back: "Increase column diameter (10-100x), maintain linear flow rate, increase loading (10-20 g/L resin), optimize gradient. Equipment: prep HPLC (Agilent, Waters), flash (Biotage). Considerations: column lifetime, solvent consumption, yield vs purity."
tags: ["synthesis","scale-up","preparative-HPLC"]
difficulty: "advanced"
---

id: fc-synth-215
front: "What are the challenges in purifying cyclic peptides?"
back: "Multiple isomers (regioisomers), different ring sizes, epimerization. Strategies: optimize cyclization before purification, orthogonal purification (RP + IEX), chiral HPLC, preparative SFC. Monitoring: LC-MS for isomer identification."
tags: ["synthesis","cyclic-peptides","purification"]
difficulty: "expert"
---

id: fc-synth-216
front: "How do you remove process-related impurities from peptides?"
back: "Deletion sequences, truncated sequences, D-amino acid isomers, oxidized forms, deamidated forms, residual reagents, scavengers. Removal: RP-HPLC (main), IEX (charge variants), precipitation, ultrafiltration (size)."
tags: ["synthesis","impurities","purification"]
difficulty: "advanced"
---

id: fc-synth-217
front: "What analytical methods confirm peptide purity after purification?"
back: "RP-HPLC (area%), LC-MS (identity + purity), CE (charge variants), amino acid analysis, Karl Fischer (water), ICP-MS (metals), residual solvents (GC). Spec: >95% (HPLC), <98% for GMP. Certificate of Analysis includes all."
tags: ["synthesis","purity","analytical","CoA"]
difficulty: "intermediate"
---

id: fc-synth-218
front: "What are the key considerations for GMP manufacturing of peptide drugs?"
back: "Validated SPPS, in-process controls, raw material specs, equipment qualification (IQ/OQ/PQ), environmental controls, documentation (batch records), stability (ICH Q5C). Facility: dedicated or segregated."
tags: ["synthesis","GMP","manufacturing","validation"]
difficulty: "advanced"
---

id: fc-synth-219
front: "What is the typical workflow for peptide drug substance manufacturing?"
back: "Resin selection/loading, SPPS synthesis, cleavage, crude isolation (precipitation/lyophilization), purification (RP-HPLC), counterion exchange, lyophilization, analytical testing, packaging/storage. Timeline: 2-6 months."
tags: ["synthesis","manufacturing","workflow"]
difficulty: "intermediate"
---

id: fc-synth-220
front: "How do you validate an SPPS manufacturing process?"
back: "Process qualification (3 consecutive batches), cleaning validation, analytical method validation, environmental monitoring. Parameters: yield, purity, identity, impurity profile, residual solvents. Acceptance: predefined specs. Revalidation: after changes."
tags: ["synthesis","validation","process-qualification"]
difficulty: "advanced"
---

id: fc-synth-221
front: "What are the challenges in scaling SPPS from lab to manufacturing?"
back: "Mixing efficiency, temperature control, reagent cost, waste generation, cycle time, resin swelling. Solutions: continuous flow SPPS, automated synthesizers, solvent recycling, optimized protocols. Equipment: CS Bio, Gyros."
tags: ["synthesis","scale-up","SPPS","automation"]
difficulty: "advanced"
---

id: fc-synth-222
front: "How do you ensure supply chain integrity for peptide manufacturing?"
back: "Qualified suppliers (Fmoc-amino acids, resins, solvents), incoming inspection, stability testing, cold chain management, inventory (just-in-time vs buffer stock). Critical: amino acid purity (>99%), resin loading, solvent grade."
tags: ["synthesis","supply-chain","raw-materials"]
difficulty: "intermediate"
---

id: fc-synth-223
front: "What are the environmental considerations in peptide manufacturing?"
back: "Solvent waste (DMF, NMP, DCM - hazardous), TFA waste, energy consumption, water usage. Mitigation: solvent recycling, green chemistry alternatives (water-based SPPS), waste treatment, energy efficiency. Regulatory: EPA, local."
tags: ["synthesis","environmental","waste"]
difficulty: "intermediate"
---

id: fc-synth-224
front: "What is native chemical ligation (NCL) and how does it work?"
back: "Chemoselective ligation of unprotected fragments. N-terminal Cys thioester reacts with C-terminal thioester, transthioesterification, S-to-N acyl shift to native peptide bond. Requirements: N-terminal Cys, C-terminal thioester. Advantages: no protecting groups, aqueous."
tags: ["synthesis","NCL","thioester","ligation"]
difficulty: "advanced"
---

id: fc-synth-225
front: "What are the limitations of native chemical ligation?"
back: "Requires N-terminal Cys, thioester instability (hydrolysis), epimerization, slow kinetics, purification between steps. Extensions: desulfurization (Cys to Ala), elenamide ligation, photochemical ligation."
tags: ["synthesis","NCL","limitations","desulfurization"]
difficulty: "advanced"
---

id: fc-synth-226
front: "How do you synthesize peptide thioesters for NCL?"
back: "Fmoc-SPPS with thioester resin (trityl), crypto-thioesters (masked), N-acyl urea activation, peptide hydrazide (oxidative). Challenges: hydrolysis, base-labile thioesters, epimerization. Solutions: pseudoprolines, low-temperature."
tags: ["synthesis","thioester","NCL","SPPS"]
difficulty: "expert"
---

id: fc-synth-227
front: "What is desulfurization and how is it used after NCL?"
back: "Converts Cys to Ala after NCL. Reagents: Raney Nickel (classic), VA-044/TCEP (radical), photoredox. Purpose: removes Cys if not desired, simplifies purification, maintains native sequence. Selectivity: differentiates Cys from Met."
tags: ["synthesis","desulfurization","Cys","Ala"]
difficulty: "advanced"
---

id: fc-synth-228
front: "What is chemoenzymatic peptide synthesis?"
back: "Combines chemical and enzymatic methods. Enzymes: proteases (reverse proteolysis), ligases (sortase, SpyCatcher). Advantages: high selectivity, mild conditions, no protecting groups. Applications: site-specific modification, cyclization, conjugation."
tags: ["synthesis","chemoenzymatic","sortase"]
difficulty: "advanced"
---

id: fc-synth-229
front: "How does sortase-mediated ligation work?"
back: "Sortase A (Staphylococcus aureus): recognizes LPXTG motif, cleaves between T and G, transfers to oligoglycine nucleophile. Applications: protein labeling, cyclization, conjugation (ADC), protein fusions. Limitations: sequence requirement, kinetics."
tags: ["synthesis","sortase","ligation","LPXTG"]
difficulty: "expert"
---

id: fc-synth-230
front: "What are intein-based methods for peptide and protein synthesis?"
back: "Inteins: protein splicing elements that excise themselves and ligate flanking sequences (exteins). Applications: recombinant protein purification (intein-chitin binding), expressed protein ligation (EPL), cyclic peptide synthesis. Advantages: no chemical reagents."
tags: ["synthesis","intein","splicing","EPL"]
difficulty: "expert"
---

id: fc-synth-231
front: "What is click chemistry and how is it applied to peptide synthesis?"
back: "CuAAC (copper-catalyzed azide-alkyne cycloaddition) and SPAAC (strain-promoted). Applications: 1) peptide macrocyclization (dialkynyl peptides + diazide crosslinkers), 2) bioconjugation (azide-labeled peptides + alkyne-reporters), 3) peptide stapling, 4) triazole-containing peptidomimetics. Advantages: high yield, mild conditions, bioorthogonal."
tags: ["synthesis","click-chemistry","CuAAC","macrocyclization"]
difficulty: "advanced"
---

id: fc-synth-232
front: "What is flow chemistry and how does it apply to peptide synthesis?"
back: "Continuous flow through reactors instead of batch. Advantages: better heat/mass transfer, improved safety (small volumes), easier scale-up, reduced waste. Applications: 1) continuous SPPS (faster cycles), 2) peptide macrocyclization, 3) late-stage modifications. Equipment: Vapourtec, CEM Liberty Prime (flow-capable)."
tags: ["synthesis","flow-chemistry","continuous","SPPS"]
difficulty: "advanced"
---

id: fc-synth-233
front: "How do you perform on-resin modifications during SPPS?"
back: "Modifications while peptide attached to resin: 1) side-chain deprotection/selective protection, 2) cyclization (lactam formation), 3) thioester formation (hydrazide method), 4) fluorescent labeling, 5) PEGylation, 6) fatty acid acylation. Advantages: peptide stays anchored, easy washing. Challenges: diffusion limitations on resin."
tags: ["synthesis","on-resin","modification","SPPS"]
difficulty: "advanced"
---

id: fc-synth-234
front: "What are the analytical methods for monitoring SPPS coupling efficiency?"
back: "Kaiser test (ninhydrin - free amines blue/purple), chloranil test (secondary amines - proline), TNBS test (free amines - orange), real-time UV monitoring (301 nm - Fmoc removal kinetics), inline conductivity. Post-coupling: LC-MS of cleaved aliquots."
tags: ["synthesis","coupling-efficiency","Kaiser-test","UV-monitoring"]
difficulty: "intermediate"
---

id: fc-synth-235
front: "How do you synthesize peptide libraries for high-throughput screening?"
back: "Approaches: 1) split-and-mix (one-bead-one-compound), 2) parallel synthesis (96-well format), 3) spot synthesis (cellulose membrane), 4) liquid-phase parallel synthesis. Library design: combinatorial (all combinations), positional scanning, directed. Quality: analytical LC-MS of representative members."
tags: ["synthesis","library","HTS","combinatorial"]
difficulty: "advanced"
---

id: fc-synth-236
front: "What is the role of protecting groups in peptide synthesis?"
back: "Protecting groups prevent unwanted side reactions. Side-chain protection: Boc (acid-labile), Fmoc (base-labile), Trt (very acid-labile), Pbf (for Arg), tBu (for Ser/Thr/Tyr). Orthogonal protection enables selective modification. Removal: TFA cocktails with scavengers."
tags: ["synthesis","protecting-groups","Boc","Fmoc","Trt"]
difficulty: "intermediate"
---

id: fc-synth-237
front: "How do you handle cysteine residues during peptide synthesis?"
back: "Cysteine challenges: oxidation (disulfide formation), alkylation (during cleavage). Protection: Trt (trityl) - removed by TFA. For disulfide bonds: 1) regioselective protection (Acm, StBu), 2) orthogonal deprotection, 3) air oxidation or iodine-mediated. For free thiol: keep under inert atmosphere."
tags: ["synthesis","cysteine","disulfide","protection"]
difficulty: "advanced"
---

id: fc-synth-238
front: "What are the challenges in synthesizing phosphopeptides?"
back: "Phosphate ester labile to: 1) acidic conditions (TFA cleavage), 2) basic conditions (piperidine deprotection), 3) nucleophilic attack. Strategies: 1) phosphate protection (benzyl, pentafluorophenyl), 2) on-resin phosphorylation (phosphoramidite method), 3) global deprotection. Applications: signaling peptides, enzyme substrates."
tags: ["synthesis","phosphopeptide","phosphorylation"]
difficulty: "expert"
---

id: fc-synth-239
front: "How do you synthesize glycopeptides?"
back: "Glycopeptide synthesis: 1) glycosylated amino acid building blocks (Fmoc-X(glycan)-OH), 2) on-resin glycosylation (less common), 3) chemical ligation of glycan and peptide. Challenges: glycosidic bond stability, stereochemistry (alpha vs beta), stereoselectivity of glycosylation. Applications: vaccine candidates, glycoprotein mimetics."
tags: ["synthesis","glycopeptide","glycosylation"]
difficulty: "expert"
---

id: fc-synth-240
front: "What is peptide stapling and how does it improve drug properties?"
back: "Introduction of crosslinks (staples) between amino acid side chains to stabilize alpha-helical conformation. Methods: 1) hydrocarbon stapling (olefin metathesis), 2) lactam stapling (amide bond), 3) triazole stapling (click chemistry), 4) disulfide stapling. Benefits: increased helicity, cell permeability, protease resistance, target affinity."
tags: ["synthesis","stapling","alpha-helix","hydrocarbon"]
difficulty: "advanced"
---

id: fc-synth-241
front: "How do you perform peptide-to-protein total chemical synthesis?"
back: "Strategies: 1) native chemical ligation (NCL) of unprotected peptide fragments, 2) expressed protein ligation (EPL), 3) chemical protein synthesis (CPS). Fragment preparation: Fmoc-SPPS (up to ~50 residues each), Boc-SPPS for difficult sequences. Assembly: convergent, stepwise NCL with desulfurization. Total synthesis demonstrated for: ubiquitin, insulin, erythropoietin."
tags: ["synthesis","total-synthesis","NCL","protein"]
difficulty: "expert"
---

id: fc-synth-242
front: "What is the role of peptide chemistry in probe development?"
back: "Peptide probes for: 1) fluorescence imaging (FRET/BRET sensors), 2) photoaffinity labeling (UV-crosslinkers for target identification), 3) activity-based probes (ABPs for enzyme profiling), 4) PROTACs (peptide-based degraders), 5) molecular imaging (radiolabeled peptides for PET/SPECT). Design: balance between probe function and pharmacokinetics."
tags: ["synthesis","probes","FRET","photoaffinity"]
difficulty: "advanced"
---

id: fc-synth-243
front: "How do you optimize SPPS for large-scale (>100 g) production?"
back: "Optimization: 1) automated synthesizers with larger反应器 (0.5-5 L), 2) high-loading resins (0.8-1.0 mmol/g), 3) excess coupling reagents (3-5 eq), 4) extended coupling times (60-90 min), 5) real-time monitoring (UV, conductivity). Challenges: solvent consumption (hundreds of liters), waste disposal, cycle time (30-60 hours for 50-mers)."
tags: ["synthesis","scale-up","automation","large-scale"]
difficulty: "advanced"
---

id: fc-synth-244
front: "What are the key specifications for Fmoc-amino acid building blocks?"
back: "Specifications: 1) purity (>98% by HPLC), 2) optical rotation (D/L ratio), 3) water content (<0.5%), 4) residual solvents (ICH Q3C), 5) identity (MS, NMR), 6) loading on resin (determined by Fmoc quantification). Critical quality: racemization-free (HPLC analysis of diastereomers), absence of deletion impurities."
tags: ["synthesis","amino-acids","specifications","quality"]
difficulty: "intermediate"
---

id: fc-synth-245
front: "How do you establish a peptide manufacturing facility?"
back: "Requirements: 1) clean room (ISO 7/8), 2) HVAC with solvent-resistant components, 3) explosion-proof electrical (Class I, Div 1), 4) solvent storage and handling, 5) waste treatment (solvent recovery), 6) environmental monitoring, 7) equipment qualification. Regulatory: FDA 21 CFR 211, EU GMP Annex 1."
tags: ["synthesis","facility","GMP","manufacturing"]
difficulty: "expert"
---

id: fc-synth-246
front: "What are the ICH guidelines relevant to peptide manufacturing?"
back: "Q1A-Q1F (stability testing), Q2 (analytical validation), Q3A-Q3D (impurities), Q5C (biotech stability), Q6B (biologics specifications), Q7 (GMP for active substances), Q8 (pharmaceutical development), Q9 (quality risk management), Q10 (pharmaceutical quality system)."
tags: ["synthesis","ICH","GMP","quality"]
difficulty: "advanced"
---

id: fc-synth-247
front: "How do you handle solvent waste from peptide synthesis?"
back: "Solvents: DMF, NMP, DCM, piperidine, TFA (all hazardous). Management: 1) solvent recycling (distillation), 2) solvent neutralization (DMF hydrolysis), 3) professional waste disposal, 4) documentation (manifest). Green alternatives: 2-MeTHF (bio-derived), cyclopentyl methyl ether (CPME), ethanol-water systems."
tags: ["synthesis","solvent-waste","environmental","green-chemistry"]
difficulty: "intermediate"
---

id: fc-synth-248
front: "What is the role of peptide chemistry in vaccine development?"
back: "Peptide vaccines: 1) B-cell epitopes (linear or conformational), 2) T-cell epitopes (MHC-binding peptides), 3) multi-epitope constructs, 4) carrier proteins (keyhole limpet hemocyanin - KLH conjugates). Applications: cancer vaccines (neoantigens), infectious disease (SARS-CoV-2 spike peptides), autoimmune. Adjuvants: alum, CpG, poly(I:C)."
tags: ["synthesis","vaccine","epitope","immunology"]
difficulty: "advanced"
---

id: fc-synth-249
front: "How do you synthesize cyclic peptides on solid phase?"
back: "Methods: 1) head-to-tail (on-resin cyclization - DIC/HOBt or HATU), 2) side-chain to side-chain (lactam), 3) click chemistry (triazole), 4) ring-closing metathesis, 5) disulfide formation. Challenges: epimerization at C-terminus, dilution effects, resin interference. Optimization: pseudo-dilution (low loading resin), high dilution conditions."
tags: ["synthesis","cyclic-peptides","on-resin","cyclization"]
difficulty: "advanced"
---

id: fc-synth-250
front: "What are the regulatory requirements for peptide drug substance specifications?"
back: "Specifications include: 1) identity (amino acid analysis, MS, peptide mapping), 2) purity (RP-HPLC area% >95%), 3) related substances (individual impurities <0.5%), 4) residual solvents (ICH Q3C), 5) water content (Karl Fischer), 6) counterion content, 7) heavy metals (ICP-MS), 8) bacterial endotoxins (LAL), 9) sterility (where applicable)."
tags: ["synthesis","specifications","regulatory","quality-attributes"]
difficulty: "advanced"
---

id: fc-deliv-251
front: "What are the main formulation challenges for peptide drugs?"
back: "Proteolytic degradation, low membrane permeability, short half-life, aggregation, chemical instability (oxidation, deamidation), poor solubility for hydrophobic peptides, injection site reactions, immunogenicity from aggregates."
tags: ["delivery","formulation","challenges"]
difficulty: "intermediate"
---

id: fc-deliv-252
front: "What are the main routes of peptide drug delivery?"
back: "Parenteral (IV, SC, IM), oral (enhanced with permeation enhancers), nasal (mucosal), pulmonary (inhaled), transdermal (microneedles, iontophoresis), buccal/sublingual, rectal, ocular. Selection depends on peptide properties and therapeutic need."
tags: ["delivery","routes","formulation"]
difficulty: "intermediate"
---

id: fc-deliv-253
front: "How do you formulate peptides for subcutaneous injection?"
back: "Aqueous solution (most common), depot (microspheres, nanoparticles), pre-filled syringes/autoinjectors. Excipients: buffers (histidine, acetate), tonicity agents (mannitol), surfactants (polysorbate 80), stabilizers (trehalose). pH: 4-8 (optimize stability)."
tags: ["delivery","SC","formulation","excipients"]
difficulty: "intermediate"
---

id: fc-deliv-254
front: "What are peptide drug depots and how do they extend release?"
back: "PLGA microspheres (biodegradable, weeks-months), lipid nanoparticles, hydrogels (thermoreversible), implants (non-biodegradable). Mechanism: slow release from polymer matrix. Examples: leuprolide PLGA (1-6 months), octreotide LAR."
tags: ["delivery","depot","PLGA","extended-release"]
difficulty: "advanced"
---

id: fc-deliv-255
front: "How do thermoreversible hydrogels work for peptide delivery?"
back: "Liquid at room temperature, gel at body temperature. Polymers: poloxamers (Pluronic F127), poloxamines, PEG-PLA. Mechanism: micelle packing above CMC and LCST. Advantages: in situ gelation (syringeable), sustained release (days-weeks), localized delivery."
tags: ["delivery","hydrogel","thermoreversible","poloxamer"]
difficulty: "advanced"
---

id: fc-deliv-256
front: "What are the advantages of PEGylation for peptide drug delivery?"
back: "Half-life extension (reduced renal clearance), protease shielding, reduced immunogenicity, improved solubility, stealth properties. PEG types: linear (5-40 kDa), branched, comb-shaped. Site: N-terminus, Lys side chains, Cys (thiol)."
tags: ["delivery","PEGylation","half-life"]
difficulty: "intermediate"
---

id: fc-deliv-257
front: "How do albumin-binding peptides extend drug half-life?"
back: "Fatty acid acylation (semaglutide, liraglutide), C-terminal albumin-binding domain (ABD), non-covalent binders (Evans blue mimetic). Mechanism: reversibly binds albumin, evades renal filtration. Optimal Kd: 10-100 nM. Half-life: hours to days."
tags: ["delivery","albumin","half-life","acylation"]
difficulty: "intermediate"
---

id: fc-deliv-258
front: "What are nanoparticle formulations for peptide delivery?"
back: "PLGA (biodegradable), chitosan (mucoadhesive), lipid nanoparticles (LNPs), solid lipid nanoparticles (SLNs), polymeric micelles. Size: 10-1000 nm. Applications: oral delivery, targeted delivery, sustained release. Surface modification: PEGylation, targeting ligands."
tags: ["delivery","nanoparticle","PLGA","LNP"]
difficulty: "advanced"
---

id: fc-deliv-259
front: "How do you formulate peptides for oral delivery?"
back: "Permeation enhancers (SNAC, salcaprozate), enzyme inhibitors (camostat), mucoadhesive systems, nanoparticle encapsulation, intestinal patches, gastroretentive systems. Key: protect from GI enzymes, enhance permeation. Example: oral semaglutide (SNAC)."
tags: ["delivery","oral","SNAC","permeation-enhancer"]
difficulty: "advanced"
---

id: fc-deliv-260
front: "What is the role of excipients in peptide formulation?"
back: "Buffers (histidine, phosphate - pH control), tonicity agents (mannitol, sucrose), surfactants (polysorbate 80 - prevent aggregation), cryoprotectants (trehalose - lyophilization), antioxidants (Met, ascorbic acid). Selection: stability compatibility, regulatory status."
tags: ["delivery","excipients","formulation","stability"]
difficulty: "intermediate"
---

id: fc-deliv-261
front: "How do you develop a stability-indicating assay for peptide formulations?"
back: "Forced degradation (heat, light, oxidation, pH extremes), forced degradation with analytical method (RP-HPLC), method validation (specificity, linearity, accuracy, precision), identify degradation products (LC-MS). ICH guidelines: Q1A, Q5C."
tags: ["delivery","stability","ICH","forced-degradation"]
difficulty: "advanced"
---

id: fc-deliv-262
front: "What are the ICH stability guidelines for peptide drugs?"
back: "Q5C: long-term (25 C/60% RH, 12-24 months), accelerated (40 C/75% RH, 6 months), stress testing. Endpoints: potency, purity (HPLC), aggregates (SEC), degradation products, microbiological, appearance. Shelf life: based on 95% CI lower bound."
tags: ["delivery","ICH","Q5C","stability"]
difficulty: "advanced"
---

id: fc-deliv-263
front: "How do you lyophilize peptide formulations?"
back: "Freezing, primary drying (sublimation), secondary drying (desorption). Excipients: cryoprotectants (trehalose, sucrose), bulking agents (mannitol), buffers. Parameters: freezing rate, shelf temperature, chamber pressure. Result: stable powder, reconstitutable."
tags: ["delivery","lyophilization","trehalose","cryoprotectant"]
difficulty: "advanced"
---

id: fc-deliv-264
front: "What are autoinjector and wearable device formulations for peptides?"
back: "Pre-filled syringes/cartridges for SC self-injection. Wearable: on-body patch pumps (insulin, GLP-1 agonists). Requirements: viscosity (suitable for injection), stability (room temperature), volume (0.5-2 mL). Device: electronics for dosing, connectivity for monitoring."
tags: ["delivery","autoinjector","wearable","device"]
difficulty: "intermediate"
---

id: fc-deliv-265
front: "How do you formulate peptides for nasal delivery?"
back: "Mucoadhesive systems (chitosan, carbopol), permeation enhancers (cyclodextrins, bile salts), microspheres (starch, dextran), in situ gelling (poloxamers). Nose-to-brain: bypass BBB for CNS delivery. Challenges: mucociliary clearance, enzymatic degradation."
tags: ["delivery","nasal","mucoadhesive","nose-to-brain"]
difficulty: "advanced"
---

id: fc-deliv-266
front: "What are the advantages and limitations of pulmonary peptide delivery?"
back: "Advantages: large surface area, thin epithelium, rich blood supply, avoids first-pass. Limitations: mucus clearance, enzymatic degradation, variable deposition. Devices: MDIs, DPIs, nebulizers. Examples: inhaled insulin (Afrezza)."
tags: ["delivery","pulmonary","inhalation","insulin"]
difficulty: "advanced"
---

id: fc-deliv-267
front: "How do microneedle patches work for peptide delivery?"
back: "Micro-scale needles (25-1000 um) that penetrate stratum corneum. Types: solid (poke and patch), coated, dissolving, hollow (infusion). Advantages: painless, self-administered, bypasses skin barrier. Peptide: insulin, GLP-1 agonists. Challenge: skin irritation, loading capacity."
tags: ["delivery","microneedle","transdermal","patch"]
difficulty: "advanced"
---

id: fc-deliv-268
front: "What is the role of formulation in reducing peptide immunogenicity?"
back: "Remove aggregates (SEC filtration), optimize excipients (reduce immune activation), PEGylation (shield epitopes), humanize sequences, route of administration (SC > IV for some), dosing regimen (avoid high concentrations)."
tags: ["delivery","immunogenicity","formulation"]
difficulty: "advanced"
---

id: fc-deliv-269
front: "How do you design sustained-release peptide formulations?"
back: "PLGA microspheres/nanoparticles (weeks-months), hydrogels (days-weeks), osmotic pumps (days), implants (months), albumin binding (days), PEGylation (days). Selection: release duration, route, patient compliance, manufacturing complexity."
tags: ["delivery","sustained-release","PLGA"]
difficulty: "advanced"
---

id: fc-deliv-270
front: "What are the key quality attributes for peptide drug products?"
back: "Identity (MS, peptide mapping), purity (HPLC >95%), potency (bioassay), aggregates (SEC), degradation products, counterions, water content (Karl Fischer), sterility (USP <71>), endotoxin (LAL), fill volume."
tags: ["delivery","quality-attributes","specifications"]
difficulty: "intermediate"
---

id: fc-deliv-271
front: "How do you characterize peptide aggregation in formulations?"
back: "SEC (soluble aggregates), DLS (particle size, PDI), MFI (microflow imaging), AUC (sedimentation coefficient), light obscuration (subvisible particles). Aggregation drivers: agitation, temperature, interfaces, concentration, excipients."
tags: ["delivery","aggregation","SEC","DLS"]
difficulty: "advanced"
---

id: fc-deliv-272
front: "What are the FDA requirements for peptide drug product comparability?"
back: "Demonstrate product quality after manufacturing changes. Analytical similarity (structural, functional), non-clinical studies (if needed), clinical studies (if analytical not sufficient). ICH Q5E: comparability for biotechnology products."
tags: ["delivery","comparability","FDA","ICH"]
difficulty: "advanced"
---

id: fc-deliv-273
front: "How do you optimize peptide solubility for formulations?"
back: "pH adjustment (ionize charged residues), cosolvents (ethanol, PEG), surfactants (polysorbate), complexation (cyclodextrins), salt form selection (TFA, acetate), formulation as prodrug. Limit: isotonicity, safety of excipients."
tags: ["delivery","solubility","formulation","excipients"]
difficulty: "advanced"
---

id: fc-deliv-274
front: "What is the role of formulation in peptide drug shelf life?"
back: "Optimized formulation extends shelf life through: 1) pH control (minimize chemical degradation), 2) excipients (stabilize secondary structure), 3) lyophilization (remove water), 4) PEGylation (protect from proteases). Target: 24-36 months at 2-8 C."
tags: ["delivery","shelf-life","formulation","stability"]
difficulty: "intermediate"
---

id: fc-deliv-275
front: "How do you design peptide formulations for pediatric use?"
back: "Considerations: 1) taste masking (bitter peptides), 2) age-appropriate delivery (liquid oral, rectal suppositories), 3) flexible dosing (weight-based), 4) preservative-free (single-use), 5) stability at room temperature (storage in homes). Examples: nasal desmopressin, SC insulin."
tags: ["delivery","pediatric","formulation","taste-masking"]
difficulty: "advanced"
---

id: fc-deliv-276
front: "What are the challenges in formulating peptide combination products?"
back: "Challenges: 1) compatibility (different pH/stability requirements), 2) co-formulation (mixed formulations), 3) co-packaging (separate devices), 4) co-delivery (same site). Examples: insulin + GLP-1 agonist (fixed-ratio combinations). Solution: separate vials/cartridges, combination devices."
tags: ["delivery","combination","formulation","compatibility"]
difficulty: "advanced"
---

id: fc-deliv-277
front: "How do you handle peptide drug product serialization and traceability?"
back: "Requirements: FDA DSCSA (Drug Supply Chain Security Act), EU FMD (Falsified Medicines Directive). Serialization: unique product identifier (GTIN, serial number, lot, expiry) on unit-dose packaging. Track-and-trace: blockchain, cloud-based systems. Peptide-specific: cold chain tracking."
tags: ["delivery","serialization","track-and-trace","DSCSA"]
difficulty: "intermediate"
---

id: fc-deliv-278
front: "What are the emerging technologies for peptide drug delivery?"
back: "Emerging: 1) extracellular vesicles (exosomes), 2) gene delivery (peptide nucleic acids), 3) 3D-printed dosage forms, 4) smart delivery (stimuli-responsive), 5) organ-on-chip for formulation testing, 6) AI-driven formulation optimization. Trend: personalized medicine, precision dosing."
tags: ["delivery","emerging","exosome","3D-printing"]
difficulty: "advanced"
---

id: fc-deliv-279
front: "How do you design peptide formulations for cold chain management?"
back: "Strategies: 1) lyophilization (room temperature storage), 2) thermally stable formulations (excipient optimization), 3) temperature-stable PEGylated peptides, 4) controlled-release depots (reduce dosing frequency). Monitoring: IoT temperature sensors, data loggers. Regulatory: stability at 25 C/60% RH for 6 months."
tags: ["delivery","cold-chain","lyophilization","thermal-stability"]
difficulty: "advanced"
---

id: fc-deliv-280
front: "What are the regulatory requirements for peptide drug product shelf life?"
back: "ICH Q1A/Q5C: stability testing under storage conditions. Shelf life determination: 95% confidence interval lower bound of specification limits. Accelerated data: predict long-term stability. Changes: stability studies after formulation changes. Shelf life: 12-60 months (typically 24-36 months)."
tags: ["delivery","shelf-life","ICH","regulatory"]
difficulty: "advanced"
---

id: fc-deliv-281
front: "How do you formulate peptides for intrathecal delivery?"
back: "Intrathecal: directly into cerebrospinal fluid (CSF) via lumbar puncture or implantable pump. Challenges: CSF dynamics (turnover rate), limited volume (bolus), risk of infection. Examples: baclofen (spasticity), ziconotide (pain). Formulation: preservative-free, isotonic, pH 6-8."
tags: ["delivery","intrathecal","CNS","CSF"]
difficulty: "advanced"
---

id: fc-deliv-282
front: "What is the role of nanoparticles in targeted peptide delivery?"
back: "Nanoparticle targeting: 1) passive (EPR effect in tumors), 2) active (ligand-targeted - RGD, transferrin), 3) stimuli-responsive (pH, enzyme, temperature). Peptide display on nanoparticle surface for receptor-mediated endocytosis. Examples: peptide-doxorubicin conjugates in liposomes."
tags: ["delivery","nanoparticle","targeted","EPR"]
difficulty: "advanced"
---

id: fc-deliv-283
front: "How do you formulate long-acting peptide injectables (weekly/monthly)?"
back: "Strategies: 1) albumin-binding (semaglutide weekly), 2) PEGylation (pegvisomant monthly), 3) PLGA microspheres (leuprolide monthly/3-monthly), 4) crystalline suspensions (extended release). Formulation: viscosity for SC injection, room temperature stability, reconstitution if needed."
tags: ["delivery","long-acting","weekly","monthly"]
difficulty: "advanced"
---

id: fc-deliv-284
front: "What are the challenges in co-formulating peptides with small molecules?"
back: "Challenges: 1) different solubility profiles, 2) pH incompatibility, 3) chemical interactions (peptide-small molecule adducts), 4) different stability profiles, 5) manufacturing complexity (aseptic vs non-aseptic). Solutions: separate chambers (dual-chamber syringes), sequential administration."
tags: ["delivery","co-formulation","small-molecule","compatibility"]
difficulty: "advanced"
---

id: fc-deliv-285
front: "How do you design peptide formulations for intravenous infusion?"
back: "IV formulation: preservative-free (single-use), isotonic, pH 4-8, low particulate (0.2 um filter). Infusion: compatible with NS or D5W. Stability: 24-hour room temperature (infusion bag), 48-hour refrigerated. Examples: octreotide IV, vasopressin IV."
tags: ["delivery","IV","infusion","formulation"]
difficulty: "intermediate"
---

id: fc-deliv-286
front: "What is the role of formulation in reducing injection site reactions?"
back: "Strategies: 1) optimize pH (match physiological pH 7.4), 2) reduce injection volume (concentrated formulations), 3) add local anesthetics (lidocaine co-formulation), 4) PEGylation (reduce immunogenicity), 5) alternative routes (nasal, oral). Monitoring: injection site erythema, pain, pruritus."
tags: ["delivery","injection-site","formulation","tolerability"]
difficulty: "intermediate"
---

id: fc-deliv-287
front: "How do you formulate peptide drugs for resource-limited settings?"
back: "Considerations: 1) room temperature stability (eliminate cold chain), 2) oral/inhaled delivery (self-administration), 3) simple devices (autoinjectors), 4) low-cost materials, 5) minimal training. Examples: oral rehydration salts model, insulin pen devices in developing countries."
tags: ["delivery","resource-limited","room-temperature","accessibility"]
difficulty: "advanced"
---

id: fc-deliv-288
front: "What are the quality control tests for peptide drug products?"
back: "Tests: identity (MS), assay (HPLC), related substances (HPLC), degradation products, aggregates (SEC), particulate matter (USP <788>), sterility (USP <71>), bacterial endotoxins (USP <85>), pH, osmolality, fill volume, container closure integrity."
tags: ["delivery","quality-control","testing","specifications"]
difficulty: "intermediate"
---

id: fc-deliv-289
front: "How do you design peptide formulations for clinical trials?"
back: "Phase I: single dose (safety), placebo-controlled. Formulation: 1) scalable (GMP manufacturing), 2) blinded (matching placebo), 3) stable (study duration), 4) flexible (multiple dose levels). Supply: clinical trial materials (CTM) packaging, randomization, temperature monitoring."
tags: ["delivery","clinical-trials","CTM","formulation"]
difficulty: "intermediate"
---

id: fc-deliv-290
front: "What are the key considerations for peptide drug product labeling?"
back: "Labeling: 1) USPI (FDA), 2) SmPC (EMA), 3) patient information (medication guide). Content: indications, dosage, administration, contraindications, warnings, adverse reactions, pharmacology, storage. Peptide-specific: cold chain storage, reconstitution instructions, injection technique."
tags: ["delivery","labeling","USPI","SmPC"]
difficulty: "intermediate"
---

id: fc-deliv-291
front: "How do you perform stability studies for peptide drug products?"
back: "ICH Q1A/Q5C: long-term (25 C/60% RH), accelerated (40 C/75% RH), stress (60 C, light, humidity). Time points: 0, 3, 6, 9, 12, 18, 24, 36 months. Endpoints: assay, purity, degradation, aggregates, sterility, potency. Out-of-specification (OOS) investigation procedures."
tags: ["delivery","stability","ICH","OOS"]
difficulty: "advanced"
---

id: fc-deliv-292
front: "What is the role of formulation scientists in peptide drug development?"
back: "Responsibilities: 1) pre-formulation (solubility, stability, compatibility), 2) formulation design (excipient selection, dose form), 3) process development (manufacturing), 4) stability studies (ICH), 5) technology transfer (manufacturing site), 6) regulatory support (CMC sections)."
tags: ["delivery","formulation-scientist","drug-development"]
difficulty: "intermediate"
---

id: fc-deliv-293
front: "How do you design peptide formulations for veterinary use?"
back: "Considerations: 1) species-specific pharmacokinetics, 2) route of administration (SC, IV, oral for animals), 3) formulation stability (field conditions), 4) dose frequency (once weekly preferred), 5) safety (food animals - withdrawal period). Examples: deslorelin (veterinary GnRH agonist)."
tags: ["delivery","veterinary","formulation"]
difficulty: "intermediate"
---

id: fc-deliv-294
front: "What are the regulatory pathways for peptide drug product changes?"
back: "Post-approval changes: 1) minor (CBE-30 - labeling change), 2) moderate (CBE-30 - formulation change), 3) major (Prior Approval Supplement - new manufacturing site). comparability studies: ICH Q5E. Annual Product Review (APR) / Product Quality Review (PQR)."
tags: ["delivery","regulatory","post-approval","CBE-30"]
difficulty: "advanced"
---

id: fc-deliv-295
front: "How do you formulate peptides for combination drug delivery devices?"
back: "Device types: 1) dual-chamber syringes (separate drug/placebo), 2) autoinjectors (fixed dose), 3) pen injectors (flexible dosing), 4) patch pumps (continuous delivery). Formulation: viscosity matching, stability in device, compatibility with device materials (silicone, polycarbonate)."
tags: ["delivery","device","autoinjector","pen-injector"]
difficulty: "advanced"
---

id: fc-deliv-296
front: "What are the challenges in formulating peptides for inhalation?"
back: "Challenges: 1) molecular weight (limited aerodynamic diameter), 2) stability (nebulization shear forces), 3) solubility (dry powder formulation), 4) deposition (target lung regions), 5) clearance (mucociliary, macrophage). Strategies: nanoparticle carriers, lyophilized powders with lactose carriers."
tags: ["delivery","inhalation","dry-powder","nebulization"]
difficulty: "advanced"
---

id: fc-deliv-297
front: "How do you design peptide formulations for implantable devices?"
back: "Implant types: 1) non-biodegradable (ethylene-vinyl acetate - EVA), 2) biodegradable (PLGA rods), 3) osmotic pumps (ALZET), 4) microreservoirs. Peptide loading: 10-50% w/w. Release: diffusion-controlled or degradation-controlled. Applications: chronic pain (intrathecal), hormone replacement (subcutaneous)."
tags: ["delivery","implant","EVA","PLGA"]
difficulty: "advanced"
---

id: fc-deliv-298
front: "What is the role of formulation in peptide drug product recalls?"
back: "Common reasons: 1) sterility failure (endotoxin, microbial contamination), 2) out-of-specification results (potency, purity), 3) stability failure (degradation), 4) packaging defects (container closure). Prevention: robust formulation, stability monitoring, CAPA (Corrective and Preventive Action)."
tags: ["delivery","recall","stability","CAPA"]
difficulty: "advanced"
---

id: fc-deliv-299
front: "How do you perform tech transfer for peptide drug product manufacturing?"
back: "Tech transfer: transferring process knowledge from development to manufacturing. Documents: batch records, SOPs, specifications, validation protocols. Scale-up: pilot batches (10-100x scale), process validation (3 consecutive batches). Communication: joint development team (R&D + manufacturing)."
tags: ["delivery","tech-transfer","scale-up","validation"]
difficulty: "advanced"
---

id: fc-deliv-300
front: "What are the future trends in peptide drug delivery?"
back: "Trends: 1) oral peptide delivery (SNAC, permeation enhancers), 2) long-acting injectables (monthly/quarterly), 3) personalized dosing (3D-printed dosage forms), 4) smart delivery (stimuli-responsive systems), 5) biologics-chemical hybrids (peptide-drug conjugates), 6) digital health integration (connected devices)."
tags: ["delivery","future-trends","oral-delivery","long-acting"]
difficulty: "advanced"
---

id: fc-imm-301
front: "What are the innate immune responses to peptide drugs?"
back: "Innate responses: 1) complement activation (C3a, C5a - anaphylatoxins), 2) neutrophil activation (oxidative burst), 3) monocyte/macrophage activation (cytokine release), 4) NK cell activation. Peptide-specific: aggregation-dependent activation, sequence-dependent (cationic peptides). Measurement: complement activation (CH50, SC5b-9), cytokine release (IL-6, TNF-alpha)."
tags: ["immunology","innate","complement","cytokine"]
difficulty: "advanced"
---

id: fc-imm-302
front: "How do adaptive immune responses develop against peptide drugs?"
back: "Adaptive responses: 1) B-cell activation (antibody production - ADA), 2) T-cell activation (CD4+ helper, CD8+ cytotoxic), 3) memory responses (anamnestic). Peptide immunogenicity factors: sequence (non-human epitopes), aggregation, impurities, route (SC > IV), dose, frequency. T-cell epitope prediction: NetMHCpan, IEDB."
tags: ["immunology","adaptive","ADA","T-cell"]
difficulty: "advanced"
---

id: fc-imm-303
front: "What are the clinical consequences of anti-drug antibody (ADA) formation?"
back: "Consequences: 1) loss of efficacy (neutralizing ADA - NAb), 2) altered PK (accelerated clearance), 3) adverse events (type III hypersensitivity, anaphylaxis), 4) loss of endogenous protein function (cross-reactive NAb). Monitoring: ADA titer, NAb assay (cell-based). Management: dose adjustment, switch therapy."
tags: ["immunology","ADA","NAb","clinical-consequences"]
difficulty: "advanced"
---

id: fc-imm-304
front: "How do you design less immunogenic peptide therapeutics?"
back: "Strategies: 1) humanize sequences (reduce non-human epitopes), 2) remove T-cell epitopes (in silico prediction + mutagenesis), 3) PEGylation (shield epitopes), 4) optimize formulation (reduce aggregates), 5) route optimization (IV > SC for immunogenicity), 6) dosing regimen (avoid immune-stimulating intervals)."
tags: ["immunology","immunogenicity","deimmunization","design"]
difficulty: "expert"
---

id: fc-imm-305
front: "What is the role of peptide drugs in cancer immunotherapy?"
back: "Applications: 1) cancer vaccines (neoantigen peptides, tumor-associated antigens), 2) checkpoint inhibitors (peptide mimetics), 3) CAR-T cell therapy (peptide linkers), 4) bispecific antibodies (peptide-based), 5) peptide-drug conjugates (targeted delivery). Challenges: tumor heterogeneity, immune escape, TME immunosuppression."
tags: ["immunology","cancer","immunotherapy","vaccine"]
difficulty: "advanced"
---

id: fc-imm-306
front: "How do peptide vaccines stimulate immune responses?"
back: "Peptide vaccines: 1) B-cell epitopes (linear/conformational - antibody induction), 2) T-cell epitopes (MHC-binding - cellular immunity), 3) multi-epitope constructs. Delivery: adjuvants (alum, CpG, poly(I:C)), nanoparticles, dendritic cell loading. Examples: sipuleucel-T (prostate cancer), personalized neoantigen vaccines."
tags: ["immunology","vaccine","epitope","adjuvant"]
difficulty: "advanced"
---

id: fc-imm-307
front: "What are antimicrobial peptides (AMPs) and their mechanism of action?"
back: "AMPs: host defense peptides (defensins, cathelicidins) and synthetic analogs. Mechanisms: 1) membrane disruption (carpet model, toroidal pore), 2) intracellular targets (DNA, ribosomes, enzymes), 3) immunomodulation. Properties: cationic (+2 to +9), amphipathic, 12-50 residues. Resistance: lower than conventional antibiotics."
tags: ["immunology","AMP","antimicrobial","membrane-disruption"]
difficulty: "advanced"
---

id: fc-imm-308
front: "How do peptide therapeutics modulate inflammatory responses?"
back: "Modulation: 1) anti-inflammatory peptides (IL-10 mimetics, TNF-alpha inhibitors), 2) pro-resolution mediators (resolvins, protectins - omega-3 derived), 3) complement inhibitors (compstatin analogs), 4) chemokine receptor antagonists (CCR5 - maraviroc). Applications: autoimmune diseases, transplant rejection, sepsis."
tags: ["immunology","inflammation","anti-inflammatory","resolution"]
difficulty: "advanced"
---

id: fc-imm-309
front: "What is the role of peptide drugs in autoimmune disease treatment?"
back: "Applications: 1) antigen-specific tolerance (inverse vaccines, tolerogenic peptides), 2) cytokine inhibitors (IL-17, IL-23 peptide inhibitors), 3) T-cell modulators (CTLA-4 mimetics), 4) tolerogenic dendritic cell targeting. Examples: glatiramer acetate (MS), abatacept (CTLA-4-Fc for RA)."
tags: ["immunology","autoimmune","tolerance","glatiramer"]
difficulty: "advanced"
---

id: fc-imm-310
front: "How do you measure peptide immunogenicity in preclinical studies?"
back: "Methods: 1) in vitro T-cell proliferation (ELISpot, intracellular cytokine), 2) B-cell activation (antibody titers), 3) in vivo immunization (mouse, rabbit - ADA), 4) transgenic models (HLA-transgenic mice). Preclinical to clinical translation: 5-10x more immunogenic in humans than animals."
tags: ["immunology","immunogenicity","preclinical","ELISpot"]
difficulty: "advanced"
---

id: fc-imm-311
front: "What are the complement activation-related pseudoallergy (CARPA) reactions?"
back: "CARPA: non-IgE-mediated hypersensitivity to nanomedicines and liposomes. Mechanism: complement activation (C3a, C5a) triggers mast cell degranulation (histamine release). Symptoms: flushing, dyspnea, chest pain, hypotension. Diagnosis: skin prick test, complement activation assays. Prevention: slow infusion rate, premedication (corticosteroids, antihistamines)."
tags: ["immunology","CARPA","complement","hypersensitivity"]
difficulty: "advanced"
---

id: fc-imm-312
front: "How do peptide drugs interact with the major histocompatibility complex (MHC)?"
back: "MHC class I: presents 8-10 residue peptides (CD8+ T-cells), endogenous pathway. MHC class II: presents 13-25 residue peptides (CD4+ T-cells), exogenous pathway. Peptide binding: anchor residues (position 2, 9 for MHC-I), flanking residues. Implications: peptide immunogenicity depends on MHC binding affinity."
tags: ["immunology","MHC","T-cell","epitope"]
difficulty: "expert"
---

id: fc-imm-313
front: "What is the role of peptide drugs in transplant immunosuppression?"
back: "Applications: 1) induction therapy (basiliximab - anti-IL-2R), 2) maintenance (belatacept - CTLA-4-Ig), 3) rejection treatment (alemtuzumab - anti-CD52). Peptide challenges: immunogenicity of chimeric proteins, immunosuppression-related infections, malignancy risk."
tags: ["immunology","transplant","immunosuppression","belatacept"]
difficulty: "advanced"
---

id: fc-imm-314
front: "How do peptide-based biosimilars differ from small molecule generics?"
back: "Biosimilars: demonstrate similarity to reference product (quality, non-clinical, clinical), not identical. Generics: identical to reference (bioequivalence studies). Biosimilar requirements: stepwise approach (analytical > functional > clinical), immunogenicity comparison, biosimilarity margin."
tags: ["immunology","biosimilar","generic","regulatory"]
difficulty: "advanced"
---

id: fc-imm-315
front: "What are the immunological risks of peptide drug-drug combinations?"
back: "Risks: 1) additive immunogenicity (multiple immunogenic peptides), 2) altered ADA kinetics (one drug affects immune response to another), 3) cross-reactive antibodies, 4) immune complex formation. Assessment: combination immunogenicity studies (preclinical + clinical), ADA monitoring."
tags: ["immunology","combination","immunogenicity","ADA"]
difficulty: "advanced"
---

id: fc-imm-316
front: "How do you assess peptide immunogenicity risk during drug development?"
back: "Risk assessment: 1) in silico T-cell epitope prediction (NetMHCpan), 2) HLA binding assays (direct binding), 3) T-cell activation assays (ELISpot, ICAM), 4) B-cell epitope mapping (peptide arrays), 5) aggregation assessment (SEC, DLS), 6) formulation analysis (excipients, process). Risk categorization: low/medium/high."
tags: ["immunology","risk-assessment","prediction","T-cell-epitope"]
difficulty: "expert"
---

id: fc-imm-317
front: "What is the role of peptide therapeutics in infectious disease?"
back: "Applications: 1) antiviral peptides (fusion inhibitors - enfuvirtide), 2) antimicrobial peptides (membrane disruption), 3) antifungal peptides (histatin analogs), 4) antiparasitic peptides (trypanolytic factors), 5) vaccine candidates (epitope vaccines). Challenges: resistance development, stability in biological fluids."
tags: ["immunology","infectious-disease","antiviral","antimicrobial"]
difficulty: "advanced"
---

id: fc-imm-318
front: "How do peptide drugs interact with toll-like receptors (TLRs)?"
back: "TLR ligands: 1) TLR2 (lipopeptides - bacterial lipoproteins), 2) TLR3 (dsRNA mimetics), 3) TLR4 (LPS-mimetic peptides), 4) TLR7/8 (ssRNA mimetics), 5) TLR9 (CpG DNA mimetics). Applications: vaccine adjuvants, immunostimulatory peptides. Risk: TLR activation can cause cytokine storm."
tags: ["immunology","TLR","innate-immunity","adjuvant"]
difficulty: "expert"
---

id: fc-imm-319
front: "What are peptide-based cell therapies and their immunological considerations?"
back: "Peptide-cell therapy intersections: 1) peptide-MHC tetramers (T-cell monitoring), 2) peptide-loaded dendritic cells (cancer vaccines), 3) peptide-tagged cells (tracking, CAR-T), 4) tolerogenic peptide-MHC nanoparticles. Immunological considerations: T-cell exhaustion, cytokine release syndrome (CRS), neurotoxicity (ICANS)."
tags: ["immunology","cell-therapy","CAR-T","tetramer"]
difficulty: "expert"
---

id: fc-imm-320
front: "How do you monitor immune responses during peptide drug clinical trials?"
back: "Monitoring: 1) ADA testing (bridging ELISA - sensitivity, specificity), 2) NAb assays (cell-based - neutralizing capacity), 3) T-cell assays (ELISpot, intracellular cytokine), 4) cytokine panels (multiplex), 5) complement activation. Sampling: pre-dose, during, post-treatment. Time points: 2, 4, 8, 12, 16, 24 weeks."
tags: ["immunology","monitoring","clinical-trials","ADA"]
difficulty: "advanced"
---

id: fc-imm-321
front: "What are the immunological mechanisms of peptide allergy?"
back: "Peptide allergy: 1) IgE-mediated (type I hypersensitivity), 2) T-cell mediated (type IV - delayed), 3) immune complex (type III). Mechanisms: peptide cross-linking of IgE on mast cells, direct mast cell activation (cationic peptides), T-cell activation (allergic contact dermatitis). Diagnosis: skin prick test, specific IgE, T-cell proliferation."
tags: ["immunology","allergy","hypersensitivity","IgE"]
difficulty: "advanced"
---

id: fc-imm-322
front: "How do peptide drugs interact with the tumor microenvironment (TME)?"
back: "TME interactions: 1) peptide-drug conjugates (tumor targeting), 2) TME-modulating peptides (anti-angiogenic - endostatin), 3) immune checkpoint inhibitors (PD-1/PD-L1 peptide mimetics), 4) peptide vaccines (tumor-associated antigens). Challenges: TME heterogeneity, immunosuppressive milieu, drug delivery."
tags: ["immunology","TME","tumor","immunotherapy"]
difficulty: "advanced"
---

id: fc-imm-323
front: "What is the role of peptide therapeutics in rare autoimmune diseases?"
back: "Applications: 1) antigen-specific tolerance (myasthenia gravis - AChR peptides), 2) complement inhibition (atypical HUS - eculizumab), 3) cytokine targeting (familial Mediterranean fever - IL-1 inhibitors). Challenges: small patient populations, natural history studies, off-label use."
tags: ["immunology","rare-disease","autoimmune","tolerance"]
difficulty: "advanced"
---

id: fc-imm-324
front: "How do you design peptide-based immune checkpoint modulators?"
back: "Design: 1) PD-1/PD-L1 peptide inhibitors (competitive binding), 2) CTLA-4 peptide mimetics (block co-stimulation), 3) LAG-3/TIGIT peptide ligands, 4) bispecific peptides (simultaneous checkpoint blockade). Strategies: stapled peptides (helix stabilization), macrocyclic peptides (enhanced binding), Fc fusion (half-life extension)."
tags: ["immunology","checkpoint","PD-1","CTLA-4"]
difficulty: "expert"
---

id: fc-imm-325
front: "What are the immunological considerations for peptide drug re-dosing?"
back: "Re-dosing: 1) pre-existing ADA (can affect efficacy), 2) anamnestic responses (accelerated clearance), 3) desensitization protocols (for hypersensitivity), 4) dose escalation (immune tolerance induction). Monitoring: ADA titers before each dose, PK changes, clinical response."
tags: ["immunology","re-dosing","ADA","desensitization"]
difficulty: "advanced"
---

id: fc-imm-326
front: "How do peptide drugs interact with natural killer (NK) cells?"
back: "NK cell interactions: 1) activating ligands (peptide-MHC-I binding to NKG2D), 2) inhibitory receptors (peptide-MHC-I binding to KIR), 3) antibody-dependent cellular cytotoxicity (ADCC - peptide-antibody conjugates). Applications: NK cell-based immunotherapy, bi-specific T-cell engagers (BiTE)."
tags: ["immunology","NK-cell","ADCC","immunotherapy"]
difficulty: "expert"
---

id: fc-imm-327
front: "What are the challenges in developing peptide vaccines for cancer?"
back: "Challenges: 1) tumor heterogeneity (multiple neoantigens needed), 2) immune escape (antigen loss, MHC downregulation), 3) TME immunosuppression (Treg, MDSC), 4) patient HLA diversity (need multi-epitope approaches), 5) manufacturing (personalized vaccines). Solutions: mRNA-peptide combinations, nanoparticle delivery."
tags: ["immunology","cancer-vaccine","neoantigen","challenges"]
difficulty: "advanced"
---

id: fc-imm-328
front: "How do peptide drugs modulate regulatory T-cell (Treg) function?"
back: "Modulation: 1) Treg depletion (anti-CD25 - daclizumab), 2) Treg expansion (low-dose IL-2 - tebentafusp), 3) Treg targeting (CTLA-4 modulation), 4) antigen-specific Tregs (peptide-MHC-II nanoparticles). Applications: autoimmunity (Treg expansion), cancer (Treg depletion)."
tags: ["immunology","Treg","regulation","autoimmunity"]
difficulty: "expert"
---

id: fc-imm-329
front: "What is the role of peptide therapeutics in cytokine storm management?"
back: "Cytokine storm: excessive cytokine release (IL-6, TNF-alpha, IL-1). Peptide interventions: 1) IL-6 receptor antagonists (tocilizumab - peptide-based), 2) TNF-alpha inhibitors (peptide mimetics), 3) IL-1 receptor antagonists (anakinra), 4) JAK inhibitors (tofacitinib - small molecule, but pathway relevant). Applications: CAR-T CRS, COVID-19."
tags: ["immunology","cytokine-storm","IL-6","CRS"]
difficulty: "advanced"
---

id: fc-imm-330
front: "How do you perform immunogenicity risk assessment for peptide drug candidates?"
back: "Risk assessment framework: 1) sequence analysis (T-cell epitope prediction, human homology), 2) structural analysis (aggregation propensity, post-translational modifications), 3) formulation analysis (excipient effects, process), 4) in vitro immunogenicity (T-cell activation assays), 5) in vivo (transgenic mice). Risk mitigation: deimmunization, PEGylation, formulation optimization."
tags: ["immunology","risk-assessment","immunogenicity","deimmunization"]
difficulty: "expert"
---

id: fc-imm-331
front: "What are the immunological properties of cell-penetrating peptides (CPPs)?"
back: "CPP immunology: 1) TAT peptide (HIV-derived) - may activate TLR4, 2) penetratin - membrane perturbation, 3) R8/R9 - endosomal escape. Immunological considerations: sequence homology (non-human), aggregation (immunogenic), co-delivery of immunostimulatory cargo. Safety: transient membrane disruption, low immunogenicity for short peptides."
tags: ["immunology","CPP","TAT","penetratin"]
difficulty: "advanced"
---

id: fc-imm-332
front: "How do peptide drugs interact with antigen-presenting cells (APCs)?"
back: "APC interactions: 1) dendritic cells (cross-presentation of peptide antigens), 2) macrophages (phagocytosis of peptide formulations), 3) B-cells (direct activation by peptide-MHC). Implications: peptide vaccines (DC loading), peptide drug immunogenicity (unintended APC activation), tolerogenic peptides (DC tolerance)."
tags: ["immunology","APC","dendritic-cell","macrophage"]
difficulty: "expert"
---

id: fc-imm-333
front: "What are the immunological considerations for peptide drug discontinuation?"
back: "Discontinuation: 1) rebound effects (disease flare after stopping immunosuppressive peptides), 2) ADA persistence (can affect re-treatment), 3) immune reconstitution (time to normalize immune function), 4) vaccination timing (live vaccines during immunosuppression). Monitoring: immune markers during and after discontinuation."
tags: ["immunology","discontinuation","rebound","ADA"]
difficulty: "advanced"
---

id: fc-imm-334
front: "How do you develop peptide-based immunosuppressive therapies?"
back: "Approaches: 1) calcineurin inhibition (cyclosporine A - T-cell), 2) mTOR inhibition (sirolimus - peptide binding domain), 3) cytokine blockade (anti-IL-2R), 4) co-stimulation blockade (CTLA-4-Ig), 5) lymphocyte depletion (anti-CD52). Challenges: infection risk, malignancy, metabolic effects."
tags: ["immunology","immunosuppression","cyclosporine","CTLA-4-Ig"]
difficulty: "advanced"
---

id: fc-imm-335
front: "What is the role of peptide therapeutics in transplant tolerance induction?"
back: "Tolerance strategies: 1) co-stimulation blockade (belatacept - CTLA-4-Ig), 2) donor-specific transfusion (peptide-MHC), 3) regulatory cell therapy (Treg expansion), 4) chimerism induction (mixed chimerism protocols). Goal: drug-free tolerance (eliminate immunosuppression). Challenges: chronic rejection, infectious complications."
tags: ["immunology","tolerance","transplant","belatacept"]
difficulty: "expert"
---

id: fc-imm-336
front: "How do peptide-based biosimilars undergo comparative immunogenicity testing?"
back: "Comparative testing: 1) analytical similarity (structural, functional), 2) in vitro immunogenicity (T-cell activation assays), 3) clinical immunogenicity (ADA testing in comparative trials), 4) post-marketing surveillance (immunogenicity registries). Acceptable difference: similar immunogenicity (no clinically meaningful difference)."
tags: ["immunology","biosimilar","immunogenicity","comparative"]
difficulty: "expert"
---

id: fc-imm-337
front: "What are the immunological mechanisms of peptide-based antiviral therapy?"
back: "Antiviral mechanisms: 1) viral entry inhibitors (enfuvirtide - HIV gp41), 2) protease inhibitors (HCV NS3), 3) polymerase inhibitors (HCV NS5B), 4) capsid inhibitors (lenacapavir). Immunological: may reduce viral load, enabling immune reconstitution. Resistance: viral mutations under immune/drug pressure."
tags: ["immunology","antiviral","enfuvirtide","HIV"]
difficulty: "advanced"
---

id: fc-imm-338
front: "How do peptide drugs interact with the complement system?"
back: "Complement interactions: 1) classical pathway (IgG-peptide immune complexes), 2) alternative pathway (C3 convertase activation), 3) lectin pathway (mannose-binding lectin recognition). Complement activation can cause: CARPA, anaphylatoxin release (C3a, C5a), MAC formation. Mitigation: complement inhibitors (compstatin), slow infusion."
tags: ["immunology","complement","CARPA","C3a","C5a"]
difficulty: "advanced"
---

id: fc-imm-339
front: "What are the immunological considerations for peptide drug combination therapy?"
back: "Considerations: 1) additive/synergistic immunogenicity, 2) drug-drug interactions affecting immune cells, 3) overlapping toxicity profiles, 4) immune-mediated adverse events. Examples: checkpoint inhibitor combinations (ipilimumab + nivolumab - increased irAEs). Monitoring: comprehensive immune monitoring."
tags: ["immunology","combination-therapy","immunogenicity","irAE"]
difficulty: "advanced"
---

id: fc-imm-340
front: "How do you design peptide drugs that evade immune surveillance?"
back: "Evasion strategies: 1) PEGylation (shield from ADA recognition), 2) humanization (reduce non-human epitopes), 3) D-amino acids (resist protease, reduced immunogenicity), 4) cyclization (conformational masking), 5) albumin binding (rapid distribution reduces immune exposure), 6) oral delivery (mucosal tolerance)."
tags: ["immunology","immune-evasion","PEGylation","humanization"]
difficulty: "expert"
---

id: fc-imm-341
front: "What is the role of peptide therapeutics in allergic diseases?"
back: "Applications: 1) allergen-specific immunotherapy (peptide vaccines - AIT), 2) anti-IgE (omalizumab - monoclonal), 3) mast cell stabilizers (peptide analogs), 4) cytokine modulators (anti-IL-4/IL-13). Peptide vaccines: short T-cell epitopes (avoid IgE cross-linking), modified allergens (reduced anaphylaxis risk)."
tags: ["immunology","allergy","immunotherapy","AIT"]
difficulty: "advanced"
---

id: fc-imm-342
front: "How do peptide drugs influence macrophage polarization?"
back: "Macrophage polarization: M1 (pro-inflammatory) vs M2 (anti-inflammatory/tissue repair). Peptide modulation: 1) M2-inducing peptides (IL-4 mimetics), 2) M1-inducing peptides (IFN-gamma mimetics), 3) nanoparticle-mediated targeting. Applications: wound healing (M2), cancer immunotherapy (M1), fibrosis (M2 inhibition)."
tags: ["immunology","macrophage","M1","M2","polarization"]
difficulty: "expert"
---

id: fc-imm-343
front: "What are the immunological aspects of peptide drug immunosuppression in transplantation?"
back: "Transplant immunosuppression: induction (T-cell depletion - alemtuzumab), maintenance (CNIs - tacrolimus, mTOR inhibitors - sirolimus), rejection treatment (steroids, ATG). Peptide-specific: belatacept (CTLA-4-Ig - co-stimulation blockade). Monitoring: therapeutic drug monitoring (TDM), immune function assays (ImmuKnow)."
tags: ["immunology","transplant","immunosuppression","tacrolimus"]
difficulty: "advanced"
---

id: fc-imm-344
front: "How do you assess the immunotoxicity of peptide drug candidates?"
back: "Assessment: 1) lymphocyte proliferation assays, 2) cytokine release (Th1/Th2 balance), 3) NK cell activity, 4) macrophage function (phagocytosis, oxidative burst), 5) complement activation, 6) in vivo immunotoxicity (rodent models). ICH S8 guideline: immunotoxicity testing for pharmaceuticals."
tags: ["immunology","immunotoxicity","ICH-S8","assessment"]
difficulty: "advanced"
---

id: fc-imm-345
front: "What are the immunological considerations for peptide drug development in pediatrics?"
back: "Pediatric considerations: 1) immature immune system (different responses), 2) maternal antibody interference (neonates), 3) vaccination schedule (live vaccines during immunosuppression), 4) growth and development (long-term immunosuppression effects), 5) dosing (weight-based, BSA). Examples: insulin (pediatric type 1 diabetes), growth hormone."
tags: ["immunology","pediatrics","immune-development","vaccination"]
difficulty: "advanced"
---

id: fc-imm-346
front: "How do peptide drugs interact with the lymphatic system?"
back: "Lymphatic interactions: 1) lymph node targeting (peptide accumulation in lymph nodes), 2) lymphocyte recirculation (peptide-MHC), 3) lymphatic drug delivery (intralymphatic injection), 4) lymphatic mapping (peptide-based tracers). Applications: lymph node metastasis targeting, vaccine delivery to lymph nodes."
tags: ["immunology","lymphatic","lymph-node","targeting"]
difficulty: "advanced"
---

id: fc-imm-347
front: "What are the immunological mechanisms of peptide-based immunosuppression in autoimmunity?"
back: "Mechanisms: 1) T-cell anergy (peptide-MHC without co-stimulation), 2) T-cell deletion (high-dose peptide), 3) Treg induction (tolerogenic peptides), 4) immune deviation (Th1 to Th2 shift). Examples: glatiramer acetate (MS - Th2 shift), insulin peptides (type 1 diabetes - tolerance)."
tags: ["immunology","autoimmunity","tolerance","anergy"]
difficulty: "expert"
---

id: fc-imm-348
front: "How do you design peptide-based cancer immunotherapies for solid tumors?"
back: "Strategies: 1) neoantigen vaccines (personalized), 2) checkpoint inhibitors (peptide mimetics), 3) peptide-drug conjugates (tumor targeting), 4) bispecific peptides (T-cell engagement), 5) TME-modulating peptides (anti-angiogenic). Challenges: tumor heterogeneity, immune escape, drug delivery to TME."
tags: ["immunology","solid-tumor","cancer-immunotherapy","neoantigen"]
difficulty: "advanced"
---

id: fc-imm-349
front: "What is the role of peptide therapeutics in infectious disease vaccines?"
back: "Peptide vaccines: 1) linear epitopes (malaria - RTS,S), 2) multi-epitope constructs (tuberculosis), 3) virus-like particles (VLP - hepatitis B), 4) peptide-conjugate vaccines (pneumococcal). Delivery: adjuvants (AS01, MF59), nanoparticles (liposomes). Challenges: breadth of coverage, immune escape, cost."
tags: ["immunology","infectious-disease","vaccine","epitope"]
difficulty: "advanced"
---

id: fc-imm-350
front: "How do you monitor and manage immune-mediated adverse events in peptide drug trials?"
back: "Monitoring: 1) ADA testing (schedule), 2) clinical assessment (injection site reactions, systemic reactions), 3) laboratory markers (CRP, cytokines), 4) organ function (liver, kidney). Management: dose reduction, discontinuation, immunosuppression (steroids, antihistamines), desensitization protocols. Reporting: SAEs, AESIs (adverse events of special interest)."
tags: ["immunology","adverse-events","monitoring","management"]
difficulty: "advanced"
---

id: fc-adv-351
front: "What are peptide-drug conjugates (PDCs) and how do they work?"
back: "PDCs: peptide (targeting) + drug (payload) + linker. Components: 1) homing peptide (RGD, NGR - tumor-homing), 2) cytotoxic payload (doxorubicin, camptothecin), 3) cleavable linker (protease-cleavable, pH-sensitive). Mechanism: targeted delivery, intracellular release. Examples: [177Lu]Lu-DOTATATE (PRRT - neuroendocrine tumors)."
tags: ["advanced","PDC","conjugate","targeting"]
difficulty: "advanced"
---

id: fc-adv-352
front: "What are PROTACs (proteolysis-targeting chimeras) and their peptide applications?"
back: "PROTACs: bifunctional molecules (E3 ligase ligand + target protein ligand + linker). Mechanism: induced proximity -> ubiquitination -> proteasomal degradation. Peptide-based: 1) E3 ligase ligands (VHL, MDM2-binding peptides), 2) target-binding peptides, 3) peptide-linker optimization. Advantages: catalytic, overcomes resistance."
tags: ["advanced","PROTAC","degradation","E3-ligase"]
difficulty: "expert"
---

id: fc-adv-353
front: "What is the role of peptide therapeutics in gene therapy?"
back: "Applications: 1) cell-penetrating peptides (delivery of nucleic acids), 2) peptide nucleic acids (PNA - antisense), 3) peptide-based transfection reagents, 4) CRISPR delivery (peptide-Cas9 complexes), 5) AAV capsid peptides (retargeting). Challenges: endosomal escape, nuclear localization, immunogenicity."
tags: ["advanced","gene-therapy","CPP","PNA","CRISPR"]
difficulty: "advanced"
---

id: fc-adv-354
front: "How do peptide-based diagnostics work in clinical settings?"
back: "Diagnostic applications: 1) radiolabeled peptides (OctreoScan - octreotide for NET imaging), 2) peptide-based ELISAs (biomarker detection), 3) peptide arrays (autoantibody profiling), 4) peptide sensors (glucose-responsive - diabetes). Design: high affinity, selectivity, suitable pharmacokinetics for imaging."
tags: ["advanced","diagnostics","imaging","radiolabeled"]
difficulty: "advanced"
---

id: fc-adv-355
front: "What are the emerging peptide modalities beyond traditional therapeutics?"
back: "Emerging modalities: 1) cyclic peptides (permeable, protease-resistant), 2) macrocyclic peptides (protein-protein interaction disruptors), 3) stapled peptides (cell-permeable), 4) peptide-nucleic acid conjugates (gene regulation), 5) peptide hydrogels (tissue engineering), 6) peptide-based materials (self-assembly)."
tags: ["advanced","emerging","cyclic-peptides","macrocyclic"]
difficulty: "advanced"
---

id: fc-adv-356
front: "How do you apply artificial intelligence to peptide drug design?"
back: "AI applications: 1) generative models (design new sequences - VAE, GAN, transformer), 2) property prediction (activity, stability, permeability - graph neural networks), 3) sequence optimization (reinforcement learning), 4) structure prediction (AlphaFold), 5) virtual screening (ML-accelerated). Data: UniProt, PDB, proprietary HTS."
tags: ["advanced","AI","AlphaFold","generative-model"]
difficulty: "expert"
---

id: fc-adv-357
front: "What are the challenges in oral peptide drug delivery?"
back: "Challenges: 1) GI degradation (proteases - pepsin, trypsin), 2) poor permeability (hydrophilic, large MW), 3) efflux transporters (P-gp), 4) hepatic first-pass, 5) variable absorption (food effects, GI motility). Solutions: permeation enhancers (SNAC), enzyme inhibitors, mucoadhesive systems, nanoparticle carriers."
tags: ["advanced","oral-delivery","permeability","SNAC"]
difficulty: "advanced"
---

id: fc-adv-358
front: "What is the role of peptide therapeutics in regenerative medicine?"
back: "Applications: 1) growth factor mimetics (IGF-1, FGF peptides), 2) ECM-mimetic peptides (RGD, IKVAV - cell adhesion), 3) wound healing (thymosin beta-4), 4) bone regeneration (BMP peptides), 5) nerve regeneration (NGF-mimetic peptides). Peptide scaffolds: self-assembling peptides for tissue engineering."
tags: ["advanced","regenerative-medicine","scaffold","tissue-engineering"]
difficulty: "advanced"
---

id: fc-adv-359
front: "How do you design peptide-based biosensors?"
back: "Biosensor design: 1) recognition element (aptamer, antibody, peptide), 2) transducer (electrochemical, optical, piezoelectric), 3) signal processing. Peptide biosensors: 1) peptide-receptor binding (conformational change), 2) enzyme-substrate (catalytic), 3) molecularly imprinted peptides. Applications: glucose monitoring, biomarker detection."
tags: ["advanced","biosensor","aptamer","detection"]
difficulty: "advanced"
---

id: fc-adv-360
front: "What are the regulatory considerations for peptide drug-device combination products?"
back: "Combination products: 1) drug-device (autoinjector + peptide), 2) biologic-device (cell therapy + device), 3) drug-biologic-device. Regulatory: CDER (drug) or CBER (biologic) primary center, ORA (device) consultation. Requirements: device testing (IEC 60601), drug testing (ICH), combination testing (extractables/leachables, functionality)."
tags: ["advanced","combination-product","regulatory","device"]
difficulty: "advanced"
---

id: fc-adv-361
front: "How do peptide-based materials function in tissue engineering?"
back: "Peptide materials: 1) self-assembling peptides (EAK16, RADA16 - nanofibers), 2) peptide-functionalized scaffolds (RGD for cell adhesion), 3) peptide hydrogels (in situ gelling), 4) peptide-coated implants (osseointegration). Applications: 3D cell culture, wound healing, bone repair, nerve conduits."
tags: ["advanced","tissue-engineering","self-assembly","hydrogel"]
difficulty: "advanced"
---

id: fc-adv-362
front: "What is the role of peptide therapeutics in precision medicine?"
back: "Precision medicine: 1) biomarker-guided therapy (peptide biomarkers), 2) pharmacogenomics (HLA typing for immunogenicity), 3) personalized vaccines (neoantigen peptides), 4) companion diagnostics (peptide-based assays). Examples: 177Lu-DOTATATE (theranostic - PRRT), personalized neoantigen vaccines."
tags: ["advanced","precision-medicine","theranostic","neoantigen"]
difficulty: "advanced"
---

id: fc-adv-363
front: "How do you optimize peptide pharmacokinetics using computational methods?"
back: "Computational PK optimization: 1) in silico metabolism prediction (PEPDOM, CYP450 models), 2) membrane permeability prediction (SwissADME, Papps), 3) protein binding prediction (Plasma Protein Binding models), 4) PBPK modeling (Simcyp, GastroPlus). Applications: oral bioavailability prediction, half-life optimization."
tags: ["advanced","PK-optimization","computational","PBPK"]
difficulty: "expert"
---

id: fc-adv-364
front: "What are the key considerations for peptide drug pricing and market access?"
back: "Pricing: 1) value-based pricing (QALY analysis), 2) cost-plus pricing (manufacturing + margin), 3) reference pricing (comparator drugs), 4) outcomes-based contracts (pay-for-performance). Market access: 1) HTA submissions (NICE, ICER), 2) reimbursement negotiations, 3) patient assistance programs, 4) international reference pricing."
tags: ["advanced","pricing","market-access","HTA"]
difficulty: "advanced"
---

id: fc-adv-365
front: "How do peptide therapeutics contribute to the microbiome field?"
back: "Microbiome applications: 1) antimicrobial peptides (selective for pathogens, spare commensals), 2) microbiome modulators (peptide signals for bacterial communication), 3) peptide-based probiotics, 4) gut-brain axis peptides (neurotransmitter mimetics). Challenges: stability in gut, selectivity, delivery to specific gut regions."
tags: ["advanced","microbiome","gut-brain-axis","AMP"]
difficulty: "advanced"
---

id: fc-adv-366
front: "What is the role of peptide therapeutics in rare genetic disorders?"
back: "Applications: 1) enzyme replacement (peptide hormones), 2) protein replacement (recombinant peptides), 3) gene therapy (AAV-delivered), 4) substrate reduction (substrate analogs), 5) chaperone therapy (peptide chaperones). Examples: insulin (type 1 diabetes), growth hormone (GHD), calcitonin (Paget's)."
tags: ["advanced","rare-genetic","enzyme-replacement","chaperone"]
difficulty: "advanced"
---

id: fc-adv-367
front: "How do you design peptide-based immunomodulators for infectious diseases?"
back: "Immunomodulator design: 1) innate immune activators (TLR agonists), 2) adaptive immune enhancers (T-cell epitope vaccines), 3) cytokine modulators (IFN-gamma mimetics), 4) antimicrobial peptides (membrane disruption). Applications: tuberculosis (peptide vaccines), malaria (RTS,S), HIV (broadly neutralizing peptides)."
tags: ["advanced","infectious-disease","immunomodulator","TLR"]
difficulty: "advanced"
---

id: fc-adv-368
front: "What are the challenges in manufacturing peptide-drug conjugates (PDCs)?"
back: "Manufacturing challenges: 1) multi-step synthesis (peptide + linker + drug), 2) regioselectivity (site-specific conjugation), 3) linker stability (in vivo), 4) drug-to-peptide ratio (DPR control), 5) purification (unconjugated species). Solutions: orthogonal protection, click chemistry, preparative HPLC."
tags: ["advanced","PDC","manufacturing","conjugation"]
difficulty: "advanced"
---

id: fc-adv-369
front: "How do peptide therapeutics intersect with digital health technologies?"
back: "Digital health: 1) connected devices (smart pens, patch pumps), 2) wearable sensors (glucose monitoring - DCGM), 3) mobile apps (dose tracking, adherence), 4) telemedicine (remote monitoring), 5) AI-powered dosing (algorithmic dose adjustment). Examples: insulin pumps + CGM (closed-loop systems)."
tags: ["advanced","digital-health","connected-devices","CGM"]
difficulty: "advanced"
---

id: fc-adv-370
front: "What is the role of peptide therapeutics in pandemic preparedness?"
back: "Pandemic preparedness: 1) rapid vaccine development (peptide epitope vaccines), 2) antiviral peptides (fusion inhibitors), 3) diagnostic peptides (antigen detection), 4) immunomodulators (cytokine storm management). Examples: COVID-19 peptide vaccines, monoclonal antibodies (peptide-based). Manufacturing: platform technologies for rapid scale-up."
tags: ["advanced","pandemic","vaccine","antiviral"]
difficulty: "advanced"
---

id: fc-adv-371
front: "How do you design peptide-based therapeutics for CNS disorders?"
back: "CNS delivery challenges: 1) BBB penetration (<0.1%), 2) enzymatic degradation, 3) efflux transporters. Strategies: 1) intranasal delivery (nose-to-brain), 2) CPPs (TAT, penetratin), 3) receptor-mediated transcytosis (transferrin), 4) nanoparticles. Applications: Alzheimer's (beta-sheet breaker peptides), Parkinson's (alpha-synuclein inhibitors)."
tags: ["advanced","CNS","BBB","neurodegenerative"]
difficulty: "advanced"
---

id: fc-adv-372
front: "What are the emerging peptide modalities for metabolic diseases?"
back: "Emerging modalities: 1) dual/triple agonists (GLP-1/GIP/glucagon - tirzepatide, retatrutide), 2) oral peptides (semaglutide oral), 3) long-acting peptides (weekly/monthly), 4) liver-targeted peptides, 5) amylin analogs (pramlintide). Trends: multi-receptor agonism, reduced dosing frequency."
tags: ["advanced","metabolic","GLP-1","dual-agonist"]
difficulty: "advanced"
---

id: fc-adv-373
front: "How do peptide-based materials function in drug delivery?"
back: "Peptide materials: 1) self-assembling peptides (nanofibers, nanotubes), 2) peptide amphiphiles (lipopeptides - micelles), 3) peptide-functionalized nanoparticles (targeting), 4) peptide hydrogels (depot delivery), 5) peptide coatings (implant surface modification). Applications: targeted delivery, sustained release, tissue engineering."
tags: ["advanced","materials","self-assembly","amphiphile"]
difficulty: "advanced"
---

id: fc-adv-374
front: "What is the role of peptide therapeutics in wound healing?"
back: "Wound healing peptides: 1) growth factor mimetics (EGF, FGF analogs), 2) antimicrobial peptides (infection prevention), 3) ECM-mimetic peptides (RGD - cell adhesion), 4) anti-inflammatory peptides (IL-10 mimetics). Applications: chronic wounds (diabetic ulcers), burns, surgical wounds. Delivery: hydrogels, sprays, dressings."
tags: ["advanced","wound-healing","growth-factor","antimicrobial"]
difficulty: "advanced"
---

id: fc-adv-375
front: "How do you design peptide-based biosimilars?"
back: "Biosimilar design: 1) analytical similarity (structural, functional), 2) non-clinical studies (comparative), 3) clinical PK/PD (bioequivalence), 4) clinical efficacy/safety (comparative trials), 5) immunogenicity (comparative). Stepwise approach: analytical > functional > clinical. Interchangeability: additional switching studies."
tags: ["advanced","biosimilar","design","comparability"]
difficulty: "advanced"
---

id: fc-adv-376
front: "What are the challenges in developing peptide drugs for rare diseases?"
back: "Challenges: 1) small patient populations, 2) limited natural history data, 3) off-label use pressure, 4) manufacturing costs (per-patient), 5) regulatory pathways (orphan drug designation). Solutions: 1) patient registries, 2) basket trials, 3) adaptive designs, 4) international collaboration."
tags: ["advanced","rare-disease","orphan-drug","natural-history"]
difficulty: "advanced"
---

id: fc-adv-377
front: "How do peptide therapeutics contribute to sports medicine?"
back: "Sports medicine: 1) growth hormone secretagons (peptide-based - GHRPs), 2) tissue repair peptides (BPC-157), 3) anti-inflammatory peptides (for tendon injuries), 4) performance-enhancing peptides (EPO mimetics - banned). Regulatory: WADA prohibited list includes many peptides."
tags: ["advanced","sports-medicine","BPC-157","WADA"]
difficulty: "advanced"
---

id: fc-adv-378
front: "What is the role of peptide therapeutics in ophthalmology?"
back: "Ophthalmology applications: 1) anti-VEGF peptides (macular degeneration), 2) antimicrobial peptides (corneal infections), 3) neuropeptide modulators (glaucoma), 4) peptide-based eye drops (dry eye). Delivery challenges: ocular surface (tear turnover), corneal barrier, intraocular delivery."
tags: ["advanced","ophthalmology","anti-VEGF","ocular-delivery"]
difficulty: "advanced"
---

id: fc-adv-379
front: "How do you design peptide-based therapeutics for cardiovascular diseases?"
back: "Cardiovascular applications: 1) natriuretic peptides (nesiritide - BNP analog), 2) ACE inhibitors (peptide-based - enalaprilat), 3) anti-thrombotic peptides (bivalirudin), 4) lipid-modulating peptides (PCSK9 inhibitors). Challenges: rapid clearance (short half-life), injection site reactions."
tags: ["advanced","cardiovascular","nesiritide","bivalirudin"]
difficulty: "advanced"
---

id: fc-adv-380
front: "What are the emerging peptide-based approaches to antimicrobial resistance?"
back: "Approaches: 1) novel AMPs (resistance-free mechanism), 2) peptide antibiotics (teixobactin analogs), 3) anti-biofilm peptides, 4) peptide-antibiotic conjugates, 5) microbiome-sparing AMPs. Challenges: stability, toxicity, manufacturing cost, clinical development pipeline."
tags: ["advanced","AMR","antimicrobial","AMP"]
difficulty: "advanced"
---

id: fc-adv-381
front: "How do peptide therapeutics intersect with personalized cancer vaccines?"
back: "Personalized vaccines: 1) neoantigen prediction (MS + computational), 2) peptide synthesis (patient-specific epitopes), 3) delivery (nanoparticles, DC loading), 4) immune monitoring (T-cell responses). Examples: NeoVax (melanoma), IMA950 (glioblastoma). Challenges: tumor heterogeneity, immune escape, manufacturing turnaround."
tags: ["advanced","personalized-medicine","cancer-vaccine","neoantigen"]
difficulty: "expert"
---

id: fc-adv-382
front: "What is the role of peptide-based therapeutics in pain management?"
back: "Pain management: 1) calcitonin gene-related peptide (CGRP) inhibitors (migraine - erenumab), 2) opioid peptide analogs (analgesia with reduced addiction), 3) sodium channel blockers (peptide-based - PV1a), 4) nerve growth factor inhibitors (tanezumab). Challenges: CNS delivery, tolerance, addiction potential."
tags: ["advanced","pain-management","CGRP","migraine"]
difficulty: "advanced"
---

id: fc-adv-383
front: "How do you design peptide-based therapeutics for bone disorders?"
back: "Bone disorders: 1) parathyroid hormone analogs (teriparatide - osteoporosis), 2) calcitonin analogs (salmon calcitonin - Paget's), 3) BMP peptides (bone regeneration), 4) sclerostin inhibitors (romosozumab). Delivery: SC injection (teriparatide), nasal (calcitonin), local (BMP peptides in scaffolds)."
tags: ["advanced","bone-disorders","teriparatide","osteoporosis"]
difficulty: "advanced"
---

id: fc-adv-384
front: "What are the key considerations for peptide drug development in pediatrics?"
back: "Pediatric considerations: 1) age-appropriate formulations (liquid, powder), 2) dose calculation (weight-based, BSA), 3) route of administration (SC preferred), 4) immunogenicity (developing immune system), 5) long-term safety (growth, development). Regulatory: PIP (Pediatric Investigation Plan) required."
tags: ["advanced","pediatrics","formulation","dose"]
difficulty: "advanced"
---

id: fc-adv-385
front: "How do peptide therapeutics contribute to wound care and dermatology?"
back: "Dermatology: 1) antimicrobial peptides (wound infection), 2) growth factor peptides (EGF, FGF - wound healing), 3) anti-inflammatory peptides (atopic dermatitis), 4) cosmetic peptides (anti-aging - copper peptides). Delivery: topical (creams, gels), injectable (collagen-stimulating)."
tags: ["advanced","dermatology","wound-care","cosmetic-peptides"]
difficulty: "advanced"
---

id: fc-adv-386
front: "What is the role of peptide therapeutics in respiratory diseases?"
back: "Respiratory diseases: 1) inhaled peptides (insulin, GLP-1 agonists), 2) antimicrobial peptides (CF infections), 3) anti-inflammatory peptides (asthma), 4) surfactant proteins (ARDS). Delivery: MDIs, DPIs, nebulizers. Challenges: mucus clearance, enzymatic degradation, device dependence."
tags: ["advanced","respiratory","inhalation","asthma"]
difficulty: "advanced"
---

id: fc-adv-387
front: "How do you design peptide-based therapeutics for gastrointestinal diseases?"
back: "GI diseases: 1) gut-restricted peptides (local delivery - budesonide), 2) peptide-based biologics (adalimumab - anti-TNF), 3) peptide vaccines (IBD - tolerance induction), 4) antimicrobial peptides (C. difficile infection). Challenges: GI stability, targeted delivery, systemic absorption."
tags: ["advanced","GI-diseases","IBD","gut-restricted"]
difficulty: "advanced"
---

id: fc-adv-388
front: "What are the emerging peptide-based approaches to diabetes management?"
back: "Emerging approaches: 1) oral semaglutide (SNAC-enhanced), 2) once-weekly peptides (dulaglutide), 3) dual/triple agonists (tirzepatide - GIP/GLP-1), 4) amylin analogs (pramlintide), 5) glucagon receptor agonists (dual agonists). Trends: multi-receptor agonism, oral delivery, reduced dosing."
tags: ["advanced","diabetes","GLP-1","tirzepatide"]
difficulty: "advanced"
---

id: fc-adv-389
front: "How do peptide therapeutics contribute to neurodegenerative disease research?"
back: "Neurodegenerative diseases: 1) beta-sheet breaker peptides (Alzheimer's - amyloid-beta), 2) alpha-synuclein inhibitors (Parkinson's), 3) tau aggregation inhibitors, 4) neurotrophic peptides (NGF mimetics). Challenges: BBB delivery, aggregation kinetics, clinical trial design (biomarkers)."
tags: ["advanced","neurodegenerative","Alzheimer","Parkinson"]
difficulty: "advanced"
---

id: fc-adv-390
front: "What is the role of peptide therapeutics in reproductive medicine?"
back: "Reproductive medicine: 1) GnRH agonists/antagonists (IVF - leuprolide, cetrorelix), 2) FSH analogs (fertility treatment), 3) oxytocin analogs (labor induction), 4) progesterone receptor modulators. Challenges: cycle-dependent dosing, side effects (ovarian hyperstimulation)."
tags: ["advanced","reproductive-medicine","GnRH","IVF"]
difficulty: "advanced"
---

id: fc-adv-391
front: "How do you design peptide-based therapeutics for kidney diseases?"
back: "Kidney diseases: 1) erythropoiesis-stimulating peptides (ESAs - darbepoetin), 2) calcimimetics (cinacalcet - secondary hyperparathyroidism), 3) endothelin receptor antagonists (sparsentan - IgA nephropathy), 4) complement inhibitors (pegcetacoplan). Challenges: renal clearance (dose adjustment), anemia management."
tags: ["advanced","kidney-diseases","ESA","calcimimetic"]
difficulty: "advanced"
---

id: fc-adv-392
front: "What are the emerging peptide-based approaches to fibrosis?"
back: "Fibrosis approaches: 1) TGF-beta inhibitors (peptide mimetics), 2) collagen synthesis inhibitors (anti-fibrotic peptides), 3) integrin inhibitors (RGD-based - anti-fibrotic), 4) LOX inhibitors (lysyl oxidase - anti-fibrotic). Applications: liver fibrosis (NASH), pulmonary fibrosis (IPF), cardiac fibrosis."
tags: ["advanced","fibrosis","TGF-beta","anti-fibrotic"]
difficulty: "advanced"
---

id: fc-adv-393
front: "How do peptide therapeutics contribute to ophthalmic drug delivery?"
back: "Ophthalmic delivery: 1) intravitreal injection (anti-VEGF peptides), 2) topical (peptide eye drops), 3) sustained-release implants (intravitreal). Challenges: ocular surface clearance, corneal barrier, intraocular distribution. Innovations: nanoparticle suspensions, thermosensitive gels, microneedle ocular delivery."
tags: ["advanced","ophthalmic","intraocular","delivery"]
difficulty: "advanced"
---

id: fc-adv-394
front: "What is the role of peptide therapeutics in infectious disease pandemics?"
back: "Pandemic response: 1) rapid vaccine design (epitope-based), 2) antiviral peptides (fusion inhibitors), 3) diagnostic peptides (antigen detection), 4) immunomodulators (cytokine storm). Manufacturing: platform technologies, rapid scale-up, global distribution. Examples: COVID-19 peptide vaccines, monoclonal antibodies."
tags: ["advanced","pandemic-response","rapid-development","platform"]
difficulty: "advanced"
---

id: fc-adv-395
front: "How do you design peptide-based therapeutics for autoimmune uveitis?"
back: "Uveitis: 1) immunosuppressive peptides (calcineurin inhibitors), 2) anti-TNF peptides (adalimumab), 3) integrin inhibitors (natalizumab - alpha-4 integrin), 4) peptide vaccines (tolerogenic). Delivery: intravitreal injection, systemic (oral, SC). Challenges: eye-specific pharmacokinetics, immune privilege."
tags: ["advanced","uveitis","autoimmune","ophthalmology"]
difficulty: "advanced"
---

id: fc-adv-396
front: "What are the key considerations for global peptide drug development?"
back: "Global considerations: 1) regulatory harmonization (ICH), 2) pricing (international reference pricing), 3) manufacturing (global supply chain), 4) access (tiered pricing, technology transfer), 5) pharmacovigilance (global safety databases). Examples: insulin (global access initiative), GLP-1 agonists (global obesity epidemic)."
tags: ["advanced","global-development","access","supply-chain"]
difficulty: "advanced"
---

id: fc-adv-397
front: "How do peptide therapeutics contribute to rare neurological disorders?"
back: "Rare neurological: 1) enzyme replacement (Fabry disease - agalsidase), 2) substrate reduction (miglustat - Gaucher), 3) chaperone therapy (migalastat - Fabry), 4) gene therapy (AAV-delivered). Challenges: CNS delivery, small patient populations, newborn screening."
tags: ["advanced","rare-neurological","enzyme-replacement","CNS-delivery"]
difficulty: "advanced"
---

id: fc-adv-398
front: "What is the role of peptide-based therapeutics in veterinary medicine?"
back: "Veterinary applications: 1) GnRH agonists (reproductive control - deslorelin), 2) insulin (diabetes in companion animals), 3) growth hormone (livestock), 4) antimicrobial peptides (animal infections). Challenges: species-specific pharmacokinetics, food animal withdrawal periods, cost."
tags: ["advanced","veterinary","GnRH","insulin"]
difficulty: "advanced"
---

id: fc-adv-399
front: "How do you design peptide-based therapeutics for rare metabolic diseases?"
back: "Rare metabolic: 1) enzyme replacement (Gaucher, Fabry), 2) substrate reduction (Gaucher, Tay-Sachs), 3) chaperone therapy (Fabry, Pompe), 4) cofactor supplementation (sapropterin - PKU). Manufacturing: recombinant production (CHO cells, E. coli), purification (chromatography)."
tags: ["advanced","rare-metabolic","enzyme-replacement","chaperone"]
difficulty: "advanced"
---

id: fc-adv-400
front: "What are the future directions for peptide therapeutics in the next decade?"
back: "Future directions: 1) oral peptides (SNAC, permeation enhancers), 2) multi-receptor agonists (GLP-1/GIP/glucagon), 3) AI-designed peptides (AlphaFold, generative models), 4) personalized peptide vaccines (neoantigen), 5) peptide-drug conjugates (ADCs), 6) gene therapy delivery (AAV), 7) microbiome modulators, 8) digital health integration."
tags: ["advanced","future-directions","oral-delivery","AI","personalized"]
difficulty: "advanced"
---

