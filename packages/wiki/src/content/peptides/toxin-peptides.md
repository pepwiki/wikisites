---
title: Toxin Peptides Database
description: Comprehensive database of toxin peptides and toxic molecules from various organisms including venom, plant, and microbial sources with sequences and mechanisms
---

# Toxin Peptides Database

A structured database of bioactive toxin peptides and toxic molecules from venomous and poisonous organisms.

---

## Peptide Toxins

### 1. α-Bungarotoxin

```yaml
id: alpha-bungarotoxin
name: α-Bungarotoxin
sequence: IVCHTTATSPISAVTCPPGENLCYKMWRCDWRPDCCRGNVCCKHWFGYCGPNGICGCP
length: 74 aa
molecular_weight: 7984 Da
source: Krait (Bungarus multicinctus)
target: Nicotinic acetylcholine receptor (nAChR)
mechanism: Irreversible competitive antagonist at postsynaptic nAChR
ld50: 0.03 mg/kg (mouse, IV)
potency: Extremely high
category: Neurotoxin (three-finger toxin)
```

α-Bungarotoxin is a postsynaptic neurotoxin isolated from the venom of the many-banded krait. It binds irreversibly to the α-subunit of the nicotinic acetylcholine receptor at the neuromuscular junction, preventing acetylcholine binding and causing flaccid paralysis. Widely used in neuroscience research to map nAChR distribution.

---

### 2. ω-Conotoxin MVIIA (Ziconotide)

```yaml
id: omega-conotoxin-mviia
name: ω-Conotoxin MVIIA
sequence: CKGKGAKCSRLMYDCCTGSCRSGKC
length: 25 aa
molecular_weight: 2639 Da
source: Cone snail (Conus magus)
target: Cav2.2 (N-type voltage-gated calcium channel)
mechanism: Reversible blocker of presynaptic N-type calcium channels
ld50: ~0.01 mg/kg (mouse, IV)
potency: Extremely high
category: Calcium channel blocker (ω-conotoxin)
```

ω-Conotoxin MVIIA is the active ingredient in Prialt (Ziconotide), an FDA-approved analgesic for severe chronic pain. It blocks N-type calcium channels in the dorsal horn of the spinal cord, inhibiting neurotransmitter release from pain-sensing neurons. One of the most potent known analgesic peptides.

---

### 3. ω-Conotoxin GVIA

```yaml
id: omega-conotoxin-gvia
name: ω-Conotoxin GVIA
sequence: CKSPGSSCSPTSYNCCRSCNPYTKRCYGK
length: 27 aa
molecular_weight: 3037 Da
source: Cone snail (Conus geographus)
target: Cav2.2 (N-type voltage-gated calcium channel)
mechanism: Highly potent irreversible blocker of N-type calcium channels
ld50: ~0.015 mg/kg (mouse, IV)
potency: Extremely high
category: Calcium channel blocker (ω-conotoxin)
```

ω-Conotoxin GVIA was one of the first ω-conotoxins characterized. It binds with very high affinity and near-irreversibly to N-type calcium channels, making it a valuable research tool for studying synaptic transmission and pain pathways.

---

### 4. μ-Conotoxin GIIIA

```yaml
id: mu-conotoxin-giiia
name: μ-Conotoxin GIIIA
sequence: RDCCTOOKKCSRRQDRGHYCARK
length: 22 aa
molecular_weight: 2270 Da
source: Cone snail (Conus geographus)
target: Nav1.4 (skeletal muscle sodium channel)
mechanism: Pore blocker of voltage-gated sodium channels
ld50: ~0.012 mg/kg (mouse, IV)
potency: Extremely high
category: Sodium channel blocker (μ-conotoxin)
```

μ-Conotoxin GIIIA selectively blocks skeletal muscle sodium channels (Nav1.4) by plugging the channel pore. Unlike tetrodotoxin, it can discriminate between different sodium channel isoforms, making it a valuable pharmacological tool for studying channel subtypes.

---

### 5. δ-Conotoxin

```yaml
id: delta-conotoxin
name: δ-Conotoxin
sequence: CKNLQSPECHQHSTDCCLGSCRSGKCQ (varies by species)
length: 31 aa (variable)
molecular_weight: ~3500 Da
source: Cone snail (Conus spp.)
target: Voltage-gated sodium channels (Nav)
mechanism: Delays sodium channel inactivation, causing persistent activation
ld50: ~0.05 mg/kg (mouse, IV)
potency: Very high
category: Sodium channel modulator (δ-conotoxin)
```

δ-Conotoxins slow or inhibit the inactivation of voltage-gated sodium channels, leading to persistent neuronal firing. They are excitatory toxins that cause hyperexcitability and convulsions. Multiple δ-conotoxin variants exist across Conus species.

---

### 6. α-Conotoxin GI

```yaml
id: alpha-conotoxin-gi
name: α-Conotoxin GI
sequence: ECCNPACGRHYSC
length: 13 aa
molecular_weight: 1491 Da
source: Cone snail (Conus geographus)
target: Muscle-type nAChR (α1β1δε)
mechanism: Competitive antagonist at nicotinic acetylcholine receptors
ld50: ~0.05 mg/kg (mouse, IV)
potency: Very high
category: nAChR antagonist (α-conotoxin)
```

α-Conotoxin GI is one of the smallest and best-characterized conotoxins. It binds to the acetylcholine binding site on muscle-type nicotinic receptors with high selectivity, serving as a template for developing nAChR-targeted therapeutics.

---

### 7. Chlorotoxin

```yaml
id: chlorotoxin
name: Chlorotoxin
sequence: MCMPCFTTDPHQMARKCDDCCGGKGGRCGPCYCPQ
length: 36 aa
molecular_weight: 4044 Da
source: Deathstalker scorpion (Leiurus quinquestriatus)
target: MMP-2 / ClC-3 chloride channels / Annexin A2
mechanism: Binds matrix metalloproteinase-2 and inhibits chloride channels on glioma cells
ld50: ~4.0 mg/kg (mouse, IV)
potency: Moderate (highly selective for cancer cells)
category: Anti-glioma peptide (scorpion toxin)
```

Chlorotoxin specifically binds to glioma cells and other tumors of neuroectodermal origin with minimal binding to normal brain tissue. It is being developed as a tumor-targeting agent (TM-601/Tozuleristide) for fluorescence-guided surgery and targeted drug delivery.

---

### 8. Charybdotoxin

```yaml
id: charybdotoxin
name: Charybdotoxin
sequence: TFINCAKTCKCSKGKCMNPKCRCYTS
length: 37 aa
molecular_weight: 4297 Da
source: Deathstalker scorpion (Leiurus quinquestriatus)
target: KCa1.1 (BK) and KCa3.1 (IK) calcium-activated potassium channels
mechanism: Pore-blocking toxin binding to the external vestibule of K+ channels
ld50: ~0.2 mg/kg (mouse, IV)
potency: High
category: Potassium channel blocker (scorpion toxin)
```

Charybdotoxin blocks intermediate and large conductance calcium-activated potassium channels. It has been instrumental in characterizing the physiological roles of these channels in smooth muscle contraction, immune cell activation, and neuronal excitability.

---

### 9. Apamin

```yaml
id: apamin
name: Apamin
sequence: CNCKAPETALCARRCQQH
length: 18 aa
molecular_weight: 2027 Da
source: Honey bee (Apis mellifera)
target: KCa2.x (SK) small conductance calcium-activated potassium channels
mechanism: Selective blocker of SK channels, preventing afterhyperpolarization
ld50: 4.0 mg/kg (mouse, IV)
potency: Moderate-High
category: Neurotoxin (bee venom)
```

Apamin is the smallest known neurotoxic peptide and the only known selective blocker of small conductance calcium-activated potassium (SK) channels. It crosses the blood-brain barrier and causes neuronal hyperexcitability, convulsions, and has been used extensively to study synaptic plasticity and learning.

---

### 10. Melittin

```yaml
id: melittin
name: Melittin
sequence: GIGAVLKVLTTGLPALISWIKRKRQQ
length: 26 aa
molecular_weight: 2846 Da
source: Honey bee (Apis mellifera)
target: Cell membranes (phospholipid bilayer)
mechanism: Membrane disruption via pore formation and lipid bilayer perturbation
ld50: 2.8 mg/kg (mouse, IV)
potency: High (broad cytolytic activity)
category: Cytolytic peptide (bee venom)
```

Melittin constitutes ~50% of dry bee venom weight. It is a powerful hemolytic peptide that disrupts lipid bilayers through pore formation and carpet-like mechanisms. It has antimicrobial, anti-inflammatory, and anticancer properties, and is being investigated as a drug delivery enhancer and anticancer agent.

---

### 11. Phospholipase A2 (Bee)

```yaml
id: bee-pla2
name: Phospholipase A2 (Api m 1)
sequence: 124 aa (mature enzyme)
length: 124 aa
molecular_weight: ~14,500 Da
source: Honey bee (Apis mellifera)
target: Phospholipids (sn-2 ester bond)
mechanism: Hydrolyzes the sn-2 ester bond of glycerophospholipids, releasing fatty acids and lysophospholipids
ld50: ~7.5 mg/kg (mouse, IV)
potency: Moderate (major allergen)
category: Enzyme toxin (bee venom)
```

Bee PLA2 is the major allergen in bee venom and a potent inflammatory enzyme. It hydrolyzes membrane phospholipids, generating lysophosphatidylcholine and arachidonic acid, which contribute to inflammation, pain, and cell lysis. It is one of the most abundant proteins in bee venom.

---

## Non-Peptide Toxins

### 12. Tetrodotoxin (TTX)

```yaml
id: tetrodotoxin
name: Tetrodotoxin
formula: C11H17N3O8
molecular_weight: 319.27 Da
source: Pufferfish (Tetraodontidae), blue-ringed octopus, newts, some crabs
target: Nav1.1–Nav1.9 (voltage-gated sodium channels)
mechanism: Pore blocker — binds to site 1 in the outer vestibule of sodium channels
ld50: 0.008 mg/kg (mouse, IV); ~2 mg/kg (human, oral)
potency: Extremely high (1000× more potent than cyanide)
category: Sodium channel blocker (non-peptide)
```

Tetrodotoxin is one of the most potent natural toxins known. It blocks sodium channels with extraordinary selectivity, preventing action potential propagation and causing paralysis and respiratory failure. There is no known antidote. Produced by symbiotic bacteria in TTX-bearing organisms.

---

### 13. Batrachotoxin

```yaml
id: batrachotoxin
name: Batrachotoxin
formula: C31H42N2O6
molecular_weight: 538.67 Da
source: Poison dart frogs (Phyllobates terribilis, P. aurotaenia), Pitohui birds
target: Nav (voltage-gated sodium channels)
mechanism: Activator — irreversibly shifts sodium channel activation to hyperpolarized potentials
ld50: 0.002 mg/kg (mouse, SC)
potency: Extremely high (one of the most potent steroidal alkaloids)
category: Sodium channel activator (non-peptide)
```

Batrachotoxin is one of the most potent animal toxins ever discovered. It irreversibly activates sodium channels, preventing closure and causing persistent depolarization, arrhythmias, and death. The golden poison frog (P. terribilis) carries enough toxin to kill ~10 adult humans.

---

### 14. Epibatidine

```yaml
id: epibatidine
name: Epibatidine
formula: C11H13ClN2
molecular_weight: 208.69 Da
source: Poison frog (Epipedobates anthonyi)
target: nAChR (nicotinic acetylcholine receptors, especially α4β2)
mechanism: Extremely potent agonist at nicotinic acetylcholine receptors
ld50: ~0.001 mg/kg (mouse, IV)
potency: Extremely high (200× more potent than morphine as analgesic)
category: nAChR agonist (non-peptide alkaloid)
```

Epibatidine is a chlorinated alkaloid that is 200 times more potent than morphine as an analgesic, but has an extremely narrow therapeutic window due to its high toxicity. It has been instrumental in developing safer nAChR-targeted analgesics like ABT-594 (though clinical development was discontinued).

---

### 15. α-Latrotoxin

```yaml
id: alpha-latrotoxin
name: α-Latrotoxin
sequence: 1581 aa (monomer; active as tetramer)
length: 1581 aa
molecular_weight: ~130,000 Da (monomer); ~520,000 Da (tetramer)
source: Black widow spider (Latrodectus tredecimguttatus)
target: Presynaptic nerve terminals (CIRL/latrophilin, neurexin, and VAMP/synaptobrevin receptors)
mechanism: Forms calcium-permeable pores in presynaptic membranes; stimulates massive neurotransmitter release
ld50: ~0.05 mg/kg (mouse, IV)
potency: Very high
category: Presynaptic neurotoxin (spider venom)
```

α-Latrotoxin is the principal toxic component of black widow spider venom. It binds presynaptic receptors and inserts into the membrane to form cation-selective pores, causing massive calcium influx and uncontrolled neurotransmitter release. This leads to intense pain, muscle cramps, and potentially fatal neuromuscular paralysis.

---

## Snake Venom Toxins

### 16. Dendrotoxin

```yaml
id: dendrotoxin
name: Dendrotoxin (DTX-I)
sequence: 59 aa (single chain with 3 disulfide bonds)
length: 59 aa
molecular_weight: ~7,000 Da
source: Mamba snakes (Dendroaspis spp.)
target: Kv1.1, Kv1.2, Kv1.6 (voltage-gated potassium channels)
mechanism: Blocks specific K+ channel subtypes, enhancing neurotransmitter release
ld50: ~0.05 mg/kg (mouse, IV)
potency: Very high
category: Neurotoxin (Kunitz-type / K+ channel blocker)
```

Dendrotoxins are structurally related to Kunitz-type protease inhibitors but function as highly selective potassium channel blockers. They enhance acetylcholine release at neuromuscular junctions and in the CNS, causing excitatory neurotoxicity. They have been invaluable research tools for mapping K+ channel distribution.

---

### 17. Sarafotoxin S6b

```yaml
id: sarafotoxin-s6b
name: Sarafotoxin S6b
sequence: CSCKDMTDKECLYFCHQDVIW
length: 21 aa
molecular_weight: ~2,500 Da
source: Burrowing asp (Atractaspis engaddensis)
target: Endothelin receptors (ETA and ETB)
mechanism: Potent vasoconstrictor mimicking endothelin-1; causes coronary vasospasm
ld50: ~0.015 mg/kg (mouse, IV)
potency: Extremely high
category: Cardiotoxin (endothelin-like peptide)
```

Sarafotoxin S6b is structurally and functionally homologous to mammalian endothelin-1. It is one of the most potent vasoconstrictors known, causing severe coronary vasospasm, cardiac arrest, and death within minutes of envenomation. It has been instrumental in endothelin receptor pharmacology research.

---

### 18. Crotamine

```yaml
id: crotamine
name: Crotamine
sequence: 42 aa (single chain, 3 disulfide bonds)
length: 42 aa
molecular_weight: ~4,800 Da
source: South American rattlesnake (Crotalus durissus terrificus)
target: Voltage-gated sodium channels (Nav1.x) and DNA
mechanism: Sodium channel modulator; also functions as a cell-penetrating peptide
ld50: ~0.4 mg/kg (mouse, IV)
potency: High
category: Myotoxin / cell-penetrating peptide (snake venom)
```

Crotamine is a unique multifunctional toxin that acts as both a sodium channel modulator and a cell-penetrating peptide (CPP). It preferentially enters actively dividing cells and has been explored as a vector for intracellular drug delivery and gene therapy. It causes hindlimb paralysis in mice.

---

### 19. Taipoxin

```yaml
id: taipoxin
name: Taipoxin
chains: 3 (α, β, γ subunits)
molecular_weight: ~45,000 Da (holotoxin)
source: Inland taipan (Oxyuranus microlepidotus)
target: Presynaptic nerve terminals (phospholipase A2 activity)
mechanism: Presynaptic PLA2 neurotoxin; hydrolyzes membrane phospholipids at motor nerve endings
ld50: ~0.002 mg/kg (mouse, IV)
potency: Extremely high (most potent snake venom toxin)
category: Presynaptic neurotoxin (PLA2 complex)
```

Taipoxin is the most potent toxin in any snake venom and one of the most toxic biological substances known. It is a ternary complex of three PLA2 subunits that synergistically destroy presynaptic nerve terminals, causing irreversible neuromuscular blockade and respiratory failure.

---

### 20. Textilotoxin

```yaml
id: textilotoxin
name: Textilotoxin
chains: 5 (A, B, C, D, E subunits)
molecular_weight: ~70,000 Da (holotoxin)
source: Eastern brown snake (Pseudonaja textilis)
target: Presynaptic nerve terminals (phospholipase A2 activity)
mechanism: Presynaptic PLA2 neurotoxin; most complex snake venom PLA2 toxin known
ld50: ~0.006 mg/kg (mouse, IV)
potency: Extremely high
category: Presynaptic neurotoxin (PLA2 complex)
```

Textilotoxin is the most complex presynaptic neurotoxin known, consisting of five non-covalently associated subunits. It is the dominant lethal component of eastern brown snake venom, which causes the most snakebite deaths in Australia. It causes progressive neuromuscular paralysis and coagulopathy.

---

## Protein Toxins (Bacterial)

### 21. Botulinum Neurotoxin (BoNT)

```yaml
id: botulinum-toxin
name: Botulinum Neurotoxin (α-toxin / BoNT)
type: AB toxin (150 kDa; light chain 50 kDa + heavy chain 100 kDa)
molecular_weight: ~150,000 Da
source: Clostridium botulinum (anaerobic bacterium)
target: SNAP-25 / Synaptobrevin (VAMP) / Syntaxin (SNARE complex)
mechanism: Zinc metalloprotease cleaves SNARE proteins, blocking acetylcholine release at neuromuscular junctions
ld50: ~0.000001 mg/kg (mouse, IV); ~0.001 mg/kg (human, oral)
potency: Most potent biological toxin known (1 gram could kill ~14 million people)
category: Clostridial neurotoxin (SNARE protease)
```

Botulinum toxin is the most acutely lethal toxin known. Seven serotypes (A–G) exist, each cleaving different SNARE proteins. BoNT/A and BoNT/B are used therapeutically (Botox, Dysport, Xeomin) for dystonia, spasticity, chronic migraine, and cosmetic applications. Paradoxically, it is both the deadliest toxin and a life-saving medicine.

---

### 22. Tetanus Toxin (TeNT)

```yaml
id: tetanus-toxin
name: Tetanus Toxin (Tetanospasmin)
type: AB toxin (150 kDa; light chain 50 kDa + heavy chain 100 kDa)
molecular_weight: ~150,000 Da
source: Clostridium tetani (anaerobic bacterium)
target: Synaptobrevin (VAMP) in inhibitory interneurons (CNS)
mechanism: Zinc metalloprotease cleaves synaptobrevin in inhibitory neurons, blocking glycine/GABA release
ld50: ~0.000002 mg/kg (mouse, IV); ~0.002 mg/kg (human)
potency: Second most potent biological toxin after botulinum
category: Clostridial neurotoxin (SNARE protease)
```

Tetanus toxin travels retrogradely to inhibitory interneurons in the spinal cord, where it cleaves synaptobrevin, preventing release of inhibitory neurotransmitters. This causes unopposed muscle contraction, resulting in the characteristic spastic paralysis of tetanus (lockjaw). It is the biological basis of the disease tetanus.

---

### 23. Diphtheria Toxin

```yaml
id: diphtheria-toxin
name: Diphtheria Toxin (DT)
type: AB toxin (A fragment: 21 kDa; B fragment: 39 kDa)
molecular_weight: ~58,000 Da (single chain precursor)
source: Corynebacterium diphtheriae (bacterium; lysogenized by β-phage)
target: Elongation factor 2 (EF-2) / NAD+
mechanism: ADP-ribosylates EF-2, halting protein synthesis and causing cell death
ld50: ~0.01 mg/kg (guinea pig, SC)
potency: Very high
category: ADP-ribosylating toxin (bacterial)
```

Diphtheria toxin is an exotoxin that catalyzes the ADP-ribosylation of diphthamide (modified histidine) on elongation factor 2, irreversibly inhibiting protein synthesis. It causes pseudomembrane formation in the throat, myocarditis, and neuropathy. DT-based immunotoxins (DAB389IL-2/denileukin diftitox) are used in cancer therapy.

---

### 24. Ricin

```yaml
id: ricin
name: Ricin
chains: A chain (RTA, 32 kDa) + B chain (RTB, 34 kDa) linked by disulfide bond
molecular_weight: ~64,000 Da
source: Castor bean (Ricinus communis)
target: 28S rRNA (ribosomes)
mechanism: A chain is an N-glycosidase that depurinates a specific adenine in 28S rRNA, irreversibly inhibiting protein synthesis
ld50: ~0.003 mg/kg (mouse, IV); ~1 mg/kg (human, oral)
potency: Extremely high (potential bioweapon)
category: Ribosome-inactivating protein (RIP, type II)
```

Ricin is one of the most well-known and feared plant toxins. The B chain binds cell surface glycoproteins, facilitating endocytosis. The A chain then translocates to the cytoplasm where it enzymatically destroys ribosomes. There is no antidote. It was used in the assassination of Georgi Markov (1978) and is a CDC category B bioterrorism agent.

---

### 25. Abrin

```yaml
id: abrin
name: Abrin
chains: A chain (~30 kDa) + B chain (~33 kDa) linked by disulfide bond
molecular_weight: ~64,000 Da
source: Jequirity bean (Abrus precatorius)
target: 28S rRNA (ribosomes)
mechanism: N-glycosidase that depurinates 28S rRNA, irreversibly inhibiting protein synthesis (similar to ricin)
ld50: ~0.001 mg/kg (mouse, IV); ~0.1 mg/kg (human, oral estimated)
potency: Extremely high (potentially more toxic than ricin)
category: Ribosome-inactivating protein (RIP, type II)
```

Abrin is functionally and structurally similar to ricin but potentially more toxic. The bright red and black jequirity beans are commonly used in jewelry, posing an ingestion risk. Abrin has been investigated as a potential bioterrorism agent. Like ricin, there is no specific antidote; treatment is supportive.

---

## Summary Table

| # | Name | Type | MW (Da) | Source | Primary Target | LD50 (mouse, IV) |
|---|------|------|---------|--------|----------------|-------------------|
| 1 | α-Bungarotoxin | Peptide (74 aa) | 7,984 | Snake | nAChR | 0.03 mg/kg |
| 2 | ω-Conotoxin MVIIA | Peptide (25 aa) | 2,639 | Cone snail | Cav2.2 | ~0.01 mg/kg |
| 3 | ω-Conotoxin GVIA | Peptide (27 aa) | 3,037 | Cone snail | Cav2.2 | ~0.015 mg/kg |
| 4 | μ-Conotoxin GIIIA | Peptide (22 aa) | 2,270 | Cone snail | Nav1.4 | ~0.012 mg/kg |
| 5 | δ-Conotoxin | Peptide (31 aa) | ~3,500 | Cone snail | Nav | ~0.05 mg/kg |
| 6 | α-Conotoxin GI | Peptide (13 aa) | 1,491 | Cone snail | nAChR | ~0.05 mg/kg |
| 7 | Chlorotoxin | Peptide (36 aa) | 4,044 | Scorpion | MMP-2 | ~4.0 mg/kg |
| 8 | Charybdotoxin | Peptide (37 aa) | 4,297 | Scorpion | KCa3.1 | ~0.2 mg/kg |
| 9 | Apamin | Peptide (18 aa) | 2,027 | Bee | KCa2.x | 4.0 mg/kg |
| 10 | Melittin | Peptide (26 aa) | 2,846 | Bee | Membrane | 2.8 mg/kg |
| 11 | Bee PLA2 | Protein (124 aa) | ~14,500 | Bee | Phospholipids | ~7.5 mg/kg |
| 12 | Tetrodotoxin | Alkaloid | 319 | Pufferfish | Nav | 0.008 mg/kg |
| 13 | Batrachotoxin | Steroidal alkaloid | 539 | Frog | Nav | 0.002 mg/kg |
| 14 | Epibatidine | Alkaloid | 209 | Frog | nAChR | ~0.001 mg/kg |
| 15 | α-Latrotoxin | Protein (1581 aa) | ~130,000 | Spider | Presynaptic | ~0.05 mg/kg |
| 16 | Dendrotoxin | Peptide (59 aa) | ~7,000 | Snake | K+ channels | ~0.05 mg/kg |
| 17 | Sarafotoxin S6b | Peptide (21 aa) | ~2,500 | Snake | ET receptors | ~0.015 mg/kg |
| 18 | Crotamine | Peptide (42 aa) | ~4,800 | Snake | Nav | ~0.4 mg/kg |
| 19 | Taipoxin | Protein (3 chains) | ~45,000 | Snake | PLA2 | 0.002 mg/kg |
| 20 | Textilotoxin | Protein (5 chains) | ~70,000 | Snake | PLA2 | 0.006 mg/kg |
| 21 | Botulinum toxin | Protein (AB) | ~150,000 | Bacterium | SNARE | 0.000001 mg/kg |
| 22 | Tetanus toxin | Protein (AB) | ~150,000 | Bacterium | SNARE | 0.000002 mg/kg |
| 23 | Diphtheria toxin | Protein (AB) | ~58,000 | Bacterium | EF-2 | ~0.01 mg/kg |
| 24 | Ricin | Protein (A+B) | ~64,000 | Plant | Ribosome | ~0.003 mg/kg |
| 25 | Abrin | Protein (A+B) | ~64,000 | Plant | Ribosome | ~0.001 mg/kg |
