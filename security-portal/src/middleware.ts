import { defineMiddleware } from 'astro:middleware';
import { verifySession } from './lib/auth.js';
import { checkRateLimit } from './lib/rate-limiter.js';
import { applySecurityHeaders } from './lib/security-headers.js';
import { logger } from './lib/logger.js';

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/logout'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, cookies } = context;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const path = url.pathname;

  // 1. Rate limiting — checked first, before any auth
  if (!checkRateLimit(ip, path)) {
    logger.warn({ ip, path }, 'rate limit exceeded');
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }

  // 2. Execute the handler
  const response = await next();

  // 3. Apply security headers to every response
  applySecurityHeaders(response.headers);

  // 4. Auth guard — redirect unauthenticated users (after headers are set)
  const isPublic = PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + '/'));
  if (!isPublic) {
    const authed = await verifySession(cookies);
    if (!authed) {
      if (path.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return context.redirect('/login');
    }
  }

  return response;
});
