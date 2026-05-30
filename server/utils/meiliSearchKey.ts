import { createHmac } from 'node:crypto';

// Fester UID fuer den read-only Such-Key. Meilisearch leitet den Key-Wert
// deterministisch als HMAC-SHA256(masterKey, uid) ab -> wir koennen ihn ohne
// Netzwerkaufruf berechnen. WICHTIG: identisch in entrypoint.mjs halten.
export const MEILI_SEARCH_KEY_UID = '9f2c1e7a-5b34-4c1d-8a6e-2d0f7b9c4e51';

export function deriveMeiliSearchApiKey(masterKey?: string | null): string {
  if (!masterKey) return '';
  return createHmac('sha256', masterKey)
    .update(MEILI_SEARCH_KEY_UID)
    .digest('hex');
}
