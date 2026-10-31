import { expect, test } from "@playwright/test";

import { LOCAL_SITE_URL } from "@/utils/resolve-site-url";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("robots.txt", () => {
  test("allows public pages and disallows private routes", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Disallow: /login");
    expect(body).toContain("Disallow: /keystatic");
    expect(body).toContain("Disallow: /api");
    expect(body).toContain(`Sitemap: ${LOCAL_SITE_URL}/sitemap.xml`);
    expect(body).not.toContain("Disallow: /posts");
  });
});
