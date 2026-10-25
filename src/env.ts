import { createEnv } from "@t3-oss/env-nextjs";

// Add server and client variables here as the application starts using them.
// Keep secrets in the server schema and never prefix them with NEXT_PUBLIC_.
export const env = createEnv({
  client: {},
  runtimeEnv: {},
  server: {},
});
