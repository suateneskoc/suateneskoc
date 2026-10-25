# Suate Nes Koc

Personal blog built with Next.js, React, Tailwind CSS, and Bun.

## Features

- Markdown-based blog posts with typed content validation.
- Keystatic content editing with Git-versioned publishing.
- Protected admin access for content management.
- Vercel Preview and Production deployment support.
- Playwright smoke tests and automated accessibility checks.

Built with Next.js, React, Tailwind CSS, Keystatic, Better Auth, PostgreSQL,
and Bun. See the [technology overview](docs/technology.md) for details.

## Authentication

The public site does not require an account. Better Auth protects the login
flow and Keystatic, which is limited to the configured administrator email.
Authentication is currently enabled locally and on Preview deployments, but
disabled on Production. See the [authentication guide](docs/authentication.md)
for setup and maintenance details.

## Quick start

```bash
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

Read the [documentation index](docs/README.md) for local setup, deployment, and
source-layout guidance.
