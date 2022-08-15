const base = require('./jest.config.base');

/**
 * @see https://jestjs.io/docs/configuration
 *
 * @type {import('@jest/types').Config.InitialOptions}
 **/
module.exports = Object.assign({}, base, {
  clearMocks: true,

  projects: ['<rootDir>/packages/*'],

  testPathIgnorePatterns: [
    '/.yarn/',
    '/node_modules/',
    '/dist/',
    '/.next/',
    '/storybook-static/',
  ],

  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
});
