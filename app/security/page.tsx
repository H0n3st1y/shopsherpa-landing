import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description:
    "ShopSherpa's security page explains the product's safety principles, planned controls for Plus features, vulnerability reporting, and responsible disclosure process.",
  path: "/security",
});

const PRINCIPLES = [
  {
    title: "Least access",
    copy: "ShopSherpa should ask for the smallest set of browser, email, and payment permissions needed to protect users.",
  },
  {
    title: "Local first where possible",
    copy: "Scam checks should run locally when they can. If a server check is needed, the request should be limited to the specific signal being checked.",
  },
  {
    title: "No quiet trust me",
    copy: "Warnings should explain the reason: spoofed domain, risky seller pattern, suspicious checkout link, or phishing signal.",
  },
  {
    title: "Sensitive features need stronger controls",
    copy: "Password Vault and Masked Cards should not launch broadly until encryption, access controls, logging, and incident response are ready.",
  },
];

const CONTROLS = [
  "HTTPS everywhere for the public site and product APIs.",
  "Stripe-hosted checkout for Plus pre-orders.",
  "Supabase-backed waitlist storage with restricted project access.",
  "Minimal retention for logs that are not needed for product safety or debugging.",
  "Human review before adding high-risk integrations such as inbox access, vault storage, or masked-card flows.",
  "A responsible disclosure inbox at anghelobusiness@gmail.com.",
];

const ROADMAP = [
  "Publish browser extension permission notes before public launch.",
  "Document data flows for Free, Plus, Phishing Shield, Password Vault, and Masked Cards.",
  "Add a dedicated security.txt file before launch.",
  "Run extension permission and dependency reviews before browser-store submission.",
  "Complete a third-party review before any password vault or card-masking feature handles real sensitive data.",
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <SiteHeader active="home" cta="waitlist" />

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Trust center</p>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1] mb-6">
            Security
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed">
            ShopSherpa is a security product, so trust has to be earned. This page explains the security principles behind the product, what is already in place, what must be finished before launch, and how to report a vulnerability.
          </p>
          <p className="mt-5 text-xs font-mono text-[#1a1a1a]/40">Last updated: May 14, 2026</p>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="card-hover rounded-2xl bg-white border border-[#2e6273]/10 p-6">
                <div className="size-10 rounded-xl bg-[#F4F0E8] border border-[#2e6273]/10 grid place-items-center mb-5">
                  <ShieldIcon />
                </div>
                <h2 className="text-xl font-medium tracking-tight mb-3">{principle.title}</h2>
                <p className="text-sm text-[#1a1a1a]/62 leading-relaxed">{principle.copy}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div className="rounded-2xl bg-[#0d1f2d] text-white p-7 md:p-8">
              <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Responsible disclosure</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Found a security issue?</h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Please report it before making it public. Include the affected page or feature, steps to reproduce, impact, and screenshots or proof-of-concept details if safe to share.
              </p>
              <a
                href="mailto:anghelobusiness@gmail.com?subject=Security%20report"
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0d1f2d] transition hover:bg-[#F4F0E8] active:scale-[0.98]"
              >
                Report security issue
              </a>
            </div>

            <div className="space-y-5">
              <section className="rounded-2xl bg-white border border-[#2e6273]/10 p-7 md:p-8">
                <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Current controls</p>
                <ul className="space-y-3">
                  {CONTROLS.map((item) => (
                    <li key={item} className="flex gap-3 text-[#1a1a1a]/70 leading-relaxed">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-white border border-[#2e6273]/10 p-7 md:p-8">
                <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Before public launch</p>
                <ul className="space-y-3">
                  {ROADMAP.map((item) => (
                    <li key={item} className="flex gap-3 text-[#1a1a1a]/70 leading-relaxed">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <section className="mt-8 rounded-2xl bg-white border border-[#2e6273]/10 p-7 md:p-8">
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Important product boundary</p>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">ShopSherpa helps reduce risk. It does not guarantee safety.</h2>
            <p className="text-[#1a1a1a]/65 leading-relaxed">
              Scammers change tactics constantly. ShopSherpa is designed to flag suspicious patterns and give shoppers a second set of eyes before they pay, but no security product can promise to catch every scam, phishing email, fake review, or malicious seller.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CheckIcon() {
  return (
    <svg className="size-4 text-[#1d9e75] shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="size-5 text-[#2e6273]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4Z" />
      <path d="m9 12 2 2 4-5" strokeLinecap="round" />
    </svg>
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
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/security" className="text-white transition">Security</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <Link href="/lab" className="hover:text-white transition">Lab</Link>
          <Link href="/team" className="hover:text-white transition">Team</Link>
        </div>
        <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
      </div>
    </footer>
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
