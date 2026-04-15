import { l as logger } from './logger_D-9yXnpc.mjs';
import { c as MOCK_FR_EVENTS, d as MOCK_FR_STATUS } from './mock-data_CuEmcoWw.mjs';

async function getRecentEvents(params = {}) {
  {
    logger.debug("Fireraven: using mock events data");
    let events = MOCK_FR_EVENTS;
    if (params.type) events = events.filter((e) => e.subtype === params.type);
    return events.slice(0, params.limit ?? 50);
  }
}
async function getGuardStatus() {
  {
    logger.debug("Fireraven: using mock guard status");
    return MOCK_FR_STATUS;
  }
}
async function testConnection() {
  {
    return { ok: false, latencyMs: 0, message: "API key not configured — using mock data" };
  }
}

export { getGuardStatus as a, getRecentEvents as g, testConnection as t };
