---
date: 2026-06-11
author: "Wikipept Contributors"
id: quiz-peptide-bond-resonance-001
question: "What is the primary consequence of resonance in the peptide bond?"
options:
  - "It increases bond flexibility"
  - "It gives the bond ~40% double-bond character and restricts rotation"
  - "It makes the bond more susceptible to hydrolysis"
  - "It prevents hydrogen bonding at the carbonyl oxygen"
correctIndex: 1
explanation: "The peptide bond exhibits resonance between the C=O and C-N forms, giving it approximately 40% double-bond character. This results in a bond length of ~1.32 Å (shorter than a typical C-N single bond at 1.47 Å) and restricts rotation around the C-N bond, keeping the amide group planar."
difficulty: "intermediate"
tags: ["peptide-bond", "resonance", "planarity", "bond-character"]
---

---

id: quiz-cis-trans-isomerization-001
question: "What is the typical ratio of trans to cis peptide bond conformers observed in proteins?"
options:

- "50:50"
- "70:30"
- "95:5 for Xaa-Pro bonds; >99:1 for other bonds"
- "99:1 for all peptide bonds uniformly"
  correctIndex: 2
  explanation: "For non-proline residues, the trans conformer is heavily favored (>99:1) due to steric clash between substituents in the cis form. However, Xaa-Pro peptide bonds show a higher cis population (~5-10%) because the steric difference between cis and trans is smaller for proline's cyclic side chain. Xaa-Pro cis-trans isomerization is often a rate-limiting step in protein folding."
  difficulty: "advanced"
  tags: ["cis-trans-isomerization", "proline", "conformation", "protein-folding"]

---

---

id: quiz-omega-angles-001
question: "What does the omega (ω) dihedral angle describe in a peptide?"
options:

- "Rotation around the Cα-C bond"
- "Rotation around the Cα-N bond"
- "The C-N peptide bond torsion: C(i-1)-N(i)-Cα(i)-C(i)"
- "The C-N peptide bond torsion: Cα(i-1)-C(i)-N(i)-Cα(i)"
  correctIndex: 3
  explanation: "The omega (ω) angle is defined by the four atoms Cα(i-1)-C(i)-N(i)-Cα(i), describing rotation around the peptide bond itself. Due to resonance, ω is restricted to ~180° (trans) or ~0° (cis). This is in contrast to phi (φ) and psi (ψ) angles which describe rotation around the N-Cα and Cα-C bonds respectively."
  difficulty: "advanced"
  tags: ["omega-angle", "dihedral-angles", "peptide-bond", "conformation"]

---

---

id: quiz-backbone-dihedral-001
question: "Which Ramachandran plot regions correspond to right-handed α-helix conformations?"
options:

- "φ ≈ -60°, ψ ≈ -45°"
- "φ ≈ -120°, ψ ≈ +120°"
- "φ ≈ -60°, ψ ≈ +120°"
- "φ ≈ +60°, ψ ≈ +45°"
  correctIndex: 0
  explanation: "The right-handed α-helix occupies the region of the Ramachandran plot at approximately φ ≈ -60° and ψ ≈ -45°. This conformation allows optimal intramolecular hydrogen bonding between C=O of residue i and N-H of residue i+4, forming the characteristic 3.6₁₃ helix. The left-handed α-helix (φ ≈ +60°, ψ ≈ +45°) is less common due to steric clashes with L-amino acid side chains."
  difficulty: "intermediate"
  tags: ["Ramachandran-plot", "dihedral-angles", "alpha-helix", "secondary-structure"]

---

---

id: quiz-side-chain-rotamers-001
question: "What are the three staggered rotameric states around the χ₁ dihedral angle called?"
options:

- "cis, trans, gauche"
- "gauche+ (g+), trans (t), gauche- (g-)"
- "eclipsed, staggered, anti"
- "syn, anti, periplanar"
  correctIndex: 1
  explanation: "The χ₁ rotamers are classified as gauche+ (g+, χ₁ ≈ -60°), trans (t, χ₁ ≈ 180°), and gauche- (g-, χ₁ ≈ +60°). These correspond to staggered conformations around the Cα-Cβ bond. Rotamer libraries, derived from high-resolution crystal structures, provide the probability distributions of these states and are critical for protein structure prediction and homology modeling."
  difficulty: "intermediate"
  tags: ["rotamers", "side-chain", "chi-angle", "conformation"]

---

---

id: quiz-peptide-solvation-001
question: "How do intrinsically disordered peptides (IDPs) interact with their solvent environment differently than folded proteins?"
options:

- "IDPs are more hydrophobic and exclude water"
- "IDPs have greater solvent-accessible surface area and interact with more water molecules"
- "IDPs do not interact with solvent at all"
- "IDPs form rigid hydration shells identical to folded proteins"
  correctIndex: 1
  explanation: "IDPs adopt extended, dynamic conformations that expose more backbone and side chain atoms to solvent. This results in a larger solvent-accessible surface area (SASA) compared to folded proteins of similar length. IDPs often have high net charge and low hydrophobicity, keeping them soluble and disordered. Their hydration shell is more dynamic and loosely structured compared to the ordered water around folded proteins."
  difficulty: "advanced"
  tags: ["solvation", "IDPs", "hydrophobic-effect", "hydration"]

---

---

id: quiz-peptide-aggregation-001
question: "What is the primary driving force for amyloid fibril formation in peptides?"
options:

- "Electrostatic interactions between charged residues"
- "Backbone hydrogen bonding in a cross-β arrangement"
- "Disulfide bond formation between cysteine residues"
- "Metal coordination at histidine residues"
  correctIndex: 1
  explanation: "Amyloid fibrils are stabilized primarily by backbone hydrogen bonds forming a cross-β structure, where β-strands run perpendicular to the fibril axis. This backbone-dominated interaction explains why diverse peptides and proteins can form amyloid—the common peptide backbone provides the hydrogen bonding pattern regardless of side chain identity. Side chains modulate kinetics and polymorphism but are not the primary driving force."
  difficulty: "advanced"
  tags: ["aggregation", "amyloid", "cross-beta", "hydrogen-bonding"]

---

---

id: quiz-amyloid-formation-001
question: "Which kinetic model best describes the sigmoidal growth curve observed in amyloid fibril formation?"
options:

- "Simple first-order kinetics"
- "Michaelis-Menten kinetics"
- "Nucleation-dependent polymerization with primary and secondary pathways"
- "Zero-order kinetics with substrate inhibition"
  correctIndex: 2
  explanation: "Amyloid formation follows nucleation-dependent polymerization, characterized by a lag phase (nucleation), exponential growth phase (elongation), and plateau phase. Secondary nucleation (fragmentation or surface-catalyzed nucleation) amplifies the process and creates the characteristic sigmoidal curve. The Finke-Watzky two-step model and Oosawa framework are commonly used to quantify these kinetics."
  difficulty: "advanced"
  tags: ["amyloid", "kinetics", "nucleation", "aggregation"]

---

---

id: quiz-peptide-amphiphiles-001
question: "What structural feature is characteristic of a peptide amphiphile (PA) molecule?"
options:

- "Two peptide sequences joined by a disulfide bond"
- "A hydrophobic alkyl tail conjugated to a peptide headgroup"
- "Alternating D- and L-amino acids"
- "A cyclic peptide with linear tails"
  correctIndex: 1
  explanation: "Peptide amphiphiles consist of a hydrophobic domain (typically an alkyl chain like C₁₆ palmitic acid) covalently attached to a peptide sequence that serves as the hydrophilic headgroup. In water, PAs self-assemble into cylindrical nanofibers, with the alkyl tails forming a hydrophobic core and the peptide segments displayed on the surface. This design enables applications in tissue engineering, drug delivery, and regenerative medicine."
  difficulty: "intermediate"
  tags: ["peptide-amphiphiles", "self-assembly", "nanofibers", "supramolecular"]

---

---

id: quiz-cyclic-peptide-design-001
question: "What is the primary advantage of using D-amino acids alternating with L-amino acids in cyclic peptide design?"
options:

- "It improves resistance to proteolytic degradation"
- "It allows the peptide to adopt a flat ring conformation suitable for transmembrane transport"
- "It increases the peptide's solubility in organic solvents"
- "It eliminates the need for protecting groups during synthesis"
  correctIndex: 1
  explanation: "Alternating D,L-cyclic peptides adopt a disc-like, flat conformation where all backbone amide bonds point outward from the ring, enabling them to stack through backbone-backbone hydrogen bonds to form transmembrane nanotubes. This flat geometry creates an internal pore of defined diameter. Additionally, D-amino acids confer protease resistance, but the primary design rationale for the alternating pattern is the structural geometry."
  difficulty: "advanced"
  tags: ["cyclic-peptides", "D-amino-acids", "nanotubes", "membrane-transport"]

---

---

id: quiz-stapled-peptide-001
question: "What is the primary purpose of hydrocarbon stapling in peptide drug design?"
options:

- "To increase peptide solubility in aqueous solution"
- "To stabilize the α-helical conformation and improve cell permeability"
- "To enable conjugation to fluorescent labels"
- "To protect the N-terminus from degradation"
  correctIndex: 1
  explanation: "Hydrocarbon stapling involves forming a covalent cross-link between side chains (typically via olefin metathesis of unnatural amino acids bearing terminal alkenes) to lock the peptide in an α-helical conformation. This pre-organization increases binding affinity to targets, improves proteolytic stability, and—critically—enhances cell permeability by stabilizing the hydrophobic face of the helix. Stapled peptides have been developed as inhibitors of protein-protein interactions."
  difficulty: "advanced"
  tags: ["stapled-peptides", "alpha-helix", "cell-permeability", "peptide-drugs"]

---

---

id: quiz-peptide-macrocycles-001
question: "What structural feature distinguishes a peptide macrocycle from a linear peptide of the same sequence?"
options:

- "The presence of non-natural amino acids"
- "A covalent ring closure constraining the backbone into a defined conformation"
- "The absence of hydrogen bond donors"
- "A higher molecular weight by 18 Da"
  correctIndex: 1
  explanation: "Peptide macrocycles contain a covalent ring formed by head-to-tail cyclization, side chain-to-side chain crosslinks, or side chain-to-terminus connections. This conformational constraint reduces the entropic penalty of binding, often improving target affinity and selectivity. Macrocyclization also shields polar backbone atoms from solvent, enhancing membrane permeability. Examples include cyclosporin A and the FDA-approved drugs linaclotide and plecanatide."
  difficulty: "intermediate"
  tags: ["macrocycles", "cyclization", "conformational-constraint", "drug-design"]

---

---

id: quiz-peptidomimetics-001
question: "Which peptidomimetic approach replaces the amide bond with a hydroxyethylamine isostere?"
options:

- "Retro-inverso modification"
- "HIV protease inhibitor design (e.g., saquinavir)"
- "β-turn mimetic design"
- "Click chemistry-derived triazole linkage"
  correctIndex: 1
  explanation: "Hydroxyethylamine isosteres replace the scissile amide bond in peptide substrates with a non-hydrolyzable -CH(OH)-CH₂-NH- moiety. This mimics the tetrahedral transition state of aspartyl protease catalysis. HIV protease inhibitors like saquinavir, ritonavir, and indinavir use this strategy to achieve potent, selective inhibition. The isostere maintains hydrogen bonding capacity while resisting enzymatic cleavage."
  difficulty: "advanced"
  tags: ["peptidomimetics", "isosteres", "HIV-protease", "drug-design"]

---

---

id: quiz-beta-peptides-001
question: "What key structural advantage do β-peptides have over natural α-peptides?"
options:

- "They form longer peptide bonds"
- "They adopt stable secondary structures at short chain lengths (as few as 4 residues)"
- "They are more susceptible to proteolysis"
- "They cannot form hydrogen bonds"
  correctIndex: 1
  explanation: "β-peptides, containing β-amino acids with an extra backbone methylene group, form stable helical and sheet-like secondary structures with as few as 4-6 residues. The additional backbone carbon provides greater conformational diversity (14-helix, 12-helix, 8-helix). They are resistant to proteolytic degradation because proteases recognize α-peptide bonds. These properties make β-peptides attractive scaffolds for drug design and biomaterials."
  difficulty: "advanced"
  tags: ["beta-peptides", "secondary-structure", "peptidomimetics", "protease-resistance"]

---

---

id: quiz-d-amino-acid-peptides-001
question: "What is the primary therapeutic rationale for incorporating D-amino acids into peptide drugs?"
options:

- "D-amino acids are cheaper to synthesize"
- "They increase peptide rigidity"
- "They confer resistance to proteolytic degradation by L-specific proteases"
- "They enhance membrane permeability through chirality matching"
  correctIndex: 2
  explanation: "Most endopeptidases and exopeptidases are stereospecific for L-amino acids. Incorporating D-amino acids—particularly at protease-susceptible sites—dramatically increases the half-life of peptide drugs in vivo. Examples include desmopressin (DDAVP) and the GLP-1 analogues with D-amino acid substitutions. The trade-off is potential immunogenicity, though single substitutions are generally well-tolerated."
  difficulty: "intermediate"
  tags: ["D-amino-acids", "protease-resistance", "peptide-drugs", "stability"]

---

---

id: quiz-n-methylated-peptides-001
question: "How does N-methylation of the peptide backbone affect membrane permeability?"
options:

- "It decreases permeability by increasing hydrogen bond donors"
- "It has no effect on permeability"
- "It increases permeability by reducing the number of hydrogen bond donors and disrupting backbone hydration"
- "It increases permeability by making the peptide more flexible"
  correctIndex: 2
  explanation: "N-methylation replaces the backbone amide N-H (a hydrogen bond donor) with N-CH₃, reducing the number of hydrogen bond donors and disrupting ordered water molecules around the backbone. This lowers the desolvation penalty for membrane partitioning. The classic example is cyclosporin A, which has seven N-methylated residues and is orally bioavailable despite being a cyclic undecapeptide. N-methylation also increases proteolytic stability."
  difficulty: "advanced"
  tags: ["N-methylation", "membrane-permeability", "cyclosporin", "oral-bioavailability"]

---

---

id: quiz-pna-001
question: "What structural modification defines a peptide nucleic acid (PNA)?"
options:

- "Replacement of the sugar-phosphate backbone with a pseudopeptide backbone"
- "Addition of a fluorescent nucleobase analog"
- "Conjugation of nucleotides to the peptide side chains"
- "Phosphorylation of the peptide N-terminus"
  correctIndex: 0
  explanation: "PNA replaces the entire sugar-phosphate backbone of DNA/RNA with a polyamide backbone of N-(2-aminoethyl)glycine units connected by peptide bonds. Nucleobases are attached via methylene carbonyl linkers. PNA binds complementary DNA/RNA with high affinity and specificity through Watson-Crick base pairing, but is resistant to nucleases and proteases. PNA is used in diagnostics, antisense therapeutics, and CRISPR modulation."
  difficulty: "intermediate"
  tags: ["PNA", "peptide-nucleic-acids", "backbone-modification", "antisense"]

---

---

id: quiz-peptide-dendrimers-001
question: "What is a key advantage of branched/dendrimeric peptide architectures over linear peptides?"
options:

- "They have lower synthesis costs"
- "They can display multiple functional epitopes simultaneously with enhanced avidity"
- "They are always cell-permeable"
- "They cannot form secondary structures"
  correctIndex: 1
  explanation: "Branched peptide dendrimers, often built on a lysine or MAP (multiple antigen peptide) scaffold, display multiple copies of a peptide epitope in a defined spatial arrangement. This multivalent display increases avidity for targets with multiple binding sites (e.g., cell surface receptors). Applications include multivalent vaccines, targeted drug delivery, and antimicrobial peptides where local concentration effects enhance potency."
  difficulty: "intermediate"
  tags: ["dendrimers", "branched-peptides", "multivalency", "MAP"]

---

---

id: quiz-peptide-conjugates-001
question: "In antibody-drug conjugates (ADCs) using peptide linkers, what is the primary design consideration for the linker?"
options:

- "The linker must be as long as possible"
- "The linker must be cleavable specifically in the target environment (e.g., lysosomal proteases)"
- "The linker must be fluorescent for tracking"
- "The linker must be composed entirely of D-amino acids"
  correctIndex: 1
  explanation: "Peptide linkers in ADCs are designed to be selectively cleaved by intracellular proteases (particularly cathepsins in lysosomes) after receptor-mediated endocytosis. Common sequences include valine-citrulline (Val-Cit) and phenylalanine-lysine (Phe-Lys) dipeptides that are cleaved by cathepsin B. This ensures the cytotoxic payload is released inside the target cell while remaining stable in circulation."
  difficulty: "advanced"
  tags: ["peptide-conjugates", "ADCs", "linker-design", "cathepsin"]

---

---

id: quiz-peptide-metal-complexes-001
question: "Which amino acid side chains are most commonly involved in coordinating transition metal ions in metalloproteins?"
options:

- "Alanine and valine"
- "Histidine, cysteine, aspartate, and glutamate"
- "Phenylalanine and tryptophan"
- "Proline and glycine"
  correctIndex: 1
  explanation: "Metal coordination in proteins primarily involves side chains with electron-donating groups: histidine (imidazole nitrogen), cysteine (thiolate sulfur), aspartate/glutamate (carboxylate oxygens), and methionine (thioether sulfur). These residues create the primary coordination sphere around metals like Zn²⁺, Fe²⁺/³⁺, Cu²⁺, and Mn²⁺. The coordination geometry (tetrahedral, octahedral, etc.) and ligand field effects are tuned by the protein scaffold to control metal reactivity."
  difficulty: "intermediate"
  tags: ["metal-complexes", "coordination", "metalloproteins", "histidine"]

---

---
