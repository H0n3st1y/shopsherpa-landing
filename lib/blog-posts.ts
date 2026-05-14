import { blogPostsPart1 } from "./blog-posts-1";
import { blogPostsPart2 } from "./blog-posts-2";
import { blogPostsPart3 } from "./blog-posts-3";
import { blogPostsPart4 } from "./blog-posts-4";
import { blogPostsPart5 } from "./blog-posts-5";
import { blogPostsPart6 } from "./blog-posts-6";

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
  ...blogPostsPart6,
  ...blogPostsPart1,
  ...blogPostsPart2,
  ...blogPostsPart3,
  ...blogPostsPart4,
  ...blogPostsPart5,
].filter(isPublishReady);

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

function isPublishReady(post: BlogPost): boolean {
  const draftPatterns = [
    /^\s*(?:[-*]\s*)?(?:\*\*)?Notes:?/im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Define /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Explain /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Mention /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Use (?:a |bullet|this|numbered)/im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Cover /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Introduce /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Open with /im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Brief intro/im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Set the scene/im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?Conclusion section/im,
    /^\s*(?:[-*]\s*)?(?:\*\*)?CTA section/im,
    /\*[^*]*(?:Define|Explain|Mention|Use this section|Keep this section|Conclusion)[^*]*\*/i,
    /preview:\s*"Define /i,
  ];

  return !draftPatterns.some((pattern) => pattern.test(post.content) || pattern.test(post.preview));
}
