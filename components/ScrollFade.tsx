"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

/**
 * ScrollFade
 * Wraps any node and fades it up + slightly translates when it enters the viewport.
 * Uses IntersectionObserver - no library, ~1KB JS.
 * Triggers ONCE per element. Respects prefers-reduced-motion via the parent CSS variables.
 */
export function ScrollFade({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`scroll-fade ${visible ? "scroll-fade--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
