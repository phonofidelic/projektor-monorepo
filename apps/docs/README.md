# Projektor Docs

The docs app is a small Next.js app in the Projektor workspace. It mainly serves as a lightweight consumer of the shared `@projektor/ui` package.

## Development

From the repository root:

```sh
pnpm --filter @projektor/docs dev
```

The app runs at `http://localhost:3001`.

## Validation

```sh
pnpm --filter @projektor/docs lint
pnpm --filter @projektor/docs build
```
