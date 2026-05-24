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

  const sizeClass = size === "sm" ? "btn--sm" : "";
  const colorClass = variant === "white" ? "btn-primary-inverse" : "btn-primary";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn ${colorClass} ${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? "Redirecting…" : "Pre-order Plus"}
    </button>
  );
}
