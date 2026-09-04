# Projektor API

The API is a NestJS service for Projektor. It provides authentication, user, and project endpoints backed by Prisma and CockroachDB.

## Setup

Create a local environment file:

```sh
cp apps/api/.env.example apps/api/.env
```

Required variables:

- `DATABASE_URL`: CockroachDB connection string.
- `JWT_ACCESS_SECRET`: access token signing secret.
- `JWT_REFRESH_SECRET`: refresh token signing secret.

Optional:

- `PORT`: API port. Defaults to `4001`.

Generate the Prisma client and apply migrations:

```sh
pnpm --filter api prisma generate
pnpm --filter api prisma migrate dev
```

## Development

From the repository root:

```sh
pnpm --filter api dev
```

The API runs at `http://localhost:4001` unless `PORT` is set.

## Validation

```sh
pnpm --filter api test
pnpm --filter api test:e2e
pnpm --filter api build
```

## Notes

- CORS is currently permissive for local development.
- Auth cookies are currently set without production cookie hardening such as `httpOnly`, `secure`, and `sameSite`.
- Refresh tokens are hashed before being stored in the database.
