# next-nest

Next.js + NestJS MVC monolith template.

## Docs

- `README.md` — for humans.
- `AGENTS.md` — how to work here.

## Layout

```
src/server/main.ts       NestJS entry; ServerModule = AppModule (API) + ViewModule (serves Next.js)
src/server/app/          REST controller, GraphQL resolvers, TypeORM entities, auth (JWT, Google, Cognito)
src/server/migration/    TypeORM migrations
src/server/console/      nestjs-console tasks, e.g. seed
src/client/              Next.js app; pages/, app/types/zeus is generated from src/schema.gql
src/schema.gql           GraphQL schema, written by Nest on app start
test/                    supertest request specs and fishery factories
cypress/                 browser specs
scripts/                 Docker entrypoints
```

## Commands

```bash
mise install && cp .env.example .env && yarn install
docker compose up -d db                        # Postgres on localhost:5433, with a `test` DB
yarn typeorm migration:run && yarn console seed
yarn start:dev                                 # http://localhost:3000
yarn lint && yarn test && yarn test:request && yarn build
docker run --rm -v "$PWD:/e2e" -w /e2e --network=host --entrypoint=cypress cypress/included:12.2.0 run  # browser specs against the running app
yarn typeorm migration:generate src/server/migration/<Name>
yarn client:generate:schema                    # after resolver changes, once the app has rewritten src/schema.gql
```

## Rules

- MUST NOT read `.env`; document new vars in `.env.example`.
- Development and tests MUST use the local DB; tests use `.env.test` and drop its schema.
- MUST NOT deploy without instruction.
- Schema changes MUST be new migration files.
- GraphQL changes MUST regenerate `src/client/app/types`.
- Code MUST explain itself; comments SHOULD NOT be needed. Comments and docs MAY record a reason the code cannot show and MUST NOT explain how it works.
- All prose — comments, docs, messages — MUST stay terse; prescriptions use RFC 2119.
