import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    ...importX.flatConfigs.recommended,
    files: ["src/**/*.{js,jsx,ts,tsx}"],
  },
  {
    ...importX.flatConfigs.typescript,
    files: ["src/**/*.{js,jsx,ts,tsx}"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/no-anonymous-default-export": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Next boundary markers.
            ["^\\u0000client-only$", "^\\u0000server-only$"],

            // Bun imports.
            ["^bun$", "^bun/"],

            // Node.js builtins.
            [
              "^node:|^(assert|buffer|child_process|crypto|fs|http|https|os|path|stream|url|util|zlib)(/.*|$)",
            ],

            // React and Next.js core.
            ["^react$", "^react/", "^next$", "^next/"],

            // Other external packages.
            ["^@?\\w"],

            // Absolute imports.
            ["^@/"],

            // Relative imports.
            ["^\\.\\.(?!/?$)", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // Side-effect imports, including CSS.
            ["^\\u0000", "^.+\\.s?css$"],
          ],
        },
      ],
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          bun: true,
        }),
      ],
    },
  },
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".vercel/**",
    "build/**",
    "coverage/**",
    "dist/**",
    "next-env.d.ts",
    "out/**",
  ]),
]);

export default eslintConfig;
