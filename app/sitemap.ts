import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { isoDateFromPostDate } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
  const now = new Date();
  const blogUrls = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(isoDateFromPostDate(post.date)),
    changeFrequency: "monthly" as const,
    priority: post.slug === "fake-sellers" ? 0.85 : 0.72,
  }));

  return [
    // Core pages
    { url: base,                     lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${base}/team`,           lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/blog`,           lastModified: now, changeFrequency: "daily",   priority: 0.9  },
    { url: `${base}/compare`,        lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/product`,        lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/lab`,            lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/aeo`,            lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/privacy`,        lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    { url: `${base}/security`,       lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    ...blogUrls,
  ];
}
