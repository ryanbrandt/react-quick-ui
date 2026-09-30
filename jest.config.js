module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      // ts-jest 27 emits CommonJS, which verbatimModuleSyntax rejects (TS1295).
      // Revisit in Q4 (Jest 30 / ts-jest 29).
      tsconfig: { verbatimModuleSyntax: false },
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@stories/(.*)": "<rootDir>/src/stories/$1",
    "@utilities/(.*)": "<rootDir>/src/utilities/$1",
    "@svgs/(.*)": "<rootDir>/src/assets/svgs/$1",
    "@hooks/(.*)": "<rootDir>/src/hooks/$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  coveragePathIgnorePatterns: ["node_modules"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
