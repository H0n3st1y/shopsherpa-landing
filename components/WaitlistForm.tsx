"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
      <div className="px-6 py-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
        <p className="font-medium">Got it.</p>
        <p className="text-sm mt-1 text-emerald-800">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@gmail.com"
        disabled={status === "loading"}
        className="flex-1 px-5 py-3.5 rounded-full bg-[var(--color-card)] border border-[var(--color-line)] focus:border-[var(--color-teal)] outline-none transition disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3.5 rounded-full bg-[var(--color-teal)] text-white font-medium hover:bg-[var(--color-teal-deep)] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Adding..." : "Notify me"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 sm:col-span-2 mt-2">{message}</p>
      )}
    </form>
  );
}
