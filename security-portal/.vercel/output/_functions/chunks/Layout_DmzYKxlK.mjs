import { U as createRenderInstruction, B as maybeRenderHead, a4 as addAttribute, T as renderTemplate, b9 as renderHead, D as renderSlot } from './sequence_BIIgtFsN.mjs';
import { c as createComponent } from './astro-component_CL1pTktJ.mjs';
import 'piccolore';
import { r as renderComponent } from './entrypoint_ROM10XiH.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ShieldCritical = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ShieldCritical;
  const { size = 24, class: cls = "" } = Astro2.props;
  return renderTemplate`<!--
  RED shield: CRITICAL / FAIL / Threat detected
  Design: navy outline, ice-white inner ring, coral-red fill, white circle with navy X
-->${maybeRenderHead()}<svg${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 100 112" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute(cls, "class")} aria-label="Critical threat detected" role="img"> <!-- Outer navy border --> <path d="M50 4L6 22V56C6 80 24 100 50 108C76 100 94 80 94 56V22L50 4Z" fill="#1B3A6B"></path> <!-- Ice-white inner ring --> <path d="M50 10L12 27V56C12 77 28 95 50 102C72 95 88 77 88 56V27L50 10Z" fill="#E8F1F8"></path> <!-- Red fill --> <path d="M50 17L18 32V56C18 74 32 90 50 97C68 90 82 74 82 56V32L50 17Z" fill="#F04438"></path> <!-- White circle --> <circle cx="50" cy="60" r="18" fill="white"></circle> <!-- Navy X icon --> <path d="M42 52L58 68M58 52L42 68" stroke="#1B3A6B" stroke-width="4.5" stroke-linecap="round"></path> </svg>`;
}, "/home/user/gsd-2/security-portal/src/components/shared/ShieldCritical.astro", void 0);

const $$ShieldWarning = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ShieldWarning;
  const { size = 24, class: cls = "" } = Astro2.props;
  return renderTemplate`<!--
  YELLOW shield: AT RISK / WARNING / Vulnerable
  Design: navy outline, ice-white inner ring, golden-yellow fill, white circle with navy open-padlock + X
-->${maybeRenderHead()}<svg${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 100 112" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute(cls, "class")} aria-label="Security risk — at risk" role="img"> <!-- Outer navy border --> <path d="M50 4L6 22V56C6 80 24 100 50 108C76 100 94 80 94 56V22L50 4Z" fill="#1B3A6B"></path> <!-- Ice-white inner ring --> <path d="M50 10L12 27V56C12 77 28 95 50 102C72 95 88 77 88 56V27L50 10Z" fill="#E8F1F8"></path> <!-- Yellow fill --> <path d="M50 17L18 32V56C18 74 32 90 50 97C68 90 82 74 82 56V32L50 17Z" fill="#F5C842"></path> <!-- White circle --> <circle cx="50" cy="60" r="18" fill="white"></circle> <!-- Navy open padlock body --> <rect x="40" y="60" width="20" height="14" rx="2.5" fill="#1B3A6B"></rect> <!-- Open shackle (arc, open on right) --> <path d="M44 60V55C44 51.7 46.7 49 50 49C53.3 49 56 51.7 56 55" stroke="#1B3A6B" stroke-width="3.5" stroke-linecap="round" fill="none"></path> <!-- Small X on lock body --> <path d="M46.5 65L53.5 71M53.5 65L46.5 71" stroke="white" stroke-width="2.5" stroke-linecap="round"></path> </svg>`;
}, "/home/user/gsd-2/security-portal/src/components/shared/ShieldWarning.astro", void 0);

const $$ShieldSecure = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ShieldSecure;
  const { size = 24, class: cls = "" } = Astro2.props;
  return renderTemplate`<!--
  GREEN shield: SECURE / PASS / Clean
  Design: navy outline, ice-white inner ring, emerald-green fill, white circle with navy locked-padlock + checkmark
-->${maybeRenderHead()}<svg${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 100 112" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute(cls, "class")} aria-label="Secure — no threats detected" role="img"> <!-- Outer navy border --> <path d="M50 4L6 22V56C6 80 24 100 50 108C76 100 94 80 94 56V22L50 4Z" fill="#1B3A6B"></path> <!-- Ice-white inner ring --> <path d="M50 10L12 27V56C12 77 28 95 50 102C72 95 88 77 88 56V27L50 10Z" fill="#E8F1F8"></path> <!-- Green fill --> <path d="M50 17L18 32V56C18 74 32 90 50 97C68 90 82 74 82 56V32L50 17Z" fill="#12B76A"></path> <!-- White circle --> <circle cx="50" cy="60" r="18" fill="white"></circle> <!-- Navy closed padlock body --> <rect x="40" y="60" width="20" height="14" rx="2.5" fill="#1B3A6B"></rect> <!-- Closed shackle (full arc) --> <path d="M44 60V55C44 51.7 46.7 49 50 49C53.3 49 56 51.7 56 55V60" stroke="#1B3A6B" stroke-width="3.5" stroke-linecap="round" fill="none"></path> <!-- White checkmark on lock body --> <path d="M45.5 67L49 70.5L55 64" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path> </svg>`;
}, "/home/user/gsd-2/security-portal/src/components/shared/ShieldSecure.astro", void 0);

const $$Shield = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Shield;
  const { state, size = 24, class: cls = "" } = Astro2.props;
  return renderTemplate`${state === "critical" && renderTemplate`${renderComponent($$result, "ShieldCritical", $$ShieldCritical, { "size": size, "class": cls })}`}${state === "warning" && renderTemplate`${renderComponent($$result, "ShieldWarning", $$ShieldWarning, { "size": size, "class": cls })}`}${state === "secure" && renderTemplate`${renderComponent($$result, "ShieldSecure", $$ShieldSecure, { "size": size, "class": cls })}`}`;
}, "/home/user/gsd-2/security-portal/src/components/shared/Shield.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { bdState, frState, currentPath } = Astro2.props;
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/alerts", label: "Alerts" },
    { href: "/settings", label: "Settings" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="bg-[#1B3A6B] text-white sticky top-0 z-50 shadow-md"> <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6"> <!-- Wordmark --> <a href="/dashboard" class="flex items-center gap-3 shrink-0"> <!-- Mini shield mark --> <svg width="28" height="32" viewBox="0 0 100 112" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M50 4L6 22V56C6 80 24 100 50 108C76 100 94 80 94 56V22L50 4Z" fill="white" fill-opacity="0.15"></path> <path d="M50 4L6 22V56C6 80 24 100 50 108C76 100 94 80 94 56V22L50 4Z" stroke="white" stroke-width="4"></path> <rect x="40" y="55" width="20" height="15" rx="2" fill="white"></rect> <path d="M44 55V50C44 46.7 46.7 44 50 44C53.3 44 56 46.7 56 50V55" stroke="white" stroke-width="3.5" fill="none"></path> <circle cx="50" cy="61" r="2" fill="#1B3A6B"></circle> <rect x="49" y="61" width="2" height="4" rx="1" fill="#1B3A6B"></rect> </svg> <span class="font-bold text-base tracking-tight hidden sm:block">AutomateSecurity</span> </a> <!-- Nav links --> <nav class="hidden md:flex items-center gap-1"> ${navLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPath.startsWith(href) ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`, "class")}> ${label} </a>`)} </nav> <!-- Right side: platform health + logout --> <div class="flex items-center gap-4"> <!-- BestDefense status chip --> <div class="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1"> ${renderComponent($$result, "Shield", $$Shield, { "state": bdState, "size": 16 })} <span class="text-xs font-mono text-white/80">BD</span> </div> <!-- Fireraven status chip --> <div class="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1"> ${renderComponent($$result, "Shield", $$Shield, { "state": frState, "size": 16 })} <span class="text-xs font-mono text-white/80">FR</span> </div> <!-- Logout --> <form method="POST" action="/api/auth/logout"> <button type="submit" class="text-xs font-mono text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded border border-white/20 hover:border-white/40">
Sign Out
</button> </form> </div> </div> <!-- Mobile nav --> <div class="md:hidden border-t border-white/10 px-6 py-2 flex gap-2"> ${navLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`flex-1 text-center py-2 rounded text-xs font-medium transition-colors ${currentPath.startsWith(href) ? "bg-white/20 text-white" : "text-white/70"}`, "class")}> ${label} </a>`)} </div> </header>`;
}, "/home/user/gsd-2/security-portal/src/components/layout/Header.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, bdState = "secure", frState = "secure" } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} — AutomateSecurity</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-page min-h-screen font-sans text-[#374151]"> ${renderComponent($$result, "Header", $$Header, { "bdState": bdState, "frState": frState, "currentPath": currentPath })} <main> ${renderSlot($$result, $$slots["default"])} </main> <footer class="border-t border-[#D1D9E0] py-6 px-8 mt-16"> <div class="max-w-7xl mx-auto flex items-center justify-between"> <p class="text-xs font-mono text-[#6B7280] tracking-wide uppercase">
© AutomateSecurity ${(/* @__PURE__ */ new Date()).getFullYear()} · All rights reserved
</p> <p class="text-xs font-mono text-[#6B7280]">
Powered by BestDefense.io + Fireraven.ai
</p> </div> </footer> </body></html>`;
}, "/home/user/gsd-2/security-portal/src/components/layout/Layout.astro", void 0);

export { $$Shield as $, $$Layout as a, renderScript as r };
