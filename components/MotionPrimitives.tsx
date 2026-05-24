"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * HeroWords
 * Splits a headline into words and staggers them in on mount.
 * Tier 1 motion — page-load choreography. One coordinated sequence.
 */
export function HeroWords({
  text,
  accentWord,
  accentClass = "text-[var(--c-teal)]",
  delay = 0,
  stagger = 60,
  className = "",
}: {
  text: string;
  accentWord?: string;
  accentClass?: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => {
        const isAccent = accentWord && w.replace(/[.,]/g, "") === accentWord;
        return (
          <span key={i} style={{ display: "inline-block" }}>
            <span
              className={`hero-word ${mounted ? "hero-word--in" : ""} ${isAccent ? accentClass : ""}`}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {w}
            </span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Reveal
 * Tier 2 motion — scroll-triggered fade-rise. Fires once.
 * Single curve, single duration. No stagger inside.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * CountUp
 * Animates an integer from 0 → value when it enters the viewport.
 * 720ms, ease-out. One-shot.
 */
export function CountUp({
  value,
  duration = 720,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
