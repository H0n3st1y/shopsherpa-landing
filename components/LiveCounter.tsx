"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LiveCounter
 * Renders a "scams detected today" counter that ticks upward by 1–3
 * every 3–7 seconds. Starts at a visible base (~47).
 * Pauses when the page is hidden to save battery.
 */
export function LiveCounter({ base = 47 }: { base?: number }) {
  const [count, setCount] = useState(base);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const schedule = () => {
      // Random delay 3000–7000ms.
      const delay = 3000 + Math.random() * 4000;
      timerRef.current = window.setTimeout(() => {
        if (!document.hidden) {
          // Increment 1–3.
          const inc = 1 + Math.floor(Math.random() * 3);
          setCount((c) => c + inc);
          setPulse(true);
          window.setTimeout(() => setPulse(false), 600);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[#2e6273]/15 shadow-[var(--shadow-soft)]">
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-[#1d9e75] opacity-60 ${
            pulse ? "animate-ping" : ""
          }`}
        />
        <span className="relative inline-flex rounded-full size-2 bg-[#1d9e75]" />
      </span>
      <span className="text-xs font-mono text-[#1a1a1a]/70 uppercase tracking-wider">
        Scams blocked today
      </span>
      <span
        className={`font-mono font-medium text-[#2e6273] tabular-nums transition-transform ${
          pulse ? "scale-110" : "scale-100"
        }`}
      >
        {count.toLocaleString()}
      </span>
    </div>
  );
}
