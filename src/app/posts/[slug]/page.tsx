import { notFound } from "next/navigation";

import {
  DocumentRenderer,
  type DocumentRendererProps,
} from "@keystatic/core/renderer";
import type { Metadata } from "next";

import {
  getPost,
  getPostMetadata,
  getPostSlugs,
} from "@/server/content/reader";
import type { PostPageProps } from "@/types/routes";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return getPostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const document = post.content.node
    .children as unknown as DocumentRendererProps["document"];

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <DocumentRenderer document={document} />
      </article>
    </main>
  );
}
