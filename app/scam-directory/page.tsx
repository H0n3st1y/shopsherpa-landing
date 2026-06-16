import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { filterScamDirectoryEntries, scamDirectoryEntries } from "@/lib/scam-directory";
import { pageMetadata, siteUrl } from "@/lib/seo";

const evaluationSteps = [
  {
    title: "Domain and checkout mismatch",
    copy: "We look for URL changes, brand typos, odd TLDs, and checkout pages that do not match the store the shopper started on.",
  },
  {
    title: "Seller and policy substance",
    copy: "We check whether a store gives real contact details, clear returns, realistic pricing, and seller history that can be verified elsewhere.",
  },
  {
    title: "Payment pressure",
    copy: "We flag urgency, irreversible payment requests, deposit demands, and small-fee traps that push people to pay before thinking.",
  },
  {
    title: "Review and content patterns",
    copy: "We watch for copied photos, generic reviews, sudden five-star bursts, and product pages that look polished but thin.",
  },
];

const trustNotes = [
  "Use the directory to learn patterns, not as the only source of truth.",
  "When an entry mentions a domain pattern, verify the exact URL, seller name, and checkout page yourself.",
  "We avoid calling a real business a scam without strong public evidence; many entries are educational patterns.",
  "If a page still feels wrong after these checks, do not enter payment details.",
];

export const metadata: Metadata = pageMetadata({
  title: "Scam Directory",
  description:
    "Search ShopSherpa's scam directory for suspicious domain patterns, fake store warning signs, phishing emails, fake reviews, and common online shopping fraud tactics.",
  path: "/scam-directory",
  keywords: [
    "scam directory",
    "is this website a scam",
    "fake store checker",
    "phishing email examples",
    "online shopping scam list",
  ],
});

export default async function ScamDirectoryPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const entries = filterScamDirectoryEntries(query);

  const directoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/scam-directory#directory`,
    "name": "ShopSherpa Scam Directory",
    "description":
      "A searchable directory of suspicious domain patterns and common online shopping fraud tactics.",
    "itemListElement": scamDirectoryEntries.map((entry, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${siteUrl}/scam-directory/${entry.slug}`,
      "name": entry.title,
    })),
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryJsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#FAF8F4]/85 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#1a1a1a]/70">
            <Link href="/#how-it-works" className="hover:text-[#1a1a1a] transition">How it works</Link>
            <Link href="/scam-directory" className="text-[#2e6273] font-medium">Scam Directory</Link>
            <Link href="/blog" className="hover:text-[#1a1a1a] transition">Blog</Link>
            <Link href="/team" className="hover:text-[#1a1a1a] transition">Team</Link>
          </nav>
          <Link
            href="/#cta"
            className="rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2e6273]"
          >
            Get protected
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Scam Directory</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[0.98] mb-6 max-w-3xl">
            Check a store before you trust it.
          </h1>
          <p className="text-[#1a1a1a]/62 text-lg max-w-2xl leading-relaxed">
            Search suspicious domain patterns and common fraud tactics. If you found this because you typed
            "is this website a scam" into Google, ShopSherpa is built so you do not have to keep checking manually.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-3xl">
            <TrustMetric value="4 checks" label="domain, seller, payment, reviews" />
            <TrustMetric value="Plain English" label="no scare tactics or vague scores" />
            <TrustMetric value="Actionable" label="what to verify before paying" />
          </div>

          <form action="/scam-directory" className="mt-10 max-w-2xl">
            <label htmlFor="directory-search" className="sr-only">Search scam directory</label>
            <div className="flex flex-col sm:flex-row gap-3 rounded-2xl bg-white border border-[#2e6273]/12 p-2 shadow-[0_18px_60px_rgba(46,98,115,0.08)]">
              <input
                id="directory-search"
                name="q"
                defaultValue={query}
                placeholder="Search a domain, email tactic, seller warning sign..."
                className="min-h-12 flex-1 rounded-xl px-4 text-sm outline-none placeholder:text-[#1a1a1a]/38"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#0d1f2d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2e6273]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 md:px-8 py-14 border-b border-[#2e6273]/10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">How we evaluate risk</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1] mb-5">
                Useful checks first, SEO second.
              </h2>
              <p className="text-[#1a1a1a]/62 leading-relaxed">
                The goal is to help someone make a better decision in the moment. Every entry explains the signals,
                why they matter, and what to do next before entering a card number.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {evaluationSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-[#2e6273]/10 bg-[#FAF8F4] p-5">
                  <h3 className="font-medium tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1a1a1a]/62">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2e6273] font-mono">
                {entries.length} {entries.length === 1 ? "result" : "results"}
              </p>
              {query ? (
                <h2 className="mt-2 text-2xl font-medium tracking-tight">Results for "{query}"</h2>
              ) : (
                <h2 className="mt-2 text-2xl font-medium tracking-tight">Common checks</h2>
              )}
            </div>
            {query ? (
              <Link href="/scam-directory" className="text-sm font-medium text-[#2e6273] hover:text-[#1d9e75]">
                Clear search
              </Link>
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/scam-directory/${entry.slug}`}
                className="group flex min-h-[310px] flex-col rounded-2xl border border-[#2e6273]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(46,98,115,0.12)]"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F4F0E8] px-3 py-1 text-xs font-mono text-[#2e6273]">
                    {entry.type}
                  </span>
                  <RiskBadge risk={entry.risk} />
                </div>
                <h3 className="text-xl font-medium leading-tight tracking-tight mb-4">{entry.title}</h3>
                <p className="text-sm leading-relaxed text-[#1a1a1a]/62 flex-1">{entry.summary}</p>
                <div className="mt-6 border-t border-[#2e6273]/10 pt-4 text-sm font-medium text-[#2e6273] transition group-hover:text-[#1d9e75]">
                  Read analysis
                </div>
              </Link>
            ))}
          </div>

          {!entries.length ? (
            <div className="rounded-2xl border border-[#2e6273]/10 bg-white p-8 text-center">
              <h2 className="text-2xl font-medium tracking-tight mb-3">No exact match yet.</h2>
              <p className="mx-auto max-w-lg text-[#1a1a1a]/62 leading-relaxed">
                Try searching for the payment method, brand name, or warning sign instead. ShopSherpa is designed
                to check these signals automatically while you browse.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-6 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="rounded-2xl bg-[#0d1f2d] p-8 md:p-12 text-white">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#1d9e75] mb-4 font-mono">Stop manual checking</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1] mb-5">
                Let ShopSherpa check stores before you pay.
              </h2>
              <p className="text-white/65 leading-relaxed">
                The directory helps when you are already suspicious. The extension is the safer path: it watches
                seller signals, review patterns, phishing links, and checkout domains while you shop.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/#cta"
                className="inline-flex justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0d1f2d] transition hover:bg-[#F4F0E8]"
              >
                Join the free waitlist
              </Link>
              <Link
                href="/blog"
                className="inline-flex justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white"
              >
                Read scam guides
              </Link>
            </div>
          </div>
          </div>
          <aside className="rounded-2xl border border-[#2e6273]/10 bg-white p-6">
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Trust notes</p>
            <div className="space-y-3">
              {trustNotes.map((note) => (
                <div key={note} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-[#1d9e75] shrink-0" />
                  <p className="text-sm leading-relaxed text-[#1a1a1a]/62">{note}</p>
                </div>
              ))}
            </div>
            <a
              href="mailto:hello@shopsherpa.org?subject=Scam%20directory%20submission"
              className="mt-6 inline-flex w-full justify-center rounded-full border border-[#2e6273]/15 px-5 py-3 text-sm font-medium text-[#2e6273] transition hover:border-[#2e6273]/35"
            >
              Report a suspicious site
            </a>
          </aside>
        </div>
      </section>
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

function TrustMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#2e6273]/10 bg-white p-4">
      <p className="text-lg font-medium tracking-tight text-[#0d1f2d]">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#1a1a1a]/50">{label}</p>
    </div>
  );
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="ShopSherpa" width={32} height={32} className="size-8 shrink-0 object-contain" />
  );
}
