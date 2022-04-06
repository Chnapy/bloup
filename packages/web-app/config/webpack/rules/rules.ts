import { RuleSetRule } from 'webpack';

// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
  postcss,
  css as cssLoader,
  cssVendors,
  scss as scssLoader,
  resolveUrl,
  babel,
  //   typescript,
  file,
  style,
  image,
} from './loaders';

const exclude = /node_modules/;

const isProduction = process.env.NODE_ENV === 'production';

export const js: RuleSetRule = {
  test: /\.[jt]sx?$/,
  use: babel,
  exclude,
};

// export const ts: RuleSetRule = {
//   test: /.tsx?$/,
//   use: typescript,
//   exclude,
// };

export const scss: RuleSetRule = {
  test: /\.scss$/,
  use: isProduction
    ? [
        // MiniCssExtractPlugin.loader,
        cssLoader,
        postcss,
        resolveUrl,
        scssLoader,
      ]
    : [style, cssLoader, postcss, resolveUrl, scssLoader],
};

export const css: RuleSetRule = {
  test: /\.css$/,
  exclude,
  use: isProduction
    ? [
        // MiniCssExtractPlugin.loader,
        cssLoader,
        postcss,
      ]
    : [style, cssLoader, postcss],
};

export const cssDependencies: RuleSetRule = {
  test: /\.css$/,
  include: /node_modules/,
  use: isProduction
    ? [
        // MiniCssExtractPlugin.loader,
        cssVendors,
        postcss,
      ]
    : [style, cssVendors, postcss],
};

export const fonts: RuleSetRule = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  use: [file('fonts/')],
};

export const images: RuleSetRule = {
  test: /\.(gif|png|svg)$/i,
  use: [file('images/'), image],
};
