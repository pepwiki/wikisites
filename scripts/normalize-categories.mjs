import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';

// Category normalization mapping
const categoryMap = {
  // Lowercase to proper case
  'neurological': 'Neurology',
  'cardiovascular': 'Cardiovascular',
  'cancer': 'Oncology',
  'metabolic': 'Metabolic',
  'infectious': 'Infectious Disease',
  'inflammatory': 'Inflammatory',
  'clinical': 'Clinical Trials',
  'drug': 'Drug Development',
  'sequence': 'Peptide Sequence',
  // Normalize specific categories
  'Potassium channel blocker (scorpion toxin)': 'Toxin Peptides',
  'Calcium channel blocker (spider toxin)': 'Toxin Peptides',
  'Sodium channel activator (non-peptide)': 'Toxin Peptides',
  'Clostridial neurotoxin (SNARE protease)': 'Toxin Peptides',
  'α-Conotoxin (nAChR antagonist)': 'Toxin Peptides',
  'μ-Conotoxin (sodium channel blocker)': 'Toxin Peptides',
  'Calcium channel blocker (ω-conotoxin)': 'Toxin Peptides',
  'ω-Conotoxin (calcium channel blocker)': 'Toxin Peptides',
  'δ-Conotoxin (sodium channel activator)': 'Toxin Peptides',
  'Mast cell degranulating peptide (wasp venom)': 'Toxin Peptides',
  'Sodium channel activator (α-scorpion toxin)': 'Toxin Peptides',
  'ADP-ribosylating toxin (bacterial)': 'Toxin Peptides',
  'Dual Nav/Kv blocker (spider toxin)': 'Toxin Peptides',
  'Sodium channel blocker (spider toxin)': 'Toxin Peptides',
  'Glutamate receptor antagonist (spider toxin)': 'Toxin Peptides',
  'Presynaptic neurotoxin (spider venom)': 'Toxin Peptides',
  'G-protein activator/cytolytic peptide (wasp venom)': 'Toxin Peptides',
  'Sodium channel activator (spider toxin)': 'Toxin Peptides',
  'Enzyme toxin (bee venom)': 'Toxin Peptides',
  'Cardiotoxin (endothelin-like peptide)': 'Toxin Peptides',
  'Presynaptic neurotoxin (PLA2 complex)': 'Toxin Peptides',
  'Avian Defensin': 'Antimicrobial Peptides',
  'Avian Cathelicidin': 'Antimicrobial Peptides',
  'Avian Peptide Hormone': 'Peptide Hormones',
  'Avian Specialized Peptide': 'Specialized Peptides',
  'Avian Antimicrobial Peptide': 'Antimicrobial Peptides',
  'Avian Neuropeptide': 'Neuropeptides',
  'Potassium channel blocker (sea anemone toxin)': 'Toxin Peptides',
  'Market': 'Industry & Market',
  'Technology': 'Peptide Technologies',
  'Hormones': 'Peptide Hormones',
  'GI Peptides': 'Gastrointestinal Peptides',
  'Snake Venom Peptide': 'Toxin Peptides',
  'Lizard Peptide': 'Reptile Peptides',
  'Pharmaceutical Science': 'Drug Development',
  'Adipokines': 'Metabolic',
  'Opioid Peptides': 'Neuropeptides',
  'Pharmacology': 'Drug Development',
  'Hypothalamic Peptides': 'Neuropeptides',
  'Crocodilian Peptide': 'Reptile Peptides',
  'Gecko Peptide': 'Reptile Peptides',
  'Peptide Hormones': 'Peptide Hormones',
  'Characterization': 'Peptide Analysis',
  'Materials Science': 'Peptide Applications',
  'Quality Control': 'Peptide Manufacturing',
  'Cardiac Peptides': 'Cardiovascular',
  'Chameleon Peptide': 'Reptile Peptides',
  'Drug Design': 'Drug Development',
  'Structural Biology': 'Peptide Analysis',
  'Tachykinins': 'Neuropeptides',
  'Diagnostics': 'Biomarker Peptides',
  'Oncology': 'Oncology',
  'Turtle Peptide': 'Reptile Peptides',
  'Synthesis': 'Peptide Manufacturing',
  'Purification': 'Peptide Manufacturing',
  'Microbiology': 'Infectious Disease',
  'Pancreatic Peptides': 'Peptide Hormones',
  'Cell Biology': 'Peptide Applications',
  'Neuroscience': 'Neurology',
  'Immunology': 'Immunology',
  'Incretins': 'Metabolic',
  'Peptide Purification': 'Peptide Manufacturing',
  'Pentapeptides': 'Peptide Sequence',
  'Undecapeptides': 'Peptide Sequence',
  'Regenerative Medicine': 'Drug Development',
};

let updated = 0;

fs.readdirSync(ARTICLES_DIR).forEach((file) => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;
  
  const frontmatter = frontmatterMatch[1];
  const categoryMatch = frontmatter.match(/category:\s*"?([^"\n]+)"?/);
  
  if (!categoryMatch) return;
  
  const oldCategory = categoryMatch[1].trim();
  const newCategory = categoryMap[oldCategory] || oldCategory;
  
  if (oldCategory !== newCategory) {
    const newContent = content.replace(
      /category:\s*"?[^"\n]+"?/,
      `category: "${newCategory}"`
    );
    fs.writeFileSync(filePath, newContent);
    updated++;
  }
});

console.log(`Updated ${updated} articles with normalized categories`);
