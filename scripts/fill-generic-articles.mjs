import fs from 'fs';
import path from 'path';

const WIKI_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/wiki/src/content/peptides';
const ENCP_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';

// Extract peptide data from wiki files
function extractPeptideData(content, filename) {
  const peptides = [];
  const sections = content.split(/^###\s+/m);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const nameMatch = section.match(/^([^\n]+)/);
    if (!nameMatch) continue;
    
    const name = nameMatch[1].trim();
    const data = { name, source: filename };
    
    // Extract properties from markdown table
    const rows = section.split('\n');
    for (const row of rows) {
      const [_, key, val] = row.match(/\|\s*\*?\*?([^|]+?)\*?\*?\s*\|\s*([^|]+?)\s*\|/) || [];
      if (key && val) {
        data[key.trim()] = val.trim();
      }
    }
    
    peptides.push(data);
  }
  
  return peptides;
}

// Read all wiki peptide files
const wikiFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
const allPeptides = new Map();

for (const file of wikiFiles) {
  const content = fs.readFileSync(path.join(WIKI_DIR, file), 'utf-8');
  const peptides = extractPeptideData(content, file);
  for (const p of peptides) {
    allPeptides.set(p.name.toLowerCase(), p);
  }
}

console.log(`Extracted ${allPeptides.size} peptides from wiki database`);

// Process ENCP articles
const encpFiles = fs.readdirSync(ENCP_DIR).filter(f => f.endsWith('.md'));
let filled = 0;
let notFound = 0;
let alreadySpecific = 0;

for (const file of encpFiles) {
  const filePath = path.join(ENCP_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip specific articles
  if (!content.includes('Comprehensive reference for')) {
    alreadySpecific++;
    continue;
  }
  
  // Extract title
  const titleMatch = content.match(/title:\s*"?([^"\n]+)"?/);
  if (!titleMatch) continue;
  
  const title = titleMatch[1].trim();
  const lowerTitle = title.toLowerCase();
  
  // Find matching wiki peptide
  let wikiData = null;
  
  // Try exact match first
  if (allPeptides.has(lowerTitle)) {
    wikiData = allPeptides.get(lowerTitle);
  } else {
    // Try partial match
    for (const [key, val] of allPeptides) {
      if (lowerTitle.includes(key) || key.includes(lowerTitle)) {
        wikiData = val;
        break;
      }
    }
  }
  
  if (!wikiData) {
    notFound++;
    continue;
  }
  
  // Build new content
  const sequence = wikiData['Sequence'] || '';
  const length = wikiData['Length'] || '';
  const mw = wikiData['Molecular Weight'] || wikiData['MW'] || '';
  const source = wikiData['Source'] || wikiData['Source Amphibian'] || wikiData['Source Bacterium'] || wikiData['Source Bird'] || wikiData['Source Fish'] || wikiData['Source Fungus'] || wikiData['Source Insect'] || wikiData['Source Mammal'] || wikiData['Source Organism'] || wikiData['Source Plant'] || wikiData['Source Protist'] || wikiData['Source Reptile'] || wikiData['Source Venom'] || wikiData['Source Worm'] || wikiData['Source Yeast'] || '';
  const mechanism = wikiData['Mechanism'] || '';
  const bioactivity = wikiData['Bioactivity'] || '';
  const therapeutic = wikiData['Therapeutic Potential'] || wikiData['Therapeutic'] || '';
  const category = wikiData['Category'] || '';
  
  // Get category from frontmatter if not in wiki data
  const catMatch = content.match(/category:\s*"?([^"\n]+)"?/);
  const finalCategory = category || (catMatch ? catMatch[1].trim() : 'Peptides');
  
  // Build structure section
  let structureSection = '';
  if (sequence || length || mw) {
    structureSection = `
## Structure

| Property | Value |
|----------|-------|
| Name | ${title} |
${sequence ? `| Sequence | ${sequence} |` : ''}
${length ? `| Length | ${length} |` : ''}
${mw ? `| Molecular Weight | ${mw} |` : ''}
${source ? `| Source | ${source} |` : ''}
| Category | ${finalCategory} |`;
  }
  
  // Build mechanism section
  let mechanismSection = '';
  if (mechanism) {
    mechanismSection = `
## Mechanism of Action

${mechanism}`;
  }
  
  // Build bioactivity section
  let bioactivitySection = '';
  if (bioactivity) {
    bioactivitySection = `
## Bioactivity

${bioactivity}`;
  }
  
  // Build therapeutic section
  let therapeuticSection = '';
  if (therapeutic) {
    therapeuticSection = `
## Therapeutic Potential

${therapeutic}`;
  }
  
  // Build new content
  const newContent = `---
${content.split('---\n')[1]}---

# ${title}

## Overview

${title} is a bioactive peptide with well-characterized properties and therapeutic applications.${source ? ` It is derived from ${source}.` : ''}

${structureSection}
${mechanismSection}
${bioactivitySection}
${therapeuticSection}

## References

- Wikipept Peptide Database
- Primary literature (see individual entries)
`;
  
  fs.writeFileSync(filePath, newContent);
  filled++;
}

console.log(`Filled ${filled} articles with wiki data`);
console.log(`Skipped ${alreadySpecific} specific articles`);
console.log(`Could not find wiki data for ${notFound} articles`);
