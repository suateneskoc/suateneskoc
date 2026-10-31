export const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const url = /^https?:\/\//.test(value) ? value : `https://${value}`;

  return url.replace(/\/$/, "");
}

/** Resolves a public site URL for local, Preview, and Production environments. */
export function resolveSiteUrl({
  vercelEnv,
  productionUrl,
  previewUrl,
}: {
  vercelEnv?: string | undefined;
  productionUrl?: string | undefined;
  previewUrl?: string | undefined;
} = {}) {
  if (vercelEnv === "production" && !productionUrl) {
    throw new Error("VERCEL_PROJECT_PRODUCTION_URL is required in Production.");
  }

  const host = vercelEnv === "production" ? productionUrl : previewUrl;

  return host ? normalizeSiteUrl(host) : LOCAL_SITE_URL;
}
