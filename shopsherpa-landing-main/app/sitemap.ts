import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.ai";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#faq`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
