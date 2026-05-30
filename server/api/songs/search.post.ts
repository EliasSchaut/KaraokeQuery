export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) ?? {};
  const { query, limit, offset, filter, facets, sort } = body;

  try {
    return await meiliClient()
      .index('karaoke')
      .search(query ?? '', { limit, offset, filter, facets, sort });
  } catch (error: any) {
    const code = error?.cause?.code ?? error?.code;
    if (code === 'index_not_found') {
      return {
        hits: [],
        query: query ?? '',
        limit: limit ?? 0,
        offset: offset ?? 0,
        estimatedTotalHits: 0,
        facetDistribution: {},
      };
    }
    throw error;
  }
});
