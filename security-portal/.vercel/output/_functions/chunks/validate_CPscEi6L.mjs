const ALLOWED_SEVERITIES = /* @__PURE__ */ new Set(["critical", "high", "medium", "low"]);
const ALLOWED_STATUSES = /* @__PURE__ */ new Set(["open", "resolved", "in_review"]);
const ALLOWED_EVENT_TYPES = /* @__PURE__ */ new Set(["block", "jailbreak", "injection", "exfiltration", "scan_complete", "policy_violation"]);
function validateFindingsParams(sp) {
  const params = {};
  const sev = sp.get("severity");
  if (sev && ALLOWED_SEVERITIES.has(sev)) {
    params.severity = sev;
  }
  const status = sp.get("status");
  if (status && ALLOWED_STATUSES.has(status)) {
    params.status = status;
  }
  const page = parseInt(sp.get("page") ?? "1", 10);
  if (!isNaN(page) && page >= 1 && page <= 1e3) {
    params.page = page;
  }
  const limit = parseInt(sp.get("limit") ?? "25", 10);
  if (!isNaN(limit) && limit >= 1 && limit <= 100) {
    params.limit = limit;
  }
  return params;
}
function validateEventsParams(sp) {
  const params = {};
  const limit = parseInt(sp.get("limit") ?? "50", 10);
  if (!isNaN(limit) && limit >= 1 && limit <= 200) {
    params.limit = limit;
  }
  const type = sp.get("type");
  if (type && ALLOWED_EVENT_TYPES.has(type)) {
    params.type = type;
  }
  return params;
}

export { validateEventsParams as a, validateFindingsParams as v };
