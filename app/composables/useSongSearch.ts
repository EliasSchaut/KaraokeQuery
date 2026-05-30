export interface SongSearchOptions {
  limit?: number;
  offset?: number;
  filter?: string;
  facets?: string[];
  sort?: string[];
}

// Spricht ausschliesslich das eigene Backend an (/api/songs/search). Die
// Meilisearch-Anfrage passiert dort server-seitig - kein Key im Browser.
export function useSongSearch() {
  const result = useState<any>('karaoke-search-result', () => null);

  const search = async (query: string, options: SongSearchOptions = {}) => {
    const resp = await $fetch('/api/songs/search', {
      method: 'POST',
      body: { query, ...options },
    });
    result.value = resp;
    return resp;
  };

  return { search, result };
}
