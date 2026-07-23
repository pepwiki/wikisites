# Dev.to Article Scripts

## Article 1: Building a Peptide Analysis Pipeline with Python

**Title:** "Building a Complete Peptide Analysis Pipeline with Python and BioPython"

**Tags:** python, bioinformatics, healthtech, opensource

**Reading Time:** 12 minutes

---

### Introduction

The pharmaceutical industry is witnessing an explosion in peptide-based therapeutics. From insulin to GLP-1 receptor agonists, peptides represent one of the fastest-growing drug classes. Yet, analyzing peptide sequences, predicting properties, and managing synthesis data remains challenging.

In this tutorial, we'll build a complete peptide analysis pipeline using Python. You'll learn to:

- Parse and validate peptide sequences
- Calculate physicochemical properties
- Predict stability and solubility
- Generate analysis reports

### Setting Up Your Environment

First, install the required packages:

```bash
pip install biopython pandas matplotlib
```

### The Peptide Analyzer Class

Let's create a comprehensive analysis tool:

```python
from dataclasses import dataclass
from typing import List, Dict
import json

@dataclass
class PeptideProperties:
    sequence: str
    molecular_weight: float
    net_charge: float
    hydrophobicity: float
    solubility_prediction: str
    stability_score: int

class PeptideAnalyzer:
    """Complete peptide analysis pipeline."""
    
    AMINO_ACID_MASSES = {
        'A': 71.03711, 'R': 156.10111, 'N': 114.04293, 'D': 115.02694,
        'C': 103.00919, 'E': 129.04259, 'Q': 128.05858, 'G': 57.02146,
        'H': 137.05891, 'I': 113.08406, 'L': 113.08406, 'K': 128.09496,
        'M': 131.04049, 'F': 147.06841, 'P': 97.05276, 'S': 87.03203,
        'T': 101.04768, 'W': 186.07931, 'Y': 163.06333, 'V': 99.06841
    }
    
    HYDROPHOBICITY = {
        'A': 1.8, 'R': -4.5, 'N': -3.5, 'D': -3.5, 'C': 2.5,
        'E': -3.5, 'Q': -3.5, 'G': -0.4, 'H': -3.2, 'I': 4.5,
        'L': 3.8, 'K': -3.9, 'M': 1.9, 'F': 2.8, 'P': -1.6,
        'S': -0.8, 'T': -0.7, 'W': -0.9, 'Y': -1.3, 'V': 4.2
    }
    
    CHARGED_RESIDUES = {
        'D': -1, 'E': -1, 'K': 1, 'R': 1, 'H': 0.5
    }
    
    def __init__(self, sequence: str):
        self.sequence = sequence.upper()
        self._validate()
    
    def _validate(self):
        valid_chars = set(self.AMINO_ACID_MASSES.keys())
        invalid = set(self.sequence) - valid_chars
        if invalid:
            raise ValueError(f"Invalid characters: {invalid}")
    
    def calculate_molecular_weight(self) -> float:
        mw = sum(self.AMINO_ACID_MASSES[aa] for aa in self.sequence)
        return mw + 18.01056  # Add water
    
    def calculate_charge(self, pH: float = 7.0) -> float:
        charge = 0
        for aa in self.sequence:
            if aa in self.CHARGED_RESIDUES:
                charge += self.CHARGED_RESIDUES[aa]
        return charge
    
    def calculate_hydrophobicity(self) -> float:
        total = sum(self.HYDROPHOBICITY.get(aa, 0) for aa in self.sequence)
        return total / len(self.sequence)
    
    def predict_solubility(self) -> str:
        hydro = self.calculate_hydrophobicity()
        if hydro < -1:
            return "Highly soluble"
        elif hydro < 0:
            return "Soluble"
        elif hydro < 1:
            return "Moderately soluble"
        return "Poorly soluble"
    
    def assess_stability(self) -> int:
        score = 100
        if 'W' in self.sequence:
            score -= 10
        if 'M' in self.sequence:
            score -= 5
        if self.sequence.count('N') > 2:
            score -= 15
        if 'C' in self.sequence:
            score -= 5  # Disulfide bond risk
        return max(0, score)
    
    def full_analysis(self) -> PeptideProperties:
        return PeptideProperties(
            sequence=self.sequence,
            molecular_weight=self.calculate_molecular_weight(),
            net_charge=self.calculate_charge(),
            hydrophobicity=self.calculate_hydrophobicity(),
            solubility_prediction=self.predict_solubility(),
            stability_score=self.assess_stability()
        )
    
    def generate_report(self) -> str:
        props = self.full_analysis()
        report = f"""
=== Peptide Analysis Report ===
Sequence: {props.sequence}
Length: {len(props.sequence)} residues
Molecular Weight: {props.molecular_weight:.2f} Da
Net Charge (pH 7): {props.net_charge}
Hydrophobicity: {props.hydrophobicity:.3f} kJ/mol
Solubility: {props.solubility_prediction}
Stability Score: {props.stability_score}/100
"""
        return report

# Example usage
analyzer = PeptideAnalyzer("GLP-1")
print(analyzer.generate_report())
```

### Batch Analysis Pipeline

For high-throughput analysis, use this batch processor:

```python
import pandas as pd
from typing import List

class BatchAnalyzer:
    def __init__(self, sequences: List[str]):
        self.sequences = sequences
        self.results = []
    
    def analyze_all(self) -> pd.DataFrame:
        for seq in self.sequences:
            try:
                analyzer = PeptideAnalyzer(seq)
                props = analyzer.full_analysis()
                self.results.append(props.__dict__)
            except ValueError as e:
                print(f"Error with {seq}: {e}")
        
        return pd.DataFrame(self.results)
    
    def export_csv(self, filename: str):
        df = self.analyze_all()
        df.to_csv(filename, index=False)
        print(f"Exported {len(df)} results to {filename}")

# Example batch analysis
peptides = ["ACTH", "OXYTOCIN", "INSULIN", "GLUCAGON"]
batch = BatchAnalyzer(peptides)
batch.export_csv("peptide_analysis.csv")
```

### Visualization

Create analysis charts:

```python
import matplotlib.pyplot as plt

def plot_comparison(df: pd.DataFrame):
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    
    # Molecular Weight Distribution
    axes[0, 0].bar(df['sequence'], df['molecular_weight'])
    axes[0, 0].set_title('Molecular Weight')
    axes[0, 0].tick_params(axis='x', rotation=45)
    
    # Hydrophobicity
    colors = ['green' if h < 0 else 'red' for h in df['hydrophobicity']]
    axes[0, 1].bar(df['sequence'], df['hydrophobicity'], color=colors)
    axes[0, 1].set_title('Hydrophobicity')
    axes[0, 1].tick_params(axis='x', rotation=45)
    
    # Stability Scores
    axes[1, 0].bar(df['sequence'], df['stability_score'])
    axes[1, 0].set_title('Stability Score')
    axes[1, 0].set_ylim(0, 100)
    
    # Charge vs Hydrophobicity
    axes[1, 1].scatter(df['net_charge'], df['hydrophobicity'])
    for i, seq in enumerate(df['sequence']):
        axes[1, 1].annotate(seq, (df['net_charge'][i], df['hydrophobicity'][i]))
    axes[1, 1].set_title('Charge vs Hydrophobicity')
    
    plt.tight_layout()
    plt.savefig('peptide_analysis.png')
    plt.show()
```

### Conclusion

This pipeline provides a foundation for peptide analysis. For production use, consider:

- Database integration for known peptide data
- REST API wrapping for web services
- Machine learning for advanced predictions

For additional peptide analysis tools and resources, explore [Wikipeptide](https://wikipept.com) - a comprehensive platform for peptide research and analysis.

---

## Article 2: Building a Peptide Drug Database API with FastAPI

**Title:** "Creating a REST API for Peptide Drug Data with FastAPI and SQLAlchemy"

**Tags:** python, fastapi, healthcare, database

**Reading Time:** 14 minutes

---

### Introduction

Peptide therapeutics represent a $50 billion market, yet accessing structured data about these drugs remains fragmented. In this tutorial, we'll build a production-ready API for peptide drug information using FastAPI.

### What We'll Build

- A RESTful API for peptide drug data
- Database models with SQLAlchemy
- Authentication and rate limiting
- Comprehensive documentation

### Project Setup

```bash
mkdir peptide-api && cd peptide-api
pip install fastapi sqlalchemy uvicorn pydantic python-jose
```

### Database Models

```python
from sqlalchemy import Column, Integer, String, Float, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class RouteType(enum.Enum):
    INTRAVENOUS = "intravenous"
    SUBCUTANEOUS = "subcutaneous"
    ORAL = "oral"
    TOPICAL = "topical"
    NASAL = "nasal"

class PeptideDrug(Base):
    __tablename__ = "peptide_drugs"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    sequence = Column(String(500))
    molecular_weight = Column(Float)
    amino_acid_count = Column(Integer)
    route_of_administration = Column(Enum(RouteType))
    therapeutic_area = Column(String(100))
    fda_approval_date = Column(DateTime)
    manufacturer = Column(String(200))
    half_life_hours = Column(Float)
    storage_conditions = Column(String(200))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

class PeptideResearch(Base):
    __tablename__ = "peptide_research"
    
    id = Column(Integer, primary_key=True, index=True)
    drug_id = Column(Integer, index=True)
    publication_title = Column(String(500))
    journal = Column(String(200))
    publication_date = Column(DateTime)
    doi = Column(String(100))
    findings_summary = Column(String(1000))
```

### Pydantic Schemas

```python
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class PeptideDrugBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    sequence: str = Field(..., min_length=2)
    route_of_administration: RouteType
    therapeutic_area: str
    manufacturer: Optional[str] = None

class PeptideDrugCreate(PeptideDrugBase):
    molecular_weight: float = Field(..., gt=0)
    fda_approval_date: Optional[datetime] = None

class PeptideDrugResponse(PeptideDrugBase):
    id: int
    molecular_weight: float
    amino_acid_count: int
    half_life_hours: Optional[float]
    created_at: datetime
    
    class Config:
        orm_mode = True

class PeptideSearchResult(BaseModel):
    id: int
    name: str
    therapeutic_area: str
    relevance_score: float
```

### API Endpoints

```python
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

app = FastAPI(
    title="Peptide Drug Database API",
    description="Comprehensive API for peptide therapeutics data",
    version="1.0.0"
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/drugs/", response_model=List[PeptideDrugResponse])
def list_drugs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    therapeutic_area: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List all peptide drugs with optional filtering."""
    query = db.query(PeptideDrug)
    if therapeutic_area:
        query = query.filter(PeptideDrug.therapeutic_area == therapeutic_area)
    return query.offset(skip).limit(limit).all()

@app.get("/drugs/{drug_id}", response_model=PeptideDrugResponse)
def get_drug(drug_id: int, db: Session = Depends(get_db)):
    """Get detailed information about a specific peptide drug."""
    drug = db.query(PeptideDrug).filter(PeptideDrug.id == drug_id).first()
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found")
    return drug

@app.post("/drugs/", response_model=PeptideDrugResponse)
def create_drug(drug: PeptideDrugCreate, db: Session = Depends(get_db)):
    """Register a new peptide drug."""
    db_drug = PeptideDrug(**drug.dict())
    db.add(db_drug)
    db.commit()
    db.refresh(db_drug)
    return db_drug

@app.get("/search/", response_model=List[PeptideSearchResult])
def search_peptides(
    query: str = Query(..., min_length=2),
    therapeutic_area: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Search peptides by name or sequence."""
    results = db.query(PeptideDrug).filter(
        PeptideDrug.name.ilike(f"%{query}%") |
        PeptideDrug.sequence.ilike(f"%{query}%")
    )
    if therapeutic_area:
        results = results.filter(PeptideDrug.therapeutic_area == therapeutic_area)
    return results.all()

@app.get("/stats/")
def get_statistics(db: Session = Depends(get_db)):
    """Get database statistics."""
    total_drugs = db.query(PeptideDrug).count()
    therapeutic_areas = db.query(PeptideDrug.therapeutic_area).distinct().count()
    return {
        "total_drugs": total_drugs,
        "therapeutic_areas": therapeutic_areas
    }
```

### Running the API

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Conclusion

This API provides a solid foundation for peptide drug data management. Enhance it further with:

- JWT authentication
- Rate limiting
- Caching with Redis
- PostgreSQL for production

For additional peptide data and analysis tools, explore [Wikipeptide](https://wikipept.com).

---

## Article 3: Machine Learning for Peptide Activity Prediction

**Title:** "Predicting Peptide Bioactivity with Machine Learning: A Complete Guide"

**Tags:** machinelearning, python, bioinformatics, peptides

**Reading Time:** 15 minutes

---

### Introduction

Predicting peptide bioactivity accelerates drug discovery by reducing experimental screening costs. In this tutorial, we'll build ML models to predict antimicrobial activity, receptor binding, and stability.

### The Challenge

Peptide activity depends on:
- Amino acid composition
- Sequence patterns
- Physicochemical properties
- Structure-activity relationships

### Setup

```bash
pip install scikit-learn pandas numpy biopython
```

### Feature Engineering

```python
import numpy as np
import pandas as pd
from typing import List, Dict

class PeptideFeatureExtractor:
    """Extract ML features from peptide sequences."""
    
    AMINO_ACID_PROPERTIES = {
        'A': {'mass': 89, 'hydro': 1.8, 'charge': 0, 'polar': False},
        'R': {'mass': 174, 'hydro': -4.5, 'charge': 1, 'polar': True},
        'N': {'mass': 132, 'hydro': -3.5, 'charge': 0, 'polar': True},
        'D': {'mass': 133, 'hydro': -3.5, 'charge': -1, 'polar': True},
        'C': {'mass': 121, 'hydro': 2.5, 'charge': 0, 'polar': False},
        'E': {'mass': 147, 'hydro': -3.5, 'charge': -1, 'polar': True},
        'Q': {'mass': 146, 'hydro': -3.5, 'charge': 0, 'polar': True},
        'G': {'mass': 75, 'hydro': -0.4, 'charge': 0, 'polar': False},
        'H': {'mass': 155, 'hydro': -3.2, 'charge': 0.5, 'polar': True},
        'I': {'mass': 131, 'hydro': 4.5, 'charge': 0, 'polar': False},
        'L': {'mass': 131, 'hydro': 3.8, 'charge': 0, 'polar': False},
        'K': {'mass': 146, 'hydro': -3.9, 'charge': 1, 'polar': True},
        'M': {'mass': 149, 'hydro': 1.9, 'charge': 0, 'polar': False},
        'F': {'mass': 165, 'hydro': 2.8, 'charge': 0, 'polar': False},
        'P': {'mass': 115, 'hydro': -1.6, 'charge': 0, 'polar': False},
        'S': {'mass': 105, 'hydro': -0.8, 'charge': 0, 'polar': True},
        'T': {'mass': 119, 'hydro': -0.7, 'charge': 0, 'polar': True},
        'W': {'mass': 204, 'hydro': -0.9, 'charge': 0, 'polar': False},
        'Y': {'mass': 181, 'hydro': -1.3, 'charge': 0, 'polar': True},
        'V': {'mass': 117, 'hydro': 4.2, 'charge': 0, 'polar': False}
    }
    
    def __init__(self, sequences: List[str]):
        self.sequences = [s.upper() for s in sequences]
    
    def composition_features(self) -> pd.DataFrame:
        """Calculate amino acid composition."""
        features = []
        for seq in self.sequences:
            length = len(seq)
            comp = {aa: seq.count(aa)/length for aa in 'ACDEFGHIKLMNPQRSTVWY'}
            features.append(comp)
        return pd.DataFrame(features)
    
    def physicochemical_features(self) -> pd.DataFrame:
        """Calculate physicochemical properties."""
        features = []
        for seq in self.sequences:
            props = {
                'length': len(seq),
                'molecular_weight': sum(self.AMINO_ACID_PROPERTIES[aa]['mass'] for aa in seq),
                'avg_hydrophobicity': np.mean([self.AMINO_ACID_PROPERTIES[aa]['hydro'] for aa in seq]),
                'net_charge': sum(self.AMINO_ACID_PROPERTIES[aa]['charge'] for aa in seq),
                'polar_fraction': sum(1 for aa in seq if self.AMINO_ACID_PROPERTIES[aa]['polar'])/len(seq)
            }
            features.append(props)
        return pd.DataFrame(features)
    
    def pattern_features(self) -> pd.DataFrame:
        """Extract sequence patterns."""
        features = []
        for seq in self.sequences:
            patterns = {
                'has_disulfide': 'C' in seq and seq.count('C') >= 2,
                'cationic_count': seq.count('R') + seq.count('K'),
                'aromatic_count': sum(1 for aa in seq if aa in 'FWY'),
                'aliphatic_count': sum(1 for aa in seq if aa in 'AILV'),
                'proline_count': seq.count('P')
            }
            features.append(patterns)
        return pd.DataFrame(features)
    
    def extract_all(self) -> pd.DataFrame:
        """Combine all features."""
        comp = self.composition_features()
        phys = self.physicochemical_features()
        patterns = self.pattern_features()
        return pd.concat([comp, phys, patterns], axis=1)
```

### ML Model Training

```python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.preprocessing import StandardScaler
import joblib

class PeptideActivityPredictor:
    """Predict peptide bioactivity using ML."""
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.models = {
            'random_forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'gradient_boost': GradientBoostingClassifier(n_estimators=100, random_state=42)
        }
        self.best_model = None
    
    def prepare_data(self, features: pd.DataFrame, labels: pd.Series):
        X_train, X_test, y_train, y_test = train_test_split(
            features, labels, test_size=0.2, random_state=42, stratify=labels
        )
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        return X_train_scaled, X_test_scaled, y_train, y_test
    
    def train(self, features: pd.DataFrame, labels: pd.Series):
        X_train, X_test, y_train, y_test = self.prepare_data(features, labels)
        
        results = {}
        for name, model in self.models.items():
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            y_prob = model.predict_proba(X_test)[:, 1]
            
            results[name] = {
                'accuracy': model.score(X_test, y_test),
                'roc_auc': roc_auc_score(y_test, y_prob),
                'report': classification_report(y_test, y_pred)
            }
        
        # Select best model
        best_name = max(results, key=lambda x: results[x]['roc_auc'])
        self.best_model = self.models[best_name]
        
        return results
    
    def predict(self, features: pd.DataFrame) -> np.ndarray:
        if self.best_model is None:
            raise ValueError("Model not trained yet")
        features_scaled = self.scaler.transform(features)
        return self.best_model.predict(features_scaled)
    
    def predict_proba(self, features: pd.DataFrame) -> np.ndarray:
        if self.best_model is None:
            raise ValueError("Model not trained yet")
        features_scaled = self.scaler.transform(features)
        return self.best_model.predict_proba(features_scaled)
    
    def save_model(self, filepath: str):
        joblib.dump({'model': self.best_model, 'scaler': self.scaler}, filepath)
    
    def load_model(self, filepath: str):
        data = joblib.load(filepath)
        self.best_model = data['model']
        self.scaler = data['scaler']
```

### Example Usage

```python
# Sample data (in practice, use real datasets)
sequences = [
    "GLP-1", "INSULIN", "ACTH", "OXYTOCIN", 
    "GLUCAGON", "SOMATOSTATIN", "MELANOTAN"
]
labels = [1, 1, 1, 1, 1, 0, 1]  # Example activity labels

# Extract features
extractor = PeptideFeatureExtractor(sequences)
features = extractor.extract_all()

# Train model
predictor = PeptideActivityPredictor()
results = predictor.train(features, labels)

print("Model Results:")
for model_name, metrics in results.items():
    print(f"\n{model_name}:")
    print(f"  Accuracy: {metrics['accuracy']:.3f}")
    print(f"  ROC AUC: {metrics['roc_auc']:.3f}")

# Predict new peptides
new_sequences = ["NEWPEPTIDE1", "NEWPEPTIDE2"]
new_extractor = PeptideFeatureExtractor(new_sequences)
new_features = new_extractor.extract_all()
predictions = predictor.predict_proba(new_features)
print(f"\nPrediction probabilities: {predictions}")
```

### Conclusion

ML-based peptide activity prediction accelerates drug discovery by prioritizing candidates. Key improvements:

- Larger training datasets
- Deep learning with recurrent networks
- Transfer learning from protein models
- Integration with molecular dynamics

For comprehensive peptide analysis tools and resources, visit [Wikipeptide](https://wikipept.com).
