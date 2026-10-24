# Source layout

Application routes and route-specific files belong in `src/app/`. Shared code
is organized by responsibility:

- `src/components/` — reusable UI components
- `src/constants/` — shared application constants
- `src/hooks/` — reusable React hooks
- `src/server/` — server-only data access and services
- `src/styles/` — global and shared styles
- `src/types/` — shared TypeScript types
- `src/utils/` — small, framework-agnostic utility functions

Keep utilities free of server- or client-specific behavior. Keep server-only
code in `src/server/` and mark modules with `import "server-only"` when they
must not be imported into client components.
