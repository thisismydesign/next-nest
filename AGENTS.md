# next-nest

Next.js + NestJS monolith template.

## Docs

- `README.md` — for humans.
- `AGENTS.md` — how to work here.

## Layout

```
src/server/main.ts       NestJS entry; ServerModule = AppModule (API) + ViewModule (serves Next.js)
src/server/app/          REST under /api, GraphQL resolvers, TypeORM entities, auth (JWT cookie, Google, Cognito)
src/server/commands/     nest-commander commands, e.g. seed; src/server/cli.ts runs them
src/server/migration/    TypeORM migrations; src/server/data-source.ts is the CLI data source
src/client/              Next.js pages router; lib/zeus is generated from src/schema.gql
src/schema.gql           GraphQL schema, written by Nest on app start
test/                    request specs, factories, test app and database helpers
cypress/                 browser specs
```

## Commands

```bash
mise install && cp .env.example .env && pnpm install
docker compose up -d db                        # Postgres on localhost:5433, with a `test` DB
pnpm build                                     # migrations and commands run from dist
pnpm typeorm migration:run && pnpm cli seed
pnpm start:dev                                 # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test
pnpm e2e                                       # browser specs against the running app
docker run --rm -v "$PWD:/e2e" -w /e2e --network=host --entrypoint=cypress cypress/included:16.2.1 run  # same, without a local browser
pnpm typeorm migration:generate src/server/migration/<Name>
pnpm graphql:types                             # after resolver changes, once tests or the app rewrote src/schema.gql
```

## Rules

- Code MUST explain itself; comments SHOULD NOT be needed. Comments and docs MAY record a reason the code cannot show and MUST NOT explain how it works.
- All prose — comments, docs, messages — MUST stay terse; prescriptions use RFC 2119.
