# CSS-based dark mode foundation

Status: accepted

## Decision

Use Tailwind's neutral scale as the shared grayscale palette and map semantic
CSS color tokens to it for light and dark themes. Respect the user's system
preference by default, while allowing a future settings control to override it
with `data-theme="light"` or `data-theme="dark"` on the root element.

Read the persisted mode from `localStorage` before the first paint using the
`root-theme` key. Store `light`, `dark`, or `system`; resolve `system` to the
current media preference and set the corresponding `data-theme` attribute. The
root layout owns this bootstrap to prevent an initial theme flash.

Use Tailwind's `dark:` variant with the `data-theme="dark"` selector for
theme-specific utilities. Keep component styling in JSX whenever practical;
reserve global CSS for theme tokens, browser color-scheme metadata, and shared
transitions.

## Rationale

This provides a consistent color vocabulary for new UI without adding a theme
package. Resolving system mode to the same root attribute used by Tailwind
keeps `dark:` behavior consistent across all three modes. The pre-paint
bootstrap prevents an initial theme flash, while the temporary
`.theme-transition` class lets the future settings control animate color
changes without applying transitions globally all the time. It must still
respect `prefers-reduced-motion`.
