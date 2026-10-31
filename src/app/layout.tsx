import Script from "next/script";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { THEME_STORAGE_KEY, THEME_VALUES } from "@/constants/theme";
import { getSiteSettings } from "@/server/content/reader";
import { getSiteUrl } from "@/server/site-url";

import "@/styles/globals.css";

const explicitThemeValues = THEME_VALUES.filter((theme) => theme !== "system");

const themeScript = `
  (() => {
    try {
      const theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      document.documentElement.dataset.theme =
        ${JSON.stringify(explicitThemeValues)}.includes(theme)
          ? theme
          : systemTheme;
    } catch {}
  })();
`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const siteUrl = getSiteUrl();

  return {
    alternates: { canonical: "/" },
    authors: [{ name: site.author }],
    creator: site.author,
    description: site.description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      description: site.description,
      locale: "en_US",
      siteName: site.name,
      title: site.name,
      type: "website",
      url: siteUrl,
    },
    publisher: site.author,
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    twitter: {
      card: "summary",
      description: site.description,
      title: site.name,
    },
  };
}

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
