export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.SITE_TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ]
  },
  /*
   ** Default layout Transitions
   */
  layoutTransition: 'layout',
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '@/assets/js/global/main.js', ssr: false }],
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'vue-scrollto/nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  pwa: {
    meta: {
      name: process.env.SITE_TITLE || '',
      lang: 'en',
      ogHost: 'https://beersandfooty.com',
      ogImage: true
    },
    icon: {
      iconSrc: '@/static/icon.png'
    }
  },
  /*
   ** Router configuration
   */
  router: {},
  /*
   ** Build configuration
   */
  build: {
    loaders:
      {
        vue: {
          transformAssetUrls: {
            img: "data-src",
            div: "data-src"
          }
        }
      },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
