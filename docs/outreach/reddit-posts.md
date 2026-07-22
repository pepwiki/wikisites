# Reddit Post Templates — Wikipept Outreach

These templates are designed for posting on relevant Reddit communities. Each is customized to subreddit rules and culture. Always read and follow subreddit rules before posting.

---

## Subreddit: r/peptides

### Post 1: Tool Introduction

**Title:** I built a free peptide calculator suite — molecular weight, reconstitution, dosing, and more

**Body:**

Hey everyone,

I've been working on a set of free peptide calculators that I think this community might find useful. No ads, no signup, no premium tier — just clean tools.

**What's included:**

- **Molecular Weight Calculator** — Handles modifications (phospho, acetyl, etc.) and disulfide bonds
- **Reconstitution Calculator** — Input your peptide mass and desired concentration, get exact solvent volume
- **Dose Calculator** — Convert between mg, μg, and insulin syringe units
- **Stability Predictor** — Analyze your sequence for protease susceptibility

**Links:**
- Tools: https://wikipept.com/tools
- GitHub (all open source): https://github.com/wikisites

Everything is peer-reviewed and cited with primary literature. Works on mobile too.

Would love feedback on what other tools would be useful. Currently working on a peptide-drug interaction checker and an antimicrobial peptide designer.

**Flair:** Resource/Tool

---

### Post 2: Educational Content

**Title:** Quick reference: Peptide storage conditions (lyophilized vs reconstituted)

**Body:**

Made a quick reference card for peptide storage based on common questions I see here:

**Lyophilized:**
- Short term (<1 month): 4°C with desiccant
- Medium term (1-12 months): -20°C
- Long term (>12 months): -80°C

**Reconstituted:**
- Working solution: 2-8°C, use within 21-30 days
- Long term: -20°C or -80°C (aliquot first!)
- Avoid freeze-thaw cycles — each one degrades 5-15%

**Special cases:**
- Cysteine-containing: Add TCEP or store under nitrogen
- Light-sensitive (Trp-containing): Wrap in foil
- Dilute solutions: Add 0.1% BSA to prevent adsorption

Full reference with compound-specific data: https://wikipept.com/reference/storage

Hope this helps someone. Let me know if you want me to add anything.

**Flair:** Educational

---

### Post 3: Discussion Starter

**Title:** What's your go-to reconstitution solvent for hydrophobic peptides?

**Body:**

Curious what solvent people are having the best luck with for hydrophobic peptides.

I've been using 10-30% acetic acid for most things, but some peptides just won't dissolve without DMSO. For research purposes obviously.

Anyone tried:
- 5% acetic acid + sonication?
- Straight DMSO then dilute?
- Various buffers with surfactants?

Also, for those interested, there's a reconstitution calculator at https://wikipept.com/tools/reconstitution that suggests solvents based on peptide properties. Might be useful for those just starting out.

What's worked for you?

**Flair:** Discussion

---

### Post 4: Protocol Sharing

**Title:** My reconstitution protocol — haven't lost a vial in 2 years

**Body:**

After some expensive mistakes early on, here's the protocol I've settled on:

1. Centrifuge vial 10 seconds (get powder to bottom)
2. Calculate volume: mass (mg) ÷ desired conc (mg/mL) = volume (mL)
3. Add 70% of calculated volume slowly down the vial wall
4. Wait 2-3 minutes — let solvent soak in
5. Gentle swirl (don't vortex!)
6. Check clarity — if cloudy, sonicate 30s in bath sonicator
7. Add remaining solvent to reach target volume
8. Aliquot into single-use volumes
9. Store at -20°C

**Key learnings:**
- Patience > force. Let the solvent work.
- Aliquot BEFORE first use. Every time.
- Low-binding polypropylene tubes > glass

Calculator if you want to double-check your math: https://wikipept.com/tools/reconstitution

What's your protocol? Anything I'm missing?

**Flair:** Protocol

---

### Post 5: Data/Dashboard

**Title:** [Data] Half-life comparison of common research peptides — compiled from literature

**Body:**

I compiled half-life data for ~50 common research peptides from published PK studies. Thought it might be useful.

**Top 10 by half-life (subcutaneous, rodents/humans):**

| Peptide | Half-life | Key Modification |
|---------|-----------|------------------|
| Semaglutide | 165 hours | C18 fatty acid, Aib substitution |
| Tirzepatide | 90 hours | C20 fatty acid, GIP backbone |
| Liraglutide | 13 hours | C16 fatty acid |
| Exenatide | 2.5 hours | Exendin-4 backbone |
| CJC-1295 | 6-8 hours | D-Ala substitution, DAC |
| BPC-157 | 2-4 hours | Stable pentadecapeptide |
| Thymosin α1 | 2 hours | Acetylated N-terminus |
| Melanotan II | 1-2 hours | Cyclized, D-amino acids |
| PT-141 | 2-3 hours | Modified melanocortin |
| GHRP-6 | 20-30 minutes | His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 |

**Notes:**
- Half-life varies significantly by species, route, and formulation
- Human data preferred when available
- Fatty acid acylation is the most effective half-life extension strategy

Full dataset and stability predictor: https://wikipept.com/tools/stability-predictor

**Flair:** Data

---

## Subreddit: r/biochemistry

### Post 1: Educational Resource

**Title:** Free peer-reviewed peptide encyclopedia with interactive tools — useful for coursework and research

**Body:**

I wanted to share a resource that might be helpful for students and researchers in this community.

Wikipept (wikipept.com) is a free, open-source peptide encyclopedia with:

- **Peer-reviewed compound profiles** — structures, mechanisms, PK data, clinical references
- **Interactive calculators** — molecular weight, pI, reconstitution, concentration
- **Comparison tools** — side-by-side data for therapeutic peptides
- **Reference database** — searchable by sequence, modification, or target

**Why it might be useful for this sub:**
- Good for coursework (medicinal chemistry, pharmacology, biochemistry)
- All citations link to primary literature
- Tools work on mobile
- No registration or institutional subscription needed

**Links:**
- Main site: https://wikipept.com
- Calculators: https://wikipept.com/tools
- GitHub (open source): https://github.com/wikisites

Would appreciate any feedback or suggestions for improvement.

---

### Post 2: Methodology Discussion

**Title:** How do you calculate isoelectric point for modified peptides? pKa values seem inconsistent

**Body:**

I've been working on a pI calculator and running into inconsistencies with pKa values for modified residues.

**The problem:**
- Standard pKa values (Lehninger, Stryer) give reasonable results for unmodified peptides
- But for phospho-Ser, acetyl-Lys, methylated Arg, etc., the values vary wildly between sources
- Different software (ExPASy, EMBOSS, custom) gives different pI values

**What I've found:**
- Most tools use Henderson-Hasselbalch iteration
- The real issue is pKa selection for modified residues
- Empirical pKa values from experimental data are sparse

**Current approach:**
```python
# Using published pKa values where available
MODIFIED_PKA = {
    'phospho_S': 5.9,  # From Thurlkill et al 2006
    'acetyl_K': 10.0,  # Reduced from 10.5
    # ... etc
}
```

Anyone have good references for modified residue pKa values? Or a better approach?

I've been compiling values at https://wikipept.com/tools/pi-calculator if anyone wants to contribute or check against their data.

---

### Post 3: Concept Explanation

**Title:** ELI5: Why do peptides need special handling compared to small molecule drugs?

**Body:**

Got asked this by an undergrad in lab and thought it might be a good discussion topic.

**Simple explanation:**

Small molecule drugs (like aspirin) are like LEGOs — sturdy, don't fall apart easily, you can store them in a bottle for years.

Peptide drugs are like origami — same atoms, but the specific 3D shape is what makes them work. And that shape is fragile.

**Why peptides are tricky:**

1. **Enzymes chop them up** — Your body has proteases everywhere. A peptide that lasts hours in a test tube might last minutes in blood.

2. **Shape matters** — A tiny change (wrong pH, wrong temperature, wrong solvent) can unfold the peptide and kill its activity.

3. **They're sticky** — Peptides love to stick to plastic, glass, and each other. This means you lose material during handling.

4. **They're fragile** — Freeze-thaw cycles, oxidation, and light can all damage them.

**Practical implications:**
- Store cold, aliquot immediately
- Use low-binding tubes
- Reconstitute carefully (not too fast, not too vigorous)
- Check purity before important experiments

For more detailed storage and handling protocols: https://wikipept.com/reference/storage

---

## Subreddit: r/Pharmacology

### Post 1: Drug Comparison

**Title:** Comprehensive comparison: GLP-1 agonists (semaglutide vs tirzepatide vs liraglutide) — clinical data summary

**Body:**

Compiled clinical data for the major GLP-1 agonists. Hope this is useful for anyone studying or prescribing these.

**Head-to-Head Comparison:**

| Parameter | Semaglutide | Tirzepatide | Liraglutide |
|-----------|-------------|-------------|-------------|
| **Target** | GLP-1R | GLP-1R + GIPR | GLP-1R |
| **Half-life** | 165 hours | 90 hours | 13 hours |
| **Dosing** | Once weekly | Once weekly | Once daily |
| **HbA1c reduction** | 1.0-1.8% | 1.6-2.4% | 0.8-1.5% |
| **Weight loss** | 12-17% | 18-22% | 5-8% |
| **CV outcomes** | SELECT positive | SURPASS-CVOT ongoing | LEADER positive |

**Key Clinical Pearls:**
- Tirzepatide's dual agonism provides additive glycemic/weight effects
- Semaglutide has most extensive CV outcome data
- All require dose titration over 4-8 weeks
- GI side effects are class effect (15-20%)
- Contraindicated in MEN2/MTC family history

**Dosing conversion note:** These are NOT interchangeable. Different molecules, different PK.

Full comparison with trial data: https://wikipept.com/compounds/semaglutide-vs-tirzepatide

**Flair:** Drug Information

---

### Post 2: Mechanism Deep Dive

**Title:** The pharmacology of GLP-1 receptor agonists — beyond insulin secretion

**Body:**

GLP-1 agonists are often introduced as "insulin secretagogues" but their pharmacology is much more complex. Here's a deeper look.

**Central Nervous System:**
- Hypothalamic appetite suppression (PVN, ARC nuclei)
- Reward pathway modulation (reduced food reward)
- Nausea via area postrema (dose-limiting)

**Cardiovascular:**
- Heart rate increase (+2-4 bpm, usually transient)
- Blood pressure reduction (-2 to -5 mmHg)
- Anti-inflammatory effects on endothelium
- Possible direct cardiomyocyte effects

**Gastrointestinal:**
- Delayed gastric emptying (acute effect, attenuates over time)
- Reduced postprandial glucagon
- Altered gut motility

**Metabolic:**
- Increased insulin sensitivity
- Reduced hepatic glucose output
- Improved lipid metabolism
- Brown adipose tissue activation (preclinical)

**Why this matters clinically:**
- CV benefit may be independent of glycemic control
- Weight loss mechanism involves central + peripheral effects
- GI side effects are on-target, not adverse effects per se

Detailed pharmacology: https://wikipept.com/compounds/semaglutide

---

### Post 3: Clinical Pearls

**Title:** Practical tips for GLP-1 agonist prescribing — from a clinical pharmacology perspective

**Body:**

Some practical points that aren't always emphasized in guidelines:

**1. Titration matters more than dose**
- Start low (0.25 mg semaglutide, 2.5 mg tirzepatide)
- Increase every 4 weeks (not 2)
- Many patients do well on moderate doses — don't always push to max

**2. Injection site rotation**
- Absorption varies by site (abdomen > thigh > arm)
- Consistent site = consistent levels
- Teach patients proper rotation technique

**3. Timing with oral medications**
- GLP-1 agonists delay gastric emptying
- Take oral meds 1 hour before injection or separate by 12 hours
- Especially important for narrow therapeutic index drugs

**4. Management of GI side effects**
- Dietary modification (smaller meals, low fat)
- Anti-emetics if needed (ondansetron PRN)
- Don't increase dose until tolerated

**5. Pre-surgical considerations**
- HOLD on day of surgery (aspiration risk)
- Some guidelines recommend holding 1 week before elective surgery
- Coordinate with anesthesia

Comparison tools: https://wikipept.com/compounds/semaglutide-vs-tirzepatide

---

## Reddit Posting Rules Compliance Notes

### r/peptides
- **Allowed:** Personal experience, questions, educational content
- **Not allowed:** Vendor promotions, sourcing, "how to use" without context
- **Self-promotion:** Allowed if <10% of posts, genuine contribution
- **Flair required:** Use appropriate flair

### r/biochemistry
- **Allowed:** Educational content, methodology, concepts
- **Not allowed:** Homework help (post in megathread), vendor content
- **Self-promotion:** Must be genuinely educational, not promotional
- **Citations required:** Link to primary literature when possible

### r/Pharmacology
- **Allowed:** Drug information, clinical pharmacology, mechanisms
- **Not allowed:** Medical advice, personal dosing questions
- **Self-promotion:** Educational resources allowed if genuinely useful
- **Expert flair:** Available for verified professionals

### General Reddit Rules
- **90/10 Rule:** Max 10% self-promotion across all posts
- **Genuine engagement:** Comment on others' posts before promoting your own
- **No vote manipulation:** Don't ask for upvotes
- **Transparency:** Disclose affiliations when relevant
- **Value first:** Every post should be useful even without your link

### Pre-Posting Checklist
- [ ] Read subreddit rules completely
- [ ] Check if similar content was recently posted
- [ ] Ensure post is genuinely useful to community
- [ ] Keep links natural (1-2 per post maximum)
- [ ] Use appropriate flair
- [ ] Respond to comments promptly
- [ ] Don't argue with moderators
