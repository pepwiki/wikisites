---
title: Venom Peptides Database
description: Comprehensive database of venom peptides from snakes, cone snails, scorpions, spiders, bees, wasps, and marine organisms
---

# Venom Peptides Database

A structured database of bioactive venom peptides from venomous organisms, organized by source class. These peptides represent some of the most potent and therapeutically promising molecules in toxinology.

---

## Snake Venom Peptides

### 1. α-Bungarotoxin

```yaml
id: alpha-bungarotoxin
name: α-Bungarotoxin
sequence: IVCHTTATSPISAVTCPPGENLCYKMWRCDWRPDCCRGNVCCKHWFGYCGPNGICGCP
length: 74 aa
molecular_weight: 7984 Da
source_organism: Bungarus multicinctus (many-banded krait)
venom_type: Snake (Elapidae)
target: Nicotinic acetylcholine receptor (nAChR)
mechanism: Irreversible competitive antagonist at postsynaptic α1-nAChR
potency: Extremely high (LD50 ~0.03 mg/kg mouse, IV)
therapeutic_potential: Research tool for nAChR mapping; template for muscle relaxant design
category: Three-finger neurotoxin
```

α-Bungarotoxin is the prototypical postsynaptic neurotoxin from the many-banded krait. It binds irreversibly to the α-subunit of muscle-type nicotinic acetylcholine receptors at the neuromuscular junction, preventing acetylcholine binding and causing flaccid paralysis. Widely used in neuroscience research to map nAChR distribution and study neuromuscular transmission.

---

### 2. α-Cobrotoxin

```yaml
id: alpha-cobrotoxin
name: α-Cobrotoxin
sequence: IRCAITCYTSTCPKNPQMICFGKTSTCYKKTWTDCSRTC
length: 71 aa
molecular_weight: 7821 Da
source_organism: Naja naja (Indian cobra)
venom_type: Snake (Elapidae)
target: Muscle-type nAChR
mechanism: Reversible competitive antagonist at postsynaptic nAChR
potency: Very high (LD50 ~0.1 mg/kg mouse, IV)
therapeutic_potential: Template for analgesic and anti-inflammatory drug design
category: Three-finger neurotoxin
```

α-Cobrotoxin is a short-chain three-finger toxin from Indian cobra venom. Unlike α-bungarotoxin, it binds reversibly to muscle-type nAChRs. It has been used extensively as a pharmacological tool to study cholinergic neurotransmission and serves as a template for developing non-addictive analgesics.

---

### 3. Dendrotoxin

```yaml
id: dendrotoxin
name: Dendrotoxin
sequence: MRECKDSDCPAKECPCCGSGTCGGRCKCPK (varies by isoform)
length: 57-60 aa
molecular_weight: ~7000 Da
source_organism: Dendroaspis angusticeps (eastern green mamba)
venom_type: Snake (Elapidae)
target: Voltage-gated potassium channels (Kv1.1, Kv1.2, Kv1.6)
mechanism: Selective blocker of Shaker-type K+ channels, enhancing neurotransmitter release
potency: Very high (LD50 ~0.04 mg/kg mouse, IV)
therapeutic_potential: Research tool for K+ channel characterization; epilepsy research
category: Kunitz-type neurotoxin
```

Dendrotoxin is a Kunitz-type protease inhibitor homolog that selectively blocks voltage-gated potassium channels. By inhibiting presynaptic K+ channels, it enhances neurotransmitter release and causes excitatory symptoms. Multiple isoforms (α, β, γ, δ, κ) exist with varying channel selectivity.

---

### 4. Sarafotoxin S6b

```yaml
id: sarafotoxin-s6b
name: Sarafotoxin S6b
sequence: CSCKDMTDKECLNFCHQDVIW
length: 21 aa
molecular_weight: 2442 Da
source_organism: Atractaspis engaddensis (Israeli mole viper)
venom_type: Snake (Atractaspididae)
target: Endothelin receptors (ETA and ETB)
mechanism: Potent agonist at endothelin receptors, causing severe vasoconstriction
potency: Extremely high (LD50 ~0.015 mg/kg mouse, IV)
therapeutic_potential: Tool for studying endothelin signaling; cardiovascular research
category: Endothelin-like peptide
```

Sarafotoxin S6b is a remarkably potent vasoconstrictor peptide that shares significant structural and functional homology with mammalian endothelins. It causes coronary vasospasm, atrioventricular block, and cardiac arrest. Its discovery predated and contributed to understanding of the endothelin system in cardiovascular physiology.

---

### 5. Crotamine

```yaml
id: crotamine
name: Crotamine
sequence: YKQCHKKGGHCFPKEKICLPPSSDFGKMDCRWRWKCCKKGS
length: 42 aa
molecular_weight: 4883 Da
source_organism: Crotalus durissus terrificus (South American rattlesnake)
venom_type: Snake (Viperidae)
target: Voltage-gated sodium channels (Nav) and cell membranes
mechanism: Sodium channel modifier; causes hyperpolarization-dependent skeletal muscle spasm
potency: High (LD50 ~0.5 mg/kg mouse, IV)
therapeutic_potential: Cell-penetrating peptide for drug delivery; antimicrobial; analgesic
category: Myotoxic peptide (β-defensin fold)
```

Crotamine is a unique cell-penetrating peptide that preferentially enters proliferating cells and skeletal muscle fibers. It modifies voltage-gated sodium channels, causing a characteristic spastic paralysis of hind limbs. Its cell-penetrating properties are being exploited for intracellular drug delivery and as an anticancer agent.

---

### 6. Mojave Toxin

```yaml
id: mojave-toxin
name: Mojave Toxin
sequence: Heterodimeric (acidic + basic subunits, 121 aa total)
length: 121 aa (heterodimer)
molecular_weight: ~14,000 Da
source_organism: Crotalus scutulatus (Mojave rattlesnake)
venom_type: Snake (Viperidae)
target: Presynaptic nerve terminals; phospholipid membranes
mechanism: Phospholipase A2 neurotoxin; disrupts presynaptic acetylcholine release
potency: Very high (LD50 ~0.07 mg/kg mouse, IV)
therapeutic_potential: Study of presynaptic neurotransmitter release mechanisms
category: Presynaptic PLA2 neurotoxin
```

Mojave toxin is the primary neurotoxic component of Mojave rattlesnake venom, responsible for "Mojave type A" envenomation syndrome. This heterodimeric PLA2 complex causes presynaptic neurotoxicity by disrupting acetylcholine vesicle fusion at the neuromuscular junction, leading to prolonged paralysis.

---

### 7. Textilotoxin

```yaml
id: textilotoxin
name: Textilotoxin
sequence: Pentameric PLA2 complex (5 subunits)
length: ~600 aa total (pentamer)
molecular_weight: ~70,000 Da (pentameric complex)
source_organism: Pseudonaja textilis (eastern brown snake)
venom_type: Snake (Elapidae)
target: Presynaptic nerve terminals; phospholipid membranes
mechanism: Presynaptic PLA2 neurotoxin; inhibits acetylcholine release
potency: Extremely high (LD50 ~0.005 mg/kg mouse, IV) — one of most potent snake toxins
therapeutic_potential: Study of PLA2 neurotoxicity; neuromuscular research
category: Presynaptic PLA2 neurotoxin complex
```

Textilotoxin is the most potent toxin isolated from any Australian snake and one of the most toxic PLA2 complexes known. This pentameric PLA2 complex from the eastern brown snake causes progressive neuromuscular paralysis by disrupting presynaptic neurotransmitter release. Responsible for the highest snakebite mortality in Australia.

---

### 8. Taipoxin

```yaml
id: taipoxin
name: Taipoxin
sequence: Trimeric PLA2 complex (α, β, γ subunits)
length: ~375 aa total (trimer)
molecular_weight: ~46,000 Da (trimeric complex)
source_organism: Oxyuranus scutellatus (coastal taipan)
venom_type: Snake (Elapidae)
target: Presynaptic nerve terminals
mechanism: Presynaptic PLA2 neurotoxin; causes motor nerve terminal degeneration
potency: Extremely high (LD50 ~0.002 mg/kg mouse, IV) — among most potent neurotoxins known
therapeutic_potential: Model for studying motor neuron degeneration
category: Presynaptic PLA2 neurotoxin complex
```

Taipoxin is a trimeric PLA2 complex from the coastal taipan, ranking among the most potent neurotoxins ever isolated. It binds to the presynaptic membrane of motor neurons, causing irreversible destruction of nerve terminals through PLA2 enzymatic activity and subunit synergy. Effects mimic botulinum toxin but are irreversible.

---

### 9. Notexin

```yaml
id: notexin
name: Notexin
sequence: NLIQFSNLIQCANHKNRPSIPFGSLIAGCGN (homologous to PLA2)
length: 119 aa
molecular_weight: ~13,500 Da
source_organism: Notechis scutatus (mainland tiger snake)
venom_type: Snake (Elapidae)
target: Presynaptic nerve terminals; phospholipid membranes
mechanism: Single-chain presynaptic PLA2 neurotoxin; destroys motor nerve terminals
potency: Very high (LD50 ~0.03 mg/kg mouse, IV)
therapeutic_potential: Model for neuromuscular degeneration; study of PLA2 mechanism
category: Presynaptic PLA2 neurotoxin
```

Notexin is a single-chain presynaptic PLA2 neurotoxin from the mainland tiger snake. Unlike the oligomeric PLA2 complexes (taipoxin, textilotoxin), notexin functions as a monomer. It causes rapid and irreversible destruction of motor nerve terminals through PLA2-dependent membrane hydrolysis.

---

### 10. β-Bungarotoxin

```yaml
id: beta-bungarotoxin
name: β-Bungarotoxin
sequence: Heterodimer (Kunitz-type chain + PLA2 chain, 120 aa total)
length: 120 aa (heterodimer)
molecular_weight: ~21,000 Da
source_organism: Bungarus multicinctus (many-banded krait)
venom_type: Snake (Elapidae)
target: Presynaptic nerve terminals (Kv1 channel + PLA2 activity)
mechanism: Binds Kv1 channels via Kunitz subunit, then PLA2 subunit destroys nerve terminal
potency: Very high (LD50 ~0.02 mg/kg mouse, IV)
therapeutic_potential: Dual-function model for targeted neurotoxicity; K+ channel research
category: Presynaptic PLA2/Kunitz neurotoxin
```

β-Bungarotoxin is a unique heterodimer combining a Kunitz-type protease inhibitor domain with a PLA2 catalytic domain. The Kunitz subunit targets the toxin to specific presynaptic Kv1 potassium channels, positioning the PLA2 subunit to destroy the nerve terminal. This elegant mechanism of targeted toxicity is a model for drug targeting strategies.

---

## Cone Snail Venom Peptides (Conotoxins)

### 11. ω-Conotoxin MVIIA (Ziconotide)

```yaml
id: omega-conotoxin-mviia
name: ω-Conotoxin MVIIA (Ziconotide)
sequence: CKGKGAKCSRLMYDCCTGSCRSGKC
length: 25 aa
molecular_weight: 2639 Da
source_organism: Conus magus (magician cone)
venom_type: Cone snail (Conidae)
target: Cav2.2 (N-type voltage-gated calcium channel)
mechanism: Reversible blocker of presynaptic N-type calcium channels
potency: Extremely high (LD50 ~0.01 mg/kg mouse, IV)
therapeutic_potential: FDA-approved analgesic (Prialt®) for severe chronic pain
category: ω-Conotoxin (calcium channel blocker)
```

ω-Conotoxin MVIIA is the active ingredient in Prialt (ziconotide), the first FDA-approved conotoxin-derived drug. It blocks N-type calcium channels in the dorsal horn of the spinal cord, inhibiting neurotransmitter release from pain-sensing neurons. Intrathecal delivery avoids systemic side effects. One of the most potent known analgesic peptides.

---

### 12. ω-Conotoxin GVIA

```yaml
id: omega-conotoxin-gvia
name: ω-Conotoxin GVIA
sequence: CKSPGSSCSPTSYNCCRSCNPYTKRCYGK
length: 27 aa
molecular_weight: 3037 Da
source_organism: Conus geographus (geography cone)
venom_type: Cone snail (Conidae)
target: Cav2.2 (N-type voltage-gated calcium channel)
mechanism: Highly potent near-irreversible blocker of N-type calcium channels
potency: Extremely high (LD50 ~0.015 mg/kg mouse, IV)
therapeutic_potential: Research tool for synaptic transmission; pain pathway characterization
category: ω-Conotoxin (calcium channel blocker)
```

ω-Conotoxin GVIA was one of the first ω-conotoxins characterized and remains one of the highest affinity peptide ligands for any ion channel. Its near-irreversible binding to N-type calcium channels makes it an invaluable research tool for studying synaptic transmission and pain pathways, though this property limits therapeutic utility.

---

### 13. μ-Conotoxin GIIIA

```yaml
id: mu-conotoxin-giiia
name: μ-Conotoxin GIIIA
sequence: RDCCTOOKKCSRRQDRGHYCARK
length: 22 aa
molecular_weight: 2270 Da
source_organism: Conus geographus (geography cone)
venom_type: Cone snail (Conidae)
target: Nav1.4 (skeletal muscle voltage-gated sodium channel)
mechanism: Pore blocker of voltage-gated sodium channels
potency: Extremely high (LD50 ~0.012 mg/kg mouse, IV)
therapeutic_potential: Research tool for Nav subtype discrimination; pain research
category: μ-Conotoxin (sodium channel blocker)
```

μ-Conotoxin GIIIA selectively blocks skeletal muscle sodium channels (Nav1.4) by physically plugging the channel pore. Unlike tetrodotoxin, it can discriminate between different sodium channel isoforms, making it a valuable pharmacological tool for studying channel subtype-specific functions in excitable tissues.

---

### 14. μ-Conotoxin KIIIA

```yaml
id: mu-conotoxin-kiiia
name: μ-Conotoxin KIIIA
sequence: CCNCSSKWCRDHSRCC
length: 16 aa
molecular_weight: 1863 Da
source_organism: Conus kinoshitai
venom_type: Cone snail (Conidae)
target: Voltage-gated sodium channels (multiple Nav subtypes)
mechanism: Pore blocker of sodium channels; small size allows blood-brain barrier penetration
potency: High
therapeutic_potential: Non-opioid analgesic lead; smallest Nav-blocking conotoxin
category: μ-Conotoxin (sodium channel blocker)
```

μ-Conotoxin KIIIA is one of the smallest known conotoxins with sodium channel blocking activity. Its compact structure and ability to block multiple Nav subtypes make it an attractive template for developing non-opioid analgesics. Its small size may facilitate blood-brain barrier penetration.

---

### 15. δ-Conotoxin SVIA

```yaml
id: delta-conotoxin-svia
name: δ-Conotoxin SVIA
sequence: WCKQSGEMCNLLDQCCDGYCNVACGP
length: 26 aa
molecular_weight: 2790 Da
source_organism: Conus striatus (striated cone)
venom_type: Cone snail (Conidae)
target: Voltage-gated sodium channels (Nav)
mechanism: Delays sodium channel inactivation; causes persistent neuronal activation
potency: Very high (LD50 ~0.05 mg/kg mouse, IV)
therapeutic_potential: Tool for studying sodium channel inactivation gating
category: δ-Conotoxin (sodium channel activator)
```

δ-Conotoxin SVIA delays the inactivation of voltage-gated sodium channels, causing persistent neuronal firing and hyperexcitability. It binds to a site distinct from other sodium channel toxins, providing unique insights into the molecular mechanisms of channel inactivation gating.

---

### 16. κ-Conotoxin PVIIA

```yaml
id: kappa-conotoxin-pviia
name: κ-Conotoxin PVIIA
sequence: CRIPNQKCFQHLDDCCSRKCNRFNKCV
length: 27 aa
molecular_weight: 3071 Da
source_organism: Conus purpurascens (purple cone)
venom_type: Cone snail (Conidae)
target: Shaker-type voltage-gated potassium channels (Kv1)
mechanism: Pore-blocking toxin of K+ channels
potency: High
therapeutic_potential: Template for K+ channel-targeted therapeutics; cardiac research
category: κ-Conotoxin (potassium channel blocker)
```

κ-Conotoxin PVIIA is a member of the κ-conotoxin family that blocks Shaker-type potassium channels. It interacts with the outer vestibule of Kv1 channels in a manner mechanistically similar to scorpion K+ channel toxins, but with a distinct structural scaffold, demonstrating convergent evolution of K+ channel blocking.

---

### 17. α-Conotoxin GI

```yaml
id: alpha-conotoxin-gi
name: α-Conotoxin GI
sequence: ECCNPACGRHYSC
length: 13 aa
molecular_weight: 1491 Da
source_organism: Conus geographus (geography cone)
venom_type: Cone snail (Conidae)
target: Muscle-type nAChR (α1β1δε)
mechanism: Competitive antagonist at nicotinic acetylcholine receptors
potency: Very high (LD50 ~0.05 mg/kg mouse, IV)
therapeutic_potential: Template for nAChR-targeted drug design; muscle relaxant lead
category: α-Conotoxin (nAChR antagonist)
```

α-Conotoxin GI is one of the smallest and best-characterized conotoxins. This 13-residue peptide binds with high selectivity to the acetylcholine binding site on muscle-type nicotinic receptors. Its small size and defined disulfide framework make it an excellent template for designing subtype-selective nAChR therapeutics.

---

### 18. α-Conotoxin MI

```yaml
id: alpha-conotoxin-mi
name: α-Conotoxin MI
sequence: GRCCHPACGKNYSC
length: 14 aa
molecular_weight: 1487 Da
source_organism: Conus magus (magician cone)
venom_type: Cone snail (Conidae)
target: Muscle-type nAChR (α1β1δε)
mechanism: Competitive antagonist at neuromuscular nAChR
potency: High (LD50 ~0.1 mg/kg mouse, IV)
therapeutic_potential: Muscle relaxant research; nAChR subtype characterization
category: α-Conotoxin (nAChR antagonist)
```

α-Conotoxin MI is a small, selective antagonist of muscle-type nicotinic acetylcholine receptors. Like α-conotoxin GI, it binds at the acetylcholine binding site but with distinct selectivity for nAChR subtypes. It has been instrumental in mapping the subunit interfaces of muscle nAChR.

---

### 19. α-Conotoxin Vc1.1

```yaml
id: alpha-conotoxin-vc1-1
name: α-Conotoxin Vc1.1
sequence: GCCSDPRCNYDHPEIC
length: 16 aa
molecular_weight: 1761 Da
source_organism: Conus victoriae (Victorian cone)
venom_type: Cone snail (Conidae)
target: α9α10 nAChR and GABA-B receptor
mechanism: Antagonist at α9α10 nAChR; activates GABA-B pathway
potency: High
therapeutic_potential: Clinical candidate for neuropathic pain (non-opioid)
category: α-Conotoxin (nAChR antagonist/analgesic)
```

α-Conotoxin Vc1.1 is a clinical-stage analgesic conotoxin that targets α9α10 nicotinic receptors involved in pain signaling. Unlike opioids, it provides analgesia without addiction potential. It also activates GABA-B receptor pathways, contributing to its analgesic mechanism. Advancing through clinical development for neuropathic pain.

---

### 20. χ-Conotoxin MrIA

```yaml
id: chi-conotoxin-mria
name: χ-Conotoxin MrIA
sequence: NGVCCGYKLCHOC
length: 13 aa
molecular_weight: 1452 Da
source_organism: Conus marmoreus (marble cone)
venom_type: Cone snail (Conidae)
target: Norepinephrine transporter (NET)
mechanism: Non-competitive inhibitor of norepinephrine reuptake
potency: High
therapeutic_potential: Antidepressant and analgesic lead (non-SSRI/non-opioid)
category: χ-Conotoxin (NET inhibitor)
```

χ-Conotoxin MrIA is a unique conotoxin that targets the norepinephrine transporter rather than ion channels. By blocking norepinephrine reuptake, it enhances noradrenergic signaling in pain-modulating pathways. It represents a novel structural class for antidepressant and analgesic drug development.

---

## Scorpion Venom Peptides

### 21. Chlorotoxin

```yaml
id: chlorotoxin
name: Chlorotoxin
sequence: MCMPCFTTDPHQMARKCDDCCGGKGGRCGPCYCPQ
length: 36 aa
molecular_weight: 4044 Da
source_organism: Leiurus quinquestriatus (deathstalker scorpion)
venom_type: Scorpion (Buthidae)
target: MMP-2 / ClC-3 chloride channels / Annexin A2
mechanism: Binds matrix metalloproteinase-2 and inhibits chloride channels on glioma cells
potency: Moderate (highly selective for cancer cells)
therapeutic_potential: Tumor-targeting agent (TM-601/Tozuleristide) for fluorescence-guided surgery
category: Anti-glioma peptide (scorpion toxin)
```

Chlorotoxin specifically binds to glioma cells and other tumors of neuroectodermal origin with minimal binding to normal brain tissue. It targets MMP-2, ClC-3 chloride channels, and annexin A2 on cancer cells. Being developed as Tozuleristide for fluorescence-guided brain tumor surgery and targeted drug delivery.

---

### 22. Charybdotoxin

```yaml
id: charybdotoxin
name: Charybdotoxin
sequence: TFINCAKTCKCSKGKCMNPKCRCYTS
length: 37 aa
molecular_weight: 4297 Da
source_organism: Leiurus quinquestriatus (deathstalker scorpion)
venom_type: Scorpion (Buthidae)
target: KCa1.1 (BK) and KCa3.1 (IK) calcium-activated potassium channels
mechanism: Pore-blocking toxin binding to the external vestibule of K+ channels
potency: High (LD50 ~0.2 mg/kg mouse, IV)
therapeutic_potential: Research tool for K+ channel characterization; immunology research
category: Potassium channel blocker (scorpion toxin)
```

Charybdotoxin blocks intermediate and large conductance calcium-activated potassium channels (KCa3.1 and KCa1.1). It has been instrumental in characterizing the physiological roles of these channels in smooth muscle contraction, T-cell activation, and neuronal excitability. A cornerstone tool in ion channel research.

---

### 23. Agitoxin-2

```yaml
id: agitoxin-2
name: Agitoxin-2
sequence: GVPINVSCTGSPQCIKPCKDAGMRFGKCMNRKCHCTPK
length: 38 aa
molecular_weight: 4044 Da
source_organism: Leiurus quinquestriatus (deathstalker scorpion)
venom_type: Scorpion (Buthidae)
target: Kv1 family voltage-gated potassium channels
mechanism: Pore-blocking toxin of Shaker-type K+ channels
potency: Very high
therapeutic_potential: Research tool for Kv1 channel mapping; autoimmune disease research
category: Potassium channel blocker (scorpion toxin)
```

Agitoxin-2 is a highly selective blocker of Kv1-family potassium channels. It has been crucial in mapping the pore structure and pharmacology of Shaker-type K+ channels. The toxin-channel complex has been studied by X-ray crystallography, providing atomic-level insights into K+ channel gating.

---

### 24. Maurotoxin

```yaml
id: maurotoxin
name: Maurotoxin
sequence: VSCTGSKDCYAPCRKQTGCPNAKCINKSCKCYGC
length: 34 aa
molecular_weight: 3647 Da
source_organism: Scorpio maurus (chactoid scorpion)
venom_type: Scorpion (Scorpionidae)
target: Kv1.1, Kv1.2, Kv1.3, KCa1.1
mechanism: Blocker of multiple K+ channel subtypes; unique disulfide bridge pattern
potency: High
therapeutic_potential: Template for immunosuppressant design; pain research
category: Potassium channel blocker (scorpion toxin)
```

Maurotoxin is a unique scorpion toxin with an atypical disulfide bridge pattern (CSαβ fold with 4 disulfides). It blocks multiple K+ channel subtypes with varying affinities, making it a versatile pharmacological tool. Its unusual structure provides insights into toxin evolution and channel pharmacology.

---

### 25. Iberiotoxin

```yaml
id: iberiotoxin
name: Iberiotoxin
sequence: FTNVSCTTSKECWSVCQRLHNTSRGKCMNKKCRCYS
length: 37 aa
molecular_weight: 4228 Da
source_organism: Buthus tamulus (Indian red scorpion)
venom_type: Scorpion (Buthidae)
target: KCa1.1 (BK) large conductance calcium-activated potassium channel
mechanism: Highly selective pore blocker of BK channels
potency: High (LD50 ~0.5 mg/kg mouse, IV)
therapeutic_potential: Research tool for BK channel physiology; smooth muscle research
category: Potassium channel blocker (scorpion toxin)
```

Iberiotoxin is the most selective known blocker of large conductance calcium-activated potassium (BK/KCa1.1) channels. Unlike charybdotoxin, it does not block intermediate conductance channels, making it the preferred tool for specifically studying BK channel function in vascular smooth muscle, neurons, and other tissues.

---

### 26. Margatoxin

```yaml
id: margatoxin
name: Margatoxin
sequence: TIINVKCTSPKQCSKPCKELYGSSAGAKCMNGKCKCYNN
length: 39 aa
molecular_weight: 4185 Da
source_organism: Centruroides margaritatus (bark scorpion)
venom_type: Scorpion (Buthidae)
target: Kv1.3 voltage-gated potassium channel
mechanism: Highly potent and selective Kv1.3 blocker
potency: Very high
therapeutic_potential: Immunosuppressant for autoimmune diseases (Type 1 diabetes, MS)
category: Potassium channel blocker (scorpion toxin)
```

Margatoxin is an extremely potent blocker of Kv1.3 potassium channels (picomolar affinity). Kv1.3 is essential for T-cell activation, making margatoxin a lead compound for immunosuppression without calcineurin inhibitor side effects. Being developed for autoimmune diseases including type 1 diabetes and multiple sclerosis.

---

### 27. Noxiustoxin

```yaml
id: noxiustoxin
name: Noxiustoxin
sequence: TIINVKCTSPKQCSKPCKELYGSSAGAKCMNGKCKCYNN
length: 39 aa
molecular_weight: 4179 Da
source_organism: Centruroides noxius (Mexican scorpion)
venom_type: Scorpion (Buthidae)
target: Kv1.3 voltage-gated potassium channel
mechanism: Blocker of Kv1.3 and other Kv1 family channels
potency: High
therapeutic_potential: Lead compound for Kv1.3-targeted immunosuppressants
category: Potassium channel blocker (scorpion toxin)
```

Noxiustoxin was one of the first scorpion K+ channel toxins characterized. It blocks Kv1.3 channels involved in T-cell activation and has been instrumental in establishing the role of Kv1.3 in immune cell function. It served as a template for developing more selective immunosuppressive peptides.

---

### 28. Ts1 (Tityustoxin)

```yaml
id: ts1
name: Ts1 (γ-Tityustoxxin)
sequence: VRDAYIAKNYNCVYECFRDAYCNELCTKNGASSGYCQWAGKYGNACWCYALPDNVPIRIPGPCR
length: 61 aa
molecular_weight: ~6800 Da
source_organism: Tityus serrulatus (Brazilian yellow scorpion)
venom_type: Scorpion (Buthidae)
target: Voltage-gated sodium channels (Nav1.1-Nav1.7)
mechanism: α-scorpion toxin; delays sodium channel inactivation
potency: Very high (LD50 ~0.025 mg/kg mouse, IV)
therapeutic_potential: Tool for studying Nav channel gating; pain research
category: Sodium channel activator (α-scorpion toxin)
```

Ts1 is the major toxic component of Brazilian yellow scorpion venom, responsible for most human envenomation severity. As an α-scorpion toxin, it delays sodium channel inactivation by binding to site 3, causing persistent neuronal firing. It is the primary cause of autonomic and cardiovascular symptoms in Tityus envenomation.

---

### 29. Css II

```yaml
id: css-ii
name: Css II (CssIV)
sequence: KEGYLVNADYTCPASFLQKGYCQTLFCYCKKKGHGGYCQWEKGYCWCTK (partial)
length: ~66 aa
molecular_weight: ~7200 Da
source_organism: Centruroides suffusus suffusus (Mexican bark scorpion)
venom_type: Scorpion (Buthidae)
target: Voltage-gated sodium channels (Nav1.1, Nav1.2)
mechanism: α-scorpion toxin; binds site 3 and delays Nav inactivation
potency: Very high (LD50 ~0.03 mg/kg mouse, IV)
therapeutic_potential: Study of Nav channel function in epilepsy and pain
category: Sodium channel activator (α-scorpion toxin)
```

Css II is a potent α-scorpion toxin from the Mexican bark scorpion that preferentially targets brain sodium channel subtypes (Nav1.1, Nav1.2). It has been valuable for studying the molecular basis of sodium channel inactivation and for understanding the pathophysiology of scorpion envenomation syndromes.

---

### 30. BmK AGAP

```yaml
id: bmk-agap
name: BmK AGAP (Analgesic GABAergic Anti-nociceptive Peptide)
sequence: VRDGYIADDKNCVYKCARYGYCQSLSCYCTKNGGSSGYCQWEKGYCWCTK (partial)
length: ~66 aa
molecular_weight: ~7100 Da
source_organism: Buthus martensii (Chinese red scorpion)
venom_type: Scorpion (Buthidae)
target: Nav channels and GABAergic system
mechanism: Dual mechanism: Nav channel modulation + GABA-A receptor potentiation
potency: High
therapeutic_potential: Non-opioid analgesic; pain management lead compound
category: Sodium channel modulator/analgesic (scorpion toxin)
```

BmK AGAP is a unique dual-function scorpion toxin from the Chinese red scorpion that provides analgesia through both sodium channel modulation and GABAergic potentiation. This dual mechanism offers analgesic efficacy comparable to morphine without addiction potential, making it a promising non-opioid pain therapeutic.

---

## Spider Venom Peptides

### 31. ω-Agatoxin IVA

```yaml
id: omega-agatoxin-iva
name: ω-Agatoxin IVA
sequence: KKDCIAKDYQCEASDHQCKRNYNAACSMLNLNICKRIPRCQ (partial)
length: 48 aa
molecular_weight: 5210 Da
source_organism: Agelenopsis aperta (funnel-web spider)
venom_type: Spider (Agelenidae)
target: Cav2.1 (P/Q-type voltage-gated calcium channel)
mechanism: Selective blocker of P/Q-type calcium channels
potency: Very high
therapeutic_potential: Migraine research; epilepsy study tool
category: Calcium channel blocker (spider toxin)
```

ω-Agatoxin IVA selectively blocks P/Q-type calcium channels (Cav2.1) that control neurotransmitter release at many central synapses. It has been crucial for understanding the role of these channels in migraine (FHM1 mutations), epilepsy, and ataxia. The toxin's mechanism involves binding to the channel's gating machinery.

---

### 32. ω-Agatoxin TK

```yaml
id: omega-agatoxin-tk
name: ω-Agatoxin TK
sequence: WCIGPNDCRGDSCRCSGKQCKPCCDGYRCWCYCTNT (partial)
length: 40 aa
molecular_weight: ~4500 Da
source_organism: Agelenopsis aperta (funnel-web spider)
venom_type: Spider (Agelenidae)
target: Cav2.1 and Cav2.2 calcium channels
mechanism: Blocker of both P/Q-type and N-type calcium channels
potency: Very high
therapeutic_potential: Dual calcium channel blocker; pain and neuroprotection
category: Calcium channel blocker (spider toxin)
```

ω-Agatoxin TK is a dual calcium channel blocker that targets both P/Q-type (Cav2.1) and N-type (Cav2.2) channels. This broader selectivity profile makes it useful for studying overlapping channel functions in synaptic transmission and for developing analgesics with complementary mechanisms.

---

### 33. JSTX (Joro Spider Toxin)

```yaml
id: jstx
name: JSTX (Joro Spider Toxin)
sequence: Asparagine-phenylalanine-hydroxyproline-arginine-tyrosine (small molecule toxin)
length: ~4-6 aa (peptide-like)
molecular_weight: ~600 Da
source_organism: Nephila clavata (Joro spider)
venom_type: Spider (Araneidae)
target: Glutamate receptors (non-NMDA; AMPA/kainate)
mechanism: Non-competitive blocker of ionotropic glutamate receptors
potency: High
therapeutic_potential: Neuroprotection research; excitotoxicity study tool
category: Glutamate receptor antagonist (spider toxin)
```

JSTX is a small polyamine-containing toxin from the Joro spider that blocks non-NMDA glutamate receptors. It has been valuable for studying excitatory synaptic transmission and for understanding the role of AMPA/kainate receptors in excitotoxicity and neurodegeneration.

---

### 34. Huwentoxin-I

```yaml
id: huwentoxin-i
name: Huwentoxin-I
sequence: ACKGVFDACTPGKNECCPNRVCSDKHKWCKWKL
length: 33 aa
molecular_weight: 3595 Da
source_organism: Ornithoctonus huwena (Chinese bird spider)
venom_type: Spider (Theraphosidae)
target: N-type calcium channels (Cav2.2) and nAChRs
mechanism: Dual blocker of N-type Ca2+ channels and nicotinic receptors
potency: Very high
therapeutic_potential: Analgesic lead; dual-target pain therapy
category: Dual calcium/nAChR blocker (spider toxin)
```

Huwentoxin-I is a dual-target toxin from the Chinese bird spider that blocks both N-type calcium channels and nicotinic acetylcholine receptors. This dual mechanism provides potent analgesia through complementary pathways, making it an attractive template for developing multi-target non-opioid analgesics.

---

### 35. Huwentoxin-IV

```yaml
id: huwentoxin-iv
name: Huwentoxin-IV
sequence: ECLGFGKGCNPSNDQCCKSSNLVCSRKHRWCKYEI
length: 35 aa
molecular_weight: 3943 Da
source_organism: Ornithoctonus huwena (Chinese bird spider)
venom_type: Spider (Theraphosidae)
target: Nav1.7 voltage-gated sodium channel
mechanism: Selective blocker of Nav1.7; inhibits pain signaling
potency: Very high
therapeutic_potential: Non-opioid analgesic for chronic pain; Nav1.7 drug lead
category: Sodium channel blocker (spider toxin)
```

Huwentoxin-IV selectively blocks Nav1.7 sodium channels, which are essential for pain signaling in humans (loss-of-function mutations cause congenital insensitivity to pain). Unlike opioid analgesics, Nav1.7 blockers provide analgesia without addiction risk, respiratory depression, or tolerance development.

---

### 36. ProTx-II

```yaml
id: protx-ii
name: ProTx-II (Protoxin-II)
sequence: DCLGFMEKCPSDTHCCRRYGWCAIGPWCKCWP
length: 30 aa
molecular_weight: 3446 Da
source_organism: Thrixopelma pruriens (Peruvian green velvet tarantula)
venom_type: Spider (Theraphosidae)
target: Nav1.7 and other Nav subtypes; Cav3.1
mechanism: Inhibits Nav1.7 by shifting activation to depolarized potentials
potency: Very high
therapeutic_potential: Lead compound for Nav1.7-targeted analgesics
category: Sodium channel blocker (spider toxin)
```

ProTx-II is a tarantula venom peptide that potently blocks Nav1.7 sodium channels by shifting voltage-dependent activation to more depolarized potentials. Nav1.7 is a validated pain target (human genetics), and ProTx-II serves as a key structural template for developing next-generation non-opioid analgesics.

---

### 37. GsAF-IV

```yaml
id: gsaf-iv
name: GsAF-IV
sequence: DCLGFMEKCPSDTHCCRRYGWCAIGPWCKCWP (related to ProTx-II)
length: ~30 aa
molecular_weight: ~3500 Da
source_organism: Grammostola rosea (Chilean rose tarantula)
venom_type: Spider (Theraphosidae)
target: Nav and Kv channels
mechanism: Dual blocker of sodium and potassium channels
potency: High
therapeutic_potential: Multi-channel blocker for pain research
category: Dual Nav/Kv blocker (spider toxin)
```

GsAF-IV is a tarantula venom peptide with broad ion channel activity, blocking both voltage-gated sodium and potassium channels. This multi-channel profile makes it useful for studying the interplay between Nav and Kv channels in neuronal excitability and for developing broad-spectrum analgesics.

---

### 38. PhTx3

```yaml
id: phtx3
name: PhTx3 (PhTx3-4/PhTx3-5)
sequence: Multiple components (peptide fraction)
length: Variable (multiple peptides)
molecular_weight: Variable (~4000-6000 Da per component)
source_organism: Phoneutria nigriventer (Brazilian wandering spider)
venom_type: Spider (Ctenidae)
target: Voltage-gated calcium channels (Cav)
mechanism: Blockers of multiple calcium channel subtypes; inhibit glutamate release
potency: Very high
therapeutic_potential: Neuroprotection; ischemic stroke; chronic pain
category: Calcium channel blocker (spider toxin)
```

PhTx3 is a fraction from Brazilian wandering spider venom containing multiple calcium channel-blocking peptides. These peptides inhibit presynaptic calcium channels, reducing glutamate release and providing neuroprotection in ischemic models. Being investigated for stroke neuroprotection and chronic pain management.

---

### 39. δ-Palutoxins

```yaml
id: delta-palutoxins
name: δ-Palutoxins (δ-PalUTx-1, -2, -3, -4)
sequence: Various (cysteine-rich peptides)
length: ~35-40 aa
molecular_weight: ~4000 Da
source_organism: Paracoelotes luctuosus (funnel-web spider)
venom_type: Spider (Agelenidae)
target: Voltage-gated sodium channels (Nav)
mechanism: Delay sodium channel inactivation; activate Nav (site 3 binding)
potency: Very high
therapeutic_potential: Study of Nav channel gating; insecticide development
category: Sodium channel activator (spider toxin)
```

δ-Palutoxins are a family of sodium channel-activating peptides from the Mediterranean funnel-web spider. They bind to receptor site 3 on Nav channels, delaying inactivation and causing persistent sodium currents. Their selectivity for insect over mammalian channels makes them leads for developing selective insecticides.

---

### 40. CSTX-1

```yaml
id: cstx-1
name: CSTX-1 (Cupiennin salei toxin-1)
sequence: KWCFRACFGHSCNRIGRRGRSCQWLCMRLRG (partial)
length: ~30 aa
molecular_weight: ~3500 Da
source_organism: Cupiennius salei (wandering spider)
venom_type: Spider (Ctenidae)
target: Voltage-gated calcium channels (Cav)
mechanism: Blocker of presynaptic calcium channels
potency: High
therapeutic_potential: Calcium channel research; neuroprotection
category: Calcium channel blocker (spider toxin)
```

CSTX-1 is a calcium channel-blocking peptide from the wandering spider Cupiennius salei. It blocks presynaptic calcium channels, inhibiting neurotransmitter release. Studied primarily in the context of prey capture mechanisms and as a tool for understanding calcium channel pharmacology.

---

## Bee and Wasp Venom Peptides

### 41. Melittin

```yaml
id: melittin
name: Melittin
sequence: GIGAVLKVLTTGLPALISWIKRKRQQ
length: 26 aa
molecular_weight: 2846 Da
source_organism: Apis mellifera (honey bee)
venom_type: Bee (Apidae)
target: Cell membranes (phospholipid bilayer)
mechanism: Membrane disruption via pore formation and lipid bilayer perturbation
potency: High (LD50 ~2.8 mg/kg mouse, IV)
therapeutic_potential: Antimicrobial; anticancer; drug delivery enhancer
category: Cytolytic peptide (bee venom)
```

Melittin constitutes ~50% of dry bee venom weight. It is a powerful hemolytic peptide that disrupts lipid bilayers through pore formation and carpet-like mechanisms. It has broad antimicrobial, anti-inflammatory, and anticancer properties, and is being investigated as a drug delivery enhancer and as a component of targeted anticancer therapies.

---

### 42. Apamin

```yaml
id: apamin
name: Apamin
sequence: CNCKAPETALCARRCQQH
length: 18 aa
molecular_weight: 2027 Da
source_organism: Apis mellifera (honey bee)
venom_type: Bee (Apidae)
target: KCa2.x (SK) small conductance calcium-activated potassium channels
mechanism: Selective blocker of SK channels; prevents afterhyperpolarization
potency: Moderate-high (LD50 ~4.0 mg/kg mouse, IV)
therapeutic_potential: Memory enhancement; epilepsy research; neurodegeneration
category: Neurotoxin (bee venom)
```

Apamin is the smallest known neurotoxic peptide and the only known selective blocker of small conductance calcium-activated potassium (SK) channels. It crosses the blood-brain barrier and enhances neuronal excitability by preventing afterhyperpolarization. Being studied for memory enhancement and as a tool for understanding synaptic plasticity.

---

### 43. Mastoparan

```yaml
id: mastoparan
name: Mastoparan
sequence: INLKALAALAKKIL
length: 14 aa
molecular_weight: 1478 Da
source_organism: Vespula lewisii (Asian hornet/wasp)
venom_type: Wasp (Vespidae)
target: G-proteins (Gαi/o); mast cells; cell membranes
mechanism: Activates G-proteins directly; causes mast cell degranulation; membrane disruption
potency: Moderate-high
therapeutic_potential: G-protein research tool; antimicrobial; adjuvant
category: G-protein activator/cytolytic peptide (wasp venom)
```

Mastoparan is an amphipathic tetradecapeptide that directly activates heterotrimeric G-proteins by mimicking the activated GPCR. It also disrupts membranes and causes mast cell degranulation. Widely used as a pharmacological tool for studying G-protein signaling and as a template for developing antimicrobial peptides.

---

### 44. Philanthotoxin

```yaml
id: philanthotoxin
name: Philanthotoxin (PhTX-343)
sequence: Polyamine-containing toxin (modified tyrosine + spermine)
length: 3 (non-standard amino acids + polyamine)
molecular_weight: ~470 Da
source_organism: Philanthus triangulum (European beewolf)
venom_type: Wasp (Sphecidae)
target: Nicotinic acetylcholine receptors and ionotropic glutamate receptors
mechanism: Open-channel blocker of nAChRs and AMPA/kainate receptors
potency: Moderate-high
therapeutic_potential: Lead for AMPA receptor antagonists; neuroprotection; anticonvulsant
category: nAChR/glutamate receptor blocker (wasp venom)
```

Philanthotoxin is a unique polyamine-containing toxin from the beewolf wasp that blocks both nicotinic acetylcholine receptors and ionotropic glutamate receptors. Its open-channel blocking mechanism and polyamine pharmacophore have inspired development of synthetic analogs (PhTX-343, Joro spider toxin analogs) as neuroprotective agents.

---

### 45. Crabrolin

```yaml
id: crabrolin
name: Crabrolin
sequence: FLPLIGRVLSGIL (or FLPLIGRIL)
length: 13 aa
molecular_weight: ~1400 Da
source_organism: Vespa crabro (European hornet)
venom_type: Wasp (Vespidae)
target: Mast cells; cell membranes
mechanism: Mast cell degranulation; membrane perturbation
potency: Moderate
therapeutic_potential: Antimicrobial lead; mast cell research
category: Mast cell degranulating peptide (wasp venom)
```

Crabrolin is a mast cell-degranulating peptide from European hornet venom. It causes histamine release from mast cells, contributing to the inflammatory response to hornet stings. Its amphipathic structure and membrane-perturbing activity make it a template for developing antimicrobial peptides.

---

## Marine Venom Peptides

### 46. Conotoxin (Generic)

```yaml
id: conotoxin-generic
name: Conotoxin (various Conus)
sequence: Various (diverse superfamilies)
length: 10-40 aa (variable)
molecular_weight: 1000-5000 Da (variable)
source_organism: Various Conus species (cone snails)
venom_type: Cone snail (Conidae)
target: Multiple targets (Nav, Cav, nAChR, NMDA, 5-HT3, NET, etc.)
mechanism: Diverse mechanisms across >10 superfamilies
potency: Variable (moderate to extremely high)
therapeutic_potential: >100,000 estimated unique conotoxins; vast drug discovery potential
category: Diverse peptide toxin superfamily
```

Conotoxins represent the largest known family of peptide toxins, with an estimated 100,000+ unique sequences across ~800 Conus species. They are classified into superfamilies (A, M, O, P, S, T, etc.) based on signal peptide sequence and cysteine framework. Multiple conotoxins are in clinical development, and ziconotide is FDA-approved.

---

### 47. ShK

```yaml
id: shk
name: ShK (Stichodactyla helianthus K+ channel toxin)
sequence: RSCIDTIPKSRCTAFQCKHSMKYRLSFCRCTKLC
length: 35 aa
molecular_weight: 4054 Da
source_organism: Stichodactyla helianthus (sunburst sea anemone)
venom_type: Sea anemone (Actiniidae)
target: Kv1.3 voltage-gated potassium channel
mechanism: Potent pore blocker of Kv1.3 channels
potency: Very high
therapeutic_potential: Immunosuppressant for autoimmune diseases (dalazatide/ShK-186 in clinical trials)
category: Potassium channel blocker (sea anemone toxin)
```

ShK is a sea anemone toxin that potently blocks Kv1.3 potassium channels essential for T-cell activation. The synthetic analog dalazatide (ShK-186) is in clinical trials for autoimmune diseases including type 1 diabetes, multiple sclerosis, and rheumatoid arthritis. It provides immunosuppression without broad immunosuppressive side effects.

---

### 48. Charybdopsis

```yaml
id: charybdopsis
name: Charybdopsis (BgK-related)
sequence: KCSGDRCRDTCCTGFYCKC (related to BgK)
length: ~37 aa
molecular_weight: ~4000 Da
source_organism: Sea anemone (various Actiniaria)
venom_type: Sea anemone
target: Voltage-gated potassium channels (Kv1 family)
mechanism: Pore-blocking toxin of K+ channels
potency: High
therapeutic_potential: Research tool for K+ channel pharmacology
category: Potassium channel blocker (sea anemone toxin)
```

Charybdopsis-type toxins are K+ channel-blocking peptides from sea anemones that share structural features with scorpion K+ channel toxins. They block Kv1-family channels and have been valuable for studying K+ channel structure-function relationships and for developing immunosuppressive peptides.

---

### 49. BDS-I

```yaml
id: bds-i
name: BDS-I (Blood Depressor Substance I)
sequence: AKCQKRLDSDCQEYCCQGYCQGRC (partial)
length: 43 aa
molecular_weight: ~4500 Da
source_organism: Anemonia sulcata (snakelocks sea anemone)
venom_type: Sea anemone (Actiniidae)
target: Kv3.4 voltage-gated potassium channel
mechanism: Selective blocker of Kv3.4 channels
potency: High
therapeutic_potential: Pain research (Kv3.4 role in nociception); neuroprotection
category: Potassium channel blocker (sea anemone toxin)
```

BDS-I is a selective blocker of Kv3.4 potassium channels from the snakelocks sea anemone. Kv3.4 channels are expressed in sensory neurons and are implicated in pain signaling. BDS-I has been valuable for studying the role of Kv3.4 in nociception and for developing targeted analgesics.

---

### 50. ATX-II

```yaml
id: atx-ii
name: ATX-II (Anemonia toxin II)
sequence: ACRCYDTPCSSGKTCRGYTCSCKPDGCYNN (partial)
length: 46 aa
molecular_weight: ~4900 Da
source_organism: Anemonia sulcata (snakelocks sea anemone)
venom_type: Sea anemone (Actiniidae)
target: Voltage-gated sodium channels (Nav)
mechanism: Delays sodium channel inactivation (binds site 3); persistent Na+ current
potency: Very high
therapeutic_potential: Tool for studying Nav inactivation; cardiac arrhythmia research
category: Sodium channel activator (sea anemone toxin)
```

ATX-II is a sea anemone toxin that delays voltage-gated sodium channel inactivation by binding to receptor site 3, causing persistent sodium currents. It has been extensively used to study cardiac sodium channel function and to model long QT syndrome type 3 (SCN5A gain-of-function mutations) in cardiac arrhythmia research.

---

## Summary Statistics

| Category | Count | Primary Targets |
|----------|-------|-----------------|
| Snake Venoms | 10 | nAChR, Nav, PLA2, K+, ET receptors |
| Cone Snail Venoms | 10 | Cav, Nav, nAChR, K+, NET |
| Scorpion Venoms | 10 | K+, Nav, Cl-, glioma |
| Spider Venoms | 10 | Cav, Nav, K+, glutamate, nAChR |
| Bee/Wasp Venoms | 5 | Membranes, K+, G-proteins, nAChR |
| Marine Venoms | 5 | K+, Nav |
| **Total** | **50** | |

## Key Therapeutic Applications

- **Pain Management**: Ziconotide (ω-conotoxin MVIIA), Vc1.1, Huwentoxin-IV, ProTx-II, BmK AGAP
- **Immunosuppression**: ShK (dalazatide), Margatoxin, Noxiustoxin
- **Cancer**: Chlorotoxin (Tozuleristide), Melittin
- **Neuroscience Research**: α-Bungarotoxin, Dendrotoxin, Apamin, ω-Agatoxin IVA
- **Cardiac Research**: ATX-II, Charybdotoxin, Iberiotoxin
- **Drug Delivery**: Crotamine, Melittin
