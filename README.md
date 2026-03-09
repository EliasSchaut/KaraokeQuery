# KaraokeQuery

A simple web frontend for Meilisearch that displays available karaoke songs downloaded
with [usdb_syncer](https://github.com/bohning/usdb_syncer).

## Features

- **Search and browse** available karaoke songs
- **Queue songs** directly to [Melody Mania](https://melodymania.org) or [Ultrastar Play](https://ultrastar-play.com)
- **Multi-language support** with i18n
- **Dark mode** support
- **Responsive design** with a clean and modern UI

## Prerequisites

1. Basic knowledge of deploying web apps with Docker
2. [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
3. [Node.js 24+](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation)
4. [usdb_syncer](https://github.com/bohning/usdb_syncer/releases) (latest release)
5. **Optional (for Queue feature):** [Melody Mania](https://melodymania.org) or [Ultrastar Play](https://ultrastar-play.com) configured with your song library (must be run at least once to generate `Settings.json`)

## Setup

### 1. Clone and Configure

```bash
git clone <repository-url>
cd KaraokeQuery
cp .env.example .env
```

### 2. Download Songs with usdb_syncer

1. Run `usdb_syncer` to download songs from USDB
2. Go to `Tools → Create Report → Locally available songs → JSON Report → OK`
3. Save the JSON report to the repository root as `songlist.json`
   - Or customize the path via `SONGLIST_PATH` in `.env`

### 3. Configure Queue Feature (Optional)

**Only needed if you want to queue songs to Melody Mania or Ultrastar Play.**

1. Stop Melody Mania/Ultrastar Play if running
2. Open `Settings.json` and add to `HttpApiPermissions`:
   ```json
   {
     "HttpApiPermissions": {
       "your-client-id": ["WriteSongQueue", "WriteConfig", "WriteInputSimulation"]
     }
   }
   ```
   Replace `your-client-id` with any string you choose (e.g., `karaoke-query`)

3. Set `ULTRASTAR_CLIENT_ID` in `.env` to match the client ID above
4. Start the game and navigate to:
   `Settings → Develop → Companion Client Connections → HTTP endpoint example`
5. Copy the base URL (e.g., `http://localhost:34567`) to `ULTRASTAR_API_BASE` in `.env`
   - **Do not** include the `/api/rest/...` path

### 4. Configure Environment Variables

Generate a Meilisearch master key:

```bash
openssl rand -hex 32
```

Add it to `.env` as `MEILI_MASTER_KEY`. Review and edit other variables as needed.

### 5. Start the Application

```bash
docker compose up -d
pnpm install
pnpm import-songs
```

Access the app at **http://localhost:3000**
