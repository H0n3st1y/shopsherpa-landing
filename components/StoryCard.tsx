"use client";

import { useRef, useState } from "react";

/**
 * StoryCard
 * Subtle 3D mouse-tilt card (max 4°) — dark variant for navy backgrounds.
 */
export function StoryCard({
  source,
  title,
}: {
  source: string;
  title: string;
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
      className="bg-[#142736] border border-white/10 rounded-2xl p-8 motion-reduce:!transform-none"
    >
      <p className="text-xs uppercase tracking-wider text-white/40 font-mono mb-4">{source}</p>
      <p className="text-xl md:text-2xl leading-snug font-medium text-white">{title}</p>
      <button className="mt-6 inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-[#1d9e75] text-white hover:bg-[#167a5a] transition-[transform,background-color] duration-150 active:scale-[0.98]">
        Read more →
      </button>
    </div>
  );
}
