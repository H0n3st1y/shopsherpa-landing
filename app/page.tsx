import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal, HeroWords, CountUp } from "@/components/MotionPrimitives";
import { PreorderButton } from "@/components/PreorderButton";
import { WaitlistForm } from "@/components/WaitlistForm";
import { InteractiveField } from "@/components/InteractiveField";
import { ScamCheckDemo } from "@/components/ScamCheckDemo";
import { SiteHeader } from "@/components/SiteHeader";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)] antialiased overflow-x-hidden">
      <SiteHeader active="home" cta="preorder" />

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="section container-x grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center pt-16 md:pt-24">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-[var(--c-card)] type-caption hero-word hero-word--in"
            style={{ borderColor: "var(--c-line)" }}
          >
            <span className="size-1.5 rounded-full bg-[var(--c-green)] pulse-dot" />
            Open-source · early access
          </div>

          <h1 className="type-display mt-6 md:mt-8 max-w-[16ch]">
            <HeroWords text="Catch the scam" delay={120} />
            <br />
            <HeroWords text="before you pay." delay={120 + 60 * 3} accentWord="pay." accentClass="text-[var(--c-teal)]" />
          </h1>

          <Reveal delay={400}>
            <p className="mt-6 text-[1.0625rem] md:text-[1.125rem] leading-[1.55] max-w-[44ch] text-[var(--c-ink-2)]">
              ShopSherpa scans every store for fake reviews and bad sellers, and flags phishing emails before you open them. Free. Sixty seconds to install.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://chromewebstore.google.com/search/shopsherpa?hl=en&authuser=0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Add to Chrome — free
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={620}>
            <p className="mt-6 type-caption" style={{ color: "var(--c-ink-3)", letterSpacing: "0.04em" }}>
              <span style={{ textTransform: "none", fontFamily: "var(--font-sans)", fontSize: "var(--t-body)" }}>
                Chrome · Firefox · Safari   ·   No card required
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="group relative overflow-hidden rounded-[20px] border" style={{ borderColor: "var(--c-line)", boxShadow: "var(--shadow-2)" }}>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
              alt="ShopSherpa browser extension scanning an online checkout"
              className="image-lift aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section id="what-is-shopsherpa" aria-label="What is ShopSherpa" className="sr-only">
        <p>
          ShopSherpa is a free browser extension that protects online shoppers from fraud.
          It automatically scans websites for 1,800+ fraud patterns, detects fake reviews,
          flags counterfeit sellers, and identifies phishing emails in your inbox before you
          interact with them. A paid Plus tier adds masked virtual credit card numbers, a
          password vault with breach alerts, and advanced phishing shields for Gmail and
          Outlook — available as a one-time $9.99 lifetime pre-order.
        </p>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" className="section container-x section--bordered" style={{ background: "var(--c-card)" }}>
        <SectionHead
          eyebrow="Free, forever"
          title={<>Install it once.<br />It does the rest.</>}
          intro={<>No setup wizards. No manual scanning. ShopSherpa runs quietly and speaks up when something looks wrong.</>}
        />
        <Reveal delay={120}>
          <ol className="mt-12 grid md:grid-cols-3 gap-x-10 gap-y-12" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <Step n={1} title="Add the extension" copy="Sixty seconds. Chrome, Firefox, Safari." />
            <Step n={2} title="Shop normally" copy="ShopSherpa checks sellers and reviews in the background." />
            <Step n={3} title="Get a quiet alert" copy="Fake reviews, sketchy sellers, wrong checkout domain — before you pay." />
          </ol>
        </Reveal>
      </section>

      {/* ─── INSTANT SCAM CHECK ──────────────────────────────────── */}
      <section className="section container-x">
        <SectionHead
          eyebrow="New · beta"
          title={<>A gut-check<br />before you trust it.</>}
          intro={<>Paste a seller message, store link, or email sender. Get a clear risk readout.</>}
        />
        <Reveal delay={200} className="mt-12">
          <ScamCheckDemo />
        </Reveal>
      </section>

      {/* ─── MARIA DEMO ──────────────────────────────────────────── */}
      <section id="demo" className="bg-[var(--c-dark)] text-white relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="px-6 md:px-8">
              <p className="type-caption" style={{ color: "var(--c-green)" }}>Real example</p>
              <h2 className="type-h2 mt-4 max-w-3xl mx-auto">Maria almost paid $312.</h2>
              <p className="mt-4 max-w-lg mx-auto text-[1.0625rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.65)" }}>
                She got an email about a missed package. The sender looked exactly like Amazon. ShopSherpa flagged it before she clicked anything.
              </p>
            </div>
          }
        >
          <div className="h-full w-full bg-[#1a1a2e] rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111120] border-b border-white/5 shrink-0">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
              <span className="ml-3 type-caption" style={{ color: "rgba(255,255,255,0.3)" }}>Gmail — Inbox</span>
            </div>
            <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
              <span className="absolute top-6 right-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white type-caption" style={{ letterSpacing: "0.08em" }}>
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Flagged
              </span>
              <div className="flex items-start gap-3 mb-6">
                <div className="size-9 rounded-full bg-[var(--c-teal)] flex items-center justify-center text-xs font-semibold text-white shrink-0">A</div>
                <div>
                  <p className="text-sm font-medium text-white/90">Amazon</p>
                  <p className="text-xs font-mono text-red-400">tracking@am4z0n-delivery.shop</p>
                </div>
              </div>
              <p className="text-lg md:text-2xl font-medium text-white leading-snug mb-4 pr-24">
                Your package needs a redelivery fee. Confirm now.
              </p>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                We were unable to deliver your package. A redelivery fee of $3.99 is required within 24 hours or your package will be returned.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9900] text-black text-sm font-semibold rounded opacity-50 cursor-not-allowed select-none">
                Pay $3.99 now
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-red-500/15 border-t border-red-500/30 px-6 py-3 flex items-center gap-3">
                <svg className="size-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="text-xs text-red-300 font-mono">ShopSherpa: Spoofed domain detected. Do not click any links.</p>
              </div>
            </div>
          </div>
        </ContainerScroll>

        <div className="container-x px-6 md:px-8 pb-24">
          <Reveal delay={120}>
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
                  "Fake reviews flagged.",
                  "Leaves. Finds a real seller in 60 seconds.",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INTERACTIVE FIELD ───────────────────────────────────── */}
      <section className="bg-[var(--c-dark)] text-white section container-x">
        <Reveal>
          <h2 className="type-h2 text-center" style={{ color: "var(--c-green)" }}>
            Quiet by default.<br />Calm to the touch.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-md mx-auto text-center text-[1.0625rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.6)" }}>
            ShopSherpa stays out of the way until it has something to say.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="max-w-4xl mx-auto mt-12">
            <InteractiveField />
          </div>
        </Reveal>
      </section>

      {/* ─── PLAN COMPARISON ─────────────────────────────────────── */}
      <section id="compare" className="section container-x section--bordered" style={{ background: "var(--c-card)" }}>
        <SectionHead
          eyebrow="Free vs Plus"
          title={<>Start free.<br />Upgrade when you want the full shield.</>}
          intro={<>The free extension covers everyday shopping scams. Plus adds email, passwords, masked cards, and priority support.</>}
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          <Reveal>
            <PlanCard
              eyebrow="Free extension"
              title="For everyday shopping"
              price="Free"
              note="No card required"
              cta="Add to Chrome"
              href="https://chromewebstore.google.com/search/shopsherpa?hl=en&authuser=0"
              features={[
                "Real-time review scanning",
                "Fake seller detection",
                "Wrong checkout domain alerts",
                "Chrome, Firefox, Safari",
              ]}
            />
          </Reveal>
          <Reveal delay={100}>
            <PlanCard
              featured
              eyebrow="ShopSherpa Plus"
              title="For full account protection"
              price="$9.99"
              note="Lifetime · monthly pricing later"
              cta="Pre-order Plus"
              href="#pricing"
              preorder
              features={[
                "Everything in the free extension",
                "Phishing Shield for Gmail and Outlook",
                "Password vault with breach alerts",
                "Masked card numbers per store",
                "Priority support",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── PLUS / PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="section container-x" style={{ background: "var(--c-bg-alt)" }}>
        <SectionHead
          eyebrow="ShopSherpa Plus · early access"
          title={<>The full shield.<br />One price, forever.</>}
          intro={<>Pre-order locks in $9.99 for life. Monthly pricing comes later. The free tier stays free.</>}
        />

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Reveal><PlusCard icon={<ShieldIcon />} title="Phishing Shield" outcome="Scans Gmail and Outlook. Flags fake emails before you open them." /></Reveal>
          <Reveal delay={80}><PlusCard icon={<VaultIcon />} title="Password Vault" outcome="Stores passwords and alerts you the moment your data leaks." /></Reveal>
          <Reveal delay={160}><PlusCard icon={<CardIcon />} title="Masked Cards" outcome="A unique card number per store. Your real number stays private." /></Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 grid md:grid-cols-[1.1fr_1fr] gap-0 rounded-[20px] overflow-hidden" style={{ background: "var(--c-dark)", color: "#fff" }}>
            <div className="p-8 md:p-12">
              <p className="type-caption" style={{ color: "var(--c-green)" }}>Lifetime pre-order</p>
              <div className="mt-5 flex items-baseline gap-4">
                <p className="type-display" style={{ fontSize: "clamp(3rem, 6vw, 4.75rem)", lineHeight: 1 }}>$9.99</p>
                <p className="text-sm text-white/45">pay once, yours forever</p>
              </div>
              <div className="mt-10 max-w-xs">
                <div className="flex justify-between type-caption" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <CountUp value={184} suffix=" of 500 claimed" />
                  <span>316 left</span>
                </div>
                <div className="mt-2 h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <Reveal>
                    <div className="h-full bg-[var(--c-green)] rounded-full" style={{ width: "36.8%", transition: "width 900ms var(--ease)" }} />
                  </Reveal>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10 flex flex-col gap-6">
              <ul className="space-y-3 text-[var(--t-body)]" style={{ color: "rgba(255,255,255,0.8)" }}>
                {[
                  "Everything in the free extension",
                  "Phishing Shield for Gmail and Outlook",
                  "Password vault with breach alerts",
                  "Masked card numbers per store",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon className="text-[var(--c-green)] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <PreorderButton variant="white" />
              <p className="text-xs text-white/40 text-center">No subscription. One payment.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── ROADMAP ─────────────────────────────────────────────── */}
      <section id="roadmap" className="section container-x">
        <SectionHead
          eyebrow="Public roadmap"
          title={<>Here's exactly<br />what we're building.</>}
          intro={<>No vague promises. Updated as we ship.</>}
        />
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <Reveal>
            <RoadmapCard
              phase="Now · live"
              status="live"
              items={[
                "Real-time review scanning",
                "Fake seller detection",
                "Wrong checkout domain alerts",
                "Chrome, Firefox, Safari",
              ]}
            />
          </Reveal>
          <Reveal delay={100}>
            <RoadmapCard
              phase="Building · early access"
              status="building"
              items={[
                "Phishing Shield for Gmail and Outlook",
                "Password vault with breach alerts",
                "Masked card numbers per store",
                "Mobile app (iOS and Android)",
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── FOUNDER ─────────────────────────────────────────────── */}
      <section id="founder" className="bg-[var(--c-dark)] text-white section">
        <div className="container-x max-w-2xl text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#142736] ring-1 ring-white/15">
                <Image
                  src="/founder.png"
                  alt="Anghelo Araujo, founder of ShopSherpa"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="type-caption px-3 py-1.5 rounded-full border" style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>
                Anghelo · 16 · Nashua NH
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="type-caption" style={{ color: "var(--c-green)" }}>The story</p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="type-h2 mt-4">
              His mom lost $600 to a fake puppy listing.<br />That&apos;s why this exists.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <div className="font-serif space-y-5 mt-8 text-[1.0625rem] md:text-[1.125rem] leading-[1.7] text-left max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>
              <p>
                After weeks of begging for a dog, the money was wired and the seller vanished. The puppy never existed. That emotional toll turned into a mission.
              </p>
              <p>
                At 16, Anghelo has completed Harvard&apos;s CS50 and MIT Beaver Works programs in Quantum Software and Microelectronics. He interned at Rayfield Systems and competes in DECA and Track.
              </p>
              <p>
                ShopSherpa is his answer: an AI-powered shield that stops marketplace fraud before it hits your wallet, so no other family goes through what his did.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────── */}
      <section id="cta" className="section container-x" style={{ background: "var(--c-teal)", color: "#fff" }}>
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <h2 className="type-display" style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)", lineHeight: 0.98 }}>
              Shop without<br />the anxiety.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-[1.0625rem] md:text-[1.125rem] leading-[1.55]" style={{ color: "rgba(255,255,255,0.78)" }}>
              Add ShopSherpa to your browser, or join the waitlist to hear when Plus opens.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex justify-center">
              <a
                href="https://chromewebstore.google.com/search/shopsherpa?hl=en&authuser=0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary-inverse"
              >
                Add to Chrome — free
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex items-center gap-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.18)" }} />
              <span className="type-caption">or</span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.18)" }} />
            </div>
          </Reveal>
          <Reveal delay={420}>
            <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Not ready? Join the waitlist.
            </p>
            <div className="mt-3">
              <WaitlistForm />
            </div>
          </Reveal>
          <Reveal delay={520}>
            <p className="mt-10 type-caption" style={{ color: "rgba(255,255,255,0.45)" }}>
              <CountUp value={1800} suffix="+ fraud patterns · no spam · unsubscribe anytime" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[var(--c-dark)] text-white/60 section--tight" style={{ padding: "var(--s-4) var(--s-3)" }}>
        <div className="container-x flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
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
            <a href="https://x.com/shop_sherpa" className="hover:text-white transition">X</a>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa · made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

/* ─── HELPERS ─────────────────────────────────────────────────── */

function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div>
      <Reveal>
        <p className="type-caption">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="type-h2 mt-4 max-w-[18ch]">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-[1.55]" style={{ color: "var(--c-ink-2)" }}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="ShopSherpa"
      width={28}
      height={28}
      className={`size-7 shrink-0 object-contain ${dark ? "brightness-0 invert" : ""}`}
    />
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`size-4 shrink-0 ${className || "text-[var(--c-green)]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
    <li className="relative">
      <div className="type-caption mb-4" style={{ color: "var(--c-ink-3)" }}>0{n}</div>
      <h3 className="type-h3">{title}</h3>
      <p className="mt-3 type-body">{copy}</p>
    </li>
  );
}

function BeforeAfterCard({ label, variant, items }: { label: string; variant: "before" | "after"; items: string[] }) {
  const isBefore = variant === "before";
  return (
    <div
      className="rounded-2xl p-7 border"
      style={{
        background: isBefore ? "rgba(255,255,255,0.04)" : "rgba(29,158,117,0.08)",
        borderColor: isBefore ? "rgba(255,255,255,0.08)" : "rgba(29,158,117,0.22)",
      }}
    >
      <p className="type-caption mb-5" style={{ color: isBefore ? "rgba(255,255,255,0.4)" : "var(--c-green)" }}>{label}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-snug">
            {isBefore ? <XIcon /> : <CheckIcon className="text-[var(--c-green)] mt-0.5 shrink-0" />}
            <span style={{ color: isBefore ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)" }}>{item}</span>
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
    <div
      className="card-hover h-full rounded-[20px] border p-8 md:p-10 flex flex-col"
      style={{
        background: featured ? "var(--c-dark)" : "var(--c-bg)",
        color: featured ? "#fff" : "var(--c-ink)",
        borderColor: featured ? "var(--c-dark)" : "var(--c-line)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="type-caption" style={{ color: featured ? "var(--c-green)" : "var(--c-teal)" }}>{eyebrow}</p>
          <h3 className="type-h3 mt-3" style={{ fontSize: "1.5rem" }}>{title}</h3>
        </div>
        {featured && (
          <span className="type-caption px-2.5 py-1 rounded-full border" style={{ color: "var(--c-green)", borderColor: "rgba(29,158,117,0.3)" }}>
            Best value
          </span>
        )}
      </div>

      <div className="mb-8">
        <p className="type-display" style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1 }}>{price}</p>
        <p className="mt-2 text-sm" style={{ color: featured ? "rgba(255,255,255,0.5)" : "var(--c-ink-3)" }}>{note}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm" style={{ color: featured ? "rgba(255,255,255,0.78)" : "var(--c-ink-2)" }}>
            <CheckIcon className="text-[var(--c-green)] mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {preorder ? (
        <PreorderButton variant={featured ? "white" : "default"} />
      ) : (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`btn ${featured ? "btn-primary-inverse" : "btn-primary"}`}
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function PlusCard({ icon, title, outcome }: { icon: ReactNode; title: string; outcome: string }) {
  return (
    <div className="card card-hover h-full p-7">
      <div className="size-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--c-bg-alt)", color: "var(--c-teal)" }}>
        {icon}
      </div>
      <h3 className="type-h3">{title}</h3>
      <p className="mt-3 type-body">{outcome}</p>
    </div>
  );
}

function RoadmapCard({
  phase,
  status,
  items,
}: {
  phase: string;
  status: "live" | "building";
  items: string[];
}) {
  const isLive = status === "live";
  return (
    <div className="card h-full p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className={`size-1.5 rounded-full ${isLive ? "bg-[var(--c-green)] pulse-dot" : "bg-[var(--c-teal)]"}`} />
        <p className="type-caption" style={{ color: isLive ? "var(--c-green)" : "var(--c-teal)" }}>{phase}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--c-ink-2)" }}>
            <CheckIcon className={isLive ? "text-[var(--c-green)]" : "text-[var(--c-teal)]"} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
