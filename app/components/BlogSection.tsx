import { getBlogPosts } from "../../lib/sanity";
import BlogSectionClient from "./BlogSectionClient";

export default async function BlogSection() {
  const posts = await getBlogPosts();

  return <BlogSectionClient posts={posts} />;
}
