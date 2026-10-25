# Deployment

Deploy the project to [Vercel](https://vercel.com/) from the Git repository.

## Vercel setup

1. Import the repository into Vercel.
2. Keep the Next.js framework preset and repository build configuration.
3. Add environment variables in the Vercel project settings.

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

See [Authentication](authentication.md) for auth variables and
[Keystatic](keystatic.md) for the content workflow.

## Verification

Validate content with:

```bash
bun run content:check
```

Run the full project checks before deployment with `bun run check:all`.
