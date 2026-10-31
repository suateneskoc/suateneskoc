import "server-only";

import { createReader } from "@keystatic/core/reader";

import config from "../../../keystatic.config";

const reader = createReader(process.cwd(), config);

export type ContentQueryOptions = {
  includeDrafts?: boolean;
};

function serializeDocument(node: unknown) {
  return JSON.parse(JSON.stringify(node));
}

async function getPostRecord(slug: string) {
  "use cache";

  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true,
  });

  if (!post) {
    return null;
  }

  return {
    ...post,
    content: {
      node: serializeDocument(post.content.node),
    },
  };
}

async function getPostSummaries() {
  "use cache";

  const posts = await reader.collections.posts.all();

  return posts.map(({ entry, slug }) => ({
    entry: {
      draft: entry.draft,
      title: entry.title,
      updatedAt: entry.updatedAt,
    },
    slug,
  }));
}

export async function getPost(
  slug: string,
  { includeDrafts = false }: ContentQueryOptions = {},
) {
  const post = await getPostRecord(slug);

  if (!post || (!includeDrafts && post.draft)) {
    return null;
  }

  return post;
}

export function getPostMetadata(post: {
  description: string;
  metaDescription: string | null;
  metaTitle: string | null;
  title: string;
}) {
  return {
    description: post.metaDescription || post.description,
    title: post.metaTitle || post.title,
  };
}

export async function getPostSlugs(options?: ContentQueryOptions) {
  const posts = await getPosts(options);

  return posts.map(({ slug }) => slug);
}

export async function getPosts({
  includeDrafts = false,
}: ContentQueryOptions = {}) {
  const posts = await getPostSummaries();

  return includeDrafts ? posts : posts.filter(({ entry }) => !entry.draft);
}
