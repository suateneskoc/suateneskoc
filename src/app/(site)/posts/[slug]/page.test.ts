import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("post metadata", () => {
  test("exposes SEO and article metadata", async ({ page }) => {
    await page.goto("/posts/first-post");

    await expect(page).toHaveTitle(/\S+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "http://localhost:3000/posts/first-post",
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "http://localhost:3000/posts/first-post",
    );
    await expect(
      page.locator('meta[property="article:published_time"]'),
    ).toHaveAttribute("content", /^\d{4}-\d{2}-\d{2}$/);
    await expect(
      page.locator('meta[property="article:modified_time"]'),
    ).toHaveAttribute("content", /^\d{4}-\d{2}-\d{2}$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
  });
});
