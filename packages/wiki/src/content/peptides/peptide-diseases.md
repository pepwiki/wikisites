---
date: 2026-06-13
author: "Wikipept Contributors"
title: Peptide-Related Diseases Database
description: Comprehensive database of diseases involving peptide dysregulation, biomarkers, and therapeutic targets
category: peptide-medicine
tags:
  - diseases
  - biomarkers
  - peptide-dysregulation
  - therapeutic-targets
  - clinical-medicine
total_diseases: 50
categories:
  - metabolic
  - neurological
  - cancer
  - cardiovascular
  - infectious
last_updated: 2024
---

# Peptide-Related Diseases Database

This database catalogs diseases with significant peptide involvement, including dysregulated peptide pathways, diagnostic biomarkers, and peptide-based therapeutic approaches.

## Disease Statistics

| Category | Count | Primary Peptide Types |
|----------|-------|-----------------------|
| Metabolic | 10 | Hormones, enzymes, amino acid derivatives |
| Neurological | 10 | Neuropeptides, amyloid peptides, prion proteins |
| Cancer | 10 | Tumor markers, growth factors, hormone receptors |
| Cardiovascular | 10 | Natriuretic peptides, troponins, coagulation factors |
| Infectious | 10 | Antimicrobial peptides, viral peptides, diagnostic markers |

---

## Metabolic Diseases

### 1. Type 1 Diabetes

```yaml
id: METABOLIC-001
disease_name: "Type 1 Diabetes Mellitus"
category: metabolic
peptide_involvement: "Insulin deficiency"
```

**Mechanism:** Autoimmune destruction of pancreatic beta cells leads to absolute insulin deficiency. T-cell mediated attack targets insulin and glutamic acid decarboxylase (GAD) epitopes. Loss of insulin production results in hyperglycemia and metabolic dysregulation.

**Symptoms:**
- Polyuria (excessive urination)
- Polydipsia (excessive thirst)
- Polyphagia (excessive hunger)
- Unexplained weight loss
- Fatigue and weakness
- Blurred vision
- Diabetic ketoacidosis (DKA) in severe cases

**Diagnosis:**
- Fasting plasma glucose ≥126 mg/dL
- HbA1c ≥6.5%
- C-peptide levels (low/absent)
- Autoantibodies: GAD65, IA-2, ZnT8, insulin autoantibodies
- Random glucose ≥200 mg/dL with symptoms

**Treatment:**
- Exogenous insulin replacement (basal-bolus regimen)
- Continuous subcutaneous insulin infusion (insulin pump)
- Continuous glucose monitoring (CGM)
- Pancreas/islet cell transplantation
- Immunotherapy research (teplizumab for prevention)

**Prognosis:** Chronic condition requiring lifelong insulin therapy. Complications include nephropathy, neuropathy, retinopathy, and cardiovascular disease. Life expectancy improved with modern management but remains reduced by 10-15 years.

**Research Status:**
- Stem cell-derived beta cell therapies in clinical trials
- Closed-loop artificial pancreas systems advancing
- Immunomodulatory approaches for prevention
- Oral insulin and intranasal delivery research
- Genetic risk stratification studies

---

### 2. Type 2 Diabetes

```yaml
id: METABOLIC-002
disease_name: "Type 2 Diabetes Mellitus"
category: metabolic
peptide_involvement: "Insulin resistance"
```

**Mechanism:** Progressive insulin resistance in peripheral tissues (muscle, liver, adipose) combined with relative insulin deficiency. Involves dysregulation of GLP-1, GIP, glucagon, and amylin. Chronic hyperglycemia causes beta cell exhaustion over time.

**Symptoms:**
- Often asymptomatic in early stages
- Polyuria and polydipsia
- Fatigue
- Blurred vision
- Slow wound healing
- Recurrent infections
- Acanthosis nigricans

**Diagnosis:**
- Fasting plasma glucose ≥126 mg/dL
- HbA1c ≥6.5%
- Oral glucose tolerance test ≥200 mg/dL at 2 hours
- C-peptide levels (normal/elevated initially)
- HOMA-IR for insulin resistance assessment

**Treatment:**
- Lifestyle modifications (diet, exercise, weight loss)
- Metformin (first-line pharmacotherapy)
- GLP-1 receptor agonists (semaglutide, liraglutide)
- DPP-4 inhibitors
- SGLT2 inhibitors
- Insulin therapy (when indicated)
- Bariatric surgery for eligible patients

**Prognosis:** Progressive disease with potential for complications including cardiovascular disease, nephropathy, neuropathy, retinopathy. Early intervention and GLP-1 based therapies can improve outcomes and potentially achieve remission.

**Research Status:**
- GLP-1/GIP dual agonists (tirzepatide) showing superior efficacy
- Triple agonists (GLP-1/GIP/glucagon) in development
- Beta cell regeneration research
- Precision medicine approaches
- Gut microbiome modulation studies

---

### 3. Obesity

```yaml
id: METABOLIC-003
disease_name: "Obesity"
category: metabolic
peptide_involvement: "Leptin resistance"
```

**Mechanism:** Leptin resistance disrupts satiety signaling despite elevated leptin levels. Involves dysregulation of ghrelin, PYY, GLP-1, CCK, and adipokines. Chronic low-grade inflammation and insulin resistance contribute to metabolic dysfunction.

**Symptoms:**
- Excess body fat (BMI ≥30)
- Dyspnea on exertion
- Joint pain
- Sleep apnea
- Skin fold infections
- Psychological distress
- Reduced mobility

**Diagnosis:**
- BMI ≥30 kg/m²
- Waist circumference (men >102cm, women >88cm)
- Body composition analysis (DEXA)
- Leptin levels (typically elevated)
- Metabolic syndrome screening
- Comorbidity assessment

**Treatment:**
- Caloric restriction and dietary modification
- Physical activity programs
- GLP-1 receptor agonists (semaglutide, liraglutide)
- Tirzepatide (GLP-1/GIP dual agonist)
- Orlistat (lipase inhibitor)
- Bariatric surgery (sleeve gastrectomy, gastric bypass)
- Behavioral therapy

**Prognosis:** Chronic condition with significant morbidity and mortality risk. Weight loss of 5-10% improves metabolic parameters. GLP-1 agonists achieving 15-20% weight loss represent major advancement. Surgery achieves most durable results.

**Research Status:**
- GLP-1/GIP/glucagon triple agonists in trials
- Oral semaglutide formulations
- Amylin analogs for weight management
- Leptin sensitizers research
- Brown fat activation strategies
- Microbiome-based interventions

---

### 4. Metabolic Syndrome

```yaml
id: METABOLIC-004
disease_name: "Metabolic Syndrome"
category: metabolic
peptide_involvement: "Multiple peptide dysregulation"
```

**Mechanism:** Cluster of metabolic abnormalities involving insulin resistance, visceral adiposity, and chronic inflammation. Dysregulation of adipokines (leptin, adiponectin), incretins (GLP-1), and inflammatory cytokines (TNF-α, IL-6).

**Symptoms:**
- Central obesity
- Elevated blood pressure
- Elevated fasting glucose
- Dyslipidemia (high triglycerides, low HDL)
- Fatigue
- Acanthosis nigricans
- Increased cardiovascular risk

**Diagnosis:**
- Requires 3 of 5 criteria:
  - Waist circumference: men ≥102cm, women ≥88cm
  - Triglycerides ≥150 mg/dL
  - HDL: men <40, women <50 mg/dL
  - Blood pressure ≥130/85 mmHg
  - Fasting glucose ≥100 mg/dL

**Treatment:**
- Weight loss (5-10% body weight)
- DASH diet and Mediterranean diet
- Regular aerobic exercise (150+ min/week)
- Metformin for insulin resistance
- Antihypertensive therapy
- Statin therapy for dyslipidemia
- GLP-1 receptor agonists for comprehensive benefit

**Prognosis:** Increased risk of cardiovascular disease (2x), type 2 diabetes (5x), and stroke. Aggressive lifestyle modification and pharmacotherapy can reduce risk. Treatment of individual components improves outcomes.

**Research Status:**
- GLP-1 agonists addressing multiple components
- Anti-inflammatory peptide therapeutics
- Adiponectin-based therapies
- Precision nutrition approaches
- Gut peptide signaling modulation

---

### 5. Phenylketonuria

```yaml
id: METABOLIC-005
disease_name: "Phenylketonuria (PKU)"
category: metabolic
peptide_involvement: "Amino acid metabolism"
```

**Mechanism:** Autosomal recessive deficiency of phenylalanine hydroxylase (PAH) prevents conversion of phenylalanine to tyrosine. Accumulation of phenylalanine causes neurotoxicity. Involves disruption of amino acid-derived peptide synthesis.

**Symptoms:**
- Intellectual disability (if untreated)
- Seizures
- Behavioral problems
- Eczema
- Musty body odor
- Fair skin and blue eyes
- Developmental delay

**Diagnosis:**
- Newborn screening (Guthrie test)
- Blood phenylalanine levels >120 μmol/L
- Genetic testing for PAH mutations
- BH4 loading test
- Amino acid profile

**Treatment:**
- Phenylalanine-restricted diet
- Sapropterin (BH4 cofactor) for responsive patients
- Pegvaliase (enzyme substitution therapy)
- Large neutral amino acid supplementation
- Monitoring of nutritional status
- Lifelong dietary management

**Prognosis:** Excellent outcomes with early treatment and dietary adherence. Normal intellectual development achievable with early diagnosis. Late treatment results in irreversible neurological damage.

**Research Status:**
- Gene therapy trials in progress
- mRNA therapy approaches
- Novel enzyme substitution therapies
- BH4 responsive variant identification
- Maternal PKU management strategies

---

### 6. Maple Syrup Urine Disease

```yaml
id: METABOLIC-006
disease_name: "Maple Syrup Urine Disease (MSUD)"
category: metabolic
peptide_involvement: "Branched-chain amino acids"
```

**Mechanism:** Deficiency of branched-chain alpha-ketoacid dehydrogenase complex prevents metabolism of leucine, isoleucine, and valine. Accumulation of branched-chain amino acids and their ketoacids causes neurotoxicity and cerebral edema.

**Symptoms:**
- Sweet maple syrup odor in urine
- Poor feeding in neonates
- Lethargy
- Vomiting
- Seizures
- Developmental delay
- Cerebral edema in crisis

**Diagnosis:**
- Newborn screening
- Elevated branched-chain amino acids
- Alloisoleucine presence
- Genetic testing (BCKDHA, BCKDHB, DBT genes)
- Urine organic acids

**Treatment:**
- Restriction of branched-chain amino acids
- Special metabolic formula
- Thiamine supplementation (responsive forms)
- Emergency protocol for metabolic crises
- Liver transplantation (curative)
- Dietary leucine monitoring

**Prognosis:** Variable depending on variant and treatment adherence. Classic form requires strict management. Liver transplantation can be curative. Metabolic crises can cause irreversible brain damage.

**Research Status:**
- Liver cell transplantation research
- Gene therapy development
- Novel dietary management strategies
- Newborn screening optimization
- Outcome monitoring protocols

---

### 7. Homocystinuria

```yaml
id: METABOLIC-007
disease_name: "Homocystinuria"
category: metabolic
peptide_involvement: "Methionine metabolism"
```

**Mechanism:** Deficiency of cystathionine beta-synthase prevents conversion of homocysteine to cystathionine. Elevated homocysteine causes vascular damage, lens dislocation, and skeletal abnormalities. Involves disruption of methionine-derived peptides.

**Symptoms:**
- Lens dislocation (ectopia lentis)
- Intellectual disability
- Thromboembolism
- Marfanoid habitus
- Osteoporosis
- Psychiatric disturbances
- Malar flush

**Diagnosis:**
- Plasma homocysteine levels (elevated)
- Methionine levels (elevated)
- Methionine loading test
- Genetic testing (CBS gene)
- Newborn screening in some regions

**Treatment:**
- Pyridoxine (vitamin B6) supplementation
- Low methionine diet
- Betaine supplementation
- Folate and B12 supplementation
- Cysteine supplementation
- Anticoagulation for thromboembolism prevention

**Prognosis:** Pyridoxine-responsive patients have better outcomes. Cardiovascular complications are major cause of morbidity. Early treatment prevents intellectual disability and reduces thromboembolic risk.

**Research Status:**
- Novel betaine formulations
- Enzyme replacement research
- Gene therapy potential
- Outcome monitoring studies
- Newborn screening expansion

---

### 8. Gaucher Disease

```yaml
id: METABOLIC-008
disease_name: "Gaucher Disease"
category: metabolic
peptide_involvement: "Enzyme deficiency"
```

**Mechanism:** Deficiency of glucocerebrosidase (acid beta-glucosidase) leads to accumulation of glucocerebroside in macrophages. Gaucher cells infiltrate spleen, liver, bone marrow, and occasionally CNS. Involves lysosomal enzyme dysfunction.

**Symptoms:**
- Hepatosplenomegaly
- Anemia and thrombocytopenia
- Bone pain and crises
- Growth retardation in children
- Fatigue
- Type 2/3: neurological symptoms
- Pulmonary disease

**Diagnosis:**
- Enzyme assay (glucocerebrosidase activity)
- Genetic testing (GBA gene)
- Bone marrow biopsy (Gaucher cells)
- MRI of spleen/liver
- Chitotriosidase levels
- DEXA scan for bone density

**Treatment:**
- Enzyme replacement therapy (imiglucerase, velaglucerase alfa)
- Substrate reduction therapy (eliglustat, miglustat)
- Bone health management
- Splenectomy in severe cases
- Pain management
- Regular monitoring

**Prognosis:** Excellent with ERT for Type 1. Type 2 has poor prognosis with neurological involvement. Type 3 is intermediate. Early treatment prevents irreversible organ damage.

**Research Status:**
- Novel ERT formulations (longer acting)
- Gene therapy trials
- Brain-penetrant substrate reduction
- GBA targeted for Parkinson's research
- Chaperone therapy development

---

### 9. Fabry Disease

```yaml
id: METABOLIC-009
disease_name: "Fabry Disease"
category: metabolic
peptide_involvement: "Enzyme deficiency"
```

**Mechanism:** Deficiency of alpha-galactosidase A leads to accumulation of globotriaosylceramide (Gb3) in lysosomes. Affects endothelial cells, cardiomyocytes, neurons, and kidney cells. X-linked inheritance pattern.

**Symptoms:**
- Acroparesthesias (burning pain in extremities)
- Angiokeratomas
- Hypohidrosis
- Corneal opacity (cornea verticillata)
- Progressive renal insufficiency
- Cardiac hypertrophy
- Stroke

**Diagnosis:**
- Enzyme assay (alpha-galactosidase A)
- Genetic testing (GLA gene)
- Gb3 levels (plasma/urine)
- Kidney biopsy
- Cardiac MRI
- Family screening

**Treatment:**
- Enzyme replacement therapy (agalsidase beta, agalsidase alfa)
- Chaperone therapy (migalastat)
- Pain management (carbamazepine, gabapentin)
- Renal protection (ACE inhibitors)
- Cardiac management
- Anticoagulation for stroke prevention

**Prognosis:** Progressive disease with reduced life expectancy. Males more severely affected. ERT slows progression if started early. Cardiac and renal complications are major causes of morbidity.

**Research Status:**
- Substrate reduction therapy trials
- Gene therapy development
- mRNA therapy approaches
- Novel ERT with improved biodistribution
- Newborn screening advocacy

---

### 10. Pompe Disease

```yaml
id: METABOLIC-010
disease_name: "Pompe Disease"
category: metabolic
peptide_involvement: "Enzyme deficiency"
```

**Mechanism:** Deficiency of acid alpha-glucosidase (GAA) leads to lysosomal glycogen accumulation, particularly in cardiac and skeletal muscle. Infantile form causes severe cardiomyopathy. Late-onform causes progressive myopathy.

**Symptoms:**
- Infantile: Hypertrophic cardiomyopathy, hypotonia, macroglossia
- Late-onset: Proximal muscle weakness, respiratory insufficiency
- Exercise intolerance
- Dysphagia
- Scoliosis
- Fatigue

**Diagnosis:**
- Enzyme assay (GAA activity)
- Genetic testing (GAA gene)
- CK levels (elevated)
- EMG (myopathic pattern)
- Muscle biopsy (glycogen storage)
- Cardiac evaluation

**Treatment:**
- Enzyme replacement therapy (alglucosidase alfa)
- Avalglucosidase alfa (next-gen ERT)
- Physical therapy
- Respiratory support
- Nutritional support
- Cardiac management

**Prognosis:** Infantile form fatal without treatment. ERT has transformed outcomes. Late-onset form is progressive but manageable. Early diagnosis and treatment critical.

**Research Status:**
- Next-generation ERT with improved uptake
- Gene therapy trials
- Substrate reduction research
- Newborn screening implementation
- Combination therapy approaches

---

## Neurological Diseases

### 11. Alzheimer's Disease

```yaml
id: NEUROLOGICAL-001
disease_name: "Alzheimer's Disease"
category: neurological
peptide_involvement: "Amyloid-beta, tau"
```

**Mechanism:** Progressive neurodegeneration involving accumulation of amyloid-beta (Aβ) peptides forming plaques and hyperphosphorylated tau protein forming neurofibrillary tangles. Involves dysregulation of neuropeptides including somatostatin, neuropeptide Y, and substance P.

**Symptoms:**
- Progressive memory loss
- Cognitive decline
- Language difficulties (aphasia)
- Disorientation
- Personality changes
- Behavioral disturbances
- Loss of daily function

**Diagnosis:**
- Clinical criteria (NIA-AA)
- Cognitive testing (MMSE, MoCA)
- CSF biomarkers (Aβ42, total tau, phospho-tau)
- Amyloid PET imaging
- Tau PET imaging
- MRI (hippocampal atrophy)
- Blood biomarkers (p-tau217, Aβ42/40 ratio)

**Treatment:**
- Cholinesterase inhibitors (donepezil, rivastigmine, galantamine)
- Memantine (NMDA antagonist)
- Anti-amyloid antibodies (lecanemab, aducanumab, donanemab)
- Behavioral management
- Caregiver support
- Clinical trial participation

**Prognosis:** Progressive and fatal disease. Average survival 8-12 years after diagnosis. Anti-amyloid therapies modestly slow progression. No current cure.

**Research Status:**
- Anti-amyloid antibodies approved
- Anti-tau therapies in trials
- Combination approaches
- Blood-based biomarkers advancing
- Prevention trials (A4, DIAN-TU)
- Neuroinflammation targeting

---

### 12. Parkinson's Disease

```yaml
id: NEUROLOGICAL-002
disease_name: "Parkinson's Disease"
category: neurological
peptide_involvement: "Alpha-synuclein"
```

**Mechanism:** Progressive loss of dopaminergic neurons in substantia nigra with accumulation of alpha-synuclein aggregates (Lewy bodies). Involves dysregulation of dopamine, substance P, and other neuropeptides. Prion-like spreading of alpha-synuclein pathology.

**Symptoms:**
- Resting tremor
- Bradykinesia
- Rigidity
- Postural instability
- Micrographia
- Masked facies
- Shuffling gait
- Non-motor: depression, constipation, REM sleep disorder

**Diagnosis:**
- Clinical criteria (MDS)
- DaTscan (dopamine transporter imaging)
- Response to levodopa
- Alpha-synuclein seed amplification assay (SAA)
- REM sleep disorder as early marker
- Genetic testing (LRRK2, GBA, SNCA)

**Treatment:**
- Levodopa/carbidopa (gold standard)
- Dopamine agonists (pramipexole, ropinirole)
- MAO-B inhibitors (selegiline, rasagiline)
- COMT inhibitors (entacapone)
- Deep brain stimulation (DBS)
- Physical therapy
- Alpha-synuclein targeting therapies (investigational)

**Prognosis:** Progressive disease with 15-20 year disease course. Motor complications develop with levodopa use. Non-motor symptoms become prominent. Quality of life significantly impacted.

**Research Status:**
- Alpha-synuclein immunotherapy in trials
- GLP-1 agonists showing neuroprotection
- Gene therapy approaches
- GBA-targeted therapies
- Alpha-synuclein SAA enabling early diagnosis
- Cell replacement therapy

---

### 13. Huntington's Disease

```yaml
id: NEUROLOGICAL-003
disease_name: "Huntington's Disease"
category: neurological
peptide_involvement: "Huntingtin"
```

**Mechanism:** Autosomal dominant trinucleotide (CAG) repeat expansion in HTT gene produces mutant huntingtin protein with polyglutamine expansion. Toxic gain-of-function causes selective degeneration of striatal medium spiny neurons.

**Symptoms:**
- Chorea (involuntary movements)
- Cognitive decline
- Psychiatric disturbances (depression, psychosis)
- Dysphagia
- Dysarthria
- Weight loss
- Progressive functional decline

**Diagnosis:**
- Genetic testing (CAG repeat count ≥36)
- Family history
- Clinical presentation
- MRI (caudate atrophy)
- Cognitive assessment
- Genetic counseling

**Treatment:**
- Tetrabenazine/deutetrabenazine (chorea management)
- Antipsychotics for psychiatric symptoms
- Antidepressants
- Physical therapy
- Speech therapy
- Nutritional support
- No disease-modifying therapy yet

**Prognosis:** Progressive and fatal. Average 15-20 years from onset to death. Juvenile form more aggressive. No approved disease-modifying treatment.

**Research Status:**
- Huntingtin-lowering (ASO, RNAi) trials
- Gene editing (CRISPR) research
- Splicing modulators
- Intrabody approaches
- Biomarker development
- Premanifest carrier studies

---

### 14. Multiple Sclerosis

```yaml
id: NEUROLOGICAL-004
disease_name: "Multiple Sclerosis"
category: neurological
peptide_involvement: "Myelin peptides"
```

**Mechanism:** Autoimmune attack on myelin sheath involving T-cell and B-cell responses against myelin peptides (MBP, PLP, MOG). Demyelination and axonal damage in CNS. Involves complex cytokine and chemokine networks.

**Symptoms:**
- Visual disturbances (optic neuritis)
- Numbness/tingling
- Muscle weakness
- Spasticity
- Fatigue
- Balance problems
- Cognitive impairment
- Bladder dysfunction

**Diagnosis:**
- McDonald criteria
- MRI (dissemination in time and space)
- CSF oligoclonal bands
- Visual evoked potentials
- Neurofilament light chain
- Clinical relapses

**Treatment:**
- Disease-modifying therapies:
  - Interferons, glatiramer acetate
  - Natalizumab, ocrelizumab
  - Fingolimod, dimethyl fumarate
  - Cladribine, alemtuzumab
- Corticosteroids for relapses
- Symptomatic management
- Rehabilitation

**Prognosis:** Variable course (relapsing-remitting, progressive). Early aggressive treatment improves long-term outcomes. Most patients maintain reasonable function. Progressive forms have fewer treatment options.

**Research Status:**
- BTK inhibitors in trials
- Remyelination strategies
- Neuroprotection approaches
- Biomarker-guided treatment
- EBV connection research
- Gut microbiome studies

---

### 15. Amyotrophic Lateral Sclerosis

```yaml
id: NEUROLOGICAL-005
disease_name: "Amyotrophic Lateral Sclerosis (ALS)"
category: neurological
peptide_involvement: "SOD1"
```

**Mechanism:** Progressive degeneration of upper and lower motor neurons. Involves misfolded SOD1, TDP-43, and FUS protein aggregation. Glutamate excitotoxicity, oxidative stress, and neuroinflammation contribute. Prion-like propagation of protein pathology.

**Symptoms:**
- Progressive muscle weakness
- Fasciculations
- Spasticity
- Dysphagia
- Dysarthria
- Respiratory failure
- Cognitive impairment (in some cases)
- Frontotemporal dementia (subset)

**Diagnosis:**
- El Escorial criteria
- EMG/nerve conduction studies
- Clinical progression
- Genetic testing (SOD1, C9orf72, FUS, TARDBP)
- Neurofilament levels
- Exclusion of mimics

**Treatment:**
- Riluzole (glutamate modulator)
- Edaravone (free radical scavenger)
- Tofersen (SOD1-targeted ASO)
- Non-invasive ventilation
- Nutritional support
- Speech therapy
- Multidisciplinary care

**Prognosis:** Median survival 3-5 years from diagnosis. Respiratory failure is usual cause of death. SOD1 mutations may have different prognosis with targeted therapy. Variable progression rates.

**Research Status:**
- Antisense oligonucleotides for specific mutations
- Gene therapy approaches
- Stem cell trials
- C9orf72 targeting strategies
- Biomarker development
- Combination therapy trials

---

### 16. Prion Diseases

```yaml
id: NEUROLOGICAL-006
disease_name: "Prion Diseases (Transmissible Spongiform Encephalopathies)"
category: neurological
peptide_involvement: "PrPSc (pathological prion protein)"
```

**Mechanism:** Misfolding of normal prion protein (PrPC) into pathological form (PrPSc) which is resistant to protease digestion. Template-directed conversion causes spongiform degeneration. Includes CJD, GSS, FFI, kuru, and variant CJD.

**Symptoms:**
- Rapid cognitive decline
- Myoclonus
- Cerebellar ataxia
- Visual disturbances
- Behavioral changes
- Insomnia (in FFI)
- Pyramidal/extrapyramidal signs

**Diagnosis:**
- Clinical presentation
- CSF 14-3-3 protein
- RT-QuIC assay (highly specific)
- MRI (cortical ribboning, caudate signal)
- EEG (periodic sharp waves)
- Definitive: brain biopsy/autopsy
- Genetic testing (familial forms)

**Treatment:**
- No effective treatment available
- Supportive care
- Quinacrine (investigational, not proven)
- Antisense oligonucleotides (research)
- Palliative care focus
- Infection control measures

**Prognosis:** Universally fatal. Sporadic CJD: months to 1-2 years. Variant CJD: slightly longer. Familial forms variable. No cure or disease-modifying treatment.

**Research Status:**
- ASO therapy (ION717/prersenersen) in trials
- Anti-prion antibodies
- Small molecule inhibitors
- Genetic risk factor research
- Improved diagnostics
- Surveillance networks

---

### 17. Epilepsy

```yaml
id: NEUROLOGICAL-007
disease_name: "Epilepsy"
category: neurological
peptide_involvement: "Neuropeptide imbalance"
```

**Mechanism:** Imbalance between excitatory and inhibitory neurotransmission involving neuropeptides. Galanin, neuropeptide Y, and dynorphin have anticonvulsant effects. Substance P and corticotropin-releasing hormone are proconvulsant. Disruption of neuropeptide homeostasis.

**Symptoms:**
- Recurrent seizures (focal or generalized)
- Loss of consciousness
- Convulsions
- Aura (focal seizures)
- Post-ictal confusion
- Status epilepticus (severe)
- Cognitive decline (chronic)

**Diagnosis:**
- Clinical seizure description
- EEG (interictal and ictal)
- Video-EEG monitoring
- MRI brain
- Genetic testing (epilepsy panels)
- Metabolic workup
- Seizure classification

**Treatment:**
- Antiepileptic drugs (AEDs)
- Vagus nerve stimulation
- Ketogenic diet
- Epilepsy surgery
- Responsive neurostimulation
- Neuropeptide-based therapies (research)
- Lifestyle modifications

**Prognosis:** 60-70% achieve seizure freedom with medication. 30% have drug-resistant epilepsy. Surgical candidates may achieve freedom. Quality of life significantly impacted.

**Research Status:**
- Neuropeptide-based anticonvulsants
- Galanin receptor agonists
- Gene therapy for genetic epilepsies
- Optogenetics
- Biomarker-guided treatment
- Precision medicine approaches

---

### 18. Depression

```yaml
id: NEUROLOGICAL-008
disease_name: "Major Depressive Disorder"
category: neurological
peptide_involvement: "Neuropeptide imbalance"
```

**Mechanism:** Dysregulation of neuropeptide systems including corticotropin-releasing hormone (CRH), neuropeptide Y, substance P, and oxytocin. HPA axis hyperactivity. Inflammation-associated peptides elevated. Altered neuroplasticity signaling.

**Symptoms:**
- Persistent sadness
- Anhedonia
- Fatigue
- Sleep disturbances
- Appetite changes
- Cognitive impairment
- Suicidal ideation
- Psychomotor changes

**Diagnosis:**
- DSM-5 criteria
- PHQ-9 screening
- Clinical interview
- Thyroid function
- CRP levels
- Rule out bipolar disorder
- Safety assessment

**Treatment:**
- SSRIs/SNRIs (first-line)
- Psychotherapy (CBT, IPT)
- Ketamine/esketamine (treatment-resistant)
- ECT (severe cases)
- TMS
- Exercise
- Neuropeptide modulators (research)

**Prognosis:** 50% response to first antidepressant. Treatment-resistant cases in 30%. Recurrence common. Neuropeptide-based approaches may address treatment-resistant depression.

**Research Status:**
- CRH receptor antagonists
- Neuropeptide S receptor modulators
- Psilocybin and psychedelic research
- Oxytocin-based therapies
- Inflammatory biomarker-guided treatment
- Rapid-acting antidepressants

---

### 19. Anxiety Disorders

```yaml
id: NEUROLOGICAL-009
disease_name: "Anxiety Disorders"
category: neurological
peptide_involvement: "Neuropeptide imbalance"
```

**Mechanism:** Dysregulation of neuropeptides including CRH, cholecystokinin (CCK), neuropeptide Y, and substance P. Amygdala hyperactivation. GABAergic and serotonergic system involvement. HPA axis dysregulation.

**Symptoms:**
- Excessive worry
- Restlessness
- Panic attacks
- Avoidance behavior
- Somatic symptoms (palpitations, sweating)
- Sleep disturbance
- Muscle tension
- Cognitive distortions

**Diagnosis:**
- DSM-5 criteria
- GAD-7, PHQ screens
- Clinical interview
- Rule out medical causes
- Comorbidity assessment
- Functional impairment evaluation

**Treatment:**
- SSRIs/SNRIs
- Benzodiazepines (short-term)
- CBT
- Exposure therapy
- Buspirone
- Neuropeptide modulators (research)
- Mindfulness-based approaches

**Prognosis:** Good with treatment. 60-80% respond to first-line therapy. Chronic course possible. Comorbidity with depression common. Neuropeptide targets may improve outcomes.

**Research Status:**
- CRH receptor antagonists
- CCK receptor antagonists
- Neuropeptide Y agonists
- Neurokinin receptor modulators
- Oxytocin augmentation
- Biomarker-guided treatment

---

### 20. Schizophrenia

```yaml
id: NEUROLOGICAL-010
disease_name: "Schizophrenia"
category: neurological
peptide_involvement: "Neuropeptide imbalance"
```

**Mechanism:** Dysregulation of neuropeptides including cholecystokinin (CCK), neuropeptide Y, substance P, and vasopressin. Dopamine/glutamate imbalance. Neurodevelopmental origins. Involves disrupted cortical connectivity.

**Symptoms:**
- Hallucinations
- Delusions
- Disorganized speech
- Negative symptoms (flat affect, avolition)
- Cognitive deficits
- Social withdrawal
- Anhedonia

**Diagnosis:**
- DSM-5 criteria
- Clinical assessment
- PANSS scale
- Rule out substance use
- Rule out medical conditions
- Neuroimaging
- Cognitive testing

**Treatment:**
- Antipsychotics (first/second generation)
- Clozapine (treatment-resistant)
- Psychosocial interventions
- CBT for psychosis
- Supported employment
- Family therapy
- Neuropeptide modulators (research)

**Prognosis:** Chronic condition with variable course. 20% achieve good recovery. 60% have moderate disability. Treatment resistance in 30%. Neuropeptide-based approaches may address negative/cognitive symptoms.

**Research Status:**
- CCK-B receptor antagonists
- Oxytocin augmentation
- Neuropeptide S research
- TAAR1 agonists (new mechanism)
- Muscarinic agonists
- Biomarker-guided treatment

---

## Cancer Diseases

### 21. Breast Cancer

```yaml
id: CANCER-001
disease_name: "Breast Cancer"
category: cancer
peptide_involvement: "HER2, estrogen receptors"
```

**Mechanism:** Involves HER2/neu (ErbB2) receptor tyrosine kinase overexpression in 20-25% of cases. Estrogen receptor signaling drives hormone receptor-positive cancers. Peptide growth factors (EGF, FGF, VEGF) promote proliferation and angiogenesis.

**Symptoms:**
- Breast lump
- Nipple discharge
- Skin changes (dimpling, retraction)
- Axillary lymphadenopathy
- Breast pain
- Nipple retraction
- Inflammatory signs (inflammatory breast cancer)

**Diagnosis:**
- Mammography
- Ultrasound
- Biopsy with histology
- ER/PR/HER2 status
- Ki-67 index
- Oncotype DX
- BRCA1/2 testing
- Staging (CT, bone scan, PET)

**Treatment:**
- Surgery (lumpectomy, mastectomy)
- Chemotherapy
- Endocrine therapy (tamoxifen, aromatase inhibitors)
- HER2-targeted (trastuzumab, pertuzumab, T-DM1)
- CDK4/6 inhibitors
- Immunotherapy (TNBC)
- Radiation therapy

**Prognosis:** 5-year survival >90% for localized disease. HER2-targeted therapy dramatically improved HER2+ outcomes. TNBC has worse prognosis. Metastatic disease remains incurable but treatable.

**Research Status:**
- Antibody-drug conjugates (sacituzumab govitecan)
- Novel HER2-targeted agents
- CDK4/6 inhibitor optimization
- Immunotherapy combinations
- Peptide vaccine trials
- Liquid biopsy monitoring

---

### 22. Prostate Cancer

```yaml
id: CANCER-002
disease_name: "Prostate Cancer"
category: cancer
peptide_involvement: "PSA, androgens"
```

**Mechanism:** Androgen receptor signaling drives prostate cancer growth. PSA (prostate-specific antigen) is kallikrein-related peptidase. Involves peptide growth factors and androgen-regulated gene expression. Castration-resistant progression involves AR pathway reactivation.

**Symptoms:**
- Often asymptomatic early
- Urinary frequency/urgency
- Nocturia
- Hematuria
- Bone pain (metastatic)
- Weight loss
- Fatigue

**Diagnosis:**
- PSA screening
- Digital rectal exam
- Prostate biopsy (Gleason score)
- MRI prostate
- CT/bone scan staging
- Decipher/ Oncotype DX
- PSMA PET-CT

**Treatment:**
- Active surveillance (low risk)
- Radical prostatectomy
- Radiation therapy
- Androgen deprivation therapy (ADT)
- Novel hormonal agents (abiraterone, enzalutamide)
- Chemotherapy (docetaxel, cabazitaxel)
- PSMA-targeted therapy (Lu-177 PSMA)

**Prognosis:** Excellent for localized disease (>95% 5-year survival). Metastatic castration-resistant disease has limited survival. PSMA-therapy improving outcomes.

**Research Status:**
- PSMA-targeted therapies expanding
- Bispecific antibodies
- Peptide receptor radionuclide therapy
- AR degraders
- Immunotherapy combinations
- Biomarker development

---

### 23. Pancreatic Cancer

```yaml
id: CANCER-003
disease_name: "Pancreatic Cancer"
category: cancer
peptide_involvement: "CA 19-9"
```

**Mechanism:** CA 19-9 (sialyl-Lewis A) is mucin peptide antigen used as tumor marker. KRAS mutations in >90% of pancreatic ductal adenocarcinoma. Involves dysregulation of growth factor peptides and desmoplastic stroma.

**Symptoms:**
- Abdominal pain
- Weight loss
- Jaundice (pancreatic head tumors)
- New-onset diabetes
- Steatorrhea
- Fatigue
- Trousseau syndrome (thrombophlebitis)

**Diagnosis:**
- CT abdomen with contrast
- EUS with biopsy
- CA 19-9 levels
- KRAS/NRAS/BRAF testing
- BRCA1/2 testing
- MRI/MRCP
- Staging laparoscopy

**Treatment:**
- Surgery (Whipple procedure) if resectable
- Neoadjuvant chemotherapy (FOLFIRINOX, gemcitabine/nab-paclitaxel)
- Adjuvant chemotherapy
- Radiation
- Immunotherapy (MSI-high)
- PARP inhibitors (BRCA-mutated)
- Palliative care

**Prognosis:** Poor overall. 5-year survival ~10%. Resectable: 20-25%. Early detection critical. Most diagnosed at advanced stage.

**Research Status:**
- KRAS G12C inhibitors
- Peptide-based vaccines
- Stromal targeting strategies
- Early detection biomarkers
- Immunotherapy combinations
- Tumor microenvironment modulation

---

### 24. Ovarian Cancer

```yaml
id: CANCER-004
disease_name: "Ovarian Cancer"
category: cancer
peptide_involvement: "CA-125"
```

**Mechanism:** CA-125 (MUC16) is high molecular weight mucin peptide used for monitoring. Involves BRCA1/2 homologous recombination deficiency. Peptide growth factors (VEGF, PDGF) drive angiogenesis and progression.

**Symptoms:**
- Abdominal bloating
- Pelvic pain
- Early satiety
- Urinary frequency
- Ascites
- Fatigue
- Often asymptomatic until advanced

**Diagnosis:**
- CA-125 levels
- Transvaginal ultrasound
- CT abdomen/pelvis
- BRCA1/2 testing
- HE4 (additional marker)
- ROMA algorithm
- Surgical staging

**Treatment:**
- Cytoreductive surgery
- Platinum-based chemotherapy (carboplatin/paclitaxel)
- PARP inhibitors (maintenance)
- Bevacizumab
- Hyperthermic intraperitoneal chemotherapy
- Immunotherapy (MSI-high)
- Hormonal therapy (low-grade serous)

**Prognosis:** 5-year survival ~50% overall. Early stage: >90%. Advanced: 30%. PARP inhibitors improved BRCA-mutated outcomes. High recurrence rate.

**Research Status:**
- Novel PARP combinations
- Antibody-drug conjugates
- Peptide vaccines
- Folate receptor targeting
- Immunotherapy combinations
- Early detection strategies

---

### 25. Colorectal Cancer

```yaml
id: CANCER-005
disease_name: "Colorectal Cancer"
category: cancer
peptide_involvement: "CEA"
```

**Mechanism:** CEA (carcinoembryonic antigen) is glycoprotein peptide used for monitoring. Involves APC/Wnt, KRAS, TP53, and TGF-β pathways. Microsatellite instability in subset. Peptide growth factors drive proliferation.

**Symptoms:**
- Change in bowel habits
- Rectal bleeding
- Abdominal pain
- Weight loss
- Iron deficiency anemia
- Obstruction (advanced)
- Tenemus

**Diagnosis:**
- Colonoscopy with biopsy
- CEA levels
- CT chest/abd/pelvis
- MSI/MMR testing
- KRAS/NRAS/BRAF testing
- Liver function tests
- PET-CT (if indicated)

**Treatment:**
- Surgery (colectomy)
- Chemotherapy (FOLFOX, FOLFIRI)
- Targeted therapy (bevacizumab, cetuximab)
- Immunotherapy (MSI-high)
- Radiation (rectal cancer)
- Hepatic metastasectomy
- Ablation therapies

**Prognosis:** 5-year survival: localized 90%, regional 70%, distant 15%. MSI-high tumors have better prognosis with immunotherapy. Early detection via screening improves outcomes.

**Research Status:**
- ctDNA-guided treatment
- Novel immunotherapy combinations
- Peptide vaccines
- HER2-targeted therapy
- KRAS G12C inhibitors
- Screening optimization

---

### 26. Liver Cancer

```yaml
id: CANCER-006
disease_name: "Hepatocellular Carcinoma"
category: cancer
peptide_involvement: "AFP (alpha-fetoprotein)"
```

**Mechanism:** AFP is oncofetal peptide glycoprotein used as biomarker. Involves Wnt/β-catenin, TERT promoter, and TP53 mutations. Chronic liver disease/cirrhosis creates tumor-promoting microenvironment. Peptide growth factors (VEGF, FGF) drive angiogenesis.

**Symptoms:**
- Abdominal pain
- Weight loss
- Jaundice
- Ascites
- Hepatomegaly
- Liver failure signs
- Often found on surveillance

**Diagnosis:**
- AFP levels
- Ultrasound surveillance
- CT/MRI with contrast (LI-RADS)
- Biopsy (if needed)
- Liver function tests
- Hepatitis B/C status
- Barcelona Clinic staging

**Treatment:**
- Surgical resection
- Liver transplantation
- Locoregional therapy (TACE, ablation)
- Systemic therapy (atezolizumab/bevacizumab)
- Sorafenib, lenvatinib
- Radiation (SBRT)
- Clinical trials

**Prognosis:** 5-year survival variable by stage. Early detected/transplant: 70%. Advanced: <20%. Underlying liver function impacts outcomes.

**Research Status:**
- Immunotherapy combinations
- Novel targeted agents
- Peptide-based biomarkers
- ctDNA monitoring
- CAR-T cell therapy
- Early detection strategies

---

### 27. Lung Cancer

```yaml
id: CANCER-007
disease_name: "Lung Cancer"
category: cancer
peptide_involvement: "Various biomarkers"
```

**Mechanism:** Involves multiple peptide biomarkers including CYFRA 21-1 (cytokeratin 19), proGRP (gastrin-releasing peptide precursor), NSE, and SCC antigen. Driver mutations (EGFR, ALK, ROS1, KRAS) involve receptor tyrosine kinase peptide signaling.

**Symptoms:**
- Cough
- Hemoptysis
- Dyspnea
- Chest pain
- Weight loss
- Hoarseness
- Superior vena cava syndrome

**Diagnosis:**
- CT chest
- Biopsy with molecular testing
- CYFRA 21-1, proGRP, NSE
- PD-L1 expression
- NGS panel (EGFR, ALK, ROS1, KRAS, etc.)
- PET-CT staging
- Brain MRI

**Treatment:**
- Surgery (early stage)
- Targeted therapy (osimertinib, alectinib, sotorasib)
- Immunotherapy (pembrolizumab, nivolumab)
- Chemotherapy
- Radiation (SBRT, conventional)
- Combination approaches

**Prognosis:** 5-year survival: localized 60%, regional 35%, distant 7%. Targeted therapy and immunotherapy dramatically improved outcomes for subsets.

**Research Status:**
- Novel targeted agents
- Antibody-drug conjugates
- Bispecific antibodies
- KRAS G12C/C inhibitors
- Peptide vaccines
- ctDNA-guided treatment

---

### 28. Thyroid Cancer

```yaml
id: CANCER-008
disease_name: "Thyroid Cancer"
category: cancer
peptide_involvement: "Calcitonin"
```

**Mechanism:** Calcitonin is peptide hormone secreted by parafollicular C cells; elevated in medullary thyroid carcinoma (MTC). RET proto-oncogene mutations in hereditary MTC. Thyroglobulin peptide used for monitoring differentiated thyroid cancer.

**Symptoms:**
- Thyroid nodule
- Neck mass
- Dysphagia
- Hoarseness
- Diarrhea (MTC - calcitonin effect)
- Flushing
- Cervical lymphadenopathy

**Diagnosis:**
- Thyroid ultrasound
- FNA biopsy
- Calcitonin levels (MTC)
- Thyroglobulin (differentiated)
- RET mutation testing
- CEA levels (MTC)
- CT/MRI for staging

**Treatment:**
- Thyroidectomy
- Radioactive iodine (differentiated)
- Thyroid hormone suppression
- Vandetanib, cabozantinib (MTC)
- Selpercatinib, pralsetinib (RET-mutant)
- External beam radiation
- Observation (papillary microcarcinoma)

**Prognosis:** Excellent for differentiated (papillary, follicular). MTC: 10-year survival 75%. Anaplastic: very poor. RET-targeted therapy improving MTC outcomes.

**Research Status:**
- Novel RET inhibitors
- Calcitonin as biomarker optimization
- Immunotherapy trials
- Peptide receptor targeting
- Molecular risk stratification
- Active surveillance protocols

---

### 29. Neuroendocrine Tumors

```yaml
id: CANCER-009
disease_name: "Neuroendocrine Tumors"
category: cancer
peptide_involvement: "Chromogranin A"
```

**Mechanism:** Chromogranin A (CgA) is peptide secreted by neuroendocrine cells; universal NET marker. Involves peptide hormone secretion (serotonin, gastrin, insulin, etc.) causing functional syndromes. mTOR pathway dysregulation common.

**Symptoms:**
- Carcinoid syndrome (flushing, diarrhea, wheezing)
- Hormone-specific syndromes
- Abdominal pain
- Weight loss
- Obstruction
- Pellagra (serotonin-mediated)
- Variable depending on primary site

**Diagnosis:**
- Chromogranin A levels
- 5-HIAA (urine)
- CT/MRI
- Ga-68 DOTATATE PET/CT
- Biopsy with Ki-67
- Functional hormone testing
- Endoscopy

**Treatment:**
- Somatostatin analogs (octreotide, lanreotide)
- PRRT (Lu-177 DOTATATE)
- Surgery
- Everolimus
- Sunitinib (pancreatic NETs)
- Liver-directed therapy
- Chemotherapy (high-grade)

**Prognosis:** Variable by grade. Well-differentiated: 5-year survival 80-90%. Poorly differentiated: <30%. PRRT improving outcomes. Chronic disease course common.

**Research Status:**
- Novel PRRT agents
- Immunotherapy trials
- Peptide receptor targeting
- Molecular profiling
- Combination therapies
- Biomarker optimization

---

### 30. Multiple Myeloma

```yaml
id: CANCER-010
disease_name: "Multiple Myeloma"
category: cancer
peptide_involvement: "M-protein (monoclonal immunoglobulin)"
```

**Mechanism:** Clonal plasma cell neoplasm producing monoclonal immunoglobulin (M-protein) - complete or partial peptide chains. Involves cytokine dysregulation (IL-6, BAFF, APRIL). Bone marrow microenvironment supports tumor growth.

**Symptoms:**
- Bone pain (especially back)
- Anemia
- Renal insufficiency
- Hypercalcemia
- Recurrent infections
- Fatigue
- Weight loss

**Diagnosis:**
- Serum protein electrophoresis (SPEP)
- Immunofixation
- Free light chains
- Bone marrow biopsy
- Skeletal survey/PET-CT
- Cytogenetics/FISH
- CRAB criteria

**Treatment:**
- Proteasome inhibitors (bortezomib, carfilzomib)
- IMiDs (lenalidomide, pomalidomide)
- Anti-CD38 (daratumumab)
- CAR-T cell therapy (ide-cel, cilta-cel)
- Bispecific antibodies
- Autologous stem cell transplant
- Radiation for bone lesions

**Prognosis:** Median survival improved to 6-7 years with novel therapies. High-risk cytogenetics worse. CAR-T transforming relapsed/refractory disease.

**Research Status:**
- Novel bispecific antibodies
- CELMoDs
- BCMA-targeting ADCs
- GPRC5D-directed therapies
- MRD-guided treatment
- Peptide-based approaches

---

## Cardiovascular Diseases

### 31. Heart Failure

```yaml
id: CARDIOVASCULAR-001
disease_name: "Heart Failure"
category: cardiovascular
peptide_involvement: "BNP, NT-proBNP"
```

**Mechanism:** B-type natriuretic peptide (BNP) and NT-proBNP released from ventricular cardiomyocytes in response to wall stress. Physiological role includes natriuresis, vasodilation, and RAAS antagonism. Levels reflect cardiac wall stress and volume overload.

**Symptoms:**
- Dyspnea (exertion, orthopnea, PND)
- Fatigue
- Edema
- Weight gain
- Exercise intolerance
- Cough
- Nocturia

**Diagnosis:**
- BNP/NT-proBNP levels
- Echocardiography
- Chest X-ray
- ECG
- Cardiac MRI (if indicated)
- NYHA classification
- Etiology workup

**Treatment:**
- ACE inhibitors/ARBs/ARNI
- Beta-blockers
- Mineralocorticoid antagonists
- SGLT2 inhibitors
- Diuretics
- Device therapy (CRT, ICD)
- Sacubitril/valsartan

**Prognosis:** Chronic progressive condition. 5-year mortality ~50%. Guideline-directed medical therapy significantly improves outcomes. BNP-guided therapy debated.

**Research Status:**
- Novel natriuretic peptide enhancing agents
- Soluble guanylate cyclase stimulators
- Gene therapy approaches
- Stem cell therapy
- BNP-guided treatment optimization
- SGLT2 inhibitor mechanisms

---

### 32. Myocardial Infarction

```yaml
id: CARDIOVASCULAR-002
disease_name: "Myocardial Infarction"
category: cardiovascular
peptide_involvement: "Troponin"
```

**Mechanism:** Cardiac troponins (cTnI, cTnT) are regulatory proteins released from damaged cardiomyocytes. High-sensitivity troponin assays detect myocardial injury with high sensitivity. Troponin elevation indicates myocardial necrosis.

**Symptoms:**
- Chest pain/pressure
- Radiation to arm, jaw, back
- Dyspnea
- Diaphoresis
- Nausea/vomiting
- Syncope
- Anxiety

**Diagnosis:**
- High-sensitivity troponin (serial)
- ECG (ST changes, Q waves)
- Coronary angiography
- Echocardiography
- CK-MB (historical)
- Clinical presentation

**Treatment:**
- Emergency PCI (primary PCI)
- Dual antiplatelet therapy
- Anticoagulation
- Beta-blockers
- ACE inhibitors
- High-intensity statins
- Cardiac rehabilitation

**Prognosis:** Depends on infarct size, reperfusion time, and comorbidities. Early reperfusion improves survival. Heart failure development in 25%.

**Research Status:**
- High-sensitivity troponin algorithms
- Point-of-care testing
- Novel antiplatelet agents
- Cardioprotection strategies
- Regenerative approaches
- Biomarker-guided therapy

---

### 33. Hypertension

```yaml
id: CARDIOVASCULAR-003
disease_name: "Hypertension"
category: cardiovascular
peptide_involvement: "Angiotensin"
```

**Mechanism:** Renin-angiotensin-aldosterone system (RAAS) dysregulation. Angiotensin II is potent vasoconstrictive peptide. Involves endothelin, natriuretic peptides, bradykinin, and other vasoactive peptides. Chronic elevation causes end-organ damage.

**Symptoms:**
- Usually asymptomatic
- Headache (severe)
- Visual disturbances
- Epistaxis
- Chest pain
- Dyspnea
- Target organ damage symptoms

**Diagnosis:**
- Blood pressure measurement (≥130/80 mmHg)
- Ambulatory BP monitoring
- Renal function
- Urinalysis
- Lipid panel
- ECG
- Secondary cause workup

**Treatment:**
- Lifestyle modifications
- ACE inhibitors/ARBs
- Calcium channel blockers
- Thiazide diuretics
- Mineralocorticoid antagonists
- Renin inhibitors
- Combination therapy

**Prognosis:** Controllable with treatment. Uncontrolled hypertension increases cardiovascular risk 2-3 fold. Target organ damage (heart, kidney, brain) reduces life expectancy.

**Research Status:**
- Renin-angiotensin system modulation
- Endothelin receptor antagonists
- Neprilysin inhibitors
- Aminopeptidase A inhibitors
- Vaccine approaches
- Precision medicine

---

### 34. Atherosclerosis

```yaml
id: CARDIOVASCULAR-004
disease_name: "Atherosclerosis"
category: cardiovascular
peptide_involvement: "Inflammatory peptides"
```

**Mechanism:** Chronic inflammatory process involving cytokine peptides (IL-1β, IL-6, TNF-α), chemokines, and adhesion molecules. Oxidized LDL triggers inflammatory response. Involves CRP, MMPs, and endothelin. Plaque formation and instability.

**Symptoms:**
- Often asymptomatic until complications
- Angina pectoris
- Claudication
- TIA/stroke symptoms
- Renal artery stenosis symptoms
- Mesenteric ischemia

**Diagnosis:**
- Lipid panel
- CRP (hs-CRP)
- Carotid ultrasound (IMT)
- Coronary calcium score
- CT angiography
- Invasive angiography
- Stress testing

**Treatment:**
- Statins
- Antiplatelet therapy
- Blood pressure control
- Diabetes management
- Smoking cessation
- PCSK9 inhibitors
- Anti-inflammatory therapy (canakinumab)

**Prognosis:** Progressive disease. Risk factor modification slows progression. Statins reduce events 25-35%. Anti-inflammatory approaches emerging.

**Research Status:**
- IL-1β/IL-6 pathway targeting
- Colchicine for inflammation
- HDL-raising therapies
- Lp(a) reduction
- Plaque imaging biomarkers
- Vaccine approaches

---

### 35. Deep Vein Thrombosis

```yaml
id: CARDIOVASCULAR-005
disease_name: "Deep Vein Thrombosis"
category: cardiovascular
peptide_involvement: "D-dimer"
```

**Mechanism:** D-dimer is fibrin degradation product peptide reflecting fibrinolysis of cross-linked fibrin. Elevated in thrombotic states. Involves coagulation cascade peptide activation and fibrinolytic system.

**Symptoms:**
- Leg swelling
- Pain/tenderness
- Warmth
- Erythema
- Homan's sign
- May be asymptomatic
- Pulmonary embolism symptoms

**Diagnosis:**
- D-dimer (high sensitivity)
- Compression ultrasound
- Wells score
- CT venography
- MR venography
- Venography (gold standard)

**Treatment:**
- Anticoagulation (heparin, DOACs)
- Thrombolysis (massive DVT)
- IVC filter (if contraindicated)
- Compression stockings
- Mobilization
- Duration based on risk factors

**Prognosis:** Good with treatment. Post-thrombotic syndrome in 30-50%. Recurrence risk 30% over 10 years without anticoagulation.

**Research Status:**
- Novel anticoagulants
- D-dimer-guided duration
- Prediction models
- Thrombolytic strategies
- Compression therapy optimization
- Biomarker refinement

---

### 36. Pulmonary Embolism

```yaml
id: CARDIOVASCULAR-006
disease_name: "Pulmonary Embolism"
category: cardiovascular
peptide_involvement: "D-dimer"
```

**Mechanism:** D-dimer elevation reflects acute thromboembolism and fibrinolysis. Massive PE causes right ventricular strain. Involves coagulation peptide cascade activation. Neurohormonal activation (BNP, troponin elevation in RV strain).

**Symptoms:**
- Dyspnea (acute onset)
- Chest pain (pleuritic)
- Tachycardia
- Hemoptysis
- Syncope
- Leg swelling (DVT source)
- Anxiety

**Diagnosis:**
- D-dimer
- CT pulmonary angiography
- V/Q scan
- Echocardiography (RV strain)
- Troponin/BNP (risk stratification)
- Wells score
- Pulmonary angiography

**Treatment:**
- Anticoagulation (heparin, DOACs)
- Thrombolysis (massive PE)
- Embolectomy (massive PE)
- ECMO (massive PE with shock)
- IVC filter
- Risk stratification-guided therapy

**Prognosis:** Mortality 2-8% overall. Massive PE: 25-50% without treatment. Early diagnosis and treatment critical. Chronic thromboembolic pulmonary hypertension in subset.

**Research Status:**
- Risk stratification algorithms
- D-dimer age-adjusted cutoffs
- Catheter-directed therapy
- Novel thrombolytics
- Predictive biomarkers
- Long-term outcome studies

---

### 37. Aortic Aneurysm

```yaml
id: CARDIOVASCULAR-007
disease_name: "Aortic Aneurysm"
category: cardiovascular
peptide_involvement: "MMPs (Matrix Metalloproteinases)"
```

**Mechanism:** MMPs (peptide enzymes) degrade extracellular matrix in aortic wall. Imbalance between MMPs and TIMPs (tissue inhibitors of metalloproteinases) leads to wall weakening. Involves inflammatory peptides and TGF-β signaling.

**Symptoms:**
- Often asymptomatic
- Abdominal pulsation (AAA)
- Back pain
- Chest pain (thoracic)
- Compression symptoms
- Rupture (emergency)
- Embolization

**Diagnosis:**
- Ultrasound screening (AAA)
- CT angiography
- MRI
- MMP levels (research)
- Genetic testing (familial)
- Regular surveillance

**Treatment:**
- Surveillance (small aneurysms)
- Open surgical repair
- Endovascular aneurysm repair (EVAR)
- Blood pressure control
- Smoking cessation
- Statin therapy

**Prognosis:** Rupture risk increases with size. 5-year rupture risk: 5cm AAA ~25%. EVAR has lower perioperative mortality. Surveillance critical for small aneurysms.

**Research Status:**
- MMP inhibitors
- Biomarker-guided surveillance
- Novel imaging markers
- Pharmacological stabilization
- Genetic risk factors
- Tissue engineering

---

### 38. Cardiomyopathy

```yaml
id: CARDIOVASCULAR-008
disease_name: "Cardiomyopathy"
category: cardiovascular
peptide_involvement: "Various biomarkers"
```

**Mechanism:** Involves peptide biomarkers including BNP, troponin, galectin-3, sST2, and GDF-15. Genetic forms involve mutations in sarcomeric proteins (peptide components). Inflammatory and metabolic cardiomyopathies involve cytokine peptides.

**Symptoms:**
- Heart failure symptoms
- Arrhythmias
- Syncope
- Chest pain
- Fatigue
- Thromboembolism
- Sudden cardiac death

**Diagnosis:**
- Echocardiography
- Cardiac MRI
- BNP/NT-proBNP
- Troponin
- Genetic testing
- Endomyocardial biopsy (selected)
- Coronary angiography

**Treatment:**
- Guideline-directed heart failure therapy
- Arrhythmia management
- ICD/CRT implantation
- Anticoagulation (if indicated)
- Specific therapies (enzyme replacement for Fabry)
- Transplant evaluation

**Prognosis:** Variable by etiology. Hypertrophic: generally good. Dilated: 5-year survival 50%. Restrictive: poor. Genetic counseling important.

**Research Status:**
- Novel biomarkers (galectin-3, sST2)
- Gene therapy for genetic forms
- Precision medicine approaches
- Myosin modulators (mavacamten)
- RNA-based therapies
- Regenerative approaches

---

### 39. Arrhythmia

```yaml
id: CARDIOVASCULAR-009
disease_name: "Arrhythmia"
category: cardiovascular
peptide_involvement: "Ion channel peptides"
```

**Mechanism:** Cardiac ion channel proteins (peptides) regulate electrical activity. Mutations in sodium, potassium, and calcium channel genes cause channelopathies. Involves peptide signaling in autonomic regulation and structural remodeling.

**Symptoms:**
- Palpitations
- Dizziness
- Syncope
- Dyspnea
- Chest pain
- Fatigue
- Sudden cardiac death

**Diagnosis:**
- ECG/Holter monitoring
- Event recorder
- Electrophysiology study
- Genetic testing (channelopathies)
- Echocardiography
- Cardiac MRI
- Exercise testing

**Treatment:**
- Antiarrhythmic drugs
- Catheter ablation
- Pacemaker
- ICD implantation
- Anticoagulation (AF)
- Lifestyle modifications
- Specific therapies (gene-specific)

**Prognosis:** Variable by type. AF: stroke risk manageable. VT/VF: sudden death risk. Channelopathies: genetic counseling. Ablation increasingly curative.

**Research Status:**
- Gene therapy for channelopathies
- Novel antiarrhythmic mechanisms
- Mapping and ablation technology
- Risk prediction biomarkers
- Anti-fibrotic strategies
- Autonomic modulation

---

### 40. Stroke

```yaml
id: CARDIOVASCULAR-010
disease_name: "Stroke"
category: cardiovascular
peptide_involvement: "Biomarkers"
```

**Mechanism:** Involves peptide biomarkers including NSE, S100B, GFAP, and neurofilament light chain for neuronal injury. Inflammatory cytokines elevated. Natriuretic peptides associated with cardioembolic stroke. Coagulation cascade peptides in thrombotic stroke.

**Symptoms:**
- Sudden weakness/numbness
- Speech difficulties
- Vision loss
- Severe headache (hemorrhagic)
- Ataxia
- Facial droop
- Consciousness changes

**Diagnosis:**
- CT head (hemorrhage vs ischemia)
- MRI brain (DWI)
- Vascular imaging (CTA, MRA)
- Biomarkers (GFAP, NSE)
- Cardiac evaluation
- Lipid panel, HbA1c
- Thrombophilia workup

**Treatment:**
- IV thrombolysis (tPA within 4.5 hours)
- Mechanical thrombectomy (large vessel occlusion)
- Antiplatelet therapy
- Anticoagulation (AF-related)
- Risk factor management
- Rehabilitation
- Decompressive hemicraniectomy (if indicated)

**Prognosis:** 30-day mortality 10-15%. Disability in 50% of survivors. Early treatment critical. Recurrence risk 5-10%/year.

**Research Status:**
- Novel neuroprotectants
- Biomarker-guided triage
- Extended thrombectomy window
- Neurorepair strategies
- Stem cell therapy
- AI-assisted diagnosis

---

## Infectious Diseases

### 41. HIV/AIDS

```yaml
id: INFECTIOUS-001
disease_name: "HIV/AIDS"
category: infectious
peptide_involvement: "Antimicrobial peptides"
```

**Mechanism:** HIV-derived peptides and host antimicrobial peptides (defensins, cathelicidins) involved in innate immunity. Envelope glycoprotein peptides mediate viral entry. Peptide-based immune responses critical for viral control.

**Symptoms:**
- Acute retroviral syndrome
- Lymphadenopathy
- Weight loss
- Opportunistic infections
- Kaposi sarcoma
- CD4 decline
- AIDS-defining illnesses

**Diagnosis:**
- HIV antibody/antigen test (4th generation)
- HIV RNA (viral load)
- CD4 count
- Western blot confirmation
- Genotypic resistance testing
- STI screening

**Treatment:**
- Antiretroviral therapy (ART)
  - Integrase inhibitors (dolutegravir)
  - NRTIs (tenofovir, emtricitabine)
  - NNRTIs, PIs
- Pre-exposure prophylaxis (PrEP)
- Post-exposure prophylaxis (PEP)
- Opportunistic infection prophylaxis

**Prognosis:** Near-normal life expectancy with ART. Viral suppression achievable in >90%. Undetectable = Untransmittable (U=U).

**Research Status:**
- Long-acting injectables (cabotegravir/rilpivirine)
- Broadly neutralizing antibodies
- Peptide-based vaccines
- Cure strategies (shock and kill, block and lock)
- Gene therapy approaches
- Immunomodulatory peptides

---

### 42. Tuberculosis

```yaml
id: INFECTIOUS-002
disease_name: "Tuberculosis"
category: infectious
peptide_involvement: "Peptide diagnostics"
```

**Mechanism:** Mycobacterial peptides presented by MHC molecules trigger T-cell responses. ESAT-6 and CFP-10 peptides used in diagnostic assays. Involves peptide-based interferon-gamma release assays (IGRAs).

**Symptoms:**
- Chronic cough
- Fever
- Night sweats
- Weight loss
- Hemoptysis
- Fatigue
- Lymphadenopathy

**Diagnosis:**
- Tuberculin skin test
- IGRA (QuantiFERON, T-SPOT)
- Sputum AFB smear/culture
- GeneXpert MTB/RIF
- Chest X-ray
- CT chest
- Biopsy (extrapulmonary)

**Treatment:**
- RIPE therapy (rifampin, isoniazid, pyrazinamide, ethambutol)
- Directly observed therapy (DOT)
- Drug susceptibility testing
- MDR-TB regimens (bedaquiline-based)
- Latent TB treatment
- Supportive care

**Prognosis:** Cure rate >95% with appropriate therapy. MDR-TB: 50-60% cure. XDR-TB: poor outcomes. Early diagnosis and adherence critical.

**Research Status:**
- Novel peptide-based diagnostics
- Peptide vaccines (M72/AS01E)
- New drug development
- Biomarker-guided treatment
- Shorter regimen trials
- Transmission blocking strategies

---

### 43. Malaria

```yaml
id: INFECTIOUS-003
disease_name: "Malaria"
category: infectious
peptide_involvement: "Peptide vaccines"
```

**Mechanism:** Plasmodium peptides (CSP, AMA-1, MSP) targeted by immune response and vaccines. Peptide-based vaccine candidates designed from parasite surface proteins. Involves peptide processing in parasite life cycle.

**Symptoms:**
- Fever (cyclical)
- Chills
- Sweats
- Headache
- Myalgia
- Anemia
- Cerebral malaria (severe)

**Diagnosis:**
- Thick/thin blood smear
- Rapid diagnostic test (antigen detection)
- PCR
- Parasitemia quantification
- Species identification
- Severe malaria criteria

**Treatment:**
- Artemisinin-based combination therapy (ACT)
- Chloroquine (sensitive areas)
- Primaquine (P. vivax/ovale hypnozoites)
- Severe: IV artesunate
- Supportive care
- Chemoprophylaxis

**Prognosis:** Uncomplicated: excellent with treatment. Cerebral malaria: 15-20% mortality. P. falciparum most severe. Drug resistance a concern.

**Research Status:**
- RTS,S/AS01 (Mosquirix) vaccine approved
- R21/Matrix-M vaccine showing high efficacy
- Peptide-based vaccine candidates
- Transmission-blocking vaccines
- Novel drug targets
- Elimination strategies

---

### 44. COVID-19

```yaml
id: INFECTIOUS-004
disease_name: "COVID-19"
category: infectious
peptide_involvement: "Peptide therapeutics"
```

**Mechanism:** SARS-CoV-2 spike protein peptide mediates viral entry via ACE2. Peptide-based therapeutics target spike-ACE2 interaction. Involves peptide epitopes for T-cell and B-cell immune responses. Inflammatory cytokine peptides drive severe disease.

**Symptoms:**
- Fever, cough, dyspnea
- Anosmia, ageusia
- Fatigue
- Myalgia
- Pneumonia
- ARDS (severe)
- Multi-organ failure

**Diagnosis:**
- RT-PCR (nasal swab)
- Antigen rapid tests
- Chest CT
- CRP, D-dimer, ferritin
- Troponin (cardiac involvement)
- Antibody testing

**Treatment:**
- Antivirals (nirmatrelvir/ritonavir, remdesivir)
- Monoclonal antibodies
- Corticosteroids (dexamethasone)
- IL-6 inhibitors (tocilizumab)
- JAK inhibitors (baricitinib)
- Supportive care
- Vaccination (prevention)

**Prognosis:** Most recover. Mortality 1-2% overall, higher in elderly/comorbid. Long COVID in 10-20%. Vaccination reduces severity dramatically.

**Research Status:**
- Pan-coronavirus vaccines
- Peptide-based antivirals
- Long COVID mechanisms
- Nasal vaccines
- T-cell based vaccines
- Antiviral peptides

---

### 45. Influenza

```yaml
id: INFECTIOUS-005
disease_name: "Influenza"
category: infectious
peptide_involvement: "Peptide vaccines"
```

**Mechanism:** Influenza hemagglutinin and neuraminidase peptides are vaccine targets. Conserved peptide epitopes sought for universal vaccine. M2 ion channel peptide targeted by peptide-based approaches.

**Symptoms:**
- Acute onset fever
- Myalgia
- Headache
- Cough
- Sore throat
- Fatigue
- Pneumonia (complication)

**Diagnosis:**
- Rapid influenza diagnostic test
- RT-PCR
- Viral culture
- Clinical presentation
- Chest X-ray (pneumonia)

**Treatment:**
- Neuraminidase inhibitors (oseltamivir)
- Baloxavir (cap-dependent endonuclease inhibitor)
- Supportive care
- Vaccination (prevention)
- Antiviral prophylaxis

**Prognosis:** Self-limited in healthy individuals. Mortality <0.1%. Higher in elderly, young children, immunocompromised. Pandemic strains more severe.

**Research Status:**
- Universal influenza vaccine
- Neuraminidase-based vaccines
- Conserved peptide epitopes
- Broadly neutralizing antibodies
- Novel antiviral mechanisms
- mRNA vaccine platforms

---

### 46. Hepatitis

```yaml
id: INFECTIOUS-006
disease_name: "Viral Hepatitis"
category: infectious
peptide_involvement: "Peptide biomarkers"
```

**Mechanism:** Hepatitis viral peptides (HBsAg, HBeAg, HCV core) used as diagnostic markers. Peptide epitopes targeted by immune response. Involves peptide-based vaccine design for HBV.

**Symptoms:**
- Acute: Jaundice, fatigue, nausea, abdominal pain
- Chronic: Often asymptomatic until cirrhosis
- Hepatomegaly
- Dark urine
- Clay-colored stools

**Diagnosis:**
- HBV: HBsAg, anti-HBs, HBeAg, HBV DNA
- HCV: anti-HCV, HCV RNA
- HAV: anti-HAV IgM
- Liver function tests
- Fibroscan/liver biopsy
- Hepatocellular carcinoma screening

**Treatment:**
- HBV: Tenofovir, entecavir (nucleos(t)ide analogs)
- HCV: Direct-acting antivirals (sofosbuvir-based)
- HAV: Supportive care
- Vaccination (HAV, HBV)
- Liver transplantation

**Prognosis:**
- HAV: Self-limited, no chronicity
- HBV: 5% chronic in adults, 90% in neonates
- HCV: 75% chronic, curable with DAAs (>95% SVR)
- Cirrhosis: risk of HCC

**Research Status:**
- HBV cure strategies
- Therapeutic vaccines
- Peptide-based immunotherapy
- HCC surveillance biomarkers
- Novel HBV targets
- Elimination programs

---

### 47. Sepsis

```yaml
id: INFECTIOUS-007
disease_name: "Sepsis"
category: infectious
peptide_involvement: "Procalcitonin"
```

**Mechanism:** Procalcitonin (PCT) is peptide precursor of calcitonin; elevated in bacterial infection. Involves cytokine peptide storm (TNF-α, IL-1β, IL-6). Endotoxin and pathogen-associated molecular peptides trigger immune dysregulation.

**Symptoms:**
- Fever or hypothermia
- Tachycardia
- Tachypnea
- Altered mental status
- Hypotension
- Organ dysfunction
- Lactate elevation

**Diagnosis:**
- Procalcitonin levels
- Blood cultures
- Lactate
- SOFA score
- qSOFA screening
- CBC, CMP
- Source identification

**Treatment:**
- Early antibiotics
- Fluid resuscitation
- Vasopressors
- Source control
- ICU care
- Corticosteroids (if refractory)
- Organ support

**Prognosis:** Mortality 20-30% for sepsis, 40-50% for septic shock. Early recognition and treatment critical. Procalcitonin-guided antibiotic duration beneficial.

**Research Status:**
- PCT-guided antibiotic stewardship
- Novel sepsis biomarkers
- Immunomodulatory therapies
- Precision medicine approaches
- Endotoxin removal
- Anti-cytokine strategies

---

### 48. Pneumonia

```yaml
id: INFECTIOUS-008
disease_name: "Pneumonia"
category: infectious
peptide_involvement: "Biomarkers"
```

**Mechanism:** Involves peptide biomarkers including procalcitonin, CRP, and presepsin for diagnosis and monitoring. Antimicrobial peptides (defensins, cathelicidins) in lung innate immunity. Cytokine peptides mediate inflammatory response.

**Symptoms:**
- Cough
- Fever
- Dyspnea
- Pleuritic chest pain
- Sputum production
- Fatigue
- Confusion (elderly)

**Diagnosis:**
- Chest X-ray
- Procalcitonin, CRP
- Sputum culture
- Blood cultures
- Urinary antigens (Legionella, pneumococcal)
- CT chest (if complicated)
- CURB-65/PSI scoring

**Treatment:**
- Antibiotics (empiric then targeted)
- Supportive care
- Oxygen therapy
- Mechanical ventilation (if needed)
- Corticosteroids (severe)
- Chest physiotherapy
- Vaccination (prevention)

**Prognosis:** Community-acquired: mortality 5-10%. Hospital-acquired: 20-30%. Ventilator-associated: 30-50%. Early antibiotics improve outcomes.

**Research Status:**
- Biomarker-guided therapy
- Novel antimicrobial peptides
- Rapid diagnostic platforms
- Antimicrobial stewardship
- Vaccine development
- Resistance monitoring

---

### 49. Urinary Tract Infection

```yaml
id: INFECTIOUS-009
disease_name: "Urinary Tract Infection"
category: infectious
peptide_involvement: "Antimicrobial peptides"
```

**Mechanism:** Antimicrobial peptides (cathelicidin LL-37, defensins) in urinary tract innate immunity. Peptide-based diagnostics for UTI. Involves bacterial virulence peptide factors and host defense peptides.

**Symptoms:**
- Dysuria
- Frequency
- Urgency
- Suprapubic pain
- Hematuria
- Flank pain (pyelonephritis)
- Fever

**Diagnosis:**
- Urinalysis
- Urine culture
- Susceptibility testing
- Imaging (if recurrent)
- Procalcitonin (complicated UTI)
- Blood cultures (urosepsis)

**Treatment:**
- Antibiotics (nitrofurantoin, TMP-SMX, fluoroquinolones)
- Hydration
- Pain management
- Prophylaxis (recurrent UTI)
- Cranberry products
- Antibiotic stewardship

**Prognosis:** Excellent for uncomplicated UTI. Complicated UTI/pyelonephritis: higher morbidity. Recurrence common in women. Resistance increasing.

**Research Status:**
- Novel antimicrobial peptides
- Anti-adhesion strategies
- Vaccine development
- Biomarker-guided treatment
- Microbiome restoration
- Resistance prevention

---

### 50. Wound Infection

```yaml
id: INFECTIOUS-010
disease_name: "Wound Infection"
category: infectious
peptide_involvement: "Antimicrobial peptides"
```

**Mechanism:** Antimicrobial peptides (defensins, cathelicidins, dermcidin) in skin innate immunity. Peptide-based wound dressings and therapeutics. Involves peptide growth factors for wound healing.

**Symptoms:**
- Erythema
- Warmth
- Swelling
- Purulent drainage
- Pain
- Fever
- Delayed healing

**Diagnosis:**
- Clinical assessment
- Wound culture
- Tissue biopsy
- Imaging (deep infection)
- Inflammatory markers
- Probe-to-bone test (osteomyelitis)

**Treatment:**
- Wound debridement
- Antibiotics (culture-guided)
- Wound care/dressings
- Negative pressure wound therapy
- Antimicrobial peptide dressings
- Hyperbaric oxygen
- Surgical drainage

**Prognosis:** Good with appropriate treatment. Chronic wounds: prolonged healing. Biofilm-associated infections: challenging. Comorbidities (diabetes) worsen outcomes.

**Research Status:**
- Antimicrobial peptide therapeutics
- Biofilm-disrupting peptides
- Peptide growth factors
- Smart wound dressings
- Resistance prevention
- Personalized wound care

---

## Summary

### Disease Categories Overview

| Category | Disease Count | Key Peptide Types | Primary Applications |
|----------|---------------|-------------------|---------------------|
| Metabolic | 10 | Hormones, enzymes, amino acid derivatives | Replacement therapy, enzyme substitution |
| Neurological | 10 | Neuropeptides, amyloid peptides, prion proteins | Disease modification, symptomatic treatment |
| Cancer | 10 | Tumor markers, growth factors, receptors | Targeted therapy, immunotherapy, monitoring |
| Cardiovascular | 10 | Natriuretic peptides, troponins, coagulation factors | Diagnosis, risk stratification, treatment |
| Infectious | 10 | Antimicrobial peptides, viral peptides, diagnostics | Vaccines, therapeutics, diagnostics |

### Cross-Cutting Themes

**Diagnostic Biomarkers:** Nearly all diseases utilize peptide biomarkers for diagnosis, monitoring, and prognostication. Advances in high-sensitivity assays (troponin, procalcitonin) have transformed clinical practice.

**Therapeutic Peptides:** GLP-1 agonists represent the most successful peptide therapeutics across metabolic diseases. Cancer immunotherapy increasingly uses peptide-based approaches. Antimicrobial peptides address antibiotic resistance.

**Research Priorities:** Precision medicine, biomarker-guided treatment, novel delivery systems, and combination therapies are common themes. Gene therapy and RNA-based approaches offer potential cures for genetic conditions.

**Clinical Translation:** Peptide-based diagnostics are widely implemented. Therapeutic peptides face bioavailability and delivery challenges but are increasingly successful. Vaccines represent the most mature peptide-based preventive approach.
