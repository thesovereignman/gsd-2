import { l as logger } from './logger_D-9yXnpc.mjs';
import { M as MOCK_COMPLIANCE, a as MOCK_FINDINGS, b as MOCK_SCANS } from './mock-data_CuEmcoWw.mjs';

async function getFindings(params = {}) {
  {
    logger.debug("BestDefense: using mock findings data");
    let findings = MOCK_FINDINGS;
    if (params.severity) findings = findings.filter((f) => f.severity === params.severity);
    if (params.status) findings = findings.filter((f) => f.status === params.status);
    const page = params.page ?? 1;
    const limit = params.limit ?? 25;
    return findings.slice((page - 1) * limit, page * limit);
  }
}
async function getComplianceStatus() {
  {
    logger.debug("BestDefense: using mock compliance data");
    return MOCK_COMPLIANCE;
  }
}
async function listScans() {
  {
    return MOCK_SCANS;
  }
}
async function triggerScan(target) {
  {
    return {
      id: `SCAN-MOCK-${Date.now()}`,
      target,
      status: "queued",
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      completedAt: null,
      findingsCount: 0
    };
  }
}
async function testConnection() {
  {
    return { ok: false, latencyMs: 0, message: "API key not configured — using mock data" };
  }
}

export { getComplianceStatus as a, testConnection as b, getFindings as g, listScans as l, triggerScan as t };
