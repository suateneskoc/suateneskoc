# Local development

## Setup

Requirements: [Bun](https://bun.sh/) and a PostgreSQL database.

```bash
git clone https://github.com/suateneskoc/suateneskoc.git
cd suateneskoc
bun install --frozen-lockfile
cp .env.example .env.local
```

Set the required values in `.env.local`:

- `ADMIN_EMAIL` — email allowed to access Keystatic.
- `BETTER_AUTH_SECRET` — random secret with at least 32 characters.
- `BETTER_AUTH_URL` — `http://localhost:3000` locally.
- `DATABASE_URL` — PostgreSQL connection string.

Google OAuth is optional. Set both `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` to enable it. Never commit `.env.local` or secrets.

Create the authentication tables, then start the development server:

```bash
bun run auth:migrate
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Keystatic is available at
`/keystatic` in local development.

If the project is linked to Vercel, `bun run env:pull` can populate `.env.local`
instead of copying `.env.example` manually.

## Common commands

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `bun run dev`           | Start the development server.                |
| `bun run check:fast`    | Run formatting, lint, and TypeScript checks. |
| `bun run check:all`     | Run all checks and the production build.     |
| `bun run content:check` | Validate blog content.                       |
| `bun run test:e2e`      | Run Playwright browser tests.                |
| `bun run test:e2e:ui`   | Run Playwright tests interactively.          |
| `bun run format`        | Format the project with Prettier.            |

Run `bun run check:fast` while developing and `bun run check:all` before
handing off changes when practical.
