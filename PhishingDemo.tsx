"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PhishingDemo
 * Staged animation: envelope flap opens → email content slides up → FLAGGED badge appears.
 * Fixed layout: stacks vertically on mobile so the envelope never overlaps text.
 * Letter stays inside the envelope body (no upward bleed that clips into surrounding content).
 */
export function PhishingDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && stage === 0) {
            setTimeout(() => setStage(1), 200);
            setTimeout(() => setStage(2), 700);
            setTimeout(() => setStage(3), 1300);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stage]);

  return (
    <div
      ref={ref}
      className="relative bg-[#142736] border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden"
    >
      {/* FLAGGED badge - absolute to card, sits in top-right corner */}
      <div
        className="absolute top-6 right-6 md:top-8 md:right-8 z-10"
        style={{
          transform: stage >= 3 ? "translateX(0)" : "translateX(140%)",
          opacity: stage >= 3 ? 1 : 0,
          transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out",
        }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-mono font-medium tracking-wider uppercase shadow-lg shadow-red-500/30">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          Flagged
        </span>
      </div>

      <p className="text-xs uppercase tracking-wider text-white/40 font-mono mb-7">
        Last Tuesday · Maria · saved $312
      </p>

      {/* Stack vertically on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-7 sm:gap-10">

        {/* Envelope - fixed height container so the letter peek stays clipped inside */}
        <div className="shrink-0 self-start" style={{ width: 110, height: 86, position: "relative", perspective: "600px" }}>
          {/* Body */}
          <div className="absolute inset-0 bg-[#F4F0E8] rounded-md border border-black/10" />
          {/* Inner letter - slides up but stays within envelope body */}
          <div
            className="absolute left-2 right-2 bottom-2 bg-white rounded-sm"
            style={{
              top: stage >= 2 ? 10 : 20,
              opacity: stage >= 2 ? 1 : 0,
              transition: "top 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
            }}
          />
          {/* Flap */}
          <div
            className="absolute top-0 left-0 right-0 origin-top"
            style={{
              height: 46,
              background: "linear-gradient(135deg, #f4f0e8 0%, #e0d9cc 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: stage >= 1 ? "rotateX(180deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Email content - fades in after flap opens */}
        <div
          className="flex-1 min-w-0 pr-20 sm:pr-0"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease-out 100ms, transform 500ms ease-out 100ms",
          }}
        >
          <p className="text-xs font-mono text-white/40 mb-1">FROM</p>
          <p className="font-mono text-sm text-white/90 break-all">
            tracking@am4z0n-delivery.shop
          </p>
          <p className="text-xs font-mono text-white/40 mt-4 mb-1">SUBJECT</p>
          <p className="text-base md:text-lg text-white/95 leading-snug">
            Your package needs a redelivery fee. Confirm now.
          </p>
        </div>
      </div>

      <p
        className="mt-7 text-sm text-white/55 leading-relaxed max-w-xl"
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transition: "opacity 600ms ease-out 200ms",
        }}
      >
        Spoofed sender domain. Pressure language. Payment ask. ShopSherpa caught all three before Maria opened it.
      </p>
    </div>
  );
}
