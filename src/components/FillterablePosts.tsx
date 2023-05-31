"use client";

import { Post } from "@/Service/posts";
import React, { useState } from "react";
import PostsGrid from "./PostsGrid";
import Categories from "./Categories";

type Props = {
  posts: Post[];
  categories: string[];
};

const All_POSTS = "All Posts";

function FillterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(All_POSTS);

  const filteredPosts =
    selected === All_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);
  return (
    <section className="flex m-4">
      <PostsGrid posts={filteredPosts} />
      <Categories
        categories={[All_POSTS, ...categories]}
        selected={selected}
        onClick={setSelected}
      />
    </section>
  );
}

export default FillterablePosts;
