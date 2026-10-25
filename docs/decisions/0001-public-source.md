# 0001: Keep the source repository public

- Status: accepted
- Date: 2026-10-25

## Context

The blog is deployed on Vercel and its source is intended to be public.

## Decision

Keep the repository public. Treat every committed file as publicly visible and
keep secrets and deployment settings in Vercel or other secret storage.

## Consequences

Agents and contributors must not commit secrets, environment files, private
Vercel metadata, personal data, or proprietary assets.

## Alternatives considered

- Private repository — unnecessary for this public blog and its current needs.
