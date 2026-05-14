import Link from "next/link";
import type { ReactNode } from "react";
import { PreorderButton } from "@/components/PreorderButton";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";

type HeaderVariant = "light" | "dark";
type ActivePage = "home" | "lab" | "team" | "blog" | "product";

export function SiteHeader({
  active = "home",
  variant = "light",
  cta = "preorder",
}: {
  active?: ActivePage;
  variant?: HeaderVariant;
  cta?: "preorder" | "access" | "waitlist" | "home";
}) {
  const dark = variant === "dark";
  const navText = dark ? "text-white/60" : "text-[#1a1a1a]/70";
  const hoverText = dark ? "hover:text-white" : "hover:text-[#1a1a1a]";
  const activeText = dark ? "text-white" : "text-[#2e6273]";

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
          <NavLink href="/compare" className={hoverText}>
            Compare
          </NavLink>
          <NavLink href="/#pricing" className={hoverText}>
            Pricing
          </NavLink>
          <Link
            href="/lab"
            className={`lab-nav-bezel ${active === "lab" ? "lab-nav-bezel--active" : ""}`}
          >
            Lab
          </Link>
          <NavLink href="/team" active={active === "team"} className={`${active === "team" ? activeText : hoverText}`}>
            Team
          </NavLink>
          <NavLink href="/blog" active={active === "blog"} className={`${active === "blog" ? activeText : hoverText}`}>
            Blog
          </NavLink>
          <NavLink href="/product" active={active === "product"} className={`${active === "product" ? activeText : hoverText}`}>
            MiniUAV
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" defaultTheme={dark ? "dark" : "light"} duration={600} buttonSize={34} />
          <HeaderCta cta={cta} dark={dark} />
        </div>
      </div>
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

function HeaderCta({ cta, dark }: { cta: "preorder" | "access" | "waitlist" | "home"; dark: boolean }) {
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

  if (cta === "access") {
    return (
      <a
        href="mailto:hello@shopsherpa.org?subject=ShopSherpa%20Lab%20early%20access"
        className={`px-4 py-2 rounded-full text-sm font-medium transition active:scale-[0.98] ${dark ? "bg-white text-[#0d1f2d] hover:bg-[#F4F0E8]" : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"}`}
      >
        Request access
      </a>
    );
  }

  if (cta === "waitlist") {
    return (
      <Link
        href="/#cta"
        className={`px-4 py-2 rounded-full text-sm font-medium transition active:scale-[0.98] ${dark ? "bg-white text-[#0d1f2d] hover:bg-[#F4F0E8]" : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"}`}
      >
        Join waitlist
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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="ShopSherpa"
      width={32}
      height={32}
      className={`size-8 shrink-0 object-contain ${dark ? "brightness-0 invert" : ""}`}
    />
  );
}
