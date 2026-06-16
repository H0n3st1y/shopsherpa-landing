"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const PRODUCTS = [
  {
    eyebrow: "Scam Directory",
    title: "Check suspicious stores before you enter a card.",
    description:
      "Search common scam patterns, risky domain signals, phishing tricks, and seller warning signs in plain English.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Spreadsheet-style scam directory and online store safety checks",
    href: "/scam-directory",
    cta: "Search the directory",
    className: "max-lg:rounded-t-[1.5rem] lg:col-span-3 lg:rounded-tl-[1.5rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Fake store checks",
    title: "Understand why a checkout page feels off.",
    description:
      "Learn how domain mismatch, unrealistic discounts, missing policies, and payment pressure combine into risk.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Online checkout and fraud signal analysis",
    href: "/scam-directory/too-cheap-clearance-store",
    cta: "View warning signs",
    className: "lg:col-span-3 lg:rounded-tr-[1.5rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Phishing examples",
    title: "Spot fake delivery and order emails faster.",
    description:
      "See the sender, link, urgency, and payment cues that make a message risky before you click.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Phishing email and fake delivery message safety check",
    href: "/scam-directory/brand-delivery-fee-texts",
    cta: "Review examples",
    className: "lg:col-span-3 lg:rounded-bl-[1.5rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Consumer safety",
    title: "ShopSherpa stays focused on scam protection.",
    description:
      "The main product remains the free browser extension for fake sellers, fake reviews, phishing emails, and bad checkout domains.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Secure online checkout protection for the ShopSherpa browser extension",
    href: "/",
    cta: "Visit ShopSherpa",
    className: "max-lg:rounded-b-[1.5rem] lg:col-span-3 lg:rounded-br-[1.5rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
];

export default function FUIBentoGridDark() {
  return (
    <div className="mx-auto w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        {PRODUCTS.map((product) => (
          <BentoCard
            key={product.title}
            eyebrow={product.eyebrow}
            title={product.title}
            description={product.description}
            href={product.href}
            cta={product.cta}
            graphic={
              <img
                src={product.image}
                alt={product.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            }
            className={product.className}
            fade={product.fade}
          />
        ))}
      </div>
    </div>
  );
}

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  href,
  cta,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
  href: string;
  cta: string;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex min-h-[16rem] flex-col overflow-hidden rounded-lg transform-gpu",
        "bg-[#0d1f2d] shadow-sm ring-1 ring-white/10",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
      )}
    >
      <div className="relative h-[15rem] shrink-0">
        {graphic}
        <div className="absolute inset-0 bg-[#0d1f2d]/30" />
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f2d] to-50% opacity-60" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2d] via-[#0d1f2d]/70 to-transparent" />
        )}
      </div>
      <div className="relative z-20 isolate mt-[-7rem] min-h-28 p-5 md:p-6 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-wider text-[#1d9e75] font-mono">{eyebrow}</p>
        <h3 className="mt-2 text-xl md:text-2xl font-medium tracking-tight leading-[1.08] text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-[620px] text-sm leading-6 text-white/70">
          {description}
        </p>
        <a
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/15"
        >
          {cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.div>
  );
}
