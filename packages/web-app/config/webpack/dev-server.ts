import type { Configuration } from 'webpack-dev-server';

import { resolvePath } from './path';

export const devServer: Configuration = {
  port: 8000,
  hot: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  static: {
    directory: resolvePath('public'),
  },
};
