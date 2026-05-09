"use client";

import { useState } from "react";

/**
 * WaitlistForm
 * Email capture with two animation touches:
 *  - Input border animates teal on focus (200ms).
 *  - On focus, the parent (CTA section) triggers a subtle hue shift via the
 *    `data-cta-focused` attribute on <body>, picked up by globals.css.
 *  - Submit button gets active:scale-[0.98] for tactile feedback.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. Check your email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="px-6 py-5 rounded-full bg-white text-[#1a1a1a] animate-[scrollFadeIn_500ms_ease-out_both]">
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-full border-2 transition-[border-color,box-shadow] duration-200 ${
          focused
            ? "border-[#2e6273] shadow-[0_0_0_4px_rgba(46,98,115,0.15)]"
            : "border-transparent"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => {
            setFocused(true);
            document.body.dataset.ctaFocused = "true";
          }}
          onBlur={() => {
            setFocused(false);
            delete document.body.dataset.ctaFocused;
          }}
          placeholder="Your email address"
          disabled={status === "loading"}
          className="flex-1 px-5 py-3 rounded-full bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-black/80 transition-[transform,background-color] duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "Adding..." : "Get notified"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-sm text-white mt-3">{message}</p>
      )}
    </div>
  );
}
