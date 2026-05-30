FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /app

FROM base AS build
ENV NODE_ENV=production
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Schlankes Runtime-Image: Nitros .output ist standalone (eigene node_modules),
# daher werden weder Quellcode noch das Wurzel-node_modules benötigt.
FROM node:24-slim AS runtime
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY --from=build /app/.output ./.output

# Als non-root laufen (der node-User existiert im Base-Image).
USER node

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
