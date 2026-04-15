import type { APIRoute } from 'astro';
import { verifyPassword, setSessionCookie } from '../../../lib/auth.js';
import { logger } from '../../../lib/logger.js';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  let password: string;

  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    const form = await request.formData();
    password = (form.get('password') as string | null) ?? '';
  } else {
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!password) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/login?error=1' },
    });
  }

  const valid = await verifyPassword(password);

  if (!valid) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    logger.warn({ ip }, 'failed login attempt');
    return new Response(null, {
      status: 303,
      headers: { Location: '/login?error=1' },
    });
  }

  await setSessionCookie(cookies);
  logger.info('successful login');

  return new Response(null, {
    status: 303,
    headers: { Location: '/dashboard' },
  });
};

// Disallow GET
export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
