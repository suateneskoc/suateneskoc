import type { Theme } from "@/constants/theme";
import { THEME_VALUES } from "@/constants/theme";

/** Checks whether a persisted value is a supported theme. */
export function isTheme(value: string | null): value is Theme {
  return value !== null && THEME_VALUES.includes(value as Theme);
}
