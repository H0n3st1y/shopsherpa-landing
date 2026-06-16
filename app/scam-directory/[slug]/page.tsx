import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScamDirectoryEntry, scamDirectoryEntries } from "@/lib/scam-directory";
import { pageMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return scamDirectoryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getScamDirectoryEntry(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.title,
    description: `${entry.summary} Learn the warning signs and what to do before entering payment information.`,
    path: `/scam-directory/${entry.slug}`,
    keywords: [
      entry.query,
      `${entry.query} scam`,
      `is ${entry.query} a scam`,
      "online shopping scam",
      "ShopSherpa scam directory",
    ],
  });
}

export default async function ScamDirectoryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { slug } = await params;
  const entry = getScamDirectoryEntry(slug);
  if (!entry) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/scam-directory/${entry.slug}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": entry.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": entry.verdict,
        },
      },
      {
        "@type": "Question",
        "name": `What should I check before trusting ${entry.query}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": entry.signals.join(" "),
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#FAF8F4]/85 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </Link>
          <Link href="/scam-directory" className="text-sm font-medium text-[#2e6273] hover:text-[#1d9e75]">
            Scam Directory
          </Link>
        </div>
      </header>

      <article className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/scam-directory" className="text-sm font-medium text-[#2e6273] hover:text-[#1d9e75]">
            Back to directory
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.74fr_0.26fr] lg:items-start">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white border border-[#2e6273]/12 px-3 py-1 text-xs font-mono text-[#2e6273]">
                  {entry.type}
                </span>
                <RiskBadge risk={entry.risk} />
                <span className="text-xs font-mono text-[#1a1a1a]/38">Updated {entry.updated}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-6">
                {entry.title}
              </h1>
              <p className="text-xl leading-relaxed text-[#1a1a1a]/66 mb-10">
                {entry.summary}
              </p>

              <section className="rounded-2xl bg-white border border-[#2e6273]/10 p-7 md:p-8 mb-8">
                <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">Short answer</p>
                <p className="text-lg leading-relaxed text-[#1a1a1a]/74">{entry.verdict}</p>
              </section>

              <section className="rounded-2xl border border-[#2e6273]/10 bg-[#fffaf2] p-7 md:p-8 mb-10">
                <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-3 font-mono">How to use this page</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <UseCard title="Verify exact details" copy="Compare the exact domain, sender, seller name, and checkout URL. Small spelling changes matter." />
                  <UseCard title="Look for clusters" copy="One warning sign can be innocent. Several together are what make a page risky." />
                  <UseCard title="Do not rush payment" copy="If the page pressures you to pay now, step away and check through an official source first." />
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-medium tracking-tight mb-5">Warning signs</h2>
                <div className="grid gap-3">
                  {entry.signals.map((signal) => (
                    <div key={signal} className="flex gap-3 rounded-xl bg-white border border-[#2e6273]/10 p-4">
                      <span className="mt-2 size-2 rounded-full bg-red-500 shrink-0" />
                      <p className="text-[#1a1a1a]/70 leading-relaxed">{signal}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-medium tracking-tight mb-5">What to do next</h2>
                <ol className="grid gap-3">
                  {entry.whatToDo.map((step, index) => (
                    <li key={step} className="flex gap-4 rounded-xl bg-white border border-[#2e6273]/10 p-4">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#0d1f2d] text-xs font-mono text-white">
                        {index + 1}
                      </span>
                      <p className="text-[#1a1a1a]/70 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl bg-[#0d1f2d] p-7 md:p-8 text-white">
                <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-3 font-mono">ShopSherpa</p>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter leading-[1] mb-4">
                  Stop checking scam pages manually.
                </h2>
                <p className="text-white/65 leading-relaxed mb-6">
                  ShopSherpa is built to flag suspicious sellers, fake reviews, phishing emails, and mismatched
                  checkout domains before you enter your card.
                </p>
                <Link
                  href="/#cta"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0d1f2d] transition hover:bg-[#F4F0E8]"
                >
                  Join the free waitlist
                </Link>
              </section>
            </div>

            <aside className="rounded-2xl border border-[#2e6273]/10 bg-white p-6 lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Directory note</p>
              <p className="text-sm leading-relaxed text-[#1a1a1a]/62">
                This directory explains risk signals and common scam patterns. It is not a legal finding about any
                real person or business. When in doubt, verify through the official merchant, marketplace, carrier, or bank.
              </p>
              <div className="mt-6 border-t border-[#2e6273]/10 pt-5">
                <p className="text-xs font-mono text-[#1a1a1a]/40 mb-2">Search phrase</p>
                <p className="font-medium">{entry.query}</p>
              </div>
              <a
                href="mailto:hello@shopsherpa.org?subject=Scam%20directory%20correction"
                className="mt-6 inline-flex w-full justify-center rounded-full border border-[#2e6273]/15 px-4 py-2.5 text-sm font-medium text-[#2e6273] transition hover:border-[#2e6273]/35"
              >
                Suggest a correction
              </a>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}

function RiskBadge({ risk }: { risk: "High" | "Medium" | "Watch" }) {
  const className =
    risk === "High"
      ? "bg-red-50 text-red-700 border-red-200"
      : risk === "Medium"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-mono ${className}`}>
      {risk} risk
    </span>
  );
}

function UseCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-xl border border-[#2e6273]/10 bg-white p-4">
      <h3 className="font-medium tracking-tight mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-[#1a1a1a]/62">{copy}</p>
    </div>
  );
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="ShopSherpa" width={32} height={32} className="size-8 shrink-0 object-contain" />
  );
}
