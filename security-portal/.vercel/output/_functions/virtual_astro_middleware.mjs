import { a8 as defineMiddleware, ah as sequence } from './chunks/sequence_BIIgtFsN.mjs';
import 'piccolore';
import 'clsx';
import { v as verifySession } from './chunks/auth_D28UeJt2.mjs';
import { l as logger } from './chunks/logger_D-9yXnpc.mjs';

const buckets = /* @__PURE__ */ new Map();
const RULES = [
  [/^\/api\/auth\/login$/, 5, 15 * 60 * 1e3],
  // 5 req / 15 min
  [/^\/api\/[^/]+\/test-connection$/, 10, 6e4],
  // 10 req / min
  [/^\/api\/bestdefense\//, 60, 6e4],
  // 60 req / min
  [/^\/api\/fireraven\//, 60, 6e4],
  // 60 req / min
  [/.*/, 120, 6e4]
  // 120 req / min default
];
function getRule(pathname) {
  for (const [pattern, max, interval] of RULES) {
    if (pattern.test(pathname)) return [max, interval];
  }
  return [120, 6e4];
}
function checkRateLimit(ip, pathname) {
  const [max, intervalMs] = getRule(pathname);
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: max - 1, lastRefill: now };
    buckets.set(key, bucket);
    return true;
  }
  const elapsed = now - bucket.lastRefill;
  if (elapsed >= intervalMs) {
    bucket.tokens = max;
    bucket.lastRefill = now;
  }
  if (bucket.tokens <= 0) return false;
  bucket.tokens -= 1;
  return true;
}
setInterval(() => {
  const cutoff = Date.now() - 30 * 60 * 1e3;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.lastRefill < cutoff) buckets.delete(key);
  }
}, 10 * 60 * 1e3);

function applySecurityHeaders(headers) {
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      // Tailwind inlines styles
      "img-src 'self' data:",
      "connect-src 'self'",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join("; ")
  );
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()");
  headers.delete("X-Powered-By");
  headers.delete("Server");
}

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/logout"];
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { request, url, cookies } = context;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const path = url.pathname;
  if (!checkRateLimit(ip, path)) {
    logger.warn({ ip, path }, "rate limit exceeded");
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "60" }
    });
  }
  const response = await next();
  applySecurityHeaders(response.headers);
  const isPublic = PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + "/"));
  if (!isPublic) {
    const authed = await verifySession(cookies);
    if (!authed) {
      if (path.startsWith("/api/")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
      return context.redirect("/login");
    }
  }
  return response;
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
