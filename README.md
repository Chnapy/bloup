

# Bloup

This is a sandbox repo to try some techs and ways of doing
- NestJS with mongoDB, TypeORM and GraphQL - all linked and automatized as much as possible
- Strong linking between frontend<->backend using GraphQL
- GraphQL strong tooling (editor validation, editor operations, editor lint, code generation, api playground)
- Yarn 3 monorepo
- Yarn Zero-installs
- CI cover and optimization
- Docker dev environment (including Windows)

[Nx framework](https://nx.dev/) was also tried. Powerful but quite restrictive and not compatible with Yarn 2+.

## Dev environment

This repo is made to be used with [VSCode Remote-Containers](https://code.visualstudio.com/docs/remote/containers) which setup a Docker container with a fully controlled dev environment (including database and VSCode itself, all in a Linux distro).

### Dev in Windows OS

On Windows it is recommended to use [Windows WSL with Docker](https://docs.docker.com/desktop/windows/wsl/#develop-with-docker-and-wsl-2) which allow to work on an optimized Linux VM. Using VSCode Remote-Containers with them gives the best dev experience in this OS.

## Zero-installs principe

For stability & speed concerns, this repo follows the ["Zero Installs" principe proposed by Yarn](https://yarnpkg.com/features/zero-installs).

It is why dependencies are versionned ([.yarn/cache](.yarn/cache)).
So in theory there is no need to do any `yarn install` anymore.
