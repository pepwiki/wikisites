import fs from 'fs';
import path from 'path';

const WIKI_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/wiki/src/content/peptides';
const ENCP_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';

// Extract peptide data from wiki files
function extractPeptideData(content) {
  const peptides = [];
  const sections = content.split(/^###\s+/m);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const nameMatch = section.match(/^([^\n]+)/);
    if (!nameMatch) continue;
    
    const name = nameMatch[1].trim();
    const data = {};
    
    // Extract properties from markdown table
    const propMatch = section.match(/\| Property \| Value \|\n\|[-]+\|[-]+\|\n([\s\S]*?)(?=\n\n|\n#|\n\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|)/);
    if (propMatch) {
      const rows = propMatch[1].split('\n');
      for (const row of rows) {
        const [_, key, val] = row.match(/\|\s*\*?\*?([^|]+?)\*?\*?\s*\|\s*([^|]+?)\s*\|/) || [];
        if (key && val) {
          data[key.trim()] = val.trim();
        }
      }
    }
    
    peptides.push({ name, ...data });
  }
  
  return peptides;
}

// Read all wiki peptide files
const wikiFiles = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
const allPeptides = new Map();

for (const file of wikiFiles) {
  const content = fs.readFileSync(path.join(WIKI_DIR, file), 'utf-8');
  const peptides = extractPeptideData(content);
  for (const p of peptides) {
    allPeptides.set(p.name.toLowerCase(), { file, ...p });
  }
}

console.log(`Extracted ${allPeptides.size} peptides from wiki database`);

// Check how many ENCP articles are generic
const encpFiles = fs.readdirSync(ENCP_DIR).filter(f => f.endsWith('.md'));
let generic = 0;
let specific = 0;
const genericFiles = [];

for (const file of encpFiles) {
  const content = fs.readFileSync(path.join(ENCP_DIR, file), 'utf-8');
  if (content.includes('Comprehensive reference for')) {
    generic++;
    // Get the title
    const titleMatch = content.match(/title:\s*"?([^"\n]+)"?/);
    if (titleMatch) {
      genericFiles.push({ file, title: titleMatch[1].trim() });
    }
  } else {
    specific++;
  }
}

console.log(`ENCP articles: ${generic} generic, ${specific} specific`);
console.log(`Generic files:`, genericFiles.slice(0, 5));
