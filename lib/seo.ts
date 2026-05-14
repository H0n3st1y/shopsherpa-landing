import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";
export const siteName = "ShopSherpa";
export const spacedSiteName = "Shop Sherpa";
export const defaultOgImage = "/og-image.png";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function brandedTitle(title: string) {
  return title.includes(siteName) || title.includes(spacedSiteName)
    ? title
    : `${title} | ${siteName}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  imageAlt,
  type = "website",
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(path);
  const finalTitle = brandedTitle(title);

  return {
    title: finalTitle,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonical,
      siteName,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt ?? finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [image],
    },
  };
}

export function isoDateFromPostDate(date: string) {
  const parsed = new Date(`${date} 00:00:00 GMT-0400`);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}
