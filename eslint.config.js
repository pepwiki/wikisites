import globals from "globals";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/.wrangler/**",
      "**/.lighthouseci/**",
      "**/.astro/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      solid,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...solid.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "solid/reactivity": "warn",
      "solid/no-react-specific-props": "warn",
      "solid/no-destructure": "warn",
      "solid/jsx-no-duplicate-props": "error",
      "solid/no-unknown-namespaces": "off",
    },
  },
);
