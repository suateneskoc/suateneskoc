import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines class values and resolves conflicting Tailwind utilities. */
export function cn(classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
