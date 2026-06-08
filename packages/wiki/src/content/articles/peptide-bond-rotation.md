---
title: "Peptide Bond Rotation"
description: "Peptide bond rotation is restricted due to partial double-bond character, limiting conformational freedom. This article explains phi and psi angles, the Ramachandran plot, and allowed backbone conformations."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["peptide-bond", "phi-psi-angles", "ramachandran-plot", "protein-structure"]
category: "Chemistry"
difficulty: "advanced"
relatedArticles: ["peptide-bond-hydrolysis", "protein-folding-thermodynamics"]
---

## The Nature of Rotation Around Peptide Bonds

A peptide bond has significant partial double-bond character due to resonance between the carbonyl oxygen and the amide nitrogen. This restricts rotation around the C-N bond, making the peptide unit essentially planar. The six atoms involved in the peptide group -- the alpha-carbon of residue i, the carbonyl carbon and oxygen, the amide nitrogen and hydrogen, and the alpha-carbon of residue i+1 -- all lie in the same plane.

This planarity was first demonstrated by Linus Pauling and Robert Corey in 1951, and it is a foundational constraint in protein structure.

## Phi and Psi Angles

While the peptide bond itself cannot rotate freely, the bonds flanking it can. These rotations are described by two dihedral angles:

- **Phi (phi):** Rotation around the N-Calpha bond. Phi equals the angle between the C-N-Calpha-C vector.
- **Psi (psi):** Rotation around the Calpha-C bond. Psi equals the angle between the N-Calpha-C-N vector.

**Mnemonic:** Remember "Phi follows N" and "Psi precedes C" to keep the angles straight. Phi is the angle on the nitrogen side of the alpha-carbon; psi is on the carbonyl side.

Both phi and psi range from negative 180 degrees to positive 180 degrees. The omega angle (rotation around the peptide bond itself) is typically fixed near 180 degrees (trans) or occasionally 0 degrees (cis, mainly with proline).

## The Ramachandran Plot

The Ramachandran plot, developed by G.N. Ramachandran in 1963, maps all possible combinations of phi and psi angles on a two-dimensional graph. Regions of the plot are classified as:

- **Fully allowed:** No steric clashes between backbone or side chain atoms.
- **Additionally allowed:** Minor steric strain but still accessible.
- **Disallowed:** Severe steric overlap, energetically forbidden.

Key allowed regions correspond to common secondary structures:

| Region      | Phi (approx) | Psi (approx) | Structure                      |
| ----------- | ------------ | ------------ | ------------------------------ |
| Upper left  | -120         | +120         | Beta-sheet                     |
| Lower left  | -60          | -45          | Right-handed alpha-helix       |
| Upper right | -60          | +150         | Left-handed alpha-helix (rare) |

Glycine, lacking a side chain, has a much broader allowed region. Proline, with its cyclic side chain, is severely restricted.

## Practical Significance

Ramachandran plot analysis is a standard quality check in protein crystallography and cryo-EM. Structures with a high percentage of residues in disallowed regions may indicate modeling errors. Understanding these constraints is also essential for de novo protein design and molecular dynamics simulations.
