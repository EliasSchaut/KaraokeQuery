export default defineEventHandler(async (event) => {
  const {
    ULTRASTAR_API_BASE,
    ULTRASTAR_CLIENT_ID,
    ULTRASTAR_RECORDING_NAME,
    ULTRASTAR_RECORDING_CHANNEL,
    ULTRASTAR_PLAYER_COLOR,
  } = useRuntimeConfig();

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
        PlayerProfileNames: ['Player01', 'Player02', 'Player03', 'Player04'],
        PlayerProfileToMicProfileMap: {
          Player01: {
            Name: ULTRASTAR_RECORDING_NAME,
            ChannelIndex: Number(ULTRASTAR_RECORDING_CHANNEL),
            Color: ULTRASTAR_PLAYER_COLOR,
          },
        },
        PlayerProfileToVoiceNameMap: {
          Player01: '',
        },
      },
      GameRoundSettings: {},
      IsMedleyWithPreviousEntry: false,
    }),
  });
});
