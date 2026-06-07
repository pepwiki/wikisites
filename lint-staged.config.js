export default {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.astro": ["prettier --write"],
  "*.{json,jsonc,md,yml,yaml}": ["prettier --write"],
};
