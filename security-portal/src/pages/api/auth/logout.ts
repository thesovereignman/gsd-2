import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/auth.js';
import { logger } from '../../../lib/logger.js';

export const POST: APIRoute = ({ cookies }) => {
  clearSessionCookie(cookies);
  logger.info('user logged out');
  return new Response(null, {
    status: 303,
    headers: { Location: '/login' },
  });
};

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });
