# Dev.to Article Outlines — Wikipept Outreach

These article outlines are designed for publishing on Dev.to to reach developer and researcher communities. Each includes SEO optimization, estimated read time, and natural integration of Wikipept tools.

---

## Article 1: Building a Zero-Dependency Peptide Calculator in TypeScript

**Title:** Building a Zero-Dependency Peptide Calculator in TypeScript

**Introduction (150 words):**
Hook: "Every bioinformatics lab needs a peptide calculator, but most existing tools are either Python-only, require heavy dependencies, or are web-only. I wanted a TypeScript solution that works in Node.js, browsers, and Edge functions — zero dependencies, full type safety."

Explain the problem: Researchers and developers need quick molecular weight, pI, and concentration calculations without installing scientific Python stacks.

**Sections:**

### 1. Why TypeScript for Peptide Science? (200 words)
- Type safety for amino acid sequences
- Works everywhere (Node, browser, Deno, Bun)
- npm ecosystem integration
- Easier deployment than Python for web apps

### 2. Setting Up the Project (150 words)
```bash
npm init -y
npm install -D typescript @types/node vitest
```
- Project structure
- TypeScript config
- Testing setup with Vitest

### 3. Core Data Structures (300 words)
```typescript
interface AminoAcid {
  code: string;
  name: string;
  monoisotopicMass: number;
  averageMass: number;
  pKa: { nTerm?: number; cTerm?: number; sideChain?: number };
  hydrophobicity: number;
  charge: number;
}

const AMINO_ACIDS: Record<string, AminoAcid> = {
  A: { code: 'A', name: 'Alanine', monoisotopicMass: 71.03711, ... },
  // ...
};
```

### 4. Implementing Molecular Weight Calculation (400 words)
- Monoisotopic vs average mass
- Handling modifications (phosphorylation, acetylation)
- Disulfide bond corrections
- Unit tests

### 5. Adding Isoelectric Point Calculation (350 words)
- Henderson-Hasselbalch method
- Iterative charge balancing
- Edge cases (no ionizable groups)
- Comparison with experimental values

### 6. Concentration Calculator (300 words)
- mg to μmol conversion
- Molarity calculations
- Extinction coefficient estimation

### 7. Publishing as npm Package (250 words)
- Package.json configuration
- TypeScript declarations
- Tree-shaking friendly exports
- Documentation generation

**Conclusion (150 words):**
- Recap of zero-dependency philosophy
- Link to full source code on GitHub
- Link to [Wikipept's online calculator](https://wikipept.com/tools) for those who prefer web UI
- Call to action: Star the repo, contribute modifications

**SEO Tags:** `typescript`, `peptides`, `bioinformatics`, `npm`, `calculator`, `chemistry`, `open-source`

**Estimated Read Time:** 12-15 minutes

**Links:**
- GitHub repository: [github.com/wikisites/peptide-calculator](https://github.com/wikisites/peptide-calculator)
- npm package: [npmjs.com/package/@wikisites/peptide-calc](https://www.npmjs.com/package/@wikisites/peptide-calc)
- Wikipept tools: [wikipept.com/tools](https://wikipept.com/tools)

---

## Article 2: Peptide Reconstitution: A Practical Guide for Lab Researchers

**Title:** Peptide Reconstitution: A Practical Guide for Lab Researchers (With Interactive Calculator)

**Introduction (150 words):**
Hook: "I've seen $500 peptides ruined by incorrect reconstitution. The powder clumps, precipitates, or degrades within hours. After helping dozens of labs troubleshoot, here's the protocol that actually works."

Personal anecdote about a common reconstitution failure and its consequences.

**Sections:**

### 1. Why Reconstitution Matters (200 words)
- Lyophilized peptides are fragile
- Incorrect handling → aggregation, degradation, loss of activity
- Real cost of failed reconstitution: time, money, wasted experiments

### 2. Understanding Your Peptide (300 words)
- Check the COA (Certificate of Analysis)
- MW, purity, suggested storage
- Hydrophobicity/hydrophilicity indicators
- Special handling notes (cysteine-rich, phospho, etc.)

### 3. Solvent Selection Decision Tree (350 words)
```
Is peptide hydrophobic?
├── Yes → Try 10-30% acetic acid, then DMSO
└── No → Water or PBS

Does it contain Cys?
├── Yes → Degassed buffer + 1mM TCEP
└── No → Standard buffer

Is it a phosphopeptide?
├── Yes → Ammonium bicarbonate (volatile)
└── No → Standard protocols
```

### 4. Step-by-Step Protocol (400 words)
1. Centrifuge vial (10s, 10,000 rpm)
2. Calculate volume: `V (mL) = mass (mg) / conc (mg/mL)`
3. Add 70% of solvent slowly down vial wall
4. Let stand 2-3 minutes (don't vortex yet)
5. Gentle inversion or swirl
6. Check clarity — if cloudy, sonicate 30s
7. Add remaining solvent to reach target volume
8. Aliquot and store at -20°C

### 5. Common Mistakes and Solutions (300 words)
| Mistake | Symptom | Fix |
|---------|---------|-----|
| Added solvent too fast | White clumps | Add DMSO dropwise, then dilute |
| Vortexed aggressively | Foam/bubbles | Gentle inversion only |
| Wrong solvent | Precipitate | Switch to acidic solvent |
| Too dilute | Degradation fast | Add BSA or concentrate |

### 6. Calculator Walkthrough (250 words)
- Demo of the [Wikipept Reconstitution Calculator](https://wikipept.com/tools/reconstitution)
- Input: peptide mass, MW, desired concentration
- Output: exact solvent volume, concentration in various units

**Conclusion (150 words):**
- Reconstitution is simple but unforgiving
- Bookmark the calculator for quick reference
- Link to [Wikipept's reconstitution guide](https://wikipept.com/protocols/reconstitution) for printable protocol
- Community invite: Share your tips in comments

**SEO Tags:** `peptides`, `reconstitution`, `lab-protocols`, `biochemistry`, `research`, `biology`, `chemistry`

**Estimated Read Time:** 10-12 minutes

**Links:**
- Interactive calculator: [wikipept.com/tools/reconstitution](https://wikipept.com/tools/reconstitution)
- Printable protocol: [wikipept.com/protocols/reconstitution](https://wikipept.com/protocols/reconstitution)
- Full reconstitution database: [wikipept.com/reference/reconstitution](https://wikipept.com/reference/reconstitution)

---

## Article 3: Understanding Peptide Half-Life: From Minutes to Weeks

**Title:** Understanding Peptide Half-Life: From Minutes to Weeks — A Developer's Guide to Pharmacokinetics

**Introduction (150 words):**
Hook: "A linear peptide can have a half-life of 2 minutes. The same sequence, cyclized and with D-amino acids, lasts 200 minutes. As developers building peptide tools, understanding half-life prediction is essential for both our algorithms and our users' research."

Bridge between developer mindset and pharmacology concepts.

**Sections:**

### 1. What Determines Peptide Half-Life? (300 words)
- Proteolytic degradation pathways
- Renal filtration (MW cutoff ~5 kDa)
- Hepatic metabolism
- Receptor-mediated clearance

### 2. The Protease Landscape (250 words)
- Trypsin-like proteases (Arg/Lys cleavage)
- Metalloproteases ( MMPs, ACE)
- Serine proteases (elastase, kallikrein)
- Tissue-specific expression patterns

### 3. Quantifying Protease Susceptibility (350 words)
```python
PROTEASE_SITES = {
    'trypsin': lambda seq: [(i, aa) for i, aa in enumerate(seq) 
                             if aa in 'RK' and i < len(seq)-1 
                             and seq[i+1] != 'P'],
    'pepsin': lambda seq: [(i, aa) for i, aa in enumerate(seq) 
                            if aa in 'FLYW'],
    'elastase': lambda seq: [(i, aa) for i, aa in enumerate(seq) 
                              if aa in 'AGVSP']
}

def score_stability(sequence):
    """Score = number of potential cleavage sites."""
    total_sites = sum(len(func(sequence)) for func in PROTEASE_SITES.values())
    length_factor = len(sequence) / 20
    return total_sites / length_factor
```

### 4. Modification Strategies (400 words)
- D-amino acid substitution: 10-50x extension
- Cyclization: 3-10x extension
- N-methylation: 2-5x extension
- PEGylation: 10-100x extension
- Fatty acid acylation: 5-20x extension (albumin binding)

### 5. Building a Half-Life Predictor (350 words)
- Feature engineering from sequence
- ML approaches (random forest, LSTM)
- Training data from literature
- Validation strategies

### 6. Case Study: GLP-1 Agonist Evolution (300 words)
- Native GLP-1: 2 minutes
- Exenatide: 2.5 hours
- Liraglutide: 13 hours
- Semaglutide: 165 hours
- Design decisions at each step

**Conclusion (150 words):**
- Half-life prediction combines sequence analysis, protease mapping, and modification effects
- Link to [Wikipept Stability Predictor](https://wikipept.com/tools/stability-predictor) for automated analysis
- Call to action: Contribute protease data to the open database

**SEO Tags:** `pharmacokinetics`, `peptides`, `half-life`, `drug-design`, `bioinformatics`, `machine-learning`

**Estimated Read Time:** 14-16 minutes

**Links:**
- Stability predictor: [wikipept.com/tools/stability-predictor](https://wikipept.com/tools/stability-predictor)
- Protease database: [wikipept.com/reference/proteases](https://wikipept.com/reference/proteases)
- Half-life comparison tool: [wikipept.com/tools/half-life](https://wikipept.com/tools/half-life)

---

## Article 4: How to Compare GLP-1 Agonists: Semaglutide vs Tirzepatide

**Title:** How to Compare GLP-1 Agonists: Semaglutide vs Tirzepatide — A Data-Driven Analysis

**Introduction (150 words):**
Hook: "In 2024, GLP-1 receptor agonists became the most prescribed drug class globally. But choosing between semaglutide and tirzepatide isn't straightforward — they target different receptors, have different pharmacokinetics, and excel in different clinical scenarios."

Set up the comparison framework.

**Sections:**

### 1. The Incretin Revolution (200 words)
- GLP-1 biology basics
- Why incretin-based therapies work
- Market context ($50B+ annually)

### 2. Molecular Architecture (300 words)
- Semaglutide: GLP-1 analog + C18 fatty acid + linker
- Tirzepatide: GIP backbone + GLP-1 activity + C20 fatty acid
- Structural differences → functional consequences

### 3. Pharmacokinetic Comparison (350 words)
| Parameter | Semaglutide | Tirzepatide |
|-----------|-------------|-------------|
| Half-life | ~165 hours | ~90 hours |
| Tmax | 1-3 days | 1-2 days |
| Bioavailability | 89% (SC) | 80% (SC) |
| Volume distribution | 12.5 L | 8.2 L |

### 4. Clinical Evidence (400 words)
- SELECT trial: Semaglutide CV outcomes
- SURPASS program: Tirzepatide vs semaglutide head-to-head
- STEP program: Weight loss data
- SURMOUNT program: Obesity-specific outcomes

### 5. Decision Framework (300 words)
```
Primary goal: Glycemic control
├── Prioritize weight loss → Tirzepatide
├── Established CV disease → Semaglutide
└── Cost considerations → Semaglutide

Primary goal: Weight management
├── Maximum weight loss → Tirzepatide
├── Insurance coverage → Semaglutide
└── GI tolerance → Trial either
```

### 6. Safety Considerations (250 words)
- Shared: Pancreatitis risk, thyroid warnings
- Differences: Injection site reactions, immunogenicity
- Contraindications overlap

**Conclusion (150 words):**
- Both are excellent therapies
- Choice depends on clinical context
- Link to [Wikipept comparison tool](https://wikipept.com/compounds/semaglutide-vs-tirzepatide) for interactive comparison
- Link to dosing calculators for each

**SEO Tags:** `semaglutide`, `tirzepatide`, `glp-1`, `diabetes`, `obesity`, `pharmacology`, `clinical-trials`

**Estimated Read Time:** 11-13 minutes

**Links:**
- Comparison page: [wikipept.com/compounds/semaglutide-vs-tirzepatide](https://wikipept.com/compounds/semaglutide-vs-tirzepatide)
- Semaglutide profile: [wikipept.com/compounds/semaglutide](https://wikipept.com/compounds/semaglutide)
- Tirzepatide profile: [wikipept.com/compounds/tirzepatide](https://wikipept.com/compounds/tirzepatide)
- Dosing calculator: [wikipept.com/tools/dose-calculator](https://wikipept.com/tools/dose-calculator)

---

## Article 5: Open Source Peptide Tools: A Developer's Guide

**Title:** Open Source Peptide Tools: A Developer's Guide to the Wikisites Ecosystem

**Introduction (150 words):**
Hook: "Bioinformatics needs better open-source tooling. The Wikisites project is building a complete ecosystem of peptide research tools — calculators, databases, and prediction engines — all open source, all free."

Mission statement and project overview.

**Sections:**

### 1. The Wikisites Vision (200 words)
- Open science for peptide research
- Modular, composable tools
- Community-driven development
- Reference: Wikipept as the knowledge base

### 2. Tool Overview (300 words)
```
wikisites/
├── peptide-calc/        # TypeScript calculator library
├── peptide-db/          # Reference database
├── stability-predictor/ # ML-based half-life prediction
├── amp-designer/        # Antimicrobial peptide design
├── dose-calculator/     # Clinical dosing tools
└── wikipept/           # Web application
```

### 3. Getting Started (250 words)
```bash
# Install the core calculator
npm install @wikisites/peptide-calc

# Import and use
import { calculateMW, calculatePI } from '@wikisites/peptide-calc';

const mw = calculateMW('GLPRGLEGLSLGVA');
const pI = calculatePI('GLPRGLEGLSLGVA');
```

### 4. Architecture Deep Dive (400 words)
- TypeScript-first design
- Zero external dependencies
- Tree-shaking friendly
- Browser and Node.js compatibility
- Testing strategy

### 5. Contributing Guide (300 words)
- Development setup
- Code style and conventions
- Testing requirements
- PR process
- Good first issues

### 6. Real-World Integrations (250 words)
- Lab notebook plugins
- LIMS integration examples
- Electronic lab notebook extensions
- Custom pipeline integration

**Conclusion (150 words):**
- The ecosystem is growing
- Multiple ways to contribute: code, data, documentation
- Start with the calculator, explore the database
- Link to [Wikipept](https://wikipept.com) for the full platform

**SEO Tags:** `open-source`, `peptides`, `bioinformatics`, `typescript`, `developer-tools`, `chemistry`, `github`

**Estimated Read Time:** 10-12 minutes

**Links:**
- GitHub organization: [github.com/wikisites](https://github.com/wikisites)
- npm packages: [npmjs.com/org/wikisites](https://www.npmjs.com/org/wikisites)
- Wikipept: [wikipept.com](https://wikipept.com)
- Contributing guide: [github.com/wikisites/.github/CONTRIBUTING.md](https://github.com/wikisites/.github/blob/main/CONTRIBUTING.md)

---

## Publishing Guidelines

### SEO Best Practices
- Use target keywords in first 100 words
- Include keywords in H2/H3 headers
- Alt text for images (use descriptive filenames)
- Internal links to other Wikisites articles
- External links to authoritative sources (PubMed, etc.)

### Content Quality
- Code examples should be runnable (test them)
- Include error handling in examples
- Add screenshots/GIFs where helpful
- Update articles quarterly for accuracy

### Engagement Strategy
- Respond to all comments within 24 hours
- Cross-promote on Twitter/LinkedIn
- Submit to relevant newsletters
- Track referral traffic from wikipept.com
