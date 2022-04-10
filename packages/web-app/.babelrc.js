//@ts-ignore
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
    plugins: [
      '@emotion',
      // Applies the react-refresh Babel plugin on non-production modes only
      api.env('development') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
