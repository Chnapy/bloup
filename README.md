# Bloup

[![Open in Remote - Containers](https://img.shields.io/static/v1?label=Remote%20-%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/Chnapy/bloup)

This is a sandbox repo to try some techs and ways of doing

- NestJS with mongoDB, TypeORM and GraphQL - all linked and automatized as much as possible
- React 18
- Strong linking between frontend<->backend using GraphQL
- GraphQL strong tooling (editor validation, editor operations, editor lint, code generation, api playground)
- Yarn 3 monorepo
- Yarn Zero-installs
- CI cover and optimization
- CD optimization using Docker
- Docker dev environment (including Windows)

[Nx framework](https://nx.dev/) was also tried. Powerful but quite restrictive and not compatible with Yarn 2+.

## Dev environment

This repo is made to be used with [VSCode Remote-Containers](https://code.visualstudio.com/docs/remote/containers) which setup a Docker container with a fully controlled dev environment (including database and VSCode itself, all in a Linux distro).

### Dev in Windows OS

On Windows it is recommended to use [Windows WSL with Docker](https://docs.docker.com/desktop/windows/wsl/#develop-with-docker-and-wsl-2) which allow to work on an optimized Linux VM. Using VSCode Remote-Containers with them gives the best dev experience in this OS.

## Monorepo architecture

This repo follows a monorepo architecture using Yarn 3 with its [workspace feature](https://yarnpkg.com/features/workspaces).

- Every packages are in `packages` folder.
- Tooling is shared between every packages, and can be used globally on the whole repo.
- Each package is independent, but same dependencies should use the same version for consistency reasons.

### Run yarn command on specific package

To target a specific package simply use `yarn workspace <pkg_name>`:

- `yarn workspace web-app add -D typescript`
- `yarn workspace web-app c:lint`
- `yarn workspace web-app c:test`

Note that [shared scripts](https://yarnpkg.com/getting-started/qa/#how-to-share-scripts-between-workspaces) should contains `:` in there names.

## Generators & formatters

Some tools are used to ensure files format and generated content.
You can use them with these yarn commands:

- `gen:tsconfig` - Generate all the `tsconfig.json` files with default values and packages references.
  You should run it after add/remove a package.
- `c:pkg:fix` - Format every `package.json` files and fix as possible dependencies versions to avoid multiple versions for a single one.
- `c:lint` - ESLint in fix mode
- `c:format` - Prettier in fix mode

## Zero-installs principe

For stability & speed concerns, this repo follows the ["Zero Installs" principe proposed by Yarn](https://yarnpkg.com/features/zero-installs).

It is why dependencies are versionned ([.yarn/cache](.yarn/cache)).
So in theory there is no need to do any `yarn install` anymore.

## CI

Github Actions CI runs these jobs to ensure as possible PR quality:

- check packages versions and possible duplicates
- check lint
- check tests
- check TS typing

All these jobs are done on the whole repo for processing time reason.
Github Actions free offer may be limited for big projects, running one check on all the code instead of a check on each package takes way less time to run.
