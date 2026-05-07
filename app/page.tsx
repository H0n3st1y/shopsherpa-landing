import { WaitlistForm } from "@/components/WaitlistForm";
import { PreorderButton } from "@/components/PreorderButton";
import { FAQ } from "@/components/FAQ";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="border-b border-[var(--color-line)] sticky top-0 z-40 backdrop-blur-md bg-[var(--color-bg)]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-lg tracking-tight">ShopSherpa</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-ink-muted)]">
            <a href="#features" className="hover:text-[var(--color-ink)] transition">Features</a>
            <a href="#pricing" className="hover:text-[var(--color-ink)] transition">Pricing</a>
            <a href="#faq" className="hover:text-[var(--color-ink)] transition">FAQ</a>
          </nav>
          <a
            href="#pricing"
            className="text-sm font-medium px-4 py-2 rounded-full bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-deep)] transition"
          >
            Pre-order
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-line)] bg-[var(--color-card)] text-xs font-medium text-[var(--color-teal)] mb-8">
            <span className="size-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
            Plus tier launching Q3 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6">
            You already trust us<br />
            <span className="text-[var(--color-teal)]">at checkout.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-ink-muted)] leading-relaxed mb-10 max-w-2xl">
            ShopSherpa Plus extends our fraud detection beyond shopping. Phishing in your inbox, breaches in your accounts, and stolen card data. We catch them all. One subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PreorderButton />
            <a
              href="#waitlist"
              className="px-6 py-3.5 rounded-full border border-[var(--color-line)] bg-[var(--color-card)] font-medium hover:bg-[var(--color-bg-alt)] transition text-center"
            >
              Join waitlist instead
            </a>
          </div>
          <p className="text-sm text-[var(--color-ink-muted)]">
            <span className="font-mono">2,000+</span> shoppers protected.{" "}
            <span className="font-mono">$14,000</span> in scams stopped this year.
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="Active users" value="2,000+" />
          <Stat label="Scans run" value="47,000" />
          <Stat label="Fraud patterns" value="1,800+" />
          <Stat label="Avg rating" value="4.8 / 5" />
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">The problem</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            The scam follows you home.
          </h2>
          <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed">
            The fake Amazon page was just the start. The real attack happens after. In your inbox. In your saved passwords. In the card data you handed over six months ago.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ProblemCard
            stat="75%"
            title="Phishing emails"
            body="Three out of four data breaches start with a single email. Fake delivery notices, fake refund offers, fake password resets."
          />
          <ProblemCard
            stat="81%"
            title="Reused passwords"
            body="Most account hacks happen because one password got leaked from a different site you forgot about. Your bank pays for a Netflix breach."
          />
          <ProblemCard
            stat="every"
            title="Stolen card data"
            body="Every checkout is a lottery ticket for a future fraudster. Once your number is out there, it gets sold and resold for years."
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[var(--color-bg-alt)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">What's in Plus</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Three tools. One job. Keep your money where it belongs.
            </h2>
          </div>

          <div className="space-y-4">
            <FeatureRow
              num="01"
              title="Phishing Shield"
              tagline="Same fraud AI. Now in your inbox."
              body="Connect Gmail or Outlook in two clicks. Our scanner reads incoming mail and flags fake delivery notices, fake refund offers, and fake login pages before you click them. The same AI that's caught $14,000 in shopping scams now watches every message you get."
            />
            <FeatureRow
              num="02"
              title="Password Vault"
              tagline="Breach alerts before the news does."
              body="Save your logins. We watch the dark web. The moment a site you use gets breached, we tell you. One tap rotates the password. No more discovering a leak six months late from a panicked email."
            />
            <FeatureRow
              num="03"
              title="Masked Cards"
              tagline="A new card number for every store."
              body="Your real card stays hidden. Every merchant gets a unique virtual number. If they get hacked, your number is worthless. If you cancel a subscription, they can't charge you again. Built right into our existing checkout flow."
            />
          </div>
        </div>
      </section>

      {/* The moment */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">A real story</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Last Tuesday, Maria almost lost $312.
          </h2>
        </div>

        <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-2xl p-8 md:p-12 max-w-3xl shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[var(--color-line)]">
            <div className="size-10 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-center font-mono text-sm">A</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Amazon Shipping</span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-50 text-red-700 font-mono">FLAGGED</span>
              </div>
              <p className="text-sm text-[var(--color-ink-muted)] font-mono">amazn-shipping@delivery.net</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed mb-6">
            <span className="font-medium">Subject:</span> Issue with your delivery — verify address now
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-8">
            Real package arriving 2pm. Sender domain doesn't match. "Verify" link points to a credential harvester registered yesterday.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <div className="flex-1 px-4 py-3 rounded-xl bg-red-50 text-red-900 border border-red-100">
              <p className="font-mono text-xs uppercase tracking-wider mb-1">Without Plus</p>
              <p className="font-medium">$312 charged. Card data sold.</p>
            </div>
            <div className="flex-1 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
              <p className="font-mono text-xs uppercase tracking-wider mb-1">With Plus</p>
              <p className="font-medium">Flagged in 0.4 seconds. Never opened.</p>
            </div>
          </div>
        </div>

        <p className="text-[var(--color-ink-muted)] mt-8 max-w-2xl">
          This is what Plus does. Every day. Quietly. Without you having to remember to check.
        </p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[var(--color-bg-alt)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
              Pay $9.99 once. Use Plus forever.
            </h2>
            <p className="text-lg text-[var(--color-ink-muted)]">
              First 500 pre-orders only. Then the lifetime tier closes and Plus is monthly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Free */}
            <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-2xl p-8">
              <p className="text-sm font-mono text-[var(--color-ink-muted)] mb-2 uppercase tracking-wider">Free</p>
              <p className="text-4xl font-semibold mb-1">$0</p>
              <p className="text-sm text-[var(--color-ink-muted)] mb-8">Forever. Always.</p>
              <ul className="space-y-3 text-sm mb-8">
                <Bullet>Shopping fraud detection</Bullet>
                <Bullet>Amazon, eBay, Walmart, AliExpress, Etsy</Bullet>
                <Bullet>5 scans per month</Bullet>
                <Bullet>Browser extension</Bullet>
              </ul>
              <a
                href="https://chrome.google.com/webstore/"
                className="block w-full text-center px-6 py-3 rounded-full border border-[var(--color-line)] font-medium hover:bg-[var(--color-bg-alt)] transition"
              >
                Install free
              </a>
            </div>

            {/* Plus */}
            <div className="bg-[var(--color-teal)] text-white rounded-2xl p-8 relative overflow-hidden shadow-[var(--shadow-lift)]">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--color-green)] text-xs font-medium">
                Pre-order — 184 left
              </div>
              <p className="text-sm font-mono text-white/70 mb-2 uppercase tracking-wider">Plus</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-semibold">$9.99</p>
                <p className="text-white/70 text-sm">one-time, lifetime</p>
              </div>
              <p className="text-sm text-white/70 mb-8 line-through">Will be $14.99/mo at launch</p>
              <ul className="space-y-3 text-sm mb-8">
                <BulletWhite>Everything in Free, unlimited scans</BulletWhite>
                <BulletWhite>Phishing shield for Gmail + Outlook</BulletWhite>
                <BulletWhite>Password vault + breach alerts</BulletWhite>
                <BulletWhite>Masked card numbers</BulletWhite>
                <BulletWhite>Priority support</BulletWhite>
                <BulletWhite>Beta access starting July 2026</BulletWhite>
              </ul>
              <PreorderButton variant="white" />
              <p className="text-xs text-white/60 mt-4 text-center">30-day refund. No questions asked.</p>
            </div>
          </div>

          {/* Waitlist below pricing */}
          <div id="waitlist" className="mt-16 max-w-2xl">
            <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">Not ready to pre-order?</p>
            <h3 className="text-2xl font-semibold mb-4">Get notified when Plus launches.</h3>
            <p className="text-[var(--color-ink-muted)] mb-6">
              Drop your email. We'll send one note when Plus is live and one if the lifetime tier is about to sell out. Nothing else.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-mono text-[var(--color-teal)] mb-4 uppercase tracking-wider">Questions</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            The stuff people ask before paying.
          </h2>
        </div>
        <FAQ />
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Logo />
                <span className="font-semibold text-lg">ShopSherpa</span>
              </div>
              <p className="text-[var(--color-ink-muted)] text-sm max-w-sm leading-relaxed">
                Built by Anghelo Araujo and Milan Joby. Made in Nashua, NH. Made for everyone who still gets that feeling at checkout.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">Product</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-[var(--color-teal)] transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-[var(--color-teal)] transition">Pricing</a></li>
                <li><a href="#faq" className="hover:text-[var(--color-teal)] transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mb-4">Contact</p>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:hello@shopsherpa.ai" className="hover:text-[var(--color-teal)] transition">hello@shopsherpa.ai</a></li>
                <li><a href="mailto:refund@shopsherpa.ai" className="hover:text-[var(--color-teal)] transition">refund@shopsherpa.ai</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[var(--color-line)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[var(--color-ink-muted)]">
            <p>© 2026 ShopSherpa, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-[var(--color-teal)] transition">Privacy</a>
              <a href="/terms" className="hover:text-[var(--color-teal)] transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Logo() {
  return (
    <div className="size-8 rounded-lg bg-[var(--color-teal)] text-white flex items-center justify-center font-serif text-sm font-semibold">
      SS
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-2xl md:text-3xl font-medium tracking-tight mb-1">{value}</p>
      <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-wider">{label}</p>
    </div>
  );
}

function ProblemCard({ stat, title, body }: { stat: string; title: string; body: string }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-2xl p-8">
      <p className="font-mono text-3xl text-[var(--color-warn)] mb-4">{stat}</p>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function FeatureRow({
  num,
  title,
  tagline,
  body,
}: {
  num: string;
  title: string;
  tagline: string;
  body: string;
}) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-2xl p-8 md:p-10 grid md:grid-cols-[80px_1fr] gap-6 md:gap-12">
      <p className="font-mono text-sm text-[var(--color-teal)] tracking-wider">{num}</p>
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{title}</h3>
        <p className="text-[var(--color-teal)] mb-4 italic">{tagline}</p>
        <p className="text-[var(--color-ink-muted)] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="size-5 text-[var(--color-green)] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function BulletWhite({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="size-5 text-white shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
