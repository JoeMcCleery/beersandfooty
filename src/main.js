import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterSitemap from 'vue-router-sitemap'
import path from 'path'
import App from './App'

// Import Components for routing
import Website from './components/Website'

// Config
Vue.config.productionTip = false
Vue.use(VueRouter)

// Define Routes
const routes = [
  { path: '/', component: Website },
  { path: '/beers', component: Website },
  { path: '/footy', component: Website }
]

// Create Router Instance
const router = new VueRouter({
  mode: 'history',
  routes
})

const sitemapMiddleware = () => {
  return (req, res) => {
    res.set('Content-Type', 'application/xml')

    const staticSitemap = path.resolve('dist/static', 'sitemap.xml')
    const filterConfig = {
      isValid: false,
      rules: [
        /\/example-page/,
        /\*/
      ]
    }

    new VueRouterSitemap(router).filterPaths(filterConfig).build('http://example.com').save(staticSitemap)

    return res.sendFile(staticSitemap)
  }
}

App.get('/sitemap.xml', sitemapMiddleware())

// Render App
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
