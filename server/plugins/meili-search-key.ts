import { MEILI_SEARCH_KEY_UID } from '../utils/meiliSearchKey';

// Stellt sicher, dass in Meilisearch ein reiner Such-Key (actions: ['search'])
// mit festem UID existiert. Der Browser erhaelt nur diesen abgeleiteten Key,
// nie den Master-Key (siehe nuxt.config.ts / entrypoint.mjs).
export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const host = config.MEILI_HOST;
  const masterKey = config.MEILI_MASTER_KEY;

  if (!host || !masterKey) {
    console.warn(
      '[Meilisearch Search Key] MEILI_HOST oder MEILI_MASTER_KEY fehlt. Such-Key wird nicht eingerichtet.',
    );
    return;
  }

  try {
    const { MeiliSearch } = await import('meilisearch');
    const client = new MeiliSearch({ host, apiKey: masterKey });

    const { results } = await client.getKeys();
    if (results.some((k) => k.uid === MEILI_SEARCH_KEY_UID)) {
      return;
    }

    await client.createKey({
      uid: MEILI_SEARCH_KEY_UID,
      name: 'KaraokeQuery public search key',
      description: 'Read-only search key exposed to the browser',
      actions: ['search'],
      indexes: ['*'],
      expiresAt: null,
    });
    console.log(
      `[Meilisearch Search Key] Read-only Such-Key angelegt (uid ${MEILI_SEARCH_KEY_UID}).`,
    );
  } catch (error) {
    console.error(
      '[Meilisearch Search Key] Such-Key konnte nicht eingerichtet werden:',
      error,
    );
  }
});
