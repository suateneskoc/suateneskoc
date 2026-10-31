import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Enes Koc</h1>
      <Link href="/posts">Read the posts</Link>
    </main>
  );
}
