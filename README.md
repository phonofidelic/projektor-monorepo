# Projektor

Projektor is a full-stack project management application. It lets users register, sign in, and manage projects with active, archived, and removed states.

## Tech Stack

- Turborepo monorepo managed with pnpm
- Next.js 13 App Router frontend
- NestJS REST API
- Prisma ORM with a CockroachDB datasource
- React Query for client-side data fetching
- Tailwind CSS for styling
- MSW and Express-based mocks for frontend development support
- Jest for unit and e2e test coverage

## Architecture

The monorepo contains three apps and several shared packages:

- `apps/web`: the main Next.js application for browsing, creating, editing, archiving, and removing projects.
- `apps/api`: the NestJS API for authentication, users, and projects. It uses Prisma to persist data.
- `apps/docs`: a small Next.js app used as a lightweight shared UI package consumer.
- `packages/ui`: shared React UI components.
- `packages/types`: shared TypeScript domain types.
- `packages/mocks`: MSW handlers and a small mock API server.
- `packages/eslint-config-custom`: shared ESLint config.
- `packages/tsconfig`: shared TypeScript config.

The web app talks to the API through `NEXT_PUBLIC_PROJEKTOR_API_BASE_URL`. The API reads database and JWT settings from environment variables.

## Prerequisites

- Node.js 18
- pnpm 7.x. This repo declares `pnpm@7.15.0` in `package.json`.
- A CockroachDB database connection string for Prisma.

If you use nvm, switch to the repository Node version first:

```sh
nvm use
```

Then enable the pinned pnpm version with Corepack:

```sh
corepack enable
corepack prepare pnpm@7.15.0 --activate
```

Using newer Node versions can cause pnpm 7 install failures such as `ERR_INVALID_THIS`.

## Environment Variables

Create local env files from the examples:

```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

API variables:

- `DATABASE_URL`: CockroachDB connection string used by Prisma.
- `JWT_ACCESS_SECRET`: secret used to sign short-lived access tokens.
- `JWT_REFRESH_SECRET`: secret used to sign refresh tokens.
- `PORT`: optional API port. Defaults to `4001`.

Web variables:

- `NEXT_PUBLIC_PROJEKTOR_API_BASE_URL`: base URL for the NestJS API, for example `http://localhost:4001`.

Use local development secrets only. Do not commit real credentials.

## Installation

Install workspace dependencies from the repository root:

```sh
pnpm install
```

Generate the Prisma client:

```sh
pnpm --filter api prisma generate
```

Run database migrations against the database configured in `apps/api/.env`:

```sh
pnpm --filter api prisma migrate dev
```

## Development

Run all development tasks through Turborepo:

```sh
pnpm dev
```

Or run apps individually:

```sh
pnpm --filter api dev
pnpm --filter @projektor/web dev
pnpm --filter @projektor/docs dev
```

Default local URLs:

- Web app: `http://localhost:3000`
- API: `http://localhost:4001`
- Docs app: `http://localhost:3001`

## Validation

From the repository root:

```sh
pnpm lint
pnpm test
pnpm build
```

Useful focused commands:

```sh
pnpm --filter api test
pnpm --filter @projektor/web lint
pnpm --filter @projektor/ui build
```

## Known Limitations

- Authentication is development-oriented. The web app and API currently use client-readable cookies for access and refresh tokens. A production application should use stricter cookie settings, preferably server-managed `httpOnly`, `secure`, and `sameSite` cookies.
- The API enables permissive CORS for local development.
- The Prisma datasource is configured for CockroachDB. A fresh developer needs a reachable CockroachDB instance before running migrations or the API against real data.
- The docs app is minimal and mainly verifies that shared UI package imports work.
