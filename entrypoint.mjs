import { createHmac } from 'node:crypto';

// Leitet den read-only Meilisearch-Such-Key deterministisch aus dem Master-Key
// ab und setzt ihn als NUXT_PUBLIC_..._SEARCH_API_KEY, BEVOR der Nuxt-Server
// startet (runtimeConfig wird beim Start aus den Env-Vars eingefroren). So
// erhaelt der Browser nur den Such-Key, nie den Master-Key.
// WICHTIG: UID identisch zu server/utils/meiliSearchKey.ts halten.
const MEILI_SEARCH_KEY_UID = '9f2c1e7a-5b34-4c1d-8a6e-2d0f7b9c4e51';

const masterKey =
  process.env.NUXT_MEILI_MASTER_KEY || process.env.MEILI_MASTER_KEY;

if (masterKey && !process.env.NUXT_PUBLIC_MEILISEARCH_CLIENT_SEARCH_API_KEY) {
  process.env.NUXT_PUBLIC_MEILISEARCH_CLIENT_SEARCH_API_KEY = createHmac(
    'sha256',
    masterKey,
  )
    .update(MEILI_SEARCH_KEY_UID)
    .digest('hex');
}

await import('./.output/server/index.mjs');
