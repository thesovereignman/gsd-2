/* empty css               */
import { c as createComponent } from './astro-component_CL1pTktJ.mjs';
import 'piccolore';
import { b9 as renderHead, T as renderTemplate } from './sequence_BIIgtFsN.mjs';
import 'clsx';
import { v as verifySession } from './auth_D28UeJt2.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  if (await verifySession(Astro2.cookies)) {
    return Astro2.redirect("/dashboard");
  }
  const error = Astro2.url.searchParams.has("error");
  return renderTemplate`<html lang="en" data-astro-cid-sgpqyurt> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sign In — AutomateSecurity</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-sgpqyurt> <div class="w-full max-w-sm mx-auto px-6" data-astro-cid-sgpqyurt> <!-- Logo + wordmark --> <div class="text-center mb-10" data-astro-cid-sgpqyurt> <!-- Shield SVG logo mark --> <svg class="mx-auto mb-4" width="64" height="72" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-sgpqyurt> <path d="M32 2L4 14V38C4 54 16 67 32 70C48 67 60 54 60 38V14L32 2Z" fill="#1B3A6B" stroke="#1B3A6B" stroke-width="2" data-astro-cid-sgpqyurt></path> <path d="M32 6L8 17V38C8 52 18 63 32 66C46 63 56 52 56 38V17L32 6Z" fill="#E8F1F8" data-astro-cid-sgpqyurt></path> <path d="M32 11L12 21V38C12 50 20 59 32 62C44 59 52 50 52 38V21L32 11Z" fill="#1B3A6B" data-astro-cid-sgpqyurt></path> <!-- Lock icon --> <rect x="24" y="36" width="16" height="13" rx="2" fill="white" data-astro-cid-sgpqyurt></rect> <path d="M27 36V33C27 29.7 29.7 27 33 27H31C27.7 27 25 29.7 25 33V36" stroke="white" stroke-width="2.5" fill="none" data-astro-cid-sgpqyurt></path> <path d="M37 36V33C37 29.7 34.3 27 31 27H33C36.3 27 39 29.7 39 33V36" stroke="white" stroke-width="2.5" fill="none" data-astro-cid-sgpqyurt></path> <circle cx="32" cy="41" r="2" fill="#1B3A6B" data-astro-cid-sgpqyurt></circle> <rect x="31" y="41" width="2" height="4" rx="1" fill="#1B3A6B" data-astro-cid-sgpqyurt></rect> </svg> <h1 class="text-2xl font-bold text-[#1B3A6B] tracking-tight" data-astro-cid-sgpqyurt>AutomateSecurity</h1> <p class="text-sm text-[#6B7280] mt-1 font-mono tracking-wide uppercase" data-astro-cid-sgpqyurt>Security Operations Portal</p> </div> <!-- Login card --> <div class="bg-white rounded-2xl border border-[#D1D9E0] shadow-sm p-8" data-astro-cid-sgpqyurt> <p class="text-xs font-mono tracking-[0.15em] uppercase text-[#1B3A6B] mb-1" data-astro-cid-sgpqyurt>FIG. 1</p> <hr class="border-[#1B3A6B] w-8 mb-6" data-astro-cid-sgpqyurt> <h2 class="text-lg font-semibold text-[#1B3A6B] mb-6" data-astro-cid-sgpqyurt>Sign In</h2> ${error && renderTemplate`<div class="mb-5 flex items-center gap-2 bg-[#FEF2F2] border border-[#F04438] rounded-lg px-4 py-3" data-astro-cid-sgpqyurt> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-astro-cid-sgpqyurt> <circle cx="8" cy="8" r="7" stroke="#F04438" stroke-width="1.5" data-astro-cid-sgpqyurt></circle> <path d="M8 5v4M8 11v.5" stroke="#F04438" stroke-width="1.5" stroke-linecap="round" data-astro-cid-sgpqyurt></path> </svg> <span class="text-sm text-[#F04438] font-medium" data-astro-cid-sgpqyurt>Invalid password. Please try again.</span> </div>`} <form method="POST" action="/api/auth/login" data-astro-cid-sgpqyurt> <label class="block mb-5" data-astro-cid-sgpqyurt> <span class="text-xs font-mono tracking-[0.12em] uppercase text-[#6B7280] mb-2 block" data-astro-cid-sgpqyurt>Password</span> <input type="password" name="password" autocomplete="current-password" required class="w-full px-4 py-3 rounded-lg border border-[#D1D9E0] bg-[#F5F8FA] text-[#374151] font-mono text-sm focus:outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/10 transition-colors" placeholder="Enter portal password" data-astro-cid-sgpqyurt> </label> <button type="submit" class="w-full bg-[#1B3A6B] hover:bg-[#2A5298] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm tracking-wide" data-astro-cid-sgpqyurt>
Sign In →
</button> </form> </div> <p class="text-center text-xs text-[#6B7280] mt-6" data-astro-cid-sgpqyurt>
Set <code class="font-mono bg-[#EFF3F7] px-1 rounded" data-astro-cid-sgpqyurt>PORTAL_ADMIN_PASSWORD_HASH</code> in your environment to configure access.
</p> </div> </body></html>`;
}, "/home/user/gsd-2/security-portal/src/pages/login.astro", void 0);

const $$file = "/home/user/gsd-2/security-portal/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
