import type { ReactNode } from "react";
import Image from "next/image";
import { ScrollFade } from "@/components/ScrollFade";
import { HeroShapes } from "@/components/HeroShapes";
import { PreorderButton } from "@/components/PreorderButton";
import { WaitlistForm } from "@/components/WaitlistForm";
import { InteractiveField } from "@/components/InteractiveField";
import { StoryCard } from "@/components/StoryCard";

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
            <a href="#how-it-works" className="hover:text-[#1a1a1a] transition">How it works</a>
            <a href="#demo" className="hover:text-[#1a1a1a] transition">Demo</a>
            <a href="#roadmap" className="hover:text-[#1a1a1a] transition">Roadmap</a>
            <a href="#pricing" className="hover:text-[#1a1a1a] transition">Pricing</a>
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
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter leading-[0.98] max-w-4xl">
              Catch the scam{" "}
              <span className="text-[#2e6273]">before you pay.</span>
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
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#2e6273]/10 rounded-full px-3 py-1.5"><CheckIcon />No credit card for free tier</div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#2e6273]/10 rounded-full px-3 py-1.5"><CheckIcon />Chrome, Firefox, Safari</div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#2e6273]/10 rounded-full px-3 py-1.5"><CheckIcon />Public launch Q3 2026</div>
            </div>
          </ScrollFade>
        </div>

        <div aria-hidden className="absolute -top-32 -right-32 size-[480px] rounded-full bg-[#2e6273]/5 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-24 -left-24 size-80 rounded-full bg-[#1d9e75]/5 blur-3xl pointer-events-none" />
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

      {/* ─── LIVE PRODUCT MOMENT ───────────────────────────────────────────────
          The Maria story. PhishingDemo handles the staged animation.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="demo" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <ScrollFade>
              <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Real example</p>
            </ScrollFade>
            <ScrollFade delay={120}>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-4 max-w-3xl">
                Maria almost paid $312.
              </h2>
            </ScrollFade>
            <ScrollFade delay={240}>
              <p className="text-white/65 max-w-lg text-base md:text-lg leading-relaxed">
                She got an email about a missed package. The sender looked exactly like Amazon. ShopSherpa flagged it before she clicked anything.
              </p>
            </ScrollFade>
          </div>

          <ScrollFade delay={300}>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <BeforeAfterCard
                label="Without ShopSherpa"
                variant="before"
                items={[
                  "Opens the email.",
                  "Clicks the link. Enters her card.",
                  "Loses $312 to a scammer.",
                ]}
              />
              <BeforeAfterCard
                label="With ShopSherpa"
                variant="after"
                items={[
                  "Email arrives. ShopSherpa scans it.",
                  "A FLAGGED badge slides in.",
                  "Maria deletes it. Keeps her $312.",
                ]}
              />
            </div>
          </ScrollFade>
        </div>
        <div aria-hidden className="absolute -bottom-40 -right-40 size-96 rounded-full bg-[#2e6273]/10 blur-3xl pointer-events-none" />
      </section>

      {/* ─── INTERACTIVE FIELD ─────────────────────────────────────────────────
          A quiet moment between the demo and the pricing pitch.
          Shows the product's personality: calm, not alarming.
          StoryCards below reinforce with real examples.
      ────────────────────────────────────────────────────────────────────── */}
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

      {/* ─── FOUNDER ───────────────────────────────────────────────────────────
          Centered layout: photo + name badge above, story text below.
      ────────────────────────────────────────────────────────────────────── */}
      <section id="founder" className="bg-[#0d1f2d] text-white px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">

          {/* Photo centered */}
          <ScrollFade>
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="relative inline-block">
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#142736] ring-4 ring-white/10">
                  <Image
                    src="/founder.png"
                    alt="Anghelo Araujo, founder of ShopSherpa"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#1d9e75] text-white text-xs font-mono px-2.5 py-1.5 rounded-lg leading-snug">
                  <span className="block font-medium">Anghelo, 16</span>
                  <span className="text-white/80">Nashua, NH</span>
                </div>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade delay={100}>
            <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-5 font-mono">The story</p>
          </ScrollFade>
          <ScrollFade delay={200}>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-8">
              He almost lost $600 to a fake puppy.<br />That's why this exists.
            </h2>
          </ScrollFade>
          <ScrollFade delay={300}>
            <div className="space-y-5 text-white/70 text-base md:text-lg leading-relaxed text-left max-w-xl mx-auto">
              <p>
                When Anghelo was young, he found a puppy listing online. The photos looked real. The seller sent a contract. He almost wired $600 before something felt off.
              </p>
              <p>
                The puppy never existed. The seller vanished.
              </p>
              <p>
                He spent years thinking about how easy it is to get fooled. Then he built ShopSherpa so it doesn't happen to you.
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
            <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
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
    <div className={`size-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 ${dark ? "bg-white" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="ShopSherpa" width={32} height={32} className="w-full h-full object-contain" />
    </div>
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
    <div className="bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-[transform,box-shadow] duration-200">
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
      className="group bg-[#FAF8F4] rounded-2xl p-7 border border-[#2e6273]/10 h-full flex flex-col hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-[transform,box-shadow] duration-200"
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
    <div className="bg-white border border-[#2e6273]/10 rounded-2xl p-7 h-full flex flex-col shadow-[var(--shadow-soft)]">
      <p className="text-base leading-snug mb-6 flex-1 text-[#1a1a1a]/85">"{quote}"</p>
      <div className="pt-5 border-t border-[#2e6273]/10">
        <p className="text-sm font-medium text-[#1a1a1a]">{name}</p>
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
