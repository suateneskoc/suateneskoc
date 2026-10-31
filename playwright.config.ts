import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  testDir: "./src",
  testMatch: "**/*.spec.ts",
  reporter: "list",
  ...(process.env.CI ? { workers: 2 } : {}),
  use: {
    baseURL: "http://localhost:3100",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "PLAYWRIGHT_TEST=1 bun run dev -- --port 3100",
    gracefulShutdown: { signal: "SIGTERM", timeout: 1_000 },
    name: "Next.js test server",
    reuseExistingServer: false,
    stdout: "pipe",
    timeout: 30_000,
    url: "http://localhost:3100",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
