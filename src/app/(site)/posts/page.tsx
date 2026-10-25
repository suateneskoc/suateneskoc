import Link from "next/link";

import { getPosts } from "@/server/content/reader";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map(({ entry, slug }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
