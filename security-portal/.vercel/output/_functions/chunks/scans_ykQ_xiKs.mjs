import { l as listScans, t as triggerScan } from './bestdefense_vxHs4DmV.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';

const GET = async () => {
  try {
    const data = await listScans();
    return Response.json(data);
  } catch (err) {
    logger.error({ err, route: "bestdefense/scans GET" }, "upstream error");
    return Response.json({ error: "Upstream request failed" }, { status: 502 });
  }
};
const POST = async ({ request }) => {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host || !origin.endsWith(host)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return Response.json({ error: "Expected application/json" }, { status: 400 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const target = typeof body.target === "string" ? body.target.trim() : "";
  if (!target) {
    return Response.json({ error: "target is required" }, { status: 400 });
  }
  if (!/^https?:\/\/.+/.test(target)) {
    return Response.json({ error: "target must be a valid URL" }, { status: 400 });
  }
  try {
    const scan = await triggerScan(target);
    return Response.json(scan, { status: 202 });
  } catch (err) {
    logger.error({ err, route: "bestdefense/scans POST" }, "upstream error");
    return Response.json({ error: "Upstream request failed" }, { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
