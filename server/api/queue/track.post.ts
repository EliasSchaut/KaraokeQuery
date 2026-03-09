export default defineEventHandler(async (event) => {
  const { ULTRASTAR_API_BASE, ULTRASTAR_CLIENT_ID } = useRuntimeConfig();

  const artist = '';
  const title = '';
  const hash = '';
  const player = '';

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
            Color: '#F7E32C',
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
