/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  projects: ['<rootDir>/packages/*'],

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  transform: {
    '\\.[jt]sx?$': require.resolve('./babel-jest-transformer.js'),
  },
};
