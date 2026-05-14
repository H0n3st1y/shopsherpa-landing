import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
  const now = new Date();

  return [
    // Core pages
    { url: base,                     lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${base}/team`,           lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/blog`,           lastModified: now, changeFrequency: "daily",   priority: 0.9  },
    { url: `${base}/product`,        lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/lab`,            lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/privacy`,        lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    { url: `${base}/security`,       lastModified: now, changeFrequency: "monthly", priority: 0.5  },

    // Landing page anchors — treated as separate signals
    { url: `${base}/#how-it-works`,  changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#pricing`,       changeFrequency: "weekly",  priority: 0.85 },
    { url: `${base}/#roadmap`,       changeFrequency: "weekly",  priority: 0.6  },
    { url: `${base}/#cta`,           changeFrequency: "weekly",  priority: 0.75 },
  ];
}
