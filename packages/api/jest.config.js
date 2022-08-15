const base = require('../../jest.config.base');

module.exports = Object.assign({}, base, {
  displayName: require('./package.json').name,

  // setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
});
