import { Post } from "@/Service/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post;
};

function PostCard({
  post: { title, path, description, date, category },
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="overflow-hidden rounded-md shadow-md hover:shadow-xl">
        <Image
          src={`/images/posts/${path}.png`}
          alt={title}
          width={300}
          height={200}
          className="w-full"
        />
        <div className="flex flex-col items-center p-4">
          <time className="self-end text-xs text-gray-700">
            {date.toString()}
          </time>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="w-full text-center truncate">{description}</p>
          <span className="px-2 py-0 my-2 text-sm bg-blue-300 rounded-lg">
            {category}
          </span>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
