import type { APIRoute } from 'astro';
import { testConnection } from '../../../lib/fireraven.js';

export const GET: APIRoute = async () => {
  const result = await testConnection();
  return Response.json(result, { status: result.ok ? 200 : 502 });
};
