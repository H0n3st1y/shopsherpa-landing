"use client";

import { useMemo, useState } from "react";

type Sample = {
  label: string;
  value: string;
};

const SAMPLES: Sample[] = [
  {
    label: "Store URL",
    value: "https://airmax-clearance.shop/pay-now",
  },
  {
    label: "Seller message",
    value: "I can ship the puppy today. Please Zelle the deposit now so I can hold her for you.",
  },
  {
    label: "Email sender",
    value: "tracking@am4z0n-delivery.shop",
  },
];

const RISK_TERMS = [
  { term: "zelle", signal: "Requests irreversible payment" },
  { term: "wire", signal: "Requests irreversible payment" },
  { term: "gift card", signal: "Pushes gift cards" },
  { term: "deposit", signal: "Asks for an upfront deposit" },
  { term: "pay-now", signal: "Pressure-style checkout URL" },
  { term: ".shop", signal: "New or spoof-prone domain pattern" },
  { term: "am4z0n", signal: "Brand impersonation typo" },
  { term: "within 24 hours", signal: "Urgency language detected" },
  { term: "hold her", signal: "Emotional pressure language" },
  { term: "clearance", signal: "Too-good-to-be-true offer pattern" },
];

function analyze(input: string) {
  const normalized = input.toLowerCase();
  const matches = RISK_TERMS.filter(({ term }) => normalized.includes(term));
  const hasUrl = /https?:\/\/|www\.|\.com|\.shop|\.store|\.top/.test(normalized);
  const hasMoneyAsk = /\$|\bpay\b|\bvenmo\b|\bzelle\b|\bwire\b|\bdeposit\b/.test(normalized);
  const score = Math.min(96, 22 + matches.length * 16 + (hasUrl ? 10 : 0) + (hasMoneyAsk ? 12 : 0));

  const signals = [
    ...matches.map((match) => match.signal),
    ...(hasUrl ? ["Link or seller domain can be checked before checkout"] : []),
    ...(hasMoneyAsk ? ["Payment request appears before trust is established"] : []),
  ];

  return {
    score: input.trim() ? score : 0,
    verdict: score >= 70 ? "High risk" : score >= 42 ? "Needs review" : "Looks normal",
    tone: score >= 70 ? "danger" : score >= 42 ? "warn" : "safe",
    signals: Array.from(new Set(signals)).slice(0, 4),
  };
}

export function ScamCheckDemo() {
  const [input, setInput] = useState(SAMPLES[0].value);
  const result = useMemo(() => analyze(input), [input]);

  const meterColor =
    result.tone === "danger"
      ? "bg-red-500"
      : result.tone === "warn"
        ? "bg-[#d97706]"
        : "bg-[#1d9e75]";

  return (
    <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 items-stretch">
      <div className="rounded-2xl bg-[#0d1f2d] text-white p-6 md:p-8 border border-[#2e6273]/20 overflow-hidden relative">
        <div aria-hidden className="scan-sheen absolute inset-0 opacity-50" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#1d9e75] mb-2">Instant check</p>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Paste anything suspicious.</h3>
            </div>
            <div className="size-12 rounded-full border border-white/10 bg-white/5 grid place-items-center shrink-0">
              <ShieldIcon />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {SAMPLES.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => setInput(sample.value)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white/70 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
              >
                <SparkIcon />
                {sample.label}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-white outline-none transition focus:border-[#1d9e75]/70 focus:ring-4 focus:ring-[#1d9e75]/10"
            placeholder="Paste a store URL, seller message, email sender, or product review..."
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#2e6273]/10 p-6 md:p-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#2e6273]/60 mb-2">ShopSherpa readout</p>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tight">{result.verdict}</h3>
          </div>
          <div className="text-right">
            <p className="text-5xl font-medium tracking-tight text-[#0d1f2d]">{result.score}</p>
            <p className="text-xs font-mono text-[#1a1a1a]/40">risk score</p>
          </div>
        </div>

        <div className="h-2 rounded-full bg-[#F4F0E8] overflow-hidden mb-8">
          <div
            className={`h-full rounded-full ${meterColor} risk-meter`}
            style={{ width: `${result.score}%` }}
          />
        </div>

        <div className="space-y-3 min-h-44">
          {(result.signals.length ? result.signals : ["No major scam patterns found in this short sample."]).map((signal) => (
            <div key={signal} className="flex items-start gap-3 rounded-xl border border-[#2e6273]/10 bg-[#FAF8F4] p-4">
              <span className={`mt-1 size-2 rounded-full ${meterColor} shrink-0`} />
              <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{signal}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[#2e6273]/10 pt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-[#1a1a1a]/45 font-mono">Beta preview · browser extension checks this automatically</p>
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d1f2d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2e6273] active:scale-[0.98]"
          >
            Join beta
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg className="size-5 text-[#1d9e75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 5 6v5c0 4.7 2.9 8.7 7 10 4.1-1.3 7-5.3 7-10V6l-7-3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M17.5 6.5l-2.8 2.8M9.3 14.7l-2.8 2.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
