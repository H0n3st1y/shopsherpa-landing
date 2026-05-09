"use client";

import { useState } from "react";

export function PreorderButton({
  variant = "default",
  size = "md",
}: {
  variant?: "default" | "white";
  size?: "sm" | "md";
}) {
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

  const sizeClasses = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3.5 text-sm";
  const colorClasses =
    variant === "white"
      ? "bg-white text-[#2e6273] hover:bg-[#F4F0E8]"
      : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-full font-medium transition-[transform,background-color] duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${sizeClasses} ${colorClasses}`}
    >
      {loading ? "Redirecting..." : "Pre-order lifetime — $9.99"}
    </button>
  );
}
