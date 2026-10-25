import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

// The unauthenticated route renders Next.js-generated 404 markup, not app UI.
test.describe("protected Keystatic page", () => {
  test("is inaccessible without authentication", async ({ page }) => {
    await page.goto("/keystatic");

    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });
});
