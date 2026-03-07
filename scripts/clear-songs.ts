import { client } from './get-meili-client';

async function clearSongs() {
  try {
    console.log('Deleting karaoke index...');
    await client.deleteIndex('karaoke');

    console.log('✓ Successfully deleted all songs from Meilisearch!');
  } catch (error) {
    console.error('Error deleting songs:', error);
    process.exit(1);
  }
}

clearSongs().then();
