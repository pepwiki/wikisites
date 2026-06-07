---
title: "Peptide Fragmentation in Mass Spectrometry"
description: "Understanding b/y ion series, CID fragmentation mechanisms, and de novo sequencing principles is essential for peptide identification in proteomics experiments."
status: "published"
author: "Wikipept Community"
pubDate: 2026-06-07
tags: ["mass spectrometry", "fragmentation", "b-ions", "y-ions", "CID", "de novo sequencing"]
category: "Chemistry"
difficulty: "advanced"
relatedArticles: ["nmr-peptides", "peptide-protein-interactions", "peptide-dipole"]
---

## How Peptides Fragment

When peptides are analyzed by tandem mass spectrometry (MS/MS), they are fragmented to produce a series of smaller ions. The most common fragmentation method is collision-induced dissociation (CID), where the peptide ion collides with an inert gas like helium or nitrogen. These collisions convert kinetic energy into internal energy, causing the peptide backbone to break.

The backbone of a peptide contains several bond types, but CID preferentially cleaves the amide bond (the peptide bond) between adjacent residues. This produces two complementary series of fragment ions.

## The b and y Ion Series

Fragment ions are named based on which end of the peptide they retain:

- **b-ions**: Fragments containing the N-terminus. The charge remains on the N-terminal piece.
- **y-ions**: Fragments containing the C-terminus. The charge remains on the C-terminal piece.

The naming follows the Roepstorff and Biemann convention. A b1 ion contains the first amino acid from the N-terminus. A b2 ion contains the first two amino acids, and so on. Similarly, y1 contains the C-terminal residue, y2 contains the last two, and so forth.

The mass difference between consecutive b-ions (or consecutive y-ions) reveals the identity of the intervening amino acid. For example, if the mass difference between b3 and b4 is 113 Da, the fourth residue is asparagine.

## Other Ion Types

CID also produces a ions (loss of CO from b ions) and c/z ions from alternative fragmentation pathways. Electron transfer dissociation (ETD) and electron capture dissociation (ECD) preferentially produce c and z ions, which are useful for analyzing post-translational modifications because they fragment the N-Calpha bond rather than the peptide bond.

## Mnemonic: "bN = N-terminus, yC = C-terminus"

Remember: **"b starts from the Beginning (N-terminus), y goes to the end like Yes (C-terminus)."** This helps you assign peaks in a spectrum quickly.

## De Novo Sequencing

De novo sequencing reconstructs a peptide sequence directly from the MS/MS spectrum without a database. You look for complementary ion pairs (b and y ions that sum to the precursor mass plus a proton) and read the amino acid sequence from the mass differences. Software tools like PEAKS and NovoHMM automate this process.

## Practical Tip

When analyzing spectra manually, always check for complementary b/y pairs. If you identify a b5 ion at 547 Da and a y4 ion at 435 Da, their sum (982 Da) should equal the precursor mass plus one proton. This confirmation increases confidence in your sequence assignment.
