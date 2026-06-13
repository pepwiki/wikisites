---
title: Peptide Modifications Database
description: Comprehensive database of peptide modifications with structural, stability, and pharmacological data
---

# Peptide Modifications Database

Structured reference for peptide modifications organized by category.

---

## Backbone Modifications

### 1. N-Methylation

| Field | Value |
|-------|-------|
| **id** | `MOD-001` |
| **name** | N-Methylation |
| **modification_type** | Backbone |
| **chemical_structure** | Replacement of backbone amide NH with N-CH₃ |
| **target_residues** | Any amino acid (α-nitrogen) |
| **effect_on_stability** | Reduces proteolysis by blocking protease access to amide bond |
| **effect_on_bioavailability** | Increased membrane permeability due to reduced hydrogen bond donors |
| **effect_on_half_life** | Extended 2–5x in plasma |
| **examples** | Cyclosporine A, GRF(1-29) analogs |
| **category** | Backbone Modifications |

### 2. Beta-Amino Acids

| Field | Value |
|-------|-------|
| **id** | `MOD-002` |
| **name** | Beta-Amino Acids |
| **modification_type** | Backbone |
| **chemical_structure** | Insertion of additional CH₂ between amino and carboxyl groups (β³ or β² substitution) |
| **target_residues** | Any position; often substituted at protease-sensitive sites |
| **effect_on_stability** | Protease resistant; enzymes cannot cleave β-peptide bonds |
| **effect_on_bioavailability** | Maintained or improved; can adopt stable secondary structures |
| **effect_on_half_life** | Extended significantly (hours to days) |
| **examples** | β-peptide foldamers, antimicrobial β-peptides |
| **category** | Backbone Modifications |

### 3. D-Amino Acid Substitution

| Field | Value |
|-------|-------|
| **id** | `MOD-003` |
| **name** | D-Amino Acid Substitution |
| **modification_type** | Backbone |
| **chemical_structure** | Stereochemical inversion at Cα (L → D configuration) |
| **target_residues** | Any amino acid; targeted at protease cleavage sites |
| **effect_on_stability** | Protease resistant; most proteases are L-specific |
| **effect_on_bioavailability** | Improved oral bioavailability in some cases |
| **effect_on_half_life** | Extended 5–10x depending on position |
| **examples** | Desmopressin, [D-Ala²] enkephalin, BPC-157 |
| **category** | Backbone Modifications |

### 4. Alpha-Methylation

| Field | Value |
|-------|-------|
| **id** | `MOD-004` |
| **name** | Alpha-Methylation |
| **modification_type** | Backbone |
| **chemical_structure** | Addition of methyl group at Cα position (α,α-disubstituted amino acids like Aib) |
| **target_residues** | Any; commonly alanine (→ Aib) |
| **effect_on_stability** | Conformational restriction; stabilizes helical structures; protease resistant |
| **effect_on_bioavailability** | Enhanced due to restricted backbone flexibility |
| **effect_on_half_life** | Extended 3–8x |
| **examples** | Aib (α-aminoisobutyric acid) in peptaibols |
| **category** | Backbone Modifications |

### 5. N-Acylation

| Field | Value |
|-------|-------|
| **id** | `MOD-005` |
| **name** | N-Acylation |
| **modification_type** | Backbone |
| **chemical_structure** | Addition of acyl chain (e.g., palmitoyl, myristoyl) to N-terminus or ε-amino of Lys |
| **target_residues** | N-terminal amine, Lysine side chain |
| **effect_on_stability** | Increases lipophilicity; promotes membrane association |
| **effect_on_bioavailability** | Improved via lipid-mediated transport |
| **effect_on_half_life** | Extended through albumin binding (especially C16 palmitoyl) |
| **examples** | Liraglutide (palmitoyl C16), Semaglutide |
| **category** | Backbone Modifications |

---

## Side Chain Modifications

### 6. Phosphorylation

| Field | Value |
|-------|-------|
| **id** | `MOD-006` |
| **name** | Phosphorylation (Ser/Thr/Tyr) |
| **modification_type** | Side Chain |
| **chemical_structure** | Addition of PO₃²⁻ to hydroxyl group of Ser, Thr, or Tyr |
| **target_residues** | Serine, Threonine, Tyrosine |
| **effect_on_stability** | Dynamic modification; regulates protein-protein interactions |
| **effect_on_bioavailability** | Adds negative charge; reduces membrane permeability |
| **effect_on_half_life** | Transient; regulated by phosphatases (seconds to minutes) |
| **examples** | MAPK pathway peptides, insulin receptor substrates |
| **category** | Side Chain Modifications |

### 7. Glycosylation

| Field | Value |
|-------|-------|
| **id** | `MOD-007` |
| **name** | Glycosylation (N-linked / O-linked) |
| **modification_type** | Side Chain |
| **chemical_structure** | N-linked: GlcNAc to Asn (N-X-S/T sequon). O-linked: GalNAc to Ser/Thr |
| **target_residues** | N-linked: Asparagine. O-linked: Serine, Threonine |
| **effect_on_stability** | Increased solubility; protection from proteolysis; proper folding |
| **effect_on_bioavailability** | Improved aqueous solubility; reduced aggregation |
| **effect_on_half_life** | Extended via shielding and reduced renal clearance |
| **examples** | EPO, monoclonal antibodies, mucin-type glycopeptides |
| **category** | Side Chain Modifications |

### 8. Methylation (Lys/Arg)

| Field | Value |
|-------|-------|
| **id** | `MOD-008` |
| **name** | Methylation (Lys/Arg) |
| **modification_type** | Side Chain |
| **chemical_structure** | Addition of 1–3 methyl groups to ε-amino of Lys or guanidinium of Arg |
| **target_residues** | Lysine (mono/di/trimethyl), Arginine (mono/dimethyl) |
| **effect_on_stability** | Modulates protein-protein interactions; epigenetic regulation |
| **effect_on_bioavailability** | Minimal direct effect |
| **effect_on_half_life** | Stable modification; not readily reversed |
| **examples** | Histone H3K4me3, H3K27me3, H4R3me2 |
| **category** | Side Chain Modifications |

### 9. Acetylation (Lys)

| Field | Value |
|-------|-------|
| **id** | `MOD-009` |
| **name** | Acetylation (Lysine) |
| **modification_type** | Side Chain |
| **chemical_structure** | Addition of acetyl group (COCH₃) to ε-amino of Lys |
| **target_residues** | Lysine |
| **effect_on_stability** | Neutralizes positive charge; reduces ionic interactions |
| **effect_on_bioavailability** | Altered binding properties |
| **effect_on_half_life** | Regulated by HDACs; reversible on timescale of hours |
| **examples** | Histone H3K9ac, H3K27ac, p53 acetylation |
| **category** | Side Chain Modifications |

### 10. Ubiquitination (Lys)

| Field | Value |
|-------|-------|
| **id** | `MOD-010` |
| **name** | Ubiquitination (Lysine) |
| **modification_type** | Side Chain |
| **chemical_structure** | Covalent attachment of 76-amino acid ubiquitin via isopeptide bond to Lys ε-amino |
| **target_residues** | Lysine (also N-terminal, Ser, Thr, Cys in some cases) |
| **effect_on_stability** | Targets protein for proteasomal degradation (K48-linked); alters signaling (K63-linked) |
| **effect_on_bioavailability** | N/A (intracellular regulatory modification) |
| **effect_on_half_life** | Dramatically shortened (minutes to hours) for K48 polyubiquitin chains |
| **examples** | p53 ubiquitination by MDM2, IκBα degradation |
| **category** | Side Chain Modifications |

---

## Terminal Modifications

### 11. N-Terminal Acetylation

| Field | Value |
|-------|-------|
| **id** | `MOD-011` |
| **name** | N-Terminal Acetylation |
| **modification_type** | Terminal |
| **chemical_structure** | Addition of acetyl group (COCH₃) to α-amino group at N-terminus |
| **target_residues** | N-terminal amino acid (most commonly Met, Ala, Ser, Thr, Val) |
| **effect_on_stability** | Blocks exopeptidase cleavage; stabilizes against aminopeptidases |
| **effect_on_bioavailability** | Slightly increased lipophilicity |
| **effect_on_half_life** | Extended 2–4x by blocking N-terminal degradation |
| **examples** | ACTH, α-MSH, ~80% of human proteins |
| **category** | Terminal Modifications |

### 12. C-Terminal Amidation

| Field | Value |
|-------|-------|
| **id** | `MOD-012` |
| **name** | C-Terminal Amidation |
| **modification_type** | Terminal |
| **chemical_structure** | Conversion of C-terminal carboxylate (COOH) to carboxamide (CONH₂) |
| **target_residues** | C-terminal amino acid |
| **effect_on_stability** | Blocks carboxypeptidase cleavage; removes negative charge |
| **effect_on_bioavailability** | Improved receptor binding due to charge neutralization |
| **effect_on_half_life** | Extended 2–5x by blocking C-terminal degradation |
| **examples** | Oxytocin, vasopressin, calcitonin, α-MSH |
| **category** | Terminal Modifications |

### 13. N-Terminal PEGylation

| Field | Value |
|-------|-------|
| **id** | `MOD-013` |
| **name** | N-Terminal PEGylation |
| **modification_type** | Terminal |
| **chemical_structure** | Conjugation of polyethylene glycol (PEG, 2–40 kDa) to N-terminal amine |
| **target_residues** | N-terminal amino group |
| **effect_on_stability** | Increased hydrodynamic radius; reduced protease access |
| **effect_on_bioavailability** | Reduced immunogenicity; increased aqueous solubility |
| **effect_on_half_life** | Extended 10–100x via reduced renal filtration and proteolysis |
| **examples** | PEG-interferon alfa-2a (40 kDa PEG), PEG-filgrastim |
| **category** | Terminal Modifications |

### 14. C-Terminal PEGylation

| Field | Value |
|-------|-------|
| **id** | `MOD-014` |
| **name** | C-Terminal PEGylation |
| **modification_type** | Terminal |
| **chemical_structure** | Conjugation of PEG to C-terminal carboxyl or engineered Cys |
| **target_residues** | C-terminal amino acid, engineered C-terminal Cys |
| **effect_on_stability** | Increased hydrodynamic radius; reduced protease access |
| **effect_on_bioavailability** | Reduced immunogenicity; site-specific conjugation reduces heterogeneity |
| **effect_on_half_life** | Extended 10–100x; may preserve N-terminal receptor binding |
| **examples** | C-terminally PEGylated exenatide analogs |
| **category** | Terminal Modifications |

### 15. N-Terminal Pyroglutamate

| Field | Value |
|-------|-------|
| **id** | `MOD-015` |
| **name** | N-Terminal Pyroglutamate |
| **modification_type** | Terminal |
| **chemical_structure** | Cyclization of N-terminal Glu or Gln to form 5-oxoproline (pyroglutamate, pGlu) |
| **target_residues** | N-terminal Glutamate or Glutamine |
| **effect_on_stability** | Blocks aminopeptidase cleavage; protects N-terminus |
| **effect_on_bioavailability** | Neutral charge at N-terminus; compact structure |
| **effect_on_half_life** | Extended 3–10x against aminopeptidases |
| **examples** | TRH (thyrotropin-releasing hormone), GnRH, Bacteriorhodopsin fragments |
| **category** | Terminal Modifications |

---

## Cyclization Modifications

### 16. Head-to-Tail Cyclization

| Field | Value |
|-------|-------|
| **id** | `MOD-016` |
| **name** | Head-to-Tail Cyclization |
| **modification_type** | Cyclization |
| **chemical_structure** | Amide bond between N-terminal amino and C-terminal carboxyl (macrolactam) |
| **target_residues** | N-terminus to C-terminus |
| **effect_on_stability** | Conformational restriction; protease resistance; reduced entropy |
| **effect_on_bioavailability** | Improved metabolic stability; constrained receptor binding |
| **effect_on_half_life** | Extended 5–20x |
| **examples** | Cyclosporine A, melanotan II, cyclo-RGD peptides |
| **category** | Cyclization Modifications |

### 17. Side Chain Cyclization (Disulfide)

| Field | Value |
|-------|-------|
| **id** | `MOD-017` |
| **name** | Side Chain Cyclization (Disulfide) |
| **modification_type** | Cyclization |
| **chemical_structure** | S-S bond between two Cys thiol groups (−CH₂−S−S−CH₂−) |
| **target_residues** | Cysteine–Cysteine pairs |
| **effect_on_stability** | Stabilizes tertiary structure; reversible redox switch |
| **effect_on_bioavailability** | Constrained conformation improves receptor selectivity |
| **effect_on_half_life** | Extended 2–10x; can be reduced intracellularly |
| **examples** | Insulin (3 disulfide bonds), oxytocin, vasopressin, conotoxins |
| **category** | Cyclization Modifications |

### 18. Side Chain Cyclization (Lactam)

| Field | Value |
|-------|-------|
| **id** | `MOD-018` |
| **name** | Side Chain Cyclization (Lactam) |
| **modification_type** | Cyclization |
| **chemical_structure** | Amide bond between Lys ε-amino and Asp/Glu γ/β-carboxyl (side chain lactam bridge) |
| **target_residues** | Lysine–Aspartate or Lysine–Glutamate pairs |
| **effect_on_stability** | Stabilizes α-helical conformation; irreversible under physiological conditions |
| **effect_on_bioavailability** | Improved helix stability enhances receptor binding |
| **effect_on_half_life** | Extended 3–15x; redox-stable alternative to disulfide |
| **examples** | Lactam-bridged GLP-1 analogs, helical CRF antagonists |
| **category** | Cyclization Modifications |

### 19. Hydrocarbon Stapling

| Field | Value |
|-------|-------|
| **id** | `MOD-019` |
| **name** | Hydrocarbon Stapling |
| **modification_type** | Cyclization |
| **chemical_structure** | Olefin metathesis cross-link between two α-methylated amino acids bearing allyl groups (i, i+4 or i, i+7 spacing) |
| **target_residues** | Non-natural amino acids at positions i and i+4 or i+7 |
| **effect_on_stability** | Stabilizes α-helix; protease resistant; cell permeable |
| **effect_on_bioavailability** | Dramatically improved cell penetration and oral exposure |
| **effect_on_half_life** | Extended 10–50x; resistant to proteolytic degradation |
| **examples** | ALRN-6924 (stapled p53 peptide), ATSP-7041 (MDM2/MDMX inhibitor) |
| **category** | Cyclization Modifications |

### 20. Triazole Stapling (Click Chemistry)

| Field | Value |
|-------|-------|
| **id** | `MOD-020` |
| **name** | Triazole Stapling (Click Chemistry) |
| **modification_type** | Cyclization |
| **chemical_structure** | 1,2,3-triazole ring formed by Cu(I)-catalyzed azide-alkyne cycloaddition (CuAAC) between side chains |
| **target_residues** | Azide-bearing and alkyne-bearing non-natural amino acids |
| **effect_on_stability** | Rigid cross-link; bioorthogonal; protease resistant; mimics amide bond geometry |
| **effect_on_bioavailability** | Improved stability; triazole is metabolically stable |
| **effect_on_half_life** | Extended 5–20x; resistant to hydrolysis and enzymatic cleavage |
| **examples** | Triazole-bridged antimicrobial peptides, BH3 mimetics |
| **category** | Cyclization Modifications |

---

## Modification Summary Table

| ID | Name | Category | Primary Benefit | Half-Life Extension |
|----|------|----------|-----------------|---------------------|
| MOD-001 | N-Methylation | Backbone | Protease resistance | 2–5x |
| MOD-002 | Beta-Amino Acids | Backbone | Protease resistance | Hours–days |
| MOD-003 | D-Amino Acid Substitution | Backbone | Protease resistance | 5–10x |
| MOD-004 | Alpha-Methylation | Backbone | Conformational restriction | 3–8x |
| MOD-005 | N-Acylation | Backbone | Lipophilicity / albumin binding | Extended |
| MOD-006 | Phosphorylation | Side Chain | Signaling regulation | Transient |
| MOD-007 | Glycosylation | Side Chain | Stability / solubility | Extended |
| MOD-008 | Methylation (Lys/Arg) | Side Chain | Epigenetic regulation | Stable |
| MOD-009 | Acetylation (Lys) | Side Chain | Charge neutralization | Hours |
| MOD-010 | Ubiquitination (Lys) | Side Chain | Degradation signal | Minutes–hours |
| MOD-011 | N-Terminal Acetylation | Terminal | N-terminal stability | 2–4x |
| MOD-012 | C-Terminal Amidation | Terminal | C-terminal stability | 2–5x |
| MOD-013 | N-Terminal PEGylation | Terminal | Half-life extension | 10–100x |
| MOD-014 | C-Terminal PEGylation | Terminal | Half-life extension | 10–100x |
| MOD-015 | N-Terminal Pyroglutamate | Terminal | Aminopeptidase resistance | 3–10x |
| MOD-016 | Head-to-Tail Cyclization | Cyclization | Conformational restriction | 5–20x |
| MOD-017 | Disulfide Cyclization | Cyclization | Structural stability | 2–10x |
| MOD-018 | Lactam Cyclization | Cyclization | Helix stabilization | 3–15x |
| MOD-019 | Hydrocarbon Stapling | Cyclization | Helix stabilization / cell permeability | 10–50x |
| MOD-020 | Triazole Stapling | Cyclization | Bioorthogonal stability | 5–20x |
