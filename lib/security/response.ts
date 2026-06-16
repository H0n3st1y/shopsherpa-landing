import { NextResponse } from "next/server";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function noStoreJson(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function safeLogError(message: string, error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);
  console.error(`${message}: ${detail}`);
}
