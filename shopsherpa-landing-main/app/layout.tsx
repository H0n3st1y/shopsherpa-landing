import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ShopSherpa",
  description:
    "ShopSherpa is the safety layer for online shopping. Catch phishing in your inbox, get alerts when your data leaks, and mask your card so it never gets stolen.",
  keywords: [
    "phishing protection",
    "online shopping security",
    "scam detection",
    "fraud prevention",
    "password manager",
    "masked credit card",
    "data breach alerts",
  ],
  authors: [{ name: "ShopSherpa" }],
  openGraph: {
    title: "ShopSherpa",
    description:
      "The safety layer for online shopping. Phishing shield, password vault, masked cards.",
    url: siteUrl,
    siteName: "ShopSherpa",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShopSherpa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopSherpa",
    description: "The safety layer for online shopping. Pre-order $9.99 lifetime.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-paper antialiased">{children}</body>
    </html>
  );
}
