import type { RuleSetRule } from 'webpack';

import {
  js,
  //   ts,
  scss,
  css,
  cssDependencies,
  fonts,
  images,
} from './rules';

export const rules: RuleSetRule[] = [
  js,
  //   ts,
  scss,
  css,
  cssDependencies,
  fonts,
  images,
];
