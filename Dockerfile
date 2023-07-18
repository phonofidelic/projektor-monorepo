# FROM node:18-alpine AS base
# # FROM node:20-slim AS base
# RUN corepack enable
# VOLUME [ "/pnpm-store", "/app/node_modules" ]
# RUN pnpm config --global set store-dir /pnpm-store

# FROM base AS builder
# # RUN apk add --no-cache libc6-compat
# # RUN apk update

# # Set working directory
# WORKDIR /app
# # RUN npm install -g npm@latest
# # RUN npm install -g pnpm
# # RUN pnpm setup
# RUN npm install -g turbo
# COPY . .
# RUN turbo prune --scope=api --docker

# # Add lockfile and package.json's of isolated subworkspace
# FROM base AS installer
# # RUN apk add --no-cache libc6-compat
# # RUN apk update
# WORKDIR /app

# # First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# RUN pnpm install --filter=api


# # Build the project
# # COPY --from=builder /app/out/full/ .
# COPY --from=builder /app/out/full/turbo.json ./turbo.json
# COPY --from=builder /app/out/full/apps/api/tsconfig.json ./apps/api/tsconfig.json
# COPY --from=builder /app/out/full/apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json
# COPY --from=builder /app/out/full/apps/api/package.json ./package.json
# RUN npm install -g @nestjs/cli
# # RUN pnpm build
# RUN npm install -g turbo
# RUN turbo run build --filter=api --include-dependencies

# COPY --from=builder /app/out/full/apps/api/dist ./dist
# COPY --from=builder /app/out/full/apps/api/dist/main.js ./dist/main.js
# COPY --from=builder /app/node_modules .

# FROM base AS runner
# WORKDIR /app
# COPY --from=installer /app .
# COPY --from=installer /app/node_modules ./node_modules

# # CMD ["pnpm install --filter=api", "&&", "node", "./dist/main.js"]
# # CMD pnpm --dir ./apps/api run start
# # CMD node dist/main.js
# # CMD ["pnpm", "dlx", "turbo", "run", "start:prod", "--filter=api"]
# CMD [ "node", "dist/main.js" ]


#################################

# FROM node:18-alpine AS base

# RUN corepack enable
# VOLUME [ "/pnpm-store", "/app/node_modules" ]
# RUN pnpm config --global set store-dir /pnpm-store

# FROM base AS builder
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# RUN npm install -g turbo
# COPY --chown=node:node . .
# RUN turbo prune --scope=api --docker

# RUN rm -rf /app/out/full/*/*/node_modules

# FROM base AS installer
# WORKDIR /app
# COPY --chown=node:node --from=builder /app/out/json/ .
# COPY --chown=node:node --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --chown=node:node --from=builder /app/out/full/turbo.json ./turbo.json
# RUN pnpm install

# COPY --chown=node:node --from=builder /app/apps/api/prisma /app/apps/api/prisma
# # RUN npm install -g prisma
# # # RUN prisma generate --schema /app/apps/api/prisma/schema.prisma
# # RUN cd /app/apps/api && prisma generate --schema ./prisma/schema.prisma

# FROM base AS sourcer
# WORKDIR /app
# COPY --chown=node:node --from=installer /app/ .
# COPY --chown=node:node --from=builder /app/out/full/ .
# COPY --chown=node:node --from=installer /app/apps/api/node_modules /app/apps/api/node_modules
# COPY --chown=node:node --from=installer /app/node_modules /app/node_modules
# COPY --chown=node:node --from=installer /app/node_modules /app/apps/api/node_modules
# COPY --chown=node:node .gitignore .gitignore
# RUN npm install -g @nestjs/cli prisma turbo

# COPY --chown=node:node --from=installer /app/package.json /app/apps/api/package.json
# RUN pnpm install --filter=api

# RUN cd /app/apps/api && prisma generate --schema ./prisma/schema.prisma

# RUN turbo run build --scope=api
# # WORKDIR /app/apps/api
# # RUN pnpm install
# # RUN pnpm dlx @nestjs/cli build

# COPY --chown=node:node --from=installer /app/node_modules /app/apps/api/dist/node_modules

# USER node

# FROM base AS runner
# WORKDIR /app
# COPY --chown=node:node --from=sourcer /app/apps/api /app/apps/api
# EXPOSE ${PORT}
# # CMD [ "node", "apps/api/dist/main.js" ]
# CMD [ "pnpm", "start" ]

##############################

FROM node:18-alpine AS base

RUN corepack enable
VOLUME [ "/pnpm-store", "/app/node_modules" ]
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
# COPY --from=builder /app .
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/turbo.json /app/turbo.json
# COPY --from=builder /app/out/full/apps/api/package.json .
COPY --from=builder /app/out/full/apps/api/tsconfig.json /app/apps/api/tsconfig.json
COPY --from=builder /app/out/full/apps/api/tsconfig.build.json /app/apps/api/tsconfig.build.json
COPY --from=builder /app/out/full/apps/api/prisma/schema.prisma /app/apps/api/prisma/schema.prisma
COPY --from=builder /app/out/full/apps/api/src /app/apps/api/src



RUN pnpm install --filter=api
WORKDIR /app/apps/api

# WORKDIR /app/apps/api
RUN pnpm dlx prisma generate

WORKDIR /app
# COPY --from=builder ./app . 
RUN ls -a /app/apps/api/node_modules

RUN pnpm dlx turbo run build --filter=api...
RUN ls -a /app/apps/api

# WORKDIR /app/apps/api
# RUN pnpm build
RUN ls -a /app/apps/api/dist


FROM base AS runner
WORKDIR /app
# COPY --chown=node:node --from=installer /app .
# COPY --from=installer /app .
# COPY --chown=node:node --from=builder /app/apps/api/tsconfig.json /app/apps/api/tsconfig.json
# COPY --chown=node:node --from=builder /app/apps/api/tsconfig.build.json /app/apps/api/tsconfig.build.json
# COPY --chown=node:node --from=installer /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer /app/turbo.json /app/turbo.json
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/package.json /app/package.json
COPY --from=installer /app/apps/api /app/apps/api
COPY --from=installer /app/apps/api/prisma /app/apps/api/prisma
COPY --from=installer /app/apps/api/package.json /app/apps/api/package.json
RUN ls -a /app/apps/api/node_modules
EXPOSE ${PORT}
CMD [ "node", "apps/api/dist/main.js" ]
# WORKDIR /app/apps/api
# CMD [ "pnpm", "start" ]