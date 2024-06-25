# KV-Redirect
#### a minimalistic redirection tool based on a redis compatible KV-Store

## Work in progress
- actions to release bun and node files arent configured yet
- image is not released on docker hub yet

## Usecases
- Backend for a URL-Shortner
- As a migration/fallback tool when moving websites
- As an endpoint for perma-urls

## Environment Variables
- KV_URL - The KV Connection URL
- PORT - The port to listen on
- PARAM_MODE - Changes from where the parameter is read
- BASE_DOMAIN - Basedomain (only needed if subdomain mode is used)
- INITIAL_SEEDING - If set to true, the seeds.json file in the root directory will be seeded upon startup.

## Parameter Modes
- `path` uses the slug after the `/` as redirection key
- `subdomain` uses the subdomain (before `BASE_DOMAIN`) as redirection key (needs `BASE_DOMAIN` variable)

## Defaults
- If no KV_URL is given, `redis://localhost:6379` will be used
- If no PORT is given, `3000` will be used
- If no PARAM_MODE is given, `path` will be used

## How to use
- Add KV_URL=#YourReddisConnectionString# to your environment variables

### If you are using a compiled version

Just start it after adding the environment variable.

**Supported**:
- node
- bun
- docker

### If you are using the source code (requires bun)
- bun i - to install all project dependencies
- bun ball - to b(uild)all targets
- bun start - to start
- bun dev - to start while watching
###### Docker and Docker-Compose files are preconfigured, Docker-Compose uses [dragonfly](https://github.com/dragonflydb/dragonfly) as KV-Store

### Under the hood
- Webserver from `hono`
- Redis compatible client from `@redis/client`
#### For seeding interface
- Fancy CLI spinners from `ora`
- Fancy Console from `consola`
