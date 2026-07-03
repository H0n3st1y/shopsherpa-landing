/**
 * CORS headers for browser extension origins.
 * Once the extension is published, restrict to its specific IDs.
 */

const ALLOWED_ORIGINS = [
  /^chrome-extension:\/\/[a-z]{32}$/,
  /^moz-extension:\/\/[a-f0-9-]{36}$/,
  /^safari-web-extension:\/\/[A-F0-9-]{36}$/i,
];

export function corsHeaders(origin?: string | null): Record<string, string> {
  const isExt = Boolean(origin && ALLOWED_ORIGINS.some(re => re.test(origin)));
  return {
    'Access-Control-Allow-Origin':  isExt ? origin! : 'https://shopsherpa.org',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Install-Id, X-Extension-Version',
    'Access-Control-Max-Age':       '86400',
  };
}
