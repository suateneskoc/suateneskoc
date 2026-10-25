import { expect, test } from "@playwright/test";

import { expectPageToBeAccessible } from "@/testing/accessibility";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("homepage", () => {
  test("loads", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Suate Nes Koc" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Read the posts" }),
    ).toBeVisible();
  });

  test("has no accessibility violations", async ({ page }) => {
    await page.goto("/");

    await expectPageToBeAccessible(page);
  });
});
