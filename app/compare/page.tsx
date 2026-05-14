import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PreorderButton } from "@/components/PreorderButton";

export const metadata: Metadata = {
  title: "Compare Free vs Plus | ShopSherpa",
  description:
    "Compare the ShopSherpa free browser extension with ShopSherpa Plus, including phishing protection, password alerts, masked cards, pricing, and launch timing.",
};

const FEATURES = [
  ["Real-time review scanning", true, true],
  ["Fake seller detection", true, true],
  ["Wrong checkout domain alerts", true, true],
  ["Chrome, Firefox, Safari support", true, true],
  ["Phishing Shield for Gmail and Outlook", false, true],
  ["Password Vault with breach alerts", false, true],
  ["One masked card number per store", false, true],
  ["Priority support", false, true],
] as const;

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <SiteHeader active="home" cta="preorder" />

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Plan comparison</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1] mb-6 max-w-3xl">
            Free protection now. Plus when you want the full shield.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl leading-relaxed">
            ShopSherpa is in private beta. The free extension focuses on shopping-page protection. Plus adds email, password, card, and support features planned for Q3 2026.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-[#2e6273]/10 bg-white shadow-[var(--shadow-soft)]">
            <div className="grid grid-cols-[1.3fr_0.8fr_0.9fr] bg-[#F4F0E8] px-5 py-4 text-xs uppercase tracking-wider text-[#1a1a1a]/50 font-mono">
              <span>Feature</span>
              <span>Free extension</span>
              <span>ShopSherpa Plus</span>
            </div>
            {FEATURES.map(([feature, free, plus]) => (
              <div key={feature} className="grid grid-cols-[1.3fr_0.8fr_0.9fr] items-center border-t border-[#2e6273]/10 px-5 py-4 text-sm">
                <span className="font-medium">{feature}</span>
                <PlanMark included={free} />
                <PlanMark included={plus} />
              </div>
            ))}
            <div className="grid grid-cols-[1.3fr_0.8fr_0.9fr] items-center border-t border-[#2e6273]/10 px-5 py-4 text-sm">
              <span className="font-medium">Cost</span>
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
    </main>
  );
}

function PlanMark({ included }: { included: boolean }) {
  return (
    <span className={included ? "text-[#1d9e75] font-medium" : "text-[#1a1a1a]/35"}>
      {included ? "Included" : "Not included"}
    </span>
  );
}
