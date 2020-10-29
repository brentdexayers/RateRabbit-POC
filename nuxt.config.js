<<<<<<< HEAD
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `gh_pages`
const routerBase = process.env.DEPLOY_ENV === 'gh_pages' ? {
=======
// dotenv
require('dotenv').config()

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
>>>>>>> v2.14
  router: {
    base: '/RateRabbit-POC/'
  }
} : {}

export default {
  ssr: false, // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Rate Rabbit / Real Rates, Real Time - %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', type: 'video/webm', href: '~assets/RateRabbit_RunAnim_v1.webm', as: 'video'  },
      { rel: 'preload', type: 'video/mp4', href: '~assets/RateRabbit_RunAnim_v1.mp4', as: 'video'  }
    ]
  },
  /*
  ** Runtime Config
  ** https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
  */
<<<<<<< HEAD
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    mode: process.env.NODE_ENV,
    // from .env
=======
 publicRuntimeConfig: {
   baseURL: process.env.BASE_URL || 'http://localhost:3000',
   mode: process.env.NODE_ENV
  },
  privateRuntimeConfig: {
>>>>>>> v2.14
    apiEndpoint: process.env.NUXT_ENV_API_ENDPOINT,
    apiUsername: process.env.NUXT_ENV_AUTH_USER_NAME,
    apiPassword: process.env.NUXT_ENV_AUTH_PASSWORD
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/LocalStorage', ssr: false },
    '~/plugins/vue-glide',
    '~/plugins/vue-mask',
    '~/plugins/vue-moment',
    '~/plugins/vue-currency-input',
    '~/plugins/v-calendar',
    '~/plugins/filters'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    ['bootstrap-vue/nuxt', { css: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    ['vue-currency-input/nuxt', {
      globalOptions: {
        currency: 'USD',
        locale: 'en-US',
        precision: 0,
        distractionFree: true,
        allowNegative: false
      }
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      target: process.env.NUXT_ENV_API_ENDPOINT || 'https://development.raterabbit.com:8181/RateRabbit/webapi/'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    linkActiveClass: 'active-parent',
    linkExactActiveClass: 'active'
  },
  /*
  ** Router base
  */
  ...routerBase,
  /*
  ** Page transitions
  ** See https://nuxtjs.org/api/configuration-transition
  */
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
}
