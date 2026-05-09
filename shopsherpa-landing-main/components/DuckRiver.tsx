"use client";

import { useState } from "react";

/**
 * DuckRiver
 * A whimsical horizontal river that drifts across the page.
 * Several rubber duckies float along at different speeds, bobbing as they go.
 * Click any duck → a "Quack!" speech bubble pops up briefly above it.
 * No audio. Just vibes.
 */
const DUCKS = [
  { id: 1, top: 40, size: 56, speed: 22, delay: 0,    bobDelay: 0.0 },
  { id: 2, top: 18, size: 44, speed: 28, delay: -8,   bobDelay: 0.3 },
  { id: 3, top: 62, size: 48, speed: 24, delay: -14,  bobDelay: 0.6 },
  { id: 4, top: 32, size: 40, speed: 30, delay: -20,  bobDelay: 0.9 },
  { id: 5, top: 70, size: 52, speed: 26, delay: -5,   bobDelay: 1.2 },
];

const QUACKS = ["Quack!", "Quack quack.", "Hi.", "🦆"];

export function DuckRiver() {
  const [bubbles, setBubbles] = useState<Record<number, { text: string; key: number }>>({});

  const onDuckClick = (id: number) => {
    const text = QUACKS[Math.floor(Math.random() * QUACKS.length)];
    const key = Date.now();
    setBubbles((b) => ({ ...b, [id]: { text, key } }));
    setTimeout(() => {
      setBubbles((b) => {
        const next = { ...b };
        if (next[id]?.key === key) delete next[id];
        return next;
      });
    }, 1600);
  };

  return (
    <div className="relative w-full overflow-hidden h-44 md:h-56" aria-hidden="false">
      {/* Water gradient + waves */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a8092] via-[#2e6273] to-[#1f4a58]" />
      {/* Wave SVG layered on top for ripples */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-full opacity-40"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 Q150 40 300 60 T600 60 T900 60 T1200 60 V0 H0 Z"
          fill="rgba(244,240,232,0.15)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0 60 Q150 40 300 60 T600 60 T900 60 T1200 60 V0 H0 Z;
              M0 60 Q150 80 300 60 T600 60 T900 60 T1200 60 V0 H0 Z;
              M0 60 Q150 40 300 60 T600 60 T900 60 T1200 60 V0 H0 Z
            "
          />
        </path>
        <path
          d="M0 120 Q150 100 300 120 T600 120 T900 120 T1200 120 V200 H0 Z"
          fill="rgba(13,31,45,0.25)"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0 120 Q150 100 300 120 T600 120 T900 120 T1200 120 V200 H0 Z;
              M0 120 Q150 140 300 120 T600 120 T900 120 T1200 120 V200 H0 Z;
              M0 120 Q150 100 300 120 T600 120 T900 120 T1200 120 V200 H0 Z
            "
          />
        </path>
      </svg>

      {/* Ducks */}
      {DUCKS.map((d) => (
        <button
          key={d.id}
          onClick={() => onDuckClick(d.id)}
          aria-label="Pet the duck"
          className="absolute cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-full"
          style={{
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animation: `duckDrift ${d.speed}s linear ${d.delay}s infinite`,
            // CSS variables aren't strictly needed here, plain values work.
          }}
        >
          <span
            className="block w-full h-full"
            style={{ animation: `duckBob 1.6s ease-in-out ${d.bobDelay}s infinite` }}
          >
            <Duck />
          </span>
          {bubbles[d.id] && (
            <span
              key={bubbles[d.id].key}
              className="absolute left-1/2 -top-9 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white text-[#1a1a1a] text-xs font-medium font-mono shadow-md whitespace-nowrap quack-bubble"
            >
              {bubbles[d.id].text}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-white rotate-45" />
            </span>
          )}
        </button>
      ))}

      <style jsx>{`
        @keyframes duckDrift {
          0%   { transform: translateX(-10vw); }
          100% { transform: translateX(110vw); }
        }
        @keyframes duckBob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-6px) rotate(2deg); }
        }
        .quack-bubble {
          animation: bubbleIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translate(-50%, 6px) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          button[aria-label="Pet the duck"] { animation: none !important; }
          button[aria-label="Pet the duck"] > span { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Duck() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      {/* Body */}
      <ellipse cx="34" cy="42" rx="22" ry="14" fill="#FFD54F" />
      {/* Tail */}
      <path d="M12 38 L4 32 L12 46 Z" fill="#FFC107" />
      {/* Head */}
      <circle cx="46" cy="28" r="11" fill="#FFD54F" />
      {/* Wing */}
      <path d="M28 38 Q34 30 44 36 Q40 46 28 44 Z" fill="#FFC107" />
      {/* Eye */}
      <circle cx="48" cy="26" r="1.6" fill="#1a1a1a" />
      {/* Beak */}
      <path d="M52 28 L62 26 L62 32 L52 32 Z" fill="#FF9800" />
      {/* Water reflection */}
      <ellipse cx="34" cy="56" rx="16" ry="2" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}
