import type { Metadata } from "next";
import Link from "next/link";
import { ScrollFade } from "@/components/ScrollFade";
import { SherpaWorkflowDemo } from "@/components/SherpaWorkflowDemo";
import { SiteHeader } from "@/components/SiteHeader";
import FUIBentoGridDark from "@/components/ui/bento";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ShopSherpa Lab | One-Click Business Agents",
  description:
    "ShopSherpa Lab, also written Shop Sherpa Lab, builds one-click agents for business workflows, starting with Sherpa: an internet research agent for deal research.",
  path: "/lab",
  keywords: ["ShopSherpa Lab", "Shop Sherpa Lab", "one-click business agents", "Sherpa research agent"],
});

const USE_CASES = [
  "Office supplies and equipment buying",
  "Vendor comparison for small businesses",
  "Recurring purchasing checks",
  "Finance cleanup and monthly reviews",
  "Sales follow-up and account prep",
  "Founder ops work without a full ops team",
];

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased overflow-x-hidden">
      <SiteHeader active="lab" cta="access" />

      <section className="relative overflow-hidden px-6 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        <div aria-hidden className="absolute -top-40 right-[-10%] size-[520px] rounded-full bg-[#2e6273]/8 blur-3xl blob-float" />
        <div aria-hidden className="absolute bottom-0 left-[-8%] size-80 rounded-full bg-[#1d9e75]/8 blur-3xl blob-float-slow" />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollFade>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2e6273]/15 bg-white px-3 py-1.5 text-xs font-mono text-[#2e6273] mb-8">
              <span className="size-1.5 rounded-full bg-[#1d9e75] pulse-dot" />
              ShopSherpa Lab · agent experiments
            </div>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h1 className="lab-hero-bezel text-5xl md:text-7xl lg:text-[5.6rem] font-semibold tracking-tighter leading-[0.98] max-w-4xl">
              Agents that return work,{" "}
              <span className="text-[#2e6273] sketch-underline">not chat.</span>
            </h1>
          </ScrollFade>
          <ScrollFade delay={220}>
            <p className="mt-7 text-lg md:text-xl text-[#1a1a1a]/65 max-w-2xl leading-relaxed">
              The Lab is where we turn useful AI agents into one-click business tools. Start with a goal, press run, and get a finished artifact: a sheet, a brief, a follow-up, or a decision.
            </p>
          </ScrollFade>
          <ScrollFade delay={320}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#sherpa"
                className="px-6 py-3.5 rounded-full bg-[#1a1a1a] text-white font-medium text-sm hover:bg-[#2e6273] transition active:scale-[0.98] text-center"
              >
                See Sherpa run
              </a>
              <a
                href="#agents"
                className="px-6 py-3.5 rounded-full bg-white text-[#1a1a1a] border border-[#2e6273]/15 font-medium text-sm hover:border-[#2e6273]/40 transition active:scale-[0.98] text-center"
              >
                Explore the agent lab
              </a>
            </div>
          </ScrollFade>

          <ScrollFade delay={420}>
            <div className="mt-14 grid sm:grid-cols-3 gap-3 max-w-3xl">
              <HeroStat value="1 click" label="from brief to output" />
              <HeroStat value="Sheets" label="instead of chat threads" />
              <HeroStat value="B2B first" label="built for real workflows" />
            </div>
          </ScrollFade>
        </div>
      </section>

      <section id="sherpa" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-35" aria-hidden />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-16 items-center">
            <div>
              <ScrollFade>
                <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">First agent · Sherpa</p>
              </ScrollFade>
              <ScrollFade delay={120}>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-6">
                  Best deals, drafted into a sheet.
                </h2>
              </ScrollFade>
              <ScrollFade delay={220}>
                <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8">
                  Sherpa is for businesses that waste hours comparing vendors, prices, shipping terms, and trust signals. It does the internet work, then hands back a decision-ready spreadsheet.
                </p>
              </ScrollFade>
              <ScrollFade delay={320}>
                <div className="space-y-3">
                  {["No prompt engineering", "Source links included", "Designed for purchasing decisions"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                      <CheckIcon />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollFade>
            </div>

            <ScrollFade delay={180}>
              <SherpaWorkflowDemo />
            </ScrollFade>
          </div>
        </div>
      </section>

      <section id="agents" className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">The agent lab</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              One Lab.<br />Four product bets.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-14 max-w-xl leading-relaxed">
              The Lab lets each idea have a clear job. ShopSherpa protects shoppers. Sherpa, Finance Guru, Caddy, and MiniUAV explore what practical agents and safety tools can become.
            </p>
          </ScrollFade>
          <ScrollFade delay={280}>
            <FUIBentoGridDark />
          </ScrollFade>
        </div>
      </section>

      <section className="bg-[#F4F0E8] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <ScrollFade>
              <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Why businesses use it</p>
            </ScrollFade>
            <ScrollFade delay={120}>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-5">
                Simpler than a chatbot.
              </h2>
            </ScrollFade>
            <ScrollFade delay={220}>
              <p className="text-[#1a1a1a]/60 text-base md:text-lg leading-relaxed">
                Chatbots make people manage the work. Lab agents package the work into repeatable runs with a clear artifact at the end.
              </p>
            </ScrollFade>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {USE_CASES.map((useCase, index) => (
              <ScrollFade key={useCase} delay={80 + index * 60}>
                <div className="card-hover min-h-32 rounded-2xl border border-[#2e6273]/10 bg-white p-6 flex flex-col justify-between">
                  <span className="text-xs font-mono text-[#2e6273]/45">0{index + 1}</span>
                  <p className="mt-6 text-lg font-medium tracking-tight leading-snug">{useCase}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F4] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <div className="rounded-2xl bg-[#0d1f2d] text-white p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[#1d9e75]/10 blur-3xl" aria-hidden />
              <div className="relative z-10 grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Early access</p>
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-5">
                    Build the first runs with us.
                  </h2>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl">
                    The first useful version of Sherpa should be narrow: one purchasing workflow, real source links, clean spreadsheet output, and a human approval step before any buying happens.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-baseline gap-3 mb-6">
                    <p className="text-5xl font-medium tracking-tight">$49</p>
                    <p className="text-white/45 text-sm">/mo early pilot target</p>
                  </div>
                  <ul className="space-y-3 text-sm text-white/75 mb-7">
                    {["10 agent runs per month", "Spreadsheet exports", "Source links and decision notes", "Founder feedback channel"].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:hello@shopsherpa.org?subject=I%20want%20to%20pilot%20Sherpa"
                    className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0d1f2d] transition hover:bg-[#F4F0E8] active:scale-[0.98]"
                  >
                    Request pilot access
                  </a>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo dark />
            <span className="font-medium text-white">ShopSherpa</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/security" className="hover:text-white transition">Security</Link>
            <Link href="/" className="hover:text-white transition">ShopSherpa</Link>
            <Link href="/lab" className="text-white transition">Lab</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <Link href="/product" className="hover:text-white transition">MiniUAV</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa Lab, built in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#2e6273]/10 bg-white p-5 shadow-[var(--shadow-soft)]">
      <p className="text-3xl font-medium tracking-tight text-[#0d1f2d]">{value}</p>
      <p className="mt-1 text-xs font-mono text-[#1a1a1a]/45">{label}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="size-4 text-[#1d9e75] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
