/**
 * Apply security headers to every response.
 * Called from middleware before any page/API handler runs.
 */
export function applySecurityHeaders(headers: Headers): void {
  // Content Security Policy — self-hosted only, no CDN scripts
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'", // Tailwind inlines styles
      "img-src 'self' data:",
      "connect-src 'self'",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  );

  // HSTS — 2 years, include subdomains
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // Restrict referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable browser features not needed
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');

  // Remove server fingerprint
  headers.delete('X-Powered-By');
  headers.delete('Server');
}
