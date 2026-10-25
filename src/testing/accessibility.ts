import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export async function expectPageToBeAccessible(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
}
