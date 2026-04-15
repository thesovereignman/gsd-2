/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Portal auth (required)
  readonly PORTAL_SESSION_SECRET: string;
  readonly PORTAL_ADMIN_PASSWORD_HASH: string;

  // BestDefense.io
  readonly BESTDEFENSE_API_KEY: string;
  readonly BESTDEFENSE_BASE_URL: string;

  // Fireraven.ai
  readonly FIRERAVEN_CLIENT_ID: string;
  readonly FIRERAVEN_API_KEY: string;
  readonly FIRERAVEN_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
