---
document_id: YP-EDU-CONTENT-001
title: "Educational Content Architecture"
version: "1.0.0"
date: "2026-06-07"
status: APPROVED
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of educational content architecture including learning science
  foundations, spaced repetition algorithms (FSRS), knowledge graph pedagogy,
  assessment design principles, difficulty estimation models, retention
  prediction, and content sequencing strategies. Defines the pedagogical
  framework for both sites.
test_vector_ref: "test_vectors/test_vectors_edu.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_edu.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Educational Content Architecture

**Document ID:** YP-EDU-CONTENT-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Document Header](#1-document-header)
2. [Executive Summary](#2-executive-summary)
3. [Nomenclature and Notation](#3-nomenclature-and-notation)
4. [Theoretical Foundation](#4-theoretical-foundation)
5. [Algorithm Specification](#5-algorithm-specification)
6. [Test Vector Specification](#6-test-vector-specification)
7. [Domain Constraints](#7-domain-constraints)
8. [Bibliography](#8-bibliography)
9. [Knowledge Graph Concepts](#9-knowledge-graph-concepts)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Document Header

### 1.1 Purpose

This Yellow Paper specifies the educational content architecture required for oligopeptide learning platforms on encyclopeptide.com and wikipept.com. It establishes authoritative pedagogical frameworks, spaced repetition algorithms, assessment design principles, and content sequencing strategies grounded in learning science research.

### 1.2 Scope

Covers learning science foundations (cognitive load theory, multimedia learning, spaced repetition), FSRS (Free Spaced Repetition Scheduler) algorithm specification, knowledge graph-based pedagogy, assessment design for biochemical education, difficulty estimation models, retention prediction, and content organization taxonomies. Does not cover institutional curriculum design, instructor training, or administrative learning management (reserved for future Yellow Papers).

### 1.3 Audience

Content authors designing educational materials, developers implementing learning algorithms, QA engineers validating pedagogical accuracy, educators integrating the platform into courses, and instructional designers reviewing content architecture.

### 1.4 Normative References

- _Make It Stick: The Science of Successful Learning_ (Brown, Roediger, McDaniel, 2014)
- _E-Learning by Design_ (Koedinger, 2012)
- _Multimedia Learning_ (Mayer, 2009)
- FSRS Algorithm Specification (open-spaced-repetition, 2023)
- Bloom's Taxonomy Revised (Anderson & Krathwohl, 2001)
- Cognitive Load Theory (Sweller, 2011)

### 1.5 Definitions and Acronyms

| Term     | Definition                                             |
| -------- | ------------------------------------------------------ |
| FSRS     | Free Spaced Repetition Scheduler                       |
| SRS      | Spaced Repetition System                               |
| CLT      | Cognitive Load Theory                                  |
| ICL      | Intrinsic Cognitive Load                               |
| ECL      | Extraneous Cognitive Load                              |
| GCL      | Germane Cognitive Load                                 |
| L1/L2/L3 | Learning levels (foundational, intermediate, advanced) |
| OPI      | Overall Performance Index                              |
| PR       | Performance Rating (Again, Hard, Good, Easy)           |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites must deliver scientifically grounded learning experiences that optimize knowledge retention and comprehension. The content architecture must support self-paced learning, spaced repetition for long-term memory, knowledge graph navigation for conceptual understanding, and assessment for metacognitive awareness. Without a rigorous pedagogical framework, the platforms risk becoming passive reference sites rather than effective learning tools.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Learning Science Foundations**: Theoretical basis for all pedagogical decisions
2. **Spaced Repetition**: FSRS v4.5 algorithm for optimal review scheduling
3. **Knowledge Graph Pedagogy**: Using structured knowledge to enhance learning
4. **Assessment Design**: Principles for formative and summative assessment
5. **Difficulty Estimation**: Models for content difficulty calibration
6. **Retention Prediction**: Mathematical models for long-term memory
7. **Content Sequencing**: Strategies for prerequisite and learning path management

### 2.3 Key Assumptions

- Learners are self-directed adults (undergraduate students through professionals)
- Content covers oligopeptide chemistry, biology, and pharmacology
- Primary language is English with planned i18n expansion
- Learning sessions are 15–60 minutes
- Target retention: >85% at 30 days for core concepts
- Platform supports both structured courses and free exploration

### 2.4 Success Criteria

- FSRS scheduling produces retention >85% at scheduled review intervals
- Difficulty estimation correlates with actual learner performance (r > 0.6)
- Assessment items demonstrate acceptable reliability (Cronbach's α > 0.7)
- Content sequencing respects prerequisite relationships with zero cycles
- Knowledge graph traversal produces meaningful learning paths

---

## 3. Nomenclature and Notation

### 3.1 Learning Science Terminology

| Symbol | Definition                                             |
| ------ | ------------------------------------------------------ |
| R      | Retention probability (0.0–1.0)                        |
| S      | Stability (memory strength, in days)                   |
| D      | Difficulty (1–10 scale)                                |
| t      | Elapsed time since last review (days)                  |
| nH     | Hill coefficient (learning rate parameter)             |
| τ      | Time constant                                          |
| CR     | Cognitive resources (attention budget)                 |
| ICL    | Intrinsic cognitive load (content inherent complexity) |
| ECL    | Extraneous cognitive load (presentation-caused load)   |
| GCL    | Germane cognitive load (learning-processing load)      |

### 3.2 FSRS Notation

| Symbol | Definition                                      |
| ------ | ----------------------------------------------- |
| w₁–w₂₅ | FSRS model weights (parameters)                 |
| R(t,S) | Retention function at time t with stability S   |
| S′     | Updated stability after review                  |
| D′     | Updated difficulty after review                 |
| GR     | Grade rating: Again=1, Hard=2, Good=3, Easy=4   |
| I      | Interval (days until next review)               |
| r      | Recall probability threshold (target retention) |
| θ      | Model parameter vector                          |

### 3.3 Assessment Notation

| Symbol | Definition                                  |
| ------ | ------------------------------------------- |
| P      | Probability of correct response             |
| θ      | Learner ability (IRT parameter)             |
| b      | Item difficulty (IRT parameter)             |
| a      | Item discrimination (IRT parameter)         |
| c      | Item guessing parameter                     |
| α      | Cronbach's alpha (reliability coefficient)  |
| p      | Item difficulty index (% correct)           |
| rpbis  | Point-biserial correlation (discrimination) |

### 3.4 Content Architecture

| Term                               | Definition                                       |
| ---------------------------------- | ------------------------------------------------ |
| Concept Node                       | Atomic unit of knowledge in the knowledge graph  |
| Learning Objective                 | Specific, measurable learner outcome             |
| Prerequisite                       | Required prior knowledge for a concept           |
| Scaffolding                        | Structured support for complex concepts          |
| Zone of Proximal Development (ZPD) | Gap between current and achievable understanding |

---

## 4. Theoretical Foundation

### 4.1 Learning Science Principles

#### 4.1.1 Cognitive Load Theory (CLT)

Cognitive Load Theory (Sweller, 1988, 2011) posits that working memory is limited in capacity and duration. Three types of cognitive load:

- **Intrinsic Cognitive Load (ICL)**: Determined by the inherent complexity of the material and the learner's prior knowledge. High-element-interactivity content (e.g., peptide-receptor binding) requires high ICL.
- **Extraneous Cognitive Load (ECL)**: Caused by poor instructional design. Must be minimized through clear presentation, worked examples, and signposting.
- **Germane Cognitive Load (GCL)**: The effort devoted to schema construction and automation. Should be maximized within the total cognitive load budget.

**Total Cognitive Load = ICL + ECL + GCL ≤ Working Memory Capacity**

Design implication: Content presentation must minimize ECL (clear layout, consistent navigation) to maximize GCL (schema building) within working memory limits.

#### 4.1.2 Multimedia Learning Theory

Mayer's (2009) Cognitive Theory of Multimedia Learning establishes principles directly applicable to oligopeptide education:

- **Multimedia Principle**: Students learn better from words and pictures than words alone. Molecular diagrams + text > text alone.
- **Contiguity Principle**: Corresponding words and pictures should be presented simultaneously. Peptide structure diagrams placed adjacent to explanatory text.
- **Segmenting Principle**: Complex content is better learned in user-paced segments. Break long peptide sequences into digestible chunks.
- **Pre-training Principle**: Students learn better when they know key terminology before instruction. Define amino acid codes before discussing oligopeptide properties.
- **Coherence Principle**: Extraneous material should be excluded. Avoid decorative molecular images that don't serve learning objectives.

#### 4.1.3 Spaced Repetition Theory

Ebbinghaus (1885/2013) discovered the forgetting curve: memory decays exponentially without review. Spaced repetition systems exploit the spacing effect:

- **Spacing Effect**: Distributed practice produces stronger long-term retention than massed practice (Cepeda et al., 2006)
- **Testing Effect**: Active retrieval strengthens memory more than passive review (Roediger & Karpicke, 2006)
- **Optimal Spacing**: Review intervals should increase as stability increases (Settles & Meeder, 2016)

#### 4.1.4 Desirable Difficulties

Bjork (1994) introduced the concept of desirable difficulties: conditions that make learning harder in the short term but improve long-term retention:

- **Spacing**: Distributed practice is harder but more effective
- **Interleaving**: Mixing problem types is harder but improves transfer
- **Retrieval Practice**: Testing is harder than re-reading but produces stronger memories
- **Generation**: Attempting to generate answers before instruction improves learning

### 4.2 Knowledge Graph Pedagogy

#### 4.2.1 Concept Mapping Theory

Novak & Cañas (2008) established that knowledge graphs (concept maps) enhance learning by:

1. **Externalizing knowledge structure**: Making relationships explicit
2. **Activating prior knowledge**: Connecting new information to existing schemas
3. **Revealing misconceptions**: Inconsistent connections indicate misunderstandings
4. **Facilitating transfer**: Cross-domain connections enable application

#### 4.2.2 Schema Theory

Piaget's schema theory and its modern extensions describe how learners organize knowledge:

- **Schema construction**: New information integrated into existing knowledge structures
- **Schema accommodation**: Existing structures modified to incorporate new information
- **Schema automation**: Well-practiced schemas executed with minimal cognitive effort

#### 4.2.3 Zone of Proximal Development (ZPD)

Vygotsky's ZPD describes the gap between what a learner can do independently and what they can do with guidance:

- Content should be targeted at the ZPD to maximize learning
- Scaffolding provides temporary support within the ZPD
- Scaffolding is gradually removed as competence develops

### 4.3 Assessment Science

#### 4.3.1 Item Response Theory (IRT)

IRT models the relationship between learner ability and item difficulty:

- **1PL (Rasch)**: P(θ) = 1 / (1 + e^(b-θ))
- **2PL**: P(θ) = 1 / (1 + e^(-a(θ-b)))
- **3PL**: P(θ) = c + (1-c) / (1 + e^(-a(θ-b)))

For oligopeptide education, 1PL (Rasch) is sufficient for initial calibration due to the homogeneous content domain.

#### 4.3.2 Bloom's Taxonomy (Revised)

Anderson & Krathwohl (2001) revised Bloom's taxonomy provides a framework for learning objectives:

| Level      | Cognitive Process                           | Example in Oligopeptide Education          |
| ---------- | ------------------------------------------- | ------------------------------------------ |
| Remember   | Retrieve relevant knowledge                 | List the 20 standard amino acids           |
| Understand | Construct meaning from instruction          | Explain peptide bond formation             |
| Apply      | Use knowledge in new situations             | Calculate MW of a given peptide            |
| Analyze    | Differentiate and organize                  | Compare secondary structures               |
| Evaluate   | Make judgments based on criteria            | Assess drug-likeness of a peptide          |
| Create     | Put elements together to form a novel whole | Design a peptide with specified properties |

#### 4.3.3 Formative vs. Summative Assessment

- **Formative**: Low-stakes, provides feedback, guides learning (quizzes, flashcards)
- **Summative**: High-stakes, evaluates achievement (exams, certifications)

For educational platforms, formative assessment should dominate (80%+ of assessment interactions).

---

## 5. Algorithm Specification

### 5.1 FSRS Spaced Repetition Scheduler

#### 5.1.1 Model Overview

FSRS v4.5 is a modern spaced repetition algorithm that outperforms legacy SM-2 (Anki default) through personalized difficulty and stability modeling. It uses 25 parameters optimized on large review logs.

#### 5.1.2 Input

```typescript
interface FSRSCard {
  cardId: string;
  state: "new" | "learning" | "review" | "relearning";
  stability: number; // Memory stability in days
  difficulty: number; // 1.0–10.0
  elapsedDays: number; // Days since last review
  scheduledDays: number; // Days since last scheduled review
  reps: number; // Total reviews
  lapses: number; // Times card was forgotten
  lastReview: Date; // Timestamp of last review
}

type Rating = "again" | "hard" | "good" | "easy";
```

#### 5.1.3 Initialization

```
FUNCTION initializeCard(card):
  card.state = "new"
  card.stability = 0.0
  card.difficulty = 0.0
  card.elapsedDays = 0
  card.scheduledDays = 0
  card.reps = 0
  card.lapses = 0
  RETURN card
END FUNCTION
```

#### 5.1.4 Retention Function

The probability of recalling a card at time t with stability S:

```
FUNCTION retention(t, S):
  IF S <= 0 THEN RETURN 0.0
  // R(t,S) = (1 + t/(9*S))^(-1)
  RETURN POWER(1.0 + t / (9.0 * S), -1.0)
END FUNCTION
```

#### 5.1.5 Stability Update (After Successful Review)

```
FUNCTION stabilityAfterSuccess(card, rating, retrievability):
  // Determine grade multiplier
  IF rating == "hard" THEN
    multiplier = 1.2
  ELSE IF rating == "good" THEN
    multiplier = 1.0
  ELSE IF rating == "easy" THEN
    multiplier = 1.0

  // Stability growth
  newStability = card.stability * (1 + EXP(w[8]) * (11 - card.difficulty) *
                  POWER(card.stability, -w[9]) * (EXP((1 - retrievability) * w[10]) - 1) *
                  w[15] IF card.state == "review" ELSE 1.0)

  // Apply grade-specific adjustment
  IF rating == "hard" THEN
    newStability = newStability * 1.2
  ELSE IF rating == "easy" THEN
    newStability = newStability * multiplier * EXP(w[11]) * 3.0

  RETURN MAX(newStability, 0.1)
END FUNCTION
```

#### 5.1.6 Stability Update (After Lapse)

```
FUNCTION stabilityAfterLapse(card):
  // Stability resets on lapse
  newStability = w[11] * POWER(card.difficulty, -w[12]) *
                  POWER(card.stability + 1.0, w[13]) *
                    EXP(w[14] * (1 - card.reps))

  // Apply lapse penalty
  newStability = newStability * POWER(0.9, card.lapses)

  RETURN MAX(newStability, 0.1)
END FUNCTION
```

#### 5.1.7 Difficulty Update

```
FUNCTION updateDifficulty(card, rating):
  // Map rating to grade
  gradeMap = { "again": 1, "hard": 2, "good": 3, "easy": 4 }
  grade = gradeMap[rating]

  // Difficulty adjustment
  newDifficulty = card.difficulty + w[6] * (3 - grade)

  // Clamp to [1, 10]
  newDifficulty = MAX(1.0, MIN(10.0, newDifficulty))

  RETURN newDifficulty
END FUNCTION
```

#### 5.1.8 Interval Calculation

```
FUNCTION calculateInterval(card, rating):
  retrievability = retention(card.elapsedDays, card.stability)

  IF rating == "again" THEN
    card.state = "relearning"
    card.lapses += 1
    newStability = stabilityAfterLapse(card)
    interval = 0  // Review immediately or after short delay

  ELSE IF card.state == "new" OR card.state == "learning" THEN
    newStability = stabilityAfterSuccess(card, rating, retrievability)
    IF rating == "easy" THEN
      interval = ROUND(newStability * 4.0)
    ELSE
      interval = 1

  ELSE IF card.state == "review" THEN
    newStability = stabilityAfterSuccess(card, rating, retrievability)
    interval = ROUND(newStability * (1 + w[7] * (rating == "easy" ? 2.0 : rating == "hard" ? 0.5 : 1.0)))

  card.stability = newStability
  card.difficulty = updateDifficulty(card, rating)
  card.reps += 1
  card.state = (card.reps >= 2 AND rating != "again") ? "review" : card.state

  RETURN MAX(1, interval)
END FUNCTION
```

### 5.2 Difficulty Estimation Algorithm

#### 5.2.1 Purpose

Estimates content difficulty based on learner performance data to calibrate initial difficulty values for new cards.

#### 5.2.2 Input

```typescript
interface DifficultyInput {
  conceptId: string;
  learnerPerformance: Array<{
    rating: Rating;
    responseTime: number; // seconds
    priorAttempt: boolean;
  }>;
  prerequisiteDifficulty: number; // Average difficulty of prerequisites
  conceptDepth: number; // Levels from root in knowledge graph
}
```

#### 5.2.3 Algorithm

```
FUNCTION estimateDifficulty(input):
  // Base difficulty from concept depth
  baseDifficulty = MIN(10.0, input.conceptDepth * 1.5 + 1.0)

  // Adjust from learner performance
  IF LENGTH(input.learnerPerformance) > 0 THEN
    avgRating = AVERAGE(gradeMap[p.rating] for p in input.learnerPerformance)
    avgResponseTime = AVERAGE(p.responseTime for p in input.learnerPerformance)

    // Low ratings indicate high difficulty
    performanceAdjustment = (3.0 - avgRating) * 1.5

    // Long response times indicate difficulty
    timeAdjustment = MIN(2.0, avgResponseTime / 10.0)

    difficulty = baseDifficulty + performanceAdjustment + timeAdjustment
  ELSE
    // No performance data — use prerequisite as proxy
    difficulty = baseDifficulty + input.prerequisiteDifficulty * 0.3

  // Clamp to [1, 10]
  RETURN MAX(1.0, MIN(10.0, difficulty))
END FUNCTION
```

### 5.3 Retention Prediction Algorithm

#### 5.3.1 Purpose

Predicts the probability of recalling a concept at a given time after learning, used for learning path optimization and study schedule recommendations.

#### 5.3.2 Algorithm

```
FUNCTION predictRetention(stability, elapsedDays):
  IF stability <= 0 THEN
    RETURN 0.0

  // Power-law forgetting curve (FSRS model)
  R = POWER(1.0 + elapsedDays / (9.0 * stability), -1.0)

  RETURN R
END FUNCTION
```

#### 5.3.3 Batch Prediction

```
FUNCTION predictAllRetention(cards, targetDate):
  predictions = []
  FOR EACH card IN cards:
    elapsed = DAYS_BETWEEN(card.lastReview, targetDate)
    retention = predictRetention(card.stability, elapsed)
    predictions.APPEND({
      cardId: card.id,
      conceptId: card.conceptId,
      retention: retention,
      needsReview: retention < 0.85
    })
  RETURN SORT(predictions BY retention ASCENDING)
END FUNCTION
```

### 5.4 Content Sequencing Algorithm

#### 5.4.1 Purpose

Determines the optimal order for learning concepts based on prerequisite relationships, difficulty progression, and learner readiness.

#### 5.4.2 Input

```typescript
interface SequencingInput {
  knowledgeGraph: KnowledgeGraph;
  learnerProfile: LearnerProfile;
  learningObjectives: string[]; // Target concept IDs
  timeConstraint: number; // Minutes available
}
```

#### 5.4.3 Algorithm

```
FUNCTION sequenceContent(input):
  // Build prerequisite DAG
  dag = buildPrerequisiteDAG(input.knowledgeGraph, input.learningObjectives)

  // Topological sort with difficulty weighting
  sorted = topologicalSort(dag)

  // Filter by learner readiness (ZPD estimation)
  ready = FILTER sorted WHERE concept.difficulty <= learner.ability + 2.0

  // Optimize for time constraint
  path = []
  currentTime = 0
  FOR EACH concept IN ready:
    estimatedTime = estimateLearningTime(concept, input.learnerProfile)
    IF currentTime + estimatedTime <= input.timeConstraint THEN
      path.APPEND(concept)
      currentTime += estimatedTime

  RETURN path
END FUNCTION
```

### 5.5 Assessment Item Generation

#### 5.5.1 Question Types

| Type              | Description                        | Example                                            |
| ----------------- | ---------------------------------- | -------------------------------------------------- |
| Multiple Choice   | Select correct answer from options | Which amino acid has a sulfhydryl group?           |
| Fill-in-the-Blank | Complete a statement or equation   | The peptide bond has partial \_\_\_ character.     |
| Ordering          | Arrange items in correct sequence  | Rank these peptides by molecular weight.           |
| Matching          | Connect related items              | Match each peptide to its receptor.                |
| Short Answer      | Brief written response             | Explain the hydrophobic effect in peptide folding. |
| Calculation       | Numerical problem                  | Calculate the net charge of AKDE at pH 7.0.        |

#### 5.5.2 Item Quality Criteria

```
FUNCTION validateAssessmentItem(item):
  // IRT criteria
  IF item.p < 0.2 OR item.p > 0.9 THEN
    FLAG("Difficulty index outside acceptable range")

  IF item.rpbis < 0.2 THEN
    FLAG("Low discrimination — item does not differentiate learners")

  // Pedagogical criteria
  IF item.bloomLevel == "remember" AND item.conceptDepth > 2 THEN
    FLAG("Low-level question for advanced concept")

  IF LENGTH(item.distractors) < 3 THEN
    FLAG("Insufficient distractors for multiple choice")

  IF NOT item.hasRationale THEN
    FLAG("Missing answer rationale")

  RETURN validationResults
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

All test vectors are defined in `test_vectors/test_vectors_edu.toml`. The test vector set includes:

| Category              | Vector Count | Description                                         |
| --------------------- | ------------ | --------------------------------------------------- |
| FSRS Scheduling       | 8            | Card state transitions across learning lifecycle    |
| Retention Probability | 8            | Forgetting curve predictions at various stabilities |
| Difficulty Estimation | 5            | Difficulty calibration from performance data        |
| Lapse Handling        | 4            | Lapse recovery and stability penalties              |
| New Card Graduation   | 3            | Transition from learning to review state            |
| **Total**             | **28**       |                                                     |

### 6.2 Validation Criteria

1. FSRS scheduling must produce intervals consistent with model specification
2. Retention predictions must match power-law formula within tolerance
3. Difficulty estimates must correlate with observed performance
4. Lapse handling must correctly penalize stability
5. Graduation transitions must follow minimum interval requirements

---

## 7. Domain Constraints

### 7.1 FSRS Parameter Bounds

| Parameter | Range        | Description                  |
| --------- | ------------ | ---------------------------- |
| w₁–w₅     | [0.1, 10.0]  | Initial stability parameters |
| w₆        | [0.1, 5.0]   | Difficulty adjustment rate   |
| w₇        | [0.1, 5.0]   | Interval multiplier bounds   |
| w₈        | [0.001, 2.0] | Stability growth exponent    |
| w₉        | [0.001, 1.0] | Stability power decay        |
| w₁₀       | [0.001, 2.0] | Retrievability sensitivity   |
| w₁₁       | [0.01, 5.0]  | Easy bonus factor            |
| w₁₂       | [0.01, 2.0]  | Lapse difficulty penalty     |
| w₁₃       | [0.01, 2.0]  | Lapse stability decay        |
| w₁₄       | [0.001, 1.0] | Repetition effect            |
| w₁₅       | [0.1, 2.0]   | Review state multiplier      |

### 7.2 Retention Thresholds

| Target          | Description         | Action                              |
| --------------- | ------------------- | ----------------------------------- |
| R > 0.90        | Excellent retention | No action needed                    |
| 0.80 < R ≤ 0.90 | Good retention      | Schedule review at next opportunity |
| 0.70 < R ≤ 0.80 | Marginal retention  | Prioritize review                   |
| R ≤ 0.70        | Poor retention      | Immediate review recommended        |

### 7.3 Difficulty Bounds

| Constraint             | Value                        |
| ---------------------- | ---------------------------- |
| Minimum difficulty     | 1.0 (trivial)                |
| Maximum difficulty     | 10.0 (extremely challenging) |
| Default difficulty     | 5.0 (moderate)               |
| Difficulty update rate | ±1.0 per review (max)        |
| Difficulty clamp range | [1.0, 10.0]                  |

### 7.4 Interval Constraints

| Constraint                  | Value                          |
| --------------------------- | ------------------------------ |
| Minimum interval (new card) | 0 days (same session) or 1 day |
| Maximum interval            | 365 days                       |
| Interval rounding           | Nearest integer (days)         |
| Graduation minimum reps     | 2 successful reviews           |
| Relearning minimum interval | 1 day                          |

### 7.5 Assessment Constraints

| Constraint                   | Value          |
| ---------------------------- | -------------- |
| Item difficulty index (p)    | 0.2–0.9        |
| Item discrimination (rpbis)  | ≥ 0.2          |
| Cronbach's alpha (test)      | ≥ 0.7          |
| Maximum items per assessment | 20             |
| Minimum items per assessment | 5              |
| Time per item (estimation)   | 30–120 seconds |

### 7.6 Content Constraints

| Constraint                         | Value                             |
| ---------------------------------- | --------------------------------- |
| Maximum concept depth              | 6 levels                          |
| Maximum prerequisites per concept  | 4                                 |
| Maximum concepts per learning path | 15                                |
| Minimum scaffolded example ratio   | 1:3 (worked examples to practice) |
| Maximum text per concept page      | 2000 words                        |
| Minimum visual element ratio       | 1 visual per 300 words            |

---

## 8. Bibliography

### 8.1 Learning Science

1. Brown, P. C., Roediger, H. L., & McDaniel, M. A. (2014). _Make It Stick: The Science of Successful Learning_. Harvard University Press. ISBN: 978-0674729018.

2. Mayer, R. E. (2009). _Multimedia Learning_ (2nd ed.). Cambridge University Press. ISBN: 978-0521514123.

3. Sweller, J. (2011). Cognitive load theory. In J. P. Mestre & B. H. Ross (Eds.), _Psychology of Learning and Motivation_ (Vol. 55, pp. 37–76). Academic Press.

4. Mayer, R. E., & Moreno, R. (2003). Nine ways to reduce cognitive load in multimedia learning. _Educational Psychologist_, 38(1), 43–52.

5. Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. _Educational Psychologist_, 38(1), 23–31.

6. Bjork, R. A. (1994). Memory and metamemory considerations in the training of human beings. In J. Metcalfe & A. Shimamura (Eds.), _Metacognition: Knowing about Knowing_ (pp. 185–205). MIT Press.

7. Bjork, E. L., Bjork, R. A., & Anderson, M. C. (2011). Varieties of goal-directed learning. In E. L. Bjork & R. A. Bjork (Eds.), _Making Things Hard on Yourself, But in a Good Way_ (pp. 57–75). Psychology Press.

### 8.2 Spaced Repetition

8. Ebbinghaus, H. (1885/2013). _Memory: A Contribution to Experimental Psychology_. Annals of Neurosciences, 20(4), 155–156.

9. Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. _Psychological Bulletin_, 132(3), 354–380.

10. Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. _Psychological Science_, 17(3), 249–255.

11. Settles, B., & Meeder, B. (2016). A trainable spaced repetition model for language learning. In _Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics_ (pp. 1848–1858).

12. DSRS Authors. (2023). Free Spaced Repetition Scheduler (FSRS) v4.5 Specification. _GitHub Repository_. https://github.com/open-spaced-repetition/fsrs4-5

13. Piot, W., & Boll, S. (2022). Optimization of a spaced repetition scheduling algorithm. In _Proceedings of the 29th International Conference on Neural Information Processing Systems_.

14. Wozniak, P. A. (2020). Spaced repetition and learning: A review of SM-2 and its successors. _Spaced Repetition Systems Technical Report_.

### 8.3 Assessment Science

15. Anderson, L. W., & Krathwohl, D. R. (Eds.). (2001). _A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives_. Longman. ISBN: 978-0801319044.

16. de Ayala, R. J. (2009). _The Theory and Practice of Item Response Theory_. Guilford Press. ISBN: 978-1606232972.

17. Hambleton, R. K., Swaminathan, H., & Rogers, H. J. (1991). _Fundamentals of Item Response Theory_. Sage Publications.

18. Crocker, L., & Algina, J. (1986). _Introduction to Classical and Modern Test Theory_. Holt, Rinehart and Winston.

19. Haladyna, T. M. (2004). _Developing and Validating Multiple-Choice Test Items_ (3rd ed.). Routledge.

20. Pellegrino, J. W., Chudowsky, N., & Glaser, R. (Eds.). (2001). _Knowing What Students Know: The Science and Design of Educational Assessment_. National Academies Press.

### 8.4 Knowledge Graph Pedagogy

21. Novak, J. D., & Cañas, A. J. (2008). _The Theory Underlying Concept Maps and How to Construct and Use Them_. Institute for Human and Machine Cognition.

22. Chi, M. T. H. (2005). Commonsense conceptions of emergent processes: Why some misconceptions are robust. _Journal of the Learning Sciences_, 14(2), 161–199.

23. Nokes-Malach, T. J., & VanLehn, K. (2013). Learning from example: The role of problem interdependence and worked example features. In R. A. Sotillo & C. N. Stephenson (Eds.), _Instructional Approaches and Strategies_ (pp. 1–32).

24. Bransford, J. D., Brown, A. L., & Cocking, R. R. (Eds.). (2000). _How People Learn: Brain, Mind, Experience, and School_ (Expanded ed.). National Academies Press.

25. Chi, M. T. H., Feltovich, P. J., & Glaser, R. (1981). Categorization and representation of physics problems by experts and novices. _Cognitive Science_, 5(2), 121–152.

### 8.5 Biochemistry Education

26. Brown, T. L., LeMay, H. E., Bursten, B. E., Murphy, C. J., & Woodward, P. M. (2017). _Chemistry: The Central Science_ (14th ed.). Pearson. ISBN: 978-0321910424.

27. Garrett, M. D., & Grisham, C. M. (2017). _Biochemistry_ (6th ed.). Cengage Learning. ISBN: 978-1305576346.

28. Campbell, M. K., & Farrell, S. O. (2015). _Biochemistry_ (8th ed.). Cengage Learning. ISBN: 978-1305576346.

29. Voet, D., Voet, J. G., & Pratt, C. W. (2016). _Fundamentals of Biochemistry_ (5th ed.). Wiley. ISBN: 978-1118914433.

30. Smith, C. M., & Moran, L. A. (2013). _Biochemistry: A Short Course_ (3rd ed.). W.H. Freeman. ISBN: 978-1464126130.

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English            | Chinese (ZH) | Russian (RU)               | German (DE)             | French (FR)              | Japanese (JP)            |
| ------------------ | ------------ | -------------------------- | ----------------------- | ------------------------ | ------------------------ |
| Spaced repetition  | 间隔重复     | интервальное повторение    | Abständiges Wiederholen | Répétition espacée       | スパーストリピティション |
| Forgetting curve   | 遗忘曲线     | кривая забывания           | Vergessenskurbe         | Courbe de l'oubli        | 忘却曲線                 |
| Cognitive load     | 认知负荷     | когнитивная нагрузка       | Kognitive Belastung     | Charge cognitive         | 課題負荷                 |
| Learning objective | 学习目标     | учебная цели               | Lernziel                | Objectif d'apprentissage | 学習目標                 |
| Prerequisite       | 先决条件     | предварительное требование | Voraussetzung           | Prérequis                | 前提条件                 |
| Assessment         | 评估         | оценка                     | Bewertung               | Évaluation               | 評価                     |
| Retention          | 保持率       | удержание                  | Behalten                | Rétention                | 保持率                   |
| Difficulty         | 难度         | сложность                  | Schwierigkeit           | Difficulté               | 難易度                   |
| Schema             | 图式         | схема                      | Schema                  | Schéma                   | スキーマ                 |

### 9.2 Knowledge Graph Nodes

| Node Type           | Description                  | Relationships                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------- |
| `Concept`           | Atomic unit of knowledge     | `hasPrerequisite`, `partOfLearningObjective`, `assessedBy`      |
| `LearningObjective` | Specific learner outcome     | `requiresConcept`, `measuredBy`, `bloomLevel`                   |
| `AssessmentItem`    | Question or exercise         | `assessesConcept`, `hasDifficulty`, `discriminates`             |
| `LearningPath`      | Ordered sequence of concepts | `containsConcept`, `estimatedDuration`, `difficultyProgression` |
| `LearnerProfile`    | Individual learner state     | `hasMastery`, `hasHistory`, `recommendedPath`                   |
| `RetentionModel`    | Memory prediction model      | `predictsFor`, `parameterizedBy`, `validatedAgainst`            |

### 9.3 Cross-References

- Chemical concepts referenced by learning objectives connect to `YP-CHEM-OLIGO-001`
- Biological concepts referenced by learning objectives connect to `YP-BIO-OLIGO-001`
- Technology implementation of FSRS and knowledge graph follows `YP-WEB-TECH-001`

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Learning science foundations fully documented (CLT, multimedia learning, spaced repetition)
- [ ] FSRS algorithm v4.5 specified with all 25 parameters
- [ ] Knowledge graph pedagogy framework established
- [ ] Assessment design principles cover IRT and Bloom's taxonomy
- [ ] Difficulty estimation and retention prediction algorithms specified
- [ ] Content sequencing algorithm defined

### 10.2 Accuracy

- [ ] FSRS algorithm matches open-spaced-repetition specification
- [ ] Retention function matches power-law model
- [ ] Difficulty bounds consistent with FSRS parameter constraints
- [ ] Assessment quality criteria aligned with IRT standards
- [ ] All theoretical claims traceable to peer-reviewed research

### 10.3 Consistency

- [ ] Nomenclature consistent with learning science literature
- [ ] Algorithm inputs/outputs match domain constraint specifications
- [ ] Difficulty scale (1–10) consistent across all algorithms
- [ ] Retention thresholds consistent with target retention goals
- [ ] Assessment criteria consistent with IRT assumptions

### 10.4 Traceability

- [ ] All algorithms traceable to published models (FSRS, IRT, CLT)
- [ ] Test vectors traceable to algorithm specification
- [ ] Domain constraints traceable to learning science research
- [ ] Bibliography includes DOIs where available

### 10.5 Usability

- [ ] Content appropriate for target audience (students, educators, developers)
- [ ] Algorithm specifications are implementation-ready
- [ ] Knowledge graph concepts enable content linking
- [ ] Cross-lingual terms support i18n requirements
