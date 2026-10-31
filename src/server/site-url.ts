import "server-only";

import { resolveSiteUrl } from "@/utils/resolve-site-url";

/** Resolves the public site URL from the current process environment. */
export function getSiteUrl() {
  return resolveSiteUrl({
    previewUrl: process.env.VERCEL_URL,
    productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
