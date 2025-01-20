# next-nest
[![CI](https://github.com/thisismydesign/next-nest/actions/workflows/ci.yml/badge.svg)](https://github.com/thisismydesign/next-nest/actions/workflows/ci.yml)

#### Next.js + NestJS MVC monolith for rapid development with battle-tested standards.

- Build a web app using the most popular JavaScript backend and frontend frameworks.
- Get started in minutes with a unified codebase - no need to sync or deploy multiple services.
- Use typed DB data directly in React via GraphQL and SSR.
- End-to-end type safety from database to forms.
- When the time is right, you can easily split the frontend and backend into separate services.

[Use this template](https://github.com/thisismydesign/next-nest/generate)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

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
- Running tasks (e.g. DB seeding) via [nestjs-console](https://github.com/Pop-Code/nestjs-console)
- Unit and integration testing via Jest
- Heroku deployment setup
- Google Analytics 4

## Usage

### Dev

```sh
cp .env.example .env

docker compose up

docker compose exec web yarn lint
docker compose exec web yarn test
docker compose exec web yarn test:request
docker compose exec web yarn build
docker run -it -v $PWD:/e2e -w /e2e --network="host" --entrypoint=cypress cypress/included:12.2.0 run
```

## Functionality

REST endpoint via Nest
- http://localhost:3000/

JWT-protected REST endpoint via Nest
- http://localhost:3000/private

GraphQL playground (`query WhoAmI` is JWT-protected)
- http://localhost:3000/graphql
```qgl
query Public {
  things {
    id
    name
  }

  users {
    id
    provider
  }
}

# Add Header: { "Authorization": "Bearer <token>" }
query Private {
  whoAmI {
    id,
    provider,
    providerId,
    username,
    name
  }

  orders {
    id

    alias
    thing {
      name
    }
  }
}

mutation createOrder {
  createOrder(alias: "myname", thingName: "this is a thing you can order") {
    id
    alias
  }
}
```

Cognito auth (redirects to hosted Cognito UI)
- http://localhost:3000/auth/cognito

Google auth
- http://localhost:3000/auth/google

Next.js page
- http://localhost:3000/home

JWT-protected Next.js page
- http://localhost:3000/profile
