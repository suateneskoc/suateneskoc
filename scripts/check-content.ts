import { createReader } from "@keystatic/core/reader";

import config from "../keystatic.config";

const reader = createReader(process.cwd(), config);
await reader.singletons.site.readOrThrow();
const slugs = await reader.collections.posts.list();

for (const slug of slugs) {
  await reader.collections.posts.readOrThrow(slug, {
    resolveLinkedFiles: true,
  });
}

console.log(
  `Validated site settings and ${slugs.length} post${slugs.length === 1 ? "" : "s"}.`,
);
