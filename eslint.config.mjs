// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "public",
      "src/**/*.test.ts",
      "src/**/*.spec.ts",
      "pnp.cjs",
      ".yarn",
      ".vscode",
      ".idea",
      ".DS_Store",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "eslint.config.mjs",
      ".pnp.*"
    ],
  }
);
