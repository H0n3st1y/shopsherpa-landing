import { blogPostsPart1 } from "./blog-posts-1";
import { blogPostsPart2 } from "./blog-posts-2";
import { blogPostsPart3 } from "./blog-posts-3";
import { blogPostsPart4 } from "./blog-posts-4";
import { blogPostsPart5 } from "./blog-posts-5";

export type BlogPost = {
  slug: string;
  title: string;
  keyword: string;
  tag: string;
  read: string;
  date: string;
  preview: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  ...blogPostsPart1,
  ...blogPostsPart2,
  ...blogPostsPart3,
  ...blogPostsPart4,
  ...blogPostsPart5,
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
