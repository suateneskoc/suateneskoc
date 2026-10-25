<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project instructions

- Use Bun and existing package scripts; keep scripts and configuration entries alphabetized.
- Run `bun run check:fast` during iteration and `bun run check:all` before handoff when practical.
- Follow [docs/source-layout.md](docs/source-layout.md); link new documentation from [docs/README.md](docs/README.md).
- Record significant technical decisions in `docs/decisions/`.
- Do not edit generated files or directories: `.next/`, `.vercel/`, `node_modules/`, `out/`, or `next-env.d.ts`.
- This repository is public: never commit secrets, environment files, private Vercel metadata, personal data, or proprietary assets.
