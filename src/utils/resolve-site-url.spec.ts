import { expect, test } from "@playwright/test";

import { resolveSiteUrl } from "@/utils/resolve-site-url";

test.describe("site URL resolver", () => {
  test("falls back to localhost outside Vercel", () => {
    expect(resolveSiteUrl()).toBe("http://localhost:3000");
  });

  test("uses the Preview deployment URL outside Production", () => {
    expect(
      resolveSiteUrl({
        previewUrl: "my-preview.vercel.app",
        productionUrl: "my-site.com",
        vercelEnv: "preview",
      }),
    ).toBe("https://my-preview.vercel.app");
  });

  test("uses the production project URL in Production", () => {
    expect(
      resolveSiteUrl({
        previewUrl: "my-preview.vercel.app",
        productionUrl: "my-site.com/",
        vercelEnv: "production",
      }),
    ).toBe("https://my-site.com");
  });

  test("fails when the Production URL is missing", () => {
    expect(() => resolveSiteUrl({ vercelEnv: "production" })).toThrow(
      "VERCEL_PROJECT_PRODUCTION_URL is required in Production.",
    );
  });
});
