import {
  LoaderOptionsPlugin,
  WebpackPluginInstance,
  HotModuleReplacementPlugin,
} from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { html } from './html';
import { isProduction, isDevelopment } from './devtools';

process.env.PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

export const plugins: WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    templateContent: html(),
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: false,
      minifyJS: true,
      minifyCSS: true,
    },
  }),
  //   new MiniCssExtractPlugin({
  //     filename: '[name].[contenthash].css',
  //     chunkFilename: '[id].[contenthash].css',
  //   }) as unknown as WebpackPluginInstance,
  new LoaderOptionsPlugin({
    minimize: isProduction,
    debug: !isProduction,
  }),
  // isDevelopment && new HotModuleReplacementPlugin(),
  isDevelopment && new ReactRefreshWebpackPlugin(),
  // TODO copy public folder on build
].filter(Boolean) as WebpackPluginInstance[];
