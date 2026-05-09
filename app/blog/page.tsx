import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scam Guides | ShopSherpa",
  description:
    "Learn how to spot fake listings, phishing emails, and fake reviews before they cost you money.",
};

const articles = [
  {
    slug: "fake-pet-listings",
    tag: "Marketplace scams",
    title: "How fake pet listings work and what to check before you send money.",
    read: "4 min read",
    date: "Apr 28, 2026",
    preview:
      "Scammers post adorable photos, send realistic-looking contracts, and ask for a wire transfer or gift cards before you ever meet the animal. Here's exactly what they do and the six things to verify before handing over a dollar.",
  },
  {
    slug: "amazon-phishing-emails",
    tag: "Phishing emails",
    title: "The 5 Amazon phishing emails people fall for most this year.",
    read: "6 min read",
    date: "May 2, 2026",
    preview:
      "From fake order confirmations to 'your account has been suspended' messages, these emails are getting harder to spot. We break down each one and show you the exact details that give them away.",
  },
  {
    slug: "fake-reviews-amazon",
    tag: "Fake reviews",
    title: "Why 4.8-star products on Amazon are sometimes the most dangerous ones to buy.",
    read: "5 min read",
    date: "May 5, 2026",
    preview:
      "A suspiciously high rating with hundreds of reviews can be a red flag, not a green one. Here's how review farms work, and what to look for when a product seems too good to be true.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#cta"
              className="text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition"
            >
              Join waitlist
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#2e6273] transition active:scale-[0.98]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* HEADER */}
      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Scam guide</p>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1] mb-5 max-w-2xl">
            Know what to<br />look for.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg max-w-lg leading-relaxed">
            Scammers are getting better. These guides break down the techniques they actually use, so you can spot them before they cost you.
          </p>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(46,98,115,0.12)] transition-[transform,box-shadow] duration-200"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/60 mb-4">
                  {article.tag}
                </p>
                <h2 className="text-lg font-medium leading-snug tracking-tight mb-4 flex-1">
                  {article.title}
                </h2>
                <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-6">
                  {article.preview}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-[#2e6273]/10 mt-auto">
                  <div>
                    <p className="text-xs text-[#1a1a1a]/40 font-mono">{article.read}</p>
                    <p className="text-xs text-[#1a1a1a]/30 font-mono mt-0.5">{article.date}</p>
                  </div>
                  <span className="text-xs text-[#2e6273] font-medium group-hover:text-[#1d9e75] transition flex items-center gap-1.5">
                    Coming soon
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Email signup nudge */}
          <div className="mt-16 bg-[#0d1f2d] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#1d9e75] mb-3">More guides coming</p>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-2">
                Get new scam guides by email.
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                We publish one guide a week. No product emails unless you ask for them.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <a
                href="/#cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1d9e75] text-white text-sm font-medium hover:bg-[#167a5a] transition active:scale-[0.98] whitespace-nowrap"
              >
                Join the waitlist
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-medium text-white">ShopSherpa</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Security</a>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <a href="/#roadmap" className="hover:text-white transition">Roadmap</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

function Logo() {
  return (
    <div className="size-7 rounded-lg bg-[#2e6273] text-white flex items-center justify-center font-serif font-semibold text-xs">
      SS
    </div>
  );
}
