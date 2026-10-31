# Keystatic

Keystatic is used as a local, Git-versioned editor for blog content.

## Workflow

1. Run `bun run dev`.
2. Open `/keystatic` locally.
3. Edit posts and commit the generated files under `src/content/posts/`.
4. Use Vercel Preview deployments to review changes.

The admin UI is enabled locally and on Preview deployments, but disabled on
Production. Preview storage is not durable; publishing happens through Git.

Posts use the schema in `keystatic.config.ts` and are read server-side through
`src/server/content/reader.ts`. Published content is the default; draft mode
will explicitly opt into `includeDrafts: true`. Maintain `updatedAt` whenever a
post's meaningful content changes; it is used as the sitemap `lastmod` value.
The sitemap publishes its calendar date only because Keystatic's datetime-local
value does not include a timezone.

Validate all posts with:

```bash
bun run content:check
```
