import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';

const appDirectory = realpathSync(process.cwd());

export const resolvePath = (...pathSegments: string[]): string =>
  resolve(appDirectory, ...pathSegments);
