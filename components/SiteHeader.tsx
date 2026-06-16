"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { PreorderButton } from "@/components/PreorderButton";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";

type HeaderVariant = "light" | "dark";
type ActivePage = "home" | "compare" | "team" | "blog" | "scam-directory";

export function SiteHeader({
  active = "home",
  variant = "light",
  cta = "preorder",
}: {
  active?: ActivePage;
  variant?: HeaderVariant;
  cta?: "preorder" | "waitlist" | "home";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dark = variant === "dark";
  const navText = dark ? "text-white/60" : "text-[#1a1a1a]/70";
  const hoverText = dark ? "hover:text-white" : "hover:text-[#1a1a1a]";
  const activeText = dark ? "text-white" : "text-[#2e6273]";

  const mobileLinkBase = dark
    ? "text-white/75 hover:text-white"
    : "text-[#1a1a1a]/75 hover:text-[#1a1a1a]";

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${dark ? "bg-[#0d1f2d]/82 border-white/10" : "bg-[#FAF8F4]/80 border-[#2e6273]/10"}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <Logo dark={dark} />
          <span className={`font-semibold text-base tracking-tight ${dark ? "text-white" : "text-[#1a1a1a]"}`}>ShopSherpa</span>
        </Link>

        <nav className={`hidden md:flex items-center gap-7 text-sm ${navText}`}>
          <NavLink href="/#how-it-works" active={active === "home"} className={`${active === "home" ? activeText : hoverText}`}>
            How it works
          </NavLink>
          <NavLink href="/compare" active={active === "compare"} className={`${active === "compare" ? activeText : hoverText}`}>
            Compare
          </NavLink>
          <NavLink href="/scam-directory" active={active === "scam-directory"} className={`${active === "scam-directory" ? activeText : hoverText}`}>
            Scam Directory
          </NavLink>
          <NavLink href="/#pricing" className={hoverText}>
            Pricing
          </NavLink>
          <NavLink href="/team" active={active === "team"} className={`${active === "team" ? activeText : hoverText}`}>
            Team
          </NavLink>
          <NavLink href="/blog" active={active === "blog"} className={`${active === "blog" ? activeText : hoverText}`}>
            Blog
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" defaultTheme={dark ? "dark" : "light"} duration={600} buttonSize={34} />
          <div className="hidden sm:block">
            <HeaderCta cta={cta} dark={dark} />
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden inline-flex size-9 items-center justify-center rounded-full border transition ${dark ? "border-white/15 text-white hover:bg-white/10" : "border-[#2e6273]/20 text-[#1a1a1a] hover:bg-[#2e6273]/10"}`}
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className={`md:hidden border-t ${dark ? "border-white/10 bg-[#0d1f2d]/95" : "border-[#2e6273]/10 bg-[#FAF8F4]/97"} backdrop-blur-md`}>
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1 text-base">
            {[
              { href: "/#how-it-works", label: "How it works" },
              { href: "/compare", label: "Compare" },
              { href: "/scam-directory", label: "Scam Directory" },
              { href: "/#pricing", label: "Pricing" },
              { href: "/team", label: "Team" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 transition ${mobileLinkBase}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <HeaderCta cta={cta} dark={dark} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  active = false,
  className,
  children,
}: {
  href: string;
  active?: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`transition ${className}`}>
      {children}
    </Link>
  );
}

function HeaderCta({ cta, dark }: { cta: "preorder" | "waitlist" | "home"; dark: boolean }) {
  if (cta === "preorder") {
    return (
      <div className="flex items-center gap-3">
        <Link href="/#cta" className={`hidden sm:inline text-sm transition ${dark ? "text-white/55 hover:text-white" : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"}`}>
          Join free waitlist
        </Link>
        <PreorderButton size="sm" />
      </div>
    );
  }

  if (cta === "waitlist") {
    return (
      <Link
        href="/#cta"
        className={`px-4 py-2 rounded-full text-sm font-medium transition active:scale-[0.98] ${dark ? "bg-white text-[#0d1f2d] hover:bg-[#F4F0E8]" : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"}`}
      >
        Join free waitlist
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`px-4 py-2 rounded-full text-sm font-medium transition active:scale-[0.98] ${dark ? "bg-white text-[#0d1f2d] hover:bg-[#F4F0E8]" : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"}`}
    >
      Back to home
    </Link>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  void dark;
  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-black/5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="ShopSherpa" width={24} height={24} className="size-full object-contain" />
    </span>
  );
}
