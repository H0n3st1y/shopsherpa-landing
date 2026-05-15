"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PhishingDemo - the showpiece moment.
 * When scrolled into view, a sealed envelope animates open, the suspicious
 * sender details slide up, and a red "FLAGGED" badge slides in from the right.
 * Triggers ONCE per page session via IntersectionObserver.
 *
 * Animation timeline (stage indices):
 *   0  envelope sealed (initial)
 *   1  flap rotates open  (~200ms after intersect)
 *   2  email body slides up + sender shown (~700ms)
 *   3  FLAGGED badge slides in (~1300ms)
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
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stage]);

  return (
    <div
      ref={ref}
      className="relative bg-[#142736] border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden md:col-span-2"
    >
      <p className="text-xs uppercase tracking-wider text-white/40 font-mono mb-6">
        Last Tuesday · Maria · saved $312
      </p>

      <div className="flex items-start gap-6 md:gap-10">
        {/* Envelope graphic */}
        <div
          className="relative shrink-0"
          style={{
            width: 110,
            height: 80,
            perspective: "600px",
          }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 bg-[#F4F0E8] rounded-md border border-white/20" />
          {/* Inner letter - peeks out at stage >= 2 */}
          <div
            className="absolute left-1.5 right-1.5 bottom-1.5 bg-white rounded-sm shadow-sm"
            style={{
              top: stage >= 2 ? -12 : 8,
              opacity: stage >= 2 ? 1 : 0,
              transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {/* Flap - rotates at stage >= 1 */}
          <div
            className="absolute top-0 left-0 right-0 origin-top"
            style={{
              height: 50,
              background:
                "linear-gradient(135deg, #f4f0e8 0%, #e5dfd0 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: stage >= 1 ? "rotateX(180deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Email content */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              opacity: stage >= 2 ? 1 : 0,
              transform: stage >= 2 ? "translateY(0)" : "translateY(12px)",
              transition: "all 500ms ease-out 100ms",
            }}
          >
            <p className="text-xs font-mono text-white/40 mb-1">FROM</p>
            <p className="font-mono text-sm text-white/90 break-all">
              tracking@am4z0n-delivery.shop
            </p>
            <p className="text-xs font-mono text-white/40 mt-3 mb-1">SUBJECT</p>
            <p className="text-base md:text-lg text-white/95 leading-snug">
              Your $312 package needs a redelivery fee. Confirm now.
            </p>
          </div>
        </div>

        {/* FLAGGED badge - slides in from the right at stage >= 3 */}
        <div
          className="absolute top-6 right-6 md:top-8 md:right-8"
          style={{
            transform: stage >= 3 ? "translateX(0)" : "translateX(120%)",
            opacity: stage >= 3 ? 1 : 0,
            transition:
              "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out",
          }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-mono font-medium tracking-wider uppercase shadow-lg shadow-red-500/30">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            Flagged
          </span>
        </div>
      </div>

      <p
        className="mt-6 text-sm text-white/60 leading-relaxed max-w-xl"
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transition: "opacity 600ms ease-out 200ms",
        }}
      >
        Spoofed sender domain. Pressure language. Payment ask. ShopSherpa caught
        all three signals before Maria opened it.
      </p>
    </div>
  );
}
