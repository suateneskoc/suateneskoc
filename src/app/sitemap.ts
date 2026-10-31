import type { MetadataRoute } from "next";

import { getPosts } from "@/server/content/reader";
import { getCalendarDate } from "@/server/metadata";
import { getSiteUrl } from "@/server/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getPosts();

  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/posts`,
    },
    ...posts.map(({ entry, slug }) => ({
      url: `${siteUrl}/posts/${slug}`,
      lastModified: getCalendarDate(entry.updatedAt),
    })),
  ];
}
