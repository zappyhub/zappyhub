import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for an Express + TypeScript API.
 *
 * @type {import("eslint").Linter.Config}
 */
export const expressApiConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      // boas práticas para API
      "no-console": "off", // você usa pino, mas pode manter console em dev
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": "off", // desabilita regra base
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
]
