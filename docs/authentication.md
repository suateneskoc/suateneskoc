# Authentication

Better Auth manages users and sessions in PostgreSQL inside the Next.js
application. No separate application server is required.

See [Local development](development.md) for local environment setup and
database migration.

The API is available under `/api/auth/*`, and the login page is available at
`/login` locally and on Preview. Email/password signup is disabled; provision
the administrator account separately.

To connect Google to an existing email/password account, sign in first and
choose **Connect Google** on `/login`. After linking it once, Google can be
used directly for subsequent sign-ins.

Email verification is disabled because no delivery provider is configured.
Configure one before enabling Production authentication.

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

## Maintenance

- Run `bun run auth:migrate` after changing Better Auth plugins or
  schema configuration.
- Keep authorization checks on the server and close to the protected data.
