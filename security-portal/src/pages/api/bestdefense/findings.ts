import type { APIRoute } from 'astro';
import { getFindings } from '../../../lib/bestdefense.js';
import { logger } from '../../../lib/logger.js';
import { validateFindingsParams } from '../../../lib/validate.js';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = validateFindingsParams(url.searchParams);

  try {
    const data = await getFindings(params);
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: 'bestdefense/findings' }, 'upstream error');
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};
