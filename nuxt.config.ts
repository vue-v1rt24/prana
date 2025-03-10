// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [{ name: 'yandex-verification', content: '9679f16570bf7142' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
    pageTransition: { name: 'pageopacity', mode: 'out-in' },
  },

  // Для заглушки
  /*   routeRules: {
    '/': { redirect: '/vn' },
  }, */

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

  modules: [
    '@nuxt/image',
    'nuxt-viewport',
    'nuxt-mail',
    'vue-yandex-maps/nuxt',
    'yandex-metrika-module-nuxt3',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    public: {
      domains: process.env.NUXT_PUBLIC_DOMAINS,
      graphqlUrl: process.env.NUXT_PUBLIC_GRAPHQL_URL,
    },
  },

  devtools: { enabled: true },

  // Настройка изображений (плагин @nuxt/image)
  image: {
    domains: [`${process.env.NUXT_PUBLIC_DOMAINS}`],
  },

  // Настройка размеров разрешения экрана (плагин nuxt-viewport)
  viewport: {
    breakpoints: {
      screen1024: 1024,
      screen1200: 1200,
      screen1280: 1280,
      screen1300: 1300,
      screen1600: 1600,

      screen768: 768,
      screen576: 576,
      screen320: 320,
    },
  },

  // Отправка почты. Плагин 'nuxt-mail'
  mail: {
    message: {
      from: 'pranaittech@yandex.ru',
      to: 'info@pranait.ru', // вот так нескольким получателям: 'pranaittech@mail.ru, pranaittech@yandex.ru' либо ['info@pranait.ru, pranaittech@yandex.ru']
    },
    smtp: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'pranaittech',
        pass: 'iktcqrrmgrwuizie', // пароль для приложений. Создаётся в учётной записи почты
      },
    },
  },

  // Для карты яндекса / 'vue-yandex-maps/nuxt'
  yandexMaps: {
    apikey: 'f52ff3fc-0a45-4e8f-8507-e60a0a562e75',
  },

  // Яндекс метрика
  yandexMetrika: {
    id: '100256014',
    webvisor: true,
  },

  // Карта сайта. Плагин @nuxtjs/sitemap
  site: {
    url: 'https://pranait.ru',
    name: 'Разработка сайтов и медиа контента в Ставрополе',
  },

  // Для сжатия файлов
  nitro: {
    compressPublicAssets: true, // сжимает файлы в папке assets
    minify: true, // минимизирует код
  },

  compatibilityDate: '2024-08-19',
});
