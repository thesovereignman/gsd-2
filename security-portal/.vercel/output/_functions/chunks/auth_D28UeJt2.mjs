import bcrypt from 'bcryptjs';
import { l as logger } from './logger_D-9yXnpc.mjs';

const COOKIE_NAME = "as_session";
const SESSION_MAX_AGE_S = 8 * 60 * 60;
function getSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET ?? "5b2bc1d137fa76a696ffc364b7d1313381911fffb614ddb2a08001afdde133cc";
  if (!secret) {
    throw new Error("PORTAL_SESSION_SECRET is not set. Set it before starting the portal.");
  }
  return new TextEncoder().encode(secret);
}
async function hmacSign(payload) {
  const key = await crypto.subtle.importKey(
    "raw",
    getSecret(),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Buffer.from(sig).toString("base64url");
}
async function hmacVerify(payload, sig) {
  const expected = await hmacSign(payload);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
async function createSessionToken() {
  const now = Date.now();
  const payload = {
    iat: now,
    exp: now + SESSION_MAX_AGE_S * 1e3
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = await hmacSign(encoded);
  return `${encoded}.${sig}`;
}
async function verifySessionToken(token) {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const encoded = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!await hmacVerify(encoded, sig)) return false;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}
async function verifySession(cookies) {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
async function buildSessionCookieHeader() {
  const token = await createSessionToken();
  const insecure = (process.env.PORTAL_INSECURE_COOKIES ?? "true") === "true";
  const securePart = insecure ? "" : "; Secure";
  return `${COOKIE_NAME}=${token}; HttpOnly${securePart}; SameSite=Strict; Path=/; Max-Age=${SESSION_MAX_AGE_S}`;
}
function buildClearCookieHeader() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
}
async function verifyPassword(plaintext) {
  const hash = process.env.PORTAL_ADMIN_PASSWORD_HASH ?? "$2b$12";
  if (!hash) {
    logger.warn("PORTAL_ADMIN_PASSWORD_HASH is not set — login will always fail.");
    return false;
  }
  return bcrypt.compare(plaintext, hash);
}

export { verifyPassword as a, buildSessionCookieHeader as b, buildClearCookieHeader as c, verifySession as v };
