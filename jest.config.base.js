/**
 * @see https://jestjs.io/docs/configuration
 *
 * @type {import('@jest/types').Config.InitialOptions}
 **/
module.exports = {
  transform: {
    '\\.[jt]sx?$': require.resolve('./babel-jest-transformer.js'),
  },

  moduleNameMapper: Object.assign({
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': require.resolve('identity-obj-proxy'),
  }),
};
