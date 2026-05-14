import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plus Pre-Order Confirmed | ShopSherpa",
  description:
    "Your ShopSherpa Plus lifetime pre-order is confirmed. Beta access opens in 2026 with phishing protection, masked cards, and priority support.",
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="size-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-8">
          <svg className="size-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">You're in. For life.</h1>
        <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed mb-8">
          Thanks for backing Plus. Early access details will arrive by email. We sent a confirmation to your email with the details.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3.5 rounded-full bg-[var(--color-teal)] text-white font-medium hover:bg-[var(--color-teal-deep)] transition"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
