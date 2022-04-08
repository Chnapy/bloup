import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevelopmentServerConfiguration } from 'webpack-dev-server';

// import TerserPlugin from 'terser-webpack-plugin';

import { resolvePath } from './path';

import { rules } from './rules';
import { plugins } from './plugins';
import { devServer } from './dev-server';
import { isProduction, devtool } from './devtools';

type Configuration = {
  devServer?: WebpackDevelopmentServerConfiguration;
} & WebpackConfiguration;

const context = resolvePath();

const publicPath = process.env.PUBLIC_PATH || '/';

const extensions = [
  '*',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.css',
  '.scss',
  '.png',
  '.svg',
];

const alias = {
  //   '@babel/runtime': require.resolve('@babel/runtime'),
  'react-dom': require.resolve('react-dom'),
};

const config: Configuration = {
  resolve: { extensions, alias },
  mode: isProduction ? 'production' : 'development',
  target: isProduction ? 'browserslist' : 'web',
  entry: ['@babel/polyfill', resolvePath('src/index.tsx')],
  output: {
    filename: '[name].[contenthash].js',
    path: resolvePath('dist'),
    publicPath,
    chunkFilename: '[name].[id].[contenthash].js',
    clean: true,
  },
  module: { rules },
  plugins,
  devServer,
  devtool,
  context,
  optimization: {
    emitOnErrors: true,
    splitChunks: {
      chunks: 'all',
    },
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     extractComments: false,
    //     parallel: true,
    //     terserOptions: {
    //       // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //     },
    //   }),
    // ],
  },
  performance: {
    hints: false,
  },
};

export default config;
