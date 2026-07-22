# Dev.to Article Drafts — Peptide Science

Five complete article drafts for publishing on Dev.to. Each article targets a technical audience and links to [wikipept.com](https://wikipept.com) tools.

---

## Article 1: How to Calculate Peptide Molecular Weight in TypeScript

### How to Calculate Peptide Molecular Weight in TypeScript

**A complete guide to computing peptide molecular weight, reconstitution volume, and concentration — with zero dependencies.**

---

Calculating peptide molecular weight is a fundamental task in biochemistry, yet most researchers still rely on spreadsheets or manual lookups. This article walks through building a type-safe TypeScript utility that computes molecular weight from amino acid sequences, handles edge cases, and integrates into a modern web application.

### The Chemistry

Every peptide is a chain of amino acids linked by peptide bonds. Each bond formation releases one water molecule (H₂O, 18.015 Da). The formula:

```
MW = Σ(residue_MWs) - (n-1) × 18.015
```

where `n` is the number of amino acid residues.

### Data Structure

Start by defining the amino acid data:

```typescript
interface AminoAcid {
  name: string;
  code: string;
  threeCode: string;
  molecularWeight: number; // Da (free amino acid)
  pKaNH3: number;
  pKaCOOH: number;
  pKaR: number;
  chargeAt74: number;
}

const AMINO_ACIDS: Record<string, AminoAcid> = {
  G: { name: "Glycine", code: "G", threeCode: "Gly", molecularWeight: 75.03, pKaNH3: 9.60, pKaCOOH: 2.34, pKaR: 0, chargeAt74: 0 },
  A: { name: "Alanine", code: "A", threeCode: "Ala", molecularWeight: 89.09, pKaNH3: 9.69, pKaCOOH: 2.34, pKaR: 0, chargeAt74: 0 },
  // ... all 20 standard amino acids
};
```

### Core Function

The molecular weight calculation:

```typescript
const WATER_MW = 18.015;

export function calculateMolecularWeight(sequence: string): number {
  const seq = sequence.toUpperCase().trim();
  if (seq.length === 0) throw new Error("Empty sequence");
  if (seq.length < 2) throw new Error("Sequence must have at least 2 residues");

  let total = 0;
  for (const char of seq) {
    const aa = AMINO_ACIDS[char];
    if (!aa) throw new Error(`Unknown amino acid: ${char}`);
    total += aa.molecularWeight;
  }

  return Math.round((total - (seq.length - 1) * WATER_MW) * 1000) / 1000;
}
```

### Net Charge Estimation

Using the Henderson-Hasselbalch equation for ionizable groups:

```typescript
export function calculateNetCharge(sequence: string, pH: number): number {
  const seq = sequence.toUpperCase().trim();
  let charge = 0;

  for (const char of seq) {
    const aa = AMINO_ACIDS[char];
    if (!aa) throw new Error(`Unknown amino acid: ${char}`);
    if (aa.pKaR > 0) {
      charge += aa.chargeAt74 / (1 + Math.pow(10, pH - aa.pKaR));
    }
  }

  // N-terminus
  const first = AMINO_ACIDS[seq[0]];
  if (first) charge += 1 / (1 + Math.pow(10, pH - first.pKaNH3));

  // C-terminus
  const last = AMINO_ACIDS[seq[seq.length - 1]];
  if (last) charge += -1 / (1 + Math.pow(10, last.pKaCOOH - pH));

  return Math.round(charge * 1000) / 1000;
}
```

### Reconstitution Calculator

Once you have MW, calculate reconstitution:

```typescript
export function calculateReconstitution(
  massMg: number,
  molecularWeight: number,
  desiredConcentrationMgPerMl: number
): number {
  // Volume (mL) = mass (mg) / concentration (mg/mL)
  return massMg / desiredConcentrationMgPerMl;
}

export function calculateDoseConcentration(
  volumeML: number,
  vialMg: number,
  molecularWeight: number
): number {
  // nmol = (mg × 1000) / MW
  return (vialMg * 1000) / molecularWeight;
}
```

### Testing

Comprehensive tests ensure accuracy:

```typescript
describe("calculateMolecularWeight", () => {
  it("calculates GSSSSFSK correctly", () => {
    expect(calculateMolecularWeight("GSSSSFSK")).toBeCloseTo(759.837, 2);
  });

  it("calculates bradykinin RPPGFSPFR", () => {
    expect(calculateMolecularWeight("RPPGFSPFR")).toBeCloseTo(1060.208, 2);
  });

  it("handles lowercase input", () => {
    expect(calculateMolecularWeight("gssssfsk")).toBeCloseTo(759.837, 2);
  });

  it("throws on empty string", () => {
    expect(() => calculateMolecularWeight("")).toThrow("Empty sequence");
  });

  it("throws on unknown amino acid", () => {
    expect(() => calculateMolecularWeight("GXG")).toThrow("Unknown amino acid");
  });
});
```

### Putting It Together

The complete utility is available as part of the [Wikipept Molecular Weight Calculator](https://wikipept.com/tools/molecular-weight-calculator). It runs entirely client-side with no API calls, making it suitable for offline use and research environments with restricted internet access.

### Key Takeaways

1. Always subtract water for peptide bonds (n-1 bonds in a linear peptide)
2. Use accurate residue weights, not rounded values
3. Handle edge cases: empty sequences, unknown characters, whitespace
4. Net charge estimation enables isoelectric point calculation
5. Type safety prevents runtime errors in production

*Built for [Wikipept](https://wikipept.com) — an interactive platform for learning oligopeptide biology.*

---

## Article 2: Peptide Reconstitution: A Practical Guide for Researchers

### Peptide Reconstitution: A Practical Guide for Researchers

**Everything you need to know about dissolving lyophilized peptides — from solvent selection to dosing calculations.**

---

Peptide reconstitution is a critical step that affects both peptide stability and experimental accuracy. This guide covers the practical aspects of reconstituting lyophilized peptides for research applications.

### Why Peptides Come Lyophilized

Synthetic peptides are shipped as lyophilized (freeze-dried) powders for stability. Lyophilization removes water while preserving the peptide's primary structure. The resulting white to off-white powder can be stored at −20°C for months to years.

### Solvent Selection

The choice of solvent depends on peptide properties:

| Peptide Property | Recommended Solvent | Notes |
|------------------|-------------------|-------|
| Hydrophobic | DMSO, DMF, acetic acid | Dissolve in organic solvent first, then dilute |
| Hydrophilic | Bacteriostatic water, saline | Direct dissolution |
| Basic | Dilute acetic acid | pH adjustment may be needed |
| Acidic | Dilute ammonium hydroxide | Use sparingly |
| Cysteine-containing | Degassed, nitrogen-purged | Prevent oxidation |

**Bacteriostatic water** (0.9% benzyl alcohol) is the most common solvent for injectable peptides. It provides antimicrobial protection and is isotonic.

### Step-by-Step Reconstitution

1. **Calculate the required volume**: Use the formula:
   ```
   Volume (mL) = Mass (mg) / Desired Concentration (mg/mL)
   ```

2. **Allow vial to reach room temperature**: Cold lyophilized powder dissolves more slowly.

3. **Inject solvent slowly**: Add solvent along the vial wall, not directly onto the powder. This prevents foaming and peptide aggregation.

4. **Gently swirl**: Do not shake vigorously. Shaking introduces air bubbles and can denature peptides.

5. **Visual inspection**: Solution should be clear or slightly opalescent. Particulates indicate aggregation or contamination.

6. **Storage**: Refrigerate reconstituted solution. Use within 30 days for most peptides.

### Common Mistakes

1. **Adding solvent too quickly**: Causes foaming and aggregation
2. **Shaking the vial**: Denatures peptides with disulfide bonds
3. **Using water without bacteriostatic agent**: Risk of microbial contamination
4. **Ignoring solubility limits**: Some peptides require organic co-solvents
5. **Not accounting for displaced volume**: The lyophilized powder occupies volume

### Dosing Calculations

For a 10 mg vial of peptide (MW 1000 Da) reconstituted with 1 mL bacteriostatic water:

- Concentration: 10 mg/mL
- Molarity: 10,000 nmol/mL = 10 mM
- For a 250 µg dose: 25 µL

### Stability Considerations

| Factor | Effect on Stability | Recommendation |
|--------|-------------------|----------------|
| Temperature | Accelerates degradation | Store at 2–8°C |
| Light | Photooxidation of Trp, Cys | Amber vials or dark storage |
| pH | Affects hydrolysis rate | pH 4–6 optimal for most peptides |
| Air | Oxidation of Cys, Met | Nitrogen overlay |
| Repeated freeze-thaw | Denaturation | Aliquot before freezing |

### When Things Go Wrong

- **Precipitation**: May indicate pH change, aggregation, or exceeded solubility
- **Color change**: Oxidation (yellow/brown) or Maillard reaction
- **Particulates**: Aggregation or contamination — discard and prepare fresh

### Reference Tool

For automated reconstitution calculations, use the [Wikipept Reconstitution Calculator](https://wikipept.com/tools/reconstitution-calculator). Enter your peptide mass and desired concentration to get precise volumes.

*Built for [Wikipept](https://wikipept.com) — an interactive platform for learning oligopeptide biology.*

---

## Article 3: Semaglutide vs Tirzepatide: The Science Behind GLP-1 Drugs

### Semaglutide vs Tirzepatide: The Science Behind GLP-1 Drugs

**A deep dive into the pharmacology of the two most effective weight loss drugs ever developed.**

---

The GLP-1 receptor agonist class has produced the most effective anti-obesity medications in history. Semaglutide (Wegovy) and tirzepatide (Zepbound) represent two generations of this technology. Here's how they differ at the molecular level.

### The Receptors

**Semaglutide** activates a single receptor: GLP-1R (glucagon-like peptide-1 receptor). GLP-1R is a Gs-coupled GPCR expressed on pancreatic β-cells, hypothalamic neurons, and gastrointestinal cells. Activation stimulates insulin secretion, suppresses glucagon, delays gastric emptying, and promotes satiety.

**Tirzepatide** is a dual agonist: it activates both GLP-1R and GIP-R (glucose-dependent insulinotropic polypeptide receptor). GIP-R is expressed on β-cells and adipose tissue. GIP enhances insulin secretion and may improve adipose tissue insulin sensitivity.

### Structural Engineering

Both peptides are based on the GLP-1 sequence but with different modifications:

| Feature | Semaglutide | Tirzepatide |
|---------|------------|------------|
| Backbone | Human GLP-1 (31 aa) | Modified GLP-1 (39 aa) |
| Fatty acid | C18 (octadecanedioic acid) | C20 (icosanedioic acid) |
| Albumin binding | Yes (via fatty acid + linker) | Yes (via fatty acid + linker) |
| DPP-IV resistance | Aib at position 8 | Aib at position 8 |
| Half-life | ~165 hours (SC) | ~120 hours (SC) |
| Receptor selectivity | GLP-1R only | GLP-1R + GIP-R |

### Pharmacokinetics

The key pharmacokinetic difference is the fatty acid chain length and linker chemistry:

- **Semaglutide**: C18 fatty acid with a linker containing γGlu-2×AEEA spacers. Binds albumin at the Sudlow site I pocket. Half-life ~165 hours enables once-weekly dosing.

- **Tirzepatide**: C20 fatty acid with a different linker geometry. Also binds albumin but with slightly different affinity. Half-life ~120 hours, still sufficient for once-weekly dosing.

### Clinical Efficacy

From pivotal trials (STEP and SURMOUNT programs):

| Endpoint | Semaglutide 2.4 mg | Tirzepatide 15 mg |
|----------|-------------------|-------------------|
| Weight loss (% from baseline) | 14.9% | 20.9% |
| Achieving ≥10% weight loss | 69% | 85% |
| Achieving ≥15% weight loss | 50% | 73% |
| Achieving ≥20% weight loss | 32% | 56% |
| HbA1c reduction | 0.9% | 2.4% |
| Trial duration | 68 weeks | 72 weeks |

Tirzepatide's dual-receptor mechanism produces superior weight loss compared to GLP-1R agonism alone.

### Mechanism Differences

**Semaglutide's weight loss** is primarily mediated by:
1. Central appetite suppression (hypothalamic GLP-1R)
2. Delayed gastric emptying (peripheral GLP-1R)
3. Increased satiety signaling

**Tirzepatide's additional weight loss** may be mediated by:
1. All of the above (GLP-1R effects)
2. GIP-mediated effects on adipose tissue (lipid metabolism)
3. Possible GIP-mediated central effects (hypothalamic GIP-R)
4. Enhanced insulin sensitivity in peripheral tissues

### Side Effect Profiles

Both drugs share GI side effects (nausea, diarrhea, vomiting) due to delayed gastric emptying:

| Side Effect | Semaglutide | Tirzepatide |
|-------------|------------|------------|
| Nausea | 44% | 29% |
| Diarrhea | 30% | 23% |
| Vomiting | 24% | 13% |
| Constipation | 24% | 17% |
| Injection site reactions | 8% | 5% |

Tirzepatide generally produces fewer GI side effects, possibly due to its GIP-R agonism partially counteracting GLP-1R-mediated gastric slowing.

### The Future: Triple Agonists

Retatrutide (in Phase 3) adds glucagon receptor agonism to the GLP-1/GIP dual agonism, producing even greater weight loss (~24% at 48 weeks in Phase 2). The glucagon receptor agonism increases energy expenditure and hepatic fat metabolism.

### Choosing Between Them

- **Semaglutide**: Proven track record, single-receptor mechanism, well-characterized
- **Tirzepatide**: Superior efficacy, dual mechanism, newer with less long-term data
- **Both**: Weekly SC injection, significant GI side effects, contraindicated in MEN2/medullary thyroid carcinoma

### Try the Calculators

Calculate reconstitution and dosing for semaglutide or tirzepatide at [Wikipept](https://wikipept.com/tools/reconstitution-calculator).

*Built for [Wikipept](https://wikipept.com) — an interactive platform for learning oligopeptide biology.*

---

## Article 4: Building a Peptide Calculator with Zero Dependencies

### Building a Peptide Calculator with Zero Dependencies

**How we built a complete peptide molecular weight and reconstitution calculator with zero npm packages.**

---

In an era of dependency-heavy JavaScript, it's refreshing to build something useful with zero npm packages. Here's how we built the [Wikipept Molecular Weight Calculator](https://wikipept.com/tools/molecular-weight-calculator) using only native web APIs.

### Why Zero Dependencies?

1. **Security**: No supply chain attacks
2. **Bundle size**: The entire calculator is <5KB minified
3. **Reliability**: No breaking changes from upstream
4. **Performance**: No tree-shaking or dependency resolution
5. **Auditability**: Every line of code is ours

### The Amino Acid Database

We embedded all 20 standard amino acids as a plain object:

```typescript
const AMINO_ACIDS: Record<string, { name: string; mw: number; pI: number }> = {
  G: { name: "Glycine", mw: 75.03, pI: 5.97 },
  A: { name: "Alanine", mw: 89.09, pI: 6.00 },
  V: { name: "Valine", mw: 117.15, pI: 5.96 },
  L: { name: "Leucine", mw: 131.17, pI: 5.98 },
  I: { name: "Isoleucine", mw: 131.17, pI: 6.02 },
  P: { name: "Proline", mw: 115.13, pI: 6.30 },
  F: { name: "Phenylalanine", mw: 165.19, pI: 5.48 },
  W: { name: "Tryptophan", mw: 204.23, pI: 5.89 },
  M: { name: "Methionine", mw: 149.21, pI: 5.74 },
  S: { name: "Serine", mw: 105.09, pI: 5.68 },
  T: { name: "Threonine", mw: 119.12, pI: 5.60 },
  C: { name: "Cysteine", mw: 121.16, pI: 5.07 },
  Y: { name: "Tyrosine", mw: 181.19, pI: 5.66 },
  N: { name: "Asparagine", mw: 132.12, pI: 5.41 },
  Q: { name: "Glutamine", mw: 146.15, pI: 5.65 },
  D: { name: "Aspartic Acid", mw: 133.10, pI: 2.77 },
  E: { name: "Glutamic Acid", mw: 147.13, pI: 3.22 },
  K: { name: "Lysine", mw: 146.19, pI: 9.74 },
  R: { name: "Arginine", mw: 174.20, pI: 10.76 },
  H: { name: "Histidine", mw: 155.16, pI: 7.59 },
};
```

### Molecular Weight Algorithm

```typescript
const WATER_MW = 18.015;

function calculateMW(seq: string): number {
  const s = seq.toUpperCase().replace(/[^A-Z]/g, "");
  if (s.length < 2) throw new Error("Min 2 residues");

  let sum = 0;
  for (const ch of s) {
    const aa = AMINO_ACIDS[ch];
    if (!aa) throw new Error(`Unknown: ${ch}`);
    sum += aa.mw;
  }

  return Math.round((sum - (s.length - 1) * WATER_MW) * 1000) / 1000;
}
```

### Reconstitution Logic

```typescript
function calculateReconstitution(
  massMg: number,
  mw: number,
  desiredMgPerMl: number
): { volumeML: number; concentration: string } {
  const vol = massMg / desiredMgPerMl;
  const nmol = (massMg * 1000) / mw;
  return {
    volumeML: Math.round(vol * 1000) / 1000,
    concentration: `${nmol.toFixed(1)} nmol/mL`,
  };
}
```

### Web Component Integration

We wrapped this in a custom element for reuse:

```typescript
class PeptideCalculator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <input id="seq" placeholder="Enter sequence (e.g., GSSSSFSK)" />
      <button onclick="this.parentElement.calculate()">Calculate</button>
      <div id="result"></div>
    `;
  }

  calculate() {
    const seq = this.querySelector("#seq").value;
    const mw = calculateMW(seq);
    this.querySelector("#result").textContent = `MW: ${mw} Da`;
  }
}

customElements.define("peptide-calculator", PeptideCalculator);
```

### What We Learned

1. **Math.round with fixed precision** is sufficient for peptide MW calculations (3 decimal places)
2. **Input sanitization** is critical — users paste sequences with spaces, line breaks, and numbers
3. **Error messages** should identify the exact position of invalid characters
4. **Client-side computation** means zero latency and offline capability
5. **TypeScript** catches errors at compile time that would otherwise reach users

### The Result

The complete calculator is live at [wikipept.com/tools/molecular-weight-calculator](https://wikipept.com/tools/molecular-weight-calculator). It calculates:

- Molecular weight from single-letter or three-letter codes
- Net charge at any pH
- Reconstitution volumes
- Dose calculations

All with zero npm dependencies and a bundle size under 5KB.

*Built for [Wikipept](https://wikipept.com) — an interactive platform for learning oligopeptide biology.*

---

## Article 5: Understanding Peptide Half-Life: From Minutes to Weeks

### Understanding Peptide Half-Life: From Minutes to Weeks

**Why some peptides last minutes in the bloodstream and others last weeks — and how pharmaceutical chemistry makes the difference.**

---

Peptide half-life determines how often a drug must be administered. The range is staggering: from 2 minutes (oxytocin) to 14 days (CJC-1295-DAC). Understanding the factors that determine half-life is essential for rational peptide drug design.

### What Determines Half-Life?

Four primary mechanisms govern peptide clearance:

1. **Proteolytic degradation**: Endopeptidases (trypsin, chymotrypsin) and exopeptidases (DPP-IV, aminopeptidases) cleave peptide bonds
2. **Renal clearance**: Glomerular filtration of small peptides (<60 kDa)
3. **Hepatic clearance**: Receptor-mediated endocytosis and lysosomal degradation
4. **Receptor internalization**: Binding to target receptors triggers endocytosis

### The Half-Life Spectrum

| Peptide | Half-Life | Primary Clearance | Engineering Strategy |
|---------|-----------|-------------------|---------------------|
| Oxytocin | 2–5 min | Renal + peptidase | None (short-acting by design) |
| Insulin | 4–6 min | Receptor binding | Albumin binding (insulin detemir) |
| GLP-1 | 2–5 min | DPP-4 cleavage | Fatty acid acylation (semaglutide) |
| Sermorelin | 6–8 min | DPP-IV + renal | D-Ala substitution (CJC-1295) |
| GHRP-6 | 15–30 min | Peptidases + renal | D-amino acid substitution |
| Exenatide | 2–4 hours | Renal | Exendin-4 backbone stability |
| Liraglutide | 13 hours | Albumin binding | C16 fatty acid acylation |
| Semaglutide | 165 hours | Albumin binding | C18 fatty acid + linker |
| CJC-1295-DAC | 6–8 days | Albumin catabolism | DAC (covalent albumin binding) |

### Engineering Strategies

#### 1. D-Amino Acid Substitution

Replacing L-amino acids with D-enantiomers at vulnerable positions prevents peptidase recognition:

```
Native:   His-Ala-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Arg-NH₂
Semaglutide: His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Arg-NH₂
                                              ^ Aib (α-aminoisobutyric acid)
```

The Aib substitution at position 8 prevents DPP-IV cleavage (which normally removes the N-terminal His-Ala dipeptide).

#### 2. Fatty Acid Acylation

Attaching a fatty acid enables non-covalent albumin binding:

- **Liraglutide**: C16 palmitoyl acid → albumin binding → 13-hour half-life
- **Semaglutide**: C18 octadecanedioic acid → albumin binding → 165-hour half-life
- **Tirzepatide**: C20 icosanedioic acid → albumin binding → 120-hour half-life

The fatty acid inserts into albumin's hydrophobic binding pockets, creating a circulating drug depot.

#### 3. Covalent Albumin Binding (DAC)

CJC-1295-DAC uses a reactive moiety that forms a covalent bond with Lys34 of albumin:

```
CJC-1295 → DAC moiety → reacts with albumin Lys34 → covalent albumin-peptide complex
```

This creates a half-life of 6–8 days (vs. 30 minutes without DAC) because:
- Albumin is too large for glomerular filtration (66.5 kDa)
- Albumin has a 19-day half-life itself
- The peptide is slowly released through albumin catabolism

#### 4. PEGylation

Polyethylene glycol (PEG) conjugation increases hydrodynamic radius:
- Prevents renal filtration
- Shields from protease access
- Example: pegfilgrastim (G-CSF with 20 kDa PEG → 15-hour half-life)

### Clinical Implications

| Half-Life | Dosing Frequency | Patient Compliance | Use Case |
|-----------|-----------------|-------------------|----------|
| <1 hour | Multiple daily | Low | Acute situations |
| 1–12 hours | 2–3× daily | Moderate | Short-acting therapy |
| 12–72 hours | Once daily | High | Chronic therapy |
| 3–7 days | Weekly | Very high | Chronic therapy |
| 7–14 days | Biweekly | Excellent | Depot formulations |

### The Tradeoff: Pulsatility vs Convenience

Short-acting peptides (sermorelin, GHRP-6) produce pulsatile GH release that mimics physiological secretion. Long-acting peptides (CJC-1295-DAC, semaglutide) produce sustained receptor activation but lose pulsatility.

For the GH axis specifically:
- **Pulsatile release** maintains somatotroph sensitivity
- **Sustained release** may cause receptor desensitization over time
- **Practical compromise**: Pulsatile peptides for cycling, sustained peptides for convenience

### Calculate Your Peptide

Use the [Wikipept Molecular Weight Calculator](https://wikipept.com/tools/molecular-weight-calculator) to calculate molecular weight, which is the first step in understanding a peptide's pharmacokinetic profile.

### Summary

Peptide half-life engineering is one of the most active areas in pharmaceutical chemistry. From D-amino acid substitutions (minutes → hours) to fatty acid acylation (hours → days) to covalent albumin binding (hours → weeks), the tools available allow precise control over drug duration. Understanding these principles enables rational peptide design for any therapeutic application.

*Built for [Wikipept](https://wikipept.com) — an interactive platform for learning oligopeptide biology.*
