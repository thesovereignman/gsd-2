import { a as verifyPassword, b as buildSessionCookieHeader } from './auth_D28UeJt2.mjs';
import { l as logger } from './logger_D-9yXnpc.mjs';

const POST = async ({ request }) => {
  let password;
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const form = await request.formData();
    password = form.get("password") ?? "";
  } else {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!password) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/login?error=1" }
    });
  }
  const valid = await verifyPassword(password);
  if (!valid) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    logger.warn({ ip }, "failed login attempt");
    return new Response(null, {
      status: 303,
      headers: { Location: "/login?error=1" }
    });
  }
  const cookieHeader = await buildSessionCookieHeader();
  logger.info("successful login");
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/dashboard",
      "Set-Cookie": cookieHeader
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
