#!/usr/bin/env bun
/**
 * Content validation script for encyclopeptide.com articles.
 * Checks all articles against the content quality standard.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_DIR = join(import.meta.dir, "../packages/encp/src/content/articles");

const APPROVED_CATEGORIES = [
  "Tripeptides", "Pentapeptides", "Nonapeptides", "Octapeptides",
  "Opioid Peptides", "Neuropeptides", "Hormones", "GI Peptides",
  "Cardiac Peptides", "Vasoactive Peptides", "Hypothalamic Peptides",
  "Tachykinins", "Incretins", "Peptide Hormones", "Antimicrobial Peptides",
  "Drug Design", "Pharmacology", "Pharmaceutical Science", "Materials Science",
  "Neuroscience", "Immunology", "Oncology", "Structural Biology",
  "Cell Biology", "Diagnostics", "Regenerative Medicine", "Microbiology",
  "Dipeptides", "Undecapeptides", "Pentadecapeptides",
];

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
}

function validateArticle(filePath: string): ValidationResult {
  const content = readFileSync(filePath, "utf-8");
  const fileName = filePath.split("/").pop() || "";
  const result: ValidationResult = { file: fileName, errors: [], warnings: [] };

  // Extract frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    result.errors.push("Missing frontmatter");
    return result;
  }

  const fm = fmMatch[1];

  // Check mandatory fields
  const requiredFields = ["title", "description", "status", "author", "pubDate", "category", "difficulty", "citation"];
  for (const field of requiredFields) {
    if (!fm.includes(`${field}:`)) {
      result.errors.push(`Missing required field: ${field}`);
    }
  }

  // Check category
  const catMatch = fm.match(/category:\s*["']?([^"'\n]+)["']?/);
  if (catMatch) {
    const cat = catMatch[1].trim();
    if (!APPROVED_CATEGORIES.includes(cat)) {
      result.warnings.push(`Category "${cat}" not in approved list`);
    }
  }

  // Check description length
  const descMatch = fm.match(/description:\s*["'](.+?)["']/);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length < 50) result.warnings.push("Description too short (<50 chars)");
    if (desc.length > 160) result.warnings.push("Description too long (>160 chars)");
  }

  // Check DOI exists
  if (!fm.includes("doi:")) {
    result.errors.push("Missing DOI citation");
  }

  // Check related articles
  if (!fm.includes("relatedArticles:")) {
    result.warnings.push("No related articles specified");
  }

  // Check word count
  const body = content.replace(/^---[\s\S]*?---\n/, "");
  const wordCount = body.split(/\s+/).length;
  const diffMatch = fm.match(/difficulty:\s*["']?(\w+)["']?/);
  const difficulty = diffMatch?.[1] || "intermediate";

  const limits: Record<string, [number, number]> = {
    beginner: [400, 800],
    intermediate: [600, 1200],
    advanced: [800, 1500],
    expert: [1000, 2000],
  };

  const [min, max] = limits[difficulty] || [600, 1200];
  if (wordCount < min) result.warnings.push(`Word count ${wordCount} below minimum ${min}`);
  if (wordCount > max) result.warnings.push(`Word count ${wordCount} above maximum ${max}`);

  // Check for emojis
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{24C2}-\u{1F251}]/u;
  if (emojiRegex.test(body)) {
    result.errors.push("Article contains emojis (not allowed)");
  }

  // Check for promotional language
  const promoWords = ["revolutionary", "breakthrough", "cutting-edge", "game-changing", "unprecedented"];
  for (const word of promoWords) {
    if (body.toLowerCase().includes(word)) {
      result.warnings.push(`Contains promotional language: "${word}"`);
    }
  }

  return result;
}

// Main
const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
console.log(`Validating ${files.length} articles...\n`);

let totalErrors = 0;
let totalWarnings = 0;

for (const file of files) {
  const result = validateArticle(join(CONTENT_DIR, file));
  if (result.errors.length > 0 || result.warnings.length > 0) {
    console.log(`${result.file}:`);
    for (const err of result.errors) {
      console.log(`  ERROR: ${err}`);
      totalErrors++;
    }
    for (const warn of result.warnings) {
      console.log(`  WARN: ${warn}`);
      totalWarnings++;
    }
    console.log();
  }
}

console.log(`\nValidation complete: ${totalErrors} errors, ${totalWarnings} warnings across ${files.length} articles`);
process.exit(totalErrors > 0 ? 1 : 0);
