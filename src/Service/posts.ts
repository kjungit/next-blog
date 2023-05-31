import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & {
  content: string;
  prevPost: Post | null;
  nextPost: Post | null;
};

// 한번 렌더링 되는 사이클 안에서는 getAllPosts 함수가 한번만 실행됨
// 그러나, 다른 사이클에서는 getAllPosts 함수가 다시 실행됨
// 페이지 단위로 한번의 사이클에서 렌더링이 이루어지기 때문에, 페이지 단위로 getAllPosts 함수가 한번만 실행됨
export const getAllPosts = cache(async () => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const posts = await getAllPosts(); //
  const post = posts.find((post) => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  const index = posts.indexOf(post);
  const prevPost = index > 0 ? posts[index - 1] : null; // 이전 포스트
  const nextPost = index < posts.length ? posts[index + 1] : null; // 다음 포스트
  const content = await readFile(filePath, "utf-8");
  return { ...post, content, prevPost, nextPost };
}
