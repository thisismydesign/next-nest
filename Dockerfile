FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
RUN pnpm build && pnpm prune --prod && rm -rf src/client/.next/cache

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules node_modules
COPY --from=build --chown=node:node /app/dist dist
COPY --from=build --chown=node:node /app/src/client/.next src/client/.next
COPY --from=build --chown=node:node /app/src/client/next.config.mjs src/client/
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
