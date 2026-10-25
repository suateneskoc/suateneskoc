# Better Auth for application authentication

Status: accepted

## Decision

Use Better Auth with PostgreSQL for application authentication. Keep the
authentication API inside the Next.js application and deploy it on Vercel.

## Rationale

This keeps identity and session data under project control while providing a
path to protect Keystatic and individual prototype URLs. PostgreSQL also gives
us a natural place for future application-specific access rules without
introducing a second application platform.

The current implementation includes a minimal login page and Keystatic access
control. Administrative access management and prototype ACLs will be added
when those product requirements are defined.

The initial login flow uses email/password and optional Google OAuth. Account
creation is restricted server-side to the configured admin email, and the
login and authentication routes are enabled only locally and on Preview
deployments until the production rollout is approved.
