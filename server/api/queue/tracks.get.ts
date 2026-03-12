export default defineEventHandler(async (event) => {
  const {
    ULTRASTAR_API_BASE,
    ULTRASTAR_CLIENT_ID,
    public: { use_queue },
  } = useRuntimeConfig();

  if (!use_queue) {
    return new Response('Queue is disabled', { status: 404 });
  }

  const queueResponse: { Items: QueueType[] } = await $fetch(
    `${ULTRASTAR_API_BASE}/api/rest/songQueue`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': ULTRASTAR_CLIENT_ID,
      },
    },
  );

  if (!queueResponse || !Array.isArray(queueResponse.Items)) {
    return new Response('No songs in queue', { status: 204 });
  }
  return queueResponse.Items;
});
