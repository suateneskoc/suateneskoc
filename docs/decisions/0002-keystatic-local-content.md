# 0002: Use Keystatic for local, Git-versioned content

- Status: accepted
- Date: 2026-10-25

## Context

The blog needs a Markdown-like editor with structured content and room for
custom components, but has one author and does not need a hosted collaboration
backend.

## Decision

Use Keystatic with local storage and Markdoc content in `src/content/`. Read
content through a server-only reader and keep authored files in Git.

## Consequences

Content changes are reviewed and published through commits and Vercel preview
deployments. The Keystatic admin is disabled in production and enabled locally
and on previews for evaluation. Durable remote editing will require a later
move to GitHub or Cloud storage.

## Alternatives considered

- Hosted headless CMS — more infrastructure than this solo blog currently needs.
- Plain MDX — less editor support for structured content and custom blocks.
