import type { ReactNode } from "react";
import Image from "next/image";
import { ScrollFade } from "@/components/ScrollFade";
import { HeroShapes } from "@/components/HeroShapes";
import { PreorderButton } from "@/components/PreorderButton";
import { WaitlistForm } from "@/components/WaitlistForm";
import { InteractiveField } from "@/components/InteractiveField";
import { StoryCard } from "@/components/StoryCard";
import { ScamCheckDemo } from "@/components/ScamCheckDemo";
import { SiteHeader } from "@/components/SiteHeader";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased overflow-x-hidden">

      <SiteHeader active="home" cta="preorder" />

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-8 pt-20 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <HeroShapes />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[0.98fr_0.82fr] gap-12 lg:gap-16 items-center">
          <div>

          <ScrollFade>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2e6273]/15 bg-white text-xs font-mono text-[#2e6273] mb-8">
              <span className="size-1.5 rounded-full bg-[#1d9e75] pulse-dot" />
              Open-source install · early access
            </div>
          </ScrollFade>

          <ScrollFade delay={120}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1] max-w-4xl">
              Catch the scam{" "}
              <span className="text-[#2e6273] sketch-underline">before you pay.</span>
            </h1>
          </ScrollFade>

          <ScrollFade delay={240}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#1a1a1a]/65 max-w-xl leading-relaxed">
              ShopSherpa scans every store you visit for fake reviews and bad sellers. It flags phishing emails before you open them. Free, and ready in 60 seconds.
            </p>
          </ScrollFade>

          <ScrollFade delay={360}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <PreorderButton />
              <a
                href="#compare"
                className="px-6 py-3.5 rounded-full bg-white text-[#1a1a1a] border border-[#2e6273]/15 font-medium text-sm hover:border-[#2e6273]/40 transition active:scale-[0.98] text-center"
              >
                Compare free vs Plus
              </a>
            </div>
          </ScrollFade>

          <ScrollFade delay={480}>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-readable">
              <div className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5"><CheckIcon />No credit card for free tier</div>
              <div className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5"><CheckIcon />Chrome, Firefox, Safari</div>
              <a href="https://github.com/H0n3st1y/shopsherpa-landing" className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5 hover:border-[#1d9e75]/40 transition"><CheckIcon />Install from GitHub</a>
            </div>
          </ScrollFade>
          </div>

          <ScrollFade delay={240}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-[#2e6273]/15 bg-white shadow-[var(--shadow-lift)]">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
                alt="ShopSherpa browser extension scanning a secure online checkout for scam protection"
                className="image-lift aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2d]/78 via-[#0d1f2d]/18 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
                <div className="live-shield-bubble max-w-sm">
                  <p className="type-caption font-mono uppercase text-[#1d9e75] mb-2">Live shopping shield</p>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight leading-tight">
                    Review patterns, seller signals, and checkout domains in one calm alert.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>

        <div aria-hidden className="blob-float absolute -top-32 -right-32 size-[480px] rounded-full bg-[#2e6273]/5 blur-3xl pointer-events-none" />
        <div aria-hidden className="blob-float-slow absolute -bottom-24 -left-24 size-80 rounded-full bg-[#1d9e75]/5 blur-3xl pointer-events-none" />
      </section>

      {/* ─── INSTALL PATH ───────────────────────────────────────────────────── */}
      <section className="bg-[#F4F0E8] px-6 md:px-8 py-14 border-y border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <ScrollFade>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">Easier install path</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1] max-w-xl">
                Make download feel like three clicks.
              </h2>
            </div>
          </ScrollFade>
          <ScrollFade delay={120}>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                ["1", "Open GitHub", "Use the public repo while store review is in progress."],
                ["2", "Download build", "Grab the extension folder from the latest release."],
                ["3", "Add to Chrome", "Open Extensions, enable Developer Mode, and load the folder."],
              ].map(([n, title, copy]) => (
                <div key={title} className="rounded-2xl border border-[#2e6273]/10 bg-white p-5">
                  <p className="text-xs font-mono text-[#2e6273] mb-4">0{n}</p>
                  <h3 className="text-xl font-medium tracking-tight mb-2">{title}</h3>
                  <p className="text-sm leading-6 text-readable">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/H0n3st1y/shopsherpa-landing"
                className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2e6273] active:scale-[0.98]"
              >
                Install from GitHub
              </a>
              <p className="text-sm leading-6 text-readable max-w-md">
                My recommendation: publish a Chrome Web Store listing next, then keep GitHub as the transparent developer install option.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────────────
          Free tier. Three steps. Simplicity is the pitch.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Free, forever</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              Install it once.<br />It does the rest.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
              No setup wizards. No manual scanning. ShopSherpa runs quietly and speaks up when something looks wrong. Want the full breakdown? <a href="#compare" className="text-[#2e6273] font-medium hover:text-[#1d9e75] transition">Compare the free tier and Plus</a>.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <ScrollFade delay={100}>
              <Step n={1} title="Add the extension." copy="Takes 60 seconds. Works in Chrome, Firefox, and Safari. On mobile, download the app." />
            </ScrollFade>
            <ScrollFade delay={200}>
              <Step n={2} title="Shop like you normally would." copy="ShopSherpa checks sellers and reviews automatically while you browse. You don't have to do anything." />
            </ScrollFade>
            <ScrollFade delay={300}>
              <Step n={3} title="Get a quiet alert when it matters." copy="Fake reviews. Sketchy sellers. Wrong checkout domain. You'll know before you pay." />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ─── INSTANT SCAM CHECK ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF8F4] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">New beta feature</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              A scam gut-check<br />before you trust it.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-12 max-w-xl leading-relaxed">
              Paste a seller message, store link, email sender, or review. ShopSherpa turns vague suspicion into a clear risk readout.
            </p>
          </ScrollFade>
          <ScrollFade delay={280}>
            <ScamCheckDemo />
          </ScrollFade>
        </div>
      </section>

      {/* ─── DEMO ─────────────────────────────────────────────────────────────────
          ContainerScroll: email window tilts in on scroll like a laptop opening.
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="demo" className="bg-[#0d1f2d] text-white relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="px-6 md:px-8">
              <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Real example</p>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-3xl mx-auto">
                Maria almost paid $312.
              </h2>
              <p className="text-white/65 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                She got an email about a missed package. The sender looked exactly like Amazon. ShopSherpa flagged it before she clicked anything.
              </p>
            </div>
          }
        >
          {/* Email window inside the rotating card */}
          <div className="h-full w-full bg-[#1a1a2e] rounded-xl overflow-hidden flex flex-col">
            {/* Window chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111120] border-b border-white/5 shrink-0">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-mono text-white/30">Gmail — Inbox</span>
            </div>
            {/* Email content */}
            <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
              {/* FLAGGED badge */}
              <span className="absolute top-6 right-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-mono font-medium tracking-wider uppercase shadow-lg shadow-red-500/40">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Flagged
              </span>
              {/* Sender row */}
              <div className="flex items-start gap-3 mb-6">
                <div className="size-9 rounded-full bg-[#2e6273] flex items-center justify-center text-xs font-bold text-white shrink-0">A</div>
                <div>
                  <p className="text-sm font-medium text-white/90">Amazon</p>
                  <p className="text-xs font-mono text-red-400">tracking@am4z0n-delivery.shop</p>
                </div>
              </div>
              <p className="text-lg md:text-2xl font-medium text-white leading-snug mb-4 pr-24">
                Your package needs a redelivery fee. Confirm now.
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                We were unable to deliver your package. A redelivery fee of $3.99 is required within 24 hours or your package will be returned.
              </p>
              {/* Fake CTA button */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9900] text-black text-sm font-semibold rounded opacity-50 cursor-not-allowed select-none">
                Pay $3.99 now
              </div>
              {/* ShopSherpa warning banner */}
              <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/30 px-6 py-3 flex items-center gap-3">
                <svg className="size-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-xs text-red-300 font-mono">ShopSherpa: Spoofed domain detected. Do not click any links.</p>
              </div>
            </div>
          </div>
        </ContainerScroll>

        <div className="max-w-6xl mx-auto px-6 md:px-8 pb-24">
          <ScrollFade delay={300}>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <BeforeAfterCard
                label="Without ShopSherpa"
                variant="before"
                items={[
                  "Visits seller page. Sees 4.9 stars.",
                  "Pays $89. Gets a counterfeit.",
                  "Files dispute. Weeks of stress.",
                ]}
              />
              <BeforeAfterCard
                label="With ShopSherpa"
                variant="after"
                items={[
                  "Page loads. ShopSherpa scans.",
                  "Sees 'fake reviews detected' alert.",
                  "Leaves. Finds a real seller in 60 seconds.",
                ]}
              />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── INTERACTIVE FIELD ────────────────────────────────────────────────── */}
      <section className="bg-[#0d1f2d] text-white px-6 md:px-10 py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1d9e75] mb-6 md:mb-10 text-center">
              Quiet by default.<br />Calm to the touch.
            </h2>
          </ScrollFade>

          <ScrollFade delay={150}>
            <p className="text-white/60 max-w-md mx-auto text-center mb-12 md:mb-16">
              ShopSherpa stays out of the way until it has something to say. Move your cursor across the field below and click anywhere.
            </p>
          </ScrollFade>

          <ScrollFade delay={250}>
            <div className="max-w-4xl mx-auto">
              <InteractiveField />
            </div>
          </ScrollFade>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16">
            <ScrollFade>
              <StoryCard
                source="Last Tuesday"
                title="Maria almost paid $312 for a package she didn't order."
              />
            </ScrollFade>
            <ScrollFade delay={120}>
              <StoryCard
                source="Two weeks ago"
                title="Devin caught a fake Amazon page before entering his card."
              />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ─── PLAN COMPARISON ─────────────────────────────────────────────────── */}
      <section id="compare" className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Free vs Plus</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              Start free.<br />Upgrade when you want the full shield.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-14 max-w-xl leading-relaxed">
              The free extension covers everyday shopping scams. Plus adds the higher-risk layers: email, passwords, masked cards, and priority help.
            </p>
          </ScrollFade>

          <div className="grid lg:grid-cols-2 gap-5">
            <ScrollFade delay={100}>
              <PlanCard
                eyebrow="Free extension"
                title="For everyday shopping"
                price="Free"
                note="No credit card for the free tier"
                cta="Join free waitlist"
                href="#cta"
                features={[
                  "Real-time review scanning",
                  "Fake seller detection",
                  "Wrong checkout domain alerts",
                  "Chrome, Firefox, and Safari support",
                ]}
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <PlanCard
                featured
                eyebrow="ShopSherpa Plus"
                title="For full account protection"
                price="$9.99"
                note="Lifetime pre-order · monthly pricing later"
                cta="Pre-order Plus"
                href="#pricing"
                preorder
                features={[
                  "Everything in the free extension",
                  "Phishing Shield for Gmail and Outlook",
                  "Password vault with breach alerts",
                  "One masked card number per store",
                  "Priority support",
                ]}
              />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ─── PLUS TIER ─────────────────────────────────────────────────────────
          Three feature cards as a visual roadmap. Scarcity progress bar.
          One CTA only per section.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-[#F4F0E8] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">ShopSherpa Plus · Early access</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              The full shield.<br />One price, forever.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
              Pre-order now and lock in $9.99 for life. Monthly pricing comes later. The <a href="#compare" className="text-[#2e6273] font-medium hover:text-[#1d9e75] transition">free tier stays free</a>.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <ScrollFade delay={100}>
              <PlusCard icon={<ShieldIcon />} title="Phishing Shield" outcome="Scans Gmail and Outlook. Flags fake emails before you open them." />
            </ScrollFade>
            <ScrollFade delay={200}>
              <PlusCard icon={<VaultIcon />} title="Password Vault" outcome="Stores your passwords and alerts you the moment your data leaks." />
            </ScrollFade>
            <ScrollFade delay={300}>
              <PlusCard icon={<CardIcon />} title="Masked Cards" outcome="A unique card number per store. Your real number stays private forever." />
            </ScrollFade>
          </div>

          <ScrollFade delay={200}>
            <div className="bg-[#0d1f2d] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-10">
              <div className="flex-1">
                <p className="text-xs font-mono text-[#1d9e75] uppercase tracking-wider mb-4">Lifetime pre-order</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-6xl md:text-7xl font-medium tracking-tighter">$9.99</p>
                  <div>
                    <p className="text-white/40 line-through text-sm">future monthly plan</p>
                    <p className="text-white/50 text-sm">pay once, yours forever</p>
                  </div>
                </div>
                <div className="mt-8 max-w-xs">
                  <div className="flex justify-between text-xs text-white/50 font-mono mb-2">
                    <span>184 of 500 spots claimed</span>
                    <span>316 left</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1d9e75] rounded-full" style={{ width: "36.8%" }} />
                  </div>
                  <p className="text-xs text-white/30 mt-2 font-mono">Early adopter pricing, limited</p>
                </div>
              </div>
              <div className="md:w-72 flex flex-col gap-5">
                <ul className="space-y-3 text-sm text-white/80">
                  {[
                    "Real-time review scanning (free tier)",
                    "Phishing Shield for Gmail and Outlook",
                    "Password vault with breach alerts",
                    "One masked card number per store",
                    "Priority support",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckIcon className="text-[#1d9e75] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <PreorderButton variant="white" />
                <p className="text-xs text-white/30 text-center">No subscription. One payment.</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── PUBLIC ROADMAP ────────────────────────────────────────────────────
          Shows what's live, what's coming, and what's next.
          Transparency builds trust with pre-order buyers.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="roadmap" className="bg-[#FAF8F4] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Public roadmap</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              Here's exactly<br />what we're building.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
              No vague promises. This is the plan, updated as we ship.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}>
              <RoadmapCard
                phase="Now"
                status="live"
                title="Free tier"
                items={[
                  "Real-time review scanning",
                  "Fake seller detection",
                  "Wrong checkout domain alerts",
                  "Chrome, Firefox, Safari",
                ]}
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <RoadmapCard
                phase="Early access"
                status="building"
                title="Plus tier"
                items={[
                  "Phishing Shield for Gmail and Outlook",
                  "Password vault with breach alerts",
                  "Masked card numbers per store",
                  "Mobile app (iOS and Android)",
                ]}
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <RoadmapCard
                phase="2027"
                status="planned"
                title="What's next"
                items={[
                  "Family plans (up to 5 members)",
                  "Weekly security digest emails",
                  "Fraud pattern API for developers",
                  "SMS scam detection",
                ]}
              />
            </ScrollFade>
          </div>

          <ScrollFade delay={400}>
            <div className="mt-10 p-6 rounded-2xl bg-white border border-[#2e6273]/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <p className="font-medium text-[#1a1a1a] mb-1">Have a feature request?</p>
                <p className="text-sm text-[#1a1a1a]/60">We read every message. Reply to any email from ShopSherpa.</p>
              </div>
              <a
                href="mailto:hello@shopsherpa.org"
                className="shrink-0 px-5 py-2.5 rounded-full bg-[#0d1f2d] text-white text-sm font-medium hover:bg-[#2e6273] transition active:scale-[0.98]"
              >
                Send a message
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── BLOG / SCAM EDUCATION ─────────────────────────────────────────────
          Positions ShopSherpa as the authority on online scams.
          Three articles that match what beta users actually search for.
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Scam guide</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-4 max-w-xl">
              Know what to look for.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
              Scammers are getting better. Here's what's actually out there right now.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}>
              <BlogCard
                tag="Marketplace scams"
                title="How fake pet listings work and what to check before you send money."
                read="4 min read"
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <BlogCard
                tag="Phishing emails"
                title="The 5 Amazon phishing emails people fall for most this year."
                read="6 min read"
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <BlogCard
                tag="Fake reviews"
                title="Why 4.8-star products on Amazon are sometimes the most dangerous ones to buy."
                read="5 min read"
              />
            </ScrollFade>
          </div>

          <ScrollFade delay={400}>
            <div className="mt-10 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#2e6273] font-medium hover:text-[#1d9e75] transition"
              >
                Read all guides
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF8F4] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">What people say</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-16 max-w-xl">
              Real shoppers.<br />Real stories.
            </h2>
          </ScrollFade>
          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}>
              <TestimonialCard
                quote="Flagged a fake Nike store before I entered my card. I had no idea it wasn't real. I would have paid."
                name="Rachel S."
                city="Portland, OR"
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <TestimonialCard
                quote="Got a phishing email that looked exactly like my bank. ShopSherpa caught it. I'm not a tech person and it just worked."
                name="Tom H."
                city="Chicago, IL"
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <TestimonialCard
                quote="I always suspected some reviews were fake. Now I actually know which ones. Complete game changer."
                name="Dani L."
                city="Phoenix, AZ"
              />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ─── MINUAV GUARDIAN ─────────────────────────────────────────────────────── */}
      <section id="miniuav" className="miniuav-transition bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
        {/* Ambient glow */}
        <div aria-hidden className="absolute top-1/2 right-0 size-[500px] rounded-full bg-[#2e6273]/10 blur-[100px] pointer-events-none -translate-y-1/2" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            {/* Left — text */}
            <div className="flex-1">
              <ScrollFade>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-5 font-mono">ShopSherpa Hardware</p>
              </ScrollFade>
              <ScrollFade delay={100}>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1] mb-6">
                  The same intelligence.<br />
                  <span className="text-[#2e6273]">Now it flies.</span>
                </h2>
              </ScrollFade>
              <ScrollFade delay={180}>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg font-serif">
                  <a href="/product" className="text-white hover:text-[#1d9e75] underline underline-offset-4 decoration-white/25 transition">MiniUAV Guardian</a> is a security quadrotor built on the same fraud-detection databases and threat intelligence that power ShopSherpa. It brings that software layer into the physical world — patrolling spaces, detecting intrusions, and logging threats in real time.
                </p>
              </ScrollFade>
              <ScrollFade delay={250}>
                <p className="text-white/60 text-base leading-relaxed mb-10 max-w-lg font-serif">
                  It now lives inside <a href="/lab" className="text-white hover:text-[#1d9e75] underline underline-offset-4 decoration-white/25 transition">ShopSherpa Lab</a>, alongside Sherpa, Finance Guru, and Caddy, so the main product can stay focused on shopping safety.
                </p>
              </ScrollFade>

              {/* Feature pills */}
              <ScrollFade delay={320}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    "ShopSherpa threat DB",
                    "ESP32 dual-core",
                    "PIR motion sensing",
                    "Wi-Fi real-time logs",
                    "Custom 80×80mm PCB",
                    "Autonomous patrol",
                  ].map((f) => (
                    <span key={f} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                      {f}
                    </span>
                  ))}
                </div>
              </ScrollFade>

              <ScrollFade delay={380}>
                <a
                  href="/product"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2e6273] text-white text-sm font-medium hover:bg-[#3d7a8a] transition active:scale-[0.98]"
                >
                  Learn about MiniUAV Guardian
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </ScrollFade>
            </div>

            {/* Right — PCB + drone card */}
            <ScrollFade delay={150} className="w-full lg:w-auto shrink-0">
              <div className="w-full lg:w-[420px] rounded-3xl bg-gradient-to-b from-[#0d2b35] to-[#061419] border border-white/8 p-5 relative shadow-[0_0_80px_rgba(46,98,115,0.15)] overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2e6273]/60 to-transparent" />
                <img
                  src="/pcb-model.svg"
                  alt="MiniUAV Guardian custom PCB model with ESP32 control traces and sensor pads"
                  loading="lazy"
                  className="w-full rounded-2xl border border-white/10 bg-[#061419]"
                />

                {/* Drone wireframe SVG */}
                <svg viewBox="0 0 200 160" className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 text-[#d8efe5] opacity-80 drop-shadow-[0_0_18px_rgba(29,158,117,0.45)]" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="75" y="65" width="50" height="35" rx="8" fill="#1d9e75" fillOpacity="0.12" stroke="#1d9e75" strokeWidth="1.5" />
                  <line x1="75" y1="72" x2="30" y2="45" strokeOpacity="0.5" />
                  <line x1="125" y1="72" x2="170" y2="45" strokeOpacity="0.5" />
                  <line x1="75" y1="93" x2="30" y2="118" strokeOpacity="0.5" />
                  <line x1="125" y1="93" x2="170" y2="118" strokeOpacity="0.5" />
                  <ellipse cx="30" cy="45" rx="22" ry="6" strokeOpacity="0.4" />
                  <ellipse cx="170" cy="45" rx="22" ry="6" strokeOpacity="0.4" />
                  <ellipse cx="30" cy="118" rx="22" ry="6" strokeOpacity="0.4" />
                  <ellipse cx="170" cy="118" rx="22" ry="6" strokeOpacity="0.4" />
                  <circle cx="30" cy="45" r="4" fill="#1d9e75" stroke="#1d9e75" />
                  <circle cx="170" cy="45" r="4" fill="#1d9e75" stroke="#1d9e75" />
                  <circle cx="30" cy="118" r="4" fill="#1d9e75" stroke="#1d9e75" />
                  <circle cx="170" cy="118" r="4" fill="#1d9e75" stroke="#1d9e75" />
                  <circle cx="100" cy="90" r="5" fill="#2e6273" stroke="#2e6273" strokeWidth="1" />
                  <line x1="83" y1="75" x2="83" y2="92" strokeOpacity="0.25" strokeWidth="0.8" />
                  <line x1="91" y1="75" x2="91" y2="92" strokeOpacity="0.25" strokeWidth="0.8" />
                  <line x1="109" y1="75" x2="109" y2="92" strokeOpacity="0.25" strokeWidth="0.8" />
                  <line x1="117" y1="75" x2="117" y2="92" strokeOpacity="0.25" strokeWidth="0.8" />
                </svg>

                {/* Status */}
                <div className="mt-5 flex items-center justify-center gap-2 mb-4">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1d9e75] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#1d9e75]" />
                  </span>
                  <span className="text-xs font-mono text-[#1d9e75]">Phase 3 — Flight integration</span>
                </div>

                <p className="text-xs font-mono text-white/30 text-center">MiniUAV Guardian · PCB + flight integration</p>

                {/* Powered-by badge */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <svg className="size-3 text-[#1d9e75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] font-mono text-white/40">Powered by ShopSherpa</span>
                </div>
              </div>
            </ScrollFade>

          </div>
        </div>
      </section>

      {/* ─── FOUNDER ───────────────────────────────────────────────────────────── */}
      <section id="founder" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">

          {/* Photo centered */}
          <ScrollFade>
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#142736] ring-4 ring-white/10">
                <Image
                  src="/founder.png"
                  alt="Anghelo Araujo, founder of ShopSherpa"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Badge sits below photo with comfortable spacing */}
              <div className="bg-[#1d9e75] text-white text-xs font-mono px-3 py-2 rounded-lg leading-snug text-center">
                <span className="block font-medium">Anghelo, 16</span>
                <span className="text-white/80">Nashua, NH</span>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade delay={100}>
            <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-5 font-mono">The story</p>
          </ScrollFade>
          <ScrollFade delay={200}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-8">
              His mom lost $600 to a fake puppy listing.<br />That&apos;s why this exists.
            </h2>
          </ScrollFade>
          <ScrollFade delay={300}>
            <div className="font-serif space-y-5 text-white/70 text-base md:text-lg leading-relaxed text-left max-w-xl mx-auto">
              <p>
                After weeks of begging for a dog, the money was wired and the seller vanished. The puppy never existed. That emotional toll turned into a mission.
              </p>
              <p>
                At 16, Anghelo has completed Harvard&apos;s CS50 curricula and MIT Beaver Works programs in Quantum Software and Microelectronics. He co-developed the MiniUAV Guardian, a security quadrotor with custom PCB architecture, interned at Rayfield Systems, and competes in DECA and Track.
              </p>
              <p>
                ShopSherpa is his answer: an AI-powered shield that stops marketplace fraud before it hits your wallet, so no other family goes through what his did.
              </p>
            </div>
          </ScrollFade>
          <ScrollFade delay={400}>
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-white/40 font-mono">Anghelo Araujo, Founder of ShopSherpa</p>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────────
          Pre-order primary. Waitlist below with "or" divider. One wins.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="cta" className="bg-[#2e6273] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden cta-section">
        <div className="max-w-xl mx-auto text-center relative z-10">
          <ScrollFade>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[0.98] mb-6">
              Shop without<br />the anxiety.
            </h2>
          </ScrollFade>
          <ScrollFade delay={150}>
            <p className="text-white/75 text-lg mb-10 leading-relaxed">
              Join the free waitlist, or lock in Plus for $9.99 while lifetime spots are still available.
            </p>
          </ScrollFade>
          <ScrollFade delay={300}>
            <div className="flex justify-center mb-10">
              <PreorderButton variant="white" />
            </div>
          </ScrollFade>
          <ScrollFade delay={380}>
            <div className="flex items-center gap-4 text-white/25 mb-8">
              <div className="h-px flex-1 bg-white/15" />
              <span className="text-xs font-mono uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-white/15" />
            </div>
          </ScrollFade>
          <ScrollFade delay={450}>
            <p className="text-white/60 text-sm mb-5">
              Not ready yet? Join the waitlist and we'll let you know when we launch.
            </p>
            <WaitlistForm />
          </ScrollFade>
          <ScrollFade delay={550}>
            <p className="mt-10 text-xs text-white/35 font-mono">
              1,800+ proprietary fraud patterns, no spam, unsubscribe anytime
            </p>
          </ScrollFade>
        </div>
        <div aria-hidden className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/5 pointer-events-none" />
        <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-white/5 pointer-events-none" />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo dark />
            <span className="font-medium text-white">ShopSherpa</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/security" className="hover:text-white transition">Security</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/lab" className="hover:text-white transition">Lab</a>
            <a href="/team" className="hover:text-white transition">Team</a>
            <a href="/product" className="hover:text-white transition">MiniUAV</a>
            <a href="https://x.com/shop_sherpa" className="hover:text-white transition">X</a>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

/* ─────── HELPERS ─────────────────────────────────────────────────────────── */

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    // On dark surfaces, invert the logo so the dark outlines become white
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

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`size-4 shrink-0 ${className || "text-[#1d9e75]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="size-4 text-white/30 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function Step({ n, title, copy }: { n: number; title: string; copy: string }) {
  return (
    <div>
      <div className="size-10 rounded-full border-2 border-[#2e6273]/25 text-[#2e6273] flex items-center justify-center font-mono font-medium text-sm mb-6">
        {n}
      </div>
      <h3 className="text-xl font-medium mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{copy}</p>
    </div>
  );
}

function BeforeAfterCard({ label, variant, items }: { label: string; variant: "before" | "after"; items: string[] }) {
  const isBefore = variant === "before";
  return (
    <div className={`rounded-2xl p-7 border ${isBefore ? "bg-white/5 border-white/10" : "bg-[#1d9e75]/10 border-[#1d9e75]/25"}`}>
      <p className={`text-xs font-mono uppercase tracking-wider mb-5 ${isBefore ? "text-white/40" : "text-[#1d9e75]"}`}>{label}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-snug">
            {isBefore ? <XIcon /> : <CheckIcon className="text-[#1d9e75] mt-0.5 shrink-0" />}
            <span className={isBefore ? "text-white/60" : "text-white/90"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanCard({
  eyebrow,
  title,
  price,
  note,
  cta,
  href,
  features,
  featured = false,
  preorder = false,
}: {
  eyebrow: string;
  title: string;
  price: string;
  note: string;
  cta: string;
  href: string;
  features: string[];
  featured?: boolean;
  preorder?: boolean;
}) {
  return (
    <div className={`card-hover h-full rounded-2xl border p-7 md:p-8 ${featured ? "bg-[#0d1f2d] text-white border-[#0d1f2d]" : "bg-[#FAF8F4] border-[#2e6273]/10"}`}>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${featured ? "text-[#1d9e75]" : "text-[#2e6273]"}`}>{eyebrow}</p>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h3>
        </div>
        {featured && (
          <span className="rounded-full bg-[#1d9e75]/15 border border-[#1d9e75]/25 px-3 py-1 text-xs font-mono text-[#1d9e75] shrink-0">
            Best value
          </span>
        )}
      </div>

      <div className="mb-7">
        <p className="text-5xl md:text-6xl font-medium tracking-tight">{price}</p>
        <p className={`mt-2 text-sm ${featured ? "text-white/50" : "text-[#1a1a1a]/50"}`}>{note}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className={`flex items-start gap-2.5 text-sm ${featured ? "text-white/78" : "text-[#1a1a1a]/68"}`}>
            <CheckIcon className="text-[#1d9e75] mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {preorder ? (
        <div className="[&>button]:w-full">
          <PreorderButton variant={featured ? "white" : "default"} />
        </div>
      ) : (
        <a
          href={href}
          className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition active:scale-[0.98] ${
            featured
              ? "bg-white text-[#0d1f2d] hover:bg-[#F4F0E8]"
              : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"
          }`}
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function PlusCard({ icon, title, outcome }: { icon: ReactNode; title: string; outcome: string }) {
  return (
    <div className="card-hover bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full">
      <div className="size-10 rounded-xl bg-[#F4F0E8] flex items-center justify-center text-[#2e6273] mb-5">{icon}</div>
      <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/50 mb-2">Coming early access</p>
      <h3 className="text-xl font-medium tracking-tight mb-3">{title}</h3>
      <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">{outcome}</p>
    </div>
  );
}

/* ─── Roadmap card — three states: live, building, planned ─── */
function RoadmapCard({
  phase,
  status,
  title,
  items,
}: {
  phase: string;
  status: "live" | "building" | "planned";
  title: string;
  items: string[];
}) {
  const statusStyles = {
    live: { dot: "bg-[#1d9e75]", label: "Live", text: "text-[#1d9e75]", border: "border-[#1d9e75]/20", bg: "bg-white" },
    building: { dot: "bg-[#2e6273]", label: "Building", text: "text-[#2e6273]", border: "border-[#2e6273]/15", bg: "bg-white" },
    planned: { dot: "bg-[#1a1a1a]/20", label: "Planned", text: "text-[#1a1a1a]/40", border: "border-[#1a1a1a]/10", bg: "bg-white" },
  }[status];

  return (
    <div className={`${statusStyles.bg} rounded-2xl p-7 border ${statusStyles.border} h-full`}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/40">{phase}</p>
        <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${statusStyles.text}`}>
          <span className={`size-1.5 rounded-full ${statusStyles.dot} ${status === "live" ? "pulse-dot" : ""}`} />
          {statusStyles.label}
        </span>
      </div>
      <h3 className="text-xl font-medium tracking-tight mb-5">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/65">
            <CheckIcon className={`${status === "planned" ? "text-[#1a1a1a]/25" : "text-[#1d9e75]"} mt-0.5 shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Blog card — teaser only, links to /blog ─── */
function BlogCard({ tag, title, read }: { tag: string; title: string; read: string }) {
  return (
    <a
      href="/blog"
      className="card-hover group bg-[#FAF8F4] rounded-2xl p-7 border border-[#2e6273]/10 h-full flex flex-col"
    >
      <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/60 mb-4">{tag}</p>
      <h3 className="text-lg font-medium leading-snug tracking-tight mb-6 flex-1">{title}</h3>
      <div className="flex items-center justify-between pt-5 border-t border-[#2e6273]/10">
        <p className="text-xs text-[#1a1a1a]/40 font-mono">{read}</p>
        <svg
          className="size-4 text-[#2e6273] group-hover:translate-x-0.5 transition-transform"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

function TestimonialCard({ quote, name, city }: { quote: string; name: string; city: string }) {
  return (
    <div className="card-hover bg-white border border-[#2e6273]/10 rounded-2xl p-7 h-full flex flex-col shadow-[var(--shadow-soft)]">
      {/* Opening quote mark in teal for visual warmth */}
      <svg className="size-7 text-[#2e6273]/20 mb-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
      </svg>
      <p className="font-serif italic text-base leading-relaxed mb-6 flex-1 text-[#1a1a1a]/80">{quote}</p>
      <div className="pt-5 border-t border-[#2e6273]/10">
        <p className="text-sm font-semibold text-[#1a1a1a]">{name}</p>
        <p className="text-xs text-[#1a1a1a]/40 font-mono mt-0.5">{city}</p>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z" />
    </svg>
  );
}

function VaultIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" strokeLinecap="round" />
    </svg>
  );
}
