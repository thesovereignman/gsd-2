import type { APIRoute } from 'astro';
import { getComplianceStatus } from '../../../lib/bestdefense.js';
import { logger } from '../../../lib/logger.js';

export const GET: APIRoute = async () => {
  try {
    const data = await getComplianceStatus();
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: 'bestdefense/compliance' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};
