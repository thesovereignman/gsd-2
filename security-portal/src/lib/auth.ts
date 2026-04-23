import type { AstroCookies } from 'astro';
import bcrypt from 'bcryptjs';
import { logger } from './logger.js';

const COOKIE_NAME = 'as_session';
const SESSION_MAX_AGE_S = 8 * 60 * 60; // 8 hours

// ─── HMAC helpers ─────────────────────────────────────────────────────────────

function getSecret(): Uint8Array {
  // Read from process.env at runtime — avoids Vite mangling $ signs in the build
  const secret = process.env.PORTAL_SESSION_SECRET ?? import.meta.env.PORTAL_SESSION_SECRET;
  if (!secret) {
    throw new Error('PORTAL_SESSION_SECRET is not set. Set it before starting the portal.');
  }
  return new TextEncoder().encode(secret);
}

async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    getSecret(),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Buffer.from(sig).toString('base64url');
}

async function hmacVerify(payload: string, sig: string): Promise<boolean> {
  const expected = await hmacSign(payload);
  // Constant-time comparison
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

// ─── Session token ─────────────────────────────────────────────────────────────

interface SessionPayload {
  iat: number; // issued-at (unix ms)
  exp: number; // expiry  (unix ms)
}

export async function createSessionToken(): Promise<string> {
  const now = Date.now();
  const payload: SessionPayload = {
    iat: now,
    exp: now + SESSION_MAX_AGE_S * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = await hmacSign(encoded);
  return `${encoded}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const encoded = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!(await hmacVerify(encoded, sig))) return false;

    const payload: SessionPayload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

// ─── Cookie helpers ────────────────────────────────────────────────────────────

export async function verifySession(cookies: AstroCookies): Promise<boolean> {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

/**
 * Returns the raw Set-Cookie header string for the session token.
 * Used directly in API route Response headers to ensure the cookie
 * is always included regardless of Astro's context lifecycle.
 */
export async function buildSessionCookieHeader(): Promise<string> {
  const token = await createSessionToken();
  const insecure = (process.env.PORTAL_INSECURE_COOKIES ?? import.meta.env.PORTAL_INSECURE_COOKIES) === 'true';
  const securePart = insecure ? '' : '; Secure';
  return `${COOKIE_NAME}=${token}; HttpOnly${securePart}; SameSite=Strict; Path=/; Max-Age=${SESSION_MAX_AGE_S}`;
}

export function buildClearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
}

export async function setSessionCookie(cookies: AstroCookies): Promise<void> {
  const token = await createSessionToken();
  const secureCookie = import.meta.env.PORTAL_INSECURE_COOKIES !== 'true';
  cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_S,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

// ─── Password verification ─────────────────────────────────────────────────────

export async function verifyPassword(plaintext: string): Promise<boolean> {
  // Must read from process.env at runtime — Vite mangles $ signs (bcrypt hashes)
  // when statically embedding import.meta.env values in the build.
  const hash = process.env.PORTAL_ADMIN_PASSWORD_HASH ?? import.meta.env.PORTAL_ADMIN_PASSWORD_HASH;
  if (!hash) {
    logger.warn('PORTAL_ADMIN_PASSWORD_HASH is not set — login will always fail.');
    return false;
  }
  return bcrypt.compare(plaintext, hash);
}
