/* empty css               */
import { c as createComponent } from './astro-component_CL1pTktJ.mjs';
import 'piccolore';
import { B as maybeRenderHead, T as renderTemplate, a4 as addAttribute } from './sequence_BIIgtFsN.mjs';
import { r as renderComponent } from './entrypoint_ROM10XiH.mjs';
import { $ as $$Shield, r as renderScript, a as $$Layout } from './Layout_DmzYKxlK.mjs';
import { b as testConnection } from './bestdefense_vxHs4DmV.mjs';
import { t as testConnection$1 } from './fireraven_CE2Bt6p5.mjs';

const $$ConnectionStatus = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ConnectionStatus;
  const { platform, slug, configured, state } = Astro2.props;
  const stateLabel = configured ? state === "secure" ? "CONNECTED" : state === "warning" ? "DEGRADED" : "ERROR" : "MOCK DATA";
  return renderTemplate`${maybeRenderHead()}<div class="bg-white rounded-xl border border-[#D1D9E0] shadow-sm p-6 flex items-start gap-5"> <!-- Shield indicator (48px) --> <div class="shrink-0 flex flex-col items-center gap-2"> ${renderComponent($$result, "Shield", $$Shield, { "state": configured ? state : "warning", "size": 48 })} <span class="text-[10px] font-mono tracking-[0.08em] uppercase text-[#6B7280]"> ${stateLabel} </span> </div> <!-- Details --> <div class="flex-1 min-w-0"> <h3 class="font-semibold text-[#1B3A6B] text-base mb-1">${platform}</h3> <p class="text-sm text-[#6B7280] font-mono mb-4">
API Key:
${configured ? renderTemplate`<span class="text-[#374151]">●●●●●●●●●●●●●●●● <span class="text-[#12B76A] font-semibold">configured</span></span>` : renderTemplate`<span class="text-[#F5C842]">not set</span>`} </p> ${!configured && renderTemplate`<div class="flex items-center gap-2 bg-[#FFFBEB] border border-[#F5C842]/50 rounded-lg px-3 py-2 mb-4"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none"> <circle cx="7" cy="7" r="6" stroke="#F5C842" stroke-width="1.5"></circle> <path d="M7 4v4M7 9.5v.5" stroke="#F5C842" stroke-width="1.5" stroke-linecap="round"></path> </svg> <span class="text-xs text-[#92400E]">Using mock data — set <code class="font-mono bg-[#FEF3C7] px-1 rounded">${slug.toUpperCase().replace("-", "")}_API_KEY</code> in env to connect</span> </div>`} <!-- Test connection button (JS-powered) --> <button type="button"${addAttribute(`/api/${slug}/test-connection`, "data-test-url")} class="test-conn-btn inline-flex items-center gap-2 text-sm font-medium text-[#1B3A6B] hover:text-[#2A5298] border border-[#D1D9E0] hover:border-[#1B3A6B] rounded-lg px-4 py-2 transition-colors">
Test Connection →
</button> <span class="test-conn-result ml-3 text-xs font-mono text-[#6B7280]"></span> </div> </div> ${renderScript($$result, "/home/user/gsd-2/security-portal/src/components/shared/ConnectionStatus.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/gsd-2/security-portal/src/components/shared/ConnectionStatus.astro", void 0);

const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const [bdResult, frResult] = await Promise.allSettled([testConnection(), testConnection$1()]);
  bdResult.status === "fulfilled" ? bdResult.value : { };
  frResult.status === "fulfilled" ? frResult.value : { };
  const bdConfigured = false;
  const frConfigured = false;
  const bdState = "warning";
  const frState = "warning";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Settings", "bdState": bdState, "frState": frState }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="w-full py-16 px-6"> <div class="max-w-3xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 1</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <h1 class="text-2xl font-bold text-[#1B3A6B] tracking-tight mb-2">Platform Connections</h1> <p class="text-sm text-[#6B7280] mb-8">
Real-time API connectivity status for your channel partner integrations.
</p> <div class="space-y-5"> ${renderComponent($$result2, "ConnectionStatus", $$ConnectionStatus, { "platform": "BestDefense.io", "slug": "bestdefense", "configured": bdConfigured, "state": bdState })} ${renderComponent($$result2, "ConnectionStatus", $$ConnectionStatus, { "platform": "Fireraven.ai", "slug": "fireraven", "configured": frConfigured, "state": frState })} </div> </div> </section> <hr class="border-[#D1D9E0]">  <section class="w-full py-16 px-6 bg-white"> <div class="max-w-3xl mx-auto"> <p class="text-xs font-mono tracking-[0.2em] uppercase text-[#1B3A6B] mb-2">FIG. 2</p> <hr class="border-[#1B3A6B] w-10 mb-6"> <h2 class="text-xl font-bold text-[#1B3A6B] tracking-tight mb-6">Configuration Guide</h2> <div class="bg-[#F5F8FA] rounded-xl border border-[#D1D9E0] p-6 space-y-5"> <div> <h3 class="text-sm font-semibold text-[#1B3A6B] mb-2">1. Copy the environment template</h3> <pre class="bg-[#1B3A6B] text-white/90 rounded-lg p-4 text-xs font-mono overflow-x-auto">cp security-portal/.env.example security-portal/.env</pre> </div> <div> <h3 class="text-sm font-semibold text-[#1B3A6B] mb-2">2. Generate a session secret</h3> <pre class="bg-[#1B3A6B] text-white/90 rounded-lg p-4 text-xs font-mono overflow-x-auto">openssl rand -hex 32</pre> <p class="text-xs text-[#6B7280] mt-2">Paste the output as <code class="font-mono bg-[#EFF3F7] px-1 rounded">PORTAL_SESSION_SECRET</code></p> </div> <div> <h3 class="text-sm font-semibold text-[#1B3A6B] mb-2">3. Hash your admin password</h3> <pre class="bg-[#1B3A6B] text-white/90 rounded-lg p-4 text-xs font-mono overflow-x-auto">node -e "const b=require('bcryptjs');b.hash('yourpassword',12).then(console.log)"</pre> </div> <div> <h3 class="text-sm font-semibold text-[#1B3A6B] mb-2">4. Add platform API keys</h3> <pre class="bg-[#1B3A6B] text-white/90 rounded-lg p-4 text-xs font-mono overflow-x-auto">${`BESTDEFENSE_API_KEY=your_bd_key_here
FIRERAVEN_API_KEY=your_fr_key_here
FIRERAVEN_CLIENT_ID=your_fr_client_id`}</pre> </div> <div class="flex items-start gap-3 bg-[#FFFBEB] border border-[#F5C842]/50 rounded-lg p-4"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="shrink-0 mt-0.5"> <circle cx="8" cy="8" r="7" stroke="#F5C842" stroke-width="1.5"></circle> <path d="M8 5v4M8 10.5v.5" stroke="#F5C842" stroke-width="1.5" stroke-linecap="round"></path> </svg> <p class="text-xs text-[#92400E]"> <strong>Security note:</strong> API keys are read from environment variables at startup. They are never written to disk via this UI and are never sent to the browser. To rotate a key, update the environment variable and restart the service.
</p> </div> </div> </div> </section> ` })}`;
}, "/home/user/gsd-2/security-portal/src/pages/settings.astro", void 0);
const $$file = "/home/user/gsd-2/security-portal/src/pages/settings.astro";
const $$url = "/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
