"use client";

const items = [
  {
    q: "What's actually included in Plus?",
    a: "The phishing shield (for Gmail and Outlook), the password vault with breach alerts, and masked card numbers. Plus everything in our free shopping fraud detection with no scan limit.",
  },
  {
    q: "When does Plus launch?",
    a: "Public access is opening through GitHub and the waitlist.",
  },
  {
    q: "How is this different from 1Password or LifeLock?",
    a: "1Password is great at storing passwords. LifeLock sells you insurance after you've already been hit. We're built around the moment of attack itself. The email arriving in your inbox. The breach happening on a site you forgot you used. The checkout where your card data leaks. We catch threats as they happen, not three months later.",
  },
  {
    q: "What if I don't like it?",
    a: "Email refund@shopsherpa.ai within 30 days. We refund the $9.99 with no questions asked. We'd rather refund you than have you tell people Plus wasn't worth it.",
  },
  {
    q: "Will the lifetime price stay $9.99?",
    a: "The first 500 pre-orders are $9.99 lifetime. After that the lifetime tier closes permanently and Plus becomes $14.99 per month. Anyone who pre-ordered keeps their pricing forever, even through future price increases.",
  },
  {
    q: "Is my data actually safe?",
    a: "The password vault uses zero-knowledge encryption. We can't read your passwords even if we wanted to. The phishing scanner connects via Gmail OAuth and never stores email content, only metadata about flagged messages. Breach data comes from Have I Been Pwned, an industry-standard source.",
  },
  {
    q: "Do I have to be a current ShopSherpa user?",
    a: "No. Plus works as a standalone product for new users. But it integrates with our existing browser extension, so current users get a more powerful experience.",
  },
];

export function FAQ() {
  return (
    <div className="max-w-3xl space-y-2">
      {items.map((item, i) => (
        <details
          key={i}
          className="group bg-[var(--color-card)] border border-[var(--color-line)] rounded-xl overflow-hidden"
        >
          <summary className="px-6 py-5 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-[var(--color-bg-alt)] transition">
            <span className="font-medium">{item.q}</span>
            <svg
              className="size-5 text-[var(--color-ink-muted)] shrink-0 transition-transform group-open:rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-[var(--color-ink-muted)] leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
