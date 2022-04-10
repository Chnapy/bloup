import type { RuleSetRule } from 'webpack';
import { isDevelopment } from '../devtools';

export const postcss: RuleSetRule = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
};

export const css: RuleSetRule = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 2,
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  },
};

export const cssVendors: RuleSetRule = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
};

export const scss: RuleSetRule = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

export const resolveUrl: RuleSetRule = {
  loader: 'resolve-url-loader',
};

export const babel: RuleSetRule = {
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
    rootMode: 'upward',
    // plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(
    //   Boolean
    // ),
  },
};

export const file = (path: string): RuleSetRule => ({
  loader: 'file-loader',
  options: {
    name: '[name]_[hash].[ext]',
    outputPath: path,
  },
});

export const style: RuleSetRule = {
  loader: 'style-loader',
};

export const image: RuleSetRule = {
  loader: 'image-webpack-loader',
  options: {
    mozjpeg: {
      progressive: true,
      quality: 65,
    },
    optipng: {
      enabled: true,
    },
    pngquant: {
      quality: [0.65, 0.9],
      speed: 4,
    },
    gifsicle: {
      enabled: false,
      interlaced: false,
    },
  },
};
