# ### FROM ROOT ###

# FROM node:18-alpine AS base

# RUN corepack enable
# VOLUME [ "/pnpm-store", "/app/node_modules" ]
# RUN pnpm config --global set store-dir /pnpm-store

# FROM base AS builder
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# RUN npm install -g turbo
# COPY . .
# RUN turbo prune --scope=api --docker

# FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app
# COPY .gitignore .gitignore
# # COPY --from=builder /app .
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# # COPY --from=builder /app/out/full/turbo.json /app/turbo.json
# # COPY --from=builder /app/out/full/apps/api/tsconfig.json /app/apps/api/tsconfig.json
# # COPY --from=builder /app/out/full/apps/api/tsconfig.build.json /app/apps/api/tsconfig.build.json
# # COPY --from=builder /app/out/full/apps/api/prisma/schema.prisma /app/apps/api/prisma/schema.prisma
# # COPY --from=builder /app/out/full/apps/api/src /app/apps/api/src
# COPY --from=builder /app/out/full/ .
# RUN pnpm install

# # WORKDIR /app/apps/api
# RUN pnpm dlx prisma generate --schema=/app/apps/api/prisma/schema.prisma --filter=api

# # WORKDIR /app
# # COPY --from=builder ./app . 
# Run ls -a /app/node_modules
# RUN ls -a /app/apps/api/node_modules

# RUN pnpm dlx turbo run build --filter=api

# # WORKDIR /app/apps/api
# # RUN pnpm build
# RUN ls -a /app/apps/api/dist


# FROM base AS runner
# WORKDIR /app
# # COPY --chown=node:node --from=installer /app .
# # COPY --from=installer /app .
# # COPY --chown=node:node --from=builder /app/apps/api/tsconfig.json /app/apps/api/tsconfig.json
# # COPY --chown=node:node --from=builder /app/apps/api/tsconfig.build.json /app/apps/api/tsconfig.build.json
# # COPY --chown=node:node --from=installer /app/apps/api/node_modules ./apps/api/node_modules
# COPY --from=installer /app/turbo.json /app/turbo.json
# COPY --from=installer /app/node_modules /app/node_modules
# COPY --from=installer /app/package.json /app/package.json
# COPY --from=installer /app/apps/api /app/apps/api
# COPY --from=installer /app/apps/api/prisma /app/apps/api/prisma
# COPY --from=installer /app/apps/api/package.json /app/apps/api/package.json
# RUN ls -a /app/apps/api/node_modules
# EXPOSE ${PORT}
# CMD [ "node", "apps/api/dist/main.js" ]
# # WORKDIR /app/apps/api
# # CMD [ "pnpm", "start" ]


########################
## FROM apps/api
#######################
FROM node:18-alpine AS base

RUN corepack enable
VOLUME [ "/pnpm-store", "/app/node_modules", "/app/apps/api/node_modules" ]
RUN pnpm config --global set store-dir /pnpm-store

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
WORKDIR /app/apps/api
RUN pnpm dlx prisma generate --schema=/app/apps/api/prisma/schema.prisma
WORKDIR /app
RUN pnpm dlx turbo run build --filter=api
# RUN pnpm dlx @nestjs/cli build

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
CMD [ "node", "apps/api/dist/main.js" ]