/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'node:path';
import fs from 'node:fs';
import glob from 'glob';

type Pkg = {
  name: string;
  workspaces?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const uniqueArray = <I>(arr: I[]) => [...new Set(arr)];

const rootPath = process.env.PROJECT_CWD ?? '';

const { workspaces = [] }: Pkg = require(path.resolve(
  rootPath,
  'package.json'
));

const tsPkgs = workspaces
  .flatMap((pattern) => glob.sync(pattern))
  .map((pt) => {
    const pkg: Pkg = require(path.resolve(pt, 'package.json'));

    const everyDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };

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
    const tsPkg = tsPkgs.find((tp) => tp.name === dep)!;

    return { path: path.relative(dir, tsPkg.dir) };
  });

  const tsConfigPath = path.resolve(dir, 'tsconfig.json');

  const existingTsConfig: {
    compilerOptions?: Record<string, unknown>;
    include?: string[];
  } = fs.existsSync(tsConfigPath) ? require(tsConfigPath) : {};

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
        include: uniqueArray(['src', ...(existingTsConfig.include ?? [])]),
        references,
      },
      null,
      2
    )
  );
});

fs.writeFileSync(
  path.resolve(rootPath, `tsconfig.json`),
  `/* This file is automatically generated by scripts/generators/tsconfig.js */\n${JSON.stringify(
    {
      extends: './tsconfig.base.json',
      compilerOptions: {
        noEmit: true,
        tsBuildInfoFile: './node_modules/.cache/.tsbuildinfo',
      },
      include: ['*.js'],
      references: [
        {
          path: 'scripts',
        },
        ...tsPkgs.map(({ dir }) => ({
          path: path.relative(rootPath, dir),
        })),
      ],
    },
    null,
    2
  )}`
);
