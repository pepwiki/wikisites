#!/bin/bash
# Mirror wikisites to GitHub
# Run AFTER creating GitHub account
set -e

echo "=== Creating GitHub repo ==="
gh repo create pepwiki/wikisites \
  --public \
  --description "Wikipept + Encyclopeptide — peptide science wiki and encyclopedia. VS Code for content." \
  --source . \
  --remote=github \
  --push

echo "=== Adding topics ==="
gh repo edit pepwiki/wikisites \
  --add-topic peptide \
  --add-topic wiki \
  --add-topic encyclopedia \
  --add-topic astro \
  --add-topic solidjs \
  --add-topic education

echo "=== Push all branches ==="
git push github main

echo "=== Done ==="
echo "GitHub: https://github.com/pepwiki/wikisites"
