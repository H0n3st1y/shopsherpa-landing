"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const PRODUCTS = [
  {
    eyebrow: "Procurement agent",
    title: "Sherpa finds the best deal and drafts the sheet.",
    description:
      "Give it a buying brief. Sherpa searches vendors, compares total landed cost, checks trust signals, and returns a spreadsheet with source links.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    className: "max-lg:rounded-t-[2rem] lg:col-span-3 lg:rounded-tl-[2rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Finance agent",
    title: "Finance Guru turns messy numbers into decisions.",
    description:
      "Upload exports, invoices, or spend data. It summarizes cash-flow risks, spend leaks, and practical next moves in plain English.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    className: "lg:col-span-3 lg:rounded-tr-[2rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Sales agent",
    title: "Caddy keeps follow-up moving after the call.",
    description:
      "Prep accounts, draft follow-ups, and turn scattered notes into the next action so customer work does not stall in the CRM.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    className: "lg:col-span-2 lg:rounded-bl-[2rem]",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Security hardware",
    title: "MiniUAV Guardian brings threat detection into a room.",
    description:
      "An autonomous indoor security quadrotor with ESP32 control, PIR motion sensing, and real-time Wi-Fi logs.",
    image:
      "https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=900&q=80",
    className: "lg:col-span-2",
    fade: ["bottom"] as ("top" | "bottom")[],
  },
  {
    eyebrow: "Consumer safety",
    title: "ShopSherpa stays focused on scam protection.",
    description:
      "The main product remains the free browser extension for fake sellers, fake reviews, phishing emails, and bad checkout domains.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
    className: "max-lg:rounded-b-[2rem] lg:col-span-2 lg:rounded-br-[2rem]",
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
            graphic={
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${product.image})` }}
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
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
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
        "group relative flex min-h-[30rem] flex-col overflow-hidden rounded-lg transform-gpu",
        "bg-[#0d1f2d] shadow-sm ring-1 ring-white/10",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15"
      )}
    >
      <div className="relative h-[29rem] shrink-0">
        {graphic}
        <div className="absolute inset-0 bg-[#0d1f2d]/30" />
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f2d] to-50% opacity-60" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2d] via-[#0d1f2d]/70 to-transparent" />
        )}
      </div>
      <div className="relative z-20 isolate mt-[-11.5rem] min-h-48 p-7 md:p-9 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-wider text-[#1d9e75] font-mono">{eyebrow}</p>
        <h3 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight leading-[1.05] text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-[620px] text-sm leading-6 text-white/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
