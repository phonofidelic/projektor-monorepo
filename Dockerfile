FROM node:18-alpine AS base
# FROM node:20-slim AS base
RUN corepack enable
VOLUME [ "/pnpm-store", "/app/node_modules" ]
RUN pnpm config --global set store-dir /pnpm-store

FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update

# Set working directory
WORKDIR /app
# RUN npm install -g npm@latest
# RUN npm install -g pnpm
# RUN pnpm setup
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install


# Build the project
# COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/full/turbo.json ./turbo.json
COPY --from=builder /app/out/full/apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY --from=builder /app/out/full/apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json
# COPY --from=builder /app/out/full/apps/api/node_modules .
RUN pnpm build --filter=api...

COPY --from=builder /app/out/full/apps/api/dist ./dist
COPY --from=builder /app/out/full/apps/api/package.json .

# CMD ["node", "dist/main.js"]
# CMD pnpm --dir ./apps/api run start
# CMD node dist/main.js
CMD ["turbo", "run", "start", "--filter=api"]