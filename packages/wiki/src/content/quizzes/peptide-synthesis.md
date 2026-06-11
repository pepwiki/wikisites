---
id: quiz-fmoc-vs-boc-001
question: "What is the key difference between Fmoc and Boc protecting groups in solid phase peptide synthesis?"
options:
  - "Fmoc is acid-labile while Boc is base-labile"
  - "Fmoc is base-labile while Boc is acid-labile"
  - "Both are acid-labile but at different pH"
  - "Both are base-labile but at different pH"
correctIndex: 1
explanation: "Fmoc (9-fluorenylmethyloxycarbonyl) is removed by base (piperidine), while Boc (tert-butyloxycarbonyl) is removed by acid (TFA). This fundamental difference affects the entire synthesis strategy and protecting group scheme."
difficulty: "intermediate"
tags: ["protecting-groups", "Fmoc", "Boc", "SPPS"]
---

---

id: quiz-fmoc-deprotection-001
question: "Which reagent is commonly used to remove the Fmoc protecting group during SPPS?"
options:

- "Trifluoroacetic acid (TFA)"
- "20% piperidine in DMF"
- "Dichloromethane (DCM)"
- "Hydrofluoric acid (HF)"
  correctIndex: 1
  explanation: "Fmoc removal (deprotection) is achieved using 20% piperidine in DMF. The piperidine acts as a base, abstracting the proton from the fluorenyl ring system, leading to beta-elimination and release of the Fmoc group as dibenzofulvene."
  difficulty: "beginner"
  tags: ["Fmoc", "deprotection", "piperidine", "SPPS"]

---

---

id: quiz-boc-cleavage-001
question: "In Boc-based SPPS, what reagent is used for the final cleavage from the resin and global deprotection?"
options:

- "20% piperidine in DMF"
- "Trifluoroacetic acid (TFA)"
- "Hydrofluoric acid (HF)"
- "Ammonia solution"
  correctIndex: 2
  explanation: "Boc-based SPPS requires anhydrous HF for final cleavage and deprotection. HF is extremely hazardous and requires specialized equipment. This is one reason why Fmoc-based SPPS (using TFA) has become more popular."
  difficulty: "advanced"
  tags: ["Boc", "cleavage", "HF", "SPPS"]

---

---

id: quiz-resin-wang-001
question: "Wang resin is primarily used for synthesizing peptides with which terminal functional group?"
options:

- "N-terminal amide"
- "C-terminal amide"
- "C-terminal carboxylic acid"
- "N-terminal carboxylic acid"
  correctIndex: 2
  explanation: "Wang resin is a p-benzyloxybenzyl alcohol resin that provides C-terminal carboxylic acids upon cleavage. It is one of the most commonly used resins in Fmoc-based SPPS."
  difficulty: "intermediate"
  tags: ["resins", "Wang-resin", "C-terminal", "SPPS"]

---

---

id: quiz-resin-rink-001
question: "Rink amide resin is designed to produce peptides with which C-terminal modification?"
options:

- "Carboxylic acid"
- "Amide"
- "Ester"
- "Aldehyde"
  correctIndex: 1
  explanation: "Rink amide resin generates C-terminal amides upon cleavage. The Rink linker is acid-labile and releases the peptide as an amide when treated with TFA. This is useful for mimicking natural peptide amide termini."
  difficulty: "intermediate"
  tags: ["resins", "Rink-resin", "amide", "SPPS"]

---

---

id: quiz-resin-merrifield-001
question: "Merrifield resin is typically used with which protecting group strategy?"
options:

- "Fmoc strategy with TFA cleavage"
- "Boc strategy with HF cleavage"
- "Both Fmoc and Boc strategies interchangeably"
- "Neither, it's only used for solution phase synthesis"
  correctIndex: 1
  explanation: "Merrifield resin is a chloromethylated polystyrene resin used primarily in Boc-based SPPS. The peptide is cleaved from this resin using HF, which also removes Boc protecting groups."
  difficulty: "advanced"
  tags: ["resins", "Merrifield-resin", "Boc", "SPPS"]

---

---

id: quiz-coupling-hatu-001
question: "What type of coupling reagent is HATU in peptide synthesis?"
options:

- "Carbodiimide"
- "Phosphonium salt"
- "Uronium/guanidinium salt"
- "Acid chloride"
  correctIndex: 2
  explanation: "HATU (Hexafluorophosphate Azabenzotriazole Tetramethyl Uronium) is a uronium/guanidinium-type coupling reagent. It is one of the most efficient coupling reagents, particularly for difficult couplings, and is often preferred for its high reactivity and low racemization."
  difficulty: "intermediate"
  tags: ["coupling-reagents", "HATU", "uronium", "SPPS"]

---

---

id: quiz-coupling-dic-001
question: "In peptide synthesis, DIC (N,N'-diisopropylcarbodiimide) works by forming what reactive intermediate?"
options:

- "Acid anhydride"
- "O-acylisourea"
- "Active ester"
- "Azide"
  correctIndex: 1
  explanation: "DIC reacts with the carboxyl group to form an O-acylisourea intermediate, which is then attacked by the amino group to form the peptide bond. An additive like HOBt or Oxyma is often added to improve efficiency and reduce racemization."
  difficulty: "advanced"
  tags: ["coupling-reagents", "DIC", "carbodiimide", "SPPS"]

---

---

id: quiz-cleavage-tfa-001
question: "What is the typical concentration of trifluoroacetic acid (TFA) used in cleavage cocktails for Fmoc-based SPPS?"
options:

- "1% in DCM"
- "10% in DMF"
- "95% in DCM with scavengers"
- "50% in methanol"
  correctIndex: 2
  explanation: "The standard cleavage cocktail for Fmoc-SPPS uses 95% TFA in DCM with scavengers (triisopropylsilane, water, or dithiothreitol) to trap reactive cations. The high TFA concentration ensures complete removal of side chain protecting groups and cleavage from the resin."
  difficulty: "intermediate"
  tags: ["cleavage", "TFA", "scavengers", "SPPS"]

---

---

id: quiz-side-chain-trityl-001
question: "The trityl (Trt) protecting group is commonly used to protect which amino acid side chain?"
options:

- "Aspartic acid"
- "Cysteine"
- "Lysine"
- "Serine"
  correctIndex: 1
  explanation: "Trityl (triphenylmethyl) is commonly used to protect the thiol group of cysteine. It is acid-labile and can be removed during the final TFA cleavage step. Trityl is also used for asparagine and glutamine side chains."
  difficulty: "intermediate"
  tags: ["protecting-groups", "trityl", "cysteine", "SPPS"]

---

---

id: quiz-side-chain-tbu-001
question: "Which protecting group is used for the hydroxyl group of serine in Fmoc-based SPPS?"
options:

- "Benzyl (Bzl)"
- "tert-Butyl (tBu)"
- "Trityl (Trt)"
- "Acetyl (Ac)"
  correctIndex: 1
  explanation: "In Fmoc-based SPPS, the hydroxyl groups of serine, threonine, and tyrosine are typically protected with tert-butyl (tBu) ethers. These are removed by TFA during the final cleavage step."
  difficulty: "intermediate"
  tags: ["protecting-groups", "serine", "tBu", "SPPS"]

---

---

id: quiz-microwave-synthesis-001
question: "What is the primary advantage of microwave-assisted peptide synthesis?"
options:

- "Reduced reagent costs"
- "Faster coupling reactions and improved yields for difficult sequences"
- "Elimination of protecting groups"
- "Ability to use water as solvent"
  correctIndex: 1
  explanation: "Microwave-assisted synthesis accelerates coupling reactions through dielectric heating, reducing reaction times from hours to minutes. It is particularly beneficial for aggregating or difficult sequences, improving overall yields and purity."
  difficulty: "intermediate"
  tags: ["microwave", "difficult-sequences", "SPPS", "automation"]

---

---

id: quiz-native-ligation-001
question: "Native chemical ligation (NCL) requires which specific residue at the C-terminal of one fragment?"
options:

- "Glycine"
- "Alanine"
- "Cysteine"
- "Methionine"
  correctIndex: 2
  explanation: "Native chemical ligation requires a C-terminal thioester on one fragment and an N-terminal cysteine on the other. The cysteine's thiol group attacks the thioester, forming a thioester intermediate that rearranges to form a native peptide bond."
  difficulty: "advanced"
  tags: ["native-chemical-ligation", "cysteine", "thioester", "segment-condensation"]

---

---

id: quiz-click-chemistry-001
question: "In peptide chemistry, the CuAAC (copper-catalyzed azide-alkyne cycloaddition) reaction produces which heterocyclic linkage?"
options:

- "1,2,3-triazole"
- "Imidazole"
- "Pyrazole"
- "Oxazole"
  correctIndex: 0
  explanation: "CuAAC (click chemistry) between an azide and terminal alkyne produces a 1,4-disubstituted 1,2,3-triazole. This bioisosteric linkage is stable, hydrophilic, and resistant to hydrolysis, making it useful for peptide conjugation."
  difficulty: "intermediate"
  tags: ["click-chemistry", "CuAAC", "triazole", "bioconjugation"]

---

---

id: quiz-cyclization-head-tail-001
question: "Which cyclization strategy involves forming a bond between the N-terminal amino group and C-terminal carboxyl group?"
options:

- "Side chain cyclization"
- "Head-to-tail cyclization"
- "Disulfide cyclization"
- "Lanthionine bridge formation"
  correctIndex: 1
  explanation: "Head-to-tail cyclization (macrolactamization) forms a peptide bond between the N-terminus and C-terminus. This is typically achieved using coupling reagents like HATU or PyBOP in dilute conditions to favor intramolecular reaction."
  difficulty: "intermediate"
  tags: ["cyclization", "head-to-tail", "macrolactamization", "cyclic-peptides"]

---

---

id: quiz-disulfide-formation-001
question: "Which reagent is commonly used to form disulfide bonds between cysteine residues in synthetic peptides?"
options:

- "Dithiothreitol (DTT)"
- "Dimethyl sulfoxide (DMSO)"
- "Beta-mercaptoethanol"
- "Tris(2-carboxyethyl)phosphine (TCEP)"
  correctIndex: 1
  explanation: "DMSO is a mild oxidant commonly used to form disulfide bonds in synthetic peptides. It oxidizes thiol groups to form disulfide bonds in aqueous solution at controlled pH. DTT, beta-mercaptoethanol, and TCEP are reducing agents that break disulfide bonds."
  difficulty: "intermediate"
  tags: ["disulfide-bonds", "cysteine", "oxidation", "DMSO"]

---

---

id: quiz-hplc-purification-001
question: "What is the most common stationary phase used for peptide purification by HPLC?"
options:

- "Normal phase silica"
- "Ion exchange resin"
- "C18 reversed-phase"
- "Size exclusion matrix"
  correctIndex: 2
  explanation: "C18 reversed-phase HPLC is the gold standard for peptide purification. The hydrophobic C18 stationary phase separates peptides based on hydrophobicity, with gradient elution using acetonitrile/water mixtures containing TFA."
  difficulty: "intermediate"
  tags: ["purification", "HPLC", "C18", "reversed-phase"]

---

---

id: quiz-mass-spec-001
question: "Which mass spectrometry ionization technique is most commonly used for peptide analysis?"
options:

- "Electron ionization (EI)"
- "Chemical ionization (CI)"
- "Electrospray ionization (ESI)"
- "Field desorption (FD)"
  correctIndex: 2
  explanation: "Electrospray ionization (ESI) is the most common ionization technique for peptide mass spectrometry. It produces multiply charged ions, enabling analysis of large peptides on instruments with limited mass range. MALDI is also widely used."
  difficulty: "intermediate"
  tags: ["mass-spectrometry", "ESI", "ionization", "characterization"]

---

---

id: quiz-edman-degradation-001
question: "In Edman degradation sequencing, what does the Edman reagent (phenylisothiocyanate) react with?"
options:

- "C-terminal amino acid"
- "N-terminal amino acid"
- "Side chain of arginine"
- "Peptide backbone amide bonds"
  correctIndex: 1
  explanation: "The Edman reagent (PITC) specifically reacts with the N-terminal amino group under mildly alkaline conditions. The modified amino acid is then cleaved and identified, allowing sequential determination of the peptide sequence from the N-terminus."
  difficulty: "intermediate"
  tags: ["Edman-degradation", "sequencing", "PITC", "characterization"]

---

---

id: quiz-amino-acid-analysis-001
question: "What does amino acid analysis (AAA) of a peptide typically involve?"
options:

- "Direct MS analysis of intact peptide"
- "Complete hydrolysis followed by quantification of individual amino acids"
- "N-terminal sequencing by Edman degradation"
- "Circular dichroism measurement"
  correctIndex: 1
  explanation: "Amino acid analysis involves complete acid hydrolysis of the peptide (6N HCl, 110°C, 24h) followed by separation and quantification of the released amino acids, typically by HPLC after derivatization. This confirms composition and determines peptide content."
  difficulty: "intermediate"
  tags: ["amino-acid-analysis", "hydrolysis", "quantification", "characterization"]

---

---
