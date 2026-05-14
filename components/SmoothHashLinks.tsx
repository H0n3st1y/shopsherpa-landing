"use client";

import { useEffect } from "react";

export function SmoothHashLinks() {
  useEffect(() => {
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        const section = document.querySelector(window.location.hash);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href);
      const current = new URL(window.location.href);
      const isSamePage =
        url.origin === current.origin &&
        url.pathname === current.pathname &&
        url.search === current.search;

      if (!isSamePage || !url.hash) return;

      const section = document.querySelector(url.hash);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
