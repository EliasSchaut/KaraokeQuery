// Proxy fuer die Songsuche: der Browser ruft nur dieses Backend, das die
// eigentliche Meilisearch-Anfrage server-seitig stellt. So liegt kein Key im
// Frontend und Meilisearch muss nicht nach aussen exponiert werden.
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) ?? {};
  const { query, limit, offset, filter, facets, sort } = body;

  return await meiliClient()
    .index('karaoke')
    .search(query ?? '', { limit, offset, filter, facets, sort });
});
