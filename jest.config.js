module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
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
