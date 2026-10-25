export const THEME_STORAGE_KEY = "root-theme";

export const THEME_VALUES = ["system", "light", "dark"] as const;

export type Theme = (typeof THEME_VALUES)[number];
