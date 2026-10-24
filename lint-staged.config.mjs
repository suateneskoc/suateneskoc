const lintStagedConfig = {
  "*.{css,json,md}": "bun run --bun prettier --write",
  "*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}": [
    "bun run --bun prettier --write",
    "bun run --bun eslint --fix",
  ],
  "*": () => "bun run knip",
};

export default lintStagedConfig;
