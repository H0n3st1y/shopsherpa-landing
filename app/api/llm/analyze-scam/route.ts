import { NextRequest } from "next/server";
import { assertTrustedOrigin, corsHeaders, optionsResponse } from "@/lib/security/cors";
import { rateLimitKeys, rateLimitRequest } from "@/lib/security/rate-limit";
import { noStoreJson, safeLogError } from "@/lib/security/response";

export const runtime = "nodejs";

export function OPTIONS(req: NextRequest) {
  return optionsResponse(req);
}

export async function POST(req: NextRequest) {
  const originError = assertTrustedOrigin(req);
  if (originError) return originError;

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.length > 4000) {
      return noStoreJson({ error: "Provide text under 4,000 characters" }, { status: 400 });
    }

    const keys = await rateLimitKeys(req, "llm-scam-analysis");
    const limitError = await rateLimitRequest(req, [
      {
        name: "llm-scam-analysis:ip",
        limit: 10,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.ip],
      },
      {
        name: "llm-scam-analysis:network",
        limit: 80,
        windowSeconds: 15 * 60,
        keyParts: [keys.route, keys.network],
      },
    ]);
    if (limitError) return limitError;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return noStoreJson({ error: "Analysis service is not configured" }, { status: 503 });
    }

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_SCAM_ANALYSIS_MODEL || "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "You analyze online shopping scam risk. Return compact JSON with verdict, risk, signals, and safe_next_steps. Do not claim a real business is fraudulent unless the provided evidence supports it.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "scam_analysis",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                verdict: { type: "string" },
                risk: { type: "string", enum: ["low", "medium", "high", "unknown"] },
                signals: { type: "array", items: { type: "string" } },
                safe_next_steps: { type: "array", items: { type: "string" } },
              },
              required: ["verdict", "risk", "signals", "safe_next_steps"],
            },
          },
        },
      }),
    });

    if (!upstream.ok) {
      safeLogError("LLM upstream failed", await upstream.text());
      return noStoreJson({ error: "Analysis failed" }, { status: 502 });
    }

    const data = await upstream.json();
    const response = noStoreJson({ result: data.output_text ?? data });
    for (const [key, value] of corsHeaders(req)) response.headers.set(key, value);
    return response;
  } catch (error) {
    safeLogError("LLM proxy route error", error);
    return noStoreJson({ error: "Server error" }, { status: 500 });
  }
}
