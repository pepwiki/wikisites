# Antimicrobial Peptides Database

Comprehensive structured database of antimicrobial peptides (AMPs) with sequence data, activity spectra, and mechanism of action.

export const peptides = [
  {
    id: "AMP-001",
    name: "LL-37",
    sequence: "LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES",
    length: 37,
    molecular_weight: 4493.3,
    source: "Human neutrophils, epithelial cells",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi"],
    mechanism: "Membrane disruption via pore formation; intracellular target binding",
    mic_values: {
      "S. aureus": "4-16 µg/mL",
      "E. coli": "2-8 µg/mL",
      "P. aeruginosa": "8-64 µg/mL",
      "C. albicans": "16-64 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "Cathelicidin",
    notes: "Only human cathelicidin; expressed in immune and epithelial cells; immunomodulatory properties"
  },
  {
    id: "AMP-002",
    name: "hBD-1",
    sequence: "DHYNCVSSGGQCLYSACPIFTKIQGTCYRGKAKCCK",
    length: 36,
    molecular_weight: 3927.4,
    source: "Human epithelial cells (constitutive expression)",
    target_organisms: ["Gram-negative bacteria"],
    mechanism: "Membrane disruption via defensin fold",
    mic_values: {
      "E. coli": "10-100 µg/mL",
      "P. aeruginosa": "50-100 µg/mL"
    },
    spectrum: "Narrow-spectrum",
    category: "β-Defensin",
    notes: "Constitutively expressed; broadest tissue distribution of human defensins; low antimicrobial activity under normal conditions"
  },
  {
    id: "AMP-003",
    name: "hBD-2",
    sequence: "GIGDPVTCLKSGAICHPVFCPRRYKQIGTCGLPGTKCCKKP",
    length: 41,
    molecular_weight: 4329.0,
    source: "Human epithelial cells (inducible expression)",
    target_organisms: ["Gram-negative bacteria", "Gram-positive bacteria", "Fungi"],
    mechanism: "Membrane disruption; chemokine receptor activation",
    mic_values: {
      "E. coli": "1-10 µg/mL",
      "P. aeruginosa": "5-50 µg/mL",
      "C. albicans": "10-50 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "β-Defensin",
    notes: "Inducible by infection and inflammation; CCR6 ligator for dendritic cell recruitment"
  },
  {
    id: "AMP-004",
    name: "hBD-3",
    sequence: "GIINTLQKYYCRVRGGRCAVLSCLPKEEQIGKCSTRGRKCCRRKK",
    length: 45,
    molecular_weight: 5160.8,
    source: "Human epithelial cells, keratinocytes",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi", "Viruses"],
    mechanism: "Membrane disruption; lipid II binding",
    mic_values: {
      "S. aureus": "1-10 µg/mL",
      "MRSA": "2-20 µg/mL",
      "E. coli": "1-5 µg/mL",
      "C. albicans": "5-20 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "β-Defensin",
    notes: "Most potent human defensin; salt-resistant activity; anti-MRSA potential"
  },
  {
    id: "AMP-005",
    name: "Magainin 2",
    sequence: "GIGKFLHSAKKFGKAFVGEIMNS",
    length: 23,
    molecular_weight: 2453.9,
    source: "Skin of African clawed frog (Xenopus laevis)",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi"],
    mechanism: "Barrel-stave membrane pore formation",
    mic_values: {
      "S. aureus": "12-50 µg/mL",
      "E. coli": "5-25 µg/mL",
      "C. albicans": "25-100 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "Magainin",
    notes: "First AMP isolated from amphibian skin; model peptide for AMP research"
  },
  {
    id: "AMP-006",
    name: "PGLa",
    sequence: "GMASKAGAIAGKIAKVALKAL",
    length: 21,
    molecular_weight: 2002.5,
    source: "Skin of African clawed frog (Xenopus laevis)",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi"],
    mechanism: "Membrane disruption; synergy with magainins",
    mic_values: {
      "S. aureus": "3-12 µg/mL",
      "E. coli": "2-8 µg/mL",
      "C. albicans": "10-50 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "Caerulein precursor fragment",
    notes: "Synergistic activity with magainin 2; adopts α-helical structure in membranes"
  },
  {
    id: "AMP-007",
    name: "Brevinin-1",
    sequence: "FLPVLAGIAAKVVPALFCKITKKC",
    length: 24,
    molecular_weight: 2549.1,
    source: "Skin of various Rana species (Asian frogs)",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi", "Cancer cells"],
    mechanism: "Membrane pore formation via carpet mechanism",
    mic_values: {
      "S. aureus": "2-8 µg/mL",
      "E. coli": "1-5 µg/mL",
      "MRSA": "4-16 µg/mL",
      "C. albicans": "5-20 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "Brevinin-1 family",
    notes: "Contains C-terminal disulfide-bridged ring; anticancer activity reported"
  },
  {
    id: "AMP-008",
    name: "Temporin A",
    sequence: "FLPLIGRVLSGIL",
    length: 13,
    molecular_weight: 1392.8,
    source: "Skin of European red frog (Rana temporaria)",
    target_organisms: ["Gram-positive bacteria", "Some Gram-negative bacteria"],
    mechanism: "Membrane disruption; intracellular targeting",
    mic_values: {
      "S. aureus": "1-8 µg/mL",
      "E. faecalis": "2-16 µg/mL",
      "E. coli": "25-100 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Temporin",
    notes: "One of the shortest natural AMPs; highly hydrophobic; potent against staphylococci"
  },
  {
    id: "AMP-009",
    name: "Nisin",
    sequence: "ITSISLCTPGCKTGALMGCNMKTATCHCSIHVSK",
    length: 34,
    molecular_weight: 3354.1,
    source: "Lactococcus lactis",
    target_organisms: ["Gram-positive bacteria", "Spore-forming bacteria"],
    mechanism: "Lipid II binding; pore formation in membrane",
    mic_values: {
      "S. aureus": "0.1-1 µg/mL",
      "L. monocytogenes": "0.05-0.5 µg/mL",
      "B. cereus": "0.1-2 µg/mL",
      "C. botulinum": "0.05-1 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Lantibiotic (Class I)",
    notes: "FDA-approved food preservative (E234); 5 lanthionine bridges; GRAS status"
  },
  {
    id: "AMP-010",
    name: "Colistin (Polymyxin E)",
    sequence: "fatty acyl-Thr-Leu-Leu-Thr-Leu-D-Leu-Thr-D-Leu-Thr (cyclic lipopeptide)",
    length: 10,
    molecular_weight: 1155.4,
    source: "Paenibacillus polymyxa var. colistinus",
    target_organisms: ["Gram-negative bacteria"],
    mechanism: "Lipid A binding; outer membrane disruption; LPS displacement",
    mic_values: {
      "E. coli": "0.25-2 µg/mL",
      "P. aeruginosa": "0.5-4 µg/mL",
      "K. pneumoniae": "0.25-4 µg/mL",
      "A. baumannii": "0.5-2 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-negative)",
    category: "Polymyxin",
    notes: "Last-resort antibiotic for MDR Gram-negative infections; nephrotoxicity concern; resistance via LPS modification"
  },
  {
    id: "AMP-011",
    name: "Polymyxin B",
    sequence: "fatty acyl-Thr-Leu-Leu-Thr-Leu-D-Leu-Thr-D-Leu-Thr (cyclic lipopeptide)",
    length: 10,
    molecular_weight: 1203.5,
    source: "Paenibacillus polymyxa",
    target_organisms: ["Gram-negative bacteria"],
    mechanism: "Lipid A binding; membrane permeabilization; LPS neutralization",
    mic_values: {
      "E. coli": "0.25-2 µg/mL",
      "P. aeruginosa": "0.5-4 µg/mL",
      "K. pneumoniae": "0.25-8 µg/mL",
      "A. baumannii": "0.25-4 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-negative)",
    category: "Polymyxin",
    notes: "Used topically and systemically; differs from colistin by single amino acid; endotoxin neutralization"
  },
  {
    id: "AMP-012",
    name: "Gramicidin A",
    sequence: "VGALAVVVWLWLWLW",
    length: 15,
    molecular_weight: 1882.3,
    source: "Bacillus brevis (now Brevibacillus brevis)",
    target_organisms: ["Gram-positive bacteria", "Some Gram-negative bacteria"],
    mechanism: "Transmembrane ion channel formation (head-to-head dimers)",
    mic_values: {
      "S. aureus": "0.5-2 µg/mL",
      "S. pyogenes": "0.5-4 µg/mL",
      "M. luteus": "0.25-1 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Linear peptide antibiotic",
    notes: "Alternating L/D amino acids; forms β-helical channels; used topically only due to hemolysis"
  },
  {
    id: "AMP-013",
    name: "Cecropin A",
    sequence: "KWKLFKKIEKVGQNIRDGIIKAGPAVAVVGQATQIAK",
    length: 37,
    molecular_weight: 4003.7,
    source: "Hyalophora cecropia (cecropia moth) hemolymph",
    target_organisms: ["Gram-negative bacteria", "Gram-positive bacteria"],
    mechanism: "Membrane disruption via carpet mechanism; pore formation",
    mic_values: {
      "E. coli": "0.5-4 µg/mL",
      "P. aeruginosa": "1-8 µg/mL",
      "S. aureus": "4-32 µg/mL"
    },
    spectrum: "Broad-spectrum (Gram-negative preferred)",
    category: "Cecropin",
    notes: "First insect AMP isolated (1980); two amphipathic α-helices; no hemolytic activity"
  },
  {
    id: "AMP-014",
    name: "Insect Defensin",
    sequence: "ATCDLLSGTGINHSACAAHCLLRGNRGGYCNGKGVCVCRN (variable)",
    length: 40,
    molecular_weight: 4000.0,
    source: "Various insects (Phormia terranovae, etc.)",
    target_organisms: ["Gram-positive bacteria", "Some Gram-negative bacteria"],
    mechanism: "Membrane disruption; ATPase inhibition",
    mic_values: {
      "S. aureus": "1-10 µg/mL",
      "B. subtilis": "0.5-5 µg/mL",
      "E. coli": "10-100 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Insect defensin",
    notes: "Three disulfide bridges; structural similarity to plant thionins; induced upon infection"
  },
  {
    id: "AMP-015",
    name: "Bactenecin",
    sequence: "RLCRIVVIRVCR",
    length: 12,
    molecular_weight: 1466.8,
    source: "Bovine neutrophil cytoplasmic granules",
    target_organisms: ["Gram-negative bacteria", "Gram-positive bacteria"],
    mechanism: "Membrane disruption; intracellular target binding",
    mic_values: {
      "E. coli": "1-8 µg/mL",
      "S. typhimurium": "2-16 µg/mL",
      "S. aureus": "8-32 µg/mL"
    },
    spectrum: "Moderate-spectrum",
    category: "Cathelicidin (Bac5 precursor)",
    notes: "One of the shortest AMPs; cyclic structure via disulfide bond; bovine cathelicidin family"
  },
  {
    id: "AMP-016",
    name: "Indolicidin",
    sequence: "ILPWKWPWWPWRR",
    length: 13,
    molecular_weight: 1906.3,
    source: "Bovine neutrophil cytoplasmic granules",
    target_organisms: ["Gram-positive bacteria", "Gram-negative bacteria", "Fungi", "Viruses"],
    mechanism: "Membrane disruption; DNA binding; topoisomerase inhibition",
    mic_values: {
      "S. aureus": "4-32 µg/mL",
      "E. coli": "2-16 µg/mL",
      "C. albicans": "8-64 µg/mL"
    },
    spectrum: "Broad-spectrum",
    category: "Cathelicidin (Trp-rich)",
    notes: "Highest tryptophan content of any known AMP; 3 proline residues; anti-HIV activity"
  },
  {
    id: "AMP-017",
    name: "Histatin 5",
    sequence: "DSHAKRHHGYKRKFHEKHHSHRGY",
    length: 24,
    molecular_weight: 3035.2,
    source: "Human salivary glands (parotid, submandibular)",
    target_organisms: ["Candida albicans", "Other pathogenic fungi"],
    mechanism: "Intracellular targeting; mitochondrial membrane disruption; ROS generation",
    mic_values: {
      "C. albicans": "15-75 µg/mL",
      "C. glabrata": "30-150 µg/mL",
      "C. krusei": "25-100 µg/mL"
    },
    spectrum: "Antifungal-specific",
    category: "Histatin",
    notes: "Key component of oral innate immunity; salt-sensitive; precursor to fungicidal peptide"
  },
  {
    id: "AMP-018",
    name: "Salivaricin A",
    sequence: "WNSWSICGVSCNKTKC (lantibiotic structure)",
    length: 22,
    molecular_weight: 2310.0,
    source: "Streptococcus salivarius (oral commensal)",
    target_organisms: ["Gram-positive bacteria", "Streptococcus pyogenes"],
    mechanism: "Lipid II binding; pore formation",
    mic_values: {
      "S. pyogenes": "0.05-1 µg/mL",
      "S. mutans": "0.1-5 µg/mL",
      "L. monocytogenes": "0.1-2 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Lantibiotic (Type AII)",
    notes: "Produced by oral probiotic strain; potential for preventing pharyngitis; two-component system"
  },
  {
    id: "AMP-019",
    name: "Bovicin HC5",
    sequence: "ITSISLCTPGCKTGALMGCNMKTATCHCSIHVSK (modified lantibiotic)",
    length: 32,
    molecular_weight: 3400.0,
    source: "Streptococcus bovis HC5 (bovine rumen)",
    target_organisms: ["Gram-positive bacteria", "Some Gram-negative bacteria"],
    mechanism: "Membrane disruption; proton motive force dissipation",
    mic_values: {
      "S. mutans": "0.1-2 µg/mL",
      "L. monocytogenes": "0.5-5 µg/mL",
      "E. coli": "5-50 µg/mL"
    },
    spectrum: "Moderate-spectrum",
    category: "Lantibiotic (Type AII)",
    notes: "Rumen-derived; active at low pH; potential for rumen manipulation"
  },
  {
    id: "AMP-020",
    name: "Lacticin Q",
    sequence: "FVQILQFLATGQGNFLTK (modified lantibiotic)",
    length: 33,
    molecular_weight: 3520.0,
    source: "Lactococcus lactis QU 5",
    target_organisms: ["Gram-positive bacteria"],
    mechanism: "Membrane pore formation; rapid membrane permeabilization",
    mic_values: {
      "L. monocytogenes": "0.1-2 µg/mL",
      "S. aureus": "0.5-5 µg/mL",
      "B. cereus": "0.2-3 µg/mL"
    },
    spectrum: "Narrow-spectrum (Gram-positive)",
    category: "Lantibiotic (unmodified)",
    notes: "Unusual lantibiotic without lanthionine bridges; heat stable; broad pH range activity"
  },
  {
    id: "AMP-021",
    name: "Pediocin PA-1",
    sequence: "KYYGNGVTCGKHSCSVDWGKATTCIINNGAMAWATGGHQGNHKC",
    length: 44,
    molecular_weight: 4627.4,
    source: "Pediococcus acidilactici PAC1.0",
    target_organisms: ["Listeria species", "Gram-positive bacteria"],
    mechanism: "Receptor-mediated membrane disruption via mannose-PTS permease",
    mic_values: {
      "L. monocytogenes": "0.1-10 ng/mL",
      "L. innocua": "0.5-20 ng/mL",
      "E. faecalis": "100-1000 ng/mL",
      "S. aureus": "500-5000 ng/mL"
    },
    spectrum: "Narrow-spectrum (anti-Listeria)",
    category: "Class IIa bacteriocin",
    notes: "Potent anti-Listeria activity; used in food preservation; YGNGV motif conserved"
  },
  {
    id: "AMP-022",
    name: "Enterocin A",
    sequence: "YYGNGVSCNKKGCSVDWGKAIGIIGNNSAANLATGGAAGWSK (modified)",
    length: 47,
    molecular_weight: 4829.0,
    source: "Enterococcus faecium CTC492",
    target_organisms: ["Listeria species", "Gram-positive bacteria"],
    mechanism: "Receptor-mediated membrane disruption; IIa bacteriocin receptor binding",
    mic_values: {
      "L. monocytogenes": "0.5-10 ng/mL",
      "L. ivanovii": "1-20 ng/mL",
      "E. faecalis": "100-2000 ng/mL"
    },
    spectrum: "Narrow-spectrum (anti-Listeria)",
    category: "Class IIa bacteriocin",
    notes: "Often co-produced with enterocin B; heat stable; pH resistant"
  },
  {
    id: "AMP-023",
    name: "Plantaricin A",
    sequence: "AGYIKQGWNLLKGILSSAGKAIHDP (modified two-peptide)",
    length: 26,
    molecular_weight: 2780.0,
    source: "Lactobacillus plantarum C11",
    target_organisms: ["Gram-positive bacteria", "Lactic acid bacteria"],
    mechanism: "Membrane permeabilization via two-component system",
    mic_values: {
      "L. sake": "1-50 nM",
      "P. pentosaceus": "5-100 nM",
      "E. faecium": "10-200 nM"
    },
    spectrum: "Narrow-spectrum (LAB)",
    category: "Class IIb bacteriocin (two-peptide)",
    notes: "Two-component bacteriocin (PlnA + PlnEF); quorum sensing regulated"
  },
  {
    id: "AMP-024",
    name: "Leucocin A",
    sequence: "KYYGNGVHCTKSGCSVNWGEAFSAGVHRLANGGNGFW",
    length: 37,
    molecular_weight: 3930.0,
    source: "Leuconostoc gelidum UAL187",
    target_organisms: ["Listeria species", "Some Gram-positive bacteria"],
    mechanism: "Receptor-mediated membrane disruption; YGNGV motif recognition",
    mic_values: {
      "L. monocytogenes": "0.5-5 ng/mL",
      "L. seeligeri": "1-10 ng/mL",
      "C. piscicola": "50-200 ng/mL"
    },
    spectrum: "Narrow-spectrum (anti-Listeria)",
    category: "Class IIa bacteriocin",
    notes: "Small, heat-stable; pediocin-like structure; produced by Leuconostoc"
  },
  {
    id: "AMP-025",
    name: "Carnobacteriocin B2",
    sequence: "NYGNGVSCSKKCSVNWGQAFQERYTAGINSFVSGVASGAGSIGRR (modified)",
    length: 48,
    molecular_weight: 5000.0,
    source: "Carnobacterium piscicola LV17B",
    target_organisms: ["Gram-positive bacteria", "Listeria species"],
    mechanism: "Membrane disruption; PTS permease receptor binding",
    mic_values: {
      "L. monocytogenes": "10-100 ng/mL",
      "C. piscicola": "5-50 ng/mL",
      "E. faecium": "200-2000 ng/mL"
    },
    spectrum: "Moderate-spectrum (Gram-positive)",
    category: "Class IIa bacteriocin",
    notes: "Co-produced with carnobacteriocin BM1; plasmid-encoded; food-grade potential"
  }
];

export const peptideCategories = {
  cathelicidins: ["AMP-001", "AMP-015", "AMP-016"],
  defensins: {
    human_beta: ["AMP-002", "AMP-003", "AMP-004"],
    insect: ["AMP-014"]
  },
  amphibian: ["AMP-005", "AMP-006", "AMP-007", "AMP-008"],
  lantibiotics: ["AMP-009", "AMP-018", "AMP-019", "AMP-020"],
  polymyxins: ["AMP-010", "AMP-011"],
  insect_cecropins: ["AMP-013"],
  bacteriocins_class_IIa: ["AMP-021", "AMP-022", "AMP-024", "AMP-025"],
  bacteriocins_class_IIb: ["AMP-023"],
  oral_peptides: ["AMP-017"],
  linear_peptides: ["AMP-012"]
};

export const spectrumSummary = {
  broad: ["AMP-001", "AMP-002", "AMP-003", "AMP-004", "AMP-005", "AMP-006", "AMP-007", "AMP-013", "AMP-016"],
  narrow_gram_positive: ["AMP-008", "AMP-009", "AMP-012", "AMP-014", "AMP-018", "AMP-020"],
  narrow_gram_negative: ["AMP-010", "AMP-011"],
  anti_listeria: ["AMP-021", "AMP-022", "AMP-024"],
  antifungal: ["AMP-017"],
  anti_lab: ["AMP-023"]
};
