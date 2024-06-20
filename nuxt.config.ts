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

  modules: ['@nuxt/image', 'nuxt-viewport', 'nuxt-mail', 'vue-yandex-maps/nuxt'],

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
      screen1200: 1200,
      screen1280: 1280,
      screen1600: 1600,

      screen768: 768,
      screen576: 576,
      screen320: 320,
    },
  },

  // Отправка почты. Плагин 'nuxt-mail'
  mail: {
    message: {
      from: 'rrublyov@yandex.ru',
      to: 'rrublyov@yandex.ru', // вот так нескольким получателям: 'pranaittech@mail.ru, pranaittech@yandex.ru' либо ['info@pranait.ru, pranaittech@yandex.ru']
    },
    smtp: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'rrublyov',
        pass: 'uehsmscbekgvjrix', // пароль для приложений. Создаётся в учётной записи почты
      },
    },
  },

  // Для карты яндекса / 'vue-yandex-maps/nuxt'
  yandexMaps: {
    apikey: 'f52ff3fc-0a45-4e8f-8507-e60a0a562e75',
  },
});
