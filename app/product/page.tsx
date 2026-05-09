import type { Metadata } from "next";
import Link from "next/link";
import { ScrollFade } from "@/components/ScrollFade";

export const metadata: Metadata = {
  title: "MiniUAV Guardian | ShopSherpa",
  description:
    "An autonomous security quadrotor designed for indoor patrol. ESP32-powered, PIR motion detection, real-time Wi-Fi logging.",
};

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#000] text-white antialiased overflow-x-hidden">

      {/* NAV — dark, Apple-style */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-70 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight text-white">ShopSherpa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
            <Link href="/#how-it-works" className="hover:text-white transition">How it works</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/product" className="text-white font-medium">MiniUAV</Link>
          </nav>
          <a
            href="mailto:hello@shopsherpa.org"
            className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition active:scale-[0.98]"
          >
            Contact us
          </a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-[95vh] px-6 text-center overflow-hidden">
        {/* Ambient glow */}
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[#2e6273]/20 blur-[120px] pointer-events-none" />
        <div aria-hidden className="absolute top-1/4 right-1/4 size-72 rounded-full bg-[#1d9e75]/10 blur-[80px] pointer-events-none" />

        <ScrollFade>
          <p className="text-xs uppercase tracking-[0.2em] text-[#1d9e75] mb-6 font-mono">MiniUAV Guardian</p>
        </ScrollFade>
        <ScrollFade delay={100}>
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-semibold tracking-tighter leading-[0.95] max-w-5xl mb-8">
            Security from<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e6273] via-[#1d9e75] to-[#2e6273]">
              a new angle.
            </span>
          </h1>
        </ScrollFade>
        <ScrollFade delay={200}>
          <p className="text-white/55 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            An autonomous indoor security quadrotor. Patrols on its own. Detects motion. Alerts you in real time.
          </p>
        </ScrollFade>
        <ScrollFade delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@shopsherpa.org"
              className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition active:scale-[0.98]"
            >
              Request early access
            </a>
            <a
              href="#specs"
              className="px-8 py-4 rounded-full bg-white/10 text-white font-medium text-sm border border-white/15 hover:bg-white/15 transition active:scale-[0.98]"
            >
              View specs
            </a>
          </div>
        </ScrollFade>

        {/* 3D render placeholder */}
        <ScrollFade delay={400}>
          <div className="mt-20 relative">
            <div className="w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-3xl bg-gradient-to-b from-[#1a2a35] to-[#0d1f2d] border border-white/10 flex flex-col items-center justify-center shadow-[0_0_120px_rgba(46,98,115,0.25)]">
              {/* Drone wireframe SVG */}
              <svg viewBox="0 0 200 160" className="w-48 md:w-64 text-[#2e6273]" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Body */}
                <rect x="75" y="65" width="50" height="35" rx="8" fill="#1d9e75" fillOpacity="0.15" stroke="#1d9e75" strokeWidth="1.5" />
                {/* Arms */}
                <line x1="75" y1="72" x2="30" y2="45" strokeOpacity="0.6" />
                <line x1="125" y1="72" x2="170" y2="45" strokeOpacity="0.6" />
                <line x1="75" y1="93" x2="30" y2="118" strokeOpacity="0.6" />
                <line x1="125" y1="93" x2="170" y2="118" strokeOpacity="0.6" />
                {/* Rotors */}
                <ellipse cx="30" cy="45" rx="22" ry="6" strokeOpacity="0.5" />
                <ellipse cx="170" cy="45" rx="22" ry="6" strokeOpacity="0.5" />
                <ellipse cx="30" cy="118" rx="22" ry="6" strokeOpacity="0.5" />
                <ellipse cx="170" cy="118" rx="22" ry="6" strokeOpacity="0.5" />
                {/* Motor hubs */}
                <circle cx="30" cy="45" r="4" fill="#1d9e75" stroke="#1d9e75" />
                <circle cx="170" cy="45" r="4" fill="#1d9e75" stroke="#1d9e75" />
                <circle cx="30" cy="118" r="4" fill="#1d9e75" stroke="#1d9e75" />
                <circle cx="170" cy="118" r="4" fill="#1d9e75" stroke="#1d9e75" />
                {/* Camera / PIR sensor */}
                <circle cx="100" cy="90" r="5" fill="#2e6273" stroke="#2e6273" strokeWidth="1" />
                {/* PCB grid inside body */}
                <line x1="83" y1="75" x2="83" y2="92" strokeOpacity="0.3" strokeWidth="0.8" />
                <line x1="91" y1="75" x2="91" y2="92" strokeOpacity="0.3" strokeWidth="0.8" />
                <line x1="109" y1="75" x2="109" y2="92" strokeOpacity="0.3" strokeWidth="0.8" />
                <line x1="117" y1="75" x2="117" y2="92" strokeOpacity="0.3" strokeWidth="0.8" />
              </svg>
              <p className="text-xs font-mono text-white/30 mt-6">3D render · WIP</p>
              <div className="absolute -top-2 -right-2 bg-[#1d9e75] text-white text-[10px] font-mono px-2 py-1 rounded-lg">
                In development
              </div>
            </div>
            {/* Ground shadow */}
            <div aria-hidden className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#2e6273]/20 blur-xl rounded-full" />
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

            {/* Large card — PCB */}
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
                      Triggers a buzzer on detection and logs a timestamped event over Wi-Fi. No cloud required — works on your local network.
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
              "Existing security cameras are passive. I wanted something that could move, think, and respond — without anyone controlling it."
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
          <a
            href="mailto:hello@shopsherpa.org"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition active:scale-[0.98]"
          >
            Contact us
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
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
