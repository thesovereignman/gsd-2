/**
 * BestDefense.io API client.
 * All requests are made server-side; API key is never exposed to the browser.
 * Falls back to mock data when BESTDEFENSE_API_KEY is not set.
 */

import { logger } from './logger.js';
import {
  MOCK_FINDINGS,
  MOCK_COMPLIANCE,
  MOCK_SCANS,
} from './mock-data.js';
import type { FindingsParams } from './validate.js';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type FindingStatus = 'open' | 'resolved' | 'in_review';

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: FindingStatus;
  endpoint: string;
  cve: string;
  discoveredAt: string;
  updatedAt: string;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  score: number; // 0–100
  passCount: number;
  failCount: number;
  totalControls: number;
}

export interface ComplianceReport {
  generatedAt: string;
  frameworks: ComplianceFramework[];
}

export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface Scan {
  id: string;
  target: string;
  status: ScanStatus;
  startedAt: string;
  completedAt: string | null;
  findingsCount: number;
}

export interface ConnectionResult {
  ok: boolean;
  latencyMs: number;
  message?: string;
}

// ─── Helper ────────────────────────────────────────────────────────────────────

function isConfigured(): boolean {
  return !!import.meta.env.BESTDEFENSE_API_KEY;
}

async function bdFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const base = import.meta.env.BESTDEFENSE_BASE_URL || 'https://app.bestdefense.io/api';
  const apiKey = import.meta.env.BESTDEFENSE_API_KEY;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5_000);

  try {
    const res = await fetch(`${base}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options?.headers ?? {}),
      },
    });

    if (!res.ok) {
      throw new Error(`BestDefense API returned ${res.status}`);
    }

    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) {
      throw new Error('Unexpected content-type from BestDefense API');
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

export async function getFindings(params: FindingsParams = {}): Promise<Finding[]> {
  if (!isConfigured()) {
    logger.debug('BestDefense: using mock findings data');
    let findings = MOCK_FINDINGS;
    if (params.severity) findings = findings.filter((f) => f.severity === params.severity);
    if (params.status) findings = findings.filter((f) => f.status === params.status);
    const page = params.page ?? 1;
    const limit = params.limit ?? 25;
    return findings.slice((page - 1) * limit, page * limit);
  }

  const qs = new URLSearchParams();
  if (params.severity) qs.set('severity', params.severity);
  if (params.status) qs.set('status', params.status);
  if (params.page) qs.set('page', String(params.page));
  if (params.limit) qs.set('limit', String(params.limit));

  try {
    return await bdFetch<Finding[]>(`/v1/findings?${qs}`);
  } catch (err) {
    logger.error({ err }, 'BestDefense getFindings failed');
    throw err;
  }
}

export async function getComplianceStatus(): Promise<ComplianceReport> {
  if (!isConfigured()) {
    logger.debug('BestDefense: using mock compliance data');
    return MOCK_COMPLIANCE;
  }
  try {
    return await bdFetch<ComplianceReport>('/v1/compliance');
  } catch (err) {
    logger.error({ err }, 'BestDefense getComplianceStatus failed');
    throw err;
  }
}

export async function listScans(): Promise<Scan[]> {
  if (!isConfigured()) {
    return MOCK_SCANS;
  }
  try {
    return await bdFetch<Scan[]>('/v1/scans');
  } catch (err) {
    logger.error({ err }, 'BestDefense listScans failed');
    throw err;
  }
}

export async function triggerScan(target: string): Promise<Scan> {
  if (!isConfigured()) {
    return {
      id: `SCAN-MOCK-${Date.now()}`,
      target,
      status: 'queued',
      startedAt: new Date().toISOString(),
      completedAt: null,
      findingsCount: 0,
    };
  }
  try {
    return await bdFetch<Scan>('/v1/scans', {
      method: 'POST',
      body: JSON.stringify({ target }),
    });
  } catch (err) {
    logger.error({ err }, 'BestDefense triggerScan failed');
    throw err;
  }
}

export async function testConnection(): Promise<ConnectionResult> {
  if (!isConfigured()) {
    return { ok: false, latencyMs: 0, message: 'API key not configured — using mock data' };
  }
  const start = Date.now();
  try {
    await bdFetch('/v1/health');
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return { ok: false, latencyMs: Date.now() - start, message: String(err) };
  }
}
