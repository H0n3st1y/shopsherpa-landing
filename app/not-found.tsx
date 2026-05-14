import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | ShopSherpa",
  description:
    "The ShopSherpa page you requested could not be found. Return to the homepage for scam protection, pricing, guides, and product information.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm text-[var(--color-teal)] uppercase tracking-wider mb-4">404</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">Page not found.</h1>
        <p className="text-[var(--color-ink-muted)] mb-8">
          You hit a link that doesn't exist. Or one that used to.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-[var(--color-teal)] text-white font-medium hover:bg-[var(--color-teal-deep)] transition"
        >
          Take me home
        </a>
      </div>
    </main>
  );
}
