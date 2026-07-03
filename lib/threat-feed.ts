/**
 * ShopSherpa Threat Feed — categorized blocklist lookup.
 *
 * Backs the strong-danger `malicious_feed_hit` and weak `dropship_marker`
 * evidence signals (see lib/signals.ts). The data is generated from feed
 * snapshots by scripts/ingest-threat-feed.mjs into lib/threat-feed.data.ts.
 *
 * Categories
 * ──────────
 *   phishing         credential-theft pages (brand clones, fake logins)   → strong danger
 *   scam_shop        fake / counterfeit storefronts                       → strong danger
 *   dropship_reship  deceptive reship middleman storefronts               → WEAK (informational)
 *
 * Matching model (the load-bearing safety property)
 * ─────────────────────────────────────────────────
 *   HOST_BLOCKLIST   — exact full hostnames. Used for phishing on shared
 *                      platforms (foo.vercel.app). Only that exact subdomain
 *                      matches; sibling tenants are untouched. We NEVER reduce
 *                      a shared-hosting host to its registrable domain, because
 *                      that would block the entire platform (every vercel.app
 *                      site) and mass-flag legitimate stores as danger.
 *   DOMAIN_BLOCKLIST — registrable domains. Matches the domain itself and any
 *                      subdomain/path variant (portal.e-docssign.net and
 *                      innogy.e-docssign.net both match e-docssign.net).
 *
 * This module is pure and deterministic — no network calls. The decision engine
 * (lib/evidence.ts) stays the single source of truth for verdicts.
 */

import { HOST_BLOCKLIST, DOMAIN_BLOCKLIST } from './threat-feed.data.js';

export type ThreatCategory = 'phishing' | 'scam_shop' | 'dropship_reship';

/** A single blocklist record (shape shared with the generated data file). */
export interface ThreatEntry {
  category: ThreatCategory;
  /** Source file the entry came from (provenance / debugging). */
  source: string;
}

/** Result of a successful lookup. */
export interface ThreatHit extends ThreatEntry {
  /** Which table matched — exact host vs registrable domain. */
  matchedBy: 'host' | 'domain';
  /** The blocklist key that matched. */
  key: string;
}

// ---------------------------------------------------------------------------
// Load-time safety guard
// ---------------------------------------------------------------------------

/**
 * Keys that must NEVER appear in DOMAIN_BLOCKLIST — a public suffix or a
 * shared-hosting platform here would over-match and flag every site under it.
 * This is a defense-in-depth check against a careless edit to the generated
 * data file; the generator already enforces the same rule at ingest time.
 */
const FORBIDDEN_DOMAIN_KEYS = new Set<string>([
  'com', 'net', 'org', 'io', 'co', 'app', 'dev', 'shop', 'store', 'xyz',
  'top', 'cc', 'vip', 'pro', 'site', 'click', 'online', 'cloud', 'id',
  'github.io', 'pages.dev', 'vercel.app', 'workers.dev', 'blogspot.com',
  'netlify.app', 'replit.app', 'wasmer.app', 'edgeone.app', 'surge.sh',
  'web.id', 'biz.id', 'duckdns.org', 'b-cdn.net', 'dweb.link',
  'com.cn', 'co.uk', 'com.au', 'com.py', 'com.vn', 'com.ge', 'com.ml',
]);

for (const key of Object.keys(DOMAIN_BLOCKLIST)) {
  if (FORBIDDEN_DOMAIN_KEYS.has(key)) {
    throw new Error(
      `threat-feed: refusing to load — DOMAIN_BLOCKLIST contains over-matching key "${key}". ` +
      `Regenerate via scripts/ingest-threat-feed.mjs.`,
    );
  }
}

// Pre-compute the domain keys once (small, hand-curated set).
const DOMAIN_KEYS = Object.keys(DOMAIN_BLOCKLIST);

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------

/** Lowercase, strip a leading `www.` and any trailing dot. */
export function normalizeHost(hostname: string): string {
  let h = hostname.trim().toLowerCase().replace(/\.$/, '');
  if (h.startsWith('www.')) h = h.slice(4);
  return h;
}

/**
 * Look up a hostname against the threat feed.
 *
 * @param hostname  A bare hostname (e.g. parsed.hostname). Not a full URL.
 * @returns         The matching ThreatHit, or null if the host is not listed.
 */
export function lookupThreatFeed(hostname: string): ThreatHit | null {
  const host = normalizeHost(hostname);
  if (!host) return null;

  const hostEntry = HOST_BLOCKLIST[host];
  if (hostEntry) {
    return { ...hostEntry, matchedBy: 'host', key: host };
  }

  for (const key of DOMAIN_KEYS) {
    if (host === key || host.endsWith('.' + key)) {
      return { ...DOMAIN_BLOCKLIST[key], matchedBy: 'domain', key };
    }
  }

  return null;
}
