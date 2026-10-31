import "server-only";

import type { Entry } from "@keystatic/core/reader";
import type { Metadata } from "next";

import type config from "../../keystatic.config";

type PostEntry = Entry<(typeof config)["collections"]["posts"]>;
type SiteEntry = Entry<(typeof config)["singletons"]["site"]>;

/** Returns a timezone-safe calendar date for metadata and sitemap output. */
export function getCalendarDate(value: string) {
  return value.slice(0, 10);
}

export function getPostMetadata(
  post: Pick<
    PostEntry,
    | "description"
    | "metaDescription"
    | "metaTitle"
    | "publishedAt"
    | "title"
    | "updatedAt"
  >,
  site: Pick<SiteEntry, "author" | "name">,
  slug: string,
): Metadata {
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.description;
  const url = `/posts/${slug}`;

  return {
    alternates: { canonical: url },
    authors: [{ name: site.author }],
    description,
    openGraph: {
      authors: [site.author],
      description,
      modifiedTime: getCalendarDate(post.updatedAt),
      publishedTime: post.publishedAt || undefined,
      siteName: site.name,
      title,
      type: "article",
      url,
    },
    title,
    twitter: {
      card: "summary",
      description,
      title,
    },
  };
}
