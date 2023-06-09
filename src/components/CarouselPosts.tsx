import { getNonFeaturedPosts } from "@/Service/posts";
import React from "react";
import PostCard from "./PostCard";
import MultiCarousel from "./MultiCarousel";

async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <section className="my-6">
      <h2 className="mx-4 my-2 text-2xl font-bold ">You May Like</h2>
      <MultiCarousel>
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </MultiCarousel>
    </section>
  );
}

export default CarouselPosts;
