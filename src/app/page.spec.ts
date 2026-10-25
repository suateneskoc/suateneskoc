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

  test("applies a persisted light theme", async ({ page }) => {
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "light");
    }, "root-theme");
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("applies a persisted dark theme", async ({ page }) => {
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "dark");
    }, "root-theme");
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("uses the system theme when persisted mode is system", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "system");
    }, "root-theme");
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
