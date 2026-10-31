import { collection, config, fields } from "@keystatic/core";

export default config({
  collections: {
    posts: collection({
      columns: ["title", "publishedAt", "updatedAt", "draft"],
      entryLayout: "content",
      format: { contentField: "content" },
      label: "Posts",
      path: "src/content/posts/*/",
      schema: {
        content: fields.markdoc({
          label: "Content",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          defaultValue: true,
          label: "Draft",
        }),
        metaDescription: fields.text({
          description:
            "Optional description used for search and social metadata.",
          label: "Meta description",
          multiline: true,
        }),
        metaTitle: fields.text({
          description: "Optional title used for search and social metadata.",
          label: "Meta title",
        }),
        publishedAt: fields.date({
          label: "Published at",
        }),
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
        }),
        updatedAt: fields.datetime({
          label: "Updated at",
          validation: { isRequired: true },
        }),
      },
      slugField: "title",
    }),
  },
  storage: {
    kind: "local",
  },
});
