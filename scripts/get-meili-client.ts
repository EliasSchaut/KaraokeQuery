import { MeiliSearch } from 'meilisearch';
import { config } from 'dotenv';

config({ quiet: true });

const MEILISEARCH_HOST = process.env.MEILI_HOST || 'http://localhost:7700';
const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY || '';

export const client = new MeiliSearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILI_MASTER_KEY,
});
