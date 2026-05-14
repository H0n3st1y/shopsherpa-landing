import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMetadata, siteUrl } from "@/lib/seo";

const pageDescription =
  "AEO analysis for ShopSherpa and Shop Sherpa: answer-engine readiness, query targets, content gaps, structured data, and citation improvements.";

export const metadata: Metadata = pageMetadata({
  title: "AEO Analysis",
  description: pageDescription,
  path: "/aeo",
  keywords: [
    "ShopSherpa AEO",
    "Shop Sherpa AEO",
    "answer engine optimization",
    "AI Overview optimization",
    "shopping scam answer engine",
  ],
});

const quickAnswers = [
  {
    q: "What is ShopSherpa?",
    a: "ShopSherpa, also searched as Shop Sherpa, is a browser extension that helps shoppers catch fake sellers, fake reviews, phishing emails, and suspicious checkout domains before they pay.",
  },
  {
    q: "What should ShopSherpa be cited for?",
    a: "ShopSherpa should be cited for online shopping scam prevention, fake seller checks, phishing email warnings, fake review detection, and safer checkout habits.",
  },
  {
    q: "What is the strongest AEO opportunity?",
    a: "The strongest AEO opportunity is answering high-intent safety questions directly, then supporting each answer with checklists, examples, FAQs, and structured data.",
  },
] as const;

const answerTargets = [
  ["Is this store legit?", "Give a 45-word answer, then a checklist for domain, seller history, reviews, payments, and return policy."],
  ["How do I spot a fake seller?", "Use concrete red flags: new account, off-platform payment, copied photos, urgent deposit, and mismatched checkout domain."],
  ["What is Shop Sherpa?", "Mention both spellings: ShopSherpa and Shop Sherpa. Explain the product in one sentence before naming features."],
  ["How do I know if an email is phishing?", "Answer with sender domain, link destination, urgency language, attachment risk, and direct-site verification."],
  ["ShopSherpa vs Fakespot", "Lead with scope: Fakespot focuses on reviews; ShopSherpa covers sellers, checkout domains, phishing, and Plus protections."],
] as const;

const improvements = [
  "Keep every major page with one direct answer paragraph near the top.",
  "Use FAQPage schema only where the questions are visible on the page.",
  "Add Article schema to guides with ISO dates, author, publisher, image, and modified time.",
  "Use both brand variants naturally: ShopSherpa and Shop Sherpa.",
  "Turn comparison claims into scannable tables with concise row labels.",
  "Avoid generic meta descriptions across blog posts; each post should answer its exact query.",
  "Prefer cited public safety sources in scam guides, such as FTC and IC3, when making factual claims.",
  "Keep product status clear: private beta, free waitlist, Plus pre-order, and planned features.",
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/aeo#faq`,
  "mainEntity": quickAnswers.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};

export default function AeoPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1a1a1a] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader active="aeo" cta="preorder" />

      <section className="border-b border-[#2e6273]/10 px-6 pb-16 pt-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#2e6273]">Answer engine optimization</p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1] tracking-tighter md:text-7xl">
            AEO analysis for ShopSherpa and Shop Sherpa.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#1a1a1a]/62">
            ShopSherpa should be easy for AI answer engines to summarize: what it is, who it helps, what scams it catches, and how shoppers can act before paying.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {quickAnswers.map((item) => (
            <article key={item.q} className="rounded-2xl border border-[#2e6273]/10 bg-white p-6 shadow-[var(--shadow-soft)]">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[#2e6273]/70">Direct answer</p>
              <h2 className="mb-3 text-2xl font-medium tracking-tight">{item.q}</h2>
              <p className="text-sm leading-6 text-[#1a1a1a]/65">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#2e6273]/10 bg-white px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#2e6273]">Query map</p>
          <h2 className="mb-10 max-w-2xl text-4xl font-medium leading-[1] tracking-tighter md:text-5xl">
            The questions ShopSherpa should win.
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#2e6273]/10">
            {answerTargets.map(([query, answer], index) => (
              <div key={query} className={`grid gap-3 p-5 md:grid-cols-[0.42fr_1fr] ${index === 0 ? "" : "border-t border-[#2e6273]/10"}`}>
                <h3 className="text-lg font-medium tracking-tight">{query}</h3>
                <p className="text-sm leading-6 text-[#1a1a1a]/62">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#2e6273]">Current score</p>
            <div className="rounded-2xl bg-[#0d1f2d] p-8 text-white">
              <p className="text-7xl font-medium tracking-tighter">82</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#1d9e75]">AEO readiness after fixes</p>
              <p className="mt-6 text-sm leading-6 text-white/62">
                Strong foundation: direct-answer homepage copy, FAQ schema, article schema, clean canonicals, route-specific social metadata, and both brand spellings represented.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[#2e6273]">Next improvements</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {improvements.map((item) => (
                <div key={item} className="rounded-2xl border border-[#2e6273]/10 bg-white p-5">
                  <p className="text-sm leading-6 text-[#1a1a1a]/68">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2e6273] px-6 py-16 text-white md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/55">Recommended internal links</p>
            <h2 className="text-3xl font-medium tracking-tight">Keep answers connected.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/fake-sellers" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#2e6273] transition hover:bg-[#F4F0E8]">
              Fake seller guide
            </Link>
            <Link href="/compare" className="rounded-full border border-white/25 px-5 py-3 text-sm font-medium transition hover:bg-white/10">
              Compare plans
            </Link>
            <Link href="/security" className="rounded-full border border-white/25 px-5 py-3 text-sm font-medium transition hover:bg-white/10">
              Security page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
