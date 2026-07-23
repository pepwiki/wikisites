---
date: 2026-06-08
author: "Wikipept Contributors"
title: "Solid-Phase Synthesis — Peptide Manufacturing Methods"
description: "Advanced guide to solid-phase peptide synthesis (SPPS), including Fmoc strategy, coupling reagents, resin selection, and purification for difficult sequences."
---

## Introduction

Solid-phase peptide synthesis (SPPS) is the standard method for laboratory-scale peptide synthesis. Developed by Bruce Merrifield in the 1960s (Nobel Prize, 1984), SPPS allows efficient assembly of peptide chains on an insoluble polymer support.

## Fmoc Strategy

The **Fmoc (9-fluorenylmethyloxycarbonyl)** strategy is the most widely used approach in modern SPPS. It employs base-labile Fmoc protection for the alpha-amino group and acid-labile side chain protecting groups.

**Fmoc deprotection** uses 20% piperidine in DMF via beta-elimination (5-20 minutes). Monitoring is done by UV absorbance at 301 nm. Advantages include mild deprotection conditions, compatibility with acid-labile side chain protection, and compatibility with automated synthesizers.

## Coupling Reagents

Efficient amide bond formation requires activating reagents. Modern coupling reagents overcome the low reactivity of carboxylic acids toward amines.

| Reagent | Type | Key Features |
|---------|------|--------------|
| HBTU | Uronium | Most commonly used, fast coupling, low racemization |
| HATU | Uronium | Most powerful, extremely fast, used for difficult couplings |
| DIC | Carbodiimide | Water-soluble, easier byproduct removal |
| PyBOP | Phosphonium | Good for sterically hindered amino acids |

Additives like **HOBt** and **HOAt** prevent racemization and accelerate coupling. **Oxyma Pure** is a newer non-explosive alternative.

## Protecting Groups

The Fmoc strategy provides **orthogonal protection**: Fmoc is removed by base (piperidine), while side chain groups are removed by acid (TFA). Common protecting groups include OtBu for Asp/Glu, Boc for Lys/Trp, Pbf for Arg, Trt for Cys/His/Asn/Gln, and tBu for Ser/Thr.

## Resin Types

| Resin | C-Terminal | Application |
|-------|------------|-------------|
| Wang Resin | Free acid | Standard SPPS |
| Rink Amide Resin | Amide | Peptide amides |
| 2-Chlorotrityl | Free acid or ester | Fragments, sensitive sequences |

## Synthesis Cycle

1. **Deprotection:** 20% piperidine in DMF, 2 x 5 minutes
2. **Washing:** DMF (5 x 30 seconds)
3. **Activation:** Amino acid (5 equiv), HBTU/HATU (4.5 equiv), DIPEA (10 equiv)
4. **Coupling:** 15-60 minutes, monitor by Kaiser test
5. **Washing:** DMF (5 x 30 seconds)
6. **Repeat** from step 1 for next amino acid

## Cleavage and Deprotection

Standard cleavage uses **TFA (95%)** with TIS (2.5%) and water (2.5%) as scavengers. The mechanism involves protonation of the linker, cleavage from resin, removal of acid-labile protecting groups, and scavenging of carbocations. Mild cleavage (1% TFA in DCM) is available for 2-chlorotrityl resin. High-purity Fmoc-amino acids and coupling reagents for SPPS are available [here](https://kingstonpeptides.com).

> **See also:** [Peptide Scale-Up](/learn/peptide-scale-up/) for transitioning from lab to production scale and [SPPS Protocol](/learn/spps-protocol/) for detailed synthesis procedures.