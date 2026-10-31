import { expect, test } from "@playwright/test";

import { THEME_STORAGE_KEY } from "@/constants/theme";
import { expectPageToBeAccessible } from "@/testing/accessibility";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("homepage", () => {
  test("loads", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Enes Koc" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Read the posts" }),
    ).toBeVisible();
  });

  test("exposes site metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/\S+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('meta[name="author"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "http://localhost:3000",
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website",
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      /\S+/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);
  });

  test("has no accessibility violations", async ({ page }) => {
    await page.goto("/");

    await expectPageToBeAccessible(page);
  });

  test("applies a persisted light theme", async ({ page }) => {
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "light");
    }, THEME_STORAGE_KEY);
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("applies a persisted dark theme", async ({ page }) => {
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "dark");
    }, THEME_STORAGE_KEY);
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("uses the system theme when persisted mode is system", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript((storageKey) => {
      localStorage.setItem(storageKey, "system");
    }, THEME_STORAGE_KEY);
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
