FROM node:24-alpine

WORKDIR /app

ENTRYPOINT ["scripts/web-docker-entrypoint.sh"]
