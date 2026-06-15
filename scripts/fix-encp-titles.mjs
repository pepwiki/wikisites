import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';
let fixed = 0;
let errors = [];

fs.readdirSync(ARTICLES_DIR).forEach((file) => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;
  
  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length);
  
  // Check for issues in title
  const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/);
  if (!titleMatch) return;
  
  const oldTitle = titleMatch[1];
  let newTitle = oldTitle;
  
  // Fix: Remove **INCI Name:** prefix
  newTitle = newTitle.replace(/^\*\*INCI Name:\*\*\s*/i, '');
  
  // Fix: Remove **Sequence:** prefix
  newTitle = newTitle.replace(/^\*\*Sequence:\*\*\s*/i, '');
  
  // Fix: Remove markdown formatting
  newTitle = newTitle.replace(/\*\*/g, '');
  
  // Fix: Clean up extra spaces
  newTitle = newTitle.replace(/\s+/g, ' ').trim();
  
  if (oldTitle !== newTitle) {
    // Fix frontmatter title
    const newFrontmatter = frontmatter.replace(
      /title:\s*"[^"]*"/,
      `title: "${newTitle}"`
    );
    
    // Fix body title if it matches
    let newBody = body;
    const bodyTitleMatch = body.match(/^# [^\n]+/);
    if (bodyTitleMatch && bodyTitleMatch[0].includes(oldTitle)) {
      newBody = body.replace(bodyTitleMatch[0], `# ${newTitle}`);
    }
    
    // Fix description if it's just another INCI name
    const descMatch = newFrontmatter.match(/description:\s*"([^"]*)"/);
    if (descMatch) {
      const oldDesc = descMatch[1];
      let newDesc = oldDesc;
      
      // Remove markdown
      newDesc = newDesc.replace(/\*\*/g, '');
      
      // If description is just another INCI name or starts with **INCI Name:**
      if (newDesc.match(/^INCI Name:/i) || newDesc.match(/^Sequence:/i)) {
        newDesc = `Comprehensive reference for ${newTitle}, a peptide compound with applications in research and therapeutics.`;
      }
      
      if (oldDesc !== newDesc) {
        const newFrontmatter2 = newFrontmatter.replace(
          /description:\s*"[^"]*"/,
          `description: "${newDesc}"`
        );
        fs.writeFileSync(filePath, `---\n${newFrontmatter2}\n---${newBody}`);
      } else {
        fs.writeFileSync(filePath, `---\n${newFrontmatter}\n---${newBody}`);
      }
    } else {
      fs.writeFileSync(filePath, `---\n${newFrontmatter}\n---${newBody}`);
    }
    
    fixed++;
  }
});

console.log(`Fixed ${fixed} articles with title/description issues`);
