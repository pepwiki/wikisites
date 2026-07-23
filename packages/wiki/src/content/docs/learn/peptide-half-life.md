---
date: 2026-07-21
author: "Wikipept Contributors"
title: "Peptide Half-Life Comparison — Duration of Action Data"
description: "Half-life data for therapeutic peptides — modification strategies including PEGylation and lipidation."
---

The half-life of a peptide determines its dosing frequency, therapeutic window, and clinical utility. Native peptides range from seconds (GLP-1, insulin) to hours (oxytocin), while engineered analogues achieve half-lives of days to weeks through structural modifications. Understanding what controls peptide half-life — and how to extend it — is fundamental to rational peptide drug design.

## Determinants of Peptide Half-Life

Three primary factors govern the in vivo persistence of a peptide:

### Proteolytic Stability

Endopeptidases and exopeptidases in blood plasma and tissues cleave peptide bonds at specific residue positions. Dipeptidyl peptidase IV (DPP-4) preferentially cleaves N-terminal dipeptides from peptides with alanine or proline at position two. Neprilysin targets hydrophobic residues at the P1 position. Carboxypeptidases remove C-terminal amino acids sequentially. Protease specificity determines which structural modifications most effectively extend half-life.

### Renal Clearance

Peptides below approximately 30 kDa are filtered by the glomerulus and partially reabsorbed by proximal tubular cells. Small linear peptides are cleared rapidly by the kidneys. Increasing hydrodynamic radius through PEGylation or albumin binding reduces glomerular filtration rate, slowing renal clearance.

### Receptor-Mediated Clearance

Some peptides are cleared through receptor-mediated endocytosis. Agonist binding can trigger receptor internalization and lysosomal degradation, removing the peptide from circulation. This pathway is particularly relevant for hormones like insulin and GLP-1, which undergo hepatic and renal receptor-mediated uptake.

## Half-Life Comparison Table

| Peptide | Half-Life | Class | Notes |
|---------|-----------|-------|-------|
| Insulin (regular) | 4–6 min | Hormone | Rapid hepatic clearance |
| GLP-1 (native) | 2–3 min | Hormone | DPP-4 degradation within minutes |
| Oxytocin | 3–5 min | Hormone | Rapid renal and enzymatic clearance |
| Vasopressin (ADH) | 10–20 min | Hormone | Renal clearance |
| Glucagon | 5–10 min | Hormone | Hepatic uptake |
| Amylin | 10–15 min | Hormone | Renal clearance, aggregation |
| Exenatide (Byetta) | 2.4 hr | GLP-1 RA | Exendin-4, DPP-4 resistant but renal clearance |
| Liraglutide | 13 hr | GLP-1 RA | Albumin binding via C-16 fatty acid |
| Semaglutide | 165 hr (~7 days) | GLP-1 RA | Albumin binding via C-18 diacid, Aib substitution |
| Dulaglutide | 144 hr (~6 days) | GLP-1 RA | Fc fusion protein, ~150 kDa |
| Albiglutide | 132 hr (~5.5 days) | GLP-1 RA | Albumin fusion, large hydrodynamic radius |
| Tirzepatide | 116 hr (~5 days) | Dual GIP/GLP-1 RA | Albumin binding via C-20 diacid |
| Atideglin | ~28 hr | GLP-1 RA | Unacylated GLP-1 analogue |
| Beinaglutide | 48–72 hr | GLP-1 RA | Albumin binding |
| Cagriintide | ~190 hr (~8 days) | Amylin analogue | Long-acting amylin analog |
| PEGylated exenatide | ~36 hr | GLP-1 RA | PEGylation approach |
| Teriparatide (PTH 1-34) | 1 hr | Hormone | Short half-life limits dosing |
| Calcitonin (salmon) | 60–70 min | Hormone | Renal clearance |
| BNP | 20 min | Hormone | Receptor-mediated clearance |
| ANP | 2–3 min | Hormone | Rapid receptor binding and clearance |
| Ghrelin | 27 min | Hormone | Enzymatic cleavage, renal |
| Substance P | 6–9 min | Neuropeptide | Enzymatic degradation |
| Enkephalins | 1–2 min | Neuropeptide | DPP-4, aminopeptidase N |
| β-Endorphin | 10–20 min | Neuropeptide | Enzymatic degradation, renal |
| Leptin | 45–90 min | Hormone | Renal clearance |

## Modification Strategies for Half-Life Extension

### PEGylation

**Mechanism**: Covalent attachment of polyethylene glycol (PEG) polymers to lysine residues or N/C-termini increases hydrodynamic radius, reducing renal glomerular filtration. PEG also shields the peptide surface from protease recognition.

**Example**: PEGylated exenatide (exenatide-ER / Bydureon) achieves a half-life of ~36 hours compared to 2.4 hours for native exenatide, enabling once-weekly dosing. PEG molecular weights of 5–40 kDa are typical, with larger PEGs providing longer half-life at the cost of reduced receptor binding.

**Trade-offs**: PEGylation can reduce receptor binding affinity through steric shielding. The "PEG dilemma" requires balancing half-life extension against potency reduction. Site-specific PEGylation at non-binding epitopes partially addresses this limitation.

### Fatty Acid Acylation

**Mechanism**: Attachment of fatty acid chains (typically C-12 to C-20) enables non-covalent binding to circulating albumin. The peptide circulates as a reversible albumin complex, reducing renal filtration and enzymatic degradation while maintaining access to target receptors.

**Examples**:
- Liraglutide: C-16 fatty acid via linker to Lys26 → half-life 13 hr (vs. 2 min native GLP-1)
- Semaglutide: C-18 fatty diacid via linker to Lys26, plus Aib substitution → half-life 165 hr
- Tirzepatide: C-20 eicosanedioic acid via linker to Lys20 → half-life 116 hr

**Advantages**: Fatty acid acylation preserves receptor binding better than PEGylation because the albumin binding occurs at a site distant from the receptor-binding epitope. The approach is particularly effective for incretin-based therapies.

### D-Amino Acid Substitution

**Mechanism**: Replacing L-amino acids with D-enantiomers at protease-susceptible sites confers resistance to endopeptidase recognition while maintaining receptor binding in many cases. D-amino acids are not recognized by stereospecific proteases that degrade L-peptides.

**Examples**:
- Desmopressin (dDAVP): D-Arg at position 8 of vasopressin extends half-life from 20 minutes to 4–5 hours
- Atosiban (oxytocin antagonist): D-Arg substitutions at positions 1 and 2
- Barusiban (oxytocin antagonist): D-amino acid substitutions at multiple positions

**Limitations**: D-amino acid incorporation can alter secondary structure and receptor selectivity. Not all positions tolerate stereochemical inversion, and computational prediction of compatible sites remains challenging.

### Cyclization

**Mechanism**: Head-to-tail or side-chain-to-side-chain cyclization eliminates terminal residues vulnerable to exopeptidase activity. Cyclization constrains conformational flexibility, reducing the entropy penalty upon receptor binding and potentially increasing affinity.

**Examples**:
- Somatostatin (14 aa, linear, t½ ~2 min) → octreotide (cyclized 8-mer via disulfide bond, t½ ~80 min)
- Cyclosporin A (cyclic undecapeptide, t½ ~6 hours, orally bioavailable)
- Linaclotide: 14-amino acid peptide with 3 disulfide bonds, cyclized structure

**Cyclization types**: Disulfide bridges (Cys-Cys), lactam bonds (Lys-Asp/Glu), triazole linkages (click chemistry), and stapled peptide approaches each offer different stability and synthetic accessibility profiles.

### Albumin Binding

**Mechanism**: Engineering the peptide to bind circulating albumin non-covalently extends half-life through the same principle as fatty acid acylation, but without requiring chemical conjugation. Designed albumin-binding domains or modifications to existing sequences create intrinsic albumin affinity.

**Examples**: Albumin fusion proteins (albiglutide, dulaglutide) covalently link the peptide to recombinant albumin or an Fc domain, creating large molecules (>50 kDa) that escape renal filtration entirely. Half-lives of 5–6 days are typical.

**Trade-offs**: Fusion proteins are expensive to manufacture and may elicit anti-drug antibodies. Non-covalent albumin-binding approaches (as in semaglutide) offer a simpler manufacturing route with comparable half-life extension.

## Design Considerations

Selecting the optimal half-life extension strategy depends on several factors:

- **Dosing frequency**: Once-weekly formulations are the clinical standard for chronic metabolic diseases. Once-daily formulations are acceptable for acute indications.
- **Receptor binding tolerance**: Some modifications (PEGylation, fusion) can impair receptor access. Fatty acid acylation and D-amino acid substitution tend to preserve binding.
- **Manufacturing complexity**: Chemical modifications (acylation, PEGylation) add synthetic steps. Fusion proteins require recombinant production.
- **Immunogenicity**: Large modifications may expose neoepitopes that trigger anti-drug antibody responses. PEGylated peptides may generate anti-PEG antibodies.
- **Route of administration**: Half-life requirements differ for subcutaneous, oral, nasal, and intravenous delivery.

The ideal half-life extension strategy achieves the target pharmacokinetic profile with minimal impact on pharmacodynamics, immunogenicity, and manufacturing cost.

## References

1. Lau J, et al. "Discovery of the once-weekly glucagon-like peptide-1 (GLP-1) analogue semaglutide." *J Med Chem* 2015;58:7370-7380.
2. Rosenstock J, et al. "Efficacy and safety of tirzepatide, a dual GIP/GLP-1 receptor agonist." *Lancet* 2021;398:143-155.
3. Bhatt DL, et al. "Peptide-based therapeutics: half-life considerations." *Nat Rev Drug Discov* 2023;22:875-894.
4. Di Marchi R, et al. "Design of insulin analogues for improved therapeutic profiles." *Biopolymers* 2018;110:e23264.
5. Frokjaer S, Otzen DE. "Protein drug stability: a formulation challenge." *Nat Rev Drug Discov* 2005;4:298-306.

> **See also:** [Peptide Stability Testing](/articles/peptide-stability-testing) for stability assessment methods and [Peptide Formulation](/learn/peptide-formulation/) for formulation strategies.
