# Bacterial Peptides Database

Comprehensive structured database of bioactive peptides derived from bacteria, including bacteriocins, polymyxins, glycopeptides, lipopeptides, signaling peptides, and toxins with therapeutic and research applications.

export const peptides = [
  // ============================================================
  // BACTERIOCINS
  // ============================================================
  {
    id: "BP-001",
    name: "Nisin A",
    sequence: "ITSISLCTPGCKTGALMGCNMKTATCHCSIHVSK",
    length: 34,
    molecular_weight: 3354.0,
    source_bacterium: "Lactococcus lactis",
    bacterial_family: "Streptococcaceae",
    target: "Lipid II (peptidoglycan precursor)",
    mechanism: "Binds lipid II at pyrophosphate cage; forms pores in membrane; inhibits cell wall synthesis",
    bioactivity: "Antimicrobial against Gram-positive bacteria including MRSA, Listeria, Clostridium; spore germination inhibition",
    therapeutic_potential: "FDA-approved food preservative (E234); potential therapeutic for drug-resistant Gram-positive infections; wound healing applications",
    category: "Bacteriocin - Lantibiotic (Class I)"
  },
  {
    id: "BP-002",
    name: "Nisin Z",
    sequence: "ITSISLCTPGCKTGALMGCNMKTATCHCSIHVSK",
    length: 34,
    molecular_weight: 3330.0,
    source_bacterium: "Lactococcus lactis subsp. lactis",
    bacterial_family: "Streptococcaceae",
    target: "Lipid II (peptidoglycan precursor)",
    mechanism: "Binds lipid II; pore formation; differs from Nisin A by Asn27 substitution (no charge difference at neutral pH)",
    bioactivity: "Enhanced solubility and diffusion compared to Nisin A; broad antimicrobial activity against Gram-positive pathogens",
    therapeutic_potential: "Improved bioavailability over Nisin A for food preservation; candidate for anti-biofilm coatings",
    category: "Bacteriocin - Lantibiotic (Class I)"
  },
  {
    id: "BP-003",
    name: "Lacticin 3147",
    sequence: "Two-component lantibiotic: Ltnα (30 aa) + Ltnβ (29 aa)",
    length: 59,
    molecular_weight: 6472.0,
    source_bacterium: "Lactococcus lactis subsp. lactis DPC3147",
    bacterial_family: "Streptococcaceae",
    target: "Lipid II (pyrophosphate and pentapeptide)",
    mechanism: "Synergistic two-component system; Ltnα binds lipid II, Ltnβ enhances pore formation; dual target engagement",
    bioactivity: "Potent activity against MRSA, VRE, Streptococcus agalactiae; MIC values 0.5-2 µg/mL against key pathogens",
    therapeutic_potential: "Promising lead for multi-drug resistant infections; stable at physiological pH; low resistance development",
    category: "Bacteriocin - Lantibiotic (Class I, Two-component)"
  },
  {
    id: "BP-004",
    name: "Lacticin Q",
    sequence: "NMLNIIKNAKIDQIAAGIGKLLGKWG",
    length: 26,
    molecular_weight: 2789.4,
    source_bacterium: "Lactococcus lactis QU 5",
    bacterial_family: "Streptococcaceae",
    target: "Bacterial cytoplasmic membrane",
    mechanism: "Non-lantibiotic; membrane disruption without specific receptor; rapid depolarization; toroidal pore model",
    bioactivity: "Broad-spectrum activity against Gram-positive bacteria including MRSA; rapid bactericidal action",
    therapeutic_potential: "Novel antimicrobial scaffold; no cross-resistance with conventional antibiotics; membrane-active agent",
    category: "Bacteriocin - Class II (Non-lantibiotic)"
  },
  {
    id: "BP-005",
    name: "Pediocin PA-1",
    sequence: "KYYGNGVTCGKHSCSVDWGKATTCIINNGAMAWATGGHQGNHKC",
    length: 44,
    molecular_weight: 4628.3,
    source_bacterium: "Pediococcus acidilactici",
    bacterial_family: "Lactobacillaceae",
    target: "Mannose phosphotransferase system (Man-PTS) receptor",
    mechanism: "Binds Man-PTS (IICMan and IIDMan subunits); receptor-mediated pore formation; disrupts sugar transport",
    bioactivity: "Highly potent against Listeria monocytogenes (MIC 2-10 ng/mL); activity against Enterococcus, Staphylococcus",
    therapeutic_potential: "Anti-listerial food preservative; potential therapeutic for listeriosis; GRAS status",
    category: "Bacteriocin - Class IIa (Pediocin-like)"
  },
  {
    id: "BP-006",
    name: "Leucocin A",
    sequence: "KYYGNGVHCTKSGCSVNWGEAFSAGVHRLANGGNGFW",
    length: 37,
    molecular_weight: 3930.5,
    source_bacterium: "Leuconostoc gelidum UAL187",
    bacterial_family: "Leuconostocaceae",
    target: "Mannose phosphotransferase system (Man-PTS) receptor",
    mechanism: "Class IIa bacteriocin; binds Man-PTS receptor; C-terminal domain mediates membrane insertion and pore formation",
    bioactivity: "Potent anti-listerial activity; inhibits Listeria monocytogenes at nanomolar concentrations",
    therapeutic_potential: "Food safety applications; model peptide for structure-activity studies of pediocin-like bacteriocins",
    category: "Bacteriocin - Class IIa (Pediocin-like)"
  },
  {
    id: "BP-007",
    name: "Carnobacteriocin B2",
    sequence: "VNYGNGVSCSKTKCSVNWGQAFQERYTAGINSFVSGVASGAGSIGRRP",
    length: 48,
    molecular_weight: 5029.8,
    source_bacterium: "Carnobacterium maltaromaticum",
    bacterial_family: "Carnobacteriaceae",
    target: "Mannose phosphotransferase system (Man-PTS) receptor",
    mechanism: "Receptor-mediated membrane disruption; binds Man-PTS; hydrophobic C-terminal helix inserts into membrane",
    bioactivity: "Active against Listeria, Enterococcus, Clostridium; broad Gram-positive spectrum within pediocin family",
    therapeutic_potential: "Biopreservative for meat and dairy products; potential anti-listerial agent",
    category: "Bacteriocin - Class IIa (Pediocin-like)"
  },
  {
    id: "BP-008",
    name: "Enterocin A",
    sequence: "NNGVSCSKTKCSVNWGQAFQERYTAGINSFVSGVASGAGSIGRRP",
    length: 47,
    molecular_weight: 4921.7,
    source_bacterium: "Enterococcus faecium",
    bacterial_family: "Enterococcaceae",
    target: "Mannose phosphotransferase system (Man-PTS) receptor",
    mechanism: "Pediocin-like bacteriocin; Man-PTS receptor binding; disrupts sugar transport and membrane integrity",
    bioactivity: "Anti-listerial; active against vancomycin-resistant Enterococcus (VRE); synergistic with enterocin B",
    therapeutic_potential: "Candidate for VRE infections; dual-bacteriocin therapy approach; food safety applications",
    category: "Bacteriocin - Class IIa (Pediocin-like)"
  },
  {
    id: "BP-009",
    name: "Enterocin P",
    sequence: "NNGVSCSKTKCSVNWGEAFTAGVHRLANGGNGFW",
    length: 35,
    molecular_weight: 3725.4,
    source_bacterium: "Enterococcus faecium",
    bacterial_family: "Enterococcaceae",
    target: "Mannose phosphotransferase system (Man-PTS) receptor",
    mechanism: "Sec-dependent secretion; Man-PTS binding; signal peptide cleavage during export; pore formation",
    bioactivity: "Highly active against Listeria monocytogenes; stable over wide pH range (2-10)",
    therapeutic_potential: "Thermostable food preservative; potential systemic anti-listerial agent",
    category: "Bacteriocin - Class IIa (Pediocin-like)"
  },
  {
    id: "BP-010",
    name: "Plantaricin A",
    sequence: "MSTKDFNLDLVHSVSKKDSGKIKSSGALVDAITQAISIGIKAIKGG",
    length: 46,
    molecular_weight: 4810.5,
    source_bacterium: "Lactobacillus plantarum",
    bacterial_family: "Lactobacillaceae",
    target: "Two-component signal transduction system",
    mechanism: "Autoinducer peptide; activates plnABCD regulatory system; induces bacteriocin production; membrane permeabilization",
    bioactivity: "Induces plantaricin production; synergistic with plantaricins E/F/J/K; broad Gram-positive inhibition",
    therapeutic_potential: "Quorum sensing modulator; fermentation control; gut microbiome management",
    category: "Bacteriocin - Class IIb (Two-component)"
  },

  // ============================================================
  // POLYMYXINS
  // ============================================================
  {
    id: "BP-011",
    name: "Polymyxin B",
    sequence: "6-MO-FA-Thr-Leu-Dab-Leu-Dab-Thr-Dab-Dab-Dab-Thr (cyclic 6-10)",
    length: 10,
    molecular_weight: 1203.5,
    source_bacterium: "Paenibacillus polymyxa",
    bacterial_family: "Paenibacillaceae",
    target: "Lipopolysaccharide (LPS) / Lipid A",
    mechanism: "Cationic cyclic lipopeptide; displaces divalent cations from LPS; disrupts outer membrane; self-promoted uptake across OM",
    bioactivity: "Active against Gram-negative bacteria: Pseudomonas aeruginosa, Acinetobacter baumannii, Klebsiella pneumoniae, E. coli",
    therapeutic_potential: "Last-resort antibiotic for carbapenem-resistant infections; used topically and systemically; nephrotoxicity limits use",
    category: "Polymyxin - Cyclic Lipopeptide Antibiotic"
  },
  {
    id: "BP-012",
    name: "Colistin (Polymyxin E)",
    sequence: "6-MO-FA-Thr-Leu-Dab-Leu-Dab-Thr-Leu-Dab-Dab-Thr (cyclic 6-10)",
    length: 10,
    molecular_weight: 1155.4,
    source_bacterium: "Paenibacillus polymyxa var. colistinus",
    bacterial_family: "Paenibacillaceae",
    target: "Lipopolysaccharide (LPS) / Lipid A",
    mechanism: "LPS binding and displacement; outer membrane disruption; endotoxin neutralization; self-promoted uptake pathway",
    bioactivity: "Gram-negative specific: E. coli, P. aeruginosa, K. pneumoniae, A. baumannii, Enterobacteriaceae",
    therapeutic_potential: "Used as colistimethate (prodrug) for MDR Gram-negative pneumonia and bacteremia; mcr-1 resistance gene concern",
    category: "Polymyxin - Cyclic Lipopeptide Antibiotic"
  },
  {
    id: "BP-013",
    name: "Polymyxin B1",
    sequence: "6-MO-FA(16:0)-Thr-Leu-Dab-Leu-Dab-Thr-Dab-Dab-Dab-Thr (cyclic)",
    length: 10,
    molecular_weight: 1203.5,
    source_bacterium: "Paenibacillus polymyxa",
    bacterial_family: "Paenibacillaceae",
    target: "Lipopolysaccharide (LPS) / Lipid A",
    mechanism: "Major component of polymyxin B mixture; 6-methyloctanoyl fatty acyl chain; LPS displacement and OM disruption",
    bioactivity: "Predominant active form; broad Gram-negative activity including non-fermenting bacilli",
    therapeutic_potential: "Standard polymyxin B formulation component; PK/PD characterized for clinical dosing",
    category: "Polymyxin - Cyclic Lipopeptide Antibiotic"
  },
  {
    id: "BP-014",
    name: "Polymyxin B2",
    sequence: "6-MO-FA(15:0)-Thr-Leu-Dab-Leu-Dab-Thr-Dab-Dab-Dab-Thr (cyclic)",
    length: 10,
    molecular_weight: 1189.5,
    source_bacterium: "Paenibacillus polymyxa",
    bacterial_family: "Paenibacillaceae",
    target: "Lipopolysaccharide (LPS) / Lipid A",
    mechanism: "Minor component; branched 6-methylheptanoyl chain; LPS binding with slightly different hydrophobic interactions",
    bioactivity: "Gram-negative activity similar to B1 but with altered PK properties due to shorter acyl chain",
    therapeutic_potential: "Contributes to overall polymyxin B efficacy; studied for structure-activity optimization",
    category: "Polymyxin - Cyclic Lipopeptide Antibiotic"
  },
  {
    id: "BP-015",
    name: "Polymyxin B3",
    sequence: "6-EO-FA-Thr-Leu-Dab-Leu-Dab-Thr-Dab-Dab-Dab-Thr (cyclic)",
    length: 10,
    molecular_weight: 1175.5,
    source_bacterium: "Paenibacillus polymyxa",
    bacterial_family: "Paenibacillaceae",
    target: "Lipopolysaccharide (LPS) / Lipid A",
    mechanism: "Minor component; 6-ethyloctanoyl acyl chain variant; LPS binding and outer membrane destabilization",
    bioactivity: "Gram-negative activity; different acyl chain affects membrane partitioning and potency",
    therapeutic_potential: "Structure-activity relationship studies; potential for analog development with improved therapeutic index",
    category: "Polymyxin - Cyclic Lipopeptide Antibiotic"
  },

  // ============================================================
  // GLYCOPEPTIDE ANTIBIOTICS
  // ============================================================
  {
    id: "BP-016",
    name: "Vancomycin",
    sequence: "Modified heptapeptide: β-hydroxychloroethyl-ornithine-Asn-Hpg-Hpg-β-hydroxytyrosine (crosslinked aromatic rings)",
    length: 7,
    molecular_weight: 1449.3,
    source_bacterium: "Amycolatopsis orientalis",
    bacterial_family: "Pseudonocardiaceae",
    target: "D-Ala-D-Ala terminus of lipid II",
    mechanism: "Binds D-Ala-D-Ala via 5 hydrogen bonds; forms rigid dimer; prevents transglycosylation and transpeptidation; inhibits PG synthesis",
    bioactivity: "Gram-positive activity: MRSA, MRSE, Enterococcus, Streptococcus, Clostridioides difficile",
    therapeutic_potential: "Gold standard for MRSA infections; oral for C. difficile colitis; vanA/vanB resistance via D-Ala-D-Lac",
    category: "Glycopeptide Antibiotic"
  },
  {
    id: "BP-017",
    name: "Teicoplanin",
    sequence: "Heptapeptide core with acyl-glucosamine and mannose sugar moieties",
    length: 7,
    molecular_weight: 1879.6,
    source_bacterium: "Actinoplanes teichomyceticus",
    bacterial_family: "Micromonosporaceae",
    target: "D-Ala-D-Ala terminus of lipid II",
    mechanism: "Binds D-Ala-D-Ala; glycosylated lipoglycopeptide; acyl chain anchors to membrane; inhibits PG synthesis",
    bioactivity: "MRSA, MRSE, streptococci, enterococci; once-daily dosing possible due to long half-life",
    therapeutic_potential: "Alternative to vancomycin; better PK profile; less nephrotoxicity; used in Europe extensively",
    category: "Glycopeptide Antibiotic - Lipoglycopeptide"
  },
  {
    id: "BP-018",
    name: "Telavancin",
    sequence: "Semi-synthetic vancomycin derivative with decylaminoethyl lipophilic side chain and phosphonate group",
    length: 7,
    molecular_weight: 1755.6,
    source_bacterium: "Semi-synthetic (derived from vancomycin)",
    bacterial_family: "Pseudonocardiaceae (precursor)",
    target: "D-Ala-D-Ala and bacterial membrane",
    mechanism: "Dual mechanism: D-Ala-D-Ala binding + lipophilic membrane anchor causes depolarization; rapid bactericidal",
    bioactivity: "MRSA, VISA, hVISA, Gram-positive anaerobes; concentration-dependent killing",
    therapeutic_potential: "Hospital-acquired pneumonia caused by MRSA; once-daily IV dosing; QTc prolongation monitoring required",
    category: "Glycopeptide Antibiotic - Lipoglycopeptide"
  },
  {
    id: "BP-019",
    name: "Dalbavancin",
    sequence: "Semi-synthetic teicoplanin derivative with lipophilic 4-decylaminobutyl substituent",
    length: 7,
    molecular_weight: 1816.7,
    source_bacterium: "Semi-synthetic (derived from teicoplanin aglycone)",
    bacterial_family: "Micromonosporaceae (precursor)",
    target: "D-Ala-D-Ala terminus of lipid II",
    mechanism: "High-affinity D-Ala-D-Ala binding; lipophilic side chain promotes dimerization and membrane anchoring; long-acting",
    bioactivity: "MRSA, MRSE, Streptococcus, Enterococcus faecalis; concentration-dependent killing",
    therapeutic_potential: "Single-dose or two-dose regimen for ABSSSI; ultra-long half-life (346 hours); outpatient therapy potential",
    category: "Glycopeptide Antibiotic - Lipoglycopeptide"
  },
  {
    id: "BP-020",
    name: "Oritavancin",
    sequence: "Semi-synthetic chlorobiphenyl derivative of vancomycin (N4'-(4-chlorophenyl)benzyl modification)",
    length: 7,
    molecular_weight: 1792.1,
    source_bacterium: "Semi-synthetic (derived from chloroeremomycin)",
    bacterial_family: "Actinoplanaceae (precursor)",
    target: "D-Ala-D-Ala, D-Ala-D-Lac, and bacterial membrane",
    mechanism: "Triple mechanism: D-Ala-D-Ala/D-Lac binding, membrane depolarization via lipophilic anchor, inhibition of PG transglycosylation",
    bioactivity: "Active against VRE (vanA and vanB), MRSA, VISA, Clostridioides difficile; overcomes vanA resistance",
    therapeutic_potential: "Single-dose ABSSSI treatment; covers vancomycin-resistant organisms; bactericidal against enterococci",
    category: "Glycopeptide Antibiotic - Lipoglycopeptide"
  },

  // ============================================================
  // LIPOPEPTIDES
  // ============================================================
  {
    id: "BP-021",
    name: "Daptomycin",
    sequence: "L-Asn-D-Ala-D-Asn-L-Thr-Gly-L-Sap-D-Ala-D-Gly-D-Ser-L-Asp-D-Ala-L-Asp(orn)-D-Gly-D-Ser-L-Asp-D-Sar-L-Ser(β-methyl)-D-Ala(β-methyl)-D-Gly(β-methyl)-L-Asp(orn)-D-Ala(β-methyl)-L-Sar with decanoyl side chain",
    length: 13,
    molecular_weight: 1620.7,
    source_bacterium: "Streptomyces roseosporus",
    bacterial_family: "Streptomycetaceae",
    target: "Bacterial cytoplasmic membrane (phosphatidylglycerol headgroups)",
    mechanism: "Ca2+-dependent oligomerization; insertion into membrane; ion channel formation; membrane depolarization; not cell wall active",
    bioactivity: "MRSA, VRE, VISA, Streptococcus, Enterococcus; concentration-dependent killing; not active against Gram-negatives",
    therapeutic_potential: "FDA-approved for complicated skin infections, S. aureus bacteremia, right-sided endocarditis; bactericidal alternative to vancomycin",
    category: "Lipopeptide - Cyclic Lipopeptide Antibiotic"
  },
  {
    id: "BP-022",
    name: "Surfactin",
    sequence: "L-Glu-L-Leu-D-Leu-L-Val-L-Asp-D-Leu-L-Leu with β-hydroxy fatty acid (C13-C15)",
    length: 7,
    molecular_weight: 1036.3,
    source_bacterium: "Bacillus subtilis",
    bacterial_family: "Bacillaceae",
    target: "Lipid bilayer / air-water interface",
    mechanism: "Amphipathic cyclic lipopeptide; intercalates into membrane; disrupts lipid packing; extremely potent biosurfactant",
    bioactivity: "Antimicrobial, antiviral (enveloped viruses), antitumor; hemolytic activity; biofilm disruption",
    therapeutic_potential: "Most potent natural biosurfactant; environmental bioremediation; anti-biofilm coatings; drug delivery enhancer",
    category: "Lipopeptide - Biosurfactant"
  },
  {
    id: "BP-023",
    name: "Iturin A",
    sequence: "L-Asn-D-Tyr-D-Asn-L-Gln-L-Pro-D-Asn-L-Ser with β-amino fatty acid (C14-C17)",
    length: 7,
    molecular_weight: 1042.2,
    source_bacterium: "Bacillus subtilis",
    bacterial_family: "Bacillaceae",
    target: "Fungal/yeast plasma membrane (ergosterol-containing)",
    mechanism: "Amphipathic cyclic lipopeptide; interacts with membrane sterols; forms ion-conducting pores; preferential activity against fungi",
    bioactivity: "Antifungal (Candida, Aspergillus, Fusarium); moderate antibacterial; hemolytic at high concentrations",
    therapeutic_potential: "Biocontrol agent for plant fungal diseases; potential antifungal therapeutic; agricultural applications",
    category: "Lipopeptide - Iturin Family"
  },
  {
    id: "BP-024",
    name: "Fengycin",
    sequence: "L-Glu-D-Orn-L-Tyr-D-Thr-L-Glu-D-Ala-L-Pro-Gln-L-Ile-D-Ile with β-hydroxy fatty acid (C15-C17)",
    length: 10,
    molecular_weight: 1463.8,
    source_bacterium: "Bacillus subtilis",
    bacterial_family: "Bacillaceae",
    target: "Fungal membrane; biofilm matrix",
    mechanism: "Cyclic lipopeptide; interacts with phospholipids; disrupts membrane integrity; inhibits biofilm formation",
    bioactivity: "Antifungal against filamentous fungi; anti-biofilm; anti-inflammatory; less hemolytic than surfactin",
    therapeutic_potential: "Biocontrol for postharvest fungal diseases; anti-biofilm agent; lower toxicity than other lipopeptides",
    category: "Lipopeptide - Fengycin/Plipastatin Family"
  },
  {
    id: "BP-025",
    name: "Mycosubtilin",
    sequence: "L-Asn-D-Tyr-D-Asn-L-Gln-L-Pro-D-Asn-L-Ser with β-amino fatty acid (C16-C17)",
    length: 7,
    molecular_weight: 1056.3,
    source_bacterium: "Bacillus subtilis",
    bacterial_family: "Bacillaceae",
    target: "Fungal membrane (ergosterol-dependent)",
    mechanism: "Homolog of iturin A with longer β-amino fatty acid; enhanced membrane interaction; pore formation in ergosterol-rich membranes",
    bioactivity: "Potent antifungal; activity against Candida, Saccharomyces, plant pathogenic fungi; stronger than iturin A against some targets",
    therapeutic_potential: "Agricultural biocontrol; food preservation; potential systemic antifungal applications pending toxicity studies",
    category: "Lipopeptide - Iturin Family"
  },

  // ============================================================
  // BACTERIAL SIGNALING PEPTIDES
  // ============================================================
  {
    id: "BP-026",
    name: "Autoinducer-2 (AI-2)",
    sequence: "(4S)-4,5-dihydroxy-2,3-pentanedione (DPD) - boron-containing furanone",
    length: 0,
    molecular_weight: 192.0,
    source_bacterium: "Multiple species (Vibrio harveyi prototype)",
    bacterial_family: "Vibrionaceae (prototype)",
    target: "LuxP receptor (Gram-negative) / LsrB receptor (Salmonella, E. coli)",
    mechanism: "Interspecies quorum sensing signal; DPD cyclizes to AI-2; activates or represses gene expression via signal transduction cascades",
    bioactivity: "Regulates bioluminesence, virulence factor expression, biofilm formation, motility across >70 bacterial species",
    therapeutic_potential: "Quorum sensing inhibitor target; anti-virulence strategy; biofilm prevention; does not kill bacteria (resistance avoidance)",
    category: "Bacterial Signaling - Quorum Sensing (Interspecies)"
  },
  {
    id: "BP-027",
    name: "Autoinducing Peptide (AIP)",
    sequence: "YSTCDFIM (cyclic thiolactone, S. aureus group I)",
    length: 7,
    molecular_weight: 861.0,
    source_bacterium: "Staphylococcus aureus",
    bacterial_family: "Staphylococcaceae",
    target: "AgrC histidine kinase receptor",
    mechanism: "Intra-species quorum sensing; activates agr system; upregulates toxin production (RNAIII); cross-inhibition between agr groups",
    bioactivity: "Controls virulence switching: at low cell density (repressed) vs high cell density (activated toxin expression)",
    therapeutic_potential: "Synthetic AIP analogs as quorum quenchers; cross-group inhibition for anti-virulence therapy; anti-staphylococcal strategy",
    category: "Bacterial Signaling - Quorum Sensing (Species-specific)"
  },
  {
    id: "BP-028",
    name: "N-Acyl Homoserine Lactones (AHLs)",
    sequence: "N-(3-oxo-hexanoyl)-L-homoserine lactone (3-oxo-C6-HSL, representative)",
    length: 0,
    molecular_weight: 213.2,
    source_bacterium: "Gram-negative bacteria (Pseudomonas, Agrobacterium, Vibrio)",
    bacterial_family: "Multiple families",
    target: "LuxR-type transcriptional regulators",
    mechanism: "Intra-species quorum sensing; AHL diffuses across membrane; binds LuxR-type receptor; activates target gene transcription",
    bioactivity: "Regulates bioluminescence, antibiotic production, virulence factor secretion, biofilm maturation, conjugation",
    therapeutic_potential: "Quorum sensing inhibitors (QSI) as anti-virulence agents; lactonase enzymes for AHL degradation; biofilm control",
    category: "Bacterial Signaling - Quorum Sensing (Gram-negative)"
  },
  {
    id: "BP-029",
    name: "Diffusible Signal Factor (DSF)",
    sequence: "cis-2-unsaturated fatty acid: (Z)-11-methyl-2-dodecenoic acid",
    length: 0,
    molecular_weight: 212.3,
    source_bacterium: "Xanthomonas campestris pv. campestris",
    bacterial_family: "Xanthomonadaceae",
    target: "RpfC/RpfG two-component system",
    mechanism: "Fatty acid quorum sensing signal; synthesized by RpfF; sensed by RpfC; regulates virulence and biofilm dispersal via cyclic-di-GMP",
    bioactivity: "Controls extracellular enzyme production, biofilm dispersal, virulence in Xanthomonas; cross-kingdom signaling",
    therapeutic_potential: "Anti-virulence strategy for plant pathogens; biofilm dispersal agent; signal interference for crop protection",
    category: "Bacterial Signaling - Quorum Sensing (Fatty acid)"
  },
  {
    id: "BP-030",
    name: "Competence Stimulating Peptide (CSP)",
    sequence: "EMRLSKFFRDFILQRKK (Streptococcus pneumoniae CSP-1)",
    length: 17,
    molecular_weight: 2166.6,
    source_bacterium: "Streptococcus pneumoniae",
    bacterial_family: "Streptococcaceae",
    target: "ComD histidine kinase receptor",
    mechanism: "Quorum sensing for natural competence; activates ComDE two-component system; induces competence regulon and bacteriocin production",
    bioactivity: "Triggers DNA uptake (natural transformation); upregulates bacteriocins; involved in genetic exchange and virulence",
    therapeutic_potential: "Understanding horizontal gene transfer; resistance spread mechanism; potential target to block antibiotic resistance transfer",
    category: "Bacterial Signaling - Quorum Sensing (Competence)"
  },

  // ============================================================
  // BACTERIAL TOXINS
  // ============================================================
  {
    id: "BP-031",
    name: "Botulinum Toxin",
    sequence: "Heavy chain (100 kDa) + Light chain (50 kDa) linked by disulfide bond; zinc metalloprotease (LC)",
    length: 1295,
    molecular_weight: 150000.0,
    source_bacterium: "Clostridium botulinum",
    bacterial_family: "Clostridiaceae",
    target: "SNARE proteins (SNAP-25, VAMP/synaptobrevin, syntaxin)",
    mechanism: "Heavy chain binds neuronal receptors and translocates light chain into cytosol; LC cleaves SNARE proteins; blocks acetylcholine release",
    bioactivity: "Flaccid paralysis; most potent known biological toxin (LD50 ~1 ng/kg); blocks neuromuscular transmission",
    therapeutic_potential: "FDA-approved (Botox, Dysport, Xeomin) for dystonia, spasticity, chronic migraine, overactive bladder, cosmetic use",
    category: "Bacterial Toxin - AB Neurotoxin"
  },
  {
    id: "BP-032",
    name: "Tetanus Toxin",
    sequence: "Heavy chain (100 kDa) + Light chain (50 kDa); zinc metalloprotease (LC)",
    length: 1315,
    molecular_weight: 150000.0,
    source_bacterium: "Clostridium tetani",
    bacterial_family: "Clostridiaceae",
    target: "VAMP/synaptobrevin (inhibitory interneurons)",
    mechanism: "Retrograde axonal transport; transcytosis to inhibitory interneurons; LC cleaves VAMP; blocks glycine/GABA release; spastic paralysis",
    bioactivity: "Spastic paralysis; tetanospasm; rigidity; autonomic dysfunction; mortality 10-20% even with treatment",
    therapeutic_potential: "Toxoid vaccine (tetanus toxoid) is highly effective; anti-tetanus immunoglobulin for post-exposure; research tool for neuronal trafficking",
    category: "Bacterial Toxin - AB Neurotoxin"
  },
  {
    id: "BP-033",
    name: "Diphtheria Toxin",
    sequence: "A fragment (21 kDa) + B fragment (37 kDa); single polypeptide cleaved by furin",
    length: 535,
    molecular_weight: 58348.0,
    source_bacterium: "Corynebacterium diphtheriae",
    bacterial_family: "Corynebacteriaceae",
    target: "Eukaryotic elongation factor 2 (EF-2)",
    mechanism: "B subunit binds HB-EGF receptor; A subunit translocated to cytosol; catalyzes ADP-ribosylation of EF-2 at diphthamide residue; halts translation",
    bioactivity: "Inhibits protein synthesis; pseudomembrane formation in pharynx; myocarditis; polyneuropathy",
    therapeutic_potential: "Toxoid vaccine (DTaP/Tdap) is standard immunization; immunotoxin conjugates (e.g., denileukin diftitox) for cancer therapy",
    category: "Bacterial Toxin - AB Exotoxin (ADP-ribosyltransferase)"
  },
  {
    id: "BP-034",
    name: "Cholera Toxin",
    sequence: "A1 subunit (22 kDa) + A2 subunit + 5 B subunits (11.6 kDa each); AB5 hexamer",
    length: 678,
    molecular_weight: 84000.0,
    source_bacterium: "Vibrio cholerae",
    bacterial_family: "Vibrionaceae",
    target: "Gsα protein (stimulatory G-protein alpha subunit)",
    mechanism: "B5 pentamer binds GM1 ganglioside; A1 ADP-ribosylates Gsα; locks adenylate cyclase in active state; massive cAMP increase; Cl- and water secretion",
    bioactivity: "Severe watery diarrhea (rice-water stool); dehydration; hypovolemic shock; up to 50% mortality if untreated",
    therapeutic_potential: "Oral rehydration therapy reduces mortality to <1%; toxoid vaccine candidates; CTB subunit as mucosal adjuvant; research tool for cAMP signaling",
    category: "Bacterial Toxin - AB5 Enterotoxin"
  },
  {
    id: "BP-035",
    name: "Anthrax Protective Antigen (PA)",
    sequence: "PA83 (83 kDa) cleaved to PA63 (63 kDa) by furin",
    length: 735,
    molecular_weight: 83000.0,
    source_bacterium: "Bacillus anthracis",
    bacterial_family: "Bacillaceae",
    target: "CMG2/TEM8 receptors; delivers Lethal Factor (LF) and Edema Factor (EF)",
    mechanism: "PA83 binds host receptor; cleaved to PA63; heptamerizes; binds LF/EF; endocytosis; pore formation in endosome; LF/EF translocated to cytosol (LF=zinc metalloprotease, EF=adenylate cyclase)",
    bioactivity: "Lethal toxin (PA+LF): cleaves MAPKKs, macrophage death; Edema toxin (PA+EF): elevated cAMP, edema, immune suppression",
    therapeutic_potential: "Anthrax vaccine (AVA/AbioThrax) uses PA as primary immunogen; rPA vaccines in development; PA as vaccine platform for heterologous antigens",
    category: "Bacterial Toxin - AB Toxin (Delivery Component)"
  }
];

export const categories = [
  "Bacteriocin - Lantibiotic (Class I)",
  "Bacteriocin - Lantibiotic (Class I, Two-component)",
  "Bacteriocin - Class II (Non-lantibiotic)",
  "Bacteriocin - Class IIa (Pediocin-like)",
  "Bacteriocin - Class IIb (Two-component)",
  "Polymyxin - Cyclic Lipopeptide Antibiotic",
  "Glycopeptide Antibiotic",
  "Glycopeptide Antibiotic - Lipoglycopeptide",
  "Lipopeptide - Cyclic Lipopeptide Antibiotic",
  "Lipopeptide - Biosurfactant",
  "Lipopeptide - Iturin Family",
  "Lipopeptide - Fengycin/Plipastatin Family",
  "Bacterial Signaling - Quorum Sensing (Interspecies)",
  "Bacterial Signaling - Quorum Sensing (Species-specific)",
  "Bacterial Signaling - Quorum Sensing (Gram-negative)",
  "Bacterial Signaling - Quorum Sensing (Fatty acid)",
  "Bacterial Signaling - Quorum Sensing (Competence)",
  "Bacterial Toxin - AB Neurotoxin",
  "Bacterial Toxin - AB Exotoxin (ADP-ribosyltransferase)",
  "Bacterial Toxin - AB5 Enterotoxin",
  "Bacterial Toxin - AB Toxin (Delivery Component)"
];

export const mechanisms = [
  "Lipid II binding",
  "Mannose phosphotransferase system (Man-PTS) receptor",
  "Lipopolysaccharide (LPS) / Lipid A",
  "D-Ala-D-Ala terminus of lipid II",
  "Bacterial membrane disruption",
  "Quorum sensing signal transduction",
  "SNARE protein cleavage",
  "ADP-ribosylation of host targets",
  "Receptor-mediated toxin delivery"
];

export const bacterialFamilies = [
  "Streptococcaceae",
  "Lactobacillaceae",
  "Leuconostocaceae",
  "Carnobacteriaceae",
  "Enterococcaceae",
  "Paenibacillaceae",
  "Pseudonocardiaceae",
  "Micromonosporaceae",
  "Actinoplanaceae",
  "Streptomycetaceae",
  "Bacillaceae",
  "Vibrionaceae",
  "Staphylococcaceae",
  "Xanthomonadaceae",
  "Clostridiaceae",
  "Corynebacteriaceae"
];

## Overview

Comprehensive collection of bioactive peptides produced by bacteria, spanning antimicrobial agents, signaling molecules, and toxins with diverse therapeutic and biotechnological applications.

## Summary

| Category | Count | Primary Activity |
|----------|-------|------------------|
| Bacteriocins | 10 | Antimicrobial (Gram-positive) |
| Polymyxins | 5 | Antimicrobial (Gram-negative) |
| Glycopeptides | 5 | Cell wall synthesis inhibition |
| Lipopeptides | 5 | Membrane disruption |
| Signaling Peptides | 5 | Quorum sensing modulation |
| Bacterial Toxins | 5 | Neuromuscular / cytotoxic |
| **Total** | **35** | |

## Key Therapeutic Applications

### Approved Therapeutics
- **Nisin A**: FDA-approved food preservative (E234)
- **Vancomycin**: Gold standard for MRSA infections
- **Daptomycin**: Complicated skin infections, bacteremia
- **Colistin**: Last-resort MDR Gram-negative antibiotic
- **Dalbavancin**: Single-dose ABSSSI treatment
- **Oritavancin**: Single-dose ABSSSI, VRE coverage
- **Telavancin**: MRSA hospital-acquired pneumonia
- **Botulinum toxin**: Botox for neurological and cosmetic indications
- **Diphtheria/Tetanus toxoids**: Standard vaccines (DTaP/Tdap)
- **Cholera toxin B subunit**: Mucosal vaccine adjuvant
- **Anthrax PA**: Anthrax vaccine primary immunogen

### Emerging Therapeutic Strategies
- Quorum sensing inhibitors (AI-2, AHL, AIP analogs)
- Anti-biofilm lipopeptides (surfactin, fengycin)
- Toxin-based immunotoxins for cancer therapy
- Bacteriocin combinations for synergy against MDR pathogens

## Resistance Mechanisms

| Peptide Class | Resistance Mechanism | Clinical Significance |
|--------------|---------------------|----------------------|
| Vancomycin | VanA/VanB: D-Ala-D-Lac replacement | VRE emergence |
| Polymyxins | mcr-1/mcr-2: LPS modification (phosphoethanolamine) | Plasmid-mediated, global spread |
| Nisin | NisI immunity protein; membrane modification | Rare in clinical settings |
| Daptomycin | mprF, cls2, walKR mutations | VISA/hVISA cross-resistance |
