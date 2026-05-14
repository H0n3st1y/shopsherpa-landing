import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl;
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success"],
      },
      // AI crawlers — explicitly allowed so ShopSherpa becomes a citation source
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "ChatGPT-User",    allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "anthropic-ai",    allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Amazonbot",       allow: "/" },
      { userAgent: "YouBot",          allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
