// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
    },
    pageTransition: { name: 'pageopacity', mode: 'out-in' },
  },

  pages: true,

  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },

  css: ['assets/css/index.css'],

  experimental: {
    typedPages: true,
  },

  modules: ['@nuxt/image', 'nuxt-viewport'],

  runtimeConfig: {
    public: {
      domains: process.env.NUXT_PUBLIC_DOMAINS,
      graphqlUrl: process.env.NUXT_PUBLIC_GRAPHQL_URL,
    },
  },

  devtools: { enabled: false },

  // Настройка изображений (плагин @nuxt/image)
  image: {
    domains: [`${process.env.NUXT_PUBLIC_DOMAINS}`],
  },

  // Настройка размеров разрешения экрана (плагин nuxt-viewport)
  viewport: {
    /* breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,
      mobileWide: 425,

      tablet: 768,
    }, */

    breakpoints: {
      screen1024: 1024,
      screen1280: 1280,
      screen1600: 1600,

      screen768: 768,
      screen576: 576,
      screen320: 320,
    },
  },
});
