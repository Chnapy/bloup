module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  };
};
