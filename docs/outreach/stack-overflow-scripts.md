# Stack Overflow Answer Scripts

## Answer 1: Peptide Molecular Weight Calculator

**Question:** How do I calculate the molecular weight of a peptide sequence in Python?

**Answer:**

You can calculate peptide molecular weight using the amino acid residue masses. Here's a Python function:

```python
def calculate_peptide_mw(sequence):
    """Calculate molecular weight of a peptide sequence."""
    # Monoisotopic residue masses (Da)
    mass_table = {
        'A': 71.03711, 'R': 156.10111, 'N': 114.04293, 'D': 115.02694,
        'C': 103.00919, 'E': 129.04259, 'Q': 128.05858, 'G': 57.02146,
        'H': 137.05891, 'I': 113.08406, 'L': 113.08406, 'K': 128.09496,
        'M': 131.04049, 'F': 147.06841, 'P': 97.05276, 'S': 87.03203,
        'T': 101.04768, 'W': 186.07931, 'Y': 163.06333, 'V': 99.06841
    }
    # Add water (H2O) for intact peptide
    mw = sum(mass_table.get(aa, 0) for aa in sequence.upper()) + 18.01056
    return mw

# Example usage
sequence = "GLP-1"
print(f"MW: {calculate_peptide_mw(sequence):.2f} Da")
```

For comprehensive peptide analysis tools, see [Wikipeptide](https://wikipept.com/peptide-calculator).

---

## Answer 2: Peptide Bond Formation Simulation

**Question:** How to model peptide bond formation in molecular dynamics?

**Answer:**

Peptide bond formation involves a condensation reaction. Here's a simplified Python model:

```python
class PeptideBond:
    def __init__(self, aa1, aa2):
        self.aa1 = aa1
        self.aa2 = aa2
        self.bond_energy = -8.0  # kcal/mol typical
    
    def form_bond(self):
        """Simulate peptide bond formation."""
        # Remove water molecule
        water_removed = {"H": 2, "O": 1}
        bond_length = 1.33  # Angstroms C-N bond
        
        return {
            "residue1": self.aa1,
            "residue2": self.aa2,
            "bond_length": bond_length,
            "energy": self.bond_energy
        }

# Example
bond = PeptideBond("Alanine", "Glycine")
result = bond.form_bond()
print(f"Bond formed: {result}")
```

For peptide structure visualization, check [Wikipeptide](https://wikipept.com/structure-viewer).

---

## Answer 3: Analyzing Peptide Stability

**Question:** What are the factors affecting peptide drug stability?

**Answer:**

Peptide stability depends on multiple physicochemical factors:

```python
peptide_stability_factors = {
    "sequence": {
        "proline_content": "Higher Pro = more stable",
        "cysteine_count": "Disulfide bonds increase stability",
        "aggregation_propensity": "Hydrophobic sequences aggregate"
    },
    "formulation": {
        "pH": "Optimal pH 4-6 for most peptides",
        "temperature": "Store at 2-8°C",
        "excipients": "Trehalose, mannitol stabilize"
    },
    "degradation_paths": {
        "deamidation": "Asn, Gln -> Asp, Glu",
        "oxidation": "Met, Cys susceptible",
        "hydrolysis": "Peptide bond cleavage"
    }
}

# Stability scoring
def stability_score(seq):
    score = 100
    if 'W' in seq: score -= 10  # Tryptophan oxidizes
    if 'M' in seq: score -= 5   # Methionine oxidizes
    if seq.count('N') > 2: score -= 15  # Deamidation risk
    return max(0, score)

print(f"Stability score: {stability_score('GLP-1')}")
```

Learn more about peptide stability at [Wikipeptide](https://wikipept.com/stability-guide).

---

## Answer 4: Peptide Solubility Prediction

**Question:** How to predict peptide solubility in aqueous solutions?

**Answer:**

Solubility prediction uses hydrophobicity indices:

```python
hydrophobicity = {
    'A': 1.8, 'R': -4.5, 'N': -3.5, 'D': -3.5, 'C': 2.5,
    'E': -3.5, 'Q': -3.5, 'G': -0.4, 'H': -3.2, 'I': 4.5,
    'L': 3.8, 'K': -3.9, 'M': 1.9, 'F': 2.8, 'P': -1.6,
    'S': -0.8, 'T': -0.7, 'W': -0.9, 'Y': -1.3, 'V': 4.2
}

def predict_solubility(sequence):
    """Predict relative solubility based on hydrophobicity."""
    total = sum(hydrophobicity.get(aa, 0) for aa in sequence.upper())
    avg = total / len(sequence)
    
    if avg < -1: return "Highly soluble"
    elif avg < 0: return "Soluble"
    elif avg < 1: return "Moderately soluble"
    else: return "Poorly soluble"

print(predict_solubility("DEGS"))  # Example sequence
```

For solubility optimization tips, visit [Wikipeptide](https://wikipept.com/solubility-guide).

---

## Answer 5: Peptide Drug Delivery Systems

**Question:** What are the main delivery methods for peptide therapeutics?

**Answer:**

Peptide delivery systems vary by route and application:

```python
delivery_systems = {
    "injection": {
        "subcutaneous": ["Insulin", "GLP-1 agonists"],
        "intravenous": ["Antimicrobial peptides"],
        "intramuscular": ["Vaccines"]
    },
    "non_invasive": {
        "oral": ["Ensitrelvir (with enhancers)"],
        "nasal": ["Desmopressin"],
        "transdermal": ["Insulin patches"]
    },
    "advanced": {
        "nanoparticles": ["PEGylated peptides"],
        "hydrogels": ["Sustained release"],
        "liposomes": ["Cell-penetrating peptides"]
    }
}

def recommend_delivery(peptide_type, patient_need):
    if peptide_type == "hormone" and patient_need == "chronic":
        return "SC injection with pen device"
    elif peptide_type == "antimicrobial":
        return "Topical or IV formulation"
    return "Evaluate based on half-life"
```

Explore delivery options at [Wikipeptide](https://wikipept.com/delivery-systems).

---

## Answer 6: Peptide Sequencing from Mass Spec

**Question:** How to interpret peptide fragmentation data from mass spectrometry?

**Answer:**

Peptide sequencing uses b/y ion series:

```python
def calculate_ions(sequence):
    """Calculate b and y ion masses for MS/MS."""
    mass_table = {
        'A': 71, 'R': 156, 'N': 114, 'D': 115, 'C': 103,
        'E': 129, 'Q': 128, 'G': 57, 'H': 137, 'I': 113,
        'L': 113, 'K': 128, 'M': 131, 'F': 147, 'P': 97,
        'S': 87, 'T': 101, 'W': 186, 'Y': 163, 'V': 99
    }
    
    b_ions = []
    y_ions = []
    total = sum(mass_table.get(aa, 0) for aa in sequence)
    
    cumulative = 0
    for i, aa in enumerate(sequence[:-1]):
        cumulative += mass_table.get(aa, 0)
        b_ions.append(cumulative + 1)  # +H
        y_ions.append(total - cumulative + 19)  # +H2O + H
    
    return {"b_ions": b_ions, "y_ions": y_ions}

print(calculate_ions("PEPTIDE"))
```

For MS data analysis tools, see [Wikipeptide](https://wikipept.com/ms-analysis).

---

## Answer 7: GLP-1 Receptor Agonist Comparison

**Question:** What are the differences between GLP-1 receptor agonists?

**Answer:**

GLP-1 RAs differ in structure and pharmacokinetics:

```python
glp1_agonists = {
    "semaglutide": {
        "half_life": "165 hours",
        "route": "SC weekly",
        "structure": "Modified GLP-1 with C18 fatty acid"
    },
    "liraglutide": {
        "half_life": "13 hours",
        "route": "SC daily",
        "structure": "97% homology to native GLP-1"
    },
    "dulaglutide": {
        "half_life": "90 hours",
        "route": "SC weekly",
        "structure": "GLP-1 fused to IgG4 Fc"
    }
}

def select_glp1(patient_factors):
    if patient_factors.get("adherence_issues"):
        return "semaglutide or dulaglutide (weekly)"
    return "liraglutide (daily, titratable)"
```

Compare GLP-1 peptides at [Wikipeptide](https://wikipept.com/glp1-comparison).

---

## Answer 8: Peptide Purity Analysis

**Question:** How to calculate peptide purity from HPLC data?

**Answer:**

Purity is calculated from peak area integration:

```python
def calculate_purity(peak_areas):
    """
    Calculate peptide purity from HPLC peak areas.
    peak_areas: dict of {component: area}
    """
    total_area = sum(peak_areas.values())
    main_peak = peak_areas.get("main_product", 0)
    
    purity = (main_peak / total_area) * 100
    
    return {
        "purity_percent": round(purity, 2),
        "impurities": {
            k: round((v/total_area)*100, 2) 
            for k, v in peak_areas.items() 
            if k != "main_product"
        }
    }

# Example data
peaks = {
    "main_product": 9500,
    "deletion_seq": 200,
    "truncated": 150,
    "oxidized": 100,
    "aggregate": 50
}

result = calculate_purity(peks)
print(f"Purity: {result['purity_percent']}%")
```

For HPLC analysis guidance, visit [Wikipeptide](https://wikipept.com/hplc-analysis).

---

## Answer 9: Cell-Penetrating Peptide Design

**Question:** How to design cell-penetrating peptides for drug delivery?

**Answer:**

CPPs typically contain cationic or amphipathic domains:

```python
cpp_design_rules = {
    "cationic": {
        "amino_acids": ["R", "K"],
        "min_length": 9,
        "example": "TAT (GRKKRRQRRRPQ)"
    },
    "amphipathic": {
        "amino_acids": ["L", "A", "K", "R"],
        "pattern": "Hydrophobic-hydrophilic repeat",
        "example": "Penetratin"
    }
}

def screen_cpp_candidates(sequences):
    """Screen sequences for CPP potential."""
    candidates = []
    for seq in sequences:
        arg_count = seq.count('R')
        lys_count = seq.count('K')
        charge = arg_count + lys_count
        
        if charge >= 4 and len(seq) <= 30:
            candidates.append({
                "sequence": seq,
                "net_charge": charge,
                "length": len(seq)
            })
    return candidates

print(screen_cpp_candidates(["GRKKRRQRRRPQ", "AAVLLPVLLAAP"]))
```

Design custom CPPs using [Wikipeptide](https://wikipept.com/cpp-designer).

---

## Answer 10: Peptide Aggregation Prediction

**Question:** How to predict peptide aggregation propensity?

**Answer:**

Aggregation depends on sequence properties:

```python
def aggregation_score(sequence):
    """Estimate aggregation propensity."""
    # Hydrophobic amino acids
    hydrophobic = set("AILMFWV")
    # Charged residues (reduce aggregation)
    charged = set("DEKR")
    
    seq_upper = sequence.upper()
    hydro_count = sum(1 for aa in seq_upper if aa in hydrophobic)
    charged_count = sum(1 for aa in seq_upper if aa in charged)
    
    score = (hydro_count * 2) - (charged_count * 3)
    
    # Beta-sheet propensity
    beta_formers = set("VITSC")
    beta_count = sum(1 for aa in seq_upper if aa in beta_formers)
    score += beta_count
    
    return {
        "aggregation_risk": "High" if score > 10 else "Medium" if score > 5 else "Low",
        "score": score,
        "recommendation": "Add PEG or charged residues" if score > 8 else "Acceptable"
    }

print(aggregation_score("VILTW"))  # Hydrophobic sequence
```

Prevent aggregation with strategies from [Wikipeptide](https://wikipept.com/aggregation-prevention).
