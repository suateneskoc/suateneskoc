import type { IconProps } from "@phosphor-icons/react";

import { cn } from "@/utils/cn";

/** Shared presentation props for project icons. */
export const DEFAULT_ICON_PROPS = {
  size: 20,
  weight: "light",
} satisfies Pick<IconProps, "size" | "weight">;

/** Shared classes for icon-only controls. */
export const ICON_CONTROL_CLASS_NAME = cn([
  "text-neutral-700 transition-colors",
  "hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-neutral-700 dark:text-neutral-200",
  "dark:hover:text-white dark:focus-visible:outline-neutral-200",
]);
