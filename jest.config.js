/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
   moduleFileExtensions: ['js', 'json', 'ts'],
   rootDir: 'src',
   testRegex: '\\.(test|spec)\\.ts$',
   transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
   },
   collectCoverageFrom: ['**/*.(t|j)s'],
   coveragePathIgnorePatterns: [
      "<rootDir>/main.ts",
   ],
   coverageDirectory: '../coverage',
   testEnvironment: 'node',
   coverageReporters: ['json-summary', 'text', 'lcov'],
};
