---
title: "Structure-Activity Relationships"
description: Guide to peptide structure-activity relationships — how sequence, modifications, and conformation affect biological activity and pharmacokinetics.
---

# Structure-Activity Relationships (SAR)

Understanding SAR is essential for designing peptides with improved potency, selectivity, and drug-like properties. This guide covers sequence design, modification strategies, and optimization approaches.

## SAR Fundamentals

### Key Structural Elements

| Element | Influence | Optimization Strategy |
|---------|-----------|----------------------|
| Backbone conformation | Receptor binding | Cyclization, stapling |
| Side chain chemistry | Selectivity | Amino acid substitution |
| Charge distribution | Solubility, binding | pH-dependent modifications |
| Hydrophobicity | Membrane permeability | Lipophilic modifications |
| Flexibility | Entropy penalty | Constrained analogs |

### Amino Acid Properties

| Property | Examples | Impact |
|----------|----------|--------|
| Hydrophobic | Ala, Val, Leu, Ile, Phe | Membrane binding, aggregation |
| Polar | Ser, Thr, Asn, Gln | Solubility, H-bonding |
| Charged (+) | Lys, Arg, His | Electrostatic interactions |
| Charged (-) | Asp, Glu | Electrostatic interactions |
| Aromatic | Phe, Tyr, Trp | π-stacking, hydrophobic |
| Special | Pro, Gly, Cys | Conformation, disulfide |

## Modification Strategies

### N-Terminal Modifications

| Modification | Half-Life Extension | Mechanism | Example |
|--------------|-------------------|-----------|---------|
| Acetylation | 2–5× | Aminopeptidase resistance | Thymosin α1 |
| Pyroglutamate | 3–6× | N-terminal protection | TRH, GnRH |
| Benzoylation | 2–4× | Hydrophobic protection | Investigational |
| Myristoylation | 10–20× | Membrane anchoring | Src peptides |

### C-Terminal Modifications

| Modification | Half-Life Extension | Mechanism | Example |
|--------------|-------------------|-----------|---------|
| Amidation | 2–5× | Carboxypeptidase resistance | Oxytocin |
| Ethylamide | 2–4× | Carboxypeptidase resistance | Buserelin |
| Methyl ester | 2–3× | Carboxypeptidase resistance | Investigational |
| Fatty acid | 10–50× | Albumin binding | Semaglutide |

### Backbone Modifications

| Modification | Effect | Application |
|--------------|--------|-------------|
| N-methylation | Protease resistance | Oral peptides |
| β-peptides | Protease resistance | Stable analogs |
| Peptide nucleic acids | Binding affinity | Diagnostic probes |
| Stapled peptides | Conformational constraint | Intracellular targets |

## Conformational Control

### Cyclization Strategies

| Type | Ring Size | Constraint | Example |
|------|-----------|------------|---------|
| Head-to-tail | 8–30 aa | Full backbone | Octreotide |
| Side-chain to side-chain | Variable | Partial | Cyclic RGD |
| Side-chain to backbone | Variable | Partial | Lactam bridges |
| Stapled | 7–12 aa | α-helix | Bcl-2 inhibitors |

### Disulfide Bond Engineering

| Bond | Position | Effect | Example |
|------|----------|--------|---------|
| Cys-Cys | Variable | Conformational constraint | Insulin |
| D-Cys-L-Cys | Variable | Metabolic stability | Octreotide |
| S-S bridge | Variable | Rigid structure | Defensins |
| Thioether | Variable | Non-reducible | Stable analogs |

## Selectivity Engineering

### Receptor Subtype Selectivity

| Strategy | Mechanism | Example |
|----------|-----------|---------|
| Residue substitution | Binding pocket optimization | Melanocortin selectivity |
| Conformational constraint | Reduced flexibility | Somatostatin analogs |
| Charge modification | Electrostatic complementarity | Enkephalin analogs |
| Stereochemistry | Chiral recognition | D-amino acid analogs |

### Example: Melanocortin Selectivity

| Peptide | MC4R EC50 | MC1R EC50 | Selectivity |
|---------|-----------|-----------|-------------|
| α-MSH | 1 nM | 0.1 nM | 10× MC1R |
| MT-II | 0.3 nM | 0.03 nM | 10× MC1R |
| PT-141 | 0.5 nM | 0.1 nM | 5× MC1R |
| Setmelanotide | 0.2 nM | 10 nM | 50× MC4R |

## Pharmacokinetic Optimization

### Half-Life Extension

| Strategy | Half-Life Extension | Mechanism | Example |
|----------|-------------------|-----------|---------|
| PEGylation | 5–10× | Renal filtration resistance | PEG-IFN |
| Fatty acylation | 10–50× | Albumin binding | Semaglutide |
| Fc fusion | 50–100× | FcRn recycling | Dulaglutide |
| Albumin binding | 20–50× | Albumin recycling | Insulin detemir |
| D-amino acids | 5–20× | Protease resistance | Bremelanotide |
| Cyclization | 3–10× | Protease resistance | Octreotide |

### Oral Bioavailability

| Strategy | Bioavailability | Mechanism | Example |
|----------|----------------|-----------|---------|
| SNAC | ~1% | pH modulation | Semaglutide oral |
| Permeation enhancers | 5–15% | Tight junction opening | Investigational |
| Nanoparticles | 5–20% | Lymphatic uptake | Investigational |
| D-amino acids | 10–30% | Protease resistance | Investigational |
| Prodrugs | 10–30% | Chemical modification | Investigational |

## Computational Approaches

### Molecular Modeling

| Method | Application | Output |
|--------|-------------|--------|
| Homology modeling | 3D structure | Template-based structure |
| Molecular dynamics | Conformational sampling | Ensemble of conformations |
| docking | Binding mode prediction | Receptor-ligand complex |
| QSAR | Activity prediction | Quantitative models |
| De novo design | Novel sequences | Optimized candidates |

### Machine Learning Applications

| Application | Data Required | Output |
|-------------|---------------|--------|
| Activity prediction | SAR data | Active/inactive classification |
| ADMET prediction | PK data | Drug-like properties |
| Sequence optimization | Activity data | Optimized sequence |
| Aggregation prediction | Stability data | Aggregation propensity |

## Case Studies

### Case Study 1: GLP-1 Optimization

| Peptide | Sequence | Half-life | Key Modification |
|---------|----------|-----------|------------------|
| GLP-1 (native) | HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR | 2–5 min | None |
| Exenatide | HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS | 2–4 hrs | Exendin-4 (DPP-4 resistant) |
| Liraglutide | HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR | 13 hrs | C16 fatty acyl, Aib34 |
| Semaglutide | HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR | 165 hrs | Aib8, C18 diacid, PEG linker |

### Case Study 2: Somatostatin Analogs

| Peptide | Sequence | Half-life | Key Modification |
|---------|----------|-----------|------------------|
| Somatostatin | AGCKNFFWKTFTSC | 1–2 min | Native |
| Octreotide | Ac-OFwCKT-NH2 | 2 hrs | D-Phe, cyclic, Thr-ol |
| Lanreotide | Ac-Nal-c(DCwKfFwKT)-Thr-NH2 | 4–6 hrs | D-Phe, Nal, cyclic |
| Pasireotide | Ac-HwKFwKT-NH2 | 12–16 hrs | D-Trp, cyclic |

## Optimization Workflow

### 1. Target Selection
- Identify target receptor
- Characterize binding pocket
- Define selectivity requirements

### 2. Lead Identification
- Screen natural ligands
- Computational design
- High-throughput screening

### 3. SAR Exploration
- Systematic residue substitution
- Modification library screening
- Conformational analysis

### 4. Lead Optimization
- Potency enhancement
- Selectivity improvement
- Stability optimization
- PK optimization

### 5. Candidate Selection
- In vitro characterization
- In vivo PK studies
- Safety assessment
- Formulation development

Research peptides available from [Kingston Peptides](https://kingstonpeptides.com)

## Related Resources

- Use [Sequence Designer](/tools/sequence-designer) for SAR-guided design
- See [Amino Acid Properties](/learn/amino-acid-properties) for residue information
- Check [Physicochemical Properties](/reference/physicochemical-properties) for molecular data
- Review [Peptide Modifications](/reference/peptide-modifications) for modification details
