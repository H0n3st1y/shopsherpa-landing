"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ChatDemo - interactive live preview of the ShopSherpa AI agent.
 * Auto-plays a scripted conversation when scrolled into view, with realistic
 * typing indicators and message-bubble pop-ins. Users can click "Try it" to
 * type their own message and get a canned reply.
 */

type Msg = { role: "user" | "agent"; text: string; delay: number };

const SCRIPT: Msg[] = [
  { role: "user",  text: "Hey, do you have these in size 9?", delay: 800 },
  { role: "agent", text: "Yes - the Cloudfoam Runners are in stock in size 9. Want me to add a pair to your cart?", delay: 1400 },
  { role: "user",  text: "What's your return policy?", delay: 1100 },
  { role: "agent", text: "Free returns within 30 days, no questions asked. I can email you the prepaid label if you ever need it.", delay: 1500 },
  { role: "user",  text: "Okay - add to cart and apply a first-time code if you have one", delay: 1300 },
  { role: "agent", text: "Done. WELCOME10 applied - you saved $12.99. Ready to check out?", delay: 1400 },
];

const CANNED_REPLIES = [
  "Great question - happy to help with that.",
  "I can do that for you right now. Want me to walk you through it?",
  "Yes - we ship to 40+ countries with free returns. Want a shipping estimate?",
  "Let me check that for you.",
];

export function ChatDemo() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Trigger when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Play scripted messages
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let idx = 0;
    const next = () => {
      if (cancelled || idx >= SCRIPT.length) return;
      const msg = SCRIPT[idx];
      if (msg.role === "agent") setTyping(true);
      setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setShown((s) => [...s, msg]);
        idx++;
        setTimeout(next, msg.role === "user" ? 600 : 1200);
      }, msg.delay);
    };
    next();
    return () => {
      cancelled = true;
    };
  }, [visible]);

  // Autoscroll within chat
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  const sendUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input, delay: 0 };
    setShown((s) => [...s, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
      setShown((s) => [...s, { role: "agent", text: reply, delay: 0 }]);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(13,31,45,0.18)] border border-[#2e6273]/10 overflow-hidden"
    >
      {/* Browser-style chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2e6273]/10 bg-[#FAF8F4]">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-mono text-[#1a1a1a]/50">shopsherpa.org</span>
        </div>
      </div>

      {/* Agent header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2e6273]/10">
        <div className="size-9 rounded-full bg-[#2e6273] text-white flex items-center justify-center font-serif font-semibold text-sm">
          SS
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#1a1a1a]">ShopSherpa Agent</p>
          <p className="text-xs text-[#1a1a1a]/50 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#1d9e75]" />
            Online · Replies instantly
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-80 overflow-y-auto px-5 py-4 space-y-3 bg-[#FAF8F4]">
        {shown.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} chat-pop`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-snug ${
                m.role === "user"
                  ? "bg-[#2e6273] text-white rounded-br-sm"
                  : "bg-white text-[#1a1a1a] border border-[#2e6273]/10 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start chat-pop">
            <div className="bg-white border border-[#2e6273]/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              <span className="size-1.5 rounded-full bg-[#2e6273]/50 typing-dot" />
              <span className="size-1.5 rounded-full bg-[#2e6273]/50 typing-dot" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-[#2e6273]/50 typing-dot" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={sendUser} className="flex gap-2 p-3 border-t border-[#2e6273]/10 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try asking something…"
          className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F4] text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none focus:ring-2 focus:ring-[#2e6273]/30"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-full bg-[#2e6273] text-white text-sm font-medium hover:bg-[#1f4a58] transition active:scale-[0.98]"
        >
          Send
        </button>
      </form>

      <style jsx>{`
        @keyframes chatPop {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-pop { animation: chatPop 320ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes typingBob {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40%           { opacity: 1; transform: translateY(-3px); }
        }
        .typing-dot { animation: typingBob 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chat-pop, .typing-dot { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
