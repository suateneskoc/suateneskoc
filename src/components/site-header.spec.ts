import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("site header", () => {
  test("shows public navigation controls", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View source on GitHub" }),
    ).toHaveAttribute("href", "https://github.com/suateneskoc/suateneskoc");
    await expect(
      page.getByRole("button", { name: /Change theme/ }),
    ).toBeVisible();
  });

  test("opens GitHub in a secure new tab", async ({ page }) => {
    await page.goto("/");

    const githubLink = page.getByRole("link", {
      name: "View source on GitHub",
    });

    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });

  test("cycles through system, light, and dark themes", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const themeButton = page.getByRole("button", { name: /Change theme/ });

    await expect(themeButton).toHaveAttribute(
      "aria-label",
      "Change theme (currently system)",
    );
    await themeButton.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeButton).toHaveAttribute(
      "aria-label",
      "Change theme (currently light)",
    );

    await themeButton.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(themeButton).toHaveAttribute(
      "aria-label",
      "Change theme (currently dark)",
    );

    await themeButton.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("follows system preference changes", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .dispatchEvent(new Event("change"));
    });

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
