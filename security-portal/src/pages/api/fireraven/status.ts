import type { APIRoute } from 'astro';
import { getGuardStatus } from '../../../lib/fireraven.js';
import { logger } from '../../../lib/logger.js';

export const GET: APIRoute = async () => {
  try {
    const data = await getGuardStatus();
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: 'fireraven/status' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};
