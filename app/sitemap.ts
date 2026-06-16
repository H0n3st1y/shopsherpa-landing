import type { MetadataRoute } from "next";
import { scamDirectoryEntries } from "@/lib/scam-directory";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const directoryUrls = scamDirectoryEntries.map((entry) => ({
    url: `${siteUrl}/scam-directory/${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: entry.risk === "High" ? 0.82 : 0.72,
  }));

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/scam-directory`, lastModified: now, changeFrequency: "weekly", priority: 0.92 },
    { url: `${siteUrl}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.74 },
    { url: `${siteUrl}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.45 },
    { url: `${siteUrl}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.45 },
    ...directoryUrls,
  ];
}
