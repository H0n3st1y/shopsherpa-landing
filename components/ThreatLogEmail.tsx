"use client";

import { useState } from "react";

/**
 * ThreatLogEmail
 * Styled as an "Intercepted Threat Log" — sharp grid borders, no rounded corners.
 * On click: a flat terracotta overlay snaps in instantly with terminal output.
 * Design system: Cream #CAAF98 / Terracotta #AD2010 / Charcoal #22180F
 */
export function ThreatLogEmail() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer select-none"
      style={{ border: "1px solid #22180F", background: "#C4A48C" }}
      onClick={() => setRevealed(true)}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid #22180F40", background: "#BFAA94" }}
      >
        <p className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#22180F80" }}>
          INBOX · INTERCEPTED_MESSAGE · THREAT_LOG_0042
        </p>
        <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: revealed ? "#AD2010" : "#22180F40" }}>
          {revealed ? "▶ THREAT_NEUTRALIZED" : "▶ CLICK_TO_SCAN"}
        </span>
      </div>

      {/* Email body */}
      <div className="p-6 md:p-10">
        {/* Metadata grid */}
        <div className="mb-6" style={{ border: "1px solid #22180F20" }}>
          {([
            ["FROM",    "Amazon"],
            ["SENDER", "tracking@am4z0n-delivery.shop"],
            ["TO",     "maria.chen@gmail.com"],
            ["SUBJ",   "Your package needs a redelivery fee. Confirm now."],
          ] as [string, string][]).map(([k, v], i) => (
            <div key={k} className="flex px-3 py-2" style={{ borderTop: i > 0 ? "1px solid #22180F15" : undefined }}>
              <span className="text-[9px] font-mono uppercase tracking-wider w-14 shrink-0 mt-0.5" style={{ color: "#22180F60" }}>
                {k}
              </span>
              <span className="text-xs font-mono" style={{ color: k === "SENDER" ? "#AD2010" : "#22180F" }}>
                {v}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#22180F99", fontFamily: "var(--font-serif)" }}>
          We were unable to deliver your package. A redelivery fee of $3.99 is required within 24 hours or your package will be returned to sender.
        </p>
        <div
          className="inline-flex items-center px-5 py-2.5 text-sm font-mono opacity-40 cursor-not-allowed"
          style={{ background: "#FF9900", color: "#000" }}
        >
          PAY $3.99 NOW
        </div>
      </div>

      {/* THREAT OVERLAY — instant snap, no easing, no animation */}
      {revealed && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
          style={{ background: "#AD2010F2" }}
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] mb-6" style={{ color: "#CAAF9880" }}>
            SHOPSHERPA · THREAT_NEUTRALIZED
          </p>
          <p className="font-mono text-sm md:text-base leading-relaxed mb-1" style={{ color: "#CAAF98" }}>
            [SYS.ALERT] SPOOFED_DOMAIN_DETECTED
          </p>
          <p className="font-mono text-sm md:text-base leading-relaxed mb-8" style={{ color: "#CAAF98" }}>
            // THREAT_NEUTRALIZED · DO_NOT_CLICK
          </p>
          <div className="space-y-1.5 text-left w-full max-w-sm">
            {[
              "DOMAIN: am4z0n-delivery.shop",
              "REGISTERED: 3 days ago",
              "PATTERN: delivery_fee_scam",
              "MATCH: 1,847 known signatures",
              "ACTION: flagged + blocked",
            ].map((line) => (
              <p key={line} className="text-[10px] font-mono" style={{ color: "#CAAF9870" }}>
                $ {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
