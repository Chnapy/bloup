import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import glob from 'glob';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * package.json partial type.
 * @typedef {Object} Pkg
 * @property {string|undefined} name
 * @property {string[]|undefined} workspaces
 * @property {Object<string,string>|undefined} dependencies
 * @property {Object<string,string>|undefined} devDependencies
 * @property {Object<string,string>|undefined} peerDependencies
 */

/**
 * @param {I[]} arr
 * @template I
 */
const uniqueArray = (arr) => Array.from(new Set(arr));

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../'
);

/**
 * @type {Pkg}
 */
const { workspaces = [] } = require(path.resolve(root, 'package.json'));

const tsPkgs = workspaces
  .flatMap((pattern) => glob.sync(pattern))
  .map((pt) => {
    /**
     * @type {Pkg}
     */
    const pkg = require(path.resolve(pt, 'package.json'));

    const everyDeps = Object.assign(
      {},
      pkg.dependencies,
      pkg.devDependencies,
      pkg.peerDependencies
    );

    const deps = uniqueArray(
      Object.keys(everyDeps).filter((dep) =>
        everyDeps[dep].startsWith('workspace:')
      )
    );

    return {
      name: pkg.name,
      dir: path.resolve(pt),
      relative: `./${path.join(pt)}`,
      deps,
    };
  });

tsPkgs.forEach(({ dir, deps }) => {
  const references = deps.map((dep) => {
    const tsPkg = tsPkgs.find((tp) => tp.name === dep);

    // @ts-ignore
    return { path: path.relative(dir, tsPkg.dir) };
  });

  const tsConfigPath = path.resolve(dir, 'tsconfig.json');

  /**
   * @type {{
   *   compilerOptions?: Object;
   *   include?: string[];
   * }}
   */
  const existingTsConfig = fs.existsSync(tsConfigPath)
    ? require(tsConfigPath)
    : {};

  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify(
      {
        ...existingTsConfig,
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          ...existingTsConfig.compilerOptions,
          rootDir: './src',
          outDir: './node_modules/.cache/dist',
          tsBuildInfoFile: './node_modules/.cache/.tsbuildinfo',
        },
        include: uniqueArray([
          './src/**/*',
          ...(existingTsConfig.include ?? []),
        ]),
        references,
      },
      null,
      2
    )
  );
});

fs.writeFileSync(
  path.resolve(root, `tsconfig.json`),
  `/* This file is automatically generated by scripts/generators/tsconfig.js */\n${JSON.stringify(
    {
      extends: './tsconfig.base.json',
      // include: tsPkgs
      //   .map(({ relative }) => `${relative}/src/**/*.ts`)
      //   .concat(['scripts/**/*.js']),
      // compilerOptions: {
      //   paths: Object.fromEntries(
      //     tsPkgs.map(({ name, relative }) => [name, [`${relative}/src`]])
      //   ),
      // },
      compilerOptions: {
        noEmit: true,
        tsBuildInfoFile: './node_modules/.cache/.tsbuildinfo',
      },
      include: ['*.js', 'scripts/**/*.js'],
      references: tsPkgs.map(({ dir }) => ({
        path: path.relative(root, dir),
      })),
    },
    null,
    2
  )}`
);
