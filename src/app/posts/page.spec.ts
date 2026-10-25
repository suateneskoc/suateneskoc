import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("posts page", () => {
  test("loads", async ({ page }) => {
    await page.goto("/posts");

    await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  });
});
