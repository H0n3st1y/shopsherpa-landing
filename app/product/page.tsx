import type { Metadata } from "next";
import Link from "next/link";
import { ScrollFade } from "@/components/ScrollFade";
import { SiteHeader } from "@/components/SiteHeader";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { pageMetadata, siteUrl } from "@/lib/seo";

const pageDescription =
  "MiniUAV Guardian is an autonomous indoor security quadrotor from ShopSherpa Lab with ESP32 controls, PIR motion detection, and real-time Wi-Fi logging.";

export const metadata: Metadata = pageMetadata({
  title: "MiniUAV Guardian",
  description: pageDescription,
  path: "/product",
  image: "/pcb-model.svg",
  imageAlt: "MiniUAV Guardian PCB and security quadrotor prototype",
  keywords: ["MiniUAV Guardian", "ShopSherpa Lab", "Shop Sherpa Lab", "autonomous security quadrotor"],
});

export default function ProductPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/product#product`,
    "name": "MiniUAV Guardian",
    "description": pageDescription,
    "brand": { "@id": `${siteUrl}/#organization` },
    "category": "Autonomous security hardware",
    "image": `${siteUrl}/pcb-model.svg`,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/product`,
      "price": "9.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder",
      "itemCondition": "https://schema.org/NewCondition",
    },
  };

  return (
    <main className="min-h-screen bg-[#000] text-white antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <SiteHeader active="product" variant="dark" cta="access" />

      {/* ─── CINEMATIC INTRO ─── */}
      <CinematicHero
        tagline1="Security from"
        tagline2="a new angle."
        cardHeading="Autonomous. Precise."
        cardDescription={
          <>
            <span className="font-semibold text-white">MiniUAV Guardian</span> is a security quadrotor powered by ShopSherpa&apos;s threat intelligence. It patrols on its own, detects motion with PIR sensing, and logs events in real time - no pilot, no cloud, no compromise.
          </>
        }
        ctaHeading="Early access open."
        ctaDescription="MiniUAV Guardian is in active development. Request early access and be first to know when we ship."
      />

      <div className="relative h-28 overflow-hidden bg-black">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d9e75]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,158,117,.18),transparent_56%)]" />
        <div className="absolute left-1/2 top-1/2 h-16 w-[min(760px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] blur-sm" />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-[78vh] px-6 py-28 text-center overflow-hidden">
        {/* WebGL wave shader - fills the hero */}
        <WebGLShader className="absolute inset-0 w-full h-full block opacity-40" />
        {/* Dark overlay so text stays readable */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black pointer-events-none" />

        <ScrollFade>
          <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-6 font-mono">MiniUAV Guardian</p>
        </ScrollFade>
        <ScrollFade delay={100}>
          <h2 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-semibold tracking-tighter leading-[0.95] max-w-5xl mb-8">
            Security from<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e6273] via-[#1d9e75] to-[#2e6273]">
              a new angle.
            </span>
          </h2>
        </ScrollFade>
        <ScrollFade delay={200}>
          <p className="text-white/55 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            An autonomous indoor security quadrotor. Patrols on its own. Detects motion. Alerts you in real time.
          </p>
        </ScrollFade>
        <ScrollFade delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidButton
              size="xl"
              className="text-white border border-white/30 rounded-full"
              onClick={undefined}
            >
              <a href="mailto:hello@shopsherpa.org" className="flex items-center gap-2">
                Request early access
              </a>
            </LiquidButton>
            <a
              href="#specs"
              className="px-8 py-4 rounded-full bg-white/10 text-white font-medium text-sm border border-white/15 hover:bg-white/15 transition active:scale-[0.98]"
            >
              View specs
            </a>
          </div>
        </ScrollFade>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-xs font-mono">
          <span>scroll</span>
          <svg className="size-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ─── INTRO STATEMENT ─── */}
      <section className="px-6 md:px-8 py-32 md:py-48 text-center bg-black">
        <ScrollFade>
          <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-4xl mx-auto text-white/90">
            Most security cameras just record. The MiniUAV Guardian{" "}
            <span className="text-[#1d9e75]">reacts.</span>
          </p>
        </ScrollFade>
      </section>

      {/* ─── BENTO SPECS GRID ─── */}
      <section id="specs" className="px-6 md:px-8 py-24 bg-[#050a0f]">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-4 font-mono text-center">Technical specs</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-center mb-16 max-w-2xl mx-auto leading-[1]">
              Built different.<br />From the board up.
            </h2>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Large card - PCB */}
            <ScrollFade delay={100} className="md:col-span-2">
              <BentoCard accent="#2e6273" label="Custom Hardware">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-5xl md:text-7xl font-semibold tracking-tighter mb-3">80×80<span className="text-2xl md:text-3xl text-white/40 font-normal">mm</span></p>
                    <p className="text-white/55 text-base leading-relaxed max-w-sm">
                      Dual-layer PCB. Designed from scratch. Every trace placed to minimize interference between power and signal layers.
                    </p>
                  </div>
                  {/* PCB trace visual */}
                  <div className="mt-8 opacity-20">
                    <svg viewBox="0 0 300 80" className="w-full" fill="none" stroke="#2e6273" strokeWidth="1">
                      {[0,1,2,3,4,5,6,7].map(i => (
                        <line key={i} x1={i*40} y1="0" x2={i*40} y2="80" strokeOpacity="0.5" />
                      ))}
                      {[0,1,2,3].map(i => (
                        <line key={i} x1="0" y1={i*26} x2="300" y2={i*26} strokeOpacity="0.5" />
                      ))}
                      <rect x="80" y="20" width="140" height="40" rx="4" fill="#2e6273" fillOpacity="0.15" />
                    </svg>
                  </div>
                </div>
              </BentoCard>
            </ScrollFade>

            {/* Brain */}
            <ScrollFade delay={150}>
              <BentoCard accent="#1d9e75" label="Intelligence">
                <p className="text-4xl md:text-5xl font-semibold tracking-tighter mb-3">ESP32</p>
                <p className="text-white/55 text-sm leading-relaxed">
                  Dual-core 240MHz. Handles flight control, sensor fusion, and Wi-Fi telemetry simultaneously.
                </p>
                <div className="mt-6 flex gap-2 flex-wrap">
                  {["Wi-Fi", "BLE", "Dual-core", "FreeRTOS"].map(t => (
                    <span key={t} className="px-2 py-1 rounded bg-[#1d9e75]/15 text-[#1d9e75] text-xs font-mono">{t}</span>
                  ))}
                </div>
              </BentoCard>
            </ScrollFade>

            {/* PIR */}
            <ScrollFade delay={200}>
              <BentoCard accent="#1d9e75" label="Motion Detection">
                <p className="text-5xl md:text-6xl font-semibold tracking-tighter mb-1">10<span className="text-2xl text-white/40 font-normal">ft</span></p>
                <p className="text-white/55 text-sm leading-relaxed">
                  PIR sensor detects body heat up to 10 feet. No false positives from shadows or ambient light changes.
                </p>
              </BentoCard>
            </ScrollFade>

            {/* Alert system */}
            <ScrollFade delay={250}>
              <BentoCard accent="#2e6273" label="Alert System">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight mb-3">Audible + Wi-Fi</p>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Triggers a buzzer on detection and logs a timestamped event over Wi-Fi. No cloud required - works on your local network.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1d9e75] opacity-75" />
                      <span className="relative inline-flex size-3 rounded-full bg-[#1d9e75]" />
                    </span>
                    <span className="text-xs font-mono text-[#1d9e75]">Live event logging</span>
                  </div>
                </div>
              </BentoCard>
            </ScrollFade>

            {/* Autonomy */}
            <ScrollFade delay={300}>
              <BentoCard accent="#2e6273" label="Autonomy">
                <p className="text-2xl font-semibold tracking-tight mb-3">Indoor patrol</p>
                <p className="text-white/55 text-sm leading-relaxed">
                  Pre-programmed patrol routes. Returns to dock when battery is low. No pilot required during routine patrol.
                </p>
              </BentoCard>
            </ScrollFade>

          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH STATEMENT ─── */}
      <section className="relative px-6 md:px-8 py-40 overflow-hidden bg-gradient-to-b from-[#050a0f] to-[#0d1f2d]">
        <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="size-[700px] rounded-full bg-[#2e6273]/10 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollFade>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-6 font-mono">Why it exists</p>
          </ScrollFade>
          <ScrollFade delay={100}>
            <blockquote className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.15] max-w-3xl text-white/90">
              "Existing security cameras are passive. I wanted something that could move, think, and respond - without anyone controlling it."
            </blockquote>
          </ScrollFade>
          <ScrollFade delay={200}>
            <p className="mt-8 text-white/40 font-mono text-sm">Anghelo Araujo, Founder</p>
          </ScrollFade>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="px-6 md:px-8 py-24 bg-[#0d1f2d]">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-4 font-mono">Development timeline</p>
          </ScrollFade>
          <ScrollFade delay={100}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-16 max-w-xl leading-[1.05]">
              Where we are now.
            </h2>
          </ScrollFade>

          <div className="space-y-0">
            {([
              { phase: "Phase 1", label: "PCB Design", detail: "80×80mm dual-layer board completed. Component placement optimized for balance.", status: "done" },
              { phase: "Phase 2", label: "Firmware", detail: "ESP32 firmware for sensor polling, Wi-Fi logging, and buzzer alerts.", status: "done" },
              { phase: "Phase 3", label: "Flight integration", detail: "Connecting ESCs and testing stable hover indoors.", status: "active" },
              { phase: "Phase 4", label: "Autonomous patrol", detail: "Pre-programmed routes, obstacle avoidance, auto-dock.", status: "planned" },
              { phase: "Phase 5", label: "Production", detail: "First batch. Contact us to be notified.", status: "planned" },
            ] as const).map((item, i) => (
              <ScrollFade key={item.phase} delay={i * 80}>
                <TimelineRow {...item} />
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 md:px-8 py-32 text-center bg-black">
        <ScrollFade>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[0.97]">
            Stay in the loop.
          </h2>
        </ScrollFade>
        <ScrollFade delay={150}>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            We'll email you when the MiniUAV Guardian is ready for early access. No spam.
          </p>
        </ScrollFade>
        <ScrollFade delay={300}>
          <LiquidButton size="xl" className="text-white border border-white/30 rounded-full">
            <a href="mailto:hello@shopsherpa.org" className="flex items-center gap-2">
              Contact us
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </LiquidButton>
        </ScrollFade>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050a0f] text-white/40 px-6 md:px-8 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo dark />
            <span className="font-medium text-white">ShopSherpa</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/security" className="hover:text-white transition">Security</Link>
            <Link href="/" className="hover:text-white transition">ShopSherpa</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <Link href="/product" className="text-white transition">MiniUAV</Link>
          </div>
          <div className="text-xs text-white/30">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function BentoCard({ label, accent, children, className = "" }: { label: string; accent: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl p-7 md:p-8 bg-[#0d1520] border border-white/8 h-full min-h-[220px] flex flex-col overflow-hidden hover:border-white/15 transition-colors duration-300 ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      <p className="text-xs font-mono uppercase tracking-wider mb-5" style={{ color: accent }}>{label}</p>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function TimelineRow({ phase, label, detail, status }: { phase: string; label: string; detail: string; status: "done" | "active" | "planned" }) {
  const styles = {
    done: { dot: "bg-[#1d9e75]", text: "text-[#1d9e75]", label: "Done", line: "bg-[#1d9e75]/40" },
    active: { dot: "bg-[#2e6273] animate-pulse", text: "text-[#2e6273]", label: "In progress", line: "bg-[#2e6273]/20" },
    planned: { dot: "bg-white/15", text: "text-white/30", label: "Planned", line: "bg-white/8" },
  }[status];

  return (
    <div className="flex gap-6 md:gap-10 items-start py-7 border-t border-white/8 group">
      <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
        <span className={`size-3 rounded-full shrink-0 ${styles.dot}`} />
      </div>
      <div className="flex-1 flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
        <p className="text-xs font-mono text-white/30 shrink-0 w-16">{phase}</p>
        <div className="flex-1">
          <p className="font-medium text-white/90 mb-1">{label}</p>
          <p className="text-sm text-white/45 leading-relaxed">{detail}</p>
        </div>
        <span className={`text-xs font-mono shrink-0 ${styles.text}`}>{styles.label}</span>
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
      className={`size-8 shrink-0 object-contain ${dark ? "brightness-0 invert" : "brightness-0 invert"}`}
    />
  );
}
