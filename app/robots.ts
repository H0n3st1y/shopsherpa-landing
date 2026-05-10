import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
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
