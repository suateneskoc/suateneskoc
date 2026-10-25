import Script from "next/script";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

const themeScript = `
  (() => {
    try {
      const theme = localStorage.getItem("root-theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      document.documentElement.dataset.theme =
        theme === "light" || theme === "dark" ? theme : systemTheme;
    } catch {}
  })();
`;

export const metadata: Metadata = {
  title: "Suate Nes Koc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so persisted themes do not flash. */}
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
