# Source layout

Application routes and route-specific files belong in `src/app/`. The current
source tree is intentionally small:

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── auth/               # Authentication domain and browser client
├── content/
│   └── posts/          # Keystatic-managed content
├── server/
│   ├── auth/            # Better Auth configuration
│   ├── content/         # Server-only content readers
│   └── database/        # Server-only database clients
├── components/         # Reusable UI components
└── styles/
    └── globals.css
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
