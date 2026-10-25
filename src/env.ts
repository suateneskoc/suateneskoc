import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Add server and client variables here as the application starts using them.
// Keep secrets in the server schema and never prefix them with NEXT_PUBLIC_.
export const env = createEnv({
  client: {},
  runtimeEnv: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  server: {
    ADMIN_EMAIL: z.string().email(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});

if (Boolean(env.GOOGLE_CLIENT_ID) !== Boolean(env.GOOGLE_CLIENT_SECRET)) {
  throw new Error(
    "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured together.",
  );
}
