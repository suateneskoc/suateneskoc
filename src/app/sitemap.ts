import type { MetadataRoute } from "next";

import { getPosts } from "@/server/content/reader";
import { getSiteUrl } from "@/server/site-url";

function getSitemapLastModified(updatedAt: string) {
  return updatedAt.slice(0, 10);
}

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
      lastModified: getSitemapLastModified(entry.updatedAt),
    })),
  ];
}
