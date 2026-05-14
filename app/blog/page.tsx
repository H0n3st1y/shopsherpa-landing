import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Shopping Guides | ShopSherpa",
  description:
    "Guides on AI shopping tools, scam protection, price comparison, and smarter online buying. Updated weekly by the ShopSherpa team.",
};

const TAG_COLORS: Record<string, string> = {
  "Scam Protection":    "text-red-600/70",
  "Price Tracking":     "text-emerald-700/70",
  "Shopping Tools":     "text-[#2e6273]/80",
  "Expert Advice":      "text-purple-600/70",
  "Product Research":   "text-amber-700/70",
  "Product Discovery":  "text-pink-600/70",
  "Shopping Guide":     "text-[#2e6273]/60",
};

export default function BlogPage() {
  const tags = Array.from(new Set(blogPosts.map((p) => p.tag))).sort();
  const featured = blogPosts.slice(0, 3);
  const rest = blogPosts.slice(3);

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">

      <SiteHeader active="blog" cta="home" />

      {/* HEADER */}
      <section className="px-6 md:px-8 pt-20 pb-16 border-b border-[#2e6273]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-4 font-mono">Shopping guides</p>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-[1] mb-5 max-w-2xl">
            Buy smarter.<br />Avoid scams.
          </h1>
          <p className="text-[#1a1a1a]/60 text-lg max-w-xl leading-relaxed mb-8">
            {blogPosts.length} guides on online scam protection, AI shopping tools, price tracking, and product research — everything you need to shop with confidence.
          </p>
          {/* Tag filters — visual only, no JS needed */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full bg-white border border-[#2e6273]/15 text-xs font-mono ${TAG_COLORS[tag] ?? "text-[#2e6273]/60"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — top 3 large cards */}
      <section className="px-6 md:px-8 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-6 font-mono">Featured</p>
          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((post) => (
              <ArticleCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ALL ARTICLES */}
      <section className="px-6 md:px-8 pt-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-6 font-mono">All guides</p>
          <div className="grid md:grid-cols-3 gap-5">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL NUDGE */}
      <section className="px-6 md:px-8 pb-24">
        <div className="max-w-6xl mx-auto bg-[#0d1f2d] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#1d9e75] mb-3">More guides coming</p>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-2">
              New scam guides every week.
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              We publish one guide a week. No product emails unless you ask.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/#cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1d9e75] text-white text-sm font-medium hover:bg-[#167a5a] transition active:scale-[0.98] whitespace-nowrap"
            >
              Join the waitlist
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            <Link href="/lab" className="hover:text-white transition">Lab</Link>
            <Link href="/team" className="hover:text-white transition">Team</Link>
            <Link href="/product" className="hover:text-white transition">MiniUAV</Link>
          </div>
          <div className="text-xs text-white/40">2026 ShopSherpa, made by Anghelo in Nashua NH</div>
        </div>
      </footer>
    </main>
  );
}

/* ── Card component ──────────────────────────────────────────── */
function ArticleCard({
  post,
  featured = false,
}: {
  post: { slug: string; tag: string; title: string; preview: string; read: string; date: string };
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl p-7 border border-[#2e6273]/10 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(46,98,115,0.12)] transition-[transform,box-shadow] duration-200"
    >
      <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${TAG_COLORS[post.tag] ?? "text-[#2e6273]/60"}`}>
        {post.tag}
      </p>
      <h2 className={`font-medium leading-snug tracking-tight mb-4 flex-1 ${featured ? "text-xl" : "text-lg"}`}>
        {post.title}
      </h2>
      <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-6 line-clamp-3">
        {post.preview}
      </p>
      <div className="flex items-center justify-between pt-5 border-t border-[#2e6273]/10 mt-auto">
        <div>
          <p className="text-xs text-[#1a1a1a]/40 font-mono">{post.read}</p>
          <p className="text-xs text-[#1a1a1a]/30 font-mono mt-0.5">{post.date}</p>
        </div>
        <span className="text-xs text-[#2e6273] font-medium group-hover:text-[#1d9e75] transition flex items-center gap-1.5">
          Read
          <svg className="size-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
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
