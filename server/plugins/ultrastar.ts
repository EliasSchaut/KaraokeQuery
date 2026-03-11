import { UltrastarTrackType } from '#shared/types/ultrastar_track';

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const { ULTRASTAR_API_BASE, ULTRASTAR_CLIENT_ID } = config;

  if (!config.public.use_queue) {
    console.warn('[UltraStar Startup] Queue is disabled. Skipping song fetch.');
    return;
  }

  if (!ULTRASTAR_API_BASE) {
    console.warn(
      '[UltraStar Startup] ULTRASTAR_API_BASE is not configured. Skipping song fetch.',
    );
    return;
  }

  try {
    const { MEILI_HOST, MEILI_MASTER_KEY } = config;
    if (!MEILI_HOST || !MEILI_MASTER_KEY) {
      console.error(
        '[UltraStar Startup] Meilisearch configuration is missing.',
      );
      return;
    }

    console.log(
      `[UltraStar Startup] Fetching songs from UltraStar: ${ULTRASTAR_API_BASE}...`,
    );

    const response: { SongList: UltrastarTrackType[] } = (await $fetch(
      `${ULTRASTAR_API_BASE}/api/rest/songs`,
      {
        headers: {
          'client-id': ULTRASTAR_CLIENT_ID || 'karaoke-query',
        },
      },
    ).catch((err) => {
      console.error(
        '[UltraStar Startup] Failed to fetch songs from UltraStar:',
        err.message,
      );
      return null;
    })) as { SongList: UltrastarTrackType[] };

    if (!response || !Array.isArray(response.SongList)) {
      console.warn(
        '[UltraStar Startup] No songs returned or invalid response format from UltraStar.',
      );
      return;
    }

    const songs = response.SongList.map((song) => {
      return {
        ...song,
        id: Buffer.from(song.Hash).toString('hex'),
      };
    });
    console.log(
      `[UltraStar Startup] Received ${songs.length} songs from UltraStar. Loading into Meilisearch 'ultrastar' index...`,
    );

    const { MeiliSearch } = await import('meilisearch');
    const client = new MeiliSearch({
      host: MEILI_HOST,
      apiKey: MEILI_MASTER_KEY,
    });

    const index = client.index('ultrastar');
    const importResponse = index.addDocuments(songs, {
      primaryKey: 'id',
    });
    await importResponse.waitTask();

    console.log("[UltraStar Startup] Configuring 'ultrastar' index...");
    await Promise.all([
      index.updateSearchableAttributes(['Artist', 'Title', 'Hash']),
      index.updateFilterableAttributes(['Artist', 'Title', 'Hash']),
      index.updateSortableAttributes(['Artist', 'Title', 'Hash']),
    ]);

    const stats = await client.index('ultrastar').getStats();

    console.log(
      `✓ [UltraStar Startup] Successfully loaded ${stats.numberOfDocuments} UltraStar songs into Meilisearch!`,
    );
  } catch (error) {
    console.error(
      '[UltraStar Startup] Error during UltraStar initialization:',
      error,
    );
  }
});
