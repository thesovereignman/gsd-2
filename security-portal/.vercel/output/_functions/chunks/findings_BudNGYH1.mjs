import { g as getFindings } from './bestdefense_vxHs4DmV.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';
import { v as validateFindingsParams } from './validate_CPscEi6L.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const params = validateFindingsParams(url.searchParams);
  try {
    const data = await getFindings(params);
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: "bestdefense/findings" }, "upstream error");
    return Response.json({ error: "Upstream request failed" }, { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
