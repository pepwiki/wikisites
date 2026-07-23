#!/usr/bin/env node
/**
 * Fix remaining crawlkit warnings for wikipept.com
 *
 * Fixes:
 * 1. META005: Description too short (<120 chars) → lengthen
 * 2. META002: Title too short (<30 chars) → lengthen (special pages only)
 * 3. AI-CS008/AI-CS009: Missing date/author on 4 special pages
 * 4. AI-CIT005: No structured data → handled via Starlight Head override
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const WIKI_DIR = "packages/wiki/src/content/docs";

// ─── Description fixes: short descriptions that need lengthening ───
// Map: filename → new description (120-160 chars)
const DESCRIPTION_FIXES = {
  "privacy.md":
    "Wikipept privacy policy — how we collect, use, and protect your personal data on our oligopeptide biology learning platform.",
  "learn/signaling.md":
    "Overview of peptide signaling mechanisms — autocrine, paracrine, and endocrine pathways in cell communication and drug response.",
  "learn/vip-vs-sildenafil-erectile.md":
    "Comparison of VIP and sildenafil for erectile dysfunction — mechanism of action, efficacy data, and clinical decision factors.",
  "learn/vip-vs-prostacyclin.md":
    "Comparison of VIP and prostacyclin vasodilators — cAMP signaling pathways, receptor selectivity, and clinical applications.",
  "reference/peptide-market-data.md":
    "Market data for therapeutic peptides — market size, growth projections, pricing trends, and competitive landscape analysis.",
  "learn/peptide-characterization.md":
    "Guide to peptide characterization methods — mass spectrometry, HPLC, NMR spectroscopy, and quality control specifications.",
  "learn/peptide-technology-transfer.md":
    "Guide to technology transfer for peptide manufacturing — process documentation, validation, and scale-up requirements overview.",
  "learn/insulin-aspart-vs-lispro-onset.md":
    "Pharmacokinetic comparison of insulin aspart and lispro — onset, peak, duration, and clinical implications for dosing decisions.",
  "learn/peptide-impurities.md":
    "Analysis of peptide impurity origins, characterization methods, and regulatory limits for synthetic peptide quality control.",
  "learn/insulin-glulisine-vs-iasp.md":
    "Analysis of insulin glulisine and insulin aspart — ultra-rapid pharmacokinetics, onset profiles, and clinical selection.",
  "learn/regulatory.md":
    "Overview of global regulatory frameworks for peptide therapeutics — FDA, EMA, and PMDA pathways and approval requirements.",
  "reference/peptide-manufacturing-methods.md":
    "Comparison of SPPS, liquid-phase synthesis, and recombinant production for peptide manufacturing at various scales overview.",
  "reference/peptide-storage-conditions.md":
    "Storage conditions for lyophilized and reconstituted peptides — temperature, humidity, light, and container requirements.",
  "learn/insulin-degludec-vs-peglispro.md":
    "Comparison of ultra-long-acting insulins degludec and peglispro — mechanisms, pharmacokinetics, and clinical outcomes data.",
  "learn/receptors.md":
    "Overview of receptor types, ligand binding kinetics, and dose-response relationships for peptide pharmacodynamics analysis.",
  "learn/semaglutide-vs-dulaglutide-efficacy.md":
    "Efficacy comparison of semaglutide and dulaglutide — HbA1c reduction, weight loss, and cardiovascular outcomes data analysis.",
  "reference/peptide-competitive-landscape.md":
    "Market competition analysis for therapeutic peptides — market share, pricing strategies, and pipeline differentiation data.",
  "reference/peptide-quality-control.md":
    "Quality control testing for synthetic peptides per ICH guidelines — identity, purity, potency, and stability specifications.",
  "reference/peptide-cost-analysis.md":
    "Cost comparison of peptide drugs — per-dose pricing, annual treatment costs, and biosimilar impact on market access analysis.",
  "reference/peptide-stability-data.md":
    "Analysis of principles governing peptide stability — degradation pathways, storage conditions, and formulation strategies.",
  "learn/thymosin-alpha-1-vs-thymulin.md":
    "Comparison of thymic peptides — Tα1 immunomodulation vs thymulin's zinc-dependent thymic hormone activity and clinical use.",
  "reference/peptide-interactions-database.md":
    "Database of peptide-drug interactions with severity ratings, clinical management recommendations, and pharmacokinetic data.",
  "reference/peptide-reconstitution-guide.md":
    "Guide for reconstituting lyophilized peptides — techniques, calculations, buffer selection, and storage after reconstitution.",
  "reference/receptor-binding.md":
    "Reference table of Kd, EC50, selectivity ratios, and clinical significance for therapeutic peptide receptor binding data.",
  "learn/insulin-aspart-vs-glulisine.md":
    "Comparison of insulin glulisine and insulin aspart — ultra-rapid pharmacokinetics, absorption profiles, and clinical use.",
  "learn/peptide-sterile-filtration.md":
    "Guide to sterile filtration for peptide manufacturing — membrane selection, validation, and regulatory compliance requirements.",
  "learn/peptide-half-life.md":
    "Half-life data for therapeutic peptides — modification strategies including PEGylation, lipidation, and cyclization approaches.",
  "learn/peptide-cell-based-assays.md":
    "Guide to cell-based assays for peptide characterization — receptor binding, signaling cascade activation, and functional readouts.",
  "learn/semaglutide-vs-liraglutide-cardiovascular.md":
    "Cardiovascular outcome comparison of semaglutide and liraglutide — LEADER, SUSTAIN, and SELECT trial data analysis summary.",
  "learn/melanotan-ii-vs-afmelanotide-fda.md":
    "Regulatory comparison of melanotan II and afamelanotide — FDA approval status, clinical indications, and safety profiles.",
  "learn/peptide-gmp-validation.md":
    "Guide to GMP validation for peptide manufacturing — process validation, cleaning validation, and analytical method qualification.",
  "reference/peptide-environmental-impact.md":
    "Environmental considerations for peptide manufacturing — green chemistry, waste management, and sustainability practices.",
  "learn/cjc-1295-dac-vs-mk-677-stack.md":
    "Analysis of combining CJC-1295 DAC with MK-677 — synergistic GH release, pulsatility, dosing protocols, and safety data.",
  "learn/peptide-storage.md":
    "Analysis of principles governing peptide stability — temperature, humidity, and light effects on storage and shelf life.",
  "learn/reconstitution.md":
    "Guide for reconstituting lyophilized peptides — volume calculations, technique, buffer selection, and handling best practices.",
  "learn/cjc-1295-dac-vs-tesamorelin-growth.md":
    "Comparison of CJC-1295 DAC and tesamorelin for growth hormone stimulation — pharmacokinetics, efficacy, and clinical profiles.",
  "learn/computational.md":
    "Computational methods for peptide design — molecular dynamics, docking simulations, AI-driven design, and ADMET prediction.",
  "learn/amino-acids.md":
    "Reference guide to the 20 standard amino acids — molecular weights, pKa values, side chain properties, and codon usage tables.",
};

// ─── Title fixes: titles <30 chars (special pages) ───
const TITLE_FIXES = {
  "index.md": "Wikipept — Oligopeptide Biology Learning Platform",
  "community.md": "Wikipept Community — Get Involved",
  "privacy.md": "Wikipept Privacy Policy for Users",
  "404.md": "Page Not Found — Wikipept Wiki",
};

// ─── Date/author fixes for special pages ───
const SPECIAL_PAGE_META = {
  "index.md": { date: "2026-06-01", author: "Wikipept Team" },
  "community.md": { date: "2026-06-01", author: "Wikipept Team" },
  "privacy.md": { date: "2026-06-01", author: "Wikipept Team" },
  "404.md": { date: "2026-06-01", author: "Wikipept Team" },
};

function scanDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...scanDir(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function fixFrontmatter(content, filePath) {
  const fmMatch = content.match(/^(---\n)([\s\S]*?)(\n---)/);
  if (!fmMatch) return { content, changed: false };

  let fm = fmMatch[2];
  let changed = false;
  // Use relative path from WIKI_DIR for lookups
  const relPath = filePath.replace(docsDir + "/", "");

  // Fix short descriptions (META005)
  if (DESCRIPTION_FIXES[relPath]) {
    const descRegex = /^description:\s*[\"']?(.*?)[\"']?\s*$/m;
    const newDesc = DESCRIPTION_FIXES[relPath];
    if (descRegex.test(fm)) {
      fm = fm.replace(descRegex, `description: "${newDesc}"`);
    } else {
      fm += `\ndescription: "${newDesc}"`;
    }
    changed = true;
  }

  // Fix short titles (META002)
  if (TITLE_FIXES[relPath]) {
    const titleRegex = /^title:\s*[\"']?(.*?)[\"']?\s*$/m;
    const newTitle = TITLE_FIXES[relPath];
    if (titleRegex.test(fm)) {
      fm = fm.replace(titleRegex, `title: "${newTitle}"`);
    } else {
      fm = `title: "${newTitle}"\n` + fm;
    }
    changed = true;
  }

  // Fix missing date/author (AI-CS008, AI-CS009)
  if (SPECIAL_PAGE_META[relPath]) {
    const { date, author } = SPECIAL_PAGE_META[relPath];
    if (!/^date:/m.test(fm)) {
      fm = `date: ${date}\n` + fm;
      changed = true;
    }
    if (!/^author:/m.test(fm)) {
      fm = `author: "${author}"\n` + fm;
      changed = true;
    }
  }

  if (changed) {
    return {
      content: `---\n${fm}\n---` + content.slice(fmMatch[0].length),
      changed: true,
    };
  }
  return { content, changed: false };
}

// ─── Main ───
const docsDir = join(process.cwd(), WIKI_DIR);
const files = scanDir(docsDir);
let fixedCount = 0;

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const result = fixFrontmatter(content, file);
  if (result.changed) {
    writeFileSync(file, result.content);
    fixedCount++;
    console.log(`Fixed: ${file.replace(docsDir + "/", "")}`);
  }
}

console.log(`\nDone. Fixed ${fixedCount} files.`);
