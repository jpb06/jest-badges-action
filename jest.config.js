/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  logHeapUsage: true,
  transform: {
    '^.+\\.ts$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'] }],
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    "<rootDir>/main.ts",
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
