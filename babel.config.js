module.exports = (
  /**
   * @type {{
   *   cache: { using: (arg: () => unknown) => void; };
   * }}
   **/
  api
) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    babelrcRoots: ['packages/*'],
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
    ],
  };
};
