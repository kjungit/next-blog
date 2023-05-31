import React from "react";
import PostsGrid from "./PostsGrid";
import { getFeaturedPosts } from "@/Service/posts";

async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className="my-6">
      <h2 className="mx-4 my-2 text-2xl font-bold">Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
