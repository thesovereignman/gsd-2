/* empty css               */
import { c as createComponent } from './astro-component_CL1pTktJ.mjs';
import 'piccolore';
import { B as maybeRenderHead, a4 as addAttribute, T as renderTemplate } from './sequence_BIIgtFsN.mjs';
import { r as renderComponent } from './entrypoint_ROM10XiH.mjs';
import { $ as $$Shield, a as $$Layout, r as renderScript } from './Layout_DmzYKxlK.mjs';
import { g as getFindings } from './bestdefense_vxHs4DmV.mjs';
import { g as getRecentEvents } from './fireraven_CE2Bt6p5.mjs';
import { s as shieldForSeverity } from './shield_1G7bD9qE.mjs';

const $$AlertFeedItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AlertFeedItem;
  const { state, source, title, detail, meta, timestamp } = Astro2.props;
  const sourcePill = source === "BD" ? { bg: "bg-[#1B3A6B]", label: "BD" } : { bg: "bg-violet-700", label: "FR" };
  function relativeTime(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 6e4);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "just now";
  }
  const borderColors = {
    critical: "border-l-[#F04438]",
    warning: "border-l-[#F5C842]",
    secure: "border-l-[#12B76A]"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex items-start gap-4 border-b border-[#D1D9E0] border-l-4 ${borderColors[state]} px-5 py-4 hover:bg-[#EFF3F7] transition-colors bg-white`, "class")}> <!-- Shield (24px) --> <div class="shrink-0 pt-0.5"> ${renderComponent($$result, "Shield", $$Shield, { "state": state, "size": 24 })} </div> <!-- Source pill + content --> <div class="flex-1 min-w-0"> <div class="flex items-center gap-2 mb-1 flex-wrap"> <span${addAttribute(`inline-block text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${sourcePill.bg}`, "class")}> ${sourcePill.label} </span> <p class="text-sm font-medium text-[#374151] leading-snug">${title}</p> </div> ${detail && renderTemplate`<p class="text-xs text-[#6B7280] leading-snug line-clamp-2 mb-1">${detail}</p>`} ${meta && renderTemplate`<code class="text-[10px] font-mono text-[#6B7280] bg-[#EFF3F7] px-1.5 py-0.5 rounded">${meta}</code>`} </div> <!-- Timestamp --> <time class="shrink-0 text-[10px] font-mono text-[#6B7280] mt-1">${relativeTime(timestamp)}</time> </div>`;
}, "/home/user/gsd-2/security-portal/src/components/shared/AlertFeedItem.astro", void 0);

const $$Alerts = createComponent(async ($$result, $$props, $$slots) => {
  const [findingsResult, eventsResult] = await Promise.allSettled([
    getFindings({ limit: 50 }),
    getRecentEvents({ limit: 50 })
  ]);
  const findings = findingsResult.status === "fulfilled" ? findingsResult.value : [];
  const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];
  const bdItems = findings.map((f) => ({
    id: f.id,
    source: "BD",
    state: shieldForSeverity(f.severity),
    title: f.title,
    detail: f.description,
    meta: f.endpoint,
    timestamp: f.discoveredAt
  }));
  const frItems = events.map((e) => ({
    id: e.id,
    source: "FR",
    state: shieldForSeverity(
      e.severity === "pass" ? "pass" : e.severity === "critical" ? "critical" : e.severity === "high" ? "high" : e.severity === "medium" ? "medium" : "low"
    ),
    title: e.message,
    detail: e.detail,
    meta: e.agent,
    timestamp: e.timestamp
  }));
  const allItems = [...bdItems, ...frItems].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const bdOpenCritical = findings.some((f) => f.severity === "critical" && f.status !== "resolved");
  const frHasBlocks = events.some((e) => e.type === "block");
  const bdState = bdOpenCritical ? "critical" : findings.some((f) => f.severity === "high" && f.status !== "resolved") ? "warning" : "secure";
  const frState = frHasBlocks ? "warning" : "secure";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Alerts", "bdState": bdState, "frState": frState }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="w-full py-16 px-6 bg-page"> <div class="max-w-4xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 1</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <div class="flex items-end justify-between mb-6 flex-wrap gap-4"> <div> <h1 class="text-2xl font-bold text-[#1B3A6B] tracking-tight">Live Security Feed</h1> <p class="text-sm text-[#6B7280] mt-1">${allItems.length} events · auto-refreshes every 60s</p> </div> <!-- Meta refresh for no-JS auto-refresh --> <meta http-equiv="refresh" content="60"> <!-- Filter controls --> <div class="flex items-center gap-2 flex-wrap"> <select id="filter-source" class="text-xs font-mono border border-[#D1D9E0] rounded-lg px-3 py-2 bg-white text-[#374151] focus:outline-none focus:border-[#1B3A6B]"> <option value="">All Sources</option> <option value="BD">BestDefense</option> <option value="FR">Fireraven</option> </select> <select id="filter-state" class="text-xs font-mono border border-[#D1D9E0] rounded-lg px-3 py-2 bg-white text-[#374151] focus:outline-none focus:border-[#1B3A6B]"> <option value="">All Severity</option> <option value="critical">Critical</option> <option value="warning">Warning</option> <option value="secure">Pass / Secure</option> </select> </div> </div> <!-- Feed list --> <div id="feed-list" class="rounded-xl border border-[#D1D9E0] overflow-hidden shadow-sm"> ${allItems.length === 0 ? renderTemplate`<div class="text-center py-16 bg-white text-[#6B7280]"> <p class="text-3xl mb-3">✓</p> <p class="font-semibold text-[#12B76A]">No alerts</p> <p class="text-xs mt-1">Everything looks clean</p> </div>` : allItems.map((item) => renderTemplate`<div${addAttribute(item.source, "data-source")}${addAttribute(item.state, "data-state")} class="feed-item"> ${renderComponent($$result2, "AlertFeedItem", $$AlertFeedItem, { "source": item.source, "state": item.state, "title": item.title, "detail": item.detail, "meta": item.meta, "timestamp": item.timestamp })} </div>`)} </div> </div> </section> <hr class="border-[#D1D9E0]">  <section class="w-full py-16 px-6 bg-white"> <div class="max-w-4xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 2</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <h2 class="text-xl font-bold text-[#1B3A6B] tracking-tight mb-6">Feed Summary</h2> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4"> ${[
    { label: "Total Events", value: allItems.length, color: "text-[#1B3A6B]" },
    { label: "BD Findings", value: bdItems.length, color: "text-[#1B3A6B]" },
    { label: "FR Events", value: frItems.length, color: "text-violet-700" },
    { label: "Critical Alerts", value: allItems.filter((i) => i.state === "critical").length, color: "text-[#F04438]" }
  ].map(({ label, value, color }) => renderTemplate`<div class="bg-[#F5F8FA] border border-[#D1D9E0] rounded-xl p-5 text-center"> <p${addAttribute(`text-3xl font-bold ${color}`, "class")}>${value}</p> <p class="text-xs font-mono uppercase tracking-wide text-[#6B7280] mt-1">${label}</p> </div>`)} </div> </div> </section> ` })} ${renderScript($$result, "/home/user/gsd-2/security-portal/src/pages/alerts.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/gsd-2/security-portal/src/pages/alerts.astro", void 0);

const $$file = "/home/user/gsd-2/security-portal/src/pages/alerts.astro";
const $$url = "/alerts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Alerts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
