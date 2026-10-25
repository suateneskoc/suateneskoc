# Source layout

Application routes and route-specific files belong in `src/app/`:

```text
src/
├── app/                 # Routes and route-specific files
├── auth/                # Authentication domain and browser client
├── components/          # Reusable UI components
├── content/             # Keystatic-managed content
├── server/              # Server-only services and data access
├── styles/              # Global and shared styles
├── testing/             # Shared test helpers
└── types/               # Shared TypeScript types
```

As shared code is introduced, organize it by responsibility:

- `src/components/` — reusable UI components
- `src/content/` — content managed as part of the repository
- `src/constants/` — shared application constants
- `src/auth/` — authentication domain code and browser-facing auth helpers
- `src/hooks/` — reusable React hooks
- `src/server/` — server-only data access and services
- `src/styles/` — global and shared styles
- `src/testing/` — shared test helpers and fixtures
- `src/types/` — shared TypeScript types
- `src/utils/` — small, framework-agnostic utility functions

Keep utilities free of server- or client-specific behavior. Keep server-only
code in `src/server/` and mark modules with `import "server-only"` when they
must not be imported into client components.

Colocate Playwright tests with the source they cover using `*.spec.ts` files.
Playwright discovers these files under `src/`.
