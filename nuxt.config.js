// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/RateRabbit-POC/'
  }
} : {}

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
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
  ** Environment Variables
  */
  env: {
    baseUrl: process.env.DEPLOY_ENV === 'DEVELOPMENT' ? process.env.BASE_URL || 'http://localhost:3000' : (process.env.DEPLOY_ENV === 'GH_PAGES' ? process.env.BASE_URL || 'https://brentdexayers.github.io/RateRabbit-POC' : ''),
    mode: process.env.NODE_ENV,
    // from .env
    apiEndpoint: process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://development.raterabbit.com:8181/RateRabbit/webapi' : process.env.NUXT_ENV_API_ENDPOINT || '/api',
    apiUsername: process.env.NUXT_ENV_AUTH_USER_NAME || 'ninthlink',
    apiPassword: process.env.NUXT_ENV_AUTH_PASSWORD || 'Y<CJfOD&B;xo5BphMm+D'
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
