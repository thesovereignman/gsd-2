/* empty css               */
import { c as createComponent } from './astro-component_CL1pTktJ.mjs';
import 'piccolore';
import { B as maybeRenderHead, a4 as addAttribute, T as renderTemplate, F as Fragment } from './sequence_BIIgtFsN.mjs';
import { r as renderComponent } from './entrypoint_ROM10XiH.mjs';
import { $ as $$Shield, a as $$Layout, r as renderScript } from './Layout_DmzYKxlK.mjs';
import { a as shieldForScore, s as shieldForSeverity } from './shield_1G7bD9qE.mjs';
import 'clsx';
import { g as getFindings, a as getComplianceStatus } from './bestdefense_vxHs4DmV.mjs';
import { a as getGuardStatus } from './fireraven_CE2Bt6p5.mjs';

const $$ComplianceGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ComplianceGrid;
  const { frameworks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"> ${frameworks.map((fw) => {
    const state = shieldForScore(fw.score);
    return renderTemplate`<div class="bg-white rounded-xl border border-[#D1D9E0] shadow-sm p-5 flex flex-col items-center text-center gap-3"> ${renderComponent($$result, "Shield", $$Shield, { "state": state, "size": 48 })} <div> <p class="text-xs font-mono font-semibold text-[#1B3A6B] tracking-wide uppercase">${fw.name}</p> <p${addAttribute(`text-2xl font-bold mt-1 ${state === "secure" ? "text-[#12B76A]" : state === "warning" ? "text-[#F5C842]" : "text-[#F04438]"}`, "class")}>${fw.score}%</p> <p class="text-[10px] text-[#6B7280] mt-1 font-mono"> ${fw.passCount}/${fw.totalControls} controls
</p> </div> </div>`;
  })} </div>`;
}, "/home/user/gsd-2/security-portal/src/components/bestdefense/ComplianceGrid.astro", void 0);

const $$StatusBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StatusBadge;
  const { severity, label } = Astro2.props;
  const CONFIG = {
    critical: { bg: "bg-[#F04438]", text: "text-white", defaultLabel: "CRITICAL" },
    high: { bg: "bg-orange-500", text: "text-white", defaultLabel: "HIGH" },
    medium: { bg: "bg-[#F5C842]", text: "text-[#1B3A6B]", defaultLabel: "MEDIUM" },
    low: { bg: "bg-blue-500", text: "text-white", defaultLabel: "LOW" },
    pass: { bg: "bg-[#12B76A]", text: "text-white", defaultLabel: "PASS" },
    fail: { bg: "bg-[#F04438]", text: "text-white", defaultLabel: "FAIL" },
    info: { bg: "bg-slate-500", text: "text-white", defaultLabel: "INFO" },
    mock: { bg: "bg-slate-200", text: "text-slate-600", defaultLabel: "MOCK DATA" }
  };
  const { bg, text, defaultLabel } = CONFIG[severity];
  const displayLabel = label ?? defaultLabel;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-[0.08em] uppercase ${bg} ${text}`, "class")}> ${displayLabel} </span>`;
}, "/home/user/gsd-2/security-portal/src/components/shared/StatusBadge.astro", void 0);

const $$FindingsTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FindingsTable;
  const { findings } = Astro2.props;
  function relativeTime(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 36e5);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    return `<1h ago`;
  }
  const statusColors = {
    open: "text-[#F04438]",
    in_review: "text-[#F5C842]",
    resolved: "text-[#12B76A]"
  };
  return renderTemplate`${maybeRenderHead()}<div class="overflow-x-auto rounded-xl border border-[#D1D9E0]"> <table class="w-full text-sm"> <thead> <tr class="bg-[#F5F8FA] border-b border-[#D1D9E0]"> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">ID</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">Title</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">Severity</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">Endpoint</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">CVE</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">Status</th> <th class="text-left px-4 py-3 text-xs font-mono tracking-[0.1em] uppercase text-[#1B3A6B]">Found</th> </tr> </thead> <tbody> ${findings.map((f, i) => renderTemplate`<tr${addAttribute(`border-b border-[#D1D9E0] hover:bg-[#EFF3F7] transition-colors ${i % 2 === 1 ? "bg-[#F5F8FA]/50" : "bg-white"}`, "class")}> <td class="px-4 py-3 font-mono text-xs text-[#6B7280]">${f.id}</td> <td class="px-4 py-3"> <div> <p class="text-[#374151] font-medium leading-tight">${f.title}</p> <p class="text-xs text-[#6B7280] mt-0.5 leading-tight line-clamp-1">${f.description}</p> </div> </td> <td class="px-4 py-3"> <div class="flex items-center gap-2"> ${renderComponent($$result, "Shield", $$Shield, { "state": shieldForSeverity(f.severity), "size": 24 })} ${renderComponent($$result, "StatusBadge", $$StatusBadge, { "severity": f.severity })} </div> </td> <td class="px-4 py-3 font-mono text-xs text-[#374151] max-w-[180px] truncate">${f.endpoint}</td> <td class="px-4 py-3 font-mono text-xs"> ${f.cve !== "N/A" ? renderTemplate`<span class="text-[#F04438]">${f.cve}</span>` : renderTemplate`<span class="text-[#6B7280]">—</span>`} </td> <td class="px-4 py-3"> <span${addAttribute(`text-xs font-semibold font-mono uppercase ${statusColors[f.status] ?? "text-[#6B7280]"}`, "class")}> ${f.status.replace("_", " ")} </span> </td> <td class="px-4 py-3 text-xs font-mono text-[#6B7280]">${relativeTime(f.discoveredAt)}</td> </tr>`)} </tbody> </table> ${findings.length === 0 && renderTemplate`<div class="text-center py-16 text-[#6B7280]"> <p class="text-3xl mb-3">✓</p> <p class="font-semibold text-[#12B76A]">No findings</p> <p class="text-xs mt-1">All clear — no vulnerabilities detected</p> </div>`} </div>`;
}, "/home/user/gsd-2/security-portal/src/components/bestdefense/FindingsTable.astro", void 0);

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const [findingsResult, complianceResult, frStatusResult] = await Promise.allSettled([
    getFindings({ limit: 50 }),
    getComplianceStatus(),
    getGuardStatus()
  ]);
  const findings = findingsResult.status === "fulfilled" ? findingsResult.value : [];
  const compliance = complianceResult.status === "fulfilled" ? complianceResult.value : null;
  const frStatus = frStatusResult.status === "fulfilled" ? frStatusResult.value : null;
  const counts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) {
    if (f.status !== "resolved" && f.severity in counts) {
      counts[f.severity]++;
    }
  }
  const openFindings = findings.filter((f) => f.status !== "resolved");
  const overallState = counts.critical > 0 ? "critical" : counts.high > 0 ? "warning" : "secure";
  const bdState = counts.critical > 0 ? "critical" : counts.high > 0 ? "warning" : "secure";
  const frState = !frStatus ? "warning" : frStatus.totalBlocksToday > 0 ? "warning" : "secure";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard", "bdState": bdState, "frState": frState }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="w-full py-16 px-6 bg-page"> <div class="max-w-7xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 1</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <div class="flex items-end justify-between mb-8 flex-wrap gap-4"> <h1 class="text-2xl font-bold text-[#1B3A6B] tracking-tight">Security Posture</h1> ${renderTemplate`<span class="inline-flex items-center gap-1.5 text-xs font-mono bg-[#FFFBEB] border border-[#F5C842]/50 text-[#92400E] px-3 py-1.5 rounded-full">
⚠ Some data is from mock sources
</span>`} </div> <!-- Three posture shields --> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6"> ${[
    { label: "Overall", sublabel: "Combined posture", state: overallState },
    { label: "BestDefense", sublabel: `${openFindings.length} open findings`, state: bdState },
    { label: "Fireraven", sublabel: frStatus ? `${frStatus.totalBlocksToday} blocks today` : "Status unknown", state: frState }
  ].map(({ label, sublabel, state }) => renderTemplate`<div class="flex flex-col items-center gap-3 bg-white rounded-2xl border border-[#D1D9E0] shadow-sm py-10 px-6"> ${renderComponent($$result2, "Shield", $$Shield, { "state": state, "size": 96 })} <div class="text-center"> <p class="font-bold text-[#1B3A6B] text-lg tracking-tight">${label}</p> <p class="text-xs text-[#6B7280] font-mono mt-1">${sublabel}</p> </div> </div>`)} </div> <!-- Severity summary bar --> <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"> ${[
    { key: "critical", label: "Critical", color: "text-[#F04438]", bg: "bg-[#FEF2F2]", border: "border-[#F04438]/30" },
    { key: "high", label: "High", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
    { key: "medium", label: "Medium", color: "text-[#F5C842]", bg: "bg-[#FFFBEB]", border: "border-[#F5C842]/40" },
    { key: "low", label: "Low", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" }
  ].map(({ key, label, color, bg, border }) => renderTemplate`<div${addAttribute(`${bg} border ${border} rounded-xl p-4 text-center`, "class")}> <p${addAttribute(`text-3xl font-bold ${color}`, "class")}>${counts[key]}</p> <p class="text-xs font-mono uppercase tracking-wide text-[#6B7280] mt-1">${label}</p> </div>`)} </div> </div> </section> <hr class="border-[#D1D9E0]">  ${compliance && renderTemplate`<section class="w-full py-16 px-6 bg-white"> <div class="max-w-7xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 2</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <h2 class="text-xl font-bold text-[#1B3A6B] tracking-tight mb-8">Compliance Status</h2> ${renderComponent($$result2, "ComplianceGrid", $$ComplianceGrid, { "frameworks": compliance.frameworks })} <p class="text-xs font-mono text-[#6B7280] mt-4">
Last updated ${new Date(compliance.generatedAt).toLocaleString()} </p> </div> </section>`}${compliance && renderTemplate`<hr class="border-[#D1D9E0]">`} <section${addAttribute(`w-full py-16 px-6 ${compliance ? "bg-muted" : "bg-white"}`, "class")}> <div class="max-w-7xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 3</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <div class="flex items-center justify-between mb-6 flex-wrap gap-4"> <h2 class="text-xl font-bold text-[#1B3A6B] tracking-tight">Vulnerability Findings</h2> <button id="scan-trigger-btn" type="button" class="inline-flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#2A5298] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
Run New Scan →
</button> </div> ${renderComponent($$result2, "FindingsTable", $$FindingsTable, { "findings": openFindings })} </div> </section>  ${frStatus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <hr class="border-[#D1D9E0]"> <section class="w-full py-16 px-6 bg-white"> <div class="max-w-7xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 4</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <h2 class="text-xl font-bold text-[#1B3A6B] tracking-tight mb-8">Fireraven AI Guard</h2> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4"> ${[
    { label: "Active Agents", value: String(frStatus.activeAgents), color: "text-[#1B3A6B]" },
    { label: "Blocks Today", value: String(frStatus.totalBlocksToday), color: frStatus.totalBlocksToday > 0 ? "text-[#F04438]" : "text-[#12B76A]" },
    { label: "Scans This Week", value: String(frStatus.totalScansThisWeek), color: "text-[#1B3A6B]" },
    { label: "Credits Remaining", value: frStatus.creditsRemaining.toLocaleString(), color: "text-[#12B76A]" }
  ].map(({ label, value, color }) => renderTemplate`<div class="bg-[#F5F8FA] border border-[#D1D9E0] rounded-xl p-5 text-center"> <p${addAttribute(`text-3xl font-bold ${color}`, "class")}>${value}</p> <p class="text-xs font-mono uppercase tracking-wide text-[#6B7280] mt-1">${label}</p> </div>`)} </div> <p class="text-xs font-mono text-[#6B7280] mt-4">
Plan: ${frStatus.plan} · Updated ${new Date(frStatus.updatedAt).toLocaleString()} </p> </div> </section> ` })}`}` })} ${renderScript($$result, "/home/user/gsd-2/security-portal/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/gsd-2/security-portal/src/pages/dashboard.astro", void 0);
const $$file = "/home/user/gsd-2/security-portal/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
