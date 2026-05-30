import 'dotenv';
import { deriveMeiliSearchApiKey } from './server/utils/meiliSearchKey';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-07',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-meilisearch',
  ],

  runtimeConfig: {
    public: {
      use_queue: Boolean(process.env.KARAOKE_QUERY_USE_QUEUE) || false,
      default_username: process.env.DEFAULT_USERNAME || 'Unknown',
    },
    SONGLIST_PATH: process.env.SONGLIST_PATH || './songlist.json',
    ULTRASTAR_API_BASE: process.env.ULTRASTAR_API_BASE,
    ULTRASTAR_CLIENT_ID: process.env.ULTRASTAR_CLIENT_ID,
    ULTRASTAR_RECORDING_NAME:
      process.env.ULTRASTAR_RECORDING_DEVICE_NAME_PLAYER_1,
    ULTRASTAR_RECORDING_CHANNEL:
      process.env.ULTRASTAR_RECORDING_DEVICE_CHANNEL_ID_PLAYER_1,
    ULTRASTAR_PLAYER_COLOR: process.env.ULTRASTAR_COLOR_PLAYER_1,
    MEILI_HOST: process.env.MEILI_HOST,
    MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
    SING_SCENE_PLAYER_DATA_DTO: process.env.SING_SCENE_PLAYER_DATA_DTO,
  },

  meilisearch: {
    hostUrl: process.env.MEILI_HOST,
    adminApiKey: process.env.MEILI_MASTER_KEY,
    // Kein Master-Key im Browser! Der reine Such-Key wird deterministisch aus
    // dem Master-Key abgeleitet. Im Dev greift dies direkt (hier ist .env
    // geladen); im gebauten Image ist es zur Build-Zeit leer und wird vom
    // Entrypoint zur Laufzeit per NUXT_PUBLIC_..._SEARCH_API_KEY gesetzt.
    searchApiKey: deriveMeiliSearchApiKey(process.env.MEILI_MASTER_KEY),
    serverSideUsage: true,
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    families: [
      {
        name: 'Fredoka',
        provider: 'local',
      },
      {
        name: 'Geist',
        provider: 'local',
      },
    ],
  },

  i18n: {
    langDir: 'locales',
    restructureDir: 'app',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        isCatchallLocale: true,
        file: 'en-US.json',
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
