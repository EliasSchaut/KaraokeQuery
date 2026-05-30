import { MeiliSearch } from 'meilisearch';

let client: MeiliSearch | undefined;

// Server-seitiger Meilisearch-Client. Nutzt den Master-Key und wird ausschliesslich
// im Backend verwendet - der Key gelangt nie zum Browser.
export function meiliClient(): MeiliSearch {
  if (!client) {
    const { MEILI_HOST, MEILI_MASTER_KEY } = useRuntimeConfig();
    client = new MeiliSearch({
      host: MEILI_HOST,
      apiKey: MEILI_MASTER_KEY,
    });
  }
  return client;
}
