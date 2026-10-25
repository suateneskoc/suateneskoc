import { expect, test } from "@playwright/test";

import { expectPageToBeAccessible } from "@/testing/accessibility";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("login page", () => {
  test("loads", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("navigation")).not.toBeVisible();
  });

  test("has no accessibility violations", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

    await expectPageToBeAccessible(page);
  });
});
