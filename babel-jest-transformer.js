const babelJest = require('babel-jest').default;

if (!babelJest.createTransformer) {
  throw new Error('babelJest.createTransformer is undefined');
}

module.exports = babelJest.createTransformer({
  rootMode: 'upward',
});
