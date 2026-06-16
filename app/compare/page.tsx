import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PreorderButton } from "@/components/PreorderButton";
import { pageMetadata, siteUrl } from "@/lib/seo";

const pageDescription =
  "Compare the ShopSherpa free browser extension with ShopSherpa Plus, including phishing protection, password alerts, masked cards, pricing, and launch timing.";

export const metadata: Metadata = pageMetadata({
  title: "Compare Free vs Plus",
  description: pageDescription,
  path: "/compare",
  keywords: ["ShopSherpa vs Fakespot", "Shop Sherpa Plus", "ShopSherpa pricing", "shopping scam protection comparison"],
});

const FEATURES = [
  ["Real-time review scanning", "Flags suspicious review patterns before you trust the rating.", true, true],
  ["Fake seller detection", "Checks seller age, profile signals, marketplace behavior, and known fraud patterns.", true, true],
  ["Wrong checkout domain alerts", "Warns when checkout moves to a suspicious or mismatched domain.", true, true],
  ["Chrome, Firefox, Safari support", "Works across the browsers ShopSherpa plans to support at launch.", true, true],
  ["Phishing Shield for Gmail and Outlook", "Scans shopping-related emails for fake delivery notices and spoofed brands.", false, true],
  ["Password Vault with breach alerts", "Stores account credentials and warns when reused or exposed passwords create risk.", false, true],
  ["One masked card number per store", "Keeps your real card number away from unfamiliar merchants.", false, true],
  ["Priority support", "Gets faster help when a purchase, email, or seller looks risky.", false, true],
] as const;

const USE_CASES = [
  {
    tier: "Free extension",
    title: "Best for everyday shopping checks",
    copy:
      "Use Free when you mainly want help on product pages: fake reviews, bad seller signals, and checkout-domain warnings while you shop normally.",
  },
  {
    tier: "ShopSherpa Plus",
    title: "Best for account and payment protection",
    copy:
      "Use Plus when you want the extra layers around shopping emails, passwords, masked cards, and faster support after something suspicious happens.",
  },
  {
    tier: "Private beta",
    title: "Best path before launch",
    copy:
      "Join the free waitlist if you want access as the extension opens. Pre-order Plus if you want the lifetime launch bundle locked in early.",
  },
];

const FAQS = [
  [
    "Is the free tier actually free?",
    "Yes. The free extension is meant to cover the core shopping-page protection: review scanning, seller checks, checkout-domain alerts, and browser support.",
  ],
  [
    "Why does Plus cost money?",
    "Plus adds higher-cost protection layers like email scanning, breach alerts, masked cards, and priority support. The lifetime pre-order is $9.99 before the monthly launch price.",
  ],
  [
    "Can I start free and upgrade later?",
    "Yes. The cleanest path is to join the free waitlist first, then pre-order Plus if the email, password, and card protection matters to you.",
  ],
] as const;

const ALTERNATIVE_FEATURES = [
  ["Fake review detection", "✓", "✓", "✓", "✗", "✗"],
  ["Fake seller detection", "✓", "✓", "✗", "✗", "✗"],
  ["Phishing email detection", "✗", "✓", "✗", "✗", "Partial"],
  ["Masked card numbers", "✗", "✓", "✗", "✗", "✗"],
  ["Password vault", "✗", "✓", "✗", "✗", "✗"],
  ["Real-time checkout alerts", "✓", "✓", "✗", "✗", "✓"],
  ["Price", "Free", "$9.99 lifetime", "Free", "Free", "Free"],
] as const;

export default async function ComparePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/compare#faq`,
    "mainEntity": FAQS.map(([question, answer]) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader active="compare" cta="preorder" />

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Plan comparison</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1] mb-6 max-w-3xl">
            Free protection now. Plus when you want the full shield.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl leading-relaxed">
            ShopSherpa is in private beta. The free extension focuses on shopping-page protection. Plus adds email, password, card, and support features planned for early access.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-[#2e6273]/10 bg-white shadow-[var(--shadow-soft)]">
            <div className="grid grid-cols-[1.35fr_1.25fr_0.65fr_0.7fr] bg-[#F4F0E8] px-5 py-4 text-xs uppercase tracking-wider text-[#1a1a1a]/50 font-mono max-md:hidden">
              <span>Feature</span>
              <span>What it does</span>
              <span>Free extension</span>
              <span>ShopSherpa Plus</span>
            </div>
            {FEATURES.map(([feature, detail, free, plus]) => (
              <div key={feature} className="grid gap-3 md:grid-cols-[1.35fr_1.25fr_0.65fr_0.7fr] md:items-center border-t border-[#2e6273]/10 px-5 py-4 text-sm">
                <span className="font-medium text-[#1a1a1a]">{feature}</span>
                <span className="text-[#1a1a1a]/58 leading-relaxed">{detail}</span>
                <PlanMark label="Free" included={free} />
                <PlanMark label="Plus" included={plus} />
              </div>
            ))}
            <div className="grid gap-3 md:grid-cols-[1.35fr_1.25fr_0.65fr_0.7fr] md:items-center border-t border-[#2e6273]/10 px-5 py-4 text-sm">
              <span className="font-medium">Cost</span>
              <span className="text-[#1a1a1a]/58">Simple pricing before early access launch.</span>
              <span>Free</span>
              <span>$9.99 lifetime pre-order</span>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#2e6273]/10 p-7">
              <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">Best for most shoppers</p>
              <h2 className="text-3xl font-medium tracking-tight mb-3">Join the free waitlist</h2>
              <p className="text-[#1a1a1a]/60 leading-relaxed mb-6">
                Choose this if you want the browser extension for fake reviews, seller checks, and checkout-domain alerts as beta access opens.
              </p>
              <Link
                href="/#cta"
                className="inline-flex rounded-full bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2e6273] active:scale-[0.98]"
              >
                Join free waitlist
              </Link>
            </div>
            <div className="rounded-2xl bg-[#0d1f2d] text-white border border-[#0d1f2d] p-7">
              <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-3 font-mono">Best for full protection</p>
              <h2 className="text-3xl font-medium tracking-tight mb-3">Pre-order Plus</h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Choose this if you want the launch bundle: phishing protection, breach alerts, masked cards, and priority support.
              </p>
              <PreorderButton variant="white" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Alternatives</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1] mb-10 max-w-2xl">
            How ShopSherpa compares with other tools.
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#2e6273]/10 bg-white shadow-[var(--shadow-soft)]">
            <table aria-label="ShopSherpa comparison with alternatives" className="w-full min-w-[860px] border-collapse text-sm">
              <thead className="bg-[#F4F0E8] text-xs uppercase tracking-wider text-[#1a1a1a]/50 font-mono">
                <tr>
                  {["Feature", "ShopSherpa (Free)", "ShopSherpa Plus", "Fakespot", "Honey", "McAfee WebAdvisor"].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-left font-medium">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALTERNATIVE_FEATURES.map((row) => (
                  <tr key={row[0]} className="border-t border-[#2e6273]/10">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className={`px-5 py-4 ${index === 0 ? "font-medium text-[#1a1a1a]" : "text-[#1a1a1a]/65"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[#2e6273]/10 px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Which plan fits?</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1] mb-10 max-w-2xl">
            Choose by the risk you want covered.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {USE_CASES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#2e6273]/10 bg-[#FAF8F4] p-6">
                <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">{item.tier}</p>
                <h3 className="text-2xl font-medium tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm leading-6 text-[#1a1a1a]/62">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Plan FAQ</p>
          <div className="divide-y divide-[#2e6273]/10 rounded-2xl border border-[#2e6273]/10 bg-white">
            {FAQS.map(([question, answer]) => (
              <div key={question} className="p-6 md:p-7">
                <h2 className="text-xl font-medium tracking-tight mb-2">{question}</h2>
                <p className="text-[#1a1a1a]/62 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PlanMark({ label, included }: { label: string; included: boolean }) {
  return (
    <span className={included ? "text-[#1d9e75] font-medium" : "text-[#1a1a1a]/35"}>
      <span className="md:hidden text-[#1a1a1a]/45">{label}: </span>
      {included ? "Included" : "Not included"}
    </span>
  );
}
