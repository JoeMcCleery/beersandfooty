export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.SITE_TITLE || 'Beers and Footy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/global/_main.scss'],
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
      author: 'FEAR Indigo',
      name: process.env.SITE_TITLE || 'Beers and Footy',
      lang: 'en',
      mobileApp: true,
      mobileAppIOS: true,
      ogHost: 'beersandfooty.com',
      ogImage: true,
      favicon: true,
      description: 'Beer related footy reviews and footy related beer reviews.',
      theme_color: '#FF833A',
      ogType: 'website',
      ogSiteName: process.env.SITE_TITLE || 'Beers and Footy',
      ogTitle: process.env.SITE_TITLE || 'Beers and Footy',
      ogDescription:
        'Beer related footy reviews and footy related beer reviews.',
      ogUrl: process.env.BASE_URL || 'Beers and Footy',
      nativeUI: true
    },
    icon: {
      iconSrc: '@/static/icon.png'
    }
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: 'pages'
  },
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          img: 'data-src',
          div: 'data-src'
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
