/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    // tsconfig.json has isolatedModules, so ts-jest transpiles each file without
    // type-checking; `yarn typecheck` covers __tests__. That mode also accepts
    // verbatimModuleSyntax (full type-check mode rejects it with TS1295 because
    // ts-jest emits CommonJS). rootDir: allowJs makes ts-jest set an outDir,
    // and TS 6 then requires an explicit rootDir (TS5011).
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { rootDir: __dirname } }],
  },
  moduleNameMapper: {
    "@stories/(.*)": "<rootDir>/src/stories/$1",
    "@utilities/(.*)": "<rootDir>/src/utilities/$1",
    "@styles/(.*)": "<rootDir>/src/styles/$1",
    "@svgs/(.*)": "<rootDir>/src/assets/svgs/$1",
    "@hooks/(.*)": "<rootDir>/src/hooks/$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  // Measure all of src, not just files some test happens to import.
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/index.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
