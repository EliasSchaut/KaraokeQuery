import { UltrastarTrackType } from '#shared/types/ultrastar_track';

export default defineNitroPlugin(async (nitroApp) => {
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
    const { hostUrl, adminApiKey } = config.meilisearch;
    if (!hostUrl || !adminApiKey) {
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

    if (!response || !Array.isArray(response)) {
      console.warn(
        '[UltraStar Startup] No songs returned or invalid response format from UltraStar.',
      );
      return;
    }

    const songs: UltrastarTrackType[] = response.SongList;
    console.log(
      `[UltraStar Startup] Received ${songs.length} songs from UltraStar. Loading into Meilisearch 'ultrastar' index...`,
    );

    const { MeiliSearch } = await import('meilisearch');
    const client = new MeiliSearch({
      host: hostUrl,
      apiKey: adminApiKey,
    });

    const index = client.index('ultrastar');

    const importResponse = index.addDocuments(songs, {
      primaryKey: 'Hash',
    });
    await importResponse.waitTask();

    console.log("[UltraStar Startup] Configuring 'ultrastar' index...");
    await Promise.all([
      index.updateSearchableAttributes(['Artist', 'Title', 'Hash']),
      index.updateFilterableAttributes(['Artist', 'Title', 'Hash']),
      index.updateSortableAttributes(['Artist', 'Title', 'Hash']),
    ]);

    console.log(
      '✓ [UltraStar Startup] Successfully loaded UltraStar songs into Meilisearch!',
    );
  } catch (error) {
    console.error(
      '[UltraStar Startup] Error during UltraStar initialization:',
      error,
    );
  }
});
