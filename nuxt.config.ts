// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/ico', href: '/img/favicon.ico' }],
      meta: [
        {
          name: 'description',
          content:
            'Innovative Modern Library with Books, Audiobooks, Comicses and Manga',
        },
        {
          name: 'keywords',
          content: 'audio library books manga comics audiobook',
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
  ],

  eslint: {
    config: { typescript: true },
  },

  pinia: { storesDirs: ['./stores/**'] },
  imports: { dirs: ['./stores'] },

  googleFonts: {
    display: 'swap',
    families: {
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
  },

  css: ['~/assets/scss/style.scss'],
  tailwindcss: {
    exposeConfig: true,
    config: {
      theme: {
        screens: {
          '3xs': '320px',
          '2xs': '425px',
          xs: '480px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
          '3xl': '1920px',
        },
        extend: {
          colors: {
            primary: {
              50: 'var(--color-primary-50)',
              100: 'var(--color-primary-100)',
              200: 'var(--color-primary-200)',
              300: 'var(--color-primary-300)',
              400: 'var(--color-primary-400)',
              500: 'var(--color-primary-500)',
              600: 'var(--color-primary-600)',
              700: 'var(--color-primary-700)',
              800: 'var(--color-primary-800)',
              900: 'var(--color-primary-900)',
              950: 'var(--color-primary-950)',
            },
          },
        },
      },
    },
  },

  image: { dir: 'public/img/' },

  i18n: {
    lazy: true,
    langDir: 'assets/locales/',
    strategy: 'no_prefix',
    locales: [
      {
        icon: 'twemoji:flag-united-kingdom',
        code: 'en',
        language: 'en',
        name: 'English - UK (United Kingdom)',
        files: ['en.json', 'common.json'],
      },
      {
        icon: 'twemoji:flag-czechia',
        code: 'cs',
        language: 'cs',
        name: 'Czech - Čeština',
        files: ['cs.json', 'common.json'],
      },
      {
        icon: 'twemoji:flag-france',
        code: 'fr',
        language: 'fr',
        name: 'French - Français',
        files: ['fr.json', 'common.json'],
      },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
})
