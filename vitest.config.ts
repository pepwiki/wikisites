import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin({ dev: true })],
  test: {
    globals: true,
    environment: "node",
    include: [
      "packages/*/src/__tests__/**/*.test.{ts,tsx}",
      "packages/*/src/lib/__tests__/**/*.test.{ts,tsx}",
    ],
    exclude: ["**/node_modules/**", "**/dist/**"],
    testTimeout: 10_000,
    hookTimeout: 10_000,
    passWithNoTests: false,
    reporters: ["verbose"],
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.ts"],
      exclude: [
        "**/__tests__/**",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/node_modules/**",
        "**/dist/**",
      ],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
