#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';

const issues = [];
const stats = {
  total: 0,
  published: 0,
  categories: {},
  difficulties: {},
  hasCitation: 0,
  hasTags: 0,
  hasDescription: 0,
  hasCategory: 0,
  hasDifficulty: 0,
};

// Check for scientific accuracy keywords that might indicate errors
const ACCURACY_CHECKS = {
  // Common incorrect claims
  incorrectClaims: [
    { pattern: /water is a peptide/i, issue: "Water is not a peptide" },
    { pattern: /glucose is a peptide/i, issue: "Glucose is not a peptide" },
    { pattern: /DNA is a peptide/i, issue: "DNA is not a peptide" },
    { pattern: /RNA is a peptide/i, issue: "RNA is not a peptide" },
    { pattern: /vitamin [A-Z] is a peptide/i, issue: "Vitamins are not peptides" },
    { pattern: /cholesterol is a peptide/i, issue: "Cholesterol is not a peptide" },
  ],
  // Check for incorrect molecular weights (peptides are typically 100-10000 Da)
  incorrectMW: [
    { pattern: /molecular weight.*(?:1|2|3|4|5|6|7|8|9)\s*Da\s*$/i, issue: "Molecular weight seems too small" },
    { pattern: /molecular weight.*\d{6,}\s*Da/i, issue: "Molecular weight seems too large for a peptide" },
  ],
  // Check for incorrect amino acid counts
  incorrectAA: [
    { pattern: /0 amino acids/i, issue: "0 amino acids is not valid" },
    { pattern: /(?:1|2|3|4|5) amino acids.*(?:insulin|glucagon|calcitonin|oxytocin|vasopressin)/i, issue: "Known peptide has incorrect amino acid count" },
  ],
  // Check for missing or incorrect citation formats
  citationIssues: [
    { pattern: /citation.*doi.*undefined/i, issue: "Citation DOI is undefined" },
    { pattern: /citation.*year.*undefined/i, issue: "Citation year is undefined" },
  ],
};

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = file.replace('.md', '');

  stats.total++;

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    issues.push({ file: fileName, issue: 'Missing or malformed frontmatter', severity: 'error' });
    continue;
  }

  const frontmatter = frontmatterMatch[1];

  // Extract fields
  const titleMatch = frontmatter.match(/title:\s*"?([^"\n]+)"?/);
  const statusMatch = frontmatter.match(/status:\s*"?([^"\n]+)"?/);
  const categoryMatch = frontmatter.match(/category:\s*"?([^"\n]+)"?/);
  const difficultyMatch = frontmatter.match(/difficulty:\s*"?([^"\n]+)"?/);
  const tagsMatch = frontmatter.match(/tags:\s*\[([^\]]*)\]/);
  const doiMatch = frontmatter.match(/doi:\s*"?([^"\n]+)"?/);

  // Track stats
  if (statusMatch && statusMatch[1] === 'published') stats.published++;
  if (categoryMatch) {
    stats.hasCategory++;
    const cat = categoryMatch[1].trim();
    stats.categories[cat] = (stats.categories[cat] || 0) + 1;
  }
  if (difficultyMatch) stats.hasDifficulty++;
  if (tagsMatch && tagsMatch[1].trim().length > 0) stats.hasTags++;
  if (doiMatch && doiMatch[1].trim() !== 'undefined') stats.hasCitation++;
  if (titleMatch && titleMatch[1].trim().length > 0) stats.hasDescription++;

  // Check for issues
  if (!titleMatch || titleMatch[1].trim().length === 0) {
    issues.push({ file: fileName, issue: 'Missing or empty title', severity: 'error' });
  }

  if (!categoryMatch || categoryMatch[1].trim().length === 0) {
    issues.push({ file: fileName, issue: 'Missing or empty category', severity: 'warning' });
  }

  if (!difficultyMatch || difficultyMatch[1].trim().length === 0) {
    issues.push({ file: fileName, issue: 'Missing or empty difficulty', severity: 'warning' });
  }

  if (!tagsMatch || tagsMatch[1].trim().length === 0) {
    issues.push({ file: fileName, issue: 'Missing or empty tags', severity: 'info' });
  }

  // Check for citation issues
  if (doiMatch && doiMatch[1].trim() === 'undefined') {
    issues.push({ file: fileName, issue: 'Citation DOI is undefined', severity: 'warning' });
  }

  // Check content length (should be substantial for a peptide article)
  const contentLines = content.split('\n').length;
  if (contentLines < 10) {
    issues.push({ file: fileName, issue: 'Content seems too short (< 10 lines)', severity: 'warning' });
  }
}

// Print summary
console.log('\n=== ENCP Peptide Article Audit Summary ===');
console.log(`Total articles: ${stats.total}`);
console.log(`Published: ${stats.published}`);
console.log(`Has title: ${stats.hasDescription}`);
console.log(`Has category: ${stats.hasCategory}`);
console.log(`Has difficulty: ${stats.hasDifficulty}`);
console.log(`Has tags: ${stats.hasTags}`);
console.log(`Has citation: ${stats.hasCitation}`);

console.log('\n=== Categories ===');
Object.entries(stats.categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

console.log('\n=== Issues Found ===');
if (issues.length === 0) {
  console.log('No issues found!');
} else {
  issues.forEach((issue) => {
    const prefix = issue.severity === 'error' ? '🔴' : issue.severity === 'warning' ? '🟡' : '🔵';
    console.log(`  ${prefix} [${issue.file}] ${issue.issue}`);
  });
}

// Write detailed report
const report = {
  timestamp: new Date().toISOString(),
  stats,
  issues,
};

fs.writeFileSync(
  '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/.specs/07_docs_verification/encp-audit-report.json',
  JSON.stringify(report, null, 2)
);

console.log('\nDetailed report saved to .specs/07_docs_verification/encp-audit-report.json');
