import type { NextConfig } from "next";

import { env } from "./src/env";

void env;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  distDir: process.env.PLAYWRIGHT_TEST ? ".next-e2e" : ".next",
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
