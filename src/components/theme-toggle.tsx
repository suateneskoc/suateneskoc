"use client";

import { useSyncExternalStore } from "react";

import { Monitor, Moon, Sun } from "@phosphor-icons/react";

import { DEFAULT_ICON_PROPS, ICON_CONTROL_CLASS_NAME } from "@/constants/icons";
import type { Theme } from "@/constants/theme";
import { THEME_STORAGE_KEY, THEME_VALUES } from "@/constants/theme";
import { cn } from "@/utils/cn";
import { isTheme } from "@/utils/theme";

const TRANSITION_DURATION = 200;
const themeListeners = new Set<() => void>();
let transitionTimeout: number | undefined;

function getSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme, shouldTransition = false) {
  const root = document.documentElement;

  if (shouldTransition) {
    root.classList.add("theme-transition");

    if (transitionTimeout !== undefined) {
      window.clearTimeout(transitionTimeout);
    }
  }

  root.dataset.theme = theme === "system" ? getSystemTheme() : theme;

  if (shouldTransition) {
    transitionTimeout = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimeout = undefined;
    }, TRANSITION_DURATION);
  }
}

function getStoredTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(storedTheme) ? storedTheme : "system";
  } catch {
    return "system";
  }
}

function subscribeToTheme(callback: () => void) {
  themeListeners.add(callback);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if (getStoredTheme() === "system") {
      applyTheme("system");
      callback();
    }
  };
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    const storedTheme = getStoredTheme();

    applyTheme(storedTheme);
    callback();
  };

  mediaQuery.addEventListener("change", handleSystemChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    themeListeners.delete(callback);
    mediaQuery.removeEventListener("change", handleSystemChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    (callback) => {
      const unsubscribe = subscribeToTheme(callback);

      return unsubscribe;
    },
    getStoredTheme,
    () => "system" as Theme,
  );

  const nextTheme =
    THEME_VALUES[(THEME_VALUES.indexOf(theme) + 1) % THEME_VALUES.length] ??
    "system";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label = `Change theme (currently ${theme})`;

  function handleClick() {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}

    themeListeners.forEach((listener) => listener());
    applyTheme(nextTheme, true);
  }

  return (
    <button
      aria-label={label}
      className={cn(["cursor-pointer", ICON_CONTROL_CLASS_NAME])}
      onClick={handleClick}
      title={label}
      type="button"
    >
      <Icon {...DEFAULT_ICON_PROPS} aria-hidden="true" />
    </button>
  );
}
