---
date: 2026-06-13
author: "Wikipept Contributors"
title: "Peptide Databases Reference"
description: "Comprehensive reference of databases for peptide research, drug discovery, and clinical applications"
category: "tools"
tags: ["databases", "peptides", "proteomics", "bioinformatics", "drug-discovery", "clinical-trials"]
---

# Peptide Databases Reference

Comprehensive reference of databases essential for peptide research, organized by category.

---

## Sequence Databases

### UniProt

export const UniProt = {
  id: "uniprot",
  name: "UniProt",
  url: "https://www.uniprot.org/",
  description: "Comprehensive resource for protein sequence and functional information",
  data_types: ["protein sequences", "functional annotations", "protein families", "post-translational modifications", "sequence variants"],
  coverage: "over 250 million protein sequences across all organisms",
  size: "~600 GB (UniProtKB)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Curated Swiss-Prot and auto-annotated TrEMBL sections",
    "Cross-references to 200+ external databases",
    "Advanced search with query builder",
    "Batch download in multiple formats",
    "REST API and programmatic access",
    "Proteome-level downloads",
    "Sequence similarity search (BLAST)",
    "Feature viewer with graphical sequence display"
  ],
  category: "sequence"
};

### PDB (Sequence)

export const PDBSequence = {
  id: "pdb-sequence",
  name: "PDB (Protein Data Bank)",
  url: "https://www.rcsb.org/",
  description: "Repository of experimentally determined 3D structures of proteins and nucleic acids",
  data_types: ["protein structures", "nucleic acid structures", "ligand data", "structure validation", "sequence annotations"],
  coverage: "over 220,000 structures",
  size: "~50 GB (coordinate files)",
  access_type: "free",
  api_available: true,
  key_features: [
    "X-ray crystallography, NMR, and cryo-EM structures",
    "Advanced search by sequence, structure, and ligand",
    "3D visualization with Mol* viewer",
    "Structure comparison tools",
    "REST and GraphQL APIs",
    "Sequence Motif Search",
    "Gene Ontology annotations",
    "Integrative/hybrid method structures"
  ],
  category: "sequence"
};

### NCBI GenBank

export const GenBank = {
  id: "genbank",
  name: "NCBI GenBank",
  url: "https://www.ncbi.nlm.nih.gov/genbank/",
  description: "NIH genetic sequence database with annotated collection of all publicly available DNA sequences",
  data_types: ["nucleotide sequences", "protein translations", "coding sequences", "genome assemblies", "expressed sequence tags"],
  coverage: "over 3.7 trillion nucleotide bases from 700,000+ organisms",
  size: "~250 GB (flat files)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Daily updates from global submissions",
    "Entrez search and retrieval system",
    "BLAST sequence similarity search",
    "BankIt and Sequin submission tools",
    "NCBI E-utilities API",
    "RefSeq curated subset",
    "Taxonomic classification",
    "Genome assembly accessions"
  ],
  category: "sequence"
};

### Ensembl

export const Ensembl = {
  id: "ensembl",
  name: "Ensembl",
  url: "https://www.ensembl.org/",
  description: "Genome browser and annotation database for vertebrate and model organism genomes",
  data_types: ["genome annotation", "gene models", "protein sequences", "comparative genomics", "regulatory features", "variants"],
  coverage: "over 280 vertebrate genomes plus key model organisms",
  size: "~2 TB (full database)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Automated genome annotation pipeline",
    "REST API and Perl/Python APIs",
    "Variant Effect Predictor (VEP)",
    "BLAST and BLAT sequence search",
    "Comparative genomics tools",
    "Regulatory build with chromatin states",
    "BioMart data mining tool",
    "Custom track upload and display"
  ],
  category: "sequence"
};

### RefSeq

export const RefSeq = {
  id: "refseq",
  name: "RefSeq",
  url: "https://www.ncbi.nlm.nih.gov/refseq/",
  description: "Non-redundant collection of curated genomic, transcript, and protein sequences",
  data_types: ["reference genomes", "mRNA sequences", "protein sequences", "non-coding RNAs", "genomic regions"],
  coverage: "over 240 million sequences from 120,000+ organisms",
  size: "~180 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Curated and reviewed sequences",
    "Explicit transcript-to-genomic alignment",
    "Non-redundant reference set",
    "Linked to PubMed citations",
    "NCBI E-utilities API access",
    "Genome-specific annotation files",
    "RefSeq Select for canonical sequences",
    "Manually curated by NCBI staff and collaborators"
  ],
  category: "sequence"
};

---

## Peptide-Specific Databases

### PeptideAtlas

export const PeptideAtlas = {
  id: "peptideatlas",
  name: "PeptideAtlas",
  url: "https://www.peptideatlas.org/",
  description: "Repository of mass spectrometry-based proteomics data providing peptide and protein identifications",
  data_types: ["peptide identifications", "protein identifications", "spectral libraries", "SRM assays", "PTM data"],
  coverage: "over 1.5 million unique peptides across 20+ organisms",
  size: "~500 GB (raw data + processed)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Peptide sequence database with statistical validation",
    "SRM/MRM assay library generation",
    "Build Pipeline with TPP integration",
    "PeptideProphet and ProteinProphet validation",
    "Human Proteome Project support",
    "Tissue and biofluid-specific atlases",
    "REST API for programmatic access",
    "Spectra visualization and download"
  ],
  category: "peptide-specific"
};

### PRIDE

export const PRIDE = {
  id: "pride",
  name: "PRIDE (PRoteomics IDEntifications)",
  url: "https://www.ebi.ac.uk/pride/",
  description: "Centralized proteomics data repository for mass spectrometry-based experiments",
  data_types: ["raw mass spectrometry data", "peptide identifications", "protein identifications", "quantitative data", "post-translational modifications"],
  coverage: "over 4000 projects, 3.5 billion spectra",
  size: "~50 TB",
  access_type: "free",
  api_available: true,
  key_features: [
    "ProteomeXchange consortium member",
    "PRIDE Archive for long-term storage",
    "Submission tool (PX submission tool)",
    "Search and browse by project",
    "REST API access",
    "Spectra viewing with MS-Viewer",
    "Metadata standards (mzML, mzIdentML)",
    "Support for label-free and labeled quantification"
  ],
  category: "peptide-specific"
};

### neXtProt

export const neXtProt = {
  id: "nextprot",
  name: "neXtProt",
  url: "https://www.nextprot.org/",
  description: "Human protein-centric knowledge platform with detailed annotations for human proteins",
  data_types: ["protein sequences", "functional annotations", "tissue expression", "protein interactions", "PTMs", "variants"],
  coverage: "over 20,000 human proteins",
  size: "~20 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Human Proteome Project reference database",
    "Proteomics data integration from PeptideAtlas",
    "Tissue expression profiles",
    "Protein-protein interaction data",
    "Sequence variant annotations",
    "SPARQL endpoint for semantic queries",
    "REST API access",
    "Peptide uniqueness checker"
  ],
  category: "peptide-specific"
};

### Peptidome

export const Peptidome = {
  id: "peptidome",
  name: "Peptidome",
  url: "https://www.ncbi.nlm.nih.gov/peptidome/",
  description: "NCBI repository for tandem mass spectrometry peptide and protein identification data",
  data_types: ["mass spectra", "peptide identifications", "protein identifications", "experimental metadata"],
  coverage: "integrated with NCBI resources",
  size: "~100 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "NCBI-integrated proteomics repository",
    "mzML and mzIdentML format support",
    "Linked to PubMed and GEO",
    "Batch download capabilities",
    "Entrez search integration",
    "Submission via NCBI interface",
    "Export to various formats",
    "Cross-reference to UniProt and RefSeq"
  ],
  category: "peptide-specific"
};

### APD3 (Antimicrobial Peptide Database)

export const APD3 = {
  id: "apd3",
  name: "APD3 (Antimicrobial Peptide Database)",
  url: "http://aps.unmc.edu/AP/",
  description: "Database of antimicrobial and host defense peptides with sequence, structure, and activity data",
  data_types: ["antimicrobial peptides", "sequence data", "activity data", "structure information", "source organisms"],
  coverage: "over 3300 antimicrobial peptides",
  size: "~5 GB",
  access_type: "free",
  api_available: false,
  key_features: [
    "Curated antimicrobial peptide collection",
    "Search by sequence, activity, and source",
    "Peptide classification system",
    "MIC value annotations",
    "3D structure links to PDB",
    "Design tool for novel AMPs",
    "Cancer-selective peptides",
    "Anti-biofilm peptides"
  ],
  category: "peptide-specific"
};

---

## Drug Databases

### DrugBank

export const DrugBank = {
  id: "drugbank",
  name: "DrugBank",
  url: "https://go.drugbank.com/",
  description: "Comprehensive drug and drug target database combining detailed drug data with drug target information",
  data_types: ["drug information", "drug targets", "drug interactions", "pharmacokinetics", "peptide drugs", "clinical trial data"],
  coverage: "over 16,000 drug entries including 4,800+ approved drugs",
  size: "~15 GB",
  access_type: "free academic / commercial license",
  api_available: true,
  key_features: [
    "Detailed drug monographs",
    "Drug-target interaction networks",
    "Drug-drug interaction predictions",
    "Pharmacokinetic data",
    "FDA and EMA approval information",
    "REST API for programmatic access",
    "Machine-readable XML downloads",
    "Metabolism pathway mapping"
  ],
  category: "drug"
};

### PubChem

export const PubChem = {
  id: "pubchem",
  name: "PubChem",
  url: "https://pubchem.ncbi.nlm.nih.gov/",
  description: "NIH open chemistry database with information on chemical structures, biological activities, and safety data",
  data_types: ["chemical structures", "bioassay data", "biological activities", "safety data", "patent information"],
  coverage: "over 300 million compounds, 1.5 million bioassays",
  size: "~100 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Largest free chemistry database",
    "Structure and similarity search",
    "Bioassay activity data",
    "Chemical safety and toxicity data",
    "REST and PUG APIs",
    "Bulk download capabilities",
    "Integration with NCBI Entrez",
    "3D conformer generation"
  ],
  category: "drug"
};

### ChEMBL

export const ChEMBL = {
  id: "chembl",
  name: "ChEMBL",
  url: "https://www.ebi.ac.uk/chembl/",
  description: "Database of bioactive molecules with drug-like properties and their biological targets",
  data_types: ["bioactivity data", "compound structures", "target information", "drug mechanisms", "assay descriptions"],
  coverage: "over 2.4 million compounds, 18 million activity values",
  size: "~50 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Curated bioactivity data from literature",
    "Drug target annotations",
    "Assay descriptions and protocols",
    "ADMET predictions",
    "REST API access",
    "ChEMBL Web Services",
    "SQL dump downloads",
    "Integration with UniChem"
  ],
  category: "drug"
};

### IUPHAR/BPS Guide to Pharmacology

export const IUPHAR = {
  id: "iuphar",
  name: "IUPHAR/BPS Guide to Pharmacology",
  url: "https://www.guidetopharmacology.org/",
  description: "Expert-curated resource on drug targets and their ligands, covering all IUPHAR-recognized receptor families",
  data_types: ["receptor pharmacology", "ligand data", "drug targets", "ion channels", "GPCRs", "enzymes"],
  coverage: "over 10,000 ligands, 3,000 targets",
  size: "~5 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "IUPHAR nomenclature and classification",
    "Expert-curated target-ligand interactions",
    "Ligand activity and binding data",
    "Receptor family structure guides",
    "REST API access",
    "Drug-target connection tables",
    "Ion channel pharmacology",
    "Immunopharmacology guides"
  ],
  category: "drug"
};

### Therapeutic Target Database (TTD)

export const TTD = {
  id: "ttd",
  name: "Therapeutic Target Database (TTD)",
  url: "https://db.idrblab.net/ttd/",
  description: "Database providing information about therapeutic targets, corresponding drugs, and disease indications",
  data_types: ["therapeutic targets", "drug-target associations", "disease indications", "target validation", "clinical trial status"],
  coverage: "over 3,700 targets, 40,000 drugs",
  size: "~10 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Target-disease-drug associations",
    "Successful and clinical trial targets",
    "Target validation evidence levels",
    "Drug clinical trial phases",
    "Target pathway information",
    "Batch download capabilities",
    "Cross-references to major databases",
    "Biomarker information"
  ],
  category: "drug"
};

---

## Structure Databases

### PDB (Structure)

export const PDBStructure = {
  id: "pdb-structure",
  name: "PDB (Protein Data Bank)",
  url: "https://www.rcsb.org/",
  description: "Single worldwide repository for experimentally determined 3D structures of biological macromolecules",
  data_types: ["3D coordinates", "structure factors", "NMR restraints", "validation reports", "ligand geometries"],
  coverage: "over 220,000 structures",
  size: "~200 GB (with experimental data)",
  access_type: "free",
  api_available: true,
  key_features: [
    "X-ray, NMR, cryo-EM, and integrative structures",
    "Mol* 3D viewer",
    "Advanced search by sequence, structure, ligand",
    "Structure validation reports",
    "REST and GraphQL APIs",
    "Weekly data releases",
    "Chemical Component Dictionary",
    "Pairwise Structure Alignment"
  ],
  category: "structure"
};

### AlphaFold DB

export const AlphaFoldDB = {
  id: "alphafold",
  name: "AlphaFold Protein Structure Database",
  url: "https://alphafold.ebi.ac.uk/",
  description: "Database of AI-predicted protein structures generated by DeepMind's AlphaFold",
  data_types: ["predicted 3D structures", "confidence scores (pLDDT)", "PAE matrices", "structure metadata"],
  coverage: "over 200 million predicted structures",
  size: "~50 TB (all organisms)",
  access_type: "free",
  api_available: true,
  key_features: [
    "AlphaFold2 and AlphaFold3 predictions",
    "Per-residue confidence scores (pLDDT)",
    "Predicted Aligned Error (PAE) matrices",
    "Species-specific downloads",
    "REST API access",
    "UniProt-linked predictions",
    "CIF and PDB format downloads",
    "Multimer predictions for complexes"
  ],
  category: "structure"
};

### ModelArchive

export const ModelArchive = {
  id: "modelarchive",
  name: "ModelArchive",
  url: "https://www.modelarchive.org/",
  description: "Repository for computational structural models with validation and quality assessment",
  data_types: ["computational models", "homology models", "structural predictions", "validation reports", "model metadata"],
  coverage: "integrated structural models from various prediction methods",
  size: "~500 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Validated computational models",
    "Quality assessment scores",
    "Multiple modeling methods",
    "REST API access",
    "PDB format downloads",
    "Model provenance tracking",
    "Cross-reference to UniProt",
    "Standardized metadata"
  ],
  category: "structure"
};

### SASBDB

export const SASBDB = {
  id: "sasbdb",
  name: "SASBDB (Small Angle Scattering Biological Data Bank)",
  url: "https://www.sasbdb.org/",
  description: "Repository for small-angle X-ray and neutron scattering (SAS) data and models of biological macromolecules",
  data_types: ["SAS curves", "3D envelopes", "structural parameters", "model fits", "experimental metadata"],
  coverage: "curated SAS experiments and models",
  size: "~50 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "SAS data and model repository",
    "Guinier analysis data",
    "Pairwise distance distributions",
    "Ab initio models",
    "REST API access",
    "Standardized SAS format (SASDATA)",
    "Integration with PDB and EMDB",
    "Experimental metadata capture"
  ],
  category: "structure"
};

### EMDB

export const EMDB = {
  id: "emdb",
  name: "EMDB (Electron Microscopy Data Bank)",
  url: "https://www.ebi.ac.uk/emdb/",
  description: "Repository for electron microscopy maps and associated metadata for structural biology",
  data_types: ["electron density maps", "fitted atomic models", "tomography data", "experimental metadata", "validation reports"],
  coverage: "over 50,000 EM maps",
  size: "~500 TB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Cryo-EM and electron tomography maps",
    "Integration with PDB for fitted models",
    "Map visualization tools",
    "REST API access",
    "Map validation reports",
    "Half-map and raw data deposition",
    "Search by resolution and organism",
    "Standardized EMDB format"
  ],
  category: "structure"
};

---

## Clinical Databases

### ClinicalTrials.gov

export const ClinicalTrialsGov = {
  id: "clinicaltrials-gov",
  name: "ClinicalTrials.gov",
  url: "https://clinicaltrials.gov/",
  description: "NIH registry and results database of publicly and privately funded clinical studies",
  data_types: ["clinical trial protocols", "recruitment status", "study results", "adverse events", "intervention details"],
  coverage: "over 480,000 studies from 220+ countries",
  size: "~200 GB (structured data)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Largest clinical trials registry",
    "Peptide drug trial tracking",
    "Results reporting for completed trials",
    "REST API v2 access",
    "Bulk download in CSV and JSON",
    "Search by intervention, condition, and status",
    "FDA IND/IDE linkage",
    "Patient recruitment status tracking"
  ],
  category: "clinical"
};

### EU Clinical Trials Register

export const EUCTR = {
  id: "euctr",
  name: "EU Clinical Trials Register",
  url: "https://www.clinicaltrialsregister.eu/",
  description: "European registry of clinical trials conducted in the EU/EEA, maintained by the European Medicines Agency",
  data_types: ["clinical trial protocols", "EU trial results", "regulatory information", "sponsor details", "investigational medicinal product data"],
  coverage: "over 45,000 clinical trials in EU/EEA",
  size: "~50 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "EU/EEA trial registration",
    "EMA regulatory oversight data",
    "Trial results summary",
    "EudraCT number tracking",
    "REST API access",
    "Pediatric investigation plans",
    "Orphan drug designations",
    "GMP compliance data"
  ],
  category: "clinical"
};

### WHO ICTRP

export const WHOICTRP = {
  id: "who-ictrp",
  name: "WHO ICTRP (International Clinical Trials Registry Platform)",
  url: "https://trialsearch.who.int/",
  description: "WHO platform providing a single point of access to clinical trial registries worldwide",
  data_types: ["global trial registrations", "trial metadata", "registry identifiers", "study designs", "intervention types"],
  coverage: "over 1 million trial records from 20 registries",
  size: "~100 GB",
  access_type: "free",
  api_available: false,
  key_features: [
    "Global clinical trial search portal",
    "Standardized trial identification (UTN)",
    "Cross-registry search",
    "Primary registries network",
    "Trial registration data sets",
    "Downloadable search results",
    "Link to full registry records",
    "Ethical review information"
  ],
  category: "clinical"
};

### FDA Orange Book

export const FDAOrangeBook = {
  id: "fda-orange-book",
  name: "FDA Orange Book (Approved Drug Products)",
  url: "https://www.fda.gov/drugs/drug-approvals-and-databases/approved-drug-products-therapeutic-equivalence-evaluations-orange-book",
  description: "FDA list of approved drug products with therapeutic equivalence evaluations",
  data_types: ["approved drug products", "therapeutic equivalence", "patent information", "exclusivity data", "applicant information"],
  coverage: "over 42,000 approved drug products",
  size: "~5 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "FDA-approved drug listing",
    "Therapeutic equivalence ratings",
    "Patent and exclusivity data",
    "Generic drug equivalents",
    "Downloadable data files",
    "Orange Book API (FDA)",
    "RLD (Reference Listed Drug) designation",
    "Approval history and supplements"
  ],
  category: "clinical"
};

### EMA EPAR

export const EMAEPAR = {
  id: "ema-epar",
  name: "EMA EPAR (European Public Assessment Reports)",
  url: "https://www.ema.europa.eu/en/medicines",
  description: "European Medicines Agency database of assessment reports for centrally authorized medicines",
  data_types: ["assessment reports", "scientific discussions", "approval information", "risk management plans", "product characteristics"],
  coverage: "over 1,700 centrally authorized medicines",
  size: "~100 GB (PDF reports)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Detailed scientific assessment reports",
    "Peptide drug approval documentation",
    "Risk-benefit evaluation summaries",
    "Product information documents",
    "EMA SPOR data services API",
    "Orphan drug designation data",
    "Conditional approval tracking",
    "Post-authorization safety studies"
  ],
  category: "clinical"
};

---

## Genomic Databases

### NCBI Gene

export const NCBIGene = {
  id: "ncbi-gene",
  name: "NCBI Gene",
  url: "https://www.ncbi.nlm.nih.gov/gene/",
  description: "NCBI database providing gene-specific information including nomenclature, chromosomal location, gene products, and associated conditions",
  data_types: ["gene records", "gene expression", "orthologs", "gene-disease associations", "pathways", "protein products"],
  coverage: "over 30 million gene records",
  size: "~20 GB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Gene-centric data integration",
    "Gene expression data from GEO",
    "Protein product links to UniProt",
    "Gene-disease associations",
    "NCBI E-utilities API",
    "Batch download capabilities",
    "Gene ontology annotations",
    "Reference sequence gene records"
  ],
  category: "genomic"
};

### Ensembl (Genomic)

export const EnsemblGenomic = {
  id: "ensembl-genomic",
  name: "Ensembl",
  url: "https://www.ensembl.org/",
  description: "Genome browser providing comprehensive annotation of vertebrate and model organism genomes",
  data_types: ["gene models", "transcript annotations", "regulatory elements", "comparative genomics", "variants", "protein annotations"],
  coverage: "over 280 genomes",
  size: "~2 TB",
  access_type: "free",
  api_available: true,
  key_features: [
    "Automated genome annotation",
    "Variant Effect Predictor (VEP)",
    "BioMart data mining",
    "REST and Perl APIs",
    "Comparative genomics tools",
    "Regulatory feature annotation",
    "Custom track display",
    "Gene tree analysis"
  ],
  category: "genomic"
};

### UCSC Genome Browser

export const UCSC = {
  id: "ucsc",
  name: "UCSC Genome Browser",
  url: "https://genome.ucsc.edu/",
  description: "Interactive website offering access to genome sequence data and annotations for hundreds of assemblies",
  data_types: ["genome assemblies", "gene annotations", "comparative genomics", "regulatory elements", "variant data", "expression data"],
  coverage: "over 800 genome assemblies",
  size: "~5 TB (all tracks and assemblies)",
  access_type: "free",
  api_available: true,
  key_features: [
    "Interactive genome visualization",
    "Custom track and track hub support",
    "BLAT sequence search",
    "Table Browser data extraction",
    "REST API access",
    "Comparative genomics multi-species alignment",
    "ENCODE and Roadmap epigenomics data",
    "LiftOver coordinate conversion"
  ],
  category: "genomic"
};

### GTEx

export const GTEx = {
  id: "gtex",
  name: "GTEx (Genotype-Tissue Expression)",
  url: "https://gtexportal.org/",
  description: "Resource studying gene expression regulation across multiple human tissues",
  data_types: ["gene expression", "eQTL data", "tissue-specific expression", "splicing QTLs", "allele-specific expression"],
  coverage: "over 50 human tissues, 17,000 samples",
  size: "~1 TB",
  access_type: "free (registration required for raw data)",
  api_available: true,
  key_features: [
    "Multi-tissue gene expression atlas",
    "Expression quantitative trait loci (eQTL)",
    "Tissue-specific expression patterns",
    "GTEx Portal API",
    "Splicing quantitative trait loci (sQTL)",
    "Single-tissue and multi-tissue eQTL",
    "Visualization tools for gene expression",
    "Heritability estimation tools"
  ],
  category: "genomic"
};

### TCGA

export const TCGA = {
  id: "tcga",
  name: "TCGA (The Cancer Genome Atlas)",
  url: "https://portal.gdc.cancer.gov/",
  description: "NIH landmark cancer genomics program that molecularly characterized over 20,000 primary cancers spanning 33 cancer types",
  data_types: ["somatic mutations", "gene expression", "copy number variations", "DNA methylation", "miRNA expression", "clinical data"],
  coverage: "33 cancer types, over 20,000 samples",
  size: "~2.5 PB",
  access_type: "free (controlled access for some data)",
  api_available: true,
  key_features: [
    "Multi-omics cancer data",
    "GDC Data Portal access",
    "REST API for data queries",
    "Clinical and survival data",
    "Mutation and fusion gene data",
    "Copy number and methylation analysis",
    "Immune subtype classification",
    "Integrated pathway analysis"
  ],
  category: "genomic"
};

---

## Quick Reference: Access Types

| Access Type | Databases |
|---|---|
| **Free, Open** | UniProt, PDB, GenBank, RefSeq, PubChem, ChEMBL, AlphaFold DB, EMDB, ClinicalTrials.gov, NCBI Gene |
| **Free, Registration** | GTEx (raw data), TCGA (controlled data) |
| **Free Academic / Commercial** | DrugBank |
| **Free, API Available** | All except APD3 and WHO ICTRP |

## Quick Reference: By Data Type

| Data Type | Databases |
|---|---|
| **Protein Sequences** | UniProt, neXtProt, RefSeq, Ensembl |
| **3D Structures** | PDB, AlphaFold DB, ModelArchive, EMDB, SASBDB |
| **Peptide Identifications** | PeptideAtlas, PRIDE, Peptidome |
| **Bioactivity Data** | ChEMBL, PubChem, DrugBank |
| **Clinical Trials** | ClinicalTrials.gov, EUCTR, WHO ICTRP |
| **Drug Approvals** | FDA Orange Book, EMA EPAR |
| **Genomic Annotations** | Ensembl, UCSC, NCBI Gene |
| **Gene Expression** | GTEx, TCGA |
