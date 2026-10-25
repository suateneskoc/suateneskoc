import { expect, test } from "@playwright/test";

import { expectPageToBeAccessible } from "@/testing/accessibility";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("posts page", () => {
  test("loads", async ({ page }) => {
    await page.goto("/posts");

    await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  });

  test("has no accessibility violations", async ({ page }) => {
    await page.goto("/posts");

    await expectPageToBeAccessible(page);
  });
});
