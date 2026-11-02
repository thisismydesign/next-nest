FROM node:24-alpine

WORKDIR /app

RUN corepack enable

ENTRYPOINT ["scripts/web-docker-entrypoint.sh"]
