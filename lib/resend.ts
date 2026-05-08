import { Resend } from "resend";

export function getResend() {
  export const FROM = process.env.RESEND_FROM_EMAIL || "hello@shopsherpa.org";
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

export const FROM = process.env.RESEND_FROM_EMAIL || "hello@shopsherpa.ai";
