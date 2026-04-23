/**
 * Realistic mock data for both BestDefense.io and Fireraven.ai.
 * Used automatically when API keys are not configured in .env.
 */

import type { Finding, ComplianceReport, Scan } from './bestdefense.js';
import type { SecurityEvent, GuardStatus } from './fireraven.js';

// ─── BestDefense mock data ─────────────────────────────────────────────────────

export const MOCK_FINDINGS: Finding[] = [
  {
    id: 'V-001',
    title: 'Unauthenticated admin endpoint exposed',
    description: 'The /api/admin route is publicly accessible without authentication, allowing any attacker to enumerate users and modify system settings.',
    severity: 'critical',
    status: 'open',
    endpoint: '/api/admin',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-002',
    title: 'Missing Authorization header on API calls',
    description: 'Several internal API endpoints do not validate the Authorization header, allowing lateral movement within the application.',
    severity: 'critical',
    status: 'open',
    endpoint: '/api/v2/users',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-003',
    title: 'Self-signed TLS certificate on staging',
    description: 'The staging environment uses a self-signed certificate, which could allow MITM attacks if traffic is proxied.',
    severity: 'medium',
    status: 'in_review',
    endpoint: 'staging.app.example.com:443',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-004',
    title: 'Rate limiting absent on authentication endpoint',
    description: 'The /auth/login endpoint does not enforce rate limiting, enabling brute-force credential attacks.',
    severity: 'high',
    status: 'open',
    endpoint: '/auth/login',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-005',
    title: 'Outdated dependency with known CVE',
    description: 'express@4.17.1 contains CVE-2022-24999 (prototype pollution). Upgrade to 4.18.2+.',
    severity: 'high',
    status: 'open',
    endpoint: 'package.json',
    cve: 'CVE-2022-24999',
    discoveredAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-006',
    title: 'Verbose error messages leaked to client',
    description: 'Unhandled exceptions expose stack traces and internal paths in production API responses.',
    severity: 'medium',
    status: 'open',
    endpoint: '/api/*',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'V-007',
    title: 'S3 bucket with public read ACL',
    description: 'The assets.example.com S3 bucket has PublicRead ACL, potentially exposing sensitive uploaded files.',
    severity: 'low',
    status: 'resolved',
    endpoint: 'assets.example.com (S3)',
    cve: 'N/A',
    discoveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const MOCK_COMPLIANCE: ComplianceReport = {
  generatedAt: new Date().toISOString(),
  frameworks: [
    { id: 'soc2', name: 'SOC 2 Type II', score: 94, passCount: 47, failCount: 3, totalControls: 50 },
    { id: 'nist', name: 'NIST 800-53', score: 78, passCount: 312, failCount: 88, totalControls: 400 },
    { id: 'pci', name: 'PCI DSS v4.0', score: 61, passCount: 73, failCount: 47, totalControls: 120 },
    { id: 'iso27001', name: 'ISO 27001:2022', score: 91, passCount: 101, failCount: 10, totalControls: 111 },
    { id: 'cmmc', name: 'CMMC Level 2', score: 83, passCount: 99, failCount: 21, totalControls: 120 },
  ],
};

export const MOCK_SCANS: Scan[] = [
  {
    id: 'SCAN-2024-001',
    target: 'https://app.example.com',
    status: 'completed',
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    findingsCount: 7,
  },
  {
    id: 'SCAN-2024-002',
    target: 'https://api.example.com',
    status: 'running',
    startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    completedAt: null,
    findingsCount: 0,
  },
];

// ─── Fireraven mock data ───────────────────────────────────────────────────────

export const MOCK_FR_EVENTS: SecurityEvent[] = [
  {
    id: 'FR-001',
    type: 'block',
    subtype: 'prompt_injection',
    severity: 'critical',
    message: 'Prompt injection attempt blocked',
    detail: 'Input contained "ignore all previous instructions" pattern targeting prod-agent.',
    agent: 'prod-agent',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    creditsUsed: 2,
  },
  {
    id: 'FR-002',
    type: 'scan_complete',
    subtype: 'redraven',
    severity: 'pass',
    message: 'RedRaven automated scan completed — 0 jailbreaks found',
    detail: 'Ran 1,200 attack cases against chatbot-v2. No successful jailbreaks or data exfiltration paths found.',
    agent: 'chatbot-v2',
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    creditsUsed: 120,
  },
  {
    id: 'FR-003',
    type: 'block',
    subtype: 'data_exfiltration',
    severity: 'high',
    message: 'Data exfiltration attempt blocked',
    detail: 'Model response attempted to include PII from conversation history in output.',
    agent: 'support-agent',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    creditsUsed: 1,
  },
  {
    id: 'FR-004',
    type: 'policy_violation',
    subtype: 'restricted_topic',
    severity: 'medium',
    message: 'Policy violation — restricted topic requested',
    detail: 'User asked the agent to provide guidance on bypassing multi-factor authentication.',
    agent: 'support-agent',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    creditsUsed: 1,
  },
  {
    id: 'FR-005',
    type: 'scan_complete',
    subtype: 'redraven',
    severity: 'medium',
    message: 'RedRaven scan found 3 policy evasion paths',
    detail: 'chatbot-v1 is susceptible to 3 edge-case prompt formulations that bypass the topic restriction policy.',
    agent: 'chatbot-v1',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    creditsUsed: 95,
  },
];

export const MOCK_FR_STATUS: GuardStatus = {
  healthy: true,
  activeAgents: 3,
  totalBlocksToday: 12,
  totalScansThisWeek: 8,
  creditsRemaining: 4_320,
  plan: 'Business',
  updatedAt: new Date().toISOString(),
};
