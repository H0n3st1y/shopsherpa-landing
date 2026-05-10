import type { ReactNode } from "react";
import Image from "next/image";
import { ScrollFade } from "@/components/ScrollFade";
import { HeroShapes } from "@/components/HeroShapes";
import { PreorderButton } from "@/components/PreorderButton";
import { WaitlistForm } from "@/components/WaitlistForm";
import { InteractiveField } from "@/components/InteractiveField";
import { StoryCard } from "@/components/StoryCard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { ThreatLogEmail } from "@/components/ThreatLogEmail";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased overflow-x-hidden">

      {/* NAV — sticky z-50 so it floats above the cinematic section */}
      <header className="sticky top-0 z-50 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#1a1a1a]/70">
            <a href="#how-it-works" className="hover:text-[#1a1a1a] transition">How it works</a>
            <a href="#roadmap" className="hover:text-[#1a1a1a] transition">Roadmap</a>
            <a href="#pricing" className="hover:text-[#1a1a1a] transition">Pricing</a>
            <a href="/team" className="hover:text-[#1a1a1a] transition">Team</a>
            <a href="/product" className="hover:text-[#1a1a1a] transition">MiniUAV</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#cta" className="hidden sm:inline text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition">
              Join waitlist
            </a>
            <PreorderButton size="sm" />
          </div>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-8 pt-20 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <HeroShapes />
        <div className="max-w-6xl mx-auto relative z-10">

          <ScrollFade>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2e6273]/15 bg-white text-xs font-mono text-[#2e6273] mb-8">
              <span className="size-1.5 rounded-full bg-[#1d9e75] pulse-dot" />
              Private beta · Q3 2026 launch
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
                href="#cta"
                className="px-6 py-3.5 rounded-full bg-white text-[#1a1a1a] border border-[#2e6273]/15 font-medium text-sm hover:border-[#2e6273]/40 transition active:scale-[0.98] text-center"
              >
                Join the free waitlist
              </a>
            </div>
          </ScrollFade>

          <ScrollFade delay={480}>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-[#1a1a1a]/60">
              <div className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5"><CheckIcon />No credit card for free tier</div>
              <div className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5"><CheckIcon />Chrome, Firefox, Safari</div>
              <div className="flex items-center gap-2 bg-white border border-[#2e6273]/15 rounded-full px-3 py-1.5"><CheckIcon />Public launch Q3 2026</div>
            </div>
          </ScrollFade>
        </div>

        <div aria-hidden className="blob-float absolute -top-32 -right-32 size-[480px] rounded-full bg-[#2e6273]/5 blur-3xl pointer-events-none" />
        <div aria-hidden className="blob-float-slow absolute -bottom-24 -left-24 size-80 rounded-full bg-[#1d9e75]/5 blur-3xl pointer-events-none" />
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
              No setup wizards. No manual scanning. ShopSherpa runs quietly and speaks up when something looks wrong.
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

      {/* ─── INTERCEPTED THREAT LOG ────────────────────────────────────────────
          Design: sharp grid box, flat terracotta overlay on threat state,
          monospaced terminal output. No curves. No bounce.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="demo" style={{ background: "#CAAF98" }} className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">

          <ScrollFade>
            <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-6" style={{ color: "#AD2010" }}>
              THREAT_LOG · INCIDENT_0042 · INTERCEPTED
            </p>
          </ScrollFade>
          <ScrollFade delay={80}>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1] mb-3" style={{ color: "#22180F", fontFamily: "var(--font-heading)" }}>
              Maria almost paid $312.
            </h2>
          </ScrollFade>
          <ScrollFade delay={160}>
            <p className="text-sm leading-relaxed mb-14 max-w-lg" style={{ color: "#22180F80", fontFamily: "var(--font-serif)" }}>
              A spoofed Amazon email about a missed package. The domain was off by one character. ShopSherpa caught it before she clicked anything.
            </p>
          </ScrollFade>

          <ScrollFade delay={220}>
            {/* The threat log — sharp border, grid aesthetic */}
            <ThreatLogEmail />
          </ScrollFade>

          {/* Before / After — styled as log comparison */}
          <ScrollFade delay={300}>
            <div className="grid md:grid-cols-2 gap-0 mt-10" style={{ border: "1px solid #22180F" }}>
              <div className="p-8 border-b md:border-b-0 md:border-r" style={{ borderColor: "#22180F" }}>
                <p className="text-[9px] uppercase tracking-[0.18em] font-mono mb-6" style={{ color: "#AD2010" }}>WITHOUT SHOPSHERPA</p>
                <div className="space-y-3">
                  {[
                    "01  Opens the email.",
                    "02  Clicks the link. Enters her card.",
                    "03  Loses $312 to a scammer.",
                  ].map((line) => (
                    <p key={line} className="text-xs font-mono" style={{ color: "#22180F99" }}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <p className="text-[9px] uppercase tracking-[0.18em] font-mono mb-6" style={{ color: "#22180F60" }}>WITH SHOPSHERPA</p>
                <div className="space-y-3">
                  {[
                    "01  Email arrives. ShopSherpa scans sender domain.",
                    "02  [SYS.ALERT] SPOOFED_DOMAIN_DETECTED",
                    "03  Maria deletes it. Keeps her $312.",
                  ].map((line) => (
                    <p key={line} className="text-xs font-mono" style={{ color: "#22180F" }}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* ─── CALIBRATION / INTERACTIVE FIELD ──────────────────────────────────
          Architectural wireframe grid. Live cursor tracker. No bounce.
      ────────────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#22180F", color: "#CAAF98" }} className="px-6 md:px-10 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-5" style={{ color: "#AD2010" }}>
              INTERACTION_MODULE · PRECISION_CALIBRATION
            </p>
          </ScrollFade>
          <ScrollFade delay={80}>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1] mb-5" style={{ fontFamily: "var(--font-heading)", color: "#CAAF98" }}>
              Quiet by default.<br />Calm to the touch.
            </h2>
          </ScrollFade>
          <ScrollFade delay={160}>
            <p className="text-sm leading-relaxed mb-12 max-w-md" style={{ color: "#CAAF9880", fontFamily: "var(--font-serif)" }}>
              ShopSherpa stays out of the way until it has something to say. Move your cursor across the field below.
            </p>
          </ScrollFade>

          <ScrollFade delay={250}>
            <div className="max-w-4xl mx-auto">
              <InteractiveField />
            </div>
          </ScrollFade>

          <div className="grid md:grid-cols-2 gap-0 max-w-4xl mx-auto mt-12" style={{ border: "1px solid #CAAF9830" }}>
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

      {/* ─── PLUS TIER ─────────────────────────────────────────────────────────
          Three feature cards as a visual roadmap. Scarcity progress bar.
          One CTA only per section.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-[#F4F0E8] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">ShopSherpa Plus · Coming Q3 2026</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-2xl">
              The full shield.<br />One price, forever.
            </h2>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="text-[#1a1a1a]/60 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
              Pre-order now and lock in $9.99 for life. It goes to $14.99 a month at launch.
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
                    <p className="text-white/40 line-through text-sm">$14.99/mo at launch</p>
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
                phase="Q3 2026"
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

      {/* ─── MINUAV GUARDIAN · BLUEPRINT ──────────────────────────────────────── */}
      <section style={{ background: "#CAAF98" }} className="relative overflow-hidden">
        {/* Blueprint header bar */}
        <div className="border-b px-6 md:px-8 py-3 flex items-center justify-between" style={{ borderColor: "#22180F40" }}>
          <p className="text-[9px] uppercase tracking-[0.2em] font-mono" style={{ color: "#AD2010" }}>
            HARDWARE_SCHEMATIC · REV_003 · MINUAV_GUARDIAN
          </p>
          <p className="text-[9px] font-mono" style={{ color: "#22180F60" }}>
            ANGHELO_ARAUJO + PRITHVI_GUPTA · CO-DESIGNERS
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

            {/* Left — text */}
            <div className="flex-1">
              <ScrollFade>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1] mb-6" style={{ color: "#22180F", fontFamily: "var(--font-heading)" }}>
                  The same intelligence.<br />Now it flies.
                </h2>
              </ScrollFade>
              <ScrollFade delay={100}>
                <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "#22180F80", fontFamily: "var(--font-serif)" }}>
                  MiniUAV Guardian is a security quadrotor that Anghelo co-designed alongside tech co-founder Prithvi Gupta. It runs on the same threat-detection databases and software layer that power ShopSherpa — bringing digital fraud intelligence into physical space.
                </p>
              </ScrollFade>
              <ScrollFade delay={160}>
                <p className="text-sm leading-relaxed mb-10 max-w-md" style={{ color: "#22180F80", fontFamily: "var(--font-serif)" }}>
                  One platform. Two products. Whether the threat is a spoofed checkout domain or an intruder in a room, ShopSherpa knows what does not belong.
                </p>
              </ScrollFade>

              {/* Spec table — blueprint style */}
              <ScrollFade delay={220}>
                <div className="mb-10" style={{ border: "1px solid #22180F40" }}>
                  {[
                    ["PROCESSOR",  "ESP32 · Dual-core 240MHz"],
                    ["SENSING",    "PIR · 10ft body-heat detection"],
                    ["PCB",        "Custom 80×80mm dual-layer"],
                    ["COMMS",      "Wi-Fi · Real-time event logging"],
                    ["PATROL",     "Autonomous · No pilot required"],
                    ["SOFTWARE",   "ShopSherpa threat DB + firmware"],
                  ].map(([label, value], i) => (
                    <div
                      key={label}
                      className="flex items-center px-4 py-2.5"
                      style={{
                        borderTop: i > 0 ? "1px solid #22180F20" : undefined,
                      }}
                    >
                      <span className="text-[9px] font-mono w-24 shrink-0 uppercase tracking-wider" style={{ color: "#AD2010" }}>{label}</span>
                      <span className="text-xs font-mono" style={{ color: "#22180F" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </ScrollFade>

              <ScrollFade delay={280}>
                <a
                  href="/product"
                  className="blueprint-btn inline-flex items-center gap-3 px-6 py-3 text-sm font-mono"
                >
                  VIEW_FULL_SCHEMATIC
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </ScrollFade>
            </div>

            {/* Right — engineering blueprint card */}
            <ScrollFade delay={150} className="w-full lg:w-auto shrink-0">
              <div
                className="w-full lg:w-[400px] relative p-8"
                style={{ border: "1px solid #22180F40", background: "#C4A48C" }}
              >
                {/* Corner marks — engineering drawing style */}
                {[["top-0 left-0","border-t border-l"],["top-0 right-0","border-t border-r"],["bottom-0 left-0","border-b border-l"],["bottom-0 right-0","border-b border-r"]].map(([pos, borders]) => (
                  <div key={pos} className={`absolute ${pos} w-4 h-4 ${borders}`} style={{ borderColor: "#22180F60", margin: "4px" }} />
                ))}

                {/* Blueprint drone — right-angle annotations */}
                <div className="relative">
                  <svg viewBox="0 0 280 220" className="w-full" fill="none">
                    {/* Grid guide lines */}
                    {[40,80,120,160,200,240].map(x => (
                      <line key={`v${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#22180F" strokeOpacity="0.08" strokeWidth="0.5" />
                    ))}
                    {[40,80,120,160].map(y => (
                      <line key={`h${y}`} x1="0" y1={y} x2="280" y2={y} stroke="#22180F" strokeOpacity="0.08" strokeWidth="0.5" />
                    ))}

                    {/* Body */}
                    <rect x="100" y="85" width="80" height="50" fill="#22180F" fillOpacity="0.06" stroke="#22180F" strokeWidth="1" />

                    {/* Arms — sharp right angles */}
                    <polyline points="100,92 60,92 60,60" stroke="#22180F" strokeWidth="1" strokeOpacity="0.6" />
                    <polyline points="180,92 220,92 220,60" stroke="#22180F" strokeWidth="1" strokeOpacity="0.6" />
                    <polyline points="100,123 60,123 60,155" stroke="#22180F" strokeWidth="1" strokeOpacity="0.6" />
                    <polyline points="180,123 220,123 220,155" stroke="#22180F" strokeWidth="1" strokeOpacity="0.6" />

                    {/* Rotors — as squares not ellipses */}
                    <rect x="40" y="44" width="40" height="16" stroke="#22180F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                    <rect x="200" y="44" width="40" height="16" stroke="#22180F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                    <rect x="40" y="148" width="40" height="16" stroke="#22180F" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                    <rect x="200" y="148" width="40" height="16" stroke="#22180F" strokeWidth="1" strokeOpacity="0.5" fill="none" />

                    {/* Motor hubs */}
                    <rect x="57" y="49" width="6" height="6" fill="#AD2010" />
                    <rect x="217" y="49" width="6" height="6" fill="#AD2010" />
                    <rect x="57" y="153" width="6" height="6" fill="#AD2010" />
                    <rect x="217" y="153" width="6" height="6" fill="#AD2010" />

                    {/* PIR sensor */}
                    <rect x="135" y="103" width="10" height="10" fill="#AD2010" fillOpacity="0.8" stroke="#AD2010" strokeWidth="1" />

                    {/* Annotation lines — right angles to labels */}
                    <polyline points="60,52 30,52 30,18" stroke="#AD2010" strokeWidth="0.75" strokeOpacity="0.6" />
                    <polyline points="220,52 250,52 250,18" stroke="#AD2010" strokeWidth="0.75" strokeOpacity="0.6" />
                    <polyline points="140,108 140,200" stroke="#AD2010" strokeWidth="0.75" strokeOpacity="0.6" />

                    {/* Labels */}
                    <text x="8" y="16" fontSize="7" fill="#AD2010" fontFamily="monospace">ROTOR_01</text>
                    <text x="218" y="16" fontSize="7" fill="#AD2010" fontFamily="monospace">ROTOR_02</text>
                    <text x="100" y="208" fontSize="7" fill="#AD2010" fontFamily="monospace">PIR_SENSOR · 10ft</text>

                    {/* Dimension markers */}
                    <line x1="100" y1="210" x2="180" y2="210" stroke="#22180F" strokeWidth="0.5" strokeOpacity="0.4" />
                    <text x="115" y="218" fontSize="6" fill="#22180F" fontFamily="monospace" fillOpacity="0.4">80mm PCB</text>
                  </svg>
                </div>

                {/* Status footer */}
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #22180F30" }}>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 inline-block" style={{ background: "#AD2010" }} />
                    <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#AD2010" }}>PHASE_03 · FLIGHT_INTEGRATION</span>
                  </div>
                  <span className="text-[9px] font-mono" style={{ color: "#22180F50" }}>IN_DEV</span>
                </div>
              </div>
            </ScrollFade>

          </div>
        </div>
      </section>

      {/* ─── CASE FILE: 001 ────────────────────────────────────────────────────
          Archival record format. Two-column classified document layout.
          No centered blob. Sharp borders, column rules, accurate bio.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="founder" style={{ background: "#22180F", color: "#CAAF98" }} className="relative overflow-hidden">
        {/* File header bar */}
        <div className="border-b px-6 md:px-8 py-3 flex items-center justify-between" style={{ borderColor: "#CAAF9820" }}>
          <p className="text-[9px] uppercase tracking-[0.2em] font-mono" style={{ color: "#AD2010" }}>
            ARCHIVAL_RECORD · CASE_FILE_001 · ORIGIN_STORY
          </p>
          <p className="text-[9px] font-mono" style={{ color: "#CAAF9840" }}>
            CLASSIFICATION: PUBLIC · DATE: 2026
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">

          {/* Top — wide headline */}
          <ScrollFade>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[1] mb-12" style={{ color: "#CAAF98", fontFamily: "var(--font-heading)" }}>
              His mother lost $600<br />to a puppy that never existed.
            </h2>
          </ScrollFade>

          {/* Two-column document layout */}
          <div className="grid md:grid-cols-2 gap-0" style={{ border: "1px solid #CAAF9820" }}>

            {/* Left col — photo + metadata */}
            <ScrollFade>
              <div className="p-8 border-b md:border-b-0 md:border-r" style={{ borderColor: "#CAAF9820" }}>

                {/* Photo — square crop, no rounding */}
                <div className="mb-6 overflow-hidden" style={{ width: "140px", height: "140px", border: "1px solid #CAAF9830" }}>
                  <Image
                    src="/founder.png"
                    alt="Anghelo Araujo Lazaro"
                    width={140}
                    height={140}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Metadata table */}
                <div style={{ border: "1px solid #CAAF9820" }}>
                  {[
                    ["SUBJECT",  "Anghelo Araujo Lazaro"],
                    ["AGE",      "16"],
                    ["LOCATION", "Nashua, NH"],
                    ["ROLE",     "Founder & CEO, ShopSherpa"],
                    ["SCHOOL",   "Nashua High School South"],
                    ["INTERN",   "Rayfield Systems (front-end)"],
                    ["COMPETE",  "DECA · Track · Cross Country"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className="flex px-4 py-2"
                      style={{ borderTop: i > 0 ? "1px solid #CAAF9815" : undefined }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-wider w-20 shrink-0 mt-0.5" style={{ color: "#AD2010" }}>{k}</span>
                      <span className="text-xs font-mono" style={{ color: "#CAAF98CC" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Credentials — accurate */}
                <div className="mt-6" style={{ border: "1px solid #CAAF9820" }}>
                  <div className="px-4 py-2" style={{ borderBottom: "1px solid #CAAF9820" }}>
                    <p className="text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: "#AD2010" }}>ACADEMIC_CREDENTIALS</p>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-xs font-mono" style={{ color: "#CAAF98CC" }}>Harvard CS50 · Completed online curriculum</p>
                    <p className="text-xs font-mono" style={{ color: "#CAAF98CC" }}>MIT Beaver Works · Online prerequisites + program coursework · Deep interest in Microelectronics and Quantum Software</p>
                    <p className="text-xs font-mono" style={{ color: "#CAAF98CC" }}>FIRST Robotics · Interact Rotary · Harvard Undergraduate Ventures</p>
                  </div>
                </div>

              </div>
            </ScrollFade>

            {/* Right col — narrative in column format */}
            <ScrollFade delay={120}>
              <div className="p-8">
                <p className="text-[9px] uppercase tracking-[0.18em] font-mono mb-6" style={{ color: "#CAAF9840" }}>INCIDENT_NARRATIVE</p>

                <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#CAAF98AA", fontFamily: "var(--font-serif)" }}>
                  <p>
                    He had begged for weeks. Day and night. For a dog. His mother, wanting to make him happy, found what looked like a real listing: photos, a contract, a professional seller. She wired $600. The seller vanished. The puppy was never real.
                  </p>
                  <p>
                    The emotional weight of that moment did not leave him. He watched the same thing happen to people around him — fake storefronts built in an afternoon, phishing emails that looked exactly like his bank, review scores manufactured by bots.
                  </p>
                  <p>
                    At 16, Anghelo decided to build the tool that would have protected his family. Not a report button. Not a checklist. An always-on shield that reads the threat before you do and stops it before any money moves.
                  </p>
                  <p>
                    ShopSherpa is that answer. One pre-order. Lifetime protection. Built by the kid who saw what losing $600 does to a family.
                  </p>
                </div>

                {/* Pull quote */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid #CAAF9820" }}>
                  <p className="text-xs font-mono italic" style={{ color: "#CAAF9860" }}>
                    &quot;No other family should go through what mine did.&quot;
                  </p>
                  <p className="text-[9px] font-mono mt-2 uppercase tracking-wider" style={{ color: "#AD2010" }}>
                    — Anghelo Araujo Lazaro · Founder, ShopSherpa
                  </p>
                </div>

              </div>
            </ScrollFade>

          </div>
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
              316 lifetime spots left at $9.99. Goes to $14.99 a month at launch this fall.
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
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Security</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/team" className="hover:text-white transition">Team</a>
            <a href="/product" className="hover:text-white transition">MiniUAV</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
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

function PlusCard({ icon, title, outcome }: { icon: ReactNode; title: string; outcome: string }) {
  return (
    <div className="card-hover bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full">
      <div className="size-10 rounded-xl bg-[#F4F0E8] flex items-center justify-center text-[#2e6273] mb-5">{icon}</div>
      <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/50 mb-2">Coming Q3 2026</p>
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
