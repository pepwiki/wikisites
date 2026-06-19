---
document_id: YP-EDITOR-VERSION-HISTORY-001
title: "Version History for Educational Platforms"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of version history including diff algorithms (Myers, patience, LCS),
  visual diff rendering (side-by-side, inline), storage strategies (git-backed, D1
  snapshots), branch/merge patterns, and attribution tracking. Defines the content
  versioning framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Version History for Educational Platforms

**Document ID:** YP-EDITOR-VERSION-HISTORY-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

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

This Yellow Paper specifies the version history system for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for content versioning, including diff algorithms, visual diff rendering, storage strategies, branch/merge patterns, and attribution tracking.

### 1.2 Scope

Covers diff algorithms (Myers, patience, LCS), visual diff rendering (side-by-side, inline, unified), storage strategies (git-backed via Forgejo, D1 snapshots), branch/merge patterns (content workflows), and attribution tracking (who changed what, when). Does not cover MDX editor implementation (reserved for YP-EDITOR-MDX-001), plugin-based version features (reserved for YP-EXT-PLUGIN-API-001), or settings versioning (reserved for YP-EXT-SETTINGS-001).

### 1.3 Audience

Frontend developers implementing version history UI, backend engineers configuring storage, and content managers reviewing version workflows.

### 1.4 Normative References

- Myers Diff Algorithm (https://www.cs.unp.edu/CS456/lectures/myers.pdf)
- patience diff (https://blog.brachiosoft.com/en/posts/diff/)
- Git Documentation (https://git-scm.com/docs)
- Cloudflare D1 Documentation (https://developers.cloudflare.com/d1/)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| Diff | Difference between two text versions               |
| LCS  | Longest Common Subsequence                         |
| Hunk | Contiguous block of changes                        |
| Patch| Set of changes applied to a document               |
| Snapshot | Point-in-time copy of document state          |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a version history system that tracks all content changes, provides meaningful visual diffs, supports collaborative editing workflows, and maintains complete attribution history. The system must handle scientific content where precision matters and provide clear before/after comparisons.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Diff Algorithms**: Myers, patience, and LCS comparison
2. **Visual Diff Rendering**: Side-by-side and inline views
3. **Storage Strategies**: Git-backed and D1 snapshot approaches
4. **Branch/Merge Patterns**: Content workflow management
5. **Attribution Tracking**: Author and change metadata

### 2.3 Key Assumptions

- Content authored in MDX format
- Forgejo repository for git-backed versioning
- D1 database available for metadata storage
- R2 available for large diff storage
- Existing content collections in Astro

### 2.4 Success Criteria

- Diff computation < 500ms for documents up to 100KB
- Visual diff renders in < 1s
- Complete version history preserved
- Attribution tracked for every change
- Support for comparing any two versions

---

## 3. Nomenclature and Notation

### 3.1 Versioning Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Version            | Immutable snapshot of document state                              |
| Diff               | Computed difference between two versions                          |
| Patch              | Set of changes to transform one version to another                |
| Hunk               | Contiguous block of additions/deletions                           |
| Line-level diff    | Diff computed at line granularity                                 |
| Word-level diff    | Diff computed at word granularity                                 |
| Character-level diff| Diff computed at character granularity                           |

### 3.2 Storage Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Git-backed         | Version history stored in git repository                          |
| D1 Snapshot        | Version stored as D1 row                                         |
| Immutable          | Once created, version cannot be modified                          |
| Delta              | Storage of only changes between versions                          |
| Full snapshot      | Complete copy of document at each version                         |

### 3.3 Workflow Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Branch             | Independent line of content development                           |
| Merge              | Combining changes from multiple branches                          |
| Draft              | Unpublished content version                                       |
| Published          | Live content version                                              |
| Review             | Content awaiting approval                                         |

---

## 4. Theoretical Foundation

### 4.1 Diff Algorithms

#### 4.1.1 Myers Diff Algorithm

The Myers algorithm finds the shortest edit script (SES) between two sequences in O(ND) time where N is the sum of lengths and D is the edit distance.

**Characteristics:**
- Time complexity: O(ND) average, O(N*M) worst case
- Space complexity: O(N + M)
- Produces minimal diff (fewest edits)
- Used by: git diff (default), GNU diff

**When to use:** Default algorithm, best for most content comparison scenarios.

#### 4.1.2 Patience Diff

Patience diff prioritizes matching of unique lines first, producing more readable diffs for code-like content.

**Characteristics:**
- Time complexity: O(N*M) worst case
- Space complexity: O(N + M)
- Produces more readable diffs for structured content
- Used by: Git (--patience flag), some IDEs

**When to use:** Best for MDX/Markdown where structural elements (headers, components) should align.

#### 4.1.3 LCS (Longest Common Subsequence)

Finds the longest subsequence common to both sequences, then derives the diff from the complement.

**Characteristics:**
- Time complexity: O(N*M)
- Space complexity: O(N*M)
- Produces diff with minimum number of changes
- Foundational algorithm for diff computation

**When to use:** When you need guaranteed minimum-change diff.

### 4.2 Visual Diff Rendering

#### 4.2.1 Side-by-Side View

```
┌──────────────────────┬──────────────────────┐
│   Original (v1)      │   Modified (v2)      │
├──────────────────────┼──────────────────────┤
│ # Oxytocin           │ # Oxytocin           │
│                      │                      │
│ Oxytocin is a        │ Oxytocin is a        │
│ peptide hormone.     │ peptide hormone and  │
│ -                    │ neuropeptide.        │
│                      │                      │
│ Sequence: CYIQNCPLG  │ Sequence: CYIQNCPLG  │
│ MW: 1007.44 Da       │ MW: 1007.44 Da       │
└──────────────────────┴──────────────────────┘
```

#### 4.2.2 Inline View

```
# Oxytocin

Oxytocin is a peptide hormone[ and neuropeptide.]{diff-add}

Sequence: CYIQNCPLG
MW: 1007.44 Da
```

#### 4.2.3 Unified View

```diff
 # Oxytocin
 
-Oxytocin is a peptide hormone.
+Oxytocin is a peptide hormone and neuropeptide.
 
 Sequence: CYIQNCPLG
 MW: 1007.44 Da
```

### 4.3 Storage Strategies

#### 4.3.1 Git-Backed Storage (Forgejo)

```
┌─────────────────────────────────────────────────┐
│           Git-Backed Versioning                 │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │  Editor      │────▶│  Cloudflare Worker  │   │
│  │  (Client)    │     │  (Git API)          │   │
│  └─────────────┘     └──────────┬──────────┘   │
│                                 │               │
│                                 ▼               │
│                    ┌─────────────────────┐      │
│                    │  Forgejo Repository  │      │
│                    │  (Git Storage)       │      │
│                    └─────────────────────┘      │
└─────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// Git-backed version storage
async function saveVersionGit(
  content: string,
  frontmatter: Record<string, unknown>,
  author: User,
  message: string,
  env: Env
): Promise<Version> {
  const filePath = `content/${frontmatter.slug}.mdx`;
  
  // Create commit via Forgejo API
  const response = await fetch(`${env.FORGEJO_URL}/api/v1/repos/${env.REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${env.FORGEJO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(serializeMDX(frontmatter, content)).toString('base64'),
      sha: await getFileSha(filePath, env), // For updates
      author: {
        name: author.name,
        email: author.email,
      },
    }),
  });
  
  const result = await response.json();
  
  return {
    id: result.commit.sha,
    filePath,
    version: result.commit.sha,
    author: author.id,
    message,
    createdAt: new Date(result.commit.author.date),
  };
}

// Get diff between versions
async function getVersionDiff(
  version1: string,
  version2: string,
  filePath: string,
  env: Env
): Promise<DiffResult> {
  // Get file contents at each version
  const content1 = await getFileAtVersion(filePath, version1, env);
  const content2 = await getFileAtVersion(filePath, version2, env);
  
  // Compute diff
  const diff = computeDiff(content1, content2, 'patience');
  
  return diff;
}
```

#### 4.3.2 D1 Snapshot Storage

```sql
CREATE TABLE content_versions (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  frontmatter_json TEXT NOT NULL,
  author_id TEXT NOT NULL,
  message TEXT,
  checksum TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX idx_versions_page ON content_versions(page_slug);
CREATE INDEX idx_versions_number ON content_versions(page_slug, version_number);
```

### 4.4 Branch/Merge Patterns

#### 4.4.1 Content Workflow

```
┌─────────────────────────────────────────────────┐
│           Content Workflow                       │
│                                                 │
│  ┌──────────┐     ┌──────────┐     ┌────────┐  │
│  │  Draft    │────▶│  Review  │────▶│Published│  │
│  │  (Branch) │     │  (PR)    │     │(Merge) │  │
│  └──────────┘     └──────────┘     └────────┘  │
│       │                │                │       │
│       │                ▼                │       │
│       │         ┌──────────┐           │       │
│       │         │  Changes │           │       │
│       │         │ Requested│           │       │
│       │         └──────────┘           │       │
│       │                │                │       │
│       ◀────────────────┘                │       │
│                                         │       │
│  ┌──────────┐                           │       │
│  │  Archive │◀──────────────────────────┘       │
│  │  (Tag)   │                                   │
│  └──────────┘                                   │
└─────────────────────────────────────────────────┘
```

### 4.5 Attribution Tracking

```typescript
interface AttributionEntry {
  versionId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  action: 'create' | 'update' | 'delete' | 'restore';
  message: string;
  timestamp: Date;
  diff: DiffSummary;
}

interface DiffSummary {
  linesAdded: number;
  linesRemoved: number;
  linesModified: number;
  sectionsChanged: string[];
}
```

---

## 5. Algorithm Specification

### 5.1 Myers Diff Algorithm

```
FUNCTION myersDiff(a, b):
  N = a.length
  M = b.length
  MAX = N + M
  
  // V array for DP
  V = array of size (2 * MAX + 1) initialized to 0
  V[1] = 0
  
  // Trace for path reconstruction
  trace = []
  
  FOR D = 0 TO MAX:
    V_copy = copy of V
    trace.APPEND(V_copy)
    
    FOR K = -D TO D STEP 2:
      // Down or right
      IF K == -D OR (K != D AND V[K - 1] < V[K + 1]) THEN
        X = V[K + 1]
      ELSE
        X = V[K - 1] + 1
      
      Y = X - K
      
      // Follow diagonal (matching characters)
      WHILE X < N AND Y < M AND a[X] == b[Y]:
        X += 1
        Y += 1
      
      V[K] = X
      
      IF X >= N AND Y >= M THEN
        RETURN backtrack(trace, N, M)
  
  RETURN NULL
END FUNCTION

FUNCTION backtrack(trace, N, M):
  edits = []
  x = N
  y = M
  
  FOR D = trace.length - 1 DOWNTO 1:
    V = trace[D]
    K = x - y
    
    IF K == -D OR (K != D AND V[K - 1] < V[K + 1]) THEN
      prevK = K + 1
    ELSE
      prevK = K - 1
    
    prevX = V[prevK]
    prevY = prevX - prevK
    
    // Diagonal moves (matching)
    WHILE x > prevX AND y > prevY:
      edits.PUSH({ type: 'equal', value: a[x - 1] })
      x -= 1
      y -= 1
    
    IF D > 0 THEN
      IF x == prevX THEN
        // Insert
        edits.PUSH({ type: 'insert', value: b[y - 1] })
        y -= 1
      ELSE
        // Delete
        edits.PUSH({ type: 'delete', value: a[x - 1] })
        x -= 1
  
  RETURN REVERSE(edits)
END FUNCTION
```

### 5.2 Visual Diff Rendering Algorithm

```
FUNCTION renderSideBySideDiff(oldLines, newLines, diff):
  oldOutput = []
  newOutput = []
  
  FOR EACH hunk IN diff.hunks:
    // Add context lines before hunk
    FOR i = hunk.oldStart - contextLines TO hunk.oldStart:
      oldOutput.PUSH({ type: 'context', line: oldLines[i] })
      newOutput.PUSH({ type: 'context', line: newLines[i] })
    
    // Process hunk changes
    oldIdx = hunk.oldStart
    newIdx = hunk.newStart
    
    FOR EACH change IN hunk.changes:
      SWITCH change.type:
        CASE 'equal':
          oldOutput.PUSH({ type: 'equal', line: oldLines[oldIdx] })
          newOutput.PUSH({ type: 'equal', line: newLines[newIdx] })
          oldIdx += 1
          newIdx += 1
        
        CASE 'delete':
          oldOutput.PUSH({ type: 'delete', line: oldLines[oldIdx] })
          newOutput.PUSH({ type: 'empty', line: '' })
          oldIdx += 1
        
        CASE 'insert':
          oldOutput.PUSH({ type: 'empty', line: '' })
          newOutput.PUSH({ type: 'insert', line: newLines[newIdx] })
          newIdx += 1
    
    // Add context lines after hunk
    FOR i = oldIdx TO oldIdx + contextLines:
      oldOutput.PUSH({ type: 'context', line: oldLines[i] })
      newOutput.PUSH({ type: 'context', line: newLines[i] })
  
  RETURN { oldLines: oldOutput, newLines: newOutput }
END FUNCTION
```

### 5.3 Version Comparison Algorithm

```
FUNCTION compareVersions(version1, version2):
  // Extract content
  content1 = version1.content
  content2 = version2.content
  
  // Compute diff
  diff = myersDiff(content1.split('\n'), content2.split('\n'))
  
  // Generate summary
  summary = {
    linesAdded: diff.filter(d => d.type == 'insert').length,
    linesRemoved: diff.filter(d => d.type == 'delete').length,
    linesModified: computeModifiedLines(diff),
    sectionsChanged: extractSections(diff),
    statisticalDiff: computeStatisticalDiff(content1, content2),
  }
  
  // Generate hunks for visual rendering
  hunks = generateHunks(diff, contextLines = 3)
  
  RETURN {
    diff,
    summary,
    hunks,
    metadata: {
      version1: version1.metadata,
      version2: version2.metadata,
    }
  }
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for version history algorithms are defined in `test_vectors/test_vectors_social_editor_ext.toml`. Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Diff Algorithms     | 10           | Myers, patience, LCS comparison   |
| Visual Rendering    | 8            | Side-by-side, inline, unified     |
| Storage             | 6            | Git-backed, D1 snapshots          |
| Attribution         | 6            | Author tracking, change metadata  |
| **Total**           | **30**       |                                   |

### 6.2 Validation Criteria

1. Diff algorithms produce correct edit scripts
2. Visual diff accurately represents changes
3. Storage correctly preserves all versions
4. Attribution tracks all changes completely

---

## 7. Domain Constraints

### 7.1 Version Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max versions per page | 500 | Storage limit |
| Max diff size | 100KB | Performance limit |
| Diff computation time | < 500ms | UX requirement |
| Visual render time | < 1s | UX requirement |

### 7.2 Storage Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| D1 row size | 1MB | Cloudflare limit |
| Git file size | 100MB | Practical limit |
| R2 object size | 5TB | Cloudflare limit |

### 7.3 Attribution Constraints

| Parameter | Requirement |
|-----------|-------------|
| Author identification | Required for all changes |
| Timestamp precision | ISO 8601 with timezone |
| Change message | Required for all saves |

---

## 8. Bibliography

### 8.1 Diff Algorithm References

1. Myers, E. (1986). An O(ND) difference algorithm and its variations. _Algorithmica_, 1(1-4), 251-266. **[TQA-1]**

2. Brute, D. (2006). patience diff. _Blog post_. https://blog.brachiosoft.com/en/posts/diff/ **[TQA-4]**

3. Hunt, J. W., & Szymanski, T. G. (1977). A fast algorithm for computing longest common subsequences. _CACM_, 20(5), 350-353. **[TQA-1]**

4. Tichy, W. F. (1985). The string-to-string correction problem with block moves. _ACM TOPLAS_, 7(4), 584-593. **[TQA-1]**

### 8.2 Version Control References

5. Git Documentation. (2024). _Git Documentation_. https://git-scm.com/docs **[TQA-5]**

6. Chacon, S., & Straub, B. (2014). _Pro Git_. Apress. https://git-scm.com/book/en/v2 **[TQA-2]**

### 8.3 Storage References

7. Cloudflare D1 Documentation. (2024). _D1 Database_. https://developers.cloudflare.com/d1/ **[TQA-5]**

8. Cloudflare R2 Documentation. (2024). _R2 Object Storage_. https://developers.cloudflare.com/r2/ **[TQA-5]**

### 8.4 Visual Diff References

9. GNU. (2024). _Diffutils Manual_. https://www.gnu.org/software/diffutils/ **[TQA-5]**

10. GitHub. (2024). _Diff Visualization_. https://github.com/features/action/viewing-differences **[TQA-5]**

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Version history      | 版本历史     | история версий       | Versionsverlauf       | Historique des versions    | バージョン履歴           |
| Diff algorithm       | 差异算法     | алгоритм различий    | Diff-Algorithmus      | Algorithme de diff         | 差分アルゴリズム          |
| Attribution          | 归属         | авторство            | Zuschreibung          | Attribution                | アトリビューション        |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `Version`             | Immutable document snapshot      | `derivedFrom`, `authoredBy`, `storedIn`         |
| `Diff`                | Computed difference              | `compares`, `computedUsing`, `renderedAs`       |
| `Attribution`         | Change metadata                  | `tracks`, `identifies`                          |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Diff algorithms fully specified
- [ ] Visual diff rendering documented
- [ ] Storage strategies defined
- [ ] Branch/merge patterns specified
- [ ] Attribution tracking documented

### 10.2 Accuracy

- [ ] Algorithm complexity matches literature
- [ ] Storage limits match Cloudflare documentation
- [ ] Visual rendering produces correct output

### 10.3 Consistency

- [ ] Nomenclature consistent with version control standards
- [ ] Algorithm inputs/outputs match domain constraints

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] Algorithm references cited correctly

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Specifications are implementation-ready
- [ ] Cross-lingual terms support i18n
