import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { blogPosts } from "@/lib/blog-posts";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const blogDescription =
  "Practical scam guides for spotting fake sellers, phishing emails, fake reviews, unsafe checkout pages, and risky online stores before they cost you money.";

export const metadata: Metadata = {
  title: "Scam Guides | ShopSherpa",
  description: blogDescription,
};

const featuredSlugs = [
  "fake-sellers",
  "what-is-shopsherpa",
  "best-ai-shopping-assistants",
  "best-automated-shopping-apps",
  "product-quality-verification",
  "price-comparison",
];

const previewFallbacks: Record<string, string> = {
  "best-ai-shopping-assistants":
    "Compare AI shopping assistants by how well they research products, summarize reviews, compare prices, and protect you from risky sellers.",
  "price-comparison":
    "A low price is only useful if the seller is real. Learn how to compare prices while checking reviews, return policies, and checkout safety.",
  "curated-product-discovery":
    "Curated product discovery can save time, but unfamiliar stores still need seller, review, and payment-safety checks.",
  "detailed-product-comparisons":
    "Good product comparisons go beyond specs and price. They help you judge tradeoffs, seller trust, return risk, and review quality.",
  "expert-product-recommendations":
    "Expert recommendations should explain criteria, reveal tradeoffs, and point shoppers toward safe sellers, not just popular products.",
};

function getGuidePosts() {
  const preferred = featuredSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof blogPosts)[number] => Boolean(post));

  const rest = blogPosts.filter((post) => !featuredSlugs.includes(post.slug));
  return [...preferred, ...rest].slice(0, 12);
}

function guidePreview(post: (typeof blogPosts)[number]) {
  const fallback = previewFallbacks[post.slug];
  if (fallback) return fallback;
  if (post.preview.length < 40 || /join the waitlist/i.test(post.preview)) {
    return "A practical ShopSherpa guide for making safer shopping decisions before you trust a seller, review, price, or checkout page.";
  }
  return post.preview;
}

export default async function BlogPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const posts = getGuidePosts();
  const [featured, ...guides] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.tag))).slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/blog#collection`,
        "name": "ShopSherpa Scam Guides",
        "url": `${siteUrl}/blog`,
        "description": blogDescription,
        "isPartOf": { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/blog#guides`,
        "name": "Online shopping scam guides",
        "itemListElement": posts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": absoluteUrl(`/blog/${post.slug}`),
          "name": post.title,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-40 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo />
            <span className="font-semibold text-base tracking-tight">ShopSherpa</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#1a1a1a]/70">
            <Link href="/scam-directory" className="hover:text-[#1a1a1a] transition">Scam Directory</Link>
            <Link href="/team" className="hover:text-[#1a1a1a] transition">Team</Link>
            <Link href="/#roadmap" className="hover:text-[#1a1a1a] transition">Roadmap</Link>
          </nav>
          <Link
            href="/#cta"
            className="px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#2e6273] transition active:scale-[0.98]"
          >
            Join waitlist
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Scam guide library</p>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1] mb-5 max-w-2xl">
            Know what to check before you trust a seller.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl leading-relaxed">
            Plain-English guides for the searches people make when something feels off: fake stores, phishing emails, fake reviews, too-cheap prices, and payment requests that should slow you down.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="px-3 py-1.5 rounded-full bg-white border border-[#2e6273]/10 text-xs font-mono text-[#2e6273]">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="px-6 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-[1.1fr_0.9fr] gap-8 bg-white border border-[#2e6273]/10 rounded-2xl p-7 md:p-10 hover:-translate-y-1 hover:shadow-[0_14px_38px_-16px_rgba(46,98,115,0.35)] transition-[transform,box-shadow]"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273] mb-5">Start here</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1.02] mb-5">
                  {featured.title}
                </h2>
                <p className="text-[#1a1a1a]/60 leading-relaxed max-w-xl">
                  {guidePreview(featured)}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-8 rounded-xl bg-[#0d1f2d] text-white p-6">
                <div>
                  <p className="text-xs font-mono text-[#1d9e75] mb-3">{featured.tag}</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Best for shoppers who are already asking, "Is this seller safe?"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <span className="text-xs font-mono text-white/45">{featured.date} · {featured.read}</span>
                  <span className="text-sm font-medium text-[#1d9e75] group-hover:text-white transition">Read guide</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="px-6 md:px-8 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {guides.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(46,98,115,0.12)] transition-[transform,box-shadow] duration-200"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/60 mb-4">
                  {article.tag}
                </p>
                <h2 className="text-lg font-medium leading-snug tracking-tight mb-4">
                  {article.title}
                </h2>
                <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-6 flex-1">
                  {guidePreview(article)}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-[#2e6273]/10 mt-auto">
                  <div>
                    <p className="text-xs text-[#1a1a1a]/40 font-mono">{article.read}</p>
                    <p className="text-xs text-[#1a1a1a]/30 font-mono mt-0.5">{article.date}</p>
                  </div>
                  <span className="text-xs text-[#2e6273] font-medium group-hover:text-[#1d9e75] transition">
                    Read
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-[#0d1f2d] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#1d9e75] mb-3">Need to check a domain?</p>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-2">
                Search the scam directory next.
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                Look up common scam domains and tactics, then install ShopSherpa so you do not have to check manually every time.
              </p>
            </div>
            <Link
              href="/scam-directory"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1d9e75] text-white text-sm font-medium hover:bg-[#167a5a] transition active:scale-[0.98] whitespace-nowrap"
            >
              Open directory
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1f2d] text-white/60 px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <Logo dark />
            <span className="font-medium text-white">ShopSherpa</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/security" className="hover:text-white transition">Security</Link>
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/scam-directory" className="hover:text-white transition">Scam Directory</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
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
