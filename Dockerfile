FROM node:18-alpine

RUN apk add --no-cache \
    bash \
    dumb-init

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
RUN chown node:node /app

USER node

COPY --chown=node:node package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

RUN pnpm install --no-frozen-lockfile

COPY --chown=node:node . .

ARG APP

WORKDIR /app/apps/${APP}

RUN pnpm install --no-frozen-lockfile

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["pnpm", "start"]