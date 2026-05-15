import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, Lora, DM_Mono } from "next/font/google";
import { SmoothHashLinks } from "@/components/SmoothHashLinks";
import { siteName, siteUrl, spacedSiteName } from "@/lib/seo";
import "./globals.css";

/* Body text - Barlow Regular/Medium/SemiBold */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/* Headings - Barlow Semi Condensed, more impactful than full-width */
const barlowHeading = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

/* Accent serif - Lora for testimonial quotes, founder story, pull quotes */
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/* Mono - kept for code/labels/badges */
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ShopSherpa Scam Detection & Phishing Protection",
    template: "%s",
  },

  // First 50 words follow the Direct Answer Box pattern for AI Overview eligibility
  description:
    "ShopSherpa is a free scam detection browser extension that catches fake sellers, phishing emails, risky checkouts, and fraudulent listings before you pay.",

  keywords: [
    "ShopSherpa",
    "Shop Sherpa",
    "shopping scam protection",
    "fake seller detection",
    "phishing protection browser extension",
  ],

  authors: [{ name: "Anghelo Araujo Lazaro", url: `${siteUrl}/team` }],
  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "ShopSherpa - Stop Scams Before You Pay",
    description:
      "Detects phishing emails, flags fake sellers, and masks your card number. Free browser extension. One-time $9.99 lifetime pre-order.",
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "ShopSherpa - Online Shopping Safety Layer" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopSherpa - Stop Scams Before You Pay",
    description: "Phishing shield + fake review detector + masked cards. One-time $9.99 pre-order.",
    images: ["/og-image.svg"],
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
   1. SoftwareApplication - product listing with price, for rich results
   2. Organization       - brand entity with contact + social signals
   3. Person             - founder E-E-A-T (Experience, Expertise, Authority, Trust)
   4. FAQPage            - targets Featured Snippets and AI Overview pull-quotes
─────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      "name": "ShopSherpa",
      "alternateName": ["Shop Sherpa"],
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
        "description": "Lifetime pre-order - no subscription",
        "availability": "https://schema.org/PreOrder",
      },
      "publisher": { "@id": `${siteUrl}/#organization` },
    },

    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "ShopSherpa",
      "alternateName": [spacedSiteName],
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`,
        "width": 130,
        "height": 130,
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "anghelobusiness@gmail.com",
        "telephone": "+1-603-514-8595",
        "contactType": "customer support",
        "availableLanguage": "English",
      },
      "founder": { "@id": `${siteUrl}/#founder` },
      "sameAs": [
        "https://x.com/shop_sherpa",
        "https://www.linkedin.com/company/shopsherpa",
        "https://www.instagram.com/shop_sherpa/",
      ],
    },

    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#local-business`,
      "name": siteName,
      "alternateName": spacedSiteName,
      "url": siteUrl,
      "image": `${siteUrl}/logo.svg`,
      "telephone": "+1-603-514-8595",
      "email": "anghelobusiness@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nashua",
        "addressRegion": "NH",
        "addressCountry": "US",
      },
      "parentOrganization": { "@id": `${siteUrl}/#organization` },
      "sameAs": [
        "https://x.com/shop_sherpa",
        "https://www.linkedin.com/company/shopsherpa",
        "https://www.instagram.com/shop_sherpa/",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "name": siteName,
      "alternateName": spacedSiteName,
      "url": siteUrl,
      "publisher": { "@id": `${siteUrl}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/blog?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      "name": "Anghelo Araujo Lazaro",
      "jobTitle": "Founder & CEO",
      "url": `${siteUrl}/team`,
      "sameAs": [
        "https://www.linkedin.com/in/angheloaraujolazaro/",
        "https://github.com/H0n3st1y",
      ],
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
              "ShopSherpa scans your inbox for emails that impersonate real brands - such as fake Amazon shipping notices, PayPal alerts, or package redelivery fee requests. It checks sender domains, link destinations, and language patterns against a database of known phishing signatures and flags suspicious messages before you open them.",
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
              "ShopSherpa processes email headers and sender metadata locally in your browser. It does not store, transmit, or share your email content. Your real card number is replaced by a masked alias - ShopSherpa never sees your actual card details.",
          },
        },
        {
          "@type": "Question",
          "name": "How is ShopSherpa different from Fakespot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Fakespot focuses on Amazon review authenticity. ShopSherpa is broader: it covers phishing emails, fake marketplace sellers across multiple platforms, masked card payments, and real-time scam alerts - all in one extension.",
          },
        },
      ],
    },

    {
      "@type": "HowTo",
      "@id": `${siteUrl}/#howto-detect-scam`,
      "name": "How to detect if an online store is a scam",
      "description": "Step-by-step guide to identifying fraudulent online stores before you pay.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Check the domain age and registration",
          "text": "Newly registered domains (less than 6 months old) are a strong scam signal. Use a WHOIS lookup or install ShopSherpa, which checks this automatically.",
        },
        {
          "@type": "HowToStep",
          "name": "Look for missing or fake contact information",
          "text": "Scam stores typically have no phone number, a generic Gmail address, or a copied privacy policy. Legitimate stores have verifiable contact pages.",
        },
        {
          "@type": "HowToStep",
          "name": "Analyze the reviews for bot-like patterns",
          "text": "Fake reviews use repetitive language, post in clusters, and often have no purchase history. ShopSherpa scans 1,800+ fraud patterns to detect these automatically.",
        },
        {
          "@type": "HowToStep",
          "name": "Verify the checkout domain matches the store",
          "text": "If the URL changes to an unfamiliar domain at checkout, leave immediately. ShopSherpa alerts you when checkout domains do not match the store you are browsing.",
        },
        {
          "@type": "HowToStep",
          "name": "Use a masked card number for first purchases",
          "text": "For new stores you are unsure about, use a virtual or masked card number so your real card details are never exposed. ShopSherpa Plus provides one masked number per store.",
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
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MXGFXT4M');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXGFXT4M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SmoothHashLinks />
        {children}
      </body>
    </html>
  );
}
