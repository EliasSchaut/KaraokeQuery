export default defineEventHandler(async (event) => {
  const { ULTRASTAR_API_BASE, ULTRASTAR_CLIENT_ID } = useRuntimeConfig();

  const { artist, title, player } = await readBody(event);

  if (![artist, title, player].every(Boolean)) {
    return new Response('Missing required parameters', { status: 400 });
  }

  const searchResult = await $meilisearch(event)
    .index('ultrastar')
    .search(`${artist} ${title}`, {
      limit: 1,
    });

  const track = searchResult.hits[0] as any;
  const hash = track?.Hash || '';

  if (!hash) {
    return new Response('Track not found', { status: 404 });
  }

  return await $fetch(`${ULTRASTAR_API_BASE}/api/rest/songQueue/entry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': ULTRASTAR_CLIENT_ID,
    },
    body: JSON.stringify({
      SongDto: {
        Artist: artist,
        Title: title,
        Hash: hash,
      },
      SingScenePlayerDataDto: {
        PlayerProfileNames: [player],
        PlayerProfileToMicProfileMap: {
          [player]: {
            Name: player,
            ChannelIndex: 0,
            Color: '#8b5cf6',
          },
        },
        PlayerProfileToVoiceNameMap: {
          player: '',
        },
      },
      GameRoundSettings: {},
      IsMedleyWithPreviousEntry: false,
    }),
  });
});
