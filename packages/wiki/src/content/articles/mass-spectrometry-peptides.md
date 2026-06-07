---
title: "Mass Spectrometry for Peptides"
description: "Master MALDI-TOF and ESI-MS techniques for peptide analysis, including peptide fingerprinting, de novo sequencing, and practical interpretation of mass spectra."
status: "published"
author: "Wikipept Community"
pubDate: 2025-12-15
tags: ["mass spectrometry", "MALDI-TOF", "ESI-MS", "peptide fingerprinting", "de novo sequencing"]
category: "Chemistry"
difficulty: "advanced"
relatedArticles: ["peptide-synthesis-methods", "hplc-purification", "ion-channels-peptides"]
---

# Mass Spectrometry for Peptides

## Why Mass Spectrometry for Peptides?

Mass spectrometry (MS) is the most powerful technique for peptide characterization. It provides exact molecular weight, sequence information, and post-translational modification mapping. Modern peptide research depends on MS for quality control, identification, and discovery.

## MALDI-TOF Mass Spectrometry

Matrix-Assisted Laser Desorption/Ionization-Time of Flight (MALDI-TOF) is ideal for rapid molecular weight determination.

**How it works:**
1. The peptide sample is co-crystallized with a UV-absorbing matrix (such as alpha-cyano-4-hydroxycinnamic acid)
2. A laser pulse desorbs and ionizes the sample
3. Ions fly through a vacuum tube; lighter ions arrive faster
4. The time-of-flight is converted to mass-to-charge ratio

**Advantages:** Tolerant of contaminants, fast acquisition, excellent for intact molecular weight measurement. Typical accuracy is 0.1% for peptides.

**Limitations:** Limited sequence information from intact mass alone. Tandem MS (MS/MS) is needed for structural detail.

**Mnemonic:** Remember "MALDI likes intact" for quick recall of when to use this technique. It excels at measuring the mass of the whole peptide, not fragments.

## Electrospray Ionization Mass Spectrometry (ESI-MS)

ESI-MS generates multiply charged ions from solution, making it ideal for coupling with liquid chromatography.

**How it works:**
1. The sample flows through a narrow capillary at high voltage
2. Charged droplets form and evaporate
3. Ions are released into the gas phase
4. The mass spectrometer detects multiply charged species

**Advantages:** Soft ionization preserves labile modifications, excellent for LC-MS coupling, provides charge state distribution for molecular weight calculation.

**Limitations:** More sensitive to salt contamination than MALDI, requires sample purification.

## Peptide Fingerprinting

Peptide mass fingerprinting (PMF) identifies proteins by comparing observed peptide masses to predicted masses from protein databases.

**Process:**
1. Digest the protein with a specific protease (typically trypsin)
2. Measure all peptide masses by MALDI-TOF
3. Search protein databases for matches
4. A statistically significant match confirms identity

This technique works best for well-characterized proteins with known sequences.

## De Novo Sequencing

When no database match exists, de novo sequencing determines the peptide sequence directly from MS/MS spectra.

**Approach:**
1. Fragment the peptide using collision-induced dissociation (CID) or electron transfer dissociation (ETD)
2. Read the mass differences between consecutive fragment ions
3. Each 14 Da difference corresponds to one CH2 group (alanine vs. glycine)
4. Reconstruct the sequence from overlapping fragment series (b-ions and y-ions)

**Mnemonic:** Remember "BY-sequence" for MS/MS interpretation: **B**-ions read the sequence from N-terminus, **Y**-ions read from C-terminus. Together they provide complete coverage.

## Practical Interpretation Tips

- Always check for sodium adducts (M+23) and potassium adducts (M+39) which can confuse molecular weight assignment
- Look for multiply charged peaks ([M+2H]2+, [M+3H]3+) in ESI spectra
- Isotope patterns confirm molecular composition; monoisotopic peaks are most accurate for peptides under 2000 Da
- Matrix clusters in MALDI can obscure low-mass signals below 500 Da

## Key Takeaways

- MALDI-TOF provides rapid, accurate intact molecular weights for peptides
- ESI-MS enables online LC-MS coupling and provides charge state information
- Peptide mass fingerprinting identifies proteins by matching digest patterns to databases
- De novo sequencing reads peptide sequences directly from MS/MS fragment patterns
