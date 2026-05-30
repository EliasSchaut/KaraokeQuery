export default defineEventHandler(async (event) => {
  const {
    ULTRASTAR_API_BASE,
    ULTRASTAR_CLIENT_ID,
    SING_SCENE_PLAYER_DATA_DTO,
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

  // Nuxt parst NUXT_-Env-Werte automatisch (destr), d.h. ueber die Env-Variable
  // kommt hier bereits ein Objekt an; aus der .env (Build) ein JSON-String.
  const singScenePlayerData =
    typeof SING_SCENE_PLAYER_DATA_DTO === 'string'
      ? JSON.parse(SING_SCENE_PLAYER_DATA_DTO)
      : SING_SCENE_PLAYER_DATA_DTO;

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
      SingScenePlayerDataDto: singScenePlayerData,
      GameRoundSettings: { ModifierDtos: [], AnyModifierActive: false },
      IsMedleyWithPreviousEntry: false,
    }),
  });
});
