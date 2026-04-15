/**
 * Input validation and sanitization for API proxy routes.
 * Allow-lists all accepted query parameters — unknown params are dropped silently.
 */

export interface FindingsParams {
  severity?: 'critical' | 'high' | 'medium' | 'low';
  status?: 'open' | 'resolved' | 'in_review';
  page?: number;
  limit?: number;
}

export interface EventsParams {
  limit?: number;
  type?: string;
}

const ALLOWED_SEVERITIES = new Set(['critical', 'high', 'medium', 'low']);
const ALLOWED_STATUSES = new Set(['open', 'resolved', 'in_review']);
const ALLOWED_EVENT_TYPES = new Set(['block', 'jailbreak', 'injection', 'exfiltration', 'scan_complete', 'policy_violation']);

export function validateFindingsParams(sp: URLSearchParams): FindingsParams {
  const params: FindingsParams = {};

  const sev = sp.get('severity');
  if (sev && ALLOWED_SEVERITIES.has(sev)) {
    params.severity = sev as FindingsParams['severity'];
  }

  const status = sp.get('status');
  if (status && ALLOWED_STATUSES.has(status)) {
    params.status = status as FindingsParams['status'];
  }

  const page = parseInt(sp.get('page') ?? '1', 10);
  if (!isNaN(page) && page >= 1 && page <= 1000) {
    params.page = page;
  }

  const limit = parseInt(sp.get('limit') ?? '25', 10);
  if (!isNaN(limit) && limit >= 1 && limit <= 100) {
    params.limit = limit;
  }

  return params;
}

export function validateEventsParams(sp: URLSearchParams): EventsParams {
  const params: EventsParams = {};

  const limit = parseInt(sp.get('limit') ?? '50', 10);
  if (!isNaN(limit) && limit >= 1 && limit <= 200) {
    params.limit = limit;
  }

  const type = sp.get('type');
  if (type && ALLOWED_EVENT_TYPES.has(type)) {
    params.type = type;
  }

  return params;
}
