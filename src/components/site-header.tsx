import Link from "next/link";

import { GithubLogo, House } from "@phosphor-icons/react/ssr";

import ThemeToggle from "./theme-toggle";

const iconProps = {
  size: 20,
  weight: "light" as const,
};

export default function SiteHeader() {
  return (
    <header>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link
          aria-label="Home"
          className="text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 dark:text-neutral-200 dark:hover:text-white dark:focus-visible:outline-neutral-200"
          href="/"
          title="Home"
        >
          <House {...iconProps} aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2">
          <a
            aria-label="View source on GitHub"
            className="text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 dark:text-neutral-200 dark:hover:text-white dark:focus-visible:outline-neutral-200"
            href="https://github.com/suateneskoc/suateneskoc"
            rel="noreferrer"
            target="_blank"
            title="View source on GitHub"
          >
            <GithubLogo {...iconProps} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
