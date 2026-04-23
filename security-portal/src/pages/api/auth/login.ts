import type { APIRoute } from 'astro';
import { verifyPassword, buildSessionCookieHeader } from '../../../lib/auth.js';
import { logger } from '../../../lib/logger.js';

export const POST: APIRoute = async ({ request }) => {
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

  // Build cookie header explicitly to ensure it's included in the Response
  const cookieHeader = await buildSessionCookieHeader();
  logger.info('successful login');

  return new Response(null, {
    status: 303,
    headers: {
      Location: '/dashboard',
      'Set-Cookie': cookieHeader,
    },
  });
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
