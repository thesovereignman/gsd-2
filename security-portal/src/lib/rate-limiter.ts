/**
 * In-memory token bucket rate limiter.
 * Limits are per IP address per route pattern.
 */

interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();

/** Route rate limit rules: [maxTokens, refillIntervalMs] */
const RULES: Array<[RegExp, number, number]> = [
  [/^\/api\/auth\/login$/, 5, 15 * 60 * 1000],   // 5 req / 15 min
  [/^\/api\/[^/]+\/test-connection$/, 10, 60_000], // 10 req / min
  [/^\/api\/bestdefense\//, 60, 60_000],           // 60 req / min
  [/^\/api\/fireraven\//, 60, 60_000],             // 60 req / min
  [/.*/, 120, 60_000],                             // 120 req / min default
];

function getRule(pathname: string): [number, number] {
  for (const [pattern, max, interval] of RULES) {
    if (pattern.test(pathname)) return [max, interval];
  }
  return [120, 60_000];
}

/**
 * Returns true if the request is allowed, false if rate-limited.
 */
export function checkRateLimit(ip: string, pathname: string): boolean {
  const [max, intervalMs] = getRule(pathname);
  const key = `${ip}:${pathname}`;
  const now = Date.now();

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: max - 1, lastRefill: now };
    buckets.set(key, bucket);
    return true;
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill;
  if (elapsed >= intervalMs) {
    bucket.tokens = max;
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) return false;

  bucket.tokens -= 1;
  return true;
}

// Prune stale entries every 10 minutes to prevent unbounded memory growth
setInterval(() => {
  const cutoff = Date.now() - 30 * 60 * 1000;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.lastRefill < cutoff) buckets.delete(key);
  }
}, 10 * 60 * 1000);
