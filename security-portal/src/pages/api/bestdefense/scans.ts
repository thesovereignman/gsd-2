import type { APIRoute } from 'astro';
import { listScans, triggerScan } from '../../../lib/bestdefense.js';
import { logger } from '../../../lib/logger.js';

export const GET: APIRoute = async () => {
  try {
    const data = await listScans();
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: 'bestdefense/scans GET' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  // CSRF defense: verify origin matches host
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host || !origin.endsWith(host)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ct = request.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return Response.json({ error: 'Expected application/json' }, { status: 400 });
  }

  let body: { target?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const target = typeof body.target === 'string' ? body.target.trim() : '';
  if (!target) {
    return Response.json({ error: 'target is required' }, { status: 400 });
  }

  // Basic URL validation — must start with http/https
  if (!/^https?:\/\/.+/.test(target)) {
    return Response.json({ error: 'target must be a valid URL' }, { status: 400 });
  }

  try {
    const scan = await triggerScan(target);
    return Response.json(scan, { status: 202 });
  } catch (err) {
    logger.error({ err, route: 'bestdefense/scans POST' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};
