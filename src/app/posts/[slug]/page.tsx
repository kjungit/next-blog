import { getFeaturedPosts, getPostData } from "@/Service/posts";
import AdjacentPostCard from "@/components/AdjacentPostCard";
import PostContant from "@/components/PostContant";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}

async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, path, prevPost, nextPost } = post;
  return (
    <article className="m-4 overflow-hidden bg-gray-100 rounded-lg shadow-2xl">
      <div className="h-64 overflow-hidden">
        <Image
          className="w-full"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={760}
          height={420}
        />
      </div>
      <PostContant post={post} />
      <section className="flex shadow-md">
        {prevPost && <AdjacentPostCard post={prevPost} type="prev" />}
        {nextPost && <AdjacentPostCard post={nextPost} type="next" />}
      </section>
    </article>
  );
}

export default PostPage;

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
