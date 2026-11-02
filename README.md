# next-nest

#### Next.js + NestJS MVC monolith for rapid development with battle-tested standards.

- Build a web app using the most popular JavaScript backend and frontend frameworks.
- Get started in minutes with a unified codebase - no need to sync or deploy multiple services.
- Use typed DB data directly in React via GraphQL and SSR.
- End-to-end type safety from database to forms.
- When the time is right, you can easily split the frontend and backend into separate services.

[Use this template](https://github.com/thisismydesign/next-nest/generate)

Featured in:
- [Geek Culture: NestJS + React (Next.js) in One MVC Repo for Rapid Prototyping](https://medium.com/geekculture/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca)
- [Geek Culture: Automagically Typed GraphQL Queries and Results With Apollo](https://medium.com/geekculture/automagically-typed-graphql-queries-and-results-with-apollo-3731bad989aa)
- [JavaScript in Plain English: OAuth2 in NestJS for Social Login (Google, Facebook, Twitter, etc)](https://javascript.plainenglish.io/oauth2-in-nestjs-for-social-login-google-facebook-twitter-etc-8b405d570fd2)
- [JavaScript in Plain English: Cognito via OAuth2 in NestJS: Outsourcing Authentication Without Vendor Lock-in](https://javascript.plainenglish.io/cognito-via-oauth2-in-nestjs-outsourcing-authentication-without-vendor-lock-in-ce908518f547)

## Stack

It has
- Example REST and GraphQL modules, DB using TypeORM as seen on https://docs.nestjs.com/
- [Next.js](https://nextjs.org/) integration for React on the frontend ([howto article](https://csaba-apagyi.medium.com/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca))
- Typed queries & results with GraphQL out of the box ([howto article](https://csaba-apagyi.medium.com/automagically-typed-graphql-queries-and-results-with-apollo-3731bad989aa))
- Authentication via [Passport.js](http://www.passportjs.org/) including Social providers ([howto article](https://medium.com/csaba.apagyi/oauth2-in-nestjs-for-social-login-google-facebook-twitter-etc-8b405d570fd2)), [AWS Cognito](https://aws.amazon.com/cognito/) ([howto article](https://medium.com/csaba.apagyi/cognito-via-oauth2-in-nestjs-outsourcing-authentication-without-vendor-lock-in-ce908518f547)), and JWT strategy for REST and GraphQL
- Docker setup
- Typescript, ESLint
- CI via GitHub Actions
- Running tasks (e.g. DB seeding) via [nest-commander](https://nest-commander.jaymcdoniel.dev/)
- Background jobs on Postgres via [pg-boss](https://github.com/timgit/pg-boss), no Redis needed
- Unit and integration testing via Vitest, browser testing via Playwright
- Google Analytics 4

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
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e # in Google Chrome; starts the production build, or reuses a running app
```

## Deploy

`Dockerfile` builds a production image. Run migrations and the seed on release, inside the image:

```sh
node node_modules/typeorm/cli.js -d dist/data-source.js migration:run && node dist/cli seed
```

The app reads its configuration from the environment; see `.env.example`.
