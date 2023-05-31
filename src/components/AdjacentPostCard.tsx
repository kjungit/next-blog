import { Post } from "@/Service/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
type Props = {
  post: Post;
  type: "prev" | "next";
};

const ICON_CLASS =
  "m-4 text-5xl text-blue-300 transition-all group-hover:text-6xl ease-in-out";

function AdjacentPostCard({ post: { path, title, description }, type }: Props) {
  return (
    <Link
      href={`/posts/${path}`}
      className="relative w-full bg-black group max-h-56"
    >
      <Image
        className="object-cover w-full opacity-40 group-hover:opacity-60"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={150}
        height={100}
      />
      <div className="absolute flex items-center justify-around w-full px-4 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {type === "prev" && <FaArrowLeft className={ICON_CLASS} />}
        <div className="w-fulltext-center">
          <h3 className="font-bold md:text-3xl max-sm:text-[4px] ">{title}</h3>
          <p className="font-bold max-sm:text-xs">{description}</p>
        </div>
        {type === "next" && <FaArrowRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}

export default AdjacentPostCard;
