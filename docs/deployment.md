# Deployment

The project is intended to be deployed to [Vercel](https://vercel.com/) from
the Git repository.

## Vercel setup

1. Import the repository into Vercel.
2. Keep the framework preset as Next.js.
3. Use the repository's install and build configuration.
4. Add production environment variables in the Vercel project settings.

The repository declares Bun in `package.json` and sets the Vercel Bun version
in `vercel.json`. Vercel should install dependencies from the committed
`bun.lock` lockfile.

## Local environment variables

Pull Vercel variables into a local environment with:

```bash
bun run env:pull
```

The command writes to `.env.local`, which must remain uncommitted.

When adding an environment variable, define and validate it in `src/env.ts`.
Keep secrets in the server schema; only variables prefixed with
`NEXT_PUBLIC_` belong in the client schema.

See [Authentication](authentication.md) for authentication setup and required
environment variables.

Keystatic uses local storage for authoring. Edit content locally at `/keystatic`,
commit the generated files, and use Vercel preview deployments to review changes.
The admin UI and API are disabled on Production deployments and enabled locally
and on Preview deployments. Preview storage is not a durable publishing workflow.

## Verification

Validate all Keystatic content, including drafts, with:

```bash
bun run content:check
```

The CI workflow runs formatting, ESLint, TypeScript, Knip, and the production
build for pull requests and pushes. A deployment should only be considered
ready when those checks pass.
