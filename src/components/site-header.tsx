import Link from "next/link";

import { GithubLogo, House } from "@phosphor-icons/react/ssr";

import { DEFAULT_ICON_PROPS, ICON_CONTROL_CLASS_NAME } from "@/constants/icons";

import ThemeToggle from "./theme-toggle";

export default function SiteHeader() {
  return (
    <header>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link
          aria-label="Home"
          className={ICON_CONTROL_CLASS_NAME}
          href="/"
          title="Home"
        >
          <House {...DEFAULT_ICON_PROPS} aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-2">
          <a
            aria-label="View source on GitHub"
            className={ICON_CONTROL_CLASS_NAME}
            href="https://github.com/suateneskoc/suateneskoc"
            rel="noreferrer"
            target="_blank"
            title="View source on GitHub"
          >
            <GithubLogo {...DEFAULT_ICON_PROPS} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
