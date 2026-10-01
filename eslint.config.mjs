// @ts-check
// `.mjs` because the package is CommonJS (no "type": "module"): jest.config.js
// relies on `module.exports`, like rollup.config.mjs does.
import { createRequire } from "node:module";

import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// eslint-plugin-react doesn't support ESLint 10 yet. Its `version: "detect"`
// calls an API ESLint 10 removed, so pass the installed React version
// ourselves. `react/jsx-filename-extension` and `react/forward-ref-uses-ref`
// hit removed APIs too; keep them off until the plugin supports ESLint 10.
const reactVersion = createRequire(import.meta.url)(
  "react/package.json"
).version;

// tsconfig "paths" aliases, grouped after packages by import-x/order.
const aliases = ["@utilities", "@hooks", "@stories", "@svgs", "@styles"];

// Type-aware rules, for the files tsconfig.json includes.
const typeChecked = {
  extends: [tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
};

export default defineConfig(
  globalIgnores([
    "dist/",
    "coverage/",
    "storybook-static/",
    ".yarn/",
    "test-results/",
    "playwright-report/",
  ]),

  // Base rule sets for every linted file.
  js.configs.recommended,
  tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()],
    },
    rules: {
      // TypeScript already checks default imports.
      "import-x/default": "off",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-extraneous-dependencies": [
        "error",
        { devDependencies: true },
      ],
      // Packages first, then our own aliased modules.
      "import-x/order": [
        "error",
        {
          pathGroups: aliases.map((alias) => ({
            pattern: `${alias}/**`,
            group: "external",
            position: "after",
          })),
        },
      ],
      "func-names": ["error", "never"],
      "prefer-const": "error",
    },
  },

  // Tooling files (jest, rollup, eslint configs) run in Node.
  {
    files: ["*.config.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["*.config.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },

  // Storybook config.
  { files: [".storybook/**/*.{ts,tsx}"], ...typeChecked },

  // Playwright suite (runs in Node, drives the built Storybook).
  {
    files: ["e2e/**/*.ts", "playwright.config.ts"],
    ...typeChecked,
    languageOptions: { ...typeChecked.languageOptions, globals: globals.node },
  },

  // Library source and tests: browser, React, type-aware rules.
  {
    files: ["src/**/*.{ts,tsx}", "__tests__/**/*.{ts,tsx}", "jest.setup.ts"],
    extends: [
      ...typeChecked.extends,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      jsxA11y.configs.recommended,
    ],
    languageOptions: {
      ...typeChecked.languageOptions,
      globals: globals.browser,
    },
    settings: {
      react: { version: reactVersion },
    },
    rules: {
      // Components are arrow functions.
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-max-depth": ["error", { max: 3 }],
      // An error, not a warning, so it can't hide under --max-warnings.
      "react-hooks/exhaustive-deps": "error",
      "react/no-unused-prop-types": "error",
      // Function components only (replaces react-prefer-function-component).
      "no-restricted-syntax": [
        "error",
        {
          selector: "ClassDeclaration[superClass]",
          message: "Use a function component instead of a class.",
        },
      ],
      // Types replace prop-types.
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      // Import through the tsconfig aliases instead of relative paths
      // (replaces eslint-plugin-no-relative-import-paths).
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^\\.{1,2}/",
              message: `Use an alias (${aliases.join(", ")}) instead of a relative import.`,
            },
          ],
        },
      ],
    },
  },

  // Storybook's CSF and main.ts rules (stories and .storybook/main.ts).
  storybook.configs["flat/recommended"],

  // Known a11y debt: the Modal backdrop and panel are clickable divs with no
  // keyboard support (Escape to close). Changing them changes the published
  // markup, so fix it in L2 (Dialog), then drop this block and lower
  // `--max-warnings` in package.json.
  {
    files: ["src/stories/Modal/Modal.tsx"],
    rules: {
      "jsx-a11y-x/click-events-have-key-events": "warn",
      "jsx-a11y-x/no-static-element-interactions": "warn",
    },
  },

  // Turns off rules that conflict with Prettier; keep it after the rule sets.
  prettier,

  // eslint-config-prettier disables `curly`, but "multi-line" is compatible
  // with Prettier, so re-enable it.
  { rules: { curly: ["error", "multi-line"] } }
);
