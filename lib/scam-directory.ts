export type ScamDirectoryEntry = {
  slug: string;
  title: string;
  query: string;
  type: "Domain pattern" | "Fraud tactic";
  risk: "High" | "Medium" | "Watch";
  summary: string;
  verdict: string;
  signals: string[];
  whatToDo: string[];
  exampleDomain?: string;
  updated: string;
};

export const scamDirectoryEntries: ScamDirectoryEntry[] = [
  {
    slug: "fakewebsite-example-com",
    title: "Is fakewebsite-example.com a scam?",
    query: "fakewebsite-example.com",
    type: "Domain pattern",
    risk: "High",
    summary:
      "A generic store domain with thin identity, copied product photos, and a checkout flow that asks for payment before trust is established should be treated as high risk.",
    verdict:
      "Do not enter payment information until you can verify the merchant name, contact details, return policy, independent reviews, and checkout domain.",
    signals: [
      "No clear company identity or physical address",
      "Discounts that are far below normal retail pricing",
      "Copied product images or generic product descriptions",
      "Checkout page does not match the brand you started on",
    ],
    whatToDo: [
      "Search the domain name with words like scam, reviews, and complaint.",
      "Check whether the checkout domain matches the storefront.",
      "Use a credit card or protected marketplace payment method only.",
      "Install ShopSherpa so suspicious stores are checked before you pay.",
    ],
    exampleDomain: "fakewebsite-example.com",
    updated: "June 15, 2026",
  },
  {
    slug: "brand-delivery-fee-texts",
    title: "Fake delivery fee text messages",
    query: "delivery fee text scam",
    type: "Fraud tactic",
    risk: "High",
    summary:
      "Fake delivery messages pretend a package is delayed and ask for a small redelivery fee. The fee is bait; the real goal is stealing card details or account credentials.",
    verdict:
      "Treat unexpected package fee links as suspicious, especially when they create urgency or use a shortened or misspelled domain.",
    signals: [
      "Message says a package will be returned unless you pay immediately",
      "Sender domain imitates a carrier or marketplace brand",
      "Payment request is small enough to feel harmless",
      "Link leads away from the official carrier website",
    ],
    whatToDo: [
      "Do not tap the payment link from the message.",
      "Go directly to the carrier website and enter the tracking number there.",
      "If you already paid, call your card issuer and save screenshots.",
      "Use ShopSherpa's phishing checks to flag these messages earlier.",
    ],
    updated: "June 15, 2026",
  },
  {
    slug: "zelle-puppy-deposit-scam",
    title: "Puppy deposit scams using Zelle, wire, or gift cards",
    query: "puppy deposit scam",
    type: "Fraud tactic",
    risk: "High",
    summary:
      "Fake pet sellers use emotional photos, urgent deposits, and irreversible payments to make buyers act before they can verify the animal exists.",
    verdict:
      "Do not send a deposit through irreversible payment methods unless you have independently verified the seller and seen the animal in real time.",
    signals: [
      "Seller asks for Zelle, wire transfer, Cash App, crypto, or gift cards",
      "Photos appear on multiple unrelated listings",
      "Seller refuses live video or in-person pickup",
      "Extra shipping, crate, or insurance fees appear after the first payment",
    ],
    whatToDo: [
      "Reverse-image-search the pet photos.",
      "Ask for a live video call with a custom request.",
      "Avoid off-platform payment requests.",
      "Let ShopSherpa flag risky seller language while you browse.",
    ],
    updated: "June 15, 2026",
  },
  {
    slug: "too-cheap-clearance-store",
    title: "Too-cheap clearance stores",
    query: "clearance store scam",
    type: "Fraud tactic",
    risk: "Medium",
    summary:
      "Scam stores often advertise popular products at extreme clearance prices, then disappear, ship counterfeits, or route checkout through a suspicious payment page.",
    verdict:
      "A low price is not proof of fraud, but a low price plus weak store identity, copied photos, and rushed checkout is a strong warning sign.",
    signals: [
      "Popular items listed at 70-90% off",
      "Store launched recently or has no independent reputation",
      "Return policy is vague, copied, or missing",
      "Only limited payment methods are available",
    ],
    whatToDo: [
      "Compare the same item across trusted retailers.",
      "Look for real contact details and a realistic return policy.",
      "Avoid stores that push checkout before showing seller details.",
      "Use ShopSherpa to check seller and checkout signals automatically.",
    ],
    updated: "June 15, 2026",
  },
  {
    slug: "fake-amazon-order-email",
    title: "Fake Amazon order confirmation emails",
    query: "fake Amazon order email",
    type: "Fraud tactic",
    risk: "High",
    summary:
      "Fake order emails try to panic you with a purchase you did not make, then push you to call a fake support number or click a credential-stealing link.",
    verdict:
      "Never trust the phone number or link inside a surprise order email. Open the official app or website directly.",
    signals: [
      "Unexpected order confirmation for an expensive item",
      "Sender address contains misspellings or extra words",
      "Email asks you to call support immediately",
      "Links lead to a login page outside the official domain",
    ],
    whatToDo: [
      "Open Amazon directly instead of using the email link.",
      "Check your real order history.",
      "Report the email as phishing.",
      "Use ShopSherpa's phishing shield when it launches for inbox warnings.",
    ],
    updated: "June 15, 2026",
  },
  {
    slug: "fake-review-farm-patterns",
    title: "Fake review farm patterns",
    query: "fake review patterns",
    type: "Fraud tactic",
    risk: "Watch",
    summary:
      "Review farms can make a bad seller look safe by flooding listings with generic praise, repeated language, and sudden five-star bursts.",
    verdict:
      "A high rating is useful only when the reviews are specific, varied, recent in a natural way, and backed by credible seller history.",
    signals: [
      "Many five-star reviews posted close together",
      "Generic phrases like great product or fast shipping",
      "Reviewers have thin or repetitive histories",
      "Negative reviews mention a different item or seller behavior",
    ],
    whatToDo: [
      "Read low-star reviews before trusting the average rating.",
      "Look for product-specific details and real photos.",
      "Compare seller history across marketplaces.",
      "Use ShopSherpa to scan review patterns in the background.",
    ],
    updated: "June 15, 2026",
  },
];

export function getScamDirectoryEntry(slug: string) {
  return scamDirectoryEntries.find((entry) => entry.slug === slug);
}

export function filterScamDirectoryEntries(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return scamDirectoryEntries;

  return scamDirectoryEntries.filter((entry) => {
    const haystack = [
      entry.title,
      entry.query,
      entry.type,
      entry.risk,
      entry.summary,
      entry.verdict,
      entry.exampleDomain,
      ...entry.signals,
      ...entry.whatToDo,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}
