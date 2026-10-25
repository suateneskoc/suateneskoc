import "server-only";

export function isKeystaticEnabled() {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return (
    process.env.VERCEL_ENV === "development" ||
    process.env.VERCEL_ENV === "preview"
  );
}
