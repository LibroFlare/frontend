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
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

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

  eslint: {
    config: { typescript: true },
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
              50: '#e2d7ff',
              100: '#cbb9ff',
              200: '#a686ff',
              300: '#7948ff',
              400: '#5c3ab9',
              500: '#472f88',
              600: '#2b2244',
              700: '#271e3d',
              800: '#211a33',
              900: '#1b1736',
              950: '#181325',
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
        iso: 'en',
        name: 'English',
        files: ['en.json', 'common.json'],
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
})
