/**
 * Fireraven.ai API client.
 * Server-side only — the @fireraven-ai/secure-chatbot npm package is client-side
 * React only and is NOT used here. We call the REST API directly.
 * Falls back to mock data when FIRERAVEN_API_KEY is not set.
 */

import { logger } from './logger.js';
import { MOCK_FR_EVENTS, MOCK_FR_STATUS } from './mock-data.js';
import type { EventsParams } from './validate.js';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type EventType = 'block' | 'scan_complete' | 'policy_violation' | 'alert';
export type EventSeverity = 'critical' | 'high' | 'medium' | 'low' | 'pass';

export interface SecurityEvent {
  id: string;
  type: EventType;
  subtype: string;
  severity: EventSeverity;
  message: string;
  detail: string;
  agent: string;
  timestamp: string;
  creditsUsed: number;
}

export interface GuardStatus {
  healthy: boolean;
  activeAgents: number;
  totalBlocksToday: number;
  totalScansThisWeek: number;
  creditsRemaining: number;
  plan: string;
  updatedAt: string;
}

export interface ConnectionResult {
  ok: boolean;
  latencyMs: number;
  message?: string;
}

// ─── Helper ────────────────────────────────────────────────────────────────────

function isConfigured(): boolean {
  return !!import.meta.env.FIRERAVEN_API_KEY;
}

async function frFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const base = import.meta.env.FIRERAVEN_BASE_URL || 'https://api.fireraven.ai';
  const apiKey = import.meta.env.FIRERAVEN_API_KEY;
  const clientId = import.meta.env.FIRERAVEN_CLIENT_ID;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5_000);

  try {
    const res = await fetch(`${base}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-Client-Id': clientId ?? '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options?.headers ?? {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Fireraven API returned ${res.status}`);
    }

    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) {
      throw new Error('Unexpected content-type from Fireraven API');
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

export async function getRecentEvents(params: EventsParams = {}): Promise<SecurityEvent[]> {
  if (!isConfigured()) {
    logger.debug('Fireraven: using mock events data');
    let events = MOCK_FR_EVENTS;
    if (params.type) events = events.filter((e) => e.subtype === params.type);
    return events.slice(0, params.limit ?? 50);
  }

  const qs = new URLSearchParams();
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.type) qs.set('type', params.type);

  try {
    return await frFetch<SecurityEvent[]>(`/v1/events?${qs}`);
  } catch (err) {
    logger.error({ err }, 'Fireraven getRecentEvents failed');
    throw err;
  }
}

export async function getGuardStatus(): Promise<GuardStatus> {
  if (!isConfigured()) {
    logger.debug('Fireraven: using mock guard status');
    return MOCK_FR_STATUS;
  }
  try {
    return await frFetch<GuardStatus>('/v1/status');
  } catch (err) {
    logger.error({ err }, 'Fireraven getGuardStatus failed');
    throw err;
  }
}

export async function testConnection(): Promise<ConnectionResult> {
  if (!isConfigured()) {
    return { ok: false, latencyMs: 0, message: 'API key not configured — using mock data' };
  }
  const start = Date.now();
  try {
    await frFetch('/v1/health');
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return { ok: false, latencyMs: Date.now() - start, message: String(err) };
  }
}
