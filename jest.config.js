/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    '<rootDir>/server/',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx, ts, tsx}',
    '!**/node_modules/**',
    '!**/*.test.js',
    '!**/coverage/**',
    '!**/serviceWorker.js',
    '!**/index.js',
  ],
};
