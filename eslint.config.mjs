import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
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
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
