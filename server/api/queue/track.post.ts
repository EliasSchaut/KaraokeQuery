import { $meilisearch } from '#build/types/nitro-imports';

export default defineEventHandler(async (event) => {
  const { ULTRASTAR_API_BASE, ULTRASTAR_CLIENT_ID } = useRuntimeConfig();

  const artist = getRouterParam(event, 'artist');
  const title = getRouterParam(event, 'title');
  const player = getRouterParam(event, 'username');

  if (![artist, title, player].every(Boolean)) {
    return new Response('Missing required parameters', { status: 400 });
  }

  const hash = '';

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
