# Authentication

The project uses Better Auth for authentication and PostgreSQL for persistent
users and sessions. The configured PostgreSQL provider connects the Next.js
application to the database on Vercel; no separate application server is
required.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `BETTER_AUTH_SECRET` to a random value of at least 32 characters.
3. Set `BETTER_AUTH_URL` to `http://localhost:3000`.
4. Set `ADMIN_EMAIL` to the email address allowed to use Keystatic.
5. Set `DATABASE_URL` to a PostgreSQL database URL.
6. Create the Better Auth tables:

   ```bash
   bun run auth:migrate
   ```

The authentication API is available under `/api/auth/*`. The minimal login
page is available at `/login` in local and Preview environments. Email/password
signup is disabled. Provision the admin account separately before using the
login flow.

To connect Google to an existing email/password account, sign in first and
choose **Connect Google** on `/login`. After linking it once, Google can be
used directly for subsequent sign-ins.

Local email verification is intentionally disabled for this single-admin
development/Preview setup because no email delivery provider is configured.
This is not a production-ready verification policy: before enabling
Production authentication, configure email verification or replace this
temporary account-linking exception with a stronger identity-verification
flow.

Keystatic requires an authenticated session whose email matches `ADMIN_EMAIL`.
The public frontend remains public. Account creation is restricted server-side
to `ADMIN_EMAIL`. Google OAuth is optional; both Google credential variables
must be configured to enable it.

## Vercel setup

Configure `ADMIN_EMAIL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and
`DATABASE_URL` in the appropriate Vercel environments. Add
`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to Development and Preview when
Google OAuth is configured. Use the deployment's canonical URL for
`BETTER_AUTH_URL`; configure separate values for Preview and Production when
needed.

For Google OAuth, register the following callback URL in Google Cloud:

```text
http://localhost:3000/api/auth/callback/google
```

Register a stable Preview callback URL as well before testing OAuth on Vercel.

Never commit `.env.local`, database credentials, or Better Auth secrets.
CI skips runtime environment validation because it does not connect to the
authentication database; deployed environments must provide the required
`ADMIN_EMAIL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `DATABASE_URL`
values. Google OAuth additionally requires both Google credential variables.

## Maintenance

- Run `bun run auth:migrate` after changing Better Auth plugins or
  schema configuration.
- Keep authorization checks on the server and close to the protected data.
- Use Better Auth for identity and sessions; add application tables for
  per-prototype access rules when that feature is introduced.
- Keep Keystatic's existing environment guard: it is enabled locally and on
  Preview deployments, but disabled on Production.
