"use client";

import { useRef, useState } from "react";

/**
 * StoryCard
 * Subtle 3D mouse-tilt card (max 4°) using perspective + rotateX/Y.
 * Linen variant for light backgrounds.
 */
export function StoryCard({
  source,
  title,
  variant = "dark",
}: {
  source: string;
  title: string;
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 4, y: px * 4 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  const isLight = variant === "light";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 200ms ease-out",
        willChange: "transform",
      }}
      className={
        isLight
          ? "bg-white border border-[#2e6273]/15 rounded-2xl p-8 shadow-[var(--shadow-soft)] motion-reduce:!transform-none"
          : "bg-[#142736] border border-white/10 rounded-2xl p-8 motion-reduce:!transform-none"
      }
    >
      <p
        className={`text-xs uppercase tracking-wider font-mono mb-4 ${
          isLight ? "text-[#2e6273]" : "text-white/40"
        }`}
      >
        {source}
      </p>
      <p
        className={`text-xl md:text-2xl leading-snug font-medium ${
          isLight ? "text-[#1a1a1a]" : "text-white"
        }`}
      >
        {title}
      </p>
      <button
        className={`mt-6 inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-[transform,background-color] duration-150 active:scale-[0.98] ${
          isLight
            ? "bg-[#2e6273] text-white hover:bg-[#1f4a58]"
            : "bg-[#1d9e75] text-white hover:bg-[#167a5a]"
        }`}
      >
        Read more →
      </button>
    </div>
  );
}
