"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroHeadline
 * Splits the headline into words and fades each one up with an 80ms stagger.
 * Animation runs once on mount. Falls back gracefully without JS by showing all words.
 */
export function HeroHeadline({ lines }: { lines: string[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  let wordIndex = 0;
  return (
    <h1 className="text-[4rem] md:text-[8rem] leading-[0.95] font-medium tracking-tighter max-w-5xl mx-auto">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => {
            const i = wordIndex++;
            return (
              <span
                key={`${li}-${wi}`}
                className={`hero-word inline-block ${mounted ? "hero-word--in" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {word}
                {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
