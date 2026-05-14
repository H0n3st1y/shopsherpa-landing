import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/lib/blog-posts";
import { absoluteUrl, brandedTitle, isoDateFromPostDate, pageMetadata, siteUrl } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";

/* ── Static params for all 25 posts ─────────────────────────── */
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

/* ── Per-page SEO metadata ───────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const isoDate = isoDateFromPostDate(post.date);
  const base = pageMetadata({
    title: post.title,
    description: post.preview,
    path: `/blog/${post.slug}`,
    image: post.thumbnail ?? "/og-image.png",
    imageAlt: post.thumbnailAlt ?? post.title,
    type: "article",
    keywords: [post.keyword, `ShopSherpa ${post.keyword}`, `Shop Sherpa ${post.keyword}`],
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      title: brandedTitle(post.title),
      description: post.preview,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: isoDate,
      modifiedTime: isoDate,
      images: [
        {
          url: post.thumbnail ?? "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.thumbnailAlt ?? post.title,
        },
      ],
    },
  };
}

function extractFaqs(content: string) {
  const section = content.split("## Frequently asked questions")[1];
  if (!section) return [];

  const lines = section.split("\n");
  const faqs: { question: string; answer: string }[] = [];
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ") && !line.startsWith("### ")) break;
    if (line.startsWith("### ")) {
      if (currentQuestion && currentAnswer.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      currentQuestion = line.replace(/^### /, "").trim();
      currentAnswer = [];
    } else if (currentQuestion && line.trim()) {
      currentAnswer.push(line.trim());
    }
  }

  if (currentQuestion && currentAnswer.length) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
  }

  return faqs.slice(0, 8);
}

/* ── Lightweight markdown → JSX renderer ────────────────────── */
function renderMarkdown(md: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = md.split("\n");
  let i = 0;

  function inlineFormat(text: string): React.ReactNode {
    // bold, links, inline code
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={idx}>{part.slice(1, -1)}</em>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={idx} className="bg-[#F4F0E8] text-[#2e6273] px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch)
        return <a key={idx} href={linkMatch[2]} className="text-[#2e6273] underline underline-offset-2 hover:text-[#1d9e75]" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
      return part;
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    // H1
    if (/^# /.test(line)) {
      nodes.push(<h1 key={i} className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mt-12 mb-6 first:mt-0">{inlineFormat(line.slice(2))}</h1>);
      i++; continue;
    }
    // H2
    if (/^## /.test(line)) {
      nodes.push(<h2 key={i} className="text-2xl md:text-3xl font-medium tracking-tight mt-10 mb-4 text-[#1a1a1a]">{inlineFormat(line.slice(3))}</h2>);
      i++; continue;
    }
    // H3
    if (/^### /.test(line)) {
      nodes.push(<h3 key={i} className="text-xl font-medium mt-8 mb-3 text-[#1a1a1a]">{inlineFormat(line.slice(4))}</h3>);
      i++; continue;
    }

    // Table
    if (/^\|/.test(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      const [headerRow, , ...bodyRows] = tableLines;
      const headers = headerRow.split("|").filter(Boolean).map((h) => h.trim());
      const body = bodyRows.map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
      nodes.push(
        <div key={`t${i}`} className="overflow-x-auto my-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F4F0E8]">
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-4 py-2.5 font-medium text-[#1a1a1a] border border-[#2e6273]/15">{inlineFormat(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#FAF8F4]"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 border border-[#2e6273]/15 text-[#1a1a1a]/80">{inlineFormat(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullet list
    if (/^- /.test(line) || /^\* /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && (/^- /.test(lines[i]) || /^\* /.test(lines[i]))) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul${i}`} className="my-5 space-y-2 pl-0">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-3 text-[#1a1a1a]/75 leading-relaxed">
              <span className="mt-2 size-1.5 rounded-full bg-[#2e6273] shrink-0" />
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      let num = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol key={`ol${i}`} className="my-5 space-y-2 pl-0 counter-reset-none">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-3 text-[#1a1a1a]/75 leading-relaxed">
              <span className="shrink-0 size-6 rounded-full bg-[#F4F0E8] text-[#2e6273] text-xs font-mono font-medium flex items-center justify-center mt-0.5">{ii + 1}</span>
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ol>
      );
      num; continue;
    }

    // Blockquote
    if (/^> /.test(line)) {
      nodes.push(
        <blockquote key={i} className="my-6 pl-5 border-l-4 border-[#2e6273]/30 text-[#1a1a1a]/65 italic text-base leading-relaxed">
          {inlineFormat(line.slice(2))}
        </blockquote>
      );
      i++; continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={i} className="my-8 border-[#2e6273]/15" />);
      i++; continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++; continue;
    }

    // Paragraph
    nodes.push(
      <p key={i} className="my-4 text-[#1a1a1a]/75 leading-relaxed text-base md:text-[17px]">
        {inlineFormat(line)}
      </p>
    );
    i++;
  }

  return nodes;
}

/* ── Page ─────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.tag === post.tag).slice(0, 3);
  const published = isoDateFromPostDate(post.date);
  const faqs = extractFaqs(post.content);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.preview,
        "datePublished": published,
        "dateModified": published,
        "author": { "@type": "Person", "name": "Anghelo Araujo Lazaro", "url": `${siteUrl}/team` },
        "publisher": { "@id": `${siteUrl}/#organization` },
        "mainEntityOfPage": absoluteUrl(`/blog/${post.slug}`),
        "image": [post.thumbnail ? absoluteUrl(post.thumbnail) : absoluteUrl("/og-image.png")],
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/blog/${post.slug}#faq`,
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <SiteHeader active="blog" cta="waitlist" />

      {/* ARTICLE HEADER */}
      <section className="px-6 md:px-8 pt-16 pb-12 border-b border-[#2e6273]/10">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2e6273] uppercase tracking-wider mb-8 hover:text-[#1d9e75] transition">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {post.tag}
          </Link>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter leading-[1.05] mb-6">
            {post.title}
          </h1>
          <p className="text-readable type-body mb-8">
            {post.preview}
          </p>
          <div className="flex items-center gap-4 text-sm text-[#1a1a1a]/65 font-mono">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.read}</span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pt-8">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-[2rem] border border-[#2e6273]/10 bg-white shadow-[var(--shadow-soft)]">
          <Image
            src={post.thumbnail ?? "/og-image.png"}
            alt={post.thumbnailAlt ?? post.title}
            width={1200}
            height={525}
            priority
            className="aspect-[16/7] w-full object-cover"
          />
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="px-6 md:px-8 py-14 md:py-20">
        <div className="max-w-3xl mx-auto prose-custom">
          {renderMarkdown(post.content)}
        </div>
      </article>

      {/* CTA BANNER */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-3xl mx-auto bg-[#0d1f2d] text-white rounded-2xl p-8 md:p-10">
          <p className="text-xs font-mono uppercase tracking-wider text-[#1d9e75] mb-3">Free browser extension</p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
            ShopSherpa scans while you shop.
          </h2>
          <p className="text-readable-dark text-base leading-relaxed mb-6 max-w-lg">
            Fake reviews, sketchy sellers, phishing emails — ShopSherpa flags them automatically. Free for Chrome, Firefox, and Safari.
          </p>
          <Link
            href="/#cta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d9e75] text-white text-sm font-medium hover:bg-[#167a5a] transition active:scale-[0.98]"
          >
            Install free
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="px-6 md:px-8 pb-20 border-t border-[#2e6273]/10 pt-14">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-[#2e6273] mb-6 font-mono">Related guides</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-xl p-5 border border-[#2e6273]/10 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-4px_rgba(46,98,115,0.12)] transition-[transform,box-shadow] duration-200"
                >
                  <p className="text-xs font-mono text-[#2e6273] uppercase tracking-wider mb-2">{r.tag}</p>
                  <p className="text-sm font-medium leading-snug tracking-tight mb-3">{r.title}</p>
                  <p className="text-xs text-[#1a1a1a]/65 font-mono">{r.read}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
