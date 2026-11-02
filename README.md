# next-nest
[![CI](https://github.com/thisismydesign/next-nest/actions/workflows/ci.yml/badge.svg)](https://github.com/thisismydesign/next-nest/actions/workflows/ci.yml)

Next.js + NestJS monolith: one server serves the REST and GraphQL API and the pages.

- Pages render on the server from typed GraphQL queries.
- Sessions are JWT cookies, signed in through Google or AWS Cognito.
- Postgres via TypeORM, with migrations and a seed command.
- Unit, request and browser specs; CI runs them all.

[Use this template](https://github.com/thisismydesign/next-nest/generate)

Background reading:
- [NestJS + React (Next.js) in One MVC Repo for Rapid Prototyping](https://medium.com/geekculture/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca)
- [Automagically Typed GraphQL Queries and Results](https://medium.com/geekculture/automagically-typed-graphql-queries-and-results-with-apollo-3731bad989aa)
- [OAuth2 in NestJS for Social Login](https://javascript.plainenglish.io/oauth2-in-nestjs-for-social-login-google-facebook-twitter-etc-8b405d570fd2)
- [Cognito via OAuth2 in NestJS](https://javascript.plainenglish.io/cognito-via-oauth2-in-nestjs-outsourcing-authentication-without-vendor-lock-in-ce908518f547)

## Stack

NestJS 12 (ESM), Next.js 16, React 19, TypeORM 1, Apollo Server 5, Passport, TypeScript 6, Vitest, Cypress, ESLint 10, pnpm, [mise](https://mise.jdx.dev/).

## Dev

```sh
mise install
cp .env.example .env
pnpm install
docker compose up -d db
pnpm build && pnpm typeorm migration:run && pnpm cli seed
pnpm start:dev
```

Then open http://localhost:3000. The landing page lists every route.

## Checks

```sh
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm e2e                                     # against a running app
docker run --rm -v "$PWD:/e2e" -w /e2e --network=host --entrypoint=cypress cypress/included:16.2.1 run   # without a local browser
```

## Deploy

`Dockerfile` builds a production image. Run migrations and the seed on release:

```sh
pnpm typeorm migration:run && pnpm cli seed
```

The app reads its configuration from the environment; see `.env.example`.
