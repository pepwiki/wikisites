---
title: "Peptide General Knowledge Quiz"
description: "Test your knowledge on miscellaneous peptide topics including naming conventions, stability, quality control, and interactions."
category: "peptides"
difficulty: "mixed"
totalQuestions: 50
---

import Quiz from "@/components/Quiz";

<Quiz
  client:load
  questions={[
    {
      question: "What is the standard convention for naming peptides?",
      options: [
        "Name by the C-terminal amino acid first",
        "Name by the N-terminal amino acid first, proceeding C-terminally",
        "Name alphabetically by amino acid",
        "Name by molecular weight"
      ],
      correctIndex: 1,
      explanation: "Peptides are named starting from the N-terminal amino acid (the free amino end), proceeding toward the C-terminal amino acid (the free carboxyl end), with each subsequent residue indicated as a suffix.",
      difficulty: "beginner",
      tags: ["naming", "conventions"]
    },
    {
      question: "Which single-letter code represents the amino acid Tryptophan?",
      options: [
        "T",
        "Y",
        "W",
        "F"
      ],
      correctIndex: 2,
      explanation: "W is the single-letter code for Tryptophan. T is Threonine, Y is Tyrosine, and F is Phenylalanine.",
      difficulty: "beginner",
      tags: ["amino-acid-codes", "single-letter"]
    },
    {
      question: "What is the three-letter code for the amino acid Glutamine?",
      options: [
        "Glu",
        "Gln",
        "Glm",
        "Gnt"
      ],
      correctIndex: 1,
      explanation: "Gln is the three-letter code for Glutamine. Glu is Glutamic acid. Glutamine has a side chain amide group, distinguishing it from Glutamic acid.",
      difficulty: "beginner",
      tags: ["amino-acid-codes", "three-letter"]
    },
    {
      question: "When calculating peptide molecular weight, what must be accounted for in addition to the sum of amino acid residue masses?",
      options: [
        "Only the side chain masses",
        "The mass of one water molecule (H₂O)",
        "The mass of two water molecules",
        "No additional mass is needed"
      ],
      correctIndex: 1,
      explanation: "The molecular weight of a peptide equals the sum of residue masses plus one water molecule (18.015 Da) to account for the free N-terminus and C-terminus.",
      difficulty: "intermediate",
      tags: ["molecular-weight", "calculation"]
    },
    {
      question: "What is the isoelectric point (pI) of a peptide?",
      options: [
        "The pH at which the peptide has maximum charge",
        "The pH at which the peptide carries no net electrical charge",
        "The temperature at which the peptide denatures",
        "The concentration at which the peptide precipitates"
      ],
      correctIndex: 1,
      explanation: "The isoelectric point (pI) is the pH at which a peptide carries no net electrical charge. At this pH, the peptide exists primarily as a zwitterion.",
      difficulty: "beginner",
      tags: ["isoelectric-point", "charge"]
    },
    {
      question: "At pH 7.0, what would be the net charge of a peptide containing only alanine residues (assuming it has a free N-terminus and C-terminus)?",
      options: [
        "Positive (+1)",
        "Negative (-1)",
        "Neutral (0)",
        "Depends on peptide length"
      ],
      correctIndex: 2,
      explanation: "A peptide of only alanine residues at pH 7 has a protonated N-terminus (NH₃⁺, +1) and deprotonated C-terminus (COO⁻, -1), giving a net charge of 0.",
      difficulty: "intermediate",
      tags: ["charge", "pH"]
    },
    {
      question: "Which amino acid is most likely to cause peptide solubility problems due to its hydrophobic side chain?",
      options: [
        "Lysine",
        "Aspartic acid",
        "Leucine",
        "Serine"
      ],
      correctIndex: 2,
      explanation: "Leucine has a highly hydrophobic isobutyl side chain that can reduce peptide solubility in aqueous solutions. Lysine and Aspartic acid are charged, and Serine is polar.",
      difficulty: "intermediate",
      tags: ["solubility", "amino-acids"]
    },
    {
      question: "What is the recommended storage temperature for lyophilized peptides?",
      options: [
        "Room temperature (20-25°C)",
        "Refrigerated (2-8°C)",
        "Frozen (-20°C or below)",
        "Depends on peptide sequence only"
      ],
      correctIndex: 2,
      explanation: "Lyophilized peptides should be stored at -20°C or below in a desiccated environment to minimize degradation from moisture, oxidation, and other degradation pathways.",
      difficulty: "beginner",
      tags: ["stability", "storage"]
    },
    {
      question: "What is the recommended solvent for reconstituting most lyophilized peptides?",
      options: [
        "Pure ethanol",
        "Sterile water or appropriate buffer",
        "DMSO only",
        "Acetone"
      ],
      correctIndex: 1,
      explanation: "Sterile water or an appropriate buffer (such as PBS) is recommended for reconstituting most peptides. The choice depends on peptide solubility and intended use.",
      difficulty: "beginner",
      tags: ["reconstitution", "handling"]
    },
    {
      question: "Why should peptides be handled with gloves?",
      options: [
        "To protect the peptide from bacterial contamination",
        "To prevent skin oils and proteases from degrading the peptide",
        "Because peptides are toxic to skin",
        "To maintain peptide temperature"
      ],
      correctIndex: 1,
      explanation: "Gloves prevent contamination from skin oils, proteases, and other contaminants that could degrade or alter the peptide during handling.",
      difficulty: "beginner",
      tags: ["handling", "best-practices"]
    },
    {
      question: "What is the most common type of contamination found in synthetic peptides?",
      options: [
        "Heavy metal contamination",
        "Trifluoroacetic acid (TFA) from synthesis",
        "Bacterial contamination",
        "DNA contamination"
      ],
      correctIndex: 1,
      explanation: "TFA is commonly used as a counterion during peptide synthesis and purification. Residual TFA is the most frequent contaminant in synthetic peptides and is typically exchanged for acetate or hydrochloride salts.",
      difficulty: "intermediate",
      tags: ["contamination", "quality-control"]
    },
    {
      question: "What technique is most commonly used to determine peptide purity?",
      options: [
        "Mass spectrometry alone",
        "UV-Vis spectroscopy",
        "Reversed-phase HPLC",
        "Gel electrophoresis"
      ],
      correctIndex: 2,
      explanation: "Reversed-phase HPLC (RP-HPLC) is the gold standard for determining peptide purity, separating the target peptide from impurities based on hydrophobicity.",
      difficulty: "intermediate",
      tags: ["quality-control", "analytical"]
    },
    {
      question: "What information is typically included in a peptide Certificate of Analysis (CoA)?",
      options: [
        "Only the peptide sequence",
        "Sequence, purity, mass confirmation, and quantity",
        "Only the molecular weight",
        "Only the synthesis date"
      ],
      correctIndex: 1,
      explanation: "A CoA typically includes the peptide sequence, purity (by HPLC), mass confirmation (by MS), quantity, appearance, and may include additional tests like water content or counterion analysis.",
      difficulty: "intermediate",
      tags: ["certificate-of-analysis", "quality-control"]
    },
    {
      question: "What is the purpose of impurity profiling in peptide analysis?",
      options: [
        "To increase peptide yield",
        "To identify and quantify process-related and degradation impurities",
        "To determine peptide solubility",
        "To calculate molecular weight"
      ],
      correctIndex: 1,
      explanation: "Impurity profiling identifies and quantifies all impurities including deletion sequences, truncated sequences, racemization products, and degradation products to ensure product quality.",
      difficulty: "advanced",
      tags: ["impurity-profiling", "quality-control"]
    },
    {
      question: "What are 'related substances' in peptide quality control?",
      options: [
        "Peptides with similar biological activity",
        "Structurally similar impurities arising from synthesis or degradation",
        "Peptides from the same manufacturer",
        "Amino acids with similar properties"
      ],
      correctIndex: 1,
      explanation: "Related substances are structurally similar impurities that arise during synthesis (deletion sequences, insertions) or storage (degradation products) that must be identified and controlled.",
      difficulty: "advanced",
      tags: ["related-substances", "quality-control"]
    },
    {
      question: "What is the ICH limit for Class 2 residual solvents in pharmaceutical peptides?",
      options: [
        "No limit required",
        "PDE-based limits specific to each solvent",
        "Always 5000 ppm",
        "Only 100 ppm for all solvents"
      ],
      correctIndex: 1,
      explanation: "ICH Q3C guidelines establish Permitted Daily Exposure (PDE) limits for Class 2 solvents, which are individually specific. For example, acetonitrile limit is 410 ppm.",
      difficulty: "advanced",
      tags: ["residual-solvents", "regulatory"]
    },
    {
      question: "What method is used for endotoxin testing of peptides?",
      options: [
        "Sterility test by membrane filtration",
        "Limulus Amebocyte Lysate (LAL) assay",
        "HPLC analysis",
        "Mass spectrometry"
      ],
      correctIndex: 1,
      explanation: "The LAL assay uses blood cells from horseshoe crabs to detect and quantify endotoxins (lipopolysaccharides) from gram-negative bacteria. It is the standard method for endotoxin testing.",
      difficulty: "intermediate",
      tags: ["endotoxin-testing", "quality-control"]
    },
    {
      question: "Which method is used for sterility testing of peptide preparations?",
      options: [
        "LAL assay",
        "Membrane filtration and direct inoculation",
        "HPLC",
        "Karl Fischer titration"
      ],
      correctIndex: 1,
      explanation: "Sterility testing uses membrane filtration or direct inoculation methods per pharmacopeial requirements (USP <71>) to detect viable microorganisms in peptide preparations.",
      difficulty: "intermediate",
      tags: ["sterility-testing", "quality-control"]
    },
    {
      question: "What is container closure integrity (CCI) testing for peptide products?",
      options: [
        "Testing if the container is the right size",
        "Verifying the container closure system prevents microbial contamination and maintains product stability",
        "Measuring the weight of the container",
        "Testing the color of the container"
      ],
      correctIndex: 1,
      explanation: "CCI testing verifies that the container closure system maintains a microbial barrier and protects the peptide from environmental factors like moisture and oxygen throughout its shelf life.",
      difficulty: "intermediate",
      tags: ["container-closure", "packaging"]
    },
    {
      question: "What are extractables in the context of peptide container systems?",
      options: [
        "Peptides extracted from biological samples",
        "Chemical compounds that can migrate from packaging materials under laboratory conditions",
        "Amino acids extracted during synthesis",
        "Solvents used in extraction"
      ],
      correctIndex: 1,
      explanation: "Extractables are compounds that can be released from packaging materials (rubber stoppers, plastic containers) under exaggerated conditions and potentially affect peptide quality.",
      difficulty: "advanced",
      tags: ["extractables", "packaging"]
    },
    {
      question: "How do leachables differ from extractables?",
      options: [
        "They are the same thing",
        "Leachables are compounds that migrate under normal storage conditions; extractables under exaggerated conditions",
        "Leachables are only from glass containers",
        "Extractables are more dangerous than leachables"
      ],
      correctIndex: 1,
      explanation: "Leachables are compounds that actually migrate into the drug product under normal storage and use conditions, while extractables are identified under exaggerated laboratory conditions.",
      difficulty: "advanced",
      tags: ["leachables", "packaging"]
    },
    {
      question: "What is a stability-indicating method for peptides?",
      options: [
        "Any HPLC method",
        "An analytical method that can distinguish the intact peptide from its degradation products",
        "A method that only measures peptide concentration",
        "A biological activity assay only"
      ],
      correctIndex: 1,
      explanation: "A stability-indicating method accurately measures the active ingredient without interference from degradation products, impurities, or excipients, enabling reliable stability assessment.",
      difficulty: "intermediate",
      tags: ["stability-indicating", "analytical"]
    },
    {
      question: "What is forced degradation in peptide stability studies?",
      options: [
        "Storing peptides at recommended conditions",
        "Deliberately exposing peptides to stress conditions to identify degradation pathways",
        "Rapid peptide synthesis",
        "Forced precipitation of peptides"
      ],
      correctIndex: 1,
      explanation: "Forced degradation (stress testing) deliberately exposes peptides to elevated temperature, pH extremes, oxidation, light, and humidity to identify degradation products and validate stability-indicating methods.",
      difficulty: "advanced",
      tags: ["forced-degradation", "stability"]
    },
    {
      question: "Which amino acids are most susceptible to photodegradation?",
      options: [
        "Glycine and Alanine",
        "Tryptophan, Tyrosine, and Phenylalanine",
        "Lysine and Arginine",
        "Proline and Hydroxyproline"
      ],
      correctIndex: 1,
      explanation: "Tryptophan, Tyrosine, and Phenylalanine contain aromatic rings that absorb UV light (280 nm region) and are most susceptible to photodegradation, producing various photo-oxidation products.",
      difficulty: "advanced",
      tags: ["photostability", "degradation"]
    },
    {
      question: "What is the typical effect of elevated temperature on peptide stability?",
      options: [
        "No effect on stability",
        "Increased aggregation and hydrolysis of peptide bonds",
        "Only affects color",
        "Improves peptide purity"
      ],
      correctIndex: 1,
      explanation: "Elevated temperature accelerates peptide bond hydrolysis, deamidation of asparagine and glutamine, racemization, and aggregation, all of which compromise peptide stability.",
      difficulty: "intermediate",
      tags: ["thermal-stability", "degradation"]
    },
    {
      question: "At what pH range are peptides generally most stable?",
      options: [
        "pH 1-3",
        "pH 5-7",
        "pH 9-11",
        "pH has no effect on stability"
      ],
      correctIndex: 1,
      explanation: "Most peptides are most stable in the pH 5-7 range. Extreme pH values accelerate hydrolysis, deamidation, and racemization, particularly affecting aspartyl and asparaginyl residues.",
      difficulty: "intermediate",
      tags: ["pH-stability", "degradation"]
    },
    {
      question: "Which amino acid residue is most susceptible to oxidation in peptides?",
      options: [
        "Glycine",
        "Methionine",
        "Alanine",
        "Proline"
      ],
      correctIndex: 1,
      explanation: "Methionine is the most oxidation-susceptible amino acid, easily forming methionine sulfoxide. Cysteine and tryptophan are also readily oxidized.",
      difficulty: "intermediate",
      tags: ["oxidative-stability", "degradation"]
    },
    {
      question: "What is the role of reducing agents like DTT or TCEP in peptide handling?",
      options: [
        "To increase peptide solubility",
        "To prevent oxidation of thiol groups in cysteine residues",
        "To speed up peptide synthesis",
        "To precipitate peptides"
      ],
      correctIndex: 1,
      explanation: "Reducing agents like DTT (dithiothreitol) and TCEP maintain cysteine thiol groups in their reduced form, preventing unwanted disulfide bond formation and oxidation.",
      difficulty: "intermediate",
      tags: ["reductive-stability", "handling"]
    },
    {
      question: "How can mechanical stress affect peptide solutions?",
      options: [
        "No effect on peptides",
        "Can cause aggregation through shearing at air-liquid interfaces",
        "Only affects lyophilized peptides",
        "Improves peptide stability"
      ],
      correctIndex: 1,
      explanation: "Mechanical stress (shaking, stirring, pumping) can expose peptides to air-liquid interfaces where surface denaturation and subsequent aggregation can occur.",
      difficulty: "advanced",
      tags: ["mechanical-stability", "aggregation"]
    },
    {
      question: "What happens to peptides during freeze-thaw cycles?",
      options: [
        "Nothing, peptides are freeze-thaw stable",
        "Concentration of solutes and pH changes can cause aggregation and precipitation",
        "Peptides become more soluble",
        "Peptide bonds are cleaved"
      ],
      correctIndex: 1,
      explanation: "Freeze-thaw cycles can concentrate solutes at ice crystal boundaries, shift pH, and expose peptides to interfaces, all of which can promote aggregation and precipitation.",
      difficulty: "intermediate",
      tags: ["freeze-thaw", "stability"]
    },
    {
      question: "What is the primary concern with agitation of peptide solutions?",
      options: [
        "Peptide degradation by enzymes",
        "Foaming and interface-induced aggregation",
        "Color change",
        "Increased solubility"
      ],
      correctIndex: 1,
      explanation: "Agitation introduces air-liquid interfaces where peptides can unfold and aggregate. Foaming increases surface area exposure, promoting protein denaturation and aggregation.",
      difficulty: "advanced",
      tags: ["agitation-stability", "aggregation"]
    },
    {
      question: "Why are air-liquid interfaces problematic for peptide stability?",
      options: [
        "They increase oxygen levels",
        "Peptides adsorb and denature at the interface, leading to aggregation",
        "They change the pH",
        "They have no effect"
      ],
      correctIndex: 1,
      explanation: "Air-liquid interfaces cause peptides to adsorb at the surface where they can unfold and expose hydrophobic regions, leading to aggregation and loss of material.",
      difficulty: "advanced",
      tags: ["interface-stability", "aggregation"]
    },
    {
      question: "What is the main cause of peptide adsorption losses to container surfaces?",
      options: [
        "Chemical reaction with the container",
        "Hydrophobic interactions between peptide and container surface",
        "Electrostatic repulsion",
        "Gravitational settling"
      ],
      correctIndex: 1,
      explanation: "Peptides can adsorb to container surfaces through hydrophobic interactions, especially at low concentrations. Using low-binding plasticware or adding carrier proteins can minimize losses.",
      difficulty: "intermediate",
      tags: ["adsorption", "handling"]
    },
    {
      question: "What is peptide denaturation?",
      options: [
        "Complete hydrolysis of peptide bonds",
        "Loss of native secondary and tertiary structure",
        "Removal of protecting groups",
        "Increase in peptide purity"
      ],
      correctIndex: 1,
      explanation: "Denaturation is the loss of a peptide's native secondary and tertiary structure, often caused by heat, extreme pH, detergents, or organic solvents, exposing hydrophobic residues.",
      difficulty: "beginner",
      tags: ["denaturation", "structure"]
    },
    {
      question: "What is peptide renaturation?",
      options: [
        "Synthesis of a new peptide",
        "Refolding of a denatured peptide back to its native structure",
        "Purification of a peptide",
        "Lyophilization of a peptide"
      ],
      correctIndex: 1,
      explanation: "Renaturation is the process by which a denatured peptide regains its native structure when the denaturing conditions are removed, though this is not always complete or efficient.",
      difficulty: "intermediate",
      tags: ["renaturation", "structure"]
    },
    {
      question: "What are the main challenges in peptide refolding?",
      options: [
        "Finding the right solvent only",
        "Competing aggregation pathways and kinetic traps during refolding",
        "Peptides always refold correctly",
        "Only temperature matters"
      ],
      correctIndex: 1,
      explanation: "Peptide refolding is challenging because unfolded peptides can aggregate or become trapped in misfolded intermediates before reaching the native state, requiring careful optimization of conditions.",
      difficulty: "advanced",
      tags: ["refolding", "aggregation"]
    },
    {
      question: "What is peptide misfolding?",
      options: [
        "Incorrect peptide synthesis",
        "Adoption of a non-native three-dimensional structure",
        "Degradation of the peptide",
        "Loss of the peptide sample"
      ],
      correctIndex: 1,
      explanation: "Misfolding occurs when a peptide adopts a conformation different from its thermodynamically stable native state, which can lead to aggregation, amyloid formation, or loss of function.",
      difficulty: "intermediate",
      tags: ["misfolding", "structure"]
    },
    {
      question: "What is the primary nucleation event in peptide aggregation?",
      options: [
        "Peptide bond formation",
        "Formation of initial oligomeric species from monomers",
        "Dissolution of aggregates",
        "Peptide degradation"
      ],
      correctIndex: 1,
      explanation: "Primary nucleation is the initial formation of oligomeric species from monomeric peptides, which is the rate-limiting step in aggregation and serves as a template for further growth.",
      difficulty: "advanced",
      tags: ["aggregation", "nucleation"]
    },
    {
      question: "What is the difference between primary and secondary nucleation in peptide aggregation?",
      options: [
        "There is no difference",
        "Primary nucleation forms new nuclei from monomers; secondary nucleation occurs on existing aggregate surfaces",
        "Primary is faster than secondary",
        "Secondary only occurs in solution"
      ],
      correctIndex: 1,
      explanation: "Primary nucleation involves de novo formation of nuclei from monomers, while secondary nucleation occurs on existing fibril surfaces, catalyzing formation of new aggregates and accelerating the process.",
      difficulty: "advanced",
      tags: ["nucleation", "aggregation-kinetics"]
    },
    {
      question: "What is peptide fibrillation?",
      options: [
        "Formation of peptide crystals",
        "Formation of elongated, insoluble fibrillar aggregates",
        "Peptide degradation",
        "Peptide synthesis"
      ],
      correctIndex: 1,
      explanation: "Fibrillation is the process by which peptides form highly ordered, elongated fibrillar structures through self-assembly, often involving cross-β-sheet structures.",
      difficulty: "intermediate",
      tags: ["fibrillation", "aggregation"]
    },
    {
      question: "What characterizes amyloid formation by peptides?",
      options: [
        "Random aggregation",
        "Cross-β-sheet structure with characteristic Congo red binding",
        "Only occurs in vivo",
        "Requires enzymatic catalysis"
      ],
      correctIndex: 1,
      explanation: "Amyloid formation is characterized by cross-β-sheet structures where β-strands run perpendicular to the fibril axis, showing apple-green birefringence with Congo red dye under polarized light.",
      difficulty: "advanced",
      tags: ["amyloid", "fibrillation"]
    },
    {
      question: "What is meant by 'prion-like' behavior in peptides?",
      options: [
        "Peptides that contain prion protein",
        "Ability of peptide aggregates to template and propagate their misfolded state to native molecules",
        "Peptides that are always infectious",
        "Peptides that degrade like prions"
      ],
      correctIndex: 1,
      explanation: "Prion-like behavior refers to the ability of peptide aggregates to act as templates, converting native or unfolded peptides into the same misfolded conformation, enabling self-propagation.",
      difficulty: "advanced",
      tags: ["prion-like", "aggregation"]
    },
    {
      question: "What role do molecular chaperones play in peptide handling?",
      options: [
        "They synthesize peptides",
        "They assist in proper folding and prevent aggregation",
        "They degrade misfolded peptides",
        "They have no role in vitro"
      ],
      correctIndex: 1,
      explanation: "Molecular chaperones bind to unfolded or partially folded peptides, preventing aggregation and assisting in proper folding. Some can be used in vitro to improve refolding yields.",
      difficulty: "advanced",
      tags: ["chaperones", "refolding"]
    },
    {
      question: "What types of interactions drive peptide-protein binding?",
      options: [
        "Only covalent bonds",
        "Combination of hydrogen bonds, hydrophobic interactions, electrostatic interactions, and van der Waals forces",
        "Only ionic interactions",
        "Only hydrophobic interactions"
      ],
      correctIndex: 1,
      explanation: "Peptide-protein interactions involve a combination of non-covalent forces including hydrogen bonds, hydrophobic effects, electrostatic interactions, and van der Waals forces, with specificity determined by complementarity.",
      difficulty: "intermediate",
      tags: ["peptide-protein", "interactions"]
    },
    {
      question: "How do peptides interact with lipid membranes?",
      options: [
        "Peptides cannot interact with lipids",
        "Through electrostatic attraction to charged lipids and hydrophobic insertion into the bilayer",
        "Only through covalent bonding",
        "Only by disrupting the membrane completely"
      ],
      correctIndex: 1,
      explanation: "Peptides interact with lipid membranes through electrostatic attraction to charged headgroups and hydrophobic partitioning into the lipid bilayer, with the mode depending on peptide properties.",
      difficulty: "intermediate",
      tags: ["peptide-lipid", "membrane"]
    },
    {
      question: "What is the primary mode of peptide-nucleic acid interaction?",
      options: [
        "Covalent bonding only",
        "Electrostatic interactions between positively charged peptide residues and negatively charged phosphate backbone",
        "Hydrogen bonding only",
        "Hydrophobic interactions only"
      ],
      correctIndex: 1,
      explanation: "Peptide-nucleic acid interactions are primarily driven by electrostatic attraction between positively charged amino acids (Arg, Lys) and the negatively charged phosphodiester backbone of nucleic acids.",
      difficulty: "advanced",
      tags: ["peptide-nucleic-acid", "interactions"]
    },
    {
      question: "How do peptides interact with carbohydrates?",
      options: [
        "No interaction possible",
        "Through hydrogen bonding and CH-π interactions with sugar hydroxyl groups",
        "Only covalent glycosylation",
        "Only through ionic interactions"
      ],
      correctIndex: 1,
      explanation: "Peptide-carbohydrate interactions involve hydrogen bonds with sugar hydroxyl groups and CH-π interactions between sugar C-H bonds and aromatic amino acid side chains.",
      difficulty: "advanced",
      tags: ["peptide-carbohydrate", "interactions"]
    },
    {
      question: "Which amino acid residues are most important for peptide-metal ion coordination?",
      options: [
        "Glycine and Alanine",
        "Histidine, Cysteine, Aspartate, and Glutamate",
        "Leucine and Isoleucine",
        "Phenylalanine and Tryptophan"
      ],
      correctIndex: 1,
      explanation: "Histidine (imidazole), Cysteine (thiol), and Aspartate/Glutamate (carboxylate) provide electron-rich donor atoms for coordinating metal ions like Zn²⁺, Cu²⁺, and Ni²⁺.",
      difficulty: "advanced",
      tags: ["peptide-metal", "interactions"]
    },
    {
      question: "What is the role of water in peptide structure and stability?",
      options: [
        "Water has no role in peptide structure",
        "Water molecules form hydrogen bond networks that stabilize peptide structure and mediate interactions",
        "Water only dissolves peptides",
        "Water destabilizes all peptides"
      ],
      correctIndex: 1,
      explanation: "Water plays crucial roles in peptide structure through hydration shell formation, mediating intramolecular hydrogen bonds, and the hydrophobic effect that drives folding and aggregation.",
      difficulty: "advanced",
      tags: ["peptide-water", "interactions"]
    },
    {
      question: "What is the significance of the hydrophobic effect in peptide behavior?",
      options: [
        "It has no significance",
        "Non-polar residues are driven together to minimize contact with water, influencing folding and aggregation",
        "It only affects solubility",
        "It only occurs in organic solvents"
      ],
      correctIndex: 1,
      explanation: "The hydrophobic effect, driven by entropy of water, causes non-polar amino acid side chains to cluster together, which is a major driving force for peptide folding, aggregation, and membrane interactions.",
      difficulty: "intermediate",
      tags: ["hydrophobic-effect", "interactions"]
    },
    {
      question: "What batch testing parameters are essential for peptide quality?",
      options: [
        "Only visual inspection",
        "Identity, purity, potency, quantity, and safety tests",
        "Only molecular weight determination",
        "Only solubility testing"
      ],
      correctIndex: 1,
      explanation: "Essential batch testing includes identity (MS, sequence), purity (HPLC), potency (bioassay), quantity (am acid analysis), and safety tests (endotoxin, sterility) to ensure consistent quality.",
      difficulty: "intermediate",
      tags: ["batch-testing", "quality-control"]
    }
  ]}
/>
