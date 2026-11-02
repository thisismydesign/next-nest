FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . /app
COPY .env.example /app/.env

RUN pnpm build

CMD ["pnpm", "start:prod"]
