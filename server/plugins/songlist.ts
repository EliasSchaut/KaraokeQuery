import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const songlistPath = config.SONGLIST_PATH || './songlist.json';
  const absolutePath = resolve(process.cwd(), songlistPath);

  if (!existsSync(absolutePath)) {
    console.warn(
      `[Meilisearch Startup] Songlist not found at ${absolutePath}. Skipping data initialization.`,
    );
    return;
  }

  try {
    const { MEILI_HOST, MEILI_MASTER_KEY } = config;

    if (!MEILI_HOST || !MEILI_MASTER_KEY) {
      console.error(
        '[Meilisearch Startup] Meilisearch host or API key is missing. Skipping data initialization.',
      );
      return;
    }

    const data = JSON.parse(readFileSync(absolutePath, 'utf-8'));
    const songs = data.songs;

    if (!songs || !Array.isArray(songs)) {
      console.warn('[Meilisearch Startup] No songs found in songlist.json.');
      return;
    }

    console.log(
      `[Meilisearch Startup] Found ${songs.length} songs. Starting import...`,
    );

    const { MeiliSearch } = await import('meilisearch');
    const client = new MeiliSearch({
      host: MEILI_HOST,
      apiKey: MEILI_MASTER_KEY,
    });

    const index = client.index('karaoke');
    const stats = await index.getStats();
    if (stats.numberOfDocuments > 0) {
      console.log(
        `[Meilisearch Startup] Index 'karaoke' already contains ${stats.numberOfDocuments} documents. Skipping initial import.`,
      );
      return;
    }

    console.log('[Meilisearch Startup] Importing songs into Meilisearch...');
    const response = index.addDocuments(songs, { primaryKey: 'id' });
    await response.waitTask();

    console.log('[Meilisearch Startup] Configuring index...');
    await Promise.all([
      index.updateSearchableAttributes([
        'title',
        'artist',
        'genre',
        'language',
        'edition',
        'tags',
      ]),
      index.updateFilterableAttributes([
        'genre',
        'language',
        'year',
        'duet',
        'golden_notes',
        'edition',
      ]),
      index.updateSortableAttributes(['year', 'title', 'artist']),
      index.updateFaceting({
        maxValuesPerFacet: 10,
        sortFacetValuesBy: { genre: 'count' },
      }),
    ]);

    console.log(
      '✓ [Meilisearch Startup] Successfully initialized Meilisearch data!',
    );
  } catch (error) {
    console.error('[Meilisearch Startup] Error during initialization:', error);
  }
});
