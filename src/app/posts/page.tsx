import { getAllPosts } from "@/Service/posts";
import FillterablePosts from "@/components/FillterablePosts";
import React from "react";

export const metadata = {
  title: "All Posts",
  description: "프론트엔드 관련 블로그 글",
};

async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return <FillterablePosts posts={posts} categories={categories} />;
}

export default PostsPage;
