import { expect, test } from "@playwright/test";

import { LOCAL_SITE_URL } from "@/utils/resolve-site-url";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("sitemap", () => {
  test("contains public pages and published posts", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(([, url]) => url)
      .filter((url): url is string => Boolean(url));

    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("xml");
    expect(body).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(urls).toContain(LOCAL_SITE_URL);
    expect(urls).toContain(`${LOCAL_SITE_URL}/posts`);
    expect(urls).toContain(`${LOCAL_SITE_URL}/posts/first-post`);
    expect(body).toContain("<lastmod>2026-10-31</lastmod>");
    expect(
      urls.every((url) => !/\/(login|keystatic|api)(\/|$)/.test(url)),
    ).toBe(true);
  });
});
