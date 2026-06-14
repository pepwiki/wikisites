#!/usr/bin/env node
/**
 * Generate ENCP articles from the peptide database.
 * Reads peptide data files and creates MDX articles for the ENCP site.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";

const WIKI_PEPTIDES_DIR = "./packages/wiki/src/content/peptides";
const ENCP_ARTICLES_DIR = "./packages/encp/src/content/articles";

// Read all peptide database files
const files = readdirSync(WIKI_PEPTIDES_DIR).filter((f) => f.endsWith(".md"));

let totalGenerated = 0;
let skipped = 0;

for (const file of files) {
  const content = readFileSync(join(WIKI_PEPTIDES_DIR, file), "utf-8");

  // Parse peptide entries from the file
  const entries = parsePeptideEntries(content, file);

  for (const entry of entries) {
    const slug = entry.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 80); // Truncate long names

    const articlePath = join(ENCP_ARTICLES_DIR, `${slug}.md`);

    // Check if article already exists
    try {
      readFileSync(articlePath);
      skipped++;
      continue;
    } catch {
      // File doesn't exist, create it
    }

    const article = generateArticle(entry, file);
    writeFileSync(articlePath, article);
    totalGenerated++;
  }
}

console.log(`Generated ${totalGenerated} articles, skipped ${skipped} (already exist)`);

function parsePeptideEntries(content, filename) {
  const entries = [];

  // Try YAML-style entries (---\nid: ...\n---)
  const yamlBlocks = content.split(/^---$/m);
  for (let i = 1; i < yamlBlocks.length; i += 2) {
    const block = yamlBlocks[i];
    if (!block) continue;

    const nameMatch = block.match(/name:\s*"?([^"\n]+)"?/);
    const seqMatch = block.match(/sequence:\s*"?([^"\n]+)"?/);
    const mwMatch = block.match(/molecular_weight:\s*(\d+)/);
    const catMatch = block.match(/category:\s*"?([^"\n]+)"?/);
    const descMatch = block.match(/description:\s*"?([^"\n]+)"?/);

    if (nameMatch) {
      entries.push({
        name: nameMatch[1].trim(),
        sequence: seqMatch ? seqMatch[1].trim() : "",
        molecularWeight: mwMatch ? parseInt(mwMatch[1]) : 0,
        category: catMatch ? catMatch[1].trim() : extractCategoryFromFilename(filename),
        description: descMatch ? descMatch[1].trim() : "",
        sourceFile: filename,
      });
    }
  }

  // Try table-style entries (| Name | Sequence | ...)
  const tableRows = content.match(/\|[^|]+\|[^|]+\|[^|]+\|/g) || [];
  for (const row of tableRows) {
    const cells = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length >= 3 && cells[0] !== "Name" && cells[0] !== "Peptide" && cells[0] !== "ID") {
      entries.push({
        name: cells[0],
        sequence: cells[1] || "",
        molecularWeight: 0,
        category: extractCategoryFromFilename(filename),
        description: cells[2] || "",
        sourceFile: filename,
      });
    }
  }

  // Try markdown heading style (### Peptide Name)
  const headings = content.match(/^###\s+(.+)$/gm) || [];
  for (const heading of headings) {
    let name = heading.replace(/^###\s+/, "").trim();
    // Skip non-peptide entries
    const skipPatterns = ["Table", "Summary", "Key Trends", "Category", "Total", "Overview", "References", "Notes"];
    if (name && !skipPatterns.some((p) => name.includes(p))) {
      // Clean up numbered prefixes like "10. Liraglutide" -> "Liraglutide"
      name = name.replace(/^\d+\.\s+/, "");
      // Skip if name is too long or contains markdown
      if (name.length > 100 || name.includes("**") || name.includes("|") || name.includes("---")) continue;
      entries.push({
        name,
        sequence: "",
        molecularWeight: 0,
        category: extractCategoryFromFilename(filename),
        description: "",
        sourceFile: filename,
      });
    }
  }

  return entries;
}

function extractCategoryFromFilename(filename) {
  return filename
    .replace(/\.md$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateArticle(entry, sourceFile) {
  const category = entry.category || "Peptides";
  const tags = [
    category.toLowerCase().replace(/\s+/g, "-"),
    "peptide",
    "oligopeptide",
  ];

  // Escape YAML special characters in strings
  const escapeYaml = (str) => str.replace(/"/g, '\\"').replace(/\n/g, " ");

  return `---
title: "${escapeYaml(entry.name)}"
description: "${escapeYaml(entry.description || `Comprehensive reference for ${entry.name}, a peptide compound with applications in research and therapeutics.`)}"
status: "published"
author: "Encyclopeptide Editorial"
pubDate: 2024-01-15
tags: ${JSON.stringify(tags)}
category: "${escapeYaml(category)}"
difficulty: "intermediate"
relatedArticles: []
---

## Overview

${entry.name} is a peptide compound with applications in research and therapeutics. ${entry.description || ""}

${entry.sequence ? `## Chemical Identity\n\n| Property | Value |\n|----------|-------|\n| Name | ${entry.name} |\n| Sequence | ${entry.sequence} |\n| Length | ${entry.sequence.length} amino acids |\n${entry.molecularWeight ? `| Molecular Weight | ${entry.molecularWeight} Da |` : ""}\n| Category | ${category} |` : ""}

## Structure

${entry.name} belongs to the ${category} class of peptides. Its structure and properties make it suitable for various research and therapeutic applications.

## Applications

${entry.name} has been studied for its potential applications in:
- Biomedical research
- Drug discovery
- Diagnostic applications
- Therapeutic development

## References

- Source: ${sourceFile}
- Database: Wikipept Peptide Database
`;
}
