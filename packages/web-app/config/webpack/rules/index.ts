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

const rules: RuleSetRule[] = [
  js,
  //   ts,
  scss,
  css,
  cssDependencies,
  fonts,
  images,
];

export default rules;
