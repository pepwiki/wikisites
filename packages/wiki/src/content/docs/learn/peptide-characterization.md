---
title: "Peptide Characterization — Analytical Identification"
description: "Comprehensive guide to peptide characterization techniques including mass spectrometry, NMR, CD spectroscopy, HPLC, and bioanalytical methods for structure confirmation."
---

# Peptide Characterization

Thorough characterization of synthetic peptides is essential for confirming identity, assessing purity, and establishing structure-activity relationships. This guide covers analytical methods and quality specifications.

## Characterization Workflow

### Discovery Phase

| Test | Purpose | Method | Acceptance |
|------|---------|--------|------------|
| Mass confirmation | Verify synthesis | ESI-MS or MALDI | MW ±2 Da |
| Purity assessment | Quantify impurities | RP-HPLC | ≥90% |
| Solubility check | Formulation guidance | Visual inspection | Clear solution |

### Development Phase

| Test | Purpose | Method | Acceptance |
|------|---------|--------|------------|
| Sequence verification | Confirm sequence | MS/MS, Edman | Complete coverage |
| Secondary structure | Confirm folding | CD spectroscopy | Expected pattern |
| Aggregation state | Assess oligomerization | SEC-HPLC | Monomer >90% |
| Charge variants | Quantify variants | IEX-HPLC | Single major peak |

### GMP Phase

| Test | Purpose | Method | Acceptance |
|------|---------|--------|------------|
| Identity | Definitive confirmation | MS + amino acid analysis | Match theory |
| Purity | Regulatory compliance | RP-HPLC | ≥95% (≥98% for drugs) |
| Impurity profiling | Safety assessment | LC-MS/MS | Individual <0.5% |
| Potency | Biological activity | Cell-based assay | ≥80% of reference |
| Endotoxin | Safety | LAL assay | <5 EU/kg dose |
| Sterility | Safety | USP <71> | Pass |
| Water content | Stability | Karl Fischer | ≤10% (lyophilized) |

## Mass Spectrometry Methods

### ESI-MS (Electrospray Ionization)

| Parameter | Typical Conditions |
|-----------|-------------------|
| Charge states | [M+2H]²⁺ to [M+10H]¹⁰⁺ |
| Deconvolution | MaxEnt or ZSCORE |
| Accuracy | <5 ppm (high-res) |
| Sensitivity | fmol–pmol |
| Best for | Peptides <30 kDa |

### MALDI-TOF MS

| Parameter | Typical Conditions |
|-----------|-------------------|
| Matrix | CHCA (α-cyano-4-hydroxycinnamic acid) |
| Ionization | [M+H]⁺ (singly charged) |
| Accuracy | 0.01–0.1% |
| Sample amount | 1 pmol on target |
| Best for | Rapid mass check, large peptides |

### MS/MS Sequencing

| Fragment Ion | Terminus | Use |
|--------------|---------|-----|
| b-ions | N-terminal | Sequence from N-terminus |
| y-ions | C-terminal | Sequence from C-terminus |
| a-ions | N-terminal | Backbone cleavage |
| Internal | Middle | Confirm internal sequence |

## HPLC Methods

### RP-HPLC (Purity Analysis)

| Parameter | Analytical | Preparative |
|-----------|------------|-------------|
| Column | C18, 5 μm, 100 Å | C18, 10 μm, 300 Å |
| Column size | 4.6 × 250 mm | 21.2 × 250 mm |
| Flow rate | 1.0 mL/min | 10–20 mL/min |
| Gradient | 5–95% B over 30 min | 5–95% B over 60 min |
| Detection | UV 214 nm | UV 214 nm |
| Injection | 10–100 μg | 10–100 mg |

### IEX-HPLC (Charge Variants)

| Parameter | Strong Cation Exchange | Strong Anion Exchange |
|-----------|------------------------|----------------------|
| Column | SP or SCX | Q or SAX |
| Mobile phase A | 10 mM phosphate, pH 6.0 | 10 mM Tris, pH 8.0 |
| Mobile phase B | 1 M NaCl gradient | 1 M NaCl gradient |
| Application | Basic variants | Acidic variants |

### SEC-HPLC (Aggregation)

| Parameter | Typical Conditions |
|-----------|-------------------|
| Column | Silica or polymer, 300 Å |
| Mobile phase | PBS + 0.1 M NaCl |
| Flow rate | 0.5–1.0 mL/min |
| Detection | UV 214 nm + MALS |
| Calibration | MW standards |

## Circular Dichroism

### Far-UV CD (190–250 nm)

| Structure | Signature | Wavelengths |
|-----------|-----------|-------------|
| α-helix | Two minima | 208, 222 nm |
| β-sheet | One minimum | 218 nm |
| Random coil | One minimum | 198 nm |
| β-turn | Variable | 200–220 nm |

### Sample Requirements

- Concentration: 0.1–0.5 mg/mL
- Path length: 0.1–1.0 mm
- Buffer: Low UV-absorbing (phosphate, borate)
- Volume: 300–500 μL

## Amino Acid Analysis

### Hydrolysis Methods

| Method | Temperature | Duration | Susceptible AA |
|--------|-------------|----------|----------------|
| Acid hydrolysis (6M HCl) | 110°C | 24 hrs | Trp destroyed, Asn→Asp, Gln→Glu |
| Alkaline hydrolysis (4M NaOH) | 110°C | 24 hrs | All except Trp |
| Enzymatic | 37°C | 24 hrs | Preserves all AA |
| Performic acid | 0°C | 15 min | Cys→CysA, Met→MetO₂ |

### Detection Methods

| Method | Sensitivity | Application |
|--------|-------------|-------------|
| Ninhydrin | 100 pmol | Classical, universal |
| OPA | 1 pmol | Primary amines only |
| AccQ-Tag (Waters) | 100 fmol | HPLC with fluorescence |
| PTC-AA | 10 pmol | Automated (Applied Biosystems) |

## Quality Control Specifications

### Research Grade

| Test | Method | Specification |
|------|--------|---------------|
| Identity | ESI-MS or MALDI | MW ±2 Da |
| Purity | RP-HPLC | ≥90% |
| Content | AAA | 90–110% |
| Appearance | Visual | White to off-white powder |

### GMP Grade

| Test | Method | Specification |
|------|--------|---------------|
| Identity | MS + AAA | Confirmed |
| Purity | RP-HPLC | ≥95% (≥98% for drugs) |
| Impurities | LC-MS/MS | Individual <0.5%, total <2% |
| Content | AAA | 95–105% |
| Water | Karl Fischer | ≤5% (or per spec) |
| Counter-ion | Ion chromatography | Within spec |
| Endotoxin | LAL | <0.5 EU/mg |
| Sterility | USP <71> | Pass |

## Troubleshooting

| Observation | Likely Cause | Action |
|-------------|--------------|--------|
| Multiple peaks in HPLC | Incomplete synthesis, side reactions | Optimize synthesis, check protecting groups |
| Mass +16 Da | Oxidation (Met, Cys) | Use antioxidant, inert atmosphere |
| Mass +1 Da | Deamidation (Asn, Gln) | Check pH, temperature during synthesis |
| Broad SEC peak | Aggregation | Optimize buffer, add surfactant |
| Low AAA recovery | Incomplete hydrolysis | Extend hydrolysis time |

Analytical standards available from [Kingston Peptides](https://kingstonpeptides.com)

## Related Resources

- See [Analytical Methods](/reference/analytical-methods) for detailed method conditions
- Review [HPLC Purification](/learn/purification) for preparative scale methods
- Check [Mass Spectrometry](/learn/mass-spectrometry-peptides) for MS applications
- Use [Sequence Designer](/tools/sequence-designer) for sequence optimization
