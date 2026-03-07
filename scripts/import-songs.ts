import { readFileSync } from 'fs';
import { client } from './get-meili-client';

const SONGLIST_PATH = process.env.SONGLIST_PATH || './songlist.json';

async function importSongs() {
  try {
    console.log(`Reading songlist from ${SONGLIST_PATH}...`);
    const data = JSON.parse(readFileSync(SONGLIST_PATH, 'utf-8'));
    const songs = data.songs;

    console.log(`Found ${songs.length} songs`);

    console.log('Creating/updating karaoke index...');
    const index = client.index('karaoke');

    console.log(`Importing songs... (this may take a while)`);
    const response = index.addDocuments(songs, { primaryKey: 'id' });
    await response.waitTask();

    console.log('Configuring searchable attributes...');
    await index.updateSearchableAttributes([
      'title',
      'artist',
      'genre',
      'language',
      'edition',
      'tags',
    ]);

    console.log('Configuring filterable attributes...');
    await index.updateFilterableAttributes([
      'genre',
      'language',
      'year',
      'duet',
      'golden_notes',
      'edition',
    ]);

    console.log('Configuring sortable attributes...');
    await index.updateSortableAttributes(['year', 'title', 'artist']);

    console.log('✓ Successfully imported songs into Meilisearch!');

    const stats = await index.getStats();
    console.log(`Total documents in index: ${stats.numberOfDocuments}`);
  } catch (error) {
    console.error('Error importing songs:', error);
    process.exit(1);
  }
}

importSongs().then();
