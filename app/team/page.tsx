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
              We started ShopSherpa after getting burned online. This is personal, and that&apos;s exactly why we&apos;re building it right.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* FOUNDER — ANGHELO */}
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
                    alt="Anghelo Araujo Lazaro"
                    width={176}
                    height={176}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-[#1a1a1a] text-lg">Anghelo Araujo Lazaro</p>
                  <p className="text-sm text-[#2e6273] font-mono mt-0.5">Founder &amp; CEO</p>
                  <p className="text-xs text-[#1a1a1a]/40 font-mono mt-1">Nashua, NH · Age 16</p>
                </div>
                {/* Social/credential links */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-2.5 py-1 rounded-full bg-[#0d1f2d] text-white text-xs font-mono">Harvard CS50</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#2e6273]/10 text-[#2e6273] text-xs font-mono">MIT Beaver Works</span>
                </div>
              </div>
            </ScrollFade>

            <div className="flex-1">
              <ScrollFade delay={100}>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter leading-[1.1] mb-6">
                  He watched his mom lose $600 to a fake puppy listing. That&apos;s why ShopSherpa exists.
                </h2>
              </ScrollFade>
              <ScrollFade delay={200}>
                <div className="space-y-4 text-[#1a1a1a]/65 text-base leading-relaxed font-serif">
                  <p>
                    After weeks of begging for a dog, the money was wired and the seller vanished. That emotional toll turned into a mission: building ShopSherpa, an AI-powered shield that stops marketplace fraud before it hits your wallet.
                  </p>
                  <p>
                    At 16, Anghelo is a multidisciplinary developer at Nashua High School South. He has completed Harvard&apos;s CS50 curricula and MIT Beaver Works programs, specializing in Quantum Software and Microelectronics. His technical portfolio ranges from financial modeling to autonomous hardware, most notably co-developing the MiniUAV Guardian, a security quadrotor with custom PCB architecture and real-time threat detection.
                  </p>
                  <p>
                    A state-level DECA competitor and former front-end intern at Rayfield Systems, Anghelo also holds leadership roles in Interact Rotary and competes in Track and Cross Country. He combines the grit of a student-athlete with the technical depth of an engineer to ensure no other family gets scammed online.
                  </p>
                </div>
              </ScrollFade>
              <ScrollFade delay={300}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Fraud Detection", "MIT Beaver Works", "MiniUAV Guardian", "DECA", "Rayfield Systems", "Interact Rotary", "Track & XC"].map((tag) => (
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
              The people making it real.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base mb-16 max-w-lg leading-relaxed">
              A small, focused team with deep roots in engineering and community. We move fast and we care about the people we protect.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-2 gap-6">

            {/* PRITHVI */}
            <ScrollFade delay={100}>
              <CofounderCard
                name="Prithvi Gupta"
                role="Tech Co-Founder"
                location="Nashua, NH · Age 15"
                imageSrc="/prithvi.png"
                imageAlt="Prithvi Gupta"
                bio="Prithvi is a sophomore at Nashua High School South with a deep focus on aerospace engineering and PCB design. He serves as Treasurer of UNICEF NH and is an active GitHub contributor — bringing real engineering discipline to ShopSherpa&apos;s technical stack."
                tags={["PCB Design", "Aerospace", "UNICEF NH", "GitHub", "DECA"]}
                highlights={[
                  { label: "Focus", value: "Aerospace / PCB" },
                  { label: "Role", value: "UNICEF NH Treasurer" },
                ]}
              />
            </ScrollFade>

            {/* MILAN */}
            <ScrollFade delay={200}>
              <CofounderCard
                name="Milan Joby"
                role="Co-Founder"
                location="Nashua, NH"
                imageSrc="/milan.jpg"
                imageAlt="Milan Joby"
                bio="Milan is an Interact Rotary club officer who has built and led volunteer programs reaching 100+ members. He placed 2nd in New Hampshire CDC at DECA, and competes in soccer and track. He brings the organizational and community-building muscle that turns a product into a movement."
                tags={["Interact Rotary", "DECA", "Community", "Soccer", "Track"]}
                highlights={[
                  { label: "DECA", value: "2nd Place NH CDC" },
                  { label: "Volunteers led", value: "100+" },
                ]}
              />
            </ScrollFade>

          </div>

          {/* Still looking */}
          <ScrollFade delay={300}>
            <div className="mt-12 p-8 rounded-2xl bg-[#0d1f2d] text-white flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div>
                <p className="font-medium text-lg mb-1">Want to join the team?</p>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  We&apos;re early, scrappy, and building something real. If you care about keeping people safe online, let&apos;s talk.
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

/* ─── CofounderCard ─────────────────────────────────────── */

interface Highlight {
  label: string;
  value: string;
}

function CofounderCard({
  name,
  role,
  location,
  imageSrc,
  imageAlt,
  bio,
  tags,
  highlights,
}: {
  name: string;
  role: string;
  location: string;
  imageSrc: string | null;
  imageAlt: string;
  bio: string;
  tags: string[];
  highlights: Highlight[];
}) {
  return (
    <div className="bg-white border border-[#2e6273]/10 rounded-2xl p-8 card-hover">
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FAF8F4] ring-2 ring-[#2e6273]/10 shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={64}
              height={64}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2e6273]/30">
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#1a1a1a] text-lg leading-tight">{name}</p>
          <p className="text-sm text-[#2e6273] font-mono mt-0.5">{role}</p>
          <p className="text-xs text-[#1a1a1a]/40 font-mono mt-1">{location}</p>
        </div>
      </div>

      {/* Highlight stats */}
      <div className="flex gap-4 mb-5">
        {highlights.map((h) => (
          <div key={h.label} className="px-3 py-2 rounded-xl bg-[#FAF8F4] flex-1 text-center">
            <p className="text-xs text-[#1a1a1a]/40 font-mono mb-0.5">{h.label}</p>
            <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{h.value}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mb-5 font-serif" dangerouslySetInnerHTML={{ __html: bio }} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full bg-[#FAF8F4] border border-[#2e6273]/10 text-xs font-mono text-[#2e6273]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Logo ──────────────────────────────────────────────── */

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
