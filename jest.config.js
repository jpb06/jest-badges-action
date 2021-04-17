module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname",
   ],
   coveragePathIgnorePatterns: [
      ".d.ts", ".js",
      "<rootDir>/src/main.ts",
      "<rootDir>/src/tests-related/",
      "<rootDir>/src/types/",
   ],
   collectCoverageFrom: ["src/**/*.ts"],
   coverageReporters: ["json-summary", "text", "lcov"],
};