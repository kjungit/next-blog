import React from "react";
import MarkdownViewer from "@/components/MarkdownViewer";
import { FcCalendar } from "react-icons/fc";
import { PostData } from "@/Service/posts";

function PostContant({ post }: { post: PostData }) {
  const { title, description, date, content } = post;

  return (
    <section className="flex flex-col p-4">
      <div className="flex items-center self-end text-sky-600">
        <FcCalendar />
        <p className="ml-2 font-semibold"> {date.toString()}</p>
      </div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-xl font-bold">{description}</p>
      <div className="mt-4 mb-8 border-2 w-100 border-sky-600" />
      <MarkdownViewer content={content} />
    </section>
  );
}

export default PostContant;
