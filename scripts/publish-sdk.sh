#!/bin/bash
# Publish peptide-mw-calculator to GitHub + npm
# Run AFTER creating GitHub account and generating tokens
set -e

echo "=== Step 1: Create GitHub repo ==="
# Requires: gh auth login with the temporal account
gh repo create WyattAu/peptide-mw-calculator \
  --public \
  --description "Zero-dependency peptide molecular weight calculator. Calculate MW and molecular formula from amino acid sequences." \
  --source packages/sdk \
  --remote=github \
  --push

echo "=== Step 2: Add topics for discoverability ==="
gh repo edit WyattAu/peptide-mw-calculator \
  --add-topic peptide \
  --add-topic biochemistry \
  --add-topic molecular-weight \
  --add-topic calculator \
  --add-topic typescript \
  --add-topic npm

echo "=== Step 3: Publish to npm ==="
cd packages/sdk
npm publish --access public
cd ../..

echo "=== Done ==="
echo "GitHub: https://github.com/WyattAu/peptide-mw-calculator"
echo "npm: https://www.npmjs.com/package/@peptide-tools/mw-calculator"
