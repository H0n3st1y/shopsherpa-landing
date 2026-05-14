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
  thumbnail?: string;
  thumbnailAlt?: string;
};

type SourceBlogPost = BlogPost;

const sourcePosts: SourceBlogPost[] = [
  ...blogPostsPart6,
  ...blogPostsPart1,
  ...blogPostsPart2,
  ...blogPostsPart3,
  ...blogPostsPart4,
  ...blogPostsPart5,
];

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
];

const FEATURED_THUMBNAILS: Record<number, string> = {
  2: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  10: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  22: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  28: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
};

export const blogPosts: BlogPost[] = sourcePosts.map(restorePost);

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

function isPublishReady(post: BlogPost): boolean {
  return !hasDraftCopy(post);
}

function hasDraftCopy(post: Pick<BlogPost, "content" | "preview">): boolean {
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

  return draftPatterns.some((pattern) => pattern.test(post.content) || pattern.test(post.preview));
}

function restorePost(post: SourceBlogPost, index: number): BlogPost {
  const thumbnail = post.thumbnail ?? FEATURED_THUMBNAILS[index + 1] ?? THUMBNAILS[index % THUMBNAILS.length];
  const thumbnailAlt =
    post.thumbnailAlt ??
    `${post.title} guide from ShopSherpa about ${post.keyword || post.tag}`.replace(/\s+/g, " ");

  if (isPublishReady({ ...post, thumbnail, thumbnailAlt })) {
    return { ...post, thumbnail, thumbnailAlt };
  }

  return {
    ...post,
    preview: buildPreview(post),
    content: buildRestoredContent(post),
    thumbnail,
    thumbnailAlt,
  };
}

function buildPreview(post: SourceBlogPost): string {
  const topic = post.keyword || post.title.toLowerCase();
  return `A practical ShopSherpa guide to ${topic}: what to check, which warning signs matter, and how to make a safer buying decision before you pay.`;
}

function buildRestoredContent(post: SourceBlogPost): string {
  const topic = post.keyword || post.title.toLowerCase();
  const productTie =
    post.tag === "Scam Protection"
      ? "ShopSherpa helps by flagging seller, review, and checkout-domain risks while you browse."
      : "ShopSherpa helps by adding a safety layer around the shopping decision, so price and convenience do not crowd out trust.";

  return `# ${post.title}

Online shopping is easier than ever, but the buying decision has become noisier. Shoppers now have to compare prices, read reviews, judge sellers, avoid spoofed pages, and decide whether a discount is real before they enter a card number.

This guide explains ${topic} in plain language and gives you a safer way to act on it.

## The short answer

${post.title} matters because it helps shoppers reduce uncertainty. A good buying process should answer three questions quickly: is the seller real, is the product represented honestly, and is the checkout path safe?

If any of those answers are unclear, slow down before you pay. Scams usually rely on urgency, vague seller details, copied reviews, and checkout pages that feel almost right.

## What to check first

- Check whether the seller has a clear history, real contact details, and consistent policies.
- Compare the product across more than one source instead of trusting the first result.
- Read the lowest-rated reviews and look for repeated wording, timing patterns, or review bursts.
- Confirm the checkout domain matches the store you meant to visit.
- Be careful with emails or messages that pressure you to pay a small fee immediately.

## Red flags that deserve a pause

The biggest warning sign is a deal that removes your ability to think. A seller who rushes you, refuses normal payment methods, hides return details, or asks you to leave the marketplace is creating risk.

Also watch for polished pages with thin substance: copied product photos, generic support emails, fake countdown timers, and reviews that all sound like the same person wrote them.

## A safer way to shop

Use a simple three-step process before buying: compare the seller, compare the price, and verify the checkout. This takes less than a minute, but it catches many of the patterns that scam stores depend on.

${productTie}

## Bottom line

The goal is not to make shopping complicated. The goal is to make the risky parts visible before money leaves your account.

[Join the free waitlist](https://shopsherpa.org/#cta) to get ShopSherpa when beta access opens.`;
}
