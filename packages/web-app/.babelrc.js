module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      // Enable development transform of React with new automatic runtime
      [
        '@babel/preset-react',
        { development: api.env('development'), runtime: 'automatic' },
      ],
    ],
    plugins: ['@emotion'],
  };
};
