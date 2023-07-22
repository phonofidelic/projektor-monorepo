FROM node:18-alpine AS base
RUN corepack enable
RUN pnpm config --global set store-dir /pnpm-store

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/api
RUN pnpm dlx prisma generate --schema=/app/apps/api/prisma/schema.prisma
WORKDIR /app
RUN npm install -g @nestjs/cli turbo
RUN turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
CMD [ "node", "apps/api/dist/main.js" ]