import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, Lora, DM_Mono } from "next/font/google";
import "./globals.css";

/* Body text — Barlow Regular/Medium/SemiBold */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/* Headings — Barlow Semi Condensed, more impactful than full-width */
const barlowHeading = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

/* Accent serif — Lora for testimonial quotes, founder story, pull quotes */
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/* Mono — kept for code/labels/badges */
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopsherpa.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // Keyword-rich title targeting "best browser extension" queries
  title: {
    default: "ShopSherpa",
    template: "%s | ShopSherpa",
  },

  // First 50 words follow the Direct Answer Box pattern for AI Overview eligibility
  description:
    "ShopSherpa detects fake sellers, phishing emails, and fraudulent listings before you pay. It scans 1,800+ fraud patterns in 60 seconds — free browser extension, one-time $9.99 lifetime pre-order.",

  keywords: [
    // High-intent from AEO report
    "is this store legit",
    "how to spot fake online store",
    "best browser extension for fake reviews 2026",
    "amazon redelivery fee scam email",
    "how to spot fake puppy listing",
    "ShopSherpa vs Fakespot",
    "are TikTok shop sellers safe",
    "how to report phishing site",
    "online shopping safety checklist 2026",
    "how to get money back from fake website",
    // Core product terms
    "phishing protection browser extension",
    "scam detection extension",
    "fake review detector",
    "masked credit card extension",
    "online shopping security",
    "fraud prevention tool",
    "data breach alerts",
  ],

  authors: [{ name: "Anghelo Araujo Lazaro", url: `${siteUrl}/team` }],

  openGraph: {
    title: "ShopSherpa — Stop Scams Before You Pay",
    description:
      "Detects phishing emails, flags fake sellers, and masks your card number. Free browser extension. One-time $9.99 lifetime pre-order.",
    url: siteUrl,
    siteName: "ShopSherpa",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ShopSherpa — Online Shopping Safety Layer" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopSherpa — Stop Scams Before You Pay",
    description: "Phishing shield + fake review detector + masked cards. One-time $9.99 pre-order.",
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

  // Helps Google associate ShopSherpa with the brand entity
  category: "Security Software",
};

/* ─── JSON-LD Schemas ────────────────────────────────────────────────────────
   Four schemas working together:
   1. SoftwareApplication — product listing with price, for rich results
   2. Organization       — brand entity with contact + social signals
   3. Person             — founder E-E-A-T (Experience, Expertise, Authority, Trust)
   4. FAQPage            — targets Featured Snippets and AI Overview pull-quotes
─────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      "name": "ShopSherpa",
      "url": siteUrl,
      "description":
        "ShopSherpa is a browser extension that detects phishing emails, flags fake sellers and fraudulent marketplace listings, and masks your credit card number so it is never exposed to untrusted merchants.",
      "operatingSystem": "Chrome, Firefox, Edge, Safari",
      "applicationCategory": "SecurityApplication",
      "applicationSubCategory": "Fraud Detection",
      "offers": {
        "@type": "Offer",
        "price": "9.99",
        "priceCurrency": "USD",
        "description": "Lifetime pre-order — no subscription",
        "availability": "https://schema.org/PreOrder",
      },
      "publisher": { "@id": `${siteUrl}/#organization` },
    },

    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "ShopSherpa",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`,
        "width": 130,
        "height": 130,
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@shopsherpa.org",
        "contactType": "customer support",
        "availableLanguage": "English",
      },
      "founder": { "@id": `${siteUrl}/#founder` },
      "sameAs": [
        "https://twitter.com/shopsherpa",
      ],
    },

    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      "name": "Anghelo Araujo Lazaro",
      "jobTitle": "Founder & CEO",
      "url": `${siteUrl}/team`,
      "worksFor": { "@id": `${siteUrl}/#organization` },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Harvard John A. Paulson School of Engineering",
          "description": "Completed CS50 curriculum",
        },
        {
          "@type": "Organization",
          "name": "MIT Beaver Works Summer Institute",
          "description": "Quantum Software and Microelectronics programs",
        },
      ],
      "knowsAbout": [
        "Online fraud detection",
        "Phishing prevention",
        "Browser extension development",
        "Consumer safety",
        "Embedded systems",
      ],
      "description":
        "At 16, Anghelo built ShopSherpa after his mother nearly lost $600 to a fake puppy listing. He has completed Harvard's CS50 curriculum and MIT Beaver Works programs, and previously interned at Rayfield Systems.",
    },

    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I know if an online store is a scam?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "To determine if a store is a scam, check the domain registration age, look for missing contact information, and verify if the reviews use repetitive bot-like language. ShopSherpa automates this by scanning 1,800+ fraud patterns in 60 seconds.",
          },
        },
        {
          "@type": "Question",
          "name": "What is ShopSherpa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "ShopSherpa is a browser extension that acts as a safety layer for online shopping. It detects phishing emails in your inbox, flags fake sellers and fraudulent listings before checkout, and masks your credit card number so it is never exposed to untrusted merchants.",
          },
        },
        {
          "@type": "Question",
          "name": "How does ShopSherpa detect phishing emails?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "ShopSherpa scans your inbox for emails that impersonate real brands — such as fake Amazon shipping notices, PayPal alerts, or package redelivery fee requests. It checks sender domains, link destinations, and language patterns against a database of known phishing signatures and flags suspicious messages before you open them.",
          },
        },
        {
          "@type": "Question",
          "name": "How much does ShopSherpa cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "ShopSherpa is available as a one-time lifetime pre-order for $9.99. There are no monthly subscriptions or recurring fees.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I spot a fake puppy listing online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Fake puppy listings typically request wire transfers or Zelle payments, use stolen photos from other listings, and lack verifiable breeder information. Sellers often refuse video calls and create urgency around payment. ShopSherpa flags suspicious marketplace listings and payment requests before you send any money.",
          },
        },
        {
          "@type": "Question",
          "name": "Is ShopSherpa safe? Does it read my email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "ShopSherpa processes email headers and sender metadata locally in your browser. It does not store, transmit, or share your email content. Your real card number is replaced by a masked alias — ShopSherpa never sees your actual card details.",
          },
        },
        {
          "@type": "Question",
          "name": "How is ShopSherpa different from Fakespot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Fakespot focuses on Amazon review authenticity. ShopSherpa is broader: it covers phishing emails, fake marketplace sellers across multiple platforms, masked card payments, and real-time scam alerts — all in one extension.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowHeading.variable} ${lora.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper antialiased">{children}</body>
    </html>
  );
}
