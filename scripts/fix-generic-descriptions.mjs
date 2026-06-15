import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = '/home/wyatt/dev/src/forgejo.wyattau.com/KP/wikisites/packages/encp/src/content/articles';

// Map of article slugs to proper descriptions
const descriptions = {
  'troponin-i': 'Cardiac protein biomarker used to diagnose myocardial infarction and assess cardiac injury severity.',
  'troponin-t': 'Cardiac protein biomarker released during myocardial damage, used in acute coronary syndrome diagnosis.',
  'high-sensitivity-troponin-i': 'Ultra-sensitive cardiac biomarker enabling early detection of myocardial infarction within 1-3 hours.',
  'high-sensitivity-troponin-t': 'High-sensitivity cardiac biomarker for rapid rule-out of acute myocardial infarction.',
  'troponin-i-cardiac': 'Cardiac-specific isoform of troponin I, the gold standard biomarker for myocardial infarction diagnosis.',
  'troponin-t-cardiac': 'Cardiac-specific isoform of troponin T, essential biomarker for acute coronary syndrome evaluation.',
  'free-psa': 'Unbound prostate-specific antigen fraction used to improve specificity of prostate cancer screening.',
  'cea-carcinoembryonic-antigen': 'Glycoprotein tumor marker elevated in colorectal cancer, used for monitoring treatment response and recurrence.',
  'afp-alpha-fetoprotein': 'Glycoprotein biomarker elevated in hepatocellular carcinoma and germ cell tumors, used for screening and monitoring.',
  'nt-probnp': 'Inactive precursor fragment of BNP, sensitive biomarker for heart failure diagnosis and prognosis.',
  'bnp-neprilysin-substrate': 'BNP as a substrate for neprilysin enzyme, relevant to sacubitril/valsartan heart failure therapy.',
  'disease-biomarkers': 'Collection of peptide biomarkers used across disease diagnosis, monitoring, and prognosis.',
  'abaloparatide': 'Synthetic analog of PTHrP(1-34) used for osteoporosis treatment, promotes bone formation via PTH1R activation.',
};

let fixed = 0;

for (const [slug, desc] of Object.entries(descriptions)) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content.replace(
    /description: "Comprehensive reference for [^"]*"/,
    `description: "${desc}"`
  );
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
}

console.log(`Fixed ${fixed} articles with proper descriptions`);
