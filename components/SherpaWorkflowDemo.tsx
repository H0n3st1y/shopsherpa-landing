"use client";

import { useEffect, useMemo, useState } from "react";

const STEPS = [
  "Reading purchase brief",
  "Searching vendor sites",
  "Checking price history",
  "Comparing shipping terms",
  "Drafting sheet",
];

const DEALS = [
  {
    vendor: "BulkOffice Direct",
    item: "Ergo mesh chair, 24 pack",
    price: "$2,856",
    savings: "18%",
    eta: "4 days",
    confidence: "High",
  },
  {
    vendor: "SupplyStack",
    item: "Dual monitor arms, 40 units",
    price: "$3,120",
    savings: "23%",
    eta: "6 days",
    confidence: "High",
  },
  {
    vendor: "Northline Wholesale",
    item: "USB-C docks, 32 units",
    price: "$4,416",
    savings: "14%",
    eta: "3 days",
    confidence: "Medium",
  },
];

export function SherpaWorkflowDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % STEPS.length);
    }, 1450);

    return () => window.clearInterval(interval);
  }, []);

  const progress = useMemo(() => ((activeStep + 1) / STEPS.length) * 100, [activeStep]);

  return (
    <div className="lab-console rounded-2xl border border-white/10 bg-[#0d1f2d] text-white shadow-[0_28px_90px_rgba(13,31,45,0.28)] overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-yellow-400" />
          <span className="size-3 rounded-full bg-green-400" />
        </div>
        <p className="text-xs font-mono text-white/45">Sherpa run · office refresh</p>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-0">
        <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-7">
          <p className="text-xs uppercase tracking-wider text-[#1d9e75] font-mono mb-4">One-click brief</p>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 mb-6">
            <p className="text-sm leading-relaxed text-white/80">
              Find the best bulk deals for a 40-person office setup. Prioritize reliable vendors, fast delivery, and total landed cost.
            </p>
          </div>

          <div className="space-y-3">
            {STEPS.map((step, index) => {
              const complete = index < activeStep;
              const active = index === activeStep;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                    active
                      ? "border-[#1d9e75]/45 bg-[#1d9e75]/10 text-white"
                      : complete
                        ? "border-white/10 bg-white/[0.04] text-white/60"
                        : "border-white/5 bg-transparent text-white/35"
                  }`}
                >
                  <span className={`size-2.5 rounded-full ${active ? "bg-[#1d9e75] pulse-dot" : complete ? "bg-[#1d9e75]/70" : "bg-white/20"}`} />
                  <span className="text-sm">{step}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs font-mono text-white/35">
              <span>Agent progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#1d9e75] lab-progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-[#FAF8F4] text-[#1a1a1a] p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2e6273]/60 font-mono">Drafted output</p>
              <h3 className="text-2xl font-medium tracking-tight">Best-deal sheet</h3>
            </div>
            <span className="rounded-full bg-[#1d9e75]/10 px-3 py-1 text-xs font-mono text-[#167a5a]">Live preview</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#2e6273]/10 bg-white">
            <div className="grid grid-cols-[1.15fr_1.1fr_0.7fr_0.7fr] bg-[#F4F0E8] px-4 py-3 text-[11px] uppercase tracking-wider text-[#1a1a1a]/45 font-mono">
              <span>Vendor</span>
              <span className="hidden sm:block">Item</span>
              <span>Price</span>
              <span>Savings</span>
            </div>
            {DEALS.map((deal, index) => (
              <div
                key={deal.vendor}
                className="grid grid-cols-[1.15fr_1.1fr_0.7fr_0.7fr] items-center border-t border-[#2e6273]/10 px-4 py-4 text-sm deal-row"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div>
                  <p className="font-medium leading-tight">{deal.vendor}</p>
                  <p className="mt-1 text-xs font-mono text-[#1a1a1a]/35">{deal.eta} · {deal.confidence}</p>
                </div>
                <p className="hidden sm:block text-[#1a1a1a]/55 leading-snug">{deal.item}</p>
                <p className="font-medium">{deal.price}</p>
                <p className="font-mono text-[#167a5a]">{deal.savings}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <Metric label="Time saved" value="3.5h" />
            <Metric label="Avg savings" value="18.3%" />
            <Metric label="Sources checked" value="47" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#2e6273]/10 bg-white p-4">
      <p className="text-xs font-mono text-[#1a1a1a]/40 mb-1">{label}</p>
      <p className="text-2xl font-medium tracking-tight text-[#0d1f2d]">{value}</p>
    </div>
  );
}
