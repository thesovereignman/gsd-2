import { b as testConnection } from './bestdefense_vxHs4DmV.mjs';

const GET = async () => {
  const result = await testConnection();
  return Response.json(result, { status: result.ok ? 200 : 502 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
