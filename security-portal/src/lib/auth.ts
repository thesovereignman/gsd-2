import type { AstroCookies } from 'astro';
import bcrypt from 'bcryptjs';
import { logger } from './logger.js';

const COOKIE_NAME = 'as_session';
const SESSION_MAX_AGE_S = 8 * 60 * 60; // 8 hours

// ─── HMAC helpers ─────────────────────────────────────────────────────────────

function getSecret(): Uint8Array {
  const secret = import.meta.env.PORTAL_SESSION_SECRET;
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

export async function setSessionCookie(cookies: AstroCookies): Promise<void> {
  const token = await createSessionToken();
  cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
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
  const hash = import.meta.env.PORTAL_ADMIN_PASSWORD_HASH;
  if (!hash) {
    logger.warn('PORTAL_ADMIN_PASSWORD_HASH is not set — login will always fail.');
    return false;
  }
  return bcrypt.compare(plaintext, hash);
}
