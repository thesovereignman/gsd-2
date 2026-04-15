import { g as getRecentEvents } from './fireraven_CE2Bt6p5.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';
import { a as validateEventsParams } from './validate_CPscEi6L.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const params = validateEventsParams(url.searchParams);
  try {
    const data = await getRecentEvents(params);
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: "fireraven/events" }, "upstream error");
    return Response.json({ error: "Upstream request failed" }, { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
