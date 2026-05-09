"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroShapes
 * Floating SVG shapes with two animations:
 *  1. Parallax on scroll — each shape translates up to 30px based on scroll position.
 *  2. Cursor follow (desktop only) — shapes drift toward the cursor with a damped spring,
 *     max 15px offset. Mobile devices skip cursor follow (matchMedia pointer: fine).
 * Both effects use only `transform` (GPU-accelerated, 60fps).
 * Honors prefers-reduced-motion: when set, no transforms are applied.
 */
export function HeroShapes() {
  const ref = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  // Smoothed cursor + scroll values stored in refs to avoid re-renders.
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const scrollSmoothed = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const onMouse = (e: MouseEvent) => {
      if (!isFinePointer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Normalize -1..1 then scale.
      target.current.x = ((e.clientX / w) - 0.5) * 2;
      target.current.y = ((e.clientY / h) - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      // Damped lerp toward cursor target.
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;
      scrollSmoothed.current += (scrollY.current - scrollSmoothed.current) * 0.1;

      const svg = ref.current;
      if (svg) {
        const groups = svg.querySelectorAll<SVGGElement>("[data-shape]");
        groups.forEach((g) => {
          const depth = parseFloat(g.dataset.depth || "1");
          const cx = current.current.x * 15 * depth;
          const cy = current.current.y * 15 * depth;
          // Parallax: shapes drift up to 30px based on scroll progress within hero.
          const py = -Math.min(scrollSmoothed.current * 0.08, 30) * depth;
          g.style.transform = `translate(${cx}px, ${cy + py}px)`;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g data-shape data-depth="1.2" style={{ transformOrigin: "center", willChange: "transform" }}>
        <g transform="translate(180 140) rotate(-8)">
          <rect x="0" y="40" width="100" height="120" rx="10" fill="#F4F0E8" stroke="white" strokeWidth="2" />
          <path d="M28 40 Q28 12 50 12 Q72 12 72 40" stroke="white" strokeWidth="3" fill="none" />
        </g>
      </g>
      <g data-shape data-depth="0.8" style={{ willChange: "transform" }}>
        <g transform="translate(950 120) rotate(12)">
          <rect x="0" y="40" width="80" height="68" rx="8" fill="#1d9e75" />
          <path d="M16 40 V24 Q16 4 40 4 Q64 4 64 24 V40" stroke="#1d9e75" strokeWidth="6" fill="none" />
          <circle cx="40" cy="74" r="5" fill="white" />
        </g>
      </g>
      <g data-shape data-depth="1.5" style={{ willChange: "transform" }}>
        <g transform="translate(880 540) rotate(-15)">
          <rect x="0" y="0" width="120" height="80" rx="6" fill="#1f4a58" stroke="white" strokeWidth="2" />
          <path d="M0 0 L60 50 L120 0" stroke="white" strokeWidth="2" fill="none" />
        </g>
      </g>
      <g data-shape data-depth="0.9" style={{ willChange: "transform" }}>
        <g transform="translate(120 540) rotate(8)">
          <rect x="0" y="0" width="140" height="90" rx="10" fill="#0d1f2d" stroke="white" strokeWidth="2" />
          <rect x="14" y="62" width="60" height="6" rx="2" fill="white" opacity="0.6" />
          <circle cx="118" cy="20" r="6" fill="#1d9e75" />
        </g>
      </g>
      <g data-shape data-depth="1.1" style={{ willChange: "transform" }}>
        <g transform="translate(560 80) rotate(-20)">
          <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="4" fill="#2e6273" />
          <line x1="68" y1="68" x2="100" y2="100" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>
      <g data-shape data-depth="0.7" style={{ willChange: "transform" }}>
        <g transform="translate(560 600) rotate(6)">
          <path
            d="M0 0 L80 0 L80 50 Q80 90 40 110 Q0 90 0 50 Z"
            fill="#F4F0E8"
            stroke="white"
            strokeWidth="2"
          />
          <path d="M22 50 L36 64 L60 38" stroke="#1d9e75" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}
