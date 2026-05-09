import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollFade } from "@/components/ScrollFade";

export const metadata: Metadata = {
  title: "Team | ShopSherpa",
  description: "Meet the people building ShopSherpa — the safety layer for online shopping.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#1a1a1a]/70">
            <Link href="/#how-it-works" className="hover:text-[#1a1a1a] transition">How it works</Link>
            <Link href="/#roadmap" className="hover:text-[#1a1a1a] transition">Roadmap</Link>
            <Link href="/team" className="text-[#2e6273] font-medium">Team</Link>
            <Link href="/blog" className="hover:text-[#1a1a1a] transition">Blog</Link>
          </nav>
          <Link
            href="/#cta"
            className="px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#2e6273] transition active:scale-[0.98]"
          >
            Pre-order $9.99
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-8 pt-24 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">The team</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1] mb-6 max-w-2xl">
              Built by people who got scammed.
            </h1>
          </ScrollFade>
          <ScrollFade delay={240}>
            <p className="text-[#1a1a1a]/60 text-lg max-w-lg leading-relaxed">
              We started ShopSherpa after getting burned online. This is personal, and that's exactly why we're building it right.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-6 md:px-8 py-24 bg-white border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-12 font-mono">Founder</p>
          </ScrollFade>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            <ScrollFade>
              <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden bg-[#FAF8F4] ring-4 ring-[#2e6273]/10">
                  <Image
                    src="/founder.png"
                    alt="Anghelo Araujo"
                    width={176}
                    height={176}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-[#1a1a1a] text-lg">Anghelo Araujo</p>
                  <p className="text-sm text-[#2e6273] font-mono mt-0.5">Founder & CEO</p>
                  <p className="text-xs text-[#1a1a1a]/40 font-mono mt-1">Nashua, NH · Age 16</p>
                </div>
              </div>
            </ScrollFade>

            <div className="flex-1">
              <ScrollFade delay={100}>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter leading-[1.1] mb-6">
                  He almost lost $600 to a fake puppy listing. That's why ShopSherpa exists.
                </h2>
              </ScrollFade>
              <ScrollFade delay={200}>
                <div className="space-y-4 text-[#1a1a1a]/65 text-base md:text-lg leading-relaxed">
                  <p>
                    When Anghelo was young, he found what looked like the perfect puppy listing online. The photos were real. The seller sent a contract. He nearly wired $600 before something felt off. The puppy never existed. The seller vanished.
                  </p>
                  <p>
                    That experience stuck. He spent years watching the same thing happen to people around him — fake storefronts, phishing emails, review-stuffed products. At 16, he decided to build the tool he wished existed.
                  </p>
                  <p>
                    ShopSherpa is his answer: a quiet, always-on shield that catches the scam before you pay.
                  </p>
                </div>
              </ScrollFade>
              <ScrollFade delay={300}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Browser Extensions", "Fraud Detection", "Consumer Safety", "ESP32 / Embedded"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-[#FAF8F4] border border-[#2e6273]/15 text-xs font-mono text-[#2e6273]">
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* CO-FOUNDERS */}
      <section className="px-6 md:px-8 py-24 bg-[#FAF8F4]">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Co-founders</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-4 max-w-xl">
              Growing the team.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base mb-16 max-w-lg leading-relaxed">
              We're actively looking for co-founders who care about consumer safety. If that's you, reach out.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Placeholder 1 */}
            <ScrollFade delay={100}>
              <CofounderPlaceholder
                slot={1}
                hint="Engineering · Security · AI"
              />
            </ScrollFade>
            {/* Placeholder 2 */}
            <ScrollFade delay={200}>
              <CofounderPlaceholder
                slot={2}
                hint="Growth · Marketing · Community"
              />
            </ScrollFade>
          </div>

          <ScrollFade delay={300}>
            <div className="mt-12 p-8 rounded-2xl bg-[#0d1f2d] text-white flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div>
                <p className="font-medium text-lg mb-1">Interested in co-founding ShopSherpa?</p>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  We're early, scrappy, and building something real. If you're passionate about keeping people safe online, let's talk.
                </p>
              </div>
              <a
                href="mailto:hello@shopsherpa.org"
                className="shrink-0 px-6 py-3 rounded-full bg-[#1d9e75] text-white text-sm font-medium hover:bg-[#167a5a] transition active:scale-[0.98] whitespace-nowrap"
              >
                Say hello
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo dark />
            <span className="font-medium text-white">ShopSherpa</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Security</a>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <Link href="/product" className="hover:text-white transition">MiniUAV</Link>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

function CofounderPlaceholder({ slot, hint }: { slot: number; hint: string }) {
  return (
    <div className="group bg-white border-2 border-dashed border-[#2e6273]/20 rounded-2xl p-8 hover:border-[#2e6273]/40 transition-colors duration-200">
      <div className="flex items-start gap-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF8F4] border-2 border-dashed border-[#2e6273]/20 flex items-center justify-center text-[#2e6273]/30 shrink-0">
          <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-[#1a1a1a]/30 text-lg">Co-founder #{slot}</p>
          <p className="text-xs font-mono text-[#2e6273]/50 mt-0.5">Position open</p>
        </div>
      </div>
      <p className="text-sm text-[#1a1a1a]/30 leading-relaxed mb-4">
        This seat is waiting for the right person. Someone who sees the problem and wants to own part of the solution.
      </p>
      <div className="flex flex-wrap gap-2">
        {hint.split(" · ").map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full bg-[#FAF8F4] border border-[#2e6273]/10 text-xs font-mono text-[#1a1a1a]/30">
            {t}
          </span>
        ))}
      </div>
    </div>
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
