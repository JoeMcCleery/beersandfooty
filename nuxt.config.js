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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'vue-scrollto/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics'
  ],
  sitemap: {
    hostname: process.env.BASE_URL || 'https://beersandfooty.com',
    gzip: true,
    routes: async () => {
      const { reviews } = await this.$store.dispatch('getPublishedReviews')
      return reviews.map((review) => `/review/${review.id}`)
    }
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    dev: process.env.MODE
  },
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
      ogHost: process.env.NUXT_HOST || 'beersandfooty.com',
      ogImage: true,
      favicon: true,
      description: 'Beer related footy reviews and footy related beer reviews.',
      theme_color: '#FF833A',
      ogType: 'website',
      ogSiteName: process.env.SITE_TITLE || 'Beers and Footy',
      ogTitle: process.env.SITE_TITLE || 'Beers and Footy',
      ogDescription:
        'Beer related footy reviews and footy related beer reviews.',
      ogUrl: process.env.BASE_URL || 'https://beersandfooty.com',
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
