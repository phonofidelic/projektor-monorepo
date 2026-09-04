# Projektor Web

The web app is a Next.js 13 App Router frontend for Projektor. It handles registration, login, navigation, and project management screens.

## Setup

Create a local environment file:

```sh
cp apps/web/.env.example apps/web/.env.local
```

Set `NEXT_PUBLIC_PROJEKTOR_API_BASE_URL` to the running API URL, usually `http://localhost:4001`.

## Development

From the repository root:

```sh
pnpm --filter @projektor/web dev
```

The app runs at `http://localhost:3000`.

## Validation

```sh
pnpm --filter @projektor/web lint
pnpm --filter @projektor/web build
```

## Notes

- This app currently reads authentication tokens from client-readable cookies. That keeps the current implementation simple, but it should be hardened before production use.
- Shared UI components come from `@projektor/ui`; shared domain types come from `@projektor/types`.
