import type { APIRoute } from 'astro';
import { getRecentEvents } from '../../../lib/fireraven.js';
import { logger } from '../../../lib/logger.js';
import { validateEventsParams } from '../../../lib/validate.js';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = validateEventsParams(url.searchParams);

  try {
    const data = await getRecentEvents(params);
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: 'fireraven/events' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};
