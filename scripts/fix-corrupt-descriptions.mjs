import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';
let fixed = 0;

const corruptValues = ['Property', 'Field', 'Category', 'Common Use', 'Value', 'Description'];

fs.readdirSync(ARTICLES_DIR).forEach((file) => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const descMatch = content.match(/description:\s*"([^"]*)"/);
  if (!descMatch) return;
  
  const desc = descMatch[1].trim();
  
  // Check if description is a corrupt single-word value
  if (corruptValues.includes(desc)) {
    // Derive description from title
    const titleMatch = content.match(/title:\s*"([^"]*)"/);
    if (!titleMatch) return;
    
    const title = titleMatch[1].trim();
    const slug = file.replace('.md', '').replace(/-/g, ' ');
    
    // Generate a proper description
    const newDesc = `${title} is a bioactive compound with applications in peptide research and therapeutics.`;
    
    const newContent = content.replace(
      /description:\s*"[^"]*"/,
      `description: "${newDesc}"`
    );
    
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
});

console.log(`Fixed ${fixed} articles with corrupt descriptions`);
