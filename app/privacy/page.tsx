import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "ShopSherpa's privacy policy explains what data we collect, what stays on your device, and how we handle account, email, payment, and waitlist information.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we collect",
    body: [
      "Waitlist and pre-order details, such as your email address and Stripe checkout status.",
      "Basic product analytics, such as page visits, feature usage, browser type, and error logs.",
      "Security signals needed to evaluate a store, seller, checkout domain, review pattern, or suspicious message.",
    ],
  },
  {
    title: "What we do not sell",
    body: [
      "We do not sell personal data.",
      "We do not sell browsing history.",
      "We do not sell email content, payment information, or security alerts.",
    ],
  },
  {
    title: "Browser extension data",
    body: [
      "The free extension is designed to inspect shopping pages only when it needs to identify scam signals.",
      "Store URLs, seller details, review patterns, and checkout domains may be checked against ShopSherpa's fraud-pattern database.",
      "Where possible, checks should happen locally or with minimized data. If cloud checks are needed, they should use only the smallest practical amount of information.",
    ],
  },
  {
    title: "Email protection",
    body: [
      "Phishing Shield is planned for ShopSherpa Plus. It is intended to check sender domains, link destinations, and scam-language patterns.",
      "The product should not store your inbox content or use your private emails for advertising.",
      "If a future email integration requires permission from Gmail, Outlook, or another provider, the permission screen should explain exactly what access is requested.",
    ],
  },
  {
    title: "Password vault and masked cards",
    body: [
      "Password Vault and Masked Cards are Plus features planned for launch. These features involve sensitive data, so they will require stronger security controls before public release.",
      "ShopSherpa should never display or store raw card data unless a payment partner requires it for the feature to work. Stripe currently handles pre-order checkout.",
      "Masked Cards are intended to create store-specific payment aliases so your real card number is not exposed to unfamiliar merchants.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can unsubscribe from emails at any time.",
      "You can ask us to delete waitlist or account information by emailing hello@shopsherpa.org.",
      "You can uninstall the extension at any time from your browser's extension settings.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <SiteHeader active="home" cta="waitlist" />

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Trust center</p>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed">
            ShopSherpa is built to protect people from scams, not create a new privacy problem. This page explains what we collect, what we avoid collecting, and how sensitive features should work as the product moves from beta to launch.
          </p>
          <p className="mt-5 text-xs font-mono text-[#1a1a1a]/40">Last updated: May 14, 2026</p>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="rounded-2xl bg-white border border-[#2e6273]/10 p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">Short version</p>
            <p className="text-[#1a1a1a]/70 leading-relaxed">
              We collect the information needed to run the waitlist, process pre-orders, improve the product, and detect scam signals. We do not sell your personal data. Features involving email, passwords, or masked cards should use the least access possible and clear permission screens before launch.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <section key={section.title} className="rounded-2xl bg-white border border-[#2e6273]/10 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">{section.title}</h2>
              <ul className="space-y-3">
                {section.body.map((item) => (
                  <li key={item} className="flex gap-3 text-[#1a1a1a]/70 leading-relaxed">
                    <span className="mt-2 size-1.5 rounded-full bg-[#1d9e75] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rounded-2xl bg-[#0d1f2d] text-white p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">Questions or deletion requests</h2>
            <p className="text-white/65 leading-relaxed mb-6">
              Email us if you want your waitlist information deleted, have a privacy question, or want more detail about a specific product feature.
            </p>
            <a
              href="mailto:hello@shopsherpa.org?subject=Privacy%20question"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0d1f2d] transition hover:bg-[#F4F0E8] active:scale-[0.98]"
            >
              Email privacy question
            </a>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <Logo dark />
          <span className="font-medium text-white">ShopSherpa</span>
        </Link>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/privacy" className="text-white transition">Privacy</Link>
          <Link href="/security" className="hover:text-white transition">Security</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <Link href="/scam-directory" className="hover:text-white transition">Scam Directory</Link>
          <Link href="/team" className="hover:text-white transition">Team</Link>
        </div>
        <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
      </div>
    </footer>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  void dark;
  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-black/5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="ShopSherpa" width={24} height={24} className="size-full object-contain" />
    </span>
  );
}
