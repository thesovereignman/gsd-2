import type { APIRoute } from 'astro';
import { buildClearCookieHeader } from '../../../lib/auth.js';
import { logger } from '../../../lib/logger.js';

export const POST: APIRoute = () => {
  logger.info('user logged out');
  return new Response(null, {
    status: 303,
    headers: {
      Location: '/login',
      'Set-Cookie': buildClearCookieHeader(),
    },
  });
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
