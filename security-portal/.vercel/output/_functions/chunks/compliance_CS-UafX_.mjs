import { a as getComplianceStatus } from './bestdefense_vxHs4DmV.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';

const GET = async () => {
  try {
    const data = await getComplianceStatus();
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: "bestdefense/compliance" }, "upstream error");
    return Response.json({ error: "Upstream request failed" }, { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
