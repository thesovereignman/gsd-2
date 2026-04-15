import { c as buildClearCookieHeader } from './auth_D28UeJt2.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';

const POST = () => {
  logger.info("user logged out");
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/login",
      "Set-Cookie": buildClearCookieHeader()
    }
  });
};
const GET = () => new Response("Method Not Allowed", { status: 405 });

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
