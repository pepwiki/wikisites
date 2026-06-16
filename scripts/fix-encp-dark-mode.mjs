import fs from 'fs';
import path from 'path';

const ENCP_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src';
let fixed = 0;

// Color replacement rules for dark mode
const replacements = [
  // Navy text on dark bg -> light text
  { from: 'text-[#0A1628]', to: 'text-[#0A1628] dark:text-slate-100' },
  // Navy bg -> keep navy (header is always dark)
  // Navy border -> dark border
  { from: 'border-[#0A1628]', to: 'border-[#0A1628] dark:border-slate-700' },
  // Gold text -> keep gold (works on both themes)
  // Gold bg -> slightly brighter on dark
  { from: 'bg-[#C9A84C]', to: 'bg-[#C9A84C] dark:bg-[#d4b85c]' },
  // Slate text without dark variant
  { from: 'text-slate-900', to: 'text-slate-900 dark:text-slate-100' },
  { from: 'text-slate-600', to: 'text-slate-600 dark:text-slate-400' },
  { from: 'text-slate-500', to: 'text-slate-500 dark:text-slate-400' },
  { from: 'text-slate-700', to: 'text-slate-700 dark:text-slate-300' },
  // Slate bg without dark variant
  { from: 'bg-white', to: 'bg-white dark:bg-slate-900' },
  { from: 'bg-slate-50', to: 'bg-slate-50 dark:bg-slate-800' },
  { from: 'bg-slate-100', to: 'bg-slate-100 dark:bg-slate-800' },
  // Slate border without dark variant
  { from: 'border-slate-200', to: 'border-slate-200 dark:border-slate-700' },
  { from: 'border-slate-300', to: 'border-slate-300 dark:border-slate-600' },
];

// Process all Astro files
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;
  
  for (const { from, to } of replacements) {
    // Only replace instances that don't already have dark: variant
    // Use regex to match the class but not if it already has dark: following it
    const regex = new RegExp(`(?<!dark:\\S*)${from.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&')}(?!\\s*dark:)`, 'g');
    newContent = newContent.replace(regex, to);
  }
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
}

// Process all Astro files in pages and layouts
const dirs = [
  path.join(ENCP_DIR, 'pages'),
  path.join(ENCP_DIR, 'layouts'),
  path.join(ENCP_DIR, 'components'),
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir, { recursive: true });
  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.astro')) {
      processFile(path.join(dir, file));
    }
  }
}

console.log(`Fixed ${fixed} files with dark mode variants`);
