"use client";

import { useState } from "react";

export function PreorderButton({ variant = "default" }: { variant?: "default" | "white" }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Could not start checkout. Try again.");
        setLoading(false);
      }
    } catch {
      alert("Network error. Try again.");
      setLoading(false);
    }
  }

  if (variant === "white") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full px-6 py-3.5 rounded-full bg-white text-[var(--color-teal)] font-semibold hover:bg-[var(--color-bg-alt)] transition disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Pre-order lifetime — $9.99"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-6 py-3.5 rounded-full bg-[var(--color-teal)] text-white font-medium hover:bg-[var(--color-teal-deep)] transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting..." : "Pre-order lifetime — $9.99"}
    </button>
  );
}
