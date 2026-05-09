import { ScrollFade } from "@/components/ScrollFade";
import { ChatDemo } from "@/components/ChatDemo";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#1a1a1a]/70">
            <a href="#demo" className="hover:text-[#1a1a1a] transition">Demo</a>
            <a href="#use-cases" className="hover:text-[#1a1a1a] transition">Use cases</a>
            <a href="#testimonials" className="hover:text-[#1a1a1a] transition">Customers</a>
            <a href="#pricing" className="hover:text-[#1a1a1a] transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#demo" className="hidden sm:inline text-sm text-[#1a1a1a]/70 hover:text-[#1a1a1a] px-3 py-2">Sign in</a>
            <a
              href="#cta"
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#1a1a1a] text-white hover:bg-[#2e6273] transition active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-8 pt-20 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollFade>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2e6273]/15 bg-white text-xs font-mono text-[#2e6273] mb-8">
              <span className="size-1.5 rounded-full bg-[#1d9e75] pulse-dot" />
              Now in private beta · 50+ stores live
            </div>
          </ScrollFade>

          <ScrollFade delay={120}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter leading-[0.98] max-w-4xl">
              The AI sales agent that{" "}
              <span className="text-[#2e6273]">closes while you sleep.</span>
            </h1>
          </ScrollFade>

          <ScrollFade delay={240}>
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#1a1a1a]/65 max-w-xl leading-relaxed">
              Embed ShopSherpa on your site in 2 minutes. It answers product questions, recovers carts, and converts visitors into paying customers — 24/7.
            </p>
          </ScrollFade>

          <ScrollFade delay={360}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#cta"
                className="px-6 py-3.5 rounded-full bg-[#1a1a1a] text-white font-medium hover:bg-[#2e6273] transition-[transform,background-color] duration-150 active:scale-[0.98] text-center"
              >
                Try Demo →
              </a>
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-full bg-white text-[#1a1a1a] border border-[#2e6273]/15 font-medium hover:border-[#2e6273]/40 transition active:scale-[0.98] text-center"
              >
                See it in action
              </a>
            </div>
          </ScrollFade>

          <ScrollFade delay={500}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#1a1a1a]/50">
              <div className="flex items-center gap-2"><Check />2-minute install</div>
              <div className="flex items-center gap-2"><Check />No credit card required</div>
              <div className="flex items-center gap-2"><Check />Cancel anytime</div>
            </div>
          </ScrollFade>
        </div>

        {/* Subtle background ornament */}
        <div aria-hidden className="absolute -top-32 -right-32 size-[480px] rounded-full bg-[#2e6273]/5 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-24 -left-24 size-80 rounded-full bg-[#1d9e75]/5 blur-3xl pointer-events-none" />
      </section>

      {/* LIVE DEMO */}
      <section id="demo" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <ScrollFade>
                <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Live demo</p>
              </ScrollFade>
              <ScrollFade delay={120}>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-6">
                  See ShopSherpa<br />in conversation.
                </h2>
              </ScrollFade>
              <ScrollFade delay={240}>
                <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  This is a real conversation, not a screenshot. Trained on your catalog, your policies, and your brand voice — within minutes of install.
                </p>
              </ScrollFade>
              <ScrollFade delay={360}>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-3"><DotGreen />Answers product questions in under 2 seconds</li>
                  <li className="flex items-start gap-3"><DotGreen />Recovers abandoned carts with personalized nudges</li>
                  <li className="flex items-start gap-3"><DotGreen />Hands off to humans when it actually matters</li>
                </ul>
              </ScrollFade>
            </div>

            <ScrollFade delay={300}>
              <ChatDemo />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="bg-[#F4F0E8] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Built for</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-16 max-w-3xl">
              One agent.<br />Three businesses it loves.
            </h2>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}>
              <UseCaseCard
                tag="E-commerce"
                title="Recover the cart, close the sale."
                copy="Catches hesitating shoppers, answers sizing and shipping questions instantly, and closes 23% more checkouts on average."
                metric="+23% conversion"
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <UseCaseCard
                tag="SaaS"
                title="Qualify leads while they're hot."
                copy="Talks to visitors the moment intent shows, qualifies fit, and books demos straight into your founder's calendar."
                metric="3× more demos booked"
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <UseCaseCard
                tag="Agencies"
                title="Deploy across every client."
                copy="One dashboard, infinite agents. White-label, multi-tenant, and priced so the margin lives with you."
                metric="$0 → $80K MRR for one agency"
              />
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#FAF8F4] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">How it works</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-16 max-w-3xl">
              From paste to paying customers<br />in two minutes.
            </h2>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <ScrollFade delay={100}><Step n={1} title="Paste one line of code." copy="Drop a single script tag onto your site. That's the install." /></ScrollFade>
            <ScrollFade delay={200}><Step n={2} title="It learns your store overnight." copy="Indexes your catalog, FAQs, and policies. No manual training." /></ScrollFade>
            <ScrollFade delay={300}><Step n={3} title="It starts closing." copy="Greets visitors, answers questions, recovers carts. You sleep." /></ScrollFade>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="testimonials" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono text-center">Customers</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-16 max-w-3xl mx-auto text-center">
              Stores that ship faster<br />because of ShopSherpa.
            </h2>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}>
              <TestimonialCard
                quote="We installed it on a Friday and watched conversion jump 19% by Monday. It pays for itself before lunch."
                name="Priya N."
                role="Founder, Halftone Apparel"
              />
            </ScrollFade>
            <ScrollFade delay={200}>
              <TestimonialCard
                quote="The thing actually sounds like our brand. Customers thought they were talking to our team. Wild."
                name="Marcus L."
                role="Head of Growth, Northstar"
              />
            </ScrollFade>
            <ScrollFade delay={300}>
              <TestimonialCard
                quote="Cut our support tickets in half and books 5× more demos than the form ever did. Replaces three tools."
                name="Riya S."
                role="COO, Frame Studio"
              />
            </ScrollFade>
          </div>

          {/* Trust strip */}
          <ScrollFade delay={500}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
              <Stat n="50+" label="Stores live in beta" />
              <Stat n="2.1M" label="Visitors helped" />
              <Stat n="99.99%" label="Uptime, last 90 days" />
              <Stat n="SOC 2" label="Type II in progress" />
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#F4F0E8] px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <ScrollFade>
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono text-center">Pricing</p>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 text-center">
              Simple. Honest.<br />Pays for itself.
            </h2>
          </ScrollFade>
          <ScrollFade delay={240}>
            <p className="text-[#1a1a1a]/60 text-center max-w-md mx-auto mb-16">
              Start free. Upgrade only when ShopSherpa is making you more than it costs.
            </p>
          </ScrollFade>

          <div className="grid md:grid-cols-3 gap-5">
            <ScrollFade delay={100}><PriceCard name="Starter" price="Free" sub="Forever" features={["100 conversations / mo", "Basic catalog sync", "Community support"]} /></ScrollFade>
            <ScrollFade delay={200}><PriceCard name="Growth" price="$49" sub="per month" features={["Unlimited conversations", "Cart recovery", "Brand voice training", "Priority support"]} highlighted /></ScrollFade>
            <ScrollFade delay={300}><PriceCard name="Agency" price="Custom" sub="Talk to us" features={["Multi-tenant dashboard", "White-label", "Dedicated onboarding", "SOC 2 reports"]} /></ScrollFade>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="bg-[#2e6273] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollFade>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[0.98]">
              Try it on your site.<br />Free for 14 days.
            </h2>
          </ScrollFade>
          <ScrollFade delay={150}>
            <p className="mt-6 mb-10 text-white/75 max-w-md mx-auto text-lg">
              No card. No commitment. Just paste one line and watch what happens.
            </p>
          </ScrollFade>
          <ScrollFade delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="px-7 py-4 rounded-full bg-white text-[#2e6273] font-semibold hover:bg-[#F4F0E8] transition active:scale-[0.98]"
              >
                Get Started Free →
              </a>
              <a
                href="#"
                className="px-7 py-4 rounded-full bg-transparent text-white border border-white/30 font-medium hover:border-white/60 transition active:scale-[0.98]"
              >
                Book a Demo
              </a>
            </div>
          </ScrollFade>
          <ScrollFade delay={450}>
            <p className="mt-8 text-xs text-white/50 font-mono">
              SOC 2 Type II in progress · GDPR compliant · Encrypted at rest
            </p>
          </ScrollFade>
        </div>
        <div aria-hidden className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/5" />
        <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-white/5" />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1f2d] text-white/70 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-medium text-white">ShopSherpa</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Security</a>
            <a href="#" className="hover:text-white transition">Status</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
          <div className="text-xs text-white/40">© 2026 ShopSherpa</div>
        </div>
      </footer>
    </main>
  );
}

/* ─────── HELPERS ─────── */

function Logo() {
  return (
    <div className="size-7 rounded-lg bg-[#2e6273] text-white flex items-center justify-center font-serif font-semibold text-xs">
      SS
    </div>
  );
}

function Check() {
  return (
    <svg className="size-4 text-[#1d9e75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotGreen() {
  return <span className="size-1.5 rounded-full bg-[#1d9e75] mt-2 shrink-0" />;
}

function UseCaseCard({ tag, title, copy, metric }: { tag: string; title: string; copy: string; metric: string }) {
  return (
    <div className="bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-[transform,box-shadow] duration-200">
      <p className="text-xs uppercase tracking-wider text-[#2e6273] font-mono mb-5">{tag}</p>
      <h3 className="text-2xl font-medium leading-snug mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mb-6">{copy}</p>
      <div className="pt-5 border-t border-[#2e6273]/10">
        <p className="text-sm font-mono font-medium text-[#1d9e75]">{metric}</p>
      </div>
    </div>
  );
}

function Step({ n, title, copy }: { n: number; title: string; copy: string }) {
  return (
    <div>
      <div className="size-10 rounded-full bg-[#2e6273] text-white flex items-center justify-center font-mono font-medium mb-6">
        {n}
      </div>
      <h3 className="text-xl font-medium mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">{copy}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="bg-[#142736] border border-white/10 rounded-2xl p-7 h-full flex flex-col">
      <p className="text-base md:text-lg leading-snug mb-6 flex-1">"{quote}"</p>
      <div className="pt-5 border-t border-white/10">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-white/50 mt-0.5">{role}</p>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-medium tracking-tighter text-[#1d9e75]">{n}</p>
      <p className="text-xs uppercase tracking-wider text-white/50 font-mono mt-2">{label}</p>
    </div>
  );
}

function PriceCard({
  name,
  price,
  sub,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  sub: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-7 border h-full flex flex-col ${
        highlighted
          ? "bg-[#2e6273] text-white border-[#2e6273] shadow-[0_20px_60px_rgba(46,98,115,0.25)] md:scale-105"
          : "bg-white text-[#1a1a1a] border-[#2e6273]/15"
      }`}
    >
      {highlighted && (
        <p className="text-xs uppercase tracking-wider font-mono text-[#1d9e75] mb-2">Most popular</p>
      )}
      <p className={`text-sm font-medium ${highlighted ? "text-white/80" : "text-[#1a1a1a]/70"}`}>{name}</p>
      <div className="flex items-baseline gap-2 mt-2 mb-5">
        <p className="text-4xl md:text-5xl font-medium tracking-tighter">{price}</p>
        <p className={`text-sm ${highlighted ? "text-white/60" : "text-[#1a1a1a]/50"}`}>{sub}</p>
      </div>
      <ul className="space-y-2.5 text-sm flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`${highlighted ? "text-[#1d9e75]" : "text-[#2e6273]"} mt-0.5`}>
              <Check />
            </span>
            <span className={highlighted ? "text-white/90" : "text-[#1a1a1a]/80"}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#cta"
        className={`mt-7 px-5 py-3 rounded-full text-sm font-medium text-center transition active:scale-[0.98] ${
          highlighted
            ? "bg-white text-[#2e6273] hover:bg-[#F4F0E8]"
            : "bg-[#1a1a1a] text-white hover:bg-[#2e6273]"
        }`}
      >
        {price === "Free" ? "Start free" : price === "Custom" ? "Contact sales" : "Start 14-day trial"}
      </a>
    </div>
  );
}
